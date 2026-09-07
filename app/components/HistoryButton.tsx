"use client";

import React, { useState, useEffect } from "react";
import { History } from "lucide-react";
import { getCalculationHistory } from "../../lib/utils/calculationHistory";
import { CalculationHistoryDrawer } from "./CalculationHistoryDrawer";

interface HistoryButtonProps {
  slug: string;
  title: string;
  locale?: string;
  containerId?: string;
}

const historyLabels: Record<string, { label: string; tooltip: string }> = {
  en: { label: "History", tooltip: "View calculation history & compare scenarios" },
  es: { label: "Historial", tooltip: "Ver historial de cálculos y comparar escenarios" },
  fr: { label: "Historique", tooltip: "Voir l'historique des calculs et comparer les scénarios" },
  de: { label: "Verlauf", tooltip: "Berechnungsverlauf anzeigen und Szenarien vergleichen" },
};

export function HistoryButton({
  slug,
  title,
  locale = "en",
  containerId = "calculator-export-target",
}: HistoryButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);
  const text = historyLabels[locale] || historyLabels.en;

  const updateCount = () => {
    const items = getCalculationHistory(slug);
    setCount(items.length);
  };

  useEffect(() => {
    updateCount();
    const handleUpdate = () => updateCount();
    window.addEventListener("nexus_history_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("nexus_history_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [slug]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#518231] dark:hover:border-[#6fa844] hover:text-[#518231] dark:hover:text-[#6fa844] transition-all shadow-sm group"
        title={text.tooltip}
        aria-label={text.tooltip}
      >
        <History size={14} className="group-hover:rotate-[-20deg] transition-transform" />
        <span>{text.label}</span>
        {count > 0 && (
          <span className="ml-0.5 px-1.5 py-0.5 bg-[#518231]/15 text-[#518231] dark:text-[#6fa844] rounded-full text-[11px] font-bold leading-none">
            {count}
          </span>
        )}
      </button>

      <CalculationHistoryDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        calcSlug={slug}
        calcTitle={title}
        containerId={containerId}
      />
    </>
  );
}
