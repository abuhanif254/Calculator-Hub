"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Upload, Trash2, Download, RefreshCw, Sliders, Eye, EyeOff, 
  CheckCircle2, AlertCircle, Loader2, Sparkles, Plus, X, 
  ShieldCheck, Info, FileImage, FileDown, Check, Play, Settings,
  Lock, Copy, ChevronDown, ChevronRight, Code, Columns, Layers,
  Sparkle, Maximize, FileCode, CheckSquare, Palette, RefreshCcw,
  Star, History, Laptop, Smartphone, Search
} from "lucide-react";
import JSZip from 'jszip';
import { decodeIco, isIco } from 'icojs';

interface IcoSubImage {
  width: number;
  height: number;
  bpp: number;
  type: 'png' | 'bmp';
  pngUrl: string;
  pngBlob: Blob;
  pngSize: number;
  isFavorite?: boolean;
}

interface QueueItem {
  id: string;
  name: string;
  size: number;
  status: 'idle' | 'parsing' | 'success' | 'error';
  images: IcoSubImage[];
  errorMsg?: string;
}

interface ExportHistoryItem {
  fileName: string;
  originalSize: number;
  extractedCount: number;
  timestamp: number;
}

export function IcoToPngTool() {
  // Queue state
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // Settings
  const [extractionMode, setExtractionMode] = useState<'all' | 'selected' | 'largest' | 'smallest'>('all');
  const [scaleFactor, setScaleFactor] = useState<number>(1); // 1x, 2x, 3x, 4x Retina
  const [scaleFilter, setScaleFilter] = useState<'smooth' | 'pixelated'>('smooth');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, boolean>>({}); // e.g. "32x32": true

  // UI state
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'developer' | 'history'>('editor');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [previewSize, setPreviewSize] = useState<string>(''); // WidthxHeight of the active image to show in live preview
  const [tabText, setTabText] = useState<string>('My Awesome Website');
  const [bookmarkLabel, setBookmarkLabel] = useState<string>('Nexus App');
  const [showNotification, setShowNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  
  // Local storage states
  const [favoriteSizes, setFavoriteSizes] = useState<string[]>(['16x16', '32x32', '256x256']);
  const [exportHistory, setExportHistory] = useState<ExportHistoryItem[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Retrieve active item
  const activeItem = useMemo(() => {
    return queue.find(item => item.id === activeItemId) || null;
  }, [queue, activeItemId]);

  // Read preferences and history from LocalStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFavs = localStorage.getItem('ico_to_png_favorites');
      if (storedFavs) {
        try {
          setFavoriteSizes(JSON.parse(storedFavs));
        } catch (_) {}
      }

      const storedHistory = localStorage.getItem('ico_to_png_history');
      if (storedHistory) {
        try {
          setExportHistory(JSON.parse(storedHistory));
        } catch (_) {}
      }

      const storedMode = localStorage.getItem('ico_to_png_mode');
      if (storedMode) setExtractionMode(storedMode as any);

      const storedScale = localStorage.getItem('ico_to_png_scale');
      if (storedScale) setScaleFactor(Number(storedScale));

      const storedFilter = localStorage.getItem('ico_to_png_filter');
      if (storedFilter) setScaleFilter(storedFilter as any);
    }
  }, []);

  // Save preference helper
  const savePreference = (key: string, value: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    }
  };

  // Notification helper
  const triggerNotification = (type: 'success' | 'error', message: string) => {
    setShowNotification({ type, message });
    setTimeout(() => {
      setShowNotification(null);
    }, 4000);
  };

  // Convert BMP raw RGBA data to PNG Blob via offscreen canvas
  const bmpToPngBlob = (buffer: ArrayBuffer, width: number, height: number): Promise<{ blob: Blob; url: string }> => {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error("Could not create canvas 2D context"));
          return;
        }

        const imageData = ctx.createImageData(width, height);
        // Copy RGBA bytes
        const uint8Array = new Uint8Array(buffer);
        imageData.data.set(uint8Array);
        ctx.putImageData(imageData, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            resolve({ blob, url });
          } else {
            reject(new Error("Failed to export canvas to PNG blob"));
          }
        }, 'image/png');
      } catch (err) {
        reject(err);
      }
    });
  };

  // Parse a single ICO file
  const parseIcoFile = async (file: File): Promise<QueueItem> => {
    try {
      const buffer = await file.arrayBuffer();
      if (!isIco(buffer)) {
        return {
          id: String(Date.now()) + Math.random(),
          name: file.name,
          size: file.size,
          status: 'error',
          images: [],
          errorMsg: "Invalid file format. The file is not a valid ICO icon."
        };
      }

      // Decode the ICO file using icojs
      const decodedImages = await decodeIco(buffer);
      const subImages: IcoSubImage[] = [];

      for (let i = 0; i < decodedImages.length; i++) {
        const img = decodedImages[i];
        let pngBlob: Blob;
        let pngUrl: string;

        if (img.type === 'png') {
          // It's already encoded as PNG inside the ICO, extract bytes directly
          pngBlob = new Blob([img.buffer], { type: 'image/png' });
          pngUrl = URL.createObjectURL(pngBlob);
        } else {
          // BMP type - convert raw RGBA to PNG
          const res = await bmpToPngBlob(img.buffer, img.width, img.height);
          pngBlob = res.blob;
          pngUrl = res.url;
        }

        subImages.push({
          width: img.width,
          height: img.height,
          bpp: img.bpp,
          type: img.type,
          pngBlob,
          pngUrl,
          pngSize: pngBlob.size,
          isFavorite: favoriteSizes.includes(`${img.width}x${img.height}`)
        });
      }

      // Sort by size ascending
      subImages.sort((a, b) => a.width - b.width);

      return {
        id: String(Date.now()) + Math.random(),
        name: file.name,
        size: file.size,
        status: 'success',
        images: subImages
      };
    } catch (err: any) {
      return {
        id: String(Date.now()) + Math.random(),
        name: file.name,
        size: file.size,
        status: 'error',
        images: [],
        errorMsg: err?.message || "Failed to parse ICO file structures."
      };
    }
  };

  // Handle file uploads
  const handleFiles = async (files: FileList) => {
    const newItems: QueueItem[] = [];
    
    // Filter out non-ICO files
    const icoFiles: File[] = [];
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      // CUR files are structurally identical, allow curate if user wants
      if (f.name.endsWith('.ico') || f.name.endsWith('.cur')) {
        icoFiles.push(f);
      } else {
        triggerNotification('error', `Unsupported file type: ${f.name}`);
      }
    }

    if (icoFiles.length === 0) return;

    // Set temporary items in queue with loading status
    const tempItems = icoFiles.map(file => ({
      id: file.name + '-' + Date.now(),
      name: file.name,
      size: file.size,
      status: 'parsing' as const,
      images: []
    }));

    setQueue(prev => [...prev, ...tempItems]);

    // Parse each file
    for (let i = 0; i < icoFiles.length; i++) {
      const file = icoFiles[i];
      const parsed = await parseIcoFile(file);
      
      setQueue(prev => prev.map(item => item.name === file.name && item.status === 'parsing' ? parsed : item));
      
      if (parsed.status === 'success') {
        if (!activeItemId) {
          setActiveItemId(parsed.id);
        }
      }
    }
  };

  // Select first image size as default preview size when activeItem changes
  useEffect(() => {
    if (activeItem && activeItem.images.length > 0) {
      // Find largest image or standard 256x256 / 32x32 if present
      const sorted = [...activeItem.images].sort((a, b) => b.width - a.width);
      setPreviewSize(`${sorted[0].width}x${sorted[0].height}`);

      // Sync active sizes into selected sizes defaults
      const defaults: Record<string, boolean> = {};
      activeItem.images.forEach(img => {
        const key = `${img.width}x${img.height}`;
        defaults[key] = true; // Select all by default
      });
      setSelectedSizes(defaults);
    } else {
      setPreviewSize('');
    }
  }, [activeItemId]);

  // Handle Drag & Drop
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
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Upscale a PNG blob using dynamic canvas scaling
  const upscalePng = (image: IcoSubImage, factor: number, filter: 'smooth' | 'pixelated'): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      if (factor === 1) {
        resolve(image.pngBlob);
        return;
      }

      const img = new Image();
      img.src = image.pngUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width * factor;
        canvas.height = image.height * factor;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error("Canvas context is unavailable"));
          return;
        }

        if (filter === 'pixelated') {
          ctx.imageSmoothingEnabled = false;
          // Standard style settings
          canvas.style.imageRendering = 'pixelated';
        } else {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
        }

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas toBlob output is empty"));
          }
        }, 'image/png');
      };
      img.onerror = () => {
        reject(new Error("Failed to load source image for scaling"));
      };
    });
  };

  // Download a single extracted image
  const downloadSingleImage = async (image: IcoSubImage, fileName: string) => {
    try {
      const upscaledBlob = await upscalePng(image, scaleFactor, scaleFilter);
      const url = URL.createObjectURL(upscaledBlob);
      const link = document.createElement('a');
      const suffix = scaleFactor > 1 ? `_${image.width * scaleFactor}x${image.height * scaleFactor}_${scaleFactor}x` : `_${image.width}x${image.height}`;
      link.href = url;
      link.download = `${fileName.replace(/\.(ico|cur)$/i, '')}${suffix}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Add to export history
      addHistoryItem(fileName, 1);
      triggerNotification('success', `Downloaded ${image.width}x${image.height} PNG!`);
    } catch (err: any) {
      triggerNotification('error', `Download failed: ${err?.message}`);
    }
  };

  // Add history item
  const addHistoryItem = (name: string, count: number) => {
    const newItem: ExportHistoryItem = {
      fileName: name,
      originalSize: queue.find(item => item.name === name)?.size || 0,
      extractedCount: count,
      timestamp: Date.now()
    };

    setExportHistory(prev => {
      const updated = [newItem, ...prev.slice(0, 19)]; // limit to 20 entries
      savePreference('ico_to_png_history', updated);
      return updated;
    });
  };

  // Toggle favorite size
  const toggleFavoriteSize = (sizeKey: string) => {
    setFavoriteSizes(prev => {
      let updated: string[];
      if (prev.includes(sizeKey)) {
        updated = prev.filter(s => s !== sizeKey);
        triggerNotification('success', `Removed ${sizeKey} from favorites.`);
      } else {
        updated = [...prev, sizeKey];
        triggerNotification('success', `Added ${sizeKey} to favorites.`);
      }
      savePreference('ico_to_png_favorites', updated);
      return updated;
    });
  };

  // Get active images based on selected extraction mode
  const getImagesToExport = (item: QueueItem): IcoSubImage[] => {
    if (item.images.length === 0) return [];
    
    switch (extractionMode) {
      case 'largest':
        return [[...item.images].sort((a, b) => b.width - a.width)[0]];
      case 'smallest':
        return [[...item.images].sort((a, b) => a.width - b.width)[0]];
      case 'selected':
        return item.images.filter(img => selectedSizes[`${img.width}x${img.height}`]);
      case 'all':
      default:
        return item.images;
    }
  };

  // Process and download images for the active file
  const downloadActiveImages = async () => {
    if (!activeItem || activeItem.images.length === 0) return;

    const targets = getImagesToExport(activeItem);
    if (targets.length === 0) {
      triggerNotification('error', "No sizes are currently selected for export.");
      return;
    }

    if (targets.length === 1) {
      // Download single directly
      await downloadSingleImage(targets[0], activeItem.name);
      return;
    }

    // Zip and export
    try {
      const zip = new JSZip();
      const folder = zip.folder(activeItem.name.replace(/\.(ico|cur)$/i, '') + '_pngs');
      
      for (let i = 0; i < targets.length; i++) {
        const img = targets[i];
        const upscaledBlob = await upscalePng(img, scaleFactor, scaleFilter);
        const suffix = scaleFactor > 1 ? `_${img.width * scaleFactor}x${img.height * scaleFactor}_${scaleFactor}x` : `_${img.width}x${img.height}`;
        folder?.file(`${activeItem.name.replace(/\.(ico|cur)$/i, '')}${suffix}.png`, upscaledBlob);
      }

      const zipContent = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipContent);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${activeItem.name.replace(/\.(ico|cur)$/i, '')}_extracted_pngs.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      addHistoryItem(activeItem.name, targets.length);
      triggerNotification('success', `Exported ${targets.length} images to ZIP package!`);
    } catch (err: any) {
      triggerNotification('error', `ZIP export failed: ${err?.message}`);
    }
  };

  // Export all items in the queue as a single combined ZIP
  const exportAllQueueToZip = async () => {
    const successItems = queue.filter(item => item.status === 'success' && item.images.length > 0);
    if (successItems.length === 0) {
      triggerNotification('error', "No successfully parsed images in the queue.");
      return;
    }

    try {
      const zip = new JSZip();
      
      for (let i = 0; i < successItems.length; i++) {
        const item = successItems[i];
        const targets = getImagesToExport(item);
        if (targets.length === 0) continue;

        const subFolder = zip.folder(item.name.replace(/\.(ico|cur)$/i, ''));
        
        for (let j = 0; j < targets.length; j++) {
          const img = targets[j];
          const upscaledBlob = await upscalePng(img, scaleFactor, scaleFilter);
          const suffix = scaleFactor > 1 ? `_${img.width * scaleFactor}x${img.height * scaleFactor}_${scaleFactor}x` : `_${img.width}x${img.height}`;
          subFolder?.file(`${item.name.replace(/\.(ico|cur)$/i, '')}${suffix}.png`, upscaledBlob);
        }
      }

      const zipContent = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipContent);
      const link = document.createElement('a');
      link.href = url;
      link.download = `batch_extracted_icons_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Record items in history
      successItems.forEach(item => {
        addHistoryItem(item.name, getImagesToExport(item).length);
      });

      triggerNotification('success', `Successfully compiled ZIP archive for all files!`);
    } catch (err: any) {
      triggerNotification('error', `ZIP batch export failed: ${err?.message}`);
    }
  };

  // Format file size
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Determine standard favicon health check results
  const faviconAnalysis = useMemo(() => {
    if (!activeItem || activeItem.images.length === 0) return null;
    
    const sizes = activeItem.images.map(img => img.width);
    const has16 = sizes.includes(16);
    const has32 = sizes.includes(32);
    const has48 = sizes.includes(48);
    const has128 = sizes.includes(128);
    const has256 = sizes.includes(256);

    const score = [has16, has32, has48, has128, has256].filter(Boolean).length;
    let rating = "Poor";
    let color = "text-red-500 border-red-500 bg-red-50 dark:bg-red-950/20";
    if (score >= 4) {
      rating = "Excellent";
      color = "text-green-500 border-green-500 bg-green-50 dark:bg-green-950/20";
    } else if (score >= 2) {
      rating = "Standard";
      color = "text-amber-500 border-amber-500 bg-amber-50 dark:bg-amber-950/20";
    }

    return {
      has16, has32, has48, has128, has256, score, rating, color
    };
  }, [activeItem]);

  // Selected image object for Live Preview
  const selectedPreviewImage = useMemo(() => {
    if (!activeItem || activeItem.images.length === 0 || !previewSize) return null;
    const [w, h] = previewSize.split('x').map(Number);
    return activeItem.images.find(img => img.width === w && img.height === h) || activeItem.images[0];
  }, [activeItem, previewSize]);

  // Handle setting active modes and saving
  const handleModeChange = (mode: typeof extractionMode) => {
    setExtractionMode(mode);
    savePreference('ico_to_png_mode', mode);
  };

  const handleScaleChange = (scale: number) => {
    setScaleFactor(scale);
    savePreference('ico_to_png_scale', scale);
  };

  const handleFilterChange = (filter: typeof scaleFilter) => {
    setScaleFilter(filter);
    savePreference('ico_to_png_filter', filter);
  };

  const clearQueue = () => {
    // Revoke object URLs to prevent memory leak
    queue.forEach(item => {
      item.images.forEach(img => URL.revokeObjectURL(img.pngUrl));
    });
    setQueue([]);
    setActiveItemId(null);
  };

  const removeQueueItem = (id: string) => {
    const item = queue.find(i => i.id === id);
    if (item) {
      item.images.forEach(img => URL.revokeObjectURL(img.pngUrl));
    }
    setQueue(prev => prev.filter(i => i.id !== id));
    if (activeItemId === id) {
      const remaining = queue.filter(i => i.id !== id);
      setActiveItemId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {showNotification && (
        <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl border shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 ${
          showNotification.type === 'success' 
            ? 'bg-green-50 dark:bg-green-950/90 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800' 
            : 'bg-red-50 dark:bg-red-950/90 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800'
        }`}>
          {showNotification.type === 'success' ? <CheckCircle2 size={18} className="text-green-500 shrink-0" /> : <AlertCircle size={18} className="text-red-500 shrink-0" />}
          <span className="text-sm font-semibold">{showNotification.message}</span>
        </div>
      )}

      {/* Main Studio Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Upload & Queue Manager (Column Span 4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Upload size={16} className="text-[#518231]" />
              Upload Icon Files
            </h3>
            
            {/* Drag & Drop Area */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 select-none ${
                dragActive 
                  ? 'border-[#518231] bg-[#518231]/5' 
                  : 'border-slate-300 dark:border-slate-700 hover:border-[#518231] dark:hover:border-[#518231] bg-white dark:bg-slate-900/60'
              }`}
            >
              <input 
                ref={fileInputRef}
                type="file"
                multiple
                accept=".ico,.cur"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center animate-pulse">
                <FileImage size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Drag & drop .ICO / .CUR files here
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  or click to browse from device
                </p>
              </div>
              <div className="flex gap-2 text-[10px] bg-slate-50 dark:bg-slate-800 px-2.5 py-1 rounded-md text-slate-500 font-semibold border border-slate-100 dark:border-slate-700">
                <span>Supports multi-size packages</span>
              </div>
            </div>

            {/* Privacy statement banner */}
            <div className="flex gap-2.5 p-3 rounded-lg bg-[#518231]/5 dark:bg-[#518231]/10 border border-[#518231]/20">
              <ShieldCheck size={16} className="text-[#518231] shrink-0 mt-0.5" />
              <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal">
                <span className="font-bold text-[#518231] block">100% Client-Side Protection</span>
                Your files remain private. All processing happens in your browser. No files are uploaded to any server.
              </div>
            </div>
          </div>

          {/* Queue List */}
          {queue.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                  Conversion Queue ({queue.length})
                </span>
                <button 
                  onClick={clearQueue}
                  className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                >
                  <Trash2 size={13} />
                  Clear All
                </button>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[300px] overflow-y-auto custom-scrollbar">
                {queue.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => item.status === 'success' && setActiveItemId(item.id)}
                    className={`p-4 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      activeItemId === item.id 
                        ? 'bg-slate-50 dark:bg-slate-800/60 border-l-4 border-[#518231]' 
                        : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30'
                    }`}
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate flex items-center gap-1">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400">
                        <span>{formatBytes(item.size)}</span>
                        {item.status === 'success' && (
                          <>
                            <span>•</span>
                            <span className="text-[#518231] font-semibold">
                              {item.images.length} frames detected
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.status === 'parsing' && (
                        <Loader2 size={14} className="text-[#518231] animate-spin" />
                      )}
                      {item.status === 'success' && (
                        <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center">
                          <Check size={11} strokeWidth={3} />
                        </div>
                      )}
                      {item.status === 'error' && (
                        <div className="w-5 h-5 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center" title={item.errorMsg}>
                          <X size={11} strokeWidth={3} />
                        </div>
                      )}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          removeQueueItem(item.id);
                        }}
                        className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800">
                <button 
                  onClick={exportAllQueueToZip}
                  className="w-full bg-[#518231] hover:bg-[#436e28] text-white py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <FileDown size={14} />
                  Export Queue as Combined ZIP
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Workspace & Output Gallery (Column Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          {activeItem ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              
              {/* Workspace Header Info */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-base font-bold text-slate-950 dark:text-white flex items-center gap-2">
                    <FileImage size={18} className="text-[#518231]" />
                    {activeItem.name}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    File Size: <span className="font-semibold text-slate-700 dark:text-slate-300">{formatBytes(activeItem.size)}</span>
                    &nbsp;&nbsp;•&nbsp;&nbsp;
                    Total Sub-Images: <span className="font-semibold text-slate-700 dark:text-slate-300">{activeItem.images.length}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={downloadActiveImages}
                    className="bg-[#518231] hover:bg-[#436e28] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 shrink-0"
                  >
                    <Download size={14} />
                    Extract Active Images
                  </button>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-4">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === 'editor' 
                      ? 'border-[#518231] text-[#518231]' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Sliders size={14} />
                  Icon Gallery & Settings
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === 'preview' 
                      ? 'border-[#518231] text-[#518231]' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Eye size={14} />
                  Website Mockup Previews
                </button>
                <button
                  onClick={() => setActiveTab('developer')}
                  className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === 'developer' 
                      ? 'border-[#518231] text-[#518231]' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <Code size={14} />
                  Developer Insights
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-4 py-3 text-xs font-bold border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === 'history' 
                      ? 'border-[#518231] text-[#518231]' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <History size={14} />
                  Export History
                </button>
              </div>

              {/* TAB 1: Editor Gallery and Settings */}
              {activeTab === 'editor' && (
                <div className="p-6 space-y-6">
                  
                  {/* Top segment: Side by side preview & scale settings */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* Visual Comparison Box */}
                    <div className="md:col-span-5 space-y-3">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                        Live Preview & Comparison
                      </label>
                      <div className="relative border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 p-4 aspect-square flex flex-col items-center justify-center gap-3">
                        
                        {/* Checkerboard backing grid */}
                        <div className="absolute inset-0 z-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-70"></div>
                        
                        {selectedPreviewImage ? (
                          <div className="relative z-10 flex flex-col items-center justify-center gap-4 w-full h-full">
                            <div className="relative border border-slate-200/50 bg-white/40 dark:bg-slate-900/40 rounded-lg p-6 shadow-inner flex items-center justify-center aspect-square max-w-[150px] w-full">
                              {/* Checkerboard inside box */}
                              <div className="absolute inset-0 rounded-lg bg-[linear-gradient(45deg,#ccc_25%,transparent_25%),linear-gradient(-45deg,#ccc_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#ccc_75%),linear-gradient(-45deg,transparent_75%,#ccc_75%)] bg-[size:10px_10px] bg-[position:0_0,0_5px,5px_-5px,-5px_0] opacity-10"></div>
                              <img 
                                src={selectedPreviewImage.pngUrl} 
                                alt={`${selectedPreviewImage.width}x${selectedPreviewImage.height}`}
                                style={{
                                  imageRendering: scaleFilter === 'pixelated' ? 'pixelated' : 'auto',
                                  width: `${selectedPreviewImage.width * scaleFactor}px`,
                                  height: `${selectedPreviewImage.height * scaleFactor}px`,
                                  maxWidth: '100%',
                                  maxHeight: '100%',
                                  objectFit: 'contain'
                                }}
                                className="transition-transform z-10"
                              />
                            </div>
                            
                            {/* Comparison info metadata overlay */}
                            <div className="bg-slate-950/80 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white text-[11px] font-bold text-center border border-white/10 shadow-lg">
                              <span>Selected Preview: </span>
                              <span className="text-[#6fa844]">
                                {selectedPreviewImage.width * scaleFactor}x{selectedPreviewImage.height * scaleFactor}
                              </span>
                              {scaleFactor > 1 && (
                                <span className="text-slate-400 block mt-0.5">
                                  Upscaled {scaleFactor}x from {selectedPreviewImage.width}x{selectedPreviewImage.height}
                                </span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 z-10 font-medium">Select a frame to preview</p>
                        )}
                      </div>
                    </div>

                    {/* Settings Panel */}
                    <div className="md:col-span-7 space-y-5">
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 uppercase tracking-wide">
                          <Sliders size={13} className="text-[#518231]" />
                          Export Settings
                        </h4>

                        {/* Mode Selection */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                            Extraction Mode
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                              { id: 'all', label: 'All Sizes' },
                              { id: 'selected', label: 'Selected' },
                              { id: 'largest', label: 'Largest Size' },
                              { id: 'smallest', label: 'Smallest Size' }
                            ].map(mode => (
                              <button
                                key={mode.id}
                                onClick={() => handleModeChange(mode.id as any)}
                                className={`px-2 py-2 rounded-lg text-xs font-bold border transition-all text-center ${
                                  extractionMode === mode.id
                                    ? 'bg-[#518231] text-white border-[#518231]'
                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                                }`}
                              >
                                {mode.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Scaling Settings */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase flex items-center gap-1">
                              Retina Scale Factor
                            </label>
                            <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5">
                              {[1, 2, 3, 4].map(factor => (
                                <button
                                  key={factor}
                                  onClick={() => handleScaleChange(factor)}
                                  className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                                    scaleFactor === factor
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white'
                                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                  }`}
                                >
                                  {factor}x
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">
                              Upscale Filtering
                            </label>
                            <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-0.5">
                              {[
                                { id: 'smooth', label: 'Smooth' },
                                { id: 'pixelated', label: 'Pixelated' }
                              ].map(filter => (
                                <button
                                  key={filter.id}
                                  onClick={() => handleFilterChange(filter.id as any)}
                                  className={`flex-1 py-1.5 rounded-md text-xs font-bold transition-all ${
                                    scaleFilter === filter.id
                                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white'
                                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                                  }`}
                                >
                                  {filter.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Tips */}
                        <div className="bg-white/60 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex gap-2">
                          <Sparkle size={14} className="text-[#518231] shrink-0 mt-0.5" />
                          <span>
                            <strong>Pixelated filter</strong> (nearest-neighbor) preserves perfect sharp pixel boundaries for low-res legacy icons, preventing blur during upscaling.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Grid Gallery of extracted images */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wide">
                        Available Icon Sizes ({activeItem.images.length})
                      </label>
                      {extractionMode === 'selected' && (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              const updated: Record<string, boolean> = {};
                              activeItem.images.forEach(img => {
                                updated[`${img.width}x${img.height}`] = true;
                              });
                              setSelectedSizes(updated);
                            }}
                            className="text-[10px] font-bold text-[#518231] hover:underline"
                          >
                            Select All
                          </button>
                          <span className="text-[10px] text-slate-400">|</span>
                          <button 
                            onClick={() => setSelectedSizes({})}
                            className="text-[10px] font-bold text-slate-500 hover:underline"
                          >
                            Deselect All
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {activeItem.images.map((img, idx) => {
                        const sizeKey = `${img.width}x${img.height}`;
                        const isSelected = selectedSizes[sizeKey];
                        const isFav = favoriteSizes.includes(sizeKey);
                        const isHighlighted = previewSize === sizeKey;

                        return (
                          <div 
                            key={idx}
                            onClick={() => setPreviewSize(sizeKey)}
                            className={`border rounded-xl p-3 flex flex-col justify-between gap-3 bg-white dark:bg-slate-900 cursor-pointer relative group transition-all duration-200 ${
                              isHighlighted 
                                ? 'border-[#518231] ring-2 ring-[#518231]/20 shadow-md' 
                                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                          >
                            
                            {/* Checkbox overlay when selected mode active */}
                            {extractionMode === 'selected' && (
                              <div 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedSizes(prev => ({ ...prev, [sizeKey]: !prev[sizeKey] }));
                                }}
                                className="absolute top-2 left-2 z-10 w-5 h-5 rounded border bg-white dark:bg-slate-900 flex items-center justify-center transition-all cursor-pointer"
                              >
                                {isSelected ? (
                                  <div className="w-full h-full bg-[#518231] rounded flex items-center justify-center text-white">
                                    <Check size={12} strokeWidth={3} />
                                  </div>
                                ) : null}
                              </div>
                            )}

                            {/* Favorite Size Trigger */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavoriteSize(sizeKey);
                              }}
                              className={`absolute top-2 right-2 z-10 p-1.5 rounded-lg border transition-all ${
                                isFav 
                                  ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' 
                                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-amber-500'
                              }`}
                              title={isFav ? "Remove from favorite sizes" : "Mark as favorite size"}
                            >
                              <Star size={12} fill={isFav ? "currentColor" : "none"} />
                            </button>

                            {/* Image Preview Box */}
                            <div className="aspect-square bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-lg p-4 flex items-center justify-center relative select-none">
                              {/* Small checkerboard backing */}
                              <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:10px_10px] opacity-40"></div>
                              <img 
                                src={img.pngUrl} 
                                alt={sizeKey} 
                                className="max-w-[70%] max-h-[70%] object-contain relative z-10 transition-transform"
                                style={{ imageRendering: scaleFilter === 'pixelated' ? 'pixelated' : 'auto' }}
                              />
                            </div>

                            {/* Metadata */}
                            <div className="space-y-1">
                              <p className="text-xs font-extrabold text-slate-850 dark:text-slate-150 text-center">
                                {sizeKey}
                              </p>
                              <div className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400">
                                <span>{img.bpp}-bit</span>
                                <span>{formatBytes(img.pngSize)}</span>
                              </div>
                            </div>

                            {/* Individual Download Action */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadSingleImage(img, activeItem.name);
                              }}
                              className="w-full py-1.5 bg-slate-55 bg-slate-100 dark:bg-slate-800 hover:bg-[#518231]/10 hover:text-[#518231] dark:hover:bg-[#518231]/20 dark:hover:text-[#6fa844] rounded-lg text-xs font-bold text-slate-700 dark:text-slate-350 transition-all flex items-center justify-center gap-1.5 border border-transparent hover:border-[#518231]/30"
                            >
                              <Download size={12} />
                              Download
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Interactive Website Mockup Previews */}
              {activeTab === 'preview' && (
                <div className="p-6 space-y-8">
                  {selectedPreviewImage ? (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                      
                      {/* Configuration Inputs */}
                      <div className="md:col-span-4 space-y-4">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                          Mockup Settings
                        </h4>
                        
                        {/* Selected Preview Size */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
                            Preview Source Size
                          </label>
                          <select 
                            value={previewSize}
                            onChange={(e) => setPreviewSize(e.target.value)}
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#518231]/20 focus:border-[#518231]"
                          >
                            {activeItem.images.map(img => (
                              <option key={`${img.width}x${img.height}`} value={`${img.width}x${img.height}`}>
                                {img.width}x{img.height} ({img.bpp}-bit {img.type})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Tab Title Text */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
                            Browser Tab Title
                          </label>
                          <input 
                            type="text" 
                            value={tabText}
                            onChange={(e) => setTabText(e.target.value)}
                            placeholder="e.g. My Website Title"
                            maxLength={30}
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#518231]/20 focus:border-[#518231]"
                          />
                        </div>

                        {/* Mobile Bookmark Title */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase">
                            App Bookmark Label
                          </label>
                          <input 
                            type="text" 
                            value={bookmarkLabel}
                            onChange={(e) => setBookmarkLabel(e.target.value)}
                            placeholder="e.g. Nexus Calculator"
                            maxLength={14}
                            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#518231]/20 focus:border-[#518231]"
                          />
                        </div>
                      </div>

                      {/* Mockup Previews Grid */}
                      <div className="md:col-span-8 space-y-6">
                        
                        {/* 1. Browser Tab Mockup */}
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                            Browser Tab Mockup
                          </span>
                          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-[#e2e8f0] dark:bg-slate-950 p-2 shadow-inner">
                            <div className="flex items-center gap-1.5 bg-[#f1f5f9] dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200/50 dark:border-slate-800/80 max-w-[240px]">
                              {/* Embedded Icon */}
                              <img 
                                src={selectedPreviewImage.pngUrl} 
                                alt="Favicon Tab preview" 
                                className="w-4 h-4 object-contain shrink-0" 
                              />
                              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate select-none">
                                {tabText || "My Website"}
                              </span>
                              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 ml-auto p-0.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800">
                                <X size={10} />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 2. Mobile Home Screen Shortcut Mockup */}
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                            Apple iOS Bookmark Mockup
                          </span>
                          <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black p-6 flex items-center justify-center shadow-lg aspect-[16/9]">
                            <div className="flex flex-col items-center gap-1.5">
                              {/* Shortcut icon */}
                              <div className="w-16 h-16 rounded-[22%] bg-white border border-white/10 shadow-xl overflow-hidden p-2 flex items-center justify-center relative select-none">
                                <img 
                                  src={selectedPreviewImage.pngUrl} 
                                  alt="Mobile bookmark preview" 
                                  className="w-full h-full object-contain relative z-10" 
                                />
                              </div>
                              <span className="text-[11px] font-bold text-slate-200 drop-shadow-md select-none text-center max-w-[80px] truncate">
                                {bookmarkLabel || "App Link"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* 3. Search Results Snippet Preview */}
                        <div className="space-y-2">
                          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                            Google Search Snippet Preview
                          </span>
                          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 bg-white dark:bg-slate-950 shadow-sm space-y-2">
                            <div className="flex items-center gap-2">
                              {/* Circular Favicon in search results */}
                              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 flex items-center justify-center shrink-0 p-1">
                                <img 
                                  src={selectedPreviewImage.pngUrl} 
                                  alt="Search result favicon" 
                                  className="w-4 h-4 object-contain" 
                                />
                              </div>
                              <div className="min-w-0">
                                <p className="text-[12px] font-bold text-slate-800 dark:text-slate-250 leading-tight">
                                  {tabText}
                                </p>
                                <p className="text-[11px] text-[#518231] font-semibold truncate leading-tight">
                                  https://yourdomain.com
                                </p>
                              </div>
                            </div>
                            <h3 className="text-base text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer leading-tight">
                              {tabText} - Free Utility Suite
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal max-w-xl">
                              This website has structured data configurations and uses the extracted favicon in standard desktop search result formats.
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-slate-400">Loading mockups...</div>
                  )}
                </div>
              )}

              {/* TAB 3: Developer Insights */}
              {activeTab === 'developer' && (
                <div className="p-6 space-y-6">
                  
                  {/* Favicon Completeness Checklist */}
                  {faviconAnalysis && (
                    <div className="bg-slate-50 dark:bg-slate-850 p-5 rounded-xl border border-slate-100 dark:border-slate-800 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-850 dark:text-slate-150 uppercase tracking-wide flex items-center gap-1.5">
                          <CheckSquare size={14} className="text-[#518231]" />
                          Favicon Completeness Checklist
                        </h4>
                        <span className={`px-2.5 py-0.5 border rounded-full text-[10px] font-bold ${faviconAnalysis.color}`}>
                          {faviconAnalysis.rating} ({faviconAnalysis.score}/5)
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                        {[
                          { size: 16, status: faviconAnalysis.has16, desc: "Legacy Web Favicon" },
                          { size: 32, status: faviconAnalysis.has32, desc: "High-DPI Browser Tab" },
                          { size: 48, status: faviconAnalysis.has48, desc: "Google Search Listing" },
                          { size: 128, status: faviconAnalysis.has128, desc: "Shortcut / Bookmark" },
                          { size: 256, status: faviconAnalysis.has256, desc: "App Icon / OS Explorer" }
                        ].map((chk, i) => (
                          <div 
                            key={i} 
                            className={`p-3 border rounded-lg text-center flex flex-col items-center justify-center gap-2 bg-white dark:bg-slate-900 ${
                              chk.status 
                                ? 'border-green-200 dark:border-green-950/40 bg-green-500/5' 
                                : 'border-slate-200 dark:border-slate-800 opacity-60'
                            }`}
                          >
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{chk.size}x{chk.size}</span>
                            {chk.status ? (
                              <div className="w-5 h-5 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center">
                                <Check size={11} strokeWidth={3} />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                                <X size={11} strokeWidth={3} />
                              </div>
                            )}
                            <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{chk.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Documentation snippets with copy widgets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Next.js 15 recommendation snippet */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Next.js 15 dynamic metadata
                        </span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(
`// Place in your app/layout.tsx file
export const metadata = {
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
    shortcut: '/shortcut-icon.png',
  },
};`
                            );
                            triggerNotification('success', "Copied Next.js Metadata configuration to clipboard!");
                          }}
                          className="text-[10px] font-bold text-[#518231] hover:underline flex items-center gap-1"
                        >
                          <Copy size={11} />
                          Copy Snippet
                        </button>
                      </div>
                      <div className="border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden text-xs bg-slate-950 text-slate-350 p-4 font-mono leading-relaxed max-h-[160px] overflow-y-auto">
                        <span className="text-[#6fa844]">{"// Place in your app/layout.tsx file"}</span><br/>
                        <span className="text-blue-400">export const</span> <span className="text-purple-400">metadata</span> = {"{"}<br/>
                        &nbsp;&nbsp;<span className="text-slate-200">icons</span>: {"{"}<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-300">icon</span>: <span className="text-orange-400">'/icon.png'</span>,<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-300">apple</span>: <span className="text-orange-400">'/apple-icon.png'</span>,<br/>
                        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-300">shortcut</span>: <span className="text-orange-400">'/shortcut-icon.png'</span>,<br/>
                        &nbsp;&nbsp;{"}"},<br/>
                        {"};"}
                      </div>
                    </div>

                    {/* Standard HTML head tags */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                          Standard HTML head injection
                        </span>
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(
`<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`
                            );
                            triggerNotification('success', "Copied HTML Link tags to clipboard!");
                          }}
                          className="text-[10px] font-bold text-[#518231] hover:underline flex items-center gap-1"
                        >
                          <Copy size={11} />
                          Copy HTML
                        </button>
                      </div>
                      <div className="border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden text-xs bg-slate-950 text-slate-350 p-4 font-mono leading-relaxed max-h-[160px] overflow-y-auto">
                        {"<"}<span className="text-blue-400">link</span> <span className="text-purple-400">rel</span>=<span className="text-orange-400">"icon"</span> <span className="text-purple-400">type</span>=<span className="text-orange-400">"image/png"</span> <span className="text-purple-400">sizes</span>=<span className="text-orange-400">"16x16"</span> <span className="text-purple-400">href</span>=<span className="text-orange-400">"/favicon-16x16.png"</span>{">"}<br/>
                        {"<"}<span className="text-blue-400">link</span> <span className="text-purple-400">rel</span>=<span className="text-orange-400">"icon"</span> <span className="text-purple-400">type</span>=<span className="text-orange-400">"image/png"</span> <span className="text-purple-400">sizes</span>=<span className="text-orange-400">"32x32"</span> <span className="text-purple-400">href</span>=<span className="text-orange-400">"/favicon-32x32.png"</span>{">"}<br/>
                        {"<"}<span className="text-blue-400">link</span> <span className="text-purple-400">rel</span>=<span className="text-orange-400">"apple-touch-icon"</span> <span className="text-purple-400">sizes</span>=<span className="text-orange-400">"180x180"</span> <span className="text-purple-400">href</span>=<span className="text-orange-400">"/apple-touch-icon.png"</span>{">"}
                      </div>
                    </div>

                  </div>

                  {/* Browser Compatibility Matrix */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      Browser Favicon Format Compatibility Matrix
                    </span>
                    <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-850 font-bold text-slate-700 dark:text-slate-350">
                            <th className="p-3">Favicon Format</th>
                            <th className="p-3">Chrome / Edge</th>
                            <th className="p-3">Firefox</th>
                            <th className="p-3">Safari</th>
                            <th className="p-3">Opera</th>
                            <th className="p-3">Legacy IE (9-11)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-slate-650 dark:text-slate-400">
                          {[
                            { fmt: "ICO (.ico)", ch: "Full", ff: "Full", sf: "Full", op: "Full", ie: "Full (Required)" },
                            { fmt: "PNG (.png)", ch: "Full", ff: "Full", sf: "Full", op: "Full", ie: "Partial (IE11 only)" },
                            { fmt: "SVG (.svg)", ch: "Full (Chrome 80+)", ff: "Full (FF 41+)", sf: "Full (Safari 14.1+)", op: "Full", ie: "No" },
                            { fmt: "GIF (Animated)", ch: "Static frame", ff: "Animated", sf: "Static frame", op: "Animated", ie: "No" }
                          ].map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                              <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{row.fmt}</td>
                              <td className="p-3">{row.ch}</td>
                              <td className="p-3">{row.ff}</td>
                              <td className="p-3">{row.sf}</td>
                              <td className="p-3">{row.op}</td>
                              <td className="p-3">{row.ie}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 4: Export History */}
              {activeTab === 'history' && (
                <div className="p-6 space-y-4">
                  <h4 className="text-xs font-bold text-slate-850 dark:text-slate-150 uppercase tracking-wide flex items-center gap-1.5">
                    <History size={14} className="text-[#518231]" />
                    Recent Export Projects
                  </h4>

                  {exportHistory.length > 0 ? (
                    <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-xl divide-y divide-slate-100 dark:divide-slate-850">
                      {exportHistory.map((hist, idx) => (
                        <div key={idx} className="p-4 flex items-center justify-between gap-4 bg-white dark:bg-slate-900">
                          <div>
                            <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                              {hist.fileName}
                            </p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                              {new Date(hist.timestamp).toLocaleString()} &nbsp;•&nbsp; original: {formatBytes(hist.originalSize)}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] bg-[#518231]/10 text-[#518231] font-extrabold px-2 py-0.5 rounded-full border border-[#518231]/20">
                              Extracted {hist.extractedCount} PNGs
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center border border-slate-200 dark:border-slate-800 border-dashed rounded-xl flex flex-col items-center gap-2 text-slate-400">
                      <Sparkles size={20} className="text-[#518231]" />
                      <span className="text-xs font-semibold">No recent projects yet.</span>
                      <span className="text-[10px] text-slate-500 max-w-xs leading-normal">
                        After you extract and download images, your session activity logs will appear here for quick reference.
                      </span>
                    </div>
                  )}
                </div>
              )}

            </div>
          ) : (
            
            /* Idle Placeholder State */
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-6 shadow-sm min-h-[460px]">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#6fa844]/20 to-[#518231]/25 flex items-center justify-center text-[#518231] animate-bounce">
                  <FileImage size={40} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-[#518231] shadow-md border border-slate-100 dark:border-slate-800">
                  <Sparkles size={12} fill="currentColor" />
                </div>
              </div>
              <div className="space-y-2 max-w-md">
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  No ICO Icon Loaded
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Drag and drop a website favicon.ico, cursor.cur, or cursor files to analyze, extract embedded sub-resolutions, preview in real time, and download as transparent PNGs.
                </p>
              </div>

              {/* Display recent history if any */}
              {exportHistory.length > 0 && (
                <div className="w-full max-w-lg mt-4 border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/10 space-y-3">
                  <h4 className="text-[11px] font-bold text-slate-500 dark:text-slate-400 text-left uppercase tracking-wide flex items-center gap-1.5">
                    <History size={12} />
                    Resume From Recent Projects
                  </h4>
                  <div className="divide-y divide-slate-100 dark:divide-slate-850">
                    {exportHistory.slice(0, 3).map((hist, idx) => (
                      <div key={idx} className="py-2 flex items-center justify-between text-xs text-left">
                        <span className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                          {hist.fileName}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(hist.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
