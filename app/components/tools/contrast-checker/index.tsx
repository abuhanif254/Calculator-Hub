"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  Copy, 
  Download, 
  RefreshCw, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Sparkles, 
  Sliders, 
  Contrast, 
  Palette, 
  Check, 
  ArrowRight, 
  Moon, 
  Sun, 
  Layers, 
  HelpCircle, 
  Code, 
  Undo, 
  Star, 
  Laptop, 
  Shuffle,
  Heart,
  Droplet,
  Info,
  ChevronDown,
  Eye,
  Type,
  FileText
} from "lucide-react";
import { Link } from "../../../../i18n/routing";
import { addToHistory as addToGlobalHistory } from "../../../../lib/hooks/useToolHistory";

// --- Types ---
interface ContrastState {
  fgColor: string; // Hex color e.g., #2563eb
  bgColor: string; // Hex color e.g., #ffffff
  fgOpacity: number; // 0 to 1
  bgOpacity: number; // 0 to 1
  fontSize: number; // 12 to 48px
  fontWeight: string; // "normal" | "bold"
}

interface SavedCheck {
  id: string;
  name: string;
  state: ContrastState;
  ratio: number;
  timestamp: number;
}

const DEFAULT_STATE: ContrastState = {
  fgColor: "#2563eb",
  bgColor: "#ffffff",
  fgOpacity: 1,
  bgOpacity: 1,
  fontSize: 16,
  fontWeight: "normal"
};

// --- Mathematical Color Compliance Formulas ---
function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function hexToRgb(hex: string) {
  let cleaned = hex.trim().replace(/^#/, '');
  if (cleaned.length === 3) {
    cleaned = cleaned[0] + cleaned[0] + cleaned[1] + cleaned[1] + cleaned[2] + cleaned[2];
  }
  const r = parseInt(cleaned.slice(0, 2), 16) || 0;
  const g = parseInt(cleaned.slice(2, 4), 16) || 0;
  const b = parseInt(cleaned.slice(4, 6), 16) || 0;
  return { r, g, b };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (val: number) => {
    const hex = clamp(val, 0, 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
  };
}

// Compute Relative Luminance under WCAG guidelines
function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Calculate Contrast Ratio
function getContrastRatio(fg: string, bg: string): number {
  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);

  const L1 = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
  const L2 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);

  return (lighter + 0.05) / (darker + 0.05);
}

// Smart algorithm: Corrects lightness to compliant ranges
function suggestCompliantColor(fg: string, bg: string, targetRatio: number): string {
  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  const fgHsl = rgbToHsl(fgRgb.r, fgRgb.g, fgRgb.b);
  const bgLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);

  const isDarkBackground = bgLuminance < 0.5;

  // Linear HSL search for conforming lightness
  let step = isDarkBackground ? 1 : -1;
  let testLightness = fgHsl.l;

  for (let i = 0; i < 100; i++) {
    testLightness = clamp(testLightness + step, 0, 100);
    const testRgb = hslToRgb(fgHsl.h, fgHsl.s, testLightness);
    const testHex = rgbToHex(testRgb.r, testRgb.g, testRgb.b);
    const currentRatio = getContrastRatio(testHex, bg);

    if (currentRatio >= targetRatio) {
      return testHex;
    }
  }

  // Fallback to absolute white or black if it fails to converge
  return isDarkBackground ? "#ffffff" : "#000000";
}

const checkerboardStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Crect width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' width='4' height='4' fill='%23e2e8f0'/%3E%3Crect y='4' width='4' height='4' fill='%23e2e8f0'/%3E%3C/svg%3E")`,
};

export function ContrastCheckerTool() {
  const [mounted, setMounted] = useState(false);

  // --- Core State ---
  const [state, setState] = useState<ContrastState>(DEFAULT_STATE);

  // Foreground Color Pickers Bindings
  const [fgHex, setFgHex] = useState("#2563eb");
  const [fgRInput, setFgRInput] = useState("37");
  const [fgGInput, setFgGInput] = useState("99");
  const [fgBInput, setFgBInput] = useState("235");
  const [fgHInput, setFgHInput] = useState("221");
  const [fgSInput, setFgSInput] = useState("83");
  const [fgLInput, setFgLInput] = useState("53");

  // Background Color Pickers Bindings
  const [bgHex, setBgHex] = useState("#ffffff");
  const [bgRInput, setBgRInput] = useState("255");
  const [bgGInput, setBgGInput] = useState("255");
  const [bgBInput, setBgBInput] = useState("255");
  const [bgHInput, setBgHInput] = useState("0");
  const [bgSInput, setBgSInput] = useState("0");
  const [bgLInput, setBgLInput] = useState("100");

  const [focusedColor, setFocusedColor] = useState<"fg" | "bg" | null>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Vision deficiency filter
  const [visionDeficiency, setVisionDeficiency] = useState<"normal" | "protanopia" | "deuteranopia" | "tritanopia" | "achromatopsia">("normal");

  // Visual widgets & export tabs
  const [previewTab, setPreviewTab] = useState<"typography" | "widgets" | "dashboard" | "pricing">("typography");
  const [codeTab, setCodeTab] = useState<"css" | "tailwind" | "scss" | "json">("css");
  
  const [copiedText, setCopiedText] = useState(false);
  const [history, setHistory] = useState<SavedCheck[]>([]);
  const [favorites, setFavorites] = useState<SavedCheck[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Setup on Mount
  useEffect(() => {
    setMounted(true);
    addToGlobalHistory({ slug: "contrast-checker", title: "Contrast Checker", type: "tool" });

    // Load LocalStorage Cache
    const savedHist = localStorage.getItem("nexus_contrast_history");
    if (savedHist) {
      try { setHistory(JSON.parse(savedHist)); } catch (e) {}
    }
    const savedFavs = localStorage.getItem("nexus_contrast_favorites");
    if (savedFavs) {
      try { setFavorites(JSON.parse(savedFavs)); } catch (e) {}
    }
  }, []);

  // Sync Input fields when state changes
  useEffect(() => {
    if (focusedColor === "fg" && focusedInput === "hex") return;
    setFgHex(state.fgColor);
    const rgb = hexToRgb(state.fgColor);
    setFgRInput(rgb.r.toString());
    setFgGInput(rgb.g.toString());
    setFgBInput(rgb.b.toString());

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setFgHInput(hsl.h.toString());
    setFgSInput(hsl.s.toString());
    setFgLInput(hsl.l.toString());
  }, [state.fgColor, focusedColor, focusedInput]);

  useEffect(() => {
    if (focusedColor === "bg" && focusedInput === "hex") return;
    setBgHex(state.bgColor);
    const rgb = hexToRgb(state.bgColor);
    setBgRInput(rgb.r.toString());
    setBgGInput(rgb.g.toString());
    setBgBInput(rgb.b.toString());

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setBgHInput(hsl.h.toString());
    setBgSInput(hsl.s.toString());
    setBgLInput(hsl.l.toString());
  }, [state.bgColor, focusedColor, focusedInput]);

  // Calculations
  const contrastRatio = useMemo(() => {
    return Number(getContrastRatio(state.fgColor, state.bgColor).toFixed(2));
  }, [state.fgColor, state.bgColor]);

  const wcagCompliance = useMemo(() => {
    // Normal Text standards: AA >= 4.5, AAA >= 7.0
    // Large Text standards: AA >= 3.0, AAA >= 4.5
    // UI Graphical elements: AA >= 3.0
    return {
      aaNormal: contrastRatio >= 4.5,
      aaaNormal: contrastRatio >= 7.0,
      aaLarge: contrastRatio >= 3.0,
      aaaLarge: contrastRatio >= 4.5,
      uiComponents: contrastRatio >= 3.0
    };
  }, [contrastRatio]);

  // Smart suggestions
  const suggestedAA = useMemo(() => {
    return suggestCompliantColor(state.fgColor, state.bgColor, 4.5);
  }, [state.fgColor, state.bgColor]);

  const suggestedAAA = useMemo(() => {
    return suggestCompliantColor(state.fgColor, state.bgColor, 7.0);
  }, [state.fgColor, state.bgColor]);

  // Color Swatches suggestions
  const suggestedBgAA = useMemo(() => {
    return suggestCompliantColor(state.bgColor, state.fgColor, 4.5);
  }, [state.fgColor, state.bgColor]);

  // Exporter snippet formats
  const cssVariablesSnippet = useMemo(() => {
    return `/* Accessible Color Variable Mappings */
:root {
  --accessible-foreground: ${state.fgColor};
  --accessible-background: ${state.bgColor};
  --contrast-ratio-verified: ${contrastRatio};
}`;
  }, [state, contrastRatio]);

  const tailwindClassesSnippet = useMemo(() => {
    return `text-[${state.fgColor}] bg-[${state.bgColor}]`;
  }, [state]);

  const scssSnippet = useMemo(() => {
    return `$a11y-fg: ${state.fgColor};
$a11y-bg: ${state.bgColor};
$contrast-ratio: ${contrastRatio};`;
  }, [state, contrastRatio]);

  const jsonSnippet = useMemo(() => {
    return JSON.stringify({
      contrastRatio,
      compliance: {
        wcag20: {
          aaNormal: wcagCompliance.aaNormal ? "PASS" : "FAIL",
          aaLarge: wcagCompliance.aaLarge ? "PASS" : "FAIL",
          aaaNormal: wcagCompliance.aaaNormal ? "PASS" : "FAIL",
          aaaLarge: wcagCompliance.aaaLarge ? "PASS" : "FAIL"
        },
        wcag21: {
          uiComponents: wcagCompliance.uiComponents ? "PASS" : "FAIL"
        }
      },
      tokens: {
        foreground: state.fgColor,
        background: state.bgColor
      }
    }, null, 2);
  }, [state, contrastRatio, wcagCompliance]);

  // --- Handlers ---
  const handleColorChange = (target: "fg" | "bg", hex: string) => {
    setFocusedColor(target);
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      setState(prev => ({
        ...prev,
        [target === "fg" ? "fgColor" : "bgColor"]: hex
      }));
      triggerSaveHistory();
    }
  };

  const handleRgbChange = (target: "fg" | "bg", channel: "r" | "g" | "b", valStr: string) => {
    setFocusedColor(target);
    const val = parseInt(valStr, 10);
    if (isNaN(val)) return;

    const baseHex = target === "fg" ? state.fgColor : state.bgColor;
    const rgb = hexToRgb(baseHex);
    const r = channel === "r" ? clamp(val, 0, 255) : rgb.r;
    const g = channel === "g" ? clamp(val, 0, 255) : rgb.g;
    const b = channel === "b" ? clamp(val, 0, 255) : rgb.b;

    const nextHex = rgbToHex(r, g, b);
    setState(prev => ({
      ...prev,
      [target === "fg" ? "fgColor" : "bgColor"]: nextHex
    }));
    triggerSaveHistory();
  };

  const handleHslChange = (target: "fg" | "bg", channel: "h" | "s" | "l", valStr: string) => {
    setFocusedColor(target);
    const val = parseInt(valStr, 10);
    if (isNaN(val)) return;

    const baseHex = target === "fg" ? state.fgColor : state.bgColor;
    const rgb = hexToRgb(baseHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const h = channel === "h" ? clamp(val, 0, 360) : hsl.h;
    const s = channel === "s" ? clamp(val, 0, 100) : hsl.s;
    const l = channel === "l" ? clamp(val, 0, 100) : hsl.l;

    const nextRgb = hslToRgb(h, s, l);
    const nextHex = rgbToHex(nextRgb.r, nextRgb.g, nextRgb.b);
    setState(prev => ({
      ...prev,
      [target === "fg" ? "fgColor" : "bgColor"]: nextHex
    }));
    triggerSaveHistory();
  };

  const handleEyeDropper = (target: "fg" | "bg") => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      const EyeDropperConstructor = (window as any).EyeDropper;
      const eyeDropper = new EyeDropperConstructor();
      eyeDropper.open()
        .then((result: { srgbHex: string }) => {
          handleColorChange(target, result.srgbHex);
        })
        .catch(() => {});
    }
  };

  const triggerSaveHistory = () => {
    const nextItem: SavedCheck = {
      id: Date.now().toString(),
      name: `Audit ${state.fgColor} / ${state.bgColor}`,
      state: { ...state },
      ratio: contrastRatio,
      timestamp: Date.now()
    };

    setHistory(prev => {
      const filtered = prev.filter(item => item.state.fgColor !== state.fgColor || item.state.bgColor !== state.bgColor);
      const updated = [nextItem, ...filtered].slice(0, 10);
      localStorage.setItem("nexus_contrast_history", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavorite = () => {
    const nextItem: SavedCheck = {
      id: Date.now().toString(),
      name: `Bookmarked Contrast`,
      state: { ...state },
      ratio: contrastRatio,
      timestamp: Date.now()
    };

    setFavorites(prev => {
      const exists = prev.some(item => item.state.fgColor === state.fgColor && item.state.bgColor === state.bgColor);
      let updated;
      if (exists) {
        updated = prev.filter(item => item.state.fgColor !== state.fgColor || item.state.bgColor !== state.bgColor);
        setIsFavorite(false);
      } else {
        updated = [nextItem, ...prev];
        setIsFavorite(true);
      }
      localStorage.setItem("nexus_contrast_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const exists = favorites.some(item => item.state.fgColor === state.fgColor && item.state.bgColor === state.bgColor);
    setIsFavorite(exists);
  }, [state, favorites]);

  const loadSavedCheck = (saved: SavedCheck) => {
    setState({ ...saved.state });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("nexus_contrast_history");
  };

  const handleRandomize = () => {
    const randomHex = () => {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

    setState(prev => ({
      ...prev,
      fgColor: randomHex(),
      bgColor: randomHex()
    }));
    triggerSaveHistory();
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500">
        <RefreshCw size={24} className="animate-spin mr-2" /> Initializing Contrast workspace...
      </div>
    );
  }

  // Custom simulation filters styling
  let simulationFilterStyle = {};
  if (visionDeficiency !== "normal") {
    simulationFilterStyle = { filter: `url(#${visionDeficiency})` };
  }

  return (
    <div className="space-y-8">
      {/* SVG Color Blindness Matrix definition */}
      <svg style={{ position: "absolute", width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0  0.558, 0.442, 0, 0, 0  0, 0.242, 0.758, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0  0.7, 0.3, 0, 0, 0  0, 0.3, 0.7, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0  0, 0.433, 0.567, 0, 0  0, 0.475, 0.525, 0, 0  0, 0, 0, 1, 0" />
          </filter>
          <filter id="achromatopsia">
            <feColorMatrix type="matrix" values="0.299, 0.587, 0.114, 0, 0  0.299, 0.587, 0.114, 0, 0  0.299, 0.587, 0.114, 0, 0  0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>

      {/* Header board */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#518231]/10 text-[#518231]">
            <Sparkles size={12} /> Accessibility Center
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">WCAG Color Contrast Auditor</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Check contrast compliance for normal/large text, simulate four forms of color blindness deficiencies, auto-correct lightness values, and export style tokens.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleRandomize} 
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-300 transition-all text-sm"
          >
            <Shuffle size={16} /> Randomize
          </button>
          <button 
            onClick={toggleFavorite} 
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium transition-all text-sm ${
              isFavorite 
                ? "bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900/30" 
                : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            <Heart size={16} className={isFavorite ? "fill-current" : ""} /> {isFavorite ? "Saved" : "Save Swatch"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Color Pickers and Smart Correction (5 columns) */}
        <div className="xl:col-span-5 space-y-6">
          
          {/* Foreground color picker card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Type size={16} className="text-[#518231]" /> Text Color (Foreground)
              </span>
              <span className="font-mono text-xs text-slate-400">{state.fgColor}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0 relative" style={checkerboardStyle}>
                <input 
                  type="color"
                  value={state.fgColor}
                  onChange={(e) => handleColorChange("fg", e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-full h-full" style={{ backgroundColor: state.fgColor }} />
              </div>
              <div className="flex-1 relative">
                <input 
                  type="text"
                  value={fgHex}
                  onFocus={() => {
                    setFocusedColor("fg");
                    setFocusedInput("hex");
                  }}
                  onBlur={() => {
                    setFocusedColor(null);
                    setFocusedInput(null);
                  }}
                  onChange={(e) => handleColorChange("fg", e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  placeholder="#000000"
                />
                {typeof window !== "undefined" && "EyeDropper" in window && (
                  <button 
                    onClick={() => handleEyeDropper("fg")}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <Droplet size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* RGB sliders list for foreground */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Red</span>
                  <input 
                    type="number"
                    value={fgRInput}
                    min="0"
                    max="255"
                    onFocus={() => {
                      setFocusedColor("fg");
                      setFocusedInput("rgb-r");
                    }}
                    onBlur={() => {
                      setFocusedColor(null);
                      setFocusedInput(null);
                    }}
                    onChange={(e) => handleRgbChange("fg", "r", e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-xs font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Green</span>
                  <input 
                    type="number"
                    value={fgGInput}
                    min="0"
                    max="255"
                    onFocus={() => {
                      setFocusedColor("fg");
                      setFocusedInput("rgb-g");
                    }}
                    onBlur={() => {
                      setFocusedColor(null);
                      setFocusedInput(null);
                    }}
                    onChange={(e) => handleRgbChange("fg", "g", e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-xs font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Blue</span>
                  <input 
                    type="number"
                    value={fgBInput}
                    min="0"
                    max="255"
                    onFocus={() => {
                      setFocusedColor("fg");
                      setFocusedInput("rgb-b");
                    }}
                    onBlur={() => {
                      setFocusedColor(null);
                      setFocusedInput(null);
                    }}
                    onChange={(e) => handleRgbChange("fg", "b", e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Background color picker card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Palette size={16} className="text-[#518231]" /> Canvas Color (Background)
              </span>
              <span className="font-mono text-xs text-slate-400">{state.bgColor}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0 relative" style={checkerboardStyle}>
                <input 
                  type="color"
                  value={state.bgColor}
                  onChange={(e) => handleColorChange("bg", e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="w-full h-full" style={{ backgroundColor: state.bgColor }} />
              </div>
              <div className="flex-1 relative">
                <input 
                  type="text"
                  value={bgHex}
                  onFocus={() => {
                    setFocusedColor("bg");
                    setFocusedInput("hex");
                  }}
                  onBlur={() => {
                    setFocusedColor(null);
                    setFocusedInput(null);
                  }}
                  onChange={(e) => handleColorChange("bg", e.target.value)}
                  className="w-full pl-3 pr-10 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  placeholder="#FFFFFF"
                />
                {typeof window !== "undefined" && "EyeDropper" in window && (
                  <button 
                    onClick={() => handleEyeDropper("bg")}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    <Droplet size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* RGB sliders list for background */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Red</span>
                  <input 
                    type="number"
                    value={bgRInput}
                    min="0"
                    max="255"
                    onFocus={() => {
                      setFocusedColor("bg");
                      setFocusedInput("rgb-r");
                    }}
                    onBlur={() => {
                      setFocusedColor(null);
                      setFocusedInput(null);
                    }}
                    onChange={(e) => handleRgbChange("bg", "r", e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-xs font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Green</span>
                  <input 
                    type="number"
                    value={bgGInput}
                    min="0"
                    max="255"
                    onFocus={() => {
                      setFocusedColor("bg");
                      setFocusedInput("rgb-g");
                    }}
                    onBlur={() => {
                      setFocusedColor(null);
                      setFocusedInput(null);
                    }}
                    onChange={(e) => handleRgbChange("bg", "g", e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-xs font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Blue</span>
                  <input 
                    type="number"
                    value={bgBInput}
                    min="0"
                    max="255"
                    onFocus={() => {
                      setFocusedColor("bg");
                      setFocusedInput("rgb-b");
                    }}
                    onBlur={() => {
                      setFocusedColor(null);
                      setFocusedInput(null);
                    }}
                    onChange={(e) => handleRgbChange("bg", "b", e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SMART CONFORMANCE SUGGESTIONS PANEL */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#518231]" /> Smart Conformance suggestions
            </h3>
            
            <div className="space-y-3">
              {/* Fix to AA */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center gap-4">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Pass minimum AA (4.5:1)</div>
                  <div className="text-[10px] text-slate-400">Closest shade preserving primary hue</div>
                </div>
                <button
                  onClick={() => {
                    setState(prev => ({ ...prev, fgColor: suggestedAA }));
                    triggerSaveHistory();
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#518231] hover:bg-[#518231]/90 text-white shadow-sm flex items-center gap-1.5"
                >
                  <div className="w-3.5 h-3.5 rounded border border-white/20" style={{ backgroundColor: suggestedAA }} />
                  <span>Fix to AA</span>
                </button>
              </div>

              {/* Fix to AAA */}
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800 flex justify-between items-center gap-4">
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Pass strict AAA (7.0:1)</div>
                  <div className="text-[10px] text-slate-400">Deep ambient shade for strict inclusive standards</div>
                </div>
                <button
                  onClick={() => {
                    setState(prev => ({ ...prev, fgColor: suggestedAAA }));
                    triggerSaveHistory();
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white shadow-sm flex items-center gap-1.5"
                >
                  <div className="w-3.5 h-3.5 rounded border border-white/20" style={{ backgroundColor: suggestedAAA }} />
                  <span>Fix to AAA</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Results board, Visual Sandboxes, Exporter (7 columns) */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* RESULTS CARD WITH COMPLIANCE BADGES */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Contrast score circle */}
            <div className="md:col-span-4 text-center space-y-2 border-r border-slate-100 dark:border-slate-800/80 pr-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Contrast Ratio</span>
              <div className="text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                {contrastRatio}:1
              </div>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-bold ${
                wcagCompliance.aaNormal 
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20" 
                  : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
              }`}>
                {wcagCompliance.aaNormal ? "Passes AA standard" : "Fails AA standard"}
              </span>
            </div>

            {/* WCAG Compliance table */}
            <div className="md:col-span-8 space-y-3 pl-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">WCAG Compliance Checklist</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                
                {/* AA Normal text */}
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">AA Normal Text</span>
                  <span className={`font-bold ${wcagCompliance.aaNormal ? "text-emerald-500" : "text-rose-500"}`}>
                    {wcagCompliance.aaNormal ? "PASS" : "FAIL"}
                  </span>
                </div>

                {/* AA Large text */}
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">AA Large Text</span>
                  <span className={`font-bold ${wcagCompliance.aaLarge ? "text-emerald-500" : "text-rose-500"}`}>
                    {wcagCompliance.aaLarge ? "PASS" : "FAIL"}
                  </span>
                </div>

                {/* AAA Normal text */}
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">AAA Normal Text</span>
                  <span className={`font-bold ${wcagCompliance.aaaNormal ? "text-emerald-500" : "text-rose-500"}`}>
                    {wcagCompliance.aaaNormal ? "PASS" : "FAIL"}
                  </span>
                </div>

                {/* AAA Large text */}
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-600 dark:text-slate-400">AAA Large Text</span>
                  <span className={`font-bold ${wcagCompliance.aaaLarge ? "text-emerald-500" : "text-rose-500"}`}>
                    {wcagCompliance.aaaLarge ? "PASS" : "FAIL"}
                  </span>
                </div>

                {/* UI Graphical elements */}
                <div className="flex justify-between items-center p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 col-span-2">
                  <span className="text-slate-600 dark:text-slate-400">UI Controls & Graphical Borders</span>
                  <span className={`font-bold ${wcagCompliance.uiComponents ? "text-emerald-500" : "text-rose-500"}`}>
                    {wcagCompliance.uiComponents ? "PASS" : "FAIL"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* VISUAL PREVIEW CANVAS */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            
            {/* Toolbar: vision deficiency + preview tab */}
            <div className="flex flex-wrap items-center justify-between border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-3 gap-3">
              <div className="flex gap-1.5">
                {(["typography", "widgets", "dashboard"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setPreviewTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      previewTab === tab 
                        ? "bg-[#518231] text-white shadow-sm" 
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Vision deficiency selector */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase">Simulate Vision:</span>
                <select
                  value={visionDeficiency}
                  onChange={(e: any) => setVisionDeficiency(e.target.value)}
                  className="px-2.5 py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs focus:outline-none"
                >
                  <option value="normal">Normal Vision</option>
                  <option value="protanopia">Protanopia (Red-Blind)</option>
                  <option value="deuteranopia">Deuteranopia (Green-Blind)</option>
                  <option value="tritanopia">Tritanopia (Blue-Blind)</option>
                  <option value="achromatopsia">Achromatopsia (Monochrome)</option>
                </select>
              </div>
            </div>

            {/* PREVIEW CONTAINER CANVAS BACKING */}
            <div 
              style={{ 
                backgroundColor: state.bgColor, 
                color: state.fgColor,
                ...simulationFilterStyle
              }} 
              className="p-8 min-h-[300px] flex items-center justify-center transition-all duration-300 relative"
            >
              
              {/* TYPOGRAPHY PREVIEW */}
              {previewTab === "typography" && (
                <div className="space-y-4 w-full">
                  <h3 className="text-2xl font-bold tracking-tight border-b pb-2 border-current/15">Heading Typography Preview</h3>
                  <p className="text-base leading-relaxed">
                    This is standard paragraph body copy checking compliance boundaries. Accessibility check values confirm contrast compliance standards. Low-contrast displays make page reading slow. Adjust colors or text weights to pass.
                  </p>
                  <div className="text-xs font-mono opacity-80 pt-2 flex gap-4">
                    <span>FONT SIZE: {state.fontSize}px</span>
                    <span>WEIGHT: {state.fontWeight}</span>
                  </div>
                </div>
              )}

              {/* WIDGETS PREVIEW */}
              {previewTab === "widgets" && (
                <div className="space-y-4 w-full max-w-sm">
                  {/* Button */}
                  <button 
                    style={{ backgroundColor: state.fgColor, color: state.bgColor }}
                    className="w-full py-3 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 active:scale-95 transition-all"
                  >
                    Action Button Widget
                  </button>

                  {/* Input field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold opacity-80 block">Text Field Input</label>
                    <input 
                      type="text" 
                      placeholder="Audited value text string..."
                      style={{ borderColor: state.fgColor }}
                      className="w-full px-3 py-2 bg-transparent border rounded-xl text-xs focus:outline-none"
                    />
                  </div>

                  {/* Alert panel */}
                  <div style={{ borderColor: state.fgColor }} className="border p-3.5 rounded-xl text-xs leading-relaxed flex items-start gap-2.5">
                    <Info size={14} className="shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block mb-0.5">Compliant system warning notice</span>
                      This widget outlines boundaries using active foreground color variables.
                    </div>
                  </div>
                </div>
              )}

              {/* DASHBOARD PREVIEW */}
              {previewTab === "dashboard" && (
                <div style={{ borderColor: state.fgColor }} className="border rounded-2xl p-6 w-full space-y-4 text-xs font-semibold">
                  <div className="flex justify-between items-center border-b pb-3 border-current/15">
                    <span className="font-bold uppercase tracking-wider">Metrics Console</span>
                    <span className="opacity-80">Workspace logs: active</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-current/5 border border-current/10 rounded-xl space-y-1">
                      <div className="opacity-75 uppercase text-[10px]">Current Compliance</div>
                      <div className="text-lg font-bold font-mono">100%</div>
                    </div>
                    <div className="p-3 bg-current/5 border border-current/10 rounded-xl space-y-1">
                      <div className="opacity-75 uppercase text-[10px]">Audited Nodes</div>
                      <div className="text-lg font-bold font-mono">42</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* EXPORTER CODE TABS */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-2 justify-between items-center">
              <div className="flex gap-1">
                {(["css", "tailwind", "scss", "json"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCodeTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                      codeTab === tab 
                        ? "bg-[#518231]/10 text-[#518231]" 
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  const text = 
                    codeTab === "css" ? cssVariablesSnippet :
                    codeTab === "tailwind" ? tailwindClassesSnippet :
                    codeTab === "scss" ? scssSnippet : jsonSnippet;
                  handleCopyText(text);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-all"
              >
                {copiedText ? <CheckCircle size={12} className="text-emerald-500" /> : <Copy size={12} />}
                {copiedText ? "Copied!" : "Copy Code"}
              </button>
            </div>

            <div className="p-4 bg-slate-950">
              <pre className="text-xs text-slate-300 font-mono overflow-x-auto p-2 leading-relaxed custom-scrollbar">
                <code>
                  {codeTab === "css" && cssVariablesSnippet}
                  {codeTab === "tailwind" && tailwindClassesSnippet}
                  {codeTab === "scss" && scssSnippet}
                  {codeTab === "json" && jsonSnippet}
                </code>
              </pre>
            </div>
          </div>

          {/* LOCAL HISTORY BOARD */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Undo size={16} className="text-[#518231]" /> Audit history log
              </h3>
              {history.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="text-xs text-rose-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 size={12} /> Clear Log
                </button>
              )}
            </div>

            {history.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => loadSavedCheck(item)}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5"
                  >
                    <div className="w-2.5 h-2.5 rounded border border-slate-300 shrink-0" style={{ backgroundColor: item.state.fgColor }} />
                    <div className="w-2.5 h-2.5 rounded border border-slate-300 shrink-0" style={{ backgroundColor: item.state.bgColor }} />
                    <span>{item.ratio}:1</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic">No historical contrast audits logged yet. Modify inputs to capture.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
