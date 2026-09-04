import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withSerwistInit from '@serwist/next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  disable: true,

});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  experimental: {
    cpus: process.env.CI_ENV === 'local' ? 1 : undefined,
    optimizePackageImports: ['lucide-react', 'date-fns', 'chart.js', 'katex'],
  },
  async headers() {
    return [
      // ── Security headers (improves Lighthouse Best Practices score) ───────────
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',   value: 'nosniff' },
          { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection',          value: '1; mode=block' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
      // ── Immutable cache for Next.js static chunks (JS/CSS/fonts) ──────────
      // These files have content-hashed names, so max-age=1yr + immutable is safe.
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // ── Long cache for public static assets (icons, images) ───────────────
      {
        source: '/icons/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      // ── API routes: no cache by default, CORS allowed ────────────────────
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
  webpack: (config, { dev, isServer, webpack }) => {
    // Fix pdfjs-dist canvas dependency issue
    config.resolve.alias.canvas = false;
    
    // Fix pptxgenjs node:fs imports on client
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        https: false,
        http: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        zlib: false,
      };
      config.plugins.push(
        new webpack.NormalModuleReplacementPlugin(/^node:/, (resource: { request: string }) => {
          resource.request = resource.request.replace(/^node:/, '');
        })
      );
    }
    
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modify—file watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
  async redirects() {
    return [
      // ── Tool prefix localization (Google crawls /xx/tools/ instead of localized prefix) ──
      // NOTE: Calculator slug redirects are handled in middleware.ts via CALC_REDIRECT_MAP
      // for accuracy (the slug itself changes per locale, not just the prefix).
      {
        source: '/es/tools/:slug*',
        destination: '/es/herramientas/:slug*',
        permanent: true,
      },
      {
        source: '/fr/tools/:slug*',
        destination: '/fr/outils/:slug*',
        permanent: true,
      },
      {
        source: '/de/tools/:slug*',
        destination: '/de/werkzeuge/:slug*',
        permanent: true,
      },
      // ── EN path with image/pdf for non-en locales ────────────────────────────
      {
        source: '/es/pdf',
        destination: '/es/pdf',
        permanent: false, // already correct, but ensure it resolves
      },
      // ── Credit cards payoff slug normalization ───────────────────────────────
      {
        source: '/en/calculators/credit-cards-payoff-calculator',
        destination: '/en/calculators/credit-cards-payoff',
        permanent: true,
      },
      {
        source: '/es/calculadoras/credit-cards-payoff-calculator',
        destination: '/es/calculadoras/pago-tarjetas-de-credito',
        permanent: true,
      },
      {
        source: '/fr/calculatrices/credit-cards-payoff-calculator',
        destination: '/fr/calculatrices/remboursement-cartes-de-credit',
        permanent: true,
      },
      {
        source: '/de/rechner/credit-cards-payoff-calculator',
        destination: '/de/rechner/kreditkarten-abbezahlen',
        permanent: true,
      },
      // ── Leaked tool documentation paths ─────────────────────────────────────
      {
        source: '/new-path/:slug*',
        destination: '/en/tools/redirect-checker',
        permanent: true,
      },
      {
        source: '/old-path/:slug*',
        destination: '/en/tools/redirect-checker',
        permanent: true,
      },
      // ── Non-existent calculator slugs → nearest category ────────────────────
      {
        source: '/:locale/rechner/day-counter',
        destination: '/:locale/rechner/category/math-science',
        permanent: true,
      },
      {
        source: '/:locale/calculatrices/molarity-calculator',
        destination: '/:locale/calculatrices/calculateur-de-molarite',
        permanent: true,
      },
      {
        source: '/:locale/calculatrices/bandwidth-calculator',
        destination: '/:locale/calculatrices/category/math-science',
        permanent: true,
      },
      {
        source: '/:locale/calculators/pregnancy-weight-gain-calculator',
        destination: '/:locale/calculators/category/health-fitness',
        permanent: true,
      },
      {
        source: '/:locale/calculators/lean-body-mass-calculator',
        destination: '/:locale/calculators/category/health-fitness',
        permanent: true,
      },
      {
        source: '/:locale/rechner/body-type-calculator',
        destination: '/:locale/rechner/category/health-fitness',
        permanent: true,
      },
      {
        source: '/:locale/calculadoras/electricity-calculator',
        destination: '/:locale/calculadoras/category/electrical',
        permanent: true,
      },
      {
        source: '/:locale/calculatrices/pythagorean-theorem-calculator',
        destination: '/:locale/calculatrices/category/math-science',
        permanent: true,
      },
      {
        source: '/:locale/calculators/pythagorean-theorem-calculator',
        destination: '/:locale/calculators/category/math-science',
        permanent: true,
      },
      {
        source: '/:locale/calculators/number-sequence-calculator',
        destination: '/:locale/calculators/category/math-science',
        permanent: true,
      },
      {
        source: '/:locale/calculadoras/time-zone-calculator',
        destination: '/:locale/calculadoras/category/other',
        permanent: true,
      },
      {
        source: '/:locale/calculadoras/time-card-calculator',
        destination: '/:locale/calculadoras/category/other',
        permanent: true,
      },
      {
        source: '/:locale/calculators/time-card-calculator',
        destination: '/:locale/calculators/category/other',
        permanent: true,
      },
      {
        source: '/:locale/calculatrices/hex-calculator',
        destination: '/:locale/calculatrices/category/math-science',
        permanent: true,
      },
      {
        source: '/:locale/calculadoras/bandwidth-calculator',
        destination: '/:locale/calculadoras/category/math-science',
        permanent: true,
      },
      {
        source: '/:locale/rechner/circle-calculator',
        destination: '/:locale/rechner/category/math-science',
        permanent: true,
      },
      {
        source: '/:locale/calculators/mass-calculator',
        destination: '/:locale/calculators/category/math-science',
        permanent: true,
      },
      {
        source: '/:locale/calculators/gdp-calculator',
        destination: '/:locale/calculators/category/financial',
        permanent: true,
      },
      {
        source: '/:locale/calculatrices/gdp-calculator',
        destination: '/:locale/calculatrices/category/financial',
        permanent: true,
      },
      {
        source: '/:locale/calculators/mean-median-mode-range-calculator',
        destination: '/:locale/calculators/statistics-calculator',
        permanent: true,
      },
      {
        source: '/:locale/calculatrices/mean-median-mode-range-calculator',
        destination: '/:locale/calculatrices/calculatrice-statistique',
        permanent: true,
      },
      {
        source: '/:locale/calculators/permutation-and-combination-calculator',
        destination: '/:locale/calculators/category/math-science',
        permanent: true,
      },
      {
        source: '/:locale/calculatrices/permutation-and-combination-calculator',
        destination: '/:locale/calculatrices/category/math-science',
        permanent: true,
      },
      {
        source: '/:locale/calculatrices/calories-burned-calculator',
        destination: '/:locale/calculatrices/category/health-fitness',
        permanent: true,
      },
      {
        source: '/:locale/calculators/calories-burned-calculator',
        destination: '/:locale/calculators/category/health-fitness',
        permanent: true,
      },
      {
        source: '/:locale/calculatrices/college-cost-calculator',
        destination: '/:locale/calculatrices/calculateur-cout-etudes',
        permanent: true,
      },
      {
        source: '/:locale/calculators/college-cost-calculator',
        destination: '/:locale/calculators/college-cost-calculator',
        permanent: false,
      },
      // ── Tool slug that moved to /tools/ ──────────────────────────────────────
      {
        source: '/:locale/calculators/random-number-generator',
        destination: '/:locale/tools/random-number-generator',
        permanent: true,
      },
      // ── Werkzeuge slug with dots (invalid) ───────────────────────────────────
      {
        source: '/de/werkzeuge/next.js-discussions',
        destination: '/de/werkzeuge',
        permanent: true,
      },
      {
        source: '/de/werkzeuge/sitemap.xml-generator',
        destination: '/de/werkzeuge/sitemap-xml-generator',
        permanent: true,
      },
      // ── En refinance-calculator (doesn't exist) → mortgage ───────────────────
      {
        source: '/en/calculators/refinance-calculator',
        destination: '/en/calculators/mortgage-calculator',
        permanent: true,
      },
      // ── Non-existent number/body calculators ────────────────────────────────
      {
        source: '/:locale/calculators/number-sequence-calculator',
        destination: '/:locale/calculators/category/math-science',
        permanent: true,
      },
      {
        source: '/:locale/rechner/number-sequence-calculator',
        destination: '/:locale/rechner/category/math-science',
        permanent: true,
      },
    ];
  },
};

export default withSerwist(withNextIntl(nextConfig));
