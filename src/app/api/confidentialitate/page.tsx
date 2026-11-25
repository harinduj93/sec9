import type { Metadata } from "next";
import { SiteShell, Prose } from "@/components/SiteShell";

export const metadata: Metadata = { title: "Politica de confidențialitate și cookie-uri | AegisNIS Cyber Defense" };
const P = "[DATE_PROVIZORII_IN_CURS_DE_INREGISTRARE]";

export default function Confidentialitate() {
  return (
    <SiteShell>
      <Prose>
        <h1>Politica de confidențialitate</h1>
        <p className="!text-sm !text-amber-200">Ciornă pentru verificare juridică. Câmpurile marcate {P} se completează după înregistrarea la ONRC. Perioadele de retenție sunt propuneri de validat de un jurist sau de responsabilul cu protecția datelor.</p>
        <p>Ultima actualizare: {P}</p>

        <h2>1. Cine este operatorul</h2>
        <table><tbody>
          <tr><th scope="row">Denumire</th><td>{P}</td></tr>
          <tr><th scope="row">CUI / Nr. Reg. Com.</th><td>{P}</td></tr>
          <tr><th scope="row">Sediu</th><td>{P}</td></tr>
          <tr><th scope="row">E-mail pentru date personale</th><td>{P}</td></tr>
          <tr><th scope="row">Responsabil protecția datelor (DPO)</th><td>{P} (sau mențiunea că nu a fost desemnat)</td></tr>
        </tbody></table>
        <p>Prelucrăm date în conformitate cu Regulamentul (UE) 2016/679 (GDPR), Legea 190/2018 și Legea 506/2004 privind comunicațiile electronice.</p>

        <h2>2. Ce date prelucrăm, de ce și pe ce temei</h2>
        <table>
          <thead><tr><th scope="col">Scop</th><th scope="col">Date</th><th scope="col">Temei</th><th scope="col">Retenție propusă</th></tr></thead>
          <tbody>
            <tr><td>Răspuns la formularul de evaluare/contact</td><td>Nume, companie, e-mail de serviciu, telefon (opțional), rol, sector, mesaj</td><td>Art. 6(1)(b) măsuri precontractuale la cererea persoanei; Art. 6(1)(f) interes legitim B2B</td><td>12 luni de la ultimul contact, dacă nu se încheie contract</td></tr>
            <tr><td>Protecția formularelor împotriva abuzului</td><td>Adresă IP, token anti-spam, date tehnice ale cererii</td><td>Art. 6(1)(f) securitatea serviciilor online</td><td>Jurnale tehnice: 30 de zile</td></tr>
            <tr><td>Executarea contractelor de servicii</td><td>Date de contact și date de facturare ale reprezentanților clientului</td><td>Art. 6(1)(b) și 6(1)(c) obligații contabile și fiscale</td><td>Durata contractului plus termenele legale de arhivare</td></tr>
            <tr><td>Comunicări comerciale către clienți</td><td>E-mail de serviciu</td><td>Consimțământ sau, pentru clienți existenți, interes legitim, cu drept de opoziție (Legea 506/2004)</td><td>Până la retragerea consimțământului sau opoziție</td></tr>
          </tbody>
        </table>
        <p>Nu folosim publicitate comportamentală și nu vindem date.</p>

        <h2>3. Date din misiunile de audit</h2>
        <p>În misiunile de audit, pentest sau răspuns la incident putem avea acces la date personale ale clientului. În acest caz acționăm ca <strong>persoană împuternicită</strong> și prelucrăm datele doar pe baza instrucțiunilor clientului, într-un acord conform Art. 28 GDPR, separat de această politică. Aplicăm minimizarea accesului, criptarea și ștergerea sau returnarea datelor la finalul misiunii.</p>

        <h2>4. Destinatari</h2>
        <ul>
          <li>Furnizor de e-mail tranzacțional (primirea solicitărilor): {P}</li>
          <li>Cloudflare, Inc. (Turnstile, verificare anti-spam), cu posibile transferuri în SUA pe baza Cadrului UE–SUA pentru confidențialitatea datelor sau a clauzelor contractuale standard.</li>
          <li>Furnizor de găzduire: {P}; contabil și consultanți profesionali, sub obligații de confidențialitate.</li>
          <li>Autorități, când legea o impune.</li>
        </ul>

        <h2 id="cookie-uri">5. Cookie-uri și tehnologii similare</h2>
        <p>Site-ul folosește doar cookie-uri strict necesare funcționării și securității. Acestea nu necesită consimțământ conform Legii 506/2004. Nu folosim cookie-uri de analiză, marketing sau fonturi externe; fonturile sunt găzduite local.</p>
        <table>
          <thead><tr><th scope="col">Nume</th><th scope="col">Scop</th><th scope="col">Durată</th></tr></thead>
          <tbody><tr><td>Token Turnstile (Cloudflare)</td><td>Verificare anti-spam la trimiterea formularului</td><td>Sesiune / scurtă durată</td></tr></tbody>
        </table>
        <p>Dacă vom introduce în viitor cookie-uri neesențiale, vom solicita consimțământ prin opțiuni egale „Acceptă” și „Refuză”, fără pre-bifări.</p>

        <h2>6. Drepturile dumneavoastră</h2>
        <p>Aveți dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție (Art. 15–22 GDPR), precum și dreptul de a retrage consimțământul oricând. Scrieți la {P}; răspundem în cel mult o lună. Puteți depune plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), <a href="https://www.dataprotection.ro" rel="noopener noreferrer">dataprotection.ro</a>.</p>

        <h2>7. Securitatea datelor</h2>
        <p>Aplicăm criptare în tranzit (HTTPS cu HSTS), validarea strictă a datelor, limitarea cererilor, acces pe principiul privilegiului minim și politică de divulgare responsabilă (vezi <a href="/termeni-conditii#divulgare-responsabila">Termeni și condiții</a>). În cazul unei încălcări a securității datelor, vom notifica ANSPDCP și persoanele afectate în condițiile Art. 33–34 GDPR.</p>

        <h2>8. Modificări</h2>
        <p>Putem actualiza această politică. Versiunea curentă este publicată pe această pagină, cu data ultimei actualizări.</p>
      </Prose>
    </SiteShell>
  );
}
