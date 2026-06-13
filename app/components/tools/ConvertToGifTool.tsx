"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { 
  Upload, Trash2, Download, RefreshCw, Sliders, Eye, 
  CheckCircle2, AlertCircle, Loader2, Sparkles, Plus, X, 
  Info, FileDown, Play, Pause, Settings, Copy, Columns, Layers, 
  Maximize, FileCode, CheckSquare, Palette, ZoomIn, ZoomOut, 
  Heart, Save, Trash, HelpCircle, Check, FileImage, ShieldCheck,
  ChevronLeft, ChevronRight, CopyPlus, PlayCircle, SkipForward, SkipBack, Edit3
} from "lucide-react";
import { useTheme } from 'next-themes';
import JSZip from 'jszip';
import { GIFEncoder, quantize, applyPalette } from '@/lib/utils/gifEncoder';

interface FrameItem {
  id: string;
  file?: File;
  name: string;
  size: number;
  originalUrl: string;
  // Per-frame configurations
  delay: number; // ms
  rotation: number; // 0, 90, 180, 270 degrees
  flipH: boolean;
  flipV: boolean;
  topText: string;
  bottomText: string;
  watermarkText: string;
  width: number | null;
  height: number | null;
}

const QUALITY_PRESETS = [
  { id: 'low', name: 'Low (32 colors)', desc: 'Ultra-small size, dithered palette.' },
  { id: 'medium', name: 'Medium (64 colors)', desc: 'Balanced compression and color depth.' },
  { id: 'high', name: 'High (128 colors)', desc: 'Excellent rendering depth for web graphics.' },
  { id: 'max', name: 'Max (256 colors)', desc: 'True color representation (GIF limit).' }
];

const SOCIAL_PRESETS = [
  { id: 'discord-emoji', name: 'Discord Emoji', width: 128, height: 128, ratio: '1:1' },
  { id: 'slack-emoji', name: 'Slack Reaction', width: 128, height: 128, ratio: '1:1' },
  { id: 'insta-square', name: 'Instagram Square', width: 1080, height: 1080, ratio: '1:1' },
  { id: 'fb-post', name: 'Facebook Post', width: 1200, height: 630, ratio: '1.91:1' },
  { id: 'twitter-post', name: 'Twitter/X Post', width: 1200, height: 675, ratio: '16:9' },
  { id: 'reddit-banner', name: 'Reddit Banner', width: 1920, height: 384, ratio: '5:1' }
];

export function ConvertToGifTool() {
  const { resolvedTheme } = useTheme();

  // Timeline & active frame states
  const [timeline, setTimeline] = useState<FrameItem[]>([]);
  const [activeFrameId, setActiveFrameId] = useState<string | null>(null);

  // Global GIF Settings
  const [globalDelay, setGlobalDelay] = useState<number>(200); // ms per frame (5 FPS)
  const [loopCount, setLoopCount] = useState<number>(0); // 0 = infinite loop
  const [qualityLevel, setQualityLevel] = useState<string>('high');
  const [customColorCount, setCustomColorCount] = useState<number>(128);
  const [disposalMethod, setDisposalMethod] = useState<number>(2); // 2 = restore to background

  // Active Frame Editing tools
  const [frameDelay, setFrameDelay] = useState<number>(200);
  const [rotation, setRotation] = useState<number>(0);
  const [flipH, setFlipH] = useState<boolean>(false);
  const [flipV, setFlipV] = useState<boolean>(false);
  const [topText, setTopText] = useState<string>('');
  const [bottomText, setBottomText] = useState<string>('');
  const [watermarkText, setWatermarkText] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(24);

  // Playback States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1); // 0.5x, 1x, 2x etc.

  // UI state
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Generated GIF outcome
  const [generatedGifUrl, setGeneratedGifUrl] = useState<string | null>(null);
  const [generatedGifSize, setGeneratedGifSize] = useState<number | null>(null);

  // Saved configs & history
  const [savedPresets, setSavedPresets] = useState<{ id: string; name: string; settings: any }[]>([]);
  const [newPresetName, setNewPresetName] = useState<string>('');
  const [showPresetModal, setShowPresetModal] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  // Retrieve active frame
  const activeFrame = useMemo(() => {
    return timeline.find(f => f.id === activeFrameId) || null;
  }, [timeline, activeFrameId]);

  // Load saved presets from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('calc_hub_convert_to_gif_presets');
    if (saved) {
      try {
        setSavedPresets(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Update editing panel when active frame changes
  useEffect(() => {
    if (activeFrame) {
      setFrameDelay(activeFrame.delay);
      setRotation(activeFrame.rotation);
      setFlipH(activeFrame.flipH);
      setFlipV(activeFrame.flipV);
      setTopText(activeFrame.topText);
      setBottomText(activeFrame.bottomText);
      setWatermarkText(activeFrame.watermarkText);
    }
  }, [activeFrameId, activeFrame]);

  // Handle live edits to active frame
  const updateActiveFrameSettings = useCallback((updates: Partial<FrameItem>) => {
    if (!activeFrameId) return;
    setTimeline(prev => prev.map(f => f.id === activeFrameId ? { ...f, ...updates } : f));
  }, [activeFrameId]);

  // Frame loading helper
  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const newList: FrameItem[] = [];
    setErrorMsg(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const nameLower = file.name.toLowerCase();
      const isHeic = nameLower.endsWith('.heic');
      const allowed = ['.png', '.jpg', '.jpeg', '.webp', '.bmp', '.avif', '.gif'];
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

      if (!allowed.includes(ext) && !isHeic) {
        setErrorMsg("Unsupported image type. Please upload PNG, JPG, WEBP, BMP, AVIF, or HEIC files.");
        continue;
      }

      if (file.size > 15 * 1024 * 1024) {
        setErrorMsg("Large photos over 15MB will consume significant browser memory during animation.");
      }

      const id = `frame-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const url = URL.createObjectURL(file);

      newList.push({
        id,
        file,
        name: file.name,
        size: file.size,
        originalUrl: url,
        delay: globalDelay,
        rotation: 0,
        flipH: false,
        flipV: false,
        topText: '',
        bottomText: '',
        watermarkText: '',
        width: null,
        height: null
      });
    }

    if (newList.length > 0) {
      setTimeline(prev => [...prev, ...newList]);
      if (!activeFrameId) {
        setActiveFrameId(newList[0].id);
      }
    }
  }, [activeFrameId, globalDelay]);

  // Paste handler
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      if (e.clipboardData && e.clipboardData.files.length > 0) {
        handleFiles(e.clipboardData.files);
      }
    };
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handleFiles]);

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

  // Timeline operations
  const removeFrame = (id: string) => {
    setTimeline(prev => {
      const item = prev.find(f => f.id === id);
      if (item) URL.revokeObjectURL(item.originalUrl);
      return prev.filter(f => f.id !== id);
    });
    if (activeFrameId === id) {
      setActiveFrameId(null);
    }
  };

  const duplicateFrame = (frame: FrameItem) => {
    const id = `frame-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const copy = {
      ...frame,
      id,
      name: `${frame.name.substring(0, frame.name.lastIndexOf('.')) || frame.name}-copy`
    };
    setTimeline(prev => {
      const idx = prev.findIndex(f => f.id === frame.id);
      const updated = [...prev];
      updated.splice(idx + 1, 0, copy);
      return updated;
    });
  };

  const moveFrame = (index: number, direction: 'left' | 'right') => {
    if (direction === 'left' && index === 0) return;
    if (direction === 'right' && index === timeline.length - 1) return;

    const targetIdx = direction === 'left' ? index - 1 : index + 1;
    setTimeline(prev => {
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[targetIdx];
      updated[targetIdx] = temp;
      return updated;
    });
  };

  const clearTimeline = () => {
    timeline.forEach(f => URL.revokeObjectURL(f.originalUrl));
    setTimeline([]);
    setActiveFrameId(null);
    setGeneratedGifUrl(null);
    setGeneratedGifSize(null);
  };

  // Synchronize global delay to all frames
  const applyGlobalDelay = () => {
    setTimeline(prev => prev.map(f => ({ ...f, delay: globalDelay })));
    setSuccessMsg(`Applied delay of ${globalDelay}ms globally to all frames.`);
  };

  // Custom quality palette configurations
  const colorCountSetting = useMemo(() => {
    switch (qualityLevel) {
      case 'low': return 32;
      case 'medium': return 64;
      case 'high': return 128;
      case 'max': return 256;
      default: return customColorCount;
    }
  }, [qualityLevel, customColorCount]);

  // Timeline Preview Renderer Loop
  useEffect(() => {
    if (!isPlaying || timeline.length === 0) return;
    let timerId: any;

    const runPlay = () => {
      const activeFrameItem = timeline[currentFrameIndex];
      const currentDelay = (activeFrameItem?.delay || globalDelay) / speedMultiplier;
      timerId = setTimeout(() => {
        setCurrentFrameIndex(prev => (prev + 1) % timeline.length);
      }, currentDelay);
    };

    runPlay();
    return () => clearTimeout(timerId);
  }, [isPlaying, currentFrameIndex, timeline, globalDelay, speedMultiplier]);

  // Draw frame on canvas with all edits (rotation, flip, meme text, watermark text)
  const drawFrameToCanvas = useCallback((frame: FrameItem, canvas: HTMLCanvasElement): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error("Could not initialize 2D context"));
        return;
      }

      let srcUrl = frame.originalUrl;

      // Handle HEIC dynamic decoding
      if (frame.name.toLowerCase().endsWith('.heic') && frame.file) {
        try {
          const heic2any = (await import('heic2any')).default;
          const decodedBlob = await heic2any({
            blob: frame.file,
            toType: 'image/png'
          });
          const finalBlob = Array.isArray(decodedBlob) ? decodedBlob[0] : decodedBlob;
          srcUrl = URL.createObjectURL(finalBlob);
        } catch (e) {
          reject(e);
          return;
        }
      }

      const img = new Image();
      img.src = srcUrl;
      img.onload = () => {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        ctx.save();
        // Move to center to rotate/flip
        ctx.translate(canvas.width / 2, canvas.height / 2);
        
        // Handle rotation
        if (frame.rotation > 0) {
          ctx.rotate((frame.rotation * Math.PI) / 180);
        }

        // Handle flip
        const scaleX = frame.flipH ? -1 : 1;
        const scaleY = frame.flipV ? -1 : 1;
        ctx.scale(scaleX, scaleY);

        // Draw image centered
        ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        ctx.restore();

        // Draw meme captions
        ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.textAlign = 'center';

        if (frame.topText) {
          ctx.textBaseline = 'top';
          ctx.strokeText(frame.topText.toUpperCase(), canvas.width / 2, 10);
          ctx.fillText(frame.topText.toUpperCase(), canvas.width / 2, 10);
        }

        if (frame.bottomText) {
          ctx.textBaseline = 'bottom';
          ctx.strokeText(frame.bottomText.toUpperCase(), canvas.width / 2, canvas.height - 10);
          ctx.fillText(frame.bottomText.toUpperCase(), canvas.width / 2, canvas.height - 10);
        }

        // Draw watermark
        if (frame.watermarkText) {
          ctx.font = 'bold 12px Arial, sans-serif';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.textAlign = 'right';
          ctx.textBaseline = 'bottom';
          ctx.fillText(frame.watermarkText, canvas.width - 10, canvas.height - 10);
        }

        resolve();
      };
      img.onerror = reject;
    });
  }, [fontSize]);

  // Sync canvas drawing on preview change
  useEffect(() => {
    if (timeline.length === 0) return;
    const canvas = previewCanvasRef.current;
    if (!canvas) return;

    const currentFrameItem = timeline[currentFrameIndex];
    if (!currentFrameItem) return;

    // Set canvas dimensions
    canvas.width = 400;
    canvas.height = 300;

    drawFrameToCanvas(currentFrameItem, canvas).catch(console.error);
  }, [currentFrameIndex, timeline, drawFrameToCanvas]);

  // Compile active timeline frames into animated GIF
  const compileGif = async () => {
    if (timeline.length === 0) return;
    setIsProcessing(true);
    setProgress(0);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      // Determine canvas base size matching first frame
      const firstFrame = timeline[0];
      const img = new Image();
      img.src = firstFrame.originalUrl;
      await new Promise(r => img.onload = r);

      let w = img.naturalWidth || 400;
      let h = img.naturalHeight || 300;

      // Downscale if size is extremely large to preserve memory
      if (w > 800 || h > 800) {
        const factor = 800 / Math.max(w, h);
        w = Math.round(w * factor);
        h = Math.round(h * factor);
      }

      // Initialize LZW Encoder
      const encoder = GIFEncoder({ auto: true });

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error("Could not initialize 2D context");

      const totalFrames = timeline.length;
      for (let i = 0; i < totalFrames; i++) {
        setProgress(Math.round((i / totalFrames) * 90));
        await new Promise(r => setTimeout(r, 10)); // Yield to UI thread

        const frame = timeline[i];
        // Draw frame with edit layouts
        await drawFrameToCanvas(frame, canvas);

        // Quantize colors for frame palette
        const imgData = ctx.getImageData(0, 0, w, h);
        const palette = quantize(imgData.data, colorCountSetting, {
          format: 'rgb565',
          oneBitAlpha: true
        });

        // Convert RGBA into indexed palette representation
        const indices = applyPalette(imgData.data, palette, 'rgb565');

        // Write frame to stream
        encoder.writeFrame(indices, w, h, {
          palette,
          delay: frame.delay,
          repeat: loopCount,
          dispose: disposalMethod,
          first: i === 0
        });
      }

      setProgress(95);
      await new Promise(r => setTimeout(r, 0));
      encoder.finish();

      // Export Blob URL
      const bytes = encoder.bytes();
      const blob = new Blob([bytes], { type: 'image/gif' });
      const url = URL.createObjectURL(blob);
      setGeneratedGifUrl(url);
      setGeneratedGifSize(blob.size);
      setProgress(100);
      setSuccessMsg("GIF compiled successfully!");
    } catch (e: any) {
      console.error(e);
      setErrorMsg(e.message || "Failed to compile animated GIF.");
    } finally {
      setIsProcessing(false);
    }
  };

  // ZIP export
  const exportAsZip = async () => {
    if (timeline.length === 0) return;
    try {
      const zip = new JSZip();
      for (let i = 0; i < timeline.length; i++) {
        const frame = timeline[i];
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 300;
        await drawFrameToCanvas(frame, canvas);
        
        const blob = await new Promise<Blob | null>(r => canvas.toBlob(r, 'image/png'));
        if (blob) {
          const base = frame.name.substring(0, frame.name.lastIndexOf('.')) || frame.name;
          zip.file(`${i + 1}-${base}.png`, blob);
        }
      }
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = `gif-timeline-frames-${Date.now()}.zip`;
      link.click();
      URL.revokeObjectURL(link.href);
      setSuccessMsg("Batch exported timeline frames successfully!");
    } catch (e) {
      setErrorMsg("Failed to generate ZIP archive.");
    }
  };

  // Social resizer presets mapping
  const applySocialCrop = (preset: typeof SOCIAL_PRESETS[0]) => {
    setTimeline(prev => prev.map(f => ({ ...f, width: preset.width, height: preset.height })));
    setSuccessMsg(`Resized frames to match ${preset.name} (${preset.width}x${preset.height}).`);
  };

  // Presets profiles management (localStorage)
  const saveCustomSettings = () => {
    if (!newPresetName.trim()) return;
    const item = {
      id: `preset-${Date.now()}`,
      name: newPresetName.trim(),
      settings: {
        globalDelay,
        loopCount,
        qualityLevel,
        customColorCount,
        disposalMethod
      }
    };
    const updated = [...savedPresets, item];
    setSavedPresets(updated);
    localStorage.setItem('calc_hub_convert_to_gif_presets', JSON.stringify(updated));
    setNewPresetName('');
    setShowPresetModal(false);
    setSuccessMsg("Preset configurations saved successfully!");
  };

  const loadPreset = (preset: any) => {
    const s = preset.settings;
    setGlobalDelay(s.globalDelay);
    setLoopCount(s.loopCount);
    setQualityLevel(s.qualityLevel);
    setCustomColorCount(s.customColorCount);
    setDisposalMethod(s.disposalMethod);
    setSuccessMsg(`Loaded settings profile: ${preset.name}`);
  };

  const deletePreset = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedPresets.filter(p => p.id !== id);
    setSavedPresets(updated);
    localStorage.setItem('calc_hub_convert_to_gif_presets', JSON.stringify(updated));
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-6 px-4">
      <div className="max-w-[1500px] mx-auto flex flex-col gap-6">

        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <Sparkles className="text-[#518231]" />
              Convert to GIF <span className="text-sm font-semibold py-0.5 px-2 bg-[#518231]/20 text-[#518231] rounded-full">In-Browser Studio</span>
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Create animated GIFs, custom slideshows, and memes from photos completely client-side.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowPresetModal(true)}
              className="flex items-center gap-1.5 py-2 px-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-semibold transition-all shadow-sm"
            >
              <Save size={16} />
              Save Presets
            </button>
            {timeline.length > 0 && (
              <button
                onClick={clearTimeline}
                className="flex items-center gap-1.5 py-2 px-3 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/20 dark:hover:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-lg text-sm font-semibold transition-all"
              >
                <Trash2 size={16} />
                Clear Studio
              </button>
            )}
          </div>
        </div>

        {/* Success/Error Alerts */}
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

        {/* Workspace Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">

          {/* Left Column: GIF Encoder Settings & Filters (4 cols) */}
          <div className="xl:col-span-4 flex flex-col gap-6">

            {/* Global Settings */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
              <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                <Settings size={16} className="text-[#518231]" />
                Global Animation Settings
              </h2>

              <div className="flex flex-col gap-4">

                {/* Delay */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Frame Delay (Speed)</span>
                    <span className="text-[#518231] font-bold">{globalDelay} ms</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="3000"
                    step="10"
                    value={globalDelay}
                    onChange={(e) => setGlobalDelay(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                  />
                  <button
                    onClick={applyGlobalDelay}
                    className="mt-1.5 w-full text-[10px] font-bold py-1 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-slate-500 dark:text-slate-400"
                  >
                    Apply Delay to All Active Frames
                  </button>
                </div>

                {/* Loop Count */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Loop repeat</label>
                  <select
                    value={loopCount}
                    onChange={(e) => setLoopCount(Number(e.target.value))}
                    className="w-full text-xs py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none"
                  >
                    <option value={0}>Infinite Loop (Standard)</option>
                    <option value={1}>Play 1 Time</option>
                    <option value={2}>Play 2 Times</option>
                    <option value={5}>Play 5 Times</option>
                  </select>
                </div>

                {/* Quality presets */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Color Palette Quality</label>
                  <div className="grid grid-cols-4 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                    {(['low', 'medium', 'high', 'max'] as const).map((level) => (
                      <button
                        key={level}
                        onClick={() => setQualityLevel(level)}
                        className={`py-1.5 text-xs font-bold capitalize rounded-md transition-all ${
                          qualityLevel === level 
                            ? 'bg-white dark:bg-slate-900 text-[#518231] shadow-sm' 
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Disposal Method */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Frame Disposal Method</label>
                  <select
                    value={disposalMethod}
                    onChange={(e) => setDisposalMethod(Number(e.target.value))}
                    className="w-full text-xs py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none"
                  >
                    <option value={1}>Keep Previous (Do Not Dispose)</option>
                    <option value={2}>Clear Canvas (Restore Background)</option>
                    <option value={3}>Restore Previous state</option>
                  </select>
                </div>

                {/* Preset List Selection */}
                {savedPresets.length > 0 && (
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Settings Profiles</label>
                    <div className="flex flex-wrap gap-2">
                      {savedPresets.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => loadPreset(p)}
                          className="flex items-center gap-1 py-1 px-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-[10px] font-semibold rounded"
                        >
                          {p.name}
                          <span onClick={(e) => deletePreset(p.id, e)} className="text-slate-400 hover:text-red-500 font-bold ml-1.5 text-xs">×</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Active Frame Editing */}
            {activeFrame && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col gap-4">
                <h2 className="text-base font-bold flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Edit3 size={16} className="text-[#518231]" />
                  Edit Frame ({timeline.indexOf(activeFrame) + 1}) Settings
                </h2>

                {/* Rotate & Flip */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Transform Filters</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => updateActiveFrameSettings({ rotation: (rotation + 90) % 360 })}
                      className="py-1.5 px-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold rounded-lg flex items-center justify-center gap-1"
                    >
                      <RefreshCw size={12} /> Rotate 90°
                    </button>
                    <button
                      onClick={() => updateActiveFrameSettings({ flipH: !flipH })}
                      className={`py-1.5 px-3 border text-xs font-semibold rounded-lg flex items-center justify-center gap-1 ${
                        flipH ? 'border-[#518231] bg-[#518231]/5' : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      Flip Horiz
                    </button>
                  </div>
                </div>

                {/* Meme Caption text */}
                <div className="flex flex-col gap-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Meme text Captions</label>
                  <input
                    type="text"
                    placeholder="Top caption text"
                    value={topText}
                    onChange={(e) => updateActiveFrameSettings({ topText: e.target.value })}
                    className="w-full text-xs py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Bottom caption text"
                    value={bottomText}
                    onChange={(e) => updateActiveFrameSettings({ bottomText: e.target.value })}
                    className="w-full text-xs py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none"
                  />
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Meme Font Size</span>
                    <span>{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="48"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                  />
                </div>

                {/* Watermark text */}
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Watermark overlay</label>
                  <input
                    type="text"
                    placeholder="e.g. copyright mark"
                    value={watermarkText}
                    onChange={(e) => updateActiveFrameSettings({ watermarkText: e.target.value })}
                    className="w-full text-xs py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none"
                  />
                </div>

                {/* Custom frame delay */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span>Frame Specific Delay</span>
                    <span>{frameDelay} ms</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="3000"
                    step="10"
                    value={frameDelay}
                    onChange={(e) => {
                      setFrameDelay(Number(e.target.value));
                      updateActiveFrameSettings({ delay: Number(e.target.value) });
                    }}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                  />
                </div>

              </div>
            )}

            {/* Offline Shield */}
            <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex gap-3 items-center">
              <ShieldCheck className="text-[#518231] shrink-0" size={20} />
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5">Secure In-Browser Compiling</span>
                Processing runs entirely on local canvas rendering contexts in your browser. No files are uploaded to our servers.
              </div>
            </div>

          </div>

          {/* Right Column: Timeline & Playback (8 cols) */}
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
                <p className="font-bold text-sm">Drag & Drop photos here, paste, or browse files</p>
                <p className="text-xs text-slate-400 mt-1">Supports PNG, JPG, JPEG, WEBP, BMP, AVIF, HEIC, and GIFs (Max 15MB/frame)</p>
              </div>
            </div>

            {/* Playback Canvas and Compiler */}
            {timeline.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
                
                {/* Visual Canvas (7 cols) */}
                <div className="md:col-span-7 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Timeline Preview Console</span>
                    <span className="text-[10px] py-0.5 px-2 bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold rounded-full">
                      Frame {currentFrameIndex + 1} of {timeline.length}
                    </span>
                  </div>

                  <div className="h-[300px] border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center relative">
                    <canvas ref={previewCanvasRef} className="max-h-full max-w-full object-contain" />
                  </div>

                  {/* Playback controls */}
                  <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentFrameIndex(prev => (prev - 1 + timeline.length) % timeline.length)}
                        className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md"
                      >
                        <SkipBack size={16} />
                      </button>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="p-2.5 bg-[#518231] hover:bg-[#436a28] text-white rounded-full transition-all shadow active:scale-[0.98]"
                      >
                        {isPlaying ? <Pause size={18} strokeWidth={2.5} /> : <Play size={18} strokeWidth={2.5} />}
                      </button>
                      <button
                        onClick={() => setCurrentFrameIndex(prev => (prev + 1) % timeline.length)}
                        className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md"
                      >
                        <SkipForward size={16} />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-slate-400">SPEED:</span>
                      <div className="flex gap-1">
                        {([0.5, 1, 2] as const).map(speed => (
                          <button
                            key={speed}
                            onClick={() => setSpeedMultiplier(speed)}
                            className={`py-0.5 px-2 text-[10px] font-bold rounded transition-all ${
                              speedMultiplier === speed 
                                ? 'bg-[#518231] text-white' 
                                : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700'
                            }`}
                          >
                            {speed}x
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compiler Controls (5 cols) */}
                <div className="md:col-span-5 flex flex-col justify-between gap-5 border-t md:border-t-0 md:border-l border-slate-100 dark:border-slate-800 pt-5 md:pt-0 md:pl-5">
                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-sm flex items-center gap-1.5">
                      <PlayCircle size={16} />
                      Export animated GIF
                    </h3>

                    {/* Social templates shortcuts */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">Social Resizer presets</label>
                      <div className="flex flex-wrap gap-1.5">
                        {SOCIAL_PRESETS.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => applySocialCrop(p)}
                            className="py-1 px-2 border border-slate-200 dark:border-slate-800 hover:border-[#518231] rounded text-[10px] font-semibold transition-all"
                          >
                            {p.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Compilation progress indicator */}
                    {isProcessing && (
                      <div className="flex flex-col gap-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span>Quantizing & compressing frames...</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-[#518231] h-full transition-all" style={{ width: `${progress}%` }}></div>
                        </div>
                      </div>
                    )}

                    {generatedGifUrl && (
                      <div className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-4 rounded-xl flex flex-col gap-2.5 text-xs">
                        <span className="font-bold text-slate-400 block uppercase tracking-wider text-[10px]">GIF Outcome Analysis</span>
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-slate-400 block mb-0.5">File Size</span>
                            <span className="font-bold">{(generatedGifSize! / (1024 * 1024)).toFixed(2)} MB</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block mb-0.5">Estimated Download (4G)</span>
                            <span className="font-bold">{((generatedGifSize! * 8) / (15 * 1000 * 1000)).toFixed(2)}s</span>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = generatedGifUrl!;
                            link.download = `animation-${Date.now()}.gif`;
                            link.click();
                          }}
                          className="mt-2 w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-[#518231] hover:bg-[#436a28] text-white font-bold rounded-lg shadow-sm transition-all"
                        >
                          <Download size={14} />
                          Download GIF File
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      disabled={isProcessing}
                      onClick={compileGif}
                      className="w-full py-3 px-4 bg-[#518231] hover:bg-[#436a28] text-white font-bold rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <PlayCircle size={18} />
                      Compile & Render GIF
                    </button>
                    
                    <button
                      onClick={exportAsZip}
                      className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <FileDown size={14} />
                      Export Frames as ZIP
                    </button>
                  </div>

                </div>

              </div>
            )}

            {/* Horizontal Timeline Bar */}
            {timeline.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col gap-3">
                <h3 className="text-sm font-bold flex items-center gap-1.5 border-b border-slate-100 dark:border-slate-800 pb-2">
                  <Layers size={16} />
                  Frames Timeline ({timeline.length} frames)
                </h3>

                <div className="flex gap-4 overflow-x-auto py-2 custom-scrollbar scroll-smooth">
                  {timeline.map((frame, index) => (
                    <div
                      key={frame.id}
                      onClick={() => {
                        setActiveFrameId(frame.id);
                        setCurrentFrameIndex(index);
                      }}
                      className={`w-28 flex-shrink-0 flex flex-col gap-2 p-2 border rounded-lg transition-all relative cursor-pointer ${
                        activeFrameId === frame.id 
                          ? 'border-[#518231] bg-[#518231]/5' 
                          : 'border-slate-100 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      {/* Frame index indicator */}
                      <span className="absolute top-1 left-1 z-10 text-[9px] font-bold w-4 h-4 rounded-full bg-slate-900/80 text-white flex items-center justify-center">
                        {index + 1}
                      </span>

                      {/* Thumbnail */}
                      <div className="h-16 rounded overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200/50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={frame.originalUrl} alt="frame thumb" className="object-cover w-full h-full" />
                      </div>

                      {/* Text descriptions */}
                      <div className="min-w-0 flex flex-col gap-0.5 text-[10px]">
                        <span className="font-bold truncate text-slate-700 dark:text-slate-300">{frame.name}</span>
                        <span className="text-slate-400">{frame.delay}ms</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex gap-0.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              moveFrame(index, 'left');
                            }}
                            disabled={index === 0}
                            className="p-1 bg-slate-100 dark:bg-slate-800 disabled:opacity-30 rounded"
                          >
                            <ChevronLeft size={10} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              moveFrame(index, 'right');
                            }}
                            disabled={index === timeline.length - 1}
                            className="p-1 bg-slate-100 dark:bg-slate-800 disabled:opacity-30 rounded"
                          >
                            <ChevronRight size={10} />
                          </button>
                        </div>

                        <div className="flex gap-0.5">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              duplicateFrame(frame);
                            }}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-[#518231]"
                          >
                            <CopyPlus size={10} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFrame(frame.id);
                            }}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-400 hover:text-red-500"
                          >
                            <X size={10} />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Preset Custom Name Modal */}
      {showPresetModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-2xl max-w-sm w-full flex flex-col gap-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-base">Save Settings Preset</h3>
              <button onClick={() => setShowPresetModal(false)} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <div>
              <label className="text-xs text-slate-400 font-bold block mb-1">Preset Profile Name</label>
              <input
                type="text"
                placeholder="e.g. 5FPS Slideshow (Slow)"
                value={newPresetName}
                onChange={(e) => setNewPresetName(e.target.value)}
                className="w-full text-xs py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none focus:border-[#518231]"
              />
            </div>
            <button
              onClick={saveCustomSettings}
              className="py-2.5 px-4 bg-[#518231] hover:bg-[#436a28] text-white text-xs font-bold rounded-xl shadow-md transition-all flex justify-center"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
