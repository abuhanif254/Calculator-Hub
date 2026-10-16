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

// ─── Legacy localized calculator & tool alias redirect map (1,810 entries) ────
import { LEGACY_CALC_ALIAS_REDIRECTS } from './lib/legacyCalcAliasRedirects';

const intlMiddleware = createMiddleware(routing);

// ── Constants ──────────────────────────────────────────────────────────────────

// Garbage paths injected by PDF metadata scrapers, bot probes, and malformed crawls
const GARBAGE_PATHS = new Set([
  '/Author', '/Producer', '/Kids', '/P', '/XObject', '/28', '/Contents',
  '/page', '/$', '/&', '/egneodunq', '/admin', '/admin/', '/wp-admin', '/wp-admin/',
  '/images/*', '/new-path/:slug', '/old-path/:slug', '/4', '/4/', '/Metadata',
  '/*.xls$', '/*.xls', '/.xls$', '/.xls'
]);

// Legacy or misspelled tool slugs → canonical tool slug
const LEGACY_TOOL_SLUG_MAP: Record<string, string> = {
  'url-encoder-decoder': 'url-encoder',
  'image-resizer': 'resize-image',
  'webp-converter': 'convert-to-webp',
  'jpg-to-png': 'convert-to-png',
  'png-to-webp': 'convert-to-webp',
  'sitemap-generator': 'sitemap-xml-generator',
  'sitemap.xml-generator': 'sitemap-xml-generator',
  'robots.txt-generator': 'robots-txt-generator',
  '.htaccess-generator': 'htaccess-generator',
  'html-minifier': 'html-formatter',
  'json-validator': 'json-formatter',
};

// Calculators that were historically linked under /tools/ → canonical localized calculator path
const TOOL_TO_CALC_REDIRECTS: Record<string, Record<string, string>> = {
  'mortgage-calculator-uk': {
    en: '/en/calculators/mortgage-calculator-uk',
    es: '/es/calculadoras/calculadora-hipoteca-reino-unido',
    fr: '/fr/calculatrices/calculateur-hypotheque-royaume-uni',
    de: '/de/rechner/hypothekenrechner-uk',
  },
  'stamp-duty-calculator': {
    en: '/en/calculators/stamp-duty-calculator',
    es: '/es/calculadoras/calculadora-impuesto-timbre',
    fr: '/fr/calculatrices/calculateur-droits-mutation',
    de: '/de/rechner/grunderwerbsteuer-rechner-uk',
  },
  'overpayment-calculator': {
    en: '/en/calculators/overpayment-calculator',
    es: '/es/calculadoras/calculadora-amortizacion-anticipada',
    fr: '/fr/calculatrices/calculateur-remboursement-anticipe',
    de: '/de/rechner/sondertilgungsrechner',
  },
  'remortgage-calculator': {
    en: '/en/calculators/remortgage-calculator',
    es: '/es/calculadoras/calculadora-rehipoteca',
    fr: '/fr/calculatrices/calculateur-rachat-credit-immobilier',
    de: '/de/rechner/umschuldungsrechner-hypothek',
  },
  'buy-to-let-calculator': {
    en: '/en/calculators/buy-to-let-calculator',
    es: '/es/calculadoras/calculadora-hipoteca-alquiler',
    fr: '/fr/calculatrices/calculateur-investissement-locatif',
    de: '/de/rechner/kapitalanlage-immobilien-rechner',
  },
};

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
  '/es/herramientas/next.js-discussions': '/es/herramientas',
  '/fr/outils/next.js-discussions': '/fr/outils',
  '/de/tools/next.js-discussions': '/de/werkzeuge',
  '/es/tools/next.js-discussions': '/es/herramientas',
  '/fr/tools/next.js-discussions': '/fr/outils',
  '/tools/next.js-discussions': '/en/tools',
  '/de/werkzeuge/sitemap.xml-generator': '/de/werkzeuge/sitemap-xml-generator',
  '/en/tools/sitemap.xml-generator': '/en/tools/sitemap-xml-generator',
  '/es/herramientas/sitemap.xml-generator': '/es/herramientas/sitemap-xml-generator',
  '/fr/outils/sitemap.xml-generator': '/fr/outils/sitemap-xml-generator',
  '/de/tools/sitemap.xml-generator': '/de/werkzeuge/sitemap-xml-generator',
  '/es/tools/sitemap.xml-generator': '/es/herramientas/sitemap-xml-generator',
  '/fr/tools/sitemap.xml-generator': '/fr/outils/sitemap-xml-generator',
  '/tools/sitemap.xml-generator': '/en/tools/sitemap-xml-generator',
  '/calculators/password-generator': '/en/tools/password-generator',
  '/en/calculators/password-generator': '/en/tools/password-generator',
  '/es/calculators/password-generator': '/es/herramientas/password-generator',
  '/fr/calculators/password-generator': '/fr/outils/password-generator',
  '/de/calculators/password-generator': '/de/werkzeuge/password-generator',
  '/es/calculadoras/password-generator': '/es/herramientas/password-generator',
  '/fr/calculatrices/password-generator': '/fr/outils/password-generator',
  '/de/rechner/password-generator': '/de/werkzeuge/password-generator',
  '/es/calculadoras/generador-de-contrasenas': '/es/herramientas/password-generator',
  '/fr/calculatrices/generateur-de-mots-de-passe': '/fr/outils/password-generator',
  '/de/rechner/passwort-generator': '/de/werkzeuge/password-generator',
  '/en/calculators/passwort-generator': '/en/tools/password-generator',
  '/en/calculators/generador-de-contrasenas': '/en/tools/password-generator',
  '/en/calculators/generateur-de-mots-de-passe': '/en/tools/password-generator',
  '/calculators/random-number-generator': '/en/tools/random-number-generator',
  '/en/calculators/random-number-generator': '/en/tools/random-number-generator',
  '/es/calculators/random-number-generator': '/es/herramientas/random-number-generator',
  '/fr/calculators/random-number-generator': '/fr/outils/random-number-generator',
  '/de/calculators/random-number-generator': '/de/werkzeuge/random-number-generator',
  '/es/calculadoras/random-number-generator': '/es/herramientas/random-number-generator',
  '/fr/calculatrices/random-number-generator': '/fr/outils/random-number-generator',
  '/de/rechner/random-number-generator': '/de/werkzeuge/random-number-generator',
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

// Cross-locale calculator category prefixes
const LOCALE_CALC_CATEGORY_PREFIX: Record<string, string> = {
  de: 'rechner/kategorie',
  fr: 'calculatrices/categorie',
  es: 'calculadoras/categoria',
};

// Cross-locale guides path prefixes — when a locale uses /guides/ instead of
// its localized prefix (anleitungen / guias; fr uses /guides/ same as en).
const LOCALE_GUIDES_PREFIX: Record<string, string> = {
  de: 'anleitungen',
  es: 'guias',
};

// Cross-locale collections path prefixes (fr uses /collections/ same as en)
const LOCALE_COLLECTIONS_PREFIX: Record<string, string> = {
  de: 'sammlungen',
  es: 'colecciones',
};

// Cross-locale compare path prefixes
const LOCALE_COMPARE_PREFIX: Record<string, string> = {
  de: 'vergleichen',
  fr: 'comparer',
  es: 'comparar',
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
  // dashboard
  '/es/dashboard': '/es/panel',
  '/fr/dashboard': '/fr/tableau-de-bord',
  // login & signup
  '/es/login': '/es/iniciar-sesion',
  '/fr/login': '/fr/connexion',
  '/de/login': '/de/anmelden',
  '/es/signup': '/es/registrarse',
  '/fr/signup': '/fr/inscription',
  '/de/signup': '/de/registrieren',
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

  // 1b. Legacy or misspelled tool & calculator alias URLs (O(1) lookup)
  const legacyToolTarget = LEGACY_TOOL_REDIRECTS[pathname] || LEGACY_CALC_ALIAS_REDIRECTS[pathname];
  if (legacyToolTarget) return legacyToolTarget;

  // 1b-2. Legacy tool slug resolution & UK mortgage calculators historically linked under /tools/
  const toolSlugMatch = pathname.match(/^(?:\/(en|es|fr|de))?\/(tools|herramientas|outils|werkzeuge)\/([^/]+)$/);
  if (toolSlugMatch) {
    const [, loc = 'en', , rawSlug] = toolSlugMatch;
    const calcByLoc = TOOL_TO_CALC_REDIRECTS[rawSlug];
    if (calcByLoc) {
      return calcByLoc[loc] || calcByLoc.en;
    }
    const mappedToolSlug = LEGACY_TOOL_SLUG_MAP[rawSlug];
    if (mappedToolSlug) {
      const toolPrefix = loc === 'en' ? 'tools' : LOCALE_TOOL_PREFIX[loc];
      return `/${loc}/${toolPrefix}/${mappedToolSlug}`;
    }
  }

  // 1c. Truly deprecated or merged calculator redirects
  const deprecatedMatch = pathname.match(/^\/(?:(en|es|fr|de)\/)?(?:calculators|calculadoras|calculatrices|rechner)\/([a-zA-Z0-9_-]+)$/);
  if (deprecatedMatch) {
    const slug = deprecatedMatch[2];
    const deprecatedTarget = DEPRECATED_CALC_REDIRECTS[slug];
    if (deprecatedTarget) return deprecatedTarget;
  }

  // 1d. Leaked redirect-checker documentation example paths (/new-path/*, /old-path/*)
  if (pathname.startsWith('/new-path/') || pathname.startsWith('/old-path/') || pathname === '/new-path' || pathname === '/old-path') {
    return '/en/tools/redirect-checker';
  }

  // 2. Garbage / PDF-metadata-scraped paths → canonical homepage
  if (
    GARBAGE_PATHS.has(pathname) ||
    /^\/\d+\/?$/.test(pathname) ||
    pathname.endsWith('.xls$') ||
    pathname.endsWith('.xls')
  ) {
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

  // 5. Old community post format → canonical localized community index
  if (/^\/(?:en|es|fr|de)?\/?(?:community|comunidad|communaute|gemeinschaft)\/to-use-a-/.test(pathname) || pathname === '/community/to-use-a-bmi-calculator-93') {
    const localeMatch = pathname.match(/^\/(en|es|fr|de)\//);
    const locale = localeMatch ? localeMatch[1] : 'en';
    const commMap: Record<string, string> = {
      en: '/en/community',
      es: '/es/comunidad',
      fr: '/fr/communaute',
      de: '/de/gemeinschaft',
    };
    return commMap[locale] || '/en/community';
  }

  // 6a. Cross-locale /[locale]/calculators/category/[cat] → localized category path
  const calcCategoryMismatch = pathname.match(/^\/(de|fr|es)\/(?:calculators|rechner|calculatrices|calculadoras)\/category\/(.+)$/);
  if (calcCategoryMismatch) {
    const [, locale, cat] = calcCategoryMismatch;
    return `/${locale}/${LOCALE_CALC_CATEGORY_PREFIX[locale]}/${cat}`;
  }

  // 6b. Cross-locale /[locale]/calculators/[slug] → localized prefix
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

  // 8b. Cross-locale /[locale]/collections/[slug] → localized prefix
  const collectionsMismatch = pathname.match(/^\/(de|es)\/collections\/(.+)$/);
  if (collectionsMismatch) {
    const [, locale, slug] = collectionsMismatch;
    const prefix = LOCALE_COLLECTIONS_PREFIX[locale];
    return `/${locale}/${prefix}/${slug}`;
  }

  // 8c. Cross-locale /[locale]/compare/[slug] → localized prefix
  const compareMismatch = pathname.match(/^\/(de|fr|es)\/compare\/(.+)$/);
  if (compareMismatch) {
    const [, locale, slug] = compareMismatch;
    const prefix = LOCALE_COMPARE_PREFIX[locale];
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
    pathname === '/contact-us' ||
    pathname === '/privacy-policy' ||
    pathname === '/terms-of-use' ||
    pathname === '/disclaimer' ||
    pathname === '/sitemap' ||
    pathname === '/search' ||
    pathname === '/dashboard' ||
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
    // Only skip internal Next/Vercel routes and real static asset file extensions at the end of the URL.
    // This ensures dot-containing legacy slugs (e.g. /de/werkzeuge/sitemap.xml-generator, next.js-discussions, /*.xls$)
    // are intercepted by middleware and 301-redirected in 1 hop.
    '/((?!api|_next|_vercel|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|css|js|mjs|map|woff|woff2|ttf|eot|otf|txt|xml|json|webmanifest|pdf|wasm)$).*)',
  ],
};