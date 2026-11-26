import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Code2, ShieldCheck, Zap, Layers } from "lucide-react";
import { Link, routing } from "@/i18n/routing";
import { getCalculatorBySlug } from "@/lib/data/calculators";
import { getFormulaForCalculator } from "@/lib/data/calculatorFormulas";
import { getLocalizedCalcMeta } from "@/lib/utils/toolLocalization";
import { getCanonicalAndAlternates, getCanonicalUrl, optimizeSerpTitle } from "@/lib/utils/seoUtils";
import { LocaleSiblingLinks } from "@/app/components/LocaleSiblingLinks";
import { EmbedGalleryClient, type EmbedWidgetCardItem } from "./EmbedGalleryClient";

// Pure static Edge generation — zero runtime Vercel ISR/CPU cost
export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const FEATURED_EMBED_WIDGETS: Array<{
  slug: string;
  categoryKey: EmbedWidgetCardItem["categoryKey"];
}> = [
  // Finance & Real Estate (9)
  { slug: "mortgage-calculator", categoryKey: "finance" },
  { slug: "auto-loan-calculator", categoryKey: "finance" },
  { slug: "compound-interest-calculator", categoryKey: "finance" },
  { slug: "loan-calculator", categoryKey: "finance" },
  { slug: "debt-to-income-ratio-calculator", categoryKey: "finance" },
  { slug: "retirement-calculator", categoryKey: "finance" },
  { slug: "401k-calculator", categoryKey: "finance" },
  { slug: "salary-calculator", categoryKey: "finance" },
  { slug: "margin-calculator", categoryKey: "finance" },
  // Health & Fitness (6)
  { slug: "bmi-calculator", categoryKey: "health" },
  { slug: "calorie-calculator", categoryKey: "health" },
  { slug: "bmr-calculator", categoryKey: "health" },
  { slug: "body-fat-calculator", categoryKey: "health" },
  { slug: "macro-calculator", categoryKey: "health" },
  { slug: "pace-calculator", categoryKey: "health" },
  // Electrical & Solar (5)
  { slug: "electricity-cost-calculator", categoryKey: "electrical" },
  { slug: "ohms-law-calculator", categoryKey: "electrical" },
  { slug: "solar-panel-calculator", categoryKey: "electrical" },
  { slug: "voltage-drop-calculator", categoryKey: "electrical" },
  { slug: "battery-runtime-calculator", categoryKey: "electrical" },
  // Construction, Math & Tech (6)
  { slug: "concrete-calculator", categoryKey: "science" },
  { slug: "percentage-calculator", categoryKey: "science" },
  { slug: "gpa-calculator", categoryKey: "science" },
  { slug: "subnet-calculator", categoryKey: "science" },
  { slug: "standard-deviation-calculator", categoryKey: "science" },
  { slug: "age-calculator", categoryKey: "science" },
];

interface EmbedHubLocaleCopy {
  metaTitle: string;
  metaDescription: string;
  home: string;
  breadcrumb: string;
  badge: string;
  h1: string;
  subtitle: string;
  benefits: Array<{ title: string; desc: string }>;
  cmsHeading: string;
  cmsSteps: Array<{ platform: string; steps: string }>;
  faqHeading: string;
  faqs: Array<{ q: string; a: string }>;
}

const HUB_COPY: Record<string, EmbedHubLocaleCopy> = {
  en: {
    metaTitle: "Free Embeddable Calculator Widgets for Websites & WordPress",
    metaDescription:
      "Embed 26+ free, responsive mortgage, BMI, compound interest, solar, electrical, and concrete calculators into WordPress, Webflow, or HTML with 1 click.",
    home: "Home",
    breadcrumb: "Embeddable Widgets",
    badge: "Free Website Widgets · Zero API Keys",
    h1: "Free Embeddable Calculator Widgets for Your Website",
    subtitle:
      "Boost visitor dwell time and engagement by embedding peer-reviewed financial, health, electrical, and construction calculators directly into WordPress, Webflow, Squarespace, Shopify, or plain HTML.",
    benefits: [
      {
        title: "Zero-Lag Client-Side Engine",
        desc: "Every widget executes directly inside your visitor’s browser with instant reactive outputs and lazy iframe loading.",
      },
      {
        title: "Custom Light, Dark & Auto Themes",
        desc: "Match your site’s branding with `?theme=light`, `?theme=dark`, custom heights, and optional headerless mode.",
      },
      {
        title: "Free Forever, Zero Tracking",
        desc: "No API keys, no paywalls, and no third-party ad scripts inside our embeddable iframe routes.",
      },
    ],
    cmsHeading: "How to Embed a Calculator in 30 Seconds",
    cmsSteps: [
      {
        platform: "WordPress (Gutenberg / Elementor)",
        steps:
          "Click “Preview & Customize” on any widget, copy the HTML snippet, add a “Custom HTML” block in your WordPress post or page, paste the code, and publish.",
      },
      {
        platform: "Webflow, Squarespace & Wix",
        steps:
          "Insert an Embed / Code Block element where you want the calculator to appear, paste the responsive `width=\"100%\"` iframe code, and save.",
      },
      {
        platform: "Next.js, React, Ghost & Static HTML",
        steps:
          "Paste the `<iframe>` tag directly into your Markdown HTML card or JSX template. Use `loading=\"lazy\"` so it never blocks your Largest Contentful Paint (LCP).",
      },
    ],
    faqHeading: "Frequently Asked Questions About Embedding Widgets",
    faqs: [
      {
        q: "Are NexusCalculator embeddable widgets really free for commercial blogs and agency sites?",
        a: "Yes. You can embed any widget on personal blogs, real estate sites, fitness coaching pages, SaaS docs, and commercial publications free of charge, provided the clean attribution link beneath the widget remains intact.",
      },
      {
        q: "Will embedding a calculator slow down my Core Web Vitals or PageSpeed score?",
        a: "No. Every embed snippet includes `loading=\"lazy\"` and runs from globally cached static edge routes, so the iframe only initializes when a reader scrolls near it without blocking initial page paint.",
      },
      {
        q: "Can I embed widgets in German, Spanish, or French for international audiences?",
        a: "Yes. Switch the site language at the bottom of this page to generate native `/de/`, `/es/`, or `/fr/` iframe embed codes with localized labels, metric units, and regional currency conventions.",
      },
      {
        q: "Do the embedded calculators display ads or collect my visitors’ inputs?",
        a: "No. Embed routes (`/embed/calculators/*`) are ad-free and execute all arithmetic strictly inside the visitor’s browser with zero server-side input logging.",
      },
    ],
  },
  es: {
    metaTitle: "Widgets de Calculadoras Gratis para Incrustar en WordPress y Webs",
    metaDescription:
      "Incrusta más de 26 calculadoras gratuitas de hipotecas, IMC, interés compuesto, placas solares y hormigón en WordPress, Webflow o HTML en un clic.",
    home: "Inicio",
    breadcrumb: "Widgets Incrustables",
    badge: "Widgets Gratuitos · Sin Claves API",
    h1: "Widgets de Calculadoras Gratis para Tu Sitio Web o Blog",
    subtitle:
      "Aumenta el tiempo de permanencia de tus lectores incrustando calculadoras financieras, de salud, electricidad y construcción directamente en WordPress, Webflow, Wix o HTML.",
    benefits: [
      {
        title: "Cálculo Instantáneo en el Navegador",
        desc: "Cada widget se ejecuta localmente en el navegador del visitante con carga diferida (`loading=\"lazy\"`) para proteger tu velocidad.",
      },
      {
        title: "Modo Claro, Oscuro y Altura Ajustable",
        desc: "Personaliza el aspecto con `?theme=light`, `?theme=dark`, distintas alturas y cabecera opcional.",
      },
      {
        title: "Gratis para Siempre y Sin Anuncios en el Iframe",
        desc: "Sin registros, sin límites de tráfico y sin publicidad dentro del marco incrustado.",
      },
    ],
    cmsHeading: "Cómo Incrustar una Calculadora en 30 Segundos",
    cmsSteps: [
      {
        platform: "WordPress (Gutenberg / Elementor)",
        steps:
          "Haz clic en «Vista Previa y Ajustes», copia el código HTML, añade un bloque «HTML personalizado» en tu entrada o página y pega el fragmento.",
      },
      {
        platform: "Webflow, Squarespace y Wix",
        steps:
          "Inserta un bloque de código incrustado (Embed), pega el `<iframe>` adaptable con `width=\"100%\"` y guarda los cambios.",
      },
      {
        platform: "HTML Estático, Ghost y React",
        steps:
          "Pega el bloque `<iframe>` directamente en tu plantilla. Gracias a `loading=\"lazy\"`, no afectará al LCP ni a Core Web Vitals.",
      },
    ],
    faqHeading: "Preguntas Frecuentes sobre Widgets Incrustables",
    faqs: [
      {
        q: "¿Son realmente gratuitos los widgets para webs comerciales e inmobiliarias?",
        a: "Sí. Puedes usarlos gratuitamente en blogs financieros, portales inmobiliarios, webs de entrenamiento o portales educativos manteniendo visible el enlace de atribución.",
      },
      {
        q: "¿Afectará el iframe al rendimiento de PageSpeed o Core Web Vitals?",
        a: "No. Todos los códigos incluyen carga diferida `loading=\"lazy\"` y se sirven desde caché estática global para no bloquear la carga inicial.",
      },
      {
        q: "¿Se muestran anuncios dentro de la calculadora incrustada?",
        a: "No. Las rutas `/embed/calculators/*` están libres de publicidad y ejecutan las fórmulas exclusivamente en el navegador del usuario.",
      },
    ],
  },
  fr: {
    metaTitle: "Widgets de Calculatrices Gratuits à Intégrer (WordPress & HTML)",
    metaDescription:
      "Intégrez gratuitement plus de 26 calculatrices (prêt immobilier, IMC, intérêts composés, solaire, béton) dans WordPress, Webflow ou HTML en 1 clic.",
    home: "Accueil",
    breadcrumb: "Widgets à Intégrer",
    badge: "Widgets Gratuits · Sans Clé API",
    h1: "Widgets de Calculatrices Gratuits pour Votre Site Web",
    subtitle:
      "Enrichissez vos articles et augmentez l’engagement de vos visiteurs en intégrant nos calculatrices financières, santé, électriques et travaux sur WordPress, Webflow, Wix ou HTML.",
    benefits: [
      {
        title: "Exécution Locale Ultra-Rapide",
        desc: "Chaque widget fonctionne côté client avec chargement différé (`loading=\"lazy\"`) pour préserver vos Core Web Vitals.",
      },
      {
        title: "Thèmes Clair, Sombre et Auto",
        desc: "Adaptez le rendu à votre charte graphique via `?theme=light`, `?theme=dark`, la hauteur et l’option sans en-tête.",
      },
      {
        title: "100 % Gratuit et Sans Publicité dans l’Iframe",
        desc: "Aucune clé API requise, aucun suivi intrusif et aucune publicité dans nos routes `/embed/calculators/*`.",
      },
    ],
    cmsHeading: "Intégrer une Calculatrice en 30 Secondes",
    cmsSteps: [
      {
        platform: "WordPress (Gutenberg / Elementor)",
        steps:
          "Cliquez sur « Aperçu & Personnaliser », copiez le code HTML, ajoutez un bloc « HTML personnalisé » dans votre page WordPress et collez l’extrait.",
      },
      {
        platform: "Webflow, Squarespace & Wix",
        steps:
          "Ajoutez un bloc Embed / Code HTML, collez l’`<iframe>` responsive (`width=\"100%\"`) et publiez.",
      },
      {
        platform: "Sites Statiques, Ghost & React",
        steps:
          "Insérez directement la balise `<iframe>` dans votre code HTML. L’attribut `loading=\"lazy\"` protège votre score LCP.",
      },
    ],
    faqHeading: "Questions Fréquentes sur les Widgets Intégrables",
    faqs: [
      {
        q: "Puis-je intégrer ces calculatrices gratuitement sur un blog ou un site professionnel ?",
        a: "Oui, l’utilisation est gratuite pour les blogs, agences immobilières, coachs sportifs et sites éditoriaux tant que le lien d’attribution reste intact.",
      },
      {
        q: "L’iframe ralentit-elle mon site ou mon score PageSpeed ?",
        a: "Non. L’attribut `loading=\"lazy\"` diffère le chargement jusqu’au défilement et nos routes embed sont servies depuis le CDN edge.",
      },
      {
        q: "Les widgets intégrés contiennent-ils des publicités ?",
        a: "Non, nos vues d’intégration (`/embed/calculators/*`) sont totalement sans publicité et traitent les données localement.",
      },
    ],
  },
  de: {
    metaTitle: "Kostenlose Rechner-Widgets zum Einbetten für WordPress & Websites",
    metaDescription:
      "Binden Sie über 26 kostenlose, responsive Rechner (Hypothek, BMI, Zinseszins, Photovoltaik, Stromkosten, Beton) per 1-Klick-Iframe in Ihre Website ein.",
    home: "Startseite",
    breadcrumb: "Rechner-Widgets",
    badge: "Kostenlose Website-Widgets · Ohne API-Key",
    h1: "Kostenlose Rechner-Widgets für Ihre Website & WordPress",
    subtitle:
      "Steigern Sie die Verweildauer Ihrer Leser, indem Sie fachlich geprüfte Finanz-, Gesundheits-, Elektro- und Baurechner direkt in WordPress, Webflow, TYPO3, Wix oder HTML einbetten.",
    benefits: [
      {
        title: "Blitzschnelle Browser-Engine",
        desc: "Alle Berechnungen laufen lokal im Browser Ihrer Besucher mit `loading=\"lazy\"` für grüne Core Web Vitals.",
      },
      {
        title: "Hell-, Dunkel- & Auto-Design",
        desc: "Passen Sie jedes Widget per `?theme=light`, `?theme=dark`, Wunschhöhe und optionaler Kopfzeile an Ihr Layout an.",
      },
      {
        title: "Dauerhaft Kostenlos & Werbefrei im Iframe",
        desc: "Kein API-Schlüssel, keine Registrierung und keine Werbeskripte auf unseren Embed-Routen.",
      },
    ],
    cmsHeading: "Rechner-Widget in 30 Sekunden einbinden",
    cmsSteps: [
      {
        platform: "WordPress (Gutenberg / Elementor)",
        steps:
          "Klicken Sie auf „Vorschau & Anpassen“, kopieren Sie den HTML-Code, fügen Sie einen „Individuelles HTML“-Block ein und speichern Sie.",
      },
      {
        platform: "Webflow, Wix, Squarespace & TYPO3",
        steps:
          "Platzieren Sie ein HTML-Embed-Element an der gewünschten Stelle und fügen Sie den responsiven `width=\"100%\"`-Iframe-Code ein.",
      },
      {
        platform: "Statisches HTML, Ghost & React",
        steps:
          "Fügen Sie das `<iframe>`-Snippet direkt in Ihr Template ein. Durch `loading=\"lazy\"` bleibt Ihr LCP-Wert optimal.",
      },
    ],
    faqHeading: "Häufige Fragen zum Einbetten von Rechner-Widgets",
    faqs: [
      {
        q: "Sind die Rechner-Widgets auch für kommerzielle Blogs und Immobilien-Websites kostenlos?",
        a: "Ja. Sie können alle Widgets kostenlos auf Blogs, Maklerseiten, Fitness-Portalen und Magazinen nutzen, solange der dezente Quellenlink unter dem Widget erhalten bleibt.",
      },
      {
        q: "Beeinträchtigt das eingebettete Widget meine Ladezeit oder PageSpeed-Werte?",
        a: "Nein. Dank `loading=\"lazy\"` lädt das Widget erst beim Herunterscrollen und wird über das globale Edge-CDN ausgeliefert.",
      },
      {
        q: "Werden innerhalb der eingebetteten Rechner Anzeigen ausgespielt?",
        a: "Nein. Unsere Embed-Routen (`/embed/calculators/*`) sind vollständig werbefrei und verarbeiten alle Eingaben lokal im Browser.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = HUB_COPY[locale] || HUB_COPY.en;
  const alternates = getCanonicalAndAlternates("/embed-widgets", locale);

  return {
    title: optimizeSerpTitle(copy.metaTitle, locale, "page"),
    description: copy.metaDescription,
    alternates,
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: alternates.canonical,
      siteName: "NexusCalculator",
      locale,
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function EmbedWidgetsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const copy = HUB_COPY[locale] || HUB_COPY.en;
  const canonicalUrl = getCanonicalUrl("/embed-widgets", locale);
  const homeUrl = getCanonicalUrl("/", locale);
  const alternates = getCanonicalAndAlternates("/embed-widgets", locale);

  const widgetItems: EmbedWidgetCardItem[] = FEATURED_EMBED_WIDGETS.map((entry) => {
    const calc = getCalculatorBySlug(entry.slug);
    if (!calc) return null;
    const meta = getLocalizedCalcMeta(calc.slug, locale, calc.title, calc.description);
    const formulaDef = getFormulaForCalculator(calc.slug);
    return {
      slug: calc.slug,
      title: meta.title,
      description: meta.description,
      categoryKey: entry.categoryKey,
      canonicalUrl: getCanonicalUrl("/calculators/[slug]", locale, calc.slug),
      formula: formulaDef?.formula,
    };
  }).filter(Boolean) as EmbedWidgetCardItem[];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: copy.home, item: homeUrl },
      { "@type": "ListItem", position: 2, name: copy.breadcrumb, item: canonicalUrl },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: copy.h1,
    description: copy.metaDescription,
    numberOfItems: widgetItems.length,
    itemListElement: widgetItems.map((w, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: w.title,
      url: w.canonicalUrl,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const benefitIcons = [Zap, Layers, ShieldCheck];

  return (
    <main className="min-h-screen bg-slate-50/60 dark:bg-slate-950 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="pt-12 pb-14 md:pt-16 md:pb-16 border-b border-slate-200/70 dark:border-slate-800 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 dark:from-slate-900 dark:via-slate-900/60 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500 dark:text-slate-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#518231] hover:underline">
                  {copy.home}
                </Link>
              </li>
              <li>/</li>
              <li className="text-slate-800 dark:text-slate-200 font-semibold" aria-current="page">
                {copy.breadcrumb}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-[#518231] dark:text-[#6fa844] text-xs font-bold uppercase tracking-wider mb-4 border border-[#518231]/20">
              <Code2 className="w-3.5 h-3.5" />
              <span>{copy.badge}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {copy.h1}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              {copy.subtitle}
            </p>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
            {copy.benefits.map((b, i) => {
              const Icon = benefitIcons[i] || Zap;
              return (
                <div
                  key={b.title}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h2 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base mb-1">
                    {b.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <EmbedGalleryClient locale={locale} items={widgetItems} />

        {/* CMS Integration Guide */}
        <div className="mt-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {copy.cmsHeading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {copy.cmsSteps.map((step, idx) => (
              <div
                key={step.platform}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/70 dark:border-slate-800"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-[#518231] dark:text-[#6fa844] mb-1.5">
                  0{idx + 1} · {step.platform}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.steps}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <section className="mt-14 max-w-4xl">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {copy.faqHeading}
          </h2>
          <div className="space-y-3">
            {copy.faqs.map((faq) => (
              <details
                key={faq.q}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
              >
                <summary className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base cursor-pointer">
                  {faq.q}
                </summary>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Cross-Locale Discovery */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800">
          <LocaleSiblingLinks languages={alternates.languages} currentLocale={locale} />
        </div>
      </section>
    </main>
  );
}
