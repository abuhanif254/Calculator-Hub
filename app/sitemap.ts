import { MetadataRoute } from 'next';
import { sitemapCategories } from '../lib/data/sitemapData';
import { calculators } from '../lib/data/calculators';
import { routing } from '../i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';

  const routes: MetadataRoute.Sitemap = [];

  const addRoute = (pathnameKey: string, changeFrequency: any, priority: number, genericSlug?: string) => {
    // 1) Find the route mapped in next-intl
    // 2) Construct the hreflang alternates for Next.js

    const languages: Record<string, string> = {};
    const routeMapping = (routing.pathnames as any)[pathnameKey];

    routing.locales.forEach((locale) => {
      let relativePath = '';
      
      if (pathnameKey === '/') {
        relativePath = `/${locale}`;
      } else if (routeMapping && typeof routeMapping[locale] === 'string') {
        relativePath = `/${locale}${routeMapping[locale]}`;
        // replace [slug] with genericSlug if present
        if (genericSlug) {
          relativePath = relativePath.replace('[slug]', genericSlug);
        }
      } else {
        // Fallback if not configured in routing
        relativePath = `/${locale}${pathnameKey}`;
        if (genericSlug) {
          relativePath = relativePath.replace('[slug]', genericSlug);
        }
      }
      
      languages[locale] = `${baseUrl}${relativePath}`;
    });
    
    languages['x-default'] = languages['en'] || `${baseUrl}/en${pathnameKey.replace('[slug]', genericSlug || '')}`;

    // We output the default "en" url as the primary <loc> because 
    // google requires a primary link, while the alternates handle the translations
    routes.push({
      url: languages['en'] || `${baseUrl}/en${pathnameKey.replace('[slug]', genericSlug || '')}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages
      }
    });
  };

  // Static root & paths
  addRoute('/', 'daily', 1);
  addRoute('/sitemap', 'weekly', 0.8);
  addRoute('/about-us', 'monthly', 0.5);
  addRoute('/privacy-policy', 'yearly', 0.3);
  addRoute('/terms-of-use', 'yearly', 0.3);

  // Dynamic calculcators from database
  calculators.forEach((calc) => {
    const routeKey = `/calculators/${calc.slug}`;
    const existsInRouting = (routing.pathnames as any)[routeKey];
    
    if (existsInRouting) {
      addRoute(routeKey, 'monthly', 0.9);
    } else {
      // It's a calculator without explicit mapping; fallback to generic [slug] mapping
      addRoute('/calculators/[slug]', 'monthly', 0.9, calc.slug);
    }
  });

  // Collect all slugs from the large dummy static sitemap categories
  // Avoid duplicates if they are already in the db
  const existingSlugs = new Set(calculators.map(c => c.slug));

  sitemapCategories.forEach((category) => {
    category.links.forEach((link) => {
      const slug = link.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      // If we haven't already included this slug
      if (!existingSlugs.has(slug)) {
        addRoute('/calculators/[slug]', 'monthly', 0.6, slug);
      }
    });
  });

  return routes;
}
