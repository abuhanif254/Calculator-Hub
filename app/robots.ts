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
      },
      {
        // Block aggressive SEO crawlers and AI bots that waste crawl budget
        userAgent: [
          'AhrefsBot', 'SemrushBot', 'DotBot', 'MJ12bot',
          'GPTBot', 'ChatGPT-User', 'Google-Extended', 'Anthropic-ai',
          'Claude-Web', 'ClaudeBot', 'Omgili', 'Omgilibot', 'FacebookBot',
          'Bytespider', 'Amazonbot', 'TurnitinBot', 'Barkrowler',
          'AwarioRssBot', 'AwarioSmartBot', 'DataForSeoBot'
        ],
        disallow: ['/'],
      },
    ],
    // Next.js auto-generates the sitemap index at /sitemap.xml
    // which references /sitemap/0.xml, /sitemap/1.xml, etc.
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
