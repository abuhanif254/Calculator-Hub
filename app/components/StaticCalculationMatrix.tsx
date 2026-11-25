"use client";

import React, { useState } from "react";
import { Table, ArrowUpRight, Check, Sparkles } from "lucide-react";
import type { MatrixRow } from "@/lib/data/matrices/types";

export interface ResolvedStaticMatrix {
  title: string;
  description: string;
  headers: string[];
  rows: MatrixRow[];
}

interface StaticCalculationMatrixProps {
  matrix: ResolvedStaticMatrix | null;
  locale?: string;
}

const matrixTranslations: Record<string, {
  quickRef: string;
  interactivePresets: string;
  actionCol: string;
  rowTitleTip: string;
  loadAction: string;
  loadedAction: string;
  clickTip: string;
}> = {
  en: {
    quickRef: "Quick Reference Matrix",
    interactivePresets: "Interactive Presets",
    actionCol: "Action",
    rowTitleTip: "Click to calculate with these values",
    loadAction: "Load",
    loadedAction: "Loaded!",
    clickTip: "Click any row to test these numbers in the interactive calculator above.",
  },
  es: {
    quickRef: "Matriz de Referencia Rápida",
    interactivePresets: "Preajustes Interactivos",
    actionCol: "Acción",
    rowTitleTip: "Haga clic para calcular con estos valores",
    loadAction: "Cargar",
    loadedAction: "¡Cargado!",
    clickTip: "Haga clic en cualquier fila para probar estos números en la calculadora interactiva.",
  },
  fr: {
    quickRef: "Matrice de Référence Rapide",
    interactivePresets: "Préréglages Interactifs",
    actionCol: "Action",
    rowTitleTip: "Cliquez pour calculer avec ces valeurs",
    loadAction: "Charger",
    loadedAction: "Chargé !",
    clickTip: "Cliquez sur une ligne pour charger ces valeurs dans la calculatrice ci-dessus.",
  },
  de: {
    quickRef: "Schnellübersicht-Tabelle",
    interactivePresets: "Interaktive Vorlagen",
    actionCol: "Aktion",
    rowTitleTip: "Klicken Sie, um mit diesen Werten zu rechnen",
    loadAction: "Laden",
    loadedAction: "Geladen!",
    clickTip: "Klicken Sie auf eine Zeile, um diese Werte im interaktiven Rechner zu testen.",
  },
};

function toCamelCase(key: string): string {
  return key.replace(/_([a-z])/g, (_, ch: string) => ch.toUpperCase());
}

const PARAM_KEY_ALIASES: Record<string, string[]> = {
  home_value: ["homePrice", "propertyPrice", "purchasePrice"],
  down_payment: ["downPayment"],
  loan_amount: ["loanAmount", "principal", "amount"],
  interest_rate: ["interestRate", "rate", "apr"],
  loan_term: ["loanTerm", "years", "term"],
  loan_term_months: ["loanTermMonths", "months", "termMonths"],
  initial_deposit: ["initialDeposit", "principal", "startingAmount"],
  annual_addition: ["annualAddition", "annualContribution", "monthlyContribution"],
  monthly_income: ["monthlyIncome", "grossMonthlyIncome", "income"],
  monthly_debt: ["monthlyDebt", "totalMonthlyDebt", "debt"],
};

export function StaticCalculationMatrix({
  matrix,
  locale = "en",
}: StaticCalculationMatrixProps) {
  const [activeRow, setActiveRow] = useState<number | null>(null);

  if (!matrix) return null;

  const t = matrixTranslations[locale] || matrixTranslations.en;

  const handleLoadRow = (rowIndex: number, params: Record<string, string>) => {
    if (typeof window === "undefined") return;

    setActiveRow(rowIndex);
    setTimeout(() => setActiveRow(null), 2000);

    const container = document.getElementById("calculator-export-target");
    if (!container) return;

    const elements = container.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      "input, select, textarea"
    );

    Object.entries(params).forEach(([paramKey, paramValue]) => {
      const candidateKeys = [
        paramKey,
        toCamelCase(paramKey),
        ...(PARAM_KEY_ALIASES[paramKey] || []),
      ];

      let matchedEl: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null = null;

      for (const candidate of candidateKeys) {
        if (matchedEl) break;
        try {
          matchedEl = container.querySelector(`#${CSS.escape(candidate)}`);
        } catch {
          matchedEl = null;
        }
        if (!matchedEl) {
          try {
            matchedEl = container.querySelector(`[name="${CSS.escape(candidate)}"]`);
          } catch {
            matchedEl = null;
          }
        }
      }

      if (!matchedEl) {
        const lowerSet = new Set(candidateKeys.map((k) => k.toLowerCase()));
        for (let i = 0; i < elements.length; i++) {
          const el = elements[i];
          if (
            (el.id && lowerSet.has(el.id.toLowerCase())) ||
            (el.name && lowerSet.has(el.name.toLowerCase()))
          ) {
            matchedEl = el;
            break;
          }
        }
      }

      if (matchedEl) {
        if (matchedEl instanceof HTMLInputElement && (matchedEl.type === "checkbox" || matchedEl.type === "radio")) {
          const isChecked = paramValue === "true" || paramValue === "1" || matchedEl.value === paramValue;
          const checkedSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "checked")?.set;
          if (checkedSetter) {
            checkedSetter.call(matchedEl, isChecked);
          } else {
            matchedEl.checked = isChecked;
          }
          matchedEl.dispatchEvent(new Event("change", { bubbles: true }));
        } else {
          const proto =
            matchedEl instanceof HTMLSelectElement
              ? window.HTMLSelectElement.prototype
              : matchedEl instanceof HTMLTextAreaElement
              ? window.HTMLTextAreaElement.prototype
              : window.HTMLInputElement.prototype;

          const setter = Object.getOwnPropertyDescriptor(proto, "value")?.set;
          if (setter) {
            setter.call(matchedEl, paramValue);
          } else {
            matchedEl.value = paramValue;
          }
          matchedEl.dispatchEvent(new Event("input", { bubbles: true }));
          matchedEl.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }
    });

    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([k, v]) => searchParams.set(k, v));
    const newUrl = `${window.location.pathname}?${searchParams.toString()}${window.location.hash}`;
    window.history.replaceState({ ...window.history.state }, "", newUrl);

    container.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      aria-label={matrix.title}
      className="mt-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm print:hidden"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] flex items-center justify-center shrink-0">
            <Table className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#518231] dark:text-[#6fa844]">
              {t.quickRef}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              {matrix.title}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5 text-[#518231] dark:text-[#6fa844]" />
          <span>{t.interactivePresets}</span>
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
        {matrix.description}
      </p>

      {/* Semantic HTML Table for Search Engine Web Crawlers & Position-0 Featured Snippets */}
      <div className="table-scroll-wrapper overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <caption className="sr-only">{matrix.title}</caption>
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-800/60 text-slate-900 dark:text-slate-200 font-bold">
              {matrix.headers.map((header, idx) => (
                <th key={idx} scope="col" className="p-3 sm:p-4 font-semibold whitespace-nowrap">
                  {header}
                </th>
              ))}
              <th scope="col" className="p-3 sm:p-4 text-right whitespace-nowrap">
                {t.actionCol}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {matrix.rows.map((row, rIdx) => {
              const isLoaded = activeRow === rIdx;
              return (
                <tr
                  key={rIdx}
                  onClick={() => handleLoadRow(rIdx, row.params)}
                  className="hover:bg-emerald-50/40 dark:hover:bg-[#518231]/10 cursor-pointer transition-colors group"
                  title={t.rowTitleTip}
                >
                  <th
                    scope="row"
                    className="p-3 sm:p-4 font-bold text-slate-900 dark:text-white whitespace-nowrap group-hover:text-[#518231] dark:group-hover:text-[#6fa844] transition-colors"
                  >
                    {row.label}
                  </th>
                  {row.values.map((val, vIdx) => (
                    <td
                      key={vIdx}
                      className="p-3 sm:p-4 text-slate-700 dark:text-slate-300 font-medium whitespace-nowrap"
                    >
                      {val}
                    </td>
                  ))}
                  <td className="p-3 sm:p-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoadRow(rIdx, row.params);
                      }}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-xs ${
                        isLoaded
                          ? "bg-[#436a28] text-white shadow-[#436a28]/20"
                          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#518231] hover:text-[#518231] dark:hover:text-[#6fa844]"
                      }`}
                    >
                      {isLoaded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{t.loadedAction}</span>
                        </>
                      ) : (
                        <>
                          <span>{t.loadAction}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 italic">
        {t.clickTip}
      </p>
    </section>
  );
}
