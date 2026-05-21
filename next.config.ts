import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withSerwistInit from '@serwist/next';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const withSerwist = withSerwistInit({
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
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
  webpack: (config, { dev }) => {
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
    ];
  },
};

export default withSerwist(withNextIntl(nextConfig));
