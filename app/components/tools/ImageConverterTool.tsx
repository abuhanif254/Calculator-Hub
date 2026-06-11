'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Upload, Image as ImageIcon, Download, Settings, Trash2, CheckCircle2, FileImage, FileArchive, X, Loader2 } from 'lucide-react';
import JSZip from 'jszip';

type ConversionStatus = 'pending' | 'converting' | 'done' | 'error';
type ImageFormat = 'image/jpeg' | 'image/png' | 'image/webp';

interface QueueItem {
  id: string;
  originalFile: File;
  targetFormat: ImageFormat;
  status: ConversionStatus;
  convertedBlob?: Blob;
  convertedUrl?: string;
  originalSize: number;
  convertedSize?: number;
  error?: string;
}

const formatLabels: Record<ImageFormat, string> = {
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
  'image/webp': 'WEBP',
};

const formatExtensions: Record<ImageFormat, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.src = url;
  });

export function ImageConverterTool() {
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [globalFormat, setGlobalFormat] = useState<ImageFormat>('image/jpeg');
  const [globalQuality, setGlobalQuality] = useState<number>(0.92);
  const [bgMode, setBgMode] = useState<'white' | 'black' | 'custom' | 'transparent'>('white');
  const [customBgColor, setCustomBgColor] = useState<string>('#ffffff');
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);
  const [isZipping, setIsZipping] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilesAdded = (files: FileList | File[]) => {
    const newItems: QueueItem[] = Array.from(files)
      .filter(file => file.type.startsWith('image/'))
      .map(file => ({
        id: Math.random().toString(36).substring(7) + Date.now(),
        originalFile: file,
        targetFormat: globalFormat,
        status: 'pending',
        originalSize: file.size,
      }));

    if (newItems.length > 0) {
      setQueue(prev => [...prev, ...newItems]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFilesAdded(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) handleFilesAdded(e.dataTransfer.files);
  }, [globalFormat]);

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      const files: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            // Rename pasted file
            const newFile = new File([file], `pasted-image-${Date.now()}.${file.type.split('/')[1]}`, { type: file.type });
            files.push(newFile);
          }
        }
      }
      if (files.length > 0) handleFilesAdded(files);
    }
  }, [globalFormat]);

  useEffect(() => {
    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [handlePaste]);

  const removeFile = (id: string) => {
    setQueue(prev => {
      const item = prev.find(i => i.id === id);
      if (item?.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
      return prev.filter(i => i.id !== id);
    });
  };

  const clearQueue = () => {
    queue.forEach(item => {
      if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
    });
    setQueue([]);
  };

  const updateItemFormat = (id: string, format: ImageFormat) => {
    setQueue(prev => prev.map(item => 
      item.id === id ? { ...item, targetFormat: format, status: 'pending', convertedBlob: undefined, convertedUrl: undefined } : item
    ));
  };

  const updateGlobalFormat = (format: ImageFormat) => {
    setGlobalFormat(format);
    setQueue(prev => prev.map(item => ({ 
      ...item, 
      targetFormat: format, 
      status: 'pending', 
      convertedBlob: undefined, 
      convertedUrl: undefined 
    })));
  };

  const processConversion = async (item: QueueItem): Promise<QueueItem> => {
    if (item.status === 'done') return item;

    try {
      const objectUrl = URL.createObjectURL(item.originalFile);
      const image = await createImage(objectUrl);
      URL.revokeObjectURL(objectUrl);

      const canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      // Handle Background Fill for formats that don't support transparency (JPG)
      if (item.targetFormat === 'image/jpeg') {
        if (bgMode === 'white') ctx.fillStyle = '#ffffff';
        else if (bgMode === 'black') ctx.fillStyle = '#000000';
        else if (bgMode === 'custom') ctx.fillStyle = customBgColor;
        else ctx.fillStyle = '#ffffff'; // Fallback to white for JPG
        
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(image, 0, 0);

      const quality = item.targetFormat === 'image/png' ? undefined : globalQuality;
      
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((b) => resolve(b), item.targetFormat, quality);
      });

      if (!blob) throw new Error('Canvas toBlob failed');

      const convertedUrl = URL.createObjectURL(blob);

      return {
        ...item,
        status: 'done',
        convertedBlob: blob,
        convertedUrl,
        convertedSize: blob.size
      };

    } catch (error: any) {
      return {
        ...item,
        status: 'error',
        error: error.message || 'Conversion failed'
      };
    }
  };

  const convertAll = async () => {
    setIsProcessingBatch(true);
    
    // Update all pending items to 'converting' state visually
    setQueue(prev => prev.map(item => item.status !== 'done' ? { ...item, status: 'converting' } : item));

    const currentQueue = [...queue];
    const updatedQueue = [...currentQueue];

    for (let i = 0; i < currentQueue.length; i++) {
      if (currentQueue[i].status !== 'done') {
        const result = await processConversion(currentQueue[i]);
        updatedQueue[i] = result;
        // Update state progressively so UI reflects progress
        setQueue([...updatedQueue]);
      }
    }

    setIsProcessingBatch(false);
  };

  const downloadItem = (item: QueueItem) => {
    if (!item.convertedUrl) return;
    const link = document.createElement('a');
    const originalName = item.originalFile.name.split('.')[0];
    link.download = `${originalName}-converted.${formatExtensions[item.targetFormat]}`;
    link.href = item.convertedUrl;
    link.click();
  };

  const downloadZip = async () => {
    const doneItems = queue.filter(item => item.status === 'done' && item.convertedBlob);
    if (doneItems.length === 0) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();
      
      doneItems.forEach((item, index) => {
        const originalName = item.originalFile.name.split('.')[0];
        // Handle potential name collisions
        const fileName = `${originalName}-${index + 1}.${formatExtensions[item.targetFormat]}`;
        zip.file(fileName, item.convertedBlob!);
      });

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = `nexus-converted-images.zip`;
      link.click();
      URL.revokeObjectURL(link.href);
    } catch (e) {
      console.error('Zipping failed', e);
      alert('Failed to create ZIP archive.');
    } finally {
      setIsZipping(false);
    }
  };

  const hasPending = queue.some(i => i.status === 'pending');
  const hasDone = queue.some(i => i.status === 'done');
  const totalOriginalSize = queue.reduce((acc, curr) => acc + curr.originalSize, 0);
  const totalConvertedSize = queue.reduce((acc, curr) => acc + (curr.convertedSize || curr.originalSize), 0);
  const totalSaved = totalOriginalSize - totalConvertedSize;

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:min-h-[800px]">
      {/* Sidebar Controls */}
      <div className="w-full lg:w-80 flex flex-col gap-4 order-2 lg:order-1 h-full">
        
        {/* Global Output Format */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
            <Settings size={16} className="text-[#518231]" /> Global Settings
          </h3>
          
          <div className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Target Format</label>
              <div className="grid grid-cols-3 gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
                {(['image/jpeg', 'image/png', 'image/webp'] as ImageFormat[]).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => updateGlobalFormat(fmt)}
                    className={`text-xs py-1.5 rounded-md font-bold transition-all ${
                      globalFormat === fmt 
                        ? 'bg-[#518231] text-white shadow-sm' 
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {formatLabels[fmt]}
                  </button>
                ))}
              </div>
            </div>

            {globalFormat !== 'image/png' && (
              <div>
                <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span className="font-medium">Quality / Compression</span>
                  <span className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 rounded">{Math.round(globalQuality * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.01"
                  value={globalQuality}
                  onChange={(e) => {
                    setGlobalQuality(Number(e.target.value));
                    // Reset done items that match this format so they can be reconverted at new quality
                    setQueue(prev => prev.map(item => 
                      item.status === 'done' && item.targetFormat !== 'image/png' ? { ...item, status: 'pending' } : item
                    ));
                  }}
                  className="w-full accent-[#518231]"
                />
              </div>
            )}

            {globalFormat === 'image/jpeg' && (
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  JPG Background Fill
                  <span className="block text-[10px] font-normal text-slate-400 mt-0.5">JPGs don't support transparency. Fill empty areas with:</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => setBgMode('white')} className={`py-1.5 text-xs font-medium rounded-lg border-2 transition-all ${bgMode === 'white' ? 'border-[#518231] bg-[#518231]/10 text-[#518231]' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}>White</button>
                  <button onClick={() => setBgMode('black')} className={`py-1.5 text-xs font-medium rounded-lg border-2 transition-all ${bgMode === 'black' ? 'border-[#518231] bg-[#518231]/10 text-[#518231]' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}>Black</button>
                  <button onClick={() => setBgMode('custom')} className={`py-1.5 text-xs font-medium rounded-lg border-2 transition-all ${bgMode === 'custom' ? 'border-[#518231] bg-[#518231]/10 text-[#518231]' : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'}`}>Custom</button>
                </div>
                {bgMode === 'custom' && (
                  <div className="mt-2 flex items-center gap-2">
                    <input 
                      type="color" 
                      value={customBgColor} 
                      onChange={(e) => setCustomBgColor(e.target.value)}
                      className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                    />
                    <span className="text-xs font-mono text-slate-500 uppercase">{customBgColor}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Batch Actions */}
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 border border-slate-200 dark:border-slate-700 mt-auto">
          {queue.length > 0 && (
            <div className="mb-4 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-500">Total Files:</span>
                <span className="font-bold text-slate-900 dark:text-white">{queue.length}</span>
              </div>
              {hasDone && (
                <>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Original Size:</span>
                    <span className="font-mono">{formatBytes(totalOriginalSize)}</span>
                  </div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">New Size:</span>
                    <span className="font-mono text-[#518231]">{formatBytes(totalConvertedSize)}</span>
                  </div>
                  {totalSaved > 0 && (
                    <div className="mt-2 text-[10px] font-bold text-[#518231] bg-[#518231]/10 px-2 py-1 rounded text-center">
                      Saved {formatBytes(totalSaved)} ({Math.round((totalSaved / totalOriginalSize) * 100)}%)
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={convertAll}
              disabled={queue.length === 0 || !hasPending || isProcessingBatch}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 disabled:opacity-50 text-white font-bold rounded-xl transition-all active:scale-[0.98]"
            >
              {isProcessingBatch ? <Loader2 size={18} className="animate-spin" /> : <Settings size={18} />}
              {isProcessingBatch ? 'Converting...' : 'Convert All Pending'}
            </button>
            
            <button
              onClick={downloadZip}
              disabled={!hasDone || isZipping}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#518231] hover:bg-[#426b27] disabled:bg-[#518231]/50 text-white font-bold rounded-xl shadow-md shadow-[#518231]/20 transition-all active:scale-[0.98]"
            >
              {isZipping ? <Loader2 size={18} className="animate-spin" /> : <FileArchive size={18} />}
              {isZipping ? 'Zipping...' : 'Download All as ZIP'}
            </button>
          </div>
        </div>

      </div>

      {/* Main Area: Dropzone & Queue */}
      <div className="flex-1 flex flex-col gap-4 order-1 lg:order-2">
        
        {/* Dropzone */}
        <div 
          className="w-full min-h-[160px] border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80 cursor-pointer p-6"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
              <Upload className="w-6 h-6 text-[#518231]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add more images</h3>
              <p className="text-sm">Drag & drop, paste, or click to browse</p>
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={onFileChange} 
            accept="image/*" 
            multiple 
            className="hidden" 
          />
        </div>

        {/* Queue List */}
        {queue.length > 0 ? (
          <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <FileImage size={18} className="text-[#518231]" /> Conversion Queue
              </h2>
              <button 
                onClick={clearQueue}
                className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 font-medium flex items-center gap-1"
              >
                <Trash2 size={14} /> Clear All
              </button>
            </div>
            
            <div className="overflow-y-auto custom-scrollbar flex-1 p-2 space-y-2">
              {queue.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-slate-200 dark:hover:border-slate-600 transition-colors">
                  
                  {/* Thumbnail & Info */}
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {item.convertedUrl ? (
                        <img src={item.convertedUrl} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={20} className="text-slate-400" />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate" title={item.originalFile.name}>
                        {item.originalFile.name}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mt-0.5">
                        <span>{formatBytes(item.originalSize)}</span>
                        {item.convertedSize && (
                          <>
                            <span>→</span>
                            <span className={item.convertedSize < item.originalSize ? "text-[#518231] font-bold" : "text-orange-500"}>
                              {formatBytes(item.convertedSize)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-3 sm:ml-auto">
                    {/* Individual Format Selector */}
                    <div className="relative">
                      <select 
                        value={item.targetFormat}
                        onChange={(e) => updateItemFormat(item.id, e.target.value as ImageFormat)}
                        disabled={item.status === 'converting'}
                        className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-300 py-1.5 pl-3 pr-8 rounded-lg cursor-pointer outline-none focus:ring-2 focus:ring-[#518231]/50 disabled:opacity-50"
                      >
                        <option value="image/jpeg">to JPG</option>
                        <option value="image/png">to PNG</option>
                        <option value="image/webp">to WEBP</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>

                    {/* Status / Action */}
                    <div className="w-24 flex justify-end">
                      {item.status === 'pending' && (
                        <button onClick={() => processConversion(item).then(res => setQueue(prev => prev.map(i => i.id === res.id ? res : i)))} className="text-xs bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 px-3 py-1.5 rounded-lg font-medium transition-colors">
                          Convert
                        </button>
                      )}
                      {item.status === 'converting' && (
                        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                          <Loader2 size={14} className="animate-spin" /> Converting
                        </span>
                      )}
                      {item.status === 'error' && (
                        <span className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded">Error</span>
                      )}
                      {item.status === 'done' && (
                        <button onClick={() => downloadItem(item)} className="flex items-center gap-1.5 text-xs bg-[#518231]/10 hover:bg-[#518231]/20 text-[#518231] px-3 py-1.5 rounded-lg font-bold transition-colors">
                          <CheckCircle2 size={14} /> Download
                        </button>
                      )}
                    </div>

                    {/* Remove */}
                    <button onClick={() => removeFile(item.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                      <X size={16} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 bg-white/50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400">
            <FileImage size={48} className="mb-4 opacity-20" />
            <p>Your conversion queue is empty.</p>
          </div>
        )}
      </div>
    </div>
  );
}
