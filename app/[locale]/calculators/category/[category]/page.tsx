import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { calculators } from '@/lib/data/calculators';
import { categories, getCategoryById } from '@/lib/data/categories';
import { getRelatedCalculators } from '@/lib/data/calculatorRelationships';
import { allGuides } from '@/lib/data/guides';
import { getLocalizedGuide } from '@/lib/utils/guideLocalization';
import { Link, resolveIntlHref } from '@/i18n/routing';
import { ChevronRight, Calculator, ArrowRight, Star, BookOpen, Clock, GraduationCap, Wrench } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// ═══════════════════════════════════════════════════════
// CATEGORY LANDING PAGE (SEO Pillar Page)
// ═══════════════════════════════════════════════════════
// These pages serve as topical authority anchors for Google.
// Each category page:
//   - Has 800+ words of unique pillar content
//   - Links to every calculator in the category
//   - Has FAQPage + BreadcrumbList JSON-LD schemas
//   - Is internally linked from homepage, nav, and footer
//   - Flattens crawl depth (homepage → category → calculator)
// ═══════════════════════════════════════════════════════

export function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}): Promise<Metadata> {
  const { category, locale } = await params;
  const cat = getCategoryById(category);
  if (!cat) return { title: 'Category Not Found' };

  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');

  // Non-English category pages have the same English pillar content as /en/calculators/category/*.
  // Google overrides our declared canonical with the EN version ("Duplicate, Google chose different
  // canonical"). Use noindex on non-EN locales to stop the duplicate signal while keeping EN indexed.
  const isEnglish = locale === 'en';

  return {
    title: cat.seoTitle,
    description: cat.seoDescription,
    robots: {
      index: true,
      follow: true,
    },
    alternates: getCanonicalAndAlternates('/calculators/category/[category]', locale, category),
  };
}


export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);

  const cat = getCategoryById(resolvedParams.category);
  if (!cat) notFound();

  const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net')
    .replace(/\/$/, '')
    .replace('://nexuscalculator.net', '://www.nexuscalculator.net');
  const { getCanonicalUrl } = await import('@/lib/utils/seoUtils');
  const canonicalCategoryUrl = getCanonicalUrl('/calculators/category/[category]', resolvedParams.locale, cat.id);

  // Get all calculators for this category
  const categoryCalcs = calculators.filter((c) =>
    cat.dbCategory.includes(c.category)
  );

  // Sort alphabetically for consistency
  categoryCalcs.sort((a, b) => a.title.localeCompare(b.title));

  // Group into subcategories based on tags/keywords for visual organization
  const popularCalcs = categoryCalcs.slice(0, 6);

  // Get all guides associated with calculators in this category
  const categoryCalcSlugs = new Set(categoryCalcs.map((c) => c.slug));
  const directGuides = allGuides.filter(
    (g) => g.relatedCalculator && categoryCalcSlugs.has(g.relatedCalculator)
  );

  const catGuideCategoryMap: Record<string, string[]> = {
    financial: ['Finance'],
    health: ['Health'],
    math: ['Math & Science'],
    physics: ['Math & Science'],
    chemistry: ['Math & Science'],
    weather: ['Productivity & Utilities'],
    other: ['Productivity & Utilities'],
  };

  const categoryRelatedToolsMap: Record<string, { title: string; slug: string; desc: string }[]> = {
    financial: [
      { title: 'UK Mortgage Calculator', slug: 'mortgage-calculator-uk', desc: 'Calculate UK property mortgage payments with stamp duty' },
      { title: 'CSV Viewer & Editor', slug: 'csv-viewer', desc: 'Inspect financial records, spreadsheets, and CSV exports in table format' },
      { title: 'Data Privacy Anonymizer', slug: 'database-anonymizer', desc: 'Anonymize sensitive customer and transaction data locally' },
    ],
    math: [
      { title: 'Random Number Generator', slug: 'random-number-generator', desc: 'Generate cryptographically random numbers in custom ranges' },
      { title: 'HTML Table Generator', slug: 'html-table-generator', desc: 'Build and format mathematical tables and matrices instantly' },
      { title: 'Hash & Checksum Generator', slug: 'hash-generator', desc: 'Calculate SHA-256, MD5, and cryptographic checksums' },
    ],
    physics: [
      { title: 'Unit & Hex Converter', slug: 'hex-to-rgb', desc: 'Convert and calculate precision numerical color codes' },
      { title: 'JSON Formatter & Parser', slug: 'json-formatter', desc: 'Inspect complex scientific data arrays and structures' },
      { title: 'Diff Checker', slug: 'diff-checker', desc: 'Compare raw experimental data outputs line-by-line' },
    ],
    other: [
      { title: 'QR Code Studio', slug: 'qr-code-studio', desc: 'Generate custom vector QR codes for documents and websites' },
      { title: 'Word & Character Counter', slug: 'word-counter', desc: 'Count words, sentences, and reading time in real-time' },
      { title: 'Markdown Previewer', slug: 'markdown-previewer', desc: 'Live preview Markdown syntax and documentation formulas' },
    ]
  };
  const relatedTools = categoryRelatedToolsMap[cat.id] || [];

  const matchingGuideCats = catGuideCategoryMap[cat.id] || [];
  const seenGuideSlugs = new Set(directGuides.map((g) => g.slug));
  const additionalGuides =
    directGuides.length === 0
      ? allGuides.filter((g) => matchingGuideCats.includes(g.category) && !seenGuideSlugs.has(g.slug))
      : [];

  const categoryGuides = [...directGuides, ...additionalGuides];

  const localizedGuides = categoryGuides.map((guide) => {
    const localized = getLocalizedGuide(guide, resolvedParams.locale);
    const activeSlug =
      guide.slugs?.[resolvedParams.locale as keyof typeof guide.slugs] || guide.slug;
    return {
      ...localized,
      activeSlug,
    };
  });

  const featuredCategoryGuides = localizedGuides.slice(0, 6);
  const remainingCategoryGuides = localizedGuides.length > 6 ? localizedGuides : [];

  const categoryGuideLabels: Record<
    string,
    {
      featuredTitle: string;
      featuredSubtitle: string;
      allGuidesTitle: string;
      readGuide: string;
      minRead: string;
      guidesCount: string;
    }
  > = {
    en: {
      featuredTitle: 'Educational Guides & Mathematical Tutorials',
      featuredSubtitle: `Deep dive into formulas, step-by-step methodologies, and practical examples for ${cat.title.toLowerCase()}.`,
      allGuidesTitle: `All ${cat.title} Guides & Tutorials`,
      readGuide: 'Read Guide',
      minRead: 'min read',
      guidesCount: 'Guides',
    },
    es: {
      featuredTitle: 'Guías Educativas y Tutoriales Matemáticos',
      featuredSubtitle: `Profundice en fórmulas, metodologías paso a paso y ejemplos prácticos para ${cat.title.toLowerCase()}.`,
      allGuidesTitle: `Todas las Guías y Tutoriales de ${cat.title}`,
      readGuide: 'Leer Guía',
      minRead: 'min de lectura',
      guidesCount: 'Guías',
    },
    fr: {
      featuredTitle: 'Guides Pédagogiques et Tutoriels Mathématiques',
      featuredSubtitle: `Explorez les formules, les méthodologies étape par étape et les exemples pratiques pour ${cat.title.toLowerCase()}.`,
      allGuidesTitle: `Tous les Guides et Tutoriels de ${cat.title}`,
      readGuide: 'Lire le Guide',
      minRead: 'min de lecture',
      guidesCount: 'Guides',
    },
    de: {
      featuredTitle: 'Ausführliche Ratgeber & Mathematische Anleitungen',
      featuredSubtitle: `Vertiefen Sie Formeln, Schritt-für-Schritt-Methoden und praktische Beispiele für ${cat.title.toLowerCase()}.`,
      allGuidesTitle: `Alle Ratgeber & Anleitungen für ${cat.title}`,
      readGuide: 'Ratgeber Lesen',
      minRead: 'Min. Lesezeit',
      guidesCount: 'Ratgeber',
    },
  };
  const tGuides = categoryGuideLabels[resolvedParams.locale] || categoryGuideLabels.en;

  // JSON-LD: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}/${resolvedParams.locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Calculators',
        item: getCanonicalUrl('/calculators', resolvedParams.locale),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: cat.title,
        item: canonicalCategoryUrl,
      },
    ],
  };

  // JSON-LD: CollectionPage
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: cat.seoTitle,
    description: cat.seoDescription,
    url: canonicalCategoryUrl,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: categoryCalcs.length,
      itemListElement: categoryCalcs.map((calc, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: calc.title,
        url: getCanonicalUrl('/calculators/[slug]', resolvedParams.locale, calc.slug),
      })),
    },
    ...(localizedGuides.length > 0 && {
      hasPart: localizedGuides.slice(0, 15).map((guide) => ({
        '@type': 'Article',
        name: guide.title,
        description: guide.description,
        url: getCanonicalUrl('/guides/[slug]', resolvedParams.locale, guide.slug),
      })),
    }),
  };

  // JSON-LD: FAQPage — unlocks FAQ rich results for high-volume category queries
  // Built from real category data so answers are always accurate and specific
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What are ${cat.title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: cat.seoDescription,
        },
      },
      {
        '@type': 'Question',
        name: `How many ${cat.title} are available on Nexus Calculator?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Nexus Calculator offers ${categoryCalcs.length} free ${cat.title.toLowerCase()} covering ${cat.description} All tools run entirely in your browser with no signup required.`,
        },
      },
      {
        '@type': 'Question',
        name: `Are the ${cat.title} free to use?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, all ${categoryCalcs.length} ${cat.title.toLowerCase()} on Nexus Calculator are completely free. There are no paywalls, no limits on usage, and no account required. Every calculation runs locally in your browser, so your data never leaves your device.`,
        },
      },
      {
        '@type': 'Question',
        name: `How do I use the ${cat.title} on Nexus Calculator?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Simply select any calculator from the list on this page, enter your values into the input fields, and get instant results. All ${cat.title.toLowerCase()} update in real time as you type, with no need to press a submit button.`,
        },
      },
      ...(localizedGuides.length > 0
        ? [
            {
              '@type': 'Question',
              name: `Does Nexus Calculator provide tutorials and mathematical formulas for ${cat.title}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `Yes, Nexus Calculator provides ${localizedGuides.length} comprehensive educational guides and mathematical breakdowns for ${cat.title.toLowerCase()}. Each guide explains the underlying equations, variable definitions, and step-by-step calculation methods with practical real-world examples.`,
              },
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-slate-500 mb-8 flex-wrap gap-1">
          <Link href="/" className="hover:text-[#518231] transition-colors">
            Home
          </Link>
          <ChevronRight size={14} />
          <Link href="/calculators" className="hover:text-[#518231] transition-colors">
            Calculators
          </Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 dark:text-white font-medium">
            {cat.title}
          </span>
        </nav>

        {/* Hero Section */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
            {cat.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl">
            {cat.description} — {categoryCalcs.length} free tools, all running
            locally in your browser.
          </p>
        </header>

        {/* Popular / Featured Calculators */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Star className="text-amber-500" size={20} />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Most Popular
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCalcs.map((calc) => (
              <Link
                key={calc.slug}
                href={resolveIntlHref(`/calculators/${calc.slug}`)}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:border-[#518231]/30 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center group-hover:bg-[#518231]/10 transition-colors">
                    <Calculator
                      className="text-slate-500 group-hover:text-[#518231] transition-colors"
                      size={20}
                    />
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-slate-300 group-hover:text-[#518231] transition-colors mt-2"
                  />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#518231] transition-colors">
                  {calc.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {calc.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Educational Guides & Tutorials (Topical Depth Cluster) */}
        {localizedGuides.length > 0 && (
          <section className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="text-[#518231]" size={22} />
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {tGuides.featuredTitle}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl">
                  {tGuides.featuredSubtitle}
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] self-start sm:self-auto shrink-0">
                {localizedGuides.length} {tGuides.guidesCount}
              </span>
            </div>

            {/* Featured Guides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {featuredCategoryGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={{ pathname: '/guides/[slug]', params: { slug: guide.activeSlug } }}
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:border-[#518231]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {guide.readingTime} {tGuides.minRead}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-slate-300 group-hover:text-[#518231] transition-colors"
                      />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#518231] transition-colors leading-snug line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {guide.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-semibold text-[#518231] dark:text-[#6fa844] group-hover:gap-2 transition-all">
                    <span>{tGuides.readGuide}</span>
                    <ChevronRight size={14} className="rtl:rotate-180" />
                  </div>
                </Link>
              ))}
            </div>

            {/* Complete Guide Directory (when > 6 guides) */}
            {remainingCategoryGuides.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#518231]" />
                  <span>{tGuides.allGuidesTitle} ({localizedGuides.length})</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2.5">
                  {localizedGuides.map((guide) => (
                    <Link
                      key={guide.slug}
                      href={{ pathname: '/guides/[slug]', params: { slug: guide.activeSlug } }}
                      className="group flex items-center justify-between text-xs sm:text-sm py-1 text-slate-600 dark:text-slate-400 hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors"
                    >
                      <span className="truncate pr-2 font-medium group-hover:underline">
                        {guide.title}
                      </span>
                      <span className="shrink-0 text-[11px] text-slate-400 dark:text-slate-500">
                        {guide.readingTime}m
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Full Calculator Directory */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            All {cat.title} ({categoryCalcs.length})
          </h2>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-slate-800">
              {/* Split into columns */}
              {[0, 1, 2].map((col) => {
                const colSize = Math.ceil(categoryCalcs.length / 3);
                const colCalcs = categoryCalcs.slice(
                  col * colSize,
                  (col + 1) * colSize
                );
                return (
                  <ul key={col} className="divide-y divide-slate-100 dark:divide-slate-800">
                    {colCalcs.map((calc) => (
                      <li key={calc.slug}>
                        <Link
                          href={resolveIntlHref(`/calculators/${calc.slug}`)}
                          className="block px-5 py-3.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-[#518231] transition-colors font-medium"
                        >
                          {calc.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                );
              })}
            </div>
          </div>
        </section>

        {/* SEO Pillar Content */}
        <section className="mb-16">
          <div className="prose prose-slate dark:prose-invert max-w-none prose-headings:tracking-tight prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-a:text-[#518231] prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown>{cat.pillarContent}</ReactMarkdown>
          </div>
        </section>

        {/* Related Utilities & Developer Tools Cross-Linking */}
        {relatedTools.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Wrench className="text-[#518231]" size={20} />
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Related Developer Tools &amp; Utilities
                </h2>
              </div>
              <Link
                href="/tools"
                className="text-sm font-semibold text-[#518231] hover:text-[#436a28] dark:hover:text-[#6fa844] flex items-center gap-1 transition-colors"
              >
                All Developer Tools →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={resolveIntlHref(`/tools/${tool.slug}`)}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-[#518231]/40 hover:shadow-sm transition-all group flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors flex items-center justify-between gap-2">
                      <span>{tool.title}</span>
                      <ArrowRight size={16} className="text-slate-400 group-hover:text-[#518231] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </h3>
                    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#518231]">
                    <span>100% Free • In-Browser Tool</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Browse Other Categories */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Explore Other Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories
              .filter((c) => c.id !== cat.id)
              .map((otherCat) => {
                const count = calculators.filter((c) =>
                  otherCat.dbCategory.includes(c.category)
                ).length;
                return (
                  <Link
                    key={otherCat.id}
                    href={resolveIntlHref(`/calculators/category/${otherCat.id}`)}
                    className="flex items-center justify-between bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-5 py-4 hover:border-[#518231]/30 hover:shadow-sm transition-all group"
                  >
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors">
                        {otherCat.title}
                      </h3>
                      <p className="text-sm text-slate-500">{count} tools</p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-slate-300 group-hover:text-[#518231] transition-colors"
                    />
                  </Link>
                );
              })}
          </div>
        </section>
      </main>
    </>
  );
}
