"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { 
  Upload, Trash2, Download, RefreshCw, Sliders, Eye, 
  CheckCircle2, AlertCircle, Loader2, Sparkles, Plus, X, 
  ShieldCheck, Info, FileImage, FileDown, Check, Play, Settings,
  Copy, Code, Columns, Layers, Maximize, FileCode, CheckSquare, 
  Palette, ZoomIn, ZoomOut, Move
} from "lucide-react";
import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import JSZip from 'jszip';
import { ImageTracer, TraceOptions, TraceStats } from '@/lib/utils/imageTracer';

interface QueueItem {
  id: string;
  file?: File;
  name: string;
  size: number;
  originalUrl: string; // for canvas and side-by-side preview
  status: 'idle' | 'converting' | 'success' | 'error';
  progress: number;
  width: number | null;
  height: number | null;
  svgCode: string | null;
  stats: TraceStats | null;
  errorMsg?: string;
}

const PRESETS = [
  { id: 'logo', name: 'Logo Mode', desc: 'Sharp edges, flat colors, optimized paths.' },
  { id: 'icon', name: 'Icon Mode', desc: 'Highly simplified paths, clean flat shapes.' },
  { id: 'illustration', name: 'Illustration', desc: 'Layered color details, moderate curves.' },
  { id: 'lineart', name: 'Line Art', desc: 'Traces borders as outlines, no solid fills.' },
  { id: 'bw', name: 'Black & White', desc: 'High contrast binary outlines.' },
  { id: 'detailed', name: 'Detailed Artwork', desc: 'Preserves fine details and gradients.' }
];

export function PngToSvgTool() {
  const { resolvedTheme } = useTheme();
  const monacoTheme = resolvedTheme === 'dark' ? 'vs-dark' : 'light';

  // Queue state
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // Settings
  const [presetMode, setPresetMode] = useState<string>('logo');
  const [quality, setQuality] = useState<'fast' | 'balanced' | 'high' | 'ultra'>('balanced');
  const [colorMode, setColorMode] = useState<'color' | 'grayscale' | 'monochrome' | 'bw'>('color');
  const [colorCount, setColorCount] = useState<number>(8);
  const [simplify, setSimplify] = useState<number>(2); // 0-5
  const [smoothing, setSmoothing] = useState<number>(40); // 0-100
  const [removeBackground, setRemoveBackground] = useState<boolean>(true);
  const [edgeSensitivity, setEdgeSensitivity] = useState<number>(50); // 0-100
  const [strokeColor, setStrokeColor] = useState<string>('#000000');
  const [strokeWidth, setStrokeWidth] = useState<number>(2);

  // Previewer View Settings
  const [viewMode, setViewMode] = useState<'side-by-side' | 'split' | 'vector'>('side-by-side');
  const [zoom, setZoom] = useState<number>(1);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [splitPos, setSplitPos] = useState<number>(50); // 0-100 for split slider
  const [customSvgCode, setCustomSvgCode] = useState<string | null>(null);

  // Editor and validation states
  const [editorTab, setEditorTab] = useState<'preview' | 'code' | 'stats'>('preview');
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

  // Handle Preset changes
  useEffect(() => {
    switch (presetMode) {
      case 'logo':
        setColorMode('color');
        setColorCount(8);
        setSimplify(2);
        setSmoothing(45);
        setEdgeSensitivity(50);
        break;
      case 'icon':
        setColorMode('color');
        setColorCount(4);
        setSimplify(3);
        setSmoothing(65);
        setEdgeSensitivity(40);
        break;
      case 'illustration':
        setColorMode('color');
        setColorCount(16);
        setSimplify(1);
        setSmoothing(30);
        setEdgeSensitivity(60);
        break;
      case 'lineart':
        setColorMode('color');
        setColorCount(2);
        setSimplify(2);
        setSmoothing(40);
        setEdgeSensitivity(65);
        break;
      case 'bw':
        setColorMode('bw');
        setColorCount(2);
        setSimplify(2);
        setSmoothing(30);
        setEdgeSensitivity(50);
        break;
      case 'detailed':
        setColorMode('color');
        setColorCount(32);
        setSimplify(0);
        setSmoothing(15);
        setEdgeSensitivity(80);
        break;
    }
  }, [presetMode]);

  // Synchronize customSvgCode with active item generated SVG
  useEffect(() => {
    if (activeItem) {
      setCustomSvgCode(activeItem.svgCode);
    } else {
      setCustomSvgCode(null);
    }
  }, [activeItemId, activeItem?.svgCode]);

  // Parse File helper
  const handleFiles = useCallback((files: FileList | File[]) => {
    const newList: QueueItem[] = [];
    setErrorMsg(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      const allowed = ['.png', '.jpg', '.jpeg', '.webp', '.bmp'];
      
      if (!allowed.includes(ext)) {
        setErrorMsg("Unsupported image type. Please upload PNG, JPG, JPEG, WEBP, or BMP files.");
        continue;
      }

      if (file.size > 15 * 1024 * 1024) {
        setErrorMsg("Large images over 15MB are not recommended for browser vectorization.");
      }

      const id = `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const url = URL.createObjectURL(file);

      newList.push({
        id,
        file,
        name: file.name,
        size: file.size,
        originalUrl: url,
        status: 'idle',
        progress: 0,
        width: null,
        height: null,
        svgCode: null,
        stats: null
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
      if (item) URL.revokeObjectURL(item.originalUrl);
      return prev.filter(q => q.id !== id);
    });
    if (activeItemId === id) {
      setActiveItemId(null);
    }
  };

  const clearQueue = () => {
    queue.forEach(item => URL.revokeObjectURL(item.originalUrl));
    setQueue([]);
    setActiveItemId(null);
    setCustomSvgCode(null);
  };

  // Convert single item
  const processItem = async (item: QueueItem): Promise<QueueItem> => {
    if (item.status === 'converting') return item;

    // Set to converting
    setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'converting', progress: 10 } : q));

    try {
      // Load image on canvas
      const img = new Image();
      img.src = item.originalUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;

      // Downscale based on trace quality
      let targetMaxDim = 300;
      if (quality === 'fast') targetMaxDim = 150;
      if (quality === 'balanced') targetMaxDim = 320;
      if (quality === 'high') targetMaxDim = 640;
      if (quality === 'ultra') targetMaxDim = 1200;

      let w = originalWidth;
      let h = originalHeight;

      if (w > targetMaxDim || h > targetMaxDim) {
        if (w > h) {
          h = Math.round((h * targetMaxDim) / w);
          w = targetMaxDim;
        } else {
          w = Math.round((w * targetMaxDim) / h);
          h = targetMaxDim;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not initialize 2D context");

      ctx.drawImage(img, 0, 0, w, h);
      const imgData = ctx.getImageData(0, 0, w, h);

      // Perform conversion
      const opts: TraceOptions = {
        mode: presetMode as any,
        quality,
        colorCount,
        colorMode,
        simplify,
        smoothing,
        removeBackground,
        edgeSensitivity,
        cornerPrecision: 50,
        strokeColor,
        strokeWidth
      };

      const result = await ImageTracer.convert(imgData, opts, (percent: number, status: string) => {
        setQueue(prev => prev.map(q => q.id === item.id ? { ...q, progress: percent } : q));
      });

      return {
        ...item,
        status: 'success',
        progress: 100,
        width: originalWidth,
        height: originalHeight,
        svgCode: result.svg,
        stats: result.stats
      };
    } catch (e: any) {
      console.error(e);
      return {
        ...item,
        status: 'error',
        progress: 0,
        errorMsg: e.message || "Trace failed"
      };
    }
  };

  const processActiveItem = async () => {
    if (!activeItem) return;
    setIsProcessing(true);
    const updated = await processItem(activeItem);
    setQueue(prev => prev.map(q => q.id === activeItem.id ? updated : q));
    setIsProcessing(false);
  };

  const processBatchQueue = async () => {
    setIsProcessing(true);
    const pending = queue.filter(q => q.status !== 'success');
    for (const item of pending) {
      const updated = await processItem(item);
      setQueue(prev => prev.map(q => q.id === item.id ? updated : q));
    }
    setIsProcessing(false);
    setSuccessMsg(`Successfully vectorized ${pending.length} images!`);
  };

  // Downloads
  const downloadSingleSvg = (item: QueueItem) => {
    const codeToDownload = item.id === activeItemId && customSvgCode ? customSvgCode : item.svgCode;
    if (!codeToDownload) return;
    const blob = new Blob([codeToDownload], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.name.replace(/\.[^/.]+$/, "") + ".svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copySvgToClipboard = () => {
    const code = customSvgCode || activeItem?.svgCode;
    if (!code) return;
    navigator.clipboard.writeText(code);
    setSuccessMsg("Copied SVG code to clipboard!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const downloadZip = async () => {
    const successfulItems = queue.filter(q => q.status === 'success' && q.svgCode);
    if (successfulItems.length === 0) return;

    const zip = new JSZip();
    successfulItems.forEach(item => {
      const code = item.id === activeItemId && customSvgCode ? customSvgCode : item.svgCode;
      if (code) {
        const name = item.name.replace(/\.[^/.]+$/, "") + ".svg";
        zip.file(name, code);
      }
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vectorized_graphics_${Date.now()}.zip`;
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
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

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
      {/* Alert Messages */}
      {errorMsg && (
        <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded-r-lg text-sm text-red-800 dark:text-red-300 flex items-center justify-between">
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

      {/* Main Workspace */}
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
              : 'border-slate-350 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Upload className="w-16 h-16 text-slate-400 mb-4 animate-pulse" />
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Drag & Drop Image Here</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-sm">
            Supports PNG, JPG, JPEG, WEBP, and BMP images up to 15MB. All processing occurs locally on your browser.
          </p>
          <button className="mt-6 px-6 py-2.5 bg-[#518231] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#518231]/95 transition-all">
            Browse Files
          </button>
          <p className="text-[10px] text-slate-400 mt-3">Or copy and paste (Ctrl+V) an image anywhere on the page</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left panel: Queue & Live preview workspace (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Viewports & Comparisons */}
            <div className="bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl overflow-hidden relative shadow-sm flex flex-col min-h-[460px] max-h-[600px] h-[50vh]">
              {/* Zoom & Mode Controls bar */}
              <div className="bg-white dark:bg-slate-900 border-b border-slate-250 dark:border-slate-850 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-10">
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setViewMode('side-by-side')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${viewMode === 'side-by-side' ? 'bg-[#518231] text-white' : 'hover:bg-slate-150 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-450'}`}
                  >
                    <div className="flex items-center gap-1.5"><Columns size={13} /> Side-by-Side</div>
                  </button>
                  <button 
                    onClick={() => setViewMode('split')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${viewMode === 'split' ? 'bg-[#518231] text-white' : 'hover:bg-slate-150 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-450'}`}
                  >
                    <div className="flex items-center gap-1.5"><Sliders size={13} /> Slider Split</div>
                  </button>
                  <button 
                    onClick={() => setViewMode('vector')}
                    className={`px-3 py-1.5 rounded-lg font-bold transition-all ${viewMode === 'vector' ? 'bg-[#518231] text-white' : 'hover:bg-slate-150 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-450'}`}
                  >
                    <div className="flex items-center gap-1.5"><Maximize size={13} /> Output Vector</div>
                  </button>
                </div>

                <div className="flex items-center gap-1 text-slate-650 dark:text-slate-400">
                  <button 
                    onClick={() => handleZoom('out')}
                    className="p-2 hover:bg-slate-150 dark:hover:bg-slate-800 rounded-lg"
                    title="Zoom Out"
                  >
                    <ZoomOut size={15} />
                  </button>
                  <span className="px-2 font-mono font-semibold">{Math.round(zoom * 100)}%</span>
                  <button 
                    onClick={() => handleZoom('in')}
                    className="p-2 hover:bg-slate-150 dark:hover:bg-slate-800 rounded-lg"
                    title="Zoom In"
                  >
                    <ZoomIn size={15} />
                  </button>
                  <button 
                    onClick={() => handleZoom('reset')}
                    className="px-2.5 py-1.5 hover:bg-slate-150 dark:hover:bg-slate-800 rounded-lg font-bold ml-1.5"
                    title="Reset Zoom"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Viewport content */}
              <div 
                ref={previewContainerRef}
                onMouseDown={startPan}
                onMouseMove={doPan}
                onMouseUp={endPan}
                onMouseLeave={endPan}
                className="flex-1 overflow-hidden relative select-none cursor-grab active:cursor-grabbing bg-workspace-checker flex items-center justify-center"
              >
                {/* Side-by-side view */}
                {viewMode === 'side-by-side' && (
                  <div className="grid grid-cols-2 w-full h-full divide-x divide-slate-200 dark:divide-slate-850">
                    {/* Original */}
                    <div className="relative overflow-hidden flex items-center justify-center h-full p-6">
                      <div 
                        style={{
                          transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
                          transformOrigin: 'center center'
                        }}
                        className="transition-transform duration-75 max-w-full max-h-full flex items-center justify-center"
                      >
                        <img 
                          src={activeItem?.originalUrl} 
                          alt="Original image view" 
                          className="max-h-[360px] object-contain pointer-events-none" 
                        />
                      </div>
                      <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                        Original Raster
                      </div>
                    </div>

                    {/* Vectorized output */}
                    <div className="relative overflow-hidden flex items-center justify-center h-full p-6">
                      <div 
                        style={{
                          transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
                          transformOrigin: 'center center'
                        }}
                        className="transition-transform duration-75 max-w-full max-h-full flex items-center justify-center"
                      >
                        {activeItem?.status === 'success' && customSvgCode ? (
                          <div 
                            dangerouslySetInnerHTML={{ __html: customSvgCode }}
                            className="max-h-[360px] flex items-center justify-center [&>svg]:max-h-[360px] [&>svg]:w-auto [&>svg]:h-auto"
                          />
                        ) : (
                          <div className="text-slate-400 text-center space-y-2">
                            {activeItem?.status === 'converting' ? (
                              <>
                                <Loader2 className="animate-spin w-6 h-6 mx-auto text-[#518231]" />
                                <p className="text-xs">Traced Layer {activeItem.progress}%...</p>
                              </>
                            ) : (
                              <>
                                <FileImage className="w-8 h-8 mx-auto text-slate-350" />
                                <p className="text-xs">Click Tracing Vectorize button to draw vector.</p>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="absolute top-3 left-3 bg-[#518231] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm">
                        Scalable Vector (SVG)
                      </div>
                    </div>
                  </div>
                )}

                {/* Slider split view */}
                {viewMode === 'split' && (
                  <div className="relative w-full h-full flex items-center justify-center p-6 overflow-hidden">
                    <div 
                      style={{
                        transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
                        transformOrigin: 'center center',
                        width: activeItem?.width ? `${activeItem.width}px` : '400px',
                        height: activeItem?.height ? `${activeItem.height}px` : '400px',
                        maxWidth: '90%',
                        maxHeight: '90%'
                      }}
                      className="relative border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden aspect-video transition-transform duration-75 bg-slate-900"
                    >
                      {/* Base layer: Original image */}
                      <img 
                        src={activeItem?.originalUrl} 
                        className="absolute inset-0 w-full h-full object-contain bg-workspace-checker pointer-events-none" 
                        alt="Background Original"
                      />

                      {/* Top layer: Vector svg clipped */}
                      {activeItem?.status === 'success' && customSvgCode && (
                        <div 
                          style={{ clipPath: `polygon(0 0, ${splitPos}% 0, ${splitPos}% 100%, 0 100%)` }}
                          dangerouslySetInnerHTML={{ __html: customSvgCode }}
                          className="absolute inset-0 w-full h-full object-contain pointer-events-none [&>svg]:w-full [&>svg]:h-full bg-workspace-checker"
                        />
                      )}

                      {/* Split slider interface */}
                      <div 
                        style={{ left: `${splitPos}%` }}
                        className="absolute top-0 bottom-0 w-1 bg-[#518231] cursor-ew-resize pointer-events-auto"
                      >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white dark:bg-slate-900 border-2 border-[#518231] rounded-full flex items-center justify-center shadow-lg pointer-events-none">
                          <Sliders className="w-3.5 h-3.5 text-[#518231]" />
                        </div>
                      </div>
                      
                      {/* Split position controller overlay */}
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

                {/* Single Vector View */}
                {viewMode === 'vector' && (
                  <div className="relative overflow-hidden flex items-center justify-center w-full h-full p-8">
                    <div 
                      style={{
                        transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
                        transformOrigin: 'center center'
                      }}
                      className="transition-transform duration-75 max-w-full max-h-full flex items-center justify-center"
                    >
                      {activeItem?.status === 'success' && customSvgCode ? (
                        <div 
                          dangerouslySetInnerHTML={{ __html: customSvgCode }}
                          className="max-h-[400px] flex items-center justify-center [&>svg]:max-h-[400px] [&>svg]:w-auto [&>svg]:h-auto"
                        />
                      ) : (
                        <div className="text-slate-400 text-center space-y-2">
                          {activeItem?.status === 'converting' ? (
                            <>
                              <Loader2 className="animate-spin w-8 h-8 mx-auto text-[#518231]" />
                              <p className="text-xs">Converting layer...</p>
                            </>
                          ) : (
                            <>
                              <FileImage className="w-10 h-10 mx-auto text-slate-350" />
                              <p className="text-xs">Compute Vector rendering outputs.</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="absolute top-3 left-3 bg-[#518231] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-md flex items-center gap-1.5">
                      <Layers size={10} /> Fully Scalable Vector
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom: Tabs for Code Viewer & Statistics */}
            {activeItem?.status === 'success' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                <div className="flex border-b border-slate-150 dark:border-slate-800 text-xs">
                  <button 
                    onClick={() => setEditorTab('preview')}
                    className={`px-5 py-3.5 font-bold transition-all border-b-2 ${editorTab === 'preview' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-550 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'}`}
                  >
                    <div className="flex items-center gap-1.5"><Eye size={13} /> SVG Preview</div>
                  </button>
                  <button 
                    onClick={() => setEditorTab('code')}
                    className={`px-5 py-3.5 font-bold transition-all border-b-2 ${editorTab === 'code' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-550 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'}`}
                  >
                    <div className="flex items-center gap-1.5"><FileCode size={13} /> SVG Code Markup</div>
                  </button>
                  <button 
                    onClick={() => setEditorTab('stats')}
                    className={`px-5 py-3.5 font-bold transition-all border-b-2 ${editorTab === 'stats' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-550 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'}`}
                  >
                    <div className="flex items-center gap-1.5"><Info size={13} /> Vector Statistics</div>
                  </button>
                </div>

                <div className="p-4">
                  {editorTab === 'preview' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400">Interactive live output render viewport. Use upper controls to pan/zoom.</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={copySvgToClipboard}
                            className="px-3.5 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-350"
                          >
                            <Copy size={13} /> Copy Code
                          </button>
                          <button 
                            onClick={() => downloadSingleSvg(activeItem)}
                            className="px-4 py-2 bg-[#518231] hover:bg-[#518231]/90 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-sm"
                          >
                            <Download size={13} /> Download SVG
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {editorTab === 'code' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">Edit elements or paths inside the code block. Previews update automatically.</span>
                        <button 
                          onClick={copySvgToClipboard}
                          className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-850 rounded bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 flex items-center gap-1 font-bold text-slate-650 dark:text-slate-300"
                        >
                          <Copy size={12} /> Copy Code
                        </button>
                      </div>
                      <div className="h-64 border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden">
                        <Editor
                          height="100%"
                          defaultLanguage="xml"
                          value={customSvgCode || ''}
                          theme={monacoTheme}
                          onChange={(val) => setCustomSvgCode(val || '')}
                          options={{
                            minimap: { enabled: false },
                            fontSize: 12,
                            lineNumbers: 'on',
                            scrollBeyondLastLine: false,
                            wordWrap: 'on'
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {editorTab === 'stats' && activeItem.stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/50 dark:border-slate-850">
                        <span className="text-[10px] text-slate-450 dark:text-slate-500 uppercase font-bold tracking-wider">Paths Generated</span>
                        <p className="text-xl font-extrabold text-slate-800 dark:text-slate-250 mt-1">{activeItem.stats.pathCount}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/50 dark:border-slate-850">
                        <span className="text-[10px] text-slate-450 dark:text-slate-500 uppercase font-bold tracking-wider">Palette Colors</span>
                        <p className="text-xl font-extrabold text-slate-800 dark:text-slate-250 mt-1">{activeItem.stats.colorCount}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/50 dark:border-slate-850">
                        <span className="text-[10px] text-slate-450 dark:text-slate-500 uppercase font-bold tracking-wider">SVG File Size</span>
                        <p className="text-xl font-extrabold text-[#518231] mt-1">{formatSize(activeItem.stats.fileSize)}</p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/50 dark:border-slate-850">
                        <span className="text-[10px] text-slate-450 dark:text-slate-500 uppercase font-bold tracking-wider">Optimization Score</span>
                        <p className="text-xl font-extrabold text-blue-500 mt-1">{activeItem.stats.optimizationScore}/100</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Queue Batch list */}
            <div className="bg-white dark:bg-slate-900 border border-slate-250 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <CheckSquare className="text-[#518231] w-4.5 h-4.5" /> Conversion Batch Queue ({queue.length})
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
                    className="p-2 border border-red-200/40 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 rounded-xl font-bold flex items-center gap-1.5 text-xs"
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
                        className="w-12 h-12 rounded object-cover border border-slate-200 bg-workspace-checker shrink-0" 
                        alt="Queue thumb" 
                      />
                      <div className="overflow-hidden flex-1 space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{item.name}</h4>
                        <p className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold flex items-center gap-1.5">
                          <span>{formatSize(item.size)}</span>
                          {item.width && <span>• {item.width}×{item.height}px</span>}
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
                            onClick={(e) => { e.stopPropagation(); downloadSingleSvg(item); }}
                            className="p-1.5 rounded-lg bg-[#518231]/10 text-[#518231] hover:bg-[#518231] hover:text-white transition-colors"
                            title="Download SVG"
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
                      Vectorizing Queue...
                    </>
                  ) : (
                    <>
                      <Play size={14} />
                      Vectorize Batch Queue
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
                      Export ZIP Pack
                    </button>
                    <button
                      onClick={() => queue.filter(q => q.status === 'success').forEach(q => downloadSingleSvg(q))}
                      className="px-5 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-750 dark:text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                    >
                      <Download size={14} />
                      Download All
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right panel: Vectorization settings sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-6">
            
            {/* Action Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-slate-850 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Sliders className="text-[#518231] w-4 h-4" /> Vectorizer Studio Controls
              </h3>

              {/* Preset Selector */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Preset Mode</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPresetMode(p.id)}
                      className={`px-2 py-2 rounded-lg text-left border text-[10px] font-bold transition-all ${
                        presetMode === p.id 
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
                
                {/* Trace Quality */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <label>Trace Quality</label>
                    <span className="font-mono text-[10px] text-[#518231] uppercase">{quality}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {(['fast', 'balanced', 'high', 'ultra'] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`py-1 rounded text-[10px] font-bold transition-all uppercase ${
                          quality === q 
                            ? 'bg-[#518231] text-white' 
                            : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-650 dark:text-slate-400'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Mode */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <label>Color Mode</label>
                    <span className="font-mono text-[10px] text-[#518231] uppercase">{colorMode}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { id: 'color', name: 'Colors' },
                      { id: 'grayscale', name: 'Grayscale' },
                      { id: 'monochrome', name: 'Monochrome' },
                      { id: 'bw', name: 'B & W' }
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setColorMode(mode.id as any)}
                        className={`py-1.5 rounded-lg border text-[10px] font-bold transition-all ${
                          colorMode === mode.id 
                            ? 'border-[#518231] bg-[#518231]/5 text-[#518231]' 
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-650 dark:text-slate-400'
                        }`}
                      >
                        {mode.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Maximum Palette Colors */}
                {(colorMode === 'color' || colorMode === 'grayscale') && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <label>Max Palette Colors</label>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{colorCount}</span>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max="64" 
                      value={colorCount}
                      onChange={(e) => setColorCount(Number(e.target.value))}
                      className="w-full accent-[#518231]"
                    />
                    <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                      <span>2 colors</span>
                      <span>64 colors</span>
                    </div>
                  </div>
                )}

                {/* Douglas Peucker Simplify Paths */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <label>Path Simplification</label>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      {simplify === 0 ? 'Off (Blocky)' : `${simplify}/5`}
                    </span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="5" 
                    value={simplify}
                    onChange={(e) => setSimplify(Number(e.target.value))}
                    className="w-full accent-[#518231]"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                    <span>Blocky (0)</span>
                    <span>Ultra Smooth (5)</span>
                  </div>
                </div>

                {/* Bézier Curve Smoothing */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <label>Curve Smoothing</label>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{smoothing}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={smoothing}
                    onChange={(e) => setSmoothing(Number(e.target.value))}
                    className="w-full accent-[#518231]"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                    <span>Polygons (0%)</span>
                    <span>Round curves (100%)</span>
                  </div>
                </div>

                {/* Edge Sensitivity */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <label>Edge Sensitivity</label>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{edgeSensitivity}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={edgeSensitivity}
                    onChange={(e) => setEdgeSensitivity(Number(e.target.value))}
                    className="w-full accent-[#518231]"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                    <span>Low details (0%)</span>
                    <span>High details (100%)</span>
                  </div>
                </div>

                {/* Transparent Background removal toggle */}
                {colorMode !== 'monochrome' && presetMode !== 'lineart' && (
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-550 uppercase tracking-wider py-1.5">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="transparentBg"
                        checked={removeBackground}
                        onChange={(e) => setRemoveBackground(e.target.checked)}
                        className="w-4 h-4 accent-[#518231] rounded"
                      />
                      <label htmlFor="transparentBg" className="cursor-pointer">Remove Background</label>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400">Ignore corner colors</span>
                  </div>
                )}

                {/* Line art specific controls */}
                {presetMode === 'lineart' && (
                  <div className="space-y-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-3 rounded-xl">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Line Art Stroking</div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Width</label>
                        <input 
                          type="number"
                          min="1"
                          max="20"
                          value={strokeWidth}
                          onChange={(e) => setStrokeWidth(Math.max(1, Number(e.target.value)))}
                          className="w-full px-2.5 py-1 text-xs border border-slate-250 dark:border-slate-800 rounded bg-white dark:bg-slate-950 text-slate-800 dark:text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase">Color</label>
                        <input 
                          type="color"
                          value={strokeColor}
                          onChange={(e) => setStrokeColor(e.target.value)}
                          className="w-full h-7 border border-slate-250 dark:border-slate-800 rounded cursor-pointer bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Process Trigger */}
              <button
                onClick={processActiveItem}
                disabled={isProcessing || !activeItem}
                className="w-full py-3 bg-[#518231] hover:bg-[#518231]/95 text-white font-bold text-xs rounded-xl disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md shadow-[#518231]/10 mt-4"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Tracing Paths...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Run Vectorizer Trace
                  </>
                )}
              </button>

            </div>

            {/* Guide details block */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-2xl text-xs text-blue-800 dark:text-blue-300 space-y-2">
              <h4 className="font-bold flex items-center gap-1.5"><Info size={14} /> Vectorizer Pro-Tips</h4>
              <p>For company logos or text emblems, use <strong>Logo Mode</strong> and lower the <strong>Simplification</strong> slider to 1 or 2 for maximum shape preservation.</p>
              <p>Adjusting <strong>Edge Sensitivity</strong> helps capture finer lines or highlights, while <strong>Curve Smoothing</strong> turns pixelated jagged borders into organic curved curves.</p>
            </div>

          </div>
        </div>
      )}
      
      <input ref={fileInputRef} type="file" className="hidden" accept=".png,.jpg,.jpeg,.webp,.bmp" multiple onChange={(e) => e.target.files && handleFiles(e.target.files)} />
    </div>
  );
}
