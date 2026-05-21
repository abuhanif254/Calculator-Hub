"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Globe, Shield, CheckCircle, AlertTriangle, AlertCircle, Info, Copy, Check, Download, 
  ArrowRight, Activity, Server, Clock, Lock, Key, Eye, FileText, Search, Code, RefreshCcw, Layout
} from 'lucide-react';
import { addToHistory as addToGlobalHistory } from '../../../../lib/hooks/useToolHistory';

// Preset User-Agents
const USER_AGENTS = [
  { name: 'Chrome (Desktop)', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
  { name: 'Safari (iPhone Mobile)', value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1' },
  { name: 'Googlebot Crawler', value: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
  { name: 'Custom User-Agent...', value: 'custom' },
];

export function ResponsiveHeaderCheckerTool() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'single' | 'compare'>('single');
  const [resultTab, setResultTab] = useState<'summary' | 'security' | 'caching' | 'cookies' | 'raw' | 'code'>('summary');

  // Input states
  const [url, setUrl] = useState<string>('https://nextjs.org');
  const [method, setMethod] = useState<'GET' | 'HEAD'>('HEAD');
  const [uaSelect, setUaSelect] = useState<string>(USER_AGENTS[0].value);
  const [customUa, setCustomUa] = useState<string>('');
  
  // Loading & Result States
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any | null>(null);

  // Comparison inputs
  const [urlA, setUrlA] = useState<string>('http://nextjs.org');
  const [urlB, setUrlB] = useState<string>('https://nextjs.org');
  const [loadingCompare, setLoadingCompare] = useState<boolean>(false);
  const [errorCompare, setErrorCompare] = useState<string | null>(null);
  const [resultsA, setResultsA] = useState<any | null>(null);
  const [resultsB, setResultsB] = useState<any | null>(null);
  const [showDiffOnly, setShowDiffOnly] = useState<boolean>(false);

  // Clipboard copies
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [rawHeaderSearch, setRawHeaderSearch] = useState<string>('');

  useEffect(() => {
    addToGlobalHistory({ slug: "http-header-checker", title: "HTTP Header Checker", type: "tool" });
  }, []);

  const selectedUserAgent = useMemo(() => {
    if (uaSelect === 'custom') return customUa || 'Custom Agent';
    return uaSelect;
  }, [uaSelect, customUa]);

  // Handle single check
  const handleCheck = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/check-headers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: url.trim(),
          method,
          userAgent: selectedUserAgent,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to inspect headers.');
      }
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during verification.');
    } finally {
      setLoading(false);
    }
  };

  // Handle side-by-side comparison check
  const handleCompareCheck = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!urlA.trim() || !urlB.trim()) return;

    setLoadingCompare(true);
    setErrorCompare(null);
    setResultsA(null);
    setResultsB(null);

    try {
      // Run fetches in parallel
      const [resA, resB] = await Promise.all([
        fetch('/api/check-headers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: urlA.trim(), method: 'HEAD', userAgent: selectedUserAgent }),
        }).then(r => r.json()),
        fetch('/api/check-headers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: urlB.trim(), method: 'HEAD', userAgent: selectedUserAgent }),
        }).then(r => r.json())
      ]);

      if (!resA.success) throw new Error(`URL A Error: ${resA.error}`);
      if (!resB.success) throw new Error(`URL B Error: ${resB.error}`);

      setResultsA(resA);
      setResultsB(resB);
    } catch (err: any) {
      setErrorCompare(err.message || 'An error occurred during comparison checks.');
    } finally {
      setLoadingCompare(false);
    }
  };

  // Clipboard copy handler
  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // JSON export
  const handleDownloadJson = (data: any, fileName: string) => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // TXT report export
  const handleDownloadTxtReport = (res: any) => {
    let report = `HTTP HEADER AUDIT REPORT - ${res.url}\n`;
    report += `==============================================\n`;
    report += `Status Code: ${res.status} ${res.statusText}\n`;
    report += `Final Destination: ${res.finalUrl}\n`;
    report += `Audited on: ${new Date().toUTCString()}\n\n`;
    
    report += `METRICS:\n`;
    report += `- Security Score: ${res.ratings.securityScore}/100\n`;
    report += `- SEO Score: ${res.ratings.seoScore}/100\n`;
    report += `- Performance/Caching Score: ${res.ratings.perfScore}/100\n\n`;
    
    report += `RAW RESPONSE HEADERS:\n`;
    Object.entries(res.headers).forEach(([key, val]) => {
      report += `${key}: ${val}\n`;
    });

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `http-headers-report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Generate code commands snippets
  const codeSnippets = useMemo(() => {
    if (!results) return null;
    const target = results.url;
    return {
      curl: `curl -I "${target}"`,
      fetch: `fetch("${target}", { method: "${method}" })\n  .then(res => {\n    console.log(Object.fromEntries(res.headers.entries()));\n  });`,
      python: `import requests\n\nresponse = requests.${method.toLowerCase()}("${target}")\nprint(response.headers)`
    };
  }, [results, method]);

  // Compute differences for visual header comparisons
  const computedDiffs = useMemo(() => {
    if (!resultsA || !resultsB) return [];
    const keysA = Object.keys(resultsA.headers).map(k => k.toLowerCase());
    const keysB = Object.keys(resultsB.headers).map(k => k.toLowerCase());
    const allKeys = Array.from(new Set([...keysA, ...keysB])).sort();

    return allKeys.map(key => {
      const valA = resultsA.headers[key];
      const valB = resultsB.headers[key];
      
      let status: 'equal' | 'diff' | 'onlyA' | 'onlyB' = 'equal';
      if (valA && !valB) status = 'onlyA';
      else if (!valA && valB) status = 'onlyB';
      else if (valA !== valB) status = 'diff';

      return { key, valA: valA || '', valB: valB || '', status };
    });
  }, [resultsA, resultsB]);

  // Visual score color badge mapper
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-500/20';
    if (score >= 70) return 'text-amber-600 bg-amber-50 dark:bg-amber-950/20 border border-amber-500/20';
    return 'text-red-600 bg-red-50 dark:bg-red-950/20 border border-red-500/20';
  };

  const getStatusBadge = (status: 'pass' | 'warning' | 'fail' | 'info') => {
    switch (status) {
      case 'pass':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-500/20 flex items-center gap-1"><CheckCircle size={10} /> Safe</span>;
      case 'warning':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-500/20 flex items-center gap-1"><AlertTriangle size={10} /> Warning</span>;
      case 'fail':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 dark:bg-red-950/20 text-red-600 border border-red-500/20 flex items-center gap-1"><AlertCircle size={10} /> Missing</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 dark:bg-blue-950/20 text-blue-600 border border-blue-500/20 flex items-center gap-1"><Info size={10} /> Info</span>;
    }
  };

  return (
    <div className="space-y-8 select-none">
      
      {/* View Mode selection */}
      <div className="flex bg-slate-100 dark:bg-slate-900/60 p-1 rounded-2xl border border-slate-200/50 dark:border-slate-800 max-w-sm">
        <button
          onClick={() => setActiveTab('single')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
            activeTab === 'single'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          Single Inspector
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          className={`flex-1 py-2 text-xs font-extrabold rounded-xl transition-all ${
            activeTab === 'compare'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          Side-by-Side Comparison
        </button>
      </div>

      {activeTab === 'single' ? (
        // ─────────────────────────────────────────────────────────────
        // SINGLE INSPECTOR LAYOUT
        // ─────────────────────────────────────────────────────────────
        <div className="space-y-6">
          <form onSubmit={handleCheck} className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner space-y-4">
            <div className="flex flex-col lg:flex-row gap-3">
              {/* URL Input */}
              <div className="flex-1 relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter domain or URL (e.g. nextjs.org)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 text-sm outline-none transition-all text-left"
                />
              </div>

              {/* Method Switch */}
              <div className="flex bg-slate-200/60 dark:bg-slate-900/60 p-0.5 rounded-xl border border-slate-200/20 shrink-0">
                <button
                  type="button"
                  onClick={() => setMethod('HEAD')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    method === 'HEAD'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Requests only header metadata (fastest)"
                >
                  HEAD
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('GET')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                    method === 'GET'
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                  title="Requests headers and full HTML body payload"
                >
                  GET
                </button>
              </div>

              {/* Check Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#518231] hover:bg-[#436e29] disabled:opacity-50 text-white font-semibold text-sm px-8 py-2.5 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCcw className="animate-spin" size={16} /> Auditing...
                  </>
                ) : (
                  'Check Headers'
                )}
              </button>
            </div>

            {/* Advanced configurations toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-slate-200/50 dark:border-slate-700/50 items-end">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase tracking-wider">User-Agent Template</label>
                <select
                  value={uaSelect}
                  onChange={(e) => setUaSelect(e.target.value)}
                  className="w-full text-xs font-semibold py-2 px-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl outline-none cursor-pointer"
                >
                  {USER_AGENTS.map((ua, i) => (
                    <option key={i} value={ua.value}>{ua.name}</option>
                  ))}
                </select>
              </div>

              {uaSelect === 'custom' && (
                <div className="w-full">
                  <label className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase tracking-wider">Custom User-Agent String</label>
                  <input
                    type="text"
                    value={customUa}
                    onChange={(e) => setCustomUa(e.target.value)}
                    placeholder="Enter custom UA identifier..."
                    className="w-full text-xs p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              )}
            </div>
          </form>

          {/* Error display */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-2xl flex gap-3 text-left">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-red-800 dark:text-red-400">Auditing Error</h4>
                <p className="text-xs text-red-700 dark:text-red-500 leading-normal">{error}</p>
              </div>
            </div>
          )}

          {/* Inspection results view */}
          {results && (
            <div className="space-y-8">
              
              {/* Header metrics card grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Score Cards */}
                <div className={`rounded-2xl border p-5 text-left flex flex-col justify-between h-32 ${getScoreColor(results.ratings.securityScore)}`}>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Shield size={12} /> Security Score
                  </span>
                  <div>
                    <span className="text-3xl font-extrabold">{results.ratings.securityScore}</span>
                    <span className="text-sm font-bold text-slate-400">/100</span>
                  </div>
                </div>

                <div className={`rounded-2xl border p-5 text-left flex flex-col justify-between h-32 ${getScoreColor(results.ratings.seoScore)}`}>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Layout size={12} /> SEO Compliance
                  </span>
                  <div>
                    <span className="text-3xl font-extrabold">{results.ratings.seoScore}</span>
                    <span className="text-sm font-bold text-slate-400">/100</span>
                  </div>
                </div>

                <div className={`rounded-2xl border p-5 text-left flex flex-col justify-between h-32 ${getScoreColor(results.ratings.perfScore)}`}>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Activity size={12} /> Caching/Perf
                  </span>
                  <div>
                    <span className="text-3xl font-extrabold">{results.ratings.perfScore}</span>
                    <span className="text-sm font-bold text-slate-400">/100</span>
                  </div>
                </div>

                {/* Connection Time / Server Info */}
                <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 text-left flex flex-col justify-between h-32">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Clock size={12} /> Timing Latency
                  </span>
                  <div>
                    <span className="text-3xl font-extrabold text-slate-800 dark:text-white">{results.responseTimeMs}</span>
                    <span className="text-sm font-bold text-slate-400"> ms</span>
                  </div>
                </div>
              </div>

              {/* Status Header Bar */}
              <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 text-left flex flex-wrap gap-6 items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">HTTP Status Response</div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-lg text-sm font-extrabold ${
                      results.status >= 200 && results.status < 300 ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30' :
                      results.status >= 300 && results.status < 400 ? 'bg-amber-600/20 text-amber-400 border border-amber-600/30' :
                      'bg-red-600/20 text-red-400 border border-red-600/30'
                    }`}>
                      {results.status} {results.statusText}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">Protocol: {results.httpVersion}</span>
                  </div>
                </div>

                <div className="space-y-1 max-w-md truncate">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Final URL Destination</div>
                  <a href={results.finalUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1.5">
                    {results.finalUrl}
                  </a>
                </div>

                {/* Exports options */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDownloadTxtReport(results)}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all text-xs font-semibold flex items-center gap-1.5"
                    title="Export text report"
                  >
                    <Download size={14} /> TXT
                  </button>
                  <button
                    onClick={() => handleDownloadJson(results, 'http-headers-audit')}
                    className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all text-xs font-semibold flex items-center gap-1.5"
                    title="Download JSON structure"
                  >
                    <FileText size={14} /> JSON
                  </button>
                </div>
              </div>

              {/* Redirect Chain Visualization Graph */}
              {results.redirectChain.length > 1 && (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Activity size={12} className="text-[#518231]" /> Redirect Chain Visualization
                  </h4>
                  <div className="flex flex-col gap-4">
                    {results.redirectChain.map((step: any, index: number) => (
                      <div key={index} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 ${
                            step.status >= 200 && step.status < 300 ? 'bg-emerald-600' : 'bg-amber-500'
                          }`}>
                            {index + 1}
                          </div>
                          {index < results.redirectChain.length - 1 && (
                            <div className="w-0.5 h-12 bg-slate-200 dark:bg-slate-800 my-1" />
                          )}
                        </div>
                        <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-3 rounded-xl border border-slate-100 dark:border-slate-900">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate pr-2">{step.url}</span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-extrabold shrink-0 ${
                              step.status >= 200 && step.status < 300 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                            }`}>
                              {step.status} {step.statusText}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400">Response time: {step.responseTimeMs}ms</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sub-results Navigation Tabs */}
              <div className="border-b border-slate-200 dark:border-slate-800 flex overflow-x-auto gap-2">
                {[
                  { id: 'summary', name: 'Compliance Checklist', icon: CheckCircle },
                  { id: 'security', name: 'Security Headers', icon: Shield },
                  { id: 'caching', name: 'SEO & Caching', icon: Layout },
                  { id: 'cookies', name: 'Cookie Analysis', icon: Key },
                  { id: 'raw', name: 'Raw Headers', icon: FileText },
                  { id: 'code', name: 'Request Snippets', icon: Code },
                ].map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setResultTab(tab.id as any)}
                      className={`py-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 shrink-0 ${
                        resultTab === tab.id
                          ? 'border-[#518231] text-[#518231]'
                          : 'border-transparent text-slate-500 hover:text-slate-950'
                      }`}
                    >
                      <Icon size={14} /> {tab.name}
                    </button>
                  );
                })}
              </div>

              {/* Tab Contents */}
              <div className="min-h-40">
                {resultTab === 'summary' && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-4">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">Auditing Summary Checklist</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Security auditor list */}
                      <div className="space-y-3">
                        <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Security Audits</div>
                        {results.audits.securityChecks.map((chk: any, i: number) => (
                          <div key={i} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                            <div>
                              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{chk.name}</div>
                              <div className="text-[10px] text-slate-400 mt-0.5">{chk.message}</div>
                            </div>
                            {getStatusBadge(chk.status)}
                          </div>
                        ))}
                      </div>

                      {/* SEO / Caching and performance checks */}
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">SEO Audits</div>
                          {results.audits.seoChecks.map((chk: any, i: number) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                              <div>
                                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{chk.name}</div>
                                <div className="text-[10px] text-slate-400 mt-0.5">{chk.message}</div>
                              </div>
                              {getStatusBadge(chk.status)}
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3">
                          <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">Performance & Caching</div>
                          {results.audits.perfChecks.map((chk: any, i: number) => (
                            <div key={i} className="flex justify-between items-center p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                              <div>
                                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{chk.name}</div>
                                <div className="text-[10px] text-slate-400 mt-0.5">{chk.message}</div>
                              </div>
                              {getStatusBadge(chk.status)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {resultTab === 'security' && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-6">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">Security Headers Audit Detail</h3>
                    <div className="space-y-4">
                      {results.audits.securityChecks.map((chk: any, i: number) => (
                        <div key={i} className="p-4 rounded-xl border border-slate-200/60 dark:border-slate-800 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-900 dark:text-white">{chk.name}</span>
                            {getStatusBadge(chk.status)}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-normal">{chk.message}</p>
                          {chk.value && (
                            <pre className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-lg overflow-x-auto select-text">
                              <code>{chk.value}</code>
                            </pre>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {resultTab === 'caching' && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-6">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">SEO & Caching Directives</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Compression Statistics</div>
                        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
                          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Content-Encoding Header</div>
                          <div className="text-sm font-bold text-slate-800 dark:text-white">
                            {results.compression.supported ? `Supported: ${results.compression.type}` : 'Compression Not Enabled'}
                          </div>
                          <p className="text-[10px] text-slate-400 leading-normal">
                            Brotli (br) or Gzip encoding reduces payload byte transmissions over slow network cellular paths.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">CORS Origin Security</div>
                        <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
                          <div className="text-xs font-semibold text-slate-600 dark:text-slate-400">Access-Control-Allow-Origin</div>
                          <div className="text-sm font-bold text-slate-800 dark:text-white">
                            {results.cors.allowOrigin}
                          </div>
                          <p className="text-[10px] text-slate-400 leading-normal">
                            {results.cors.isPublic 
                              ? 'This endpoint is open to public domains (*). Recommended for public APIs, but unsafe for private resources.'
                              : 'Origin restrictions are configured to prevent scripting resource access.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {resultTab === 'cookies' && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white">Response Set-Cookie Auditor</h3>
                      <span className="text-xs text-slate-400 font-semibold">{results.cookies.length} Cookie(s) found</span>
                    </div>

                    {results.cookies.length === 0 ? (
                      <div className="text-center py-10 border border-dashed rounded-xl text-slate-400 text-xs">
                        No cookies set in the response headers.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {results.cookies.map((cookie: any, i: number) => (
                          <div key={i} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                            <div className="flex flex-wrap justify-between items-center gap-2">
                              <span className="text-xs font-bold text-[#518231] truncate select-text">Name: {cookie.name}</span>
                              <span className="text-[10px] text-slate-400">Expires: {cookie.expires}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono select-text bg-slate-50 dark:bg-slate-950 p-2 rounded truncate">
                              Value: {cookie.value}
                            </div>
                            {/* Flags */}
                            <div className="flex flex-wrap gap-2 text-[9px] font-bold text-slate-500">
                              <span className={`px-2 py-0.5 rounded ${cookie.httpOnly ? 'bg-emerald-600/20 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>HttpOnly</span>
                              <span className={`px-2 py-0.5 rounded ${cookie.secure ? 'bg-emerald-600/20 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>Secure</span>
                              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-950 border border-slate-200/50">SameSite: {cookie.sameSite}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {resultTab === 'raw' && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-4">
                    <div className="flex flex-col md:flex-row justify-between gap-3 items-center">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white">Raw HTTP Response Headers</h3>
                      
                      {/* Search box */}
                      <div className="w-full md:w-64 relative">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                          type="text"
                          value={rawHeaderSearch}
                          onChange={(e) => setRawHeaderSearch(e.target.value)}
                          placeholder="Filter headers..."
                          className="w-full pl-8 pr-3 py-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#518231]"
                        />
                      </div>
                    </div>

                    <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl">
                      <table className="w-full text-xs text-slate-600 dark:text-slate-400 border-collapse">
                        <thead>
                          <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 text-[10px] font-extrabold uppercase text-slate-400">
                            <th className="p-3 text-left w-1/3">Header Key</th>
                            <th className="p-3 text-left">Header Value</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono select-text text-left">
                          {Object.entries(results.headers)
                            .filter(([key]) => key.toLowerCase().includes(rawHeaderSearch.toLowerCase()))
                            .map(([key, val]: [string, any]) => (
                              <tr key={key} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20">
                                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200 whitespace-nowrap">{key}</td>
                                <td className="p-3 break-all">{val}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {resultTab === 'code' && codeSnippets && (
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-6">
                    <h3 className="text-sm font-bold text-slate-800 dark:text-white">Developer Request Command Snippets</h3>
                    
                    <div className="space-y-4">
                      {/* Curl Command */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                          <span>cURL Command line</span>
                          <button
                            onClick={() => handleCopyText(codeSnippets.curl, 'curl')}
                            className="text-[10px] text-[#518231] hover:underline flex items-center gap-1"
                          >
                            {copiedId === 'curl' ? <Check size={10} /> : <Copy size={10} />} Copy
                          </button>
                        </div>
                        <pre className="text-xs p-3 bg-slate-950 text-slate-200 rounded-xl overflow-x-auto select-text font-mono">
                          <code>{codeSnippets.curl}</code>
                        </pre>
                      </div>

                      {/* JS Fetch */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                          <span>JavaScript Fetch API</span>
                          <button
                            onClick={() => handleCopyText(codeSnippets.fetch, 'fetch')}
                            className="text-[10px] text-[#518231] hover:underline flex items-center gap-1"
                          >
                            {copiedId === 'fetch' ? <Check size={10} /> : <Copy size={10} />} Copy
                          </button>
                        </div>
                        <pre className="text-xs p-3 bg-slate-950 text-slate-200 rounded-xl overflow-x-auto select-text font-mono">
                          <code>{codeSnippets.fetch}</code>
                        </pre>
                      </div>

                      {/* Python Requests */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold text-slate-400">
                          <span>Python Requests module</span>
                          <button
                            onClick={() => handleCopyText(codeSnippets.python, 'python')}
                            className="text-[10px] text-[#518231] hover:underline flex items-center gap-1"
                          >
                            {copiedId === 'python' ? <Check size={10} /> : <Copy size={10} />} Copy
                          </button>
                        </div>
                        <pre className="text-xs p-3 bg-slate-950 text-slate-200 rounded-xl overflow-x-auto select-text font-mono">
                          <code>{codeSnippets.python}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        // ─────────────────────────────────────────────────────────────
        // COMPARATIVE VIEW LAYOUT
        // ─────────────────────────────────────────────────────────────
        <div className="space-y-6">
          <form onSubmit={handleCompareCheck} className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-inner space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase tracking-wider">Website URL A</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    value={urlA}
                    onChange={(e) => setUrlA(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-1 focus:ring-[#518231] outline-none text-left"
                    placeholder="e.g. http://site.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 block mb-1.5 uppercase tracking-wider">Website URL B</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="text"
                    value={urlB}
                    onChange={(e) => setUrlB(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 focus:ring-1 focus:ring-[#518231] outline-none text-left"
                    placeholder="e.g. https://site.com"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-200/50 dark:border-slate-700/50">
              <span className="text-[10px] text-slate-400 font-semibold">Checks headers using HEAD method automatically.</span>
              <button
                type="submit"
                disabled={loadingCompare}
                className="bg-[#518231] hover:bg-[#436e29] disabled:opacity-50 text-white font-semibold text-xs px-6 py-2 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-1.5"
              >
                {loadingCompare ? <RefreshCcw className="animate-spin" size={12} /> : null} Compare Headers
              </button>
            </div>
          </form>

          {errorCompare && (
            <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-2xl flex gap-3 text-left">
              <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-red-700 dark:text-red-400">{errorCompare}</p>
            </div>
          )}

          {resultsA && resultsB && (
            <div className="space-y-6">
              
              {/* Timing / Ratings side-by-side comparison summary */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-left space-y-3">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{resultsA.url}</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-100 dark:border-slate-900">
                      <div className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Security</div>
                      <div className="text-sm font-extrabold text-[#518231]">{resultsA.ratings.securityScore}</div>
                    </div>
                    <div className="text-center bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-100 dark:border-slate-900">
                      <div className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">SEO</div>
                      <div className="text-sm font-extrabold text-[#518231]">{resultsA.ratings.seoScore}</div>
                    </div>
                    <div className="text-center bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-100 dark:border-slate-900">
                      <div className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Time</div>
                      <div className="text-xs font-extrabold text-slate-700 dark:text-slate-300 mt-1">{resultsA.responseTimeMs}ms</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 text-left space-y-3">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{resultsB.url}</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-100 dark:border-slate-900">
                      <div className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Security</div>
                      <div className="text-sm font-extrabold text-[#518231]">{resultsB.ratings.securityScore}</div>
                    </div>
                    <div className="text-center bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-100 dark:border-slate-900">
                      <div className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">SEO</div>
                      <div className="text-sm font-extrabold text-[#518231]">{resultsB.ratings.seoScore}</div>
                    </div>
                    <div className="text-center bg-slate-50 dark:bg-slate-950 p-2 rounded-xl border border-slate-100 dark:border-slate-900">
                      <div className="text-[8px] text-slate-400 font-bold uppercase tracking-wider">Time</div>
                      <div className="text-xs font-extrabold text-slate-700 dark:text-slate-300 mt-1">{resultsB.responseTimeMs}ms</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Header differences visualization table */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white">Comparative Header Diff Analysis</h3>
                  <button
                    onClick={() => setShowDiffOnly(!showDiffOnly)}
                    className={`text-[10px] font-bold px-3 py-1 rounded-lg border transition-all ${
                      showDiffOnly ? 'bg-emerald-600/10 border-emerald-500 text-[#518231]' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {showDiffOnly ? 'Showing Differences Only' : 'Show All Headers'}
                  </button>
                </div>

                <div className="overflow-x-auto border border-slate-100 dark:border-slate-800 rounded-xl text-[11px] font-mono">
                  <table className="w-full text-slate-600 dark:text-slate-400 border-collapse">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 text-[9px] font-extrabold uppercase text-slate-400">
                        <th className="p-3 text-left w-1/4">Header Key</th>
                        <th className="p-3 text-left w-3/8">Value A ({resultsA.url.replace(/^https?:\/\//i, '')})</th>
                        <th className="p-3 text-left w-3/8">Value B ({resultsB.url.replace(/^https?:\/\//i, '')})</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 select-text text-left">
                      {computedDiffs
                        .filter(diff => !showDiffOnly || diff.status !== 'equal')
                        .map(diff => (
                          <tr 
                            key={diff.key} 
                            className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/20 ${
                              diff.status === 'diff' ? 'bg-amber-500/5 text-amber-600' :
                              diff.status === 'onlyA' ? 'bg-red-500/5 text-red-500' :
                              diff.status === 'onlyB' ? 'bg-emerald-500/5 text-emerald-600' : ''
                            }`}
                          >
                            <td className="p-3 font-semibold whitespace-nowrap">{diff.key}</td>
                            <td className={`p-3 break-all ${diff.status === 'onlyA' ? 'line-through opacity-70' : ''}`}>{diff.valA || '-'}</td>
                            <td className={`p-3 break-all ${diff.status === 'onlyB' ? 'font-bold' : ''}`}>{diff.valB || '-'}</td>
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
    </div>
  );
}
export { ResponsiveHeaderCheckerTool as HttpHeaderCheckerTool };
