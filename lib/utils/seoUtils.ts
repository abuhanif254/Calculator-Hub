import { routing } from '@/i18n/routing';
import { getCalculatorBySlug } from '@/lib/data/calculators';
import { getGuideBySlug } from '@/lib/data/guides';
import { CALC_REDIRECT_MAP } from '@/lib/calcRedirectMap';
import { GUIDE_REDIRECT_MAP } from '@/lib/guideRedirectMap';

// IMPORTANT: canonical domain is www.nexuscalculator.net
// APP_URL must be set to https://www.nexuscalculator.net in Vercel env vars.
// The .replace() guards against misconfigured non-www APP_URL causing all canonical
// tags to point to nexuscalculator.net → "Alternative page with proper canonical tag" in GSC.
const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net')
  .replace(/\/$/, '')
  .replace('://nexuscalculator.net', '://www.nexuscalculator.net');

const LEGACY_INTERNAL_ALIASES: Record<string, string> = {
  '/de/rechner/anleihen-rechner': '/de/rechner/anleihenrechner',
  '/de/rechner/anzahlungsrechner': '/de/rechner/anzahlung-rechner',
  '/de/rechner/barwert-rechner': '/de/rechner/barwertrechner',
  '/de/rechner/binaer-rechner': '/de/rechner/binarrechner',
  '/mole-calculator': '/calculators/mole-calculator',
  '/stoichiometry-calculator': '/calculators/stoichiometry-calculator',
  '/tools/url-encoder-decoder': '/tools/url-encoder',
};

/**
 * Generates an SEO `alternates` object containing the absolute canonical URL
 * for the current locale, and hreflang definitions for all supported languages.
 * This perfectly syncs metadata with the next-intl routing configurations,
 * avoiding duplicate content penalties and canonical mismatches.
 * 
 * @param pathnameKey The exact key used in `routing.pathnames`, e.g. `/calculators/[slug]` or `/about-us`
 * @param currentLocale The current locale being rendered, e.g. `en` or `es`
 * @param genericSlug Optional dynamic slug to inject into the path
 */
export function getCanonicalAndAlternates(
  pathnameKey: string,
  currentLocale: string,
  genericSlug?: string
) {
  const languages: Record<string, string> = {};

  // Normalize genericSlug to canonical English slug if a localized slug was passed
  let canonicalBaseSlug = genericSlug;
  if (genericSlug && pathnameKey.startsWith('/calculators/') && !pathnameKey.startsWith('/calculators/category/')) {
    const calc = getCalculatorBySlug(genericSlug);
    if (calc) canonicalBaseSlug = calc.slug;
  } else if (genericSlug && pathnameKey.startsWith('/guides/')) {
    const guide = getGuideBySlug(genericSlug);
    if (guide) canonicalBaseSlug = guide.slug;
  }
  
  // 1. Check if there is an explicit mapping for this specific slug in routing.pathnames
  // e.g. /calculators/mortgage-calculator has specific localized slugs per language
  const specificRouteKey = canonicalBaseSlug && pathnameKey.startsWith('/calculators/') && !pathnameKey.startsWith('/calculators/category/')
    ? `/calculators/${canonicalBaseSlug}`
    : pathnameKey;

  const routeMapping = (routing.pathnames as any)[specificRouteKey] || (routing.pathnames as any)[pathnameKey];

  routing.locales.forEach((locale) => {
    let relativePath = '';

    if (pathnameKey === '/') {
      relativePath = `/${locale}`;
    } else if (routeMapping && typeof routeMapping === 'object' && routeMapping[locale]) {
      relativePath = `/${locale}${routeMapping[locale]}`;
    } else if (routeMapping && typeof routeMapping === 'string') {
      relativePath = `/${locale}${routeMapping}`;
    } else {
      // Fallback: apply intelligent locale prefixes for unmapped calculators/tools/guides
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

    if (canonicalBaseSlug) {
      // Fetch localized slug if this is a calculator or guide route
      let localizedSlug = canonicalBaseSlug;
      if (pathnameKey.startsWith('/calculators/') && !pathnameKey.startsWith('/calculators/category/')) {
        const calc = getCalculatorBySlug(canonicalBaseSlug);
        if (calc && calc.slugs && calc.slugs[locale as keyof typeof calc.slugs]) {
          localizedSlug = calc.slugs[locale as keyof typeof calc.slugs];
        }
      } else if (pathnameKey.startsWith('/guides/')) {
        const guide = getGuideBySlug(canonicalBaseSlug);
        if (guide && guide.slugs && guide.slugs[locale as keyof typeof guide.slugs]) {
          localizedSlug = guide.slugs[locale as keyof typeof guide.slugs];
        }
      }

      relativePath = relativePath
        .replace('[slug]', localizedSlug)
        .replace('[category]', canonicalBaseSlug);
    }

    languages[locale] = `${baseUrl}${relativePath}`;
  });

  // Calculate default canonical path (English or x-default)
  let defaultSlug = canonicalBaseSlug || '';
  if (canonicalBaseSlug) {
    if (pathnameKey.startsWith('/calculators/') && !pathnameKey.startsWith('/calculators/category/')) {
      const calc = getCalculatorBySlug(canonicalBaseSlug);
      if (calc?.slugs?.en) defaultSlug = calc.slugs.en;
      else if (calc?.slug) defaultSlug = calc.slug;
    } else if (pathnameKey.startsWith('/guides/')) {
      const guide = getGuideBySlug(canonicalBaseSlug);
      if (guide?.slugs?.en) defaultSlug = guide.slugs.en;
      else if (guide?.slug) defaultSlug = guide.slug;
    }
  }

  let defaultPath = pathnameKey
    .replace('[slug]', defaultSlug)
    .replace('[category]', canonicalBaseSlug || '');

  if (routeMapping && typeof routeMapping === 'object' && routeMapping['en']) {
    defaultPath = routeMapping['en'].replace('[slug]', defaultSlug).replace('[category]', canonicalBaseSlug || '');
  }

  languages['x-default'] = languages['en'] || `${baseUrl}/en${defaultPath}`;

  return {
    canonical: languages[currentLocale] || languages['en'],
    languages,
  };
}

/**
 * Returns the exact absolute canonical URL string for schema generation
 */
export function getCanonicalUrl(
  pathnameKey: string,
  currentLocale: string,
  genericSlug?: string
): string {
  const alternates = getCanonicalAndAlternates(pathnameKey, currentLocale, genericSlug);
  return alternates.canonical;
}

/**
 * Normalizes any internal href (from Markdown content, raw links, etc.) to its
 * exact canonical localized path so internal links never trigger 301/307 redirects.
 */
export function canonicalizeInternalHref(href: string | undefined, currentLocale: string): string {
  if (!href || typeof href !== 'string') return '#';
  const trimmed = href.trim();
  if (
    trimmed.startsWith('#') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:') ||
    trimmed.startsWith('javascript:')
  ) {
    return trimmed;
  }

  let pathname = trimmed;
  let search = '';
  let hash = '';

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    try {
      const parsed = new URL(trimmed);
      if (parsed.hostname !== 'nexuscalculator.net' && parsed.hostname !== 'www.nexuscalculator.net') {
        return trimmed;
      }
      pathname = parsed.pathname;
      search = parsed.search;
      hash = parsed.hash;
    } catch {
      return trimmed;
    }
  } else {
    const hashIdx = pathname.indexOf('#');
    if (hashIdx !== -1) {
      hash = pathname.slice(hashIdx);
      pathname = pathname.slice(0, hashIdx);
    }
    const queryIdx = pathname.indexOf('?');
    if (queryIdx !== -1) {
      search = pathname.slice(queryIdx);
      pathname = pathname.slice(0, queryIdx);
    }
  }

  if (!pathname.startsWith('/')) {
    return trimmed;
  }

  let p = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (LEGACY_INTERNAL_ALIASES[p]) {
    p = LEGACY_INTERNAL_ALIASES[p];
  }
  if (CALC_REDIRECT_MAP[p]) {
    return `${CALC_REDIRECT_MAP[p]}${search}${hash}`;
  }
  if (GUIDE_REDIRECT_MAP[p]) {
    return `${GUIDE_REDIRECT_MAP[p]}${search}${hash}`;
  }

  const localeMatch = p.match(/^\/(en|es|fr|de)(\/.*)?$/);
  const targetLocale = localeMatch ? localeMatch[1] : currentLocale;
  let barePath = localeMatch ? (localeMatch[2] || '/') : p;

  if (LEGACY_INTERNAL_ALIASES[barePath]) {
    barePath = LEGACY_INTERNAL_ALIASES[barePath];
  }

  if (barePath === '/') {
    return `/${targetLocale}${search}${hash}`;
  }

  if (barePath.startsWith('/calculators/category/')) {
    const cat = barePath.replace('/calculators/category/', '');
    return `${getCanonicalUrl('/calculators/category/[category]', targetLocale, cat).replace(baseUrl, '')}${search}${hash}`;
  }

  if (
    barePath.startsWith('/calculators/') ||
    barePath.startsWith('/calculadoras/') ||
    barePath.startsWith('/calculatrices/') ||
    barePath.startsWith('/rechner/')
  ) {
    const slug = barePath.split('/').slice(2).join('/');
    const calc = getCalculatorBySlug(slug);
    if (calc) {
      return `${getCanonicalUrl('/calculators/[slug]', targetLocale, calc.slug).replace(baseUrl, '')}${search}${hash}`;
    }
  }

  if (
    barePath.startsWith('/tools/') ||
    barePath.startsWith('/herramientas/') ||
    barePath.startsWith('/outils/') ||
    barePath.startsWith('/werkzeuge/')
  ) {
    let slug = barePath.split('/').slice(2).join('/');
    if (slug === 'url-encoder-decoder') slug = 'url-encoder';
    return `${getCanonicalUrl('/tools/[slug]', targetLocale, slug).replace(baseUrl, '')}${search}${hash}`;
  }

  if (
    barePath.startsWith('/guides/') ||
    barePath.startsWith('/guias/') ||
    barePath.startsWith('/anleitungen/')
  ) {
    const slug = barePath.split('/').slice(2).join('/');
    const guide = getGuideBySlug(slug);
    if (guide) {
      return `${getCanonicalUrl('/guides/[slug]', targetLocale, guide.slug).replace(baseUrl, '')}${search}${hash}`;
    }
  }

  if (barePath in routing.pathnames) {
    return `${getCanonicalUrl(barePath, targetLocale).replace(baseUrl, '')}${search}${hash}`;
  }

  return localeMatch ? `${p}${search}${hash}` : `/${targetLocale}${p}${search}${hash}`;
}

const SERP_MAX_BASE_LEN = 58; // Layout appends " | Nexus" (+8 chars) -> max 66 chars (< 70 Bing limit)

const DANGLING_SERP_WORDS = new Set([
  'and', 'or', 'for', 'to', 'in', 'on', 'of', 'with', 'by', 'at', 'from', 'vs', 'vs.', 'the', 'a', 'an', '&', '+',
  'y', 'e', 'o', 'u', 'de', 'del', 'la', 'el', 'los', 'las', 'en', 'con', 'para', 'por', 'un', 'una', 'su', 'tu', 'tus', 'libre',
  'et', 'ou', 'de', 'du', 'des', 'le', 'la', 'les', 'en', 'dans', 'avec', 'pour', 'par', 'sur', 'un', 'une', 'vos', 'votre',
  'und', 'oder', 'für', 'von', 'mit', 'in', 'im', 'an', 'am', 'auf', 'zu', 'zur', 'zum', 'der', 'die', 'das', 'den', 'dem', 'ein', 'eine', 'einer', 'einem', 'einen', 'ihre', 'ihren', 'berechnen'
]);

function cleanTrailingSerpDangling(str: string): string {
  let s = str.replace(/[,:;–—\-|/+\s]+$/, '').trim();
  if ((s.match(/\(/g) || []).length > (s.match(/\)/g) || []).length) {
    s = s.replace(/\s*\([^)]*$/, '').trim();
  }
  const words = s.split(/\s+/);
  while (words.length > 2) {
    const last = words[words.length - 1].toLowerCase().replace(/[.,:;!?]/g, '');
    if (DANGLING_SERP_WORDS.has(last)) {
      words.pop();
    } else {
      break;
    }
  }
  return words.join(' ').replace(/[,:;–—\-|/+\s]+$/, '').trim();
}

function truncateSerpAtWordBoundary(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  const sliced = str.slice(0, maxLen + 1);
  const lastSpace = sliced.lastIndexOf(' ');
  const candidate = lastSpace > 15 ? sliced.slice(0, lastSpace) : str.slice(0, maxLen);
  return cleanTrailingSerpDangling(candidate);
}

/**
 * Normalizes and enforces strict SERP title length (< 70 chars including " | Nexus" layout template)
 * while enriching short bare titles (< 36 chars) with localized high-CTR modifiers.
 */
export function optimizeSerpTitle(
  rawTitle: string,
  locale: string = 'en',
  type: 'calculator' | 'tool' | 'guide' | 'page' = 'calculator'
): string {
  let cleaned = (rawTitle || '')
    .replace(/^Nexus(?:Calculator|\s+Calculator)?\s*[|–—-]\s*/i, '')
    .replace(/\s*[|–—-]\s*Nexus\s*Calculator\s*Guides.*$/i, '')
    .replace(/\s*[|–—-]\s*Nexus\s*Community.*$/i, '')
    .replace(/\s*[|–—-]\s*Community\s*\|\s*Nexus.*$/i, '')
    .replace(/\s*[|–—-]\s*Nexus\s*Calculator.*$/i, '')
    .replace(/\s*[|–—-]\s*Nexus.*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (cleaned.length > SERP_MAX_BASE_LEN) {
    const withoutParen = cleaned.replace(/\s*\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
    if (withoutParen.length <= SERP_MAX_BASE_LEN && withoutParen.length >= 25) {
      cleaned = withoutParen;
    }
  }

  if (cleaned.length > SERP_MAX_BASE_LEN) {
    const sepMatch = cleaned.match(/^(.+?)\s*(\||–|—|\s-\s|:)\s*(.+)$/);
    if (sepMatch) {
      const primary = sepMatch[1].trim();
      const rawSep = sepMatch[2].trim();
      const sep = rawSep === ':' ? ': ' : ' — ';
      const secondary = sepMatch[3].trim();

      // 1. Try stripping trailing filler words from secondary
      const strippedSec = secondary
        .replace(/\s*(?:&\s*More|y\s*Más|et\s*Plus|&\s*Mehr)$/i, '')
        .replace(/\s+(?:Cell\s+Solver|Solver|Calculator|Tool|Online|Free|Gratis|Gratuit|Kostenlos|berechnen|Ocultas)$/i, '')
        .trim();
      const cleanedStrippedSec = cleanTrailingSerpDangling(strippedSec);
      if (`${primary}${sep}${cleanedStrippedSec}`.length <= SERP_MAX_BASE_LEN && cleanedStrippedSec.length >= 8) {
        return `${primary}${sep}${cleanedStrippedSec}`;
      }

      // 2. Try splitting secondary by comma (preserving & / y / et / und phrases)
      const commaParts = strippedSec.split(/\s*,\s*/);
      if (commaParts.length > 1) {
        let acc = commaParts[0];
        for (let i = 1; i < commaParts.length; i++) {
          const next = `${acc}, ${commaParts[i]}`;
          if (`${primary}${sep}${next}`.length <= SERP_MAX_BASE_LEN) {
            acc = next;
          } else {
            break;
          }
        }
        const cleanedAcc = cleanTrailingSerpDangling(acc);
        const candidate = `${primary}${sep}${cleanedAcc}`;
        if (candidate.length <= SERP_MAX_BASE_LEN && cleanedAcc.length >= 6) {
          return candidate;
        }
      }

      // 3. Fall back to primary clause (which receives a clean localized modifier below if < 36 chars)
      if (primary.length >= 12 && primary.length <= SERP_MAX_BASE_LEN) {
        cleaned = primary;
      } else {
        cleaned = truncateSerpAtWordBoundary(cleaned, SERP_MAX_BASE_LEN);
      }
    } else {
      cleaned = truncateSerpAtWordBoundary(cleaned, SERP_MAX_BASE_LEN);
    }
  }

  if (type === 'page') {
    return cleaned;
  }

  // Enrich short/medium base titles (< 36 chars) that don't already have a secondary clause
  if (cleaned.length < 36 && !cleaned.includes('—') && !cleaned.includes(' - ') && !cleaned.includes('|') && !cleaned.includes(':')) {
    const modifiers: Record<string, { calculator: string; tool: string; guide: string }> = {
      en: { calculator: ' — Free Online Formula', tool: ' — Free Online Tool', guide: ' — Complete Guide' },
      es: { calculator: ' — Gratis y Precisa', tool: ' — Herramienta Gratis', guide: ' — Guía Completa' },
      fr: { calculator: ' — Gratuit en Ligne', tool: ' — Outil Gratuit', guide: ' — Guide Complet' },
      de: { calculator: ' — Kostenlos Online', tool: ' — Kostenloses Tool', guide: ' — Kompletter Ratgeber' },
    };

    const locMods = modifiers[locale] || modifiers.en;
    const mod = locMods[type as 'calculator' | 'tool' | 'guide'] || locMods.calculator;
    if (cleaned.length + mod.length <= SERP_MAX_BASE_LEN) {
      return `${cleaned}${mod}`;
    }

    const shortMod: Record<string, string> = {
      en: ' (Free Online)',
      es: ' (Gratis Online)',
      fr: ' (Gratuit)',
      de: ' (Kostenlos)',
    };
    const fallback = shortMod[locale] || shortMod.en;
    if (cleaned.length + fallback.length <= SERP_MAX_BASE_LEN) {
      return `${cleaned}${fallback}`;
    }
  }

  return cleaned;
}
