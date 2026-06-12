"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Upload, Image as ImageIcon, Copy, ZoomIn, ZoomOut, Maximize, Palette, Droplet, Check, RefreshCw, Download, FileJson, FileCode, CheckCircle2, Layout, SlidersHorizontal, Sun, Moon, PieChart } from "lucide-react";
import chroma from "chroma-js";
import { Vibrant } from 'node-vibrant/browser';

interface ExtractedColor {
  hex: string;
  rgb: number[];
  hsl: number[];
  population: number;
  name: string;
}

interface BrandKit {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export default function ColorPaletteGeneratorFromImageTool() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState<ExtractedColor[]>([]);
  const [totalPopulation, setTotalPopulation] = useState(0);
  const [brandKit, setBrandKit] = useState<BrandKit | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  // Drag and drop state
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setIsLoading(true);
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = async () => {
      setImageSrc(url);
      await generatePalette(img);
      setIsLoading(false);
    };
    img.src = url;
  };

  const generatePalette = async (img: HTMLImageElement) => {
    try {
      const v = Vibrant.from(img.src).maxColorCount(64);
      const builder = await v.getPalette();
      
      const extracted: ExtractedColor[] = [];
      let totalPop = 0;
      
      // Node-vibrant standard swatches
      const swatches = [
        { key: 'Vibrant', swatch: builder.Vibrant },
        { key: 'Muted', swatch: builder.Muted },
        { key: 'DarkVibrant', swatch: builder.DarkVibrant },
        { key: 'DarkMuted', swatch: builder.DarkMuted },
        { key: 'LightVibrant', swatch: builder.LightVibrant },
        { key: 'LightMuted', swatch: builder.LightMuted },
      ];

      swatches.forEach(s => {
        if (s.swatch) {
          extracted.push({
            hex: s.swatch.hex,
            rgb: s.swatch.rgb,
            hsl: s.swatch.hsl,
            population: s.swatch.population,
            name: s.key
          });
          totalPop += s.swatch.population;
        }
      });
      
      // Sort by population
      extracted.sort((a, b) => b.population - a.population);
      
      setColors(extracted);
      setTotalPopulation(totalPop);
      
      // Generate Brand Kit intelligently
      if (extracted.length > 0) {
        // Background is usually the most dominant color
        let bg = extracted[0].hex;
        let text = chroma(bg).luminance() > 0.5 ? '#0f172a' : '#f8fafc';
        
        // Find a vibrant accent
        let accent = builder.Vibrant?.hex || builder.LightVibrant?.hex || extracted[0].hex;
        let primary = builder.DarkVibrant?.hex || extracted[1]?.hex || extracted[0].hex;
        let secondary = builder.Muted?.hex || builder.LightMuted?.hex || extracted[2]?.hex || extracted[0].hex;

        setBrandKit({
          background: bg,
          text: text,
          primary: primary,
          secondary: secondary,
          accent: accent
        });
      }

    } catch (e) {
      console.error(e);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Pie Chart Generation
  const generatePieChart = () => {
    if (colors.length === 0 || totalPopulation === 0) return null;
    let cumulativePercent = 0;
    
    function getCoordinatesForPercent(percent: number) {
      const x = Math.cos(2 * Math.PI * percent);
      const y = Math.sin(2 * Math.PI * percent);
      return [x, y];
    }

    return (
      <svg viewBox="-1 -1 2 2" className="w-full h-full transform -rotate-90">
        {colors.map((c, i) => {
          const percent = c.population / totalPopulation;
          const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
          cumulativePercent += percent;
          const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
          
          const largeArcFlag = percent > 0.5 ? 1 : 0;
          
          // Fallback if it's 100%
          if (percent > 0.999) {
            return <circle key={i} cx="0" cy="0" r="1" fill={c.hex} />;
          }

          const pathData = [
            `M ${startX} ${startY}`, 
            `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
            `L 0 0`, 
          ].join(' ');

          return <path key={i} d={pathData} fill={c.hex} />;
        })}
      </svg>
    );
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Upload Zone */}
      {!imageSrc && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full h-96 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl cursor-pointer transition-all duration-300 ${
            isDragging 
              ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' 
              : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileSelect}
          />
          <div className="p-6 bg-white dark:bg-slate-800 rounded-full shadow-lg mb-6 animate-bounce">
            <Upload className="w-10 h-10 text-blue-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            {isDragging ? 'Drop Image Here' : 'Upload Image'}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-center max-w-md">
            Drag & drop an image, or click to browse. Supported formats: JPG, PNG, WEBP.
            <br/><span className="text-xs font-medium text-blue-500 mt-2 block">100% Private Client-Side Processing</span>
          </p>
        </div>
      )}

      {isLoading && (
        <div className="w-full h-96 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-3xl animate-pulse">
          <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
          <p className="text-slate-600 dark:text-slate-300 font-medium">Algorithmic Clustering in Progress...</p>
        </div>
      )}

      {imageSrc && !isLoading && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Image & Distribution */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Image Preview */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-2 shadow-sm overflow-hidden group relative">
              <img src={imageSrc} alt="Source" className="w-full h-auto max-h-[400px] object-contain rounded-2xl" />
              <button 
                onClick={() => { setImageSrc(null); setColors([]); setBrandKit(null); }}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            {/* Distribution Analysis */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-6">
                <PieChart className="w-5 h-5 text-blue-500" /> Color Distribution
              </h3>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 relative drop-shadow-xl">
                  {generatePieChart()}
                </div>
                
                <div className="flex-1 w-full space-y-3">
                  {colors.slice(0, 5).map((c, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full shadow-sm border border-black/10" style={{ backgroundColor: c.hex }} />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{c.name}</span>
                      </div>
                      <span className="text-sm font-mono text-slate-500">
                        {((c.population / totalPopulation) * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spectrum Bar */}
              <div className="w-full h-4 mt-6 rounded-full overflow-hidden flex shadow-inner border border-black/10">
                {colors.map((c, i) => (
                  <div key={i} style={{ width: `${(c.population / totalPopulation) * 100}%`, backgroundColor: c.hex }} className="h-full" />
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Brand Kit & Previews */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Brand Kit Dashboard */}
            {brandKit && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Palette className="w-6 h-6 text-purple-500" /> Extracted Brand Kit
                  </h3>
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-xs font-bold rounded-full uppercase tracking-wider">
                    {chroma(brandKit.background).luminance() < 0.2 ? 'Dark Theme' : 'Light Theme'}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-0">
                  {Object.entries(brandKit).map(([role, hex], i) => (
                    <div key={role} className="flex flex-col group cursor-pointer" onClick={() => copyToClipboard(hex, role)}>
                      <div className="h-24 w-full transition-transform group-hover:scale-105 group-active:scale-95 origin-bottom" style={{ backgroundColor: hex }}>
                        <div className="w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/10 transition-opacity">
                          {copiedKey === role ? <Check className="w-6 h-6 text-white drop-shadow-md" /> : <Copy className="w-6 h-6 text-white drop-shadow-md" />}
                        </div>
                      </div>
                      <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700/50">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{role}</p>
                        <p className="text-sm font-mono text-slate-800 dark:text-white">{hex.toUpperCase()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Live UI Preview */}
            {brandKit && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-6">
                  <Layout className="w-5 h-5 text-indigo-500" /> Live UI Mockup
                </h3>
                
                {/* The Mockup */}
                <div 
                  className="w-full rounded-2xl overflow-hidden shadow-2xl transition-colors duration-500 relative"
                  style={{ backgroundColor: brandKit.background, color: brandKit.text }}
                >
                  {/* Mockup Header */}
                  <div className="p-6 flex items-center justify-between border-b" style={{ borderColor: `${brandKit.text}20` }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg" style={{ backgroundColor: brandKit.primary }}></div>
                      <div className="h-4 w-24 rounded" style={{ backgroundColor: `${brandKit.text}40` }}></div>
                    </div>
                    <div className="flex gap-4">
                      <div className="h-2 w-12 rounded-full" style={{ backgroundColor: `${brandKit.text}30` }}></div>
                      <div className="h-2 w-12 rounded-full" style={{ backgroundColor: `${brandKit.text}30` }}></div>
                    </div>
                  </div>

                  {/* Mockup Body */}
                  <div className="p-8">
                    <div className="max-w-md">
                      <h1 className="text-4xl font-black tracking-tight mb-4 leading-tight">
                        Design systems built in <span style={{ color: brandKit.accent }}>seconds.</span>
                      </h1>
                      <p className="opacity-80 mb-8 leading-relaxed font-medium text-lg">
                        This is a live preview of your extracted brand kit applied to a standard dashboard layout. Notice how the colors interact.
                      </p>
                      <div className="flex gap-4">
                        <button className="px-6 py-3 rounded-xl font-bold shadow-lg transition-transform hover:scale-105" style={{ backgroundColor: brandKit.primary, color: chroma(brandKit.primary).luminance() > 0.5 ? '#000' : '#fff' }}>
                          Primary Action
                        </button>
                        <button className="px-6 py-3 rounded-xl font-bold border-2 transition-colors hover:opacity-80" style={{ borderColor: brandKit.secondary, color: brandKit.secondary }}>
                          Secondary
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Contrast Warning if needed */}
                  {chroma.contrast(brandKit.background, brandKit.text) < 4.5 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                      <CheckCircle2 className="w-3 h-3" /> Low Contrast
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Export Code Blocks */}
            {brandKit && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Tailwind Export */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-sm relative group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <FileJson className="w-4 h-4 text-sky-400" /> tailwind.config.js
                    </h3>
                    <button 
                      onClick={() => copyToClipboard(`theme: {\\n  colors: {\\n    primary: "${brandKit.primary}",\\n    secondary: "${brandKit.secondary}",\\n    accent: "${brandKit.accent}",\\n    background: "${brandKit.background}",\\n    text: "${brandKit.text}"\\n  }\\n}`, 'tailwind')}
                      className="text-slate-500 hover:text-white transition-colors"
                    >
                      {copiedKey === 'tailwind' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <pre className="text-xs text-sky-200 font-mono overflow-x-auto">
                    <code>
{`theme: {
  colors: {
    primary: "${brandKit.primary}",
    secondary: "${brandKit.secondary}",
    accent: "${brandKit.accent}",
    background: "${brandKit.background}",
    text: "${brandKit.text}"
  }
}`}
                    </code>
                  </pre>
                </div>

                {/* CSS Variables Export */}
                <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-sm relative group">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-pink-400" /> globals.css
                    </h3>
                    <button 
                      onClick={() => copyToClipboard(`:root {\\n  --color-primary: ${brandKit.primary};\\n  --color-secondary: ${brandKit.secondary};\\n  --color-accent: ${brandKit.accent};\\n  --color-background: ${brandKit.background};\\n  --color-text: ${brandKit.text};\\n}`, 'css')}
                      className="text-slate-500 hover:text-white transition-colors"
                    >
                      {copiedKey === 'css' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <pre className="text-xs text-pink-200 font-mono overflow-x-auto">
                    <code>
{`:root {
  --color-primary: ${brandKit.primary};
  --color-secondary: ${brandKit.secondary};
  --color-accent: ${brandKit.accent};
  --color-background: ${brandKit.background};
  --color-text: ${brandKit.text};
}`}
                    </code>
                  </pre>
                </div>

              </div>
            )}

          </div>

        </div>
      )}
    </div>
  );
};
