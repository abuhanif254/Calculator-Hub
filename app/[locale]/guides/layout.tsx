import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { GuidesSidebar } from '@/app/components/GuidesSidebar';
import { GuidesMobileDrawer } from '@/app/components/GuidesMobileDrawer';

interface GuidesLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Documentation-style layout for all /guides/* pages.
 * 3-column structure: Left sidebar | Article | Right TOC panel
 *
 * On mobile/tablet (< lg): a sticky "Browse Guides" bar + slide-up bottom
 * drawer replaces the sidebar so users can navigate between guides.
 *
 * The right TOC panel is rendered as a reserved slot; each individual
 * guide page injects its own <GuidesTableOfContents /> into a portal
 * or passes it as a prop. For simplicity the sidebar is server-rendered;
 * TOC is client-rendered inside the article page itself.
 */
export default async function GuidesLayout({ children, params }: GuidesLayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="w-full max-w-[1400px] mx-auto">
      {/* ── Thin top border divider ─────────────────────────────────── */}
      <div className="border-b border-slate-100 dark:border-white/5 mb-0" />

      {/* ══════════════════════════════════════════════════════════════
          MOBILE DRAWER (< lg) — sticky trigger bar + slide-up sheet
          Rendered above the flex row so the sticky bar overlays content.
      ══════════════════════════════════════════════════════════════ */}
      <GuidesMobileDrawer />

      <div className="flex min-h-[calc(100vh-4rem)]">

        {/* ══════════════════════════════════════════════════════════════
            LEFT SIDEBAR — sticky, full-height, scrollable guide nav
            Only visible lg+. On mobile the drawer handles navigation.
        ══════════════════════════════════════════════════════════════ */}
        <div
          className="
            hidden lg:flex flex-col
            w-64 xl:w-72 shrink-0
            border-r border-slate-100 dark:border-white/5
            sticky top-[5.5rem] h-[calc(100vh-5.5rem)]
            overflow-hidden
            py-6
          "
        >
          <GuidesSidebar />
        </div>

        {/* ══════════════════════════════════════════════════════════════
            MAIN CONTENT — the page.tsx for each guide route
            On mobile, pt accounts for the sticky "Browse Guides" bar.
        ══════════════════════════════════════════════════════════════ */}
        <main
          id="guide-content"
          className="flex-1 min-w-0 py-6 px-4 sm:px-6 lg:py-10 lg:px-10 xl:px-14"
        >
          {children}
        </main>

      </div>
    </div>
  );
}
