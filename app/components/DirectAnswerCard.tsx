import React from "react";
import { Calculator, CheckCircle2, ChevronRight } from "lucide-react";
import { getFormulaForCalculator } from "@/lib/data/calculatorFormulas";
import { StaticMathFormula } from "./StaticMathFormula";

interface DirectAnswerCardProps {
  slug: string;
  title: string;
  category?: string;
  locale?: string;
}

const directAnswerTranslations: Record<string, {
  badge: string;
  variablesTitle: string;
  methodologyTitle: string;
}> = {
  en: {
    badge: "Formula at a Glance",
    variablesTitle: "Key Formula Variables:",
    methodologyTitle: "Calculation Methodology:",
  },
  es: {
    badge: "Fórmula de un Vistazo",
    variablesTitle: "Variables Clave de la Fórmula:",
    methodologyTitle: "Metodología de Cálculo:",
  },
  fr: {
    badge: "Formule en un Coup d'Œil",
    variablesTitle: "Variables Clés de la Formule :",
    methodologyTitle: "Méthodologie de Calcul :",
  },
  de: {
    badge: "Formel auf einen Blick",
    variablesTitle: "Wichtigste Formelvariablen:",
    methodologyTitle: "Berechnungsmethodik:",
  },
};

export function DirectAnswerCard({
  slug,
  title,
  category,
  locale = "en",
}: DirectAnswerCardProps) {
  const formulaDef = getFormulaForCalculator(slug);

  if (!formulaDef) return null;

  const t = directAnswerTranslations[locale] || directAnswerTranslations.en;

  return (
    <section
      aria-label={`${title} Quick Answer & Mathematical Formula`}
      id="math-formula"
      className="mb-8 p-5 sm:p-6 bg-gradient-to-br from-slate-50 via-white to-emerald-50/20 dark:from-slate-900 dark:via-slate-900/90 dark:to-[#518231]/10 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-sm print:hidden"
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] flex items-center justify-center shrink-0">
            <Calculator className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#518231] dark:text-[#6fa844]">
              {t.badge}
            </span>
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-tight">
              {formulaDef.name}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#518231] dark:text-[#6fa844]" />
          <span>Verified Formula</span>
        </div>
      </div>

      {/* Featured KaTeX Equation Box */}
      <div className="bg-white dark:bg-slate-950/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-inner mb-4 flex items-center justify-center min-h-[64px]">
        <StaticMathFormula
          latex={formulaDef.latex || formulaDef.formula}
          fallback={formulaDef.formula}
          className="text-base sm:text-lg md:text-xl font-medium"
        />
      </div>

      {/* Variables Grid */}
      {formulaDef.variables.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            {t.variablesTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {formulaDef.variables.map((v) => (
              <div
                key={v.symbol}
                className="flex items-start gap-2 p-2 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-800"
              >
                <span className="font-bold text-[#518231] dark:text-[#6fa844] font-mono shrink-0">
                  {v.symbol}
                </span>
                <span className="text-slate-700 dark:text-slate-300 leading-snug">
                  <strong className="text-slate-900 dark:text-white font-semibold">
                    {v.name}:
                  </strong>{" "}
                  {v.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step-by-Step Methodology Snippet */}
      {formulaDef.stepByStep && (
        <div className="text-xs text-slate-600 dark:text-slate-400 bg-emerald-50/50 dark:bg-[#518231]/5 p-3 rounded-xl border border-[#518231]/20 flex items-start gap-2">
          <ChevronRight className="w-4 h-4 text-[#518231] dark:text-[#6fa844] shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-900 dark:text-slate-200 font-semibold">
              {t.methodologyTitle}
            </strong>{" "}
            {formulaDef.stepByStep}
          </span>
        </div>
      )}
    </section>
  );
}
