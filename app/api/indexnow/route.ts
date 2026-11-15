import { NextRequest, NextResponse } from 'next/server';
import { routing } from '@/i18n/routing';
import { calculators } from '@/lib/data/calculators';
import { allToolsConfig } from '@/lib/data/tools';
import { allGuides } from '@/lib/data/guides';
import { collections } from '@/lib/data/collections';
import { comparisons } from '@/lib/data/comparisons';
import { categories } from '@/lib/data/categories';
import { COMMUNITY_CATEGORIES } from '@/lib/categories';
import { getCanonicalUrl } from '@/lib/utils/seoUtils';

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'd8a94c7e2f1b5063a4c8e91f72b3d405';
const HOST = 'www.nexuscalculator.net';
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

const PRIORITY_BING_URLS = [
  'https://www.nexuscalculator.net/en',
  'https://www.nexuscalculator.net/es',
  'https://www.nexuscalculator.net/fr',
  'https://www.nexuscalculator.net/de',
  'https://www.nexuscalculator.net/en/calculators/conversion-calculator',
  'https://www.nexuscalculator.net/en/calculators/mortgage-calculator-uk',
  'https://www.nexuscalculator.net/en/calculators/height-calculator',
  'https://www.nexuscalculator.net/en/calculators/bmi-calculator',
  'https://www.nexuscalculator.net/en/calculators/electricity-cost-calculator',
  'https://www.nexuscalculator.net/en/calculators/power-supply-calculator',
  'https://www.nexuscalculator.net/en/calculators/tip-calculator',
  'https://www.nexuscalculator.net/en/calculators/voltage-calculator',
  'https://www.nexuscalculator.net/en/calculators/electrical-power-calculator',
  'https://www.nexuscalculator.net/en/calculators/resistance-calculator',
  'https://www.nexuscalculator.net/de/rechner/hypothekenrechner',
  'https://www.nexuscalculator.net/de/ratgeber/hypotheken-abloesungsrechner-ratgeber',
  'https://www.nexuscalculator.net/es/calculadoras/calculadora-de-acido-base',
  'https://www.nexuscalculator.net/en/calculators/electrochemical-cell-calculator',
  'https://www.nexuscalculator.net/fr/calculatrices/calculateur-de-tampon',
  'https://www.nexuscalculator.net/es/calculadoras/calculadora-henderson-hasselbalch',
  'https://www.nexuscalculator.net/en/guides/data-masking-techniques',
  'https://www.nexuscalculator.net/es/herramientas/pdf-metadata-viewer',
  'https://www.nexuscalculator.net/es/calculadoras/calculadora-roth-ira',
  'https://www.nexuscalculator.net/es/calculadoras/calculadora-de-entalpia',
  'https://www.nexuscalculator.net/es/calculadoras/calculadora-de-cd',
  'https://www.nexuscalculator.net/fr/outils/ai-prompt-optimizer',
  'https://www.nexuscalculator.net/de/rechner/margenrechner',
  'https://www.nexuscalculator.net/es/calculadoras/calculadora-de-kb',
  'https://www.nexuscalculator.net/en/calculators/enthalpy-calculator',
  'https://www.nexuscalculator.net/fr/outils/pdf-metadata-viewer',
  'https://www.nexuscalculator.net/fr/outils/pdf-metadata-editor',
  'https://www.nexuscalculator.net/en/guides/hipaa-data-de-identification',
  'https://www.nexuscalculator.net/de/ratgeber/wissenschaftliche-schreibweise-ratgeber',
];

function collectAllCanonicalUrls(): string[] {
  const urlSet = new Set<string>(PRIORITY_BING_URLS);
  const locales = routing.locales;

  const coreRoutes = [
    '/',
    '/calculators',
    '/tools',
    '/guides',
    '/collections',
    '/compare',
    '/image',
    '/pdf',
    '/community',
    '/community/hall-of-fame',
    '/about-us',
    '/contact-us',
    '/privacy-policy',
    '/terms-of-use',
    '/disclaimer',
    '/sitemap',
  ];

  for (const locale of locales) {
    for (const route of coreRoutes) {
      urlSet.add(getCanonicalUrl(route, locale));
    }
    for (const cat of COMMUNITY_CATEGORIES) {
      urlSet.add(getCanonicalUrl('/community/category/[slug]', locale, cat.slug));
    }
    for (const cat of categories) {
      if (calculators.some((calc) => cat.dbCategory.includes(calc.category))) {
        urlSet.add(getCanonicalUrl('/calculators/category/[category]', locale, cat.id));
      }
    }
    for (const calc of calculators) {
      urlSet.add(getCanonicalUrl('/calculators/[slug]', locale, calc.slug));
    }
    for (const toolSlug of Object.keys(allToolsConfig)) {
      urlSet.add(getCanonicalUrl('/tools/[slug]', locale, toolSlug));
    }
    for (const guide of allGuides) {
      urlSet.add(getCanonicalUrl('/guides/[slug]', locale, guide.slug));
    }
    for (const col of collections) {
      urlSet.add(getCanonicalUrl('/collections/[slug]', locale, col.slug));
    }
    for (const comp of comparisons) {
      urlSet.add(getCanonicalUrl('/compare/[slug]', locale, comp.slug));
    }
  }

  return Array.from(urlSet);
}

async function submitToIndexNow(urls: string[]) {
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls.slice(0, 10000),
  };

  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ];

  const results = await Promise.all(
    endpoints.map(async (endpoint) => {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
          },
          body: JSON.stringify(payload),
        });
        return {
          endpoint,
          status: res.status,
          ok: res.status === 200 || res.status === 202,
        };
      } catch (err: any) {
        return {
          endpoint,
          status: 500,
          ok: false,
          error: err?.message || 'Network error',
        };
      }
    })
  );

  return {
    submittedCount: payload.urlList.length,
    keyLocation: KEY_LOCATION,
    results,
  };
}

export async function GET(request: NextRequest) {
  const mode = request.nextUrl.searchParams.get('mode') || 'all';
  const urls = mode === 'priority' ? PRIORITY_BING_URLS : collectAllCanonicalUrls();
  const report = await submitToIndexNow(urls);

  return NextResponse.json({
    protocol: 'IndexNow v1',
    host: HOST,
    mode,
    ...report,
  });
}

export async function POST(request: NextRequest) {
  let customUrls: string[] | null = null;
  try {
    const body = await request.json();
    if (Array.isArray(body?.urls) && body.urls.length > 0) {
      customUrls = body.urls.filter((u: unknown) => typeof u === 'string' && u.startsWith(`https://${HOST}/`));
    }
  } catch {
    customUrls = null;
  }

  const urls = customUrls && customUrls.length > 0 ? customUrls : collectAllCanonicalUrls();
  const report = await submitToIndexNow(urls);

  return NextResponse.json({
    protocol: 'IndexNow v1',
    host: HOST,
    ...report,
  });
}
