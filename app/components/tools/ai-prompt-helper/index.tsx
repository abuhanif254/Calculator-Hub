"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { 
  FileText, Copy, Download, Trash2, Check, Sparkles, FileJson, 
  RefreshCw, TrendingUp, HelpCircle, Eye, Share2, Award, Zap,
  AlertCircle, BarChart3, Cloud, Layers, CheckCircle2, ChevronRight,
  BookOpen, ArrowRight, Settings, Sliders, Play, Plus, Minus, Cpu, Image as ImageIcon, History, Bookmark
} from "lucide-react";
import {
  getPromptStats, analyzePromptQuality, optimizePromptLocal, optimizePromptGemini,
  PROMPT_TEMPLATES, ROLE_PRESETS, PromptScores, PromptStats, PromptTemplate,
  downloadFile, generateJSONReport
} from "./utils";

const EXAMPLES = [
  "Write an essay about standard databases.",
  "Create a marketing email pitching software development classes.",
  "Midjourney prompt for a futuristic city at sunset.",
  "Write a python script to parse a csv table."
];

export function AIPromptHelperTool() {
  const [text, setText] = useState<string>("");
  const [optimizedPrompt, setOptimizedPrompt] = useState<string>("");
  const [targetModel, setTargetModel] = useState<string>("ChatGPT (GPT-4o)");
  const [styleTone, setStyleTone] = useState<string>("Technical");
  const [promptMode, setPromptMode] = useState<"beginner" | "advanced" | "expert">("advanced");

  // API configuration
  const [apiKey, setApiKey] = useState<string>("AIzaSyAkzF-l-XVyeuIYyLOUVFuEgDYRnfF5BIE");
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);

  // Layout tabs
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<"editor" | "templates" | "image-helper">("editor");
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<"optimize" | "scores" | "history">("optimize");

  // History & Favorites
  const [history, setHistory] = useState<{ timestamp: number; original: string; optimized: string; model: string }[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // UI states
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Image Prompt Builder helpers
  const [imageSubject, setImageSubject] = useState<string>("");
  const [imageStyle, setImageStyle] = useState<string>("");
  const [imageLighting, setImageLighting] = useState<string>("");
  const [imageCamera, setImageCamera] = useState<string>("");
  const [imageParams, setImageParams] = useState<string>("--ar 16:9 --v 6.0");

  useEffect(() => {
    setIsClient(true);
    try {
      const savedText = localStorage.getItem("prompt-helper-text");
      if (savedText) setText(savedText);

      const savedOpt = localStorage.getItem("prompt-helper-opt");
      if (savedOpt) setOptimizedPrompt(savedOpt);

      const savedHistory = localStorage.getItem("prompt-helper-history");
      if (savedHistory) setHistory(JSON.parse(savedHistory));

      const savedFavs = localStorage.getItem("prompt-helper-favs");
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Saves state
  const updateText = (newVal: string) => {
    setText(newVal);
    if (isClient) localStorage.setItem("prompt-helper-text", newVal);
  };

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  const pushHistoryState = (orig: string, opt: string) => {
    setHistory(prev => {
      const newEntry = { timestamp: Date.now(), original: orig, optimized: opt, model: targetModel };
      const updated = [newEntry, ...prev].slice(0, 10);
      if (isClient) localStorage.setItem("prompt-helper-history", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavorite = (promptStr: string) => {
    setFavorites(prev => {
      let updated;
      if (prev.includes(promptStr)) {
        updated = prev.filter(f => f !== promptStr);
        showToast("Removed from favorites.");
      } else {
        updated = [...prev, promptStr];
        showToast("Saved to favorites!");
      }
      if (isClient) localStorage.setItem("prompt-helper-favs", JSON.stringify(updated));
      return updated;
    });
  };

  // Main optimization handler
  const handleOptimize = async () => {
    if (!text.trim()) return;
    setIsOptimizing(true);
    try {
      if (apiKey.trim()) {
        const res = await optimizePromptGemini(text, targetModel, styleTone, promptMode, apiKey);
        setOptimizedPrompt(res);
        if (isClient) localStorage.setItem("prompt-helper-opt", res);
        pushHistoryState(text, res);
        showToast("Prompt optimized using Gemini AI Pro!");
      } else {
        const res = optimizePromptLocal(text, targetModel, styleTone, promptMode);
        setOptimizedPrompt(res);
        if (isClient) localStorage.setItem("prompt-helper-opt", res);
        pushHistoryState(text, res);
        showToast("Prompt optimized locally.");
      }
    } catch (e) {
      console.warn("API Optimization failed. Switched to local rule optimization.", e);
      const res = optimizePromptLocal(text, targetModel, styleTone, promptMode);
      setOptimizedPrompt(res);
      if (isClient) localStorage.setItem("prompt-helper-opt", res);
      pushHistoryState(text, res);
      showToast("Applied local fallback optimizer.");
    } finally {
      setIsOptimizing(false);
    }
  };

  // Exports
  const handleCopy = async (targetText: string, key: string) => {
    if (!targetText) return;
    try {
      await navigator.clipboard.writeText(targetText);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
      showToast("Copied to clipboard!");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopyReport = async () => {
    const r = stats;
    const s = scores;
    const report = `Prompt Analysis Report
----------------------
Words: ${r.words} | Tokens: ${r.tokens.gpt}
Overall Quality Score: ${s.overall}%
Clarity: ${s.clarity}% | Detail: ${s.detail}% | Context: ${s.context}% | Instruction: ${s.instruction}% | Structure: ${s.structure}%
Optimized Prompt:
${optimizedPrompt}`;

    try {
      await navigator.clipboard.writeText(report);
      setCopiedKey("report");
      setTimeout(() => setCopiedKey(null), 2000);
      showToast("Analysis report copied!");
    } catch (err) {
      console.error(err);
    }
  };

  const downloadPromptTxt = () => {
    if (!optimizedPrompt) return;
    downloadFile(optimizedPrompt, "optimized-prompt.txt", "text/plain");
    showToast("Downloaded TXT prompt!");
  };

  const downloadPromptMd = () => {
    if (!optimizedPrompt) return;
    const md = `# Optimized AI Prompt\n\n> Optimized for ${targetModel} (${promptMode} mode)\n\n\`\`\`text\n${optimizedPrompt}\n\`\`\``;
    downloadFile(md, "optimized-prompt.md", "text/markdown");
    showToast("Downloaded Markdown prompt!");
  };

  const downloadPromptJson = () => {
    const reportJson = generateJSONReport(text, optimizedPrompt, targetModel);
    downloadFile(reportJson, "prompt-optimizer-report.json", "application/json");
    showToast("Downloaded JSON analytics report!");
  };

  // Load preset template
  const loadTemplate = (p: string) => {
    updateText(p);
    setActiveWorkspaceTab("editor");
    showToast("Template loaded into workspace!");
  };

  // Image Prompt Builder compiler
  const applyImagePrompt = () => {
    if (!imageSubject.trim()) {
      showToast("Please enter an image subject.");
      return;
    }
    const tags = [
      imageSubject,
      imageStyle,
      imageLighting,
      imageCamera,
      imageParams
    ].filter(t => t.trim().length > 0).join(", ");
    
    updateText(tags);
    setTargetModel("Midjourney / DALL-E");
    setActiveWorkspaceTab("editor");
    showToast("Image prompt injected!");
  };

  // Replace editor input with optimized output
  const applyOptimizedAsInput = () => {
    if (!optimizedPrompt) return;
    updateText(optimizedPrompt);
    showToast("Overwrote workspace with optimized prompt!");
  };

  // Memoized stats & scores
  const stats = useMemo(() => getPromptStats(text, targetModel), [text, targetModel]);
  const scores = useMemo(() => analyzePromptQuality(text), [text]);

  // Improvement calculations
  const improvementScore = useMemo(() => {
    if (!optimizedPrompt) return 0;
    const optScores = analyzePromptQuality(optimizedPrompt);
    const diff = optScores.overall - scores.overall;
    return Math.max(0, diff);
  }, [scores.overall, optimizedPrompt]);

  if (!isClient) {
    return (
      <div className="w-full flex items-center justify-center min-h-[300px] text-slate-500">
        <RefreshCw size={24} className="animate-spin mr-2" /> Loading AI Playground...
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

      {/* Editor & Dashboard Split Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Workspace Workspace Tabs */}
        <div className="xl:col-span-8 flex flex-col gap-4">
          
          {/* Main workspace navigation tabs */}
          <div className="bg-slate-100 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-0.5 max-w-sm">
            <button
              onClick={() => setActiveWorkspaceTab("editor")}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${activeWorkspaceTab === "editor" ? "bg-white dark:bg-slate-800 text-[#518231] dark:text-[#7ab056] shadow-sm" : "text-slate-500 hover:text-slate-800 dark:text-slate-400"}`}
            >
              <Cpu size={13} />
              Workspace
            </button>
            <button
              onClick={() => setActiveWorkspaceTab("templates")}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${activeWorkspaceTab === "templates" ? "bg-white dark:bg-slate-800 text-[#518231] dark:text-[#7ab056] shadow-sm" : "text-slate-500 hover:text-slate-800 dark:text-slate-400"}`}
            >
              <Sliders size={13} />
              Templates
            </button>
            <button
              onClick={() => setActiveWorkspaceTab("image-helper")}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${activeWorkspaceTab === "image-helper" ? "bg-white dark:bg-slate-800 text-[#518231] dark:text-[#7ab056] shadow-sm" : "text-slate-500 hover:text-slate-800 dark:text-slate-400"}`}
            >
              <ImageIcon size={13} />
              Image AI
            </button>
          </div>

          {/* Tab Content: Workspace Editor */}
          {activeWorkspaceTab === "editor" && (
            <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col shadow-sm gap-0">
              
              {/* Target configurations toolbar */}
              <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center flex-wrap gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  {/* Target model selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-450 uppercase">Model:</span>
                    <select
                      value={targetModel}
                      onChange={(e) => setTargetModel(e.target.value)}
                      className="px-2 py-1 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold focus:outline-none"
                    >
                      <option value="ChatGPT (GPT-4o)">ChatGPT (GPT-4o)</option>
                      <option value="GPT-5">GPT-5 (Predictive)</option>
                      <option value="Claude 3.5 Sonnet">Claude 3.5 Sonnet</option>
                      <option value="Gemini 1.5 Pro">Gemini 1.5 Pro</option>
                      <option value="DeepSeek-V3">DeepSeek-V3</option>
                      <option value="Mistral / Llama">Llama / Mistral</option>
                    </select>
                  </div>

                  {/* Tone selector */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-455 uppercase">Style:</span>
                    <select
                      value={styleTone}
                      onChange={(e) => setStyleTone(e.target.value)}
                      className="px-2 py-1 bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold focus:outline-none"
                    >
                      <option value="Technical">Technical</option>
                      <option value="Professional">Professional</option>
                      <option value="Academic">Academic</option>
                      <option value="Creative">Creative</option>
                      <option value="Concise">Concise</option>
                      <option value="Business-oriented">Business</option>
                    </select>
                  </div>
                </div>

                {/* Mode controls */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-slate-455 uppercase">Mode:</span>
                  <div className="bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg flex">
                    {(["beginner", "advanced", "expert"] as const).map(m => (
                      <button
                        key={m}
                        onClick={() => setPromptMode(m)}
                        className={`px-2 py-1 text-[10px] font-bold rounded-md capitalize transition-all ${promptMode === m ? 'bg-white dark:bg-slate-750 text-[#518231] shadow-sm' : 'text-slate-400 hover:text-slate-650'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gemini Key Config bar */}
              <div className="px-4 py-2 bg-slate-100/60 dark:bg-slate-850/40 border-b border-slate-200 dark:border-slate-800/80 flex justify-between items-center flex-wrap gap-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1">
                  <Zap size={11} className="text-[#518231]" /> Gemini API Optimization key:
                </span>
                <input 
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste custom Gemini API key or leave blank for local fallback"
                  className="w-48 text-[11px] font-mono px-2 py-0.5 rounded border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800 focus:outline-none"
                />
              </div>

              {/* Input Workspace */}
              <div className="p-4 bg-white dark:bg-slate-950 flex-1 flex flex-col">
                <textarea
                  value={text}
                  onChange={(e) => updateText(e.target.value)}
                  placeholder="Enter your rough prompt idea, instructions, or coding tasks to begin formatting, structuring, and optimizing..."
                  className="w-full min-h-[360px] md:min-h-[420px] max-h-[700px] text-slate-800 dark:text-slate-150 bg-transparent resize-y border-0 focus:ring-0 focus:outline-none text-base leading-relaxed font-sans placeholder-slate-450 custom-scrollbar"
                />
              </div>

              {/* Action Toolbar bottom */}
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center flex-wrap gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1.5">Preset Roles:</span>
                  {ROLE_PRESETS.slice(0, 3).map((r, i) => (
                    <button
                      key={i}
                      onClick={() => { updateText(r.role + "\n\n" + text); showToast(`Injected ${r.name} Role!`); }}
                      className="px-2 py-1 bg-white hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-750 text-[10px] font-bold text-slate-650 dark:text-slate-350 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm"
                    >
                      {r.name}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {text && (
                    <button 
                      onClick={() => { updateText(""); setOptimizedPrompt(""); showToast("Workspace cleared."); }}
                      className="px-3.5 py-2 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 text-xs font-bold rounded-xl transition-all"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={handleOptimize}
                    disabled={isOptimizing || !text.trim()}
                    className="px-5 py-2 bg-[#518231] hover:bg-[#436a28] text-white disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold rounded-xl transition-all shadow-md shadow-green-900/10 flex items-center gap-1.5 active:scale-95"
                  >
                    {isOptimizing ? (
                      <RefreshCw size={14} className="animate-spin" />
                    ) : (
                      <Sparkles size={14} className="text-amber-300 animate-pulse" />
                    )}
                    Optimize Prompt
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Template Library */}
          {activeWorkspaceTab === "templates" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-slate-850 dark:text-white flex items-center gap-2">
                <Sliders size={16} className="text-[#518231]" /> Prompt Engineering Library
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROMPT_TEMPLATES.map((tmpl, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-950/45 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all">
                    <div>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase ${tmpl.category === 'development' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400' : tmpl.category === 'writing' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400'}`}>
                        {tmpl.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-2">{tmpl.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 leading-normal">{tmpl.description}</p>
                    </div>
                    
                    <button 
                      onClick={() => loadTemplate(tmpl.prompt)}
                      className="mt-4 px-3 py-1.5 w-full bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-[#518231] rounded-xl flex items-center justify-center gap-1"
                    >
                      <Play size={10} /> Load Template
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Image Helper Constructor */}
          {activeWorkspaceTab === "image-helper" && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-5 animate-in fade-in duration-200">
              <h3 className="text-sm font-bold text-slate-850 dark:text-white flex items-center gap-2">
                <ImageIcon size={16} className="text-[#518231]" /> Image Prompt Constructor
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject / Core Scene</label>
                  <input
                    type="text"
                    value={imageSubject}
                    onChange={(e) => setImageSubject(e.target.value)}
                    placeholder="e.g. A fantasy astronaut playing guitar on Mars"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 dark:border-slate-750 rounded-xl text-sm focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Artistic Style</label>
                    <select
                      value={imageStyle}
                      onChange={(e) => setImageStyle(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl text-xs"
                    >
                      <option value="">None (Default)</option>
                      <option value="photorealistic">Photorealistic</option>
                      <option value="cinematic lighting">Cinematic Render</option>
                      <option value="watercolor illustration">Watercolor Painting</option>
                      <option value="anime style art">Anime / Manga</option>
                      <option value="unreal engine 5 render">3D Unreal Engine 5</option>
                      <option value="pencil sketch">Pencil Sketch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lighting</label>
                    <select
                      value={imageLighting}
                      onChange={(e) => setImageLighting(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl text-xs"
                    >
                      <option value="">None (Default)</option>
                      <option value="golden hour lighting">Golden Hour Sunlight</option>
                      <option value="neon glow lighting">Neon Cyberpunk Lighting</option>
                      <option value="volumetric lighting">Volumetric Fog / Ray Light</option>
                      <option value="dramatic studio lighting">Soft Studio Studio</option>
                      <option value="bioluminescent glow">Bioluminescent Highlights</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Camera Settings</label>
                    <select
                      value={imageCamera}
                      onChange={(e) => setImageCamera(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl text-xs"
                    >
                      <option value="">None (Default)</option>
                      <option value="shot on 35mm lens">35mm Film Camera</option>
                      <option value="macro lens close-up">Macro Lens Close-Up</option>
                      <option value="wide-angle lens photography">Wide-Angle View</option>
                      <option value="drone photography perspective">Drone Top View</option>
                      <option value="bokeh background lens blur">Bokeh Blur Background</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Midjourney Parameters</label>
                    <input
                      type="text"
                      value={imageParams}
                      onChange={(e) => setImageParams(e.target.value)}
                      placeholder="e.g. --ar 16:9 --stylize 250"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-850 rounded-xl text-xs font-mono"
                    />
                  </div>
                </div>

                <button 
                  onClick={applyImagePrompt}
                  className="w-full py-3 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-xl shadow-md flex items-center justify-center gap-1.5"
                >
                  <Sparkles size={13} className="text-amber-300" /> Compile and Apply Image Prompt
                </button>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: AI Scoring Metrics & Optimization Output */}
        <div className="xl:col-span-4 flex flex-col gap-6">
          
          {/* Output selection tabs */}
          <div className="bg-slate-100 dark:bg-slate-900/80 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-0.5">
            {[
              { id: "optimize", label: "Optimizer", icon: Sparkles },
              { id: "scores", label: "Scoring Report", icon: BarChart3 },
              { id: "history", label: "Recents Log", icon: History }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveAnalysisTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold rounded-xl transition-all ${activeAnalysisTab === tab.id ? "bg-white dark:bg-slate-800 text-[#518231] dark:text-[#7ab056] shadow-sm" : "text-slate-500 hover:text-slate-800 dark:text-slate-400"}`}
              >
                <tab.icon size={13} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1 Content: The Optimized Output Prompt Dashboard */}
          {activeAnalysisTab === "optimize" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Output Preview */}
              <div className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-slate-200 dark:border-slate-850 flex flex-col shadow-sm overflow-hidden min-h-[300px]">
                <div className="px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center flex-wrap gap-2">
                  <span className="text-xs font-bold text-[#518231] uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 size={13} /> Optimized Prompt Output
                  </span>
                  
                  {optimizedPrompt && (
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={() => toggleFavorite(optimizedPrompt)}
                        className={`p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 ${favorites.includes(optimizedPrompt) ? 'text-amber-500' : 'text-slate-400'}`}
                        title="Add to saved favorites"
                      >
                        <Bookmark size={13} />
                      </button>
                      <button 
                        onClick={() => handleCopy(optimizedPrompt, 'optimized')}
                        className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-450"
                        title="Copy Optimized Prompt"
                      >
                        {copiedKey === 'optimized' ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
                      </button>
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 text-sm leading-relaxed text-slate-850 dark:text-slate-200 whitespace-pre-wrap select-all font-mono custom-scrollbar overflow-y-auto max-h-[350px] select-text">
                  {optimizedPrompt || (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-650 py-16">
                      <Sparkles size={28} className="mb-2 opacity-40 animate-pulse text-amber-500" />
                      <p className="text-xs font-medium">Awaiting prompt optimization...</p>
                    </div>
                  )}
                </div>

                {optimizedPrompt && (
                  <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center flex-wrap gap-2">
                    <div className="flex gap-1.5">
                      <button onClick={downloadPromptTxt} className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 text-[10px] font-bold border border-slate-200 dark:border-slate-700 rounded-lg">TXT</button>
                      <button onClick={downloadPromptMd} className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 text-[10px] font-bold border border-slate-200 dark:border-slate-700 rounded-lg">MD</button>
                      <button onClick={downloadPromptJson} className="px-2.5 py-1.5 bg-slate-50 dark:bg-slate-800 text-[10px] font-bold border border-slate-200 dark:border-slate-700 rounded-lg">JSON</button>
                    </div>
                    
                    <button 
                      onClick={applyOptimizedAsInput}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[10px] font-extrabold text-[#518231] rounded-lg"
                    >
                      Apply Casing Crossover
                    </button>
                  </div>
                )}
              </div>

              {/* Quality & Cost Estimation Statistics */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <BarChart3 size={13} className="text-[#518231]" /> Prompt Specifications
                </h4>

                <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Characters</span>
                    <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{stats.characters}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Words count</span>
                    <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{stats.words}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 col-span-2 border-t border-slate-100 dark:border-slate-800/80 pt-2 mt-1">
                    <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Token Weight Estimates</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">GPT Tokens</span>
                    <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{stats.tokens.gpt}</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-slate-500 font-medium">Claude Tokens</span>
                    <span className="font-bold font-mono text-slate-800 dark:text-slate-200">{stats.tokens.claude}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-t border-slate-100 dark:border-slate-800/80 pt-2 mt-1 col-span-2">
                    <span className="text-slate-500 font-medium">Estimated Run Cost</span>
                    <span className="font-bold font-mono text-slate-800 dark:text-slate-250">${stats.estimatedCost.toFixed(5)}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab 2 Content: Prompt Scoring Quality Gauges */}
          {activeAnalysisTab === "scores" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* Overall Radial Score Gauge */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Award size={13} className="text-[#518231]" /> Prompt Quality Rating
                  </h4>
                  {scores.overall > 0 && (
                    <button 
                      onClick={handleCopyReport}
                      className="text-[9px] font-bold text-slate-400 hover:text-slate-850 uppercase flex items-center gap-1"
                    >
                      <Copy size={10} /> Copy Report
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-5">
                  <div className="relative flex items-center justify-center shrink-0 w-24 h-24 rounded-full border-4 border-slate-100 dark:border-slate-800">
                    <div className="text-center">
                      <div className="text-2xl font-black text-slate-800 dark:text-white font-mono">{scores.overall}%</div>
                      <div className="text-[8px] font-bold text-slate-400 uppercase leading-none mt-0.5">Readiness</div>
                    </div>
                  </div>

                  <div className="flex-1 space-y-1 text-xs">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      scores.overall >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-950/45 dark:text-green-400' :
                      scores.overall >= 50 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/45 dark:text-amber-400' :
                      'bg-red-100 text-red-700 dark:bg-red-950/45 dark:text-red-400'
                    }`}>
                      {scores.overall >= 80 ? 'Production Ready' : scores.overall >= 50 ? 'Needs Improvement' : 'Lacks Context'}
                    </span>
                    
                    {improvementScore > 0 && (
                      <div className="text-[10px] font-bold text-[#518231] mt-1 flex items-center gap-1">
                        <TrendingUp size={11} /> +{improvementScore}% score after optimization!
                      </div>
                    )}

                    <p className="text-slate-500 leading-normal mt-1">Grade details prompt structure, clarity, task instructions, and variable context checks.</p>
                  </div>
                </div>
              </div>

              {/* Sub-scores breakdown */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Sliders size={13} className="text-[#518231]" /> Sub-metrics Breakdown
                </h4>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>Task Clarity (action verbs)</span>
                      <span className="font-bold font-mono text-slate-850 dark:text-slate-200">{scores.clarity}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${scores.clarity}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>Vocabulary Detail (word count weights)</span>
                      <span className="font-bold font-mono text-slate-850 dark:text-slate-200">{scores.detail}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${scores.detail}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>Contextual Constraints (limits/guides)</span>
                      <span className="font-bold font-mono text-slate-850 dark:text-slate-200">{scores.context}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full" style={{ width: `${scores.context}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>Role Identity (assigned persona)</span>
                      <span className="font-bold font-mono text-slate-850 dark:text-slate-200">{scores.instruction}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-teal-500 h-full rounded-full" style={{ width: `${scores.instruction}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                      <span>Structural Formatting (markdown/tags)</span>
                      <span className="font-bold font-mono text-slate-850 dark:text-slate-200">{scores.structure}%</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${scores.structure}%` }} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Tab 3 Content: saved transformations list */}
          {activeAnalysisTab === "history" && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              {/* History log widgets */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <History size={13} className="text-slate-400" /> Recent Optimizations
                  </h4>
                  {history.length > 0 && (
                    <button 
                      onClick={() => { setHistory([]); localStorage.removeItem("prompt-helper-history"); showToast("History cleared."); }}
                      className="text-[10px] font-bold text-red-500 uppercase hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <div className="space-y-3.5 max-h-[300px] overflow-y-auto custom-scrollbar">
                  {history.length > 0 ? (
                    history.map((log, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-950/45 border border-slate-150 dark:border-slate-850 rounded-xl space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-[#518231]/10 text-[#518231] text-[9px] font-extrabold uppercase">
                            {log.model}
                          </span>
                          <span className="text-[9px] text-slate-400 font-bold font-mono">
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate" title={log.original}>Original: "{log.original}"</p>
                        <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate" title={log.optimized}>Optimized: "{log.optimized}"</p>
                        
                        <div className="flex gap-2 pt-1 border-t border-slate-150 dark:border-slate-850">
                          <button 
                            onClick={() => { updateText(log.original); setOptimizedPrompt(log.optimized); showToast("Restored prompt states!"); }}
                            className="text-[9px] font-extrabold text-[#518231] uppercase tracking-wider hover:underline"
                          >
                            Restore
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-xs text-slate-400 italic">No recent prompt optimizations logged.</div>
                  )}
                </div>
              </div>

            </div>
          )}

          {/* Quick instructions / Examples panel */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
              <HelpCircle size={13} className="text-[#518231]" /> Try Prompt Ideas
            </h4>
            
            <div className="space-y-2">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => { updateText(ex); showToast("Loaded example task."); }}
                  className="w-full p-2.5 bg-slate-55 dark:bg-slate-950/30 border border-slate-100 dark:border-slate-850 hover:border-[#518231] dark:hover:border-[#518231] text-xs text-left text-slate-600 dark:text-slate-350 rounded-xl transition-all truncate"
                >
                  {ex}
                </button>
              ))}
            </div>
          </div>

          {/* SEO meta audit checklist widget */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
              <Award size={13} className="text-[#518231]" /> Prompt Quality Audit
            </h4>
            
            <div className="space-y-2 text-xs leading-normal">
              <div className="flex gap-2">
                {scores.overall >= 80 ? (
                  <CheckCircle2 size={15} className="text-green-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />
                )}
                <div className="text-slate-500">
                  {scores.overall >= 80 
                    ? "Excellent! Prompt contains a role play, clear instructions, output rules, and detailed context parameters."
                    : "Add role-play (e.g. 'Act as a...'), explicit constraints, and formatting directives to raise prompt readiness."
                  }
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
