import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',                              // Internal API endpoints
          '/private/',                          // Admin / internal routes
          // ── Data Privacy Platform — authenticated app routes ──────────
          // These pages require login and redirect to /login for unauthenticated
          // crawlers. Excluding them prevents crawl budget waste and GSC errors.
          '/*/database-privacy/dashboard',
          '/*/database-privacy/scanner',
          '/*/database-privacy/scanner/',
          '/*/database-privacy/masking/',
          '/*/database-privacy/anonymize',
          '/*/database-privacy/connections',
          '/*/database-privacy/explorer',
          '/*/database-privacy/jobs',
          '/*/database-privacy/jobs/',
          '/*/database-privacy/compliance',
          '/*/database-privacy/reports',
          '/*/database-privacy/audit',
          '/*/database-privacy/import',
          '/*/database-privacy/export',
          '/*/database-privacy/api-keys',
          '/*/database-privacy/secrets',
          '/*/database-privacy/webhooks',
          '/*/database-privacy/users',
          '/*/database-privacy/monitoring',
          '/*/database-privacy/monitoring/',
          '/*/database-privacy/organizations',
          '/*/database-privacy/projects',
          '/*/database-privacy/settings',
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
