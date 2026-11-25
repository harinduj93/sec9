'use client';

import React, { useState } from 'react';
import { ShieldCheck, FileCheck, Building2, AlertCircle, ArrowRight, CheckCircle2, ChevronRight, Phone, Mail, MapPin, Menu, X, Lock, Terminal, Cpu, Network } from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Calculator state
  const [sector, setSector] = useState('');
  const [employees, setEmployees] = useState('');
  const [turnover, setTurnover] = useState('');
  const [hasBackup, setHasBackup] = useState(false);
  const [result, setResult] = useState<{ type: string; desc: string; color: string } | null>(null);

  // Contact form state
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sector || !employees || !turnover) {
      alert('Vă rugăm să completați toate câmpurile pentru evaluare.');
      return;
    }

    const empNum = parseInt(employees);
    const isLargeOrMedium = empNum >= 50;

    if (isLargeOrMedium || sector === 'energie' || sector === 'sanatate' || sector === 'transport' || sector === 'digital') {
      setResult({
        type: 'Entitate Importantă sau Esențială (OUG 155/2024)',
        desc: 'Conform cadrului legal național transpus după Directiva NIS2, organizația dvs. intră sub incidența directă a normelor DNSC. Sunt necesare politici stricte de securitate și raportare a incidentelor majore în 24h / 72h.',
        color: 'border-cyan-500 bg-cyan-950/40 text-cyan-200'
      });
    } else {
      setResult({
        type: 'Lanț de Aprovizionare / Furnizor Vizat B2B',
        desc: 'Chiar dacă vă aflați sub pragul dimensional direct, partenerii și clienții dvs. corporativi din lanțul de aprovizionare vă vor solicita conformitatea NIS2 prin contracte B2B riguroase.',
        color: 'border-amber-500 bg-amber-950/40 text-amber-200'
      });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      company: formData.get('company'),
      sector: formData.get('sector'),
      message: formData.get('message'),
      honeypot: formData.get('honeypot'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        setFormStatus('success');
        setFormMessage('Solicitarea a fost trimisă cu succes! Un consultant specializat vă va contacta în curând.');
      } else {
        setFormStatus('error');
        setFormMessage(json.error || 'A apărut o eroare.');
      }
    } catch {
      setFormStatus('error');
      setFormMessage('Eroare de rețea. Vă rugăm încercați din nou.');
    }
  };

  return (
    <div className="min-h-screen bg-[#070D1D] text-[#E2E8F0] font-sans antialiased selection:bg-[#0EA5E9] selection:text-white">
      {/* Top Pre-Registration Notice Bar */}
      <div className="bg-[#0F172A] border-b border-slate-800 py-2.5 px-4 text-center text-xs font-medium text-cyan-400">
        <span className="font-bold uppercase tracking-wider mr-2">[CyberGlobal & AegisNIS Romania Style]:</span> 
        SC AegisNIS Security SRL • Consultanță și Audit Cibernetic Aliniat DNSC & OUG 155/2024 (Arad / Cluj-Napoca).
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070D1D]/90 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">AegisNIS</span>
              <span className="text-xs block text-cyan-400 font-mono tracking-widest">CYBER GLOBAL DEFENSE</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
            <a href="#servicii" className="hover:text-cyan-400 transition-colors">Servicii</a>
            <a href="#evaluator" className="hover:text-cyan-400 transition-colors">Evaluator NIS2</a>
            <a href="#metodologie" className="hover:text-cyan-400 transition-colors">Metodologie</a>
            <a href="#despre" className="hover:text-cyan-400 transition-colors">Despre Noi</a>
            <a href="#contact" className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-600/30">
              Solicită Consultanță
            </a>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-slate-300 hover:text-white">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0B132B] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            <a href="#servicii" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 font-medium">Servicii</a>
            <a href="#evaluator" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 font-medium">Evaluator NIS2</a>
            <a href="#metodologie" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 font-medium">Metodologie</a>
            <a href="#despre" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-300 font-medium">Despre Noi</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-cyan-400 font-bold">Solicită Consultanță</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-b from-[#0B132B] to-[#070D1D]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-6 shadow-sm">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Expertiză de Elită în Securitate Cibernetică & Standarde DNSC</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Protecting Critical Infrastructures & Enterprise Operations via <span className="text-cyan-400">CyberGlobal Standards</span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            Servicii avansate de penetration testing, SOC 24/7, app security și conformitate completă cu Directiva NIS2 (OUG 155/2024) pentru companii din România.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#contact" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition-all flex items-center justify-center space-x-2 shadow-xl shadow-cyan-600/30">
              <span>Programează o Consultanță</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#evaluator" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold hover:bg-slate-800 transition-all">
              Verifică Încadrarea NIS2
            </a>
          </div>

          {/* CyberGlobal Style Metrics Bar */}
          <div className="mt-20 pt-10 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-[#0B132B] border border-slate-800 shadow-lg">
              <div className="text-3xl font-extrabold text-cyan-400 font-mono">108+</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Assessments / An</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0B132B] border border-slate-800 shadow-lg">
              <div className="text-3xl font-extrabold text-white font-mono">24/7</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">SOC Threat Monitoring</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0B132B] border border-slate-800 shadow-lg">
              <div className="text-3xl font-extrabold text-cyan-400 font-mono">100%</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">OUG 155/2024 Aliniat</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0B132B] border border-slate-800 shadow-lg">
              <div className="text-3xl font-extrabold text-white font-mono">Zero-Trust</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Arhitectură Defensivă</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicii" className="py-24 bg-[#0B132B] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">[Portofoliu Tehnic]</span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-2">Servicii de Securitate Cibernetică în România</h2>
            <p className="mt-4 text-slate-400">Soluții robuste concepute pentru a elimina riscurile, a opri atacurile înainte să se producă și a asigura conformitatea.</p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 rounded-2xl bg-[#070D1D] border border-slate-800 hover:border-cyan-500/50 transition-all shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Penetration Testing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Simularea atacurilor cibernetice reale pentru identificarea vulnerabilităților în rețele, aplicații web și API-uri înainte de exploatare.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#070D1D] border border-slate-800 hover:border-cyan-500/50 transition-all shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">SOC 24/7 & EDR</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Monitorizare permanentă a amenințărilor, detecție rapidă a incidentelor și răspuns automatizat pentru minimizarea riscurilor.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#070D1D] border border-slate-800 hover:border-cyan-500/50 transition-all shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Application Security</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Secure code review, evaluări de arhitectură și teste riguroase de securitate pentru codul sursă și aplicațiile cloud.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#070D1D] border border-slate-800 hover:border-cyan-500/50 transition-all shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                <Network className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Network & Cloud Security</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Protecția infrastructurii de rețea, managementul firewall-urilor, segmentare avansată și auditarea configurațiilor cloud.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive NIS2 Pre-Check Calculator */}
      <section id="evaluator" className="py-24 bg-[#070D1D] border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0B132B] border border-slate-800 shadow-2xl">
            <div className="text-center mb-10">
              <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">[Instrument Gratuit]</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-2">Evaluator Rapid NIS2 (Pre-Check)</h2>
              <p className="text-slate-400 mt-2 text-sm">Verificați în câteva secunde dacă organizația dumneavoastră este vizată de OUG 155/2024.</p>
            </div>

            <form onSubmit={handleCalculate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Sector de Activitate</label>
                  <select 
                    value={sector} 
                    onChange={(e) => setSector(e.target.value)}
                    className="w-full bg-[#070D1D] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">Alege sectorul...</option>
                    <option value="energie">Energie & Utilități</option>
                    <option value="sanatate">Sănătate & Farmaceutice</option>
                    <option value="transport">Transport & Logistică</option>
                    <option value="digital">Infrastructură Digitală & IT</option>
                    <option value="productie">Producție & Industrial</option>
                    <option value="alimentar">Lanț Alimentar & Agro</option>
                    <option value="altele">Alte sectoare B2B</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Număr Angajați</label>
                  <select 
                    value={employees} 
                    onChange={(e) => setEmployees(e.target.value)}
                    className="w-full bg-[#070D1D] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">Alege numărul...</option>
                    <option value="10">Sub 50 angajați (Micro / Mică)</option>
                    <option value="100">50 - 250 angajați (Mijlocie)</option>
                    <option value="500">Peste 250 angajați (Mare)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Cifră de Afaceri / An</label>
                  <select 
                    value={turnover} 
                    onChange={(e) => setTurnover(e.target.value)}
                    className="w-full bg-[#070D1D] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">Alege intervalul...</option>
                    <option value="sub10">Sub 10 Milioane EUR</option>
                    <option value="peste10">Peste 10 Milioane EUR</option>
                    <option value="peste50">Peste 50 Milioane EUR</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <input 
                  type="checkbox" 
                  id="backup" 
                  checked={hasBackup} 
                  onChange={(e) => setHasBackup(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-700 bg-[#070D1D] text-cyan-600 focus:ring-cyan-500"
                />
                <label htmlFor="backup" className="text-sm text-slate-300">
                  Dispuneți în prezent de un plan testat de recuperare în caz de dezastru (DRP) și politici de securitate formalizate?
                </label>
              </div>

              <button type="submit" className="w-full py-4 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-600/30">
                Calculează Încadrarea Preliminară
              </button>
            </form>

            {result && (
              <div className={`mt-8 p-6 rounded-2xl border ${result.color} shadow-lg`}>
                <h3 className="text-lg font-bold mb-2 flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  <span>Rezultat Preliminar: {result.type}</span>
                </h3>
                <p className="text-sm leading-relaxed opacity-90">{result.desc}</p>
                <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between items-center text-xs opacity-75">
                  <span>Evaluare orientativă conform OUG 155/2024.</span>
                  <a href="#contact" className="text-cyan-400 font-bold hover:underline flex items-center space-x-1">
                    <span>Solicită audit complet</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="metodologie" className="py-24 bg-[#0B132B] border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">[De Ce CyberGlobal & AegisNIS]</span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-2">Avantajele Colaborării Noastre</h2>
            <p className="mt-4 text-slate-400">Standarde internaționale de excelență tehnică adaptate legislației naționale din România.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#070D1D] border border-slate-800">
              <div className="text-cyan-400 font-mono font-bold text-xl mb-3">01. Expertiză Certificată</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Ingineri cu certificări de top în industrie și experiență vastă în protejarea infrastructurilor critice și corporative.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#070D1D] border border-slate-800">
              <div className="text-cyan-400 font-mono font-bold text-xl mb-3">02. Răspuns Rapid la Incidente</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Protocoale active de monitorizare 24/7, detecție instantanee a anomaliilor și gestionare imediată a crizelor cibernetice.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#070D1D] border border-slate-800">
              <div className="text-cyan-400 font-mono font-bold text-xl mb-3">03. Conformitate Totală NIS2</div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Asistență juridică și tehnică completă pentru alinierea la OUG 155/2024 și cerințele stricte impuse de DNSC.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-[#070D1D] border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-cyan-400 font-mono text-xs uppercase tracking-widest">[Contact Direct]</span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-2">Schedule a Call & Get Secured</h2>
            <p className="mt-4 text-slate-400">Discutați cu un specialist în securitate cibernetică pentru o propunere personalizată.</p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-[#0B132B] border border-slate-800 shadow-2xl">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <input type="text" name="honeypot" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Nume și Prenume *</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    placeholder="ex. Ion Popescu"
                    className="w-full bg-[#070D1D] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Email Profesional *</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    placeholder="ion.popescu@companie.ro"
                    className="w-full bg-[#070D1D] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Nume Companie *</label>
                  <input 
                    type="text" 
                    name="company" 
                    required 
                    placeholder="ex. SC Compania SRL"
                    className="w-full bg-[#070D1D] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Sector de Activitate *</label>
                  <select 
                    name="sector" 
                    required
                    className="w-full bg-[#070D1D] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">Alege sectorul...</option>
                    <option value="energie">Energie & Utilități</option>
                    <option value="sanatate">Sănătate</option>
                    <option value="transport">Transport</option>
                    <option value="digital">Infrastructură Digitală / IT</option>
                    <option value="productie">Producție</option>
                    <option value="altele">Altele</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Detalii / Mesaj *</label>
                <textarea 
                  name="message" 
                  required 
                  rows={4}
                  placeholder="Descrieți cerințele de securitate sau întrebările legate de conformitatea NIS2..."
                  className="w-full bg-[#070D1D] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500"
                ></textarea>
              </div>

              {formStatus === 'success' && (
                <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-200 text-sm font-medium">
                  {formMessage}
                </div>
              )}

              {formStatus === 'error' && (
                <div className="p-4 rounded-xl bg-rose-950 border border-rose-800 text-rose-200 text-sm font-medium">
                  {formMessage}
                </div>
              )}

              <button 
                type="submit" 
                disabled={formStatus === 'submitting'}
                className="w-full py-4 rounded-xl bg-cyan-600 text-white font-bold hover:bg-cyan-500 transition-all shadow-lg shadow-cyan-600/30 disabled:opacity-50"
              >
                {formStatus === 'submitting' ? 'Se trimite...' : 'Trimite Solicitarea'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#040812] border-t border-slate-800 py-16 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-bold text-lg">AegisNIS & CyberGlobal</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consultanță de securitate cibernetică de elită în România. Partener al rețelei globale CyberGlobal.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Birouri România</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center space-x-2"><MapPin className="w-3.5 h-3.5 text-cyan-400" /><span>Arad & Cluj-Napoca, România</span></li>
              <li className="flex items-center space-x-2"><Mail className="w-3.5 h-3.5 text-cyan-400" /><span>info.ro@cybergl.com</span></li>
              <li className="flex items-center space-x-2"><Phone className="w-3.5 h-3.5 text-cyan-400" /><span>+40 748 040 010</span></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Servicii Principale</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li><a href="#servicii" className="hover:text-cyan-400 transition-colors">Penetration Testing</a></li>
              <li><a href="#servicii" className="hover:text-cyan-400 transition-colors">SOC 24/7 Monitoring</a></li>
              <li><a href="#servicii" className="hover:text-cyan-400 transition-colors">Application Security</a></li>
              <li><a href="#servicii" className="hover:text-cyan-400 transition-colors">GRC & NIS2 Compliance</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Reglementare & Legal</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Aliniat cu standardele Directiva UE 2022/2555 și OUG 155/2024 sub supravegherea DNSC.
            </p>
            <div className="mt-4 text-xs text-cyan-400 font-mono">
              <span>[Certified Cybersecurity Expertise]</span>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} SC AegisNIS Security SRL & CyberGlobal LLC. Toate drepturile rezervate.
        </div>
      </footer>
    </div>
  );
}