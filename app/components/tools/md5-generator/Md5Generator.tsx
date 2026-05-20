"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import CryptoJS from 'crypto-js';
import { Copy, Download, Trash2, FileText, UploadCloud, CheckCircle2, AlertCircle, History, ArrowRightLeft, FileArchive } from 'lucide-react';

interface HistoryItem {
  id: string;
  inputSnippet: string;
  hash: string;
  timestamp: number;
  type: 'text' | 'file';
  size?: number;
}

export function Md5GeneratorTool() {
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  
  // Text State
  const [inputText, setInputText] = useState('');
  
  // File State
  const [file, setFile] = useState<File | null>(null);
  const [fileProgress, setFileProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  // Hash State
  const [hashResult, setHashResult] = useState('');
  const [isUppercase, setIsUppercase] = useState(false);
  const [isHashing, setIsHashing] = useState(false);
  
  // Compare State
  const [compareHash, setCompareHash] = useState('');
  
  // History
  const [history, setHistory] = useState<HistoryItem[]>([]);
  
  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('md5History');
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Could not load MD5 history', e);
    }
  }, []);

  // Save history helper
  const saveToHistory = useCallback((item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    setHistory(prev => {
      // Prevent consecutive identical entries
      if (prev.length > 0 && prev[0].hash === item.hash) {
        return prev;
      }
      
      const newHistory = [
        { ...item, id: crypto.randomUUID(), timestamp: Date.now() },
        ...prev
      ].slice(0, 10); // keep last 10
      
      localStorage.setItem('md5History', JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  // Handle Text Hashing
  useEffect(() => {
    if (activeTab !== 'text') return;
    
    if (!inputText) {
      setHashResult(CryptoJS.MD5("").toString());
      return;
    }

    const timer = setTimeout(() => {
      const hash = CryptoJS.MD5(inputText).toString();
      setHashResult(hash);
      
      if (inputText.length > 3) {
        saveToHistory({
          inputSnippet: inputText.length > 30 ? inputText.substring(0, 30) + '...' : inputText,
          hash: hash,
          type: 'text',
          size: new Blob([inputText]).size
        });
      }
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [inputText, activeTab, saveToHistory]);

  // Handle File Hashing
  const hashFile = async (selectedFile: File) => {
    setIsHashing(true);
    setFileProgress(0);
    setHashResult('');

    try {
      // Read file in chunks to prevent memory issues with large files
      const chunkSize = 1024 * 1024 * 2; // 2MB
      const fileSize = selectedFile.size;
      let offset = 0;
      
      const algo = CryptoJS.algo.MD5.create();
      
      const readNextChunk = () => {
        return new Promise<void>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e.target?.result) {
              // Convert ArrayBuffer to WordArray for crypto-js
              const wordArr = CryptoJS.lib.WordArray.create(e.target.result as any);
              algo.update(wordArr);
              
              offset += chunkSize;
              setFileProgress(Math.min(100, Math.round((offset / fileSize) * 100)));
              
              if (offset < fileSize) {
                // Use setTimeout to avoid blocking main thread completely
                setTimeout(() => {
                  readNextChunk().then(resolve).catch(reject);
                }, 0);
              } else {
                resolve();
              }
            }
          };
          reader.onerror = reject;
          
          const slice = selectedFile.slice(offset, offset + chunkSize);
          reader.readAsArrayBuffer(slice);
        });
      };
      
      await readNextChunk();
      const finalHash = algo.finalize().toString();
      setHashResult(finalHash);
      
      saveToHistory({
        inputSnippet: selectedFile.name,
        hash: finalHash,
        type: 'file',
        size: selectedFile.size
      });
      
    } catch (err) {
      console.error("Error hashing file", err);
      setHashResult("Error processing file");
    } finally {
      setIsHashing(false);
      setFileProgress(100);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      hashFile(selectedFile);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const selectedFile = e.dataTransfer.files[0];
      setFile(selectedFile);
      hashFile(selectedFile);
    }
  };

  // Actions
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadHash = () => {
    const finalHash = isUppercase ? hashResult.toUpperCase() : hashResult;
    const blob = new Blob([finalHash], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `md5_hash_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const displayHash = isUppercase ? hashResult.toUpperCase() : hashResult;
  const isMatch = compareHash ? displayHash.toLowerCase() === compareHash.toLowerCase().trim() : null;

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-full max-w-sm mx-auto">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'text' 
              ? 'bg-white dark:bg-slate-700 text-[#518231] dark:text-green-400 shadow-sm' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <FileText size={16} /> Text Input
        </button>
        <button
          onClick={() => setActiveTab('file')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium rounded-md transition-all ${
            activeTab === 'file' 
              ? 'bg-white dark:bg-slate-700 text-[#518231] dark:text-green-400 shadow-sm' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <FileArchive size={16} /> File Hash
        </button>
      </div>

      {/* Input Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Input Source</h3>
            {activeTab === 'text' && (
              <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                {inputText.length} chars | {formatBytes(new Blob([inputText]).size)}
              </span>
            )}
          </div>

          {activeTab === 'text' ? (
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste your text here..."
                className="w-full h-48 md:h-64 p-4 text-sm font-mono bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#518231]/50 focus:border-[#518231] resize-none outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-900 dark:text-slate-100"
              />
              {inputText && (
                <button
                  onClick={() => setInputText('')}
                  className="absolute bottom-4 right-4 p-2 text-slate-400 hover:text-red-500 bg-white/80 dark:bg-slate-900/80 rounded-lg backdrop-blur shadow-sm border border-slate-200 dark:border-slate-700 transition-colors"
                  title="Clear Input"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ) : (
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center h-48 md:h-64 border-2 border-dashed rounded-xl transition-all ${
                isDragging 
                  ? 'border-[#518231] bg-[#518231]/5 dark:bg-[#518231]/10' 
                  : 'border-slate-300 dark:border-slate-700 hover:border-[#518231]/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <input 
                type="file" 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Select a file"
              />
              
              <div className="flex flex-col items-center justify-center p-6 text-center pointer-events-none">
                {isHashing ? (
                  <div className="space-y-4 w-full max-w-xs">
                    <div className="w-12 h-12 border-4 border-slate-200 border-t-[#518231] rounded-full animate-spin mx-auto"></div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Hashing file...</p>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-[#518231] h-2 rounded-full transition-all duration-300" style={{ width: `${fileProgress}%` }}></div>
                    </div>
                  </div>
                ) : file ? (
                  <div className="space-y-2">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-[#518231] rounded-full flex items-center justify-center mx-auto mb-2">
                      <FileArchive size={24} />
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatBytes(file.size)}
                    </p>
                    <p className="text-xs text-[#518231] mt-2 font-medium">Click or drag to replace</p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mb-4 group-hover:text-[#518231] group-hover:bg-[#518231]/10 transition-colors">
                      <UploadCloud size={32} />
                    </div>
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Any file size supported. Processed locally.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              MD5 Hash Output
            </h3>
            
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-md">
              <button
                onClick={() => setIsUppercase(false)}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${!isUppercase ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                abc
              </button>
              <button
                onClick={() => setIsUppercase(true)}
                className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${isUppercase ? 'bg-white dark:bg-slate-700 text-[#518231] shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'}`}
              >
                ABC
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="w-full min-h-[80px] p-6 text-lg sm:text-xl md:text-2xl font-mono text-center break-all bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-xl shadow-sm text-slate-800 dark:text-slate-200 flex items-center justify-center">
              {displayHash || "..."}
            </div>
            
            {displayHash && (
              <div className="absolute top-2 right-2 flex opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                <button
                  onClick={() => copyToClipboard(displayHash)}
                  className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg shadow-sm transition-colors"
                  title="Copy Hash"
                >
                  <Copy size={16} />
                </button>
                <button
                  onClick={downloadHash}
                  className="p-2 bg-[#518231]/10 hover:bg-[#518231]/20 text-[#518231] rounded-lg shadow-sm transition-colors"
                  title="Download as .txt"
                >
                  <Download size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Verification / Compare */}
          <div className="pt-4 space-y-2">
            <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <ArrowRightLeft size={16} /> Compare / Verify Hash
            </h4>
            <div className="relative">
              <input
                type="text"
                value={compareHash}
                onChange={(e) => setCompareHash(e.target.value)}
                placeholder="Paste expected MD5 hash here..."
                className={`w-full p-3 pl-4 pr-12 text-sm font-mono bg-white dark:bg-slate-900 border ${
                  isMatch === true ? 'border-green-500 ring-1 ring-green-500/50' : 
                  isMatch === false ? 'border-red-500 ring-1 ring-red-500/50' : 
                  'border-slate-200 dark:border-slate-800'
                } rounded-xl focus:outline-none transition-all placeholder:text-slate-400 dark:text-slate-200`}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {isMatch === true && <CheckCircle2 className="text-green-500" size={20} />}
                {isMatch === false && <AlertCircle className="text-red-500" size={20} />}
              </div>
            </div>
            {isMatch === true && (
              <p className="text-sm text-green-600 dark:text-green-400 font-medium animate-in fade-in slide-in-from-top-1">
                ✓ Hashes match perfectly. Data is intact.
              </p>
            )}
            {isMatch === false && (
              <p className="text-sm text-red-600 dark:text-red-400 font-medium animate-in fade-in slide-in-from-top-1">
                ✗ Hashes do not match.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* History Section */}
      {history.length > 0 && (
        <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <History size={18} className="text-[#518231]" /> Recent Hashes
            </h3>
            <button 
              onClick={() => {
                setHistory([]);
                localStorage.removeItem('md5History');
              }}
              className="text-xs text-red-500 hover:text-red-600 font-medium"
            >
              Clear History
            </button>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-3 font-semibold">Source</th>
                    <th className="px-6 py-3 font-semibold">MD5 Hash</th>
                    <th className="px-6 py-3 font-semibold w-16">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {history.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-2">
                          {item.type === 'text' ? <FileText size={14} className="text-slate-400" /> : <FileArchive size={14} className="text-blue-400" />}
                          <span className="font-mono text-slate-700 dark:text-slate-300 truncate max-w-[150px] md:max-w-[200px]" title={item.inputSnippet}>
                            {item.inputSnippet}
                          </span>
                        </div>
                        {item.size && (
                          <div className="text-[10px] text-slate-400 mt-1 ml-6">
                            {formatBytes(item.size)}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        <code className="text-xs font-mono bg-slate-100 dark:bg-slate-950 px-2 py-1 rounded text-slate-800 dark:text-slate-200 select-all">
                          {isUppercase ? item.hash.toUpperCase() : item.hash}
                        </code>
                      </td>
                      <td className="px-6 py-3">
                        <button
                          onClick={() => copyToClipboard(isUppercase ? item.hash.toUpperCase() : item.hash)}
                          className="p-1.5 text-slate-400 hover:text-[#518231] hover:bg-[#518231]/10 rounded transition-colors"
                          title="Copy Hash"
                        >
                          <Copy size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
