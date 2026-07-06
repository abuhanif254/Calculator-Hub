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
    cpus: 1,
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
      // SEO Indexing Fix: Redirect unlocalized bot crawls to localized pathnames
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
      {
        source: '/es/calculators/:slug*',
        destination: '/es/calculadoras/:slug*',
        permanent: true,
      },
      {
        source: '/fr/calculators/:slug*',
        destination: '/fr/calculatrices/:slug*',
        permanent: true,
      },
      {
        source: '/de/calculators/:slug*',
        destination: '/de/rechner/:slug*',
        permanent: true,
      },
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
      // Fix for leaked tool documentation paths
      {
        source: '/new-path/:slug*',
        destination: '/tools/redirect-checker',
        permanent: true,
      },
      {
        source: '/old-path/:slug*',
        destination: '/tools/redirect-checker',
        permanent: true,
      },
      // Redirects for deleted/missing calculators
      {
        source: '/:locale/calculators/tip-calculator',
        destination: '/:locale/calculators/category/financial',
        permanent: true,
      },
      {
        source: '/:locale/calculadoras/tip-calculator',
        destination: '/:locale/calculadoras/category/financial',
        permanent: true,
      },
      {
        source: '/:locale/rechner/day-counter',
        destination: '/:locale/rechner/category/math-science',
        permanent: true,
      },
      {
        source: '/:locale/calculatrices/molarity-calculator',
        destination: '/:locale/calculatrices/category/math-science',
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
        source: '/:locale/rechner/body-type-calculator',
        destination: '/:locale/rechner/category/health-fitness',
        permanent: true,
      },
      {
        source: '/:locale/calculadoras/electricity-calculator',
        destination: '/:locale/calculadoras/category/financial',
        permanent: true,
      },
      {
        source: '/:locale/calculatrices/pythagorean-theorem-calculator',
        destination: '/:locale/calculatrices/category/math-science',
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
        source: '/de/werkzeuge/next.js-discussions',
        destination: '/de/werkzeuge',
        permanent: true,
      },
      {
        source: '/:locale/calculators/random-number-generator',
        destination: '/:locale/tools/random-number-generator',
        permanent: true,
      }
    ];
  },
};

export default withSerwist(withNextIntl(nextConfig));
