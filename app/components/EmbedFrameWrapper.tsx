"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ExternalLink } from "lucide-react";

interface EmbedFrameWrapperProps {
  children: React.ReactNode;
  calcTitle: string;
  canonicalUrl: string;
}

function EmbedFrameInner({
  children,
  calcTitle,
  canonicalUrl,
}: EmbedFrameWrapperProps) {
  const searchParams = useSearchParams();
  const theme = searchParams?.get("theme");
  const hideHeader = searchParams?.get("hideHeader") === "true";
  const isDarkMode = theme === "dark";

  return (
    <div
      className={`w-full h-full min-h-screen ${
        isDarkMode ? "dark bg-slate-950 text-slate-100" : "bg-white text-slate-900"
      } p-2 sm:p-4 font-sans antialiased`}
    >
      {!hideHeader && (
        <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#518231]" />
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              {calcTitle}
            </h1>
          </div>
          <a
            href={canonicalUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#518231] dark:text-[#6fa844] hover:underline"
          >
            <span>Powered by Nexus Calculator</span>
            <ExternalLink size={12} />
          </a>
        </div>
      )}

      <div className="w-full">{children}</div>

      {hideHeader && (
        <div className="mt-3 text-right">
          <a
            href={canonicalUrl}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-[#518231] transition-colors"
          >
            <span>Powered by Nexus Calculator</span>
            <ExternalLink size={10} />
          </a>
        </div>
      )}
    </div>
  );
}

export function EmbedFrameWrapper(props: EmbedFrameWrapperProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full min-h-screen bg-white dark:bg-slate-950 p-4">
          <div className="w-full h-[280px] sm:h-[400px] animate-pulse bg-slate-100 dark:bg-slate-800/30 rounded-2xl flex flex-col items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full border-4 border-[#518231]/20 border-t-[#518231] animate-spin" />
            <span className="text-xs font-semibold text-slate-400">Loading embed calculator...</span>
          </div>
        </div>
      }
    >
      <EmbedFrameInner {...props} />
    </Suspense>
  );
}
