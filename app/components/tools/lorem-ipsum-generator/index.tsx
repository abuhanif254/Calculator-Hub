"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Copy, Download, Settings, History, Trash2, Code, FileText, CheckCircle, Type, 
  LayoutList, Check, ArrowRight, Layers, FileCode2, SlidersHorizontal, Sun, Moon
} from "lucide-react";
import { 
  generateText, calculateTextStats, LoremOptions, defaultLoremOptions, downloadFile, 
  ContentType, GenerateUnit, OutputFormat, MockupMode 
} from "./utils";

const contentTypes: { id: ContentType; label: string }[] = [
  { id: 'classic', label: 'Classic Lorem Ipsum' },
  { id: 'developer', label: 'Developer Ipsum' },
  { id: 'marketing', label: 'Marketing Ipsum' },
  { id: 'startup', label: 'Startup Ipsum' },
  { id: 'design', label: 'Design Ipsum' },
  { id: 'tech', label: 'Tech Ipsum' },
  { id: 'ai', label: 'AI Ipsum' },
];

const generateUnits: { id: GenerateUnit; label: string }[] = [
  { id: 'paragraphs', label: 'Paragraphs' },
  { id: 'sentences', label: 'Sentences' },
  { id: 'words', label: 'Words' },
  { id: 'characters', label: 'Characters' }
];

const outputFormats: { id: OutputFormat; label: string }[] = [
  { id: 'plain', label: 'Plain Text' },
  { id: 'html', label: 'HTML Tags' },
  { id: 'markdown', label: 'Markdown' }
];

const mockupModes: { id: MockupMode; label: string }[] = [
  { id: 'none', label: 'None (Standard)' },
  { id: 'blog', label: 'Blog Post Layout' },
  { id: 'landing', label: 'Landing Page' },
  { id: 'product', label: 'Product Specs' },
  { id: 'faq', label: 'FAQ Section' }
];

export function LoremIpsumGeneratorTool() {
  const [options, setOptions] = useState<LoremOptions>(defaultLoremOptions);
  const [output, setOutput] = useState<string>("");
  const [history, setHistory] = useState<{timestamp: number, opts: LoremOptions, text: string}[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  
  // Typography Preview Controls
  const [fontSize, setFontSize] = useState<number>(16);
  const [lineHeight, setLineHeight] = useState<number>(1.6);
  const [previewWidth, setPreviewWidth] = useState<'full' | 'lg' | 'md' | 'sm'>('full');
  const [previewTheme, setPreviewTheme] = useState<'auto' | 'light' | 'dark'>('auto');
  
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Load history from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('lorem-generator-history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
    
    // Generate initial load
    handleGenerate(defaultLoremOptions);
  }, []);

  const saveToHistory = useCallback((opts: LoremOptions, text: string) => {
    setHistory(prev => {
      // Avoid duplicate consecutive saves
      if (prev.length > 0 && prev[0].text === text) return prev;
      const updated = [{ timestamp: Date.now(), opts, text }, ...prev].slice(0, 10);
      try {
        localStorage.setItem('lorem-generator-history', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }, []);

  const handleGenerate = (currentOptions: LoremOptions = options) => {
    const text = generateText(currentOptions);
    setOutput(text);
    saveToHistory(currentOptions, text);
  };

  // Auto-generate on certain option changes
  useEffect(() => {
    handleGenerate(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.type, options.amount, options.unit, options.startWithLorem, options.format, options.mockupMode]);

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

  const handleDownload = (format: OutputFormat | 'json') => {
    if (!output) return;
    
    let content = output;
    let type = "text/plain";
    let ext = "txt";
    
    if (format === 'html') {
      type = "text/html";
      ext = "html";
    } else if (format === 'markdown') {
      type = "text/markdown";
      ext = "md";
    } else if (format === 'json') {
      content = JSON.stringify({ content: output, stats }, null, 2);
      type = "application/json";
      ext = "json";
    }
    
    downloadFile(content, `lorem-ipsum.${ext}`, type);
    showToast(`Downloaded as .${ext}!`);
  };

  const stats = useMemo(() => calculateTextStats(output), [output]);

  return (
    <div className="w-full flex flex-col gap-6">
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2 bg-[#518231] text-white rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          {toast}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-6">
            
            {/* Amount & Unit */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-[#518231]" /> Generate Amount
              </h3>
              <div className="flex gap-2">
                <input
                  type="number"
                  min={1}
                  max={options.unit === 'characters' ? 10000 : 100}
                  value={options.amount}
                  onChange={(e) => setOptions(prev => ({ ...prev, amount: Math.max(1, parseInt(e.target.value) || 1) }))}
                  className="w-20 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold focus:outline-none focus:border-[#518231] text-slate-800 dark:text-slate-200"
                />
                <select
                  value={options.unit}
                  onChange={(e) => setOptions(prev => ({ ...prev, unit: e.target.value as GenerateUnit }))}
                  className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:outline-none focus:border-[#518231] text-slate-800 dark:text-slate-200 appearance-none"
                  disabled={options.mockupMode !== 'none'}
                >
                  {generateUnits.map(u => (
                    <option key={u.id} value={u.id}>{u.label}</option>
                  ))}
                </select>
              </div>
              {options.mockupMode !== 'none' && (
                <p className="text-xs text-slate-500 mt-2 italic">Amount and Unit are ignored in SEO Mockup modes.</p>
              )}
            </div>

            {/* Content Type */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <Type size={16} className="text-[#518231]" /> Content Vocabulary
              </h3>
              <select
                value={options.type}
                onChange={(e) => setOptions(prev => ({ ...prev, type: e.target.value as ContentType }))}
                className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:outline-none focus:border-[#518231] text-slate-800 dark:text-slate-200"
              >
                {contentTypes.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Output Format */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <FileCode2 size={16} className="text-[#518231]" /> Output Format
              </h3>
              <div className="flex flex-wrap gap-2">
                {outputFormats.map(fmt => (
                  <button
                    key={fmt.id}
                    onClick={() => setOptions(prev => ({ ...prev, format: fmt.id }))}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors border ${
                      options.format === fmt.id
                        ? 'bg-white dark:bg-slate-800 border-[#518231] text-[#518231] shadow-sm'
                        : 'bg-transparent border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SEO Mockup Templates */}
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <Layers size={16} className="text-[#518231]" /> Structured Mockup Mode
              </h3>
              <select
                value={options.mockupMode}
                onChange={(e) => setOptions(prev => ({ ...prev, mockupMode: e.target.value as MockupMode }))}
                className="w-full px-3 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium focus:outline-none focus:border-[#518231] text-slate-800 dark:text-slate-200"
              >
                {mockupModes.map(c => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* Toggles */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className={`w-5 h-5 mt-0.5 shrink-0 rounded border flex items-center justify-center transition-colors ${
                  options.startWithLorem 
                    ? 'bg-[#518231] border-[#518231]' 
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 group-hover:border-[#518231]'
                }`}>
                  {options.startWithLorem && <Check size={14} className="text-white" />}
                </div>
                <div>
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200 block">Start with "Lorem ipsum..."</span>
                  <span className="text-xs text-slate-500 block">Begin the first paragraph traditionally</span>
                </div>
                <input 
                  type="checkbox"
                  className="hidden"
                  checked={options.startWithLorem}
                  onChange={(e) => setOptions(prev => ({ ...prev, startWithLorem: e.target.checked }))}
                />
              </label>
            </div>

          </div>

          {/* Statistics Card */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
              <CheckCircle size={16} className="text-[#518231]" /> Content Statistics
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-slate-950/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                <p className="text-[10px] uppercase font-bold text-slate-500">Words</p>
                <p className="text-lg font-mono font-black text-slate-800 dark:text-slate-200">{stats.words}</p>
              </div>
              <div className="bg-white dark:bg-slate-950/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                <p className="text-[10px] uppercase font-bold text-slate-500">Characters</p>
                <p className="text-lg font-mono font-black text-slate-800 dark:text-slate-200">{stats.characters}</p>
              </div>
              <div className="bg-white dark:bg-slate-950/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                <p className="text-[10px] uppercase font-bold text-slate-500">Paragraphs</p>
                <p className="text-lg font-mono font-black text-slate-800 dark:text-slate-200">{stats.paragraphs}</p>
              </div>
              <div className="bg-white dark:bg-slate-950/50 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
                <p className="text-[10px] uppercase font-bold text-slate-500">Reading Time</p>
                <p className="text-lg font-mono font-black text-slate-800 dark:text-slate-200">{stats.readingTime} <span className="text-xs font-normal text-slate-500">min</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col flex-1 min-h-[500px]">
            
            {/* Header Actions */}
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center rounded-t-xl flex-wrap gap-3">
              <h3 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 text-sm">
                <FileText size={16} className="text-[#518231]" /> Output Generator
              </h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleCopy(output, 'main')} 
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 rounded text-xs font-bold transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-600 shadow-sm"
                >
                  {copiedKey === 'main' ? <Check size={14} className="text-[#518231]" /> : <Copy size={14} />} Copy
                </button>
                <button 
                  onClick={() => handleDownload(options.format)} 
                  className="px-3 py-1.5 bg-[#518231] hover:bg-[#436b28] text-white rounded text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Download size={14} /> Download {options.format.toUpperCase()}
                </button>
              </div>
            </div>

            {/* Typography Testing Panel */}
            {options.format === 'html' && (
              <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap gap-4 items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-500">Size:</span>
                  <input type="range" min="12" max="24" value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-20 accent-[#518231]" />
                  <span className="w-6 text-right font-mono">{fontSize}px</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-500">Line:</span>
                  <input type="range" min="1.0" max="2.2" step="0.1" value={lineHeight} onChange={(e) => setLineHeight(Number(e.target.value))} className="w-20 accent-[#518231]" />
                  <span className="w-6 text-right font-mono">{lineHeight}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-500">Theme:</span>
                  <button onClick={() => setPreviewTheme(prev => prev === 'light' ? 'dark' : 'light')} className="p-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-slate-100 dark:hover:bg-slate-800">
                    {previewTheme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
                  </button>
                </div>
              </div>
            )}

            {/* Live Text Area */}
            <div className={`flex-1 p-0 overflow-hidden relative ${previewTheme === 'dark' ? 'dark bg-slate-950' : previewTheme === 'light' ? 'light bg-white' : ''}`}>
              {options.format === 'html' ? (
                // HTML Preview Mode
                <div className="h-full overflow-y-auto custom-scrollbar p-6 lg:p-10">
                  <div 
                    className="prose dark:prose-invert max-w-none transition-all duration-200"
                    style={{ fontSize: `${fontSize}px`, lineHeight: lineHeight }}
                    dangerouslySetInnerHTML={{ __html: output }}
                  />
                </div>
              ) : (
                // Raw / Markdown Mode
                <textarea
                  value={output}
                  onChange={(e) => setOutput(e.target.value)}
                  className="w-full h-full p-6 lg:p-8 bg-transparent text-slate-800 dark:text-slate-300 font-mono text-sm resize-none focus:outline-none custom-scrollbar"
                  spellCheck="false"
                />
              )}
            </div>

          </div>

          {/* History */}
          {history.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <History size={16} className="text-[#518231]" /> Recent Generations
                </h3>
                <button onClick={() => { setHistory([]); localStorage.removeItem('lorem-generator-history'); }} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 font-medium">
                  <Trash2 size={12} /> Clear History
                </button>
              </div>
              <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2">
                {history.map((h, i) => (
                  <button 
                    key={i}
                    onClick={() => {
                      setOptions(h.opts);
                      setOutput(h.text);
                    }}
                    className="shrink-0 w-48 text-left p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:border-[#518231] transition-colors shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-[#518231] uppercase tracking-wider">{h.opts.type}</span>
                      <span className="text-[10px] text-slate-400">{new Date(h.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-mono truncate">{h.opts.mockupMode !== 'none' ? h.opts.mockupMode + ' mockup' : `${h.opts.amount} ${h.opts.unit}`}</p>
                    <p className="text-xs text-slate-800 dark:text-slate-200 truncate mt-1">{h.text.replace(/<[^>]*>?/gm, '')}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
