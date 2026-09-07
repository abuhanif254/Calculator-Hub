"use client";

import React, { useState } from "react";
import { Share2 } from "lucide-react";
import { ShareCalculatorModal } from "./ShareCalculatorModal";

interface ShareButtonProps {
  slug: string;
  title: string;
  locale?: string;
  targetId?: string;
}

const shareLabels: Record<string, { label: string; tooltip: string }> = {
  en: { label: "Share", tooltip: "Share this calculation with customized numbers" },
  es: { label: "Compartir", tooltip: "Comparte este cálculo con tus números personalizados" },
  fr: { label: "Partager", tooltip: "Partagez ce calcul avec vos paramètres personnalisés" },
  de: { label: "Teilen", tooltip: "Diese Berechnung mit Ihren individuellen Werten teilen" },
};

export function ShareButton({
  slug,
  title,
  locale = "en",
  targetId = "calculator-export-target",
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const text = shareLabels[locale] || shareLabels.en;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#518231] dark:hover:border-[#6fa844] hover:text-[#518231] dark:hover:text-[#6fa844] transition-all shadow-sm"
        title={text.tooltip}
        aria-label={text.tooltip}
      >
        <Share2 size={14} />
        <span>{text.label}</span>
      </button>

      <ShareCalculatorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        slug={slug}
        title={title}
        locale={locale}
        targetId={targetId}
      />
    </>
  );
}
