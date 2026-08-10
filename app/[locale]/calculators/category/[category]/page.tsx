import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { calculators } from '@/lib/data/calculators';
import { categories, getCategoryById } from '@/lib/data/categories';
import { getRelatedCalculators } from '@/lib/data/calculatorRelationships';
import { Link, resolveIntlHref } from '@/i18n/routing';
import { ChevronRight, Calculator, ArrowRight, Star } from 'lucide-react';
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
  return {
    title: cat.seoTitle,
    description: cat.seoDescription,
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

  // Get all calculators for this category
  const categoryCalcs = calculators.filter((c) =>
    cat.dbCategory.includes(c.category)
  );

  // Sort alphabetically for consistency
  categoryCalcs.sort((a, b) => a.title.localeCompare(b.title));

  // Group into subcategories based on tags/keywords for visual organization
  const popularCalcs = categoryCalcs.slice(0, 6);

  // JSON-LD: BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `https://nexuscalculator.net/${resolvedParams.locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: cat.title,
        item: `https://nexuscalculator.net/${resolvedParams.locale}/calculators/category/${cat.id}`,
      },
    ],
  };

  // JSON-LD: CollectionPage
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: cat.seoTitle,
    description: cat.seoDescription,
    url: `https://nexuscalculator.net/${resolvedParams.locale}/calculators/category/${cat.id}`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: categoryCalcs.length,
      itemListElement: categoryCalcs.map((calc, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: calc.title,
        url: `https://nexuscalculator.net/${resolvedParams.locale}/calculators/${calc.slug}`,
      })),
    },
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
