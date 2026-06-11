'use client';

import React, { useState, useCallback, useRef } from 'react';
import Cropper from 'react-easy-crop';
import { Upload, Image as ImageIcon, Download, Settings, ZoomIn, ZoomOut, RotateCcw, RotateCw, FlipHorizontal, FlipVertical, Crop as CropIcon, Smartphone, Youtube, Instagram, Facebook, Twitter, Linkedin, Check } from 'lucide-react';
import { Area } from 'react-easy-crop';

// Aspect Ratios & Presets
const PRESETS = [
  { id: 'freeform', name: 'Freeform', ratio: undefined, icon: <CropIcon size={16} /> },
  { id: '1:1', name: 'Square (1:1)', ratio: 1, icon: <CropIcon size={16} /> },
  { id: '16:9', name: 'Standard (16:9)', ratio: 16 / 9, icon: <CropIcon size={16} /> },
  { id: '4:3', name: 'Classic (4:3)', ratio: 4 / 3, icon: <CropIcon size={16} /> },
  { id: '21:9', name: 'Ultrawide (21:9)', ratio: 21 / 9, icon: <CropIcon size={16} /> },
  { id: '3:2', name: 'Photo (3:2)', ratio: 3 / 2, icon: <CropIcon size={16} /> },
];

const SOCIAL_PRESETS = [
  { id: 'ig-post', name: 'IG Post (1:1)', ratio: 1, icon: <Instagram size={16} /> },
  { id: 'ig-story', name: 'IG Story (9:16)', ratio: 9 / 16, icon: <Smartphone size={16} /> },
  { id: 'fb-cover', name: 'FB Cover (16:9)', ratio: 16 / 9, icon: <Facebook size={16} /> },
  { id: 'yt-thumb', name: 'YouTube Thumb', ratio: 16 / 9, icon: <Youtube size={16} /> },
  { id: 'tw-header', name: 'X Header (3:1)', ratio: 3 / 1, icon: <Twitter size={16} /> },
  { id: 'li-banner', name: 'LinkedIn Banner', ratio: 4 / 1, icon: <Linkedin size={16} /> },
];

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = url;
  });

function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

export function CropImageTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('image.png');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [flip, setFlip] = useState({ horizontal: false, vertical: false });
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [exportFormat, setExportFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [exportQuality, setExportQuality] = useState<number>(0.92);
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      const reader = new FileReader();
      reader.addEventListener('load', () => setImageSrc(reader.result?.toString() || null));
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        setFileName(file.name);
        const reader = new FileReader();
        reader.addEventListener('load', () => setImageSrc(reader.result?.toString() || null));
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            setFileName('pasted-image.png');
            const reader = new FileReader();
            reader.addEventListener('load', () => setImageSrc(reader.result?.toString() || null));
            reader.readAsDataURL(file);
          }
        }
      }
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  const handleExport = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setIsProcessing(true);

    try {
      const image = await createImage(imageSrc);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No 2d context');
      }

      const maxSize = Math.max(image.width, image.height);
      const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));
      
      canvas.width = safeArea;
      canvas.height = safeArea;

      ctx.translate(safeArea / 2, safeArea / 2);
      ctx.rotate(getRadianAngle(rotation));
      ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
      ctx.translate(-safeArea / 2, -safeArea / 2);

      ctx.drawImage(
        image,
        safeArea / 2 - image.width * 0.5,
        safeArea / 2 - image.height * 0.5
      );

      const data = ctx.getImageData(0, 0, safeArea, safeArea);
      
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;

      ctx.putImageData(
        data,
        Math.round(0 - safeArea / 2 + image.width * 0.5 - croppedAreaPixels.x),
        Math.round(0 - safeArea / 2 + image.height * 0.5 - croppedAreaPixels.y)
      );

      const croppedImageUrl = canvas.toDataURL(exportFormat, exportQuality);

      const link = document.createElement('a');
      link.download = `cropped-${fileName.split('.')[0]}.${exportFormat.split('/')[1]}`;
      link.href = croppedImageUrl;
      link.click();
    } catch (e) {
      console.error(e);
      alert('An error occurred while cropping the image.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!imageSrc) {
    return (
      <div 
        className="w-full h-[600px] border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 mb-4">
          <Upload className="w-8 h-8 text-[#518231]" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload Image to Crop</h3>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mb-6">
          Drag and drop an image here, paste from clipboard, or click to browse files.
        </p>
        <button className="px-6 py-2.5 bg-[#518231] hover:bg-[#426b27] text-white font-medium rounded-xl shadow-sm transition-colors flex items-center gap-2">
          <ImageIcon size={18} /> Choose File
        </button>
        <div className="mt-8 text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
          <Check size={14} className="text-[#518231]" /> 100% Secure. Processing happens locally in your browser.
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[800px]">
      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 h-full order-2 lg:order-1">
        
        {/* Presets Panel */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
            <CropIcon size={16} className="text-[#518231]" /> Aspect Ratios
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setAspect(p.ratio)}
                className={`flex items-center justify-center gap-2 p-2 rounded-lg text-sm transition-all border ${
                  aspect === p.ratio
                    ? 'bg-[#518231]/10 text-[#518231] border-[#518231]/30 font-medium'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {p.icon}
                {p.name}
              </button>
            ))}
          </div>

          <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-6 mb-3 flex items-center gap-2 uppercase tracking-wider">
            <Smartphone size={16} className="text-[#518231]" /> Social Presets
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {SOCIAL_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => setAspect(p.ratio)}
                className={`flex items-center justify-center gap-2 p-2 rounded-lg text-sm transition-all border ${
                  aspect === p.ratio
                    ? 'bg-[#518231]/10 text-[#518231] border-[#518231]/30 font-medium'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                {p.icon}
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Rotate & Flip */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
            <RotateCcw size={16} className="text-[#518231]" /> Transform
          </h3>
          
          <div className="mb-4">
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
              <span>Rotation</span>
              <span>{rotation}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="360"
              step="1"
              value={rotation}
              onChange={(e) => setRotation(Number(e.target.value))}
              className="w-full accent-[#518231]"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setRotation((prev) => (prev - 90 + 360) % 360)}
              className="flex items-center justify-center p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Rotate Left 90°"
            >
              <RotateCcw size={18} />
            </button>
            <button
              onClick={() => setRotation((prev) => (prev + 90) % 360)}
              className="flex items-center justify-center p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Rotate Right 90°"
            >
              <RotateCw size={18} />
            </button>
            <button
              onClick={() => setFlip({ ...flip, horizontal: !flip.horizontal })}
              className={`flex items-center justify-center p-2 rounded-lg border transition-colors ${flip.horizontal ? 'bg-[#518231]/10 border-[#518231]/30 text-[#518231]' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              title="Flip Horizontal"
            >
              <FlipHorizontal size={18} />
            </button>
            <button
              onClick={() => setFlip({ ...flip, vertical: !flip.vertical })}
              className={`flex items-center justify-center p-2 rounded-lg border transition-colors ${flip.vertical ? 'bg-[#518231]/10 border-[#518231]/30 text-[#518231]' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              title="Flip Vertical"
            >
              <FlipVertical size={18} />
            </button>
          </div>
        </div>

        {/* Export Settings */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
            <Settings size={16} className="text-[#518231]" /> Export Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">Format</label>
              <div className="flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                {[
                  { value: 'image/jpeg', label: 'JPG' },
                  { value: 'image/png', label: 'PNG' },
                  { value: 'image/webp', label: 'WEBP' }
                ].map((fmt) => (
                  <button
                    key={fmt.value}
                    onClick={() => setExportFormat(fmt.value as any)}
                    className={`flex-1 text-xs py-1.5 rounded-md font-medium transition-all ${
                      exportFormat === fmt.value 
                        ? 'bg-[#518231] text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {fmt.label}
                  </button>
                ))}
              </div>
            </div>

            {exportFormat !== 'image/png' && (
              <div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span>Quality</span>
                  <span>{Math.round(exportQuality * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={exportQuality}
                  onChange={(e) => setExportQuality(Number(e.target.value))}
                  className="w-full accent-[#518231]"
                />
              </div>
            )}

            <button
              onClick={handleExport}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#518231] hover:bg-[#426b27] disabled:bg-[#518231]/50 text-white font-bold rounded-xl shadow-md shadow-[#518231]/20 transition-all active:scale-[0.98]"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Download size={18} />
                  Export Image
                </>
              )}
            </button>
            <button
              onClick={() => {
                setImageSrc(null);
                setRotation(0);
                setZoom(1);
                setFlip({ horizontal: false, vertical: false });
                setAspect(undefined);
              }}
              className="w-full text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors text-center"
            >
              Start Over with New Image
            </button>
          </div>
        </div>

      </div>

      {/* Main Cropper Area */}
      <div className="flex-1 bg-black/5 dark:bg-black/40 rounded-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800 min-h-[500px] order-1 lg:order-2 flex flex-col shadow-inner">
        
        {/* Editor Top Bar */}
        <div className="h-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{fileName}</span>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
            {croppedAreaPixels && (
              <span className="text-xs text-[#518231] font-mono bg-[#518231]/10 px-2 py-1 rounded-md border border-[#518231]/20">
                {Math.round(croppedAreaPixels.width)} × {Math.round(croppedAreaPixels.height)}px
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setZoom(z => Math.max(1, z - 0.2))} className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors">
              <ZoomOut size={16} />
            </button>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => {
                setZoom(Number(e.target.value))
              }}
              className="w-24 accent-[#518231]"
            />
            <button onClick={() => setZoom(z => Math.min(3, z + 0.2))} className="p-1.5 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-md transition-colors">
              <ZoomIn size={16} />
            </button>
          </div>
        </div>

        {/* Cropper Container */}
        <div className="flex-1 relative bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZmZmZiIgLz4KPHBhdGggZD0iTTAgMjBMNCAyMEwwIDE2IiBmaWxsPSIjZTZlNmU2IiAvPgo8cGF0aCBkPSJNMCA4TDggMjBMMTIgMjBMMCA4IiBmaWxsPSIjZTZlNmU2IiAvPgo8cGF0aCBkPSJNMCAwTDE2IDIwTDIwIDIwTDAgMCIgZmlsbD0iI2U2ZTZlNiIgLz4KPHBhdGggZD0iTTQgMEwyMCAxNkwyMCAxMkw4IDAiIGZpbGw9IiNlNmU2ZTYiIC8+CjxwYXRoIGQ9Ik0xMiAwTDIwIDhMMjAgNEwxNiAwIiBmaWxsPSIjZTZlNmU2IiAvPgo8L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzFhMjAyYyIgLz4KPHBhdGggZD0iTTAgMjBMNCAyMEwwIDE2IiBmaWxsPSIjMjRkMmEzNSIgLz4KPHBhdGggZD0iTTAgOEw4IDIwTDEyIDIwTDAgOCIgZmlsbD0iIzI0ZDJhMzUiIC8+CjxwYXRoIGQ9Ik0wIDBMMTYgMjBMMjAgMjBMMCAwIiBmaWxsPSIjMjRkMmEzNSIgLz4KPHBhdGggZD0iTTQgMEwyMCAxNkwyMCAxMkw4IDAiIGZpbGw9IiMyNGQyYTM1IiAvPgo8cGF0aCBkPSJNMTIgMEwyMCA4TDIwIDRMMTYgMCIgZmlsbD0iIzI0ZDJhMzUiIC8+Cjwvc3ZnPg==')]">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            rotation={rotation}
            transform={[
              `translate(${crop.x}px, ${crop.y}px)`,
              `rotateZ(${rotation}deg)`,
              `rotateY(${flip.horizontal ? 180 : 0}deg)`,
              `rotateX(${flip.vertical ? 180 : 0}deg)`,
              `scale(${zoom})`,
            ].join(' ')}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            showGrid={true}
            style={{
              containerStyle: {
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent'
              },
              cropAreaStyle: {
                border: '2px solid rgba(81, 130, 49, 0.8)',
                boxShadow: '0 0 0 9999em rgba(0, 0, 0, 0.6)'
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
