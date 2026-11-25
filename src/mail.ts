import type { LeadInput } from "./lead-schema";

// Eliminăm orice secvență care ar permite injecție de header-e (CR/LF, separatori Unicode, NUL).
export const oneLine = (s: string, max = 120) => s.replace(/[\u0000-\u001F\u007F\u2028\u2029]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// Expediere prin API HTTPS (Resend) – fără dependențe SMTP suplimentare.
// Destinatarul și expeditorul vin DOAR din variabile de mediu, niciodată din input-ul vizitatorului.
export async function sendLeadEmail(d: LeadInput): Promise<boolean> {
  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) return false;

  const rows: [string, string][] = [
    ["Nume", oneLine(d.nume, 80)], ["Companie", oneLine(d.companie)], ["E-mail", oneLine(d.email)],
    ["Telefon", oneLine(d.telefon ?? "-", 25)], ["Rol", d.rol], ["Sector", d.sector],
  ];
  const mesaj = (d.mesaj ?? "-").slice(0, 1500);

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMesaj:\n${mesaj}`;
  const html = `<table>${rows.map(([k, v]) => `<tr><th align="left">${escapeHtml(k)}</th><td>${escapeHtml(v)}</td></tr>`).join("")}</table><p style="white-space:pre-wrap">${escapeHtml(mesaj)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM, to: [CONTACT_TO], reply_to: d.email,
      subject: `[Lead NIS2] ${oneLine(d.companie, 80)} – ${d.rol}`, text, html,
    }),
    signal: AbortSignal.timeout(8000),
  }).catch(() => null);
  return !!res?.ok;
}
