import React from "react";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "@/lib/data/calculators";
import { categories, getCategoryForCalculator } from "@/lib/data/categories";
import { sitemapCategories, generalLinks } from "@/lib/data/sitemapData";
import { getRelatedCalculators } from "@/lib/data/calculatorRelationships";
import { getGuideForCalculator } from "@/lib/data/guides";
import { getLocalizedGuide } from "@/lib/utils/guideLocalization";
import { CalculatorViewWrapper } from "@/app/components/CalculatorViewWrapper";
import ReactMarkdown from "react-markdown";
import { ExportResultsPanel } from "@/app/components/ExportResultsPanel";
import { CalculatorMath } from "@/app/components/CalculatorMath";
import { getFormulaForCalculator, getFormulaFaq } from "@/lib/data/calculatorFormulas";
import { ToolVisitTracker } from "@/app/components/ToolVisitTracker";
import { FavoriteButton } from "@/app/components/FavoriteButton";
import { AdSenseContainer } from "@/app/components/AdSenseContainer";
import { ProbabilitySeoContent } from "@/app/components/probability/ProbabilitySeoContent";
import Mermaid from "@/app/components/Mermaid";
import { Link, routing, resolveIntlHref } from "@/i18n/routing";
import { Search, ChevronRight, CalculatorIcon, BookOpen, Clock, ArrowRight } from "lucide-react";

import { setRequestLocale } from 'next-intl/server';

import fs from "fs";
import path from "path";
import matter from "gray-matter";

// SSG configuration — fully static, no revalidation needed.
// All calculator data lives in TypeScript source files (lib/data/calculators.ts).
// Content only changes when code is deployed, so revalidate=false (build-time only)
// eliminates all ISR background re-renders, saving Vercel free tier limits.
export const revalidate = false;
export const dynamicParams = false;

// Helper function to read markdown content
function getMarkdownContent(slug: string, locale: string, localizedSlug?: string) {
  try {
    const filePath = path.join(process.cwd(), "content", locale, `${slug}.md`);
    let targetPath = filePath;

    if (!fs.existsSync(filePath)) {
      // If the English-named file doesn't exist, try the localized name if provided
      if (localizedSlug) {
        const localizedPath = path.join(process.cwd(), "content", locale, `${localizedSlug}.md`);
        if (fs.existsSync(localizedPath)) {
          targetPath = localizedPath;
        }
      }
    }

    // Fallback to english if language file is missing completely
    if (!fs.existsSync(targetPath)) {
      const fallbackPath = path.join(process.cwd(), "content", "en", `${slug}.md`);
      if (fs.existsSync(fallbackPath)) {
        targetPath = fallbackPath;
      } else {
        return null;
      }
    }

    const fileContent = fs.readFileSync(targetPath, "utf-8");
    const parsed = matter(fileContent);

    // If frontmatter faqs are missing, check if an inline JSON-LD FAQPage script exists in the content
    if (!parsed.data?.faqs || !Array.isArray(parsed.data.faqs) || parsed.data.faqs.length === 0) {
      const faqScriptMatch = parsed.content.match(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/i);
      if (faqScriptMatch) {
        try {
          const jsonLd = JSON.parse(faqScriptMatch[1]);
          if (jsonLd['@type'] === 'FAQPage' && Array.isArray(jsonLd.mainEntity)) {
            parsed.data = parsed.data || {};
            parsed.data.faqs = jsonLd.mainEntity.map((item: any) => ({
              question: item.name || '',
              answer: item.acceptedAnswer?.text || '',
            }));
            // Strip the inline <script> from the markdown content so it does not leak into HTML
            parsed.content = parsed.content.replace(faqScriptMatch[0], '').trim();
          }
        } catch (err) {
          // Keep content intact if JSON parse fails
        }
      }
    } else {
      // If frontmatter faqs already exist, still strip any duplicate inline ld+json script if present
      parsed.content = parsed.content.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '').trim();
    }

    return parsed;
  } catch (e) {
    console.error("Error reading markdown for", slug, locale, e);
    return null;
  }
}

// Dynamic routing parameter generation
export async function generateStaticParams() {
  const params: { slug: string; locale: string }[] = [];
  const seen = new Set<string>();

  routing.locales.forEach((locale) => {
    calculators.forEach((calc) => {
      const isExplicitlyMapped = `/calculators/${calc.slug}` in routing.pathnames;
      const localizedSlug = calc.slugs?.[locale as keyof typeof calc.slugs];

      // Always add the English (canonical) slug so the base route works
      const enKey = `${locale}::${calc.slug}`;
      if (!seen.has(enKey)) {
        seen.add(enKey);
        params.push({ slug: calc.slug, locale });
      }

      // For explicitly-mapped calculators that have a localized slug, next-intl
      // rewrites the URL (e.g. /de/rechner/potenzielle-energie-rechner → [slug]),
      // passing the LOCALIZED slug as the param. With dynamicParams=false this
      // caused a 404. Adding the localized slug fixes it.
      if (isExplicitlyMapped && localizedSlug && localizedSlug !== calc.slug) {
        const localKey = `${locale}::${localizedSlug}`;
        if (!seen.has(localKey)) {
          seen.add(localKey);
          params.push({ slug: localizedSlug, locale });
        }
      }
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

  const localizedSlug = calc.slugs && calc.slugs[locale as keyof typeof calc.slugs];
  const mdData = getMarkdownContent(slug, locale, localizedSlug);

  // Use markdown matter if available, fallback to hardcoded
  const metaTitle = mdData?.data?.metaTitle || calc.meta.title;
  const metaDescription = mdData?.data?.metaDescription || calc.meta.description;
  const metaKeywords = mdData?.data?.metaKeywords || calc.meta.keywords;

  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "website",
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: getCanonicalAndAlternates('/calculators/[slug]', locale, slug),
  };
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string, locale: string }> }) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  const calc = getCalculatorBySlug(resolvedParams.slug);

  if (!calc) {
    notFound();
  }

  const localizedSlug = calc.slugs && calc.slugs[resolvedParams.locale as keyof typeof calc.slugs];
  const mdData = getMarkdownContent(resolvedParams.slug, resolvedParams.locale, localizedSlug);

  // Replace defaults with markdown data
  const pageTitle = mdData?.data?.title || calc.title;
  const pageDesc = mdData?.data?.description || calc.description;
  const seoContent = mdData?.content || calc.seoContent;

  const faqs: { question: string; answer: string }[] = (mdData?.data?.faqs && Array.isArray(mdData.data.faqs) && mdData.data.faqs.length > 0)
    ? [...mdData.data.faqs]
    : [
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

  // Semantic Math FAQ Embedding: inject authoritative mathematical formula FAQ if not already present
  const hasFormulaFaq = faqs.some((f) =>
    /formula|equation|fórmula|formule|formel/i.test(f.question)
  );
  if (!hasFormulaFaq) {
    const formulaFaq = getFormulaFaq(calc.slug, pageTitle, resolvedParams.locale);
    if (formulaFaq) {
      faqs.unshift(formulaFaq);
    }
  }

  // Find related calculators for the sidebar and bottom section
  const relatedTools = getRelatedCalculators(calc.slug, 8);
  const categoryDef = getCategoryForCalculator(calc.category);
  const activeCategory = sitemapCategories.find(c => c.title.toLowerCase().includes(calc.category.toLowerCase())) || sitemapCategories[0];
  const categoryTitle = categoryDef?.title || activeCategory.title;

  const baseUrl = (process.env.APP_URL || "https://www.nexuscalculator.net")
    .replace(/\/$/, '')
    .replace('://nexuscalculator.net', '://www.nexuscalculator.net');
  const { getCanonicalUrl } = await import('@/lib/utils/seoUtils');
  const canonicalUrl = getCanonicalUrl('/calculators/[slug]', resolvedParams.locale, resolvedParams.slug);
  const categoryUrl = categoryDef
    ? getCanonicalUrl('/calculators/category/[category]', resolvedParams.locale, categoryDef.id)
    : `${baseUrl}/${resolvedParams.locale}/sitemap`;

  // Reverse lookup: check if an educational guide exists for this calculator
  const relatedGuide = getGuideForCalculator(calc.slug);
  const localizedGuide = relatedGuide ? getLocalizedGuide(relatedGuide, resolvedParams.locale) : null;
  const guideSlug = relatedGuide ? (relatedGuide.slugs?.[resolvedParams.locale as keyof typeof relatedGuide.slugs] || relatedGuide.slug) : null;
  const relatedGuideUrl = (relatedGuide && guideSlug)
    ? getCanonicalUrl('/guides/[slug]', resolvedParams.locale, relatedGuide.slug)
    : undefined;

  const guideTranslations: Record<string, { badge: string; cta: string; minRead: string; featured: string }> = {
    en: {
      badge: 'In-Depth Guide & Mathematical Breakdown',
      cta: 'Read Complete Guide',
      minRead: 'min read',
      featured: 'Featured Guide',
    },
    es: {
      badge: 'Guía Educativa y Desglose Matemático',
      cta: 'Leer la Guía Completa',
      minRead: 'min de lectura',
      featured: 'Guía Destacada',
    },
    fr: {
      badge: 'Guide Pédagogique et Analyse Mathématique',
      cta: 'Lire le Guide Complet',
      minRead: 'min de lecture',
      featured: 'Guide en Vedette',
    },
    de: {
      badge: 'Ausführlicher Ratgeber & Formelerklärung',
      cta: 'Vollständigen Ratgeber Lesen',
      minRead: 'Min. Lesezeit',
      featured: 'Empfohlener Ratgeber',
    },
  };
  const guideText = guideTranslations[resolvedParams.locale] || guideTranslations.en;

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
    },
    ...(relatedGuideUrl && localizedGuide && {
      "isRelatedTo": {
        "@type": "Article",
        "name": localizedGuide.title,
        "url": relatedGuideUrl
      }
    })
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
        "item": `${baseUrl}/${resolvedParams.locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryTitle,
        "item": categoryUrl
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
      <nav aria-label="Breadcrumb" className="mb-6 font-sans text-sm text-slate-500 dark:text-slate-400">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <li>
            <Link href="/" className="hover:text-[#518231] dark:hover:text-[#6fa844] hover:underline transition-colors">Home</Link>
          </li>
          <li><span className="text-slate-400">/</span></li>
          <li>
            <Link
              href={categoryDef ? resolveIntlHref(`/calculators/category/${categoryDef.id}`) : resolveIntlHref('/sitemap')}
              className="hover:text-[#518231] dark:hover:text-[#6fa844] hover:underline transition-colors"
            >
              {categoryTitle}
            </Link>
          </li>
          <li><span className="text-slate-400">/</span></li>
          <li className="text-slate-700 dark:text-slate-300 font-medium" aria-current="page">{pageTitle}</li>
        </ol>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
        {/* Main Content Area (Left/Top) */}
        <div className="flex-1 w-full max-w-5xl min-w-0">
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="inline-block px-3 py-1 bg-[#518231]/10 border border-[#518231]/20 text-[#518231] dark:text-[#6fa844] rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
                {calc.category}
              </span>
              <FavoriteButton
                slug={calc.slug}
                title={calc.title}
                type="calculator"
                href={`/calculators/${calc.slug}`}
              />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4">
              {pageTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              {pageDesc}
            </p>
            
            {/* Author Byline for E-E-A-T */}
            <div className="flex items-center gap-3 py-3 border-y border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700">
                <img src="https://ik.imagekit.io/ubwpdqyav/my_photo-removebg-preview.png?updatedAt=1776774813574" alt="MD Abu Hanif Mia" className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Reviewed by <Link href="/about-us" className="text-[#518231] hover:underline">MD Abu Hanif Mia</Link>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Full Stack Web Architect • Last Updated: June 2026
                </p>
              </div>
            </div>
          </header>

          <ToolVisitTracker
            slug={calc.slug}
            title={calc.title}
            type="calculator"
            href={`/calculators/${calc.slug}`}
          />

          {/* Ad Placement above calculator (Top Content) */}
          <div className="mb-8 w-full">
            <AdSenseContainer slot="calculator_content_top" />
          </div>

          <div id="calculator-export-target" className="print-target calculator-view">
            <CalculatorViewWrapper calcDef={calc} locale={resolvedParams.locale} />
          </div>

          <ExportResultsPanel targetId="calculator-export-target" fileName={`${calc.slug}-results`} />
          <CalculatorMath slug={calc.slug} category={calc.category} />

          {/* Educational Guide & Math Deep-Dive Callout */}
          {localizedGuide && guideSlug && (
            <aside aria-label="Educational Guide" className="my-10 p-6 md:p-8 bg-gradient-to-br from-emerald-50/40 via-white to-slate-50 dark:from-[#518231]/10 dark:via-slate-900 dark:to-slate-900/60 rounded-2xl border border-[#518231]/25 dark:border-[#518231]/35 shadow-sm relative overflow-hidden group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#518231] dark:text-[#6fa844]">
                    {guideText.badge}
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 self-start sm:self-auto shrink-0">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {localizedGuide.readingTime} {guideText.minRead}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors">
                {localizedGuide.title}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed mb-6 max-w-3xl">
                {localizedGuide.description}
              </p>
              <div>
                <Link
                  href={{ pathname: '/guides/[slug]', params: { slug: guideSlug } }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#518231] hover:bg-[#436a28] text-white text-sm font-semibold shadow-sm transition-all hover:gap-3"
                >
                  <span>{guideText.cta}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </Link>
              </div>
            </aside>
          )}

          {/* Ad Placement below calculator (Main Content) */}
          <div className="my-10 w-full">
            <AdSenseContainer slot="calculator_content_bottom" style={{ minHeight: '90px' }} format="auto" />
          </div>

          {seoContent && (
            <article className="mt-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-10 prose prose-slate dark:prose-invert max-w-none lg:prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#518231] prose-img:rounded-xl">
              <ReactMarkdown
                components={{
                  code({ node, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    if (match && match[1] === 'mermaid') {
                      return <Mermaid chart={String(children).replace(/\n$/, '')} />;
                    }
                    return (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {seoContent}
              </ReactMarkdown>
            </article>
          )}

          {/* Inject custom Probability SEO Component if slug matches */}
          {calc.slug === 'probability-calculator' && (
            <ProbabilitySeoContent />
          )}

          {/* FAQ Section — Animated Accordion */}
          <div className="mt-12 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq: any, index: number) => (
                <details key={index} data-animated className="group border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800/50 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-slate-900 dark:text-white hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors select-none">
                    <span>{faq.question}</span>
                    <span className="transition-transform duration-200 group-open:rotate-180 text-slate-400 shrink-0 ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-2 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-200 dark:border-slate-700">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Area (Right/Bottom) */}
        <aside className="w-full lg:w-[360px] xl:w-[400px] shrink-0 flex flex-col gap-8">

          {/* Search Box */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Find a Calculator</h3>
            <form action={`/${resolvedParams.locale}/search`} method="GET" className="relative group">
              <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-[#518231] transition-colors" />
              </div>
              <input
                type="text"
                name="q"
                placeholder="Search calculators..."
                className="w-full ps-10 pe-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 rounded-xl focus:bg-white dark:focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-transparent transition-all"
                required
              />
            </form>
          </div>

          {/* Related Guide in Sidebar */}
          {localizedGuide && guideSlug && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-[#518231]/25 dark:border-[#518231]/35">
              <div className="flex items-center gap-2 text-[#518231] dark:text-[#6fa844] mb-3">
                <BookOpen className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {guideText.featured}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {localizedGuide.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                {localizedGuide.description}
              </p>
              <div className="flex items-center justify-between text-xs pt-3 border-t border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {localizedGuide.readingTime} {guideText.minRead}
                </span>
                <Link
                  href={{ pathname: '/guides/[slug]', params: { slug: guideSlug } }}
                  className="font-bold text-[#518231] dark:text-[#6fa844] hover:underline inline-flex items-center gap-1"
                >
                  <span>{guideText.cta}</span>
                  <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          )}

          {/* Features */}
          {mdData?.data?.features && mdData.data.features.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                Key Features
              </h3>
              <ul className="space-y-3">
                {mdData.data.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#518231] shrink-0 mt-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Use Cases */}
          {mdData?.data?.useCases && mdData.data.useCases.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/></svg>
                Common Use Cases
              </h3>
              <ul className="space-y-3">
                {mdData.data.useCases.map((useCase: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-2"></div>
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          )}

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

          {/* Ad Placement Sidebar (Sticky) */}
          <div className="sticky top-24 pt-4">
            <AdSenseContainer slot="calculator_sidebar_1" />
          </div>

        </aside>
      </div>

      {/* Related Calculators - Moved to bottom */}
      <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Related Calculators</h2>
          <Link href="/sitemap" className="text-sm font-bold text-[#518231] hover:text-[#436a28] dark:text-[#6fa844] dark:hover:text-[#518231] hover:underline inline-flex items-center">
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
                href={resolveIntlHref(`/calculators/${toolSlug}`)}
                className="group flex flex-col bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-[#518231]/30 dark:hover:border-[#518231]/40 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CalculatorIcon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-[#518231] transition-colors">{targetCalc.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
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
