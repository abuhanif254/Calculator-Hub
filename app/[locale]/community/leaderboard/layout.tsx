import { Metadata } from 'next';

// Leaderboard page is thin UGC (user-generated rankings).
// Non-EN locales are identical content → "Duplicate, Google chose different canonical".
// noindex stops duplicate content signal while keeping the page accessible.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
