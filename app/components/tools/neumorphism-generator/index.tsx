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
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Lock,
  Unlock,
  Maximize2
} from "lucide-react";
import { Link } from "../../../../i18n/routing";
import { addToHistory as addToGlobalHistory } from "../../../../lib/hooks/useToolHistory";

// --- Types ---
interface NeumorphismConfig {
  bgColor: string; // Base background hex
  distance: number; // 0 to 30px
  blur: number; // 0 to 60px
  intensity: number; // 0.05 to 0.4 (shadow opacity multiplier)
  borderRadius: number; // 0 to 60px
  shape: "flat" | "concave" | "convex" | "pressed";
  lightDirection: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "custom";
  customAngle: number; // 0 to 360 degrees
  lightColor: string; // Highlight hex
  darkColor: string; // Shadow cast hex
  lightOpacity: number; // 0 to 1
  darkOpacity: number; // 0 to 1
  borderOutline: boolean; // Add high-contrast thin border option for accessibility
}

interface SavedNeumorphism {
  id: string;
  name: string;
  config: NeumorphismConfig;
  timestamp: number;
}

// --- Presets ---
const PRESETS: Record<string, { name: string; config: NeumorphismConfig }> = {
  light: {
    name: "Light Neumorphism",
    config: {
      bgColor: "#e0e0e0",
      distance: 9,
      blur: 18,
      intensity: 0.15,
      borderRadius: 16,
      shape: "flat",
      lightDirection: "top-left",
      customAngle: 145,
      lightColor: "#ffffff",
      darkColor: "#9a9a9a",
      lightOpacity: 0.9,
      darkOpacity: 0.25,
      borderOutline: false
    }
  },
  dark: {
    name: "Dark Soft Console",
    config: {
      bgColor: "#1e293b",
      distance: 8,
      blur: 16,
      intensity: 0.25,
      borderRadius: 20,
      shape: "flat",
      lightDirection: "top-left",
      customAngle: 145,
      lightColor: "#334155",
      darkColor: "#0f172a",
      lightOpacity: 0.8,
      darkOpacity: 0.5,
      borderOutline: false
    }
  },
  ios: {
    name: "iOS Soft UI",
    config: {
      bgColor: "#f1f5f9",
      distance: 10,
      blur: 20,
      intensity: 0.12,
      borderRadius: 24,
      shape: "convex",
      lightDirection: "top-left",
      customAngle: 145,
      lightColor: "#ffffff",
      darkColor: "#cbd5e1",
      lightOpacity: 1,
      darkOpacity: 0.2,
      borderOutline: false
    }
  },
  pressed: {
    name: "Pressed Soft Inset",
    config: {
      bgColor: "#e2e8f0",
      distance: 6,
      blur: 12,
      intensity: 0.14,
      borderRadius: 12,
      shape: "pressed",
      lightDirection: "top-left",
      customAngle: 145,
      lightColor: "#ffffff",
      darkColor: "#cbd5e1",
      lightOpacity: 0.9,
      darkOpacity: 0.3,
      borderOutline: false
    }
  },
  calculator: {
    name: "Soft Calculator Pad",
    config: {
      bgColor: "#e2e8f0",
      distance: 5,
      blur: 10,
      intensity: 0.15,
      borderRadius: 14,
      shape: "flat",
      lightDirection: "top-left",
      customAngle: 145,
      lightColor: "#ffffff",
      darkColor: "#94a3b8",
      lightOpacity: 0.8,
      darkOpacity: 0.25,
      borderOutline: false
    }
  },
  music: {
    name: "Music Console Console",
    config: {
      bgColor: "#0f172a",
      distance: 6,
      blur: 12,
      intensity: 0.3,
      borderRadius: 28,
      shape: "concave",
      lightDirection: "top-left",
      customAngle: 145,
      lightColor: "#1e293b",
      darkColor: "#020617",
      lightOpacity: 0.7,
      darkOpacity: 0.6,
      borderOutline: false
    }
  },
  luxury: {
    name: "Luxury Minimal Gold",
    config: {
      bgColor: "#fafaf9",
      distance: 7,
      blur: 15,
      intensity: 0.12,
      borderRadius: 8,
      shape: "flat",
      lightDirection: "top-left",
      customAngle: 145,
      lightColor: "#ffffff",
      darkColor: "#e7e5e4",
      lightOpacity: 0.9,
      darkOpacity: 0.2,
      borderOutline: true
    }
  },
  gaming: {
    name: "Gaming Console Pad",
    config: {
      bgColor: "#18181b",
      distance: 8,
      blur: 16,
      intensity: 0.35,
      borderRadius: 18,
      shape: "flat",
      lightDirection: "top-left",
      customAngle: 145,
      lightColor: "#27272a",
      darkColor: "#09090b",
      lightOpacity: 0.7,
      darkOpacity: 0.8,
      borderOutline: false
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

export function NeumorphismGeneratorTool() {
  const [mounted, setMounted] = useState(false);

  // --- Core State ---
  const [config, setConfig] = useState<NeumorphismConfig>(PRESETS.light.config);

  // Color syncing fields
  const [hexInput, setHexInput] = useState("#e0e0e0");
  const [rInput, setRInput] = useState("224");
  const [gInput, setGInput] = useState("224");
  const [bInput, setBInput] = useState("224");
  const [hInput, setHInput] = useState("0");
  const [sInput, setSInput] = useState("0");
  const [lInput, setLInput] = useState("88");

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // UI state bindings
  const [lockBackgrounds, setLockBackgrounds] = useState(true);
  const [canvasBgColor, setCanvasBgColor] = useState("#e0e0e0");
  const [previewTab, setPreviewTab] = useState<"card" | "button" | "toggle" | "slider" | "music" | "calc">("card");
  const [codeTab, setCodeTab] = useState<"css" | "tailwind" | "tailwind-config" | "scss" | "json">("css");
  
  const [copiedText, setCopiedText] = useState(false);
  const [recentConfigs, setRecentConfigs] = useState<SavedNeumorphism[]>([]);
  const [favorites, setFavorites] = useState<SavedNeumorphism[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Interactive Click feedback
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isToggleActive, setIsToggleActive] = useState(false);
  const [sliderVal, setSliderVal] = useState(50);
  const [calcDisplay, setCalcDisplay] = useState("42");
  const [isPlaying, setIsPlaying] = useState(false);

  // Setup on Mount
  useEffect(() => {
    setMounted(true);
    addToGlobalHistory({ slug: "neumorphism-generator", title: "Neumorphism Generator", type: "tool" });

    // Load LocalStorage Cache
    const savedHistory = localStorage.getItem("nexus_neu_history");
    if (savedHistory) {
      try { setRecentConfigs(JSON.parse(savedHistory)); } catch (e) {}
    }
    const savedFavs = localStorage.getItem("nexus_neu_favorites");
    if (savedFavs) {
      try { setFavorites(JSON.parse(savedFavs)); } catch (e) {}
    }
  }, []);

  // Update input text boxes based on color change
  useEffect(() => {
    if (focusedInput === "hex") return;
    setHexInput(config.bgColor);
    const rgb = hexToRgb(config.bgColor);
    setRInput(rgb.r.toString());
    setGInput(rgb.g.toString());
    setBInput(rgb.b.toString());

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setHInput(hsl.h.toString());
    setSInput(hsl.s.toString());
    setLInput(hsl.l.toString());

    // Lock canvas backing to match base
    if (lockBackgrounds) {
      setCanvasBgColor(config.bgColor);
    }
  }, [config.bgColor, lockBackgrounds, focusedInput]);

  // Neumorphic Mathematical calculations for shadow offsets and shades
  const shadowCalculation = useMemo(() => {
    // 1. Calculate X and Y offsets based on light direction
    let dx = config.distance;
    let dy = config.distance;

    if (config.lightDirection === "top-right") {
      dx = -config.distance;
      dy = config.distance;
    } else if (config.lightDirection === "bottom-left") {
      dx = config.distance;
      dy = -config.distance;
    } else if (config.lightDirection === "bottom-right") {
      dx = -config.distance;
      dy = -config.distance;
    } else if (config.lightDirection === "custom") {
      // Custom Angle math (radians)
      const rad = (config.customAngle * Math.PI) / 180;
      dx = Math.round(Math.cos(rad) * config.distance);
      dy = Math.round(Math.sin(rad) * config.distance);
    }

    // 2. Compute shade and highlight colors based on background lightness
    const rgb = hexToRgb(config.bgColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const getHexFromLightnessOffset = (offsetL: number) => {
      const targetL = clamp(hsl.l + offsetL, 0, 100);
      const rgbShift = hslToRgb(hsl.h, hsl.s, targetL);
      return rgbToHex(rgbShift.r, rgbShift.g, rgbShift.b);
    };

    // Calculate light highlight (+13% lightness) and dark cast (-13% lightness)
    const computedLightColor = getHexFromLightnessOffset(13);
    const computedDarkColor = getHexFromLightnessOffset(-13);

    // Coordinate string builder
    const lightColorStr = toRgbaStr(computedLightColor, config.lightOpacity);
    const darkColorStr = toRgbaStr(computedDarkColor, config.darkOpacity);

    let shadowProperty = "";
    let backgroundStyle: React.CSSProperties = { backgroundColor: config.bgColor };

    if (config.shape === "flat") {
      shadowProperty = `${dx}px ${dy}px ${config.blur}px ${darkColorStr}, ${-dx}px ${-dy}px ${config.blur}px ${lightColorStr}`;
    } else if (config.shape === "pressed") {
      shadowProperty = `inset ${dx}px ${dy}px ${config.blur}px ${darkColorStr}, inset ${-dx}px ${-dy}px ${config.blur}px ${lightColorStr}`;
    } else if (config.shape === "concave") {
      shadowProperty = `${dx}px ${dy}px ${config.blur}px ${darkColorStr}, ${-dx}px ${-dy}px ${config.blur}px ${lightColorStr}`;
      
      // Calculate linear gradient angles depending on direction
      let angle = 145;
      if (config.lightDirection === "top-right") angle = 225;
      else if (config.lightDirection === "bottom-left") angle = 45;
      else if (config.lightDirection === "bottom-right") angle = 315;
      else if (config.lightDirection === "custom") angle = (config.customAngle + 180) % 360;

      backgroundStyle.backgroundImage = `linear-gradient(${angle}deg, ${getHexFromLightnessOffset(-5)}, ${getHexFromLightnessOffset(5)})`;
    } else if (config.shape === "convex") {
      shadowProperty = `${dx}px ${dy}px ${config.blur}px ${darkColorStr}, ${-dx}px ${-dy}px ${config.blur}px ${lightColorStr}`;

      let angle = 145;
      if (config.lightDirection === "top-right") angle = 225;
      else if (config.lightDirection === "bottom-left") angle = 45;
      else if (config.lightDirection === "bottom-right") angle = 315;
      else if (config.lightDirection === "custom") angle = (config.customAngle + 180) % 360;

      backgroundStyle.backgroundImage = `linear-gradient(${angle}deg, ${getHexFromLightnessOffset(5)}, ${getHexFromLightnessOffset(-5)})`;
    }

    return {
      shadowProperty,
      backgroundStyle,
      computedLightColor,
      computedDarkColor,
      dx,
      dy
    };
  }, [config]);

  // React CSS object for preview rendering
  const livePreviewStyle = useMemo<React.CSSProperties>(() => {
    return {
      boxShadow: shadowCalculation.shadowProperty,
      borderRadius: `${config.borderRadius}px`,
      border: config.borderOutline ? `1px solid ${toRgbaStr(shadowCalculation.computedLightColor, 0.5)}` : "none",
      transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
      ...shadowCalculation.backgroundStyle
    };
  }, [config, shadowCalculation]);

  // Code Snippets Compilation
  const cssCodeString = useMemo(() => {
    const gradStr = shadowCalculation.backgroundStyle.backgroundImage 
      ? `\nbackground: ${shadowCalculation.backgroundStyle.backgroundImage};` 
      : `\nbackground: ${config.bgColor};`;
    const borderStr = config.borderOutline 
      ? `\nborder: 1px solid rgba(255, 255, 255, 0.25);`
      : "";

    return `/* Neumorphic Soft UI Styles */
box-shadow: ${shadowCalculation.shadowProperty};${gradStr}${borderStr}
border-radius: ${config.borderRadius}px;`;
  }, [config, shadowCalculation]);

  const tailwindClasses = useMemo(() => {
    const cleanedShadow = shadowCalculation.shadowProperty.replace(/\s+/g, "_");
    const shapeGrad = config.shape === "concave" 
      ? "bg-gradient-to-br" 
      : config.shape === "convex" 
      ? "bg-gradient-to-tl" 
      : "";
    const shapeGradColors = (config.shape === "concave" || config.shape === "convex")
      ? `from-[${config.bgColor}]`
      : "";
    
    return `shadow-[${cleanedShadow}] bg-[${config.bgColor}] rounded-[${config.borderRadius}px] ${shapeGrad} ${shapeGradColors}`;
  }, [config, shadowCalculation]);

  const tailwindConfigSnippet = useMemo(() => {
    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      backgroundColor: {
        'soft-base': '${config.bgColor}',
      },
      borderRadius: {
        'soft-radius': '${config.borderRadius}px',
      },
      boxShadow: {
        'neumorph-raised': '${shadowCalculation.shadowProperty.replace(/inset\s+/g, "")}',
        'neumorph-pressed': '${shadowCalculation.shadowProperty.includes("inset") ? shadowCalculation.shadowProperty : `inset ${shadowCalculation.shadowProperty.replace(/,\s*/g, ", inset ")}`}',
      }
    }
  }
}`;
  }, [config, shadowCalculation]);

  const scssCodeString = useMemo(() => {
    return `$soft-bg: ${config.bgColor};
$soft-radius: ${config.borderRadius}px;
$soft-shadow: ${shadowCalculation.shadowProperty};

.neumorphic-element {
  background: $soft-bg;
  border-radius: $soft-radius;
  box-shadow: $soft-shadow;
  ${config.borderOutline ? `border: 1px solid rgba(255, 255, 255, 0.2);` : ""}
}`;
  }, [config, shadowCalculation]);

  const jsonCodeString = useMemo(() => {
    return JSON.stringify({
      name: "Neumorphic Token System",
      values: {
        bgColor: config.bgColor,
        borderRadius: `${config.borderRadius}px`,
        shadows: shadowCalculation.shadowProperty,
        distance: config.distance,
        blur: config.blur,
        intensity: config.intensity,
        lightColor: shadowCalculation.computedLightColor,
        darkColor: shadowCalculation.computedDarkColor
      }
    }, null, 2);
  }, [config, shadowCalculation]);

  // WCAG Relative Luminance Accessibility calculation
  const contrastAudit = useMemo(() => {
    const rgb = hexToRgb(config.bgColor);
    const getLuminance = (r: number, g: number, b: number) => {
      const a = [r, g, b].map(v => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };
    
    const baseL = getLuminance(rgb.r, rgb.g, rgb.b);
    const contrastWithWhite = (1.05) / (baseL + 0.05);
    const contrastWithBlack = (baseL + 0.05) / (0.05);
    
    const preferredText = contrastWithWhite > contrastWithBlack ? "#FFFFFF" : "#0F172A";
    const bestScore = Math.max(contrastWithWhite, contrastWithBlack);
    
    let advice = "Pass (Opaque)";
    let explanation = "Neumorphic body has clear text legibility when using the recommended high-contrast text color.";

    if (bestScore < 4.5) {
      advice = "AA Failed (Low Contrast)";
      explanation = "Text contrast overlay is slightly weak. Boost base color brightness or use bold typography outlines.";
    }

    return {
      score: Number(bestScore.toFixed(1)),
      preferredText,
      advice,
      explanation
    };
  }, [config.bgColor]);

  // --- Handlers ---
  const handleHexChange = (val: string) => {
    setHexInput(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      setConfig(prev => ({ ...prev, bgColor: val }));
      triggerSaveHistory();
    }
  };

  const handleRgbChange = (channel: "r" | "g" | "b", valStr: string) => {
    if (channel === "r") setRInput(valStr);
    if (channel === "g") setGInput(valStr);
    if (channel === "b") setBInput(valStr);

    const val = parseInt(valStr, 10);
    if (isNaN(val)) return;

    const rgb = hexToRgb(config.bgColor);
    const r = channel === "r" ? clamp(val, 0, 255) : rgb.r;
    const g = channel === "g" ? clamp(val, 0, 255) : rgb.g;
    const b = channel === "b" ? clamp(val, 0, 255) : rgb.b;

    const nextHex = rgbToHex(r, g, b);
    setConfig(prev => ({ ...prev, bgColor: nextHex }));
    triggerSaveHistory();
  };

  const handleHslChange = (channel: "h" | "s" | "l", valStr: string) => {
    if (channel === "h") setHInput(valStr);
    if (channel === "s") setSInput(valStr);
    if (channel === "l") setLInput(valStr);

    const val = parseInt(valStr, 10);
    if (isNaN(val)) return;

    const rgb = hexToRgb(config.bgColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const h = channel === "h" ? clamp(val, 0, 360) : hsl.h;
    const s = channel === "s" ? clamp(val, 0, 100) : hsl.s;
    const l = channel === "l" ? clamp(val, 0, 100) : hsl.l;

    const nextRgb = hslToRgb(h, s, l);
    const nextHex = rgbToHex(nextRgb.r, nextRgb.g, nextRgb.b);
    setConfig(prev => ({ ...prev, bgColor: nextHex }));
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

  const handlePresetLoad = (key: string) => {
    const preset = PRESETS[key];
    if (preset) {
      setConfig({ ...preset.config });
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
    const nextItem: SavedNeumorphism = {
      id: Date.now().toString(),
      name: `Soft ${config.shape.toUpperCase()} ${Date.now().toString().slice(-4)}`,
      config: { ...config },
      timestamp: Date.now()
    };

    setRecentConfigs(prev => {
      const filtered = prev.filter(item => JSON.stringify(item.config) !== JSON.stringify(nextItem.config));
      const updated = [nextItem, ...filtered].slice(0, 10);
      localStorage.setItem("nexus_neu_history", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavorite = () => {
    const nextItem: SavedNeumorphism = {
      id: Date.now().toString(),
      name: `Bookmark ${config.shape.toUpperCase()}`,
      config: { ...config },
      timestamp: Date.now()
    };

    setFavorites(prev => {
      const exists = prev.some(item => JSON.stringify(item.config) === JSON.stringify(config));
      let updated;
      if (exists) {
        updated = prev.filter(item => JSON.stringify(item.config) !== JSON.stringify(config));
        setIsFavorite(false);
      } else {
        updated = [nextItem, ...prev];
        setIsFavorite(true);
      }
      localStorage.setItem("nexus_neu_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const exists = favorites.some(item => JSON.stringify(item.config) === JSON.stringify(config));
    setIsFavorite(exists);
  }, [config, favorites]);

  const loadSavedConfig = (saved: SavedNeumorphism) => {
    setConfig({ ...saved.config });
  };

  const clearHistory = () => {
    setRecentConfigs([]);
    localStorage.removeItem("nexus_neu_history");
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

    const nextConfig: NeumorphismConfig = {
      bgColor: randomHex(),
      distance: Math.floor(Math.random() * 15) + 4,
      blur: Math.floor(Math.random() * 25) + 8,
      intensity: Number((Math.random() * 0.2 + 0.1).toFixed(2)),
      borderRadius: Math.floor(Math.random() * 35) + 5,
      shape: (["flat", "concave", "convex", "pressed"] as const)[Math.floor(Math.random() * 4)],
      lightDirection: (["top-left", "top-right", "bottom-left", "bottom-right", "custom"] as const)[Math.floor(Math.random() * 5)],
      customAngle: Math.floor(Math.random() * 360),
      lightColor: "#ffffff",
      darkColor: "#9a9a9a",
      lightOpacity: Number((Math.random() * 0.3 + 0.7).toFixed(2)),
      darkOpacity: Number((Math.random() * 0.3 + 0.15).toFixed(2)),
      borderOutline: Math.random() > 0.8
    };

    setConfig(nextConfig);
    triggerSaveHistory();
  };

  // SVG Export
  const triggerDownloadSvg = () => {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="250" viewBox="0 0 400 250">
  <defs>
    <!-- Light & Dark Shadow filters -->
    <filter id="neuShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="${shadowCalculation.dx}" dy="${shadowCalculation.dy}" stdDeviation="${config.blur / 4}" flood-color="${shadowCalculation.computedDarkColor}" flood-opacity="${config.darkOpacity}" />
      <feDropShadow dx="${-shadowCalculation.dx}" dy="${-shadowCalculation.dy}" stdDeviation="${config.blur / 4}" flood-color="${shadowCalculation.computedLightColor}" flood-opacity="${config.lightOpacity}" />
    </filter>
  </defs>

  <!-- Canvas Background -->
  <rect width="100%" height="100%" fill="${config.bgColor}" />

  <!-- Neumorphic element -->
  <rect x="80" y="50" width="240" height="150" rx="${config.borderRadius}" fill="${config.bgColor}" filter="url(#neuShadow)" />

  <text x="120" y="110" fill="${contrastAudit.preferredText}" font-family="sans-serif" font-size="18" font-weight="bold">NEUMORPHISM</text>
  <text x="120" y="140" fill="${contrastAudit.preferredText}" fill-opacity="0.6" font-family="sans-serif" font-size="12">Distance: ${config.distance}px | Blur: ${config.blur}px</text>
</svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "neumorphic-card.svg";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500">
        <RefreshCw size={24} className="animate-spin mr-2" /> Initializing Neumorphic Workspace...
      </div>
    );
  }

  // Visual helper styles for active widgets pressed states
  const pressedStyle = {
    boxShadow: `inset ${shadowCalculation.dx}px ${shadowCalculation.dy}px ${config.blur}px rgba(0,0,0,0.12), inset ${-shadowCalculation.dx}px ${-shadowCalculation.dy}px ${config.blur}px rgba(255,255,255,0.85)`,
    backgroundColor: config.bgColor,
    borderRadius: `${config.borderRadius}px`
  };

  return (
    <div className="space-y-8">
      {/* visual Workbench Header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#518231]/10 text-[#518231]">
            <Sparkles size={12} /> Neumorphism Board
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Skeuomorphic Soft UI Workbench</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Design and generate symmetrical highlight & shadow casts. Simulate lighting angles, toggle convex/pressed states, and export type-safe Tailwind variables.
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
            <Heart size={16} className={isFavorite ? "fill-current" : ""} /> {isFavorite ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls Dashboard (5 columns) */}
        <div className="xl:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
            
            {/* Shape modes selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Element Shape</label>
              <div className="grid grid-cols-4 gap-2">
                {(["flat", "concave", "convex", "pressed"] as const).map((style) => (
                  <button 
                    key={style}
                    onClick={() => setConfig(prev => ({ ...prev, shape: style }))}
                    className={`py-2 px-1 text-center rounded-xl border text-xs font-bold capitalize transition-all ${
                      config.shape === style
                        ? "bg-[#518231] border-[#518231] text-white"
                        : "bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Sliders */}
            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              
              {/* Distance Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Shadow Distance</label>
                  <span className="text-xs text-slate-500 font-mono">{config.distance}px</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="30"
                  value={config.distance}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setConfig(prev => ({ ...prev, distance: val, blur: val * 2 }));
                  }}
                  className="w-full accent-[#518231]"
                />
              </div>

              {/* Blur Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Blur Radius</label>
                  <span className="text-xs text-slate-500 font-mono">{config.blur}px</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="60"
                  value={config.blur}
                  onChange={(e) => setConfig(prev => ({ ...prev, blur: parseInt(e.target.value, 10) }))}
                  className="w-full accent-[#518231]"
                />
              </div>

              {/* Border Radius */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Corner Radius</label>
                  <span className="text-xs text-slate-500 font-mono">{config.borderRadius}px</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="60"
                  value={config.borderRadius}
                  onChange={(e) => setConfig(prev => ({ ...prev, borderRadius: parseInt(e.target.value, 10) }))}
                  className="w-full accent-[#518231]"
                />
              </div>

              {/* Shadow opacity multipliers */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">Dark Shadow Opacity</label>
                  <span className="text-xs text-slate-500 font-mono">{Math.round(config.darkOpacity * 100)}%</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={config.darkOpacity}
                  onChange={(e) => setConfig(prev => ({ ...prev, darkOpacity: parseFloat(e.target.value) }))}
                  className="w-full accent-[#518231]"
                />
              </div>
            </div>

            {/* Light Direction Dial Section */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Light Source Angle</label>
              
              <div className="flex items-center gap-4">
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {(["top-left", "top-right", "bottom-left", "bottom-right", "custom"] as const).map((dir) => (
                    <button
                      key={dir}
                      onClick={() => setConfig(prev => ({ ...prev, lightDirection: dir }))}
                      className={`py-1.5 px-2 text-center rounded-lg border text-xs font-semibold transition-all ${
                        config.lightDirection === dir 
                          ? "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-[#518231]" 
                          : "bg-transparent border-slate-100 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-white"
                      }`}
                    >
                      {dir.replace("-", " ")}
                    </button>
                  ))}
                </div>

                {/* Custom angle dial indicator */}
                {config.lightDirection === "custom" && (
                  <div className="space-y-1 text-center shrink-0 w-24">
                    <span className="text-xs text-slate-500 font-mono">{config.customAngle}&deg;</span>
                    <input 
                      type="range"
                      min="0"
                      max="360"
                      value={config.customAngle}
                      onChange={(e) => setConfig(prev => ({ ...prev, customAngle: parseInt(e.target.value, 10) }))}
                      className="w-full accent-[#518231]"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Base Background Color picker */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Base Color Tint</label>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0 shadow-inner relative" style={{ backgroundColor: config.bgColor }}>
                  <input 
                    type="color"
                    value={config.bgColor}
                    onChange={(e) => handleHexChange(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <div className="flex-1 relative">
                  <input 
                    type="text"
                    value={hexInput}
                    onFocus={() => setFocusedInput("hex")}
                    onBlur={() => setFocusedInput(null)}
                    onChange={(e) => handleHexChange(e.target.value)}
                    className="w-full pl-3 pr-10 py-2 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl text-sm font-mono focus:outline-none focus:ring-1 focus:ring-[#518231]"
                    placeholder="#E0E0E0"
                  />
                  {typeof window !== "undefined" && "EyeDropper" in window && (
                    <button 
                      onClick={handleEyeDropper}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                    >
                      <Droplet size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Locks toggle check */}
              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>Lock element to canvas background color:</span>
                <button 
                  onClick={() => setLockBackgrounds(!lockBackgrounds)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-semibold transition-all ${
                    lockBackgrounds 
                      ? "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/30 text-emerald-600" 
                      : "bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-400"
                  }`}
                >
                  {lockBackgrounds ? <Lock size={12} /> : <Unlock size={12} />}
                  <span>{lockBackgrounds ? "Locked" : "Unlocked"}</span>
                </button>
              </div>

              {/* RGB Sliders list */}
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

            {/* Accessibility Bevel Outline Toggle */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">Accessibility Border</div>
                <div className="text-xs text-slate-500">Injects a thin outline for visual distinction</div>
              </div>
              <button 
                onClick={() => setConfig(prev => ({ ...prev, borderOutline: !prev.borderOutline }))}
                className={`w-11 h-6 rounded-full transition-all relative ${config.borderOutline ? "bg-[#518231]" : "bg-slate-300 dark:bg-slate-700"}`}
              >
                <span className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full shadow-sm transition-all ${config.borderOutline ? "translate-x-5" : ""}`} />
              </button>
            </div>
          </div>

          {/* Preset Collections list */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Layers size={14} className="text-[#518231]" /> Neumorphic Presets
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              {Object.entries(PRESETS).map(([key, item]) => {
                const isActive = JSON.stringify(config) === JSON.stringify(item.config);
                return (
                  <button 
                    key={key}
                    onClick={() => handlePresetLoad(key)}
                    className={`p-2.5 text-left rounded-xl border text-xs font-semibold transition-all relative overflow-hidden group ${
                      isActive 
                        ? "bg-[#518231]/10 border-[#518231] text-[#518231]" 
                        : "bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    <div>{item.name}</div>
                    <span className="absolute bottom-0.5 right-1.5 opacity-0 group-hover:opacity-40 transition-opacity text-[10px]">Load &rarr;</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Canvas & Code Exporter (7 columns) */}
        <div className="xl:col-span-7 space-y-6">
          
          {/* Custom Background color modifier (when unlocked) */}
          {!lockBackgrounds && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex items-center gap-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Canvas Custom Backing:</span>
              <input 
                type="color" 
                value={canvasBgColor}
                onChange={(e) => setCanvasBgColor(e.target.value)}
                className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200"
              />
              <span className="text-xs text-slate-400">Unlock background base to view shadow contrast.</span>
            </div>
          )}

          {/* VISUAL PREVIEW SCREEN CANVAS */}
          <div 
            className="relative h-[420px] rounded-3xl overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800 flex items-center justify-center p-6 transition-all duration-300"
            style={{ backgroundColor: canvasBgColor }}
          >
            
            {/* Widget Selector Tab Floater */}
            <div className="absolute top-3 left-3 bg-white/70 dark:bg-black/50 backdrop-blur-md border border-slate-200/50 dark:border-white/10 p-1 rounded-xl flex gap-1 z-10 flex-wrap">
              {(["card", "button", "toggle", "slider", "music", "calc"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setPreviewTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    previewTab === tab 
                      ? "bg-[#518231] text-white shadow-sm" 
                      : "text-slate-500 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {tab === "calc" ? "Calculator" : tab}
                </button>
              ))}
            </div>

            {/* PREVIEW CONTAINER RENDER */}
            <div className="w-full max-w-sm flex items-center justify-center pt-8">
              
              {/* CARD PREVIEW */}
              {previewTab === "card" && (
                <div style={livePreviewStyle} className="w-full p-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center border border-slate-200 dark:border-slate-800" style={livePreviewStyle}>
                    <Sparkles size={20} className="text-[#518231]" />
                  </div>
                  <div className="text-lg font-bold tracking-tight text-slate-800 dark:text-slate-100">Raised Soft Canvas</div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Designed symmetrically matching base color tones. Lightness calculations derived in HSL bounds.
                  </p>
                </div>
              )}

              {/* BUTTON PREVIEW */}
              {previewTab === "button" && (
                <button 
                  style={isButtonPressed ? pressedStyle : livePreviewStyle}
                  onMouseDown={() => setIsButtonPressed(true)}
                  onMouseUp={() => setIsButtonPressed(false)}
                  onMouseLeave={() => setIsButtonPressed(false)}
                  onTouchStart={() => setIsButtonPressed(true)}
                  onTouchEnd={() => setIsButtonPressed(false)}
                  className="w-48 py-4 text-center text-sm font-bold text-[#518231] select-none cursor-pointer outline-none active:scale-[0.98] transition-transform"
                >
                  {isButtonPressed ? "Pressed Inset" : "Click / Tap Me"}
                </button>
              )}

              {/* TOGGLE SWITCH PREVIEW */}
              {previewTab === "toggle" && (
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-slate-500 uppercase">State Switch</span>
                  <button 
                    style={livePreviewStyle}
                    onClick={() => setIsToggleActive(!isToggleActive)}
                    className="w-16 h-8 p-1 flex items-center cursor-pointer outline-none"
                  >
                    <div 
                      className={`w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isToggleActive ? "translate-x-8 bg-[#518231] text-white" : "bg-slate-300 dark:bg-slate-700 text-slate-500"
                      }`}
                      style={isToggleActive ? {} : livePreviewStyle}
                    >
                      <CheckCircle size={10} className={isToggleActive ? "opacity-100" : "opacity-0"} />
                    </div>
                  </button>
                </div>
              )}

              {/* SLIDER PREVIEW */}
              {previewTab === "slider" && (
                <div className="w-full space-y-4">
                  <div className="flex justify-between text-xs text-slate-500 font-bold font-mono">
                    <span>VOLUME VOLUME</span>
                    <span>{sliderVal}%</span>
                  </div>
                  <div style={pressedStyle} className="h-4 p-1 w-full flex items-center relative rounded-full">
                    <div 
                      className="h-2 rounded-full bg-[#518231]" 
                      style={{ width: `${sliderVal}%` }} 
                    />
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={sliderVal}
                      onChange={(e) => setSliderVal(parseInt(e.target.value, 10))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* MUSIC PLAYER PREVIEW */}
              {previewTab === "music" && (
                <div style={livePreviewStyle} className="w-full p-6 space-y-6 max-w-xs">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span>Soft Console</span>
                    <Volume2 size={16} className="text-[#518231]" />
                  </div>
                  
                  {/* CD Disk preview */}
                  <div className="w-32 h-32 rounded-full mx-auto flex items-center justify-center relative border border-slate-200 dark:border-slate-800" style={livePreviewStyle}>
                    <div className="w-10 h-10 rounded-full border border-slate-300" style={pressedStyle} />
                  </div>

                  {/* Player dials */}
                  <div className="text-center space-y-1">
                    <div className="text-sm font-bold text-slate-800 dark:text-slate-100">Ambient Reflections</div>
                    <div className="text-[11px] text-slate-400">Skeuomorphic Wave EP</div>
                  </div>

                  <div className="flex justify-center items-center gap-6 pb-2">
                    <button style={livePreviewStyle} className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white">
                      <SkipBack size={14} />
                    </button>
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      style={isPlaying ? pressedStyle : livePreviewStyle} 
                      className="w-12 h-12 flex items-center justify-center rounded-full text-[#518231] hover:scale-105 transition-all"
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-1" />}
                    </button>
                    <button style={livePreviewStyle} className="w-10 h-10 flex items-center justify-center rounded-full text-slate-500 hover:text-slate-800 dark:hover:text-white">
                      <SkipForward size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* CALCULATOR UI PREVIEW */}
              {previewTab === "calc" && (
                <div style={livePreviewStyle} className="p-4 w-full max-w-[260px] space-y-4">
                  {/* Screen */}
                  <div style={pressedStyle} className="p-4 text-right text-lg font-mono font-semibold text-slate-800 dark:text-slate-100 min-h-[48px]">
                    {calcDisplay}
                  </div>
                  {/* Keys Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {["7", "8", "9", "4", "5", "6", "1", "2", "3", "C", "0", "="].map((key) => {
                      const isActive = key === "C" || key === "=";
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            if (key === "C") setCalcDisplay("0");
                            else if (key === "=") setCalcDisplay("42");
                            else setCalcDisplay(prev => prev === "0" ? key : prev + key);
                          }}
                          style={livePreviewStyle}
                          className={`h-11 flex items-center justify-center text-xs font-bold font-mono transition-all rounded-lg active:scale-95 ${
                            isActive ? "text-[#518231]" : "text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {key}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ACCESSIBILITY CHECKER MODULE */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Contrast size={16} className="text-[#518231]" /> Accessibility Auditing
            </h3>
            
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-500">Overlay Typography Contrast:</span>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  contrastAudit.score >= 4.5 
                    ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                    : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
                }`}>
                  {contrastAudit.advice}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono pt-1">
                <div>
                  <span className="text-slate-400 block">Luminance Ratio:</span>
                  <span className="font-bold text-slate-800 dark:text-white">{contrastAudit.score}:1</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Recommended Color:</span>
                  <span className="font-bold text-[#518231]">{contrastAudit.preferredText}</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 pt-1 leading-normal">
                {contrastAudit.explanation} Neumorphism relies heavily on matching component elements to canvas backdrops, which makes card edges and buttons difficult for low-vision users to parse. **Toggle 'Accessibility Border'** to insert thin highlights for production accessibility.
              </p>
            </div>
          </div>

          {/* EXPORTER CODE BLOCK TABS */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-2 justify-between items-center">
              <div className="flex gap-1">
                {(["css", "tailwind", "tailwind-config", "scss", "json"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setCodeTab(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                      codeTab === tab 
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
                      codeTab === "css" ? cssCodeString :
                      codeTab === "tailwind" ? tailwindClasses :
                      codeTab === "tailwind-config" ? tailwindConfigSnippet :
                      codeTab === "scss" ? scssCodeString : jsonCodeString;
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
                  {codeTab === "css" && cssCodeString}
                  {codeTab === "tailwind" && tailwindClasses}
                  {codeTab === "tailwind-config" && tailwindConfigSnippet}
                  {codeTab === "scss" && scssCodeString}
                  {codeTab === "json" && jsonCodeString}
                </code>
              </pre>
            </div>
          </div>

          {/* LOCAL HISTORY SESSION */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Undo size={16} className="text-[#518231]" /> design history
              </h3>
              {recentConfigs.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="text-xs text-rose-500 hover:underline flex items-center gap-1"
                >
                  <Trash2 size={12} /> Clear Log
                </button>
              )}
            </div>

            {recentConfigs.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {recentConfigs.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => loadSavedConfig(item)}
                    className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5"
                  >
                    <div className="w-2.5 h-2.5 rounded-full border border-slate-300" style={{ backgroundColor: item.config.bgColor }} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic">No history log recorded. Slide controls to capture.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
