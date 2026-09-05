import React from "react";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link, routing, resolveIntlHref } from "@/i18n/routing";
import { pdfToolsMenu } from "@/lib/data/sitemapData";
import { resolveHref } from "@/lib/utils/linkResolver";
import { getCanonicalAndAlternates, getCanonicalUrl } from "@/lib/utils/seoUtils";
import {
  FileText,
  File,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sparkles,
  HelpCircle,
} from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const alternates = getCanonicalAndAlternates("/pdf", locale);

  const titles: Record<string, string> = {
    en: "Free Online PDF Tools | Merge, Split, Compress & Edit PDFs",
    es: "Herramientas PDF Gratuitas Online | Unir, Dividir, Comprimir y Editar",
    fr: "Outils PDF Gratuits en Ligne | Fusionner, Diviser, Compresser et Éditer",
    de: "Kostenlose Online-PDF-Tools | Zusammenfügen, Teilen, Komprimieren & Bearbeiten",
  };

  const descriptions: Record<string, string> = {
    en: "Master suite of free online PDF tools. Merge, split, compress, edit, convert, and protect your PDF documents directly in your browser. 100% private, no signup required.",
    es: "Herramientas PDF online gratuitas. Une, divide, comprime, edita, convierte y protege documentos PDF directamente en tu navegador. 100% privado y sin registro.",
    fr: "Suite complète d'outils PDF en ligne gratuits. Fusionnez, divisez, compressez, éditez, convertissez et protégez vos documents PDF directement dans votre navigateur. 100% privé.",
    de: "Kostenlose Online-PDF-Tools: PDF zusammenfügen, teilen, komprimieren, bearbeiten, konvertieren und schützen direkt im Browser. 100 % privat und sicher.",
  };

  const title = titles[locale] || titles.en;
  const description = descriptions[locale] || descriptions.en;

  return {
    title,
    description,
    keywords:
      "pdf tools, free online pdf tools, merge pdf, split pdf, compress pdf, convert pdf to word, pdf to excel, protect pdf, edit pdf online, client-side pdf editor",
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

export default async function PdfToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const baseUrl = (process.env.APP_URL || "https://www.nexuscalculator.net").replace(/\/$/, "");
  const canonicalUrl = getCanonicalUrl("/pdf", locale);

  const totalToolsCount = pdfToolsMenu.reduce((acc, cat) => acc + cat.items.length, 0);

  // Structured Data Schemas
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Nexus PDF Tools Directory",
    "description": "Comprehensive suite of free client-side PDF manipulation, conversion, and security tools.",
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
        "name": "PDF Tools",
        "item": canonicalUrl,
      },
    ],
  };

  const allPdfItems = pdfToolsMenu.flatMap((cat) => cat.items);
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "PDF Tools List",
    "itemListElement": allPdfItems.slice(0, 30).map((item, idx) => {
      const rawHref = "slug" in item && item.slug ? `/tools/${item.slug}` : resolveHref(item.name);
      return {
        "@type": "ListItem",
        "position": idx + 1,
        "name": item.name,
        "url": `${baseUrl}/${locale}${rawHref.startsWith('/') ? rawHref : `/${rawHref}`}`,
      };
    }),
  };

  const faqs = [
    {
      q: "Are Nexus PDF tools completely free to use?",
      a: "Yes, 100% of our PDF utilities are completely free to use with no subscription fees, credit card requirements, or daily usage caps.",
    },
    {
      q: "Are my confidential PDF documents safe?",
      a: "Absolutely. Most of our tools operate entirely client-side inside your browser via WebAssembly and HTML5 Canvas. Your documents are never uploaded to remote servers or stored in any database unless you choose our optional server compression for extremely large files.",
    },
    {
      q: "Do I need to install software or register an account?",
      a: "No installation is required. Every tool runs directly in any modern desktop or mobile browser including Chrome, Firefox, Safari, and Edge.",
    },
    {
      q: "Can I convert PDFs to editable Word, Excel, or PowerPoint files?",
      a: "Yes, our suite includes high-fidelity conversion tools to convert PDF files into DOCX, XLSX, PPTX, HTML, TXT, EPUB, and image formats.",
    },
  ];

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
                <Link href="/" className="hover:text-[#518231] hover:underline">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-slate-800 dark:text-slate-200 font-semibold" aria-current="page">
                PDF Tools
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] text-xs font-bold uppercase tracking-wider mb-4 border border-[#518231]/20">
              <File className="w-3.5 h-3.5" />
              {totalToolsCount}+ Free Online PDF Utilities
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              All-in-One Online PDF Tools Hub
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              Merge, split, compress, convert, edit, and secure your PDF documents in seconds. Built for high performance, zero data tracking, and seamless document workflows.
            </p>
          </div>

          {/* Quick Jump Bar */}
          <div className="mt-8 flex flex-wrap gap-2 pt-4 border-t border-slate-200/70 dark:border-slate-800/80">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 self-center mr-2">
              Jump To:
            </span>
            {pdfToolsMenu.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-[#518231] hover:text-[#518231] dark:hover:border-[#518231] transition-all shadow-sm"
              >
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-green-50 dark:bg-green-900/20 text-[#518231]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">100% Private</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Client-side execution</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">Lightning Fast</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Zero queue delays</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">No Watermarks</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Clean original quality</div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">No Sign-Up</div>
              <div className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">Instant access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-16">
        {pdfToolsMenu.map((category) => {
          const CategoryIcon = category.icon || FileText;

          return (
            <div
              key={category.id}
              id={category.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 sm:p-8 scroll-mt-24 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="p-3 bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] rounded-2xl shrink-0">
                    <CategoryIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                      <span>{category.title}</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                        {category.items.length} tools
                      </span>
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
                {category.items.map((item: any) => {
                  const resolvedHref =
                    "href" in item && item.href
                      ? (item.href as any)
                      : resolveIntlHref(
                          "slug" in item && item.slug
                            ? `/tools/${item.slug}`
                            : resolveHref(item.name)
                        );

                  return (
                    <Link
                      key={item.name}
                      href={resolvedHref}
                      className="group flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 hover:border-[#518231]/50 dark:hover:border-[#518231]/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-md transition-all"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-[15px] group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors">
                            {item.name}
                          </h3>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#518231] group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                      {item.isNew && (
                        <div className="mt-3">
                          <span className="text-[10px] font-bold text-white bg-violet-600 rounded-full px-2 py-0.5 leading-none">
                            NEW
                          </span>
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {/* Informational FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-[#518231]" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Frequently Asked Questions About Nexus PDF Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
              >
                <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
                  {faq.q}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
