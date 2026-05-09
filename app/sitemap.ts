import { MetadataRoute } from 'next';
import { sitemapCategories } from '../lib/data/sitemapData';
import { calculators } from '../lib/data/calculators';
import { routing } from '../i18n/routing';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';

  const routes: MetadataRoute.Sitemap = [];

  const addRoute = (pathnameKey: string, changeFrequency: any, priority: number, genericSlug?: string) => {
    // 1) Find the route mapped in next-intl
    // 2) Construct the hreflang alternates for Next.js (important)

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

  // Developer Tools Routes for SEO
  const developerTools = [
    "JSON Formatter", "JSON Validator", "HTML Formatter", "CSS Beautifier", "JavaScript Beautifier", "XML Formatter", "Markdown Previewer", "SQL Formatter", "YAML Formatter", "CSV Viewer", "Diff Checker",
    "Base64 Encode", "Base64 Decode", "URL Encoder", "URL Decoder", "JWT Decoder", "Hash Generator", "MD5 Generator", "SHA256 Generator", "Password Generator", "HMAC Generator", "QR Code Generator",
    "UUID Generator", "Slug Generator", "Lorem Ipsum Generator", "Fake User Data Generator", "Random Number Generator", "Random String Generator", "Username Generator", "API Mock Data Generator", "Strong Password Generator", "HTML Table Generator",
    "HEX to RGB", "RGB to HEX", "Color Picker", "Gradient Generator", "Tailwind Color Palette", "CSS Shadow Generator", "Glassmorphism Generator", "Neumorphism Generator", "Contrast Checker", "Color Palette Generator",
    "Meta Tag Generator", "Open Graph Generator", "Twitter Card Generator", "robots.txt Generator", "sitemap.xml Generator", ".htaccess Generator", "CSS Minifier", "JS Minifier", "HTML Minifier", "Responsive Screen Tester", "HTTP Header Checker", "Redirect Checker", "Website Screenshot Tool", "DNS Lookup", "IP Lookup", "User Agent Parser", "MIME Type Checker",
    "Latest Discussions", "Ask a Question", "Share Code Snippets", "Tool Requests", "Bug Reports", "React Discussions", "Next.js Discussions", "Firebase Discussions", "SEO Discussions", "API Discussions",
    "Most Used Today", "Recently Added", "Popular Among Developers", "Editor’s Picks"
  ];

  developerTools.forEach((toolName) => {
    const slug = toolName.toLowerCase().replace(/ /g, '-');
    addRoute('/tools/[slug]', 'weekly', 0.8, slug);
  });

  return routes;
}
