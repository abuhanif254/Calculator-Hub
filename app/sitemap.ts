import { MetadataRoute } from 'next';
import { calculators } from '../lib/data/calculators';
import { categories } from '../lib/data/categories';
import { collections } from '../lib/data/collections';
import { comparisons } from '../lib/data/comparisons';
import { routing } from '../i18n/routing';
import { allToolsConfig } from '../lib/data/tools/index';
import { allGuides } from '../lib/data/guides';

export const revalidate = 86400; // Cache sitemap for 24 hours to save Vercel free tier limits

// ─────────────────────────────────────────────────────────
// SINGLE SITEMAP ARCHITECTURE
// ─────────────────────────────────────────────────────────
// We previously used generateSitemaps() to split into child sitemaps.
// However, there is a known Next.js 15 routing bug where next-intl's
// dynamic [locale] segment incorrectly intercepts the auto-generated
// /sitemap.xml index and renders the 404 HTML layout instead of XML.
// Since the total URL count is far below the 50,000 limit, we
// combine them into a single fast sitemap.
// ─────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════
// Developer Tools Registry (ONLY routable/implemented tools)
// ═══════════════════════════════════════════════════════
const developerToolSlugs: string[] = Object.keys(allToolsConfig);

// ═══════════════════════════════════════════════════════
// Hreflang URL Builder
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

  languages['x-default'] = languages['en'] || `${baseUrl}/en${defaultPath}`;

  return {
    url: languages['en'] || `${baseUrl}/en${defaultPath}`,
    ...(lastMod ? { lastModified: lastMod } : {}),
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ─── STATIC & CORE PAGES ──────────────
  const coreEntries = [
    buildEntry('/', 'daily', 1.0),
    buildEntry('/sitemap', 'weekly', 0.8),
    buildEntry('/community', 'daily', 0.7),
    buildEntry('/community/new', 'monthly', 0.4),
    buildEntry('/about-us', 'monthly', 0.5),
    buildEntry('/privacy-policy', 'yearly', 0.3),
    buildEntry('/terms-of-use', 'yearly', 0.3),
    buildEntry('/guides', 'weekly', 0.85),
    ...allGuides.map((guide) => buildEntry('/guides/[slug]', 'monthly', 0.75, guide.slug, new Date(guide.lastUpdated))),
    ...categories.filter((cat) => calculators.some((calc) => cat.dbCategory.includes(calc.category))).map((cat) => buildEntry('/calculators/category/[category]', 'weekly', 0.9, cat.id)),
    ...collections.map((collection) => buildEntry('/collections/[slug]', 'weekly', 0.8, collection.slug)),
    ...comparisons.map((comparison) => buildEntry('/compare/[slug]', 'monthly', 0.8, comparison.slug)),
  ];

  // ─── CALCULATOR PAGES ─────────────
  const allCalcSlugs: { slug: string; priority: number; lastUpdated?: string }[] = [];
  const processedSlugs = new Set<string>();

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

  allCalcSlugs.sort((a, b) => a.slug.localeCompare(b.slug));

  const calcEntries = allCalcSlugs.map(({ slug, priority, lastUpdated }) => {
    const lastMod = lastUpdated ? new Date(lastUpdated) : new Date('2026-05-25');
    const routeKey = `/calculators/${slug}`;
    const existsInRouting = (routing.pathnames as any)[routeKey];

    if (existsInRouting) {
      return buildEntry(routeKey, 'monthly', priority, undefined, lastMod);
    }
    return buildEntry('/calculators/[slug]', 'monthly', priority, slug, lastMod);
  });

  // ─── DEVELOPER TOOLS ──────────────────
  const processedTools = new Set<string>();
  const toolsLastMod = new Date('2026-05-25');

  const toolEntries = developerToolSlugs
    .filter((slug) => {
      if (processedTools.has(slug)) return false;
      processedTools.add(slug);
      return true;
    })
    .sort()
    .map((slug) => buildEntry('/tools/[slug]', 'weekly', 0.8, slug, toolsLastMod));

  // ─── COMMUNITY POSTS ──────────────────
  let communityEntries: MetadataRoute.Sitemap = [];
  try {
    const { collection, getDocs } = await import('firebase/firestore');
    const { db } = await import('../lib/firebase');
    const postsSnapshot = await getDocs(collection(db, 'posts'));
    communityEntries = postsSnapshot.docs.map(doc => {
      const data = doc.data();
      return buildEntry(
        '/community/[slug]', 
        'daily', 
        0.7, 
        data.slug, 
        data.updatedAt?.toDate() || new Date(data.createdAt?.toMillis() || Date.now())
      );
    });
  } catch (err) {
    console.error("Failed to fetch community posts for sitemap", err);
  }

  return [...coreEntries, ...calcEntries, ...toolEntries, ...communityEntries];
}
