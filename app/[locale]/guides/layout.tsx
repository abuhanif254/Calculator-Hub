import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import { GuidesSidebar } from '@/app/components/GuidesSidebar';

interface GuidesLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Documentation-style layout for all /guides/* pages.
 * 3-column structure: Left sidebar | Article | Right TOC panel
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
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* ── Thin top border divider ─────────────────────────────────── */}
      <div className="border-b border-slate-100 dark:border-white/5 mb-0" />

      <div className="flex min-h-[calc(100vh-4rem)]">

        {/* ══════════════════════════════════════════════════════════════
            LEFT SIDEBAR — sticky, full-height, scrollable guide nav
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
        ══════════════════════════════════════════════════════════════ */}
        <main
          id="guide-content"
          className="flex-1 min-w-0 py-8 lg:py-10 lg:px-10 xl:px-14"
        >
          {children}
        </main>

      </div>
    </div>
  );
}
