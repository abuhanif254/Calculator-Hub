import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
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
  ExternalLink,
} from 'lucide-react';
import {
  allGuides,
  getGuideBySlug,
  getAdjacentGuides,
  type GuideCategory,
} from '@/lib/data/guides';
import { getCanonicalAndAlternates } from '@/lib/utils/seoUtils';
import { GuidesTableOfContents, type TocHeading } from '@/app/components/GuidesTableOfContents';
import { getLocalizedGuide } from '@/lib/utils/guideLocalization';

// ─────────────────────────────────────────────────────────────────────────────
// Static params — pre-render all guide slugs at build time
// ─────────────────────────────────────────────────────────────────────────────
export async function generateStaticParams() {
  const params: { slug: string; locale: string }[] = [];

  routing.locales.forEach((locale) => {
    allGuides.forEach((guide) => {
      let slugToUse = guide.slug;
      if (guide.slugs && guide.slugs[locale as keyof typeof guide.slugs]) {
        slugToUse = guide.slugs[locale as keyof typeof guide.slugs];
      }
      params.push({ slug: slugToUse, locale });
    });
  });

  return params;
}

// ─────────────────────────────────────────────────────────────────────────────
// Markdown loader — reads from content/en/guides/<slug>.md
// ─────────────────────────────────────────────────────────────────────────────
function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function loadGuideMarkdown(guideSlug: string, locale: string, currentSlug: string): { content: string; htmlContent: string } | null {
  let filePath = path.join(process.cwd(), 'content', locale, 'guides', `${currentSlug}.md`);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(process.cwd(), 'content', 'en', 'guides', `${guideSlug}.md`);
    if (!fs.existsSync(filePath)) return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { content } = matter(raw);

  // marked v18 uses token objects — we create a fresh instance per call
  // to avoid global state accumulation across concurrent SSG renders.
  const renderer = new marked.Renderer();

  // marked v18 heading token: { type, raw, depth, text, tokens }
  // 'text' is the plain-text string of the heading content
  renderer.heading = function ({ text, depth }: { text: string; depth: number }) {
    const id = slugifyHeading(text);
    return `<h${depth} id="${id}" class="heading-anchor">${text}</h${depth}>\n`;
  };

  // Wrap tables in a scrollable div for mobile
  const originalTable = renderer.table.bind(renderer);
  renderer.table = function (token: Parameters<typeof originalTable>[0]) {
    const tableHtml = originalTable(token);
    return `<div class="table-wrapper overflow-x-auto">${tableHtml}</div>`;
  };

  const htmlContent = marked(content, { renderer }) as string;
  return { content, htmlContent };
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
  let guide = getGuideBySlug(slug);
  if (!guide) return { title: 'Guide Not Found' };
  
  guide = getLocalizedGuide(guide, locale);

  const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';

  return {
    title: guide.title,
    description: guide.description,
    alternates: getCanonicalAndAlternates('/guides/[slug]', locale, slug),
    openGraph: {
      type: 'article',
      title: `${guide.title} | Nexus Calculator Guides`,
      description: guide.description,
      siteName: 'Nexus Calculator',
      publishedTime: guide.lastUpdated,
      modifiedTime: guide.lastUpdated,
      section: guide.category,
    },
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.description,
        datePublished: guide.lastUpdated,
        dateModified: guide.lastUpdated,
        author: {
          '@type': 'Organization',
          name: 'Nexus Calculator',
          url: baseUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Nexus Calculator',
          url: baseUrl,
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}/en/guides/${slug}`,
        },
        timeRequired: `PT${guide.readingTime}M`,
        articleSection: guide.category,
        ...(guide.relatedCalculator && {
          relatedLink: `${baseUrl}/en/calculators/${guide.relatedCalculator}`,
        }),
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
            { '@type': 'ListItem', position: 2, name: 'Guides', item: `${baseUrl}/en/guides` },
            { '@type': 'ListItem', position: 3, name: guide.title, item: `${baseUrl}/en/guides/${slug}` },
          ],
        },
      }),
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

  const guide = getLocalizedGuide(baseGuide, locale);

  const markdownData = loadGuideMarkdown(guide.slug, locale, slug);
  const htmlContent = markdownData?.htmlContent ?? `<p>Content coming soon. Check back shortly!</p>`;

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

  return (
    <div className="flex gap-10 xl:gap-14">

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
            Home
          </Link>
          <ChevronRight size={11} />
          <Link
            href="/guides"
            className="hover:text-[#518231] dark:hover:text-[#6fa844] transition-colors"
          >
            Guides
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

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400 pb-6 border-b border-slate-100 dark:border-white/5">
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              {guide.readingTime} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              Updated {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <catIcon.Icon size={14} />
              {guide.category}
            </span>
          </div>
        </header>

        {/* ── Related Calculator CTA (top) ───────────────────────────── */}
        {guide.relatedCalculator && (
          <div className="mb-8 p-4 rounded-xl border border-[#518231]/20 dark:border-[#518231]/30 bg-[#518231]/5 dark:bg-[#518231]/10 flex items-center gap-4">
            <div className="p-2.5 rounded-lg bg-[#518231]/10 dark:bg-[#518231]/20 shrink-0">
              <Calculator size={18} className="text-[#518231] dark:text-[#6fa844]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#518231] dark:text-[#6fa844] uppercase tracking-wide mb-0.5">
                Related Calculator
              </p>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                Use the{' '}
                <Link
                  href={{
                    pathname: '/calculators/[slug]',
                    params: { slug: guide.relatedCalculator },
                  }}
                  className="font-semibold text-[#518231] dark:text-[#6fa844] hover:underline"
                >
                  {guide.relatedCalculator
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>{' '}
                to apply what you learn in this guide.
              </p>
            </div>
            <Link
              href={{
                pathname: '/calculators/[slug]',
                params: { slug: guide.relatedCalculator },
              }}
              className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold text-[#518231] dark:text-[#6fa844] bg-[#518231]/10 dark:bg-[#518231]/20 hover:bg-[#518231]/20 dark:hover:bg-[#518231]/30 px-3 py-2 rounded-lg transition-colors"
            >
              Open
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
                On this page
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
                Previous
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
                Next
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
          RIGHT COLUMN — Sticky Table of Contents
          Hidden on < xl screens; visible xl+
      ══════════════════════════════════════════════════════════════ */}
      <aside className="hidden xl:block w-56 shrink-0">
        <GuidesTableOfContents headings={headings} />
      </aside>

    </div>
  );
}
