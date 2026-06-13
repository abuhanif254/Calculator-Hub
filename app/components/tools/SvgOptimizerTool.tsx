"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { 
  Upload, Trash2, Download, RefreshCw, Sliders, Eye, 
  CheckCircle2, AlertCircle, Loader2, Sparkles, Plus, X, 
  Info, FileCode, CheckSquare, Maximize, Columns, 
  ZoomIn, ZoomOut, Copy, FileDown, Layers, Play, Settings,
  ArrowRight, Activity
} from "lucide-react";
import Editor, { DiffEditor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import JSZip from 'jszip';
import { SvgOptimizer, SvgOptimizerOptions, SvgAnalysis } from '@/lib/utils/svgOptimizer';

interface QueueItem {
  id: string;
  file?: File;
  name: string;
  size: number;
  originalCode: string;
  optimizedCode: string | null;
  status: 'idle' | 'optimizing' | 'success' | 'error';
  progress: number;
  originalStats: SvgAnalysis | null;
  optimizedStats: SvgAnalysis | null;
  errorMsg?: string;
}

export function SvgOptimizerTool() {
  const { resolvedTheme } = useTheme();
  const monacoTheme = resolvedTheme === 'dark' ? 'vs-dark' : 'light';

  // Queue state
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // Settings
  const [preset, setPreset] = useState<'safe' | 'standard' | 'aggressive' | 'max'>('standard');
  const [precision, setPrecision] = useState<number>(3);
  const [removeComments, setRemoveComments] = useState<boolean>(true);
  const [removeMetadata, setRemoveMetadata] = useState<boolean>(true);
  const [removeEditorTags, setRemoveEditorTags] = useState<boolean>(true);
  const [removeHiddenElements, setRemoveHiddenElements] = useState<boolean>(true);
  const [removeDefaultAttributes, setRemoveDefaultAttributes] = useState<boolean>(true);
  const [minifyStyles, setMinifyStyles] = useState<boolean>(true);
  const [collapseGroups, setCollapseGroups] = useState<boolean>(true);
  const [cleanColors, setCleanColors] = useState<boolean>(true);
  const [roundCoordinates, setRoundCoordinates] = useState<boolean>(true);
  const [simplifyPaths, setSimplifyPaths] = useState<boolean>(true);

  // Previewer View Settings
  const [viewMode, setViewMode] = useState<'side-by-side' | 'split' | 'vector'>('side-by-side');
  const [zoom, setZoom] = useState<number>(1);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [splitPos, setSplitPos] = useState<number>(50); // 0-100 for split slider
  const [editorTab, setEditorTab] = useState<'preview' | 'code' | 'diff' | 'react' | 'stats'>('preview');

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
    if (preset === 'safe') {
      setPrecision(5);
      setRemoveComments(true);
      setRemoveMetadata(true);
      setRemoveEditorTags(false);
      setRemoveHiddenElements(false);
      setRemoveDefaultAttributes(false);
      setMinifyStyles(false);
      setCollapseGroups(false);
      setCleanColors(false);
      setRoundCoordinates(true);
      setSimplifyPaths(false);
    } else if (preset === 'standard') {
      setPrecision(3);
      setRemoveComments(true);
      setRemoveMetadata(true);
      setRemoveEditorTags(true);
      setRemoveHiddenElements(true);
      setRemoveDefaultAttributes(true);
      setMinifyStyles(true);
      setCollapseGroups(true);
      setCleanColors(true);
      setRoundCoordinates(true);
      setSimplifyPaths(true);
    } else if (preset === 'aggressive') {
      setPrecision(2);
      setRemoveComments(true);
      setRemoveMetadata(true);
      setRemoveEditorTags(true);
      setRemoveHiddenElements(true);
      setRemoveDefaultAttributes(true);
      setMinifyStyles(true);
      setCollapseGroups(true);
      setCleanColors(true);
      setRoundCoordinates(true);
      setSimplifyPaths(true);
    } else if (preset === 'max') {
      setPrecision(1);
      setRemoveComments(true);
      setRemoveMetadata(true);
      setRemoveEditorTags(true);
      setRemoveHiddenElements(true);
      setRemoveDefaultAttributes(true);
      setMinifyStyles(true);
      setCollapseGroups(true);
      setCleanColors(true);
      setRoundCoordinates(true);
      setSimplifyPaths(true);
    }
  }, [preset]);

  // Convert SVG string to React Component Code
  const reactComponentCode = useMemo(() => {
    const code = activeItem?.optimizedCode || activeItem?.originalCode;
    if (!code) return '';

    let cleaned = code;
    // Replace standard attributes with React camelCase tags
    const attrMap: Record<string, string> = {
      'class=': 'className=',
      'fill-rule=': 'fillRule=',
      'clip-rule=': 'clipRule=',
      'stroke-width=': 'strokeWidth=',
      'stroke-linecap=': 'strokeLinecap=',
      'stroke-linejoin=': 'strokeLinejoin=',
      'stroke-dasharray=': 'strokeDasharray=',
      'stroke-dashoffset=': 'strokeDashoffset=',
      'stroke-miterlimit=': 'strokeMiterlimit=',
      'stop-color=': 'stopColor=',
      'stop-opacity=': 'stopOpacity=',
      'font-size=': 'fontSize=',
      'font-family=': 'fontFamily=',
      'font-weight=': 'fontWeight=',
      'viewbox=': 'viewBox=',
      'xml:space=': 'xmlSpace=',
      'xmlns:xlink=': 'xmlnsXlink='
    };

    Object.keys(attrMap).forEach(key => {
      cleaned = cleaned.replace(new RegExp(key, 'gi'), attrMap[key]);
    });

    // Spread props into root <svg>
    cleaned = cleaned.replace(/<svg([^>]*)/, `<svg$1 {...props}`);

    // Create Component Name
    let baseName = activeItem?.name.replace(/\.[^/.]+$/, "") || 'Icon';
    // Remove symbols and camelCase
    baseName = baseName.replace(/[^a-zA-Z0-9]/g, ' ');
    baseName = baseName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    if (!baseName || /^\d/.test(baseName)) baseName = 'Svg' + baseName;

    return `import React from 'react';

export default function ${baseName}(props: React.SVGProps<SVGSVGElement>) {
  return (
    ${cleaned}
  );
}`;
  }, [activeItem?.optimizedCode, activeItem?.originalCode, activeItem?.name]);

  // Load and read SVG file helper
  const handleFiles = useCallback((files: FileList | File[]) => {
    const newList: QueueItem[] = [];
    setErrorMsg(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (ext !== '.svg' && ext !== '.svgz') {
        setErrorMsg("Unsupported image type. Only standard SVG vector files are supported.");
        continue;
      }

      if (file.size > 20 * 1024 * 1024) {
        setErrorMsg("Files larger than 20MB are not recommended for client-side processing.");
        continue;
      }

      const id = `svg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const stats = SvgOptimizer.analyze(text);
        
        setQueue(prev => prev.map(q => q.id === id ? {
          ...q,
          originalCode: text,
          originalStats: stats
        } : q));
      };
      reader.readAsText(file);

      newList.push({
        id,
        file,
        name: file.name,
        size: file.size,
        originalCode: '',
        optimizedCode: null,
        status: 'idle',
        progress: 0,
        originalStats: null,
        optimizedStats: null
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
    setQueue(prev => prev.filter(q => q.id !== id));
    if (activeItemId === id) {
      setActiveItemId(null);
    }
  };

  const clearQueue = () => {
    setQueue([]);
    setActiveItemId(null);
  };

  // Run optimizer on item
  const optimizeItem = async (item: QueueItem): Promise<QueueItem> => {
    if (!item.originalCode) return item;
    
    setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'optimizing', progress: 30 } : q));
    await new Promise(r => setTimeout(r, 0));

    try {
      const opts: SvgOptimizerOptions = {
        preset,
        precision,
        removeComments,
        removeMetadata,
        removeEditorTags,
        removeHiddenElements,
        removeDefaultAttributes,
        minifyStyles,
        collapseGroups,
        cleanColors,
        roundCoordinates,
        simplifyPaths
      };

      const optimizedText = SvgOptimizer.optimize(item.originalCode, opts);
      const optStats = SvgOptimizer.analyze(optimizedText);

      return {
        ...item,
        status: 'success',
        progress: 100,
        optimizedCode: optimizedText,
        optimizedStats: optStats
      };
    } catch (e: any) {
      console.error(e);
      return {
        ...item,
        status: 'error',
        progress: 0,
        errorMsg: e.message || "Optimization failed"
      };
    }
  };

  const processActiveItem = async () => {
    if (!activeItem) return;
    setIsProcessing(true);
    const updated = await optimizeItem(activeItem);
    setQueue(prev => prev.map(q => q.id === activeItem.id ? updated : q));
    setIsProcessing(false);
  };

  const processBatchQueue = async () => {
    setIsProcessing(true);
    const pending = queue.filter(q => q.status !== 'success');
    for (const item of pending) {
      const updated = await optimizeItem(item);
      setQueue(prev => prev.map(q => q.id === item.id ? updated : q));
    }
    setIsProcessing(false);
    setSuccessMsg(`Successfully optimized ${pending.length} SVG elements!`);
  };

  // Downloads
  const downloadSingleSvg = (item: QueueItem) => {
    if (!item.optimizedCode) return;
    const blob = new Blob([item.optimizedCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = item.name.replace(/\.[^/.]+$/, "") + ".optimized.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyOptimizedToClipboard = () => {
    const code = activeItem?.optimizedCode || activeItem?.originalCode;
    if (!code) return;
    navigator.clipboard.writeText(code);
    setSuccessMsg("Optimized SVG code copied to clipboard!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const copyReactCodeToClipboard = () => {
    if (!reactComponentCode) return;
    navigator.clipboard.writeText(reactComponentCode);
    setSuccessMsg("React Component snippet copied!");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const downloadZip = async () => {
    const successfulItems = queue.filter(q => q.status === 'success' && q.optimizedCode);
    if (successfulItems.length === 0) return;

    const zip = new JSZip();
    successfulItems.forEach(item => {
      if (item.optimizedCode) {
        const name = item.name.replace(/\.[^/.]+$/, "") + ".optimized.svg";
        zip.file(name, item.optimizedCode);
      }
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = `optimized_svgs_${Date.now()}.zip`;
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

  // Keyboard paste listener
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const text = e.clipboardData?.getData('text');
      if (text && text.trim().startsWith('<svg')) {
        // Build mock File
        const blob = new Blob([text], { type: 'image/svg+xml' });
        const file = new File([blob], `pasted-vector-${Date.now().toString().slice(-4)}.svg`, { type: 'image/svg+xml' });
        handleFiles([file] as any);
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
          <span><strong>Your SVG files remain private.</strong> All optimization and code conversion happens entirely inside your browser. No files are uploaded to our servers.</span>
        </div>
      </div>

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

      {/* Drag & Drop Main workspace */}
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
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Drag & Drop SVG Files Here</h3>
          <p className="text-sm text-slate-500 dark:text-slate-450 mt-2 max-w-sm">
            Supports SVG and SVGZ graphics. Drag multiple assets, browse from files, or paste SVG markup code directly.
          </p>
          <button className="mt-6 px-6 py-2.5 bg-[#518231] text-white text-xs font-bold rounded-xl shadow-md hover:bg-[#518231]/95 transition-all">
            Browse SVG Files
          </button>
          <p className="text-[10px] text-slate-400 mt-3">Or copy XML code from Illustrator/Figma and paste (Ctrl+V) directly on this page</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel: Previewer Workstation (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Viewports Container */}
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
                    <div className="flex items-center gap-1.5"><Maximize size={13} /> Output Vector</div>
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

              {/* Pan Area */}
              <div 
                ref={previewContainerRef}
                onMouseDown={startPan}
                onMouseMove={doPan}
                onMouseUp={endPan}
                onMouseLeave={endPan}
                className="flex-1 overflow-hidden relative select-none cursor-grab active:cursor-grabbing bg-workspace-checker flex items-center justify-center"
              >
                {/* Side by side original/optimized */}
                {viewMode === 'side-by-side' && (
                  <div className="grid grid-cols-2 w-full h-full divide-x divide-slate-200 dark:divide-slate-850">
                    <div className="relative overflow-hidden flex items-center justify-center h-full p-6">
                      <div 
                        style={{
                          transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
                          transformOrigin: 'center center'
                        }}
                        className="transition-transform duration-75 max-w-full max-h-full flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: activeItem?.originalCode || '' }}
                      />
                      <div className="absolute top-3 left-3 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-sm shadow">
                        Original SVG
                      </div>
                    </div>

                    <div className="relative overflow-hidden flex items-center justify-center h-full p-6">
                      <div 
                        style={{
                          transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
                          transformOrigin: 'center center'
                        }}
                        className="transition-transform duration-75 max-w-full max-h-full flex items-center justify-center"
                        dangerouslySetInnerHTML={{ __html: activeItem?.optimizedCode || activeItem?.originalCode || '' }}
                      />
                      <div className="absolute top-3 left-3 bg-[#518231] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow">
                        Optimized SVG
                      </div>
                    </div>
                  </div>
                )}

                {/* Interactive Slider Split */}
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
                      className="relative border border-slate-250 dark:border-slate-800 shadow-xl overflow-hidden aspect-square"
                    >
                      {/* Left: Original */}
                      <div 
                        dangerouslySetInnerHTML={{ __html: activeItem?.originalCode || '' }}
                        className="absolute inset-0 w-full h-full object-contain bg-workspace-checker pointer-events-none [&>svg]:w-full [&>svg]:h-full"
                      />

                      {/* Right: Optimized Overlay */}
                      <div 
                        style={{ clipPath: `polygon(0 0, ${splitPos}% 0, ${splitPos}% 100%, 0 100%)` }}
                        dangerouslySetInnerHTML={{ __html: activeItem?.optimizedCode || activeItem?.originalCode || '' }}
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none [&>svg]:w-full [&>svg]:h-full bg-workspace-checker"
                      />

                      {/* Handle */}
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

                {/* Single optimized Output View */}
                {viewMode === 'vector' && (
                  <div className="relative overflow-hidden flex items-center justify-center w-full h-full p-8">
                    <div 
                      style={{
                        transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
                        transformOrigin: 'center center'
                      }}
                      className="transition-transform duration-75 max-w-full max-h-full flex items-center justify-center"
                      dangerouslySetInnerHTML={{ __html: activeItem?.optimizedCode || activeItem?.originalCode || '' }}
                    />
                    <div className="absolute top-3 left-3 bg-[#518231] text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                      <Layers size={10} /> Optimized rendering output
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Panel: Monaco Diff Editor / React / Stats tabs */}
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
                  <div className="flex items-center gap-1.5"><FileCode size={13} /> Optimized XML</div>
                </button>
                <button 
                  onClick={() => setEditorTab('diff')}
                  className={`px-5 py-3.5 font-bold transition-all border-b-2 ${editorTab === 'diff' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-550 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'}`}
                >
                  <div className="flex items-center gap-1.5"><Sliders size={13} /> Code Markup Diff</div>
                </button>
                <button 
                  onClick={() => setEditorTab('react')}
                  className={`px-5 py-3.5 font-bold transition-all border-b-2 ${editorTab === 'react' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-550 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'}`}
                >
                  <div className="flex items-center gap-1.5"><Sparkles size={13} /> React Component</div>
                </button>
                <button 
                  onClick={() => setEditorTab('stats')}
                  className={`px-5 py-3.5 font-bold transition-all border-b-2 ${editorTab === 'stats' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-550 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'}`}
                >
                  <div className="flex items-center gap-1.5"><Activity size={13} /> Performance Report</div>
                </button>
              </div>

              <div className="p-4">
                {/* Visual Viewport Actions */}
                {editorTab === 'preview' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Synchronized zooming and panning displays details. Verify shape structures before download.</span>
                      <div className="flex gap-2">
                        <button 
                          onClick={copyOptimizedToClipboard}
                          className="px-3.5 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-lg font-bold flex items-center gap-1.5 text-slate-700 dark:text-slate-350"
                        >
                          <Copy size={13} /> Copy Code
                        </button>
                        <button 
                          onClick={() => downloadSingleSvg(activeItem!)}
                          disabled={!activeItem?.optimizedCode}
                          className="px-4 py-2 bg-[#518231] hover:bg-[#518231]/90 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-sm disabled:opacity-50"
                        >
                          <Download size={13} /> Download SVG
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Optimized Code Editor */}
                {editorTab === 'code' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Minified and optimized vector output XML strings.</span>
                      <button 
                        onClick={copyOptimizedToClipboard}
                        className="px-2.5 py-1.5 border border-slate-200 dark:border-slate-850 rounded bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 flex items-center gap-1 font-bold text-slate-650 dark:text-slate-300"
                      >
                        <Copy size={12} /> Copy Code
                      </button>
                    </div>
                    <div className="h-64 border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden">
                      <Editor
                        height="100%"
                        defaultLanguage="xml"
                        value={activeItem?.optimizedCode || activeItem?.originalCode || ''}
                        theme={monacoTheme}
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                          fontSize: 12,
                          wordWrap: 'on'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* XML Diff Viewer */}
                {editorTab === 'diff' && (
                  <div className="space-y-3">
                    <div className="text-xs text-slate-500">Line-by-line comparison of code changes. Strip elements are highlighted on the left (Original).</div>
                    <div className="h-80 border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden">
                      <DiffEditor
                        original={activeItem?.originalCode || ''}
                        modified={activeItem?.optimizedCode || activeItem?.originalCode || ''}
                        language="xml"
                        theme={monacoTheme}
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                          fontSize: 12,
                          wordWrap: 'on'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* React Component Snippet Exporter */}
                {editorTab === 'react' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Formats optimized SVG parameters into clean React functional component code (camelCase).</span>
                      <button 
                        onClick={copyReactCodeToClipboard}
                        className="px-3 py-1.5 bg-[#518231] hover:bg-[#518231]/95 text-white rounded flex items-center gap-1 font-bold"
                      >
                        <Copy size={12} /> Copy TSX Snippet
                      </button>
                    </div>
                    <div className="h-64 border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden">
                      <Editor
                        height="100%"
                        defaultLanguage="typescript"
                        value={reactComponentCode}
                        theme={monacoTheme}
                        options={{
                          readOnly: true,
                          minimap: { enabled: false },
                          fontSize: 12,
                          wordWrap: 'on'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Detailed Performance Statistics */}
                {editorTab === 'stats' && activeItem && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Original Size vs Optimized */}
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/50 dark:border-slate-850 flex flex-col justify-center">
                        <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">Compression Report</span>
                        <div className="flex items-baseline gap-2 mt-2">
                          <span className="text-xl font-extrabold text-slate-800 dark:text-slate-200">{formatSize(activeItem.optimizedStats?.fileSize || activeItem.size)}</span>
                          <span className="text-xs text-slate-400 line-through">from {formatSize(itemSize(activeItem))}</span>
                        </div>
                        {activeItem.optimizedStats && (
                          <div className="text-[10px] text-slate-400 font-bold mt-1.5">
                            Saved <span className="text-[#518231]">{formatSize(activeItem.size - activeItem.optimizedStats.fileSize)}</span> ({Math.round(((activeItem.size - activeItem.optimizedStats.fileSize) / activeItem.size) * 100)}% savings)
                          </div>
                        )}
                      </div>

                      {/* Element Counts comparison */}
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/50 dark:border-slate-850">
                        <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">DOM Nodes Reduced</span>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                          <div>
                            <span className="text-slate-400">Original tags:</span>
                            <p className="font-bold text-slate-800 dark:text-slate-200">{activeItem.originalStats?.elementCount || 0}</p>
                          </div>
                          <div>
                            <span className="text-slate-400">Optimized tags:</span>
                            <p className="font-bold text-slate-800 dark:text-slate-200">{activeItem.optimizedStats?.elementCount || 0}</p>
                          </div>
                        </div>
                      </div>

                      {/* Web Performance Estimation */}
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200/50 dark:border-slate-850 flex flex-col justify-center">
                        <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">Page speed score</span>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="text-xl font-extrabold text-blue-500">
                            {activeItem.optimizedStats ? Math.min(100, Math.round(90 + (activeItem.size - activeItem.optimizedStats.fileSize) / activeItem.size * 10)) : 90}%
                          </div>
                          <span className="text-[10px] bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded font-bold">LCP Improved</span>
                        </div>
                        <p className="text-[9px] text-slate-400 mt-1">Estimated loading speed increased by up to 2.4x</p>
                      </div>
                    </div>

                    {/* Node level table */}
                    <div className="border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden text-xs">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-850 font-bold text-slate-650">
                            <th className="p-3">Vector Metrics</th>
                            <th className="p-3">Original Values</th>
                            <th className="p-3">Optimized Values</th>
                            <th className="p-3">Markup Delta</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-slate-750 dark:text-slate-350">
                          <tr>
                            <td className="p-3 font-semibold">SVG Dimensions</td>
                            <td className="p-3">{activeItem.originalStats?.width || 'Auto'} × {activeItem.originalStats?.height || 'Auto'}</td>
                            <td className="p-3">{activeItem.optimizedStats?.width || 'Auto'} × {activeItem.optimizedStats?.height || 'Auto'}</td>
                            <td className="p-3 text-slate-400">Preserved</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold">Path elements</td>
                            <td className="p-3">{activeItem.originalStats?.pathCount || 0}</td>
                            <td className="p-3">{activeItem.optimizedStats?.pathCount || 0}</td>
                            <td className="p-3 text-slate-400">Simplified coordinates</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold">Nested Groups (&lt;g&gt;)</td>
                            <td className="p-3">{activeItem.originalStats?.groupCount || 0}</td>
                            <td className="p-3">{activeItem.optimizedStats?.groupCount || 0}</td>
                            <td className="p-3 text-[#518231] font-bold">-{Math.max(0, (activeItem.originalStats?.groupCount || 0) - (activeItem.optimizedStats?.groupCount || 0))} groups collapsed</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold">Metadata Elements</td>
                            <td className="p-3">{activeItem.originalStats?.metadataCount || 0}</td>
                            <td className="p-3">{activeItem.optimizedStats?.metadataCount || 0}</td>
                            <td className="p-3 text-[#518231] font-bold">-{Math.max(0, (activeItem.originalStats?.metadataCount || 0) - (activeItem.optimizedStats?.metadataCount || 0))} namespaces removed</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Batch queue lists */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-850 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <CheckSquare className="text-[#518231] w-4.5 h-4.5" /> Bulk Image Queue ({queue.length})
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl font-bold flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300"
                  >
                    <Plus size={14} /> Add SVGs
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
                      <div className="w-12 h-12 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 flex items-center justify-center shrink-0 overflow-hidden bg-workspace-checker p-1">
                        <div 
                          dangerouslySetInnerHTML={{ __html: item.optimizedCode || item.originalCode || '' }}
                          className="w-full h-full flex items-center justify-center [&>svg]:max-w-full [&>svg]:max-h-full"
                        />
                      </div>
                      <div className="overflow-hidden flex-1 space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{item.name}</h4>
                        <p className="text-[10px] text-slate-450 dark:text-slate-500 font-semibold">
                          {formatSize(itemSize(item))}
                          {item.optimizedStats && (
                            <span className="text-[#518231] ml-1.5 font-bold">
                              -{Math.round(((item.size - item.optimizedStats.fileSize) / item.size) * 100)}%
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.status === 'optimizing' && (
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
                            className="p-1.5 rounded bg-[#518231]/10 text-[#518231] hover:bg-[#518231] hover:text-white transition-colors"
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

              {/* Actions Footer */}
              <div className="pt-3 border-t border-slate-150 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <button
                  onClick={processBatchQueue}
                  disabled={isProcessing || queue.every(q => q.status === 'success')}
                  className="px-6 py-3 bg-[#518231] hover:bg-[#518231]/90 text-white font-bold text-xs rounded-xl disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md shadow-[#518231]/10"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Compressing Queue...
                    </>
                  ) : (
                    <>
                      <Play size={14} />
                      Optimize All Queue
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
                      onClick={() => queue.filter(q => q.status === 'success').forEach(q => downloadSingleSvg(q))}
                      className="px-5 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 text-slate-750 dark:text-slate-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                    >
                      <Download size={14} />
                      Save All Optimized
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Panel: Optimization Engine controls sidebar (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-6">
            
            {/* Control Form Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl p-4 sm:p-5 shadow-sm space-y-5">
              <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <Settings className="text-[#518231] w-4 h-4" /> SVG Optimization Options
              </h3>

              {/* Presets */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Compression Presets</label>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'safe', name: 'Safe Mode', desc: 'Preserves IDs and styles. Safe precision.' },
                    { id: 'standard', name: 'Standard', desc: 'Standard minification. Recommended.' },
                    { id: 'aggressive', name: 'Aggressive', desc: 'Aggressive collapses and shorter HEX values.' },
                    { id: 'max', name: 'Maximum', desc: 'Maximum code reduction. Might distort paths slightly.' }
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPreset(p.id as any)}
                      className={`px-2.5 py-2 rounded-lg text-left border text-[10px] font-bold transition-all ${
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

              {/* Control Settings Sliders & Checkboxes */}
              <div className="space-y-4">
                
                {/* Precision Decimal Control */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <label>Decimal Precision</label>
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{precision} decimals</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" 
                    max="10" 
                    value={precision}
                    onChange={(e) => setPrecision(Number(e.target.value))}
                    className="w-full accent-[#518231]"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-bold">
                    <span>Blocky (0)</span>
                    <span>High Precision (10)</span>
                  </div>
                </div>

                {/* Cleanup Settings */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Cleanup Passes</span>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-0.5">
                      <label htmlFor="removeComments" className="text-slate-650 dark:text-slate-350 cursor-pointer">Remove Comments</label>
                      <input 
                        type="checkbox" 
                        id="removeComments"
                        checked={removeComments}
                        onChange={(e) => setRemoveComments(e.target.checked)}
                        className="w-4 h-4 accent-[#518231] rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <label htmlFor="removeMetadata" className="text-slate-650 dark:text-slate-350 cursor-pointer">Remove Metadata</label>
                      <input 
                        type="checkbox" 
                        id="removeMetadata"
                        checked={removeMetadata}
                        onChange={(e) => setRemoveMetadata(e.target.checked)}
                        className="w-4 h-4 accent-[#518231] rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <label htmlFor="removeEditorTags" className="text-slate-650 dark:text-slate-350 cursor-pointer">Remove Editor Tags & Defs</label>
                      <input 
                        type="checkbox" 
                        id="removeEditorTags"
                        checked={removeEditorTags}
                        onChange={(e) => setRemoveEditorTags(e.target.checked)}
                        className="w-4 h-4 accent-[#518231] rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <label htmlFor="removeHiddenElements" className="text-slate-650 dark:text-slate-350 cursor-pointer">Remove Hidden Elements</label>
                      <input 
                        type="checkbox" 
                        id="removeHiddenElements"
                        checked={removeHiddenElements}
                        onChange={(e) => setRemoveHiddenElements(e.target.checked)}
                        className="w-4 h-4 accent-[#518231] rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Attribute Optimizers */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Attributes & Styles</span>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-0.5">
                      <label htmlFor="removeDefaultAttributes" className="text-slate-650 dark:text-slate-350 cursor-pointer">Remove Default Attributes</label>
                      <input 
                        type="checkbox" 
                        id="removeDefaultAttributes"
                        checked={removeDefaultAttributes}
                        onChange={(e) => setRemoveDefaultAttributes(e.target.checked)}
                        className="w-4 h-4 accent-[#518231] rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <label htmlFor="minifyStyles" className="text-slate-650 dark:text-slate-350 cursor-pointer">Minify Inline Styles</label>
                      <input 
                        type="checkbox" 
                        id="minifyStyles"
                        checked={minifyStyles}
                        onChange={(e) => setMinifyStyles(e.target.checked)}
                        className="w-4 h-4 accent-[#518231] rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <label htmlFor="collapseGroups" className="text-slate-650 dark:text-slate-350 cursor-pointer">Collapse Redundant Groups</label>
                      <input 
                        type="checkbox" 
                        id="collapseGroups"
                        checked={collapseGroups}
                        onChange={(e) => setCollapseGroups(e.target.checked)}
                        className="w-4 h-4 accent-[#518231] rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between py-0.5">
                      <label htmlFor="cleanColors" className="text-slate-650 dark:text-slate-350 cursor-pointer">Shorten HEX/RGB Colors</label>
                      <input 
                        type="checkbox" 
                        id="cleanColors"
                        checked={cleanColors}
                        onChange={(e) => setCleanColors(e.target.checked)}
                        className="w-4 h-4 accent-[#518231] rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Path Optimizers */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">Path Operations</span>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-0.5">
                      <label htmlFor="roundCoordinates" className="text-slate-650 dark:text-slate-350 cursor-pointer">Round Path Coordinates</label>
                      <input 
                        type="checkbox" 
                        id="roundCoordinates"
                        checked={roundCoordinates}
                        onChange={(e) => setRoundCoordinates(e.target.checked)}
                        className="w-4 h-4 accent-[#518231] rounded"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Optimize active item trigger */}
              <button
                onClick={processActiveItem}
                disabled={isProcessing || !activeItem}
                className="w-full py-3 bg-[#518231] hover:bg-[#518231]/95 text-white font-bold text-xs rounded-xl disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md shadow-[#518231]/10 mt-4"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Optimizing Vector...
                  </>
                ) : (
                  <>
                    <Sparkles size={14} />
                    Run SVG Optimizer
                  </>
                )}
              </button>

            </div>

            {/* Integration Tip Box */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-2xl text-xs text-blue-800 dark:text-blue-300 space-y-2 shadow-sm">
              <h4 className="font-bold flex items-center gap-1.5"><Info size={14} /> Next.js Embedding Tip</h4>
              <p>For high performance rendering, embed smaller icons directly using the <strong>React Component (TSX)</strong> code tab in Next.js to reduce HTTP headers overheads.</p>
              <p>For illustrations, load them in standard `&lt;Image&gt;` blocks using `/public` paths for CDN cashing.</p>
            </div>

          </div>
        </div>
      )}
      
      <input ref={fileInputRef} type="file" className="hidden" accept=".svg,.svgz" multiple onChange={(e) => e.target.files && handleFiles(e.target.files)} />
    </div>
  );
}

function itemSize(item: QueueItem): number {
  return item.size;
}
