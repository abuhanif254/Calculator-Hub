"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Copy, Download, Trash2, ArrowRightLeft,
  AlertTriangle, FileText, MonitorDown, Plus, X, Link as LinkIcon
} from "lucide-react";
import {
  encodeUrlString, decodeUrlString, parseQueryParams,
  buildQueryString, copyToClipboard, downloadFile,
  countReservedChars
} from "../url-encoder/utils";
import type { EncodingMode } from "../url-encoder/utils";

type ToolMode = "encode" | "decode";

export function UrlDecoderTool() {
  const [mode, setMode] = useState<ToolMode>("decode");
  const [encodeMode, setEncodeMode] = useState<EncodingMode>("component");
  const [input, setInput] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Query Params Editor State
  const [queryParams, setQueryParams] = useState<{ key: string; value: string }[]>([]);

  const [toast, setToast] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("url_decoder_input");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.input !== undefined) setInput(parsed.input);
        if (parsed.mode) setMode(parsed.mode);
        if (parsed.encodeMode) setEncodeMode(parsed.encodeMode);
      } catch (e) {}
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("url_decoder_input", JSON.stringify({ input, mode, encodeMode }));
    }, 500);
    return () => clearTimeout(timer);
  }, [input, mode, encodeMode]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleCopy = async (text: string, key: string) => {
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
      showToast("Copied to clipboard!");
    }
  };

  const handleDownload = () => {
    if (!output) return;
    downloadFile(output, mode === "encode" ? "encoded_url.txt" : "decoded_url.txt");
    showToast("Downloaded text file!");
  };

  // Processing logic
  useEffect(() => {
    if (!input.trim()) {
      setOutput("");
      setError(null);
      setQueryParams([]);
      return;
    }

    if (mode === "encode") {
      const result = encodeUrlString(input, encodeMode);
      setOutput(result);
      setError(null);
    } else {
      const { text, error: decErr } = decodeUrlString(input, encodeMode);
      if (decErr) {
        setOutput("");
        setError(decErr);
      } else {
        setOutput(text);
        setError(null);
      }
    }

    // Auto parse query params from input
    // Only parse if it looks like it might contain query params, or just try it.
    const params = parseQueryParams(input);
    setQueryParams(params);
  }, [input, mode, encodeMode]);

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError(null);
    setQueryParams([]);
    localStorage.removeItem("url_decoder_input");
    showToast("Cleared");
  };

  const swapModes = () => {
    setMode(m => m === "encode" ? "decode" : "encode");
    if (output && !error) {
      setInput(output);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInput(text);
        showToast("Pasted from clipboard");
      }
    } catch {
      showToast("Could not paste from clipboard");
    }
  };

  // Query Params Editor functions
  const addQueryParam = () => {
    setQueryParams([...queryParams, { key: "", value: "" }]);
  };

  const removeQueryParam = (index: number) => {
    const newParams = [...queryParams];
    newParams.splice(index, 1);
    setQueryParams(newParams);
    syncQueryParamsToInput(newParams);
  };

  const updateQueryParam = (index: number, field: 'key' | 'value', val: string) => {
    const newParams = [...queryParams];
    newParams[index][field] = val;
    setQueryParams(newParams);
    syncQueryParamsToInput(newParams);
  };

  const syncQueryParamsToInput = (params: { key: string; value: string }[]) => {
    const queryString = buildQueryString(params);
    
    // We only update the query string portion of the input
    const qIndex = input.indexOf('?');
    const hIndex = input.indexOf('#');
    
    let base = input;
    let hash = '';
    
    if (qIndex !== -1) {
      base = input.substring(0, qIndex);
    } else if (hIndex !== -1) {
      base = input.substring(0, hIndex);
    }
    
    if (hIndex !== -1) {
      hash = input.substring(hIndex);
    }

    if (queryString) {
      setInput(`${base}?${queryString}${hash}`);
    } else if (qIndex !== -1) {
      setInput(`${base}${hash}`);
    }
  };

  // Stats
  const inputStats = useMemo(() => {
    return {
      chars: input.length,
      reserved: countReservedChars(input)
    };
  }, [input]);

  const outputStats = useMemo(() => {
    return {
      chars: output.length
    };
  }, [output]);

  return (
    <div className="w-full flex flex-col gap-4">
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2 bg-[#518231] text-white rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          {toast}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex items-center">
            <button onClick={() => setMode("decode")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === "decode" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
              Decode
            </button>
            <button onClick={() => setMode("encode")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === "encode" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
              Encode
            </button>
          </div>
          <button onClick={swapModes} title="Swap Mode & Content" className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <ArrowRightLeft size={16} />
          </button>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          
          <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700">
             <button onClick={() => setEncodeMode('component')}
               className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${encodeMode === 'component' ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`}
               title="decodeURIComponent - Decodes strictly, including structure (Best for parameters)">
               Component Mode
             </button>
             <button onClick={() => setEncodeMode('uri')}
               className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${encodeMode === 'uri' ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`}
               title="decodeURI - Decodes full URLs correctly">
               Full URL Mode
             </button>
          </div>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

          <button onClick={handlePaste}
            className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm border border-slate-200 dark:border-slate-700">
            Paste
          </button>

          <button onClick={clearAll} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors dark:text-red-400">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Input Panel */}
        <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[350px]">
          <div className="flex justify-between items-center px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
              <LinkIcon size={14}/> {mode === "encode" ? "URL / String to Encode" : "Encoded URL to Decode"}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {inputStats.chars} chars · {inputStats.reserved} reserved chars
            </span>
          </div>
          <div className="flex-1 relative">
            <textarea 
              value={input} onChange={e => setInput(e.target.value)}
              placeholder={mode === "encode" ? "Paste text here to encode..." : "Paste encoded %20 string here to decode..."}
              className="absolute inset-0 w-full h-full p-4 resize-none outline-none bg-transparent text-slate-800 dark:text-slate-200 font-mono text-sm custom-scrollbar break-all"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[350px]">
          <div className="flex justify-between items-center px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#518231] flex items-center gap-2">
              <MonitorDown size={14}/> Output
            </span>
            <div className="flex gap-2">
              {output && !error && (
                <>
                  <button onClick={() => handleCopy(output, "output")} className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#518231] dark:text-slate-400 font-medium">
                    {copiedKey === "output" ? <span className="text-green-500">Copied!</span> : <><Copy size={12} /> Copy</>}
                  </button>
                  <button onClick={handleDownload} className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#518231] dark:text-slate-400 font-medium">
                    <Download size={12} /> TXT
                  </button>
                </>
              )}
              {!error && output && (
                <span className="text-xs text-slate-400 font-mono ml-2 border-l border-slate-300 dark:border-slate-600 pl-2">
                  {outputStats.chars} chars
                </span>
              )}
            </div>
          </div>
          <div className="flex-1 relative bg-slate-50/50 dark:bg-[#1e1e1e]/50">
            {error ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center text-red-500">
                <AlertTriangle size={32} className="mb-2 opacity-80" />
                <p className="font-medium text-sm">{error}</p>
                <p className="text-xs mt-2 opacity-70">Check if your string contains invalid '%' signs.</p>
              </div>
            ) : (
              <textarea 
                value={output} readOnly
                className="absolute inset-0 w-full h-full p-4 resize-none outline-none bg-transparent text-slate-800 dark:text-slate-200 font-mono text-sm custom-scrollbar break-all"
              />
            )}
          </div>
        </div>
      </div>

      {/* Query Parameters Inspector */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
         <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center gap-2">
              <FileText size={14}/> Query Parameters Inspector
            </span>
            <span className="text-xs text-slate-400">{queryParams.length} Parameters</span>
         </div>
         
         <div className="p-4">
            {queryParams.length === 0 ? (
               <div className="text-center py-6 text-slate-500 dark:text-slate-400 text-sm border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                 No query parameters detected in the input. 
                 <button onClick={addQueryParam} className="ml-2 text-[#518231] hover:underline font-medium">Add one manually</button>
               </div>
            ) : (
               <div className="space-y-2">
                  {queryParams.map((param, i) => (
                    <div key={i} className="flex gap-2 items-start">
                       <input 
                         type="text" 
                         value={param.key} 
                         onChange={(e) => updateQueryParam(i, 'key', e.target.value)}
                         placeholder="Key" 
                         className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:border-[#518231] font-mono transition-colors"
                       />
                       <input 
                         type="text" 
                         value={param.value} 
                         onChange={(e) => updateQueryParam(i, 'value', e.target.value)}
                         placeholder="Value" 
                         className="flex-[2] px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:border-[#518231] font-mono transition-colors"
                       />
                       <button onClick={() => removeQueryParam(i)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                         <X size={18} />
                       </button>
                    </div>
                  ))}
                  
                  <button onClick={addQueryParam} className="mt-2 text-sm text-[#518231] flex items-center gap-1 hover:underline font-medium px-1">
                    <Plus size={14} /> Add Parameter
                  </button>
               </div>
            )}
         </div>
      </div>

    </div>
  );
}
