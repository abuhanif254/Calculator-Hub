"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "@/i18n/routing";
import { Search, Calculator, Code, CalculatorIcon } from "lucide-react";
import { useLocale } from "next-intl";

interface SearchIndexTool {
  objectID: string;
  slug: string;
  title: string;
  description: string;
  type: string;
  category: string;
  href: string;
  keywords: string[];
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [tools, setTools] = useState<SearchIndexTool[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const locale = useLocale();

  // Load search index data when modal opens
  useEffect(() => {
    if (isOpen && tools.length === 0) {
      fetch('/search-index.json')
        .then(res => res.json())
        .then(data => {
          if (data && Array.isArray(data.tools)) {
            setTools(data.tools);
          }
        })
        .catch(err => console.error("Failed to load search index", err));
    }
  }, [isOpen, tools.length]);

  // Listen for custom event from other components
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-command-palette", handleOpen);
    return () => window.removeEventListener("open-command-palette", handleOpen);
  }, []);

  // Handle Ctrl+K / Cmd+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter tools based on query
  const filteredTools = tools
    .filter(tool => {
      const searchStr = `${tool.title} ${tool.category} ${tool.keywords.join(" ")}`.toLowerCase();
      return searchStr.includes(query.toLowerCase());
    })
    .slice(0, 10); // Limit to 10 results for performance and UI

  // Handle keyboard navigation within modal
  useEffect(() => {
    if (!isOpen) return;

    const handleModalKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredTools.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter" && filteredTools.length > 0) {
        e.preventDefault();
        navigateToTool(filteredTools[selectedIndex]);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleModalKeyDown);
    return () => window.removeEventListener("keydown", handleModalKeyDown);
  }, [isOpen, filteredTools, selectedIndex]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 10);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const navigateToTool = (tool: SearchIndexTool) => {
    setIsOpen(false);
    // Use the dynamic router push
    router.push({
      pathname: tool.type === 'developer-tool' ? '/tools/[slug]' : '/calculators/[slug]',
      params: { slug: tool.slug }
    } as any);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] sm:pt-[20vh] px-4">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center border-b border-slate-100 dark:border-slate-800 px-4">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 w-full bg-transparent border-0 py-4 px-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-0 text-lg"
            placeholder="Search calculators & tools..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="text-[10px] uppercase font-bold tracking-widest text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded"
          >
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
          {query.trim() === "" && (
            <div className="p-4 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Start typing to search...
            </div>
          )}

          {query.trim() !== "" && filteredTools.length === 0 && (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              No results found for "{query}". Try a different keyword.
            </div>
          )}

          {filteredTools.length > 0 && (
            <ul className="p-2 space-y-1">
              {filteredTools.map((tool, idx) => (
                <li key={tool.objectID}>
                  <button
                    onClick={() => navigateToTool(tool)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-left transition-colors ${
                      idx === selectedIndex 
                        ? 'bg-[#518231]/10 dark:bg-[#518231]/20 text-[#518231] dark:text-[#6fa844]' 
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      tool.type === 'developer-tool' 
                        ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' 
                        : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                    }`}>
                      {tool.type === 'developer-tool' ? <Code className="w-4 h-4" /> : <CalculatorIcon className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold truncate">{tool.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate opacity-80">
                        {tool.category}
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
