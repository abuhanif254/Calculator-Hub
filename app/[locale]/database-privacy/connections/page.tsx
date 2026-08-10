'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';
import {
  Database, Plus, RefreshCw, Server, Activity, Link2, X,
  Trash2, CheckCircle2, XCircle, Clock, Wifi, WifiOff,
  Eye, EyeOff, ShieldCheck, AlertTriangle,
} from 'lucide-react';

interface DBConnection {
  id: string;
  name: string;
  type: 'postgresql' | 'mysql';
  host: string;
  port: number;
  dbname: string;
  username: string;
  use_ssl: boolean;
  status: 'connected' | 'failed' | 'unknown';
  last_tested_at: string | null;
  tables_count: number | null;
  created_at: string;
}

interface FormState {
  name: string;
  type: 'postgresql' | 'mysql';
  host: string;
  port: string;
  dbname: string;
  username: string;
  password: string;
  use_ssl: boolean;
}

const DEFAULT_FORM: FormState = {
  name: '', type: 'postgresql', host: '', port: '5432',
  dbname: '', username: '', password: '', use_ssl: true,
};

const DB_DEFAULTS: Record<string, string> = { postgresql: '5432', mysql: '3306' };

export default function ConnectionsPage() {
  const [connections, setConnections] = useState<DBConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(DEFAULT_FORM);
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [formError, setFormError] = useState('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // â”€â”€ Fetch connections â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const fetchConnections = useCallback(async () => {
    try {
      const res = await privacyFetch('/api/privacy/connections');
      if (!res.ok) throw new Error('Failed to load connections');
      const { connections: data } = await res.json();
      setConnections(data ?? []);
    } catch {
      showToast('Could not load connections', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchConnections(); }, [fetchConnections]);

  // â”€â”€ Create connection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);
    try {
      const res = await privacyFetch('/api/privacy/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setFormError(data.error ?? 'Failed to save'); return; }
      setConnections(prev => [data.connection, ...prev]);
      setIsModalOpen(false);
      setForm(DEFAULT_FORM);
      showToast('Connection saved successfully', 'success');
    } catch {
      setFormError('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // â”€â”€ Test connection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleTest = async (id: string) => {
    setTestingId(id);
    try {
      const res = await privacyFetch(`/api/privacy/connections/${id}/test`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showToast(`Connected! ${data.tablesCount} tables Â· ${data.latencyMs}ms`, 'success');
        setConnections(prev => prev.map(c =>
          c.id === id ? { ...c, status: 'connected', tables_count: data.tablesCount, last_tested_at: new Date().toISOString() } : c
        ));
      } else {
        showToast(`Failed: ${data.error ?? 'Connection refused'}`, 'error');
        setConnections(prev => prev.map(c =>
          c.id === id ? { ...c, status: 'failed', last_tested_at: new Date().toISOString() } : c
        ));
      }
    } catch {
      showToast('Test request failed', 'error');
    } finally {
      setTestingId(null);
    }
  };

  // â”€â”€ Delete connection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this connection? This action cannot be undone.')) return;
    setDeletingId(id);
    try {
      const res = await privacyFetch(`/api/privacy/connections/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setConnections(prev => prev.filter(c => c.id !== id));
      showToast('Connection deleted', 'success');
    } catch {
      showToast('Failed to delete connection', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // â”€â”€ Status helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const StatusBadge = ({ status }: { status: DBConnection['status'] }) => {
    const styles = {
      connected: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
      failed: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
      unknown: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
    };
    const icons = {
      connected: <Wifi className="w-3 h-3" />,
      failed: <WifiOff className="w-3 h-3" />,
      unknown: <Clock className="w-3 h-3" />,
    };
    return (
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {icons[status]}
        {status === 'unknown' ? 'Not tested' : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatTime = (iso: string | null) => {
    if (!iso) return 'Never';
    const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-medium text-white ${
              toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <Link2 className="w-7 h-7 text-violet-600" />
            Database Connections
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Connect your PostgreSQL or MySQL databases. Credentials are encrypted with AES-256.
          </p>
        </div>
        <button
          onClick={() => { setForm(DEFAULT_FORM); setFormError(''); setIsModalOpen(true); }}
          className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors font-medium shadow-sm shadow-violet-600/20 text-sm shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Connection
        </button>
      </div>

      {/* Encryption notice */}
      <div className="flex items-start gap-3 p-4 bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-800/40 rounded-xl text-sm text-violet-700 dark:text-violet-300">
        <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
        <div>
          <strong>End-to-end encrypted.</strong> Passwords are encrypted with AES-256-GCM before storage.
          The raw password is never stored or logged. Only your server can decrypt it at test time.
        </div>
      </div>

      {/* Connection cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-56 rounded-2xl bg-slate-100 dark:bg-slate-800/50 animate-pulse" />
          ))}
        </div>
      ) : connections.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
            <Database className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No connections yet</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
            Add your first database connection to start scanning for PII.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors font-medium text-sm"
          >
            <Plus className="w-4 h-4" /> Add your first connection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {connections.map((conn) => (
            <motion.div
              key={conn.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Card header */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-violet-50 dark:bg-violet-900/20 rounded-xl">
                    <Database className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{conn.name}</h3>
                    <p className="text-xs text-slate-500 capitalize">{conn.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <StatusBadge status={conn.status} />
                  <button
                    onClick={() => handleDelete(conn.id)}
                    disabled={deletingId === conn.id}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ml-1"
                    title="Delete connection"
                  >
                    {deletingId === conn.id
                      ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      : <Trash2 className="w-3.5 h-3.5" />
                    }
                  </button>
                </div>
              </div>

              {/* Connection details */}
              <div className="space-y-2.5 mb-5 flex-grow text-sm">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-2"><Server className="w-3.5 h-3.5" />Host</span>
                  <span className="font-mono text-xs text-slate-800 dark:text-slate-200">{conn.host}:{conn.port}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-2"><Database className="w-3.5 h-3.5" />Database</span>
                  <span className="text-slate-800 dark:text-slate-200">{conn.dbname}</span>
                </div>
                {conn.tables_count !== null && (
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-2"><Activity className="w-3.5 h-3.5" />Tables</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">{conn.tables_count}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" />Last tested</span>
                  <span className="text-slate-800 dark:text-slate-200">{formatTime(conn.last_tested_at)}</span>
                </div>
              </div>

              {/* Test button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => handleTest(conn.id)}
                  disabled={testingId === conn.id}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium transition-colors disabled:opacity-50 border border-slate-200 dark:border-slate-700"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${testingId === conn.id ? 'animate-spin' : ''}`} />
                  {testingId === conn.id ? 'Testingâ€¦' : 'Test Connection'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Connection Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Add Database Connection</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formError && (
                <div className="flex items-start gap-2 p-3 mb-5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl text-sm text-red-700 dark:text-red-400">
                  <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                  {formError}
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4">
                {/* Connection Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Connection Name</label>
                  <input
                    type="text" required value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g., prod-postgres"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                {/* DB Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Database Type</label>
                  <select
                    value={form.type}
                    onChange={e => {
                      const t = e.target.value as 'postgresql' | 'mysql';
                      setForm(f => ({ ...f, type: t, port: DB_DEFAULTS[t] }));
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500"
                  >
                    <option value="postgresql">PostgreSQL</option>
                    <option value="mysql">MySQL</option>
                  </select>
                </div>

                {/* Host + Port */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Host</label>
                    <input
                      type="text" required value={form.host}
                      onChange={e => setForm(f => ({ ...f, host: e.target.value }))}
                      placeholder="db.example.com"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Port</label>
                    <input
                      type="number" required value={form.port}
                      onChange={e => setForm(f => ({ ...f, port: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Database name */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Database Name</label>
                  <input
                    type="text" required value={form.dbname}
                    onChange={e => setForm(f => ({ ...f, dbname: e.target.value }))}
                    placeholder="my_database"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Username</label>
                  <input
                    type="text" required value={form.username}
                    onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                    placeholder="db_user"
                    autoComplete="off"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Password <span className="text-slate-400 font-normal">(encrypted before storage)</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'} required value={form.password}
                      onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                      placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                      autoComplete="new-password"
                      className="w-full pr-10 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                    />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* SSL toggle */}
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setForm(f => ({ ...f, use_ssl: !f.use_ssl }))}
                    className={`relative w-10 h-5 rounded-full transition-colors ${form.use_ssl ? 'bg-violet-600' : 'bg-slate-300 dark:bg-slate-600'}`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.use_ssl ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300 select-none">Require SSL/TLS</span>
                </label>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <button type="button" onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2 rounded-xl transition-colors font-medium text-sm shadow-sm flex items-center gap-2 disabled:opacity-60">
                    {saving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    {saving ? 'Savingâ€¦' : 'Save Connection'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
