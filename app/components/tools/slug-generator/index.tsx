"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Copy, Download, Settings, History, Trash2, Code, Link as LinkIcon, CheckCircle, Type, LayoutList, Check, AlertTriangle, ArrowRight
} from "lucide-react";
import { 
  generateSlug, generateBulkSlugs, calculateSeoScore, SlugOptions, defaultSlugOptions,
  downloadFile, generateCmsSnippets
} from "./utils";

export function SlugGeneratorTool() {
  const [input, setInput] = useState<string>("");
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [options, setOptions] = useState<SlugOptions>(defaultSlugOptions);
  const [customSeparator, setCustomSeparator] = useState<string>("");
  
  const [history, setHistory] = useState<{timestamp: number, text: string}[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"generator" | "snippets">("generator");

  // Output states
  const [singleSlug, setSingleSlug] = useState<string>("");
  const [bulkSlugs, setBulkSlugs] = useState<string[]>([]);
  
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Load history from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('slug-generator-history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  // Save history to local storage
  const saveToHistory = useCallback((text: string) => {
    if (!text.trim() || text.length < 3) return;
    
    setHistory(prev => {
      // Don't save duplicate consecutive entries
      if (prev.length > 0 && prev[0].text === text) return prev;
      
      const newEntry = { timestamp: Date.now(), text };
      const updated = [newEntry, ...prev].slice(0, 10);
      try {
        localStorage.setItem('slug-generator-history', JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save history", e);
      }
      return updated;
    });
  }, []);

  // Real-time processing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mode === "single") {
        setSingleSlug(generateSlug(input, options));
      } else {
        setBulkSlugs(generateBulkSlugs(input, options));
      }
      // Save to history automatically if it's substantial
      if (input.trim().length > 5) {
        saveToHistory(input);
      }
    }, 400); // Debounce

    return () => clearTimeout(timer);
  }, [input, mode, options, saveToHistory]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleCopy = async (text: string, key: string) => {
    if (!text) return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
        showToast("Copied to clipboard!");
      }
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  const handleCopyBulk = (format: 'raw' | 'json' | 'csv' = 'raw') => {
    if (bulkSlugs.length === 0) return;
    let text = "";
    if (format === 'json') {
      text = JSON.stringify(bulkSlugs, null, 2);
    } else if (format === 'csv') {
      text = bulkSlugs.join(",");
    } else {
      text = bulkSlugs.join("\n");
    }
    handleCopy(text, 'all');
  };

  const handleDownload = (format: 'txt' | 'json' | 'csv' = 'txt') => {
    if (bulkSlugs.length === 0) return;
    
    let content = "";
    let type = "text/plain";
    
    if (format === 'json') {
      content = JSON.stringify(bulkSlugs, null, 2);
      type = "application/json";
    } else if (format === 'csv') {
      content = bulkSlugs.join(",");
      type = "text/csv";
    } else {
      content = bulkSlugs.join("\n");
    }
    
    downloadFile(content, `slugs.${format}`, type);
    showToast(`Downloaded as ${format.toUpperCase()}!`);
  };

  const handleSeparatorChange = (type: string, val: string) => {
    if (type === 'custom') {
      setCustomSeparator(val);
      setOptions(prev => ({ ...prev, separator: val }));
    } else {
      setCustomSeparator("");
      setOptions(prev => ({ ...prev, separator: val }));
    }
  };

  const seoData = useMemo(() => calculateSeoScore(singleSlug), [singleSlug]);
  const snippets = generateCmsSnippets();

  return (
    <div className="w-full flex flex-col gap-6">
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2 bg-[#518231] text-white rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          {toast}
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button 
          onClick={() => setActiveTab("generator")}
          className={`px-6 py-3 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${activeTab === "generator" ? "border-[#518231] text-[#518231]" : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"}`}
        >
          <Type size={16} /> Generator
        </button>
        <button 
          onClick={() => setActiveTab("snippets")}
          className={`px-6 py-3 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${activeTab === "snippets" ? "border-[#518231] text-[#518231]" : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"}`}
        >
          <Code size={16} /> Developer Snippets
        </button>
      </div>

      {activeTab === "generator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
          
          {/* Main Input Column */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setMode("single")}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 ${mode === "single" ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                  >
                    <Type size={14} /> Single Line
                  </button>
                  <button 
                    onClick={() => setMode("bulk")}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors flex items-center gap-1.5 ${mode === "bulk" ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                  >
                    <LayoutList size={14} /> Bulk Mode
                  </button>
                </div>
                {input.length > 0 && (
                  <button onClick={() => setInput("")} className="text-xs text-slate-400 hover:text-red-500 transition-colors">Clear</button>
                )}
              </div>
              
              <div className="p-4 bg-slate-50/30 dark:bg-slate-900/30">
                {mode === "single" ? (
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a title, sentence, or phrase to slugify..."
                    className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-medium focus:outline-none focus:border-[#518231] dark:focus:border-[#518231] transition-colors shadow-sm"
                  />
                ) : (
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter multiple lines of text here...\nLine 1\nLine 2"
                    className="w-full h-40 px-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 font-mono text-sm focus:outline-none focus:border-[#518231] dark:focus:border-[#518231] transition-colors shadow-sm custom-scrollbar resize-y"
                  />
                )}
              </div>
            </div>

            {/* Output Panel */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[200px]">
              <div className="px-4 py-3 bg-white dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center flex-wrap gap-2">
                <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 text-sm">
                  <ArrowRight size={16} className="text-[#518231]" /> 
                  {mode === "single" ? "Generated Slug" : `Generated Slugs (${bulkSlugs.length})`}
                </h3>
                
                {mode === "bulk" && bulkSlugs.length > 0 && (
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleCopyBulk('raw')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded text-xs font-medium transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-600">
                      <Copy size={14} /> Copy All
                    </button>
                    <button onClick={() => handleDownload('txt')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded text-xs font-medium transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-600">
                      <Download size={14} /> Download
                    </button>
                  </div>
                )}
              </div>
              
              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                {!input ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 h-full py-8">
                    <Type size={32} className="mb-2 opacity-50" />
                    <p className="text-sm font-medium">Waiting for input...</p>
                  </div>
                ) : mode === "single" ? (
                  <div className="space-y-4">
                    <div className="relative group">
                      <div className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-[#518231] dark:text-[#7ab056] font-mono font-bold text-lg break-all shadow-inner">
                        {singleSlug || <span className="text-slate-300 dark:text-slate-600 italic font-normal">Empty slug</span>}
                      </div>
                      {singleSlug && (
                        <button 
                          onClick={() => handleCopy(singleSlug, 'single')}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white dark:bg-slate-800 text-slate-400 hover:text-[#518231] rounded-md shadow-sm border border-slate-200 dark:border-slate-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        >
                          {copiedKey === 'single' ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                      )}
                    </div>
                    
                    {singleSlug && (
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <LinkIcon size={12} /> URL Preview
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-mono break-all bg-slate-50 dark:bg-slate-950 p-2 rounded">
                          https://example.com/blog/<span className="font-bold text-slate-900 dark:text-white">{singleSlug}</span>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden flex-1 shadow-inner max-h-[400px]">
                    {bulkSlugs.length > 0 ? (
                      <div className="overflow-y-auto custom-scrollbar h-full max-h-[400px] p-2 space-y-1">
                        {bulkSlugs.map((slug, idx) => (
                          <div key={idx} className="flex justify-between items-center group px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded">
                            <span className="font-mono text-sm text-[#518231] dark:text-[#7ab056] break-all mr-2">{slug}</span>
                            <button 
                              onClick={() => handleCopy(slug, `bulk-${idx}`)}
                              className="text-slate-400 hover:text-[#518231] opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              {copiedKey === `bulk-${idx}` ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="p-4 text-sm font-mono text-slate-500">No slugs generated.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* History System */}
            {history.length > 0 && (
               <div className="pt-2">
                 <div className="flex items-center justify-between mb-3">
                   <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                     <History size={16} className="text-slate-400" /> Recent Inputs
                   </h3>
                   <button onClick={() => { setHistory([]); localStorage.removeItem('slug-generator-history'); }} className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1">
                     <Trash2 size={12} /> Clear
                   </button>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {history.map((h, i) => (
                     <button 
                       key={i}
                       onClick={() => { setInput(h.text); setMode(h.text.includes('\n') ? 'bulk' : 'single'); }}
                       className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:border-[#518231] hover:text-[#518231] transition-colors truncate max-w-[200px]"
                       title={h.text}
                     >
                       {h.text}
                     </button>
                   ))}
                 </div>
               </div>
            )}

          </div>

          {/* Options Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* SEO Score Card */}
            {mode === "single" && input && (
              <div className={`rounded-xl p-5 border ${
                seoData.status === 'good' ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800/50' : 
                seoData.status === 'warning' ? 'bg-amber-50 border-amber-200 dark:bg-amber-900/10 dark:border-amber-800/50' : 
                'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/50'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className={`text-sm font-bold flex items-center gap-2 ${
                    seoData.status === 'good' ? 'text-emerald-700 dark:text-emerald-400' : 
                    seoData.status === 'warning' ? 'text-amber-700 dark:text-amber-400' : 
                    'text-red-700 dark:text-red-400'
                  }`}>
                    {seoData.status === 'good' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                    SEO Analysis
                  </h3>
                  <div className={`text-2xl font-black ${
                    seoData.status === 'good' ? 'text-emerald-600 dark:text-emerald-500' : 
                    seoData.status === 'warning' ? 'text-amber-600 dark:text-amber-500' : 
                    'text-red-600 dark:text-red-500'
                  }`}>
                    {seoData.score}
                  </div>
                </div>
                <p className={`text-xs font-medium mb-4 ${
                  seoData.status === 'good' ? 'text-emerald-600 dark:text-emerald-500' : 
                  seoData.status === 'warning' ? 'text-amber-600 dark:text-amber-500' : 
                  'text-red-600 dark:text-red-500'
                }`}>
                  {seoData.message}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white/60 dark:bg-slate-950/50 p-2 rounded-lg border border-white/50 dark:border-slate-800">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Characters</p>
                    <p className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">{seoData.length}</p>
                  </div>
                  <div className="bg-white/60 dark:bg-slate-950/50 p-2 rounded-lg border border-white/50 dark:border-slate-800">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Words</p>
                    <p className="text-sm font-mono font-bold text-slate-800 dark:text-slate-200">{seoData.words}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-6">
               <div>
                 <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 mb-3">
                   <Settings size={16} className="text-[#518231]" /> Separator
                 </h3>
                 <div className="grid grid-cols-2 gap-2 mb-2">
                   {[
                     { id: '-', label: 'Hyphen (-)' },
                     { id: '_', label: 'Underscore (_)' },
                     { id: '.', label: 'Dot (.)' },
                   ].map((sep) => (
                     <button
                       key={sep.id}
                       onClick={() => handleSeparatorChange('preset', sep.id)}
                       className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors ${
                         options.separator === sep.id && customSeparator === ""
                           ? 'bg-white dark:bg-slate-800 border-[#518231] text-[#518231] shadow-sm' 
                           : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                       }`}
                     >
                       {sep.label}
                     </button>
                   ))}
                   <div className="relative">
                     <input
                       type="text"
                       value={customSeparator}
                       onChange={(e) => handleSeparatorChange('custom', e.target.value)}
                       placeholder="Custom"
                       className={`w-full h-full px-3 py-2 rounded-lg text-xs font-bold border transition-colors focus:outline-none ${
                         customSeparator !== "" 
                           ? 'bg-white dark:bg-slate-800 border-[#518231] text-[#518231] shadow-sm' 
                           : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 focus:border-[#518231]'
                       }`}
                     />
                   </div>
                 </div>
               </div>

               <div>
                 <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3">Formatting Rules</h3>
                 <div className="space-y-3">
                   {[
                     { id: 'lowercase', label: 'Force Lowercase', desc: 'Convert all characters to lowercase' },
                     { id: 'uppercase', label: 'Force Uppercase', desc: 'Overrides lowercase if checked' },
                     { id: 'removeSpecialChars', label: 'Strip Special Chars', desc: 'Remove non-alphanumeric chars' },
                     { id: 'removeNumbers', label: 'Remove Numbers', desc: 'Strip digits 0-9' },
                     { id: 'removeEmojis', label: 'Remove Emojis', desc: 'Clean out unicode emojis' },
                     { id: 'collapseSeparators', label: 'Collapse Separators', desc: 'Prevent multiple e.g. "a--b"' },
                   ].map((opt) => (
                     <label key={opt.id} className="flex items-start gap-3 cursor-pointer group">
                       <div className={`w-5 h-5 mt-0.5 shrink-0 rounded border flex items-center justify-center transition-colors ${
                         options[opt.id as keyof SlugOptions] 
                           ? 'bg-[#518231] border-[#518231]' 
                           : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-[#518231]'
                       }`}>
                         {options[opt.id as keyof SlugOptions] && <Check size={14} className="text-white" />}
                       </div>
                       <div>
                         <span className="text-sm font-medium text-slate-800 dark:text-slate-200 block">
                           {opt.label}
                         </span>
                         <span className="text-xs text-slate-500 dark:text-slate-400 block">
                           {opt.desc}
                         </span>
                       </div>
                       <input 
                         type="checkbox"
                         className="hidden"
                         checked={Boolean(options[opt.id as keyof SlugOptions])}
                         onChange={() => setOptions(prev => {
                           const newVal = !prev[opt.id as keyof SlugOptions];
                           const newOpts = { ...prev, [opt.id]: newVal };
                           // Handle mutually exclusive cases gracefully
                           if (opt.id === 'uppercase' && newVal) newOpts.lowercase = false;
                           if (opt.id === 'lowercase' && newVal) newOpts.uppercase = false;
                           return newOpts;
                         })}
                       />
                     </label>
                   ))}
                 </div>
               </div>
            </div>

          </div>

        </div>
      )}

      {activeTab === "snippets" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {Object.entries(snippets).map(([key, snippet]) => (
            <div key={key} className="bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-800 flex flex-col">
              <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                <span className="font-bold text-slate-200 text-sm">{snippet.label}</span>
                <button 
                  onClick={() => handleCopy(snippet.code, `code-${key}`)}
                  className="text-slate-400 hover:text-[#518231] transition-colors"
                >
                  {copiedKey === `code-${key}` ? <Check size={14} className="text-[#518231]" /> : <Copy size={14} />}
                </button>
              </div>
              <div className="p-4 overflow-x-auto custom-scrollbar flex-1">
                <pre className="text-sm font-mono text-green-400">
                  <code>{snippet.code}</code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
