"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Calculator, Code, ArrowRight, Scale, Layers } from "lucide-react";
import { useLocale } from "next-intl";
import { useRouter } from "../../i18n/routing";

const searchUiStrings: Record<
  string,
  { placeholder: string; button: string; noMatch: string }
> = {
  en: {
    placeholder: "Search 350+ calculators, developer tools, comparisons...",
    button: "Search",
    noMatch: "No exact matches found. Press Enter to search all results.",
  },
  es: {
    placeholder: "Buscar más de 350 calculadoras, herramientas y comparaciones...",
    button: "Buscar",
    noMatch: "No se encontraron coincidencias exactas. Presione Enter para buscar.",
  },
  fr: {
    placeholder: "Rechercher plus de 350 calculatrices, outils et comparatifs...",
    button: "Rechercher",
    noMatch: "Aucun résultat exact. Appuyez sur Entrée pour tout rechercher.",
  },
  de: {
    placeholder: "Über 350 Rechner, Entwickler-Tools & Vergleiche durchsuchen...",
    button: "Suchen",
    noMatch: "Keine genauen Treffer. Drücken Sie Enter für alle Ergebnisse.",
  },
};

export function HomeSearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [tools, setTools] = useState<any[]>([]);
  const router = useRouter();
  const locale = useLocale();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ui = searchUiStrings[locale] || searchUiStrings.en;

  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.tools)) {
          const formattedTools = data.tools.map((t: any) => {
            const localizedName = t.titles?.[locale] || t.title;
            const searchBlob = [
              t.title,
              t.titles?.en,
              t.titles?.es,
              t.titles?.fr,
              t.titles?.de,
              t.category,
              ...(Array.isArray(t.keywords) ? t.keywords : []),
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

            return {
              name: localizedName,
              category: t.category,
              type: t.type,
              slug: t.slug,
              href: t.href,
              searchBlob,
            };
          });
          setTools(formattedTools);
        }
      })
      .catch((err) => console.error("Failed to load search index", err));
  }, [locale]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push({ pathname: "/search", query: { q: query.trim() } } as any);
      setIsFocused(false);
    }
  };

  const qLower = query.trim().toLowerCase();
  const filteredItems =
    qLower === ""
      ? []
      : tools
          .filter(
            (item) =>
              item.name.toLowerCase().includes(qLower) ||
              item.searchBlob.includes(qLower)
          )
          .slice(0, 8);

  const getPathnameForType = (type: string) => {
    if (type === "developer-tool" || type === "dev-tool") return "/tools/[slug]";
    if (type === "comparison") return "/compare/[slug]";
    if (type === "collection") return "/collections/[slug]";
    return "/calculators/[slug]";
  };

  return (
    <div ref={wrapperRef} className="relative w-full z-50">
      <form
        onSubmit={handleSearch}
        className="bg-white dark:bg-slate-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-slate-100 dark:border-slate-700 p-2 sm:p-4 flex items-center group focus-within:ring-2 focus-within:ring-[#518231]/50 transition-all"
      >
        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl group-focus-within:bg-[#518231]/10 transition-colors">
          <Search className="text-[#518231]" size={24} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder={ui.placeholder}
          className="flex-grow bg-transparent border-none focus:ring-0 text-base sm:text-xl px-4 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none w-full"
        />
        <button
          type="submit"
          className="hidden sm:block bg-[#518231] hover:bg-[#436a28] text-white px-6 py-3 rounded-xl font-semibold transition-colors shrink-0"
        >
          {ui.button}
        </button>
      </form>

      {isFocused && query.trim() !== "" && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50">
          {filteredItems.length > 0 ? (
            <ul className="max-h-[50dvh] overflow-y-auto overscroll-contain">
              {filteredItems.map((item, idx) => (
                <li key={idx}>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between border-b border-slate-50 dark:border-slate-700/50 last:border-0 transition-colors min-h-[56px]"
                    onClick={() => {
                      router.push({
                        pathname: getPathnameForType(item.type),
                        params: { slug: item.slug },
                      } as any);
                      setIsFocused(false);
                      setQuery("");
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg text-slate-500 dark:text-slate-400">
                        {item.type === "developer-tool" || item.type === "dev-tool" ? (
                          <Code size={18} />
                        ) : item.type === "comparison" ? (
                          <Scale size={18} />
                        ) : item.type === "collection" ? (
                          <Layers size={18} />
                        ) : (
                          <Calculator size={18} />
                        )}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          {item.category}
                        </div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 dark:text-slate-600" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-slate-500 dark:text-slate-400">
              {ui.noMatch}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
