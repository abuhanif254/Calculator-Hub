"use client";

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Globe, Monitor, Laptop, Tablet, Smartphone, Sliders, Eye, Download, Copy, Check,
  RefreshCcw, Camera, Clock, AlertTriangle, FileText, CheckCircle, Zap, ChevronDown,
  ChevronUp, Trash2, History, ExternalLink, Lock, Unlock, Settings, Gauge, Scale
} from 'lucide-react';
import { addToHistory as addToGlobalHistory } from '../../../../lib/hooks/useToolHistory';

interface DevicePreset {
  name: string;
  width: number;
  height: number;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  userAgent: string;
  scaleFactor: number;
  type: 'desktop' | 'laptop' | 'tablet' | 'mobile' | 'custom';
}

const DEVICE_PRESETS: DevicePreset[] = [
  {
    name: 'Desktop Full HD',
    width: 1920,
    height: 1080,
    icon: Monitor,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    scaleFactor: 1,
    type: 'desktop'
  },
  {
    name: 'Laptop (Medium)',
    width: 1366,
    height: 768,
    icon: Laptop,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    scaleFactor: 1,
    type: 'laptop'
  },
  {
    name: 'Tablet (iPad Pro)',
    width: 1024,
    height: 1366,
    icon: Tablet,
    userAgent: 'Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    scaleFactor: 2,
    type: 'tablet'
  },
  {
    name: 'Mobile (iPhone 14)',
    width: 390,
    height: 844,
    icon: Smartphone,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
    scaleFactor: 3,
    type: 'mobile'
  },
  {
    name: 'Custom Size...',
    width: 1200,
    height: 800,
    icon: Sliders,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    scaleFactor: 1,
    type: 'custom'
  }
];

interface ScreenshotHistoryEntry {
  url: string;
  timestamp: number;
  width: number;
  height: number;
  presetName: string;
  isFullPage: boolean;
  darkMode: boolean;
}

export function WebsiteScreenshotTool() {
  // Input settings
  const [inputUrl, setInputUrl] = useState<string>('https://example.com');
  const [selectedPreset, setSelectedPreset] = useState<DevicePreset>(DEVICE_PRESETS[0]);
  
  // Custom dimensions state
  const [customWidth, setCustomWidth] = useState<number>(1200);
  const [customHeight, setCustomHeight] = useState<number>(800);
  const [customScaleFactor, setCustomScaleFactor] = useState<number>(1);
  const [customUa, setCustomUa] = useState<string>(DEVICE_PRESETS[0].userAgent);
  
  // Capturing configurations
  const [isFullPage, setIsFullPage] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [delay, setDelay] = useState<number>(1000);
  const [format, setFormat] = useState<'png' | 'jpeg'>('png');
  
  // Accordion panels
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  
  // Response states
  const [loading, setLoading] = useState<boolean>(false);
  const [progressText, setProgressText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  
  const [screenshotResult, setScreenshotResult] = useState<string | null>(null);
  const [seoData, setSeoData] = useState<any | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<any | null>(null);
  
  // Local history states
  const [history, setHistory] = useState<ScreenshotHistoryEntry[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);


  // Compute actual parameters based on preset vs custom selection
  const actualParams = useMemo(() => {
    if (selectedPreset.type === 'custom') {
      return {
        width: customWidth,
        height: customHeight,
        scaleFactor: customScaleFactor,
        userAgent: customUa
      };
    }
    return {
      width: selectedPreset.width,
      height: selectedPreset.height,
      scaleFactor: selectedPreset.scaleFactor,
      userAgent: selectedPreset.userAgent
    };
  }, [selectedPreset, customWidth, customHeight, customScaleFactor, customUa]);

  // Execute screenshot generation
  const executeCapture = async (urlToCheck: string) => {
    if (!urlToCheck.trim()) return;
    setLoading(true);
    setError(null);
    setScreenshotResult(null);
    setSeoData(null);
    setPerformanceMetrics(null);

    // Dynamic loading status messages
    const statusMessages = [
      'Establishing secure browser context...',
      'Checking network DNS & security policies...',
      'Opening headless renderer...',
      'Navigating to target URL...',
      'Running page scripts and styling audits...',
      'Waiting for page resources to settle...',
      'Stitching canvas & generating screenshot...',
      'Processing final base64 image encoding...'
    ];

    let messageIndex = 0;
    setProgressText(statusMessages[0]);
    
    const intervalId = setInterval(() => {
      if (messageIndex < statusMessages.length - 1) {
        messageIndex++;
        setProgressText(statusMessages[messageIndex]);
      }
    }, 2200);

    try {
      // Normalize URL
      let formattedUrl = urlToCheck.trim();
      if (!/^https?:\/\//i.test(formattedUrl)) {
        formattedUrl = 'https://' + formattedUrl;
      }

      const response = await fetch('/api/tools/website-screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: formattedUrl,
          width: actualParams.width,
          height: actualParams.height,
          isFullPage,
          darkMode,
          deviceScaleFactor: actualParams.scaleFactor,
          delay,
          format,
          userAgent: actualParams.userAgent
        })
      });

      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to capture screenshot. Make sure the website is public and accessible.');
      }

      setScreenshotResult(data.screenshot);
      setSeoData(data.seo);
      setPerformanceMetrics(data.performance);

      // Add to local storage capture history
      saveToLocalHistory(formattedUrl);

    } catch (err: any) {
      setError(err.message || 'An error occurred during screenshot generation.');
    } finally {
      clearInterval(intervalId);
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCapture(inputUrl);
  };

  // Save successful capture parameters to localStorage history
  const saveToLocalHistory = useCallback((url: string) => {
    try {
      const newEntry: ScreenshotHistoryEntry = {
        url,
        timestamp: Date.now(),
        width: actualParams.width,
        height: actualParams.height,
        presetName: selectedPreset.name,
        isFullPage,
        darkMode
      };
      
      // Prevent duplicates in recent history
      const filtered = history.filter(h => h.url.toLowerCase() !== url.toLowerCase());
      const updated = [newEntry, ...filtered].slice(0, 10);
      
      setHistory(updated);
      localStorage.setItem('nexus-screenshot-history', JSON.stringify(updated));
    } catch (_) {}
  }, [actualParams, selectedPreset.name, isFullPage, darkMode, history]);

  // Delete an entry from local history
  const deleteHistoryEntry = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const updated = history.filter((_, i) => i !== index);
    setHistory(updated);
    try {
      localStorage.setItem('nexus-screenshot-history', JSON.stringify(updated));
    } catch (_) {}
  };

  // Load configuration from history
  const loadHistoryEntry = (entry: ScreenshotHistoryEntry) => {
    setInputUrl(entry.url);
    setIsFullPage(entry.isFullPage);
    setDarkMode(entry.darkMode);
    
    const matchedPreset = DEVICE_PRESETS.find(p => p.name === entry.presetName);
    if (matchedPreset) {
      setSelectedPreset(matchedPreset);
    } else {
      const customP = DEVICE_PRESETS.find(p => p.type === 'custom')!;
      setSelectedPreset(customP);
      setCustomWidth(entry.width);
      setCustomHeight(entry.height);
    }
    
    executeCapture(entry.url);
  };

  // Clipboard copy utility
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Downloader utility
  const triggerImageDownload = () => {
    if (!screenshotResult) return;
    const link = document.createElement('a');
    link.href = screenshotResult;
    
    let domain = 'screenshot';
    try {
      domain = new URL(inputUrl).hostname.replace(/\./g, '_');
    } catch (_) {}

    link.download = `${domain}_${actualParams.width}x${actualParams.height}.${format}`;
    link.click();
  };

  // Initialize tool history
  useEffect(() => {
    addToGlobalHistory({ slug: "website-screenshot-tool", title: "Website Screenshot Tool", type: "tool" });
    
    // Load local capture history
    try {
      const storedHistory = localStorage.getItem('nexus-screenshot-history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (_) {}

    // Check query parameter for auto-screenshotting (?url=https://...)
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('url');
    if (urlParam) {
      const decodedUrl = decodeURIComponent(urlParam);
      setInputUrl(decodedUrl);
      executeCapture(decodedUrl);
    }
  }, []);

  return (
    <div className="space-y-8">
      {/* Search Input Form */}
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <label htmlFor="url-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Website URL to Screenshot
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Globe size={18} />
              </div>
              <input
                id="url-input"
                type="text"
                className="block w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-all font-mono text-sm"
                placeholder="e.g. https://github.com or example.com"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="preset-select" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Device preset size
            </label>
            <select
              id="preset-select"
              className="block w-full py-3 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-slate-900 dark:text-white transition-all text-sm font-medium"
              value={selectedPreset.name}
              onChange={(e) => {
                const preset = DEVICE_PRESETS.find(p => p.name === e.target.value);
                if (preset) setSelectedPreset(preset);
              }}
              disabled={loading}
            >
              {DEVICE_PRESETS.map((preset) => (
                <option key={preset.name} value={preset.name}>
                  {preset.name} ({preset.type === 'custom' ? 'Custom' : `${preset.width}x${preset.height}`})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Dynamic Custom Dimensions Options */}
        {selectedPreset.type === 'custom' && (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800/80 animate-in fade-in slide-in-from-top-1 duration-200">
            <div>
              <label htmlFor="custom-w" className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wider">
                Width (px)
              </label>
              <input
                id="custom-w"
                type="number"
                min="320"
                max="2560"
                className="block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#518231] focus:border-[#518231]"
                value={customWidth}
                onChange={(e) => setCustomWidth(Math.max(320, Math.min(2560, Number(e.target.value) || 320)))}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="custom-h" className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wider">
                Height (px)
              </label>
              <input
                id="custom-h"
                type="number"
                min="320"
                max="2560"
                className="block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#518231] focus:border-[#518231]"
                value={customHeight}
                onChange={(e) => setCustomHeight(Math.max(320, Math.min(2560, Number(e.target.value) || 320)))}
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="custom-scale" className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wider">
                Scale (Device Pixel Ratio)
              </label>
              <select
                id="custom-scale"
                className="block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#518231] focus:border-[#518231]"
                value={customScaleFactor}
                onChange={(e) => setCustomScaleFactor(Number(e.target.value))}
                disabled={loading}
              >
                <option value="1">1x (Standard)</option>
                <option value="2">2x (High-DPI / Retina)</option>
                <option value="3">3x (Ultra-DPI)</option>
              </select>
            </div>
            <div>
              <label htmlFor="custom-ua" className="block text-xs font-bold text-slate-600 dark:text-slate-400 mb-1 uppercase tracking-wider">
                User-Agent Header
              </label>
              <input
                id="custom-ua"
                type="text"
                className="block w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-mono text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-[#518231] focus:border-[#518231]"
                placeholder="Mozilla/5.0..."
                value={customUa}
                onChange={(e) => setCustomUa(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
        )}

        {/* Collapsible Advanced Toggle options */}
        <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
          <button
            type="button"
            className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-900/40 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-slate-800/40 transition-colors"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            <span className="flex items-center gap-2">
              <Settings size={16} className="text-[#518231]" />
              Advanced Capture Settings
            </span>
            <ChevronDown size={16} className={`transform transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>
          
          {showAdvanced && (
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in fade-in duration-200">
              {/* Checkboxes */}
              <div className="space-y-3">
                <label className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isFullPage}
                    onChange={(e) => setIsFullPage(e.target.checked)}
                    disabled={loading}
                    className="w-4.5 h-4.5 rounded text-[#518231] focus:ring-[#518231] border-slate-300 dark:border-slate-700"
                  />
                  Full Scrollable Page Capture
                </label>
                <label className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={(e) => setDarkMode(e.target.checked)}
                    disabled={loading}
                    className="w-4.5 h-4.5 rounded text-[#518231] focus:ring-[#518231] border-slate-300 dark:border-slate-700"
                  />
                  Force Dark Scheme (Best Effort)
                </label>
              </div>

              {/* Settle Delay Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Clock size={14} className="text-slate-400" />
                    Load Delay
                  </span>
                  <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-[#518231] px-2 py-0.5 rounded font-bold">
                    {delay} ms
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="500"
                  value={delay}
                  onChange={(e) => setDelay(Number(e.target.value))}
                  disabled={loading}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#518231]"
                />
                <span className="block text-[10px] text-slate-400">
                  Allow asynchronous scripts, assets, and layouts to settle.
                </span>
              </div>

              {/* Format selection */}
              <div>
                <label htmlFor="format-select" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1">
                  <Scale size={14} className="text-slate-400" />
                  Output Format
                </label>
                <select
                  id="format-select"
                  className="block w-full py-2 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-white focus:ring-1 focus:ring-[#518231]"
                  value={format}
                  onChange={(e) => setFormat(e.target.value as any)}
                  disabled={loading}
                >
                  <option value="png">PNG (Lossless Quality)</option>
                  <option value="jpeg">JPG (Compressed, Small Size)</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Submit action */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={loading || !inputUrl.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-[#518231] hover:bg-[#436e29] text-white font-semibold rounded-xl focus:ring-4 focus:ring-[#518231]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-md cursor-pointer"
          >
            {loading ? (
              <>
                <RefreshCcw size={16} className="animate-spin" />
                Capture Active...
              </>
            ) : (
              <>
                <Camera size={16} />
                Generate Screenshot
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error notification block */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-2xl flex items-start gap-3 shadow-sm animate-in fade-in duration-200">
          <AlertTriangle className="shrink-0 mt-0.5 text-rose-500" />
          <div className="text-sm">
            <p className="font-bold">Capture Failed</p>
            <p className="mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Primary Result Panel Grid */}
      {(loading || screenshotResult) && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Visual Device Preview Window (LHS - 2 cols width) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye size={20} className="text-[#518231]" />
              Image Preview
            </h3>

            <div className="relative border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-950/20 dark:bg-slate-950/80 shadow-md flex flex-col min-h-[400px]">
              
              {/* Glassmorphic simulated top browser utility bar */}
              <div className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between shrink-0 select-none">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                
                {/* Simulated locked URL bar */}
                <div className="flex items-center space-x-1 px-3 py-1 bg-slate-200/50 dark:bg-slate-950/50 border border-slate-300/40 dark:border-slate-800/40 rounded-lg text-xs text-slate-500 font-mono max-w-sm w-full justify-center">
                  <Lock size={10} className="text-emerald-500 shrink-0" />
                  <span className="truncate">{inputUrl}</span>
                </div>

                <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
                  <span>{actualParams.width} x {actualParams.height}</span>
                </div>
              </div>

              {/* Rendering canvas area */}
              <div className="grow flex items-center justify-center p-4 min-h-[350px] overflow-auto custom-scrollbar">
                {loading ? (
                  <div className="text-center space-y-4 p-8">
                    <div className="relative w-16 h-16 mx-auto">
                      {/* Dual-loop premium spinner */}
                      <div className="absolute inset-0 rounded-full border-4 border-[#518231]/10"></div>
                      <div className="absolute inset-0 rounded-full border-4 border-t-[#518231] animate-spin"></div>
                    </div>
                    <div className="space-y-1.5">
                      <p className="font-bold text-slate-800 dark:text-slate-200 animate-pulse text-sm">Generating Website Screenshot</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono italic max-w-xs mx-auto">
                        {progressText}
                      </p>
                    </div>
                  </div>
                ) : (
                  screenshotResult && (
                    <div className="max-w-full shadow-2xl border border-slate-800/20 rounded-lg overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                      {/* Rendered image tag */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={screenshotResult}
                        alt={`Screenshot of ${inputUrl}`}
                        className="max-h-[600px] object-contain w-auto h-auto mx-auto block bg-white"
                      />
                    </div>
                  )
                )}
              </div>

              {/* Action buttons footer */}
              {screenshotResult && !loading && (
                <div className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-end space-x-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyText(screenshotResult, 'b64')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                  >
                    {copiedId === 'b64' ? (
                      <>
                        <Check size={14} className="text-emerald-500" />
                        Copied Base64
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy Base64 Data
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={triggerImageDownload}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#518231] hover:bg-[#436e29] text-white rounded-xl text-xs font-semibold shadow-sm transition-colors cursor-pointer"
                  >
                    <Download size={14} />
                    Download {format.toUpperCase()}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar: SEO Analysis & Performance Timing (RHS - 1 col width) */}
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Timings Performance card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <Gauge size={18} className="text-[#518231]" />
                Performance Insights
              </h3>

              {loading ? (
                <div className="space-y-3.5 py-2">
                  <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
                  <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse"></div>
                </div>
              ) : (
                performanceMetrics && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Page Load Speed</div>
                        <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                          {(performanceMetrics.loadTimeMs / 1000).toFixed(2)}s
                        </div>
                        <div className="mt-1 text-[10px] text-slate-400">
                          {performanceMetrics.loadTimeMs < 1200 ? '🟢 Excellent speed' : performanceMetrics.loadTimeMs < 3000 ? '🟡 Average' : '🔴 Slow connection'}
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Render Capture</div>
                        <div className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                          {performanceMetrics.renderTimeMs}ms
                        </div>
                        <div className="mt-1 text-[10px] text-slate-400">Stitch & paint overhead</div>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 space-y-1">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Estimated Payload Size</div>
                      <div className="text-sm font-mono text-slate-900 dark:text-white break-all flex items-center justify-between">
                        <span>{(performanceMetrics.pageSizeEstimateBytes / 1024).toFixed(1)} KB</span>
                        <span className="text-[10px] text-slate-400 font-sans">Resources processed</span>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* SEO details card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <FileText size={18} className="text-[#518231]" />
                SEO Metadata Snapshot
              </h3>

              {loading ? (
                <div className="space-y-4 py-2">
                  <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded animate-pulse w-3/4"></div>
                  <div className="h-16 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                  <div className="h-5 bg-slate-100 dark:bg-slate-800 rounded animate-pulse w-1/2"></div>
                </div>
              ) : (
                seoData && (
                  <div className="space-y-4 text-xs">
                    {/* Title tag */}
                    <div>
                      <div className="flex justify-between text-slate-400 font-semibold mb-1 uppercase tracking-wide">
                        <span>Page Title</span>
                        <span>{seoData.title.length} chars</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800 font-mono text-slate-800 dark:text-slate-200">
                        {seoData.title || <span className="text-rose-500 italic">None detected</span>}
                      </div>
                      {seoData.title && (seoData.title.length < 30 || seoData.title.length > 60) && (
                        <div className="mt-1 text-[10px] text-amber-500 flex items-center gap-1 font-medium">
                          <AlertTriangle size={10} />
                          Ideal length is 50-60 characters.
                        </div>
                      )}
                    </div>

                    {/* Meta Description */}
                    <div>
                      <div className="flex justify-between text-slate-400 font-semibold mb-1 uppercase tracking-wide">
                        <span>Meta Description</span>
                        <span>{seoData.description ? seoData.description.length : 0} chars</span>
                      </div>
                      <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800 font-mono text-slate-800 dark:text-slate-200 leading-relaxed">
                        {seoData.description || <span className="text-rose-500 italic">None detected</span>}
                      </div>
                      {seoData.description && (seoData.description.length < 110 || seoData.description.length > 160) && (
                        <div className="mt-1 text-[10px] text-amber-500 flex items-center gap-1 font-medium">
                          <AlertTriangle size={10} />
                          Ideal length is 110-160 characters.
                        </div>
                      )}
                    </div>

                    {/* Canonical Link */}
                    <div>
                      <span className="text-slate-400 font-semibold block mb-1 uppercase tracking-wide">Canonical URL</span>
                      <div className="p-2.5 bg-slate-50 dark:bg-slate-950 rounded-lg border border-slate-100 dark:border-slate-800 font-mono text-slate-800 dark:text-slate-200 break-all select-all">
                        {seoData.canonical || <span className="text-rose-500 italic">None declared</span>}
                      </div>
                    </div>

                    {/* Crawler instructions */}
                    <div className="grid grid-cols-2 gap-3.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-slate-400 font-semibold block mb-1 uppercase tracking-wide">H1 Headers</span>
                        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                          {seoData.h1Count === 1 ? (
                            <CheckCircle size={12} className="text-emerald-500" />
                          ) : (
                            <AlertTriangle size={12} className="text-amber-500" />
                          )}
                          {seoData.h1Count} tags
                        </div>
                      </div>

                      <div>
                        <span className="text-slate-400 font-semibold block mb-1 uppercase tracking-wide">Robots Directives</span>
                        <div className="font-mono text-slate-700 dark:text-slate-300 truncate">
                          {seoData.robots || 'index, follow'}
                        </div>
                      </div>
                    </div>

                    {seoData.h1s && seoData.h1s.length > 0 && (
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                        <span className="text-slate-400 font-semibold block mb-1.5 uppercase tracking-wide">Detected H1 Text</span>
                        <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-300 italic list-disc list-inside">
                          {seoData.h1s.map((txt: string, i: number) => (
                            <li key={i} className="truncate" title={txt}>&quot;{txt}&quot;</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Client capture history panel */}
      {history.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <History size={18} className="text-[#518231]" />
            Recent Captures
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {history.map((entry, index) => (
              <div
                key={index}
                onClick={() => loadHistoryEntry(entry)}
                className="bg-slate-50 hover:bg-slate-100/80 dark:bg-slate-950 dark:hover:bg-slate-900/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80 cursor-pointer transition-all group flex items-start justify-between relative overflow-hidden"
              >
                <div className="space-y-1 select-none w-5/6">
                  <div className="font-mono text-xs text-[#518231] font-bold truncate">
                    {entry.url}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1.5">
                    <span>{entry.presetName} ({entry.width}x{entry.height})</span>
                    <span>•</span>
                    <span>{new Date(entry.timestamp).toLocaleDateString()}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => deleteHistoryEntry(e, index)}
                  className="text-slate-400 hover:text-rose-500 rounded p-1 hover:bg-rose-500/10 transition-all z-10 shrink-0"
                  title="Remove from history"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { WebsiteScreenshotTool as default };
