
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { UploadCloud, File, Trash2, Settings, Download, Activity, FileText, Loader, Image as ImageIcon, Type, Briefcase, Hash, Palette } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { TextItem } from 'pdfjs-dist/types/src/display/api';
import Tesseract from 'tesseract.js';
import pptxgen from "pptxgenjs";

// Initialize PDF.js worker securely from CDN
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
}

export function PdfToPowerPointTool() {
  const t = useTranslations('Tools');
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Settings
  const [conversionMode, setConversionMode] = useState<'editable' | 'fidelity'>('editable');
  const [enableOcr, setEnableOcr] = useState(false);
  const [pageRange, setPageRange] = useState('');
  const [slideSize, setSlideSize] = useState<'16x9' | '4x3'>('16x9');
  
  // Advanced Settings
  const [addSlideNumbers, setAddSlideNumbers] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaAuthor, setMetaAuthor] = useState('');
  const [metaCompany, setMetaCompany] = useState('');

  // Logo Upload
  const [logoDataUrl, setLogoDataUrl] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE_MB = 50;
  const MAX_PAGES = 200;

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
        alert(`File ${file.name} exceeds the ${MAX_FILE_SIZE_MB}MB limit for in-browser processing.`);
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

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file (PNG, JPG).');
        return;
      }
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLogoDataUrl(ev.target?.result as string);
        setLogoName(file.name);
      };
      reader.readAsDataURL(file);
    }
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

  const processOcrPage = async (page: any, scale = 2.0): Promise<any[]> => {
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Canvas context creation failed");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;
    const dataUrl = canvas.toDataURL('image/png');

    const worker = await Tesseract.createWorker('eng');
    const ret: any = await worker.recognize(dataUrl);
    await worker.terminate();

    // Map OCR blocks to generic text items with approximate coordinates
    const items: any[] = [];
    if (ret.data && ret.data.lines) {
      ret.data.lines.forEach((line: any) => {
         const bbox = line.bbox;
         // Normalize back from scale
         items.push({
           str: line.text.trim(),
           transform: [1, 0, 0, 1, bbox.x0 / scale, viewport.height / scale - bbox.y0 / scale],
           height: (bbox.y1 - bbox.y0) / scale
         });
      });
    }
    return items;
  };

  const renderPageToImage = async (page: any, scale = 2.5): Promise<string> => {
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Canvas context creation failed");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport }).promise;
    return canvas.toDataURL('image/png');
  };

  const convertFile = async (fileObj: PdfFile) => {
    updateFileStatus(fileObj.id, { status: 'processing', progress: 0, message: 'Initializing PDF parser...' });
    
    try {
      const arrayBuffer = await fileObj.file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
      const totalPages = pdf.numPages;
      if (totalPages > MAX_PAGES) {
         throw new Error(`PDF has ${totalPages} pages, exceeding the safety limit of ${MAX_PAGES} for local conversion.`);
      }

      updateFileStatus(fileObj.id, { pageCount: totalPages });
      
      const pagesToProcess = parsePageRange(pageRange, totalPages);
      if (pagesToProcess.size === 0) {
        throw new Error('No valid pages selected in page range.');
      }

      // Initialize pptxgenjs
      let pres = new pptxgen();
      pres.layout = slideSize === '16x9' ? 'LAYOUT_16x9' : 'LAYOUT_4x3';

      // Setup Metadata
      if (metaTitle) pres.title = metaTitle;
      if (metaAuthor) pres.author = metaAuthor;
      if (metaCompany) pres.company = metaCompany;

      // Setup standard widths based on layout
      const slideWidthInches = slideSize === '16x9' ? 10 : 10;
      const slideHeightInches = slideSize === '16x9' ? 5.625 : 7.5;

      const pageArray = Array.from(pagesToProcess).sort((a, b) => a - b);
      let completed = 0;

      for (const pageNum of pageArray) {
        updateFileStatus(fileObj.id, { 
          message: `Processing page ${pageNum} of ${totalPages}...`,
          progress: Math.round((completed / pageArray.length) * 100)
        });

        const page = await pdf.getPage(pageNum);
        let slide = pres.addSlide();

        // Apply background color if not transparent and not in fidelity mode
        if (backgroundColor && backgroundColor !== '#FFFFFF' && backgroundColor !== 'transparent') {
           slide.background = { color: backgroundColor.replace('#', '') };
        }

        if (conversionMode === 'fidelity') {
          // High Fidelity Mode
          const dataUrl = await renderPageToImage(page);
          slide.background = { data: dataUrl };
        } else {
          // Editable Mode
          const viewport = page.getViewport({ scale: 1.0 });
          const textContent = await page.getTextContent();
          
          let items = textContent.items as TextItem[];
          
          if (items.length === 0 && enableOcr) {
             updateFileStatus(fileObj.id, { message: `Running OCR on page ${pageNum}...` });
             items = await processOcrPage(page);
          }

          const pdfWidthPts = viewport.width;
          const pdfHeightPts = viewport.height;
          
          const scaleX = slideWidthInches / pdfWidthPts;
          const scaleY = slideHeightInches / pdfHeightPts;

          // Group items
          const thresholdY = 5; 
          let blocks: {text: string, x: number, y: number, fontSize: number}[] = [];
          
          items.forEach((item) => {
            if (!item.str.trim()) return;
            const x = item.transform[4];
            const y = item.transform[5];
            const fontSize = Math.sqrt(item.transform[0] * item.transform[0] + item.transform[1] * item.transform[1]);

            let added = false;
            for (let b of blocks) {
               if (Math.abs(b.y - y) < thresholdY) {
                 b.text += " " + item.str;
                 added = true;
                 break;
               }
            }
            if (!added) {
              blocks.push({text: item.str, x, y, fontSize});
            }
          });

          // Compute text color based on background luminance for visibility
          // A simple heuristic: if dark bg, use white text, else black.
          const hex = backgroundColor.replace('#', '');
          const r = parseInt(hex.substr(0, 2), 16) || 255;
          const g = parseInt(hex.substr(2, 2), 16) || 255;
          const bVal = parseInt(hex.substr(4, 2), 16) || 255;
          const luminance = (0.299 * r + 0.587 * g + 0.114 * bVal) / 255;
          const fontColor = luminance > 0.5 ? "000000" : "FFFFFF";

          blocks.forEach(b => {
             const pptxY = slideHeightInches - (b.y * scaleY);
             const pptxX = b.x * scaleX;
             const pptxFontSize = b.fontSize || 12;

             slide.addText(b.text, {
               x: pptxX,
               y: pptxY,
               w: slideWidthInches - pptxX - 0.5,
               h: 0.5,
               fontSize: Math.min(Math.max(pptxFontSize, 8), 72),
               color: fontColor,
               valign: "top"
             });
          });
        }

        // Apply Slide Number
        if (addSlideNumbers) {
          slide.addText(String(pageNum), { 
            x: slideWidthInches - 0.5, 
            y: slideHeightInches - 0.3, 
            w: 0.4, 
            h: 0.2, 
            fontSize: 10,
            color: "888888",
            align: "right"
          });
        }

        // Apply Custom Logo
        if (logoDataUrl) {
           slide.addImage({
             data: logoDataUrl,
             x: 0.2,
             y: slideHeightInches - 0.8,
             w: 1.5,
             h: 0.6,
             sizing: { type: "contain", w: 1.5, h: 0.6 }
           });
        }

        completed++;
      }

      updateFileStatus(fileObj.id, { message: 'Generating PPTX file...', progress: 95 });
      
      const blob = await pres.write({ outputType: "blob" }) as Blob;
      const blobUrl = URL.createObjectURL(blob);

      updateFileStatus(fileObj.id, { status: 'done', progress: 100, message: 'Conversion complete!', blobUrl });
      
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

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600">
          PDF to PowerPoint Converter
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Securely convert PDF presentations into fully editable PowerPoint (PPTX) slides locally in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Processing Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Dropzone */}
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 
              ${isDragging ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-orange-400'}`}
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
            <p className="text-sm text-gray-500 mb-6">Up to 50MB and 200 pages per file. Processing is 100% local.</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition-colors"
            >
              Browse Files
            </button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50">
                <h3 className="font-medium flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-500" />
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
                            download={file.file.name.replace(/.pdf$/i, '.pptx')}
                            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
                          >
                            <Download className="w-4 h-4" /> PPTX
                          </a>
                        ) : file.status === 'processing' ? (
                          <Loader className="w-5 h-5 animate-spin text-orange-500" />
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
                            'text-orange-500'
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
                              'bg-orange-500'
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
                    className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ml-auto"
                  >
                    {isProcessing ? (
                      <><Loader className="w-4 h-4 animate-spin" /> Processing...</>
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
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
              <Settings className="w-5 h-5 text-orange-500" />
              Presentation Settings
            </h3>
            
            <div className="space-y-5">
              {/* Conversion Mode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Conversion Mode</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setConversionMode('editable')}
                    className={`px-3 py-2 text-sm rounded-lg border ${conversionMode === 'editable' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white border-gray-300 text-gray-700'}`}
                    disabled={isProcessing}
                  >
                    <Type className="w-4 h-4 inline-block mr-1" /> Editable Text
                  </button>
                  <button
                    onClick={() => setConversionMode('fidelity')}
                    className={`px-3 py-2 text-sm rounded-lg border ${conversionMode === 'fidelity' ? 'bg-orange-50 border-orange-500 text-orange-700' : 'bg-white border-gray-300 text-gray-700'}`}
                    disabled={isProcessing}
                  >
                    <ImageIcon className="w-4 h-4 inline-block mr-1" /> High Fidelity
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {conversionMode === 'editable' ? 'Extracts text for editing. May lose complex layouts.' : 'Renders exact PDF pages as images. Perfect visual accuracy, but text is not editable.'}
                </p>
              </div>

              {/* Slide Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Slide Aspect Ratio</label>
                <select
                  value={slideSize}
                  onChange={(e) => setSlideSize(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white dark:bg-gray-700 text-sm"
                  disabled={isProcessing}
                >
                  <option value="16x9">Widescreen (16:9)</option>
                  <option value="4x3">Standard (4:3)</option>
                </select>
              </div>

              {/* Page Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pages to Convert</label>
                <input
                  type="text"
                  placeholder="e.g. 1-5, 8 (blank for all)"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none bg-white dark:bg-gray-700 text-sm"
                  disabled={isProcessing}
                />
              </div>

              {/* Slide Customizations */}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-700 space-y-4">
                <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-orange-500" /> Slide Design
                </h4>
                
                {conversionMode === 'editable' && (
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Background Color</label>
                    <input
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-full h-8 rounded border border-gray-300"
                      disabled={isProcessing}
                    />
                  </div>
                )}

                <div>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="rounded text-orange-500 focus:ring-orange-500" 
                      checked={addSlideNumbers}
                      onChange={() => setAddSlideNumbers(!addSlideNumbers)}
                      disabled={isProcessing}
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Add Slide Numbers</span>
                  </label>
                </div>

                {/* Logo Upload */}
                <div>
                  <label className="block text-xs text-gray-500 mb-2">Company Logo Overlay</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => logoInputRef.current?.click()}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-sm rounded transition-colors"
                      disabled={isProcessing}
                    >
                      {logoName ? 'Change Logo' : 'Upload Logo'}
                    </button>
                    {logoName && (
                      <span className="text-xs text-gray-500 truncate max-w-[120px]">{logoName}</span>
                    )}
                    {logoName && (
                      <button onClick={() => { setLogoDataUrl(null); setLogoName(''); }} className="text-red-500 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={logoInputRef}
                    className="hidden"
                    accept="image/png, image/jpeg"
                    onChange={handleLogoUpload}
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Appears on bottom left of every slide.</p>
                </div>
              </div>

              {/* Metadata */}
              <div className="pt-3 border-t border-gray-100 dark:border-gray-700 space-y-3">
                 <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-orange-500" /> Presentation Metadata
                 </h4>
                 <input type="text" placeholder="Presentation Title" value={metaTitle} onChange={e => setMetaTitle(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700" />
                 <input type="text" placeholder="Author Name" value={metaAuthor} onChange={e => setMetaAuthor(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700" />
                 <input type="text" placeholder="Company Name" value={metaCompany} onChange={e => setMetaCompany(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700" />
              </div>

              {/* OCR Toggle */}
              {conversionMode === 'editable' && (
                <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={enableOcr}
                        onChange={() => setEnableOcr(!enableOcr)}
                        disabled={isProcessing}
                      />
                      <div className={`block w-10 h-6 rounded-full transition-colors ${enableOcr ? 'bg-orange-500' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${enableOcr ? 'transform translate-x-4' : ''}`}></div>
                    </div>
                    <div className="ml-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enable OCR (Scans)</span>
                    </div>
                  </label>
                  <p className="text-xs text-gray-500 mt-2">
                    Use Tesseract.js to extract text from pure images. Slower processing.
                  </p>
                </div>
              )}

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
