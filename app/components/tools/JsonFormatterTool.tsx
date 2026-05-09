"use client";

import React, { useState, useRef, useEffect } from "react";
import { Copy, Download, Trash2, Upload, FileJson, CheckCircle, AlertTriangle, FileCode2, Search, Table, Code, ChevronRight, ChevronDown, History, X, GitCompare, WrapText, Clipboard, Wand2 } from "lucide-react";
import { Link } from "../../../i18n/routing";

// --- Helpers ---
const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const HighlightedText = ({ text, search }: { text: string, search: string }) => {
  if (!search) return <>{text}</>;
  try {
    const safeSearch = escapeRegExp(search);
    const parts = text.split(new RegExp(`(${safeSearch})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === search.toLowerCase() ? <mark key={i} className="bg-yellow-300 text-black px-0.5 rounded">{part}</mark> : part
        )}
      </>
    );
  } catch (e) {
    return <>{text}</>; // Fallback
  }
};
const getLineFromError = (errMessage: string, text: string): number | null => {
  const lineMatch = errMessage.match(/line (\d+)/);
  if (lineMatch) return parseInt(lineMatch[1], 10);
  
  const posMatch = errMessage.match(/position (\d+)/);
  if (posMatch) {
    const pos = parseInt(posMatch[1], 10);
    return text.substring(0, pos).split('\n').length;
  }
  return null;
};

const jsonToXml = (obj: any, rootName = "root"): string => {
  let xml = "";
  if (Array.isArray(obj)) {
    for (const item of obj) {
      xml += `<item>${jsonToXml(item, "")}</item>\n`;
    }
  } else if (typeof obj === "object" && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      xml += `<${key}>${jsonToXml(value, "")}</${key}>\n`;
    }
  } else {
    xml += obj;
  }
  return rootName ? `<${rootName}>\n${xml}</${rootName}>` : xml;
};

const jsonToCsv = (obj: any): string => {
  let arr = obj;
  if (!Array.isArray(obj)) {
    arr = [obj];
  }
  if (arr.length === 0) return "";
  
  const headers: string[] = Array.from(new Set(arr.flatMap((x: any) => Object.keys(x || {}))));
  let csv = headers.join(",") + "\n";
  
  for (const item of arr) {
    const row = headers.map((h: string) => {
      let val = item[h];
      if (val === null || val === undefined) return "";
      if (typeof val === "object") val = JSON.stringify(val);
      val = String(val).replace(/"/g, '""');
      return `"${val}"`;
    });
    csv += row.join(",") + "\n";
  }
  return csv;
};

// --- Custom Tree View Component ---
const JsonNode = ({ name, value, isLast, search }: { name?: string, value: any, isLast: boolean, search: string }) => {
  const [expanded, setExpanded] = useState(true);
  
  const isArray = Array.isArray(value);
  const isObject = typeof value === 'object' && value !== null && !isArray;
  const isPrimitive = !isArray && !isObject;

  const highlight = (text: string) => {
    if (!search) return text;
    try {
      const safeSearch = escapeRegExp(search);
      const parts = text.split(new RegExp(`(${safeSearch})`, 'gi'));
      return parts.map((part, i) => 
        part.toLowerCase() === search.toLowerCase() ? <mark key={i} className="bg-yellow-300 text-black px-0.5 rounded">{part}</mark> : part
      );
    } catch(e) {
      return text;
    }
  };

  const renderValue = () => {
    if (value === null) return <span className="text-gray-500">null</span>;
    if (typeof value === 'boolean') return <span className="text-purple-500">{value.toString()}</span>;
    if (typeof value === 'number') return <span className="text-blue-500">{value}</span>;
    if (typeof value === 'string') return <span className="text-green-600 dark:text-green-400">"{highlight(value)}"</span>;
    return null;
  };

  if (isPrimitive) {
    return (
      <div className="pl-4 font-mono text-sm leading-relaxed">
        {name && <span className="text-blue-700 dark:text-blue-400">"{highlight(name)}"</span>}
        {name && <span className="text-slate-500 mr-1">:</span>}
        {renderValue()}
        {!isLast && <span className="text-slate-500">,</span>}
      </div>
    );
  }

  const keys = Object.keys(value);
  const isEmpty = keys.length === 0;
  const openBracket = isArray ? '[' : '{';
  const closeBracket = isArray ? ']' : '}';

  return (
    <div className="pl-4 font-mono text-sm leading-relaxed">
      <div className="flex items-center group">
        {!isEmpty && (
          <button onClick={() => setExpanded(!expanded)} className="w-4 h-4 flex items-center justify-center -ml-4 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
        {isEmpty && <span className="w-4 h-4 -ml-4 inline-block"></span>}
        
        {name && <span className="text-blue-700 dark:text-blue-400">"{highlight(name)}"</span>}
        {name && <span className="text-slate-500 mr-1">:</span>}
        <span className="text-slate-500">{openBracket}</span>
        {!expanded && !isEmpty && <span className="text-slate-400 mx-1">...</span>}
        {!expanded && <span className="text-slate-500">{closeBracket}{!isLast ? ',' : ''}</span>}
        {!expanded && <span className="ml-2 text-xs text-slate-400 italic">({keys.length} items)</span>}
      </div>
      
      {expanded && !isEmpty && (
        <div>
          {keys.map((key, index) => (
            <JsonNode 
              key={key} 
              name={isArray ? undefined : key} 
              value={value[key as keyof typeof value]} 
              isLast={index === keys.length - 1} 
              search={search}
            />
          ))}
          <div className="text-slate-500">{closeBracket}{!isLast ? ',' : ''}</div>
        </div>
      )}
    </div>
  );
};

// --- Main Component ---
export function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [parsedObj, setParsedObj] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorLine, setErrorLine] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  // UI States
  const [viewMode, setViewMode] = useState<"text" | "tree">("text");
  const [searchTerm, setSearchTerm] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [indent, setIndent] = useState<number>(2);
  const [wordWrap, setWordWrap] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputScrollRef = useRef<HTMLTextAreaElement>(null);
  const linesScrollRef = useRef<HTMLDivElement>(null);

  // Sync scroll for line numbers
  const handleInputScroll = () => {
    if (inputScrollRef.current && linesScrollRef.current) {
      linesScrollRef.current.scrollTop = inputScrollRef.current.scrollTop;
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("json_formatter_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (val: string) => {
    if (!val.trim()) return;
    const newHistory = [val, ...history.filter(h => h !== val)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("json_formatter_history", JSON.stringify(newHistory));
  };

  const processJson = (action: "format" | "minify" | "validate") => {
    try {
      if (!input.trim()) {
        setError("Input is empty.");
        setOutput("");
        setParsedObj(null);
        setErrorLine(null);
        return;
      }
      const parsed = JSON.parse(input);
      setParsedObj(parsed);
      setErrorLine(null);
      setError(null);
      saveToHistory(input);
      
      if (action === "format") {
        setOutput(JSON.stringify(parsed, null, indent));
        setSuccessMsg("JSON formatted successfully!");
      } else if (action === "minify") {
        setOutput(JSON.stringify(parsed));
        setSuccessMsg("JSON minified successfully!");
      } else {
        setOutput(JSON.stringify(parsed, null, indent));
        setSuccessMsg("Valid JSON!");
      }
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (e: any) {
      setError("Invalid JSON: " + e.message);
      setErrorLine(getLineFromError(e.message, input));
      setOutput("");
      setParsedObj(null);
    }
  };

  const attemptAutoFix = () => {
    if (!input.trim()) return;
    try {
      let fixed = input
        .replace(/([{,]\s*)([A-Za-z0-9_\-]+)\s*:/g, '$1"$2":') // Quote unquoted keys
        .replace(/:\s*'([^']*)'/g, ':"$1"') // Replace single quotes for values
        .replace(/,\s*([}\]])/g, '$1'); // Remove trailing commas
        
      const parsed = JSON.parse(fixed); // test if it passes now
      const formatted = JSON.stringify(parsed, null, indent);
      setInput(formatted);
      setOutput(formatted);
      setParsedObj(parsed);
      setError(null);
      setErrorLine(null);
      setSuccessMsg("✨ Automatically fixed JSON formatting issues!");
    } catch(e) {
      setError("Auto-fix failed. The JSON is too severely broken to automatically repair.");
    }
  };

  const convertData = (format: "csv" | "xml") => {
    if (!parsedObj) {
      processJson("validate");
      if (!parsedObj) return; // if still fails, return
    }
    try {
      let result = "";
      if (format === "csv") result = jsonToCsv(parsedObj);
      if (format === "xml") result = jsonToXml(parsedObj);
      
      setOutput(result);
      setViewMode("text");
      setSuccessMsg(`Converted to ${format.toUpperCase()}!`);
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (e: any) {
      setError(`Failed to convert to ${format.toUpperCase()}: ` + e.message);
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setSuccessMsg("Copied to clipboard!");
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data.${output.startsWith('<') ? 'xml' : output.includes(',') ? 'csv' : 'json'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setError(null);
      setErrorLine(null);
    } catch (err) {
      console.error("Failed to read clipboard");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setInput(event.target.result as string);
        setError(null);
        setErrorLine(null);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setParsedObj(null);
    setError(null);
    setErrorLine(null);
    setSuccessMsg(null);
    setSearchTerm("");
  };

  const handleCompare = () => {
    localStorage.setItem("diff_checker_left", input);
    localStorage.setItem("diff_checker_right", output || input);
  };

  const loadSample = (type: 1 | 2) => {
    if (type === 1) setInput(`{\n  "users": [\n    {"id": 1, "name": "Alice", "active": true},\n    {"id": 2, "name": "Bob", "active": false}\n  ],\n  "total": 2\n}`);
    if (type === 2) setInput(`{\n  "company": "TechInc",\n  "departments": {\n    "engineering": ["Frontend", "Backend"],\n    "hr": ["Recruiting"]\n  },\n  "established": 2020\n}`);
  };

  const inputLines = input.split('\n').length;

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Top Bar Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        {/* Left Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center shadow-sm rounded-lg">
            <button onClick={() => processJson("format")} className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-l-lg font-medium transition-colors flex items-center gap-2 text-sm">
              <FileJson size={16} /> Format
            </button>
            <div className="relative border-l border-[#436a28] h-full flex items-center bg-[#518231] hover:bg-[#436a28] rounded-r-lg transition-colors">
              <select 
                value={indent} 
                onChange={(e) => { 
                  const val = Number(e.target.value);
                  setIndent(val); 
                  if (parsedObj) setOutput(JSON.stringify(parsedObj, null, val)); 
                }}
                className="appearance-none bg-transparent text-white pl-2 pr-6 py-2 text-sm font-medium focus:outline-none cursor-pointer"
                title="Indentation"
              >
                <option value={2} className="text-slate-900">2 Spaces</option>
                <option value={3} className="text-slate-900">3 Spaces</option>
                <option value={4} className="text-slate-900">4 Spaces</option>
              </select>
              <div className="absolute right-1.5 pointer-events-none text-white opacity-80">
                <ChevronDown size={14} />
              </div>
            </div>
          </div>
          <button onClick={() => processJson("validate")} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm">
            <CheckCircle size={16} /> Validate
          </button>
          <button onClick={() => processJson("minify")} className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm dark:bg-slate-700 dark:hover:bg-slate-600">
            <FileCode2 size={16} /> Minify
          </button>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
          <button onClick={() => convertData("csv")} className="px-3 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm">
            <Table size={16} /> CSV
          </button>
          <button onClick={() => convertData("xml")} className="px-3 py-2 text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm">
            <Code size={16} /> XML
          </button>
        </div>
        
        {/* Right Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <input type="file" accept=".json,application/json" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          <Link href={"/tools/diff-checker" as any} onClick={handleCompare} className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 text-sm dark:text-slate-400" title="Compare JSON">
            <GitCompare size={18} /> <span className="hidden lg:inline">Compare</span>
          </Link>
          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 text-sm dark:text-slate-400" title="Upload File">
            <Upload size={18} /> <span className="hidden lg:inline">Upload</span>
          </button>
          <button onClick={() => setShowHistory(!showHistory)} className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${showHistory ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`} title="History">
            <History size={18} /> <span className="hidden lg:inline">History</span>
          </button>
          <button onClick={handleCopy} disabled={!output} className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 dark:text-slate-400" title="Copy Output">
            <Copy size={18} />
          </button>
          <button onClick={handleDownload} disabled={!output} className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors disabled:opacity-50 dark:text-slate-400" title="Download">
            <Download size={18} />
          </button>
          <button onClick={handleClear} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors dark:text-red-400" title="Clear">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* History Panel */}
      {showHistory && history.length > 0 && (
        <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-800/30 rounded-xl p-4 shadow-sm relative animate-in fade-in slide-in-from-top-2">
          <button onClick={() => setShowHistory(false)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><X size={16} /></button>
          <h4 className="font-semibold text-indigo-900 dark:text-indigo-300 mb-3 flex items-center gap-2"><History size={16} /> Recent Sessions</h4>
          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
             {history.map((h, i) => (
               <button key={i} onClick={() => setInput(h)} className="text-left text-xs font-mono p-2 bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-800/50 rounded hover:border-indigo-300 dark:hover:border-indigo-600 truncate text-slate-600 dark:text-slate-400 transition-colors">
                 {h}
               </button>
             ))}
          </div>
        </div>
      )}

      {/* Alerts */}
      {(error || successMsg) && (
        <div className={`p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border shadow-sm ${error ? 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800/80 dark:text-red-300' : 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-300'}`}>
          <div className="flex items-start gap-3">
            {error ? <AlertTriangle size={20} className="shrink-0 mt-0.5 text-red-600 dark:text-red-400" /> : <CheckCircle size={20} className="shrink-0 mt-0.5" />}
            <div className="font-medium text-sm break-all leading-relaxed">
              {error || successMsg}
              {errorLine && (
                <span className="ml-2 font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-950 px-2.5 py-0.5 rounded border border-red-200 dark:border-red-800 shadow-sm inline-flex items-center">
                  Line {errorLine}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap">
            {error && (
              <button onClick={attemptAutoFix} className="px-3 py-1.5 text-xs font-bold bg-[#518231] text-white border border-[#436a28] hover:bg-[#436a28] rounded-md transition-colors shadow-sm flex items-center gap-1.5">
                <Wand2 size={14} /> Auto-Fix JSON
              </button>
            )}
            {error && history.length > 0 && (
              <button onClick={() => { setInput(history[0]); setError(null); setErrorLine(null); setSuccessMsg("Reset to last valid JSON"); }} className="px-3 py-1.5 text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors shrink-0 shadow-sm flex items-center gap-1.5">
                <History size={14} /> Reset to Last Valid
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px] min-h-[500px]">
        
        {/* INPUT EDITOR */}
        <div className="flex flex-col h-full border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm relative group">
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">Input JSON</span>
            <div className="flex gap-2 items-center">
              <button onClick={() => setWordWrap(!wordWrap)} className={`p-1 rounded transition-colors ${wordWrap ? 'bg-[#518231] text-white' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-400'}`} title="Toggle Word Wrap"><WrapText size={16} /></button>
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1"></div>
              <button onClick={handlePaste} className="text-xs px-2 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded transition-colors flex items-center gap-1"><Clipboard size={12} /> Paste</button>
              <button onClick={() => loadSample(1)} className="text-xs px-2 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded transition-colors">Sample 1</button>
              <button onClick={() => loadSample(2)} className="text-xs px-2 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded transition-colors">Sample 2</button>
            </div>
          </div>
          <div className="flex-1 flex overflow-hidden relative">
            {/* Custom Line Numbers - Hidden if word wrap is on to prevent descync */}
            {!wordWrap && (
              <div ref={linesScrollRef} className="w-12 shrink-0 bg-slate-50 dark:bg-slate-900/80 border-r border-slate-100 dark:border-slate-800 text-right pr-2 py-4 select-none overflow-hidden text-xs font-mono text-slate-400">
                 {Array.from({ length: Math.max(inputLines, 1) }).map((_, i) => (
                   <div key={i} className={`leading-relaxed ${errorLine === i + 1 ? 'text-red-500 font-bold bg-red-100 dark:bg-red-900/30 rounded px-1 -mr-1' : ''}`}>{i + 1}</div>
                 ))}
              </div>
            )}
            <textarea
              ref={inputScrollRef}
              value={input}
              onChange={(e) => { setInput(e.target.value); setErrorLine(null); setError(null); }}
              onScroll={handleInputScroll}
              placeholder="Paste your raw or minified JSON here..."
              className={`flex-1 w-full p-4 resize-none focus:outline-none bg-transparent font-mono text-sm text-slate-800 dark:text-slate-200 leading-relaxed custom-scrollbar ${wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}
              spellCheck={false}
            />
          </div>
        </div>

        {/* OUTPUT EDITOR */}
        <div className="flex flex-col h-full border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm relative">
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">Output</span>
              {parsedObj && (
                <div className="flex bg-slate-200 dark:bg-slate-700 rounded p-0.5">
                  <button onClick={() => setViewMode("text")} className={`px-2 py-0.5 text-xs rounded transition-colors ${viewMode === 'text' ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white font-medium' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}>Text</button>
                  <button onClick={() => setViewMode("tree")} className={`px-2 py-0.5 text-xs rounded transition-colors ${viewMode === 'tree' ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white font-medium' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}>Tree</button>
                </div>
              )}
            </div>
            
            <div className="relative flex-1 max-w-[200px]">
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <Search size={14} className="text-slate-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search output..."
                className="w-full pl-8 pr-3 py-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded text-xs focus:outline-none focus:border-[#518231] dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-auto bg-slate-50/30 dark:bg-slate-950/50 relative custom-scrollbar">
            {viewMode === "text" ? (
              <pre className={`w-full h-full p-4 overflow-auto focus:outline-none bg-transparent font-mono text-sm text-slate-800 dark:text-slate-200 m-0 ${wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}>
                <HighlightedText text={output || "Result will appear here..."} search={searchTerm} />
              </pre>
            ) : (
              <div className="p-4 h-full overflow-auto">
                {parsedObj ? (
                  <JsonNode value={parsedObj} isLast={true} search={searchTerm} />
                ) : (
                  <div className="text-sm text-slate-400 font-mono flex items-center justify-center h-full">Format valid JSON to view tree structure.</div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
