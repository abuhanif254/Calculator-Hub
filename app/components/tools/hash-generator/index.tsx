"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Copy, Download, Trash2, ShieldAlert, ShieldCheck,
  FileText, UploadCloud, File, AlertTriangle, Key,
  CheckCircle, ArrowRightLeft, FileSearch, X
} from "lucide-react";
import { generateAllHashes, arrayBufferToWordArray, copyToClipboard, downloadFile, HashResult } from "./utils";
import CryptoJS from 'crypto-js';

type InputMode = "text" | "file";

export function HashGeneratorTool() {
  const [mode, setMode] = useState<InputMode>("text");
  const [textInput, setTextInput] = useState<string>("");
  const [fileInput, setFileInput] = useState<File | null>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<HashResult[]>([]);
  const [processTime, setProcessTime] = useState<number>(0);
  const [inputSize, setInputSize] = useState<number>(0);

  const [verifyHash, setVerifyHash] = useState<string>("");

  const [toast, setToast] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Process text input
  useEffect(() => {
    if (mode === "text") {
      if (!textInput) {
        setResults([]);
        setInputSize(0);
        return;
      }
      
      const timer = setTimeout(() => {
        setIsProcessing(true);
        const start = performance.now();
        
        // utf8 encode strings automatically by cryptojs
        const hashRes = generateAllHashes(textInput);
        
        const end = performance.now();
        setProcessTime(Math.round(end - start));
        setResults(hashRes);
        setInputSize(new Blob([textInput]).size); // size in bytes
        setIsProcessing(false);
      }, 300); // Debounce text

      return () => clearTimeout(timer);
    }
  }, [textInput, mode]);

  // Process file input
  useEffect(() => {
    if (mode === "file" && fileInput) {
      setIsProcessing(true);
      const start = performance.now();
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        if (arrayBuffer) {
          const wordArray = arrayBufferToWordArray(arrayBuffer);
          const hashRes = generateAllHashes(wordArray);
          
          const end = performance.now();
          setProcessTime(Math.round(end - start));
          setResults(hashRes);
          setInputSize(fileInput.size);
        }
        setIsProcessing(false);
      };
      reader.onerror = () => {
        showToast("Error reading file");
        setIsProcessing(false);
      };
      
      // For very large files, this could freeze the main thread. 
      // In a more complex app, web workers are ideal, but for now we read directly.
      reader.readAsArrayBuffer(fileInput);
    } else if (mode === "file" && !fileInput) {
      setResults([]);
      setInputSize(0);
    }
  }, [fileInput, mode]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const handleCopy = async (text: string, key: string) => {
    if (!text) return;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
      showToast("Copied to clipboard!");
    }
  };

  const handleCopyAll = () => {
    const text = results.map(r => `${r.algorithm}: ${r.hash}`).join('\\n');
    handleCopy(text, "all");
  };

  const handleDownload = () => {
    if (results.length === 0) return;
    const jsonContent = JSON.stringify(results, null, 2);
    downloadFile(jsonContent, "hash_report.json", "application/json");
    showToast("Downloaded report!");
  };

  const clearAll = () => {
    setTextInput("");
    setFileInput(null);
    setResults([]);
    setVerifyHash("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    showToast("Cleared");
  };

  // Drag and drop handlers
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setMode("file");
      setFileInput(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileInput(e.target.files[0]);
    }
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const verifyMatchAlgorithm = results.find(r => r.hash.toLowerCase() === verifyHash.toLowerCase().trim());
  
  return (
    <div className="w-full flex flex-col gap-6">
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2 bg-[#518231] text-white rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          {toast}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <button onClick={() => setMode("text")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === "text" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
            Text Input
          </button>
          <button onClick={() => setMode("file")}
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${mode === "file" ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}>
            File Hash
          </button>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button onClick={clearAll} className="ml-auto p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors dark:text-red-400 flex items-center gap-1 text-sm font-medium">
            <Trash2 size={16} /> Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col min-h-[300px]">
             <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
               <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                 {mode === "text" ? <FileText size={14}/> : <UploadCloud size={14}/>} 
                 {mode === "text" ? "Input String" : "File Upload"}
               </span>
               {inputSize > 0 && (
                 <span className="text-xs text-slate-400 font-mono bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded">
                   {formatBytes(inputSize)}
                 </span>
               )}
             </div>
             
             <div className="flex-1 relative bg-slate-50/50 dark:bg-[#1e1e1e]/50 flex flex-col">
               {mode === "text" ? (
                 <textarea 
                   value={textInput} 
                   onChange={e => setTextInput(e.target.value)}
                   placeholder="Enter string to hash (e.g., 'Hello World' or 'password123')"
                   className="absolute inset-0 w-full h-full p-4 resize-none outline-none bg-transparent text-slate-800 dark:text-slate-200 font-mono text-sm custom-scrollbar"
                 />
               ) : (
                 <div 
                   onDragOver={onDragOver}
                   onDrop={onDrop}
                   className="flex-1 p-6 flex flex-col items-center justify-center text-center"
                 >
                   {!fileInput ? (
                     <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl w-full h-full flex flex-col items-center justify-center gap-4 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                        <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center">
                          <UploadCloud size={32} />
                        </div>
                        <div>
                          <p className="text-slate-700 dark:text-slate-300 font-medium">Drag & drop a file here</p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">or click to browse from your device</p>
                        </div>
                        <p className="text-xs text-slate-400 mt-2 px-4 max-w-xs">All hashing is done entirely locally in your browser. Files are never uploaded to any server.</p>
                     </div>
                   ) : (
                     <div className="bg-slate-100 dark:bg-slate-800 rounded-xl w-full p-6 flex flex-col items-center justify-center gap-4 relative border border-slate-200 dark:border-slate-700 shadow-sm">
                        <button onClick={(e) => {e.stopPropagation(); setFileInput(null);}} className="absolute top-4 right-4 p-1.5 bg-white dark:bg-slate-700 text-slate-500 hover:text-red-500 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600 transition-colors">
                          <X size={16} />
                        </button>
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
                          <File size={32} />
                        </div>
                        <div>
                          <p className="text-slate-800 dark:text-white font-semibold truncate max-w-[200px] sm:max-w-[250px]">{fileInput.name}</p>
                          <p className="text-sm text-slate-500 mt-1">{formatBytes(fileInput.size)}</p>
                        </div>
                        {isProcessing && <p className="text-sm text-blue-600 dark:text-blue-400 animate-pulse font-medium mt-2">Processing hash...</p>}
                     </div>
                   )}
                   <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                 </div>
               )}
             </div>
          </div>
          
          {/* Verification Panel */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-5 flex flex-col gap-3">
             <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
               <FileSearch size={16} className="text-[#518231]" />
               Compare / Verify Hash
             </h3>
             <p className="text-xs text-slate-500 dark:text-slate-400">
               Paste an expected hash below to see if it matches any generated hash from your input.
             </p>
             <input 
               type="text" 
               value={verifyHash} 
               onChange={e => setVerifyHash(e.target.value)}
               placeholder="Paste expected hash (e.g. 5d41402abc4b2a76b...)"
               className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:border-[#518231] font-mono transition-colors"
             />
             
             {verifyHash && (
               <div className={`p-3 rounded-lg border mt-2 flex gap-3 ${verifyMatchAlgorithm ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/10 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400' : 'bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/50 text-red-700 dark:text-red-400'}`}>
                 {verifyMatchAlgorithm ? <CheckCircle className="shrink-0 mt-0.5" size={18} /> : <AlertTriangle className="shrink-0 mt-0.5" size={18} />}
                 <div>
                   <p className="text-sm font-bold">{verifyMatchAlgorithm ? "Match Found!" : "No Match"}</p>
                   <p className="text-xs mt-1">
                     {verifyMatchAlgorithm ? `The input matches the expected ${verifyMatchAlgorithm.algorithm} hash.` : "The input does not match the provided hash across any supported algorithm."}
                   </p>
                 </div>
               </div>
             )}
          </div>

        </div>

        {/* Output Column */}
        <div className="lg:col-span-7 flex flex-col gap-4">
           
           <div className="flex items-center justify-between mb-2">
             <div className="flex items-center gap-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                  Generated Hashes
                </h3>
                {results.length > 0 && !isProcessing && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 font-mono">
                    Processed in {processTime}ms
                  </span>
                )}
             </div>
             
             {results.length > 0 && (
               <div className="flex items-center gap-2">
                 <button onClick={handleCopyAll} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-medium transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700">
                   <Copy size={14} /> Copy All
                 </button>
                 <button onClick={handleDownload} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-medium transition-colors flex items-center gap-1.5 border border-slate-200 dark:border-slate-700">
                   <Download size={14} /> JSON
                 </button>
               </div>
             )}
           </div>

           {results.length === 0 ? (
             <div className="bg-slate-50 dark:bg-slate-900/50 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl h-[400px] flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-8 text-center">
                <Key size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium text-slate-600 dark:text-slate-300">Awaiting Input</p>
                <p className="text-sm mt-2 max-w-sm">Enter text or upload a file to instantly generate multi-algorithm cryptographic hashes.</p>
             </div>
           ) : (
             <div className="space-y-4">
                {results.map((res) => {
                  
                  const isWeak = res.security === 'Weak';
                  const isDeprecated = res.security === 'Deprecated';
                  const isStrong = res.security === 'Strong';
                  const isVeryStrong = res.security === 'Very Strong';

                  const badgeClass = isWeak ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800/50' 
                                   : isDeprecated ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800/50'
                                   : isVeryStrong ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800/50'
                                   : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50';

                  const isVerifyMatch = verifyHash.trim() !== "" && res.hash.toLowerCase() === verifyHash.toLowerCase().trim();

                  return (
                    <div key={res.algorithm} className={`bg-white dark:bg-slate-900 rounded-xl border ${isVerifyMatch ? 'border-[#518231] shadow-[0_0_0_2px_rgba(81,130,49,0.2)]' : 'border-slate-200 dark:border-slate-800'} shadow-sm overflow-hidden flex flex-col`}>
                      <div className={`px-4 py-2 border-b ${isVerifyMatch ? 'bg-[#518231]/5 border-[#518231]/20' : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'} flex justify-between items-center flex-wrap gap-2`}>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-slate-800 dark:text-slate-100 text-sm">{res.algorithm}</span>
                          <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${badgeClass}`}>
                            {res.security}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{res.length} bit</span>
                          <button onClick={() => handleCopy(res.hash, res.algorithm)} className="text-slate-400 hover:text-[#518231] transition-colors p-1" title="Copy Hash">
                            {copiedKey === res.algorithm ? <CheckCircle size={16} className="text-[#518231]" /> : <Copy size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-50/50 dark:bg-[#1e1e1e]/50 relative">
                        {isVerifyMatch && (
                          <div className="absolute top-2 right-2 text-[#518231] opacity-20">
                            <CheckCircle size={48} />
                          </div>
                        )}
                        <p className={`font-mono text-sm break-all ${isVerifyMatch ? 'text-[#518231] dark:text-[#7ab056] font-semibold' : 'text-slate-700 dark:text-slate-300'}`}>
                          {res.hash}
                        </p>
                      </div>
                    </div>
                  )
                })}
             </div>
           )}
        </div>

      </div>
    </div>
  );
}
