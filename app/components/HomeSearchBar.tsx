"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Calculator, Code, ArrowRight } from "lucide-react";
import { useRouter, resolveIntlHref } from "../../i18n/routing";
import { sitemapCategories } from "../../lib/data/sitemapData";

// Extract all tools and categories
const allCalculators = sitemapCategories.flatMap(cat => 
  cat.links.map(link => ({ name: link, category: cat.title, type: "calculator" }))
);

const developerTools = [
  "JSON Formatter", "JSON Validator", "HTML Formatter", "CSS Beautifier", "JavaScript Beautifier",
  "XML Formatter", "Markdown Previewer", "SQL Formatter", "YAML Formatter", "CSV Viewer", "Diff Checker",
  "Base64 Encode", "Base64 Decode", "URL Encoder", "URL Decoder", "JWT Decoder", "Hash Generator",
  "MD5 Generator", "SHA256 Generator", "Password Generator", "HMAC Generator", "QR Code Generator",
  "UUID Generator", "Slug Generator", "Lorem Ipsum Generator", "Random Number Generator",
  "HEX to RGB", "RGB to HEX", "Color Picker", "Gradient Generator", "Meta Tag Generator",
  "Open Graph Generator", "CSS Minifier", "JS Minifier", "HTML Minifier"
].map(name => ({ name, category: "Developer Tools", type: "dev-tool" }));

const categories = sitemapCategories.map(cat => ({ name: cat.title, category: "Category", type: "category" }));

const allSearchableItems = [...allCalculators, ...developerTools, ...categories];

// Create slugs dynamically
const getHref = (item: any) => {
  if (item.type === "category") return "/sitemap";
  if (item.type === "dev-tool") return `/tools/${item.name.toLowerCase().replace(/ /g, '-')}`;
  
  let defaultSlug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  if (defaultSlug === "credit-cards-payoff-calculator") defaultSlug = "credit-cards-payoff";
  return `/calculators/${defaultSlug}`;
};

export function HomeSearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

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
      router.push({ pathname: '/search', query: { q: query.trim() } } as any);
      setIsFocused(false);
    }
  };

  const filteredItems = query.trim() === "" 
    ? [] 
    : allSearchableItems.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8);

  return (
    <div ref={wrapperRef} className="relative w-full z-50">
      <form onSubmit={handleSearch} className="bg-white dark:bg-slate-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-slate-100 dark:border-slate-700 p-2 sm:p-4 flex items-center group focus-within:ring-2 focus-within:ring-[#518231]/50 transition-all">
        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl group-focus-within:bg-[#518231]/10 transition-colors">
          <Search className="text-[#518231]" size={24} />
        </div>
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search calculators, developer tools, categories..." 
          className="flex-grow bg-transparent border-none focus:ring-0 text-lg sm:text-xl px-4 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 outline-none w-full"
        />
        <button type="submit" className="hidden sm:block bg-[#518231] hover:bg-[#436a28] text-white px-6 py-3 rounded-xl font-semibold transition-colors shrink-0">
          Search
        </button>
      </form>

      {isFocused && query.trim() !== "" && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-50">
          {filteredItems.length > 0 ? (
            <ul className="max-h-[400px] overflow-y-auto">
              {filteredItems.map((item, idx) => (
                <li key={idx}>
                  <button 
                    type="button"
                    className="w-full text-left px-6 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center justify-between border-b border-slate-50 dark:border-slate-700/50 last:border-0 transition-colors"
                    onClick={() => {
                      router.push(resolveIntlHref(getHref(item)));
                      setIsFocused(false);
                      setQuery("");
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-lg text-slate-500 dark:text-slate-400">
                        {item.type === 'dev-tool' ? <Code size={18} /> : item.type === 'category' ? <Search size={18} /> : <Calculator size={18} />}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">{item.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{item.category}</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 dark:text-slate-600" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-slate-500 dark:text-slate-400">
              No exact matches found. Press enter to search all results.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
