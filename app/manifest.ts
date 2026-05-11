import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Nexus — Calculators & Developer Tools',
    short_name: 'Nexus',
    description: 'The ultimate free ecosystem for calculators and professional developer tools — financial, health, math, code formatters, and more.',
    start_url: '/',
    id: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#518231',
    orientation: 'portrait-primary',
    categories: ['utilities', 'finance', 'education', 'developer', 'productivity'],
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
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'BMI Calculator',
        short_name: 'BMI',
        url: '/en/calculators/bmi-calculator',
        description: 'Calculate your Body Mass Index',
      },
      {
        name: 'Mortgage Calculator',
        short_name: 'Mortgage',
        url: '/en/calculators/mortgage-calculator',
        description: 'Calculate mortgage payments',
      },
      {
        name: 'JSON Formatter',
        short_name: 'JSON',
        url: '/en/tools/json-formatter',
        description: 'Format and validate JSON data',
      },
      {
        name: 'Percentage Calculator',
        short_name: 'Percent',
        url: '/en/calculators/percentage-calculator',
        description: 'Calculate percentages instantly',
      },
    ],
  };
}

