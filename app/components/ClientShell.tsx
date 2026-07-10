'use client';

/**
 * ClientShell — non-critical UI floaters, lazy-loaded after hydration.
 *
 * WHY THIS FILE EXISTS:
 * `ssr: false` in next/dynamic is forbidden in Server Components (Next.js 15 App Router).
 * The pattern is to move dynamic() calls with ssr:false into a Client Component boundary.
 * This component wraps only the utility overlays (CommandPalette, InstallPrompt, etc.)
 * that are NOT needed for the initial paint — deferring their JS bundles entirely until
 * after the critical UI is interactive, improving TBT and FCP scores.
 */

import dynamic from 'next/dynamic';

const CommandPalette = dynamic(
  () => import('./CommandPalette').then((m) => m.CommandPalette),
  { ssr: false, loading: () => null }
);
const InstallPrompt = dynamic(
  () => import('./InstallPrompt').then((m) => m.InstallPrompt),
  { ssr: false, loading: () => null }
);
const BackToTop = dynamic(
  () => import('./BackToTop').then((m) => m.BackToTop),
  { ssr: false, loading: () => null }
);
const CookieBanner = dynamic(
  () => import('./CookieBanner').then((m) => m.CookieBanner),
  { ssr: false, loading: () => null }
);

export function ClientShell() {
  return (
    <>
      <CommandPalette />
      <InstallPrompt />
      <BackToTop />
      <CookieBanner />
    </>
  );
}
