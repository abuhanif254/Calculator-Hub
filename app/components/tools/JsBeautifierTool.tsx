"use client";

import React, { useState, useRef, useEffect } from "react";
import { Copy, Download, Trash2, Upload, FileCode2, CheckCircle, AlertTriangle, ChevronDown, History, X, WrapText, Clipboard, Link as LinkIcon, Settings2, Code2 } from "lucide-react";
import { Link } from "../../../i18n/routing";

// --- Simple Syntax Highlighter for fallback ---
const JsSyntax = ({ text }: { text: string }) => {
  if (!text) return null;
  const lines = text.split('\n');
  
  return (
    <>
      {lines.map((line, li) => {
        if (line.trim().startsWith('//')) {
          return <div key={li}><span className="text-slate-400 italic">{line}</span></div>;
        }
        // Basic naive highlighting
        const highlighted = line
          .replace(/\b(const|let|var|function|async|await|return|if|else|for|while|try|catch|import|export|from|class|extends|new|this)\b/g, '<span class="text-[#d73a49] dark:text-[#ff7b72] font-medium">$1</span>')
          .replace(/(["'`])(?:(?=(\\?))\2.)*?\1/g, '<span class="text-[#032f62] dark:text-[#a5d6ff]">$&</span>')
          .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-[#005cc5] dark:text-[#79c0ff]">$1</span>')
          .replace(/(\{|\}|\(|\)|\[|\])/g, '<span class="text-slate-500 dark:text-slate-400">$1</span>');

        return <div key={li} dangerouslySetInnerHTML={{ __html: highlighted || ' ' }} className="text-slate-800 dark:text-slate-200" />;
      })}
    </>
  );
};

export function JsBeautifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [autoCopy, setAutoCopy] = useState(false);
  const [indent, setIndent] = useState<number>(2);
  const [useTabs, setUseTabs] = useState(false);
  const [wordWrap, setWordWrap] = useState(false);
  const [formatOnPaste, setFormatOnPaste] = useState(true);
  const [syntaxMode, setSyntaxMode] = useState<"babel" | "typescript">("babel");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputScrollRef = useRef<HTMLTextAreaElement>(null);
  const linesScrollRef = useRef<HTMLDivElement>(null);
  const syntaxScrollRef = useRef<HTMLPreElement>(null);

  const handleInputScroll = () => {
    if (inputScrollRef.current && linesScrollRef.current) {
      linesScrollRef.current.scrollTop = inputScrollRef.current.scrollTop;
    }
    if (inputScrollRef.current && syntaxScrollRef.current) {
      syntaxScrollRef.current.scrollTop = inputScrollRef.current.scrollTop;
      syntaxScrollRef.current.scrollLeft = inputScrollRef.current.scrollLeft;
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("js_beautifier_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        processJS("format");
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        processJS("minify");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const saveToHistory = (val: string) => {
    if (!val.trim()) return;
    const newHistory = [val, ...history.filter(h => h !== val)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("js_beautifier_history", JSON.stringify(newHistory));
  };

  const processJS = async (action: "format" | "minify", sourceText: string = input) => {
    if (!sourceText.trim()) {
      setError("Input is empty.");
      setOutput("");
      return;
    }
    try {
      setIsProcessing(true);
      setError(null);
      setWarning(null);

      if (action === "format") {
        const prettier = await import('prettier/standalone');
        const babelPlugin = await import('prettier/plugins/babel');
        const estreePlugin = await import('prettier/plugins/estree');
        const tsPlugin = await import('prettier/plugins/typescript');

        const formatted = await prettier.format(sourceText, {
          parser: syntaxMode,
          plugins: [babelPlugin, estreePlugin, tsPlugin],
          useTabs: useTabs,
          tabWidth: indent,
          semi: true,
          singleQuote: false,
          trailingComma: 'none',
        });

        setOutput(formatted);
        if (sourceText === input) saveToHistory(input);
        if (autoCopy) {
          navigator.clipboard.writeText(formatted);
          setSuccessMsg("Formatted & copied!");
        } else {
          setSuccessMsg("JS formatted successfully!");
        }
      } else {
        const { minify } = await import('terser');
        const result = await minify(sourceText, {
          compress: true,
          mangle: true,
          format: {
            comments: false
          }
        });
        
        setOutput(result.code || "");
        if (sourceText === input) saveToHistory(input);
        if (autoCopy && result.code) {
          navigator.clipboard.writeText(result.code);
          setSuccessMsg("Minified & copied!");
        } else {
          setSuccessMsg("JS minified successfully!");
        }
      }
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (e: any) {
      setError("Syntax Error: " + (e.message || "Failed to process JavaScript"));
      setOutput("");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setError(null);
      if (formatOnPaste && text.trim()) {
        processJS("format", text);
      }
    } catch { console.error("Clipboard read failed"); }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setSuccessMsg("Copied!");
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.js";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) { setInput(ev.target.result as string); setError(null); }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClear = () => {
    setInput(""); setOutput(""); setError(null); setWarning(null); setSuccessMsg(null);
  };

  const loadSample = () => {
    setInput(`import React,{useState}from'react';const fetchUser=async({id})=>{try{const r=await fetch(\`/api/user/\${id}\`);if(!r.ok)throw new Error('err');return await r.json()}catch(e){console.error(e);return null}};export default function App(){const[u,setU]=useState(null);return(<div className="p-4"><button onClick={async()=>setU(await fetchUser({id:1}))}>Load</button>{u&&<div>{u.name}</div>}</div>)}`);
  };

  const handleCompare = () => {
    localStorage.setItem("diff_checker_left", input);
    localStorage.setItem("diff_checker_right", output || input);
    localStorage.setItem("diff_checker_source", "js-beautifier");
    window.location.href = `/${document.documentElement.lang || 'en'}/tools/diff-checker`;
  };

  const inputLines = input ? input.split('\n').length : 0;
  const inputSize = new Blob([input]).size;
  const outputLines = output ? output.split('\n').length : 0;
  const outputSize = new Blob([output]).size;
  const fmtSize = (b: number) => {
    if (b === 0) return '0 B';
    const k = 1024;
    const s = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(b) / Math.log(k));
    return parseFloat((b / Math.pow(k, i)).toFixed(2)) + ' ' + s[i];
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center shadow-sm rounded-lg">
            <button disabled={isProcessing} onClick={() => processJS("format")} className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-l-lg font-medium transition-colors flex items-center gap-2 text-sm disabled:opacity-70">
              <FileCode2 size={16} /> Beautify {isProcessing && "..."}
            </button>
            <div className="relative border-l border-[#436a28] h-full flex items-center bg-[#518231] hover:bg-[#436a28] rounded-r-lg transition-colors">
              <select
                value={useTabs ? 'tab' : indent}
                onChange={(e) => { if (e.target.value === 'tab') { setUseTabs(true); } else { setUseTabs(false); setIndent(Number(e.target.value)); } }}
                className="appearance-none bg-transparent text-white pl-2 pr-6 py-2 text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value={2} className="text-slate-900">2 Spaces</option>
                <option value={3} className="text-slate-900">3 Spaces</option>
                <option value={4} className="text-slate-900">4 Spaces</option>
                <option value="tab" className="text-slate-900">Tabs</option>
              </select>
              <div className="absolute right-1.5 pointer-events-none text-white opacity-80"><ChevronDown size={14} /></div>
            </div>
          </div>
          <button disabled={isProcessing} onClick={() => processJS("minify")} className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-70">
            <Code2 size={16} /> Minify
          </button>
          <button onClick={() => setShowOptions(!showOptions)} className={`px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm border ${showOptions ? 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
            <Settings2 size={16} /> <span className="hidden sm:inline">Options</span>
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input type="file" accept=".js,.jsx,.ts,.tsx,text/javascript" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          <button onClick={handleCompare} className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 text-sm dark:text-slate-400" title="Compare">
            <LinkIcon size={18} /><span className="hidden lg:inline">Compare</span>
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 text-sm dark:text-slate-400" title="Upload">
            <Upload size={18} /><span className="hidden lg:inline">Upload</span>
          </button>
          <button onClick={() => setShowHistory(!showHistory)} className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${showHistory ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`} title="History">
            <History size={18} /><span className="hidden lg:inline">History</span>
          </button>
          <button onClick={handleCopy} disabled={!output} className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 dark:text-slate-400" title="Copy"><Copy size={18} /></button>
          <button onClick={handleDownload} disabled={!output} className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 dark:text-slate-400" title="Download"><Download size={18} /></button>
          <button onClick={handleClear} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors dark:text-red-400" title="Clear"><Trash2 size={18} /></button>
        </div>
      </div>

      {/* Advanced Options */}
      {showOptions && (
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm relative animate-in fade-in slide-in-from-top-2">
          <button onClick={() => setShowOptions(false)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><X size={16} /></button>
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2"><Settings2 size={16} /> Advanced Settings</h4>
          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Syntax Mode</span>
              <select value={syntaxMode} onChange={(e) => setSyntaxMode(e.target.value as any)} className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-sm px-2 py-1 text-slate-700 dark:text-slate-300">
                <option value="babel">JavaScript / JSX</option>
                <option value="typescript">TypeScript / TSX</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Toggles</span>
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="checkbox" checked={formatOnPaste} onChange={(e) => setFormatOnPaste(e.target.checked)} className="rounded text-[#518231] focus:ring-[#518231]" />
                Format on Paste
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
                <input type="checkbox" checked={autoCopy} onChange={(e) => setAutoCopy(e.target.checked)} className="rounded text-[#518231] focus:ring-[#518231]" />
                Auto-copy Output
              </label>
            </div>
          </div>
        </div>
      )}

      {/* History */}
      {showHistory && history.length > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-xl p-4 shadow-sm relative animate-in fade-in slide-in-from-top-2">
          <button onClick={() => setShowHistory(false)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><X size={16} /></button>
          <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-3 flex items-center gap-2"><History size={16} /> Recent Sessions</h4>
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {history.map((h, i) => (
              <button key={i} onClick={() => setInput(h)} className="text-left text-xs font-mono p-2 bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-800/50 rounded hover:border-indigo-300 dark:hover:border-indigo-600 truncate text-slate-600 dark:text-slate-400 transition-colors">
                {h.substring(0, 100)}...
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Alerts */}
      <div className="flex flex-col gap-2">
        {error && (
          <div className="p-3 rounded-lg flex items-start gap-3 border shadow-sm bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800/80 dark:text-red-300">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
            <div className="font-medium text-sm break-all">{error}</div>
          </div>
        )}
        {successMsg && !error && (
          <div className="p-3 rounded-lg flex items-start gap-3 border shadow-sm bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-300">
            <CheckCircle size={18} className="shrink-0 mt-0.5" />
            <div className="font-medium text-sm">{successMsg}</div>
          </div>
        )}
      </div>

      {/* Editors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px] min-h-[500px]">
        {/* INPUT */}
        <div className={`flex flex-col h-full border rounded-xl overflow-hidden bg-white dark:bg-slate-900 relative transition-colors duration-300 ${error ? 'border-red-500 shadow-[0_0_15px_-3px_rgba(239,68,68,0.3)]' : 'border-slate-200 dark:border-slate-800 shadow-sm'}`}>
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">Input JS / TS</span>
            <div className="flex gap-2 items-center">
              <button onClick={() => setWordWrap(!wordWrap)} className={`p-1 rounded transition-colors ${wordWrap ? 'bg-[#518231] text-white' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-400'}`} title="Word Wrap"><WrapText size={16} /></button>
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1" />
              <button onClick={handlePaste} className="text-xs px-2 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded transition-colors flex items-center gap-1"><Clipboard size={12} /> Paste</button>
              <button onClick={loadSample} className="text-xs px-2 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded transition-colors">Sample</button>
            </div>
          </div>
          <div className="flex-1 flex overflow-hidden relative">
            {!wordWrap && (
              <div ref={linesScrollRef} className="w-12 shrink-0 bg-slate-50 dark:bg-slate-900/80 border-r border-slate-100 dark:border-slate-800 text-right pr-2 py-4 select-none overflow-hidden text-xs font-mono text-slate-400">
                {Array.from({ length: Math.max(inputLines, 1) }).map((_, i) => (
                  <div key={i} className="leading-relaxed">{i + 1}</div>
                ))}
              </div>
            )}
            <div className="relative flex-1 h-full overflow-hidden bg-white dark:bg-slate-900">
              <pre ref={syntaxScrollRef} className={`absolute inset-0 p-4 m-0 font-mono text-sm leading-relaxed pointer-events-none custom-scrollbar overflow-hidden ${wordWrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'}`} aria-hidden="true">
                <JsSyntax text={input} />
              </pre>
              <textarea
                ref={inputScrollRef}
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(null); }}
                onScroll={handleInputScroll}
                placeholder="Paste your minified JavaScript or TypeScript here..."
                className={`absolute inset-0 w-full h-full p-4 resize-none focus:outline-none bg-transparent font-mono text-sm leading-relaxed custom-scrollbar text-transparent caret-slate-900 dark:caret-white ${wordWrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'}`}
                spellCheck={false}
              />
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-1.5 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span>Lines: {inputLines}</span>
            <span>Size: {fmtSize(inputSize)}</span>
          </div>
        </div>

        {/* OUTPUT */}
        <div className="flex flex-col h-full border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">Output</span>
          </div>
          <div className="flex-1 overflow-auto bg-slate-50/30 dark:bg-slate-950/50 custom-scrollbar">
            <pre className={`w-full h-full p-4 overflow-auto bg-transparent font-mono text-sm m-0 ${wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}>
              {output ? <JsSyntax text={output} /> : <span className="text-slate-400 dark:text-slate-500">Result will appear here...</span>}
            </pre>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-1.5 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span>Lines: {outputLines}</span>
            <span>Size: {fmtSize(outputSize)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
