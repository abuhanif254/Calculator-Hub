import { Metadata, ResolvingMetadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { Link, routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import {
  ChevronRight,
  Clock,
  Calendar,
  ArrowLeft,
  ArrowRight,
  Calculator,
  DollarSign,
  Heart,
  FlaskConical,
  ShieldCheck,
  ExternalLink,
  Palette,
  Wrench,
} from 'lucide-react';
import {
  allGuides,
  getGuideBySlug,
  getAdjacentGuides,
  type GuideCategory,
} from '@/lib/data/guides';
import { getCanonicalAndAlternates, getCanonicalUrl, canonicalizeInternalHref } from '@/lib/utils/seoUtils';
import { GuidesTableOfContents, type TocHeading } from '@/app/components/GuidesTableOfContents';
import { getLocalizedGuide } from '@/lib/utils/guideLocalization';
import { getLocalizedToolMeta, getLocalizedCalcMeta } from '@/lib/utils/toolLocalization';
import { getCalculatorBySlug } from '@/lib/data/calculators';
import { toClientCalcDef } from '@/lib/utils/getCalculatorMessages';
import { enrichGuideSeoContent, getLocalizedReviewerByline } from '@/lib/utils/seoContentEnricher';
import { AdSenseContainer } from '@/app/components/AdSenseContainer';


// SSG configuration — fully static, no revalidation needed.
// Guide content is stored in static MDX/TS files and only changes on deploy.
// revalidate=false eliminates ISR background re-renders, saving Vercel quota.
export const revalidate = false;
export const dynamicParams = false;

// ─────────────────────────────────────────────────────────────────────────────
// Static params — pre-render all guide slugs at build time
// ─────────────────────────────────────────────────────────────────────────────
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const locales = params?.locale ? [params.locale] : routing.locales;
  const result: { slug: string }[] = [];
  const seen = new Set<string>();

  locales.forEach((locale) => {
    allGuides.forEach((guide) => {
      let slugToUse = guide.slug;
      if (guide.slugs && guide.slugs[locale as keyof typeof guide.slugs]) {
        slugToUse = guide.slugs[locale as keyof typeof guide.slugs];
      }
      if (!seen.has(slugToUse)) {
        seen.add(slugToUse);
        result.push({ slug: slugToUse });
      }
    });
  });

  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// Markdown loader — reads localized guide or falls back to English
// ─────────────────────────────────────────────────────────────────────────────
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const guideMarkdownCache = new Map<string, string>();

function renderGuideMarkdownToHtml(markdownText: string, locale: string): string {
  const renderer = new marked.Renderer();

  renderer.heading = function ({ text, depth }: { text: string; depth: number }) {
    const safeDepth = depth === 1 ? 2 : depth;
    const id = slugifyHeading(text);
    return `<h${safeDepth} id="${id}" class="heading-anchor">${text}</h${safeDepth}>\n`;
  };

  const originalTable = renderer.table.bind(renderer);
  renderer.table = function (token: Parameters<typeof originalTable>[0]) {
    const tableHtml = originalTable(token);
    return `<div class="table-wrapper overflow-x-auto">${tableHtml}</div>`;
  };

  const rawHtml = marked(markdownText, { renderer }) as string;
  return rawHtml.replace(
    /<a\s+([^>]*?)href=["']([^"']+)["']([^>]*)>/gi,
    (_match, before, href, after) => {
      const canonicalHref = canonicalizeInternalHref(href, locale);
      return `<a ${before}href="${canonicalHref}"${after}>`;
    }
  );
}

function loadGuideRawMarkdown(guideSlug: string, locale: string, currentSlug: string, localizedSlug?: string): string | null {
  // 1. Try currentSlug in locale folder
  let filePath = path.join(process.cwd(), 'content', locale, 'guides', `${currentSlug}.md`);
  if (!fs.existsSync(filePath) && localizedSlug) {
    // 2. Try localizedSlug in locale folder
    filePath = path.join(process.cwd(), 'content', locale, 'guides', `${localizedSlug}.md`);
  }
  if (!fs.existsSync(filePath)) {
    // 3. Try guideSlug in locale folder
    filePath = path.join(process.cwd(), 'content', locale, 'guides', `${guideSlug}.md`);
  }
  if (!fs.existsSync(filePath)) {
    // 4. Fallback to English folder only for en
    if (locale === 'en') {
      filePath = path.join(process.cwd(), 'content', 'en', 'guides', `${guideSlug}.md`);
    }
    if (!fs.existsSync(filePath)) return null;
  }

  const cacheKey = `${locale}:${filePath}`;
  if (guideMarkdownCache.has(cacheKey)) {
    return guideMarkdownCache.get(cacheKey)!;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(raw);
  const content = parsed.content.replace(/^\s*#\s+[^\r\n]+\r?\n*/, '').trim();
  guideMarkdownCache.set(cacheKey, content);
  return content;
}

// ─────────────────────────────────────────────────────────────────────────────
// extractHeadings: parse raw HTML string for h2/h3 elements
// ─────────────────────────────────────────────────────────────────────────────
function extractHeadings(htmlContent: string): TocHeading[] {
  const regex = /<(h2|h3)[^>]*id="([^"]*)"[^>]*>(.*?)<\/\1>/gi;
  const headings: TocHeading[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(htmlContent)) !== null) {
    const level = parseInt(match[1].replace('h', ''), 10) as 2 | 3;
    const id = match[2];
    const text = match[3].replace(/<[^>]+>/g, '').trim();
    if (id && text) headings.push({ id, text, level });
  }

  return headings;
}


// ─────────────────────────────────────────────────────────────────────────────
// SEO Metadata
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ locale: string; slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { locale, slug } = await params;
  let baseGuide = getGuideBySlug(slug);
  if (!baseGuide) return { title: 'Guide Not Found' };
  
  const guide = getLocalizedGuide(baseGuide, locale);

  const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net')
    .replace(/\/$/, '')
    .replace('://nexuscalculator.net', '://www.nexuscalculator.net');
  const canonicalUrl = getCanonicalUrl('/guides/[slug]', locale, baseGuide.slug);
  const guidesIndexUrl = getCanonicalUrl('/guides', locale);

  const relatedUrl = guide.relatedCalculator
    ? (guide.relatedType === 'tool'
        ? getCanonicalUrl('/tools/[slug]', locale, guide.relatedCalculator)
        : getCanonicalUrl('/calculators/[slug]', locale, guide.relatedCalculator))
    : undefined;

  return {
    title: guide.title,
    description: guide.description,
    alternates: getCanonicalAndAlternates('/guides/[slug]', locale, baseGuide.slug),
    openGraph: {
      type: 'article',
      title: `${guide.title} | Nexus Calculator Guides`,
      description: guide.description,
      siteName: 'Nexus Calculator',
      publishedTime: guide.lastUpdated,
      modifiedTime: guide.lastUpdated,
      section: guide.category,
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Category icon map
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_ICON: Record<GuideCategory, { Icon: React.ElementType; style: string }> = {
  Finance: { Icon: DollarSign, style: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10' },
  Health: { Icon: Heart, style: 'text-rose-500 bg-rose-50 dark:bg-rose-500/10' },
  'Math & Science': { Icon: FlaskConical, style: 'text-violet-600 bg-violet-50 dark:bg-violet-500/10' },
  'Privacy & Security': { Icon: ShieldCheck, style: 'text-sky-600 bg-sky-50 dark:bg-sky-500/10' },
  'Design & Media': { Icon: Palette, style: 'text-pink-600 bg-pink-50 dark:bg-pink-500/10' },
  'Productivity & Utilities': { Icon: Wrench, style: 'text-amber-600 bg-amber-50 dark:bg-amber-500/10' },
};

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default async function GuideArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  let baseGuide = getGuideBySlug(slug);
  if (!baseGuide) notFound();

  // If accessed via an unlocalized slug on a localized path (e.g. /es/guias/debt-to-income-ratio-guide),
  // permanently redirect to the canonical localized guide URL
  const expectedSlug = baseGuide.slugs?.[locale as keyof typeof baseGuide.slugs] || baseGuide.slug;
  if (slug !== expectedSlug) {
    const canonicalGuideUrl = getCanonicalUrl('/guides/[slug]', locale, baseGuide.slug);
    permanentRedirect(canonicalGuideUrl);
  }

  const guide = getLocalizedGuide(baseGuide, locale);
  const localizedSlug = baseGuide.slugs?.[locale as keyof typeof baseGuide.slugs];

  const pairedCalc =
    guide.relatedCalculator && guide.relatedType !== 'tool'
      ? getCalculatorBySlug(guide.relatedCalculator)
      : undefined;
  const localizedCalcInputs = pairedCalc ? toClientCalcDef(pairedCalc, locale).fields : [];
  const relatedItemMeta = guide.relatedCalculator
    ? (guide.relatedType === 'tool'
        ? getLocalizedToolMeta(guide.relatedCalculator, locale)
        : getLocalizedCalcMeta(guide.relatedCalculator, locale))
    : { title: guide.title, description: guide.description };
  const relatedItemTitle = relatedItemMeta.title;

  const rawMdContent = loadGuideRawMarkdown(baseGuide.slug, locale, slug, localizedSlug) || '';
  const { enrichedContent, faqs: guideFaqs } = enrichGuideSeoContent({
    locale,
    guideTitle: guide.title,
    guideDescription: guide.description,
    rawContent: rawMdContent,
    calc: pairedCalc,
    localizedCalcTitle: relatedItemMeta.title || guide.title,
    localizedCalcDesc: relatedItemMeta.description || guide.description,
    localizedInputs: localizedCalcInputs,
    localizedCalcFaqs: [],
  });

  const htmlContent = enrichedContent
    ? renderGuideMarkdownToHtml(enrichedContent, locale)
    : `<p>${guide.description}</p>`;

  const reviewerByline = getLocalizedReviewerByline(guide.category, locale, guide.lastUpdated);

  const headings = extractHeadings(htmlContent);
  const { prev, next } = getAdjacentGuides(slug);
  
  const prevGuide = prev ? getLocalizedGuide(prev, locale) : null;
  const nextGuide = next ? getLocalizedGuide(next, locale) : null;

  const catIcon = CATEGORY_ICON[guide.category];

  const formattedDate = new Date(guide.lastUpdated).toLocaleDateString(
    locale === 'en' ? 'en-US' : locale, 
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );
  const baseUrl = 'https://www.nexuscalculator.net';
  const canonicalUrl = getCanonicalUrl('/guides/[slug]', locale, slug);
  const guidesIndexUrl = getCanonicalUrl('/guides', locale);

  const relatedUrl = guide.relatedCalculator
    ? (guide.relatedType === 'tool'
        ? getCanonicalUrl('/tools/[slug]', locale, guide.relatedCalculator)
        : getCanonicalUrl('/calculators/[slug]', locale, guide.relatedCalculator))
    : undefined;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    inLanguage: locale,
    datePublished: guide.lastUpdated,
    dateModified: guide.lastUpdated,
    author: {
      '@type': 'Person',
      name: 'MD Abu Hanif Mia',
      url: `${baseUrl}/${locale}/about-us`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nexus Calculator',
      url: `${baseUrl}/en`,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icons/icon-512x512.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    timeRequired: `PT${Math.max(guide.readingTime || 5, 6)}M`,
    articleSection: guide.category,
    ...(relatedUrl && {
      relatedLink: relatedUrl,
    }),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guideFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  const guideUiCopy: Record<string, {
    home: string;
    guides: string;
    minRead: string;
    updated: string;
    relatedTool: string;
    relatedCalc: string;
    usePrefix: string;
    useSuffix: string;
    open: string;
    onThisPage: string;
    previous: string;
    next: string;
    faqHeading: string;
  }> = {
    en: {
      home: 'Home',
      guides: 'Guides',
      minRead: 'min read',
      updated: 'Updated',
      relatedTool: 'Related Tool',
      relatedCalc: 'Related Calculator',
      usePrefix: 'Use the ',
      useSuffix: ' to apply what you learn in this guide.',
      open: 'Open',
      onThisPage: 'On this page',
      previous: 'Previous',
      next: 'Next',
      faqHeading: 'Frequently Asked Questions',
    },
    es: {
      home: 'Inicio',
      guides: 'Guías',
      minRead: 'min de lectura',
      updated: 'Actualizado el',
      relatedTool: 'Herramienta Relacionada',
      relatedCalc: 'Calculadora Relacionada',
      usePrefix: 'Utilice ',
      useSuffix: ' para poner en práctica lo aprendido en esta guía.',
      open: 'Abrir',
      onThisPage: 'En esta página',
      previous: 'Anterior',
      next: 'Siguiente',
      faqHeading: 'Preguntas Frecuentes',
    },
    fr: {
      home: 'Accueil',
      guides: 'Guides',
      minRead: 'min de lecture',
      updated: 'Mis à jour le',
      relatedTool: 'Outil Associé',
      relatedCalc: 'Calculatrice Associée',
      usePrefix: 'Utilisez ',
      useSuffix: ' pour mettre en pratique les concepts de ce guide.',
      open: 'Ouvrir',
      onThisPage: 'Sur cette page',
      previous: 'Précédent',
      next: 'Suivant',
      faqHeading: 'Questions Fréquemment Posées',
    },
    de: {
      home: 'Startseite',
      guides: 'Ratgeber',
      minRead: 'Min. Lesezeit',
      updated: 'Aktualisiert am',
      relatedTool: 'Passendes Werkzeug',
      relatedCalc: 'Passender Rechner',
      usePrefix: 'Nutzen Sie ',
      useSuffix: ', um das Wissen aus diesem Ratgeber direkt anzuwenden.',
      open: 'Öffnen',
      onThisPage: 'Auf dieser Seite',
      previous: 'Zurück',
      next: 'Weiter',
      faqHeading: 'Häufig gestellte Fragen',
    },
  };
  const ui = guideUiCopy[locale] || guideUiCopy.en;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: ui.home, item: `${baseUrl}/${locale}` },
      { '@type': 'ListItem', position: 2, name: ui.guides, item: guidesIndexUrl },
      { '@type': 'ListItem', position: 3, name: guide.title, item: canonicalUrl },
    ],
  };

  return (
    <div className="flex gap-10 xl:gap-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ══════════════════════════════════════════════════════════════
          ARTICLE CONTENT (center column)
      ══════════════════════════════════════════════════════════════ */}
      <article className="flex-1 min-w-0">

        {/* ── Breadcrumb ─────────────────────────────────────────────── */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-6 flex-wrap"
        >
          <Link
            href="/"
            className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors"
          >
            {ui.home}
          </Link>
          <ChevronRight size={11} />
          <Link
            href="/guides"
            className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors"
          >
            {ui.guides}
          </Link>
          <ChevronRight size={11} />
          <span className="text-slate-600 dark:text-slate-300 font-medium line-clamp-1">
            {guide.title}
          </span>
        </nav>

        {/* ── Article Header ─────────────────────────────────────────── */}
        <header className="mb-10">
          {/* Category badge */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${catIcon.style}`}
            >
              <catIcon.Icon size={11} />
              {guide.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight mb-5">
            {guide.title}
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            {guide.description}
          </p>

          {/* Meta & E-E-A-T Reviewer row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-100 dark:border-white/5">
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {Math.max(guide.readingTime || 5, 6)} {ui.minRead}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {ui.updated} {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <catIcon.Icon size={14} />
              {guide.category}
            </span>
          </div>
          <div className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{reviewerByline.reviewedBy} MD Abu Hanif Mia</span> • {reviewerByline.reviewer} • {reviewerByline.verifiedBadge}
          </div>
        </header>

        {/* ── Related Calculator CTA (top) ───────────────────────────── */}
        {guide.relatedCalculator && (
          <div className="mb-8 p-4 rounded-xl border border-[#518231]/20 dark:border-[#518231]/30 bg-[#518231]/5 dark:bg-[#518231]/10 flex items-center gap-4">
            <div className="p-2.5 rounded-lg bg-[#518231]/10 dark:bg-[#518231]/20 shrink-0">
              {guide.relatedType === 'tool' ? (
                <Wrench size={18} className="text-[#518231] dark:text-[#6fa844]" />
              ) : (
                <Calculator size={18} className="text-[#518231] dark:text-[#6fa844]" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#518231] dark:text-[#6fa844] uppercase tracking-wide mb-0.5">
                {guide.relatedType === 'tool' ? ui.relatedTool : ui.relatedCalc}
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                {ui.usePrefix}
                <Link
                  href={
                    guide.relatedType === 'tool'
                      ? ({ pathname: '/tools/[slug]', params: { slug: guide.relatedCalculator } } as any)
                      : ({ pathname: '/calculators/[slug]', params: { slug: guide.relatedCalculator } } as any)
                  }
                  className="font-semibold text-[#518231] dark:text-[#6fa844] hover:underline"
                >
                  {relatedItemTitle}
                </Link>
                {ui.useSuffix}
              </p>
            </div>
            <Link
              href={
                guide.relatedType === 'tool'
                  ? ({ pathname: '/tools/[slug]', params: { slug: guide.relatedCalculator } } as any)
                  : ({ pathname: '/calculators/[slug]', params: { slug: guide.relatedCalculator } } as any)
              }
              className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#518231] dark:text-[#6fa844] bg-[#518231]/10 dark:bg-[#518231]/20 hover:bg-[#518231]/20 dark:hover:bg-[#518231]/30 px-3 py-2 rounded-lg transition-colors"
            >
              {ui.open}
              <ExternalLink size={12} />
            </Link>
          </div>
        )}

        {/* ── Mobile inline Table of Contents (hidden on xl where sticky aside shows) ── */}
        {headings.length > 0 && (
          <details className="xl:hidden mb-8 rounded-xl border border-slate-200 dark:border-white/8 bg-slate-50 dark:bg-white/3 group">
            <summary className="flex items-center justify-between px-4 py-3 cursor-pointer select-none list-none">
              <span className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-[#518231]" />
                {ui.onThisPage}
              </span>
              <ChevronRight
                size={15}
                className="text-slate-400 transition-transform duration-200 group-open:rotate-90"
              />
            </summary>
            <ul className="px-4 pb-3 pt-1 space-y-1 border-t border-slate-100 dark:border-white/5">
              {headings.map(({ id, text, level }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`block text-sm py-1 text-[#518231] dark:text-[#6fa844] hover:underline ${
                      level === 3 ? 'pl-4 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200' : 'font-medium'
                    }`}
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        )}

        {/* ── Article Prose ──────────────────────────────────────────── */}
        <div
          className="
            prose prose-slate dark:prose-invert
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-slate-100 dark:prose-h2:border-white/5
            prose-h3:text-lg prose-h3:mt-7 prose-h3:mb-3
            prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed
            prose-strong:text-slate-800 dark:prose-strong:text-slate-200
            prose-a:text-[#518231] dark:prose-a:text-[#6fa844] prose-a:no-underline hover:prose-a:underline
            prose-code:text-[#518231] dark:prose-code:text-[#6fa844] prose-code:bg-[#518231]/8 dark:prose-code:bg-[#518231]/15 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:rounded-xl prose-pre:border prose-pre:border-slate-700
            prose-table:text-sm
            prose-th:bg-slate-50 dark:prose-th:bg-slate-800 prose-th:font-semibold
            prose-td:text-slate-600 dark:prose-td:text-slate-400
            prose-blockquote:border-l-[#518231] prose-blockquote:bg-[#518231]/5 dark:prose-blockquote:bg-[#518231]/10 prose-blockquote:rounded-r-lg prose-blockquote:py-0.5 prose-blockquote:not-italic
            prose-li:text-slate-600 dark:prose-li:text-slate-400
            max-w-none
          "
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        {/* ── Guide FAQ Section (matches FAQPage JSON-LD) ────────────── */}
        {guideFaqs && guideFaqs.length > 0 && (
          <section className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {ui.faqHeading}
            </h2>
            <div className="space-y-4">
              {guideFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800"
                >
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── In-Content Ad Placement (After In-Depth Guide) ────────────── */}
        <div className="my-10 w-full print:hidden flex justify-center">
          <AdSenseContainer slot="guide_content_bottom" />
        </div>

        {/* ── Prev / Next Navigation ─────────────────────────────────── */}
        <nav
          aria-label="Guide navigation"
          className="mt-14 pt-8 border-t border-slate-100 dark:border-white/5 grid grid-cols-2 gap-4"
        >
          {prevGuide ? (
            <Link
              href={{ pathname: '/guides/[slug]', params: { slug: prevGuide.slug } }}
              className="group flex flex-col gap-1 p-4 rounded-xl border border-slate-200 dark:border-white/8 hover:border-[#518231]/30 dark:hover:border-[#518231]/30 bg-white dark:bg-slate-800/50 hover:shadow-md transition-all duration-200"
            >
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors">
                <ArrowLeft size={13} />
                {ui.previous}
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-snug">
                {prevGuide.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextGuide ? (
            <Link
              href={{ pathname: '/guides/[slug]', params: { slug: nextGuide.slug } }}
              className="group flex flex-col items-end gap-1 p-4 rounded-xl border border-slate-200 dark:border-white/8 hover:border-[#518231]/30 dark:hover:border-[#518231]/30 bg-white dark:bg-slate-800/50 hover:shadow-md transition-all duration-200 text-right"
            >
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors">
                {ui.next}
                <ArrowRight size={13} />
              </span>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 leading-snug">
                {nextGuide.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </article>

      {/* ══════════════════════════════════════════════════════════════
          RIGHT COLUMN — Sticky Table of Contents & Sidebar Ad
          Hidden on < xl screens; visible xl+
      ══════════════════════════════════════════════════════════════ */}
      <aside className="hidden xl:block w-56 shrink-0 space-y-8">
        <GuidesTableOfContents headings={headings} />
        <div className="sticky top-24 pt-4 print:hidden">
          <AdSenseContainer slot="guide_sidebar" />
        </div>
      </aside>


    </div>
  );
}
