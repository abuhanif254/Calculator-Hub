import React from 'react';
import { notFound } from 'next/navigation';
import { getCollectionBySlug, collections } from '../../../../lib/data/collections';
import { allTools } from '../../../../lib/registry';
import { Link, resolveIntlHref } from '../../../../i18n/routing';
import { getLocalizedCalcMeta, getLocalizedToolMeta } from '@/lib/utils/toolLocalization';
import { ChevronRight, Layers, ArrowRight, Code2, Calculator } from 'lucide-react';
import { Metadata } from 'next';

export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};

  const t = collection.translations?.[locale] || collection;
  const cleanSeoTitle = t.seoTitle.replace(/\s*\|\s*Nexus.*$/i, '').trim();
  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');

  return {
    title: cleanSeoTitle,
    description: t.seoDescription,
    openGraph: {
      title: cleanSeoTitle,
      description: t.seoDescription,
      type: 'website'
    },
    alternates: getCanonicalAndAlternates('/collections/[slug]', locale, slug),
  };
}

const uiLabels: Record<string, {
  home: string;
  collections: string;
  included: string;
  toolsCount: string;
  step: string;
  openTool: string;
  moreCollections: string;
  workflowHeading: string;
  workflowIntro: (title: string, count: number) => string;
  stepExecutionTitle: string;
  stepExecutionDesc: (stepNum: number, toolName: string, desc: string) => string;
  bestPracticesTitle: string;
  bestPracticesBullets: string[];
  faqTitle: string;
  faqs: (title: string, toolNames: string) => { q: string; a: string }[];
}> = {
  en: {
    home: "Home",
    collections: "Collections",
    included: "Included in this bundle",
    toolsCount: "Tools",
    step: "Step",
    openTool: "Open Tool",
    moreCollections: "More Curated Toolkits & Bundles",
    workflowHeading: "Sequential Execution Blueprint & Methodology",
    workflowIntro: (title, count) =>
      `The ${title} is engineered as an integrated ${count}-stage analytical workflow rather than a random list of utilities. When solving complex financial, engineering, health, or software problems, running isolated calculations often introduces rounding drift and inconsistent assumptions. By executing these ${count} tools in sequence, outputs from earlier stages establish verified baseline parameters for downstream decisions.`,
    stepExecutionTitle: "Step-by-Step Workflow Integration",
    stepExecutionDesc: (stepNum, toolName, desc) =>
      `Stage ${stepNum} (${toolName}): ${desc} Use the verified output metrics from this stage as calibrated inputs for your next analytical checkpoint.`,
    bestPracticesTitle: "Analytical Best Practices for Multi-Tool Workflows",
    bestPracticesBullets: [
      "Maintain consistent unit systems (metric vs. imperial) and currency/compounding conventions across every calculator in this bundle.",
      "Record baseline, conservative, and stress-tested scenarios at each stage before moving to the next utility in the sequence.",
      "All calculations and data transformations run 100% locally in your browser—no financial figures, health metrics, or code snippets leave your device."
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: (title, toolNames) => [
      {
        q: `How should I use the tools in the ${title} together?`,
        a: `Start with Step 1 to establish your core baseline metrics, then feed those validated numbers into the subsequent tools (${toolNames}). Each tool is ordered to follow a logical decision-making pipeline.`
      },
      {
        q: `Are the calculators and utilities in the ${title} free and private?`,
        a: `Yes. Every calculator and utility in this curated toolkit executes entirely inside your browser via client-side JavaScript and WebAssembly with zero server-side data retention.`
      },
      {
        q: `Can I bookmark or share individual results from this toolkit?`,
        a: `Yes. Each calculator and tool in the ${title} has its own canonical URL and export/copy functionality so you can document each stage of your analysis independently.`
      }
    ]
  },
  es: {
    home: "Inicio",
    collections: "Colecciones",
    included: "Incluido en este paquete",
    toolsCount: "Herramientas",
    step: "Paso",
    openTool: "Abrir Herramienta",
    moreCollections: "Más Colecciones y Paquetes de Herramientas",
    workflowHeading: "Guía de Ejecución Secuencial y Metodología de Trabajo",
    workflowIntro: (title, count) =>
      `El paquete ${title} está diseñado como un flujo de trabajo analítico integrado de ${count} etapas y no como una simple lista aislada de utilidades. Al resolver problemas financieros, de salud, académicos o de desarrollo de software, realizar cálculos aislados suele generar discrepancias de redondeo y supuestos inconsistentes. Al ejecutar estas ${count} herramientas en secuencia, los resultados de las primeras etapas establecen parámetros base verificados para las decisiones posteriores.`,
    stepExecutionTitle: "Integración del Flujo de Trabajo Paso a Paso",
    stepExecutionDesc: (stepNum, toolName, desc) =>
      `Etapa ${stepNum} (${toolName}): ${desc} Utilice las métricas verificadas obtenidas en esta etapa como datos de entrada calibrados para el siguiente punto de control analítico.`,
    bestPracticesTitle: "Mejores Prácticas Analíticas para Flujos de Múltiples Herramientas",
    bestPracticesBullets: [
      "Mantenga sistemas de unidades coherentes (métrico vs. imperial) y las mismas convenciones de capitalización o moneda en cada calculadora de esta colección.",
      "Registre escenarios base, conservadores y de estrés en cada etapa antes de pasar a la siguiente herramienta de la secuencia.",
      "Todos los cálculos y transformaciones de datos se ejecutan 100% localmente en su navegador: ningún dato financiero, médico o fragmento de código sale de su dispositivo."
    ],
    faqTitle: "Preguntas Frecuentes sobre esta Colección",
    faqs: (title, toolNames) => [
      {
        q: `¿Cómo debo utilizar conjuntamente las herramientas de ${title}?`,
        a: `Comience con el Paso 1 para establecer sus métricas base principales y luego introduzca esos valores validados en las herramientas siguientes (${toolNames}). Cada utilidad está ordenada siguiendo una secuencia lógica de toma de decisiones.`
      },
      {
        q: `¿Son gratuitas y privadas las calculadoras de ${title}?`,
        a: `Sí. Todas las calculadoras y utilidades de este paquete curado se ejecutan íntegramente en su navegador mediante JavaScript del lado del cliente sin almacenamiento de datos en servidores externos.`
      },
      {
        q: `¿Puedo guardar o exportar los resultados individuales de cada etapa?`,
        a: `Sí. Cada herramienta incluida en ${title} cuenta con su propia dirección URL canónica y funciones de copia o exportación para documentar cada fase de su análisis.`
      }
    ]
  },
  fr: {
    home: "Accueil",
    collections: "Collections",
    included: "Inclus dans ce pack",
    toolsCount: "Outils",
    step: "Étape",
    openTool: "Ouvrir l'Outil",
    moreCollections: "Plus de Packs et Collections d'Outils",
    workflowHeading: "Méthodologie et Plan d'Exécution Séquentielle",
    workflowIntro: (title, count) =>
      `Le pack ${title} est conçu comme un flux de travail analytique intégré en ${count} étapes plutôt que comme une simple liste d'outils isolés. Lors de la résolution de problèmes financiers, de santé ou d'ingénierie logicielle, des calculs séparés entraînent souvent des écarts d'arrondi et des hypothèses contradictoires. En exécutant ces ${count} outils dans l'ordre, les résultats des premières étapes servent de paramètres de référence vérifiés pour les décisions suivantes.`,
    stepExecutionTitle: "Intégration du Flux de Travail Étape par Étape",
    stepExecutionDesc: (stepNum, toolName, desc) =>
      `Étape ${stepNum} (${toolName}) : ${desc} Utilisez les indicateurs vérifiés de cette étape comme valeurs d'entrée calibrées pour votre prochain point de contrôle analytique.`,
    bestPracticesTitle: "Bonnes Pratiques Analytiques pour les Flux Multi-Outils",
    bestPracticesBullets: [
      "Conservez des systèmes d'unités cohérents (métrique vs impérial) et les mêmes conventions de capitalisation ou de devise dans chaque calculateur de ce pack.",
      "Comparez un scénario de référence, un scénario prudent et un scénario de crise à chaque étape avant de passer à l'outil suivant.",
      "Tous les calculs et traitements s'exécutent à 100 % localement dans votre navigateur : aucune donnée financière, médicale ou ligne de code ne quitte votre appareil."
    ],
    faqTitle: "Questions Fréquemment Posées",
    faqs: (title, toolNames) => [
      {
        q: `Comment utiliser efficacement les outils du pack ${title} ensemble ?`,
        a: `Commencez par l'Étape 1 pour établir vos indicateurs de base, puis reportez ces valeurs validées dans les outils suivants (${toolNames}). L'ordre proposé suit une logique professionnelle d'aide à la décision.`
      },
      {
        q: `Les calculateurs et outils du pack ${title} sont-ils gratuits et confidentiels ?`,
        a: `Oui. Chaque calculateur et utilitaire de cette collection fonctionne entièrement dans votre navigateur côté client, sans aucun envoi ni stockage sur un serveur distant.`
      },
      {
        q: `Puis-je enregistrer ou partager les résultats de chaque étape ?`,
        a: `Oui. Chaque outil du pack ${title} dispose de sa propre URL canonique et de fonctions d'exportation pour documenter chaque étape de votre dossier.`
      }
    ]
  },
  de: {
    home: "Startseite",
    collections: "Sammlungen",
    included: "In diesem Paket enthalten",
    toolsCount: "Tools",
    step: "Schritt",
    openTool: "Tool öffnen",
    moreCollections: "Weitere Tool-Sammlungen & Pakete",
    workflowHeading: "Sequenzielle Workflow-Methodik & Ausführungsleitfaden",
    workflowIntro: (title, count) =>
      `Das Paket „${title}“ ist als integrierter ${count}-stufiger Analyse-Workflow konzipiert und nicht als lose Aufzählung einzelner Werkzeuge. Bei komplexen Finanz-, Gesundheits-, Studien- oder Softwareprojekten führen isolierte Einzelberechnungen häufig zu Rundungsabweichungen und widersprüchlichen Grundannahmen. Durch die sequenzielle Ausführung dieser ${count} Tools liefern die ersten Schritte validierte Referenzparameter für alle nachfolgenden Entscheidungen.`,
    stepExecutionTitle: "Schritt-für-Schritt Workflow-Integration",
    stepExecutionDesc: (stepNum, toolName, desc) =>
      `Stufe ${stepNum} (${toolName}): ${desc} Nutzen Sie die verifizierten Ergebniswerte dieser Stufe als kalibrierte Eingabeparameter für Ihren nächsten Analyseschritt.`,
    bestPracticesTitle: "Analytische Best Practices für Multi-Tool-Workflows",
    bestPracticesBullets: [
      "Verwenden Sie über alle Rechner dieses Pakets hinweg einheitliche Maßsysteme (metrisch vs. imperial) sowie identische Zins- und Währungsannahmen.",
      "Dokumentieren Sie in jeder Stufe ein Basisszenario, ein konservatives Szenario und ein Stressszenario, bevor Sie zum nächsten Tool wechseln.",
      "Sämtliche Berechnungen und Datenkonvertierungen erfolgen zu 100 % lokal in Ihrem Browser – keine Finanzdaten, Gesundheitswerte oder Quelltexte verlassen Ihr Gerät."
    ],
    faqTitle: "Häufig gestellte Fragen (FAQ)",
    faqs: (title, toolNames) => [
      {
        q: `Wie kombiniere ich die Tools im Paket „${title}“ optimal?`,
        a: `Beginnen Sie mit Schritt 1, um Ihre zentralen Basiswerte zu ermitteln, und übernehmen Sie diese geprüften Kennzahlen anschließend in die nachfolgenden Werkzeuge (${toolNames}). Die Reihenfolge bildet eine logische Entscheidungskette ab.`
      },
      {
        q: `Sind alle Rechner und Werkzeuge in „${title}“ kostenlos und datenschutzkonform?`,
        a: `Ja. Jedes Werkzeug dieser kuratierten Sammlung wird vollständig lokal im Browser per Client-Side-JavaScript ausgeführt, ohne dass Daten an externe Server übertragen werden.`
      },
      {
        q: `Kann ich Einzelergebnisse aus diesem Toolkit speichern oder teilen?`,
        a: `Ja. Jedes enthaltene Tool besitzt eine eigene kanonische URL sowie Kopier- und Exportfunktionen, sodass Sie jeden einzelnen Analyseschritt sauber dokumentieren können.`
      }
    ]
  }
};

export default async function CollectionPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug, locale } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const t = collection.translations?.[locale] || collection;
  const ui = uiLabels[locale] || uiLabels.en;

  const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net')
    .replace(/\/$/, '')
    .replace('://nexuscalculator.net', '://www.nexuscalculator.net');
  const { getCanonicalUrl } = await import('@/lib/utils/seoUtils');
  const canonicalUrl = getCanonicalUrl('/collections/[slug]', locale, collection.slug);
  const collectionsHubUrl = getCanonicalUrl('/collections', locale);

  // Resolve tools from registry with localized titles and descriptions
  const tools = collection.toolSlugs
    .map((toolSlug) => {
      const found = allTools.find((item) => item.slug === toolSlug);
      if (!found) return null;
      const isDevTool = found.type === 'developer-tool';
      const meta = isDevTool
        ? getLocalizedToolMeta(found.slug, locale, found.title, found.description)
        : getLocalizedCalcMeta(found.slug, locale, found.title, found.description);
      const canonicalToolUrl = getCanonicalUrl(
        isDevTool ? '/tools/[slug]' : '/calculators/[slug]',
        locale,
        found.slug
      );
      return {
        ...found,
        localizedTitle: meta.title,
        localizedDescription: meta.description,
        canonicalToolUrl,
      };
    })
    .filter(Boolean) as Array<(typeof allTools)[number] & { localizedTitle: string; localizedDescription: string; canonicalToolUrl: string }>;

  const otherCollections = collections.filter((c) => c.slug !== collection.slug);
  const toolNamesList = tools.map((item) => item.localizedTitle).join(', ');
  const faqItems = ui.faqs(t.title, toolNamesList);

  // Schema Generation
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t.title,
    "description": t.description,
    "url": canonicalUrl,
    "inLanguage": locale,
    "dateModified": "2026-04-17",
    "author": {
      "@type": "Organization",
      "name": "NexusCalculator Editorial Board",
      "url": `${baseUrl}/${locale}/about-us`
    },
    "hasPart": tools.map((tool, index) => ({
      "@type": "WebPage",
      "position": index + 1,
      "url": tool.canonicalToolUrl,
      "name": tool.localizedTitle
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": ui.home, "item": `${baseUrl}/${locale}` },
      { "@type": "ListItem", "position": 2, "name": ui.collections, "item": collectionsHubUrl },
      { "@type": "ListItem", "position": 3, "name": t.title, "item": canonicalUrl }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-[#518231] transition-colors">{ui.home}</Link>
          <ChevronRight size={14} />
          <Link href="/collections" className="hover:text-[#518231] transition-colors">{ui.collections}</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 dark:text-slate-200 font-medium">{t.title}</span>
        </nav>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden mt-6">
          <div className="absolute inset-0 bg-gradient-to-br from-[#518231]/10 to-transparent -z-10" />
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-200 dark:border-emerald-800/50">
            <Layers size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t.description}
          </p>
        </section>

        {/* Tools Grid */}
        <section>
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{ui.included}</h2>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-bold">
              {tools.length} {ui.toolsCount}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Link 
                key={tool.slug} 
                href={resolveIntlHref(tool.href)}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:border-[#518231]/30 transition-all flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold px-3 py-1 rounded-bl-xl">
                  {ui.step} {index + 1}
                </div>
                
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#518231]/10 transition-colors shrink-0">
                  {tool.type === 'developer-tool' ? (
                    <Code2 className="text-purple-500 group-hover:text-[#518231] transition-colors" size={24} />
                  ) : (
                    <Calculator className="text-blue-500 group-hover:text-[#518231] transition-colors" size={24} />
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#518231] transition-colors pr-10">
                  {tool.localizedTitle}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1 line-clamp-3">
                  {tool.localizedDescription}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#518231] mt-auto">
                  {ui.openTool} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Sequential Workflow Blueprint & Methodology */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 space-y-8 shadow-sm">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {ui.workflowHeading}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg">
              {ui.workflowIntro(t.title, tools.length)}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {ui.stepExecutionTitle}
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {tools.map((tool, index) => (
                <div
                  key={`workflow-${tool.slug}`}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60"
                >
                  <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    {ui.stepExecutionDesc(index + 1, tool.localizedTitle, tool.localizedDescription)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {ui.bestPracticesTitle}
            </h3>
            <ul className="space-y-3 text-slate-600 dark:text-slate-400 text-sm md:text-base list-disc pl-5">
              {ui.bestPracticesBullets.map((bullet, idx) => (
                <li key={idx} className="leading-relaxed">
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            {ui.faqTitle}
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800"
              >
                <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {item.q}
                </h3>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-Linking to Other Collections */}
        {otherCollections.length > 0 && (
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {ui.moreCollections}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherCollections.map((other) => {
                const ot = other.translations?.[locale] || other;
                return (
                  <Link
                    key={other.slug}
                    href={{ pathname: '/collections/[slug]', params: { slug: other.slug } }}
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-md hover:border-[#518231]/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors mb-2">
                        {ot.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {ot.description}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-[#518231]">
                      <span>{other.toolSlugs.length} {ui.toolsCount}</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

