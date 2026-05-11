import { MetadataRoute } from 'next';
import { sitemapCategories } from '../lib/data/sitemapData';
import { calculators } from '../lib/data/calculators';
import { categories } from '../lib/data/categories';
import { collections } from '../lib/data/collections';
import { comparisons } from '../lib/data/comparisons';
import { routing } from '../i18n/routing';

// ─────────────────────────────────────────────────────────
// SITEMAP INDEX ARCHITECTURE
// ─────────────────────────────────────────────────────────
// Next.js `generateSitemaps()` creates a sitemap index at
// /sitemap.xml that references child sitemaps:
//
//   /sitemap/0.xml  →  Static & core pages
//   /sitemap/1.xml  →  Calculator pages (A–L)
//   /sitemap/2.xml  →  Calculator pages (M–Z)
//   /sitemap/3.xml  →  Developer tools
//
// WHY: Google recommends splitting sitemaps by content type.
// Each child sitemap is independently crawlable, so when
// you add a new tool, only /sitemap/3.xml gets re-fetched
// instead of the entire index. This improves crawl budget
// efficiency significantly for 200+ URL sites.
// ─────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════
// Developer Tools Registry (ONLY routable/implemented tools)
// ═══════════════════════════════════════════════════════
// IMPORTANT: Only add a slug here AFTER its component exists
// in app/components/tools/ AND its config exists in
// lib/data/tools/. Listing unbuilt tools causes Google to
// crawl 404s, wasting crawl budget and hurting domain quality.
// ═══════════════════════════════════════════════════════
const developerToolSlugs: string[] = [
  'json-formatter',
  'diff-checker',
  'html-formatter',
  'css-beautifier',
  'js-beautifier',
];

// ═══════════════════════════════════════════════════════
// Hreflang URL Builder
// Constructs fully-qualified locale-alternate URLs
// for every supported language. This is critical for
// international SEO — Google uses these to serve the
// correct language variant in search results.
// ═══════════════════════════════════════════════════════
const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';

function buildEntry(
  pathnameKey: string,
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
  priority: number,
  genericSlug?: string,
  lastMod?: Date
): MetadataRoute.Sitemap[0] {
  const languages: Record<string, string> = {};
  const routeMapping = (routing.pathnames as any)[pathnameKey];

  routing.locales.forEach((locale) => {
    let relativePath = '';

    if (pathnameKey === '/') {
      relativePath = `/${locale}`;
    } else if (routeMapping && typeof routeMapping === 'object' && routeMapping[locale]) {
      relativePath = `/${locale}${routeMapping[locale]}`;
      if (genericSlug) relativePath = relativePath.replace('[slug]', genericSlug);
    } else if (routeMapping && typeof routeMapping === 'string') {
      relativePath = `/${locale}${routeMapping}`;
      if (genericSlug) relativePath = relativePath.replace('[slug]', genericSlug);
    } else {
      relativePath = `/${locale}${pathnameKey}`;
      if (genericSlug) relativePath = relativePath.replace('[slug]', genericSlug);
    }

    languages[locale] = `${baseUrl}${relativePath}`;
  });

  languages['x-default'] =
    languages['en'] || `${baseUrl}/en${pathnameKey.replace('[slug]', genericSlug || '')}`;

  return {
    url: languages['en'] || `${baseUrl}/en${pathnameKey.replace('[slug]', genericSlug || '')}`,
    lastModified: lastMod || new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

// ═══════════════════════════════════════════════════════
// generateSitemaps() — tells Next.js to create a
// sitemap index with 4 child sitemaps.
// ═══════════════════════════════════════════════════════
export async function generateSitemaps() {
  return [
    { id: 0 },  // Static & core pages
    { id: 1 },  // Calculators A–L
    { id: 2 },  // Calculators M–Z
    { id: 3 },  // Developer tools
  ];
}

// ═══════════════════════════════════════════════════════
// Main sitemap function — called once per id.
// ═══════════════════════════════════════════════════════
export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {

  // ─── SITEMAP 0: Static & Core Pages ──────────────
  if (id === 0) {
    return [
      buildEntry('/', 'daily', 1.0),
      buildEntry('/sitemap', 'weekly', 0.8),
      buildEntry('/search', 'weekly', 0.6),
      buildEntry('/community', 'daily', 0.7),
      buildEntry('/community/new', 'monthly', 0.4),
      buildEntry('/about-us', 'monthly', 0.5),
      buildEntry('/privacy-policy', 'yearly', 0.3),
      buildEntry('/terms-of-use', 'yearly', 0.3),
      // Category pillar pages (high priority for topical authority)
      ...categories.map((cat) =>
        buildEntry('/calculators/category/[category]', 'weekly', 0.9, cat.id)
      ),
      // Collection bundle pages
      ...collections.map((collection) =>
        buildEntry('/collections/[slug]', 'weekly', 0.8, collection.slug)
      ),
      // Comparison pages
      ...comparisons.map((comparison) =>
        buildEntry('/compare/[slug]', 'monthly', 0.8, comparison.slug)
      ),
    ];
  }

  // ─── SITEMAP 1 & 2: Calculator Pages ─────────────
  if (id === 1 || id === 2) {
    const allCalcSlugs: { slug: string; priority: number }[] = [];
    const processedSlugs = new Set<string>();

    // 1) Database calculators (highest priority)
    calculators.forEach((calc) => {
      if (!processedSlugs.has(calc.slug)) {
        allCalcSlugs.push({ slug: calc.slug, priority: 0.9 });
        processedSlugs.add(calc.slug);
      }
    });

    // 2) SitemapData directory calculators (lower priority)
    sitemapCategories.forEach((category) => {
      category.links.forEach((link) => {
        const slug = link
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        if (!processedSlugs.has(slug)) {
          allCalcSlugs.push({ slug, priority: 0.7 });
          processedSlugs.add(slug);
        }
      });
    });

    // Sort alphabetically for deterministic output
    allCalcSlugs.sort((a, b) => a.slug.localeCompare(b.slug));

    // Split at midpoint: A–L in sitemap 1, M–Z in sitemap 2
    const midpoint = allCalcSlugs.findIndex((c) => c.slug >= 'm');
    const splitIndex = midpoint === -1 ? Math.ceil(allCalcSlugs.length / 2) : midpoint;

    const subset = id === 1
      ? allCalcSlugs.slice(0, splitIndex)
      : allCalcSlugs.slice(splitIndex);

    return subset.map(({ slug, priority }) => {
      const routeKey = `/calculators/${slug}`;
      const existsInRouting = (routing.pathnames as any)[routeKey];

      if (existsInRouting) {
        return buildEntry(routeKey, 'monthly', priority);
      }
      return buildEntry('/calculators/[slug]', 'monthly', priority, slug);
    });
  }

  // ─── SITEMAP 3: Developer Tools ──────────────────
  if (id === 3) {
    const processedTools = new Set<string>();

    return developerToolSlugs
      .filter((slug) => {
        if (processedTools.has(slug)) return false;
        processedTools.add(slug);
        return true;
      })
      .sort()
      .map((slug) => buildEntry('/tools/[slug]', 'weekly', 0.8, slug));
  }

  return [];
}
