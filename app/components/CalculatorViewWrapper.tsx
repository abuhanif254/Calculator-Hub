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

  console.log("[DEBUG WRAPPER RENDER] slug:", calcDef.slug, "Component state:", Component ? "Loaded" : "Null");

  useEffect(() => {
    // Retrieve the dynamic component strictly on the client side after mounting
    const LoadedComponent = getCalculatorComponent(calcDef.slug);
    console.log("[DEBUG WRAPPER EFFECT] slug:", calcDef.slug, "Loaded Component:", LoadedComponent ? (LoadedComponent.displayName || LoadedComponent.name || "Unnamed") : "None");
    setComponent(() => LoadedComponent);
  }, [calcDef.slug]);

  if (!Component) {
    // Return a loading placeholder/skeleton during Server-Side Rendering (SSR)
    return (
      <div className="w-full h-[280px] sm:h-[400px] animate-pulse bg-slate-50 dark:bg-slate-800/20 rounded-3xl border border-slate-200/60 dark:border-slate-800 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-full border-4 border-blue-500/10 border-t-blue-500 animate-spin" />
        <span className="text-sm font-semibold text-slate-400 dark:text-slate-500">
          Loading calculator...
        </span>
      </div>
    );
  }

  // overflow-x-hidden prevents any individual calculator from causing
  // horizontal scroll on the page. w-full ensures it fills the content area.
  return (
    <div className="w-full overflow-x-hidden">
      <Component calcDef={calcDef} locale={locale} />
    </div>
  );
}
