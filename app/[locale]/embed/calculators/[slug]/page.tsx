import React from "react";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "@/lib/data/calculators";
import { CalculatorViewWrapper } from "@/app/components/CalculatorViewWrapper";
import { setRequestLocale } from 'next-intl/server';
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  const params: { slug: string; locale: string }[] = [];

  routing.locales.forEach((locale) => {
    calculators.forEach((calc) => {
      let slugToUse = calc.slug;
      if (calc.slugs && calc.slugs[locale as keyof typeof calc.slugs]) {
        const isExplicitlyMapped = `/calculators/${calc.slug}` in routing.pathnames;
        if (isExplicitlyMapped) {
          slugToUse = calc.slug;
        } else {
          slugToUse = calc.slugs[locale as keyof typeof calc.slugs];
        }
      }
      params.push({ slug: slugToUse, locale });
    });
  });

  return params;
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

export const dynamicParams = false;
