"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Copy, Download, Trash2, Upload, FileCode2, CheckCircle, AlertTriangle,
  ChevronDown, History, X, WrapText, Play, Settings2, Code2,
  BarChart3, GitCompare, Sparkles, Database, ClipboardCheck
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { format as sqlFormat } from "sql-formatter";
import {
  SqlDialect, KeywordCase, IndentStyle, FORMAT_PRESETS, DIALECT_OPTIONS,
  EXAMPLE_QUERIES, analyzeQuery, validateSql, minifySql, computeDiff,
  copyToClipboard
} from "./utils";

export function SqlFormatterTool() {
  const { resolvedTheme } = useTheme();
  const monacoTheme = resolvedTheme === "dark" ? "vs-dark" : "light";

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState<"formatter" | "analysis" | "diff">("formatter");
  const [dialect, setDialect] = useState<SqlDialect>("sql");
  const [indent, setIndent] = useState<IndentStyle>("2");
  const [keywordCase, setKeywordCase] = useState<KeywordCase>("upper");
  const [wordWrap, setWordWrap] = useState<"on" | "off">("off");
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("sql_formatter_input");
    if (saved) setInput(saved);
    const savedHistory = localStorage.getItem("sql_formatter_history");
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch {}
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) localStorage.setItem("sql_formatter_input", input);
    }, 1000);
    return () => clearTimeout(timer);
  }, [input]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleCopy = useCallback(async (text: string, key: string) => {
    const ok = await copyToClipboard(text);
    if (ok) { setCopiedKey(key); setTimeout(() => setCopiedKey(null), 2000); showToast("Copied!"); }
  }, [showToast]);

  const saveToHistory = useCallback((val: string) => {
    if (!val.trim()) return;
    const next = [val, ...history.filter(h => h !== val)].slice(0, 10);
    setHistory(next);
    localStorage.setItem("sql_formatter_history", JSON.stringify(next));
  }, [history]);

  const getFormatOptions = useCallback(() => {
    const tabWidth = indent === "tab" ? 4 : parseInt(indent);
    const useTabs = indent === "tab";
    return {
      language: dialect as any,
      tabWidth,
      useTabs,
      keywordCase: keywordCase === "preserve" ? "preserve" as const : keywordCase as "upper" | "lower",
      linesBetweenQueries: 2,
    };
  }, [dialect, indent, keywordCase]);

  const handleFormat = useCallback(() => {
    if (!input.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      try {
        const result = sqlFormat(input, getFormatOptions());
        setOutput(result);
        saveToHistory(input);
        setActiveTab("formatter");
        showToast("Formatted successfully!");
      } catch (e: any) {
        showToast("Format error: " + (e.message || "Unknown error"));
      }
      setIsProcessing(false);
    }, 30);
  }, [input, getFormatOptions, saveToHistory, showToast]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      try {
        const result = minifySql(input);
        setOutput(result);
        saveToHistory(input);
        showToast("Minified successfully!");
      } catch (e: any) {
        showToast("Minify error: " + (e.message || "Unknown"));
      }
      setIsProcessing(false);
    }, 30);
  }, [input, saveToHistory, showToast]);

  const handlePreset = useCallback((preset: typeof FORMAT_PRESETS[number]) => {
    setIndent(preset.indent);
    setKeywordCase(preset.keywordCase);
    setDialect(preset.dialect);
    setShowPresets(false);
    showToast(`Preset: ${preset.name}`);
  }, [showToast]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { if (ev.target?.result) setInput(ev.target.result as string); };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/sql" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "formatted.sql";
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  }, [output]);

  // Memoized analysis & validation
  const analysis = useMemo(() => analyzeQuery(input), [input]);
  const validation = useMemo(() => validateSql(input), [input]);
  const diffResult = useMemo(() => computeDiff(input, output), [input, output]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2 bg-[#518231] text-white rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          {toast}
        </div>
      )}

      {/* Primary Toolbar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {/* Format Button */}
          <div className="flex items-center shadow-sm rounded-lg">
            <button disabled={isProcessing || !input.trim()} onClick={handleFormat}
              className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-l-lg font-medium transition-colors flex items-center gap-2 text-sm disabled:opacity-60"
              aria-label="Format SQL">
              <FileCode2 size={16} /> Format
            </button>
            <div className="relative border-l border-[#436a28] bg-[#518231] hover:bg-[#436a28] rounded-r-lg transition-colors">
              <select value={indent} onChange={e => setIndent(e.target.value as IndentStyle)}
                className="appearance-none bg-transparent text-white pl-2 pr-6 py-2 text-sm font-medium focus:outline-none cursor-pointer"
                aria-label="Indentation size">
                <option value="2" className="text-slate-900">2 Spaces</option>
                <option value="4" className="text-slate-900">4 Spaces</option>
                <option value="tab" className="text-slate-900">Tabs</option>
              </select>
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-white opacity-80"><ChevronDown size={14} /></div>
            </div>
          </div>

          <button disabled={isProcessing || !input.trim()} onClick={handleMinify}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-60"
            aria-label="Minify SQL">
            <Code2 size={16} /> Minify
          </button>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

          {/* Dialect */}
          <div className="relative">
            <select value={dialect} onChange={e => setDialect(e.target.value as SqlDialect)}
              className="appearance-none bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 pl-3 pr-7 py-2 rounded-lg text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#518231]"
              aria-label="SQL dialect">
              {DIALECT_OPTIONS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><ChevronDown size={14} /></div>
          </div>

          {/* Keyword Case */}
          <div className="relative">
            <select value={keywordCase} onChange={e => setKeywordCase(e.target.value as KeywordCase)}
              className="appearance-none bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 pl-3 pr-7 py-2 rounded-lg text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#518231]"
              aria-label="Keyword case">
              <option value="upper">UPPERCASE</option>
              <option value="lower">lowercase</option>
              <option value="preserve">Preserve</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400"><ChevronDown size={14} /></div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Presets */}
          <div className="relative">
            <button onClick={() => setShowPresets(!showPresets)}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-sm ${showPresets ? 'bg-[#518231]/10 text-[#518231]' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
              aria-label="Format presets">
              <Settings2 size={16} /><span className="hidden md:inline">Presets</span>
            </button>
            {showPresets && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 py-1 animate-in fade-in slide-in-from-top-1">
                {FORMAT_PRESETS.map((p, i) => (
                  <button key={i} onClick={() => handlePreset(p)}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    {p.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Examples */}
          <div className="relative">
            <button onClick={() => setShowExamples(!showExamples)}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-sm ${showExamples ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
              aria-label="Example queries">
              <Sparkles size={16} /><span className="hidden md:inline">Examples</span>
            </button>
            {showExamples && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 py-1 animate-in fade-in slide-in-from-top-1">
                {EXAMPLE_QUERIES.map((ex, i) => (
                  <button key={i} onClick={() => { setInput(ex.sql); setShowExamples(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                    <Database size={14} className="text-slate-400 shrink-0" /> {ex.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <input type="file" accept=".sql,.txt" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          <button onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-sm dark:text-slate-400"
            aria-label="Upload SQL file">
            <Upload size={16} /><span className="hidden lg:inline">Upload</span>
          </button>

          <button onClick={() => setWordWrap(w => w === "on" ? "off" : "on")}
            className={`p-2 rounded-lg transition-colors text-sm ${wordWrap === "on" ? "bg-[#518231]/10 text-[#518231]" : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`}
            aria-label="Toggle word wrap">
            <WrapText size={16} />
          </button>
          <button onClick={() => setShowHistory(!showHistory)}
            className={`p-2 rounded-lg transition-colors text-sm ${showHistory ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300" : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"}`}
            aria-label="History">
            <History size={16} />
          </button>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />
          <button onClick={() => { setInput(""); setOutput(""); localStorage.removeItem("sql_formatter_input"); }}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors dark:text-red-400"
            aria-label="Clear all">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* History Panel */}
      {showHistory && history.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recent Queries</span>
            <button onClick={() => setShowHistory(false)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
          </div>
          <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
            {history.map((h, i) => (
              <button key={i} onClick={() => { setInput(h); setShowHistory(false); }}
                className="w-full text-left p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 hover:shadow-sm transition-all text-xs font-mono text-slate-600 dark:text-slate-400 truncate">
                {h.slice(0, 120)}...
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Validation Banner */}
      {input.trim() && (
        <div className={`p-3 rounded-xl flex items-start gap-3 border shadow-sm transition-colors ${!validation.valid ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/50" : "bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800/30"}`}>
          {!validation.valid ? (
            <AlertTriangle size={18} className="shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
          ) : (
            <CheckCircle size={18} className="shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
          )}
          <div className="flex-1">
            <h4 className={`font-bold text-sm ${!validation.valid ? "text-red-800 dark:text-red-300" : "text-green-800 dark:text-green-300"}`}>
              {!validation.valid ? "SQL Issues Detected" : "SQL Looks Valid"}
            </h4>
            {!validation.valid && (
              <ul className="mt-1 text-sm text-red-700 dark:text-red-400 space-y-1">
                {validation.errors.map((err, i) => <li key={i} className="font-mono text-xs">• {err}</li>)}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex overflow-x-auto custom-scrollbar border-b border-slate-200 dark:border-slate-800">
        {([
          { key: "formatter" as const, icon: FileCode2, label: "Formatter & Editor" },
          { key: "analysis" as const, icon: BarChart3, label: "Query Analysis" },
          { key: "diff" as const, icon: GitCompare, label: "Diff View" },
        ]).map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.key ? "border-[#518231] text-[#518231] bg-[#518231]/5" : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50"}`}>
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[500px] flex flex-col">

        {/* FORMATTER TAB */}
        {activeTab === "formatter" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 h-[600px]">
            {/* Input */}
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Input SQL</span>
                <span className="text-xs text-slate-400">{analysis.length} chars · {analysis.lines} lines</span>
              </div>
              <div className="flex-1 relative">
                <Editor height="100%" language="sql" theme={monacoTheme} value={input}
                  onChange={val => setInput(val || "")}
                  options={{ minimap: { enabled: false }, wordWrap, formatOnPaste: false, fontSize: 14, padding: { top: 16 }, scrollBeyondLastLine: false }} />
              </div>
            </div>
            {/* Output */}
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#518231]">Formatted Output</span>
                <div className="flex gap-2">
                  <button onClick={() => handleCopy(output, "output")}
                    className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#518231] dark:text-slate-400 transition-colors">
                    {copiedKey === "output" ? <><ClipboardCheck size={12} className="text-green-500" /> Copied!</> : <><Copy size={12} /> Copy</>}
                  </button>
                  <button onClick={handleDownload}
                    className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#518231] dark:text-slate-400 transition-colors">
                    <Download size={12} /> .sql
                  </button>
                </div>
              </div>
              <div className="flex-1 relative">
                <Editor height="100%" language="sql" theme={monacoTheme} value={output}
                  options={{ readOnly: true, minimap: { enabled: false }, wordWrap, fontSize: 14, padding: { top: 16 }, scrollBeyondLastLine: false }} />
              </div>
            </div>
          </div>
        )}

        {/* ANALYSIS TAB */}
        {activeTab === "analysis" && (
          <div className="flex-1 p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 size={20} className="text-[#518231]" /> Query Analysis
            </h3>
            {!input.trim() ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <BarChart3 size={48} className="opacity-20 mb-4" />
                <p>Enter SQL in the editor to see analysis</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: "Length", value: analysis.length.toLocaleString(), sub: "characters" },
                  { label: "Lines", value: analysis.lines.toString(), sub: "total" },
                  { label: "Keywords", value: analysis.keywords.toString(), sub: "SQL keywords" },
                  { label: "JOINs", value: analysis.joins.toString(), sub: "join clauses" },
                  { label: "Subqueries", value: analysis.subqueries.toString(), sub: "nested" },
                  { label: "Complexity", value: analysis.complexity, sub: `Score` },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs font-semibold text-[#518231] uppercase tracking-wider mt-1">{stat.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>
            )}
            {input.trim() && (
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Readability Score</span>
                  <span className="text-sm font-bold text-[#518231]">{analysis.readabilityScore}/100</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                  <div className="h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${analysis.readabilityScore}%`,
                      backgroundColor: analysis.readabilityScore > 70 ? '#518231' : analysis.readabilityScore > 40 ? '#eab308' : '#ef4444',
                    }} />
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {analysis.readabilityScore > 70 ? "Good readability. Query is well-structured." :
                    analysis.readabilityScore > 40 ? "Moderate readability. Consider formatting for clarity." :
                      "Low readability. Formatting this query will significantly improve clarity."}
                </p>
              </div>
            )}
          </div>
        )}

        {/* DIFF TAB */}
        {activeTab === "diff" && (
          <div className="flex-1 flex flex-col h-[600px]">
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Original vs Formatted</span>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500/20 border border-green-500"></span> Added</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-500/20 border border-red-500"></span> Removed</span>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4 font-mono text-sm custom-scrollbar bg-white dark:bg-[#1e1e1e]">
              {(!input.trim() || !output.trim()) ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <GitCompare size={48} className="opacity-20 mb-4" />
                  <p>Format a query first to see the diff</p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {diffResult.map((line, i) => (
                    <div key={i} className={`px-3 py-0.5 rounded-sm ${
                      line.type === "added" ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-l-2 border-green-500" :
                      line.type === "removed" ? "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-l-2 border-red-500" :
                      "text-slate-700 dark:text-slate-300"
                    }`}>
                      <span className="text-slate-400 mr-3 select-none inline-block w-5 text-right">
                        {line.type === "added" ? "+" : line.type === "removed" ? "−" : " "}
                      </span>
                      {line.text || "\u00A0"}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
