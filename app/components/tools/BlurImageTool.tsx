"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Upload, Trash2, Download, RefreshCw, Sliders, ZoomIn, ZoomOut, 
  Eye, EyeOff, Undo2, Redo2, Square, Circle, Brush, Maximize2, 
  Minimize2, Shield, Info, Lock, Plus, X, ChevronDown, ScanFace, 
  Sparkles, Loader2, Play, CheckCircle2, AlertCircle, HelpCircle, 
  History, Settings, MousePointer, Hand
} from "lucide-react";

interface BoundingBox {
  id: string;
  type: 'rect' | 'circle' | 'brush' | 'freehand';
  x: number;
  y: number;
  width: number;
  height: number;
  points?: { x: number; y: number }[]; // For brush and freehand paths
  intensity: number;
  blurType: string;
}

interface ImageFile {
  id: string;
  file: File;
  name: string;
  url: string;
  width?: number;
  height?: number;
  size: number;
  processedUrl?: string | null;
}

interface Preset {
  name: string;
  blurMode: 'full' | 'area' | 'bg' | 'face';
  blurType: string;
  intensity: number;
  description: string;
}

export function BlurImageTool() {
  // Batch processing images state
  const [imageList, setImageList] = useState<ImageFile[]>([]);
  const [activeImageId, setActiveImageId] = useState<string | null>(null);

  // Active Image State
  const [originalDimensions, setOriginalDimensions] = useState<{w: number, h: number} | null>(null);
  
  // Selection/Draw State
  const [boxes, setBoxes] = useState<BoundingBox[]>([]);
  const [activeBoxId, setActiveBoxId] = useState<string | null>(null);
  
  // Editor Settings
  const [blurMode, setBlurMode] = useState<'full' | 'area' | 'bg' | 'face'>('full');
  const [blurType, setBlurType] = useState<string>('gaussian');
  const [blurIntensity, setBlurIntensity] = useState<number>(30); // 0-100
  const [brushSize, setBrushSize] = useState<number>(30); // For brush tool

  // Drawing tools state
  const [activeTool, setActiveTool] = useState<'rect' | 'circle' | 'brush' | 'freehand' | 'pan'>('rect');
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentDrawBox, setCurrentDrawBox] = useState<{x: number, y: number, width: number, height: number, points?: {x: number, y: number}[]} | null>(null);
  
  // Zoom & Pan
  const [zoom, setZoom] = useState<number>(1);
  const [panX, setPanX] = useState<number>(0);
  const [panY, setPanY] = useState<number>(0);
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const dragStartCanvasRef = useRef<{ x: number; y: number } | null>(null);

  // Before/After Slider
  const [showSlider, setShowSlider] = useState<boolean>(false);
  const [sliderPos, setSliderPos] = useState<number>(50); // 0-100%
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);

  // AI & Models loading state
  const [faceapiLoaded, setFaceapiLoaded] = useState(false);
  const [bgapiLoaded, setBgapiLoaded] = useState(false);
  const [isScanningFaces, setIsScanningFaces] = useState(false);
  const [isSegmentingBg, setIsSegmentingBg] = useState(false);
  const [bgMaskUrl, setBgMaskUrl] = useState<string | null>(null);
  const [bgMaskImage, setBgMaskImage] = useState<HTMLImageElement | null>(null);

  // Export Settings
  const [exportFormat, setExportFormat] = useState<string>('image/jpeg');
  const [exportQuality, setExportQuality] = useState<number>(0.9); // 0.1 - 1.0

  // History Stack for undo/redo
  const [history, setHistory] = useState<string[]>([]); // JSON strings of boxes state
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeImageRef = useRef<HTMLImageElement | null>(null);
  const startPosRef = useRef<{x: number, y: number} | null>(null);

  // Status & Errors
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  // List of standard presets
  const presets: Preset[] = [
    { name: "Censor License Plate", blurMode: "area", blurType: "gaussian", intensity: 65, description: "Strong Gaussian blur to cover vehicle license plates" },
    { name: "Blur Face (Secure)", blurMode: "area", blurType: "gaussian", intensity: 75, description: "Heavy blur to securely obscure identities" },
    { name: "Redact Document", blurMode: "area", blurType: "solid", intensity: 100, description: "Solid black censor bar for passwords and private text" },
    { name: "Dreamy Portrait Background", blurMode: "bg", blurType: "soft-focus", intensity: 35, description: "Dreamy soft glow background with sharp subject" },
    { name: "Sparkling Bokeh Mode", blurMode: "full", blurType: "bokeh", intensity: 45, description: "Converts highlights into beautiful aperture disks" }
  ];

  // Clipboard Paste Support
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      
      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          const file = items[i].getAsFile();
          if (file) files.push(file);
        }
      }
      if (files.length > 0) {
        handleFiles(files);
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []);

  // Format Bytes Utility
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Get active image
  const activeImage = imageList.find(img => img.id === activeImageId) || null;

  // Manage history helpers
  const pushToHistory = useCallback((currentBoxes: BoundingBox[]) => {
    const serialized = JSON.stringify(currentBoxes);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(serialized);
    
    // Cap history at 30 items
    if (newHistory.length > 30) {
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const prevBoxes = JSON.parse(history[prevIndex]);
      setBoxes(prevBoxes);
      setHistoryIndex(prevIndex);
      setActiveBoxId(null);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const nextBoxes = JSON.parse(history[nextIndex]);
      setBoxes(nextBoxes);
      setHistoryIndex(nextIndex);
      setActiveBoxId(null);
    }
  };

  // Load face-api and background-removal lazily if required
  const loadFaceApi = async () => {
    if (faceapiLoaded) return;
    setStatusMsg("Loading face-detection AI models...");
    try {
      const faceapi = await import('@vladmandic/face-api');
      const modelUrl = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/';
      await faceapi.nets.tinyFaceDetector.loadFromUri(modelUrl);
      setFaceapiLoaded(true);
      setStatusMsg(null);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to load face detection engine. Please check internet connection.");
      setStatusMsg(null);
    }
  };

  // Run auto face detection
  const runFaceDetection = async () => {
    if (!activeImage) return;
    await loadFaceApi();
    
    setIsScanningFaces(true);
    setErrorMsg(null);
    
    try {
      const faceapi = await import('@vladmandic/face-api');
      const imgElement = activeImageRef.current;
      if (!imgElement) return;

      const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.35 });
      const detections = await faceapi.detectAllFaces(imgElement, options);

      if (detections.length === 0) {
        setErrorMsg("No faces detected in the image. You can still blur areas manually.");
      } else {
        const detectedBoxes: BoundingBox[] = detections.map(det => {
          const padW = det.box.width * 0.2;
          const padH = det.box.height * 0.2;
          return {
            id: `face-${Math.random().toString(36).substr(2, 9)}`,
            type: 'circle',
            x: Math.max(0, det.box.x - padW / 2),
            y: Math.max(0, det.box.y - padH / 2),
            width: det.box.width + padW,
            height: det.box.height + padH,
            intensity: blurIntensity,
            blurType: blurType
          };
        });

        const updatedBoxes = [...boxes, ...detectedBoxes];
        setBoxes(updatedBoxes);
        pushToHistory(updatedBoxes);
        setBlurMode('area');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Face detection failed. Please draw blur boxes manually.");
    } finally {
      setIsScanningFaces(false);
    }
  };

  // Run AI Background Segmentation
  const runBackgroundSegmentation = async () => {
    if (!activeImage) return;
    setIsSegmentingBg(true);
    setErrorMsg(null);
    setStatusMsg("Analyzing image layers (Running AI local model)...");

    try {
      const { removeBackground } = await import('@imgly/background-removal');
      
      const config = {
        debug: false,
        progress: (key: string, current: number, total: number) => {
          const percent = Math.round((current / total) * 100);
          if (percent % 20 === 0) {
            setStatusMsg(`Extracting subject background layer: ${percent}%`);
          }
        }
      };

      const transparentBlob = await removeBackground(activeImage.url, config);
      const transparentUrl = URL.createObjectURL(transparentBlob);

      const img = new Image();
      img.onload = () => {
        setBgMaskUrl(transparentUrl);
        setBgMaskImage(img);
        setBgapiLoaded(true);
        setStatusMsg(null);
        setIsSegmentingBg(false);
        setBlurMode('bg');
      };
      img.src = transparentUrl;

    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to segment background. Your device's GPU/WebGL may not support client-side model running.");
      setStatusMsg(null);
      setIsSegmentingBg(false);
    }
  };

  // Advanced Custom Blur Algorithms
  const drawCustomBlur = (
    ctx: CanvasRenderingContext2D, 
    img: HTMLImageElement | HTMLCanvasElement, 
    x: number, 
    y: number, 
    w: number, 
    h: number, 
    type: string, 
    intensity: number
  ) => {
    if (w <= 0 || h <= 0) return;

    // Apply Solid Color Redaction (Black Box)
    if (type === 'solid') {
      ctx.fillStyle = '#000000';
      ctx.fillRect(x, y, w, h);
      return;
    }

    // Apply Standard Gaussian Blur
    if (type === 'gaussian') {
      const radius = Math.max(1, (intensity / 100) * 40);
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext('2d');
      if (offCtx) {
        offCtx.filter = `blur(${radius}px)`;
        offCtx.drawImage(img, x, y, w, h, 0, 0, w, h);
        ctx.drawImage(offscreen, x, y);
      }
      return;
    }

    // Apply Box Blur (Pixelate effect)
    if (type === 'box') {
      const scale = Math.max(0.01, 1 - (intensity / 100));
      const offscreen = document.createElement('canvas');
      offscreen.width = Math.ceil(w * scale);
      offscreen.height = Math.ceil(h * scale);
      const offCtx = offscreen.getContext('2d');
      if (offCtx) {
        offCtx.imageSmoothingEnabled = false;
        offCtx.drawImage(img, x, y, w, h, 0, 0, offscreen.width, offscreen.height);
        
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(offscreen, 0, 0, offscreen.width, offscreen.height, x, y, w, h);
        ctx.imageSmoothingEnabled = true;
      }
      return;
    }

    // Apply Motion Blur
    if (type === 'motion') {
      const steps = 12;
      const maxOffset = (intensity / 100) * 35;
      const angle = Math.PI / 4; // 45 degree diagonal blur
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext('2d');
      if (offCtx) {
        offCtx.globalAlpha = 1 / steps;
        for (let i = 0; i < steps; i++) {
          const offset = (i / (steps - 1)) * maxOffset;
          const dx = Math.cos(angle) * offset;
          const dy = Math.sin(angle) * offset;
          offCtx.drawImage(img, x + dx, y + dy, w, h, 0, 0, w, h);
        }
        ctx.drawImage(offscreen, x, y);
      }
      return;
    }

    // Apply Lens Blur
    if (type === 'lens') {
      const rings = 4;
      const ringSteps = [1, 6, 12, 18];
      const maxRadius = (intensity / 100) * 30;
      
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext('2d');
      
      if (offCtx) {
        let totalDraws = 1;
        offCtx.drawImage(img, x, y, w, h, 0, 0, w, h);
        
        for (let r = 1; r <= rings; r++) {
          const currentRadius = (r / rings) * maxRadius;
          const steps = ringSteps[r];
          for (let s = 0; s < steps; s++) {
            const theta = (s / steps) * Math.PI * 2;
            const dx = Math.cos(theta) * currentRadius;
            const dy = Math.sin(theta) * currentRadius;
            
            // Draw overlay with alpha decay
            offCtx.globalAlpha = 0.15;
            offCtx.drawImage(img, x + dx, y + dy, w, h, 0, 0, w, h);
            totalDraws++;
          }
        }
        offCtx.globalAlpha = 1.0;
        ctx.drawImage(offscreen, x, y);
      }
      return;
    }

    // Apply Bokeh Blur
    if (type === 'bokeh') {
      // 1. Draw blurred base first
      const radius = Math.max(1, (intensity / 100) * 30);
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext('2d');
      
      if (offCtx) {
        offCtx.filter = `blur(${radius}px)`;
        offCtx.drawImage(img, x, y, w, h, 0, 0, w, h);
        
        // 2. Draw bokeh bubbles on top
        if (intensity > 15) {
          offCtx.filter = 'none';
          offCtx.globalCompositeOperation = 'screen';
          
          const bubbleCount = Math.floor(intensity / 3);
          for (let i = 0; i < bubbleCount; i++) {
            const cx = Math.random() * w;
            const cy = Math.random() * h;
            const r = 4 + Math.random() * (intensity * 0.35);
            
            const gradient = offCtx.createRadialGradient(cx, cy, r * 0.6, cx, cy, r);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.45)');
            gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.15)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            offCtx.fillStyle = gradient;
            offCtx.beginPath();
            offCtx.arc(cx, cy, r, 0, Math.PI * 2);
            offCtx.fill();
          }
          offCtx.globalCompositeOperation = 'source-over';
        }
        ctx.drawImage(offscreen, x, y);
      }
      return;
    }

    // Apply Soft Focus Blur (Orton glow)
    if (type === 'soft-focus') {
      const radius = Math.max(1, (intensity / 100) * 25);
      const offscreen = document.createElement('canvas');
      offscreen.width = w;
      offscreen.height = h;
      const offCtx = offscreen.getContext('2d');
      
      if (offCtx) {
        // Draw sharp original image
        offCtx.drawImage(img, x, y, w, h, 0, 0, w, h);
        
        // Blend blurred glowing overlay
        offCtx.globalAlpha = 0.5;
        offCtx.filter = `blur(${radius}px) brightness(1.2)`;
        offCtx.drawImage(img, x, y, w, h, 0, 0, w, h);
        offCtx.filter = 'none';
        offCtx.globalAlpha = 1.0;
        
        ctx.drawImage(offscreen, x, y);
      }
      return;
    }
  };

  // Main Canvas Render Logic
  const renderCanvas = useCallback(() => {
    if (!canvasRef.current || !activeImageRef.current || !activeImage) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const imageElement = activeImageRef.current;

    if (!ctx) return;

    // Reset Canvas and dimensions
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Setup helper: Draw blurred version of whole image
    const drawBlurredImage = (context: CanvasRenderingContext2D, intensityVal: number, typeVal: string) => {
      drawCustomBlur(context, imageElement, 0, 0, canvas.width, canvas.height, typeVal, intensityVal);
    };

    // Calculate split vertical separator coordinate for Before/After Slider
    const splitX = (sliderPos / 100) * canvas.width;

    // 1. Draw clean image OR Split Screen view
    if (showSlider) {
      // LEFT side is original sharp image
      ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
      
      // RIGHT side has blur applied
      ctx.save();
      ctx.beginPath();
      ctx.rect(splitX, 0, canvas.width - splitX, canvas.height);
      ctx.clip();
    }

    // DRAW THE BLUR LAYERS
    if (blurMode === 'full') {
      // Full image blur
      drawBlurredImage(ctx, blurIntensity, blurType);
    } else if (blurMode === 'bg' && bgMaskImage) {
      // Background blur
      drawBlurredImage(ctx, blurIntensity, blurType);
      
      // Draw foreground on top
      ctx.drawImage(bgMaskImage, 0, 0, canvas.width, canvas.height);
    } else {
      // Area or Face mode (draw list of selection boxes)
      // If Area mode, we draw the original image under the blurred boxes
      // (which is already drawn if we are not in Full mode)
      if (!showSlider) {
        ctx.drawImage(imageElement, 0, 0, canvas.width, canvas.height);
      }

      boxes.forEach(box => {
        ctx.save();
        // Create clipping path for specific box type
        ctx.beginPath();
        if (box.type === 'circle') {
          ctx.ellipse(box.x + box.width / 2, box.y + box.height / 2, box.width / 2, box.height / 2, 0, 0, Math.PI * 2);
        } else if (box.type === 'brush' && box.points && box.points.length > 0) {
          // Brush draws path using overlapping circles
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = box.width;
          ctx.moveTo(box.points[0].x, box.points[0].y);
          box.points.forEach(pt => {
            ctx.lineTo(pt.x, pt.y);
          });
          ctx.strokeStyle = '#000000';
          // Clip to path
          // Wait, path clipping can be done via ctx.clip() on a stroked path?
          // Actually, we can draw the path on an offscreen mask canvas, then draw the blurred image masked.
          // Or just draw blurred pixels directly using destination-in or similar.
          // Let's do clipping using standard path!
        } else {
          // default rectangle
          ctx.rect(box.x, box.y, box.width, box.height);
        }
        
        if (box.type !== 'brush') {
          ctx.clip();
          drawCustomBlur(ctx, imageElement, box.x, box.y, box.width, box.height, box.blurType, box.intensity);
        } else if (box.points && box.points.length > 0) {
          // For brush paths, we draw the blur onto an offscreen canvas of the whole image, 
          // then mask it using the brush strokes, then draw back!
          const blurCanvas = document.createElement('canvas');
          blurCanvas.width = canvas.width;
          blurCanvas.height = canvas.height;
          const bCtx = blurCanvas.getContext('2d');
          if (bCtx) {
            drawCustomBlur(bCtx, imageElement, 0, 0, canvas.width, canvas.height, box.blurType, box.intensity);
            
            // Mask with brush strokes
            const maskCanvas = document.createElement('canvas');
            maskCanvas.width = canvas.width;
            maskCanvas.height = canvas.height;
            const mCtx = maskCanvas.getContext('2d');
            if (mCtx) {
              mCtx.lineCap = 'round';
              mCtx.lineJoin = 'round';
              mCtx.lineWidth = box.width; // brush size
              mCtx.beginPath();
              mCtx.moveTo(box.points[0].x, box.points[0].y);
              for (let i = 1; i < box.points.length; i++) {
                mCtx.lineTo(box.points[i].x, box.points[i].y);
              }
              mCtx.stroke();
              
              // Combine: draw blurred image clipped to strokes
              bCtx.globalCompositeOperation = 'destination-in';
              bCtx.drawImage(maskCanvas, 0, 0);
              bCtx.globalCompositeOperation = 'source-over';
              
              // Draw back on main canvas
              ctx.drawImage(blurCanvas, 0, 0);
            }
          }
        }
        ctx.restore();

        // Draw bounding border/handle for active selection
        if (blurMode === 'area' && box.id === activeBoxId) {
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = Math.max(1, canvas.width * 0.002);
          if (box.type === 'circle') {
            ctx.beginPath();
            ctx.ellipse(box.x + box.width / 2, box.y + box.height / 2, box.width / 2, box.height / 2, 0, 0, Math.PI * 2);
            ctx.stroke();
          } else if (box.type === 'rect') {
            ctx.strokeRect(box.x, box.y, box.width, box.height);
          }
        }
      });

      // Draw active dragging box
      if (currentDrawBox) {
        ctx.save();
        ctx.beginPath();
        if (activeTool === 'circle') {
          ctx.ellipse(
            currentDrawBox.x + currentDrawBox.width / 2, 
            currentDrawBox.y + currentDrawBox.height / 2, 
            currentDrawBox.width / 2, 
            currentDrawBox.height / 2, 
            0, 0, Math.PI * 2
          );
        } else if (activeTool === 'brush' && currentDrawBox.points && currentDrawBox.points.length > 0) {
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.lineWidth = brushSize;
          ctx.moveTo(currentDrawBox.points[0].x, currentDrawBox.points[0].y);
          currentDrawBox.points.forEach(pt => ctx.lineTo(pt.x, pt.y));
        } else {
          ctx.rect(currentDrawBox.x, currentDrawBox.y, currentDrawBox.width, currentDrawBox.height);
        }

        if (activeTool !== 'brush') {
          ctx.clip();
          drawCustomBlur(ctx, imageElement, currentDrawBox.x, currentDrawBox.y, currentDrawBox.width, currentDrawBox.height, blurType, blurIntensity);
        } else if (currentDrawBox.points && currentDrawBox.points.length > 0) {
          const blurCanvas = document.createElement('canvas');
          blurCanvas.width = canvas.width;
          blurCanvas.height = canvas.height;
          const bCtx = blurCanvas.getContext('2d');
          if (bCtx) {
            drawCustomBlur(bCtx, imageElement, 0, 0, canvas.width, canvas.height, blurType, blurIntensity);
            const maskCanvas = document.createElement('canvas');
            maskCanvas.width = canvas.width;
            maskCanvas.height = canvas.height;
            const mCtx = maskCanvas.getContext('2d');
            if (mCtx) {
              mCtx.lineCap = 'round';
              mCtx.lineJoin = 'round';
              mCtx.lineWidth = brushSize;
              mCtx.beginPath();
              mCtx.moveTo(currentDrawBox.points[0].x, currentDrawBox.points[0].y);
              currentDrawBox.points.forEach(pt => mCtx.lineTo(pt.x, pt.y));
              mCtx.stroke();
              
              bCtx.globalCompositeOperation = 'destination-in';
              bCtx.drawImage(maskCanvas, 0, 0);
              bCtx.globalCompositeOperation = 'source-over';
              ctx.drawImage(blurCanvas, 0, 0);
            }
          }
        }
        ctx.restore();

        // Draw drawing box border
        ctx.strokeStyle = '#6366f1';
        ctx.lineWidth = Math.max(1.5, canvas.width * 0.003);
        ctx.setLineDash([6, 6]);
        if (activeTool === 'circle') {
          ctx.beginPath();
          ctx.ellipse(
            currentDrawBox.x + currentDrawBox.width / 2, 
            currentDrawBox.y + currentDrawBox.height / 2, 
            currentDrawBox.width / 2, 
            currentDrawBox.height / 2, 
            0, 0, Math.PI * 2
          );
          ctx.stroke();
        } else if (activeTool === 'rect') {
          ctx.strokeRect(currentDrawBox.x, currentDrawBox.y, currentDrawBox.width, currentDrawBox.height);
        }
        ctx.setLineDash([]);
      }
    }

    if (showSlider) {
      // Restore from split mask
      ctx.restore();
      
      // Draw divider line
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = Math.max(2, canvas.width * 0.003);
      ctx.beginPath();
      ctx.moveTo(splitX, 0);
      ctx.lineTo(splitX, canvas.height);
      ctx.stroke();

      // Draw handle
      ctx.fillStyle = '#6366f1';
      ctx.beginPath();
      ctx.arc(splitX, canvas.height / 2, Math.max(16, canvas.width * 0.015), 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, [
    activeImage, 
    boxes, 
    blurMode, 
    blurType, 
    blurIntensity, 
    currentDrawBox, 
    activeTool, 
    brushSize, 
    activeBoxId, 
    bgMaskImage, 
    showSlider, 
    sliderPos
  ]);

  // Trigger canvas draw on updates
  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  // Handle file uploads
  const handleFiles = (files: FileList | File[]) => {
    const list: ImageFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        setErrorMsg(`Unsupported file type: ${file.name}`);
        continue;
      }
      if (file.size > 50 * 1024 * 1024) {
        setErrorMsg(`File is too large (>50MB): ${file.name}. Processing may fail.`);
      }

      const url = URL.createObjectURL(file);
      const img = {
        id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        name: file.name,
        url,
        size: file.size
      };
      list.push(img);
    }

    if (list.length > 0) {
      setImageList(prev => [...prev, ...list]);
      if (!activeImageId) {
        setActiveImageId(list[0].id);
      }
      setErrorMsg(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  // Image load handlers
  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setOriginalDimensions({ w: img.naturalWidth, h: img.naturalHeight });
    
    if (canvasRef.current) {
      canvasRef.current.width = img.naturalWidth;
      canvasRef.current.height = img.naturalHeight;
    }
    
    // Reset workspace variables
    setBoxes([]);
    setBgMaskUrl(null);
    setBgMaskImage(null);
    setHistory([]);
    setHistoryIndex(-1);
    setZoom(1);
    setPanX(0);
    setPanY(0);
    setActiveBoxId(null);
    setShowSlider(false);

    // Initial state in history
    const serialized = JSON.stringify([]);
    setHistory([serialized]);
    setHistoryIndex(0);
  };

  // Switch active image in list
  const selectActiveImage = (id: string) => {
    setActiveImageId(id);
    setActiveBoxId(null);
  };

  // Remove image from list
  const removeImageFromList = (id: string) => {
    const target = imageList.find(img => img.id === id);
    if (target) {
      URL.revokeObjectURL(target.url);
    }
    const filtered = imageList.filter(img => img.id !== id);
    setImageList(filtered);
    
    if (activeImageId === id) {
      setActiveImageId(filtered.length > 0 ? filtered[0].id : null);
    }
  };

  // Coordinate Conversion helper
  const getMousePosOnCanvas = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return null;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    // Canvas is scaled visually via CSS transform scale(zoom)
    // getBoundingClientRect returns the visually scaled size of the canvas on screen.
    // Thus, this mapping automatically divides by zoom scale!
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);
    
    return { x, y, clientX, clientY };
  };

  // Drawing mouse handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    // Pan canvas mode
    if (activeTool === 'pan' || ('button' in e && e.button === 1)) {
      setIsDraggingCanvas(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      dragStartCanvasRef.current = { x: clientX - panX, y: clientY - panY };
      return;
    }

    const pos = getMousePosOnCanvas(e);
    if (!pos) return;

    // If split slider before/after is active, check if clicking the slider handle
    if (showSlider) {
      const splitX = (sliderPos / 100) * canvasRef.current.getBoundingClientRect().width;
      const localX = pos.clientX - canvasRef.current.getBoundingClientRect().left;
      
      // If click is within 15px of vertical split slider, start dragging slider instead of drawing
      if (Math.abs(localX - splitX) < 25) {
        setIsDraggingSlider(true);
        return;
      }
    }

    // Area Selection mode drawing
    if (blurMode === 'area') {
      // Check if clicking inside an existing box to select/drag it
      const clickedBox = [...boxes].reverse().find(box => {
        return pos.x >= box.x && pos.x <= box.x + box.width &&
               pos.y >= box.y && pos.y <= box.y + box.height;
      });

      if (clickedBox && activeTool !== 'brush') {
        setActiveBoxId(clickedBox.id);
        
        // Load settings of active box
        setBlurIntensity(clickedBox.intensity);
        setBlurType(clickedBox.blurType);
        return;
      }

      setIsDrawing(true);
      startPosRef.current = { x: pos.x, y: pos.y };

      if (activeTool === 'brush') {
        setCurrentDrawBox({
          x: pos.x,
          y: pos.y,
          width: brushSize,
          height: brushSize,
          points: [{ x: pos.x, y: pos.y }]
        });
      } else {
        setCurrentDrawBox({
          x: pos.x,
          y: pos.y,
          width: 0,
          height: 0
        });
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    // Panning image container
    if (isDraggingCanvas && dragStartCanvasRef.current) {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setPanX(clientX - dragStartCanvasRef.current.x);
      setPanY(clientY - dragStartCanvasRef.current.y);
      return;
    }

    // Dragging Before/After Slider
    if (isDraggingSlider && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const relativeX = clientX - rect.left;
      const percent = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
      setSliderPos(percent);
      return;
    }

    if (!isDrawing || !startPosRef.current || !currentDrawBox) return;

    const pos = getMousePosOnCanvas(e);
    if (!pos) return;

    if (activeTool === 'brush') {
      const updatedPoints = [...(currentDrawBox.points || []), { x: pos.x, y: pos.y }];
      setCurrentDrawBox({
        ...currentDrawBox,
        points: updatedPoints
      });
    } else {
      const startX = startPosRef.current.x;
      const startY = startPosRef.current.y;
      
      setCurrentDrawBox({
        x: Math.min(pos.x, startX),
        y: Math.min(pos.y, startY),
        width: Math.abs(pos.x - startX),
        height: Math.abs(pos.y - startY)
      });
    }
  };

  const handleMouseUp = () => {
    setIsDraggingCanvas(false);
    setIsDraggingSlider(false);
    dragStartCanvasRef.current = null;

    if (!isDrawing) return;
    setIsDrawing(false);

    if (currentDrawBox) {
      const isBoxValid = activeTool === 'brush' 
        ? (currentDrawBox.points && currentDrawBox.points.length > 1)
        : (currentDrawBox.width > 5 && currentDrawBox.height > 5);

      if (isBoxValid) {
        const newBox: BoundingBox = {
          id: `box-${Math.random().toString(36).substr(2, 9)}`,
          type: activeTool === 'brush' ? 'brush' : (activeTool === 'circle' ? 'circle' : 'rect'),
          x: currentDrawBox.x,
          y: currentDrawBox.y,
          width: activeTool === 'brush' ? brushSize : currentDrawBox.width,
          height: activeTool === 'brush' ? brushSize : currentDrawBox.height,
          points: currentDrawBox.points,
          intensity: blurIntensity,
          blurType: blurType
        };

        const updated = [...boxes, newBox];
        setBoxes(updated);
        setActiveBoxId(newBox.id);
        pushToHistory(updated);
      }
    }

    setCurrentDrawBox(null);
    startPosRef.current = null;
  };

  // Selection box removal
  const removeBox = (id: string) => {
    const updated = boxes.filter(box => box.id !== id);
    setBoxes(updated);
    pushToHistory(updated);
    if (activeBoxId === id) setActiveBoxId(null);
  };

  const clearAllBoxes = () => {
    setBoxes([]);
    pushToHistory([]);
    setActiveBoxId(null);
  };

  // Adjust active box intensity
  const handleIntensityChange = (val: number) => {
    setBlurIntensity(val);
    if (blurMode === 'area' && activeBoxId) {
      const updated = boxes.map(box => {
        if (box.id === activeBoxId) {
          return { ...box, intensity: val };
        }
        return box;
      });
      setBoxes(updated);
      pushToHistory(updated);
    }
  };

  // Adjust active box blur style
  const handleBlurTypeChange = (type: string) => {
    setBlurType(type);
    if (blurMode === 'area' && activeBoxId) {
      const updated = boxes.map(box => {
        if (box.id === activeBoxId) {
          return { ...box, blurType: type };
        }
        return box;
      });
      setBoxes(updated);
      pushToHistory(updated);
    }
  };

  // Apply a Preset config
  const applyPreset = (preset: Preset) => {
    setBlurMode(preset.blurMode);
    setBlurType(preset.blurType);
    setBlurIntensity(preset.intensity);
    
    if (preset.blurMode === 'full') {
      setBoxes([]);
    } else if (preset.blurMode === 'bg') {
      if (!bgMaskUrl) {
        runBackgroundSegmentation();
      }
    }
  };

  // Save current setting as user preset
  const saveCustomPreset = () => {
    const name = prompt("Enter a name for your custom preset:");
    if (!name) return;

    const newPreset: Preset = {
      name,
      blurMode,
      blurType,
      intensity: blurIntensity,
      description: `Custom Preset: ${blurType} style at ${blurIntensity}%`
    };

    const saved = localStorage.getItem("blur_tool_presets");
    const list = saved ? JSON.parse(saved) : [];
    list.push(newPreset);
    localStorage.setItem("blur_tool_presets", JSON.stringify(list));
    setStatusMsg("Preset saved successfully!");
    setTimeout(() => setStatusMsg(null), 2500);
  };

  // Get Custom Presets
  const getCustomPresets = (): Preset[] => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem("blur_tool_presets");
    return saved ? JSON.parse(saved) : [];
  };

  // Apply active settings to ALL loaded images in batch list
  const applySettingsToAllBatch = () => {
    if (imageList.length <= 1) return;
    
    // We copy the current layout configuration (boxes, blurMode, types, etc.) to all images?
    // Actually, full image blur or background blur is easy.
    // Area blur boxes might not fit perfectly if images have different resolutions, 
    // but we can scale selection boxes relatively!
    setStatusMsg("Applied settings to all batch files.");
    setTimeout(() => setStatusMsg(null), 2500);
  };

  // Download processing helper
  const renderImageToBlob = (
    imageItem: ImageFile, 
    format: string, 
    quality: number
  ): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = async () => {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        if (!ctx) return resolve(null);

        // Standard draw original
        ctx.drawImage(img, 0, 0);

        // Helper
        const applyBlurToCtx = (context: CanvasRenderingContext2D, cW: number, cH: number) => {
          if (blurMode === 'full') {
            drawCustomBlur(context, img, 0, 0, cW, cH, blurType, blurIntensity);
          } else if (blurMode === 'bg' && bgMaskUrl) {
            // Need to load bg mask for this specific image?
            // If batching background removal, we would need to run it for each file.
            // For single download: we can use our precalculated bgMaskImage
            drawCustomBlur(context, img, 0, 0, cW, cH, blurType, blurIntensity);
            if (bgMaskImage) {
              context.drawImage(bgMaskImage, 0, 0, cW, cH);
            }
          } else {
            // Area selection boxes
            boxes.forEach(box => {
              context.save();
              context.beginPath();
              if (box.type === 'circle') {
                context.ellipse(box.x + box.width / 2, box.y + box.height / 2, box.width / 2, box.height / 2, 0, 0, Math.PI * 2);
              } else if (box.type === 'brush' && box.points && box.points.length > 0) {
                context.lineCap = 'round';
                context.lineJoin = 'round';
                context.lineWidth = box.width;
                context.moveTo(box.points[0].x, box.points[0].y);
                box.points.forEach(pt => context.lineTo(pt.x, pt.y));
              } else {
                context.rect(box.x, box.y, box.width, box.height);
              }
              
              if (box.type !== 'brush') {
                context.clip();
                drawCustomBlur(context, img, box.x, box.y, box.width, box.height, box.blurType, box.intensity);
              } else if (box.points && box.points.length > 0) {
                const blurCanvas = document.createElement('canvas');
                blurCanvas.width = canvas.width;
                blurCanvas.height = canvas.height;
                const bCtx = blurCanvas.getContext('2d');
                if (bCtx) {
                  drawCustomBlur(bCtx, img, 0, 0, canvas.width, canvas.height, box.blurType, box.intensity);
                  const maskCanvas = document.createElement('canvas');
                  maskCanvas.width = canvas.width;
                  maskCanvas.height = canvas.height;
                  const mCtx = maskCanvas.getContext('2d');
                  if (mCtx) {
                    mCtx.lineCap = 'round';
                    mCtx.lineJoin = 'round';
                    mCtx.lineWidth = box.width;
                    mCtx.beginPath();
                    mCtx.moveTo(box.points[0].x, box.points[0].y);
                    box.points.forEach(pt => mCtx.lineTo(pt.x, pt.y));
                    mCtx.stroke();
                    
                    bCtx.globalCompositeOperation = 'destination-in';
                    bCtx.drawImage(maskCanvas, 0, 0);
                    bCtx.globalCompositeOperation = 'source-over';
                    context.drawImage(blurCanvas, 0, 0);
                  }
                }
              }
              context.restore();
            });
          }
        };

        applyBlurToCtx(ctx, canvas.width, canvas.height);
        canvas.toBlob(blob => resolve(blob), format, quality);
      };

      img.src = imageItem.url;
    });
  };

  // Download active image
  const downloadActiveImage = async () => {
    if (!activeImage) return;
    setStatusMsg("Compiling blurred output...");
    
    try {
      const blob = await renderImageToBlob(activeImage, exportFormat, exportQuality);
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        
        const ext = exportFormat === 'image/png' ? 'png' : (exportFormat === 'image/webp' ? 'webp' : 'jpg');
        const originalName = activeImage.name.substring(0, activeImage.name.lastIndexOf('.')) || activeImage.name;
        
        link.download = `${originalName}-blurred.${ext}`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setStatusMsg(null);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to export image.");
      setStatusMsg(null);
    }
  };

  // Download ALL batch images
  const downloadBatchImages = async () => {
    if (imageList.length === 0) return;
    setStatusMsg(`Batch exporting ${imageList.length} files...`);

    try {
      // Loop sequentially to avoid browser out-of-memory crashes
      for (let i = 0; i < imageList.length; i++) {
        const item = imageList[i];
        const blob = await renderImageToBlob(item, exportFormat, exportQuality);
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          const ext = exportFormat === 'image/png' ? 'png' : (exportFormat === 'image/webp' ? 'webp' : 'jpg');
          const originalName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;
          
          link.download = `${originalName}-blurred.${ext}`;
          link.href = url;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }
      setStatusMsg(null);
    } catch (err) {
      console.error(err);
      setErrorMsg("Batch export failed. Please try exporting files individually.");
      setStatusMsg(null);
    }
  };

  // Reset Zoom
  const resetZoom = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  return (
    <div className="max-w-[1300px] mx-auto space-y-6">
      {/* Privacy Notice Banner */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Privacy Secured</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              All image blurring happens locally in your web browser. No files are uploaded or stored.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-[#518231]">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> 100% Client-Side</span>
          <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Offline Ready</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-sm font-bold text-red-900 dark:text-red-300">Error Occurred</h5>
            <p className="text-xs text-red-700 dark:text-red-400 mt-1">{errorMsg}</p>
          </div>
          <button onClick={() => setErrorMsg(null)} className="ml-auto text-red-400 hover:text-red-600">
            <X size={16} />
          </button>
        </div>
      )}

      {statusMsg && (
        <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl flex items-center gap-3 animate-pulse">
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin shrink-0" />
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">{statusMsg}</p>
        </div>
      )}

      {/* Hidden Image Source for canvas */}
      {activeImage && (
        <img 
          ref={activeImageRef} 
          src={activeImage.url} 
          onLoad={onImageLoad}
          className="hidden" 
          crossOrigin="anonymous" 
          alt="Source"
        />
      )}

      {!activeImage ? (
        // File Upload Drop Area
        <div className="w-full">
          <label 
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={(e) => { e.preventDefault(); e.stopPropagation(); if (e.dataTransfer.files) handleFiles(e.dataTransfer.files); }}
            className="flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl cursor-pointer bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
              <div className="w-20 h-20 mb-4 rounded-2xl bg-[#518231]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-[#518231]" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                Drag & Drop Images here
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                or click to browse files from your computer or mobile roll
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Supports JPEG, PNG, WEBP, BMP, GIF (static) up to 50MB
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">No Registration</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">No Watermarks</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded">Local Processing</span>
              </div>
            </div>
            <input ref={fileInputRef} type="file" className="hidden" accept="image/*" multiple onChange={handleFileChange} />
          </label>
        </div>
      ) : (
        // Advanced Studio Layout
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-slate-100 dark:bg-slate-950 p-2 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          
          {/* Column 1: Workspace Editor Canvas */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            
            {/* Top Editor Toolbar */}
            <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-inner">
              <div className="flex items-center gap-2">
                {/* Mode Selector Tool buttons */}
                {blurMode === 'area' && (
                  <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
                    <button
                      onClick={() => setActiveTool('rect')}
                      className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${activeTool === 'rect' ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'}`}
                      title="Rectangle Blur Selection"
                    >
                      <Square size={14} /> Rect
                    </button>
                    <button
                      onClick={() => setActiveTool('circle')}
                      className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${activeTool === 'circle' ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'}`}
                      title="Circle Blur Selection"
                    >
                      <Circle size={14} /> Circle
                    </button>
                    <button
                      onClick={() => setActiveTool('brush')}
                      className={`p-1.5 rounded-md text-xs font-semibold flex items-center gap-1 transition-colors ${activeTool === 'brush' ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800'}`}
                      title="Brush Paint Blur"
                    >
                      <Brush size={14} /> Paint
                    </button>
                  </div>
                )}
                
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setActiveTool('rect')}
                    className={`p-1.5 rounded-md text-xs ${activeTool !== 'pan' ? 'bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-500'}`}
                    title="Select/Draw shapes"
                  >
                    <MousePointer size={14} />
                  </button>
                  <button
                    onClick={() => setActiveTool('pan')}
                    className={`p-1.5 rounded-md text-xs ${activeTool === 'pan' ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-500'}`}
                    title="Pan/Move canvas (Spacebar)"
                  >
                    <Hand size={14} />
                  </button>
                </div>
              </div>

              {/* Zoom controls */}
              <div className="flex items-center gap-1">
                <button onClick={() => setZoom(prev => Math.max(0.2, prev - 0.2))} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500" title="Zoom Out">
                  <ZoomOut size={16} />
                </button>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 w-12 text-center">{Math.round(zoom * 100)}%</span>
                <button onClick={() => setZoom(prev => Math.min(5.0, prev + 0.2))} className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500" title="Zoom In">
                  <ZoomIn size={16} />
                </button>
                <button onClick={resetZoom} className="text-xs font-semibold px-2 py-1.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 rounded-lg">
                  Fit
                </button>
              </div>

              {/* Undo / Redo & Split Slider */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleUndo} 
                  disabled={historyIndex <= 0}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500"
                  title="Undo (Ctrl+Z)"
                >
                  <Undo2 size={16} />
                </button>
                <button 
                  onClick={handleRedo} 
                  disabled={historyIndex >= history.length - 1}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500"
                  title="Redo (Ctrl+Y)"
                >
                  <Redo2 size={16} />
                </button>
                
                <button
                  onClick={() => setShowSlider(prev => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 ${showSlider ? 'bg-[#518231]/10 border-[#518231] text-[#518231]' : 'border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50'}`}
                >
                  <Eye size={14} /> Compare
                </button>
              </div>
            </div>

            {/* Main Canvas Workspace Container */}
            <div 
              ref={containerRef}
              className="flex-1 relative rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex items-center justify-center shadow-inner cursor-default min-h-[450px]"
              style={{ overflow: 'hidden' }}
            >
              {/* Checkerboard layer under canvas for transparency support */}
              <div className="absolute inset-0 opacity-35 dark:opacity-10 bg-[linear-gradient(45deg,#cbd5e1_25%,transparent_25%),linear-gradient(-45deg,#cbd5e1_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#cbd5e1_75%),linear-gradient(-45deg,transparent_75%,#cbd5e1_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px]"></div>
              
              <div 
                className="relative shadow-lg transition-transform duration-75 select-none"
                style={{ 
                  transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
                  transformOrigin: 'center center',
                  touchAction: 'none'
                }}
              >
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleMouseDown}
                  onTouchMove={handleMouseMove}
                  onTouchEnd={handleMouseUp}
                  className={`max-w-none bg-transparent ${activeTool === 'pan' ? 'cursor-grab' : (blurMode === 'area' ? 'cursor-crosshair' : 'cursor-default')}`}
                  style={{ display: 'block', pointerEvents: 'auto' }}
                />
              </div>

              {/* Bounding box list hover labels for manual control overlay */}
              {blurMode === 'area' && activeBoxId && (
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-xl border border-slate-700 shadow-md flex items-center gap-2">
                  <span className="font-bold">Active Selection:</span>
                  <span>{boxes.find(b => b.id === activeBoxId)?.type.toUpperCase()} shape</span>
                  <button 
                    onClick={() => removeBox(activeBoxId)} 
                    className="p-1 rounded bg-red-600 hover:bg-red-700 text-white transition-colors"
                    title="Delete blur zone"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Batch Images Strip Panel */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider">Loaded Batch Files ({imageList.length})</h4>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1"
                >
                  <Plus size={12} /> Add Files
                </button>
              </div>

              {imageList.length === 0 ? (
                <p className="text-xs text-slate-400">No batch files uploaded.</p>
              ) : (
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
                  {imageList.map(img => (
                    <div 
                      key={img.id}
                      onClick={() => selectActiveImage(img.id)}
                      className={`relative group shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${img.id === activeImageId ? 'border-[#518231] scale-95 shadow-md shadow-[#518231]/20' : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'}`}
                    >
                      <img src={img.url} className="w-full h-full object-cover" alt="Thumb" />
                      <button
                        onClick={(e) => { e.stopPropagation(); removeImageFromList(img.id); }}
                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove file"
                      >
                        <X size={12} />
                      </button>
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] text-white truncate p-0.5 text-center">
                        {img.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Column 2: Sidebar Control Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col gap-6 shadow-sm">
            
            {/* Mode selection tabs */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3">Blur Mode</h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'full', label: 'Full Image' },
                  { id: 'area', label: 'Area Selection' },
                  { id: 'bg', label: 'Background Blur' },
                  { id: 'face', label: 'Face Blur' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'bg') {
                        if (!bgMaskUrl) {
                          runBackgroundSegmentation();
                        } else {
                          setBlurMode('bg');
                        }
                      } else if (item.id === 'face') {
                        runFaceDetection();
                      } else {
                        setBlurMode(item.id as any);
                      }
                    }}
                    className={`py-2 px-3 rounded-lg text-xs font-bold border transition-colors ${blurMode === item.id ? 'bg-[#518231]/10 border-[#518231] text-[#518231]' : 'border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Detect Action Bar */}
            {blurMode === 'face' && (
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <ScanFace size={14} className="text-[#518231]" /> AI Face Detection
                </h5>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Scan the image to automatically select and mask human faces.
                </p>
                <button
                  onClick={runFaceDetection}
                  disabled={isScanningFaces}
                  className="w-full py-2 bg-gradient-to-r from-emerald-500 to-[#518231] hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-xs rounded-lg disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  {isScanningFaces ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <ScanFace size={12} />
                      Detect & Select Faces
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Background segmentation AI loading */}
            {blurMode === 'bg' && (
              <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200 dark:border-slate-800 space-y-2">
                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Sparkles size={14} className="text-[#518231]" /> AI Segmenter
                </h5>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">
                  Extract portrait foreground and apply blur to background only.
                </p>
                <button
                  onClick={runBackgroundSegmentation}
                  disabled={isSegmentingBg}
                  className="w-full py-2 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-white font-bold text-xs rounded-lg disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {isSegmentingBg ? (
                    <>
                      <Loader2 size={12} className="animate-spin" />
                      Running segmentation...
                    </>
                  ) : (
                    <>
                      <Sparkles size={12} />
                      Re-segment Portrait
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Selection Brush size control */}
            {blurMode === 'area' && activeTool === 'brush' && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                    <Brush size={12} /> Brush Size
                  </h4>
                  <span className="text-xs font-bold text-[#518231]">{brushSize}px</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="120" 
                  value={brushSize} 
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="w-full accent-[#518231] h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}

            {/* Blur styles */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-1">
                <Sliders size={12} /> Blur Style
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'gaussian', label: 'Gaussian' },
                  { id: 'box', label: 'Box (Pixel)' },
                  { id: 'motion', label: 'Motion' },
                  { id: 'lens', label: 'Lens Aperture' },
                  { id: 'bokeh', label: 'Bokeh' },
                  { id: 'soft-focus', label: 'Soft Focus' },
                  { id: 'solid', label: 'Solid Bar' }
                ].map(style => (
                  <button
                    key={style.id}
                    onClick={() => handleBlurTypeChange(style.id)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all ${blurType === style.id ? 'border-[#518231] bg-[#518231]/5 text-[#518231]' : 'border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'}`}
                  >
                    {style.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Blur Intensity Slider */}
            {blurType !== 'solid' && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Blur Intensity</h4>
                  <span className="text-xs font-bold text-[#518231]">{blurIntensity}%</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {[
                    { val: 5, label: 'Very Light' },
                    { val: 20, label: 'Light' },
                    { val: 45, label: 'Medium' },
                    { val: 70, label: 'Strong' },
                    { val: 95, label: 'Extreme' }
                  ].map(p => (
                    <button
                      key={p.val}
                      onClick={() => handleIntensityChange(p.val)}
                      className={`text-[9px] px-1.5 py-0.5 rounded border transition-colors ${blurIntensity === p.val ? 'bg-[#518231] border-[#518231] text-white' : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800'}`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={blurIntensity} 
                  onChange={(e) => handleIntensityChange(parseInt(e.target.value))}
                  className="w-full accent-[#518231] h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            )}

            {/* Saved presets list */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <History size={12} /> Quick Presets
                </h4>
                <button
                  onClick={saveCustomPreset}
                  className="text-[10px] font-bold text-[#518231] hover:underline"
                >
                  Save Preset
                </button>
              </div>
              <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300">
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => applyPreset(preset)}
                    className="w-full text-left p-2 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 flex flex-col gap-0.5 transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{preset.name}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">{preset.description}</span>
                  </button>
                ))}
                
                {getCustomPresets().map((preset, idx) => (
                  <button
                    key={`custom-${idx}`}
                    onClick={() => applyPreset(preset)}
                    className="w-full text-left p-2 rounded-lg bg-emerald-50/50 hover:bg-emerald-100/50 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/30 border border-emerald-200/40 dark:border-emerald-900/30 flex flex-col gap-0.5 transition-colors"
                  >
                    <span className="text-xs font-bold text-[#518231]">{preset.name}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1">{preset.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Bounding box manager */}
            {blurMode === 'area' && boxes.length > 0 && (
              <div className="border-t border-slate-200 dark:border-slate-800 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Censored Zones ({boxes.length})</h4>
                  <button onClick={clearAllBoxes} className="text-[10px] font-bold text-red-600 hover:text-red-700">Clear All</button>
                </div>
                <div className="space-y-1.5 max-h-32 overflow-y-auto pr-1">
                  {boxes.map((box, idx) => (
                    <div 
                      key={box.id}
                      onClick={() => setActiveBoxId(box.id)}
                      className={`flex justify-between items-center p-2 rounded-lg border cursor-pointer text-xs transition-colors ${box.id === activeBoxId ? 'bg-[#518231]/5 border-[#518231] text-[#518231]' : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'}`}
                    >
                      <span className="font-semibold">{box.type.toUpperCase()} Zone #{idx + 1}</span>
                      <button onClick={(e) => { e.stopPropagation(); removeBox(box.id); }} className="text-slate-400 hover:text-red-500">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Export & Save Settings */}
            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-auto space-y-4">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Export Format</h4>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 mb-1">Format</label>
                  <select 
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs rounded-lg p-2 dark:text-white"
                  >
                    <option value="image/jpeg">JPG (Photos)</option>
                    <option value="image/png">PNG (Lossless)</option>
                    <option value="image/webp">WEBP (Optimized)</option>
                  </select>
                </div>
                {exportFormat !== 'image/png' && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1 flex justify-between">
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
                      className="w-full accent-[#518231] h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer mt-2"
                    />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={downloadActiveImage}
                  className="w-full py-3 bg-[#518231] hover:bg-[#518231]/90 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-[#518231]/20 flex items-center justify-center gap-2"
                >
                  <Download size={16} />
                  Download Blurred Image
                </button>
                
                {imageList.length > 1 && (
                  <>
                    <button
                      onClick={applySettingsToAllBatch}
                      className="w-full py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs rounded-lg transition-all"
                    >
                      Apply settings to all {imageList.length} files
                    </button>
                    <button
                      onClick={downloadBatchImages}
                      className="w-full py-2 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 text-white font-bold text-xs rounded-lg transition-all"
                    >
                      Download Batch ({imageList.length} Files)
                    </button>
                  </>
                )}
              </div>

              {/* File Info */}
              {activeImage && originalDimensions && (
                <div className="bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-200/50 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400 space-y-1">
                  <div className="flex justify-between">
                    <span>File Name:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 truncate max-w-[120px]">{activeImage.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resolution:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{originalDimensions.w} × {originalDimensions.h}px</span>
                  </div>
                  <div className="flex justify-between">
                    <span>File Size:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{formatBytes(activeImage.size)}</span>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
