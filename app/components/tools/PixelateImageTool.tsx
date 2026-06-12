"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Image as ImageIcon, Download, Maximize, Zap, Sparkles, RefreshCw, AlertCircle, MousePointerSquareDashed, Trash2, LayoutGrid, Sliders, Shield } from "lucide-react";

interface BoundingBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function PixelateImageTool() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{w: number, h: number} | null>(null);
  const [boxes, setBoxes] = useState<BoundingBox[]>([]);
  
  const [pixelationMode, setPixelationMode] = useState<'area' | 'full'>('area');
  const [pixelationIntensity, setPixelationIntensity] = useState<number>(30); // 1-100
  
  const [exportFormat, setExportFormat] = useState<string>('image/jpeg');
  const [exportQuality, setExportQuality] = useState<number>(0.9);

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentDrawBox, setCurrentDrawBox] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const startPosRef = useRef<{x: number, y: number} | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Render canvas whenever boxes, settings, or image changes
  const renderCanvas = useCallback(() => {
    if (!canvasRef.current || !imageRef.current || !originalImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageElement = imageRef.current;

    if (!ctx) return;

    // Reset canvas to image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    // Apply pixelation
    if (pixelationMode === 'full') {
      applyPixelation(ctx, imageElement, 0, 0, canvas.width, canvas.height);
    } else {
      // Area mode: draw all saved boxes
      boxes.forEach(box => {
        applyPixelation(ctx, imageElement, box.x, box.y, box.width, box.height);
      });

      // Draw currently drawing box
      if (currentDrawBox) {
        // Draw the pixelation effect for the current dragging area
        applyPixelation(ctx, imageElement, currentDrawBox.x, currentDrawBox.y, currentDrawBox.width, currentDrawBox.height);
        
        // Draw a distinct border to show active drawing
        ctx.strokeStyle = '#3b82f6'; // Blue
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.strokeRect(currentDrawBox.x, currentDrawBox.y, currentDrawBox.width, currentDrawBox.height);
        ctx.setLineDash([]); // Reset
      }
    }

  }, [originalImage, boxes, currentDrawBox, pixelationMode, pixelationIntensity]);

  // Helper function to apply pixelation to a specific rect
  const applyPixelation = (ctx: CanvasRenderingContext2D, img: HTMLImageElement, x: number, y: number, w: number, h: number) => {
    if (w <= 0 || h <= 0) return;
    
    // Ensure we don't go out of bounds
    x = Math.max(0, x);
    y = Math.max(0, y);
    w = Math.min(w, ctx.canvas.width - x);
    h = Math.min(h, ctx.canvas.height - y);

    // Size of the pixel blocks based on intensity (5 to 50 pixels)
    // Map 1-100 to a reasonable block size relative to the area
    const minBlockSize = 4;
    const maxBlockSize = Math.max(10, Math.floor(Math.min(img.width, img.height) * 0.15));
    const blockSize = Math.max(minBlockSize, Math.floor((pixelationIntensity / 100) * maxBlockSize));
    
    const offscreen = document.createElement('canvas');
    // Scale down
    offscreen.width = Math.ceil(w / blockSize);
    offscreen.height = Math.ceil(h / blockSize);
    const offCtx = offscreen.getContext('2d');
    if (offCtx) {
      offCtx.imageSmoothingEnabled = false;
      offCtx.drawImage(img, x, y, w, h, 0, 0, offscreen.width, offscreen.height);
      
      // Scale back up
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(offscreen, 0, 0, offscreen.width, offscreen.height, x, y, w, h);
      ctx.imageSmoothingEnabled = true; // reset for next operations
    }
  };

  useEffect(() => {
    if (originalImage && originalDimensions) {
      renderCanvas();
    }
  }, [renderCanvas]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ w: img.width, h: img.height });
        if (canvasRef.current) {
          canvasRef.current.width = img.width;
          canvasRef.current.height = img.height;
        }
        setOriginalImage(e.target?.result as string);
        setBoxes([]);
        setCurrentDrawBox(null);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!canvasRef.current || !originalImage) return;

    const dataUrl = canvasRef.current.toDataURL(exportFormat, exportQuality);
    const link = document.createElement('a');
    link.download = `pixelated-image-${Date.now()}.${exportFormat.split('/')[1]}`;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Canvas Mouse/Touch Events for Drawing
  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (pixelationMode !== 'area') return;
    // Prevent scrolling on touch
    if ('touches' in e && e.cancelable) {
      // Browsers often complain about preventDefault on passive listeners, but standard practice for canvas drawing.
    }
    
    const { x, y } = getCoordinates(e);
    setIsDrawing(true);
    startPosRef.current = { x, y };
    setCurrentDrawBox({ x, y, width: 0, height: 0 });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !startPosRef.current || pixelationMode !== 'area') return;
    
    const { x, y } = getCoordinates(e);
    const startX = startPosRef.current.x;
    const startY = startPosRef.current.y;
    
    setCurrentDrawBox({
      x: Math.min(x, startX),
      y: Math.min(y, startY),
      width: Math.abs(x - startX),
      height: Math.abs(y - startY)
    });
  };

  const endDrawing = () => {
    if (!isDrawing || pixelationMode !== 'area') return;
    setIsDrawing(false);
    
    if (currentDrawBox && currentDrawBox.width > 5 && currentDrawBox.height > 5) {
      setBoxes([...boxes, { ...currentDrawBox, id: Math.random().toString(36).substr(2, 9) }]);
    }
    setCurrentDrawBox(null);
    startPosRef.current = null;
  };

  const clearBoxes = () => {
    setBoxes([]);
  };

  const removeBox = (idToRemove: string) => {
    setBoxes(boxes.filter(box => box.id !== idToRemove));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Hidden image element used as source for canvas */}
        {originalImage && (
          <img 
            ref={imageRef} 
            src={originalImage} 
            alt="Original" 
            className="hidden" 
            crossOrigin="anonymous" 
          />
        )}

        {!originalImage ? (
          <div className="p-8 md:p-12 text-center">
            <div className="max-w-xl mx-auto space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center">
                  <LayoutGrid className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Secure Image Pixelation Studio</h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Censor faces, hide sensitive text, or create retro 8-bit effects. 
                  Processed 100% locally on your device for absolute privacy.
                </p>
              </div>
              
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-emerald-500 rounded-xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-emerald-500/50 border-dashed rounded-xl bg-emerald-50 dark:bg-emerald-900/10 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 transition-colors cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 text-emerald-500 mb-3" />
                    <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">PNG, JPG, WEBP, BMP</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
                </label>
              </div>

              <div className="flex items-center justify-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5"><Shield className="w-4 h-4" /> 100% Private</div>
                <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                <div className="flex items-center gap-1.5"><Zap className="w-4 h-4" /> Local Processing</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 border-t border-slate-200 dark:border-slate-800">
            {/* Main Canvas Area */}
            <div className="lg:col-span-3 bg-slate-100 dark:bg-slate-950 p-4 flex flex-col min-h-[500px]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <LayoutGrid className="w-5 h-5 text-emerald-500" />
                    Pixelation Workspace
                  </h3>
                  {pixelationMode === 'area' && (
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 rounded-md flex items-center gap-1">
                      <MousePointerSquareDashed className="w-3 h-3" /> Draw boxes to censor
                    </span>
                  )}
                </div>
                <button
                  onClick={() => { setOriginalImage(null); setBoxes([]); }}
                  className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                >
                  Upload New Image
                </button>
              </div>

              <div className="flex-1 relative rounded-xl overflow-hidden bg-white/50 dark:bg-black/20 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-inner" ref={containerRef}>
                <div className="max-w-full max-h-full overflow-auto relative custom-scrollbar">
                  <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={endDrawing}
                    onMouseLeave={endDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={endDrawing}
                    className={`max-w-full h-auto shadow-sm ${pixelationMode === 'area' ? 'cursor-crosshair' : 'cursor-default'}`}
                    style={{ touchAction: 'none' }} // Prevent scrolling when drawing on touch devices
                  />
                </div>
              </div>
            </div>

            {/* Sidebar Controls */}
            <div className="border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 flex flex-col h-full">
              <div className="space-y-6 flex-1">
                
                {/* Mode Selection */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Pixelation Mode</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setPixelationMode('area')}
                      className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${pixelationMode === 'area' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'}`}
                    >
                      Area Selection
                    </button>
                    <button
                      onClick={() => setPixelationMode('full')}
                      className={`py-2 px-3 rounded-lg text-sm font-medium border transition-colors ${pixelationMode === 'full' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-700'}`}
                    >
                      Full Image
                    </button>
                  </div>
                </div>

                {/* Intensity Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Sliders className="w-4 h-4" /> Pixel Block Size
                    </h4>
                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">{pixelationIntensity}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="100" 
                    value={pixelationIntensity} 
                    onChange={(e) => setPixelationIntensity(parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>Small</span>
                    <span>Massive (Highly Secure)</span>
                  </div>
                </div>

                {/* Area Management */}
                {pixelationMode === 'area' && (
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Active Censored Areas</h4>
                      {boxes.length > 0 && (
                        <button 
                          onClick={clearBoxes}
                          className="text-xs text-red-600 hover:text-red-700 dark:text-red-400 font-medium"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    
                    {boxes.length === 0 ? (
                      <div className="p-4 rounded-lg border border-slate-200 border-dashed dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-center">
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Click and drag on the image to draw pixelation boxes over faces or text.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-1">
                        {boxes.map((box, idx) => (
                          <div key={box.id} className="flex justify-between items-center p-2 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Area #{idx + 1}</span>
                            <button 
                              onClick={() => removeBox(box.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors"
                              title="Remove this area"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Export Options */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Export Settings</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Format</label>
                      <select 
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 dark:bg-slate-800 dark:border-slate-700 dark:placeholder-slate-400 dark:text-white"
                        value={exportFormat}
                        onChange={(e) => setExportFormat(e.target.value)}
                      >
                        <option value="image/jpeg">JPG (Smaller size)</option>
                        <option value="image/png">PNG (Lossless text)</option>
                        <option value="image/webp">WEBP (Web optimized)</option>
                      </select>
                    </div>

                    {(exportFormat === 'image/jpeg' || exportFormat === 'image/webp') && (
                      <div>
                        <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1 flex justify-between">
                          <span>Quality</span>
                          <span>{Math.round(exportQuality * 100)}%</span>
                        </label>
                        <input 
                          type="range" 
                          min="0.1" 
                          max="1.0" 
                          step="0.05"
                          value={exportQuality} 
                          onChange={(e) => setExportQuality(parseFloat(e.target.value))}
                          className="w-full accent-emerald-500"
                        />
                      </div>
                    )}
                  </div>
                </div>

              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={handleDownload}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-xl transition-all shadow-sm shadow-emerald-500/20"
                >
                  <Download className="w-5 h-5" />
                  Save Image Securely
                </button>
                <p className="text-center text-[10px] text-slate-500 mt-2 flex items-center justify-center gap-1">
                  <Shield className="w-3 h-3" /> Processed locally. No server uploads.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
