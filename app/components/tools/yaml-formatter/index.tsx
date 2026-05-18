"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Copy, Download, Trash2, Upload, FileCode2, CheckCircle, AlertTriangle,
  ChevronDown, History, X, WrapText, Settings2, Code2,
  BarChart3, GitCompare, Sparkles, Database, ClipboardCheck, ArrowRightLeft, FileJson
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import {
  IndentWidth, validateYaml, formatYaml, minifyYaml, yamlToJson, jsonToYaml,
  analyzeYaml, lintYaml, computeDiff, copyToClipboard, EXAMPLE_YAMLS, LintOptions
} from "./utils";

export function YamlFormatterTool() {
  const { resolvedTheme } = useTheme();
  const monacoTheme = resolvedTheme === "dark" ? "vs-dark" : "light";

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState<"formatter" | "json" | "analysis" | "diff">("formatter");
  const [indent, setIndent] = useState<IndentWidth>("2");
  const [wordWrap, setWordWrap] = useState<"on" | "off">("off");
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showExamples, setShowExamples] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showLintSettings, setShowLintSettings] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [lintOptions, setLintOptions] = useState<LintOptions>({ indentWidth: 2, checkTrailingSpaces: true, checkDuplicateKeys: true });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("yaml_formatter_input");
    if (saved) setInput(saved);
    const savedHistory = localStorage.getItem("yaml_formatter_history");
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch {}
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input) localStorage.setItem("yaml_formatter_input", input);
    }, 1000);
    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    setLintOptions(prev => ({ ...prev, indentWidth: parseInt(indent) }));
  }, [indent]);

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
    localStorage.setItem("yaml_formatter_history", JSON.stringify(next));
  }, [history]);

  const handleFormat = useCallback(() => {
    if (!input.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      try {
        const result = formatYaml(input, parseInt(indent));
        setOutput(result);
        saveToHistory(input);
        setActiveTab("formatter");
        showToast("Formatted successfully!");
      } catch (e: any) {
        showToast("Format error: " + (e.message || "Unknown error"));
      }
      setIsProcessing(false);
    }, 30);
  }, [input, indent, saveToHistory, showToast]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      try {
        const result = minifyYaml(input);
        setOutput(result);
        saveToHistory(input);
        showToast("Minified successfully!");
      } catch (e: any) {
        showToast("Minify error: " + (e.message || "Unknown"));
      }
      setIsProcessing(false);
    }, 30);
  }, [input, saveToHistory, showToast]);

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { if (ev.target?.result) setInput(ev.target.result as string); };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, []);

  const handleDownload = useCallback((content: string, ext: string) => {
    if (!content) return;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `formatted.${ext}`;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  }, []);

  const validation = useMemo(() => validateYaml(input), [input]);
  const analysis = useMemo(() => analyzeYaml(input), [input]);
  const lintIssues = useMemo(() => lintYaml(input, lintOptions), [input, lintOptions]);
  const diffResult = useMemo(() => computeDiff(input, output), [input, output]);
  
  const jsonOutput = useMemo(() => {
    if (!input.trim() || !validation.valid) return "";
    try { return yamlToJson(input); } catch { return ""; }
  }, [input, validation.valid]);

  return (
    <div className="w-full flex flex-col gap-4">
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2 bg-[#518231] text-white rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          {toast}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center shadow-sm rounded-lg">
            <button disabled={isProcessing || !input.trim()} onClick={handleFormat}
              className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-l-lg font-medium transition-colors flex items-center gap-2 text-sm disabled:opacity-60"
              aria-label="Format YAML">
              <FileCode2 size={16} /> Format
            </button>
            <div className="relative border-l border-[#436a28] bg-[#518231] hover:bg-[#436a28] rounded-r-lg transition-colors">
              <select value={indent} onChange={e => setIndent(e.target.value as IndentWidth)}
                className="appearance-none bg-transparent text-white pl-2 pr-6 py-2 text-sm font-medium focus:outline-none cursor-pointer"
                aria-label="Indentation size">
                <option value="2" className="text-slate-900">2 Spaces</option>
                <option value="4" className="text-slate-900">4 Spaces</option>
                <option value="8" className="text-slate-900">8 Spaces</option>
              </select>
              <div className="absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none text-white opacity-80"><ChevronDown size={14} /></div>
            </div>
          </div>

          <button disabled={isProcessing || !input.trim()} onClick={handleMinify}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-60"
            aria-label="Minify YAML">
            <Code2 size={16} /> Minify
          </button>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

          {/* Examples */}
          <div className="relative">
            <button onClick={() => setShowExamples(!showExamples)}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-sm ${showExamples ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
              aria-label="Example YAMLs">
              <Sparkles size={16} /><span className="hidden md:inline">Examples</span>
            </button>
            {showExamples && (
              <div className="absolute right-0 lg:left-0 lg:right-auto top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 py-1 animate-in fade-in slide-in-from-top-1">
                {EXAMPLE_YAMLS.map((ex, i) => (
                  <button key={i} onClick={() => { setInput(ex.yaml); setShowExamples(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2">
                    <Database size={14} className="text-slate-400 shrink-0" /> {ex.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
           <div className="relative">
            <button onClick={() => setShowLintSettings(!showLintSettings)}
              className={`p-2 rounded-lg transition-colors flex items-center gap-1.5 text-sm ${showLintSettings ? 'bg-[#518231]/10 text-[#518231]' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
              aria-label="Lint Settings">
              <Settings2 size={16} /><span className="hidden md:inline">Lint</span>
            </button>
            {showLintSettings && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 p-4 animate-in fade-in slide-in-from-top-1">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Lint Options</h4>
                <label className="flex items-center gap-2 mb-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input type="checkbox" checked={lintOptions.checkTrailingSpaces} onChange={e => setLintOptions(prev => ({...prev, checkTrailingSpaces: e.target.checked}))} className="rounded text-[#518231] focus:ring-[#518231]" />
                  Check Trailing Spaces
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input type="checkbox" checked={lintOptions.checkDuplicateKeys} onChange={e => setLintOptions(prev => ({...prev, checkDuplicateKeys: e.target.checked}))} className="rounded text-[#518231] focus:ring-[#518231]" />
                  Check Duplicate Keys
                </label>
              </div>
            )}
          </div>

          <input type="file" accept=".yaml,.yml,.txt" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          <button onClick={() => fileInputRef.current?.click()}
            className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-sm dark:text-slate-400"
            aria-label="Upload YAML file">
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
          <button onClick={() => { setInput(""); setOutput(""); localStorage.removeItem("yaml_formatter_input"); }}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors dark:text-red-400"
            aria-label="Clear all">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {showHistory && history.length > 0 && (
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-top-2">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recent YAMLs</span>
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

      {/* Validation & Lint Banner */}
      {input.trim() && (
        <div className={`p-3 rounded-xl flex items-start gap-3 border shadow-sm transition-colors ${!validation.valid ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/50" : lintIssues.length > 0 ? "bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/50" : "bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800/30"}`}>
          {!validation.valid ? (
            <AlertTriangle size={18} className="shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
          ) : lintIssues.length > 0 ? (
            <AlertTriangle size={18} className="shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          ) : (
            <CheckCircle size={18} className="shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
          )}
          <div className="flex-1">
            <h4 className={`font-bold text-sm ${!validation.valid ? "text-red-800 dark:text-red-300" : lintIssues.length > 0 ? "text-amber-800 dark:text-amber-300" : "text-green-800 dark:text-green-300"}`}>
              {!validation.valid ? "Invalid YAML" : lintIssues.length > 0 ? "YAML has Linting Issues" : "Valid YAML"}
            </h4>
            {!validation.valid && (
              <div className="mt-1 text-sm text-red-700 dark:text-red-400 font-mono">
                {validation.error} {validation.line && `(Line ${validation.line}, Col ${validation.column})`}
              </div>
            )}
            {validation.valid && lintIssues.length > 0 && (
              <ul className="mt-1 text-sm text-amber-700 dark:text-amber-400 space-y-1 font-mono text-xs">
                {lintIssues.slice(0, 5).map((issue, i) => (
                  <li key={i}>• Line {issue.line}: {issue.message}</li>
                ))}
                {lintIssues.length > 5 && <li>• ...and {lintIssues.length - 5} more</li>}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex overflow-x-auto custom-scrollbar border-b border-slate-200 dark:border-slate-800">
        {([
          { key: "formatter" as const, icon: FileCode2, label: "Formatter" },
          { key: "json" as const, icon: ArrowRightLeft, label: "YAML ↔ JSON" },
          { key: "analysis" as const, icon: BarChart3, label: "Analysis" },
          { key: "diff" as const, icon: GitCompare, label: "Diff View" },
        ]).map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.key ? "border-[#518231] text-[#518231] bg-[#518231]/5" : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50"}`}>
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
        {activeTab === "formatter" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 h-[600px]">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Input YAML</span>
                <span className="text-xs text-slate-400">{analysis.length} chars · {analysis.lines} lines</span>
              </div>
              <div className="flex-1 relative">
                <Editor height="100%" language="yaml" theme={monacoTheme} value={input}
                  onChange={val => setInput(val || "")}
                  options={{ minimap: { enabled: false }, wordWrap, formatOnPaste: false, fontSize: 14, padding: { top: 16 } }} />
              </div>
            </div>
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#518231]">Formatted Output</span>
                <div className="flex gap-2">
                  <button onClick={() => handleCopy(output, "output")}
                    className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#518231] dark:text-slate-400 transition-colors">
                    {copiedKey === "output" ? <><ClipboardCheck size={12} className="text-green-500" /> Copied!</> : <><Copy size={12} /> Copy</>}
                  </button>
                  <button onClick={() => handleDownload(output, "yaml")}
                    className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#518231] dark:text-slate-400 transition-colors">
                    <Download size={12} /> .yaml
                  </button>
                </div>
              </div>
              <div className="flex-1 relative">
                <Editor height="100%" language="yaml" theme={monacoTheme} value={output}
                  options={{ readOnly: true, minimap: { enabled: false }, wordWrap, fontSize: 14, padding: { top: 16 } }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "json" && (
           <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 h-[600px]">
            <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900/50">
                <div className="p-8 h-full flex flex-col items-center justify-center text-center space-y-4">
                  <FileJson size={48} className="text-slate-400 dark:text-slate-600" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">Convert JSON to YAML</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm">
                    Paste JSON into the main Input Editor (Formatter tab), and we will automatically convert it to YAML output for you here or format it to YAML.
                  </p>
                  <button onClick={() => {
                    try {
                      const yamlRes = jsonToYaml(input, parseInt(indent));
                      setOutput(yamlRes);
                      setActiveTab('formatter');
                      showToast("Converted JSON to YAML!");
                    } catch (e: any) {
                      showToast("Failed to parse JSON: " + e.message);
                    }
                  }} className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors">
                    Try Parse Input as JSON
                  </button>
                </div>
            </div>
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">JSON Output</span>
                <div className="flex gap-2">
                  <button onClick={() => handleCopy(jsonOutput, "json")}
                    className="text-xs flex items-center gap-1 text-slate-600 hover:text-blue-600 dark:text-slate-400 transition-colors">
                    {copiedKey === "json" ? <><ClipboardCheck size={12} className="text-green-500" /> Copied!</> : <><Copy size={12} /> Copy JSON</>}
                  </button>
                  <button onClick={() => handleDownload(jsonOutput, "json")}
                    className="text-xs flex items-center gap-1 text-slate-600 hover:text-blue-600 dark:text-slate-400 transition-colors">
                    <Download size={12} /> .json
                  </button>
                </div>
              </div>
              <div className="flex-1 relative">
                 {!input.trim() ? (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500">Enter YAML to see JSON</div>
                 ) : !validation.valid ? (
                    <div className="absolute inset-0 flex items-center justify-center text-red-500">Fix YAML errors to convert to JSON</div>
                 ) : (
                  <Editor height="100%" language="json" theme={monacoTheme} value={jsonOutput}
                    options={{ readOnly: true, minimap: { enabled: false }, wordWrap, fontSize: 14, padding: { top: 16 } }} />
                 )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "analysis" && (
          <div className="flex-1 p-6 space-y-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 size={20} className="text-[#518231]" /> YAML Analysis
            </h3>
            {!input.trim() ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                <BarChart3 size={48} className="opacity-20 mb-4" />
                <p>Enter YAML to see analysis</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: "Length", value: analysis.length.toLocaleString(), sub: "characters" },
                  { label: "Lines", value: analysis.lines.toString(), sub: "total" },
                  { label: "Keys", value: analysis.keys.toString(), sub: "key-value pairs" },
                  { label: "Max Depth", value: analysis.depth.toString(), sub: "nesting levels" },
                  { label: "Documents", value: analysis.documents.toString(), sub: "--- separators" },
                  { label: "Features", value: (analysis.hasComments ? "Comments " : "") + (analysis.hasAnchors ? "Anchors" : ""), sub: analysis.hasComments || analysis.hasAnchors ? "detected" : "none" },
                ].map((stat, i) => (
                  <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value || "0"}</div>
                    <div className="text-xs font-semibold text-[#518231] uppercase tracking-wider mt-1">{stat.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

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
                  <p>Format YAML first to see the diff</p>
                </div>
              ) : (
                <div className="space-y-0.5 whitespace-pre">
                  {diffResult.map((line, i) => (
                    <div key={i} className={`px-3 py-0.5 rounded-sm ${
                      line.type === "added" ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-l-2 border-green-500" :
                      line.type === "removed" ? "bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-l-2 border-red-500" :
                      "text-slate-700 dark:text-slate-300"
                    }`}>
                      <span className="text-slate-400 mr-3 select-none inline-block w-5 text-right">
                        {line.type === "added" ? "+" : line.type === "removed" ? "−" : " "}
                      </span>
                      {line.text || " "}
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
