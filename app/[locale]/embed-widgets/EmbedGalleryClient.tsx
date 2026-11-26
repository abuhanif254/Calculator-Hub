"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Copy, Check, Code2, Search } from "lucide-react";

const EmbedCalculatorModal = dynamic(
  () => import("@/app/components/EmbedCalculatorModal").then((m) => m.EmbedCalculatorModal),
  { ssr: false }
);

export interface EmbedWidgetCardItem {
  slug: string;
  title: string;
  description: string;
  categoryKey: "finance" | "health" | "electrical" | "science";
  canonicalUrl: string;
  formula?: string;
}

interface EmbedGalleryClientProps {
  locale: string;
  items: EmbedWidgetCardItem[];
}

const CLIENT_COPY: Record<
  string,
  {
    searchPlaceholder: string;
    allCategories: string;
    catLabels: Record<EmbedWidgetCardItem["categoryKey"], string>;
    customizeBtn: string;
    quickCopyBtn: string;
    copiedBtn: string;
    viewCalcLink: string;
    poweredBy: string;
    noResults: string;
  }
> = {
  en: {
    searchPlaceholder: "Filter embeddable widgets (e.g. mortgage, BMI, solar, concrete)...",
    allCategories: "All Widgets",
    catLabels: {
      finance: "Finance & Real Estate",
      health: "Health & Fitness",
      electrical: "Electrical & Solar",
      science: "Construction, Math & Tech",
    },
    customizeBtn: "Preview & Customize",
    quickCopyBtn: "Copy <iframe>",
    copiedBtn: "Copied!",
    viewCalcLink: "Open full tool",
    poweredBy: "Powered by",
    noResults: "No widgets matched your filter. Try clearing the search box.",
  },
  es: {
    searchPlaceholder: "Filtrar widgets incrustables (ej. hipoteca, IMC, solar, hormigón)...",
    allCategories: "Todos",
    catLabels: {
      finance: "Finanzas e Inmobiliaria",
      health: "Salud y Fitness",
      electrical: "Electricidad y Solar",
      science: "Construcción, Mate y Redes",
    },
    customizeBtn: "Vista Previa y Ajustes",
    quickCopyBtn: "Copiar <iframe>",
    copiedBtn: "¡Copiado!",
    viewCalcLink: "Abrir calculadora",
    poweredBy: "Desarrollado por",
    noResults: "No se encontraron widgets para esa búsqueda.",
  },
  fr: {
    searchPlaceholder: "Filtrer les widgets intégrables (ex. prêt, IMC, solaire, béton)...",
    allCategories: "Tous",
    catLabels: {
      finance: "Finance & Immobilier",
      health: "Santé & Sport",
      electrical: "Électricité & Solaire",
      science: "Travaux, Maths & Réseau",
    },
    customizeBtn: "Aperçu & Personnaliser",
    quickCopyBtn: "Copier <iframe>",
    copiedBtn: "Copié !",
    viewCalcLink: "Ouvrir l’outil",
    poweredBy: "Propulsé par",
    noResults: "Aucun widget ne correspond à cette recherche.",
  },
  de: {
    searchPlaceholder: "Widgets filtern (z. B. Hypothek, BMI, Solar, Beton, Strom)...",
    allCategories: "Alle Widgets",
    catLabels: {
      finance: "Finanzen & Immobilien",
      health: "Gesundheit & Fitness",
      electrical: "Elektro & Photovoltaik",
      science: "Bau, Mathe & Netzwerk",
    },
    customizeBtn: "Vorschau & Anpassen",
    quickCopyBtn: "<iframe> kopieren",
    copiedBtn: "Kopiert!",
    viewCalcLink: "Rechner öffnen",
    poweredBy: "Bereitgestellt von",
    noResults: "Keine passenden Widgets gefunden.",
  },
};

export function EmbedGalleryClient({ locale, items }: EmbedGalleryClientProps) {
  const t = CLIENT_COPY[locale] || CLIENT_COPY.en;
  const [selectedCat, setSelectedCat] = useState<"all" | EmbedWidgetCardItem["categoryKey"]>("all");
  const [query, setQuery] = useState("");
  const [activeModal, setActiveModal] = useState<EmbedWidgetCardItem | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (selectedCat !== "all" && item.categoryKey !== selectedCat) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.slug.includes(q)
      );
    });
  }, [items, selectedCat, query]);

  const handleQuickCopy = async (item: EmbedWidgetCardItem) => {
    const embedUrl = `https://www.nexuscalculator.net/${locale}/embed/calculators/${item.slug}`;
    const safeTitle = item.title.replace(/"/g, "&quot;");
    const snippet = `<iframe src="${embedUrl}" width="100%" height="650" loading="lazy" frameborder="0" style="border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 4px 6px -1px rgb(0 0 0 / 0.1);" title="${safeTitle}"></iframe>\n<p style="font-size:11px;color:#64748b;margin-top:6px;text-align:right;">${t.poweredBy} <a href="${item.canonicalUrl}" target="_blank" rel="noopener" style="color:#518231;font-weight:600;text-decoration:underline;">${item.title} — NexusCalculator</a></p>`;
    try {
      await navigator.clipboard.writeText(snippet);
      setCopiedSlug(item.slug);
      setTimeout(() => setCopiedSlug(null), 2200);
    } catch {
      setActiveModal(item);
    }
  };

  const categoryKeys: Array<"all" | EmbedWidgetCardItem["categoryKey"]> = [
    "all",
    "finance",
    "health",
    "electrical",
    "science",
  ];

  return (
    <div className="space-y-8">
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-wrap gap-2">
          {categoryKeys.map((key) => {
            const active = selectedCat === key;
            const label = key === "all" ? `${t.allCategories} (${items.length})` : t.catLabels[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedCat(key)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  active
                    ? "bg-[#518231] text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="relative md:w-80 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#518231]"
          />
        </div>
      </div>

      {/* Widget Cards Grid */}
      {filtered.length === 0 ? (
        <div className="p-10 text-center rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-500 dark:text-slate-400">
          {t.noResults}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const isCopied = copiedSlug === item.slug;
            return (
              <article
                key={item.slug}
                className="flex flex-col justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-[#518231]/40 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#518231]/10 text-[#518231] dark:text-[#6fa844]">
                      {t.catLabels[item.categoryKey]}
                    </span>
                    <a
                      href={item.canonicalUrl}
                      className="text-xs font-medium text-slate-500 hover:text-[#518231] dark:text-slate-400 dark:hover:text-[#6fa844] transition-colors"
                    >
                      {t.viewCalcLink} →
                    </a>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
                    {item.description}
                  </p>
                  {item.formula && (
                    <div className="text-[11px] font-mono bg-slate-50 dark:bg-slate-950 border border-slate-200/70 dark:border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-700 dark:text-slate-300 truncate mb-4">
                      {item.formula}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setActiveModal(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#518231] hover:bg-[#436a28] text-white text-xs font-semibold transition-colors"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{t.customizeBtn}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickCopy(item)}
                    className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-colors ${
                      isCopied
                        ? "bg-emerald-50 dark:bg-emerald-900/30 border-[#518231] text-[#518231] dark:text-[#6fa844]"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#518231]"
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? t.copiedBtn : t.quickCopyBtn}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {activeModal && (
        <EmbedCalculatorModal
          isOpen={Boolean(activeModal)}
          onClose={() => setActiveModal(null)}
          slug={activeModal.slug}
          title={activeModal.title}
          locale={locale}
          canonicalUrl={activeModal.canonicalUrl}
        />
      )}
    </div>
  );
}
