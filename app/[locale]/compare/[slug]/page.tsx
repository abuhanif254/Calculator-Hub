import React from 'react';
import { notFound } from 'next/navigation';
import { getComparisonBySlug, comparisons } from '../../../../lib/data/comparisons';
import { allTools } from '../../../../lib/registry';
import { Link, resolveIntlHref } from '../../../../i18n/routing';
import { getLocalizedCalcMeta, getLocalizedToolMeta } from '@/lib/utils/toolLocalization';
import { ChevronRight, ArrowRight, Check, Scale } from 'lucide-react';
import { Metadata } from 'next';

export const revalidate = false;
export const dynamicParams = false;

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};

  const t = comparison.translations?.[locale] || comparison;
  const cleanSeoTitle = t.seoTitle.replace(/\s*\|\s*Nexus.*$/i, '').trim();
  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');
  const alternates = getCanonicalAndAlternates('/compare/[slug]', locale, slug);

  return {
    title: cleanSeoTitle,
    description: t.seoDescription,
    openGraph: {
      title: cleanSeoTitle,
      description: t.seoDescription,
      url: alternates.canonical,
      siteName: 'NexusCalculator',
      locale,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: cleanSeoTitle,
      description: t.seoDescription,
    },
    alternates,
  };
}

const uiLabels: Record<string, {
  home: string;
  compare: string;
  guideBadge: string;
  verdictTitle: string;
  features: string;
  openCalc: string;
  moreComparisons: string;
  methodologyTitle: (titleA: string, titleB: string) => string;
  methodologyIntro: (titleA: string, titleB: string, descA: string, descB: string) => string;
  whenToUseA: (titleA: string) => string;
  whenToUseB: (titleB: string) => string;
  useAExplanation: (titleA: string, descA: string, firstDiffA: string) => string;
  useBExplanation: (titleB: string, descB: string, firstDiffB: string) => string;
  faqTitle: string;
  faqs: (titleA: string, titleB: string, verdict: string) => { q: string; a: string }[];
}> = {
  en: {
    home: "Home",
    compare: "Compare",
    guideBadge: "Comparison Guide",
    verdictTitle: "The Verdict",
    features: "Features",
    openCalc: "Open Calculator",
    moreComparisons: "More Side-by-Side Comparisons",
    methodologyTitle: (a, b) => `Analytical Methodology: ${a} vs. ${b}`,
    methodologyIntro: (a, b, descA, descB) =>
      `Choosing between the ${a} and the ${b} requires understanding the underlying mathematical assumptions and target use cases of each model. ${a} (${descA}) focuses on specific baseline variables, whereas ${b} (${descB}) evaluates complementary dimensions of the same problem domain. Using both models side by side provides a complete sensitivity profile before making financial, health, or technical decisions.`,
    whenToUseA: (a) => `When to Prioritize ${a}`,
    whenToUseB: (b) => `When to Prioritize ${b}`,
    useAExplanation: (a, descA, firstDiffA) =>
      `Select the ${a} when your primary objective aligns with: ${descA} Key analytical characteristic: ${firstDiffA}. It is ideal for rapid baseline benchmarking and standardized comparisons.`,
    useBExplanation: (b, descB, firstDiffB) =>
      `Select the ${b} when your analysis requires: ${descB} Key analytical characteristic: ${firstDiffB}. Use this model when deeper granularity or alternative boundary conditions are required.`,
    faqTitle: "Frequently Asked Questions",
    faqs: (a, b, verdict) => [
      {
        q: `What is the main difference between ${a} and ${b}?`,
        a: verdict
      },
      {
        q: `Should I use ${a} or ${b} for my calculation?`,
        a: `For the most accurate assessment, run your baseline figures through ${a} first and then cross-check the outcome with ${b}. Comparing both outputs reveals how sensitive your result is to different modeling assumptions.`
      },
      {
        q: `Are both ${a} and ${b} free to use on NexusCalculator?`,
        a: `Yes. Both calculators run 100% locally in your browser with instant real-time results, full formula transparency, and zero registration or data tracking.`
      }
    ]
  },
  es: {
    home: "Inicio",
    compare: "Comparar",
    guideBadge: "Guía de Comparación",
    verdictTitle: "El Veredicto",
    features: "Características",
    openCalc: "Abrir Calculadora",
    moreComparisons: "Más Comparativas Lado a Lado",
    methodologyTitle: (a, b) => `Metodología Analítica: ${a} vs. ${b}`,
    methodologyIntro: (a, b, descA, descB) =>
      `Elegir entre ${a} y ${b} requiere comprender los supuestos matemáticos y los casos de uso específicos de cada modelo. ${a} (${descA}) se centra en variables base directas, mientras que ${b} (${descB}) evalúa dimensiones complementarias del mismo ámbito. Utilizar ambos modelos en paralelo proporciona un perfil de sensibilidad completo antes de tomar decisiones financieras, médicas o técnicas.`,
    whenToUseA: (a) => `Cuándo Priorizar ${a}`,
    whenToUseB: (b) => `Cuándo Priorizar ${b}`,
    useAExplanation: (a, descA, firstDiffA) =>
      `Seleccione ${a} cuando su objetivo principal coincida con: ${descA} Característica analítica clave: ${firstDiffA}. Es ideal para obtener referencias rápidas y comparaciones estandarizadas.`,
    useBExplanation: (b, descB, firstDiffB) =>
      `Seleccione ${b} cuando su análisis requiera: ${descB} Característica analítica clave: ${firstDiffB}. Utilice este modelo cuando necesite mayor granularidad o condiciones de contorno específicas.`,
    faqTitle: "Preguntas Frecuentes",
    faqs: (a, b, verdict) => [
      {
        q: `¿Cuál es la diferencia principal entre ${a} y ${b}?`,
        a: verdict
      },
      {
        q: `¿Debo usar ${a} o ${b} para mi análisis?`,
        a: `Para obtener la evaluación más precisa, introduzca primero sus datos base en ${a} y luego contraste el resultado con ${b}. Comparar ambos resultados le mostrará cómo varían sus cifras según el modelo empleado.`
      },
      {
        q: `¿Son gratuitas tanto ${a} como ${b}?`,
        a: `Sí. Ambas herramientas se ejecutan 100% localmente en su navegador con resultados en tiempo real, fórmulas verificadas y total privacidad.`
      }
    ]
  },
  fr: {
    home: "Accueil",
    compare: "Comparer",
    guideBadge: "Guide Comparatif",
    verdictTitle: "Le Verdict",
    features: "Fonctionnalités",
    openCalc: "Ouvrir le Calculateur",
    moreComparisons: "Plus de Comparatifs Côte à Côte",
    methodologyTitle: (a, b) => `Méthodologie Analytique : ${a} vs ${b}`,
    methodologyIntro: (a, b, descA, descB) =>
      `Choisir entre ${a} et ${b} nécessite de comprendre les hypothèses mathématiques et les cas d'usage propres à chaque modèle. ${a} (${descA}) cible des paramètres de référence directs, tandis que ${b} (${descB}) évalue des dimensions complémentaires du même domaine. L'utilisation conjointe des deux outils offre une analyse de sensibilité complète avant toute décision financière, médicale ou technique.`,
    whenToUseA: (a) => `Quand Privilégier ${a}`,
    whenToUseB: (b) => `Quand Privilégier ${b}`,
    useAExplanation: (a, descA, firstDiffA) =>
      `Utilisez ${a} lorsque votre objectif principal correspond à : ${descA} Caractéristique analytique clé : ${firstDiffA}. Idéal pour des estimations rapides et des comparaisons standardisées.`,
    useBExplanation: (b, descB, firstDiffB) =>
      `Utilisez ${b} lorsque votre étude exige : ${descB} Caractéristique analytique clé : ${firstDiffB}. Privilégiez ce modèle lorsqu'une granularité supérieure est nécessaire.`,
    faqTitle: "Questions Fréquemment Posées",
    faqs: (a, b, verdict) => [
      {
        q: `Quelle est la différence principale entre ${a} et ${b} ?`,
        a: verdict
      },
      {
        q: `Dois-je utiliser ${a} ou ${b} pour mon calcul ?`,
        a: `Pour une évaluation optimale, calculez d'abord vos valeurs de référence avec ${a}, puis vérifiez le résultat avec ${b}. La comparaison des deux modèles met en évidence la sensibilité de vos résultats.`
      },
      {
        q: `Les outils ${a} et ${b} sont-ils gratuits et confidentiels ?`,
        a: `Oui. Les deux calculateurs fonctionnent à 100 % localement dans votre navigateur avec des résultats instantanés et aucune collecte de données.`
      }
    ]
  },
  de: {
    home: "Startseite",
    compare: "Vergleich",
    guideBadge: "Vergleichsratgeber",
    verdictTitle: "Das Fazit",
    features: "Eigenschaften",
    openCalc: "Rechner öffnen",
    moreComparisons: "Weitere Direktvergleiche",
    methodologyTitle: (a, b) => `Analytische Methodik: ${a} vs. ${b}`,
    methodologyIntro: (a, b, descA, descB) =>
      `Die Wahl zwischen ${a} und ${b} erfordert ein klares Verständnis der zugrunde liegenden mathematischen Modelle und Anwendungsfälle. Während ${a} (${descA}) spezifische Basisparameter fokussiert, bewertet ${b} (${descB}) ergänzende Dimensionen desselben Fachgebiets. Die kombinierte Nutzung beider Rechner liefert ein vollständiges Sensitivitätsprofil für fundierte Finanz-, Gesundheits- oder Technikentscheidungen.`,
    whenToUseA: (a) => `Wann ${a} die beste Wahl ist`,
    whenToUseB: (b) => `Wann ${b} die beste Wahl ist`,
    useAExplanation: (a, descA, firstDiffA) =>
      `Nutzen Sie ${a}, wenn Ihr Hauptziel folgendem Bereich entspricht: ${descA} Zentrales Merkmal: ${firstDiffA}. Ideal für schnelle Referenzwerte und standardisierte Vergleiche.`,
    useBExplanation: (b, descB, firstDiffB) =>
      `Nutzen Sie ${b}, wenn Ihre Analyse folgende Präzision erfordert: ${descB} Zentrales Merkmal: ${firstDiffB}. Empfohlen, wenn zusätzliche Detailtiefe oder spezifische Rahmenbedingungen benötigt werden.`,
    faqTitle: "Häufig gestellte Fragen (FAQ)",
    faqs: (a, b, verdict) => [
      {
        q: `Was ist der Hauptunterschied zwischen ${a} und ${b}?`,
        a: verdict
      },
      {
        q: `Sollte ich für meine Berechnung ${a} oder ${b} verwenden?`,
        a: `Für eine besonders belastbare Auswertung berechnen Sie zunächst Ihre Ausgangswerte mit ${a} und prüfen das Ergebnis anschließend mit ${b} gegen. Der direkte Vergleich zeigt sofort, wie stark sich unterschiedliche Modellannahmen auswirken.`
      },
      {
        q: `Sind ${a} und ${b} kostenlos und datenschutzkonform nutzbar?`,
        a: `Ja. Beide Rechner arbeiten zu 100 % lokal in Ihrem Browser in Echtzeit, mit transparenter Formelherleitung und ohne Speicherung personenbezogener Daten.`
      }
    ]
  }
};

export default async function ComparePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug, locale } = await params;
  const comparison = getComparisonBySlug(slug);

  if (!comparison) {
    notFound();
  }

  const toolARaw = allTools.find(t => t.slug === comparison.toolA);
  const toolBRaw = allTools.find(t => t.slug === comparison.toolB);

  if (!toolARaw || !toolBRaw) {
    return <div className="p-8 text-center text-red-500">Error: One or both tools in this comparison were not found.</div>;
  }

  const metaA = toolARaw.type === 'developer-tool'
    ? getLocalizedToolMeta(toolARaw.slug, locale, toolARaw.title, toolARaw.description)
    : getLocalizedCalcMeta(toolARaw.slug, locale, toolARaw.title, toolARaw.description);
  const metaB = toolBRaw.type === 'developer-tool'
    ? getLocalizedToolMeta(toolBRaw.slug, locale, toolBRaw.title, toolBRaw.description)
    : getLocalizedCalcMeta(toolBRaw.slug, locale, toolBRaw.title, toolBRaw.description);

  const toolA = { ...toolARaw, localizedTitle: metaA.title, localizedDescription: metaA.description };
  const toolB = { ...toolBRaw, localizedTitle: metaB.title, localizedDescription: metaB.description };

  const t = comparison.translations?.[locale] || comparison;
  const ui = uiLabels[locale] || uiLabels.en;

  const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net')
    .replace(/\/$/, '')
    .replace('://nexuscalculator.net', '://www.nexuscalculator.net');
  const { getCanonicalUrl } = await import('@/lib/utils/seoUtils');
  const canonicalUrl = getCanonicalUrl('/compare/[slug]', locale, comparison.slug);
  const compareHubUrl = getCanonicalUrl('/compare', locale);

  const otherComparisons = comparisons.filter((c) => c.slug !== comparison.slug);
  const faqItems = ui.faqs(toolA.localizedTitle, toolB.localizedTitle, t.verdict);
  const firstDiffA = t.differences[0]?.a || toolA.localizedDescription;
  const firstDiffB = t.differences[0]?.b || toolB.localizedDescription;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t.title,
    "description": t.seoDescription,
    "url": canonicalUrl,
    "inLanguage": locale,
    "dateModified": "2026-04-17",
    "author": {
      "@type": "Organization",
      "name": "NexusCalculator Editorial Board",
      "url": getCanonicalUrl('/about-us', locale)
    },
    "reviewedBy": {
      "@type": "Person",
      "name": "Md. Shamim Hossain",
      "jobTitle": "Lead Full-Stack & Quantitative Systems Engineer",
      "url": getCanonicalUrl('/about-us', locale)
    },
    "publisher": {
      "@type": "Organization",
      "name": "NexusCalculator",
      "url": baseUrl
    }
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
      { "@type": "ListItem", "position": 2, "name": ui.compare, "item": compareHubUrl },
      { "@type": "ListItem", "position": 3, "name": t.title, "item": canonicalUrl }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-[#518231] transition-colors">{ui.home}</Link>
          <ChevronRight size={14} />
          <Link href="/compare" className="hover:text-[#518231] transition-colors">{ui.compare}</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 dark:text-slate-200 font-medium">{t.title}</span>
        </nav>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center py-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-bold mb-6">
            <Scale size={16} /> {ui.guideBadge}
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            {t.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {t.seoDescription}
          </p>
        </section>

        {/* Verdict Box */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <Check className="text-emerald-500" /> {ui.verdictTitle}
          </h2>
          <p className="text-lg text-emerald-800 dark:text-emerald-200 leading-relaxed font-medium">
            {t.verdict}
          </p>
        </section>

        {/* Comparison Table */}
        <section>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800">
              <div className="p-6 hidden md:block bg-slate-50 dark:bg-slate-900/50">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{ui.features}</span>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{toolA.localizedTitle}</h3>
                <Link href={resolveIntlHref(toolA.href)} className="inline-flex items-center gap-1 text-sm font-bold text-[#518231] hover:text-[#436a28] transition-colors">
                  {ui.openCalc} <ArrowRight size={14} />
                </Link>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{toolB.localizedTitle}</h3>
                <Link href={resolveIntlHref(toolB.href)} className="inline-flex items-center gap-1 text-sm font-bold text-[#518231] hover:text-[#436a28] transition-colors">
                  {ui.openCalc} <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {t.differences.map((diff, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="p-4 md:p-6 flex items-center">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{diff.label}</span>
                  </div>
                  <div className="p-4 md:p-6 text-slate-600 dark:text-slate-400">
                    <span className="md:hidden text-xs font-bold text-slate-400 uppercase mb-1 block">{toolA.localizedTitle}</span>
                    {diff.a}
                  </div>
                  <div className="p-4 md:p-6 text-slate-600 dark:text-slate-400">
                    <span className="md:hidden text-xs font-bold text-slate-400 uppercase mb-1 block">{toolB.localizedTitle}</span>
                    {diff.b}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Analytical Decision Methodology */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 space-y-8 shadow-sm">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
              {ui.methodologyTitle(toolA.localizedTitle, toolB.localizedTitle)}
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg">
              {ui.methodologyIntro(toolA.localizedTitle, toolB.localizedTitle, toolA.localizedDescription, toolB.localizedDescription)}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {ui.whenToUseA(toolA.localizedTitle)}
                </h3>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {ui.useAExplanation(toolA.localizedTitle, toolA.localizedDescription, firstDiffA)}
                </p>
              </div>
              <Link href={resolveIntlHref(toolA.href)} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#518231] hover:text-[#436a28] transition-colors">
                {ui.openCalc}: {toolA.localizedTitle} <ArrowRight size={14} />
              </Link>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {ui.whenToUseB(toolB.localizedTitle)}
                </h3>
                <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  {ui.useBExplanation(toolB.localizedTitle, toolB.localizedDescription, firstDiffB)}
                </p>
              </div>
              <Link href={resolveIntlHref(toolB.href)} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#518231] hover:text-[#436a28] transition-colors">
                {ui.openCalc}: {toolB.localizedTitle} <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-10 shadow-sm">
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

        {/* Cross-Linking to Other Comparisons */}
        {otherComparisons.length > 0 && (
          <section className="pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {ui.moreComparisons}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherComparisons.map((other) => {
                const ot = other.translations?.[locale] || other;
                return (
                  <Link
                    key={other.slug}
                    href={{ pathname: '/compare/[slug]', params: { slug: other.slug } }}
                    className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-md hover:border-[#518231]/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors mb-2">
                        {ot.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                        {ot.seoDescription}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end text-xs font-semibold text-[#518231]">
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

