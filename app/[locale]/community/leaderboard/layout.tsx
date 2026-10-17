import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { getCanonicalAndAlternates } = await import('@/lib/utils/seoUtils');
  return {
    title: 'Community Leaderboard | NexusCalculator',
    description: 'Explore the top contributors and reputation rankings in the NexusCalculator developer community.',
    robots: { index: true, follow: true },
    alternates: getCanonicalAndAlternates('/community/leaderboard', locale),
  };
}

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
