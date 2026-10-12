import React from "react";
import { notFound } from "next/navigation";
import { calculators, getCalculatorBySlug } from "@/lib/data/calculators";
import { CalculatorViewWrapper } from "@/app/components/CalculatorViewWrapper";
import { EmbedFrameWrapper } from "@/app/components/EmbedFrameWrapper";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from "@/i18n/routing";
import { pickCalculatorMessages, toClientCalcDef } from "@/lib/utils/getCalculatorMessages";

// Render statically on first request and cache permanently at CDN edge (saves 716 build-time renders)
export const dynamic = 'force-static';
export const revalidate = false;

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

  const allMessages = (await getMessages()) as Record<string, any>;
  const calcMessages = pickCalculatorMessages(calc, allMessages);
  const clientCalc = toClientCalcDef(calc, resolvedParams.locale);

  const calcTitle = calc.translations?.[resolvedParams.locale]?.title || calc.title;
  const canonicalUrl = `https://www.nexuscalculator.net/${resolvedParams.locale}/calculators/${calc.slug}`;

  return (
    <EmbedFrameWrapper
      calcTitle={calcTitle}
      canonicalUrl={canonicalUrl}
    >
      <NextIntlClientProvider locale={resolvedParams.locale} messages={calcMessages}>
        <CalculatorViewWrapper calcDef={clientCalc} locale={resolvedParams.locale} />
      </NextIntlClientProvider>
    </EmbedFrameWrapper>
  );
}
