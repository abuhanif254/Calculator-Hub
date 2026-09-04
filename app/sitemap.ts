import { MetadataRoute } from 'next';
import { calculators } from '../lib/data/calculators';
import { categories } from '../lib/data/categories';
import { collections } from '../lib/data/collections';
import { comparisons } from '../lib/data/comparisons';
import { routing } from '../i18n/routing';
import { allToolsConfig } from '../lib/data/tools/index';
import { allGuides, getGuideBySlug } from '../lib/data/guides';

// SSG: sitemap is built from static TypeScript data files.
// No revalidation needed — only changes on new deployments.
// revalidate=false serves from CDN edge permanently, saving Vercel ISR quota.
export const revalidate = false;

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
// IMPORTANT: Must use www.nexuscalculator.net — Vercel redirects non-www → www.
// A non-www baseUrl causes ALL sitemap entries to show as "Page with redirect" in GSC.
const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net').replace(/\/$/, '').replace('://nexuscalculator.net', '://www.nexuscalculator.net');

function buildEntry(
  pathnameKey: string,
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
  priority: number,
  genericSlug?: string,
  lastMod?: Date,
  images?: string[]
): MetadataRoute.Sitemap[number] {
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
      let localizedSlug = genericSlug;
      if (pathnameKey.startsWith('/calculators/')) {
        const calc = calculators.find(c => c.slug === genericSlug || (c.slugs && Object.values(c.slugs).includes(genericSlug)));
        if (calc && calc.slugs && calc.slugs[locale as keyof typeof calc.slugs]) {
          localizedSlug = calc.slugs[locale as keyof typeof calc.slugs];
        }
      } else if (pathnameKey.startsWith('/guides/')) {
        const guide = getGuideBySlug(genericSlug);
        if (guide && guide.slugs && guide.slugs[locale as keyof typeof guide.slugs]) {
          localizedSlug = guide.slugs[locale as keyof typeof guide.slugs];
        }
      }

      relativePath = relativePath
        .replace('[slug]', localizedSlug)
        .replace('[category]', genericSlug);
    }

    languages[locale] = `${baseUrl}${relativePath}`;
  });

  let defaultSlug = genericSlug || '';
  if (genericSlug) {
    if (pathnameKey.startsWith('/calculators/')) {
      const calc = calculators.find(c => c.slug === genericSlug || (c.slugs && Object.values(c.slugs).includes(genericSlug)));
      if (calc?.slugs?.en) defaultSlug = calc.slugs.en;
      else if (calc?.slug) defaultSlug = calc.slug;
    } else if (pathnameKey.startsWith('/guides/')) {
      const guide = getGuideBySlug(genericSlug);
      if (guide?.slugs?.en) defaultSlug = guide.slugs.en;
      else if (guide?.slug) defaultSlug = guide.slug;
    }
  }

  const defaultPath = pathnameKey
    .replace('[slug]', defaultSlug)
    .replace('[category]', genericSlug || '');

  languages['x-default'] = languages['en'] || `${baseUrl}/en${defaultPath}`;

  return {
    url: languages['en'] || `${baseUrl}/en${defaultPath}`,
    ...(lastMod ? { lastModified: lastMod } : {}),
    changeFrequency,
    priority,
    alternates: { languages },
    ...(images && images.length > 0 ? { images } : {}),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ─── STATIC & CORE PAGES ──────────────
  const coreEntries = [
    buildEntry('/', 'daily', 1.0, undefined, undefined, [`${baseUrl}/icons/icon-512x512.png`]),
    buildEntry('/sitemap', 'weekly', 0.8),
    buildEntry('/community', 'daily', 0.7),
    // REMOVED: /community/new — requires login, redirects unauthenticated crawlers → GSC "Page with redirect"
    // REMOVED: /login, /signup — auth pages always redirect, waste crawl budget
    buildEntry('/about-us', 'monthly', 0.5),
    buildEntry('/privacy-policy', 'yearly', 0.3),
    buildEntry('/terms-of-use', 'yearly', 0.3),
    buildEntry('/guides', 'weekly', 0.85),
    ...allGuides.map((guide) => buildEntry('/guides/[slug]', 'monthly', 0.8, guide.slug, new Date(guide.lastUpdated))),
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
    const ogImageUrl = `${baseUrl}/en/calculators/${slug}/opengraph-image`;

    if (existsInRouting) {
      return buildEntry(routeKey, 'weekly', priority, undefined, lastMod, [ogImageUrl]);
    }
    return buildEntry('/calculators/[slug]', 'weekly', priority, slug, lastMod, [ogImageUrl]);
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
    .map((slug) => {
      const ogImageUrl = `${baseUrl}/en/tools/${slug}/opengraph-image`;
      return buildEntry('/tools/[slug]', 'weekly', 0.8, slug, toolsLastMod, [ogImageUrl]);
    });

  // ─── DATA PRIVACY PLATFORM — PUBLIC LANDING ONLY ─────────────────
  // Authenticated sub-routes (/dashboard, /scanner, /jobs, etc.) are intentionally
  // excluded — they require login and return 401/302 to crawlers, wasting crawl budget.
  const dpLastMod = new Date('2026-08-08');
  const dataPrivacyEntries: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}/database-privacy`,
    lastModified: dpLastMod,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
    alternates: {
      languages: Object.fromEntries([
        ...routing.locales.map((l) => [l, `${baseUrl}/${l}/database-privacy`]),
        ['x-default', `${baseUrl}/en/database-privacy`],
      ]),
    },
    images: [`${baseUrl}/og-database-privacy.jpg`],
  }));


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

  return [...coreEntries, ...calcEntries, ...toolEntries, ...dataPrivacyEntries, ...communityEntries];
}
