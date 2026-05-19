"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  Upload, Copy, Download, Trash2, Search, Table as TableIcon,
  BarChart3, FileJson, FileText, CheckCircle, AlertTriangle,
  ChevronDown, Settings2, Code2, Play, GitCompare, WrapText,
  Filter, ArrowUpDown, LayoutGrid, CheckSquare, Sparkles, ClipboardCheck,
  EyeOff, ArrowLeft, ArrowRight, CaseSensitive, GripVertical
} from "lucide-react";
import { useTheme } from "next-themes";
import Editor from "@monaco-editor/react";
import {
  parseCSV, analyzeCSV, validateCSV, csvToJson, jsonToCsv, exportCSV, exportTSV, exportTXT,
  copyToClipboard, downloadFile, buildColumnInfo, sortRows, filterRows, searchCSV,
  ParsedCSV, ValidationError, ColumnInfo, CSVAnalytics, SearchResult, SortConfig, FilterConfig,
  SAMPLE_DATASETS
} from "./utils";

export function CsvViewerTool() {
  const { resolvedTheme } = useTheme();
  const monacoTheme = resolvedTheme === "dark" ? "vs-dark" : "light";

  // State
  const [csvInput, setCsvInput] = useState<string>("");
  const [jsonInput, setJsonInput] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"viewer" | "csv2json" | "json2csv" | "analytics" | "validation">("viewer");
  
  // Parsed Data
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [columns, setColumns] = useState<ColumnInfo[]>([]);
  const [parseErrors, setParseErrors] = useState<ValidationError[]>([]);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  
  // UI State
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showSamples, setShowSamples] = useState(false);
  const [showColManager, setShowColManager] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Table Features State
  const [sortConfig, setSortConfig] = useState<SortConfig[]>([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [editingCell, setEditingCell] = useState<{row: number, col: number} | null>(null);
  const [editValue, setEditValue] = useState("");
  
  // Search Features
  const [searchQuery, setSearchQuery] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [currentSearchIdx, setCurrentSearchIdx] = useState(-1);

  // History (Undo/Redo)
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  // Analytics Cache
  const analytics = useMemo(() => analyzeCSV(headers, rows), [headers, rows]);

  // Load saved state
  useEffect(() => {
    const saved = localStorage.getItem("csv_viewer_input");
    if (saved) {
      processCsvContent(saved, false);
    }
  }, []);

  const pushHistory = useCallback((content: string) => {
    const newHistory = history.slice(0, historyIdx + 1);
    newHistory.push(content);
    if (newHistory.length > 20) newHistory.shift(); // keep last 20
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
  }, [history, historyIdx]);

  const handleUndo = useCallback(() => {
    if (historyIdx > 0) {
      const prev = history[historyIdx - 1];
      setHistoryIdx(historyIdx - 1);
      processCsvContent(prev, false);
    }
  }, [history, historyIdx]);

  const handleRedo = useCallback(() => {
    if (historyIdx < history.length - 1) {
      const next = history[historyIdx + 1];
      setHistoryIdx(historyIdx + 1);
      processCsvContent(next, false);
    }
  }, [history, historyIdx]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        if (e.shiftKey) {
          e.preventDefault(); handleRedo();
        } else {
          e.preventDefault(); handleUndo();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleUndo, handleRedo]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const processCsvContent = (content: string, saveHistory = true) => {
    setIsProcessing(true);
    setCsvInput(content);
    localStorage.setItem("csv_viewer_input", content);
    if (saveHistory) pushHistory(content);
    
    // Defer processing to avoid UI block
    setTimeout(() => {
      try {
        const parsed = parseCSV(content);
        setHeaders(parsed.headers);
        setRows(parsed.rows);
        setParseErrors(parsed.errors);
        
        const cols = buildColumnInfo(parsed.headers, parsed.rows);
        setColumns(cols);
        
        const vErrors = validateCSV(parsed.headers, parsed.rows, parsed.errors);
        setValidationErrors(vErrors);
        
        // Reset view states
        setSortConfig([]);
        setSearchQuery("");
        setSearchResults([]);
        setCurrentSearchIdx(-1);
      } catch (err) {
        showToast("Error parsing CSV");
      }
      setIsProcessing(false);
    }, 50);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        processCsvContent(ev.target.result as string);
        showToast("File loaded successfully");
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        processCsvContent(text);
        showToast("Pasted from clipboard");
      }
    } catch {
      showToast("Could not paste from clipboard");
    }
  };

  const handleClear = () => {
    setCsvInput("");
    setHeaders([]);
    setRows([]);
    setColumns([]);
    setParseErrors([]);
    setValidationErrors([]);
    setHistory([]);
    setHistoryIdx(-1);
    localStorage.removeItem("csv_viewer_input");
    showToast("Cleared");
  };

  const handleDownload = (format: "csv" | "json" | "tsv" | "txt") => {
    if (rows.length === 0) return;
    let content = "";
    let ext = format;
    let mime = "text/plain";

    switch(format) {
      case "csv": content = exportCSV(headers, rows); mime = "text/csv"; break;
      case "json": content = csvToJson(headers, rows); mime = "application/json"; break;
      case "tsv": content = exportTSV(headers, rows); mime = "text/tab-separated-values"; break;
      case "txt": content = exportTXT(headers, rows); break;
    }

    downloadFile(content, `export.${ext}`, mime);
    showToast(`Downloaded as ${ext.toUpperCase()}`);
  };

  const handleCopy = async (text: string, key: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
      showToast("Copied to clipboard!");
    }
  };

  const handleCellDoubleCLick = (r: number, c: number, val: string) => {
    setEditingCell({row: r, col: c});
    setEditValue(val);
  };

  const saveCellEdit = () => {
    if (!editingCell) return;
    const newRows = [...rows];
    newRows[editingCell.row][editingCell.col] = editValue;
    setRows(newRows);
    setEditingCell(null);
    
    const newCsv = exportCSV(headers, newRows);
    setCsvInput(newCsv);
    localStorage.setItem("csv_viewer_input", newCsv);
    pushHistory(newCsv);
  };

  const handleSort = (colIndex: number) => {
    let newDirection: "asc" | "desc" = "asc";
    const existing = sortConfig.find(s => s.column === colIndex);
    if (existing && existing.direction === "asc") {
      newDirection = "desc";
    }
    setSortConfig([{ column: colIndex, direction: newDirection }]);
  };

  const toggleColumnVisibility = (colIndex: number) => {
    const newCols = [...columns];
    newCols[colIndex].visible = !newCols[colIndex].visible;
    setColumns(newCols);
  };

  // Execute Search
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      setCurrentSearchIdx(-1);
      return;
    }
    const results = searchCSV(rows, searchQuery, caseSensitive);
    setSearchResults(results);
    if (results.length > 0) setCurrentSearchIdx(0);
    else setCurrentSearchIdx(-1);
  }, [searchQuery, caseSensitive, rows]);

  const navSearch = (dir: 1 | -1) => {
    if (searchResults.length === 0) return;
    let next = currentSearchIdx + dir;
    if (next < 0) next = searchResults.length - 1;
    if (next >= searchResults.length) next = 0;
    setCurrentSearchIdx(next);
    
    // Scroll into view
    const res = searchResults[next];
    if (res) {
      const el = document.getElementById(`cell-${res.row}-${res.col}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
    }
  };

  // Derived state for table
  const displayRows = useMemo(() => {
    let result = rows.map((r, i) => ({ originalIndex: i, data: r }));
    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      result = result.filter(r => r.data.some(cell => String(cell).toLowerCase().includes(q)));
    }
    if (sortConfig.length > 0) {
      result.sort((a, b) => {
        for (const sort of sortConfig) {
          const va = a.data[sort.column] || '';
          const vb = b.data[sort.column] || '';
          const numA = Number(va);
          const numB = Number(vb);
          let cmp: number;
          if (!isNaN(numA) && !isNaN(numB) && va !== '' && vb !== '') cmp = numA - numB;
          else cmp = va.localeCompare(vb, undefined, { numeric: true, sensitivity: 'base' });
          if (cmp !== 0) return sort.direction === 'asc' ? cmp : -cmp;
        }
        return 0;
      });
    }
    return result;
  }, [rows, filterQuery, sortConfig]);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2 bg-[#518231] text-white rounded-lg shadow-lg text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-200">
          {toast}
        </div>
      )}

      {/* Primary Toolbar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          
          <button onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg font-medium transition-colors flex items-center gap-2 text-sm shadow-sm">
            <Upload size={16} /> <span className="hidden sm:inline">Upload CSV</span>
          </button>
          <input type="file" accept=".csv,.txt,.tsv" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />

          <button onClick={handlePaste}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm border border-slate-200 dark:border-slate-700">
            <ClipboardCheck size={16} /> <span className="hidden sm:inline">Paste</span>
          </button>

          <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden sm:block" />

          {/* Sample Data */}
          <div className="relative">
            <button onClick={() => setShowSamples(!showSamples)}
              className="px-3 py-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-sm dark:text-slate-400">
              <Sparkles size={16} className="text-amber-500" /> Samples <ChevronDown size={14} />
            </button>
            {showSamples && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 py-1 animate-in fade-in slide-in-from-top-1">
                {SAMPLE_DATASETS.map((sample, i) => (
                  <button key={i} onClick={() => { processCsvContent(sample.csv); setShowSamples(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                    <div className="font-semibold">{sample.name}</div>
                    <div className="text-xs text-slate-500 truncate">{sample.description}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
        </div>

        <div className="flex flex-wrap items-center gap-2">
          
          {rows.length > 0 && (
            <>
              {/* Row Filter */}
              <div className="relative flex items-center">
                <Filter size={16} className="absolute left-3 text-slate-400" />
                <input type="text" placeholder="Filter rows..." value={filterQuery} onChange={e => setFilterQuery(e.target.value)}
                  className="pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm w-36 focus:w-48 transition-all focus:outline-none focus:border-[#518231]" />
              </div>

              {/* Global Search */}
              <div className="relative flex items-center bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pr-1 focus-within:border-[#518231]">
                <Search size={16} className="absolute left-3 text-slate-400" />
                <input type="text" placeholder="Search..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-2 py-1.5 bg-transparent text-sm w-36 focus:w-48 transition-all focus:outline-none" />
                
                {searchQuery && (
                  <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-700 pl-2">
                    <span className="text-xs text-slate-500 w-12 text-center">
                      {searchResults.length > 0 ? `${currentSearchIdx + 1}/${searchResults.length}` : '0/0'}
                    </span>
                    <button onClick={() => navSearch(-1)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500"><ArrowLeft size={14}/></button>
                    <button onClick={() => navSearch(1)} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500"><ArrowRight size={14}/></button>
                  </div>
                )}
                <button onClick={() => setCaseSensitive(!caseSensitive)} title="Match Case"
                  className={`p-1.5 ml-1 rounded ${caseSensitive ? 'bg-[#518231]/10 text-[#518231]' : 'text-slate-400 hover:text-slate-600'}`}>
                  <CaseSensitive size={14} />
                </button>
              </div>

              <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden lg:block" />

              {/* Column Manager */}
              <div className="relative">
                <button onClick={() => setShowColManager(!showColManager)}
                  className="px-3 py-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-sm dark:text-slate-400">
                  <LayoutGrid size={16} /> Columns
                </button>
                {showColManager && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-30 py-2 px-3 animate-in fade-in slide-in-from-top-1 max-h-80 overflow-y-auto custom-scrollbar">
                    <h4 className="text-xs font-semibold uppercase text-slate-500 mb-2">Manage Columns</h4>
                    <div className="space-y-1">
                      {columns.map((col, idx) => (
                        <label key={idx} className="flex items-center gap-2 p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded cursor-pointer">
                          <input type="checkbox" checked={col.visible} onChange={() => toggleColumnVisibility(idx)} className="rounded text-[#518231] focus:ring-[#518231]" />
                          <span className="text-sm text-slate-700 dark:text-slate-300 truncate">{col.name || `Column ${idx+1}`}</span>
                          <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 rounded ml-auto text-slate-500">{col.type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="relative group">
                <button className="px-3 py-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1.5 text-sm dark:text-slate-400">
                  <Download size={16} /> Export <ChevronDown size={14} />
                </button>
                <div className="absolute right-0 top-full mt-1 w-32 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 py-1 hidden group-hover:block">
                  <button onClick={() => handleDownload("csv")} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Export CSV</button>
                  <button onClick={() => handleDownload("json")} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Export JSON</button>
                  <button onClick={() => handleDownload("tsv")} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Export TSV</button>
                  <button onClick={() => handleDownload("txt")} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-800">Export TXT</button>
                </div>
              </div>
            </>
          )}

          <button onClick={handleClear}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors dark:text-red-400" title="Clear All">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto custom-scrollbar border-b border-slate-200 dark:border-slate-800">
        {[
          { key: "viewer", icon: TableIcon, label: "Table Viewer" },
          { key: "analytics", icon: BarChart3, label: "Analytics" },
          { key: "csv2json", icon: FileJson, label: "CSV → JSON" },
          { key: "json2csv", icon: FileText, label: "JSON → CSV" },
          { key: "validation", icon: CheckSquare, label: "Validation" }
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.key ? "border-[#518231] text-[#518231] bg-[#518231]/5" : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/50"
            }`}>
            <tab.icon size={16} />
            {tab.label}
            {tab.key === "validation" && validationErrors.length > 0 && (
              <span className="bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300 text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1">
                {validationErrors.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Area */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden min-h-[600px] flex flex-col">
        
        {/* VIEWER TAB */}
        {activeTab === "viewer" && (
          <div className="flex-1 overflow-auto custom-scrollbar relative h-[600px] bg-slate-50 dark:bg-[#1e1e1e]">
            {rows.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
                <TableIcon size={48} className="opacity-20" />
                <p>Upload a CSV file or paste data to view the table</p>
                <button onClick={() => setShowSamples(true)} className="text-[#518231] hover:underline text-sm font-medium">
                  Or load a sample dataset
                </button>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-max text-sm">
                <thead className="sticky top-0 bg-white dark:bg-slate-900 z-10 shadow-sm border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="w-12 px-2 py-2 border-r border-slate-200 dark:border-slate-800 text-center text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-800/50">#</th>
                    {columns.map((col, cIdx) => col.visible && (
                      <th key={cIdx} 
                        className="px-4 py-2.5 font-semibold text-slate-700 dark:text-slate-200 border-r border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer group select-none whitespace-nowrap relative"
                        onClick={() => handleSort(cIdx)}>
                        <div className="flex items-center justify-between gap-2">
                          <span>{col.name || `Column ${cIdx+1}`}</span>
                          <ArrowUpDown size={14} className={`transition-opacity ${sortConfig.find(s => s.column === cIdx) ? 'text-[#518231] opacity-100' : 'text-slate-300 group-hover:text-slate-500 opacity-0 group-hover:opacity-100'}`} />
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-[#1e1e1e] divide-y divide-slate-100 dark:divide-slate-800/50">
                  {displayRows.map((rowObj, displayIdx) => {
                    const rIdx = rowObj.originalIndex;
                    const row = rowObj.data;
                    return (
                    <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-2 py-1.5 border-r border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 select-none bg-slate-50 dark:bg-slate-800/20 group-hover:bg-slate-100 dark:group-hover:bg-slate-800/50">
                        {displayIdx + 1}
                      </td>
                      {columns.map((col, cIdx) => {
                        if (!col.visible) return null;
                        const cell = row[cIdx];
                        const isEditing = editingCell?.row === rIdx && editingCell?.col === cIdx;
                        
                        // Search highlighting
                        const isSearchMatch = searchResults.some(sr => sr.row === rIdx && sr.col === cIdx);
                        const isCurrentSearchMatch = searchResults[currentSearchIdx]?.row === rIdx && searchResults[currentSearchIdx]?.col === cIdx;
                        
                        return (
                        <td key={cIdx} id={`cell-${rIdx}-${cIdx}`}
                          className={`px-4 py-1.5 border-r border-slate-100 dark:border-slate-800/50 text-slate-600 dark:text-slate-300 relative truncate max-w-xs ${isCurrentSearchMatch ? 'bg-amber-100 dark:bg-amber-900/40 border-amber-300' : isSearchMatch ? 'bg-amber-50 dark:bg-amber-900/20' : ''}`}
                          onDoubleClick={() => handleCellDoubleCLick(rIdx, cIdx, cell || '')}>
                          {isEditing ? (
                            <input autoFocus value={editValue} onChange={e => setEditValue(e.target.value)}
                              onBlur={saveCellEdit} onKeyDown={e => e.key === 'Enter' && saveCellEdit()}
                              className="absolute inset-0 w-full h-full px-4 border-2 border-[#518231] focus:outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white z-10" />
                          ) : (
                            <span className="block truncate">{cell}</span>
                          )}
                        </td>
                      )})}
                    </tr>
                  )})}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <div className="flex-1 p-6 overflow-auto bg-white dark:bg-slate-900">
             {rows.length === 0 ? (
               <div className="flex flex-col items-center justify-center h-full py-20 text-slate-500">
                 <BarChart3 size={48} className="opacity-20 mb-4" />
                 <p>Load CSV data to see analytics</p>
               </div>
             ) : (
               <div className="space-y-8 max-w-5xl mx-auto">
                 <div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                     <BarChart3 size={20} className="text-[#518231]" /> Dataset Overview
                   </h3>
                   <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                     {[
                       { label: "Total Rows", value: analytics.rowCount.toLocaleString() },
                       { label: "Total Columns", value: analytics.columnCount.toLocaleString() },
                       { label: "Empty Cells", value: analytics.emptyCells.toLocaleString() },
                       { label: "Duplicate Rows", value: analytics.duplicateRows.toLocaleString() },
                       { label: "Est. File Size", value: analytics.fileSizeEstimate },
                     ].map((stat, i) => (
                       <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 text-center">
                         <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                         <div className="text-xs font-semibold text-[#518231] uppercase tracking-wider mt-1">{stat.label}</div>
                       </div>
                     ))}
                   </div>
                 </div>

                 <div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                     <LayoutGrid size={20} className="text-[#518231]" /> Column Analysis
                   </h3>
                   <div className="overflow-hidden border border-slate-200 dark:border-slate-700 rounded-xl">
                     <table className="w-full text-left text-sm">
                       <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                         <tr>
                           <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Column Name</th>
                           <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Data Type</th>
                           <th className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">Empty Values</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                         {columns.map((col, i) => (
                           <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                             <td className="px-4 py-2.5 text-slate-900 dark:text-slate-100 font-medium">{col.name || `Column ${i+1}`}</td>
                             <td className="px-4 py-2.5">
                               <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                 col.type === 'number' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                 col.type === 'date' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                 col.type === 'boolean' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' :
                                 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                               }`}>{col.type}</span>
                             </td>
                             <td className="px-4 py-2.5 text-slate-600 dark:text-slate-400">
                               {col.emptyCells > 0 ? (
                                 <span className="text-amber-600 dark:text-amber-400">{col.emptyCells}</span>
                               ) : "0"}
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
        )}

        {/* CSV to JSON */}
        {activeTab === "csv2json" && (
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#518231]">JSON Output</span>
              <button onClick={() => handleCopy(csvToJson(headers, rows), "json_out")} className="text-xs flex items-center gap-1 text-slate-600 hover:text-[#518231]">
                {copiedKey === "json_out" ? <span className="text-green-500 font-medium">Copied!</span> : <><Copy size={12} /> Copy</>}
              </button>
            </div>
            <div className="w-full" style={{ height: "600px" }}>
              <Editor height="100%" language="json" theme={monacoTheme} value={rows.length ? csvToJson(headers, rows) : "[\n  // Upload CSV to generate JSON\n]"}
                options={{ readOnly: true, minimap: { enabled: false }, fontSize: 14 }} />
            </div>
          </div>
        )}

        {/* JSON to CSV */}
        {activeTab === "json2csv" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800" style={{ minHeight: "600px" }}>
             <div className="flex flex-col h-full">
               <div className="flex justify-between items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                 <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Input JSON Array</span>
               </div>
               <div className="w-full flex-1" style={{ minHeight: "300px" }}>
                 <Editor height="100%" language="json" theme={monacoTheme} value={jsonInput} onChange={val => setJsonInput(val || "")}
                   options={{ minimap: { enabled: false }, fontSize: 14 }} />
               </div>
             </div>
             <div className="flex flex-col h-full bg-slate-50 dark:bg-[#1e1e1e] p-4">
               <div className="flex justify-between items-center mb-4">
                 <span className="text-xs font-semibold uppercase tracking-wider text-[#518231]">Converted CSV</span>
                 <button onClick={() => {
                   const res = jsonToCsv(jsonInput);
                   if (!res.errors.length) {
                     setHeaders(res.headers);
                     setRows(res.rows);
                     setCsvInput(exportCSV(res.headers, res.rows));
                     setActiveTab("viewer");
                     showToast("Imported to Table!");
                   } else {
                     showToast("Invalid JSON");
                   }
                 }} className="px-3 py-1 bg-[#518231] text-white rounded text-sm hover:bg-[#436a28] shadow-sm font-medium">Import to Table</button>
               </div>
               <div className="flex-1 overflow-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded p-3 font-mono text-xs whitespace-pre shadow-inner min-h-[300px]">
                 {jsonInput ? (() => {
                   const res = jsonToCsv(jsonInput);
                   if (res.errors.length > 0) return <span className="text-red-500">{res.errors[0].message}</span>;
                   return exportCSV(res.headers, res.rows);
                 })() : <span className="text-slate-400">Waiting for JSON input...</span>}
               </div>
             </div>
          </div>
        )}

        {/* VALIDATION TAB */}
        {activeTab === "validation" && (
          <div className="flex-1 p-6 overflow-auto bg-slate-50 dark:bg-slate-900">
            {validationErrors.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-20 text-slate-500">
                <CheckCircle size={48} className="opacity-20 text-green-500 mb-4" />
                <p>No validation errors found in the current CSV data.</p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-4">
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle size={24} className="text-red-600 dark:text-red-400 shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-red-800 dark:text-red-300 text-lg">Found {validationErrors.length} Issues</h3>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">Review the list below and fix the data in the table viewer.</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {validationErrors.map((err, i) => (
                    <div key={i} className={`p-4 rounded-lg border flex items-start gap-3 bg-white dark:bg-slate-800 ${
                      err.severity === 'error' ? 'border-red-200 dark:border-red-800/50' : 'border-amber-200 dark:border-amber-800/50'
                    }`}>
                      {err.severity === 'error' ? 
                        <AlertTriangle size={18} className="text-red-500 mt-0.5 shrink-0" /> : 
                        <AlertTriangle size={18} className="text-amber-500 mt-0.5 shrink-0" />
                      }
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                          <span className="text-xs uppercase tracking-wider text-slate-500 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded">Row {err.row}</span>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{err.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
