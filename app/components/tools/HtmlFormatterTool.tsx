"use client";

import React, { useState, useRef, useEffect } from "react";
import { Copy, Download, Trash2, Upload, FileCode2, CheckCircle, AlertTriangle, Search, ChevronDown, History, X, WrapText, Clipboard, Link as LinkIcon, Settings2, Eye, Code2 } from "lucide-react";
import { Link } from "../../../i18n/routing";

// --- Helpers ---
const validateHTML = (html: string) => {
  const stack: string[] = [];
  const tagRegex = /<\/?([a-z0-9]+)[^>]*>/gi;
  let match;
  const voidElements = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
  
  while ((match = tagRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    
    if (fullTag.startsWith('</')) {
      if (stack.length === 0) return `Unexpected closing tag </${tagName}>`;
      const last = stack.pop();
      if (last !== tagName) return `Mismatched closing tag: expected </${last}> but found </${tagName}>`;
    } else if (!fullTag.endsWith('/>') && !voidElements.has(tagName) && !fullTag.startsWith('<!--')) {
      stack.push(tagName);
    }
  }
  
  if (stack.length > 0) return `Unclosed tag: <${stack[stack.length - 1]}>`;
  return null;
};

const HtmlSyntax = ({ text }: { text: string }) => {
  if (!text) return null;
  const tokens = text.split(/(<\/?[a-z0-9:-]+[\s\S]*?>|<!--[\s\S]*?-->)/gi);
  return (
    <>
      {tokens.map((token, i) => {
        if (!token) return null;
        if (token.startsWith('<!--')) {
          return <span key={i} className="text-slate-400 italic">{token}</span>;
        }
        if (token.startsWith('<') && token.endsWith('>')) {
          const match = token.match(/^(<\/?)([a-z0-9:-]+)(.*?)(\/?>)$/i);
          if (match) {
            const [, prefix, name, attrs, suffix] = match;
            return (
              <span key={i}>
                <span className="text-slate-400 dark:text-slate-500">{prefix}</span>
                <span className="text-[#e34c26] dark:text-[#f06529] font-medium">{name}</span>
                <span className="text-indigo-600 dark:text-[#9cdcfe]">{attrs}</span>
                <span className="text-slate-400 dark:text-slate-500">{suffix}</span>
              </span>
            );
          }
          return <span key={i} className="text-[#e34c26] dark:text-[#f06529]">{token}</span>;
        }
        return <span key={i} className="text-slate-800 dark:text-slate-200">{token}</span>;
      })}
    </>
  );
};
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
    return <>{text}</>;
  }
};

const formatHTML = (html: string, indent: number = 2): string => {
  const tab = ' '.repeat(indent);
  let result = '';
  let indentLevel = 0;

  let processed = html.replace(/>\s*</g, '>\n<')
             .replace(/</g, '~::~<')
             .replace(/\s*xmlns\:/g, '~::~xmlns:')
             .replace(/\s*xmlns\=/g, '~::~xmlns=');

  const lines = processed.split('~::~');
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();
    if (line.length === 0) continue;

    if (line.match(/^<\/[a-zA-Z0-9]+>/)) {
      indentLevel = Math.max(0, indentLevel - 1);
    }

    result += tab.repeat(indentLevel) + line + '\n';

    if (line.match(/^<[a-zA-Z0-9]+[^>]*>$/) && !line.match(/<\/[a-zA-Z0-9]+>/) && !line.match(/\/>$/) && !line.match(/^(<img|<input|<br|<hr|<meta|<link|<source|<track|<wbr)/i)) {
      indentLevel++;
    }
  }

  return result.trim().replace(/\n\s*\n/g, '\n');
};

const minifyHTML = (html: string): string => {
  return html.replace(/\s+/g, ' ')
             .replace(/>\s+</g, '><')
             .replace(/<!--[\s\S]*?-->/g, '')
             .trim();
};

export function HtmlFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState({ removeComments: false, removeScripts: false, removeStyles: false, convertToJsx: false });
  const [autoCopy, setAutoCopy] = useState(false);
  const [indent, setIndent] = useState<number>(2);
  const [wordWrap, setWordWrap] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"code" | "preview">("code");
  
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
    const saved = localStorage.getItem("html_formatter_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const saveToHistory = (val: string) => {
    if (!val.trim()) return;
    const newHistory = [val, ...history.filter(h => h !== val)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("html_formatter_history", JSON.stringify(newHistory));
  };

  const processHtml = (action: "format" | "minify") => {
    if (!input.trim()) {
      setError("Input is empty.");
      setOutput("");
      return;
    }
    
    try {
      saveToHistory(input);
      setError(null);
      setWarning(null);
      
      let tempHtml = input;
      if (options.removeScripts) tempHtml = tempHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      if (options.removeStyles) tempHtml = tempHtml.replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '');
      if (options.removeComments) tempHtml = tempHtml.replace(/<!--[\s\S]*?-->/g, '');

      if (options.convertToJsx) {
        tempHtml = tempHtml
          .replace(/class=/gi, "className=")
          .replace(/for=/gi, "htmlFor=")
          .replace(/tabindex=/gi, "tabIndex=")
          .replace(/crossorigin=/gi, "crossOrigin=")
          .replace(/<(img|input|br|hr|meta|link|source|track|wbr)([^>]*[^\/])>/gi, '<$1$2 />')
          .replace(/<!--([\s\S]*?)-->/g, "{/*$1*/}");
      }

      const validationError = validateHTML(tempHtml);
      if (validationError) {
        setWarning(validationError);
      }
      
      if (action === "format") {
        const formatted = formatHTML(tempHtml, indent);
        setOutput(formatted);
        if (autoCopy) {
          navigator.clipboard.writeText(formatted);
          setSuccessMsg("Formatted & copied to clipboard!");
        } else {
          setSuccessMsg("HTML formatted successfully!");
        }
      } else {
        const minified = minifyHTML(tempHtml);
        setOutput(minified);
        if (autoCopy) {
          navigator.clipboard.writeText(minified);
          setSuccessMsg("Minified & copied to clipboard!");
        } else {
          setSuccessMsg("HTML minified successfully!");
        }
      }
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (e: any) {
      setError("Failed to process HTML: " + e.message);
      setOutput("");
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
    const blob = new Blob([output], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.html";
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
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setWarning(null);
    setSuccessMsg(null);
    setSearchTerm("");
  };

  const loadSample = () => {
    setInput(`<!DOCTYPE html><html><head><title>Sample</title></head><body><div class="container"><header><h1>Welcome</h1><p>Sample HTML code</p></header><ul><li>Item 1</li><li>Item 2</li></ul></div></body></html>`);
  };

  const handleCompare = () => {
    localStorage.setItem("diff_checker_left", input);
    localStorage.setItem("diff_checker_right", output || input);
    localStorage.setItem("diff_checker_source", "html-formatter");
  };

  const inputLinesCount = input ? input.split('\n').length : 0;
  const inputSize = new Blob([input]).size;
  const outputLinesCount = output ? output.split('\n').length : 0;
  const outputSize = new Blob([output]).size;

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Top Bar Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        {/* Left Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center shadow-sm rounded-lg">
            <button onClick={() => processHtml("format")} className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-l-lg font-medium transition-colors flex items-center gap-2 text-sm">
              <FileCode2 size={16} /> Format
            </button>
            <div className="relative border-l border-[#436a28] h-full flex items-center bg-[#518231] hover:bg-[#436a28] rounded-r-lg transition-colors">
              <select 
                value={indent} 
                onChange={(e) => { 
                  const val = Number(e.target.value);
                  setIndent(val); 
                  if (output) setOutput(formatHTML(input, val)); 
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
          <button onClick={() => processHtml("minify")} className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm dark:bg-slate-700 dark:hover:bg-slate-600">
            <FileCode2 size={16} /> Minify
          </button>
          <button onClick={() => setShowOptions(!showOptions)} className={`px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm border ${showOptions ? 'bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-800 dark:text-white' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
            <Settings2 size={16} /> <span className="hidden sm:inline">Advanced Options</span>
          </button>
        </div>
        
        {/* Right Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <input type="file" accept=".html,.htm,text/html" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          <Link href={"/tools/diff-checker" as any} onClick={handleCompare} className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 text-sm dark:text-slate-400" title="Compare HTML">
            <LinkIcon size={18} /> <span className="hidden lg:inline">Compare</span>
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

      {/* Advanced Options Panel */}
      {showOptions && (
        <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm relative animate-in fade-in slide-in-from-top-2">
          <button onClick={() => setShowOptions(false)} className="absolute top-2 right-2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"><X size={16} /></button>
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2"><Settings2 size={16} /> Advanced Formatting</h4>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
              <input type="checkbox" checked={options.removeComments} onChange={(e) => setOptions({...options, removeComments: e.target.checked})} className="rounded text-[#518231] focus:ring-[#518231] bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
              Remove Comments
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
              <input type="checkbox" checked={options.removeScripts} onChange={(e) => setOptions({...options, removeScripts: e.target.checked})} className="rounded text-[#518231] focus:ring-[#518231] bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
              Remove Scripts
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
              <input type="checkbox" checked={options.removeStyles} onChange={(e) => setOptions({...options, removeStyles: e.target.checked})} className="rounded text-[#518231] focus:ring-[#518231] bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
              Remove Styles
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors">
              <input type="checkbox" checked={options.convertToJsx} onChange={(e) => setOptions({...options, convertToJsx: e.target.checked})} className="rounded text-[#518231] focus:ring-[#518231] bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
              Convert to React JSX
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white transition-colors border-l border-slate-200 dark:border-slate-700 pl-6">
              <input type="checkbox" checked={autoCopy} onChange={(e) => setAutoCopy(e.target.checked)} className="rounded text-[#518231] focus:ring-[#518231] bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
              Auto-copy to clipboard
            </label>
          </div>
        </div>
      )}

      {/* History Panel */}
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
          <div className="p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border shadow-sm bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800/80 dark:text-red-300">
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} className="shrink-0 mt-0.5" />
              <div className="font-medium text-sm break-all leading-relaxed">{error}</div>
            </div>
            {history.length > 0 && (
              <button onClick={() => { setInput(history[0]); setError(null); setWarning(null); setSuccessMsg("Reset to last HTML"); }} className="px-3 py-1.5 text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-md dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors shrink-0 shadow-sm flex items-center gap-1.5">
                <History size={14} /> Reset
              </button>
            )}
          </div>
        )}
        
        {warning && (
          <div className="p-3 rounded-lg flex items-start gap-3 border shadow-sm bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800/80 dark:text-amber-300">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
            <div className="font-medium text-sm break-all leading-relaxed">
              <strong>Validation Warning:</strong> {warning}
            </div>
          </div>
        )}

        {successMsg && !error && (
          <div className="p-3 rounded-lg flex items-start gap-3 border shadow-sm bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-300">
            <CheckCircle size={18} className="shrink-0 mt-0.5" />
            <div className="font-medium text-sm break-all leading-relaxed">{successMsg}</div>
          </div>
        )}
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[600px] min-h-[500px]">
        
        {/* INPUT EDITOR */}
        <div className={`flex flex-col h-full border rounded-xl overflow-hidden bg-white dark:bg-slate-900 relative group transition-colors duration-300 ${warning ? 'border-red-500 shadow-[0_0_15px_-3px_rgba(239,68,68,0.3)]' : 'border-slate-200 dark:border-slate-800 shadow-sm'}`}>
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">Input HTML</span>
            <div className="flex gap-2 items-center">
              <button onClick={() => setWordWrap(!wordWrap)} className={`p-1 rounded transition-colors ${wordWrap ? 'bg-[#518231] text-white' : 'text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 dark:text-slate-400'}`} title="Toggle Word Wrap"><WrapText size={16} /></button>
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-700 mx-1"></div>
              <button onClick={handlePaste} className="text-xs px-2 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded transition-colors flex items-center gap-1"><Clipboard size={12} /> Paste</button>
              <button onClick={loadSample} className="text-xs px-2 py-1 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded transition-colors">Sample</button>
            </div>
          </div>
          <div className="flex-1 flex overflow-hidden relative">
            {!wordWrap && (
              <div ref={linesScrollRef} className="w-12 shrink-0 bg-slate-50 dark:bg-slate-900/80 border-r border-slate-100 dark:border-slate-800 text-right pr-2 py-4 select-none overflow-hidden text-xs font-mono text-slate-400">
                 {Array.from({ length: Math.max(inputLinesCount, 1) }).map((_, i) => (
                   <div key={i} className="leading-relaxed">{i + 1}</div>
                 ))}
              </div>
            )}
            <div className="relative flex-1 h-full overflow-hidden bg-white dark:bg-slate-900">
              <pre ref={syntaxScrollRef} className={`absolute inset-0 p-4 m-0 font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-200 pointer-events-none custom-scrollbar overflow-hidden ${wordWrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'}`} aria-hidden="true">
                 <HtmlSyntax text={input} />
              </pre>
              <textarea
                ref={inputScrollRef}
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(null); setWarning(null); }}
                onScroll={handleInputScroll}
                placeholder="Paste your raw or minified HTML here..."
                className={`absolute inset-0 w-full h-full p-4 resize-none focus:outline-none bg-transparent font-mono text-sm leading-relaxed custom-scrollbar text-transparent caret-slate-900 dark:caret-white ${wordWrap ? 'whitespace-pre-wrap break-words' : 'whitespace-pre'}`}
                spellCheck={false}
              />
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-1.5 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span>Lines: {inputLinesCount}</span>
            <span>Size: {formatSize(inputSize)}</span>
          </div>
        </div>

        {/* OUTPUT EDITOR */}
        <div className="flex flex-col h-full border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm relative">
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-sm text-slate-700 dark:text-slate-300 hidden sm:inline">Output</span>
              <div className="flex bg-slate-200 dark:bg-slate-800 rounded-lg p-0.5">
                <button onClick={() => setViewMode("code")} className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${viewMode === "code" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`}><Code2 size={14} /> Code</button>
                <button onClick={() => setViewMode("preview")} className={`px-3 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${viewMode === "preview" ? "bg-[#518231] shadow-sm text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`}><Eye size={14} /> Preview</button>
              </div>
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
            {viewMode === "code" ? (
              <pre className={`w-full h-full p-4 overflow-auto focus:outline-none bg-transparent font-mono text-sm text-slate-800 dark:text-slate-200 m-0 ${wordWrap ? 'whitespace-pre-wrap' : 'whitespace-pre'}`}>
                {searchTerm ? (
                  <HighlightedText text={output || "Result will appear here..."} search={searchTerm} />
                ) : (
                  <HtmlSyntax text={output || "Result will appear here..."} />
                )}
              </pre>
            ) : (
              <div className="w-full h-full bg-white">
                {output ? (
                  <iframe srcDoc={output} title="HTML Preview" className="w-full h-full border-0" sandbox="allow-scripts" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">
                    Format some HTML to see the preview
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-1.5 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
            <span>Lines: {outputLinesCount}</span>
            <span>Size: {formatSize(outputSize)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
