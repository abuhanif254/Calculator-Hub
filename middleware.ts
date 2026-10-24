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
// Returned as HTTP 410 Gone so Googlebot purges them permanently without polluting 'Page with redirect'
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
  'add-page-numbers': 'add-page-numbers-pdf',
  'txt-to-pdf': 'text-to-pdf',
  'pdf-to-ppt': 'pdf-to-powerpoint',
  'ppt-to-pdf': 'powerpoint-to-pdf',
  'css-minifier': 'css-beautifier',
  'javascript-beautifier': 'js-beautifier',
  'js-minifier': 'js-beautifier',
};

// Leaked community & navigation menu links historically generated under /tools/<slug>
const TOOL_COMMUNITY_LEAK_SLUGS = new Set([
  'next.js-discussions',
  'nextjs-discussions',
  'seo-discussions',
  'react-discussions',
  'firebase-discussions',
  'api-discussions',
  'bug-reports',
  'ask-a-question',
  'tool-requests',
  'latest-discussions',
  'share-code-snippets',
]);

const TOOL_HUB_LEAK_SLUGS = new Set([
  'most-used-today',
  'popular-among-developers',
  'recently-added',
  'editors-picks',
  "editor's-picks",
  'editor’s-picks',
]);

// UK mortgage calculator & companion slugs (mortgage-calculator-uk is implemented under /tools/mortgage-calculator-uk)
const UK_MORTGAGE_CALC_SLUGS = new Set([
  'mortgage-calculator-uk',
  'calculadora-hipoteca-reino-unido',
  'calculateur-hypotheque-royaume-uni',
  'hypothekenrechner-uk',
  'stamp-duty-calculator',
  'calculadora-impuesto-timbre',
  'calculateur-droits-mutation',
  'grunderwerbsteuer-rechner-uk',
  'overpayment-calculator',
  'calculadora-amortizacion-anticipada',
  'calculateur-remboursement-anticipe',
  'sondertilgungsrechner',
  'remortgage-calculator',
  'calculadora-rehipoteca',
  'calculateur-rachat-credit-immobilier',
  'umschuldungsrechner-hypothek',
  'buy-to-let-calculator',
  'calculadora-hipoteca-alquiler',
  'calculateur-investissement-locatif',
  'kapitalanlage-immobilien-rechner',
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

// Truly deprecated or renamed calculators → canonical English calculator slug or category id
const DEPRECATED_CALC_TO_CANONICAL_SLUG: Record<string, { type: 'calc' | 'category'; target: string }> = {
  'refinance-calculator': { type: 'calc', target: 'mortgage-calculator' },
  'number-sequence-calculator': { type: 'category', target: 'math' },
  'body-type-calculator': { type: 'calc', target: 'body-fat-calculator' },
  'electricity-calculator': { type: 'calc', target: 'electricity-cost-calculator' },
  'time-card-calculator': { type: 'calc', target: 'hours-calculator' },
  'hex-calculator': { type: 'calc', target: 'binary-calculator' },
  'bandwidth-calculator': { type: 'category', target: 'other' },
  'circle-calculator': { type: 'category', target: 'math' },
  'mass-calculator': { type: 'calc', target: 'weight-calculator' },
  'gdp-calculator': { type: 'category', target: 'financial' },
  'mean-median-mode-range-calculator': { type: 'calc', target: 'statistics-calculator' },
  'permutation-and-combination-calculator': { type: 'calc', target: 'probability-calculator' },
  'calories-burned-calculator': { type: 'calc', target: 'calorie-calculator' },
  'day-counter': { type: 'calc', target: 'date-calculator' },
  'pregnancy-weight-gain-calculator': { type: 'calc', target: 'pregnancy-calculator' },
  'lean-body-mass-calculator': { type: 'calc', target: 'body-fat-calculator' },
  'pythagorean-theorem-calculator': { type: 'calc', target: 'triangle-calculator' },
  'time-zone-calculator': { type: 'calc', target: 'time-calculator' },
  'conception-calculator': { type: 'calc', target: 'pregnancy-conception-calculator' },
  'bac-calculator': { type: 'calc', target: 'bmi-calculator' },
  'gfr-calculator': { type: 'calc', target: 'bmi-calculator' },
  'engine-horsepower-calculator': { type: 'calc', target: 'power-calculator' },
  'tdee-calculator': { type: 'calc', target: 'calorie-calculator' },
  'sleep-calculator': { type: 'calc', target: 'advanced-sleep-cycle-calculator' },
  'tile-calculator': { type: 'calc', target: 'concrete-calculator' },
  'gas-mileage-calculator': { type: 'calc', target: 'conversion-calculator' },
  'payback-period-calculator': { type: 'calc', target: 'irr-calculator' },
  'molecular-weight-calculator': { type: 'calc', target: 'molar-mass-calculator' },
  'speed-calculator': { type: 'calc', target: 'velocity-calculator' },
  'credit-card-calculator': { type: 'calc', target: 'credit-cards-payoff' },
  'home-equity-loan-calculator': { type: 'calc', target: 'heloc-calculator' },
  'ira-calculator': { type: 'calc', target: 'roth-ira-calculator' },
  'pension-calculator': { type: 'calc', target: 'retirement-calculator' },
  'mortgage-calculator-for-your-site': { type: 'calc', target: 'mortgage-calculator' },
  'love-calculator-for-your-site': { type: 'calc', target: 'percentage-calculator' },
  'math-calculator-for-your-site': { type: 'calc', target: 'scientific-calculator' },
};

// Cross-locale tool path prefixes
const LOCALE_TOOL_PREFIX: Record<string, string> = {
  de: 'werkzeuge',
  fr: 'outils',
  es: 'herramientas',
};

// Cross-locale calculator path prefixes
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

// Cross-locale guides path prefixes (fr uses /guides/ same as en)
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

// Localized paths for static pages
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

/**
 * Checks whether a path is a permanently dead garbage probe, leaked example placeholder,
 * or deleted test artifact that should return HTTP 410 Gone (so Googlebot purges it
 * immediately instead of moving it into 'Page with redirect').
 */
function isPermanentlyGonePath(pathname: string): boolean {
  const clean = pathname.length > 1 && pathname.endsWith('/') ? pathname.replace(/\/+$/, '') : pathname;

  if (
    GARBAGE_PATHS.has(pathname) ||
    GARBAGE_PATHS.has(clean) ||
    /^\/\d+\/?$/.test(pathname) ||
    pathname.endsWith('.xls$') ||
    pathname.endsWith('.xls') ||
    clean === '/wp-admin' ||
    clean === '/admin' ||
    clean.startsWith('/new-path/') ||
    clean.startsWith('/old-path/') ||
    clean === '/new-path' ||
    clean === '/old-path'
  ) {
    return true;
  }

  // Deleted thin test community posts (e.g., to-use-a-*, hello-cca921ec)
  if (
    /^\/(?:en|es|fr|de)?\/?(?:community|comunidad|communaute|gemeinschaft)\/(?:to-use-a-|hello-cca921ec)(?:\/.*)?$/.test(clean)
  ) {
    return true;
  }

  // Leaked non-existent menu/discussion slugs under /tools/
  const toolSlugMatch = clean.match(/^(?:\/(en|es|fr|de))?\/(tools|herramientas|outils|werkzeuge)\/([^/]+)$/);
  if (toolSlugMatch) {
    let rawSlug = toolSlugMatch[3];
    try {
      rawSlug = decodeURIComponent(rawSlug);
    } catch {
      // keep raw
    }
    if (TOOL_COMMUNITY_LEAK_SLUGS.has(rawSlug) || TOOL_HUB_LEAK_SLUGS.has(rawSlug)) {
      return true;
    }
  }

  return false;
}

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

  // 1b-2. Legacy tool slug resolution & UK mortgage calculator under /tools/
  const toolSlugMatch = pathname.match(/^(?:\/(en|es|fr|de))?\/(tools|herramientas|outils|werkzeuge)\/([^/]+)$/);
  if (toolSlugMatch) {
    const [, loc = 'en', , rawEncodedSlug] = toolSlugMatch;
    let rawSlug = rawEncodedSlug;
    try {
      rawSlug = decodeURIComponent(rawEncodedSlug);
    } catch {
      rawSlug = rawEncodedSlug;
    }

    if (UK_MORTGAGE_CALC_SLUGS.has(rawSlug)) {
      const toolPrefix = loc === 'en' ? 'tools' : LOCALE_TOOL_PREFIX[loc];
      const canonicalUkPath = `/${loc}/${toolPrefix}/mortgage-calculator-uk`;
      return pathname === canonicalUkPath ? null : canonicalUkPath;
    }

    const mappedToolSlug = LEGACY_TOOL_SLUG_MAP[rawSlug];
    if (mappedToolSlug) {
      const toolPrefix = loc === 'en' ? 'tools' : LOCALE_TOOL_PREFIX[loc];
      return `/${loc}/${toolPrefix}/${mappedToolSlug}`;
    }
  }

  // 1c. Truly deprecated or merged calculator redirects & UK mortgage calculator under /calculators/
  const deprecatedMatch = pathname.match(/^\/(?:(en|es|fr|de)\/)?(?:calculators|calculadoras|calculatrices|rechner)\/([a-zA-Z0-9_-]+)$/);
  if (deprecatedMatch) {
    const loc = deprecatedMatch[1] || 'en';
    const slug = deprecatedMatch[2];

    if (UK_MORTGAGE_CALC_SLUGS.has(slug)) {
      const toolPrefix = loc === 'en' ? 'tools' : LOCALE_TOOL_PREFIX[loc];
      return `/${loc}/${toolPrefix}/mortgage-calculator-uk`;
    }

    const depEntry = DEPRECATED_CALC_TO_CANONICAL_SLUG[slug];
    if (depEntry) {
      if (depEntry.type === 'category') {
        if (loc === 'en') return `/en/calculators/category/${depEntry.target}`;
        return `/${loc}/${LOCALE_CALC_CATEGORY_PREFIX[loc]}/${depEntry.target}`;
      }
      const enPath = `/en/calculators/${depEntry.target}`;
      if (loc === 'en') return enPath;
      const locPrefixPath = `/${loc}/${LOCALE_CALC_PREFIX[loc]}/${depEntry.target}`;
      return CALC_REDIRECT_MAP[locPrefixPath] || locPrefixPath;
    }
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
    let localizedRest = rest;
    if (rest === '/new') {
      localizedRest = loc === 'de' ? '/neu' : loc === 'fr' ? '/nouveau' : '/nuevo';
    } else if (rest === '/messages' || rest.startsWith('/messages/')) {
      const msgPrefix = loc === 'de' ? '/nachrichten' : loc === 'es' ? '/mensajes' : '/messages';
      localizedRest = rest.replace(/^\/messages/, msgPrefix);
    } else if (rest === '/settings') {
      localizedRest = loc === 'de' ? '/einstellungen' : loc === 'fr' ? '/parametres' : '/configuracion';
    } else if (rest.startsWith('/category/')) {
      const catPrefix = loc === 'de' ? '/kategorie/' : loc === 'fr' ? '/categorie/' : '/categoria/';
      localizedRest = rest.replace(/^\/category\//, catPrefix);
    } else if (rest === '/hall-of-fame') {
      localizedRest = loc === 'de' ? '/ruhmeshalle' : loc === 'fr' ? '/temple-de-la-renommee' : '/salon-de-la-fama';
    }
    return `${targetMap[loc]}${localizedRest}`;
  }

  // 5. Legacy duplicate leaderboard routes → canonical localized Hall of Fame
  const leaderboardMatch = pathname.match(
    /^\/(?:(en|es|fr|de)\/)?(?:community|comunidad|communaute|gemeinschaft)\/(?:leaderboard|tabla-de-posiciones|classement|tableau-de-classement|bestenliste)(?:\/.*)?$/
  );
  if (leaderboardMatch) {
    const loc = leaderboardMatch[1] || 'en';
    const hofMap: Record<string, string> = {
      en: '/en/community/hall-of-fame',
      es: '/es/comunidad/salon-de-la-fama',
      fr: '/fr/communaute/temple-de-la-renommee',
      de: '/de/gemeinschaft/ruhmeshalle',
    };
    return hofMap[loc] || '/en/community/hall-of-fame';
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

const SEARCH_CRAWLER_REGEX = /Googlebot|Google-InspectionTool|Storebot-Google|GoogleOther|Mediapartners-Google|AdsBot-Google|bingbot|AdIdxBot|DuckDuckBot|Applebot|Slurp|YandexBot|Baiduspider|facebookexternalhit|Twitterbot|LinkedInBot/i;

// ── Main middleware ────────────────────────────────────────────────────────────

export default function middleware(request: NextRequest) {
  const { pathname, hostname, search } = request.nextUrl;

  // 0. Pass through Next.js dynamic image metadata endpoints & RSS feed without locale/redirect rewriting
  if (
    pathname.endsWith('/opengraph-image') ||
    pathname.endsWith('/twitter-image') ||
    pathname === '/feed.xml'
  ) {
    return NextResponse.next();
  }

  // 1. Return HTTP 410 Gone for permanently deleted garbage/bot-probe/leaked example URLs
  // so Googlebot drops them from its crawl queue without adding them to 'Page with redirect'
  if (isPermanentlyGonePath(pathname)) {
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex, nofollow',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  }

  const userAgent = request.headers.get('user-agent') || '';
  const isSearchCrawler = SEARCH_CRAWLER_REGEX.test(userAgent);

  const isNonWww = hostname === 'nexuscalculator.net';
  const canonicalPath = getCanonicalPath(pathname);
  const hasTracking = Boolean(search && /[?&](ref|utm_source|utm_medium|utm_campaign|utm_content|utm_term)=/.test(search));
  const isCommunityHub = /^\/(?:(en|es|fr|de)\/)?(?:community|comunidad|communaute|gemeinschaft)$/.test(pathname);
  const hasLegacyCommunityQuery = Boolean(isCommunityHub && search && /[?&]q=/.test(search));
  const hasBotUaQuery = Boolean(search && /[?&]ua=[^&]*Googlebot/i.test(search));
  const hasCrawlerToolOrSearchQuery = Boolean(
    isSearchCrawler && search && /[?&](q|ua|ip|domain)=/.test(search)
  );

  // Atomic 1-Hop 301 Canonical Redirect:
  // Unifies non-www domain normalization, path canonicalization, and query parameter stripping into exactly 1 HTTP 301 response.
  // Completely eliminates multi-hop redirect chains to maximize SEO crawl budget and PageRank equity.
  if (
    isNonWww ||
    canonicalPath !== null ||
    hasTracking ||
    hasLegacyCommunityQuery ||
    hasBotUaQuery ||
    hasCrawlerToolOrSearchQuery
  ) {
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
    if (hasLegacyCommunityQuery) {
      url.searchParams.delete('q');
    }
    if (hasBotUaQuery) {
      url.searchParams.delete('ua');
    }
    if (hasCrawlerToolOrSearchQuery) {
      ['q', 'ua', 'ip', 'domain'].forEach(param => url.searchParams.delete(param));
    }
    return NextResponse.redirect(url, { status: 301 });
  }

  // Hand off all other routing to next-intl
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Skip internal Next/Vercel routes, dynamic opengraph/twitter image endpoints, feed.xml, and real static asset file extensions.
    '/((?!api|_next|_vercel|feed\\.xml|.*\\/opengraph-image$|.*\\/twitter-image$|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg|css|js|mjs|map|woff|woff2|ttf|eot|otf|txt|xml|json|webmanifest|pdf|wasm)$).*)',
  ],
};
