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
    ...(process.platform === 'win32' || process.env.CI_ENV === 'local' ? { cpus: 1 } : {}),
    optimizePackageImports: ['lucide-react', 'date-fns', 'chart.js', 'katex'],
  },
  async headers() {
    return [
      // ── Security headers for standard pages (exclude embed routes) ────────────
      {
        source: '/((?!.*embed).*)',
        headers: [
          { key: 'X-Content-Type-Options',   value: 'nosniff' },
          { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection',          value: '1; mode=block' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
      // ── PWA Manifest: prevent Google from trying to index JSON manifest as a webpage ──
      {
        source: '/manifest.webmanifest',
        headers: [
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      // ── Embed routes: allow iframe embedding on any website ───────────────────
      {
        source: '/:locale/embed/:path*',
        headers: [
          { key: 'X-Content-Type-Options',   value: 'nosniff' },
          { key: 'Content-Security-Policy',   value: "frame-ancestors *" },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        source: '/embed/:path*',
        headers: [
          { key: 'X-Content-Type-Options',   value: 'nosniff' },
          { key: 'Content-Security-Policy',   value: "frame-ancestors *" },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
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
      // ── OpenGraph images: generate on-demand when shared, cache 1yr at CDN edge ──
      {
        source: '/:path*/opengraph-image',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, s-maxage=31536000, stale-while-revalidate=31536000' },
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
  // NOTE: All canonical 301 redirects (non-www → www, cross-locale slug mapping,
  // legacy calculator/tool/guide aliases, deprecated calculators, and UTM stripping)
  // are handled atomically in middleware.ts in a single 1-hop 301 response.
};

export default withSerwist(withNextIntl(nextConfig));
