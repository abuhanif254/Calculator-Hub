import { Metadata } from 'next';

const baseUrl = process.env.APP_URL || 'https://www.nexuscalculator.net';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = '/database-privacy/scanner/findings';
  return {
    title: 'PII Scan Findings — Sensitive Data Discovery | Nexus DataPrivacy',
    description: 'Review all PII findings from your database scans. Filter by scan date, connection, PII type, and risk level. Apply masking rules to open findings. Track remediation status.',
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { 'x-default': `${baseUrl}/en${path}` },
    },
    openGraph: {
      title: 'PII Scan Findings — Nexus DataPrivacy',
      description: 'Review, filter, and remediate PII findings from all your database scans.',
      url: `${baseUrl}/${locale}${path}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: 'PII Scan Findings | Nexus DataPrivacy' },
  };
}
