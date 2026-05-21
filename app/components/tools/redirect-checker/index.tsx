"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Globe, Shield, CheckCircle, AlertTriangle, AlertCircle, Info, Copy, Check, Download, 
  ArrowRight, Activity, Server, Clock, Lock, Unlock, Eye, FileText, Search, Code, RefreshCcw,
  ChevronDown, ChevronUp, AlertOctagon, HelpCircle, Link2
} from 'lucide-react';
import { addToHistory as addToGlobalHistory } from '../../../../lib/hooks/useToolHistory';

// Preset User-Agents
const USER_AGENTS = [
  { name: 'Chrome (Desktop)', value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' },
  { name: 'Safari (iPhone Mobile)', value: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1' },
  { name: 'Googlebot Crawler', value: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
  { name: 'Bingbot Crawler', value: 'Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)' },
  { name: 'Custom User-Agent...', value: 'custom' },
];

export function RedirectCheckerTool() {
  // Input states
  const [inputUrl, setInputUrl] = useState<string>('http://github.com');
  const [uaSelect, setUaSelect] = useState<string>(USER_AGENTS[0].value);
  const [customUa, setCustomUa] = useState<string>('');
  
  // Loading & Result States
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any | null>(null);

  // Accordion state (tracks open/close for each hop detailed view)
  const [openHops, setOpenHops] = useState<Record<number, boolean>>({});
  
  // Search query inside headers per hop
  const [headerSearch, setHeaderSearch] = useState<string>('');

  // Copy status state
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Initialize tool history
  useEffect(() => {
    addToGlobalHistory({ slug: "redirect-checker", title: "Redirect Checker", type: "tool" });
    
    // Check if ?url= is passed in URL query params
    const params = new URLSearchParams(window.location.search);
    const urlParam = params.get('url');
    if (urlParam) {
      const decodedUrl = decodeURIComponent(urlParam);
      setInputUrl(decodedUrl);
      triggerCheck(decodedUrl, uaSelect === 'custom' ? customUa : uaSelect);
    }
  }, []);

  const selectedUserAgent = useMemo(() => {
    if (uaSelect === 'custom') return customUa || 'Custom Agent';
    return uaSelect;
  }, [uaSelect, customUa]);

  // Triggers API audit
  const triggerCheck = async (urlToCheck: string, uaStr: string) => {
    if (!urlToCheck.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);
    setOpenHops({});

    try {
      const response = await fetch('/api/tools/redirect-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: urlToCheck.trim(),
          userAgent: uaStr,
        }),
      });

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to analyze redirects.');
      }
      setResults(data);
      
      // Auto-open first and last hops
      if (data.redirectChain && data.redirectChain.length > 0) {
        setOpenHops({
          0: true,
          [data.redirectChain.length - 1]: true
        });
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during verification.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerCheck(inputUrl, selectedUserAgent);
  };

  const toggleHop = (index: number) => {
    setOpenHops(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Download json payload
  const handleDownloadJson = () => {
    if (!results) return;
    const jsonStr = JSON.stringify(results, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `redirect-check-${new URL(results.url).hostname}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Download txt summary report
  const handleDownloadTxt = () => {
    if (!results) return;
    let report = `REDIRECT TRACE REPORT - ${results.url}\n`;
    report += `====================================================\n`;
    report += `Requested URL: ${results.url}\n`;
    report += `Final Destination: ${results.finalUrl}\n`;
    report += `Total Hops: ${results.redirectChain.length - 1}\n`;
    report += `Loop Detected: ${results.loopDetected ? 'YES' : 'NO'}\n`;
    report += `Generated at: ${new Date().toUTCString()}\n\n`;

    report += `SEO WARNINGS & DIAGNOSTICS:\n`;
    if (results.warnings && results.warnings.length > 0) {
      results.warnings.forEach((warning: string, i: number) => {
        report += `[!] ${warning}\n`;
      });
    } else {
      report += `[+] Pass: No major redirect or canonical issues detected.\n`;
    }
    report += `\n`;

    report += `REDIRECT CHAIN:\n`;
    results.redirectChain.forEach((hop: any, index: number) => {
      const isFinal = index === results.redirectChain.length - 1;
      report += `----------------------------------------------------\n`;
      report += `${isFinal ? 'FINAL DESTINATION' : `HOP ${index + 1}`}\n`;
      report += `URL: ${hop.url}\n`;
      report += `Status Code: ${hop.status} ${hop.statusText}\n`;
      report += `Response Time: ${hop.responseTimeMs} ms\n`;
      report += `Type: ${hop.type}\n`;
      if (hop.canonical) {
        report += `Canonical Link: ${hop.canonical}\n`;
      }
    });

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `redirect-check-report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Helper colors for statuses
  const getStatusColor = (status: number) => {
    if (status === 200) return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    if (status >= 300 && status < 400) {
      if (status === 301 || status === 308) {
        return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      }
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    }
    return 'bg-rose-500/10 text-rose-600 border-rose-500/20';
  };

  const getRedirectBadge = (type: string) => {
    switch (type) {
      case 'permanent':
        return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-amber-500/10 text-amber-700 dark:text-amber-300">Permanent (HTTP 301/308)</span>;
      case 'temporary':
        return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-500/10 text-blue-700 dark:text-blue-300">Temporary (HTTP 302/307)</span>;
      case 'meta-refresh':
        return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-violet-500/10 text-violet-700 dark:text-violet-300">HTML Meta Refresh</span>;
      case 'javascript':
        return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-indigo-500/10 text-indigo-700 dark:text-indigo-300">JavaScript Redirect</span>;
      case 'loop':
        return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-rose-500/10 text-rose-700 dark:text-rose-300">Loop Target</span>;
      default:
        return <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-slate-500/10 text-slate-700 dark:text-slate-300">No redirect (HTTP 200 OK)</span>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Search Input Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <label htmlFor="url-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Target URL / Domain
            </label>
            <div className="relative rounded-xl shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Globe size={18} />
              </div>
              <input
                id="url-input"
                type="text"
                className="block w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 transition-all font-mono text-sm"
                placeholder="e.g. http://github.com or https://example.com/some-page"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="ua-select" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              User-Agent (Crawler Simulation)
            </label>
            <select
              id="ua-select"
              className="block w-full py-3 px-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-slate-900 dark:text-white transition-all text-sm"
              value={uaSelect}
              onChange={(e) => setUaSelect(e.target.value)}
              disabled={loading}
            >
              {USER_AGENTS.map((ua) => (
                <option key={ua.name} value={ua.value}>
                  {ua.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {uaSelect === 'custom' && (
          <div className="animate-in fade-in slide-in-from-top-1 duration-200">
            <label htmlFor="custom-ua-input" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Custom User-Agent String
            </label>
            <input
              id="custom-ua-input"
              type="text"
              className="block w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] focus:border-[#518231] text-slate-900 dark:text-white placeholder-slate-500 font-mono text-sm"
              placeholder="Mozilla/5.0 (compatible; MyBot/1.0; +http://mysite.com)"
              value={customUa}
              onChange={(e) => setCustomUa(e.target.value)}
              disabled={loading}
              required
            />
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !inputUrl.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-[#518231] hover:bg-[#436e29] text-white font-semibold rounded-xl focus:ring-4 focus:ring-[#518231]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-md"
          >
            {loading ? (
              <>
                <RefreshCcw size={16} className="animate-spin" />
                Analyzing Path...
              </>
            ) : (
              <>
                <Activity size={16} />
                Analyze Redirects
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-2xl flex items-start gap-3 shadow-sm animate-in fade-in">
          <AlertCircle className="shrink-0 mt-0.5 text-rose-500" />
          <div className="text-sm">
            <p className="font-bold">Execution Failed</p>
            <p className="mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Audit Results */}
      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Visual Flow Chart */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Server size={20} className="text-[#518231]" />
                Redirect Path Trace
              </h3>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDownloadTxt}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <Download size={13} />
                  TXT Report
                </button>
                <button
                  type="button"
                  onClick={handleDownloadJson}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  <Code size={13} />
                  JSON Data
                </button>
              </div>
            </div>

            {/* Vertical Chain Flow Chart */}
            <div className="relative pl-6 md:pl-8 border-l border-slate-200 dark:border-slate-800 ml-4 space-y-6 py-2">
              {results.redirectChain.map((hop: any, index: number) => {
                const isFinal = index === results.redirectChain.length - 1;
                const isHttps = hop.url.startsWith('https://');
                const isOpen = !!openHops[index];

                return (
                  <div key={index} className="relative group">
                    {/* Circle Node Badge */}
                    <div className={`absolute -left-10 md:-left-12 top-1.5 w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shadow-sm bg-white dark:bg-slate-900 z-10 transition-colors ${
                      isFinal
                        ? (hop.status === 200 ? 'border-emerald-500 text-emerald-600' : 'border-rose-500 text-rose-600')
                        : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}>
                      {index + 1}
                    </div>

                    {/* Hop Main Interface */}
                    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 md:p-5">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="space-y-1 max-w-full overflow-hidden">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-xs px-2 py-0.5 rounded font-mono border ${getStatusColor(hop.status)}`}>
                              {hop.status || 'Error'} {hop.statusText}
                            </span>
                            {getRedirectBadge(hop.type)}
                            {hop.status !== 0 && (
                              <span className="flex items-center gap-0.5 text-xs text-slate-400 font-mono">
                                <Clock size={12} />
                                {hop.responseTimeMs}ms
                              </span>
                            )}
                            <span className="flex items-center">
                              {isHttps ? (
                                <span title="Secure HTTPS Connection">
                                  <Lock size={12} className="text-emerald-500" />
                                </span>
                              ) : (
                                <span title="Insecure HTTP Connection">
                                  <Unlock size={12} className="text-amber-500" />
                                </span>
                              )}
                            </span>
                          </div>

                          <div className="font-mono text-sm text-slate-800 dark:text-slate-200 break-all select-all flex items-center gap-1.5">
                            {hop.url}
                            <button
                              type="button"
                              onClick={() => handleCopyText(hop.url, `hop-${index}`)}
                              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 shrink-0"
                              title="Copy URL"
                            >
                              {copiedId === `hop-${index}` ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                            </button>
                          </div>
                        </div>

                        <div className="shrink-0 flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => toggleHop(index)}
                            className="flex items-center gap-1 text-xs text-[#518231] hover:underline font-semibold"
                          >
                            {isOpen ? (
                              <>
                                Hide Headers <ChevronUp size={14} />
                              </>
                            ) : (
                              <>
                                View Headers <ChevronDown size={14} />
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* SEO Tags details block */}
                      {hop.canonical && (
                        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-start gap-1.5 text-xs">
                          <Link2 size={13} className="text-[#518231] shrink-0 mt-0.5" />
                          <div className="break-all">
                            <span className="font-semibold text-slate-500">Canonical Tag: </span>
                            <span className="font-mono text-slate-700 dark:text-slate-300">{hop.canonical}</span>
                            {isFinal && hop.canonical !== hop.url && (
                              <span className="block text-amber-500 font-medium mt-0.5">
                                [!] Note: Mismatches final URL ({hop.url})
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Collapsible Headers Audits */}
                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in duration-200 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50 dark:bg-slate-950 p-2 rounded-lg">
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider pl-1">
                              Response Headers
                            </span>
                            <div className="relative rounded-md max-w-xs w-full">
                              <input
                                type="text"
                                className="block w-full py-1 pl-7 pr-2 border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-900 text-xs focus:ring-1 focus:ring-[#518231] focus:border-[#518231] placeholder-slate-400 text-slate-800 dark:text-white"
                                placeholder="Filter headers..."
                                value={headerSearch}
                                onChange={(e) => setHeaderSearch(e.target.value)}
                              />
                              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                                <Search size={12} />
                              </div>
                            </div>
                          </div>

                          {/* Raw headers listing */}
                          {hop.status === 0 ? (
                            <p className="text-xs text-rose-500 italic p-2">Connection headers not available due to request failure.</p>
                          ) : (
                            <div className="space-y-1 max-h-60 overflow-y-auto border border-slate-100 dark:border-slate-800 rounded-lg p-2 font-mono text-xs text-slate-700 dark:text-slate-300 bg-slate-50/50 dark:bg-slate-950/20 custom-scrollbar divide-y divide-slate-100 dark:divide-slate-800/40">
                              {Object.entries(hop.headers)
                                .filter(([key, val]) => {
                                  if (!headerSearch) return true;
                                  return (
                                    key.toLowerCase().includes(headerSearch.toLowerCase()) || 
                                    String(val).toLowerCase().includes(headerSearch.toLowerCase())
                                  );
                                })
                                .map(([key, val]) => (
                                  <div key={key} className="py-1.5 flex flex-col sm:flex-row sm:items-start gap-1 overflow-hidden">
                                    <span className="font-bold text-slate-900 dark:text-white shrink-0 sm:w-1/3 truncate select-all">{key}:</span>
                                    <span className="break-all sm:w-2/3 select-all">{String(val)}</span>
                                  </div>
                                ))}
                              {Object.keys(hop.headers).length === 0 && (
                                <p className="text-xs text-slate-400 italic py-2 text-center">No headers match filter.</p>
                              )}
                            </div>
                          )}

                          {/* Cookie Profile details if any exist */}
                          {hop.cookies && hop.cookies.length > 0 && (
                            <div className="space-y-2">
                              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
                                Set-Cookie Declarations ({hop.cookies.length})
                              </span>
                              <div className="space-y-1.5">
                                {hop.cookies.map((cookie: string, ci: number) => (
                                  <div key={ci} className="bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 p-2.5 rounded-lg text-xs font-mono break-all text-slate-700 dark:text-slate-300">
                                    {cookie}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Vertical Connecting Line Arrow */}
                    {!isFinal && (
                      <div className="flex justify-start my-2 pl-4">
                        <div className="w-0.5 h-6 bg-slate-200 dark:bg-slate-800 relative left-[1px]"></div>
                        <ArrowRight size={14} className="rotate-90 text-slate-300 dark:text-slate-700 relative -left-[5px] top-4 shrink-0" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: SEO Diagnostics & Metrics */}
          <div className="space-y-6">
            
            {/* Overview Metrics Cards */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <Globe size={18} className="text-[#518231]" />
                Trace Metrics
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <div className="text-xs font-semibold text-slate-500">Redirect Hops</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {results.redirectChain.length - 1}
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950/60 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800/80">
                  <div className="text-xs font-semibold text-slate-500">Total Latency</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {results.redirectChain.reduce((acc: number, val: any) => acc + (val.responseTimeMs || 0), 0)} <span className="text-sm font-medium text-slate-500">ms</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950/60 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 space-y-1">
                <div className="text-xs font-semibold text-slate-500">Final Destination</div>
                <div className="text-sm font-mono text-slate-900 dark:text-white break-all flex items-center gap-1.5">
                  <span className="truncate">{results.finalUrl}</span>
                  <button
                    type="button"
                    onClick={() => handleCopyText(results.finalUrl, 'final-url-card')}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 shrink-0"
                  >
                    {copiedId === 'final-url-card' ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                  </button>
                </div>
              </div>
            </div>

            {/* SEO & Security Diagnostics Panel */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-3 flex items-center gap-2">
                <Shield size={18} className="text-[#518231]" />
                SEO & Crawl Diagnostics
              </h3>

              {/* Status Audit List */}
              <div className="space-y-3.5">
                
                {/* 1. Redirect loop diagnostic */}
                <div className="flex items-start gap-3">
                  {results.loopDetected ? (
                    <>
                      <AlertOctagon className="text-rose-500 shrink-0 mt-0.5" size={16} />
                      <div className="text-sm">
                        <span className="font-bold text-slate-900 dark:text-white">Redirect Loop: </span>
                        <span className="text-slate-600 dark:text-slate-400 block mt-0.5">Circular loops detected, resulting in browser timeout crashes.</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                      <div className="text-sm">
                        <span className="font-bold text-slate-900 dark:text-white">No Circular Loops: </span>
                        <span className="text-slate-600 dark:text-slate-400 block mt-0.5">No loops identified. All routes resolved cleanly.</span>
                      </div>
                    </>
                  )}
                </div>

                {/* 2. Hop Count Audit */}
                <div className="flex items-start gap-3">
                  {results.redirectChain.length > 3 && !results.loopDetected ? (
                    <>
                      <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                      <div className="text-sm">
                        <span className="font-bold text-slate-900 dark:text-white">Chain Too Long: </span>
                        <span className="text-slate-600 dark:text-slate-400 block mt-0.5">
                          {results.redirectChain.length - 1} hops. Keep chains to under 3 hops for fast page loads and crawl efficiency.
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                      <div className="text-sm">
                        <span className="font-bold text-slate-900 dark:text-white">Clean Chain Length: </span>
                        <span className="text-slate-600 dark:text-slate-400 block mt-0.5">
                          {results.redirectChain.length - 1} {results.redirectChain.length - 1 === 1 ? 'hop' : 'hops'} detected (within SEO limits).
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* 3. HTTP to HTTPS Check */}
                {(() => {
                  const hasHttpsToHttp = results.redirectChain.some((step: any, index: number) => {
                    if (index === 0) return false;
                    const prev = results.redirectChain[index - 1];
                    return prev.url.startsWith('https://') && step.url.startsWith('http://');
                  });
                  return (
                    <div className="flex items-start gap-3">
                      {hasHttpsToHttp ? (
                        <>
                          <AlertTriangle className="text-rose-500 shrink-0 mt-0.5" size={16} />
                          <div className="text-sm">
                            <span className="font-bold text-slate-900 dark:text-white">SSL Strip Flagged: </span>
                            <span className="text-slate-600 dark:text-slate-400 block mt-0.5">A secure HTTPS address redirected back to insecure HTTP.</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                          <div className="text-sm">
                            <span className="font-bold text-slate-900 dark:text-white">SSL Consistency: </span>
                            <span className="text-slate-600 dark:text-slate-400 block mt-0.5">No insecure downgrades detected in the sequence.</span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })()}

                {/* 4. Final destination SSL status */}
                <div className="flex items-start gap-3">
                  {results.finalUrl.startsWith('http://') ? (
                    <>
                      <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                      <div className="text-sm">
                        <span className="font-bold text-slate-900 dark:text-white">Insecure Destination: </span>
                        <span className="text-slate-600 dark:text-slate-400 block mt-0.5">The final destination is unencrypted HTTP. Users are not protected.</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                      <div className="text-sm">
                        <span className="font-bold text-slate-900 dark:text-white">Secure Destination: </span>
                        <span className="text-slate-600 dark:text-slate-400 block mt-0.5">The final URL resolves over secure HTTPS connection.</span>
                      </div>
                    </>
                  )}
                </div>

                {/* 5. Canonical Audit */}
                {(() => {
                  const finalHop = results.redirectChain[results.redirectChain.length - 1];
                  const hasCanonical = finalHop && finalHop.canonical;
                  const isMatching = hasCanonical && finalHop.canonical === finalHop.url;

                  return (
                    <div className="flex items-start gap-3">
                      {!hasCanonical ? (
                        <>
                          <Info className="text-blue-500 shrink-0 mt-0.5" size={16} />
                          <div className="text-sm">
                            <span className="font-bold text-slate-900 dark:text-white">No Canonical Header/Tag: </span>
                            <span className="text-slate-600 dark:text-slate-400 block mt-0.5">Final page does not declare a canonical URL to search crawlers.</span>
                          </div>
                        </>
                      ) : !isMatching ? (
                        <>
                          <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
                          <div className="text-sm">
                            <span className="font-bold text-slate-900 dark:text-white">Canonical Mismatch: </span>
                            <span className="text-slate-600 dark:text-slate-400 block mt-0.5">
                              Final URL ({finalHop.url}) differs from declared canonical tag ({finalHop.canonical}). This splits indexing equity.
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                          <div className="text-sm">
                            <span className="font-bold text-slate-900 dark:text-white">Canonical Alignment: </span>
                            <span className="text-slate-600 dark:text-slate-400 block mt-0.5">Final destination canonical tag matches URL perfectly.</span>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })()}

              </div>

              {/* Action warnings alerts listing if warnings returned by API */}
              {results.warnings && results.warnings.length > 0 && (
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                    Action Required List
                  </span>
                  <div className="space-y-1.5">
                    {results.warnings.map((warning: string, wi: number) => (
                      <div key={wi} className="p-2.5 bg-amber-500/5 border border-amber-500/10 rounded-lg text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2">
                        <AlertTriangle size={12} className="shrink-0 mt-0.5 text-amber-500" />
                        <span>{warning}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export { RedirectCheckerTool as default };
