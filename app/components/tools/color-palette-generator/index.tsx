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
  Lock,
  Unlock,
  Eye,
  Layout,
  LayoutGrid,
  FileText
} from "lucide-react";
import { Link } from "../../../../i18n/routing";
import { addToHistory as addToGlobalHistory } from "../../../../lib/hooks/useToolHistory";

// --- Types ---
interface PaletteColor {
  hex: string;
  locked: boolean;
  role: "primary" | "secondary" | "accent" | "neutral" | "support";
  shades: Record<number, string>; // 50 to 950 scales
}

interface SavedPalette {
  id: string;
  name: string;
  colors: string[];
  harmony: string;
  timestamp: number;
}

// --- Math Color Helpers ---
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

function hslToHex(h: number, s: number, l: number): string {
  const { r, g, b } = hslToRgb(h, s, l);
  return rgbToHex(r, g, b);
}

const checkerboardStyle: React.CSSProperties = {
  backgroundImage: "conic-gradient(#e2e8f0 0.25turn, transparent 0.25turn 0.5turn, #e2e8f0 0.5turn 0.75turn, transparent 0.75turn)",
  backgroundSize: "8px 8px",
  backgroundColor: "white"
};

// Generate 50-950 scales
function getScaleForColor(hex: string): Record<number, string> {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const scaleMap: Record<number, string> = {};

  shades.forEach((shade) => {
    let targetL = hsl.l;
    let targetS = hsl.s;

    if (shade === 500) {
      targetL = hsl.l;
    } else if (shade < 500) {
      // Tints: scale Lightness upwards
      const factor = (500 - shade) / 500;
      targetL = hsl.l + (97 - hsl.l) * factor;
      targetS = hsl.s - (hsl.s * 0.15) * factor; // desaturate slightly
    } else {
      // Shades: scale Lightness downwards
      const factor = (shade - 500) / 450;
      targetL = hsl.l - (hsl.l - 8) * factor;
      targetS = hsl.s + (100 - hsl.s) * 0.1 * factor; // saturate slightly
    }

    const nextRgb = hslToRgb(hsl.h, clamp(targetS, 0, 100), clamp(targetL, 0, 100));
    scaleMap[shade] = rgbToHex(nextRgb.r, nextRgb.g, nextRgb.b);
  });

  return scaleMap;
}

// Relative luminance check for WCAG contrast checking
function getLuminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getContrast(fg: string, bg: string): number {
  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  const L1 = getLuminance(fgRgb.r, fgRgb.g, fgRgb.b);
  const L2 = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}

// Quick Mood and Theme definitions
const MOOD_TAGS = [
  { name: "SaaS Blue", hex: "#2563eb", harmony: "analogous" },
  { name: "Neon Cyber", hex: "#d946ef", harmony: "complementary" },
  { name: "Forest Organic", hex: "#16a34a", harmony: "analogous" },
  { name: "Luxury Gold", hex: "#d97706", harmony: "monochromatic" },
  { name: "Gaming Slate", hex: "#0ea5e9", harmony: "split" },
  { name: "Vibrant Retro", hex: "#f97316", harmony: "triadic" }
];

export function ColorPaletteGeneratorTool() {
  const [mounted, setMounted] = useState(false);
  const lastPaletteRef = useRef<PaletteColor[]>([]);

  // --- Seed Color state ---
  const [seedColor, setSeedColor] = useState("#2563eb");
  const [harmonyMode, setHarmonyMode] = useState<
    "monochromatic" | "analogous" | "complementary" | "split" | "triadic" | "tetradic" | "square" | "pastel" | "vibrant" | "dark" | "light"
  >("analogous");
  const [paletteSize, setPaletteSize] = useState<2 | 3 | 5 | 10>(5);

  // Picker syncing parameters
  const [hexInput, setHexInput] = useState("#2563eb");
  const [rInput, setRInput] = useState("37");
  const [gInput, setGInput] = useState("99");
  const [bInput, setBInput] = useState("235");

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Locked colors array
  const [locks, setLocks] = useState<Record<number, boolean>>({});

  // Active workspace selections
  const [previewTab, setPreviewTab] = useState<"dashboard" | "hero" | "pricing" | "mobile">("dashboard");
  const [codeTab, setCodeTab] = useState<"css" | "tailwind" | "scss" | "json" | "ase">("css");
  
  const [copiedText, setCopiedText] = useState(false);
  const [history, setHistory] = useState<SavedPalette[]>([]);
  const [favorites, setFavorites] = useState<SavedPalette[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Setup on Mount
  useEffect(() => {
    setMounted(true);
    addToGlobalHistory({ slug: "color-palette-generator", title: "Color Palette Generator", type: "tool" });

    // Load LocalStorage Cache with structural validation to prevent runtime errors from stale schemas
    const savedHist = localStorage.getItem("nexus_palette_history");
    if (savedHist) {
      try {
        const parsed = JSON.parse(savedHist);
        if (Array.isArray(parsed)) {
          setHistory(parsed.filter(item => item && Array.isArray(item.colors)));
        }
      } catch (e) {}
    }
    const savedFavs = localStorage.getItem("nexus_palette_favorites");
    if (savedFavs) {
      try {
        const parsed = JSON.parse(savedFavs);
        if (Array.isArray(parsed)) {
          setFavorites(parsed.filter(item => item && Array.isArray(item.colors)));
        }
      } catch (e) {}
    }
  }, []);

  // Synchronize color text box inputs
  useEffect(() => {
    if (focusedInput === "hex") return;
    setHexInput(seedColor);
    const rgb = hexToRgb(seedColor);
    setRInput(rgb.r.toString());
    setGInput(rgb.g.toString());
    setBInput(rgb.b.toString());
  }, [seedColor, focusedInput]);

  // Main palette generator compiler
  const generatedPalette = useMemo<PaletteColor[]>(() => {
    const seedRgb = hexToRgb(seedColor);
    const seedHsl = rgbToHsl(seedRgb.r, seedRgb.g, seedRgb.b);

    const colors: string[] = [];

    // Calculate core colors based on harmony
    if (harmonyMode === "monochromatic") {
      // Step lightness
      colors.push(seedColor);
      colors.push(hslToHex(seedHsl.h, clamp(seedHsl.s - 15, 0, 100), clamp(seedHsl.l + 20, 0, 100)));
      colors.push(hslToHex(seedHsl.h, clamp(seedHsl.s - 5, 0, 100), clamp(seedHsl.l + 10, 0, 100)));
      colors.push(hslToHex(seedHsl.h, clamp(seedHsl.s + 5, 0, 100), clamp(seedHsl.l - 10, 0, 100)));
      colors.push(hslToHex(seedHsl.h, clamp(seedHsl.s + 15, 0, 100), clamp(seedHsl.l - 20, 0, 100)));
    } else if (harmonyMode === "analogous") {
      colors.push(seedColor);
      colors.push(hslToHex((seedHsl.h + 30) % 360, seedHsl.s, seedHsl.l));
      colors.push(hslToHex((seedHsl.h + 60) % 360, seedHsl.s, seedHsl.l));
      colors.push(hslToHex((seedHsl.h - 30 + 360) % 360, seedHsl.s, seedHsl.l));
      colors.push(hslToHex((seedHsl.h - 60 + 360) % 360, seedHsl.s, seedHsl.l));
    } else if (harmonyMode === "complementary") {
      colors.push(seedColor);
      colors.push(hslToHex((seedHsl.h + 180) % 360, seedHsl.s, seedHsl.l));
      // Adding shading variations
      colors.push(hslToHex(seedHsl.h, clamp(seedHsl.s - 10, 0, 100), clamp(seedHsl.l + 15, 0, 100)));
      colors.push(hslToHex((seedHsl.h + 180) % 360, clamp(seedHsl.s - 10, 0, 100), clamp(seedHsl.l - 15, 0, 100)));
      colors.push(hslToHex(seedHsl.h, seedHsl.s, clamp(seedHsl.l - 25, 0, 100)));
    } else if (harmonyMode === "split") {
      colors.push(seedColor);
      colors.push(hslToHex((seedHsl.h + 150) % 360, seedHsl.s, seedHsl.l));
      colors.push(hslToHex((seedHsl.h + 210) % 360, seedHsl.s, seedHsl.l));
      colors.push(hslToHex(seedHsl.h, seedHsl.s, clamp(seedHsl.l + 20, 0, 100)));
      colors.push(hslToHex((seedHsl.h + 150) % 360, seedHsl.s, clamp(seedHsl.l - 20, 0, 100)));
    } else if (harmonyMode === "triadic") {
      colors.push(seedColor);
      colors.push(hslToHex((seedHsl.h + 120) % 360, seedHsl.s, seedHsl.l));
      colors.push(hslToHex((seedHsl.h + 240) % 360, seedHsl.s, seedHsl.l));
      colors.push(hslToHex(seedHsl.h, clamp(seedHsl.s - 15, 0, 100), clamp(seedHsl.l + 15, 0, 100)));
      colors.push(hslToHex((seedHsl.h + 120) % 360, clamp(seedHsl.s - 15, 0, 100), clamp(seedHsl.l - 15, 0, 100)));
    } else if (harmonyMode === "tetradic") {
      colors.push(seedColor);
      colors.push(hslToHex((seedHsl.h + 60) % 360, seedHsl.s, seedHsl.l));
      colors.push(hslToHex((seedHsl.h + 180) % 360, seedHsl.s, seedHsl.l));
      colors.push(hslToHex((seedHsl.h + 240) % 360, seedHsl.s, seedHsl.l));
      colors.push(hslToHex(seedHsl.h, seedHsl.s, clamp(seedHsl.l - 20, 0, 100)));
    } else if (harmonyMode === "square") {
      colors.push(seedColor);
      colors.push(hslToHex((seedHsl.h + 90) % 360, seedHsl.s, seedHsl.l));
      colors.push(hslToHex((seedHsl.h + 180) % 360, seedHsl.s, seedHsl.l));
      colors.push(hslToHex((seedHsl.h + 270) % 360, seedHsl.s, seedHsl.l));
      colors.push(hslToHex(seedHsl.h, seedHsl.s, clamp(seedHsl.l - 20, 0, 100)));
    } else if (harmonyMode === "pastel") {
      colors.push(hslToHex(seedHsl.h, 45, 85));
      colors.push(hslToHex((seedHsl.h + 40) % 360, 45, 85));
      colors.push(hslToHex((seedHsl.h + 80) % 360, 45, 85));
      colors.push(hslToHex((seedHsl.h + 180) % 360, 40, 88));
      colors.push(hslToHex((seedHsl.h + 220) % 360, 40, 88));
    } else if (harmonyMode === "vibrant") {
      colors.push(hslToHex(seedHsl.h, 95, 50));
      colors.push(hslToHex((seedHsl.h + 45) % 360, 95, 50));
      colors.push(hslToHex((seedHsl.h + 135) % 360, 95, 50));
      colors.push(hslToHex((seedHsl.h + 180) % 360, 95, 55));
      colors.push(hslToHex((seedHsl.h + 270) % 360, 95, 55));
    } else if (harmonyMode === "dark") {
      colors.push(hslToHex(seedHsl.h, 60, 15));
      colors.push(hslToHex((seedHsl.h + 30) % 360, 50, 20));
      colors.push(hslToHex((seedHsl.h + 180) % 360, 45, 22));
      colors.push(hslToHex(seedHsl.h, 65, 10));
      colors.push(hslToHex((seedHsl.h + 30) % 360, 55, 8));
    } else { // Light
      colors.push(hslToHex(seedHsl.h, 50, 95));
      colors.push(hslToHex((seedHsl.h + 35) % 360, 45, 93));
      colors.push(hslToHex((seedHsl.h + 180) % 360, 40, 96));
      colors.push(hslToHex(seedHsl.h, 55, 98));
      colors.push(hslToHex((seedHsl.h + 35) % 360, 40, 98));
    }

    // Limit or expand to palette size
    let trimmedColors = colors.slice(0, paletteSize);
    while (trimmedColors.length < paletteSize) {
      // duplicate with shade shifts if not enough colors
      const last = trimmedColors[trimmedColors.length - 1];
      const rgbShift = hexToRgb(last);
      const hslShift = rgbToHsl(rgbShift.r, rgbShift.g, rgbShift.b);
      trimmedColors.push(hslToHex((hslShift.h + 45) % 360, hslShift.s, clamp(hslShift.l - 10, 10, 90)));
    }

    // Map to PaletteColor format including Tailwind Scales
    return trimmedColors.map((hex, idx) => {
      // Preserving locks logic
      const activeHex = locks[idx] ? (lastPaletteRef.current[idx]?.hex || hex) : hex;
      const roles: ("primary" | "secondary" | "accent" | "neutral" | "support")[] = ["primary", "secondary", "accent", "neutral", "support"];
      
      return {
        hex: activeHex,
        locked: locks[idx] || false,
        role: roles[idx % 5],
        shades: getScaleForColor(activeHex)
      };
    });
  }, [seedColor, harmonyMode, paletteSize, locks]);

  // Keep ref in sync
  useEffect(() => {
    lastPaletteRef.current = generatedPalette;
  }, [generatedPalette]);

  // Accessibility audit metrics: check text contrast on swatches
  const contrastAnalysisList = useMemo(() => {
    return generatedPalette.map((col: PaletteColor) => {
      const whiteContrast = getContrast("#ffffff", col.hex);
      const blackContrast = getContrast("#000000", col.hex);

      const preferredOverlay = whiteContrast > blackContrast ? "#ffffff" : "#000000";
      const ratioScore = Math.max(whiteContrast, blackContrast);

      let rating = "Fail";
      if (ratioScore >= 7.0) rating = "AAA Pass";
      else if (ratioScore >= 4.5) rating = "AA Pass";
      else if (ratioScore >= 3.0) rating = "AA Large Only";

      return {
        hex: col.hex,
        preferredOverlay,
        ratioScore: Number(ratioScore.toFixed(1)),
        rating
      };
    });
  }, [generatedPalette]);

  // CSS variables output compiler
  const cssVariablesSnippet = useMemo(() => {
    return `/* Custom Color Palette Custom Properties */
:root {
${generatedPalette.map((col: PaletteColor, idx: number) => `  --color-brand-${idx + 1}: ${col.hex};`).join("\n")}
}`;
  }, [generatedPalette]);

  const scssSnippet = useMemo(() => {
    return `// Color Palette SCSS Tokens
${generatedPalette.map((col: PaletteColor, idx: number) => `$color-brand-${idx + 1}: ${col.hex};`).join("\n")}`;
  }, [generatedPalette]);

  const tailwindClassesSnippet = useMemo(() => {
    return `// Tailwind config extends theme colors
theme: {
  extend: {
    colors: {
      brand: {
${generatedPalette.map((col: PaletteColor, idx: number) => `        'accent-${idx + 1}': '${col.hex}',`).join("\n")}
      }
    }
  }
}`;
  }, [generatedPalette]);

  const jsonSnippet = useMemo(() => {
    return JSON.stringify({
      paletteName: "Color Palette Design Tokens",
      colors: generatedPalette.map((col: PaletteColor, idx: number) => ({
        index: idx + 1,
        hex: col.hex,
        role: col.role,
        shades: col.shades
      }))
    }, null, 2);
  }, [generatedPalette]);

  const aseJsonSnippet = useMemo(() => {
    // Adobe ASE JSON representation
    return JSON.stringify({
      version: "1.0",
      groups: [],
      colors: generatedPalette.map((col: PaletteColor) => ({
        name: col.hex,
        model: "RGB",
        values: Object.values(hexToRgb(col.hex)).map((c: number) => Number((c / 255).toFixed(4))),
        type: "global"
      }))
    }, null, 2);
  }, [generatedPalette]);

  // --- Handlers ---
  const handleHexChange = (val: string) => {
    setHexInput(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      setSeedColor(val);
      triggerSaveHistory();
    }
  };

  const handleRgbChange = (channel: "r" | "g" | "b", valStr: string) => {
    if (channel === "r") setRInput(valStr);
    if (channel === "g") setGInput(valStr);
    if (channel === "b") setBInput(valStr);

    const val = parseInt(valStr, 10);
    if (isNaN(val)) return;

    const rgb = hexToRgb(seedColor);
    const r = channel === "r" ? clamp(val, 0, 255) : rgb.r;
    const g = channel === "g" ? clamp(val, 0, 255) : rgb.g;
    const b = channel === "b" ? clamp(val, 0, 255) : rgb.b;

    const nextHex = rgbToHex(r, g, b);
    setSeedColor(nextHex);
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

  const handleLockToggle = (idx: number) => {
    setLocks(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
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
    
    // Pick a random seed color, preserving locked index positions
    setSeedColor(randomHex());
    triggerSaveHistory();
  };

  const triggerSaveHistory = () => {
    const nextItem: SavedPalette = {
      id: Date.now().toString(),
      name: `Palette ${harmonyMode.toUpperCase()} ${Date.now().toString().slice(-4)}`,
      colors: generatedPalette.map((c: PaletteColor) => c.hex),
      harmony: harmonyMode,
      timestamp: Date.now()
    };

    setHistory(prev => {
      const filtered = prev.filter(item => item && Array.isArray(item.colors) && JSON.stringify(item.colors) !== JSON.stringify(nextItem.colors));
      const updated = [nextItem, ...filtered].slice(0, 10);
      localStorage.setItem("nexus_palette_history", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavorite = () => {
    const colorHexList = generatedPalette.map((c: PaletteColor) => c.hex);
    const nextItem: SavedPalette = {
      id: Date.now().toString(),
      name: `Bookmarked Palette`,
      colors: colorHexList,
      harmony: harmonyMode,
      timestamp: Date.now()
    };

    setFavorites(prev => {
      const exists = prev.some(item => item && Array.isArray(item.colors) && JSON.stringify(item.colors) === JSON.stringify(colorHexList));
      let updated;
      if (exists) {
        updated = prev.filter(item => item && Array.isArray(item.colors) && JSON.stringify(item.colors) !== JSON.stringify(colorHexList));
        setIsFavorite(false);
      } else {
        updated = [nextItem, ...prev.filter(item => item && Array.isArray(item.colors))];
        setIsFavorite(true);
      }
      localStorage.setItem("nexus_palette_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const colorHexList = generatedPalette.map((c: PaletteColor) => c.hex);
    const exists = favorites.some(item => item && Array.isArray(item.colors) && JSON.stringify(item.colors) === JSON.stringify(colorHexList));
    setIsFavorite(exists);
  }, [generatedPalette, favorites]);

  const loadSavedPalette = (saved: SavedPalette) => {
    if (saved && Array.isArray(saved.colors) && saved.colors[0]) {
      setSeedColor(saved.colors[0]);
      setHarmonyMode(saved.harmony as any);
      setPaletteSize(saved.colors.length as any);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("nexus_palette_history");
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  // SVG Swatch Download Trigger
  const triggerDownloadSvg = () => {
    const blockWidth = 70;
    const blockHeight = 150;
    const totalWidth = blockWidth * generatedPalette.length + 40;
    
    const colorsG = generatedPalette.map((col: PaletteColor, idx: number) => {
      const textOverlay = contrastAnalysisList[idx]?.preferredOverlay || "#ffffff";
      return `<g transform="translate(${20 + idx * blockWidth}, 20)">
        <rect width="${blockWidth}" height="${blockHeight}" fill="${col.hex}" />
        <text x="${blockWidth / 2}" y="${blockHeight - 40}" fill="${textOverlay}" font-family="monospace" font-size="11" text-anchor="middle">${col.hex}</text>
        <text x="${blockWidth / 2}" y="${blockHeight - 20}" fill="${textOverlay}" fill-opacity="0.6" font-family="sans-serif" font-size="9" text-anchor="middle">Color ${idx + 1}</text>
      </g>`;
    }).join("\n");

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="200" viewBox="0 0 ${totalWidth} 200">
      <rect width="100%" height="100%" fill="#111827" />
      ${colorsG}
    </svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "color-palette.svg";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500">
        <RefreshCw size={24} className="animate-spin mr-2" /> Initializing Color Studio...
      </div>
    );
  }

  // Pre-calculated target primary / secondary values for components sandbox previews
  const pColor = generatedPalette[0]?.hex || "#2563eb";
  const sColor = generatedPalette[1]?.hex || "#0d9488";
  const aColor = generatedPalette[2]?.hex || "#eab308";
  const nColor = generatedPalette[3]?.hex || "#f8fafc";

  return (
    <div className="space-y-8">
      {/* Visual workbench Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#518231]/10 text-[#518231]">
            <Sparkles size={12} /> Color Studio
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">AI-Inspired Dynamic Palette Builder</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Generate complementary, analogous, or split color systems. Lock custom swatches, inspect WCAG text contrast parameters, and export Tailwind theme overrides.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleRandomize} 
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium text-slate-700 dark:text-slate-300 transition-all text-sm"
          >
            <Shuffle size={16} /> Randomize Seed
          </button>
          <button 
            onClick={toggleFavorite} 
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-medium transition-all text-sm ${
              isFavorite 
                ? "bg-rose-50 border-rose-200 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900/30" 
                : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
            }`}
          >
            <Heart size={16} className={isFavorite ? "fill-current" : ""} /> {isFavorite ? "Bookmarked" : "Bookmark Palette"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Settings and Color Harmonizer (5 columns) */}
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
            
            {/* Seed color selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Base Seed Color</label>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0 relative" style={checkerboardStyle}>
                  <input 
                    type="color"
                    value={seedColor}
                    onChange={(e) => handleHexChange(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-full h-full" style={{ backgroundColor: seedColor }} />
                </div>
                <div className="flex-1 relative">
                  <input 
                    type="text"
                    value={hexInput}
                    onFocus={() => setFocusedInput("hex")}
                    onBlur={() => setFocusedInput(null)}
                    onChange={(e) => handleHexChange(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#518231]"
                    placeholder="#2563EB"
                  />
                  {typeof window !== "undefined" && "EyeDropper" in window && (
                    <button 
                      onClick={handleEyeDropper}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    >
                      <Droplet size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* RGB inputs */}
              <div className="grid grid-cols-3 gap-2">
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
                    className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-xs font-mono focus:outline-none"
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
                    className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-xs font-mono focus:outline-none"
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
                    className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-lg text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Harmony Mode Dropdown */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Harmony Logic Mode</label>
              <select
                value={harmonyMode}
                onChange={(e: any) => setHarmonyMode(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-white rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
              >
                <option value="analogous">Analogous (Adjacent Hues)</option>
                <option value="complementary">Complementary (Contrast Opposites)</option>
                <option value="split">Split Complementary</option>
                <option value="monochromatic">Monochromatic (Lightness Scale)</option>
                <option value="triadic">Triadic (120-deg Wheel)</option>
                <option value="tetradic">Tetradic (Double Complement)</option>
                <option value="square">Square (90-deg Wheel)</option>
                <option value="pastel">Pastel Hues</option>
                <option value="vibrant">Vibrant Accents</option>
                <option value="dark">Dark Muted Scales</option>
                <option value="light">Light Frost Tint</option>
              </select>
            </div>

            {/* Palette size selector */}
            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Palette Size</label>
              <div className="grid grid-cols-4 gap-2">
                {([2, 3, 5, 10] as const).map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setPaletteSize(sz)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                      paletteSize === sz 
                        ? "bg-[#518231] border-[#518231] text-white" 
                        : "bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    {sz} Colors
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick mood tags card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#518231]" /> Inspiration Mood Tags
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {MOOD_TAGS.map((tag) => (
                <button
                  key={tag.name}
                  onClick={() => {
                    setSeedColor(tag.hex);
                    setHarmonyMode(tag.harmony as any);
                    triggerSaveHistory();
                  }}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tag.hex }} />
                  <span>{tag.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Swatches, Mock Previews, Exporter (7 columns) */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* BIG SWATCHES GRID ROW */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {generatedPalette.map((col: PaletteColor, idx: number) => {
              const contrastData = contrastAnalysisList[idx] || { preferredOverlay: "#ffffff", ratioScore: 4.5, rating: "Pass" };
              return (
                <div 
                  key={idx} 
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col justify-between h-44 transition-all hover:scale-[1.02]"
                  style={{ backgroundColor: col.hex }}
                >
                  {/* Top: locks and role */}
                  <div className="p-3 flex justify-between items-start text-white mix-blend-difference">
                    <span className="text-[10px] font-bold uppercase tracking-wider">{col.role}</span>
                    <button 
                      onClick={() => handleLockToggle(idx)}
                      className="opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {locks[idx] ? <Lock size={12} /> : <Unlock size={12} />}
                    </button>
                  </div>

                  {/* Bottom details */}
                  <div className="p-3 bg-black/30 dark:bg-black/50 text-white backdrop-blur-sm space-y-1">
                    <div 
                      onClick={() => handleCopyText(col.hex)}
                      className="font-mono text-xs font-bold flex items-center justify-between cursor-pointer group"
                      title="Copy HEX color code"
                    >
                      <span>{col.hex}</span>
                      <Copy size={10} className="opacity-0 group-hover:opacity-80" />
                    </div>
                    <div className="text-[9px] opacity-70 flex justify-between font-mono">
                      <span>Contrast:</span>
                      <span>{contrastData.ratioScore}:1</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PREVIEW CONTAINER CANVAS */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            
            {/* Preview Toolbar */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-2 justify-between items-center">
              <div className="flex gap-1.5">
                {(["dashboard", "hero", "pricing", "mobile"] as const).map((tab) => (
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
            </div>

            <div className="p-6 min-h-[300px] flex items-center justify-center bg-slate-950">
              
              {/* DASHBOARD MOCKUP */}
              {previewTab === "dashboard" && (
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl w-full text-white space-y-5">
                  <div className="flex justify-between items-center border-b pb-3 border-slate-800">
                    <span className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                      <Layout size={16} style={{ color: pColor }} /> Brand Dashboard
                    </span>
                    <span className="px-2 py-0.5 text-[10px] rounded" style={{ backgroundColor: sColor, color: "#fff" }}>
                      Analytics
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-slate-800/50 border border-slate-800 rounded-xl space-y-1">
                      <div className="text-[9px] text-slate-400 uppercase">Growth</div>
                      <div className="text-base font-bold" style={{ color: pColor }}>+38%</div>
                    </div>
                    <div className="p-3 bg-slate-800/50 border border-slate-800 rounded-xl space-y-1">
                      <div className="text-[9px] text-slate-400 uppercase">CTR Rating</div>
                      <div className="text-base font-bold" style={{ color: sColor }}>4.8%</div>
                    </div>
                    <div className="p-3 bg-slate-800/50 border border-slate-800 rounded-xl space-y-1">
                      <div className="text-[9px] text-slate-400 uppercase">Glow Speed</div>
                      <div className="text-base font-bold" style={{ color: aColor }}>14ms</div>
                    </div>
                  </div>

                  <button 
                    style={{ backgroundColor: pColor }}
                    className="w-full py-2.5 rounded-xl text-center text-xs font-bold text-white shadow-sm"
                  >
                    Generate Report
                  </button>
                </div>
              )}

              {/* SAAS HERO PREVIEW */}
              {previewTab === "hero" && (
                <div className="text-center py-6 px-4 space-y-4 max-w-md mx-auto text-white">
                  <h3 className="text-2xl font-extrabold tracking-tight">
                    Scale Your Branding With <span style={{ color: pColor }}>Structured Math</span> Colors
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Build accessible design tokens that align complementary tints and dark shades. Toggle presets to load harmonious values instantly.
                  </p>
                  <div className="flex justify-center gap-3 pt-2">
                    <button 
                      style={{ backgroundColor: pColor }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-white"
                    >
                      Start Free Trial
                    </button>
                    <button 
                      style={{ borderColor: sColor, color: sColor }}
                      className="px-4 py-2 rounded-xl text-xs font-bold border"
                    >
                      Book Demo
                    </button>
                  </div>
                </div>
              )}

              {/* PRICING CARDS PREVIEW */}
              {previewTab === "pricing" && (
                <div className="grid grid-cols-2 gap-4 w-full text-white">
                  {/* Basic */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 text-center">
                    <div className="text-xs uppercase text-slate-400">Core Starter</div>
                    <div className="text-2xl font-bold font-mono">$19</div>
                    <p className="text-[10px] text-slate-500">Perfect for startup designers.</p>
                    <button 
                      style={{ borderColor: sColor, color: sColor }}
                      className="w-full py-1.5 rounded-lg border text-[10px] font-bold"
                    >
                      Choose Starter
                    </button>
                  </div>

                  {/* Pro */}
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 px-2 py-0.5 text-[8px] uppercase tracking-wider font-bold" style={{ backgroundColor: pColor }}>Best</div>
                    <div className="text-xs uppercase text-slate-400">Enterprise Pro</div>
                    <div className="text-2xl font-bold font-mono" style={{ color: pColor }}>$49</div>
                    <p className="text-[10px] text-slate-500">Full 50-950 automated tokens scales.</p>
                    <button 
                      style={{ backgroundColor: pColor }}
                      className="w-full py-1.5 rounded-lg text-[10px] font-bold"
                    >
                      Get Enterprise
                    </button>
                  </div>
                </div>
              )}

              {/* MOBILE APP PREVIEW */}
              {previewTab === "mobile" && (
                <div className="border border-slate-800 w-full max-w-[200px] h-[340px] rounded-3xl bg-slate-950 text-white p-3 space-y-4 overflow-hidden relative shadow-2xl flex flex-col justify-between">
                  {/* Speaker card mockup */}
                  <div className="space-y-3">
                    <div className="h-4 rounded-full bg-slate-900 flex items-center justify-between px-2 text-[8px] text-slate-400">
                      <span>12:00</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>

                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-2">
                      <div className="w-12 h-12 rounded-full mx-auto" style={{ backgroundColor: pColor }} />
                      <div className="text-[10px] font-bold">Ambient Scales</div>
                    </div>
                  </div>

                  <button 
                    style={{ backgroundColor: pColor }}
                    className="w-full py-2 rounded-xl text-center text-[9px] font-bold"
                  >
                    Action Trigger
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* EXPORTER CODE BLOCK TABS */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-2 justify-between items-center">
              <div className="flex gap-1">
                {(["css", "tailwind", "scss", "json", "ase"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCodeTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                      codeTab === tab 
                        ? "bg-[#518231]/10 text-[#518231]" 
                        : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {tab === "ase" ? "Adobe ASE" : tab}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const text = 
                      codeTab === "css" ? cssVariablesSnippet :
                      codeTab === "tailwind" ? tailwindClassesSnippet :
                      codeTab === "scss" ? scssSnippet :
                      codeTab === "json" ? jsonSnippet : aseJsonSnippet;
                    handleCopyText(text);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-all"
                >
                  {copiedText ? <CheckCircle size={12} className="text-emerald-500" /> : <Copy size={12} />}
                  {copiedText ? "Copied!" : "Copy Snippet"}
                </button>
                <button
                  onClick={triggerDownloadSvg}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-all"
                >
                  <Download size={12} />
                  <span>SVG</span>
                </button>
              </div>
            </div>

            <div className="p-4 bg-slate-950">
              <pre className="text-xs text-slate-300 font-mono overflow-x-auto p-2 leading-relaxed custom-scrollbar">
                <code>
                  {codeTab === "css" && cssVariablesSnippet}
                  {codeTab === "tailwind" && tailwindClassesSnippet}
                  {codeTab === "scss" && scssSnippet}
                  {codeTab === "json" && jsonSnippet}
                  {codeTab === "ase" && aseJsonSnippet}
                </code>
              </pre>
            </div>
          </div>

          {/* LOCAL HISTORY SESSION */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Undo size={16} className="text-[#518231]" /> Palette History
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
              <div className="flex flex-col gap-2">
                {history.filter(item => item && Array.isArray(item.colors)).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => loadSavedPalette(item)}
                    className="p-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 rounded-lg text-xs font-mono transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-500">{item.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono capitalize">({item.harmony})</span>
                    </div>
                    <div className="flex gap-1">
                      {item.colors?.map((hex, idx) => (
                        <div 
                          key={idx} 
                          className="w-4.5 h-4.5 rounded border border-slate-300/30" 
                          style={{ backgroundColor: hex }} 
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic">No palette history log recorded yet. Adjust seeds to store.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
