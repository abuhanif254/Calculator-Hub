'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Globe, ShieldCheck, ShieldAlert, FileText, Download, 
  Copy, Check, Loader2, Info, Calendar, Server, Activity, 
  FileJson, AlertTriangle, RefreshCw, ExternalLink
} from 'lucide-react';

interface DnsRecordVal {
  value: string;
  ttl?: number;
  priority?: number;
  critical?: number;
  details?: any;
}

interface WhoisInfo {
  registrar: string;
  createdDate: string;
  domainAge?: string;
}

interface DiagnosticItem {
  type: 'spf' | 'dmarc' | 'dkim' | 'general';
  status: 'secure' | 'warning' | 'error';
  message: string;
}

interface LookupResponse {
  success: boolean;
  type: 'domain' | 'ip';
  input: string;
  dnsProvider?: string;
  hostingProvider?: string;
  records: Record<string, DnsRecordVal[]>;
  diagnostics: DiagnosticItem[];
  whois: WhoisInfo | null;
  error?: string;
}

export function DnsLookupTool() {
  const [domainInput, setDomainInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<LookupResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'a_aaaa' | 'mx' | 'txt' | 'ns' | 'other'>('all');
  const [copiedRecordId, setCopiedRecordId] = useState<string | null>(null);
  const [copiedAction, setCopiedAction] = useState<'json' | 'txt' | 'raw' | null>(null);

  // Trigger search execution
  const triggerLookup = useCallback(async (queryVal: string) => {
    if (!queryVal.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/tools/dns-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: queryVal.trim() })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Failed to complete DNS lookup. Please verify host or try again.');
      } else {
        setResults(data);
        // Automatically sync query param for shareability
        const newParams = new URLSearchParams(window.location.search);
        newParams.set('domain', queryVal.trim());
        const newUrl = `${window.location.pathname}?${newParams.toString()}`;
        window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during DNS lookup execution.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Check URL state on mount (Safe client-only parameter detection)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlDomain = params.get('domain') || params.get('input');
      if (urlDomain) {
        setDomainInput(urlDomain);
        triggerLookup(urlDomain);
      }
    }
  }, [triggerLookup]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerLookup(domainInput);
  };

  const handleExampleClick = (exVal: string) => {
    setDomainInput(exVal);
    triggerLookup(exVal);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRecordId(id);
    setTimeout(() => setCopiedRecordId(null), 2000);
  };

  const handleExport = (type: 'json' | 'txt') => {
    if (!results) return;

    let content = '';
    let filename = `dns-report-${results.input}`;

    if (type === 'json') {
      content = JSON.stringify(results, null, 2);
      filename += '.json';
    } else {
      // Build TXT summary report
      content = `====================================================\n`;
      content += `DNS LOOKUP & ANALYSIS REPORT FOR: ${results.input.toUpperCase()}\n`;
      content += `Date: ${new Date().toLocaleString()}\n`;
      content += `====================================================\n\n`;
      
      if (results.type === 'domain') {
        content += `DNS Hosting Provider: ${results.dnsProvider || 'Unknown'}\n`;
        content += `Web Infrastructure: ${results.hostingProvider || 'Unknown'}\n`;
        if (results.whois) {
          content += `Registrar: ${results.whois.registrar}\n`;
          content += `Registered Since: ${results.whois.createdDate ? new Date(results.whois.createdDate).toLocaleDateString() : 'Unknown'}\n`;
        }
        content += `\n----------------------------------------------------\n`;
        content += `SECURITY DIAGNOSTICS STATS\n`;
        content += `----------------------------------------------------\n`;
        results.diagnostics.forEach(diag => {
          content += `[${diag.status.toUpperCase()}] (${diag.type.toUpperCase()}) ${diag.message}\n`;
        });
      }

      content += `\n----------------------------------------------------\n`;
      content += `RESOLVED DNS RECORDS\n`;
      content += `----------------------------------------------------\n`;
      
      Object.entries(results.records).forEach(([recType, recordsList]) => {
        content += `\n[${recType} Records]\n`;
        recordsList.forEach(r => {
          content += `- Value: ${r.value}`;
          if (r.ttl) content += ` (TTL: ${r.ttl}s)`;
          if (r.priority !== undefined) content += ` (Priority: ${r.priority})`;
          content += `\n`;
        });
      });

      filename += '.txt';
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedAction(type);
    setTimeout(() => setCopiedAction(null), 2000);
  };

  const getRecordExplanation = (type: string, record: DnsRecordVal) => {
    switch (type) {
      case 'A':
        return 'Standard IPv4 address pointing directly to a physical server hosting domain files.';
      case 'AAAA':
        return 'Modern IPv6 address serving the same purpose as an A record on the IPv6 protocol.';
      case 'CNAME':
        return 'Alias mapping this hostname to another domain name. Resolvers will redirect queries here.';
      case 'MX':
        return `Mail server exchange handler at priority ${record.priority || 0}. Lower priorities are queried first.`;
      case 'TXT':
        return 'Plain text metadata. Typically used for domain validation, security (SPF/DKIM), and services.';
      case 'NS':
        return 'Nameserver record indicating the server holding authoritative DNS zone details for this hostname.';
      case 'SOA':
        return 'Start of Authority. Sets primary domain configuration attributes and server replication sync intervals.';
      case 'CAA':
        return `Restricts SSL/TLS certificate issuance. Authority: ${record.value.split(': ')[1] || 'Authorized CA'}.`;
      case 'SRV':
        return 'Service directory specification outlining protocol ports, priority weighting, and server details.';
      case 'PTR':
        return 'Reverse DNS record mapping an IP address back to its verified domain hostname.';
      default:
        return 'General domain record.';
    }
  };

  const renderTabs = () => {
    if (!results || results.type === 'ip') return null;

    const tabsList = [
      { id: 'all', label: 'All Records' },
      { id: 'a_aaaa', label: 'A & AAAA' },
      { id: 'mx', label: 'MX (Mail)' },
      { id: 'txt', label: 'TXT (Text)' },
      { id: 'ns', label: 'NS (Nameservers)' },
      { id: 'other', label: 'SOA / CAA / SRV' }
    ] as const;

    return (
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none gap-2 mt-6">
        {tabsList.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-4 font-semibold text-sm whitespace-nowrap border-b-2 transition-all relative ${
                isActive 
                  ? 'border-[#518231] text-[#518231] dark:text-[#6fa844]' 
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#518231] dark:bg-[#6fa844] rounded-full animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>
    );
  };

  const getFilteredRecords = (): { type: string; list: DnsRecordVal[] }[] => {
    if (!results) return [];
    const entries = Object.entries(results.records);

    if (activeTab === 'all') {
      return entries.map(([type, list]) => ({ type, list }));
    }

    const filtered = entries.filter(([type]) => {
      if (activeTab === 'a_aaaa') return type === 'A' || type === 'AAAA';
      if (activeTab === 'mx') return type === 'MX';
      if (activeTab === 'txt') return type === 'TXT';
      if (activeTab === 'ns') return type === 'NS';
      if (activeTab === 'other') return type === 'SOA' || type === 'CAA' || type === 'SRV';
      return false;
    });

    return filtered.map(([type, list]) => ({ type, list }));
  };

  const hasAnyRecords = () => {
    if (!results) return false;
    if (results.type === 'ip') return results.records['PTR']?.length > 0;
    return getFilteredRecords().some(r => r.list.length > 0);
  };

  return (
    <div className="space-y-8">
      {/* Search Input Card */}
      <div className="bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-inner">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
              <input
                type="text"
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="Enter domain name or IP address (e.g. google.com, 8.8.8.8)..."
                required
                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] dark:focus:ring-[#6fa844] focus:border-transparent text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all font-medium text-base shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="md:w-auto px-6 py-3.5 bg-[#518231] hover:bg-[#436c29] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all select-none disabled:opacity-75 disabled:cursor-not-allowed group"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <RefreshCw className="group-hover:rotate-45 transition-transform" size={18} />
              )}
              {loading ? 'Querying DNS...' : 'Query DNS'}
            </button>
          </div>

          {/* Quick Examples */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Examples:</span>
            {['google.com', 'cloudflare.com', '8.8.8.8', 'github.com'].map(ex => (
              <button
                key={ex}
                type="button"
                onClick={() => handleExampleClick(ex)}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 rounded border border-slate-200 dark:border-slate-800 hover:text-[#518231] dark:hover:text-[#6fa844] transition-all cursor-pointer shadow-sm"
              >
                {ex}
              </button>
            ))}
          </div>
        </form>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl text-red-700 dark:text-red-400 flex items-start gap-3 animate-fade-in shadow-sm">
          <AlertTriangle className="shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="font-bold text-base">DNS Lookup Error</h4>
            <p className="text-sm mt-0.5 opacity-90">{error}</p>
          </div>
        </div>
      )}

      {/* Skeletons Loading State */}
      {loading && (
        <div className="space-y-6 animate-pulse">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-800/50" />
            ))}
          </div>
          <div className="h-64 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-800/50" />
        </div>
      )}

      {/* Results Workspace */}
      {results && !loading && (
        <div className="space-y-6">
          {/* Domain Overview dashboard */}
          {results.type === 'domain' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                  <Globe size={24} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">DNS Host Network</span>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 mt-0.5 text-base truncate max-w-[160px]" title={results.dnsProvider}>
                    {results.dnsProvider || 'Unknown'}
                  </h4>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Server size={24} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Web Server Host</span>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 mt-0.5 text-base truncate max-w-[160px]" title={results.hostingProvider}>
                    {results.hostingProvider || 'Unknown'}
                  </h4>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Calendar size={24} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Domain Registration</span>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 mt-0.5 text-base truncate max-w-[160px]" title={results.whois?.registrar}>
                    {results.whois?.domainAge || 'Unknown Age'}
                  </h4>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Activity size={24} />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Security Auditing</span>
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 mt-0.5 text-base">
                    {(() => {
                      const errors = results.diagnostics.filter(d => d.status === 'error').length;
                      const warnings = results.diagnostics.filter(d => d.status === 'warning').length;
                      if (errors === 0 && warnings === 0) return 'All Secure';
                      return `${errors > 0 ? `${errors} Error${errors > 1 ? 's' : ''}` : ''}${errors > 0 && warnings > 0 ? ', ' : ''}${warnings > 0 ? `${warnings} Warning${warnings > 1 ? 's' : ''}` : ''}`;
                    })()}
                  </h4>
                </div>
              </div>
            </div>
          )}

          {/* Security Diagnostics Section */}
          {results.type === 'domain' && results.diagnostics && results.diagnostics.length > 0 && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                <ShieldCheck size={22} className="text-[#518231]" /> Security Diagnostics & Mail Configuration
              </h3>
              
              <div className="grid gap-4">
                {results.diagnostics.map((diag, index) => {
                  const isSecure = diag.status === 'secure';
                  const isWarning = diag.status === 'warning';
                  const isError = diag.status === 'error';

                  return (
                    <div 
                      key={index}
                      className={`flex gap-3 p-4 rounded-xl border items-start transition-colors ${
                        isSecure 
                          ? 'bg-green-50/40 dark:bg-green-950/10 border-green-200/50 dark:border-green-900/30 text-green-800 dark:text-green-300'
                          : isWarning 
                            ? 'bg-amber-50/40 dark:bg-amber-950/10 border-amber-200/50 dark:border-amber-900/30 text-amber-800 dark:text-amber-300'
                            : 'bg-red-50/40 dark:bg-red-950/10 border-red-200/50 dark:border-red-900/30 text-red-800 dark:text-red-300'
                      }`}
                    >
                      {isSecure ? (
                        <ShieldCheck size={20} className="shrink-0 text-green-600 dark:text-green-500 mt-0.5" />
                      ) : isWarning ? (
                        <AlertTriangle size={20} className="shrink-0 text-amber-600 dark:text-amber-500 mt-0.5" />
                      ) : (
                        <ShieldAlert size={20} className="shrink-0 text-red-600 dark:text-red-500 mt-0.5" />
                      )}
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs uppercase tracking-wider px-2 py-0.5 rounded bg-white/60 dark:bg-black/20 shadow-sm border border-black/5 dark:border-white/5">
                            {diag.type}
                          </span>
                          <span className="font-semibold text-sm">
                            {isSecure ? 'Active & Secure' : isWarning ? 'Warning' : 'Critical Issue'}
                          </span>
                        </div>
                        <p className="text-sm mt-1 font-medium leading-relaxed break-words">{diag.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Export Actions Panel */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Successfully resolved {results.type === 'domain' ? 'records' : 'reverse IP mapping'}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleExport('txt')}
                className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300 transition-colors shadow-sm select-none cursor-pointer"
              >
                {copiedAction === 'txt' ? <Check size={16} className="text-green-500" /> : <FileText size={16} />}
                {copiedAction === 'txt' ? 'Downloaded!' : 'Download TXT'}
              </button>
              <button
                onClick={() => handleExport('json')}
                className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300 transition-colors shadow-sm select-none cursor-pointer"
              >
                {copiedAction === 'json' ? <Check size={16} className="text-green-500" /> : <FileJson size={16} />}
                {copiedAction === 'json' ? 'Downloaded!' : 'Download JSON'}
              </button>
            </div>
          </div>

          {/* DNS Records Tab Explorer */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl overflow-hidden shadow-sm">
            {renderTabs()}

            {/* Records Content */}
            <div className="p-6">
              {!hasAnyRecords() ? (
                <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                  <Globe size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="font-semibold text-lg">No records found matching this tab selection.</p>
                  <p className="text-sm mt-1">Try querying another record type or check domain setup.</p>
                </div>
              ) : results.type === 'ip' ? (
                <div className="space-y-4">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                    <Server size={18} className="text-[#518231]" /> Reverse DNS (PTR) Mapping
                  </h3>
                  
                  <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-950/40 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                          <th className="py-3 px-4">Record Type</th>
                          <th className="py-3 px-4">Hostname</th>
                          <th className="py-3 px-4">Explanation</th>
                          <th className="py-3 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.records['PTR']?.map((r, idx) => (
                          <tr key={idx} className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50/40 dark:hover:bg-slate-800/10 text-sm">
                            <td className="py-4 px-4 font-bold text-xs"><span className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">PTR</span></td>
                            <td className="py-4 px-4 font-mono text-slate-800 dark:text-slate-200 select-all font-semibold break-all">{r.value}</td>
                            <td className="py-4 px-4 text-slate-500 text-xs leading-relaxed max-w-[280px]">{getRecordExplanation('PTR', r)}</td>
                            <td className="py-4 px-4 text-right">
                              <button
                                onClick={() => handleCopyText(r.value, `ptr-${idx}`)}
                                className="p-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-850 rounded border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 shadow-sm cursor-pointer"
                              >
                                {copiedRecordId === `ptr-${idx}` ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {getFilteredRecords()
                    .filter(recGroup => recGroup.list.length > 0)
                    .map((recGroup, groupIdx) => (
                      <div key={groupIdx} className="space-y-3">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white flex items-center gap-2">
                          <span className="px-2.5 py-0.5 text-xs font-black uppercase rounded bg-green-50 dark:bg-green-950/40 text-[#518231] dark:text-[#6fa844] border border-[#518231]/10 dark:border-[#6fa844]/25">
                            {recGroup.type}
                          </span>
                          <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 tracking-wide">
                            ({recGroup.list.length} record{recGroup.list.length > 1 ? 's' : ''} found)
                          </span>
                        </h3>
                        
                        <div className="border border-slate-100 dark:border-slate-850 rounded-xl overflow-hidden shadow-inner">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 dark:bg-slate-950/40 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                                <th className="py-3 px-4">Value</th>
                                {recGroup.type === 'MX' && <th className="py-3 px-4">Priority</th>}
                                <th className="py-3 px-4">TTL (s)</th>
                                <th className="py-3 px-4">Explanation</th>
                                <th className="py-3 px-4 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {recGroup.list.map((r, rIdx) => {
                                const idKey = `${recGroup.type}-${groupIdx}-${rIdx}`;
                                return (
                                  <tr key={rIdx} className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50/40 dark:hover:bg-slate-850/20 text-sm">
                                    <td className="py-4 px-4 font-mono text-slate-800 dark:text-slate-200 select-all font-semibold break-all leading-relaxed">
                                      {r.value}
                                    </td>
                                    {recGroup.type === 'MX' && (
                                      <td className="py-4 px-4 font-bold font-mono text-xs">
                                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                                          {r.priority ?? 'N/A'}
                                        </span>
                                      </td>
                                    )}
                                    <td className="py-4 px-4 font-semibold text-xs font-mono text-slate-400">
                                      {r.ttl ? `${r.ttl}s` : 'N/A'}
                                    </td>
                                    <td className="py-4 px-4 text-slate-500 text-xs leading-relaxed max-w-[280px]">
                                      {getRecordExplanation(recGroup.type, r)}
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                      <button
                                        onClick={() => handleCopyText(r.value, idKey)}
                                        className="p-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 rounded border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 shadow-sm cursor-pointer transition-colors"
                                      >
                                        {copiedRecordId === idKey ? <Check size={14} className="text-green-500 animate-scale-up" /> : <Copy size={14} />}
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* WHOIS-like insights panel (Lightweight RDAP info) */}
          {results.type === 'domain' && results.whois && (
            <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 border border-slate-200/50 dark:border-slate-850 p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                <Info size={22} className="text-[#518231]" /> Domain Information (RDAP Registrar Registry)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Authorized Registrar</span>
                  <p className="font-bold text-slate-700 dark:text-slate-300 mt-1 flex items-center gap-1">
                    {results.whois.registrar}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registration Date</span>
                  <p className="font-bold text-slate-700 dark:text-slate-300 mt-1">
                    {results.whois.createdDate ? new Date(results.whois.createdDate).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'Unknown'}
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Registration Age</span>
                  <p className="font-bold text-[#518231] dark:text-[#6fa844] mt-1">
                    {results.whois.domainAge || 'Unknown'}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                <Info size={14} className="shrink-0 text-slate-400/80" />
                <span>Information retrieved in real time via live RDAP client protocols. Lightweight alternative to legacy WHOIS query filters.</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default DnsLookupTool;
