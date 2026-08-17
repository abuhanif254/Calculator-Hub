import { Metadata } from 'next';

const baseUrl = process.env.APP_URL || 'https://www.nexuscalculator.net';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = '/database-privacy/masking/rules';
  return {
    title: 'Data Masking Rules Builder — GDPR Anonymization | Nexus DataPrivacy',
    description: 'Build and manage custom data masking rules. Supports Hash SHA-256, Partial Mask, Full Redact, Synthetic Data, Format-Preserving Encryption. 8+ pre-built rules for GDPR, HIPAA, PCI-DSS.',
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { 'x-default': `${baseUrl}/en${path}` },
    },
    openGraph: {
      title: 'Data Masking Rules Builder — Nexus DataPrivacy',
      description: 'Create custom masking rules with live preview. GDPR, HIPAA, PCI-DSS compliant strategies.',
      url: `${baseUrl}/${locale}${path}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: 'Data Masking Rules Builder | Nexus DataPrivacy' },
  };
}
