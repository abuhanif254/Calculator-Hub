import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { calculators } from '../lib/data/calculators';
import { categories } from '../lib/data/categories';
import { collections } from '../lib/data/collections';
import { comparisons } from '../lib/data/comparisons';
import { routing } from '../i18n/routing';
import { allToolsConfig } from '../lib/data/tools/index';
import { allGuides, getGuideBySlug } from '../lib/data/guides';
import { COMMUNITY_CATEGORIES } from '../lib/categories';

// SSG: sitemap is built from static TypeScript data files.
// No revalidation needed — only changes on new deployments.
// revalidate=false serves from CDN edge permanently, saving Vercel ISR quota.
export const revalidate = false;

// Architectural & SSR SEO Overhaul Baseline (Phase 1A/1B + Phase 2 Localized Matrices & Formulas)
// Ensures Googlebot sees that all canonical/hreflang/content-upgraded pages are newer than previous crawls.
const OVERHAUL_BASELINE_MS = new Date('2026-11-25T04:00:00.000Z').getTime();

function resolveLatestContentMtime(relativePaths: string[], explicitDate?: string | Date): Date {
  let maxMs = OVERHAUL_BASELINE_MS;
  if (explicitDate) {
    const parsed = new Date(explicitDate).getTime();
    if (!Number.isNaN(parsed) && parsed > maxMs) {
      maxMs = parsed;
    }
  }
  const cwd = process.cwd();
  for (const rel of relativePaths) {
    try {
      const fullPath = path.join(cwd, rel);
      if (fs.existsSync(fullPath)) {
        const stat = fs.statSync(fullPath);
        if (stat.mtimeMs > maxMs) {
          maxMs = stat.mtimeMs;
        }
      }
    } catch {
      // Ignore fs stat errors
    }
  }
  return new Date(maxMs);
}

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

function buildEntries(
  pathnameKey: string,
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
  priority: number,
  genericSlug?: string,
  lastMod?: Date,
  images?: string[]
): MetadataRoute.Sitemap {
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
      if (pathnameKey.startsWith('/calculators/')) {
        const prefix = locale === 'es' ? '/calculadoras/' : locale === 'fr' ? '/calculatrices/' : locale === 'de' ? '/rechner/' : '/calculators/';
        relativePath = `/${locale}${prefix}[slug]`;
      } else if (pathnameKey.startsWith('/tools/')) {
        const prefix = locale === 'es' ? '/herramientas/' : locale === 'fr' ? '/outils/' : locale === 'de' ? '/werkzeuge/' : '/tools/';
        relativePath = `/${locale}${prefix}[slug]`;
      } else {
        relativePath = `/${locale}${pathnameKey}`;
      }
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

  return routing.locales.map((locale) => ({
    url: languages[locale] || `${baseUrl}/${locale}${defaultPath}`,
    ...(lastMod ? { lastModified: lastMod } : {}),
    changeFrequency,
    priority,
    alternates: { languages },
    ...(images && images.length > 0 ? { images } : {}),
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baselineMod = new Date(OVERHAUL_BASELINE_MS);

  // ─── STATIC & CORE PAGES ──────────────
  const coreEntries: MetadataRoute.Sitemap = [
    ...buildEntries('/', 'daily', 1.0, undefined, baselineMod, [`${baseUrl}/icons/icon-512x512.png`]),
    ...buildEntries('/sitemap', 'weekly', 0.8, undefined, baselineMod),
    ...buildEntries('/community', 'daily', 0.7, undefined, baselineMod),
    ...COMMUNITY_CATEGORIES.flatMap((cat) => buildEntries('/community/category/[slug]', 'weekly', 0.7, cat.slug, baselineMod)),
    // REMOVED from sitemap.xml (still index,follow in Footer for AdSense compliance):
    // /disclaimer, /privacy-policy, /terms-of-use, /community/hall-of-fame
    // Keeping sitemap.xml focused exclusively on core calculators, tools, guides, hubs, comparisons & collections.
    ...buildEntries('/about-us', 'monthly', 0.5, undefined, resolveLatestContentMtime(['app/[locale]/about-us/page.tsx'])),
    ...buildEntries('/editorial-policy', 'monthly', 0.5, undefined, resolveLatestContentMtime(['app/[locale]/editorial-policy/page.tsx'])),
    ...buildEntries('/contact-us', 'monthly', 0.5, undefined, baselineMod),
    ...buildEntries('/guides', 'weekly', 0.85, undefined, baselineMod),
    ...buildEntries('/calculators', 'weekly', 0.95, undefined, baselineMod),
    ...buildEntries('/tools', 'weekly', 0.9, undefined, baselineMod),
    ...buildEntries('/collections', 'weekly', 0.85, undefined, baselineMod),
    ...buildEntries('/compare', 'weekly', 0.85, undefined, baselineMod),
    ...buildEntries('/pdf', 'weekly', 0.9, undefined, baselineMod),
    ...buildEntries('/image', 'weekly', 0.9, undefined, baselineMod),
    ...allGuides.flatMap((guide) => {
      const guidePaths = ['en', 'es', 'fr', 'de'].flatMap((loc) => {
        const lSlug = guide.slugs?.[loc as keyof typeof guide.slugs];
        return lSlug && lSlug !== guide.slug
          ? [`content/${loc}/guides/${guide.slug}.md`, `content/${loc}/guides/${lSlug}.md`]
          : [`content/${loc}/guides/${guide.slug}.md`];
      });
      const guideMod = resolveLatestContentMtime(guidePaths, guide.lastUpdated);
      return buildEntries('/guides/[slug]', 'monthly', 0.8, guide.slug, guideMod);
    }),
    ...categories.filter((cat) => calculators.some((calc) => cat.dbCategory.includes(calc.category))).flatMap((cat) => buildEntries('/calculators/category/[category]', 'weekly', 0.9, cat.id, baselineMod)),
    ...collections.flatMap((collection) => buildEntries('/collections/[slug]', 'weekly', 0.8, collection.slug, baselineMod)),
    ...comparisons.flatMap((comparison) => buildEntries('/compare/[slug]', 'monthly', 0.8, comparison.slug, baselineMod)),
  ];

  // ─── CALCULATOR PAGES ─────────────
  const allCalcSlugs: { slug: string; priority: number; lastUpdated?: string; slugs?: Record<string, string | undefined> }[] = [];
  const processedSlugs = new Set<string>();

  calculators.forEach((calc) => {
    if (!processedSlugs.has(calc.slug)) {
      allCalcSlugs.push({
        slug: calc.slug,
        priority: 0.9,
        lastUpdated: calc.meta.lastUpdated,
        slugs: calc.slugs as Record<string, string | undefined> | undefined,
      });
      processedSlugs.add(calc.slug);
    }
  });

  allCalcSlugs.sort((a, b) => a.slug.localeCompare(b.slug));

  const calcEntries = allCalcSlugs.flatMap(({ slug, priority, lastUpdated, slugs }) => {
    const mdCandidates = ['en', 'es', 'fr', 'de'].flatMap((loc) => {
      const lSlug = slugs?.[loc];
      return lSlug && lSlug !== slug
        ? [`content/${loc}/${slug}.md`, `content/${loc}/${lSlug}.md`]
        : [`content/${loc}/${slug}.md`];
    });
    const lastMod = resolveLatestContentMtime(mdCandidates, lastUpdated);
    const routeKey = `/calculators/${slug}`;
    const existsInRouting = (routing.pathnames as any)[routeKey];

    if (existsInRouting) {
      return buildEntries(routeKey, 'weekly', priority, undefined, lastMod);
    }
    return buildEntries('/calculators/[slug]', 'weekly', priority, slug, lastMod);
  });

  // ─── DEVELOPER TOOLS ──────────────────
  const processedTools = new Set<string>();

  const toolEntries = developerToolSlugs
    .filter((slug) => {
      if (processedTools.has(slug)) return false;
      processedTools.add(slug);
      return true;
    })
    .sort()
    .flatMap((slug) => {
      const toolMdCandidates = ['en', 'es', 'fr', 'de'].map((loc) => `content/tools/${loc}/${slug}.md`);
      const toolLastMod = resolveLatestContentMtime(toolMdCandidates);
      return buildEntries('/tools/[slug]', 'weekly', 0.8, slug, toolLastMod);
    });

  // ─── COMMUNITY POSTS (Filtered for Indexability, Word Count >= 100 & Redirect Hygiene) ──────────────────
  let communityEntries: MetadataRoute.Sitemap = [];
  try {
    const { fetchPostsRest } = await import('../lib/firebase-rest');
    // Pass forceStatic=true so fetch() uses cache:'force-cache' instead of revalidate:86400,
    // preserving export const revalidate = false on /sitemap.xml to avoid daily 1.5MB ISR churn.
    const posts = await fetchPostsRest(undefined, 100, true);
    const indexablePosts = posts.filter((post) => {
      if (!post.slug) return false;
      // Exclude redirected test/auto-generated slugs that 308 redirect in next.config.ts / page.tsx
      if (post.slug === 'hello-cca921ec' || post.slug.startsWith('to-use-a-')) return false;
      const plainText = (post.content || '').replace(/<[^>]+>/g, ' ').trim();
      const wordCount = plainText.split(/\s+/).filter(Boolean).length;
      return wordCount >= 100;
    });
    communityEntries = indexablePosts.flatMap(post =>
      buildEntries(
        '/community/[slug]',
        'weekly',
        0.7,
        post.slug,
        new Date(post.createdAt || Date.now())
      )
    );
  } catch (err) {
    console.error("Failed to fetch community posts for sitemap", err);
  }

  return [...coreEntries, ...calcEntries, ...toolEntries, ...communityEntries];
}

