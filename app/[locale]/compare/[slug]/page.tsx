import React from 'react';
import { notFound } from 'next/navigation';
import { getComparisonBySlug } from '../../../../lib/data/comparisons';
import { allTools } from '../../../../lib/registry';
import { Link } from '../../../../i18n/routing';
import { ChevronRight, ArrowRight, Check, X, Scale } from 'lucide-react';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return {};

  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');

  return {
    title: comparison.seoTitle,
    description: comparison.seoDescription,
    openGraph: {
      title: comparison.seoTitle,
      description: comparison.seoDescription,
      type: 'article'
    },
    alternates: getCanonicalAndAlternates('/compare/[slug]', locale, slug),
  };
}

export default async function ComparePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const comparison = getComparisonBySlug(slug);

  if (!comparison) {
    notFound();
  }

  const toolA = allTools.find(t => t.slug === comparison.toolA);
  const toolB = allTools.find(t => t.slug === comparison.toolB);

  if (!toolA || !toolB) {
    return <div className="p-8 text-center text-red-500">Error: One or both tools in this comparison were not found.</div>;
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nexuscalculator.net" },
      { "@type": "ListItem", "position": 2, "name": "Compare", "item": "https://nexuscalculator.net/compare" },
      { "@type": "ListItem", "position": 3, "name": comparison.title, "item": `https://nexuscalculator.net/compare/${comparison.slug}` }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-[#518231] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 dark:text-slate-200 font-medium">Compare</span>
          <ChevronRight size={14} />
          <span className="text-slate-900 dark:text-slate-200 font-medium">{comparison.title}</span>
        </nav>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section */}
        <section className="text-center py-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-bold mb-6">
            <Scale size={16} /> Comparison Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
            {comparison.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            {comparison.seoDescription}
          </p>
        </section>

        {/* Verdict Box */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-900/30 rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <Check className="text-emerald-500" /> The Verdict
          </h2>
          <p className="text-lg text-emerald-800 dark:text-emerald-200 leading-relaxed font-medium">
            {comparison.verdict}
          </p>
        </section>

        {/* Comparison Table */}
        <section>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 border-b border-slate-200 dark:border-slate-800">
              <div className="p-6 hidden md:block bg-slate-50 dark:bg-slate-900/50">
                <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Features</span>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{toolA.title}</h3>
                <Link href={toolA.href as any} className="inline-flex items-center gap-1 text-sm font-bold text-[#518231] hover:text-[#436a28] transition-colors">
                  Open Calculator <ArrowRight size={14} />
                </Link>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{toolB.title}</h3>
                <Link href={toolB.href as any} className="inline-flex items-center gap-1 text-sm font-bold text-[#518231] hover:text-[#436a28] transition-colors">
                  Open Calculator <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {comparison.differences.map((diff, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 dark:divide-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="p-4 md:p-6 flex items-center">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{diff.label}</span>
                  </div>
                  <div className="p-4 md:p-6 text-slate-600 dark:text-slate-400">
                    <span className="md:hidden text-xs font-bold text-slate-400 uppercase mb-1 block">{toolA.title}</span>
                    {diff.a}
                  </div>
                  <div className="p-4 md:p-6 text-slate-600 dark:text-slate-400">
                    <span className="md:hidden text-xs font-bold text-slate-400 uppercase mb-1 block">{toolB.title}</span>
                    {diff.b}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
