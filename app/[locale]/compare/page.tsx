import React from 'react';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { comparisons } from '@/lib/data/comparisons';
import { Link } from '@/i18n/routing';
import { getCanonicalAndAlternates, getCanonicalUrl } from '@/lib/utils/seoUtils';
import { Scale, ChevronRight, ArrowRight, ShieldCheck, BookOpen, Layers } from 'lucide-react';

export const revalidate = false;
export const dynamicParams = false;

const HUB_STRINGS: Record<string, {
  metaTitle: string;
  metaDescription: string;
  home: string;
  compare: string;
  badge: string;
  heroTitlePart1: string;
  heroTitlePart2: string;
  heroDesc: string;
  statComparisons: string;
  statVerified: string;
  statPrivacy: string;
  readComparison: string;
  verdictPreview: string;
  editorialTitle: string;
  editorialP1: string;
  editorialP2: string;
  exploreCollectionsTitle: string;
  exploreCollectionsDesc: string;
  exploreCollectionsBtn: string;
  exploreGuidesTitle: string;
  exploreGuidesDesc: string;
  exploreGuidesBtn: string;
}> = {
  en: {
    metaTitle: 'Side-by-Side Calculator & Tool Comparisons | Analytical Methodology Hub',
    metaDescription: 'Compare financial, mathematical, health, and developer tools side by side. Understand formula assumptions, boundary conditions, and when to use each model.',
    home: 'Home',
    compare: 'Comparisons',
    badge: 'Analytical Comparison Hub',
    heroTitlePart1: 'Side-by-Side',
    heroTitlePart2: 'Model & Tool Comparisons',
    heroDesc: 'Choosing the right mathematical or financial model determines the accuracy of your decisions. Explore our peer-reviewed side-by-side comparisons to evaluate underlying formulas, input variables, and real-world boundary conditions.',
    statComparisons: 'Head-to-Head Comparisons',
    statVerified: '100% Formula Verified',
    statPrivacy: 'Client-Side Execution',
    readComparison: 'View Full Comparison',
    verdictPreview: 'Analytical Verdict',
    editorialTitle: 'How We Benchmark & Compare Mathematical Models',
    editorialP1: 'Two calculators that appear to solve the same problem often rely on fundamentally different mathematical assumptions. For example, comparing APR vs. APY, Snowball vs. Avalanche debt payoff, or BMI vs. Body Fat Percentage requires understanding how compounding frequency, behavioral weighting, or anthropometric inputs shift the final output.',
    editorialP2: 'Every side-by-side guide on NexusCalculator is reviewed by our Quantitative Finance, Clinical & Health, or Systems Engineering editorial boards. Each comparison documents exact formula differences, sensitivity trade-offs, and a clear recommendation on when to run both models in parallel.',
    exploreCollectionsTitle: 'Curated Multi-Tool Workflow Collections',
    exploreCollectionsDesc: 'Execute sequential calculator and utility pipelines tailored for homebuyers, software engineers, students, and financial planners.',
    exploreCollectionsBtn: 'Browse Workflow Collections',
    exploreGuidesTitle: 'In-Depth Technical & Financial Guides',
    exploreGuidesDesc: 'Read step-by-step tutorials, mathematical derivations, and real-world case studies behind our calculators.',
    exploreGuidesBtn: 'Explore All Guides',
  },
  es: {
    metaTitle: 'Comparativas de Calculadoras y Herramientas Lado a Lado | Centro Analítico',
    metaDescription: 'Compare calculadoras financieras, matemáticas, de salud y herramientas para desarrolladores lado a lado. Comprenda las fórmulas, supuestos y cuándo usar cada modelo.',
    home: 'Inicio',
    compare: 'Comparativas',
    badge: 'Centro de Comparación Analítica',
    heroTitlePart1: 'Comparativas Lado a Lado de',
    heroTitlePart2: 'Modelos y Herramientas',
    heroDesc: 'Elegir el modelo matemático o financiero adecuado determina la precisión de sus decisiones. Explore nuestras comparativas revisadas por expertos para evaluar fórmulas subyacentes, variables de entrada y casos de uso reales.',
    statComparisons: 'Comparativas Directas',
    statVerified: '100% Fórmulas Verificadas',
    statPrivacy: 'Ejecución Local Privada',
    readComparison: 'Ver Comparativa Completa',
    verdictPreview: 'Veredicto Analítico',
    editorialTitle: 'Cómo Evaluamos y Comparamos Modelos Matemáticos',
    editorialP1: 'Dos calculadoras que parecen resolver el mismo problema a menudo se basan en supuestos matemáticos fundamentalmente distintos. Por ejemplo, comparar APR frente a APY, el método Bola de Nieve frente a Avalancha de deudas, o el IMC frente al Porcentaje de Grasa Corporal requiere comprender cómo la frecuencia de capitalización o las variables de entrada alteran el resultado final.',
    editorialP2: 'Cada guía comparativa en NexusCalculator es revisada por nuestros comités editoriales de Finanzas Cuantitativas, Salud Clínica o Ingeniería de Sistemas. Cada análisis documenta las diferencias exactas de fórmula, los compromisos de sensibilidad y cuándo ejecutar ambos modelos en paralelo.',
    exploreCollectionsTitle: 'Colecciones de Flujos de Trabajo Curados',
    exploreCollectionsDesc: 'Ejecute secuencias integradas de calculadoras y utilidades diseñadas para compradores de vivienda, ingenieros de software, estudiantes y planificadores financieros.',
    exploreCollectionsBtn: 'Explorar Colecciones',
    exploreGuidesTitle: 'Guías Técnicas y Financieras en Profundidad',
    exploreGuidesDesc: 'Lea tutoriales paso a paso, demostraciones matemáticas y casos prácticos reales detrás de nuestras calculadoras.',
    exploreGuidesBtn: 'Explorar Todas las Guías',
  },
  fr: {
    metaTitle: 'Comparatifs Côte à Côte de Calculatrices et Outils | Centre Analytique',
    metaDescription: 'Comparez côte à côte nos calculatrices financières, mathématiques, de santé et nos outils développeur. Comprenez les formules, hypothèses et cas d’usage.',
    home: 'Accueil',
    compare: 'Comparatifs',
    badge: 'Centre de Comparaison Analytique',
    heroTitlePart1: 'Comparatifs Côte à Côte de',
    heroTitlePart2: 'Modèles et Outils',
    heroDesc: 'Le choix du bon modèle mathématique ou financier détermine la précision de vos décisions. Parcourez nos comparatifs vérifiés pour évaluer les formules sous-jacentes, les variables d’entrée et les conditions limites.',
    statComparisons: 'Comparatifs Directs',
    statVerified: '100 % Formules Vérifiées',
    statPrivacy: 'Exécution Locale Privée',
    readComparison: 'Voir le Comparatif Complet',
    verdictPreview: 'Verdict Analytique',
    editorialTitle: 'Comment Nous Évaluons et Comparons les Modèles Mathématiques',
    editorialP1: 'Deux calculatrices qui semblent résoudre le même problème reposent souvent sur des hypothèses mathématiques fondamentalement différentes. Par exemple, comparer le TAEG et le rendement annuel effectif, la méthode Boule de Neige et l’Avalanche de dettes, ou l’IMC et le taux de masse grasse nécessite de comprendre comment la fréquence de capitalisation ou les paramètres biométriques modifient le résultat.',
    editorialP2: 'Chaque guide comparatif sur NexusCalculator est vérifié par nos comités éditoriaux en Finance Quantitative, Santé Clinique ou Ingénierie Système. Chaque étude documente les différences exactes de formules et précise quand utiliser les deux modèles conjointement.',
    exploreCollectionsTitle: 'Collections et Boîtes à Outils Thématiques',
    exploreCollectionsDesc: 'Exécutez des flux de travail séquentiels regroupant les meilleures calculatrices pour l’immobilier, l’ingénierie logicielle, les études et la finance.',
    exploreCollectionsBtn: 'Parcourir les Collections',
    exploreGuidesTitle: 'Guides Techniques et Financiers Approfondis',
    exploreGuidesDesc: 'Consultez nos tutoriels étape par étape, démonstrations mathématiques et études de cas concrètes.',
    exploreGuidesBtn: 'Explorer Tous les Guides',
  },
  de: {
    metaTitle: 'Rechner- & Tool-Vergleiche im direkten Gegenüber | Analyse-Zentrum',
    metaDescription: 'Vergleichen Sie Finanz-, Mathematik-, Gesundheits- und Entwickler-Tools direkt miteinander. Verstehen Sie Formelannahmen, Grenzwerte und den optimalen Einsatzzweck.',
    home: 'Startseite',
    compare: 'Vergleiche',
    badge: 'Analytisches Vergleichszentrum',
    heroTitlePart1: 'Direkte Gegenüberstellung von',
    heroTitlePart2: 'Modellen & Werkzeugen',
    heroDesc: 'Die Wahl des richtigen mathematischen oder finanziellen Modells entscheidet über die Präzision Ihrer Ergebnisse. Entdecken Sie unsere fachlich geprüften Direktvergleiche zu Formeln, Eingabevariablen und praktischen Anwendungsfällen.',
    statComparisons: 'Direktvergleiche',
    statVerified: '100 % Geprüfte Formeln',
    statPrivacy: 'Lokale Browser-Ausführung',
    readComparison: 'Vollständigen Vergleich ansehen',
    verdictPreview: 'Analytisches Fazit',
    editorialTitle: 'Wie wir mathematische Modelle bewerten und vergleichen',
    editorialP1: 'Zwei Rechner, die scheinbar dasselbe Problem lösen, basieren oft auf grundlegend verschiedenen mathematischen Annahmen. Ob effektiver Jahreszins vs. Nominalzins, Schneeball- vs. Lawinenmethode bei der Schuldentilgung oder BMI vs. Körperfettanteil – erst der direkte Modellvergleich zeigt, wie stark Zinseszinsintervalle oder anthropometrische Parameter das Endergebnis beeinflussen.',
    editorialP2: 'Jeder Direktvergleich auf NexusCalculator wird von unseren Fachredaktionen für Quantitative Finanzmathematik, Gesundheit & Biometrie sowie Systemtechnik geprüft. Jede Analyse dokumentiert exakte Formelunterschiede und gibt klare Empfehlungen für die kombinierte Nutzung.',
    exploreCollectionsTitle: 'Kuratierte Workflow-Sammlungen & Toolkits',
    exploreCollectionsDesc: 'Nutzen Sie aufeinander abgestimmte Rechner-Pipelines für Immobilienkäufer, Softwareentwickler, Studierende und Finanzplaner.',
    exploreCollectionsBtn: 'Sammlungen entdecken',
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
    alternates: getCanonicalAndAlternates('/compare', locale),
    openGraph: {
      type: 'website',
      title: ui.metaTitle,
      description: ui.metaDescription,
      siteName: 'Nexus Calculator',
    },
  };
}

export default async function CompareIndexPage({
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
  const canonicalUrl = getCanonicalUrl('/compare', locale);

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: ui.metaTitle,
    description: ui.metaDescription,
    url: canonicalUrl,
    inLanguage: locale,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: comparisons.length,
      itemListElement: comparisons.map((c, idx) => {
        const loc = c.translations?.[locale] || c;
        return {
          '@type': 'ListItem',
          position: idx + 1,
          name: loc.title,
          url: getCanonicalUrl('/compare/[slug]', locale, c.slug),
        };
      }),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ui.home, item: `${baseUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: ui.compare, item: canonicalUrl },
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
          <span className="text-slate-800 dark:text-slate-200 font-semibold">{ui.compare}</span>
        </nav>

        {/* Hero Section */}
        <header className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 mb-12 shadow-sm">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40 text-xs font-bold uppercase tracking-wider mb-5">
            <Scale size={14} />
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
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">{comparisons.length}</span>
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{ui.statComparisons}</span>
            </div>
            <div className="flex items-center gap-2 bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 rounded-xl px-4 py-2.5 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
              <ShieldCheck size={15} className="text-emerald-600 dark:text-emerald-400" />
              {ui.statVerified}
            </div>
          </div>
        </header>

        {/* Comparisons Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {comparisons.map((comp) => {
            const loc = comp.translations?.[locale] || comp;
            return (
              <Link
                key={comp.slug}
                href={{ pathname: '/compare/[slug]', params: { slug: comp.slug } }}
                className="group flex flex-col justify-between bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/40">
                      <Scale size={11} />
                      VS
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                      {comp.toolA} ↔ {comp.toolB}
                    </span>
                  </div>

                  <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2 leading-snug">
                    {loc.title}
                  </h2>

                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {loc.seoDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/70">
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 italic mb-3">
                    <strong className="not-italic text-slate-700 dark:text-slate-300">{ui.verdictPreview}:</strong>{' '}
                    {loc.verdict}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#518231] dark:text-[#6fa844] group-hover:gap-2.5 transition-all">
                    {ui.readComparison} <ArrowRight size={14} />
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
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm mb-2">
                <Layers size={16} />
                <h3>{ui.exploreCollectionsTitle}</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                {ui.exploreCollectionsDesc}
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#518231] dark:text-[#6fa844] hover:underline"
              >
                {ui.exploreCollectionsBtn} <ArrowRight size={13} />
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
