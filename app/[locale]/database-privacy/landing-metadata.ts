import type { Metadata } from 'next';

const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';

export const metadata: Metadata = {
  title: 'Enterprise Database Anonymizer — Free Data Privacy Platform | Nexus',
  description: 'Free enterprise-grade database anonymization platform. Scan for PII, apply masking rules, enforce GDPR/HIPAA/PCI-DSS compliance, and schedule automated jobs. No signup required.',
  keywords: [
    'free database anonymizer', 'data masking tool', 'PII masking', 'GDPR compliance tool',
    'HIPAA data masking', 'PCI-DSS anonymization', 'database privacy platform',
    'sensitive data scanner', 'SQL anonymizer', 'data pseudonymization',
    'enterprise data privacy free', 'data de-identification tool', 'synthetic data generator',
    'database security tool', 'data privacy compliance'
  ],
  openGraph: {
    title: 'Enterprise Database Anonymizer — Free Data Privacy Platform',
    description: 'Scan, mask, and anonymize sensitive database columns. GDPR · HIPAA · PCI-DSS compliance in one platform. Free forever.',
    url: `${baseUrl}/en/database-privacy`,
    siteName: 'Nexus DataPrivacy',
    type: 'website',
    images: [
      {
        url: `${baseUrl}/icons/icon-512x512.png`,
        width: 512,
        height: 512,
        alt: 'Enterprise Database Anonymizer Platform by Nexus',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Database Anonymizer — Free · GDPR · HIPAA · PCI-DSS',
    description: 'Scan, mask, and anonymize sensitive database columns. Free forever. No signup required.',
    images: [`${baseUrl}/icons/icon-512x512.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: `${baseUrl}/en/database-privacy`,
  },
};
