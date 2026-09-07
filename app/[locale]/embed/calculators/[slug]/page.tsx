import React from "react";
import { notFound } from "next/navigation";
import { getCalculatorBySlug } from "@/lib/data/calculators";
import { CalculatorViewWrapper } from "@/app/components/CalculatorViewWrapper";
import { setRequestLocale } from 'next-intl/server';
import { ExternalLink } from "lucide-react";

export const dynamicParams = true;

export function generateStaticParams() {
  return []; // On-demand generation for embed widgets
}

export default async function EmbedCalculatorPage({ 
  params,
  searchParams,
}: { 
  params: Promise<{ locale: string, slug: string }>;
  searchParams?: Promise<{ theme?: string; hideHeader?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  setRequestLocale(resolvedParams.locale);
  
  const calc = getCalculatorBySlug(resolvedParams.slug);
  if (!calc) {
    notFound();
  }

  const isDarkMode = resolvedSearchParams.theme === "dark";
  const hideHeader = resolvedSearchParams.hideHeader === "true";
  const canonicalUrl = `https://www.nexuscalculator.net/${resolvedParams.locale}/calculators/${calc.slug}`;

  return (
    <div className={`w-full h-full min-h-screen ${isDarkMode ? "dark bg-slate-950 text-slate-100" : "bg-white text-slate-900"} p-2 sm:p-4 font-sans antialiased`}>
      {!hideHeader && (
        <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#518231]" />
            <h1 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
              {calc.translations?.[resolvedParams.locale]?.title || calc.title}
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

      <div className="w-full">
        <CalculatorViewWrapper calcDef={calc} locale={resolvedParams.locale} />
      </div>

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
