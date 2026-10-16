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
  verifiedLabel: string;
  variablesTitle: string;
  methodologyTitle: string;
  localizedMethodologyNote: (title: string) => string;
}> = {
  en: {
    badge: "Formula at a Glance",
    verifiedLabel: "Verified Formula",
    variablesTitle: "Key Formula Variables:",
    methodologyTitle: "Calculation Methodology:",
    localizedMethodologyNote: (title) =>
      `Enter your values into the ${title} fields below to compute instant, double-precision results.`,
  },
  es: {
    badge: "Fórmula de un Vistazo",
    verifiedLabel: "Fórmula Verificada",
    variablesTitle: "Variables Clave de la Fórmula:",
    methodologyTitle: "Metodología de Cálculo:",
    localizedMethodologyNote: (title) =>
      `Introduzca sus datos en los campos de ${title} a continuación para obtener resultados instantáneos con precisión matemática verificada.`,
  },
  fr: {
    badge: "Formule en un Coup d'Œil",
    verifiedLabel: "Formule Vérifiée",
    variablesTitle: "Variables Clés de la Formule :",
    methodologyTitle: "Méthodologie de Calcul :",
    localizedMethodologyNote: (title) =>
      `Saisissez vos valeurs dans les champs de ${title} ci-dessous pour obtenir des résultats instantanés avec une précision mathématique vérifiée.`,
  },
  de: {
    badge: "Formel auf einen Blick",
    verifiedLabel: "Geprüfte Formel",
    variablesTitle: "Wichtigste Formelvariablen:",
    methodologyTitle: "Berechnungsmethodik:",
    localizedMethodologyNote: (title) =>
      `Geben Sie Ihre Werte in die Felder des ${title} unten ein, um sofortige Ergebnisse mit geprüfter mathematischer Präzision zu berechnen.`,
  },
};

export function DirectAnswerCard({
  slug,
  title,
  locale = "en",
}: DirectAnswerCardProps) {
  const formulaDef = getFormulaForCalculator(slug);

  if (!formulaDef) return null;

  const t = directAnswerTranslations[locale] || directAnswerTranslations.en;
  const isEn = locale === "en";

  return (
    <section
      aria-label={`${title} — ${t.badge}`}
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
              {isEn ? formulaDef.name : title}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 shadow-xs">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#518231] dark:text-[#6fa844]" />
          <span>{t.verifiedLabel}</span>
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

      {/* Variables Grid (English uses detailed variable definitions; non-EN avoids untranslated English bleed) */}
      {isEn && formulaDef.variables.length > 0 && (
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
      <div className="text-xs text-slate-600 dark:text-slate-400 bg-emerald-50/50 dark:bg-[#518231]/5 p-3 rounded-xl border border-[#518231]/20 flex items-start gap-2">
        <ChevronRight className="w-4 h-4 text-[#518231] dark:text-[#6fa844] shrink-0 mt-0.5" />
        <span>
          <strong className="text-slate-900 dark:text-slate-200 font-semibold">
            {t.methodologyTitle}
          </strong>{" "}
          {isEn && formulaDef.stepByStep ? formulaDef.stepByStep : t.localizedMethodologyNote(title)}
        </span>
      </div>
    </section>
  );
}
