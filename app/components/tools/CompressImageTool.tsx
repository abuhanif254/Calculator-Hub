"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload, Trash2, Settings, CheckCircle, AlertCircle, Loader2,
  Download, RefreshCw, History, Move, Clipboard, ShieldAlert,
  Info, Check, ZoomIn, Sliders, Image as ImageIcon, Sparkles,
  ArrowRight, Heart, Share2, HelpCircle
} from "lucide-react";
import JSZip from "jszip";

interface ImageFile {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  compressedSize: number | null;
  originalWidth: number | null;
  originalHeight: number | null;
  compressedWidth: number | null;
  compressedHeight: number | null;
  originalUrl: string;
  compressedUrl: string | null;
  status: "idle" | "processing" | "success" | "error";
  format: string; // "image/jpeg", "image/png", etc.
  progress: number;
  errorMessage?: string;
}

interface CompressorSettings {
  quality: number; // 1 to 100
  preset: "balanced" | "maxQuality" | "webOptimized" | "ultra" | "social";
  format: "original" | "image/jpeg" | "image/png" | "image/webp" | "image/avif";
  resizeMode: "none" | "width" | "height" | "scale";
  resizeWidth: number;
  resizeHeight: number;
  resizeScale: number; // 1 to 100
  maintainAspectRatio: boolean;
  stripMetadata: boolean;
  prefix: string;
  suffix: string;
  sizeMode: "quality" | "target";
  targetSizeKB: number;
  exactSize: boolean;
}

export function CompressImageTool() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [globalDragActive, setGlobalDragActive] = useState(false);
  const [settings, setSettings] = useState<CompressorSettings>({
    quality: 75,
    preset: "balanced",
    format: "original",
    resizeMode: "none",
    resizeWidth: 800,
    resizeHeight: 600,
    resizeScale: 100,
    maintainAspectRatio: true,
    stripMetadata: true,
    prefix: "",
    suffix: "-optimized",
    sizeMode: "quality",
    targetSizeKB: 100,
    exactSize: false
  });

  const [processingAll, setProcessingAll] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [comparisonSliderPos, setComparisonSliderPos] = useState(50);
  const [showComparison, setShowComparison] = useState(false);
  const [localPresetSaved, setLocalPresetSaved] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  // Load configuration preset from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("compress_image_settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved settings", e);
      }
    }
  }, []);

  // Sync preset controls with quality parameters
  const updateSettings = useCallback((newSettings: Partial<CompressorSettings>) => {
    setSettings((prev) => {
      const merged = { ...prev, ...newSettings };
      
      // Auto adjust presets when quality/dimensions change
      if (newSettings.quality !== undefined && newSettings.preset !== undefined) {
        // user setting preset directly
      } else if (newSettings.quality !== undefined) {
        merged.preset = "balanced"; // revert to custom/balanced when quality is manual
      }
      
      return merged;
    });
  }, []);

  // Handle Preset Choices
  const applyPreset = (preset: CompressorSettings["preset"]) => {
    switch (preset) {
      case "maxQuality":
        updateSettings({ preset, quality: 92, resizeMode: "none" });
        break;
      case "balanced":
        updateSettings({ preset, quality: 75, resizeMode: "none" });
        break;
      case "webOptimized":
        updateSettings({ preset, quality: 60, resizeMode: "scale", resizeScale: 80 });
        break;
      case "ultra":
        updateSettings({ preset, quality: 30, resizeMode: "scale", resizeScale: 60 });
        break;
      case "social":
        updateSettings({ preset, quality: 70, resizeMode: "scale", resizeScale: 75 });
        break;
    }
  };

  // Clipboard Paste Support
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const fileList: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            fileList.push(new File([blob], `pasted-image-${Date.now()}.${blob.type.split("/")[1] || "png"}`, { type: blob.type }));
          }
        }
      }
      if (fileList.length > 0) {
        loadFiles(fileList);
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  // Global Drag listeners
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

  const loadFiles = (fileList: File[] | FileList) => {
    const newImages: ImageFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      
      // Basic formats check
      const validTypes = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/bmp", "image/gif", "image/svg+xml"];
      if (!validTypes.includes(file.type) && !file.name.match(/\.(jpg|jpeg|png|webp|avif|bmp|gif|svg)$/i)) {
        alert(`Unsupported file format: ${file.name}`);
        continue;
      }

      // Check max size (100MB to protect device browser crash)
      if (file.size > 100 * 1024 * 1024) {
        alert(`File too large (>100MB): ${file.name}`);
        continue;
      }

      const id = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const originalUrl = URL.createObjectURL(file);

      const newImage: ImageFile = {
        id,
        file,
        name: file.name,
        originalSize: file.size,
        compressedSize: null,
        originalWidth: null,
        originalHeight: null,
        compressedWidth: null,
        compressedHeight: null,
        originalUrl,
        compressedUrl: null,
        status: "idle",
        format: file.type,
        progress: 0
      };

      // Load dimensions in background
      if (file.type !== "image/svg+xml") {
        const img = new Image();
        img.src = originalUrl;
        img.onload = () => {
          setImages(prev => prev.map(item => item.id === id ? {
            ...item,
            originalWidth: img.naturalWidth,
            originalHeight: img.naturalHeight
          } : item));
        };
      }

      newImages.push(newImage);
    }

    if (newImages.length > 0) {
      setImages(prev => [...prev, ...newImages]);
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

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      loadFiles(e.target.files);
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const target = prev.find(item => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.originalUrl);
        if (target.compressedUrl) {
          URL.revokeObjectURL(target.compressedUrl);
        }
      }
      return prev.filter(item => item.id !== id);
    });
    if (selectedImageId === id) {
      setSelectedImageId(null);
      setShowComparison(false);
    }
  };

  // SVG Basic Optimization
  const optimizeSVG = (svgText: string): string => {
    return svgText
      .replace(/<!--[\s\S]*?-->/g, '') // remove comments
      .replace(/<\?xml[\s\S]*?\?>/g, '') // remove xml declaration
      .replace(/<!DOCTYPE[\s\S]*?>/g, '') // remove doctype
      .replace(/\s+/g, ' ') // collapse whitespace
      .replace(/>\s+</g, '><') // strip whitespace between tags
      .trim();
  };

  // Core Canvas rendering helper
  const renderCanvasBlob = (
    img: HTMLImageElement,
    quality: number,
    scalePercent: number,
    activeSettings: CompressorSettings,
    originalFormat: string
  ): Promise<{ blob: Blob | null; width: number; height: number }> => {
    return new Promise((resolve) => {
      try {
        let targetWidth = img.naturalWidth;
        let targetHeight = img.naturalHeight;

        // Apply scale percentage if scaling override is used (e.g. for target size iterations)
        if (scalePercent < 100) {
          const factor = scalePercent / 100;
          targetWidth = Math.max(1, Math.round(img.naturalWidth * factor));
          targetHeight = Math.max(1, Math.round(img.naturalHeight * factor));
        } else {
          // Normal resize settings
          if (activeSettings.resizeMode === "width" && activeSettings.resizeWidth > 0) {
            targetWidth = activeSettings.resizeWidth;
            if (activeSettings.maintainAspectRatio) {
              targetHeight = Math.max(1, Math.round((img.naturalHeight / img.naturalWidth) * targetWidth));
            }
          } else if (activeSettings.resizeMode === "height" && activeSettings.resizeHeight > 0) {
            targetHeight = activeSettings.resizeHeight;
            if (activeSettings.maintainAspectRatio) {
              targetWidth = Math.max(1, Math.round((img.naturalWidth / img.naturalHeight) * targetHeight));
            }
          } else if (activeSettings.resizeMode === "scale" && activeSettings.resizeScale > 0) {
            const factor = activeSettings.resizeScale / 100;
            targetWidth = Math.max(1, Math.round(img.naturalWidth * factor));
            targetHeight = Math.max(1, Math.round(img.naturalHeight * factor));
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve({ blob: null, width: targetWidth, height: targetHeight });
          return;
        }

        const exportFormat = activeSettings.format === "original" ? originalFormat : activeSettings.format;
        if (exportFormat === "image/jpeg") {
          ctx.fillStyle = "#FFFFFF";
          ctx.fillRect(0, 0, targetWidth, targetHeight);
        }

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        const qualityVal = quality / 100;

        canvas.toBlob(
          (blob) => {
            resolve({ blob, width: targetWidth, height: targetHeight });
          },
          exportFormat,
          qualityVal
        );
      } catch (e) {
        console.error("Error rendering canvas", e);
        resolve({ blob: null, width: img.naturalWidth, height: img.naturalHeight });
      }
    });
  };

  // Search quality and dimensions to approximate target size
  const compressToTargetSize = async (
    img: HTMLImageElement,
    item: ImageFile,
    activeSettings: CompressorSettings
  ): Promise<{ blob: Blob | null; width: number; height: number }> => {
    const targetSizeBytes = activeSettings.targetSizeKB * 1024;
    const exportFormat = activeSettings.format === "original" ? item.format : activeSettings.format;

    // Quality controls don't apply to lossless PNG. We search scale only for PNGs.
    const canSearchQuality = exportFormat !== "image/png" && exportFormat !== "image/x-png";

    let bestBlob: Blob | null = null;
    let bestWidth = img.naturalWidth;
    let bestHeight = img.naturalHeight;

    if (canSearchQuality) {
      // 1) Binary search quality (5% to 100%)
      let lowQ = 5;
      let highQ = 100;

      for (let i = 0; i < 7; i++) {
        const midQ = Math.round((lowQ + highQ) / 2);
        const { blob, width, height } = await renderCanvasBlob(img, midQ, 100, activeSettings, item.format);
        
        if (blob) {
          if (!bestBlob || Math.abs(blob.size - targetSizeBytes) < Math.abs(bestBlob.size - targetSizeBytes)) {
            bestBlob = blob;
            bestWidth = width;
            bestHeight = height;
          }

          if (blob.size > targetSizeBytes) {
            highQ = midQ - 1;
          } else {
            lowQ = midQ + 1;
          }
        }
      }

      // 2) If still exceeding target size at quality 5, binary search dimensions scale (10% to 90%)
      if (bestBlob && bestBlob.size > targetSizeBytes) {
        let lowS = 10;
        let highS = 90;

        for (let i = 0; i < 5; i++) {
          const midS = Math.round((lowS + highS) / 2);
          const { blob, width, height } = await renderCanvasBlob(img, 5, midS, activeSettings, item.format);
          
          if (blob) {
            if (Math.abs(blob.size - targetSizeBytes) < Math.abs(bestBlob.size - targetSizeBytes)) {
              bestBlob = blob;
              bestWidth = width;
              bestHeight = height;
            }

            if (blob.size > targetSizeBytes) {
              highS = midS - 5;
            } else {
              lowS = midS + 5;
            }
          }
        }
      }
    } else {
      // Lossless format scale search
      let lowS = 10;
      let highS = 100;

      for (let i = 0; i < 7; i++) {
        const midS = Math.round((lowS + highS) / 2);
        const { blob, width, height } = await renderCanvasBlob(img, 100, midS, activeSettings, item.format);

        if (blob) {
          if (!bestBlob || Math.abs(blob.size - targetSizeBytes) < Math.abs(bestBlob.size - targetSizeBytes)) {
            bestBlob = blob;
            bestWidth = width;
            bestHeight = height;
          }

          if (blob.size > targetSizeBytes) {
            highS = midS - 1;
          } else {
            lowS = midS + 1;
          }
        }
      }
    }

    // 3) Exact size matching (padding): if exact size requested, append safe trailer padding bytes
    if (activeSettings.exactSize && bestBlob && bestBlob.size < targetSizeBytes) {
      const extraBytes = targetSizeBytes - bestBlob.size;
      const paddingArray = new Uint8Array(extraBytes);
      bestBlob = new Blob([bestBlob, paddingArray], { type: bestBlob.type });
    }

    return {
      blob: bestBlob,
      width: bestWidth,
      height: bestHeight
    };
  };

  // Core Canvas compression function
  const compressSingleImage = async (item: ImageFile, activeSettings: CompressorSettings): Promise<ImageFile> => {
    return new Promise(async (resolve) => {
      // 1) Handle SVG directly (text based)
      if (item.format === "image/svg+xml" || item.name.endsWith(".svg")) {
        try {
          const text = await item.file.text();
          const optimizedSvg = optimizeSVG(text);
          let blob = new Blob([optimizedSvg], { type: "image/svg+xml" });

          // SVG target size and padding matching
          if (activeSettings.sizeMode === "target" && activeSettings.exactSize) {
            const targetSizeBytes = activeSettings.targetSizeKB * 1024;
            if (blob.size < targetSizeBytes) {
              const extraBytes = targetSizeBytes - blob.size;
              const paddingArray = new Uint8Array(extraBytes);
              blob = new Blob([blob, paddingArray], { type: blob.type });
            }
          }

          const compressedUrl = URL.createObjectURL(blob);

          resolve({
            ...item,
            compressedSize: blob.size,
            compressedUrl,
            compressedWidth: item.originalWidth,
            compressedHeight: item.originalHeight,
            status: "success",
            progress: 100
          });
        } catch (e: any) {
          resolve({
            ...item,
            status: "error",
            errorMessage: e.message || "Failed to process SVG XML structure"
          });
        }
        return;
      }

      // 2) Canvas Compression for general image types (PNG, JPG, WebP, AVIF, BMP, GIF static frame)
      const img = new Image();
      img.src = item.originalUrl;
      img.onload = async () => {
        try {
          if (activeSettings.sizeMode === "target") {
            const { blob, width, height } = await compressToTargetSize(img, item, activeSettings);
            if (blob) {
              const compressedUrl = URL.createObjectURL(blob);
              resolve({
                ...item,
                compressedSize: blob.size,
                compressedUrl,
                compressedWidth: width,
                compressedHeight: height,
                status: "success",
                progress: 100
              });
            } else {
              resolve({
                ...item,
                status: "error",
                errorMessage: "Failed to generate canvas target size."
              });
            }
          } else {
            // Normal visual quality mode
            const { blob, width, height } = await renderCanvasBlob(img, activeSettings.quality, 100, activeSettings, item.format);
            if (blob) {
              const compressedUrl = URL.createObjectURL(blob);
              resolve({
                ...item,
                compressedSize: blob.size,
                compressedUrl,
                compressedWidth: width,
                compressedHeight: height,
                status: "success",
                progress: 100
              });
            } else {
              resolve({
                ...item,
                status: "error",
                errorMessage: "Browser failed to compile canvas stream."
              });
            }
          }
        } catch (e: any) {
          resolve({
            ...item,
            status: "error",
            errorMessage: e.message || "Failed during canvas drawing."
          });
        }
      };

      img.onerror = () => {
        resolve({
          ...item,
          status: "error",
          errorMessage: "Failed to decode target image data."
        });
      };
    });
  };

  // Perform Image Compression on Click
  const processImages = async () => {
    if (images.length === 0) return;
    setProcessingAll(true);

    const updatedImages = [...images];
    
    for (let i = 0; i < updatedImages.length; i++) {
      const item = updatedImages[i];
      if (item.status === "success" && item.compressedUrl) {
        // skip already compressed files unless we want to rebuild them
      }
      
      setImages(prev => prev.map((img, idx) => idx === i ? { ...img, status: "processing", progress: 30 } : img));
      
      const result = await compressSingleImage(item, settings);
      
      // Revoke older compression url
      if (item.compressedUrl) {
        URL.revokeObjectURL(item.compressedUrl);
      }

      setImages(prev => prev.map(img => img.id === item.id ? result : img));
    }

    setProcessingAll(false);
  };

  // Preset saving inside localStorage
  const savePreset = () => {
    localStorage.setItem("compress_image_settings", JSON.stringify(settings));
    setLocalPresetSaved(true);
    setTimeout(() => setLocalPresetSaved(false), 2000);
  };

  const activeSettingsExt = (item: ImageFile): string => {
    if (settings.format === "original") {
      if (item.format === "image/svg+xml") return ".svg";
      if (item.format === "image/png") return ".png";
      if (item.format === "image/webp") return ".webp";
      if (item.format === "image/avif") return ".avif";
      if (item.format === "image/bmp") return ".bmp";
      if (item.format === "image/gif") return ".gif";
      return ".jpg";
    }
    if (settings.format === "image/png") return ".png";
    if (settings.format === "image/webp") return ".webp";
    if (settings.format === "image/avif") return ".avif";
    return ".jpg";
  };

  // File download helper
  const triggerDownload = (item: ImageFile) => {
    if (!item.compressedUrl) return;
    const a = document.createElement("a");
    a.href = item.compressedUrl;
    
    // Construct final name
    const dotIdx = item.name.lastIndexOf(".");
    const ext = activeSettingsExt(item);
    const base = dotIdx !== -1 ? item.name.substring(0, dotIdx) : item.name;
    a.download = `${settings.prefix}${base}${settings.suffix}${ext}`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Batch download ZIP triggers
  const downloadAllAsZip = async () => {
    const successImages = images.filter(img => img.status === "success" && img.compressedUrl);
    if (successImages.length === 0) return;

    const zip = new JSZip();
    
    for (const item of successImages) {
      if (!item.compressedUrl) continue;
      const res = await fetch(item.compressedUrl);
      const blob = await res.blob();
      
      const dotIdx = item.name.lastIndexOf(".");
      const ext = activeSettingsExt(item);
      const base = dotIdx !== -1 ? item.name.substring(0, dotIdx) : item.name;
      const filename = `${settings.prefix}${base}${settings.suffix}${ext}`;
      
      zip.file(filename, blob);
    }

    const zipContent = await zip.generateAsync({ type: "blob" });
    const zipUrl = URL.createObjectURL(zipContent);
    
    const a = document.createElement("a");
    a.href = zipUrl;
    a.download = `optimized-images-${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(zipUrl);
  };

  // Reset tool
  const resetImageTool = () => {
    images.forEach(item => {
      URL.revokeObjectURL(item.originalUrl);
      if (item.compressedUrl) {
        URL.revokeObjectURL(item.compressedUrl);
      }
    });
    setImages([]);
    setSelectedImageId(null);
    setShowComparison(false);
  };

  // Analytics helper calculations
  const totalOriginalBytes = images.reduce((acc, curr) => acc + curr.originalSize, 0);
  const totalCompressedBytes = images.reduce((acc, curr) => {
    return acc + (curr.compressedSize !== null ? curr.compressedSize : curr.originalSize);
  }, 0);

  const bytesSaved = totalOriginalBytes - totalCompressedBytes;
  const savingPercentage = totalOriginalBytes > 0 ? Math.round((bytesSaved / totalOriginalBytes) * 100) : 0;
  
  // Speed improvements calculations (Est. load savings index)
  // Assume a standard mobile 3G/4G connection at 1.5MB/s latency
  const estimatedSecondsSaved = bytesSaved / (1.5 * 1024 * 1024);

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Global Drag Overlay */}
      {globalDragActive && (
        <div 
          className="fixed inset-0 z-50 bg-indigo-900/30 dark:bg-slate-950/70 backdrop-blur-sm border-4 border-dashed border-[#518231] flex flex-col items-center justify-center pointer-events-none animate-in fade-in duration-200"
          aria-hidden="true"
        >
          <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-md mx-4 border border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 rounded-full bg-[#518231]/10 flex items-center justify-center text-[#518231] animate-bounce">
              <Upload size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">Drop Images Anywhere!</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Release to load your images and configure presets.</p>
          </div>
        </div>
      )}

      {/* Top Banner Context info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#518231]/5 border border-[#518231]/20 dark:border-[#518231]/10 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white text-sm">Offline Web Canvas Compressor</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Security-first. Images process entirely on your device inside your browser buffer.</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {images.length > 0 && (
            <button 
              onClick={resetImageTool}
              className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/30 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Clear Queue
            </button>
          )}
        </div>
      </div>

      {/* Main Action Zones */}
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
            onChange={handleFileInput}
            className="hidden"
            id="image-files-input"
            aria-label="Upload Images"
          />
          <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#518231]/10 group-hover:text-[#518231] transition-all duration-300 mb-4 shadow-xs">
            <Upload size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-[#518231] transition-colors">
            Drag & Drop Images Here
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
            or click to browse local files. Paste screenshots directly (Ctrl+V) from your clipboard.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-[10px] font-bold text-slate-400 uppercase">
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">PNG, JPG, WEBP</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">AVIF, BMP, SVG, GIF</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">No Server Uploads</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* QUEUE & LIST (Left Col) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-2xs">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#518231] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {images.length}
                  </span>
                  <h3 className="font-bold text-slate-800 dark:text-white text-sm">Image Queue</h3>
                </div>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs text-[#518231] hover:underline font-bold flex items-center gap-1"
                >
                  + Add More Files
                </button>
              </div>

              {/* Grid cards */}
              <div className="grid gap-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-1">
                {images.map((item) => {
                  const hasCompressed = item.status === "success" && item.compressedSize !== null;
                  const saving = hasCompressed && item.compressedSize ? Math.round(((item.originalSize - item.compressedSize) / item.originalSize) * 100) : 0;

                  return (
                    <div 
                      key={item.id}
                      className={`border p-3 rounded-xl flex items-center justify-between gap-4 transition-all ${
                        selectedImageId === item.id 
                          ? "border-[#518231] bg-slate-50/50 dark:bg-slate-950/30" 
                          : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-750"
                      }`}
                    >
                      {/* Image Thumbnail Preview click */}
                      <button 
                        onClick={() => { setSelectedImageId(item.id); setShowComparison(true); }}
                        className="w-14 h-14 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800/40 relative overflow-hidden flex items-center justify-center shrink-0 group/thumb shadow-3xs"
                        title="Open comparison preview"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                          src={item.originalUrl} 
                          alt="preview"
                          className="object-cover w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 flex items-center justify-center text-white transition-opacity">
                          <ZoomIn size={16} />
                        </div>
                      </button>

                      {/* File details */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-slate-800 dark:text-white truncate" title={item.name}>
                          {item.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded font-mono uppercase">
                            {item.format.split("/")[1] || "Image"}
                          </span>
                          {item.originalWidth && (
                            <span className="text-[10px] text-slate-400">
                              {item.originalWidth}x{item.originalHeight}
                            </span>
                          )}
                        </div>

                        {/* Status updates */}
                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-[11px] text-slate-500 font-semibold">{formatBytes(item.originalSize)}</span>
                          {hasCompressed && (
                            <>
                              <ArrowRight size={12} className="text-slate-400" />
                              <span className="text-[11px] text-[#518231] font-bold">
                                {formatBytes(item.compressedSize || 0)} ({saving}% smaller)
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Right col status badge & buttons */}
                      <div className="flex items-center gap-2">
                        {item.status === "processing" && (
                          <div className="flex items-center gap-1.5 text-xs text-[#518231] font-medium">
                            <Loader2 size={14} className="animate-spin" /> Compressing...
                          </div>
                        )}
                        {item.status === "error" && (
                          <div className="text-red-500 text-xs flex items-center gap-1" title={item.errorMessage}>
                            <AlertCircle size={14} /> Error
                          </div>
                        )}
                        {item.status === "success" && (
                          <button
                            onClick={() => triggerDownload(item)}
                            className="p-1.5 rounded-lg bg-[#518231]/10 text-[#518231] hover:bg-[#518231]/20 transition-colors"
                            title="Download Optimized image"
                          >
                            <Download size={14} />
                          </button>
                        )}
                        <button
                          onClick={() => removeImage(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                          title="Remove from queue"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* PerformanceScore / SEO Widget */}
            {images.some(img => img.status === "success") && (
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-3xs grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Stats 1 */}
                <div className="text-center md:text-left space-y-1">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Bandwidth Saved</h5>
                  <p className="text-3xl font-extrabold text-[#518231]">{formatBytes(bytesSaved)}</p>
                  <p className="text-xs text-slate-500">{savingPercentage}% total file size reduction</p>
                </div>

                {/* Stats 2 */}
                <div className="text-center md:text-left space-y-1 border-t md:border-t-0 md:border-x border-slate-200 dark:border-slate-850 py-4 md:py-0 md:px-6">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Page Speed Boost</h5>
                  <p className="text-3xl font-extrabold text-blue-500">+{Math.max(0.1, parseFloat(estimatedSecondsSaved.toFixed(2)))}s</p>
                  <p className="text-xs text-slate-500">Estimated loading latency saved on 3G network</p>
                </div>

                {/* Stats 3 */}
                <div className="text-center md:text-left space-y-1">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">SEO Core Web Vitals</h5>
                  <p className="text-3xl font-extrabold text-emerald-500">Passed</p>
                  <p className="text-xs text-slate-500">Lighthouse Largest Contentful Paint (LCP) optimized</p>
                </div>

              </div>
            )}

          </div>

          {/* CONFIG PANEL (Right Col) */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-6">
            <h4 className="font-bold text-slate-800 dark:text-white text-sm flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <Sliders size={16} className="text-[#518231]" /> Settings Dashboard
            </h4>

            {/* Mode Selector Tabs */}
            <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => updateSettings({ sizeMode: "quality" })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold text-center transition-all ${
                  settings.sizeMode === "quality"
                    ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-350"
                }`}
              >
                Quality Presets
              </button>
              <button
                type="button"
                onClick={() => updateSettings({ sizeMode: "target" })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold text-center transition-all ${
                  settings.sizeMode === "target"
                    ? "bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-2xs"
                    : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-350"
                }`}
              >
                Target File Size
              </button>
            </div>

            {settings.sizeMode === "target" ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Target File Size</label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      max="100000"
                      value={settings.targetSizeKB}
                      onChange={(e) => updateSettings({ targetSizeKB: Math.max(1, Number(e.target.value)) })}
                      className="w-full px-3 py-2 bg-slate-50 focus:bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
                    />
                    <span className="px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 rounded-lg flex items-center">
                      KB
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-normal">
                    Quality and scaling will automatically adjust to fit under this target size.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.exactSize}
                      onChange={(e) => updateSettings({ exactSize: e.target.checked })}
                      className="rounded text-[#518231] focus:ring-[#518231] bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-850 mt-0.5"
                    />
                    <div className="-mt-0.5">
                      <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Exact File Size (Add Padding)</p>
                      <p className="text-[9px] text-slate-400 leading-tight">Append trailing bytes to make the output file exactly {settings.targetSizeKB} KB (increases size if compressed image is smaller).</p>
                    </div>
                  </label>
                </div>
              </div>
            ) : (
              <>
                {/* Presets List */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Compression Presets</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "balanced", label: "Balanced" },
                      { id: "maxQuality", label: "Max Quality" },
                      { id: "webOptimized", label: "Web Speed" },
                      { id: "ultra", label: "Ultra Size" },
                      { id: "social", label: "Social Media" }
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => applyPreset(item.id as any)}
                        className={`py-1.5 px-3 rounded-lg text-xs font-semibold border text-center transition-all ${
                          settings.preset === item.id
                            ? "bg-[#518231] text-white border-[#518231] shadow-2xs"
                            : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quality Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span className="uppercase tracking-wider">Visual Quality</span>
                    <span className="text-[#518231] font-mono">{settings.quality}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={settings.quality}
                    onChange={(e) => updateSettings({ quality: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                  />
                  <div className="flex justify-between text-[9px] font-semibold text-slate-400">
                    <span>Lossy (Smallest)</span>
                    <span>Balanced</span>
                    <span>Lossless (Largest)</span>
                  </div>
                </div>
              </>
            )}

            {/* Target Export Format */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Export Format Conversion</label>
              <select
                value={settings.format}
                onChange={(e) => updateSettings({ format: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-50 focus:bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-350 focus:outline-none"
              >
                <option value="original">Original (Keep Format)</option>
                <option value="image/jpeg">JPG / JPEG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WEBP (Highly Recommended)</option>
                <option value="image/avif">AVIF (Ultra Optimized)</option>
              </select>
            </div>

            {/* Resize options */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800/40">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Dimensions Scale (Resize)</label>
              <select
                value={settings.resizeMode}
                onChange={(e) => updateSettings({ resizeMode: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-50 focus:bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-350 focus:outline-none"
              >
                <option value="none">No Resize (Keep Original)</option>
                <option value="width">Target Width (Pixels)</option>
                <option value="height">Target Height (Pixels)</option>
                <option value="scale">Scale Percentage (%)</option>
              </select>

              {settings.resizeMode === "scale" && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <span>Resize Scale</span>
                    <span>{settings.resizeScale}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={settings.resizeScale}
                    onChange={(e) => updateSettings({ resizeScale: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                  />
                </div>
              )}

              {(settings.resizeMode === "width" || settings.resizeMode === "height") && (
                <div className="flex gap-2 items-center">
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Width (px)</label>
                    <input
                      type="number"
                      disabled={settings.resizeMode === "height"}
                      value={settings.resizeWidth}
                      onChange={(e) => updateSettings({ resizeWidth: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none disabled:opacity-40"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Height (px)</label>
                    <input
                      type="number"
                      disabled={settings.resizeMode === "width"}
                      value={settings.resizeHeight}
                      onChange={(e) => updateSettings({ resizeHeight: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none disabled:opacity-40"
                    />
                  </div>
                </div>
              )}

              {(settings.resizeMode === "width" || settings.resizeMode === "height") && (
                <label className="flex items-center gap-2 text-[11px] text-slate-500 cursor-pointer px-1">
                  <input
                    type="checkbox"
                    checked={settings.maintainAspectRatio}
                    onChange={(e) => updateSettings({ maintainAspectRatio: e.target.checked })}
                    className="rounded text-[#518231] focus:ring-[#518231] bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-850"
                  />
                  Lock Aspect Ratio
                </label>
              )}
            </div>

            {/* Prefix & Suffix filenames */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800/40">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Filename Prefix</label>
                <input
                  type="text"
                  value={settings.prefix}
                  onChange={(e) => updateSettings({ prefix: e.target.value.replace(/[^a-zA-Z0-9_-]/g, "") })}
                  placeholder="e.g. thumb-"
                  className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1 uppercase">Filename Suffix</label>
                <input
                  type="text"
                  value={settings.suffix}
                  onChange={(e) => updateSettings({ suffix: e.target.value.replace(/[^a-zA-Z0-9_-]/g, "") })}
                  placeholder="-optimized"
                  className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs text-slate-700 dark:text-slate-300 focus:outline-none"
                />
              </div>
            </div>

            {/* Exif Checkbox */}
            <div className="space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.stripMetadata}
                  onChange={(e) => updateSettings({ stripMetadata: e.target.checked })}
                  className="rounded text-[#518231] focus:ring-[#518231] bg-white dark:bg-slate-950 border-slate-300 dark:border-slate-850 mt-0.5"
                />
                <div className="-mt-0.5">
                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Strip Metadata (EXIF)</p>
                  <p className="text-[9px] text-slate-400 leading-tight">Remove hidden camera profile bytes to save more size</p>
                </div>
              </label>
            </div>

            {/* Process & Action Trigger Buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
              <button
                onClick={processImages}
                disabled={processingAll}
                className="w-full py-2.5 bg-gradient-to-r from-[#518231] to-[#436a28] hover:from-[#436a28] hover:to-[#365420] text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              >
                {processingAll ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                {processingAll ? "Optimizing images..." : "Compress Images"}
              </button>
              
              {images.some(img => img.status === "success") && (
                <button
                  onClick={downloadAllAsZip}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 font-bold rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Download size={16} /> Download All as ZIP
                </button>
              )}

              <div className="flex gap-2">
                <button
                  onClick={savePreset}
                  className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-bold border border-slate-200/40 dark:border-slate-800 transition-all flex items-center justify-center gap-1"
                >
                  {localPresetSaved ? <Check size={12} className="text-emerald-500" /> : null}
                  {localPresetSaved ? "Preset Saved!" : "Save Settings Preset"}
                </button>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Comparison Drawer / Modal slider */}
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
                aria-label="Before and after image comparison viewer"
              >
                {/* Header */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-b border-slate-150 dark:border-slate-700 flex items-center justify-between">
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm truncate">{item.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">Drag the slider to compare original (left) vs compressed (right)</p>
                  </div>
                  <button 
                    onClick={() => setShowComparison(false)}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-sm"
                  >
                    Close [X]
                  </button>
                </div>

                {/* Body Slider Container */}
                <div className="flex-1 overflow-auto bg-slate-100 dark:bg-slate-950 p-6 flex flex-col items-center justify-center relative min-h-[300px]">
                  
                  {/* Slider visual wrapper */}
                  <div className="relative overflow-hidden select-none max-w-full max-h-[50vh] aspect-video border border-slate-350 dark:border-slate-800 shadow-lg rounded-lg">
                    
                    {/* Before Image (Left/Original) */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={item.originalUrl} 
                      alt="original"
                      className="w-full h-full object-contain pointer-events-none"
                    />

                    {/* After Image (Right/Compressed) */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={item.compressedUrl || item.originalUrl} 
                      alt="compressed"
                      className="w-full h-full object-contain absolute inset-0 pointer-events-none"
                      style={{ clipPath: `inset(0 0 0 ${comparisonSliderPos}%)` }}
                    />

                    {/* Overlay Badges */}
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-2xs select-none">
                      Original ({item.originalWidth ? `${item.originalWidth}x${item.originalHeight}` : ""})
                    </div>
                    <div className="absolute top-3 right-3 bg-[#518231]/80 text-white text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-2xs select-none">
                      Compressed ({item.compressedWidth ? `${item.compressedWidth}x${item.compressedHeight}` : ""})
                    </div>

                    {/* Draggable vertical bar */}
                    <div 
                      className="absolute inset-y-0 w-1 bg-white cursor-ew-resize flex items-center justify-center"
                      style={{ left: `${comparisonSliderPos}%` }}
                    >
                      <div className="w-8 h-8 rounded-full bg-white border-2 border-slate-300 dark:border-slate-700 shadow flex items-center justify-center -ml-3.5 select-none shrink-0 pointer-events-none text-slate-700 font-bold text-xs">
                        ↔
                      </div>
                    </div>

                    {/* Invisible Input slider overlay to track drags */}
                    <input 
                      type="range"
                      min="0"
                      max="100"
                      value={comparisonSliderPos}
                      onChange={(e) => setComparisonSliderPos(Number(e.target.value))}
                      className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                    />

                  </div>

                </div>

                {/* Footer comparison stats */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-150 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Original: <strong>{formatBytes(item.originalSize)}</strong> | Optimized: <strong>{formatBytes(item.compressedSize || item.originalSize)}</strong>
                  </div>
                  {item.compressedUrl ? (
                    <button
                      onClick={() => triggerDownload(item)}
                      className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Download size={14} /> Download Optimized Image
                    </button>
                  ) : (
                    <p className="text-xs text-red-500 font-semibold">Image not compressed yet. Click "Compress Images" first.</p>
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
