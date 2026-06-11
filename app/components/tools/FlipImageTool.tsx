'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, Download, Settings, FlipHorizontal, FlipVertical, Check, RefreshCcw, RotateCcw, RotateCw, SplitSquareHorizontal } from 'lucide-react';

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

export function FlipImageTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('image.png');
  const [flip, setFlip] = useState({ horizontal: false, vertical: false });
  const [rotation, setRotation] = useState(0);
  const [showOriginal, setShowOriginal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [exportQuality, setExportQuality] = useState<number>(0.92);
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

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

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  useEffect(() => {
    if (!imageSrc) return;
    let isActive = true;

    const renderPreview = async () => {
      try {
        const image = await createImage(imageSrc);
        if (!isActive) return;

        setOriginalSize({ width: image.width, height: image.height });

        const canvas = previewCanvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Determine canvas size based on 90deg rotations
        const isOrthogonal = Math.abs(rotation) % 180 === 90;
        canvas.width = isOrthogonal ? image.height : image.width;
        canvas.height = isOrthogonal ? image.width : image.height;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.translate(canvas.width / 2, canvas.height / 2);
        
        // Show original mode ignores flip and rotation
        if (!showOriginal) {
          ctx.rotate(getRadianAngle(rotation));
          ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
        }
        
        ctx.translate(-image.width / 2, -image.height / 2);

        ctx.drawImage(image, 0, 0);

      } catch (e) {
        console.error(e);
      }
    };

    renderPreview();

    return () => { isActive = false; };
  }, [imageSrc, flip, rotation, showOriginal]);

  const handleExport = async () => {
    if (!previewCanvasRef.current) return;
    setIsProcessing(true);

    try {
      const finalCanvas = previewCanvasRef.current;
      const flippedImageUrl = finalCanvas.toDataURL(exportFormat, exportQuality);

      const link = document.createElement('a');
      link.download = `flipped-${fileName.split('.')[0]}.${exportFormat.split('/')[1]}`;
      link.href = flippedImageUrl;
      link.click();
    } catch (e) {
      console.error(e);
      alert('An error occurred while exporting the image.');
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
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Upload Image to Flip</h3>
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

  const isOrthogonal = Math.abs(rotation) % 180 === 90;
  const currentDimensions = {
    width: isOrthogonal ? originalSize.height : originalSize.width,
    height: isOrthogonal ? originalSize.width : originalSize.height
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:h-[800px]">
      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 h-full order-2 lg:order-1">
        
        {/* Flip Controls */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 uppercase tracking-wider">
              <SplitSquareHorizontal size={16} className="text-[#518231]" /> Mirroring
            </h3>
            <button 
              onClick={() => { setFlip({ horizontal: false, vertical: false }); setRotation(0); }}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
            >
              <RefreshCcw size={12} /> Reset
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setFlip({ ...flip, horizontal: !flip.horizontal })}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${flip.horizontal ? 'bg-[#518231]/10 border-[#518231] text-[#518231] shadow-sm' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#518231]/50'}`}
            >
              <FlipHorizontal size={28} className="mb-2" />
              <span className="text-xs font-bold">Horizontal</span>
              <span className="text-[10px] opacity-70">Left ↔ Right</span>
            </button>
            <button
              onClick={() => setFlip({ ...flip, vertical: !flip.vertical })}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${flip.vertical ? 'bg-[#518231]/10 border-[#518231] text-[#518231] shadow-sm' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#518231]/50'}`}
            >
              <FlipVertical size={28} className="mb-2" />
              <span className="text-xs font-bold">Vertical</span>
              <span className="text-[10px] opacity-70">Top ↕ Bottom</span>
            </button>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Quick Rotate</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setRotation((prev) => prev - 90)}
                className="flex items-center justify-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors text-xs font-medium"
              >
                <RotateCcw size={14} /> Left 90°
              </button>
              <button
                onClick={() => setRotation((prev) => prev + 90)}
                className="flex items-center justify-center gap-2 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors text-xs font-medium"
              >
                <RotateCw size={14} /> Right 90°
              </button>
            </div>
          </div>
        </div>

        {/* Compare Toggle */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
           <button
            onMouseDown={() => setShowOriginal(true)}
            onMouseUp={() => setShowOriginal(false)}
            onMouseLeave={() => setShowOriginal(false)}
            onTouchStart={() => setShowOriginal(true)}
            onTouchEnd={() => setShowOriginal(false)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all active:scale-[0.98]"
          >
            <ImageIcon size={18} />
            Hold to Compare Original
          </button>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            Click and hold to temporarily hide transformations and see your original upload.
          </p>
        </div>

        {/* Export Settings */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700 mt-auto">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
            <Settings size={16} className="text-[#518231]" /> Export
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
                  Download Image
                </>
              )}
            </button>
            <button
              onClick={() => {
                setImageSrc(null);
                setFlip({ horizontal: false, vertical: false });
                setRotation(0);
              }}
              className="w-full text-xs text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors text-center"
            >
              Start Over with New Image
            </button>
          </div>
        </div>

      </div>

      {/* Main Preview Area */}
      <div className="flex-1 bg-black/5 dark:bg-black/40 rounded-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800 min-h-[500px] order-1 lg:order-2 flex flex-col shadow-inner">
        
        {/* Editor Top Bar */}
        <div className="h-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{fileName}</span>
            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700"></div>
            <span className="text-xs text-[#518231] font-mono bg-[#518231]/10 px-2 py-1 rounded-md border border-[#518231]/20">
              {currentDimensions.width} × {currentDimensions.height}px
            </span>
          </div>
          {showOriginal && (
            <span className="text-xs font-bold text-white bg-blue-500 px-3 py-1 rounded-full shadow-sm animate-pulse">
              Viewing Original
            </span>
          )}
        </div>

        {/* Canvas Container */}
        <div className="flex-1 relative bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZmZmZiIgLz4KPHBhdGggZD0iTTAgMjBMNCAyMEwwIDE2IiBmaWxsPSIjZTZlNmU2IiAvPgo8cGF0aCBkPSJNMCA4TDggMjBMMTIgMjBMMCA4IiBmaWxsPSIjZTZlNmU2IiAvPgo8cGF0aCBkPSJNMCAwTDE2IDIwTDIwIDIwTDAgMCIgZmlsbD0iI2U2ZTZlNiIgLz4KPHBhdGggZD0iTTQgMEwyMCAxNkwyMCAxMkw4IDAiIGZpbGw9IiNlNmU2ZTYiIC8+CjxwYXRoIGQ9Ik0xMiAwTDIwIDhMMjAgNEwxNiAwIiBmaWxsPSIjZTZlNmU2IiAvPgo8L3N2Zz4=')] dark:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzFhMjAyYyIgLz4KPHBhdGggZD0iTTAgMjBMNCAyMEwwIDE2IiBmaWxsPSIjMjRkMmEzNSIgLz4KPHBhdGggZD0iTTAgOEw4IDIwTDEyIDIwTDAgOCIgZmlsbD0iIzI0ZDJhMzUiIC8+CjxwYXRoIGQ9Ik0wIDBMMTYgMjBMMjAgMjBMMCAwIiBmaWxsPSIjMjRkMmEzNSIgLz4KPHBhdGggZD0iTTQgMEwyMCAxNkwyMCAxMkw4IDAiIGZpbGw9IiMyNGQyYTM1IiAvPgo8cGF0aCBkPSJNMTIgMEwyMCA4TDIwIDRMMTYgMCIgZmlsbD0iIzI0ZDJhMzUiIC8+Cjwvc3ZnPg==')] overflow-auto custom-scrollbar flex items-center justify-center p-8">
          <canvas 
            ref={previewCanvasRef} 
            className="max-w-full max-h-full object-contain shadow-2xl transition-transform duration-100 ring-1 ring-black/5 dark:ring-white/5"
          />
        </div>
      </div>
    </div>
  );
}
