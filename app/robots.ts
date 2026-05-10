import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',         // Internal API endpoints
          '/private/',     // Future admin / internal routes
        ],
        // NOTE: Do NOT block /_next/ — it contains CSS/JS bundles
        // that Googlebot needs to render pages correctly.
      },
      {
        // Block aggressive SEO crawlers that waste crawl budget
        userAgent: ['AhrefsBot', 'SemrushBot', 'DotBot', 'MJ12bot', 'BLEXBot'],
        disallow: ['/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
