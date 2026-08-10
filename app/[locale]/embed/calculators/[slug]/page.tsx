import React from "react";
import { notFound } from "next/navigation";
import { getCalculatorBySlug } from "@/lib/data/calculators";
import { CalculatorViewWrapper } from "@/app/components/CalculatorViewWrapper";
import { setRequestLocale } from 'next-intl/server';
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return []; // Generate on demand for embeds
}

export default async function EmbedCalculatorPage({ 
  params 
}: { 
  params: Promise<{ locale: string, slug: string }> 
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  
  const calc = getCalculatorBySlug(resolvedParams.slug);
  if (!calc) {
    notFound();
  }

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-slate-800 pb-3">
        <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200">
          {calc.title}
        </h1>
        <a 
          href={`https://nexuscalculator.net/${resolvedParams.locale}/calculators/${calc.slug}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs font-semibold text-blue-500 hover:underline"
        >
          Powered by Nexus
        </a>
      </div>
      <CalculatorViewWrapper calcDef={calc} locale={resolvedParams.locale} />
    </div>
  );
}
