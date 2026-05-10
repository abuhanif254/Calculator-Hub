import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';
  return {
    name: 'Nexus Calculator — Calculators & Developer Tools',
    short_name: 'Nexus',
    description: 'The ultimate ecosystem for calculators and professional developer tools — financial, health, math, code formatters, and more.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#518231',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
