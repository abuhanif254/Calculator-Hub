"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  FileText, Copy, Download, Trash2, Check, Sparkles, FileJson, 
  RefreshCw, TrendingUp, HelpCircle, Eye, Share2, Award, Zap,
  AlertCircle, BarChart3, Cloud, Layers, CheckCircle2, ChevronRight,
  BookOpen, HelpCircle as HelpIcon, ArrowRight, Settings, Sliders, Play, Plus, Minus
} from "lucide-react";
import {
  getBasicStats, getAdvancedStats, calculateReadability, getReadingTimes,
  getKeywordDensity, getSocialMediaLimits, analyzeWritingAssistant, runSEOAudit,
  cleanRemoveExtraSpaces, cleanRemoveBlankLines, cleanNormalizeText, convertCase,
  downloadFile, generateCSVReport, generateJSONReport, generatePDFReport,
  BasicStats, AdvancedStats, ReadabilityMetrics, ReadingTimes, KeywordDensity,
  SocialMediaLimit, SEOAudit, HighlightItem
} from "./utils";

const SAMPLE_TEXT = `# Ultimate Guide to Writing High-Quality Content

Writing great articles is both an art and a science. When you construct content for the web, you need to balance structural readability with search engine visibility. If a writer publishes short, low-quality posts, search engines might categorize the website as thin content. 

To improve your website rankings, focus on these writing guidelines:
1. Structure your articles with descriptive headings (like Markdown subheadings).
2. Keep your sentences short and active. Complex passive voice sentences can confuse readers.
3. Incorporate your primary keyword naturally. Aim for a density between 1.0% and 2.0% in the body copy.

By checking your word count, character count, and readability scores, you will produce clean, polished text that ranks on Google and engages readers. Start writing today!`;

export function WordCounterTool() {
  const [text, setText] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"stats" | "readability" | "seo" | "assistant" | "social">("stats");
  
  // Settings/Goal states
  const [wordGoal, setWordGoal] = useState<number>(0);
  const [isGoalActive, setIsGoalActive] = useState<boolean>(false);
  const [phraseSize, setPhraseSize] = useState<number>(1);
  const [filterStopWords, setFilterStopWords] = useState<boolean>(true);
  
  // UI UX States
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Trigger client-only lifecycle (prevents Next.js hydration mismatches)
  useEffect(() => {
    setIsClient(true);
    
    // Load from localStorage safely on mount
    try {
      const savedText = localStorage.getItem("word-counter-text");
      if (savedText) setText(savedText);
      
      const savedGoal = localStorage.getItem("word-counter-goal");
      if (savedGoal) {
        const parsedGoal = parseInt(savedGoal, 10);
        if (parsedGoal > 0) {
          setWordGoal(parsedGoal);
          setIsGoalActive(true);
        }
      }

      const savedStopToggle = localStorage.getItem("word-counter-stop-words");
      if (savedStopToggle) setFilterStopWords(savedStopToggle === "true");

      const savedPhraseSize = localStorage.getItem("word-counter-phrase-size");
      if (savedPhraseSize) setPhraseSize(parseInt(savedPhraseSize, 10));
    } catch (e) {
      console.error("Failed to load drafts from localStorage", e);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem("word-counter-text", text);
    } catch (e) {
      console.error("Failed to save text to localStorage", e);
    }
  }, [text, isClient]);

  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem("word-counter-goal", isGoalActive ? wordGoal.toString() : "0");
    } catch (e) {
      console.error("Failed to save goal to localStorage", e);
    }
  }, [wordGoal, isGoalActive, isClient]);

  useEffect(() => {
    if (!isClient) return;
    try {
      localStorage.setItem("word-counter-stop-words", filterStopWords.toString());
      localStorage.setItem("word-counter-phrase-size", phraseSize.toString());
    } catch (e) {
      console.error("Failed to save keyword settings to localStorage", e);
    }
  }, [filterStopWords, phraseSize, isClient]);

  // Memoized stats & analyses to optimize typing responsiveness for large texts
  const basicStats = useMemo(() => getBasicStats(text), [text]);
  const wordsList = useMemo(() => text.match(/[\p{L}\p{N}]+(?:'[\p{L}\p{N}]+)*/gu) || [], [text]);
  const advancedStats = useMemo(() => getAdvancedStats(text, wordsList), [text, wordsList]);
  const readability = useMemo(() => calculateReadability(wordsList, basicStats.sentences), [wordsList, basicStats.sentences]);
  const readingTimes = useMemo(() => getReadingTimes(basicStats.words), [basicStats.words]);
  
  const keywordDensity = useMemo(() => 
    getKeywordDensity(wordsList, phraseSize, filterStopWords),
    [wordsList, phraseSize, filterStopWords]
  );
  
  const socialLimits = useMemo(() => getSocialMediaLimits(basicStats.charactersWithSpaces), [basicStats.charactersWithSpaces]);
  
  const assistantAnalysis = useMemo(() => analyzeWritingAssistant(text), [text]);
  const seoAudit = useMemo(() => runSEOAudit(text, basicStats, keywordDensity), [text, basicStats, keywordDensity]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const handleCopyText = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey("text");
      setTimeout(() => setCopiedKey(null), 2000);
      showToast("Original text copied to clipboard!");
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const handleCopyStats = async () => {
    const reportText = `Nexus Word Counter Report
-------------------------
Words: ${basicStats.words}
Characters: ${basicStats.charactersWithSpaces} (Without spaces: ${basicStats.charactersWithoutSpaces})
Sentences: ${basicStats.sentences}
Paragraphs: ${basicStats.paragraphs}
Flesch Readability: ${readability.fleschEase} (${readability.difficultyLabel})
Grade Level: Grade ${readability.fleschKincaidGrade}
Average Reading Time: ${readingTimes.reading.average} min`;

    try {
      await navigator.clipboard.writeText(reportText);
      setCopiedKey("stats");
      setTimeout(() => setCopiedKey(null), 2000);
      showToast("Statistics report copied to clipboard!");
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  // Case converts
  const handleCaseChange = (style: 'uppercase' | 'lowercase' | 'titlecase' | 'sentencecase') => {
    if (!text) return;
    setText(convertCase(text, style));
    showToast(`Converted casing to ${style}!`);
  };

  // Cleanups
  const handleWhitespaceCleanup = (type: 'extra-spaces' | 'blank-lines' | 'normalize') => {
    if (!text) return;
    if (type === 'extra-spaces') {
      setText(cleanRemoveExtraSpaces(text));
      showToast("Removed duplicate spacing!");
    } else if (type === 'blank-lines') {
      setText(cleanRemoveBlankLines(text));
      showToast("Removed blank rows!");
    } else {
      setText(cleanNormalizeText(text));
      showToast("Normalized layout spacing!");
    }
  };

  // Export functions
  const handleExportTxt = () => {
    if (!text) return;
    downloadFile(text, "writing-draft.txt", "text/plain");
    showToast("Downloaded TXT draft!");
  };

  const handleExportJson = () => {
    if (!text) return;
    const json = generateJSONReport(text, basicStats, readability, keywordDensity);
    downloadFile(json, "writing-report.json", "application/json");
    showToast("Downloaded JSON report!");
  };

  const handleExportCsv = () => {
    if (keywordDensity.length === 0) return;
    const csv = generateCSVReport(keywordDensity);
    downloadFile(csv, "keyword-density-report.csv", "text/csv");
    showToast("Downloaded CSV keyword metrics!");
  };

  const handleExportPdf = () => {
    if (!text) return;
    generatePDFReport(text, basicStats, readability, keywordDensity);
    showToast("Generating PDF report download...");
  };

  // Inject sample text
  const injectSample = () => {
    setText(SAMPLE_TEXT);
    showToast("Example template loaded!");
  };

  // Target Goal calculations
  const goalProgressPercent = useMemo(() => {
    if (wordGoal <= 0) return 0;
    return Math.min(100, Math.round((basicStats.words / wordGoal) * 100));
  }, [basicStats.words, wordGoal]);

  if (!isClient) {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px] text-slate-500">
        <RefreshCw size={24} className="animate-spin mr-2" /> Loading Editor...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 relative">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl shadow-xl text-sm font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 size={16} className="text-[#518231]" />
          {toastMessage}
        </div>
      )}

      {/* Editor & Sidebar Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: The Rich text Editor Panel */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800/80 overflow-hidden flex flex-col shadow-sm">
            {/* Editor Top Bar Toolbar */}
            <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <FileText size={13} className="text-[#518231]" /> Workspace
                </span>
                {text.length > 0 && (
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Auto-saved to local draft" />
                )}
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <button 
                  onClick={injectSample} 
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles size={13} className="text-amber-500" /> Example Text
                </button>
                
                <button 
                  onClick={handleCopyText} 
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  {copiedKey === 'text' ? <Check size={13} className="text-green-500" /> : <Copy size={13} />} Copy All
                </button>

                <button 
                  onClick={() => { setText(""); showToast("Workspace cleared."); }} 
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 size={13} /> Clear
                </button>
              </div>
            </div>

            {/* Target Goal Panel */}
            <div className="px-4 py-2.5 bg-slate-100/50 dark:bg-slate-800/20 border-b border-slate-200 dark:border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isGoalActive} 
                    onChange={(e) => setIsGoalActive(e.target.checked)}
                    className="rounded text-[#518231] focus:ring-[#518231] h-4 w-4 dark:bg-slate-800 dark:border-slate-700" 
                  />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Set Word Goal</span>
                </label>
                {isGoalActive && (
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setWordGoal(prev => Math.max(50, prev - 50))}
                      className="p-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    >
                      <Minus size={11} />
                    </button>
                    <input 
                      type="number"
                      value={wordGoal || ""}
                      onChange={(e) => setWordGoal(parseInt(e.target.value, 10) || 0)}
                      className="w-16 px-1 py-0.5 text-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs font-bold font-mono focus:outline-none focus:border-[#518231]"
                      placeholder="e.g. 500"
                    />
                    <button 
                      onClick={() => setWordGoal(prev => prev + 50)}
                      className="p-1 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                    >
                      <Plus size={11} />
                    </button>
                    <span className="text-xs text-slate-500 ml-1">words</span>
                  </div>
                )}
              </div>
              {isGoalActive && wordGoal > 0 && (
                <div className="flex-1 max-w-[250px] flex items-center gap-2.5">
                  <div className="flex-1 bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#518231] h-full rounded-full transition-all duration-300" 
                      style={{ width: `${goalProgressPercent}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-bold font-mono text-slate-600 dark:text-slate-400">
                    {basicStats.words}/{wordGoal} ({goalProgressPercent}%)
                  </span>
                </div>
              )}
            </div>

            {/* The Text Area editor */}
            <div className="p-4 bg-white dark:bg-slate-950 flex-1">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here to begin instant word and character analysis..."
                className="w-full min-h-[380px] md:min-h-[460px] max-h-[700px] text-slate-800 dark:text-slate-100 bg-transparent resize-y border-0 focus:ring-0 focus:outline-none text-base leading-relaxed font-sans placeholder-slate-400 dark:placeholder-slate-600 custom-scrollbar"
                spellCheck="true"
              />
            </div>
            
            {/* Editor Bottom Bar: Action buttons */}
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800/80 flex flex-col gap-3">
              {/* Text Cleanup Tools */}
              <div className="flex items-center gap-2 flex-wrap text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1.5">Cleanup:</span>
                <button 
                  onClick={() => handleWhitespaceCleanup('extra-spaces')}
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg shadow-sm transition-colors"
                >
                  Collapse Spaces
                </button>
                <button 
                  onClick={() => handleWhitespaceCleanup('blank-lines')}
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg shadow-sm transition-colors"
                >
                  Remove Blank Lines
                </button>
                <button 
                  onClick={() => handleWhitespaceCleanup('normalize')}
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg shadow-sm transition-colors"
                >
                  Normalize Paragraphs
                </button>
              </div>

              {/* Case Conversion */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1.5">Convert:</span>
                <button 
                  onClick={() => handleCaseChange('sentencecase')}
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg shadow-sm transition-colors"
                >
                  Sentence case
                </button>
                <button 
                  onClick={() => handleCaseChange('titlecase')}
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg shadow-sm transition-colors"
                >
                  Title Case
                </button>
                <button 
                  onClick={() => handleCaseChange('uppercase')}
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg shadow-sm transition-colors"
                >
                  UPPERCASE
                </button>
                <button 
                  onClick={() => handleCaseChange('lowercase')}
                  className="px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-xs font-semibold text-slate-700 dark:text-slate-300 rounded-lg shadow-sm transition-colors"
                >
                  lowercase
                </button>
              </div>
            </div>
          </div>

          {/* Export / Report Actions Row */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#518231]/10 text-[#518231] rounded-lg">
                <Share2 size={16} />
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-none">Export Statistics</h4>
                <p className="text-xs text-slate-500 mt-1">Download analysis reports in multiple formats</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <button 
                onClick={handleExportTxt}
                disabled={!text}
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
              >
                <FileText size={14} /> TXT
              </button>
              <button 
                onClick={handleExportJson}
                disabled={!text}
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
              >
                <FileJson size={14} /> JSON
              </button>
              <button 
                onClick={handleExportCsv}
                disabled={keywordDensity.length === 0}
                className="px-3.5 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
              >
                <BarChart3 size={14} /> CSV Keywords
              </button>
              <button 
                onClick={handleExportPdf}
                disabled={!text}
                className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold rounded-xl transition-all shadow-md shadow-green-900/10 flex items-center gap-1.5"
              >
                <Download size={14} /> PDF Report
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Interactive Analytics Dashboard */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          {/* Navigation tabs for analytics sections */}
          <div className="bg-slate-100 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-0.5">
            {[
              { id: "stats", label: "Stats", icon: BarChart3 },
              { id: "readability", label: "Readability", icon: BookOpen },
              { id: "seo", label: "SEO", icon: TrendingUp },
              { id: "assistant", label: "Assistant", icon: Sparkles },
              { id: "social", label: "Social", icon: Layers }
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

          {/* TAB 1: General Core & Advanced Statistics */}
          {activeTab === "stats" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Primary Counts Cards Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-between">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Total Words</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-800 dark:text-white font-mono">{basicStats.words}</span>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-between">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Characters (Spaces)</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-800 dark:text-white font-mono">{basicStats.charactersWithSpaces}</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-between">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Total Sentences</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-800 dark:text-white font-mono">{basicStats.sentences}</span>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col justify-between">
                  <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Paragraphs</span>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-800 dark:text-white font-mono">{basicStats.paragraphs}</span>
                  </div>
                </div>
              </div>

              {/* Character Details */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Sliders size={13} className="text-[#518231]" /> Character Analysis
                </h4>
                
                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Without Spaces</span>
                    <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{basicStats.charactersWithoutSpaces}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Blank Spaces</span>
                    <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{basicStats.spaces}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Letters Only</span>
                    <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{basicStats.letters}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Numeric Digits</span>
                    <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{basicStats.numbers}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Punctuation & Symbols</span>
                    <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{basicStats.symbols}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Lexical Richness</span>
                    <span className="font-bold font-mono text-slate-800 dark:text-slate-200" title="Ratio of unique words to total words">
                      {Math.round(advancedStats.lexicalDiversity * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Averages Summary */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Sliders size={13} className="text-[#518231]" /> Writing Averages
                </h4>
                
                <div className="space-y-3.5 text-sm">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>Average Word Length</span>
                      <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{advancedStats.averageWordLength} characters</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${Math.min(100, advancedStats.averageWordLength * 10)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>Average Sentence Length</span>
                      <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{advancedStats.averageSentenceLength} words</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${Math.min(100, (advancedStats.averageSentenceLength / 35) * 100)}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>Average Paragraph Length</span>
                      <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{advancedStats.averageParagraphLength} words</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: `${Math.min(100, (advancedStats.averageParagraphLength / 180) * 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Word Cloud Visualizer */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Cloud size={13} className="text-[#518231]" /> Visual Word Cloud
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Top 12 words</span>
                </div>
                
                {wordsList.length > 0 ? (
                  <div className="flex flex-wrap gap-2.5 justify-center py-4 bg-slate-55 dark:bg-slate-950/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800 shadow-inner">
                    {getKeywordDensity(wordsList, 1, true).slice(0, 12).map((k, idx) => {
                      // Dynamically size font sizes between 11px and 22px
                      const size = Math.max(11, Math.min(22, 11 + (k.count * 1.5)));
                      // Color mapping from brand green to deep blue/grey
                      const colorClasses = [
                        "text-[#518231] font-extrabold",
                        "text-blue-600 font-bold dark:text-blue-400",
                        "text-indigo-600 font-semibold dark:text-indigo-400",
                        "text-slate-700 font-semibold dark:text-slate-300"
                      ];
                      const color = colorClasses[idx % colorClasses.length];

                      return (
                        <span 
                          key={k.phrase} 
                          className={`${color} hover:scale-105 hover:underline transition-transform cursor-pointer leading-none`}
                          style={{ fontSize: `${size}px` }}
                          title={`Occurs ${k.count} times`}
                        >
                          {k.phrase}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-6 text-sm text-slate-400 italic">Enter some text to build the cloud.</div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: Readability Levels and Speed Timers */}
          {activeTab === "readability" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Visual Readability Gauges */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Award size={13} className="text-[#518231]" /> Readability Standard
                </h4>

                <div className="flex items-center gap-5">
                  <div className="relative flex items-center justify-center shrink-0 w-24 h-24 rounded-full border-4 border-slate-100 dark:border-slate-800">
                    <div className="text-center">
                      <div className="text-2xl font-black text-slate-800 dark:text-white font-mono">{readability.fleschEase}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase leading-none mt-0.5">Ease Score</div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                        readability.fleschEase >= 60 ? 'bg-green-100 text-green-700 dark:bg-green-950/45 dark:text-green-400' :
                        readability.fleschEase >= 45 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/45 dark:text-amber-400' :
                        'bg-red-100 text-red-700 dark:bg-red-950/45 dark:text-red-400'
                      }`}>
                        {readability.difficultyLabel}
                      </span>
                      <span className="text-xs text-slate-400 font-bold font-mono">Grade {readability.fleschKincaidGrade}</span>
                    </div>
                    <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200">{readability.educationLevel}</h5>
                    <p className="text-xs text-slate-500 leading-normal">{readability.description}</p>
                  </div>
                </div>
              </div>

              {/* Estimated Speaking and Reading Time grids */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <BookOpen size={13} className="text-[#518231]" /> Speaking & Reading Times
                </h4>
                
                <div className="space-y-4">
                  {/* Reading Row */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-850 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Silent Reading Duration</span>
                      <span className="text-xs font-bold text-slate-500 font-mono">~{readingTimes.reading.average} min</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Slow (150 WPM)</div>
                        <div className="font-bold text-slate-700 dark:text-slate-300 mt-0.5">{readingTimes.reading.slow} min</div>
                      </div>
                      <div className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Avg (230 WPM)</div>
                        <div className="font-bold text-[#518231] mt-0.5">{readingTimes.reading.average} min</div>
                      </div>
                      <div className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Fast (300 WPM)</div>
                        <div className="font-bold text-slate-700 dark:text-slate-300 mt-0.5">{readingTimes.reading.fast} min</div>
                      </div>
                    </div>
                  </div>

                  {/* Speaking Row */}
                  <div className="p-3 bg-slate-50 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-850 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Speaking / Voice-Over</span>
                      <span className="text-xs font-bold text-slate-500 font-mono">~{readingTimes.speaking.average} min</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Slow (110 WPM)</div>
                        <div className="font-bold text-slate-700 dark:text-slate-300 mt-0.5">{readingTimes.speaking.slow} min</div>
                      </div>
                      <div className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Avg (140 WPM)</div>
                        <div className="font-bold text-[#518231] mt-0.5">{readingTimes.speaking.average} min</div>
                      </div>
                      <div className="p-1.5 bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400 font-semibold uppercase">Fast (170 WPM)</div>
                        <div className="font-bold text-slate-700 dark:text-slate-300 mt-0.5">{readingTimes.speaking.fast} min</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: SEO Content Audit & Keyword Densities */}
          {activeTab === "seo" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* SEO Score Circle */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <TrendingUp size={13} className="text-[#518231]" /> SEO Optimization Grade
                </h4>

                <div className="flex items-center gap-5">
                  <div className="relative flex items-center justify-center shrink-0 w-20 h-20 rounded-full border-4 border-slate-100 dark:border-slate-800">
                    <div className="text-center">
                      <div className="text-2xl font-black text-slate-800 dark:text-white font-mono">{seoAudit.score}</div>
                      <div className="text-[8px] font-bold text-slate-400 uppercase leading-none mt-0.5">SEO Score</div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">Checklist Audits</h5>
                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto custom-scrollbar">
                      {seoAudit.issues.map(issue => (
                        <div key={issue.id} className="flex gap-1.5 text-xs">
                          {issue.status === 'good' ? (
                            <CheckCircle2 size={13} className="text-green-500 mt-0.5 shrink-0" />
                          ) : (
                            <AlertCircle size={13} className={`mt-0.5 shrink-0 ${issue.status === 'error' ? 'text-red-500' : 'text-amber-500'}`} />
                          )}
                          <div className="flex-1">
                            <span className="font-bold text-slate-700 dark:text-slate-300">{issue.label}: </span>
                            <span className="text-slate-500">{issue.tip}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Keyword Density List Table */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2 flex-wrap gap-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <BarChart3 size={13} className="text-[#518231]" /> Keyword Prominence
                  </h4>
                  
                  <div className="flex items-center gap-2">
                    <select
                      value={phraseSize}
                      onChange={(e) => setPhraseSize(parseInt(e.target.value, 10))}
                      className="px-1.5 py-0.5 bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 rounded text-[10px] font-bold"
                    >
                      <option value={1}>1 Word</option>
                      <option value={2}>2 Words</option>
                      <option value={3}>3 Words</option>
                    </select>
                    
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={filterStopWords} 
                        onChange={(e) => setFilterStopWords(e.target.checked)}
                        className="rounded h-3 w-3 text-[#518231] focus:ring-0 dark:bg-slate-800" 
                      />
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Filter Clean</span>
                    </label>
                  </div>
                </div>

                <div className="overflow-x-auto custom-scrollbar max-h-[220px] overflow-y-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 uppercase tracking-wider font-bold">
                        <th className="py-2">Phrase</th>
                        <th className="py-2 text-right">Count</th>
                        <th className="py-2 text-right">Density</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                      {keywordDensity.length > 0 ? (
                        keywordDensity.map(kw => (
                          <tr key={kw.phrase} className="hover:bg-slate-50 dark:hover:bg-slate-900/50">
                            <td className="py-2 font-mono font-medium text-slate-700 dark:text-slate-300 truncate max-w-[150px]">{kw.phrase}</td>
                            <td className="py-2 text-right font-semibold font-mono text-slate-600 dark:text-slate-450">{kw.count}</td>
                            <td className="py-2 text-right font-bold font-mono text-[#518231]">{kw.percentage}%</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="py-4 text-center text-slate-400 italic">No keywords extracted.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: Writing Assistant & Flow Editor */}
          {activeTab === "assistant" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Readability/Assistant flow score */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Sparkles size={13} className="text-amber-500 animate-pulse" /> Writing Flow Health
                </h4>
                
                <div className="flex items-center gap-5">
                  <div className="relative flex items-center justify-center shrink-0 w-16 h-16 rounded-full border-4 border-slate-100 dark:border-slate-800">
                    <div className="text-center font-black text-slate-850 dark:text-white font-mono text-lg">
                      {assistantAnalysis.score}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-xs font-bold text-slate-700 dark:text-slate-350 uppercase">Style Rating</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-normal">Scored by sentence length variations and passive voice frequency.</p>
                  </div>
                </div>
              </div>

              {/* Recommendations list */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <CheckCircle2 size={13} className="text-[#518231]" /> Editorial Recommendations
                </h4>
                
                <div className="space-y-3">
                  {assistantAnalysis.recommendations.map((rec, i) => (
                    <div key={i} className="flex gap-2.5 items-start text-xs leading-normal">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#518231] shrink-0 mt-1.5" />
                      <p className="text-slate-650 dark:text-slate-400">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive highlights summary */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Eye size={13} className="text-indigo-500" /> Structure Highlights
                  </h4>
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{assistantAnalysis.highlights.length} issues</span>
                </div>
                
                <div className="space-y-3.5 max-h-[220px] overflow-y-auto custom-scrollbar">
                  {assistantAnalysis.highlights.length > 0 ? (
                    assistantAnalysis.highlights.map((h, i) => (
                      <div key={i} className="p-3 bg-slate-50 dark:bg-slate-950/45 border border-slate-150 dark:border-slate-850 rounded-xl space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase ${h.type === 'long-sentence' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-950/30 dark:text-amber-400'}`}>
                            {h.type === 'long-sentence' ? 'Long Sentence' : 'Passive Voice'}
                          </span>
                        </div>
                        <p className="text-xs italic font-mono text-slate-700 dark:text-slate-350">"{h.text}"</p>
                        <p className="text-[10px] text-[#518231] font-semibold flex items-center gap-1">
                          <ArrowRight size={10} /> {h.suggestion}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-slate-400 italic">No formatting issues highlighted. Nice draft structure!</div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: Social Media Limits Checker */}
          {activeTab === "social" && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {socialLimits.map(cfg => (
                <div key={cfg.name} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">{cfg.name}</span>
                    <span className="font-bold font-mono text-slate-500">
                      {cfg.used} / {cfg.limit}
                    </span>
                  </div>

                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        cfg.status === 'danger' ? 'bg-red-500' :
                        cfg.status === 'warning' ? 'bg-amber-500' : 'bg-[#518231]'
                      }`}
                      style={{ width: `${cfg.percent}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-[10px]">
                    <span className={`font-bold ${cfg.status === 'danger' ? 'text-red-500' : 'text-slate-400'}`}>
                      {cfg.status === 'danger' ? 'Over Limit!' : 'Characters Remaining'}
                    </span>
                    <span className={`font-bold font-mono ${
                      cfg.status === 'danger' ? 'text-red-500' :
                      cfg.status === 'warning' ? 'text-amber-500' : 'text-slate-650 dark:text-slate-400'
                    }`}>
                      {cfg.remaining}
                    </span>
                  </div>
                </div>
              ))}

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
