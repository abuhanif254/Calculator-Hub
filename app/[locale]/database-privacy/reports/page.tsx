export const runtime = 'edge';
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { Download, AlertCircle, RefreshCw, Activity, ShieldCheck, Database, Loader2, FileText } from 'lucide-react';

interface ReportData {
  findingsByRisk: Array<{ name: string; value: number; color: string }>;
  scanActivity: Array<{ name: string; scans: number; findings: number }>;
  complianceScores: Array<{ framework: string; score: number }>;
  topConnections: Array<{ name: string; scans: number; findings: number }>;
}

export default function ReportsPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [exporting, setExporting] = useState(false);
  const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error' } | null>(null);

  const fetchReport = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await privacyFetch('/api/privacy/reports');
      if (!res.ok) throw new Error('Failed to fetch report data');
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReport();
  }, [fetchReport]);

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await privacyFetch('/api/privacy/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'findings', format: 'csv' }),
      });
      if (!res.ok) throw new Error('Export failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `privacy-report-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      setToast({ msg: 'Export successful', type: 'success' });
    } catch (err: any) {
      setToast({ msg: err.message || 'Export failed', type: 'error' });
    } finally {
      setExporting(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const getComplianceFallback = () => [
    { framework: 'GDPR', score: 0 },
    { framework: 'HIPAA', score: 0 },
    { framework: 'PCI-DSS', score: 0 }
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium flex items-center gap-2 ${
              toast.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-400' 
                : 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900/30 dark:border-red-800 dark:text-red-400'
            }`}
          >
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-violet-600" /> Reports & Analytics
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Overview of findings, scans, and compliance performance.
          </p>
        </div>
        <div className="flex items-center gap-3">
           <button onClick={fetchReport} disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-60 shadow-sm">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button onClick={handleExport} disabled={exporting || loading}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm shadow-violet-600/20 disabled:opacity-60">
            {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Export CSV
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && !loading ? (
        <div className="p-8 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900 rounded-2xl flex flex-col items-center justify-center text-red-700 dark:text-red-400 text-center">
          <AlertCircle className="w-10 h-10 mb-3 opacity-80" />
          <h3 className="text-lg font-semibold mb-1">Failed to load reports</h3>
          <p className="text-sm opacity-80 max-w-md mb-4">{error}</p>
          <button onClick={fetchReport} className="px-5 py-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-xl text-sm font-medium transition-colors">
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Findings by Risk */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-6">Findings by Risk</h3>
            {loading ? (
              <div className="h-64 bg-slate-50 dark:bg-slate-800/50 rounded-xl animate-pulse" />
            ) : !data?.findingsByRisk?.length ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-sm bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                <AlertCircle className="w-8 h-8 mb-2 opacity-20" />
                No PII findings yet. Run a database scan first.
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.findingsByRisk} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5}>
                      {data.findingsByRisk.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Scan Activity */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-violet-500" /> Scan Activity
            </h3>
            {loading ? (
              <div className="h-64 bg-slate-50 dark:bg-slate-800/50 rounded-xl animate-pulse" />
            ) : !data?.scanActivity?.length ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-sm bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                <Activity className="w-8 h-8 mb-2 opacity-20" />
                No scan activity in the last 7 days.
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.scanActivity} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="scans" name="Scans" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="findings" name="Findings" stroke="#f97316" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Compliance Scores */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Compliance Scores
            </h3>
            {loading ? (
              <div className="h-64 bg-slate-50 dark:bg-slate-800/50 rounded-xl animate-pulse" />
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.complianceScores?.length ? data.complianceScores : getComplianceFallback()} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="framework" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }}
                      formatter={(val) => {
                        const num = typeof val === 'number' ? val : 0;
                        return [`${num}%`, 'Score'];
                      }}
                    />
                    <Bar dataKey="score" name="Score" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Top Connections */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-500" /> Top Connections
            </h3>
            {loading ? (
              <div className="h-64 bg-slate-50 dark:bg-slate-800/50 rounded-xl animate-pulse" />
            ) : !data?.topConnections?.length ? (
              <div className="h-64 flex flex-col items-center justify-center text-slate-500 text-sm bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                <Database className="w-8 h-8 mb-2 opacity-20" />
                No connection scan data yet.
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.topConnections} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} width={90} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="scans" name="Scans" fill="#3b82f6" radius={[0, 4, 4, 0]} maxBarSize={20} />
                    <Bar dataKey="findings" name="Findings" fill="#f59e0b" radius={[0, 4, 4, 0]} maxBarSize={20} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
