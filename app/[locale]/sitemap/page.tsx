import { Metadata } from 'next';
import { Link, resolveIntlHref } from '@/i18n/routing';
import { sitemapCategories, developerToolsMenu, pdfToolsMenu, imageToolsMenu, generalLinks } from '@/lib/data/sitemapData';
import { calculators } from '@/lib/data/calculators';
import { collections } from '@/lib/data/collections';
import { comparisons } from '@/lib/data/comparisons';
import { resolveHref } from '@/lib/utils/linkResolver';
import { getLocalizedCalcMeta, getLocalizedToolMeta } from '@/lib/utils/toolLocalization';
import { Search, Compass, ExternalLink, ChevronDown, Shield, Layers, Scale, BookOpen, Calculator } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';
import Script from 'next/script';

export const revalidate = false;
export const dynamicParams = false;

const metaByLocale: Record<string, { title: string; description: string }> = {
  en: {
    title: 'All Tools & Calculators Directory — 300+ Free Utilities',
    description: 'The master directory of all free calculators, developer tools, PDF utilities, image editors, and guides on Nexus Calculator.',
  },
  es: {
    title: 'Directorio Completo de Calculadoras y Herramientas Gratis',
    description: 'Explora el directorio maestro con más de 300 calculadoras financieras, científicas, herramientas de desarrollo, PDF e imagen gratuitas.',
  },
  fr: {
    title: 'Annuaire Complet des Calculatrices et Outils Gratuits',
    description: 'Parcourez le répertoire complet de plus de 300 calculatrices gratuites, outils développeur, utilitaires PDF, éditeurs d’images et guides.',
  },
  de: {
    title: 'Alle Rechner & Online-Tools im Überblick — Gesamtverzeichnis',
    description: 'Das vollständige Verzeichnis aller kostenlosen Finanz-, Mathe- und Wissenschaftsrechner sowie Entwickler-, PDF- und Bild-Tools.',
  },
};

const uiByLocale: Record<
  string,
  {
    badge: string;
    h1: string;
    subtitle: (count: number) => string;
    searchPlaceholder: string;
    searchBtn: string;
    siloTitle: string;
    siloBody: string;
    jumpTo: string;
    calculatorsHeading: string;
    moreCalcsTitle: string;
    moreCalcsDesc: string;
    devToolsHeading: string;
    pdfToolsHeading: string;
    imageToolsHeading: string;
    collectionsHeading: string;
    comparisonsHeading: string;
    guidesCtaTitle: string;
    guidesCtaDesc: string;
    guidesCtaBtn: string;
    faqHeading: string;
    generalResources: string;
    faqs: { q: string; a: string }[];
  }
> = {
  en: {
    badge: 'Master Directory',
    h1: 'All Tools & Calculators',
    subtitle: (count) => `Browse our complete collection of ${count}+ free, high-performance calculators and developer utilities.`,
    searchPlaceholder: 'Search for any tool...',
    searchBtn: 'Search',
    siloTitle: 'The Complete Browser-Based Utility Ecosystem',
    siloBody:
      'Welcome to the Nexus Calculator master directory. Whether you are calculating an amortization schedule, formatting JSON, merging PDFs, or solving physics equations, every tool runs 100% locally in your browser for instant results and complete privacy.',
    jumpTo: 'Jump to:',
    calculatorsHeading: 'Calculators',
    moreCalcsTitle: 'Specialized & Scientific Calculators',
    moreCalcsDesc: 'Additional physics, chemistry, weather, and specialized financial calculators.',
    devToolsHeading: 'Developer Tools',
    pdfToolsHeading: 'PDF Tools',
    imageToolsHeading: 'Image Tools',
    collectionsHeading: 'Curated Toolkits & Collections',
    comparisonsHeading: 'Side-by-Side Calculator Comparisons',
    guidesCtaTitle: 'Educational Guides & Formula Tutorials',
    guidesCtaDesc: 'Explore 190+ in-depth mathematical guides, worked examples, and step-by-step tutorials.',
    guidesCtaBtn: 'Browse All Guides',
    faqHeading: 'Frequently Asked Questions',
    generalResources: 'General Resources',
    faqs: [
      {
        q: 'Are these calculators and developer tools really free to use?',
        a: 'Yes, all of our tools and calculators are 100% free to use with no paywalls, hidden fees, or usage limits.',
      },
      {
        q: 'Is my data or code saved when I use these tools?',
        a: 'No. Everything runs locally inside your browser. We do not track, save, or store your inputs on our servers, ensuring complete privacy.',
      },
      {
        q: 'Can I use these tools on mobile and desktop?',
        a: 'Yes, every calculator and utility is responsive and optimized for both desktop and mobile browsers.',
      },
    ],
  },
  es: {
    badge: 'Directorio Maestro',
    h1: 'Todas las Herramientas y Calculadoras',
    subtitle: (count) => `Explora nuestra colección completa de más de ${count} calculadoras gratuitas y utilidades para desarrolladores.`,
    searchPlaceholder: 'Buscar cualquier herramienta...',
    searchBtn: 'Buscar',
    siloTitle: 'El Ecosistema Completo de Utilidades en tu Navegador',
    siloBody:
      'Bienvenido al directorio maestro de Nexus Calculator. Tanto si calculas una tabla de amortización hipotecaria como si formateas JSON, combinas archivos PDF o resuelves ecuaciones científicas, todas las herramientas se ejecutan localmente en tu navegador.',
    jumpTo: 'Ir a:',
    calculatorsHeading: 'Calculadoras',
    moreCalcsTitle: 'Calculadoras Especializadas y Científicas',
    moreCalcsDesc: 'Calculadoras adicionales de física, química, meteorología y finanzas especializadas.',
    devToolsHeading: 'Herramientas para Desarrolladores',
    pdfToolsHeading: 'Herramientas PDF',
    imageToolsHeading: 'Herramientas de Imagen',
    collectionsHeading: 'Colecciones y Paquetes de Herramientas',
    comparisonsHeading: 'Comparativas Lado a Lado',
    guidesCtaTitle: 'Guías Educativas y Tutoriales de Fórmulas',
    guidesCtaDesc: 'Explora más de 190 guías matemáticas detalladas con ejemplos prácticos paso a paso.',
    guidesCtaBtn: 'Ver Todas las Guías',
    faqHeading: 'Preguntas Frecuentes',
    generalResources: 'Recursos Generales',
    faqs: [
      {
        q: '¿Son realmente gratuitas estas calculadoras y herramientas?',
        a: 'Sí, todas nuestras herramientas y calculadoras son 100 % gratuitas, sin muros de pago ni límites de uso.',
      },
      {
        q: '¿Se guardan mis datos o mi código al usar estas herramientas?',
        a: 'No. Todo se ejecuta localmente en tu propio navegador. No almacenamos ni enviamos tus datos a servidores externos.',
      },
      {
        q: '¿Puedo utilizar las calculadoras desde el móvil?',
        a: 'Sí, todas las calculadoras y utilidades están optimizadas para dispositivos móviles, tabletas y ordenadores.',
      },
    ],
  },
  fr: {
    badge: 'Répertoire Principal',
    h1: 'Tous les Outils et Calculatrices',
    subtitle: (count) => `Parcourez notre collection complète de plus de ${count} calculatrices gratuites et outils pour développeurs.`,
    searchPlaceholder: 'Rechercher un outil...',
    searchBtn: 'Rechercher',
    siloTitle: 'L’Écosystème Complet d’Outils dans Votre Navigateur',
    siloBody:
      'Bienvenue dans l’annuaire principal de Nexus Calculator. Que vous calculiez un tableau d’amortissement, formatiez du JSON, fusionniez des PDF ou résolviez des équations scientifiques, tous nos outils s’exécutent localement dans votre navigateur.',
    jumpTo: 'Aller à :',
    calculatorsHeading: 'Calculatrices',
    moreCalcsTitle: 'Calculatrices Scientifiques et Spécialisées',
    moreCalcsDesc: 'Calculatrices supplémentaires de physique, chimie, météo et finance spécialisée.',
    devToolsHeading: 'Outils Développeur',
    pdfToolsHeading: 'Outils PDF',
    imageToolsHeading: 'Outils Image',
    collectionsHeading: 'Collections et Packs d’Outils',
    comparisonsHeading: 'Comparatifs Côte à Côte',
    guidesCtaTitle: 'Guides Pédagogiques et Tutoriels Mathématiques',
    guidesCtaDesc: 'Découvrez plus de 190 guides détaillés avec formules et exemples étape par étape.',
    guidesCtaBtn: 'Voir Tous les Guides',
    faqHeading: 'Questions Fréquentes',
    generalResources: 'Ressources Générales',
    faqs: [
      {
        q: 'Ces calculatrices et outils sont-ils vraiment gratuits ?',
        a: 'Oui, tous nos outils et calculatrices sont 100 % gratuits, sans abonnement ni limite d’utilisation.',
      },
      {
        q: 'Mes données ou mon code sont-ils enregistrés ?',
        a: 'Non. Tout fonctionne localement dans votre navigateur afin de garantir une confidentialité totale.',
      },
      {
        q: 'Puis-je utiliser ces outils sur smartphone et ordinateur ?',
        a: 'Oui, chaque calculatrice et utilitaire est entièrement adapté aux écrans mobiles, tablettes et ordinateurs.',
      },
    ],
  },
  de: {
    badge: 'Gesamtverzeichnis',
    h1: 'Alle Tools & Rechner',
    subtitle: (count) => `Durchsuchen Sie unsere komplette Sammlung von über ${count} kostenlosen Rechnern und Entwickler-Tools.`,
    searchPlaceholder: 'Nach einem Tool suchen...',
    searchBtn: 'Suchen',
    siloTitle: 'Das Komplette Browser-Ökosystem für Rechner & Tools',
    siloBody:
      'Willkommen im Gesamtverzeichnis von Nexus Calculator. Ob Tilgungsplan, JSON-Formatierung, PDF-Bearbeitung oder wissenschaftliche Gleichungen — alle Berechnungen erfolgen zu 100 % lokal in Ihrem Browser.',
    jumpTo: 'Springen zu:',
    calculatorsHeading: 'Rechner',
    moreCalcsTitle: 'Wissenschaftliche & Spezialisierte Rechner',
    moreCalcsDesc: 'Weitere Rechner für Physik, Chemie, Wetter und spezialisierte Finanzanalysen.',
    devToolsHeading: 'Entwickler-Tools',
    pdfToolsHeading: 'PDF-Tools',
    imageToolsHeading: 'Bild-Tools',
    collectionsHeading: 'Kuratierte Tool-Sammlungen & Pakete',
    comparisonsHeading: 'Direktvergleiche (Rechner im Vergleich)',
    guidesCtaTitle: 'Ausführliche Ratgeber & Formelanleitungen',
    guidesCtaDesc: 'Entdecken Sie über 190 detaillierte Mathematik-, Finanz- und Technik-Ratgeber.',
    guidesCtaBtn: 'Alle Ratgeber ansehen',
    faqHeading: 'Häufig gestellte Fragen (FAQ)',
    generalResources: 'Allgemeine Informationen',
    faqs: [
      {
        q: 'Sind alle Rechner und Entwickler-Tools wirklich kostenlos?',
        a: 'Ja, sämtliche Rechner und Werkzeuge sind zu 100 % kostenlos und ohne Nutzungslimits verfügbar.',
      },
      {
        q: 'Werden meine eingegebenen Daten oder mein Code gespeichert?',
        a: 'Nein. Alle Berechnungen laufen lokal in Ihrem Browser ab. Ihre Daten verlassen niemals Ihr Gerät.',
      },
      {
        q: 'Funktionieren die Tools auch auf dem Smartphone?',
        a: 'Ja, alle Rechner und Dienstprogramme sind vollständig für Smartphones, Tablets und Desktop-PCs optimiert.',
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');
  const meta = metaByLocale[locale] || metaByLocale.en;

  return {
    title: meta.title,
    description: meta.description,
    alternates: getCanonicalAndAlternates('/sitemap', locale),
  };
}

function getLocalizedLabelForHref(href: string, fallbackName: string, locale: string): string {
  if (href.startsWith('/calculators/')) {
    const slug = href.replace('/calculators/', '');
    return getLocalizedCalcMeta(slug, locale, fallbackName).title;
  }
  if (href.startsWith('/tools/')) {
    const slug = href.replace('/tools/', '');
    return getLocalizedToolMeta(slug, locale, fallbackName).title;
  }
  return fallbackName;
}

export default async function SitemapPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  setRequestLocale(locale);

  const ui = uiByLocale[locale] || uiByLocale.en;
  const { getCanonicalUrl } = await import('@/lib/utils/seoUtils');
  const canonicalSitemapUrl = getCanonicalUrl('/sitemap', locale);

  // Find calculators not already covered in sitemapCategories so 0 calculators are orphaned from /sitemap
  const coveredCalcSlugs = new Set<string>();
  for (const cat of sitemapCategories) {
    for (const link of cat.links) {
      const h = resolveHref(link);
      if (h.startsWith('/calculators/')) {
        coveredCalcSlugs.add(h.replace('/calculators/', ''));
      }
    }
  }
  const additionalCalculators = calculators.filter((c) => !coveredCalcSlugs.has(c.slug));

  // Generate Schemas for SEO
  const allItems = [
    ...sitemapCategories.flatMap(cat => cat.links.map(link => {
      const href = resolveHref(link);
      return { name: getLocalizedLabelForHref(href, link, locale), category: cat.title };
    })),
    ...additionalCalculators.map(c => ({
      name: getLocalizedCalcMeta(c.slug, locale, c.title).title,
      category: ui.moreCalcsTitle,
    })),
    ...developerToolsMenu.flatMap(cat => cat.items.map(item => {
      const href = resolveHref(item.name);
      return { name: getLocalizedLabelForHref(href, item.name, locale), category: cat.title };
    })),
    ...pdfToolsMenu.flatMap(cat => cat.items.map(item => {
      const href = resolveHref(item.name);
      return { name: getLocalizedLabelForHref(href, item.name, locale), category: cat.title };
    })),
    ...imageToolsMenu.flatMap(cat => cat.items.map(item => {
      const href = resolveHref(item.name);
      return { name: getLocalizedLabelForHref(href, item.name, locale), category: cat.title };
    }))
  ];

  const itemListSchema = {
    "@type": "ItemList",
    "name": ui.h1,
    "description": (metaByLocale[locale] || metaByLocale.en).description,
    "numberOfItems": allItems.length,
    "itemListElement": allItems.slice(0, 30).map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name
    }))
  };

  const baseUrl = 'https://www.nexuscalculator.net';
  
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'es' ? 'Inicio' : locale === 'fr' ? 'Accueil' : locale === 'de' ? 'Startseite' : 'Home',
        "item": `${baseUrl}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": ui.h1,
        "item": canonicalSitemapUrl
      }
    ]
  };

  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": ui.faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [itemListSchema, breadcrumbSchema, faqSchema]
  };

  return (
    <main className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pb-20">
      <Script id="sitemap-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero Search Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-16 pb-12 px-4">
        <div className="max-w-[1000px] mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-900/30 text-[#518231] dark:text-[#78b34f] text-sm font-semibold mb-6">
            <Compass size={16} />
            <span>{ui.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            {ui.h1}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
            {ui.subtitle(allItems.length)}
          </p>

          <form action={`/${locale}/search`} method="GET" className="max-w-[600px] mx-auto relative shadow-xl shadow-slate-200/50 dark:shadow-none rounded-xl mb-12">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-slate-400" />
            </div>
            <input 
              name="q"
              type="text" 
              placeholder={ui.searchPlaceholder}
              className="block w-full pl-12 pr-4 py-4 md:py-5 border-2 border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] transition-colors text-lg"
            />
            <button type="submit" className="absolute inset-y-2 right-2 bg-[#518231] hover:bg-[#436a28] text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              {ui.searchBtn}
            </button>
          </form>

          {/* SILO Context SEO Text */}
          <div className="max-w-3xl mx-auto text-left bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{ui.siloTitle}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {ui.siloBody}
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Quick Jump Nav */}
      <div className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 px-4 shadow-sm">
        <div className="max-w-[1400px] mx-auto flex gap-2 overflow-x-auto custom-scrollbar pb-1">
          <span className="text-sm font-bold text-slate-500 dark:text-slate-400 shrink-0 flex items-center mr-2">{ui.jumpTo}</span>
          {sitemapCategories.map(cat => (
            <a key={cat.id} href={`#${cat.id}`} className="shrink-0 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors">
              {cat.title}
            </a>
          ))}
          {developerToolsMenu.map(cat => (
            <a key={cat.id} href={`#${cat.id}`} className="shrink-0 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors">
              {cat.title}
            </a>
          ))}
          {pdfToolsMenu.map(cat => (
            <a key={cat.id} href={`#${cat.id}`} className="shrink-0 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors">
              {cat.title}
            </a>
          ))}
          {imageToolsMenu.map(cat => (
            <a key={cat.id} href={`#${cat.id}`} className="shrink-0 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors">
              {cat.title}
            </a>
          ))}
          <a href="#collections" className="shrink-0 px-3 py-1.5 rounded-full bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-bold transition-colors">
            {ui.collectionsHeading}
          </a>
          <a href="#comparisons" className="shrink-0 px-3 py-1.5 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-bold transition-colors">
            {ui.comparisonsHeading}
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          
          {/* Calculators Section */}
          <div className="space-y-12">
            <div className="flex items-center gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{ui.calculatorsHeading}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sitemapCategories.map((category) => (
                <section key={category.id} id={category.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 transition-all scroll-mt-24">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-green-50 dark:bg-green-900/20 text-[#518231] rounded-lg">
                      {category.icon && <category.icon size={22} />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>
                  <ul className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                    {category.links.map((link) => {
                      const rawHref = resolveHref(link);
                      const label = getLocalizedLabelForHref(rawHref, link, locale);
                      return (
                        <li key={link}>
                          <Link 
                            href={resolveIntlHref(rawHref)}
                            className="group flex items-center justify-between text-[15px] font-medium text-slate-700 dark:text-slate-300 hover:text-[#518231] dark:hover:text-[#6fa844] py-1 transition-colors"
                          >
                            <span className="truncate">{label}</span>
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}

              {additionalCalculators.length > 0 && (
                <section id="specialized-calculators" className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 transition-all scroll-mt-24">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-green-50 dark:bg-green-900/20 text-[#518231] rounded-lg">
                      <Calculator size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      {ui.moreCalcsTitle}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                    {ui.moreCalcsDesc}
                  </p>
                  <ul className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                    {additionalCalculators.map((calc) => {
                      const label = getLocalizedCalcMeta(calc.slug, locale, calc.title).title;
                      return (
                        <li key={calc.slug}>
                          <Link
                            href={resolveIntlHref(`/calculators/${calc.slug}`)}
                            className="group flex items-center justify-between text-[15px] font-medium text-slate-700 dark:text-slate-300 hover:text-[#518231] dark:hover:text-[#6fa844] py-1 transition-colors"
                          >
                            <span className="truncate">{label}</span>
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              )}
            </div>
          </div>

          {/* Developer Tools Section */}
          <div className="space-y-12 pt-8">
            <div className="flex items-center gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{ui.devToolsHeading}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {developerToolsMenu.map((category) => (
                <section key={category.id} id={category.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 transition-all scroll-mt-24">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-green-50 dark:bg-green-900/20 text-[#518231] rounded-lg">
                      {category.icon && <category.icon size={22} />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>
                  <ul className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                    {category.items.map((item) => {
                      const rawHref = resolveHref(item.name);
                      const label = getLocalizedLabelForHref(rawHref, item.name, locale);
                      return (
                        <li key={item.name}>
                          <Link 
                            href={resolveIntlHref(rawHref)}
                            className="group flex items-center justify-between text-[15px] font-medium text-slate-700 dark:text-slate-300 hover:text-[#518231] dark:hover:text-[#6fa844] py-1 transition-colors"
                            title={item.desc}
                          >
                            <span className="truncate">{label}</span>
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          {/* PDF Tools Section */}
          <div className="space-y-12 pt-8">
            <div className="flex items-center gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{ui.pdfToolsHeading}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pdfToolsMenu.map((category) => (
                <section key={category.id} id={category.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 transition-all scroll-mt-24">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-green-50 dark:bg-green-900/20 text-[#518231] rounded-lg">
                      {category.icon && <category.icon size={22} />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>
                  <ul className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                    {category.items.map((item) => {
                      const rawHref = resolveHref(item.name);
                      const label = getLocalizedLabelForHref(rawHref, item.name, locale);
                      return (
                        <li key={item.name}>
                          <Link 
                            href={resolveIntlHref(rawHref)}
                            className="group flex items-center justify-between text-[15px] font-medium text-slate-700 dark:text-slate-300 hover:text-[#518231] dark:hover:text-[#6fa844] py-1 transition-colors"
                            title={item.desc}
                          >
                            <span className="truncate">{label}</span>
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          {/* Image Tools Section */}
          <div className="space-y-12 pt-8">
            <div className="flex items-center gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{ui.imageToolsHeading}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {imageToolsMenu.map((category) => (
                <section key={category.id} id={category.id} className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 transition-all scroll-mt-24">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 bg-green-50 dark:bg-green-900/20 text-[#518231] rounded-lg">
                      {category.icon && <category.icon size={22} />}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                    {category.description}
                  </p>
                  <ul className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-2">
                    {category.items.map((item) => {
                      const rawHref = resolveHref(item.name);
                      const label = getLocalizedLabelForHref(rawHref, item.name, locale);
                      return (
                        <li key={item.name}>
                          <Link 
                            href={resolveIntlHref(rawHref)}
                            className="group flex items-center justify-between text-[15px] font-medium text-slate-700 dark:text-slate-300 hover:text-[#518231] dark:hover:text-[#6fa844] py-1 transition-colors"
                            title={item.desc}
                          >
                            <span className="truncate">{label}</span>
                            <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          </div>

          {/* Curated Collections & Toolkits Section */}
          <div className="space-y-8 pt-8 scroll-mt-24" id="collections">
            <div className="flex items-center gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
              <div className="p-2.5 bg-emerald-600 rounded-xl">
                <Layers size={22} className="text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{ui.collectionsHeading}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((col) => {
                const t = col.translations?.[locale] || col;
                return (
                  <Link
                    key={col.slug}
                    href={{ pathname: '/collections/[slug]', params: { slug: col.slug } }}
                    className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors mb-2">
                        {t.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                        {t.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#518231]">
                      <span>{col.toolSlugs.length} tools</span>
                      <ExternalLink size={14} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Side-by-Side Comparisons Section */}
          <div className="space-y-8 pt-8 scroll-mt-24" id="comparisons">
            <div className="flex items-center gap-4 border-b-2 border-slate-200 dark:border-slate-800 pb-4">
              <div className="p-2.5 bg-blue-600 rounded-xl">
                <Scale size={22} className="text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">{ui.comparisonsHeading}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comparisons.map((comp) => {
                const t = comp.translations?.[locale] || comp;
                return (
                  <Link
                    key={comp.slug}
                    href={{ pathname: '/compare/[slug]', params: { slug: comp.slug } }}
                    className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors mb-2">
                        {t.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                        {t.seoDescription}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end text-xs font-semibold text-[#518231]">
                      <ExternalLink size={14} />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Educational Guides Hub Callout */}
          <div className="bg-gradient-to-r from-[#518231]/10 to-emerald-500/10 border border-[#518231]/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#518231] text-white rounded-xl shrink-0">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{ui.guidesCtaTitle}</h2>
                <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">{ui.guidesCtaDesc}</p>
              </div>
            </div>
            <Link
              href="/guides"
              className="shrink-0 bg-[#518231] hover:bg-[#436a28] text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              {ui.guidesCtaBtn}
            </Link>
          </div>

          {/* Data Privacy Platform Section */}
          <div className="space-y-8 pt-8" id="data-privacy">
            <div className="flex items-center gap-4 border-b-2 border-violet-200 dark:border-violet-900 pb-4">
              <div className="p-2.5 bg-violet-600 rounded-xl">
                <Shield size={22} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Data Privacy Platform</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Enterprise-grade database anonymization · GDPR · HIPAA · PCI-DSS · Free forever</p>
              </div>
              <Link href={'/database-privacy' as any} className="ml-auto shrink-0 inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">
                <ExternalLink size={14} /> Open Platform
              </Link>
            </div>
          </div>

          {/* Native FAQ Section */}
          <section className="pt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">{ui.faqHeading}</h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((faq, index) => (
                <details key={index} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <span>{faq.name}</span>
                    <ChevronDown size={20} className="text-slate-400 group-open:rotate-180 transition-transform duration-200" />
                  </summary>
                  <div className="px-6 pb-4 pt-2 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.acceptedAnswer.text}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Footer General Links */}
          <section className="pt-16 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{ui.generalResources}</h3>
            <div className="flex flex-wrap gap-4">
              {generalLinks.map((link) => {
                let href: any = "/";
                if (link === "Privacy Policy") href = "/privacy-policy";
                if (link === "Terms of Use") href = "/terms-of-use";
                if (link === "About Us") href = "/about-us";
                return (
                  <Link 
                    key={link} 
                    href={href} 
                    className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#518231] dark:hover:text-[#6fa844] hover:border-[#518231] dark:hover:border-[#518231] transition-all"
                  >
                    {link}
                  </Link>
                );
              })}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
}

