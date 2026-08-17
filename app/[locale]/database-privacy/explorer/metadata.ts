import { Metadata } from 'next';

const baseUrl = process.env.APP_URL || 'https://www.nexuscalculator.net';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = '/database-privacy/explorer';
  return {
    title: 'Database Schema Explorer | Nexus DataPrivacy',
    description: 'Browse and explore your database schema structure. View tables, columns, data types, and PII risk assessments. Instantly identify sensitive data columns across your databases.',
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { 'x-default': `${baseUrl}/en${path}` },
    },
    openGraph: {
      title: 'Database Schema Explorer — Nexus DataPrivacy',
      description: 'Visually explore your database schema with PII risk assessment per column.',
      url: `${baseUrl}/${locale}${path}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: 'Database Schema Explorer | Nexus DataPrivacy' },
  };
}
