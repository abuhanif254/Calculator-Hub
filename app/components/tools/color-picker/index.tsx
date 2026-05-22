"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Copy, Download, RefreshCw, Plus, Trash2, CheckCircle, Shield, Sparkles, Sliders, Contrast, Compass, Palette, Check } from "lucide-react";
import { Link } from "../../../../i18n/routing";
import { addToHistory as addToGlobalHistory } from "../../../../lib/hooks/useToolHistory";

// --- Color Conversion Math Utilities ---

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

export function hsvToRgb(h: number, s: number, v: number) {
  h = ((h % 360) + 360) % 360;
  const sFraction = clamp(s, 0, 100) / 100;
  const vFraction = clamp(v, 0, 100) / 100;

  const c = vFraction * sFraction;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = vFraction - c;

  let rPrime = 0, gPrime = 0, bPrime = 0;
  if (h >= 0 && h < 60) {
    rPrime = c; gPrime = x; bPrime = 0;
  } else if (h >= 60 && h < 120) {
    rPrime = x; gPrime = c; bPrime = 0;
  } else if (h >= 120 && h < 180) {
    rPrime = 0; gPrime = c; bPrime = x;
  } else if (h >= 180 && h < 240) {
    rPrime = 0; gPrime = x; bPrime = c;
  } else if (h >= 240 && h < 300) {
    rPrime = x; gPrime = 0; bPrime = c;
  } else if (h >= 300 && h < 360) {
    rPrime = c; gPrime = 0; bPrime = x;
  }

  return {
    r: Math.round((rPrime + m) * 255),
    g: Math.round((gPrime + m) * 255),
    b: Math.round((bPrime + m) * 255),
  };
}

export function rgbToHsv(r: number, g: number, b: number) {
  r = clamp(r, 0, 255) / 255;
  g = clamp(g, 0, 255) / 255;
  b = clamp(b, 0, 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const diff = max - min;

  let h = 0;
  if (diff === 0) {
    h = 0;
  } else if (max === r) {
    h = (60 * ((g - b) / diff) + 360) % 360;
  } else if (max === g) {
    h = (60 * ((b - r) / diff) + 120) % 360;
  } else if (max === b) {
    h = (60 * ((r - g) / diff) + 240) % 360;
  }

  const s = max === 0 ? 0 : (diff / max) * 100;
  const v = max * 100;

  return { h: Math.round(h), s: Math.round(s), v: Math.round(v) };
}

export function hsvToHsl(h: number, s: number, v: number) {
  const sFraction = clamp(s, 0, 100) / 100;
  const vFraction = clamp(v, 0, 100) / 100;

  const lFraction = vFraction * (1 - sFraction / 2);
  let sHsl = 0;
  if (lFraction > 0 && lFraction < 1) {
    sHsl = (vFraction - lFraction) / Math.min(lFraction, 1 - lFraction);
  }

  return {
    h: Math.round(h),
    s: Math.round(sHsl * 100),
    l: Math.round(lFraction * 100),
  };
}

export function hslToHsv(h: number, s: number, l: number) {
  const sFraction = clamp(s, 0, 100) / 100;
  const lFraction = clamp(l, 0, 100) / 100;

  const vFraction = lFraction + sFraction * Math.min(lFraction, 1 - lFraction);
  const sHsv = vFraction === 0 ? 0 : 2 * (1 - lFraction / vFraction);

  return {
    h: Math.round(h),
    s: Math.round(sHsv * 100),
    v: Math.round(vFraction * 100),
  };
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (val: number) => {
    const hex = clamp(val, 0, 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbaToHexa(r: number, g: number, b: number, a: number): string {
  const toHex = (val: number) => {
    const hex = clamp(val, 0, 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  const alphaHex = Math.round(clamp(a, 0, 1) * 255).toString(16);
  const formattedAlpha = alphaHex.length === 1 ? "0" + alphaHex : alphaHex;
  return `#${toHex(r)}${toHex(g)}${toHex(b)}${formattedAlpha}`;
}

export function parseColor(str: string): { h: number; s: number; v: number; a: number } | null {
  const cleaned = str.trim().toLowerCase();

  // HEX / HEXA format
  if (cleaned.startsWith("#") || /^[0-9a-fA-F]{3,8}$/.test(cleaned)) {
    let hex = cleaned.startsWith("#") ? cleaned.slice(1) : cleaned;
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
      const hsv = rgbToHsv(r, g, b);
      return { ...hsv, a: 1 };
    } else if (hex.length === 8) {
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const a = parseInt(hex.slice(6, 8), 16) / 255;
      if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) return null;
      const hsv = rgbToHsv(r, g, b);
      return { ...hsv, a: Number(a.toFixed(2)) };
    }
    return null;
  }

  // RGB / RGBA standard comma-separated format
  const rgbRegex = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([\d\.]+)\s*)?\)$/;
  const rgbMatch = cleaned.match(rgbRegex);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1], 10);
    const g = parseInt(rgbMatch[2], 10);
    const b = parseInt(rgbMatch[3], 10);
    const a = rgbMatch[4] !== undefined ? parseFloat(rgbMatch[4]) : 1;
    if (r <= 255 && g <= 255 && b <= 255 && a >= 0 && a <= 1) {
      const hsv = rgbToHsv(r, g, b);
      return { ...hsv, a };
    }
  }

  // Space separated RGB: rgb(255 0 0 / 0.5) or rgb(255 0 0)
  const rgbSpaceRegex = /^rgba?\(\s*(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s*(?:\/\s*([\d\.]+)\s*)?\)$/;
  const rgbSpaceMatch = cleaned.match(rgbSpaceRegex);
  if (rgbSpaceMatch) {
    const r = parseInt(rgbSpaceMatch[1], 10);
    const g = parseInt(rgbSpaceMatch[2], 10);
    const b = parseInt(rgbSpaceMatch[3], 10);
    const a = rgbSpaceMatch[4] !== undefined ? parseFloat(rgbSpaceMatch[4]) : 1;
    if (r <= 255 && g <= 255 && b <= 255 && a >= 0 && a <= 1) {
      const hsv = rgbToHsv(r, g, b);
      return { ...hsv, a };
    }
  }

  // HSL / HSLA standard comma-separated format
  const hslRegex = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*([\d\.]+)\s*)?\)$/;
  const hslMatch = cleaned.match(hslRegex);
  if (hslMatch) {
    const h = parseInt(hslMatch[1], 10);
    const s = parseInt(hslMatch[2], 10);
    const l = parseInt(hslMatch[3], 10);
    const a = hslMatch[4] !== undefined ? parseFloat(hslMatch[4]) : 1;
    if (h <= 360 && s <= 100 && l <= 100 && a >= 0 && a <= 1) {
      const hsv = hslToHsv(h, s, l);
      return { ...hsv, a };
    }
  }

  // Space separated HSL: hsl(200 50% 50% / 0.5) or hsl(200 50% 50%)
  const hslSpaceRegex = /^hsla?\(\s*(\d{1,3})\s+(\d{1,3})%\s+(\d{1,3})%\s*(?:\/\s*([\d\.]+)\s*)?\)$/;
  const hslSpaceMatch = cleaned.match(hslSpaceRegex);
  if (hslSpaceMatch) {
    const h = parseInt(hslSpaceMatch[1], 10);
    const s = parseInt(hslSpaceMatch[2], 10);
    const l = parseInt(hslSpaceMatch[3], 10);
    const a = hslSpaceMatch[4] !== undefined ? parseFloat(hslSpaceMatch[4]) : 1;
    if (h <= 360 && s <= 100 && l <= 100 && a >= 0 && a <= 1) {
      const hsv = hslToHsv(h, s, l);
      return { ...hsv, a };
    }
  }

  // HSV / HSVA format
  const hsvRegex = /^hsva?\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*(?:,\s*([\d\.]+)\s*)?\)$/;
  const hsvMatch = cleaned.match(hsvRegex);
  if (hsvMatch) {
    const h = parseInt(hsvMatch[1], 10);
    const s = parseInt(hsvMatch[2], 10);
    const v = parseInt(hsvMatch[3], 10);
    const a = hsvMatch[4] !== undefined ? parseFloat(hsvMatch[4]) : 1;
    if (h <= 360 && s <= 100 && v <= 100 && a >= 0 && a <= 1) {
      return { h, s, v, a };
    }
  }

  return null;
}

// --- WCAG Contrast Checker Math Utilities ---

export function getRelativeLuminance(r: number, g: number, b: number): number {
  const transform = (val: number) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

export function getContrastRatio(color1: { r: number; g: number; b: number }, color2: { r: number; g: number; b: number }): number {
  const l1 = getRelativeLuminance(color1.r, color1.g, color1.b);
  const l2 = getRelativeLuminance(color2.r, color2.g, color2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Checkerboard Inline SVG Background style helper
const checkerboardStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Crect width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23ffffff'/%3E%3Crect x='4' width='4' height='4' fill='%23e2e8f0'/%3E%3Crect y='4' width='4' height='4' fill='%23e2e8f0'/%3E%3C/svg%3E")`,
};

export function ColorPickerTool() {
  const [mounted, setMounted] = useState(false);

  // Core HSVa Color State
  const [color, setColor] = useState({ h: 200, s: 80, v: 75, a: 1.0 });

  // Secondary Color State for Gradient (Default to Complementary Hue of main color)
  const [secondaryColor, setSecondaryColor] = useState({ h: 20, s: 80, v: 75, a: 1.0 });
  const [gradientAngle, setGradientAngle] = useState(135);
  const [isGradientSync, setIsGradientSync] = useState(true);

  // UI Form Input string states
  const [hexInput, setHexInput] = useState("#2673bf");
  
  // RGB states
  const [rInput, setRInput] = useState("38");
  const [gInput, setGInput] = useState("115");
  const [bInput, setBInput] = useState("191");
  const [aRgbInput, setARgbInput] = useState("1");

  // HSL states
  const [hInput, setHInput] = useState("210");
  const [sInput, setSInput] = useState("67");
  const [lInput, setLInput] = useState("45");
  const [aHslInput, setAHslInput] = useState("1");

  // HSV states
  const [hHsvInput, setHHsvInput] = useState("210");
  const [sHsvInput, setSHsvInput] = useState("80");
  const [vHsvInput, setVHsvInput] = useState("75");
  const [aHsvInput, setAHsvInput] = useState("1");

  // Input Focus Lock state
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Tab systems
  const [activeTab, setActiveTab] = useState<"harmonies" | "gradient" | "export">("harmonies");
  const [activeHarmonyTab, setActiveHarmonyTab] = useState<"complementary" | "analogous" | "triadic" | "split" | "monochromatic">("complementary");

  // Copy success types for quick visual flashes
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Editable WCAG compliance tester texts
  const [wcagText, setWcagText] = useState("Interactive Accessibility Preview text.");

  // Local storage recent colors state
  const [recentColors, setRecentColors] = useState<string[]>([]);

  // DOM Elements refs
  const canvasRef = useRef<HTMLDivElement>(null);

  // Trigger page views
  useEffect(() => {
    setMounted(true);
    addToGlobalHistory({ slug: "color-picker", title: "Color Picker Tool", type: "tool" });

    // Load recent colors from LocalStorage
    const saved = localStorage.getItem("nexus_color_picker_history");
    if (saved) {
      try {
        setRecentColors(JSON.parse(saved));
      } catch {
        // Keep defaults
      }
    } else {
      const defaultPalette = ["#518231", "#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#6366f1", "#14b8a6", "#f43f5e", "#06b6d4", "#84cc16"];
      setRecentColors(defaultPalette);
      localStorage.setItem("nexus_color_picker_history", JSON.stringify(defaultPalette));
    }
  }, []);

  // Synchronize secondary color if sync complement is enabled
  useEffect(() => {
    if (isGradientSync) {
      setSecondaryColor({
        h: (color.h + 180) % 360,
        s: color.s,
        v: color.v,
        a: color.a,
      });
    }
  }, [color, isGradientSync]);

  // Derived values from main color
  const rgb = useMemo(() => hsvToRgb(color.h, color.s, color.v), [color]);
  const hsl = useMemo(() => hsvToHsl(color.h, color.s, color.v), [color]);
  const hex = useMemo(() => rgbToHex(rgb.r, rgb.g, rgb.b), [rgb]);
  const hexa = useMemo(() => rgbaToHexa(rgb.r, rgb.g, rgb.b, color.a), [rgb, color.a]);

  // Derived values for secondary gradient color
  const secondaryRgb = useMemo(() => hsvToRgb(secondaryColor.h, secondaryColor.s, secondaryColor.v), [secondaryColor]);
  const secondaryHex = useMemo(() => rgbToHex(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b), [secondaryRgb]);
  const secondaryHexa = useMemo(() => rgbaToHexa(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b, secondaryColor.a), [secondaryRgb, secondaryColor.a]);

  // Synchronize Form Textbox inputs based on primary HSV change, keeping current user input focused values intact
  useEffect(() => {
    if (focusedInput === "hex") return;
    setHexInput(color.a === 1 ? hex : hexa);
  }, [hex, hexa, color.a, focusedInput]);

  useEffect(() => {
    if (focusedInput?.startsWith("rgb-")) return;
    setRInput(rgb.r.toString());
    setGInput(rgb.g.toString());
    setBInput(rgb.b.toString());
    setARgbInput(color.a.toString());
  }, [rgb, color.a, focusedInput]);

  useEffect(() => {
    if (focusedInput?.startsWith("hsl-")) return;
    setHInput(hsl.h.toString());
    setSInput(hsl.s.toString());
    setLInput(hsl.l.toString());
    setAHslInput(color.a.toString());
  }, [hsl, color.a, focusedInput]);

  useEffect(() => {
    if (focusedInput?.startsWith("hsv-")) return;
    setHHsvInput(color.h.toString());
    setSHsvInput(color.s.toString());
    setVHsvInput(color.v.toString());
    setAHsvInput(color.a.toString());
  }, [color, focusedInput]);

  // WCAG Relative luminance details
  const wcagStats = useMemo(() => {
    const ratioWhite = getContrastRatio({ r: 255, g: 255, b: 255 }, rgb);
    const ratioBlack = getContrastRatio({ r: 0, g: 0, b: 0 }, rgb);
    return {
      white: {
        ratio: Number(ratioWhite.toFixed(2)),
        aaNormal: ratioWhite >= 4.5,
        aaaNormal: ratioWhite >= 7.0,
        aaLarge: ratioWhite >= 3.0,
        aaaLarge: ratioWhite >= 4.5,
      },
      black: {
        ratio: Number(ratioBlack.toFixed(2)),
        aaNormal: ratioBlack >= 4.5,
        aaaNormal: ratioBlack >= 7.0,
        aaLarge: ratioBlack >= 3.0,
        aaaLarge: ratioBlack >= 4.5,
      },
    };
  }, [rgb]);

  // Harmonies List calculations
  const harmonies = useMemo(() => {
    const compH = (color.h + 180) % 360;
    const comp = [
      hex,
      rgbToHex(hsvToRgb(compH, color.s, color.v).r, hsvToRgb(compH, color.s, color.v).g, hsvToRgb(compH, color.s, color.v).b),
    ];

    const anal1 = (color.h - 30 + 360) % 360;
    const anal2 = (color.h + 30) % 360;
    const analogous = [
      rgbToHex(hsvToRgb(anal1, color.s, color.v).r, hsvToRgb(anal1, color.s, color.v).g, hsvToRgb(anal1, color.s, color.v).b),
      hex,
      rgbToHex(hsvToRgb(anal2, color.s, color.v).r, hsvToRgb(anal2, color.s, color.v).g, hsvToRgb(anal2, color.s, color.v).b),
    ];

    const tri1 = (color.h + 120) % 360;
    const tri2 = (color.h + 240) % 360;
    const triadic = [
      hex,
      rgbToHex(hsvToRgb(tri1, color.s, color.v).r, hsvToRgb(tri1, color.s, color.v).g, hsvToRgb(tri1, color.s, color.v).b),
      rgbToHex(hsvToRgb(tri2, color.s, color.v).r, hsvToRgb(tri2, color.s, color.v).g, hsvToRgb(tri2, color.s, color.v).b),
    ];

    const split1 = (color.h + 150) % 360;
    const split2 = (color.h + 210) % 360;
    const split = [
      hex,
      rgbToHex(hsvToRgb(split1, color.s, color.v).r, hsvToRgb(split1, color.s, color.v).g, hsvToRgb(split1, color.s, color.v).b),
      rgbToHex(hsvToRgb(split2, color.s, color.v).r, hsvToRgb(split2, color.s, color.v).g, hsvToRgb(split2, color.s, color.v).b),
    ];

    // Monochromatic (Shifting Lightness values)
    const baseHsl = hsvToHsl(color.h, color.s, color.v);
    const monoLightness = [
      clamp(baseHsl.l - 30, 5, 95),
      clamp(baseHsl.l - 15, 5, 95),
      baseHsl.l,
      clamp(baseHsl.l + 15, 5, 95),
      clamp(baseHsl.l + 30, 5, 95),
    ];
    const monochromatic = monoLightness.map((l) => {
      const hsvTemp = hslToHsv(baseHsl.h, baseHsl.s, l);
      const rgbTemp = hsvToRgb(hsvTemp.h, hsvTemp.s, hsvTemp.v);
      return rgbToHex(rgbTemp.r, rgbTemp.g, rgbTemp.b);
    });

    return { complementary: comp, analogous, triadic, split, monochromatic };
  }, [color, hex]);

  // Pointer drag updates on 2D saturation/brightness field
  const updateFromPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = clamp(e.clientX - rect.left, 0, rect.width);
    const y = clamp(e.clientY - rect.top, 0, rect.height);

    const s = Math.round((x / rect.width) * 100);
    const v = Math.round((1 - y / rect.height) * 100);
    setColor((prev) => ({ ...prev, s, v }));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromPointer(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      updateFromPointer(e);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.releasePointerCapture(e.pointerId);
    triggerSaveHistory();
  };

  // Add the current color to LocalStorage history
  const triggerSaveHistory = () => {
    const formattedHex = color.a === 1 ? hex : hexa;
    setRecentColors((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== formattedHex.toLowerCase());
      const updated = [formattedHex, ...filtered].slice(0, 18);
      localStorage.setItem("nexus_color_picker_history", JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setRecentColors([]);
    localStorage.removeItem("nexus_color_picker_history");
  };

  // Set picker color helper
  const handleSelectColor = (clrStr: string) => {
    const parsed = parseColor(clrStr);
    if (parsed) {
      setColor(parsed);
    }
  };

  // Clipboard Copier handler
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    });
  };

  // Download color scheme JSON file
  const handleDownloadJson = () => {
    const colorProfile = {
      name: "Nexus Color Scheme Spec",
      hex,
      hexa,
      rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${color.a})`,
      hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${color.a})`,
      hsv: `hsv(${color.h}, ${color.s}%, ${color.v}%)`,
      accessibility: {
        wcagContrastRatioWhiteText: wcagStats.white.ratio,
        wcagContrastRatioBlackText: wcagStats.black.ratio,
      },
      harmonies: {
        complementary: harmonies.complementary,
        analogous: harmonies.analogous,
        triadic: harmonies.triadic,
        splitComplementary: harmonies.split,
        monochromatic: harmonies.monochromatic,
      },
      gradient: {
        angle: gradientAngle,
        secondaryHexa,
        cssString: `linear-gradient(${gradientAngle}deg, ${hexa} 0%, ${secondaryHexa} 100%)`,
      },
    };

    const blob = new Blob([JSON.stringify(colorProfile, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `nexus-palette-${hex.replace("#", "")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Input Field validation and parsing
  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setHexInput(val);
    const parsed = parseColor(val);
    if (parsed) {
      setColor(parsed);
    }
  };

  const handleRgbFieldChange = (channel: "r" | "g" | "b" | "a", valStr: string) => {
    if (channel === "r") setRInput(valStr);
    if (channel === "g") setGInput(valStr);
    if (channel === "b") setBInput(valStr);
    if (channel === "a") setARgbInput(valStr);

    const val = parseFloat(valStr);
    if (isNaN(val)) return;

    const r = channel === "r" ? clamp(Math.round(val), 0, 255) : rgb.r;
    const g = channel === "g" ? clamp(Math.round(val), 0, 255) : rgb.g;
    const b = channel === "b" ? clamp(Math.round(val), 0, 255) : rgb.b;
    const a = channel === "a" ? clamp(val, 0, 1) : color.a;

    const hsv = rgbToHsv(r, g, b);
    setColor({ ...hsv, a });
  };

  const handleHslFieldChange = (channel: "h" | "s" | "l" | "a", valStr: string) => {
    if (channel === "h") setHInput(valStr);
    if (channel === "s") setSInput(valStr);
    if (channel === "l") setLInput(valStr);
    if (channel === "a") setAHslInput(valStr);

    const val = parseFloat(valStr);
    if (isNaN(val)) return;

    const h = channel === "h" ? clamp(Math.round(val), 0, 360) : hsl.h;
    const s = channel === "s" ? clamp(Math.round(val), 0, 100) : hsl.s;
    const l = channel === "l" ? clamp(Math.round(val), 0, 100) : hsl.l;
    const a = channel === "a" ? clamp(val, 0, 1) : color.a;

    const hsv = hslToHsv(h, s, l);
    setColor({ ...hsv, a });
  };

  const handleHsvFieldChange = (channel: "h" | "s" | "v" | "a", valStr: string) => {
    if (channel === "h") setHHsvInput(valStr);
    if (channel === "s") setSHsvInput(valStr);
    if (channel === "v") setVHsvInput(valStr);
    if (channel === "a") setAHsvInput(valStr);

    const val = parseFloat(valStr);
    if (isNaN(val)) return;

    const h = channel === "h" ? clamp(Math.round(val), 0, 360) : color.h;
    const s = channel === "s" ? clamp(Math.round(val), 0, 100) : color.s;
    const v = channel === "v" ? clamp(Math.round(val), 0, 100) : color.v;
    const a = channel === "a" ? clamp(val, 0, 1) : color.a;

    setColor({ h, s, v, a });
  };

  // Avoid SSR hydration warning flash
  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-500">
        <RefreshCw size={24} className="animate-spin mr-2" /> Loading color workspace...
      </div>
    );
  }

  // Pre-calculated variables
  const primaryRgbaStr = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${color.a})`;
  const secondaryRgbaStr = `rgba(${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}, ${secondaryColor.a})`;
  const gradientCssCode = `background: linear-gradient(${gradientAngle}deg, ${primaryRgbaStr} 0%, ${secondaryRgbaStr} 100%);`;

  return (
    <div className="w-full flex flex-col gap-8 text-slate-800 dark:text-slate-200">
      
      {/* SECTION 1: Dynamic Interface Picker Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Spectrums Canvas & Opacity Control (7/12) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-slate-50 dark:bg-slate-900/40 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            
            {/* The 2D Saturation-Brightness Field */}
            <div
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="w-full h-64 sm:h-80 relative rounded-xl overflow-hidden cursor-crosshair select-none touch-none"
              style={{
                backgroundColor: `hsl(${color.h}, 100%, 50%)`,
              }}
            >
              {/* White Overlay (X-Axis saturation) */}
              <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
              {/* Black Overlay (Y-Axis brightness) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
              
              {/* Cursor handle indicator */}
              <div
                className="w-5 h-5 rounded-full border-2 border-white shadow-[0_0_5px_rgba(0,0,0,0.6)] absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                style={{
                  left: `${color.s}%`,
                  top: `${100 - color.v}%`,
                  backgroundColor: hexa,
                }}
              />
            </div>

            {/* Slider tracks (Hue, Alpha) */}
            <div className="space-y-4 pt-2">
              {/* Hue spectrum track */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                  <label htmlFor="hue-slider">Hue ({color.h}°)</label>
                  <span>360°</span>
                </div>
                <input
                  id="hue-slider"
                  type="range"
                  min="0"
                  max="360"
                  value={color.h}
                  onChange={(e) => setColor((prev) => ({ ...prev, h: parseInt(e.target.value, 10) }))}
                  onMouseUp={triggerSaveHistory}
                  onTouchEnd={triggerSaveHistory}
                  className="w-full h-3 rounded-lg appearance-none cursor-pointer focus:outline-none 
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-800 [&::-webkit-slider-thumb]:shadow
                    [&::-moz-range-thumb]:w-4.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-slate-800 [&::-moz-range-thumb]:shadow"
                  style={{
                    background: "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
                  }}
                />
              </div>

              {/* Alpha checkerboard opacity track */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
                  <label htmlFor="alpha-slider">Alpha / Opacity ({Math.round(color.a * 100)}%)</label>
                  <span>1.0</span>
                </div>
                <div className="w-full h-3 rounded-lg relative overflow-hidden">
                  {/* Checkerboard container */}
                  <div className="absolute inset-0 z-0 rounded-lg" style={checkerboardStyle} />
                  {/* Linear gradient color overlay and real slider */}
                  <input
                    id="alpha-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={color.a}
                    onChange={(e) => setColor((prev) => ({ ...prev, a: parseFloat(e.target.value) }))}
                    onMouseUp={triggerSaveHistory}
                    onTouchEnd={triggerSaveHistory}
                    className="w-full h-3 rounded-lg appearance-none cursor-pointer focus:outline-none absolute inset-0 z-10 bg-transparent
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4.5 [&::-webkit-slider-thumb]:h-4.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-800 [&::-webkit-slider-thumb]:shadow
                      [&::-moz-range-thumb]:w-4.5 [&::-moz-range-thumb]:h-4.5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-slate-800 [&::-moz-range-thumb]:shadow"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0), rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1))`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Code Formats & Color Workspace Settings (5/12) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          {/* Main Visual Display Shield */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-20 h-20 rounded-xl relative shrink-0 overflow-hidden shadow-inner border border-slate-200 dark:border-slate-800" style={checkerboardStyle}>
              <div className="absolute inset-0" style={{ backgroundColor: hexa }} />
            </div>
            <div className="flex-1 w-full text-center sm:text-left space-y-1">
              <div className="font-mono text-2xl font-black tracking-wide text-slate-900 dark:text-white uppercase select-all">
                {color.a === 1 ? hex : hexa}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                {primaryRgbaStr}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                {`hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${color.a})`}
              </div>
            </div>
            <div className="flex sm:flex-col gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={() => handleCopy(color.a === 1 ? hex : hexa, "main")}
                className="flex-1 sm:flex-initial px-3 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                {copiedType === "main" ? <CheckCircle size={14} className="text-white" /> : <Copy size={14} />}
                {copiedType === "main" ? "Copied!" : "Copy Code"}
              </button>
              <button
                onClick={triggerSaveHistory}
                className="flex-1 sm:flex-initial px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <Plus size={14} /> Add Swatch
              </button>
            </div>
          </div>

          {/* Form inputs workspace */}
          <div className="bg-slate-50 dark:bg-slate-900/40 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            
            {/* HEX String format */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                <label htmlFor="hex-input">HEX / HEXA</label>
                <button
                  onClick={() => handleCopy(hexInput, "hex")}
                  className="text-slate-400 hover:text-[#518231] transition-colors"
                  title="Copy Hex"
                >
                  {copiedType === "hex" ? <Check size={12} className="text-[#518231]" /> : <Copy size={12} />}
                </button>
              </div>
              <input
                id="hex-input"
                type="text"
                value={hexInput}
                onChange={handleHexInputChange}
                onFocus={() => setFocusedInput("hex")}
                onBlur={() => setFocusedInput(null)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-sm uppercase focus:outline-none focus:ring-1 focus:ring-[#518231] dark:text-white"
              />
            </div>

            {/* RGB Channels format */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                <span>RGB / RGBA</span>
                <button
                  onClick={() => handleCopy(primaryRgbaStr, "rgba")}
                  className="text-slate-400 hover:text-[#518231] transition-colors"
                  title="Copy RGBA"
                >
                  {copiedType === "rgba" ? <Check size={12} className="text-[#518231]" /> : <Copy size={12} />}
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="space-y-1">
                  <input
                    aria-label="Red"
                    type="number"
                    min="0"
                    max="255"
                    value={rInput}
                    onChange={(e) => handleRgbFieldChange("r", e.target.value)}
                    onFocus={() => setFocusedInput("rgb-r")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  />
                  <div className="text-[10px] text-center text-slate-400 font-bold uppercase">R</div>
                </div>
                <div className="space-y-1">
                  <input
                    aria-label="Green"
                    type="number"
                    min="0"
                    max="255"
                    value={gInput}
                    onChange={(e) => handleRgbFieldChange("g", e.target.value)}
                    onFocus={() => setFocusedInput("rgb-g")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  />
                  <div className="text-[10px] text-center text-slate-400 font-bold uppercase">G</div>
                </div>
                <div className="space-y-1">
                  <input
                    aria-label="Blue"
                    type="number"
                    min="0"
                    max="255"
                    value={bInput}
                    onChange={(e) => handleRgbFieldChange("b", e.target.value)}
                    onFocus={() => setFocusedInput("rgb-b")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  />
                  <div className="text-[10px] text-center text-slate-400 font-bold uppercase">B</div>
                </div>
                <div className="space-y-1">
                  <input
                    aria-label="Alpha"
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={aRgbInput}
                    onChange={(e) => handleRgbFieldChange("a", e.target.value)}
                    onFocus={() => setFocusedInput("rgb-a")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  />
                  <div className="text-[10px] text-center text-slate-400 font-bold uppercase">A</div>
                </div>
              </div>
            </div>

            {/* HSL Channels format */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                <span>HSL / HSLA</span>
                <button
                  onClick={() => handleCopy(`hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${color.a})`, "hsla")}
                  className="text-slate-400 hover:text-[#518231] transition-colors"
                  title="Copy HSLA"
                >
                  {copiedType === "hsla" ? <Check size={12} className="text-[#518231]" /> : <Copy size={12} />}
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="space-y-1">
                  <input
                    aria-label="Hue HSL"
                    type="number"
                    min="0"
                    max="360"
                    value={hInput}
                    onChange={(e) => handleHslFieldChange("h", e.target.value)}
                    onFocus={() => setFocusedInput("hsl-h")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  />
                  <div className="text-[10px] text-center text-slate-400 font-bold uppercase">H (°)</div>
                </div>
                <div className="space-y-1">
                  <input
                    aria-label="Saturation HSL"
                    type="number"
                    min="0"
                    max="100"
                    value={sInput}
                    onChange={(e) => handleHslFieldChange("s", e.target.value)}
                    onFocus={() => setFocusedInput("hsl-s")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  />
                  <div className="text-[10px] text-center text-slate-400 font-bold uppercase">S (%)</div>
                </div>
                <div className="space-y-1">
                  <input
                    aria-label="Lightness HSL"
                    type="number"
                    min="0"
                    max="100"
                    value={lInput}
                    onChange={(e) => handleHslFieldChange("l", e.target.value)}
                    onFocus={() => setFocusedInput("hsl-l")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  />
                  <div className="text-[10px] text-center text-slate-400 font-bold uppercase">L (%)</div>
                </div>
                <div className="space-y-1">
                  <input
                    aria-label="Alpha HSL"
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={aHslInput}
                    onChange={(e) => handleHslFieldChange("a", e.target.value)}
                    onFocus={() => setFocusedInput("hsl-a")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  />
                  <div className="text-[10px] text-center text-slate-400 font-bold uppercase">A</div>
                </div>
              </div>
            </div>

            {/* HSV Channels format */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                <span>HSV / HSVB</span>
                <button
                  onClick={() => handleCopy(`hsva(${color.h}, ${color.s}%, ${color.v}%, ${color.a})`, "hsva")}
                  className="text-slate-400 hover:text-[#518231] transition-colors"
                  title="Copy HSVA"
                >
                  {copiedType === "hsva" ? <Check size={12} className="text-[#518231]" /> : <Copy size={12} />}
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <div className="space-y-1">
                  <input
                    aria-label="Hue HSV"
                    type="number"
                    min="0"
                    max="360"
                    value={hHsvInput}
                    onChange={(e) => handleHsvFieldChange("h", e.target.value)}
                    onFocus={() => setFocusedInput("hsv-h")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  />
                  <div className="text-[10px] text-center text-slate-400 font-bold uppercase">H (°)</div>
                </div>
                <div className="space-y-1">
                  <input
                    aria-label="Saturation HSV"
                    type="number"
                    min="0"
                    max="100"
                    value={sHsvInput}
                    onChange={(e) => handleHsvFieldChange("s", e.target.value)}
                    onFocus={() => setFocusedInput("hsv-s")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  />
                  <div className="text-[10px] text-center text-slate-400 font-bold uppercase">S (%)</div>
                </div>
                <div className="space-y-1">
                  <input
                    aria-label="Value HSV"
                    type="number"
                    min="0"
                    max="100"
                    value={vHsvInput}
                    onChange={(e) => handleHsvFieldChange("v", e.target.value)}
                    onFocus={() => setFocusedInput("hsv-v")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  />
                  <div className="text-[10px] text-center text-slate-400 font-bold uppercase">V (%)</div>
                </div>
                <div className="space-y-1">
                  <input
                    aria-label="Alpha HSV"
                    type="number"
                    min="0"
                    max="1"
                    step="0.1"
                    value={aHsvInput}
                    onChange={(e) => handleHsvFieldChange("a", e.target.value)}
                    onFocus={() => setFocusedInput("hsv-a")}
                    onBlur={() => setFocusedInput(null)}
                    className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md font-mono text-xs text-center focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  />
                  <div className="text-[10px] text-center text-slate-400 font-bold uppercase">A</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* SECTION 2: Recent Colors History Palette */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="text-[#518231]" size={20} /> Recent Colors History
          </h3>
          {recentColors.length > 0 && (
            <button
              onClick={clearHistory}
              className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors flex items-center gap-1"
            >
              <Trash2 size={14} /> Clear History
            </button>
          )}
        </div>
        
        {recentColors.length === 0 ? (
          <div className="text-sm text-slate-400 py-4 text-center">No colors in history yet. Add some swatches above!</div>
        ) : (
          <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 gap-3">
            {recentColors.map((clr, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectColor(clr)}
                className="group relative aspect-square w-full rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden hover:scale-105 hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-[#518231]"
                style={checkerboardStyle}
                title={clr}
              >
                {/* Visual Color Layer */}
                <div className="absolute inset-0" style={{ backgroundColor: clr }} />
                {/* Visual active border */}
                {clr.toLowerCase() === (color.a === 1 ? hex : hexa).toLowerCase() && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                    <Check size={16} className="text-white drop-shadow" />
                  </div>
                )}
                
                {/* Floating tooltip */}
                <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover:block z-20 px-2 py-0.5 text-[10px] font-mono font-bold bg-slate-900 text-white rounded shadow-md whitespace-nowrap uppercase">
                  {clr}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* SECTION 3: WCAG Accessibility Contrast Checker */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Contrast className="text-[#518231]" size={20} /> WCAG 2.1 Contrast Checker
            </h3>
            <p className="text-xs text-slate-500">
              Evaluates contrast ratio of text overlaying the selected background color.
            </p>
          </div>
          
          {/* Compliance targets Info Box */}
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-slate-600 dark:text-slate-300">
              Pass AA: &ge; 4.5
            </span>
            <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded font-semibold text-slate-600 dark:text-slate-300">
              Pass AAA: &ge; 7.0
            </span>
          </div>
        </div>

        {/* Accessibility workspace columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card A: WHITE TEXT preview card */}
          <div className="border border-slate-150 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-150 dark:border-slate-800 flex justify-between items-center">
              <span className="font-bold text-sm text-slate-700 dark:text-slate-300">White Text on Background</span>
              <span className="font-mono text-base font-extrabold text-slate-800 dark:text-white">
                {wcagStats.white.ratio}:1
              </span>
            </div>
            
            {/* The Live Interactive preview container */}
            <div
              className="flex-1 p-6 flex flex-col justify-center min-h-36 text-white"
              style={{ backgroundColor: hex }}
            >
              <input
                type="text"
                value={wcagText}
                onChange={(e) => setWcagText(e.target.value)}
                className="bg-transparent border-b border-white/20 focus:border-white/70 focus:outline-none text-base font-medium placeholder-white/50 w-full mb-3 pb-1"
                title="White Text Preview Input"
              />
              <div className="text-2xl font-black tracking-tight leading-none mb-1">
                Large Bold Text (18pt+)
              </div>
              <div className="text-sm opacity-90 leading-relaxed font-normal">
                Standard Body Text (14pt)
              </div>
            </div>

            {/* Badges container */}
            <div className="p-4 bg-slate-50 dark:bg-slate-850/80 border-t border-slate-150 dark:border-slate-800 flex flex-wrap gap-2">
              <div className={`px-2.5 py-1 text-2xs font-bold rounded flex items-center gap-1 ${wcagStats.white.aaNormal ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}>
                Normal Text (AA) {wcagStats.white.aaNormal ? "Pass" : "Fail"}
              </div>
              <div className={`px-2.5 py-1 text-2xs font-bold rounded flex items-center gap-1 ${wcagStats.white.aaaNormal ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}>
                Normal Text (AAA) {wcagStats.white.aaaNormal ? "Pass" : "Fail"}
              </div>
              <div className={`px-2.5 py-1 text-2xs font-bold rounded flex items-center gap-1 ${wcagStats.white.aaLarge ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}>
                Large Text (AA) {wcagStats.white.aaLarge ? "Pass" : "Fail"}
              </div>
              <div className={`px-2.5 py-1 text-2xs font-bold rounded flex items-center gap-1 ${wcagStats.white.aaaLarge ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}>
                Large Text (AAA) {wcagStats.white.aaaLarge ? "Pass" : "Fail"}
              </div>
            </div>
          </div>

          {/* Card B: BLACK TEXT preview card */}
          <div className="border border-slate-150 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-150 dark:border-slate-800 flex justify-between items-center">
              <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Black Text on Background</span>
              <span className="font-mono text-base font-extrabold text-slate-800 dark:text-white">
                {wcagStats.black.ratio}:1
              </span>
            </div>
            
            {/* The Live Interactive preview container */}
            <div
              className="flex-1 p-6 flex flex-col justify-center min-h-36 text-black"
              style={{ backgroundColor: hex }}
            >
              <input
                type="text"
                value={wcagText}
                onChange={(e) => setWcagText(e.target.value)}
                className="bg-transparent border-b border-black/20 focus:border-black/70 focus:outline-none text-base font-medium placeholder-black/50 w-full mb-3 pb-1"
                title="Black Text Preview Input"
              />
              <div className="text-2xl font-black tracking-tight leading-none mb-1">
                Large Bold Text (18pt+)
              </div>
              <div className="text-sm opacity-90 leading-relaxed font-normal">
                Standard Body Text (14pt)
              </div>
            </div>

            {/* Badges container */}
            <div className="p-4 bg-slate-50 dark:bg-slate-850/80 border-t border-slate-150 dark:border-slate-800 flex flex-wrap gap-2">
              <div className={`px-2.5 py-1 text-2xs font-bold rounded flex items-center gap-1 ${wcagStats.black.aaNormal ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}>
                Normal Text (AA) {wcagStats.black.aaNormal ? "Pass" : "Fail"}
              </div>
              <div className={`px-2.5 py-1 text-2xs font-bold rounded flex items-center gap-1 ${wcagStats.black.aaaNormal ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}>
                Normal Text (AAA) {wcagStats.black.aaaNormal ? "Pass" : "Fail"}
              </div>
              <div className={`px-2.5 py-1 text-2xs font-bold rounded flex items-center gap-1 ${wcagStats.black.aaLarge ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}>
                Large Text (AA) {wcagStats.black.aaLarge ? "Pass" : "Fail"}
              </div>
              <div className={`px-2.5 py-1 text-2xs font-bold rounded flex items-center gap-1 ${wcagStats.black.aaaLarge ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"}`}>
                Large Text (AAA) {wcagStats.black.aaaLarge ? "Pass" : "Fail"}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 4: Harmonies, Gradients & CSS Snippets Workspace Area */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Navigation Tabs bar */}
        <div className="bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 flex flex-wrap">
          <button
            onClick={() => setActiveTab("harmonies")}
            className={`px-5 py-3 text-sm font-bold transition-all flex items-center gap-2 ${activeTab === "harmonies" ? "bg-white dark:bg-slate-900 text-[#518231] border-b-2 border-b-[#518231]" : "text-slate-500 hover:text-slate-800 dark:hover:text-white"}`}
          >
            <Compass size={16} /> Color Harmonies
          </button>
          <button
            onClick={() => setActiveTab("gradient")}
            className={`px-5 py-3 text-sm font-bold transition-all flex items-center gap-2 ${activeTab === "gradient" ? "bg-white dark:bg-slate-900 text-[#518231] border-b-2 border-b-[#518231]" : "text-slate-500 hover:text-slate-800 dark:hover:text-white"}`}
          >
            <Sparkles size={16} /> CSS Gradient Preview
          </button>
          <button
            onClick={() => setActiveTab("export")}
            className={`px-5 py-3 text-sm font-bold transition-all flex items-center gap-2 ${activeTab === "export" ? "bg-white dark:bg-slate-900 text-[#518231] border-b-2 border-b-[#518231]" : "text-slate-500 hover:text-slate-800 dark:hover:text-white"}`}
          >
            <Sliders size={16} /> Developers Snippets
          </button>
        </div>

        {/* Tab content panels */}
        <div className="p-6">
          
          {/* TAB A: PALETTE HARMONIES */}
          {activeTab === "harmonies" && (
            <div className="space-y-6">
              {/* Internal harmony selection buttons */}
              <div className="flex flex-wrap gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
                <button
                  onClick={() => setActiveHarmonyTab("complementary")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeHarmonyTab === "complementary" ? "bg-[#518231]/10 text-[#518231]" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                >
                  Complementary
                </button>
                <button
                  onClick={() => setActiveHarmonyTab("analogous")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeHarmonyTab === "analogous" ? "bg-[#518231]/10 text-[#518231]" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                >
                  Analogous
                </button>
                <button
                  onClick={() => setActiveHarmonyTab("triadic")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeHarmonyTab === "triadic" ? "bg-[#518231]/10 text-[#518231]" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                >
                  Triadic
                </button>
                <button
                  onClick={() => setActiveHarmonyTab("split")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeHarmonyTab === "split" ? "bg-[#518231]/10 text-[#518231]" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                >
                  Split-Complementary
                </button>
                <button
                  onClick={() => setActiveHarmonyTab("monochromatic")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${activeHarmonyTab === "monochromatic" ? "bg-[#518231]/10 text-[#518231]" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
                >
                  Monochromatic
                </button>
              </div>

              {/* Live Swatch cards rendered dynamically */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {activeHarmonyTab === "complementary" && harmonies.complementary.map((colorHex, idx) => (
                  <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm bg-slate-50 dark:bg-slate-800/40">
                    <button
                      onClick={() => handleSelectColor(colorHex)}
                      className="w-full h-24 relative select-none border-b border-slate-100 dark:border-slate-800"
                      style={{ backgroundColor: colorHex }}
                      title={`Click to set ${colorHex}`}
                    />
                    <div className="p-3 flex justify-between items-center">
                      <span className="font-mono text-xs font-bold uppercase select-all">{colorHex}</span>
                      <button
                        onClick={() => handleCopy(colorHex, `comp-${idx}`)}
                        className="text-slate-400 hover:text-[#518231] transition-colors"
                        title="Copy Hex"
                      >
                        {copiedType === `comp-${idx}` ? <Check size={14} className="text-[#518231]" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                ))}

                {activeHarmonyTab === "analogous" && harmonies.analogous.map((colorHex, idx) => (
                  <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm bg-slate-50 dark:bg-slate-800/40">
                    <button
                      onClick={() => handleSelectColor(colorHex)}
                      className="w-full h-24 relative select-none border-b border-slate-100 dark:border-slate-800"
                      style={{ backgroundColor: colorHex }}
                      title={`Click to set ${colorHex}`}
                    />
                    <div className="p-3 flex justify-between items-center">
                      <span className="font-mono text-xs font-bold uppercase select-all">{colorHex}</span>
                      <button
                        onClick={() => handleCopy(colorHex, `anal-${idx}`)}
                        className="text-slate-400 hover:text-[#518231] transition-colors"
                        title="Copy Hex"
                      >
                        {copiedType === `anal-${idx}` ? <Check size={14} className="text-[#518231]" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                ))}

                {activeHarmonyTab === "triadic" && harmonies.triadic.map((colorHex, idx) => (
                  <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm bg-slate-50 dark:bg-slate-800/40">
                    <button
                      onClick={() => handleSelectColor(colorHex)}
                      className="w-full h-24 relative select-none border-b border-slate-100 dark:border-slate-800"
                      style={{ backgroundColor: colorHex }}
                      title={`Click to set ${colorHex}`}
                    />
                    <div className="p-3 flex justify-between items-center">
                      <span className="font-mono text-xs font-bold uppercase select-all">{colorHex}</span>
                      <button
                        onClick={() => handleCopy(colorHex, `tri-${idx}`)}
                        className="text-slate-400 hover:text-[#518231] transition-colors"
                        title="Copy Hex"
                      >
                        {copiedType === `tri-${idx}` ? <Check size={14} className="text-[#518231]" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                ))}

                {activeHarmonyTab === "split" && harmonies.split.map((colorHex, idx) => (
                  <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm bg-slate-50 dark:bg-slate-800/40">
                    <button
                      onClick={() => handleSelectColor(colorHex)}
                      className="w-full h-24 relative select-none border-b border-slate-100 dark:border-slate-800"
                      style={{ backgroundColor: colorHex }}
                      title={`Click to set ${colorHex}`}
                    />
                    <div className="p-3 flex justify-between items-center">
                      <span className="font-mono text-xs font-bold uppercase select-all">{colorHex}</span>
                      <button
                        onClick={() => handleCopy(colorHex, `split-${idx}`)}
                        className="text-slate-400 hover:text-[#518231] transition-colors"
                        title="Copy Hex"
                      >
                        {copiedType === `split-${idx}` ? <Check size={14} className="text-[#518231]" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                ))}

                {activeHarmonyTab === "monochromatic" && harmonies.monochromatic.map((colorHex, idx) => (
                  <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm bg-slate-50 dark:bg-slate-800/40">
                    <button
                      onClick={() => handleSelectColor(colorHex)}
                      className="w-full h-24 relative select-none border-b border-slate-100 dark:border-slate-800"
                      style={{ backgroundColor: colorHex }}
                      title={`Click to set ${colorHex}`}
                    />
                    <div className="p-3 flex justify-between items-center">
                      <span className="font-mono text-xs font-bold uppercase select-all">{colorHex}</span>
                      <button
                        onClick={() => handleCopy(colorHex, `mono-${idx}`)}
                        className="text-slate-400 hover:text-[#518231] transition-colors"
                        title="Copy Hex"
                      >
                        {copiedType === `mono-${idx}` ? <Check size={14} className="text-[#518231]" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB B: CSS GRADIENT PREVIEW */}
          {activeTab === "gradient" && (
            <div className="space-y-6">
              
              {/* Gradient controllers section */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Column B1: Visual display rendering (7/12) */}
                <div className="md:col-span-7 flex flex-col gap-4">
                  <div
                    className="w-full h-44 rounded-xl shadow-inner border border-slate-200 dark:border-slate-800 relative overflow-hidden"
                    style={{ background: `linear-gradient(${gradientAngle}deg, ${primaryRgbaStr} 0%, ${secondaryRgbaStr} 100%)` }}
                  />
                  
                  {/* Copy gradient CSS snippet block */}
                  <div className="flex gap-2 items-center bg-slate-50 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs overflow-x-auto select-all">
                    <span className="text-[#518231] shrink-0 font-bold">CSS:</span>
                    <code className="text-slate-700 dark:text-slate-300 flex-1 whitespace-nowrap min-w-0 pr-2">
                      {gradientCssCode}
                    </code>
                    <button
                      onClick={() => handleCopy(gradientCssCode, "gradient-code")}
                      className="p-1.5 text-slate-400 hover:text-[#518231] transition-colors shrink-0 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700"
                      title="Copy CSS Code"
                    >
                      {copiedType === "gradient-code" ? <CheckCircle size={14} className="text-[#518231]" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                {/* Column B2: Parameters Sliders controls (5/12) */}
                <div className="md:col-span-5 space-y-4">
                  
                  {/* Angle slider control */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold text-slate-500">
                      <label htmlFor="gradient-angle">Angle ({gradientAngle}°)</label>
                      <span>360°</span>
                    </div>
                    <input
                      id="gradient-angle"
                      type="range"
                      min="0"
                      max="360"
                      value={gradientAngle}
                      onChange={(e) => setGradientAngle(parseInt(e.target.value, 10))}
                      className="w-full accent-[#518231] h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  {/* Sync complement toggle checkbox */}
                  <div className="flex items-center gap-3">
                    <input
                      id="sync-complement"
                      type="checkbox"
                      checked={isGradientSync}
                      onChange={(e) => setIsGradientSync(e.target.checked)}
                      className="rounded border-slate-300 text-[#518231] focus:ring-[#518231] w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="sync-complement" className="text-xs font-bold text-slate-600 dark:text-slate-350 cursor-pointer">
                      Auto-sync end color to complement hue
                    </label>
                  </div>

                  {/* End color custom override picker (only shown if not sync) */}
                  {!isGradientSync && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-150 dark:border-slate-800 flex items-center justify-between gap-4 animate-in fade-in slide-in-from-top-1.5 duration-200">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 relative overflow-hidden" style={checkerboardStyle}>
                          <div className="absolute inset-0" style={{ backgroundColor: secondaryHexa }} />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">End Color</span>
                          <span className="font-mono text-xs uppercase font-bold">{secondaryHexa}</span>
                        </div>
                      </div>

                      {/* Mini inputs for custom end color */}
                      <input
                        aria-label="End Color Hex Input"
                        type="text"
                        value={secondaryHex}
                        onChange={(e) => {
                          const parsed = parseColor(e.target.value);
                          if (parsed) setSecondaryColor(parsed);
                        }}
                        className="w-24 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 rounded font-mono text-xs uppercase focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Swap Start & End colors button */}
                  <button
                    onClick={() => {
                      setIsGradientSync(false);
                      const temp = { ...color };
                      setColor({ ...secondaryColor });
                      setSecondaryColor(temp);
                    }}
                    className="w-full py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 text-slate-700 dark:text-slate-300"
                  >
                    <RefreshCw size={14} /> Swap Gradient Colors
                  </button>

                </div>

              </div>
            </div>
          )}

          {/* TAB C: DEVELOPER EXPORT SNIPPETS */}
          {activeTab === "export" && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Custom CSS Custom Properties variables */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                    <span>CSS Custom Variables (:root)</span>
                    <button
                      onClick={() => handleCopy(`:root {\n  --color-primary: ${color.a === 1 ? hex : hexa};\n  --color-primary-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};\n  --color-primary-hsl: ${hsl.h} ${hsl.s}% ${hsl.l}%;\n}`, "css-vars")}
                      className="text-slate-400 hover:text-[#518231] transition-colors"
                      title="Copy Custom Variables"
                    >
                      {copiedType === "css-vars" ? <Check size={14} className="text-[#518231]" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-900 border border-slate-850 rounded-xl overflow-x-auto text-xs font-mono text-slate-300 select-all">
                    <code>
{`:root {
  --color-primary: ${color.a === 1 ? hex : hexa};
  --color-primary-rgb: ${rgb.r}, ${rgb.g}, ${rgb.b};
  --color-primary-hsl: ${hsl.h} ${hsl.s}% ${hsl.l}%;
}`}
                    </code>
                  </pre>
                </div>

                {/* Custom arbitrary Tailwind classes */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                    <span>Tailwind CSS Classes (Arbitrary values)</span>
                    <button
                      onClick={() => handleCopy(`bg-[${color.a === 1 ? hex : hexa}] text-[${color.a === 1 ? hex : hexa}] border-[${color.a === 1 ? hex : hexa}]`, "tw-vars")}
                      className="text-slate-400 hover:text-[#518231] transition-colors"
                      title="Copy Tailwind Classes"
                    >
                      {copiedType === "tw-vars" ? <Check size={14} className="text-[#518231]" /> : <Copy size={14} />}
                    </button>
                  </div>
                  <pre className="p-4 bg-slate-900 border border-slate-850 rounded-xl overflow-x-auto text-xs font-mono text-slate-300 select-all">
                    <code>
{`bg-[${color.a === 1 ? hex : hexa}]
text-[${color.a === 1 ? hex : hexa}]
border-[${color.a === 1 ? hex : hexa}]
focus:ring-[${color.a === 1 ? hex : hexa}]
outline-[${color.a === 1 ? hex : hexa}]`}
                    </code>
                  </pre>
                </div>

              </div>

              {/* Palette export actions */}
              <div className="flex flex-wrap gap-3 justify-end border-t border-slate-100 dark:border-slate-850 pt-4">
                <button
                  onClick={handleDownloadJson}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5"
                >
                  <Download size={14} /> Download Palette Spec (JSON)
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* SECTION 5: Core Developer Information / Security Shield Banner */}
      <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-150 dark:border-slate-800 flex gap-3 items-start">
        <Shield className="text-[#518231] shrink-0 mt-0.5" size={18} />
        <div className="text-xs text-slate-500 leading-relaxed">
          <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">100% Client-Side Calculations</span>
          All conversions, contrast checks, and palette selections are computed locally in your web browser. Your brand metrics, asset guidelines, and input values are never shared or uploaded to the network, providing complete design privacy.
        </div>
      </div>

    </div>
  );
}
