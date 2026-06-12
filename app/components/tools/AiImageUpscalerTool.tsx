"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Image as ImageIcon, ZoomIn, Download, SlidersHorizontal, Maximize, Zap, Sparkles, RefreshCw, AlertCircle, Info, ChevronRight, Wand2, ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';

export default function AiImageUpscalerTool() {
  const t = useTranslations('tools');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [originalBitmap, setOriginalBitmap] = useState<ImageBitmap | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [scale, setScale] = useState<number>(2);
  const [mode, setMode] = useState<string>('standard');
  const [exportFormat, setExportFormat] = useState<string>('image/png');
  const [exportQuality, setExportQuality] = useState<number>(1.0);
  
  const [originalDimensions, setOriginalDimensions] = useState<{w: number, h: number} | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<Worker | null>(null);
  
  // Initialize worker
  useEffect(() => {
    workerRef.current = new Worker(new URL('../../workers/image-upscaler.worker.ts', import.meta.url), { type: 'module' });
    
    workerRef.current.onmessage = (e) => {
      if (e.data.status === 'success') {
        const url = URL.createObjectURL(e.data.blob);
        setEnhancedImage(url);
        setIsProcessing(false);
      } else {
        setError(e.data.error || "An error occurred during upscaling.");
        setIsProcessing(false);
      }
    };
    
    return () => {
      workerRef.current?.terminate();
      if (enhancedImage) URL.revokeObjectURL(enhancedImage);
    };
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }

    try {
      const bitmap = await createImageBitmap(file);
      
      // Check for extremely large images to prevent crashing
      if (bitmap.width * bitmap.height > 25000000) { // 25 Megapixels
        setError('Image is too large. Please upload an image smaller than 25 Megapixels.');
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setOriginalImage(imageUrl);
      setEnhancedImage(null);
      setOriginalBitmap(bitmap);
      setOriginalFile(file);
      setOriginalDimensions({ w: bitmap.width, h: bitmap.height });
      setError(null);
      setSliderPosition(50);
    } catch (err) {
      setError('Failed to read image. The file might be corrupted.');
    }
  };

  const startUpscale = () => {
    if (!workerRef.current || !originalBitmap) return;
    
    setIsProcessing(true);
    setError(null);
    
    // Revoke old URL if exists to prevent memory leaks
    if (enhancedImage) {
      URL.revokeObjectURL(enhancedImage);
      setEnhancedImage(null);
    }
    
    // We send a clone of the bitmap if we need to process it multiple times, 
    // or just let the worker use it. Since OffscreenCanvas drawImage doesn't consume the bitmap, 
    // we can pass it directly, but structured clone might fail on some older browsers. 
    // Passing the file or creating a new bitmap is safer.
    createImageBitmap(originalFile!).then(freshBitmap => {
      workerRef.current?.postMessage({
        imageBitmap: freshBitmap,
        scale,
        mode
      });
    }).catch(() => {
      setError("Failed to initialize processing engine.");
      setIsProcessing(false);
    });
  };

  const handleDownload = async () => {
    if (!enhancedImage) return;

    // The worker returned a PNG blob URL. If the user requested JPG or WEBP, 
    // we must convert it locally before downloading.
    try {
      let downloadUrl = enhancedImage;
      let extension = 'png';

      if (exportFormat !== 'image/png') {
        extension = exportFormat.split('/')[1];
        const img = new Image();
        img.crossOrigin = 'anonymous';
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = enhancedImage;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, exportFormat, exportQuality));
          if (blob) {
            downloadUrl = URL.createObjectURL(blob);
          }
        }
      }

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `upscaled_${scale}x_${Date.now()}.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup temp blob
      if (downloadUrl !== enhancedImage) {
        URL.revokeObjectURL(downloadUrl);
      }
    } catch (err) {
      setError("Failed to export image.");
    }
  };

  const handleMouseMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    let clientX;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
    } else {
      // Only process mouse move if mouse is down (optional)
      if ((e as React.MouseEvent).buttons !== 1) return;
      clientX = (e as React.MouseEvent).clientX;
    }
    
    const position = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  }, []);

  return (
    <div className="space-y-8">
      {/* Introduction Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Wand2 className="w-6 h-6 text-indigo-500" />
          AI Studio Workspace
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Upload an image to securely upscale and enhance it directly on your device. Zero cloud uploads guarantee absolute privacy.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded-r-lg">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
            <p className="text-sm text-red-700 dark:text-red-300 font-medium">{error}</p>
          </div>
        </div>
      )}

      {!originalImage ? (
        // Upload Zone
        <div className="w-full">
          <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="w-20 h-20 mb-4 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="mb-2 text-xl font-bold text-gray-700 dark:text-gray-200">
                Click or drag image to upscale
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Supports JPG, PNG, WEBP (Max 25MP)
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full">
                <Zap className="w-4 h-4" />
                100% Secure Local Processing
              </div>
            </div>
            <input type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileUpload} />
          </label>
        </div>
      ) : (
        // Studio Dashboard
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Panel: Comparison Slider */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              ref={containerRef}
              className="relative w-full aspect-video bg-gray-900 rounded-2xl overflow-hidden touch-none shadow-lg cursor-ew-resize border border-gray-200 dark:border-gray-700"
              onMouseMove={handleMouseMove}
              onTouchMove={handleMouseMove}
              onMouseDown={(e) => handleMouseMove(e)}
            >
              {/* Original Image (Background) */}
              <img 
                src={originalImage} 
                className="absolute inset-0 w-full h-full object-contain filter blur-[1px] opacity-70"
                alt="Original background"
                draggable={false}
              />

              {/* Original Image (Left Side) */}
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img 
                  src={originalImage} 
                  className="absolute inset-0 w-full h-full object-contain"
                  style={{ width: '100vw', maxWidth: containerRef.current?.clientWidth || '100%' }}
                  alt="Original"
                  draggable={false}
                />
              </div>

              {/* Enhanced Image (Right Side) */}
              {enhancedImage && (
                <div 
                  className="absolute inset-0 overflow-hidden bg-gray-900"
                  style={{ left: `${sliderPosition}%`, width: `${100 - sliderPosition}%` }}
                >
                  <img 
                    src={enhancedImage} 
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{ 
                      width: '100vw', 
                      maxWidth: containerRef.current?.clientWidth || '100%',
                      transform: `translateX(-${sliderPosition}%)` 
                    }}
                    alt="Enhanced"
                    draggable={false}
                  />
                </div>
              )}

              {/* Processing Overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                  <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4"></div>
                  <h3 className="text-xl font-bold text-white mb-2">Enhancing Image</h3>
                  <p className="text-indigo-200">Applying AI algorithms locally...</p>
                </div>
              )}

              {/* Slider Handle */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-indigo-500">
                  <ChevronRight className="w-5 h-5 text-indigo-500" />
                </div>
              </div>

              {/* Labels */}
              <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-md z-10 pointer-events-none">
                Original
              </div>
              {enhancedImage && (
                <div className="absolute top-4 right-4 bg-indigo-600/80 text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-md z-10 pointer-events-none flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Enhanced ({scale}x)
                </div>
              )}
            </div>

            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Resolution: </span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {originalDimensions?.w} × {originalDimensions?.h}
                </span>
                {enhancedImage && (
                  <>
                    <ArrowRight className="inline-block w-4 h-4 mx-2 text-gray-400" />
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">
                      {originalDimensions!.w * scale} × {originalDimensions!.h * scale}
                    </span>
                  </>
                )}
              </div>
              <button 
                onClick={() => {
                  setOriginalImage(null);
                  setEnhancedImage(null);
                  setOriginalBitmap(null);
                }}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                Upload New Image
              </button>
            </div>
          </div>

          {/* Right Panel: Settings */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
            
            {/* Upscale Factor */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Maximize className="w-4 h-4 text-indigo-500" />
                Upscale Factor
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[2, 4].map((val) => (
                  <button
                    key={val}
                    onClick={() => setScale(val)}
                    className={`py-3 rounded-xl border-2 font-bold transition-all ${scale === val ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-200'}`}
                  >
                    {val}x
                  </button>
                ))}
              </div>
              {scale === 4 && (
                <p className="mt-2 text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  4x upscale requires more memory and processing time.
                </p>
              )}
            </div>

            {/* AI Enhancement Mode */}
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                AI Enhancement Mode
              </h3>
              <div className="space-y-2">
                {[
                  { id: 'standard', name: 'Standard', desc: 'Balanced detail and noise reduction' },
                  { id: 'high-detail', name: 'High Detail', desc: 'Preserves micro-contrast for landscapes' },
                  { id: 'photo', name: 'Portrait / Photo', desc: 'Smoother skin tones and natural gradients' },
                  { id: 'text', name: 'Text & Screenshot', desc: 'Aggressive edge sharpening for text' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMode(m.id)}
                    className={`w-full text-left p-3 rounded-xl border-2 transition-all ${mode === m.id ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-purple-200'}`}
                  >
                    <div className={`font-bold text-sm ${mode === m.id ? 'text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'}`}>
                      {m.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{m.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              {!enhancedImage ? (
                <button
                  onClick={startUpscale}
                  disabled={isProcessing || !originalImage}
                  className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Processing locally...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Upscale Image
                    </>
                  )}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 block">Format</label>
                      <select 
                        value={exportFormat}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5 dark:text-white"
                      >
                        <option value="image/png">PNG (Lossless)</option>
                        <option value="image/jpeg">JPG (Standard)</option>
                        <option value="image/webp">WEBP (Web)</option>
                      </select>
                    </div>
                    {exportFormat !== 'image/png' && (
                      <div>
                        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 block">Quality: {Math.round(exportQuality * 100)}%</label>
                        <input 
                          type="range" 
                          min="0.1" 
                          max="1.0" 
                          step="0.1" 
                          value={exportQuality} 
                          onChange={(e) => setExportQuality(parseFloat(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-2" 
                        />
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={handleDownload}
                    className="w-full py-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/30 transition-all shadow-lg flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download Enhanced Image
                  </button>

                  <button
                    onClick={startUpscale}
                    disabled={isProcessing}
                    className="w-full py-3 rounded-xl font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-all flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    Reprocess Settings
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
