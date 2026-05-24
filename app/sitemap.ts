import { MetadataRoute } from 'next';
import { calculators } from '../lib/data/calculators';
import { categories } from '../lib/data/categories';
import { collections } from '../lib/data/collections';
import { comparisons } from '../lib/data/comparisons';
import { routing } from '../i18n/routing';
import { allToolsConfig } from '../lib/data/tools/index';

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
const developerToolSlugs: string[] = Object.keys(allToolsConfig);

// ═══════════════════════════════════════════════════════
// Hreflang URL Builder
// Constructs fully-qualified locale-alternate URLs
// for every supported language. This is critical for
// international SEO — Google uses these to serve the
// correct language variant in search results.
// ═══════════════════════════════════════════════════════
const baseUrl = (process.env.APP_URL || 'https://nexuscalculator.net').replace(/\/$/, '');

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
    } else if (routeMapping && typeof routeMapping === 'string') {
      relativePath = `/${locale}${routeMapping}`;
    } else {
      relativePath = `/${locale}${pathnameKey}`;
    }

    if (genericSlug) {
      relativePath = relativePath
        .replace('[slug]', genericSlug)
        .replace('[category]', genericSlug);
    }

    languages[locale] = `${baseUrl}${relativePath}`;
  });

  const defaultPath = pathnameKey
    .replace('[slug]', genericSlug || '')
    .replace('[category]', genericSlug || '');

  languages['x-default'] =
    languages['en'] || `${baseUrl}/en${defaultPath}`;

  return {
    url: languages['en'] || `${baseUrl}/en${defaultPath}`,
    ...(lastMod ? { lastModified: lastMod } : {}),
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
    { id: '0' },  // Static & core pages
    { id: '1' },  // Calculators A–L
    { id: '2' },  // Calculators M–Z
    { id: '3' },  // Developer tools
  ];
}

// ═══════════════════════════════════════════════════════
// Main sitemap function — called once per id.
// ═══════════════════════════════════════════════════════
export default async function sitemap({
  id,
}: {
  id: number | string;
}): Promise<MetadataRoute.Sitemap> {
  const sitemapId = Number(id);


  // ─── SITEMAP 0: Static & Core Pages ──────────────
  if (sitemapId === 0) {
    return [
      buildEntry('/', 'daily', 1.0),
      buildEntry('/sitemap', 'weekly', 0.8),
      buildEntry('/community', 'daily', 0.7),
      buildEntry('/community/new', 'monthly', 0.4),
      buildEntry('/search', 'weekly', 0.6),
      buildEntry('/about-us', 'monthly', 0.5),
      buildEntry('/privacy-policy', 'yearly', 0.3),
      buildEntry('/terms-of-use', 'yearly', 0.3),
      // Category pillar pages (high priority for topical authority)
      ...categories
        .filter((cat) => calculators.some((calc) => cat.dbCategory.includes(calc.category)))
        .map((cat) =>
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
  if (sitemapId === 1 || sitemapId === 2) {
    const allCalcSlugs: { slug: string; priority: number; lastUpdated?: string }[] = [];
    const processedSlugs = new Set<string>();

    // 1) Database calculators (highest priority)
    calculators.forEach((calc) => {
      if (!processedSlugs.has(calc.slug)) {
        allCalcSlugs.push({
          slug: calc.slug,
          priority: 0.9,
          lastUpdated: calc.meta.lastUpdated,
        });
        processedSlugs.add(calc.slug);
      }
    });

    // Sort alphabetically for deterministic output
    allCalcSlugs.sort((a, b) => a.slug.localeCompare(b.slug));

    // Split at midpoint: A–L in sitemap 1, M–Z in sitemap 2
    const midpoint = allCalcSlugs.findIndex((c) => c.slug >= 'm');
    const splitIndex = midpoint === -1 ? Math.ceil(allCalcSlugs.length / 2) : midpoint;

    const subset = sitemapId === 1
      ? allCalcSlugs.slice(0, splitIndex)
      : allCalcSlugs.slice(splitIndex);

    return subset.map(({ slug, priority, lastUpdated }) => {
      // Use the calculator's own lastUpdated date, or fall back to a
      // baseline date so Google always gets a concrete lastModified signal.
      const lastMod = lastUpdated ? new Date(lastUpdated) : new Date('2025-01-01');
      const routeKey = `/calculators/${slug}`;
      const existsInRouting = (routing.pathnames as any)[routeKey];

      if (existsInRouting) {
        return buildEntry(routeKey, 'monthly', priority, undefined, lastMod);
      }
      return buildEntry('/calculators/[slug]', 'monthly', priority, slug, lastMod);
    });
  }

  // ─── SITEMAP 3: Developer Tools ──────────────────
  if (sitemapId === 3) {
    const processedTools = new Set<string>();
    // Tools section was heavily built out in late 2025 — use that as
    // the baseline lastModified so Googlebot knows they're fresh.
    const toolsLastMod = new Date('2025-11-01');

    return developerToolSlugs
      .filter((slug) => {
        if (processedTools.has(slug)) return false;
        processedTools.add(slug);
        return true;
      })
      .sort()
      .map((slug) => buildEntry('/tools/[slug]', 'weekly', 0.8, slug, toolsLastMod));
  }

  return [];
}
