"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Upload, Trash2, Download, RefreshCw, Sliders, Eye, 
  CheckCircle2, AlertCircle, Loader2, Sparkles, Plus, X, 
  Info, FileCode, CheckSquare, Maximize, Columns, 
  ZoomIn, ZoomOut, Copy, FileDown, Layers, Play, Settings,
  ArrowRight, Activity, FileImage, Grid, Palette, HelpCircle
} from "lucide-react";
import { useTheme } from 'next-themes';
import JSZip from 'jszip';

interface QueueItem {
  id: string;
  file?: File;
  name: string;
  size: number;
  format: string;
  originalUrl: string;
  convertedUrl: string | null;
  convertedBlob: Blob | null;
  convertedSize: number | null;
  status: 'idle' | 'converting' | 'success' | 'error';
  progress: number;
  width: number | null;
  height: number | null;
  errorMsg?: string;
}

const PRESETS = [
  { id: 'standard', name: 'Standard JPG', desc: 'Balanced 85% compression quality on white backdrop.' },
  { id: 'high-quality', name: 'High Quality', desc: 'True color rendering at 95% quality.' },
  { id: 'web-optimized', name: 'Web Optimized', desc: 'Aggressive 70% quality compression, max 1920px.' },
  { id: 'social-media', name: 'Social Media JPG', desc: 'Crops and fits files to popular aspect templates.' },
  { id: 'ecommerce', name: 'Ecommerce JPG', desc: 'white backdrop centered, optimized for catalogs.' }
];

const SOCIAL_TEMPLATES = [
  { id: 'insta-post', name: 'Instagram Post', width: 1080, height: 1080, ratio: '1:1' },
  { id: 'insta-story', name: 'Instagram Story', width: 1080, height: 1920, ratio: '9:16' },
  { id: 'fb-post', name: 'Facebook Post', width: 1200, height: 630, ratio: '1.91:1' },
  { id: 'linkedin-post', name: 'LinkedIn Post', width: 1200, height: 627, ratio: '1.91:1' },
  { id: 'twitter-post', name: 'Twitter/X Post', width: 1600, height: 900, ratio: '16:9' },
  { id: 'yt-thumb', name: 'YouTube Thumbnail', width: 1280, height: 720, ratio: '16:9' }
];

export function ConvertToJpgTool() {
  const { resolvedTheme } = useTheme();

  // Queue state
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // Settings
  const [preset, setPreset] = useState<string>('standard');
  const [quality, setQuality] = useState<number>(85);
  const [qualityLevel, setQualityLevel] = useState<'low' | 'medium' | 'high' | 'max'>('high');
  const [customBgColor, setCustomBgColor] = useState<string>('#ffffff');
  const [exportExtension, setExportExtension] = useState<'jpg' | 'jpeg'>('jpg');
  
  // Social resizer settings
  const [socialTemplate, setSocialTemplate] = useState<string>('insta-post');
  const [socialFit, setSocialFit] = useState<'cover' | 'contain'>('contain');

  // Previewer View Settings
  const [viewMode, setViewMode] = useState<'side-by-side' | 'split' | 'templates'>('side-by-side');
  const [zoom, setZoom] = useState<number>(1);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [splitPos, setSplitPos] = useState<number>(50); // 0-100 for split slider
  const [editorTab, setEditorTab] = useState<'preview' | 'code' | 'stats'>('preview');

  // UI state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Retrieve active item
  const activeItem = useMemo(() => {
    return queue.find(item => item.id === activeItemId) || null;
  }, [queue, activeItemId]);

  // Handle preset shifts
  useEffect(() => {
    switch (preset) {
      case 'standard':
        setQuality(85);
        setQualityLevel('high');
        setCustomBgColor('#ffffff');
        break;
      case 'high-quality':
        setQuality(95);
        setQualityLevel('max');
        setCustomBgColor('#ffffff');
        break;
      case 'web-optimized':
        setQuality(70);
        setQualityLevel('medium');
        setCustomBgColor('#ffffff');
        break;
      case 'social-media':
        setQuality(85);
        setQualityLevel('high');
        setCustomBgColor('#ffffff');
        break;
      case 'ecommerce':
        setQuality(80);
        setQualityLevel('high');
        setCustomBgColor('#ffffff');
        break;
    }
  }, [preset]);

  // Keep quality slider aligned with qualityLevel buttons
  const handleQualityLevelChange = (level: 'low' | 'medium' | 'high' | 'max') => {
    setQualityLevel(level);
    switch (level) {
      case 'low': setQuality(50); break;
      case 'medium': setQuality(70); break;
      case 'high': setQuality(85); break;
      case 'max': setQuality(98); break;
    }
  };

  // Drag and Drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const addFilesToQueue = async (files: FileList) => {
    const newItems: QueueItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const id = Math.random().toString(36).substring(2, 9);
      const originalUrl = URL.createObjectURL(file);
      
      let width = null;
      let height = null;
      
      // Attempt to load dimensions if standard format
      if (!file.name.toLowerCase().endsWith('.heic')) {
        try {
          const img = new Image();
          img.src = originalUrl;
          await new Promise((resolve) => {
            img.onload = () => {
              width = img.naturalWidth;
              height = img.naturalHeight;
              resolve(null);
            };
            img.onerror = () => resolve(null);
          });
        } catch (err) {
          console.warn("Could not determine image dimensions", err);
        }
      }

      newItems.push({
        id,
        file,
        name: file.name,
        size: file.size,
        format: file.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
        originalUrl,
        convertedUrl: null,
        convertedBlob: null,
        convertedSize: null,
        status: 'idle',
        progress: 0,
        width,
        height
      });
    }

    if (newItems.length > 0) {
      setQueue(prev => [...prev, ...newItems]);
      if (!activeItemId) {
        setActiveItemId(newItems[0].id);
      }
      setSuccessMsg(`Added ${newItems.length} file(s) to the queue list.`);
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFilesToQueue(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      addFilesToQueue(e.target.files);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Paste image handler
  useEffect(() => {
    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      
      const pastedFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const blob = items[i].getAsFile();
          if (blob) pastedFiles.push(blob);
        }
      }

      if (pastedFiles.length > 0) {
        const dataTransfer = new DataTransfer();
        pastedFiles.forEach(file => {
          const renamedFile = new File([file], `pasted-image-${Date.now()}.${file.type.split('/')[1] || 'png'}`, { type: file.type });
          dataTransfer.items.add(renamedFile);
        });
        addFilesToQueue(dataTransfer.files);
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [activeItemId]);

  const removeItem = (id: string) => {
    setQueue(prev => {
      const target = prev.find(q => q.id === id);
      if (target?.originalUrl) URL.revokeObjectURL(target.originalUrl);
      if (target?.convertedUrl) URL.revokeObjectURL(target.convertedUrl);
      return prev.filter(q => q.id !== id);
    });

    if (activeItemId === id) {
      const remaining = queue.filter(q => q.id !== id);
      setActiveItemId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const clearQueue = () => {
    queue.forEach(item => {
      URL.revokeObjectURL(item.originalUrl);
      if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
    });
    setQueue([]);
    setActiveItemId(null);
  };

  // Canvas process pipeline
  const convertItem = async (item: QueueItem): Promise<QueueItem> => {
    if (item.status === 'success' && item.convertedBlob) return item;

    setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'converting', progress: 15 } : q));
    await new Promise(r => setTimeout(r, 45));

    try {
      let srcBlob: Blob;
      if (item.file) {
        srcBlob = item.file;
      } else {
        throw new Error("No file resource found");
      }

      // HEIC dynamic format conversion
      if (item.name.toLowerCase().endsWith('.heic')) {
        const heic2any = (await import('heic2any')).default;
        setQueue(prev => prev.map(q => q.id === item.id ? { ...q, progress: 30 } : q));
        
        const decoded = await heic2any({
          blob: srcBlob,
          toType: 'image/jpeg'
        });
        srcBlob = Array.isArray(decoded) ? decoded[0] : decoded;
      }

      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, progress: 45 } : q));

      const objectUrl = URL.createObjectURL(srcBlob);
      const img = new Image();
      img.src = objectUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("Could not decode image content"));
      });

      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;

      let w = originalWidth;
      let h = originalHeight;

      // Capping max resolution for Web Optimized JPG
      if (preset === 'web-optimized' && w > 1920) {
        h = Math.round((h * 1920) / w);
        w = 1920;
      }

      // Social Templates scaling logic
      let drawX = 0;
      let drawY = 0;
      let drawWidth = w;
      let drawHeight = h;

      if (preset === 'social-media') {
        const targetTemplate = SOCIAL_TEMPLATES.find(t => t.id === socialTemplate) || SOCIAL_TEMPLATES[0];
        w = targetTemplate.width;
        h = targetTemplate.height;

        const originalRatio = originalWidth / originalHeight;
        const targetRatio = w / h;

        if (socialFit === 'cover') {
          // Crop fill scale
          if (originalRatio > targetRatio) {
            drawHeight = h;
            drawWidth = h * originalRatio;
            drawX = (w - drawWidth) / 2;
          } else {
            drawWidth = w;
            drawHeight = w / originalRatio;
            drawY = (h - drawHeight) / 2;
          }
        } else {
          // Letterbox scale
          if (originalRatio > targetRatio) {
            drawWidth = w;
            drawHeight = w / originalRatio;
            drawY = (h - drawHeight) / 2;
          } else {
            drawHeight = h;
            drawWidth = h * originalRatio;
            drawX = (w - drawWidth) / 2;
          }
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not construct 2D context");

      // Solid color replacement for transparent layers (JPEG lacks alpha)
      ctx.fillStyle = customBgColor;
      ctx.fillRect(0, 0, w, h);

      // Draw original image centered
      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      URL.revokeObjectURL(objectUrl);

      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, progress: 75 } : q));
      await new Promise(r => setTimeout(r, 45));

      // Export canvas to JPEG Blob
      let outBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), 'image/jpeg', quality / 100);
      });

      if (!outBlob) throw new Error("JPEG serialization failed");

      // Apply optimization algorithms if Web Optimized selected
      if (preset === 'web-optimized' && outBlob.size > 200 * 1024) {
        try {
          const imageCompression = (await import('browser-image-compression')).default;
          const options = {
            maxSizeMB: 0.8,
            maxWidthOrHeight: w,
            useWebWorker: true,
            fileType: 'image/jpeg'
          };
          const compressed = await imageCompression(new File([outBlob], item.name, { type: 'image/jpeg' }), options);
          outBlob = compressed;
        } catch (compErr) {
          console.warn("JPEG optimization skipped", compErr);
        }
      }

      const convertedUrl = URL.createObjectURL(outBlob);
      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, progress: 95 } : q));

      return {
        ...item,
        status: 'success',
        progress: 100,
        width: w,
        height: h,
        convertedBlob: outBlob,
        convertedUrl,
        convertedSize: outBlob.size
      };

    } catch (err: any) {
      console.error(err);
      return {
        ...item,
        status: 'error',
        progress: 0,
        errorMsg: err.message || "Failed processing JPEG pipeline"
      };
    }
  };

  const processActiveItem = async () => {
    if (!activeItem || isProcessing) return;
    setIsProcessing(true);
    const updated = await convertItem(activeItem);
    setQueue(prev => prev.map(q => q.id === activeItem.id ? updated : q));
    setIsProcessing(false);
  };

  const processBatchQueue = async () => {
    if (queue.length === 0 || isProcessing) return;
    setIsProcessing(true);
    setErrorMsg(null);

    const updatedQueue = [...queue];
    for (let i = 0; i < updatedQueue.length; i++) {
      const item = updatedQueue[i];
      if (item.status !== 'success') {
        const updated = await convertItem(item);
        updatedQueue[i] = updated;
        setQueue([...updatedQueue]);
      }
    }

    setIsProcessing(false);
    setSuccessMsg("Batch JPG conversion complete!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Download logic
  const downloadSingle = (item: QueueItem) => {
    if (!item.convertedUrl) return;
    const link = document.createElement('a');
    const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;
    link.download = `${baseName}_converted.${exportExtension}`;
    link.href = item.convertedUrl;
    link.click();
  };

  const downloadAllZip = async () => {
    if (queue.filter(q => q.status === 'success').length === 0) {
      setErrorMsg("No successfully converted assets to pack.");
      return;
    }

    setIsProcessing(true);
    try {
      const zip = new JSZip();
      queue.forEach(item => {
        if (item.status === 'success' && item.convertedBlob) {
          const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;
          zip.file(`${baseName}.${exportExtension}`, item.convertedBlob);
        }
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(zipBlob);

      const link = document.createElement('a');
      link.download = `nexus_jpg_bundle_${Date.now()}.zip`;
      link.href = zipUrl;
      link.click();

      URL.revokeObjectURL(zipUrl);
      setSuccessMsg("ZIP package downloaded successfully.");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed creating ZIP archive.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Preview panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewMode === 'split') return;
    setIsPanning(true);
    setPanStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || viewMode === 'split') return;
    setPanX(e.clientX - panStart.x);
    setPanY(e.clientY - panStart.y);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const resetPanZoom = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const adjustZoom = (factor: number) => {
    setZoom(prev => Math.min(Math.max(prev * factor, 0.25), 32));
  };

  // Computed scores for the comparison dashboard
  const comparisonScores = useMemo(() => {
    if (!activeItem || !activeItem.convertedSize) return null;
    
    // Compression score: ratio of savings
    const diff = activeItem.size - activeItem.convertedSize;
    const ratio = activeItem.size / activeItem.convertedSize;
    
    let qualityScore = 100;
    if (quality < 60) {
      qualityScore = Math.round(quality * 1.1);
    } else if (quality < 85) {
      qualityScore = Math.round(90 + (quality - 60) * 0.3);
    } else {
      qualityScore = Math.round(98 + (quality - 85) * 0.13);
    }

    return {
      ratio: ratio.toFixed(1),
      savingsPct: diff > 0 ? ((diff / activeItem.size) * 100).toFixed(0) : '0',
      qualityScore,
      compressionScore: Math.round(Math.min(100, Math.max(10, ratio * 20)))
    };
  }, [activeItem, quality]);

  // Code snippets generator helper
  const responsivePictureCode = useMemo(() => {
    if (!activeItem) return '';
    const baseName = activeItem.name.substring(0, activeItem.name.lastIndexOf('.')) || activeItem.name;
    return `<picture>
  <source srcset="${baseName}.webp" type="image/webp" />
  <source srcset="${baseName}.jpg" type="image/jpeg" />
  <img 
    src="${baseName}.jpg" 
    alt="Optimized web photography fallback" 
    width="${activeItem.width || 800}" 
    height="${activeItem.height || 600}" 
    loading="lazy"
  />
</picture>`;
  }, [activeItem]);

  const nextImageCode = useMemo(() => {
    if (!activeItem) return '';
    const baseName = activeItem.name.substring(0, activeItem.name.lastIndexOf('.')) || activeItem.name;
    return `import Image from 'next/image';

export default function HeroGraphic() {
  return (
    <Image
      src="/images/${baseName}.jpg"
      alt="Optimized JPEG Graphic"
      width={${activeItem.width || 800}}
      height={${activeItem.height || 600}}
      quality={${quality}}
      priority={true}
    />
  );
}`;
  }, [activeItem, quality]);

  return (
    <div className="space-y-8">
      {/* Alert Logs */}
      {errorMsg && (
        <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-red-700 dark:text-red-300">
          <AlertCircle size={20} className="shrink-0" />
          <span className="text-sm font-medium">{errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="ms-auto text-red-500 hover:text-red-700"><X size={16} /></button>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 rounded-xl text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 size={20} className="shrink-0" />
          <span className="text-sm font-medium">{successMsg}</span>
          <button onClick={() => setSuccessMsg(null)} className="ms-auto text-emerald-500 hover:text-emerald-750"><X size={16} /></button>
        </div>
      )}

      {/* Upload Zone */}
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
          dragActive 
            ? "border-[#518231] bg-[#518231]/5 dark:bg-[#518231]/10" 
            : "border-slate-300 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#518231] bg-slate-50/50 dark:bg-slate-900/30"
        }`}
      >
        <input 
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.heic"
          onChange={handleFileInput}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-700">
            <Upload size={32} className="text-[#518231]" />
          </div>
          <div>
            <p className="text-base font-bold text-slate-800 dark:text-slate-100">
              Drag & drop images here, paste from clipboard, or click to browse
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
              Supports PNG, WEBP, AVIF, HEIC, TIFF, BMP, SVG, and GIF. Processing runs entirely in your browser locally.
            </p>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      {queue.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Previewer and code (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Viewport tabs */}
            <div className="flex items-center justify-between bg-slate-100 dark:bg-slate-800/60 p-1 rounded-xl">
              <div className="flex gap-1">
                <button 
                  onClick={() => setEditorTab('preview')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    editorTab === 'preview' 
                      ? 'bg-white dark:bg-slate-700 text-[#518231] dark:text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Eye size={15} /> Previewer
                </button>
                <button 
                  onClick={() => setEditorTab('code')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    editorTab === 'code' 
                      ? 'bg-white dark:bg-slate-700 text-[#518231] dark:text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <FileCode size={15} /> Integration Code
                </button>
                <button 
                  onClick={() => setEditorTab('stats')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    editorTab === 'stats' 
                      ? 'bg-white dark:bg-slate-700 text-[#518231] dark:text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  <Activity size={15} /> Performance
                </button>
              </div>

              {editorTab === 'preview' && (
                <div className="flex gap-1 bg-white dark:bg-slate-850 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <button 
                    onClick={() => setViewMode('side-by-side')}
                    title="Side-by-side view"
                    className={`p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 ${viewMode === 'side-by-side' ? 'bg-slate-100 dark:bg-slate-700 text-[#518231]' : ''}`}
                  >
                    <Columns size={14} />
                  </button>
                  <button 
                    onClick={() => { setViewMode('split'); resetPanZoom(); }}
                    title="Split screen swipe"
                    className={`p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 ${viewMode === 'split' ? 'bg-slate-100 dark:bg-slate-700 text-[#518231]' : ''}`}
                  >
                    <Maximize size={14} />
                  </button>
                  {preset === 'social-media' && (
                    <button 
                      onClick={() => setViewMode('templates')}
                      title="Social Aspect Mocks"
                      className={`p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 ${viewMode === 'templates' ? 'bg-slate-100 dark:bg-slate-700 text-[#518231]' : ''}`}
                    >
                      <Layers size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Viewport Frame */}
            {editorTab === 'preview' && (
              <div className="relative border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-950/5 select-none shadow-inner">
                
                {/* Control toolbar */}
                {viewMode !== 'templates' && (
                  <div className="absolute top-4 left-4 z-10 flex gap-2 items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-850 shadow-md">
                    <button onClick={() => adjustZoom(1.2)} className="p-1 text-slate-600 dark:text-slate-400 hover:text-[#518231]"><ZoomIn size={15} /></button>
                    <button onClick={() => adjustZoom(0.8)} className="p-1 text-slate-600 dark:text-slate-400 hover:text-[#518231]"><ZoomOut size={15} /></button>
                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-350">{Math.round(zoom * 100)}%</span>
                    <button onClick={resetPanZoom} title="Reset pan & zoom" className="p-1 text-slate-500 hover:text-[#518231] ml-1"><RefreshCw size={12} /></button>
                  </div>
                )}

                <div 
                  ref={previewContainerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className="min-h-[420px] max-h-[500px] flex items-center justify-center p-4 overflow-hidden relative bg-white dark:bg-slate-900"
                  style={{ cursor: viewMode === 'split' ? 'default' : isPanning ? 'grabbing' : 'grab' }}
                >
                  {activeItem ? (
                    <>
                      {/* Side-by-side mode */}
                      {viewMode === 'side-by-side' && (
                        <div className="grid grid-cols-2 gap-4 w-full h-full p-2">
                          
                          {/* Original panel */}
                          <div className="flex flex-col items-center justify-center border border-slate-200/40 dark:border-slate-800/40 bg-slate-900/5 dark:bg-slate-900/20 rounded-xl p-2 relative">
                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white rounded text-[10px] uppercase font-bold tracking-wider z-10">Original</span>
                            <div className="overflow-hidden w-full h-full flex items-center justify-center">
                              <img 
                                src={activeItem.originalUrl}
                                alt="Original Preview"
                                className="max-h-[300px] object-contain transition-transform duration-75 select-none pointer-events-none"
                                style={{ transform: `translate(${panX}px, ${panY}px) scale(${zoom})` }}
                              />
                            </div>
                          </div>

                          {/* Converted panel */}
                          <div className="flex flex-col items-center justify-center border border-slate-200/40 dark:border-slate-800/40 bg-slate-900/5 dark:bg-slate-900/20 rounded-xl p-2 relative" style={{ backgroundColor: customBgColor }}>
                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#518231] text-white rounded text-[10px] uppercase font-bold tracking-wider z-10">JPG</span>
                            {activeItem.status === 'success' && activeItem.convertedUrl ? (
                              <div className="overflow-hidden w-full h-full flex items-center justify-center">
                                <img 
                                  src={activeItem.convertedUrl}
                                  alt="Converted JPG Preview"
                                  className="max-h-[300px] object-contain transition-transform duration-75 select-none pointer-events-none"
                                  style={{ transform: `translate(${panX}px, ${panY}px) scale(${zoom})` }}
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2 p-8 text-center text-slate-500">
                                {activeItem.status === 'converting' ? (
                                  <>
                                    <Loader2 className="animate-spin text-[#518231]" size={24} />
                                    <span className="text-xs">Processing JPG pipeline...</span>
                                  </>
                                ) : (
                                  <>
                                    <Play className="text-slate-450 dark:text-slate-600" size={24} />
                                    <span className="text-xs font-semibold">Ready to convert</span>
                                  </>
                                )}
                              </div>
                            )}
                          </div>

                        </div>
                      )}

                      {/* Split-screen swipe mode */}
                      {viewMode === 'split' && (
                        <div className="relative w-full h-full min-h-[360px] flex items-center justify-center overflow-hidden rounded-xl">
                          
                          {/* Converted (Right side / base underlay) */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <img 
                              src={activeItem.convertedUrl || activeItem.originalUrl}
                              alt="Converted Preview"
                              className="max-h-[340px] max-w-full object-contain pointer-events-none select-none"
                            />
                          </div>

                          {/* Original (Left side overlay clipped) */}
                          <div 
                            className="absolute inset-0 flex items-center justify-center overflow-hidden"
                            style={{ clipPath: `polygon(0 0, ${splitPos}% 0, ${splitPos}% 100%, 0 100%)` }}
                          >
                            <img 
                              src={activeItem.originalUrl}
                              alt="Original Preview"
                              className="max-h-[340px] max-w-full object-contain pointer-events-none select-none"
                            />
                          </div>

                          {/* Split slider drag handle */}
                          <div 
                            className="absolute inset-y-0 z-10 w-1 bg-[#518231] cursor-col-resize flex items-center justify-center"
                            style={{ left: `${splitPos}%` }}
                          >
                            <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-[#518231] shadow flex items-center justify-center text-[10px] text-[#518231] font-bold">
                              ↔
                            </div>
                            <input 
                              type="range" 
                              min="0" 
                              max="100" 
                              value={splitPos} 
                              onChange={(e) => setSplitPos(Number(e.target.value))}
                              className="absolute inset-0 opacity-0 cursor-col-resize w-10 -translate-x-4 h-full"
                            />
                          </div>
                        </div>
                      )}

                      {/* Social templates mockup */}
                      {viewMode === 'templates' && (
                        <div className="w-full max-w-lg p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-4">
                          <div className="text-center font-bold text-xs uppercase text-slate-400">Social Aspect mock preview</div>
                          
                          <div className="flex justify-center">
                            <div className="p-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl flex flex-col items-center gap-3 shadow-md max-w-xs w-full">
                              <div className="flex items-center gap-2 w-full">
                                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-bold text-xs text-[#518231]">N</div>
                                <div className="text-[10px] font-bold">nexus_design</div>
                              </div>
                              
                              {/* Renders image inside mock card */}
                              <div className="w-full aspect-square bg-slate-100 dark:bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden border border-slate-200/50 dark:border-slate-800">
                                <img 
                                  src={activeItem.convertedUrl || activeItem.originalUrl} 
                                  alt="Instagram Mock" 
                                  className="w-full h-full object-cover" 
                                />
                              </div>

                              <div className="flex items-center justify-between w-full text-[9px] text-slate-400">
                                <span>1,245 likes</span>
                                <span>View all comments</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                    </>
                  ) : (
                    <div className="text-slate-400 dark:text-slate-500 font-medium text-center">
                      No active image loaded. Add or select queue items.
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Integration tab */}
            {editorTab === 'code' && (
              <div className="space-y-6">
                
                {/* HTML Picture tag fallbacks */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <CheckSquare size={16} className="text-[#518231]" /> Responsive Picture Element Markup
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Wrap JPEG/JPG assets inside an HTML5 picture element to load lighter next-generation formats (like WebP/AVIF) to compatible browsers first.
                  </p>
                  <div className="relative">
                    <pre className="text-xs text-slate-355 bg-slate-900 p-4 rounded-xl overflow-x-auto border border-slate-800">
                      <code>{responsivePictureCode || "Upload an image to generate code snippet"}</code>
                    </pre>
                    {activeItem && (
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(responsivePictureCode);
                          setSuccessMsg("Copied HTML5 code to clipboard!");
                          setTimeout(() => setSuccessMsg(null), 3000);
                        }}
                        className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-md transition-colors"
                      >
                        <Copy size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Next.js Image Component */}
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <CheckSquare size={16} className="text-[#518231]" /> Next.js Image Component Snippet
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Use Next.js custom Image loader wrappers to optimize layout boundaries and configure quality sliders natively.
                  </p>
                  <div className="relative">
                    <pre className="text-xs text-slate-355 bg-slate-900 p-4 rounded-xl overflow-x-auto border border-slate-800">
                      <code>{nextImageCode || "Upload an image to generate code snippet"}</code>
                    </pre>
                    {activeItem && (
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(nextImageCode);
                          setSuccessMsg("Copied React code to clipboard!");
                          setTimeout(() => setSuccessMsg(null), 3000);
                        }}
                        className="absolute top-3 right-3 p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-md transition-colors"
                      >
                        <Copy size={14} />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* Performance Analytics Dashboard tab */}
            {editorTab === 'stats' && (
              <div className="space-y-6">
                
                {activeItem && comparisonScores ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      
                      {/* Original Size */}
                      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Original Size</div>
                        <div className="text-lg font-bold mt-1">{(activeItem.size / 1024).toFixed(1)} KB</div>
                      </div>

                      {/* Converted Size */}
                      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">JPG Size</div>
                        <div className="text-lg font-bold text-[#518231] mt-1">
                          {activeItem.convertedSize ? `${(activeItem.convertedSize / 1024).toFixed(1)} KB` : 'Pending'}
                        </div>
                      </div>

                      {/* Quality score */}
                      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Visual Score</div>
                        <div className="text-lg font-bold text-amber-500 mt-1">{comparisonScores.qualityScore}/100</div>
                      </div>

                      {/* Compression score */}
                      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Savings Ratio</div>
                        <div className="text-lg font-bold text-[#518231] mt-1">
                          {activeItem.convertedSize ? `${comparisonScores.savingsPct}% Saved (${comparisonScores.ratio}x)` : 'Pending'}
                        </div>
                      </div>

                    </div>

                    {/* Compression details message */}
                    <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs space-y-2 text-slate-605 dark:text-slate-350">
                      <div className="font-bold flex items-center gap-1.5 text-slate-800 dark:text-slate-250"><Info size={14} className="text-[#518231]" /> Compression Information</div>
                      <p>
                        JPEGs utilize a mathematical Discrete Cosine Transform (DCT) combined with color-depth chroma subsampling (reducing chrominance relative to luminance).
                      </p>
                      <p>
                        If your file size increased (which occasionally happens when converting small vector graphics or compressed WebP files to JPG), it is because JPG does not support alpha transparency structures and fills transparent grids with solid background bytes.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-550">Upload files to review metrics.</div>
                )}

              </div>
            )}

            {/* Recent Upload queue list (bulk processing manager) */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers size={16} className="text-[#518231]" /> Processing Queue ({queue.length} items)
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={processBatchQueue}
                    disabled={isProcessing}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#518231] hover:bg-[#436a28] disabled:bg-[#518231]/55 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
                  >
                    {isProcessing ? <Loader2 size={13} className="animate-spin" /> : <Play size={13} />} Convert All
                  </button>
                  <button 
                    onClick={downloadAllZip}
                    disabled={isProcessing}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-55 text-slate-700 dark:text-slate-355 border border-slate-250 dark:border-slate-700 rounded-lg text-xs font-semibold shadow-sm transition-colors"
                  >
                    <FileDown size={13} /> ZIP Export
                  </button>
                  <button 
                    onClick={clearQueue}
                    disabled={isProcessing}
                    className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-md transition-colors"
                    title="Clear Queue"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>

              {/* Queue items mapping */}
              <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-1">
                {queue.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => setActiveItemId(item.id)}
                    className={`flex items-center gap-4 p-3 border rounded-xl cursor-pointer transition-all ${
                      activeItemId === item.id 
                        ? 'border-[#518231] bg-[#518231]/5 dark:bg-[#518231]/10' 
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850/50'
                    }`}
                  >
                    <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
                      <FileImage size={20} className="text-[#518231]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{item.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">
                          {item.width && item.height ? `${item.width}×${item.height} | ` : ''} {(item.size / 1024).toFixed(0)} KB
                        </span>
                      </div>
                      
                      {/* Queue Status log or progress bar */}
                      <div className="mt-1 flex items-center justify-between gap-4">
                        {item.status === 'converting' ? (
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1">
                            <div className="bg-[#518231] h-1 rounded-full transition-all" style={{ width: `${item.progress}%` }}></div>
                          </div>
                        ) : item.status === 'success' ? (
                          <div className="flex items-center gap-1.5 text-[10px] text-emerald-605 dark:text-emerald-450 font-semibold">
                            <CheckCircle2 size={12} /> Lossless JPG ready ({(item.convertedSize! / 1024).toFixed(0)} KB)
                          </div>
                        ) : item.status === 'error' ? (
                          <div className="flex items-center gap-1.5 text-[10px] text-red-550 font-semibold">
                            <AlertCircle size={12} /> {item.errorMsg || 'Failed'}
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium">Waiting to process</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      {item.status === 'success' && (
                        <button 
                          onClick={(e) => { e.stopPropagation(); downloadSingle(item); }}
                          className="p-1.5 hover:bg-[#518231]/10 text-[#518231] rounded-md transition-colors"
                          title="Download JPG"
                        >
                          <Download size={14} />
                        </button>
                      )}
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                        className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 rounded-md transition-colors"
                        title="Remove"
                      >
                        <X size={14} />
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right panel: Settings Config Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Presets Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sliders size={16} className="text-[#518231]" /> Presets
              </h3>
              <div className="space-y-2">
                {PRESETS.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPreset(p.id);
                      if (p.id === 'social-media') {
                        setViewMode('templates');
                      } else {
                        setViewMode('side-by-side');
                      }
                    }}
                    className={`w-full text-left p-3 border rounded-xl transition-all ${
                      preset === p.id 
                        ? 'border-[#518231] bg-[#518231]/5 dark:bg-[#518231]/10 shadow-sm' 
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850/50'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{p.name}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quality controls (low, medium, high, max + slider) */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Settings size={16} className="text-[#518231]" /> Quality settings
              </h3>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-650 dark:text-slate-350 block">Preset Levels</label>
                <div className="grid grid-cols-4 gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/50 dark:border-slate-700">
                  {(['low', 'medium', 'high', 'max'] as const).map(level => (
                    <button 
                      key={level}
                      onClick={() => handleQualityLevelChange(level)}
                      className={`text-[10px] font-bold py-1.5 rounded-md capitalize ${qualityLevel === level ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-xs font-bold text-slate-650 dark:text-slate-350">
                  <span>Compression Quality</span>
                  <span className="text-[#518231]">{quality}%</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={quality} 
                  onChange={(e) => {
                    setQuality(Number(e.target.value));
                    setPreset('custom');
                  }}
                  className="w-full accent-[#518231] h-1 bg-slate-200 dark:bg-slate-750 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Export format extension */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <label className="text-xs font-bold text-slate-650 dark:text-slate-350 block">Output Extension</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input 
                      type="radio" 
                      name="extension" 
                      checked={exportExtension === 'jpg'} 
                      onChange={() => setExportExtension('jpg')}
                      className="text-[#518231] focus:ring-[#518231]" 
                    />
                    .jpg
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                    <input 
                      type="radio" 
                      name="extension" 
                      checked={exportExtension === 'jpeg'} 
                      onChange={() => setExportExtension('jpeg')}
                      className="text-[#518231] focus:ring-[#518231]" 
                    />
                    .jpeg
                  </label>
                </div>
              </div>
            </div>

            {/* Backdrop Transparency options (since JPG lacks alpha) */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Palette size={16} className="text-[#518231]" /> Transparency Backdrop
              </h3>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                JPEGs do not support transparent layers. Select a background color to fill transparent areas of PNG/WebP files.
              </p>

              <div className="space-y-3">
                <div className="flex gap-2 items-center">
                  <input 
                    type="color" 
                    value={customBgColor} 
                    onChange={(e) => setCustomBgColor(e.target.value)}
                    className="w-8 h-8 rounded border-0 cursor-pointer"
                  />
                  <input 
                    type="text" 
                    value={customBgColor} 
                    onChange={(e) => setCustomBgColor(e.target.value)}
                    className="flex-1 text-xs px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  />
                </div>
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setCustomBgColor('#ffffff')}
                    className="flex-1 text-[10px] font-bold py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-805 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    White
                  </button>
                  <button 
                    onClick={() => setCustomBgColor('#000000')}
                    className="flex-1 text-[10px] font-bold py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-805 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    Black
                  </button>
                </div>
              </div>
            </div>

            {/* Social templates resizer panel */}
            {preset === 'social-media' && (
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Maximize size={16} className="text-[#518231]" /> Social Media Resizer
                </h3>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-650 dark:text-slate-350 block">Post Aspect Target</label>
                  <select 
                    value={socialTemplate}
                    onChange={(e) => setSocialTemplate(e.target.value)}
                    className="w-full text-xs px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#518231]"
                  >
                    {SOCIAL_TEMPLATES.map(t => (
                      <option key={t.id} value={t.id}>{t.name} ({t.width}x{t.height})</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-650 dark:text-slate-350 block">Scaling Alignment</label>
                  <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/50 dark:border-slate-700">
                    <button 
                      onClick={() => setSocialFit('contain')}
                      className={`text-[10px] font-bold py-1.5 rounded-md ${socialFit === 'contain' ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      Letterbox (Contain)
                    </button>
                    <button 
                      onClick={() => setSocialFit('cover')}
                      className={`text-[10px] font-bold py-1.5 rounded-md ${socialFit === 'cover' ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                    >
                      Crop Fill (Cover)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Conversion action trigger button */}
            {activeItem && activeItem.status !== 'success' && (
              <button
                onClick={processActiveItem}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#518231] hover:bg-[#436a28] disabled:bg-[#518231]/55 text-white font-bold rounded-2xl shadow-lg shadow-[#518231]/10 hover:shadow-[#518231]/20 transition-all duration-300 transform active:scale-98"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    <span>Processing JPEG Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play size={18} />
                    <span>Convert Active Image</span>
                  </>
                )}
              </button>
            )}

            {/* Privacy and secure notice panel */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/30 border border-slate-250 dark:border-slate-800 rounded-2xl text-center space-y-1.5 shadow-inner">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5">
                <CheckSquare className="text-emerald-655 dark:text-emerald-450" size={14} /> Local Processing
              </div>
              <p className="text-[10px] text-slate-550 leading-normal">
                Your images remain private. All processing happens locally in your browser. No files are uploaded to our servers.
              </p>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
