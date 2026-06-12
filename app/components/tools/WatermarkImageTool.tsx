"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Upload, X, Download, Shield, Settings, Type, ImageIcon, Layers, RefreshCw, 
  Trash2, Plus, GripHorizontal, Move, AlignLeft, AlignCenter, AlignRight, ZoomIn
} from 'lucide-react';
import JSZip from 'jszip';
import { useTranslations } from 'next-intl';

interface QueueItem {
  id: string;
  file: File;
  previewUrl: string;
  originalWidth: number;
  originalHeight: number;
}

type WatermarkType = 'text' | 'logo';
type PositionSnap = 'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right' | 'custom';

interface WatermarkSettings {
  type: WatermarkType;
  
  // Text specific
  text: string;
  fontFamily: string;
  fontColor: string;
  hasShadow: boolean;
  
  // Logo specific
  logoFile: File | null;
  logoUrl: string | null;
  
  // Shared
  scale: number; // 0-100 (relative to image width)
  opacity: number; // 0-100
  rotation: number; // -180 to 180
  
  // Position
  positionSnap: PositionSnap;
  posX: number; // 0-100%
  posY: number; // 0-100%
  
  // Tiled
  isTiled: boolean;
  tiledDensity: number; // 1-10
}

const DEFAULT_SETTINGS: WatermarkSettings = {
  type: 'text',
  text: '© Copyright',
  fontFamily: 'Arial, sans-serif',
  fontColor: '#ffffff',
  hasShadow: true,
  logoFile: null,
  logoUrl: null,
  scale: 15,
  opacity: 50,
  rotation: 0,
  positionSnap: 'bottom-right',
  posX: 95,
  posY: 95,
  isTiled: false,
  tiledDensity: 5,
};

export function WatermarkImageTool() {
  const t = useTranslations('Tools');
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [settings, setSettings] = useState<WatermarkSettings>(DEFAULT_SETTINGS);
  
  // Global Export Settings
  const [exportFormat, setExportFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [exportQuality, setExportQuality] = useState<number>(0.92);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);

  // Logo uploader ref
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Load preview when active image or settings change
  useEffect(() => {
    if (queue.length > 0 && queue[activeIndex]) {
      renderPreview(queue[activeIndex]);
    }
  }, [queue, activeIndex, settings]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    processNewFiles(Array.from(e.target.files));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      processNewFiles(Array.from(e.dataTransfer.files));
    }
  };

  const processNewFiles = async (files: File[]) => {
    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    if (imageFiles.length === 0) return;

    const newItems: QueueItem[] = await Promise.all(
      imageFiles.map(async (file) => {
        const previewUrl = URL.createObjectURL(file);
        
        return new Promise<QueueItem>((resolve) => {
          const img = new Image();
          img.onload = () => {
            resolve({
              id: Math.random().toString(36).substring(7),
              file,
              previewUrl,
              originalWidth: img.width,
              originalHeight: img.height
            });
          };
          img.src = previewUrl;
        });
      })
    );

    setQueue(prev => [...prev, ...newItems]);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setSettings(prev => ({ ...prev, logoFile: file, logoUrl: url, type: 'logo' }));
  };

  const removeFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setQueue(prev => {
      const newQueue = prev.filter(item => item.id !== id);
      if (activeIndex >= newQueue.length) {
        setActiveIndex(Math.max(0, newQueue.length - 1));
      }
      return newQueue;
    });
  };

  // The core drawing engine used for both Preview and Final Export
  const drawWatermark = (ctx: CanvasRenderingContext2D, imgWidth: number, imgHeight: number, logoImg?: HTMLImageElement) => {
    const s = settings;
    
    // Scale is a percentage of the image width
    // For text, scale represents the font size. For logo, it represents the logo width.
    const baseSize = imgWidth * (s.scale / 100);
    
    ctx.globalAlpha = s.opacity / 100;
    
    if (s.isTiled) {
      // Tiled logic
      const stepX = imgWidth / s.tiledDensity;
      const stepY = imgHeight / s.tiledDensity;
      
      for (let x = -imgWidth; x < imgWidth * 2; x += stepX) {
        for (let y = -imgHeight; y < imgHeight * 2; y += stepY) {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate((s.rotation * Math.PI) / 180);
          drawSingleWatermark(ctx, baseSize, logoImg);
          ctx.restore();
        }
      }
    } else {
      // Single Watermark logic
      
      // If using snap positioning, calculate exact X/Y based on snap string
      let finalX = (s.posX / 100) * imgWidth;
      let finalY = (s.posY / 100) * imgHeight;
      
      if (s.positionSnap !== 'custom') {
        const paddingX = imgWidth * 0.05;
        const paddingY = imgHeight * 0.05;
        
        if (s.positionSnap.includes('left')) finalX = paddingX;
        if (s.positionSnap.includes('right')) finalX = imgWidth - paddingX;
        if (s.positionSnap.includes('center')) finalX = imgWidth / 2;
        
        if (s.positionSnap.includes('top')) finalY = paddingY;
        if (s.positionSnap.includes('bottom')) finalY = imgHeight - paddingY;
        if (s.positionSnap === 'center-left' || s.positionSnap === 'center' || s.positionSnap === 'center-right') {
          finalY = imgHeight / 2;
        }
      }

      ctx.save();
      ctx.translate(finalX, finalY);
      ctx.rotate((s.rotation * Math.PI) / 180);
      drawSingleWatermark(ctx, baseSize, logoImg);
      ctx.restore();
    }
  };

  const drawSingleWatermark = (ctx: CanvasRenderingContext2D, size: number, logoImg?: HTMLImageElement) => {
    if (settings.type === 'text') {
      ctx.font = `bold ${size}px ${settings.fontFamily}`;
      ctx.fillStyle = settings.fontColor;
      
      // Determine text alignment based on position
      if (settings.positionSnap.includes('right') && !settings.isTiled) {
        ctx.textAlign = 'right';
      } else if (settings.positionSnap.includes('center') || settings.isTiled) {
        ctx.textAlign = 'center';
      } else {
        ctx.textAlign = 'left';
      }
      
      if (settings.positionSnap.includes('bottom') && !settings.isTiled) {
        ctx.textBaseline = 'bottom';
      } else if (settings.positionSnap.includes('center') || settings.isTiled) {
        ctx.textBaseline = 'middle';
      } else {
        ctx.textBaseline = 'top';
      }

      if (settings.hasShadow) {
        ctx.shadowColor = 'rgba(0,0,0,0.8)';
        ctx.shadowBlur = size * 0.15;
        ctx.shadowOffsetX = size * 0.05;
        ctx.shadowOffsetY = size * 0.05;
      } else {
        ctx.shadowColor = 'transparent';
      }
      
      ctx.fillText(settings.text, 0, 0);
      
    } else if (settings.type === 'logo' && logoImg) {
      // Calculate scaled logo dimensions preserving aspect ratio
      const aspectRatio = logoImg.height / logoImg.width;
      const finalWidth = size;
      const finalHeight = finalWidth * aspectRatio;
      
      // Offset to draw logo based on position
      let offsetX = 0;
      let offsetY = 0;
      
      if (settings.positionSnap.includes('right') && !settings.isTiled) offsetX = -finalWidth;
      else if (settings.positionSnap.includes('center') || settings.isTiled) offsetX = -finalWidth / 2;
      
      if (settings.positionSnap.includes('bottom') && !settings.isTiled) offsetY = -finalHeight;
      else if (settings.positionSnap.includes('center') || settings.isTiled) offsetY = -finalHeight / 2;

      ctx.shadowColor = 'transparent'; // No shadow for logo by default
      ctx.drawImage(logoImg, offsetX, offsetY, finalWidth, finalHeight);
    }
  };

  const renderPreview = async (item: QueueItem) => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load original image
    const img = new Image();
    img.src = item.previewUrl;
    await new Promise((resolve) => (img.onload = resolve));

    // Load logo if needed
    let logoImg: HTMLImageElement | undefined;
    if (settings.type === 'logo' && settings.logoUrl) {
      logoImg = new Image();
      logoImg.src = settings.logoUrl;
      await new Promise((resolve) => (logoImg!.onload = resolve));
    }

    // Set canvas to a fixed preview width to avoid huge memory usage in the DOM
    const previewDisplayWidth = 800;
    const previewDisplayHeight = (img.height / img.width) * previewDisplayWidth;
    
    canvas.width = previewDisplayWidth;
    canvas.height = previewDisplayHeight;

    // Draw background
    ctx.drawImage(img, 0, 0, previewDisplayWidth, previewDisplayHeight);

    // Draw watermark
    drawWatermark(ctx, previewDisplayWidth, previewDisplayHeight, logoImg);
  };

  const processWatermarkExport = async (item: QueueItem): Promise<Blob> => {
    return new Promise(async (resolve, reject) => {
      const canvas = hiddenCanvasRef.current;
      if (!canvas) return reject('No canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('No context');

      // Load original image
      const img = new Image();
      img.src = item.previewUrl;
      await new Promise((resolve) => (img.onload = resolve));

      // Load logo if needed
      let logoImg: HTMLImageElement | undefined;
      if (settings.type === 'logo' && settings.logoUrl) {
        logoImg = new Image();
        logoImg.src = settings.logoUrl;
        await new Promise((resolve) => (logoImg!.onload = resolve));
      }

      // Render at FULL resolution
      canvas.width = img.width;
      canvas.height = img.height;

      // Fill transparent backgrounds with white if exporting to JPG
      if (exportFormat === 'image/jpeg') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Draw watermark
      drawWatermark(ctx, canvas.width, canvas.height, logoImg);

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject('Failed to convert canvas to blob');
      }, exportFormat, exportQuality);
    });
  };

  const handleDownloadSingle = async (index: number) => {
    if (isProcessing) return;
    setIsProcessing(true);
    setProgress(0);
    try {
      const item = queue[index];
      const blob = await processWatermarkExport(item);
      const url = URL.createObjectURL(blob);
      const ext = exportFormat === 'image/jpeg' ? 'jpg' : exportFormat === 'image/png' ? 'png' : 'webp';
      const a = document.createElement('a');
      a.href = url;
      a.download = `watermarked_${item.file.name.split('.')[0]}.${ext}`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert('Failed to process image.');
    }
    setIsProcessing(false);
  };

  const handleDownloadAll = async () => {
    if (queue.length === 0 || isProcessing) return;
    setIsProcessing(true);
    setProgress(0);

    try {
      const zip = new JSZip();
      const ext = exportFormat === 'image/jpeg' ? 'jpg' : exportFormat === 'image/png' ? 'png' : 'webp';

      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        const blob = await processWatermarkExport(item);
        zip.file(`watermarked_${i + 1}_${item.file.name.split('.')[0]}.${ext}`, blob);
        setProgress(((i + 1) / queue.length) * 100);
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nexus_watermarked_batch.zip';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Batch error:', error);
      alert('An error occurred during batch processing.');
    }

    setIsProcessing(false);
  };

  const updateSetting = (key: keyof WatermarkSettings, value: any) => {
    if (key === 'positionSnap' && value !== 'custom') {
      // Auto-set X/Y visually (though the engine will override) just so sliders match roughly
      let px = 50, py = 50;
      if (value.includes('left')) px = 5;
      if (value.includes('right')) px = 95;
      if (value.includes('top')) py = 5;
      if (value.includes('bottom')) py = 95;
      setSettings(prev => ({ ...prev, [key]: value, posX: px, posY: py }));
    } else {
      setSettings(prev => ({ ...prev, [key]: value, ...(key === 'posX' || key === 'posY' ? { positionSnap: 'custom' } : {}) }));
    }
  };

  const renderPositionGrid = () => {
    const positions: PositionSnap[] = [
      'top-left', 'top-center', 'top-right',
      'center-left', 'center', 'center-right',
      'bottom-left', 'bottom-center', 'bottom-right'
    ];

    return (
      <div className="grid grid-cols-3 gap-1 mb-4 w-[120px] mx-auto">
        {positions.map(pos => (
          <button
            key={pos}
            onClick={() => updateSetting('positionSnap', pos)}
            className={`w-8 h-8 rounded border ${settings.positionSnap === pos && !settings.isTiled ? 'bg-[#518231] border-[#518231] text-white' : 'bg-white border-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700'}`}
            disabled={settings.isTiled}
            title={pos.replace('-', ' ')}
          >
            {settings.positionSnap === pos && !settings.isTiled && <div className="w-2 h-2 bg-white rounded-full mx-auto" />}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="text-[#518231]" />
            Watermark Studio
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Secure your images with custom text or logo overlays. 100% private client-side processing.
          </p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar: Controls */}
        <div className="w-full lg:w-[320px] shrink-0 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-5">
            
            {/* Tabs */}
            <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mb-6">
              <button 
                onClick={() => updateSetting('type', 'text')}
                className={`flex-1 py-1.5 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all ${settings.type === 'text' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <Type size={14} /> Text
              </button>
              <button 
                onClick={() => updateSetting('type', 'logo')}
                className={`flex-1 py-1.5 text-sm font-semibold rounded-md flex items-center justify-center gap-2 transition-all ${settings.type === 'logo' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                <ImageIcon size={14} /> Logo
              </button>
            </div>

            {/* Content Based on Tab */}
            {settings.type === 'text' ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Watermark Text</label>
                  <input 
                    type="text" 
                    value={settings.text}
                    onChange={(e) => updateSetting('text', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#518231] focus:border-transparent dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Font</label>
                    <select 
                      value={settings.fontFamily}
                      onChange={(e) => updateSetting('fontFamily', e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#518231] dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                    >
                      <option value="Arial, sans-serif">Arial</option>
                      <option value="'Times New Roman', serif">Times New Roman</option>
                      <option value="'Courier New', monospace">Courier</option>
                      <option value="Impact, sans-serif">Impact</option>
                      <option value="'Comic Sans MS', cursive">Comic Sans</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Color</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="color" 
                        value={settings.fontColor}
                        onChange={(e) => updateSetting('fontColor', e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                      />
                      <span className="text-xs text-slate-500 uppercase">{settings.fontColor}</span>
                    </div>
                  </div>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.hasShadow}
                    onChange={(e) => updateSetting('hasShadow', e.target.checked)}
                    className="rounded border-slate-300 text-[#518231] focus:ring-[#518231]"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">Add Text Shadow</span>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Upload Logo (PNG/SVG)</label>
                <div 
                  onClick={() => logoInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg p-4 text-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <input 
                    type="file" 
                    accept="image/png, image/jpeg, image/svg+xml, image/webp"
                    className="hidden" 
                    ref={logoInputRef}
                    onChange={handleLogoUpload}
                  />
                  {settings.logoUrl ? (
                    <img src={settings.logoUrl} alt="Logo preview" className="h-12 object-contain mx-auto" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Plus className="text-slate-400 mb-1" size={20} />
                      <span className="text-xs text-slate-500">Click to upload brand logo</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <hr className="my-6 border-slate-100 dark:border-slate-800" />

            {/* Global Settings */}
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Size / Scale</label>
                  <span className="text-xs text-slate-500">{settings.scale}%</span>
                </div>
                <input 
                  type="range" min="1" max="100" value={settings.scale}
                  onChange={(e) => updateSetting('scale', Number(e.target.value))}
                  className="w-full accent-[#518231]"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Opacity</label>
                  <span className="text-xs text-slate-500">{settings.opacity}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={settings.opacity}
                  onChange={(e) => updateSetting('opacity', Number(e.target.value))}
                  className="w-full accent-[#518231]"
                />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Rotation</label>
                  <span className="text-xs text-slate-500">{settings.rotation}°</span>
                </div>
                <input 
                  type="range" min="-180" max="180" value={settings.rotation}
                  onChange={(e) => updateSetting('rotation', Number(e.target.value))}
                  className="w-full accent-[#518231]"
                />
              </div>
            </div>

            <hr className="my-6 border-slate-100 dark:border-slate-800" />

            {/* Positioning & Tiling */}
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Position & Tiling</label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Tiled</span>
                  <div className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors ${settings.isTiled ? 'bg-[#518231]' : 'bg-slate-300 dark:bg-slate-600'}`}>
                    <input type="checkbox" className="sr-only" checked={settings.isTiled} onChange={(e) => updateSetting('isTiled', e.target.checked)} />
                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${settings.isTiled ? 'translate-x-4' : 'translate-x-1'}`} />
                  </div>
                </label>
              </div>

              {settings.isTiled ? (
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-500">Density</span>
                  </div>
                  <input 
                    type="range" min="1" max="10" step="1" value={settings.tiledDensity}
                    onChange={(e) => updateSetting('tiledDensity', Number(e.target.value))}
                    className="w-full accent-[#518231]"
                  />
                </div>
              ) : (
                <>
                  {renderPositionGrid()}
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <span className="text-xs text-slate-400 w-4">X</span>
                      <input 
                        type="range" min="0" max="100" value={settings.posX}
                        onChange={(e) => updateSetting('posX', Number(e.target.value))}
                        className="w-full accent-[#518231]"
                      />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-xs text-slate-400 w-4">Y</span>
                      <input 
                        type="range" min="0" max="100" value={settings.posY}
                        onChange={(e) => updateSetting('posY', Number(e.target.value))}
                        className="w-full accent-[#518231]"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>

          {/* Export Settings */}
          {queue.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Export Settings</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Format</label>
                  <select 
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-[#518231] dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                  >
                    <option value="image/jpeg">JPG</option>
                    <option value="image/png">PNG</option>
                    <option value="image/webp">WEBP</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">Quality ({Math.round(exportQuality*100)}%)</label>
                  <input 
                    type="range" min="0.1" max="1" step="0.1" value={exportQuality}
                    onChange={(e) => setExportQuality(Number(e.target.value))}
                    disabled={exportFormat === 'image/png'}
                    className="w-full accent-[#518231] mt-2"
                  />
                </div>
              </div>

              {queue.length > 1 ? (
                <button
                  onClick={handleDownloadAll}
                  disabled={isProcessing}
                  className="w-full py-3 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl font-bold flex justify-center items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isProcessing ? (
                    <RefreshCw className="animate-spin" size={18} />
                  ) : (
                    <Download size={18} />
                  )}
                  {isProcessing ? `Processing ${Math.round(progress)}%` : `Download All (ZIP)`}
                </button>
              ) : (
                <button
                  onClick={() => handleDownloadSingle(activeIndex)}
                  disabled={isProcessing}
                  className="w-full py-3 bg-[#518231] hover:bg-[#436a28] text-white rounded-xl font-bold flex justify-center items-center gap-2 transition-all disabled:opacity-50"
                >
                  {isProcessing ? <RefreshCw className="animate-spin" size={18} /> : <Download size={18} />}
                  Download Image
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right Area: Preview & Queue */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          
          {/* Main Preview Area */}
          <div className="bg-slate-100 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-4 relative overflow-hidden min-h-[400px] lg:min-h-[500px]">
            {queue.length === 0 ? (
              <div 
                className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-10 text-center hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => document.getElementById('watermark-upload')?.click()}
              >
                <div className="w-16 h-16 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center shadow-sm mb-4">
                  <Upload size={28} className="text-[#518231]" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload Images</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm max-w-sm">
                  Drag and drop your images here, or click to browse. Support for batch processing (JPG, PNG, WEBP).
                </p>
                <input 
                  id="watermark-upload"
                  type="file" multiple accept="image/jpeg, image/png, image/webp"
                  className="hidden" onChange={handleFileUpload}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center relative bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZmZmZiI+PC9yZWN0Pgo8cmVjdCB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU3ZWIiPjwvcmVjdD4KPHJlY3QgeD0iMTAiIHk9IjEwIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU3ZWIiPjwvcmVjdD4KPC9zdmc+')]">
                <canvas 
                  ref={previewCanvasRef} 
                  className="max-w-full max-h-[600px] object-contain shadow-lg rounded"
                />
                <button
                  onClick={() => document.getElementById('watermark-add-more')?.click()}
                  className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 hover:bg-white text-slate-700 dark:text-white px-4 py-2 rounded-lg font-medium text-sm shadow flex items-center gap-2 backdrop-blur-sm transition-all"
                >
                  <Plus size={16} /> Add More
                  <input 
                    id="watermark-add-more"
                    type="file" multiple accept="image/jpeg, image/png, image/webp"
                    className="hidden" onChange={handleFileUpload}
                  />
                </button>
              </div>
            )}
          </div>

          {/* Batch Queue Thumbnails */}
          {queue.length > 0 && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Batch Queue ({queue.length})</h3>
                <button onClick={() => setQueue([])} className="text-xs text-red-500 hover:text-red-600 font-medium">Clear All</button>
              </div>
              <div className="flex gap-3 overflow-x-auto custom-scrollbar pb-2 pt-1">
                {queue.map((item, idx) => (
                  <div 
                    key={item.id} 
                    onClick={() => setActiveIndex(idx)}
                    className={`relative w-24 h-24 shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${idx === activeIndex ? 'border-[#518231] shadow-md scale-105' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={item.previewUrl} alt="" className="w-full h-full object-cover" />
                    <button 
                      onClick={(e) => removeFile(item.id, e)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
      
      {/* Hidden canvas for full resolution processing */}
      <canvas ref={hiddenCanvasRef} className="hidden" />
    </div>
  );
}
