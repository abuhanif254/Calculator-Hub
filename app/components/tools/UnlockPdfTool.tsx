"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { 
  FileText, Upload, Trash2, Settings, AlertCircle, Loader2, Download, 
  RefreshCw, History, Check, ShieldCheck, Eye, EyeOff, Copy, Plus, 
  Key, Info, Shield, HelpCircle, ArrowRight, X, Lock, Unlock, CheckSquare
} from "lucide-react";
import { PDFDocument, PDFName } from "pdf-lib";
import { decryptPDF } from "@pdfsmaller/pdf-decrypt";
import JSZip from "jszip";

interface EncryptedPdfFile {
  id: string;
  file: File;
  name: string;
  size: number;
  pageCount: number | null;
  status: "loading" | "ready" | "error" | "unlocked";
  isEncrypted: boolean;
  requiresPassword: boolean;
  password: string;
  errorMessage?: string;
  showPassword?: boolean;
}

interface UnlockHistoryItem {
  id: string;
  timestamp: number;
  filesCount: number;
  totalSize: number;
  wasSuccessful: boolean;
}

export function UnlockPdfTool() {
  const [files, setFiles] = useState<EncryptedPdfFile[]>([]);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processedFiles, setProcessedFiles] = useState<{ name: string; bytes: Uint8Array }[]>([]);
  const [history, setHistory] = useState<UnlockHistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Bulk password helper
  const [bulkPassword, setBulkPassword] = useState<string>("");
  const [showBulkPassword, setShowBulkPassword] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("unlock_pdf_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing history from local storage:", e);
      }
    }
  }, []);

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

    const newFiles: EncryptedPdfFile[] = [];
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
        status: "loading",
        isEncrypted: false,
        requiresPassword: false,
        password: "",
        showPassword: false
      });
    }

    setFiles(prev => [...prev, ...newFiles]);

    // Parse each PDF in the background
    for (const newFile of newFiles) {
      try {
        const arrayBuffer = await newFile.file.arrayBuffer();
        
        let pageCount = 0;
        let isEncrypted = false;
        let requiresPassword = false;

        try {
          // Attempt loading without a password
          const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: false });
          pageCount = pdfDoc.getPageCount();
          // Check if trailer has Encrypt dictionary (meaning owner password / restrictions only)
          isEncrypted = (pdfDoc.context as any).trailer?.has(PDFName.of("Encrypt")) ?? false;
          requiresPassword = false; // Opens fine without password
        } catch (err: any) {
          // If it throws an encryption/password error, user password is set
          if (err.message && (err.message.includes("encrypted") || err.message.includes("password") || err.message.includes("decrypt"))) {
            isEncrypted = true;
            requiresPassword = true;
          } else {
            throw err;
          }
        }

        setFiles(prev => prev.map(f => f.id === newFile.id ? { 
          ...f, 
          status: isEncrypted ? "ready" : "unlocked", 
          pageCount,
          isEncrypted,
          requiresPassword
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
    setBulkPassword("");
  };

  const updateFilePassword = (id: string, pass: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, password: pass } : f));
  };

  const togglePasswordVisibility = (id: string) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, showPassword: !f.showPassword } : f));
  };

  const applyBulkPassword = () => {
    if (!bulkPassword) return;
    setFiles(prev => prev.map(f => f.requiresPassword || f.isEncrypted ? { ...f, password: bulkPassword } : f));
  };

  // Main decryption pipeline runner
  const handleUnlockPdf = async () => {
    const targetFiles = files.filter(f => f.status === "ready" || f.status === "unlocked");
    if (targetFiles.length === 0) return;

    // Verify all password-required files have passwords
    const missingPasswords = targetFiles.filter(f => f.requiresPassword && !f.password);
    if (missingPasswords.length > 0) {
      alert("Please enter a password for all encrypted PDF files.");
      return;
    }

    setIsProcessing(true);
    const results: { name: string; bytes: Uint8Array }[] = [];
    let hasFailures = false;

    try {
      for (const targetFile of targetFiles) {
        const arrayBuffer = await targetFile.file.arrayBuffer();
        const fileBytes = new Uint8Array(arrayBuffer);

        if (!targetFile.isEncrypted) {
          // If already unlocked, just output the original file
          results.push({
            name: targetFile.name,
            bytes: fileBytes
          });
          continue;
        }

        try {
          const decryptedBytes = await decryptPDF(fileBytes, targetFile.password);
          
          let outName = targetFile.name;
          if (outName.toLowerCase().endsWith(".pdf")) {
            outName = outName.substring(0, outName.length - 4) + "_unlocked.pdf";
          } else {
            outName = outName + "_unlocked.pdf";
          }

          results.push({
            name: outName,
            bytes: decryptedBytes
          });
        } catch (err: any) {
          console.warn(`Failed to decrypt ${targetFile.name}:`, err.message || err);
          hasFailures = true;
          setFiles(prev => prev.map(f => f.id === targetFile.id ? { 
            ...f, 
            status: "error", 
            errorMessage: "Invalid Password. Could not unlock document." 
          } : f));
        }
      }

      if (results.length > 0 && !hasFailures) {
        setProcessedFiles(results);

        // Save to history
        const newHistoryItem: UnlockHistoryItem = {
          id: Math.random().toString(36).substring(2, 9),
          timestamp: Date.now(),
          filesCount: targetFiles.length,
          totalSize: targetFiles.reduce((acc, f) => acc + f.size, 0),
          wasSuccessful: true
        };

        const updatedHistory = [newHistoryItem, ...history].slice(0, 10);
        setHistory(updatedHistory);
        localStorage.setItem("unlock_pdf_history", JSON.stringify(updatedHistory));
      } else if (hasFailures) {
        alert("Some files could not be decrypted. Please review the passwords entered.");
      }

    } catch (err: any) {
      console.error("Decryption failed:", err);
      alert("Decryption pipeline failed: " + (err.message || "Please check your passwords."));
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
    link.download = "unlocked_pdfs.zip";
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
              Zero-Trust Local Document Unlocking
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Unlock PDFs only if you have authorization. Files never leave your browser, and passwords are never stored.
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
              <History className="text-[#518231]" /> Unlock History (Recent 10)
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setHistory([]);
                  localStorage.removeItem("unlock_pdf_history");
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
                      Unlocked {item.filesCount} file(s) ({formatBytes(item.totalSize)})
                    </p>
                    <div className="text-[10px] text-slate-400 flex flex-wrap gap-x-3 gap-y-1 font-semibold">
                      <span>{new Date(item.timestamp).toLocaleString()}</span>
                      <span className="text-green-600 dark:text-green-400">Decryption Successful</span>
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
            <Unlock size={48} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Files Unlocked Successfully!
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md font-semibold">
              All passwords and editing/copying restrictions have been permanently removed.
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
              Drag and drop your password-protected PDFs here
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              or click to select from your computer
            </p>
          </div>
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-2 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            100% Local In-Browser Decryption
          </div>
        </div>
      ) : (
        // ─── EDITOR / PROTECTION CONFIGURATION SCREEN ───
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: PDF FILE LIST & PASSWORD INPUTS */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-black text-slate-850 dark:text-slate-150 flex items-center gap-2">
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

              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                {files.map((file) => (
                  <div key={file.id} className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm space-y-3">
                    
                    {/* Header info */}
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex items-center gap-3 overflow-hidden">
                        {file.status === "loading" ? (
                          <Loader2 size={18} className="animate-spin text-[#518231] shrink-0" />
                        ) : file.status === "error" ? (
                          <AlertCircle size={18} className="text-red-500 shrink-0" />
                        ) : !file.isEncrypted ? (
                          <Unlock size={18} className="text-green-500 shrink-0" />
                        ) : (
                          <Lock size={18} className="text-red-500 shrink-0" />
                        )}
                        
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-slate-850 dark:text-slate-150 truncate" title={file.name}>
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

                    {/* Status Badge & Password input if needed */}
                    <div className="pt-2 border-t border-slate-55 dark:border-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      
                      <div>
                        {file.status === "loading" ? (
                          <span className="text-[10px] bg-slate-100 text-slate-500 dark:bg-slate-800 px-2 py-1 rounded-full font-bold">Analyzing File...</span>
                        ) : file.status === "error" ? (
                          <span className="text-[10px] bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400 px-2 py-1 rounded-full font-bold flex items-center gap-1">
                            <AlertCircle size={10} /> {file.errorMessage || "Error loading file"}
                          </span>
                        ) : !file.isEncrypted ? (
                          <span className="text-[10px] bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 px-2 py-1 rounded-full font-bold flex items-center gap-1">
                            Already Unlocked
                          </span>
                        ) : file.requiresPassword ? (
                          <span className="text-[10px] bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400 px-2 py-1 rounded-full font-bold flex items-center gap-1">
                            Password Required
                          </span>
                        ) : (
                          <span className="text-[10px] bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400 px-2 py-1 rounded-full font-bold flex items-center gap-1">
                            Permissions Restricted Only
                          </span>
                        )}
                      </div>

                      {file.isEncrypted && (
                        <div className="relative w-full sm:max-w-xs">
                          <input 
                            type={file.showPassword ? "text" : "password"}
                            value={file.password}
                            onChange={(e) => updateFilePassword(file.id, e.target.value)}
                            placeholder="Enter password to unlock..."
                            className="w-full pl-3 pr-8 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs outline-none focus:border-[#518231] transition-all font-semibold"
                          />
                          <button 
                            onClick={() => togglePasswordVisibility(file.id)} 
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                            type="button"
                          >
                            {file.showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                          </button>
                        </div>
                      )}

                    </div>

                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN: ACTIONS & LIVE STATUS CARDS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Settings className="text-[#518231]" /> Decryption Controls
              </h3>

              {/* BULK ACTION INPUT (only show if multiple protected files exist) */}
              {files.filter(f => f.isEncrypted).length > 1 && (
                <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl space-y-3">
                  <h4 className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1">
                    <Key size={13} className="text-[#518231]" /> Batch Passwords
                  </h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold leading-relaxed">
                    If all loaded PDFs share the same password, enter it here to apply it to all files instantly.
                  </p>
                  <div className="flex gap-2">
                    <div className="relative w-full">
                      <input 
                        type={showBulkPassword ? "text" : "password"}
                        value={bulkPassword}
                        onChange={(e) => setBulkPassword(e.target.value)}
                        placeholder="Enter common password..."
                        className="w-full pl-3 pr-8 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-xl text-xs outline-none focus:border-[#518231] transition-all font-semibold"
                      />
                      <button 
                        onClick={() => setShowBulkPassword(!showBulkPassword)} 
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-pointer"
                        type="button"
                      >
                        {showBulkPassword ? <EyeOff size={13} /> : <Eye size={13} />}
                      </button>
                    </div>
                    <button 
                      onClick={applyBulkPassword}
                      disabled={!bulkPassword}
                      className="px-3 py-2 bg-[#518231] hover:bg-[#518231]/90 text-white rounded-xl text-xs font-bold shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}

              {/* SECURITY STATUS COMPARATOR */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* BEFORE STATUS CARD */}
                <div className="p-4 bg-red-50/20 dark:bg-red-950/10 border border-red-200/40 dark:border-red-900/20 rounded-2xl space-y-3 text-center">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto">
                    <Lock size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-slate-800 dark:text-slate-200">Before</p>
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider">Protected PDF</p>
                  </div>
                  <p className="text-[9px] text-slate-400 font-semibold leading-relaxed">
                    Access restricted by encryption dictionaries and permission flags.
                  </p>
                </div>

                {/* AFTER STATUS CARD */}
                <div className="p-4 bg-green-50/20 dark:bg-green-950/10 border border-green-200/40 dark:border-green-900/20 rounded-2xl space-y-3 text-center">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 text-[#518231] flex items-center justify-center mx-auto">
                    <Unlock size={18} />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-xs font-black text-slate-800 dark:text-slate-200">After</p>
                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Unlocked PDF</p>
                  </div>
                  <p className="text-[9px] text-slate-400 font-semibold leading-relaxed">
                    Decrypted PDF content. Printable, editable, and copy-enabled.
                  </p>
                </div>

              </div>

              {/* LIVE RESTRICTIONS LIST */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-3xl border border-slate-200 dark:border-slate-850 space-y-3">
                <h4 className="text-[10px] font-black text-slate-450 dark:text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Shield size={12} className="text-amber-500" /> Active Restriction Takedown
                </h4>
                <div className="space-y-2">
                  {[
                    "Remove Document Open Password",
                    "Enable High-Quality Printing",
                    "Allow Text & Image Copying",
                    "Restore Form and Assembly Editing"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#518231]/10 text-[#518231] flex items-center justify-center shrink-0">
                        <Check size={10} />
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTION CALLS */}
              <div className="flex gap-4">
                <button
                  onClick={handleUnlockPdf}
                  disabled={isProcessing || files.some(f => f.status === "loading") || files.filter(f => f.status === "ready" || f.status === "unlocked").length === 0}
                  className="w-full py-4 bg-[#518231] hover:bg-[#518231]/95 text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Decrypting Files Locally...
                    </>
                  ) : (
                    <>
                      <Unlock size={18} />
                      Unlock PDF
                    </>
                  )}
                </button>
                <button
                  onClick={clearAllFiles}
                  disabled={isProcessing}
                  className="px-6 py-4 border border-slate-250 dark:border-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-950 font-bold text-xs cursor-pointer transition-all"
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
