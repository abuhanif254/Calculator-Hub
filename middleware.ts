import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// ─── Calculator slug redirect map ─────────────────────────────────────────────
// Auto-generated from i18n/routing.ts. Maps every wrong-path variant of a
// calculator URL to its correct canonical locale URL.
// To regenerate: node scripts/generateRedirectMap.js
import { CALC_REDIRECT_MAP } from './lib/calcRedirectMap';

const intlMiddleware = createMiddleware(routing);

// ── Constants ──────────────────────────────────────────────────────────────────

// Garbage paths injected by PDF metadata scrapers, bot probes, and malformed crawls
const GARBAGE_PATHS = new Set([
  '/Author', '/Producer', '/Kids', '/P', '/XObject', '/28', '/Contents',
  '/page', '/$', '/&', '/egneodunq', '/admin', '/admin/', '/wp-admin', '/wp-admin/',
  '/images/*', '/new-path/:slug', '/old-path/:slug', '/4', '/4/',
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

// Deprecated or renamed calculators → canonical destination
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
  'gdp-calculator': '/en/calculators/category/finance',
  'mean-median-mode-range-calculator': '/en/calculators/statistics-calculator',
  'permutation-and-combination-calculator': '/en/calculators/permutation-calculator',
  'calories-burned-calculator': '/en/calculators/calorie-calculator',
  'molarity-calculator': '/en/calculators/category/chemistry',
  'day-counter': '/en/calculators/date-calculator',
  'pregnancy-weight-gain-calculator': '/en/calculators/pregnancy-calculator',
  'lean-body-mass-calculator': '/en/calculators/body-fat-calculator',
  'pythagorean-theorem-calculator': '/en/calculators/category/math',
  'time-zone-calculator': '/en/calculators/time-calculator',
  'savings-calculator': '/en/calculators/investment-calculator',
  'tip-calculator': '/en/calculators/category/finance',
  'pace-calculator': '/en/calculators/category/fitness',
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

// ── Main middleware ────────────────────────────────────────────────────────────

export default function middleware(request: NextRequest) {
  const { pathname, hostname, search } = request.nextUrl;

  // ── 0. Non-www → www canonical redirect ───────────────────────────────────
  if (hostname === 'nexuscalculator.net') {
    const url = request.nextUrl.clone();
    url.hostname = 'www.nexuscalculator.net';
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 1. Calculator slug mismatch redirects (O(1) lookup, highest priority) ──
  // Must run before next-intl so Google gets a clean 301 without a redirect chain.
  const redirectTarget = CALC_REDIRECT_MAP[pathname];
  if (redirectTarget) {
    const url = request.nextUrl.clone();
    url.pathname = redirectTarget;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 1b. Legacy or misspelled tool URLs (O(1) lookup) ───────────────────────
  const legacyToolTarget = LEGACY_TOOL_REDIRECTS[pathname];
  if (legacyToolTarget) {
    const url = request.nextUrl.clone();
    url.pathname = legacyToolTarget;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 1c. Deprecated or merged calculator redirects ──────────────────────────
  const deprecatedMatch = pathname.match(/^\/(?:(en|es|fr|de)\/)?(?:calculators|calculadoras|calculatrices|rechner)\/([a-zA-Z0-9_-]+)$/);
  if (deprecatedMatch) {
    const [, , slug] = deprecatedMatch;
    const deprecatedTarget = DEPRECATED_CALC_REDIRECTS[slug];
    if (deprecatedTarget) {
      const url = request.nextUrl.clone();
      url.pathname = deprecatedTarget;
      return NextResponse.redirect(url, { status: 301 });
    }
  }

  // ── 2. Tracking / UTM / referral query params → canonical (strip params) ───
  // Prevents /?ref=producthunt, /?utm_source=... from polluting GSC.
  if (search && /[?&](ref|utm_source|utm_medium|utm_campaign|utm_content|utm_term)=/.test(search)) {
    const url = request.nextUrl.clone();
    const trackingParams = ['ref', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
    trackingParams.forEach(param => url.searchParams.delete(param));
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 3. Garbage / PDF-metadata-scraped paths → homepage ─────────────────────
  if (GARBAGE_PATHS.has(pathname) || /^\/\d+\/?$/.test(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 4. WordPress / admin probe paths → homepage ────────────────────────────
  if (
    pathname === '/wp-admin/' || pathname === '/wp-admin' ||
    pathname === '/admin/' || pathname === '/admin'
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 5. Cross-locale community aliases (/fr/community → /fr/communaute) ─────
  const communityAlias = LOCALE_COMMUNITY_ALIAS[pathname];
  if (communityAlias) {
    const url = request.nextUrl.clone();
    url.pathname = communityAlias;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 5b. Old community post format → community index ────────────────────────
  if (/^\/(?:en|es|fr|de)?\/?(?:community|comunidad|communaute|gemeinschaft)\/to-use-a-/.test(pathname) || pathname === '/community/to-use-a-bmi-calculator-93') {
    const localeMatch = pathname.match(/^\/(en|es|fr|de)\//);
    const locale = localeMatch ? localeMatch[1] : 'en';
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/community`;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 6b. Cross-locale /[locale]/calculators/[slug] → localized prefix ────────
  // Fallback for any dynamic calculator path not explicitly in CALC_REDIRECT_MAP.
  // e.g. /de/calculators/my-calc → /de/rechner/my-calc
  const calculatorsMismatch = pathname.match(/^\/(de|fr|es)\/calculators\/(.+)$/);
  if (calculatorsMismatch) {
    const [, locale, slug] = calculatorsMismatch;
    const prefix = LOCALE_CALC_PREFIX[locale];
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/${prefix}/${slug}`;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 7. Cross-locale /[locale]/tools/[slug] → localized prefix ──────────────
  // e.g. /de/tools/html-formatter → /de/werkzeuge/html-formatter
  // next-intl handles this but we intercept for a direct 301 (no extra hop).
  const toolsMismatch = pathname.match(/^\/(de|fr|es)\/tools\/(.+)$/);
  if (toolsMismatch) {
    const [, locale, slug] = toolsMismatch;
    const prefix = LOCALE_TOOL_PREFIX[locale];
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/${prefix}/${slug}`;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 8. Cross-locale /[locale]/guides/[slug] → localized prefix ─────────────
  // e.g. /de/guides/ideal-weight-guide → /de/anleitungen/ideal-weight-guide
  // (French uses /guides/ same as EN, so only de and es need this.)
  const guidesMismatch = pathname.match(/^\/(de|es)\/guides\/(.+)$/);
  if (guidesMismatch) {
    const [, locale, slug] = guidesMismatch;
    const prefix = LOCALE_GUIDES_PREFIX[locale];
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/${prefix}/${slug}`;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 9. Cross-locale static page redirects ──────────────────────────────────
  // e.g. /fr/terms-of-use → /fr/conditions-d-utilisation
  const staticRedirect = LOCALE_STATIC_REDIRECTS[pathname];
  if (staticRedirect) {
    const url = request.nextUrl.clone();
    url.pathname = staticRedirect;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 10. Bare paths without locale prefix → /en/... ─────────────────────────
  // next-intl would double-hop these; we short-circuit with an explicit 301.
  if (
    pathname.startsWith('/calculators/') ||
    pathname === '/calculators' ||
    pathname.startsWith('/tools/') ||
    pathname === '/tools' ||
    pathname === '/pdf' ||
    pathname === '/image' ||
    pathname.startsWith('/guides/') ||
    pathname.startsWith('/community') ||
    pathname.startsWith('/collections/') ||
    pathname.startsWith('/compare/') ||
    pathname.startsWith('/database-privacy/') ||
    pathname === '/about-us' ||
    pathname === '/privacy-policy' ||
    pathname === '/terms-of-use' ||
    pathname === '/disclaimer' ||
    pathname === '/sitemap' ||
    pathname === '/login' ||
    pathname === '/signup'
  ) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 12. /en/ trailing slash → /en (Next.js should handle but belt+braces) ──
  if (pathname === '/en/') {
    const url = request.nextUrl.clone();
    url.pathname = '/en';
    return NextResponse.redirect(url, { status: 301 });
  }

  // ── 14. Hand off all other routing to next-intl ────────────────────────────
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};