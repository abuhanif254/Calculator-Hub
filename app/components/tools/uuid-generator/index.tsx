"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Copy, Download, RefreshCw, Settings, CheckCircle, AlertTriangle, FileText,
  Code, History, Trash2, Box, Layers, Hash
} from "lucide-react";
import { 
  generateBulkUuids, UuidVersion, FormatOptions, validateUuid, 
  copyToClipboard, downloadFile, generateSnippets 
} from "./utils";

export function UuidGeneratorTool() {
  const [version, setVersion] = useState<UuidVersion>("v4");
  const [amount, setAmount] = useState<number>(1);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [options, setOptions] = useState<FormatOptions>({
    uppercase: false,
    removeHyphens: false,
    addBraces: false,
    addQuotes: false
  });
  
  const [results, setResults] = useState<string[]>([]);
  const [history, setHistory] = useState<{timestamp: number, uuids: string[]}[]>([]);
  
  const [toast, setToast] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | 'all' | null>(null);
  
  const [activeTab, setActiveTab] = useState<"generator" | "snippets" | "validator">("generator");
  const [validationInput, setValidationInput] = useState<string>("");

  // Load history from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('uuid-generator-history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  // Save history to local storage
  const saveToHistory = useCallback((uuids: string[]) => {
    const newEntry = { timestamp: Date.now(), uuids };
    setHistory(prev => {
      const updated = [newEntry, ...prev].slice(0, 10); // Keep last 10
      try {
        localStorage.setItem('uuid-generator-history', JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save history", e);
      }
      return updated;
    });
  }, []);

  // Generate UUIDs
  const handleGenerate = useCallback(() => {
    const count = amount === -1 ? (parseInt(customAmount) || 1) : amount;
    const uuids = generateBulkUuids(version, count, options);
    setResults(uuids);
    saveToHistory(uuids);
  }, [version, amount, customAmount, options, saveToHistory]);

  // Generate on initial mount
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleCopy = async (text: string, index: number | 'all') => {
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
      showToast(index === 'all' ? "Copied all to clipboard!" : "Copied to clipboard!");
    }
  };

  const handleCopyAll = (format: 'raw' | 'json' | 'csv' = 'raw') => {
    let text = "";
    if (format === 'json') {
      text = JSON.stringify(results, null, 2);
    } else if (format === 'csv') {
      text = results.join(",");
    } else {
      text = results.join("\\n");
    }
    handleCopy(text, 'all');
  };

  const handleDownload = (format: 'txt' | 'json' | 'csv' = 'txt') => {
    if (results.length === 0) return;
    
    let content = "";
    let type = "text/plain";
    
    if (format === 'json') {
      content = JSON.stringify(results, null, 2);
      type = "application/json";
    } else if (format === 'csv') {
      content = results.join(",");
      type = "text/csv";
    } else {
      content = results.join("\\n");
    }
    
    downloadFile(content, `uuids_${version}.${format}`, type);
    showToast(`Downloaded as ${format.toUpperCase()}!`);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('uuid-generator-history');
    showToast("History cleared");
  };

  const snippets = generateSnippets(version);

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
          <Hash size={16} /> Generator
        </button>
        <button 
          onClick={() => setActiveTab("validator")}
          className={`px-6 py-3 text-sm font-semibold transition-colors flex items-center gap-2 border-b-2 ${activeTab === "validator" ? "border-[#518231] text-[#518231]" : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"}`}
        >
          <CheckCircle size={16} /> Validator
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
          
          {/* Controls Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Version Selection */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
               <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                 <Box size={16} className="text-[#518231]" /> UUID Version
               </h3>
               <div className="grid grid-cols-2 gap-2">
                 {(['v1', 'v4', 'v6', 'v7'] as UuidVersion[]).map((v) => (
                   <button
                     key={v}
                     onClick={() => setVersion(v)}
                     className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                       version === v 
                         ? 'bg-white dark:bg-slate-800 border-[#518231] text-[#518231] shadow-sm' 
                         : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                     }`}
                   >
                     Version {v.replace('v', '')}
                   </button>
                 ))}
               </div>
               <p className="text-xs text-slate-500 dark:text-slate-400">
                 {version === 'v4' ? 'Randomly generated (Most Common)' :
                  version === 'v1' ? 'Time and MAC address based' :
                  version === 'v6' ? 'Time-ordered (v1 compatible)' :
                  'Time-ordered random (Recommended for DB keys)'}
               </p>
            </div>

            {/* Amount Selection */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
               <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                 <Layers size={16} className="text-[#518231]" /> Generate Amount
               </h3>
               <div className="grid grid-cols-3 gap-2">
                 {[1, 10, 100].map((amt) => (
                   <button
                     key={amt}
                     onClick={() => { setAmount(amt); setCustomAmount(""); }}
                     className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                       amount === amt 
                         ? 'bg-[#518231] border-[#518231] text-white shadow-sm' 
                         : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                     }`}
                   >
                     {amt}
                   </button>
                 ))}
               </div>
               <div className="flex items-center gap-2 mt-2">
                 <button
                   onClick={() => setAmount(-1)}
                   className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors shrink-0 ${
                     amount === -1 
                       ? 'bg-[#518231] border-[#518231] text-white shadow-sm' 
                       : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                   }`}
                 >
                   Custom
                 </button>
                 <input 
                   type="number"
                   min="1"
                   max="10000"
                   disabled={amount !== -1}
                   value={customAmount}
                   onChange={e => setCustomAmount(e.target.value)}
                   placeholder="Max 10k"
                   className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:border-[#518231] transition-colors disabled:opacity-50"
                 />
               </div>
            </div>

            {/* Formatting Options */}
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
               <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                 <Settings size={16} className="text-[#518231]" /> Formatting Options
               </h3>
               <div className="space-y-3">
                 {[
                   { id: 'uppercase', label: 'Uppercase (A-F)' },
                   { id: 'removeHyphens', label: 'Remove Hyphens (-)' },
                   { id: 'addBraces', label: 'Add Braces {}' },
                   { id: 'addQuotes', label: 'Add Quotes ""' }
                 ].map((opt) => (
                   <label key={opt.id} className="flex items-center gap-3 cursor-pointer group">
                     <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                       options[opt.id as keyof FormatOptions] 
                         ? 'bg-[#518231] border-[#518231]' 
                         : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-[#518231]'
                     }`}>
                       {options[opt.id as keyof FormatOptions] && <CheckCircle size={14} className="text-white" />}
                     </div>
                     <span className="text-sm font-medium text-slate-700 dark:text-slate-300 select-none">
                       {opt.label}
                     </span>
                     <input 
                       type="checkbox"
                       className="hidden"
                       checked={options[opt.id as keyof FormatOptions]}
                       onChange={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id as keyof FormatOptions] }))}
                     />
                   </label>
                 ))}
               </div>
            </div>

            <button 
              onClick={handleGenerate}
              className="w-full py-3.5 bg-[#518231] hover:bg-[#436b28] text-white rounded-xl font-bold shadow-sm shadow-[#518231]/20 transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} /> Generate UUIDs
            </button>

          </div>

          {/* Results Column */}
          <div className="lg:col-span-8 flex flex-col gap-4">
             <div className="flex items-center justify-between">
               <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                 Generated Results <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">{results.length}</span>
               </h3>
               
               {results.length > 0 && (
                 <div className="flex items-center gap-2">
                   <div className="relative group">
                     <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-medium transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700">
                       <Copy size={14} /> Copy As...
                     </button>
                     <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
                       <button onClick={() => handleCopyAll('raw')} className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">Raw List</button>
                       <button onClick={() => handleCopyAll('json')} className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700">JSON Array</button>
                       <button onClick={() => handleCopyAll('csv')} className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700">CSV String</button>
                     </div>
                   </div>
                   <div className="relative group">
                     <button className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-medium transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700">
                       <Download size={14} /> Download
                     </button>
                     <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
                       <button onClick={() => handleDownload('txt')} className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300">TXT File</button>
                       <button onClick={() => handleDownload('json')} className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700">JSON File</button>
                       <button onClick={() => handleDownload('csv')} className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-t border-slate-100 dark:border-slate-700">CSV File</button>
                     </div>
                   </div>
                 </div>
               )}
             </div>

             <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col max-h-[600px]">
                {results.length <= 100 ? (
                  <div className="overflow-y-auto custom-scrollbar p-2">
                    {results.map((uuid, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 hover:bg-white dark:hover:bg-slate-800 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm transition-all group">
                        <span className="font-mono text-sm sm:text-base text-slate-700 dark:text-slate-300 break-all">{uuid}</span>
                        <button 
                          onClick={() => handleCopy(uuid, idx)} 
                          className="text-slate-400 hover:text-[#518231] transition-colors p-1.5 opacity-0 group-hover:opacity-100 focus:opacity-100" 
                          title="Copy UUID"
                        >
                          {copiedIndex === idx ? <CheckCircle size={18} className="text-[#518231]" /> : <Copy size={18} />}
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <textarea 
                    readOnly
                    value={results.join('\\n')}
                    className="w-full h-full min-h-[400px] p-4 font-mono text-sm bg-transparent text-slate-700 dark:text-slate-300 outline-none resize-none custom-scrollbar"
                  />
                )}
             </div>

             {/* History Section */}
             {history.length > 0 && (
               <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                 <div className="flex items-center justify-between mb-3">
                   <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                     <History size={16} className="text-slate-400" /> Recent Generations
                   </h3>
                   <button onClick={clearHistory} className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1">
                     <Trash2 size={12} /> Clear
                   </button>
                 </div>
                 <div className="flex flex-wrap gap-2">
                   {history.map((h, i) => (
                     <button 
                       key={i}
                       onClick={() => { setResults(h.uuids); showToast("Restored from history"); }}
                       className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:border-[#518231] hover:text-[#518231] transition-colors"
                     >
                       {new Date(h.timestamp).toLocaleTimeString()} ({h.uuids.length})
                     </button>
                   ))}
                 </div>
               </div>
             )}
          </div>

        </div>
      )}

      {activeTab === "validator" && (
        <div className="max-w-3xl mx-auto w-full py-8 space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">UUID Validator</h2>
            <p className="text-slate-600 dark:text-slate-400">Paste a UUID below to check if it has a valid format.</p>
          </div>
          
          <div className="relative">
            <input 
              type="text"
              value={validationInput}
              onChange={e => setValidationInput(e.target.value)}
              placeholder="e.g., 123e4567-e89b-12d3-a456-426614174000"
              className="w-full px-4 py-4 text-lg font-mono bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-[#518231] dark:focus:border-[#518231] transition-colors shadow-sm"
            />
            {validationInput && (
              <button 
                onClick={() => setValidationInput("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>
          
          {validationInput && (
            <div className={`p-6 rounded-xl border-2 flex items-start gap-4 ${validateUuid(validationInput) ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800/50' : 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/50'}`}>
              {validateUuid(validationInput) ? (
                <CheckCircle className="text-emerald-500 shrink-0 mt-1" size={24} />
              ) : (
                <AlertTriangle className="text-red-500 shrink-0 mt-1" size={24} />
              )}
              <div>
                <h3 className={`text-lg font-bold ${validateUuid(validationInput) ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-700 dark:text-red-400'}`}>
                  {validateUuid(validationInput) ? 'Valid UUID Format' : 'Invalid UUID Format'}
                </h3>
                <p className={`mt-1 ${validateUuid(validationInput) ? 'text-emerald-600 dark:text-emerald-500' : 'text-red-600 dark:text-red-500'}`}>
                  {validateUuid(validationInput) 
                    ? "The provided string is a mathematically valid UUID." 
                    : "The provided string does not match the standard UUID specification (8-4-4-4-12 hexadecimal characters)."}
                </p>
                {validateUuid(validationInput) && (
                   <div className="mt-4 flex gap-2">
                     <span className="px-2 py-1 bg-white dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded text-xs font-mono font-bold border border-emerald-100 dark:border-emerald-800/50">
                       Length: {validationInput.replace(/[^a-fA-F0-9]/g, '').length} hex chars
                     </span>
                   </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "snippets" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {Object.entries(snippets).map(([key, snippet]) => (
            <div key={key} className="bg-slate-900 rounded-xl overflow-hidden shadow-sm border border-slate-800 flex flex-col">
              <div className="px-4 py-3 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                <span className="font-bold text-slate-200 text-sm">{snippet.label}</span>
                <button 
                  onClick={() => handleCopy(snippet.code, key as any)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <Copy size={14} />
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
