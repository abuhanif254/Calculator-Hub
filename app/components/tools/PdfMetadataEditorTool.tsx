"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FileText, Upload, Trash2, Settings, AlertCircle, Loader2, Download,
  History, Check, ShieldCheck, Eye, EyeOff, Plus, File, Lock, Unlock, 
  Trash, Save, Copy, CheckCircle2, RefreshCw, Sparkles, HelpCircle, 
  Languages, Tag, Calendar, User, Info, ArrowRight, ShieldAlert
} from "lucide-react";
import { PDFDocument, PDFName, PDFString, PDFHexString } from "pdf-lib";
import JSZip from "jszip";
import { decryptPDF } from "@pdfsmaller/pdf-decrypt";

// --- Types ---

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
}

interface MetadataEditorFile {
  id: string;
  file: File;
  name: string;
  size: number;
  status: "loading" | "ready" | "error" | "saved" | "locked";
  errorMessage?: string;
  originalMetadata: PDFMetadata | null;
  updatedMetadata: PDFMetadata | null;
  password?: string;
  requiresPassword?: boolean;
}

interface MetadataTemplate {
  id: string;
  name: string;
  title?: string;
  author?: string;
  subject?: string;
  keywords?: string[];
  creator?: string;
  producer?: string;
  language?: string;
  customProperties?: Record<string, string>;
  isPrivacyMode?: boolean;
}

interface EditorHistoryItem {
  id: string;
  timestamp: number;
  filesCount: number;
  totalSize: number;
  operationType: "edit" | "clean" | "template";
}

// --- Predefined Constants ---

const LANGUAGE_OPTIONS = [
  { code: "", name: "Not Specified" },
  { code: "en", name: "English (en)" },
  { code: "en-US", name: "English - United States (en-US)" },
  { code: "en-GB", name: "English - United Kingdom (en-GB)" },
  { code: "es", name: "Spanish (es)" },
  { code: "es-ES", name: "Spanish - Spain (es-ES)" },
  { code: "fr", name: "French (fr)" },
  { code: "de", name: "German (de)" },
  { code: "it", name: "Italian (it)" },
  { code: "pt", name: "Portuguese (pt)" },
  { code: "zh", name: "Chinese (zh)" },
  { code: "ja", name: "Japanese (ja)" },
  { code: "ru", name: "Russian (ru)" },
  { code: "ar", name: "Arabic (ar)" },
];

const CUSTOM_PRESETS = [
  { label: "Document ID", key: "DocumentID" },
  { label: "Department", key: "Department" },
  { label: "Project Name", key: "ProjectName" },
  { label: "Company", key: "Company" },
  { label: "Version", key: "Version" },
  { label: "Reference Number", key: "ReferenceNumber" },
  { label: "Security Classification", key: "SecurityClass" },
  { label: "Author Organization", key: "AuthorOrg" },
];

export function PdfMetadataEditorTool() {
  const [files, setFiles] = useState<MetadataEditorFile[]>([]);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processedDownloads, setProcessedDownloads] = useState<{ name: string; bytes: Uint8Array }[]>([]);
  
  // Custom metadata input state
  const [customKeyInput, setCustomKeyInput] = useState<string>("");
  const [customValInput, setCustomValInput] = useState<string>("");
  const [selectedPreset, setSelectedPreset] = useState<string>("");

  // Keyword tags input state
  const [newKeywordTag, setNewKeywordTag] = useState<string>("");

  // Templates state
  const [templates, setTemplates] = useState<MetadataTemplate[]>([]);
  const [showSaveTemplateModal, setShowSaveTemplateModal] = useState<boolean>(false);
  const [newTemplateName, setNewTemplateName] = useState<string>("");

  // History state
  const [history, setHistory] = useState<EditorHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Privacy Sanitization Mode
  const [privacyModeActive, setPrivacyModeActive] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  // Load Saved Templates and History from LocalStorage
  useEffect(() => {
    const savedTemplates = localStorage.getItem("pdf_metadata_templates");
    if (savedTemplates) {
      try {
        setTemplates(JSON.parse(savedTemplates));
      } catch (e) {
        console.warn("Failed to load templates", e);
      }
    } else {
      // Seed default templates
      const defaultTemplates: MetadataTemplate[] = [
        {
          id: "t-privacy",
          name: "Anonymous / Clean Properties",
          author: "",
          creator: "",
          producer: "",
          language: "",
          customProperties: {},
          isPrivacyMode: true
        },
        {
          id: "t-corp",
          name: "Corporate Standard Template",
          author: "Nexus Corporation",
          creator: "Corporate Publishing System",
          producer: "Nexus Platform Engine",
          language: "en-US",
          customProperties: {
            "Company": "Nexus Corp",
            "SecurityClass": "Internal Only"
          },
          isPrivacyMode: false
        }
      ];
      setTemplates(defaultTemplates);
      localStorage.setItem("pdf_metadata_templates", JSON.stringify(defaultTemplates));
    }

    const savedHistory = localStorage.getItem("pdf_metadata_history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.warn("Failed to load history", e);
      }
    }
  }, []);

  // Sync templates to LocalStorage
  const saveTemplatesToStorage = (updated: MetadataTemplate[]) => {
    setTemplates(updated);
    localStorage.setItem("pdf_metadata_templates", JSON.stringify(updated));
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

  // Parse PDF version, pages, and metadata safely
  const parsePdfFile = async (file: File, password = ""): Promise<PDFMetadata> => {
    const originalBuffer = await file.arrayBuffer();
    let loadTarget: ArrayBuffer | Uint8Array = originalBuffer;
    
    // 1. Extract PDF Version from first bytes
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

    // 3. Extract standard values
    const title = pdfDoc.getTitle() || "";
    const author = pdfDoc.getAuthor() || "";
    const subject = pdfDoc.getSubject() || "";
    
    const rawKeywords = pdfDoc.getKeywords() || "";
    // Clean spaces and commas to return a clean keyword array
    const keywords = rawKeywords.split(/[\s,]+/).map(k => k.trim()).filter(Boolean);

    const creator = pdfDoc.getCreator() || "";
    const producer = pdfDoc.getProducer() || "";

    let creationDate: Date | null = null;
    let modificationDate: Date | null = null;

    try {
      const cd = pdfDoc.getCreationDate();
      if (cd && !isNaN(cd.getTime())) creationDate = cd;
    } catch {
      // Swallowed
    }

    try {
      const md = pdfDoc.getModificationDate();
      if (md && !isNaN(md.getTime())) modificationDate = md;
    } catch {
      // Swallowed
    }

    // 4. Extract catalog language
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
    } catch {
      // Swallowed
    }

    // 5. Extract Custom keys
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
    } catch {
      // Swallowed
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
      pageCount
    };
  };

  const processFilesList = async (incomingFiles: FileList | null) => {
    if (!incomingFiles) return;

    const newFiles: MetadataEditorFile[] = [];
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
        originalMetadata: null,
        updatedMetadata: null
      });
    }

    // Append loading skeletons to UI
    setFiles(prev => {
      const merged = [...prev, ...newFiles];
      // Auto select the first newly added file if nothing selected
      if (!selectedFileId && merged.length > 0) {
        setSelectedFileId(merged[0].id);
      }
      return merged;
    });

    // Parse each file
    for (const newFile of newFiles) {
      try {
        const meta = await parsePdfFile(newFile.file);
        setFiles(prev => prev.map(f => f.id === newFile.id ? {
          ...f,
          status: "ready",
          originalMetadata: meta,
          updatedMetadata: JSON.parse(JSON.stringify(meta)) // deep copy
        } : f));
      } catch (err: any) {
        // Check if encryption password error
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
          console.warn("Failed to load PDF metadata", err);
          setFiles(prev => prev.map(f => f.id === newFile.id ? {
            ...f,
            status: "error",
            errorMessage: err.message || "Corrupted PDF or unsupported layout format."
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
      setFiles(prev => prev.map(f => f.id === fileId ? {
        ...f,
        status: "ready",
        originalMetadata: meta,
        updatedMetadata: JSON.parse(JSON.stringify(meta)),
        password: pass
      } : f));
    } catch {
      setFiles(prev => prev.map(f => f.id === fileId ? {
        ...f,
        status: "locked",
        errorMessage: "Incorrect password. Please try again."
      } : f));
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const filtered = prev.filter(f => f.id !== id);
      if (selectedFileId === id) {
        setSelectedFileId(filtered.length > 0 ? filtered[0].id : null);
      }
      return filtered;
    });
  };

  const clearAllFiles = () => {
    setFiles([]);
    setSelectedFileId(null);
    setProcessedDownloads([]);
    setPrivacyModeActive(false);
  };

  // Helper to modify metadata properties of the currently selected file
  const updateSelectedField = (field: keyof PDFMetadata, value: any) => {
    if (!selectedFileId) return;
    setFiles(prev => prev.map(f => {
      if (f.id === selectedFileId && f.updatedMetadata) {
        return {
          ...f,
          updatedMetadata: {
            ...f.updatedMetadata,
            [field]: value
          }
        };
      }
      return f;
    }));
  };

  const handleAddKeyword = () => {
    if (!newKeywordTag.trim() || !selectedFileId) return;
    const targetFile = files.find(f => f.id === selectedFileId);
    if (!targetFile || !targetFile.updatedMetadata) return;

    const currentKeywords = targetFile.updatedMetadata.keywords || [];
    if (!currentKeywords.includes(newKeywordTag.trim())) {
      updateSelectedField("keywords", [...currentKeywords, newKeywordTag.trim()]);
    }
    setNewKeywordTag("");
  };

  const handleRemoveKeyword = (tagToRemove: string) => {
    if (!selectedFileId) return;
    const targetFile = files.find(f => f.id === selectedFileId);
    if (!targetFile || !targetFile.updatedMetadata) return;

    const currentKeywords = targetFile.updatedMetadata.keywords || [];
    updateSelectedField("keywords", currentKeywords.filter(k => k !== tagToRemove));
  };

  const handleAddCustomProp = () => {
    if (!customKeyInput.trim() || !customValInput.trim() || !selectedFileId) return;
    const targetFile = files.find(f => f.id === selectedFileId);
    if (!targetFile || !targetFile.updatedMetadata) return;

    const currentCustom = { ...(targetFile.updatedMetadata.customProperties || {}) };
    currentCustom[customKeyInput.trim()] = customValInput.trim();
    updateSelectedField("customProperties", currentCustom);

    setCustomKeyInput("");
    setCustomValInput("");
    setSelectedPreset("");
  };

  const handleRemoveCustomProp = (keyToRemove: string) => {
    if (!selectedFileId) return;
    const targetFile = files.find(f => f.id === selectedFileId);
    if (!targetFile || !targetFile.updatedMetadata) return;

    const currentCustom = { ...(targetFile.updatedMetadata.customProperties || {}) };
    delete currentCustom[keyToRemove];
    updateSelectedField("customProperties", currentCustom);
  };

  // Toggle privacy mode: if active, strips dates/creators/authors and sets flag
  const applyPrivacyMode = () => {
    if (!selectedFileId) return;
    setFiles(prev => prev.map(f => {
      if (f.id === selectedFileId && f.updatedMetadata) {
        return {
          ...f,
          updatedMetadata: {
            ...f.updatedMetadata,
            author: "",
            creator: "",
            producer: "",
            creationDate: null,
            modificationDate: null,
            customProperties: {}
          }
        };
      }
      return f;
    }));
    setPrivacyModeActive(true);
  };

  // Save metadata to file bytes via pdf-lib
  const compilePdfMetadata = async (fileObj: MetadataEditorFile): Promise<Uint8Array> => {
    if (!fileObj.updatedMetadata) {
      const buf = await fileObj.file.arrayBuffer();
      return new Uint8Array(buf);
    }

    const originalArrayBuffer = await fileObj.file.arrayBuffer();
    let loadTarget: ArrayBuffer | Uint8Array = originalArrayBuffer;
    if (fileObj.password) {
      loadTarget = await decryptPDF(new Uint8Array(originalArrayBuffer), fileObj.password);
    }

    const pdfDoc = await PDFDocument.load(loadTarget, {
      ignoreEncryption: true
    });

    const target = fileObj.updatedMetadata;

    // Apply standard values
    pdfDoc.setTitle(target.title || "");
    pdfDoc.setAuthor(target.author || "");
    pdfDoc.setSubject(target.subject || "");
    
    // pdf-lib setKeywords accepts string[]
    pdfDoc.setKeywords(target.keywords || []);

    pdfDoc.setCreator(target.creator || "");
    pdfDoc.setProducer(target.producer || "");

    if (target.creationDate) {
      const cDate = typeof target.creationDate === 'string' ? new Date(target.creationDate) : target.creationDate;
      if (cDate && !isNaN(cDate.getTime())) {
        pdfDoc.setCreationDate(cDate);
      } else {
        (pdfDoc as any).getInfoDict().delete(PDFName.of("CreationDate"));
      }
    } else {
      (pdfDoc as any).getInfoDict().delete(PDFName.of("CreationDate"));
    }

    if (target.modificationDate) {
      const mDate = typeof target.modificationDate === 'string' ? new Date(target.modificationDate) : target.modificationDate;
      if (mDate && !isNaN(mDate.getTime())) {
        pdfDoc.setModificationDate(mDate);
      } else {
        (pdfDoc as any).getInfoDict().delete(PDFName.of("ModDate"));
      }
    } else {
      (pdfDoc as any).getInfoDict().delete(PDFName.of("ModDate"));
    }

    if (target.language) {
      pdfDoc.setLanguage(target.language);
    } else {
      pdfDoc.catalog.delete(PDFName.of("Lang"));
    }

    // Apply custom properties
    const infoDict = (pdfDoc as any).getInfoDict();
    if (infoDict) {
      // Clear out original custom properties first
      const standardKeys = ["Title", "Author", "Subject", "Keywords", "Creator", "Producer", "CreationDate", "ModDate", "Trapped"];
      infoDict.keys().forEach((k: any) => {
        const decoded = k.decodeText ? k.decodeText() : k.key || String(k);
        if (!standardKeys.includes(decoded)) {
          infoDict.delete(k);
        }
      });

      // Write updated custom properties
      Object.entries(target.customProperties || {}).forEach(([k, v]) => {
        if (k.trim() && v.trim()) {
          infoDict.set(PDFName.of(k.trim()), PDFHexString.fromText(v.trim()));
        }
      });
    }

    // If privacy/cleaner mode is active, delete the XMP Metadata Stream from document catalog
    if (privacyModeActive) {
      pdfDoc.catalog.delete(PDFName.of("Metadata"));
    }

    // Save PDF
    const savedBytes = await pdfDoc.save();
    return savedBytes;
  };

  const handleExportPdf = async () => {
    const targetFiles = files.filter(f => f.status === "ready");
    if (targetFiles.length === 0) return;

    setIsProcessing(true);
    const downloads: { name: string; bytes: Uint8Array }[] = [];

    try {
      for (const f of targetFiles) {
        const updatedBytes = await compilePdfMetadata(f);
        let outName = f.name;
        if (outName.toLowerCase().endsWith(".pdf")) {
          outName = outName.substring(0, outName.length - 4) + "_updated.pdf";
        } else {
          outName = outName + "_updated.pdf";
        }

        downloads.push({
          name: outName,
          bytes: updatedBytes
        });
      }

      setProcessedDownloads(downloads);

      // Save operational history log
      const newHistoryItem: EditorHistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: Date.now(),
        filesCount: targetFiles.length,
        totalSize: targetFiles.reduce((acc, tf) => acc + tf.size, 0),
        operationType: privacyModeActive ? "clean" : "edit"
      };

      const updatedHistory = [newHistoryItem, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("pdf_metadata_history", JSON.stringify(updatedHistory));

      // Mark files as saved
      setFiles(prev => prev.map(f => f.status === "ready" ? { ...f, status: "saved" } : f));

    } catch (e: any) {
      console.error("Compilation failed", e);
      alert("Failed to compile updated PDF files. Detail: " + (e.message || e));
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadSingleFile = (fileData: { name: string; bytes: Uint8Array }) => {
    const blob = new Blob([fileData.bytes as any], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileData.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAllAsZip = async () => {
    if (processedDownloads.length === 0) return;
    const zip = new JSZip();
    processedDownloads.forEach(d => {
      zip.file(d.name, d.bytes);
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = "updated_pdf_metadata.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Apply template fields to current file or all loaded files
  const applyTemplate = (tpl: MetadataTemplate, applyToAll = false) => {
    setFiles(prev => prev.map(f => {
      if (!applyToAll && f.id !== selectedFileId) return f;
      if (!f.updatedMetadata) return f;

      const tMeta = { ...f.updatedMetadata };

      if (tpl.isPrivacyMode) {
        setPrivacyModeActive(true);
        return {
          ...f,
          updatedMetadata: {
            ...tMeta,
            author: "",
            creator: "",
            producer: "",
            creationDate: null,
            modificationDate: null,
            customProperties: {}
          }
        };
      }

      if (tpl.title !== undefined) tMeta.title = tpl.title;
      if (tpl.author !== undefined) tMeta.author = tpl.author;
      if (tpl.subject !== undefined) tMeta.subject = tpl.subject;
      if (tpl.keywords !== undefined) tMeta.keywords = tpl.keywords;
      if (tpl.creator !== undefined) tMeta.creator = tpl.creator;
      if (tpl.producer !== undefined) tMeta.producer = tpl.producer;
      if (tpl.language !== undefined) tMeta.language = tpl.language;
      if (tpl.customProperties !== undefined) {
        tMeta.customProperties = { ...tMeta.customProperties, ...tpl.customProperties };
      }

      return { ...f, updatedMetadata: tMeta };
    }));
  };

  const handleSaveTemplate = () => {
    if (!newTemplateName.trim() || !selectedFileId) return;
    const current = files.find(f => f.id === selectedFileId);
    if (!current || !current.updatedMetadata) return;

    const meta = current.updatedMetadata;
    const newTpl: MetadataTemplate = {
      id: Math.random().toString(36).substring(2, 9),
      name: newTemplateName.trim(),
      title: meta.title,
      author: meta.author,
      subject: meta.subject,
      keywords: meta.keywords,
      creator: meta.creator,
      producer: meta.producer,
      language: meta.language,
      customProperties: meta.customProperties,
      isPrivacyMode: privacyModeActive
    };

    const updated = [newTpl, ...templates];
    saveTemplatesToStorage(updated);
    setNewTemplateName("");
    setShowSaveTemplateModal(false);
  };

  const handleDeleteTemplate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = templates.filter(t => t.id !== id);
    saveTemplatesToStorage(updated);
  };

  const selectedFile = files.find(f => f.id === selectedFileId);

  // Helper formats
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const formatDateForInput = (dObj: Date | string | null | undefined): string => {
    if (!dObj) return "";
    try {
      const date = typeof dObj === 'string' ? new Date(dObj) : dObj;
      if (!date || isNaN(date.getTime())) return "";
      const pad = (num: number) => String(num).padStart(2, '0');
      return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    } catch {
      return "";
    }
  };

  return (
    <div className="w-full">
      {/* TechArticle Schema Insertion */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": "Understanding and Editing PDF Metadata for Privacy and SEO",
            "description": "Learn how PDF metadata works, the differences between legacy Info dictionaries and modern XMP streams, and how to sanitise PDF files client-side to prevent data leaks.",
            "inLanguage": "en",
            "author": {
              "@type": "Organization",
              "name": "Nexus Calculator"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Nexus Calculator"
            }
          })
        }}
      />

      {/* Privacy banner */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#518231]/10 rounded-2xl border border-[#518231]/20 gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#518231]/20 rounded-xl text-[#518231]">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              Zero-Trust Local Metadata Editor
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Files never leave your browser. Metadata modifications occur 100% locally.
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="text-xs font-semibold text-[#518231] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <History size={14} /> History Log
        </button>
      </div>

      {/* History view overlay */}
      {showHistory && (
        <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="text-[#518231]" /> Operations History (Recent 10)
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setHistory([]);
                  localStorage.removeItem("pdf_metadata_history");
                }}
                className="text-xs px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 cursor-pointer font-semibold"
              >
                Clear History
              </button>
              <button
                onClick={() => setShowHistory(false)}
                className="text-xs px-3 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-lg dark:bg-slate-800 dark:text-slate-300 cursor-pointer font-semibold"
              >
                Close
              </button>
            </div>
          </div>

          {history.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">No metadata actions logged yet.</p>
          ) : (
            <div className="grid gap-3 max-h-60 overflow-y-auto">
              {history.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-850 dark:text-slate-250">
                      Processed {item.filesCount} file(s) ({formatBytes(item.totalSize)})
                    </p>
                    <div className="text-[10px] text-slate-400 flex flex-wrap gap-x-3 gap-y-1 font-semibold">
                      <span>{new Date(item.timestamp).toLocaleString()}</span>
                      <span className={item.operationType === "clean" ? "text-amber-600 dark:text-amber-450" : "text-green-600 dark:text-green-400"}>
                        {item.operationType === "clean" ? "Sanitization Completed" : "Metadata Updated"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main interface flow */}
      {processedDownloads.length > 0 ? (
        // ─── SUCCESS EXPORT SCREEN ───
        <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 animate-bounce">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Metadata Updated Successfully!
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md font-semibold">
              Your modifications have been written directly to the PDF object dictionaries.
            </p>
          </div>

          <div className="w-full max-w-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-left divide-y divide-slate-100 dark:divide-slate-800">
            {processedDownloads.map((dl, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText size={20} className="text-[#518231] shrink-0" />
                  <span className="text-sm font-semibold truncate text-slate-800 dark:text-slate-200">
                    {dl.name}
                  </span>
                </div>
                <button
                  onClick={() => downloadSingleFile(dl)}
                  className="px-3 py-1.5 bg-[#518231] hover:bg-[#518231]/90 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Download size={14} /> Download
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            {processedDownloads.length > 1 && (
              <button
                onClick={downloadAllAsZip}
                className="px-6 py-3 bg-[#518231] hover:bg-[#518231]/90 text-white font-extrabold rounded-2xl flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
              >
                <Download size={18} /> Download All (ZIP)
              </button>
            )}
            <button
              onClick={clearAllFiles}
              className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-extrabold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer transition-all"
            >
              Start Over
            </button>
          </div>
        </div>
      ) : files.length === 0 ? (
        // ─── UPLOADER SCREEN ───
        <div
          ref={dropzoneRef}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-3 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center gap-4 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? "border-[#518231] bg-green-50/10 dark:bg-green-950/10 scale-[0.99]"
              : "border-slate-300 hover:border-[#518231]/70 dark:border-slate-800 dark:hover:border-[#518231]/70 bg-white hover:bg-slate-50/50 dark:bg-slate-900 dark:hover:bg-slate-900/60"
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
          <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-400 dark:text-slate-500">
            <Upload size={32} className="text-[#518231]" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-black text-slate-850 dark:text-slate-150">
              Drag and drop your PDF files here
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              or click to browse from your computer
            </p>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            Supports Standard and Custom properties
          </div>
        </div>
      ) : (
        // ─── EDITOR AND COMPARATIVE DASHBOARD SCREEN ───
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* FILE LISTING & TEMPLATES & PRESETS (LEFT PANEL) */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* Uploaded Files list */}
            <div className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-855 dark:text-slate-155 flex items-center gap-2">
                  <FileText size={16} className="text-[#518231]" />
                  Uploaded Documents ({files.length})
                </h3>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#518231] rounded-lg text-slate-600 dark:text-slate-400 flex items-center justify-center cursor-pointer"
                  title="Add more files"
                >
                  <Plus size={14} />
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="application/pdf"
                onChange={handleFileInput}
                className="hidden"
              />

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {files.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => {
                      if (f.status !== "loading") setSelectedFileId(f.id);
                    }}
                    className={`p-3 border rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      selectedFileId === f.id
                        ? "border-[#518231] bg-[#518231]/5 dark:bg-[#518231]/10 shadow-sm"
                        : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850/50"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {f.status === "loading" ? (
                        <Loader2 size={16} className="animate-spin text-[#518231] shrink-0" />
                      ) : f.status === "locked" ? (
                        <Lock size={16} className="text-red-500 shrink-0" />
                      ) : (
                        <File size={16} className="text-[#518231] shrink-0" />
                      )}
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate" title={f.name}>
                          {f.name}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                          {formatBytes(f.size)}
                          {f.originalMetadata && ` • ${f.originalMetadata.pageCount} pages`}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(f.id);
                      }}
                      className="text-slate-400 hover:text-red-500 dark:hover:text-red-400 p-0.5 rounded cursor-pointer"
                      title="Remove file"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Template Presets */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-black text-slate-950 dark:text-slate-50 flex items-center gap-1.5">
                  <Sparkles size={16} className="text-amber-500" />
                  Metadata Templates
                </h3>
                {selectedFile && (
                  <button
                    onClick={() => setShowSaveTemplateModal(true)}
                    className="text-[10px] font-bold text-[#518231] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Save size={12} /> Save Current
                  </button>
                )}
              </div>

              {/* Save Template Modal overlay */}
              {showSaveTemplateModal && (
                <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-855 rounded-xl space-y-3">
                  <p className="text-[10px] font-semibold text-slate-500">Save current metadata values as a reusable local template.</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Template Name..."
                      value={newTemplateName}
                      onChange={(e) => setNewTemplateName(e.target.value)}
                      className="w-full px-2.5 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-xs bg-white dark:bg-slate-900 outline-none focus:border-[#518231] font-semibold"
                    />
                    <button
                      onClick={handleSaveTemplate}
                      disabled={!newTemplateName.trim()}
                      className="px-3 py-1.5 bg-[#518231] text-white rounded-lg text-xs font-bold shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowSaveTemplateModal(false)}
                      className="px-2 py-1.5 border border-slate-350 text-slate-650 rounded-lg text-xs font-semibold shrink-0 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="p-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-900/60 border border-slate-200 dark:border-slate-855 rounded-xl flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{tpl.name}</p>
                      <p className="text-[9px] text-slate-400 font-semibold">
                        {tpl.isPrivacyMode ? "Privacy Cleaner" : `Author: ${tpl.author || "None"} • Lang: ${tpl.language || "None"}`}
                      </p>
                    </div>
                    
                    <div className="flex gap-1">
                      <button
                        onClick={() => applyTemplate(tpl, false)}
                        className="px-2 py-1 bg-[#518231]/10 text-[#518231] hover:bg-[#518231] hover:text-white rounded text-[10px] font-bold cursor-pointer"
                        title="Apply to current file"
                      >
                        Apply
                      </button>
                      <button
                        onClick={() => applyTemplate(tpl, true)}
                        className="px-2 py-1 bg-slate-200 hover:bg-slate-350 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded text-[10px] font-bold cursor-pointer"
                        title="Apply to all files"
                      >
                        Apply All
                      </button>
                      {tpl.id !== "t-privacy" && tpl.id !== "t-corp" && (
                        <button
                          onClick={(e) => handleDeleteTemplate(tpl.id, e)}
                          className="text-slate-400 hover:text-red-500 p-1 rounded cursor-pointer"
                        >
                          <Trash size={12} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions / Sanitizer box */}
            <div className="bg-[#518231]/5 border border-[#518231]/15 rounded-3xl p-5 space-y-4">
              <h3 className="text-sm font-black text-slate-855 dark:text-slate-155 flex items-center gap-1.5">
                <ShieldAlert size={16} className="text-[#518231]" />
                Privacy & Sanitization
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-450 leading-relaxed font-semibold">
                Sanitizing removes all personal information, document creator metrics, timestamps, custom attributes, and deletes hidden metadata structures (XMP stream) in one click.
              </p>
              <button
                onClick={applyPrivacyMode}
                disabled={!selectedFile}
                className="w-full py-2.5 bg-[#518231] hover:bg-[#518231]/95 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShieldCheck size={14} /> Remove Sensitive Metadata
              </button>
            </div>

          </div>

          {/* METADATA EDITOR PANEL (MIDDLE COLUMN) */}
          <div className="xl:col-span-5 space-y-6">
            
            {/* NO FILE SELECTED */}
            {!selectedFile ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center py-20 space-y-4">
                <FileText size={48} className="text-slate-300 dark:text-slate-700" />
                <p className="text-sm text-slate-500 font-bold">Please select a file to edit metadata properties.</p>
              </div>
            ) : selectedFile.status === "locked" ? (
              // LOCKED FILE PASS INPUT
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4">
                <div className="flex flex-col items-center text-center space-y-3 py-6">
                  <div className="p-3 bg-red-500/10 text-red-500 rounded-full">
                    <Lock size={32} />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">This Document is Protected</h3>
                  <p className="text-xs text-slate-500 max-w-sm">Please enter the correct password to decrypt and edit the PDF metadata properties.</p>
                </div>
                
                {selectedFile.errorMessage && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs flex items-center gap-2 font-semibold">
                    <AlertCircle size={14} /> {selectedFile.errorMessage}
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    handleLockedPasswordSubmit(selectedFile.id, String(fd.get("password") || ""));
                  }}
                  className="space-y-4"
                >
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter PDF password..."
                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-955 border border-slate-200 dark:border-slate-800 rounded-xl text-sm outline-none focus:border-[#518231] font-semibold"
                    required
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="w-full py-2 bg-[#518231] hover:bg-[#518231]/90 text-white rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Unlock PDF
                    </button>
                    <button
                      type="button"
                      onClick={() => removeFile(selectedFile.id)}
                      className="px-4 py-2 border border-slate-250 text-slate-650 hover:bg-slate-50 rounded-xl text-xs font-bold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </form>
              </div>
            ) : selectedFile.status === "loading" ? (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 size={32} className="animate-spin text-[#518231]" />
                <p className="text-sm text-slate-500 font-semibold">Extracting PDF metadata dictionary objects...</p>
              </div>
            ) : (
              // MAIN EDITOR PANEL
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-6">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Settings size={18} className="text-[#518231]" />
                  Document Properties Editor
                </h3>

                {/* Standard Fields Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Title */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                      <FileText size={11} /> Title
                    </label>
                    <input
                      type="text"
                      value={selectedFile.updatedMetadata?.title || ""}
                      onChange={(e) => updateSelectedField("title", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs bg-slate-50 dark:bg-slate-955 focus:bg-white outline-none focus:border-[#518231] font-semibold transition-all"
                      placeholder="e.g. Sales Report Q2"
                    />
                  </div>

                  {/* Author */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                      <User size={11} /> Author
                    </label>
                    <input
                      type="text"
                      value={selectedFile.updatedMetadata?.author || ""}
                      onChange={(e) => updateSelectedField("author", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs bg-slate-50 dark:bg-slate-955 focus:bg-white outline-none focus:border-[#518231] font-semibold transition-all"
                      placeholder="e.g. Jane Smith"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                      <Info size={11} /> Subject
                    </label>
                    <input
                      type="text"
                      value={selectedFile.updatedMetadata?.subject || ""}
                      onChange={(e) => updateSelectedField("subject", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs bg-slate-50 dark:bg-slate-955 focus:bg-white outline-none focus:border-[#518231] font-semibold transition-all"
                      placeholder="e.g. Financial performance summary"
                    />
                  </div>

                  {/* Keywords Tag Manager */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                      <Tag size={11} /> Keywords / Tags
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newKeywordTag}
                        onChange={(e) => setNewKeywordTag(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddKeyword();
                          }
                        }}
                        className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs bg-slate-50 dark:bg-slate-955 outline-none focus:border-[#518231] font-semibold transition-all"
                        placeholder="Add tag and press Enter..."
                      />
                      <button
                        onClick={handleAddKeyword}
                        className="px-3 bg-[#518231] text-white text-xs font-bold rounded-xl flex items-center justify-center cursor-pointer shrink-0"
                      >
                        Add
                      </button>
                    </div>

                    {/* Tag list */}
                    {selectedFile.updatedMetadata?.keywords && selectedFile.updatedMetadata.keywords.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1.5">
                        {selectedFile.updatedMetadata.keywords.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-700 dark:text-slate-300 font-bold rounded-full border border-slate-200/50 dark:border-slate-700/50"
                          >
                            {tag}
                            <button
                              onClick={() => handleRemoveKeyword(tag)}
                              className="text-slate-400 hover:text-red-500 cursor-pointer"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Creator */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                      <Settings size={11} /> Creator
                    </label>
                    <input
                      type="text"
                      value={selectedFile.updatedMetadata?.creator || ""}
                      onChange={(e) => updateSelectedField("creator", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs bg-slate-50 dark:bg-slate-955 focus:bg-white outline-none focus:border-[#518231] font-semibold transition-all"
                      placeholder="e.g. Word Editor"
                    />
                  </div>

                  {/* Producer */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                      <Settings size={11} /> Producer
                    </label>
                    <input
                      type="text"
                      value={selectedFile.updatedMetadata?.producer || ""}
                      onChange={(e) => updateSelectedField("producer", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs bg-slate-50 dark:bg-slate-955 focus:bg-white outline-none focus:border-[#518231] font-semibold transition-all"
                      placeholder="e.g. PDF Engine v12"
                    />
                  </div>

                  {/* Creation Date */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                      <Calendar size={11} /> Creation Date
                    </label>
                    <input
                      type="datetime-local"
                      value={formatDateForInput(selectedFile.updatedMetadata?.creationDate)}
                      onChange={(e) => updateSelectedField("creationDate", e.target.value ? new Date(e.target.value) : null)}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs bg-slate-50 dark:bg-slate-955 focus:bg-white outline-none focus:border-[#518231] font-semibold transition-all"
                    />
                  </div>

                  {/* Modification Date */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                      <Calendar size={11} /> Modification Date
                    </label>
                    <input
                      type="datetime-local"
                      value={formatDateForInput(selectedFile.updatedMetadata?.modificationDate)}
                      onChange={(e) => updateSelectedField("modificationDate", e.target.value ? new Date(e.target.value) : null)}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs bg-slate-50 dark:bg-slate-955 focus:bg-white outline-none focus:border-[#518231] font-semibold transition-all"
                    />
                  </div>

                  {/* Document Language */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[11px] font-bold text-slate-500 flex items-center gap-1 uppercase tracking-wider">
                      <Languages size={11} /> Document Language
                    </label>
                    <select
                      value={selectedFile.updatedMetadata?.language || ""}
                      onChange={(e) => updateSelectedField("language", e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs bg-slate-50 dark:bg-slate-955 focus:bg-white outline-none focus:border-[#518231] font-semibold transition-all"
                    >
                      {LANGUAGE_OPTIONS.map((opt) => (
                        <option key={opt.code} value={opt.code}>{opt.name}</option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Custom Properties Builder */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                  <h4 className="text-xs font-black text-slate-855 dark:text-slate-155 uppercase tracking-wider">
                    Custom Metadata Attributes
                  </h4>
                  
                  {/* Preset key helpers */}
                  <div className="space-y-2">
                    <p className="text-[10px] text-slate-400 font-semibold">Choose a preset attribute key or write a custom key name below:</p>
                    <div className="flex flex-wrap gap-1">
                      {CUSTOM_PRESETS.map((p) => (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => {
                            setSelectedPreset(p.label);
                            setCustomKeyInput(p.key);
                          }}
                          className={`px-2 py-1 border rounded-md text-[9px] font-bold transition-all cursor-pointer ${
                            customKeyInput === p.key
                              ? "border-[#518231] bg-[#518231]/5 text-[#518231]"
                              : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-955 text-slate-500 hover:border-slate-350"
                          }`}
                        >
                          {p.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                    <input
                      type="text"
                      placeholder="Property Key (e.g. ProjectCode)"
                      value={customKeyInput}
                      onChange={(e) => setCustomKeyInput(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))} // only alphanumeric
                      className="sm:col-span-2 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs bg-slate-50 dark:bg-slate-955 outline-none focus:border-[#518231] font-semibold"
                    />
                    <input
                      type="text"
                      placeholder="Property Value (e.g. Omega)"
                      value={customValInput}
                      onChange={(e) => setCustomValInput(e.target.value)}
                      className="sm:col-span-2 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs bg-slate-50 dark:bg-slate-955 outline-none focus:border-[#518231] font-semibold"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomProp}
                      disabled={!customKeyInput.trim() || !customValInput.trim()}
                      className="py-2 px-3 bg-[#518231] text-white text-xs font-bold rounded-xl hover:bg-[#518231]/95 cursor-pointer disabled:opacity-50 shrink-0 flex items-center justify-center gap-1"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>

                  {/* Custom properties table listing */}
                  {selectedFile.updatedMetadata?.customProperties && Object.keys(selectedFile.updatedMetadata.customProperties).length > 0 && (
                    <div className="border border-slate-150 dark:border-slate-800 rounded-2xl overflow-hidden text-xs">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-955 text-slate-400 font-bold border-b border-slate-150 dark:border-slate-800 text-[10px] text-left">
                            <th className="p-3">Attribute Key</th>
                            <th className="p-3">Value</th>
                            <th className="p-3 w-10 text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {Object.entries(selectedFile.updatedMetadata.customProperties).map(([k, v]) => (
                            <tr key={k} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/20">
                              <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{k}</td>
                              <td className="p-3 text-slate-600 dark:text-slate-400 truncate max-w-[120px] font-semibold" title={v}>{v}</td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleRemoveCustomProp(k)}
                                  className="text-red-500 hover:text-red-750 p-0.5 rounded cursor-pointer"
                                  title="Delete custom property"
                                >
                                  <Trash size={12} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                </div>

                {/* Exporter triggers */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                  <div className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-[#518231]" />
                    Client-Side Compiler Ready
                  </div>
                  <button
                    onClick={handleExportPdf}
                    disabled={isProcessing}
                    className="px-5 py-2.5 bg-[#518231] hover:bg-[#518231]/95 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Download size={13} />
                        Apply & Export PDF
                      </>
                    )}
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* COMPARTATIVE LIVE PREVIEW PANEL (RIGHT PANEL) */}
          <div className="xl:col-span-3 space-y-6">
            
            {/* File info statistics card */}
            {selectedFile && selectedFile.updatedMetadata && (
              <div className="bg-slate-900 text-white rounded-3xl p-5 space-y-4 shadow-lg border border-slate-850">
                <h4 className="text-xs font-black uppercase text-[#518231] tracking-wider flex items-center gap-1.5">
                  <Info size={14} /> File Characteristics
                </h4>
                <div className="space-y-2.5 text-xs font-semibold">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Pages count:</span>
                    <span>{selectedFile.updatedMetadata.pageCount}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">PDF version:</span>
                    <span>{selectedFile.updatedMetadata.pdfVersion}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-slate-400">Total Fields:</span>
                    <span>
                      {Object.keys(selectedFile.updatedMetadata.customProperties).length + 8} fields
                    </span>
                  </div>
                  <div className="flex justify-between pb-0">
                    <span className="text-slate-400">Target Size:</span>
                    <span>~{formatBytes(selectedFile.size)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Before / After comparisons */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4">
              <h3 className="text-xs font-black text-slate-855 dark:text-slate-155 uppercase tracking-wider flex items-center gap-1.5">
                <RefreshCw size={14} className="text-[#518231]" />
                Before / After Comparison
              </h3>

              {!selectedFile || !selectedFile.originalMetadata || !selectedFile.updatedMetadata ? (
                <p className="text-[11px] text-slate-400 font-bold text-center py-8">Select a loaded file to see side-by-side modifications.</p>
              ) : (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  
                  {/* Field diff renderer */}
                  {[
                    { label: "Title", orig: selectedFile.originalMetadata.title, upd: selectedFile.updatedMetadata.title },
                    { label: "Author", orig: selectedFile.originalMetadata.author, upd: selectedFile.updatedMetadata.author },
                    { label: "Subject", orig: selectedFile.originalMetadata.subject, upd: selectedFile.updatedMetadata.subject },
                    { label: "Creator", orig: selectedFile.originalMetadata.creator, upd: selectedFile.updatedMetadata.creator },
                    { label: "Producer", orig: selectedFile.originalMetadata.producer, upd: selectedFile.updatedMetadata.producer },
                    { label: "Language", orig: selectedFile.originalMetadata.language, upd: selectedFile.updatedMetadata.language },
                  ].map((field) => (
                    <div key={field.label} className="space-y-1 text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-300 text-[10px] uppercase">{field.label}</span>
                      <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold">
                        <div className="p-2 bg-red-50/20 text-red-650 dark:bg-red-955/10 rounded-lg truncate border border-red-200/20 dark:border-red-900/10" title={field.orig || "(Empty)"}>
                          {field.orig || "(Empty)"}
                        </div>
                        <div className={`p-2 rounded-lg truncate border ${
                          field.orig !== field.upd
                            ? "bg-green-50/20 text-green-600 dark:bg-green-955/10 border-green-200/20 dark:border-green-900/10 font-bold"
                            : "bg-slate-50 dark:bg-slate-955 border-slate-200/30 dark:border-slate-800/30 text-slate-400"
                        }`} title={field.upd || "(Empty)"}>
                          {field.upd || "(Empty)"}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Keywords Diff */}
                  <div className="space-y-1 text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-300 text-[10px] uppercase">Keywords</span>
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold">
                      <div className="p-2 bg-red-50/20 text-red-650 dark:bg-red-955/10 rounded-lg truncate border border-red-200/20 dark:border-red-900/10">
                        {selectedFile.originalMetadata.keywords.join(", ") || "(Empty)"}
                      </div>
                      <div className={`p-2 rounded-lg truncate border ${
                        selectedFile.originalMetadata.keywords.join(",") !== selectedFile.updatedMetadata.keywords.join(",")
                          ? "bg-green-50/20 text-green-600 dark:bg-green-955/10 border-green-200/20 dark:border-green-900/10 font-bold"
                          : "bg-slate-50 dark:bg-slate-955 border-slate-200/30 dark:border-slate-800/30 text-slate-400"
                      }`}>
                        {selectedFile.updatedMetadata.keywords.join(", ") || "(Empty)"}
                      </div>
                    </div>
                  </div>

                  {/* Custom properties comparison */}
                  <div className="space-y-1 text-xs border-t border-slate-100 dark:border-slate-800 pt-3">
                    <span className="font-bold text-slate-800 dark:text-slate-300 text-[10px] uppercase">Custom Properties ({Object.keys(selectedFile.updatedMetadata?.customProperties || {}).length})</span>
                    <div className="space-y-1.5">
                      {Object.keys({
                        ...(selectedFile.originalMetadata?.customProperties || {}),
                        ...(selectedFile.updatedMetadata?.customProperties || {})
                      }).map((cKey) => {
                        const origVal = selectedFile.originalMetadata?.customProperties?.[cKey];
                        const updVal = selectedFile.updatedMetadata?.customProperties?.[cKey];
                        if (origVal === updVal) return null; // hide unchanged custom attributes to preserve space

                        return (
                          <div key={cKey} className="space-y-0.5">
                            <span className="text-[9px] font-bold text-[#518231]">{cKey}</span>
                            <div className="grid grid-cols-2 gap-2 text-[9px] font-semibold">
                              <div className="p-1.5 bg-red-50/20 text-red-500 rounded truncate border border-red-100/10" title={origVal || "(Deleted)"}>
                                {origVal || "(Deleted)"}
                              </div>
                              <div className="p-1.5 bg-green-50/20 text-green-600 rounded truncate border border-green-100/10 font-bold" title={updVal || "(Deleted)"}>
                                {updVal || "(Deleted)"}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
}
