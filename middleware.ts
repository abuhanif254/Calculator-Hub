import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// ─── Calculator slug redirect map ─────────────────────────────────────────────
// Auto-generated from i18n/routing.ts. Maps every wrong-path variant of a
// calculator URL to its correct canonical locale URL.
// To regenerate: node scripts/generateRedirectMap.js
import { CALC_REDIRECT_MAP } from './lib/calcRedirectMap';

// ─── Guide slug redirect map ──────────────────────────────────────────────────
import { GUIDE_REDIRECT_MAP } from './lib/guideRedirectMap';

const intlMiddleware = createMiddleware(routing);

// ── Constants ──────────────────────────────────────────────────────────────────

// Garbage paths injected by PDF metadata scrapers, bot probes, and malformed crawls
const GARBAGE_PATHS = new Set([
  '/Author', '/Producer', '/Kids', '/P', '/XObject', '/28', '/Contents',
  '/page', '/$', '/&', '/egneodunq', '/admin', '/admin/', '/wp-admin', '/wp-admin/',
  '/images/*', '/new-path/:slug', '/old-path/:slug', '/4', '/4/', '/Metadata',
]);

// Legacy or misspelled tool URLs → canonical tool path
const LEGACY_TOOL_REDIRECTS: Record<string, string> = {
  '/en/tools/url-encoder-decoder': '/en/tools/url-encoder',
  '/de/tools/url-encoder-decoder': '/de/werkzeuge/url-encoder',
  '/es/tools/url-encoder-decoder': '/es/herramientas/url-encoder',
  '/fr/tools/url-encoder-decoder': '/fr/outils/url-encoder',
  '/de/werkzeuge/url-encoder-decoder': '/de/werkzeuge/url-encoder',
  '/es/herramientas/url-encoder-decoder': '/es/herramientas/url-encoder',
  '/fr/outils/url-encoder-decoder': '/fr/outils/url-encoder',
  '/tools/url-encoder-decoder': '/en/tools/url-encoder',
  '/de/werkzeuge/next.js-discussions': '/de/werkzeuge',
  '/en/tools/next.js-discussions': '/en/tools',
  '/de/werkzeuge/sitemap.xml-generator': '/de/werkzeuge/sitemap-xml-generator',
  '/en/tools/sitemap.xml-generator': '/en/tools/sitemap-xml-generator',
};

// Truly deprecated or renamed calculators → canonical destination
// Note: active calculators (molarity, tip, pace) must not be listed here.
const DEPRECATED_CALC_REDIRECTS: Record<string, string> = {
  'refinance-calculator': '/en/calculators/mortgage-calculator',
  'number-sequence-calculator': '/en/calculators/category/math',
  'body-type-calculator': '/en/calculators/body-fat-calculator',
  'electricity-calculator': '/en/calculators/electricity-cost-calculator',
  'time-card-calculator': '/en/calculators/hours-calculator',
  'hex-calculator': '/en/calculators/binary-calculator',
  'bandwidth-calculator': '/en/calculators/category/other',
  'circle-calculator': '/en/calculators/category/math',
  'mass-calculator': '/en/calculators/category/math',
  'gdp-calculator': '/en/calculators/category/financial',
  'mean-median-mode-range-calculator': '/en/calculators/statistics-calculator',
  'permutation-and-combination-calculator': '/en/calculators/category/math',
  'calories-burned-calculator': '/en/calculators/calorie-calculator',
  'day-counter': '/en/calculators/date-calculator',
  'pregnancy-weight-gain-calculator': '/en/calculators/pregnancy-calculator',
  'lean-body-mass-calculator': '/en/calculators/body-fat-calculator',
  'pythagorean-theorem-calculator': '/en/calculators/category/math',
  'time-zone-calculator': '/en/calculators/time-calculator',
  'savings-calculator': '/en/calculators/investment-calculator',
  'mutual-fund-calculator': '/en/calculators/investment-calculator',
};

// Cross-locale community path aliases (e.g. /fr/community → /fr/communaute)
const LOCALE_COMMUNITY_ALIAS: Record<string, string> = {
  '/de/community': '/de/gemeinschaft',
  '/fr/community': '/fr/communaute',
  '/es/community': '/es/comunidad',
};

// Cross-locale tool path prefixes — when a non-EN locale uses /tools/ prefix
// instead of its localized prefix (werkzeuge / outils / herramientas).
// next-intl handles these internally but we intercept first for a clean 301.
const LOCALE_TOOL_PREFIX: Record<string, string> = {
  de: 'werkzeuge',
  fr: 'outils',
  es: 'herramientas',
};

// Cross-locale calculator path prefixes — when a non-EN locale uses /calculators/ prefix
// instead of its localized prefix (rechner / calculatrices / calculadoras).
// Intercepted as fallback for any dynamic calculator not explicitly in CALC_REDIRECT_MAP.
const LOCALE_CALC_PREFIX: Record<string, string> = {
  de: 'rechner',
  fr: 'calculatrices',
  es: 'calculadoras',
};

// Cross-locale guides path prefixes — when a locale uses /guides/ instead of
// its localized prefix (anleitungen / guias; fr uses /guides/ same as en).
const LOCALE_GUIDES_PREFIX: Record<string, string> = {
  de: 'anleitungen',
  es: 'guias',
};

// Localized paths for static pages — avoids next-intl doing an extra internal
// redirect when a non-EN locale requests the English-slug path.
const LOCALE_STATIC_REDIRECTS: Record<string, string> = {
  // terms-of-use
  '/es/terms-of-use': '/es/terminos-de-uso',
  '/fr/terms-of-use': '/fr/conditions-d-utilisation',
  '/de/terms-of-use': '/de/nutzungsbedingungen',
  // privacy-policy
  '/es/privacy-policy': '/es/politica-de-privacidad',
  '/fr/privacy-policy': '/fr/politique-de-confidentialite',
  '/de/privacy-policy': '/de/datenschutzrichtlinie',
  // about-us
  '/es/about-us': '/es/sobre-nosotros',
  '/fr/about-us': '/fr/a-propos',
  '/de/about-us': '/de/uber-uns',
  // contact-us
  '/es/contact-us': '/es/contactenos',
  '/fr/contact-us': '/fr/nous-contacter',
  '/de/contact-us': '/de/kontaktiere-uns',
  // disclaimer
  '/es/disclaimer': '/es/descargo-de-responsabilidad',
  '/fr/disclaimer': '/fr/clause-de-non-responsabilite',
  '/de/disclaimer': '/de/haftungsausschluss',
  // sitemap
  '/es/sitemap': '/es/mapa-del-sitio',
  '/fr/sitemap': '/fr/plan-du-site',
  // image hub cross-locale redirects
  '/es/image': '/es/imagen',
  '/de/image': '/de/bild',
  // calculators hub cross-locale redirects
  '/es/calculators': '/es/calculadoras',
  '/fr/calculators': '/fr/calculatrices',
  '/de/calculators': '/de/rechner',
  // tools hub cross-locale redirects
  '/es/tools': '/es/herramientas',
  '/fr/tools': '/fr/outils',
  '/de/tools': '/de/werkzeuge',
  // guides hub cross-locale redirects
  '/es/guides': '/es/guias',
  '/de/guides': '/de/anleitungen',
};

// Helper to resolve canonical pathname for any incoming request
function getCanonicalPath(pathname: string): string | null {
  // 0. Explicit root redirect to /en
  if (pathname === '/') {
    return '/en';
  }

  // 0b. Strip trailing slash on non-root paths (e.g. /en/ → /en, /es/ → /es, /tools/foo/ → /en/tools/foo)
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const unslashed = pathname.replace(/\/+$/, '');
    return getCanonicalPath(unslashed) || unslashed;
  }

  // 1. Calculator slug mismatch redirects (O(1) lookup, highest priority)
  const redirectTarget = CALC_REDIRECT_MAP[pathname];
  if (redirectTarget) return redirectTarget;

  // 1a. Guide slug redirect map (O(1) lookup)
  const guideRedirectTarget = GUIDE_REDIRECT_MAP[pathname];
  if (guideRedirectTarget) return guideRedirectTarget;

  // 1b. Legacy or misspelled tool URLs (O(1) lookup)
  const legacyToolTarget = LEGACY_TOOL_REDIRECTS[pathname];
  if (legacyToolTarget) return legacyToolTarget;

  // 1c. Truly deprecated or merged calculator redirects
  const deprecatedMatch = pathname.match(/^\/(?:(en|es|fr|de)\/)?(?:calculators|calculadoras|calculatrices|rechner)\/([a-zA-Z0-9_-]+)$/);
  if (deprecatedMatch) {
    const slug = deprecatedMatch[2];
    const deprecatedTarget = DEPRECATED_CALC_REDIRECTS[slug];
    if (deprecatedTarget) return deprecatedTarget;
  }

  // 2. Garbage / PDF-metadata-scraped paths → canonical homepage
  if (GARBAGE_PATHS.has(pathname) || /^\/\d+\/?$/.test(pathname)) {
    return '/en';
  }

  // 3. WordPress / admin probe paths → canonical homepage
  if (
    pathname === '/wp-admin/' || pathname === '/wp-admin' ||
    pathname === '/admin/' || pathname === '/admin'
  ) {
    return '/en';
  }

  // 4. Cross-locale community aliases (/de/community/* → /de/gemeinschaft/*, etc.)
  const communityMatch = pathname.match(/^\/(de|fr|es)\/community(\/.*)?$/);
  if (communityMatch) {
    const [, loc, rest = ''] = communityMatch;
    const targetMap: Record<string, string> = {
      de: '/de/gemeinschaft',
      fr: '/fr/communaute',
      es: '/es/comunidad',
    };
    return `${targetMap[loc]}${rest}`;
  }

  // 5. Old community post format → community index
  if (/^\/(?:en|es|fr|de)?\/?(?:community|comunidad|communaute|gemeinschaft)\/to-use-a-/.test(pathname) || pathname === '/community/to-use-a-bmi-calculator-93') {
    const localeMatch = pathname.match(/^\/(en|es|fr|de)\//);
    const locale = localeMatch ? localeMatch[1] : 'en';
    return `/${locale}/community`;
  }

  // 6. Cross-locale /[locale]/calculators/[slug] → localized prefix
  const calculatorsMismatch = pathname.match(/^\/(de|fr|es)\/calculators\/(.+)$/);
  if (calculatorsMismatch) {
    const [, locale, slug] = calculatorsMismatch;
    const prefix = LOCALE_CALC_PREFIX[locale];
    return `/${locale}/${prefix}/${slug}`;
  }

  // 7. Cross-locale /[locale]/tools/[slug] → localized prefix
  const toolsMismatch = pathname.match(/^\/(de|fr|es)\/tools\/(.+)$/);
  if (toolsMismatch) {
    const [, locale, slug] = toolsMismatch;
    const prefix = LOCALE_TOOL_PREFIX[locale];
    return `/${locale}/${prefix}/${slug}`;
  }

  // 8. Cross-locale /[locale]/guides/[slug] → localized prefix
  const guidesMismatch = pathname.match(/^\/(de|es)\/guides\/(.+)$/);
  if (guidesMismatch) {
    const [, locale, slug] = guidesMismatch;
    const prefix = LOCALE_GUIDES_PREFIX[locale];
    return `/${locale}/${prefix}/${slug}`;
  }

  // 9. Cross-locale static page redirects
  const staticRedirect = LOCALE_STATIC_REDIRECTS[pathname];
  if (staticRedirect) {
    return staticRedirect;
  }

  // 10. Bare paths without locale prefix → /en/...
  if (
    pathname.startsWith('/embed/') ||
    pathname.startsWith('/calculators/') ||
    pathname === '/calculators' ||
    pathname.startsWith('/tools/') ||
    pathname === '/tools' ||
    pathname === '/pdf' ||
    pathname.startsWith('/pdf/') ||
    pathname === '/image' ||
    pathname.startsWith('/image/') ||
    pathname.startsWith('/guides/') ||
    pathname === '/guides' ||
    pathname.startsWith('/community') ||
    pathname.startsWith('/collections/') ||
    pathname.startsWith('/compare/') ||
    pathname.startsWith('/database-privacy') ||
    pathname === '/about-us' ||
    pathname === '/privacy-policy' ||
    pathname === '/terms-of-use' ||
    pathname === '/disclaimer' ||
    pathname === '/sitemap' ||
    pathname === '/login' ||
    pathname === '/signup'
  ) {
    return `/en${pathname}`;
  }

  return null;
}

// ── Main middleware ────────────────────────────────────────────────────────────

export default function middleware(request: NextRequest) {
  const { pathname, hostname, search } = request.nextUrl;

  const isNonWww = hostname === 'nexuscalculator.net';
  const canonicalPath = getCanonicalPath(pathname);
  const hasTracking = Boolean(search && /[?&](ref|utm_source|utm_medium|utm_campaign|utm_content|utm_term)=/.test(search));

  // Atomic 1-Hop 301 Canonical Redirect:
  // Unifies non-www domain normalization, path canonicalization, and UTM stripping into exactly 1 HTTP 301 response.
  // Completely eliminates multi-hop redirect chains to maximize SEO crawl budget and PageRank equity.
  if (isNonWww || canonicalPath !== null || hasTracking) {
    const url = request.nextUrl.clone();
    if (isNonWww) {
      url.hostname = 'www.nexuscalculator.net';
    }
    if (canonicalPath !== null) {
      url.pathname = canonicalPath;
    }
    if (hasTracking) {
      const trackingParams = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
      trackingParams.forEach(param => url.searchParams.delete(param));
    }
    return NextResponse.redirect(url, { status: 301 });
  }

  // Hand off all other routing to next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};