"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload, Trash2, Settings, CheckCircle, AlertCircle, Loader2,
  Download, RefreshCw, History, Move, Clipboard, ShieldAlert,
  Info, Check, ZoomIn, Sliders, Image as ImageIcon, Sparkles,
  ArrowRight, Heart, Share2, HelpCircle, Eye, EyeOff, Copy, Undo2, Redo2,
  Type, Brush, Eraser, Square, Circle, ArrowUpRight, Maximize2, Minimize2,
  Crop, RotateCw, RefreshCcw, Palette, Layers, Plus, X, Type as FontIcon,
  ChevronDown, Grid, SlidersHorizontal, Image as ImgIcon, Download as ExportIcon
} from "lucide-react";

interface TextLayer {
  id: string;
  type: "text";
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  opacity: number;
  rotation: number;
  bold: boolean;
  italic: boolean;
  strokeColor: string;
  strokeWidth: number;
}

interface ImageLayer {
  id: string;
  type: "image";
  src: string;
  imgElement: HTMLImageElement | null;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity: number;
  rotation: number;
}

interface VectorShape {
  id: string;
  type: "pen" | "line" | "arrow" | "rect" | "circle";
  points: { x: number; y: number }[]; // coordinates on base canvas scale
  color: string;
  brushSize: number;
  opacity: number;
}

type Layer = TextLayer | ImageLayer | VectorShape;

interface AdjustmentSettings {
  brightness: number;  // 100 is neutral
  contrast: number;    // 100 is neutral
  saturation: number;  // 100 is neutral
  exposure: number;    // 100 is neutral
  temperature: number; // 0 is neutral (-100 to 100)
  blur: number;        // 0 is neutral
  hueRotate: number;   // 0 is neutral
  sepia: number;       // 0 is neutral
  grayscale: number;   // 0 is neutral
  vignette: number;    // 0 is neutral
  pixelate: number;    // 0 is neutral (1 is active pixel size)
  preset: string;      // 'none', 'vintage', 'cinematic', etc.
}

interface HistoryItem {
  bgSrc: string | null;
  layers: Layer[];
  adjustments: AdjustmentSettings;
}

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = 2;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export function PhotoEditorTool() {
  // Main canvas context states
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
  const [bgImageSrc, setBgImageSrc] = useState<string | null>(null);
  const [bgInfo, setBgInfo] = useState<{ name: string; size: number; format: string } | null>(null);

  // Layers states
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

  // Canvas View Zoom states
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(false);

  // Adjustments states
  const [adjustments, setAdjustments] = useState<AdjustmentSettings>({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    exposure: 100,
    temperature: 0,
    blur: 0,
    hueRotate: 0,
    sepia: 0,
    grayscale: 0,
    vignette: 0,
    pixelate: 0,
    preset: "none"
  });

  // Editor modes: "adjust", "filter", "text", "draw", "crop", "layers"
  const [activeTab, setActiveTab] = useState<"adjust" | "filter" | "text" | "draw" | "crop" | "layers">("adjust");

  // Brush settings
  const [brushMode, setBrushMode] = useState<"pen" | "line" | "arrow" | "rect" | "circle">("pen");
  const [brushColor, setBrushColor] = useState("#518231");
  const [brushSize, setBrushSize] = useState(8);
  const [brushOpacity, setBrushOpacity] = useState(100);

  // Text layer settings
  const [textInput, setTextInput] = useState("Tap to Edit");
  const [textFont, setTextFont] = useState("sans-serif");
  const [textSize, setTextSize] = useState(48);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [textStrokeColor, setTextStrokeColor] = useState("#000000");
  const [textStrokeWidth, setTextStrokeWidth] = useState(2);
  const [textBold, setTextBold] = useState(true);
  const [textItalic, setTextItalic] = useState(false);

  // History stack
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Export overlay modal
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<"image/jpeg" | "image/png" | "image/webp" | "image/avif">("image/png");
  const [exportQuality, setExportQuality] = useState(90);
  const [isExporting, setIsExporting] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const overlayInputRef = useRef<HTMLInputElement>(null);
  const workspaceRef = useRef<HTMLDivElement>(null);

  // Drawing flags
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStartPos, setDrawStartPos] = useState<{ x: number; y: number } | null>(null);
  const [currentPoints, setCurrentPoints] = useState<{ x: number; y: number }[]>([]);

  // Onboarding notifications
  const [onboarded, setOnboarded] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // History action recorder
  const pushHistory = (bgSrc: string | null, layerList: Layer[], adjustSettings: AdjustmentSettings) => {
    const nextItem: HistoryItem = {
      bgSrc,
      layers: JSON.parse(JSON.stringify(layerList)), // clone deep
      adjustments: { ...adjustSettings }
    };
    
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, nextItem]);
    setHistoryIndex(newHistory.length);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const targetIndex = historyIndex - 1;
      restoreHistoryState(targetIndex);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const targetIndex = historyIndex + 1;
      restoreHistoryState(targetIndex);
    }
  };

  const restoreHistoryState = (idx: number) => {
    const item = history[idx];
    setHistoryIndex(idx);
    setAdjustments(item.adjustments);
    setLayers(item.layers);
    
    if (item.bgSrc !== bgImageSrc) {
      if (item.bgSrc) {
        const img = new Image();
        img.src = item.bgSrc;
        img.onload = () => {
          setBgImage(img);
          setBgImageSrc(item.bgSrc);
        };
      } else {
        setBgImage(null);
        setBgImageSrc(null);
      }
    }
  };

  // Keyboard undo / redo / delete listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redo();
      }
      if (e.key === "Delete" && selectedLayerId) {
        e.preventDefault();
        deleteLayer(selectedLayerId);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyIndex, history, selectedLayerId]);

  // Load sample or default settings on start
  useEffect(() => {
    const saved = localStorage.getItem("photo_editor_workspace");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.bgSrc) {
          const img = new Image();
          img.src = parsed.bgSrc;
          img.onload = () => {
            setBgImage(img);
            setBgImageSrc(parsed.bgSrc);
            setLayers(parsed.layers);
            setAdjustments(parsed.adjustments);
            setHistory([{ bgSrc: parsed.bgSrc, layers: parsed.layers, adjustments: parsed.adjustments }]);
            setHistoryIndex(0);
            setOnboarded(true);
          };
        }
      } catch (e) {
        console.error("Autosave restore failed", e);
      }
    }
  }, []);

  // Autosave periodically
  useEffect(() => {
    if (bgImageSrc) {
      const data = {
        bgSrc: bgImageSrc,
        layers,
        adjustments
      };
      localStorage.setItem("photo_editor_workspace", JSON.stringify(data));
    }
  }, [bgImageSrc, layers, adjustments]);

  // File loading triggers
  const loadFiles = (fileList: FileList | File[]) => {
    const file = fileList[0];
    if (!file) return;

    setBgInfo({
      name: file.name,
      size: file.size,
      format: file.type.split("/")[1]?.toUpperCase() || "IMAGE"
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setBgImage(img);
        setBgImageSrc(src);
        setLayers([]);
        setSelectedLayerId(null);
        setAdjustments({
          brightness: 100,
          contrast: 100,
          saturation: 100,
          exposure: 100,
          temperature: 0,
          blur: 0,
          hueRotate: 0,
          sepia: 0,
          grayscale: 0,
          vignette: 0,
          pixelate: 0,
          preset: "none"
        });
        setHistory([{ bgSrc: src, layers: [], adjustments: {
          brightness: 100,
          contrast: 100,
          saturation: 100,
          exposure: 100,
          temperature: 0,
          blur: 0,
          hueRotate: 0,
          sepia: 0,
          grayscale: 0,
          vignette: 0,
          pixelate: 0,
          preset: "none"
        }}]);
        setHistoryIndex(0);
        setOnboarded(true);
      };
    };
    reader.readAsDataURL(file);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          loadFiles([file]);
          break;
        }
      }
    }
  };

  // Preset Filters definitions
  const applyFilterPreset = (presetName: string) => {
    setAdjustments(prev => {
      const next = { ...prev, preset: presetName };
      
      // Default neutrals
      next.grayscale = 0;
      next.sepia = 0;
      next.hueRotate = 0;
      next.temperature = 0;
      next.contrast = 100;
      next.saturation = 100;
      next.brightness = 100;
      next.exposure = 100;

      if (presetName === "vintage") {
        next.sepia = 40;
        next.contrast = 110;
        next.saturation = 80;
        next.temperature = 15;
      } else if (presetName === "cinematic") {
        next.contrast = 120;
        next.saturation = 105;
        next.hueRotate = 350; // shift green/blues
        next.temperature = -10;
      } else if (presetName === "bw") {
        next.grayscale = 100;
        next.contrast = 125;
      } else if (presetName === "sepia") {
        next.sepia = 100;
      } else if (presetName === "hdr") {
        next.contrast = 130;
        next.saturation = 120;
        next.brightness = 105;
      } else if (presetName === "retro") {
        next.sepia = 20;
        next.contrast = 95;
        next.brightness = 105;
        next.hueRotate = 15;
      } else if (presetName === "skydown") {
        next.temperature = -25;
        next.saturation = 115;
      }

      pushHistory(bgImageSrc, layers, next);
      return next;
    });
  };

  // Add Layers generators
  const addTextLayer = () => {
    const newText: TextLayer = {
      id: `text-${Date.now()}`,
      type: "text",
      text: textInput,
      x: bgImage ? bgImage.naturalWidth / 2 : 300,
      y: bgImage ? bgImage.naturalHeight / 2 : 300,
      fontSize: textSize,
      fontFamily: textFont,
      color: textColor,
      opacity: 100,
      rotation: 0,
      bold: textBold,
      italic: textItalic,
      strokeColor: textStrokeColor,
      strokeWidth: textStrokeWidth
    };

    setLayers(prev => {
      const next = [...prev, newText];
      pushHistory(bgImageSrc, next, adjustments);
      return next;
    });
    setSelectedLayerId(newText.id);
  };

  const addImageOverlay = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const newImgLayer: ImageLayer = {
          id: `img-${Date.now()}`,
          type: "image",
          src,
          imgElement: img,
          name: file.name,
          x: bgImage ? bgImage.naturalWidth / 4 : 50,
          y: bgImage ? bgImage.naturalHeight / 4 : 50,
          width: bgImage ? bgImage.naturalWidth / 2 : 400,
          height: bgImage ? (img.naturalHeight / img.naturalWidth) * (bgImage.naturalWidth / 2) : 300,
          opacity: 100,
          rotation: 0
        };

        setLayers(prev => {
          const next = [...prev, newImgLayer];
          pushHistory(bgImageSrc, next, adjustments);
          return next;
        });
        setSelectedLayerId(newImgLayer.id);
      };
    };
    reader.readAsDataURL(file);
  };

  const duplicateLayer = (id: string) => {
    const target = layers.find(l => l.id === id);
    if (!target) return;

    const dup = { 
      ...JSON.parse(JSON.stringify(target)), 
      id: `${target.type}-${Date.now()}`
    };
    
    if (target.type === "text" || target.type === "image") {
      dup.x = (target as TextLayer | ImageLayer).x + 30;
      dup.y = (target as TextLayer | ImageLayer).y + 30;
    } else if ("points" in target) {
      dup.points = (target as VectorShape).points.map(pt => ({
        x: pt.x + 30,
        y: pt.y + 30
      }));
    }
    
    // image ref element recovery since JSON.stringify strips HTMLImageElement
    if (target.type === "image") {
      (dup as ImageLayer).imgElement = (target as ImageLayer).imgElement;
    }

    setLayers(prev => {
      const next = [...prev, dup];
      pushHistory(bgImageSrc, next, adjustments);
      return next;
    });
    setSelectedLayerId(dup.id);
  };

  const deleteLayer = (id: string) => {
    setLayers(prev => {
      const next = prev.filter(l => l.id !== id);
      pushHistory(bgImageSrc, next, adjustments);
      return next;
    });
    if (selectedLayerId === id) {
      setSelectedLayerId(null);
    }
  };

  const updateLayerProp = (id: string, props: Partial<Layer>) => {
    setLayers(prev => {
      const next = prev.map(l => {
        if (l.id === id) {
          return { ...l, ...props } as Layer;
        }
        return l;
      });
      return next;
    });
  };

  // Push history on layer interaction stops
  const handleLayerInteractionEnd = () => {
    pushHistory(bgImageSrc, layers, adjustments);
  };

  // Render composite loop onto workspace canvas
  const drawCompositeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Reset canvas dimensions to background image size
    if (bgImage) {
      canvas.width = bgImage.naturalWidth;
      canvas.height = bgImage.naturalHeight;
    } else {
      canvas.width = 800;
      canvas.height = 600;
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#94a3b8";
      ctx.font = "20px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Upload an Image to Start Editing", canvas.width / 2, canvas.height / 2);
      return;
    }

    // 1) Apply Adjustments & Filters to Background Image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    
    const filterString = `
      brightness(${adjustments.brightness}%)
      contrast(${adjustments.contrast}%)
      saturate(${adjustments.saturation}%)
      hue-rotate(${adjustments.hueRotate}deg)
      sepia(${adjustments.sepia}%)
      grayscale(${adjustments.grayscale}%)
      blur(${adjustments.blur}px)
    `.replace(/\s+/g, ' ').trim();

    ctx.filter = filterString;
    ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
    ctx.restore();

    // 2) Render Layers
    layers.forEach((layer) => {
      ctx.save();
      ctx.globalAlpha = layer.opacity / 100;

      if (layer.type === "text") {
        ctx.save();
        ctx.translate(layer.x, layer.y);
        ctx.rotate((layer.rotation * Math.PI) / 180);

        ctx.font = `${layer.bold ? "bold" : "normal"} ${layer.italic ? "italic" : "normal"} ${layer.fontSize}px ${layer.fontFamily}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (layer.strokeWidth > 0) {
          ctx.strokeStyle = layer.strokeColor;
          ctx.lineWidth = layer.strokeWidth;
          ctx.strokeText(layer.text, 0, 0);
        }

        ctx.fillStyle = layer.color;
        ctx.fillText(layer.text, 0, 0);
        ctx.restore();
      } 
      
      else if (layer.type === "image") {
        if (layer.imgElement) {
          ctx.save();
          ctx.translate(layer.x + layer.width / 2, layer.y + layer.height / 2);
          ctx.rotate((layer.rotation * Math.PI) / 180);
          ctx.drawImage(
            layer.imgElement,
            -layer.width / 2,
            -layer.height / 2,
            layer.width,
            layer.height
          );
          ctx.restore();
        }
      } 
      
      else if (layer.type === "pen" || layer.type === "line" || layer.type === "arrow" || layer.type === "rect" || layer.type === "circle") {
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = layer.brushSize;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        if (layer.type === "pen" && layer.points.length > 1) {
          ctx.beginPath();
          ctx.moveTo(layer.points[0].x, layer.points[0].y);
          for (let i = 1; i < layer.points.length; i++) {
            ctx.lineTo(layer.points[i].x, layer.points[i].y);
          }
          ctx.stroke();
        } 
        
        else if (layer.type === "line" && layer.points.length === 2) {
          ctx.beginPath();
          ctx.moveTo(layer.points[0].x, layer.points[0].y);
          ctx.lineTo(layer.points[1].x, layer.points[1].y);
          ctx.stroke();
        } 
        
        else if (layer.type === "arrow" && layer.points.length === 2) {
          const from = layer.points[0];
          const to = layer.points[1];
          ctx.beginPath();
          ctx.moveTo(from.x, from.y);
          ctx.lineTo(to.x, to.y);
          ctx.stroke();

          // draw arrowhead
          const angle = Math.atan2(to.y - from.y, to.x - from.x);
          ctx.beginPath();
          ctx.moveTo(to.x, to.y);
          ctx.lineTo(to.x - 20 * Math.cos(angle - Math.PI / 6), to.y - 20 * Math.sin(angle - Math.PI / 6));
          ctx.lineTo(to.x - 20 * Math.cos(angle + Math.PI / 6), to.y - 20 * Math.sin(angle + Math.PI / 6));
          ctx.closePath();
          ctx.fillStyle = layer.color;
          ctx.fill();
        } 
        
        else if (layer.type === "rect" && layer.points.length === 2) {
          const from = layer.points[0];
          const to = layer.points[1];
          ctx.strokeRect(from.x, from.y, to.x - from.x, to.y - from.y);
        } 
        
        else if (layer.type === "circle" && layer.points.length === 2) {
          const from = layer.points[0];
          const to = layer.points[1];
          const r = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
          ctx.beginPath();
          ctx.arc(from.x, from.y, r, 0, 2 * Math.PI);
          ctx.stroke();
        }
      }

      ctx.restore();
    });

    // 3) Vignette overlays
    if (adjustments.vignette > 0) {
      ctx.save();
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.3,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) * 0.7
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(1, `rgba(0, 0, 0, ${adjustments.vignette / 100})`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    // 4) Selected Layer border box highlight in non-drawing tab
    if (selectedLayerId && activeTab !== "draw") {
      const layer = layers.find(l => l.id === selectedLayerId);
      if (layer) {
        ctx.save();
        ctx.strokeStyle = "#518231";
        ctx.lineWidth = Math.max(2, 4 / zoom);
        ctx.setLineDash([6, 6]);

        if (layer.type === "text") {
          // Approximate height and width metrics for selection box
          const textW = layer.text.length * (layer.fontSize * 0.55);
          const textH = layer.fontSize * 1.2;
          ctx.save();
          ctx.translate(layer.x, layer.y);
          ctx.rotate((layer.rotation * Math.PI) / 180);
          ctx.strokeRect(-textW / 2 - 8, -textH / 2 - 8, textW + 16, textH + 16);
          ctx.restore();
        } 
        
        else if (layer.type === "image") {
          ctx.save();
          ctx.translate(layer.x + layer.width / 2, layer.y + layer.height / 2);
          ctx.rotate((layer.rotation * Math.PI) / 180);
          ctx.strokeRect(-layer.width / 2 - 4, -layer.height / 2 - 4, layer.width + 8, layer.height + 8);
          ctx.restore();
        }
        ctx.restore();
      }
    }
  }, [bgImage, layers, adjustments, selectedLayerId, activeTab, zoom]);

  // Redraw when adjustments or layers update
  useEffect(() => {
    drawCompositeCanvas();
  }, [drawCompositeCanvas]);

  // Brush vectors drag triggers
  const getCanvasMouseCoordinates = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    // Translate client mouse coordinates to actual scaled canvas resolution pixels
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    return { x: Math.round(x), y: Math.round(y) };
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!bgImage) return;

    const coords = getCanvasMouseCoordinates(e);

    if (activeTab === "draw") {
      setIsDrawing(true);
      setDrawStartPos(coords);
      
      if (brushMode === "pen") {
        setCurrentPoints([coords]);
      } else {
        setCurrentPoints([coords, coords]);
      }
      return;
    }

    // Default: Selection collision detection
    // Traverse layers backwards (top-most gets priority)
    let found = false;
    for (let i = layers.length - 1; i >= 0; i--) {
      const layer = layers[i];
      if (layer.type === "text") {
        const textW = layer.text.length * (layer.fontSize * 0.55);
        const textH = layer.fontSize * 1.2;
        if (
          coords.x >= layer.x - textW / 2 &&
          coords.x <= layer.x + textW / 2 &&
          coords.y >= layer.y - textH / 2 &&
          coords.y <= layer.y + textH / 2
        ) {
          setSelectedLayerId(layer.id);
          setDrawStartPos(coords);
          found = true;
          break;
        }
      } 
      
      else if (layer.type === "image") {
        if (
          coords.x >= layer.x &&
          coords.x <= layer.x + layer.width &&
          coords.y >= layer.y &&
          coords.y <= layer.y + layer.height
        ) {
          setSelectedLayerId(layer.id);
          setDrawStartPos(coords);
          found = true;
          break;
        }
      }
    }

    if (!found) {
      setSelectedLayerId(null);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!bgImage) return;

    const coords = getCanvasMouseCoordinates(e);

    // Brush annotation preview rendering
    if (isDrawing && activeTab === "draw" && drawStartPos) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      
      if (brushMode === "pen") {
        setCurrentPoints(prev => [...prev, coords]);
        
        // draw intermediate preview stroke on screen
        if (ctx) {
          ctx.save();
          ctx.strokeStyle = brushColor;
          ctx.lineWidth = brushSize;
          ctx.lineCap = "round";
          ctx.globalAlpha = brushOpacity / 100;
          ctx.beginPath();
          ctx.moveTo(currentPoints[currentPoints.length - 1]?.x || coords.x, currentPoints[currentPoints.length - 1]?.y || coords.y);
          ctx.lineTo(coords.x, coords.y);
          ctx.stroke();
          ctx.restore();
        }
      } else {
        // Shapes preview lines
        setCurrentPoints([drawStartPos, coords]);
        drawCompositeCanvas(); // force clear frame

        if (ctx) {
          ctx.save();
          ctx.strokeStyle = brushColor;
          ctx.lineWidth = brushSize;
          ctx.globalAlpha = brushOpacity / 100;
          
          if (brushMode === "line") {
            ctx.beginPath();
            ctx.moveTo(drawStartPos.x, drawStartPos.y);
            ctx.lineTo(coords.x, coords.y);
            ctx.stroke();
          } 
          
          else if (brushMode === "arrow") {
            ctx.beginPath();
            ctx.moveTo(drawStartPos.x, drawStartPos.y);
            ctx.lineTo(coords.x, coords.y);
            ctx.stroke();

            const angle = Math.atan2(coords.y - drawStartPos.y, coords.x - drawStartPos.x);
            ctx.beginPath();
            ctx.moveTo(coords.x, coords.y);
            ctx.lineTo(coords.x - 15 * Math.cos(angle - Math.PI / 6), coords.y - 15 * Math.sin(angle - Math.PI / 6));
            ctx.lineTo(coords.x - 15 * Math.cos(angle + Math.PI / 6), coords.y - 15 * Math.sin(angle + Math.PI / 6));
            ctx.closePath();
            ctx.fillStyle = brushColor;
            ctx.fill();
          } 
          
          else if (brushMode === "rect") {
            ctx.strokeRect(drawStartPos.x, drawStartPos.y, coords.x - drawStartPos.x, coords.y - drawStartPos.y);
          } 
          
          else if (brushMode === "circle") {
            const r = Math.sqrt(Math.pow(coords.x - drawStartPos.x, 2) + Math.pow(coords.y - drawStartPos.y, 2));
            ctx.beginPath();
            ctx.arc(drawStartPos.x, drawStartPos.y, r, 0, 2 * Math.PI);
            ctx.stroke();
          }
          ctx.restore();
        }
      }
      return;
    }

    // Moving selected layer
    if (selectedLayerId && drawStartPos && activeTab !== "draw") {
      const dx = coords.x - drawStartPos.x;
      const dy = coords.y - drawStartPos.y;

      const layer = layers.find(l => l.id === selectedLayerId);
      if (layer) {
        if (layer.type === "text" || layer.type === "image") {
          updateLayerProp(selectedLayerId, {
            x: layer.x + dx,
            y: layer.y + dy
          });
        } else if ("points" in layer) {
          const updatedPoints = (layer as VectorShape).points.map(pt => ({
            x: pt.x + dx,
            y: pt.y + dy
          }));
          updateLayerProp(selectedLayerId, {
            points: updatedPoints
          });
        }
        setDrawStartPos(coords);
      }
    }
  };

  const handleCanvasMouseUp = () => {
    if (isDrawing && activeTab === "draw") {
      setIsDrawing(false);
      
      const newShape: VectorShape = {
        id: `draw-${Date.now()}`,
        type: brushMode,
        points: currentPoints,
        color: brushColor,
        brushSize,
        opacity: brushOpacity
      };

      setLayers(prev => {
        const next = [...prev, newShape];
        pushHistory(bgImageSrc, next, adjustments);
        return next;
      });
      setCurrentPoints([]);
      setDrawStartPos(null);
      return;
    }

    if (selectedLayerId && drawStartPos) {
      handleLayerInteractionEnd();
      setDrawStartPos(null);
    }
  };

  // Crop base triggers
  const cropImageToRatio = (wRatio: number, hRatio: number) => {
    if (!bgImage) return;

    const canvas = document.createElement("canvas");
    const imgRatio = bgImage.naturalWidth / bgImage.naturalHeight;
    const targetRatio = wRatio / hRatio;

    let w = bgImage.naturalWidth;
    let h = bgImage.naturalHeight;
    let x = 0;
    let y = 0;

    if (imgRatio > targetRatio) {
      w = bgImage.naturalHeight * targetRatio;
      x = (bgImage.naturalWidth - w) / 2;
    } else {
      h = bgImage.naturalWidth / targetRatio;
      y = (bgImage.naturalHeight - h) / 2;
    }

    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.drawImage(bgImage, x, y, w, h, 0, 0, w, h);
      const dataUrl = canvas.toDataURL();
      
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        setBgImage(img);
        setBgImageSrc(dataUrl);
        pushHistory(dataUrl, layers, adjustments);
      };
    }
  };

  // Flipping triggers
  const flipBackgroundImage = (dir: "h" | "v") => {
    if (!bgImage) return;

    const canvas = document.createElement("canvas");
    canvas.width = bgImage.naturalWidth;
    canvas.height = bgImage.naturalHeight;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.save();
      if (dir === "h") {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
      } else {
        ctx.translate(0, canvas.height);
        ctx.scale(1, -1);
      }
      ctx.drawImage(bgImage, 0, 0);
      ctx.restore();

      const dataUrl = canvas.toDataURL();
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        setBgImage(img);
        setBgImageSrc(dataUrl);
        pushHistory(dataUrl, layers, adjustments);
      };
    }
  };

  // Rotating triggers
  const rotateBackgroundImage = () => {
    if (!bgImage) return;

    const canvas = document.createElement("canvas");
    // Swap width and heights
    canvas.width = bgImage.naturalHeight;
    canvas.height = bgImage.naturalWidth;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(bgImage, -bgImage.naturalWidth / 2, -bgImage.naturalHeight / 2);
      ctx.restore();

      const dataUrl = canvas.toDataURL();
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        setBgImage(img);
        setBgImageSrc(dataUrl);
        pushHistory(dataUrl, layers, adjustments);
      };
    }
  };

  // Trigger export downloads
  const handleExport = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);

    // Hide selections box highlights before drawing final output
    setSelectedLayerId(null);
    setTimeout(() => {
      // Redraw clean
      drawCompositeCanvas();

      setTimeout(() => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              
              const formatExt = exportFormat.split("/")[1] || "png";
              a.download = `edited-photo-${Date.now()}.${formatExt}`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }
            setIsExporting(false);
            setShowExportModal(false);
          },
          exportFormat,
          exportQuality / 100
        );
      }, 100);
    }, 50);
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all adjustments, layers, and annotations?")) {
      setLayers([]);
      setSelectedLayerId(null);
      setAdjustments({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        exposure: 100,
        temperature: 0,
        blur: 0,
        hueRotate: 0,
        sepia: 0,
        grayscale: 0,
        vignette: 0,
        pixelate: 0,
        preset: "none"
      });
      if (bgImageSrc) {
        pushHistory(bgImageSrc, [], {
          brightness: 100,
          contrast: 100,
          saturation: 100,
          exposure: 100,
          temperature: 0,
          blur: 0,
          hueRotate: 0,
          sepia: 0,
          grayscale: 0,
          vignette: 0,
          pixelate: 0,
          preset: "none"
        });
      }
    }
  };

  // Zoom controls
  const adjustZoom = (factor: number) => {
    if (factor === 0) {
      setZoom(1);
    } else {
      setZoom(prev => Math.max(0.2, Math.min(4, prev + factor)));
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Upload Zone triggers when empty */}
      {!bgImageSrc ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDrag}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDrop={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); if (e.dataTransfer.files) loadFiles(e.dataTransfer.files); }}
          className={`border-3 border-dashed rounded-2xl p-10 md:p-20 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 group ${
            dragActive 
              ? "border-[#518231] bg-[#518231]/5 shadow-[0_0_20px_-3px_rgba(81,130,49,0.2)]" 
              : "border-slate-350 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#518231] bg-white dark:bg-slate-900/40 hover:bg-slate-50 dark:hover:bg-slate-900/80"
          }`}
        >
          <input 
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && loadFiles(e.target.files)}
          />
          <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#518231]/10 group-hover:text-[#518231] transition-all mb-4">
            <Upload size={28} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 group-hover:text-[#518231] transition-colors">
            Upload Image to Start Editing
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
            Drag & drop files or click to browse. Paste screenshot graphics directly (Ctrl+V).
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 text-[9px] font-bold text-slate-400 uppercase">
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50">PNG, JPG, WEBP, AVIF</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50">Vector SVG, GIF, BMP</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800/80 rounded border border-slate-200/50">100% Client-Side</span>
          </div>
        </div>
      ) : (
        <div className="w-full flex flex-col lg:flex-row gap-6 items-start h-[80vh] min-h-[500px]">
          
          {/* TOOLBOX SIDEBAR (Left Panel) */}
          <div className="w-full lg:w-80 shrink-0 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col h-full overflow-hidden shadow-2xs">
            
            {/* Sidebar Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 overflow-x-auto shrink-0 scrollbar-none">
              {[
                { id: "adjust", label: "Adjust", icon: SlidersHorizontal },
                { id: "filter", label: "Filters", icon: Sparkles },
                { id: "text", label: "Text", icon: Type },
                { id: "draw", label: "Draw", icon: Brush },
                { id: "crop", label: "Transform", icon: Crop },
                { id: "layers", label: "Layers", icon: Layers }
              ].map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 min-w-[64px] py-3 text-center flex flex-col items-center gap-1.5 border-b-2 text-[10px] font-bold transition-all focus:outline-none ${
                      activeTab === tab.id
                        ? "border-[#518231] text-[#518231] bg-[#518231]/5"
                        : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-350"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Sidebar Panel Contents */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar">
              
              {/* Tab: ADJUSTMENTS */}
              {activeTab === "adjust" && (
                <div className="space-y-4">
                  
                  {/* Adjustment slider lists */}
                  {[
                    { id: "brightness", label: "Brightness", min: 0, max: 200, unit: "%" },
                    { id: "contrast", label: "Contrast", min: 0, max: 200, unit: "%" },
                    { id: "saturation", label: "Saturation", min: 0, max: 200, unit: "%" },
                    { id: "exposure", label: "Exposure", min: 0, max: 200, unit: "%" },
                    { id: "temperature", label: "Warmth", min: -50, max: 50, unit: "" },
                    { id: "hueRotate", label: "Hue Rotate", min: 0, max: 360, unit: "°" },
                    { id: "blur", label: "Blur Radius", min: 0, max: 15, unit: "px" },
                    { id: "vignette", label: "Vignette Darkness", min: 0, max: 100, unit: "%" }
                  ].map(adj => (
                    <div key={adj.id} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-slate-500">
                        <span>{adj.label}</span>
                        <span className="font-mono text-[#518231] font-bold">
                          {adjustments[adj.id as keyof AdjustmentSettings]}{adj.unit}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={adj.min}
                        max={adj.max}
                        value={adjustments[adj.id as keyof AdjustmentSettings]}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setAdjustments(prev => {
                            const next = { ...prev, [adj.id]: val };
                            return next;
                          });
                        }}
                        onMouseUp={() => pushHistory(bgImageSrc, layers, adjustments)}
                        onTouchEnd={() => pushHistory(bgImageSrc, layers, adjustments)}
                        className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                      />
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      setAdjustments({
                        brightness: 100,
                        contrast: 100,
                        saturation: 100,
                        exposure: 100,
                        temperature: 0,
                        blur: 0,
                        hueRotate: 0,
                        sepia: 0,
                        grayscale: 0,
                        vignette: 0,
                        pixelate: 0,
                        preset: "none"
                      });
                      pushHistory(bgImageSrc, layers, {
                        brightness: 100,
                        contrast: 100,
                        saturation: 100,
                        exposure: 100,
                        temperature: 0,
                        blur: 0,
                        hueRotate: 0,
                        sepia: 0,
                        grayscale: 0,
                        vignette: 0,
                        pixelate: 0,
                        preset: "none"
                      });
                    }}
                    className="w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-bold transition-all border border-slate-200/50"
                  >
                    Reset Adjustments
                  </button>

                </div>
              )}

              {/* Tab: FILTERS */}
              {activeTab === "filter" && (
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "none", label: "None / Original" },
                    { id: "vintage", label: "Vintage Sepia" },
                    { id: "cinematic", label: "Cinematic Film" },
                    { id: "bw", label: "High Contrast B&W" },
                    { id: "sepia", label: "Pure Sepia" },
                    { id: "hdr", label: "HDR Color Pop" },
                    { id: "retro", label: "Retro Glow" },
                    { id: "skydown", label: "Cool Iceberg" }
                  ].map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => applyFilterPreset(preset.id)}
                      className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                        adjustments.preset === preset.id
                          ? "border-[#518231] bg-[#518231]/5 text-[#518231] font-extrabold"
                          : "border-slate-200 dark:border-slate-800 hover:border-slate-350 text-slate-800 dark:text-white bg-slate-50 dark:bg-slate-950"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}

              {/* Tab: TEXT */}
              {activeTab === "text" && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Overlay Text</label>
                    <input
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Add overlay text..."
                      className="w-full px-3 py-2 bg-slate-50 focus:bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs font-semibold focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">Color</label>
                      <div className="flex gap-1.5">
                        <input
                          type="color"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-7 h-7 rounded border border-slate-300 cursor-pointer bg-transparent shrink-0"
                          title="Text Fill Color"
                        />
                        <input
                          type="text"
                          value={textColor}
                          onChange={(e) => setTextColor(e.target.value)}
                          className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-1">Stroke</label>
                      <div className="flex gap-1.5">
                        <input
                          type="color"
                          value={textStrokeColor}
                          onChange={(e) => setTextStrokeColor(e.target.value)}
                          className="w-7 h-7 rounded border border-slate-300 cursor-pointer bg-transparent shrink-0"
                          title="Text Outline Color"
                        />
                        <input
                          type="text"
                          value={textStrokeColor}
                          onChange={(e) => setTextStrokeColor(e.target.value)}
                          className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 block">Font Size</label>
                      <input
                        type="number"
                        min="12"
                        max="200"
                        value={textSize}
                        onChange={(e) => setTextSize(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded text-xs font-mono font-bold"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 block">Stroke Width</label>
                      <input
                        type="number"
                        min="0"
                        max="20"
                        value={textStrokeWidth}
                        onChange={(e) => setTextStrokeWidth(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded text-xs font-mono font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Font Family</label>
                    <select
                      value={textFont}
                      onChange={(e) => setTextFont(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 focus:bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 focus:outline-none"
                    >
                      <option value="sans-serif">Sans Serif (Inter/Arial)</option>
                      <option value="serif">Classic Serif (Times/Georgia)</option>
                      <option value="monospace">Monospace (Courier)</option>
                      <option value="cursive">Cursive Font</option>
                      <option value="fantasy">Impact Display</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setTextBold(!textBold)}
                      className={`flex-1 py-1 text-xs font-bold rounded border ${textBold ? "bg-slate-800 text-white dark:bg-slate-700" : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 border-slate-200"}`}
                    >
                      Bold
                    </button>
                    <button
                      onClick={() => setTextItalic(!textItalic)}
                      className={`flex-1 py-1 text-xs font-bold rounded border ${textItalic ? "bg-slate-800 text-white dark:bg-slate-700" : "bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 border-slate-200"}`}
                    >
                      Italic
                    </button>
                  </div>

                  <button
                    onClick={addTextLayer}
                    className="w-full py-2.5 bg-[#518231] hover:bg-[#436a28] text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Plus size={14} /> Add Text Overlay
                  </button>

                </div>
              )}

              {/* Tab: DRAWING */}
              {activeTab === "draw" && (
                <div className="space-y-4">
                  
                  {/* Drawing modes selectors */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Drawing Shape Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "pen", label: "Pen Brush", icon: Brush },
                        { id: "line", label: "Line", icon: ImageIcon },
                        { id: "arrow", label: "Arrow", icon: ArrowUpRight },
                        { id: "rect", label: "Rectangle", icon: Square },
                        { id: "circle", label: "Circle", icon: Circle }
                      ].map(item => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setBrushMode(item.id as any)}
                            className={`p-2 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                              brushMode === item.id
                                ? "border-[#518231] bg-[#518231]/5 text-[#518231]"
                                : "border-slate-200 dark:border-slate-800 hover:border-slate-350"
                            }`}
                          >
                            <Icon size={14} />
                            <span className="text-[9px] font-bold">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Brush Color Picker */}
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Brush Color</label>
                    <div className="flex gap-1.5">
                      <input
                        type="color"
                        value={brushColor}
                        onChange={(e) => setBrushColor(e.target.value)}
                        className="w-7 h-7 rounded border border-slate-300 cursor-pointer bg-transparent shrink-0"
                        title="Drawing Color"
                      />
                      <input
                        type="text"
                        value={brushColor}
                        onChange={(e) => setBrushColor(e.target.value)}
                        className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 rounded text-xs font-mono text-slate-700 dark:text-slate-300 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Brush Width */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Brush Size</span>
                      <span className="font-mono text-[#518231] font-bold">{brushSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={brushSize}
                      onChange={(e) => setBrushSize(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                    />
                  </div>

                  {/* Brush Opacity */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold text-slate-500">
                      <span>Opacity</span>
                      <span className="font-mono text-[#518231] font-bold">{brushOpacity}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={brushOpacity}
                      onChange={(e) => setBrushOpacity(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                    />
                  </div>

                  <p className="text-[10px] text-slate-450 dark:text-slate-500 text-center italic">
                    💡 Click and drag directly on the image workspace to draw paths or shape annotations.
                  </p>

                </div>
              )}

              {/* Tab: CROPS & FLIPS */}
              {activeTab === "crop" && (
                <div className="space-y-4">
                  
                  {/* Basic Aspect ratios crop triggers */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Crop Ratio Presets</label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: "1:1 Square", w: 1, h: 1 },
                        { label: "4:3 Standard", w: 4, h: 3 },
                        { label: "16:9 Widescreen", w: 16, h: 9 },
                        { label: "9:16 Vertical", w: 9, h: 16 },
                        { label: "4:5 Portrait", w: 4, h: 5 },
                        { label: "2:3 Portrait", w: 2, h: 3 }
                      ].map(r => (
                        <button
                          key={r.label}
                          onClick={() => cropImageToRatio(r.w, r.h)}
                          className="py-2 px-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900 border border-slate-250/70 dark:border-slate-850 rounded-lg text-xs font-semibold text-slate-750 dark:text-slate-300"
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rotations & flips */}
                  <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <label className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Transformations</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={rotateBackgroundImage}
                        className="py-2 text-center border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-950"
                        title="Rotate 90 degrees clockwise"
                      >
                        <RotateCw size={14} />
                        <span className="text-[9px] font-bold">Rotate 90°</span>
                      </button>
                      <button
                        onClick={() => flipBackgroundImage("h")}
                        className="py-2 text-center border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-950"
                        title="Flip horizontally"
                      >
                        <RefreshCcw size={14} className="transform rotate-90" />
                        <span className="text-[9px] font-bold">Flip Horiz</span>
                      </button>
                      <button
                        onClick={() => flipBackgroundImage("v")}
                        className="py-2 text-center border border-slate-200 dark:border-slate-800 rounded-lg flex flex-col items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-950"
                        title="Flip vertically"
                      >
                        <RefreshCcw size={14} />
                        <span className="text-[9px] font-bold">Flip Vert</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

              {/* Tab: LAYERS PANEL LIST */}
              {activeTab === "layers" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">Active Overlays</span>
                    <input 
                      ref={overlayInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files && addImageOverlay(e.target.files[0])}
                    />
                    <button
                      onClick={() => overlayInputRef.current?.click()}
                      className="text-[10px] text-[#518231] font-bold hover:underline"
                    >
                      + Overlay Image
                    </button>
                  </div>

                  {layers.length === 0 ? (
                    <p className="text-[11px] text-slate-400 text-center italic py-6">No active layers. Add text or brush highlights.</p>
                  ) : (
                    <div className="space-y-2">
                      {layers.map((layer, index) => {
                        const isSel = selectedLayerId === layer.id;
                        return (
                          <div 
                            key={layer.id}
                            className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 transition-all cursor-pointer ${
                              isSel 
                                ? "border-[#518231] bg-slate-50/50 dark:bg-slate-950/30" 
                                : "border-slate-200 dark:border-slate-800 hover:border-slate-350"
                            }`}
                            onClick={() => setSelectedLayerId(layer.id)}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-[10px] text-slate-400 font-bold font-mono">#{layers.length - index}</span>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
                                  {layer.type === "text" ? `Text: "${layer.text}"` : layer.type === "image" ? `Image: ${layer.name}` : `Shape: ${layer.type}`}
                                </p>
                              </div>
                            </div>

                            {/* Layer action controls */}
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => { e.stopPropagation(); duplicateLayer(layer.id); }}
                                className="p-1 text-slate-400 hover:text-[#518231] hover:bg-slate-100 dark:hover:bg-slate-800 rounded"
                                title="Duplicate layer"
                              >
                                <Copy size={11} />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteLayer(layer.id); }}
                                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded"
                                title="Delete layer"
                              >
                                <Trash2 size={11} />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                </div>
              )}

            </div>

            {/* Reset & Export Actions bottom bar */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shrink-0 flex gap-2">
              <button
                onClick={handleReset}
                className="flex-1 py-2 bg-white hover:bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 transition-all"
              >
                Reset Canvas
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="flex-1 py-2 bg-gradient-to-r from-[#518231] to-[#436a28] hover:from-[#436a28] hover:to-[#365420] text-white font-bold rounded-xl text-xs transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <ExportIcon size={14} /> Export Image
              </button>
            </div>

          </div>

          {/* MAIN EDITING WORKSPACE CANVAS (Right Panel) */}
          <div className="flex-1 w-full bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col h-full overflow-hidden shadow-2xs">
            
            {/* Top Workspace Controls Bar */}
            <div className="px-4 py-2 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 shrink-0 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={undo}
                  disabled={historyIndex <= 0}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-850 hover:bg-slate-50 disabled:opacity-40"
                  title="Undo (Ctrl+Z)"
                >
                  <Undo2 size={14} />
                </button>
                <button
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-850 hover:bg-slate-50 disabled:opacity-40"
                  title="Redo (Ctrl+Y)"
                >
                  <Redo2 size={14} />
                </button>
              </div>

              {/* Resolution details badge */}
              {bgInfo && (
                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-2">
                  <span>{bgInfo.name}</span>
                  <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">{bgImage?.naturalWidth}x{bgImage?.naturalHeight}</span>
                  <span>{formatBytes(bgInfo.size)}</span>
                </div>
              )}

              {/* View options */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`p-1.5 rounded-lg border ${showGrid ? "border-[#518231] bg-[#518231]/5 text-[#518231]" : "border-slate-200 dark:border-slate-850 hover:bg-slate-50"}`}
                  title="Toggle Snapping Grid"
                >
                  <Grid size={14} />
                </button>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-950 p-0.5 rounded-lg border border-slate-200 dark:border-slate-850">
                  <button onClick={() => adjustZoom(-0.1)} className="px-2 py-0.5 text-xs hover:bg-white dark:hover:bg-slate-900 rounded font-bold">-</button>
                  <span className="text-[10px] font-mono font-bold px-1 w-10 text-center">{Math.round(zoom * 100)}%</span>
                  <button onClick={() => adjustZoom(0.1)} className="px-2 py-0.5 text-xs hover:bg-white dark:hover:bg-slate-900 rounded font-bold">+</button>
                </div>
              </div>
            </div>

            {/* Canvas Scrollable Workspace container */}
            <div 
              ref={workspaceRef}
              className="flex-1 overflow-auto p-8 flex items-center justify-center relative cursor-default"
              style={{ backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "20px 20px" }}
            >
              
              {/* Canvas scale wrapper */}
              <div 
                className="relative shadow-xl border border-slate-350 dark:border-slate-850 bg-white select-none transition-transform duration-75"
                style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
              >
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  className={`block ${activeTab === "draw" ? "cursor-crosshair" : "cursor-default"}`}
                />

                {/* Optional Snapping Grid lines */}
                {showGrid && (
                  <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                )}
              </div>

            </div>

          </div>

        </div>
      )}

      {/* EXPORT OVERLAY MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xl p-6 space-y-5 animate-in zoom-in-95">
            
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-800 dark:text-white text-sm">Export Photo Workspace</h3>
              <button 
                onClick={() => setShowExportModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-4">
              
              {/* Format selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Output Format</label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 focus:bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-[#518231] focus:ring-1 focus:ring-[#518231] rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-350 focus:outline-none"
                >
                  <option value="image/png">PNG Format (Lossless / Transparent)</option>
                  <option value="image/jpeg">JPEG Format (Best for Web Posts)</option>
                  <option value="image/webp">WEBP Format (Web Speed Optimized)</option>
                  <option value="image/avif">AVIF Format (Ultra Quality Density)</option>
                </select>
              </div>

              {/* Quality slider (if lossy) */}
              {exportFormat !== "image/png" && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span className="uppercase tracking-wider">Quality Compression</span>
                    <span className="text-[#518231] font-mono font-bold">{exportQuality}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={exportQuality}
                    onChange={(e) => setExportQuality(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                  />
                </div>
              )}

              <p className="text-[10px] text-slate-400 dark:text-slate-500">
                🔒 Privacy safe. Image compiler processes buffers and triggers a browser download stream directly on your machine.
              </p>
            </div>

            {/* Triggers actions */}
            <div className="flex gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-350 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleExport}
                disabled={isExporting}
                className="flex-1 py-2 bg-[#518231] hover:bg-[#436a28] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5"
              >
                {isExporting ? <Loader2 size={14} className="animate-spin" /> : <ExportIcon size={14} />}
                Download Edited Photo
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
