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
  Grid3X3,
  Droplet,
  Play,
  Layout,
  Info,
  Send,
  SlidersHorizontal
} from "lucide-react";
import { Link } from "../../../../i18n/routing";
import { addToHistory as addToGlobalHistory } from "../../../../lib/hooks/useToolHistory";

// --- Types ---
interface GlassConfig {
  bgColor: string; // Hex color e.g., #ffffff
  bgOpacity: number; // 0 to 1
  blur: number; // 0 to 100px
  borderOpacity: number; // 0 to 1
  borderThickness: number; // 0 to 8px
  borderColor: string; // Hex color
  shadowBlur: number; // 0 to 100px
  shadowSpread: number; // -50 to 50px
  shadowOpacity: number; // 0 to 1
  shadowColor: string; // Hex color
  glowBlur: number; // 0 to 50px
  glowOpacity: number; // 0 to 1
  glowColor: string; // Hex color
  saturation: number; // 50 to 300%
  brightness: number; // 50 to 200%
  contrast: number; // 50 to 200%
  animated: boolean; // Hover hover-float
  shine: boolean; // Shine overlay sweep
  innerShadow: boolean;
  innerShadowOpacity: number;
  innerShadowBlur: number;
}

interface SavedGlass {
  id: string;
  name: string;
  config: GlassConfig;
  timestamp: number;
}

// --- Presets ---
const PRESETS: Record<string, { name: string; config: GlassConfig }> = {
  macos: {
    name: "macOS Frost Menu",
    config: {
      bgColor: "#ffffff",
      bgOpacity: 0.08,
      blur: 24,
      borderOpacity: 0.15,
      borderThickness: 1,
      borderColor: "#ffffff",
      shadowBlur: 24,
      shadowSpread: 0,
      shadowOpacity: 0.06,
      shadowColor: "#000000",
      glowBlur: 0,
      glowOpacity: 0,
      glowColor: "#ffffff",
      saturation: 140,
      brightness: 100,
      contrast: 100,
      animated: false,
      shine: false,
      innerShadow: false,
      innerShadowOpacity: 0.05,
      innerShadowBlur: 10
    }
  },
  fluent: {
    name: "Windows Fluent UI",
    config: {
      bgColor: "#ffffff",
      bgOpacity: 0.15,
      blur: 30,
      borderOpacity: 0.2,
      borderThickness: 1,
      borderColor: "#ffffff",
      shadowBlur: 16,
      shadowSpread: -2,
      shadowOpacity: 0.12,
      shadowColor: "#000000",
      glowBlur: 0,
      glowOpacity: 0,
      glowColor: "#ffffff",
      saturation: 125,
      brightness: 95,
      contrast: 105,
      animated: false,
      shine: false,
      innerShadow: true,
      innerShadowOpacity: 0.08,
      innerShadowBlur: 12
    }
  },
  ios: {
    name: "iOS Glass Cards",
    config: {
      bgColor: "#ffffff",
      bgOpacity: 0.2,
      blur: 24,
      borderOpacity: 0.25,
      borderThickness: 1,
      borderColor: "#ffffff",
      shadowBlur: 30,
      shadowSpread: -5,
      shadowOpacity: 0.08,
      shadowColor: "#000000",
      glowBlur: 0,
      glowOpacity: 0,
      glowColor: "#ffffff",
      saturation: 160,
      brightness: 105,
      contrast: 100,
      animated: true,
      shine: false,
      innerShadow: false,
      innerShadowOpacity: 0.05,
      innerShadowBlur: 10
    }
  },
  saas: {
    name: "Modern SaaS UI",
    config: {
      bgColor: "#ffffff",
      bgOpacity: 0.07,
      blur: 16,
      borderOpacity: 0.1,
      borderThickness: 1.5,
      borderColor: "#ffffff",
      shadowBlur: 25,
      shadowSpread: -8,
      shadowOpacity: 0.05,
      shadowColor: "#0f172a",
      glowBlur: 0,
      glowOpacity: 0,
      glowColor: "#3b82f6",
      saturation: 110,
      brightness: 100,
      contrast: 100,
      animated: true,
      shine: true,
      innerShadow: false,
      innerShadowOpacity: 0.05,
      innerShadowBlur: 10
    }
  },
  cyberpunk: {
    name: "Cyberpunk Glow",
    config: {
      bgColor: "#120e2e",
      bgOpacity: 0.45,
      blur: 10,
      borderOpacity: 0.6,
      borderThickness: 1.5,
      borderColor: "#ec4899",
      shadowBlur: 20,
      shadowSpread: 0,
      shadowOpacity: 0.35,
      shadowColor: "#ec4899",
      glowBlur: 15,
      glowOpacity: 0.4,
      glowColor: "#3b82f6",
      saturation: 180,
      brightness: 90,
      contrast: 110,
      animated: true,
      shine: true,
      innerShadow: true,
      innerShadowOpacity: 0.3,
      innerShadowBlur: 8
    }
  },
  gaming: {
    name: "Gaming Console Glass",
    config: {
      bgColor: "#0f172a",
      bgOpacity: 0.55,
      blur: 12,
      borderOpacity: 0.4,
      borderThickness: 2,
      borderColor: "#06b6d4",
      shadowBlur: 25,
      shadowSpread: 0,
      shadowOpacity: 0.4,
      shadowColor: "#06b6d4",
      glowBlur: 20,
      glowOpacity: 0.3,
      glowColor: "#06b6d4",
      saturation: 150,
      brightness: 95,
      contrast: 100,
      animated: true,
      shine: false,
      innerShadow: true,
      innerShadowOpacity: 0.25,
      innerShadowBlur: 15
    }
  },
  neon: {
    name: "Neon Electric Aurora",
    config: {
      bgColor: "#09090b",
      bgOpacity: 0.3,
      blur: 15,
      borderOpacity: 0.5,
      borderThickness: 1,
      borderColor: "#a855f7",
      shadowBlur: 35,
      shadowSpread: 0,
      shadowOpacity: 0.5,
      shadowColor: "#ec4899",
      glowBlur: 25,
      glowOpacity: 0.45,
      glowColor: "#10b981",
      saturation: 200,
      brightness: 100,
      contrast: 100,
      animated: true,
      shine: true,
      innerShadow: false,
      innerShadowOpacity: 0.1,
      innerShadowBlur: 5
    }
  },
  minimal: {
    name: "Minimal Clean Glass",
    config: {
      bgColor: "#ffffff",
      bgOpacity: 0.03,
      blur: 8,
      borderOpacity: 0.08,
      borderThickness: 1,
      borderColor: "#ffffff",
      shadowBlur: 0,
      shadowSpread: 0,
      shadowOpacity: 0,
      shadowColor: "#000000",
      glowBlur: 0,
      glowOpacity: 0,
      glowColor: "#ffffff",
      saturation: 100,
      brightness: 100,
      contrast: 100,
      animated: false,
      shine: false,
      innerShadow: false,
      innerShadowOpacity: 0.05,
      innerShadowBlur: 10
    }
  },
  finance: {
    name: "Finance Obsidian",
    config: {
      bgColor: "#0b0f19",
      bgOpacity: 0.4,
      blur: 20,
      borderOpacity: 0.15,
      borderThickness: 1,
      borderColor: "#334155",
      shadowBlur: 30,
      shadowSpread: -2,
      shadowOpacity: 0.25,
      shadowColor: "#000000",
      glowBlur: 0,
      glowOpacity: 0,
      glowColor: "#ffffff",
      saturation: 120,
      brightness: 85,
      contrast: 100,
      animated: true,
      shine: true,
      innerShadow: true,
      innerShadowOpacity: 0.15,
      innerShadowBlur: 20
    }
  },
  luxury: {
    name: "Luxury Champagne Glass",
    config: {
      bgColor: "#fafaf9",
      bgOpacity: 0.15,
      blur: 18,
      borderOpacity: 0.3,
      borderThickness: 1,
      borderColor: "#d97706",
      shadowBlur: 20,
      shadowSpread: -3,
      shadowOpacity: 0.15,
      shadowColor: "#d97706",
      glowBlur: 10,
      glowOpacity: 0.2,
      glowColor: "#d97706",
      saturation: 105,
      brightness: 100,
      contrast: 100,
      animated: true,
      shine: true,
      innerShadow: false,
      innerShadowOpacity: 0.05,
      innerShadowBlur: 10
    }
  }
};

// --- Color Helpers ---
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

const toRgbaStr = (hex: string, opacity: number) => {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

// --- Checkerboard style ---
const checkerboardStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Crect width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' width='4' height='4' fill='%23e2e8f0'/%3E%3Crect y='4' width='4' height='4' fill='%23e2e8f0'/%3E%3C/svg%3E")`,
};

export function GlassmorphismGeneratorTool() {
  const [mounted, setMounted] = useState(false);

  // --- Glass State ---
  const [glass, setGlass] = useState<GlassConfig>(PRESETS.ios.config);

  // Colors inputs
  const [hexInput, setHexInput] = useState("#ffffff");
  const [rInput, setRInput] = useState("255");
  const [gInput, setGInput] = useState("255");
  const [bInput, setBInput] = useState("255");
  const [hInput, setHInput] = useState("0");
  const [sInput, setSInput] = useState("0");
  const [lInput, setLInput] = useState("100");

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Canvas visual modifiers
  const [canvasBackground, setCanvasBackground] = useState<"colorful-mesh" | "moving-blobs" | "dark-grid" | "light-radial">("colorful-mesh");
  const [customCanvasColor, setCustomCanvasColor] = useState("#3b82f6");
  const [hasNoise, setHasNoise] = useState(true);

  // Interface Tabs
  const [activeControlTab, setActiveControlTab] = useState<"glass" | "backdrop" | "lighting">("glass");
  const [previewWidgetTab, setPreviewWidgetTab] = useState<"card" | "navbar" | "login" | "dashboard" | "chat">("card");
  const [codeExportTab, setCodeExportTab] = useState<"css" | "tailwind" | "tailwind-config" | "scss" | "json">("css");
  
  const [copiedText, setCopiedText] = useState(false);
  const [recentGlass, setRecentGlass] = useState<SavedGlass[]>([]);
  const [favorites, setFavorites] = useState<SavedGlass[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Setup on Mount
  useEffect(() => {
    setMounted(true);
    addToGlobalHistory({ slug: "glassmorphism-generator", title: "Glassmorphism Generator", type: "tool" });

    // Load LocalStorage cache
    const savedHistory = localStorage.getItem("nexus_glass_history");
    if (savedHistory) {
      try { setRecentGlass(JSON.parse(savedHistory)); } catch (e) {}
    }
    const savedFavs = localStorage.getItem("nexus_glass_favorites");
    if (savedFavs) {
      try { setFavorites(JSON.parse(savedFavs)); } catch (e) {}
    }
  }, []);

  // Synchronize color picker fields
  useEffect(() => {
    if (focusedInput === "hex") return;
    setHexInput(glass.bgColor);
    const rgb = hexToRgb(glass.bgColor);
    setRInput(rgb.r.toString());
    setGInput(rgb.g.toString());
    setBInput(rgb.b.toString());

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setHInput(hsl.h.toString());
    setSInput(hsl.s.toString());
    setLInput(hsl.l.toString());
  }, [glass.bgColor, focusedInput]);

  // Combined Styles computation
  const glassStyleObject = useMemo<React.CSSProperties>(() => {
    const shadowColorStr = toRgbaStr(glass.shadowColor, glass.shadowOpacity);
    const glowColorStr = toRgbaStr(glass.glowColor, glass.glowOpacity);
    
    // Outer Shadow + Soft Glow combination
    let boxShadow = `0 ${glass.shadowBlur / 2}px ${glass.shadowBlur}px ${glass.shadowSpread}px ${shadowColorStr}`;
    if (glass.glowOpacity > 0 && glass.glowBlur > 0) {
      boxShadow += `, 0 0 ${glass.glowBlur}px ${glass.glowBlur / 3}px ${glowColorStr}`;
    }
    if (glass.innerShadow && glass.innerShadowOpacity > 0) {
      boxShadow += `, inset 0 2px ${glass.innerShadowBlur}px rgba(255, 255, 255, ${glass.innerShadowOpacity})`;
    }

    return {
      backgroundColor: toRgbaStr(glass.bgColor, glass.bgOpacity),
      backdropFilter: `blur(${glass.blur}px) saturate(${glass.saturation}%) brightness(${glass.brightness}%) contrast(${glass.contrast}%)`,
      WebkitBackdropFilter: `blur(${glass.blur}px) saturate(${glass.saturation}%) brightness(${glass.brightness}%) contrast(${glass.contrast}%)`,
      border: `${glass.borderThickness}px solid ${toRgbaStr(glass.borderColor, glass.borderOpacity)}`,
      boxShadow,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    };
  }, [glass]);

  // Code Snippets Construction
  const cssCodeString = useMemo(() => {
    const shadowColorStr = toRgbaStr(glass.shadowColor, glass.shadowOpacity);
    const glowColorStr = toRgbaStr(glass.glowColor, glass.glowOpacity);
    
    let shadows = `0 ${glass.shadowBlur / 2}px ${glass.shadowBlur}px ${glass.shadowSpread}px ${shadowColorStr}`;
    if (glass.glowOpacity > 0 && glass.glowBlur > 0) {
      shadows += `, 0 0 ${glass.glowBlur}px ${glass.glowBlur / 3}px ${glowColorStr}`;
    }
    if (glass.innerShadow && glass.innerShadowOpacity > 0) {
      shadows += `, inset 0 2px ${glass.innerShadowBlur}px rgba(255, 255, 255, ${glass.innerShadowOpacity})`;
    }

    return `/* Glassmorphism Effect */
background: ${toRgbaStr(glass.bgColor, glass.bgOpacity)};
backdrop-filter: blur(${glass.blur}px) saturate(${glass.saturation}%) brightness(${glass.brightness}%) contrast(${glass.contrast}%);
-webkit-backdrop-filter: blur(${glass.blur}px) saturate(${glass.saturation}%) brightness(${glass.brightness}%) contrast(${glass.contrast}%);
border: ${glass.borderThickness}px solid ${toRgbaStr(glass.borderColor, glass.borderOpacity)};
box-shadow: ${shadows};`;
  }, [glass]);

  const tailwindClasses = useMemo(() => {
    // Generate approximation for tailwind arbitrary brackets
    const bgVal = toRgbaStr(glass.bgColor, glass.bgOpacity).replace(/\s+/g, "");
    const borderVal = toRgbaStr(glass.borderColor, glass.borderOpacity).replace(/\s+/g, "");
    const filterStr = `blur(${glass.blur}px)_saturate(${glass.saturation}%)_brightness(${glass.brightness}%)_contrast(${glass.contrast}%)`;
    
    const shadowColorStr = toRgbaStr(glass.shadowColor, glass.shadowOpacity).replace(/\s+/g, "");
    const glowColorStr = toRgbaStr(glass.glowColor, glass.glowOpacity).replace(/\s+/g, "");
    let shadowStr = `0_${glass.shadowBlur / 2}px_${glass.shadowBlur}px_${glass.shadowSpread}px_${shadowColorStr}`;
    if (glass.glowOpacity > 0 && glass.glowBlur > 0) {
      shadowStr += `,0_0_${glass.glowBlur}px_${glass.glowBlur / 3}px_${glowColorStr}`;
    }
    if (glass.innerShadow && glass.innerShadowOpacity > 0) {
      shadowStr += `,inset_0_2px_${glass.innerShadowBlur}px_rgba(255,255,255,${glass.innerShadowOpacity})`;
    }

    return `bg-[${bgVal}] backdrop-filter-[${filterStr}] border-[${glass.borderThickness}px] border-[${borderVal}] shadow-[${shadowStr}]`;
  }, [glass]);

  const tailwindConfigSnippet = useMemo(() => {
    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      backgroundColor: {
        'glass-tint': '${toRgbaStr(glass.bgColor, glass.bgOpacity)}',
      },
      borderColor: {
        'glass-edge': '${toRgbaStr(glass.borderColor, glass.borderOpacity)}',
      },
      backdropBlur: {
        'glass-frost': '${glass.blur}px',
      },
      boxShadow: {
        'glass-ambient': '0 ${glass.shadowBlur / 2}px ${glass.shadowBlur}px ${glass.shadowSpread}px ${toRgbaStr(glass.shadowColor, glass.shadowOpacity)}',
      }
    }
  }
}`;
  }, [glass]);

  const scssCodeString = useMemo(() => {
    const shadowColorStr = toRgbaStr(glass.shadowColor, glass.shadowOpacity);
    const glowColorStr = toRgbaStr(glass.glowColor, glass.glowOpacity);
    let shadowStr = `0 ${glass.shadowBlur / 2}px ${glass.shadowBlur}px ${glass.shadowSpread}px ${shadowColorStr}`;
    if (glass.glowOpacity > 0 && glass.glowBlur > 0) {
      shadowStr += `, 0 0 ${glass.glowBlur}px ${glass.glowBlur / 3}px ${glowColorStr}`;
    }
    if (glass.innerShadow && glass.innerShadowOpacity > 0) {
      shadowStr += `, inset 0 2px ${glass.innerShadowBlur}px rgba(255, 255, 255, ${glass.innerShadowOpacity})`;
    }

    return `$glass-bg: ${toRgbaStr(glass.bgColor, glass.bgOpacity)};
$glass-blur: ${glass.blur}px;
$glass-saturation: ${glass.saturation}%;
$glass-brightness: ${glass.brightness}%;
$glass-contrast: ${glass.contrast}%;
$glass-border: ${glass.borderThickness}px solid ${toRgbaStr(glass.borderColor, glass.borderOpacity)};
$glass-shadow: ${shadowStr};

.glassmorphism {
  background: $glass-bg;
  backdrop-filter: blur($glass-blur) saturate($glass-saturation) brightness($glass-brightness) contrast($glass-contrast);
  -webkit-backdrop-filter: blur($glass-blur) saturate($glass-saturation) brightness($glass-brightness) contrast($glass-contrast);
  border: $glass-border;
  box-shadow: $glass-shadow;
}`;
  }, [glass]);

  const jsonCodeString = useMemo(() => {
    return JSON.stringify({
      name: "Glassmorphism Theme Token",
      values: {
        bgColor: glass.bgColor,
        bgOpacity: glass.bgOpacity,
        blurRadius: `${glass.blur}px`,
        borderThickness: `${glass.borderThickness}px`,
        borderColor: glass.borderColor,
        borderOpacity: glass.borderOpacity,
        shadow: {
          blur: glass.shadowBlur,
          spread: glass.shadowSpread,
          opacity: glass.shadowOpacity,
          color: glass.shadowColor
        },
        filters: {
          saturation: `${glass.saturation}%`,
          brightness: `${glass.brightness}%`,
          contrast: `${glass.contrast}%`
        }
      }
    }, null, 2);
  }, [glass]);

  // Readability / Accessibility Score check
  // Compute approximate color contrast based on background lightness and opacity
  const contrastCalculations = useMemo(() => {
    const bgRgb = hexToRgb(glass.bgColor);
    
    // Relative luminance formula
    const getLuminance = (r: number, g: number, b: number) => {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const tintLuminance = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
    
    // We assume the canvas background is medium light (luminance 0.5) or dark (0.05) depending on active theme
    // For standard estimation:
    const finalEstimatedLuminance = tintLuminance * glass.bgOpacity + (1 - glass.bgOpacity) * 0.35;
    
    const contrastWithWhite = (1.05) / (finalEstimatedLuminance + 0.05);
    const contrastWithBlack = (finalEstimatedLuminance + 0.05) / (0.05);

    const whiteScore = Number(contrastWithWhite.toFixed(1));
    const blackScore = Number(contrastWithBlack.toFixed(1));

    const preferredText = whiteScore > blackScore ? "White Text (#FFFFFF)" : "Dark Text (#0F172A)";
    const preferredContrast = Math.max(whiteScore, blackScore);
    
    let w3cRating = "Fail";
    let complianceAdvice = "This combo is too translucent or low-contrast. Increase Background Opacity or change the glass tint color to separate content details.";

    if (preferredContrast >= 7.0) {
      w3cRating = "AAA Compliant";
      complianceAdvice = "Excellent readability. Meets the highest standards for small body typography and headers.";
    } else if (preferredContrast >= 4.5) {
      w3cRating = "AA Compliant";
      complianceAdvice = "Good readability. Certified safe for normal paragraph copy and user input values.";
    } else if (preferredContrast >= 3.0) {
      w3cRating = "Large Text Only";
      complianceAdvice = "Okay readability. Safe for large button text or headers, but avoid utilizing for standard paragraphs.";
    }

    return {
      whiteScore,
      blackScore,
      preferredText,
      preferredContrast,
      w3cRating,
      complianceAdvice
    };
  }, [glass]);

  // Performance warning logic
  const performanceWarnings = useMemo(() => {
    const factors = [];
    if (glass.blur > 30) {
      factors.push("High blur values (>30px) require multiple Gaussian blur GPU passes.");
    }
    if (glass.bgOpacity < 0.05 && glass.blur > 15) {
      factors.push("Extremely transparent base with heavy blur might cause color banding artifacts on standard displays.");
    }
    if (glass.saturation > 200 || glass.contrast > 150) {
      factors.push("High saturation/contrast backdrop filters force dynamic frame redraw loops on page scrolling.");
    }
    return factors;
  }, [glass]);

  // --- Handlers ---
  const handleHexChange = (val: string) => {
    setHexInput(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      setGlass(prev => ({ ...prev, bgColor: val }));
      triggerSaveHistory();
    }
  };

  const handleBorderHexChange = (val: string) => {
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      setGlass(prev => ({ ...prev, borderColor: val }));
      triggerSaveHistory();
    }
  };

  const handleRgbChange = (channel: "r" | "g" | "b", valStr: string) => {
    if (channel === "r") setRInput(valStr);
    if (channel === "g") setGInput(valStr);
    if (channel === "b") setBInput(valStr);

    const val = parseInt(valStr, 10);
    if (isNaN(val)) return;

    const rgb = hexToRgb(glass.bgColor);
    const r = channel === "r" ? clamp(val, 0, 255) : rgb.r;
    const g = channel === "g" ? clamp(val, 0, 255) : rgb.g;
    const b = channel === "b" ? clamp(val, 0, 255) : rgb.b;

    const nextHex = rgbToHex(r, g, b);
    setGlass(prev => ({ ...prev, bgColor: nextHex }));
    triggerSaveHistory();
  };

  const handleHslChange = (channel: "h" | "s" | "l", valStr: string) => {
    if (channel === "h") setHInput(valStr);
    if (channel === "s") setSInput(valStr);
    if (channel === "l") setLInput(valStr);

    const val = parseInt(valStr, 10);
    if (isNaN(val)) return;

    const rgb = hexToRgb(glass.bgColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const h = channel === "h" ? clamp(val, 0, 360) : hsl.h;
    const s = channel === "s" ? clamp(val, 0, 100) : hsl.s;
    const l = channel === "l" ? clamp(val, 0, 100) : hsl.l;

    const nextRgb = hslToRgb(h, s, l);
    const nextHex = rgbToHex(nextRgb.r, nextRgb.g, nextRgb.b);
    setGlass(prev => ({ ...prev, bgColor: nextHex }));
    triggerSaveHistory();
  };

  const handleEyeDropper = () => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      const EyeDropperConstructor = (window as any).EyeDropper;
      const eyeDropper = new EyeDropperConstructor();
      eyeDropper.open()
        .then((result: { srgbHex: string }) => {
          handleHexChange(result.srgbHex);
        })
        .catch(() => {});
    }
  };

  const loadPreset = (key: string) => {
    const preset = PRESETS[key];
    if (preset) {
      setGlass({ ...preset.config });
      triggerSaveHistory();
    }
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  const triggerSaveHistory = () => {
    const nextItem: SavedGlass = {
      id: Date.now().toString(),
      name: `Glass Style ${Date.now().toString().slice(-4)}`,
      config: { ...glass },
      timestamp: Date.now()
    };

    setRecentGlass(prev => {
      const filtered = prev.filter(item => JSON.stringify(item.config) !== JSON.stringify(nextItem.config));
      const updated = [nextItem, ...filtered].slice(0, 10);
      localStorage.setItem("nexus_glass_history", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavorite = () => {
    const nextItem: SavedGlass = {
      id: Date.now().toString(),
      name: `Fav Glass ${Date.now().toString().slice(-4)}`,
      config: { ...glass },
      timestamp: Date.now()
    };

    setFavorites(prev => {
      const exists = prev.some(item => JSON.stringify(item.config) === JSON.stringify(glass));
      let updated;
      if (exists) {
        updated = prev.filter(item => JSON.stringify(item.config) !== JSON.stringify(glass));
        setIsFavorite(false);
      } else {
        updated = [nextItem, ...prev];
        setIsFavorite(true);
      }
      localStorage.setItem("nexus_glass_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const exists = favorites.some(item => JSON.stringify(item.config) === JSON.stringify(glass));
    setIsFavorite(exists);
  }, [glass, favorites]);

  const loadSavedGlass = (saved: SavedGlass) => {
    setGlass({ ...saved.config });
  };

  const clearHistory = () => {
    setRecentGlass([]);
    localStorage.removeItem("nexus_glass_history");
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

    const nextConfig: GlassConfig = {
      bgColor: Math.random() > 0.5 ? "#ffffff" : randomHex(),
      bgOpacity: Number((Math.random() * 0.3 + 0.05).toFixed(2)),
      blur: Math.floor(Math.random() * 30) + 5,
      borderOpacity: Number((Math.random() * 0.4 + 0.05).toFixed(2)),
      borderThickness: Math.random() > 0.7 ? 2 : 1,
      borderColor: Math.random() > 0.6 ? "#ffffff" : randomHex(),
      shadowBlur: Math.floor(Math.random() * 40) + 10,
      shadowSpread: Math.floor(Math.random() * 10) - 5,
      shadowOpacity: Number((Math.random() * 0.2 + 0.05).toFixed(2)),
      shadowColor: "#000000",
      glowBlur: Math.random() > 0.7 ? Math.floor(Math.random() * 25) : 0,
      glowOpacity: Number((Math.random() * 0.3).toFixed(2)),
      glowColor: randomHex(),
      saturation: Math.floor(Math.random() * 150) + 80,
      brightness: Math.floor(Math.random() * 80) + 80,
      contrast: Math.floor(Math.random() * 80) + 80,
      animated: Math.random() > 0.5,
      shine: Math.random() > 0.5,
      innerShadow: Math.random() > 0.5,
      innerShadowOpacity: Number((Math.random() * 0.15).toFixed(2)),
      innerShadowBlur: Math.floor(Math.random() * 15) + 5
    };

    setGlass(nextConfig);
    triggerSaveHistory();
  };

  // SVG Export trigger
  const triggerDownloadSvg = () => {
    const shadowColorStr = toRgbaStr(glass.shadowColor, glass.shadowOpacity);
    const glowColorStr = toRgbaStr(glass.glowColor, glass.glowOpacity);
    
    let shadows = `0 ${glass.shadowBlur / 2}px ${glass.shadowBlur}px ${glass.shadowSpread}px ${shadowColorStr}`;
    if (glass.glowOpacity > 0 && glass.glowBlur > 0) {
      shadows += `, 0 0 ${glass.glowBlur}px ${glass.glowBlur / 3}px ${glowColorStr}`;
    }

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">
  <defs>
    <!-- Background Gradient -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ec4899" />
      <stop offset="50%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    
    <!-- Glass Filter -->
    <filter id="glassBlur">
      <feGaussianBlur stdDeviation="${glass.blur / 4}" />
      <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.2 0" />
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="100%" height="100%" fill="url(#bgGrad)" />
  <circle cx="100" cy="180" r="70" fill="#f43f5e" opacity="0.8" />
  <circle cx="280" cy="80" r="90" fill="#10b981" opacity="0.6" />

  <!-- Glass Card -->
  <g filter="url(#glassBlur)" opacity="0.95">
    <rect x="50" y="40" width="300" height="170" rx="16" fill="${glass.bgColor}" fill-opacity="${glass.bgOpacity}" />
  </g>
  
  <rect x="50" y="40" width="300" height="170" rx="16" fill="none" stroke="${glass.borderColor}" stroke-opacity="${glass.borderOpacity}" stroke-width="${glass.borderThickness}" style="box-shadow: ${shadows};" />

  <!-- Text -->
  <text x="80" y="90" fill="#ffffff" font-family="sans-serif" font-size="20" font-weight="bold" letter-spacing="1">NEXUS GLASS</text>
  <text x="80" y="125" fill="#ffffff" fill-opacity="0.7" font-family="sans-serif" font-size="12">Blur: ${glass.blur}px | Opacity: ${glass.bgOpacity * 100}%</text>
  <text x="80" y="175" fill="#ffffff" fill-opacity="0.9" font-family="sans-serif" font-size="14" font-weight="bold">CSS Glassmorphism Card</text>
</svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "glass-card.svg";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500">
        <RefreshCw size={24} className="animate-spin mr-2" /> Initializing Glassmorphism Studio...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Visual Workspace Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#518231]/10 text-[#518231]">
            <Sparkles size={12} /> Glassmorphism Studio
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Translucent Frost Interface Designer</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Combine back-drop blur physics, edge lights, custom alpha saturation, and neon glow effects. Swap presets instantly, audit W3C contrast standards, and download copy-pasteable CSS/Tailwind configs.
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
            <Heart size={16} className={isFavorite ? "fill-current" : ""} /> {isFavorite ? "Bookmarked" : "Bookmark"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls Dashboard (5 columns) */}
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            {/* Tabs Selector */}
            <div className="flex border-b border-slate-100 dark:border-slate-800">
              <button 
                onClick={() => setActiveControlTab("glass")} 
                className={`flex-1 py-3 px-4 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
                  activeControlTab === "glass" 
                    ? "border-[#518231] text-[#518231]" 
                    : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Sliders size={14} /> Glass Physics
              </button>
              <button 
                onClick={() => setActiveControlTab("backdrop")} 
                className={`flex-1 py-3 px-4 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
                  activeControlTab === "backdrop" 
                    ? "border-[#518231] text-[#518231]" 
                    : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Contrast size={14} /> Filters & Edge
              </button>
              <button 
                onClick={() => setActiveControlTab("lighting")} 
                className={`flex-1 py-3 px-4 font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border-b-2 transition-all ${
                  activeControlTab === "lighting" 
                    ? "border-[#518231] text-[#518231]" 
                    : "border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Palette size={14} /> Tint & Shading
              </button>
            </div>

            <div className="p-6 space-y-6">
              
              {/* TAB 1: GLASS PHYSICS */}
              {activeControlTab === "glass" && (
                <div className="space-y-5">
                  {/* Background Opacity */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">Background Opacity</label>
                      <span className="text-xs text-slate-500 font-mono">{Math.round(glass.bgOpacity * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={glass.bgOpacity}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setGlass(prev => ({ ...prev, bgOpacity: val }));
                      }}
                      className="w-full accent-[#518231]"
                    />
                  </div>

                  {/* Backdrop Blur */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">Backdrop Blur Strength</label>
                      <span className="text-xs text-slate-500 font-mono">{glass.blur}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="60" 
                      step="1" 
                      value={glass.blur}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setGlass(prev => ({ ...prev, blur: val }));
                      }}
                      className="w-full accent-[#518231]"
                    />
                  </div>

                  {/* Outer Shadow Blur */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">Outer Shadow Blur</label>
                      <span className="text-xs text-slate-500 font-mono">{glass.shadowBlur}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="80" 
                      step="1" 
                      value={glass.shadowBlur}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setGlass(prev => ({ ...prev, shadowBlur: val }));
                      }}
                      className="w-full accent-[#518231]"
                    />
                  </div>

                  {/* Outer Shadow Opacity */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">Shadow Intensity</label>
                      <span className="text-xs text-slate-500 font-mono">{Math.round(glass.shadowOpacity * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={glass.shadowOpacity}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setGlass(prev => ({ ...prev, shadowOpacity: val }));
                      }}
                      className="w-full accent-[#518231]"
                    />
                  </div>

                  {/* Custom Toggles */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Animated Float</div>
                        <div className="text-xs text-slate-500">Adds floating hover transitions</div>
                      </div>
                      <button 
                        onClick={() => setGlass(prev => ({ ...prev, animated: !prev.animated }))}
                        className={`w-11 h-6 rounded-full transition-all relative ${glass.animated ? "bg-[#518231]" : "bg-slate-300 dark:bg-slate-700"}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-sm transition-all ${glass.animated ? "translate-x-5" : ""}`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Shine Reflection sweep</div>
                        <div className="text-xs text-slate-500">Includes sweeping diagonal light shine</div>
                      </div>
                      <button 
                        onClick={() => setGlass(prev => ({ ...prev, shine: !prev.shine }))}
                        className={`w-11 h-6 rounded-full transition-all relative ${glass.shine ? "bg-[#518231]" : "bg-slate-300 dark:bg-slate-700"}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-sm transition-all ${glass.shine ? "translate-x-5" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: FILTERS & EDGE */}
              {activeControlTab === "backdrop" && (
                <div className="space-y-5">
                  {/* Border Thickness */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">Border Thickness</label>
                      <span className="text-xs text-slate-500 font-mono">{glass.borderThickness}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="6" 
                      step="0.5" 
                      value={glass.borderThickness}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setGlass(prev => ({ ...prev, borderThickness: val }));
                      }}
                      className="w-full accent-[#518231]"
                    />
                  </div>

                  {/* Border Opacity */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">Border Reflection Opacity</label>
                      <span className="text-xs text-slate-500 font-mono">{Math.round(glass.borderOpacity * 100)}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={glass.borderOpacity}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        setGlass(prev => ({ ...prev, borderOpacity: val }));
                      }}
                      className="w-full accent-[#518231]"
                    />
                  </div>

                  {/* Backdrop Saturation */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">Backdrop Color Saturation</label>
                      <span className="text-xs text-slate-500 font-mono">{glass.saturation}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="300" 
                      step="5" 
                      value={glass.saturation}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setGlass(prev => ({ ...prev, saturation: val }));
                      }}
                      className="w-full accent-[#518231]"
                    />
                  </div>

                  {/* Contrast */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">Contrast Adjustment</label>
                      <span className="text-xs text-slate-500 font-mono">{glass.contrast}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="200" 
                      step="5" 
                      value={glass.contrast}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setGlass(prev => ({ ...prev, contrast: val }));
                      }}
                      className="w-full accent-[#518231]"
                    />
                  </div>

                  {/* Brightness */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">Brightness Offset</label>
                      <span className="text-xs text-slate-500 font-mono">{glass.brightness}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="180" 
                      step="5" 
                      value={glass.brightness}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setGlass(prev => ({ ...prev, brightness: val }));
                      }}
                      className="w-full accent-[#518231]"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: TINT & SHADING */}
              {activeControlTab === "lighting" && (
                <div className="space-y-6">
                  {/* Glass Tint Color */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Glass Tint Color</label>
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0 shadow-sm" style={checkerboardStyle}>
                        <input 
                          type="color" 
                          value={glass.bgColor}
                          onChange={(e) => handleHexChange(e.target.value)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="w-full h-full" style={{ backgroundColor: glass.bgColor }} />
                      </div>
                      
                      <div className="flex-1 relative">
                        <input 
                          type="text" 
                          value={hexInput}
                          onFocus={() => setFocusedInput("hex")}
                          onBlur={() => setFocusedInput(null)}
                          onChange={(e) => handleHexChange(e.target.value)}
                          className="w-full pl-3 pr-10 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#518231]"
                          placeholder="#FFFFFF"
                        />
                        {typeof window !== "undefined" && "EyeDropper" in window && (
                          <button 
                            onClick={handleEyeDropper}
                            className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                            title="Open System EyeDropper Color Picker"
                          >
                            <Droplet size={16} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* RGB Sliders */}
                    <div className="pt-2 grid grid-cols-3 gap-2">
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Red</span>
                        <input 
                          type="number"
                          value={rInput}
                          min="0"
                          max="255"
                          onFocus={() => setFocusedInput("rgb-r")}
                          onBlur={() => setFocusedInput(null)}
                          onChange={(e) => handleRgbChange("r", e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#518231]"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Green</span>
                        <input 
                          type="number"
                          value={gInput}
                          min="0"
                          max="255"
                          onFocus={() => setFocusedInput("rgb-g")}
                          onBlur={() => setFocusedInput(null)}
                          onChange={(e) => handleRgbChange("g", e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#518231]"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Blue</span>
                        <input 
                          type="number"
                          value={bInput}
                          min="0"
                          max="255"
                          onFocus={() => setFocusedInput("rgb-b")}
                          onBlur={() => setFocusedInput(null)}
                          onChange={(e) => handleRgbChange("b", e.target.value)}
                          className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#518231]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Glow Color Customizer */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block mb-3">Reflective Edge Light & Color</label>
                      <div className="flex gap-2">
                        {["#ffffff", "#ef4444", "#3b82f6", "#10b981", "#eab308", "#ec4899", "#a855f7"].map((col) => (
                          <button 
                            key={col}
                            onClick={() => setGlass(prev => ({ ...prev, borderColor: col }))}
                            className={`w-6 h-6 rounded-full border border-slate-200 dark:border-slate-700 transition-all ${glass.borderColor === col ? "ring-2 ring-offset-2 ring-[#518231]" : ""}`}
                            style={{ backgroundColor: col }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Neon Glow settings */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Neon Ambient Glow</span>
                        <span className="text-xs font-mono text-slate-500">{glass.glowBlur}px</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <input 
                          type="range"
                          min="0"
                          max="40"
                          value={glass.glowBlur}
                          onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            setGlass(prev => ({ 
                              ...prev, 
                              glowBlur: val, 
                              glowOpacity: val > 0 ? (prev.glowOpacity || 0.3) : 0
                            }));
                          }}
                          className="flex-1 accent-[#518231]"
                        />
                        <input 
                          type="color"
                          value={glass.glowColor}
                          onChange={(e) => setGlass(prev => ({ ...prev, glowColor: e.target.value }))}
                          className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer overflow-hidden p-0 bg-transparent shrink-0"
                        />
                      </div>
                    </div>

                    {/* Inner highlight (refraction) */}
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Inner Bevel Highlight</div>
                        <div className="text-xs text-slate-500">Injects inset glass highlights</div>
                      </div>
                      <button 
                        onClick={() => setGlass(prev => ({ ...prev, innerShadow: !prev.innerShadow }))}
                        className={`w-11 h-6 rounded-full transition-all relative ${glass.innerShadow ? "bg-[#518231]" : "bg-slate-300 dark:bg-slate-700"}`}
                      >
                        <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-sm transition-all ${glass.innerShadow ? "translate-x-5" : ""}`} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Presets Grid Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={14} className="text-[#518231]" /> Designer Presets
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {Object.entries(PRESETS).map(([key, item]) => {
                const isActive = JSON.stringify(glass) === JSON.stringify(item.config);
                return (
                  <button 
                    key={key}
                    onClick={() => loadPreset(key)}
                    className={`p-2.5 text-left rounded-xl border text-xs font-semibold transition-all relative overflow-hidden group ${
                      isActive 
                        ? "bg-[#518231]/10 border-[#518231] text-[#518231]" 
                        : "bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div>{item.name}</div>
                    <span className="absolute bottom-0.5 right-1.5 opacity-0 group-hover:opacity-40 transition-opacity text-[10px]">Apply &rarr;</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Canvas, Sandbox, & Exporter (7 columns) */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* Canvas Controller */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Backing Canvas:</span>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1">
                <button 
                  onClick={() => setCanvasBackground("colorful-mesh")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${canvasBackground === "colorful-mesh" ? "bg-white dark:bg-slate-900 shadow-sm text-[#518231]" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
                >
                  Mesh Gradient
                </button>
                <button 
                  onClick={() => setCanvasBackground("moving-blobs")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${canvasBackground === "moving-blobs" ? "bg-white dark:bg-slate-900 shadow-sm text-[#518231]" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
                >
                  Moving Blobs
                </button>
                <button 
                  onClick={() => setCanvasBackground("dark-grid")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${canvasBackground === "dark-grid" ? "bg-white dark:bg-slate-900 shadow-sm text-[#518231]" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`}
                >
                  Grid Lines
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Frosted Noise:</span>
                <button 
                  onClick={() => setHasNoise(!hasNoise)}
                  className={`w-9 h-5 rounded-full transition-all relative ${hasNoise ? "bg-[#518231]" : "bg-slate-300 dark:bg-slate-700"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 bg-white w-4 h-4 rounded-full transition-all ${hasNoise ? "translate-x-4" : ""}`} />
                </button>
              </div>
            </div>
          </div>

          {/* PREVIEW CANVAS */}
          <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center p-6 transition-all bg-slate-950">
            
            {/* Canvas backgrounds templates */}
            {canvasBackground === "colorful-mesh" && (
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 via-pink-600 to-amber-400 opacity-90 transition-all duration-500" />
            )}

            {canvasBackground === "moving-blobs" && (
              <div className="absolute inset-0 bg-slate-900 overflow-hidden transition-all duration-500">
                <div className="absolute -top-10 -left-10 w-60 h-60 bg-emerald-500 rounded-full mix-blend-screen filter blur-[60px] opacity-70 animate-pulse" />
                <div className="absolute top-20 right-10 w-72 h-72 bg-fuchsia-600 rounded-full mix-blend-screen filter blur-[80px] opacity-80 animate-bounce" />
                <div className="absolute -bottom-20 left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-screen filter blur-[90px] opacity-70" />
              </div>
            )}

            {canvasBackground === "dark-grid" && (
              <div 
                className="absolute inset-0 bg-slate-950 transition-all duration-500" 
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                  backgroundSize: "24px 24px"
                }}
              />
            )}

            {/* Frost Noise Texture Overlay */}
            {hasNoise && (
              <div 
                className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
              />
            )}

            {/* PREVIEW WIDGET SELECTOR FLOATER */}
            <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-md border border-white/10 p-1 rounded-xl flex gap-1 z-10">
              {(["card", "navbar", "login", "dashboard", "chat"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setPreviewWidgetTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    previewWidgetTab === tab 
                      ? "bg-white text-slate-900 shadow-sm" 
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* RENDER ACTIVE PREVIEW WIDGET */}
            <div className={`w-full max-w-lg z-0 ${glass.animated ? "hover:-translate-y-2 hover:scale-[1.01]" : ""} transition-all duration-300`}>
              
              {/* CARD PREVIEW */}
              {previewWidgetTab === "card" && (
                <div style={glassStyleObject} className="p-8 rounded-2xl text-white relative overflow-hidden group">
                  {glass.shine && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                  )}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-widest text-white/60 font-semibold font-mono">Premium Frost Card</span>
                      <Grid3X3 size={20} className="text-white/80" />
                    </div>
                    <div className="pt-4 space-y-1">
                      <div className="text-2xl font-bold tracking-tight">Frosted Interactive Shell</div>
                      <div className="text-sm text-white/70">A beautiful combination of opacity, saturation, and refractive edges. Hover to see transitions.</div>
                    </div>
                    <div className="pt-6 flex justify-between items-center text-xs font-mono text-white/50">
                      <span>BLUR: {glass.blur}px</span>
                      <span>SATURATE: {glass.saturation}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* NAVBAR PREVIEW */}
              {previewWidgetTab === "navbar" && (
                <div style={glassStyleObject} className="px-6 py-4 rounded-xl text-white relative overflow-hidden flex items-center justify-between">
                  <div className="font-bold text-sm tracking-wider flex items-center gap-1.5">
                    <Sparkles size={16} className="text-[#518231]" /> NEXUS.IO
                  </div>
                  <div className="flex gap-4 text-xs font-semibold text-white/80">
                    <span className="hover:text-white cursor-pointer">Product</span>
                    <span className="hover:text-white cursor-pointer">Features</span>
                    <span className="hover:text-white cursor-pointer">Pricing</span>
                  </div>
                  <button className="px-3.5 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors">
                    Login
                  </button>
                </div>
              )}

              {/* LOGIN PREVIEW */}
              {previewWidgetTab === "login" && (
                <div style={glassStyleObject} className="p-6 rounded-2xl text-white space-y-4 max-w-sm mx-auto">
                  <h4 className="text-lg font-bold">Access Panel</h4>
                  <p className="text-xs text-white/75">Sign in to save design history assets.</p>
                  
                  <div className="space-y-3">
                    <input 
                      type="text" 
                      placeholder="Username / Email"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-xs placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                    />
                    <input 
                      type="password" 
                      placeholder="Password"
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-xs placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-white/40"
                    />
                  </div>

                  <button className="w-full py-2 bg-white text-slate-900 font-bold text-xs rounded-xl hover:bg-slate-100 transition-colors">
                    Continue Securely
                  </button>
                </div>
              )}

              {/* DASHBOARD STATS PREVIEW */}
              {previewWidgetTab === "dashboard" && (
                <div style={glassStyleObject} className="p-6 rounded-2xl text-white space-y-5">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-wider font-bold text-white/60">Analytical Dashboard</span>
                    <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-[10px] font-mono">Live</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center space-y-1">
                      <div className="text-[10px] text-white/50 uppercase">CPU Load</div>
                      <div className="text-lg font-bold font-mono">24%</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center space-y-1">
                      <div className="text-[10px] text-white/50 uppercase">Requests</div>
                      <div className="text-lg font-bold font-mono">4.8k</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center space-y-1">
                      <div className="text-[10px] text-white/50 uppercase">Latency</div>
                      <div className="text-lg font-bold font-mono">14ms</div>
                    </div>
                  </div>
                </div>
              )}

              {/* CHAT MESSAGING PREVIEW */}
              {previewWidgetTab === "chat" && (
                <div style={glassStyleObject} className="p-4 rounded-2xl text-white space-y-4 max-w-sm mx-auto">
                  <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white/90">Customer Support Chat</span>
                  </div>
                  <div className="space-y-3 h-28 overflow-y-auto pr-1 text-xs">
                    <div className="bg-white/10 border border-white/10 rounded-lg p-2 max-w-[80%]">
                      Hello! How can I help you style your backdrop parameters today?
                    </div>
                    <div className="bg-[#518231]/30 border border-[#518231]/40 rounded-lg p-2 max-w-[80%] ml-auto text-right">
                      I need a Fluent UI Acrylic code.
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs placeholder-white/40 focus:outline-none"
                    />
                    <button className="p-1.5 rounded-lg bg-white text-slate-900 hover:bg-slate-100 transition-colors">
                      <Send size={12} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ACCESSIBILITY & CONTRAST STATS BOX */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Contrast size={16} className="text-[#518231]" /> Accessibility & Performance Check
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Contrast rating */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">WCAG 2.1 Contrast Estimate:</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    contrastCalculations.w3cRating.includes("AAA") 
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                      : contrastCalculations.w3cRating.includes("AA")
                      ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                      : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                  }`}>
                    {contrastCalculations.w3cRating}
                  </span>
                </div>
                
                <div className="space-y-1 font-mono text-xs">
                  <div className="flex justify-between">
                    <span>Contrast with White:</span>
                    <span>{contrastCalculations.whiteScore}:1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contrast with Black:</span>
                    <span>{contrastCalculations.blackScore}:1</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                    <span>Recommended overlay:</span>
                    <span className="font-bold text-[#518231]">{contrastCalculations.preferredText}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-2">{contrastCalculations.complianceAdvice}</p>
              </div>

              {/* Performance alerts */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
                <span className="text-xs font-semibold text-slate-500 block">Performance Factors:</span>
                {performanceWarnings.length > 0 ? (
                  <ul className="space-y-2">
                    {performanceWarnings.map((warn, idx) => (
                      <li key={idx} className="flex gap-2 items-start text-[11px] text-slate-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1" />
                        <span>{warn}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex gap-2 items-center text-xs text-emerald-500 font-semibold py-2">
                    <CheckCircle size={16} /> Fast shader config. Light rendering footprint.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* EXPORTER CODE TABS */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-2 justify-between items-center">
              <div className="flex gap-1">
                {(["css", "tailwind", "tailwind-config", "scss", "json"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCodeExportTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                      codeExportTab === tab 
                        ? "bg-[#518231]/10 text-[#518231]" 
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {tab === "tailwind-config" ? "Tailwind Config" : tab}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const text = 
                      codeExportTab === "css" ? cssCodeString :
                      codeExportTab === "tailwind" ? tailwindClasses :
                      codeExportTab === "tailwind-config" ? tailwindConfigSnippet :
                      codeExportTab === "scss" ? scssCodeString : jsonCodeString;
                    handleCopyText(text);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-all"
                >
                  {copiedText ? <CheckCircle size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  {copiedText ? "Copied!" : "Copy Code"}
                </button>
                <button
                  onClick={triggerDownloadSvg}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-all"
                  title="Export styled component as SVG vector"
                >
                  <Download size={12} />
                  <span>SVG</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-950">
              <pre className="text-xs text-slate-300 font-mono overflow-x-auto p-2 leading-relaxed custom-scrollbar">
                <code>
                  {codeExportTab === "css" && cssCodeString}
                  {codeExportTab === "tailwind" && tailwindClasses}
                  {codeExportTab === "tailwind-config" && tailwindConfigSnippet}
                  {codeExportTab === "scss" && scssCodeString}
                  {codeExportTab === "json" && jsonCodeString}
                </code>
              </pre>
            </div>
          </div>

          {/* LOCAL HISTORY LOG */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Undo size={16} className="text-[#518231]" /> Setup History
              </h3>
              {recentGlass.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="text-xs text-rose-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 size={12} /> Clear Log
                </button>
              )}
            </div>

            {recentGlass.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {recentGlass.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => loadSavedGlass(item)}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-mono transition-all flex items-center gap-1"
                  >
                    <div className="w-2.5 h-2.5 rounded-full border border-slate-300" style={{ backgroundColor: item.config.bgColor }} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic">No historical changes recorded. Select controls to store.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
