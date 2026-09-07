"use client";

import React, { useState } from "react";
import { Code2 } from "lucide-react";
import { EmbedCalculatorModal } from "./EmbedCalculatorModal";

interface EmbedButtonProps {
  slug: string;
  title: string;
  locale?: string;
}

const embedLabels: Record<string, { label: string; tooltip: string }> = {
  en: { label: "Embed", tooltip: "Embed this calculator on your website or blog" },
  es: { label: "Incrustar", tooltip: "Incruste esta calculadora en su sitio web o blog" },
  fr: { label: "Intégrer", tooltip: "Intégrez cette calculatrice sur votre site web" },
  de: { label: "Einbetten", tooltip: "Diesen Rechner auf Ihrer Website einbinden" },
};

export function EmbedButton({ slug, title, locale = "en" }: EmbedButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const text = embedLabels[locale] || embedLabels.en;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#518231] dark:hover:border-[#6fa844] hover:text-[#518231] dark:hover:text-[#6fa844] transition-all shadow-sm"
        title={text.tooltip}
        aria-label={text.tooltip}
      >
        <Code2 size={14} />
        <span>{text.label}</span>
      </button>

      <EmbedCalculatorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        slug={slug}
        title={title}
        locale={locale}
      />
    </>
  );
}
