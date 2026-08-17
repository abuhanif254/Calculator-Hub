import { Metadata } from 'next';

const baseUrl = process.env.APP_URL || 'https://www.nexuscalculator.net';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const path = '/database-privacy/organizations';
  return {
    title: 'Organization Management | Nexus DataPrivacy',
    description: 'Manage your organization settings, members, and usage statistics. View plan details, connected databases, and monthly job usage for your data privacy platform.',
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: { 'x-default': `${baseUrl}/en${path}` },
    },
    openGraph: {
      title: 'Organization Management — Nexus DataPrivacy',
      description: 'Manage team members, view usage stats, and configure organization-level settings.',
      url: `${baseUrl}/${locale}${path}`,
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: 'Organization Management | Nexus DataPrivacy' },
  };
}
