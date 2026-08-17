import { Metadata } from 'next';

const baseUrl = process.env.APP_URL || 'https://www.nexuscalculator.net';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = '/database-privacy/anonymize';
  return {
    title: 'Anonymize Data Online — Free Browser-Side Anonymization Tool | Nexus DataPrivacy',
    description: 'Anonymize your sensitive data directly in the browser. Supports CSV and JSON. Choose pseudonymization, generalization, suppression, or noise addition. Free, no upload needed.',
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { 'x-default': `${baseUrl}/en${path}` },
    },
    openGraph: {
      title: 'Free Data Anonymization Tool — Nexus DataPrivacy',
      description: 'Anonymize CSV and JSON data in your browser. No data leaves your device. GDPR-compliant anonymization strategies.',
      url: `${baseUrl}/${locale}${path}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: 'Free Browser-Side Data Anonymization Tool' },
  };
}
