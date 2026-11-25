import type { Metadata } from "next";
import { SiteShell, Prose } from "@/components/SiteShell";

export const metadata: Metadata = { title: "Termeni și condiții | AegisNIS Cyber Defense" };
const P = "[DATE_PROVIZORII_IN_CURS_DE_INREGISTRARE]";

export default function Termeni() {
  return (
    <SiteShell>
      <Prose>
        <h1>Termeni și condiții</h1>
        <p className="!text-sm !text-amber-200">Ciornă pentru verificare juridică. Câmpurile marcate {P} se completează după înregistrarea la ONRC. Termenii pentru site nu înlocuiesc contractul de servicii semnat pentru fiecare misiune.</p>
        <p>Ultima actualizare: {P}</p>

        <h2>1. Identificarea prestatorului</h2>
        <table><tbody>
          <tr><th scope="row">Denumire</th><td>{P}</td></tr>
          <tr><th scope="row">CUI</th><td>{P}</td></tr>
          <tr><th scope="row">Nr. Reg. Com.</th><td>{P}</td></tr>
          <tr><th scope="row">Sediu social</th><td>{P}</td></tr>
          <tr><th scope="row">Capital social</th><td>{P}</td></tr>
          <tr><th scope="row">Cont bancar / bancă</th><td>{P}</td></tr>
          <tr><th scope="row">Contact</th><td>{P}</td></tr>
        </tbody></table>

        <h2>2. Domeniu de aplicare</h2>
        <p>Acești termeni reglementează utilizarea site-ului și relația precontractuală cu persoanele care solicită servicii. Serviciile sunt adresate exclusiv persoanelor juridice și profesioniștilor (B2B). Misiunile concrete se desfășoară pe baza unui contract și a unei oferte care prevalează asupra acestor termeni.</p>

        <h2>3. Serviciile și limitele lor</h2>
        <ul>
          <li>Oferim analiză de aplicabilitate NIS2, audit de conformitate și gap assessment, sprijin pentru implementare și guvernanță, teste de penetrare, managementul vulnerabilităților și asistență în răspunsul la incidente.</li>
          <li><strong>Informații generale.</strong> Conținutul site-ului și evaluatorul rapid NIS2 au caracter orientativ și nu constituie consultanță juridică. Încadrarea finală și aplicarea legii aparțin autorităților competente (DNSC) și instanțelor.</li>
          <li><strong>Fără garanția unui rezultat.</strong> Nu garantăm evitarea sancțiunilor, a incidentelor sau un anumit rezultat în fața DNSC. Răspunderea pentru conformitate aparține entității reglementate și conducerii acesteia.</li>
          <li><strong>Statut DNSC.</strong> Prestatorul se află în curs de autorizare DNSC. Nu prezentăm rapoartele noastre ca fiind emise de sau în numele DNSC până la obținerea eventualelor autorizări.</li>
        </ul>

        <h2>4. Teste de penetrare și acces la sisteme</h2>
        <p>Nu efectuăm teste active fără autorizare scrisă a titularului sistemelor, care definește perimetrul, intervalele de timp, regulile de angajare și persoanele de contact pentru urgențe. Clientul declară că este titularul sau are dreptul să autorizeze testarea (inclusiv față de furnizori cloud sau terți implicați). Activitățile din afara perimetrului convenit sunt interzise.</p>

        <h2>5. Confidențialitate</h2>
        <p>Informațiile obținute în misiuni sunt confidențiale și sunt folosite exclusiv pentru misiune. Detaliile se stabilesc într-un acord de confidențialitate (NDA). Datele personale sunt prelucrate conform <a href="/confidentialitate">Politicii de confidențialitate</a> și, pentru misiuni, conform acordului Art. 28 GDPR.</p>

        <h2>6. Proprietate intelectuală</h2>
        <p>Site-ul, textele, metodologia și șabloanele sunt proprietatea prestatorului sau a licențiatorilor. Livrabilele personalizate se cesionează sau se licențiază clientului conform contractului. Reproducerea site-ului fără acord scris este interzisă.</p>

        <h2>7. Limitarea răspunderii</h2>
        <p>În măsura permisă de lege, răspunderea prestatorului este limitată la valoarea serviciilor facturate pentru misiunea în cauză, cu excepția dolului, culpei grave și a situațiilor în care legea nu permite limitarea. Prestatorul nu răspunde pentru pierderi indirecte sau profit nerealizat. Clauza se detaliază în contract: {P}.</p>

        <h2>8. Utilizarea site-ului</h2>
        <p>Este interzisă încercarea de a accesa neautorizat site-ul, scanarea sau testarea lui în afara politicii de la secțiunea 9, trimiterea de conținut malițios sau automatizarea abuzivă a formularelor.</p>

        <h2 id="divulgare-responsabila">9. Divulgare responsabilă a vulnerabilităților</h2>
        <p>Dacă ați descoperit o vulnerabilitate în site sau în serviciile noastre, scrieți-ne la security@aegisnis-demo.ro (cheie PGP: <a href="/.well-known/pgp-key.txt">pgp-key.txt</a>; detalii în <a href="/.well-known/security.txt">security.txt</a>). Vă rugăm:</p>
        <ul>
          <li>să raportați fără a accesa, modifica sau copia date ale altor persoane, fără atacuri de tip DoS și fără inginerie socială;</li>
          <li>să ne acordați un termen rezonabil de remediere înainte de orice publicare;</li>
          <li>să includeți pașii de reproducere și impactul estimat.</li>
        </ul>
        <p>Confirmăm primirea în maximum 3 zile lucrătoare și nu vom iniția acțiuni în justiție împotriva cercetătorilor care respectă această politică, în limitele legii. Nu oferim recompense financiare.</p>
        <h3 id="multumiri">Mulțumiri</h3>
        <p>Lista cercetătorilor care au raportat responsabil: în curs de completare.</p>

        <h2>10. Reclamații și soluționarea litigiilor</h2>
        <p>Reclamațiile se trimit la {P}; răspundem în 30 de zile. Platformele SAL/SOL privesc în principal consumatorii; serviciile noastre sunt B2B. Neînțelegerile se soluționează amiabil, iar în caz contrar de instanțele competente de la sediul prestatorului. Se aplică legea română.</p>

        <h2>11. Modificări</h2>
        <p>Putem modifica acești termeni; versiunea curentă și data actualizării sunt publicate pe această pagină.</p>
      </Prose>
    </SiteShell>
  );
}
