
'use client';

import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Download, Activity, FileText, Settings, Upload, Image as ImageIcon, BookOpen, User, Hash } from 'lucide-react';
import { jsPDF } from 'jspdf';
import ePub from 'epubjs';

export function EpubToPdfTool() {
  const t = useTranslations('Tools');
  
  // State
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Metadata
  const [metadata, setMetadata] = useState<{
    title: string;
    creator: string;
    publisher: string;
    language: string;
    coverUrl: string | null;
    chapterCount: number;
  }>({
    title: '',
    creator: '',
    publisher: '',
    language: '',
    coverUrl: null,
    chapterCount: 0
  });

  const [bookRef, setBookRef] = useState<any>(null);
  
  // Output Settings
  const [fontFamily, setFontFamily] = useState<'helvetica' | 'times' | 'courier'>('times');
  const [fontSize, setFontSize] = useState<number>(12);
  const [lineHeight, setLineHeight] = useState<number>(1.5);
  const [pageSize, setPageSize] = useState<'a4' | 'letter' | 'a3' | 'a5' | 'legal'>('a4');
  const [marginSetting, setMarginSetting] = useState<'small' | 'medium' | 'large'>('medium');
  const [showPageNumbers, setShowPageNumbers] = useState(true);

  // Read EPUB
  const processEpub = async (selectedFile: File) => {
    try {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            if (!arrayBuffer) return;

            const book = ePub(arrayBuffer);
            setBookRef(book);

            await book.ready;
            
            // Extract Metadata
            const meta = await book.loaded.metadata;
            let coverUrl = null;
            try {
                const cover = await book.coverUrl();
                if (cover) coverUrl = cover;
            } catch (err) {
                console.warn("Cover extraction failed", err);
            }

            // Extract Chapters / Spine count
            const spine = await book.loaded.spine;
            const chapterCount = spine.length || 0;

            setMetadata({
                title: meta.title || selectedFile.name.replace('.epub', ''),
                creator: meta.creator || 'Unknown Author',
                publisher: meta.publisher || 'Unknown Publisher',
                language: meta.language || 'en',
                coverUrl,
                chapterCount
            });
            
            setFile(selectedFile);
        };
        reader.readAsArrayBuffer(selectedFile);
    } catch (err) {
        console.error("Failed to parse EPUB", err);
        alert("Failed to parse EPUB. The file might be corrupted or DRM protected.");
        setFile(null);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    // Quick validation
    if (!selectedFile.name.toLowerCase().endsWith('.epub')) {
        alert("Please upload a valid .epub file.");
        return;
    }

    processEpub(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.toLowerCase().endsWith('.epub')) {
      processEpub(droppedFile);
    } else {
        alert("Please upload a valid .epub file.");
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const getMarginMM = () => {
    switch(marginSetting) {
        case 'small': return 12.7; // 0.5 inch
        case 'large': return 38.1; // 1.5 inch
        case 'medium': 
        default: return 25.4; // 1 inch
    }
  };

  const generatePDF = async () => {
    if (!bookRef) return;
    
    setIsProcessing(true);
    setProgress(0);
    
    try {
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: pageSize
        });

        const margin = getMarginMM();
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const effectiveWidth = pdfWidth - (margin * 2);
        const effectiveHeight = pdfHeight - (margin * 2);

        // Calculate line height
        const lineHeightMM = (fontSize * 0.3527) * lineHeight;
        let cursorY = margin;
        let pageNum = 1;

        const addPageNumber = () => {
            if (showPageNumbers) {
                pdf.setFontSize(10);
                pdf.setTextColor(150);
                const pageString = `Page ${pageNum}`;
                const textWidth = pdf.getTextWidth(pageString);
                pdf.text(pageString, (pdfWidth / 2) - (textWidth / 2), pdfHeight - (margin / 2));
                pdf.setFontSize(fontSize);
                pdf.setTextColor(0);
            }
        };

        const spineItems = await bookRef.loaded.spine;
        
        // Setup initial font
        pdf.setFont(fontFamily);
        pdf.setFontSize(fontSize);
        pdf.setTextColor(0);

        for (let i = 0; i < spineItems.length; i++) {
            setProgress(Math.round(((i + 1) / spineItems.length) * 100));
            const item = spineItems[i];
            const content = await item.load(bookRef.load.bind(bookRef));
            
            // Extract text purely for V1 (Images are stripped to prevent canvas taint issues)
            const doc = new DOMParser().parseFromString(content as string, 'text/html');
            const rawText = doc.body.innerText || doc.body.textContent || '';
            const cleanedText = rawText.replace(/\n\s*\n/g, '\n').trim();
            
            if (!cleanedText) continue;

            // Split text
            const textLines = pdf.splitTextToSize(cleanedText, effectiveWidth);

            for (let j = 0; j < textLines.length; j++) {
                if (cursorY + lineHeightMM > pdfHeight - margin) {
                    addPageNumber();
                    pdf.addPage();
                    pageNum++;
                    cursorY = margin;
                }
                
                pdf.text(textLines[j], margin, cursorY + (fontSize * 0.3527));
                cursorY += lineHeightMM;
            }
            
            // Add page break after each chapter if there is content
            if (i < spineItems.length - 1 && textLines.length > 0) {
                 addPageNumber();
                 pdf.addPage();
                 pageNum++;
                 cursorY = margin;
            }
        }

        // Add last page number if needed
        if (cursorY > margin) {
            addPageNumber();
        }

        pdf.save(`${metadata.title || 'book'}.pdf`);
        
    } catch (error) {
        console.error("PDF Generation failed", error);
        alert("Failed to generate PDF. The EPUB structure might be complex or corrupted.");
    } finally {
        setIsProcessing(false);
        setProgress(0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-600">
          EPUB to PDF Studio
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Securely convert EPUB ebooks into professional PDF documents locally inside your browser. No files uploaded.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Main Area */}
        <div className="xl:col-span-3 space-y-6">
            {!file ? (
                // Dropzone
                <div 
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="bg-white dark:bg-gray-800 border-2 border-dashed border-teal-300 dark:border-teal-700/50 rounded-2xl p-16 text-center hover:bg-teal-50/50 dark:hover:bg-teal-900/10 transition-colors cursor-pointer"
                    onClick={triggerFileUpload}
                >
                    <input 
                        type="file" 
                        accept=".epub" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        className="hidden" 
                    />
                    <div className="mx-auto w-20 h-20 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
                        <BookOpen className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        Upload EPUB Ebook
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
                        Drag and drop your .epub file here, or click to browse. Files are processed securely on your device.
                    </p>
                    <button className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-sm transition">
                        Select EPUB File
                    </button>
                </div>
            ) : (
                // Book Metadata View
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="flex flex-col md:flex-row border-b border-gray-200 dark:border-gray-700">
                        {/* Cover Image Placeholder */}
                        <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-900/50 p-8 flex items-center justify-center border-r border-gray-200 dark:border-gray-700 min-h-[300px]">
                            {metadata.coverUrl ? (
                                <img src={metadata.coverUrl} alt="Cover" className="max-h-[350px] shadow-lg rounded object-cover" />
                            ) : (
                                <div className="text-center text-gray-400">
                                    <ImageIcon className="w-16 h-16 mx-auto mb-2 opacity-50" />
                                    <p>No Cover Found</p>
                                </div>
                            )}
                        </div>
                        
                        {/* Meta Details */}
                        <div className="w-full md:w-2/3 p-8 flex flex-col justify-center space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
                                    {metadata.title || 'Untitled Book'}
                                </h2>
                                <p className="text-lg text-teal-600 dark:text-teal-400 flex items-center gap-2">
                                    <User className="w-5 h-5" /> {metadata.creator || 'Unknown Author'}
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Publisher</p>
                                    <p className="font-medium text-gray-800 dark:text-gray-200">{metadata.publisher || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Language</p>
                                    <p className="font-medium text-gray-800 dark:text-gray-200 uppercase">{metadata.language || '-'}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Chapters / Spine</p>
                                    <p className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-1">
                                        <Hash className="w-4 h-4"/> {metadata.chapterCount}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">File Size</p>
                                    <p className="font-medium text-gray-800 dark:text-gray-200">
                                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                            
                            <div className="pt-4 flex gap-3">
                                <button 
                                    onClick={() => { setFile(null); setBookRef(null); }}
                                    className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition"
                                >
                                    Change File
                                </button>
                            </div>
                        </div>
                    </div>

                    {isProcessing && (
                        <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-t border-teal-100 dark:border-teal-800/50">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-teal-800 dark:text-teal-300">Extracting and paginating chapters...</span>
                                <span className="text-sm font-bold text-teal-800 dark:text-teal-300">{progress}%</span>
                            </div>
                            <div className="w-full bg-teal-200 dark:bg-teal-800/50 rounded-full h-2.5 overflow-hidden">
                                <div className="bg-teal-600 h-2.5 rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Configuration Panel */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
              <Settings className="w-5 h-5 text-teal-500" />
              Export Settings
            </h3>
            
            <div className="space-y-5">
              
              {/* Typography Group */}
              <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Typography</h4>
                  
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Font Family</label>
                    <select
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value as any)}
                        disabled={isProcessing}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                    >
                        <option value="helvetica">Helvetica (Sans-Serif)</option>
                        <option value="times">Times (Serif)</option>
                        <option value="courier">Courier (Monospace)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Size (pt)</label>
                        <input
                            type="number"
                            value={fontSize}
                            onChange={(e) => setFontSize(Number(e.target.value))}
                            min="8" max="72"
                            disabled={isProcessing}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Line Height</label>
                        <select
                            value={lineHeight}
                            onChange={(e) => setLineHeight(Number(e.target.value))}
                            disabled={isProcessing}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                        >
                            <option value={1}>Single</option>
                            <option value={1.5}>1.5 lines</option>
                            <option value={2}>Double</option>
                        </select>
                      </div>
                  </div>
              </div>

              {/* Layout Group */}
              <div className="space-y-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Layout</h4>
                  
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Page Size</label>
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(e.target.value as any)}
                        disabled={isProcessing}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                    >
                        <option value="a4">A4</option>
                        <option value="letter">Letter</option>
                        <option value="legal">Legal</option>
                        <option value="a3">A3</option>
                        <option value="a5">A5</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Margins</label>
                    <select
                        value={marginSetting}
                        onChange={(e) => setMarginSetting(e.target.value as any)}
                        disabled={isProcessing}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                    >
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                  </div>
              </div>
              
              {/* Extras */}
              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={showPageNumbers} 
                        onChange={(e) => setShowPageNumbers(e.target.checked)}
                        disabled={isProcessing}
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500 disabled:opacity-50"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Add Page Numbers</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-not-allowed mt-2 opacity-50" title="Coming Soon: Preserving inline images is disabled for V1 stability.">
                      <input 
                        type="checkbox" 
                        checked={false} 
                        readOnly
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Preserve Images (V2)</span>
                  </label>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={generatePDF}
                    disabled={isProcessing || !file}
                    className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <><Activity className="w-5 h-5 animate-spin" /> Compiling...</>
                    ) : (
                      <><Download className="w-5 h-5" /> Export PDF</>
                    )}
                  </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">Local processing. 100% private.</p>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
