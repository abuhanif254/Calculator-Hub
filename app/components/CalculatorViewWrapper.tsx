"use client";

import React, { useState, useEffect, ComponentType } from "react";
import { getCalculatorComponent } from "@/lib/componentRegistry";
import { CalculatorDef } from "@/lib/types";
import { ErrorBoundary } from "./platform/ui/ErrorBoundary";
import { useCalculatorStateSync } from "@/lib/hooks/useCalculatorUrlHydration";

interface CalculatorViewWrapperProps {
  calcDef: CalculatorDef;
  locale?: string;
}

const SSR_LABELS: Record<string, {
  paramsHeading: string;
  calculateBtn: string;
  resetBtn: string;
  liveEngineBadge: string;
  resultsReady: string;
}> = {
  en: {
    paramsHeading: "Input Parameters",
    calculateBtn: "Calculate Instant Result",
    resetBtn: "Reset",
    liveEngineBadge: "Real-Time Client-Side Calculation Engine",
    resultsReady: "Interactive results update automatically as you adjust inputs",
  },
  es: {
    paramsHeading: "Parámetros de Entrada",
    calculateBtn: "Calcular Resultado Instantáneo",
    resetBtn: "Restablecer",
    liveEngineBadge: "Motor de Cálculo en Tiempo Real en su Navegador",
    resultsReady: "Los resultados interactivos se actualizan automáticamente al ajustar los valores",
  },
  fr: {
    paramsHeading: "Paramètres d'Entrée",
    calculateBtn: "Calculer le Résultat Instantané",
    resetBtn: "Réinitialiser",
    liveEngineBadge: "Moteur de Calcul en Temps Réel dans le Navigateur",
    resultsReady: "Les résultats interactifs se mettent à jour automatiquement selon vos valeurs",
  },
  de: {
    paramsHeading: "Eingabeparameter",
    calculateBtn: "Ergebnis sofort berechnen",
    resetBtn: "Zurücksetzen",
    liveEngineBadge: "Echtzeit-Berechnungsmodul lokal im Browser",
    resultsReady: "Interaktive Ergebnisse aktualisieren sich automatisch bei jeder Eingabe",
  },
};

export function CalculatorViewWrapper({ calcDef, locale = "en" }: CalculatorViewWrapperProps) {
  const [Component, setComponent] = useState<ComponentType<any> | null>(null);

  // Automatically hydrates inputs from URL params on mount AND continuously syncs user inputs back to URL
  useCalculatorStateSync("calculator-export-target", calcDef.defaultValues);

  useEffect(() => {
    const LoadedComponent = getCalculatorComponent(calcDef.slug, calcDef.parentSlug);
    setComponent(() => LoadedComponent);
  }, [calcDef.slug, calcDef.parentSlug]);

  if (!Component) {
    const ui = SSR_LABELS[locale] || SSR_LABELS.en;
    const previewFields = (calcDef.fields || []).slice(0, 6);

    // Semantic SSR Form Preview: delivers 0ms LCP, zero English bleed, and exposes
    // accessible <label> + <input defaultValue> markup to first-wave HTML crawlers.
    return (
      <div
        className="w-full rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 sm:p-8 shadow-sm"
        aria-busy="true"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
          <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
            {ui.paramsHeading} — {calcDef.title}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {ui.liveEngineBadge}
          </span>
        </div>

        {previewFields.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {previewFields.map((field) => {
              const unitBadge =
                field.type === "currency"
                  ? "$"
                  : field.type === "percent"
                  ? "%"
                  : field.type === "years"
                  ? "yr"
                  : "";
              const initialVal =
                calcDef.defaultValues?.[field.id] !== undefined
                  ? calcDef.defaultValues[field.id]
                  : field.defaultValue;

              return (
                <div key={field.id} className="flex flex-col gap-1.5">
                  <label
                    htmlFor={`ssr-field-${field.id}`}
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                  >
                    {field.label}
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id={`ssr-field-${field.id}`}
                      type="text"
                      readOnly
                      defaultValue={String(initialVal ?? "")}
                      aria-label={field.label}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-3.5 py-2.5 text-sm font-medium text-slate-900 dark:text-slate-100"
                    />
                    {unitBadge && (
                      <span className="absolute right-3 text-xs font-bold text-slate-400">
                        {unitBadge}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="h-16 rounded-xl bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
            <div className="h-16 rounded-xl bg-slate-100 dark:bg-slate-800/60 animate-pulse" />
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#518231] text-white text-xs sm:text-sm font-bold shadow-sm">
            {ui.calculateBtn}
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {ui.resultsReady}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-hidden">
      <ErrorBoundary>
        <Component calcDef={calcDef} locale={locale} />
      </ErrorBoundary>
    </div>
  );
}
