const fs = require('fs');
const path = require('path');

// 1. Load the 427 URLs
const csvPath = path.join(__dirname, '../scratch/crawled_not_indexed_urls.csv');
const csvLines = fs.readFileSync(csvPath, 'utf8').trim().split('\n').slice(1);
const urls = csvLines.map(l => {
  const [u, d] = l.split(',');
  return { url: u.trim(), date: d ? d.trim() : '' };
});

// 2. Load CALC_REDIRECT_MAP
const calcRedirectContent = fs.readFileSync(path.join(__dirname, '../lib/calcRedirectMap.ts'), 'utf8');
const calcMap = {};
const calcMatches = calcRedirectContent.matchAll(/'([^']+)':\s*'([^']+)'/g);
for (const match of calcMatches) {
  calcMap[match[1]] = match[2];
}

// 3. Load GUIDE_REDIRECT_MAP
let guideMap = {};
if (fs.existsSync(path.join(__dirname, '../lib/guideRedirectMap.ts'))) {
  const guideRedirectContent = fs.readFileSync(path.join(__dirname, '../lib/guideRedirectMap.ts'), 'utf8');
  const guideMatches = guideRedirectContent.matchAll(/'([^']+)':\s*'([^']+)'/g);
  for (const match of guideMatches) {
    guideMap[match[1]] = match[2];
  }
}

// 4. Load Calculators definition to test markdown resolution
const calcCode = fs.readFileSync(path.join(__dirname, '../lib/data/calculators.ts'), 'utf8');
const calcs = [];
const blocks = calcCode.split(/\{\s*slug:/);
for (const b of blocks) {
  const m = b.match(/^\s*['"]([a-zA-Z0-9_-]+)['"]/);
  if (!m) continue;
  const enSlug = m[1];
  const slugs = { en: enSlug };
  const sb = b.match(/slugs:\s*\{([^}]+)\}/);
  if (sb) {
    for (const l of sb[1].split('\n')) {
      const p = l.match(/(en|es|de|fr):\s*['"]([^'"]+)['"]/);
      if (p) slugs[p[1]] = p[2];
    }
  }
  calcs.push({ slug: enSlug, slugs });
}

// 5. Load Tools definition
const toolsDir = path.join(__dirname, '../lib/data/tools');
const toolFiles = fs.readdirSync(toolsDir).filter(f => f.endsWith('.ts'));
const tools = new Map();
for (const tf of toolFiles) {
  const slug = tf.replace('.ts', '');
  const content = fs.readFileSync(path.join(toolsDir, tf), 'utf8');
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  tools.set(slug, { file: tf, wordCount });
}

// 6. Middleware canonical redirect logic
const GARBAGE_PATHS = new Set([
  '/Author', '/Producer', '/Kids', '/P', '/XObject', '/28', '/Contents',
  '/page', '/$', '/&', '/egneodunq', '/admin', '/admin/', '/wp-admin', '/wp-admin/',
  '/images/*', '/new-path/:slug', '/old-path/:slug', '/4', '/4/', '/Metadata',
  '/*.xls$', '/*.xls', '/.xls$', '/.xls'
]);

const LEGACY_TOOL_REDIRECTS = {
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

const DEPRECATED_CALC_REDIRECTS = {
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

const LOCALE_TOOL_PREFIX = { de: 'werkzeuge', fr: 'outils', es: 'herramientas' };
const LOCALE_CALC_PREFIX = { de: 'rechner', fr: 'calculatrices', es: 'calculadoras' };
const LOCALE_GUIDES_PREFIX = { de: 'anleitungen', es: 'guias' };

const LOCALE_STATIC_REDIRECTS = {
  '/es/terms-of-use': '/es/terminos-de-uso',
  '/fr/terms-of-use': '/fr/conditions-d-utilisation',
  '/de/terms-of-use': '/de/nutzungsbedingungen',
  '/es/privacy-policy': '/es/politica-de-privacidad',
  '/fr/privacy-policy': '/fr/politique-de-confidentialite',
  '/de/privacy-policy': '/de/datenschutzrichtlinie',
  '/es/about-us': '/es/sobre-nosotros',
  '/fr/about-us': '/fr/a-propos',
  '/de/about-us': '/de/uber-uns',
  '/es/contact-us': '/es/contactenos',
  '/fr/contact-us': '/fr/nous-contacter',
  '/de/contact-us': '/de/kontaktiere-uns',
  '/es/disclaimer': '/es/descargo-de-responsabilidad',
  '/fr/disclaimer': '/fr/clause-de-non-responsabilite',
  '/de/disclaimer': '/de/haftungsausschluss',
  '/es/sitemap': '/es/mapa-del-sitio',
  '/fr/sitemap': '/fr/plan-du-site',
  '/es/image': '/es/imagen',
  '/de/image': '/de/bild',
  '/es/calculators': '/es/calculadoras',
  '/fr/calculators': '/fr/calculatrices',
  '/de/calculators': '/de/rechner',
  '/es/tools': '/es/herramientas',
  '/fr/tools': '/fr/outils',
  '/de/tools': '/de/werkzeuge',
  '/es/guides': '/es/guias',
  '/de/guides': '/de/anleitungen',
};

function getCanonicalPath(pathname) {
  if (pathname === '/') return '/en';
  if (pathname.length > 1 && pathname.endsWith('/')) {
    const unslashed = pathname.replace(/\/+$/, '');
    return getCanonicalPath(unslashed) || unslashed;
  }
  if (calcMap[pathname]) return calcMap[pathname];
  if (guideMap[pathname]) return guideMap[pathname];
  if (LEGACY_TOOL_REDIRECTS[pathname]) return LEGACY_TOOL_REDIRECTS[pathname];

  const deprecatedMatch = pathname.match(/^\/(?:(en|es|fr|de)\/)?(?:calculators|calculadoras|calculatrices|rechner)\/([a-zA-Z0-9_-]+)$/);
  if (deprecatedMatch) {
    const slug = deprecatedMatch[2];
    if (DEPRECATED_CALC_REDIRECTS[slug]) return DEPRECATED_CALC_REDIRECTS[slug];
  }

  if (GARBAGE_PATHS.has(pathname) || /^\/\d+\/?$/.test(pathname)) return '/en';
  if (pathname.startsWith('/admin') || pathname.startsWith('/wp-admin')) return '/en';

  const communityMatch = pathname.match(/^\/(de|fr|es)\/community(\/.*)?$/);
  if (communityMatch) {
    const [, loc, rest = ''] = communityMatch;
    const targetMap = { de: '/de/gemeinschaft', fr: '/fr/communaute', es: '/es/comunidad' };
    return `${targetMap[loc]}${rest}`;
  }

  const calculatorsMismatch = pathname.match(/^\/(de|fr|es)\/calculators\/(.+)$/);
  if (calculatorsMismatch) {
    const [, locale, slug] = calculatorsMismatch;
    return `/${locale}/${LOCALE_CALC_PREFIX[locale]}/${slug}`;
  }

  const toolsMismatch = pathname.match(/^\/(de|fr|es)\/tools\/(.+)$/);
  if (toolsMismatch) {
    const [, locale, slug] = toolsMismatch;
    return `/${locale}/${LOCALE_TOOL_PREFIX[locale]}/${slug}`;
  }

  const guidesMismatch = pathname.match(/^\/(de|es)\/guides\/(.+)$/);
  if (guidesMismatch) {
    const [, locale, slug] = guidesMismatch;
    return `/${locale}/${LOCALE_GUIDES_PREFIX[locale]}/${slug}`;
  }

  if (LOCALE_STATIC_REDIRECTS[pathname]) return LOCALE_STATIC_REDIRECTS[pathname];

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

function resolveCalcMarkdown(urlSlug, locale) {
  const calc = calcs.find(c => c.slug === urlSlug || (c.slugs && Object.values(c.slugs).includes(urlSlug)));
  const baseSlug = calc ? calc.slug : urlSlug;
  const localizedSlug = calc?.slugs?.[locale];

  let targetPath = path.join(__dirname, '../content', locale, `${baseSlug}.md`);
  if (!fs.existsSync(targetPath) && localizedSlug) {
    const p2 = path.join(__dirname, '../content', locale, `${localizedSlug}.md`);
    if (fs.existsSync(p2)) targetPath = p2;
  }
  if (!fs.existsSync(targetPath) && urlSlug) {
    const p3 = path.join(__dirname, '../content', locale, `${urlSlug}.md`);
    if (fs.existsSync(p3)) targetPath = p3;
  }

  let isFallback = false;
  if (!fs.existsSync(targetPath)) {
    targetPath = path.join(__dirname, '../content/en', `${baseSlug}.md`);
    isFallback = true;
  }

  const exists = fs.existsSync(targetPath);
  let words = 0;
  if (exists) {
    words = fs.readFileSync(targetPath, 'utf8').split(/\s+/).filter(Boolean).length;
  }
  return { baseSlug, targetPath: path.relative(path.join(__dirname, '..'), targetPath), exists, isFallback, words };
}

let redirectCount = 0;
let direct200Count = 0;
const toolAudit = [];
const calcAudit = [];
const guideAudit = [];
const otherAudit = [];
const fallbackList = [];

for (const item of urls) {
  const urlObj = new URL(item.url);
  const isNonWww = urlObj.hostname === 'nexuscalculator.net';
  const pathname = urlObj.pathname;
  const canonical = getCanonicalPath(pathname);

  if (isNonWww || canonical !== null) {
    redirectCount++;
  } else {
    direct200Count++;
    // Analyze the 200 OK candidate
    const toolMatch = pathname.match(/^\/(en|es|fr|de)\/(tools|herramientas|outils|werkzeuge)\/([a-zA-Z0-9_-]+)$/);
    const calcMatch = pathname.match(/^\/(en|es|fr|de)\/(calculators|calculadoras|calculatrices|rechner)\/([a-zA-Z0-9_-]+)$/);
    const guideMatch = pathname.match(/^\/(en|es|fr|de)\/(guides|guias|anleitungen)\/([a-zA-Z0-9_-]+)$/);

    if (toolMatch) {
      const [, locale, prefix, slug] = toolMatch;
      const toolInfo = tools.get(slug);
      toolAudit.push({
        url: item.url,
        locale,
        slug,
        hasConfig: !!toolInfo,
        words: toolInfo ? toolInfo.wordCount : 0
      });
    } else if (calcMatch) {
      const [, locale, prefix, slug] = calcMatch;
      const mdInfo = resolveCalcMarkdown(slug, locale);
      calcAudit.push({
        url: item.url,
        locale,
        slug,
        ...mdInfo
      });
      if (mdInfo.isFallback) {
        fallbackList.push({ url: item.url, locale, slug, ...mdInfo });
      }
    } else if (guideMatch) {
      const [, locale, prefix, slug] = guideMatch;
      const guidePath = path.join(__dirname, '../content', locale, 'guides', `${slug}.md`);
      const exists = fs.existsSync(guidePath);
      let words = 0;
      if (exists) words = fs.readFileSync(guidePath, 'utf8').split(/\s+/).filter(Boolean).length;
      guideAudit.push({
        url: item.url,
        locale,
        slug,
        exists,
        words
      });
    } else {
      otherAudit.push({ url: item.url, pathname });
    }
  }
}

console.log('====================================================');
console.log('      COMPREHENSIVE 427-URL AUDIT RESULTS           ');
console.log('====================================================');
console.log(`Total URLs Audited: ${urls.length}`);
console.log(`- 301 Permanent Redirects (Handled by Middleware): ${redirectCount}`);
console.log(`- 200 OK Direct Pages (Quality Content Audited):   ${direct200Count}`);
console.log('\n--- 200 OK Breakdown ---');
console.log(`- Tools:       ${toolAudit.length}`);
console.log(`- Calculators: ${calcAudit.length}`);
console.log(`- Guides:      ${guideAudit.length}`);
console.log(`- Other/Legal: ${otherAudit.length}`);

console.log('\n--- Calculators English Fallback Audit ---');
console.log(`Remaining Calculators falling back to English: ${fallbackList.length}`);
if (fallbackList.length > 0) {
  fallbackList.forEach(f => console.log(`  [FALLBACK] ${f.locale} - ${f.url} -> ${f.targetPath}`));
} else {
  console.log('  PERFECT! 0 calculators fall back to English! 100% localized content resolved.');
}

console.log('\n--- Guides Quality Audit (Word Counts) ---');
for (const g of guideAudit) {
  console.log(`  [GUIDE] ${g.locale}/${g.slug}: ${g.words} words (Exists: ${g.exists})`);
}

console.log('\n--- Super-Expanded Tools Audit (Sample of 13 Focus Tools) ---');
const superExpandedSlugs = [
  'epub-to-pdf', 'html-to-pdf', 'pdf-to-html', 'pdf-to-jpg', 'pdf-to-png',
  'pdf-to-text', 'png-to-pdf', 'text-to-pdf', 'pdf-to-excel', 'pdf-to-powerpoint',
  'pdf-to-epub', 'qr-code-studio', 'background-remover'
];
for (const s of superExpandedSlugs) {
  const info = tools.get(s);
  console.log(`  [TOOL] ${s.padEnd(22)}: ${info ? info.wordCount : 0} words`);
}
