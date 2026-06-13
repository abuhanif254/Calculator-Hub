"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { 
  Upload, Trash2, Download, RefreshCw, Sliders, Eye, 
  CheckCircle2, AlertCircle, Loader2, Sparkles, Plus, X, 
  Info, FileDown, Play, Settings, Copy, Columns, Layers, 
  Maximize, FileCode, CheckSquare, Palette, ZoomIn, ZoomOut, 
  Heart, Save, Trash, HelpCircle, Check, FileImage, ShieldCheck
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
  { id: 'logo', name: 'Logo Vectorization', desc: 'Sharp edges, flat colors, optimized paths.' },
  { id: 'icon', name: 'Icon Vectorization', desc: 'Highly simplified paths, clean flat shapes.' },
  { id: 'illustration', name: 'Illustration', desc: 'Layered color details, moderate curves.' },
  { id: 'lineart', name: 'Line Art', desc: 'Traces borders as outlines, no solid fills.' },
  { id: 'monochrome', name: 'Monochrome', desc: 'Two-tone vector silhouette template.' },
  { id: 'detailed', name: 'Full Color Artwork', desc: 'Preserves details and gradients.' }
];

export function ConvertToSvgTool() {
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
  const [smoothing, setSmoothing] = useState<number>(45); // 0-100
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

  // Advanced Preset History & Favorites (localStorage)
  const [savedConfigs, setSavedConfigs] = useState<{ id: string; name: string; settings: any }[]>([]);
  const [newConfigName, setNewConfigName] = useState<string>('');
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Retrieve active item
  const activeItem = useMemo(() => {
    return queue.find(item => item.id === activeItemId) || null;
  }, [queue, activeItemId]);

  // Load saved configurations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('calc_hub_convert_to_svg_presets');
    if (saved) {
      try {
        setSavedConfigs(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

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
      case 'monochrome':
        setColorMode('monochrome');
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
  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const newList: QueueItem[] = [];
    setErrorMsg(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const nameLower = file.name.toLowerCase();
      const isHeic = nameLower.endsWith('.heic');
      const allowed = ['.png', '.jpg', '.jpeg', '.webp', '.bmp', '.gif', '.heic'];
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (!allowed.includes(ext) && !isHeic) {
        setErrorMsg("Unsupported image type. Please upload PNG, JPG, WEBP, BMP, GIF, or HEIC files.");
        continue;
      }

      if (file.size > 20 * 1024 * 1024) {
        setErrorMsg("Large images over 20MB are not recommended for browser vectorization.");
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

  // Clipboard Paste Handler
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        handleFiles(e.clipboardData.files);
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFiles]);

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

    setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'converting', progress: 10 } : q));

    try {
      let srcUrl = item.originalUrl;

      // Handle HEIC decode dynamically
      if (item.name.toLowerCase().endsWith('.heic') && item.file) {
        const heic2any = (await import('heic2any')).default;
        const decodedBlob = await heic2any({
          blob: item.file,
          toType: 'image/png'
        });
        const finalBlob = Array.isArray(decodedBlob) ? decodedBlob[0] : decodedBlob;
        srcUrl = URL.createObjectURL(finalBlob);
      }

      // Load image on canvas
      const img = new Image();
      img.src = srcUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const originalWidth = img.naturalWidth;
      const originalHeight = img.naturalHeight;

      // Downscale based on trace quality
      let targetMaxDim = 320;
      if (quality === 'fast') targetMaxDim = 160;
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
        mode: (presetMode === 'detailed' ? 'detailed' : presetMode) as any,
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
        errorMsg: e.message || "Vectorization failed."
      };
    }
  };

  // Triggers conversion of either active or all items
  const startConversion = async () => {
    if (queue.length === 0) return;
    setIsProcessing(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    // Target either active item or all idle items
    const toProcess = queue.filter(q => q.status === 'idle' || q.status === 'error');
    
    if (toProcess.length === 0 && activeItem && activeItem.status !== 'success') {
      const updated = await processItem(activeItem);
      setQueue(prev => prev.map(q => q.id === updated.id ? updated : q));
    } else {
      for (const item of queue) {
        if (item.status === 'idle' || item.status === 'error') {
          const updated = await processItem(item);
          setQueue(prev => prev.map(q => q.id === updated.id ? updated : q));
        }
      }
    }

    setIsProcessing(false);
    setSuccessMsg("Vectorization complete!");
  };

  // ZIP export
  const exportAllAsZip = async () => {
    const successItems = queue.filter(q => q.status === 'success' && q.svgCode);
    if (successItems.length === 0) {
      setErrorMsg("No successfully vectorized items in the queue to export.");
      return;
    }

    try {
      const zip = new JSZip();
      successItems.forEach(item => {
        const svgContent = item.svgCode!;
        const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;
        zip.file(`${baseName}.svg`, svgContent);
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `vector-studio-${Date.now()}.zip`;
      link.click();
      URL.revokeObjectURL(link.href);
      setSuccessMsg("Batch exported successfully!");
    } catch (e) {
      setErrorMsg("Failed to generate ZIP file.");
    }
  };

  // Save current configuration preset
  const savePreset = () => {
    if (!newConfigName.trim()) return;
    const newPreset = {
      id: `preset-${Date.now()}`,
      name: newConfigName.trim(),
      settings: {
        presetMode,
        quality,
        colorMode,
        colorCount,
        simplify,
        smoothing,
        removeBackground,
        edgeSensitivity,
        strokeColor,
        strokeWidth
      }
    };
    const updated = [...savedConfigs, newPreset];
    setSavedConfigs(updated);
    localStorage.setItem('calc_hub_convert_to_svg_presets', JSON.stringify(updated));
    setNewConfigName('');
    setShowConfigModal(false);
    setSuccessMsg("Preset saved successfully!");
  };

  const loadPreset = (preset: any) => {
    const s = preset.settings;
    setPresetMode(s.presetMode);
    setQuality(s.quality);
    setColorMode(s.colorMode);
    setColorCount(s.colorCount);
    setSimplify(s.simplify);
    setSmoothing(s.smoothing);
    setRemoveBackground(s.removeBackground);
    setEdgeSensitivity(s.edgeSensitivity);
    setStrokeColor(s.strokeColor || '#000000');
    setStrokeWidth(s.strokeWidth || 2);
    setSuccessMsg(`Loaded preset: ${preset.name}`);
  };

  const deletePreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedConfigs.filter(c => c.id !== id);
    setSavedConfigs(updated);
    localStorage.setItem('calc_hub_convert_to_svg_presets', JSON.stringify(updated));
  };

  // Code editor change callback
  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCustomSvgCode(value);
    }
  };

  // Save custom SVG edits back to active item
  const saveCustomCodeChanges = () => {
    if (activeItem && customSvgCode) {
      setQueue(prev => prev.map(q => q.id === activeItem.id ? { 
        ...q, 
        svgCode: customSvgCode,
        stats: q.stats ? {
          ...q.stats,
          fileSize: new Blob([customSvgCode]).size
        } : null
      } : q));
      setSuccessMsg("SVG vector code saved successfully!");
    }
  };

  // Copy code helper
  const copyToClipboard = (text: string, msg: string = "Code copied to clipboard!") => {
    navigator.clipboard.writeText(text);
    setSuccessMsg(msg);
  };

  // Mouse wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (viewMode === 'split') return; // Zoom disabled in split view to avoid layout jump
    e.preventDefault();
    const zoomFactor = 0.15;
    let nextZoom = zoom;
    if (e.deltaY < 0) {
      nextZoom = Math.min(30, zoom + zoomFactor);
    } else {
      nextZoom = Math.max(0.5, zoom - zoomFactor);
    }
    setZoom(nextZoom);
  };

  // Mouse Panning
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

  const resetZoomPan = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  // Calculate optimization suggestions
  const optimizationSuggestions = useMemo(() => {
    if (!activeItem || !activeItem.stats) return [];
    const sug = [];
    const stats = activeItem.stats;

    if (stats.pathCount > 300 && simplify < 4) {
      sug.push({
        id: 'simplify',
        text: "Highly complex vector path count detected. Increase the Simplify slider to reduce node anchors by up to 40%."
      });
    }
    if (stats.colorCount > 12 && colorMode === 'color') {
      sug.push({
        id: 'colors',
        text: "Reducing the color count from " + stats.colorCount + " to 8 will compress the output size by merging overlapping paths."
      });
    }
    if (stats.pathCount > 50 && smoothing < 50) {
      sug.push({
        id: 'smoothing',
        text: "Increase Shape Smoothing to group jagged linear steps into organic Bézier curves."
      });
    }
    return sug;
  }, [activeItem, simplify, colorMode, smoothing]);

  // Code snippets formats
  const reactCodeSnippet = useMemo(() => {
    if (!activeItem || !activeItem.svgCode) return "";
    const cleanSvg = activeItem.svgCode
      .replace(/fill-rule=/g, "fillRule=")
      .replace(/clip-rule=/g, "clipRule=")
      .replace(/stroke-width=/g, "strokeWidth=")
      .replace(/stroke-linecap=/g, "strokeLinecap=")
      .replace(/stroke-linejoin=/g, "strokeLinejoin=")
      .replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/g, "{...props}");

    return `import React from 'react';

export interface VectorIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const VectorIcon: React.FC<VectorIconProps> = ({ size = 24, ...props }) => {
  return (
    ${cleanSvg.replace('<svg ', `<svg width={size} height={size} `)}
  );
};

export default VectorIcon;`;
  }, [activeItem]);

  const pictureCodeSnippet = useMemo(() => {
    if (!activeItem) return "";
    const name = activeItem.name.substring(0, activeItem.name.lastIndexOf('.')) || activeItem.name;
    return `<picture>
  <source type="image/svg+xml" srcSet="/assets/vectors/${name}.svg" />
  <img src="/assets/images/${activeItem.name}" alt="${name} fallback vector graphic" loading="lazy" />
</picture>`;
  }, [activeItem]);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-6 px-4">
      <div className="max-w-[1500px] mx-auto flex flex-col gap-6">

        {/* Studio Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <Sparkles className="text-[#518231]" />
              Convert to SVG <span className="text-sm font-semibold py-0.5 px-2 bg-[#518231]/20 text-[#518231] rounded-full">Local Engine</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Professional-grade vector tracing, path optimization, and developer code generation.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfigModal(true)}
              className="flex items-center gap-1.5 py-2 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-semibold transition-all shadow-sm"
            >
              <Save size={16} />
              Save Settings
            </button>
            {queue.length > 0 && (
              <button
                onClick={clearQueue}
                className="flex items-center gap-1.5 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/20 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-lg text-sm font-semibold transition-all"
              >
                <Trash2 size={16} />
                Clear Queue
              </button>
            )}
          </div>
        </div>

        {/* Success/Error Toast alerts */}
        {errorMsg && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="text-red-500 shrink-0 mt-0.5" />
            <div className="text-sm font-medium text-red-800 dark:text-red-300">{errorMsg}</div>
            <button onClick={() => setErrorMsg(null)} className="ml-auto text-red-500 hover:text-red-600 font-bold">×</button>
          </div>
        )}
        {successMsg && (
          <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 p-4 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" />
            <div className="text-sm font-medium text-green-800 dark:text-green-300">{successMsg}</div>
            <button onClick={() => setSuccessMsg(null)} className="ml-auto text-green-500 hover:text-green-600 font-bold">×</button>
          </div>
        )}

        {/* Main Workspace Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Trace controls panel (4 cols) */}
          <div className="xl:col-span-4 flex flex-col gap-6">

            {/* Presets and Trace Controls */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Sliders size={18} className="text-[#518231]" />
                Vectorizing Settings
              </h2>

              <div className="flex flex-col gap-5">

                {/* Preset List */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Preset Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PRESETS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPresetMode(p.id)}
                        className={`p-3 rounded-lg border text-left transition-all flex flex-col justify-between ${
                          presetMode === p.id 
                            ? 'border-[#518231] bg-[#518231]/5 dark:bg-[#518231]/10' 
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <span className="font-semibold text-xs">{p.name}</span>
                        <span className="text-[10px] text-slate-400 mt-1 leading-normal line-clamp-1">{p.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Local Saved Preset Selection */}
                {savedConfigs.length > 0 && (
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Saved Configurations</label>
                    <div className="flex flex-wrap gap-2">
                      {savedConfigs.map((cfg) => (
                        <button
                          key={cfg.id}
                          onClick={() => loadPreset(cfg)}
                          className="flex items-center gap-1.5 py-1 px-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold rounded-md transition-all"
                        >
                          {cfg.name}
                          <span 
                            onClick={(e) => deletePreset(cfg.id, e)}
                            className="text-slate-400 hover:text-red-500 font-bold ml-1 text-sm"
                          >
                            ×
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tracing Quality */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Trace Precision Quality
                  </label>
                  <div className="grid grid-cols-4 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    {(['fast', 'balanced', 'high', 'ultra'] as const).map((q) => (
                      <button
                        key={q}
                        onClick={() => setQuality(q)}
                        className={`py-1.5 text-xs font-bold capitalize rounded-md transition-all ${
                          quality === q 
                            ? 'bg-white dark:bg-slate-900 text-[#518231] shadow-sm' 
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Background removal */}
                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div>
                    <label className="text-sm font-semibold block">Remove Background</label>
                    <span className="text-xs text-slate-400">Keys out solid background boundary shapes</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={removeBackground}
                    onChange={(e) => setRemoveBackground(e.target.checked)}
                    className="w-4 h-4 rounded text-[#518231] border-slate-300 focus:ring-[#518231]"
                  />
                </div>

                {/* Color Processing Settings */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Color Mode</label>
                    <div className="grid grid-cols-4 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                      {(['color', 'grayscale', 'monochrome', 'bw'] as const).map((mode) => (
                        <button
                          key={mode}
                          onClick={() => setColorMode(mode)}
                          className={`py-1.5 text-xs font-bold capitalize rounded-md transition-all ${
                            colorMode === mode 
                              ? 'bg-white dark:bg-slate-900 text-[#518231] shadow-sm' 
                              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          {mode === 'bw' ? 'B&W' : mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  {colorMode === 'color' && (
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>Max Palette Color Count</span>
                        <span className="text-[#518231] font-bold">{colorCount} Colors</span>
                      </div>
                      <input
                        type="range"
                        min="2"
                        max="64"
                        value={colorCount}
                        onChange={(e) => setColorCount(Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                      />
                    </div>
                  )}

                  {presetMode === 'lineart' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold block mb-1">Stroke Color</label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={strokeColor}
                            onChange={(e) => setStrokeColor(e.target.value)}
                            className="w-8 h-8 rounded cursor-pointer border border-slate-200 dark:border-slate-700 bg-transparent"
                          />
                          <input
                            type="text"
                            value={strokeColor}
                            onChange={(e) => setStrokeColor(e.target.value)}
                            className="w-full text-xs py-1 px-2 border border-slate-200 dark:border-slate-800 rounded-md bg-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span>Stroke Width</span>
                          <span>{strokeWidth}px</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={strokeWidth}
                          onChange={(e) => setStrokeWidth(Number(e.target.value))}
                          className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Path Optimization Settings */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col gap-4">
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="flex items-center gap-1">
                        Simplify Curves (RDP)
                        <span className="text-[10px] text-slate-400">(Fewer nodes)</span>
                      </span>
                      <span className="text-[#518231] font-bold">Level {simplify}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="5"
                      value={simplify}
                      onChange={(e) => setSimplify(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="flex items-center gap-1">
                        Shape Smoothing
                        <span className="text-[10px] text-slate-400">(Bézier tension)</span>
                      </span>
                      <span className="text-[#518231] font-bold">{smoothing}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={smoothing}
                      onChange={(e) => setSmoothing(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                    />
                  </div>
                </div>

                {/* Edge Controls */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Edge Sensitivity threshold</span>
                    <span className="text-[#518231] font-bold">{edgeSensitivity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={edgeSensitivity}
                    onChange={(e) => setEdgeSensitivity(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                  />
                </div>

                {/* Action Trace Trigger */}
                <button
                  disabled={queue.length === 0 || isProcessing}
                  onClick={startConversion}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-[#518231] hover:bg-[#436a28] disabled:bg-slate-300 dark:disabled:bg-slate-800 disabled:text-slate-500 dark:disabled:text-slate-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-[0.98]"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      Vectorizing Queue...
                    </>
                  ) : (
                    <>
                      <Play size={18} />
                      Vectorize Current Queue
                    </>
                  )}
                </button>

              </div>
            </div>

            {/* Offline Safe Checkbox */}
            <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex gap-3 items-center">
              <ShieldCheck className="text-[#518231] shrink-0" size={20} />
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">Secure Offline Vectorization</span>
                Your images remain private. All tracing computations happen locally in your web browser. No files are uploaded.
              </div>
            </div>

          </div>

          {/* Right Column: Upload, Previews, Monaco editor (8 cols) */}
          <div className="xl:col-span-8 flex flex-col gap-6">

            {/* Drag & Drop Upload Zone */}
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
                dragActive 
                  ? 'border-[#518231] bg-[#518231]/5' 
                  : 'border-slate-300 dark:border-slate-800 hover:border-[#518231] bg-white dark:bg-slate-900'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.heic"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="hidden"
              />
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-full text-slate-400 dark:text-slate-500">
                <Upload size={32} />
              </div>
              <div className="text-center">
                <p className="font-bold text-sm">Drag & Drop images here, paste, or click to browse</p>
                <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, JPEG, WEBP, BMP, GIF, and HEIC (Max 20MB)</p>
              </div>
            </div>

            {/* Queue List Table */}
            {queue.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-bold flex items-center gap-1.5">
                    <Layers size={16} />
                    Processing Queue ({queue.length} items)
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={exportAllAsZip}
                      disabled={queue.filter(q => q.status === 'success').length === 0}
                      className="flex items-center gap-1 py-1 px-2.5 bg-[#518231]/10 text-[#518231] disabled:bg-slate-100 disabled:text-slate-400 dark:disabled:bg-slate-800 dark:disabled:text-slate-600 rounded-md text-xs font-bold transition-all"
                    >
                      <FileDown size={14} />
                      Export ZIP Pack
                    </button>
                  </div>
                </div>

                <div className="max-h-[160px] overflow-y-auto custom-scrollbar flex flex-col gap-2">
                  {queue.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveItemId(item.id)}
                      className={`flex items-center justify-between p-2 rounded-lg border text-left cursor-pointer transition-all ${
                        activeItemId === item.id 
                          ? 'border-[#518231] bg-[#518231]/5' 
                          : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.originalUrl} alt="source thumbnail" className="object-cover w-full h-full" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold truncate max-w-[200px]">{item.name}</p>
                          <p className="text-[10px] text-slate-400">
                            {(item.size / 1024).toFixed(1)} KB • {item.width ? `${item.width}×${item.height}` : 'Pending dimensions'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        {item.status === 'idle' && (
                          <span className="text-[10px] font-bold py-0.5 px-2 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-full">Idle</span>
                        )}
                        {item.status === 'converting' && (
                          <div className="flex items-center gap-1.5">
                            <div className="w-16 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-[#518231] h-full transition-all" style={{ width: `${item.progress}%` }}></div>
                            </div>
                            <span className="text-[10px] font-bold text-[#518231]">{item.progress}%</span>
                          </div>
                        )}
                        {item.status === 'success' && (
                          <span className="text-[10px] font-bold py-0.5 px-2 bg-green-50 dark:bg-green-950/30 text-green-600 rounded-full flex items-center gap-1">
                            <Check size={10} strokeWidth={3} /> Success
                          </span>
                        )}
                        {item.status === 'error' && (
                          <span className="text-[10px] font-bold py-0.5 px-2 bg-red-50 dark:bg-red-950/30 text-red-600 rounded-full">Error</span>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeQueueItem(item.id);
                          }}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-red-500 transition-all"
                        >
                          <X size={14} />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Display active editor workspace tabs */}
            {activeItem && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden flex flex-col">
                
                {/* Editor Tabs navigation */}
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 px-4">
                  <div className="flex gap-1">
                    <button
                      onClick={() => setEditorTab('preview')}
                      className={`flex items-center gap-1.5 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                        editorTab === 'preview' 
                          ? 'border-[#518231] text-[#518231]' 
                          : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      <Eye size={14} />
                      Visual Preview
                    </button>
                    <button
                      onClick={() => setEditorTab('code')}
                      className={`flex items-center gap-1.5 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                        editorTab === 'code' 
                          ? 'border-[#518231] text-[#518231]' 
                          : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      <FileCode size={14} />
                      SVG Code Viewer
                    </button>
                    <button
                      onClick={() => setEditorTab('stats')}
                      className={`flex items-center gap-1.5 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
                        editorTab === 'stats' 
                          ? 'border-[#518231] text-[#518231]' 
                          : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
                      }`}
                    >
                      <Info size={14} />
                      Analysis & Suggestions
                    </button>
                  </div>

                  {/* Right side: Active action buttons */}
                  {activeItem.status === 'success' && activeItem.svgCode && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          const baseName = activeItem.name.substring(0, activeItem.name.lastIndexOf('.')) || activeItem.name;
                          const link = document.createElement('a');
                          link.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(activeItem.svgCode!);
                          link.download = `${baseName}.svg`;
                          link.click();
                        }}
                        className="flex items-center gap-1 py-1 px-2.5 bg-[#518231] hover:bg-[#436a28] text-white rounded-md text-xs font-bold transition-all shadow-sm"
                      >
                        <Download size={13} />
                        Download SVG
                      </button>
                    </div>
                  )}
                </div>

                {/* Tab content panel */}
                <div className="p-5">

                  {/* 1. VISUAL PREVIEW TAB */}
                  {editorTab === 'preview' && (
                    <div className="flex flex-col gap-4">
                      
                      {/* Control panel for preview */}
                      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                        <div className="flex gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                          <button
                            onClick={() => setViewMode('side-by-side')}
                            className={`py-1 px-2.5 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all ${
                              viewMode === 'side-by-side' 
                                ? 'bg-white dark:bg-slate-900 text-[#518231] shadow-sm' 
                                : 'text-slate-500'
                            }`}
                          >
                            <Columns size={12} />
                            Side-by-Side
                          </button>
                          <button
                            onClick={() => setViewMode('split')}
                            className={`py-1 px-2.5 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all ${
                              viewMode === 'split' 
                                ? 'bg-white dark:bg-slate-900 text-[#518231] shadow-sm' 
                                : 'text-slate-500'
                            }`}
                          >
                            <Maximize size={12} />
                            Split Swipe
                          </button>
                          <button
                            onClick={() => setViewMode('vector')}
                            className={`py-1 px-2.5 rounded-md text-[11px] font-bold flex items-center gap-1 transition-all ${
                              viewMode === 'vector' 
                                ? 'bg-white dark:bg-slate-900 text-[#518231] shadow-sm' 
                                : 'text-slate-500'
                            }`}
                          >
                            <FileImage size={12} />
                            Vector Only
                          </button>
                        </div>

                        {viewMode !== 'split' && (
                          <div className="flex items-center gap-2">
                            <button onClick={() => setZoom(z => Math.max(0.5, z - 0.25))} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"><ZoomOut size={16} /></button>
                            <span className="text-xs font-bold w-12 text-center">{Math.round(zoom * 100)}%</span>
                            <button onClick={() => setZoom(z => Math.min(30, z + 0.25))} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded"><ZoomIn size={16} /></button>
                            <button onClick={resetZoomPan} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-xs font-bold px-2">Reset</button>
                          </div>
                        )}
                      </div>

                      {/* Main Viewport Container */}
                      <div 
                        ref={previewContainerRef}
                        onWheel={handleWheel}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        className={`h-[420px] relative rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-950/40 select-none ${
                          isPanning ? 'cursor-grabbing' : 'cursor-grab'
                        }`}
                      >
                        
                        {/* A. SIDE-BY-SIDE VIEWPORT */}
                        {viewMode === 'side-by-side' && (
                          <div className="grid grid-cols-2 h-full divide-x divide-slate-200 dark:divide-slate-800">
                            {/* Original */}
                            <div className="h-full relative overflow-hidden flex flex-col items-center justify-center p-2">
                              <span className="absolute top-2 left-2 z-10 text-[10px] font-bold uppercase tracking-wider py-0.5 px-2 bg-slate-900/80 text-white rounded">Original Bitmap</span>
                              <div
                                style={{
                                  transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                                  transformOrigin: 'center',
                                  transition: isPanning ? 'none' : 'transform 0.1s ease-out'
                                }}
                                className="max-w-full max-h-full"
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={activeItem.originalUrl} alt="Original image" className="max-h-[300px] object-contain pointer-events-none" />
                              </div>
                            </div>

                            {/* Vector SVG */}
                            <div className="h-full relative overflow-hidden flex flex-col items-center justify-center p-2 checkerboard-bg">
                              <span className="absolute top-2 left-2 z-10 text-[10px] font-bold uppercase tracking-wider py-0.5 px-2 bg-slate-900/80 text-white rounded">Vector SVG</span>
                              <div
                                style={{
                                  transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                                  transformOrigin: 'center',
                                  transition: isPanning ? 'none' : 'transform 0.1s ease-out'
                                }}
                                className="max-w-full max-h-full"
                              >
                                {activeItem.svgCode ? (
                                  <div 
                                    className="max-h-[300px] flex items-center justify-center pointer-events-none"
                                    dangerouslySetInnerHTML={{ __html: activeItem.svgCode }}
                                  />
                                ) : (
                                  <div className="text-slate-400 text-xs text-center flex flex-col gap-2 items-center">
                                    {activeItem.status === 'converting' ? (
                                      <>
                                        <Loader2 className="animate-spin text-[#518231]" />
                                        Converting...
                                      </>
                                    ) : (
                                      <>
                                        <Play className="text-slate-400" />
                                        Click Vectorize to trace this image
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* B. SPLIT SCREEN SWIPE VIEWPORT */}
                        {viewMode === 'split' && (
                          <div className="h-full w-full relative overflow-hidden">
                            {/* Original (Left Background) */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={activeItem.originalUrl} alt="original" className="max-h-[360px] object-contain pointer-events-none" />
                            </div>

                            {/* Vector (Right Slider Overlay) */}
                            <div 
                              className="absolute inset-y-0 right-0 overflow-hidden checkerboard-bg flex items-center justify-center"
                              style={{ left: `${splitPos}%` }}
                            >
                              <div 
                                className="absolute w-[100vw] h-full flex items-center justify-center"
                                style={{ right: `${100 - splitPos}vw` }}
                              >
                                {activeItem.svgCode ? (
                                  <div 
                                    className="max-h-[360px] flex items-center justify-center pointer-events-none"
                                    dangerouslySetInnerHTML={{ __html: activeItem.svgCode }}
                                  />
                                ) : (
                                  <span className="text-slate-400 text-xs">Vector Pending</span>
                                )}
                              </div>
                            </div>

                            {/* Swipe Bar divider */}
                            <div 
                              className="absolute inset-y-0 w-1 bg-white hover:bg-slate-300 dark:bg-slate-800 cursor-ew-resize z-25 flex items-center justify-center shadow-lg"
                              style={{ left: `${splitPos}%` }}
                            >
                              <div className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 flex items-center justify-center text-xs shadow-md">
                                ↔
                              </div>
                            </div>

                            {/* Transparent Drag Overlay for Slider */}
                            <input 
                              type="range"
                              min="0"
                              max="100"
                              value={splitPos}
                              onChange={(e) => setSplitPos(Number(e.target.value))}
                              className="absolute inset-0 opacity-0 cursor-ew-resize z-30 w-full h-full"
                            />
                          </div>
                        )}

                        {/* C. VECTOR ONLY VIEWPORT */}
                        {viewMode === 'vector' && (
                          <div className="h-full relative overflow-hidden flex flex-col items-center justify-center p-2 checkerboard-bg">
                            <span className="absolute top-2 left-2 z-10 text-[10px] font-bold uppercase tracking-wider py-0.5 px-2 bg-slate-900/80 text-white rounded">Vector Preview</span>
                            <div
                              style={{
                                transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                                transformOrigin: 'center',
                                transition: isPanning ? 'none' : 'transform 0.1s ease-out'
                              }}
                              className="max-w-full max-h-full"
                            >
                              {activeItem.svgCode ? (
                                <div 
                                  className="max-h-[360px] flex items-center justify-center pointer-events-none"
                                  dangerouslySetInnerHTML={{ __html: activeItem.svgCode }}
                                />
                              ) : (
                                <div className="text-slate-400 text-xs text-center">
                                  No Vector generated yet. Click Vectorize.
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                      </div>

                    </div>
                  )}

                  {/* 2. SVG CODE VIEWER TAB */}
                  {editorTab === 'code' && (
                    <div className="flex flex-col gap-4">
                      {activeItem.svgCode ? (
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-400 font-semibold">
                              You can directly edit the XML code block below to modify attributes or paths in real-time.
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={saveCustomCodeChanges}
                                className="flex items-center gap-1 py-1 px-2.5 bg-green-500 hover:bg-green-600 text-white rounded text-xs font-bold transition-all shadow-sm"
                              >
                                Save Changes
                              </button>
                              <button
                                onClick={() => copyToClipboard(customSvgCode || activeItem.svgCode || '')}
                                className="flex items-center gap-1 py-1 px-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold rounded transition-all"
                              >
                                <Copy size={12} />
                                Copy Code
                              </button>
                            </div>
                          </div>
                          
                          <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden h-[340px]">
                            <Editor
                              height="100%"
                              defaultLanguage="xml"
                              theme={monacoTheme}
                              value={customSvgCode || activeItem.svgCode}
                              onChange={handleEditorChange}
                              options={{
                                minimap: { enabled: false },
                                fontSize: 13,
                                lineNumbers: 'on',
                                scrollBeyondLastLine: false,
                                automaticLayout: true,
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="h-[240px] flex items-center justify-center text-slate-400 text-xs">
                          No SVG code available. Click Vectorize to trace this image.
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3. ANALYSIS & SUGGESTIONS TAB */}
                  {editorTab === 'stats' && (
                    <div className="flex flex-col gap-5">
                      
                      {activeItem.stats ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          
                          {/* Metrics List */}
                          <div className="bg-slate-50 dark:bg-slate-900/30 p-4 border border-slate-100 dark:border-slate-800/80 rounded-xl flex flex-col gap-3">
                            <h4 className="font-bold text-xs uppercase tracking-wide text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">Vector Metrics</h4>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                              <div>
                                <span className="text-slate-400 block mb-0.5">Vector Size</span>
                                <span className="font-bold text-sm">{(activeItem.stats.fileSize / 1024).toFixed(2)} KB</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block mb-0.5">Reduction Ratio</span>
                                <span className="font-bold text-sm text-[#518231]">
                                  {Math.round(((activeItem.size - activeItem.stats.fileSize) / activeItem.size) * 100)}% smaller
                                </span>
                              </div>
                              <div>
                                <span className="text-slate-400 block mb-0.5">Traced Paths</span>
                                <span className="font-bold text-sm">{activeItem.stats.pathCount} Paths</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block mb-0.5">Colors Palette</span>
                                <span className="font-bold text-sm">{activeItem.stats.colorCount} Colors</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block mb-0.5">Optimization Score</span>
                                <span className="font-bold text-sm text-[#518231]">{activeItem.stats.optimizationScore}/100</span>
                              </div>
                              <div>
                                <span className="text-slate-400 block mb-0.5">Scalability Score</span>
                                <span className="font-bold text-sm text-[#518231]">100/100</span>
                              </div>
                            </div>
                          </div>

                          {/* Tracing Recommendations */}
                          <div className="flex flex-col gap-3">
                            <h4 className="font-bold text-xs uppercase tracking-wide text-slate-400">Optimization Suggestions</h4>
                            {optimizationSuggestions.length > 0 ? (
                              <div className="flex flex-col gap-2.5">
                                {optimizationSuggestions.map((sug) => (
                                  <div key={sug.id} className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30 p-3 rounded-lg flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
                                    <Info size={14} className="shrink-0 mt-0.5 text-amber-500" />
                                    <span>{sug.text}</span>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="bg-green-50/50 dark:bg-green-950/10 border border-green-200/50 dark:border-green-900/30 p-4 rounded-xl flex items-start gap-2.5 text-xs text-green-800 dark:text-green-300">
                                <CheckCircle2 size={16} className="shrink-0 text-green-500" />
                                <span>Perfect optimization! Traced paths are simplified and color layers are optimized for fast web delivery.</span>
                              </div>
                            )}
                          </div>

                        </div>
                      ) : (
                        <div className="h-[120px] flex items-center justify-center text-slate-400 text-xs">
                          No analysis stats available. Run Vectorize first.
                        </div>
                      )}

                      {/* Developer Integration snippets */}
                      <div className="border-t border-slate-100 dark:border-slate-800 pt-5 flex flex-col gap-4">
                        <h4 className="font-bold text-sm flex items-center gap-1.5">
                          <Palette size={16} />
                          Developer Export Options
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* Picture tag fallback */}
                          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-3">
                            <div>
                              <span className="font-bold text-xs block mb-1">Responsive HTML &lt;picture&gt; Tag</span>
                              <span className="text-[11px] text-slate-400 block leading-normal">
                                Leverages optimized SVGs with fallback raster formats for maximum loading performance.
                              </span>
                            </div>
                            <pre className="text-[10px] p-2 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded overflow-x-auto select-all custom-scrollbar max-h-[80px]">
                              <code>{pictureCodeSnippet}</code>
                            </pre>
                            <button
                              onClick={() => copyToClipboard(pictureCodeSnippet)}
                              className="mt-2 py-1.5 px-3 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 shadow-sm transition-all"
                            >
                              <Copy size={12} />
                              Copy HTML Snippet
                            </button>
                          </div>

                          {/* React TypeScript Component */}
                          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between gap-3">
                            <div>
                              <span className="font-bold text-xs block mb-1">React JSX Component (TypeScript)</span>
                              <span className="text-[11px] text-slate-400 block leading-normal">
                                Generates an inline vector component that accepts sizing props and Tailwind customization directly.
                              </span>
                            </div>
                            <pre className="text-[10px] p-2 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-850 rounded overflow-x-auto select-all custom-scrollbar max-h-[80px]">
                              <code>{reactCodeSnippet || "Traced SVG code required."}</code>
                            </pre>
                            <button
                              disabled={!reactCodeSnippet}
                              onClick={() => copyToClipboard(reactCodeSnippet)}
                              className="mt-2 py-1.5 px-3 bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-lg flex items-center justify-center gap-1 shadow-sm transition-all disabled:opacity-50"
                            >
                              <Copy size={12} />
                              Copy React Component
                            </button>
                          </div>

                        </div>
                      </div>

                    </div>
                  )}

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Save Settings Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-2xl max-w-sm w-full flex flex-col gap-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base">Save Current Configurations</h3>
              <button onClick={() => setShowConfigModal(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1">Preset Profile Name</label>
              <input
                type="text"
                placeholder="e.g. Logo Optimized 4-Color"
                value={newConfigName}
                onChange={(e) => setNewConfigName(e.target.value)}
                className="w-full text-xs py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-[#518231]"
              />
            </div>
            <button
              onClick={savePreset}
              className="py-2.5 px-4 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-xl shadow-md transition-all flex justify-center"
            >
              Save Custom Settings
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
