import React from "react";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "@/lib/data/calculators";
import { sitemapCategories, generalLinks } from "@/lib/data/sitemapData";
import { getRelatedCalculators } from "@/lib/data/calculatorRelationships";
import { getCalculatorComponent } from "@/lib/componentRegistry";
import ReactMarkdown from "react-markdown";
import { ExportResultsPanel } from "@/app/components/ExportResultsPanel";
import { CalculatorMath } from "@/app/components/CalculatorMath";
import { ToolVisitTracker } from "@/app/components/ToolVisitTracker";
import { FavoriteButton } from "@/app/components/FavoriteButton";
import { AdSenseContainer } from "@/app/components/AdSenseContainer";
import { Link, routing } from "@/i18n/routing";
import { Search, ChevronRight, CalculatorIcon } from "lucide-react";

import { setRequestLocale } from 'next-intl/server';

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// SSG / ISR configuration
// We revalidate occasionally to catch data updates if we were using a headless CMS.
export const revalidate = 86400; // once a day

// Helper function to read markdown content
function getMarkdownContent(slug: string, locale: string) {
  try {
    const filePath = path.join(process.cwd(), "content", locale, `${slug}.md`);

    // Fallback to english if language file is missing
    if (!fs.existsSync(filePath)) {
      const fallbackPath = path.join(process.cwd(), "content", "en", `${slug}.md`);
      if (fs.existsSync(fallbackPath)) {
        const fileContent = fs.readFileSync(fallbackPath, "utf-8");
        return matter(fileContent);
      }
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf-8");
    return matter(fileContent);
  } catch (e) {
    console.error("Error reading markdown for", slug, locale, e);
    return null;
  }
}

// Dynamic routing parameter generation
export async function generateStaticParams() {
  const params: { slug: string; locale: string }[] = [];

  routing.locales.forEach((locale) => {
    calculators.forEach((calc) => {
      let slugToUse = calc.slug;
      if (calc.slugs && calc.slugs[locale as keyof typeof calc.slugs]) {
        slugToUse = calc.slugs[locale as keyof typeof calc.slugs];
      }
      params.push({ slug: slugToUse, locale });
    });
  });

  return params;
}

// SEO Metadata configuration
export async function generateMetadata({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = await params;
  const { slug, locale } = resolvedParams;
  const calc = getCalculatorBySlug(slug);

  if (!calc) {
    return {
      title: "Calculator Not Found",
    };
  }

  const mdData = getMarkdownContent(slug, locale);

  // Use markdown matter if available, fallback to hardcoded
  const metaTitle = mdData?.data?.metaTitle || calc.meta.title;
  const metaDescription = mdData?.data?.metaDescription || calc.meta.description;
  const metaKeywords = mdData?.data?.metaKeywords || calc.meta.keywords;

  const languages: Record<string, string> = {
    'x-default': `/en/calculators/${slug}`,
  };

  routing.locales.forEach((l) => {
    languages[l] = `/${l}/calculators/${slug}`;
  });

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
    },
    alternates: {
      canonical: `/${locale}/calculators/${slug}`,
      languages,
    },
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const calc = getCalculatorBySlug(resolvedParams.slug);

  if (!calc) {
    notFound();
  }

  const mdData = getMarkdownContent(resolvedParams.slug, resolvedParams.locale);

  // Replace defaults with markdown data
  const pageTitle = mdData?.data?.title || calc.title;
  const pageDesc = mdData?.data?.description || calc.description;
  const seoContent = mdData?.content || calc.seoContent;

  const faqs = mdData?.data?.faqs || [
    {
      question: `What is a ${pageTitle}?`,
      answer: `A ${pageTitle} is a specialized mathematical tool that allows you to calculate and estimate relevant values based on your inputs. It's completely free to use online.`
    },
    {
      question: `How do I use this ${pageTitle}?`,
      answer: `Simply enter your required information into the fields above and the results will automatically calculate and update on your screen.`
    },
    {
      question: `Is my data safe when using this ${pageTitle}?`,
      answer: `Yes, protecting your privacy is our priority. All calculations performed by this ${pageTitle} happen locally in your browser. We never store or transmit your personal input data to any servers.`
    }
  ];

  // Find related calculators for the sidebar and bottom section
  const relatedTools = getRelatedCalculators(calc.slug, 8);
  const activeCategory = sitemapCategories.find(c => c.title.toLowerCase().includes(calc.category.toLowerCase())) || sitemapCategories[0];

  const baseUrl = "https://nexuscalculator.net"; // Change to production domain when live
  const canonicalUrl = `${baseUrl}/${resolvedParams.locale}/calculators/${resolvedParams.slug}`;

  // SoftwareApplication JSON-LD Schema
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": pageTitle,
    "description": pageDesc,
    "applicationCategory": calc.category === "Financial" ? "FinanceApplication" :
      calc.category === "Health & Fitness" ? "HealthApplication" :
        "UtilityApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "url": canonicalUrl,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  // FAQPage JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // BreadcrumbList JSON-LD Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Calculators",
        "item": `${baseUrl}/${resolvedParams.locale}/sitemap`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": pageTitle,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Breadcrumbs for SEO */}
      <nav aria-label="Breadcrumb" className="mb-6 font-sans text-sm text-slate-500">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="hover:text-blue-600 hover:underline">Home</Link>
          </li>
          <li><span className="text-slate-400">/</span></li>
          <li>
            <Link href="/sitemap" className="hover:text-blue-600 hover:underline">Calculators</Link>
          </li>
          <li><span className="text-slate-400">/</span></li>
          <li className="text-slate-700 font-medium" aria-current="page">{pageTitle}</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Main Content Area (Left/Top) */}
        <div className="flex-1 w-full max-w-4xl min-w-0">
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="inline-block px-3 py-1 bg-blue-50 border border-blue-100 text-blue-800 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
                {calc.category}
              </span>
              <FavoriteButton
                slug={calc.slug}
                title={calc.title}
                type="calculator"
                href={`/calculators/${calc.slug}`}
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              {pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              {pageDesc}
            </p>
          </header>

          <ToolVisitTracker
            slug={calc.slug}
            title={calc.title}
            type="calculator"
            href={`/calculators/${calc.slug}`}
          />

          <div id="calculator-export-target" className="print-target">
            {(() => {
              const CalculatorView = getCalculatorComponent(calc.slug);
              return <CalculatorView calcDef={calc} locale={resolvedParams.locale} />;
            })()}
          </div>

          <ExportResultsPanel targetId="calculator-export-target" fileName={`${calc.slug}-results`} />
          <CalculatorMath slug={calc.slug} category={calc.category} />

          {/* Ad Placement below calculator (Main Content) */}
          <div className="my-10 w-full">
            <AdSenseContainer slot="calculator_content_bottom" style={{ minHeight: '90px' }} format="auto" />
          </div>

          {seoContent && (
            <article className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 prose prose-slate max-w-none lg:prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 prose-img:rounded-xl">
              <ReactMarkdown>{seoContent}</ReactMarkdown>
            </article>
          )}

          {/* FAQ Section */}
          <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq: any, index: number) => (
                <div key={index} className="border-b border-slate-100 pb-5 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Area (Right/Bottom) */}
        <aside className="w-full lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col gap-8">

          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Find a Calculator</h3>
            <form action={`/${resolvedParams.locale}/search`} method="GET" className="relative group">
              <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                name="q"
                placeholder="Search calculators..."
                className="w-full ps-10 pe-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </form>
          </div>

          {/* Ad Space - Top Sidebar */}
          <div className="w-full">
            <AdSenseContainer slot="calculator_sidebar_top" style={{ minHeight: '250px' }} />
          </div>

          {/* Page Links / Quick Navigation */}
          <div className="bg-slate-900 rounded-2xl shadow-sm border border-slate-800 p-6 text-white">
            <h3 className="text-lg font-bold mb-4 pb-4 border-b border-slate-800">Quick Links</h3>
            <ul className="space-y-3">
              {generalLinks.map((link) => {
                let href: any = "/";
                if (link === "Privacy Policy") href = "/privacy-policy";
                if (link === "Terms of Use") href = "/terms-of-use";
                if (link === "About Us") href = "/about-us";
                return (
                  <li key={link}>
                    <Link
                      href={href}
                      className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Ad Space - Bottom Sidebar (Sticky option) */}
          <div className="sticky top-24 w-full">
            <AdSenseContainer slot="calculator_sidebar_sticky" style={{ minHeight: '600px' }} />
          </div>

        </aside>
      </div>

      {/* Related Calculators - Moved to bottom */}
      <div className="mt-16 border-t border-slate-200 pt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Related Calculators</h2>
          <Link href="/sitemap" className="text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center">
            View all {activeCategory.title.toLowerCase()} <ChevronRight className="w-4 h-4 ml-1 rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedTools.slice(0, 4).map((toolSlug) => {
            const targetCalc = getCalculatorBySlug(toolSlug);
            if (!targetCalc) return null;
            return (
              <Link
                key={toolSlug}
                href={`/calculators/${toolSlug}` as any}
                className="group flex flex-col bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CalculatorIcon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{targetCalc.title}</h3>
                <p className="text-sm text-slate-500 line-clamp-2">
                  {targetCalc.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
