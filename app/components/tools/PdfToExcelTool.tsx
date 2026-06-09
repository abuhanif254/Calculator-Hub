"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  Upload, FileText, FileSpreadsheet, Trash2, Settings, Download, 
  RefreshCw, Layers, Loader2, Maximize2, Shield, Search, Zap 
} from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import * as ExcelJS from "exceljs";
import Tesseract from "tesseract.js";

// Setup PDF.js worker using standard local approach
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PdfFile {
  id: string;
  file: File;
  name: string;
  size: number;
  totalPages: number;
  status: "idle" | "processing" | "ocr" | "success" | "error";
  progress: number;
  errorMessage?: string;
  extractedData?: { sheetName: string; rows: any[][] }[];
}

export function PdfToExcelTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);

  // Settings
  const [exportFormat, setExportFormat] = useState<"xlsx" | "csv">("xlsx");
  const [sheetMode, setSheetMode] = useState<"single" | "multi">("multi");
  const [enableOcr, setEnableOcr] = useState(false);
  const [pageRange, setPageRange] = useState("");
  const [ocrLanguage, setOcrLanguage] = useState("eng");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and Drop Handlers
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      loadFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      loadFiles(e.target.files);
    }
  };

  const loadFiles = async (fileList: FileList | File[]) => {
    const newFiles: PdfFile[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.type !== "application/pdf") {
        alert(`Invalid file type: ${file.name}. Only PDF files are allowed.`);
        continue;
      }
      
      const id = `pdf-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Try to get page count quickly
      let totalPages = 0;
      try {
         const arrayBuffer = await file.arrayBuffer();
         const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
         totalPages = pdf.numPages;
      } catch (e) {
         console.warn("Failed to read initial PDF pages", e);
      }

      newFiles.push({
        id,
        file,
        name: file.name,
        size: file.size,
        totalPages,
        status: "idle",
        progress: 0
      });
    }

    if (newFiles.length > 0) {
      setFiles(prev => [...prev, ...newFiles]);
      if (!activeFileId) setActiveFileId(newFiles[0].id);
    }
  };

  // Helper to parse page range (e.g. "1-3, 5")
  const parsePageRange = (rangeStr: string, total: number): number[] => {
    if (!rangeStr.trim()) return Array.from({length: total}, (_, i) => i + 1);
    
    const pages = new Set<number>();
    const parts = rangeStr.split(',');
    
    parts.forEach(part => {
      part = part.trim();
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(n => parseInt(n.trim(), 10));
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = Math.max(1, start); i <= Math.min(total, end); i++) pages.add(i);
        }
      } else {
        const num = parseInt(part, 10);
        if (!isNaN(num) && num >= 1 && num <= total) pages.add(num);
      }
    });
    
    const arr = Array.from(pages).sort((a, b) => a - b);
    return arr.length > 0 ? arr : Array.from({length: total}, (_, i) => i + 1);
  };

  // Heuristic Table Clustering logic
  const clusterTextItems = (items: any[]) => {
    if (!items || items.length === 0) return [];

    // 1. Cluster rows by Y coordinate (allowing some variance)
    const rowTolerance = 5; // pixels
    items.sort((a, b) => b.transform[5] - a.transform[5]); // Top to bottom (PDF y goes up)
    
    const rows: any[][] = [];
    let currentRow: any[] = [];
    let currentY = items[0].transform[5];

    items.forEach(item => {
      const y = item.transform[5];
      if (Math.abs(y - currentY) > rowTolerance) {
        if (currentRow.length > 0) rows.push(currentRow);
        currentRow = [item];
        currentY = y;
      } else {
        currentRow.push(item);
      }
    });
    if (currentRow.length > 0) rows.push(currentRow);

    // 2. Identify all unique columns across the entire page
    // We group x coordinates
    const colTolerance = 20; 
    let allX: number[] = [];
    items.forEach(item => allX.push(item.transform[4]));
    allX.sort((a, b) => a - b);
    
    const colAnchors: number[] = [];
    let currentX = allX[0];
    colAnchors.push(currentX);

    allX.forEach(x => {
      if (x - currentX > colTolerance) {
        currentX = x;
        colAnchors.push(currentX);
      }
    });

    // 3. Map items to grid cells
    const table: string[][] = rows.map(rowItems => {
      const gridRow = new Array(colAnchors.length).fill("");
      rowItems.forEach(item => {
        const x = item.transform[4];
        // Find closest column anchor
        let closestIdx = 0;
        let minDiff = Infinity;
        for (let i = 0; i < colAnchors.length; i++) {
          const diff = Math.abs(x - colAnchors[i]);
          if (diff < minDiff) {
            minDiff = diff;
            closestIdx = i;
          }
        }
        gridRow[closestIdx] = (gridRow[closestIdx] + " " + item.str).trim();
      });
      return gridRow;
    });

    return table;
  };

  // OCR Processing for a specific page
  const processOcrPage = async (page: any, scale: number) => {
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Canvas context failed");
    
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    await page.render({ canvasContext: ctx, viewport }).promise;
    const dataUrl = canvas.toDataURL('image/png');

    const worker = await Tesseract.createWorker(ocrLanguage);
    const ret = await worker.recognize(dataUrl);
    await worker.terminate();
    
    // Convert Tesseract lines to a simple single-column array for now
    const data: any = ret.data;
    return data.lines.map((line: any) => [line.text.trim()]);
  };

  const updateFileStatus = (id: string, updates: Partial<PdfFile>) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const processFile = async (fileObj: PdfFile) => {
    try {
      updateFileStatus(fileObj.id, { status: "processing", progress: 5 });
      
      const arrayBuffer = await fileObj.file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      
      const pagesToProcess = parsePageRange(pageRange, pdf.numPages);
      const extractedData: { sheetName: string; rows: any[][] }[] = [];
      
      for (let i = 0; i < pagesToProcess.length; i++) {
        const pageNum = pagesToProcess[i];
        const page = await pdf.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        let tableData: any[][] = [];

        // Check if page has no text (likely scanned)
        if (textContent.items.length < 5 && enableOcr) {
          updateFileStatus(fileObj.id, { status: "ocr" });
          if (pagesToProcess.length > 5) {
             throw new Error("OCR is limited to 5 pages maximum per document to prevent browser crashing. Please reduce your page range.");
          }
          tableData = await processOcrPage(page, 1.5);
          updateFileStatus(fileObj.id, { status: "processing" });
        } else {
          tableData = clusterTextItems(textContent.items);
        }

        // Clean up empty rows and cols
        tableData = tableData.filter(row => row.some(cell => cell.trim() !== ""));
        
        if (tableData.length > 0) {
           extractedData.push({
             sheetName: `Page ${pageNum}`,
             rows: tableData
           });
        }
        
        updateFileStatus(fileObj.id, { progress: 5 + Math.floor(((i + 1) / pagesToProcess.length) * 85) });
      }

      if (extractedData.length === 0) {
        throw new Error("No tabular data could be extracted from the specified pages.");
      }

      updateFileStatus(fileObj.id, { 
        status: "success", 
        progress: 100,
        extractedData
      });

    } catch (err: any) {
      console.error(err);
      updateFileStatus(fileObj.id, { 
        status: "error", 
        errorMessage: err.message || "Failed to process PDF" 
      });
    }
  };

  const downloadFile = async (fileObj: PdfFile) => {
    if (!fileObj.extractedData || fileObj.status !== "success") return;

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "Calculator Hub PDF to Excel";
    workbook.created = new Date();

    if (sheetMode === "single") {
      const sheet = workbook.addWorksheet("Extracted Data");
      fileObj.extractedData.forEach(pageData => {
        pageData.rows.forEach(row => sheet.addRow(row));
        // Add an empty row between pages
        sheet.addRow([]);
      });
    } else {
      fileObj.extractedData.forEach(pageData => {
        // Ensure unique sheet names
        let sName = pageData.sheetName;
        if (sName.length > 31) sName = sName.substring(0, 31);
        const sheet = workbook.addWorksheet(sName);
        pageData.rows.forEach(row => sheet.addRow(row));
      });
    }

    if (exportFormat === "csv") {
      const sheet = workbook.worksheets[0];
      const buffer = await workbook.csv.writeBuffer({ sheetId: sheet.id });
      triggerDownload(buffer, `${fileObj.name.replace('.pdf', '')}.csv`, 'text/csv');
    } else {
      const buffer = await workbook.xlsx.writeBuffer();
      triggerDownload(buffer, `${fileObj.name.replace('.pdf', '')}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    }
  };

  const triggerDownload = (buffer: ExcelJS.Buffer, filename: string, type: string) => {
    const blob = new Blob([buffer], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    if (activeFileId === id) {
      const remaining = files.filter(f => f.id !== id);
      setActiveFileId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const activeFile = files.find(f => f.id === activeFileId);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      
      {/* Upload Area */}
      {files.length === 0 && (
        <div 
          className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 ${
            dragActive 
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
              : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 bg-white dark:bg-gray-800"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleChange} 
            className="hidden" 
            accept="application/pdf"
            multiple
          />
          <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileSpreadsheet className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2 dark:text-white">Convert PDF to Excel</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Drag and drop your PDF files here, or click to browse. We extract tables locally—your files never leave your device.
          </p>
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors shadow-sm"
          >
            Select PDF Files
          </button>
          
          <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
             <div className="flex items-center"><Shield className="w-4 h-4 mr-1"/> 100% Secure & Local</div>
             <div className="flex items-center"><Search className="w-4 h-4 mr-1"/> Smart Table Detection</div>
             <div className="flex items-center"><Zap className="w-4 h-4 mr-1"/> Fast Extraction</div>
          </div>
        </div>
      )}

      {/* Main Workspace */}
      {files.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar: File List */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col h-[600px]">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold dark:text-white">Files ({files.length})</h3>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-2 py-1 rounded text-gray-700 dark:text-gray-300 transition-colors"
              >
                + Add More
              </button>
              <input type="file" ref={fileInputRef} onChange={handleChange} className="hidden" accept="application/pdf" multiple />
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {files.map(file => (
                <div 
                  key={file.id}
                  onClick={() => setActiveFileId(file.id)}
                  className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                    activeFileId === file.id 
                      ? "bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800" 
                      : "hover:bg-gray-50 dark:hover:bg-gray-700/50 border border-transparent"
                  }`}
                >
                  <FileText className={`w-5 h-5 mr-3 flex-shrink-0 ${activeFileId === file.id ? "text-blue-600" : "text-gray-400"}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${activeFileId === file.id ? "text-blue-700 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}`}>
                      {file.name}
                    </p>
                    <div className="flex items-center text-xs mt-0.5 space-x-2">
                       <span className="text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                       {file.totalPages > 0 && <span className="text-gray-400">• {file.totalPages} pages</span>}
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFile(file.id); }}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Area: Settings & Preview */}
          {activeFile && (
            <div className="lg:col-span-3 space-y-6">
              
              {/* Settings Panel */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold dark:text-white flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-gray-500" />
                    Conversion Settings
                  </h3>
                  {activeFile.status === "success" && (
                     <span className="px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-sm font-medium rounded-full">
                       Ready to Download
                     </span>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Pages to Extract</label>
                    <input 
                      type="text" 
                      value={pageRange} 
                      onChange={e => setPageRange(e.target.value)} 
                      disabled={activeFile.status === "processing" || activeFile.status === "ocr"}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white disabled:opacity-50"
                      placeholder="e.g. 1-5, 8, 11-13 (Blank for all)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Export Format</label>
                    <select 
                      value={exportFormat} 
                      onChange={e => setExportFormat(e.target.value as any)}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                    >
                      <option value="xlsx">Excel Workbook (.xlsx)</option>
                      <option value="csv">Comma Separated (.csv)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 dark:text-gray-300">Sheet Mapping</label>
                    <select 
                      value={sheetMode} 
                      onChange={e => setSheetMode(e.target.value as any)}
                      disabled={exportFormat === "csv"}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white disabled:opacity-50"
                    >
                      <option value="multi">One sheet per page</option>
                      <option value="single">Merge all tables to one sheet</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-sm font-medium mb-1.5 dark:text-gray-300">
                      <input 
                        type="checkbox" 
                        checked={enableOcr}
                        onChange={e => setEnableOcr(e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span>Enable OCR (for scanned PDFs)</span>
                    </label>
                    {enableOcr && (
                      <select 
                        value={ocrLanguage} 
                        onChange={e => setOcrLanguage(e.target.value)}
                        className="w-full mt-2 px-3 py-2 text-sm border rounded-lg dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                      >
                        <option value="eng">English</option>
                        <option value="spa">Spanish</option>
                        <option value="fra">French</option>
                        <option value="deu">German</option>
                      </select>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-4">
                  {(activeFile.status === "idle" || activeFile.status === "error" || activeFile.status === "success") && (
                    <button 
                      onClick={() => processFile(activeFile)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center shadow-sm"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {activeFile.status === "success" ? "Re-Extract Data" : "Extract Tables"}
                    </button>
                  )}
                  {(activeFile.status === "processing" || activeFile.status === "ocr") && (
                    <button disabled className="bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400 px-6 py-2.5 rounded-lg font-medium flex items-center">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {activeFile.status === "ocr" ? "Running OCR..." : `Processing (${activeFile.progress}%)`}
                    </button>
                  )}
                  {activeFile.status === "success" && (
                    <button 
                      onClick={() => downloadFile(activeFile)}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors flex items-center shadow-sm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download {exportFormat.toUpperCase()}
                    </button>
                  )}
                </div>

                {activeFile.errorMessage && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg border border-red-200 dark:border-red-800">
                    <span className="font-semibold">Error:</span> {activeFile.errorMessage}
                  </div>
                )}
              </div>

              {/* Data Preview Panel */}
              {activeFile.status === "success" && activeFile.extractedData && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 overflow-hidden">
                  <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center justify-between">
                    Data Preview
                    <span className="text-xs font-normal text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                      Showing first sheet preview
                    </span>
                  </h3>
                  
                  <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
                    <table className="w-full text-sm text-left whitespace-nowrap">
                      <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300">
                        <tr>
                          {activeFile.extractedData[0].rows[0]?.map((cell: any, i: number) => (
                            <th key={i} className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 font-medium">
                              {cell || `Col ${i+1}`}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {activeFile.extractedData[0].rows.slice(1, 10).map((row: any[], rIdx: number) => (
                          <tr key={rIdx} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-750">
                            {row.map((cell: string, cIdx: number) => (
                              <td key={cIdx} className="px-4 py-2 text-gray-600 dark:text-gray-400">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {activeFile.extractedData[0].rows.length > 10 && (
                      <div className="p-3 text-center text-xs text-gray-500 bg-gray-50 dark:bg-gray-900/30">
                         ... and {activeFile.extractedData[0].rows.length - 10} more rows
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      )}

    </div>
  );
}
