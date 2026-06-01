import { useEffect, useRef, useState } from "react";

const logoUrl = "/bailtranquille-logo.jpeg";

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Probleme />
      <Services />
      <PourQui />
      <CommentCaMarche />
      <Securite />
      <VisionValeurs />
      <FAQ />
      <CTAFinal />
      <Footer />
    </div>
  );
}

/* ---------------- Reveal on scroll ---------------- */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, as: As = "div", className = "", delay = 0 }: { children: React.ReactNode; as?: any; className?: string; delay?: number }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <As ref={ref} className={`bt-fade-in ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </As>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    { href: "#vision", label: "Vision" },
    { href: "#services", label: "Services" },
    { href: "#securite", label: "Sécurité" },
    { href: "#faq", label: "FAQ" },
    { href: "#download", label: "Contact" },
  ];
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur shadow-[0_2px_12px_rgba(30,27,94,0.08)]" : "bg-white/80 backdrop-blur"}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <img src={logoUrl} alt="BailTranquille logo" className="w-10 h-10 rounded-full object-cover ring-1 ring-border" />
          <span className="text-xl font-bold tracking-tight" style={{ color: "var(--navy)" }}>
            BailTranquille<span style={{ color: "var(--gold)" }}>·</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">{l.label}</a>
          ))}
        </nav>
        <a href="#download" className="hidden md:inline-flex bt-btn-primary text-sm">Télécharger l'app</a>
        <button aria-label="Menu" className="md:hidden p-2 rounded-lg hover:bg-secondary" onClick={() => setOpen((v) => !v)}>
          <span className="block w-6 h-0.5 bg-primary mb-1.5" />
          <span className="block w-6 h-0.5 bg-primary mb-1.5" />
          <span className="block w-6 h-0.5 bg-primary" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border bg-white px-5 py-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-base font-medium text-foreground">{l.label}</a>
          ))}
          <a href="#download" onClick={() => setOpen(false)} className="bt-btn-primary w-full">Télécharger l'app</a>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="bt-gradient-hero text-white pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <Reveal>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1]">
              La gestion locative enfin <span style={{ color: "var(--gold)" }}>simple, sécurisée</span> et centralisée.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
              BailTranquille aide bailleurs, locataires et équipes terrain à gérer biens, contrats, paiements et maintenance dans une seule plateforme mobile.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#download" className="bt-btn-primary text-base"><span aria-hidden>🤖</span> Télécharger l'APK</a>
              <a href="#services" className="bt-btn-outline text-base">Découvrir la solution</a>
            </div>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-8 flex flex-wrap gap-3">
              {["🔒 Données sécurisées","📱 Android","🌍 Conçu pour le Cameroun","⚡ Mode hors ligne"].map((b) => (
                <span key={b} className="inline-flex items-center gap-2 text-xs sm:text-sm px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-white/90">{b}</span>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={200} className="flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-8 rounded-[3rem] blur-3xl opacity-40" style={{ background: "radial-gradient(circle, #FFCC00 0%, transparent 70%)" }} />
            <div className="relative w-[280px] h-[560px] rounded-[3rem] border-[10px] border-[#0F0D2E] bg-[#0F0D2E] shadow-2xl overflow-hidden">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-10" />
              <div className="w-full h-full bt-gradient-hero p-5 flex flex-col">
                <div className="mt-8 flex items-center justify-between text-white/90 text-xs">
                  <span className="font-semibold">BailTranquille·</span><span>09:41</span>
                </div>
                <div className="mt-6 text-white">
                  <p className="text-xs text-white/60">Bonjour,</p>
                  <p className="text-xl font-bold">Tableau de bord</p>
                </div>
                <div className="mt-5 rounded-2xl p-4" style={{ background: "var(--gradient-gold)" }}>
                  <p className="text-xs text-[#1E1B5E]/80 font-medium">Loyers perçus · Nov.</p>
                  <p className="text-2xl font-extrabold text-[#1E1B5E] mt-1">2 450 000 FCFA</p>
                  <p className="text-xs text-[#1E1B5E]/70 mt-1">+12% vs mois dernier</p>
                </div>
                <div className="mt-4 space-y-3">
                  {[{l:"Biens actifs",v:"14"},{l:"Contrats en cours",v:"12"},{l:"Interventions",v:"3"}].map((r) => (
                    <div key={r.l} className="flex items-center justify-between rounded-xl bg-white/10 px-4 py-3">
                      <span className="text-sm text-white/80">{r.l}</span>
                      <span className="text-sm font-bold text-white">{r.v}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-4">
                  <div className="rounded-xl bg-white/10 p-3 text-center text-xs text-white/70">Synchronisé · Mode hors ligne actif</div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Probleme() {
  const items = [
    { i: "📋", t: "Contrats sur papier, perdus ou incomplets" },
    { i: "💸", t: "Paiements non tracés, litiges fréquents" },
    { i: "🔧", t: "Interventions sans suivi ni historique" },
    { i: "📵", t: "Aucune solution digitale adaptée au contexte local" },
  ];
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal><h2 className="text-3xl lg:text-4xl text-center max-w-3xl mx-auto text-primary">La gestion locative au Cameroun, c'est encore ça :</h2></Reveal>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 80}>
              <div className="bt-card p-6 h-full">
                <div className="text-3xl">{it.i}</div>
                <p className="mt-4 text-foreground font-medium leading-relaxed">{it.t}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}><p className="mt-12 text-center text-2xl lg:text-3xl font-bold" style={{ color: "var(--gold)" }}>BailTranquille change ça.</p></Reveal>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    { i: "🏠", t: "Gestion des biens", d: "Centralisez les informations, photos et statuts de vos biens dans un espace structuré et fiable." },
    { i: "📄", t: "Contrats de bail", d: "Créez, signez électroniquement et archivez vos baux avec une vue claire sur chaque étape." },
    { i: "💳", t: "Paiements & Quittances", d: "Suivez les règlements via Orange Money ou MTN MoMo. Les quittances sont générées automatiquement." },
    { i: "🔧", t: "Maintenance", d: "Recevez et organisez les demandes d'intervention avec priorités, photos et suivi en temps réel." },
    { i: "📱", t: "Mode hors ligne", d: "L'application fonctionne sans connexion et se synchronise automatiquement au retour du réseau." },
    { i: "🔐", t: "Sécurité & Audit", d: "Chaque action importante est tracée. Les accès sont définis par rôle pour une maîtrise totale." },
  ];
  return (
    <section id="services" className="py-20 lg:py-28" style={{ background: "var(--bg-soft)" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal><h2 className="text-3xl lg:text-4xl text-center max-w-3xl mx-auto text-primary">Tout ce dont vous avez besoin, dans une seule application</h2></Reveal>
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.t} delay={(i % 3) * 80}>
              <div className="bt-card p-7 h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-2xl" style={{ background: "rgba(255,204,0,0.15)" }}>{s.i}</div>
                <h3 className="mt-5 text-xl text-primary">{s.t}</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PourQui() {
  const profils = [
    { key: "bailleur", icon: "🏦", title: "BAILLEUR", pitch: "Une lecture plus nette de votre patrimoine. Suivez vos biens, contrats et paiements depuis votre téléphone, où que vous soyez.", points: ["Vision unifiée du patrimoine","Alertes impayés automatiques","Quittances générées en un clic","Historique complet par bien"] },
    { key: "locataire", icon: "👤", title: "LOCATAIRE", pitch: "Un espace clair, accessible et rassurant. Payez votre loyer, consultez vos quittances et signalez un incident en quelques secondes.", points: ["Paiement Orange Money / MTN MoMo","Quittances disponibles immédiatement","Déclaration d'incident avec photos","Accès hors ligne aux informations clés"] },
    { key: "technicien", icon: "🔧", title: "TECHNICIEN", pitch: "Des demandes mieux structurées pour des interventions plus efficaces sur le terrain.", points: ["Missions reçues avec tous les détails","Suivi du statut en temps réel","Photos avant/après intégrées","Historique des interventions"] },
    { key: "gestionnaire", icon: "🏢", title: "GESTIONNAIRE", pitch: "Pilotez plusieurs biens et dossiers dans un cadre cohérent, lisible et professionnel.", points: ["Vue d'ensemble multi-biens","Coordination des équipes","Rapports et statistiques","Délégation des accès"] },
  ];
  const [active, setActive] = useState(0);
  const cur = profils[active];
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal><h2 className="text-3xl lg:text-4xl text-center max-w-3xl mx-auto text-primary">Une plateforme pensée pour chaque acteur</h2></Reveal>
        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
            {profils.map((p, i) => (
              <button key={p.key} onClick={() => setActive(i)} className={`px-4 sm:px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${active === i ? "bg-primary text-primary-foreground shadow-md" : "bg-secondary text-secondary-foreground hover:bg-secondary/70"}`}>
                <span className="mr-1.5">{p.icon}</span>{p.title}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="mt-10 bt-card p-8 lg:p-10 max-w-4xl mx-auto transition-all duration-300">
          <div key={cur.key} className="animate-fade-in">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl" style={{ background: "var(--gradient-gold)" }}>{cur.icon}</div>
              <h3 className="text-2xl text-primary">{cur.title}</h3>
            </div>
            <p className="mt-5 text-lg text-foreground/80 leading-relaxed">{cur.pitch}</p>
            <ul className="mt-6 grid sm:grid-cols-2 gap-3">
              {cur.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "var(--gold)", color: "var(--navy)" }}>✓</span>
                  <span className="text-foreground/85">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CommentCaMarche() {
  const steps = [
    { n: "1", t: "Créez votre compte", d: "Choisissez votre rôle — bailleur, locataire ou technicien — et configurez votre profil en quelques minutes." },
    { n: "2", t: "Ajoutez vos biens et invitez vos locataires", d: "Publiez vos biens, créez vos contrats et invitez vos locataires à rejoindre la plateforme." },
    { n: "3", t: "Gérez tout depuis votre téléphone", d: "Paiements, incidents, messages et documents — tout est centralisé et accessible hors ligne." },
  ];
  return (
    <section className="py-20 lg:py-28 text-white relative" style={{ background: "linear-gradient(180deg, #1E1B5E 0%, #0F0D2E 100%)" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal><h2 className="text-3xl lg:text-4xl text-center max-w-3xl mx-auto">Démarrez en 3 étapes</h2></Reveal>
        <div className="mt-14 grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120}>
              <div className="relative rounded-2xl p-7 h-full border border-white/10 bg-white/5 backdrop-blur transition-all hover:border-[var(--gold)]">
                <div className="absolute -top-5 left-7 w-12 h-12 rounded-xl flex items-center justify-center text-xl font-extrabold shadow-lg" style={{ background: "var(--gradient-gold)", color: "var(--navy)" }}>{s.n}</div>
                <h3 className="mt-5 text-xl text-white">{s.t}</h3>
                <p className="mt-3 text-white/75 leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Securite() {
  const blocks = [
    { i: "🔑", t: "Accès maîtrisés", d: "Chaque utilisateur évolue dans un périmètre défini. Les rôles sont strictement encadrés." },
    { i: "📝", t: "Traçabilité complète", d: "Les opérations sensibles sont enregistrées pour assurer un suivi robuste et transparent." },
    { i: "🔒", t: "Protection des données", d: "Les données sensibles sont traitées avec un niveau d'attention élevé et cloisonnées." },
    { i: "✍️", t: "Signature électronique", d: "Les contrats sont signés par code OTP, horodatés et archivés de façon sécurisée." },
    { i: "💾", t: "Sauvegardes automatiques", d: "Vos données sont sauvegardées régulièrement pour garantir la continuité du service." },
  ];
  return (
    <section id="securite" className="py-20 lg:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <Reveal><h2 className="text-3xl lg:text-4xl text-center text-primary">Votre confiance, notre priorité</h2></Reveal>
        <Reveal delay={120}><p className="mt-5 text-center text-lg text-muted-foreground max-w-2xl mx-auto">Chez BailTranquille, la sécurité n'est pas un argument marketing. C'est un principe de conception.</p></Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((b, i) => (
            <Reveal key={b.t} delay={(i % 3) * 80}>
              <div className="bt-card p-7 h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl text-2xl" style={{ background: "rgba(30,27,94,0.08)" }}>{b.i}</div>
                <h3 className="mt-5 text-lg text-primary">{b.t}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionValeurs() {
  const valeurs = ["Clarté", "Exigence", "Transparence", "Sécurité", "Simplicité"];
  return (
    <section id="vision" className="py-20 lg:py-28" style={{ background: "var(--bg-soft)" }}>
      <div className="max-w-5xl mx-auto px-5 lg:px-8 text-center">
        <Reveal><h2 className="text-3xl lg:text-4xl text-primary">Notre vision</h2></Reveal>
        <Reveal delay={100}><p className="mt-6 text-xl text-foreground/85 leading-relaxed">Faire de la gestion locative une expérience plus claire, plus fluide et plus digne de confiance pour chaque acteur du secteur.</p></Reveal>
        <Reveal delay={180}><p className="mt-6 text-lg text-muted-foreground leading-relaxed">Simplifier et fiabiliser la gestion locative pour tous les acteurs — du bailleur individuel à l'agence immobilière professionnelle.</p></Reveal>
        <Reveal delay={240}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {valeurs.map((v) => (
              <span key={v} className="px-5 py-2 rounded-full text-sm font-semibold border-2" style={{ borderColor: "var(--gold)", color: "var(--navy)", background: "white" }}>{v}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={320}>
          <blockquote className="mt-12 mx-auto max-w-3xl text-xl lg:text-2xl italic leading-relaxed text-primary px-6 py-8 rounded-2xl" style={{ borderLeft: "4px solid var(--gold)", background: "white" }}>
            "Nous construisons une plateforme qui remplace les suivis dispersés par une vision unifiée du bien, du contrat, du paiement et de l'intervention."
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "À qui s'adresse BailTranquille ?", r: "BailTranquille s'adresse aux bailleurs individuels, agences immobilières, locataires et techniciens au Cameroun et en Afrique francophone." },
    { q: "L'application fonctionne-t-elle sans internet ?", r: "Oui. BailTranquille est conçu en mode offline-first. Vous consultez vos données et effectuez des actions sans connexion. La synchronisation se fait automatiquement au retour du réseau." },
    { q: "Quels moyens de paiement sont acceptés ?", r: "Orange Money, MTN MoMo, espèces (validation manuelle) et virement bancaire." },
    { q: "Peut-on gérer plusieurs biens ?", r: "Oui, sans limite selon votre abonnement. Les plans Starter, Pro et Premium sont adaptés à chaque situation." },
    { q: "Les contrats sont-ils juridiquement valables ?", r: "Les contrats sont signés électroniquement par code OTP, horodatés et conformes au droit camerounais et à l'OHADA." },
    { q: "Comment sont protégées mes données ?", r: "Les données sensibles sont chiffrées, les accès sont définis par rôle et toutes les actions importantes sont tracées." },
    { q: "Y a-t-il une version iOS ?", r: "La version Android est disponible en priorité. La version iOS est prévue dans une prochaine mise à jour." },
    { q: "Comment démarrer ?", r: "Téléchargez l'APK Android, créez votre compte et choisissez votre rôle. La configuration prend moins de 5 minutes." },
  ];
  return (
    <section id="faq" className="py-20 lg:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-5 lg:px-8">
        <Reveal><h2 className="text-3xl lg:text-4xl text-center text-primary">Questions fréquentes</h2></Reveal>
        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 40}>
              <details className="group bt-card p-0 overflow-hidden">
                <summary className="list-none cursor-pointer flex items-center justify-between p-5 lg:p-6 font-semibold text-primary">
                  <span className="pr-4">{f.q}</span>
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg transition-transform group-open:rotate-45" style={{ background: "var(--gold)", color: "var(--navy)" }}>+</span>
                </summary>
                <div className="px-5 lg:px-6 pb-6 text-muted-foreground leading-relaxed">{f.r}</div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section id="download" className="py-20 lg:py-28 bt-gradient-hero text-white">
      <div className="max-w-4xl mx-auto px-5 lg:px-8 text-center">
        <Reveal><h2 className="text-3xl lg:text-5xl font-extrabold leading-tight">Prêt à simplifier votre gestion locative ?</h2></Reveal>
        <Reveal delay={120}><p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">Rejoignez les premiers utilisateurs de BailTranquille et découvrez une nouvelle façon de gérer vos biens immobiliers.</p></Reveal>
        <Reveal delay={240}><a href="#" className="bt-btn-primary mt-10 text-lg px-8 py-4">⬇ Télécharger l'APK Android</a></Reveal>
        <Reveal delay={300}><p className="mt-4 text-sm text-white/60">Version bêta — Android uniquement pour le moment</p></Reveal>
        <Reveal delay={360}>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["Gratuit au téléchargement", "Fonctionne hors ligne", "Données sécurisées"].map((b) => (
              <span key={b} className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-white/20 bg-white/5 text-white/90">✓ {b}</span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="text-white/80 pt-16 pb-8" style={{ background: "var(--navy-deep)" }}>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="BailTranquille logo" className="w-11 h-11 rounded-full object-cover ring-1 ring-white/20" />
            <p className="text-xl font-bold text-white">BailTranquille<span style={{ color: "var(--gold)" }}>·</span></p>
          </div>
          <p className="mt-4 text-sm text-white/65 leading-relaxed">La gestion locative centralisée, sécurisée et accessible à tous.</p>
          <div className="mt-5 flex gap-3">
            {["f", "in", "X", "ig"].map((s) => (
              <a key={s} href="#" aria-label={s} className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 text-xs hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors">{s}</a>
            ))}
          </div>
        </div>
        <FooterCol title="Navigation" links={["Vision", "Services", "Sécurité", "FAQ", "Contact", "Blog (bientôt)"]} />
        <FooterCol title="Profils" links={["Espace Bailleur", "Espace Locataire", "Espace Technicien", "Espace Gestionnaire"]} />
        <FooterCol title="Légal" links={["Mentions légales", "Confidentialité", "Conditions d'utilisation", "Cookies"]} />
      </div>
      <div className="max-w-7xl mx-auto px-5 lg:px-8 mt-12 pt-6 border-t border-white/10 text-center text-xs text-white/50">
        © 2026 BailTranquille — NMRS-BT-2026-demstone-cm · Tous droits réservés.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-sm font-semibold text-white uppercase tracking-wider">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l}><a href="#" className="text-sm text-white/65 hover:text-[var(--gold)] transition-colors">{l}</a></li>
        ))}
      </ul>
    </div>
  );
}
