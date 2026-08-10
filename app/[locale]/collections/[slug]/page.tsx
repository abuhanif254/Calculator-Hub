import React from 'react';
import { notFound } from 'next/navigation';
import { getCollectionBySlug } from '../../../../lib/data/collections';
import { allTools } from '../../../../lib/registry';
import { Link } from '../../../../i18n/routing';
import { ChevronRight, Layers, ArrowRight, Code2, Calculator } from 'lucide-react';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { slug, locale } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return {};

  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');

  return {
    title: collection.seoTitle,
    description: collection.seoDescription,
    openGraph: {
      title: collection.seoTitle,
      description: collection.seoDescription,
      type: 'website'
    },
    alternates: getCanonicalAndAlternates('/collections/[slug]', locale, slug),
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  // Resolve tools from registry
  const tools = collection.toolSlugs.map(toolSlug => {
    return allTools.find(t => t.slug === toolSlug);
  }).filter(Boolean) as typeof allTools;

  // Schema Generation
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": collection.title,
    "description": collection.description,
    "hasPart": tools.map((tool, index) => ({
      "@type": "WebPage",
      "position": index + 1,
      "url": `https://nexuscalculator.net${tool.href}`,
      "name": tool.title
    }))
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://nexuscalculator.net" },
      { "@type": "ListItem", "position": 2, "name": "Collections", "item": "https://nexuscalculator.net/collections" },
      { "@type": "ListItem", "position": 3, "name": collection.title, "item": `https://nexuscalculator.net/collections/${collection.slug}` }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumb */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-[#518231] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 dark:text-slate-200 font-medium">{collection.title}</span>
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
            {collection.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {collection.description}
          </p>
        </section>

        {/* Tools Grid */}
        <section>
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Included in this bundle</h2>
            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-full text-sm font-bold">
              {tools.length} Tools
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Link 
                key={tool.slug} 
                href={tool.href as any}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-lg hover:border-[#518231]/30 transition-all flex flex-col h-full relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold px-3 py-1 rounded-bl-xl">
                  Step {index + 1}
                </div>
                
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#518231]/10 transition-colors shrink-0">
                  {tool.type === 'developer-tool' ? (
                    <Code2 className="text-purple-500 group-hover:text-[#518231] transition-colors" size={24} />
                  ) : (
                    <Calculator className="text-blue-500 group-hover:text-[#518231] transition-colors" size={24} />
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#518231] transition-colors pr-10">
                  {tool.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 flex-1 line-clamp-3">
                  {tool.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#518231] mt-auto">
                  Open Tool <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
