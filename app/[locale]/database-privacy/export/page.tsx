"use client";

import React, { useState, useEffect } from "react";
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';

export default function ExportPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [exportType, setExportType] = useState<'findings' | 'rules' | 'audit_logs' | 'connections'>('findings');
  const [error, setError] = useState('');

  const [connections, setConnections] = useState<any[]>([]);
  const [selectedConnection, setSelectedConnection] = useState('');
  const [tables, setTables] = useState<string[]>([]);
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [maskingProfile, setMaskingProfile] = useState('strict');
  const [maskedRules, setMaskedRules] = useState<any[]>([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [connRes, rulesRes] = await Promise.all([
          privacyFetch('/api/privacy/connections'),
          privacyFetch('/api/privacy/masking-rules?limit=50')
        ]);
        if (connRes.ok) {
          const data = await connRes.json();
          setConnections(data.connections || data || []);
        }
        if (rulesRes.ok) {
          const data = await rulesRes.json();
          setMaskedRules(data.rules || data || []);
        }
      } catch (e) {
        console.error('Failed to fetch initial data:', e);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    setSelectedTables([]);
    if (selectedConnection) {
      setTables(['users', 'orders', 'transactions', 'sessions', 'audit_logs']);
    } else {
      setTables([]);
    }
  }, [selectedConnection]);

  const handleExport = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await privacyFetch('/api/privacy/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: exportType, 
          format,
          connection_id: selectedConnection || undefined,
          tables: selectedTables.length > 0 ? selectedTables : undefined,
          masking_profile: maskingProfile,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Export failed');
      }
      // Trigger file download
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const date = new Date().toISOString().slice(0, 10);
      a.download = `export-${exportType}-${date}.${format}`;
      a.click();
      URL.revokeObjectURL(url);
      setDone(true);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Export Data
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Extract and anonymize data from your connected databases.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Source Database
            </label>
            <select 
              value={selectedConnection} 
              onChange={e => setSelectedConnection(e.target.value)}
              className="w-full px-4 py-2.5 bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
            >
              <option value="">-- Select a database --</option>
              {connections.map(c => (
                <option key={c.id || c.name} value={c.id || c.name}>{c.name} ({c.type})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Tables to Export
            </label>
            <div className="space-y-2 border border-slate-200 dark:border-slate-800 rounded-xl p-4 max-h-48 overflow-y-auto bg-slate-50 dark:bg-[#0B1120]">
              {tables.length === 0 && !selectedConnection ? (
                <p className="text-sm text-slate-400 italic">Select a database to see tables</p>
              ) : (
                tables.map((table) => (
                  <label key={table} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded text-violet-600 border-slate-300 focus:ring-violet-500"
                      checked={selectedTables.includes(table)}
                      onChange={e => {
                        setSelectedTables(prev =>
                          e.target.checked ? [...prev, table] : prev.filter(t => t !== table)
                        );
                      }}
                    />
                    <span className="text-sm font-mono text-slate-700 dark:text-slate-300">{table}</span>
                  </label>
                ))
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Export Format
              </label>
              <select value={format} onChange={e => setFormat(e.target.value as 'csv' | 'json')} className="w-full px-4 py-2.5 bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white">
                <option value="csv">CSV (.csv)</option>
                <option value="json">JSON (.json)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Masking Profile
              </label>
              <select 
                value={maskingProfile}
                onChange={e => setMaskingProfile(e.target.value)}
                className="w-full px-4 py-2.5 bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
              >
                <option value="strict">Strict (GDPR Compliant)</option>
                <option value="partial">Partial (Analytics Only)</option>
                <option value="none">None (Raw Data) - Requires Admin</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl px-4 py-2">{error}</p>
            )}
            {done ? (
              <div className="flex gap-4">
                <div className="flex-1 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-xl font-medium flex items-center justify-center gap-2">
                  ✓ File downloaded successfully
                </div>
                <button
                  onClick={() => { setDone(false); setError(''); }}
                  className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-medium transition-colors"
                >
                  New Export
                </button>
              </div>
            ) : (
              <button
                onClick={handleExport}
                disabled={loading}
                className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                    Generating Export...
                  </>
                ) : (
                  `Export ${exportType} as .${format}`
                )}
              </button>
            )}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10">
          <h3 className="font-bold text-slate-900 dark:text-white mb-2">Export Type</h3>
          <p className="text-xs text-slate-500 mb-4">Choose what data to export</p>
          <div className="space-y-2">
            {(['findings','rules','audit_logs','connections'] as const).map(t => (
              <label key={t} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                exportType === t
                  ? 'border-violet-400 dark:border-violet-600 bg-violet-50 dark:bg-violet-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-violet-300'
              }`}>
                <input type="radio" name="exportType" value={t} checked={exportType === t} onChange={() => setExportType(t)} className="text-violet-600" />
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white capitalize">{t.replace('_', ' ')}</p>
                  <p className="text-xs text-slate-500">{t === 'findings' ? 'PII scan findings' : t === 'rules' ? 'Masking rules' : t === 'audit_logs' ? 'Audit trail logs' : 'DB connections'}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
