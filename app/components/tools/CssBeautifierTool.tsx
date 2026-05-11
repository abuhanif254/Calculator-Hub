"use client";

import React, { useState, useRef, useEffect } from "react";
import { Copy, Download, Trash2, Upload, FileCode2, CheckCircle, AlertTriangle, ChevronDown, History, X, WrapText, Clipboard, Link as LinkIcon, Settings2 } from "lucide-react";
import { Link } from "../../../i18n/routing";

// --- CSS Formatting Engine ---
const formatCSS = (css: string, indentSize: number = 2, useTabs: boolean = false): string => {
  const indent = useTabs ? '\t' : ' '.repeat(indentSize);
  let result = '';
  let level = 0;
  let i = 0;
  const len = css.length;

  const addLine = (text: string, extraLevel = 0) => {
    result += indent.repeat(Math.max(0, level + extraLevel)) + text + '\n';
  };

  // Normalize whitespace
  let normalized = css.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // Ensure spaces after colons in declarations but not in selectors like :root
  // Process character by character for accuracy
  i = 0;
  result = '';
  level = 0;
  let buffer = '';

  const flush = () => {
    const trimmed = buffer.trim();
    if (trimmed) {
      addLine(trimmed);
    }
    buffer = '';
  };

  while (i < normalized.length) {
    const ch = normalized[i];
    const next = normalized[i + 1];

    // Handle comments
    if (ch === '/' && next === '*') {
      flush();
      let comment = '/*';
      i += 2;
      while (i < normalized.length) {
        if (normalized[i] === '*' && normalized[i + 1] === '/') {
          comment += '*/';
          i += 2;
          break;
        }
        comment += normalized[i];
        i++;
      }
      addLine(comment);
      continue;
    }

    // Handle single-line comments (SCSS style)
    if (ch === '/' && next === '/') {
      flush();
      let comment = '';
      while (i < normalized.length && normalized[i] !== '\n') {
        comment += normalized[i];
        i++;
      }
      addLine(comment.trim());
      i++; // skip newline
      continue;
    }

    // Opening brace
    if (ch === '{') {
      const selector = buffer.trim();
      if (selector) {
        // Add blank line before rule blocks (except at start)
        if (result.trim().length > 0 && !result.endsWith('\n\n')) {
          result += '\n';
        }
        addLine(selector + ' {');
      } else {
        addLine('{');
      }
      buffer = '';
      level++;
      i++;
      continue;
    }

    // Closing brace
    if (ch === '}') {
      flush();
      level = Math.max(0, level - 1);
      addLine('}');
      i++;
      continue;
    }

    // Semicolon - end of declaration
    if (ch === ';') {
      const decl = (buffer + ';').trim();
      if (decl.length > 1) {
        addLine(decl);
      }
      buffer = '';
      i++;
      continue;
    }

    // Accumulate characters
    if (ch === '\n' || ch === '\r') {
      // Convert newlines to space
      if (buffer.length > 0 && !buffer.endsWith(' ')) {
        buffer += ' ';
      }
    } else if (ch === ' ' || ch === '\t') {
      if (buffer.length > 0 && !buffer.endsWith(' ')) {
        buffer += ' ';
      }
    } else {
      buffer += ch;
    }
    i++;
  }

  flush();

  // Clean up: remove excessive blank lines
  return result.replace(/\n{3,}/g, '\n\n').trim();
};

const minifyCSS = (css: string): string => {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
    .replace(/\/\/.*$/gm, '')          // remove single-line comments
    .replace(/\s+/g, ' ')             // collapse whitespace
    .replace(/\s*{\s*/g, '{')
    .replace(/\s*}\s*/g, '}')
    .replace(/\s*;\s*/g, ';')
    .replace(/\s*:\s*/g, ':')
    .replace(/\s*,\s*/g, ',')
    .replace(/;}/g, '}')              // remove trailing semicolons
    .trim();
};

const validateCSS = (css: string): string | null => {
  let braceCount = 0;
  for (let i = 0; i < css.length; i++) {
    if (css[i] === '{') braceCount++;
    if (css[i] === '}') braceCount--;
    if (braceCount < 0) return `Unexpected closing brace '}' at position ${i}`;
  }
  if (braceCount > 0) return `${braceCount} unclosed brace(s) detected — missing '}'`;
  return null;
};

// --- CSS Syntax Highlighter ---
const CssSyntax = ({ text }: { text: string }) => {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, li) => {
        // Comment
        if (line.trim().startsWith('/*') || line.trim().startsWith('//')) {
          return <div key={li}><span className="text-slate-400 italic">{line}</span></div>;
        }
        // Closing brace
        if (line.trim() === '}') {
          return <div key={li}><span className="text-slate-500 dark:text-slate-400">{line}</span></div>;
        }
        // Opening brace line (selector)
        if (line.includes('{')) {
          const idx = line.indexOf('{');
          const selector = line.substring(0, idx);
          const brace = line.substring(idx);
          return (
            <div key={li}>
              <span className="text-[#d73a49] dark:text-[#ff7b72] font-medium">{selector}</span>
              <span className="text-slate-500 dark:text-slate-400">{brace}</span>
            </div>
          );
        }
        // Declaration (property: value;)
        const declMatch = line.match(/^(\s*)([\w-]+)(\s*:\s*)(.+?)(;?)$/);
        if (declMatch) {
          const [, ws, prop, colon, val, semi] = declMatch;
          return (
            <div key={li}>
              <span>{ws}</span>
              <span className="text-[#005cc5] dark:text-[#79c0ff]">{prop}</span>
              <span className="text-slate-500 dark:text-slate-400">{colon}</span>
              <span className="text-[#032f62] dark:text-[#a5d6ff]">{val}</span>
              <span className="text-slate-500 dark:text-slate-400">{semi}</span>
            </div>
          );
        }
        return <div key={li}><span className="text-slate-800 dark:text-slate-200">{line}</span></div>;
      })}
    </>
  );
};

// --- Main Component ---
export function CssBeautifierTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [warning, setWarning] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [autoCopy, setAutoCopy] = useState(false);
  const [indent, setIndent] = useState<number>(2);
  const [useTabs, setUseTabs] = useState(false);
  const [wordWrap, setWordWrap] = useState(false);
  const [formatOnPaste, setFormatOnPaste] = useState(true);

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
    const saved = localStorage.getItem("css_beautifier_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        processCSS("format");
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        processCSS("minify");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const saveToHistory = (val: string) => {
    if (!val.trim()) return;
    const newHistory = [val, ...history.filter(h => h !== val)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("css_beautifier_history", JSON.stringify(newHistory));
  };

  const processCSS = (action: "format" | "minify") => {
    if (!input.trim()) {
      setError("Input is empty.");
      setOutput("");
      return;
    }
    try {
      saveToHistory(input);
      setError(null);
      setWarning(null);

      const validationError = validateCSS(input);
      if (validationError) setWarning(validationError);

      if (action === "format") {
        const formatted = formatCSS(input, indent, useTabs);
        setOutput(formatted);
        if (autoCopy) {
          navigator.clipboard.writeText(formatted);
          setSuccessMsg("Formatted & copied!");
        } else {
          setSuccessMsg("CSS formatted successfully!");
        }
      } else {
        const minified = minifyCSS(input);
        setOutput(minified);
        if (autoCopy) {
          navigator.clipboard.writeText(minified);
          setSuccessMsg("Minified & copied!");
        } else {
          setSuccessMsg("CSS minified successfully!");
        }
      }
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (e: any) {
      setError("Failed to process CSS: " + e.message);
      setOutput("");
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      setError(null);
      if (formatOnPaste && text.trim()) {
        const formatted = formatCSS(text, indent, useTabs);
        setOutput(formatted);
        setSuccessMsg("Formatted on paste!");
        setTimeout(() => setSuccessMsg(null), 3000);
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
    const blob = new Blob([output], { type: "text/css" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.css";
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
    setInput(`body{margin:0;padding:0;font-family:system-ui,sans-serif}:root{--primary:#518231;--radius:8px}.container{max-width:1200px;margin:0 auto;padding:0 16px}@media(max-width:768px){.container{padding:0 8px}.hero{flex-direction:column}}.btn{display:inline-flex;align-items:center;gap:8px;padding:8px 16px;border-radius:var(--radius);font-weight:600;transition:all .2s ease}.btn:hover{transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,.15)}@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`);
  };

  const handleCompare = () => {
    localStorage.setItem("diff_checker_left", input);
    localStorage.setItem("diff_checker_right", output || input);
    localStorage.setItem("diff_checker_source", "css-beautifier");
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
            <button onClick={() => processCSS("format")} className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-l-lg font-medium transition-colors flex items-center gap-2 text-sm">
              <FileCode2 size={16} /> Beautify
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
          <button onClick={() => processCSS("minify")} className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm dark:bg-slate-700 dark:hover:bg-slate-600">
            <FileCode2 size={16} /> Minify
          </button>
          <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer px-2">
            <input type="checkbox" checked={formatOnPaste} onChange={(e) => setFormatOnPaste(e.target.checked)} className="rounded text-[#518231] focus:ring-[#518231] bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700" />
            Format on paste
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <input type="file" accept=".css,text/css" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          <button onClick={() => { handleCompare(); window.location.href = `/${document.documentElement.lang || 'en'}/tools/diff-checker`; }} className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 text-sm dark:text-slate-400" title="Compare">
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
            <div className="font-medium text-sm">{error}</div>
          </div>
        )}
        {warning && (
          <div className="p-3 rounded-lg flex items-start gap-3 border shadow-sm bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/30 dark:border-amber-800/80 dark:text-amber-300">
            <AlertTriangle size={18} className="shrink-0 mt-0.5" />
            <div className="font-medium text-sm"><strong>Warning:</strong> {warning}</div>
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
        <div className={`flex flex-col h-full border rounded-xl overflow-hidden bg-white dark:bg-slate-900 relative transition-colors duration-300 ${warning ? 'border-amber-500 shadow-[0_0_15px_-3px_rgba(245,158,11,0.3)]' : 'border-slate-200 dark:border-slate-800 shadow-sm'}`}>
          <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <span className="font-semibold text-sm text-slate-700 dark:text-slate-300">Input CSS</span>
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
                <CssSyntax text={input} />
              </pre>
              <textarea
                ref={inputScrollRef}
                value={input}
                onChange={(e) => { setInput(e.target.value); setError(null); setWarning(null); }}
                onScroll={handleInputScroll}
                placeholder="Paste your CSS here..."
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
              {output ? <CssSyntax text={output} /> : <span className="text-slate-400 dark:text-slate-500">Result will appear here...</span>}
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
