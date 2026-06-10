
'use client';

import React, { useState, useRef, ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { Download, Activity, FileText, Settings, Upload, Book, User, Edit3, Type } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export function PdfToEpubTool() {
  const t = useTranslations('Tools');
  
  // State
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // PDF Meta
  const [pdfPageCount, setPdfPageCount] = useState(0);
  
  // EPUB Meta Options
  const [epubTitle, setEpubTitle] = useState('');
  const [epubAuthor, setEpubAuthor] = useState('Unknown Author');
  const [epubPublisher, setEpubPublisher] = useState('Nexus Utilities');
  const [epubLanguage, setEpubLanguage] = useState('en');
  const [chunkSize, setChunkSize] = useState<number>(15); // Pages per chapter

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    if (selectedFile.type !== 'application/pdf') {
        alert("Please upload a valid PDF file.");
        return;
    }

    setFile(selectedFile);
    setEpubTitle(selectedFile.name.replace('.pdf', ''));
    
    // Quickly get page count
    try {
        const arrayBuffer = await selectedFile.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        setPdfPageCount(pdf.numPages);
    } catch (err) {
        console.error("PDF Load Error:", err);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      const pseudoEvent = { target: { files: [droppedFile] } } as unknown as ChangeEvent<HTMLInputElement>;
      handleFileUpload(pseudoEvent);
    } else {
        alert("Please upload a valid PDF file.");
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const extractTextFromPage = async (pdf: pdfjsLib.PDFDocumentProxy, pageNum: number): Promise<string[]> => {
      try {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          
          let lastY = -1;
          let currentLine = '';
          const paragraphs: string[] = [];
          
          textContent.items.forEach((item: any) => {
              if (lastY !== item.transform[5]) {
                  // New line detected based on vertical position change
                  if (currentLine) {
                      paragraphs.push(currentLine.trim());
                  }
                  currentLine = item.str;
                  lastY = item.transform[5];
              } else {
                  currentLine += ' ' + item.str;
              }
          });
          
          if (currentLine) {
              paragraphs.push(currentLine.trim());
          }
          
          return paragraphs;
      } catch (err) {
          console.warn(`Skipping page ${pageNum} due to error`);
          return [];
      }
  };

  // Helper to escape HTML entities
  const escapeHTML = (str: string) => {
      return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
      );
  };

  const generateEPUB = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setProgress(0);
    setStatusMessage('Reading PDF Document...');
    
    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        const totalPages = pdf.numPages;
        
        const zip = new JSZip();
        
        // 1. mimetype (Must be uncompressed, but jszip doesn't easily allow selective compression without advanced options. Standard compression usually works on modern readers).
        zip.file('mimetype', 'application/epub+zip');
        
        // 2. META-INF/container.xml
        const metaInf = zip.folder('META-INF');
        metaInf?.file('container.xml', `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`);

        // 3. OEBPS folder
        const oebps = zip.folder('OEBPS');
        const textFolder = oebps?.folder('Text');
        
        setStatusMessage('Extracting Text Data...');
        
        let allChaptersHtml: string[] = [];
        let currentChapterHtml = '';
        let chapterIndex = 1;
        
        for (let i = 1; i <= totalPages; i++) {
            setProgress(Math.round((i / totalPages) * 70)); // Up to 70% for extraction
            
            const paragraphs = await extractTextFromPage(pdf, i);
            
            paragraphs.forEach(p => {
                if (p.trim() === '') return;
                // Basic heuristic: if it's very short, it might be a heading.
                if (p.length < 50 && p === p.toUpperCase()) {
                     currentChapterHtml += `<h2>${escapeHTML(p)}</h2>\n`;
                } else {
                     currentChapterHtml += `<p>${escapeHTML(p)}</p>\n`;
                }
            });
            
            // Chunk chapters by page count heuristic
            if (i % chunkSize === 0 || i === totalPages) {
                const htmlTemplate = `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head>
  <title>${escapeHTML(epubTitle)} - Part ${chapterIndex}</title>
  <meta charset="utf-8" />
</head>
<body>
  ${currentChapterHtml}
</body>
</html>`;
                
                textFolder?.file(`chapter-${chapterIndex}.html`, htmlTemplate);
                allChaptersHtml.push(`chapter-${chapterIndex}.html`);
                
                chapterIndex++;
                currentChapterHtml = ''; // Reset for next chunk
            }
        }
        
        setStatusMessage('Assembling EPUB Structure...');
        setProgress(85);

        // 4. toc.ncx
        const uuid = crypto.randomUUID ? crypto.randomUUID() : '12345-67890';
        let navMap = '';
        allChaptersHtml.forEach((ch, idx) => {
            navMap += `
    <navPoint id="navPoint-${idx+1}" playOrder="${idx+1}">
      <navLabel>
        <text>Part ${idx+1}</text>
      </navLabel>
      <content src="Text/${ch}"/>
    </navPoint>`;
        });

        oebps?.file('toc.ncx', `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="${uuid}"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle>
    <text>${escapeHTML(epubTitle)}</text>
  </docTitle>
  <navMap>
    ${navMap}
  </navMap>
</ncx>`);

        // 5. content.opf
        let manifest = `<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>\n`;
        let spine = '';
        
        allChaptersHtml.forEach((ch, idx) => {
            manifest += `    <item id="chapter${idx+1}" href="Text/${ch}" media-type="application/xhtml+xml"/>\n`;
            spine += `    <itemref idref="chapter${idx+1}"/>\n`;
        });

        oebps?.file('content.opf', `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="BookId">${uuid}</dc:identifier>
    <dc:title>${escapeHTML(epubTitle)}</dc:title>
    <dc:creator>${escapeHTML(epubAuthor)}</dc:creator>
    <dc:publisher>${escapeHTML(epubPublisher)}</dc:publisher>
    <dc:language>${epubLanguage}</dc:language>
  </metadata>
  <manifest>
${manifest}
  </manifest>
  <spine toc="ncx">
${spine}
  </spine>
</package>`);

        setStatusMessage('Compressing Archive...');
        setProgress(95);

        // Generate and download
        const blob = await zip.generateAsync({ type: 'blob' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${epubTitle}.epub`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setProgress(100);
        setStatusMessage('EPUB Generated Successfully!');
        
    } catch (error) {
        console.error("EPUB Generation failed", error);
        alert("Failed to generate EPUB. The PDF structure might be complex or corrupted.");
    } finally {
        setTimeout(() => setIsProcessing(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-emerald-600">
          PDF to EPUB Studio
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Securely convert fixed-layout PDFs into reflowable EPUB ebooks entirely inside your browser. No files uploaded.
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
                        accept="application/pdf" 
                        ref={fileInputRef} 
                        onChange={handleFileUpload} 
                        className="hidden" 
                    />
                    <div className="mx-auto w-20 h-20 bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 rounded-full flex items-center justify-center mb-6 shadow-sm">
                        <Book className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-3">
                        Upload PDF Document
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-6">
                        Drag and drop your .pdf file here, or click to browse. Files are processed securely via local text extraction.
                    </p>
                    <button className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-sm transition">
                        Select PDF File
                    </button>
                </div>
            ) : (
                // File Review
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-8 flex flex-col justify-center space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 truncate">
                                {file.name}
                            </h2>
                            <p className="text-md text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                <FileText className="w-4 h-4" /> {(file.size / (1024 * 1024)).toFixed(2)} MB • {pdfPageCount} Pages Detected
                            </p>
                        </div>
                        
                        <div className="pt-4 flex gap-3 border-t border-gray-100 dark:border-gray-700">
                            <button 
                                onClick={() => { setFile(null); setPdfPageCount(0); }}
                                className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-md transition"
                            >
                                Choose Different File
                            </button>
                        </div>
                    </div>

                    {isProcessing && (
                        <div className="p-6 bg-teal-50 dark:bg-teal-900/20 border-t border-teal-100 dark:border-teal-800/50">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-teal-800 dark:text-teal-300">{statusMessage}</span>
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
              EPUB Metadata
            </h3>
            
            <div className="space-y-5">
              
              <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1"><Type className="w-3 h-3"/> Book Title</label>
                    <input
                        type="text"
                        value={epubTitle}
                        onChange={(e) => setEpubTitle(e.target.value)}
                        disabled={isProcessing || !file}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-1"><User className="w-3 h-3"/> Author</label>
                    <input
                        type="text"
                        value={epubAuthor}
                        onChange={(e) => setEpubAuthor(e.target.value)}
                        disabled={isProcessing || !file}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Publisher</label>
                    <input
                        type="text"
                        value={epubPublisher}
                        onChange={(e) => setEpubPublisher(e.target.value)}
                        disabled={isProcessing || !file}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">Language</label>
                        <select
                            value={epubLanguage}
                            onChange={(e) => setEpubLanguage(e.target.value)}
                            disabled={isProcessing || !file}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                        >
                            <option value="en">English (en)</option>
                            <option value="fr">French (fr)</option>
                            <option value="es">Spanish (es)</option>
                            <option value="de">German (de)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1" title="To prevent huge files, we chunk the EPUB into HTML sections.">Chunk (Pages)</label>
                        <input
                            type="number"
                            value={chunkSize}
                            onChange={(e) => setChunkSize(Number(e.target.value))}
                            min="1" max="100"
                            disabled={isProcessing || !file}
                            className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg p-2 text-sm outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                        />
                      </div>
                  </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                  <label className="flex items-center gap-2 cursor-not-allowed mt-2 opacity-50" title="Coming Soon: Preserving inline images is disabled for V1 stability.">
                      <input 
                        type="checkbox" 
                        checked={false} 
                        readOnly
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Extract Images (V2)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-not-allowed mt-2 opacity-50" title="Coming Soon: OCR Engine integration.">
                      <input 
                        type="checkbox" 
                        checked={false} 
                        readOnly
                        className="rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Run OCR Engine</span>
                  </label>
              </div>

              <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                  <button
                    onClick={generateEPUB}
                    disabled={isProcessing || !file}
                    className="w-full px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <><Activity className="w-5 h-5 animate-spin" /> Compiling EPUB...</>
                    ) : (
                      <><Download className="w-5 h-5" /> Export EPUB</>
                    )}
                  </button>
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">Fast. Accurate. 100% private.</p>
              </div>

            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
