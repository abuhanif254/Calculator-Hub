import { Metadata } from 'next';

const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = '/database-privacy/jobs/history';
  return {
    title: 'Job Execution History | Nexus DataPrivacy',
    description: 'View complete history of all anonymization, masking, and scanning jobs. Filter by date, type, status, and connection. Expandable logs for each job run.',
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { 'x-default': `${baseUrl}/en${path}` },
    },
    openGraph: {
      title: 'Job Execution History — Nexus DataPrivacy',
      description: 'Complete audit trail of all data privacy jobs with full execution logs.',
      url: `${baseUrl}/${locale}${path}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: 'Job Execution History | Nexus DataPrivacy' },
  };
}
