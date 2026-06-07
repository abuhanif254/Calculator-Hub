"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  FileText, Upload, Trash2, Settings, AlertCircle, Loader2, Download, 
  RefreshCw, History, Check, ShieldCheck, Eye, EyeOff, Copy, Plus, 
  Key, CheckSquare, Square, Info, Shield, HelpCircle, ArrowRight, X, Sparkles
} from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { encryptPDF } from "@pdfsmaller/pdf-encrypt";
import JSZip from "jszip";

interface PdfFile {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number | null;
  status: "loading" | "ready" | "error";
  errorMessage?: string;
}

interface ProtectHistoryItem {
  id: string;
  timestamp: number;
  filesCount: number;
  totalSize: number;
  algorithm: string;
  hasUserPassword: boolean;
  hasOwnerPassword: boolean;
}

// Password Strength type
type StrengthRating = "Weak" | "Medium" | "Strong" | "Very Strong" | "None";

export function ProtectPdfTool() {
  const [files, setFiles] = useState<PdfFile[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processedFiles, setProcessedFiles] = useState<{ name: string; bytes: Uint8Array }[]>([]);
  const [history, setHistory] = useState<ProtectHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Passwords
  const [userPassword, setUserPassword] = useState<string>("");
  const [ownerPassword, setOwnerPassword] = useState<string>("");
  const [showUserPassword, setShowUserPassword] = useState<boolean>(false);
  const [showOwnerPassword, setShowOwnerPassword] = useState<boolean>(false);

  // Password Strength
  const [passwordStrength, setPasswordStrength] = useState<StrengthRating>("None");
  const [strengthEntropy, setStrengthEntropy] = useState<number>(0);

  // Generator settings
  const [showGenerator, setShowGenerator] = useState<boolean>(false);
  const [genLength, setGenLength] = useState<number>(16);
  const [genUpper, setGenUpper] = useState<boolean>(true);
  const [genLower, setGenLower] = useState<boolean>(true);
  const [genNumbers, setGenNumbers] = useState<boolean>(true);
  const [genSymbols, setGenSymbols] = useState<boolean>(true);

  // Security settings
  const [securityPreset, setSecurityPreset] = useState<"basic" | "business" | "maximum" | "custom">("basic");
  const [algorithm, setAlgorithm] = useState<"AES-256" | "RC4">("AES-256");

  // Restrictions
  const [allowPrinting, setAllowPrinting] = useState<boolean>(true);
  const [allowModifying, setAllowModifying] = useState<boolean>(true);
  const [allowCopying, setAllowCopying] = useState<boolean>(true);
  const [allowAnnotating, setAllowAnnotating] = useState<boolean>(true);
  const [allowFillingForms, setAllowFillingForms] = useState<boolean>(true);
  const [allowAssembly, setAllowAssembly] = useState<boolean>(true);
  const [allowHighQualityPrint, setAllowHighQualityPrint] = useState<boolean>(true);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("protect_pdf_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing history from local storage:", e);
      }
    }
  }, []);

  // Update password strength
  useEffect(() => {
    if (!userPassword) {
      setPasswordStrength("None");
      setStrengthEntropy(0);
      return;
    }

    let charsetSize = 0;
    if (/[a-z]/.test(userPassword)) charsetSize += 26;
    if (/[A-Z]/.test(userPassword)) charsetSize += 26;
    if (/[0-9]/.test(userPassword)) charsetSize += 10;
    if (/[^a-zA-Z0-9]/.test(userPassword)) charsetSize += 32;

    const entropy = userPassword.length * Math.log2(charsetSize || 1);
    setStrengthEntropy(Math.round(entropy));

    if (entropy < 40) {
      setPasswordStrength("Weak");
    } else if (entropy < 60) {
      setPasswordStrength("Medium");
    } else if (entropy < 80) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Very Strong");
    }
  }, [userPassword]);

  // Apply preset changes
  useEffect(() => {
    if (securityPreset === "basic") {
      setAllowPrinting(true);
      setAllowModifying(true);
      setAllowCopying(true);
      setAllowAnnotating(true);
      setAllowFillingForms(true);
      setAllowAssembly(true);
      setAllowHighQualityPrint(true);
    } else if (securityPreset === "business") {
      setAllowPrinting(false);
      setAllowModifying(false);
      setAllowCopying(false);
      setAllowAnnotating(true);
      setAllowFillingForms(true);
      setAllowAssembly(false);
      setAllowHighQualityPrint(false);
      // Require owner password automatically if empty
      if (!ownerPassword) {
        setOwnerPassword(generateRandomPassword(12, { upper: true, lower: true, numbers: true, symbols: false }));
      }
    } else if (securityPreset === "maximum") {
      setAllowPrinting(false);
      setAllowModifying(false);
      setAllowCopying(false);
      setAllowAnnotating(false);
      setAllowFillingForms(false);
      setAllowAssembly(false);
      setAllowHighQualityPrint(false);
      // Require owner password automatically if empty
      if (!ownerPassword) {
        setOwnerPassword(generateRandomPassword(16, { upper: true, lower: true, numbers: true, symbols: true }));
      }
    }
  }, [securityPreset]);

  // Handle custom toggle to adjust preset
  const handleToggleRestriction = (setter: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    setter(!value);
    setSecurityPreset("custom");
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

  const processFilesList = async (incomingFiles: FileList | null) => {
    if (!incomingFiles) return;

    const newFiles: PdfFile[] = [];
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
        pageCount: null,
        status: "loading"
      });
    }

    setFiles(prev => [...prev, ...newFiles]);

    // Parse each PDF in the background
    for (const newFile of newFiles) {
      try {
        const arrayBuffer = await newFile.file.arrayBuffer();
        
        // Quick check if PDF is already encrypted
        let pageCount = 0;
        try {
          const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: false });
          pageCount = pdfDoc.getPageCount();
        } catch (err: any) {
          if (err.message && (err.message.includes("encrypted") || err.message.includes("password") || err.message.includes("decrypt"))) {
            throw new Error("This PDF is already encrypted. Please decrypt it first.");
          }
          throw err;
        }

        setFiles(prev => prev.map(f => f.id === newFile.id ? { 
          ...f, 
          status: "ready", 
          pageCount 
        } : f));
      } catch (err: any) {
        console.warn("Error reading PDF metadata:", err.message || err);
        setFiles(prev => prev.map(f => f.id === newFile.id ? { 
          ...f, 
          status: "error", 
          errorMessage: err.message || "Corrupted or unreadable PDF file."
        } : f));
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

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const clearAllFiles = () => {
    setFiles([]);
    setProcessedFiles([]);
  };

  const generateRandomPassword = (length: number, rules: { upper: boolean; lower: boolean; numbers: boolean; symbols: boolean }): string => {
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerChars = "abcdefghijklmnopqrstuvwxyz";
    const numChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+-=[]{}|;':\",./<>?";
    
    let allowedChars = "";
    if (rules.upper) allowedChars += upperChars;
    if (rules.lower) allowedChars += lowerChars;
    if (rules.numbers) allowedChars += numChars;
    if (rules.symbols) allowedChars += symbolChars;
    
    if (!allowedChars) return "";

    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    
    let password = "";
    // Ensure we get at least one of each selected charset
    const parts: string[] = [];
    if (rules.upper) parts.push(upperChars[array[0] % upperChars.length]);
    if (rules.lower) parts.push(lowerChars[array[1] % lowerChars.length]);
    if (rules.numbers) parts.push(numChars[array[2] % numChars.length]);
    if (rules.symbols) parts.push(symbolChars[array[3] % symbolChars.length]);

    const remainingLength = length - parts.length;
    for (let i = 0; i < remainingLength; i++) {
      const idx = (parts.length + i) % array.length;
      parts.push(allowedChars[array[idx] % allowedChars.length]);
    }

    // Shuffle the generated parts
    const shuffleArray = new Uint32Array(parts.length);
    window.crypto.getRandomValues(shuffleArray);
    for (let i = parts.length - 1; i > 0; i--) {
      const j = shuffleArray[i] % (i + 1);
      const temp = parts[i];
      parts[i] = parts[j];
      parts[j] = temp;
    }

    return parts.join("");
  };

  const handleGeneratePassword = () => {
    const pass = generateRandomPassword(genLength, {
      upper: genUpper,
      lower: genLower,
      numbers: genNumbers,
      symbols: genSymbols
    });
    setUserPassword(pass);
    setShowGenerator(false);
  };

  // Main encryption runner
  const handleProtectPdf = async () => {
    const readyFiles = files.filter(f => f.status === "ready");
    if (readyFiles.length === 0) return;

    if (!userPassword && !ownerPassword) {
      alert("Please enter a User Password or Owner Password to protect the PDF.");
      return;
    }

    setIsProcessing(true);
    const results: { name: string; bytes: Uint8Array }[] = [];

    try {
      for (const readyFile of readyFiles) {
        const arrayBuffer = await readyFile.file.arrayBuffer();
        const fileBytes = new Uint8Array(arrayBuffer);

        const options: any = {
          algorithm,
          allowPrinting,
          allowModifying,
          allowCopying,
          allowAnnotating,
          allowFillingForms,
          allowAssembly,
          allowHighQualityPrint
        };

        if (ownerPassword) {
          options.ownerPassword = ownerPassword;
        }

        const encryptedBytes = await encryptPDF(fileBytes, userPassword, options);
        
        let outName = readyFile.name;
        if (outName.toLowerCase().endsWith(".pdf")) {
          outName = outName.substring(0, outName.length - 4) + "_protected.pdf";
        } else {
          outName = outName + "_protected.pdf";
        }

        results.push({
          name: outName,
          bytes: encryptedBytes
        });
      }

      setProcessedFiles(results);

      // Save to history
      const newHistoryItem: ProtectHistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: Date.now(),
        filesCount: readyFiles.length,
        totalSize: readyFiles.reduce((acc, f) => acc + f.size, 0),
        algorithm,
        hasUserPassword: !!userPassword,
        hasOwnerPassword: !!ownerPassword
      };

      const updatedHistory = [newHistoryItem, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("protect_pdf_history", JSON.stringify(updatedHistory));

    } catch (err: any) {
      console.error("Encryption failed:", err);
      alert("PDF Protection Failed: " + (err.message || "An error occurred during encryption. Please try again."));
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
    if (processedFiles.length === 0) return;
    const zip = new JSZip();
    
    processedFiles.forEach(f => {
      zip.file(f.name, f.bytes);
    });

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = "protected_pdfs.zip";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const getStrengthColor = (strength: StrengthRating) => {
    switch (strength) {
      case "Weak": return "bg-red-500 text-white";
      case "Medium": return "bg-amber-500 text-white";
      case "Strong": return "bg-yellow-500 text-slate-900";
      case "Very Strong": return "bg-green-500 text-white";
      default: return "bg-slate-200 text-slate-500 dark:bg-slate-800";
    }
  };

  const getStrengthProgress = (strength: StrengthRating) => {
    switch (strength) {
      case "Weak": return "w-1/4 bg-red-500";
      case "Medium": return "w-2/4 bg-amber-500";
      case "Strong": return "w-3/4 bg-yellow-500";
      case "Very Strong": return "w-full bg-green-500";
      default: return "w-0";
    }
  };

  return (
    <div className="w-full">
      {/* Privacy disclaimer */}
      <div className="mb-6 flex items-center justify-between p-4 bg-[#518231]/10 rounded-2xl border border-[#518231]/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#518231]/20 rounded-xl text-[#518231]">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              100% Client-Side Privacy Guaranteed
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Your PDFs remain private. Files never leave your browser, and passwords are never sent or stored.
            </p>
          </div>
        </div>
        <button 
          onClick={() => setShowHistory(!showHistory)} 
          className="text-xs font-semibold text-[#518231] hover:underline flex items-center gap-1 cursor-pointer"
        >
          <History size={14} /> History
        </button>
      </div>

      {/* History view overlay */}
      {showHistory && (
        <div className="mb-8 p-6 bg-slate-50 dark:bg-slate-900/60 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="text-[#518231]" /> Protection History (Recent 10)
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setHistory([]);
                  localStorage.removeItem("protect_pdf_history");
                }}
                className="text-xs px-3 py-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg dark:bg-red-950/20 dark:text-red-400 dark:hover:bg-red-950/40 cursor-pointer font-semibold"
              >
                Clear All
              </button>
              <button 
                onClick={() => setShowHistory(false)}
                className="text-xs px-3 py-1.5 bg-slate-200 text-slate-700 hover:bg-slate-350 rounded-lg dark:bg-slate-800 dark:text-slate-300 cursor-pointer font-semibold"
              >
                Close
              </button>
            </div>
          </div>

          {history.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">No operations logged yet.</p>
          ) : (
            <div className="grid gap-3 max-h-60 overflow-y-auto">
              {history.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      Protected {item.filesCount} file(s) ({formatBytes(item.totalSize)})
                    </p>
                    <div className="text-[10px] text-slate-400 flex flex-wrap gap-x-3 gap-y-1 font-semibold">
                      <span>{new Date(item.timestamp).toLocaleString()}</span>
                      <span>Algorithm: {item.algorithm}</span>
                      {item.hasUserPassword && <span className="text-green-600 dark:text-green-400">Open Pass Active</span>}
                      {item.hasOwnerPassword && <span className="text-blue-600 dark:text-blue-400 font-semibold">Permissions Configured</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Main interface flow */}
      {processedFiles.length > 0 ? (
        // ─── SUCCESS EXPORT SCREEN ───
        <div className="flex flex-col items-center justify-center py-10 space-y-6 text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 animate-bounce">
            <ShieldCheck size={48} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Files Protected Successfully!
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
              Your passwords and permissions have been compiled into the PDF structures. They are now fully encrypted.
            </p>
          </div>

          <div className="w-full max-w-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-left divide-y divide-slate-100 dark:divide-slate-800">
            {processedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText size={20} className="text-[#518231] shrink-0" />
                  <span className="text-sm font-semibold truncate text-slate-800 dark:text-slate-200">
                    {file.name}
                  </span>
                </div>
                <button 
                  onClick={() => downloadSingleFile(file)}
                  className="px-3 py-1.5 bg-[#518231] hover:bg-[#518231]/90 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Download size={14} /> Download
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-4">
            {processedFiles.length > 1 && (
              <button 
                onClick={downloadAllAsZip}
                className="px-6 py-3 bg-[#518231] hover:bg-[#518231]/90 text-white font-extrabold rounded-2xl flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all"
              >
                <Download size={18} /> Download All (ZIP)
              </button>
            )}
            <button 
              onClick={clearAllFiles}
              className="px-6 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-extrabold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-all"
            >
              Start Over
            </button>
          </div>
        </div>
      ) : files.length === 0 ? (
        // ─── DRAG & DROP UPLOADER SCREEN ───
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
            <p className="text-sm font-black text-slate-800 dark:text-slate-200">
              Drag and drop your PDF files here
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              or click to select from your computer
            </p>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            100% Local In-Browser Processing
          </div>
        </div>
      ) : (
        // ─── EDITOR / PROTECTION CONFIGURATION SCREEN ───
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: PDF FILE PANEL */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-black text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <FileText size={18} className="text-[#518231]" />
                  Uploaded PDFs ({files.length})
                </h3>
                <button 
                  onClick={() => fileInputRef.current?.click()} 
                  className="p-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-[#518231] rounded-lg text-slate-600 dark:text-slate-400 flex items-center justify-center cursor-pointer"
                  title="Add more files"
                >
                  <Plus size={16} />
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

              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                {files.map((file) => (
                  <div key={file.id} className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-3 shadow-sm">
                    <div className="flex items-center gap-3 overflow-hidden">
                      {file.status === "loading" ? (
                        <Loader2 size={18} className="animate-spin text-[#518231] shrink-0" />
                      ) : file.status === "error" ? (
                        <AlertCircle size={18} className="text-red-500 shrink-0" />
                      ) : (
                        <FileText size={18} className="text-[#518231] shrink-0" />
                      )}
                      
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate" title={file.name}>
                          {file.name}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold flex items-center gap-2">
                          <span>{formatBytes(file.size)}</span>
                          {file.pageCount !== null && (
                            <>
                              <span>•</span>
                              <span>{file.pageCount} page(s)</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => removeFile(file.id)}
                      className="p-1 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg cursor-pointer"
                      title="Remove file"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>

              {files.some(f => f.status === "error") && (
                <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/30 rounded-xl text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Error:</span> Some files are already protected or corrupted and cannot be configured. Remove them to proceed.
                  </div>
                </div>
              )}
            </div>
            
            {/* SECURITY NOTIFICATIONS BOX */}
            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
                <Info size={14} className="text-blue-500" /> Security Recommendation
              </h4>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-2 font-medium list-disc pl-4">
                <li>Use **AES-256** for military-grade encryption. RC4 is insecure and should only be used if legacy PDF compatibility (pre-2005) is necessary.</li>
                <li>An **Owner Password** controls restrictions. If someone does not have the owner password, their PDF reader will block copy/print operations.</li>
                <li>Make sure to save the password. Once encrypted, the file cannot be decrypted without the password. We never save it on our end.</li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTROLS PANEL */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Settings className="text-[#518231]" /> Security Configuration
              </h3>

              {/* PASSWORD FIELDS */}
              <div className="space-y-4">
                
                {/* USER (OPEN) PASSWORD */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Key size={13} className="text-[#518231]" />
                    Document Open Password (Required to view content)
                  </label>
                  <div className="relative">
                    <input 
                      type={showUserPassword ? "text" : "password"}
                      value={userPassword}
                      onChange={(e) => setUserPassword(e.target.value)}
                      placeholder="Enter a password to protect viewing..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm outline-none focus:border-[#518231] transition-all font-semibold"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      <button 
                        onClick={() => setShowUserPassword(!showUserPassword)} 
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                        type="button"
                      >
                        {showUserPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button 
                        onClick={() => setShowGenerator(!showGenerator)}
                        className="p-1 bg-[#518231]/10 text-[#518231] rounded hover:bg-[#518231]/20 cursor-pointer flex items-center justify-center"
                        title="Password Generator"
                        type="button"
                      >
                        <Sparkles size={14} />
                      </button>
                    </div>
                  </div>

                  {/* PASSWORD STRENGTH VISUALIZER */}
                  {userPassword && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between items-center text-xs font-semibold">
                        <span className="text-slate-400">Password Strength:</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${getStrengthColor(passwordStrength)}`}>
                          {passwordStrength} ({strengthEntropy} bits entropy)
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                        <div className={`h-full transition-all duration-300 ${getStrengthProgress(passwordStrength)}`} />
                      </div>
                    </div>
                  )}
                </div>

                {/* PASSWORD GENERATOR PANEL */}
                {showGenerator && (
                  <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-250 dark:border-slate-850 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-black text-slate-850 dark:text-slate-150 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={14} className="text-[#518231]" /> Random Password Generator
                      </h4>
                      <button 
                        onClick={() => setShowGenerator(false)} 
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-600 dark:text-slate-400">Password Length: {genLength}</span>
                        <input 
                          type="range" 
                          min="8" 
                          max="32" 
                          value={genLength} 
                          onChange={(e) => setGenLength(parseInt(e.target.value))} 
                          className="w-1/2 accent-[#518231] cursor-pointer"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button 
                          onClick={() => setGenUpper(!genUpper)}
                          className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            genUpper 
                              ? "bg-[#518231]/10 border-[#518231] text-[#518231]" 
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500"
                          }`}
                        >
                          {genUpper ? <CheckSquare size={14} /> : <Square size={14} />} Uppercase (A-Z)
                        </button>
                        <button 
                          onClick={() => setGenLower(!genLower)}
                          className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            genLower 
                              ? "bg-[#518231]/10 border-[#518231] text-[#518231]" 
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500"
                          }`}
                        >
                          {genLower ? <CheckSquare size={14} /> : <Square size={14} />} Lowercase (a-z)
                        </button>
                        <button 
                          onClick={() => setGenNumbers(!genNumbers)}
                          className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            genNumbers 
                              ? "bg-[#518231]/10 border-[#518231] text-[#518231]" 
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500"
                          }`}
                        >
                          {genNumbers ? <CheckSquare size={14} /> : <Square size={14} />} Numbers (0-9)
                        </button>
                        <button 
                          onClick={() => setGenSymbols(!genSymbols)}
                          className={`flex items-center gap-2 p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            genSymbols 
                              ? "bg-[#518231]/10 border-[#518231] text-[#518231]" 
                              : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500"
                          }`}
                        >
                          {genSymbols ? <CheckSquare size={14} /> : <Square size={14} />} Symbols (!@#$)
                        </button>
                      </div>

                      <button 
                        onClick={handleGeneratePassword}
                        className="w-full py-2 bg-[#518231] hover:bg-[#518231]/90 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:shadow-lg transition-all"
                      >
                        Generate & Apply
                      </button>
                    </div>
                  </div>
                )}

                {/* OWNER (PERMISSIONS) PASSWORD */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Shield size={13} className="text-[#518231]" />
                    Permissions Password (Restricts copy, print, edit)
                  </label>
                  <div className="relative">
                    <input 
                      type={showOwnerPassword ? "text" : "password"}
                      value={ownerPassword}
                      onChange={(e) => setOwnerPassword(e.target.value)}
                      placeholder="Enter owner password to unlock restrictions..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm outline-none focus:border-[#518231] transition-all font-semibold"
                    />
                    <button 
                      onClick={() => setShowOwnerPassword(!showOwnerPassword)} 
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                      type="button"
                    >
                      {showOwnerPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

              </div>

              {/* SECURITY PRESETS */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  Security Presets
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "basic", label: "Basic", desc: "Password only" },
                    { id: "business", label: "Business", desc: "Lock print/copy" },
                    { id: "maximum", label: "Maximum", desc: "Total Lockdown" },
                    { id: "custom", label: "Custom", desc: "Choose rules" }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setSecurityPreset(preset.id as any)}
                      className={`p-3 border rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between h-20 ${
                        securityPreset === preset.id
                          ? "border-[#518231] bg-[#518231]/5 text-[#518231]"
                          : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-400"
                      }`}
                    >
                      <span className="text-xs font-black">{preset.label}</span>
                      <span className="text-[9px] font-semibold text-slate-400 truncate">{preset.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* GRANULAR PERMISSIONS */}
              <div className="space-y-4 border-t border-slate-100 dark:border-slate-800 pt-6">
                <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase tracking-wider">
                  <Shield size={14} className="text-[#518231]" /> Granular Restrictions Controls
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "print", label: "Allow Printing", val: allowPrinting, set: setAllowPrinting },
                    { id: "copy", label: "Allow Text & Image Copying", val: allowCopying, set: setAllowCopying },
                    { id: "modify", label: "Allow Editing & Modifications", val: allowModifying, set: setAllowModifying },
                    { id: "comment", label: "Allow Comments & Annotating", val: allowAnnotating, set: setAllowAnnotating },
                    { id: "fill", label: "Allow Interactive Form Filling", val: allowFillingForms, set: setAllowFillingForms },
                    { id: "assemble", label: "Allow Page Insertion & Assembly", val: allowAssembly, set: setAllowAssembly },
                    { id: "hi-print", label: "Allow High-Quality Printing", val: allowHighQualityPrint, set: setAllowHighQualityPrint }
                  ].map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-850">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{item.label}</span>
                      <button
                        onClick={() => handleToggleRestriction(item.set, item.val)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                          item.val ? "bg-[#518231]" : "bg-slate-300 dark:bg-slate-800"
                        }`}
                        aria-label={item.label}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                            item.val ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* ENCRYPTION ALGORITHM & ADVANCED OPTIONS */}
              <div className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      Encryption Engine
                    </h4>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                      Select which encryption cipher to use within the PDF security handler.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {["AES-256", "RC4"].map((algo) => (
                      <button
                        key={algo}
                        onClick={() => setAlgorithm(algo as any)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          algorithm === algo
                            ? "bg-[#518231] border-[#518231] text-white"
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {algo}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECURITY SUMMARY */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-2">
                <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Live Protection Summary
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                  <div className="flex justify-between pr-4 border-r border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400">Open Pass:</span>
                    <span>{userPassword ? "Active" : "None"}</span>
                  </div>
                  <div className="flex justify-between pl-2">
                    <span className="text-slate-400">Encryption:</span>
                    <span className="text-[#518231]">{algorithm}</span>
                  </div>
                  <div className="flex justify-between pr-4 border-r border-slate-200 dark:border-slate-800">
                    <span className="text-slate-400">Permissions Pass:</span>
                    <span>{ownerPassword ? "Active" : "None"}</span>
                  </div>
                  <div className="flex justify-between pl-2">
                    <span className="text-slate-400">Restrictions:</span>
                    <span className="text-blue-500">
                      {[
                        !allowPrinting && "Print",
                        !allowCopying && "Copy",
                        !allowModifying && "Edit",
                        !allowAnnotating && "Annotate",
                        !allowFillingForms && "Forms",
                        !allowAssembly && "Assemble"
                      ].filter(Boolean).length} Active
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTION CALL */}
              <div className="flex gap-4">
                <button
                  onClick={handleProtectPdf}
                  disabled={isProcessing || files.some(f => f.status === "loading" || f.status === "error")}
                  className="w-full py-4 bg-[#518231] hover:bg-[#518231]/95 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Encrypting Files Locally...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={18} />
                      Protect PDF
                    </>
                  )}
                </button>
                <button
                  onClick={clearAllFiles}
                  disabled={isProcessing}
                  className="px-6 py-4 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-950 font-bold text-xs cursor-pointer transition-all"
                >
                  Clear
                </button>
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
}
