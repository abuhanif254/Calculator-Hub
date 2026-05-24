"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Copy, Download, RefreshCw, Trash2, CheckCircle, Sliders, Contrast, Compass, Palette, Check, FileCode, History, Pipette, Eye, Table } from "lucide-react";
import { Link } from "../../../../i18n/routing";
import { addToHistory as addToGlobalHistory } from "../../../../lib/hooks/useToolHistory";

// --- Color Conversion Math Utilities ---

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

// Convert RGB to HSL
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
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Convert HSL to RGB
function hslToRgb(h: number, s: number, l: number) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r = 0, g = 0, b = 0;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

// Convert RGB to HSV
function rgbToHsv(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
}

// Convert RGB to Hex String (no alpha)
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (val: number) => {
    const hex = clamp(val, 0, 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Convert RGBA to Hexa String (with alpha)
function rgbaToHexa(r: number, g: number, b: number, a: number): string {
  const toHex = (val: number) => {
    const hex = clamp(val, 0, 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  const alphaVal = Math.round(clamp(a, 0, 1) * 255);
  const alphaHex = alphaVal.toString(16);
  const formattedAlpha = alphaHex.length === 1 ? "0" + alphaHex : alphaHex;
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${formattedAlpha}`.toUpperCase();
}

// Parse RGB/RGBA strings or CSV text into { r, g, b, a }
function parseRgbColor(str: string): { r: number; g: number; b: number; a: number } | null {
  const cleaned = str.trim().toLowerCase();

  // 1. Match standard rgb/rgba formulas
  const rgbaRegex = /^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/;
  const match = cleaned.match(rgbaRegex);
  if (match) {
    const r = parseInt(match[1], 10);
    const g = parseInt(match[2], 10);
    const b = parseInt(match[3], 10);
    const a = match[4] !== undefined ? parseFloat(match[4]) : 1.0;
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1) {
      return { r, g, b, a };
    }
  }

  // 2. Match modern space separated formula
  const modernRegex = /^rgba?\s*\(\s*(\d+)\s+(\d+)\s+(\d+)\s*(?:\/\s*([\d.%]+)\s*)?\)$/;
  const modernMatch = cleaned.match(modernRegex);
  if (modernMatch) {
    const r = parseInt(modernMatch[1], 10);
    const g = parseInt(modernMatch[2], 10);
    const b = parseInt(modernMatch[3], 10);
    let a = 1.0;
    if (modernMatch[4] !== undefined) {
      const alphaStr = modernMatch[4].trim();
      if (alphaStr.endsWith('%')) {
        a = parseFloat(alphaStr.slice(0, -1)) / 100;
      } else {
        a = parseFloat(alphaStr);
      }
    }
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1) {
      return { r, g, b, a };
    }
  }

  // 3. Match raw comma separated integers (e.g. 255, 128, 64)
  const rawCsvRegex = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?$/;
  const csvMatch = cleaned.match(rawCsvRegex);
  if (csvMatch) {
    const r = parseInt(csvMatch[1], 10);
    const g = parseInt(csvMatch[2], 10);
    const b = parseInt(csvMatch[3], 10);
    const a = csvMatch[4] !== undefined ? parseFloat(csvMatch[4]) : 1.0;
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1) {
      return { r, g, b, a };
    }
  }

  // 4. Match space separated integers (e.g. 255 128 64)
  const rawSpaceRegex = /^(\d+)\s+(\d+)\s+(\d+)(?:\s+([\d.]+))?$/;
  const spaceMatch = cleaned.match(rawSpaceRegex);
  if (spaceMatch) {
    const r = parseInt(spaceMatch[1], 10);
    const g = parseInt(spaceMatch[2], 10);
    const b = parseInt(spaceMatch[3], 10);
    const a = spaceMatch[4] !== undefined ? parseFloat(spaceMatch[4]) : 1.0;
    if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255 && a >= 0 && a <= 1) {
      return { r, g, b, a };
    }
  }

  return null;
}

// Convert Hex string back to RGB
function hexToRgb(str: string): { r: number; g: number; b: number } | null {
  const cleaned = str.trim().toLowerCase().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3,8}$/.test(cleaned)) return null;

  let hex = cleaned;
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  if (hex.length >= 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  }
  return null;
}

// WCAG Relative Luminance
function getRelativeLuminance(r: number, g: number, b: number): number {
  const transform = (val: number) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

function getContrastRatio(lum1: number, lum2: number): number {
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

const checkerboardBgStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Crect width='8' height='8' fill='%23ffffff'/%3E%3Crect x='8' y='8' width='8' height='8' fill='%23ffffff'/%3E%3Crect x='8' width='8' height='8' fill='%23f1f5f9'/%3E%3Crect y='8' width='8' height='8' fill='%23f1f5f9'/%3E%3C/svg%3E")`,
};

export function RgbToHexTool() {
  const [mounted, setMounted] = useState(false);

  // Tab control: 'single' | 'bulk'
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single');

  // Core RGB state values
  const [rgb, setRgb] = useState({ r: 81, g: 130, b: 49, a: 1.0 });

  // Paste raw input text
  const [pastedString, setPastedString] = useState("rgb(81, 130, 49)");
  const [parseError, setParseError] = useState(false);

  // Local storage history
  const [history, setHistory] = useState<Array<{ r: number; g: number; b: number; a: number; timestamp: number }>>([]);

  // Toast copiers alert
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Gradient Preview settings
  const [gradientAngle, setGradientAngle] = useState(135);

  // --- Bulk Conversion States ---
  const [bulkInput, setBulkInput] = useState("255, 255, 255\n81, 130, 49\nrgba(59, 130, 246, 0.5)\n0, 0, 0");
  const [bulkResults, setBulkResults] = useState<Array<{ input: string; hex: string; isValid: boolean }>>([]);

  // Initialize
  useEffect(() => {
    setMounted(true);
    addToGlobalHistory({ slug: "rgb-to-hex", title: "RGB to HEX Converter", type: "tool" });

    if (typeof window !== "undefined") {
      try {
        const savedHistory = localStorage.getItem("nexus-rgb-hex-history");
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (err) {
        console.error("Failed to load color history", err);
      }
    }
  }, []);

  // Update history drawer
  const saveHistory = (newHistory: typeof history) => {
    setHistory(newHistory);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("nexus-rgb-hex-history", JSON.stringify(newHistory));
      } catch (err) {
        console.error("Failed to save history to storage", err);
      }
    }
  };

  // Toast alert
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 1500);
    }).catch(() => {
      setCopiedText("Failed to copy");
      setTimeout(() => setCopiedText(null), 1500);
    });
  };

  // Synchronize color slider / picker changes
  const handleColorValueChange = (channel: "r" | "g" | "b" | "a", value: number) => {
    const updated = { ...rgb, [channel]: value };
    setRgb(updated);
    setPastedString(updated.a === 1 ? `rgb(${updated.r}, ${updated.g}, ${updated.b})` : `rgba(${updated.r}, ${updated.g}, ${updated.b}, ${updated.a})`);
    setParseError(false);
  };

  // Color picker HEX input handler
  const handlePickerChange = (hexValue: string) => {
    const parsed = hexToRgb(hexValue);
    if (parsed) {
      const updated = { r: parsed.r, g: parsed.g, b: parsed.b, a: rgb.a };
      setRgb(updated);
      setPastedString(updated.a === 1 ? `rgb(${updated.r}, ${updated.g}, ${updated.b})` : `rgba(${updated.r}, ${updated.g}, ${updated.b}, ${updated.a})`);
      setParseError(false);
    }
  };

  // Smart text string parser
  const handlePasteStringChange = (val: string) => {
    setPastedString(val);
    const parsed = parseRgbColor(val);
    if (parsed) {
      setRgb(parsed);
      setParseError(false);
    } else {
      setParseError(true);
    }
  };

  // Generate random color values
  const handleRandomizeColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Number((Math.random() * 0.6 + 0.4).toFixed(2));
    const finalAlpha = Math.random() > 0.3 ? 1.0 : a;

    const updated = { r, g, b, a: finalAlpha };
    setRgb(updated);
    setPastedString(finalAlpha === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${finalAlpha})`);
    setParseError(false);
  };

  // Save base specs to history drawer
  const handleSaveToHistory = () => {
    const filtered = history.filter(item => !(item.r === rgb.r && item.g === rgb.g && item.b === rgb.b && item.a === rgb.a));
    const updated = [{ ...rgb, timestamp: Date.now() }, ...filtered].slice(0, 30);
    saveHistory(updated);
  };

  // Restore history color item
  const handleRestoreFromHistory = (item: typeof rgb) => {
    setRgb(item);
    setPastedString(item.a === 1 ? `rgb(${item.r}, ${item.g}, ${item.b})` : `rgba(${item.r}, ${item.g}, ${item.b}, ${item.a})`);
    setParseError(false);
  };

  // Clear history log
  const handleClearHistory = () => {
    saveHistory([]);
  };

  // EyeDropper API logic
  const triggerEyeDropper = async () => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      try {
        // @ts-ignore
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        if (result.sRGBHex) {
          handlePickerChange(result.sRGBHex);
        }
      } catch (err) {
        console.error("EyeDropper aborted or failed", err);
      }
    }
  };

  // --- Derived formats ---
  const hsl = useMemo(() => rgbToHsl(rgb.r, rgb.g, rgb.b), [rgb.r, rgb.g, rgb.b]);
  const hex6 = useMemo(() => rgbToHex(rgb.r, rgb.g, rgb.b), [rgb.r, rgb.g, rgb.b]);
  const hex8 = useMemo(() => rgbaToHexa(rgb.r, rgb.g, rgb.b, rgb.a), [rgb, rgb.a]);

  const formats = useMemo(() => {
    const alphaFormatted = rgb.a.toFixed(2).replace(/\.?0+$/, "");
    return {
      hex: hex6,
      hexa: hex8,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alphaFormatted})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${alphaFormatted})`,
      tailwindBg: `bg-[${hex6}]`,
      tailwindText: `text-[${hex6}]`,
      tailwindBorder: `border-[${hex6}]`
    };
  }, [rgb, hsl, hex6, hex8]);

  // Accessibility relative luminance
  const luminance = useMemo(() => getRelativeLuminance(rgb.r, rgb.g, rgb.b), [rgb.r, rgb.g, rgb.b]);
  const contrastWhite = useMemo(() => getContrastRatio(luminance, 1.0), [luminance]);
  const contrastBlack = useMemo(() => getContrastRatio(luminance, 0.0), [luminance]);

  const wcagRatings = useMemo(() => {
    return {
      whiteNormal: { aa: contrastWhite >= 4.5, aaa: contrastWhite >= 7.0 },
      whiteLarge: { aa: contrastWhite >= 3.0, aaa: contrastWhite >= 4.5 },
      blackNormal: { aa: contrastBlack >= 4.5, aaa: contrastBlack >= 7.0 },
      blackLarge: { aa: contrastBlack >= 3.0, aaa: contrastBlack >= 4.5 }
    };
  }, [contrastWhite, contrastBlack]);

  // Color previews styles
  const autoTextClass = luminance > 0.179 ? "text-slate-950" : "text-white";

  // Dynamic harmonies
  const harmonies = useMemo(() => {
    const getHexFromHsl = (h: number, s: number, l: number) => {
      const { r, g, b } = hslToRgb((h + 360) % 360, clamp(s, 0, 100), clamp(l, 0, 100));
      return rgbToHex(r, g, b);
    };

    return {
      complementary: [
        { name: "Base", hex: hex6 },
        { name: "Complement", hex: getHexFromHsl(hsl.h + 180, hsl.s, hsl.l) }
      ],
      analogous: [
        { name: "Analogous Left", hex: getHexFromHsl(hsl.h - 30, hsl.s, hsl.l) },
        { name: "Base", hex: hex6 },
        { name: "Analogous Right", hex: getHexFromHsl(hsl.h + 30, hsl.s, hsl.l) }
      ],
      triadic: [
        { name: "Triad 1", hex: getHexFromHsl(hsl.h - 120, hsl.s, hsl.l) },
        { name: "Base", hex: hex6 },
        { name: "Triad 2", hex: getHexFromHsl(hsl.h + 120, hsl.s, hsl.l) }
      ],
      monochromatic: [
        { name: "Darkest", hex: getHexFromHsl(hsl.h, hsl.s, Math.max(10, hsl.l - 30)) },
        { name: "Darker", hex: getHexFromHsl(hsl.h, hsl.s, Math.max(20, hsl.l - 15)) },
        { name: "Base", hex: hex6 },
        { name: "Lighter", hex: getHexFromHsl(hsl.h, hsl.s, Math.min(90, hsl.l + 15)) },
        { name: "Lightest", hex: getHexFromHsl(hsl.h, hsl.s, Math.min(98, hsl.l + 30)) }
      ]
    };
  }, [hex6, hsl]);

  // Code generation blocks
  const cssVariablesBlock = useMemo(() => {
    return `:root {\n  --color-primary-hex: ${hex6};\n  --color-primary-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};\n  --color-primary-hsl: ${hsl.h}, ${hsl.s}%, ${hsl.l}%;\n  --color-primary-alpha: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a});\n}`;
  }, [rgb, hsl, hex6]);

  const scssVariablesBlock = useMemo(() => {
    return `$color-primary-hex: ${hex6};\n$color-primary-rgb: rgb(${rgb.r}, ${rgb.g}, ${rgb.b});\n$color-primary-rgba: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a});\n$color-primary-hsl: hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%);`;
  }, [rgb, hsl, hex6]);

  const jsonExportData = useMemo(() => {
    return JSON.stringify(
      {
        name: "RGB to HEX Color Spec",
        rgb: { r: rgb.r, g: rgb.g, b: rgb.b, a: rgb.a },
        hex: hex6,
        hexa: hex8,
        hsl: { h: hsl.h, s: hsl.s, l: hsl.l },
        luminance: Number(luminance.toFixed(4)),
        contrastRatios: {
          againstWhite: Number(contrastWhite.toFixed(2)),
          againstBlack: Number(contrastBlack.toFixed(2))
        },
        harmonies: {
          complementary: harmonies.complementary.map(h => h.hex),
          analogous: harmonies.analogous.map(h => h.hex),
          triadic: harmonies.triadic.map(h => h.hex),
          monochromatic: harmonies.monochromatic.map(h => h.hex)
        }
      },
      null,
      2
    );
  }, [rgb, hex6, hex8, hsl, luminance, contrastWhite, contrastBlack, harmonies]);

  // Asset downloads
  const handleDownloadFile = (type: "json" | "css" | "scss") => {
    let content = "";
    let mime = "text/plain";
    let ext = "txt";

    if (type === "json") {
      content = jsonExportData;
      mime = "application/json";
      ext = "json";
    } else if (type === "css") {
      content = cssVariablesBlock;
      mime = "text/css";
      ext = "css";
    } else if (type === "scss") {
      content = scssVariablesBlock;
      mime = "text/x-scss";
      ext = "scss";
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `color-tokens-${hex6.toLowerCase().replace("#", "")}.${ext}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 150);
  };

  // --- Bulk conversions parser loop ---
  useEffect(() => {
    const lines = bulkInput.split("\n");
    const mapped = lines.map(line => {
      const trimmed = line.trim();
      if (!trimmed) return { input: "", hex: "", isValid: false };
      const parsed = parseRgbColor(trimmed);
      if (parsed) {
        const hex = parsed.a === 1 ? rgbToHex(parsed.r, parsed.g, parsed.b) : rgbaToHexa(parsed.r, parsed.g, parsed.b, parsed.a);
        return { input: trimmed, hex, isValid: true };
      }
      return { input: trimmed, hex: "Invalid format", isValid: false };
    }).filter(item => item.input !== "");

    setBulkResults(mapped);
  }, [bulkInput]);

  const handleBulkCopy = () => {
    const text = bulkResults.map(r => `${r.input} => ${r.hex}`).join("\n");
    handleCopy(text, "Bulk Conversions");
  };

  const handleBulkDownload = () => {
    const data = JSON.stringify(bulkResults.filter(r => r.isValid).map(r => ({ input: r.input, hex: r.hex })), null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bulk-colors.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 150);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-slate-400">
        <RefreshCw className="animate-spin mr-2" /> Initializing Workspace...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Toast popup */}
      {copiedText && (
        <div className="fixed bottom-5 right-5 bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle size={18} />
          <span>Copied <strong>{copiedText}</strong> to clipboard!</span>
        </div>
      )}

      {/* Tabs Selector Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab("single")}
          className={`px-5 py-3 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "single"
              ? "border-[#518231] text-[#518231]"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Sliders size={16} /> Single Converter
        </button>
        <button
          onClick={() => setActiveTab("bulk")}
          className={`px-5 py-3 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all ${
            activeTab === "bulk"
              ? "border-[#518231] text-[#518231]"
              : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
          }`}
        >
          <Table size={16} /> Bulk Conversion Mode
        </button>
      </div>

      {activeTab === "single" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT: Controls, Inputs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Input Hub */}
            <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  <Sliders className="text-[#518231]" size={18} /> RGB / RGBA Controls
                </h2>
                <div className="flex gap-2">
                  {typeof window !== "undefined" && "EyeDropper" in window && (
                    <button
                      onClick={triggerEyeDropper}
                      className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center gap-1.5 text-xs font-semibold"
                      title="Use screen eyedropper"
                    >
                      <Pipette size={12} /> Eyedropper
                    </button>
                  )}
                  <button
                    onClick={handleRandomizeColor}
                    className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center gap-1.5 text-xs font-semibold"
                  >
                    <RefreshCw size={12} /> Randomize
                  </button>
                  <button
                    onClick={handleSaveToHistory}
                    className="px-3 py-1.5 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg transition flex items-center gap-1.5 text-xs font-semibold shadow-sm"
                  >
                    Save Color
                  </button>
                </div>
              </div>

              {/* Paste Input / Custom String */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Paste CSS RGB / RGBA String</label>
                <input
                  type="text"
                  value={pastedString}
                  onChange={(e) => handlePasteStringChange(e.target.value)}
                  className={`w-full bg-white dark:bg-slate-950 font-mono font-bold px-3 py-3 rounded-lg border focus:ring-2 focus:outline-none transition ${
                    parseError
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                      : "border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-[#518231]/20"
                  }`}
                  placeholder="rgb(81, 130, 49) or 81, 130, 49"
                />
                {parseError && (
                  <p className="text-xs text-red-500 font-medium">Invalid RGB/RGBA formatting string template. Use format: `rgb(R, G, B)` or `R, G, B`.</p>
                )}
              </div>

              {/* Channels numerical grids */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {[
                  { channel: "r" as const, label: "Red", color: "text-red-500", accent: "accent-red-500", max: 255, step: 1 },
                  { channel: "g" as const, label: "Green", color: "text-emerald-500", accent: "accent-emerald-500", max: 255, step: 1 },
                  { channel: "b" as const, label: "Blue", color: "text-blue-500", accent: "accent-blue-500", max: 255, step: 1 },
                  { channel: "a" as const, label: "Alpha (Opacity)", color: "text-slate-500", accent: "accent-slate-500", max: 1, step: 0.01 }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800/60 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`text-xs font-bold ${item.color}`}>{item.label}</span>
                      <span className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                        {item.channel === "a" ? `${Math.round(rgb[item.channel] * 100)}%` : rgb[item.channel]}
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max={item.max}
                      step={item.step}
                      value={rgb[item.channel]}
                      onChange={(e) => handleColorValueChange(item.channel, parseFloat(e.target.value))}
                      className={`w-full h-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg appearance-none cursor-pointer ${item.accent}`}
                    />
                  </div>
                ))}
              </div>

              {/* Synchronized color picker inputs */}
              <div className="flex gap-4 items-center bg-white dark:bg-slate-950 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800/60">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Palette Picker Sync:</span>
                <input
                  type="color"
                  value={hex6}
                  onChange={(e) => handlePickerChange(e.target.value)}
                  className="w-10 h-10 border border-slate-200 dark:border-slate-800 rounded-md cursor-pointer bg-transparent"
                />
                <div className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {hex6}
                </div>
              </div>
            </div>

            {/* Output Snippets List */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Output Formats</h3>
              <div className="grid gap-3">
                {[
                  { label: "HEX Code", code: formats.hex },
                  { label: "HEXA 8-Digit (Alpha)", code: formats.hexa },
                  { label: "RGB CSS String", code: formats.rgb },
                  { label: "RGBA CSS String", code: formats.rgba },
                  { label: "HSL String", code: formats.hsl },
                  { label: "HSLA String", code: formats.hsla },
                  { label: "Tailwind BG Class", code: formats.tailwindBg }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-900 group">
                    <div className="space-y-1">
                      <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wide">{item.label}</span>
                      <p className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300 break-all">{item.code}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(item.code, item.label)}
                      className="p-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-md transition hover:scale-105 active:scale-95"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Designer Utilities Previews */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <Compass className="text-[#518231]" size={16} /> UI & Layout Previews
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Light Mode Mock Card */}
                <div className="bg-slate-100 p-5 rounded-lg text-slate-900 border border-slate-200 space-y-3">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wide">Light Theme Preview</span>
                  <div className="bg-white p-4 rounded-md shadow-sm border border-slate-100 space-y-2">
                    <h4 className="font-bold text-sm" style={{ color: hex6 }}>Heading text</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Sample sentence illustrating contrast layouts.</p>
                    <button 
                      className="w-full py-2 px-3 rounded text-xs font-bold text-white transition hover:opacity-90"
                      style={{ backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})` }}
                    >
                      Action Button
                    </button>
                  </div>
                </div>

                {/* Dark Mode Mock Card */}
                <div className="bg-slate-950 p-5 rounded-lg text-white border border-slate-900 space-y-3">
                  <span className="text-[10px] font-black uppercase text-slate-600 tracking-wide">Dark Theme Preview</span>
                  <div className="bg-slate-900 p-4 rounded-md shadow-sm border border-slate-800 space-y-2">
                    <h4 className="font-bold text-sm" style={{ color: hex6 }}>Heading text</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Sample sentence illustrating contrast layouts.</p>
                    <button 
                      className="w-full py-2 px-3 rounded text-xs font-bold text-white transition hover:opacity-90"
                      style={{ backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})` }}
                    >
                      Action Button
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Gradient preview box */}
              <div className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Gradient Flow Preview</span>
                  <div className="flex gap-2 items-center">
                    <span className="font-mono text-xs text-slate-500">{gradientAngle}°</span>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={gradientAngle}
                      onChange={(e) => setGradientAngle(parseInt(e.target.value))}
                      className="w-24 h-1 appearance-none cursor-pointer accent-[#518231] bg-slate-200 dark:bg-slate-800"
                    />
                  </div>
                </div>
                <div 
                  className="h-20 w-full rounded-lg shadow-inner border border-slate-150 dark:border-slate-800"
                  style={{ background: `linear-gradient(${gradientAngle}deg, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a}) 0%, #1e293b 100%)` }}
                />
                <button
                  onClick={() => handleCopy(`linear-gradient(${gradientAngle}deg, ${formats.rgba} 0%, #1e293b 100%)`, "CSS Gradient Code")}
                  className="w-full py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded font-bold text-xs text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1 transition"
                >
                  <Copy size={12} /> Copy Gradient CSS
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT: Previews, Contrast, History */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Color block card preview */}
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-850 shadow-md bg-white dark:bg-slate-900">
              <div
                className="h-40 w-full relative flex items-center justify-center p-6 text-center select-none"
                style={checkerboardBgStyle}
              >
                <div 
                  className="absolute inset-0 transition-colors"
                  style={{ backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})` }}
                />
                <div className={`relative z-10 space-y-1 px-4 py-2 rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-sm shadow-sm ${autoTextClass}`}>
                  <span className="font-mono font-black text-2xl tracking-wider select-text">{formats.hexa}</span>
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Color Preview</p>
                </div>
              </div>

              {/* Accessibility parameters */}
              <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                <div className="p-4 flex flex-col items-center space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">On Black Text</span>
                  <div 
                    className="w-full text-center py-2 text-xs font-bold rounded"
                    style={{ backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`, color: "#000000" }}
                  >
                    Contrast Check
                  </div>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-200">{contrastBlack.toFixed(2)}:1</div>
                  <div className="flex flex-col gap-1 w-full text-center">
                    <span className={`text-[9px] font-extrabold py-0.5 px-1.5 rounded uppercase tracking-wider ${wcagRatings.blackNormal.aa ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"}`}>
                      AA Normal: {wcagRatings.blackNormal.aa ? "Pass" : "Fail"}
                    </span>
                    <span className={`text-[9px] font-extrabold py-0.5 px-1.5 rounded uppercase tracking-wider ${wcagRatings.blackNormal.aaa ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"}`}>
                      AAA Normal: {wcagRatings.blackNormal.aaa ? "Pass" : "Fail"}
                    </span>
                    <span className={`text-[9px] font-extrabold py-0.5 px-1.5 rounded uppercase tracking-wider ${wcagRatings.blackLarge.aa ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"}`}>
                      AA Large: {wcagRatings.blackLarge.aa ? "Pass" : "Fail"}
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col items-center space-y-2">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">On White Text</span>
                  <div 
                    className="w-full text-center py-2 text-xs font-bold rounded"
                    style={{ backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`, color: "#ffffff" }}
                  >
                    Contrast Check
                  </div>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-200">{contrastWhite.toFixed(2)}:1</div>
                  <div className="flex flex-col gap-1 w-full text-center">
                    <span className={`text-[9px] font-extrabold py-0.5 px-1.5 rounded uppercase tracking-wider ${wcagRatings.whiteNormal.aa ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"}`}>
                      AA Normal: {wcagRatings.whiteNormal.aa ? "Pass" : "Fail"}
                    </span>
                    <span className={`text-[9px] font-extrabold py-0.5 px-1.5 rounded uppercase tracking-wider ${wcagRatings.whiteNormal.aaa ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"}`}>
                      AAA Normal: {wcagRatings.whiteNormal.aaa ? "Pass" : "Fail"}
                    </span>
                    <span className={`text-[9px] font-extrabold py-0.5 px-1.5 rounded uppercase tracking-wider ${wcagRatings.whiteLarge.aa ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"}`}>
                      AA Large: {wcagRatings.whiteLarge.aa ? "Pass" : "Fail"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Design Harmonies Palettes */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <Palette className="text-[#518231]" size={16} /> Color Harmonies
              </h3>
              
              <div className="space-y-4">
                {[
                  { label: "Complementary", list: harmonies.complementary },
                  { label: "Analogous", list: harmonies.analogous },
                  { label: "Triadic", list: harmonies.triadic },
                  { label: "Monochromatic Variations", list: harmonies.monochromatic }
                ].map((group, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wide">{group.label}</span>
                    <div className="flex h-10 w-full rounded-md overflow-hidden border border-slate-100 dark:border-slate-800">
                      {group.list.map((c, i) => (
                        <div
                          key={i}
                          className="flex-1 h-full cursor-pointer transition hover:scale-110 relative group/tile"
                          style={{ backgroundColor: c.hex }}
                          onClick={() => handlePickerChange(c.hex)}
                          title={`${c.name}: ${c.hex}`}
                        >
                          <span className="absolute bottom-1 right-1 opacity-0 group-hover/tile:opacity-100 bg-black/60 text-white font-mono text-[8px] font-bold px-1 rounded transition select-none">
                            {c.hex}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Variable code blocks & files exporters */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <FileCode className="text-[#518231]" size={16} /> Export Color Assets
              </h3>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadFile("json")}
                  className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded font-bold text-xs text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Download size={12} /> JSON Spec
                </button>
                <button
                  onClick={() => handleDownloadFile("css")}
                  className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded font-bold text-xs text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Download size={12} /> CSS variables
                </button>
                <button
                  onClick={() => handleDownloadFile("scss")}
                  className="flex-1 py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded font-bold text-xs text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1.5 transition shadow-sm"
                >
                  <Download size={12} /> SCSS map
                </button>
              </div>
              <div className="bg-slate-50 dark:bg-slate-950 rounded-lg p-3 border border-slate-100 dark:border-slate-900 relative">
                <pre className="text-[10px] font-mono text-slate-600 dark:text-slate-400 overflow-x-auto max-h-36 whitespace-pre-wrap">{cssVariablesBlock}</pre>
                <button
                  onClick={() => handleCopy(cssVariablesBlock, "CSS variables block")}
                  className="absolute top-2 right-2 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 rounded hover:bg-slate-100 transition shadow-sm"
                  title="Copy variables snippet"
                >
                  <Copy size={12} />
                </button>
              </div>
            </div>

            {/* Saved Drawer & History Log */}
            <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                  <History size={16} /> History Log
                </h3>
                {history.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="text-slate-400 hover:text-red-500 transition text-[10px] uppercase font-bold flex items-center gap-1"
                  >
                    <Trash2 size={10} /> Clear history
                  </button>
                )}
              </div>
              {history.length > 0 ? (
                <div className="grid grid-cols-6 gap-2">
                  {history.map((item, idx) => {
                    const cleanHex = rgbToHex(item.r, item.g, item.b);
                    return (
                      <div
                        key={idx}
                        onClick={() => handleRestoreFromHistory(item)}
                        className="h-10 rounded-md cursor-pointer border border-slate-200/50 dark:border-slate-800 hover:scale-105 active:scale-95 transition relative group/history-tile"
                        style={{ backgroundColor: `rgba(${item.r}, ${item.g}, ${item.b}, ${item.a})` }}
                        title={`rgba(${item.r}, ${item.g}, ${item.b}, ${item.a})`}
                      >
                        <span className="absolute bottom-1 right-1 opacity-0 group-hover/history-tile:opacity-100 bg-black/60 text-white font-mono text-[7px] font-bold px-1 rounded transition select-none">
                          {cleanHex}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">No recent color history saved yet. Click `Save Color` to store items here.</p>
              )}
            </div>

          </div>
        </div>
      ) : (
        /* BULK CONVERSION MODE VIEW */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input textarea */}
            <div className="lg:col-span-6 space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Paste RGB / RGBA lines (one per line)</label>
              <textarea
                rows={8}
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 font-mono text-sm font-semibold p-4 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-[#518231]/20 focus:border-[#518231] transition"
                placeholder="255, 255, 255&#10;rgb(81, 130, 49)&#10;rgba(59, 130, 246, 0.5)&#10;0 0 0"
              />
              <p className="text-[10px] text-slate-400 leading-normal">
                Supported formats: `R, G, B`, `R G B A`, `rgb(R, G, B)`, `rgba(R, G, B, A)`.
              </p>
            </div>

            {/* Results actions card */}
            <div className="lg:col-span-6 flex flex-col justify-between bg-slate-50 dark:bg-slate-900/60 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Bulk Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-lg border border-slate-100 dark:border-slate-900">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Total lines</span>
                    <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{bulkResults.length}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-950 p-4 rounded-lg border border-slate-100 dark:border-slate-900">
                    <span className="text-[10px] font-bold uppercase text-slate-400">Valid colors</span>
                    <p className="text-2xl font-black text-emerald-600">{bulkResults.filter(r => r.isValid).length}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
                <button
                  onClick={handleBulkCopy}
                  className="flex-1 py-3 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg transition flex items-center justify-center gap-2 text-xs font-bold shadow-sm"
                >
                  <Copy size={14} /> Copy Results List
                </button>
                <button
                  onClick={handleBulkDownload}
                  disabled={bulkResults.filter(r => r.isValid).length === 0}
                  className="flex-1 py-3 bg-[#518231] hover:bg-[#436a28] disabled:bg-slate-200 disabled:text-slate-400 disabled:dark:bg-slate-800 text-white rounded-lg transition flex items-center justify-center gap-2 text-xs font-bold shadow-sm"
                >
                  <Download size={14} /> Download JSON
                </button>
              </div>
            </div>
          </div>

          {/* Results table view */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
                    <th className="p-3.5">Color Preview</th>
                    <th className="p-3.5">Input RGB Code</th>
                    <th className="p-3.5">Hex Output String</th>
                    <th className="p-3.5 text-right">Copy Snippet</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {bulkResults.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-950/50">
                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-7 h-7 rounded border border-slate-200/50" 
                            style={{ backgroundColor: item.isValid ? item.hex : "transparent" }}
                          />
                        </div>
                      </td>
                      <td className="p-3.5 font-mono font-medium text-slate-600 dark:text-slate-400">{item.input}</td>
                      <td className={`p-3.5 font-mono font-bold ${item.isValid ? "text-slate-900 dark:text-slate-100" : "text-red-500"}`}>{item.hex}</td>
                      <td className="p-3.5 text-right">
                        {item.isValid && (
                          <button
                            onClick={() => handleCopy(item.hex, "HEX code")}
                            className="p-1.5 bg-white dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-500 rounded transition"
                          >
                            <Copy size={12} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {bulkResults.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-6 text-center text-slate-400 dark:text-slate-500">
                        Paste RGB values above to view bulk outputs in real-time.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
