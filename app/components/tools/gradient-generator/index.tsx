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
  Eye, 
  Moon, 
  Sun, 
  Layers, 
  HelpCircle, 
  Code, 
  Undo, 
  Star, 
  Laptop, 
  Shield, 
  Shuffle,
  Heart
} from "lucide-react";
import { Link } from "../../../../i18n/routing";
import { addToHistory as addToGlobalHistory } from "../../../../lib/hooks/useToolHistory";

// --- Types ---
interface ColorStop {
  id: string;
  color: string; // HEX color e.g., #ff0000
  position: number; // 0 to 100
  opacity: number; // 0 to 1
}

interface SavedGradient {
  id: string;
  name: string;
  type: string;
  angle: number;
  radialShape: string;
  radialPosition: string;
  stops: ColorStop[];
  animated: boolean;
  noiseOverlay: boolean;
}

// --- Color Conversion & Accessibility Math ---
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

// HSL Conversion helpers
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

function parseColorToRgb(colorStr: string) {
  const cleaned = colorStr.trim().toLowerCase();
  
  if (cleaned.startsWith("#") || /^[0-9a-fA-F]{3,8}$/.test(cleaned)) {
    return hexToRgb(cleaned);
  }
  
  const rgbRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\d\.]+)\s*)?\)$/;
  const match = cleaned.match(rgbRegex);
  if (match) {
    return {
      r: clamp(parseInt(match[1], 10), 0, 255),
      g: clamp(parseInt(match[2], 10), 0, 255),
      b: clamp(parseInt(match[3], 10), 0, 255),
    };
  }
  
  return { r: 128, g: 128, b: 128 }; // Default fallback
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

// Check contrast rating details
function getWCAGScore(ratio: number) {
  return {
    aaNormal: ratio >= 4.5,
    aaaNormal: ratio >= 7.0,
    aaLarge: ratio >= 3.0,
    aaaLarge: ratio >= 4.5,
  };
}

// Blend/Interpolate two colors (useful for WCAG analysis midpoints)
function interpolateColor(color1: string, color2: string, factor: number): string {
  const c1 = hexToRgb(color1);
  const c2 = hexToRgb(color2);
  const r = Math.round(c1.r + (c2.r - c1.r) * factor);
  const g = Math.round(c1.g + (c2.g - c1.g) * factor);
  const b = Math.round(c1.b + (c2.b - c1.b) * factor);
  return rgbToHex(r, g, b);
}

// Helper to formulate CSS color string
const toRgbaStr = (hex: string, opacity: number) => {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
};

// --- Presets List ---
const PRESETS = [
  { name: "Sunset Orange", type: "linear", angle: 135, stops: [{ id: "1", color: "#ff5e62", position: 0, opacity: 1 }, { id: "2", color: "#ff9966", position: 100, opacity: 1 }] },
  { name: "Neon Synth", type: "linear", angle: 45, stops: [{ id: "1", color: "#00f0ff", position: 0, opacity: 1 }, { id: "2", color: "#ff007f", position: 100, opacity: 1 }] },
  { name: "Oceanic Wave", type: "linear", angle: 135, stops: [{ id: "1", color: "#00c6ff", position: 0, opacity: 1 }, { id: "2", color: "#0072ff", position: 100, opacity: 1 }] },
  { name: "Aurora Green", type: "linear", angle: 90, stops: [{ id: "1", color: "#0575e6", position: 0, opacity: 1 }, { id: "2", color: "#00f260", position: 100, opacity: 1 }] },
  { name: "Cyberpunk Glow", type: "linear", angle: 120, stops: [{ id: "1", color: "#7c3aed", position: 0, opacity: 1 }, { id: "2", color: "#db2777", position: 50, opacity: 1 }, { id: "3", color: "#facc15", position: 100, opacity: 1 }] },
  { name: "Midnight Forest", type: "linear", angle: 135, stops: [{ id: "1", color: "#111827", position: 0, opacity: 1 }, { id: "2", color: "#065f46", position: 50, opacity: 1 }, { id: "3", color: "#047857", position: 100, opacity: 1 }] },
  { name: "Purple Spark", type: "linear", angle: 135, stops: [{ id: "1", color: "#8a2be2", position: 0, opacity: 1 }, { id: "2", color: "#4a00e0", position: 50, opacity: 1 }, { id: "3", color: "#8e2de2", position: 100, opacity: 1 }] },
  { name: "Pastel Dream", type: "linear", angle: 45, stops: [{ id: "1", color: "#ff9a9e", position: 0, opacity: 1 }, { id: "2", color: "#fecfef", position: 100, opacity: 1 }] },
  { name: "Warm Velvet", type: "radial", shape: "circle", radialPosition: "center", stops: [{ id: "1", color: "#b91c1c", position: 0, opacity: 1 }, { id: "2", color: "#1e1b4b", position: 100, opacity: 1 }] },
  { name: "Metallic Conic", type: "conic", angle: 0, stops: [{ id: "1", color: "#e2e8f0", position: 0, opacity: 1 }, { id: "2", color: "#94a3b8", position: 50, opacity: 1 }, { id: "3", color: "#e2e8f0", position: 100, opacity: 1 }] },
  { name: "Glassmorphism Aura", type: "linear", angle: 135, stops: [{ id: "1", color: "rgba(255,255,255,0.4)", position: 0, opacity: 1 }, { id: "2", color: "rgba(255,255,255,0.05)", position: 100, opacity: 1 }] },
  { name: "Gaming Laser", type: "linear", angle: 90, stops: [{ id: "1", color: "#ec4899", position: 0, opacity: 1 }, { id: "2", color: "#000000", position: 50, opacity: 1 }, { id: "3", color: "#06b6d4", position: 100, opacity: 1 }] }
];

const DIRECTION_PRESETS = [
  { name: "To Top", angle: 0 },
  { name: "To Top Right", angle: 45 },
  { name: "To Right", angle: 90 },
  { name: "To Bottom Right", angle: 135 },
  { name: "To Bottom", angle: 180 },
  { name: "To Bottom Left", angle: 225 },
  { name: "To Left", angle: 270 },
  { name: "To Top Left", angle: 315 },
];

const POSITION_PRESETS = [
  { label: "Center", value: "center" },
  { label: "Top Left", value: "at top left" },
  { label: "Top Center", value: "at top" },
  { label: "Top Right", value: "at top right" },
  { label: "Right Center", value: "at right" },
  { label: "Bottom Right", value: "at bottom right" },
  { label: "Bottom Center", value: "at bottom" },
  { label: "Bottom Left", value: "at bottom left" },
  { label: "Left Center", value: "at left" },
];

const checkerboardStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Crect width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' width='4' height='4' fill='%23e2e8f0'/%3E%3Crect y='4' width='4' height='4' fill='%23e2e8f0'/%3E%3C/svg%3E")`,
};

export function GradientGeneratorTool() {
  const [mounted, setMounted] = useState(false);

  // --- Gradient State ---
  const [gradientType, setGradientType] = useState<"linear" | "radial" | "conic" | "repeating-linear" | "repeating-radial">("linear");
  const [angle, setAngle] = useState(135);
  const [radialShape, setRadialShape] = useState<"circle" | "ellipse">("ellipse");
  const [radialPosition, setRadialPosition] = useState("center");
  const [conicPosition, setConicPosition] = useState("center");
  
  // Custom stops state
  const [stops, setStops] = useState<ColorStop[]>([
    { id: "1", color: "#7c3aed", position: 0, opacity: 1 },
    { id: "2", color: "#db2777", position: 100, opacity: 1 }
  ]);
  const [selectedStopId, setSelectedStopId] = useState<string>("1");

  // Secondary layer settings (multi-gradient layering feature)
  const [layerSecondGradient, setLayerSecondGradient] = useState(false);
  const [secondOpacity, setSecondOpacity] = useState(0.5);
  const [secondBlendMode, setSecondBlendMode] = useState<"normal" | "overlay" | "screen" | "multiply" | "color-dodge" | "difference">("overlay");
  const [secondAngle, setSecondAngle] = useState(45);
  const [secondStops, setSecondStops] = useState<ColorStop[]>([
    { id: "s1", color: "#00f0ff", position: 0, opacity: 0.8 },
    { id: "s2", color: "#facc15", position: 100, opacity: 0.1 }
  ]);

  // --- Aesthetic Enhancers ---
  const [noiseOverlay, setNoiseOverlay] = useState(false);
  const [blurAmount, setBlurAmount] = useState(0);
  const [glassmorphismMode, setGlassmorphismMode] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [animationDuration, setAnimationDuration] = useState(10); // in seconds

  // --- UI Form Picker States ---
  const activeStop = useMemo(() => {
    return stops.find(s => s.id === selectedStopId) || stops[0] || { id: "", color: "#ffffff", position: 0, opacity: 1 };
  }, [stops, selectedStopId]);

  const [hexInput, setHexInput] = useState(activeStop.color);
  const [rInput, setRInput] = useState("124");
  const [gInput, setGInput] = useState("58");
  const [bInput, setBInput] = useState("237");
  const [hInput, setHInput] = useState("262");
  const [sInput, setSInput] = useState("83");
  const [lInput, setLInput] = useState("58");

  // Track focused color input to prevent overwriting cursor while typing
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Sync controls
  const [activeTab, setActiveTab] = useState<"css" | "tailwind" | "svg" | "png" | "json">("css");
  const [copiedText, setCopiedText] = useState(false);
  const [recentGradients, setRecentGradients] = useState<SavedGradient[]>([]);
  const [favorites, setFavorites] = useState<SavedGradient[]>([]);
  const [randomTheme, setRandomTheme] = useState<"any" | "neon" | "pastel" | "dark">("any");
  const [isFavorite, setIsFavorite] = useState(false);

  const dialRef = useRef<HTMLDivElement>(null);

  // --- Setup on Mount ---
  useEffect(() => {
    setMounted(true);
    addToGlobalHistory({ slug: "gradient-generator", title: "Gradient Generator", type: "tool" });

    // Load LocalStorage history & favorites
    const savedHistory = localStorage.getItem("nexus_gradient_history");
    if (savedHistory) {
      try { setRecentGradients(JSON.parse(savedHistory)); } catch (e) {}
    }
    const savedFavorites = localStorage.getItem("nexus_gradient_favorites");
    if (savedFavorites) {
      try { setFavorites(JSON.parse(savedFavorites)); } catch (e) {}
    }
  }, []);

  // Sync color stops form textboxes when activeStop color changes
  useEffect(() => {
    if (!activeStop) return;
    if (focusedInput !== "hex") setHexInput(activeStop.color);

    const rgb = hexToRgb(activeStop.color);
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
  }, [activeStop, focusedInput]);

  // --- Core CSS Calculation Helpers ---
  const mainGradientCssStr = useMemo(() => {
    const stopsStr = stops.map(s => `${toRgbaStr(s.color, s.opacity)} ${s.position}%`).join(", ");
    if (gradientType === "linear") {
      return `linear-gradient(${angle}deg, ${stopsStr})`;
    } else if (gradientType === "repeating-linear") {
      return `repeating-linear-gradient(${angle}deg, ${stopsStr})`;
    } else if (gradientType === "radial") {
      return `radial-gradient(${radialShape} at ${radialPosition}, ${stopsStr})`;
    } else if (gradientType === "repeating-radial") {
      return `repeating-radial-gradient(${radialShape} at ${radialPosition}, ${stopsStr})`;
    } else if (gradientType === "conic") {
      return `conic-gradient(from ${angle}deg at ${conicPosition}, ${stopsStr})`;
    }
    return `linear-gradient(${angle}deg, ${stopsStr})`;
  }, [stops, gradientType, angle, radialShape, radialPosition, conicPosition]);

  const secondaryGradientCssStr = useMemo(() => {
    if (!layerSecondGradient) return "";
    const stopsStr = secondStops.map(s => `${toRgbaStr(s.color, s.opacity * secondOpacity)} ${s.position}%`).join(", ");
    return `linear-gradient(${secondAngle}deg, ${stopsStr})`;
  }, [secondStops, layerSecondGradient, secondAngle, secondOpacity]);

  // Combined stack background CSS code
  const compositeStyle = useMemo(() => {
    const layers = [];
    
    // 1. Noise Turbulence Pattern (SVG turbulence overlay)
    // 2. Secondary layer
    if (layerSecondGradient) {
      layers.push(secondaryGradientCssStr);
    }
    // 3. Main gradient
    layers.push(mainGradientCssStr);

    const styleObject: React.CSSProperties = {};

    if (layers.length > 1) {
      styleObject.backgroundImage = layers.join(", ");
      if (layerSecondGradient) {
        // Build blend mode string
        styleObject.backgroundBlendMode = `${secondBlendMode}, normal`;
      }
    } else {
      styleObject.backgroundImage = layers[0];
    }

    // Animation configuration
    if (animated) {
      styleObject.backgroundSize = "200% 200%";
      styleObject.animation = `gradientAnimation ${animationDuration}s ease infinite`;
    }

    if (blurAmount > 0) {
      styleObject.backdropFilter = `blur(${blurAmount}px)`;
    }

    return styleObject;
  }, [mainGradientCssStr, secondaryGradientCssStr, layerSecondGradient, secondBlendMode, animated, animationDuration, blurAmount]);

  // Tailwind Code Generator
  const tailwindOutput = useMemo(() => {
    // If simple linear top-to-bottom or left-to-right with up to 3 stops, build standard tailwind classes
    const isSimpleLinear = gradientType === "linear" && !layerSecondGradient;
    if (isSimpleLinear && stops.length <= 3) {
      // Directions
      let dirClass = "";
      if (angle >= 337.5 || angle < 22.5) dirClass = "bg-gradient-to-t";
      else if (angle >= 22.5 && angle < 67.5) dirClass = "bg-gradient-to-tr";
      else if (angle >= 67.5 && angle < 112.5) dirClass = "bg-gradient-to-r";
      else if (angle >= 112.5 && angle < 157.5) dirClass = "bg-gradient-to-br";
      else if (angle >= 157.5 && angle < 202.5) dirClass = "bg-gradient-to-b";
      else if (angle >= 202.5 && angle < 247.5) dirClass = "bg-gradient-to-bl";
      else if (angle >= 247.5 && angle < 292.5) dirClass = "bg-gradient-to-l";
      else dirClass = "bg-gradient-to-tl";

      const start = stops[0];
      const mid = stops.length === 3 ? stops[1] : null;
      const end = stops[stops.length - 1];

      const startClass = `from-[${start.color}]`;
      const midClass = mid ? ` via-[${mid.color}]` : "";
      const endClass = ` to-[${end.color}]`;

      return `${dirClass} ${startClass}${midClass}${endClass}`;
    }

    // Fallback to custom arbitrary bracket syntax
    const cssClean = compositeStyle.backgroundImage ? String(compositeStyle.backgroundImage) : "";
    let cleanVal = cssClean.replace(/\s+/g, "_");
    if (layerSecondGradient) {
      // Tailwind arbitrary values don't easily support double layered values with blend modes,
      // so outputting inline arbitrary value format:
      return `bg-[${cleanVal}]`;
    }
    return `bg-[${cleanVal}]`;
  }, [gradientType, angle, stops, layerSecondGradient, compositeStyle]);

  // --- Accessibility (WCAG) Contrast Checker ---
  const accessibilityAnalysis = useMemo(() => {
    // Compute colors at start (0.1), middle (0.5), end (0.9) to test contrast
    // We get linear interpolation between adjacent stops to find color at position
    const getColorAtPos = (pos: number) => {
      // Find stops surrounding this position
      let prevStop = stops[0];
      let nextStop = stops[stops.length - 1];
      
      for (let i = 0; i < stops.length; i++) {
        if (stops[i].position <= pos && stops[i].position >= prevStop.position) {
          prevStop = stops[i];
        }
        if (stops[i].position >= pos && stops[i].position <= nextStop.position) {
          nextStop = stops[i];
        }
      }
      if (prevStop.position === nextStop.position) return prevStop.color;
      
      const factor = (pos - prevStop.position) / (nextStop.position - prevStop.position);
      return interpolateColor(prevStop.color, nextStop.color, clamp(factor, 0, 1));
    };

    const cStart = parseColorToRgb(getColorAtPos(10));
    const cMid = parseColorToRgb(getColorAtPos(50));
    const cEnd = parseColorToRgb(getColorAtPos(90));

    const white = { r: 255, g: 255, b: 255 };
    const black = { r: 15, g: 23, b: 42 };

    const contrastStartWhite = getContrastRatio(cStart, white);
    const contrastMidWhite = getContrastRatio(cMid, white);
    const contrastEndWhite = getContrastRatio(cEnd, white);

    const contrastStartBlack = getContrastRatio(cStart, black);
    const contrastMidBlack = getContrastRatio(cMid, black);
    const contrastEndBlack = getContrastRatio(cEnd, black);

    const avgWhite = (contrastStartWhite + contrastMidWhite + contrastEndWhite) / 3;
    const avgBlack = (contrastStartBlack + contrastMidBlack + contrastEndBlack) / 3;

    return {
      whiteText: {
        avgRatio: Number(avgWhite.toFixed(2)),
        start: Number(contrastStartWhite.toFixed(2)),
        mid: Number(contrastMidWhite.toFixed(2)),
        end: Number(contrastEndWhite.toFixed(2)),
        scores: getWCAGScore(avgWhite),
      },
      blackText: {
        avgRatio: Number(avgBlack.toFixed(2)),
        start: Number(contrastStartBlack.toFixed(2)),
        mid: Number(contrastMidBlack.toFixed(2)),
        end: Number(contrastEndBlack.toFixed(2)),
        scores: getWCAGScore(avgBlack),
      }
    };
  }, [stops]);

  // --- Stop Manipulations ---
  const handleAddStop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const position = Math.round(clamp((clickX / rect.width) * 100, 0, 100));

    // Choose interpolated color at this position
    let newColor = activeStop.color;
    // Find flanking stops
    const sorted = [...stops].sort((a, b) => a.position - b.position);
    let prev = sorted[0];
    let next = sorted[sorted.length - 1];
    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i].position <= position) prev = sorted[i];
      if (sorted[i].position >= position) {
        next = sorted[i];
        break;
      }
    }
    if (prev && next && prev.id !== next.id) {
      const factor = (position - prev.position) / (next.position - prev.position);
      newColor = interpolateColor(prev.color, next.color, clamp(factor, 0, 1));
    }

    const newId = Date.now().toString();
    const newStop: ColorStop = {
      id: newId,
      color: newColor,
      position,
      opacity: 1
    };

    setStops(prev => [...prev, newStop].sort((a, b) => a.position - b.position));
    setSelectedStopId(newId);
    triggerSaveHistory();
  };

  const handleRemoveStop = (idToRemove: string) => {
    if (stops.length <= 2) return;
    const updated = stops.filter(s => s.id !== idToRemove);
    setStops(updated);
    
    // select another stop
    if (selectedStopId === idToRemove) {
      setSelectedStopId(updated[0].id);
    }
    triggerSaveHistory();
  };

  // --- Dialog / Angle Handlers ---
  const handleDialPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updateAngleFromPointer(e);
  };

  const handleDialPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      updateAngleFromPointer(e);
    }
  };

  const handleDialPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    triggerSaveHistory();
  };

  const updateAngleFromPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dialRef.current) return;
    const rect = dialRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    let deg = Math.round(Math.atan2(dx, -dy) * (180 / Math.PI));
    if (deg < 0) deg += 360;
    setAngle(deg);
  };

  // --- Input Modification Handlers ---
  const handleHexChange = (val: string) => {
    setHexInput(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      setStops(prev => prev.map(s => s.id === selectedStopId ? { ...s, color: val } : s));
    }
  };

  const handleRgbChange = (channel: "r" | "g" | "b", valStr: string) => {
    if (channel === "r") setRInput(valStr);
    if (channel === "g") setGInput(valStr);
    if (channel === "b") setBInput(valStr);

    const val = parseInt(valStr, 10);
    if (isNaN(val)) return;

    const rgb = hexToRgb(activeStop.color);
    const r = channel === "r" ? clamp(val, 0, 255) : rgb.r;
    const g = channel === "g" ? clamp(val, 0, 255) : rgb.g;
    const b = channel === "b" ? clamp(val, 0, 255) : rgb.b;

    setStops(prev => prev.map(s => s.id === selectedStopId ? { ...s, color: rgbToHex(r, g, b) } : s));
  };

  const handleHslChange = (channel: "h" | "s" | "l", valStr: string) => {
    if (channel === "h") setHInput(valStr);
    if (channel === "s") setSInput(valStr);
    if (channel === "l") setLInput(valStr);

    const val = parseInt(valStr, 10);
    if (isNaN(val)) return;

    const rgb = hexToRgb(activeStop.color);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const h = channel === "h" ? clamp(val, 0, 360) : hsl.h;
    const s = channel === "s" ? clamp(val, 0, 100) : hsl.s;
    const l = channel === "l" ? clamp(val, 0, 100) : hsl.l;

    const newRgb = hslToRgb(h, s, l);
    setStops(prev => prev.map(s => s.id === selectedStopId ? { ...s, color: rgbToHex(newRgb.r, newRgb.g, newRgb.b) } : s));
  };

  const handleOpacityChange = (val: number) => {
    setStops(prev => prev.map(s => s.id === selectedStopId ? { ...s, opacity: clamp(val, 0, 1) } : s));
  };

  // --- Save / Load / History ---
  const triggerSaveHistory = () => {
    const newGradient: SavedGradient = {
      id: Date.now().toString(),
      name: `Gradient ${stops.map(s => s.color).join("-").slice(0, 12)}`,
      type: gradientType,
      angle,
      radialShape,
      radialPosition,
      stops: [...stops],
      animated,
      noiseOverlay
    };

    setRecentGradients(prev => {
      const filtered = prev.filter(item => JSON.stringify(item.stops) !== JSON.stringify(newGradient.stops));
      const updated = [newGradient, ...filtered].slice(0, 10);
      localStorage.setItem("nexus_gradient_history", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavorite = () => {
    const currentFav: SavedGradient = {
      id: Date.now().toString(),
      name: `Fav ${stops.map(s => s.color).join("-").slice(0, 12)}`,
      type: gradientType,
      angle,
      radialShape,
      radialPosition,
      stops: [...stops],
      animated,
      noiseOverlay
    };

    setFavorites(prev => {
      const exists = prev.some(item => JSON.stringify(item.stops) === JSON.stringify(stops));
      let updated;
      if (exists) {
        updated = prev.filter(item => JSON.stringify(item.stops) !== JSON.stringify(stops));
        setIsFavorite(false);
      } else {
        updated = [currentFav, ...prev];
        setIsFavorite(true);
      }
      localStorage.setItem("nexus_gradient_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  // Check if current configuration matches favorites list
  useEffect(() => {
    const exists = favorites.some(item => JSON.stringify(item.stops) === JSON.stringify(stops));
    setIsFavorite(exists);
  }, [stops, favorites]);

  const loadGradient = (grad: SavedGradient) => {
    setGradientType(grad.type as any);
    setAngle(grad.angle);
    if (grad.radialShape) setRadialShape(grad.radialShape as any);
    if (grad.radialPosition) setRadialPosition(grad.radialPosition);
    setStops(grad.stops);
    setSelectedStopId(grad.stops[0].id);
    setAnimated(grad.animated || false);
    setNoiseOverlay(grad.noiseOverlay || false);
  };

  const clearHistory = () => {
    setRecentGradients([]);
    localStorage.removeItem("nexus_gradient_history");
  };

  // --- Randomizer ---
  const handleRandomize = () => {
    const numStops = Math.floor(Math.random() * 2) + 2; // 2 or 3 stops
    const nextStops: ColorStop[] = [];

    const getRandomColor = () => {
      let h = Math.floor(Math.random() * 360);
      let s = 80;
      let l = 50;

      if (randomTheme === "pastel") {
        s = Math.floor(Math.random() * 20) + 40; // 40-60
        l = Math.floor(Math.random() * 15) + 75; // 75-90
      } else if (randomTheme === "neon") {
        s = 95;
        l = 50;
      } else if (randomTheme === "dark") {
        s = Math.floor(Math.random() * 30) + 50; // 50-80
        l = Math.floor(Math.random() * 15) + 15; // 15-30
      }

      const rgb = hslToRgb(h, s, l);
      return rgbToHex(rgb.r, rgb.g, rgb.b);
    };

    const delta = 100 / (numStops - 1);
    for (let i = 0; i < numStops; i++) {
      nextStops.push({
        id: `rand-${i}-${Date.now()}`,
        color: getRandomColor(),
        position: Math.round(i * delta),
        opacity: 1
      });
    }

    setStops(nextStops);
    setSelectedStopId(nextStops[0].id);
    // Random angle
    setAngle(Math.floor(Math.random() * 8) * 45); // 0, 45, 90, 135, etc.
    triggerSaveHistory();
  };

  // --- EyeDropper API support ---
  const handleEyeDropper = () => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      const EyeDropperConstructor = (window as any).EyeDropper;
      const eyeDropper = new EyeDropperConstructor();
      eyeDropper.open()
        .then((result: { srgbHex: string }) => {
          handleHexChange(result.srgbHex);
          triggerSaveHistory();
        })
        .catch(() => {});
    }
  };

  // --- Copy Clipboard Handler ---
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  // --- Export File Downloads ---
  const handleDownloadSVG = () => {
    const width = 800;
    const height = 600;
    let defsGradient = "";
    
    const stopsMarkup = stops.map(s => `      <stop offset="${s.position}%" stop-color="${s.color}" stop-opacity="${s.opacity}" />`).join("\n");

    if (gradientType.includes("linear")) {
      // Calculate coordinates using linear vector
      const angleRad = (angle - 90) * (Math.PI / 180);
      const x1 = Math.round(50 - Math.cos(angleRad) * 50);
      const y1 = Math.round(50 - Math.sin(angleRad) * 50);
      const x2 = Math.round(50 + Math.cos(angleRad) * 50);
      const y2 = Math.round(50 + Math.sin(angleRad) * 50);
      defsGradient = `
    <linearGradient id="gradientAsset" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
${stopsMarkup}
    </linearGradient>`;
    } else {
      // Radial or conic (conic is complex in plain SVG, fallback to radial)
      defsGradient = `
    <radialGradient id="gradientAsset" cx="50%" cy="50%" r="50%">
${stopsMarkup}
    </radialGradient>`;
    }

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>${defsGradient}
  </defs>
  <rect width="100%" height="100%" fill="url(#gradientAsset)" />
</svg>`;

    const blob = new Blob([svgContent], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "nexus-gradient.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 630; // standard OG size
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    if (gradientType.includes("linear")) {
      const angleRad = (angle - 90) * (Math.PI / 180);
      const len = Math.abs(w * Math.sin(angleRad)) + Math.abs(h * Math.cos(angleRad));
      const halfL = len / 2;
      
      const x0 = cx - Math.cos(angleRad) * halfL;
      const y0 = cy - Math.sin(angleRad) * halfL;
      const x1 = cx + Math.cos(angleRad) * halfL;
      const y1 = cy + Math.sin(angleRad) * halfL;

      const grad = ctx.createLinearGradient(x0, y0, x1, y1);
      stops.forEach(s => {
        grad.addColorStop(s.position / 100, toRgbaStr(s.color, s.opacity));
      });
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    } else if (gradientType.includes("conic")) {
      const startAngleRad = (angle - 90) * (Math.PI / 180);
      const grad = ctx.createConicGradient(startAngleRad, cx, cy);
      stops.forEach(s => {
        grad.addColorStop(s.position / 100, toRgbaStr(s.color, s.opacity));
      });
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    } else {
      // Radial elliptic or circular
      ctx.save();
      ctx.translate(cx, cy);
      if (radialShape === "ellipse") {
        ctx.scale(1, h / w);
      }
      
      // Compute coordinates based on position string
      let px = 0, py = 0;
      if (radialPosition.includes("left")) px = -cx;
      if (radialPosition.includes("right")) px = cx;
      if (radialPosition.includes("top")) py = -cy;
      if (radialPosition.includes("bottom")) py = cy;
      
      const maxRadius = w * 0.75;
      const grad = ctx.createRadialGradient(px, py, 0, px, py, maxRadius);
      stops.forEach(s => {
        grad.addColorStop(s.position / 100, toRgbaStr(s.color, s.opacity));
      });
      ctx.fillStyle = grad;
      ctx.fillRect(-cx, -cy * (w / h), w, h * (w / h));
      ctx.restore();
    }

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "nexus-gradient.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Formulate SCSS variables output
  const scssOutput = useMemo(() => {
    const vars = stops.map((s, idx) => `$gradient-stop-${idx + 1}: ${toRgbaStr(s.color, s.opacity)};`).join("\n");
    const cssStyle = `background: ${compositeStyle.backgroundImage};`;
    return `${vars}\n\n.gradient-box {\n  ${cssStyle}\n}`;
  }, [stops, compositeStyle]);

  // Formulate JSON output
  const jsonOutput = useMemo(() => {
    const config = {
      type: gradientType,
      angle,
      radialShape,
      radialPosition,
      stops: stops.map(s => ({ color: s.color, position: s.position, opacity: s.opacity })),
      css: compositeStyle.backgroundImage,
      tailwind: tailwindOutput
    };
    return JSON.stringify(config, null, 2);
  }, [gradientType, angle, radialShape, radialPosition, stops, compositeStyle, tailwindOutput]);

  // Avoid hydration flashing
  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500">
        <RefreshCw size={24} className="animate-spin mr-2" /> Initializing Gradient Creator...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-10 text-slate-800 dark:text-slate-200">
      
      {/* Dynamic Keyframes Animation CSS injected on the fly */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradientAnimation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />

      {/* SECTION 1: Builder Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Editor controls (5/12 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* A. Gradient Type tabs */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sliders size={16} /> Gradient Configuration
            </h3>
            
            <div className="grid grid-cols-5 gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
              {(["linear", "radial", "conic", "repeating-linear", "repeating-radial"] as const).map(type => (
                <button
                  key={type}
                  onClick={() => { setGradientType(type); triggerSaveHistory(); }}
                  className={`py-2 px-1 text-[10px] font-semibold rounded-lg capitalize transition-all ${gradientType === type ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  {type.replace("-", " ")}
                </button>
              ))}
            </div>
          </div>

          {/* B. Stops & Slider Controls */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Color Stops</h3>
              <span className="text-xs text-slate-500">Double click or click line to add</span>
            </div>

            {/* Visual Slider Bar */}
            <div className="relative h-12 flex items-center px-2 bg-slate-100 dark:bg-slate-800 rounded-xl select-none">
              <div 
                className="absolute inset-x-2 h-6 rounded-md cursor-crosshair border border-slate-200 dark:border-slate-700 overflow-visible"
                style={{ 
                  ...checkerboardStyle,
                  backgroundSize: '12px 12px'
                }}
              >
                {/* Visual Gradient line inside the stops slider */}
                <div 
                  className="absolute inset-0 rounded-md"
                  onClick={handleAddStop}
                  style={{
                    backgroundImage: `linear-gradient(to right, ${stops.map(s => `${toRgbaStr(s.color, s.opacity)} ${s.position}%`).join(", ")})`
                  }}
                />

                {/* Markers */}
                {stops.map(stop => (
                  <div
                    key={stop.id}
                    className="absolute top-1/2 w-4 h-8 -ml-2 -translate-y-1/2 rounded-full border-2 shadow cursor-ew-resize z-20 group"
                    style={{
                      left: `${stop.position}%`,
                      backgroundColor: stop.color,
                      borderColor: selectedStopId === stop.id ? '#518231' : '#ffffff',
                      boxShadow: selectedStopId === stop.id ? '0 0 8px rgba(81,130,49,0.8)' : '0 1px 3px rgba(0,0,0,0.3)'
                    }}
                    onPointerDown={(e) => {
                      e.stopPropagation();
                      e.currentTarget.setPointerCapture(e.pointerId);
                      setSelectedStopId(stop.id);
                    }}
                    onPointerMove={(e) => {
                      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                        const slider = e.currentTarget.parentElement;
                        if (!slider) return;
                        const rect = slider.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const newPos = Math.round(clamp((x / rect.width) * 100, 0, 100));
                        setStops(prev => prev.map(s => s.id === stop.id ? { ...s, position: newPos } : s));
                      }
                    }}
                    onPointerUp={(e) => {
                      e.currentTarget.releasePointerCapture(e.pointerId);
                      setStops(prev => [...prev].sort((a, b) => a.position - b.position));
                      triggerSaveHistory();
                    }}
                  >
                    {/* Tooltip position identifier */}
                    <span className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-1 py-0.5 bg-slate-900 text-white text-[9px] font-mono rounded pointer-events-none">
                      {stop.position}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected stop color/opacity configurations */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Active Stop: {activeStop.position}%</span>
                
                <button
                  disabled={stops.length <= 2}
                  onClick={() => handleRemoveStop(selectedStopId)}
                  className={`flex items-center gap-1 text-xs py-1 px-2.5 rounded-lg font-semibold transition-all ${stops.length <= 2 ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed' : 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20'}`}
                  title="Remove Selected Stop"
                >
                  <Trash2 size={12} /> Remove
                </button>
              </div>

              {/* Slider for position */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <label htmlFor="position-slider">Stop Position</label>
                  <span className="font-mono">{activeStop.position}%</span>
                </div>
                <input
                  id="position-slider"
                  type="range"
                  min="0"
                  max="100"
                  value={activeStop.position}
                  onChange={(e) => {
                    const pos = parseInt(e.target.value, 10);
                    setStops(prev => prev.map(s => s.id === selectedStopId ? { ...s, position: pos } : s));
                  }}
                  onMouseUp={triggerSaveHistory}
                  className="w-full accent-[#518231]"
                />
              </div>

              {/* Slider for opacity */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <label htmlFor="opacity-slider">Stop Opacity</label>
                  <span className="font-mono">{Math.round(activeStop.opacity * 100)}%</span>
                </div>
                <input
                  id="opacity-slider"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={activeStop.opacity}
                  onChange={(e) => handleOpacityChange(parseFloat(e.target.value))}
                  onMouseUp={triggerSaveHistory}
                  className="w-full accent-[#518231]"
                />
              </div>

              {/* Color inputs sync */}
              <div className="grid grid-cols-12 gap-3 items-center">
                
                {/* Visual Picker preview and native color picker integration */}
                <div className="col-span-2 relative h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 cursor-pointer hover:scale-105 transition-all shadow-inner" style={checkerboardStyle}>
                  <input
                    type="color"
                    value={activeStop.color}
                    onChange={(e) => handleHexChange(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: activeStop.color }} />
                </div>

                <div className="col-span-8 grid grid-cols-3 gap-2">
                  <div className="space-y-0.5">
                    <label htmlFor="hex-active-input" className="text-[10px] font-bold text-slate-400 uppercase">HEX</label>
                    <input
                      id="hex-active-input"
                      type="text"
                      value={hexInput}
                      onChange={(e) => handleHexChange(e.target.value)}
                      onFocus={() => setFocusedInput("hex")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full text-xs font-mono py-1 px-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-center uppercase"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label htmlFor="rgb-r-input" className="text-[10px] font-bold text-slate-400 uppercase">RGB</label>
                    <input
                      id="rgb-r-input"
                      type="text"
                      value={`${rInput},${gInput},${bInput}`}
                      onChange={(e) => {
                        const parts = e.target.value.split(",");
                        if (parts.length === 3) {
                          handleRgbChange("r", parts[0]);
                          handleRgbChange("g", parts[1]);
                          handleRgbChange("b", parts[2]);
                        }
                      }}
                      onFocus={() => setFocusedInput("rgb-all")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full text-[10px] font-mono py-1 px-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-center"
                    />
                  </div>
                  <div className="space-y-0.5">
                    <label htmlFor="hsl-h-input" className="text-[10px] font-bold text-slate-400 uppercase">HSL</label>
                    <input
                      id="hsl-h-input"
                      type="text"
                      value={`${hInput}°,${sInput}%,${lInput}%`}
                      onChange={(e) => {
                        const parts = e.target.value.replace(/%/g, "").replace(/°/g, "").split(",");
                        if (parts.length === 3) {
                          handleHslChange("h", parts[0]);
                          handleHslChange("s", parts[1]);
                          handleHslChange("l", parts[2]);
                        }
                      }}
                      onFocus={() => setFocusedInput("hsl-all")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full text-[10px] font-mono py-1 px-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-center"
                    />
                  </div>
                </div>

                {/* EyeDropper button */}
                <div className="col-span-2">
                  <button
                    onClick={handleEyeDropper}
                    className="w-full h-10 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center justify-center transition-colors text-slate-500"
                    title="EyeDropper API (Chrome/Edge)"
                  >
                    <Palette size={16} />
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* C. Angle, Direction, & Placement Coordinates */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Orientation & Positions</h3>

            {/* Angle dial for linear or conic */}
            {(gradientType.includes("linear") || gradientType === "conic") && (
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4 flex justify-center">
                  {/* Visual Circular dial */}
                  <div
                    ref={dialRef}
                    onPointerDown={handleDialPointerDown}
                    onPointerMove={handleDialPointerMove}
                    onPointerUp={handleDialPointerUp}
                    className="w-16 h-16 rounded-full border-2 border-slate-300 dark:border-slate-700 relative cursor-pointer flex items-center justify-center bg-white dark:bg-slate-800 shadow-inner select-none touch-none hover:border-[#518231] transition-colors"
                  >
                    {/* Dial pointer line */}
                    <div 
                      className="w-1 h-8 bg-[#518231] absolute bottom-1/2 origin-bottom rounded-full"
                      style={{ transform: `rotate(${angle}deg)` }}
                    />
                    {/* Dial center pin */}
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-slate-200 z-10" />
                  </div>
                </div>

                <div className="col-span-8 space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500">
                    <label htmlFor="angle-slider">Angle</label>
                    <span className="font-mono">{angle}°</span>
                  </div>
                  <input
                    id="angle-slider"
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={(e) => setAngle(parseInt(e.target.value, 10))}
                    onMouseUp={triggerSaveHistory}
                    className="w-full accent-[#518231]"
                  />
                </div>

                {/* Preset direction grids */}
                {gradientType.includes("linear") && (
                  <div className="col-span-12 space-y-2">
                    <span className="text-xs text-slate-400">Presets</span>
                    <div className="grid grid-cols-4 gap-1">
                      {DIRECTION_PRESETS.map((dir, i) => (
                        <button
                          key={i}
                          onClick={() => { setAngle(dir.angle); triggerSaveHistory(); }}
                          className={`py-1 text-[10px] rounded border transition-colors ${angle === dir.angle ? 'bg-[#518231] text-white border-[#518231]' : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}
                        >
                          {dir.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Radial position configurations */}
            {gradientType.includes("radial") && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs text-slate-400">Radial Shape</span>
                  <div className="flex gap-2">
                    {(["ellipse", "circle"] as const).map(shape => (
                      <button
                        key={shape}
                        onClick={() => { setRadialShape(shape); triggerSaveHistory(); }}
                        className={`flex-1 py-1.5 text-xs rounded-lg font-semibold border ${radialShape === shape ? 'bg-[#518231] text-white border-[#518231]' : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}
                      >
                        {shape === "ellipse" ? "Ellipse (Squashed)" : "Circle (Uniform)"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-slate-400">Position presets</span>
                  <div className="grid grid-cols-3 gap-1">
                    {POSITION_PRESETS.map((pos, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setRadialPosition(pos.value); triggerSaveHistory(); }}
                        className={`py-1 text-[10px] rounded border transition-colors ${radialPosition === pos.value ? 'bg-[#518231] text-white border-[#518231]' : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {gradientType === "conic" && (
              <div className="space-y-2">
                <span className="text-xs text-slate-400">Center Position</span>
                <div className="grid grid-cols-3 gap-1">
                  {POSITION_PRESETS.map((pos, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setConicPosition(pos.value); triggerSaveHistory(); }}
                      className={`py-1.5 text-[10px] rounded border transition-colors ${conicPosition === pos.value ? 'bg-[#518231] text-white border-[#518231]' : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* D. Advanced settings (layer, animated, noise) */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Advanced Layering & Preview Options</h3>

            {/* Animation Toggle */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="animated-toggle"
                  checked={animated}
                  onChange={(e) => setAnimated(e.target.checked)}
                  className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
                />
                <label htmlFor="animated-toggle" className="text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer">
                  Animate Gradient Preview
                </label>
              </div>

              {animated && (
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-slate-400">Speed:</span>
                  <input
                    type="number"
                    min="2"
                    max="60"
                    value={animationDuration}
                    onChange={(e) => setAnimationDuration(parseInt(e.target.value) || 10)}
                    className="w-12 text-center text-xs py-0.5 px-1 bg-white dark:bg-slate-800 border rounded"
                  />
                  <span className="text-[10px] text-slate-400">s</span>
                </div>
              )}
            </div>

            {/* Noise Turbulent Overlay */}
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              <input
                type="checkbox"
                id="noise-toggle"
                checked={noiseOverlay}
                onChange={(e) => setNoiseOverlay(e.target.checked)}
                className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
              />
              <label htmlFor="noise-toggle" className="text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer">
                Noise Overlay (Prevents Banding)
              </label>
            </div>

            {/* Glassmorphic card overlay preview */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="glassmorphism-toggle"
                  checked={glassmorphismMode}
                  onChange={(e) => setGlassmorphismMode(e.target.checked)}
                  className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
                />
                <label htmlFor="glassmorphism-toggle" className="text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer">
                  Frosted Glass Widget Overlay
                </label>
              </div>

              {glassmorphismMode && (
                <div className="flex items-center gap-1">
                  <span className="text-[10px] text-slate-400">Blur:</span>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={blurAmount}
                    onChange={(e) => setBlurAmount(parseInt(e.target.value))}
                    className="w-16 accent-[#518231]"
                  />
                  <span className="text-[10px] font-mono w-4 text-right">{blurAmount}</span>
                </div>
              )}
            </div>

            {/* Mesh secondary layering */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="mesh-layering-toggle"
                  checked={layerSecondGradient}
                  onChange={(e) => setLayerSecondGradient(e.target.checked)}
                  className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
                />
                <label htmlFor="mesh-layering-toggle" className="text-xs font-bold text-slate-600 dark:text-slate-300 cursor-pointer">
                  Layer Secondary Blend Gradient
                </label>
              </div>

              {layerSecondGradient && (
                <div className="pl-6 space-y-3 bg-white dark:bg-slate-800/20 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span>Blend Mode</span>
                    <select
                      value={secondBlendMode}
                      onChange={(e) => setSecondBlendMode(e.target.value as any)}
                      className="text-xs py-0.5 px-2 bg-slate-50 dark:bg-slate-800 rounded border cursor-pointer"
                    >
                      {["overlay", "screen", "multiply", "color-dodge", "difference"].map(mode => (
                        <option key={mode} value={mode}>{mode}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Layer Opacity</span>
                      <span>{Math.round(secondOpacity * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={secondOpacity}
                      onChange={(e) => setSecondOpacity(parseFloat(e.target.value))}
                      className="w-full accent-[#518231]"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Layer Angle</span>
                      <span>{secondAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={secondAngle}
                      onChange={(e) => setSecondAngle(parseInt(e.target.value))}
                      className="w-full accent-[#518231]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Randomizer Engine */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex gap-2">
              <select
                value={randomTheme}
                onChange={(e) => setRandomTheme(e.target.value as any)}
                className="text-xs px-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer"
              >
                <option value="any">Any Style</option>
                <option value="neon">Neon Vibe</option>
                <option value="pastel">Pastel Colors</option>
                <option value="dark">Dark Theme</option>
              </select>
              
              <button
                onClick={handleRandomize}
                className="flex-1 py-2 px-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold transition-all hover:bg-slate-800 dark:hover:bg-slate-100 flex items-center justify-center gap-1.5"
              >
                <Shuffle size={14} /> Generate Random
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Previews, Exports & Accessibility (7/12 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Main Visualizer Stage */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col relative group">
            
            {/* The Gradient Stage (with Noise Turbulences) */}
            <div 
              className="w-full h-80 relative flex items-center justify-center p-6 sm:p-12 overflow-hidden transition-all duration-300"
              style={{
                ...compositeStyle,
                ...checkerboardStyle
              }}
            >
              {/* Noise overlay filter (low opacity SVG turbulence element) */}
              {noiseOverlay && (
                <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-[0.15]">
                  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter">
                      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                  </svg>
                </div>
              )}

              {/* Glassmorphic Widget Preview overlay */}
              {glassmorphismMode && (
                <div 
                  className="max-w-md w-full backdrop-blur-md bg-white/20 dark:bg-black/20 p-6 rounded-2xl border border-white/30 dark:border-white/10 shadow-xl text-center space-y-4"
                  style={{
                    backdropFilter: blurAmount > 0 ? `blur(${blurAmount}px)` : 'none'
                  }}
                >
                  <h4 className="text-lg font-extrabold text-white drop-shadow-md">Glassmorphism UI Preview</h4>
                  <p className="text-sm text-slate-100/90 leading-relaxed drop-shadow-sm">
                    Frosty translucence looks beautiful when overlaid on top of vibrant gradient highlights. Excellent for modern dashboard cards.
                  </p>
                  <div className="flex gap-2 justify-center">
                    <button className="px-4 py-2 bg-white/35 hover:bg-white/45 text-white font-bold rounded-lg text-xs border border-white/20 transition-all">Action</button>
                    <button className="px-4 py-2 bg-black/20 hover:bg-black/30 text-white font-bold rounded-lg text-xs transition-all">Dismiss</button>
                  </div>
                </div>
              )}

              {/* Quick favorite action pin */}
              <button
                onClick={toggleFavorite}
                className="absolute top-4 right-4 bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-full hover:scale-110 shadow hover:bg-white dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300 z-30"
                title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Heart size={18} fill={isFavorite ? "#ef4444" : "none"} className={isFavorite ? "text-red-500 scale-105" : ""} />
              </button>
            </div>

            {/* Mock Views & Layout Previews (Website Hero, Buttons, Cards, Clip, Mobile) */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Live UI Demos</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. Website Hero */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border shadow-sm space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">1. Web Hero Component</span>
                  <div 
                    className="h-28 rounded-lg relative overflow-hidden flex flex-col justify-center px-4"
                    style={{ backgroundImage: compositeStyle.backgroundImage, backgroundBlendMode: compositeStyle.backgroundBlendMode }}
                  >
                    <h5 className="text-[10px] font-black text-white leading-tight">Elevating Developer Experience</h5>
                    <p className="text-[7px] text-slate-200 max-w-[120px] mt-1 leading-normal">
                      Build interactive, production-grade web elements using native math.
                    </p>
                    <button className="w-fit mt-1.5 px-2 py-0.5 bg-white text-slate-950 font-bold rounded text-[6px] shadow-sm">
                      Get Started Free
                    </button>
                  </div>
                </div>

                {/* 2. Text Clip typography */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border shadow-sm flex flex-col justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">2. Typographical Text Clipping</span>
                  <div className="py-2 text-center">
                    <h4 
                      className="text-2xl font-black tracking-tight uppercase bg-clip-text text-transparent"
                      style={{
                        backgroundImage: compositeStyle.backgroundImage,
                        backgroundBlendMode: compositeStyle.backgroundBlendMode,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      GRADIENT TEXT
                    </h4>
                    <span className="text-[8px] text-slate-400 mt-1 block">Webkit Text Clip modifier</span>
                  </div>
                </div>

                {/* 3. Interface widgets & buttons */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border shadow-sm space-y-3">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">3. CTA Buttons & Swatches</span>
                  <div className="flex flex-col gap-2">
                    <button 
                      className="w-full py-1.5 text-[9px] font-bold text-white rounded-lg transition-transform hover:scale-[1.02] shadow"
                      style={{ backgroundImage: compositeStyle.backgroundImage, backgroundBlendMode: compositeStyle.backgroundBlendMode }}
                    >
                      Primary Gradient Action
                    </button>
                    <button className="w-full py-1 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-700 dark:text-slate-300 font-semibold border rounded-lg text-[9px] flex items-center justify-center gap-1">
                      Secondary Outline
                    </button>
                  </div>
                </div>

                {/* 4. Mini Mobile mockup */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border shadow-sm space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">4. App Shell Preview</span>
                  <div className="border rounded-lg overflow-hidden flex flex-col bg-slate-50 dark:bg-slate-950">
                    <div 
                      className="h-10 p-2 flex items-center justify-between text-white"
                      style={{ backgroundImage: compositeStyle.backgroundImage, backgroundBlendMode: compositeStyle.backgroundBlendMode }}
                    >
                      <span className="text-[7px] font-black">Nexus UI Workspace</span>
                      <div className="w-4 h-4 rounded-full bg-white/30" />
                    </div>
                    <div className="p-2 space-y-1">
                      <div className="h-1.5 w-12 bg-slate-300 dark:bg-slate-700 rounded" />
                      <div className="h-1 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-900 rounded" />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Export Panel Exporters */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code size={16} /> Code Exporter
              </h3>
              
              <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                {(["css", "tailwind", "svg", "png", "json"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-1 px-2.5 text-[10px] font-bold rounded-md capitalize transition-all ${activeTab === tab ? 'bg-white dark:bg-slate-700 text-[#518231] dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                  >
                    {tab === "css" ? "CSS" : tab === "tailwind" ? "Tailwind" : tab === "svg" ? "SVG" : tab === "png" ? "PNG" : "JSON"}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab contents */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800 relative shadow-inner min-h-[100px] flex flex-col justify-between">
              
              {activeTab === "css" && (
                <div className="space-y-3">
                  <pre className="text-xs text-slate-700 dark:text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap break-all select-all">
                    <code>
                      {`background: ${compositeStyle.backgroundImage};`}{animated && `\nbackground-size: 200% 200%;\nanimation: gradientAnimation ${animationDuration}s ease infinite;`}
                    </code>
                  </pre>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopy(`background: ${compositeStyle.backgroundImage};`)}
                      className="flex-1 py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      {copiedText ? <CheckCircle size={14} /> : <Copy size={14} />}
                      {copiedText ? "Copied CSS!" : "Copy Code"}
                    </button>
                    <button
                      onClick={() => handleCopy(scssOutput)}
                      className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg transition-colors"
                    >
                      Copy SCSS
                    </button>
                  </div>
                </div>
              )}

              {activeTab === "tailwind" && (
                <div className="space-y-3">
                  <pre className="text-xs text-slate-700 dark:text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap break-all select-all">
                    <code>{tailwindOutput}</code>
                  </pre>
                  
                  <button
                    onClick={() => handleCopy(tailwindOutput)}
                    className="w-full py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    {copiedText ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copiedText ? "Copied Tailwind!" : "Copy Tailwind Code"}
                  </button>
                </div>
              )}

              {activeTab === "svg" && (
                <div className="space-y-3">
                  <div className="text-[10px] text-slate-400 font-bold mb-1">Vector Code definition:</div>
                  <pre className="text-[10px] text-slate-600 dark:text-slate-400 font-mono overflow-x-auto max-h-32">
                    <code>{`<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">\n  <!-- linearGradient definitions -->\n</svg>`}</code>
                  </pre>
                  
                  <button
                    onClick={handleDownloadSVG}
                    className="w-full py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Download size={14} /> Download SVG File
                  </button>
                </div>
              )}

              {activeTab === "png" && (
                <div className="space-y-3 text-center py-2">
                  <span className="text-xs text-slate-500 block">Export high-resolution PNG background graphic (1200 × 630 pixels)</span>
                  <button
                    onClick={handleDownloadPNG}
                    className="w-full py-2 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow"
                  >
                    <Download size={14} /> Export PNG Asset
                  </button>
                </div>
              )}

              {activeTab === "json" && (
                <div className="space-y-3">
                  <pre className="text-[11px] text-slate-700 dark:text-slate-300 font-mono overflow-y-auto max-h-32">
                    <code>{jsonOutput}</code>
                  </pre>
                  
                  <button
                    onClick={() => handleCopy(jsonOutput)}
                    className="w-full py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    {copiedText ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copiedText ? "Copied JSON Config!" : "Copy Configuration JSON"}
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* E. Accessibility Analysis Panel */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Contrast size={16} className="text-amber-500" /> WCAG Readability Analysis
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* White Text Compliance */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-slate-600 dark:text-slate-300">White Text Overlay</span>
                  <span className="text-xs font-mono font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {accessibilityAnalysis.whiteText.avgRatio}:1 Ratio
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">Normal Text (AA)</span>
                    <span className={`font-bold px-1.5 py-0.5 rounded ${accessibilityAnalysis.whiteText.scores.aaNormal ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {accessibilityAnalysis.whiteText.scores.aaNormal ? 'Pass' : 'Fail'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">Normal Text (AAA)</span>
                    <span className={`font-bold px-1.5 py-0.5 rounded ${accessibilityAnalysis.whiteText.scores.aaaNormal ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {accessibilityAnalysis.whiteText.scores.aaaNormal ? 'Pass' : 'Fail'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">Large Headers (AA)</span>
                    <span className={`font-bold px-1.5 py-0.5 rounded ${accessibilityAnalysis.whiteText.scores.aaLarge ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {accessibilityAnalysis.whiteText.scores.aaLarge ? 'Pass' : 'Fail'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">Large Headers (AAA)</span>
                    <span className={`font-bold px-1.5 py-0.5 rounded ${accessibilityAnalysis.whiteText.scores.aaaLarge ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {accessibilityAnalysis.whiteText.scores.aaaLarge ? 'Pass' : 'Fail'}
                    </span>
                  </div>
                </div>

                <div className="text-[9px] text-slate-400 italic">
                  {accessibilityAnalysis.whiteText.avgRatio >= 4.5 
                    ? "✓ Great for body copy. White text has good legibility." 
                    : "⚠️ Low contrast warning. Prefer darker gradient stops."}
                </div>
              </div>

              {/* Black Text Compliance */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-extrabold text-slate-600 dark:text-slate-300">Dark Text Overlay</span>
                  <span className="text-xs font-mono font-black text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {accessibilityAnalysis.blackText.avgRatio}:1 Ratio
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1.5">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">Normal Text (AA)</span>
                    <span className={`font-bold px-1.5 py-0.5 rounded ${accessibilityAnalysis.blackText.scores.aaNormal ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {accessibilityAnalysis.blackText.scores.aaNormal ? 'Pass' : 'Fail'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">Normal Text (AAA)</span>
                    <span className={`font-bold px-1.5 py-0.5 rounded ${accessibilityAnalysis.blackText.scores.aaaNormal ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {accessibilityAnalysis.blackText.scores.aaaNormal ? 'Pass' : 'Fail'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">Large Headers (AA)</span>
                    <span className={`font-bold px-1.5 py-0.5 rounded ${accessibilityAnalysis.blackText.scores.aaLarge ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {accessibilityAnalysis.blackText.scores.aaLarge ? 'Pass' : 'Fail'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-400">Large Headers (AAA)</span>
                    <span className={`font-bold px-1.5 py-0.5 rounded ${accessibilityAnalysis.blackText.scores.aaaLarge ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {accessibilityAnalysis.blackText.scores.aaaLarge ? 'Pass' : 'Fail'}
                    </span>
                  </div>
                </div>

                <div className="text-[9px] text-slate-400 italic">
                  {accessibilityAnalysis.blackText.avgRatio >= 4.5 
                    ? "✓ Great for body copy. Dark text is easily readable." 
                    : "⚠️ Warning. Background is too dark for body text."}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* SECTION 2: Presets Library */}
      <section className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="text-amber-500 animate-[pulse_2s_infinite]" /> Curated Designer Presets
            </h3>
            <p className="text-xs text-slate-500 mt-1">Click a layout swatch card to apply the configuration instantly.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {PRESETS.map((preset, idx) => {
            const presetCss = preset.stops.map(s => `${toRgbaStr(s.color, s.opacity)} ${s.position}%`).join(", ");
            let backgroundStyle = `linear-gradient(${preset.angle || 135}deg, ${presetCss})`;
            if (preset.type === "radial") {
              backgroundStyle = `radial-gradient(circle at center, ${presetCss})`;
            } else if (preset.type === "conic") {
              backgroundStyle = `conic-gradient(from 0deg at center, ${presetCss})`;
            }

            return (
              <button
                key={idx}
                onClick={() => loadGradient(preset as any)}
                className="group flex flex-col bg-white dark:bg-slate-800 p-2 rounded-2xl border shadow-sm transition-transform hover:scale-[1.03] text-left"
              >
                <div 
                  className="w-full h-24 rounded-xl border border-slate-100 dark:border-slate-700 shadow-inner overflow-hidden mb-2"
                  style={{ backgroundImage: backgroundStyle }}
                />
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 group-hover:text-[#518231] transition-colors truncate w-full">
                  {preset.name}
                </span>
                <span className="text-[9px] text-slate-400 capitalize mt-0.5">
                  {preset.type.replace("-", " ")}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: Recent History & Favorites */}
      {(recentGradients.length > 0 || favorites.length > 0) && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Favorites List */}
          {favorites.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Star size={16} className="text-yellow-500" /> Bookmarks / Favorites
              </h3>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-48 overflow-y-auto pr-1">
                {favorites.map((fav, i) => {
                  const favCss = fav.stops.map(s => `${toRgbaStr(s.color, s.opacity)} ${s.position}%`).join(", ");
                  const bgStyle = fav.type === "linear" ? `linear-gradient(${fav.angle}deg, ${favCss})` : `radial-gradient(circle, ${favCss})`;
                  
                  return (
                    <button
                      key={i}
                      onClick={() => loadGradient(fav)}
                      className="group p-1.5 bg-white dark:bg-slate-800 rounded-xl border flex flex-col text-left transition-all hover:scale-105"
                    >
                      <div className="h-12 w-full rounded-lg mb-1" style={{ backgroundImage: bgStyle }} />
                      <span className="text-[8px] font-bold text-slate-500 group-hover:text-[#518231] truncate w-full">
                        {fav.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* History List */}
          {recentGradients.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <RefreshCw size={14} /> Recent Swatches
                </h3>
                <button
                  onClick={clearHistory}
                  className="text-[10px] text-red-500 hover:underline"
                >
                  Clear log
                </button>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 max-h-48 overflow-y-auto pr-1">
                {recentGradients.map((item, i) => {
                  const itemCss = item.stops.map(s => `${toRgbaStr(s.color, s.opacity)} ${s.position}%`).join(", ");
                  const bgStyle = item.type === "linear" ? `linear-gradient(${item.angle}deg, ${itemCss})` : `radial-gradient(circle, ${itemCss})`;
                  
                  return (
                    <button
                      key={i}
                      onClick={() => loadGradient(item)}
                      className="group p-1 bg-white dark:bg-slate-800 rounded-xl border flex flex-col transition-all hover:scale-105"
                    >
                      <div className="h-10 w-full rounded-lg" style={{ backgroundImage: bgStyle }} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </section>
      )}

    </div>
  );
}
