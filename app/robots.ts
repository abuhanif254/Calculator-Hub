import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // IMPORTANT: Canonical domain is www. Using non-www causes redirect chains.
  // Googlebot, AdSense & AI Search (GEO) optimization: Public calculators, tools, guides,
  // category pillars, comparisons, collections, and /llms.txt are 100% accessible.
  // Dynamic /opengraph-image endpoints are allowed for social preview bots only to conserve Vercel CPU.
  const baseUrl = 'https://www.nexuscalculator.net';

  const publicDisallow = [
    '/api/',                              // Internal API endpoints
    '/private/',                          // Admin / internal routes
    '/*/embed/*',                         // Iframe calculator embeds (not standalone pages)
    '/embed/*',
    '/database-privacy',                  // Quarantine SaaS demo sub-app from indexing
    '/database-privacy/*',
    '/*/database-privacy',
    '/*/database-privacy/*',
    '/*/login',                           // Authentication & private user utility routes
    '/*/signup',
    '/*/dashboard',
    '/*/panel',
    '/*/tableau-de-bord',
    '/*/admin/*',
    '/*/search',                          // Internal search result pages
    '/*/buscar',
    '/*/rechercher',
    '/*/suche',
    '/*/community/new',                   // Non-editorial community forms, settings & empty profiles
    '/*/community/settings',
    '/*/community/messages*',
    '/*/community/user/*',
    '/*/comunidad/nuevo',
    '/*/comunidad/ajustes',
    '/*/comunidad/mensajes*',
    '/*/comunidad/usuario/*',
    '/*/communaute/nouveau',
    '/*/communaute/parametres',
    '/*/communaute/messages*',
    '/*/communaute/utilisateur/*',
    '/*/gemeinschaft/neu',
    '/*/gemeinschaft/einstellungen',
    '/*/gemeinschaft/nachrichten*',
    '/*/gemeinschaft/benutzer/*',
  ];

  const nonSocialDisallow = [
    ...publicDisallow,
    '/*opengraph-image*',                 // Dynamic PNGs are for social cards only (already noindex in next.config)
    '/*twitter-image*',
  ];

  return {
    rules: [
      {
        // Explicitly allow Google AdSense verification & contextual ad crawlers across all public routes
        userAgent: ['Mediapartners-Google', 'Google-Display-Ads-Bot', 'AdsBot-Google'],
        allow: ['/'],
      },
      {
        // Social link-preview bots explicitly allowed to render OpenGraph / Twitter cards
        userAgent: [
          'FacebookBot',
          'facebookexternalhit',
          'Twitterbot',
          'LinkedInBot',
          'WhatsApp',
          'Discordbot',
          'Slackbot',
        ],
        allow: ['/'],
        disallow: publicDisallow,
      },
      {
        userAgent: '*',
        allow: [
          '/',
          '/llms.txt',
          '/api/users/',                  // Allow legacy documentation example path so 301 redirect in next.config.ts resolves in GSC
        ],
        disallow: nonSocialDisallow,
      },
      {
        // Explicitly allow AI Search & Answer Engine citation bots (GEO)
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
        ],
        allow: ['/', '/llms.txt'],
        disallow: nonSocialDisallow,
      },
      {
        // Block aggressive commercial backlink scrapers & parasitic crawlers that waste Vercel ISR Reads & CPU
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'SemrushBot-OCOB',
          'DotBot',
          'MJ12bot',
          'BLEXBot',
          'Omgili',
          'Omgilibot',
          'Bytespider',
          'PetalBot',
          'Amazonbot',
          'CCBot',
          'Meta-ExternalAgent',
          'Meta-ExternalFetcher',
          'ImagesiftBot',
          'Diffbot',
          'CriteoBot',
          'Scrapy',
          'YisouSpider',
          'Sogou',
          'SeznamBot',
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
