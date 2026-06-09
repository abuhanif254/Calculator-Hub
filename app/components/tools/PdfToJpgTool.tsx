
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { UploadCloud, File, Trash2, Settings, Download, Activity, FileText, Loader, Image as ImageIcon, Settings2, FileArchive } from 'lucide-react';
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
  blobUrl?: string;
  pageCount?: number;
  isZip?: boolean;
}

export function PdfToJpgTool() {
  const t = useTranslations('Tools');
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Settings
  const [exportFormat, setExportFormat] = useState<'image/jpeg' | 'image/png' | 'image/webp'>('image/jpeg');
  const [imageScale, setImageScale] = useState<number>(2.0); // 1.0 (Standard), 2.0 (High), 4.0 (Ultra)
  const [pageRange, setPageRange] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE_MB = 50;
  const MAX_PAGES = 500;

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
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const updateFileStatus = (id: string, updates: Partial<PdfFile>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const parsePageRange = (rangeStr: string, maxPage: number): Set<number> => {
    const pages = new Set<number>();
    if (!rangeStr.trim()) {
      for (let i = 1; i <= maxPage; i++) pages.add(i);
      return pages;
    }

    const parts = rangeStr.split(',');
    for (const part of parts) {
      const p = part.trim();
      if (p.includes('-')) {
        const [start, end] = p.split('-').map(n => parseInt(n, 10));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.max(1, start); i <= Math.min(maxPage, end); i++) {
            pages.add(i);
          }
        }
      } else {
        const num = parseInt(p, 10);
        if (!isNaN(num) && num >= 1 && num <= maxPage) {
          pages.add(num);
        }
      }
    }
    return pages;
  };

  const renderPageToBlob = async (page: any, scale: number, format: string): Promise<Blob> => {
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Canvas context creation failed");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Fill white background for JPEG, transparent for PNG/WebP unless PDF has bg
    if (format === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    await page.render({ canvasContext: ctx, viewport }).promise;
    
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Blob conversion failed"));
      }, format, 0.95);
    });
  };

  const convertFile = async (fileObj: PdfFile) => {
    updateFileStatus(fileObj.id, { status: 'processing', progress: 0, message: 'Initializing PDF parser...' });
    
    try {
      const arrayBuffer = await fileObj.file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      const totalPages = pdf.numPages;
      if (totalPages > MAX_PAGES) {
         throw new Error(`PDF has ${totalPages} pages, exceeding the safety limit of ${MAX_PAGES}.`);
      }

      updateFileStatus(fileObj.id, { pageCount: totalPages });
      
      const pagesToProcess = parsePageRange(pageRange, totalPages);
      if (pagesToProcess.size === 0) {
        throw new Error('No valid pages selected in page range.');
      }

      const pageArray = Array.from(pagesToProcess).sort((a, b) => a - b);
      let completed = 0;
      
      const ext = exportFormat === 'image/jpeg' ? 'jpg' : exportFormat === 'image/webp' ? 'webp' : 'png';
      const baseName = fileObj.file.name.replace(/\.pdf$/i, '');

      if (pageArray.length === 1) {
        // Single page export
        const pageNum = pageArray[0];
        updateFileStatus(fileObj.id, { message: `Rendering page ${pageNum}...`, progress: 50 });
        const page = await pdf.getPage(pageNum);
        const blob = await renderPageToBlob(page, imageScale, exportFormat);
        const blobUrl = URL.createObjectURL(blob);
        updateFileStatus(fileObj.id, { status: 'done', progress: 100, message: 'Conversion complete!', blobUrl, isZip: false });
      } else {
        // Multi-page export to ZIP
        const zip = new JSZip();
        const imgFolder = zip.folder(`${baseName}_images`);
        if (!imgFolder) throw new Error("Failed to create ZIP folder");

        for (const pageNum of pageArray) {
          updateFileStatus(fileObj.id, { 
            message: `Rendering page ${pageNum} of ${totalPages}...`,
            progress: Math.round((completed / pageArray.length) * 90)
          });
          const page = await pdf.getPage(pageNum);
          const blob = await renderPageToBlob(page, imageScale, exportFormat);
          imgFolder.file(`${baseName}_page_${pageNum}.${ext}`, blob);
          completed++;
        }

        updateFileStatus(fileObj.id, { message: 'Compressing into ZIP archive...', progress: 95 });
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        const blobUrl = URL.createObjectURL(zipBlob);
        updateFileStatus(fileObj.id, { status: 'done', progress: 100, message: 'ZIP archive ready!', blobUrl, isZip: true });
      }
      
    } catch (err: any) {
      console.error(err.message);
      updateFileStatus(fileObj.id, { status: 'error', message: err.message || 'An error occurred during conversion.' });
    }
  };

  const processAll = async () => {
    setIsProcessing(true);
    for (const file of files.filter(f => f.status === 'pending' || f.status === 'error')) {
      await convertFile(file);
    }
    setIsProcessing(false);
  };

  const getExt = () => exportFormat === 'image/jpeg' ? 'jpg' : exportFormat === 'image/webp' ? 'webp' : 'png';

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
          PDF to Image Converter
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Extract high-resolution JPG, PNG, or WebP images from PDF files instantly inside your browser. 100% secure and private.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Processing Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Dropzone */}
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 
              ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-blue-400'}`}
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
            <p className="text-sm text-gray-500 mb-6">Up to 50MB and 500 pages per file. Processing is 100% local.</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              Browse Files
            </button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                <h3 className="font-medium flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  Conversion Queue ({files.length})
                </h3>
              </div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {files.map((file) => (
                  <li key={file.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <File className="w-8 h-8 text-red-500 flex-shrink-0" />
                        <div className="truncate">
                          <p className="font-medium text-sm truncate" title={file.file.name}>{file.file.name}</p>
                          <p className="text-xs text-gray-500 flex gap-3">
                            <span>{(file.file.size / 1024 / 1024).toFixed(2)} MB</span>
                            {file.pageCount && <span>{file.pageCount} Pages</span>}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                        {file.status === 'done' && file.blobUrl ? (
                          <a
                            href={file.blobUrl}
                            download={`${file.file.name.replace(/\.pdf$/i, '')}${file.isZip ? '.zip' : '.' + getExt()}`}
                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
                          >
                            <Download className="w-4 h-4" /> {file.isZip ? 'ZIP' : getExt().toUpperCase()}
                          </a>
                        ) : file.status === 'processing' ? (
                          <Loader className="w-5 h-5 animate-spin text-blue-500" />
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
                    
                    {/* Status & Progress Bar */}
                    {(file.status === 'processing' || file.status === 'done' || file.status === 'error') && (
                      <div className="mt-2 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className={
                            file.status === 'error' ? 'text-red-500' : 
                            file.status === 'done' ? 'text-green-500' : 
                            'text-blue-500'
                          }>
                            {file.message}
                          </span>
                          <span className="text-gray-500">{file.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              file.status === 'error' ? 'bg-red-500' : 
                              file.status === 'done' ? 'bg-green-500' : 
                              'bg-blue-500'
                            }`}
                            style={{ width: `${file.progress}%` }}
                          ></div>
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
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-auto"
                  >
                    {isProcessing ? (
                      <><Loader className="w-4 h-4 animate-spin" /> Processing...</>
                    ) : (
                      <><Activity className="w-4 h-4" /> Start Extraction</>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Configuration Panel */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
              <Settings className="w-5 h-5 text-blue-500" />
              Export Settings
            </h3>
            
            <div className="space-y-5">
              
              {/* Image Format */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Export Format</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setExportFormat('image/jpeg')}
                    className={`px-3 py-2 text-sm rounded-lg border ${exportFormat === 'image/jpeg' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
                    disabled={isProcessing}
                  >
                    JPG
                  </button>
                  <button
                    onClick={() => setExportFormat('image/png')}
                    className={`px-3 py-2 text-sm rounded-lg border ${exportFormat === 'image/png' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
                    disabled={isProcessing}
                  >
                    PNG
                  </button>
                  <button
                    onClick={() => setExportFormat('image/webp')}
                    className={`px-3 py-2 text-sm rounded-lg border ${exportFormat === 'image/webp' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-white border-gray-300 text-gray-700'}`}
                    disabled={isProcessing}
                  >
                    WebP
                  </button>
                </div>
              </div>

              {/* Resolution / Scale */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image Quality / Scale</label>
                <select
                  value={imageScale}
                  onChange={(e) => setImageScale(parseFloat(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-sm"
                  disabled={isProcessing}
                >
                  <option value={1.0}>Standard (1x / 72 DPI)</option>
                  <option value={2.0}>High Quality (2x / 144 DPI)</option>
                  <option value={3.0}>Print Quality (3x / 216 DPI)</option>
                  <option value={4.0}>Ultra HD (4x / 288 DPI)</option>
                </select>
                <p className="text-xs text-gray-500 mt-2">
                  Higher scaling produces much sharper text and graphics, but takes longer and increases file size.
                </p>
              </div>

              {/* Page Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pages to Extract</label>
                <input
                  type="text"
                  placeholder="e.g. 1-5, 8 (blank for all)"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-700 text-sm"
                  disabled={isProcessing}
                />
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
