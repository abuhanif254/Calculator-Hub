"use client";
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck, Plus, Trash2, RefreshCw, X, AlertCircle,
  CheckCircle2, XCircle, Eye, Database, TableProperties,
  Fingerprint, Wand2, ToggleLeft, ToggleRight, Filter,
} from 'lucide-react';

// â”€â”€ Types â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
interface MaskingRule {
  id: string;
  connection_id: string | null;
  connection_name: string | null;
  table_name: string;
  column_name: string;
  detector_id: string;
  detector_name: string;
  risk_level: string;
  strategy: string;
  is_active: boolean;
  created_at: string;
}

interface Connection { id: string; name: string; type: string; }

// â”€â”€ Strategy options per detector â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const STRATEGIES_BY_DETECTOR: Record<string, string[]> = {
  email:      ['Hash (SHA-256)', 'Domain anonymize', 'Full redact', 'Nullify'],
  ssn:        ['Full redact', 'Partial mask (***-**-1234)', 'Nullify'],
  creditcard: ['PAN masking (last 4)', 'Full redact', 'Nullify'],
  phone:      ['Partial mask (***-***-5678)', 'Hash (SHA-256)', 'Full redact', 'Nullify'],
  ip:         ['Generalize to /24 subnet', 'Hash (SHA-256)', 'Full redact', 'Nullify'],
  dob:        ['Year only', 'Age range (30-40)', 'Full redact', 'Nullify'],
  jwt:        ['Full redact', 'Nullify'],
  apikey:     ['Full redact', 'Nullify'],
  iban:       ['Partial mask (XX** **** ****)', 'Full redact', 'Nullify'],
  zip:        ['3-digit generalization', 'Full redact', 'Nullify'],
  _default:   ['Hash (SHA-256)', 'Full redact', 'Partial mask', 'Nullify'],
};

const DETECTOR_ICONS: Record<string, string> = {
  email: 'ðŸ“§', ssn: 'ðŸ”', creditcard: 'ðŸ’³', phone: 'ðŸ“±',
  ip: 'ðŸŒ', dob: 'ðŸ“…', jwt: 'ðŸ”‘', apikey: 'ðŸ—ï¸', iban: 'ðŸ¦', zip: 'ðŸ“®',
};

// â”€â”€ Browser-side mask preview â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function previewMask(value: string, strategy: string): string {
  if (!value) return '';
  if (strategy === 'Full redact' || strategy === 'Nullify') return strategy === 'Nullify' ? 'NULL' : '***REDACTED***';
  if (strategy.includes('Hash')) {
    let h = 5381;
    for (let i = 0; i < value.length; i++) h = ((h << 5) + h) ^ value.charCodeAt(i);
    return 'sha256:' + (h >>> 0).toString(16).padStart(8, '0') + '...';
  }
  if (strategy.includes('PAN') || strategy.includes('last 4'))
    return '**** **** **** ' + value.replace(/\D/g, '').slice(-4);
  if (strategy.includes('***-**-')) return '***-**-' + value.replace(/\D/g, '').slice(-4);
  if (strategy.includes('***-***-')) return '***-***-' + value.replace(/\D/g, '').slice(-4);
  if (strategy.includes('/24')) return value.replace(/\d+$/, '0/24');
  if (strategy.includes('Year only')) return value.match(/(19|20)\d{2}/)?.[0] ?? value;
  if (strategy.includes('Age range')) return '30â€“40';
  if (strategy.includes('3-digit')) return value.slice(0, 3) + '00';
  if (strategy.includes('Domain anonymize')) return value.replace(/@.*/, '@[redacted].com');
  if (strategy.includes('Partial mask')) return value.slice(0, 3) + '***' + value.slice(-1);
  if (strategy.includes('XX**')) return 'XX** **** **** ' + value.slice(-4);
  return '[MASKED]';
}

const RISK_COLORS: Record<string, string> = {
  Critical: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  High:     'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  Medium:   'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  Low:      'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
};

// â”€â”€ Default form state â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DEFAULT_FORM = {
  connection_id: '', connection_name: '',
  table_name: '', column_name: '',
  detector_id: 'email', detector_name: 'Email Address',
  risk_level: 'High', strategy: 'Hash (SHA-256)',
};

// â”€â”€ Inner component (uses useSearchParams) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MaskingRulesInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [rules, setRules] = useState<MaskingRule[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterConn, setFilterConn] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ ...DEFAULT_FORM });
  const [previewSample, setPreviewSample] = useState('');
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Pre-fill form from URL params (coming from scanner findings "Save as Rule")
  useEffect(() => {
    if (!searchParams) return;
    const conn    = searchParams.get('conn') ?? '';
    const connName= searchParams.get('connName') ?? '';
    const table   = searchParams.get('table') ?? '';
    const col     = searchParams.get('col') ?? '';
    const det     = searchParams.get('detector') ?? 'email';
    const detName = searchParams.get('detectorName') ?? 'Email Address';
    const risk    = searchParams.get('risk') ?? 'High';
    if (table && col) {
      const strats = STRATEGIES_BY_DETECTOR[det] ?? STRATEGIES_BY_DETECTOR._default;
      setForm({
        connection_id: conn, connection_name: connName,
        table_name: table, column_name: col,
        detector_id: det, detector_name: detName,
        risk_level: risk, strategy: strats[0],
      });
      setShowModal(true);
      // Clear params from URL without full navigation
      router.replace(window.location.pathname, { scroll: false });
    }
  }, [searchParams, router]);

  // Fetch rules + connections
  const fetchRules = useCallback(async () => {
    setLoading(true);
    try {
      const [rulesRes, connRes] = await Promise.all([
        privacyFetch('/api/privacy/masking-rules'),
        privacyFetch('/api/privacy/connections'),
      ]);
      const [rulesData, connData] = await Promise.all([rulesRes.json(), connRes.json()]);
      setRules(rulesData.rules ?? []);
      setConnections(connData.connections ?? []);
    } catch {
      showToast('Failed to load rules', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRules(); }, [fetchRules]);

  // Save rule
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);
    try {
      const res = await privacyFetch('/api/privacy/masking-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setFormError(data.error); return; }
      setRules(prev => [data.rule, ...prev]);
      setShowModal(false);
      setForm({ ...DEFAULT_FORM });
      showToast('Masking rule saved', 'success');
    } catch { setFormError('Network error. Please try again.'); }
    finally { setSaving(false); }
  };

  // Toggle active
  const handleToggle = async (rule: MaskingRule) => {
    setTogglingId(rule.id);
    try {
      const res = await privacyFetch(`/api/privacy/masking-rules/${rule.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !rule.is_active }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setRules(prev => prev.map(r => r.id === rule.id ? { ...r, is_active: data.rule.is_active } : r));
    } catch { showToast('Failed to update rule', 'error'); }
    finally { setTogglingId(null); }
  };

  // Update strategy inline
  const handleStrategyChange = async (rule: MaskingRule, strategy: string) => {
    try {
      await privacyFetch(`/api/privacy/masking-rules/${rule.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ strategy }),
      });
      setRules(prev => prev.map(r => r.id === rule.id ? { ...r, strategy } : r));
      showToast('Strategy updated', 'success');
    } catch { showToast('Failed to update strategy', 'error'); }
  };

  // Delete rule
  const handleDelete = async (id: string) => {
    if (!confirm('Delete this masking rule?')) return;
    setDeletingId(id);
    try {
      const res = await privacyFetch(`/api/privacy/masking-rules/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setRules(prev => prev.filter(r => r.id !== id));
      showToast('Rule deleted', 'success');
    } catch { showToast('Failed to delete rule', 'error'); }
    finally { setDeletingId(null); }
  };

  const filteredRules = filterConn
    ? rules.filter(r => r.connection_id === filterConn)
    : rules;

  const activeCount = rules.filter(r => r.is_active).length;
  const criticalCount = rules.filter(r => r.risk_level === 'Critical').length;

  const availableStrategies = STRATEGIES_BY_DETECTOR[form.detector_id] ?? STRATEGIES_BY_DETECTOR._default;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-sm font-medium text-white ${
              toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
            }`}>
            {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-violet-600" /> Masking Rules
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Define how each PII column is anonymized. Rules are saved and reusable across scans.
          </p>
        </div>
        <button onClick={() => { setForm({ ...DEFAULT_FORM }); setFormError(''); setShowModal(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-colors shadow-sm shadow-violet-600/20 text-sm shrink-0">
          <Plus className="w-4 h-4" /> Create Rule
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Rules', value: rules.length, icon: <ShieldCheck className="w-5 h-5 text-violet-500" /> },
          { label: 'Active', value: activeCount, icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> },
          { label: 'Inactive', value: rules.length - activeCount, icon: <XCircle className="w-5 h-5 text-slate-400" /> },
          { label: 'Critical PII', value: criticalCount, icon: <AlertCircle className="w-5 h-5 text-red-500" /> },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex items-center gap-3">
            {s.icon}
            <div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter bar */}
      {connections.length > 1 && (
        <div className="flex items-center gap-3">
          <Filter className="w-4 h-4 text-slate-400 shrink-0" />
          <select value={filterConn} onChange={e => setFilterConn(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500">
            <option value="">All connections</option>
            {connections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      )}

      {/* Rules list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => <div key={i} className="h-20 rounded-2xl bg-slate-100 dark:bg-slate-800/50 animate-pulse" />)}
        </div>
      ) : filteredRules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No masking rules yet</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xs">
            Run a PII scan to discover sensitive columns, then save them as masking rules here.
          </p>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium text-sm transition-colors">
            <Plus className="w-4 h-4" /> Create first rule
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRules.map(rule => (
            <motion.div key={rule.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className={`bg-white dark:bg-slate-900 border rounded-2xl shadow-sm transition-all ${
                rule.is_active
                  ? 'border-slate-200 dark:border-slate-800'
                  : 'border-slate-100 dark:border-slate-800/50 opacity-60'
              }`}>
              <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">

                {/* Left: detector icon + info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <span className="text-2xl shrink-0">{DETECTOR_ICONS[rule.detector_id] ?? 'ðŸ›¡ï¸'}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${RISK_COLORS[rule.risk_level] ?? ''}`}>
                        {rule.risk_level}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-white text-sm">{rule.detector_name}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
                      {rule.connection_name && (
                        <span className="flex items-center gap-1">
                          <Database className="w-3 h-3" />{rule.connection_name}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <TableProperties className="w-3 h-3" />
                        <code className="font-mono">{rule.table_name}.<span className="text-violet-600 dark:text-violet-400">{rule.column_name}</span></code>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center: strategy selector */}
                <div className="flex items-center gap-2 shrink-0">
                  <Wand2 className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                  <select value={rule.strategy}
                    onChange={e => handleStrategyChange(rule, e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-violet-500">
                    {(STRATEGIES_BY_DETECTOR[rule.detector_id] ?? STRATEGIES_BY_DETECTOR._default).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Right: toggle + delete */}
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => handleToggle(rule)} disabled={togglingId === rule.id}
                    title={rule.is_active ? 'Deactivate rule' : 'Activate rule'}
                    className="text-slate-400 hover:text-violet-600 transition-colors disabled:opacity-50">
                    {togglingId === rule.id
                      ? <RefreshCw className="w-5 h-5 animate-spin" />
                      : rule.is_active
                        ? <ToggleRight className="w-6 h-6 text-violet-600" />
                        : <ToggleLeft className="w-6 h-6" />
                    }
                  </button>
                  <button onClick={() => handleDelete(rule.id)} disabled={deletingId === rule.id}
                    className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete rule">
                    {deletingId === rule.id
                      ? <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      : <Trash2 className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Rule Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">Create Masking Rule</h2>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formError && (
                <div className="flex items-start gap-2 p-3 mb-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl text-sm text-red-700 dark:text-red-400">
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />{formError}
                </div>
              )}

              <form onSubmit={handleSave} className="space-y-4">
                {/* Connection (optional) */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Connection <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <select value={form.connection_id}
                    onChange={e => {
                      const c = connections.find(x => x.id === e.target.value);
                      setForm(f => ({ ...f, connection_id: e.target.value, connection_name: c?.name ?? '' }));
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500">
                    <option value="">No connection (general rule)</option>
                    {connections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                {/* Table + Column */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Table Name</label>
                    <input required value={form.table_name} onChange={e => setForm(f => ({ ...f, table_name: e.target.value }))}
                      placeholder="users" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Column Name</label>
                    <input required value={form.column_name} onChange={e => setForm(f => ({ ...f, column_name: e.target.value }))}
                      placeholder="email" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm font-mono outline-none focus:ring-2 focus:ring-violet-500" />
                  </div>
                </div>

                {/* Detector */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">PII Type Detected</label>
                  <select value={form.detector_id}
                    onChange={e => {
                      const labels: Record<string, string> = {
                        email: 'Email Address', ssn: 'Social Security Number', creditcard: 'Credit Card Number',
                        phone: 'Phone Number', ip: 'IP Address (IPv4)', dob: 'Date of Birth',
                        jwt: 'JWT Token', apikey: 'API Key / Secret', iban: 'IBAN', zip: 'ZIP / Postal Code',
                      };
                      const risks: Record<string, string> = {
                        email: 'High', ssn: 'Critical', creditcard: 'Critical', phone: 'Medium',
                        ip: 'Medium', dob: 'High', jwt: 'Critical', apikey: 'Critical', iban: 'High', zip: 'Low',
                      };
                      const strats = STRATEGIES_BY_DETECTOR[e.target.value] ?? STRATEGIES_BY_DETECTOR._default;
                      setForm(f => ({
                        ...f, detector_id: e.target.value,
                        detector_name: labels[e.target.value] ?? e.target.value,
                        risk_level: risks[e.target.value] ?? 'Medium',
                        strategy: strats[0],
                      }));
                    }}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500">
                    {[
                      ['email', 'ðŸ“§ Email Address'],
                      ['ssn', 'ðŸ” Social Security Number'],
                      ['creditcard', 'ðŸ’³ Credit Card Number'],
                      ['phone', 'ðŸ“± Phone Number'],
                      ['ip', 'ðŸŒ IP Address (IPv4)'],
                      ['dob', 'ðŸ“… Date of Birth'],
                      ['jwt', 'ðŸ”‘ JWT Token'],
                      ['apikey', 'ðŸ—ï¸ API Key / Secret'],
                      ['iban', 'ðŸ¦ IBAN'],
                      ['zip', 'ðŸ“® ZIP / Postal Code'],
                    ].map(([id, label]) => <option key={id} value={id}>{label}</option>)}
                  </select>
                </div>

                {/* Strategy */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Masking Strategy</label>
                  <select value={form.strategy} onChange={e => setForm(f => ({ ...f, strategy: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500">
                    {availableStrategies.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Live preview */}
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                    <Eye className="w-3 h-3 inline mr-1" />Live Preview
                  </p>
                  <div className="flex items-center gap-2">
                    <input value={previewSample} onChange={e => setPreviewSample(e.target.value)}
                      placeholder="Enter sample value to preview..."
                      className="flex-1 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500" />
                    <span className="text-slate-400">â†’</span>
                    <div className="flex-1 px-3 py-2 rounded-lg bg-violet-50 dark:bg-violet-900/20 border border-violet-200 dark:border-violet-800 font-mono text-xs text-violet-700 dark:text-violet-300 min-h-[38px] flex items-center">
                      {previewSample ? previewMask(previewSample, form.strategy) : <span className="text-slate-400 italic">masked output</span>}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-sm font-medium">
                    Cancel
                  </button>
                  <button type="submit" disabled={saving}
                    className="flex items-center gap-2 px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium text-sm transition-colors shadow-sm disabled:opacity-60">
                    {saving && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
                    {saving ? 'Savingâ€¦' : 'Save Rule'}
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

// Wrap in Suspense for useSearchParams
export default function MaskingRulesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
      </div>
    }>
      <MaskingRulesInner />
    </Suspense>
  );
}
