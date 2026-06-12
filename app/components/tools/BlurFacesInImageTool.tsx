"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Image as ImageIcon, Download, Maximize, Zap, Sparkles, RefreshCw, AlertCircle, ScanFace, MousePointerSquareDashed, Trash2, Eye, ShieldCheck, ChevronRight } from "lucide-react";
import * as faceapi from '@vladmandic/face-api';

interface BoundingBox {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isManual: boolean;
}

export default function BlurFacesInImageTool() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalDimensions, setOriginalDimensions] = useState<{w: number, h: number} | null>(null);
  const [boxes, setBoxes] = useState<BoundingBox[]>([]);
  
  const [isModelsLoaded, setIsModelsLoaded] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [blurMode, setBlurMode] = useState<string>('gaussian');
  const [blurIntensity, setBlurIntensity] = useState<number>(30); // 0-100
  
  const [exportFormat, setExportFormat] = useState<string>('image/jpeg');
  const [exportQuality, setExportQuality] = useState<number>(0.9);

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentDrawBox, setCurrentDrawBox] = useState<{x: number, y: number, width: number, height: number} | null>(null);
  const startPosRef = useRef<{x: number, y: number} | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load face-api models
  useEffect(() => {
    const loadModels = async () => {
      try {
        // We use unpkg CDN to dynamically load the highly optimized Tiny Face Detector weights
        // This ensures the main bundle remains small and Lighthouse scores stay high.
        const modelUrl = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
        await faceapi.nets.tinyFaceDetector.loadFromUri(modelUrl);
        setIsModelsLoaded(true);
      } catch (err) {
        console.error("Failed to load face-api models:", err);
        setError("Failed to initialize AI detection engine. Please check your internet connection.");
      }
    };
    loadModels();
  }, []);

  // Render canvas whenever boxes, blur settings, or image changes
  const renderCanvas = useCallback(() => {
    if (!canvasRef.current || !imageRef.current || !originalImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to match the actual image
    canvas.width = originalDimensions?.w || 0;
    canvas.height = originalDimensions?.h || 0;

    const imageElement = imageRef.current;
    if (!imageElement) return;

    // 1. Draw base image
    ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);

    // 2. Draw active manual selection box if drawing
    if (currentDrawBox) {
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.8)';
      ctx.lineWidth = Math.max(2, canvas.width * 0.005);
      ctx.setLineDash([5, 5]);
      ctx.strokeRect(currentDrawBox.x, currentDrawBox.y, currentDrawBox.width, currentDrawBox.height);
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(99, 102, 241, 0.2)';
      ctx.fillRect(currentDrawBox.x, currentDrawBox.y, currentDrawBox.width, currentDrawBox.height);
    }

    // 3. Apply blur to all confirmed boxes
    boxes.forEach(box => {
      // Ensure box is within bounds
      const x = Math.max(0, box.x);
      const y = Math.max(0, box.y);
      const w = Math.min(box.width, canvas.width - x);
      const h = Math.min(box.height, canvas.height - y);

      if (w <= 0 || h <= 0) return;

      if (blurMode === 'solid') {
        ctx.fillStyle = '#000000';
        ctx.fillRect(x, y, w, h);
      } else if (blurMode === 'gaussian') {
        // We simulate a localized Gaussian blur by extracting the region, applying filter, and drawing back
        // Due to browser security and performance, multiple passes of scaling down and up creates a fast, secure blur
        const offscreen = document.createElement('canvas');
        offscreen.width = w;
        offscreen.height = h;
        const offCtx = offscreen.getContext('2d');
        if (offCtx) {
          // Native canvas filter support
          offCtx.filter = `blur(${(blurIntensity / 100) * 40}px)`;
          offCtx.drawImage(imageElement, x, y, w, h, 0, 0, w, h);
          ctx.drawImage(offscreen, x, y);
        }
      } else if (blurMode === 'pixelate') {
        // Pixelation logic
        // Size of the pixel blocks based on intensity (5 to 50 pixels)
        const blockSize = Math.max(5, Math.floor((blurIntensity / 100) * Math.min(w, h) * 0.2));
        
        const offscreen = document.createElement('canvas');
        // Scale down
        offscreen.width = Math.ceil(w / blockSize);
        offscreen.height = Math.ceil(h / blockSize);
        const offCtx = offscreen.getContext('2d');
        if (offCtx) {
          offCtx.imageSmoothingEnabled = false;
          offCtx.drawImage(imageElement, x, y, w, h, 0, 0, offscreen.width, offscreen.height);
          
          // Scale back up
          ctx.imageSmoothingEnabled = false;
          ctx.drawImage(offscreen, 0, 0, offscreen.width, offscreen.height, x, y, w, h);
          ctx.imageSmoothingEnabled = true; // reset for next operations
        }
      }
    });

  }, [originalImage, originalDimensions, boxes, currentDrawBox, blurMode, blurIntensity]);

  useEffect(() => {
    if (originalImage && originalDimensions) {
      renderCanvas();
    }
  }, [renderCanvas]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setOriginalDimensions({ w: img.width, h: img.height });
      setOriginalImage(imageUrl);
      setBoxes([]);
      setError(null);
    };
    img.onerror = () => {
      setError('Failed to read image.');
    };
    img.src = imageUrl;
  };

  const runAutoDetection = async () => {
    if (!isModelsLoaded || !imageRef.current || !originalDimensions) return;
    
    setIsDetecting(true);
    setError(null);
    
    try {
      // Use TinyFaceDetector for maximum speed in browser
      const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.4 });
      const detections = await faceapi.detectAllFaces(imageRef.current, options);
      
      if (detections.length === 0) {
        setError("No faces automatically detected. Please use the manual selection tool.");
      } else {
        const newBoxes = detections.map(det => {
          // Add a 15% padding around the detected face for better coverage
          const paddingX = det.box.width * 0.15;
          const paddingY = det.box.height * 0.15;
          
          return {
            id: Math.random().toString(36).substr(2, 9),
            x: Math.max(0, det.box.x - paddingX),
            y: Math.max(0, det.box.y - paddingY),
            width: det.box.width + (paddingX * 2),
            height: det.box.height + (paddingY * 2),
            isManual: false
          };
        });
        
        // Append to existing boxes
        setBoxes(prev => [...prev, ...newBoxes]);
      }
    } catch (err) {
      console.error(err);
      setError("AI Detection failed. You can still blur faces manually.");
    } finally {
      setIsDetecting(false);
    }
  };

  const removeBox = (id: string) => {
    setBoxes(prev => prev.filter(box => box.id !== id));
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    
    try {
      const dataUrl = canvasRef.current.toDataURL(exportFormat, exportQuality);
      const link = document.createElement('a');
      const ext = exportFormat.split('/')[1] === 'jpeg' ? 'jpg' : exportFormat.split('/')[1];
      link.download = `anonymized_image_${Date.now()}.${ext}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError("Failed to export image. Try a smaller resolution.");
    }
  };

  // Mouse/Touch events for manual box drawing
  const getCanvasCoordinates = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!canvasRef.current) return null;
    const rect = canvasRef.current.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent | MouseEvent).clientX;
      clientY = (e as React.MouseEvent | MouseEvent).clientY;
    }
    
    // Calculate scale between CSS display size and actual canvas pixel size
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    // Only start drawing if they click directly on the canvas container
    // and aren't clicking a remove button
    if ((e.target as HTMLElement).tagName.toLowerCase() === 'button' || (e.target as HTMLElement).closest('button')) {
      return;
    }

    const pos = getCanvasCoordinates(e);
    if (!pos) return;
    
    setIsDrawing(true);
    startPosRef.current = pos;
    setCurrentDrawBox({ x: pos.x, y: pos.y, width: 0, height: 0 });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !startPosRef.current) return;
    
    const pos = getCanvasCoordinates(e);
    if (!pos) return;

    const x = Math.min(startPosRef.current.x, pos.x);
    const y = Math.min(startPosRef.current.y, pos.y);
    const width = Math.abs(pos.x - startPosRef.current.x);
    const height = Math.abs(pos.y - startPosRef.current.y);

    setCurrentDrawBox({ x, y, width, height });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    if (currentDrawBox && currentDrawBox.width > 20 && currentDrawBox.height > 20) {
      setBoxes(prev => [...prev, {
        id: Math.random().toString(36).substr(2, 9),
        ...currentDrawBox,
        isManual: true
      }]);
    }
    
    setCurrentDrawBox(null);
    startPosRef.current = null;
  };

  return (
    <div className="space-y-8">
      {/* Introduction Header */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          Privacy Protection Studio
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Upload an image to securely blur faces and sensitive data directly on your device. 100% Client-Side.
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

      {/* Hidden image element used for canvas rendering and AI detection */}
      {originalImage && (
        <img 
          ref={imageRef} 
          src={originalImage} 
          crossOrigin="anonymous" 
          alt="Source" 
          style={{ display: 'none' }} 
        />
      )}

      {!originalImage ? (
        // Upload Zone
        <div className="w-full">
          <label className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-2xl cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="w-20 h-20 mb-4 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
              </div>
              <p className="mb-2 text-xl font-bold text-gray-700 dark:text-gray-200">
                Click or drag image to anonymize
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Supports JPG, PNG, WEBP
              </p>
              <div className="mt-6 flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4" />
                Zero Cloud Uploads • Perfect Privacy
              </div>
            </div>
            <input type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileUpload} />
          </label>
        </div>
      ) : (
        // Studio Dashboard
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Panel: Workspace Canvas */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              ref={containerRef}
              className="relative w-full bg-gray-900 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center group touch-none"
              style={{ minHeight: '400px' }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
            >
              {/* The interactive canvas */}
              <canvas 
                ref={canvasRef}
                className="max-w-full max-h-[70vh] object-contain cursor-crosshair"
                style={{ width: '100%', height: 'auto' }}
              />

              {/* Overlay UI for Removing Boxes */}
              <div className="absolute inset-0 pointer-events-none">
                {boxes.map(box => {
                  if (!canvasRef.current || !originalDimensions) return null;
                  
                  // Calculate responsive position for the 'remove' button overlay
                  const rect = canvasRef.current.getBoundingClientRect();
                  const scaleX = rect.width / originalDimensions.w;
                  const scaleY = rect.height / originalDimensions.h;

                  const cssX = box.x * scaleX;
                  const cssY = box.y * scaleY;
                  const cssW = box.width * scaleX;

                  return (
                    <div 
                      key={box.id}
                      className="absolute opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        left: cssX,
                        top: cssY,
                        width: cssW,
                        padding: '4px',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        pointerEvents: 'none'
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeBox(box.id);
                        }}
                        className="pointer-events-auto bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full shadow-lg transition-transform hover:scale-110"
                        title="Remove Blur"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Instructions Overlay (fades out on hover) */}
              {boxes.length === 0 && !isDetecting && !currentDrawBox && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2">
                    <MousePointerSquareDashed className="w-4 h-4" />
                    Click & drag to manually blur, or use AI Detection
                  </div>
                </div>
              )}

            </div>

            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">Faces Protected: </span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {boxes.length}
                </span>
              </div>
              <button 
                onClick={() => {
                  setOriginalImage(null);
                  setOriginalDimensions(null);
                  setBoxes([]);
                }}
                className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                Upload New Image
              </button>
            </div>
          </div>

          {/* Right Panel: Settings */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
            
            {/* AI Detection Action */}
            <div>
              <button
                onClick={runAutoDetection}
                disabled={!isModelsLoaded || isDetecting}
                className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 focus:ring-4 focus:ring-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {isDetecting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Scanning for Faces...
                  </>
                ) : (
                  <>
                    <ScanFace className="w-5 h-5" />
                    Auto-Detect Faces
                  </>
                )}
              </button>
              {!isModelsLoaded && (
                <p className="mt-2 text-xs text-amber-600 dark:text-amber-400 text-center animate-pulse">
                  Loading AI Models securely into browser...
                </p>
              )}
            </div>

            {/* Blur Style Mode */}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Eye className="w-4 h-4 text-emerald-500" />
                Anonymization Style
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'gaussian', name: 'Gaussian Blur' },
                  { id: 'pixelate', name: 'Pixelate' },
                  { id: 'solid', name: 'Solid Box' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setBlurMode(m.id)}
                    className={`py-2 px-1 text-xs rounded-lg border-2 font-bold transition-all ${blurMode === m.id ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-emerald-200'}`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Blur Intensity */}
            {blurMode !== 'solid' && (
              <div>
                <label className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex justify-between">
                  <span>Intensity</span>
                  <span className="text-emerald-600 dark:text-emerald-400">{blurIntensity}%</span>
                </label>
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  value={blurIntensity} 
                  onChange={(e) => setBlurIntensity(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-emerald-500" 
                />
              </div>
            )}

            {/* Manual Controls */}
            {boxes.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                  {boxes.filter(b => b.isManual).length} Manual Boxes, {boxes.filter(b => !b.isManual).length} AI Detected
                </span>
                <button 
                  onClick={() => setBoxes([])}
                  className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Export */}
            <div className="border-t border-gray-100 dark:border-gray-700 pt-6 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1 block">Format</label>
                  <select 
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 dark:text-white"
                  >
                    <option value="image/jpeg">JPG (Standard)</option>
                    <option value="image/png">PNG (Lossless)</option>
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
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-gray-500 mt-2" 
                    />
                  </div>
                )}
              </div>
              
              <button
                onClick={handleDownload}
                disabled={boxes.length === 0}
                className="w-full py-4 rounded-xl font-bold text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 focus:ring-4 focus:ring-gray-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Protected Image
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
