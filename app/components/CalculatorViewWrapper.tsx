"use client";

import React, { useState, useEffect, ComponentType } from "react";
import { getCalculatorComponent } from "@/lib/componentRegistry";
import { CalculatorDef } from "@/lib/types";

interface CalculatorViewWrapperProps {
  calcDef: CalculatorDef;
  locale?: string;
}

export function CalculatorViewWrapper({ calcDef, locale }: CalculatorViewWrapperProps) {
  const [Component, setComponent] = useState<ComponentType<any> | null>(null);

  useEffect(() => {
    // Retrieve the dynamic component strictly on the client side after mounting
    const LoadedComponent = getCalculatorComponent(calcDef.slug);
    setComponent(() => LoadedComponent);
  }, [calcDef.slug]);

  if (!Component) {
    // Return a loading placeholder/skeleton during Server-Side Rendering (SSR)
    return (
      <div className="w-full h-[400px] animate-pulse bg-slate-50 dark:bg-slate-800/20 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500/10 border-t-blue-500 animate-spin" />
        <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
          Loading calculator...
        </span>
      </div>
    );
  }

  return <Component calcDef={calcDef} locale={locale} />;
}
