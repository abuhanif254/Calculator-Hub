'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';
import {
  ScrollText, Search, Download, RefreshCw, ChevronLeft, ChevronRight,
  Database, ScanSearch, ShieldCheck, LogIn, Settings, AlertCircle,
  Info, AlertTriangle, XCircle, CheckCircle2, Filter, X,
} from 'lucide-react';

// â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface AuditLog {
  id: string;
  action: string;
  category: 'connection' | 'scan' | 'rule' | 'auth' | 'system';
  severity: 'info' | 'warning' | 'error';
  resource: string | null;
  details: Record<string, unknown> | null;
  created_at: string;
}

interface AuditStats { total: number; today: number; errors: number; warnings: number; }

// â”€â”€ Helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const CATEGORY_CONFIG = {
  connection: { label: 'Connection', icon: <Database className="w-3.5 h-3.5" />, bg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' },
  scan:       { label: 'Scan',       icon: <ScanSearch className="w-3.5 h-3.5" />, bg: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400' },
  rule:       { label: 'Rule',       icon: <ShieldCheck className="w-3.5 h-3.5" />, bg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' },
  auth:       { label: 'Auth',       icon: <LogIn className="w-3.5 h-3.5" />, bg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' },
  system:     { label: 'System',     icon: <Settings className="w-3.5 h-3.5" />, bg: 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400' },
};

const SEVERITY_CONFIG = {
  info:    { icon: <Info    className="w-4 h-4 text-slate-400" />,          dot: 'bg-slate-400' },
  warning: { icon: <AlertTriangle className="w-4 h-4 text-amber-500" />,   dot: 'bg-amber-500' },
  error:   { icon: <XCircle className="w-4 h-4 text-red-500" />,           dot: 'bg-red-500'   },
};

const ACTION_LABELS: Record<string, string> = {
  CONNECTION_CREATED:       'Connection Created',
  CONNECTION_DELETED:       'Connection Deleted',
  CONNECTION_TEST_SUCCESS:  'Connection Test Passed',
  CONNECTION_TEST_FAILED:   'Connection Test Failed',
  SCAN_STARTED:             'Scan Started',
  SCAN_COMPLETED:           'Scan Completed',
  SCAN_FAILED:              'Scan Failed',
  RULE_CREATED:             'Masking Rule Created',
  RULE_UPDATED:             'Masking Rule Updated',
  RULE_DELETED:             'Masking Rule Deleted',
};

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return new Date(iso).toLocaleDateString('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function fmtTimestamp(iso: string) {
  return new Date(iso).toLocaleString('en', {
    month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });
}

// â”€â”€ Export CSV â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function exportCsv(logs: AuditLog[]) {
  const header = 'Timestamp,Action,Category,Severity,Resource,Details\n';
  const rows   = logs.map(l =>
    [fmtTimestamp(l.created_at), l.action, l.category, l.severity,
     l.resource ?? '', JSON.stringify(l.details ?? {}).replace(/,/g, ';')
    ].map(v => `"${v}"`).join(',')
  ).join('\n');
  const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url; a.download = `audit-logs-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click(); URL.revokeObjectURL(url);
}

// â”€â”€ Expandable log detail â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function LogRow({ log }: { log: AuditLog }) {
  const [expanded, setExpanded] = useState(false);
  const cat = CATEGORY_CONFIG[log.category] ?? CATEGORY_CONFIG.system;
  const sev = SEVERITY_CONFIG[log.severity] ?? SEVERITY_CONFIG.info;

  return (
    <motion.div layout className={`border-b border-slate-100 dark:border-slate-800 last:border-0 ${
      log.severity === 'error'   ? 'bg-red-50/40 dark:bg-red-950/10' :
      log.severity === 'warning' ? 'bg-amber-50/40 dark:bg-amber-950/10' : ''
    }`}>
      <button onClick={() => setExpanded(v => !v)}
        className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors text-left">

        {/* Severity icon */}
        <div className="shrink-0">{sev.icon}</div>

        {/* Category badge */}
        <span className={`hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-[10px] font-bold shrink-0 ${cat.bg}`}>
          {cat.icon} {cat.label}
        </span>

        {/* Action */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {ACTION_LABELS[log.action] ?? log.action}
          </p>
          {log.resource && (
            <p className="text-xs text-slate-500 font-mono truncate">{log.resource}</p>
          )}
        </div>

        {/* Timestamp */}
        <p className="text-xs text-slate-400 shrink-0 hidden md:block whitespace-nowrap">{fmtTimestamp(log.created_at)}</p>
        <p className="text-xs text-slate-400 shrink-0 md:hidden whitespace-nowrap">{timeAgo(log.created_at)}</p>
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && log.details && Object.keys(log.details).length > 0 && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <div className="px-5 pb-4 ml-7">
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 text-xs font-mono">
                {Object.entries(log.details).map(([k, v]) => (
                  <div key={k} className="flex gap-3 py-0.5">
                    <span className="text-violet-600 dark:text-violet-400 shrink-0 w-24">{k}</span>
                    <span className="text-slate-700 dark:text-slate-300 break-all">
                      {typeof v === 'object' ? JSON.stringify(v) : String(v ?? 'â€”')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function AuditPage() {
  const [logs, setLogs]         = useState<AuditLog[]>([]);
  const [stats, setStats]       = useState<AuditStats | null>(null);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [page, setPage]         = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal]       = useState(0);

  const [search, setSearch]           = useState('');
  const [debouncedSearch, setDebounced] = useState('');
  const [filterCategory, setFilterCat] = useState('');
  const [filterSeverity, setFilterSev] = useState('');
  const [refreshing, setRefreshing]   = useState(false);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebounced(search), 400);
    return () => clearTimeout(t);
  }, [search]);

  const fetchLogs = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError('');
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (filterCategory) params.set('category', filterCategory);
      if (filterSeverity) params.set('severity', filterSeverity);
      if (debouncedSearch) params.set('search', debouncedSearch);

      const res = await privacyFetch(`/api/privacy/audit-logs?${params}`);
      if (!res.ok) throw new Error('Failed to load audit logs');
      const data = await res.json();
      setLogs(data.logs ?? []);
      setStats(data.stats);
      setTotalPages(data.totalPages ?? 1);
      setTotal(data.total ?? 0);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page, filterCategory, filterSeverity, debouncedSearch]);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  // Reset to page 1 when filters change
  useEffect(() => { setPage(1); }, [filterCategory, filterSeverity, debouncedSearch]);

  const hasFilters = filterCategory || filterSeverity || debouncedSearch;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <ScrollText className="w-7 h-7 text-violet-600" /> Audit Logs
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Immutable trail of all platform activity â€” connections, scans, rules.
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => fetchLogs(true)} disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} /> Refresh
          </button>
          <button onClick={() => exportCsv(logs)} disabled={logs.length === 0}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium text-sm transition-colors shadow-sm shadow-violet-600/20 disabled:opacity-60">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Events', value: stats?.total ?? 0, icon: <ScrollText className="w-5 h-5 text-violet-500" />, bg: 'bg-violet-50 dark:bg-violet-900/20' },
          { label: 'Today',        value: stats?.today ?? 0, icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Warnings',     value: stats?.warnings ?? 0, icon: <AlertTriangle className="w-5 h-5 text-amber-500" />, bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Errors',       value: stats?.errors ?? 0, icon: <XCircle className="w-5 h-5 text-red-500" />, bg: 'bg-red-50 dark:bg-red-900/20' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex items-center gap-3">
            <div className={`p-2 rounded-xl ${s.bg} shrink-0`}>{s.icon}</div>
            <div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {loading ? <span className="inline-block w-8 h-5 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" /> : s.value}
              </p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap gap-3 items-center">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />

          {/* Search */}
          <div className="relative flex-1 min-w-[160px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search action or resourceâ€¦"
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500" />
          </div>

          {/* Category */}
          <select value={filterCategory} onChange={e => setFilterCat(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500">
            <option value="">All categories</option>
            <option value="connection">Connection</option>
            <option value="scan">Scan</option>
            <option value="rule">Rule</option>
            <option value="auth">Auth</option>
            <option value="system">System</option>
          </select>

          {/* Severity */}
          <select value={filterSeverity} onChange={e => setFilterSev(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500">
            <option value="">All severities</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>

          {/* Clear filters */}
          {hasFilters && (
            <button onClick={() => { setSearch(''); setFilterCat(''); setFilterSev(''); }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              <X className="w-3.5 h-3.5" /> Clear
            </button>
          )}
        </div>

        {/* Log list */}
        {error && (
          <div className="flex items-center gap-2 p-5 text-sm text-red-700 dark:text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />{error}
          </div>
        )}

        {loading ? (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="px-5 py-3.5 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 w-40 rounded bg-slate-200 dark:bg-slate-700 animate-pulse" />
                  <div className="h-3 w-24 rounded bg-slate-100 dark:bg-slate-800 animate-pulse" />
                </div>
                <div className="h-3 w-20 rounded bg-slate-100 dark:bg-slate-800 animate-pulse shrink-0" />
              </div>
            ))}
          </div>
        ) : logs.length === 0 ? (
          <div className="py-20 text-center">
            <ScrollText className="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
            <p className="text-slate-500 text-sm font-medium">
              {hasFilters ? 'No logs match your filters.' : 'No audit events yet.'}
            </p>
            <p className="text-slate-400 text-xs mt-1">
              {!hasFilters && 'Audit events are recorded automatically when you add connections, run scans, or create masking rules.'}
            </p>
          </div>
        ) : (
          <div>
            {logs.map(log => <LogRow key={log.id} log={log} />)}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm">
            <p className="text-slate-500 text-xs">
              Showing {Math.min((page - 1) * 50 + 1, total)}â€“{Math.min(page * 50, total)} of {total.toLocaleString()} events
            </p>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <ChevronLeft className="w-4 h-4" /> Prev
              </button>
              <span className="text-xs text-slate-400 px-1">{page} / {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 disabled:opacity-40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
