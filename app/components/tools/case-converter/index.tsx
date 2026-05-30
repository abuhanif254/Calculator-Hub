"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  FileText, Copy, Download, Trash2, Check, Sparkles, FileJson, 
  RefreshCw, TrendingUp, HelpCircle, Eye, Share2, Award, Zap,
  AlertCircle, BarChart3, Layers, CheckCircle2, ChevronRight,
  BookOpen, HelpCircle as HelpIcon, ArrowRight, Settings, Sliders, Play, 
  Columns, ArrowLeftRight, RotateCcw, RotateCw, AlignLeft, Code, Clipboard, Terminal
} from "lucide-react";
import {
  getWords, toUppercase, toLowercase, toCapitalizedCase, toSentenceCase,
  toTitleCase, toToggleCase, toAlternatingCase, toInverseCase,
  toCamelCase, toPascalCase, toSnakeCase, toScreamingSnakeCase,
  toKebabCase, toTrainCase, toDotCase, toPathCase,
  cleanRemoveExtraSpaces, cleanRemoveBlankLines, cleanNormalizeWhitespace,
  getStats, auditSEOTitle, downloadFile, generateCSVReport, generateJSONReport,
  CaseConverterStats, SEOTitleAudit
} from "./utils";

const EXAMPLE_PHRASE = "build a case converter tool page for next.js developer platform. convert variables like database_connection_string or CSS classes into camelCase and Train-Case.";

interface TransformationLog {
  timestamp: number;
  original: string;
  converted: string;
  type: string;
}

export function CaseConverterTool() {
  const [text, setText] = useState<string>("");
  const [convertedText, setConvertedText] = useState<string>("");
  const [activeCaseType, setActiveCaseType] = useState<string>("Sentence case");
  const [activeTab, setActiveTab] = useState<"standard" | "developer" | "marketing" | "comparison" | "history">("standard");

  // Undo / Redo stacks
  const [historyStack, setHistoryStack] = useState<string[]>([""]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Transformations history log
  const [transLog, setTransLog] = useState<TransformationLog[]>([]);
  
  // States
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Client setup
  useEffect(() => {
    setIsClient(true);
    try {
      const savedText = localStorage.getItem("case-converter-text");
      if (savedText) {
        setText(savedText);
        setConvertedText(toSentenceCase(savedText));
        setHistoryStack(["", savedText]);
        setHistoryIndex(1);
      }
      const savedHistory = localStorage.getItem("case-converter-history");
      if (savedHistory) {
        setTransLog(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Local storage restoration failed", e);
    }
  }, []);

  // Sync editor value & save state
  const pushHistoryState = useCallback((val: string) => {
    setHistoryStack(prev => {
      const newStack = prev.slice(0, historyIndex + 1);
      if (newStack[newStack.length - 1] === val) return prev;
      newStack.push(val);
      if (newStack.length > 50) newStack.shift();
      return newStack;
    });
    setHistoryIndex(prev => Math.min(49, prev + 1));
  }, [historyIndex]);

  const updateText = (newVal: string) => {
    setText(newVal);
    if (isClient) {
      try {
        localStorage.setItem("case-converter-text", newVal);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  // Core conversion dispatcher
  const convertText = useCallback((type: string, inputVal = text) => {
    if (!inputVal) {
      setConvertedText("");
      return;
    }
    
    let result = "";
    switch (type) {
      case "lowercase": result = toLowercase(inputVal); break;
      case "UPPERCASE": result = toUppercase(inputVal); break;
      case "Sentence case": result = toSentenceCase(inputVal); break;
      case "Title Case": result = toTitleCase(inputVal, 'standard'); break;
      case "AP Title Case": result = toTitleCase(inputVal, 'ap'); break;
      case "Chicago Title Case": result = toTitleCase(inputVal, 'chicago'); break;
      case "Capitalized Case": result = toCapitalizedCase(inputVal); break;
      case "Toggle Case": result = toToggleCase(inputVal); break;
      case "Alternating Case": result = toAlternatingCase(inputVal); break;
      case "Inverse Case": result = toInverseCase(inputVal); break;
      case "camelCase": result = toCamelCase(inputVal); break;
      case "PascalCase": result = toPascalCase(inputVal); break;
      case "snake_case": result = toSnakeCase(inputVal); break;
      case "SCREAMING_SNAKE": result = toScreamingSnakeCase(inputVal); break;
      case "kebab-case": result = toKebabCase(inputVal); break;
      case "Train-Case": result = toTrainCase(inputVal); break;
      case "dot.case": result = toDotCase(inputVal); break;
      case "path/case": result = toPathCase(inputVal); break;
      default: result = inputVal;
    }

    setConvertedText(result);
    setActiveCaseType(type);

    // Append to transformations log
    if (inputVal.trim().length > 0) {
      setTransLog(prev => {
        // Avoid duplicate log values consecutively
        if (prev.length > 0 && prev[0].original === inputVal && prev[0].type === type) return prev;
        const newEntry = { timestamp: Date.now(), original: inputVal, converted: result, type };
        const updated = [newEntry, ...prev].slice(0, 10);
        if (isClient) {
          try {
            localStorage.setItem("case-converter-history", JSON.stringify(updated));
          } catch (e) {
            console.error(e);
          }
        }
        return updated;
      });
    }
  }, [text, isClient]);

  // Handle live conversions during input
  useEffect(() => {
    const timer = setTimeout(() => {
      convertText(activeCaseType, text);
    }, 150);
    return () => clearTimeout(timer);
  }, [text, activeCaseType, convertText]);

  // Hotkeys Listener for productivity
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Hotkey modifiers: Ctrl + Alt + Case key
      if (e.ctrlKey && e.altKey) {
        if (e.key.toLowerCase() === 'u') {
          e.preventDefault();
          convertText("UPPERCASE");
          showToast("Switched to UPPERCASE!");
        } else if (e.key.toLowerCase() === 'l') {
          e.preventDefault();
          convertText("lowercase");
          showToast("Switched to lowercase!");
        } else if (e.key.toLowerCase() === 't') {
          e.preventDefault();
          convertText("Title Case");
          showToast("Switched to Title Case!");
        } else if (e.key.toLowerCase() === 's') {
          e.preventDefault();
          convertText("Sentence case");
          showToast("Switched to Sentence case!");
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [convertText, showToast]);

  // Cleanups
  const handleCleanup = (cleanupType: 'extra-spaces' | 'blank-lines' | 'normalize') => {
    if (!text) return;
    pushHistoryState(text);
    let resultText = "";
    if (cleanupType === 'extra-spaces') {
      resultText = cleanRemoveExtraSpaces(text);
      showToast("Duplicate spaces collapsed.");
    } else if (cleanupType === 'blank-lines') {
      resultText = cleanRemoveBlankLines(text);
      showToast("Blank rows deleted.");
    } else {
      resultText = cleanNormalizeWhitespace(text);
      showToast("Whitespace normalized.");
    }
    updateText(resultText);
  };

  // Undo & Redo Actions
  const handleUndo = () => {
    if (historyIndex > 0) {
      const idx = historyIndex - 1;
      setHistoryIndex(idx);
      setText(historyStack[idx]);
      showToast("Undo action executed.");
    }
  };

  const handleRedo = () => {
    if (historyIndex < historyStack.length - 1) {
      const idx = historyIndex + 1;
      setHistoryIndex(idx);
      setText(historyStack[idx]);
      showToast("Redo action executed.");
    }
  };

  // Apply converted result as primary text
  const applyConvertedAsSource = () => {
    if (!convertedText) return;
    pushHistoryState(text);
    updateText(convertedText);
    showToast("Applied case changes to workspace!");
  };

  // Copy actions
  const handleCopy = async (targetVal: string, key: string) => {
    if (!targetVal) return;
    try {
      await navigator.clipboard.writeText(targetVal);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
      showToast("Text copied to clipboard!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyStats = async () => {
    const s = getStats(convertedText || text);
    const report = `Case: ${activeCaseType}
Characters: ${s.characters} (No spaces: ${s.charactersNoSpaces})
Words: ${s.words}
Sentences: ${s.sentences}
Paragraphs: ${s.paragraphs}
Lines: ${s.lines}`;

    try {
      await navigator.clipboard.writeText(report);
      setCopiedKey("stats");
      setTimeout(() => setCopiedKey(null), 2000);
      showToast("Statistics report copied!");
    } catch (e) {
      console.error(e);
    }
  };

  // Presets & example injectors
  const loadExample = () => {
    pushHistoryState(text);
    updateText(EXAMPLE_PHRASE);
    showToast("Example text loaded.");
  };

  // Exports
  const exportTxt = () => {
    if (!convertedText) return;
    downloadFile(convertedText, `transformed-${activeCaseType.toLowerCase().replace(/ /g, '-')}.txt`, "text/plain");
    showToast("Downloaded TXT draft!");
  };

  const exportJson = () => {
    const json = generateJSONReport(text, convertedText, activeCaseType);
    downloadFile(json, "case-conversion-report.json", "application/json");
    showToast("Downloaded JSON analytics report!");
  };

  const exportCsv = () => {
    const csv = generateCSVReport(text, convertedText, activeCaseType);
    downloadFile(csv, "case-conversion-metrics.csv", "text/csv");
    showToast("Downloaded CSV comparison grid!");
  };

  // Memoized stats & audits
  const stats = useMemo(() => getStats(text), [text]);
  const convertedStats = useMemo(() => getStats(convertedText), [convertedText]);
  const seoTitleAudit = useMemo(() => auditSEOTitle(convertedText || text), [convertedText, text]);

  if (!isClient) {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px] text-slate-500">
        <RefreshCw size={24} className="animate-spin mr-2" /> Loading Workspace...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* Toast Alert popup */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl shadow-xl text-sm font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 size={16} className="text-[#518231]" />
          {toastMessage}
        </div>
      )}

      {/* Editor & Presets split layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COMPONENT: The main writing text editor */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden flex flex-col shadow-sm">
            {/* Editor Toolbar Header */}
            <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <AlignLeft size={13} className="text-[#518231]" /> Workspace
                </span>
                <div className="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />
                <button 
                  onClick={handleUndo} 
                  disabled={historyIndex <= 0}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                  title="Undo Casing"
                >
                  <RotateCcw size={14} />
                </button>
                <button 
                  onClick={handleRedo} 
                  disabled={historyIndex >= historyStack.length - 1}
                  className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                  title="Redo Casing"
                >
                  <RotateCw size={14} />
                </button>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <button 
                  onClick={loadExample} 
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles size={13} className="text-amber-500" /> Example Text
                </button>
                
                <button 
                  onClick={() => handleCopy(text, 'original')} 
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  {copiedKey === 'original' ? <Check size={13} className="text-green-500" /> : <Copy size={13} />} Copy Original
                </button>

                <button 
                  onClick={() => { pushHistoryState(text); updateText(""); showToast("Cleared workspace."); }} 
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 size={13} /> Clear
                </button>
              </div>
            </div>

            {/* Split Screen / Comparison View mode logic */}
            {activeTab === "comparison" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-950">
                {/* Left Side: Original Input */}
                <div className="p-4 flex flex-col min-h-[360px] md:min-h-[460px]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Original Input Editor</span>
                  </div>
                  <textarea
                    value={text}
                    onChange={(e) => {
                      // Throttle pushing to history during keyboard entries
                      if (Math.abs(e.target.value.length - text.length) > 10) {
                        pushHistoryState(text);
                      }
                      updateText(e.target.value);
                    }}
                    placeholder="Enter or paste original text here..."
                    className="flex-1 w-full bg-transparent resize-none focus:outline-none focus:ring-0 text-sm leading-relaxed text-slate-700 dark:text-slate-300 custom-scrollbar"
                  />
                </div>
                {/* Right Side: Converted Live Preview */}
                <div className="p-4 flex flex-col bg-slate-50/50 dark:bg-slate-900/10 min-h-[360px] md:min-h-[460px]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-[#518231] uppercase tracking-wider flex items-center gap-1">
                      <ArrowLeftRight size={10} /> Live Output ({activeCaseType})
                    </span>
                    {convertedText && (
                      <button 
                        onClick={() => handleCopy(convertedText, 'comparison-out')}
                        className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white"
                        title="Copy output"
                      >
                        {copiedKey === 'comparison-out' ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                      </button>
                    )}
                  </div>
                  <div className="flex-1 text-sm leading-relaxed text-slate-850 dark:text-slate-200 select-all font-sans whitespace-pre-wrap overflow-y-auto custom-scrollbar select-text">
                    {convertedText || <span className="text-slate-300 dark:text-slate-700 italic">Live case preview matches will appear here...</span>}
                  </div>
                </div>
              </div>
            ) : (
              /* Standard Single Textarea Editor */
              <div className="p-4 bg-white dark:bg-slate-950">
                <textarea
                  value={text}
                  onChange={(e) => {
                    if (Math.abs(e.target.value.length - text.length) > 10) {
                      pushHistoryState(text);
                    }
                    updateText(e.target.value);
                  }}
                  placeholder="Type or paste your text here. The Case Converter will adjust casing in real time based on selection settings..."
                  className="w-full min-h-[380px] md:min-h-[460px] max-h-[700px] text-slate-800 dark:text-slate-100 bg-transparent resize-y border-0 focus:ring-0 focus:outline-none text-base leading-relaxed font-sans placeholder-slate-400 dark:placeholder-slate-650 custom-scrollbar"
                />
              </div>
            )}
            
            {/* Editor Spacing Cleanup Operations */}
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-2 flex-wrap text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1.5">Cleanup Formatting:</span>
              <button 
                onClick={() => handleCleanup('extra-spaces')}
                className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg shadow-sm transition-colors"
              >
                Remove Extra Spaces
              </button>
              <button 
                onClick={() => handleCleanup('blank-lines')}
                className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg shadow-sm transition-colors"
              >
                Remove Blank Lines
              </button>
              <button 
                onClick={() => handleCleanup('normalize')}
                className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg shadow-sm transition-colors"
              >
                Normalize Whitespace
              </button>
            </div>
          </div>

          {/* Export Report Actions Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#518231]/10 text-[#518231] rounded-lg">
                <Share2 size={16} />
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-none">Export Transformed Text</h4>
                <p className="text-xs text-slate-500 mt-1">Download modified casing files</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <button 
                onClick={exportTxt}
                disabled={!convertedText}
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
              >
                <FileText size={14} /> Download TXT
              </button>
              <button 
                onClick={exportJson}
                disabled={!convertedText}
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
              >
                <FileJson size={14} /> Download JSON
              </button>
              <button 
                onClick={exportCsv}
                disabled={!convertedText}
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
              >
                <BarChart3 size={14} /> Download CSV
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Conversion Presets & Statistics Widgets */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Main Option tabs */}
          <div className="bg-slate-100 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-0.5">
            {[
              { id: "standard", label: "Casing", icon: AlignLeft },
              { id: "developer", label: "Dev Casing", icon: Code },
              { id: "marketing", label: "Presets", icon: Zap },
              { id: "comparison", label: "Split Preview", icon: Columns },
              { id: "history", label: "Log", icon: RotateCcw }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === tab.id ? "bg-white dark:bg-slate-800 text-[#518231] dark:text-[#7ab056] shadow-sm" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"}`}
              >
                <tab.icon size={13} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: Standard Letter Casing Grids */}
          {activeTab === "standard" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Sliders size={13} className="text-[#518231]" /> Writer Case Styles
                </h4>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "Sentence case", label: "Sentence case", tooltip: "Capitalize first word of sentences" },
                    { id: "lowercase", label: "lowercase", tooltip: "Convert all to small letters" },
                    { id: "UPPERCASE", label: "UPPERCASE", tooltip: "Convert all to capital letters" },
                    { id: "Title Case", label: "Title Case", tooltip: "Capitalize all words" },
                    { id: "AP Title Case", label: "AP Title Case", tooltip: "AP Style capitalization rules" },
                    { id: "Chicago Title Case", label: "Chicago Title Case", tooltip: "Chicago Style capitalization rules" },
                    { id: "Capitalized Case", label: "Capitalized Case", tooltip: "Capitalize first letter of every word" },
                    { id: "Toggle Case", label: "Toggle Case", tooltip: "tOGGLE Casing Styles" },
                    { id: "Alternating Case", label: "Alternating Case", tooltip: "aLtErNaTiNg CaSe" },
                    { id: "Inverse Case", label: "Inverse Case", tooltip: "Swap cases for characters" }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => convertText(item.id)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border text-left transition-colors flex items-center justify-between group ${activeCaseType === item.id ? 'bg-[#518231]/10 border-[#518231] text-[#518231] dark:bg-green-950/20 dark:text-green-400' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
                      title={item.tooltip}
                    >
                      <span>{item.label}</span>
                      <ChevronRight size={12} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Developer Variable Conventions */}
          {activeTab === "developer" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Terminal size={13} className="text-[#518231]" /> Developer Formats
                </h4>

                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "camelCase", label: "camelCase", ex: "userProfile" },
                    { id: "PascalCase", label: "PascalCase", ex: "UserProfile" },
                    { id: "snake_case", label: "snake_case", ex: "user_profile" },
                    { id: "SCREAMING_SNAKE", label: "SCREAMING_SNAKE", ex: "USER_PROFILE" },
                    { id: "kebab-case", label: "kebab-case", ex: "user-profile" },
                    { id: "Train-Case", label: "Train-Case", ex: "User-Profile" },
                    { id: "dot.case", label: "dot.case", ex: "user.profile" },
                    { id: "path/case", label: "path/case", ex: "user/profile" }
                  ].map(item => (
                    <button
                      key={item.id}
                      onClick={() => convertText(item.id)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-bold border text-left transition-colors flex flex-col gap-0.5 justify-center ${activeCaseType === item.id ? 'bg-[#518231]/10 border-[#518231] text-[#518231] dark:bg-green-950/20 dark:text-green-400' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] font-mono text-slate-400 font-normal">{item.ex}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: Digital Marketer & Preset Options */}
          {activeTab === "marketing" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Zap size={13} className="text-[#518231]" /> Headline Presets
                </h4>

                <div className="space-y-2">
                  {[
                    { label: "Blog & Article Title", style: "AP Title Case", desc: "Formats using standard AP style rules." },
                    { label: "SEO Title Tag", style: "Title Case", desc: "Optimizes character sizes for Search Results." },
                    { label: "Email Subject Lines", style: "Sentence case", desc: "Maximizes open rates with conversational casing." },
                    { label: "Social Media Update", style: "Title Case", desc: "Capitalizes headers for LinkedIn & Instagram posts." },
                    { label: "YouTube Video Header", style: "AP Title Case", desc: "Headline case style for higher engagement." }
                  ].map((preset, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        convertText(preset.style);
                        showToast(`Applied ${preset.label} preset!`);
                      }}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#518231] text-left transition-all bg-transparent group flex items-center justify-between"
                    >
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-[#518231] transition-colors">{preset.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{preset.desc} (uses {preset.style})</div>
                      </div>
                      <ChevronRight size={14} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: Live split screen layout reminder (active case preview trigger) */}
          {activeTab === "comparison" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Columns size={13} className="text-[#518231]" /> Active Preview Style
                </h4>
                
                <div className="space-y-3 text-xs">
                  <p className="text-slate-500">Select any casing style below to update the preview outputs in real time on the left split screen.</p>
                  
                  <div className="flex flex-wrap gap-1.5 max-h-[180px] overflow-y-auto custom-scrollbar">
                    {["Sentence case", "lowercase", "UPPERCASE", "Title Case", "AP Title Case", "Chicago Title Case", "Capitalized Case", "camelCase", "PascalCase", "snake_case", "kebab-case"].map(c => (
                      <button
                        key={c}
                        onClick={() => convertText(c)}
                        className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition-all ${activeCaseType === c ? 'bg-[#518231] text-white border-[#518231]' : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Transformations Log History */}
          {activeTab === "history" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <RotateCcw size={13} className="text-slate-400" /> Transformation Log
                  </h4>
                  {transLog.length > 0 && (
                    <button 
                      onClick={() => { setTransLog([]); localStorage.removeItem("case-converter-history"); showToast("History logs cleared."); }}
                      className="text-[10px] font-bold text-red-500 hover:underline uppercase"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="space-y-3.5 max-h-[300px] overflow-y-auto custom-scrollbar">
                  {transLog.length > 0 ? (
                    transLog.map((log, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-950/45 border border-slate-150 dark:border-slate-850 rounded-xl space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-[#518231]/10 text-[#518231] text-[9px] font-extrabold uppercase">
                            {log.type}
                          </span>
                          <span className="text-[9px] text-slate-400 font-bold font-mono">
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate" title={log.original}>In: "{log.original}"</p>
                        <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate" title={log.converted}>Out: "{log.converted}"</p>
                        
                        <div className="flex items-center gap-2 pt-1 border-t border-slate-150 dark:border-slate-850">
                          <button 
                            onClick={() => { pushHistoryState(text); updateText(log.converted); showToast("Restored converted text!"); }}
                            className="text-[9px] font-extrabold text-[#518231] uppercase tracking-wider hover:underline"
                          >
                            Restore
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-xs text-slate-400 italic">No recent transformations recorded.</div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Live Text Statistics Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <BarChart3 size={13} className="text-[#518231]" /> Writing Metrics
              </h4>
              <button 
                onClick={handleCopyStats}
                className="text-[9px] font-bold text-slate-400 hover:text-slate-800 dark:hover:text-white uppercase flex items-center gap-1"
                title="Copy statistics report"
              >
                <Copy size={10} /> Report
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Characters</span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{stats.characters}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Without Spaces</span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{stats.charactersNoSpaces}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Words</span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{stats.words}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Sentences</span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{stats.sentences}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Paragraphs</span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{stats.paragraphs}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Lines</span>
                <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{stats.lines}</span>
              </div>
            </div>
          </div>

          {/* Meta Title / SEO Casing Audit Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Award size={13} className="text-[#518231]" /> Meta Title SEO Audit
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {seoTitleAudit.status === 'good' ? (
                  <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                ) : (
                  <AlertCircle size={16} className={`shrink-0 ${seoTitleAudit.status === 'error' ? 'text-red-500' : 'text-amber-500'}`} />
                )}
                <span className={`text-xs font-bold uppercase ${seoTitleAudit.status === 'good' ? 'text-green-600' : seoTitleAudit.status === 'error' ? 'text-red-500' : 'text-amber-600'}`}>
                  {seoTitleAudit.status === 'good' ? 'SEO Optimized' : seoTitleAudit.status === 'error' ? 'Meta Length Error' : 'SEO Warning'}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-normal">{seoTitleAudit.message}</p>
            </div>
          </div>

          {/* Quick Apply Button when standard views are active */}
          {activeTab !== "comparison" && convertedText && text !== convertedText && (
            <button
              onClick={applyConvertedAsSource}
              className="w-full py-3 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-2xl shadow-md shadow-green-900/10 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <Clipboard size={14} /> Apply Casing to Workspace
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
