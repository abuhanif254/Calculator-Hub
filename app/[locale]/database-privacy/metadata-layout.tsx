import type { Metadata } from 'next';

const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';

export const metadata: Metadata = {
  title: {
    default: 'Enterprise Database Anonymizer | Free Data Privacy Platform',
    template: '%s | DataPrivacy — Nexus'
  },
  description: 'Free enterprise-grade database anonymization platform. Mask PII, enforce GDPR/HIPAA/PCI-DSS compliance, scan for sensitive data, and schedule masking jobs — all from a single beautiful dashboard.',
  keywords: [
    'database anonymizer', 'data masking', 'PII masking', 'GDPR compliance tool',
    'HIPAA data masking', 'PCI-DSS anonymization', 'database privacy', 'free data anonymizer',
    'sensitive data scanner', 'SQL anonymizer', 'data pseudonymization', 'enterprise data privacy',
    'database privacy platform', 'data de-identification', 'synthetic data generator'
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
        alt: 'Enterprise Database Anonymizer Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise Database Anonymizer — Free Data Privacy Platform',
    description: 'Scan, mask, and anonymize sensitive database columns. GDPR · HIPAA · PCI-DSS ready.',
    images: [`${baseUrl}/icons/icon-512x512.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: `${baseUrl}/en/database-privacy`,
  },
};

// This is a pass-through layout — the actual shell is in the client layout below
export default function DatabasePrivacySEOLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
