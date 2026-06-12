"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Upload, Image as ImageIcon, Copy, ZoomIn, ZoomOut, Maximize, Palette, Droplet, Check, RefreshCw, Download, FileJson, FileCode, CheckCircle2 } from "lucide-react";
import chroma from "chroma-js";
import { Vibrant } from 'node-vibrant/browser';

interface ColorFormats {
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
  cmyk: string;
}

interface PaletteColors {
  Vibrant: string | null;
  Muted: string | null;
  DarkVibrant: string | null;
  DarkMuted: string | null;
  LightVibrant: string | null;
  LightMuted: string | null;
  [key: string]: string | null;
}

interface HistoryColor {
  hex: string;
  timestamp: number;
}

export const ColorPickerFromImageTool = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [pickedColor, setPickedColor] = useState<string | null>(null);
  
  const [zoomLevel, setZoomLevel] = useState<number>(10);
  const [cursorPos, setCursorPos] = useState<{ x: number, y: number } | null>(null);
  
  const [palette, setPalette] = useState<PaletteColors | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [colorHistory, setColorHistory] = useState<HistoryColor[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const magnifierCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const history = localStorage.getItem("colorPickerHistory");
      if (history) {
        setColorHistory(JSON.parse(history));
      }
    } catch (e) {
      console.error("Could not load history", e);
    }
  }, []);

  const saveToHistory = (hex: string) => {
    setColorHistory(prev => {
      const newHistory = [{ hex, timestamp: Date.now() }, ...prev.filter(c => c.hex !== hex)].slice(0, 20);
      try {
        localStorage.setItem("colorPickerHistory", JSON.stringify(newHistory));
      } catch (e) {}
      return newHistory;
    });
  };

  const clearHistory = () => {
    setColorHistory([]);
    localStorage.removeItem("colorPickerHistory");
  };

  const handleFiles = (files: FileList | File[]) => {
    const file = files[0];
    if (!file || !file.type.startsWith("image/")) return;
    
    setIsLoading(true);
    const url = URL.createObjectURL(file);
    
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      setImageSrc(url);
      setPickedColor(null);
      setHoverColor(null);
      extractPalette(img);
      setIsLoading(false);
    };
    img.src = url;
  };

  const extractPalette = async (img: HTMLImageElement) => {
    try {
      const builder = await Vibrant.from(img.src).getPalette();
      const p: PaletteColors = {
        Vibrant: builder.Vibrant?.hex || null,
        Muted: builder.Muted?.hex || null,
        DarkVibrant: builder.DarkVibrant?.hex || null,
        DarkMuted: builder.DarkMuted?.hex || null,
        LightVibrant: builder.LightVibrant?.hex || null,
        LightMuted: builder.LightMuted?.hex || null,
      };
      setPalette(p);
    } catch (error) {
      console.error("Error extracting palette", error);
    }
  };

  useEffect(() => {
    if (imageSrc && canvasRef.current && imageRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const img = imageRef.current;
      
      // Calculate responsive dimensions while maintaining aspect ratio
      const container = containerRef.current;
      let targetWidth = img.width;
      let targetHeight = img.height;
      
      if (container) {
        const maxWidth = container.clientWidth;
        if (img.width > maxWidth) {
          const ratio = maxWidth / img.width;
          targetWidth = maxWidth;
          targetHeight = img.height * ratio;
        }
      }

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    }
  }, [imageSrc]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setCursorPos({ x, y });

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Get pixel color
    const pixel = ctx.getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
    const hex = chroma([pixel[0], pixel[1], pixel[2]]).hex();
    setHoverColor(hex);

    // Draw magnifier
    updateMagnifier(x, y, canvas, ctx);
  };

  const updateMagnifier = (x: number, y: number, sourceCanvas: HTMLCanvasElement, sourceCtx: CanvasRenderingContext2D) => {
    const magCanvas = magnifierCanvasRef.current;
    if (!magCanvas) return;
    const mCtx = magCanvas.getContext("2d");
    if (!mCtx) return;

    const size = 150; // Magnifier size
    magCanvas.width = size;
    magCanvas.height = size;

    // Clear
    mCtx.clearRect(0, 0, size, size);

    // Create circular clipping path
    mCtx.beginPath();
    mCtx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    mCtx.clip();

    // Calculate source area to copy
    const sourceSize = size / zoomLevel;
    const sx = x - sourceSize / 2;
    const sy = y - sourceSize / 2;

    // Draw zoomed image
    // Turn off image smoothing for pixelated look
    mCtx.imageSmoothingEnabled = false;
    mCtx.drawImage(
      sourceCanvas,
      sx, sy, sourceSize, sourceSize,
      0, 0, size, size
    );

    // Draw crosshair
    mCtx.strokeStyle = "rgba(255, 255, 255, 0.8)";
    mCtx.lineWidth = 1;
    mCtx.beginPath();
    mCtx.moveTo(size / 2, 0);
    mCtx.lineTo(size / 2, size);
    mCtx.moveTo(0, size / 2);
    mCtx.lineTo(size, size / 2);
    mCtx.stroke();
    
    // Draw center pixel border
    mCtx.strokeStyle = "black";
    mCtx.strokeRect(size / 2 - zoomLevel / 2, size / 2 - zoomLevel / 2, zoomLevel, zoomLevel);
  };

  const handleCanvasMouseLeave = () => {
    setHoverColor(null);
    setCursorPos(null);
  };

  const handleCanvasClick = () => {
    if (hoverColor) {
      setPickedColor(hoverColor);
      saveToHistory(hoverColor);
    }
  };

  const getColorFormats = (hexCode: string): ColorFormats => {
    const color = chroma(hexCode);
    const [h, s, l] = color.hsl();
    const [c, m, y, k] = color.cmyk();
    const hsv = color.hsv();
    
    return {
      hex: color.hex().toUpperCase(),
      rgb: `rgb(${color.rgb().join(', ')})`,
      hsl: `hsl(${isNaN(h) ? 0 : Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`,
      hsv: `hsv(${isNaN(hsv[0]) ? 0 : Math.round(hsv[0])}, ${Math.round(hsv[1] * 100)}%, ${Math.round(hsv[2] * 100)}%)`,
      cmyk: `cmyk(${Math.round(c * 100)}%, ${Math.round(m * 100)}%, ${Math.round(y * 100)}%, ${Math.round(k * 100)}%)`
    };
  };

  const copyToClipboard = (text: string, formatId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatId);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const getHarmonies = (hex: string) => {
    const base = chroma(hex);
    return {
      complementary: base.set('hsl.h', '+180').hex(),
      analogous: [base.set('hsl.h', '-30').hex(), base.hex(), base.set('hsl.h', '+30').hex()],
      triadic: [base.hex(), base.set('hsl.h', '+120').hex(), base.set('hsl.h', '+240').hex()],
      monochromatic: [
        base.set('hsl.l', 0.2).hex(),
        base.set('hsl.l', 0.4).hex(),
        base.set('hsl.l', 0.6).hex(),
        base.set('hsl.l', 0.8).hex()
      ]
    };
  };

  const activeColor = pickedColor || hoverColor;
  const formats = activeColor ? getColorFormats(activeColor) : null;
  const harmonies = pickedColor ? getHarmonies(pickedColor) : null;

  // Accessibility Check
  const getWCAG = (hex: string) => {
    const contrastWhite = chroma.contrast(hex, 'white');
    const contrastBlack = chroma.contrast(hex, 'black');
    return { contrastWhite, contrastBlack };
  };
  const wcag = activeColor ? getWCAG(activeColor) : null;

  const exportTailwind = () => {
    if (!palette) return;
    const config = {
      theme: {
        extend: {
          colors: {
            custom: {
              vibrant: palette.Vibrant,
              muted: palette.Muted,
              dark: palette.DarkVibrant,
              light: palette.LightVibrant
            }
          }
        }
      }
    };
    copyToClipboard(JSON.stringify(config, null, 2), "tailwind");
  };

  const exportCSSVars = () => {
    if (!palette) return;
    const css = `:root {
  --color-vibrant: ${palette.Vibrant};
  --color-muted: ${palette.Muted};
  --color-dark-vibrant: ${palette.DarkVibrant};
  --color-dark-muted: ${palette.DarkMuted};
  --color-light-vibrant: ${palette.LightVibrant};
  --color-light-muted: ${palette.LightMuted};
}`;
    copyToClipboard(css, "css");
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      {!imageSrc && (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 transition-all text-center ${
            isDragging
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
              : "border-slate-300 dark:border-slate-700 hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer.files?.length) handleFiles(e.dataTransfer.files);
          }}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files?.length) handleFiles(e.target.files);
            }}
          />
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Upload size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Upload Image to Pick Colors
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Drag and drop any photo here, or click to browse. Fully secure, processed entirely in your browser.
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            >
              Browse Files
            </button>
            <p className="text-xs text-slate-400 mt-2">Supports JPG, PNG, WEBP, GIF, SVG</p>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      {imageSrc && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Image Area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setImageSrc(null)}
                  className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center gap-1"
                >
                  <RefreshCw size={14} /> Upload New Image
                </button>
              </div>
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                <button onClick={() => setZoomLevel(5)} className={`px-3 py-1 text-xs font-medium rounded ${zoomLevel === 5 ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}>5x</button>
                <button onClick={() => setZoomLevel(10)} className={`px-3 py-1 text-xs font-medium rounded ${zoomLevel === 10 ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}>10x</button>
                <button onClick={() => setZoomLevel(20)} className={`px-3 py-1 text-xs font-medium rounded ${zoomLevel === 20 ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}>20x</button>
                <button onClick={() => setZoomLevel(40)} className={`px-3 py-1 text-xs font-medium rounded ${zoomLevel === 40 ? 'bg-white dark:bg-slate-700 shadow-sm' : 'text-slate-500'}`}>40x</button>
              </div>
            </div>

            <div 
              ref={containerRef}
              className="relative bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden cursor-crosshair group flex justify-center items-center min-h-[300px]"
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm z-10">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
                </div>
              )}
              
              <img ref={imageRef} src={imageSrc} alt="Hidden source" className="hidden" />
              
              <canvas
                ref={canvasRef}
                onMouseMove={handleCanvasMouseMove}
                onTouchMove={handleCanvasMouseMove}
                onMouseLeave={handleCanvasMouseLeave}
                onClick={handleCanvasClick}
                className="max-w-full h-auto shadow-sm"
              />

              {/* Magnifier Lens */}
              {cursorPos && hoverColor && (
                <div 
                  className="absolute pointer-events-none w-[150px] h-[150px] rounded-full border-4 border-white shadow-[0_8px_30px_rgb(0,0,0,0.3)] bg-white overflow-hidden flex items-center justify-center z-20"
                  style={{
                    left: Math.min(Math.max(cursorPos.x - 75, 0), (containerRef.current?.clientWidth || 0) - 150),
                    top: Math.min(Math.max(cursorPos.y - 75, 0), (containerRef.current?.clientHeight || 0) - 150),
                    transform: 'translate(-50%, -50%)',
                    marginTop: '-90px' // Offset to not hide under cursor
                  }}
                >
                  <canvas ref={magnifierCanvasRef} className="rounded-full" />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-full font-mono whitespace-nowrap">
                    {hoverColor.toUpperCase()}
                  </div>
                </div>
              )}
            </div>

            {/* Dominant Palette Section */}
            {palette && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Palette className="text-blue-500" size={20} />
                    Dominant Colors
                  </h3>
                  <div className="flex items-center gap-2">
                    <button onClick={exportTailwind} className="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1">
                      {copiedFormat === 'tailwind' ? <Check size={14} className="text-green-500"/> : <FileCode size={14}/>} Tailwind
                    </button>
                    <button onClick={exportCSSVars} className="text-xs bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1">
                      {copiedFormat === 'css' ? <Check size={14} className="text-green-500"/> : <FileCode size={14}/>} CSS
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  {Object.entries(palette).map(([name, hex]) => {
                    if (!hex) return null;
                    return (
                      <div key={name} className="flex flex-col gap-2 group">
                        <button
                          onClick={() => {
                            setPickedColor(hex);
                            saveToHistory(hex);
                          }}
                          className="h-16 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 w-full hover:scale-105 transition-transform relative overflow-hidden"
                          style={{ backgroundColor: hex }}
                        >
                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                              <Droplet size={20} className="text-white opacity-0 group-hover:opacity-100 drop-shadow-md" />
                           </div>
                        </button>
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{name.replace(/([A-Z])/g, ' $1').trim()}</div>
                          <div className="text-xs font-mono font-medium">{hex.toUpperCase()}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Inspector Area */}
          <div className="space-y-6">
            
            {/* Color Preview & Formats */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Droplet className="text-blue-500" size={20} />
                Selected Color
              </h3>
              
              <div 
                className="w-full h-32 rounded-xl shadow-inner border border-slate-200 dark:border-slate-800 mb-6 flex items-end justify-end p-3 transition-colors duration-200"
                style={{ backgroundColor: activeColor || '#f1f5f9' }}
              >
                {!activeColor && <span className="text-slate-400 text-sm mx-auto self-center">Pick a color from the image</span>}
              </div>

              {formats ? (
                <div className="space-y-3">
                  {Object.entries(formats).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                      <div className="text-xs font-bold uppercase w-12 text-slate-500">{key}</div>
                      <div className="font-mono text-sm font-medium flex-1 text-right truncate mr-3">{val}</div>
                      <button
                        onClick={() => copyToClipboard(val, key)}
                        className="text-slate-400 hover:text-blue-500 p-1 rounded-md"
                        title="Copy"
                      >
                        {copiedFormat === key ? <CheckCircle2 size={16} className="text-emerald-500"/> : <Copy size={16} />}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-[250px] flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  <p className="text-sm text-slate-400">Waiting for selection...</p>
                </div>
              )}
            </div>

            {/* Accessibility Checker */}
            {wcag && activeColor && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                 <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-slate-500">WCAG Contrast</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                       <span className="text-2xl font-black" style={{ color: activeColor }}>Aa</span>
                       <span className="text-xs text-slate-500 mt-2">On White</span>
                       <div className="flex gap-1 mt-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${wcag.contrastWhite >= 4.5 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>AA</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${wcag.contrastWhite >= 7 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>AAA</span>
                       </div>
                    </div>
                    <div className="bg-black border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                       <span className="text-2xl font-black" style={{ color: activeColor }}>Aa</span>
                       <span className="text-xs text-slate-400 mt-2">On Black</span>
                       <div className="flex gap-1 mt-1">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${wcag.contrastBlack >= 4.5 ? 'bg-emerald-900 text-emerald-300' : 'bg-red-900 text-red-300'}`}>AA</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${wcag.contrastBlack >= 7 ? 'bg-emerald-900 text-emerald-300' : 'bg-red-900 text-red-300'}`}>AAA</span>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {/* Harmonies */}
            {harmonies && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-slate-500">Color Harmonies</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Complementary</div>
                    <div className="flex h-8 rounded-lg overflow-hidden">
                      <div className="flex-1" style={{ backgroundColor: pickedColor! }}></div>
                      <div className="flex-1" style={{ backgroundColor: harmonies.complementary }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Analogous</div>
                    <div className="flex h-8 rounded-lg overflow-hidden">
                      {harmonies.analogous.map((c, i) => <div key={i} className="flex-1" style={{ backgroundColor: c }}></div>)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Triadic</div>
                    <div className="flex h-8 rounded-lg overflow-hidden">
                      {harmonies.triadic.map((c, i) => <div key={i} className="flex-1" style={{ backgroundColor: c }}></div>)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Color History */}
            {colorHistory.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Recent Picks</h3>
                  <button onClick={clearHistory} className="text-xs text-red-500 hover:underline">Clear</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {colorHistory.map((item, idx) => (
                    <button
                      key={`${item.hex}-${item.timestamp}-${idx}`}
                      onClick={() => setPickedColor(item.hex)}
                      className="w-8 h-8 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform"
                      style={{ backgroundColor: item.hex }}
                      title={item.hex.toUpperCase()}
                    />
                  ))}
                </div>
              </div>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
};
