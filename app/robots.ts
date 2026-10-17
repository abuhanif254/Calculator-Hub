import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // IMPORTANT: Canonical domain is www. Using non-www causes redirect chains.
  // Googlebot crawl equity optimization: Public calculators, guides, category pillars,
  // and landing pages remain 100% accessible (200 OK / 1-hop canonical).
  // Private authenticated user areas, dashboard routes, and internal APIs are strictly disallowed.
  const baseUrl = 'https://www.nexuscalculator.net';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/api/users/',                        // Allow legacy documentation example path so 301 redirect in next.config.ts resolves in GSC
        ],
        disallow: [
          '/api/',                              // Internal API endpoints
          '/private/',                          // Admin / internal routes
          '/*/embed/*',                         // Iframe calculator embeds (not standalone pages)
          '/embed/*',
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
    // Sitemap uses www canonical domain
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
