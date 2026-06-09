"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Upload, Trash2, Settings, Download, RefreshCw, Layers, Image as ImageIcon, Sparkles, Loader2, Maximize2 } from "lucide-react";
import { removeBackground, Config } from "@imgly/background-removal";

interface ImageFile {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalUrl: string;
  processedUrl: string | null;
  status: "idle" | "processing" | "success" | "error";
  progress: number;
  errorMessage?: string;
  originalWidth?: number;
  originalHeight?: number;
}

export function BackgroundRemoverTool() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [processingAll, setProcessingAll] = useState(false);
  
  // Background replacement settings
  const [bgMode, setBgMode] = useState<"transparent" | "color" | "image">("transparent");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [customBgUrl, setCustomBgUrl] = useState<string | null>(null);

  // Custom background input ref
  const customBgInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prevent multiple model loading issues
  const [modelLoaded, setModelLoaded] = useState(false);

  // Handle Clipboard Paste
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

  const loadFiles = (fileList: File[] | FileList) => {
    const newImages: ImageFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!file.type.startsWith("image/")) continue;
      if (file.type === "image/svg+xml") {
        alert("SVG files are not supported for background removal. Please use raster images (PNG, JPG, WEBP).");
        continue;
      }

      if (file.size > 20 * 1024 * 1024) {
        alert(`File too large (>20MB): ${file.name}. Please upload a smaller image.`);
        continue;
      }

      const id = `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const originalUrl = URL.createObjectURL(file);

      const newImage: ImageFile = {
        id,
        file,
        name: file.name,
        originalSize: file.size,
        originalUrl,
        processedUrl: null,
        status: "idle",
        progress: 0
      };

      // Load dimensions
      const img = new Image();
      img.src = originalUrl;
      img.onload = () => {
        setImages(prev => prev.map(item => item.id === id ? {
          ...item,
          originalWidth: img.naturalWidth,
          originalHeight: img.naturalHeight
        } : item));
      };

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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const target = prev.find(item => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.originalUrl);
        if (target.processedUrl) URL.revokeObjectURL(target.processedUrl);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const resetAll = () => {
    images.forEach(item => {
      URL.revokeObjectURL(item.originalUrl);
      if (item.processedUrl) URL.revokeObjectURL(item.processedUrl);
    });
    setImages([]);
    if (customBgUrl) URL.revokeObjectURL(customBgUrl);
    setCustomBgUrl(null);
  };

  const handleCustomBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (customBgUrl) URL.revokeObjectURL(customBgUrl);
      setCustomBgUrl(URL.createObjectURL(file));
      setBgMode("image");
    }
  };

  // Helper to draw the final composite image on a canvas if a background is set
  const applyBackground = async (transparentBlob: Blob, item: ImageFile): Promise<Blob> => {
    if (bgMode === "transparent") return transparentBlob;

    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx || !item.originalWidth || !item.originalHeight) return resolve(transparentBlob);

      canvas.width = item.originalWidth;
      canvas.height = item.originalHeight;

      const foreground = new Image();
      foreground.src = URL.createObjectURL(transparentBlob);
      
      foreground.onload = () => {
        if (bgMode === "color") {
          ctx.fillStyle = bgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(foreground, 0, 0);
          canvas.toBlob((blob) => {
            URL.revokeObjectURL(foreground.src);
            resolve(blob || transparentBlob);
          }, "image/jpeg", 0.95);
        } else if (bgMode === "image" && customBgUrl) {
          const bgImg = new Image();
          bgImg.src = customBgUrl;
          bgImg.onload = () => {
            // Draw background scaled to cover
            const scale = Math.max(canvas.width / bgImg.width, canvas.height / bgImg.height);
            const x = (canvas.width / 2) - (bgImg.width / 2) * scale;
            const y = (canvas.height / 2) - (bgImg.height / 2) * scale;
            ctx.drawImage(bgImg, x, y, bgImg.width * scale, bgImg.height * scale);
            
            // Draw foreground
            ctx.drawImage(foreground, 0, 0);
            canvas.toBlob((blob) => {
              URL.revokeObjectURL(foreground.src);
              resolve(blob || transparentBlob);
            }, "image/jpeg", 0.95);
          };
          bgImg.onerror = () => {
             ctx.drawImage(foreground, 0, 0);
             canvas.toBlob((b) => resolve(b || transparentBlob));
          };
        } else {
          resolve(transparentBlob);
        }
      };
      
      foreground.onerror = () => resolve(transparentBlob);
    });
  };

  const processSingleImage = async (item: ImageFile) => {
    setImages(prev => prev.map(img => img.id === item.id ? { ...img, status: "processing", progress: 10 } : img));
    
    try {
      const config: Config = {
        debug: false,
        progress: (key, current, total) => {
          const p = Math.round((current / total) * 100);
          // Only update UI occasionally to prevent react rendering lag
          if (p % 10 === 0) {
            setImages(prev => prev.map(img => img.id === item.id ? { ...img, progress: 10 + Math.floor(p * 0.8) } : img));
          }
        }
      };

      const imageBlob = await removeBackground(item.originalUrl, config);
      setModelLoaded(true);

      const finalBlob = await applyBackground(imageBlob, item);
      const processedUrl = URL.createObjectURL(finalBlob);

      setImages(prev => prev.map(img => img.id === item.id ? {
        ...img,
        status: "success",
        progress: 100,
        processedUrl
      } : img));

    } catch (error: any) {
      console.error("BG Removal Error:", error);
      setImages(prev => prev.map(img => img.id === item.id ? {
        ...img,
        status: "error",
        progress: 0,
        errorMessage: error.message || "Failed to remove background."
      } : img));
    }
  };

  const processImages = async () => {
    if (images.length === 0) return;
    setProcessingAll(true);

    // Process sequentially to save memory
    for (const item of images) {
      if (item.status !== "success") {
        await processSingleImage(item);
      }
    }

    setProcessingAll(false);
  };

  const triggerDownload = (item: ImageFile) => {
    if (!item.processedUrl) return;
    const a = document.createElement("a");
    a.href = item.processedUrl;
    
    const dotIdx = item.name.lastIndexOf(".");
    const base = dotIdx !== -1 ? item.name.substring(0, dotIdx) : item.name;
    const ext = bgMode === "transparent" ? ".png" : ".jpg";
    
    a.download = `${base}-rmbg${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* Top Banner Context info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-indigo-50/50 border border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/30 p-4 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Sparkles size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 dark:text-white text-sm">100% In-Browser AI Privacy</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Photos never leave your device. The AI model runs locally in your browser memory.</p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          {images.length > 0 && (
            <button 
              onClick={resetAll}
              className="px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/30 text-xs font-semibold text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/20 transition-all flex items-center gap-1.5"
            >
              <RefreshCw size={14} /> Clear All
            </button>
          )}
        </div>
      </div>

      {images.length === 0 ? (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-3 border-dashed rounded-2xl p-10 md:p-16 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group ${
            dragActive 
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20 shadow-[0_0_20px_-3px_rgba(99,102,241,0.2)]" 
              : "border-slate-300 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 bg-white dark:bg-slate-900/40 hover:bg-slate-50/50 dark:hover:bg-slate-900/80"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png, image/jpeg, image/webp"
            onChange={(e) => {
              if (e.target.files) loadFiles(e.target.files);
            }}
            className="hidden"
          />
          <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 flex items-center justify-center group-hover:scale-105 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all duration-300 mb-4 shadow-xs">
            <Upload size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Upload Images to Remove Background
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
            Drag & drop files or click to browse. Paste screenshots directly (Ctrl+V).
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-[10px] font-bold text-slate-400 uppercase">
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">PNG, JPG, WEBP</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50 dark:border-slate-700/50">NO SERVER UPLOADS</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Main Area (Left Col) */}
          <div className="lg:col-span-2 space-y-4">
            {images.map((item) => (
              <div key={item.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-2xs">
                {/* Result Viewer (Chessboard background for transparency) */}
                <div className="relative w-full aspect-video md:aspect-[21/9] bg-slate-100 dark:bg-slate-950 flex flex-col items-center justify-center overflow-hidden"
                     style={{
                       backgroundImage: bgMode === "transparent" ? 'conic-gradient(#e2e8f0 90deg, transparent 90deg 180deg, #e2e8f0 180deg 270deg, transparent 270deg 360deg)' : 'none',
                       backgroundSize: '20px 20px',
                       backgroundColor: bgMode === "color" ? bgColor : (bgMode === "transparent" ? '#f8fafc' : 'transparent'),
                     }}
                >
                  {/* Custom Background Image Layer */}
                  {bgMode === "image" && customBgUrl && (
                    <img 
                      src={customBgUrl} 
                      alt="Custom Background" 
                      className="absolute inset-0 w-full h-full object-cover opacity-100" 
                    />
                  )}

                  {/* Foreground Image Layer */}
                  {item.status === "success" && item.processedUrl ? (
                    <img 
                      src={item.processedUrl} 
                      alt="Processed result" 
                      className="absolute inset-0 w-full h-full object-contain drop-shadow-md"
                    />
                  ) : (
                    <img 
                      src={item.originalUrl} 
                      alt="Original" 
                      className={`absolute inset-0 w-full h-full object-contain ${item.status === "processing" ? "opacity-30 blur-sm" : "opacity-100"}`}
                    />
                  )}

                  {/* Loading overlay */}
                  {item.status === "processing" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-6 bg-slate-900/20 backdrop-blur-[2px]">
                      <div className="w-full max-w-md bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl flex flex-col items-center text-center">
                        <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
                        <h4 className="font-bold text-slate-800 dark:text-white mb-1">
                          {!modelLoaded ? "Loading AI Model..." : "Extracting Subject..."}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                          {!modelLoaded ? "Downloading 40MB neural network (first time only)" : "Tracing complex edges and hair..."}
                        </p>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300 ease-out"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Top Bar inside viewer */}
                  <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none">
                    <div className="text-white text-xs font-medium px-2 py-1 bg-black/30 backdrop-blur-md rounded-lg truncate max-w-[200px]">
                      {item.name}
                    </div>
                  </div>
                </div>

                {/* File Controls */}
                <div className="p-4 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex gap-2 w-full sm:w-auto">
                    {item.status === "success" ? (
                      <button 
                        onClick={() => triggerDownload(item)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                      >
                        <Download size={16} /> Download
                      </button>
                    ) : item.status === "idle" || item.status === "error" ? (
                      <button 
                        onClick={() => processSingleImage(item)}
                        className="flex-1 sm:flex-none px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                      >
                        <Sparkles size={16} /> Remove Background
                      </button>
                    ) : null}

                    <button 
                      onClick={() => removeImage(item.id)}
                      className="px-3 py-2 bg-slate-100 hover:bg-red-100 dark:bg-slate-800 dark:hover:bg-red-900/30 text-slate-500 hover:text-red-600 rounded-xl transition-colors shrink-0"
                      title="Remove from queue"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  {item.errorMessage && (
                    <span className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950/30 px-3 py-1.5 rounded-lg">
                      {item.errorMessage}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {images.length > 1 && !processingAll && images.some(i => i.status === "idle") && (
              <button 
                onClick={processImages}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={18} /> Process All Images
              </button>
            )}
          </div>

          {/* Sidebar Settings (Right Col) */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-2xs sticky top-6">
              <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                <Settings size={18} className="text-indigo-500" /> Output Settings
              </h3>

              {/* Background Options */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 block">Background Output</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setBgMode("transparent")}
                      className={`py-2 px-1 text-xs font-bold rounded-lg border ${bgMode === "transparent" ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400" : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"}`}
                    >
                      Transparent
                    </button>
                    <button
                      onClick={() => setBgMode("color")}
                      className={`py-2 px-1 text-xs font-bold rounded-lg border ${bgMode === "color" ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400" : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"}`}
                    >
                      Solid Color
                    </button>
                    <button
                      onClick={() => setBgMode("image")}
                      className={`py-2 px-1 text-xs font-bold rounded-lg border ${bgMode === "image" ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400" : "border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"}`}
                    >
                      Custom Image
                    </button>
                  </div>
                </div>

                {/* Conditional Setting Panels */}
                {bgMode === "color" && (
                  <div className="animate-in slide-in-from-top-2 fade-in duration-200 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2 block">Select Color</label>
                    <div className="flex gap-2 items-center">
                      <input 
                        type="color" 
                        value={bgColor} 
                        onChange={(e) => setBgColor(e.target.value)}
                        className="h-8 w-14 rounded cursor-pointer border border-slate-200 dark:border-slate-700 bg-white"
                      />
                      <input 
                        type="text" 
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["#ffffff", "#000000", "#ef4444", "#3b82f6", "#22c55e", "#eab308"].map(c => (
                        <button key={c} onClick={() => setBgColor(c)} className="w-6 h-6 rounded-full border border-slate-200 shadow-xs" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                )}

                {bgMode === "image" && (
                  <div className="animate-in slide-in-from-top-2 fade-in duration-200 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                    <input type="file" ref={customBgInputRef} accept="image/*" className="hidden" onChange={handleCustomBgUpload} />
                    {customBgUrl ? (
                      <div className="relative group">
                        <img src={customBgUrl} alt="Custom Background" className="w-full h-24 object-cover rounded-lg border border-slate-200 dark:border-slate-700" />
                        <button onClick={() => customBgInputRef.current?.click()} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-bold transition-opacity rounded-lg">Change Image</button>
                      </div>
                    ) : (
                      <button onClick={() => customBgInputRef.current?.click()} className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 hover:text-indigo-600 hover:border-indigo-500 transition-colors text-xs font-bold flex flex-col items-center gap-1">
                        <ImageIcon size={20} />
                        Upload Background
                      </button>
                    )}
                  </div>
                )}

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-500 dark:text-slate-400 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                    <strong>Note:</strong> Changing background settings will only apply to new processing requests or you can re-process images by clearing and re-uploading them.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
