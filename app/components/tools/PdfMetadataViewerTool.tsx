"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FileText, Upload, Trash2, Settings, AlertCircle, Loader2, Download,
  History, Check, ShieldCheck, Eye, EyeOff, Plus, File, Lock, Unlock, 
  Trash, Save, Copy, CheckCircle2, RefreshCw, Sparkles, HelpCircle, 
  Languages, Tag, Calendar, User, Info, ArrowRight, ShieldAlert,
  Search, BarChart2, CheckSquare, XCircle, FileSpreadsheet, FileJson,
  Printer, HelpCircle as HelpIcon, Columns
} from "lucide-react";
import { PDFDocument, PDFName, PDFString, PDFHexString } from "pdf-lib";
import JSZip from "jszip";
import { decryptPDF } from "@pdfsmaller/pdf-decrypt";

// --- Types ---

interface PageDimension {
  widthPt: number;
  heightPt: number;
  widthIn: number;
  heightIn: number;
  widthMm: number;
  heightMm: number;
  name: string;
  orientation: "Portrait" | "Landscape";
}

interface PDFMetadata {
  title: string;
  author: string;
  subject: string;
  keywords: string[];
  creator: string;
  producer: string;
  creationDate: Date | string | null;
  modificationDate: Date | string | null;
  language: string;
  customProperties: Record<string, string>;
  pdfVersion: string;
  pageCount: number;
  fileSize: number;
  
  // Advanced Features
  embeddedFonts: string[];
  pageDimensions: PageDimension[];
  isEncrypted: boolean;
  encryptionMethod: string;
  permissions: {
    printing: boolean;
    modifying: boolean;
    copying: boolean;
  };
  documentId?: string;
  outlines: string[];
  hasXmp: boolean;
}

interface MetadataViewerFile {
  id: string;
  file: File;
  name: string;
  size: number;
  status: "loading" | "ready" | "error" | "locked";
  errorMessage?: string;
  metadata: PDFMetadata | null;
  password?: string;
  requiresPassword?: boolean;
}

interface ViewerHistoryItem {
  id: string;
  name: string;
  size: number;
  timestamp: number;
  pageCount: number;
  privacyScore: number;
  healthScore: number;
}

const PDFJS_VERSION = "3.11.174";

// --- Paper Size Mappings ---
const getPaperSizeName = (wPt: number, hPt: number): string => {
  const w = Math.round(wPt);
  const h = Math.round(hPt);
  
  const matches = (w1: number, h1: number) => {
    return (Math.abs(w - w1) < 10 && Math.abs(h - h1) < 10) || 
           (Math.abs(w - h1) < 10 && Math.abs(h - w1) < 10);
  };
  
  if (matches(612, 792)) return "Letter";
  if (matches(612, 1008)) return "Legal";
  if (matches(595, 842)) return "A4";
  if (matches(842, 1191)) return "A3";
  if (matches(420, 595)) return "A5";
  if (matches(540, 720)) return "Executive";
  if (matches(792, 1224)) return "Tabloid";
  return "Custom";
};

export function PdfMetadataViewerTool() {
  const [files, setFiles] = useState<MetadataViewerFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"dashboard" | "properties" | "advanced" | "privacy" | "health" | "comparison">("dashboard");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Local operation logs
  const [history, setHistory] = useState<ViewerHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  
  // Comparison state
  const [compareFileAId, setCompareFileAId] = useState<string>("");
  const [compareFileBId, setCompareFileBId] = useState<string>("");

  // Copy status tooltip state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  // Load Saved History from LocalStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("pdf_viewer_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.warn("Failed to load viewer history", e);
      }
    }
  }, []);

  // PDFJS Script Dynamic Loader
  const loadPdfJs = (): Promise<any> => {
    return new Promise((resolve, reject) => {
      const windowAny = window as any;
      if (windowAny.pdfjsLib) {
        resolve(windowAny.pdfjsLib);
        return;
      }

      const existingScript = document.getElementById("pdfjs-cdn-script");
      if (existingScript) {
        let interval = setInterval(() => {
          if (windowAny.pdfjsLib) {
            clearInterval(interval);
            resolve(windowAny.pdfjsLib);
          }
        }, 100);
        setTimeout(() => {
          clearInterval(interval);
          reject(new Error("Timeout loading PDF.js"));
        }, 15000);
        return;
      }

      const script = document.createElement("script");
      script.id = "pdfjs-cdn-script";
      script.src = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.min.js`;
      script.onload = () => {
        const pdfjsLib = windowAny.pdfjsLib;
        if (pdfjsLib) {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}/pdf.worker.min.js`;
          resolve(pdfjsLib);
        } else {
          reject(new Error("PDF.js global object missing after script load"));
        }
      };
      script.onerror = () => reject(new Error("Failed to load PDF.js from CDN. Check connection."));
      document.head.appendChild(script);
    });
  };

  // Drag & drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Parse PDF metadata, dimensions, outlines, and fonts securely client-side
  const parsePdfFile = async (file: File, password = ""): Promise<PDFMetadata> => {
    const originalBuffer = await file.arrayBuffer();
    let loadTarget: ArrayBuffer | Uint8Array = originalBuffer;

    // 1. Get PDF Version from raw header bytes
    const headerBytes = new Uint8Array(originalBuffer.slice(0, 20));
    const headerText = new TextDecoder().decode(headerBytes);
    const versionMatch = headerText.match(/%PDF-(\d+\.\d+)/);
    const pdfVersion = versionMatch ? versionMatch[1] : "1.4";

    // 2. Decrypt PDF first if password is provided
    if (password) {
      loadTarget = await decryptPDF(new Uint8Array(originalBuffer), password);
    }

    // 3. Load pdf-lib document
    const pdfDoc = await PDFDocument.load(loadTarget, {
      ignoreEncryption: true
    });

    const pageCount = pdfDoc.getPageCount();

    // 4. Extract standard metadata values
    const title = pdfDoc.getTitle() || "";
    const author = pdfDoc.getAuthor() || "";
    const subject = pdfDoc.getSubject() || "";
    const rawKeywords = pdfDoc.getKeywords() || "";
    const keywords = rawKeywords.split(/[\s,]+/).map(k => k.trim()).filter(Boolean);
    const creator = pdfDoc.getCreator() || "";
    const producer = pdfDoc.getProducer() || "";

    let creationDate: Date | null = null;
    let modificationDate: Date | null = null;

    try {
      const cd = pdfDoc.getCreationDate();
      if (cd && !isNaN(cd.getTime())) creationDate = cd;
    } catch {}

    try {
      const md = pdfDoc.getModificationDate();
      if (md && !isNaN(md.getTime())) modificationDate = md;
    } catch {}

    // 5. Extract language tag
    let language = "";
    try {
      const langObj = pdfDoc.catalog.get(PDFName.of("Lang"));
      if (langObj) {
        if (langObj instanceof PDFString || langObj instanceof PDFHexString) {
          language = langObj.decodeText();
        } else {
          language = String(langObj);
        }
        if (language.startsWith("/")) {
          language = language.substring(1);
        }
      }
    } catch {}

    // 6. Check for XMP stream presence
    let hasXmp = false;
    try {
      const xmpObj = pdfDoc.catalog.get(PDFName.of("Metadata"));
      if (xmpObj) hasXmp = true;
    } catch {}

    // 7. Extract Document ID (from /ID array in trailer)
    let documentId = "";
    try {
      const idArray = (pdfDoc.context as any).trailer.get(PDFName.of("ID"));
      if (idArray && (idArray as any).array) {
        const idItems = (idArray as any).array;
        if (idItems.length > 0) {
          const firstId = idItems[0];
          documentId = firstId.toString();
          if (documentId.startsWith("<") && documentId.endsWith(">")) {
            documentId = documentId.slice(1, -1);
          }
        }
      }
    } catch {}

    // 8. Extract custom properties
    const customProperties: Record<string, string> = {};
    try {
      const infoDict = (pdfDoc as any).getInfoDict();
      if (infoDict) {
        const keys = infoDict.keys();
        const standardKeys = ["Title", "Author", "Subject", "Keywords", "Creator", "Producer", "CreationDate", "ModDate", "Trapped"];
        keys.forEach((key: any) => {
          const decodedKey = key.decodeText ? key.decodeText() : key.key || String(key);
          if (!standardKeys.includes(decodedKey)) {
            const valObj = infoDict.lookup(key);
            if (valObj && (valObj instanceof PDFString || valObj instanceof PDFHexString)) {
              customProperties[decodedKey] = valObj.decodeText();
            }
          }
        });
      }
    } catch {}

    // 9. Inspect security permissions & encryption details
    const isEncrypted = pdfDoc.isEncrypted;
    let encryptionMethod = "None";
    const permissions = {
      printing: true,
      modifying: true,
      copying: true,
    };

    try {
      const encryptDict = (pdfDoc.context as any).trailer.get(PDFName.of("Encrypt"));
      if (encryptDict) {
        encryptionMethod = "Standard Encryption";
        const encryptObj = pdfDoc.context.lookup(encryptDict) as any;
        if (encryptObj && encryptObj.get) {
          const filter = encryptObj.get(PDFName.of("Filter"));
          const r = encryptObj.get(PDFName.of("R"));
          const v = encryptObj.get(PDFName.of("V"));
          
          let cipher = "";
          if (v) {
            const vVal = Number(v.toString());
            if (vVal === 1) cipher = "RC4 (40-bit)";
            else if (vVal === 2) cipher = "RC4 (128-bit)";
            else if (vVal === 4) cipher = "RC4/AES (128-bit)";
            else if (vVal === 5) cipher = "AES (256-bit)";
          }
          encryptionMethod = `${filter ? filter.toString().replace('/', '') : 'Standard'} (${cipher || 'Revision ' + r})`;
          
          const p = encryptObj.get(PDFName.of("P"));
          if (p) {
            const pVal = Number(p.toString());
            // Bit 3: print
            permissions.printing = (pVal & (1 << 2)) !== 0;
            // Bit 4: modify content
            permissions.modifying = (pVal & (1 << 3)) !== 0;
            // Bit 5: copy text and graphics
            permissions.copying = (pVal & (1 << 4)) !== 0;
          }
        }
      }
    } catch {}

    // 10. Load PDFJS to extract fonts, dimensions, and outline bookmarks
    let embeddedFonts: string[] = [];
    const pageDimensions: PageDimension[] = [];
    let outlines: string[] = [];

    try {
      const pdfjsLib = await loadPdfJs();
      const docData = new Uint8Array(loadTarget.slice(0));
      const loadingTask = pdfjsLib.getDocument({
        data: docData,
        password: password
      });
      const pdfjsDoc = await loadingTask.promise;

      // Extract outline bookmarks
      try {
        const outline = await pdfjsDoc.getOutline();
        if (outline && outline.length > 0) {
          outlines = outline.map((item: any) => item.title).filter(Boolean);
        }
      } catch (e) {
        console.warn("Error loading bookmarks outline", e);
      }

      // Loop pages to extract dimensions and fonts
      const fontsSet = new Set<string>();
      const setFontOp = pdfjsLib.OPS ? pdfjsLib.OPS.setFont : 9;

      for (let i = 1; i <= Math.min(pageCount, 15); i++) { // cap page scanning to 15 pages for speed
        const page = await pdfjsDoc.getPage(i);
        
        // Dimensions
        const viewport = page.getViewport({ scale: 1.0 });
        const widthPt = viewport.width;
        const heightPt = viewport.height;
        const widthIn = widthPt / 72;
        const heightIn = heightPt / 72;
        const widthMm = widthIn * 25.4;
        const heightMm = heightIn * 25.4;
        
        pageDimensions.push({
          widthPt,
          heightPt,
          widthIn,
          heightIn,
          widthMm,
          heightMm,
          name: getPaperSizeName(widthPt, heightPt),
          orientation: widthPt > heightPt ? "Landscape" : "Portrait"
        });

        // Fonts
        try {
          const opList = await page.getOperatorList();
          for (let j = 0; j < opList.fnArray.length; j++) {
            if (opList.fnArray[j] === setFontOp) {
              const fontId = opList.argsArray[j][0];
              const fontObj = page.commonObjs.get(fontId);
              if (fontObj) {
                if (fontObj.name) {
                  fontsSet.add(fontObj.name);
                } else if (fontObj.loadedName) {
                  fontsSet.add(fontObj.loadedName);
                }
              }
            }
          }
        } catch {}

        try {
          const objs = page.commonObjs;
          if (objs && typeof objs.keys === 'function') {
            for (const key of objs.keys()) {
              const obj = objs.get(key);
              if (obj && (obj.type === 'Font' || obj.name)) {
                fontsSet.add(obj.name || obj.loadedName || key);
              }
            }
          }
        } catch {}
      }

      embeddedFonts = Array.from(fontsSet);

      // If page count > 15, replicate dimensions from page 15 for stats
      if (pageCount > 15) {
        const lastDim = pageDimensions[pageDimensions.length - 1];
        for (let pIdx = 16; pIdx <= pageCount; pIdx++) {
          pageDimensions.push({ ...lastDim });
        }
      }

    } catch (e) {
      console.warn("PDF.js loading failed or outline/fonts parsing aborted", e);
      // Fallback dimensions from pdf-lib
      for (let i = 0; i < pageCount; i++) {
        try {
          const page = pdfDoc.getPage(i);
          const { width, height } = page.getSize();
          pageDimensions.push({
            widthPt: width,
            heightPt: height,
            widthIn: width / 72,
            heightIn: height / 72,
            widthMm: (width / 72) * 25.4,
            heightMm: (height / 72) * 25.4,
            name: getPaperSizeName(width, height),
            orientation: width > height ? "Landscape" : "Portrait"
          });
        } catch {
          pageDimensions.push({
            widthPt: 612,
            heightPt: 792,
            widthIn: 8.5,
            heightIn: 11,
            widthMm: 215.9,
            heightMm: 279.4,
            name: "Letter",
            orientation: "Portrait"
          });
        }
      }
    }

    return {
      title,
      author,
      subject,
      keywords,
      creator,
      producer,
      creationDate,
      modificationDate,
      language,
      customProperties,
      pdfVersion,
      pageCount,
      fileSize: file.size,
      embeddedFonts,
      pageDimensions,
      isEncrypted,
      encryptionMethod,
      permissions,
      documentId,
      outlines,
      hasXmp
    };
  };

  const processFilesList = async (incomingFiles: FileList | null) => {
    if (!incomingFiles) return;

    const newFiles: MetadataViewerFile[] = [];
    for (let i = 0; i < incomingFiles.length; i++) {
      const file = incomingFiles[i];
      if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
        continue;
      }
      
      const id = Math.random().toString(36).substring(2, 9);
      newFiles.push({
        id,
        file,
        name: file.name,
        size: file.size,
        status: "loading",
        metadata: null
      });
    }

    setFiles(prev => {
      const merged = [...prev, ...newFiles];
      if (!selectedFileId && merged.length > 0) {
        setSelectedFileId(merged[0].id);
      }
      return merged;
    });

    for (const newFile of newFiles) {
      try {
        const meta = await parsePdfFile(newFile.file);
        
        // Add to history
        const pScore = calculatePrivacyScore(meta);
        const hScore = calculateHealthScore(meta);
        const historyItem: ViewerHistoryItem = {
          id: Math.random().toString(36).substring(2, 9),
          name: newFile.name,
          size: newFile.size,
          timestamp: Date.now(),
          pageCount: meta.pageCount,
          privacyScore: pScore,
          healthScore: hScore
        };

        setHistory(prev => {
          const updated = [historyItem, ...prev].slice(0, 15);
          localStorage.setItem("pdf_viewer_history", JSON.stringify(updated));
          return updated;
        });

        setFiles(prev => prev.map(f => f.id === newFile.id ? {
          ...f,
          status: "ready",
          metadata: meta
        } : f));
      } catch (err: any) {
        const isEncrypted = err.message && (
          err.message.includes("encrypted") || 
          err.message.includes("password") || 
          err.message.includes("decrypt")
        );

        if (isEncrypted) {
          setFiles(prev => prev.map(f => f.id === newFile.id ? {
            ...f,
            status: "locked",
            requiresPassword: true
          } : f));
        } else {
          console.warn("Failed to inspect PDF", err);
          setFiles(prev => prev.map(f => f.id === newFile.id ? {
            ...f,
            status: "error",
            errorMessage: err.message || "Failed to load PDF structure."
          } : f));
        }
      }
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFilesList(e.dataTransfer.files);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFilesList(e.target.files);
    }
  };

  const handleLockedPasswordSubmit = async (fileId: string, pass: string) => {
    const target = files.find(f => f.id === fileId);
    if (!target) return;

    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: "loading" } : f));
    try {
      const meta = await parsePdfFile(target.file, pass);
      
      const pScore = calculatePrivacyScore(meta);
      const hScore = calculateHealthScore(meta);
      const historyItem: ViewerHistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        name: target.name,
        size: target.size,
        timestamp: Date.now(),
        pageCount: meta.pageCount,
        privacyScore: pScore,
        healthScore: hScore
      };

      setHistory(prev => {
        const updated = [historyItem, ...prev].slice(0, 15);
        localStorage.setItem("pdf_viewer_history", JSON.stringify(updated));
        return updated;
      });

      setFiles(prev => prev.map(f => f.id === fileId ? {
        ...f,
        status: "ready",
        metadata: meta,
        password: pass
      } : f));
    } catch {
      setFiles(prev => prev.map(f => f.id === fileId ? {
        ...f,
        status: "locked",
        requiresPassword: true,
        errorMessage: "Incorrect password. Try again."
      } : f));
    }
  };

  // --- Score Calculations ---

  const calculatePrivacyScore = (meta: PDFMetadata): number => {
    let score = 10;
    if (meta.author) score += 25;
    if (meta.creator) score += 15;
    if (meta.producer) score += 15;
    if (meta.creationDate) score += 15;
    if (meta.modificationDate) score += 10;
    if (Object.keys(meta.customProperties).length > 0) score += 10;
    if (meta.hasXmp) score += 10;
    if (meta.documentId) score += 5;

    // Check for directory paths or system usernames inside metadata fields
    const pathRegex = /[\\\/]/;
    const driveRegex = /[A-Z]:\\/i;
    const hasPath = [meta.title, meta.author, meta.creator, meta.producer]
      .some(str => str && (pathRegex.test(str) || driveRegex.test(str)));
    if (hasPath) score += 15;

    return Math.min(score, 100);
  };

  const calculateHealthScore = (meta: PDFMetadata): number => {
    let score = 0;
    
    // Title checks
    if (meta.title) {
      score += 25;
      if (meta.title.length >= 10 && meta.title.length <= 70) {
        score += 15; // Optimal SEO title length
      }
      const genericWords = ["untitled", "document", "microsoft", "word", "pdf", "scan", "output"];
      const isGeneric = genericWords.some(w => meta.title.toLowerCase().includes(w));
      if (!isGeneric) {
        score += 10; // Non-generic descriptive title
      }
    }

    // Subject/Description
    if (meta.subject) {
      score += 15;
    }

    // Keywords
    if (meta.keywords && meta.keywords.length > 0) {
      if (meta.keywords.length >= 3) {
        score += 15;
      } else {
        score += 5;
      }
    }

    // Language
    if (meta.language) {
      score += 20; // Critical for accessibility screen readers
    }

    return score;
  };

  const getPrivacyLevel = (score: number) => {
    if (score <= 30) return { label: "Low Risk", color: "text-green-500 bg-green-500/10 border-green-500/20" };
    if (score <= 60) return { label: "Medium Risk", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
    return { label: "High Risk", color: "text-red-500 bg-red-500/10 border-red-500/20" };
  };

  const getHealthLevel = (score: number) => {
    if (score >= 80) return { label: "Excellent SEO", color: "text-green-500 bg-green-500/10 border-green-500/20" };
    if (score >= 50) return { label: "Good SEO", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" };
    return { label: "Poor SEO", color: "text-red-500 bg-red-500/10 border-red-500/20" };
  };

  // --- Export Actions ---

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getActiveFile = (): MetadataViewerFile | null => {
    return files.find(f => f.id === selectedFileId) || null;
  };

  const exportAsJson = () => {
    const activeFile = getActiveFile();
    if (!activeFile || !activeFile.metadata) return;
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeFile.metadata, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${activeFile.name.replace(".pdf", "")}_metadata_report.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportAsCsv = () => {
    const activeFile = getActiveFile();
    if (!activeFile || !activeFile.metadata) return;
    const meta = activeFile.metadata;

    const rows = [
      ["Metadata Property", "Value"],
      ["File Name", activeFile.name],
      ["File Size (Bytes)", activeFile.size.toString()],
      ["Page Count", meta.pageCount.toString()],
      ["PDF Version", meta.pdfVersion],
      ["Title", meta.title],
      ["Author", meta.author],
      ["Subject", meta.subject],
      ["Keywords", meta.keywords.join(", ")],
      ["Creator Tool", meta.creator],
      ["Producer Engine", meta.producer],
      ["Creation Date", meta.creationDate ? String(meta.creationDate) : ""],
      ["Modification Date", meta.modificationDate ? String(meta.modificationDate) : ""],
      ["Language Code", meta.language],
      ["Document ID", meta.documentId || ""],
      ["Is Encrypted", meta.isEncrypted.toString()],
      ["Encryption Method", meta.encryptionMethod],
      ["Printing Allowed", meta.permissions.printing.toString()],
      ["Modifying Allowed", meta.permissions.modifying.toString()],
      ["Copying Allowed", meta.permissions.copying.toString()],
    ];

    Object.entries(meta.customProperties).forEach(([key, val]) => {
      rows.push([`Custom: ${key}`, val]);
    });

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(r => r.map(cell => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", csvContent);
    downloadAnchor.setAttribute("download", `${activeFile.name.replace(".pdf", "")}_metadata_report.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportAsTxt = () => {
    const activeFile = getActiveFile();
    if (!activeFile || !activeFile.metadata) return;
    const meta = activeFile.metadata;

    let text = `====================================================\n`;
    text += `PDF METADATA REPORT: ${activeFile.name}\n`;
    text += `====================================================\n\n`;
    text += `FILE INFORMATION:\n`;
    text += `-----------------\n`;
    text += `File Name: ${activeFile.name}\n`;
    text += `File Size: ${(activeFile.size / 1024).toFixed(2)} KB (${activeFile.size} bytes)\n`;
    text += `Page Count: ${meta.pageCount}\n`;
    text += `PDF Version: ${meta.pdfVersion}\n\n`;
    text += `STANDARD PROPERTIES:\n`;
    text += `--------------------\n`;
    text += `Title: ${meta.title || "(Not set)"}\n`;
    text += `Author: ${meta.author || "(Not set)"}\n`;
    text += `Subject: ${meta.subject || "(Not set)"}\n`;
    text += `Keywords: ${meta.keywords.join(", ") || "(Not set)"}\n`;
    text += `Creator Tool: ${meta.creator || "(Not set)"}\n`;
    text += `Producer Engine: ${meta.producer || "(Not set)"}\n`;
    text += `Creation Date: ${meta.creationDate ? String(meta.creationDate) : "(Not set)"}\n`;
    text += `Modification Date: ${meta.modificationDate ? String(meta.modificationDate) : "(Not set)"}\n`;
    text += `Language Tag: ${meta.language || "(Not set)"}\n\n`;
    text += `SECURITY PROFILE:\n`;
    text += `-----------------\n`;
    text += `Security Status: ${meta.isEncrypted ? "Password Protected" : "Unlocked"}\n`;
    text += `Encryption Method: ${meta.encryptionMethod}\n`;
    text += `Printing Permitted: ${meta.permissions.printing ? "Yes" : "No"}\n`;
    text += `Modifying Permitted: ${meta.permissions.modifying ? "Yes" : "No"}\n`;
    text += `Content Copying Permitted: ${meta.permissions.copying ? "Yes" : "No"}\n\n`;
    text += `TECHNICAL STRUCTURE:\n`;
    text += `--------------------\n`;
    text += `Document ID: ${meta.documentId || "(None)"}\n`;
    text += `XMP Stream Present: ${meta.hasXmp ? "Yes" : "No"}\n`;
    text += `Embedded Fonts: ${meta.embeddedFonts.join(", ") || "(None detected)"}\n`;
    text += `Bookmarks/Outlines Count: ${meta.outlines.length}\n`;
    if (meta.outlines.length > 0) {
      text += `Bookmarks: ${meta.outlines.slice(0, 10).join(" > ") + (meta.outlines.length > 10 ? "..." : "")}\n`;
    }
    text += `Page Sizes: ${meta.pageDimensions[0]?.name} (${meta.pageDimensions[0]?.widthIn.toFixed(2)}x${meta.pageDimensions[0]?.heightIn.toFixed(2)} in)\n\n`;
    
    if (Object.keys(meta.customProperties).length > 0) {
      text += `CUSTOM PROPERTIES:\n`;
      text += `------------------\n`;
      Object.entries(meta.customProperties).forEach(([k, v]) => {
        text += `${k}: ${v}\n`;
      });
      text += `\n`;
    }

    text += `----------------------------------------------------\n`;
    text += `Analyzed locally via client-side PDF Metadata Viewer.\n`;

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = url;
    downloadAnchor.download = `${activeFile.name.replace(".pdf", "")}_metadata_report.txt`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  // --- Clean Operations ---

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    if (selectedFileId === id) {
      const remaining = files.filter(f => f.id !== id);
      setSelectedFileId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const clearAllFiles = () => {
    setFiles([]);
    setSelectedFileId(null);
    setSearchQuery("");
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("pdf_viewer_history");
  };

  // Set default comparison files when entering Comparison Tab
  useEffect(() => {
    if (activeTab === "comparison" && files.length >= 2) {
      const readyFiles = files.filter(f => f.status === "ready");
      if (readyFiles.length >= 2) {
        if (!compareFileAId) setCompareFileAId(readyFiles[0].id);
        if (!compareFileBId) setCompareFileBId(readyFiles[1].id);
      }
    }
  }, [activeTab, files, compareFileAId, compareFileBId]);

  const activeFile = getActiveFile();
  const meta = activeFile?.metadata;

  return (
    <div className="space-y-8 relative">
      {/* ─── PRINT-ONLY REPORT CONTAINER ─── */}
      {activeFile && meta && (
        <>
          <style dangerouslySetInnerHTML={{ __html: `
            @media print {
              body * {
                visibility: hidden !important;
              }
              #print-section, #print-section * {
                visibility: visible !important;
              }
              #print-section {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                display: block !important;
                background: white !important;
                color: black !important;
              }
            }
          `}} />
          <div id="print-section" className="hidden print:block p-10 bg-white text-slate-900 font-sans text-sm leading-relaxed">
            <div className="border-b pb-6 mb-6">
              <h1 className="text-2xl font-bold text-slate-800">PDF Document Metadata Audit Report</h1>
              <p className="text-xs text-slate-500 mt-1">Generated locally on {new Date().toLocaleDateString()} via PDF Metadata Viewer</p>
            </div>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-1 mb-3">File Attributes</h2>
              <table className="w-full text-xs">
                <tbody>
                  <tr className="border-b"><td className="py-2 font-semibold text-slate-600">File Name:</td><td className="py-2 text-slate-800">{activeFile.name}</td></tr>
                  <tr className="border-b"><td className="py-2 font-semibold text-slate-600">File Size:</td><td className="py-2 text-slate-800">{(activeFile.size / 1024).toFixed(2)} KB ({activeFile.size} bytes)</td></tr>
                  <tr className="border-b"><td className="py-2 font-semibold text-slate-600">Page Count:</td><td className="py-2 text-slate-800">{meta.pageCount}</td></tr>
                  <tr className="border-b"><td className="py-2 font-semibold text-slate-600">PDF Version:</td><td className="py-2 text-slate-800">{meta.pdfVersion}</td></tr>
                  <tr className="border-b"><td className="py-2 font-semibold text-slate-600">Document ID:</td><td className="py-2 text-slate-800 break-all">{meta.documentId || "(None)"}</td></tr>
                </tbody>
              </table>
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-1 mb-3">Audit Summary</h2>
              <table className="w-full text-xs">
                <tbody>
                  <tr className="border-b"><td className="py-2 font-semibold text-slate-600">Privacy Risk Score:</td><td className="py-2 text-slate-800 font-bold">{calculatePrivacyScore(meta)}% ({getPrivacyLevel(calculatePrivacyScore(meta)).label})</td></tr>
                  <tr className="border-b"><td className="py-2 font-semibold text-slate-600">Document SEO Score:</td><td className="py-2 text-slate-800 font-bold">{calculateHealthScore(meta)}% ({getHealthLevel(calculateHealthScore(meta)).label})</td></tr>
                  <tr className="border-b"><td className="py-2 font-semibold text-slate-600">Security Profile:</td><td className="py-2 text-slate-800">{meta.isEncrypted ? "Password Protected" : "Unlocked (No password)"}</td></tr>
                  <tr className="border-b"><td className="py-2 font-semibold text-slate-600">XMP Stream Embedded:</td><td className="py-2 text-slate-800">{meta.hasXmp ? "Yes" : "No"}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-1 mb-3">Standard Fields</h2>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-600 border-b"><th className="p-2 text-left font-bold">Field</th><th className="p-2 text-left font-bold">Value</th></tr>
              </thead>
              <tbody>
                <tr className="border-b"><td className="p-2 font-semibold text-slate-700">Document Title</td><td className="p-2 text-slate-800">{meta.title || "(Not specified)"}</td></tr>
                <tr className="border-b"><td className="p-2 font-semibold text-slate-700">Author</td><td className="p-2 text-slate-800">{meta.author || "(Not specified)"}</td></tr>
                <tr className="border-b"><td className="p-2 font-semibold text-slate-700">Subject</td><td className="p-2 text-slate-800">{meta.subject || "(Not specified)"}</td></tr>
                <tr className="border-b"><td className="p-2 font-semibold text-slate-700">Keywords</td><td className="p-2 text-slate-800">{meta.keywords.join(", ") || "(Not specified)"}</td></tr>
                <tr className="border-b"><td className="p-2 font-semibold text-slate-700">Creator Application</td><td className="p-2 text-slate-800">{meta.creator || "(Not specified)"}</td></tr>
                <tr className="border-b"><td className="p-2 font-semibold text-slate-700">Producer Engine</td><td className="p-2 text-slate-800">{meta.producer || "(Not specified)"}</td></tr>
                <tr className="border-b"><td className="p-2 font-semibold text-slate-700">Language</td><td className="p-2 text-slate-800">{meta.language || "(Not specified)"}</td></tr>
                <tr className="border-b"><td className="p-2 font-semibold text-slate-700">Creation Date</td><td className="p-2 text-slate-800">{meta.creationDate ? String(meta.creationDate) : "(Not specified)"}</td></tr>
                <tr className="border-b"><td className="p-2 font-semibold text-slate-700">Modification Date</td><td className="p-2 text-slate-800">{meta.modificationDate ? String(meta.modificationDate) : "(Not specified)"}</td></tr>
              </tbody>
            </table>
          </div>

          {Object.keys(meta.customProperties).length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-1 mb-3">Custom Properties</h2>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 border-b"><th className="p-2 text-left font-bold">Property Key</th><th className="p-2 text-left font-bold">Value</th></tr>
                </thead>
                <tbody>
                  {Object.entries(meta.customProperties).map(([k, v]) => (
                    <tr key={k} className="border-b"><td className="p-2 font-semibold text-slate-700">{k}</td><td className="p-2 text-slate-800">{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b pb-1 mb-3">Technical Details</h2>
            <table className="w-full text-xs">
              <tbody>
                <tr className="border-b"><td className="py-2 font-semibold text-slate-700 w-1/3">Embedded Fonts:</td><td className="py-2 text-slate-800">{meta.embeddedFonts.join(", ") || "(None detected)"}</td></tr>
                <tr className="border-b"><td className="py-2 font-semibold text-slate-700">Bookmarks / Outlines:</td><td className="py-2 text-slate-800">{meta.outlines.length > 0 ? meta.outlines.join(" > ") : "(None)"}</td></tr>
                <tr className="border-b"><td className="py-2 font-semibold text-slate-700">Page Dimensions:</td><td className="py-2 text-slate-800">{meta.pageDimensions[0]?.name} ({meta.pageDimensions[0]?.widthIn.toFixed(2)}x{meta.pageDimensions[0]?.heightIn.toFixed(2)} in / {meta.pageDimensions[0]?.widthMm.toFixed(0)}x{meta.pageDimensions[0]?.heightMm.toFixed(0)} mm)</td></tr>
              </tbody>
            </table>
          </div>

          <div className="border-t pt-6 text-center text-[10px] text-slate-400">
            Nexus Calculator - PDF Metadata Viewer. Files are analyzed 100% locally inside the web browser. No files are uploaded.
          </div>
        </div>
      </>
    )}

      {/* ─── HEADER BAR WITH SECURE BADGE ─── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-850 px-6 py-4 rounded-3xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#518231]/10 rounded-2xl text-[#518231]">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-850 dark:text-slate-150">Local Secure Inspection</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
              Your PDFs remain private. Files never leave your browser.
            </p>
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-350 dark:border-slate-700 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-black text-xs cursor-pointer transition-all w-full sm:w-auto"
          >
            <History size={15} />
            History Log ({history.length})
          </button>
          
          {files.length > 0 && (
            <button
              onClick={clearAllFiles}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-red-300 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 dark:text-red-400 font-black text-xs rounded-2xl cursor-pointer transition-all w-full sm:w-auto"
            >
              <Trash2 size={15} />
              Clear Files
            </button>
          )}
        </div>
      </div>

      {/* ─── HISTORY SIDEBAR DIALOG ─── */}
      {showHistory && (
        <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-855 dark:text-slate-155 flex items-center gap-2">
              <History size={16} className="text-[#518231]" />
              Inspection History (Local Cache)
            </h3>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs font-black text-red-500 hover:text-red-650 flex items-center gap-1 cursor-pointer"
              >
                <Trash size={12} /> Clear Cache
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 py-4 font-semibold">
              No recent metadata audits. Your past file reports will appear here locally.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {history.map(item => (
                <div key={item.id} className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate w-4/5">{item.name}</p>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold shrink-0">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-semibold border-t pt-2 border-slate-100 dark:border-slate-900">
                    <span>{item.pageCount} Pages • {(item.size / 1024).toFixed(0)} KB</span>
                    <span className={`px-2 py-0.5 rounded-full ${getPrivacyLevel(item.privacyScore).color.split(" ")[0]} bg-slate-100 dark:bg-slate-900`}>
                      Privacy: {item.privacyScore}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── UPLOADER OR MAIN INSPECTOR INTERFACE ─── */}
      {files.length === 0 ? (
        <div
          ref={dropzoneRef}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-3 border-dashed rounded-3xl p-16 flex flex-col items-center justify-center gap-5 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? "border-[#518231] bg-green-50/10 dark:bg-green-950/10 scale-[0.99]"
              : "border-slate-350 hover:border-[#518231]/70 dark:border-slate-800 dark:hover:border-[#518231]/70 bg-white hover:bg-slate-50/50 dark:bg-slate-900 dark:hover:bg-slate-900/60"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileInput}
            className="hidden"
          />
          <div className="p-5 bg-slate-100 dark:bg-slate-800 rounded-3xl text-slate-400 dark:text-slate-500 transition-all shadow-sm">
            <Upload size={36} className="text-[#518231] animate-pulse" />
          </div>
          <div className="space-y-1.5">
            <p className="text-base font-black text-slate-850 dark:text-slate-150">
              Drag and drop your PDF files here
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              or click to browse from your device
            </p>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mt-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 px-4 py-1.5 rounded-full shadow-inner">
            Client-Side Safe Analysis • Standards Compliant
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* FILE BAR LISTING (LEFT 4 COLS) */}
          <div className="xl:col-span-4 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-3xl p-5 space-y-4">
              <h3 className="text-sm font-black text-slate-855 dark:text-slate-155 flex items-center gap-2">
                <FileText size={16} className="text-[#518231]" />
                Uploaded Documents ({files.length})
              </h3>
              
              <div className="max-h-[300px] overflow-y-auto space-y-2.5 custom-scrollbar pr-1">
                {files.map((fileObj) => {
                  const isActive = fileObj.id === selectedFileId;
                  return (
                    <div
                      key={fileObj.id}
                      onClick={() => {
                        if (fileObj.status !== "loading") {
                          setSelectedFileId(fileObj.id);
                        }
                      }}
                      className={`group flex items-center justify-between p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                        isActive
                          ? "bg-white dark:bg-slate-950 border-[#518231] shadow-md scale-[1.01]"
                          : "bg-white hover:bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-850"
                      }`}
                    >
                      <div className="flex items-center gap-3 w-4/5">
                        <File className={`shrink-0 ${isActive ? "text-[#518231]" : "text-slate-400"}`} size={18} />
                        <div className="truncate space-y-0.5">
                          <p className={`text-xs font-black truncate ${isActive ? "text-[#518231]" : "text-slate-800 dark:text-slate-200"}`}>
                            {fileObj.name}
                          </p>
                          <p className="text-[10px] text-slate-450 dark:text-slate-500 font-bold">
                            {(fileObj.size / 1024).toFixed(0)} KB
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1.5 shrink-0">
                        {fileObj.status === "loading" && <Loader2 className="animate-spin text-slate-400" size={14} />}
                        {fileObj.status === "ready" && <CheckCircle2 className="text-[#518231]" size={14} />}
                        {fileObj.status === "locked" && <Lock className="text-amber-500" size={14} />}
                        {fileObj.status === "error" && <AlertCircle className="text-red-500" size={14} />}
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(fileObj.id);
                          }}
                          className="p-1 rounded-lg text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ml-1"
                        >
                          <Trash size={12} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 border border-dashed border-slate-350 dark:border-slate-700 hover:border-[#518231]/70 bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-850 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-[#518231] font-bold text-xs cursor-pointer transition-all"
              >
                <Plus size={14} /> Add More Files
              </button>
            </div>
            
            {/* FILE METRICS & ACTIONS PANEL */}
            {activeFile && activeFile.status === "ready" && meta && (
              <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 rounded-3xl p-5 space-y-4">
                <h4 className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  File Properties Panel
                </h4>
                
                <div className="space-y-3 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-850">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">Pages:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-extrabold">{meta.pageCount}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">PDF Version:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-extrabold">v{meta.pdfVersion}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">Metadata Stream:</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      meta.hasXmp 
                        ? "text-emerald-600 bg-emerald-500/10" 
                        : "text-slate-500 bg-slate-500/10"
                    }`}>
                      {meta.hasXmp ? "XMP Stream" : "Info Dict Only"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">Security:</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      meta.isEncrypted 
                        ? "text-amber-600 bg-amber-500/10" 
                        : "text-green-600 bg-green-500/10"
                    }`}>
                      {meta.isEncrypted ? "Protected" : "Unprotected"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-[10px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-widest pl-1">
                    Export Analysis Report
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={exportAsJson}
                      className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 font-extrabold text-xs cursor-pointer transition-all shadow-sm"
                    >
                      <FileJson size={14} className="text-yellow-500" /> JSON
                    </button>
                    <button
                      onClick={exportAsCsv}
                      className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 font-extrabold text-xs cursor-pointer transition-all shadow-sm"
                    >
                      <FileSpreadsheet size={14} className="text-green-600" /> CSV
                    </button>
                    <button
                      onClick={exportAsTxt}
                      className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 font-extrabold text-xs cursor-pointer transition-all shadow-sm"
                    >
                      <FileText size={14} className="text-blue-500" /> Text Log
                    </button>
                    <button
                      onClick={printReport}
                      className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 py-2.5 rounded-xl text-slate-700 dark:text-slate-300 font-extrabold text-xs cursor-pointer transition-all shadow-sm"
                    >
                      <Printer size={14} className="text-purple-500" /> PDF Print
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* MAIN INSPECTION DASHBOARD (RIGHT 8 COLS) */}
          <div className="xl:col-span-8 space-y-6">
            
            {/* PASSWORD DECRYPTION BLOCK */}
            {activeFile && activeFile.status === "locked" && (
              <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 space-y-6 text-center max-w-xl mx-auto my-12 shadow-md">
                <div className="w-16 h-16 bg-amber-500/10 text-amber-500 flex items-center justify-center rounded-3xl mx-auto border border-amber-500/20 shadow-inner">
                  <Lock size={32} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-slate-905 dark:text-white">
                    Password Protected Document
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold max-w-md mx-auto">
                    "{activeFile.name}" is encrypted. Enter the document password to decrypt and extract metadata locally.
                  </p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    const pwd = fd.get("pdf_password") as string;
                    handleLockedPasswordSubmit(activeFile.id, pwd);
                  }}
                  className="space-y-4 max-w-sm mx-auto"
                >
                  <input
                    type="password"
                    name="pdf_password"
                    placeholder="Enter Document Password"
                    className="w-full text-center px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-bold text-sm outline-none focus:border-[#518231] transition-all"
                    autoFocus
                  />
                  {activeFile.errorMessage && (
                    <div className="text-red-500 text-[10px] font-black flex items-center justify-center gap-1">
                      <AlertCircle size={12} /> {activeFile.errorMessage}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => removeFile(activeFile.id)}
                      className="w-1/2 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl font-bold text-xs text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2.5 bg-[#518231] hover:bg-[#436e29] rounded-xl font-bold text-xs text-white cursor-pointer transition-all shadow-sm"
                    >
                      Decrypt File
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ERROR SUMMARY */}
            {activeFile && activeFile.status === "error" && (
              <div className="bg-red-500/5 dark:bg-red-950/10 border border-red-500/10 rounded-3xl p-8 text-center max-w-xl mx-auto my-12 space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto border border-red-500/20">
                  <AlertCircle size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-black text-slate-900 dark:text-white">Analysis Failed</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                    {activeFile.errorMessage || "This PDF is corrupted or could not be loaded."}
                  </p>
                </div>
                <button
                  onClick={() => removeFile(activeFile.id)}
                  className="px-6 py-2.5 bg-slate-900 dark:bg-white dark:text-slate-950 text-white font-extrabold text-xs rounded-xl hover:opacity-90 cursor-pointer transition-all"
                >
                  Remove File
                </button>
              </div>
            )}

            {/* READY workspace */}
            {activeFile && activeFile.status === "ready" && meta && (
              <div className="space-y-6">
                
                {/* TAB CONTROLS */}
                <div className="flex border-b border-slate-200 dark:border-slate-850 overflow-x-auto whitespace-nowrap gap-1 custom-scrollbar pb-1">
                  {[
                    { id: "dashboard", label: "Dashboard", icon: BarChart2 },
                    { id: "properties", label: "Properties", icon: Tag },
                    { id: "advanced", label: "Advanced & Fonts", icon: Settings },
                    { id: "privacy", label: "Privacy & Security", icon: ShieldAlert },
                    { id: "health", label: "Health & SEO", icon: CheckSquare },
                    { id: "comparison", label: "Comparison", icon: Columns, disabled: files.filter(f => f.status === "ready").length < 2 },
                  ].map(tab => {
                    const isActive = activeTab === tab.id;
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => !tab.disabled && setActiveTab(tab.id as any)}
                        disabled={tab.disabled}
                        className={`flex items-center gap-2 px-5 py-3 font-extrabold text-xs cursor-pointer border-b-2 transition-all shrink-0 ${
                          tab.disabled
                            ? "opacity-40 cursor-not-allowed border-transparent text-slate-400 dark:text-slate-600"
                            : isActive
                              ? "border-[#518231] text-[#518231]"
                              : "border-transparent text-slate-600 dark:text-slate-400 hover:text-[#518231]"
                        }`}
                      >
                        <Icon size={14} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* ─── TAB 1: OVERVIEW DASHBOARD ─── */}
                {activeTab === "dashboard" && (
                  <div className="space-y-6">
                    {/* Score Summary Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Privacy score gauge */}
                      {(() => {
                        const pScore = calculatePrivacyScore(meta);
                        const pLevel = getPrivacyLevel(pScore);
                        return (
                          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4 shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-center">
                              <h4 className="text-xs font-black text-slate-500 dark:text-slate-450 uppercase tracking-widest">
                                Privacy Risk evaluation
                              </h4>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${pLevel.color}`}>
                                {pLevel.label}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-6 py-2">
                              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                                {/* SVG Circular track */}
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="48" cy="48" r="40" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="8" fill="transparent" />
                                  <circle cx="48" cy="48" r="40" stroke="currentColor" className={
                                    pScore <= 30 ? "text-green-500" : pScore <= 60 ? "text-amber-500" : "text-red-500"
                                  } strokeWidth="8" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 - (251.2 * pScore) / 100} strokeLinecap="round" />
                                </svg>
                                <span className="absolute text-lg font-black text-slate-800 dark:text-white">
                                  {pScore}%
                                </span>
                              </div>
                              <div className="space-y-1.5">
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                  Metadata Exposure Rating
                                </p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                                  {pScore <= 30 
                                    ? "Excellent privacy. Minimal tracking tags or credentials found inside the document structure." 
                                    : pScore <= 60 
                                      ? "Moderate risk. Creation dates, tools, and basic system keys are visible." 
                                      : "High risk. Contains author details, creation timestamps, and embedded tracking streams."}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                      {/* SEO score gauge */}
                      {(() => {
                        const hScore = calculateHealthScore(meta);
                        const hLevel = getHealthLevel(hScore);
                        return (
                          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4 shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-center">
                              <h4 className="text-xs font-black text-slate-500 dark:text-slate-450 uppercase tracking-widest">
                                Document Optimization
                              </h4>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black border ${hLevel.color}`}>
                                {hLevel.label}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-6 py-2">
                              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="48" cy="48" r="40" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="8" fill="transparent" />
                                  <circle cx="48" cy="48" r="40" stroke="currentColor" className={
                                    hScore >= 80 ? "text-green-500" : hScore >= 50 ? "text-amber-500" : "text-red-500"
                                  } strokeWidth="8" fill="transparent" strokeDasharray={251.2} strokeDashoffset={251.2 - (251.2 * hScore) / 100} strokeLinecap="round" />
                                </svg>
                                <span className="absolute text-lg font-black text-slate-800 dark:text-white">
                                  {hScore}%
                                </span>
                              </div>
                              <div className="space-y-1.5">
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                                  SEO & Accessibility Rating
                                </p>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                                  {hScore >= 80 
                                    ? "Perfect metadata optimization for search engines and assistive technology." 
                                    : hScore >= 50 
                                      ? "Decent quality. Add descriptive keywords and language tags to reach 100%." 
                                      : "Poor indexing quality. Lacks SEO Title, description tags, and language parameters."}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}

                    </div>

                    {/* Quick overview metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Security stats card */}
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4 shadow-sm">
                        <h4 className="text-xs font-black text-slate-500 dark:text-slate-450 uppercase tracking-widest">
                          Security Profile
                        </h4>
                        
                        <div className="space-y-3 pt-2">
                          <div className="flex items-center justify-between text-xs font-bold">
                            <span className="text-slate-500 dark:text-slate-400">Encryption Method</span>
                            <span className="text-slate-850 dark:text-slate-150">{meta.encryptionMethod}</span>
                          </div>
                          
                          <div className="border-t border-slate-100 dark:border-slate-850 pt-3 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-500 dark:text-slate-450">Printing Permitted</span>
                              <span className={meta.permissions.printing ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                                {meta.permissions.printing ? "Allowed" : "Restricted"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-500 dark:text-slate-450">Modifying / Editing</span>
                              <span className={meta.permissions.modifying ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                                {meta.permissions.modifying ? "Allowed" : "Restricted"}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-500 dark:text-slate-450">Copying Content</span>
                              <span className={meta.permissions.copying ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                                {meta.permissions.copying ? "Allowed" : "Restricted"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Technical Details overview */}
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4 shadow-sm">
                        <h4 className="text-xs font-black text-slate-500 dark:text-slate-450 uppercase tracking-widest">
                          Technical Overview
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-850">
                            <span className="text-[10px] text-slate-400 uppercase font-black">Page Size (1st Page)</span>
                            <p className="text-xs font-black text-slate-800 dark:text-slate-200 mt-1 truncate">
                              {meta.pageDimensions[0] 
                                ? `${meta.pageDimensions[0].name} (${meta.pageDimensions[0].widthIn.toFixed(1)}x${meta.pageDimensions[0].heightIn.toFixed(1)} in)`
                                : "N/A"}
                            </p>
                          </div>
                          
                          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-850">
                            <span className="text-[10px] text-slate-400 uppercase font-black">Embedded Fonts</span>
                            <p className="text-xs font-black text-slate-800 dark:text-slate-200 mt-1">
                              {meta.embeddedFonts.length} Fonts
                            </p>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-850">
                            <span className="text-[10px] text-slate-400 uppercase font-black">Outline Bookmarks</span>
                            <p className="text-xs font-black text-slate-800 dark:text-slate-200 mt-1">
                              {meta.outlines.length} outline links
                            </p>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-850">
                            <span className="text-[10px] text-slate-400 uppercase font-black">Custom Properties</span>
                            <p className="text-xs font-black text-slate-800 dark:text-slate-200 mt-1">
                              {Object.keys(meta.customProperties).length} Fields
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* ─── TAB 2: DETAILED PROPERTIES ─── */}
                {activeTab === "properties" && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                        Document Metadata Dictionary
                      </h3>
                      
                      {/* Search bar inside properties */}
                      <div className="relative w-full sm:w-64">
                        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-450 dark:text-slate-500" />
                        <input
                          type="text"
                          placeholder="Search properties..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 border border-slate-250 dark:border-slate-850 rounded-xl text-xs bg-slate-50 dark:bg-slate-950 outline-none focus:border-[#518231] font-semibold"
                        />
                      </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-200 dark:border-slate-850 font-black uppercase text-[10px]">
                            <th className="p-4 text-left w-1/3">Property Key</th>
                            <th className="p-4 text-left">Value</th>
                            <th className="p-4 text-right w-20">Copy</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                          {[
                            { key: "Title", val: meta.title, icon: FileText },
                            { key: "Author", val: meta.author, icon: User },
                            { key: "Subject", val: meta.subject, icon: Info },
                            { key: "Keywords", val: meta.keywords.join(", "), icon: Tag },
                            { key: "Creator Tool", val: meta.creator, icon: Settings },
                            { key: "Producer Engine", val: meta.producer, icon: RefreshCw },
                            { key: "Language", val: meta.language, icon: Languages },
                            { key: "Creation Date", val: meta.creationDate ? String(meta.creationDate) : "", icon: Calendar },
                            { key: "Modification Date", val: meta.modificationDate ? String(meta.modificationDate) : "", icon: Calendar },
                            { key: "Document ID", val: meta.documentId, icon: ShieldCheck },
                            ...Object.entries(meta.customProperties).map(([k, v]) => ({
                              key: `Custom: ${k}`,
                              val: v,
                              icon: Sparkles
                            }))
                          ]
                            .filter(item => {
                              if (!searchQuery) return true;
                              return item.key.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                     (item.val && item.val.toLowerCase().includes(searchQuery.toLowerCase()));
                            })
                            .map((item, idx) => {
                              const Icon = item.icon;
                              const uniqueKey = `prop-${idx}`;
                              return (
                                <tr key={uniqueKey} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40 transition-colors">
                                  <td className="p-4 font-extrabold text-slate-700 dark:text-slate-350 flex items-center gap-2">
                                    <Icon size={14} className="text-[#518231] shrink-0" />
                                    <span>{item.key}</span>
                                  </td>
                                  <td className="p-4 text-slate-800 dark:text-slate-200 font-semibold max-w-md break-all leading-normal">
                                    {item.val || <span className="text-slate-400 dark:text-slate-650 italic">Not set</span>}
                                  </td>
                                  <td className="p-4 text-right">
                                    {item.val && (
                                      <div className="relative inline-block">
                                        <button
                                          onClick={() => copyToClipboard(item.val || "", uniqueKey)}
                                          className="p-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-450 dark:text-slate-500 hover:text-slate-700 cursor-pointer transition-all"
                                        >
                                          {copiedKey === uniqueKey ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                                        </button>
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* ─── TAB 3: ADVANCED & FONTS ─── */}
                {activeTab === "advanced" && (
                  <div className="space-y-6">
                    
                    {/* Embedded Fonts */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4 shadow-sm">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                        Embedded Document Fonts ({meta.embeddedFonts.length})
                      </h3>
                      
                      {meta.embeddedFonts.length === 0 ? (
                        <p className="text-xs text-slate-500 dark:text-slate-400 py-3 font-semibold">
                          No embedded font names parsed. Fonts are either standard core fonts (like Helvetica, Times) or missing from dictionary indexes.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2.5 pt-2">
                          {meta.embeddedFonts.map((fontName, idx) => (
                            <span
                              key={fontName + idx}
                              className="px-3.5 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-xl text-xs font-extrabold text-slate-700 dark:text-slate-350"
                            >
                              {fontName}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Page dimensions list */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4 shadow-sm">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                        Page Dimensions Checklist
                      </h3>
                      
                      <div className="border border-slate-200 dark:border-slate-850 rounded-2xl overflow-hidden">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-slate-50 dark:bg-slate-950 text-slate-550 border-b border-slate-200 dark:border-slate-850 font-black uppercase text-[10px]">
                              <th className="p-3 text-left">Page</th>
                              <th className="p-3 text-left">Dimensions (Points)</th>
                              <th className="p-3 text-left">Dimensions (Inches)</th>
                              <th className="p-3 text-left">Dimensions (Metric)</th>
                              <th className="p-3 text-left">Format Name</th>
                              <th className="p-3 text-right">Orientation</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                            {meta.pageDimensions.slice(0, 10).map((dim, idx) => (
                              <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/40 font-semibold">
                                <td className="p-3 font-bold text-slate-800 dark:text-white">Page {idx + 1}</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">{dim.widthPt.toFixed(0)} x {dim.heightPt.toFixed(0)} pt</td>
                                <td className="p-3 text-slate-800 dark:text-slate-200">{dim.widthIn.toFixed(2)} x {dim.heightIn.toFixed(2)} in</td>
                                <td className="p-3 text-slate-600 dark:text-slate-400">{dim.widthMm.toFixed(0)} x {dim.heightMm.toFixed(0)} mm</td>
                                <td className="p-3"><span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-md text-[10px] font-black">{dim.name}</span></td>
                                <td className="p-3 text-right">{dim.orientation}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {meta.pageCount > 10 && (
                        <p className="text-[10px] text-slate-450 dark:text-slate-500 italic pt-1 pl-1">
                          Showing first 10 pages. Total page count is {meta.pageCount}.
                        </p>
                      )}
                    </div>

                    {/* Outlines / Bookmarks structural list */}
                    {meta.outlines.length > 0 && (
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4 shadow-sm">
                        <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                          Document Structural Outline Bookmarks ({meta.outlines.length})
                        </h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar border border-slate-100 dark:border-slate-850 rounded-2xl p-4 bg-slate-50 dark:bg-slate-950 font-mono text-[11px] leading-relaxed text-slate-700 dark:text-slate-350">
                          {meta.outlines.map((title, i) => (
                            <div key={i} className="flex gap-2">
                              <span className="text-slate-400"># {i + 1}</span>
                              <span className="font-semibold">{title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

                {/* ─── TAB 4: PRIVACY & SECURITY ─── */}
                {activeTab === "privacy" && (
                  <div className="space-y-6">
                    {/* Privacy Audit Score Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4 shadow-sm">
                      <div className="flex justify-between items-center border-b pb-4 border-slate-100 dark:border-slate-850">
                        <div>
                          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                            Privacy Leak Audit
                          </h3>
                          <p className="text-[11px] text-slate-550 dark:text-slate-400 font-semibold mt-1">
                            Evaluates tracking keys and personal parameters embedded inside raw structures.
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Risk Score</span>
                          <span className="text-2xl font-black text-slate-850 dark:text-slate-150">
                            {calculatePrivacyScore(meta)}%
                          </span>
                        </div>
                      </div>

                      {/* Diagnostic list */}
                      <div className="space-y-4 pt-2">
                        <h4 className="text-xs font-black text-slate-700 dark:text-slate-300">Diagnostic Findings:</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            {
                              label: "Author Metadata",
                              detected: !!meta.author,
                              desc: "Contains names or system username attributes.",
                              severity: "high"
                            },
                            {
                              label: "Creator Application Details",
                              detected: !!meta.creator,
                              desc: "Logs compilation software tools (e.g. Word, Acrobat).",
                              severity: "medium"
                            },
                            {
                              label: "Creation & Modification dates",
                              detected: !!meta.creationDate || !!meta.modificationDate,
                              desc: "Tracks exact timestamps of document edits.",
                              severity: "medium"
                            },
                            {
                              label: "XMP Metadata Stream",
                              detected: meta.hasXmp,
                              desc: "XML stream containing editing history layers.",
                              severity: "high"
                            },
                            {
                              label: "Document Identifier Hash",
                              detected: !!meta.documentId,
                              desc: "Unique document revision ID in trailer catalog.",
                              severity: "low"
                            },
                            {
                              label: "Custom Properties Dictionary",
                              detected: Object.keys(meta.customProperties).length > 0,
                              desc: "Industry-specific custom parameters (e.g. Bates codes).",
                              severity: "medium"
                            }
                          ].map((diag, index) => {
                            const badgeColor = diag.detected 
                              ? diag.severity === "high" 
                                ? "text-red-500 bg-red-500/10 border-red-500/20" 
                                : "text-amber-500 bg-amber-500/10 border-amber-500/20"
                              : "text-green-500 bg-green-500/10 border-green-500/20";
                            return (
                              <div key={index} className="flex gap-3 p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-black text-slate-800 dark:text-slate-200">{diag.label}</span>
                                    <span className={`px-2 py-0.5 text-[9px] font-black rounded-full border ${badgeColor}`}>
                                      {diag.detected ? "Found" : "Clear"}
                                    </span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{diag.desc}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Permissions list */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4 shadow-sm">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                        Document Restriction Rights
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        {[
                          {
                            label: "Printing Rights",
                            allowed: meta.permissions.printing,
                            desc: "Indicates if the document allows sending to paper printer channels."
                          },
                          {
                            label: "Modification Rights",
                            allowed: meta.permissions.modifying,
                            desc: "Indicates if file structures allow adding annotations, fields, or modifying content."
                          },
                          {
                            label: "Copying Rights",
                            allowed: meta.permissions.copying,
                            desc: "Indicates if copy/paste text selection extraction is permitted."
                          }
                        ].map((perm, idx) => (
                          <div key={idx} className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 p-5 rounded-2xl flex flex-col justify-between h-36">
                            <span className="text-xs font-black text-slate-800 dark:text-slate-200">{perm.label}</span>
                            <div className="py-2.5">
                              <span className={`px-3 py-1 text-xs font-black rounded-xl border ${
                                perm.allowed
                                  ? "text-green-500 bg-green-500/10 border-green-500/20"
                                  : "text-red-500 bg-red-500/10 border-red-500/20"
                              }`}>
                                {perm.allowed ? "Allowed" : "Restricted"}
                              </span>
                            </div>
                            <p className="text-[9px] text-slate-500 dark:text-slate-400 font-bold leading-normal">{perm.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                )}

                {/* ─── TAB 5: HEALTH & SEO ─── */}
                {activeTab === "health" && (
                  <div className="space-y-6">
                    
                    {/* Overall audit rating */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4 shadow-sm">
                      <div className="flex justify-between items-center border-b pb-4 border-slate-100 dark:border-slate-850">
                        <div>
                          <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                            Document SEO & Accessibility Audit
                          </h3>
                          <p className="text-[11px] text-slate-550 dark:text-slate-400 font-semibold mt-1">
                            Analyzes optimization factors for search engines and screen-readers.
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Health Score</span>
                          <span className="text-2xl font-black text-slate-850 dark:text-slate-150">
                            {calculateHealthScore(meta)}%
                          </span>
                        </div>
                      </div>

                      {/* Checklist */}
                      <div className="space-y-4 pt-2">
                        <h4 className="text-xs font-black text-slate-700 dark:text-slate-300">Auditing Checks:</h4>
                        
                        <div className="space-y-2.5">
                          {[
                            {
                              label: "SEO Page Title",
                              check: !!meta.title,
                              tip: "Optimal Title should be descriptive (10-60 characters).",
                              status: meta.title 
                                ? meta.title.length >= 10 && meta.title.length <= 60 
                                  ? "Excellent" 
                                  : "Title too short/long"
                                : "Missing Title"
                            },
                            {
                              label: "Keywords Dictionary",
                              check: meta.keywords.length >= 3,
                              tip: "Should contain at least 3 descriptive terms separating subjects.",
                              status: meta.keywords.length >= 3 
                                ? "Optimized" 
                                : meta.keywords.length > 0 
                                  ? "Add more keywords" 
                                  : "Missing keywords"
                            },
                            {
                              label: "Description/Subject Summary",
                              check: !!meta.subject,
                              tip: "Brief overview summarizing the document's main intent.",
                              status: meta.subject ? "Present" : "Missing Subject"
                            },
                            {
                              label: "Accessibility Language Tag",
                              check: !!meta.language,
                              tip: "Instructs screen readers on pronunciation rules and language profiles.",
                              status: meta.language ? `Configured (${meta.language})` : "Missing language code tag"
                            }
                          ].map((item, index) => (
                            <div key={index} className="flex items-start justify-between p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-2xl">
                              <div className="space-y-1">
                                <p className="text-xs font-black text-slate-800 dark:text-slate-200">{item.label}</p>
                                <p className="text-[10px] text-slate-550 dark:text-slate-400 font-semibold">{item.tip}</p>
                              </div>
                              <span className={`px-2.5 py-1 text-[10px] font-black rounded-lg border flex items-center gap-1.5 shrink-0 ${
                                item.check 
                                  ? "text-green-500 bg-green-500/10 border-green-500/20" 
                                  : "text-amber-500 bg-amber-500/10 border-amber-500/20"
                              }`}>
                                {item.check ? <CheckSquare size={12} /> : <XCircle size={12} />}
                                {item.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* SEO Recommendations */}
                    <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-4">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                        Actionable Recommendations
                      </h3>
                      
                      <ul className="space-y-3 pt-1">
                        {calculateHealthScore(meta) === 100 ? (
                          <li className="flex gap-3 text-xs font-semibold text-slate-700 dark:text-slate-350">
                            <span className="w-5 h-5 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0">✓</span>
                            <span>Your document is fully optimized! Metadata is SEO and accessibility ready.</span>
                          </li>
                        ) : (
                          <>
                            {!meta.title && (
                              <li className="flex gap-3 text-xs font-semibold text-slate-700 dark:text-slate-350">
                                <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">!</span>
                                <span>Add a descriptive **Title** to allow search engines to display the document name in results.</span>
                              </li>
                            )}
                            {meta.title && (meta.title.length < 10 || meta.title.length > 60) && (
                              <li className="flex gap-3 text-xs font-semibold text-slate-700 dark:text-slate-350">
                                <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">!</span>
                                <span>Optimize Title length (currently {meta.title.length} characters) to be between 10 and 60 characters.</span>
                              </li>
                            )}
                            {meta.keywords.length < 3 && (
                              <li className="flex gap-3 text-xs font-semibold text-slate-700 dark:text-slate-350">
                                <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">!</span>
                                <span>Inject at least 3 comma-separated **Keywords** to improve indexing.</span>
                              </li>
                            )}
                            {!meta.subject && (
                              <li className="flex gap-3 text-xs font-semibold text-slate-700 dark:text-slate-350">
                                <span className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">!</span>
                                <span>Define a **Subject** to serve as the document description snippet.</span>
                              </li>
                            )}
                            {!meta.language && (
                              <li className="flex gap-3 text-xs font-semibold text-slate-700 dark:text-slate-350">
                                <span className="w-5 h-5 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">!</span>
                                <span>Configure the **Language code** (e.g. 'en-US') to guarantee screen-reader compatibility.</span>
                              </li>
                            )}
                          </>
                        )}
                      </ul>
                    </div>

                  </div>
                )}

                {/* ─── TAB 6: METADATA COMPARISON ─── */}
                {activeTab === "comparison" && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 p-6 rounded-3xl space-y-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                      <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                        Document Properties Comparison
                      </h3>
                      
                      {/* Dropdowns to select PDF A and PDF B */}
                      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        <div className="space-y-1 w-full sm:w-44">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">PDF Document A</label>
                          <select
                            value={compareFileAId}
                            onChange={(e) => setCompareFileAId(e.target.value)}
                            className="w-full text-xs font-bold p-2 bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl outline-none"
                          >
                            {files.filter(f => f.status === "ready").map(f => (
                              <option key={f.id} value={f.id}>{f.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <span className="text-slate-400 font-extrabold text-xs mt-4 hidden sm:inline">VS</span>
                        
                        <div className="space-y-1 w-full sm:w-44">
                          <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">PDF Document B</label>
                          <select
                            value={compareFileBId}
                            onChange={(e) => setCompareFileBId(e.target.value)}
                            className="w-full text-xs font-bold p-2 bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-800 rounded-xl outline-none"
                          >
                            {files.filter(f => f.status === "ready").map(f => (
                              <option key={f.id} value={f.id}>{f.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Comparison table */}
                    {(() => {
                      const fileA = files.find(f => f.id === compareFileAId)?.metadata;
                      const fileB = files.find(f => f.id === compareFileBId)?.metadata;

                      if (!fileA || !fileB) {
                        return (
                          <p className="text-xs text-slate-500 dark:text-slate-400 py-6 text-center font-semibold">
                            Select two valid loaded files to compare.
                          </p>
                        );
                      }

                      const comparisonKeys = [
                        { key: "Title", valA: fileA.title, valB: fileB.title },
                        { key: "Author", valA: fileA.author, valB: fileB.author },
                        { key: "Subject", valA: fileA.subject, valB: fileB.subject },
                        { key: "Keywords", valA: fileA.keywords.join(", "), valB: fileB.keywords.join(", ") },
                        { key: "Creator Tool", valA: fileA.creator, valB: fileB.creator },
                        { key: "Producer Engine", valA: fileA.producer, valB: fileB.producer },
                        { key: "Language", valA: fileA.language, valB: fileB.language },
                        { key: "Creation Date", valA: fileA.creationDate ? String(fileA.creationDate) : "", valB: fileB.creationDate ? String(fileB.creationDate) : "" },
                        { key: "Modification Date", valA: fileA.modificationDate ? String(fileA.modificationDate) : "", valB: fileB.modificationDate ? String(fileB.modificationDate) : "" },
                        { key: "PDF Version", valA: fileA.pdfVersion, valB: fileB.pdfVersion },
                        { key: "Page Count", valA: fileA.pageCount.toString(), valB: fileB.pageCount.toString() },
                        { key: "File Size", valA: `${(fileA.fileSize / 1024).toFixed(0)} KB`, valB: `${(fileB.fileSize / 1024).toFixed(0)} KB` },
                        { key: "Privacy Risk Score", valA: `${calculatePrivacyScore(fileA)}%`, valB: `${calculatePrivacyScore(fileB)}%` },
                        { key: "Health Score", valA: `${calculateHealthScore(fileA)}%`, valB: `${calculateHealthScore(fileB)}%` }
                      ];

                      return (
                        <div className="border border-slate-200 dark:border-slate-850 rounded-2xl overflow-hidden shadow-sm">
                          <table className="w-full text-xs">
                            <thead>
                              <tr className="bg-slate-50 dark:bg-slate-950 text-slate-500 border-b border-slate-200 dark:border-slate-850 font-black uppercase text-[10px]">
                                <th className="p-4 text-left w-1/4">Metadata Property</th>
                                <th className="p-4 text-left w-3/8">Document A</th>
                                <th className="p-4 text-left w-3/8">Document B</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                              {comparisonKeys.map((item) => {
                                const isDifferent = item.valA !== item.valB;
                                return (
                                  <tr
                                    key={item.key}
                                    className={`transition-colors ${
                                      isDifferent 
                                        ? "bg-amber-500/5 dark:bg-amber-500/5" 
                                        : "hover:bg-slate-50/50 dark:hover:bg-slate-850/40"
                                    }`}
                                  >
                                    <td className="p-4 font-extrabold text-slate-700 dark:text-slate-350">
                                      {item.key}
                                    </td>
                                    <td className={`p-4 font-semibold break-all leading-normal ${
                                      isDifferent ? "text-amber-600 dark:text-amber-400" : "text-slate-700 dark:text-slate-300"
                                    }`}>
                                      {item.valA || <span className="text-slate-400 italic">Not set</span>}
                                    </td>
                                    <td className={`p-4 font-semibold break-all leading-normal ${
                                      isDifferent ? "text-amber-600 dark:text-amber-400" : "text-slate-700 dark:text-slate-300"
                                    }`}>
                                      {item.valB || <span className="text-slate-400 italic">Not set</span>}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      );
                    })()}
                  </div>
                )}

              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
