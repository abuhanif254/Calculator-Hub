import React from "react";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "@/lib/data/calculators";
import { CalculatorViewWrapper } from "@/app/components/CalculatorViewWrapper";
import { EmbedFrameWrapper } from "@/app/components/EmbedFrameWrapper";
import { setRequestLocale } from 'next-intl/server';
import { routing } from "@/i18n/routing";

// Fully static SSG pre-rendering — no on-demand SSR overhead or DYNAMIC_SERVER_USAGE errors.
export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { slug: string; locale: string }[] = [];
  const seen = new Set<string>();

  routing.locales.forEach((locale) => {
    calculators.forEach((calc) => {
      const isExplicitlyMapped = `/calculators/${calc.slug}` in routing.pathnames;
      const localizedSlug = calc.slugs?.[locale as keyof typeof calc.slugs];

      // Always add the English (canonical) slug so the base route works
      const enKey = `${locale}::${calc.slug}`;
      if (!seen.has(enKey)) {
        seen.add(enKey);
        params.push({ slug: calc.slug, locale });
      }

      // Add localized slug if mapped
      if (isExplicitlyMapped && localizedSlug && localizedSlug !== calc.slug) {
        const localKey = `${locale}::${localizedSlug}`;
        if (!seen.has(localKey)) {
          seen.add(localKey);
          params.push({ slug: localizedSlug, locale });
        }
      }
    });
  });

  return params;
}

export default async function EmbedCalculatorPage({ 
  params,
}: { 
  params: Promise<{ locale: string, slug: string }>;
}) {
  const resolvedParams = await params;
  setRequestLocale(resolvedParams.locale);
  
  const calc = getCalculatorBySlug(resolvedParams.slug);
  if (!calc) {
    notFound();
  }

  const calcTitle = calc.translations?.[resolvedParams.locale]?.title || calc.title;
  const canonicalUrl = `https://www.nexuscalculator.net/${resolvedParams.locale}/calculators/${calc.slug}`;

  return (
    <EmbedFrameWrapper
      calcTitle={calcTitle}
      canonicalUrl={canonicalUrl}
    >
      <CalculatorViewWrapper calcDef={calc} locale={resolvedParams.locale} />
    </EmbedFrameWrapper>
  );
}
