import { Metadata } from 'next';

const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = '/database-privacy/projects';
  return {
    title: 'Projects & Environments | Nexus DataPrivacy',
    description: 'Organize your data privacy work into projects. Manage Production, Staging, and Development environments with separate database connections, masking rules, and job configurations.',
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { 'x-default': `${baseUrl}/en${path}` },
    },
    openGraph: {
      title: 'Projects & Environments — Nexus DataPrivacy',
      description: 'Organize anonymization work by project and environment (Production, Staging, Dev).',
      url: `${baseUrl}/${locale}${path}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: 'Projects & Environments | Nexus DataPrivacy' },
  };
}
