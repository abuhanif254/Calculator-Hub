import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { allToolsConfig } from "@/lib/data/tools";
import { getCanonicalAndAlternates, getCanonicalUrl } from "@/lib/utils/seoUtils";
import { Link } from "@/i18n/routing";
import { Wrench, ArrowRight, Sparkles, Terminal, Code2, ShieldCheck, Image as ImageIcon, FileText } from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const alternates = getCanonicalAndAlternates("/tools", locale);

  const titles: Record<string, string> = {
    en: "Developer Tools Hub | Free Online Code, PDF & Web Utilities",
    es: "Centro de Herramientas para Desarrolladores | Utilidades Web y PDF",
    fr: "Centre d'Outils pour Développeurs | Utilitaires Code, PDF et Web",
    de: "Entwickler-Tools Hub | Kostenlose Online-Code-, PDF- & Web-Tools",
  };

  const descriptions: Record<string, string> = {
    en: "Free online developer tools: JSON formatter, PDF editor, image optimizer, SQL beautifier, hash generator, QR code studio, and code formatters. 100% private, client-side processing.",
    es: "Herramientas gratuitas para desarrolladores: formateador JSON, editor PDF, optimizador de imágenes, generador de hashes y más. 100% privado en tu navegador.",
    fr: "Outils en ligne gratuits pour développeurs : formateur JSON, éditeur PDF, convertisseur d'images et utilitaires de code. 100% privé et sécurisé.",
    de: "Kostenlose Online-Entwicklertools: JSON-Formatierer, PDF-Editor, Bildoptimierer, SQL-Formatierer und Hash-Generator. 100 % privat im Browser.",
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    keywords: "developer tools, json formatter, pdf tools, code beautifier, image converter, online web tools, free developer utilities",
    openGraph: {
      title,
      description,
      type: "website",
    },
    alternates,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function AllToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const baseUrl = (process.env.APP_URL || "https://www.nexuscalculator.net").replace(/\/$/, "");
  const canonicalUrl = getCanonicalUrl("/tools", locale);

  // Group all tools by category
  const toolsList = Object.values(allToolsConfig);
  const categoriesMap: Record<string, typeof toolsList> = {};

  toolsList.forEach((tool) => {
    const cat = tool.category || "General Utilities";
    if (!categoriesMap[cat]) {
      categoriesMap[cat] = [];
    }
    categoriesMap[cat].push(tool);
  });

  const categoryNames = Object.keys(categoriesMap).sort();

  // Schemas
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Nexus Developer Tools Directory",
    "description": "Directory of free client-side developer utilities, PDF tools, and formatters.",
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "Nexus Calculator Hub",
      "url": baseUrl,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Developer Tools",
        "item": canonicalUrl,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Developer Tools List",
    "itemListElement": toolsList.slice(0, 30).map((tool, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": tool.title,
      "url": `${baseUrl}/${locale}/tools/${tool.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50/50 dark:bg-slate-950 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      {/* Hero Header */}
      <section className="relative overflow-hidden pt-12 pb-14 md:pt-16 md:pb-20 border-b border-slate-200/60 dark:border-slate-800 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30 dark:from-slate-900 dark:via-slate-900/60 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500 dark:text-slate-400">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#518231] hover:underline">Home</Link>
              </li>
              <li>/</li>
              <li className="text-slate-800 dark:text-slate-200 font-semibold" aria-current="page">
                Developer Tools
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-500/20">
              <Terminal className="w-3.5 h-3.5" />
              100+ Free Online Web Utilities
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Developer Tools &amp; Web Utilities
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Fast, privacy-focused developer utilities that execute entirely within your browser. Convert, format, analyze, and optimize without sending sensitive data to external servers.
            </p>
          </div>
        </div>
      </section>

      {/* Category Groups */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="space-y-16">
          {categoryNames.map((catName) => {
            const catTools = categoriesMap[catName];
            return (
              <div
                key={catName}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8"
              >
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <span>{catName}</span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                      {catTools.length} tools
                    </span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-6">
                  {catTools.map((tool) => (
                    <Link
                      key={tool.slug}
                      href={{ pathname: "/tools/[slug]", params: { slug: tool.slug } }}
                      className="group flex flex-col justify-between p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:bg-white dark:hover:bg-slate-800 transition-all hover:shadow-sm"
                    >
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between gap-2">
                          <span>{tool.title}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </h3>
                        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {tool.shortDescription}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
