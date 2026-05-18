"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Copy, Download, Trash2, Upload, FileCode2, CheckCircle, AlertTriangle, ChevronDown, ChevronRight, History, X, WrapText, Clipboard, Link as LinkIcon, Settings2, Code2, Search, Link2, Play, Network, FileJson, Check, ClipboardCheck } from "lucide-react";
import { Link } from "../../../i18n/routing";
import Editor, { useMonaco } from '@monaco-editor/react';
import { useTheme } from 'next-themes';

// --- Utility Functions ---

function parseXmlSafe(xml: string) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    const parsererror = doc.querySelector('parsererror');
    if (parsererror) {
      const errorText = parsererror.textContent || "";
      const lineMatch = errorText.match(/line\s+(\d+)/i);
      const colMatch = errorText.match(/column\s+(\d+)/i);
      return {
        doc: null,
        error: errorText,
        line: lineMatch ? parseInt(lineMatch[1]) : null,
        column: colMatch ? parseInt(colMatch[1]) : null
      };
    }
    return { doc, error: null, line: null, column: null };
  } catch (e: any) {
    return { doc: null, error: e.message || "Unknown parsing error", line: null, column: null };
  }
}

function formatXmlString(xml: string, indent: string | 'minify') {
  if (indent === 'minify') {
    return xml.replace(/>\s+</g, '><').trim();
  }

  let formatted = '';
  let pad = 0;

  let cleanXml = xml.replace(/(>)(<)(\/*)/g, '$1\n$2$3');

  cleanXml.split('\n').forEach((node) => {
    let indentVal = 0;
    if (node.match(/.+<\/\w[^>]*>$/)) {
      indentVal = 0;
    } else if (node.match(/^<\/\w/)) {
      if (pad !== 0) pad -= 1;
    } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
      indentVal = 1;
    } else {
      indentVal = 0;
    }

    const padding = indent === '\t' ? '\t'.repeat(pad) : ' '.repeat(pad * parseInt(indent || '2'));
    formatted += padding + node + '\n';
    pad += indentVal;
  });

  return formatted.trim();
}

function xmlToJsonString(xml: string) {
  const { doc, error } = parseXmlSafe(xml);
  if (error || !doc) throw new Error(error || "Invalid XML");

  function domToJson(node: Node): any {
    let obj: any = {};
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      if (el.attributes.length > 0) {
        obj["@attributes"] = {};
        for (let j = 0; j < el.attributes.length; j++) {
          const attr = el.attributes.item(j);
          if (attr) obj["@attributes"][attr.name] = attr.value;
        }
      }
    } else if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.CDATA_SECTION_NODE) {
      return node.nodeValue?.trim() || "";
    }

    if (node.hasChildNodes()) {
      let textOnly = true;
      let textContent = "";
      for (let i = 0; i < node.childNodes.length; i++) {
        const item = node.childNodes.item(i);
        if (item.nodeType === Node.ELEMENT_NODE) {
          textOnly = false;
          const nodeName = item.nodeName;
          const childObj = domToJson(item);
          if (typeof (obj[nodeName]) === "undefined") {
            obj[nodeName] = childObj;
          } else {
            if (typeof (obj[nodeName].push) === "undefined") {
              obj[nodeName] = [obj[nodeName]];
            }
            obj[nodeName].push(childObj);
          }
        } else if (item.nodeType === Node.TEXT_NODE || item.nodeType === Node.CDATA_SECTION_NODE) {
          textContent += item.nodeValue?.trim() || "";
        }
      }
      if (textOnly) {
        if (Object.keys(obj).length === 0) return textContent;
        if (textContent) obj["#text"] = textContent;
      }
    }
    return obj;
  }

  const rootObj: any = {};
  for (let i = 0; i < doc.childNodes.length; i++) {
    const item = doc.childNodes.item(i);
    if (item.nodeType === Node.ELEMENT_NODE) {
      rootObj[item.nodeName] = domToJson(item);
    }
  }
  return JSON.stringify(rootObj, null, 2);
}

// --- Subcomponents ---

const XmlTreeNode = ({ node, level = 0 }: { node: Element | Node, level?: number }) => {
  const [expanded, setExpanded] = useState(level < 2);

  if (!node) return null;

  if (node.nodeType === Node.TEXT_NODE || node.nodeType === Node.CDATA_SECTION_NODE) {
    const val = node.nodeValue?.trim();
    if (!val) return null;
    return <div className="ml-6 text-sm text-slate-700 dark:text-slate-300 font-mono break-all">{val}</div>;
  }

  if (node.nodeType === Node.COMMENT_NODE) {
    return <div className="ml-6 text-sm text-slate-400 italic font-mono">&lt;!-- {node.nodeValue} --&gt;</div>;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return null;
  const el = node as Element;

  const childNodes = Array.from(el.childNodes).filter(n => {
    if (n.nodeType === Node.TEXT_NODE) return !!n.nodeValue?.trim();
    return true;
  });
  const hasChildren = childNodes.length > 0;

  return (
    <div className="ml-4 border-l border-slate-200 dark:border-slate-800 pl-2 py-0.5">
      <div className="flex items-start gap-1 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 py-1 rounded px-1 group" onClick={() => setExpanded(!expanded)}>
        <div className="mt-0.5 shrink-0 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200">
          {hasChildren ? (expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />) : <span className="inline-block w-[14px]" />}
        </div>
        <div className="font-mono text-sm break-all">
          <span className="text-[#22863a] dark:text-[#7ee787] font-semibold">&lt;{el.tagName}</span>
          {Array.from(el.attributes).map(attr => (
            <span key={attr.name} className="ml-2 inline-block">
              <span className="text-[#6f42c1] dark:text-[#d2a8ff]">{attr.name}</span>
              <span className="text-slate-500 dark:text-slate-400">=</span>
              <span className="text-[#032f62] dark:text-[#a5d6ff]">&quot;{attr.value}&quot;</span>
            </span>
          ))}
          <span className="text-[#22863a] dark:text-[#7ee787] font-semibold">{hasChildren ? '&gt;' : ' /&gt;'}</span>

          {!expanded && hasChildren && (
            <span className="text-slate-400 mx-2 text-xs">...</span>
          )}
          {!expanded && hasChildren && (
            <span className="text-[#22863a] dark:text-[#7ee787] font-semibold">&lt;/{el.tagName}&gt;</span>
          )}
        </div>
      </div>
      {expanded && hasChildren && (
        <div className="animate-in slide-in-from-top-1 fade-in duration-200">
          {childNodes.map((child, i) => <XmlTreeNode key={i} node={child} level={level + 1} />)}
          <div className="font-mono text-sm ml-6 text-[#22863a] dark:text-[#7ee787] font-semibold mt-0.5">
            &lt;/{el.tagName}&gt;
          </div>
        </div>
      )}
    </div>
  );
};


export function XmlFormatterTool() {
  const { resolvedTheme } = useTheme();
  const monacoTheme = resolvedTheme === 'dark' ? 'vs-dark' : 'light';

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const [activeTab, setActiveTab] = useState<"formatter" | "tree" | "json" | "xpath">("formatter");

  const [error, setError] = useState<{ message: string, line: number | null, column: number | null } | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [autoCopy, setAutoCopy] = useState(false);
  const [indent, setIndent] = useState<string>("2"); // "2", "4", "tab", "minify"
  const [wordWrap, setWordWrap] = useState<"on" | "off">("off");

  const [showUrlImport, setShowUrlImport] = useState(false);
  const [importUrl, setImportUrl] = useState("");

  const [xpathQuery, setXpathQuery] = useState("//*");
  const [xpathResults, setXpathResults] = useState<string[]>([]);
  const [xpathError, setXpathError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Debounced Validation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim()) {
        const res = parseXmlSafe(input);
        if (res.error) {
          setError({ message: res.error, line: res.line, column: res.column });
        } else {
          setError(null);
        }
      } else {
        setError(null);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [input]);

  useEffect(() => {
    const saved = localStorage.getItem("xml_formatter_history");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  function saveToHistory(val: string) {
    if (!val.trim()) return;
    const newHistory = [val, ...history.filter(h => h !== val)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("xml_formatter_history", JSON.stringify(newHistory));
  }

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = async (text: string, key?: string) => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      if (key) {
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 2000);
      }
    } catch (e) {
      console.error("Clipboard copy failed", e);
    }
  };

  const handleFormat = () => {
    if (!input.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      try {
        const result = formatXmlString(input, indent);
        setOutput(result);
        if (autoCopy) copyToClipboard(result);
        saveToHistory(input);
        setActiveTab("formatter");
        showToast(autoCopy ? "Formatted & Copied!" : "Formatted successfully!");
      } catch (e: any) {
        showToast("Error formatting: " + e.message, "error");
      }
      setIsProcessing(false);
    }, 50);
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      try {
        const result = formatXmlString(input, 'minify');
        setOutput(result);
        if (autoCopy) copyToClipboard(result);
        saveToHistory(input);
        setActiveTab("formatter");
        showToast(autoCopy ? "Minified & Copied!" : "Minified successfully!");
      } catch (e: any) {
        showToast("Error minifying", "error");
      }
      setIsProcessing(false);
    }, 50);
  };

  const jsonOutput = useMemo(() => {
    if (!input.trim()) return "";
    try {
      return xmlToJsonString(input);
    } catch (e: any) {
      return "Error converting to JSON:\n" + e.message;
    }
  }, [input]);

  const executeXPath = () => {
    if (!input.trim() || error) return;
    try {
      const { doc } = parseXmlSafe(input);
      if (!doc) throw new Error("Invalid XML document");

      const resolver = doc.createNSResolver(doc.documentElement);
      const result = doc.evaluate(xpathQuery, doc, resolver, XPathResult.ANY_TYPE, null);

      let nodes = [];
      let node = result.iterateNext();
      const serializer = new XMLSerializer();

      let count = 0;
      while (node && count < 500) { // limit to 500 for perf
        nodes.push(serializer.serializeToString(node));
        node = result.iterateNext();
        count++;
      }
      setXpathResults(nodes);
      setXpathError(null);
    } catch (err: any) {
      setXpathError(err.message);
      setXpathResults([]);
    }
  };

  const showToast = (msg: string, type = "success") => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleUrlImportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importUrl) return;
    setIsProcessing(true);
    try {
      const res = await fetch(importUrl);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const text = await res.text();
      setInput(text);
      setShowUrlImport(false);
      showToast("Imported successfully!");
    } catch (err: any) {
      showToast("Failed to fetch URL. CORS or network issue.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setInput(ev.target.result as string);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const parsedDocForTree = useMemo(() => {
    if (activeTab !== 'tree' || !input.trim() || error) return null;
    return parseXmlSafe(input).doc;
  }, [input, activeTab, error]);

  return (
    <div className="w-full flex flex-col gap-6">

      {/* Primary Toolbar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center shadow-sm rounded-lg">
            <button disabled={isProcessing} onClick={handleFormat} className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-l-lg font-medium transition-colors flex items-center gap-2 text-sm disabled:opacity-70">
              <FileCode2 size={16} /> Format
            </button>
            <div className="relative border-l border-[#436a28] h-full flex items-center bg-[#518231] hover:bg-[#436a28] rounded-r-lg transition-colors">
              <select
                value={indent}
                onChange={(e) => setIndent(e.target.value)}
                className="appearance-none bg-transparent text-white pl-2 pr-6 py-2 text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="2" className="text-slate-900">2 Spaces</option>
                <option value="4" className="text-slate-900">4 Spaces</option>
                <option value="\t" className="text-slate-900">Tabs</option>
              </select>
              <div className="absolute right-1.5 pointer-events-none text-white opacity-80"><ChevronDown size={14} /></div>
            </div>
          </div>
          <button disabled={isProcessing} onClick={handleMinify} className="px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm dark:bg-slate-700 dark:hover:bg-slate-600 disabled:opacity-70">
            <Code2 size={16} /> Minify
          </button>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

          <button onClick={() => setShowUrlImport(!showUrlImport)} className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 text-sm dark:text-slate-400" title="Import from URL">
            <Link2 size={18} /><span className="hidden lg:inline">Import URL</span>
          </button>
          <input type="file" accept=".xml,text/xml" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2 text-sm dark:text-slate-400" title="Upload XML File">
            <Upload size={18} /><span className="hidden lg:inline">Upload</span>
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setWordWrap(w => w === 'on' ? 'off' : 'on')} className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${wordWrap === 'on' ? 'bg-[#518231]/10 text-[#518231]' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`} title="Word Wrap">
            <WrapText size={18} />
          </button>
          <button onClick={() => setShowHistory(!showHistory)} className={`p-2 rounded-lg transition-colors flex items-center gap-2 text-sm ${showHistory ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`} title="History">
            <History size={18} />
          </button>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />
          <button onClick={() => { setInput(""); setOutput(""); }} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors dark:text-red-400" title="Clear All">
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* URL Import Panel */}
      {showUrlImport && (
        <form onSubmit={handleUrlImportSubmit} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <Link2 className="text-slate-400" size={20} />
          <input
            type="url"
            required
            placeholder="https://example.com/feed.xml"
            value={importUrl}
            onChange={e => setImportUrl(e.target.value)}
            className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#518231] text-slate-900 dark:text-white"
          />
          <button type="submit" disabled={isProcessing} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
            Fetch
          </button>
          <button type="button" onClick={() => setShowUrlImport(false)} className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X size={18} />
          </button>
        </form>
      )}

      {/* Validation Banner */}
      {input.trim() && (
        <div className={`p-4 rounded-xl flex items-start gap-3 border shadow-sm transition-colors ${error ? 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800/50' : 'bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800/30'}`}>
          {error ? (
            <AlertTriangle size={20} className="shrink-0 mt-0.5 text-red-600 dark:text-red-400" />
          ) : (
            <CheckCircle size={20} className="shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
          )}
          <div className="flex-1">
            <h4 className={`font-bold text-sm ${error ? 'text-red-800 dark:text-red-300' : 'text-green-800 dark:text-green-300'}`}>
              {error ? "Invalid XML Structure" : "Valid XML"}
            </h4>
            {error && (
              <div className="mt-1 text-sm text-red-700 dark:text-red-400 font-mono bg-red-100/50 dark:bg-red-950/50 p-2 rounded border border-red-200 dark:border-red-800">
                {error.message}
                {error.line && <div className="mt-1 font-bold">Location: Line {error.line}, Column {error.column}</div>}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex overflow-x-auto custom-scrollbar border-b border-slate-200 dark:border-slate-800">
        <button onClick={() => setActiveTab("formatter")} className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'formatter' ? 'border-[#518231] text-[#518231] bg-[#518231]/5' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'}`}>
          <FileCode2 size={16} /> Formatter & Editor
        </button>
        <button onClick={() => setActiveTab("tree")} className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'tree' ? 'border-[#518231] text-[#518231] bg-[#518231]/5' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'}`}>
          <Network size={16} /> Tree Viewer
        </button>
        <button onClick={() => setActiveTab("json")} className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'json' ? 'border-[#518231] text-[#518231] bg-[#518231]/5' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'}`}>
          <FileJson size={16} /> XML to JSON
        </button>
        <button onClick={() => { setActiveTab("xpath"); if (input && !error) executeXPath(); }} className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === 'xpath' ? 'border-[#518231] text-[#518231] bg-[#518231]/5' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50'}`}>
          <Search size={16} /> XPath Tester
        </button>
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[500px] flex flex-col">

        {/* FORMATTER TAB */}
        {activeTab === 'formatter' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 h-[600px]">
            {/* Input Editor */}
            <div className="flex flex-col h-full relative">
              <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Input XML</span>
                <button onClick={async () => {
                  try {
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                      const text = await navigator.clipboard.readText();
                      setInput(text);
                    }
                  } catch (e) { }
                }} className="text-xs flex items-center gap-1 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200">
                  <Clipboard size={12} /> Paste
                </button>
              </div>
              <div className="flex-1 relative">
                <Editor
                  height="100%"
                  language="xml"
                  theme={monacoTheme}
                  value={input}
                  onChange={(val) => setInput(val || "")}
                  options={{
                    minimap: { enabled: false },
                    wordWrap: wordWrap,
                    formatOnPaste: true,
                    fontSize: 14,
                    padding: { top: 16 }
                  }}
                />
              </div>
            </div>

            {/* Output Editor */}
            <div className="flex flex-col h-full relative">
              <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#518231]">Formatted Output</span>
                <div className="flex gap-2">
                  <button onClick={() => {
                    copyToClipboard(output, 'output');
                    showToast("Output copied!");
                  }} className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#518231] dark:text-slate-400 transition-colors">
                    {copiedKey === 'output' ? <><ClipboardCheck size={12} className="text-green-500" /> Copied!</> : <><Copy size={12} /> Copy</>}
                  </button>
                  <button onClick={() => {
                    if (!output) return;
                    const blob = new Blob([output], { type: 'application/xml' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url; a.download = 'formatted.xml';
                    document.body.appendChild(a); a.click();
                    document.body.removeChild(a); URL.revokeObjectURL(url);
                  }} className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#518231] dark:text-slate-400 transition-colors">
                    <Download size={12} /> Download
                  </button>
                </div>
              </div>
              <div className="flex-1 relative">
                <Editor
                  height="100%"
                  language="xml"
                  theme={monacoTheme}
                  value={output}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    wordWrap: wordWrap,
                    fontSize: 14,
                    padding: { top: 16 }
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* TREE TAB */}
        {activeTab === 'tree' && (
          <div className="flex-1 flex flex-col h-[600px] overflow-hidden">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Interactive Tree View</span>
              <span className="text-xs text-slate-500">Click arrows to expand/collapse</span>
            </div>
            <div className="flex-1 overflow-auto p-4 custom-scrollbar bg-white dark:bg-[#1e1e1e]">
              {error ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                  <AlertTriangle size={48} className="text-red-300 opacity-50" />
                  <p>Fix validation errors to view tree</p>
                </div>
              ) : !parsedDocForTree ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <Network size={48} className="opacity-20 mb-4" />
                  <p>Enter XML to view structure</p>
                </div>
              ) : (
                <div className="py-2">
                  {Array.from(parsedDocForTree.childNodes).map((node, idx) => (
                    <XmlTreeNode key={idx} node={node} level={0} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* JSON TAB */}
        {activeTab === 'json' && (
          <div className="flex flex-col" style={{ height: 600 }}>
            <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">JSON Output</span>
              <div className="flex gap-2">
                <button onClick={() => {
                  copyToClipboard(jsonOutput, 'json');
                  showToast("JSON copied!");
                }} className="text-xs flex items-center gap-1 text-slate-600 hover:text-blue-600 dark:text-slate-400 transition-colors">
                  {copiedKey === 'json' ? <><ClipboardCheck size={12} className="text-green-500" /> Copied!</> : <><Copy size={12} /> Copy JSON</>}
                </button>
                <button onClick={() => {
                  if (!jsonOutput) return;
                  const blob = new Blob([jsonOutput], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url; a.download = 'converted.json';
                  document.body.appendChild(a); a.click();
                  document.body.removeChild(a); URL.revokeObjectURL(url);
                }} className="text-xs flex items-center gap-1 text-slate-600 hover:text-blue-600 dark:text-slate-400 transition-colors">
                  <Download size={12} /> Download JSON
                </button>
              </div>
            </div>
            <div className="relative" style={{ height: 'calc(600px - 41px)' }}>
              {error ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4 bg-slate-50 dark:bg-slate-900">
                  <AlertTriangle size={48} className="text-red-300 opacity-50" />
                  <p>Cannot convert invalid XML to JSON</p>
                </div>
              ) : !input.trim() ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4 bg-slate-50 dark:bg-slate-900">
                  <FileJson size={48} className="opacity-20" />
                  <p>Enter XML in the Formatter tab to see JSON output</p>
                </div>
              ) : (
                <Editor
                  height="100%"
                  language="json"
                  theme={monacoTheme}
                  value={jsonOutput}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    wordWrap: wordWrap,
                    fontSize: 14,
                    padding: { top: 16 }
                  }}
                />
              )}
            </div>
          </div>
        )}

        {/* XPATH TAB */}
        {activeTab === 'xpath' && (
          <div className="flex-1 flex flex-col h-[600px]">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 space-y-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">XPath Query</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      value={xpathQuery}
                      onChange={e => setXpathQuery(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && executeXPath()}
                      placeholder="//book[price>30]"
                      className="w-full pl-9 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#518231]"
                    />
                  </div>
                  <button onClick={executeXPath} disabled={!!error} className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-sm font-medium flex items-center gap-2 disabled:opacity-50">
                    <Play size={16} /> Evaluate
                  </button>
                </div>
              </div>
              {xpathError && (
                <div className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
                  <AlertTriangle size={14} /> {xpathError}
                </div>
              )}
            </div>

            <div className="flex-1 bg-white dark:bg-[#1e1e1e] border-t border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
              <div className="px-4 py-2 bg-slate-50 dark:bg-[#252526] border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xs font-semibold text-slate-500">
                  Results {xpathResults.length > 0 && `(${xpathResults.length})`}
                </span>
              </div>
              <div className="flex-1 relative">
                {error ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                    <AlertTriangle size={48} className="text-red-300 opacity-50 mb-4" />
                    <p>Fix XML errors to run XPath</p>
                  </div>
                ) : xpathResults.length === 0 && !xpathError ? (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                    No matches found
                  </div>
                ) : (
                  <Editor
                    height="100%"
                    language="xml"
                    theme={monacoTheme}
                    value={xpathResults.join('\n\n')}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      wordWrap: wordWrap,
                      fontSize: 14,
                      padding: { top: 16 }
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
