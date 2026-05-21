'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search, Upload, ShieldAlert, AlertCircle, Globe,
  FileText, Download, Copy, Check, FileJson, RefreshCw, FileCode,
  ArrowLeftRight, Activity, Info,
  ShieldCheck, FileSearch, Layers, FileSignature
} from 'lucide-react';

import { MIME_DATABASE, CATEGORY_LABELS, MimeRecord } from './mime-db';

export function MimeTypeCheckerTool() {
  const [activeTab, setActiveTab] = useState<'lookup' | 'url' | 'upload' | 'compare' | 'database'>('lookup');
  
  // Tab 1: Lookup States
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupSuggestions, setLookupSuggestions] = useState<MimeRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<MimeRecord | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Tab 2: URL Inspector States
  const [urlInput, setUrlInput] = useState('');
  const [urlLoading, setUrlLoading] = useState(false);
  const [urlResult, setUrlResult] = useState<any>(null);
  const [urlError, setUrlError] = useState<string | null>(null);

  // Tab 3: Upload Validator States
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileHexArray, setFileHexArray] = useState<string[]>([]);
  const [fileAsciiArray, setFileAsciiArray] = useState<string[]>([]);
  const [fileValidationResult, setFileValidationResult] = useState<{
    status: 'success' | 'warning' | 'error' | 'info';
    message: string;
    detectedType: MimeRecord | null;
    mismatch: boolean;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tab 4: Compare States
  const [compareExt, setCompareExt] = useState('.png');
  const [compareMime, setCompareMime] = useState('image/png');
  const [compareResult, setCompareResult] = useState<{
    match: boolean;
    status: 'success' | 'warning' | 'danger';
    category: string;
    compatibility: string;
    security: string;
    details: string;
  } | null>(null);

  // Tab 5: Database Explorer States
  const [dbSearch, setDbSearch] = useState('');
  const [dbCategory, setDbCategory] = useState<string>('all');

  // Copy Alert Action
  const [copiedAction, setCopiedAction] = useState<string | null>(null);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Remote URL Audit Fetcher
  const executeUrlCheck = useCallback(async (urlToCheck: string) => {
    if (!urlToCheck.trim()) return;
    setUrlLoading(true);
    setUrlError(null);
    setUrlResult(null);

    let formattedUrl = urlToCheck.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    try {
      const response = await fetch('/api/tools/mime-type-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: formattedUrl })
      });

      const data = await response.json();
      if (data.success) {
        setUrlResult(data);
      } else {
        setUrlError(data.error || 'Failed to analyze remote headers.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setUrlError(msg);
    } finally {
      setUrlLoading(false);
    }
  }, []);

  // Sync with URL query parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlExt = params.get('extension') || params.get('ext');
      const urlMime = params.get('mime');
      const testUrl = params.get('url');

      if (urlExt) {
        const queryClean = urlExt.startsWith('.') ? urlExt : `.${urlExt}`;
        const record = MIME_DATABASE.find(
          r => r.extension.toLowerCase() === queryClean.toLowerCase()
        );
        if (record) {
          setSelectedRecord(record);
          setLookupQuery(record.extension);
          setActiveTab('lookup');
        } else {
          setLookupQuery(urlExt);
        }
      } else if (urlMime) {
        const record = MIME_DATABASE.find(
          r => r.mime.toLowerCase() === urlMime.toLowerCase()
        );
        if (record) {
          setSelectedRecord(record);
          setLookupQuery(record.mime);
          setActiveTab('lookup');
        } else {
          setLookupQuery(urlMime);
        }
      } else if (testUrl) {
        setUrlInput(testUrl);
        setActiveTab('url');
        executeUrlCheck(testUrl);
      } else {
        // Preload PNG as default lookup
        const defaultPng = MIME_DATABASE.find(r => r.extension === '.png');
        if (defaultPng) {
          setSelectedRecord(defaultPng);
          setLookupQuery('.png');
        }
      }
    }
  }, [executeUrlCheck]);


  // Handle Clipboard Copy
  const handleCopy = (text: string, actionId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAction(actionId);
    setTimeout(() => setCopiedAction(null), 2000);
  };

  // Lookup Suggestions Generator
  const handleLookupQueryChange = (val: string) => {
    setLookupQuery(val);
    if (!val.trim()) {
      setLookupSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const cleanVal = val.toLowerCase().trim();
    const filtered = MIME_DATABASE.filter(
      r => r.extension.toLowerCase().includes(cleanVal) || 
           r.mime.toLowerCase().includes(cleanVal) ||
           r.description.toLowerCase().includes(cleanVal)
    ).slice(0, 8);

    setLookupSuggestions(filtered);
    setShowSuggestions(true);
  };

  const selectLookupRecord = (record: MimeRecord) => {
    setSelectedRecord(record);
    setLookupQuery(record.extension);
    setShowSuggestions(false);

    // Sync URL parameter
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('extension', record.extension.slice(1));
    newParams.delete('mime');
    newParams.delete('url');
    const newUrl = `${window.location.pathname}?${newParams.toString()}`;
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
  };

  // Remote URL Audit Fetcher is now declared above (before useEffect)

  // File Upload Logic & Magic Bytes Reader
  const handleFile = (file: File) => {
    setUploadedFile(file);
    setFileHexArray([]);
    setFileAsciiArray([]);
    setFileValidationResult(null);

    const sliceSize = Math.min(file.size, 16);
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        const buffer = e.target.result as ArrayBuffer;
        const uint8 = new Uint8Array(buffer);
        
        const hexParts: string[] = [];
        const asciiParts: string[] = [];

        for (let i = 0; i < uint8.length; i++) {
          const byte = uint8[i];
          hexParts.push(byte.toString(16).toUpperCase().padStart(2, '0'));
          
          if (byte >= 32 && byte <= 126) {
            asciiParts.push(String.fromCharCode(byte));
          } else {
            asciiParts.push('.');
          }
        }

        setFileHexArray(hexParts);
        setFileAsciiArray(asciiParts);
        validateFileBytes(file, hexParts);
      }
    };

    reader.onerror = () => {
      setFileValidationResult({
        status: 'error',
        message: 'Could not read the uploaded file headers.',
        detectedType: null,
        mismatch: false
      });
    };

    reader.readAsArrayBuffer(file.slice(0, sliceSize));
  };

  const validateFileBytes = (file: File, hexBytes: string[]) => {
    const filename = file.name;
    const dotIndex = filename.lastIndexOf('.');
    const fileExt = dotIndex !== -1 ? filename.slice(dotIndex).toLowerCase() : '';

    // 1. Detect format by magic bytes
    let detectedRecord: MimeRecord | null = null;

    // Direct prefix match
    for (const record of MIME_DATABASE) {
      if (record.magicBytes && record.magicBytes.length > 0) {
        let match = true;
        if (hexBytes.length < record.magicBytes.length) {
          match = false;
        } else {
          for (let i = 0; i < record.magicBytes.length; i++) {
            if (hexBytes[i] !== record.magicBytes[i]) {
              match = false;
              break;
            }
          }
        }
        if (match) {
          detectedRecord = record;
          break;
        }
      }
    }

    // RIFF formats (WEBP, WAV, AVI)
    if (!detectedRecord && hexBytes.length >= 12 && hexBytes[0] === '52' && hexBytes[1] === '49' && hexBytes[2] === '46' && hexBytes[3] === '46') {
      const formatBytes = hexBytes.slice(8, 12).join('');
      if (formatBytes === '57454250') {
        detectedRecord = MIME_DATABASE.find(r => r.extension === '.webp') || null;
      } else if (formatBytes === '57415645') {
        detectedRecord = MIME_DATABASE.find(r => r.extension === '.wav') || null;
      } else if (formatBytes === '41564920') {
        detectedRecord = MIME_DATABASE.find(r => r.extension === '.avi') || null;
      }
    }

    // MP4 containers check (ftyp starts at offset 4)
    if (!detectedRecord && hexBytes.length >= 8 && hexBytes[4] === '66' && hexBytes[5] === '74' && hexBytes[6] === '79' && hexBytes[7] === '70') {
      detectedRecord = MIME_DATABASE.find(r => r.extension === '.mp4') || null;
    }

    // 2. Cross-reference expected extension record
    const expectedRecord = MIME_DATABASE.find(r => r.extension.toLowerCase() === fileExt);

    if (!expectedRecord) {
      // Unknown extension to our local db
      if (detectedRecord) {
        setFileValidationResult({
          status: 'warning',
          message: `The file extension '${fileExt}' is unrecognized, but its headers match the magic bytes for a ${detectedRecord.extension} (${detectedRecord.mime}) file.`,
          detectedType: detectedRecord,
          mismatch: true
        });
      } else {
        setFileValidationResult({
          status: 'info',
          message: `The file extension '${fileExt}' and its binary signatures are unrecognized. No security anomalies identified.`,
          detectedType: null,
          mismatch: false
        });
      }
      return;
    }

    // 3. Mismatch checks
    if (detectedRecord) {
      if (detectedRecord.mime === expectedRecord.mime || 
          (expectedRecord.alternatives && expectedRecord.alternatives.includes(detectedRecord.mime)) ||
          (detectedRecord.alternatives && detectedRecord.alternatives.includes(expectedRecord.mime))) {
        // Match!
        setFileValidationResult({
          status: 'success',
          message: `Validation Verified: File headers match the expected ${expectedRecord.extension} signature (${expectedRecord.mime}).`,
          detectedType: detectedRecord,
          mismatch: false
        });
      } else {
        // extension spoofing threat!
        const isDangerous = ['binary', 'archive'].includes(detectedRecord.category) || 
                            ['.exe', '.msi', '.sh', '.bat'].includes(detectedRecord.extension);
        
        setFileValidationResult({
          status: isDangerous ? 'error' : 'warning',
          message: `Extension Spoofing Alert: The file is named with a '${fileExt}' extension, but its internal binary magic bytes structure is identified as a ${detectedRecord.extension} (${detectedRecord.mime}) file.`,
          detectedType: detectedRecord,
          mismatch: true
        });
      }
    } else {
      // Expected magic bytes exist in DB but file header doesn't match
      if (expectedRecord.magicBytes && expectedRecord.magicBytes.length > 0) {
        setFileValidationResult({
          status: 'warning',
          message: `Headers Mismatch: The file does not have the expected starting signature bytes for a ${expectedRecord.extension} file. The file may be corrupt, empty, or renamed.`,
          detectedType: null,
          mismatch: true
        });
      } else {
        // Extension has no defined magic bytes to verify
        setFileValidationResult({
          status: 'success',
          message: `Standard Check Complete: '${fileExt}' files do not have unique static magic bytes signatures. No discrepancies found.`,
          detectedType: expectedRecord,
          mismatch: false
        });
      }
    }
  };

  // Drag & Drop event handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const resetUploadState = () => {
    setUploadedFile(null);
    setFileHexArray([]);
    setFileAsciiArray([]);
    setFileValidationResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Compare Tab Workspace Handler
  const executeComparison = useCallback(() => {
    const record = MIME_DATABASE.find(r => r.extension.toLowerCase() === compareExt.toLowerCase());
    
    if (!record) {
      setCompareResult(null);
      return;
    }

    const cleanInputMime = compareMime.trim().toLowerCase();
    const matchesOfficial = record.mime.toLowerCase() === cleanInputMime;
    const matchesAlternative = record.alternatives?.some(a => a.toLowerCase() === cleanInputMime) || false;

    if (matchesOfficial || matchesAlternative) {
      setCompareResult({
        match: true,
        status: 'success',
        category: CATEGORY_LABELS[record.category] || record.category,
        compatibility: 'Perfect. The server will deliver this file format with standard interpretation parameters, and browsers will parse it correctly.',
        security: record.security,
        details: `Extension '${record.extension}' successfully maps to Content-Type '${cleanInputMime}'.`
      });
    } else {
      // Check if it's completely incorrect or a known mismatch hazard
      const otherRecord = MIME_DATABASE.find(r => r.mime.toLowerCase() === cleanInputMime);
      let matchStatus: 'warning' | 'danger' = 'warning';
      let hazardDetails = '';

      if (otherRecord) {
        const categoriesDangerous = ['binary', 'archive'];
        if (categoriesDangerous.includes(otherRecord.category)) {
          matchStatus = 'danger';
          hazardDetails = `CRITICAL ASSIGNMENT: Serving '${record.extension}' documents with MIME type '${cleanInputMime}' (which represents dangerous binary structures like ${otherRecord.description}) triggers browser executable warnings or sandbox blocking.`;
        } else {
          hazardDetails = `Serving '${record.extension}' (expected ${record.mime}) as '${cleanInputMime}' (${otherRecord.mime}) will confuse browser parsers.`;
        }
      } else {
        hazardDetails = `Undefined Content-Type: '${cleanInputMime}' is not a recognized MIME type for '${record.extension}' extensions.`;
      }

      setCompareResult({
        match: false,
        status: matchStatus,
        category: CATEGORY_LABELS[record.category] || record.category,
        compatibility: `High Mismatch. If served with 'X-Content-Type-Options: nosniff', the browser will REFUSE to load this asset. Otherwise, the browser may sniff content, introducing structural or security bugs.`,
        security: `High Risk. Misaligned mime configurations bypass upload constraints and trigger client script rendering blocks.`,
        details: hazardDetails
      });
    }
  }, [compareExt, compareMime]);

  // Execute comparison when inputs change
  useEffect(() => {
    executeComparison();
  }, [compareExt, compareMime, executeComparison]);

  // JSON / TXT Exports
  const handleDownloadDiagnostics = (type: 'json' | 'txt') => {
    let content = '';
    let filename = 'mime-checker-report';

    if (activeTab === 'lookup' && selectedRecord) {
      filename = `mime-lookup-${selectedRecord.extension.replace('.', '')}`;
      if (type === 'json') {
        content = JSON.stringify(selectedRecord, null, 2);
      } else {
        content = `MIME LOOKUP REPORT\n====================\n\nExtension: ${selectedRecord.extension}\nOfficial MIME Type: ${selectedRecord.mime}\nCategory: ${CATEGORY_LABELS[selectedRecord.category]}\nDescription: ${selectedRecord.description}\nBrowser Behavior: ${selectedRecord.behavior}\nSecurity Profile: ${selectedRecord.security}\nMagic Bytes (Hex): ${selectedRecord.magicBytes?.join(' ') || 'None'}\nAlternatives: ${selectedRecord.alternatives?.join(', ') || 'None'}\n`;
      }
    } else if (activeTab === 'url' && urlResult) {
      filename = `mime-url-audit`;
      if (type === 'json') {
        content = JSON.stringify(urlResult, null, 2);
      } else {
        content = `REMOTE HEADER INSPECTION REPORT\n==============================\n\nURL Analysed: ${urlResult.url}\nStatus: ${urlResult.status} ${urlResult.statusText}\nHTTP Method: ${urlResult.methodUsed}\nMIME Detected: ${urlResult.mimeType}\nCharset: ${urlResult.charset}\nContent-Type Header: ${urlResult.contentTypeHeader}\nContent-Disposition: ${urlResult.contentDisposition}\nX-Content-Type-Options: ${urlResult.xContentTypeOptions}\nCache-Control: ${urlResult.cacheControl}\n\n[SECURITY WARNINGS]\n${urlResult.securityWarnings.length > 0 ? urlResult.securityWarnings.map((w: string, i: number) => ` - [!] ${w}`).join('\n') : 'No security hazards detected.'}\n`;
      }
    } else if (activeTab === 'upload' && uploadedFile) {
      filename = `mime-file-header-audit`;
      if (type === 'json') {
        content = JSON.stringify({
          fileName: uploadedFile.name,
          fileSize: uploadedFile.size,
          reportedType: uploadedFile.type,
          hexBytes: fileHexArray,
          asciiRepresentation: fileAsciiArray,
          audit: fileValidationResult
        }, null, 2);
      } else {
        content = `FILE MAGIC BYTES AUDIT SHEET\n============================\n\nFile Name: ${uploadedFile.name}\nFile Size: ${uploadedFile.size} bytes\nBrowser Mime Type: ${uploadedFile.type}\n\nHex Signatures Read (First 16 Bytes):\n${fileHexArray.join(' ')}\n\nASCII Text Signature:\n${fileAsciiArray.join('')}\n\nAudit Result:\n${fileValidationResult?.message || 'No audit run.'}\n`;
      }
    } else {
      return;
    }

    const blob = new Blob([content], { type: type === 'json' ? 'application/json' : 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${filename}.${type}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered DB explorer list
  const filteredDbRecords = MIME_DATABASE.filter(r => {
    const cleanSearch = dbSearch.toLowerCase().trim();
    const matchesSearch = r.extension.toLowerCase().includes(cleanSearch) || 
                          r.mime.toLowerCase().includes(cleanSearch) || 
                          r.description.toLowerCase().includes(cleanSearch);
    const matchesCategory = dbCategory === 'all' || r.category === dbCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-slate-200 dark:border-slate-800 gap-1 sm:gap-2">
        <button
          onClick={() => setActiveTab('lookup')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-sm transition-all select-none cursor-pointer ${
            activeTab === 'lookup'
              ? 'border-[#518231] text-[#518231]'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Search size={16} />
          <span>Lookup Database</span>
        </button>
        <button
          onClick={() => setActiveTab('url')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-sm transition-all select-none cursor-pointer ${
            activeTab === 'url'
              ? 'border-[#518231] text-[#518231]'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Globe size={16} />
          <span>URL Header Checker</span>
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-sm transition-all select-none cursor-pointer ${
            activeTab === 'upload'
              ? 'border-[#518231] text-[#518231]'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Upload size={16} />
          <span>File Header Validator</span>
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-sm transition-all select-none cursor-pointer ${
            activeTab === 'compare'
              ? 'border-[#518231] text-[#518231]'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <ArrowLeftRight size={16} />
          <span>Compare Workspace</span>
        </button>
        <button
          onClick={() => setActiveTab('database')}
          className={`flex items-center gap-2 px-4 py-3 border-b-2 font-bold text-sm transition-all select-none cursor-pointer ${
            activeTab === 'database'
              ? 'border-[#518231] text-[#518231]'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Layers size={16} />
          <span>Reference Table</span>
        </button>
      </div>

      {/* Lookup & Analyzer Tab */}
      {activeTab === 'lookup' && (
        <div className="space-y-6 animate-fade-in">
          {/* Autocomplete Input Container */}
          <div className="bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-inner relative">
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
              Lookup Extension or MIME Type
            </label>
            <div className="relative" ref={suggestionRef}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={lookupQuery}
                onChange={(e) => handleLookupQueryChange(e.target.value)}
                onFocus={() => setShowSuggestions(lookupSuggestions.length > 0)}
                placeholder="Search extensions (e.g. .png, html) or MIME types (e.g. image/jpeg)..."
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] dark:focus:ring-[#6fa844] text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-all shadow-sm font-mono text-sm"
              />
              {showSuggestions && lookupSuggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden max-h-64 overflow-y-auto">
                  {lookupSuggestions.map((rec, i) => (
                    <div
                      key={i}
                      onClick={() => selectLookupRecord(rec)}
                      className="px-4 py-2.5 hover:bg-[#518231]/5 dark:hover:bg-[#518231]/10 flex items-center justify-between cursor-pointer border-b last:border-0 border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-[#518231] dark:text-[#6fa844] font-mono text-xs">{rec.extension}</span>
                        <span className="text-slate-400 dark:text-slate-600 text-xs">|</span>
                        <span className="text-slate-800 dark:text-slate-200 font-mono text-xs font-semibold">{rec.mime}</span>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {rec.category}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Lookup Details Card */}
          {selectedRecord ? (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
                
                {/* Header Summary */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                        {selectedRecord.extension}
                      </span>
                      <span className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[#518231] dark:text-[#6fa844] font-bold text-xs uppercase tracking-wider font-mono border border-slate-200/50 dark:border-slate-700/50">
                        {CATEGORY_LABELS[selectedRecord.category] || selectedRecord.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-sm text-slate-500 dark:text-slate-400">
                      <span>MIME Type:</span>
                      <strong className="text-slate-800 dark:text-slate-200">{selectedRecord.mime}</strong>
                      <button
                        onClick={() => handleCopy(selectedRecord.mime, 'lookupMime')}
                        className="p-1 text-slate-400 hover:text-[#518231] rounded transition-colors"
                        title="Copy MIME"
                      >
                        {copiedAction === 'lookupMime' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownloadDiagnostics('json')}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Download size={14} />
                      <span>Download JSON</span>
                    </button>
                    <button
                      onClick={() => handleDownloadDiagnostics('txt')}
                      className="px-3.5 py-2 bg-[#518231] hover:bg-[#436c29] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <FileText size={14} />
                      <span>Export TXT</span>
                    </button>
                  </div>
                </div>

                {/* Specs Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Specs */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Info size={12} />
                        <span>Description</span>
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        {selectedRecord.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Activity size={12} />
                        <span>Browser Behavior</span>
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        {selectedRecord.behavior}
                      </p>
                    </div>
                  </div>

                  {/* Right Specs */}
                  <div className="space-y-4">
                    {/* Security profile */}
                    <div className="p-4 rounded-xl border bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800/80">
                      <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                        <ShieldCheck size={14} className="text-[#518231]" />
                        <span>Security Advisory</span>
                      </h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        {selectedRecord.security}
                      </p>
                    </div>

                    {/* Magic bytes if defined */}
                    <div>
                      <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <FileSignature size={12} />
                        <span>Expected Hex Magic Bytes</span>
                      </h4>
                      {selectedRecord.magicBytes && selectedRecord.magicBytes.length > 0 ? (
                        <div className="flex flex-wrap gap-1 font-mono">
                          {selectedRecord.magicBytes.map((byte, idx) => (
                            <span key={idx} className="px-2 py-1 bg-slate-150 dark:bg-slate-800 rounded text-slate-800 dark:text-slate-200 text-xs font-extrabold border border-slate-250/20 dark:border-slate-700/50">
                              {byte}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-400 dark:text-slate-500 italic">
                          No static unique signature bytes defined. Extension relies on file text encoding validation or container structures.
                        </p>
                      )}
                    </div>

                    {/* Alternatives if defined */}
                    {selectedRecord.alternatives && selectedRecord.alternatives.length > 0 && (
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                          <ArrowLeftRight size={12} />
                          <span>Alternative Content-Types</span>
                        </h4>
                        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                          {selectedRecord.alternatives.map((alt, idx) => (
                            <span key={idx} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800/80 rounded text-slate-600 dark:text-slate-400">
                              {alt}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <AlertCircle className="mx-auto text-slate-400 mb-2" size={32} />
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                No lookup record selected. Search above to view file specs.
              </p>
            </div>
          )}
        </div>
      )}

      {/* URL Inspector Tab */}
      {activeTab === 'url' && (
        <div className="space-y-6 animate-fade-in">
          {/* URL inputs form */}
          <div className="bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-inner">
            <div className="space-y-4">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">
                Inspect Remote Asset URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Enter file URL (e.g. https://nexuscalculator.net/favicon.ico)..."
                  className="flex-1 px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] dark:focus:ring-[#6fa844] text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-all shadow-sm font-mono text-sm"
                />
                <button
                  onClick={() => executeUrlCheck(urlInput)}
                  disabled={urlLoading || !urlInput.trim()}
                  className="px-5 bg-[#518231] hover:bg-[#436c29] text-white font-bold text-xs rounded-xl shadow-md disabled:opacity-50 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {urlLoading ? <RefreshCw className="animate-spin" size={14} /> : <RefreshCw size={14} />}
                  <span>Inspect</span>
                </button>
              </div>
            </div>
          </div>

          {/* URL Error view */}
          {urlError && (
            <div className="p-5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-2xl flex items-start gap-4 shadow-sm">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
              <div className="space-y-1">
                <div className="font-extrabold text-red-800 dark:text-red-300">
                  Inspection Failed
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {urlError}
                </p>
              </div>
            </div>
          )}

          {/* URL Results view */}
          {urlResult && (
            <div className="space-y-6 animate-fade-in">
              
              {/* Security Diagnostics Alerts */}
              {urlResult.securityWarnings.length > 0 ? (
                <div className="p-5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl flex items-start gap-4 shadow-sm">
                  <ShieldAlert className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={22} />
                  <div className="space-y-1">
                    <div className="font-extrabold text-amber-800 dark:text-amber-300 text-lg">
                      Header Security Audit
                    </div>
                    <ul className="list-disc pl-5 text-sm text-slate-600 dark:text-slate-400 space-y-1.5 mt-1">
                      {urlResult.securityWarnings.map((warn: string, i: number) => (
                        <li key={i}>{warn}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900/50 rounded-2xl flex items-start gap-4 shadow-sm">
                  <ShieldCheck className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" size={22} />
                  <div className="space-y-1">
                    <div className="font-extrabold text-green-800 dark:text-green-300 text-lg">
                      Headers Secure
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      MIME configurations are properly aligned. &apos;X-Content-Type-Options: nosniff&apos; header identified.
                    </p>
                  </div>
                </div>
              )}

              {/* Main specifications grid */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
                
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold text-xs font-mono uppercase tracking-wider border border-slate-250/20">
                        HTTP {urlResult.status} {urlResult.statusText}
                      </span>
                      <span className="text-xs text-slate-400 font-medium font-mono">Method: {urlResult.methodUsed}</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-200 font-mono break-all">
                      {urlResult.url}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownloadDiagnostics('json')}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Download size={14} />
                      <span>Download JSON</span>
                    </button>
                    <button
                      onClick={() => handleDownloadDiagnostics('txt')}
                      className="px-3.5 py-2 bg-[#518231] hover:bg-[#436c29] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <FileText size={14} />
                      <span>Export TXT</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left specifications */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">MIME Type (Content-Type)</h4>
                      <p className="font-mono text-slate-800 dark:text-slate-200 text-sm font-extrabold">
                        {urlResult.mimeType}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Charset Encoding</h4>
                      <p className="font-mono text-slate-800 dark:text-slate-200 text-sm font-extrabold capitalize">
                        {urlResult.charset}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Full Content-Type Header</h4>
                      <p className="font-mono text-slate-650 dark:text-slate-400 text-xs p-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-lg break-all">
                        {urlResult.contentTypeHeader || 'None'}
                      </p>
                    </div>
                  </div>

                  {/* Right specifications */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Content-Disposition</h4>
                      <p className="font-mono text-slate-800 dark:text-slate-200 text-sm font-bold capitalize">
                        {urlResult.contentDisposition}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Content-Encoding</h4>
                      <p className="font-mono text-slate-800 dark:text-slate-200 text-sm font-bold">
                        {urlResult.contentEncoding}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Cache-Control</h4>
                      <p className="font-mono text-slate-800 dark:text-slate-200 text-sm font-bold">
                        {urlResult.cacheControl}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Raw Headers section */}
              <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
                <div className="px-6 py-4 bg-slate-850 border-b border-slate-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <FileJson size={18} className="text-green-400" />
                    <span className="text-xs font-extrabold text-white uppercase tracking-wider">Raw Response Headers</span>
                  </div>
                  <button
                    onClick={() => handleCopy(JSON.stringify(urlResult.rawHeaders, null, 2), 'rawHeaders')}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                  >
                    {copiedAction === 'rawHeaders' ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                    <span>{copiedAction === 'rawHeaders' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="p-4 bg-slate-950">
                  <pre className="text-xs text-slate-300 font-mono overflow-x-auto max-h-[300px] leading-relaxed custom-scrollbar">
                    <code>{JSON.stringify(urlResult.rawHeaders, null, 2)}</code>
                  </pre>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

      {/* File Upload Validator Tab */}
      {activeTab === 'upload' && (
        <div className="space-y-6 animate-fade-in">
          {/* Drag & Drop workspace */}
          {!uploadedFile ? (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-[#518231] bg-[#518231]/5'
                  : 'border-slate-200 dark:border-slate-800 hover:border-[#518231] dark:hover:border-[#518231]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className="mx-auto text-slate-400 mb-4" size={40} />
              <h3 className="font-extrabold text-slate-800 dark:text-slate-200 text-base mb-1">
                Drag & Drop file here to parse magic bytes
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                Analyze hex headers client-side. File bytes are read locally and never uploaded to the server.
              </p>
              <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer">
                Select File
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              {/* Validation Status Header Banner */}
              {fileValidationResult && (
                <div className={`p-5 rounded-2xl border flex items-start gap-4 shadow-sm ${
                  fileValidationResult.status === 'success'
                    ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50'
                    : fileValidationResult.status === 'error'
                    ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
                    : 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50'
                }`}>
                  {fileValidationResult.status === 'success' ? (
                    <ShieldCheck className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" size={24} />
                  ) : fileValidationResult.status === 'error' ? (
                    <ShieldAlert className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" size={24} />
                  ) : (
                    <AlertCircle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={24} />
                  )}
                  <div className="space-y-1">
                    <div className={`font-extrabold text-lg ${
                      fileValidationResult.status === 'success'
                        ? 'text-green-800 dark:text-green-300'
                        : fileValidationResult.status === 'error'
                        ? 'text-red-800 dark:text-red-300'
                        : 'text-amber-800 dark:text-amber-300'
                    }`}>
                      {fileValidationResult.status === 'success' ? 'Validation Passed' : fileValidationResult.status === 'error' ? 'Validation Failed (Security Alert)' : 'Verification Notice'}
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {fileValidationResult.message}
                    </p>
                  </div>
                </div>
              )}

              {/* Main file information and header diagnostics */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
                
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div className="space-y-1">
                    <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-200 font-mono break-all">
                      {uploadedFile.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
                      <span>Size: {(uploadedFile.size / 1024).toFixed(2)} KB ({uploadedFile.size} bytes)</span>
                      <span>|</span>
                      <span>Type reported: {uploadedFile.type || 'None'}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={resetUploadState}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => handleDownloadDiagnostics('json')}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    >
                      <Download size={14} />
                      <span>Download JSON</span>
                    </button>
                    <button
                      onClick={() => handleDownloadDiagnostics('txt')}
                      className="px-3.5 py-2 bg-[#518231] hover:bg-[#436c29] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <FileText size={14} />
                      <span>Export TXT</span>
                    </button>
                  </div>
                </div>

                {/* Bytes Inspector Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                  {/* Hex display */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <FileCode size={14} />
                      <span>First 16 Bytes (Hex Representation)</span>
                    </h4>
                    <div className="grid grid-cols-8 gap-2 font-mono text-center">
                      {fileHexArray.map((hex, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-lg text-slate-850 dark:text-slate-200 text-xs font-black shadow-inner flex flex-col items-center">
                          <span className="text-[9px] text-slate-400 dark:text-slate-600 font-normal mb-1">{idx}</span>
                          <span>{hex}</span>
                        </div>
                      ))}
                      {fileHexArray.length === 0 && (
                        <div className="col-span-8 p-3 text-slate-400 text-xs italic">Reading file...</div>
                      )}
                    </div>
                  </div>

                  {/* Character/ASCII representation */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <FileText size={14} />
                      <span>First 16 Bytes (ASCII Representation)</span>
                    </h4>
                    <div className="grid grid-cols-8 gap-2 font-mono text-center">
                      {fileAsciiArray.map((char, idx) => (
                        <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-900 rounded-lg text-slate-850 dark:text-slate-200 text-xs font-black shadow-inner flex flex-col items-center">
                          <span className="text-[9px] text-slate-400 dark:text-slate-600 font-normal mb-1">{idx}</span>
                          <span>{char}</span>
                        </div>
                      ))}
                      {fileAsciiArray.length === 0 && (
                        <div className="col-span-8 p-3 text-slate-400 text-xs italic">Reading file...</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Audit Comparison Details */}
                {fileValidationResult && (
                  <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 mb-4">Diagnostics Matrix</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                      
                      <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="text-slate-400 block mb-1">Expected Extension Format</span>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm">
                          {uploadedFile.name.substring(uploadedFile.name.lastIndexOf('.')) || 'None'}
                        </span>
                      </div>

                      <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="text-slate-400 block mb-1">Browser Reported MIME</span>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm break-all">
                          {uploadedFile.type || 'unknown'}
                        </span>
                      </div>

                      <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="text-slate-400 block mb-1">Binary Detected MIME</span>
                        <span className="font-extrabold text-slate-800 dark:text-slate-200 text-sm break-all">
                          {fileValidationResult.detectedType ? fileValidationResult.detectedType.mime : 'unrecognized'}
                        </span>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      )}

      {/* Compare Workspace Tab */}
      {activeTab === 'compare' && (
        <div className="space-y-6 animate-fade-in">
          {/* Controls */}
          <div className="bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Select File Extension
                </label>
                <select
                  value={compareExt}
                  onChange={(e) => setCompareExt(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-white font-mono text-sm"
                >
                  {MIME_DATABASE.map((r, i) => (
                    <option key={i} value={r.extension}>
                      {r.extension} ({CATEGORY_LABELS[r.category]})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Input Content-Type MIME
                </label>
                <input
                  type="text"
                  value={compareMime}
                  onChange={(e) => setCompareMime(e.target.value)}
                  placeholder="e.g. image/png or text/html"
                  className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-white font-mono text-sm"
                />
              </div>

            </div>
          </div>

          {/* Compare result cards */}
          {compareResult && (
            <div className="space-y-6 animate-fade-in">
              {/* Score header */}
              <div className={`p-5 rounded-2xl border flex items-start gap-4 shadow-sm ${
                compareResult.match
                  ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50'
                  : compareResult.status === 'danger'
                  ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
                  : 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50'
              }`}>
                {compareResult.match ? (
                  <ShieldCheck className="text-green-600 dark:text-green-400 shrink-0 mt-0.5" size={24} />
                ) : compareResult.status === 'danger' ? (
                  <ShieldAlert className="text-red-600 dark:text-red-400 shrink-0 mt-0.5" size={24} />
                ) : (
                  <AlertCircle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={24} />
                )}
                <div className="space-y-1">
                  <div className={`font-extrabold text-lg ${
                    compareResult.match
                      ? 'text-green-800 dark:text-green-300'
                      : compareResult.status === 'danger'
                      ? 'text-red-800 dark:text-red-300'
                      : 'text-amber-800 dark:text-amber-300'
                  }`}>
                    {compareResult.match ? 'Configurations Aligned' : compareResult.status === 'danger' ? 'Severe Configuration Mismatch' : 'Minor Mismatch / Deprecated mapping'}
                  </div>
                  <p className="text-slate-650 dark:text-slate-400 text-sm font-semibold">
                    {compareResult.details}
                  </p>
                </div>
              </div>

              {/* Details grid */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
                <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Activity className="text-[#518231]" size={16} />
                  <span>Cross-Reference Alignment Matrix</span>
                </h3>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  
                  <div className="py-3 flex flex-wrap justify-between items-center gap-2">
                    <span className="text-slate-500 font-medium">Mapped Category</span>
                    <span className="font-extrabold text-slate-800 dark:text-slate-200 font-mono">
                      {compareResult.category}
                    </span>
                  </div>

                  <div className="py-3">
                    <span className="text-slate-500 font-medium block mb-1">Parser Compatibility</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {compareResult.compatibility}
                    </span>
                  </div>

                  <div className="py-3">
                    <span className="text-slate-500 font-medium block mb-1">MIME Security Profile</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {compareResult.security}
                    </span>
                  </div>

                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Database Explorer Tab */}
      {activeTab === 'database' && (
        <div className="space-y-6 animate-fade-in">
          {/* Search controls */}
          <div className="bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-inner flex flex-wrap md:flex-nowrap gap-4">
            
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Search size={16} />
              </div>
              <input
                type="text"
                value={dbSearch}
                onChange={(e) => setDbSearch(e.target.value)}
                placeholder="Search extensions or MIME types..."
                className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] dark:focus:ring-[#6fa844] text-slate-800 dark:text-white text-xs font-mono"
              />
            </div>

            <div className="w-full md:w-56">
              <select
                value={dbCategory}
                onChange={(e) => setDbCategory(e.target.value)}
                className="w-full px-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none text-slate-800 dark:text-white text-xs font-bold"
              >
                <option value="all">All Categories</option>
                {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Reference Table Explorer */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full border-collapse text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-950 text-slate-400 font-extrabold uppercase border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Extension</th>
                    <th className="px-6 py-4">Official MIME Type</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Description</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                  {filteredDbRecords.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/50 transition-colors">
                      <td className="px-6 py-4 font-mono font-black text-slate-900 dark:text-white">{r.extension}</td>
                      <td className="px-6 py-4 font-mono font-bold text-[#518231] dark:text-[#6fa844]">{r.mime}</td>
                      <td className="px-6 py-4 uppercase">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-bold text-[10px]">
                          {r.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-650 dark:text-slate-400 max-w-sm truncate" title={r.description}>
                        {r.description}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => selectLookupRecord(r)}
                            className="p-1 hover:text-[#518231] text-slate-400 rounded transition-colors"
                            title="Inspect Details"
                          >
                            <FileSearch size={14} />
                          </button>
                          <button
                            onClick={() => handleCopy(r.mime, `dbCopy-${i}`)}
                            className="p-1 hover:text-[#518231] text-slate-400 rounded transition-colors"
                            title="Copy MIME"
                          >
                            {copiedAction === `dbCopy-${i}` ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredDbRecords.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-slate-400 italic">
                        No MIME records found matching search filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
