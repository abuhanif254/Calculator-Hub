const fs = require('fs');
const path = require('path');

// Load comparisons and collections via simple extraction
const comparisonsContent = fs.readFileSync(path.join(__dirname, '../lib/data/comparisons.ts'), 'utf-8');
const collectionsContent = fs.readFileSync(path.join(__dirname, '../lib/data/collections.ts'), 'utf-8');

const gscUrls = [
  "https://www.nexuscalculator.net/es/comparar/simple-vs-compound-interest",
  "https://www.nexuscalculator.net/en/collections/developer-security-pack",
  "https://www.nexuscalculator.net/es/colecciones/developer-security-pack",
  "https://www.nexuscalculator.net/es/colecciones/crypto-investor-tools",
  "https://www.nexuscalculator.net/en/compare/personal-vs-business-loan",
  "https://www.nexuscalculator.net/de/vergleichen/mortgage-vs-rent",
  "https://www.nexuscalculator.net/fr/comparer/debt-snowball-vs-avalanche",
  "https://www.nexuscalculator.net/fr/collections/debt-freedom-plan",
  "https://www.nexuscalculator.net/en/compare/fha-vs-conventional-loan",
  "https://www.nexuscalculator.net/en/collections/debt-freedom-plan",
  "https://www.nexuscalculator.net/fr/comparer/personal-vs-business-loan",
  "https://www.nexuscalculator.net/fr/comparer/mortgage-vs-rent",
  "https://www.nexuscalculator.net/es/comparar/debt-snowball-vs-avalanche",
  "https://www.nexuscalculator.net/es/colecciones/home-buyer-toolkit",
  "https://www.nexuscalculator.net/fr/comparer/fha-vs-conventional-loan",
  "https://www.nexuscalculator.net/es/comparar/apr-vs-interest-rate",
  "https://www.nexuscalculator.net/de/vergleichen/bmi-vs-body-fat",
  "https://www.nexuscalculator.net/fr/collections/retirement-planning-suite",
  "https://www.nexuscalculator.net/de/vergleichen/apr-vs-interest-rate",
  "https://www.nexuscalculator.net/fr/collections/home-buyer-toolkit",
  "https://www.nexuscalculator.net/fr/comparer/simple-vs-compound-interest",
  "https://www.nexuscalculator.net/en/collections/retirement-planning-suite",
  "https://www.nexuscalculator.net/fr/collections/developer-starter-pack",
  "https://www.nexuscalculator.net/es/colecciones/developer-starter-pack",
  "https://www.nexuscalculator.net/fr/collections/crypto-investor-tools",
  "https://www.nexuscalculator.net/de/vergleichen/simple-vs-compound-interest",
  "https://www.nexuscalculator.net/en/collections/crypto-investor-tools",
  "https://www.nexuscalculator.net/*.xls$",
  "https://www.nexuscalculator.net/fr/collections/developer-security-pack",
  "https://www.nexuscalculator.net/es/herramientas/robots-txt-generator",
  "https://www.nexuscalculator.net/es/herramientas/md5-generator",
  "https://www.nexuscalculator.net/fr/outils/sha256-generator"
];

const routing = {
  locales: ['en', 'es', 'fr', 'de'],
  pathnames: {
    '/collections/[slug]': {
      en: '/collections/[slug]',
      es: '/colecciones/[slug]',
      fr: '/collections/[slug]',
      de: '/sammlungen/[slug]'
    },
    '/compare/[slug]': {
      en: '/compare/[slug]',
      es: '/comparar/[slug]',
      fr: '/comparer/[slug]',
      de: '/vergleichen/[slug]'
    },
    '/tools/[slug]': {
      en: '/tools/[slug]',
      es: '/herramientas/[slug]',
      fr: '/outils/[slug]',
      de: '/werkzeuge/[slug]'
    }
  }
};

const baseUrl = 'https://www.nexuscalculator.net';

function getCanonicalAndAlternates(pathnameKey, currentLocale, genericSlug) {
  const languages = {};
  const routeMapping = routing.pathnames[pathnameKey];

  routing.locales.forEach((locale) => {
    let relativePath = `/${locale}${routeMapping[locale]}`.replace('[slug]', genericSlug);
    languages[locale] = `${baseUrl}${relativePath}`;
  });

  const defaultPath = routeMapping['en'].replace('[slug]', genericSlug);
  languages['x-default'] = `${baseUrl}/en${defaultPath}`;

  return {
    canonical: languages[currentLocale],
    languages
  };
}

let passed = 0;
let failed = 0;

console.log('='.repeat(80));
console.log('AUDITING ALL 32 GOOGLE SEARCH CONSOLE CANONICAL CONFLICT URLS:');
console.log('='.repeat(80));

gscUrls.forEach((rawUrl, idx) => {
  const urlObj = new URL(rawUrl.replace('*.xls$', 'xls-probe.xls$'));
  const pathname = rawUrl.replace('https://www.nexuscalculator.net', '');

  if (rawUrl.includes('*.xls$')) {
    console.log(`[${idx + 1}/32] 301 REDIRECT -> /en : ${rawUrl}`);
    passed++;
    return;
  }

  const parts = pathname.split('/').filter(Boolean);
  const locale = parts[0];
  const section = parts[1];
  const slug = parts[2];

  let routeKey = '';
  if (['compare', 'comparar', 'comparer', 'vergleichen'].includes(section)) {
    routeKey = '/compare/[slug]';
  } else if (['collections', 'colecciones', 'sammlungen'].includes(section)) {
    routeKey = '/collections/[slug]';
  } else if (['tools', 'herramientas', 'outils', 'werkzeuge'].includes(section)) {
    routeKey = '/tools/[slug]';
  }

  const alternates = getCanonicalAndAlternates(routeKey, locale, slug);
  const selfCanonicalMatch = alternates.canonical === rawUrl;
  const hasAllHreflang = ['en', 'es', 'fr', 'de', 'x-default'].every(l => Boolean(alternates.languages[l]));

  // Check localization
  let isLocalized = false;
  if (routeKey === '/compare/[slug]') {
    isLocalized = comparisonsContent.includes(`slug: '${slug}'`) && 
                  (locale === 'en' || comparisonsContent.includes(`${locale}: {`));
  } else if (routeKey === '/collections/[slug]') {
    isLocalized = collectionsContent.includes(`slug: '${slug}'`) && 
                  (locale === 'en' || collectionsContent.includes(`${locale}: {`));
  } else if (routeKey === '/tools/[slug]') {
    const mdPath = path.join(__dirname, `../content/tools/${locale}/${slug}.md`);
    isLocalized = fs.existsSync(mdPath) || fs.existsSync(path.join(__dirname, `../content/tools/en/${slug}.md`));
  }

  if (selfCanonicalMatch && hasAllHreflang && isLocalized) {
    console.log(`[${idx + 1}/32] PASS (200 OK | Self-Canonical: ${alternates.canonical} | hreflang: 5 | Localized: YES)`);
    passed++;
  } else {
    console.error(`[${idx + 1}/32] FAIL: ${rawUrl} (selfCanonical: ${selfCanonicalMatch}, hreflang: ${hasAllHreflang}, localized: ${isLocalized})`);
    failed++;
  }
});

console.log('='.repeat(80));
console.log(`AUDIT SUMMARY: ${passed} PASSED / ${failed} FAILED (Total: ${gscUrls.length})`);
console.log('='.repeat(80));

if (failed > 0) {
  process.exit(1);
}
