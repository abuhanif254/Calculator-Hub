import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { getCanonicalAndAlternates, optimizeSerpTitle } = await import('@/lib/utils/seoUtils');
  return {
    title: optimizeSerpTitle('Community Leaderboard', locale, 'page'),
    description: 'Explore the top contributors and reputation rankings in the NexusCalculator developer community.',
    robots: { index: true, follow: true },
    alternates: getCanonicalAndAlternates('/community/leaderboard', locale),
  };
}

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
