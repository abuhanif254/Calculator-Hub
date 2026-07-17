'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Plus, Copy, Eye, EyeOff, Trash2, Key, Database, Link, X, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../../../components/platform/ui/PlatformUI';
import { useToast } from '../../../components/platform/ui/Toast';

const typeColors: Record<string, string> = { 'DB Password': 'text-blue-400 bg-blue-400/10 border-blue-400/20', 'API Key': 'text-violet-400 bg-violet-400/10 border-violet-400/20', 'Connection String': 'text-amber-400 bg-amber-400/10 border-amber-400/20', 'Certificate': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' };
const typeIcons: Record<string, React.ElementType> = { 'DB Password': Database, 'API Key': Key, 'Connection String': Link, 'Certificate': ShieldCheck };
const initSecrets = [
  { id: 's1', name: 'prod-postgres-password', type: 'DB Password',       desc: 'Main production PostgreSQL instance', tags: ['prod', 'postgres'], created: 'Jan 10', accessed: '2h ago' },
  { id: 's2', name: 'analytics-db-conn-str',  type: 'Connection String', desc: 'Snowflake connection for analytics', tags: ['analytics'],        created: 'Jan 12', accessed: '6h ago' },
  { id: 's3', name: 'stripe-api-key',         type: 'API Key',           desc: 'Payment processing integration', tags: ['billing', 'prod'],      created: 'Jan 14', accessed: '1d ago' },
  { id: 's4', name: 'qa-mysql-password',      type: 'DB Password',       desc: 'QA environment MySQL cluster', tags: ['qa', 'mysql'],            created: 'Jan 15', accessed: '3d ago' },
  { id: 's5', name: 'ssl-prod-cert',          type: 'Certificate',       desc: 'Production SSL/TLS certificate', tags: ['ssl', 'prod'],          created: 'Jan 18', accessed: '7d ago' },
  { id: 's6', name: 'datadog-api-key',        type: 'API Key',           desc: 'APM and monitoring integration', tags: ['monitoring'],           created: 'Jan 20', accessed: '1h ago' },
];

export default function SecretsPage() {
  const toast = useToast();
  const [secrets, setSecrets] = useState(initSecrets);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [adding, setAdding] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', type: 'DB Password', value: '', desc: '' });

  const add = () => {
    if (!form.name || !form.value) { toast.warning('Name and value are required'); return; }
    setSecrets(p => [...p, { id: `s${Date.now()}`, name: form.name, type: form.type, desc: form.desc, tags: [], created: 'Just now', accessed: 'Never' }]);
    toast.success('Secret Stored', `"${form.name}" has been encrypted and saved.`);
    setAdding(false); setForm({ name: '', type: 'DB Password', value: '', desc: '' });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Secrets Manager" subtitle="Securely store database credentials and sensitive configuration values">
        <button onClick={() => setAdding(p => !p)} className="bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Add Secret
        </button>
      </PageHeader>

      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl px-5 py-3 text-sm text-blue-300">
        <Lock className="w-4 h-4 shrink-0" />
        All secrets are encrypted at rest using <strong>AES-256-GCM</strong>. Values are never logged or transmitted in plain text.
      </motion.div>

      {adding && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0F1A] border border-violet-500/30 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-white">Store New Secret</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Secret Name</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. prod-db-password" className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none focus:border-violet-500/50" /></div>
            <div><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Type</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 appearance-none">
                {Object.keys(typeColors).map(t => <option key={t}>{t}</option>)}
              </select></div>
            <div className="md:col-span-2"><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Secret Value</label>
              <input type="password" value={form.value} onChange={e => setForm(p => ({ ...p, value: e.target.value }))} placeholder="Paste secret value here..." className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none focus:border-violet-500/50" /></div>
            <div className="md:col-span-2"><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Description</label>
              <input value={form.desc} onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} placeholder="What is this secret used for?" className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" /></div>
          </div>
          <div className="flex gap-2"><button onClick={add} className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors">Store Secret</button>
            <button onClick={() => setAdding(false)} className="text-white/40 hover:text-white text-sm px-4 py-2 transition-colors">Cancel</button></div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#080D18]"><tr>{['Name', 'Type', 'Description', 'Tags', 'Accessed', ''].map(h => <th key={h} className="text-left px-5 py-3.5 text-xs text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-white/[0.04]">
            {secrets.map(s => {
              const Icon = typeIcons[s.type] || Lock;
              return (
                <tr key={s.id} className="hover:bg-white/[0.02]">
                  <td className="px-5 py-4"><div className="flex items-center gap-2"><Lock className="w-3.5 h-3.5 text-violet-400" /><span className="text-white font-mono text-xs">{s.name}</span></div></td>
                  <td className="px-5 py-4"><span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border font-medium ${typeColors[s.type]}`}><Icon className="w-3 h-3" />{s.type}</span></td>
                  <td className="px-5 py-4 text-white/50 text-xs max-w-xs truncate">{s.desc}</td>
                  <td className="px-5 py-4"><div className="flex flex-wrap gap-1">{s.tags.map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/40">{t}</span>)}</div></td>
                  <td className="px-5 py-4 text-white/40 text-xs">{s.accessed}</td>
                  <td className="px-5 py-4 text-right"><div className="flex items-center justify-end gap-2">
                    <button onClick={() => { navigator.clipboard?.writeText('••••••••'); toast.success('Copied', 'Secret value copied to clipboard.'); }} className="text-white/30 hover:text-violet-400 transition-colors"><Copy className="w-4 h-4" /></button>
                    <button onClick={() => setDeleteTarget(s.id)} className="text-white/20 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>

      <AnimatePresence>
        {deleteTarget && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[#0A0F1A] border border-red-500/30 rounded-2xl p-6 max-w-sm w-full">
              <h3 className="font-bold text-white mb-2">Delete Secret?</h3>
              <p className="text-sm text-white/60 mb-6">This action is irreversible. The secret will be permanently deleted from the vault.</p>
              <div className="flex gap-3">
                <button onClick={() => { setSecrets(p => p.filter(s => s.id !== deleteTarget)); toast.success('Secret deleted'); setDeleteTarget(null); }} className="flex-1 bg-red-600 hover:bg-red-500 text-white text-sm font-medium py-2.5 rounded-xl transition-colors">Delete Permanently</button>
                <button onClick={() => setDeleteTarget(null)} className="flex-1 bg-white/5 hover:bg-white/10 text-white text-sm py-2.5 rounded-xl transition-colors border border-white/10">Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
