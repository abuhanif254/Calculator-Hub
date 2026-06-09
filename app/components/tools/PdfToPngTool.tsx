
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { UploadCloud, File, Trash2, Settings, Download, Activity, Image as ImageIcon, Loader, Archive, Monitor } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';

if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

interface PdfFile {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'done' | 'error';
  progress: number;
  message?: string;
  pngUrls?: string[];
  zipUrl?: string;
  numPages?: number;
}

export function PdfToPngTool() {
  const t = useTranslations('Tools');
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Settings
  const [scaleFactor, setScaleFactor] = useState<number>(2); // 1, 2, 3, 4
  const [pageRange, setPageRange] = useState<string>(''); // e.g., '1-5, 8'
  const [transparentBg, setTransparentBg] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE_MB = 100;

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      if (file.type !== 'application/pdf') {
        alert(`File ${file.name} is not a PDF.`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`File ${file.name} exceeds the ${MAX_FILE_SIZE_MB}MB limit.`);
        return false;
      }
      return true;
    });

    const newPdfFiles: PdfFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      status: 'pending',
      progress: 0
    }));

    setFiles(prev => [...prev, ...newPdfFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const f = prev.find(x => x.id === id);
      if (f?.pngUrls) f.pngUrls.forEach(url => URL.revokeObjectURL(url));
      if (f?.zipUrl) URL.revokeObjectURL(f.zipUrl);
      return prev.filter(x => x.id !== id);
    });
  };

  const updateFileStatus = (id: string, updates: Partial<PdfFile>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const parsePageRange = (rangeStr: string, maxPages: number): number[] => {
    if (!rangeStr.trim()) {
      return Array.from({ length: maxPages }, (_, i) => i + 1);
    }
    const pages = new Set<number>();
    const parts = rangeStr.split(',');
    for (const part of parts) {
      const p = part.trim();
      if (p.includes('-')) {
        const [start, end] = p.split('-').map(n => parseInt(n.trim(), 10));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.max(1, start); i <= Math.min(maxPages, end); i++) {
            pages.add(i);
          }
        }
      } else {
        const n = parseInt(p, 10);
        if (!isNaN(n) && n >= 1 && n <= maxPages) {
          pages.add(n);
        }
      }
    }
    return Array.from(pages).sort((a, b) => a - b);
  };

  const renderPdfToPng = async (fileObj: PdfFile) => {
    updateFileStatus(fileObj.id, { status: 'processing', progress: 10, message: 'Loading PDF Engine...' });
    
    try {
      const arrayBuffer = await fileObj.file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      updateFileStatus(fileObj.id, { numPages: totalPages });
      
      const pagesToRender = parsePageRange(pageRange, totalPages);
      if (pagesToRender.length === 0) {
        throw new Error('No valid pages selected to render.');
      }

      const generatedUrls: string[] = [];
      const zip = new JSZip();

      for (let i = 0; i < pagesToRender.length; i++) {
        const pageNum = pagesToRender[i];
        updateFileStatus(fileObj.id, { 
          progress: 10 + Math.round(((i) / pagesToRender.length) * 80), 
          message: `Rendering page ${pageNum} of ${totalPages}...` 
        });

        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: scaleFactor });
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error("Could not acquire 2D context");
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        if (!transparentBg) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        await page.render({
          canvasContext: ctx,
          viewport: viewport,
          background: transparentBg ? 'rgba(0,0,0,0)' : 'white'
        }).promise;

        const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
        if (blob) {
          const url = URL.createObjectURL(blob);
          generatedUrls.push(url);
          const fileName = `${fileObj.file.name.replace(/\.pdf$/i, '')}_page_${pageNum}.png`;
          zip.file(fileName, blob);
        }
      }

      updateFileStatus(fileObj.id, { progress: 95, message: 'Packaging ZIP archive...' });
      
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const zipUrl = URL.createObjectURL(zipBlob);

      updateFileStatus(fileObj.id, { 
        status: 'done', 
        progress: 100, 
        message: 'Conversion complete!', 
        pngUrls: generatedUrls,
        zipUrl
      });
      
    } catch (err: any) {
      console.warn('PDF to PNG Error:', err.message);
      let errorMsg = err.message || 'An error occurred during conversion.';
      if (err.name === 'PasswordException' || errorMsg.toLowerCase().includes('password')) {
         errorMsg = 'This PDF is password protected. Please unlock it first.';
      }
      updateFileStatus(fileObj.id, { status: 'error', message: errorMsg });
    }
  };

  const processAll = async () => {
    setIsProcessing(true);
    for (const file of files.filter(f => f.status === 'pending' || f.status === 'error')) {
      await renderPdfToPng(file);
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">
          PDF to PNG Converter
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Convert PDF pages into high-resolution, lossless PNG images. Support for Ultra HD scaling and transparent backgrounds directly inside your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Main Interface Area */}
        <div className="xl:col-span-3 space-y-6">
          
          {/* Dropzone */}
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 
              ${isDragging ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-emerald-400'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple
              accept="application/pdf"
              onChange={(e) => {
                if (e.target.files) addFiles(Array.from(e.target.files));
                e.target.value = '';
              }}
            />
            <UploadCloud className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-medium mb-2">Drag & Drop PDFs here</p>
            <p className="text-sm text-gray-500 mb-6">Up to 100MB per file. 100% private client-side processing.</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              Select Documents
            </button>
          </div>

          {/* File Operations */}
          {files.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                <h3 className="font-medium flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-emerald-500" />
                  Conversion Queue ({files.length})
                </h3>
              </div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {files.map((file) => (
                  <li key={file.id} className="flex flex-col border-b border-gray-100 dark:border-gray-800 last:border-0">
                    {/* Status Bar */}
                    <div className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <div className="flex items-center gap-3 overflow-hidden w-full max-w-[50%]">
                        <File className="w-8 h-8 text-red-500 flex-shrink-0" />
                        <div className="truncate">
                          <p className="font-medium text-sm truncate" title={file.file.name}>{file.file.name}</p>
                          <p className="text-xs text-gray-500 flex gap-3">
                            <span>{(file.file.size / 1024 / 1024).toFixed(2)} MB</span>
                            {file.status === 'done' && file.pngUrls && (
                              <span className="text-emerald-600 dark:text-emerald-400">
                                {file.pngUrls.length} Images Extracted
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                        {file.status === 'done' && file.zipUrl ? (
                          <div className="flex gap-2">
                            <a
                              href={file.zipUrl}
                              download={`${file.file.name.replace(/\.pdf$/i, '')}_pngs.zip`}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium border border-emerald-200 dark:border-emerald-800"
                            >
                              <Archive className="w-4 h-4" /> Download ZIP
                            </a>
                          </div>
                        ) : file.status === 'processing' ? (
                          <Loader className="w-5 h-5 animate-spin text-emerald-500" />
                        ) : (
                          <button
                            onClick={() => removeFile(file.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                            disabled={isProcessing}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {/* Progress Indicator */}
                    {(file.status === 'processing' || file.status === 'done' || file.status === 'error') && !file.pngUrls && (
                      <div className="px-4 pb-4 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className={
                            file.status === 'error' ? 'text-red-500' : 
                            file.status === 'done' ? 'text-emerald-500' : 
                            'text-emerald-500'
                          }>
                            {file.message}
                          </span>
                          <span className="text-gray-500">{file.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              file.status === 'error' ? 'bg-red-500' : 
                              'bg-emerald-500'
                            }`}
                            style={{ width: `${file.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Image Preview Gallery */}
                    {file.status === 'done' && file.pngUrls && file.pngUrls.length > 0 && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex flex-wrap gap-4">
                           {file.pngUrls.map((url, idx) => (
                             <div key={idx} className="relative group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
                               <img src={url} alt={`Page ${idx+1}`} className="w-32 h-32 object-contain" />
                               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                 <a 
                                   href={url} 
                                   download={`${file.file.name.replace(/\.pdf$/i, '')}_page_${idx+1}.png`}
                                   className="p-2 bg-white text-gray-900 rounded-md text-xs font-bold hover:bg-emerald-400 hover:text-white transition-colors"
                                 >
                                   Download
                                 </a>
                               </div>
                               <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-[10px] p-1 text-center font-mono">
                                  Page {idx+1}
                               </div>
                             </div>
                           ))}
                        </div>
                      </div>
                    )}

                  </li>
                ))}
              </ul>
              {files.some(f => f.status === 'pending' || f.status === 'error') && (
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 text-right">
                  <button
                    onClick={processAll}
                    disabled={isProcessing}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-auto"
                  >
                    {isProcessing ? (
                      <><Loader className="w-4 h-4 animate-spin" /> Rendering...</>
                    ) : (
                      <><Activity className="w-4 h-4" /> Start Conversion</>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Configuration Panel */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
              <Settings className="w-5 h-5 text-emerald-500" />
              Export Settings
            </h3>
            
            <div className="space-y-5">
              
              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                   Render Scale (Resolution)
                 </label>
                 <select
                    value={scaleFactor}
                    onChange={(e) => setScaleFactor(Number(e.target.value))}
                    disabled={isProcessing}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                 >
                    <option value={1}>Standard (72 DPI) - 1x</option>
                    <option value={2}>High (144 DPI) - 2x</option>
                    <option value={3}>Very High (216 DPI) - 3x</option>
                    <option value={4}>Ultra HD (288 DPI) - 4x</option>
                 </select>
                 <p className="text-xs text-gray-500 mt-1">Higher scales produce sharper PNGs but take longer to process.</p>
              </div>

              <div>
                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                   Pages to Extract
                 </label>
                 <input
                    type="text"
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    disabled={isProcessing}
                    placeholder="e.g. 1-5, 8, 11-13"
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none font-mono"
                 />
                 <p className="text-xs text-gray-500 mt-1">Leave blank to extract all pages.</p>
              </div>

              <label className="flex items-start gap-3 pt-2">
                 <input 
                    type="checkbox" 
                    checked={transparentBg}
                    onChange={(e) => setTransparentBg(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300"
                    disabled={isProcessing}
                 />
                 <div>
                    <span className="text-sm font-medium block">Transparent Background</span>
                    <span className="text-xs text-gray-500">Forces the canvas to use alpha transparency instead of a solid white fill.</span>
                 </div>
              </label>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 flex items-center gap-1"><Monitor className="w-3 h-3"/> Hardware Accelerated</p>
                <p className="text-xs text-gray-400 mt-1">Rasterization operates locally via HTML5 Canvas using your device GPU and CPU.</p>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
