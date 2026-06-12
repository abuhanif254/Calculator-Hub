"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, Trash2, Download, RefreshCw, Sliders, Eye, EyeOff, 
  CheckCircle2, AlertCircle, Loader2, Sparkles, Plus, X, 
  ShieldCheck, Info, FileImage, FileDown, Check, Play, Settings,
  Lock
} from "lucide-react";
import exifr from 'exifr';
import piexif from 'piexifjs';
import JSZip from 'jszip';

interface ConversionQueueItem {
  id: string;
  file: File;
  name: string;
  size: number;
  status: 'idle' | 'converting' | 'success' | 'error';
  progress: number;
  originalUrl: string | null;
  convertedUrl: string | null;
  convertedSize: number | null;
  width?: number;
  height?: number;
  errorMsg?: string;
}

export function HeicToJpgTool() {
  const [queue, setQueue] = useState<ConversionQueueItem[]>([]);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  // Settings
  const [quality, setQuality] = useState<number>(90); // 1-100
  const [preserveMetadata, setPreserveMetadata] = useState<boolean>(true);
  const [exportFormat, setExportFormat] = useState<'image/jpeg' | 'image/jpg'>('image/jpeg');

  // UI state
  const [isProcessingAll, setIsProcessingAll] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  // Process selected files
  const handleFiles = (files: FileList | File[]) => {
    const newList: ConversionQueueItem[] = [];
    setErrorMsg(null);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
      
      if (ext !== '.heic' && ext !== '.heif') {
        setErrorMsg("Only HEIC or HEIF files are supported for conversion.");
        continue;
      }

      if (file.size > 50 * 1024 * 1024) {
        setErrorMsg("Files larger than 50MB may cause browser tab crashes.");
      }

      const id = `heic-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      newList.push({
        id,
        file,
        name: file.name,
        size: file.size,
        status: 'idle',
        progress: 0,
        originalUrl: null, // Browsers can't display raw HEIC usually
        convertedUrl: null,
        convertedSize: null
      });
    }

    if (newList.length > 0) {
      setQueue(prev => [...prev, ...newList]);
      if (!activeItemId) {
        setActiveItemId(newList[0].id);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  // Remove single item from queue
  const removeQueueItem = (id: string) => {
    setQueue(prev => {
      const target = prev.find(item => item.id === id);
      if (target) {
        if (target.originalUrl) URL.revokeObjectURL(target.originalUrl);
        if (target.convertedUrl) URL.revokeObjectURL(target.convertedUrl);
      }
      const filtered = prev.filter(item => item.id !== id);
      return filtered;
    });

    if (activeItemId === id) {
      setQueue(prev => {
        const remaining = prev.filter(item => item.id !== id);
        setActiveItemId(remaining.length > 0 ? remaining[0].id : null);
        return prev;
      });
    }
  };

  const clearQueue = () => {
    queue.forEach(item => {
      if (item.originalUrl) URL.revokeObjectURL(item.originalUrl);
      if (item.convertedUrl) URL.revokeObjectURL(item.convertedUrl);
    });
    setQueue([]);
    setActiveItemId(null);
    setShowPreview(false);
  };

  // Rational degree conversions for EXIF GPS coordinates mapping
  const convertToDegreeMinSec = (val: number) => {
    const absolute = Math.abs(val);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = Math.round((minutesNotTruncated - minutes) * 60 * 100);
    return [[degrees, 1], [minutes, 1], [seconds, 100]];
  };

  // Parse and preserve metadata helper
  const copyMetadataToJpeg = async (heicFile: File, jpegDataUrl: string): Promise<string> => {
    try {
      const meta = await exifr.parse(heicFile).catch(() => null);
      const gps: any = await exifr.gps(heicFile).catch(() => null);
      
      if (!meta && !gps) return jpegDataUrl;
      
      const zeroth: any = {};
      const exif: any = {};
      const gpsData: any = {};
      
      if (meta) {
        if (meta.Make) zeroth[piexif.ImageIFD.Make] = meta.Make;
        if (meta.Model) zeroth[piexif.ImageIFD.Model] = meta.Model;
        if (meta.Software) zeroth[piexif.ImageIFD.Software] = meta.Software;
        if (meta.Orientation) zeroth[piexif.ImageIFD.Orientation] = meta.Orientation;
        if (meta.DateTime) zeroth[piexif.ImageIFD.DateTime] = meta.DateTime;
        
        if (meta.DateTimeOriginal) exif[piexif.ExifIFD.DateTimeOriginal] = meta.DateTimeOriginal;
        if (meta.CreateDate) exif[piexif.ExifIFD.DateTimeDigitized] = meta.CreateDate;
        if (meta.ExposureTime) exif[piexif.ExifIFD.ExposureTime] = [Math.round(meta.ExposureTime * 1000), 1000];
        if (meta.FNumber) exif[piexif.ExifIFD.FNumber] = [Math.round(meta.FNumber * 10), 10];
        if (meta.ISO) exif[piexif.ExifIFD.ISOSpeedRatings] = meta.ISO;
        if (meta.FocalLength) exif[piexif.ExifIFD.FocalLength] = [Math.round(meta.FocalLength * 10), 10];
      }
      
      if (gps) {
        if (gps.latitude !== undefined) {
          gpsData[piexif.GPSIFD.GPSLatitudeRef] = gps.latitude >= 0 ? 'N' : 'S';
          gpsData[piexif.GPSIFD.GPSLatitude] = convertToDegreeMinSec(gps.latitude);
        }
        if (gps.longitude !== undefined) {
          gpsData[piexif.GPSIFD.GPSLongitudeRef] = gps.longitude >= 0 ? 'E' : 'W';
          gpsData[piexif.GPSIFD.GPSLongitude] = convertToDegreeMinSec(gps.longitude);
        }
        if (gps.altitude !== undefined) {
          gpsData[piexif.GPSIFD.GPSAltitudeRef] = gps.altitude >= 0 ? 0 : 1;
          gpsData[piexif.GPSIFD.GPSAltitude] = [Math.round(Math.abs(gps.altitude) * 100), 100];
        }
      }
      
      const exifObj = { "0th": zeroth, "Exif": exif, "GPS": gpsData };
      const exifBytes = piexif.dump(exifObj);
      return piexif.insert(exifBytes, jpegDataUrl);
    } catch (err) {
      console.error("EXIF parsing/injection failed:", err);
      return jpegDataUrl;
    }
  };

  // Convert a single HEIC item
  const processSingleItem = async (item: ConversionQueueItem): Promise<boolean> => {
    if (item.status === 'success') return true;

    setQueue(prev => prev.map(q => q.id === item.id ? { ...q, status: 'converting', progress: 20 } : q));

    try {
      // Lazy load heic2any for SSR compatibility
      const heic2any = (await import('heic2any')).default;
      
      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, progress: 40 } : q));

      // Decode and convert HEIC to JPG
      const conversionResult = await heic2any({
        blob: item.file,
        toType: 'image/jpeg',
        quality: quality / 100
      });

      setQueue(prev => prev.map(q => q.id === item.id ? { ...q, progress: 70 } : q));

      const outputBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
      
      // Load dimensions & original preview URL (as fallback using output JPG)
      const outputUrl = URL.createObjectURL(outputBlob);
      
      let finalUrl = outputUrl;
      let finalBlob = outputBlob;

      // EXIF metadata preservation
      if (preserveMetadata) {
        const reader = new FileReader();
        const rawDataUrl = await new Promise<string>((resolve, reject) => {
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(outputBlob);
        });

        const metadataDataUrl = await copyMetadataToJpeg(item.file, rawDataUrl);
        
        // Convert back to blob to compute actual size
        const response = await fetch(metadataDataUrl);
        finalBlob = await response.blob();
        finalUrl = URL.createObjectURL(finalBlob);
        URL.revokeObjectURL(outputUrl); // clean temp
      }

      // Fetch dimensions
      const dimensions = await new Promise<{w: number, h: number}>((resolve) => {
        const tempImg = new Image();
        tempImg.onload = () => resolve({ w: tempImg.naturalWidth, h: tempImg.naturalHeight });
        tempImg.onerror = () => resolve({ w: 0, h: 0 });
        tempImg.src = finalUrl;
      });

      setQueue(prev => prev.map(q => q.id === item.id ? {
        ...q,
        status: 'success',
        progress: 100,
        convertedUrl: finalUrl,
        convertedSize: finalBlob.size,
        width: dimensions.w,
        height: dimensions.h,
        originalUrl: finalUrl // Browser fallback: show converted image as original preview
      } : q));

      return true;

    } catch (err: any) {
      console.error("HEIC Conversion error:", err);
      const msg = err.message || "Failed to decode HEIC container.";
      setQueue(prev => prev.map(q => q.id === item.id ? {
        ...q,
        status: 'error',
        progress: 0,
        errorMsg: msg
      } : q));
      return false;
    }
  };

  // Run sequential conversion on all items
  const processBatchQueue = async () => {
    if (queue.length === 0) return;
    setIsProcessingAll(true);
    setStatusMsg("Converting batch files queue...");

    let successCount = 0;
    for (const item of queue) {
      if (item.status !== 'success') {
        const success = await processSingleItem(item);
        if (success) successCount++;
      } else {
        successCount++;
      }
    }

    setIsProcessingAll(false);
    setStatusMsg(null);
    if (successCount === queue.length) {
      setShowPreview(true);
    }
  };

  // Download single JPEG file
  const downloadSingleFile = (item: ConversionQueueItem) => {
    if (!item.convertedUrl) return;
    
    const ext = exportFormat === 'image/jpeg' ? 'jpeg' : 'jpg';
    const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;

    const a = document.createElement('a');
    a.href = item.convertedUrl;
    a.download = `${baseName}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download ZIP archive
  const downloadZip = async () => {
    const successItems = queue.filter(item => item.status === 'success' && item.convertedUrl);
    if (successItems.length === 0) return;

    setStatusMsg("Compiling ZIP archive...");
    const zip = new JSZip();

    for (let i = 0; i < successItems.length; i++) {
      const item = successItems[i];
      const response = await fetch(item.convertedUrl!);
      const blob = await response.blob();
      
      const ext = exportFormat === 'image/jpeg' ? 'jpeg' : 'jpg';
      const baseName = item.name.substring(0, item.name.lastIndexOf('.')) || item.name;
      
      zip.file(`${baseName}.${ext}`, blob);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const zipUrl = URL.createObjectURL(zipBlob);

    const a = document.createElement('a');
    a.href = zipUrl;
    a.download = `converted-photos-${Date.now()}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(zipUrl);
    
    setStatusMsg(null);
  };

  const activeItem = queue.find(item => item.id === activeItemId) || null;

  // Format File Size
  const formatSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="max-w-[1300px] mx-auto space-y-6">
      {/* Privacy Notice Banner */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">100% Offline Privacy</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              All HEIC files are converted locally in your browser cache. No photos leave your computer.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs font-semibold text-[#518231]">
          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Client-Side</span>
          <span className="flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> No Uploads</span>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded-r-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-sm font-bold text-red-900 dark:text-red-300">File Error</h5>
            <p className="text-xs text-red-700 dark:text-red-400 mt-1">{errorMsg}</p>
          </div>
          <button onClick={() => setErrorMsg(null)} className="ml-auto text-red-400 hover:text-red-600">
            <X size={16} />
          </button>
        </div>
      )}

      {statusMsg && (
        <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded-r-xl flex items-center gap-3 animate-pulse">
          <Loader2 className="w-5 h-5 text-blue-500 animate-spin shrink-0" />
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">{statusMsg}</p>
        </div>
      )}

      {!activeItem ? (
        // File Upload Drag Box
        <div className="w-full">
          <label 
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-2xl cursor-pointer bg-white dark:bg-slate-900 transition-colors group ${dragActive ? 'border-[#518231] bg-slate-50 dark:bg-slate-800/20' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-850'}`}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
              <div className="w-20 h-20 mb-4 rounded-2xl bg-[#518231]/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-10 h-10 text-[#518231]" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                Drag & Drop HEIC/HEIF files
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                or click to browse photos from Apple devices
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Supports batch conversions for iPhone live images & bursts
              </p>
            </div>
            <input ref={fileInputRef} type="file" className="hidden" accept=".heic,.heif" multiple onChange={handleFileChange} />
          </label>
        </div>
      ) : (
        // Conversion Workspace Dashboard
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-slate-100 dark:bg-slate-950 p-3 sm:p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          
          {/* Left Panel: Conversion Settings and File Queue */}
          <div className="lg:col-span-2 space-y-4 flex flex-col h-full">
            
            {/* Settings Card */}
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Settings size={14} className="text-[#518231]" /> Output Settings
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Quality Slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">JPEG Quality</label>
                    <span className="text-xs font-bold text-[#518231]">{quality}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full accent-[#518231] h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Smaller Size</span>
                    <span>Max Quality</span>
                  </div>
                </div>

                {/* Metadata & Format Options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">EXIF Metadata</span>
                    <button 
                      onClick={() => setPreserveMetadata(prev => !prev)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border font-bold transition-all ${preserveMetadata ? 'bg-[#518231]/10 border-[#518231] text-[#518231]' : 'border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-slate-800'}`}
                    >
                      {preserveMetadata ? 'Preserve (GPS + Date)' : 'Strip Metadata'}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Extension</span>
                    <select 
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value as any)}
                      className="bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs rounded-lg p-1.5 font-bold text-slate-700 dark:text-slate-300"
                    >
                      <option value="image/jpeg">.jpeg</option>
                      <option value="image/jpg">.jpg</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Batch Conversion File Queue List */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex-1 flex flex-col space-y-3 min-h-[350px] shadow-sm">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-400 uppercase tracking-wider">Conversion Queue ({queue.length})</h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1"
                  >
                    <Plus size={12} /> Add Files
                  </button>
                  <button onClick={clearQueue} className="text-xs font-bold text-red-500 hover:text-red-700">Clear All</button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 max-h-[400px] scrollbar-thin scrollbar-thumb-slate-350 pr-1">
                {queue.map(item => (
                  <div 
                    key={item.id}
                    onClick={() => setActiveItemId(item.id)}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border cursor-pointer transition-all gap-2 ${item.id === activeItemId ? 'border-[#518231] bg-[#518231]/5 shadow-sm' : 'border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/40 hover:border-slate-300'}`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <FileImage className="w-5 h-5 text-slate-400 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate max-w-[180px] sm:max-w-[220px]">{item.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 flex gap-2">
                          <span>Original: {formatSize(item.size)}</span>
                          {item.convertedSize && <span className="font-bold text-[#518231]">JPG: {formatSize(item.convertedSize)}</span>}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                      {/* Status indicator */}
                      <div className="w-24 text-right">
                        {item.status === 'idle' && (
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">Pending</span>
                        )}
                        {item.status === 'converting' && (
                          <div className="flex items-center gap-1.5 justify-end">
                            <Loader2 size={10} className="animate-spin text-blue-500" />
                            <span className="text-[10px] font-bold text-blue-500">{item.progress}%</span>
                          </div>
                        )}
                        {item.status === 'success' && (
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-1 rounded flex items-center gap-1 justify-end"><Check size={10} /> Converted</span>
                        )}
                        {item.status === 'error' && (
                          <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-950/20 px-2 py-1 rounded flex items-center gap-1 justify-end" title={item.errorMsg}><AlertCircle size={10} /> Error</span>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {item.status === 'success' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); downloadSingleFile(item); }}
                            className="p-1 rounded bg-[#518231]/10 text-[#518231] hover:bg-[#518231] hover:text-white transition-colors"
                            title="Download JPEG"
                          >
                            <Download size={14} />
                          </button>
                        )}
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeQueueItem(item.id); }}
                          className="p-1 text-slate-400 hover:text-red-500 rounded"
                          title="Remove item"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <button
                  onClick={processBatchQueue}
                  disabled={isProcessingAll || queue.every(q => q.status === 'success')}
                  className="w-full py-3 bg-[#518231] hover:bg-[#518231]/90 text-white font-bold text-xs rounded-xl disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-md shadow-[#518231]/10"
                >
                  {isProcessingAll ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      Converting Queue...
                    </>
                  ) : (
                    <>
                      <Play size={14} />
                      Convert HEIC Files
                    </>
                  )}
                </button>
                
                {queue.some(q => q.status === 'success') && (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={downloadZip}
                      className="py-2.5 bg-slate-900 hover:bg-slate-850 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white font-bold text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <FileDown size={13} />
                      Download ZIP
                    </button>
                    <button
                      onClick={() => queue.filter(q => q.status === 'success').forEach(q => downloadSingleFile(q))}
                      className="py-2.5 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-lg flex items-center justify-center gap-1.5"
                    >
                      <Download size={13} />
                      Save All files
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Right Panel: Side-by-Side Live Preview & File Info */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex flex-col gap-6 shadow-sm">
            
            {/* Selected File Details */}
            {activeItem ? (
              <div className="space-y-4 flex flex-col h-full">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2">Selected File</h4>
                  <div className="bg-slate-50 dark:bg-slate-800/40 p-3 rounded-lg border border-slate-200/50 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                    <div className="flex justify-between">
                      <span>File Name:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200 truncate max-w-[140px]">{activeItem.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Original Format:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">HEIC container</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Original Size:</span>
                      <span className="font-bold text-slate-700 dark:text-slate-200">{formatSize(activeItem.size)}</span>
                    </div>
                    {activeItem.convertedSize && (
                      <>
                        <div className="flex justify-between">
                          <span>Output Format:</span>
                          <span className="font-bold text-[#518231]">{exportFormat.split('/')[1].toUpperCase()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Resolution:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">{activeItem.width} × {activeItem.height}px</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Output Size:</span>
                          <span className="font-bold text-[#518231]">{formatSize(activeItem.convertedSize)}</span>
                        </div>
                        <div className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-1.5 mt-1 text-[10px]">
                          <span>Compression Ratio:</span>
                          <span className="font-bold text-slate-700 dark:text-slate-200">
                            {Math.round((activeItem.convertedSize / activeItem.size) * 100)}% of original size
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Conversion Preview Component */}
                <div className="flex-1 flex flex-col space-y-3 min-h-[220px]">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Live Preview</h4>
                  
                  {activeItem.status === 'success' && activeItem.convertedUrl ? (
                    <div className="flex-1 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 flex flex-col relative group">
                      <img 
                        src={activeItem.convertedUrl} 
                        className="w-full h-full object-contain bg-workspace-checker" 
                        alt="Preview" 
                      />
                      <div className="absolute bottom-2 left-2 bg-slate-900/80 text-white text-[9px] font-bold px-2 py-0.5 rounded backdrop-blur-sm">
                        Converted JPG ({activeItem.width} × {activeItem.height})
                      </div>
                      
                      {/* Floating save button */}
                      <button
                        onClick={() => downloadSingleFile(activeItem)}
                        className="absolute top-2 right-2 bg-[#518231] hover:bg-[#518231]/90 text-white p-2 rounded-full shadow-lg transition-transform hover:scale-105"
                        title="Download file"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex-1 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center p-4">
                      {activeItem.status === 'converting' ? (
                        <>
                          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
                          <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">Decoding iPhone HEIC container...</p>
                        </>
                      ) : (
                        <>
                          <FileImage className="w-8 h-8 text-slate-400 mb-2" />
                          <p className="text-xs text-slate-500 dark:text-slate-400">Click Convert to view decoded image rendering.</p>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Apple device guide info block */}
                <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-3 rounded-r-lg text-[10px] text-amber-800 dark:text-amber-300 space-y-1">
                  <h5 className="font-bold flex items-center gap-1"><Info size={12} /> iPhone Shooting Tips</h5>
                  <p>To capture standard JPGs natively on iOS, set <strong>Settings &gt; Camera &gt; Formats</strong> to <strong>'Most Compatible'</strong>.</p>
                </div>

              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-400 py-10">
                <FileImage className="w-12 h-12 mb-3 text-slate-300" />
                <p className="text-xs font-semibold">Upload HEIC images to display file metrics and visual parameters.</p>
              </div>
            )}

          </div>

        </div>
      )}
      
      <input ref={fileInputRef} type="file" className="hidden" accept=".heic,.heif" multiple onChange={handleFileChange} />
    </div>
  );
}
