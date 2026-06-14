"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Upload, Trash2, Download, RefreshCw, Sliders, Type, Smile, Plus, X, Layers, Save, History, 
  ZoomIn, ZoomOut, RotateCw, AlertCircle, CheckCircle2, ChevronRight, FileDown, Check, 
  Undo2, Redo2, FlipHorizontal, FlipVertical, Move, Grid, Sparkles, Eye, EyeOff, Maximize2
} from "lucide-react";

// Types
interface Layer {
  id: string;
  type: 'text' | 'sticker';
  text?: string;
  emoji?: string;
  x: number; // Percentage (0 - 100)
  y: number; // Percentage (0 - 100)
  fontSize: number; // Font size in px
  color: string;
  strokeColor: string;
  strokeWidth: number;
  fontFamily: string;
  uppercase: boolean;
  bold: boolean;
  italic: boolean;
  scale: number; // For stickers
  rotation: number; // Degrees
  opacity: number; // 0 - 1
  textAlignment: 'left' | 'center' | 'right';
  visible: boolean;
}

interface MemeDraft {
  id: string;
  name: string;
  timestamp: number;
  bgSrc: string | null;
  bgGradient: string | null;
  layoutMode: 'classic' | 'modern' | 'tiktok';
  aspectRatio: string;
  filters: {
    brightness: number;
    contrast: number;
    saturation: number;
    blur: number;
    grayscale: number;
    sepia: number;
    hueRotate: number;
    rotation: number;
    flipH: boolean;
    flipV: boolean;
  };
  layers: Layer[];
}

interface ExportHistoryItem {
  fileName: string;
  timestamp: number;
  format: string;
}

const DEFAULT_TEMPLATES = [
  {
    id: 'smug-cat',
    name: 'Smug Cat',
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80',
    description: 'Cat looking extremely pleased with itself.',
    defaultText: ['When you fix the bug', 'Without breaking any tests'],
    layout: 'classic'
  },
  {
    id: 'cool-cat',
    name: 'Cool Cat',
    url: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=800&q=80',
    description: 'Cat wearing cool sunglasses.',
    defaultText: ['Deploying to production', 'On a Friday afternoon'],
    layout: 'classic'
  },
  {
    id: 'happy-dog',
    name: 'Excited Doggo',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80',
    description: 'Happy puppy running outside.',
    defaultText: ['Me arriving at the standup', 'With nothing to report'],
    layout: 'classic'
  },
  {
    id: 'retro-office',
    name: 'Classic Desk',
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    description: 'A cozy laptop workspace.',
    defaultText: ['Coffee cup: 100% full', 'Brain: 1% compiled'],
    layout: 'modern'
  },
  {
    id: 'confused-meeting',
    name: 'The Meeting Room',
    url: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&q=80',
    description: 'Reaction group portrait of colleagues looking confused.',
    defaultText: ['"It works on my machine"', 'The entire QA team:'],
    layout: 'classic'
  },
  {
    id: 'dreamy-lights',
    name: 'Synthwave Neon',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
    description: 'Neon synthwave geometric design.',
    defaultText: ['AI agents building the future', 'Antigravity style'],
    layout: 'tiktok'
  }
];

const GRADIENT_PRESETS = [
  { id: 'sunset', name: 'Warm Sunset', css: 'from-orange-500 to-rose-500', colors: ['#f97316', '#f43f5e'] },
  { id: 'ocean', name: 'Deep Ocean', css: 'from-blue-600 to-indigo-900', colors: ['#2563eb', '#312e81'] },
  { id: 'synthwave', name: 'Synthwave', css: 'from-pink-500 to-violet-600', colors: ['#ec4899', '#7c3aed'] },
  { id: 'neon', name: 'Neon Cyber', css: 'from-cyan-400 to-blue-600', colors: ['#22d3ee', '#2563eb'] },
  { id: 'emerald', name: 'Forest Emerald', css: 'from-emerald-500 to-teal-800', colors: ['#10b981', '#115e59'] },
  { id: 'darkness', name: 'Midnight', css: 'from-slate-800 to-slate-950', colors: ['#1e293b', '#020617'] }
];

const EMOJI_CATEGORIES = {
  smileys: ['😂', '🤣', '😭', '😎', '🤔', '🤫', '🤡', '💩', '💀', '👽', '🤖', '🎃', '😈', '😡', '😱'],
  gestures: ['👍', '👎', '👊', '✌️', '🤞', '🤟', '🤘', '👌', '👈', '👉', '👆', '👇', '👏', '🙌', '🙏'],
  symbols: ['❤️', '💔', '🔥', '✨', '🌟', '💥', '💬', '🚫', '⚠️', '💯', '🎯', '💰', '👑', '🎉', '💡']
};

export function MemeGeneratorTool() {
  // Core State
  const [bgImage, setBgImage] = useState<HTMLImageElement | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [bgGradient, setBgGradient] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('custom-meme');
  
  // Layout & Styling
  const [layoutMode, setLayoutMode] = useState<'classic' | 'modern' | 'tiktok'>('classic');
  const [aspectRatio, setAspectRatio] = useState<string>('1:1'); // 'original', '1:1', '9:16', '16:9', '4:5'
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [guides, setGuides] = useState<boolean>(true);
  
  // Image Filters
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    hueRotate: 0,
    rotation: 0,
    flipH: false,
    flipV: false
  });

  // UI state
  const [activeTab, setActiveTab] = useState<'templates' | 'text' | 'stickers' | 'adjust' | 'settings'>('templates');
  const [activeSubView, setActiveSubView] = useState<'editor' | 'drafts' | 'tips'>('editor');
  const [zoom, setZoom] = useState<number>(1.0);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [exportFormat, setExportFormat] = useState<'png' | 'jpeg' | 'webp'>('png');
  const [exportQuality, setExportQuality] = useState<number>(0.9);
  const [searchEmoji, setSearchEmoji] = useState<string>('');
  
  // Undo/Redo History Stack
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  
  // Local Saved Drafts & Logs
  const [drafts, setDrafts] = useState<MemeDraft[]>([]);
  const [exportHistory, setExportHistory] = useState<ExportHistoryItem[]>([]);
  const [showNotification, setShowNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  // Drag State
  const [isDraggingLayer, setIsDraggingLayer] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [draggingGuideState, setDraggingGuideState] = useState({ v: false, h: false });

  // Refs
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize and load preferences/drafts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedDrafts = localStorage.getItem('meme_generator_drafts');
        if (storedDrafts) setDrafts(JSON.parse(storedDrafts));

        const storedHistory = localStorage.getItem('meme_generator_export_history');
        if (storedHistory) setExportHistory(JSON.parse(storedHistory));
      } catch (err) {
        console.error('Failed to load drafts/history', err);
      }
    }
    
    // Load a default template on mount so the canvas is not blank
    const defaultTpl = DEFAULT_TEMPLATES[0];
    loadTemplate(defaultTpl);
  }, []);

  // Show notification timer
  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // Helper: show notification
  const triggerNotification = (type: 'success' | 'error', message: string) => {
    setShowNotification({ type, message });
  };

  // Helper to wrap text inside canvas
  const getWrappedLines = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const paragraphs = text.split('\n');
    const allLines: string[] = [];
    
    for (const para of paragraphs) {
      if (para === '') {
        allLines.push('');
        continue;
      }
      const words = para.split(' ');
      let currentLine = '';
      
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine ? currentLine + ' ' + word : word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
          allLines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        allLines.push(currentLine);
      }
    }
    return allLines;
  };

  // Helper to draw rounded rectangle (useful for badges)
  const drawRoundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
    fillColor: string
  ) => {
    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  // Helper: Draw Linear Gradient
  const drawGradientBackground = (ctx: CanvasRenderingContext2D, width: number, height: number, presetId: string) => {
    const preset = GRADIENT_PRESETS.find(g => g.id === presetId) || GRADIENT_PRESETS[0];
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, preset.colors[0]);
    grad.addColorStop(1, preset.colors[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
  };

  // Helper to calculate scaling rectangular crop coordinates for background images
  const getDrawImageRect = (
    canvasW: number,
    canvasH: number,
    imgW: number,
    imgH: number,
    fit: 'cover' | 'contain'
  ) => {
    const canvasRatio = canvasW / canvasH;
    const imgRatio = imgW / imgH;
    
    let drawW = canvasW;
    let drawH = canvasH;
    let x = 0;
    let y = 0;
    
    if (fit === 'cover') {
      if (imgRatio > canvasRatio) {
        drawW = canvasH * imgRatio;
        x = (canvasW - drawW) / 2;
      } else {
        drawH = canvasW / imgRatio;
        y = (canvasH - drawH) / 2;
      }
    } else {
      if (imgRatio > canvasRatio) {
        drawH = canvasW / imgRatio;
        y = (canvasH - drawH) / 2;
      } else {
        drawW = canvasH * imgRatio;
        x = (canvasW - drawW) / 2;
      }
    }
    
    return { x, y, width: drawW, height: drawH };
  };

  // Main rendering logic
  const renderMeme = (ctx: CanvasRenderingContext2D, width: number, height: number, isExport = false) => {
    ctx.clearRect(0, 0, width, height);
    
    // Compute modern layout header padding
    let headerHeight = 0;
    if (layoutMode === 'modern') {
      headerHeight = Math.max(90, height * 0.22);
    }
    
    // Fill canvas background
    ctx.fillStyle = layoutMode === 'modern' ? '#ffffff' : '#000000';
    ctx.fillRect(0, 0, width, height);
    
    // Render Background Image
    if (bgImage) {
      ctx.save();
      // Apply filters on context
      ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) blur(${filters.blur}px) grayscale(${filters.grayscale}%) sepia(${filters.sepia}%) hue-rotate(${filters.hueRotate}deg)`;
      
      const viewW = width;
      const viewH = height - headerHeight;
      const rect = getDrawImageRect(viewW, viewH, bgImage.naturalWidth || bgImage.width, bgImage.naturalHeight || bgImage.height, 'cover');
      
      const drawY = rect.y + headerHeight;
      
      // Pivot transforms for flips / rotations
      ctx.translate(rect.x + rect.width / 2, drawY + rect.height / 2);
      if (filters.flipH) ctx.scale(-1, 1);
      if (filters.flipV) ctx.scale(1, -1);
      if (filters.rotation) ctx.rotate((filters.rotation * Math.PI) / 180);
      
      ctx.drawImage(bgImage, -rect.width / 2, -rect.height / 2, rect.width, rect.height);
      ctx.restore();
    } else if (bgGradient) {
      // Draw gradient
      ctx.save();
      const viewH = height - headerHeight;
      ctx.translate(0, headerHeight);
      drawGradientBackground(ctx, width, viewH, bgGradient);
      ctx.restore();
    } else {
      // Solid Slate background
      ctx.fillStyle = layoutMode === 'modern' ? '#ffffff' : '#0f172a';
      const viewH = height - headerHeight;
      ctx.fillRect(0, headerHeight, width, viewH);
    }

    // Modern layout divider
    if (layoutMode === 'modern') {
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, headerHeight);
      ctx.lineTo(width, headerHeight);
      ctx.stroke();
    }

    // Draw all active layers
    layers.forEach((layer, index) => {
      if (!layer.visible) return;
      
      const isFirstTextInModern = layoutMode === 'modern' && layer.type === 'text' && index === 0;
      
      let layerX = (layer.x / 100) * width;
      let layerY = (layer.y / 100) * height;
      
      // Override position if layoutMode is modern and it is the first text
      if (isFirstTextInModern) {
        layerX = width / 2;
        layerY = headerHeight / 2;
      }
      
      ctx.save();
      
      if (layer.type === 'text') {
        const textColor = isFirstTextInModern ? '#000000' : layer.color;
        const strokeColor = isFirstTextInModern ? 'transparent' : layer.strokeColor;
        const strokeWidth = isFirstTextInModern ? 0 : layer.strokeWidth;
        const fontFamily = isFirstTextInModern ? 'system-ui, -apple-system, sans-serif' : layer.fontFamily;
        const uppercase = isFirstTextInModern ? false : layer.uppercase;
        const textValue = uppercase ? (layer.text || '').toUpperCase() : (layer.text || '');
        
        ctx.font = `${layer.italic ? 'italic ' : ''}${layer.bold ? 'bold ' : ''}${layer.fontSize}px ${fontFamily}`;
        ctx.fillStyle = textColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidth;
        ctx.textAlign = isFirstTextInModern ? 'center' : layer.textAlignment;
        ctx.textBaseline = 'middle';
        
        const wrappedLines = getWrappedLines(ctx, textValue, width * 0.85);
        const lineHeight = layer.fontSize * 1.25;
        const totalHeight = wrappedLines.length * lineHeight;

        // TikTok rounded pill badge background
        if (layoutMode === 'tiktok' && !isFirstTextInModern) {
          let maxW = 0;
          wrappedLines.forEach(line => {
            const w = ctx.measureText(line).width;
            if (w > maxW) maxW = w;
          });
          const badgeW = maxW + 28;
          const badgeH = totalHeight + 16;
          const badgeX = layerX - badgeW / 2;
          const badgeY = layerY - badgeH / 2;
          
          drawRoundRect(ctx, badgeX, badgeY, badgeW, badgeH, 12, 'rgba(0, 0, 0, 0.65)');
        }

        // Draw selection helper bounds on screen (if active layer is this text, and not exporting)
        if (!isExport && selectedLayerId === layer.id && !isFirstTextInModern) {
          let maxW = 0;
          wrappedLines.forEach(line => {
            const w = ctx.measureText(line).width;
            if (w > maxW) maxW = w;
          });
          ctx.strokeStyle = '#3b82f6'; // Tailwind blue-500
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          
          let boundsX = layerX - maxW / 2 - 8;
          if (layer.textAlignment === 'left') boundsX = layerX - 8;
          else if (layer.textAlignment === 'right') boundsX = layerX - maxW - 8;
          
          ctx.strokeRect(boundsX, layerY - totalHeight / 2 - 8, maxW + 16, totalHeight + 16);
          ctx.setLineDash([]);
        }

        // Draw the wrapped texts line by line
        wrappedLines.forEach((line, lineIdx) => {
          const lineOffset = (lineIdx - (wrappedLines.length - 1) / 2) * lineHeight;
          const drawY = layerY + lineOffset;
          
          if (strokeWidth > 0 && strokeColor !== 'transparent') {
            ctx.strokeText(line, layerX, drawY);
          }
          ctx.fillText(line, layerX, drawY);
        });

      } else if (layer.type === 'sticker') {
        // Draw Sticker/Emoji stamp
        const size = 52 * layer.scale;
        ctx.font = `${size}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        ctx.translate(layerX, layerY);
        ctx.rotate((layer.rotation * Math.PI) / 180);
        ctx.globalAlpha = layer.opacity !== undefined ? layer.opacity : 1;
        
        // Render selection helper bounds around active sticker
        if (!isExport && selectedLayerId === layer.id) {
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth = 2;
          ctx.setLineDash([4, 4]);
          ctx.strokeRect(-size / 2 - 6, -size / 2 - 6, size + 12, size + 12);
          ctx.setLineDash([]);
        }
        
        ctx.fillText(layer.emoji || '😀', 0, 0);
      }
      
      ctx.restore();
    });

    // Drawing guides lines
    if (!isExport && guides) {
      if (draggingGuideState.v) {
        ctx.save();
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();
        ctx.restore();
      }
      if (draggingGuideState.h) {
        ctx.save();
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.75)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        ctx.restore();
      }
    }
  };

  // Re-draw canvas reactively on configurations changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let resW = 800;
    let resH = 800;

    if (aspectRatio === 'original' && bgImage) {
      resW = bgImage.naturalWidth || bgImage.width;
      resH = bgImage.naturalHeight || bgImage.height;
    } else {
      const base = 800;
      if (aspectRatio === '1:1') {
        resW = base;
        resH = base;
      } else if (aspectRatio === '9:16') {
        resW = Math.round(base * (9 / 16));
        resH = base;
      } else if (aspectRatio === '16:9') {
        resW = base;
        resH = Math.round(base * (9 / 16));
      } else if (aspectRatio === '4:5') {
        resW = Math.round(base * (4 / 5));
        resH = base;
      }
    }

    if (canvas.width !== resW || canvas.height !== resH) {
      canvas.width = resW;
      canvas.height = resH;
    }

    renderMeme(ctx, canvas.width, canvas.height, false);
  }, [bgImage, bgGradient, layers, layoutMode, aspectRatio, filters, guides, draggingGuideState, selectedLayerId]);

  // Click intersection checker to detect which layer was clicked
  const isPointInLayer = (
    clickX: number,
    clickY: number,
    layer: Layer,
    canvasW: number,
    canvasH: number,
    ctx: CanvasRenderingContext2D
  ): boolean => {
    const px = (layer.x / 100) * canvasW;
    const py = (layer.y / 100) * canvasH;
    
    if (layer.type === 'text') {
      ctx.save();
      const fontFamily = layoutMode === 'modern' && layer.id === layers[0]?.id ? 'system-ui, -apple-system, sans-serif' : layer.fontFamily;
      ctx.font = `${layer.italic ? 'italic ' : ''}${layer.bold ? 'bold ' : ''}${layer.fontSize}px ${fontFamily}`;
      const wrappedLines = getWrappedLines(ctx, layer.text || '', canvasW * 0.85);
      
      let maxW = 0;
      wrappedLines.forEach(line => {
        const w = ctx.measureText(line).width;
        if (w > maxW) maxW = w;
      });
      const h = wrappedLines.length * layer.fontSize * 1.25;
      ctx.restore();
      
      let xMin = px - maxW / 2;
      let xMax = px + maxW / 2;
      if (layer.textAlignment === 'left') {
        xMin = px;
        xMax = px + maxW;
      } else if (layer.textAlignment === 'right') {
        xMin = px - maxW;
        xMax = px;
      }
      
      const yMin = py - h / 2;
      const yMax = py + h / 2;
      
      return clickX >= xMin && clickX <= xMax && clickY >= yMin && clickY <= yMax;
    } else {
      const size = 52 * layer.scale;
      const xMin = px - size / 2;
      const xMax = px + size / 2;
      const yMin = py - size / 2;
      const yMax = py + size / 2;
      return clickX >= xMin && clickX <= xMax && clickY >= yMin && clickY <= yMax;
    }
  };

  // Drag listeners
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    
    // Canvas-space coords
    const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let clickedLayer: Layer | null = null;
    
    // Traverse backwards to pick the top-most layered item
    for (let i = layers.length - 1; i >= 0; i--) {
      const layer = layers[i];
      if (!layer.visible) continue;
      
      // The first text layer in modern layout is locked in position, so it cannot be dragged
      if (layoutMode === 'modern' && layer.type === 'text' && i === 0) continue;
      
      if (isPointInLayer(clickX, clickY, layer, canvas.width, canvas.height, ctx)) {
        clickedLayer = layer;
        break;
      }
    }
    
    if (clickedLayer) {
      setSelectedLayerId(clickedLayer.id);
      setIsDraggingLayer(true);
      const layerPixelX = (clickedLayer.x / 100) * canvas.width;
      const layerPixelY = (clickedLayer.y / 100) * canvas.height;
      setDragOffset({
        x: clickX - layerPixelX,
        y: clickY - layerPixelY
      });
    } else {
      setSelectedLayerId(null);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDraggingLayer || !selectedLayerId) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((e.clientY - rect.top) / rect.height) * canvas.height;
    
    const targetX = clickX - dragOffset.x;
    const targetY = clickY - dragOffset.y;
    
    let newXPercent = (targetX / canvas.width) * 100;
    let newYPercent = (targetY / canvas.height) * 100;
    
    // Vertical / Horizontal center snapping
    let vSnap = false;
    let hSnap = false;
    if (Math.abs(newXPercent - 50) < 2.5) {
      newXPercent = 50;
      vSnap = true;
    }
    if (Math.abs(newYPercent - 50) < 2.5) {
      newYPercent = 50;
      hSnap = true;
    }
    
    setDraggingGuideState({ v: vSnap, h: hSnap });
    
    setLayers(prev => prev.map(layer => {
      if (layer.id === selectedLayerId) {
        return {
          ...layer,
          x: Math.max(0, Math.min(100, newXPercent)),
          y: Math.max(0, Math.min(100, newYPercent))
        };
      }
      return layer;
    }));
  };

  const handleCanvasMouseUp = () => {
    if (isDraggingLayer) {
      setIsDraggingLayer(false);
      setDraggingGuideState({ v: false, h: false });
      pushHistory({ bgSrc: imageSrc, bgGradient, layers, layoutMode });
    }
  };

  // Mobile Touch Gestures
  const handleCanvasTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    
    const clickX = ((touch.clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((touch.clientY - rect.top) / rect.height) * canvas.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let clickedLayer: Layer | null = null;
    for (let i = layers.length - 1; i >= 0; i--) {
      const layer = layers[i];
      if (!layer.visible) continue;
      if (layoutMode === 'modern' && layer.type === 'text' && i === 0) continue;
      
      if (isPointInLayer(clickX, clickY, layer, canvas.width, canvas.height, ctx)) {
        clickedLayer = layer;
        break;
      }
    }
    
    if (clickedLayer) {
      setSelectedLayerId(clickedLayer.id);
      setIsDraggingLayer(true);
      const layerPixelX = (clickedLayer.x / 100) * canvas.width;
      const layerPixelY = (clickedLayer.y / 100) * canvas.height;
      setDragOffset({
        x: clickX - layerPixelX,
        y: clickY - layerPixelY
      });
    } else {
      setSelectedLayerId(null);
    }
  };

  const handleCanvasTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDraggingLayer || !selectedLayerId || e.touches.length !== 1) return;
    if (e.cancelable) e.preventDefault();
    
    const touch = e.touches[0];
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    
    const clickX = ((touch.clientX - rect.left) / rect.width) * canvas.width;
    const clickY = ((touch.clientY - rect.top) / rect.height) * canvas.height;
    
    const targetX = clickX - dragOffset.x;
    const targetY = clickY - dragOffset.y;
    
    let newXPercent = (targetX / canvas.width) * 100;
    let newYPercent = (targetY / canvas.height) * 100;
    
    let vSnap = false;
    let hSnap = false;
    if (Math.abs(newXPercent - 50) < 2.5) {
      newXPercent = 50;
      vSnap = true;
    }
    if (Math.abs(newYPercent - 50) < 2.5) {
      newYPercent = 50;
      hSnap = true;
    }
    
    setDraggingGuideState({ v: vSnap, h: hSnap });
    
    setLayers(prev => prev.map(layer => {
      if (layer.id === selectedLayerId) {
        return {
          ...layer,
          x: Math.max(0, Math.min(100, newXPercent)),
          y: Math.max(0, Math.min(100, newYPercent))
        };
      }
      return layer;
    }));
  };

  const handleCanvasTouchEnd = () => {
    handleCanvasMouseUp();
  };

  // Undo/Redo History Helpers
  const pushHistory = (state: { bgSrc: string | null, bgGradient: string | null, layers: Layer[], layoutMode: string }) => {
    const serialized = JSON.stringify({
      bgSrc: state.bgSrc,
      bgGradient: state.bgGradient,
      layers: state.layers,
      layoutMode: state.layoutMode
    });
    
    const nextHist = history.slice(0, historyIndex + 1);
    nextHist.push(serialized);
    
    // Caps history at 40 operations
    if (nextHist.length > 40) {
      nextHist.shift();
    }
    
    setHistory(nextHist);
    setHistoryIndex(nextHist.length - 1);
  };

  const triggerUndo = () => {
    if (historyIndex > 0) {
      const targetIdx = historyIndex - 1;
      const data = JSON.parse(history[targetIdx]);
      
      setBgGradient(data.bgGradient);
      setLayoutMode(data.layoutMode);
      setLayers(data.layers);
      setHistoryIndex(targetIdx);
      
      if (data.bgSrc !== imageSrc) {
        setImageSrc(data.bgSrc);
        if (data.bgSrc) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => setBgImage(img);
          img.src = data.bgSrc;
        } else {
          setBgImage(null);
        }
      }
    }
  };

  const triggerRedo = () => {
    if (historyIndex < history.length - 1) {
      const targetIdx = historyIndex + 1;
      const data = JSON.parse(history[targetIdx]);
      
      setBgGradient(data.bgGradient);
      setLayoutMode(data.layoutMode);
      setLayers(data.layers);
      setHistoryIndex(targetIdx);
      
      if (data.bgSrc !== imageSrc) {
        setImageSrc(data.bgSrc);
        if (data.bgSrc) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => setBgImage(img);
          img.src = data.bgSrc;
        } else {
          setBgImage(null);
        }
      }
    }
  };

  // Template Loader
  const loadTemplate = (tpl: typeof DEFAULT_TEMPLATES[0]) => {
    setImageSrc(tpl.url);
    setBgGradient(null);
    setLayoutMode(tpl.layout as any);
    
    const baseLayers: Layer[] = tpl.defaultText.map((text, idx) => ({
      id: `text-${Date.now()}-${idx}`,
      type: 'text',
      text,
      x: 50,
      y: idx === 0 ? 15 : (tpl.defaultText.length === 2 ? 85 : 50),
      fontSize: 42,
      color: '#ffffff',
      strokeColor: '#000000',
      strokeWidth: 6,
      fontFamily: 'Impact, sans-serif',
      uppercase: true,
      bold: true,
      italic: false,
      scale: 1,
      rotation: 0,
      opacity: 1,
      textAlignment: 'center',
      visible: true
    }));
    
    setLayers(baseLayers);
    setSelectedLayerId(baseLayers[0]?.id || null);
    
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      setBgImage(img);
      pushHistory({ bgSrc: tpl.url, bgGradient: null, layers: baseLayers, layoutMode: tpl.layout });
    };
    img.src = tpl.url;
  };

  // Gradient background loader
  const loadGradient = (presetId: string) => {
    setBgImage(null);
    setImageSrc(null);
    setBgGradient(presetId);
    
    const baseLayers: Layer[] = [
      {
        id: `text-${Date.now()}-0`,
        type: 'text',
        text: 'YOUR CAPTION HERE',
        x: 50,
        y: 35,
        fontSize: 38,
        color: '#ffffff',
        strokeColor: 'transparent',
        strokeWidth: 0,
        fontFamily: 'Impact, sans-serif',
        uppercase: true,
        bold: true,
        italic: false,
        scale: 1,
        rotation: 0,
        opacity: 1,
        textAlignment: 'center',
        visible: true
      }
    ];
    
    setLayers(baseLayers);
    setSelectedLayerId(baseLayers[0].id);
    pushHistory({ bgSrc: null, bgGradient: presetId, layers: baseLayers, layoutMode });
  };

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      setImageSrc(url);
      setBgGradient(null);
      setFileName(file.name.substring(0, file.name.lastIndexOf('.')) || 'meme');
      
      const img = new Image();
      img.onload = () => {
        setBgImage(img);
        
        // Add basic text layout automatically
        const newLayers: Layer[] = [
          {
            id: `text-${Date.now()}-0`,
            type: 'text',
            text: 'TAP TO EDIT TOP TEXT',
            x: 50,
            y: 15,
            fontSize: 40,
            color: '#ffffff',
            strokeColor: '#000000',
            strokeWidth: 6,
            fontFamily: 'Impact, sans-serif',
            uppercase: true,
            bold: true,
            italic: false,
            scale: 1,
            rotation: 0,
            opacity: 1,
            textAlignment: 'center',
            visible: true
          },
          {
            id: `text-${Date.now()}-1`,
            type: 'text',
            text: 'TAP TO EDIT BOTTOM TEXT',
            x: 50,
            y: 85,
            fontSize: 40,
            color: '#ffffff',
            strokeColor: '#000000',
            strokeWidth: 6,
            fontFamily: 'Impact, sans-serif',
            uppercase: true,
            bold: true,
            italic: false,
            scale: 1,
            rotation: 0,
            opacity: 1,
            textAlignment: 'center',
            visible: true
          }
        ];
        
        setLayers(newLayers);
        setSelectedLayerId(newLayers[0].id);
        pushHistory({ bgSrc: url, bgGradient: null, layers: newLayers, layoutMode });
        triggerNotification('success', 'Image uploaded successfully!');
      };
      img.src = url;
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        setImageSrc(url);
        setBgGradient(null);
        
        const img = new Image();
        img.onload = () => {
          setBgImage(img);
          const newLayers: Layer[] = [
            {
              id: `text-${Date.now()}-0`,
              type: 'text',
              text: 'TAP TO EDIT TEXT',
              x: 50,
              y: 50,
              fontSize: 42,
              color: '#ffffff',
              strokeColor: '#000000',
              strokeWidth: 6,
              fontFamily: 'Impact, sans-serif',
              uppercase: true,
              bold: true,
              italic: false,
              scale: 1,
              rotation: 0,
              opacity: 1,
              textAlignment: 'center',
              visible: true
            }
          ];
          setLayers(newLayers);
          setSelectedLayerId(newLayers[0].id);
          pushHistory({ bgSrc: url, bgGradient: null, layers: newLayers, layoutMode });
          triggerNotification('success', 'Image dropped successfully!');
        };
        img.src = url;
      };
      reader.readAsDataURL(file);
    }
  };

  // Creator Controls: Layer Mutators
  const addTextLayer = () => {
    const newLayer: Layer = {
      id: `text-${Date.now()}`,
      type: 'text',
      text: 'New Caption Text',
      x: 50,
      y: layers.length > 0 ? 50 : 25,
      fontSize: 36,
      color: '#ffffff',
      strokeColor: '#000000',
      strokeWidth: 5,
      fontFamily: 'Impact, sans-serif',
      uppercase: true,
      bold: true,
      italic: false,
      scale: 1,
      rotation: 0,
      opacity: 1,
      textAlignment: 'center',
      visible: true
    };
    const nextLayers = [...layers, newLayer];
    setLayers(nextLayers);
    setSelectedLayerId(newLayer.id);
    setActiveTab('text');
    pushHistory({ bgSrc: imageSrc, bgGradient, layers: nextLayers, layoutMode });
  };

  const addStickerLayer = (emoji: string) => {
    const newLayer: Layer = {
      id: `sticker-${Date.now()}`,
      type: 'sticker',
      emoji,
      x: 50,
      y: 50,
      fontSize: 54,
      color: '#ffffff',
      strokeColor: 'transparent',
      strokeWidth: 0,
      fontFamily: 'sans-serif',
      uppercase: false,
      bold: false,
      italic: false,
      scale: 1,
      rotation: 0,
      opacity: 1,
      textAlignment: 'center',
      visible: true
    };
    const nextLayers = [...layers, newLayer];
    setLayers(nextLayers);
    setSelectedLayerId(newLayer.id);
    pushHistory({ bgSrc: imageSrc, bgGradient, layers: nextLayers, layoutMode });
  };

  const deleteLayer = (id: string) => {
    const nextLayers = layers.filter(l => l.id !== id);
    setLayers(nextLayers);
    if (selectedLayerId === id) setSelectedLayerId(null);
    pushHistory({ bgSrc: imageSrc, bgGradient, layers: nextLayers, layoutMode });
  };

  const moveLayerOrder = (index: number, direction: 'up' | 'down') => {
    const nextLayers = [...layers];
    if (direction === 'up' && index < layers.length - 1) {
      const temp = nextLayers[index];
      nextLayers[index] = nextLayers[index + 1];
      nextLayers[index + 1] = temp;
    } else if (direction === 'down' && index > 0) {
      const temp = nextLayers[index];
      nextLayers[index] = nextLayers[index - 1];
      nextLayers[index - 1] = temp;
    }
    setLayers(nextLayers);
    pushHistory({ bgSrc: imageSrc, bgGradient, layers: nextLayers, layoutMode });
  };

  const updateSelectedLayer = (fields: Partial<Layer>) => {
    if (!selectedLayerId) return;
    setLayers(prev => prev.map(l => {
      if (l.id === selectedLayerId) {
        return { ...l, ...fields };
      }
      return l;
    }));
  };

  // Debounced/Slide-end history trigger for sliders
  const handleSliderRelease = () => {
    pushHistory({ bgSrc: imageSrc, bgGradient, layers, layoutMode });
  };

  // Selected layer reference
  const selectedLayer = useMemo(() => {
    return layers.find(l => l.id === selectedLayerId) || null;
  }, [layers, selectedLayerId]);

  // Emoji Search filter
  const filteredEmojis = useMemo(() => {
    if (!searchEmoji.trim()) return EMOJI_CATEGORIES;
    const query = searchEmoji.toLowerCase();
    
    // search across all lists
    const matches: string[] = [];
    Object.values(EMOJI_CATEGORIES).flat().forEach(e => {
      matches.push(e); // Simplistic full list search
    });
    
    return {
      smileys: matches.slice(0, 24),
      gestures: [],
      symbols: []
    };
  }, [searchEmoji]);

  // Save draft helper
  const handleSaveDraft = () => {
    const draft: MemeDraft = {
      id: `draft-${Date.now()}`,
      name: `Meme Draft - ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      timestamp: Date.now(),
      bgSrc: imageSrc,
      bgGradient,
      layoutMode,
      aspectRatio,
      filters,
      layers
    };

    setDrafts(prev => {
      const next = [draft, ...prev].slice(0, 25);
      localStorage.setItem('meme_generator_drafts', JSON.stringify(next));
      return next;
    });

    triggerNotification('success', 'Draft saved to local storage!');
  };

  const handleLoadDraft = (draft: MemeDraft) => {
    setImageSrc(draft.bgSrc);
    setBgGradient(draft.bgGradient);
    setLayoutMode(draft.layoutMode);
    setAspectRatio(draft.aspectRatio);
    setFilters(draft.filters);
    setLayers(draft.layers);
    setSelectedLayerId(draft.layers[0]?.id || null);
    
    if (draft.bgSrc) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => setBgImage(img);
      img.src = draft.bgSrc;
    } else {
      setBgImage(null);
    }

    pushHistory({ bgSrc: draft.bgSrc, bgGradient: draft.bgGradient, layers: draft.layers, layoutMode: draft.layoutMode });
    setActiveSubView('editor');
    triggerNotification('success', 'Draft loaded successfully!');
  };

  const handleDeleteDraft = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDrafts(prev => {
      const next = prev.filter(d => d.id !== id);
      localStorage.setItem('meme_generator_drafts', JSON.stringify(next));
      return next;
    });
    triggerNotification('success', 'Draft removed!');
  };

  // Reset function
  const resetCanvas = () => {
    setBgImage(null);
    setImageSrc(null);
    setBgGradient(null);
    setLayers([]);
    setSelectedLayerId(null);
    setLayoutMode('classic');
    setAspectRatio('1:1');
    setFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      grayscale: 0,
      sepia: 0,
      hueRotate: 0,
      rotation: 0,
      flipH: false,
      flipV: false
    });
    setHistory([]);
    setHistoryIndex(-1);
    
    // Reload default
    loadTemplate(DEFAULT_TEMPLATES[0]);
    triggerNotification('success', 'Workspace cleared!');
  };

  // Export Meme
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsSaving(true);
    
    setTimeout(() => {
      try {
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = canvas.width;
        exportCanvas.height = canvas.height;
        const exportCtx = exportCanvas.getContext('2d');
        
        if (exportCtx) {
          // Render layout without bounding boxes and guidelines
          renderMeme(exportCtx, exportCanvas.width, exportCanvas.height, true);
          
          const mimeType = exportFormat === 'png' ? 'image/png' : (exportFormat === 'webp' ? 'image/webp' : 'image/jpeg');
          const quality = exportFormat === 'png' ? undefined : exportQuality;
          
          exportCanvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${fileName}.${exportFormat}`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
              
              // export logs
              const logItem: ExportHistoryItem = {
                fileName: `${fileName}.${exportFormat}`,
                timestamp: Date.now(),
                format: exportFormat
              };
              
              setExportHistory(prev => {
                const next = [logItem, ...prev].slice(0, 15);
                localStorage.setItem('meme_generator_export_history', JSON.stringify(next));
                return next;
              });
              
              triggerNotification('success', 'Meme downloaded successfully!');
            }
            setIsSaving(false);
          }, mimeType, quality);
        }
      } catch (err) {
        console.error('Download failed', err);
        triggerNotification('error', 'Download failed. Try another image.');
        setIsSaving(false);
      }
    }, 120);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {showNotification && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-xl text-white animate-fade-in transition-all ${
          showNotification.type === 'success' ? 'bg-[#518231]' : 'bg-red-600'
        }`}>
          {showNotification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-medium">{showNotification.message}</span>
        </div>
      )}

      {/* Editor Navigation Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 dark:border-slate-800 pb-4 gap-4">
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
          <button
            onClick={() => setActiveSubView('editor')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeSubView === 'editor'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles size={16} />
            Meme Studio
          </button>
          <button
            onClick={() => setActiveSubView('drafts')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeSubView === 'drafts'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Save size={16} />
            Saved Drafts ({drafts.length})
          </button>
          <button
            onClick={() => setActiveSubView('tips')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeSubView === 'tips'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Grid size={16} />
            Meme Guide
          </button>
        </div>

        {activeSubView === 'editor' && (
          <div className="flex items-center gap-2">
            <button
              onClick={triggerUndo}
              disabled={historyIndex <= 0}
              className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg disabled:opacity-40 disabled:hover:bg-slate-100 transition-colors"
              title="Undo"
            >
              <Undo2 size={18} />
            </button>
            <button
              onClick={triggerRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg disabled:opacity-40 disabled:hover:bg-slate-100 transition-colors"
              title="Redo"
            >
              <Redo2 size={18} />
            </button>
            <span className="h-6 w-px bg-slate-200 dark:bg-slate-800 mx-1"></span>
            <button
              onClick={handleSaveDraft}
              className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-sm font-medium rounded-lg transition-colors"
            >
              <Save size={16} />
              Save Draft
            </button>
            <button
              onClick={resetCanvas}
              className="flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-950/35 dark:hover:bg-red-950/60 text-red-600 dark:text-red-400 text-sm font-medium rounded-lg transition-colors"
            >
              <RefreshCw size={16} />
              Reset
            </button>
          </div>
        )}
      </div>

      {activeSubView === 'drafts' && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Your Saved Drafts</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Drafts are saved locally in your browser cache.</p>
          </div>

          {drafts.length === 0 ? (
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center">
              <Save size={40} className="text-slate-400 mb-3" />
              <p className="text-slate-600 dark:text-slate-300 font-medium">No saved drafts yet</p>
              <p className="text-slate-400 text-sm max-w-sm mt-1">Design a meme in the studio, click "Save Draft" to persist your progress locally here.</p>
              <button 
                onClick={() => setActiveSubView('editor')} 
                className="mt-4 px-4 py-2 bg-[#518231] hover:bg-[#436e29] text-white text-sm font-medium rounded-lg transition-colors"
              >
                Go to Meme Studio
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {drafts.map((draft) => (
                <div 
                  key={draft.id} 
                  onClick={() => handleLoadDraft(draft)}
                  className="flex flex-col justify-between border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl p-4 cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-all group shadow-sm"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200 truncate pr-4">{draft.name}</h4>
                      <button 
                        onClick={(e) => handleDeleteDraft(draft.id, e)}
                        className="p-1 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded transition-colors"
                        title="Delete draft"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="flex gap-2 mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {draft.layoutMode}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        Ratio: {draft.aspectRatio}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <span>{new Date(draft.timestamp).toLocaleDateString()}</span>
                    <span className="text-[#518231] group-hover:underline flex items-center font-medium">
                      Load Studio <ChevronRight size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSubView === 'tips' && (
        <div className="space-y-6 animate-fade-in max-w-4xl">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Meme Design Best Practices</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Follow these principles to create clean, legible, and highly shareable memes.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 bg-slate-50 dark:bg-slate-900/40">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Type size={18} className="text-[#518231]" /> Typography Guidelines
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li><strong className="text-slate-800 dark:text-white">Classic Impact</strong>: Best with heavy uppercase letters, colored white with a thick black stroke (5px to 8px). Used for punchy top/bottom texts.</li>
                <li><strong className="text-slate-800 dark:text-white">Modern Clean (Sans)</strong>: Best for Twitter/Reddit captions. Use black text inside a solid white header panel without borders.</li>
                <li><strong className="text-slate-800 dark:text-white">Contrast is Key</strong>: Make sure the stroke color is opposite of the text fill color to stay readable on any background.</li>
              </ul>
            </div>

            <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 bg-slate-50 dark:bg-slate-900/40">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Maximize2 size={18} className="text-[#518231]" /> Social Resizing
              </h4>
              <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li><strong className="text-slate-800 dark:text-white">1:1 Square</strong>: The gold standard for Instagram grids, Facebook, and LinkedIn.</li>
                <li><strong className="text-slate-800 dark:text-white">9:16 Vertical</strong>: Mandatory for TikTok, Reels, and YouTube Shorts. Place caption layers near the top or middle to avoid video interface overlays.</li>
                <li><strong className="text-slate-800 dark:text-white">16:9 Landscape</strong>: Perfect for YouTube thumbnails, Twitter posts, and presentations.</li>
              </ul>
            </div>
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-6 bg-slate-950 text-white space-y-4">
            <h4 className="font-bold text-lg flex items-center gap-2">
              🚀 How to export in High Resolution?
            </h4>
            <p className="text-slate-300 text-sm">
              Our studio automatically handles high-resolution rendering. Rather than saving a blurry screenshot of your browser viewport, the exporter renders a dedicated high-fidelity image that matches the exact original aspect ratio and dimensions of your uploaded source image. Keep PNG selected for maximum quality and lossless compression!
            </p>
          </div>
        </div>
      )}

      {activeSubView === 'editor' && (
        <div className="flex flex-col lg:flex-row gap-6 h-auto min-h-[680px] items-stretch">
          
          {/* LEFT PANEL - CONFIGURATION CONTROLS */}
          <div className="w-full lg:w-[360px] shrink-0 flex flex-col border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden shadow-sm">
            {/* Tabs Selector Header */}
            <div className="grid grid-cols-5 border-b border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-slate-950 p-1">
              <button
                onClick={() => setActiveTab('templates')}
                className={`py-2 px-1 text-xs font-semibold rounded-md flex flex-col items-center gap-1 transition-all ${
                  activeTab === 'templates' 
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
                title="Templates"
              >
                <Grid size={15} />
                <span>Presets</span>
              </button>
              <button
                onClick={() => setActiveTab('text')}
                className={`py-2 px-1 text-xs font-semibold rounded-md flex flex-col items-center gap-1 transition-all ${
                  activeTab === 'text' 
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
                title="Text Customize"
              >
                <Type size={15} />
                <span>Text</span>
              </button>
              <button
                onClick={() => setActiveTab('stickers')}
                className={`py-2 px-1 text-xs font-semibold rounded-md flex flex-col items-center gap-1 transition-all ${
                  activeTab === 'stickers' 
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
                title="Stickers Overlay"
              >
                <Smile size={15} />
                <span>Emojis</span>
              </button>
              <button
                onClick={() => setActiveTab('adjust')}
                className={`py-2 px-1 text-xs font-semibold rounded-md flex flex-col items-center gap-1 transition-all ${
                  activeTab === 'adjust' 
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
                title="Image Adjustments"
              >
                <Sliders size={15} />
                <span>Adjust</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`py-2 px-1 text-xs font-semibold rounded-md flex flex-col items-center gap-1 transition-all ${
                  activeTab === 'settings' 
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs' 
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
                title="Canvas Settings"
              >
                <Move size={15} />
                <span>Layout</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 p-4 overflow-y-auto max-h-[560px]">
              
              {/* TAB: TEMPLATES */}
              {activeTab === 'templates' && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Upload Custom Image</h4>
                    <div 
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all ${
                        dragActive 
                          ? 'border-[#518231] bg-[#518231]/5' 
                          : 'border-slate-300 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-900'
                      }`}
                    >
                      <Upload className="mx-auto text-slate-400 mb-2" size={24} />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300 block">Drag & Drop Image or Click</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Supports PNG, JPG, WEBP</span>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload}
                        className="hidden" 
                      />
                    </div>
                  </div>

                  <span className="block h-px bg-slate-200 dark:bg-slate-800 my-2"></span>

                  <div>
                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Linear Gradients</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {GRADIENT_PRESETS.map(preset => (
                        <button
                          key={preset.id}
                          onClick={() => loadGradient(preset.id)}
                          className={`h-11 rounded-lg bg-gradient-to-br ${preset.css} flex items-center justify-center border transition-all ${
                            bgGradient === preset.id 
                              ? 'border-slate-900 dark:border-white ring-2 ring-[#518231]' 
                              : 'border-transparent hover:scale-105'
                          }`}
                          title={preset.name}
                        >
                          <span className="text-[10px] font-bold text-white tracking-wider px-1 text-center bg-black/25 rounded drop-shadow">
                            {preset.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <span className="block h-px bg-slate-200 dark:bg-slate-800 my-2"></span>

                  <div>
                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Classic Templates</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {DEFAULT_TEMPLATES.map(tpl => (
                        <div 
                          key={tpl.id}
                          onClick={() => loadTemplate(tpl)}
                          className={`relative h-20 rounded-lg overflow-hidden border cursor-pointer hover:scale-103 transition-all ${
                            imageSrc === tpl.url 
                              ? 'border-[#518231] ring-2 ring-[#518231]' 
                              : 'border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={tpl.url} alt={tpl.name} className="w-full h-full object-cover" />
                          <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1">
                            <p className="text-[10px] font-bold text-white text-center truncate">{tpl.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: TEXT */}
              {activeTab === 'text' && (
                <div className="space-y-4 animate-fade-in">
                  <button
                    onClick={addTextLayer}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-4 bg-[#518231] hover:bg-[#436e29] text-white font-medium rounded-lg text-sm transition-colors"
                  >
                    <Plus size={16} />
                    Add Text Layer
                  </button>

                  {selectedLayer && selectedLayer.type === 'text' ? (
                    <div className="space-y-4 border border-slate-200 dark:border-slate-800 rounded-lg p-3 bg-white dark:bg-slate-950">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Customize Layer</span>
                        <button 
                          onClick={() => deleteLayer(selectedLayer.id)}
                          className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20"
                          title="Delete text layer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Caption Text</label>
                        <textarea
                          value={selectedLayer.text || ''}
                          onChange={(e) => updateSelectedLayer({ text: e.target.value })}
                          onBlur={handleSliderRelease}
                          rows={2}
                          className="w-full text-sm p-2 rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#518231]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Font Size ({selectedLayer.fontSize}px)</label>
                          <input 
                            type="range"
                            min="14"
                            max="90"
                            value={selectedLayer.fontSize}
                            onChange={(e) => updateSelectedLayer({ fontSize: Number(e.target.value) })}
                            onMouseUp={handleSliderRelease}
                            onTouchEnd={handleSliderRelease}
                            className="w-full accent-[#518231]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Outline Width ({selectedLayer.strokeWidth}px)</label>
                          <input 
                            type="range"
                            min="0"
                            max="12"
                            value={selectedLayer.strokeWidth}
                            onChange={(e) => updateSelectedLayer({ strokeWidth: Number(e.target.value) })}
                            onMouseUp={handleSliderRelease}
                            onTouchEnd={handleSliderRelease}
                            className="w-full accent-[#518231]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Text Color</label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="color"
                              value={selectedLayer.color}
                              onChange={(e) => updateSelectedLayer({ color: e.target.value })}
                              onBlur={handleSliderRelease}
                              className="w-8 h-8 rounded-md border border-slate-300 cursor-pointer overflow-hidden bg-transparent"
                            />
                            <span className="text-xs uppercase font-mono text-slate-600 dark:text-slate-300">{selectedLayer.color}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Outline Color</label>
                          <div className="flex items-center gap-2">
                            <input 
                              type="color"
                              value={selectedLayer.strokeColor === 'transparent' ? '#000000' : selectedLayer.strokeColor}
                              onChange={(e) => updateSelectedLayer({ strokeColor: e.target.value })}
                              onBlur={handleSliderRelease}
                              disabled={selectedLayer.strokeWidth === 0}
                              className="w-8 h-8 rounded-md border border-slate-300 cursor-pointer overflow-hidden bg-transparent disabled:opacity-40"
                            />
                            <span className="text-xs uppercase font-mono text-slate-600 dark:text-slate-300">
                              {selectedLayer.strokeWidth === 0 ? 'None' : selectedLayer.strokeColor}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 block">Typography</label>
                        <select
                          value={selectedLayer.fontFamily}
                          onChange={(e) => {
                            updateSelectedLayer({ fontFamily: e.target.value });
                            handleSliderRelease();
                          }}
                          className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                        >
                          <option value='Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif'>Impact (Classic Meme)</option>
                          <option value='system-ui, -apple-system, sans-serif'>Inter / System Sans</option>
                          <option value='"Arial, Helvetica", sans-serif'>Arial Standard</option>
                          <option value='"Comic Sans MS", cursive'>Comic Sans (Funny)</option>
                          <option value='Georgia, serif'>Georgia Serif</option>
                          <option value='"Courier New", monospace'>Courier Code</option>
                        </select>
                      </div>

                      <div className="flex justify-between items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => {
                              updateSelectedLayer({ bold: !selectedLayer.bold });
                              handleSliderRelease();
                            }}
                            className={`p-2 rounded text-xs font-bold transition-all border ${
                              selectedLayer.bold 
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900' 
                                : 'border-slate-200 text-slate-700 dark:text-slate-300'
                            }`}
                            title="Bold"
                          >
                            B
                          </button>
                          <button
                            onClick={() => {
                              updateSelectedLayer({ italic: !selectedLayer.italic });
                              handleSliderRelease();
                            }}
                            className={`p-2 rounded text-xs italic transition-all border ${
                              selectedLayer.italic 
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900' 
                                : 'border-slate-200 text-slate-700 dark:text-slate-300'
                            }`}
                            title="Italic"
                          >
                            I
                          </button>
                          <button
                            onClick={() => {
                              updateSelectedLayer({ uppercase: !selectedLayer.uppercase });
                              handleSliderRelease();
                            }}
                            className={`p-2 rounded text-[10px] font-bold transition-all border uppercase ${
                              selectedLayer.uppercase 
                                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900' 
                                : 'border-slate-200 text-slate-700 dark:text-slate-300'
                            }`}
                            title="Convert to Uppercase"
                          >
                            aA
                          </button>
                        </div>

                        {/* Alignment */}
                        <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded border border-slate-200 dark:border-slate-700">
                          {['left', 'center', 'right'].map((align) => (
                            <button
                              key={align}
                              onClick={() => {
                                updateSelectedLayer({ textAlignment: align as any });
                                handleSliderRelease();
                              }}
                              className={`px-2 py-1 text-[10px] font-bold rounded capitalize transition-all ${
                                selectedLayer.textAlignment === align
                                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                              }`}
                            >
                              {align}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg bg-slate-100/30">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Select a text layer on the canvas or click "Add Text Layer" above to design custom text overlay.</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: STICKERS */}
              {activeTab === 'stickers' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Search emojis..."
                      value={searchEmoji}
                      onChange={(e) => setSearchEmoji(e.target.value)}
                      className="w-full text-xs p-2 pr-8 rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                    />
                    {searchEmoji && (
                      <button 
                        onClick={() => setSearchEmoji('')}
                        className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                      >
                        <X size={13} />
                      </button>
                    )}
                  </div>

                  {selectedLayer && selectedLayer.type === 'sticker' && (
                    <div className="space-y-3 border border-slate-200 dark:border-slate-800 rounded-lg p-3 bg-white dark:bg-slate-950">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Selected Emoji ({selectedLayer.emoji})</span>
                        <button 
                          onClick={() => deleteLayer(selectedLayer.id)}
                          className="text-red-500 hover:text-red-600 p-1 rounded hover:bg-red-50 dark:hover:bg-red-950/20"
                          title="Delete sticker"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Scale ({selectedLayer.scale.toFixed(1)}x)</label>
                          <input 
                            type="range"
                            min="0.4"
                            max="4.0"
                            step="0.1"
                            value={selectedLayer.scale}
                            onChange={(e) => updateSelectedLayer({ scale: Number(e.target.value) })}
                            onMouseUp={handleSliderRelease}
                            onTouchEnd={handleSliderRelease}
                            className="w-full accent-[#518231]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Rotation ({selectedLayer.rotation}°)</label>
                          <input 
                            type="range"
                            min="0"
                            max="360"
                            value={selectedLayer.rotation}
                            onChange={(e) => updateSelectedLayer({ rotation: Number(e.target.value) })}
                            onMouseUp={handleSliderRelease}
                            onTouchEnd={handleSliderRelease}
                            className="w-full accent-[#518231]"
                          />
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <label className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Opacity ({Math.round(selectedLayer.opacity * 100)}%)</label>
                        <input 
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.05"
                          value={selectedLayer.opacity}
                          onChange={(e) => updateSelectedLayer({ opacity: Number(e.target.value) })}
                          onMouseUp={handleSliderRelease}
                          onTouchEnd={handleSliderRelease}
                          className="w-full accent-[#518231]"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    {Object.entries(filteredEmojis).map(([categoryName, emojiList]) => {
                      if (emojiList.length === 0) return null;
                      return (
                        <div key={categoryName}>
                          <h5 className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-1">{categoryName}</h5>
                          <div className="grid grid-cols-6 gap-2 bg-slate-100/50 dark:bg-slate-950 p-2 rounded-lg">
                            {emojiList.map(emoji => (
                              <button
                                key={emoji}
                                onClick={() => addStickerLayer(emoji)}
                                className="h-10 text-2xl hover:scale-120 transition-all flex items-center justify-center bg-white dark:bg-slate-900 rounded-md shadow-xs hover:shadow-sm"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB: ADJUSTMENTS */}
              {activeTab === 'adjust' && (
                <div className="space-y-4 animate-fade-in text-xs">
                  <div>
                    <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-1">
                      <Sliders size={14} className="text-[#518231]" /> Photo Filter Adjustments
                    </h5>
                    
                    <div className="space-y-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-lg">
                      <div className="space-y-1">
                        <div className="flex justify-between font-medium">
                          <span>Brightness</span>
                          <span>{filters.brightness}%</span>
                        </div>
                        <input 
                          type="range"
                          min="30"
                          max="180"
                          value={filters.brightness}
                          onChange={(e) => setFilters(p => ({ ...p, brightness: Number(e.target.value) }))}
                          onMouseUp={handleSliderRelease}
                          onTouchEnd={handleSliderRelease}
                          className="w-full accent-[#518231]"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-medium">
                          <span>Contrast</span>
                          <span>{filters.contrast}%</span>
                        </div>
                        <input 
                          type="range"
                          min="30"
                          max="180"
                          value={filters.contrast}
                          onChange={(e) => setFilters(p => ({ ...p, contrast: Number(e.target.value) }))}
                          onMouseUp={handleSliderRelease}
                          onTouchEnd={handleSliderRelease}
                          className="w-full accent-[#518231]"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-medium">
                          <span>Saturation</span>
                          <span>{filters.saturation}%</span>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="200"
                          value={filters.saturation}
                          onChange={(e) => setFilters(p => ({ ...p, saturation: Number(e.target.value) }))}
                          onMouseUp={handleSliderRelease}
                          onTouchEnd={handleSliderRelease}
                          className="w-full accent-[#518231]"
                        />
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between font-medium">
                          <span>Blur Radius</span>
                          <span>{filters.blur}px</span>
                        </div>
                        <input 
                          type="range"
                          min="0"
                          max="15"
                          value={filters.blur}
                          onChange={(e) => setFilters(p => ({ ...p, blur: Number(e.target.value) }))}
                          onMouseUp={handleSliderRelease}
                          onTouchEnd={handleSliderRelease}
                          className="w-full accent-[#518231]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-3">Background Transform</h5>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setFilters(p => ({ ...p, flipH: !p.flipH }));
                          pushHistory({ bgSrc: imageSrc, bgGradient, layers, layoutMode });
                        }}
                        className={`flex-1 py-2 px-3 border rounded-lg flex items-center justify-center gap-1 transition-all ${
                          filters.flipH 
                            ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-950 dark:border-white' 
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <FlipHorizontal size={14} /> Flip H
                      </button>
                      <button
                        onClick={() => {
                          setFilters(p => ({ ...p, flipV: !p.flipV }));
                          pushHistory({ bgSrc: imageSrc, bgGradient, layers, layoutMode });
                        }}
                        className={`flex-1 py-2 px-3 border rounded-lg flex items-center justify-center gap-1 transition-all ${
                          filters.flipV 
                            ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-950 dark:border-white' 
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <FlipVertical size={14} /> Flip V
                      </button>
                      <button
                        onClick={() => {
                          const nextRot = (filters.rotation + 90) % 360;
                          setFilters(p => ({ ...p, rotation: nextRot }));
                          pushHistory({ bgSrc: imageSrc, bgGradient, layers, layoutMode });
                        }}
                        className="py-2 px-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center gap-1"
                      >
                        <RotateCw size={14} /> Rotate
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SETTINGS & PRESETS */}
              {activeTab === 'settings' && (
                <div className="space-y-4 animate-fade-in text-xs">
                  <div>
                    <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-2">Meme Layout Style</h5>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'classic', label: 'Classic Impact', desc: 'Uppercase Impact' },
                        { id: 'modern', label: 'Modern Banner', desc: 'White block text top' },
                        { id: 'tiktok', label: 'TikTok Capsule', desc: 'Translucent pills' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setLayoutMode(item.id as any);
                            pushHistory({ bgSrc: imageSrc, bgGradient, layers, layoutMode: item.id });
                          }}
                          className={`p-2 border rounded-lg flex flex-col items-center justify-center gap-1 text-center transition-all ${
                            layoutMode === item.id
                              ? 'border-[#518231] bg-[#518231]/5 text-[#518231] ring-1 ring-[#518231]'
                              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          <span className="font-bold block text-[10px]">{item.label}</span>
                          <span className="text-[8px] text-slate-400 block">{item.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <span className="block h-px bg-slate-200 dark:bg-slate-800 my-2"></span>

                  <div>
                    <h5 className="font-bold text-slate-700 dark:text-slate-300 mb-2">Social Aspect Ratio</h5>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[
                        { id: 'original', label: 'Free' },
                        { id: '1:1', label: '1:1 (Post)' },
                        { id: '9:16', label: '9:16 (Tall)' },
                        { id: '16:9', label: '16:9 (Wide)' },
                        { id: '4:5', label: '4:5 (Story)' }
                      ].map((ratio) => (
                        <button
                          key={ratio.id}
                          onClick={() => {
                            setAspectRatio(ratio.id);
                            pushHistory({ bgSrc: imageSrc, bgGradient, layers, layoutMode });
                          }}
                          className={`py-2 px-1 border rounded-lg text-center font-bold text-[9px] transition-all truncate ${
                            aspectRatio === ratio.id
                              ? 'border-[#518231] bg-[#518231]/5 text-[#518231] ring-1 ring-[#518231]'
                              : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                        >
                          {ratio.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <span className="block h-px bg-slate-200 dark:bg-slate-800 my-2"></span>

                  <div className="flex items-center justify-between py-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-lg">
                    <div>
                      <span className="font-bold text-slate-700 dark:text-slate-300 block">Snap alignment guides</span>
                      <span className="text-[9px] text-slate-400">Snaps text to horizontal/vertical center</span>
                    </div>
                    <button
                      onClick={() => setGuides(!guides)}
                      className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${
                        guides ? 'bg-[#518231]' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform ${
                        guides ? 'translate-x-4' : 'translate-x-0'
                      }`} />
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* CENTER VIEWPORT - INTERACTIVE CANVAS */}
          <div className="flex-1 flex flex-col items-center justify-between border border-slate-200 dark:border-slate-800 bg-slate-950 rounded-xl p-4 min-h-[500px] relative overflow-hidden">
            {/* Action Bar */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-900 z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Filename:</span>
                <input 
                  type="text" 
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''))}
                  className="bg-transparent text-slate-200 text-xs border-b border-slate-800 focus:border-[#518231] focus:outline-none py-0.5 px-1 font-mono max-w-[140px]"
                />
              </div>

              {/* View Size Display */}
              {canvasRef.current && (
                <div className="text-[10px] text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded">
                  Internal Resolution: {canvasRef.current.width} × {canvasRef.current.height}
                </div>
              )}
            </div>

            {/* Canvas Container Viewport */}
            <div className="flex-1 w-full flex items-center justify-center py-6 overflow-hidden">
              <div 
                className="relative overflow-visible transition-transform ease-out duration-100 flex items-center justify-center p-2"
                style={{ 
                  transform: `scale(${zoom})`,
                  maxHeight: '440px',
                  maxWidth: '440px',
                  aspectRatio: aspectRatio === '1:1' ? '1/1' : (aspectRatio === '9:16' ? '9/16' : (aspectRatio === '16:9' ? '16/9' : (aspectRatio === '4:5' ? '4/5' : 'auto')))
                }}
              >
                <canvas
                  ref={canvasRef}
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  onMouseLeave={handleCanvasMouseUp}
                  onTouchStart={handleCanvasTouchStart}
                  onTouchMove={handleCanvasTouchMove}
                  onTouchEnd={handleCanvasTouchEnd}
                  className="shadow-2xl border border-slate-800/80 bg-slate-900/60 rounded-sm cursor-crosshair max-w-full max-h-[380px] object-contain"
                />
              </div>
            </div>

            {/* Zoom / Scaling Controls footer */}
            <div className="w-full flex justify-between items-center pt-3 border-t border-slate-900 bg-slate-950/70 z-10">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <button 
                  onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} 
                  className="p-1.5 hover:bg-slate-900 text-slate-300 rounded"
                  title="Zoom Out"
                >
                  <ZoomOut size={14} />
                </button>
                <span className="w-10 text-center font-mono text-[10px]">{Math.round(zoom * 100)}%</span>
                <button 
                  onClick={() => setZoom(z => Math.min(1.8, z + 0.1))} 
                  className="p-1.5 hover:bg-slate-900 text-slate-300 rounded"
                  title="Zoom In"
                >
                  <ZoomIn size={14} />
                </button>
                <button 
                  onClick={() => setZoom(1.0)} 
                  className="px-2 py-0.5 hover:bg-slate-900 text-[10px] rounded border border-slate-850 hover:text-white"
                >
                  Reset
                </button>
              </div>

              {selectedLayer && (
                <div className="text-[10px] bg-blue-955 text-blue-400 px-2 py-0.5 rounded border border-blue-900/40 flex items-center gap-1 animate-pulse">
                  <Move size={10} />
                  Drag layer on screen to position
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL - LAYERS & EXPORT */}
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 shadow-sm justify-between gap-6">
            
            {/* Layers List Panel */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Layers size={13} /> Edit Layers ({layers.length})
                </h4>
              </div>

              {layers.length === 0 ? (
                <div className="text-center p-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg bg-slate-100/30">
                  <p className="text-[11px] text-slate-400">No active layers. Add text or emojis from the panels on the left.</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {layers.map((layer, index) => {
                    const isSelected = layer.id === selectedLayerId;
                    return (
                      <div
                        key={layer.id}
                        onClick={() => setSelectedLayerId(layer.id)}
                        className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-blue-50/50 dark:bg-blue-955 border-blue-400 dark:border-blue-700/60'
                            : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className="text-[10px] font-bold text-slate-400 w-3 text-center">{index + 1}</span>
                          <span className="font-medium truncate text-slate-800 dark:text-slate-300">
                            {layer.type === 'text' ? (layer.text || 'Empty text') : `Emoji: ${layer.emoji}`}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateSelectedLayer({ visible: !layer.visible });
                            }}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 rounded"
                            title="Toggle Visibility"
                          >
                            {layer.visible ? <Eye size={12} /> : <EyeOff size={12} />}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              moveLayerOrder(index, 'down');
                            }}
                            disabled={index === 0}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 disabled:opacity-30 rounded"
                            title="Move Down"
                          >
                            ▼
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              moveLayerOrder(index, 'up');
                            }}
                            disabled={index === layers.length - 1}
                            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 disabled:opacity-30 rounded"
                            title="Move Up"
                          >
                            ▲
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteLayer(layer.id);
                            }}
                            className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded"
                            title="Delete Layer"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Export Manager panel */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <FileDown size={13} /> Export Settings
              </h4>

              <div className="grid grid-cols-3 gap-2">
                {['png', 'jpeg', 'webp'].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setExportFormat(fmt as any)}
                    className={`py-1.5 border rounded-lg text-center font-bold text-[10px] transition-all capitalize ${
                      exportFormat === fmt
                        ? 'border-[#518231] bg-[#518231]/5 text-[#518231]'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              {exportFormat !== 'png' && (
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium">
                    <span>Quality</span>
                    <span>{Math.round(exportQuality * 100)}%</span>
                  </div>
                  <input 
                    type="range"
                    min="0.4"
                    max="1.0"
                    step="0.05"
                    value={exportQuality}
                    onChange={(e) => setExportQuality(Number(e.target.value))}
                    className="w-full accent-[#518231]"
                  />
                </div>
              )}

              <button
                onClick={handleDownload}
                disabled={isSaving}
                className="w-full py-2.5 px-4 bg-[#518231] hover:bg-[#436e29] disabled:bg-[#518231]/70 text-white font-bold rounded-lg text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} />
                    Rendering High-Res...
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Download Meme
                  </>
                )}
              </button>
            </div>

            {/* Export Log History */}
            {exportHistory.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block flex items-center gap-1">
                  <History size={10} /> Recent Downloads
                </span>
                <div className="max-h-[80px] overflow-y-auto space-y-1">
                  {exportHistory.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      <span className="truncate max-w-[150px]">{item.fileName}</span>
                      <span>{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
}
