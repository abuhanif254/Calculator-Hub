"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Upload, Trash2, Download, Sliders, Eye, EyeOff, 
  CheckCircle2, AlertCircle, Loader2, Sparkles, Plus, X, 
  ShieldCheck, Info, FileImage, FileDown, Check, Play, Settings,
  Lock, Copy, ChevronDown, ChevronRight, Code, Layers,
  Compass, Monitor, Phone, Tablet, Laptop, Smartphone,
  Bookmark, Layout, Palette, FileText, DownloadCloud, Grid
} from "lucide-react";
import { useTheme } from 'next-themes';
import JSZip from 'jszip';

interface QueueItem {
  id: string;
  file?: File;
  name: string;
  size: number;
  originalUrl: string;
  imgElement: HTMLImageElement | null;
  status: 'idle' | 'generating' | 'success' | 'error';
  width: number | null;
  height: number | null;
  transparency: boolean;
  qualityScore: number;
}

interface FaviconAsset {
  name: string;
  size: number;
  desc: string;
  category: 'favicon' | 'apple' | 'android';
  blob: Blob | null;
  url: string | null;
}

export function FaviconGeneratorTool() {
  const { resolvedTheme } = useTheme();

  // Queue state
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // Icon Customization Options
  const [padding, setPadding] = useState<number>(30); // 0 to 100 px
  const [borderRadius, setBorderRadius] = useState<number>(64); // 0 to 256 px
  const [zoom, setZoom] = useState<number>(1); // 0.1 to 3
  const [offsetX, setOffsetX] = useState<number>(0); // -250 to 250 px
  const [offsetY, setOffsetY] = useState<number>(0); // -250 to 250 px
  
  // Background Styling
  const [backgroundType, setBackgroundType] = useState<'transparent' | 'solid' | 'gradient'>('solid');
  const [solidColor, setSolidColor] = useState<string>('#518231');
  const [gradientColor1, setGradientColor1] = useState<string>('#518231');
  const [gradientColor2, setGradientColor2] = useState<string>('#3b5e24');
  
  // Shadow Styling
  const [shadowBlur, setShadowBlur] = useState<number>(10); // 0 to 50
  const [shadowColor, setShadowColor] = useState<string>('rgba(0, 0, 0, 0.2)');
  const [shadowOffset, setShadowOffset] = useState<number>(5); // 0 to 30

  // App / PWA Details
  const [appName, setAppName] = useState<string>('My Application');
  const [shortName, setShortName] = useState<string>('My App');
  const [pwaDisplay, setPwaDisplay] = useState<'standalone' | 'fullscreen' | 'minimal-ui' | 'browser'>('standalone');
  const [themeColor, setThemeColor] = useState<string>('#518231');
  const [pwaBgColor, setPwaBgColor] = useState<string>('#ffffff');

  // Preview / Tab UI
  const [previewTab, setPreviewTab] = useState<'tab' | 'bookmark' | 'apple' | 'android' | 'pwa'>('tab');
  const [codeTab, setCodeTab] = useState<'html' | 'nextjs' | 'manifest'>('html');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);

  // Generated Assets
  const [generatedAssets, setGeneratedAssets] = useState<FaviconAsset[]>([]);
  const [faviconIcoBlob, setFaviconIcoBlob] = useState<Blob | null>(null);
  const [faviconIcoUrl, setFaviconIcoUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Retrieve active item
  const activeItem = useMemo(() => {
    return queue.find(item => item.id === activeItemId) || null;
  }, [queue, activeItemId]);

  // Handle file loading
  const loadFiles = async (files: File[]) => {
    const newItems: QueueItem[] = [];
    
    for (const file of files) {
      const isImg = file.type.startsWith('image/') || file.name.endsWith('.svg');
      if (!isImg) {
        setErrorMsg(`Unsupported file format: ${file.name}. Please upload PNG, JPG, JPEG, SVG, or WEBP images.`);
        continue;
      }
      
      try {
        const originalUrl = URL.createObjectURL(file);
        
        // Load image to extract metrics
        const img = await new Promise<HTMLImageElement>((resolve, reject) => {
          const i = new Image();
          i.onload = () => resolve(i);
          i.onerror = () => reject(new Error("Failed to load image element"));
          i.src = originalUrl;
        });

        // Determine transparency by checking canvas pixels
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        let transparency = false;
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          try {
            const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            for (let i = 3; i < data.length; i += 4) {
              if (data[i] < 255) {
                transparency = true;
                break;
              }
            }
          } catch {
            // fallback if tainted
            transparency = file.type === 'image/svg+xml' || file.name.endsWith('.svg');
          }
        }

        // Calculate a basic quality score out of 100
        let score = 50;
        if (img.width >= 512 && img.height >= 512) score += 20;
        if (Math.abs(img.width - img.height) < 5) score += 20; // square is ideal
        if (file.type === 'image/svg+xml' || file.name.endsWith('.svg')) score += 10; // vector is excellent source

        const id = crypto.randomUUID();
        newItems.push({
          id,
          file,
          name: file.name,
          size: file.size,
          originalUrl,
          imgElement: img,
          status: 'idle',
          width: img.width,
          height: img.height,
          transparency,
          qualityScore: Math.min(100, score)
        });
      } catch (err: any) {
        setErrorMsg(`Failed to analyze logo file "${file.name}": ${err.message}`);
      }
    }

    if (newItems.length > 0) {
      setQueue(prev => [...prev, ...newItems]);
      setActiveItemId(newItems[0].id);
      setErrorMsg(null);
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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleManualUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      loadFiles(Array.from(e.target.files));
    }
  };

  // Redraw canvas preview in real time as sliders change
  const drawActiveIcon = (targetCanvas: HTMLCanvasElement, size: number) => {
    if (!activeItem || !activeItem.imgElement) return;

    const ctx = targetCanvas.getContext('2d');
    if (!ctx) return;

    targetCanvas.width = size;
    targetCanvas.height = size;
    ctx.clearRect(0, 0, size, size);

    const scale = size / 512;
    const r = borderRadius * scale;
    const p = padding * scale;

    ctx.save();

    // Corner Clip path
    if (borderRadius > 0) {
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.arcTo(size, 0, size, size, r);
      ctx.arcTo(size, size, 0, size, r);
      ctx.arcTo(0, size, 0, 0, r);
      ctx.arcTo(0, 0, size, 0, r);
      ctx.closePath();
      ctx.clip();
    }

    // Fill Background
    if (backgroundType === 'solid') {
      ctx.fillStyle = solidColor;
      ctx.fillRect(0, 0, size, size);
    } else if (backgroundType === 'gradient') {
      const grad = ctx.createLinearGradient(0, 0, size, size);
      grad.addColorStop(0, gradientColor1);
      grad.addColorStop(1, gradientColor2);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    }

    // Drop Shadow on the logo
    if (shadowBlur > 0 && activeItem.imgElement) {
      ctx.shadowColor = shadowColor;
      ctx.shadowBlur = shadowBlur * scale;
      ctx.shadowOffsetX = shadowOffset * scale;
      ctx.shadowOffsetY = shadowOffset * scale;
    }

    // Draw logo
    if (activeItem.imgElement) {
      const baseWidth = size - (p * 2);
      const baseHeight = size - (p * 2);
      
      const drawW = baseWidth * zoom;
      const drawH = baseHeight * zoom;
      
      const x = (size / 2) - (drawW / 2) + (offsetX * scale);
      const y = (size / 2) - (drawH / 2) + (offsetY * scale);

      ctx.drawImage(activeItem.imgElement, x, y, drawW, drawH);
    }

    ctx.restore();
  };

  // Update canvas preview when options change
  useEffect(() => {
    if (canvasRef.current && activeItem) {
      drawActiveIcon(canvasRef.current, 512);
    }
  }, [
    activeItemId, padding, borderRadius, zoom, offsetX, offsetY,
    backgroundType, solidColor, gradientColor1, gradientColor2,
    shadowBlur, shadowColor, shadowOffset
  ]);

  // Native ICO encoder: package multi-resolution PNG bytes
  const encodeIcoBytes = (pngBlobs: Blob[], sizes: number[]): Promise<Blob> => {
    return new Promise(async (resolve, reject) => {
      try {
        const buffers = await Promise.all(pngBlobs.map(b => b.arrayBuffer()));
        
        const numImages = pngBlobs.length;
        const headerSize = 6;
        const dirEntrySize = 16;
        const directorySize = numImages * dirEntrySize;
        const totalHeaderSize = headerSize + directorySize;
        
        let currentOffset = totalHeaderSize;
        const dirEntries: Uint8Array[] = [];
        const dataSegments: Uint8Array[] = [];
        
        for (let i = 0; i < numImages; i++) {
          const size = sizes[i];
          const data = new Uint8Array(buffers[i]);
          const dataSize = data.length;
          
          const entry = new Uint8Array(16);
          const view = new DataView(entry.buffer);
          
          view.setUint8(0, size >= 256 ? 0 : size); // Width
          view.setUint8(1, size >= 256 ? 0 : size); // Height
          view.setUint8(2, 0); // Colors
          view.setUint8(3, 0); // Reserved
          view.setUint16(4, 1, true); // Planes
          view.setUint16(6, 32, true); // BPP (32 bit)
          view.setUint32(8, dataSize, true); // Size of image data
          view.setUint32(12, currentOffset, true); // Offset of image data
          
          dirEntries.push(entry);
          dataSegments.push(data);
          
          currentOffset += dataSize;
        }
        
        // Write ICO Header
        const header = new Uint8Array(6);
        const headerView = new DataView(header.buffer);
        headerView.setUint16(0, 0, true);
        headerView.setUint16(2, 1, true); // 1 = ICO
        headerView.setUint16(4, numImages, true);
        
        // Merge into single byte stream
        const combined = new Uint8Array(currentOffset);
        combined.set(header, 0);
        
        let writeOffset = headerSize;
        for (let i = 0; i < numImages; i++) {
          combined.set(dirEntries[i], writeOffset);
          writeOffset += dirEntrySize;
        }
        
        for (let i = 0; i < numImages; i++) {
          combined.set(dataSegments[i], writeOffset);
          writeOffset += dataSegments[i].length;
        }
        
        resolve(new Blob([combined], { type: 'image/x-icon' }));
      } catch (err) {
        reject(err);
      }
    });
  };

  // Compile full set of PNGs and generate favicon.ico binary
  const handleGenerateFavicons = async () => {
    if (!activeItem) return;
    setIsProcessing(true);
    setErrorMsg(null);

    // Clean previous URLs to free up browser cache memory
    generatedAssets.forEach(a => { if (a.url) URL.revokeObjectURL(a.url); });
    if (faviconIcoUrl) URL.revokeObjectURL(faviconIcoUrl);

    try {
      const sizes = [16, 32, 48, 64, 96, 128, 152, 180, 192, 256, 512];
      const assets: FaviconAsset[] = [];
      const icoBlobs: Blob[] = [];
      const icoSizes: number[] = [];

      for (const size of sizes) {
        const offCanvas = document.createElement('canvas');
        drawActiveIcon(offCanvas, size);
        
        const blob = await new Promise<Blob>((resolve, reject) => {
          offCanvas.toBlob(b => b ? resolve(b) : reject(new Error("Canvas toBlob failed")), 'image/png');
        });

        const url = URL.createObjectURL(blob);
        
        let category: 'favicon' | 'apple' | 'android' = 'favicon';
        let desc = `Favicon sizing ${size}x${size} PNG`;
        let name = `favicon-${size}x${size}.png`;

        if (size === 192) {
          category = 'android';
          name = 'android-chrome-192x192.png';
          desc = 'Android Chrome app launcher icon';
        } else if (size === 512) {
          category = 'android';
          name = 'android-chrome-512x512.png';
          desc = 'Android Chrome app launcher and splash screen icon';
        } else if (size === 180) {
          category = 'apple';
          name = 'apple-touch-icon.png';
          desc = 'Apple touch icon for iPhone Home Screen';
        } else if (size === 152) {
          category = 'apple';
          name = 'apple-touch-icon-152x152.png';
          desc = 'Apple touch icon for iPad devices';
        }

        assets.push({ name, size, desc, category, blob, url });

        // Select specific sizes to build the favicon.ico package
        if (size === 16 || size === 32 || size === 48) {
          icoBlobs.push(blob);
          icoSizes.push(size);
        }
      }

      // Generate multi-resolution ICO binary
      const icoBlob = await encodeIcoBytes(icoBlobs, icoSizes);
      const icoUrl = URL.createObjectURL(icoBlob);
      
      setFaviconIcoBlob(icoBlob);
      setFaviconIcoUrl(icoUrl);
      setGeneratedAssets(assets);

      setQueue(prev => prev.map(q => q.id === activeItemId ? { ...q, status: 'success' } : q));
      setSuccessMsg("Favicons successfully rendered and generated locally.");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err: any) {
      setErrorMsg(`Generation failed: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Compile ZIP bundle export containing manifest and images
  const handleDownloadZipPackage = async () => {
    if (generatedAssets.length === 0 || !faviconIcoBlob) return;
    
    const zip = new JSZip();
    
    // Add favicon.ico
    zip.file('favicon.ico', faviconIcoBlob);
    
    // Add PNG icons
    generatedAssets.forEach(asset => {
      if (asset.blob) {
        zip.file(asset.name, asset.blob);
      }
    });

    // Add manifest.webmanifest
    const manifestJson = {
      name: appName,
      short_name: shortName,
      start_url: "/",
      display: pwaDisplay,
      background_color: pwaBgColor,
      theme_color: themeColor,
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    };

    zip.file('site.webmanifest', JSON.stringify(manifestJson, null, 2));

    try {
      const content = await zip.generateAsync({ type: "blob" });
      const zipUrl = URL.createObjectURL(content);
      
      const a = document.createElement('a');
      a.href = zipUrl;
      a.download = "favicon_package.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(zipUrl);
    } catch (err: any) {
      setErrorMsg(`ZIP compression failed: ${err.message}`);
    }
  };

  // Copy helper
  const copySnippet = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccessMsg("Code snippet copied to clipboard.");
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  // Code templates
  const htmlCodeSnippet = useMemo(() => {
    return `<!-- Generic Favicon Headers -->\n<link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">\n<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">\n<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">\n\n<!-- Apple iOS Touch Icons -->\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">\n<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">\n\n<!-- PWA Web App Manifest -->\n<link rel="manifest" href="/site.webmanifest">\n<meta name="theme-color" content="${themeColor}">`;
  }, [themeColor]);

  const nextJsCodeSnippet = useMemo(() => {
    return `// Place in app/layout.tsx under metadata configuration\nimport { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  title: '${appName}',\n  description: 'App configured with multi-resolution favicons.',\n  icons: {\n    icon: [\n      { url: '/favicon.ico', sizes: 'any' },\n      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },\n      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },\n    ],\n    apple: [\n      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },\n    ],\n  },\n  manifest: '/site.webmanifest',\n};`;
  }, [appName]);

  const manifestCodeSnippet = useMemo(() => {
    return JSON.stringify({
      name: appName,
      short_name: shortName,
      start_url: "/",
      display: pwaDisplay,
      background_color: pwaBgColor,
      theme_color: themeColor,
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    }, null, 2);
  }, [appName, shortName, pwaDisplay, pwaBgColor, themeColor]);

  // Remove queue item
  const removeQueueItem = (id: string) => {
    const item = queue.find(q => q.id === id);
    if (item && item.originalUrl) {
      URL.revokeObjectURL(item.originalUrl);
    }
    setQueue(prev => prev.filter(q => q.id !== id));
    if (activeItemId === id) {
      const remaining = queue.filter(q => q.id !== id);
      setActiveItemId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  // Clear queue
  const clearAllQueue = () => {
    queue.forEach(q => URL.revokeObjectURL(q.originalUrl));
    setQueue([]);
    setActiveItemId(null);
    setGeneratedAssets([]);
    if (faviconIcoUrl) URL.revokeObjectURL(faviconIcoUrl);
    setFaviconIcoBlob(null);
    setFaviconIcoUrl(null);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Top Controls bar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm"
          >
            <Upload size={16} /> Upload Logo
          </button>
          <input
            type="file"
            multiple
            accept="image/png,image/jpeg,image/svg+xml,image/webp"
            ref={fileInputRef}
            onChange={handleManualUpload}
            className="hidden"
          />

          {queue.length > 0 && (
            <button
              onClick={clearAllQueue}
              className="px-4 py-2 text-red-650 hover:bg-red-50 dark:hover:bg-red-950/20 border border-transparent hover:border-red-200 dark:hover:border-red-900/50 rounded-lg text-sm transition-colors flex items-center gap-2"
            >
              <Trash2 size={16} /> Reset Studio
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold text-[#518231] mr-2">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 100% Offline</span>
          <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> No Uploads</span>
        </div>
      </div>

      {/* Notifications */}
      {errorMsg && (
        <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h5 className="text-sm font-bold text-red-900 dark:text-red-300">Format Error</h5>
            <p className="text-xs text-red-700 dark:text-red-400 mt-1">{errorMsg}</p>
          </div>
          <button onClick={() => setErrorMsg(null)} className="text-red-450 hover:text-red-650">
            <X size={16} />
          </button>
        </div>
      )}

      {successMsg && (
        <div className="bg-green-50 dark:bg-green-950/10 border-l-4 border-green-500 p-4 rounded-r-xl flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h5 className="text-sm font-bold text-green-900 dark:text-green-300">Action Successful</h5>
            <p className="text-xs text-green-700 dark:text-green-400 mt-0.5">{successMsg}</p>
          </div>
          <button onClick={() => setSuccessMsg(null)} className="text-green-450 hover:text-green-650">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Upload Dropzone */}
      {queue.length === 0 ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-16 transition-all min-h-[450px] ${dragActive ? 'border-[#518231] bg-[#518231]/5' : 'border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900'}`}
        >
          <div className="p-5 bg-slate-50 dark:bg-slate-800 rounded-full mb-6 border border-slate-200 dark:border-slate-700 shadow-inner">
            <FileImage size={48} className="text-[#518231] animate-pulse" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Favicon & Website Icon Generator</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md mb-8">
            Upload your PNG, JPG, WEBP, or SVG logo. We will scale, render, and package favicon packages entirely inside your web browser.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-[#518231] hover:bg-[#436a28] text-white font-semibold rounded-xl shadow-md transition-colors flex items-center gap-2 text-sm"
            >
              <Upload size={18} /> Select Logo File
            </button>
            <button
              onClick={() => {
                // Initialize placeholder SVG to let them test the generator
                const sampleSvg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">\n  <rect width="100" height="100" fill="#da532c" rx="20"/>\n  <circle cx="50" cy="50" r="30" fill="#ffffff" />\n  <polygon points="50,30 65,60 35,60" fill="#da532c"/>\n</svg>`;
                const sampleUrl = URL.createObjectURL(new Blob([sampleSvg], { type: 'image/svg+xml' }));
                const img = new Image();
                img.onload = () => {
                  setQueue([{
                    id: 'sample',
                    name: 'sample-logo.svg',
                    size: 245,
                    originalUrl: sampleUrl,
                    imgElement: img,
                    status: 'idle',
                    width: 100,
                    height: 100,
                    transparency: false,
                    qualityScore: 95
                  }]);
                  setActiveItemId('sample');
                };
                img.src = sampleUrl;
              }}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-200 font-semibold rounded-xl transition-colors flex items-center gap-2 text-sm border border-slate-700"
            >
              <Sparkles size={18} className="text-yellow-400" /> Use Demo Logo
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDE: Configuration panels */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Batch Upload Queue */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 mb-3">
                <Grid size={16} className="text-[#518231]" /> Upload Queue
              </h3>
              <div className="flex flex-col gap-2 max-h-[140px] overflow-y-auto pr-1.5 custom-scrollbar">
                {queue.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setActiveItemId(item.id)}
                    className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${activeItemId === item.id ? 'bg-[#518231]/5 border-[#518231] shadow-sm' : 'bg-slate-50/50 hover:bg-slate-50 dark:bg-slate-900/50 dark:hover:bg-slate-800/50 border-slate-200 dark:border-slate-800'}`}
                  >
                    <img src={item.originalUrl} className="w-10 h-10 object-contain rounded bg-white border border-slate-200 shadow-sm shrink-0" alt="uploaded thumbnail" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{item.name}</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.width}×{item.height} px • {item.transparency ? 'Transparent' : 'Opaque'}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeQueueItem(item.id);
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors shrink-0"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Styling Panel */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Palette size={16} className="text-[#518231]" /> Styling Studio
              </h3>

              {/* Background settings */}
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-2">Background Shape</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['transparent', 'solid', 'gradient'] as const).map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setBackgroundType(type)}
                      className={`px-2 py-1.5 text-xs font-semibold rounded-lg border capitalize transition-all ${backgroundType === type ? 'bg-[#518231]/10 border-[#518231] text-[#518231]' : 'bg-transparent border-slate-200 hover:bg-slate-50 text-slate-600 dark:border-slate-800 dark:hover:bg-slate-800/50 dark:text-slate-400'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {backgroundType === 'solid' && (
                  <div className="flex items-center gap-2 mt-2.5">
                    <input
                      type="color"
                      value={solidColor}
                      onChange={e => setSolidColor(e.target.value)}
                      className="w-8 h-8 rounded-lg cursor-pointer border-none bg-transparent"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={solidColor}
                      onChange={e => setSolidColor(e.target.value)}
                      className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-850 dark:text-slate-200 focus:outline-none"
                    />
                  </div>
                )}

                {backgroundType === 'gradient' && (
                  <div className="grid grid-cols-2 gap-2 mt-2.5">
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={gradientColor1}
                        onChange={e => setGradientColor1(e.target.value)}
                        className="w-7 h-7 rounded cursor-pointer border-none bg-transparent"
                      />
                      <input
                        type="text"
                        maxLength={7}
                        value={gradientColor1}
                        onChange={e => setGradientColor1(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded px-2 py-0.5 text-[10px] text-slate-800 dark:text-slate-200"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={gradientColor2}
                        onChange={e => setGradientColor2(e.target.value)}
                        className="w-7 h-7 rounded cursor-pointer border-none bg-transparent"
                      />
                      <input
                        type="text"
                        maxLength={7}
                        value={gradientColor2}
                        onChange={e => setGradientColor2(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded px-2 py-0.5 text-[10px] text-slate-800 dark:text-slate-200"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Slider for Rounding Corner */}
              {backgroundType !== 'transparent' && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Border Radius (Rounding)</label>
                    <span className="text-[10px] font-mono text-slate-400">{borderRadius} px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="256"
                    value={borderRadius}
                    onChange={e => setBorderRadius(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                  />
                </div>
              )}

              {/* Padding slider */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Safe Area Padding (Margin)</label>
                  <span className="text-[10px] font-mono text-slate-400">{padding} px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="160"
                  value={padding}
                  onChange={e => setPadding(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                />
              </div>

              {/* Zoom Scale */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Logo Scale (Zoom)</label>
                  <span className="text-[10px] font-mono text-slate-400">{(zoom * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.05"
                  value={zoom}
                  onChange={e => setZoom(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                />
              </div>

              {/* Positioning Offsets */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Offset X (Horizontal)</label>
                  <input
                    type="number"
                    min="-200"
                    max="200"
                    value={offsetX}
                    onChange={e => setOffsetX(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#518231]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Offset Y (Vertical)</label>
                  <input
                    type="number"
                    min="-200"
                    max="200"
                    value={offsetY}
                    onChange={e => setOffsetY(Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#518231]"
                  />
                </div>
              </div>

              {/* Drop Shadow Controls */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Shadow Depth</label>
                  <span className="text-[10px] font-mono text-slate-400">{shadowBlur} px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={shadowBlur}
                  onChange={e => {
                    const blur = Number(e.target.value);
                    setShadowBlur(blur);
                    setShadowOffset(Math.round(blur / 2));
                  }}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={handleGenerateFavicons}
                  disabled={!activeItem || isProcessing}
                  className="flex-1 py-3 bg-[#518231] hover:bg-[#436a28] text-white font-bold rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} Compile Icon Package
                </button>
              </div>
            </div>

            {/* PWA parameters settings */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm flex flex-col gap-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
                <Smartphone size={16} className="text-[#518231]" /> PWA Manifest Details
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Application Name</label>
                  <input
                    type="text"
                    value={appName}
                    onChange={e => setAppName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-850 dark:text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Short Name</label>
                  <input
                    type="text"
                    value={shortName}
                    onChange={e => setShortName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-850 dark:text-slate-200 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Display Mode</label>
                  <div className="relative">
                    <select
                      value={pwaDisplay}
                      onChange={e => setPwaDisplay(e.target.value as any)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 appearance-none focus:outline-none cursor-pointer"
                    >
                      <option value="standalone">Standalone</option>
                      <option value="fullscreen">Fullscreen</option>
                      <option value="minimal-ui">Minimal UI</option>
                      <option value="browser">Browser Tab</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500"><ChevronDown size={12} /></div>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Theme Color</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={themeColor}
                      onChange={e => setThemeColor(e.target.value)}
                      className="w-7 h-7 rounded cursor-pointer border-none bg-transparent"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={themeColor}
                      onChange={e => setThemeColor(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded px-2 py-1 text-xs text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Background Color</label>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="color"
                      value={pwaBgColor}
                      onChange={e => setPwaBgColor(e.target.value)}
                      className="w-7 h-7 rounded cursor-pointer border-none bg-transparent"
                    />
                    <input
                      type="text"
                      maxLength={7}
                      value={pwaBgColor}
                      onChange={e => setPwaBgColor(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded px-2 py-1 text-xs text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Visual preview viewport and code headers */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Main Visualizer Container */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[460px]">
              
              {/* Preview Tabs */}
              <div className="flex overflow-x-auto border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 shrink-0">
                <button
                  onClick={() => setPreviewTab('tab')}
                  className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${previewTab === 'tab' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  <Layout size={14} /> Browser Tab
                </button>
                <button
                  onClick={() => setPreviewTab('bookmark')}
                  className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${previewTab === 'bookmark' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  <Bookmark size={14} /> Bookmarks
                </button>
                <button
                  onClick={() => setPreviewTab('apple')}
                  className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${previewTab === 'apple' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  <Phone size={14} /> Apple iOS
                </button>
                <button
                  onClick={() => setPreviewTab('android')}
                  className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${previewTab === 'android' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  <Smartphone size={14} /> Android Chrome
                </button>
                <button
                  onClick={() => setPreviewTab('pwa')}
                  className={`flex items-center gap-1.5 px-4 py-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${previewTab === 'pwa' ? 'border-[#518231] text-[#518231]' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                  <Laptop size={14} /> PWA Splash Screen
                </button>
              </div>

              {/* Viewport Frame */}
              <div className="flex-1 p-6 bg-slate-50 dark:bg-slate-950 flex items-center justify-center min-h-[300px]">
                
                {/* 1. BROWSER TAB MOCK */}
                {previewTab === 'tab' && (
                  <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md overflow-hidden flex flex-col">
                    <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 shrink-0">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      
                      {/* Active Tab Mock */}
                      <div className="ml-4 bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-t-lg border-t border-x border-slate-200 dark:border-slate-800 flex items-center gap-2 text-[11px] font-semibold text-slate-700 dark:text-slate-250 w-36 shadow-sm truncate">
                        <canvas ref={canvasRef} className="w-4 h-4 shrink-0 object-contain rounded bg-transparent" />
                        <span className="truncate">{appName}</span>
                        <X size={10} className="text-slate-400 ml-auto shrink-0" />
                      </div>
                    </div>
                    <div className="p-3 bg-slate-50 dark:bg-slate-900 flex items-center text-[10px] text-slate-400 border-b border-slate-200 dark:border-slate-800 font-mono gap-2 shrink-0">
                      <Compass size={12} className="text-slate-450" /> https://yourdomain.com
                    </div>
                    <div className="h-24 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-400 text-xs italic">
                      Tab Viewport mockup
                    </div>
                  </div>
                )}

                {/* 2. BOOKMARKS MOCK */}
                {previewTab === 'bookmark' && (
                  <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-md p-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1"><Bookmark size={12} /> Bookmarks Bar</h4>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2.5 p-2 bg-slate-50 dark:bg-slate-850 rounded-lg border border-slate-150 dark:border-slate-800/80">
                        {canvasRef.current ? (
                          <img src={canvasRef.current.toDataURL()} className="w-6 h-6 object-contain rounded" alt="Bookmark preview" />
                        ) : (
                          <div className="w-6 h-6 bg-slate-200 rounded shrink-0" />
                        )}
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{appName}</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 opacity-50">
                        <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-[10px] text-white font-bold">G</div>
                        <span className="text-xs text-slate-600 dark:text-slate-400">Google Workspace</span>
                      </div>
                      <div className="flex items-center gap-2.5 p-2 opacity-50">
                        <div className="w-6 h-6 bg-slate-800 rounded flex items-center justify-center text-[10px] text-white font-bold">GH</div>
                        <span className="text-xs text-slate-600 dark:text-slate-400">GitHub Dashboard</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. APPLE iOS HOME PREVIEW */}
                {previewTab === 'apple' && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-28 h-28 bg-[#ffffff] border border-slate-200 dark:border-slate-800 rounded-[22px] shadow-lg overflow-hidden flex items-center justify-center">
                      {canvasRef.current ? (
                        <img src={canvasRef.current.toDataURL()} className="w-full h-full object-cover scale-95" alt="Apple Touch preview" />
                      ) : (
                        <div className="w-full h-full bg-slate-300 dark:bg-slate-800" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-2.5">{shortName}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">iOS Apple Touch Icon</span>
                  </div>
                )}

                {/* 4. ANDROID CHROME PREVIEW */}
                {previewTab === 'android' && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-24 h-24 bg-[#eaeaea] dark:bg-slate-800 rounded-full shadow-lg overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700">
                      {canvasRef.current ? (
                        <img src={canvasRef.current.toDataURL()} className="w-full h-full object-cover scale-90 rounded-full" alt="Android preview" />
                      ) : (
                        <div className="w-full h-full bg-slate-400 dark:bg-slate-700" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-2.5">{shortName}</span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Android Adaptive Circle</span>
                  </div>
                )}

                {/* 5. PWA SPLASH SCREEN */}
                {previewTab === 'pwa' && (
                  <div 
                    className="w-full max-w-[240px] aspect-[9/16] rounded-2xl shadow-xl border border-slate-350 dark:border-slate-800 overflow-hidden flex flex-col items-center justify-between p-8"
                    style={{ backgroundColor: pwaBgColor }}
                  >
                    <div className="h-6" /> {/* spacer */}
                    <div className="flex flex-col items-center gap-4">
                      {canvasRef.current ? (
                        <img src={canvasRef.current.toDataURL()} className="w-20 h-20 object-contain rounded-xl" alt="PWA splash preview" />
                      ) : (
                        <div className="w-20 h-20 bg-slate-300 rounded-xl" />
                      )}
                      <h4 className="text-sm font-bold truncate max-w-[180px]" style={{ color: themeColor }}>
                        {appName}
                      </h4>
                    </div>
                    <div className="w-10 h-1 bg-slate-300 rounded-full animate-pulse mt-auto" />
                  </div>
                )}

              </div>
            </div>

            {/* Code Generator Panel */}
            {generatedAssets.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/20 shrink-0">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Code size={16} className="text-[#518231]" /> Integration Snippets
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const copyText = codeTab === 'html' ? htmlCodeSnippet : codeTab === 'nextjs' ? nextJsCodeSnippet : manifestCodeSnippet;
                        copySnippet(copyText);
                      }}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-250 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold rounded text-[10px] transition-colors flex items-center gap-1 shadow-sm"
                    >
                      <Copy size={11} /> Copy Code
                    </button>
                  </div>
                </div>

                {/* Sub tabs for languages */}
                <div className="flex border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold bg-slate-50 dark:bg-slate-900">
                  <button 
                    onClick={() => setCodeTab('html')}
                    className={`px-4 py-2 border-b-2 transition-colors ${codeTab === 'html' ? 'border-[#518231] text-[#518231] bg-white dark:bg-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                    HTML Tags
                  </button>
                  <button 
                    onClick={() => setCodeTab('nextjs')}
                    className={`px-4 py-2 border-b-2 transition-colors ${codeTab === 'nextjs' ? 'border-[#518231] text-[#518231] bg-white dark:bg-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                    Next.js Metadata
                  </button>
                  <button 
                    onClick={() => setCodeTab('manifest')}
                    className={`px-4 py-2 border-b-2 transition-colors ${codeTab === 'manifest' ? 'border-[#518231] text-[#518231] bg-white dark:bg-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                  >
                    manifest.webmanifest
                  </button>
                </div>

                {/* Code viewport */}
                <div className="p-4 bg-slate-950 text-slate-300 font-mono text-xs overflow-auto max-h-[220px] custom-scrollbar">
                  <pre className="whitespace-pre">
                    {codeTab === 'html' && htmlCodeSnippet}
                    {codeTab === 'nextjs' && nextJsCodeSnippet}
                    {codeTab === 'manifest' && manifestCodeSnippet}
                  </pre>
                </div>
              </div>
            )}

            {/* Generated files list / Developer Dashboard */}
            {generatedAssets.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800 mb-4 shrink-0">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                    <Grid size={16} className="text-[#518231]" /> Developer Dashboard
                  </h3>
                  <button
                    onClick={handleDownloadZipPackage}
                    className="px-3.5 py-1.5 bg-[#518231] hover:bg-[#436a28] text-white font-bold rounded-lg text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <DownloadCloud size={14} /> Download ZIP Package
                  </button>
                </div>

                <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-1.5 custom-scrollbar">
                  {/* ICO Row */}
                  <div className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">favicon.ico</h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                        Contains multi-resolution densities: 16×16, 32×32, 48×48 px
                      </p>
                    </div>
                    {faviconIcoUrl && (
                      <a
                        href={faviconIcoUrl}
                        download="favicon.ico"
                        className="p-1.5 text-[#518231] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                        title="Download ICO"
                      >
                        <Download size={14} />
                      </a>
                    )}
                  </div>

                  {/* PNG rows */}
                  {generatedAssets.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{asset.name}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{asset.desc}</p>
                      </div>
                      {asset.url && (
                        <a
                          href={asset.url}
                          download={asset.name}
                          className="p-1.5 text-[#518231] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="Download PNG"
                        >
                          <Download size={14} />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      )}

      {/* Hidden composition canvas for master render operations */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}
