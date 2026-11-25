import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { sendLeadEmail } from "@/lib/mail";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const NO_STORE = { "Cache-Control": "no-store" };
const json = (body: object, status = 200, extra: Record<string, string> = {}) =>
  NextResponse.json(body, { status, headers: { ...NO_STORE, ...extra } });

export async function POST(req: Request) {
  // 1. CSRF / origine: acceptăm doar cereri de la propriul site
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  const origin = req.headers.get("origin");
  if (site && origin !== new URL(site).origin) return json({ ok: false, error: "Cerere respinsă." }, 403);

  // 2. Rate limiting pe IP (înainte de orice parsare costisitoare)
  const rl = rateLimit(`ip:${clientIp(req)}`, 5, 10 * 60_000);
  if (!rl.ok) return json({ ok: false, error: "Prea multe solicitări. Reîncercați mai târziu." }, 429, { "Retry-After": String(rl.retryAfter) });

  // 3. Content-Type și dimensiune strictă
  if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) return json({ ok: false }, 415);
  const raw = await req.text();
  if (raw.length > 10_000) return json({ ok: false }, 413);

  let body: unknown;
  try { body = JSON.parse(raw); } catch { return json({ ok: false }, 400); }

  // 4. Validare Zod (schema sanitizează: NFC, caractere de control, < >)
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) return json({ ok: false, fields: parsed.error.flatten().fieldErrors }, 422);
  const data = parsed.data;

  // 5. Honeypot: răspuns identic cu succesul, nimic expediat
  if (data.website) return json({ ok: true });

  // 6. Limită suplimentară pe adresa de e-mail (previne bombardarea unei căsuțe)
  if (!rateLimit(`mail:${data.email}`, 3, 60 * 60_000).ok) return json({ ok: false, error: "Solicitare deja înregistrată." }, 429);

  // 7. Turnstile, verificat server-side
  const ts = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET ?? "", response: data.turnstileToken, remoteip: clientIp(req) }),
    signal: AbortSignal.timeout(5000),
  }).then((r) => r.json() as Promise<{ success: boolean }>).catch(() => ({ success: false }));
  if (!ts.success) return json({ ok: false, error: "Verificarea anti-spam a eșuat. Reîncercați." }, 400);

  // 8. Expediere sanitizată; erorile interne nu se expun și datele personale nu se loghează
  const sent = await sendLeadEmail(data);
  if (!sent) { console.error("contact: dispatch failed"); return json({ ok: false, error: "Momentan nu putem trimite solicitarea. Scrieți-ne la adresa de contact." }, 502); }
  return json({ ok: true });
}

export const GET = () => json({ ok: false }, 405, { Allow: "POST" });
