
'use client';

import React, { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { UploadCloud, File, Trash2, Settings, Download, Activity, Type, Loader, CheckSquare, Edit3, Clipboard } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';

if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

interface PdfFile {
  id: string;
  file: File;
  status: 'pending' | 'processing' | 'done' | 'error';
  progress: number;
  message?: string;
  extractedText?: string;
  blobUrl?: string;
}

export function PdfToTextTool() {
  const t = useTranslations('Tools');
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Settings
  const [preserveLineBreaks, setPreserveLineBreaks] = useState(true);
  const [normalizeWhitespace, setNormalizeWhitespace] = useState(true);

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
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const updateFileStatus = (id: string, updates: Partial<PdfFile>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const handleTextEdit = (id: string, newText: string) => {
    setFiles(prev => prev.map(f => {
      if (f.id === id) {
        // Automatically regenerate the blob when the user edits
        const blob = new Blob([newText], { type: 'text/plain' });
        if (f.blobUrl) URL.revokeObjectURL(f.blobUrl);
        return { ...f, extractedText: newText, blobUrl: URL.createObjectURL(blob) };
      }
      return f;
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const extractTextFromPdf = async (fileObj: PdfFile) => {
    updateFileStatus(fileObj.id, { status: 'processing', progress: 10, message: 'Parsing PDF Engine...' });
    
    try {
      const arrayBuffer = await fileObj.file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const numPages = pdf.numPages;
      
      let fullText = "";

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        updateFileStatus(fileObj.id, { 
          progress: 10 + Math.round((pageNum / numPages) * 80), 
          message: `Extracting page ${pageNum} of ${numPages}...` 
        });

        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        // Advanced Heuristic sorting based on absolute Y coordinates to recreate logical paragraphs
        const lines: { y: number; x: number; text: string }[] = [];
        const thresholdY = 6; 

        for (const item of textContent.items as any[]) {
          const y = Math.round(item.transform[5]);
          const x = Math.round(item.transform[4]);
          
          let foundLine = lines.find(l => Math.abs(l.y - y) < thresholdY);
          if (foundLine) {
            foundLine.text += " " + item.str;
          } else {
            lines.push({ y, x, text: item.str });
          }
        }

        // Sort lines by Y descending (PDF space), then by X ascending
        lines.sort((a, b) => b.y !== a.y ? b.y - a.y : a.x - b.x);

        for (const line of lines) {
          let lineText = line.text;
          if (normalizeWhitespace) {
            lineText = lineText.replace(/\s+/g, ' ').trim();
          }
          if (lineText) {
            fullText += lineText + (preserveLineBreaks ? '\n' : ' ');
          }
        }
        
        if (preserveLineBreaks) fullText += '\n\n'; // Page separator
      }

      const cleanText = fullText.trim();
      const blob = new Blob([cleanText], { type: 'text/plain' });
      const blobUrl = URL.createObjectURL(blob);
        
      updateFileStatus(fileObj.id, { 
        status: 'done', 
        progress: 100, 
        message: 'Extraction complete!', 
        blobUrl, 
        extractedText: cleanText 
      });
      
    } catch (err: any) {
      console.warn('PDF Extraction Error:', err.message);
      let errorMsg = err.message || 'An error occurred during extraction.';
      if (err.name === 'PasswordException' || errorMsg.toLowerCase().includes('password')) {
         errorMsg = 'This PDF is password protected. Please unlock it first.';
      }
      updateFileStatus(fileObj.id, { status: 'error', message: errorMsg });
    }
  };

  const processAll = async () => {
    setIsProcessing(true);
    for (const file of files.filter(f => f.status === 'pending' || f.status === 'error')) {
      await extractTextFromPdf(file);
    }
    setIsProcessing(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">
          PDF to Text Extractor
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Intelligently extract raw text from PDF documents while preserving paragraph structure and reading order. Processing is 100% secure and local.
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
            <p className="text-sm text-gray-500 mb-6">Up to 100MB per file. High accuracy parser bypasses basic copy/paste limits.</p>
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
                  <Type className="w-5 h-5 text-emerald-500" />
                  Extraction Queue ({files.length})
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
                            {file.status === 'done' && file.extractedText && (
                              <span className="text-emerald-600 dark:text-emerald-400">
                                {file.extractedText.split(/\s+/).length} Words
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                        {file.status === 'done' && file.blobUrl ? (
                          <div className="flex gap-2">
                            <button
                               onClick={() => copyToClipboard(file.extractedText || '')}
                               className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-center gap-1 text-xs font-medium border border-gray-200 dark:border-gray-600"
                            >
                               <Clipboard className="w-4 h-4" /> Copy
                            </button>
                            <a
                              href={file.blobUrl}
                              download={`${file.file.name.replace(/\.pdf$/i, '')}.txt`}
                              className="p-2 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium border border-emerald-200 dark:border-emerald-800"
                            >
                              <Download className="w-4 h-4" /> Save TXT
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
                    {(file.status === 'processing' || file.status === 'done' || file.status === 'error') && !file.extractedText && (
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

                    {/* Live Edit Preview Panel */}
                    {file.status === 'done' && file.extractedText !== undefined && (
                      <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-2">
                           <span className="text-xs font-medium text-gray-500 uppercase tracking-wider flex items-center gap-1">
                              <Edit3 className="w-3 h-3" /> Live Editor Preview
                           </span>
                        </div>
                        <textarea 
                           className="w-full h-48 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none bg-white dark:bg-gray-800 text-sm font-mono resize-y"
                           value={file.extractedText}
                           onChange={(e) => handleTextEdit(file.id, e.target.value)}
                           placeholder="Extracted text will appear here. You can edit it before saving."
                        />
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
                      <><Loader className="w-4 h-4 animate-spin" /> Mining Text...</>
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
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
              <Settings className="w-5 h-5 text-emerald-500" />
              Parser Settings
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-start gap-3">
                 <input 
                    type="checkbox" 
                    checked={preserveLineBreaks}
                    onChange={(e) => setPreserveLineBreaks(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300"
                    disabled={isProcessing}
                 />
                 <div>
                    <span className="text-sm font-medium block">Preserve Line Breaks</span>
                    <span className="text-xs text-gray-500">Maintain original paragraph structure from PDF.</span>
                 </div>
              </label>

              <label className="flex items-start gap-3">
                 <input 
                    type="checkbox" 
                    checked={normalizeWhitespace}
                    onChange={(e) => setNormalizeWhitespace(e.target.checked)}
                    className="w-4 h-4 mt-0.5 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300"
                    disabled={isProcessing}
                 />
                 <div>
                    <span className="text-sm font-medium block">Normalize Formatting</span>
                    <span className="text-xs text-gray-500">Trim excessive spaces and tabulations cleanly.</span>
                 </div>
              </label>

              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-xs text-gray-500 flex items-center gap-1"><CheckSquare className="w-3 h-3"/> Layout Engine Active</p>
                <p className="text-xs text-gray-400 mt-1">Our engine intelligently groups adjacent glyphs by spatial coordinates rather than arbitrary stream order.</p>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
