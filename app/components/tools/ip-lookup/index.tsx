'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, Globe, ShieldCheck, ShieldAlert, FileText, Download, 
  Copy, Check, Loader2, Info, Server, Activity, FileJson, 
  AlertTriangle, RefreshCw, MapPin, Network, Shield, Eye, Map, 
  HelpCircle, ExternalLink
} from 'lucide-react';

interface GeolocationInfo {
  country: string;
  countryCode: string;
  region: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  timezoneOffset: string;
  currentTime: string;
}

interface NetworkInfo {
  isp: string;
  asn: string;
  org: string;
  cidr: string;
  connectionType: string;
}

interface SecurityInfo {
  isVpn: boolean;
  isProxy: boolean;
  isTor: boolean;
  isHosting: boolean;
  reputationScore: string;
  warnings: string[];
}

interface IpLookupResponse {
  success: boolean;
  ip: string;
  ipVersion: 'IPv4' | 'IPv6';
  isPrivate: boolean;
  isDemo: boolean;
  originalPrivateIp: string | null;
  geolocation: GeolocationInfo;
  network: NetworkInfo;
  security: SecurityInfo;
  reverseDns: string[];
  error?: string;
}

export function IpLookupTool() {
  const [ipInput, setIpInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<IpLookupResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedAction, setCopiedAction] = useState<'json' | 'txt' | 'copy' | null>(null);
  const [copiedDataId, setCopiedDataId] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Trigger search execution
  const triggerLookup = useCallback(async (queryVal: string) => {
    setLoading(true);
    setError(null);
    setResults(null);
    setMapLoaded(false);

    try {
      const response = await fetch('/api/tools/ip-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ip: queryVal.trim() })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Failed to retrieve IP information. Please try again.');
      } else {
        setResults(data);
        setIpInput(data.ip);
        
        // Sync URL query parameters for shareability
        const newParams = new URLSearchParams(window.location.search);
        newParams.set('ip', data.ip);
        const newUrl = `${window.location.pathname}?${newParams.toString()}`;
        window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during the IP lookup execution.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Check URL state on mount (Safe client-only parameter detection)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlIp = params.get('ip') || params.get('query');
      if (urlIp) {
        setIpInput(urlIp);
        triggerLookup(urlIp);
      } else {
        // Automatically look up user's own IP on load
        triggerLookup('');
      }
    }
  }, [triggerLookup]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerLookup(ipInput);
  };

  const handleDetectMyIp = () => {
    setIpInput('');
    triggerLookup('');
  };

  const handleExampleClick = (exVal: string) => {
    setIpInput(exVal);
    triggerLookup(exVal);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDataId(id);
    setTimeout(() => setCopiedDataId(null), 2000);
  };

  const handleExport = (type: 'json' | 'txt') => {
    if (!results) return;

    let content = '';
    let filename = `ip-report-${results.ip}`;

    if (type === 'json') {
      content = JSON.stringify(results, null, 2);
      filename += '.json';
    } else {
      // Build TXT summary report
      content = `====================================================\n`;
      content += `IP ADDRESS LOOKUP & GEOLOCATION REPORT\n`;
      content += `Target IP: ${results.ip} (${results.ipVersion})\n`;
      content += `Date: ${new Date().toLocaleString()}\n`;
      content += `====================================================\n\n`;

      content += `[GEOLOCATION DETAILS]\n`;
      content += `- Country: ${results.geolocation.country} (${results.geolocation.countryCode})\n`;
      content += `- Region/State: ${results.geolocation.region}\n`;
      content += `- City: ${results.geolocation.city}\n`;
      content += `- ZIP/Postal Code: ${results.geolocation.zip}\n`;
      content += `- Coordinates: Lat ${results.geolocation.lat}, Lon ${results.geolocation.lon}\n`;
      content += `- Timezone: ${results.geolocation.timezone} (Offset: ${results.geolocation.timezoneOffset})\n`;
      if (results.geolocation.currentTime) {
        content += `- Local Time: ${results.geolocation.currentTime}\n`;
      }
      content += `\n`;

      content += `[NETWORK SPECIFICATIONS]\n`;
      content += `- ISP: ${results.network.isp}\n`;
      content += `- Autonomous System: ${results.network.asn}\n`;
      content += `- Organization: ${results.network.org}\n`;
      content += `- Route/CIDR Block: ${results.network.cidr}\n`;
      content += `- Connection Type: ${results.network.connectionType}\n`;
      content += `\n`;

      content += `[SECURITY & THREAT AUDIT]\n`;
      content += `- VPN Connection: ${results.security.isVpn ? 'Yes' : 'No'}\n`;
      content += `- Proxy Endpoint: ${results.security.isProxy ? 'Yes' : 'No'}\n`;
      content += `- Tor Exit Node: ${results.security.isTor ? 'Yes' : 'No'}\n`;
      content += `- Datacenter/Hosting IP: ${results.security.isHosting ? 'Yes' : 'No'}\n`;
      content += `- Reputation Rating: ${results.security.reputationScore.toUpperCase()}\n`;
      if (results.security.warnings.length > 0) {
        content += `- Security Alerts:\n`;
        results.security.warnings.forEach(w => {
          content += `  * ${w}\n`;
        });
      }
      content += `\n`;

      content += `[REVERSE DNS INFO]\n`;
      if (results.reverseDns.length > 0) {
        results.reverseDns.forEach(host => {
          content += `- PTR Record: ${host}\n`;
        });
      } else {
        content += `- PTR Record: None found\n`;
      }
      
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

  // OpenStreetMap embed URL helper
  const getMapEmbedUrl = (lat: number, lon: number) => {
    const deltaLon = 0.015;
    const deltaLat = 0.01;
    const bboxMinLon = lon - deltaLon;
    const bboxMinLat = lat - deltaLat;
    const bboxMaxLon = lon + deltaLon;
    const bboxMaxLat = lat + deltaLat;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bboxMinLon}%2C${bboxMinLat}%2C${bboxMaxLon}%2C${bboxMaxLat}&layer=mapnik&marker=${lat}%2C${lon}`;
  };

  return (
    <div className="space-y-8">
      {/* Search Input Card */}
      <div className="bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/60 shadow-inner">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative flex flex-col lg:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
              <input
                type="text"
                value={ipInput}
                onChange={(e) => setIpInput(e.target.value)}
                placeholder="Enter IPv4 or IPv6 Address (e.g. 8.8.8.8, 2606:4700:4700::1111) or leave empty for yours..."
                className="w-full pl-12 pr-4 py-3.5 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#518231] dark:focus:ring-[#6fa844] focus:border-transparent text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-all font-medium text-base shadow-sm"
              />
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={handleDetectMyIp}
                disabled={loading}
                className="px-5 py-3.5 bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl font-bold flex items-center justify-center gap-2 shadow-sm transition-all select-none disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                title="Detect my current public IP address"
              >
                <Eye size={18} />
                <span>My IP</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 lg:flex-none px-7 py-3.5 bg-[#518231] hover:bg-[#436c29] text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all select-none disabled:opacity-75 disabled:cursor-not-allowed group cursor-pointer"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <RefreshCw className="group-hover:rotate-45 transition-transform" size={18} />
                )}
                <span>{loading ? 'Lookup...' : 'Lookup IP'}</span>
              </button>
            </div>
          </div>

          {/* Quick Examples */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Examples:</span>
            {[
              { label: 'Google DNS (IPv4)', ip: '8.8.8.8' },
              { label: 'Cloudflare (IPv6)', ip: '2606:4700:4700::1111' },
              { label: 'Private LAN', ip: '192.168.1.1' },
              { label: 'Loopback', ip: '127.0.0.1' }
            ].map(ex => (
              <button
                key={ex.ip}
                type="button"
                onClick={() => handleExampleClick(ex.ip)}
                className="px-2.5 py-1 bg-white hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 rounded border border-slate-200 dark:border-slate-800 hover:text-[#518231] dark:hover:text-[#6fa844] transition-all cursor-pointer shadow-sm"
              >
                {ex.label} ({ex.ip})
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
            <h4 className="font-bold text-base">Lookup Error</h4>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-800/50" />
            <div className="h-96 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-800/50" />
          </div>
        </div>
      )}

      {/* Results Workspace */}
      {results && !loading && (
        <div className="space-y-6">
          {/* Demo or Private IP Warnings */}
          {results.isDemo && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl text-amber-800 dark:text-amber-300 flex gap-3 shadow-sm">
              <Info className="shrink-0 mt-0.5 text-amber-600 dark:text-amber-500" size={20} />
              <div className="text-sm">
                <span className="font-bold">Local Host Detected:</span> Your public client IP resolved to a local loopback interface ({results.originalPrivateIp}). We have substituted <span className="font-bold">8.8.8.8 (Google Public DNS)</span> for demonstration purposes so you can experience full geolocation analytics.
              </div>
            </div>
          )}

          {results.isPrivate && (
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-xl text-blue-800 dark:text-blue-300 flex gap-3 shadow-sm">
              <Info className="shrink-0 mt-0.5 text-blue-600 dark:text-blue-500" size={20} />
              <div className="text-sm">
                <span className="font-bold">Private IP Subnet:</span> The address <span className="font-bold">{results.ip}</span> belongs to a non-routable private/local network space. To prevent Server-Side Request Forgeries (SSRF) and data leaks, no external geolocation APIs were queried.
              </div>
            </div>
          )}

          {/* Quick Metrics Header */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                <Globe size={24} />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">IP Address</span>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 mt-0.5 text-base truncate select-all" title={results.ip}>
                  {results.ip}
                </h4>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Location</span>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 mt-0.5 text-base truncate flex items-center gap-1.5" title={`${results.geolocation.city}, ${results.geolocation.country}`}>
                  {results.geolocation.countryCode !== 'LOCAL' && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img 
                      src={`https://flagcdn.com/w40/${results.geolocation.countryCode.toLowerCase()}.png`} 
                      alt={results.geolocation.country} 
                      className="w-5 h-3.5 rounded shadow-sm object-cover"
                    />
                  )}
                  <span className="truncate">{results.geolocation.city || 'Unknown'}, {results.geolocation.countryCode}</span>
                </h4>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Server size={24} />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">ISP Network</span>
                <h4 className="font-bold text-slate-800 dark:text-slate-100 mt-0.5 text-base truncate" title={results.network.isp}>
                  {results.network.isp || 'N/A'}
                </h4>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                results.security.reputationScore === 'Good' || results.security.reputationScore.includes('Secure')
                  ? 'bg-green-500/10 text-green-600 dark:text-green-400'
                  : results.security.reputationScore === 'Medium'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'bg-red-500/10 text-red-600 dark:text-red-400'
              }`}>
                <Shield size={24} />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Risk Rating</span>
                <h4 className={`font-bold mt-0.5 text-base ${
                  results.security.reputationScore === 'Good' || results.security.reputationScore.includes('Secure')
                    ? 'text-green-600 dark:text-green-400'
                    : results.security.reputationScore === 'Medium'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-red-600 dark:text-red-400'
                }`}>
                  {results.security.reputationScore}
                </h4>
              </div>
            </div>
          </div>

          {/* Export Actions Panel */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 dark:bg-slate-900/30 p-4 rounded-xl border border-slate-200/50 dark:border-slate-800/50">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                Successfully resolved details for {results.ip}
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

          {/* Core Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Metadata Panels (Left/Main Column) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Geolocation Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                  <MapPin size={20} className="text-[#518231]" /> Geolocation Details
                </h3>
                <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      <tr className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50/20 dark:hover:bg-slate-850/10 text-sm">
                        <td className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500 w-1/3">Country</td>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium flex items-center gap-2">
                          {results.geolocation.countryCode !== 'LOCAL' && (
                            /* eslint-disable-next-line @next/next/no-img-element */
                            <img 
                              src={`https://flagcdn.com/w40/${results.geolocation.countryCode.toLowerCase()}.png`} 
                              alt={results.geolocation.country} 
                              className="w-5 h-3.5 rounded shadow-sm object-cover"
                            />
                          )}
                          <span>{results.geolocation.country} ({results.geolocation.countryCode})</span>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50/20 dark:hover:bg-slate-850/10 text-sm">
                        <td className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500">Region / State</td>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium">{results.geolocation.region || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50/20 dark:hover:bg-slate-850/10 text-sm">
                        <td className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500">City</td>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium">{results.geolocation.city || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50/20 dark:hover:bg-slate-850/10 text-sm">
                        <td className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500">ZIP / Postal Code</td>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium font-mono">{results.geolocation.zip || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50/20 dark:hover:bg-slate-850/10 text-sm">
                        <td className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500">Coordinates</td>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium flex items-center justify-between">
                          <span className="font-mono">{results.geolocation.lat}, {results.geolocation.lon}</span>
                          <button
                            onClick={() => handleCopyText(`${results.geolocation.lat}, ${results.geolocation.lon}`, 'coordinates')}
                            className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                            title="Copy coordinates"
                          >
                            {copiedDataId === 'coordinates' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                          </button>
                        </td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50/20 dark:hover:bg-slate-850/10 text-sm">
                        <td className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500">Timezone</td>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium">{results.geolocation.timezone} (UTC {results.geolocation.timezoneOffset})</td>
                      </tr>
                      {results.geolocation.currentTime && (
                        <tr className="hover:bg-slate-50/20 dark:hover:bg-slate-850/10 text-sm">
                          <td className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500">Local Time</td>
                          <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium font-mono">{results.geolocation.currentTime}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Network Specifications Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                  <Network size={20} className="text-[#518231]" /> Network Routing & Registry Info
                </h3>
                <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      <tr className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50/20 dark:hover:bg-slate-850/10 text-sm">
                        <td className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500 w-1/3">ISP Name</td>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium select-all">{results.network.isp || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50/20 dark:hover:bg-slate-850/10 text-sm">
                        <td className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500">Autonomous System (ASN)</td>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium font-mono select-all">{results.network.asn || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50/20 dark:hover:bg-slate-850/10 text-sm">
                        <td className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500">Organization Name</td>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium select-all">{results.network.org || 'N/A'}</td>
                      </tr>
                      <tr className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50/20 dark:hover:bg-slate-850/10 text-sm">
                        <td className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500">Route Block / CIDR</td>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium font-mono select-all">{results.network.cidr || 'N/A'}</td>
                      </tr>
                      <tr className="hover:bg-slate-50/20 dark:hover:bg-slate-850/10 text-sm">
                        <td className="py-3 px-4 font-semibold text-slate-400 dark:text-slate-500">Connection Category</td>
                        <td className="py-3 px-4 text-slate-800 dark:text-slate-200 font-medium capitalize">{results.network.connectionType || 'Unknown'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Security Diagnostics Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                  <Shield size={20} className="text-[#518231]" /> Connection Security Profile
                </h3>

                {results.security.warnings.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {results.security.warnings.map((w, idx) => (
                      <div key={idx} className="p-3 bg-red-55/10 border border-red-200/50 dark:border-red-900/30 text-red-700 dark:text-red-400 rounded-xl text-xs font-semibold flex items-start gap-2.5">
                        <AlertTriangle className="shrink-0 mt-0.5 text-red-500" size={16} />
                        <span className="leading-relaxed">{w}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-xl border text-center transition-colors ${
                    results.security.isVpn 
                      ? 'bg-amber-50/40 dark:bg-amber-950/10 border-amber-200 dark:border-amber-900/30' 
                      : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-100 dark:border-slate-800/60'
                  }`}>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">VPN</span>
                    <span className={`text-base font-black mt-1 block ${results.security.isVpn ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      {results.security.isVpn ? 'DETECTED' : 'CLEAN'}
                    </span>
                  </div>

                  <div className={`p-4 rounded-xl border text-center transition-colors ${
                    results.security.isProxy 
                      ? 'bg-amber-50/40 dark:bg-amber-950/10 border-amber-200 dark:border-amber-900/30' 
                      : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-100 dark:border-slate-800/60'
                  }`}>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">PROXY</span>
                    <span className={`text-base font-black mt-1 block ${results.security.isProxy ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      {results.security.isProxy ? 'DETECTED' : 'CLEAN'}
                    </span>
                  </div>

                  <div className={`p-4 rounded-xl border text-center transition-colors ${
                    results.security.isTor 
                      ? 'bg-red-50/40 dark:bg-red-950/10 border-red-200 dark:border-red-900/30' 
                      : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-100 dark:border-slate-800/60'
                  }`}>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">TOR EXIT</span>
                    <span className={`text-base font-black mt-1 block ${results.security.isTor ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      {results.security.isTor ? 'DETECTED' : 'CLEAN'}
                    </span>
                  </div>

                  <div className={`p-4 rounded-xl border text-center transition-colors ${
                    results.security.isHosting 
                      ? 'bg-blue-50/40 dark:bg-blue-950/10 border-blue-200 dark:border-blue-900/30' 
                      : 'bg-slate-50/50 dark:bg-slate-950/40 border-slate-100 dark:border-slate-800/60'
                  }`}>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">HOSTING</span>
                    <span className={`text-base font-black mt-1 block ${results.security.isHosting ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400'}`}>
                      {results.security.isHosting ? 'YES' : 'NO'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reverse DNS (PTR Records) Card */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                  <Activity size={20} className="text-[#518231]" /> Reverse DNS PTR records
                </h3>
                {results.reverseDns.length > 0 ? (
                  <div className="border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-950/40 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                          <th className="py-2.5 px-4">PTR Target Domain</th>
                          <th className="py-2.5 px-4 text-right">Copy</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.reverseDns.map((hostname, index) => (
                          <tr key={index} className="border-b border-slate-100 dark:border-slate-800/30 hover:bg-slate-50/20 dark:hover:bg-slate-850/10 text-sm">
                            <td className="py-3 px-4 font-mono font-semibold text-slate-800 dark:text-slate-200 select-all break-all">{hostname}</td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => handleCopyText(hostname, `ptr-${index}`)}
                                className="p-1.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950 dark:hover:bg-slate-800 rounded border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                              >
                                {copiedDataId === `ptr-${index}` ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-850 rounded-xl text-sm text-slate-400 text-center py-6">
                    No PTR reverse DNS mapping found for this IP host.
                  </div>
                )}
              </div>
            </div>

            {/* Map Column (Right Column) */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl p-6 shadow-sm h-full flex flex-col">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4 shrink-0">
                  <Map size={20} className="text-[#518231]" /> Visual Geolocation Map
                </h3>
                
                <div className="relative flex-1 min-h-[320px] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100 dark:bg-slate-950 shadow-inner flex items-center justify-center">
                  {!mapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-950 z-10">
                      <Loader2 className="animate-spin text-[#518231]" size={36} />
                    </div>
                  )}
                  {results.geolocation.lat === 0 && results.geolocation.lon === 0 ? (
                    <div className="text-center p-6 text-slate-400">
                      <MapPin size={48} className="mx-auto mb-2 opacity-20" />
                      <p className="font-semibold text-sm">Map Unavailable</p>
                      <p className="text-xs mt-1">Private or local IP ranges cannot be visualized on a public map.</p>
                    </div>
                  ) : (
                    <iframe
                      src={getMapEmbedUrl(results.geolocation.lat, results.geolocation.lon)}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      onLoad={() => setMapLoaded(true)}
                      className="absolute inset-0 w-full h-full"
                      title={`OpenStreetMap centering on ${results.geolocation.lat}, ${results.geolocation.lon}`}
                    />
                  )}
                </div>

                <div className="mt-4 p-3.5 bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-100 dark:border-slate-850 shrink-0">
                  <span className="text-xs font-semibold text-slate-400 block uppercase">Mapped Endpoint</span>
                  <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1 flex justify-between items-center">
                    <span>Lat: {results.geolocation.lat}, Lon: {results.geolocation.lon}</span>
                    {results.geolocation.lat !== 0 && (
                      <a 
                        href={`https://www.openstreetmap.org/?mlat=${results.geolocation.lat}&mlon=${results.geolocation.lon}#map=15/${results.geolocation.lat}/${results.geolocation.lon}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#518231] hover:text-[#436c29] flex items-center gap-0.5 font-bold"
                      >
                        <span>Full Map</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IpLookupTool;
