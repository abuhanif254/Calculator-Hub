"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { 
  Copy, 
  Download, 
  RefreshCw, 
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
  Star, 
  Laptop, 
  Shuffle,
  Lock,
  Unlock,
  Settings,
  Info,
  CheckSquare,
  AlertTriangle,
  XCircle,
  Undo,
  Heart
} from "lucide-react";
import { Link } from "../../../../i18n/routing";
import { addToHistory as addToGlobalHistory } from "../../../../lib/hooks/useToolHistory";

// --- Types ---
interface ColorShade {
  shade: number; // 50, 100, 200, ... 950
  hex: string;
  isBase: boolean;
  whiteContrast: number;
  blackContrast: number;
  whitePassAA: boolean;
  blackPassAA: boolean;
}

interface PaletteSet {
  name: string;
  baseColor: string;
  shades: ColorShade[];
}

interface SavedTheme {
  id: string;
  name: string;
  paletteColors: Record<string, string>;
  timestamp: number;
}

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

// Relative Luminance for WCAG Contrast
function getRelativeLuminance(r: number, g: number, b: number): number {
  const transform = (val: number) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

function getContrastRatio(rgb1: {r: number, g: number, b: number}, rgb2: {r: number, g: number, b: number}): number {
  const l1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

const checkerboardStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Crect width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' width='4' height='4' fill='%23e2e8f0'/%3E%3Crect y='4' width='4' height='4' fill='%23e2e8f0'/%3E%3C/svg%3E")`,
};

// --- Presets ---
const PRESETS = [
  {
    name: "Modern SaaS (Indigo)",
    colors: {
      primary: "#4f46e5", // Indigo
      secondary: "#06b6d4", // Cyan
      accent: "#f43f5e", // Rose
      neutral: "#64748b", // Slate
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
      info: "#3b82f6"
    }
  },
  {
    name: "Cyberpunk Neon",
    colors: {
      primary: "#d946ef", // Fuchsia
      secondary: "#06b6d4", // Cyan
      accent: "#eab308", // Yellow
      neutral: "#475569", // Slate
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
      info: "#3b82f6"
    }
  },
  {
    name: "Grayscale Minimal",
    colors: {
      primary: "#1e293b", // Slate
      secondary: "#475569", // Cool gray
      accent: "#64748b", // Light slate
      neutral: "#334155", // Neutral gray
      success: "#059669",
      warning: "#d97706",
      danger: "#dc2626",
      info: "#2563eb"
    }
  },
  {
    name: "Gaming Laser",
    colors: {
      primary: "#10b981", // Emerald
      secondary: "#ef4444", // Red
      accent: "#f59e0b", // Amber
      neutral: "#3f3f46", // Zinc
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
      info: "#3b82f6"
    }
  },
  {
    name: "Finance Pro",
    colors: {
      primary: "#0284c7", // Sky
      secondary: "#10b981", // Emerald
      accent: "#8b5cf6", // Violet
      neutral: "#4b5563", // Gray
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
      info: "#3b82f6"
    }
  },
  {
    name: "Sunset Brand",
    colors: {
      primary: "#ea580c", // Orange
      secondary: "#eab308", // Yellow
      accent: "#ec4899", // Pink
      neutral: "#57534e", // Stone
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
      info: "#3b82f6"
    }
  }
];

const TARGET_SHADES = [
  { shade: 50, l: 97 },
  { shade: 100, l: 93 },
  { shade: 200, l: 85 },
  { shade: 300, l: 75 },
  { shade: 400, l: 63 },
  { shade: 500, l: 50 },
  { shade: 600, l: 40 },
  { shade: 700, l: 30 },
  { shade: 800, l: 20 },
  { shade: 900, l: 12 },
  { shade: 950, l: 6 }
];

export function TailwindColorPaletteTool() {
  const [mounted, setMounted] = useState(false);

  // --- Multi-Palette Base Colors ---
  const [paletteColors, setPaletteColors] = useState<Record<string, string>>({
    primary: "#3b82f6", // Default Tailwind Blue
    secondary: "#6366f1", // Default Indigo
    accent: "#ec4899", // Default Pink
    neutral: "#64748b", // Default Slate
    success: "#10b981", // Green
    warning: "#f59e0b", // Amber
    danger: "#ef4444", // Red
    info: "#06b6d4" // Cyan
  });

  // Renameable semantic keys helper
  const [semanticNames, setSemanticNames] = useState<Record<string, string>>({
    primary: "Primary Brand",
    secondary: "Secondary",
    accent: "Accent / Highlight",
    neutral: "Neutral Backgrounds",
    success: "Success State",
    warning: "Warning Alert",
    danger: "Danger State",
    info: "Info Bubble"
  });

  const [lockPalette, setLockPalette] = useState<Record<string, boolean>>({
    primary: false,
    secondary: false,
    accent: false,
    neutral: false,
    success: false,
    warning: false,
    danger: false,
    info: false
  });

  const [activeTab, setActiveTab] = useState<string>("primary");
  const [previewTab, setPreviewTab] = useState<"scale" | "uikit" | "widgets" | "alerts">("scale");
  const [exportFormat, setExportFormat] = useState<"tailwind" | "tailwind4" | "css" | "scss" | "json">("tailwind");
  
  // Visual states
  const [selectedShadeVal, setSelectedShadeVal] = useState<number>(500);
  const [copiedShade, setCopiedShade] = useState<string | null>(null);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [darkPreviewMode, setDarkPreviewMode] = useState(false);

  // Form input bindings
  const [hexInput, setHexInput] = useState(paletteColors.primary);
  const [rInput, setRInput] = useState("59");
  const [gInput, setGInput] = useState("130");
  const [bInput, setBInput] = useState("246");
  const [hInput, setHInput] = useState("217");
  const [sInput, setSInput] = useState("91");
  const [lInput, setLInput] = useState("60");

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // History & Favorites
  const [recentThemes, setRecentThemes] = useState<SavedTheme[]>([]);
  const [favorites, setFavorites] = useState<SavedTheme[]>([]);
  const [randomThemeMode, setRandomThemeMode] = useState<"any" | "neon" | "pastel" | "dark">("any");
  const [isThemeFavorite, setIsThemeFavorite] = useState(false);

  // --- Setup on Mount ---
  useEffect(() => {
    setMounted(true);
    addToGlobalHistory({ slug: "tailwind-color-palette", title: "Tailwind Color Palette Generator", type: "tool" });

    // Load LocalStorage Cache
    const historySaved = localStorage.getItem("nexus_palette_history");
    if (historySaved) {
      try { setRecentThemes(JSON.parse(historySaved)); } catch (e) {}
    }
    const favsSaved = localStorage.getItem("nexus_palette_favorites");
    if (favsSaved) {
      try { setFavorites(JSON.parse(favsSaved)); } catch (e) {}
    }
  }, []);

  // --- Shade Generator Logic ---
  const generateShades = (baseHex: string): ColorShade[] => {
    const baseRgb = hexToRgb(baseHex);
    const { h, s, l } = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);

    // Find closest target lightness to locate where the base color belongs
    let baseIdx = 5; // Default to 500 index
    let minDiff = 100;
    TARGET_SHADES.forEach((target, index) => {
      const diff = Math.abs(target.l - l);
      if (diff < minDiff) {
        minDiff = diff;
        baseIdx = index;
      }
    });

    const whiteRgb = { r: 255, g: 255, b: 255 };
    const blackRgb = { r: 15, g: 23, b: 42 };

    return TARGET_SHADES.map((target, idx) => {
      let hex = baseHex;
      let isBase = false;

      if (idx === baseIdx) {
        hex = baseHex;
        isBase = true;
      } else if (idx < baseIdx) {
        // Lighter shades: interpolate from white-end to base color
        const t = idx / baseIdx;
        const targetL = 98 - (98 - l) * t;
        const targetS = 10 + (s - 10) * t;
        const rgb = hslToRgb(h, targetS, targetL);
        hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      } else {
        // Darker shades: interpolate from base color to dark-end
        const t = (idx - baseIdx) / (10 - baseIdx);
        const targetL = l - (l - 5) * t;
        const targetS = s - (s - 25) * t;
        // Shift hue slightly to keep dark values cool/rich
        const shiftedH = (h + t * 4) % 360;
        const rgb = hslToRgb(shiftedH, targetS, targetL);
        hex = rgbToHex(rgb.r, rgb.g, rgb.b);
      }

      // Accessibility checks
      const shadeRgb = hexToRgb(hex);
      const whiteContrast = Number(getContrastRatio(shadeRgb, whiteRgb).toFixed(2));
      const blackContrast = Number(getContrastRatio(shadeRgb, blackRgb).toFixed(2));

      return {
        shade: target.shade,
        hex,
        isBase,
        whiteContrast,
        blackContrast,
        whitePassAA: whiteContrast >= 4.5,
        blackPassAA: blackContrast >= 4.5,
      };
    });
  };

  // Compile all generated shades for all tabs
  const generatedPalettes = useMemo<Record<string, ColorShade[]>>(() => {
    const result: Record<string, ColorShade[]> = {};
    Object.entries(paletteColors).forEach(([key, color]) => {
      result[key] = generateShades(color);
    });
    return result;
  }, [paletteColors]);

  const activeShadesList = useMemo(() => {
    return generatedPalettes[activeTab] || generatedPalettes.primary;
  }, [generatedPalettes, activeTab]);

  const activeShade = useMemo(() => {
    return activeShadesList.find(s => s.shade === selectedShadeVal) || activeShadesList[5];
  }, [activeShadesList, selectedShadeVal]);

  // Sync textbox fields with activeTab baseColor changes
  useEffect(() => {
    const currentBaseColor = paletteColors[activeTab];
    if (!currentBaseColor) return;
    
    if (focusedInput !== "hex") {
      setHexInput(currentBaseColor);
    }
    const rgb = hexToRgb(currentBaseColor);
    if (!focusedInput?.startsWith("rgb-")) {
      setRInput(rgb.r.toString());
      setGInput(rgb.g.toString());
      setBInput(rgb.b.toString());
    }
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    if (!focusedInput?.startsWith("hsl-")) {
      setHInput(hsl.h.toString());
      setSInput(hsl.s.toString());
      setLInput(hsl.l.toString());
    }
  }, [activeTab, paletteColors, focusedInput]);

  // --- Auto-generate Coordinated Brand Harmonies ---
  const recalculateHarmoniesFromPrimary = (primaryHex: string) => {
    const baseRgb = hexToRgb(primaryHex);
    const { h, s, l } = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);

    const generateHex = (nh: number, ns: number, nl: number) => {
      const rgb = hslToRgb(nh, ns, nl);
      return rgbToHex(rgb.r, rgb.g, rgb.b);
    };

    setPaletteColors(prev => {
      const nextColors = { ...prev };
      nextColors.primary = primaryHex;

      if (!lockPalette.secondary) {
        nextColors.secondary = generateHex((h + 30) % 360, s, l);
      }
      if (!lockPalette.accent) {
        nextColors.accent = generateHex((h + 150) % 360, s, l);
      }
      if (!lockPalette.neutral) {
        nextColors.neutral = generateHex(h, clamp(s * 0.12, 4, 12), clamp(l * 1.05, 45, 55));
      }
      if (!lockPalette.success) {
        nextColors.success = generateHex(142, 72, 45); // Emerald-500 equivalent
      }
      if (!lockPalette.warning) {
        nextColors.warning = generateHex(38, 92, 50); // Amber-500 equivalent
      }
      if (!lockPalette.danger) {
        nextColors.danger = generateHex(0, 84, 55); // Red-500 equivalent
      }
      if (!lockPalette.info) {
        nextColors.info = generateHex(200, 85, 48); // Cyan-500 equivalent
      }

      return nextColors;
    });
  };

  // --- Input Change Handlers ---
  const handleHexInputChange = (val: string) => {
    setHexInput(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      if (activeTab === "primary") {
        recalculateHarmoniesFromPrimary(val);
      } else {
        setPaletteColors(prev => ({ ...prev, [activeTab]: val }));
      }
      triggerSaveHistory();
    }
  };

  const handleRgbInputChange = (channel: "r" | "g" | "b", valStr: string) => {
    if (channel === "r") setRInput(valStr);
    if (channel === "g") setGInput(valStr);
    if (channel === "b") setBInput(valStr);

    const val = parseInt(valStr, 10);
    if (isNaN(val)) return;

    const baseHex = paletteColors[activeTab];
    const rgb = hexToRgb(baseHex);
    const r = channel === "r" ? clamp(val, 0, 255) : rgb.r;
    const g = channel === "g" ? clamp(val, 0, 255) : rgb.g;
    const b = channel === "b" ? clamp(val, 0, 255) : rgb.b;

    const nextHex = rgbToHex(r, g, b);
    if (activeTab === "primary") {
      recalculateHarmoniesFromPrimary(nextHex);
    } else {
      setPaletteColors(prev => ({ ...prev, [activeTab]: nextHex }));
    }
    triggerSaveHistory();
  };

  const handleHslInputChange = (channel: "h" | "s" | "l", valStr: string) => {
    if (channel === "h") setHInput(valStr);
    if (channel === "s") setSInput(valStr);
    if (channel === "l") setLInput(valStr);

    const val = parseInt(valStr, 10);
    if (isNaN(val)) return;

    const baseHex = paletteColors[activeTab];
    const rgb = hexToRgb(baseHex);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const h = channel === "h" ? clamp(val, 0, 360) : hsl.h;
    const s = channel === "s" ? clamp(val, 0, 100) : hsl.s;
    const l = channel === "l" ? clamp(val, 0, 100) : hsl.l;

    const newRgb = hslToRgb(h, s, l);
    const nextHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    if (activeTab === "primary") {
      recalculateHarmoniesFromPrimary(nextHex);
    } else {
      setPaletteColors(prev => ({ ...prev, [activeTab]: nextHex }));
    }
    triggerSaveHistory();
  };

  // --- Lock toggles ---
  const toggleLock = (key: string) => {
    setLockPalette(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // --- Preset Theme Loader ---
  const loadPreset = (presetColors: Record<string, string>) => {
    setPaletteColors({ ...presetColors });
    setActiveTab("primary");
    triggerSaveHistory();
  };

  // --- Copy Handlers ---
  const handleCopyText = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "shade") {
        setCopiedShade(text);
        setTimeout(() => setCopiedShade(null), 2000);
      } else {
        setCopiedConfig(true);
        setTimeout(() => setCopiedConfig(false), 2000);
      }
    });
  };

  // --- History & Favorites Cache ---
  const triggerSaveHistory = () => {
    const newTheme: SavedTheme = {
      id: Date.now().toString(),
      name: `Theme ${paletteColors.primary}-${paletteColors.secondary}`.replace(/#/g, "").slice(0, 16),
      paletteColors: { ...paletteColors },
      timestamp: Date.now()
    };

    setRecentThemes(prev => {
      const filtered = prev.filter(item => JSON.stringify(item.paletteColors) !== JSON.stringify(paletteColors));
      const updated = [newTheme, ...filtered].slice(0, 10);
      localStorage.setItem("nexus_palette_history", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavoriteTheme = () => {
    const currentFav: SavedTheme = {
      id: Date.now().toString(),
      name: `Theme ${paletteColors.primary}`.replace(/#/g, "").slice(0, 16),
      paletteColors: { ...paletteColors },
      timestamp: Date.now()
    };

    setFavorites(prev => {
      const exists = prev.some(item => JSON.stringify(item.paletteColors) === JSON.stringify(paletteColors));
      let updated;
      if (exists) {
        updated = prev.filter(item => JSON.stringify(item.paletteColors) !== JSON.stringify(paletteColors));
        setIsThemeFavorite(false);
      } else {
        updated = [currentFav, ...prev];
        setIsThemeFavorite(true);
      }
      localStorage.setItem("nexus_palette_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const exists = favorites.some(item => JSON.stringify(item.paletteColors) === JSON.stringify(paletteColors));
    setIsThemeFavorite(exists);
  }, [paletteColors, favorites]);

  const loadSavedTheme = (saved: SavedTheme) => {
    setPaletteColors({ ...saved.paletteColors });
    setActiveTab("primary");
  };

  const clearHistory = () => {
    setRecentThemes([]);
    localStorage.removeItem("nexus_palette_history");
  };

  // --- Smart Randomizer ---
  const handleRandomizePalettes = () => {
    const getRandomHex = () => {
      let h = Math.floor(Math.random() * 360);
      let s = 80;
      let l = 50;

      if (randomThemeMode === "pastel") {
        s = Math.floor(Math.random() * 20) + 40; // 40-60
        l = Math.floor(Math.random() * 15) + 75; // 75-90
      } else if (randomThemeMode === "neon") {
        s = 95;
        l = 50;
      } else if (randomThemeMode === "dark") {
        s = Math.floor(Math.random() * 30) + 50; // 50-80
        l = Math.floor(Math.random() * 15) + 15; // 15-30
      }

      const rgb = hslToRgb(h, s, l);
      return rgbToHex(rgb.r, rgb.g, rgb.b);
    };

    const primaryHex = getRandomHex();
    recalculateHarmoniesFromPrimary(primaryHex);
    triggerSaveHistory();
  };

  // --- EyeDropper integration ---
  const handleEyeDropper = () => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      const EyeDropperConstructor = (window as any).EyeDropper;
      const eyeDropper = new EyeDropperConstructor();
      eyeDropper.open()
        .then((result: { srgbHex: string }) => {
          handleHexInputChange(result.srgbHex);
        })
        .catch(() => {});
    }
  };

  // --- PNG Swatches Canvas Downloader ---
  const handleDownloadPNG = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Background
    ctx.fillStyle = darkPreviewMode ? "#0f172a" : "#f8fafc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = darkPreviewMode ? "#ffffff" : "#0f172a";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("Nexus Tailwind Color Palette", 50, 60);

    // Draw active palette swatches
    const startX = 50;
    const startY = 120;
    const rowHeight = 80;
    const swatchWidth = 100;

    let currentY = startY;

    Object.entries(generatedPalettes).forEach(([key, shades]) => {
      // Label name
      ctx.fillStyle = darkPreviewMode ? "#94a3b8" : "#475569";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText(semanticNames[key].toUpperCase(), startX, currentY + 30);

      // Swatches loop
      shades.forEach((s, idx) => {
        const x = startX + 250 + (idx * swatchWidth);
        const y = currentY;

        ctx.fillStyle = s.hex;
        ctx.fillRect(x, y, swatchWidth - 10, 50);

        ctx.fillStyle = darkPreviewMode ? "#cbd5e1" : "#334155";
        ctx.font = "10px monospace";
        ctx.fillText(s.shade.toString(), x, y + 65);
        ctx.fillText(s.hex, x, y + 78);
      });

      currentY += rowHeight + 10;
    });

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "nexus-tailwind-palette.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Exporters Compilation Strings ---
  const tailwindConfigOutput = useMemo(() => {
    const formatted = Object.entries(generatedPalettes).map(([name, shades]) => {
      const shadesObj = shades.map(s => `        ${s.shade}: "${s.hex}",`).join("\n");
      return `      ${name}: {\n${shadesObj}\n      },`;
    }).join("\n");

    return `// tailwind.config.js\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: {\n${formatted}\n      }\n    }\n  }\n}`;
  }, [generatedPalettes]);

  const tailwind4Output = useMemo(() => {
    const formatted = Object.entries(generatedPalettes).map(([name, shades]) => {
      return shades.map(s => `  --color-${name}-${s.shade}: ${s.hex};`).join("\n");
    }).join("\n\n");

    return `/* tailwind v4 CSS @theme */\n@theme {\n${formatted}\n}`;
  }, [generatedPalettes]);

  const cssVariablesOutput = useMemo(() => {
    const formatted = Object.entries(generatedPalettes).map(([name, shades]) => {
      return shades.map(s => `  --color-${name}-${s.shade}: ${s.hex};`).join("\n");
    }).join("\n\n");

    return `:root {\n${formatted}\n}`;
  }, [generatedPalettes]);

  const scssVariablesOutput = useMemo(() => {
    return Object.entries(generatedPalettes).map(([name, shades]) => {
      return shades.map(s => `$${name}-${s.shade}: ${s.hex};`).join("\n");
    }).join("\n\n");
  }, [generatedPalettes]);

  const jsonOutput = useMemo(() => {
    const tokenObj: Record<string, Record<number, string>> = {};
    Object.entries(generatedPalettes).forEach(([name, shades]) => {
      tokenObj[name] = {};
      shades.forEach(s => {
        tokenObj[name][s.shade] = s.hex;
      });
    });
    return JSON.stringify(tokenObj, null, 2);
  }, [generatedPalettes]);

  // Derived color mappings for component previews
  const uiTheme = useMemo(() => {
    const p = generatedPalettes.primary;
    const s = generatedPalettes.secondary;
    const a = generatedPalettes.accent;
    const n = generatedPalettes.neutral;
    const ok = generatedPalettes.success;
    const warn = generatedPalettes.warning;
    const err = generatedPalettes.danger;
    const inf = generatedPalettes.info;

    return {
      p50: p[0].hex, p100: p[1].hex, p200: p[2].hex, p300: p[3].hex, p400: p[4].hex, p500: p[5].hex, p600: p[6].hex, p700: p[7].hex, p800: p[8].hex, p900: p[9].hex, p950: p[10].hex,
      s50: s[0].hex, s100: s[1].hex, s200: s[2].hex, s500: s[5].hex, s600: s[6].hex, s700: s[7].hex,
      a500: a[5].hex, a600: a[6].hex, a50: a[0].hex,
      n50: n[0].hex, n100: n[1].hex, n200: n[2].hex, n300: n[3].hex, n800: n[7].hex, n900: n[8].hex, n950: n[9].hex,
      ok50: ok[0].hex, ok500: ok[5].hex, ok800: ok[7].hex,
      warn50: warn[0].hex, warn500: warn[5].hex, warn800: warn[7].hex,
      err50: err[0].hex, err500: err[5].hex, err800: err[7].hex,
      inf50: inf[0].hex, inf500: inf[5].hex, inf800: inf[7].hex
    };
  }, [generatedPalettes]);

  // Color relationships list (analogous, complements, triadic etc.)
  const harmoniesList = useMemo(() => {
    const primaryHex = paletteColors.primary;
    const baseRgb = hexToRgb(primaryHex);
    const { h, s, l } = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);

    const getHex = (nh: number) => {
      const rgb = hslToRgb(nh, s, l);
      return rgbToHex(rgb.r, rgb.g, rgb.b);
    };

    return [
      { name: "Complementary", desc: "180° opposite shade", colors: [primaryHex, getHex((h + 180) % 360)] },
      { name: "Analogous", desc: "30° adjacent shades", colors: [getHex((h - 30 + 360) % 360), primaryHex, getHex((h + 30) % 360)] },
      { name: "Triadic", desc: "120° equidistant wheel", colors: [primaryHex, getHex((h + 120) % 360), getHex((h + 240) % 360)] },
      { name: "Split Complementary", desc: "Adjacent complement bounds", colors: [primaryHex, getHex((h + 150) % 360), getHex((h + 210) % 360)] },
    ];
  }, [paletteColors.primary]);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500">
        <RefreshCw size={24} className="animate-spin mr-2" /> Initializing Palette Workspace...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-10 text-slate-800 dark:text-slate-200">
      
      {/* SECTION 1: Editor Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Editor Controls (5/12 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Base Color controls & pickers */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders size={16} /> Base Color Configuration
            </h3>

            {/* Sub-palette tabs */}
            <div className="grid grid-cols-4 gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
              {["primary", "secondary", "accent", "neutral", "success", "warning", "danger", "info"].map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); }}
                  className={`py-1.5 px-0.5 text-[10px] font-bold rounded-lg capitalize transition-all flex items-center justify-center gap-1 ${activeTab === tab ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: paletteColors[tab] }} />
                  {tab}
                </button>
              ))}
            </div>

            {/* Renaming option for semantic names */}
            <div className="space-y-1">
              <label htmlFor="semantic-name-input" className="text-[10px] font-bold text-slate-400 uppercase">Semantic Label</label>
              <input
                id="semantic-name-input"
                type="text"
                value={semanticNames[activeTab]}
                onChange={(e) => setSemanticNames(prev => ({ ...prev, [activeTab]: e.target.value }))}
                className="w-full text-xs py-1.5 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
              />
            </div>

            {/* Lock Control */}
            <div className="flex justify-between items-center bg-white dark:bg-slate-800/20 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 text-xs">
              <span className="text-slate-500">Lock Palette from Auto-Harmonization:</span>
              <button
                onClick={() => toggleLock(activeTab)}
                className={`py-1 px-3 rounded-lg font-bold transition-all flex items-center gap-1.5 ${lockPalette[activeTab] ? 'bg-red-50 dark:bg-red-950/20 text-red-500' : 'bg-green-50 dark:bg-green-950/20 text-green-600'}`}
              >
                {lockPalette[activeTab] ? <Lock size={12} /> : <Unlock size={12} />}
                {lockPalette[activeTab] ? "Locked" : "Unlocked"}
              </button>
            </div>

            {/* Form Color Input values */}
            <div className="grid grid-cols-12 gap-3 items-center pt-2">
              {/* Native color picker */}
              <div 
                className="col-span-2 relative h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 hover:scale-105 transition-all shadow-inner"
                style={checkerboardStyle}
              >
                <input
                  type="color"
                  value={paletteColors[activeTab]}
                  onChange={(e) => handleHexInputChange(e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: paletteColors[activeTab] }} />
              </div>

              {/* Text inputs */}
              <div className="col-span-8 grid grid-cols-3 gap-2">
                <div className="space-y-0.5">
                  <label htmlFor="hex-input" className="text-[9px] font-bold text-slate-400 uppercase">HEX</label>
                  <input
                    id="hex-input"
                    type="text"
                    value={hexInput}
                    onChange={(e) => handleHexInputChange(e.target.value)}
                    onFocus={() => setFocusedInput("hex")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full text-xs font-mono py-1 px-1.5 bg-white dark:bg-slate-800 border rounded text-center uppercase"
                  />
                </div>
                <div className="space-y-0.5">
                  <label htmlFor="rgb-input" className="text-[9px] font-bold text-slate-400 uppercase">RGB</label>
                  <input
                    id="rgb-input"
                    type="text"
                    value={`${rInput},${gInput},${bInput}`}
                    onChange={(e) => {
                      const parts = e.target.value.split(",");
                      if (parts.length === 3) {
                        handleRgbInputChange("r", parts[0]);
                        handleRgbInputChange("g", parts[1]);
                        handleRgbInputChange("b", parts[2]);
                      }
                    }}
                    onFocus={() => setFocusedInput("rgb-all")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full text-[10px] font-mono py-1 px-1 bg-white dark:bg-slate-800 border rounded text-center"
                  />
                </div>
                <div className="space-y-0.5">
                  <label htmlFor="hsl-input" className="text-[9px] font-bold text-slate-400 uppercase">HSL</label>
                  <input
                    id="hsl-input"
                    type="text"
                    value={`${hInput}°,${sInput}%,${lInput}%`}
                    onChange={(e) => {
                      const parts = e.target.value.replace(/%/g, "").replace(/°/g, "").split(",");
                      if (parts.length === 3) {
                        handleHslInputChange("h", parts[0]);
                        handleHslInputChange("s", parts[1]);
                        handleHslInputChange("l", parts[2]);
                      }
                    }}
                    onFocus={() => setFocusedInput("hsl-all")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full text-[10px] font-mono py-1 px-1 bg-white dark:bg-slate-800 border rounded text-center"
                  />
                </div>
              </div>

              {/* Eye dropper */}
              <div className="col-span-2">
                <button
                  onClick={handleEyeDropper}
                  className="w-full h-10 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border rounded-lg flex items-center justify-center transition-colors text-slate-500"
                  title="EyeDropper API (Chrome/Edge)"
                >
                  <Palette size={16} />
                </button>
              </div>

            </div>

            {/* Smart Randomizer */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
              <select
                value={randomThemeMode}
                onChange={(e) => setRandomThemeMode(e.target.value as any)}
                className="text-xs px-2 bg-white dark:bg-slate-800 border rounded-lg cursor-pointer"
              >
                <option value="any">Any Style</option>
                <option value="neon">Neon Vibe</option>
                <option value="pastel">Pastel Colors</option>
                <option value="dark">Dark Theme</option>
              </select>
              
              <button
                onClick={handleRandomizePalettes}
                className="flex-1 py-2 px-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold transition-all hover:bg-slate-800 dark:hover:bg-slate-100 flex items-center justify-center gap-1.5"
              >
                <Shuffle size={14} /> Generate Random theme
              </button>
            </div>

          </div>

          {/* Color Harmonies Suggestions (complements, analogs, triads) */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Base Color Relationships</h3>
            <p className="text-[11px] text-slate-500">Click any color bubble below to replace the primary base brand color.</p>

            <div className="space-y-3">
              {harmoniesList.map((harmony, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white dark:bg-slate-800/30 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800">
                  <div>
                    <span className="text-xs font-bold block">{harmony.name}</span>
                    <span className="text-[10px] text-slate-400">{harmony.desc}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {harmony.colors.map((color, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => {
                          recalculateHarmoniesFromPrimary(color);
                          triggerSaveHistory();
                        }}
                        className="w-8 h-8 rounded-full border border-slate-200 shadow-sm hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                        title={`Click to set as base: ${color}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right column: Previews, Kit & Config Exporter (7/12 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Main Showcase Panel (Swatches, Kit, Widgets, Alerts previews) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col relative">
            
            {/* Header Preview Toolbar */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                {(["scale", "uikit", "widgets", "alerts"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setPreviewTab(tab)}
                    className={`py-1 px-3 text-[10px] font-bold rounded-md capitalize transition-all ${previewTab === tab ? 'bg-white dark:bg-slate-700 text-[#518231] dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {tab === "scale" ? "Color Swatches" : tab === "uikit" ? "UI Kit Components" : tab === "widgets" ? "Widgets Dashboard" : "Semantic Alerts"}
                  </button>
                ))}
              </div>

              {/* Dark mode simulation toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDarkPreviewMode(!darkPreviewMode)}
                  className={`p-2 rounded-lg border transition-all ${darkPreviewMode ? 'bg-slate-800 border-slate-700 text-yellow-400' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                  title="Simulate Dark UI Mode"
                >
                  {darkPreviewMode ? <Sun size={14} /> : <Moon size={14} />}
                </button>
                <button
                  onClick={toggleFavoriteTheme}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 p-2 rounded-lg text-slate-500 transition-colors"
                  title={isThemeFavorite ? "Remove Theme Bookmark" : "Save Theme Bookmark"}
                >
                  <Heart size={14} fill={isThemeFavorite ? "#ef4444" : "none"} className={isThemeFavorite ? "text-red-500 scale-105" : ""} />
                </button>
              </div>
            </div>

            {/* Preview Stage Area */}
            <div className={`p-6 min-h-[360px] transition-colors duration-300 ${darkPreviewMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
              
              {/* TAB 1: Visual Color Scale Swatches with accessibility ratings */}
              {previewTab === "scale" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider">{semanticNames[activeTab]} Scale</h4>
                      <span className="text-xs text-slate-400">Click swatch to copy hex code</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-11 gap-1 sm:gap-2">
                    {activeShadesList.map((s, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleCopyText(s.hex, "shade")}
                        className="group flex flex-col items-center gap-1.5 focus:outline-none"
                      >
                        <div 
                          className={`w-full h-16 sm:h-20 rounded-xl relative shadow-sm border border-slate-200/40 dark:border-slate-800 overflow-hidden transition-transform group-hover:scale-105 group-hover:shadow-md ${s.shade === selectedShadeVal ? 'ring-2 ring-[#518231]' : ''}`}
                          style={{ backgroundColor: s.hex }}
                        >
                          {s.isBase && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full border border-black/30" title="Input Base Color" />
                          )}
                        </div>
                        <span className="text-[10px] font-bold font-mono">{s.shade}</span>
                        
                        {/* Accessibility conformance indicators */}
                        <div className="flex gap-0.5 text-[8px]">
                          <span className={`w-3.5 h-3.5 rounded flex items-center justify-center font-bold font-mono ${s.whitePassAA ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`} title={`White text contrast: ${s.whiteContrast}:1`}>W</span>
                          <span className={`w-3.5 h-3.5 rounded flex items-center justify-center font-bold font-mono ${s.blackPassAA ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`} title={`Black text contrast: ${s.blackContrast}:1`}>B</span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Copy flash feedback */}
                  {copiedShade && (
                    <div className="bg-green-500 text-white text-xs font-bold text-center py-1.5 rounded-lg animate-pulse">
                      Copied HEX: {copiedShade} to clipboard!
                    </div>
                  )}

                  {/* Accessibility & Contrast details for currently selected shade */}
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-extrabold text-slate-500">Contrast Details for Shade {activeShade.shade} ({activeShade.hex})</span>
                      <div className="flex gap-2">
                        {([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const).map(shadeNum => (
                          <button
                            key={shadeNum}
                            onClick={() => setSelectedShadeVal(shadeNum)}
                            className={`px-1.5 py-0.5 text-[10px] font-mono rounded ${selectedShadeVal === shadeNum ? 'bg-[#518231] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600'}`}
                          >
                            {shadeNum}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>White Text Contrast:</span>
                          <span className="font-mono font-black">{activeShade.whiteContrast}:1</span>
                        </div>
                        <span className={`text-[9px] font-bold px-1 py-0.5 rounded inline-block ${activeShade.whitePassAA ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {activeShade.whitePassAA ? "✓ AA Compliant (Safe)" : "✗ Fails AA Readability"}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Black Text Contrast:</span>
                          <span className="font-mono font-black">{activeShade.blackContrast}:1</span>
                        </div>
                        <span className={`text-[9px] font-bold px-1 py-0.5 rounded inline-block ${activeShade.blackPassAA ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {activeShade.blackPassAA ? "✓ AA Compliant (Safe)" : "✗ Fails AA Readability"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: UI Kit Components preview */}
              {previewTab === "uikit" && (
                <div className="space-y-6">
                  <h4 className="text-sm font-bold uppercase tracking-wider">UI Component Preview Kit</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Buttons block */}
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border space-y-3">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Buttons System</span>
                      <div className="flex flex-col gap-2">
                        <button 
                          className="w-full py-2 text-xs font-bold text-white rounded-lg transition-transform hover:scale-[1.01]"
                          style={{ backgroundColor: uiTheme.p500 }}
                        >
                          Solid Brand Accent
                        </button>
                        <button 
                          className="w-full py-2 text-xs font-bold border rounded-lg transition-colors bg-white hover:bg-slate-50 dark:bg-slate-950"
                          style={{ color: uiTheme.p700, borderColor: uiTheme.p200 }}
                        >
                          Outlined Secondary
                        </button>
                        <button 
                          className="w-full py-2 text-xs font-bold rounded-lg transition-colors"
                          style={{ backgroundColor: uiTheme.p50, color: uiTheme.p800 }}
                        >
                          Subtle Tint Button
                        </button>
                      </div>
                    </div>

                    {/* Form Controls block */}
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border space-y-3">
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Form Elements</span>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <label htmlFor="mock-email-input" className="text-[9px] text-slate-400 uppercase font-bold">Email Address</label>
                          <input
                            id="mock-email-input"
                            type="text"
                            placeholder="admin@nexuscalculator.net"
                            className="w-full text-xs py-1 px-2.5 bg-slate-50 border rounded-lg focus:outline-none focus:ring-1 dark:bg-slate-800"
                            style={{ borderColor: uiTheme.p200 }}
                          />
                        </div>
                        <div className="flex items-center gap-2 pt-1 text-xs">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="rounded"
                            style={{ color: uiTheme.p500 }}
                          />
                          <span>Keep me signed in</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Dashboard Widget Preview */}
              {previewTab === "widgets" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider">SaaS Dashboard Mockup</h4>
                  
                  <div className="border rounded-xl overflow-hidden flex flex-col bg-white dark:bg-slate-900 shadow-lg">
                    {/* Header */}
                    <div 
                      className="p-3 flex items-center justify-between text-white"
                      style={{ backgroundColor: uiTheme.p900 }}
                    >
                      <span className="text-xs font-bold">Nexus Analytics Console</span>
                      <div className="w-6 h-6 rounded-full bg-white/20" />
                    </div>

                    {/* Sidebar + Panel */}
                    <div className="grid grid-cols-12 min-h-48 divide-x divide-slate-100 dark:divide-slate-800">
                      
                      {/* Sidebar */}
                      <div className="col-span-3 p-2 bg-slate-50 dark:bg-slate-950 space-y-1">
                        {["Dashboard", "Reports", "Billing", "Settings"].map((nav, i) => (
                          <div
                            key={i}
                            className="text-[10px] px-2 py-1 rounded font-bold transition-all cursor-pointer"
                            style={i === 0 ? { backgroundColor: uiTheme.p100, color: uiTheme.p900 } : {}}
                          >
                            {nav}
                          </div>
                        ))}
                      </div>

                      {/* Content panel */}
                      <div className="col-span-9 p-3 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          
                          {/* Metric widget */}
                          <div className="p-2 border rounded-lg space-y-1">
                            <span className="text-[8px] text-slate-400 font-bold uppercase">Monthly Billing</span>
                            <div className="text-sm font-black" style={{ color: uiTheme.p700 }}>$14,820</div>
                            <span className="text-[7px] text-green-500">+12.4% vs last mo</span>
                          </div>

                          {/* Metric widget */}
                          <div className="p-2 border rounded-lg space-y-1">
                            <span className="text-[8px] text-slate-400 font-bold uppercase">Active Conversions</span>
                            <div className="text-sm font-black" style={{ color: uiTheme.s700 }}>82.5%</div>
                            <span className="text-[7px] text-green-500">Optimal (WCAG Pass)</span>
                          </div>

                        </div>

                        {/* Chart card */}
                        <div className="p-2 border rounded-lg space-y-2">
                          <span className="text-[8px] text-slate-400 font-bold uppercase">User Growth metrics</span>
                          <div className="h-10 flex items-end gap-1.5 pt-2">
                            {[20, 45, 30, 60, 50, 80, 65].map((val, idx) => (
                              <div 
                                key={idx}
                                className="flex-1 rounded-t"
                                style={{ height: `${val}%`, backgroundColor: idx % 2 === 0 ? uiTheme.p500 : uiTheme.s500 }}
                              />
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: Semantic Alerts previews */}
              {previewTab === "alerts" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-wider">Semantic Alert Banners</h4>
                  
                  <div className="space-y-3">
                    
                    {/* Success alert */}
                    <div 
                      className="p-3 border rounded-xl flex gap-3 items-center text-xs"
                      style={{ backgroundColor: uiTheme.ok50, borderColor: uiTheme.ok500 }}
                    >
                      <CheckSquare size={16} style={{ color: uiTheme.ok500 }} />
                      <div>
                        <span className="font-bold block" style={{ color: uiTheme.ok800 }}>Success Notification</span>
                        <span className="text-[10px]" style={{ color: uiTheme.ok800 }}>Your brand color configuration has been updated successfully.</span>
                      </div>
                    </div>

                    {/* Info alert */}
                    <div 
                      className="p-3 border rounded-xl flex gap-3 items-center text-xs"
                      style={{ backgroundColor: uiTheme.inf50, borderColor: uiTheme.inf500 }}
                    >
                      <Info size={16} style={{ color: uiTheme.inf500 }} />
                      <div>
                        <span className="font-bold block" style={{ color: uiTheme.inf800 }}>Product Information</span>
                        <span className="text-[10px]" style={{ color: uiTheme.inf800 }}>This theme generator operates 100% locally on your browser.</span>
                      </div>
                    </div>

                    {/* Warning alert */}
                    <div 
                      className="p-3 border rounded-xl flex gap-3 items-center text-xs"
                      style={{ backgroundColor: uiTheme.warn50, borderColor: uiTheme.warn500 }}
                    >
                      <AlertTriangle size={16} style={{ color: uiTheme.warn500 }} />
                      <div>
                        <span className="font-bold block" style={{ color: uiTheme.warn800 }}>Contrast Warning</span>
                        <span className="text-[10px]" style={{ color: uiTheme.warn800 }}>Some text configurations may drop below WCAG accessibility criteria.</span>
                      </div>
                    </div>

                    {/* Danger alert */}
                    <div 
                      className="p-3 border rounded-xl flex gap-3 items-center text-xs"
                      style={{ backgroundColor: uiTheme.err50, borderColor: uiTheme.err500 }}
                    >
                      <XCircle size={16} style={{ color: uiTheme.err500 }} />
                      <div>
                        <span className="font-bold block" style={{ color: uiTheme.err800 }}>Error Encountered</span>
                        <span className="text-[10px]" style={{ color: uiTheme.err800 }}>Failed to sync API credentials. Please verify your connection.</span>
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Exporter Section */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code size={16} /> Theme Config Exporter
              </h3>
              
              <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                {(["tailwind", "tailwind4", "css", "scss", "json"] as const).map(format => (
                  <button
                    key={format}
                    onClick={() => setExportFormat(format)}
                    className={`py-1 px-2 text-[10px] font-bold rounded-md capitalize transition-all ${exportFormat === format ? 'bg-white dark:bg-slate-700 text-[#518231] dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {format === "tailwind" ? "Tailwind v3" : format === "tailwind4" ? "Tailwind v4" : format === "css" ? "CSS" : format === "scss" ? "SCSS" : "JSON"}
                  </button>
                ))}
              </div>
            </div>

            {/* Code preview block */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 relative shadow-inner flex flex-col justify-between">
              
              {exportFormat === "tailwind" && (
                <div className="space-y-3">
                  <pre className="text-[11px] text-slate-700 dark:text-slate-300 font-mono overflow-y-auto max-h-48 whitespace-pre scrollbar-thin">
                    <code>{tailwindConfigOutput}</code>
                  </pre>
                  <button
                    onClick={() => handleCopyText(tailwindConfigOutput, "config")}
                    className="w-full py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    {copiedConfig ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copiedConfig ? "Copied config!" : "Copy config.js Snippet"}
                  </button>
                </div>
              )}

              {exportFormat === "tailwind4" && (
                <div className="space-y-3">
                  <pre className="text-[11px] text-slate-700 dark:text-slate-300 font-mono overflow-y-auto max-h-48 whitespace-pre scrollbar-thin">
                    <code>{tailwind4Output}</code>
                  </pre>
                  <button
                    onClick={() => handleCopyText(tailwind4Output, "config")}
                    className="w-full py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    {copiedConfig ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copiedConfig ? "Copied CSS!" : "Copy @theme CSS directives"}
                  </button>
                </div>
              )}

              {exportFormat === "css" && (
                <div className="space-y-3">
                  <pre className="text-[11px] text-slate-700 dark:text-slate-300 font-mono overflow-y-auto max-h-48 whitespace-pre scrollbar-thin">
                    <code>{cssVariablesOutput}</code>
                  </pre>
                  <button
                    onClick={() => handleCopyText(cssVariablesOutput, "config")}
                    className="w-full py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    {copiedConfig ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copiedConfig ? "Copied Variables!" : "Copy CSS Variables"}
                  </button>
                </div>
              )}

              {exportFormat === "scss" && (
                <div className="space-y-3">
                  <pre className="text-[11px] text-slate-700 dark:text-slate-300 font-mono overflow-y-auto max-h-48 whitespace-pre scrollbar-thin">
                    <code>{scssVariablesOutput}</code>
                  </pre>
                  <button
                    onClick={() => handleCopyText(scssVariablesOutput, "config")}
                    className="w-full py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    {copiedConfig ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copiedConfig ? "Copied SCSS!" : "Copy SCSS Variables"}
                  </button>
                </div>
              )}

              {exportFormat === "json" && (
                <div className="space-y-3">
                  <pre className="text-[11px] text-slate-700 dark:text-slate-300 font-mono overflow-y-auto max-h-48 whitespace-pre scrollbar-thin">
                    <code>{jsonOutput}</code>
                  </pre>
                  <button
                    onClick={() => handleCopyText(jsonOutput, "config")}
                    className="w-full py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    {copiedConfig ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copiedConfig ? "Copied JSON!" : "Copy JSON Tokens"}
                  </button>
                </div>
              )}

            </div>

            {/* PNG export action */}
            <div className="flex gap-2">
              <button
                onClick={handleDownloadPNG}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              >
                <Download size={14} /> Export PNG Palette swatches
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* SECTION 2: Professional Palette Presets */}
      <section className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-amber-500" /> Professional Design System Presets
          </h3>
          <p className="text-xs text-slate-500 mt-1">Select a pre-designed SaaS or gaming system template to load colors instantly.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => loadPreset(preset.colors)}
              className="p-4 bg-white dark:bg-slate-800 hover:scale-[1.01] rounded-2xl border text-left flex flex-col justify-between gap-3 shadow-sm hover:border-[#518231] transition-all"
            >
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{preset.name}</span>
              <div className="flex h-5 rounded-lg overflow-hidden border">
                {Object.values(preset.colors).slice(0, 4).map((color, cIdx) => (
                  <div 
                    key={cIdx} 
                    className="flex-1" 
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 3: Gradient Generator from Palette */}
      <section className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Palette size={18} className="text-indigo-500" /> Gradient Generation from Palette
        </h3>
        <p className="text-xs text-slate-500">We compiled some beautiful gradients using the primary, secondary, and accent base colors of your palette.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { name: "Primary to Secondary", from: paletteColors.primary, to: paletteColors.secondary },
            { name: "Secondary to Accent", from: paletteColors.secondary, to: paletteColors.accent },
            { name: "Accent to Primary", from: paletteColors.accent, to: paletteColors.primary }
          ].map((grad, i) => {
            const cssString = `linear-gradient(135deg, ${grad.from} 0%, ${grad.to} 100%)`;
            return (
              <div key={i} className="bg-white dark:bg-slate-900 p-3 rounded-2xl border flex flex-col gap-2">
                <div 
                  className="h-20 rounded-xl"
                  style={{ backgroundImage: cssString }}
                />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{grad.name}</span>
                <button
                  onClick={() => handleCopyText(`background: ${cssString};`, "config")}
                  className="py-1 px-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-[10px] font-bold transition-all text-center flex items-center justify-center gap-1"
                >
                  <Copy size={10} /> Copy CSS
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 4: Saved log & favorites */}
      {(recentThemes.length > 0 || favorites.length > 0) && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Favorites */}
          {favorites.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Star size={16} className="text-yellow-500" /> Bookmarked Themes
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-48 overflow-y-auto pr-1">
                {favorites.map((fav, i) => (
                  <button
                    key={i}
                    onClick={() => loadSavedTheme(fav)}
                    className="p-2 bg-white dark:bg-slate-800 rounded-xl border text-left space-y-1.5 hover:scale-105 transition-transform"
                  >
                    <span className="text-[10px] font-bold text-slate-500 truncate block">{fav.name}</span>
                    <div className="flex h-3 rounded overflow-hidden">
                      {Object.values(fav.paletteColors).slice(0, 4).map((color, cIdx) => (
                        <div key={cIdx} className="flex-1" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* History */}
          {recentThemes.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <RefreshCw size={14} /> Recent Swatch Themes
                </h3>
                <button
                  onClick={clearHistory}
                  className="text-[10px] text-red-500 hover:underline"
                >
                  Clear log
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto pr-1">
                {recentThemes.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => loadSavedTheme(item)}
                    className="p-1.5 bg-white dark:bg-slate-800 rounded-xl border flex flex-col gap-1 hover:scale-105 transition-transform"
                  >
                    <div className="flex h-4 w-full rounded overflow-hidden">
                      {Object.values(item.paletteColors).slice(0, 4).map((color, cIdx) => (
                        <div key={cIdx} className="flex-1" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

        </section>
      )}

    </div>
  );
}
