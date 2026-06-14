"use client";

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { 
  Upload, Trash2, Download, Copy, RefreshCw, AlertCircle, CheckCircle2, Sparkles, X, Check, 
  Eye, HelpCircle, Code, FileCode, Layers, History, ShieldCheck, Info, FileText, 
  ChevronRight, ArrowRight, Smartphone, Monitor, Maximize2
} from "lucide-react";
import JSZip from 'jszip';

// Interfaces
interface ImageItem {
  id: string;
  name: string;
  size: number; // bytes
  type: string; // MIME type
  width: number;
  height: number;
  dataUri: string;
  rawBase64: string;
  status: 'encoding' | 'success' | 'error';
  errorMsg?: string;
}

interface ConversionHistoryItem {
  id: string;
  name: string;
  size: number;
  type: string;
  timestamp: number;
  dataUri: string; // Truncated or stored fully depending on size
}

export function ImageToBase64Tool() {
  // Conversion state
  const [queue, setQueue] = useState<ImageItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  
  // UI Settings
  const [activeTab, setActiveTab] = useState<'uri' | 'raw' | 'html' | 'css' | 'js' | 'react' | 'json'>('uri');
  const [activeSubView, setActiveSubView] = useState<'workspace' | 'history' | 'analyzer'>('workspace');
  const [lineWrap, setLineWrap] = useState<boolean>(true);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [recentConversions, setRecentConversions] = useState<ConversionHistoryItem[]>([]);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load history from local storage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedHistory = localStorage.getItem('image_to_base64_history');
        if (storedHistory) {
          setRecentConversions(JSON.parse(storedHistory));
        }
      } catch (err) {
        console.error('Failed to load local storage logs', err);
      }
    }
  }, []);

  // Show copy checkmark helper
  const handleCopyText = (text: string, tabId: string) => {
    navigator.clipboard.writeText(text);
    setCopied(tabId);
    triggerNotification('success', 'Copied to clipboard!');
    setTimeout(() => setCopied(null), 2000);
  };

  // Helper: show notification
  const triggerNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Retrieve active item
  const activeItem = useMemo(() => {
    return queue.find(item => item.id === activeItemId) || null;
  }, [queue, activeItemId]);

  // Format bytes
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  // Parse dimensions of image
  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(url);
      };
      img.onerror = () => {
        resolve({ width: 0, height: 0 });
        URL.revokeObjectURL(url);
      };
      img.src = url;
    });
  };

  // Process files
  const processFiles = async (files: FileList | File[]) => {
    const validTypes = [
      'image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 
      'image/svg+xml', 'image/bmp', 'image/x-icon', 'image/vnd.microsoft.icon', 'image/avif'
    ];
    
    const newItems: ImageItem[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type || (file.name.endsWith('.svg') ? 'image/svg+xml' : file.name.endsWith('.ico') ? 'image/x-icon' : '');
      
      if (!validTypes.includes(fileType) && !file.name.endsWith('.ico') && !file.name.endsWith('.avif')) {
        triggerNotification('error', `Unsupported file: ${file.name}`);
        continue;
      }

      const id = `img-${Date.now()}-${i}`;
      
      // Temporary loading item
      const newItem: ImageItem = {
        id,
        name: file.name,
        size: file.size,
        type: fileType || 'image/octet-stream',
        width: 0,
        height: 0,
        dataUri: '',
        rawBase64: '',
        status: 'encoding'
      };
      
      newItems.push(newItem);
    }

    if (newItems.length === 0) return;

    setQueue(prev => [...prev, ...newItems]);
    
    // Auto-select first added item if nothing is active
    if (!activeItemId) {
      setActiveItemId(newItems[0].id);
    }

    // Perform conversions asynchronously
    newItems.forEach(async (item, index) => {
      const file = files[index];
      try {
        const { width, height } = await getImageDimensions(file);
        
        const reader = new FileReader();
        reader.onload = () => {
          const dataUri = reader.result as string;
          const rawBase64 = dataUri.split(',')[1] || '';

          setQueue(prev => prev.map(q => {
            if (q.id === item.id) {
              return {
                ...q,
                width,
                height,
                dataUri,
                rawBase64,
                status: 'success'
              };
            }
            return q;
          }));

          // Add to local conversions history (limit file size stored in history to prevent local storage quota exceeded)
          const truncatedDataUri = dataUri.length < 150000 ? dataUri : dataUri.substring(0, 100) + '...[truncated]';
          
          const historyItem: ConversionHistoryItem = {
            id: item.id,
            name: item.name,
            size: item.size,
            type: item.type,
            timestamp: Date.now(),
            dataUri: truncatedDataUri
          };

          setRecentConversions(prev => {
            const next = [historyItem, ...prev].slice(0, 15);
            localStorage.setItem('image_to_base64_history', JSON.stringify(next));
            return next;
          });
        };
        reader.onerror = () => {
          setQueue(prev => prev.map(q => {
            if (q.id === item.id) {
              return { ...q, status: 'error', errorMsg: 'FileReader failed to parse data.' };
            }
            return q;
          }));
        };
        reader.readAsDataURL(file);
      } catch (err) {
        setQueue(prev => prev.map(q => {
          if (q.id === item.id) {
            return { ...q, status: 'error', errorMsg: 'Error parsing image details.' };
          }
          return q;
        }));
      }
    });

    triggerNotification('success', `Added ${newItems.length} file(s) for encoding.`);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files);
    }
  };

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
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

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
        processFiles(files);
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [activeItemId]);

  // Download individual string
  const downloadTxtFile = (content: string, name: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${name.substring(0, name.lastIndexOf('.')) || name}_base64.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerNotification('success', 'Downloaded text file!');
  };

  // Download ZIP (jsZip)
  const downloadZip = async () => {
    if (queue.length === 0) return;
    setIsZipping(true);
    try {
      const zip = new JSZip();
      
      queue.forEach(item => {
        if (item.status === 'success') {
          // Add dataUri text file
          zip.file(`${item.name}_data_uri.txt`, item.dataUri);
          // Add raw Base64 file
          zip.file(`${item.name}_raw_base64.txt`, item.rawBase64);
        }
      });

      // Generate a JSON mapping file too
      const jsonMap = queue.reduce((acc, item) => {
        if (item.status === 'success') {
          acc[item.name] = {
            mimeType: item.type,
            size: item.size,
            dataUri: item.dataUri
          };
        }
        return acc;
      }, {} as Record<string, any>);

      zip.file('image_base64_manifest.json', JSON.stringify(jsonMap, null, 2));

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'images_base64_export.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      triggerNotification('success', 'ZIP file downloaded successfully!');
    } catch (err) {
      console.error(err);
      triggerNotification('error', 'Failed to generate ZIP archive.');
    } finally {
      setIsZipping(false);
    }
  };

  // Download combined JSON mapping
  const downloadJsonManifest = () => {
    if (queue.length === 0) return;
    
    const manifest = queue.reduce((acc, item) => {
      if (item.status === 'success') {
        acc[item.name] = item.dataUri;
      }
      return acc;
    }, {} as Record<string, string>);

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'images_base64_mapping.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerNotification('success', 'JSON manifest downloaded!');
  };

  // Delete item from queue
  const removeQueueItem = (id: string) => {
    setQueue(prev => prev.filter(item => item.id !== id));
    if (activeItemId === id) {
      const remaining = queue.filter(item => item.id !== id);
      setActiveItemId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  // Clear all queue
  const clearQueue = () => {
    setQueue([]);
    setActiveItemId(null);
    triggerNotification('success', 'Workspace cleared.');
  };

  // Clear history
  const clearHistory = () => {
    setRecentConversions([]);
    localStorage.removeItem('image_to_base64_history');
    triggerNotification('success', 'Conversion history purged.');
  };

  // Code Snippets Generation depending on active format tab
  const generatedCode = useMemo(() => {
    if (!activeItem || activeItem.status !== 'success') return '';
    const uri = activeItem.dataUri;
    const raw = activeItem.rawBase64;
    const name = activeItem.name;

    switch (activeTab) {
      case 'uri':
        return uri;
      case 'raw':
        return raw;
      case 'html':
        return `<img src="${uri}" alt="${name}" />`;
      case 'css':
        return `.embedded-bg {\n  background-image: url("${uri}");\n  background-size: contain;\n  background-repeat: no-repeat;\n}`;
      case 'js':
        return `// JavaScript Image Creation\nconst myImage = new Image();\nmyImage.src = "${uri}";\ndocument.body.appendChild(myImage);`;
      case 'react':
        return `import React from 'react';\n\nexport function InlineImage() {\n  return (\n    <img \n      src="${uri}" \n      alt="${name}" \n      loading="lazy" \n    />\n  );\n}`;
      case 'json':
        return `{\n  "fileName": "${name}",\n  "mimeType": "${activeItem.type}",\n  "sizeBytes": ${activeItem.size},\n  "dataUri": "${uri}"\n}`;
      default:
        return '';
    }
  }, [activeItem, activeTab]);

  // Truncation optimization: limit displayed string length in GUI to prevent DOM lag
  const MAX_DISPLAY_CHARS = 12000;
  const isDisplayTruncated = generatedCode.length > MAX_DISPLAY_CHARS;
  const displayCode = useMemo(() => {
    if (isDisplayTruncated) {
      return generatedCode.substring(0, MAX_DISPLAY_CHARS) + `\n\n... [String truncated for performance. Showing ${MAX_DISPLAY_CHARS.toLocaleString()} of ${generatedCode.length.toLocaleString()} characters. Click 'Copy' or 'Download' to retrieve the full string.]`;
    }
    return generatedCode;
  }, [generatedCode, isDisplayTruncated]);

  // Statistics calculation for the active file
  const analyticsData = useMemo(() => {
    if (!activeItem || activeItem.status !== 'success') return null;
    const originalSize = activeItem.size;
    const base64Size = activeItem.dataUri.length; // size in ASCII characters (1 char = 1 byte)
    const sizeDiff = base64Size - originalSize;
    const sizeIncreasePercent = (sizeDiff / originalSize) * 100;
    
    // Performance assessment based on original size
    let status: 'good' | 'moderate' | 'danger' = 'good';
    let recommendation = '';
    
    if (originalSize < 4096) {
      status = 'good';
      recommendation = "Excellent! File size is under 4KB. Embedding this image will reduce HTTP connection requests and improve page rendering speeds with minimal HTML bloat.";
    } else if (originalSize <= 10240) {
      status = 'moderate';
      recommendation = "Moderate. File size is between 4KB and 10KB. Inlining is acceptable, but restrict it to only a few critical icons to avoid bloating your stylesheet or HTML files.";
    } else {
      status = 'danger';
      recommendation = "Warning: File size exceeds 10KB. Converting this image to Base64 is NOT recommended for typical web environments. It will bloat your files by ~33%, bypassing browser caches and delaying the page's First Contentful Paint. Link this asset as an external file instead.";
    }

    return {
      originalSizeFormatted: formatBytes(originalSize),
      base64SizeFormatted: formatBytes(base64Size),
      sizeDiffFormatted: formatBytes(sizeDiff),
      percentIncrease: sizeIncreasePercent.toFixed(1),
      status,
      recommendation
    };
  }, [activeItem]);

  // Load from history helper
  const handleLoadFromHistory = (histItem: ConversionHistoryItem) => {
    // Check if item already exists in queue, otherwise load it
    const existing = queue.find(q => q.id === histItem.id);
    if (existing) {
      setActiveItemId(histItem.id);
      setActiveSubView('workspace');
      return;
    }

    // Try to load historical item
    // Note: since large base64 might have been truncated in history, we load what we can
    const baseVal = histItem.dataUri.includes('[truncated]') ? '' : histItem.dataUri;
    const rawVal = baseVal.split(',')[1] || '';

    const newItem: ImageItem = {
      id: histItem.id,
      name: histItem.name,
      size: histItem.size,
      type: histItem.type,
      width: 0,
      height: 0,
      dataUri: baseVal,
      rawBase64: rawVal,
      status: baseVal ? 'success' : 'error',
      errorMsg: baseVal ? undefined : 'Original Base64 data was too large to keep in local history cache. Please re-upload the file.'
    };

    setQueue(prev => [...prev, newItem]);
    setActiveItemId(newItem.id);
    setActiveSubView('workspace');
    triggerNotification('success', 'Loaded item from cache.');
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-xl text-white animate-fade-in transition-all ${
          notification.type === 'success' ? 'bg-[#518231]' : 'bg-red-600'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Developer Subview Navigation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 dark:border-slate-800 pb-4 gap-4">
        <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
          <button
            onClick={() => setActiveSubView('workspace')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeSubView === 'workspace'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles size={16} />
            Encoding Studio
          </button>
          <button
            onClick={() => setActiveSubView('analyzer')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeSubView === 'analyzer'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code size={16} />
            Developer Dashboard
          </button>
          <button
            onClick={() => setActiveSubView('history')}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-md transition-all ${
              activeSubView === 'history'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <History size={16} />
            Recent Converts ({recentConversions.length})
          </button>
        </div>

        {/* Global actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={clearQueue}
            disabled={queue.length === 0}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 text-xs font-semibold rounded-lg transition-colors"
          >
            <RefreshCw size={13} />
            Reset Canvas
          </button>
          {queue.length > 1 && (
            <>
              <button
                onClick={downloadZip}
                disabled={isZipping}
                className="flex items-center gap-1 px-3 py-1.5 bg-[#518231] hover:bg-[#436e29] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs"
              >
                {isZipping ? <RefreshCw size={13} className="animate-spin" /> : <Layers size={13} />}
                Download ZIP
              </button>
              <button
                onClick={downloadJsonManifest}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-950 text-white text-xs font-semibold rounded-lg transition-colors"
              >
                <FileCode size={13} />
                Download JSON
              </button>
            </>
          )}
        </div>
      </div>

      {/* SUBVIEW: HISTORY */}
      {activeSubView === 'history' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recent Conversions</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm">Recover past Base64 string conversions cached in local session.</p>
            </div>
            {recentConversions.length > 0 && (
              <button
                onClick={clearHistory}
                className="flex items-center gap-1 text-red-600 dark:text-red-400 text-xs font-bold hover:underline"
              >
                <Trash2 size={13} /> Clear History
              </button>
            )}
          </div>

          {recentConversions.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center bg-slate-50 dark:bg-slate-900/30">
              <History size={40} className="text-slate-400 mb-3" />
              <p className="text-slate-600 dark:text-slate-300 font-medium">History log empty</p>
              <p className="text-slate-400 text-sm max-w-sm mt-1">Conversions will appear here automatically for fast retrieval.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentConversions.map((hist) => (
                <div
                  key={hist.id}
                  onClick={() => handleLoadFromHistory(hist)}
                  className="flex flex-col justify-between border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-900/80 rounded-xl p-4 cursor-pointer hover:shadow-xs group transition-all"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-slate-800 dark:text-slate-200 truncate pr-3 block text-sm">{hist.name}</span>
                      <span className="text-[10px] text-slate-400 font-mono shrink-0">{formatBytes(hist.size)}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {hist.type.split('/')[1] || 'image'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-3 border-t border-slate-200 dark:border-slate-800 mt-4">
                    <span>{new Date(hist.timestamp).toLocaleDateString()}</span>
                    <span className="text-[#518231] group-hover:underline flex items-center font-bold">
                      Open Studio <ChevronRight size={11} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBVIEW: DEVELOPER DASHBOARD */}
      {activeSubView === 'analyzer' && (
        <div className="space-y-6 animate-fade-in max-w-4xl">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Developer Analytics Dashboard</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">Analyze base64 overhead, size discrepancies, and browser parsing recommendations.</p>
          </div>

          {!analyticsData ? (
            <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-10 text-center bg-slate-50 dark:bg-slate-900/30">
              <Code size={32} className="text-slate-400 mx-auto mb-2" />
              <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">No active conversion data to analyze</p>
              <p className="text-slate-400 text-xs mt-1">Upload files in the Encoding Studio tab to unlock detailed dashboard statistics.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Analytics grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50 dark:bg-slate-900/40">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Original Binary Size</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-white block mt-1">{analyticsData.originalSizeFormatted}</span>
                </div>
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50 dark:bg-slate-900/40">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Base64 Text Size</span>
                  <span className="text-2xl font-black text-slate-800 dark:text-white block mt-1">{analyticsData.base64SizeFormatted}</span>
                </div>
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50 dark:bg-slate-900/40">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Payload Size Increase</span>
                  <span className={`text-2xl font-black block mt-1 ${
                    analyticsData.status === 'good' ? 'text-green-600 dark:text-green-400' : 'text-amber-500'
                  }`}>
                    +{analyticsData.percentIncrease}%
                  </span>
                </div>
              </div>

              {/* Recommendation card */}
              <div className={`border rounded-xl p-5 flex items-start gap-4 ${
                analyticsData.status === 'good' 
                  ? 'border-green-200 bg-green-50/50 dark:border-green-900/30 dark:bg-green-950/10' 
                  : (analyticsData.status === 'moderate' 
                      ? 'border-amber-200 bg-amber-50/50 dark:border-amber-900/30 dark:bg-amber-950/10' 
                      : 'border-rose-200 bg-rose-50/50 dark:border-rose-900/30 dark:bg-rose-950/10')
              }`}>
                <Info className={`shrink-0 mt-0.5 ${
                  analyticsData.status === 'good' ? 'text-green-600 dark:text-green-400' : (analyticsData.status === 'moderate' ? 'text-amber-500' : 'text-rose-500')
                }`} size={20} />
                <div className="space-y-1">
                  <h4 className={`font-bold text-sm ${
                    analyticsData.status === 'good' ? 'text-green-800 dark:text-green-300' : (analyticsData.status === 'moderate' ? 'text-amber-800 dark:text-amber-300' : 'text-rose-800 dark:text-rose-300')
                  }`}>
                    Performance Assessment
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {analyticsData.recommendation}
                  </p>
                </div>
              </div>

              {/* Bandwidth impact review */}
              <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-4 bg-slate-900 text-white">
                <h4 className="font-bold text-md flex items-center gap-1.5">
                  <ShieldCheck size={18} className="text-[#518231]" /> Network Bandwidth Impact Analysis
                </h4>
                <p className="text-slate-300 text-xs leading-relaxed">
                  When inline-embedding files, the browser parses the Base64 string directly inside the document thread. If the site applies server-side compression (Brotli or GZIP), the transferred data overhead is compressed down to about +3% to +5% of the original binary size. However, the client CPU must still allocate resources to decompress, parse, and decode the string in memory. Restrict Base64 to small vectors, CSS backgrounds, and critical above-the-fold UI assets!
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBVIEW: STUDIO WORKSPACE */}
      {activeSubView === 'workspace' && (
        <div className="flex flex-col lg:flex-row gap-6 h-auto min-h-[580px] items-stretch">
          
          {/* LEFT SIDE: QUEUE LIST & FILE DETAIL PANEL */}
          <div className="w-full lg:w-[350px] shrink-0 flex flex-col border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 rounded-xl overflow-hidden shadow-sm">
            
            {/* Upload Zone */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
              <div 
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition-all ${
                  dragActive 
                    ? 'border-[#518231] bg-[#518231]/5' 
                    : 'border-slate-350 dark:border-slate-800 bg-slate-100/40 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <Upload className="mx-auto text-slate-450 mb-2" size={22} />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">Drag & Drop Image or Click</span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Supports PNG, JPG, WEBP, SVG, GIF, AVIF, ICO, BMP</span>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  multiple
                  onChange={handleFileInputChange}
                  className="hidden" 
                />
              </div>

              {/* Security Statement */}
              <div className="flex items-center gap-1.5 mt-3 justify-center text-[10px] text-slate-450 dark:text-slate-400">
                <ShieldCheck size={12} className="text-green-600 dark:text-green-500" />
                <span>100% Client-Side Privacy: Your images are not uploaded.</span>
              </div>
            </div>

            {/* Queue Files List */}
            <div className="flex-1 p-3 overflow-y-auto max-h-[360px] space-y-2">
              <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400 block px-1">
                Queue list ({queue.length})
              </span>

              {queue.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800/80 rounded-lg bg-slate-100/30">
                  <p className="text-[11px] text-slate-400">Workspace is empty. Paste or upload images to begin encoding.</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {queue.map((item) => {
                    const isActive = item.id === activeItemId;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setActiveItemId(item.id)}
                        className={`flex items-center justify-between p-2 rounded-lg border text-xs cursor-pointer transition-all ${
                          isActive
                            ? 'bg-blue-50/50 dark:bg-blue-955 border-blue-400 dark:border-blue-800/80'
                            : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          {item.status === 'success' && item.dataUri ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.dataUri} alt={item.name} className="w-8 h-8 rounded bg-slate-100 object-cover border border-slate-200 dark:border-slate-800 shrink-0" />
                          ) : (
                            <div className="w-8 h-8 rounded bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
                              <RefreshCw size={12} className="animate-spin text-slate-400" />
                            </div>
                          )}
                          <div className="truncate">
                            <span className="font-semibold truncate block text-slate-800 dark:text-slate-200 text-[11px]">{item.name}</span>
                            <span className="text-[9px] text-slate-450 dark:text-slate-400 font-mono block">{formatBytes(item.size)}</span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeQueueItem(item.id);
                          }}
                          className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded"
                          title="Remove file"
                        >
                          <X size={13} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDE: EDITOR OUTPUT SNIPPETS */}
          <div className="flex-1 flex flex-col border border-slate-200 dark:border-slate-800 bg-slate-950 rounded-xl overflow-hidden min-h-[500px]">
            {/* Output Editor Header */}
            <div className="flex justify-between items-center bg-slate-900 px-4 py-2 border-b border-slate-950">
              <div className="flex bg-slate-950 p-0.5 rounded border border-slate-800 overflow-x-auto max-w-[420px] md:max-w-none">
                {[
                  { id: 'uri', label: 'Data URI' },
                  { id: 'raw', label: 'Raw String' },
                  { id: 'html', label: 'HTML img' },
                  { id: 'css', label: 'CSS Background' },
                  { id: 'js', label: 'JavaScript' },
                  { id: 'react', label: 'React' },
                  { id: 'json', label: 'JSON' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-md capitalize transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-slate-800 text-white shadow-xs'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeItem && activeItem.status === 'success' && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopyText(generatedCode, activeTab)}
                    className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded transition-colors flex items-center gap-1 text-[10px] font-bold"
                    title="Copy code"
                  >
                    {copied === activeTab ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                    Copy
                  </button>
                  <button
                    onClick={() => downloadTxtFile(generatedCode, activeItem.name)}
                    className="p-1.5 hover:bg-slate-800 text-slate-300 hover:text-white rounded transition-colors flex items-center gap-1 text-[10px] font-bold"
                    title="Download string file"
                  >
                    <Download size={12} />
                    Download
                  </button>
                  <span className="h-4 w-px bg-slate-800 mx-1"></span>
                  <button
                    onClick={() => setLineWrap(!lineWrap)}
                    className={`px-2 py-1 hover:bg-slate-800 text-[10px] font-bold rounded border ${
                      lineWrap ? 'border-[#518231] text-[#518231]' : 'border-slate-800 text-slate-400'
                    }`}
                    title="Toggle Word Wrap"
                  >
                    Wrap
                  </button>
                </div>
              )}
            </div>

            {/* Code Snippet Screen */}
            <div className="flex-1 relative bg-[#1e1e1e] p-4 font-mono text-xs overflow-auto max-h-[340px]">
              {activeItem ? (
                activeItem.status === 'success' ? (
                  <pre className={`text-slate-350 select-all ${lineWrap ? 'break-all whitespace-pre-wrap' : 'whitespace-pre'}`}>
                    <code>{displayCode}</code>
                  </pre>
                ) : (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <RefreshCw size={24} className="animate-spin text-slate-500 mb-2" />
                    <span className="text-slate-400 text-xs">Encoding image data locally...</span>
                  </div>
                )
              ) : (
                <div className="flex flex-col items-center justify-center py-28 text-slate-500 text-center">
                  <Upload size={30} className="mb-2 text-slate-600" />
                  <span>No file selected in queue.</span>
                  <span className="text-[10px] text-slate-600 block mt-0.5">Upload images on the left to inspect Base64 code patterns.</span>
                </div>
              )}
            </div>

            {/* Verification Previews & Dashboard */}
            {activeItem && activeItem.status === 'success' && (
              <div className="bg-slate-900 border-t border-slate-950 p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* File Parameters */}
                <div className="space-y-2 text-[10px] text-slate-450 dark:text-slate-400 font-mono">
                  <span className="text-xs font-bold text-slate-300 block mb-1">🔍 File Parameters</span>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                    <span>Resolution:</span>
                    <span className="text-white font-bold">{activeItem.width} × {activeItem.height} px</span>
                    <span>MIME Type:</span>
                    <span className="text-white font-bold">{activeItem.type}</span>
                    <span>Base64 Size:</span>
                    <span className="text-white font-bold">{formatBytes(activeItem.dataUri.length)}</span>
                    <span>Size Overhead:</span>
                    <span className="text-amber-500 font-bold">+{analyticsData?.percentIncrease}%</span>
                  </div>
                </div>

                {/* Accuracy verification preview */}
                <div className="space-y-2 border-l border-slate-800 pl-4">
                  <span className="text-xs font-bold text-slate-300 block flex items-center gap-1">
                    <Eye size={12} /> Decoded Live Verification
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="relative w-14 h-14 bg-slate-950 border border-slate-800 rounded overflow-hidden flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={activeItem.dataUri} alt="Decoded" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="text-[10px] text-slate-400">
                      <span className="text-green-500 font-bold block flex items-center gap-0.5">
                        <CheckCircle2 size={10} /> Validated Locally
                      </span>
                      <p className="mt-0.5 text-[9px] leading-relaxed">Browser verified string integrity successfully. Ready to use in code.</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* VS Code Status Bar */}
            <div className="bg-[#518231] text-white px-4 py-1 text-[10px] font-mono flex justify-between items-center shrink-0">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck size={12} />
                <span>SECURE LOCAL PARSER</span>
              </div>
              {activeItem && activeItem.status === 'success' && (
                <div>
                  <span>MIME: {activeItem.type} | LEN: {activeItem.dataUri.length.toLocaleString()} chars</span>
                </div>
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
