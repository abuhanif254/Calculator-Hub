import React from 'react';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { collections } from '@/lib/data/collections';
import { Link } from '@/i18n/routing';
import { getCanonicalAndAlternates, getCanonicalUrl } from '@/lib/utils/seoUtils';
import { Layers, ChevronRight, ArrowRight, ShieldCheck, BookOpen, Scale } from 'lucide-react';

export const revalidate = false;
export const dynamicParams = false;

const HUB_STRINGS: Record<string, {
  metaTitle: string;
  metaDescription: string;
  home: string;
  collections: string;
  badge: string;
  heroTitlePart1: string;
  heroTitlePart2: string;
  heroDesc: string;
  statCollections: string;
  statPrivacy: string;
  toolsCount: (count: number) => string;
  openCollection: string;
  editorialTitle: string;
  editorialP1: string;
  editorialP2: string;
  exploreCompareTitle: string;
  exploreCompareDesc: string;
  exploreCompareBtn: string;
  exploreGuidesTitle: string;
  exploreGuidesDesc: string;
  exploreGuidesBtn: string;
}> = {
  en: {
    metaTitle: 'Curated Calculator & Tool Collections | Multi-Stage Workflow Bundles',
    metaDescription: 'Explore curated calculator and developer toolkits organized into sequential workflows for homebuyers, software engineers, students, e-commerce founders, and analysts.',
    home: 'Home',
    collections: 'Collections',
    badge: 'Curated Workflow Toolkits',
    heroTitlePart1: 'Multi-Tool',
    heroTitlePart2: 'Workflow Collections',
    heroDesc: 'Complex financial, engineering, health, and software tasks rarely end with a single calculation. Each curated collection bundles the exact sequence of calculators and browser utilities needed to complete an end-to-end decision workflow.',
    statCollections: 'Curated Workflow Bundles',
    statPrivacy: '100% Client-Side & Private',
    toolsCount: (n) => `${n} Integrated Tools`,
    openCollection: 'Open Workflow Bundle',
    editorialTitle: 'Why Sequential Toolkits Outperform Isolated Calculations',
    editorialP1: 'When evaluating a mortgage, launching an e-commerce store, or auditing application security, running isolated calculators often leads to inconsistent assumptions and unit-conversion drift. Our curated collections are structured as step-by-step pipelines where outputs from Stage 1 feed directly into Stage 2 and Stage 3.',
    editorialP2: 'Every tool inside a NexusCalculator collection runs 100% locally in your browser via JavaScript and WebAssembly. Your financial numbers, health metrics, and source code never leave your device.',
    exploreCompareTitle: 'Side-by-Side Model Comparisons',
    exploreCompareDesc: 'Not sure which calculator or algorithm fits your scenario? Compare formulas and boundary conditions side by side.',
    exploreCompareBtn: 'Explore All Comparisons',
    exploreGuidesTitle: 'In-Depth Technical & Financial Guides',
    exploreGuidesDesc: 'Read step-by-step tutorials, mathematical derivations, and real-world case studies behind our calculators.',
    exploreGuidesBtn: 'Explore All Guides',
  },
  es: {
    metaTitle: 'Colecciones de Calculadoras y Herramientas | Flujos de Trabajo Curados',
    metaDescription: 'Explore paquetes de calculadoras y herramientas para desarrolladores organizados en flujos de trabajo secuenciales para compradores de vivienda, ingenieros, estudiantes y analistas.',
    home: 'Inicio',
    collections: 'Colecciones',
    badge: 'Paquetes de Flujo de Trabajo',
    heroTitlePart1: 'Colecciones de',
    heroTitlePart2: 'Flujos de Trabajo Multi-Herramienta',
    heroDesc: 'Los proyectos financieros, de ingeniería, salud y desarrollo rara vez terminan con un solo cálculo. Cada colección agrupa la secuencia exacta de calculadoras y utilidades necesarias para completar un análisis de principio a fin.',
    statCollections: 'Colecciones Especializadas',
    statPrivacy: '100% Local y Privado',
    toolsCount: (n) => `${n} Herramientas Integradas`,
    openCollection: 'Abrir Colección',
    editorialTitle: 'Por Qué los Flujos de Trabajo Secuenciales Superan a los Cálculos Aislados',
    editorialP1: 'Al evaluar una hipoteca, lanzar una tienda de comercio electrónico o auditar la seguridad de una aplicación, ejecutar calculadoras aisladas suele introducir supuestos inconsistentes. Nuestras colecciones están diseñadas como secuencias paso a paso donde los resultados de la Etapa 1 alimentan directamente las etapas siguientes.',
    editorialP2: 'Cada herramienta dentro de una colección de NexusCalculator se ejecuta 100% localmente en su navegador mediante JavaScript y WebAssembly. Sus datos financieros, métricas de salud y código fuente nunca abandonan su dispositivo.',
    exploreCompareTitle: 'Comparativas de Modelos Lado a Lado',
    exploreCompareDesc: '¿No está seguro de qué calculadora o algoritmo se adapta a su caso? Compare fórmulas y condiciones límite lado a lado.',
    exploreCompareBtn: 'Ver Todas las Comparativas',
    exploreGuidesTitle: 'Guías Técnicas y Financieras en Profundidad',
    exploreGuidesDesc: 'Lea tutoriales paso a paso, demostraciones matemáticas y casos prácticos reales detrás de nuestras calculadoras.',
    exploreGuidesBtn: 'Explorar Todas las Guías',
  },
  fr: {
    metaTitle: 'Collections de Calculatrices et Boîtes à Outils | Flux de Travail Thématiques',
    metaDescription: 'Découvrez nos collections de calculatrices et outils développeur organisés en flux de travail séquentiels pour l’immobilier, l’ingénierie, les études et la finance.',
    home: 'Accueil',
    collections: 'Collections',
    badge: 'Boîtes à Outils Thématiques',
    heroTitlePart1: 'Collections et',
    heroTitlePart2: 'Flux de Travail Multi-Outils',
    heroDesc: 'Les décisions financières, techniques, médicales ou logicielles reposent rarement sur un seul calcul. Chaque collection réunit la séquence exacte de calculatrices et d’utilitaires nécessaires pour mener une analyse complète de bout en bout.',
    statCollections: 'Collections Thématiques',
    statPrivacy: '100 % Local et Privé',
    toolsCount: (n) => `${n} Outils Intégrés`,
    openCollection: 'Ouvrir la Collection',
    editorialTitle: 'Pourquoi les Flux de Travail Séquentiels Surpassent les Calculs Isolés',
    editorialP1: 'Lors de l’évaluation d’un prêt immobilier, du lancement d’une boutique en ligne ou d’un audit de sécurité, l’utilisation d’outils isolés entraîne souvent des hypothèses incohérentes. Nos collections sont structurées comme des pipelines étape par étape où les résultats de l’étape 1 alimentent directement les étapes suivantes.',
    editorialP2: 'Chaque outil d’une collection NexusCalculator s’exécute à 100 % localement dans votre navigateur via JavaScript et WebAssembly. Vos données financières, paramètres de santé et extraits de code ne quittent jamais votre appareil.',
    exploreCompareTitle: 'Comparatifs Côte à Côte de Modèles',
    exploreCompareDesc: 'Vous hésitez entre deux calculatrices ou algorithmes ? Comparez leurs formules et hypothèses côte à côte.',
    exploreCompareBtn: 'Voir Tous les Comparatifs',
    exploreGuidesTitle: 'Guides Techniques et Financiers Approfondis',
    exploreGuidesDesc: 'Consultez nos tutoriels étape par étape, démonstrations mathématiques et études de cas concrètes.',
    exploreGuidesBtn: 'Explorer Tous les Guides',
  },
  de: {
    metaTitle: 'Kuratierte Rechner-Sammlungen & Toolkits | Mehrstufige Arbeitsabläufe',
    metaDescription: 'Entdecken Sie kuratierte Rechner- und Entwickler-Toolkits als strukturierte Workflows für Immobilienkäufer, Softwareentwickler, Studierende und Finanzanalysten.',
    home: 'Startseite',
    collections: 'Sammlungen',
    badge: 'Kuratierte Workflow-Toolkits',
    heroTitlePart1: 'Mehrstufige',
    heroTitlePart2: 'Workflow-Sammlungen & Toolkits',
    heroDesc: 'Komplexe Finanz-, Ingenieur-, Gesundheits- und Softwareprojekte enden selten mit einer einzigen Berechnung. Jede Sammlung bündelt genau die Abfolge an Rechnern und Browser-Werkzeugen, die für eine durchgängige Analyse benötigt werden.',
    statCollections: 'Kuratierte Toolkits',
    statPrivacy: '100 % Lokal & Privat',
    toolsCount: (n) => `${n} Integrierte Werkzeuge`,
    openCollection: 'Toolkit öffnen',
    editorialTitle: 'Warum strukturierte Tool-Pipelines isolierten Einzelrechnungen überlegen sind',
    editorialP1: 'Bei der Immobilienfinanzierung, der E-Commerce-Kalkulation oder der Sicherheitsprüfung von Anwendungen führen isolierte Einzelrechnungen häufig zu inkonsistenten Annahmen. Unsere Sammlungen sind als aufeinanderfolgende Prozessschritte konzipiert, bei denen die Ergebnisse aus Schritt 1 direkt als kalibrierte Eingabewerte für Schritt 2 und 3 dienen.',
    editorialP2: 'Jedes Werkzeug innerhalb einer NexusCalculator-Sammlung wird zu 100 % lokal in Ihrem Browser über JavaScript und WebAssembly ausgeführt. Ihre Finanzdaten, Gesundheitswerte und Quelltexte verlassen niemals Ihr Gerät.',
    exploreCompareTitle: 'Direktvergleiche von Modellen & Rechnern',
    exploreCompareDesc: 'Unsicher, welcher Rechner oder Algorithmus zu Ihrem Szenario passt? Vergleichen Sie Formeln und Grenzwerte direkt miteinander.',
    exploreCompareBtn: 'Alle Vergleiche ansehen',
    exploreGuidesTitle: 'Ausführliche Fach- & Finanzratgeber',
    exploreGuidesDesc: 'Lesen Sie Schritt-für-Schritt-Anleitungen, mathematische Herleitungen und praxisnahe Fallstudien.',
    exploreGuidesBtn: 'Alle Ratgeber ansehen',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const ui = HUB_STRINGS[locale] || HUB_STRINGS.en;

  return {
    title: ui.metaTitle,
    description: ui.metaDescription,
    alternates: getCanonicalAndAlternates('/collections', locale),
    openGraph: {
      type: 'website',
      title: ui.metaTitle,
      description: ui.metaDescription,
      siteName: 'Nexus Calculator',
    },
  };
}

export default async function CollectionsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const ui = HUB_STRINGS[locale] || HUB_STRINGS.en;

  const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net')
    .replace(/\/$/, '')
    .replace('://nexuscalculator.net', '://www.nexuscalculator.net');
  const canonicalUrl = getCanonicalUrl('/collections', locale);

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: ui.metaTitle,
    description: ui.metaDescription,
    url: canonicalUrl,
    inLanguage: locale,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: collections.length,
      itemListElement: collections.map((c, idx) => {
        const loc = c.translations?.[locale] || c;
        return {
          '@type': 'ListItem',
          position: idx + 1,
          name: loc.title,
          url: getCanonicalUrl('/collections/[slug]', locale, c.slug),
        };
      }),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ui.home, item: `${baseUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: ui.collections, item: canonicalUrl },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6"
        >
          <Link href="/" className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors">
            {ui.home}
          </Link>
          <ChevronRight size={12} />
          <span className="text-slate-800 dark:text-slate-200 font-semibold">{ui.collections}</span>
        </nav>

        {/* Hero Section */}
        <header className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 mb-12 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 text-xs font-bold uppercase tracking-wider mb-5">
            <Layers size={14} />
            {ui.badge}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 leading-tight">
            {ui.heroTitlePart1}{' '}
            <span className="text-[#518231] dark:text-[#6fa844]">{ui.heroTitlePart2}</span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl mb-8">
            {ui.heroDesc}
          </p>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 rounded-xl px-4 py-2.5">
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">{collections.length}</span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{ui.statCollections}</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 rounded-xl px-4 py-2.5 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <ShieldCheck size={15} className="text-emerald-600 dark:text-emerald-400" />
              {ui.statPrivacy}
            </div>
          </div>
        </header>

        {/* Collections Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {collections.map((col) => {
            const loc = col.translations?.[locale] || col;
            return (
              <Link
                key={col.slug}
                href={{ pathname: '/collections/[slug]', params: { slug: col.slug } }}
                className="group flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-[#518231]/40 dark:hover:border-[#6fa844]/40 hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                      <Layers size={12} />
                      {ui.toolsCount(col.toolSlugs.length)}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors mb-2 leading-snug">
                    {loc.title}
                  </h2>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-5">
                    {loc.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/70">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {col.toolSlugs.slice(0, 4).map((tSlug) => (
                      <span
                        key={tSlug}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                      >
                        {tSlug}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#518231] dark:text-[#6fa844] group-hover:gap-2.5 transition-all">
                    {ui.openCollection} <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </section>

        {/* Editorial Methodology & Cross-Hub Links */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {ui.editorialTitle}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
              {ui.editorialP1}
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {ui.editorialP2}
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold text-sm mb-2">
                <Scale size={16} />
                <h3>{ui.exploreCompareTitle}</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {ui.exploreCompareDesc}
              </p>
              <Link
                href="/compare"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#518231] dark:text-[#6fa844] hover:underline"
              >
                {ui.exploreCompareBtn} <ArrowRight size={13} />
              </Link>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm mb-2">
                <BookOpen size={16} />
                <h3>{ui.exploreGuidesTitle}</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {ui.exploreGuidesDesc}
              </p>
              <Link
                href="/guides"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#518231] dark:text-[#6fa844] hover:underline"
              >
                {ui.exploreGuidesBtn} <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
