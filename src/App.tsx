import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  WifiOff, Receipt, MessageCircle, ShieldCheck, Wallet, Home, Bell, Lock,
  Smartphone, Save, RefreshCw, Check, Plus, Menu, X, Download,
} from "lucide-react";

/* ---------- Constantes ---------- */
const APK_URL = "/chillrooms.apk";
const WA_NUMBER = "237678887492";
const WA_DISPLAY = "+237 678 88 74 92";
const waLink = (msg = "Bonjour Chill Rooms, j'ai une question.") =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

const NAV = [
  ["Fonctionnalités", "#fonctionnalites"],
  ["Sans internet", "#sans-internet"],
  ["Tarifs", "#tarifs"],
  ["Tutoriels", "#tutoriels"],
  ["À propos", "#a-propos"],
  ["Questions", "#faq"],
  ["Contact", "#contact"],
] as const;

/* ---------- Apparition au défilement ---------- */
function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setV(true), io.disconnect()), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`bt-fade-in ${v ? "is-visible" : ""} ${className}`}>{children}</div>;
}

const Eyebrow = ({ children, light }: { children: ReactNode; light?: boolean }) => (
  <p className={`text-xs font-bold uppercase tracking-[0.18em] ${light ? "text-mint" : "text-forest"}`}>{children}</p>
);

const Logo = ({ light }: { light?: boolean }) => (
  <a href="#top" className={`leading-none ${light ? "text-primary-foreground" : "text-ink"}`}>
    <span className="block font-[Space_Grotesk] text-2xl font-bold tracking-tight">chill</span>
    <span className="block text-[10px] font-bold uppercase tracking-[0.3em]">rooms</span>
  </a>
);

/* ---------- Navbar ---------- */
function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Logo />
        <nav className="hidden gap-6 text-sm font-medium text-ink lg:flex">
          {NAV.map(([l, h]) => <a key={h} href={h} className="hover:text-forest">{l}</a>)}
        </nav>
        <a href="#obtenir" className="hidden rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 lg:inline-flex">
          Essayer 30 jours
        </a>
        <button className="lg:hidden text-ink" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-3 border-t border-border px-5 py-4 lg:hidden">
          {NAV.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="font-medium text-ink">{l}</a>)}
          <a href="#obtenir" onClick={() => setOpen(false)} className="rounded-full bg-forest px-5 py-2.5 text-center font-semibold text-primary-foreground">Essayer 30 jours</a>
        </nav>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function PhoneMock() {
  return (
    <div className="relative mx-auto w-[270px]">
      <p className="absolute -top-6 right-0 text-[10px] text-primary-foreground/60">Données d'exemple</p>
      <div className="rounded-[2.2rem] border-[6px] border-ink bg-background p-3 shadow-2xl">
        <div className="rounded-md bg-alert py-1 text-center text-[9px] font-bold text-primary-foreground">MODE TEST · J-23 RESTANTS</div>
        <p className="mt-2 text-sm font-bold text-ink">Bonsoir Madame Nkeng</p>
        <p className="text-[10px] text-muted-foreground">Douala · Bonamoussadi</p>
        <div className="mt-2 rounded-xl bg-forest p-3 text-primary-foreground">
          <p className="text-[10px] opacity-80">Bénéfice net d'octobre</p>
          <p className="text-xl font-bold">412 500 F</p>
          <p className="text-[9px] opacity-80">Encaissé 520 000 F · Dépenses 107 500 F</p>
        </div>
        <div className="mt-2 rounded-xl border border-border p-2">
          <p className="text-[10px] text-muted-foreground">Collecte des loyers</p>
          <div className="my-1 h-1.5 rounded bg-surface"><div className="h-full w-4/5 rounded bg-forest" /></div>
          <p className="text-[10px] font-semibold text-alert">Reste 130 000 F</p>
        </div>
        <div className="mt-2 space-y-2 rounded-xl border border-border p-2">
          {[["Marcel T.", "30 000 F"], ["Aïcha B.", "100 000 F"]].map(([n, r]) => (
            <div key={n} className="flex items-center justify-between">
              <div><p className="text-[11px] font-bold text-ink">{n}</p><p className="text-[10px] text-alert">Reste {r}</p></div>
              <span className="rounded-full bg-forest px-2 py-1 text-[9px] font-semibold text-primary-foreground">Rappel WhatsApp</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -right-8 top-16 flex items-center gap-1 rounded-lg bg-background px-3 py-1.5 text-[11px] font-semibold text-ink shadow-lg"><WifiOff size={12} /> Sans internet</div>
      <div className="absolute -left-10 bottom-6 rounded-lg bg-background px-3 py-2 text-[11px] text-ink shadow-lg">
        <p className="font-bold">Reçu CR-2026-0004</p><p className="text-muted-foreground">QR vérifiable hors ligne</p>
      </div>
    </div>
  );
}

function Hero() {
  const feats = [
    ["Sans internet", "Toute la gestion reste dans le téléphone."],
    ["Reçus numérotés", "Chaque paiement laisse une trace."],
    ["Relances WhatsApp", "Messages prêts, un geste pour envoyer."],
    ["Sauvegarde chiffrée", "Un fichier à garder hors du téléphone."],
  ];
  return (
    <section id="top" className="bg-ink text-primary-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 pt-16 pb-12 lg:grid-cols-[1.3fr_1fr] lg:pt-24">
        <Reveal>
          <Eyebrow light>Application Android pour propriétaires et gestionnaires</Eyebrow>
          <h1 className="mt-4 text-4xl leading-[1.05] sm:text-6xl">
            Vos loyers, vos locataires et vos reçus. <span className="text-mint">Dans votre téléphone.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">
            Chill Rooms suit chaque franc encaissé, prépare vos relances WhatsApp et garde vos reçus en ordre. Tout fonctionne sans connexion internet, même dans un quartier sans réseau.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={APK_URL} download className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 font-semibold text-ink hover:opacity-90"><Download size={18} /> Obtenir l'application</a>
            <a href="#fonctionnalites" className="rounded-full border border-primary-foreground px-6 py-3 font-semibold hover:bg-primary-foreground/10">Voir ce qu'elle fait</a>
          </div>
          <p className="mt-5 text-sm text-primary-foreground/60">Android 8 ou plus. Pensée pour les téléphones d'entrée de gamme. 30 jours d'essai avec toutes les fonctions.</p>
        </Reveal>
        <Reveal><PhoneMock /></Reveal>
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 border-t border-primary-foreground/15 px-5 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {feats.map(([t, d]) => <div key={t}><p className="font-bold">{t}</p><p className="text-sm text-primary-foreground/70">{d}</p></div>)}
      </div>
    </section>
  );
}

/* ---------- Gains ---------- */
function Gains() {
  const items = [
    [Wallet, "Savoir ce qui est rentré", "Chaque paiement est enregistré et laisse une trace. Le bénéfice de votre mois se calcule tout seul."],
    [Bell, "Ne plus courir après les loyers", "Vos relances sont prêtes chaque matin. Vous n'avez plus qu'à les envoyer."],
    [Home, "Garder vos logements en ordre", "Maisons, chambres et locataires au même endroit, que vous louiez en meublé ou non."],
    [Lock, "Garder la main sur vos informations", "Tout reste dans votre téléphone, protégé par un code et votre empreinte."],
  ] as const;
  return (
    <section id="fonctionnalites" className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div><Eyebrow>Ce que vous y gagnez</Eyebrow><h2 className="mt-3 text-4xl text-ink">Quatre soucis de moins chaque mois</h2></div>
          <p className="text-muted-foreground">Voici ce que vous obtenez en pratique. Le reste se découvre en essayant l'application pendant 30 jours.</p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {items.map(([I, t, d]) => (
            <Reveal key={t} className="rounded-2xl border border-border p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mint-soft text-forest"><I size={20} /></div>
              <h3 className="mt-4 text-xl text-ink">{t}</h3><p className="mt-2 text-muted-foreground">{d}</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">Il y a plus dans l'application. D'autres outils se découvrent à l'usage — 30 jours, toutes les fonctions.</p>
      </div>
    </section>
  );
}

/* ---------- Sans internet ---------- */
function SansInternet() {
  return (
    <section id="sans-internet" className="bg-surface py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>Sans internet</Eyebrow>
          <h2 className="mt-3 text-4xl text-ink">Pas de réseau ? Votre gestion continue.</h2>
          <p className="mt-4 text-muted-foreground">Vos biens, vos locataires et vos reçus sont enregistrés dans une base chiffrée, sur votre téléphone. Aucune connexion n'est jamais nécessaire pour travailler.</p>
          <ul className="mt-6 space-y-3 text-ink">
            {["Créer un compte, encaisser et éditer un reçu sans réseau.", "Activer votre abonnement sans connexion.", "Vos données de gestion ne sont envoyées à personne."].map((t) => (
              <li key={t} className="flex gap-3"><Check className="mt-0.5 shrink-0 text-forest" size={18} />{t}</li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="space-y-3">
          {[
            [Smartphone, "Votre téléphone", "Base chiffrée, PIN et empreinte. Tout y reste."],
            [Save, "Bouton « Sauvegarder »", "Fichier de sauvegarde chiffré. À copier sur une carte SD, par Bluetooth ou ailleurs."],
            [RefreshCw, "Un nouveau téléphone", "Vos biens, locataires et reçus reviennent tels quels."],
          ].map(([I, t, d]: any) => (
            <div key={t} className="flex gap-4 rounded-2xl bg-background p-5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mint-soft text-forest"><I size={20} /></div>
              <div><p className="font-bold text-ink">{t}</p><p className="text-sm text-muted-foreground">{d}</p></div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Tarifs ---------- */
const PLANS = [
  { n: "Essentiel", r: "1 à 5 logements", p: 3000, contrats: false },
  { n: "Pro", r: "6 à 20 logements", p: 7500, contrats: false },
  { n: "Agence", r: "21 à 50 logements", p: 15000, contrats: true },
  { n: "Entreprise", r: "Plus de 50 logements", p: 30000, contrats: true },
];
const DURATIONS = [1, 3, 6, 12];
const fmt = (n: number) => n.toLocaleString("fr-FR").replace(/\u202f|\u00a0/g, " ") + " F";

function Tarifs() {
  const [d, setD] = useState(3);
  return (
    <section id="tarifs" className="bg-surface py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div><Eyebrow>Tarifs</Eyebrow><h2 className="mt-3 text-4xl text-ink">Un forfait selon le nombre de vos logements</h2></div>
          <p className="text-muted-foreground">Chaque forfait donne accès à toutes les fonctions de l'application. Seul le nombre de logements change. Une chambre louable compte pour un logement.</p>
        </Reveal>
        <div className="mt-10 flex flex-wrap items-center gap-6 rounded-2xl bg-mint-soft p-5">
          <p className="font-bold text-ink">Essai gratuit</p>
          <div><p className="text-2xl font-bold text-ink">0 F</p><p className="text-xs text-muted-foreground">pendant 30 jours</p></div>
          <p className="flex-1 text-sm text-muted-foreground">Toutes les fonctions, sans engagement. Ensuite, vous gardez la consultation et l'export de vos données.</p>
        </div>
        <p className="mt-8 text-xs font-bold uppercase tracking-widest text-ink">Durée de l'abonnement</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {DURATIONS.map((m) => (
            <button key={m} onClick={() => setD(m)} className={`rounded-full border px-5 py-2 text-sm font-semibold ${d === m ? "border-forest bg-mint-soft text-ink" : "border-border bg-background text-ink"}`}>{m} mois</button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((pl) => {
            const full = pl.p * d;
            const save = d === 1 ? 0 : 1500 * (d / 3);
            return (
              <div key={pl.n} className="rounded-2xl border border-border bg-background p-5">
                <p className="text-lg font-bold text-ink">{pl.n}</p><p className="text-sm text-muted-foreground">{pl.r}</p>
                <p className="mt-4 text-3xl font-bold text-ink">{fmt(pl.p)}<span className="text-sm font-normal text-muted-foreground"> / mois</span></p>
                {d > 1 && (
                  <div className="mt-4 rounded-xl bg-forest p-3 text-primary-foreground">
                    <span className="rounded-full bg-background px-2 py-0.5 text-[10px] font-bold text-forest">MEILLEUR CHOIX</span>
                    <p className="mt-2 text-xs opacity-80">Total pour {d} mois</p>
                    <p className="text-2xl font-bold">{fmt(full - save)}</p>
                    <p className="text-xs line-through opacity-70">au lieu de {fmt(full)}</p>
                    <p className="text-xs font-bold">Vous économisez {fmt(save)}</p>
                  </div>
                )}
                <ul className="mt-4 space-y-2 text-sm text-ink">
                  {["Toutes les fonctions de l'application", "Reçus et relances sans limite", "Mises à jour incluses", ...(pl.contrats ? ["Contrats N1 à N3 inclus"] : [])].map((f) => (
                    <li key={f} className="flex gap-2"><Check size={16} className="mt-0.5 shrink-0 text-forest" />{f}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            ["1. Touchez « S'abonner »", "Dans l'application, depuis Paramètres puis Abonnement."],
            ["2. Envoyez le message WhatsApp", "Il est déjà écrit avec votre nom, votre quartier et le forfait choisi. Vous réglez par Mobile Money."],
            ["3. Saisissez votre code", "Nous vous répondons avec un code personnel qui active votre abonnement."],
          ].map(([t, x]) => <div key={t} className="border-t-2 border-ink pt-3"><p className="font-bold text-ink">{t}</p><p className="text-sm text-muted-foreground">{x}</p></div>)}
        </div>
        <p className="mt-8 rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground">
          Prix en francs CFA, payables par Mobile Money. Une question sur le forfait à choisir ? <a href={waLink("Bonjour, quel forfait Chill Rooms me conseillez-vous ?")} className="font-semibold text-forest underline">Écrivez-nous sur WhatsApp.</a>
        </p>
      </div>
    </section>
  );
}

/* ---------- Obtenir ---------- */
function Obtenir() {
  return (
    <section id="obtenir" className="bg-ink py-20 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <Eyebrow light>Obtenir l'application</Eyebrow>
          <h2 className="mt-3 text-4xl">Chill Rooms arrive sur votre téléphone</h2>
          <p className="mt-4 text-primary-foreground/80">Téléchargez le fichier d'installation directement ici. En cas de souci, écrivez-nous sur WhatsApp.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={APK_URL} download className="inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 font-semibold text-ink"><Download size={18} /> Télécharger l'APK</a>
            <a href={waLink("Bonjour, je souhaite installer Chill Rooms.")} className="inline-flex items-center gap-2 rounded-full border border-primary-foreground px-6 py-3 font-semibold"><MessageCircle size={18} /> WhatsApp</a>
          </div>
        </Reveal>
        <Reveal className="rounded-2xl border border-primary-foreground/15 p-6">
          {[["Système", "Android 8 ou plus"], ["Langue", "Français"], ["Connexion", "Non requise pour utiliser l'application"], ["Essai", "30 jours, toutes les fonctions"]].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-primary-foreground/10 py-3 last:border-0"><span className="text-primary-foreground/60">{k}</span><span className="text-right font-semibold">{v}</span></div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Accordéon ---------- */
function Acc({ title, children, open }: { title: string; children: ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group border-b border-border py-4">
      <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-ink">
        {title}<Plus size={18} className="transition group-open:rotate-45" />
      </summary>
      <div className="mt-3 text-muted-foreground">{children}</div>
    </details>
  );
}

/* ---------- Tutoriels ---------- */
function Tutoriels() {
  return (
    <section id="tutoriels" className="bg-background py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div><Eyebrow>Tutoriels</Eyebrow><h2 className="mt-3 text-4xl text-ink">Démarrer, activer, sauvegarder</h2></div>
          <p className="text-muted-foreground">Les premiers pas sont ici. Pour le reste, l'application vous guide directement à l'écran.</p>
        </Reveal>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-forest">Premiers pas</p>
            <Acc title="Installer l'application" open>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Téléchargez le fichier d'installation depuis cette page et attendez la fin du téléchargement.</li>
                <li>Ouvrez le fichier depuis la notification ou le dossier Téléchargements.</li>
                <li>Si Android bloque l'installation, touchez Paramètres puis activez « Autoriser depuis cette source ».</li>
                <li>Revenez en arrière et touchez Installer.</li>
                <li>Si Play Protect affiche un avertissement, touchez « Plus de détails » puis « Installer quand même ».</li>
              </ol>
            </Acc>
            <Acc title="Créer son compte">Ouvrez l'application, saisissez votre nom et votre quartier, puis choisissez un code PIN. Aucune connexion n'est nécessaire.</Acc>
            <Acc title="Demander son essai gratuit">L'essai de 30 jours démarre dès la création du compte, avec toutes les fonctions.</Acc>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-forest">Abonnement et sauvegarde</p>
            <Acc title="Activer ou renouveler son abonnement">Touchez « S'abonner » dans Paramètres, envoyez le message WhatsApp prérempli, réglez par Mobile Money puis saisissez le code reçu.</Acc>
            <Acc title="Sauvegarder ses données">Touchez « Sauvegarder » : un fichier chiffré est créé. Copiez-le sur une carte SD, par Bluetooth ou ailleurs.</Acc>
            <Acc title="Changer de téléphone">Installez l'application sur le nouveau téléphone, puis importez votre fichier de sauvegarde. Tout revient tel quel.</Acc>
          </div>
        </div>
        <p className="mt-10 rounded-xl bg-surface p-4 text-sm text-muted-foreground">Le reste se passe dans l'application. Des aides courtes et des vidéos de moins de trois minutes apparaissent à l'écran, au moment où vous en avez besoin.</p>
      </div>
    </section>
  );
}

/* ---------- À propos ---------- */
function APropos() {
  const vals = [
    ["Simple", "Les gestes du quotidien se font en quelques touches, sans formation."],
    ["Utilisable partout", "Aucune connexion n'est requise pour travailler. L'application tourne sur Android 8 et sur 2 Go de mémoire."],
    ["Vos données restent chez vous", "Elles sont enregistrées sur votre téléphone. Nous n'y avons pas accès."],
    ["Un prix honnête", "Pas de frais cachés. Un forfait selon votre nombre de logements, payé quand vous le décidez."],
  ];
  return (
    <section id="a-propos" className="bg-surface py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
        <Reveal>
          <Eyebrow>À propos</Eyebrow>
          <h2 className="mt-3 text-3xl leading-tight text-ink">Un cahier, des messages WhatsApp et la mémoire ne suffisent plus quand on gère plusieurs chambres. Chill Rooms remplace tout cela par un outil simple, fait pour le Cameroun.</h2>
          <p className="mt-5 text-muted-foreground">Nous construisons une application pour les propriétaires qui louent une maison à plusieurs chambres comme pour ceux qui gèrent un parc de logements. Elle tient compte de la réalité : réseau instable, téléphones d'entrée de gamme, paiements par Mobile Money, loyers qui arrivent en plusieurs fois.</p>
          <p className="mt-4 font-semibold text-ink">Notre promesse est courte. Chaque franc encaissé est tracé, chaque retard est relancé à temps, chaque document se retrouve facilement.</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {vals.map(([t, d]) => <Reveal key={t} className="rounded-2xl bg-background p-5"><ShieldCheck className="text-forest" size={20} /><p className="mt-3 font-bold text-ink">{t}</p><p className="mt-1 text-sm text-muted-foreground">{d}</p></Reveal>)}
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const qs = [
    ["Faut-il de l'internet pour utiliser Chill Rooms ?", "Non. Tout fonctionne sans connexion : encaisser, éditer un reçu, préparer une relance et même activer votre abonnement."],
    ["Comment choisir mon forfait ?", "Comptez vos logements : une chambre louable compte pour un logement. De 1 à 5 logements, c'est Essentiel. Le forfait de 3 mois revient moins cher que trois mois payés séparément."],
    ["Comment payer mon abonnement ?", "Par Mobile Money, après avoir envoyé le message WhatsApp préparé par l'application. Vous recevez un code qui active l'abonnement."],
    ["Que se passe-t-il à la fin de l'essai ou de l'abonnement ?", "Vous gardez la consultation et l'export de vos données. Il suffit de vous abonner pour continuer à encaisser et relancer."],
    ["Et si je perds ou casse mon téléphone ?", "Si vous avez fait une sauvegarde, installez l'application sur un nouveau téléphone et importez le fichier : tout revient tel quel."],
    ["Puis-je donner l'application à mon gardien ?", "Écrivez-nous sur WhatsApp, nous vous expliquerons comment l'organiser selon votre situation."],
    ["Mes données sont-elles envoyées quelque part ?", "Non. Vos données de gestion restent dans votre téléphone. Nous n'y avons pas accès."],
    ["Existe-t-il une version iPhone ?", "Pas pour l'instant. Chill Rooms est disponible sur Android 8 ou plus."],
    ["Où trouver l'application ?", "Ici même, sur ce site : touchez « Télécharger l'APK »."],
  ];
  return (
    <section id="faq" className="bg-background py-20">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal><Eyebrow>Questions fréquentes</Eyebrow><h2 className="mt-3 text-4xl text-ink">Ce que les propriétaires demandent avant d'installer</h2></Reveal>
        <div className="mt-8">{qs.map(([q, a]) => <Acc key={q} title={q}>{a}</Acc>)}</div>
      </div>
    </section>
  );
}

/* ---------- Légal ---------- */
function Legal() {
  return (
    <section id="conditions" className="bg-surface py-16">
      <div className="mx-auto max-w-3xl px-5">
        <Eyebrow>Informations légales</Eyebrow>
        <h2 className="mt-3 text-3xl text-ink">Conditions, confidentialité et mentions légales</h2>
        <div className="mt-6">
          <Acc title="Conditions d'utilisation">L'application est fournie pour la gestion de vos logements. Un essai gratuit de 30 jours est proposé, puis un abonnement selon le nombre de logements.</Acc>
          <Acc title="Politique de confidentialité">Vos données de gestion sont enregistrées uniquement sur votre téléphone, dans une base chiffrée. Elles ne sont transmises à personne.</Acc>
          <Acc title="Mentions légales">Chill Rooms — Douala, Cameroun. Contact : {WA_DISPLAY} (WhatsApp).</Acc>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact + Footer ---------- */
function Contact() {
  return (
    <section id="contact" className="bg-ink py-20 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-2 lg:items-center">
        <h2 className="text-4xl">Une question ? <span className="text-mint">Écrivez-nous sur WhatsApp.</span></h2>
        <div>
          <p className="text-primary-foreground/80">Pour un abonnement, un changement de téléphone ou un problème d'installation, le support se fait par WhatsApp. Précisez votre nom, votre quartier et le modèle de votre téléphone.</p>
          <a href={waLink()} className="mt-6 inline-flex items-center gap-2 rounded-full bg-mint px-6 py-3 font-semibold text-ink"><MessageCircle size={18} /> {WA_DISPLAY}</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-primary-foreground/10 bg-ink py-12 text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:grid-cols-3">
        <div><Logo light /><p className="mt-3 text-sm text-primary-foreground/60">La gestion de vos logements, dans votre téléphone, avec ou sans réseau.</p></div>
        <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
          {NAV.slice(0, 6).map(([l, h]) => <a key={h} href={h} className="hover:text-mint">{l}</a>)}
        </div>
        <div className="flex flex-col gap-2 text-sm text-primary-foreground/70">
          <a href="#conditions" className="hover:text-mint">Conditions d'utilisation</a>
          <a href="#conditions" className="hover:text-mint">Confidentialité</a>
          <a href={waLink()} className="hover:text-mint">{WA_DISPLAY}</a>
          <a href={APK_URL} download className="font-semibold text-mint">Télécharger l'APK</a>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-primary-foreground/40">© {new Date().getFullYear()} Chill Rooms</p>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero /><Gains /><SansInternet /><Tarifs /><Obtenir /><Tutoriels /><APropos /><FAQ /><Legal /><Contact />
      </main>
      <Footer />
    </>
  );
}
