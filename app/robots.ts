import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  // IMPORTANT: canonical domain is www. Using non-www causes redirect chains.
  const baseUrl = 'https://www.nexuscalculator.net';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',                              // Internal API endpoints
          '/private/',                          // Admin / internal routes
          // ── Auth-required pages (redirect unauthenticated crawlers) ───────────
          // These cause "Page with redirect" in GSC. Block crawl budget waste.
          '/*/login',
          '/*/signup',
          '/*/community/new',
          '/*/community/messages',
          '/*/community/messages/*',
          '/*/community/settings',
          '/*/dashboard',
          '/*/admin/*',
          '/admin/',
          // ── Community search params (create duplicate/redirect URLs) ──────────
          '/*/community?q=*',
          '/*/comunidad?q=*',
          '/*/communaute?q=*',
          '/*/gemeinschaft?q=*',
          // ── Data Privacy Platform — authenticated app routes ──────────────────
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
          // ── Community leaderboard / hall-of-fame (thin UGC) ──────────────────
          '/*/community/leaderboard',
          '/*/comunidad/tabla-de-posiciones',
          '/*/comunidad/salon-de-la-fama',
          '/*/gemeinschaft/ruhmeshalle',
          '/*/communaute/tableau-de-classement',
          // ── Malformed / garbage URLs crawled via bad external links ──────────
          '/*.xls',
          '/*.xls$',
          '/images/*',
          '/new-path/*',
          '/old-path/*',
          // ── Tracking / referral query params (cause infinite redirect variants) ─
          '/*?ref=*',
          '/*?utm_source=*',
          '/*?utm_medium=*',
          '/*?utm_campaign=*',
          '/*?utm_content=*',
          '/*?utm_term=*',
          // ── Trailing slash variants of locale roots ───────────────────────────

          // ── Community category archive pages (thin, duplicate-prone) ──────────
          '/*/community/category/*',
          '/*/comunidad/categoria/*',
          '/*/gemeinschaft/kategorie/*',
          '/*/communaute/categorie/*',
          // ── Database privacy bare paths (auth-required) ───────────────────────
          '/database-privacy/*',
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
