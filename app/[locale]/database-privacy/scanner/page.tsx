'use client'

import React, { useState } from 'react';
import { Search, Shield, AlertTriangle, CheckCircle, Download, Copy, Eye, EyeOff, Loader2, X } from 'lucide-react';

const PII_DETECTORS = [
  { id: 'email', name: 'Email Address', category: 'Contact Info', risk: 'High', confidence: 99, icon: '📧',
    regex: /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g,
    maskOptions: ['Hash (SHA-256)', 'Domain anonymize', 'Synthetic email', 'Redact'],
    recommendation: 'Pseudonymize or hash email addresses per GDPR Article 4(5)' },
  { id: 'ssn', name: 'Social Security Number', category: 'Government ID', risk: 'Critical', confidence: 97, icon: '🔐',
    regex: /\b(?!000|666|9\d{2})\d{3}[\-\s]?(?!00)\d{2}[\-\s]?(?!0000)\d{4}\b/g,
    maskOptions: ['Full redact', 'Partial mask (***-**-1234)', 'Tokenize'],
    recommendation: 'Immediately redact SSNs — maximum HIPAA/PCI risk' },
  { id: 'creditcard', name: 'Credit Card Number', category: 'Financial', risk: 'Critical', confidence: 95, icon: '💳',
    regex: /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\b/g,
    maskOptions: ['PAN masking (last 4)', 'Full tokenize', 'Redact'],
    recommendation: 'PCI-DSS requires storing only last 4 digits of PAN' },
  { id: 'phone', name: 'Phone Number', category: 'Contact Info', risk: 'Medium', confidence: 88, icon: '📱',
    regex: /\b(?:\+?\d{1,3}[\s.\-]?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}\b/g,
    maskOptions: ['Partial mask (***-***-5678)', 'Hash', 'Redact'],
    recommendation: 'Mask phone middle digits, preserve country code' },
  { id: 'ip', name: 'IP Address (IPv4)', category: 'Network', risk: 'Medium', confidence: 95, icon: '🌐',
    regex: /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    maskOptions: ['Generalize to /24 subnet', 'Hash', 'Redact'],
    recommendation: 'GDPR treats IP as personal data — generalize to subnet' },
  { id: 'dob', name: 'Date of Birth', category: 'Personal Info', risk: 'High', confidence: 85, icon: '📅',
    regex: /\b(?:0?[1-9]|1[0-2])[\-\/](?:0?[1-9]|[12]\d|3[01])[\-\/](?:19|20)\d{2}\b/g,
    maskOptions: ['Year only', 'Age range (30-40)', 'Redact'],
    recommendation: 'Replace with age range to minimize re-identification risk' },
  { id: 'jwt', name: 'JWT Token', category: 'Security', risk: 'Critical', confidence: 99, icon: '🔑',
    regex: /\beyJ[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\b/g,
    maskOptions: ['Full redact', 'Rotate & tokenize'],
    recommendation: 'Rotate token immediately — JWTs contain signed claims' },
  { id: 'apikey', name: 'API Key / Secret', category: 'Security', risk: 'Critical', confidence: 80, icon: '🗝️',
    regex: /(?:api[_-]?key|secret|token|password|passwd|pwd)\s*[:=]\s*['"']?([A-Za-z0-9_.-]{16,})/gi,
    maskOptions: ['Full redact', 'Rotate & vault'],
    recommendation: 'Rotate all exposed API keys immediately and store in secrets vault' },
  { id: 'iban', name: 'IBAN', category: 'Financial', risk: 'High', confidence: 96, icon: '🏦',
    regex: /\b[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}(?:[A-Z0-9]{0,16})\b/g,
    maskOptions: ['Partial mask', 'Tokenize', 'Redact'],
    recommendation: 'Apply PCI-DSS masking for all banking identifiers' },
  { id: 'zip', name: 'ZIP / Postal Code', category: 'Location', risk: 'Low', confidence: 82, icon: '📮',
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
  id: number;
  detectorId: string;
  name: string;
  category: string;
  risk: string;
  confidence: number;
  value: string;
  recommendation: string;
  maskOptions: string[];
  icon: string;
};

export default function PiiScanner() {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState<ScanResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [activeDetectors, setActiveDetectors] = useState<Set<string>>(new Set(PII_DETECTORS.map(d => d.id)));
  const [selectedMasks, setSelectedMasks] = useState<Record<string, string>>({});
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  
  const handleScan = () => {
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
            id: counter++,
            detectorId: detector.id,
            name: detector.name,
            category: detector.category,
            risk: detector.risk,
            confidence: detector.confidence,
            value: value.length > 40 ? value.slice(0, 40) + '...' : value,
            recommendation: detector.recommendation,
            maskOptions: detector.maskOptions,
            icon: detector.icon,
          });
        }
      });
      setResults(found);
      setIsScanning(false);
      setHasScanned(true);
    }, 800);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Critical': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'High': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
      case 'Medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'Low': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 font-sans text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">PII Scanner</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Identify and mask Personally Identifiable Information in raw text or data streams.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm glass-panel">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Input Data</h3>
                <div className="flex space-x-2 text-xs">
                  <button onClick={() => setInputText("INSERT INTO users VALUES (1, 'john.doe@example.com', '555-123-4567', '123-45-6789', '4532015112830366', '192.168.1.42', '02/15/1985', '10001');")} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-colors">SQL</button>
                  <button onClick={() => setInputText("name,email,phone,ssn\nJohn Doe,john.doe@example.com,555-123-4567,123-45-6789\nJane Smith,jane.smith@corp.com,+1 800 555-9876,987-65-4321")} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-colors">CSV</button>
                  <button onClick={() => setInputText('{"users":[{"id":1,"email":"alice@example.com","phone":"(415) 555-2671","ssn":"456-78-9012","card":"5425233430109903","ip":"203.0.113.42","api_key":"sk-live-aB3dEf7gHiJkLm9nOpQrSt"}]}')} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full transition-colors">JSON</button>
                </div>
              </div>
              
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste raw text, SQL, JSON, or CSV here to scan for PII..."
                className="w-full h-64 p-4 font-mono text-sm bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl outline-none focus:ring-2 focus:ring-violet-500 resize-none transition-shadow"
              />
              
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-3">Active Detectors</h4>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800">
                  {PII_DETECTORS.map(detector => (
                    <label key={detector.id} className="flex items-center space-x-2 text-xs bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-violet-300 dark:hover:border-violet-700">
                      <input 
                        type="checkbox" 
                        checked={activeDetectors.has(detector.id)}
                        onChange={() => {
                          const newSet = new Set(activeDetectors);
                          if (newSet.has(detector.id)) newSet.delete(detector.id);
                          else newSet.add(detector.id);
                          setActiveDetectors(newSet);
                        }}
                        className="rounded text-violet-600 focus:ring-violet-500"
                      />
                      <span>{detector.icon} {detector.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleScan}
                  disabled={isScanning || !inputText.trim()}
                  className="inline-flex items-center px-6 py-3 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isScanning ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Search className="w-5 h-5 mr-2" />}
                  {isScanning ? 'Scanning...' : 'Run Scan'}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm glass-panel overflow-hidden flex flex-col h-full min-h-[500px]">
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-semibold flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-violet-500" />
                  Scan Results
                </h3>
                {results.length > 0 && (
                  <button className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 flex items-center">
                    <Download className="w-4 h-4 mr-1" /> Export CSV
                  </button>
                )}
              </div>
              
              <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-950/50 p-6">
                {!hasScanned ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400">
                    <Search className="w-12 h-12 mb-4 opacity-20" />
                    <p>Enter data and run a scan to see results.</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-emerald-600 dark:text-emerald-500">
                    <CheckCircle className="w-12 h-12 mb-4 opacity-50" />
                    <p className="font-medium">No PII detected in the input data!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex space-x-4 mb-6">
                      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 px-4 py-2 rounded-xl flex items-center font-medium text-sm">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        {results.filter(r => r.risk === 'Critical').length} Critical
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 px-4 py-2 rounded-xl flex items-center font-medium text-sm">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        {results.filter(r => r.risk === 'High').length} High
                      </div>
                    </div>

                    <div className="space-y-3">
                      {results.map((result) => (
                        <div key={result.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
                          <div 
                            className="p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between"
                            onClick={() => setExpandedRow(expandedRow === result.id ? null : result.id)}
                          >
                            <div className="flex items-center space-x-3 overflow-hidden">
                              <span className="text-xl" title={result.name}>{result.icon}</span>
                              <div className="truncate">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getRiskColor(result.risk)} mr-2`}>
                                  {result.risk}
                                </span>
                                <span className="font-medium text-sm">{result.name}</span>
                              </div>
                            </div>
                            <div className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded truncate max-w-[120px] sm:max-w-[200px]">
                              {selectedMasks[result.id] 
                                ? applyMask(result.value, selectedMasks[result.id], result.detectorId)
                                : result.value}
                            </div>
                          </div>
                          
                          {expandedRow === result.id && (
                            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 space-y-4">
                              <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Raw Value</p>
                                <p className="font-mono text-sm bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700">{result.value}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Recommendation</p>
                                <p className="text-sm text-slate-700 dark:text-slate-300 flex items-start">
                                  <Shield className="w-4 h-4 mr-1 mt-0.5 text-violet-500 shrink-0" />
                                  {result.recommendation}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Masking Strategy</p>
                                <select 
                                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-500"
                                  value={selectedMasks[result.id] || ''}
                                  onChange={(e) => setSelectedMasks(prev => ({ ...prev, [result.id]: e.target.value }))}
                                >
                                  <option value="">-- Select Masking Strategy --</option>
                                  {result.maskOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="font-semibold text-violet-600 dark:text-violet-400 mb-2">GDPR Compliance</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Article 4(5) requires pseudonymization of personal data to reduce risks to the data subjects.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">HIPAA Safe Harbor</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">De-identification under HIPAA requires removal or redaction of 18 specific identifiers.</p>
          </div>
          <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="font-semibold text-amber-600 dark:text-amber-400 mb-2">PCI-DSS Standards</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Requirement 3.4 mandates rendering Primary Account Numbers (PAN) unreadable anywhere it is stored.</p>
          </div>
        </div>
      </div>
    </div>
  );
}