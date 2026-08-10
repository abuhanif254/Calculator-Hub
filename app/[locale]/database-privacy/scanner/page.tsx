'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, Shield, AlertTriangle, CheckCircle, Download, Loader2,
  Database, Play, RefreshCw, ChevronDown, ChevronUp, TableProperties,
  Rows3, AlertCircle, ScanSearch, FileText, CheckCircle2, XCircle,
} from 'lucide-react';

// â”€â”€ Browser-side PII detectors (unchanged) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const PII_DETECTORS = [
  { id: 'email', name: 'Email Address', category: 'Contact Info', risk: 'High', confidence: 99, icon: 'ðŸ“§',
    regex: /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g,
    maskOptions: ['Hash (SHA-256)', 'Domain anonymize', 'Synthetic email', 'Redact'],
    recommendation: 'Pseudonymize or hash email addresses per GDPR Article 4(5)' },
  { id: 'ssn', name: 'Social Security Number', category: 'Government ID', risk: 'Critical', confidence: 97, icon: 'ðŸ”',
    regex: /\b(?!000|666|9\d{2})\d{3}[\-\s]?(?!00)\d{2}[\-\s]?(?!0000)\d{4}\b/g,
    maskOptions: ['Full redact', 'Partial mask (***-**-1234)', 'Tokenize'],
    recommendation: 'Immediately redact SSNs â€” maximum HIPAA/PCI risk' },
  { id: 'creditcard', name: 'Credit Card Number', category: 'Financial', risk: 'Critical', confidence: 95, icon: 'ðŸ’³',
    regex: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\b/g,
    maskOptions: ['PAN masking (last 4)', 'Full tokenize', 'Redact'],
    recommendation: 'PCI-DSS requires storing only last 4 digits of PAN' },
  { id: 'phone', name: 'Phone Number', category: 'Contact Info', risk: 'Medium', confidence: 88, icon: 'ðŸ“±',
    regex: /\b(?:\+?\d{1,3}[\s.\-]?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}\b/g,
    maskOptions: ['Partial mask (***-***-5678)', 'Hash', 'Redact'],
    recommendation: 'Mask phone middle digits, preserve country code' },
  { id: 'ip', name: 'IP Address (IPv4)', category: 'Network', risk: 'Medium', confidence: 95, icon: 'ðŸŒ',
    regex: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    maskOptions: ['Generalize to /24 subnet', 'Hash', 'Redact'],
    recommendation: 'GDPR treats IP as personal data â€” generalize to subnet' },
  { id: 'dob', name: 'Date of Birth', category: 'Personal Info', risk: 'High', confidence: 85, icon: 'ðŸ“…',
    regex: /\b(?:0?[1-9]|1[0-2])[\-\/](?:0?[1-9]|[12]\d|3[01])[\-\/](?:19|20)\d{2}\b/g,
    maskOptions: ['Year only', 'Age range (30-40)', 'Redact'],
    recommendation: 'Replace with age range to minimize re-identification risk' },
  { id: 'jwt', name: 'JWT Token', category: 'Security', risk: 'Critical', confidence: 99, icon: 'ðŸ”‘',
    regex: /\beyJ[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\b/g,
    maskOptions: ['Full redact', 'Rotate & tokenize'],
    recommendation: 'Rotate token immediately â€” JWTs contain signed claims' },
  { id: 'apikey', name: 'API Key / Secret', category: 'Security', risk: 'Critical', confidence: 80, icon: 'ðŸ—ï¸',
    regex: /(?:api[_-]?key|secret|token|password|passwd|pwd)\s*[:=]\s*['"]?([A-Za-z0-9_.\-]{16,})/gi,
    maskOptions: ['Full redact', 'Rotate & vault'],
    recommendation: 'Rotate all exposed API keys immediately and store in secrets vault' },
  { id: 'iban', name: 'IBAN', category: 'Financial', risk: 'High', confidence: 96, icon: 'ðŸ¦',
    regex: /\b[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}(?:[A-Z0-9]{0,16})\b/g,
    maskOptions: ['Partial mask', 'Tokenize', 'Redact'],
    recommendation: 'Apply PCI-DSS masking for all banking identifiers' },
  { id: 'zip', name: 'ZIP / Postal Code', category: 'Location', risk: 'Low', confidence: 82, icon: 'ðŸ“®',
    regex: /\b\d{5}(?:-\d{4})?\b/g,
    maskOptions: ['3-digit generalization', 'Redact'],
    recommendation: 'HIPAA: generalize to 3-digit ZIP for populations < 20,000' },
];

function applyMask(value: string, strategy: string, type: string): string {
  if (strategy === 'Redact' || strategy === 'Full redact') return '***REDACTED***';
  if (strategy.includes('Partial') && type === 'ssn') return '***-**-' + value.replace(/\D/g, '').slice(-4);
  if (strategy.includes('Partial') && type === 'phone') return '***-***-' + value.replace(/\D/g, '').slice(-4);
  if (strategy.includes('PAN') || strategy.includes('last 4')) return '**** **** **** ' + value.replace(/\D/g, '').slice(-4);
  if (strategy.includes('Hash')) {
    let h = 5381;
    for (let i = 0; i < value.length; i++) h = ((h << 5) + h) ^ value.charCodeAt(i);
    return 'hash:' + (h >>> 0).toString(16).padStart(8, '0');
  }
  if (strategy.includes('subnet') || strategy.includes('/24')) return value.replace(/\d+$/, '0/24');
  if (strategy.includes('Year only')) return value.match(/(19|20)\d{2}/)?.[0] || value;
  if (strategy.includes('3-digit')) return value.slice(0, 3) + '00';
  if (strategy.includes('Domain anonymize')) return value.replace(/@.*/, '@[anonymized.com]');
  return '[MASKED]';
}

type ScanResult = {
  id: number; detectorId: string; name: string; category: string; risk: string;
  confidence: number; value: string; recommendation: string; maskOptions: string[]; icon: string;
};

interface Connection { id: string; name: string; type: string; }
interface SchemaTable { name: string; rowCount: number | null; columns: { name: string; dataType: string }[]; }
interface Finding {
  id: string; table_name: string; column_name: string; detector_id: string; detector_name: string;
  risk_level: string; occurrences: number; sample_masked: string | null;
}
interface ScanMeta {
  id: string; status: string; tables_scanned: number; rows_scanned: number;
  findings_count: number; connection_name: string; started_at: string; completed_at: string | null;
}

const RISK_COLORS: Record<string, string> = {
  Critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
  High:     'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  Medium:   'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  Low:      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
};

// â”€â”€ Main Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function PiiScanner() {
  const [activeTab, setActiveTab] = useState<'browser' | 'database'>('browser');
  const params = useParams();
  const locale = (params?.locale as string) ?? 'en';

  // â”€â”€ Browser scanner state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<ScanResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [activeDetectors, setActiveDetectors] = useState<Set<string>>(new Set(PII_DETECTORS.map(d => d.id)));
  const [selectedMasks, setSelectedMasks] = useState<Record<string, string>>({});
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  // â”€â”€ Database scanner state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const [connections, setConnections] = useState<Connection[]>([]);
  const [connLoading, setConnLoading] = useState(false);
  const [selectedConn, setSelectedConn] = useState<string>('');
  const [schema, setSchema] = useState<SchemaTable[]>([]);
  const [schemaLoading, setSchemaLoading] = useState(false);
  const [schemaError, setSchemaError] = useState('');
  const [selectedTables, setSelectedTables] = useState<Set<string>>(new Set());
  const [expandedTable, setExpandedTable] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState('');
  const [scanResult, setScanResult] = useState<{ meta: ScanMeta; findings: Finding[] } | null>(null);
  const [riskFilter, setRiskFilter] = useState('');

  // Load connections when DB tab opens
  useEffect(() => {
    if (activeTab !== 'database') return;
    setConnLoading(true);
    privacyFetch('/api/privacy/connections')
      .then(r => r.json())
      .then(d => setConnections(d.connections ?? []))
      .catch(() => {})
      .finally(() => setConnLoading(false));
  }, [activeTab]);

  // Load schema when connection selected
  useEffect(() => {
    if (!selectedConn) { setSchema([]); return; }
    setSchemaLoading(true);
    setSchemaError('');
    setSelectedTables(new Set());
    setScanResult(null);
    privacyFetch(`/api/privacy/connections/${selectedConn}/schema`)
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error);
        setSchema(d.tables ?? []);
      })
      .catch(e => setSchemaError(e.message))
      .finally(() => setSchemaLoading(false));
  }, [selectedConn]);

  // â”€â”€ Browser scan handler â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleBrowserScan = () => {
    if (!inputText.trim()) return;
    setIsScanning(true);
    setHasScanned(false);
    setTimeout(() => {
      const found: ScanResult[] = [];
      let counter = 0;
      PII_DETECTORS.filter(d => activeDetectors.has(d.id)).forEach(detector => {
        const regex = new RegExp(detector.regex.source, detector.regex.flags);
        let match;
        while ((match = regex.exec(inputText)) !== null) {
          const value = match[1] || match[0];
          found.push({
            id: counter++, detectorId: detector.id, name: detector.name, category: detector.category,
            risk: detector.risk, confidence: detector.confidence,
            value: value.length > 40 ? value.slice(0, 40) + '...' : value,
            recommendation: detector.recommendation, maskOptions: detector.maskOptions, icon: detector.icon,
          });
        }
      });
      setResults(found);
      setIsScanning(false);
      setHasScanned(true);
    }, 600);
  };

  // â”€â”€ Database scan handler â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleDbScan = async () => {
    if (!selectedConn || selectedTables.size === 0) return;
    setScanning(true);
    setScanError('');
    setScanResult(null);
    try {
      const res = await privacyFetch('/api/privacy/scans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connectionId: selectedConn, selectedTables: Array.from(selectedTables) }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Scan failed');
      // Fetch findings
      const findRes = await privacyFetch(`/api/privacy/scans/${data.scanId}/findings`);
      const findData = await findRes.json();
      setScanResult({ meta: findData.scan, findings: findData.findings ?? [] });
    } catch (e: any) {
      setScanError(e.message);
    } finally {
      setScanning(false);
    }
  };

  const toggleTable = (name: string) => {
    const s = new Set(selectedTables);
    if (s.has(name)) s.delete(name); else s.add(name);
    setSelectedTables(s);
  };

  const filteredFindings = scanResult?.findings.filter(f =>
    riskFilter ? f.risk_level === riskFilter : true
  ) ?? [];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
          <ScanSearch className="w-7 h-7 text-violet-600" /> PII Scanner
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
          Detect PII in pasted text or scan your real database tables directly.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800/60 rounded-xl w-fit">
        {(['browser', 'database'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-white dark:bg-slate-900 text-violet-700 dark:text-violet-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}>
            {tab === 'browser' ? 'ðŸ“ Text / Paste' : 'ðŸ—„ï¸ Database Scan'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* â”€â”€ BROWSER SCANNER TAB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {activeTab === 'browser' && (
          <motion.div key="browser" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input panel */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-violet-500" /> Input Data
                  </h3>
                  <div className="flex gap-2 text-xs">
                    {[
                      { label: 'SQL', val: "INSERT INTO users VALUES (1, 'john.doe@example.com', '555-123-4567', '123-45-6789', '4532015112830366', '192.168.1.42', '02/15/1985', '10001');" },
                      { label: 'CSV', val: "name,email,phone,ssn\nJohn Doe,john.doe@example.com,555-123-4567,123-45-6789\nJane Smith,jane.smith@corp.com,+1 800 555-9876,987-65-4321" },
                      { label: 'JSON', val: '{"users":[{"email":"alice@example.com","phone":"(415) 555-2671","ssn":"456-78-9012","card":"5425233430109903","ip":"203.0.113.42","api_key":"sk-live-aB3dEf7gHiJkLm9nOpQrSt"}]}' },
                    ].map(s => (
                      <button key={s.label} onClick={() => setInputText(s.val)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-colors">
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
                <textarea value={inputText} onChange={e => setInputText(e.target.value)}
                  placeholder="Paste raw text, SQL, JSON, or CSV here to scan for PII..."
                  className="w-full h-64 p-4 font-mono text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 resize-none"
                />
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Active Detectors</h4>
                  <div className="flex flex-wrap gap-2 max-h-28 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                    {PII_DETECTORS.map(d => (
                      <label key={d.id} className="flex items-center gap-2 text-xs bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-violet-300 dark:hover:border-violet-700">
                        <input type="checkbox" checked={activeDetectors.has(d.id)}
                          onChange={() => {
                            const s = new Set(activeDetectors);
                            s.has(d.id) ? s.delete(d.id) : s.add(d.id);
                            setActiveDetectors(s);
                          }}
                          className="rounded text-violet-600 focus:ring-violet-500" />
                        <span>{d.icon} {d.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button onClick={handleBrowserScan} disabled={isScanning || !inputText.trim()}
                    className="inline-flex items-center px-6 py-2.5 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                    {isScanning ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Search className="w-4 h-4 mr-2" />}
                    {isScanning ? 'Scanning...' : 'Run Scan'}
                  </button>
                </div>
              </div>

              {/* Results panel */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col min-h-[500px]">
                <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-violet-500" /> Scan Results
                  </h3>
                  {results.length > 0 && (
                    <span className="text-xs font-medium text-slate-500">{results.length} findings</span>
                  )}
                </div>
                <div className="flex-1 overflow-auto p-5">
                  {!hasScanned ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                      <Search className="w-10 h-10 mb-3 opacity-20" />
                      <p className="text-sm">Enter data and run a scan to see results.</p>
                    </div>
                  ) : results.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-500">
                      <CheckCircle className="w-10 h-10 mb-3 opacity-50" />
                      <p className="font-medium text-sm">No PII detected!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(['Critical', 'High', 'Medium', 'Low'] as const).map(r => {
                          const count = results.filter(x => x.risk === r).length;
                          return count > 0 ? (
                            <span key={r} className={`px-3 py-1 rounded-full text-xs font-bold border ${RISK_COLORS[r]}`}>
                              {count} {r}
                            </span>
                          ) : null;
                        })}
                      </div>
                      {results.map(result => (
                        <div key={result.id} className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                          <div className="p-3.5 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-between gap-3"
                            onClick={() => setExpandedRow(expandedRow === result.id ? null : result.id)}>
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <span className="text-lg shrink-0">{result.icon}</span>
                              <div className="truncate">
                                <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mr-2 border ${RISK_COLORS[result.risk]}`}>{result.risk}</span>
                                <span className="font-medium text-sm text-slate-800 dark:text-slate-200">{result.name}</span>
                              </div>
                            </div>
                            <div className="text-xs font-mono bg-white dark:bg-slate-900 px-2 py-1 rounded border border-slate-200 dark:border-slate-700 truncate max-w-[140px] shrink-0">
                              {selectedMasks[result.id] ? applyMask(result.value, selectedMasks[result.id], result.detectorId) : result.value}
                            </div>
                          </div>
                          {expandedRow === result.id && (
                            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-3">
                              <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Recommendation</p>
                                <p className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                                  <Shield className="w-3.5 h-3.5 mt-0.5 text-violet-500 shrink-0" />{result.recommendation}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Masking Strategy</p>
                                <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                                  value={selectedMasks[result.id] || ''}
                                  onChange={e => setSelectedMasks(p => ({ ...p, [result.id]: e.target.value }))}>
                                  <option value="">-- Select masking strategy --</option>
                                  {result.maskOptions.map(o => <option key={o} value={o}>{o}</option>)}
                                </select>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Compliance cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
              {[
                { title: 'GDPR Compliance', color: 'violet', text: 'Article 4(5) requires pseudonymization of personal data to reduce risks to the data subjects.' },
                { title: 'HIPAA Safe Harbor', color: 'blue', text: 'De-identification requires removal of 18 specific identifiers including names, dates, and geographic data.' },
                { title: 'PCI-DSS Standards', color: 'amber', text: 'Requirement 3.4 mandates rendering Primary Account Numbers (PAN) unreadable anywhere it is stored.' },
              ].map(c => (
                <div key={c.title} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                  <h4 className={`font-semibold text-${c.color}-600 dark:text-${c.color}-400 mb-2`}>{c.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{c.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* â”€â”€ DATABASE SCANNER TAB â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {activeTab === 'database' && (
          <motion.div key="database" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="space-y-6">

            {/* Step 1 â€” Select connection */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="w-6 h-6 bg-violet-600 text-white rounded-full text-xs font-bold flex items-center justify-center">1</span>
                Select Database Connection
              </h3>
              {connLoading ? (
                <div className="flex items-center gap-2 text-sm text-slate-500"><Loader2 className="w-4 h-4 animate-spin" /> Loading connectionsâ€¦</div>
              ) : connections.length === 0 ? (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <AlertCircle className="w-4 h-4" />
                  No connections yet. <a href="./connections" className="text-violet-600 hover:underline">Add a connection first â†’</a>
                </div>
              ) : (
                <select value={selectedConn} onChange={e => setSelectedConn(e.target.value)}
                  className="w-full max-w-sm px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500">
                  <option value="">-- Choose a connection --</option>
                  {connections.map(c => <option key={c.id} value={c.id}>{c.name} ({c.type})</option>)}
                </select>
              )}
            </div>

            {/* Step 2 â€” Select tables */}
            {selectedConn && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 bg-violet-600 text-white rounded-full text-xs font-bold flex items-center justify-center">2</span>
                    Select Tables to Scan
                  </h3>
                  {schema.length > 0 && (
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedTables(new Set(schema.map(t => t.name)))}
                        className="text-xs text-violet-600 hover:underline">Select all</button>
                      <span className="text-slate-300 dark:text-slate-700">|</span>
                      <button onClick={() => setSelectedTables(new Set())}
                        className="text-xs text-slate-500 hover:underline">Clear</button>
                    </div>
                  )}
                </div>

                {schemaLoading ? (
                  <div className="flex items-center gap-2 text-sm text-slate-500"><Loader2 className="w-4 h-4 animate-spin" />Loading schemaâ€¦</div>
                ) : schemaError ? (
                  <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl text-sm text-red-700 dark:text-red-400">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />{schemaError}
                  </div>
                ) : schema.length === 0 ? (
                  <p className="text-sm text-slate-500">No tables found in this database.</p>
                ) : (
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {schema.map(table => (
                      <div key={table.name} className={`border rounded-xl overflow-hidden transition-colors ${
                        selectedTables.has(table.name)
                          ? 'border-violet-300 dark:border-violet-700 bg-violet-50 dark:bg-violet-900/10'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30'
                      }`}>
                        <div className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                          onClick={() => toggleTable(table.name)}>
                          <input type="checkbox" readOnly checked={selectedTables.has(table.name)}
                            className="rounded text-violet-600 focus:ring-violet-500 cursor-pointer" />
                          <TableProperties className="w-4 h-4 text-violet-500 shrink-0" />
                          <span className="font-mono text-sm font-medium text-slate-800 dark:text-slate-200 flex-1">{table.name}</span>
                          <span className="text-xs text-slate-400">{table.columns.length} cols</span>
                          {table.rowCount !== null && (
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <Rows3 className="w-3 h-3" />~{table.rowCount.toLocaleString()}
                            </span>
                          )}
                          <button onClick={e => { e.stopPropagation(); setExpandedTable(expandedTable === table.name ? null : table.name); }}
                            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-0.5">
                            {expandedTable === table.name ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                        {expandedTable === table.name && (
                          <div className="px-4 pb-3 pt-0 grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                            {table.columns.map(col => (
                              <div key={col.name} className="flex items-center gap-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-1 rounded-lg">
                                <span className="font-mono text-slate-700 dark:text-slate-300 truncate">{col.name}</span>
                                <span className="text-slate-400 shrink-0">{col.dataType}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {selectedTables.size > 0 && (
                  <p className="text-xs text-violet-600 dark:text-violet-400 mt-3">
                    {selectedTables.size} table{selectedTables.size > 1 ? 's' : ''} selected â€” scans up to 500 rows per table
                  </p>
                )}
              </div>
            )}

            {/* Step 3 â€” Run scan */}
            {selectedConn && schema.length > 0 && (
              <div className="flex items-center gap-4">
                <button onClick={handleDbScan} disabled={scanning || selectedTables.size === 0}
                  className="flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-violet-600/20 disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                  {scanning ? <><Loader2 className="w-4 h-4 animate-spin" />Scanning databaseâ€¦</> : <><Play className="w-4 h-4" />Start PII Scan</>}
                </button>
                {selectedTables.size === 0 && <p className="text-sm text-slate-500">Select at least one table above</p>}
              </div>
            )}

            {scanError && (
              <div className="flex items-start gap-2 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl text-sm text-red-700 dark:text-red-400">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />{scanError}
              </div>
            )}

            {/* Scan results */}
            {scanResult && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
                {/* Summary bar */}
                <div className="p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex items-center gap-2">
                      {scanResult.meta.findings_count === 0
                        ? <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        : <AlertTriangle className="w-5 h-5 text-orange-500" />}
                      <span className="font-bold text-slate-900 dark:text-white">
                        {scanResult.meta.findings_count} PII finding{scanResult.meta.findings_count !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <span className="text-sm text-slate-500">{scanResult.meta.tables_scanned} tables Â· {scanResult.meta.rows_scanned.toLocaleString()} rows scanned</span>
                    <div className="ml-auto flex gap-2">
                      {(['Critical', 'High', 'Medium', 'Low', ''] as const).map(r => {
                        const label = r || 'All';
                        const count = r ? scanResult.findings.filter(f => f.risk_level === r).length : scanResult.findings.length;
                        return (
                          <button key={label} onClick={() => setRiskFilter(r as string)}
                            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                              riskFilter === r
                                ? (r ? `${RISK_COLORS[r]} border` : 'bg-violet-600 text-white')
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}>
                            {label} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {filteredFindings.length === 0 ? (
                  <div className="py-16 text-center text-slate-400">
                    <CheckCircle2 className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
                    <p className="font-medium text-slate-600 dark:text-slate-400">
                      {scanResult.meta.findings_count === 0 ? 'No PII detected! Your data looks clean.' : 'No findings for this filter.'}
                    </p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredFindings.map(finding => {
                      const ruleUrl = `/${locale}/database-privacy/masking/rules?` + new URLSearchParams({
                        conn: selectedConn,
                        connName: connections.find(c => c.id === selectedConn)?.name ?? '',
                        table: finding.table_name,
                        col: finding.column_name,
                        detector: finding.detector_id ?? '',
                        detectorName: finding.detector_name,
                        risk: finding.risk_level,
                      }).toString();
                      return (
                        <div key={finding.id} className="px-5 py-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${RISK_COLORS[finding.risk_level]}`}>
                            {finding.risk_level}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">{finding.detector_name}</p>
                            <p className="text-xs text-slate-500 font-mono">
                              {finding.table_name}.<span className="text-violet-600 dark:text-violet-400">{finding.column_name}</span>
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-bold text-slate-900 dark:text-white">{finding.occurrences}</p>
                            <p className="text-xs text-slate-400">occurrences</p>
                          </div>
                          {finding.sample_masked && (
                            <div className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-slate-600 dark:text-slate-400 shrink-0">
                              {finding.sample_masked}
                            </div>
                          )}
                          <a href={ruleUrl}
                            className="shrink-0 text-xs font-medium text-violet-600 hover:text-violet-800 dark:text-violet-400 dark:hover:text-violet-200 bg-violet-50 hover:bg-violet-100 dark:bg-violet-900/20 dark:hover:bg-violet-900/40 px-2.5 py-1.5 rounded-lg transition-colors whitespace-nowrap">
                            Save as Rule â†’
                          </a>
                        </div>
                      );
                    })}
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