import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // IMPORTANT: Canonical domain is www. Using non-www causes redirect chains.
  // Googlebot & AI Search (GEO) optimization: Public calculators, tools, guides,
  // category pillars, comparisons, collections, and /llms.txt are 100% accessible.
  // Private authenticated user areas, dashboard routes, and internal APIs are disallowed.
  const baseUrl = 'https://www.nexuscalculator.net';

  const publicDisallow = [
    '/api/',                              // Internal API endpoints
    '/private/',                          // Admin / internal routes
    '/*/embed/*',                         // Iframe calculator embeds (not standalone pages)
    '/embed/*',
  ];

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/llms.txt',
          '/api/users/',                  // Allow legacy documentation example path so 301 redirect in next.config.ts resolves in GSC
        ],
        disallow: publicDisallow,
      },
      {
        // Explicitly allow AI Search & Answer Engine citation bots (GEO) + Social Preview crawlers
        userAgent: [
          'GPTBot',
          'OAI-SearchBot',
          'ChatGPT-User',
          'Google-Extended',
          'ClaudeBot',
          'Claude-Web',
          'Anthropic-ai',
          'PerplexityBot',
          'Applebot-Extended',
          'FacebookBot',
          'facebookexternalhit',
          'Twitterbot',
          'LinkedInBot',
        ],
        allow: ['/', '/llms.txt'],
        disallow: publicDisallow,
      },
      {
        // Block aggressive commercial backlink scrapers & non-search crawlers that waste crawl budget
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
          'Omgili',
          'Omgilibot',
          'Bytespider',
          'TurnitinBot',
          'Barkrowler',
          'AwarioRssBot',
          'AwarioSmartBot',
          'DataForSeoBot',
        ],
        disallow: ['/'],
      },
    ],
    // Sitemap uses www canonical domain
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

