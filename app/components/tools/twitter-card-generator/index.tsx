"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Eye, Code, Copy, Download, Check, Trash2,
  History, Save, Upload, X, AlertTriangle, CheckCircle2,
  FileJson, Info, Zap, Monitor, Smartphone, Play,
  AppWindow, Image as ImageIcon, AtSign, Globe, BarChart3
} from 'lucide-react';

// --- Types & Interfaces ---

interface TwitterCardState {
  cardType: 'summary' | 'summary_large_image' | 'app' | 'player';
  title: string;
  description: string;
  url: string;
  image: string;
  imageAlt: string;
  site: string;
  creator: string;
  // App card fields
  appNameIphone: string;
  appIdIphone: string;
  appNameIpad: string;
  appIdIpad: string;
  appNameGooglePlay: string;
  appIdGooglePlay: string;
  // Player card fields
  playerUrl: string;
  playerWidth: string;
  playerHeight: string;
  // OG sync
  syncOg: boolean;
}

interface HistoryItem {
  id: string;
  name: string;
  timestamp: string;
  state: TwitterCardState;
}

// --- Initial State ---

const initialState: TwitterCardState = {
  cardType: "summary_large_image",
  title: "",
  description: "",
  url: "",
  image: "",
  imageAlt: "",
  site: "",
  creator: "",
  appNameIphone: "",
  appIdIphone: "",
  appNameIpad: "",
  appIdIpad: "",
  appNameGooglePlay: "",
  appIdGooglePlay: "",
  playerUrl: "",
  playerWidth: "",
  playerHeight: "",
  syncOg: false
};

// --- Presets ---

const presets: Record<string, { label: string; state: Partial<TwitterCardState> }> = {
  blog: {
    label: "Blog Post",
    state: {
      cardType: "summary_large_image",
      title: "10 Proven Strategies to Improve Your React Performance",
      description: "Discover advanced optimization techniques including code splitting, memoization, and virtual DOM best practices for faster React apps.",
      url: "https://devblog.io/react-performance-tips",
      image: "https://placehold.co/1200x628/0f172a/38bdf8?text=React+Performance",
      imageAlt: "React Performance Optimization Guide Cover Image",
      site: "@devblog",
      creator: "@janedoedev",
      syncOg: true
    }
  },
  product: {
    label: "Product Page",
    state: {
      cardType: "summary_large_image",
      title: "Zenith Pro Mechanical Keyboard - Hot-Swappable Switches",
      description: "Premium gasket-mounted mechanical keyboard with aluminum case, RGB backlighting, and customizable tactile switches. Ships worldwide.",
      url: "https://ergokeys.com/products/zenith-pro",
      image: "https://placehold.co/1200x628/1e293b/f59e0b?text=Zenith+Pro+Keyboard",
      imageAlt: "Zenith Pro Mechanical Keyboard Product Showcase",
      site: "@ergokeys",
      creator: "@ergokeys",
      syncOg: true
    }
  },
  saas: {
    label: "SaaS Landing Page",
    state: {
      cardType: "summary_large_image",
      title: "MetricsFlow - Real-Time Analytics Dashboard for Teams",
      description: "Instantly analyze and optimize your key business metrics with our privacy-first, real-time analytics platform. Start free today.",
      url: "https://metricsflow.com",
      image: "https://placehold.co/1200x628/020617/10b981?text=MetricsFlow+Analytics",
      imageAlt: "MetricsFlow Analytics Dashboard Interface Preview",
      site: "@metricsflow",
      creator: "@metricsflow",
      syncOg: true
    }
  },
  portfolio: {
    label: "Portfolio",
    state: {
      cardType: "summary",
      title: "Alex Rivera | Creative Frontend Developer & Designer",
      description: "Explore my portfolio of interactive WebGL experiences, responsive web apps, and custom design systems built with modern frameworks.",
      url: "https://alexrivera.dev",
      image: "https://placehold.co/400x400/1e1b4b/a855f7?text=Alex+Rivera",
      imageAlt: "Alex Rivera Developer Portfolio Avatar",
      site: "@alexriveradev",
      creator: "@alexriveradev",
      syncOg: false
    }
  },
  news: {
    label: "News Article",
    state: {
      cardType: "summary_large_image",
      title: "Tech Summit 2026: Quantum Computing Breakthroughs Unveiled",
      description: "Leading research teams demonstrate commercial quantum processors capable of solving optimization problems 1000x faster than classical machines.",
      url: "https://technewsdaily.com/quantum-summit-2026",
      image: "https://placehold.co/1200x628/030712/f43f5e?text=Quantum+Summit+2026",
      imageAlt: "Tech Summit 2026 Quantum Computing Feature Image",
      site: "@technewsdaily",
      creator: "@sarahconnor_tech",
      syncOg: true
    }
  }
};

// --- Helper Functions ---

const getDomainName = (urlString: string): string => {
  if (!urlString) return "example.com";
  try {
    const parsed = new URL(urlString);
    return parsed.hostname;
  } catch {
    return urlString.replace(/^https?:\/\//i, '').split('/')[0] || "example.com";
  }
};

const getCharCountColor = (len: number, warnAt: number, maxAt: number): string => {
  if (len === 0) return 'text-slate-400';
  if (len < warnAt) return 'text-green-600';
  if (len <= maxAt) return 'text-amber-500';
  return 'text-red-500';
};

// --- Component ---

export function TwitterCardGeneratorTool() {
  const [fields, setFields] = useState<TwitterCardState>(initialState);
  const [activeTab, setActiveTab] = useState<"editor" | "preview" | "code" | "analyzer">("editor");
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [copied, setCopied] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [showSaveModal, setShowSaveModal] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedFields = localStorage.getItem("twitter_card_generator_state");
    if (savedFields) {
      try {
        setFields(JSON.parse(savedFields));
      } catch (e) {
        console.error("Failed to parse saved twitter card state", e);
      }
    }
    const savedHistory = localStorage.getItem("twitter_card_generator_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse twitter card history", e);
      }
    }
  }, []);

  // Persist fields to localStorage
  const saveCurrentToLocal = (updatedFields: TwitterCardState) => {
    localStorage.setItem("twitter_card_generator_state", JSON.stringify(updatedFields));
  };

  const handleFieldChange = (key: keyof TwitterCardState, value: string | boolean) => {
    const updated = { ...fields, [key]: value };
    setFields(updated);
    saveCurrentToLocal(updated);
  };

  const showTemporarySuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  // Reset
  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all fields?")) {
      setFields(initialState);
      saveCurrentToLocal(initialState);
      showTemporarySuccess("All fields cleared successfully.");
    }
  };

  // Preset loading
  const handlePresetSelect = (presetKey: string) => {
    const preset = presets[presetKey];
    if (preset) {
      const merged = { ...initialState, ...preset.state };
      setFields(merged);
      saveCurrentToLocal(merged);
      showTemporarySuccess(`Loaded &quot;${preset.label}&quot; preset.`);
    }
  };

  // --- Session History ---
  const handleSaveState = useCallback((id: string, timestamp: string) => {
    if (!saveName.trim()) {
      alert("Please provide a name for this session.");
      return;
    }
    const newItem: HistoryItem = {
      id,
      name: saveName.trim(),
      timestamp,
      state: fields
    };
    const updatedHistory = [newItem, ...history].slice(0, 30);
    setHistory(updatedHistory);
    localStorage.setItem("twitter_card_generator_history", JSON.stringify(updatedHistory));
    setSaveName("");
    setShowSaveModal(false);
    showTemporarySuccess(`Saved session &quot;${newItem.name}&quot;.`);
  }, [saveName, fields, history]);

  const loadHistoryItem = (item: HistoryItem) => {
    setFields(item.state);
    saveCurrentToLocal(item.state);
    showTemporarySuccess(`Restored session &quot;${item.name}&quot;.`);
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter(item => item.id !== id);
    setHistory(updated);
    localStorage.setItem("twitter_card_generator_history", JSON.stringify(updated));
    showTemporarySuccess("Session deleted.");
  };

  // --- JSON Export / Import ---
  const handleJsonExport = () => {
    const stateJson = JSON.stringify(fields, null, 2);
    const element = document.createElement("a");
    const file = new Blob([stateJson], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `twitter-card-config-${fields.site || "export"}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
    showTemporarySuccess("Configuration JSON exported.");
  };

  const handleJsonImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed === "object" && "cardType" in parsed) {
          const merged = { ...initialState, ...parsed };
          setFields(merged);
          saveCurrentToLocal(merged);
          showTemporarySuccess("JSON Configuration imported successfully.");
        } else {
          alert("Invalid configuration file. Missing required fields.");
        }
      } catch {
        alert("Invalid JSON file. Please upload a valid configuration.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  // --- Generated Meta Tags ---
  const generatedHtml = useMemo(() => {
    const lines: string[] = [];

    lines.push(`<!-- Twitter Card Meta Tags -->`);
    lines.push(`<meta name="twitter:card" content="${fields.cardType}" />`);

    if (fields.title) {
      lines.push(`<meta name="twitter:title" content="${fields.title.replace(/"/g, '&quot;')}" />`);
    }
    if (fields.description) {
      lines.push(`<meta name="twitter:description" content="${fields.description.replace(/"/g, '&quot;')}" />`);
    }
    if (fields.image) {
      lines.push(`<meta name="twitter:image" content="${fields.image}" />`);
    }
    if (fields.imageAlt) {
      lines.push(`<meta name="twitter:image:alt" content="${fields.imageAlt.replace(/"/g, '&quot;')}" />`);
    }
    if (fields.site) {
      lines.push(`<meta name="twitter:site" content="${fields.site}" />`);
    }
    if (fields.creator) {
      lines.push(`<meta name="twitter:creator" content="${fields.creator}" />`);
    }

    // App card specific
    if (fields.cardType === "app") {
      if (fields.appNameIphone) lines.push(`<meta name="twitter:app:name:iphone" content="${fields.appNameIphone.replace(/"/g, '&quot;')}" />`);
      if (fields.appIdIphone) lines.push(`<meta name="twitter:app:id:iphone" content="${fields.appIdIphone}" />`);
      if (fields.appNameIpad) lines.push(`<meta name="twitter:app:name:ipad" content="${fields.appNameIpad.replace(/"/g, '&quot;')}" />`);
      if (fields.appIdIpad) lines.push(`<meta name="twitter:app:id:ipad" content="${fields.appIdIpad}" />`);
      if (fields.appNameGooglePlay) lines.push(`<meta name="twitter:app:name:googleplay" content="${fields.appNameGooglePlay.replace(/"/g, '&quot;')}" />`);
      if (fields.appIdGooglePlay) lines.push(`<meta name="twitter:app:id:googleplay" content="${fields.appIdGooglePlay}" />`);
    }

    // Player card specific
    if (fields.cardType === "player") {
      if (fields.playerUrl) lines.push(`<meta name="twitter:player" content="${fields.playerUrl}" />`);
      if (fields.playerWidth) lines.push(`<meta name="twitter:player:width" content="${fields.playerWidth}" />`);
      if (fields.playerHeight) lines.push(`<meta name="twitter:player:height" content="${fields.playerHeight}" />`);
    }

    // OG sync tags
    if (fields.syncOg) {
      lines.push(``);
      lines.push(`<!-- Open Graph Sync Tags -->`);
      if (fields.title) lines.push(`<meta property="og:title" content="${fields.title.replace(/"/g, '&quot;')}" />`);
      if (fields.description) lines.push(`<meta property="og:description" content="${fields.description.replace(/"/g, '&quot;')}" />`);
      if (fields.url) lines.push(`<meta property="og:url" content="${fields.url}" />`);
      if (fields.image) lines.push(`<meta property="og:image" content="${fields.image}" />`);
      if (fields.imageAlt) lines.push(`<meta property="og:image:alt" content="${fields.imageAlt.replace(/"/g, '&quot;')}" />`);
      lines.push(`<meta property="og:type" content="website" />`);
    }

    return lines.join("\n");
  }, [fields]);

  // --- Copy & Download ---
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setSuccessMsg("Meta tags copied to clipboard.");
    setTimeout(() => {
      setCopied(false);
      setSuccessMsg(null);
    }, 3000);
  }, [generatedHtml]);

  const handleCopySingleTag = useCallback((tag: string) => {
    navigator.clipboard.writeText(tag);
    setSuccessMsg("Tag copied to clipboard.");
    setTimeout(() => setSuccessMsg(null), 3000);
  }, []);

  const handleDownload = useCallback(() => {
    const element = document.createElement("a");
    const file = new Blob([generatedHtml], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "twitter-card-meta-tags.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
    showTemporarySuccess("Meta tags downloaded as .txt file.");
  }, [generatedHtml]);

  // --- Quality Score & Validation ---
  const qualityAnalysis = useMemo(() => {
    let score = 0;
    const checklist: { type: 'success' | 'warn' | 'error'; msg: string; tip?: string }[] = [];

    // Title (20 pts)
    if (fields.title.trim()) {
      const len = fields.title.length;
      if (len <= 70) {
        score += 20;
        checklist.push({ type: 'success', msg: `Title is well-optimized (${len}/70 chars).` });
      } else {
        score += 10;
        checklist.push({
          type: 'warn',
          msg: `Title is ${len} chars, exceeds 70 char limit.`,
          tip: "Twitter/X will truncate titles longer than 70 characters in the card display."
        });
      }
    } else {
      checklist.push({ type: 'error', msg: "Missing twitter:title. Add a descriptive headline." });
    }

    // Description (20 pts)
    if (fields.description.trim()) {
      const len = fields.description.length;
      if (len <= 200) {
        score += 20;
        checklist.push({ type: 'success', msg: `Description length is good (${len}/200 chars).` });
      } else {
        score += 10;
        checklist.push({
          type: 'warn',
          msg: `Description is ${len} chars, exceeds 200 char limit.`,
          tip: "Long descriptions get truncated in the Twitter/X card preview."
        });
      }
    } else {
      checklist.push({ type: 'error', msg: "Missing twitter:description. Provide a compelling summary." });
    }

    // Image (15 pts)
    if (fields.image.trim()) {
      if (fields.image.startsWith("http://") || fields.image.startsWith("https://")) {
        score += 15;
        checklist.push({ type: 'success', msg: "Image URL is valid and absolute." });
      } else {
        score += 5;
        checklist.push({
          type: 'warn',
          msg: "Image URL should be an absolute URL starting with https://.",
          tip: "Twitter requires absolute image URLs for card rendering."
        });
      }
    } else {
      if (fields.cardType !== "app") {
        checklist.push({ type: 'error', msg: "Missing twitter:image. Cards without images have lower engagement." });
      } else {
        score += 10;
        checklist.push({ type: 'warn', msg: "Image is optional for App cards but recommended." });
      }
    }

    // Site username (10 pts)
    if (fields.site.trim()) {
      if (fields.site.startsWith("@")) {
        score += 10;
        checklist.push({ type: 'success', msg: `Site username configured: ${fields.site}` });
      } else {
        score += 5;
        checklist.push({
          type: 'warn',
          msg: "Site username should start with @ symbol.",
          tip: "Use format @username for proper Twitter/X attribution."
        });
      }
    } else {
      checklist.push({ type: 'warn', msg: "Missing twitter:site. Add your brand @username for attribution." });
    }

    // Creator username (10 pts)
    if (fields.creator.trim()) {
      if (fields.creator.startsWith("@")) {
        score += 10;
        checklist.push({ type: 'success', msg: `Creator username configured: ${fields.creator}` });
      } else {
        score += 5;
        checklist.push({
          type: 'warn',
          msg: "Creator username should start with @ symbol."
        });
      }
    } else {
      checklist.push({ type: 'warn', msg: "Missing twitter:creator. Add the content author @username." });
    }

    // URL (10 pts)
    if (fields.url.trim()) {
      if (fields.url.startsWith("http://") || fields.url.startsWith("https://")) {
        score += 10;
        checklist.push({ type: 'success', msg: "Page URL is valid and absolute." });
      } else {
        score += 3;
        checklist.push({ type: 'error', msg: "URL must start with http:// or https://." });
      }
    } else {
      checklist.push({ type: 'warn', msg: "Missing page URL. Provide the canonical URL for proper indexing." });
    }

    // Image alt text (5 pts)
    if (fields.imageAlt.trim()) {
      score += 5;
      checklist.push({ type: 'success', msg: "Image alt text provided for accessibility." });
    } else if (fields.image.trim()) {
      checklist.push({
        type: 'warn',
        msg: "Missing twitter:image:alt. Add descriptive alt text for accessibility.",
        tip: "Screen readers and assistive technologies use alt text to describe images."
      });
    }

    // Card-type specific fields (10 pts)
    if (fields.cardType === "app") {
      if (fields.appIdIphone || fields.appIdGooglePlay) {
        score += 10;
        checklist.push({ type: 'success', msg: "App store ID configured for App card." });
      } else {
        checklist.push({ type: 'error', msg: "App card requires at least one app store ID (iPhone or Google Play)." });
      }
    } else if (fields.cardType === "player") {
      if (fields.playerUrl && fields.playerWidth && fields.playerHeight) {
        score += 10;
        checklist.push({ type: 'success', msg: "Player card fields fully configured." });
      } else {
        checklist.push({ type: 'error', msg: "Player card requires player URL, width, and height." });
      }
    } else {
      score += 10;
    }

    return { score: Math.min(score, 100), checklist };
  }, [fields]);

  // --- Card type options ---
  const cardTypeOptions = [
    { id: "summary" as const, label: "Summary", icon: ImageIcon, desc: "Small square image with text" },
    { id: "summary_large_image" as const, label: "Summary Large Image", icon: Monitor, desc: "Large banner image on top" },
    { id: "app" as const, label: "App Card", icon: AppWindow, desc: "App store download layout" },
    { id: "player" as const, label: "Player Card", icon: Play, desc: "Embedded video/audio player" }
  ];

  // --- Render ---
  return (
    <div className="space-y-8 text-slate-800 dark:text-slate-200">

      {/* PRESETS PANEL */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
        <h3 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Zap size={14} className="text-[#518231]" /> Quick Preset Templates
        </h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(presets).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => handlePresetSelect(key)}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors border border-slate-200/40 dark:border-slate-700/40 cursor-pointer"
              aria-label={`Load ${preset.label} preset`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* UTILITIES HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Live Workspace</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={handleJsonExport}
            className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Export JSON Configuration"
            aria-label="Export JSON Configuration"
          >
            <FileJson size={16} /> Export JSON
          </button>

          <label className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 text-xs font-semibold" title="Import JSON Config">
            <Upload size={16} /> Import
            <input type="file" accept=".json" className="hidden" onChange={handleJsonImport} />
          </label>

          <button
            onClick={() => setShowHistory(!showHistory)}
            className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-semibold ${showHistory ? 'bg-green-50 text-[#518231] dark:bg-green-950/30' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'}`}
            aria-label="Toggle session history"
          >
            <History size={16} /> Sessions ({history.length})
          </button>

          <button
            onClick={() => setShowSaveModal(true)}
            className="p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Save current config"
            aria-label="Save current session"
          >
            <Save size={16} /> Save Session
          </button>

          <button
            onClick={handleReset}
            className="p-2 text-red-600 hover:bg-red-50/50 dark:text-red-400 dark:hover:bg-red-950/20 rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
            aria-label="Clear all fields"
          >
            <Trash2 size={16} /> Clear All
          </button>
        </div>
      </div>

      {/* SAVE MODAL */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-sm w-full p-6 rounded-3xl shadow-xl animate-in scale-in duration-150">
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-2">Save Twitter Card Session</h3>
            <p className="text-xs text-slate-400 mb-4">Store this configuration locally to load it later.</p>
            <input
              type="text"
              value={saveName}
              onChange={(e) => setSaveName(e.target.value)}
              placeholder="e.g. Product Launch Card v2"
              className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none mb-4 text-slate-800 dark:text-white"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSaveState(Date.now().toString(), new Date().toLocaleString());
                }
              }}
              aria-label="Session name"
            />
            <div className="flex justify-end gap-2 text-xs font-bold">
              <button
                onClick={() => setShowSaveModal(false)}
                className="px-4 py-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveState(Date.now().toString(), new Date().toLocaleString())}
                className="px-4 py-2 bg-[#518231] text-white hover:bg-[#406827] rounded-xl shadow-sm"
              >
                Save State
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HISTORY MANAGER */}
      {showHistory && (
        <div className="bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-inner relative animate-in slide-in-from-top-2">
          <button onClick={() => setShowHistory(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600" aria-label="Close history panel"><X size={16} /></button>
          <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 mb-3 flex items-center gap-2"><History size={16} className="text-[#518231]" /> Saved Sessions</h3>
          {history.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No saved sessions yet. Save your configurations to recall them quickly.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => loadHistoryItem(item)}
                  className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-[#518231] cursor-pointer flex flex-col justify-between group transition-all"
                >
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200 truncate pr-4">{item.name}</h4>
                    <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{item.state.title || "Untitled"}</p>
                  </div>
                  <button
                    onClick={(e) => deleteHistoryItem(item.id, e)}
                    className="self-end mt-2 p-1 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete session"
                    aria-label="Delete session"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUCCESS TOAST */}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-900/30 dark:text-green-300 p-3 rounded-2xl flex items-center gap-2 text-xs font-semibold shadow-sm animate-in fade-in">
          <CheckCircle2 size={16} className="text-green-500" /> {successMsg}
        </div>
      )}

      {/* MAIN TAB NAVIGATION */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
        <div className="flex bg-slate-50 dark:bg-slate-800/40 border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none">
          {[
            { id: "editor" as const, label: "Editor", icon: Globe },
            { id: "preview" as const, label: "Preview", icon: Eye },
            { id: "code" as const, label: "Code", icon: Code },
            { id: "analyzer" as const, label: "Analyzer", icon: BarChart3 }
          ].map(tab => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-4 text-xs font-bold border-b-2 flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${activeTab === tab.id ? 'border-[#518231] text-[#518231] bg-white dark:bg-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                aria-label={`Switch to ${tab.label} tab`}
              >
                <TabIcon size={14} /> {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6">

          {/* ===== TAB 1: EDITOR ===== */}
          {activeTab === "editor" && (
            <div className="space-y-6">

              {/* Card Type Selector */}
              <div>
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-3">Card Type</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {cardTypeOptions.map(opt => {
                    const OptIcon = opt.icon;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleFieldChange("cardType", opt.id)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer ${
                          fields.cardType === opt.id
                            ? 'border-[#518231] bg-green-50/50 dark:bg-green-950/10'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-950/30'
                        }`}
                        aria-label={`Select ${opt.label} card type`}
                      >
                        <div className={`p-2 rounded-xl shrink-0 ${fields.cardType === opt.id ? 'bg-[#518231] text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'}`}>
                          <OptIcon size={16} />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{opt.label}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{opt.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Core Fields */}
              <div className="space-y-4">
                <h4 className="font-bold text-sm text-[#518231] flex items-center gap-1.5"><Info size={14} /> Core Card Fields</h4>

                {/* Title */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">twitter:title</label>
                    <span className={`text-[10px] font-mono font-bold ${getCharCountColor(fields.title.length, 60, 70)}`}>
                      {fields.title.length} / 70
                    </span>
                  </div>
                  <input
                    type="text"
                    value={fields.title}
                    onChange={(e) => handleFieldChange("title", e.target.value)}
                    placeholder="e.g. My Awesome Product - Brand Name"
                    className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                    aria-label="Twitter card title"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Recommended: under 70 characters for optimal display.</p>
                </div>

                {/* Description */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">twitter:description</label>
                    <span className={`text-[10px] font-mono font-bold ${getCharCountColor(fields.description.length, 160, 200)}`}>
                      {fields.description.length} / 200
                    </span>
                  </div>
                  <textarea
                    value={fields.description}
                    onChange={(e) => handleFieldChange("description", e.target.value)}
                    placeholder="Brief description summarizing your content..."
                    rows={3}
                    className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                    aria-label="Twitter card description"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Recommended: under 200 characters. Shorter is better for mobile.</p>
                </div>

                {/* URL */}
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">Page URL</label>
                  <input
                    type="url"
                    value={fields.url}
                    onChange={(e) => handleFieldChange("url", e.target.value)}
                    placeholder="https://example.com/page-path"
                    className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                    aria-label="Page URL"
                  />
                </div>

                {/* Image + Image Alt */}
                {fields.cardType !== "app" && (
                  <>
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">twitter:image (URL)</label>
                      <input
                        type="url"
                        value={fields.image}
                        onChange={(e) => handleFieldChange("image", e.target.value)}
                        placeholder="https://example.com/assets/card-image.png"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                        aria-label="Twitter card image URL"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        {fields.cardType === "summary"
                          ? "Summary cards use a 1:1 square image. Minimum 144x144, max 4096x4096."
                          : "Large image cards use a 2:1 ratio. Recommended 1200x628 pixels."}
                      </p>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">twitter:image:alt</label>
                      <input
                        type="text"
                        value={fields.imageAlt}
                        onChange={(e) => handleFieldChange("imageAlt", e.target.value)}
                        placeholder="Descriptive alt text for the card image"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                        aria-label="Image alt text"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">Accessible description for screen readers. Max 420 characters.</p>
                    </div>
                  </>
                )}

                {/* Site & Creator */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                      <AtSign size={12} /> twitter:site
                    </label>
                    <input
                      type="text"
                      value={fields.site}
                      onChange={(e) => handleFieldChange("site", e.target.value)}
                      placeholder="@yourbrand"
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                      aria-label="Twitter site username"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Website&apos;s Twitter @username.</p>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                      <AtSign size={12} /> twitter:creator
                    </label>
                    <input
                      type="text"
                      value={fields.creator}
                      onChange={(e) => handleFieldChange("creator", e.target.value)}
                      placeholder="@authorname"
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                      aria-label="Twitter creator username"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Content creator&apos;s @username.</p>
                  </div>
                </div>

                {/* OG Sync Toggle */}
                <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={fields.syncOg}
                      onChange={(e) => handleFieldChange("syncOg", e.target.checked)}
                      className="w-4 h-4 accent-[#518231] cursor-pointer"
                      aria-label="Sync Open Graph tags"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Sync Open Graph Tags</span>
                      <p className="text-[10px] text-slate-400 mt-0.5">Also generate matching og:title, og:description, og:image, og:url tags for Facebook/LinkedIn compatibility.</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* APP CARD FIELDS */}
              {fields.cardType === "app" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="font-bold text-sm text-[#518231] flex items-center gap-1.5"><AppWindow size={14} /> App Card Configuration</h4>

                  <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
                    <h5 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">iPhone App</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">App Name (iPhone)</label>
                        <input
                          type="text"
                          value={fields.appNameIphone}
                          onChange={(e) => handleFieldChange("appNameIphone", e.target.value)}
                          placeholder="e.g. MyApp"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                          aria-label="iPhone app name"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">App ID (iPhone)</label>
                        <input
                          type="text"
                          value={fields.appIdIphone}
                          onChange={(e) => handleFieldChange("appIdIphone", e.target.value)}
                          placeholder="e.g. 307234931"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none font-mono"
                          aria-label="iPhone app ID"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
                    <h5 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">iPad App</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">App Name (iPad)</label>
                        <input
                          type="text"
                          value={fields.appNameIpad}
                          onChange={(e) => handleFieldChange("appNameIpad", e.target.value)}
                          placeholder="e.g. MyApp HD"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                          aria-label="iPad app name"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">App ID (iPad)</label>
                        <input
                          type="text"
                          value={fields.appIdIpad}
                          onChange={(e) => handleFieldChange("appIdIpad", e.target.value)}
                          placeholder="e.g. 307234932"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none font-mono"
                          aria-label="iPad app ID"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
                    <h5 className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">Google Play App</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">App Name (Google Play)</label>
                        <input
                          type="text"
                          value={fields.appNameGooglePlay}
                          onChange={(e) => handleFieldChange("appNameGooglePlay", e.target.value)}
                          placeholder="e.g. MyApp for Android"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none"
                          aria-label="Google Play app name"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">App ID (Google Play)</label>
                        <input
                          type="text"
                          value={fields.appIdGooglePlay}
                          onChange={(e) => handleFieldChange("appIdGooglePlay", e.target.value)}
                          placeholder="e.g. com.example.myapp"
                          className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none font-mono"
                          aria-label="Google Play app ID"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PLAYER CARD FIELDS */}
              {fields.cardType === "player" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="font-bold text-sm text-[#518231] flex items-center gap-1.5"><Play size={14} /> Player Card Configuration</h4>

                  <div>
                    <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block mb-1">twitter:player (HTTPS iframe URL)</label>
                    <input
                      type="url"
                      value={fields.playerUrl}
                      onChange={(e) => handleFieldChange("playerUrl", e.target.value)}
                      placeholder="https://example.com/embed/video-player"
                      className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#518231] dark:text-white transition-colors"
                      aria-label="Player iframe URL"
                    />
                    <p className="text-[10px] text-slate-400 mt-1">Must be HTTPS. This URL will be loaded inside an iframe on Twitter/X.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Player Width (px)</label>
                      <input
                        type="number"
                        value={fields.playerWidth}
                        onChange={(e) => handleFieldChange("playerWidth", e.target.value)}
                        placeholder="1280"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none font-mono"
                        aria-label="Player width"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">Player Height (px)</label>
                      <input
                        type="number"
                        value={fields.playerHeight}
                        onChange={(e) => handleFieldChange("playerHeight", e.target.value)}
                        placeholder="720"
                        className="w-full bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none font-mono"
                        aria-label="Player height"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ===== TAB 2: PREVIEW ===== */}
          {activeTab === "preview" && (
            <div className="space-y-6">

              {/* Preview Mode Toggle */}
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><Eye size={14} /> Live Card Preview</h3>
                <div className="flex bg-slate-200 dark:bg-slate-700 rounded-lg p-0.5">
                  {[
                    { id: "desktop" as const, label: "Desktop", icon: Monitor },
                    { id: "mobile" as const, label: "Mobile", icon: Smartphone }
                  ].map(mode => {
                    const ModeIcon = mode.icon;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setPreviewMode(mode.id)}
                        className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-colors flex items-center gap-1 ${previewMode === mode.id ? 'bg-white dark:bg-slate-800 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
                        aria-label={`${mode.label} preview`}
                      >
                        <ModeIcon size={12} /> {mode.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Card Type Badge */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-full text-slate-600 dark:text-slate-400">
                  {fields.cardType.replace(/_/g, ' ').toUpperCase()}
                </span>
                {fields.syncOg && (
                  <span className="px-3 py-1 bg-green-50 dark:bg-green-950/20 text-xs font-bold rounded-full text-green-600 dark:text-green-400">
                    OG Sync ON
                  </span>
                )}
              </div>

              {/* Preview Canvas */}
              <div className="bg-slate-100/50 dark:bg-slate-950/40 rounded-2xl p-6 flex items-center justify-center min-h-64">

                {/* SUMMARY CARD PREVIEW */}
                {fields.cardType === "summary" && (
                  <div className={`bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm text-left ${previewMode === "mobile" ? "w-full max-w-xs" : "w-full max-w-sm"}`}>
                    {/* Header */}
                    <div className="p-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs dark:bg-white dark:text-black">X</div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{fields.site || "Brand"}</div>
                        <div className="text-[10px] text-slate-400">{fields.creator || "@username"}</div>
                      </div>
                    </div>
                    {/* Summary Card: small image right, text left */}
                    <div className="border border-slate-200 dark:border-slate-800 mx-3 mb-3 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-stretch h-[108px]">
                      <div className="p-3 flex-1 min-w-0 text-xs justify-center flex flex-col">
                        <span className="text-[9px] text-slate-400 truncate">{getDomainName(fields.url)}</span>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-2 mt-0.5 text-[11px]">{fields.title || "Your Card Title"}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{fields.description || "Enter a description to preview the card."}</p>
                      </div>
                      <div className="w-[108px] bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 border-l border-slate-200 dark:border-slate-800 overflow-hidden">
                        {fields.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={fields.image} alt="Summary card preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/144x144/f8fafc/64748b?text=Image"; }} />
                        ) : (
                          <div className="text-slate-400 dark:text-slate-600 flex flex-col items-center gap-1">
                            <ImageIcon size={20} />
                            <span className="text-[8px] uppercase font-bold">No Image</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* SUMMARY LARGE IMAGE PREVIEW */}
                {fields.cardType === "summary_large_image" && (
                  <div className={`bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm text-left ${previewMode === "mobile" ? "w-full max-w-xs" : "w-full max-w-sm"}`}>
                    <div className="p-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs dark:bg-white dark:text-black">X</div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{fields.site || "Brand"}</div>
                        <div className="text-[10px] text-slate-400">{fields.creator || "@username"}</div>
                      </div>
                    </div>
                    <div className="border border-slate-200 dark:border-slate-800 mx-3 mb-3 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950">
                      {/* Large banner image */}
                      <div className="relative aspect-[2/1] bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                        {fields.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={fields.image} alt="Large image card preview" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/1200x600/f8fafc/64748b?text=Image+Preview"; }} />
                        ) : (
                          <div className="text-slate-400 dark:text-slate-600 flex flex-col items-center gap-1 p-4">
                            <ImageIcon size={28} />
                            <span className="text-[9px] uppercase font-bold tracking-wider">No Preview Image</span>
                          </div>
                        )}
                      </div>
                      {/* Text below */}
                      <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                        <span className="text-[10px] text-slate-400">{getDomainName(fields.url)}</span>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1 mt-0.5">{fields.title || "Your Card Title"}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{fields.description || "Enter a description to preview the card."}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* APP CARD PREVIEW */}
                {fields.cardType === "app" && (
                  <div className={`bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm text-left ${previewMode === "mobile" ? "w-full max-w-xs" : "w-full max-w-sm"}`}>
                    <div className="p-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs dark:bg-white dark:text-black">X</div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{fields.site || "Brand"}</div>
                        <div className="text-[10px] text-slate-400">{fields.creator || "@username"}</div>
                      </div>
                    </div>
                    <div className="border border-slate-200 dark:border-slate-800 mx-3 mb-3 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 p-4">
                      <div className="flex items-start gap-3">
                        {/* App icon placeholder */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#518231] to-[#406827] flex items-center justify-center text-white shrink-0 shadow-md">
                          <AppWindow size={28} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-slate-800 dark:text-slate-200 line-clamp-1">{fields.appNameIphone || fields.title || "App Name"}</h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">{fields.description || "App description preview"}</p>
                          <div className="mt-2">
                            <span className="inline-block px-3 py-1 bg-[#518231] text-white text-[10px] font-bold rounded-full">
                              View in App Store
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* PLAYER CARD PREVIEW */}
                {fields.cardType === "player" && (
                  <div className={`bg-white dark:bg-black border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm text-left ${previewMode === "mobile" ? "w-full max-w-xs" : "w-full max-w-sm"}`}>
                    <div className="p-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs dark:bg-white dark:text-black">X</div>
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{fields.site || "Brand"}</div>
                        <div className="text-[10px] text-slate-400">{fields.creator || "@username"}</div>
                      </div>
                    </div>
                    <div className="border border-slate-200 dark:border-slate-800 mx-3 mb-3 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950">
                      {/* Player placeholder */}
                      <div className="relative aspect-video bg-slate-900 flex items-center justify-center">
                        {fields.image ? (
                          <div className="relative w-full h-full">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={fields.image} alt="Player card preview" className="w-full h-full object-cover opacity-60" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                <Play size={24} className="text-slate-900 ml-1" />
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="text-slate-500 flex flex-col items-center gap-2">
                            <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center">
                              <Play size={24} className="text-slate-400 ml-1" />
                            </div>
                            <span className="text-[9px] uppercase font-bold tracking-wider">Video Player Preview</span>
                          </div>
                        )}
                      </div>
                      <div className="p-3 border-t border-slate-200 dark:border-slate-800 text-xs">
                        <span className="text-[10px] text-slate-400">{getDomainName(fields.url)}</span>
                        <h4 className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1 mt-0.5">{fields.title || "Video Title"}</h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{fields.description || "Video description preview."}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Preview Info */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <Info size={14} className="shrink-0 mt-0.5 text-slate-400" />
                <p>This is an approximation of how your Twitter/X card will render. Actual rendering may vary slightly depending on the platform version and user&apos;s device settings.</p>
              </div>
            </div>
          )}

          {/* ===== TAB 3: CODE ===== */}
          {activeTab === "code" && (
            <div className="space-y-4">

              {/* Code Actions Header */}
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><Code size={14} /> Generated Meta Tags</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3 py-1.5 bg-[#518231] hover:bg-[#406827] text-white text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                    aria-label="Copy all meta tags"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />} {copied ? "Copied!" : "Copy All"}
                  </button>
                  <button
                    onClick={handleDownload}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                    aria-label="Download meta tags as text file"
                  >
                    <Download size={12} /> Download .txt
                  </button>
                </div>
              </div>

              {/* Tag Count */}
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded-full text-slate-600 dark:text-slate-400 font-mono">
                  {generatedHtml.split("\n").filter(l => l.startsWith("<meta")).length} tags
                </span>
                {fields.syncOg && (
                  <span className="px-3 py-1 bg-green-50 dark:bg-green-950/20 text-xs font-bold rounded-full text-green-600 dark:text-green-400">
                    + OG sync tags
                  </span>
                )}
              </div>

              {/* Code Block */}
              <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
                <div className="p-4 overflow-x-auto text-[11px] font-mono leading-relaxed max-h-[500px] select-all whitespace-pre text-left">
                  {generatedHtml.split("\n").map((line, idx) => {
                    const isComment = line.startsWith("<!--");
                    const isEmpty = line.trim() === "";
                    return (
                      <div key={idx} className="flex items-start group hover:bg-slate-900/50 -mx-2 px-2 rounded">
                        <span className="text-slate-600 w-6 text-right mr-3 select-none shrink-0 text-[10px] leading-relaxed">{idx + 1}</span>
                        <span className={`flex-1 ${isComment ? 'text-slate-500' : isEmpty ? '' : 'text-emerald-400'}`}>
                          {line}
                        </span>
                        {!isComment && !isEmpty && (
                          <button
                            onClick={() => handleCopySingleTag(line)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 p-0.5 text-slate-500 hover:text-white shrink-0"
                            title="Copy this tag"
                            aria-label="Copy this tag"
                          >
                            <Copy size={10} />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Usage tip */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2">
                <Info size={14} className="shrink-0 mt-0.5 text-slate-400" />
                <p>Place these meta tags inside the <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded text-[10px] font-mono">&lt;head&gt;</code> section of your HTML document. Twitter/X crawls these tags when a URL is shared.</p>
              </div>
            </div>
          )}

          {/* ===== TAB 4: ANALYZER ===== */}
          {activeTab === "analyzer" && (
            <div className="space-y-6">

              {/* Score Display */}
              <div className="flex items-center gap-6">
                {/* Radial Score */}
                <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="7" fill="transparent" />
                    <circle
                      cx="48" cy="48" r="40"
                      className="stroke-[#518231] transition-all duration-500"
                      strokeWidth="7"
                      fill="transparent"
                      strokeDasharray={251.3}
                      strokeDashoffset={251.3 - (251.3 * qualityAnalysis.score) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute font-extrabold text-xl text-slate-800 dark:text-slate-100 font-mono">{qualityAnalysis.score}%</span>
                </div>

                <div>
                  <div className="font-bold text-sm text-slate-800 dark:text-white">
                    {qualityAnalysis.score === 100 ? '🥇 Perfect Card Configuration' : qualityAnalysis.score >= 80 ? '🎯 Great Card Setup' : qualityAnalysis.score >= 50 ? '⚠️ Needs Improvement' : '❌ Incomplete Card'}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Real-time quality assessment based on Twitter/X card best practices, field presence, and content length.</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-950 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#518231] h-full rounded-full transition-all duration-300"
                  style={{ width: `${qualityAnalysis.score}%` }}
                ></div>
              </div>

              {/* Checklist */}
              <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
                {qualityAnalysis.checklist.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs flex gap-2 items-start ${
                      item.type === 'success'
                        ? 'bg-green-50/50 border-green-200 text-green-800 dark:bg-green-950/10 dark:border-green-900/30 dark:text-green-300'
                        : item.type === 'warn'
                        ? 'bg-amber-50/50 border-amber-200 text-amber-800 dark:bg-amber-950/10 dark:border-amber-900/30 dark:text-amber-300'
                        : 'bg-red-50/50 border-red-200 text-red-800 dark:bg-red-950/10 dark:border-red-900/30 dark:text-red-300'
                    }`}
                  >
                    {item.type === 'success' ? (
                      <CheckCircle2 size={15} className="shrink-0 text-green-500 mt-0.5" />
                    ) : item.type === 'warn' ? (
                      <AlertTriangle size={15} className="shrink-0 text-amber-500 mt-0.5" />
                    ) : (
                      <X size={15} className="shrink-0 text-red-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-semibold">{item.msg}</p>
                      {item.tip && <p className="text-[10px] opacity-80 mt-0.5">{item.tip}</p>}
                    </div>
                  </div>
                ))}
              </div>

              {/* Recommendations Summary */}
              <div className="bg-slate-50 dark:bg-slate-950/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-xs text-slate-700 dark:text-slate-300 mb-2">Quick Recommendations</h4>
                <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                  {!fields.title.trim() && <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>Add a compelling title to your card.</li>}
                  {!fields.description.trim() && <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>Write a concise description for better engagement.</li>}
                  {!fields.image.trim() && fields.cardType !== "app" && <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>Add an image URL for visual impact.</li>}
                  {!fields.site.trim() && <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>Set the @site username for brand attribution.</li>}
                  {!fields.creator.trim() && <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0"></span>Set the @creator for author credit.</li>}
                  {!fields.syncOg && <li className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0"></span>Consider enabling OG sync for Facebook/LinkedIn compatibility.</li>}
                  {fields.title.trim() && fields.description.trim() && fields.image.trim() && fields.site.trim() && fields.creator.trim() && (
                    <li className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-semibold"><CheckCircle2 size={12} className="shrink-0" />All core fields are populated. Great job!</li>
                  )}
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
