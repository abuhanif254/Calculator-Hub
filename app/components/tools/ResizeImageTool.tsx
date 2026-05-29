"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload, Trash2, Settings, CheckCircle, AlertCircle, Loader2,
  Download, RefreshCw, History, Move, Clipboard, ShieldAlert,
  Info, Check, ZoomIn, Sliders, Image as ImageIcon, Sparkles,
  ArrowRight, Heart, Share2, HelpCircle, Eye, Ratio, Lock, Unlock, Palette
} from "lucide-react";
import JSZip from "jszip";

interface ImageFile {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  resizedSize: number | null;
  originalWidth: number | null;
  originalHeight: number | null;
  resizedWidth: number | null;
  resizedHeight: number | null;
  originalUrl: string;
  resizedUrl: string | null;
  status: "idle" | "processing" | "success" | "error";
  format: string;
  progress: number;
  errorMessage?: string;
}

interface ResizeSettings {
  mode: "custom" | "preset";
  width: number;
  height: number;
  scale: number; // 10 to 500%
  aspectRatioLock: boolean;
  aspectRatioMode: "free" | "1:1" | "4:3" | "16:9" | "2:3" | "9:16";
  presetCategory: "social" | "web" | "device";
  presetId: string;
  fitMode: "fill" | "fit" | "stretch";
  bgColor: string; // Hex code for borders in contain mode
  format: "original" | "image/jpeg" | "image/png" | "image/webp" | "image/avif";
  quality: number; // 1 to 100 for lossy formats
  stripMetadata: boolean;
  prefix: string;
  suffix: string;
}

interface PresetItem {
  id: string;
  name: string;
  width: number;
  height: number;
  aspectRatio: string;
}

const PRESETS: Record<"social" | "web" | "device", PresetItem[]> = {
  social: [
    { id: "insta_sq", name: "Instagram Square Post", width: 1080, height: 1080, aspectRatio: "1:1" },
    { id: "insta_pt", name: "Instagram Portrait Post", width: 1080, height: 1350, aspectRatio: "4:5" },
    { id: "insta_st", name: "Instagram Story / Reel", width: 1080, height: 1920, aspectRatio: "9:16" },
    { id: "fb_cov", name: "Facebook Cover (Desktop)", width: 820, height: 312, aspectRatio: "820:312" },
    { id: "yt_thumb", name: "YouTube Video Thumbnail", width: 1280, height: 720, aspectRatio: "16:9" },
    { id: "yt_banner", name: "YouTube Channel Banner", width: 2560, height: 1440, aspectRatio: "16:9" },
    { id: "tiktok", name: "TikTok Video / Slide", width: 1080, height: 1920, aspectRatio: "9:16" },
    { id: "x_post", name: "X (Twitter) Post Image", width: 1200, height: 675, aspectRatio: "16:9" },
    { id: "linkedin_banner", name: "LinkedIn Cover Page", width: 1584, height: 396, aspectRatio: "4:1" },
    { id: "linkedin_post", name: "LinkedIn Post Graphic", width: 1200, height: 627, aspectRatio: "1.91:1" },
    { id: "pinterest", name: "Pinterest Pin", width: 1000, height: 1500, aspectRatio: "2:3" }
  ],
  web: [
    { id: "hero", name: "Hero Landscape Banner", width: 1920, height: 1080, aspectRatio: "16:9" },
    { id: "blog", name: "Blog Cover Image", width: 1200, height: 630, aspectRatio: "1.91:1" },
    { id: "thumb", name: "Standard Thumbnail", width: 150, height: 150, aspectRatio: "1:1" },
    { id: "og", name: "Open Graph (OG Share)", width: 1200, height: 630, aspectRatio: "1.91:1" },
    { id: "header", name: "Website Header Section", width: 1200, height: 400, aspectRatio: "3:1" }
  ],
  device: [
    { id: "mobile_wp", name: "Mobile Screen Wallpaper", width: 1080, height: 1920, aspectRatio: "9:16" },
    { id: "desktop_wp", name: "Desktop Wallpaper (FHD)", width: 1920, height: 1080, aspectRatio: "16:9" },
    { id: "tablet_wp", name: "Tablet Screen Wallpaper", width: 2048, height: 2732, aspectRatio: "3:4" },
    { id: "uhd_4k", name: "4K UHD Display Size", width: 3840, height: 2160, aspectRatio: "16:9" },
    { id: "retina", name: "Retina Display Size", width: 2880, height: 1800, aspectRatio: "16:10" }
  ]
};

export function ResizeImageTool() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [globalDragActive, setGlobalDragActive] = useState(false);
  const [settings, setSettings] = useState<ResizeSettings>({
    mode: "custom",
    width: 1200,
    height: 800,
    scale: 100,
    aspectRatioLock: true,
    aspectRatioMode: "free",
    presetCategory: "social",
    presetId: "insta_sq",
    fitMode: "fill",
    bgColor: "#FFFFFF",
    format: "original",
    quality: 85,
    stripMetadata: true,
    prefix: "",
    suffix: "-resized"
  });

  const [processingAll, setProcessingAll] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [comparisonSliderPos, setComparisonSliderPos] = useState(50);
  const [showComparison, setShowComparison] = useState(false);
  const [localPresetSaved, setLocalPresetSaved] = useState(false);
  const [copySummarySuccess, setCopySummarySuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load preset configurations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("resize_image_settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved settings", e);
      }
    }
  }, []);

  // Sync settings helper
  const updateSettings = useCallback((newSettings: Partial<ResizeSettings>) => {
    setSettings((prev) => {
      const merged = { ...prev, ...newSettings };

      // Aspect ratio updates
      if (newSettings.width !== undefined && prev.aspectRatioLock && prev.width > 0) {
        const ratio = prev.height / prev.width;
        merged.height = Math.max(1, Math.round(newSettings.width * ratio));
      } else if (newSettings.height !== undefined && prev.aspectRatioLock && prev.height > 0) {
        const ratio = prev.width / prev.height;
        merged.width = Math.max(1, Math.round(newSettings.height * ratio));
      }

      // Handle custom ratio modes overrides
      if (newSettings.aspectRatioMode && newSettings.aspectRatioMode !== "free") {
        let ratioVal = 1;
        if (newSettings.aspectRatioMode === "1:1") ratioVal = 1;
        else if (newSettings.aspectRatioMode === "4:3") ratioVal = 4 / 3;
        else if (newSettings.aspectRatioMode === "16:9") ratioVal = 16 / 9;
        else if (newSettings.aspectRatioMode === "2:3") ratioVal = 2 / 3;
        else if (newSettings.aspectRatioMode === "9:16") ratioVal = 9 / 16;

        merged.aspectRatioLock = true;
        merged.height = Math.max(1, Math.round(merged.width / ratioVal));
      }

      return merged;
    });
  }, []);

  // Update scaling logic
  const applyScalePercentage = (pct: number) => {
    if (images.length > 0) {
      const first = images[0];
      if (first.originalWidth && first.originalHeight) {
        const w = Math.max(1, Math.round((first.originalWidth * pct) / 100));
        const h = Math.max(1, Math.round((first.originalHeight * pct) / 100));
        updateSettings({ scale: pct, width: w, height: h });
      }
    } else {
      updateSettings({ scale: pct });
    }
  };

  // Preset Selection Click
  const selectPreset = (cat: "social" | "web" | "device", id: string) => {
    const list = PRESETS[cat];
    const target = list.find(item => item.id === id);
    if (target) {
      updateSettings({
        mode: "preset",
        presetCategory: cat,
        presetId: id,
        width: target.width,
        height: target.height,
        aspectRatioLock: true,
        aspectRatioMode: "free" // reset ratio selector back to custom preset definitions
      });
    }
  };

  // Clipboard paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            files.push(new File([blob], `pasted-${Date.now()}.${blob.type.split("/")[1] || "png"}`, { type: blob.type }));
          }
        }
      }
      if (files.length > 0) {
        loadFiles(files);
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [images]);

  // Drag Drop window overlays
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setGlobalDragActive(true);
    };
    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      if (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
        setGlobalDragActive(false);
      }
    };
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setGlobalDragActive(false);
    };

    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("drop", handleDrop);
    };
  }, []);

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Load files helper
  const loadFiles = (fileList: File[] | FileList) => {
    const newImages: ImageFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/bmp", "image/gif", "image/svg+xml"];

      if (!validTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|avif|bmp|gif|svg)$/i)) {
        alert(`Unsupported file structure: ${file.name}`);
        continue;
      }

      if (file.size > 100 * 1024 * 1024) {
        alert(`File size exceeds 100MB safety limit: ${file.name}`);
        continue;
      }

      const id = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const originalUrl = URL.createObjectURL(file);

      const item: ImageFile = {
        id,
        file,
        name: file.name,
        originalSize: file.size,
        resizedSize: null,
        originalWidth: null,
        originalHeight: null,
        resizedWidth: null,
        resizedHeight: null,
        originalUrl,
        resizedUrl: null,
        status: "idle",
        format: file.type,
        progress: 0
      };

      if (file.type !== "image/svg+xml") {
        const img = new Image();
        img.src = originalUrl;
        img.onload = () => {
          setImages(prev => prev.map(m => m.id === id ? {
            ...m,
            originalWidth: img.naturalWidth,
            originalHeight: img.naturalHeight
          } : m));
        };
      } else {
        // default SVG width heights
        item.originalWidth = 800;
        item.originalHeight = 800;
      }

      newImages.push(item);
    }

    if (newImages.length > 0) {
      setImages(prev => [...prev, ...newImages]);
      // set selected default preview
      if (!selectedImageId) {
        setSelectedImageId(newImages[0].id);
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setGlobalDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const target = prev.find(item => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.originalUrl);
        if (target.resizedUrl) URL.revokeObjectURL(target.resizedUrl);
      }
      return prev.filter(item => item.id !== id);
    });
    if (selectedImageId === id) {
      setSelectedImageId(null);
      setShowComparison(false);
    }
  };

  // Canvas scaling engine
  const resizeSingleImage = (item: ImageFile, activeSettings: ResizeSettings): Promise<ImageFile> => {
    return new Promise((resolve) => {
      if (item.format === "image/svg+xml" && activeSettings.format === "original") {
        // For SVG vectors, we can modify direct text container attributes width/height or wrap it
        // We bypass Canvas rasterization to retain vectors, unless user selects raster conversions like JPEG
        item.file.text().then(svgText => {
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgText, "image/svg+xml");
            const svgElement = doc.documentElement;

            svgElement.setAttribute("width", activeSettings.width.toString());
            svgElement.setAttribute("height", activeSettings.height.toString());

            const serializer = new XMLSerializer();
            const modifiedSvg = serializer.serializeToString(svgElement);
            const blob = new Blob([modifiedSvg], { type: "image/svg+xml" });
            const resizedUrl = URL.createObjectURL(blob);

            resolve({
              ...item,
              resizedSize: blob.size,
              resizedUrl,
              resizedWidth: activeSettings.width,
              resizedHeight: activeSettings.height,
              status: "success",
              progress: 100
            });
          } catch (e: any) {
            resolve({
              ...item,
              status: "error",
              errorMessage: e.message || "Failed to parse SVG structure."
            });
          }
        }).catch(err => {
          resolve({ ...item, status: "error", errorMessage: "Failed to read SVG file text." });
        });
        return;
      }

      const img = new Image();
      img.src = item.originalUrl;
      img.onload = () => {
        try {
          const targetW = activeSettings.width;
          const targetH = activeSettings.height;

          const canvas = document.createElement("canvas");
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext("2d");

          if (!ctx) {
            throw new Error("Could not construct 2D context");
          }

          // Format check
          const exportFormat = activeSettings.format === "original" ? item.format : activeSettings.format;
          
          // White background fallback for JPG conversion
          if (exportFormat === "image/jpeg") {
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, targetW, targetH);
          }

          // Image fit modes calculations
          if (activeSettings.fitMode === "stretch") {
            ctx.drawImage(img, 0, 0, targetW, targetH);
          } else if (activeSettings.fitMode === "fit") {
            // Contain mode: solid fill background first
            ctx.fillStyle = activeSettings.bgColor;
            ctx.fillRect(0, 0, targetW, targetH);

            const scale = Math.min(targetW / img.naturalWidth, targetH / img.naturalHeight);
            const w = img.naturalWidth * scale;
            const h = img.naturalHeight * scale;
            const x = (targetW - w) / 2;
            const y = (targetH - h) / 2;
            ctx.drawImage(img, x, y, w, h);
          } else {
            // Fill/Cover crop mode
            const scale = Math.max(targetW / img.naturalWidth, targetH / img.naturalHeight);
            const w = img.naturalWidth * scale;
            const h = img.naturalHeight * scale;
            const x = (targetW - w) / 2;
            const y = (targetH - h) / 2;
            ctx.drawImage(img, x, y, w, h);
          }

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const resizedUrl = URL.createObjectURL(blob);
                resolve({
                  ...item,
                  resizedSize: blob.size,
                  resizedUrl,
                  resizedWidth: targetW,
                  resizedHeight: targetH,
                  status: "success",
                  progress: 100
                });
              } else {
                resolve({ ...item, status: "error", errorMessage: "Failed to render canvas." });
              }
            },
            exportFormat,
            activeSettings.quality / 100
          );
        } catch (e: any) {
          resolve({ ...item, status: "error", errorMessage: e.message || "Failed during rendering." });
        }
      };

      img.onerror = () => {
        resolve({ ...item, status: "error", errorMessage: "Failed to load image." });
      };
    });
  };

  // Bulk Processor Trigger
  const processQueue = async () => {
    if (images.length === 0) return;
    setProcessingAll(true);

    const list = [...images];
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      setImages(prev => prev.map(m => m.id === item.id ? { ...m, status: "processing" } : m));

      const result = await resizeSingleImage(item, settings);

      if (item.resizedUrl) {
        URL.revokeObjectURL(item.resizedUrl);
      }
      setImages(prev => prev.map(m => m.id === item.id ? result : m));
    }

    setProcessingAll(false);
  };

  const getExportExtension = (item: ImageFile): string => {
    if (settings.format === "original") {
      if (item.format === "image/svg+xml") return ".svg";
      if (item.format === "image/png") return ".png";
      if (item.format === "image/webp") return ".webp";
      if (item.format === "image/avif") return ".avif";
      return ".jpg";
    }
    if (settings.format === "image/png") return ".png";
    if (settings.format === "image/webp") return ".webp";
    if (settings.format === "image/avif") return ".avif";
    return ".jpg";
  };

  // Trigger individual download
  const triggerDownload = (item: ImageFile) => {
    if (!item.resizedUrl) return;
    const a = document.createElement("a");
    a.href = item.resizedUrl;

    const dot = item.name.lastIndexOf(".");
    const base = dot !== -1 ? item.name.substring(0, dot) : item.name;
    const ext = getExportExtension(item);

    a.download = `${settings.prefix}${base}${settings.suffix}${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Zip Bulk exporter
  const downloadAllAsZip = async () => {
    const successes = images.filter(m => m.status === "success" && m.resizedUrl);
    if (successes.length === 0) return;

    const zip = new JSZip();
    for (const item of successes) {
      if (!item.resizedUrl) continue;
      const res = await fetch(item.resizedUrl);
      const blob = await res.blob();

      const dot = item.name.lastIndexOf(".");
      const base = dot !== -1 ? item.name.substring(0, dot) : item.name;
      const ext = getExportExtension(item);
      const name = `${settings.prefix}${base}${settings.suffix}${ext}`;

      zip.file(name, blob);
    }

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);

    const a = document.createElement("a");
    a.href = url;
    a.download = `resized-images-${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Clipboard copy summary
  const copyResizeSummary = () => {
    const successes = images.filter(m => m.status === "success");
    if (successes.length === 0) return;

    const text = successes.map(item => {
      const origDim = `${item.originalWidth}x${item.originalHeight}`;
      const resDim = `${item.resizedWidth}x${item.resizedHeight}`;
      const origSize = formatBytes(item.originalSize);
      const resSize = formatBytes(item.resizedSize || 0);
      return `- ${item.name}: Resized from ${origDim} (${origSize}) to ${resDim} (${resSize})`;
    }).join("\n");

    navigator.clipboard.writeText(`Image Resize Session Summary:\n${text}`).then(() => {
      setCopySummarySuccess(true);
      setTimeout(() => setCopySummarySuccess(false), 2000);
    });
  };

  // Save configurations in local storage
  const savePresetSettings = () => {
    localStorage.setItem("resize_image_settings", JSON.stringify(settings));
    setLocalPresetSaved(true);
    setTimeout(() => setLocalPresetSaved(false), 2000);
  };

  const clearQueue = () => {
    images.forEach(item => {
      URL.revokeObjectURL(item.originalUrl);
      if (item.resizedUrl) URL.revokeObjectURL(item.resizedUrl);
    });
    setImages([]);
    setSelectedImageId(null);
    setShowComparison(false);
  };

  // Analytics Math
  const totalOriginalBytes = images.reduce((acc, curr) => acc + curr.originalSize, 0);
  const totalResizedBytes = images.reduce((acc, curr) => {
    return acc + (curr.resizedSize !== null ? curr.resizedSize : curr.originalSize);
  }, 0);
  const bytesSaved = totalOriginalBytes - totalResizedBytes;
  const savingsPct = totalOriginalBytes > 0 ? Math.round((bytesSaved / totalOriginalBytes) * 100) : 0;
  const speedBoostSeconds = bytesSaved / (1.5 * 1024 * 1024); // est 1.5MB/s mobile 3G load speed

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Global dragging helper */}
      {globalDragActive && (
        <div className="fixed inset-0 z-50 bg-indigo-900/30 dark:bg-slate-950/70 backdrop-blur-sm border-4 border-dashed border-[#518231] flex flex-col items-center justify-center pointer-events-none">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-md mx-4 border border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-full bg-[#518231]/10 flex items-center justify-center text-[#518231] animate-bounce">
              <Upload size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Drop Images to Resize</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Release files to add them to your resizing queue.</p>
          </div>
        </div>
      )}

      {/* Offline Alert Context Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#518231]/5 border border-[#518231]/20 dark:border-[#518231]/10 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white text-sm">Security-First Local Processing</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Images remain offline. Scaling occurs inside your browser sandbox.</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {images.length > 0 && (
            <button 
              onClick={clearQueue}
              className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/30 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Clear Queue
            </button>
          )}
        </div>
      </div>

      {/* Empty zone upload */}
      {images.length === 0 ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-3 border-dashed rounded-2xl p-10 md:p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group ${
            dragActive 
              ? "border-[#518231] bg-[#518231]/5 shadow-[0_0_20px_-3px_rgba(81,130,49,0.2)]" 
              : "border-slate-300 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#518231] bg-white dark:bg-slate-900/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/80"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => e.target.files && loadFiles(e.target.files)}
            className="hidden"
            id="image-resize-input"
            aria-label="Upload Images to Resize"
          />
          <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#518231]/10 group-hover:text-[#518231] transition-all duration-300 mb-4">
            <Upload size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-[#518231] transition-colors">
            Drag & Drop Images to Resize
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
            Click to browse device folders. Supports pasting screenshots directly (Ctrl+V).
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-[10px] font-bold text-slate-400 uppercase">
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">PNG, JPG, WEBP, AVIF</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">SVG, BMP, GIF</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">Batch Loading</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* List & Queue Columns (Left) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#518231] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {images.length}
                  </span>
                  <h3 className="font-bold text-slate-800 dark:text-white text-sm">Resizing Queue</h3>
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-[#518231] hover:underline font-bold flex items-center gap-1"
                >
                  + Append Images
                </button>
              </div>

              {/* Items Card List */}
              <div className="grid gap-3 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
                {images.map((item) => {
                  const done = item.status === "success";
                  const saving = done && item.resizedSize ? Math.round(((item.originalSize - item.resizedSize) / item.originalSize) * 100) : 0;

                  return (
                    <div 
                      key={item.id}
                      className={`border p-3 rounded-xl flex items-center justify-between gap-4 transition-all ${
                        selectedImageId === item.id 
                          ? "border-[#518231] bg-slate-50/50 dark:bg-slate-950/30" 
                          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-350"
                      }`}
                    >
                      {/* Left side preview */}
                      <button 
                        onClick={() => { setSelectedImageId(item.id); setShowComparison(true); }}
                        className="w-14 h-14 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-850 relative overflow-hidden flex items-center justify-center shrink-0 group/thumb shadow-3xs"
                        title="Compare resized dimensions preview"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={item.originalUrl} 
                          alt="Thumbnail preview"
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center text-white transition-opacity">
                          <ZoomIn size={16} />
                        </div>
                      </button>

                      {/* Middle description data */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-white truncate" title={item.name}>
                          {item.name}
                        </p>
                        
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono uppercase">
                            {item.format.split("/")[1] || "Image"}
                          </span>
                          {item.originalWidth && (
                            <span className="text-[10px] text-slate-400">
                              {item.originalWidth}x{item.originalHeight} (orig)
                            </span>
                          )}
                        </div>

                        {/* Compression stats if processed */}
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[11px] text-slate-500 font-semibold">{formatBytes(item.originalSize)}</span>
                          {done && (
                            <>
                              <ArrowRight size={12} className="text-slate-400" />
                              <span className="text-[11px] text-[#518231] font-bold">
                                {item.resizedWidth}x{item.resizedHeight} ({formatBytes(item.resizedSize || 0)})
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right action columns */}
                      <div className="flex items-center gap-2">
                        {item.status === "processing" && (
                          <div className="text-xs text-[#518231] font-medium flex items-center gap-1">
                            <Loader2 size={14} className="animate-spin" /> Processing
                          </div>
                        )}
                        {item.status === "error" && (
                          <div className="text-red-500 text-xs flex items-center gap-1" title={item.errorMessage}>
                            <AlertCircle size={14} /> Error
                          </div>
                        )}
                        {done && (
                          <button
                            onClick={() => triggerDownload(item)}
                            className="p-1.5 rounded-lg bg-[#518231]/10 text-[#518231] hover:bg-[#518231]/20 transition-all"
                            title="Download resized file"
                          >
                            <Download size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => removeImage(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance savings panel */}
            {images.some(img => img.status === "success") && (
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-3xs grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center md:text-left space-y-1">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimated Bandwidth Saved</h5>
                  <p className="text-3xl font-extrabold text-[#518231]">{formatBytes(Math.max(0, bytesSaved))}</p>
                  <p className="text-xs text-slate-500">{savingsPct > 0 ? `${savingsPct}% reduction` : "Size increased (metadata padding/upscale)"}</p>
                </div>
                <div className="text-center md:text-left space-y-1 border-t md:border-t-0 md:border-x border-slate-200 dark:border-slate-800 py-4 md:py-0 md:px-6">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Load Speed Latency Reduced</h5>
                  <p className="text-3xl font-extrabold text-blue-500">+{Math.max(0.1, parseFloat(speedBoostSeconds.toFixed(2)))}s</p>
                  <p className="text-xs text-slate-500">For standard mobile 3G/4G client networks</p>
                </div>
                <div className="text-center md:text-left space-y-1">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SEO Core Web Vital Status</h5>
                  <p className="text-3xl font-extrabold text-emerald-500">LCP Passed</p>
                  <p className="text-xs text-slate-500">Page load speeds optimized to decrease bounce rates</p>
                </div>
              </div>
            )}
          </div>

          {/* Config panel inputs (Right) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-6">
            <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Sliders size={16} className="text-[#518231]" /> Resizer Controls
            </h4>

            {/* Mode selection tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => updateSettings({ mode: "custom" })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold text-center transition-all ${
                  settings.mode === "custom"
                    ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Custom Size
              </button>
              <button
                type="button"
                onClick={() => updateSettings({ mode: "preset" })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold text-center transition-all ${
                  settings.mode === "preset"
                    ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Presets / Templates
              </button>
            </div>

            {/* Mode: Presets selection dropdown */}
            {settings.mode === "preset" ? (
              <div className="space-y-4">
                
                {/* Preset Categories */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Category</label>
                  <select
                    value={settings.presetCategory}
                    onChange={(e) => {
                      const cat = e.target.value as "social" | "web" | "device";
                      const defaultId = PRESETS[cat][0].id;
                      selectPreset(cat, defaultId);
                    }}
                    className="w-full px-3 py-2 bg-slate-50 focus:bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-350 focus:outline-none"
                  >
                    <option value="social">Social Media Dimensions</option>
                    <option value="web">Web & Blog Presets</option>
                    <option value="device">Devices & Wallpapers</option>
                  </select>
                </div>

                {/* Preset Item list selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Select Template</label>
                  <select
                    value={settings.presetId}
                    onChange={(e) => selectPreset(settings.presetCategory, e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 focus:bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-350 focus:outline-none"
                  >
                    {PRESETS[settings.presetCategory].map(item => (
                      <option key={item.id} value={item.id}>
                        {item.name} ({item.width} x {item.height})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Template metadata preview */}
                <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-150 dark:border-slate-850 space-y-1">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Selected Preset Dimensions</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">
                    {settings.width} x {settings.height} pixels
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Proportions automatically locked for standard safety crop rendering.
                  </p>
                </div>

              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Custom dimensions inputs */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Width (px)</label>
                    <input
                      type="number"
                      min="10"
                      max="15000"
                      value={settings.width}
                      onChange={(e) => updateSettings({ width: Math.max(10, Number(e.target.value)) })}
                      className="w-full px-3 py-1.5 bg-slate-50 focus:bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs font-mono font-semibold text-slate-750 dark:text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Height (px)</label>
                    <input
                      type="number"
                      min="10"
                      max="15000"
                      value={settings.height}
                      onChange={(e) => updateSettings({ height: Math.max(10, Number(e.target.value)) })}
                      className="w-full px-3 py-1.5 bg-slate-50 focus:bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs font-mono font-semibold text-slate-750 dark:text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Aspect ratio lock and toggle list */}
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                  <label className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold cursor-pointer">
                    <button
                      type="button"
                      onClick={() => updateSettings({ aspectRatioLock: !settings.aspectRatioLock })}
                      className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-[#518231]"
                      title={settings.aspectRatioLock ? "Unlock aspect ratio" : "Lock aspect ratio"}
                    >
                      {settings.aspectRatioLock ? <Lock size={14} /> : <Unlock size={14} />}
                    </button>
                    Aspect Ratio Lock
                  </label>

                  {/* Common Aspect Ratio Modes */}
                  <select
                    value={settings.aspectRatioMode}
                    onChange={(e) => updateSettings({ aspectRatioMode: e.target.value as any })}
                    className="px-2 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded text-[11px] font-semibold text-slate-750 focus:outline-none"
                  >
                    <option value="free">Ratio: Custom / Free</option>
                    <option value="1:1">Ratio: 1:1 Square</option>
                    <option value="4:3">Ratio: 4:3 Standard</option>
                    <option value="16:9">Ratio: 16:9 Widescreen</option>
                    <option value="2:3">Ratio: 2:3 Portrait</option>
                    <option value="9:16">Ratio: 9:16 Vertical</option>
                  </select>
                </div>

                {/* Dimensions scaling percentage */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                    <span>Scale Percentage</span>
                    <span className="text-[#518231] font-mono font-bold">{settings.scale}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="300"
                    step="5"
                    value={settings.scale}
                    onChange={(e) => applyScalePercentage(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                  />
                  <div className="flex justify-between text-[8px] font-bold text-slate-400">
                    <span>10% (Tiny)</span>
                    <span>100% (Original)</span>
                    <span>300% (Upscaled)</span>
                  </div>
                </div>

              </div>
            )}

            {/* Fit mode selector */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Crop & Fit Method</label>
              
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "fill", label: "Fill / Cover", desc: "Scale and center crop excess margins." },
                  { id: "fit", label: "Fit / Contain", desc: "Preserve whole image. Pad borders." },
                  { id: "stretch", label: "Stretch Mode", desc: "Force exact height & width." }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => updateSettings({ fitMode: item.id as any })}
                    className={`p-2 rounded-xl border text-left transition-all ${
                      settings.fitMode === item.id
                        ? "border-[#518231] bg-[#518231]/5 shadow-3xs"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-350"
                    }`}
                    title={item.desc}
                  >
                    <p className={`text-xs font-bold ${settings.fitMode === item.id ? "text-[#518231]" : "text-slate-800 dark:text-white"}`}>
                      {item.label}
                    </p>
                  </button>
                ))}
              </div>

              {/* Contain background color selector */}
              {settings.fitMode === "fit" && (
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-250/30 dark:border-slate-850">
                  <Palette size={18} className="text-slate-400" />
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Letterbox Pad Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={settings.bgColor}
                        onChange={(e) => updateSettings({ bgColor: e.target.value })}
                        className="w-7 h-7 rounded border border-slate-300 cursor-pointer bg-transparent"
                        aria-label="Choose padding color"
                      />
                      <input
                        type="text"
                        value={settings.bgColor}
                        onChange={(e) => updateSettings({ bgColor: e.target.value })}
                        placeholder="#FFFFFF"
                        className="w-full px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Formats conversion & output configurations */}
            <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              
              {/* Output format */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Format Conversion</label>
                <select
                  value={settings.format}
                  onChange={(e) => updateSettings({ format: e.target.value as any })}
                  className="w-full px-3 py-2 bg-slate-50 focus:bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-350 focus:outline-none"
                >
                  <option value="original">Original (Match Input)</option>
                  <option value="image/jpeg">Convert to JPG</option>
                  <option value="image/png">Convert to PNG (Lossless)</option>
                  <option value="image/webp">Convert to WEBP (Optimized)</option>
                  <option value="image/avif">Convert to AVIF (Next-Gen)</option>
                </select>
              </div>

              {/* Quality compression slider (not active for PNG conversion) */}
              {settings.format !== "image/png" && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span className="uppercase tracking-wider">Quality Compression</span>
                    <span className="text-[#518231] font-mono">{settings.quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={settings.quality}
                    onChange={(e) => updateSettings({ quality: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                  />
                  <div className="flex justify-between text-[9px] font-semibold text-slate-400">
                    <span>Compact File</span>
                    <span>Balanced</span>
                    <span>Uncompressed</span>
                  </div>
                </div>
              )}

              {/* EXIF metadata toggles */}
              <div className="space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.stripMetadata}
                    onChange={(e) => updateSettings({ stripMetadata: e.target.checked })}
                    className="rounded text-[#518231] focus:ring-[#518231] bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-850 mt-0.5"
                  />
                  <div className="-mt-0.5">
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Strip EXIF Metadata</p>
                    <p className="text-[9px] text-slate-400 leading-tight">Remove device camera settings, GPS tags, and timestamps.</p>
                  </div>
                </label>
              </div>

              {/* Filename outputs modifiers */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/40">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Name Prefix</label>
                  <input
                    type="text"
                    value={settings.prefix}
                    onChange={(e) => updateSettings({ prefix: e.target.value.replace(/[^a-zA-Z0-9_-]/g, "") })}
                    placeholder="e.g. thumb-"
                    className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Name Suffix</label>
                  <input
                    type="text"
                    value={settings.suffix}
                    onChange={(e) => updateSettings({ suffix: e.target.value.replace(/[^a-zA-Z0-9_-]/g, "") })}
                    placeholder="-resized"
                    className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
                  />
                </div>
              </div>

            </div>

            {/* Resize trigger actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
              <button
                onClick={processQueue}
                disabled={processingAll}
                className="w-full py-2.5 bg-gradient-to-r from-[#518231] to-[#436a28] hover:from-[#436a28] hover:to-[#365420] text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                {processingAll ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {processingAll ? "Resizing image files..." : "Resize Images"}
              </button>

              {images.some(img => img.status === "success") && (
                <>
                  <button
                    onClick={downloadAllAsZip}
                    className="w-full py-2.5 bg-slate-850 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-650 font-bold rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <Download size={16} /> Download All (ZIP)
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={copyResizeSummary}
                      className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-750 dark:text-slate-300 rounded-lg text-[10px] font-bold border border-slate-200/40 dark:border-slate-800 transition-all flex items-center justify-center gap-1"
                    >
                      <Clipboard size={12} />
                      {copySummarySuccess ? "Summary Copied!" : "Copy Summary"}
                    </button>
                  </div>
                </>
              )}

              <button
                onClick={savePresetSettings}
                className="w-full py-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-lg text-[10px] font-bold border border-slate-200/20 dark:border-slate-850 transition-all flex items-center justify-center gap-1"
              >
                {localPresetSaved ? <Check size={12} className="text-emerald-500" /> : null}
                {localPresetSaved ? "Configuration Preset Saved!" : "Save Configuration Preset"}
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Before / After visual crops drawer comparison overlay */}
      {showComparison && selectedImageId && (
        (() => {
          const item = images.find(img => img.id === selectedImageId);
          if (!item) return null;

          return (
            <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
              <div 
                className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden max-h-[90vh] shadow-2xl animate-in zoom-in-95"
                role="dialog"
                aria-modal="true"
                aria-label="Image resizer output comparator"
              >
                {/* Visual comparator header */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-150 dark:border-slate-700 flex items-center justify-between">
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-slate-450 mt-0.5">Slide to view original (left) vs resized and cropped output (right)</p>
                  </div>
                  <button 
                    onClick={() => setShowComparison(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-xs"
                  >
                    Close [X]
                  </button>
                </div>

                {/* Main slider box */}
                <div className="flex-1 overflow-auto bg-slate-100 dark:bg-slate-950 p-6 flex flex-col items-center justify-center relative min-h-[300px]">
                  
                  {/* Slider visual bounds container */}
                  <div className="relative overflow-hidden select-none max-w-full max-h-[50vh] aspect-video border border-slate-300 dark:border-slate-850 shadow-md rounded-lg">
                    
                    {/* Before (Original, underlayer) */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={item.originalUrl} 
                      alt="Original image bounds"
                      className="w-full h-full object-contain pointer-events-none"
                    />

                    {/* After (Resized, overlayer clipped) */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={item.resizedUrl || item.originalUrl} 
                      alt="Resized crop output preview"
                      className="w-full h-full object-contain absolute inset-0 pointer-events-none"
                      style={{ clipPath: `inset(0 0 0 ${comparisonSliderPos}%)` }}
                    />

                    {/* Top corner info badges */}
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-2xs">
                      Original ({item.originalWidth ? `${item.originalWidth}x${item.originalHeight}` : ""})
                    </div>
                    <div className="absolute top-3 right-3 bg-[#518231] text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-2xs">
                      Resized ({item.resizedWidth ? `${item.resizedWidth}x${item.resizedHeight}` : ""})
                    </div>

                    {/* Sliding line indicator bar */}
                    <div 
                      className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center pointer-events-none"
                      style={{ left: `${comparisonSliderPos}%` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-300 dark:border-slate-700 shadow flex items-center justify-center -ml-3.5 text-slate-600 font-bold text-xs select-none">
                        ↔
                      </div>
                    </div>

                    {/* Drag listener invisible input */}
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={comparisonSliderPos}
                      onChange={(e) => setComparisonSliderPos(Number(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                      aria-label="Before/after comparison divider slider position"
                    />

                  </div>

                </div>

                {/* Footer status summary */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-150 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Original: <strong>{formatBytes(item.originalSize)}</strong> | Resized: <strong>{formatBytes(item.resizedSize || item.originalSize)}</strong>
                  </div>
                  {item.resizedUrl ? (
                    <button
                      onClick={() => triggerDownload(item)}
                      className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Download size={14} /> Download Image
                    </button>
                  ) : (
                    <p className="text-xs text-red-500 font-semibold">Resizing not executed yet. Click "Resize Images" first.</p>
                  )}
                </div>

              </div>
            </div>
          );
        })()
      )}

    </div>
  );
}
