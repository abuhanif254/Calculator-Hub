import { routing } from '@/i18n/routing';
import { getCalculatorBySlug } from '@/lib/data/calculators';
import { getGuideBySlug } from '@/lib/data/guides';

// IMPORTANT: canonical domain is www.nexuscalculator.net
// APP_URL must be set to https://www.nexuscalculator.net in Vercel env vars.
// The .replace() guards against misconfigured non-www APP_URL causing all canonical
// tags to point to nexuscalculator.net → "Alternative page with proper canonical tag" in GSC.
const baseUrl = (process.env.APP_URL || 'https://www.nexuscalculator.net')
  .replace(/\/$/, '')
  .replace('://nexuscalculator.net', '://www.nexuscalculator.net');

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
  
  // Explicitly typing routeMapping as any to extract the object structure
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
      // Fetch localized slug if this is a calculator or guide route
      let localizedSlug = genericSlug;
      if (pathnameKey.startsWith('/calculators/')) {
        const calc = getCalculatorBySlug(genericSlug);
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
      const calc = getCalculatorBySlug(genericSlug);
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
    canonical: languages[currentLocale],
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
