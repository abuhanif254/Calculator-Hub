import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const baseUrl = process.env.APP_URL || 'https://calculatorcentral.com';
  return {
    name: 'CalculatorCentral',
    short_name: 'Calculators',
    description: 'Fast, accurate online calculators for financial, health, and math needs.',
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
