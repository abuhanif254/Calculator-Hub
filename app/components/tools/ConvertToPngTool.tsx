"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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
  { id: 'standard', name: 'Standard PNG', desc: 'Lossless PNG format preserving transparency.' },
  { id: 'high-quality', name: 'High Quality', desc: 'True 32-bit RGB+Alpha depth, maximum details.' },
  { id: 'transparent', name: 'Transparent PNG', desc: 'Forces transparent backdrop check.' },
  { id: 'web-optimized', name: 'Web Optimized', desc: 'Lossless palette quantization to shrink size.' },
  { id: 'design-asset', name: 'Design Asset', desc: 'Original resolution, optimized metadata chunks.' }
];

export function ConvertToPngTool() {
  const { resolvedTheme } = useTheme();

  // Queue state
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // Settings
  const [preset, setPreset] = useState<string>('standard');
  const [backgroundMode, setBackgroundMode] = useState<'keep' | 'transparent' | 'solid'>('keep');
  const [customBgColor, setCustomBgColor] = useState<string>('#ffffff');
  const [transparencyKeying, setTransparencyKeying] = useState<boolean>(false);
  const [keyColor, setKeyColor] = useState<string>('#ffffff');
  const [keyTolerance, setKeyTolerance] = useState<number>(30); // 0-100 tolerance for keying
  const [exportQuality, setExportQuality] = useState<'fast' | 'balanced' | 'max'>('balanced');

  // Previewer View Settings
  const [viewMode, setViewMode] = useState<'side-by-side' | 'split' | 'designer'>('side-by-side');
  const [zoom, setZoom] = useState<number>(1);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [splitPos, setSplitPos] = useState<number>(50); // 0-100 for split slider
  const [editorTab, setEditorTab] = useState<'preview' | 'code' | 'stats'>('preview');

  // Designer tools state
  const [gridStyle, setGridStyle] = useState<'light' | 'dark' | 'none'>('light');
  const [showPixelGrid, setShowPixelGrid] = useState<boolean>(false);
  const [designerMockMode, setDesignerMockMode] = useState<'header' | 'card' | 'badge'>('header');

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
        setBackgroundMode('keep');
        setExportQuality('balanced');
        setTransparencyKeying(false);
        break;
      case 'high-quality':
        setBackgroundMode('keep');
        setExportQuality('max');
        setTransparencyKeying(false);
        break;
      case 'transparent':
        setBackgroundMode('transparent');
        setExportQuality('balanced');
        setTransparencyKeying(true);
        break;
      case 'web-optimized':
        setBackgroundMode('keep');
        setExportQuality('fast'); // Quantization uses compression
        setTransparencyKeying(false);
        break;
      case 'design-asset':
        setBackgroundMode('keep');
        setExportQuality('max');
        setTransparencyKeying(false);
        break;
    }
  }, [preset]);

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
      setSuccessMsg(`Added ${newItems.length} file(s) to the processing list.`);
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

  // Convert Hex color to RGB
  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
  };

  // Canvas process pipeline
  const convertItem = async (item: QueueItem): Promise<QueueItem> => {
    if (item.status === 'success' && item.convertedBlob) return item;

    setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'converting', progress: 15 } : q));
    await new Promise(r => setTimeout(r, 40));

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
          toType: 'image/png'
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

      // Web Optimized presets scale check
      if (preset === 'web-optimized' && w > 1920) {
        h = Math.round((h * 1920) / w);
        w = 1920;
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not construct 2D context");

      // Fill custom background modes if required
      if (backgroundMode === 'solid') {
        ctx.fillStyle = customBgColor;
        ctx.fillRect(0, 0, w, h);
      } else if (backgroundMode === 'transparent') {
        ctx.clearRect(0, 0, w, h);
      }

      // Draw original image
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(objectUrl);

      // Transparency color keying pipeline
      if (transparencyKeying) {
        const imgData = ctx.getImageData(0, 0, w, h);
        const data = imgData.data;
        const targetRgb = hexToRgb(keyColor);
        const threshold = keyTolerance * 2.5; // Scale tolerance factor

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i+1];
          const b = data[i+2];

          // Compute color distance
          const dist = Math.sqrt(
            Math.pow(r - targetRgb.r, 2) +
            Math.pow(g - targetRgb.g, 2) +
            Math.pow(b - targetRgb.b, 2)
          );

          if (dist < threshold) {
            data[i+3] = 0; // Set alpha transparent
          }
        }
        ctx.putImageData(imgData, 0, 0);
      }

      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, progress: 70 } : q));
      await new Promise(r => setTimeout(r, 40));

      // Fetch base PNG blob
      let outBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), 'image/png');
      });

      if (!outBlob) throw new Error("PNG serialization failed");

      // Apply compression tools if Balanced/Web-Optimized selected
      if (exportQuality !== 'max' || preset === 'web-optimized') {
        try {
          const imageCompression = (await import('browser-image-compression')).default;
          const options = {
            maxSizeMB: exportQuality === 'fast' ? 0.5 : 1.5,
            maxWidthOrHeight: w,
            useWebWorker: true,
            fileType: 'image/png'
          };
          const compressed = await imageCompression(new File([outBlob], item.name, { type: 'image/png' }), options);
          outBlob = compressed;
        } catch (compErr) {
          console.warn("PNG Quantization skipped", compErr);
        }
      }

      const convertedUrl = URL.createObjectURL(outBlob);
      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, progress: 90 } : q));

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
        errorMsg: err.message || "Failed decoding asset"
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
    setSuccessMsg("Batch PNG conversion complete!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  // Download logic
  const downloadSingle = (item: QueueItem) => {
    if (!item.convertedUrl) return;
    const link = document.createElement('a');
    const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;
    link.download = `${baseName}_converted.png`;
    link.href = item.convertedUrl;
    link.click();
  };

  const downloadAllZip = async () => {
    if (queue.filter(q => q.status === 'success').length === 0) {
      setErrorMsg("No successfully converted assets to bundle.");
      return;
    }

    setIsProcessing(true);
    try {
      const zip = new JSZip();
      queue.forEach(item => {
        if (item.status === 'success' && item.convertedBlob) {
          const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;
          zip.file(`${baseName}.png`, item.convertedBlob);
        }
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(zipBlob);

      const link = document.createElement('a');
      link.download = `nexus_png_export_${Date.now()}.zip`;
      link.href = zipUrl;
      link.click();

      URL.revokeObjectURL(zipUrl);
      setSuccessMsg("ZIP package downloaded successfully.");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed generating ZIP archive.");
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

  // Code snippets generator helper
  const responsivePictureCode = useMemo(() => {
    if (!activeItem) return '';
    const baseName = activeItem.name.substring(0, activeItem.name.lastIndexOf('.')) || activeItem.name;
    return `<picture>
  <source srcset="${baseName}.webp" type="image/webp" />
  <source srcset="${baseName}.png" type="image/png" />
  <img 
    src="${baseName}.png" 
    alt="Optimized description" 
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

export default function UIAsset() {
  return (
    <Image
      src="/images/${baseName}.png"
      alt="Lossless UI Graphic"
      width={${activeItem.width || 800}}
      height={${activeItem.height || 600}}
      placeholder="blur"
      blurDataURL="data:image/png;base64,..."
      priority={false}
    />
  );
}`;
  }, [activeItem]);

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
              Supports WEBP, JPG, JPEG, SVG, BMP, TIFF, AVIF, HEIC. Processing runs entirely in your browser locally.
            </p>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      {queue.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Previewer and code (7 cols) */}
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
                  <button 
                    onClick={() => setViewMode('designer')}
                    title="Designer Mockups Preview"
                    className={`p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 ${viewMode === 'designer' ? 'bg-slate-100 dark:bg-slate-700 text-[#518231]' : ''}`}
                  >
                    <Palette size={14} />
                  </button>
                </div>
              )}
            </div>

            {/* Viewport Frame */}
            {editorTab === 'preview' && (
              <div className="relative border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-950/5 select-none shadow-inner">
                
                {/* Control toolbar */}
                {viewMode !== 'designer' && (
                  <div className="absolute top-4 left-4 z-10 flex gap-2 items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-850 shadow-md">
                    <button onClick={() => adjustZoom(1.2)} className="p-1 text-slate-600 dark:text-slate-400 hover:text-[#518231]"><ZoomIn size={15} /></button>
                    <button onClick={() => adjustZoom(0.8)} className="p-1 text-slate-600 dark:text-slate-400 hover:text-[#518231]"><ZoomOut size={15} /></button>
                    <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1"></div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-350">{Math.round(zoom * 100)}%</span>
                    <button onClick={resetPanZoom} title="Reset pan & zoom" className="p-1 text-slate-500 hover:text-[#518231] ml-1"><RefreshCw size={12} /></button>
                  </div>
                )}

                {/* Transparency grid style selector */}
                {viewMode !== 'designer' && (
                  <div className="absolute top-4 right-4 z-10 flex gap-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur p-0.5 rounded-xl border border-slate-200/50 dark:border-slate-850 shadow-md">
                    <button 
                      onClick={() => setGridStyle('light')}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg ${gridStyle === 'light' ? 'bg-[#518231] text-white' : 'text-slate-600 dark:text-slate-450'}`}
                    >
                      Light Grid
                    </button>
                    <button 
                      onClick={() => setGridStyle('dark')}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg ${gridStyle === 'dark' ? 'bg-[#518231] text-white' : 'text-slate-600 dark:text-slate-450'}`}
                    >
                      Dark Grid
                    </button>
                    <button 
                      onClick={() => setGridStyle('none')}
                      className={`text-[10px] font-bold px-2 py-1 rounded-lg ${gridStyle === 'none' ? 'bg-[#518231] text-white' : 'text-slate-600 dark:text-slate-450'}`}
                    >
                      Flat
                    </button>
                  </div>
                )}

                {/* Transparency grid CSS definitions */}
                <div 
                  ref={previewContainerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  className={`min-h-[420px] max-h-[500px] flex items-center justify-center p-4 overflow-hidden relative ${
                    gridStyle === 'light' 
                      ? 'bg-[linear-gradient(45deg,#e2e8f0_25%,transparent_25%),linear-gradient(-45deg,#e2e8f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#e2e8f0_75%),linear-gradient(-45deg,transparent_75%,#e2e8f0_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0] dark:bg-[linear-gradient(45deg,#1e293b_25%,transparent_25%),linear-gradient(-45deg,#1e293b_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#1e293b_75%),linear-gradient(-45deg,transparent_75%,#1e293b_75%)]'
                      : gridStyle === 'dark'
                      ? 'bg-[linear-gradient(45deg,#0f172a_25%,transparent_25%),linear-gradient(-45deg,#0f172a_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#0f172a_75%),linear-gradient(-45deg,transparent_75%,#0f172a_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0] dark:bg-[linear-gradient(45deg,#020617_25%,transparent_25%),linear-gradient(-45deg,#020617_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#020617_75%),linear-gradient(-45deg,transparent_75%,#020617_75%)]'
                      : 'bg-white dark:bg-slate-900'
                  }`}
                  style={{ cursor: viewMode === 'split' ? 'default' : isPanning ? 'grabbing' : 'grab' }}
                >
                  {activeItem ? (
                    <>
                      {/* Side-by-side mode */}
                      {viewMode === 'side-by-side' && (
                        <div className="grid grid-cols-2 gap-4 w-full h-full p-2">
                          
                          {/* Original panel */}
                          <div className="flex flex-col items-center justify-center border border-slate-200/40 dark:border-slate-800/40 bg-slate-900/10 dark:bg-slate-900/30 rounded-xl p-2 relative">
                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/60 text-white rounded text-[10px] uppercase font-bold tracking-wider z-10">Original</span>
                            <div className="overflow-hidden w-full h-full flex items-center justify-center">
                              <img 
                                src={activeItem.originalUrl}
                                alt="Original Preview"
                                className="max-h-[300px] object-contain transition-transform duration-75 select-none pointer-events-none"
                                style={{ 
                                  transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                                  imageRendering: showPixelGrid && zoom > 8 ? 'pixelated' : 'auto'
                                }}
                              />
                            </div>
                          </div>

                          {/* Converted panel */}
                          <div className="flex flex-col items-center justify-center border border-slate-200/40 dark:border-slate-800/40 bg-slate-900/10 dark:bg-slate-900/30 rounded-xl p-2 relative">
                            <span className="absolute top-2 left-2 px-2 py-0.5 bg-[#518231] text-white rounded text-[10px] uppercase font-bold tracking-wider z-10 font-sans">PNG</span>
                            {activeItem.status === 'success' && activeItem.convertedUrl ? (
                              <div className="overflow-hidden w-full h-full flex items-center justify-center">
                                <img 
                                  src={activeItem.convertedUrl}
                                  alt="Converted PNG Preview"
                                  className="max-h-[300px] object-contain transition-transform duration-75 select-none pointer-events-none"
                                  style={{ 
                                    transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                                    imageRendering: showPixelGrid && zoom > 8 ? 'pixelated' : 'auto'
                                  }}
                                />
                              </div>
                            ) : (
                              <div className="flex flex-col items-center gap-2 p-8 text-center text-slate-500">
                                {activeItem.status === 'converting' ? (
                                  <>
                                    <Loader2 className="animate-spin text-[#518231]" size={24} />
                                    <span className="text-xs">Processing lossless pipeline...</span>
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
                              style={{ imageRendering: showPixelGrid && zoom > 8 ? 'pixelated' : 'auto' }}
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
                              style={{ imageRendering: showPixelGrid && zoom > 8 ? 'pixelated' : 'auto' }}
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

                      {/* Designer Mockups preview mode */}
                      {viewMode === 'designer' && (
                        <div className="w-full max-w-lg p-6 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800 space-y-4">
                          
                          <div className="flex gap-2 justify-center pb-2 border-b border-slate-100 dark:border-slate-800">
                            <button 
                              onClick={() => setDesignerMockMode('header')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${designerMockMode === 'header' ? 'bg-[#518231] text-white' : 'bg-slate-200/40 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                            >
                              Web Header
                            </button>
                            <button 
                              onClick={() => setDesignerMockMode('card')}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold ${designerMockMode === 'card' ? 'bg-[#518231] text-white' : 'bg-slate-200/40 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
                            >
                              Mobile UI Card
                            </button>
                          </div>

                          {/* Header Mock */}
                          {designerMockMode === 'header' && (
                            <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 rounded-xl space-y-2">
                              <header className="flex items-center justify-between border-b border-slate-100 dark:border-slate-900 pb-3">
                                <div className="flex items-center gap-1.5">
                                  <img 
                                    src={activeItem.convertedUrl || activeItem.originalUrl} 
                                    alt="Logo Brand" 
                                    className="h-6 object-contain" 
                                  />
                                  <span className="font-bold text-xs">NexusShop</span>
                                </div>
                                <nav className="flex gap-2 text-[10px] text-slate-500 font-medium">
                                  <span>Products</span>
                                  <span>Pricing</span>
                                  <span>Blog</span>
                                </nav>
                              </header>
                              <div className="text-[10px] text-slate-400 dark:text-slate-500 text-center py-2">
                                Renders transparent background branding aligned inside navigation headers.
                              </div>
                            </div>
                          )}

                          {/* Mobile UI Card */}
                          {designerMockMode === 'card' && (
                            <div className="p-4 bg-white dark:bg-slate-950 border border-slate-200/60 dark:border-slate-850 rounded-xl max-w-xs mx-auto space-y-3 shadow-sm">
                              <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                                  <img 
                                    src={activeItem.convertedUrl || activeItem.originalUrl} 
                                    alt="Creator Profile" 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                                <div>
                                  <div className="text-xs font-bold">AntiGravity Design</div>
                                  <div className="text-[9px] text-slate-400">Sponsored Post</div>
                                </div>
                              </div>
                              <div className="bg-slate-50 dark:bg-slate-900/70 p-3 rounded-lg flex items-center justify-center min-h-[140px]">
                                <img 
                                  src={activeItem.convertedUrl || activeItem.originalUrl} 
                                  alt="Mobile Card Asset" 
                                  className="max-h-[120px] object-contain shadow-sm rounded-md" 
                                />
                              </div>
                              <div className="text-[10px] font-semibold">High fidelity lossless layouts rendering cleanly inside feed grids.</div>
                            </div>
                          )}

                        </div>
                      )}

                    </>
                  ) : (
                    <div className="text-slate-400 dark:text-slate-500 font-medium text-center">
                      No active image loaded. Add or select queue items.
                    </div>
                  )}
                </div>

                {/* Pixel Grid zoom options in toolbar footer */}
                {viewMode !== 'designer' && activeItem && (
                  <div className="absolute bottom-4 left-4 z-10 flex gap-2 items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-200/50 dark:border-slate-850 shadow-md">
                    <Grid size={13} className="text-[#518231]" />
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400">Pixel Grid (zoom &gt; 800%):</span>
                    <button 
                      onClick={() => setShowPixelGrid(!showPixelGrid)}
                      className={`text-[10px] font-bold px-2 py-0.5 rounded ${showPixelGrid ? 'bg-[#518231] text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-450'}`}
                    >
                      {showPixelGrid ? 'ON' : 'OFF'}
                    </button>
                  </div>
                )}
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
                    Always wrap PNG assets inside an HTML5 picture element to load lighter formats (like WebP) first, using the transparent PNG as a fallback format.
                  </p>
                  <div className="relative">
                    <pre className="text-xs text-slate-350 bg-slate-900 p-4 rounded-xl overflow-x-auto border border-slate-800">
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
                    Use Next.js custom Image loader wrappers to optimize layout boundaries, pre-fetch metadata sizes, and optimize LCP scores.
                  </p>
                  <div className="relative">
                    <pre className="text-xs text-slate-350 bg-slate-900 p-4 rounded-xl overflow-x-auto border border-slate-800">
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
                
                {activeItem ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Size card */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">File Size Comparison</div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold">{(activeItem.size / 1024).toFixed(1)} KB</span>
                        <span className="text-xs text-slate-400">Original</span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-[#518231]">
                          {activeItem.convertedSize ? `${(activeItem.convertedSize / 1024).toFixed(1)} KB` : 'Pending'}
                        </span>
                        <span className="text-xs text-[#518231]">PNG Output</span>
                      </div>
                    </div>

                    {/* Compression card */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Storage Savings</div>
                      {activeItem.convertedSize ? (
                        <>
                          <div className="text-2xl font-black text-[#518231]">
                            {activeItem.convertedSize < activeItem.size 
                              ? `Reduced by ${(((activeItem.size - activeItem.convertedSize) / activeItem.size) * 100).toFixed(0)}%`
                              : `Increased by ${(((activeItem.convertedSize - activeItem.size) / activeItem.size) * 100).toFixed(0)}%`
                            }
                          </div>
                          <p className="text-[10px] text-slate-400">
                            {activeItem.convertedSize < activeItem.size 
                              ? "Lossless quantization successfully stripped redundant color tables."
                              : "Lossless DEFLATE stores raw pixel depth. Size increases are normal when converting from lossy formats like JPEGs."
                            }
                          </p>
                        </>
                      ) : (
                        <div className="text-sm font-semibold text-slate-500">Run conversion to calculate statistics.</div>
                      )}
                    </div>

                    {/* LCP load estimation */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Est. LCP Speed Impact</div>
                      {activeItem.convertedSize ? (
                        <>
                          <div className="text-2xl font-black text-[#518231]">
                            {activeItem.convertedSize < activeItem.size ? "LCP Acceleration" : "Fidelity First"}
                          </div>
                          <p className="text-[10px] text-slate-400">
                            {activeItem.convertedSize < activeItem.size 
                              ? "Lighter web assets speed up image paint times in user browsers." 
                              : "Ensures no pixel blur. Recommended to leverage responsive picture fallbacks for performance budgets."
                            }
                          </p>
                        </>
                      ) : (
                        <div className="text-sm font-semibold text-slate-500">Pending conversion values.</div>
                      )}
                    </div>

                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-550">Upload files to review metrics.</div>
                )}

              </div>
            )}

            {/* Recent Upload queue list (bulk processing manager) */}
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
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
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-55 text-slate-700 dark:text-slate-350 border border-slate-250 dark:border-slate-700 rounded-lg text-xs font-semibold shadow-sm transition-colors"
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
                          <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-450 font-semibold">
                            <CheckCircle2 size={12} /> Lossless PNG ready ({(item.convertedSize! / 1024).toFixed(0)} KB)
                          </div>
                        ) : item.status === 'error' ? (
                          <div className="flex items-center gap-1.5 text-[10px] text-red-500 font-semibold">
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
                          title="Download PNG"
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
                    onClick={() => setPreset(p.id)}
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

            {/* Background & Transparency options */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Palette size={16} className="text-[#518231]" /> Background & Transparency
              </h3>

              {/* Background modes selector */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-650 dark:text-slate-350 block">Backdrop Mode</label>
                <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200/50 dark:border-slate-700">
                  <button 
                    onClick={() => setBackgroundMode('keep')}
                    className={`text-[10px] font-bold py-1.5 rounded-md ${backgroundMode === 'keep' ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                  >
                    Original
                  </button>
                  <button 
                    onClick={() => setBackgroundMode('transparent')}
                    className={`text-[10px] font-bold py-1.5 rounded-md ${backgroundMode === 'transparent' ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                  >
                    Transparent
                  </button>
                  <button 
                    onClick={() => setBackgroundMode('solid')}
                    className={`text-[10px] font-bold py-1.5 rounded-md ${backgroundMode === 'solid' ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
                  >
                    Solid Color
                  </button>
                </div>
              </div>

              {/* Custom background color selector */}
              {backgroundMode === 'solid' && (
                <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 rounded-xl">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Solid Color Value</label>
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
                </div>
              )}

              {/* Transparency keying triggers */}
              <div className="space-y-3 pt-2 border-t border-slate-150 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-650 dark:text-slate-350 block">Convert Solid to Transparent</label>
                  <input 
                    type="checkbox" 
                    checked={transparencyKeying} 
                    onChange={(e) => setTransparencyKeying(e.target.checked)}
                    className="rounded border-slate-300 text-[#518231] focus:ring-[#518231]"
                  />
                </div>

                {transparencyKeying && (
                  <div className="space-y-3 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-850 rounded-xl">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide block">Target Key Color</label>
                      <div className="flex gap-2 items-center">
                        <input 
                          type="color" 
                          value={keyColor} 
                          onChange={(e) => setKeyColor(e.target.value)}
                          className="w-8 h-8 rounded border-0 cursor-pointer"
                        />
                        <input 
                          type="text" 
                          value={keyColor} 
                          onChange={(e) => setKeyColor(e.target.value)}
                          className="flex-1 text-xs px-2.5 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono focus:outline-none focus:ring-1 focus:ring-[#518231]"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                        <span>Tolerance Level</span>
                        <span>{keyTolerance}%</span>
                      </div>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={keyTolerance} 
                        onChange={(e) => setKeyTolerance(Number(e.target.value))}
                        className="w-full accent-[#518231] h-1 bg-slate-200 dark:bg-slate-750 rounded-lg appearance-none cursor-pointer"
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* PNG Quality settings card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Settings size={16} className="text-[#518231]" /> Export Settings
              </h3>
              
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-650 dark:text-slate-350 block">PNG Optimization Level</label>
                <div className="space-y-2">
                  {[
                    { id: 'fast', name: 'Fast Export', desc: 'Slightly larger, processed quickly.' },
                    { id: 'balanced', name: 'Balanced', desc: 'Standard compression (recommended).' },
                    { id: 'max', name: 'Maximum Quality', desc: 'Slowest export, minimal lossless size.' }
                  ].map(item => (
                    <label 
                      key={item.id}
                      className={`flex items-start gap-3 p-2.5 border rounded-xl cursor-pointer transition-all ${
                        exportQuality === item.id 
                          ? 'border-[#518231] bg-[#518231]/5 dark:bg-[#518231]/10' 
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850/50'
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="exportQuality"
                        checked={exportQuality === item.id}
                        onChange={() => setExportQuality(item.id as any)}
                        className="mt-0.5 text-[#518231] focus:ring-[#518231] border-slate-300 dark:border-slate-700"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.name}</div>
                        <div className="text-[9px] text-slate-500 dark:text-slate-450 mt-0.5">{item.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

            </div>

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
                    <span>Processing PNG Pipeline...</span>
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
                <CheckSquare className="text-emerald-600 dark:text-emerald-450" size={14} /> Local Processing
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">
                Your images remain private. All processing happens locally whenever possible. No files are uploaded to our servers.
              </p>
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
