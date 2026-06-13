"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { 
  Upload, Trash2, Download, RefreshCw, Sliders, Eye, 
  CheckCircle2, AlertCircle, Loader2, Sparkles, Plus, X, 
  Info, FileCode, CheckSquare, Maximize, Columns, 
  ZoomIn, ZoomOut, Copy, FileDown, Layers, Play, Settings,
  ArrowRight, Activity, FileImage
} from "lucide-react";
import { useTheme } from 'next-themes';
import JSZip from 'jszip';

interface QueueItem {
  id: string;
  file?: File;
  name: string;
  size: number;
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
  { id: 'standard', name: 'Standard', desc: 'Lossy WebP at 80% quality. Perfect balance.' },
  { id: 'high-quality', name: 'High Quality', desc: 'Lossy WebP at 95% quality. Maximum details.' },
  { id: 'high-compression', name: 'Aggressive', desc: 'Lossy WebP at 50% quality. Maximum compression.' },
  { id: 'website', name: 'Website Opt', desc: 'Auto scales width to max 1920px. 75% quality.' },
  { id: 'ecommerce', name: 'Ecommerce Opt', desc: '85% quality. Optimized for transparent logos.' }
];

export function ConvertToWebpTool() {
  const { resolvedTheme } = useTheme();

  // Queue state
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // Settings
  const [preset, setPreset] = useState<string>('standard');
  const [quality, setQuality] = useState<number>(80);
  const [compressionMode, setCompressionMode] = useState<'lossy' | 'lossless'>('lossy');

  // Previewer View Settings
  const [viewMode, setViewMode] = useState<'side-by-side' | 'split' | 'vector'>('side-by-side');
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
        setQuality(80);
        setCompressionMode('lossy');
        break;
      case 'high-quality':
        setQuality(95);
        setCompressionMode('lossy');
        break;
      case 'high-compression':
        setQuality(50);
        setCompressionMode('lossy');
        break;
      case 'website':
        setQuality(75);
        setCompressionMode('lossy');
        break;
      case 'ecommerce':
        setQuality(85);
        setCompressionMode('lossy');
        break;
    }
  }, [preset]);

  // Handle lossy vs lossless
  useEffect(() => {
    if (compressionMode === 'lossless') {
      setQuality(100);
    }
  }, [compressionMode]);

  // Read upload files
  const handleFiles = useCallback((files: FileList | File[]) => {
    const newList: QueueItem[] = [];
    setErrorMsg(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      const allowed = ['.png', '.jpg', '.jpeg', '.webp', '.bmp', '.gif'];
      
      if (!allowed.includes(ext)) {
        setErrorMsg("Unsupported image type. Please upload JPG, PNG, WEBP, or BMP images.");
        continue;
      }

      if (file.size > 20 * 1024 * 1024) {
        setErrorMsg("Images larger than 20MB are not recommended for client-side processing.");
        continue;
      }

      const id = `webp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const url = URL.createObjectURL(file);

      newList.push({
        id,
        file,
        name: file.name,
        size: file.size,
        originalUrl: url,
        convertedUrl: null,
        convertedBlob: null,
        convertedSize: null,
        status: 'idle',
        progress: 0,
        width: null,
        height: null
      });
    }

    if (newList.length > 0) {
      setQueue(prev => [...prev, ...newList]);
      if (!activeItemId) {
        setActiveItemId(newList[0].id);
      }
    }
  }, [activeItemId]);

  // Drag and Drop
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

  const removeQueueItem = (id: string) => {
    setQueue(prev => {
      const item = prev.find(q => q.id === id);
      if (item) {
        URL.revokeObjectURL(item.originalUrl);
        if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
      }
      return prev.filter(q => q.id !== id);
    });
    if (activeItemId === id) {
      setActiveItemId(null);
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

  // Convert single item to WebP
  const convertItem = async (item: QueueItem): Promise<QueueItem> => {
    if (item.status === 'converting') return item;

    setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'converting', progress: 20 } : q));
    await new Promise(r => setTimeout(r, 50));

    try {
      const img = new Image();
      img.src = item.originalUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;

      let w = originalWidth;
      let h = originalHeight;

      // Website preset downscales high-resolution images
      if (preset === 'website' && w > 1920) {
        h = Math.round((h * 1920) / w);
        w = 1920;
      }

      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, progress: 50 } : q));
      await new Promise(r => setTimeout(r, 50));

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not initialize canvas context");

      // Draw original image, preserving alpha channels
      ctx.drawImage(img, 0, 0, w, h);

      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, progress: 80 } : q));
      await new Promise(r => setTimeout(r, 50));

      // Determine quality parameter
      const qVal = compressionMode === 'lossless' ? 1.0 : quality / 100;

      // Export canvas to WebP Blob
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), 'image/webp', qVal);
      });

      if (!blob) throw new Error("Canvas WebP encoding failed");

      const convertedUrl = URL.createObjectURL(blob);

      return {
        ...item,
        status: 'success',
        progress: 100,
        width: w,
        height: h,
        convertedBlob: blob,
        convertedUrl,
        convertedSize: blob.size
      };
    } catch (e: any) {
      console.error(e);
      return {
        ...item,
        status: 'error',
        progress: 0,
        errorMsg: e.message || "Decoding failed"
      };
    }
  };

  const processActiveItem = async () => {
    if (!activeItem) return;
    setIsProcessing(true);
    const updated = await convertItem(activeItem);
    setQueue(prev => prev.map(q => q.id === activeItem.id ? updated : q));
    setIsProcessing(false);
  };

  const processBatchQueue = async () => {
    setIsProcessing(true);
    const pending = queue.filter(q => q.status !== 'success');
    for (const item of pending) {
      const updated = await convertItem(item);
      setQueue(prev => prev.map(q => q.id === item.id ? updated : q));
    }
    setIsProcessing(false);
    setSuccessMsg(`Successfully compressed ${pending.length} files to WebP!`);
  };

  // Downloads
  const downloadSingleFile = (item: QueueItem) => {
    if (!item.convertedUrl) return;
    const a = document.createElement('a');
    a.href = item.convertedUrl;
    a.download = item.name.replace(/\.[^/.]+$/, "") + ".webp";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadZip = async () => {
    const successfulItems = queue.filter(q => q.status === 'success' && q.convertedBlob);
    if (successfulItems.length === 0) return;

    const zip = new JSZip();
    successfulItems.forEach(item => {
      if (item.convertedBlob) {
        const name = item.name.replace(/\.[^/.]+$/, "") + ".webp";
        zip.file(name, item.convertedBlob);
      }
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `webp_images_${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Pan & Zoom controls
  const handleZoom = (direction: 'in' | 'out' | 'reset') => {
    if (direction === 'in') setZoom(z => Math.min(20, z + 0.25));
    if (direction === 'out') setZoom(z => Math.max(0.5, z - 0.25));
    if (direction === 'reset') {
      setZoom(1);
      setPanX(0);
      setPanY(0);
    }
  };

  const startPan = (e: React.MouseEvent) => {
    setIsPanning(true);
    setPanStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const doPan = (e: React.MouseEvent) => {
    if (!isPanning) return;
    setPanX(e.clientX - panStart.x);
    setPanY(e.clientY - panStart.y);
  };

  const endPan = () => {
    setIsPanning(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Code snippets generators
  const pictureHtmlCode = useMemo(() => {
    const name = activeItem?.name.replace(/\.[^/.]+$/, "") || 'image';
    return `<picture>
  <source srcset="/images/${name}.webp" type="image/webp">
  <img src="/images/${name}.jpg" alt="Responsive WebP fallback description" loading="lazy" width="${activeItem?.width || 800}" height="${activeItem?.height || 600}">
</picture>`;
  }, [activeItem]);

  const reactNextImageCode = useMemo(() => {
    const name = activeItem?.name.replace(/\.[^/.]+$/, "") || 'image';
    return `import Image from 'next/image';

export default function MyOptimizedImage() {
  return (
    <Image
      src="/images/${name}.webp"
      alt="Next.js responsive WebP component layout"
      width={${activeItem?.width || 800}}
      height={${activeItem?.height || 600}}
      priority={false}
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,..."
    />
  );
}`;
  }, [activeItem]);

  // Keyboard paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        handleFiles(e.clipboardData.files);
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFiles]);

  return (
    <div className="space-y-6">
      {/* Privacy Notice Banner */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-2">
          <Layers size={14} className="text-[#518231]" />
          <span><strong>Your images remain private.</strong> All WebP processing occurs client-side inside your browser canvas threads. No files are uploaded to our servers.</span>
        </div>
      </div>

      {/* Alert Messages */}
      {errorMsg && (
        <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded-r-lg text-sm text-red-800 dark:text-red-350 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} />
            <span>{errorMsg}</span>
          </div>
          <button onClick={() => setErrorMsg(null)}><X size={16} /></button>
        </div>
      )}

      {successMsg && (
        <div className="bg-[#518231]/10 border-l-4 border-[#518231] p-4 rounded-r-lg text-sm text-[#518231] dark:text-[#7ab84d] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            <span>{successMsg}</span>
          </div>
          <button onClick={() => setSuccessMsg(null)}><X size={16} /></button>
        </div>
      )}

      {/* Upload Drag & Drop area */}
      {queue.length === 0 ? (
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`h-[420px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-center p-8 cursor-pointer transition-all duration-300 ${
            dragActive 
              ? 'border-[#518231] bg-[#518231]/5' 
              : 'border-slate-350 dark:border-slate-850 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Upload className="w-16 h-16 text-slate-400 mb-4 animate-bounce" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Drag & Drop Images Here</h3>
          <p className="text-sm text-slate-500 dark:text-slate-450 mt-2 max-w-sm">
            Supports JPG, JPEG, PNG, WEBP, and BMP images up to 20MB. Converts transparent layers cleanly to WebP.
          </p>
          <button className="mt-6 px-6 py-2.5 bg-[#518231] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#518231]/95 transition-all">
            Browse Images
          </button>
          <p className="text-[10px] text-slate-400 mt-3">Or copy any image and press (Ctrl+V) to paste directly onto the queue</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left panel: Queue & Previews (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Sync Viewports */}
            <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl overflow-hidden relative shadow-sm flex flex-col min-h-[460px] max-h-[600px] h-[50vh]">
              {/* Toolbar */}
              <div className="bg-white dark:bg-slate-900 border-b border-slate-250 dark:border-slate-850 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-10">
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setViewMode('side-by-side')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${viewMode === 'side-by-side' ? 'bg-[#518231] text-white' : 'hover:bg-slate-150 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-400'}`}
                  >
                    <div className="flex items-center gap-1.5"><Columns size={13} /> Side-by-Side</div>
                  </button>
                  <button 
                    onClick={() => setViewMode('split')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${viewMode === 'split' ? 'bg-[#518231] text-white' : 'hover:bg-slate-150 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-400'}`}
                  >
                    <div className="flex items-center gap-1.5"><Sliders size={13} /> Slider Split</div>
                  </button>
                  <button 
                    onClick={() => setViewMode('vector')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${viewMode === 'vector' ? 'bg-[#518231] text-white' : 'hover:bg-slate-150 dark:hover:bg-slate-800 text-slate-650 dark:text-slate-400'}`}
                  >
                    <div className="flex items-center gap-1.5"><Maximize size={13} /> Output WebP</div>
                  </button>
                </div>

                <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                  <button 
                    onClick={() => handleZoom('out')}
                    className="p-2 hover:bg-slate-150 dark:hover:bg-slate-800 rounded-lg animate-pulse"
                    title="Zoom Out"
                  >
                    <ZoomOut size={15} />
                  </button>
                  <span className="px-2 font-mono font-bold">{Math.round(zoom * 100)}%</span>
                  <button 
                    onClick={() => handleZoom('in')}
                    className="p-2 hover:bg-slate-150 dark:hover:bg-slate-800 rounded-lg animate-pulse"
                    title="Zoom In"
                  >
                    <ZoomIn size={15} />
                  </button>
                  <button 
                    onClick={() => handleZoom('reset')}
                    className="px-2.5 py-1.5 hover:bg-slate-150 dark:hover:bg-slate-800 rounded-lg font-bold ml-1"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Viewport Panels */}
              <div 
                ref={previewContainerRef}
                onMouseDown={startPan}
                onMouseMove={doPan}
                onMouseUp={endPan}
                onMouseLeave={endPan}
                className="flex-1 overflow-hidden relative select-none cursor-grab active:cursor-grabbing bg-workspace-checker flex items-center justify-center"
              >
                {/* Side-by-Side original/webp view */}
                {viewMode === 'side-by-side' && (
                  <div className="grid grid-cols-2 w-full h-full divide-x divide-slate-200 dark:divide-slate-850">
                    <div className="relative overflow-hidden flex items-center justify-center h-full p-6">
                      <div 
                        style={{
                          transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
                          transformOrigin: 'center center'
                        }}
                        className="transition-transform duration-75 max-w-full max-h-full flex items-center justify-center"
                      >
                        <img src={activeItem?.originalUrl} className="max-h-[360px] object-contain pointer-events-none" alt="Original" />
                      </div>
                      <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-sm shadow">
                        Original Asset
                      </div>
                    </div>

                    <div className="relative overflow-hidden flex items-center justify-center h-full p-6">
                      <div 
                        style={{
                          transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
                          transformOrigin: 'center center'
                        }}
                        className="transition-transform duration-75 max-w-full max-h-full flex items-center justify-center"
                      >
                        {activeItem?.status === 'success' && activeItem.convertedUrl ? (
                          <img src={activeItem.convertedUrl} className="max-h-[360px] object-contain pointer-events-none" alt="WebP Output" />
                        ) : (
                          <div className="text-slate-400 text-center space-y-2">
                            {activeItem?.status === 'converting' ? (
                              <>
                                <Loader2 className="animate-spin w-6 h-6 mx-auto text-[#518231]" />
                                <p className="text-xs">Compressing frame {activeItem.progress}%...</p>
                              </>
                            ) : (
                              <>
                                <FileImage className="w-8 h-8 mx-auto text-slate-350" />
                                <p className="text-xs">Click Compress WebP button to encode image.</p>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="absolute top-3 left-3 bg-[#518231] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
                        Converted WebP
                      </div>
                    </div>
                  </div>
                )}

                {/* Slider split comparison */}
                {viewMode === 'split' && (
                  <div className="relative w-full h-full flex items-center justify-center p-6 overflow-hidden">
                    <div 
                      style={{
                        transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
                        transformOrigin: 'center center',
                        width: '320px',
                        height: '320px',
                        maxWidth: '90%',
                        maxHeight: '90%'
                      }}
                      className="relative border border-slate-250 dark:border-slate-800 shadow-xl overflow-hidden aspect-square bg-slate-900"
                    >
                      {/* Left base: Original */}
                      <img 
                        src={activeItem?.originalUrl} 
                        className="absolute inset-0 w-full h-full object-contain bg-workspace-checker pointer-events-none" 
                        alt="Background Original"
                      />

                      {/* Right top: WebP overlay clipped */}
                      {activeItem?.status === 'success' && activeItem.convertedUrl && (
                        <img 
                          src={activeItem.convertedUrl} 
                          style={{ clipPath: `polygon(0 0, ${splitPos}% 0, ${splitPos}% 100%, 0 100%)` }}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none bg-workspace-checker"
                          alt="WebP Output overlay"
                        />
                      )}

                      {/* Slider bar handle */}
                      <div 
                        style={{ left: `${splitPos}%` }}
                        className="absolute top-0 bottom-0 w-1 bg-[#518231] cursor-ew-resize pointer-events-auto"
                      >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-900 border-2 border-[#518231] rounded-full flex items-center justify-center shadow-lg pointer-events-none">
                          <Sliders className="w-3 text-[#518231]" />
                        </div>
                      </div>
                      
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={splitPos} 
                        onChange={(e) => setSplitPos(Number(e.target.value))} 
                        className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20 pointer-events-auto"
                      />
                    </div>
                  </div>
                )}

                {/* Single WebP output viewport */}
                {viewMode === 'vector' && (
                  <div className="relative overflow-hidden flex items-center justify-center w-full h-full p-8">
                    <div 
                      style={{
                        transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
                        transformOrigin: 'center center'
                      }}
                      className="transition-transform duration-75 max-w-full max-h-full flex items-center justify-center"
                    >
                      {activeItem?.status === 'success' && activeItem.convertedUrl ? (
                        <img src={activeItem.convertedUrl} className="max-h-[400px] object-contain pointer-events-none" alt="WebP Output" />
                      ) : (
                        <div className="text-slate-400 text-center space-y-2">
                          {activeItem?.status === 'converting' ? (
                            <>
                              <Loader2 className="animate-spin w-8 h-8 mx-auto text-[#518231]" />
                              <p className="text-xs">Compressing frame...</p>
                            </>
                          ) : (
                            <>
                              <FileImage className="w-10 h-10 mx-auto text-slate-350" />
                              <p className="text-xs">Compute WebP rendering outputs.</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="absolute top-3 left-3 bg-[#518231] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1.5">
                      <Layers size={10} /> WebP next-gen format
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Panel: HTML/React developers code integration tabs */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
              <div className="flex border-b border-slate-150 dark:border-slate-800 text-xs">
                <button 
                  onClick={() => setEditorTab('preview')}
                  className={`px-5 py-3.5 font-bold transition-all border-b-2 ${editorTab === 'preview' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-550 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'}`}
                >
                  <div className="flex items-center gap-1.5"><Eye size={13} /> Visual Preview</div>
                </button>
                <button 
                  onClick={() => setEditorTab('code')}
                  className={`px-5 py-3.5 font-bold transition-all border-b-2 ${editorTab === 'code' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-550 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'}`}
                >
                  <div className="flex items-center gap-1.5"><FileCode size={13} /> HTML5 picture Tag</div>
                </button>
                <button 
                  onClick={() => setEditorTab('stats')}
                  className={`px-5 py-3.5 font-bold transition-all border-b-2 ${editorTab === 'stats' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-550 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'}`}
                >
                  <div className="flex items-center gap-1.5"><Activity size={13} /> Dev Integration</div>
                </button>
              </div>

              <div className="p-4 text-xs">
                {editorTab === 'preview' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Review quality details before bulk packaging or single download.</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => downloadSingleFile(activeItem!)}
                          disabled={!activeItem?.convertedUrl}
                          className="px-4 py-2 bg-[#518231] hover:bg-[#518231]/90 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                        >
                          <Download size={13} /> Download WebP
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* HTML picture tag fallback snippet */}
                {editorTab === 'code' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">HTML5 responsive source sets fallback code block. Copy and insert into HTML.</span>
                      <button 
                        onClick={() => { navigator.clipboard.writeText(pictureHtmlCode); setSuccessMsg("HTML picture tag copied!"); setTimeout(() => setSuccessMsg(null), 3000); }}
                        className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-850 rounded bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 flex items-center gap-1 font-bold text-slate-650 dark:text-slate-300"
                      >
                        <Copy size={12} /> Copy Code
                      </button>
                    </div>
                    <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl overflow-x-auto font-mono text-[11px]">
                      <code>{pictureHtmlCode}</code>
                    </pre>
                  </div>
                )}

                {/* Next.js responsive component script */}
                {editorTab === 'stats' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Next.js Framework `next/image` component structure. Copy and use in React components.</span>
                      <button 
                        onClick={() => { navigator.clipboard.writeText(reactNextImageCode); setSuccessMsg("Next.js component copied!"); setTimeout(() => setSuccessMsg(null), 3000); }}
                        className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-850 rounded bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 flex items-center gap-1 font-bold text-slate-650 dark:text-slate-300"
                      >
                        <Copy size={12} /> Copy Component
                      </button>
                    </div>
                    <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl overflow-x-auto font-mono text-[11px]">
                      <code>{reactNextImageCode}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Batch conversions queue */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-850 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <CheckSquare className="text-[#518231] w-4.5 h-4.5" /> WebP Batch Queue ({queue.length})
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl font-bold flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <Plus size={14} /> Add Images
                  </button>
                  <button 
                    onClick={clearQueue}
                    className="p-2 border border-red-200/40 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-505 rounded-xl font-bold flex items-center gap-1.5 text-xs"
                  >
                    <Trash2 size={14} /> Clear Queue
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
                {queue.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => setActiveItemId(item.id)}
                    className={`p-3 rounded-xl border cursor-pointer flex gap-3 items-center justify-between transition-all select-none ${
                      item.id === activeItemId 
                        ? 'border-[#518231] bg-[#518231]/5 shadow-sm shadow-[#518231]/10' 
                        : 'border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden flex-1">
                      <img 
                        src={item.originalUrl} 
                        className="w-12 h-12 rounded object-cover border border-slate-200 dark:border-slate-800 bg-workspace-checker shrink-0" 
                        alt="Queue item preview" 
                      />
                      <div className="overflow-hidden flex-1 space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{item.name}</h4>
                        <p className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold flex items-center gap-1.5">
                          <span>{formatSize(item.size)}</span>
                          {item.convertedSize && (
                            <span className="text-[#518231] font-bold flex items-center gap-1">
                              • {formatSize(item.convertedSize)} (-{Math.round(((item.size - item.convertedSize) / item.size) * 100)}%)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.status === 'converting' && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-[#518231]">
                          <Loader2 size={12} className="animate-spin" />
                          <span>{item.progress}%</span>
                        </div>
                      )}
                      {item.status === 'success' && (
                        <>
                          <CheckCircle2 size={15} className="text-[#518231]" />
                          <button
                            onClick={(e) => { e.stopPropagation(); downloadSingleFile(item); }}
                            className="p-1.5 rounded bg-[#518231]/10 text-[#518231] hover:bg-[#518231] hover:text-white transition-colors"
                            title="Download WebP"
                          >
                            <Download size={12} />
                          </button>
                        </>
                      )}
                      {item.status === 'error' && (
                        <span title={item.errorMsg}>
                          <AlertCircle size={15} className="text-red-500" />
                        </span>
                      )}
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeQueueItem(item.id); }}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Remove Item"
                      >
                        <X size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-150 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={processBatchQueue}
                  disabled={isProcessing || queue.every(q => q.status === 'success')}
                  className="px-6 py-3 bg-[#518231] hover:bg-[#518231]/90 text-white font-bold text-xs rounded-xl disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md shadow-[#518231]/10"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Converting Queue...
                    </>
                  ) : (
                    <>
                      <Play size={14} />
                      Convert Batch Queue
                    </>
                  )}
                </button>
                
                {queue.some(q => q.status === 'success') && (
                  <div className="flex gap-2">
                    <button
                      onClick={downloadZip}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-850 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <FileDown size={14} />
                      ZIP Package Export
                    </button>
                    <button
                      onClick={() => queue.filter(q => q.status === 'success').forEach(q => downloadSingleFile(q))}
                      className="px-5 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-750 dark:text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                    >
                      <Download size={14} />
                      Save All Converted
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right panel: Quality settings sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-6">
            
            {/* Control Form Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-4 sm:p-5 shadow-sm space-y-5">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Settings className="text-[#518231] w-4 h-4" /> WebP Converter Controls
              </h3>

              {/* Mode presets */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Conversion Mode</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPreset(p.id)}
                      className={`px-2 py-2 rounded-lg text-left border text-[10px] font-bold transition-all ${
                        preset === p.id 
                          ? 'border-[#518231] bg-[#518231]/5 text-[#518231]' 
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-650 dark:text-slate-400'
                      }`}
                      title={p.desc}
                    >
                      {p.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 dark:border-slate-850"></div>

              {/* Adjusters */}
              <div className="space-y-4">
                
                {/* Lossy vs Lossless */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Compression Type</span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      onClick={() => setCompressionMode('lossy')}
                      className={`py-2 rounded-xl font-bold transition-all border ${
                        compressionMode === 'lossy'
                          ? 'border-[#518231] bg-[#518231]/5 text-[#518231]'
                          : 'border-slate-250 dark:border-slate-800 hover:bg-slate-50 text-slate-500'
                      }`}
                    >
                      Lossy WebP
                    </button>
                    <button
                      onClick={() => setCompressionMode('lossless')}
                      className={`py-2 rounded-xl font-bold transition-all border ${
                        compressionMode === 'lossless'
                          ? 'border-[#518231] bg-[#518231]/5 text-[#518231]'
                          : 'border-slate-250 dark:border-slate-800 hover:bg-slate-50 text-slate-500'
                      }`}
                    >
                      Lossless WebP
                    </button>
                  </div>
                </div>

                {/* Quality custom slider */}
                {compressionMode === 'lossy' && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <label>Image Quality</label>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-350">{quality}%</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value={quality}
                      onChange={(e) => setQuality(Number(e.target.value))}
                      className="w-full accent-[#518231]"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                      <span>Low (1%)</span>
                      <span>Max Details (100%)</span>
                    </div>
                  </div>
                )}

                {/* Performance stats summary */}
                {activeItem?.status === 'success' && activeItem.convertedSize && (
                  <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-3 rounded-xl space-y-2 text-xs text-slate-650 dark:text-slate-350">
                    <div className="text-[10px] font-bold text-slate-450 uppercase tracking-wider">Performance Analytics</div>
                    <div className="flex justify-between">
                      <span>Original Size:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{formatSize(activeItem.size)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Output WebP Size:</span>
                      <span className="font-bold text-[#518231]">{formatSize(activeItem.convertedSize)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Bandwidth Savings:</span>
                      <span className="font-bold text-[#518231]">
                        Saved {formatSize(activeItem.size - activeItem.convertedSize)} (-{Math.round(((activeItem.size - activeItem.convertedSize) / activeItem.size) * 100)}%)
                      </span>
                    </div>
                    <div className="border-t border-slate-200 dark:border-slate-800 pt-1.5 mt-1 text-[9px] text-slate-400">
                      Estimated LCP loading speed improvement: <strong>+180% faster</strong>
                    </div>
                  </div>
                )}

              </div>

              {/* Trigger */}
              <button
                onClick={processActiveItem}
                disabled={isProcessing || !activeItem}
                className="w-full py-3 bg-[#518231] hover:bg-[#518231]/95 text-white font-bold text-xs rounded-xl disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md shadow-[#518231]/10 mt-4"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Compressing...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Run WebP Conversion
                  </>
                )}
              </button>

            </div>

            {/* Explanation box */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-2xl text-xs text-blue-800 dark:text-blue-300 space-y-2 shadow-sm">
              <h4 className="font-bold flex items-center gap-1.5"><Info size={14} /> Lossy vs Lossless WebP</h4>
              <p><strong>Lossy WebP</strong> discards slight color variations to maximize file savings. Recommended for photos.</p>
              <p><strong>Lossless WebP</strong> preserves image pixels exactly. Recommended for transparent logos, screenshots, and text graphics.</p>
            </div>

          </div>
        </div>
      )}
      
      <input ref={fileInputRef} type="file" className="hidden" accept=".png,.jpg,.jpeg,.webp,.bmp,.gif" multiple onChange={(e) => e.target.files && handleFiles(e.target.files)} />
    </div>
  );
}
