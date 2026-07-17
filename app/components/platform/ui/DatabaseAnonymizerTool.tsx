'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Upload, ScanSearch, Shield, Download, Eye, EyeOff,
  CheckCircle2, AlertTriangle, ChevronDown, X, Zap,
  BarChart3, FileText, RefreshCw, Copy, Settings,
  AlertCircle, Table, Play, RotateCcw
} from 'lucide-react';
import { parseFile, exportToCsv, exportToJson, exportToTsv } from '../../../lib/anonymizer/fileParser';
import { profileColumns, anonymize, ColumnProfile } from '../../../lib/anonymizer';
import { STRATEGY_LABELS, STRATEGY_DESCRIPTIONS, MaskingStrategy } from '../../../lib/anonymizer/maskingStrategies';
import { useToast } from './Toast';

type Step = 'upload' | 'scan' | 'configure' | 'process' | 'done';
type ExportFormat = 'csv' | 'json' | 'tsv';

const RISK_COLORS = {
  High:   { badge: 'text-red-400 bg-red-400/10 border-red-400/20', bar: 'bg-red-500' },
  Medium: { badge: 'text-amber-400 bg-amber-400/10 border-amber-400/20', bar: 'bg-amber-500' },
  Low:    { badge: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', bar: 'bg-emerald-500' },
};

const STEP_LABELS: Record<Step, string> = {
  upload: 'Upload File',
  scan: 'Scanning…',
  configure: 'Configure Rules',
  process: 'Anonymizing…',
  done: 'Done',
};

// ── Strategy selector dropdown ───────────────────────────────────────────────
function StrategySelect({ value, onChange }: { value: string; onChange: (v: MaskingStrategy | 'skip') => void }) {
  const [open, setOpen] = useState(false);
  const all: (MaskingStrategy | 'skip')[] = ['skip', ...Object.keys(STRATEGY_LABELS) as MaskingStrategy[]];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white/80 transition-all w-48 text-left"
      >
        <span className="flex-1 truncate">{value === 'skip' ? 'Skip (no masking)' : STRATEGY_LABELS[value as MaskingStrategy]}</span>
        <ChevronDown className={`w-3 h-3 text-white/40 transition-transform shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full mt-1 left-0 z-50 bg-[#0E1420] border border-white/15 rounded-xl shadow-2xl overflow-hidden w-64"
          >
            <div className="max-h-72 overflow-y-auto">
              {all.map(s => (
                <button key={s} onClick={() => { onChange(s); setOpen(false); }}
                  className={`w-full text-left px-3 py-2.5 text-xs transition-colors ${value === s ? 'bg-violet-500/20 text-violet-300' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
                  <div className="font-medium">{s === 'skip' ? 'Skip (no masking)' : STRATEGY_LABELS[s as MaskingStrategy]}</div>
                  {s !== 'skip' && (
                    <div className="text-white/30 mt-0.5 text-[10px] leading-snug truncate">
                      {STRATEGY_DESCRIPTIONS[s as MaskingStrategy]}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {open && <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export function DatabaseAnonymizerTool() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<Step>('upload');
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);

  // Dataset state
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows]       = useState<string[][]>([]);
  const [profiles, setProfiles] = useState<ColumnProfile[]>([]);
  const [resultRows, setResultRows]  = useState<string[][]>([]);
  const [stats, setStats] = useState<{ totalRows: number; columnsScanned: number; piiColumnsFound: number; cellsMasked: number; processingMs: number } | null>(null);

  // UI state
  const [previewMode, setPreviewMode] = useState<'original' | 'masked'>('original');
  const [showAllColumns, setShowAllColumns] = useState(false);
  const [exportFormat, setExportFormat] = useState<ExportFormat>('csv');
  const [scanProgress, setScanProgress] = useState(0);

  // ── File ingestion ──────────────────────────────────────────────────────
  const processFile = useCallback(async (file: File) => {
    if (!file) return;
    const MAX = 50 * 1024 * 1024; // 50MB
    if (file.size > MAX) { toast({ title: 'File too large', message: 'Maximum file size is 50MB', type: 'error' }); return; }

    setFileName(file.name);
    setFileSize(file.size);
    setStep('scan');
    setScanProgress(0);

    // Simulate scanning progress
    const scanTimer = setInterval(() => setScanProgress(p => Math.min(p + 8, 90)), 60);

    try {
      const text = await file.text();
      const dataset = parseFile(text, file.name, 50000);

      if (!dataset.headers.length) {
        toast({ title: 'Parse error', message: 'Could not detect columns in this file', type: 'error' });
        setStep('upload');
        return;
      }

      clearInterval(scanTimer);
      setScanProgress(100);

      // Short delay for UX
      await new Promise(r => setTimeout(r, 400));

      setHeaders(dataset.headers);
      setRows(dataset.rows);

      // Profile columns (detect PII)
      const profs = profileColumns(dataset.headers, dataset.rows);
      setProfiles(profs);

      setStep('configure');
    } catch (err) {
      clearInterval(scanTimer);
      toast({ title: 'Read error', message: String(err), type: 'error' });
      setStep('upload');
    }
  }, [toast]);

  // ── Drag & drop ─────────────────────────────────────────────────────────
  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, [processFile]);

  // ── Profile update helpers ──────────────────────────────────────────────
  const updateStrategy = (index: number, strategy: MaskingStrategy | 'skip') => {
    setProfiles(prev => prev.map(p => p.index === index
      ? { ...p, strategy, enabled: strategy !== 'skip' } : p));
  };

  const toggleColumn = (index: number) => {
    setProfiles(prev => prev.map(p => p.index === index
      ? { ...p, enabled: !p.enabled, strategy: !p.enabled ? (p.pii ? 'partial_mask' : 'skip') : 'skip' } : p));
  };

  // ── Run anonymization ────────────────────────────────────────────────────
  const runAnonymize = useCallback(() => {
    setStep('process');
    setProgress(0);

    // Run in next tick to allow render
    setTimeout(() => {
      const result = anonymize(headers, rows, profiles, (pct) => setProgress(pct));
      setResultRows(result.rows);
      setStats(result.stats);
      setPreviewMode('masked');
      setStep('done');
      toast({
        title: '✅ Anonymization complete',
        message: `${result.stats.cellsMasked.toLocaleString()} cells masked in ${result.stats.processingMs}ms`,
        type: 'success',
      });
    }, 50);
  }, [headers, rows, profiles, toast]);

  // ── Export ───────────────────────────────────────────────────────────────
  const downloadResult = () => {
    const data = resultRows.length ? resultRows : rows;
    let content = '', mime = '', ext = '';

    if (exportFormat === 'csv') {
      content = exportToCsv(headers, data); mime = 'text/csv'; ext = 'csv';
    } else if (exportFormat === 'json') {
      content = exportToJson(headers, data); mime = 'application/json'; ext = 'json';
    } else {
      content = exportToTsv(headers, data); mime = 'text/tab-separated-values'; ext = 'tsv';
    }

    const blob = new Blob([content], { type: mime });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `anonymized_${fileName.replace(/\.[^.]+$/, '')}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'Download started', message: `Exporting as ${ext.toUpperCase()}`, type: 'success' });
  };

  const reset = () => {
    setStep('upload'); setHeaders([]); setRows([]); setProfiles([]);
    setResultRows([]); setStats(null); setProgress(0); setScanProgress(0);
    setFileName(''); setFileSize(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Preview table ────────────────────────────────────────────────────────
  const displayRows = previewMode === 'masked' && resultRows.length ? resultRows : rows;
  const displayedCols = showAllColumns ? headers : headers.slice(0, 8);

  const piiCols = profiles.filter(p => p.pii !== null);
  const enabledCols = profiles.filter(p => p.enabled);

  return (
    <div className="space-y-6">

      {/* ── Stepper ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-1">
        {(['upload','scan','configure','process','done'] as Step[]).map((s, i) => {
          const steps: Step[] = ['upload','scan','configure','process','done'];
          const idx = steps.indexOf(step);
          const done = steps.indexOf(s) < idx;
          const active = s === step;
          return (
            <React.Fragment key={s}>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                active ? 'bg-violet-600 text-white' :
                done   ? 'bg-violet-600/20 text-violet-400' :
                         'bg-white/5 text-white/30'
              }`}>
                {done ? <CheckCircle2 className="w-3 h-3" /> : <span>{i + 1}</span>}
                {STEP_LABELS[s]}
              </div>
              {i < 4 && <div className={`flex-1 h-px ${done || active ? 'bg-violet-600/50' : 'bg-white/10'}`} />}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── Upload Zone ───────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {step === 'upload' && (
          <motion.div key="upload" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer transition-all duration-200 group ${
                dragging
                  ? 'border-violet-500 bg-violet-500/10 scale-[1.01]'
                  : 'border-white/10 hover:border-violet-500/50 hover:bg-white/[0.02]'
              }`}
            >
              <input ref={fileInputRef} type="file" accept=".csv,.tsv,.json,.txt,.log" className="hidden" onChange={onFileChange} />

              <motion.div animate={{ y: dragging ? -4 : 0 }} transition={{ type: 'spring', stiffness: 400 }}>
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all ${dragging ? 'bg-violet-500/20' : 'bg-white/5 group-hover:bg-violet-500/10'}`}>
                  <Upload className={`w-8 h-8 transition-colors ${dragging ? 'text-violet-400' : 'text-white/30 group-hover:text-violet-400'}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {dragging ? 'Release to upload' : 'Drop your file here'}
                </h3>
                <p className="text-white/40 text-sm mb-6">or click to browse · CSV, TSV, JSON, TXT · up to 50MB</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['CSV', 'TSV', 'JSON', 'TXT / LOG'].map(fmt => (
                    <span key={fmt} className="text-xs text-white/40 bg-white/5 border border-white/10 rounded-full px-3 py-1">{fmt}</span>
                  ))}
                </div>
              </motion.div>

              {/* Glow pulse when dragging */}
              {dragging && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ boxShadow: '0 0 0 3px rgba(139,92,246,0.4), inset 0 0 60px rgba(139,92,246,0.08)' }} />
              )}
            </div>

            {/* Sample data button */}
            <div className="text-center mt-4">
              <button
                onClick={() => {
                  const csv = `id,first_name,last_name,email,phone,ssn,credit_card,ip_address,dob,address\n1,Alice,Smith,alice.smith@example.com,555-867-5309,123-45-6789,4111111111111111,192.168.1.100,1990-03-15,"123 Main St, Springfield"\n2,Bob,Johnson,bob.j@test.org,+1-800-555-0199,987-65-4321,5500005555555559,10.0.0.55,1985-07-22,"456 Oak Ave, Riverdale"\n3,Carol,Williams,carol@demo.net,555-234-5678,456-78-9012,378282246310005,172.16.0.1,1972-11-08,"789 Pine Rd, Shelbyville"\n4,David,Brown,d.brown@sample.io,+44-20-7946-0958,321-65-4789,6011111111111117,8.8.8.8,1995-01-30,"321 Elm Dr, Maplewood"\n5,Eve,Garcia,eve.garcia@placeholder.com,555-987-6543,654-32-1987,4012888888881881,203.0.113.5,1988-09-14,"654 Cedar Ln, Hillcrest"`;
                  const blob = new Blob([csv], { type: 'text/csv' });
                  processFile(new File([blob], 'sample_users.csv', { type: 'text/csv' }));
                }}
                className="text-sm text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
              >
                Try with sample data →
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Scanning ───────────────────────────────────────────── */}
        {step === 'scan' && (
          <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-5">
              <ScanSearch className="w-8 h-8 text-violet-400 animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Scanning for PII…</h3>
            <p className="text-white/40 text-sm mb-6">{fileName}</p>
            <div className="max-w-xs mx-auto bg-white/5 rounded-full h-2 overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full"
                animate={{ width: `${scanProgress}%` }} transition={{ ease: 'easeOut' }} />
            </div>
            <p className="text-xs text-white/30 mt-3">{scanProgress}% complete</p>
          </motion.div>
        )}

        {/* ── Processing ─────────────────────────────────────────── */}
        {step === 'process' && (
          <motion.div key="process" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-5">
              <Zap className="w-8 h-8 text-violet-400 animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Anonymizing data…</h3>
            <p className="text-white/40 text-sm mb-6">Applying masking rules to {rows.length.toLocaleString()} rows</p>
            <div className="max-w-xs mx-auto bg-white/5 rounded-full h-2 overflow-hidden">
              <motion.div className="h-full bg-gradient-to-r from-violet-600 to-indigo-500 rounded-full"
                animate={{ width: `${progress}%` }} transition={{ ease: 'easeOut' }} />
            </div>
            <p className="text-xs text-white/30 mt-3">{progress}% complete</p>
          </motion.div>
        )}

        {/* ── Configure ─────────────────────────────────────────── */}
        {(step === 'configure' || step === 'done') && (
          <motion.div key="configure" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="space-y-5">

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Total Rows',    value: rows.length.toLocaleString(),            icon: Table },
                { label: 'Columns',       value: headers.length,                          icon: BarChart3 },
                { label: 'PII Detected',  value: piiCols.length,                          icon: AlertTriangle },
                { label: 'To Mask',       value: enabledCols.length,                      icon: Shield },
              ].map(s => (
                <div key={s.label} className="bg-[#0A0F1A] border border-white/10 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                    <s.icon className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-white">{String(s.value)}</p>
                    <p className="text-xs text-white/40">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Done stats */}
            {step === 'done' && stats && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-5 py-4 flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                <div className="flex-1 text-sm text-emerald-300">
                  <span className="font-bold">{stats.cellsMasked.toLocaleString()} cells anonymized</span>
                  {' '}across{' '}
                  <span className="font-bold">{stats.piiColumnsFound} PII columns</span>
                  {' '}in{' '}
                  <span className="font-bold">{stats.processingMs}ms</span>
                </div>
                <div className="flex items-center gap-2">
                  <select value={exportFormat} onChange={e => setExportFormat(e.target.value as ExportFormat)}
                    className="text-xs bg-white/10 border border-white/10 rounded-lg px-2 py-1.5 text-white outline-none cursor-pointer">
                    <option value="csv">CSV</option>
                    <option value="json">JSON</option>
                    <option value="tsv">TSV</option>
                  </select>
                  <button onClick={downloadResult}
                    className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                    <Download className="w-3.5 h-3.5" /> Download
                  </button>
                </div>
              </motion.div>
            )}

            {/* Column rule editor */}
            <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                <div>
                  <h3 className="text-sm font-semibold text-white">Column Masking Rules</h3>
                  <p className="text-xs text-white/40 mt-0.5">Toggle columns and select masking strategy per column</p>
                </div>
                <div className="flex items-center gap-2">
                  {step === 'configure' && (
                    <motion.button
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={runAnonymize}
                      disabled={enabledCols.length === 0}
                      className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
                    >
                      <Play className="w-3.5 h-3.5" /> Run Anonymization
                    </motion.button>
                  )}
                  {step === 'done' && (
                    <button onClick={reset}
                      className="flex items-center gap-1.5 text-white/50 hover:text-white text-xs px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-all">
                      <RotateCcw className="w-3 h-3" /> New File
                    </button>
                  )}
                </div>
              </div>

              <div className="divide-y divide-white/[0.04]">
                {profiles.map(prof => (
                  <div key={prof.index}
                    className={`flex items-center gap-4 px-5 py-3 transition-colors ${prof.enabled ? 'bg-violet-500/[0.04]' : ''}`}>
                    {/* Toggle */}
                    <button onClick={() => toggleColumn(prof.index)}
                      className={`w-8 h-4 rounded-full transition-all flex items-center shrink-0 ${prof.enabled ? 'bg-violet-600' : 'bg-white/10'}`}>
                      <span className={`w-3 h-3 rounded-full bg-white shadow transition-transform mx-0.5 ${prof.enabled ? 'translate-x-4' : 'translate-x-0'}`} />
                    </button>

                    {/* Column name */}
                    <div className="w-36 shrink-0">
                      <p className={`text-xs font-mono font-medium truncate ${prof.enabled ? 'text-white' : 'text-white/40'}`}>{prof.name}</p>
                      <p className="text-[10px] text-white/25 mt-0.5">{prof.values.length} values</p>
                    </div>

                    {/* PII info */}
                    <div className="flex-1 min-w-0">
                      {prof.pii ? (
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-semibold border rounded-full px-2 py-0.5 ${RISK_COLORS[prof.pii.risk].badge}`}>
                            {prof.pii.risk}
                          </span>
                          <span className="text-xs text-white/60">{prof.pii.label}</span>
                          <div className="flex items-center gap-1">
                            <div className="w-10 h-1 bg-white/10 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${RISK_COLORS[prof.pii.risk].bar}`}
                                style={{ width: `${prof.pii.confidence}%` }} />
                            </div>
                            <span className="text-[10px] text-white/30">{prof.pii.confidence}%</span>
                          </div>
                          <span className="text-[10px] text-white/25 font-mono">{prof.pii.sampleMasked}</span>
                        </div>
                      ) : (
                        <span className="text-[10px] text-white/25">No PII detected</span>
                      )}
                    </div>

                    {/* Strategy selector */}
                    <StrategySelect value={prof.strategy} onChange={v => updateStrategy(prof.index, v)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Data preview */}
            {rows.length > 0 && (
              <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-white/40" />
                    <h3 className="text-sm font-semibold text-white">Data Preview</h3>
                    <span className="text-xs text-white/30">first 5 rows</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {step === 'done' && (
                      <div className="flex items-center gap-1 bg-white/5 rounded-lg p-0.5">
                        <button onClick={() => setPreviewMode('original')}
                          className={`text-xs px-2.5 py-1 rounded-md transition-all ${previewMode === 'original' ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'}`}>
                          Original
                        </button>
                        <button onClick={() => setPreviewMode('masked')}
                          className={`text-xs px-2.5 py-1 rounded-md transition-all ${previewMode === 'masked' ? 'bg-violet-600 text-white' : 'text-white/40 hover:text-white'}`}>
                          Anonymized
                        </button>
                      </div>
                    )}
                    {headers.length > 8 && (
                      <button onClick={() => setShowAllColumns(s => !s)}
                        className="text-xs text-white/40 hover:text-white/70 transition-colors">
                        {showAllColumns ? `Show fewer` : `+${headers.length - 8} more cols`}
                      </button>
                    )}
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-[#080D18]">
                      <tr>
                        {displayedCols.map(h => {
                          const prof = profiles.find(p => p.name === h);
                          return (
                            <th key={h} className="text-left px-4 py-3 font-medium text-white/40 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                {prof?.pii && (
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    prof.pii.risk === 'High' ? 'bg-red-500' :
                                    prof.pii.risk === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                                  }`} />
                                )}
                                {h}
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {displayRows.slice(0, 5).map((row, ri) => (
                        <tr key={ri} className="border-t border-white/[0.04] hover:bg-white/[0.02]">
                          {displayedCols.map((h, ci) => {
                            const colIdx = headers.indexOf(h);
                            const prof = profiles.find(p => p.index === colIdx);
                            const isMasked = step === 'done' && previewMode === 'masked' && prof?.enabled;
                            return (
                              <td key={ci} className="px-4 py-2.5">
                                <span className={`font-mono ${isMasked ? 'text-violet-400' : 'text-white/60'} truncate block max-w-[160px]`}>
                                  {row[colIdx] || <span className="text-white/20">—</span>}
                                </span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {rows.length > 5 && (
                  <div className="px-5 py-3 border-t border-white/[0.04] text-xs text-white/30">
                    Showing 5 of {rows.length.toLocaleString()} rows
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
