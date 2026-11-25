import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AegisNIS Cyber Defense | Audit NIS2 & Securitate România",
  description: "Servicii profesionale de audit NIS2, gap assessment și conformitate OUG 155/2024.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="bg-[#0B1120] text-[#F8FAFC] antialiased">
        {children}
      </body>
    </html>
  );
}