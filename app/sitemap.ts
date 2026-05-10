import { MetadataRoute } from 'next';
import { calculators } from '../lib/data/calculators';
import { allToolsConfig } from '../lib/data/tools';
import { routing } from '../i18n/routing';

// ─────────────────────────────────────────────────────────
// SITEMAP INDEX ARCHITECTURE
// ─────────────────────────────────────────────────────────
// Uses Next.js generateSitemaps() to create a sitemap index:
//
//   /sitemap.xml       → Index referencing child sitemaps
//   /sitemap/0.xml     → Static & core pages (8 URLs)
//   /sitemap/1.xml     → Calculator pages A–L
//   /sitemap/2.xml     → Calculator pages M–Z
//   /sitemap/3.xml     → Developer tools (only implemented ones)
//
// IMPORTANT: Only URLs that return 200 are included.
// We do NOT emit sitemapData directory entries — those are
// display-only labels, not actual routable pages.
// ─────────────────────────────────────────────────────────

const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';

// ═══════════════════════════════════════════════════════
// Hreflang URL Builder
// ═══════════════════════════════════════════════════════
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
    lastModified: lastMod || new Date('2026-01-01'),
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

// ═══════════════════════════════════════════════════════
// Sitemap Index — 4 child sitemaps
// ═══════════════════════════════════════════════════════
export async function generateSitemaps() {
  return [
    { id: 0 },  // Static & core pages
    { id: 1 },  // Calculators A–L
    { id: 2 },  // Calculators M–Z
    { id: 3 },  // Developer tools (implemented only)
  ];
}

// ═══════════════════════════════════════════════════════
// Main sitemap — called once per id
// ═══════════════════════════════════════════════════════
export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {

  // ─── SITEMAP 0: Static & Core Pages ──────────────
  if (id === 0) {
    return [
      buildEntry('/', 'daily', 1.0, undefined, new Date()),
      buildEntry('/sitemap', 'weekly', 0.8),
      buildEntry('/search', 'weekly', 0.5),
      buildEntry('/community', 'daily', 0.7, undefined, new Date()),
      buildEntry('/about-us', 'monthly', 0.5),
      buildEntry('/privacy-policy', 'yearly', 0.3),
      buildEntry('/terms-of-use', 'yearly', 0.3),
    ];
  }

  // ─── SITEMAP 1 & 2: Calculator Pages ─────────────
  // Only includes calculators from the database that
  // have actual page implementations (generateStaticParams).
  if (id === 1 || id === 2) {
    const allCalcs = calculators
      .map((calc) => ({
        slug: calc.slug,
        routeKey: `/calculators/${calc.slug}`,
      }))
      .sort((a, b) => a.slug.localeCompare(b.slug));

    // Split at 'm': A–L in sitemap 1, M–Z in sitemap 2
    const midpoint = allCalcs.findIndex((c) => c.slug >= 'm');
    const splitIndex = midpoint === -1 ? Math.ceil(allCalcs.length / 2) : midpoint;

    const subset = id === 1
      ? allCalcs.slice(0, splitIndex)
      : allCalcs.slice(splitIndex);

    return subset.map(({ slug, routeKey }) => {
      const existsInRouting = (routing.pathnames as any)[routeKey];
      if (existsInRouting) {
        return buildEntry(routeKey, 'monthly', 0.9);
      }
      return buildEntry('/calculators/[slug]', 'monthly', 0.9, slug);
    });
  }

  // ─── SITEMAP 3: Developer Tools ──────────────────
  // ONLY includes tools that have actual components
  // registered in allToolsConfig. No phantom URLs.
  if (id === 3) {
    const implementedSlugs = Object.keys(allToolsConfig).sort();

    return implementedSlugs.map((slug) =>
      buildEntry('/tools/[slug]', 'weekly', 0.8, slug)
    );
  }

  return [];
}
