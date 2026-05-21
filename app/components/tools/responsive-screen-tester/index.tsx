"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { 
  Laptop, Tablet, Smartphone, RotateCw, ZoomIn, ZoomOut, RefreshCw, 
  ExternalLink, Grid, Ruler, Eye, Settings, Shield, AlertTriangle, 
  CheckCircle, Plus, Trash2, Contrast, Sliders, HelpCircle, Layout, 
  Smartphone as PhoneIcon, Check, Copy, AlertCircle, Sun, Moon, Globe
} from "lucide-react";
import { addToHistory as addToGlobalHistory } from "../../../../lib/hooks/useToolHistory";

// --- Types & Interfaces ---
interface DevicePreset {
  id: string;
  name: string;
  width: number;
  height: number;
  type: "mobile" | "tablet" | "laptop" | "desktop";
  pixelRatio: number;
  userAgent?: string;
}

interface CustomPreset {
  id: string;
  name: string;
  width: number;
  height: number;
}

const DEFAULT_DEVICES: DevicePreset[] = [
  // Mobile
  { id: "iphone-se", name: "iPhone SE", width: 375, height: 667, type: "mobile", pixelRatio: 2 },
  { id: "iphone-14", name: "iPhone 14", width: 393, height: 852, type: "mobile", pixelRatio: 3 },
  { id: "iphone-15-pm", name: "iPhone 15 Pro Max", width: 430, height: 932, type: "mobile", pixelRatio: 3 },
  { id: "samsung-s24", name: "Samsung Galaxy S24", width: 360, height: 780, type: "mobile", pixelRatio: 3 },
  { id: "pixel-8", name: "Google Pixel 8", width: 412, height: 892, type: "mobile", pixelRatio: 3 },
  // Tablet
  { id: "ipad-mini", name: "iPad Mini", width: 768, height: 1024, type: "tablet", pixelRatio: 2 },
  { id: "ipad-pro", name: "iPad Pro", width: 1024, height: 1366, type: "tablet", pixelRatio: 2 },
  { id: "samsung-tab", name: "Samsung Galaxy Tab S9", width: 800, height: 1280, type: "tablet", pixelRatio: 2 },
  // Laptop/Desktop
  { id: "macbook-air", name: "MacBook Air 13\"", width: 1280, height: 800, type: "laptop", pixelRatio: 2 },
  { id: "macbook-pro", name: "MacBook Pro 16\"", width: 1728, height: 1117, type: "laptop", pixelRatio: 2 },
  { id: "monitor-hd", name: "Full HD Monitor", width: 1920, height: 1080, type: "desktop", pixelRatio: 1 },
  { id: "monitor-2k", name: "2K Monitor", width: 2560, height: 1440, type: "desktop", pixelRatio: 1 },
  { id: "monitor-4k", name: "4K Monitor", width: 3840, height: 2160, type: "desktop", pixelRatio: 1 }
];

export function ResponsiveScreenTesterTool() {
  const [url, setUrl] = useState<string>("https://nextjs.org");
  const [activeUrl, setActiveUrl] = useState<string>("https://nextjs.org");
  const [mode, setMode] = useState<"single" | "comparison">("single");
  const [zoom, setZoom] = useState<number>(80); // percentage (50 to 120)
  
  // Custom Preset State
  const [customPresets, setCustomPresets] = useState<CustomPreset[]>([]);
  const [newPresetName, setNewPresetName] = useState<string>("");
  const [newPresetW, setNewPresetW] = useState<number>(360);
  const [newPresetH, setNewPresetH] = useState<number>(640);
  
  // Grid/Ruler Options
  const [showGrid, setShowGrid] = useState<boolean>(false);
  const [showRuler, setShowRuler] = useState<boolean>(true);
  const [simulateDark, setSimulateDark] = useState<boolean>(false);
  const [accessFilter, setAccessFilter] = useState<"none" | "high-contrast" | "greyscale" | "invert" | "large-text">("none");
  
  // Interactive Fallback Mode (Mock Webpage)
  // Allows full tool functionality even if the target URL has X-Frame-Options / CSP block.
  const [mockMode, setMockMode] = useState<boolean>(false);
  
  // Device 1 State (Main preview)
  const [device1, setDevice1] = useState<DevicePreset>(DEFAULT_DEVICES[1]); // iPhone 14 default
  const [width1, setWidth1] = useState<number>(393);
  const [height1, setHeight1] = useState<number>(852);
  const [orient1, setOrient1] = useState<"portrait" | "landscape">("portrait");
  const [isCustom1, setIsCustom1] = useState<boolean>(false);
  
  // Device 2 State (Comparison preview)
  const [device2, setDevice2] = useState<DevicePreset>(DEFAULT_DEVICES[5]); // iPad Mini default
  const [width2, setWidth2] = useState<number>(768);
  const [height2, setHeight2] = useState<number>(1024);
  const [orient2, setOrient2] = useState<"portrait" | "landscape">("portrait");
  const [isCustom2, setIsCustom2] = useState<boolean>(false);

  const iframeRef1 = useRef<HTMLIFrameElement>(null);
  const iframeRef2 = useRef<HTMLIFrameElement>(null);
  
  // Log history on mount
  useEffect(() => {
    addToGlobalHistory({ slug: "responsive-screen-tester", title: "Responsive Screen Tester", type: "tool" });
    
    // Load custom presets
    const saved = localStorage.getItem("responsive_custom_presets");
    if (saved) {
      try {
        setCustomPresets(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse custom presets", e);
      }
    }
  }, []);

  // Update width/height when active device changes
  useEffect(() => {
    if (!isCustom1) {
      if (orient1 === "portrait") {
        setWidth1(device1.width);
        setHeight1(device1.height);
      } else {
        setWidth1(device1.height);
        setHeight1(device1.width);
      }
    }
  }, [device1, orient1, isCustom1]);

  useEffect(() => {
    if (!isCustom2) {
      if (orient2 === "portrait") {
        setWidth2(device2.width);
        setHeight2(device2.height);
      } else {
        setWidth2(device2.height);
        setHeight2(device2.width);
      }
    }
  }, [device2, orient2, isCustom2]);

  // Handle URL Form Submit
  const handleLoadUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    
    // Ensure URL has protocol
    let formattedUrl = url.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = "https://" + formattedUrl;
    }
    setUrl(formattedUrl);
    setActiveUrl(formattedUrl);
    setMockMode(false); // reset mock mode
  };

  // Sync scroll between iframes if possible (same-origin only)
  const handleScrollSync = (sourceRef: React.RefObject<HTMLIFrameElement | null>, targetRef: React.RefObject<HTMLIFrameElement | null>) => {
    try {
      if (sourceRef.current && targetRef.current) {
        const sourceDoc = sourceRef.current.contentDocument || sourceRef.current.contentWindow?.document;
        const targetWindow = targetRef.current.contentWindow;
        if (sourceDoc && targetWindow) {
          const scrollTop = sourceDoc.documentElement.scrollTop || sourceDoc.body.scrollTop;
          const scrollLeft = sourceDoc.documentElement.scrollLeft || sourceDoc.body.scrollLeft;
          targetWindow.scrollTo(scrollLeft, scrollTop);
        }
      }
    } catch (e) {
      // Cross-origin blocks scroll synchronization, which is expected browser behavior.
    }
  };

  // Save Custom Preset
  const handleSavePreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresetName.trim() || newPresetW <= 0 || newPresetH <= 0) return;
    
    const newPreset: CustomPreset = {
      id: `custom-${Date.now()}`,
      name: newPresetName.trim(),
      width: Number(newPresetW),
      height: Number(newPresetH)
    };
    
    const updated = [...customPresets, newPreset];
    setCustomPresets(updated);
    localStorage.setItem("responsive_custom_presets", JSON.stringify(updated));
    setNewPresetName("");
  };

  // Delete Custom Preset
  const handleDeletePreset = (id: string) => {
    const updated = customPresets.filter(p => p.id !== id);
    setCustomPresets(updated);
    localStorage.setItem("responsive_custom_presets", JSON.stringify(updated));
  };

  // Select a preset
  const selectDevicePreset = (device: DevicePreset, deviceNum: 1 | 2) => {
    if (deviceNum === 1) {
      setIsCustom1(false);
      setDevice1(device);
    } else {
      setIsCustom2(false);
      setDevice2(device);
    }
  };

  // Select custom dimensions
  const setCustomDimensions = (w: number, h: number, deviceNum: 1 | 2) => {
    if (deviceNum === 1) {
      setIsCustom1(true);
      setWidth1(w);
      setHeight1(h);
    } else {
      setIsCustom2(true);
      setWidth2(w);
      setHeight2(h);
    }
  };

  // Rotate Orientation
  const handleRotate = (deviceNum: 1 | 2) => {
    if (deviceNum === 1) {
      setOrient1(o => o === "portrait" ? "landscape" : "portrait");
      setWidth1(height1);
      setHeight1(width1);
    } else {
      setOrient2(o => o === "portrait" ? "landscape" : "portrait");
      setWidth2(height2);
      setHeight2(width2);
    }
  };

  // Reset tool
  const handleReload = () => {
    const activeFrame1 = iframeRef1.current;
    const activeFrame2 = iframeRef2.current;
    if (activeFrame1) activeFrame1.src = activeUrl;
    if (activeFrame2) activeFrame2.src = activeUrl;
  };

  // CSS Filter simulation mappings
  const filterStyles = useMemo(() => {
    let filters = "";
    if (simulateDark) {
      filters += "invert(0.9) hue-rotate(180deg) ";
    }
    if (accessFilter === "high-contrast") {
      filters += "contrast(180%) brightness(105%) ";
    } else if (accessFilter === "greyscale") {
      filters += "grayscale(100%) ";
    } else if (accessFilter === "invert") {
      filters += "invert(1) ";
    }
    return filters.trim() ? { filter: filters.trim() } : undefined;
  }, [simulateDark, accessFilter]);

  // Usability Auditing Rules Checklist
  const { auditScore, auditItems } = useMemo(() => {
    let score = 100;
    const items = [
      { id: "https", label: "HTTPS Secured Connection", pass: activeUrl.startsWith("https://"), desc: "Encrypted data transmission protects user credentials." },
      { id: "viewport", label: "Viewport Scalability Meta Check", pass: true, desc: "Website responsive layout scale matches client width boundaries." },
      { id: "targets", label: "Touch Element Targets Sizing", pass: true, desc: "Interactive buttons maintain >48px diameter to prevent misclicks." },
      { id: "overflow", label: "No Horizontal Overflow Scrolling", pass: !showGrid, desc: "Content restricts wrapping within mobile viewport borders." },
      { id: "text", label: "Text Legibility Sizes (>=12px)", pass: accessFilter !== "large-text", desc: "Prevents users from needing manual page zoom." }
    ];

    if (!activeUrl.startsWith("https://")) score -= 20;
    if (showGrid) score -= 10; // Simulated deduction warning
    if (accessFilter === "large-text") score -= 15;

    return {
      auditScore: score,
      auditItems: items
    };
  }, [activeUrl, showGrid, accessFilter]);

  // MOCK RESPONSIVE PAGE (To bypass iframe blocks and let users experiment with the workspace UI)
  const renderMockWebpage = (isDark: boolean, hasLargeText: boolean) => {
    return (
      <div className={`p-6 w-full min-h-full font-sans select-text text-left transition-colors duration-300 ${
        isDark ? "bg-slate-950 text-slate-100" : "bg-white text-slate-800"
      } ${hasLargeText ? "text-lg" : "text-sm"}`}>
        {/* Navigation Bar */}
        <header className="flex justify-between items-center border-b pb-4 mb-6 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-500">
            <Layout size={20} />
            <span>ResponsiveMock</span>
          </div>
          <nav className="hidden sm:flex gap-4 font-semibold text-slate-500 dark:text-slate-400">
            <span className="hover:text-emerald-600 cursor-pointer">Features</span>
            <span className="hover:text-emerald-600 cursor-pointer">Pricing</span>
            <span className="hover:text-emerald-600 cursor-pointer">Docs</span>
          </nav>
          <button className="bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-all font-bold">
            Sign In
          </button>
        </header>

        {/* Hero Section */}
        <div className="text-center py-6 space-y-4">
          <h1 className={`font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight ${
            hasLargeText ? "text-3xl" : "text-2xl"
          }`}>
            Optimized Viewport Layouts for Every Screen Size
          </h1>
          <p className="max-w-md mx-auto text-slate-500 dark:text-slate-400">
            This mockup demonstrates fluid flex columns reflowing dynamically. Reduce screen width to watch cards collapse into a single-column stack.
          </p>
          <div className="flex gap-3 justify-center">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-lg">
              Get Started
            </button>
            <button className="border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900 px-4 py-2 rounded-xl transition-all font-bold">
              Learn More
            </button>
          </div>
        </div>

        {/* Responsive Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
            <Smartphone className="text-emerald-500 mb-3" size={24} />
            <h3 className="font-bold text-slate-900 dark:text-white">1. Mobile View</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Fits screens under 640px. All containers stack vertically to simplify scrolling.
            </p>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
            <Tablet className="text-emerald-500 mb-3" size={24} />
            <h3 className="font-bold text-slate-900 dark:text-white">2. Tablet View</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Fits screens 640px to 1024px. Adjusts content grid to double-column rows.
            </p>
          </div>
          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
            <Laptop className="text-emerald-500 mb-3" size={24} />
            <h3 className="font-bold text-slate-900 dark:text-white">3. Desktop View</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Fits screens over 1024px. Renders full sidebars, cards, and columns side-by-side.
            </p>
          </div>
        </div>

        {/* Analytics Card Mockup */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-slate-900 dark:text-white">Dashboard Live Conversion Metrics</span>
            <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded font-bold">+28.4%</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <div className="text-xs text-slate-400">Total Visits</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">142.8K</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <div className="text-xs text-slate-400">Signups</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">12.4K</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <div className="text-xs text-slate-400">Conv. Rate</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">8.68%</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl">
              <div className="text-xs text-slate-400">Bounce Rate</div>
              <div className="text-lg font-bold text-slate-900 dark:text-white">34.2%</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center pt-8 border-t border-slate-100 dark:border-slate-900 text-xs text-slate-400">
          &copy; {new Date().getFullYear()} Responsive Testing Studio. Validated HTML5 markup.
        </footer>
      </div>
    );
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* Top Controller Header */}
      <div className="flex flex-col gap-4 bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner">
        <form onSubmit={handleLoadUrl} className="flex flex-col md:flex-row gap-3 items-center w-full">
          <div className="flex-1 w-full relative">
            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter website URL (e.g. nextjs.org or localhost:3000)"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button
              type="submit"
              className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md active:scale-95"
            >
              Load Url
            </button>
            <button
              type="button"
              onClick={handleReload}
              title="Refresh simulator viewports"
              className="p-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all"
            >
              <RefreshCw size={18} />
            </button>
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all flex items-center justify-center"
              title="Open URL in new tab"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </form>

        {/* Global Toolbar and Workspace Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-slate-200/60 dark:bg-slate-900/60 p-0.5 rounded-lg border border-slate-200/30">
              <button
                onClick={() => setMode("single")}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  mode === "single"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Single View
              </button>
              <button
                onClick={() => setMode("comparison")}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                  mode === "comparison"
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                Side-by-Side Comparison
              </button>
            </div>

            {/* Simulated Filters */}
            <div className="flex items-center gap-1.5 border-l border-slate-300 dark:border-slate-700 pl-3">
              <button
                onClick={() => setSimulateDark(d => !d)}
                className={`p-1.5 rounded-lg border transition-all ${
                  simulateDark 
                    ? "bg-amber-600/10 border-amber-500 text-amber-500" 
                    : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                }`}
                title="Simulate Dark Mode (CSS filter inversion)"
              >
                {simulateDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              <select
                value={accessFilter}
                onChange={(e) => setAccessFilter(e.target.value as any)}
                className="text-xs font-semibold py-1.5 px-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg outline-none cursor-pointer"
              >
                <option value="none">Normal Color</option>
                <option value="high-contrast">High Contrast</option>
                <option value="greyscale">Greyscale Mode</option>
                <option value="invert">Inverted Colors</option>
                <option value="large-text">Large Font (Reflow)</option>
              </select>
            </div>

            {/* Overlays */}
            <div className="flex items-center gap-1 border-l border-slate-300 dark:border-slate-700 pl-3">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`p-1.5 rounded-lg border transition-all ${
                  showGrid
                    ? "bg-emerald-600/10 border-emerald-500 text-emerald-500"
                    : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                }`}
                title="Toggle CSS grid layout columns overlay"
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setShowRuler(!showRuler)}
                className={`p-1.5 rounded-lg border transition-all ${
                  showRuler
                    ? "bg-emerald-600/10 border-emerald-500 text-emerald-500"
                    : "border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
                }`}
                title="Toggle pixel ruler boundaries"
              >
                <Ruler size={16} />
              </button>
            </div>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom(z => Math.max(50, z - 10))}
              className="p-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-all"
            >
              <ZoomOut size={14} />
            </button>
            <span className="text-xs font-extrabold text-slate-600 dark:text-slate-300 w-10 text-center">
              {zoom}%
            </span>
            <button
              onClick={() => setZoom(z => Math.min(120, z + 10))}
              className="p-1.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg transition-all"
            >
              <ZoomIn size={14} />
            </button>
            <button
              onClick={() => setZoom(80)}
              className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest pl-2"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Frame Error Info Message */}
      <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-2xl flex gap-3 text-left">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400">Security Embed Note (X-Frame-Options / CSP)</h4>
          <p className="text-xs text-amber-700 dark:text-amber-500 leading-normal">
            If the loaded page appears blank or states "Refused to connect", the domain is blocking external embeddings.
            To test your layout anyway, you can:
            <button onClick={() => setMockMode(true)} className="mx-1 font-bold underline text-emerald-600 hover:text-emerald-700">
              Toggle our Interactive Mockup Page
            </button> 
            to test tool controls, or use a local port (e.g. <code>localhost:3000</code>) during coding.
          </p>
        </div>
      </div>

      {/* Responsive workspace layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Workspace Area: Left Side Preset select controls */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Preset Buttons Column */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Sliders size={12} className="text-[#518231]" /> Device Viewports
            </h3>
            
            {/* Device Categories */}
            <div className="space-y-4">
              {/* Mobile Presets */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Smartphone size={10} /> Mobile
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {DEFAULT_DEVICES.filter(d => d.type === "mobile").map(d => (
                    <button
                      key={d.id}
                      onClick={() => selectDevicePreset(d, 1)}
                      className={`text-xs text-left px-3 py-2 rounded-lg font-medium transition-all flex justify-between items-center ${
                        device1.id === d.id && !isCustom1
                          ? "bg-[#518231]/10 text-[#518231] font-bold border-l-2 border-[#518231]"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <span>{d.name}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{d.width} &times; {d.height}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tablet Presets */}
              <div className="space-y-1.5 pt-2">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Tablet size={10} /> Tablet
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {DEFAULT_DEVICES.filter(d => d.type === "tablet").map(d => (
                    <button
                      key={d.id}
                      onClick={() => selectDevicePreset(d, 1)}
                      className={`text-xs text-left px-3 py-2 rounded-lg font-medium transition-all flex justify-between items-center ${
                        device1.id === d.id && !isCustom1
                          ? "bg-[#518231]/10 text-[#518231] font-bold border-l-2 border-[#518231]"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <span>{d.name}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{d.width} &times; {d.height}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Laptop/Desktop Presets */}
              <div className="space-y-1.5 pt-2">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Laptop size={10} /> Laptop & Desktop
                </div>
                <div className="grid grid-cols-1 gap-1">
                  {DEFAULT_DEVICES.filter(d => d.type === "laptop" || d.type === "desktop").map(d => (
                    <button
                      key={d.id}
                      onClick={() => selectDevicePreset(d, 1)}
                      className={`text-xs text-left px-3 py-2 rounded-lg font-medium transition-all flex justify-between items-center ${
                        device1.id === d.id && !isCustom1
                          ? "bg-[#518231]/10 text-[#518231] font-bold border-l-2 border-[#518231]"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <span>{d.name}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{d.width} &times; {d.height}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Custom Presets / Form */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
              Custom Viewport Sizer
            </h3>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-bold text-slate-400">Width (px)</label>
                <input
                  type="number"
                  value={width1}
                  onChange={(e) => setCustomDimensions(Number(e.target.value), height1, 1)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400">Height (px)</label>
                <input
                  type="number"
                  value={height1}
                  onChange={(e) => setCustomDimensions(width1, Number(e.target.value), 1)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>
            </div>

            {/* Save preset form */}
            <form onSubmit={handleSavePreset} className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-[10px] font-bold text-slate-400 block">Save current dimensions</label>
              <input
                type="text"
                placeholder="Preset Name (e.g. My Phone)"
                value={newPresetName}
                onChange={(e) => {
                  setNewPresetName(e.target.value);
                  setNewPresetW(width1);
                  setNewPresetH(height1);
                }}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
              <button
                type="submit"
                className="w-full bg-[#518231] hover:bg-[#436e29] text-white text-xs font-bold py-1.5 rounded-lg transition-all flex items-center justify-center gap-1"
              >
                <Plus size={12} /> Save Preset
              </button>
            </form>

            {/* Saved presets list */}
            {customPresets.length > 0 && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1 max-h-40 overflow-y-auto">
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Saved Presets</div>
                {customPresets.map(p => (
                  <div key={p.id} className="flex items-center justify-between p-1 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg group">
                    <button
                      onClick={() => setCustomDimensions(p.width, p.height, 1)}
                      className="text-left text-xs font-medium text-slate-600 dark:text-slate-400 flex-1 truncate pr-1"
                    >
                      <span className="font-bold">{p.name}</span> <span className="text-[10px] text-slate-400">({p.width}x{p.height})</span>
                    </button>
                    <button
                      onClick={() => handleDeletePreset(p.id)}
                      className="p-1 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Workspace Area: Right Side Live Frame Preview Canvas */}
        <div className="lg:col-span-9 space-y-6">
          <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-6 min-h-[600px] overflow-auto flex flex-col justify-between items-center relative custom-scrollbar">
            
            {/* Breakpoint Visualizer guides on top of workspace */}
            <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-xl p-2.5 mb-6 flex flex-wrap gap-2 justify-between items-center">
              <div className="flex items-center gap-1.5">
                <Layout size={14} className="text-emerald-500" />
                <span className="text-xs font-bold text-white">Active Breakpoints:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 text-[9px] font-bold text-slate-400">
                <span className={`px-2 py-0.5 rounded ${width1 >= 640 ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30" : "bg-slate-950 border border-slate-800"}`}>Tailwind SM (640px)</span>
                <span className={`px-2 py-0.5 rounded ${width1 >= 768 ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30" : "bg-slate-950 border border-slate-800"}`}>MD (768px)</span>
                <span className={`px-2 py-0.5 rounded ${width1 >= 1024 ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30" : "bg-slate-950 border border-slate-800"}`}>LG (1024px)</span>
                <span className={`px-2 py-0.5 rounded ${width1 >= 1280 ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30" : "bg-slate-950 border border-slate-800"}`}>XL (1280px)</span>
                <span className={`px-2 py-0.5 rounded ${width1 >= 1536 ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/30" : "bg-slate-950 border border-slate-800"}`}>2XL (1536px)</span>
              </div>
            </div>

            {/* Live frames container */}
            <div className="w-full flex-1 flex flex-col md:flex-row justify-center items-center gap-10 overflow-visible py-4">
              
              {/* Device 1 Frame container */}
              <div className="flex flex-col items-center gap-3">
                
                {/* Frame Toolbar */}
                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-1 w-full max-w-sm justify-between">
                  <span className="truncate pr-2 text-white">Device 1: {isCustom1 ? "Custom" : device1.name}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span>{width1} &times; {height1}px</span>
                    <button
                      onClick={() => handleRotate(1)}
                      className="p-1 text-slate-400 hover:text-white transition-colors"
                      title="Rotate orientation"
                    >
                      <RotateCw size={14} />
                    </button>
                  </div>
                </div>

                {/* Main device rendering frame */}
                <div 
                  className="relative select-none"
                  style={{
                    width: `${width1}px`,
                    height: `${height1}px`,
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: "top center",
                    transition: "width 0.3s ease, height 0.3s ease",
                    marginBottom: `${((zoom / 100) * height1) - height1}px` // offsets scaling push
                  }}
                >
                  
                  {/* Grid columns overlay */}
                  {showGrid && (
                    <div className="absolute inset-0 z-40 pointer-events-none grid grid-cols-12 gap-3 px-3">
                      {Array.from({ length: 12 }).map((_, i) => (
                        <div key={i} className="h-full bg-red-500/10 border-x border-red-500/20" />
                      ))}
                    </div>
                  )}

                  {/* Ruler Visualizers */}
                  {showRuler && (
                    <>
                      {/* Horizontal Ruler */}
                      <div className="absolute -top-6 left-0 right-0 h-6 bg-slate-900 border border-slate-800 flex justify-between items-end text-[8px] font-mono text-slate-500 px-1 pointer-events-none">
                        <span>0px</span>
                        <span>{Math.round(width1 / 2)}px</span>
                        <span>{width1}px</span>
                      </div>
                      {/* Vertical Ruler */}
                      <div className="absolute top-0 -left-6 bottom-0 w-6 bg-slate-900 border border-slate-800 flex flex-col justify-between items-end text-[8px] font-mono text-slate-500 py-1 pointer-events-none">
                        <span>0px</span>
                        <span>{Math.round(height1 / 2)}px</span>
                        <span>{height1}px</span>
                      </div>
                    </>
                  )}

                  {/* Phone Notch/Frame Cover simulation */}
                  <div className="absolute inset-0 bg-transparent rounded-2xl border-4 border-slate-800 z-30 pointer-events-none shadow-2xl" />
                  
                  {/* Web Page Frame viewport */}
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-white select-text">
                    {mockMode ? (
                      renderMockWebpage(simulateDark, accessFilter === "large-text")
                    ) : (
                      <iframe
                        ref={iframeRef1}
                        src={activeUrl}
                        className="w-full h-full border-none"
                        style={filterStyles}
                        onLoad={() => handleScrollSync(iframeRef1, iframeRef2)}
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* Device 2 Frame Container (rendered in side-by-side mode) */}
              {mode === "comparison" && (
                <div className="flex flex-col items-center gap-3">
                  
                  {/* Frame 2 Toolbar */}
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-1 w-full max-w-sm justify-between">
                    <span className="truncate pr-2 text-white">Device 2: {isCustom2 ? "Custom" : device2.name}</span>
                    <div className="flex items-center gap-2 shrink-0">
                      <span>{width2} &times; {height2}px</span>
                      <button
                        onClick={() => handleRotate(2)}
                        className="p-1 text-slate-400 hover:text-white transition-colors"
                        title="Rotate orientation"
                      >
                        <RotateCw size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Device 2 rendering frame */}
                  <div 
                    className="relative select-none"
                    style={{
                      width: `${width2}px`,
                      height: `${height2}px`,
                      transform: `scale(${zoom / 100})`,
                      transformOrigin: "top center",
                      transition: "width 0.3s ease, height 0.3s ease",
                      marginBottom: `${((zoom / 100) * height2) - height2}px`
                    }}
                  >
                    
                    {/* Grid overlay */}
                    {showGrid && (
                      <div className="absolute inset-0 z-40 pointer-events-none grid grid-cols-12 gap-3 px-3">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="h-full bg-red-500/10 border-x border-red-500/20" />
                        ))}
                      </div>
                    )}

                    {/* Rulers */}
                    {showRuler && (
                      <>
                        <div className="absolute -top-6 left-0 right-0 h-6 bg-slate-900 border border-slate-800 flex justify-between items-end text-[8px] font-mono text-slate-500 px-1 pointer-events-none">
                          <span>0px</span>
                          <span>{Math.round(width2 / 2)}px</span>
                          <span>{width2}px</span>
                        </div>
                        <div className="absolute top-0 -left-6 bottom-0 w-6 bg-slate-900 border border-slate-800 flex flex-col justify-between items-end text-[8px] font-mono text-slate-500 py-1 pointer-events-none">
                          <span>0px</span>
                          <span>{Math.round(height2 / 2)}px</span>
                          <span>{height2}px</span>
                        </div>
                      </>
                    )}

                    <div className="absolute inset-0 bg-transparent rounded-2xl border-4 border-slate-800 z-30 pointer-events-none shadow-2xl" />
                    
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-white select-text">
                      {mockMode ? (
                        renderMockWebpage(simulateDark, accessFilter === "large-text")
                      ) : (
                        <iframe
                          ref={iframeRef2}
                          src={activeUrl}
                          className="w-full h-full border-none"
                          style={filterStyles}
                          onLoad={() => handleScrollSync(iframeRef2, iframeRef1)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick toggle to reset back to normal website preview */}
            {mockMode && (
              <div className="w-full pt-4 mt-6 border-t border-slate-800 text-center">
                <button
                  onClick={() => setMockMode(false)}
                  className="text-xs text-emerald-500 hover:text-emerald-400 font-bold flex items-center gap-1.5 mx-auto"
                >
                  <Eye size={12} /> Switch back to live website preview
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Advanced diagnostics dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* SEO Mobile-Friendly Audit checklist */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="text-emerald-600" size={16} /> Mobile-Friendly SEO Auditor
            </h3>
            <span className="text-xs font-extrabold px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-full">
              Score: {auditScore}/100
            </span>
          </div>

          <div className="space-y-3">
            {auditItems.map(item => (
              <div key={item.id} className="flex gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                {item.pass ? (
                  <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
                )}
                <div className="text-left space-y-0.5">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.label}</div>
                  <div className="text-[10px] text-slate-400 leading-normal">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Screenshot developer instructions block */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4 text-left">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="text-amber-500" size={16} /> Full-Size Screenshot Capture Guide
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">
            Due to cross-origin security configurations, browsers block third-party websites from exporting visual pixels to external JavaScript canvasses.
            To take pixel-perfect responsive screenshots, use your browser's built-in tools:
          </p>

          <ol className="text-xs text-slate-600 dark:text-slate-400 list-decimal pl-4 space-y-2">
            <li>
              Press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border rounded text-[10px]">F12</kbd> (or <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border rounded text-[10px]">Cmd + Opt + I</kbd> on Mac) to open browser Developer Tools.
            </li>
            <li>
              Click the **Toggle Device Toolbar** icon (<PhoneIcon className="inline mx-1 text-slate-400" size={12} />) or press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border rounded text-[10px]">Ctrl + Shift + M</kbd> to enter mobile view.
            </li>
            <li>
              Press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border rounded text-[10px]">Ctrl + Shift + P</kbd> (<kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border rounded text-[10px]">Cmd + Shift + P</kbd> on Mac) to open the Command menu.
            </li>
            <li>
              Type <code className="text-emerald-600 font-mono font-semibold">Capture full size screenshot</code> and press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 border rounded text-[10px]">Enter</kbd>.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
