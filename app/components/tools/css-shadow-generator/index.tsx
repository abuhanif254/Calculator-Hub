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
  Grid3X3
} from "lucide-react";
import { Link } from "../../../../i18n/routing";
import { addToHistory as addToGlobalHistory } from "../../../../lib/hooks/useToolHistory";

// --- Types ---
interface BoxShadowLayer {
  id: string;
  x: number; // horizontal offset (-100 to 100)
  y: number; // vertical offset (-100 to 100)
  blur: number; // 0 to 100
  spread: number; // -100 to 100
  color: string; // Hex color e.g., #000000
  opacity: number; // 0 to 1
  inset: boolean;
  active: boolean;
}

interface TextShadowLayer {
  id: string;
  x: number;
  y: number;
  blur: number;
  color: string;
  opacity: number;
  active: boolean;
}

interface SavedShadow {
  id: string;
  name: string;
  mode: "box" | "text" | "neumorphism";
  boxLayers?: BoxShadowLayer[];
  textLayers?: TextShadowLayer[];
  neumorphismConfig?: {
    size: number;
    radius: number;
    distance: number;
    blur: number;
    intensity: number;
    color: string;
    shape: string;
    lightDirection: string;
  };
  timestamp: number;
}

// --- Presets ---
const BOX_PRESETS = [
  {
    name: "Soft SaaS Card",
    layers: [
      { id: "1", x: 0, y: 1, blur: 3, spread: 0, color: "#000000", opacity: 0.05, inset: false, active: true },
      { id: "2", x: 0, y: 10, blur: 20, spread: -5, color: "#000000", opacity: 0.04, inset: false, active: true },
      { id: "3", x: 0, y: 20, blur: 25, spread: -10, color: "#000000", opacity: 0.03, inset: false, active: true }
    ]
  },
  {
    name: "Material Elevation 1",
    layers: [
      { id: "1", x: 0, y: 1, blur: 3, spread: 0, color: "#000000", opacity: 0.12, inset: false, active: true },
      { id: "2", x: 0, y: 1, blur: 2, spread: 0, color: "#000000", opacity: 0.24, inset: false, active: true }
    ]
  },
  {
    name: "Material Elevation 4",
    layers: [
      { id: "1", x: 0, y: 10, blur: 20, spread: 0, color: "#000000", opacity: 0.19, inset: false, active: true },
      { id: "2", x: 0, y: 6, blur: 6, spread: 0, color: "#000000", opacity: 0.23, inset: false, active: true }
    ]
  },
  {
    name: "Double Glow (Neon)",
    layers: [
      { id: "1", x: 0, y: 0, blur: 10, spread: 2, color: "#ec4899", opacity: 0.5, inset: false, active: true },
      { id: "2", x: 0, y: 0, blur: 25, spread: 5, color: "#3b82f6", opacity: 0.3, inset: false, active: true }
    ]
  },
  {
    name: "Deep Floating Modal",
    layers: [
      { id: "1", x: 0, y: 2, blur: 4, spread: 0, color: "#000000", opacity: 0.04, inset: false, active: true },
      { id: "2", x: 0, y: 20, blur: 25, spread: -5, color: "#000000", opacity: 0.1, inset: false, active: true },
      { id: "3", x: 0, y: 30, blur: 50, spread: -15, color: "#000000", opacity: 0.05, inset: false, active: true }
    ]
  },
  {
    name: "Sharp Outline Border",
    layers: [
      { id: "1", x: 4, y: 4, blur: 0, spread: 0, color: "#000000", opacity: 1, inset: false, active: true }
    ]
  }
];

const TEXT_PRESETS = [
  {
    name: "Modern Glow",
    layers: [
      { id: "1", x: 0, y: 0, blur: 8, color: "#6366f1", opacity: 0.6, active: true },
      { id: "2", x: 0, y: 0, blur: 20, color: "#4f46e5", opacity: 0.3, active: true }
    ]
  },
  {
    name: "3D Retro Block",
    layers: [
      { id: "1", x: 1, y: 1, blur: 0, color: "#ef4444", opacity: 1, active: true },
      { id: "2", x: 2, y: 2, blur: 0, color: "#f97316", opacity: 1, active: true },
      { id: "3", x: 3, y: 3, blur: 0, color: "#eab308", opacity: 1, active: true },
      { id: "4", x: 4, y: 4, blur: 0, color: "#22c55e", opacity: 1, active: true }
    ]
  },
  {
    name: "Subtle Depth shadow",
    layers: [
      { id: "1", x: 0, y: 2, blur: 4, color: "#000000", opacity: 0.25, active: true }
    ]
  },
  {
    name: "Cyberpunk Neon Aura",
    layers: [
      { id: "1", x: 0, y: 0, blur: 5, color: "#00f0ff", opacity: 0.8, active: true },
      { id: "2", x: -2, y: 2, blur: 10, color: "#ff007f", opacity: 0.5, active: true }
    ]
  }
];

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

const checkerboardStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Crect width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' width='4' height='4' fill='%23e2e8f0'/%3E%3Crect y='4' width='4' height='4' fill='%23e2e8f0'/%3E%3C/svg%3E")`,
};

export function CssShadowGeneratorTool() {
  const [mounted, setMounted] = useState(false);

  // --- Core State ---
  const [mode, setMode] = useState<"box" | "text" | "neumorphism">("box");
  
  // Custom Box Shadow layers
  const [boxLayers, setBoxLayers] = useState<BoxShadowLayer[]>([
    { id: "1", x: 0, y: 4, blur: 6, spread: -1, color: "#000000", opacity: 0.1, inset: false, active: true },
    { id: "2", x: 0, y: 2, blur: 4, spread: -1, color: "#000000", opacity: 0.06, inset: false, active: true }
  ]);
  const [selectedBoxLayerId, setSelectedBoxLayerId] = useState<string>("1");

  // Custom Text Shadow layers
  const [textLayers, setTextLayers] = useState<TextShadowLayer[]>([
    { id: "1", x: 0, y: 2, blur: 4, color: "#000000", opacity: 0.25, active: true }
  ]);
  const [selectedTextLayerId, setSelectedTextLayerId] = useState<string>("1");

  // Neumorphism settings
  const [neuBgColor, setNeuBgColor] = useState("#e0e0e0");
  const [neuDistance, setNeuDistance] = useState(8);
  const [neuBlur, setNeuBlur] = useState(16);
  const [neuIntensity, setNeuIntensity] = useState(0.15);
  const [neuShape, setNeuShape] = useState<"flat" | "concave" | "convex" | "pressed">("flat");
  const [neuLightDirection, setNeuLightDirection] = useState<"top-left" | "top-right" | "bottom-left" | "bottom-right">("top-left");

  // Canvas visual modifiers
  const [canvasBgColor, setCanvasBgColor] = useState("#f1f5f9");
  const [cardBgColor, setCardBgColor] = useState("#ffffff");
  const [cardBorderRadius, setCardBorderRadius] = useState(16);

  // Form picking bindings
  const [hexInput, setHexInput] = useState("#000000");
  const [rInput, setRInput] = useState("0");
  const [gInput, setGInput] = useState("0");
  const [bInput, setBInput] = useState("0");
  const [opacityInput, setOpacityInput] = useState(0.1);

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Sync toolbar
  const [activeTab, setActiveTab] = useState<"css" | "tailwind" | "scss" | "json">("css");
  const [previewTab, setPreviewTab] = useState<"kit" | "widgets" | "alerts">("kit");
  const [copiedText, setCopiedText] = useState(false);
  const [darkPreviewMode, setDarkPreviewMode] = useState(false);
  const [recentShadows, setRecentShadows] = useState<SavedShadow[]>([]);
  const [favorites, setFavorites] = useState<SavedShadow[]>([]);
  const [isThemeFavorite, setIsThemeFavorite] = useState(false);

  const offsetPadRef = useRef<HTMLDivElement>(null);

  // Get active layer
  const activeBoxLayer = useMemo(() => {
    return boxLayers.find(l => l.id === selectedBoxLayerId) || boxLayers[0] || { id: "", x: 0, y: 0, blur: 0, spread: 0, color: "#000000", opacity: 0.1, inset: false, active: true };
  }, [boxLayers, selectedBoxLayerId]);

  const activeTextLayer = useMemo(() => {
    return textLayers.find(l => l.id === selectedTextLayerId) || textLayers[0] || { id: "", x: 0, y: 0, blur: 0, color: "#000000", opacity: 0.25, active: true };
  }, [textLayers, selectedTextLayerId]);

  // Setup on Mount
  useEffect(() => {
    setMounted(true);
    addToGlobalHistory({ slug: "css-shadow-generator", title: "CSS Shadow Generator", type: "tool" });

    // Load LocalStorage Cache
    const savedHistory = localStorage.getItem("nexus_shadow_history");
    if (savedHistory) {
      try { setRecentShadows(JSON.parse(savedHistory)); } catch (e) {}
    }
    const savedFavs = localStorage.getItem("nexus_shadow_favorites");
    if (savedFavs) {
      try { setFavorites(JSON.parse(savedFavs)); } catch (e) {}
    }
  }, []);

  // Synchronize picker values when active layer changes
  useEffect(() => {
    if (mode === "box") {
      if (focusedInput !== "hex") setHexInput(activeBoxLayer.color);
      setOpacityInput(activeBoxLayer.opacity);
      const rgb = hexToRgb(activeBoxLayer.color);
      if (!focusedInput?.startsWith("rgb-")) {
        setRInput(rgb.r.toString());
        setGInput(rgb.g.toString());
        setBInput(rgb.b.toString());
      }
    } else if (mode === "text") {
      if (focusedInput !== "hex") setHexInput(activeTextLayer.color);
      setOpacityInput(activeTextLayer.opacity);
      const rgb = hexToRgb(activeTextLayer.color);
      if (!focusedInput?.startsWith("rgb-")) {
        setRInput(rgb.r.toString());
        setGInput(rgb.g.toString());
        setBInput(rgb.b.toString());
      }
    }
  }, [activeBoxLayer, activeTextLayer, mode, focusedInput]);

  // --- Neumorphic Math Helpers ---
  const neumorphicStyles = useMemo(() => {
    const rgb = hexToRgb(neuBgColor);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    const getHex = (lShift: number) => {
      const targetL = clamp(hsl.l + lShift, 0, 100);
      const rgbShift = hslToRgb(hsl.h, hsl.s, targetL);
      return rgbToHex(rgbShift.r, rgbShift.g, rgbShift.b);
    };

    // Calculate light and dark colors
    const shadowColor = getHex(-12);
    const highlightColor = getHex(12);

    // Coordinate offsets
    let d = neuDistance;
    let b = neuBlur;
    let darkX = d, darkY = d;
    let lightX = -d, lightY = -d;

    if (neuLightDirection === "top-right") {
      darkX = -d; darkY = d;
      lightX = d; lightY = -d;
    } else if (neuLightDirection === "bottom-left") {
      darkX = d; darkY = -d;
      lightX = -d; lightY = d;
    } else if (neuLightDirection === "bottom-right") {
      darkX = -d; darkY = -d;
      lightX = d; lightY = d;
    }

    const shadowStr = `${toRgbaStr(shadowColor, neuIntensity)}`;
    const highlightStr = `${toRgbaStr(highlightColor, 0.9)}`;

    let boxShadowCode = "";
    let backgroundStyle: React.CSSProperties = { backgroundColor: neuBgColor };

    if (neuShape === "flat") {
      boxShadowCode = `${lightX}px ${lightY}px ${b}px ${highlightStr}, ${darkX}px ${darkY}px ${b}px ${shadowStr}`;
    } else if (neuShape === "pressed") {
      boxShadowCode = `inset ${lightX}px ${lightY}px ${b}px ${highlightStr}, inset ${darkX}px ${darkY}px ${b}px ${shadowStr}`;
    } else if (neuShape === "concave") {
      boxShadowCode = `${lightX}px ${lightY}px ${b}px ${highlightStr}, ${darkX}px ${darkY}px ${b}px ${shadowStr}`;
      
      // gradient angles
      let angle = 145;
      if (neuLightDirection === "top-right") angle = 225;
      else if (neuLightDirection === "bottom-left") angle = 45;
      else if (neuLightDirection === "bottom-right") angle = 315;

      backgroundStyle.backgroundImage = `linear-gradient(${angle}deg, ${getHex(-5)}, ${getHex(5)})`;
    } else if (neuShape === "convex") {
      boxShadowCode = `${lightX}px ${lightY}px ${b}px ${highlightStr}, ${darkX}px ${darkY}px ${b}px ${shadowStr}`;

      let angle = 145;
      if (neuLightDirection === "top-right") angle = 225;
      else if (neuLightDirection === "bottom-left") angle = 45;
      else if (neuLightDirection === "bottom-right") angle = 315;

      backgroundStyle.backgroundImage = `linear-gradient(${angle}deg, ${getHex(5)}, ${getHex(-5)})`;
    }

    return {
      boxShadowCode,
      backgroundStyle,
      shadowColor,
      highlightColor
    };
  }, [neuBgColor, neuDistance, neuBlur, neuIntensity, neuShape, neuLightDirection]);

  // --- Combined CSS Properties Output ---
  const compiledShadowProperty = useMemo(() => {
    if (mode === "box") {
      const activeLayers = boxLayers.filter(l => l.active);
      if (activeLayers.length === 0) return "none";
      return activeLayers.map(l => {
        return `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${toRgbaStr(l.color, l.opacity)}`;
      }).join(", ");
    } else if (mode === "text") {
      const activeLayers = textLayers.filter(l => l.active);
      if (activeLayers.length === 0) return "none";
      return activeLayers.map(l => {
        return `${l.x}px ${l.y}px ${l.blur}px ${toRgbaStr(l.color, l.opacity)}`;
      }).join(", ");
    } else {
      return neumorphicStyles.boxShadowCode;
    }
  }, [boxLayers, textLayers, neumorphicStyles, mode]);

  // CSS snippet
  const cssOutput = useMemo(() => {
    if (mode === "box") {
      return `box-shadow: ${compiledShadowProperty};`;
    } else if (mode === "text") {
      return `text-shadow: ${compiledShadowProperty};`;
    } else {
      const cssGrad = neumorphicStyles.backgroundStyle.backgroundImage 
        ? `\nbackground: ${neumorphicStyles.backgroundStyle.backgroundImage};` 
        : "";
      return `box-shadow: ${compiledShadowProperty};\nbackground-color: ${neuBgColor};${cssGrad}`;
    }
  }, [compiledShadowProperty, mode, neumorphicStyles, neuBgColor]);

  // Tailwind Code Generator
  const tailwindOutput = useMemo(() => {
    const isSimpleBox = mode === "box";
    if (isSimpleBox) {
      // Find standard tailwind equivalents for simple configurations
      // e.g. shadow-sm, shadow-md, etc.
      // Otherwise output arbitrary brackets
      const cleanProp = compiledShadowProperty.replace(/\s+/g, "_");
      return `shadow-[${cleanProp}]`;
    } else if (mode === "text") {
      const cleanProp = compiledShadowProperty.replace(/\s+/g, "_");
      // Tailwind v4 doesn't support text-shadow by default (need arbitrary)
      return `text-shadow-[${cleanProp}]`;
    } else {
      const cleanProp = compiledShadowProperty.replace(/\s+/g, "_");
      return `shadow-[${cleanProp}]`;
    }
  }, [compiledShadowProperty, mode]);

  const scssOutput = useMemo(() => {
    const varName = mode === "box" ? "$custom-box-shadow" : mode === "text" ? "$custom-text-shadow" : "$neumorphic-shadow";
    return `${varName}: ${compiledShadowProperty};`;
  }, [compiledShadowProperty, mode]);

  const jsonOutput = useMemo(() => {
    const config = {
      mode,
      property: mode === "box" ? "box-shadow" : mode === "text" ? "text-shadow" : "box-shadow",
      value: compiledShadowProperty,
      tailwind: tailwindOutput,
      neumorphism: mode === "neumorphism" ? {
        distance: neuDistance,
        blur: neuBlur,
        intensity: neuIntensity,
        shape: neuShape,
        lightDirection: neuLightDirection,
        color: neuBgColor
      } : undefined
    };
    return JSON.stringify(config, null, 2);
  }, [mode, compiledShadowProperty, tailwindOutput, neuDistance, neuBlur, neuIntensity, neuShape, neuLightDirection, neuBgColor]);

  // --- Layer Management ---
  const handleAddLayer = () => {
    const newId = Date.now().toString();
    if (mode === "box") {
      const newLayer: BoxShadowLayer = {
        id: newId,
        x: 0,
        y: 4,
        blur: 10,
        spread: 0,
        color: "#000000",
        opacity: 0.15,
        inset: false,
        active: true
      };
      setBoxLayers(prev => [...prev, newLayer]);
      setSelectedBoxLayerId(newId);
    } else {
      const newLayer: TextShadowLayer = {
        id: newId,
        x: 0,
        y: 2,
        blur: 6,
        color: "#000000",
        opacity: 0.2,
        active: true
      };
      setTextLayers(prev => [...prev, newLayer]);
      setSelectedTextLayerId(newId);
    }
    triggerSaveHistory();
  };

  const handleDuplicateLayer = (layerId: string) => {
    const newId = Date.now().toString();
    if (mode === "box") {
      const target = boxLayers.find(l => l.id === layerId);
      if (!target) return;
      const duplicated = { ...target, id: newId };
      setBoxLayers(prev => [...prev, duplicated]);
      setSelectedBoxLayerId(newId);
    } else {
      const target = textLayers.find(l => l.id === layerId);
      if (!target) return;
      const duplicated = { ...target, id: newId };
      setTextLayers(prev => [...prev, duplicated]);
      setSelectedTextLayerId(newId);
    }
    triggerSaveHistory();
  };

  const handleRemoveLayer = (layerId: string) => {
    if (mode === "box") {
      if (boxLayers.length <= 1) return;
      const updated = boxLayers.filter(l => l.id !== layerId);
      setBoxLayers(updated);
      if (selectedBoxLayerId === layerId) {
        setSelectedBoxLayerId(updated[0].id);
      }
    } else {
      if (textLayers.length <= 1) return;
      const updated = textLayers.filter(l => l.id !== layerId);
      setTextLayers(updated);
      if (selectedTextLayerId === layerId) {
        setSelectedTextLayerId(updated[0].id);
      }
    }
    triggerSaveHistory();
  };

  // --- Interactive 2D Offset Pad Dragging ---
  const handleOffsetPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updateOffsetFromPointer(e);
  };

  const handleOffsetPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      updateOffsetFromPointer(e);
    }
  };

  const handleOffsetPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    triggerSaveHistory();
  };

  const updateOffsetFromPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!offsetPadRef.current) return;
    const rect = offsetPadRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Map offset coordinates to -50 to 50
    const rawX = Math.round(((x - cx) / cx) * 50);
    const rawY = Math.round(((y - cy) / cy) * 50);

    const clampedX = clamp(rawX, -50, 50);
    const clampedY = clamp(rawY, -50, 50);

    if (mode === "box") {
      setBoxLayers(prev => prev.map(l => l.id === selectedBoxLayerId ? { ...l, x: clampedX, y: clampedY } : l));
    } else {
      setTextLayers(prev => prev.map(l => l.id === selectedTextLayerId ? { ...l, x: clampedX, y: clampedY } : l));
    }
  };

  // --- Form Modification Handlers ---
  const handleHexChange = (val: string) => {
    setHexInput(val);
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      if (mode === "box") {
        setBoxLayers(prev => prev.map(l => l.id === selectedBoxLayerId ? { ...l, color: val } : l));
      } else {
        setTextLayers(prev => prev.map(l => l.id === selectedTextLayerId ? { ...l, color: val } : l));
      }
      triggerSaveHistory();
    }
  };

  const handleRgbChange = (channel: "r" | "g" | "b", valStr: string) => {
    if (channel === "r") setRInput(valStr);
    if (channel === "g") setGInput(valStr);
    if (channel === "b") setBInput(valStr);

    const val = parseInt(valStr, 10);
    if (isNaN(val)) return;

    const baseHex = mode === "box" ? activeBoxLayer.color : activeTextLayer.color;
    const rgb = hexToRgb(baseHex);
    const r = channel === "r" ? clamp(val, 0, 255) : rgb.r;
    const g = channel === "g" ? clamp(val, 0, 255) : rgb.g;
    const b = channel === "b" ? clamp(val, 0, 255) : rgb.b;

    const nextHex = rgbToHex(r, g, b);
    if (mode === "box") {
      setBoxLayers(prev => prev.map(l => l.id === selectedBoxLayerId ? { ...l, color: nextHex } : l));
    } else {
      setTextLayers(prev => prev.map(l => l.id === selectedTextLayerId ? { ...l, color: nextHex } : l));
    }
    triggerSaveHistory();
  };

  const handleOpacitySliderChange = (val: number) => {
    setOpacityInput(val);
    if (mode === "box") {
      setBoxLayers(prev => prev.map(l => l.id === selectedBoxLayerId ? { ...l, opacity: val } : l));
    } else {
      setTextLayers(prev => prev.map(l => l.id === selectedTextLayerId ? { ...l, opacity: val } : l));
    }
  };

  // --- Presets Loaders ---
  const loadBoxPreset = (preset: typeof BOX_PRESETS[0]) => {
    setBoxLayers(preset.layers.map(l => ({ ...l })));
    setSelectedBoxLayerId(preset.layers[0].id);
    triggerSaveHistory();
  };

  const loadTextPreset = (preset: typeof TEXT_PRESETS[0]) => {
    setTextLayers(preset.layers.map(l => ({ ...l })));
    setSelectedTextLayerId(preset.layers[0].id);
    triggerSaveHistory();
  };

  // --- EyeDropper integration ---
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

  // --- Copy Text ---
  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  // --- History Cache ---
  const triggerSaveHistory = () => {
    const newShadow: SavedShadow = {
      id: Date.now().toString(),
      name: `Shadow ${mode.toUpperCase()} ${Date.now().toString().slice(-4)}`,
      mode,
      boxLayers: mode === "box" ? [...boxLayers] : undefined,
      textLayers: mode === "text" ? [...textLayers] : undefined,
      neumorphismConfig: mode === "neumorphism" ? {
        size: 200, radius: cardBorderRadius, distance: neuDistance, blur: neuBlur, intensity: neuIntensity, color: neuBgColor, shape: neuShape, lightDirection: neuLightDirection
      } : undefined,
      timestamp: Date.now()
    };

    setRecentShadows(prev => {
      const filtered = prev.filter(item => JSON.stringify(item.boxLayers) !== JSON.stringify(newShadow.boxLayers));
      const updated = [newShadow, ...filtered].slice(0, 10);
      localStorage.setItem("nexus_shadow_history", JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavoriteTheme = () => {
    const currentFav: SavedShadow = {
      id: Date.now().toString(),
      name: `Fav ${mode.toUpperCase()}`,
      mode,
      boxLayers: mode === "box" ? [...boxLayers] : undefined,
      textLayers: mode === "text" ? [...textLayers] : undefined,
      neumorphismConfig: mode === "neumorphism" ? {
        size: 200, radius: cardBorderRadius, distance: neuDistance, blur: neuBlur, intensity: neuIntensity, color: neuBgColor, shape: neuShape, lightDirection: neuLightDirection
      } : undefined,
      timestamp: Date.now()
    };

    setFavorites(prev => {
      const exists = prev.some(item => item.mode === mode && JSON.stringify(item.boxLayers) === JSON.stringify(boxLayers));
      let updated;
      if (exists) {
        updated = prev.filter(item => !(item.mode === mode && JSON.stringify(item.boxLayers) === JSON.stringify(boxLayers)));
        setIsThemeFavorite(false);
      } else {
        updated = [currentFav, ...prev];
        setIsThemeFavorite(true);
      }
      localStorage.setItem("nexus_shadow_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const exists = favorites.some(item => item.mode === mode && JSON.stringify(item.boxLayers) === JSON.stringify(boxLayers));
    setIsThemeFavorite(exists);
  }, [boxLayers, favorites, mode]);

  const loadSavedShadow = (saved: SavedShadow) => {
    setMode(saved.mode);
    if (saved.boxLayers) {
      setBoxLayers(saved.boxLayers);
      setSelectedBoxLayerId(saved.boxLayers[0].id);
    }
    if (saved.textLayers) {
      setTextLayers(saved.textLayers);
      setSelectedTextLayerId(saved.textLayers[0].id);
    }
    if (saved.neumorphismConfig) {
      const conf = saved.neumorphismConfig;
      setNeuBgColor(conf.color);
      setNeuDistance(conf.distance);
      setNeuBlur(conf.blur);
      setNeuIntensity(conf.intensity);
      setNeuShape(conf.shape as any);
      setNeuLightDirection(conf.lightDirection as any);
    }
  };

  const clearHistory = () => {
    setRecentShadows([]);
    localStorage.removeItem("nexus_shadow_history");
  };

  const handleRandomize = () => {
    if (mode === "box") {
      const layersCount = Math.floor(Math.random() * 2) + 1; // 1 or 2 layers
      const nextLayers: BoxShadowLayer[] = [];
      for (let i = 0; i < layersCount; i++) {
        nextLayers.push({
          id: `rand-${i}-${Date.now()}`,
          x: Math.floor(Math.random() * 20) - 10,
          y: Math.floor(Math.random() * 25) + 2,
          blur: Math.floor(Math.random() * 30) + 5,
          spread: Math.floor(Math.random() * 10) - 5,
          color: "#000000",
          opacity: Number((Math.random() * 0.15).toFixed(2)),
          inset: false,
          active: true
        });
      }
      setBoxLayers(nextLayers);
      setSelectedBoxLayerId(nextLayers[0].id);
    } else if (mode === "text") {
      setTextLayers([
        {
          id: `rand-${Date.now()}`,
          x: Math.floor(Math.random() * 8) - 4,
          y: Math.floor(Math.random() * 8) - 4,
          blur: Math.floor(Math.random() * 10) + 2,
          color: "#000000",
          opacity: Number((Math.random() * 0.4).toFixed(2)),
          active: true
        }
      ]);
    }
    triggerSaveHistory();
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500">
        <RefreshCw size={24} className="animate-spin mr-2" /> Initializing Shadow Workspace...
      </div>
    );
  }

  // Pre-calculated target styles for box container preview
  const liveBoxStyle = mode === "box" ? {
    boxShadow: compiledShadowProperty,
    backgroundColor: cardBgColor,
    borderRadius: `${cardBorderRadius}px`
  } : mode === "neumorphism" ? {
    boxShadow: neumorphicStyles.boxShadowCode,
    borderRadius: `${cardBorderRadius}px`,
    ...neumorphicStyles.backgroundStyle
  } : {
    backgroundColor: cardBgColor,
    borderRadius: `${cardBorderRadius}px`
  };

  return (
    <div className="w-full flex flex-col gap-10 text-slate-800 dark:text-slate-200">
      
      {/* SECTION 1: Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Controls (5/12 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* A. Mode tabs */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders size={16} /> Shadow Mode Configuration
            </h3>

            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              {(["box", "text", "neumorphism"] as const).map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m); triggerSaveHistory(); }}
                  className={`py-2 text-xs font-bold rounded-lg capitalize transition-all ${mode === m ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
                >
                  {m === "box" ? "Box Shadow" : m === "text" ? "Text Shadow" : "Neumorphism"}
                </button>
              ))}
            </div>
          </div>

          {/* B1. Box Shadow Controls */}
          {mode === "box" && (
            <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              
              {/* Layers List */}
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shadow Layers</span>
                <button
                  onClick={handleAddLayer}
                  className="flex items-center gap-1 text-[11px] py-1 px-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                >
                  <Plus size={12} /> Add Layer
                </button>
              </div>

              {/* Layer Selection row */}
              <div className="flex flex-wrap gap-1.5 py-1">
                {boxLayers.map((layer, index) => (
                  <div 
                    key={layer.id}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${selectedBoxLayerId === layer.id ? 'bg-[#518231]/10 text-[#518231] border-[#518231]' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}
                  >
                    <button
                      onClick={() => setSelectedBoxLayerId(layer.id)}
                      className="flex items-center gap-1"
                    >
                      <Layers size={11} /> Layer {index + 1}
                    </button>
                    {boxLayers.length > 1 && (
                      <button
                        onClick={() => handleRemoveLayer(layer.id)}
                        className="text-red-500 hover:text-red-600 ml-1"
                        title="Delete Layer"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Sliders for offsets */}
              <div className="space-y-4 pt-2">
                
                {/* 2D Coordinate Offset Pad */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Interactive Offset Pad</span>
                  <div className="flex justify-center">
                    <div
                      ref={offsetPadRef}
                      onPointerDown={handleOffsetPointerDown}
                      onPointerMove={handleOffsetPointerMove}
                      onPointerUp={handleOffsetPointerUp}
                      className="w-40 h-40 rounded-xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 relative cursor-crosshair select-none touch-none shadow-inner"
                    >
                      {/* Grid cross lines */}
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-slate-100 dark:border-slate-700/50" />
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l border-slate-100 dark:border-slate-700/50" />
                      
                      {/* Drag target indicator dot */}
                      <div
                        className="w-4 h-4 rounded-full bg-[#518231] border-2 border-white shadow absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                          left: `${50 + (activeBoxLayer.x / 50) * 50}%`,
                          top: `${50 + (activeBoxLayer.y / 50) * 50}%`
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-slate-400">
                    <span>X: {activeBoxLayer.x}px</span>
                    <span>Y: {activeBoxLayer.y}px</span>
                  </div>
                </div>

                {/* Inset Toggle */}
                <div className="flex justify-between items-center text-xs pb-1">
                  <label htmlFor="inset-toggle" className="font-bold text-slate-600 dark:text-slate-400">Inset Shadow (Inner):</label>
                  <input
                    type="checkbox"
                    id="inset-toggle"
                    checked={activeBoxLayer.inset}
                    onChange={(e) => {
                      setBoxLayers(prev => prev.map(l => l.id === selectedBoxLayerId ? { ...l, inset: e.target.checked } : l));
                      triggerSaveHistory();
                    }}
                    className="rounded text-[#518231] focus:ring-[#518231] w-4 h-4"
                  />
                </div>

                {/* Blur Radius */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <label htmlFor="blur-slider">Blur Radius</label>
                    <span className="font-mono">{activeBoxLayer.blur}px</span>
                  </div>
                  <input
                    id="blur-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={activeBoxLayer.blur}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setBoxLayers(prev => prev.map(l => l.id === selectedBoxLayerId ? { ...l, blur: val } : l));
                    }}
                    onMouseUp={triggerSaveHistory}
                    className="w-full accent-[#518231]"
                  />
                </div>

                {/* Spread Radius */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <label htmlFor="spread-slider">Spread Radius</label>
                    <span className="font-mono">{activeBoxLayer.spread}px</span>
                  </div>
                  <input
                    id="spread-slider"
                    type="range"
                    min="-50"
                    max="50"
                    value={activeBoxLayer.spread}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setBoxLayers(prev => prev.map(l => l.id === selectedBoxLayerId ? { ...l, spread: val } : l));
                    }}
                    onMouseUp={triggerSaveHistory}
                    className="w-full accent-[#518231]"
                  />
                </div>

                {/* Opacity slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <label htmlFor="opacity-slider">Shadow Opacity</label>
                    <span className="font-mono">{Math.round(opacityInput * 100)}%</span>
                  </div>
                  <input
                    id="opacity-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={opacityInput}
                    onChange={(e) => handleOpacitySliderChange(parseFloat(e.target.value))}
                    onMouseUp={triggerSaveHistory}
                    className="w-full accent-[#518231]"
                  />
                </div>

                {/* Color Input row */}
                <div className="grid grid-cols-12 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div 
                    className="col-span-2 relative h-9 rounded-lg overflow-hidden border cursor-pointer hover:scale-105 transition-all shadow-inner"
                    style={checkerboardStyle}
                  >
                    <input
                      type="color"
                      value={activeBoxLayer.color}
                      onChange={(e) => handleHexChange(e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: activeBoxLayer.color }} />
                  </div>

                  <div className="col-span-8 grid grid-cols-2 gap-2">
                    <input
                      aria-label="Hex Color"
                      type="text"
                      value={hexInput}
                      onChange={(e) => handleHexChange(e.target.value)}
                      onFocus={() => setFocusedInput("hex")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full text-xs font-mono py-1 px-1.5 bg-white dark:bg-slate-800 border rounded text-center uppercase"
                    />
                    <input
                      aria-label="RGB Color"
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
                      className="w-full text-[10px] font-mono py-1 px-1 bg-white dark:bg-slate-800 border rounded text-center"
                    />
                  </div>

                  <div className="col-span-2">
                    <button
                      onClick={handleEyeDropper}
                      className="w-full h-9 bg-white dark:bg-slate-800 hover:bg-slate-50 border rounded-lg flex items-center justify-center transition-colors text-slate-500"
                      title="EyeDropper API (Chrome/Edge)"
                    >
                      <Palette size={14} />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* B2. Text Shadow Controls */}
          {mode === "text" && (
            <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              
              {/* Layers List */}
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shadow Layers</span>
                <button
                  onClick={handleAddLayer}
                  className="flex items-center gap-1 text-[11px] py-1 px-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
                >
                  <Plus size={12} /> Add Layer
                </button>
              </div>

              {/* Layer Selection row */}
              <div className="flex flex-wrap gap-1.5 py-1">
                {textLayers.map((layer, index) => (
                  <div 
                    key={layer.id}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${selectedTextLayerId === layer.id ? 'bg-[#518231]/10 text-[#518231] border-[#518231]' : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}
                  >
                    <button
                      onClick={() => setSelectedTextLayerId(layer.id)}
                      className="flex items-center gap-1"
                    >
                      <Layers size={11} /> Layer {index + 1}
                    </button>
                    {textLayers.length > 1 && (
                      <button
                        onClick={() => handleRemoveLayer(layer.id)}
                        className="text-red-500 hover:text-red-600 ml-1"
                        title="Delete Layer"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Sliders for offsets */}
              <div className="space-y-4 pt-2">
                
                {/* 2D Coordinate Offset Pad */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block">Interactive Offset Pad</span>
                  <div className="flex justify-center">
                    <div
                      ref={offsetPadRef}
                      onPointerDown={handleOffsetPointerDown}
                      onPointerMove={handleOffsetPointerMove}
                      onPointerUp={handleOffsetPointerUp}
                      className="w-40 h-40 rounded-xl border border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700 relative cursor-crosshair select-none touch-none shadow-inner"
                    >
                      {/* Grid cross lines */}
                      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-slate-100 dark:border-slate-700/50" />
                      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l border-slate-100 dark:border-slate-700/50" />
                      
                      {/* Drag target indicator dot */}
                      <div
                        className="w-4 h-4 rounded-full bg-[#518231] border-2 border-white shadow absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                        style={{
                          left: `${50 + (activeTextLayer.x / 50) * 50}%`,
                          top: `${50 + (activeTextLayer.y / 50) * 50}%`
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-slate-400">
                    <span>X: {activeTextLayer.x}px</span>
                    <span>Y: {activeTextLayer.y}px</span>
                  </div>
                </div>

                {/* Blur Radius */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <label htmlFor="text-blur-slider">Blur Radius</label>
                    <span className="font-mono">{activeTextLayer.blur}px</span>
                  </div>
                  <input
                    id="text-blur-slider"
                    type="range"
                    min="0"
                    max="100"
                    value={activeTextLayer.blur}
                    onChange={(e) => {
                      const val = parseInt(e.target.value, 10);
                      setTextLayers(prev => prev.map(l => l.id === selectedTextLayerId ? { ...l, blur: val } : l));
                    }}
                    onMouseUp={triggerSaveHistory}
                    className="w-full accent-[#518231]"
                  />
                </div>

                {/* Opacity slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-500">
                    <label htmlFor="text-opacity-slider">Shadow Opacity</label>
                    <span className="font-mono">{Math.round(opacityInput * 100)}%</span>
                  </div>
                  <input
                    id="text-opacity-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={opacityInput}
                    onChange={(e) => handleOpacitySliderChange(parseFloat(e.target.value))}
                    onMouseUp={triggerSaveHistory}
                    className="w-full accent-[#518231]"
                  />
                </div>

                {/* Color Input row */}
                <div className="grid grid-cols-12 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div 
                    className="col-span-2 relative h-9 rounded-lg overflow-hidden border cursor-pointer hover:scale-105 transition-all shadow-inner"
                    style={checkerboardStyle}
                  >
                    <input
                      type="color"
                      value={activeTextLayer.color}
                      onChange={(e) => handleHexChange(e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: activeTextLayer.color }} />
                  </div>

                  <div className="col-span-8 grid grid-cols-2 gap-2">
                    <input
                      aria-label="Hex Color"
                      type="text"
                      value={hexInput}
                      onChange={(e) => handleHexChange(e.target.value)}
                      onFocus={() => setFocusedInput("hex")}
                      onBlur={() => setFocusedInput(null)}
                      className="w-full text-xs font-mono py-1 px-1.5 bg-white dark:bg-slate-800 border rounded text-center uppercase"
                    />
                    <input
                      aria-label="RGB Color"
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
                      className="w-full text-[10px] font-mono py-1 px-1 bg-white dark:bg-slate-800 border rounded text-center"
                    />
                  </div>

                  <div className="col-span-2">
                    <button
                      onClick={handleEyeDropper}
                      className="w-full h-9 bg-white dark:bg-slate-800 hover:bg-slate-50 border rounded-lg flex items-center justify-center transition-colors text-slate-500"
                      title="EyeDropper API (Chrome/Edge)"
                    >
                      <Palette size={14} />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* B3. Neumorphism Controls */}
          {mode === "neumorphism" && (
            <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Soft UI Calculator</span>
              
              {/* Size & Radius */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="space-y-1">
                  <label htmlFor="neu-distance-input">Offset Distance</label>
                  <input
                    id="neu-distance-input"
                    type="number"
                    min="1"
                    max="50"
                    value={neuDistance}
                    onChange={(e) => {
                      const d = parseInt(e.target.value) || 8;
                      setNeuDistance(d);
                      setNeuBlur(d * 2); // sync blur
                    }}
                    className="w-full py-1 px-2 border rounded"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="neu-blur-input">Blur Radius</label>
                  <input
                    id="neu-blur-input"
                    type="number"
                    min="1"
                    max="100"
                    value={neuBlur}
                    onChange={(e) => setNeuBlur(parseInt(e.target.value) || 16)}
                    className="w-full py-1 px-2 border rounded"
                  />
                </div>
              </div>

              {/* Intensity slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <label htmlFor="neu-intensity-slider">Shadow Intensity</label>
                  <span>{Math.round(neuIntensity * 100)}%</span>
                </div>
                <input
                  id="neu-intensity-slider"
                  type="range"
                  min="0.01"
                  max="0.4"
                  step="0.01"
                  value={neuIntensity}
                  onChange={(e) => setNeuIntensity(parseFloat(e.target.value))}
                  onMouseUp={triggerSaveHistory}
                  className="w-full accent-[#518231]"
                />
              </div>

              {/* Shape selection */}
              <div className="space-y-1">
                <span className="text-xs text-slate-400">Shape</span>
                <div className="grid grid-cols-4 gap-1">
                  {(["flat", "concave", "convex", "pressed"] as const).map(shape => (
                    <button
                      key={shape}
                      onClick={() => { setNeuShape(shape); triggerSaveHistory(); }}
                      className={`py-1 text-[10px] rounded border transition-colors capitalize ${neuShape === shape ? 'bg-[#518231] text-white border-[#518231]' : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}
                    >
                      {shape}
                    </button>
                  ))}
                </div>
              </div>

              {/* Light direction selection */}
              <div className="space-y-1">
                <span className="text-xs text-slate-400">Light Source Angle</span>
                <div className="grid grid-cols-2 gap-1 text-[10px]">
                  {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map(dir => (
                    <button
                      key={dir}
                      onClick={() => { setNeuLightDirection(dir); triggerSaveHistory(); }}
                      className={`py-1.5 rounded border capitalize transition-colors ${neuLightDirection === dir ? 'bg-[#518231] text-white border-[#518231]' : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}
                    >
                      {dir.replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Neumorphic base background color input */}
              <div className="space-y-1 pt-2 border-t">
                <div className="flex justify-between text-xs text-slate-400">
                  <label htmlFor="neu-bg-color-picker">Base Element & Background Color</label>
                </div>
                <div className="flex gap-2">
                  <input
                    id="neu-bg-color-picker"
                    type="color"
                    value={neuBgColor}
                    onChange={(e) => {
                      setNeuBgColor(e.target.value);
                      setCanvasBgColor(e.target.value);
                      triggerSaveHistory();
                    }}
                    className="w-10 h-8 rounded border cursor-pointer shrink-0"
                  />
                  <input
                    aria-label="Neumorphic Color Hex"
                    type="text"
                    value={neuBgColor}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNeuBgColor(val);
                      if (/^#[0-9a-fA-F]{6}$/.test(val)) {
                        setCanvasBgColor(val);
                        triggerSaveHistory();
                      }
                    }}
                    className="w-full text-xs font-mono py-1 px-2 border rounded"
                  />
                </div>
              </div>

            </div>
          )}

          {/* C. Canvas visual modifiers */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Canvas Customizations</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 text-xs">
                <label htmlFor="canvas-bg-picker">Canvas Background</label>
                <div className="flex gap-1.5">
                  <input
                    id="canvas-bg-picker"
                    type="color"
                    value={canvasBgColor}
                    onChange={(e) => setCanvasBgColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border"
                  />
                  <input
                    aria-label="Canvas BG Hex"
                    type="text"
                    value={canvasBgColor}
                    onChange={(e) => setCanvasBgColor(e.target.value)}
                    className="w-full text-[10px] font-mono border rounded px-1"
                  />
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label htmlFor="card-bg-picker">Card Background</label>
                <div className="flex gap-1.5">
                  <input
                    id="card-bg-picker"
                    type="color"
                    value={cardBgColor}
                    onChange={(e) => setCardBgColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border"
                  />
                  <input
                    aria-label="Card BG Hex"
                    type="text"
                    value={cardBgColor}
                    onChange={(e) => setCardBgColor(e.target.value)}
                    className="w-full text-[10px] font-mono border rounded px-1"
                  />
                </div>
              </div>
            </div>

            {/* Border radius */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-500">
                <label htmlFor="radius-slider">Border Radius</label>
                <span className="font-mono">{cardBorderRadius}px</span>
              </div>
              <input
                id="radius-slider"
                type="range"
                min="0"
                max="50"
                value={cardBorderRadius}
                onChange={(e) => setCardBorderRadius(parseInt(e.target.value, 10))}
                className="w-full accent-[#518231]"
              />
            </div>

            {/* Randomizer button */}
            <button
              onClick={handleRandomize}
              className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-xs font-bold transition-all hover:bg-slate-800 dark:hover:bg-slate-100 flex items-center justify-center gap-1.5"
            >
              <Shuffle size={14} /> Generate Random Settings
            </button>
          </div>

        </div>

        {/* Right Column: Previews & Exporter snippets (7/12 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {/* Main Visualizer Stage */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col relative">
            
            {/* Main Stage Canvas */}
            <div 
              className="w-full h-80 relative flex items-center justify-center p-12 overflow-hidden transition-colors"
              style={{ backgroundColor: canvasBgColor }}
            >
              {/* Box preview */}
              {mode !== "text" && (
                <div 
                  className="w-48 h-48 transition-all flex items-center justify-center text-center p-4 border border-transparent"
                  style={liveBoxStyle}
                >
                  <span className="text-xs font-black text-slate-500 select-none">
                    {mode === "neumorphism" ? "Neumorphic Shape" : "Shadowed Box"}
                  </span>
                </div>
              )}

              {/* Text preview */}
              {mode === "text" && (
                <div className="text-center p-4">
                  <h4 
                    className="text-4xl sm:text-5xl font-black tracking-tight select-all leading-normal text-white"
                    style={{ textShadow: compiledShadowProperty }}
                  >
                    TYPOGRAPHY
                  </h4>
                </div>
              )}

              {/* Quick favorite action button */}
              <button
                onClick={toggleFavoriteTheme}
                className="absolute top-4 right-4 bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-full hover:scale-110 shadow hover:bg-white dark:hover:bg-slate-800 transition-all text-slate-600 dark:text-slate-300 z-30"
                title={isThemeFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Heart size={18} fill={isThemeFavorite ? "#ef4444" : "none"} className={isThemeFavorite ? "text-red-500 scale-105" : ""} />
              </button>
            </div>

            {/* Design System Preview widgets (dashboard kpi, alerts, buttons) */}
            <div className="bg-slate-50 dark:bg-slate-900/50 p-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Design System Sandboxes</span>
                
                <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg">
                  {(["kit", "widgets", "alerts"] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setPreviewTab(tab)}
                      className={`py-0.5 px-2.5 text-[9px] font-bold rounded capitalize transition-all ${previewTab === tab ? 'bg-white dark:bg-slate-700 text-[#518231] dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                    >
                      {tab === "kit" ? "UI Elements" : tab === "widgets" ? "Dashboard Cards" : "Alert Dialogs"}
                    </button>
                  ))}
                </div>
              </div>

              {previewTab === "kit" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Buttons */}
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border shadow-sm space-y-3">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Clickable Buttons</span>
                    <div className="flex gap-2">
                      <button 
                        className="flex-1 py-2 text-xs font-bold text-slate-900 bg-white border border-slate-200 rounded-lg"
                        style={mode === "box" ? { boxShadow: compiledShadowProperty } : {}}
                      >
                        Action A
                      </button>
                      <button 
                        className="flex-1 py-2 text-xs font-bold text-white bg-slate-900 dark:bg-slate-700 rounded-lg"
                        style={mode === "box" ? { boxShadow: compiledShadowProperty } : {}}
                      >
                        Action B
                      </button>
                    </div>
                  </div>

                  {/* Input form */}
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border shadow-sm space-y-2">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Form Field Focus</span>
                    <input 
                      type="text" 
                      placeholder="Hover or focus styling..." 
                      className="w-full text-xs py-1.5 px-3 border rounded-lg bg-slate-50 focus:outline-none dark:bg-slate-900"
                      style={mode === "box" ? { boxShadow: compiledShadowProperty } : {}}
                    />
                  </div>
                </div>
              )}

              {previewTab === "widgets" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Metric widget */}
                  <div 
                    className="bg-white dark:bg-slate-800 p-4 rounded-xl border flex flex-col justify-between"
                    style={mode === "box" ? { boxShadow: compiledShadowProperty } : {}}
                  >
                    <span className="text-[9px] text-slate-400 font-bold uppercase">Elevated metric</span>
                    <h5 className="text-lg font-black text-slate-900 dark:text-white mt-1">$48,290.00</h5>
                    <span className="text-[8px] text-green-500 font-semibold mt-1">+14.2% vs last week</span>
                  </div>

                  {/* Dropdown panel popup */}
                  <div 
                    className="bg-white dark:bg-slate-800 p-3 rounded-xl border space-y-1.5"
                    style={mode === "box" ? { boxShadow: compiledShadowProperty } : {}}
                  >
                    <span className="text-[9px] text-slate-400 font-bold uppercase">Overlay Menu</span>
                    {["Profile Preferences", "Account Configurations", "Log out"].map((item, idx) => (
                      <div key={idx} className="text-[10px] py-1 px-2 rounded hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {previewTab === "alerts" && (
                <div className="space-y-3">
                  {/* Alert Modal dialogue box */}
                  <div 
                    className="max-w-md mx-auto bg-white dark:bg-slate-800 p-4 rounded-xl border flex flex-col gap-3"
                    style={mode === "box" ? { boxShadow: compiledShadowProperty } : {}}
                  >
                    <div className="flex gap-2 items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                      <span className="text-xs font-bold">Unsaved changes notification</span>
                    </div>
                    <p className="text-[10px] text-slate-500">
                      You are about to navigate away from the workspace. Would you like to bookmark this shadow configuration before leaving?
                    </p>
                    <div className="flex gap-1.5 justify-end">
                      <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded text-[9px]">Discard</button>
                      <button className="px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded text-[9px]">Save changes</button>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* D. Code Exporters Panel */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code size={16} /> Config Snippet Exporter
              </h3>
              
              <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                {(["css", "tailwind", "scss", "json"] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-1 px-3 text-[10px] font-bold rounded-md capitalize transition-all ${activeTab === tab ? 'bg-white dark:bg-slate-700 text-[#518231] dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    {tab === "css" ? "CSS" : tab === "tailwind" ? "Tailwind" : tab === "scss" ? "SCSS" : "JSON"}
                  </button>
                ))}
              </div>
            </div>

            {/* Exporter code outputs */}
            <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 relative shadow-inner flex flex-col justify-between">
              
              {activeTab === "css" && (
                <div className="space-y-3">
                  <pre className="text-xs text-slate-700 dark:text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap break-all select-all">
                    <code>{cssOutput}</code>
                  </pre>
                  <button
                    onClick={() => handleCopyText(cssOutput)}
                    className="w-full py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    {copiedText ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copiedText ? "Copied CSS!" : "Copy CSS styles"}
                  </button>
                </div>
              )}

              {activeTab === "tailwind" && (
                <div className="space-y-3">
                  <div className="text-[10px] text-slate-400 font-bold mb-1">Tailwind arbitrary class:</div>
                  <pre className="text-xs text-slate-700 dark:text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap break-all select-all">
                    <code>{tailwindOutput}</code>
                  </pre>
                  
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-2 space-y-1">
                    <span className="text-[9px] text-slate-400 font-bold block uppercase">Extend configuration object:</span>
                    <pre className="text-[10px] text-slate-500 overflow-x-auto max-h-24">
                      {`// tailwind.config.js\nboxShadow: {\n  'brand-custom': "${compiledShadowProperty}"\n}`}
                    </pre>
                  </div>

                  <button
                    onClick={() => handleCopyText(tailwindOutput)}
                    className="w-full py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    {copiedText ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copiedText ? "Copied Tailwind!" : "Copy arbitrary utility"}
                  </button>
                </div>
              )}

              {activeTab === "scss" && (
                <div className="space-y-3">
                  <pre className="text-xs text-slate-700 dark:text-slate-300 font-mono overflow-x-auto whitespace-pre-wrap break-all select-all">
                    <code>{scssOutput}</code>
                  </pre>
                  <button
                    onClick={() => handleCopyText(scssOutput)}
                    className="w-full py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    {copiedText ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copiedText ? "Copied SCSS!" : "Copy SCSS variables"}
                  </button>
                </div>
              )}

              {activeTab === "json" && (
                <div className="space-y-3">
                  <pre className="text-[11px] text-slate-700 dark:text-slate-300 font-mono overflow-y-auto max-h-32">
                    <code>{jsonOutput}</code>
                  </pre>
                  <button
                    onClick={() => handleCopyText(jsonOutput)}
                    className="w-full py-1.5 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    {copiedText ? <CheckCircle size={14} /> : <Copy size={14} />}
                    {copiedText ? "Copied JSON!" : "Copy JSON Tokens"}
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* SECTION 2: Presets Library */}
      <section className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="text-amber-500" /> Professional Design Elevation Presets
          </h3>
          <p className="text-xs text-slate-500 mt-1">Select a pre-configured shadow stack to load values instantly.</p>
        </div>

        {mode === "box" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {BOX_PRESETS.map((preset, idx) => {
              const shadowProp = preset.layers.map(l => {
                return `${l.inset ? 'inset ' : ''}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${toRgbaStr(l.color, l.opacity)}`;
              }).join(", ");

              return (
                <button
                  key={idx}
                  onClick={() => loadBoxPreset(preset)}
                  className="group flex flex-col bg-white dark:bg-slate-800 p-2.5 rounded-2xl border text-left hover:scale-[1.02] hover:border-[#518231] transition-all shadow-sm"
                >
                  <div 
                    className="w-full h-16 rounded-xl border border-slate-100 bg-slate-50 dark:bg-slate-900 mb-2 transition-shadow"
                    style={{ boxShadow: shadowProp }}
                  />
                  <span className="text-[10px] font-extrabold text-slate-600 dark:text-slate-300 truncate w-full group-hover:text-[#518231] transition-colors">{preset.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {mode === "text" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TEXT_PRESETS.map((preset, idx) => {
              const shadowProp = preset.layers.map(l => {
                return `${l.x}px ${l.y}px ${l.blur}px ${toRgbaStr(l.color, l.opacity)}`;
              }).join(", ");

              return (
                <button
                  key={idx}
                  onClick={() => loadTextPreset(preset)}
                  className="group flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl border text-left hover:scale-[1.02] hover:border-[#518231] transition-all shadow-sm"
                >
                  <div className="w-full h-12 bg-slate-900 rounded-xl mb-2 flex items-center justify-center overflow-hidden">
                    <span className="text-[14px] font-black text-white" style={{ textShadow: shadowProp }}>Abc</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-600 dark:text-slate-300 truncate w-full group-hover:text-[#518231] transition-colors">{preset.name}</span>
                </button>
              );
            })}
          </div>
        )}

        {mode === "neumorphism" && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { name: "Default Extruded", dist: 8, blur: 16, intensity: 0.15, shape: "flat" },
              { name: "Sunken / Pressed", dist: 6, blur: 12, intensity: 0.18, shape: "pressed" },
              { name: "Concave Swept", dist: 10, blur: 20, intensity: 0.14, shape: "concave" },
              { name: "Convex Rounded", dist: 10, blur: 20, intensity: 0.14, shape: "convex" }
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setNeuDistance(preset.dist);
                  setNeuBlur(preset.blur);
                  setNeuIntensity(preset.intensity);
                  setNeuShape(preset.shape as any);
                  triggerSaveHistory();
                }}
                className="group flex flex-col bg-white dark:bg-slate-800 p-3 rounded-2xl border text-left hover:scale-[1.02] hover:border-[#518231] transition-all shadow-sm"
              >
                <div className="text-[10px] font-bold text-slate-700 dark:text-slate-300 group-hover:text-[#518231] transition-colors">{preset.name}</div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 4: Saved log & favorites */}
      {(recentShadows.length > 0 || favorites.length > 0) && (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Favorites */}
          {favorites.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Star size={16} className="text-yellow-500" /> Bookmarked custom designs
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-48 overflow-y-auto pr-1">
                {favorites.map((fav, i) => (
                  <button
                    key={i}
                    onClick={() => loadSavedShadow(fav)}
                    className="p-2 bg-white dark:bg-slate-800 rounded-xl border text-left space-y-1.5 hover:scale-105 transition-transform"
                  >
                    <span className="text-[10px] font-bold text-slate-500 truncate block">{fav.name}</span>
                    <span className="text-[8px] text-slate-400 uppercase font-bold block">{fav.mode} shadow</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* History */}
          {recentShadows.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-900/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <RefreshCw size={14} /> Recent custom shadows
                </h3>
                <button
                  onClick={clearHistory}
                  className="text-[10px] text-red-500 hover:underline"
                >
                  Clear log
                </button>
              </div>

              <div className="grid grid-cols-3 gap-3 max-h-48 overflow-y-auto pr-1">
                {recentShadows.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => loadSavedShadow(item)}
                    className="p-2 bg-white dark:bg-slate-800 rounded-xl border flex flex-col gap-1 hover:scale-105 transition-transform text-left"
                  >
                    <span className="text-[9px] font-bold text-slate-600 truncate">{item.name}</span>
                    <span className="text-[8px] text-slate-400 uppercase font-bold">{item.mode}</span>
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
