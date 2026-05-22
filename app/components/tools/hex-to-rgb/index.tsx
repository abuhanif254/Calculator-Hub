"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Copy, Download, RefreshCw, Trash2, CheckCircle, Sliders, Contrast, Compass, Palette, Check, FileCode, History } from "lucide-react";
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

// Convert HSV to RGB
function hsvToRgb(h: number, s: number, v: number) {
  h = h / 360;
  s = s / 100;
  v = v / 100;
  let r = 0, g = 0, b = 0;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
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

// Parse hex string (3, 4, 6, 8 chars) into { r, g, b, a }
function parseHexColor(str: string): { r: number; g: number; b: number; a: number } | null {
  const cleaned = str.trim().toLowerCase().replace(/^#/, "");
  if (!/^[0-9a-fA-F]{3,8}$/.test(cleaned)) {
    return null;
  }

  let hex = cleaned;
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  } else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  if (hex.length === 6) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b, a: 1 };
  } else if (hex.length === 8) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    const a = parseInt(hex.slice(6, 8), 16) / 255;
    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) return null;
    return { r, g, b, a: Number(a.toFixed(3)) };
  }

  return null;
}

// WCAG Luminance
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

export function HexToRgbTool() {
  const [mounted, setMounted] = useState(false);

  // Raw inputs for hexadecimal values
  const [hexInput, setHexInput] = useState("#518231");
  const [isValid, setIsValid] = useState(true);

  // Core color representation
  const [rgb, setRgb] = useState({ r: 81, g: 130, b: 49, a: 1.0 });

  // History list
  const [history, setHistory] = useState<Array<{ hex: string; alpha: number; timestamp: number }>>([]);

  // Toast copied helper
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Gradient Preview angle
  const [gradientAngle, setGradientAngle] = useState(135);

  // Interactive WCAG preview sentence
  const [wcagText, setWcagText] = useState("The quick brown fox jumps over the lazy dog");
  const [wcagFontSize, setWcagFontSize] = useState(16);
  const [wcagFontBold, setWcagFontBold] = useState(false);

  // Populate mount-level actions (e.g., Load History, Register analytics view)
  useEffect(() => {
    setMounted(true);
    addToGlobalHistory({ slug: "hex-to-rgb", title: "HEX to RGB Converter", type: "tool" });

    if (typeof window !== "undefined") {
      try {
        const savedHistory = localStorage.getItem("nexus-hex-rgb-history");
        if (savedHistory) {
          setHistory(JSON.parse(savedHistory));
        }
      } catch (err) {
        console.error("Failed to load color history", err);
      }
    }
  }, []);

  // Update localStorage when history changes
  const saveHistory = (newHistory: typeof history) => {
    setHistory(newHistory);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("nexus-hex-rgb-history", JSON.stringify(newHistory));
      } catch (err) {
        console.error("Failed to save history to storage", err);
      }
    }
  };

  // Helper: Trigger visual toast when copying to clipboard
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(label);
      setTimeout(() => {
        setCopiedText(null);
      }, 1500);
    }).catch(() => {
      setCopiedText("Failed to copy");
      setTimeout(() => {
        setCopiedText(null);
      }, 1500);
    });
  };

  // Main HEX string input change handler
  const handleHexInputChange = (val: string) => {
    setHexInput(val);
    const parsed = parseHexColor(val);
    if (parsed) {
      setIsValid(true);
      setRgb(parsed);
    } else {
      setIsValid(false);
    }
  };

  // Add the current color configuration to local history
  const handleSaveToHistory = (hexToSave: string, alphaToSave: number) => {
    const cleanHex = hexToSave.startsWith("#") ? hexToSave.toUpperCase() : `#${hexToSave}`.toUpperCase();
    
    // Prevent duplicates in history
    const filtered = history.filter(item => !(item.hex === cleanHex && item.alpha === alphaToSave));
    const updated = [{ hex: cleanHex, alpha: alphaToSave, timestamp: Date.now() }, ...filtered].slice(0, 30);
    saveHistory(updated);
  };

  // Slider change handlers
  const handleColorValueChange = (channel: "r" | "g" | "b" | "a", value: number) => {
    const updatedRgb = { ...rgb, [channel]: value };
    setRgb(updatedRgb);
    
    // Reconstruct the Hex value from RGB details
    const newHex = updatedRgb.a === 1 
      ? rgbToHex(updatedRgb.r, updatedRgb.g, updatedRgb.b)
      : rgbaToHexa(updatedRgb.r, updatedRgb.g, updatedRgb.b, updatedRgb.a);

    setHexInput(newHex);
    setIsValid(true);
  };

  // Generate a random HEX code
  const handleRandomizeColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Number((Math.random() * 0.6 + 0.4).toFixed(2)); // Random alpha between 0.4 and 1.0
    const finalAlpha = Math.random() > 0.3 ? 1.0 : a; // 70% chance of solid colors

    const updatedRgb = { r, g, b, a: finalAlpha };
    setRgb(updatedRgb);

    const newHex = finalAlpha === 1 
      ? rgbToHex(r, g, b)
      : rgbaToHexa(r, g, b, finalAlpha);

    setHexInput(newHex);
    setIsValid(true);
  };

  // Select a past color from history
  const handleSelectFromHistory = (hex: string, alpha: number) => {
    setHexInput(hex);
    const parsed = parseHexColor(hex);
    if (parsed) {
      setRgb({ ...parsed, a: alpha });
      setIsValid(true);
    }
  };

  // Clear history log
  const handleClearHistory = () => {
    saveHistory([]);
  };

  // --- DERIVED METRICS ---

  // Standard HSL values
  const hsl = useMemo(() => {
    return rgbToHsl(rgb.r, rgb.g, rgb.b);
  }, [rgb.r, rgb.g, rgb.b]);

  // Standard HSV values
  const hsv = useMemo(() => {
    return rgbToHsv(rgb.r, rgb.g, rgb.b);
  }, [rgb.r, rgb.g, rgb.b]);

  // Full CSS and utility output strings
  const stringFormats = useMemo(() => {
    const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    const rgbaStr = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a.toFixed(2).replace(/\.?0+$/, "")})`;
    const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    const hslaStr = `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${rgb.a.toFixed(2).replace(/\.?0+$/, "")})`;
    const hsvStr = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
    const hex6 = rgbToHex(rgb.r, rgb.g, rgb.b);
    const hex8 = rgbaToHexa(rgb.r, rgb.g, rgb.b, rgb.a);

    return {
      rgb: rgbStr,
      rgba: rgbaStr,
      hsl: hslStr,
      hsla: hslaStr,
      hsv: hsvStr,
      hex6,
      hex8,
      tailwindBg: `bg-[${hex6}]`,
      tailwindText: `text-[${hex6}]`,
      tailwindBorder: `border-[${hex6}]`
    };
  }, [rgb, hsl, hsv]);

  // WCAG Contrast metrics
  const relativeLuminance = useMemo(() => {
    return getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  }, [rgb.r, rgb.g, rgb.b]);

  const contrastRatioWhite = useMemo(() => {
    return getContrastRatio(relativeLuminance, 1.0); // white is 1.0
  }, [relativeLuminance]);

  const contrastRatioBlack = useMemo(() => {
    return getContrastRatio(relativeLuminance, 0.0); // black is 0.0
  }, [relativeLuminance]);

  // Generate color harmony coordinates
  const harmonies = useMemo(() => {
    const getHexFromHsl = (h: number, s: number, l: number) => {
      const { r, g, b } = hslToRgb((h + 360) % 360, clamp(s, 0, 100), clamp(l, 0, 100));
      return rgbToHex(r, g, b);
    };

    return {
      complementary: [
        { name: "Base", hex: rgbToHex(rgb.r, rgb.g, rgb.b) },
        { name: "Complement", hex: getHexFromHsl(hsl.h + 180, hsl.s, hsl.l) }
      ],
      analogous: [
        { name: "Analogous Left", hex: getHexFromHsl(hsl.h - 30, hsl.s, hsl.l) },
        { name: "Base", hex: rgbToHex(rgb.r, rgb.g, rgb.b) },
        { name: "Analogous Right", hex: getHexFromHsl(hsl.h + 30, hsl.s, hsl.l) }
      ],
      triadic: [
        { name: "Triad 1", hex: getHexFromHsl(hsl.h - 120, hsl.s, hsl.l) },
        { name: "Base", hex: rgbToHex(rgb.r, rgb.g, rgb.b) },
        { name: "Triad 2", hex: getHexFromHsl(hsl.h + 120, hsl.s, hsl.l) }
      ],
      monochromatic: [
        { name: "Darkest", hex: getHexFromHsl(hsl.h, hsl.s, Math.max(10, hsl.l - 30)) },
        { name: "Darker", hex: getHexFromHsl(hsl.h, hsl.s, Math.max(20, hsl.l - 15)) },
        { name: "Base", hex: rgbToHex(rgb.r, rgb.g, rgb.b) },
        { name: "Lighter", hex: getHexFromHsl(hsl.h, hsl.s, Math.min(90, hsl.l + 15)) },
        { name: "Lightest", hex: getHexFromHsl(hsl.h, hsl.s, Math.min(98, hsl.l + 30)) }
      ]
    };
  }, [rgb, hsl]);

  // Exportable codes
  const cssVariablesBlock = useMemo(() => {
    return `:root {\n  --color-primary-hex: ${stringFormats.hex6};\n  --color-primary-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};\n  --color-primary-hsl: ${hsl.h}, ${hsl.s}%, ${hsl.l}%;\n  --color-primary-alpha: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a});\n}`;
  }, [rgb, hsl, stringFormats]);

  const jsonExportData = useMemo(() => {
    return JSON.stringify(
      {
        name: "HEX to RGB Export",
        hex: stringFormats.hex6,
        hexa: stringFormats.hex8,
        rgb: stringFormats.rgb,
        rgba: stringFormats.rgba,
        hsl: stringFormats.hsl,
        hsla: stringFormats.hsla,
        hsv: stringFormats.hsv,
        relativeLuminance: Number(relativeLuminance.toFixed(4)),
        contrastRatios: {
          againstWhite: Number(contrastRatioWhite.toFixed(2)),
          againstBlack: Number(contrastRatioBlack.toFixed(2))
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
  }, [stringFormats, rgb, relativeLuminance, contrastRatioWhite, contrastRatioBlack, harmonies]);

  // Trigger JSON download file Action
  const downloadJsonFile = () => {
    const blob = new Blob([jsonExportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `color-spec-${stringFormats.hex6.toLowerCase().replace("#", "")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 150);
  };

  // Determine WCAG passes/fails
  const getWcagRating = (ratio: number, size: "normal" | "large") => {
    if (size === "normal") {
      const aa = ratio >= 4.5;
      const aaa = ratio >= 7.0;
      return { aa, aaa };
    } else {
      const aa = ratio >= 3.0;
      const aaa = ratio >= 4.5;
      return { aa, aaa };
    }
  };

  const wcagWhiteNormal = getWcagRating(contrastRatioWhite, "normal");
  const wcagWhiteLarge = getWcagRating(contrastRatioWhite, "large");
  const wcagBlackNormal = getWcagRating(contrastRatioBlack, "normal");
  const wcagBlackLarge = getWcagRating(contrastRatioBlack, "large");

  // Determine appropriate text color (black vs white) on background
  const autoForegroundTextClass = relativeLuminance > 0.179 ? "text-slate-950" : "text-white";

  // Prevent flash before hydration completes
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-slate-400">
        <RefreshCw className="animate-spin mr-2" /> Initializing Workspace...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Toast Alert popup for copies */}
      {copiedText && (
        <div className="fixed bottom-5 right-5 bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 z-50 animate-bounce">
          <CheckCircle size={18} />
          <span>Copied <strong>{copiedText}</strong> to clipboard!</span>
        </div>
      )}

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls & Input Area */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card 1: Input Control Hub */}
          <div className="bg-slate-50 dark:bg-slate-900/60 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                <Sliders className="text-[#518231]" size={18} /> Color Input Hub
              </h2>
              <div className="flex gap-2">
                <button
                  id="btn-randomize"
                  onClick={handleRandomizeColor}
                  className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition flex items-center gap-1.5 text-xs font-semibold"
                  title="Generate a random HEX color code"
                  aria-label="Generate a random HEX color code"
                >
                  <RefreshCw size={12} /> Randomize
                </button>
                <button
                  id="btn-save-color"
                  onClick={() => handleSaveToHistory(hexInput, rgb.a)}
                  disabled={!isValid}
                  className="px-3 py-1.5 bg-[#518231] hover:bg-[#436a28] disabled:bg-slate-300 disabled:dark:bg-slate-800 text-white rounded-lg transition flex items-center gap-1.5 text-xs font-semibold shadow-sm"
                  title="Save current color setup to your history drawer"
                  aria-label="Save current color to history"
                >
                  Save Color
                </button>
              </div>
            </div>

            {/* Input hex and active check indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">HEX Color Code</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-medium">#</span>
                  <input
                    id="hex-input"
                    type="text"
                    value={hexInput.replace(/^#/, "")}
                    onChange={(e) => handleHexInputChange(e.target.value)}
                    aria-label="HEX color code input"
                    className={`w-full bg-white dark:bg-slate-950 font-mono font-bold pl-8 pr-10 py-3 rounded-lg border focus:ring-2 focus:outline-none transition ${
                      isValid 
                        ? "border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-[#518231]/20" 
                        : "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    }`}
                    placeholder="518231"
                  />
                  {isValid ? (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 bg-emerald-500 text-white rounded-full flex items-center justify-center" title="Valid Hex Color">
                      <Check size={10} strokeWidth={3} />
                    </span>
                  ) : (
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-red-500" title="Invalid Hex Format">
                      !
                    </span>
                  )}
                </div>
                {!isValid && (
                  <p className="text-xs text-red-500 font-medium">
                    Invalid HEX format. Use 3, 4, 6, or 8 characters.
                  </p>
                )}
              </div>

              {/* Alpha percentage slider controller */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex justify-between">
                  <span>Alpha (Opacity)</span>
                  <span className="font-mono text-slate-600 dark:text-slate-300">{Math.round(rgb.a * 100)}%</span>
                </label>
                <div className="h-[46px] flex items-center bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 px-3">
                  <input
                    id="alpha-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={rgb.a}
                    onChange={(e) => handleColorValueChange("a", parseFloat(e.target.value))}
                    aria-label="Alpha opacity slider"
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                  />
                </div>
              </div>
            </div>

            {/* Red, Green, Blue slider sliders */}
            <div className="space-y-4 pt-2 border-t border-slate-200/60 dark:border-slate-800/60">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">RGB Channel Adjustments</span>
              
              <div className="space-y-3">
                {/* Red channel slider */}
                <div className="flex items-center gap-4">
                  <span className="w-8 text-xs font-bold text-red-500">R (Red)</span>
                  <input
                    id="slider-r"
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) => handleColorValueChange("r", parseInt(e.target.value))}
                    aria-label="Red channel slider"
                    className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer accent-red-500"
                    style={{ background: `linear-gradient(to right, rgb(0, ${rgb.g}, ${rgb.b}), rgb(255, ${rgb.g}, ${rgb.b}))` }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.r}
                    onChange={(e) => handleColorValueChange("r", clamp(parseInt(e.target.value) || 0, 0, 255))}
                    aria-label="Red channel value"
                    className="w-16 bg-white dark:bg-slate-950 font-mono text-center text-xs py-1 rounded border border-slate-200 dark:border-slate-800"
                  />
                </div>

                {/* Green channel slider */}
                <div className="flex items-center gap-4">
                  <span className="w-8 text-xs font-bold text-emerald-500">G (Green)</span>
                  <input
                    id="slider-g"
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) => handleColorValueChange("g", parseInt(e.target.value))}
                    aria-label="Green channel slider"
                    className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    style={{ background: `linear-gradient(to right, rgb(${rgb.r}, 0, ${rgb.b}), rgb(${rgb.r}, 255, ${rgb.b}))` }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.g}
                    onChange={(e) => handleColorValueChange("g", clamp(parseInt(e.target.value) || 0, 0, 255))}
                    aria-label="Green channel value"
                    className="w-16 bg-white dark:bg-slate-950 font-mono text-center text-xs py-1 rounded border border-slate-200 dark:border-slate-800"
                  />
                </div>

                {/* Blue channel slider */}
                <div className="flex items-center gap-4">
                  <span className="w-8 text-xs font-bold text-blue-500">B (Blue)</span>
                  <input
                    id="slider-b"
                    type="range"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) => handleColorValueChange("b", parseInt(e.target.value))}
                    aria-label="Blue channel slider"
                    className="flex-1 h-1.5 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    style={{ background: `linear-gradient(to right, rgb(${rgb.r}, ${rgb.g}, 0), rgb(${rgb.r}, ${rgb.g}, 255))` }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="255"
                    value={rgb.b}
                    onChange={(e) => handleColorValueChange("b", clamp(parseInt(e.target.value) || 0, 0, 255))}
                    aria-label="Blue channel value"
                    className="w-16 bg-white dark:bg-slate-950 font-mono text-center text-xs py-1 rounded border border-slate-200 dark:border-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Conversions Output Format List */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Output Formats</h3>
            
            <div className="grid gap-3">
              {[
                { label: "RGB", code: stringFormats.rgb },
                { label: "RGBA", code: stringFormats.rgba },
                { label: "HSL", code: stringFormats.hsl },
                { label: "HSLA", code: stringFormats.hsla },
                { label: "HSV/HSB", code: stringFormats.hsv },
                { label: "HEX 6-Digit", code: stringFormats.hex6 },
                { label: "HEX 8-Digit (Alpha)", code: stringFormats.hex8 },
                { label: "Tailwind BG Class", code: stringFormats.tailwindBg },
                { label: "Tailwind Text Class", code: stringFormats.tailwindText }
              ].map((format, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-900 group">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wide">{format.label}</span>
                    <p className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300 break-all">{format.code}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(format.code, format.label)}
                    aria-label={`Copy ${format.label} to clipboard`}
                    className="p-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-md transition hover:scale-105 active:scale-95"
                    title={`Copy ${format.label} string`}
                  >
                    <Copy size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Previews & Accessibility */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Box 1: Large Interactive Color Visual Box */}
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-850 shadow-md">
            <div
              className="h-44 w-full relative flex items-center justify-center p-6 text-center select-none"
              style={checkerboardBgStyle}
            >
              <div 
                className="absolute inset-0 transition-colors"
                style={{ backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})` }}
              />
              <div className={`relative z-10 space-y-1 px-4 py-2 rounded-lg bg-white/20 dark:bg-black/20 backdrop-blur-sm shadow-sm ${autoForegroundTextClass}`}>
                <span className="font-mono font-black text-2xl tracking-wider select-text">{stringFormats.hex8}</span>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Color Preview</p>
              </div>
            </div>

            {/* Contrast rating visual checkers */}
            <div className="grid grid-cols-2 divide-x divide-slate-100 dark:divide-slate-800 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              {/* Black foreground text check */}
              <div className="p-4 flex flex-col items-center text-center space-y-2">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Black Text</span>
                <div 
                  className="w-full py-3 rounded-lg font-bold border" 
                  style={{ backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`, color: "#000000", borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)` }}
                >
                  Aa Contrast
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-black text-slate-800 dark:text-slate-200">{contrastRatioBlack.toFixed(2)}:1</div>
                  <div className="space-y-1">
                    <div className="flex gap-1 justify-center">
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${wcagBlackNormal.aa ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"}`}>
                        AA {wcagBlackNormal.aa ? "Pass" : "Fail"}
                      </span>
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${wcagBlackNormal.aaa ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"}`}>
                        AAA {wcagBlackNormal.aaa ? "Pass" : "Fail"}
                      </span>
                    </div>
                    <div className="flex gap-1 justify-center">
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${wcagBlackLarge.aa ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"}`}>
                        AA Large {wcagBlackLarge.aa ? "Pass" : "Fail"}
                      </span>
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${wcagBlackLarge.aaa ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"}`}>
                        AAA Large {wcagBlackLarge.aaa ? "Pass" : "Fail"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* White foreground text check */}
              <div className="p-4 flex flex-col items-center text-center space-y-2">
                <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">White Text</span>
                <div 
                  className="w-full py-3 rounded-lg font-bold border" 
                  style={{ backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`, color: "#FFFFFF", borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)` }}
                >
                  Aa Contrast
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-black text-slate-800 dark:text-slate-200">{contrastRatioWhite.toFixed(2)}:1</div>
                  <div className="space-y-1">
                    <div className="flex gap-1 justify-center">
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${wcagWhiteNormal.aa ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"}`}>
                        AA {wcagWhiteNormal.aa ? "Pass" : "Fail"}
                      </span>
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${wcagWhiteNormal.aaa ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"}`}>
                        AAA {wcagWhiteNormal.aaa ? "Pass" : "Fail"}
                      </span>
                    </div>
                    <div className="flex gap-1 justify-center">
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${wcagWhiteLarge.aa ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"}`}>
                        AA Large {wcagWhiteLarge.aa ? "Pass" : "Fail"}
                      </span>
                      <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase tracking-wider ${wcagWhiteLarge.aaa ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300" : "bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300"}`}>
                        AAA Large {wcagWhiteLarge.aaa ? "Pass" : "Fail"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2: WCAG Accessibility Analysis Tester */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <Contrast className="text-[#518231]" size={16} /> Interactive WCAG Contrast Checker
            </h3>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-900 text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Relative Luminance:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{relativeLuminance.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Contrast with White:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{contrastRatioWhite.toFixed(2)}:1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 font-medium">Contrast with Black:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{contrastRatioBlack.toFixed(2)}:1</span>
                </div>
              </div>

              {/* Custom testing textbox preview */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Custom Preview Text</label>
                <input
                  type="text"
                  value={wcagText}
                  onChange={(e) => setWcagText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-sm focus:outline-none focus:border-[#518231]"
                  placeholder="Enter sample sentence to test..."
                />
                
                {/* Font customization sliders */}
                <div className="grid grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase flex justify-between">
                      <span>Size</span>
                      <span>{wcagFontSize}px</span>
                    </span>
                    <input
                      type="range"
                      min="12"
                      max="40"
                      value={wcagFontSize}
                      onChange={(e) => setWcagFontSize(parseInt(e.target.value))}
                      className="w-full accent-[#518231] h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex items-end justify-end">
                    <button
                      onClick={() => setWcagFontBold(!wcagFontBold)}
                      className={`px-3 py-1 text-xs rounded border transition font-bold w-full text-center ${
                        wcagFontBold 
                          ? "bg-[#518231] border-[#518231] text-white" 
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-400"
                      }`}
                    >
                      {wcagFontBold ? "Bold Active" : "Set Bold"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Dual custom colors preview blocks */}
              <div className="grid grid-cols-1 gap-2 pt-2">
                <div 
                  className="p-4 rounded-xl border flex flex-col justify-center min-h-[60px]"
                  style={{ backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`, color: "#000000", borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` }}
                >
                  <p style={{ fontSize: `${wcagFontSize}px`, fontWeight: wcagFontBold ? "bold" : "normal" }}>
                    {wcagText}
                  </p>
                  <span className="text-[9px] font-black uppercase tracking-wider opacity-65 mt-2">Black Text Preview ({contrastRatioBlack.toFixed(2)}:1)</span>
                </div>

                <div 
                  className="p-4 rounded-xl border flex flex-col justify-center min-h-[60px]"
                  style={{ backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`, color: "#FFFFFF", borderColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)` }}
                >
                  <p style={{ fontSize: `${wcagFontSize}px`, fontWeight: wcagFontBold ? "bold" : "normal" }}>
                    {wcagText}
                  </p>
                  <span className="text-[9px] font-black uppercase tracking-wider opacity-65 mt-2">White Text Preview ({contrastRatioWhite.toFixed(2)}:1)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HARMONY PALETTES & GRADIENTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Box 1: Dynamic Harmony Palettes */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-5">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <Palette className="text-[#518231]" size={16} /> Color Harmonies
          </h3>
          
          <div className="space-y-4">
            {/* Complementary */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Complementary (180°)</span>
              <div className="flex rounded-lg overflow-hidden h-14 border border-slate-200 dark:border-slate-850">
                {harmonies.complementary.map((colorItem, i) => (
                  <div
                    key={i}
                    onClick={() => handleHexInputChange(colorItem.hex)}
                    className="flex-1 relative group cursor-pointer flex flex-col justify-end p-2 transition-transform hover:scale-102 hover:z-10"
                    style={{ backgroundColor: colorItem.hex }}
                    title={`Click to load: ${colorItem.hex} (${colorItem.name})`}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/20 flex items-center justify-center text-xs font-bold text-white transition-opacity select-none">
                      Load
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-white/80 dark:bg-slate-900/80 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200 w-max truncate max-w-full">
                      {colorItem.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Analogous */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Analogous (±30°)</span>
              <div className="flex rounded-lg overflow-hidden h-14 border border-slate-200 dark:border-slate-850">
                {harmonies.analogous.map((colorItem, i) => (
                  <div
                    key={i}
                    onClick={() => handleHexInputChange(colorItem.hex)}
                    className="flex-1 relative group cursor-pointer flex flex-col justify-end p-2 transition-transform hover:scale-102 hover:z-10"
                    style={{ backgroundColor: colorItem.hex }}
                    title={`Click to load: ${colorItem.hex} (${colorItem.name})`}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/20 flex items-center justify-center text-xs font-bold text-white transition-opacity select-none">
                      Load
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-white/80 dark:bg-slate-900/80 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200 w-max truncate max-w-full">
                      {colorItem.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Triadic */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Triadic (+120°, +240°)</span>
              <div className="flex rounded-lg overflow-hidden h-14 border border-slate-200 dark:border-slate-850">
                {harmonies.triadic.map((colorItem, i) => (
                  <div
                    key={i}
                    onClick={() => handleHexInputChange(colorItem.hex)}
                    className="flex-1 relative group cursor-pointer flex flex-col justify-end p-2 transition-transform hover:scale-102 hover:z-10"
                    style={{ backgroundColor: colorItem.hex }}
                    title={`Click to load: ${colorItem.hex} (${colorItem.name})`}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/20 flex items-center justify-center text-xs font-bold text-white transition-opacity select-none">
                      Load
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-white/80 dark:bg-slate-900/80 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200 w-max truncate max-w-full">
                      {colorItem.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Monochromatic */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Monochromatic Shades</span>
              <div className="flex rounded-lg overflow-hidden h-14 border border-slate-200 dark:border-slate-850">
                {harmonies.monochromatic.map((colorItem, i) => (
                  <div
                    key={i}
                    onClick={() => handleHexInputChange(colorItem.hex)}
                    className="flex-1 relative group cursor-pointer flex flex-col justify-end p-2 transition-transform hover:scale-102 hover:z-10"
                    style={{ backgroundColor: colorItem.hex }}
                    title={`Click to load: ${colorItem.hex} (${colorItem.name})`}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black/20 flex items-center justify-center text-xs font-bold text-white transition-opacity select-none">
                      Load
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-white/80 dark:bg-slate-900/80 px-1 py-0.5 rounded text-slate-800 dark:text-slate-200 w-max truncate max-w-full">
                      {colorItem.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Box 2: Linear Gradient Flow Previewer */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <Compass className="text-[#518231]" size={16} /> Linear Gradient Flow
          </h3>
          
          {/* Gradient preview and secondary color math */}
          {(() => {
            const complementColor = harmonies.complementary[1].hex;
            const gradientCode = `linear-gradient(${gradientAngle}deg, ${stringFormats.hex6}, ${complementColor})`;
            
            return (
              <div className="space-y-4">
                <div
                  className="h-28 w-full rounded-xl shadow-inner border border-slate-200/50 dark:border-slate-800"
                  style={{ background: gradientCode }}
                />
                
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                    <span>Gradient Angle</span>
                    <span className="font-mono text-slate-700 dark:text-slate-400">{gradientAngle}°</span>
                  </div>
                  <input
                    id="gradient-angle"
                    type="range"
                    min="0"
                    max="360"
                    value={gradientAngle}
                    onChange={(e) => setGradientAngle(parseInt(e.target.value))}
                    aria-label="Gradient angle slider"
                    className="w-full accent-[#518231] h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-900 flex items-center justify-between group">
                  <div className="space-y-1">
                    <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wide">CSS Background Style</span>
                    <code className="text-xs font-mono text-slate-600 dark:text-slate-400 select-all block break-all pr-4">{gradientCode}</code>
                  </div>
                  <button
                    onClick={() => handleCopy(gradientCode, "CSS Gradient Code")}
                    aria-label="Copy CSS gradient code to clipboard"
                    className="p-2 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 rounded-md transition"
                  >
                    <Copy size={13} />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* CSS VARIABLES, JSON EXPORT & PERSISTED HISTORY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Box 1: Exporter Panel */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
            <FileCode className="text-[#518231]" size={16} /> Developer Export Panel
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">CSS Custom Properties Block</span>
              <div className="relative group">
                <pre className="text-xs font-mono bg-slate-950 text-slate-300 p-4 rounded-lg overflow-x-auto select-all leading-relaxed whitespace-pre">
                  {cssVariablesBlock}
                </pre>
                <button
                  onClick={() => handleCopy(cssVariablesBlock, "CSS Variables Block")}
                  className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded transition shadow"
                  title="Copy CSS block"
                >
                  <Copy size={12} />
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                id="btn-download-json"
                onClick={downloadJsonFile}
                aria-label="Download color specification as JSON file"
                className="flex-1 py-2.5 px-4 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg transition font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
              >
                <Download size={14} /> Download Color Specs JSON
              </button>
            </div>
          </div>
        </div>

        {/* Box 2: Persisted Color History log */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
                <History className="text-[#518231]" size={16} /> Color History Logs
              </h3>
              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-1 font-semibold"
                >
                  <Trash2 size={12} /> Clear Logs
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="h-36 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
                <History size={24} className="text-slate-300 dark:text-slate-700 mb-2" />
                <p className="text-xs text-slate-400 dark:text-slate-500">Your recent color history is empty.</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-1">Colors you save will show up here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-5 sm:grid-cols-8 gap-2.5 max-h-36 overflow-y-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.timestamp}
                    onClick={() => handleSelectFromHistory(item.hex, item.alpha)}
                    className="relative aspect-square rounded-lg border border-slate-200/50 dark:border-slate-800/80 cursor-pointer shadow-sm group hover:scale-105 transition-all overflow-hidden"
                    style={checkerboardBgStyle}
                    title={`Load hex: ${item.hex} (Alpha: ${Math.round(item.alpha * 100)}%)`}
                  >
                    <div 
                      className="absolute inset-0"
                      style={{ backgroundColor: item.hex, opacity: item.alpha }}
                    />
                    {/* Hover tooltip with color code */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <span className="text-[8px] font-mono text-white font-extrabold">{item.hex.replace("#", "")}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-500 pt-3 border-t border-slate-100 dark:border-slate-800/80 mt-4 leading-relaxed">
            Note: Color logs are cached privately in your {"browser's"} LocalStorage and will persist across sessions.
          </p>
        </div>
      </div>
    </div>
  );
}
