'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Key, Plus, Copy, Eye, EyeOff, Trash2, Shield } from 'lucide-react';
import { PageHeader } from '../../../components/platform/ui/PlatformUI';
import { useToast } from '../../../components/platform/ui/Toast';

const initialKeys = [
  { id: 'k1', name: 'CI/CD Pipeline',     key: 'sk-live-a3f9...c7d2', full: 'sk-live-a3f9b812e5f04c2d87a1c7d2', perms: ['read', 'write'], created: 'Jan 10, 2024', last: '2h ago' },
  { id: 'k2', name: 'Analytics Dashboard', key: 'sk-live-b7e2...f4a1', full: 'sk-live-b7e2c341d09a4b5f8e2c4f4a1', perms: ['read'],          created: 'Jan 12, 2024', last: '1d ago' },
  { id: 'k3', name: 'Backup Cron Job',     key: 'sk-live-c1d4...a8b3', full: 'sk-live-c1d4e567f08b4c9a2d3e7a8b3', perms: ['read', 'write'], created: 'Jan 15, 2024', last: '7d ago' },
  { id: 'k4', name: 'Dev Environment',     key: 'sk-test-d9f3...e2c7', full: 'sk-test-d9f3a124b08c4d7e9f1b3e2c7', perms: ['read', 'write', 'admin'], created: 'Jan 18, 2024', last: '3h ago' },
  { id: 'k5', name: 'Monitoring Agent',    key: 'sk-live-e4b8...d1f9', full: 'sk-live-e4b8c235a07d4e9b1c2d4d1f9', perms: ['read'],          created: 'Jan 20, 2024', last: 'Just now' },
];

const permColors: Record<string, string> = { read: 'text-blue-400 bg-blue-400/10 border-blue-400/20', write: 'text-amber-400 bg-amber-400/10 border-amber-400/20', admin: 'text-red-400 bg-red-400/10 border-red-400/20' };

export default function ApiKeysPage() {
  const [keys, setKeys] = useState(initialKeys);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('');
  const toast = useToast();

  const toggleReveal = (id: string) => {
    setRevealed(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
    if (!revealed.has(id)) toast.info('Key Revealed', 'Copy it now — it will be hidden again when you navigate away.');
  };
  const copyKey = (full: string) => { navigator.clipboard?.writeText(full); toast.success('Copied to Clipboard', 'API key copied successfully.'); };
  const deleteKey = (id: string) => setKeys(prev => prev.filter(k => k.id !== id));
  const createKey = () => {
    if (!newName) { toast.warning('Name Required', 'Please enter a name for your API key.'); return; }
    const newKey = { id: `k${Date.now()}`, name: newName, key: 'sk-live-xxxx...xxxx', full: 'sk-live-xxxx-newly-generated', perms: ['read'], created: 'Just now', last: 'Never' };
    setKeys(prev => [newKey, ...prev]);
    toast.success('API Key Created', `"${newName}" key has been created.`);
    setCreating(false); setNewName('');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="API Keys" subtitle="Manage programmatic access to the Data Privacy Platform">
        <button onClick={() => setCreating(p => !p)} className="bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Create New Key
        </button>
      </PageHeader>

      {creating && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0F1A] border border-violet-500/30 rounded-2xl p-5 flex items-end gap-3">
          <div className="flex-1"><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Key Name</label>
            <input autoFocus value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. My CI Pipeline Key" className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" /></div>
          <button onClick={createKey} className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">Generate Key</button>
          <button onClick={() => setCreating(false)} className="text-white/40 hover:text-white text-sm px-3 py-2.5 transition-colors">Cancel</button>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#080D18]">
            <tr>{['Name', 'Key', 'Permissions', 'Created', 'Last Used', ''].map(h => <th key={h} className="text-left px-5 py-3.5 text-xs text-white/40 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {keys.map(k => (
              <tr key={k.id} className="hover:bg-white/[0.02]">
                <td className="px-5 py-4"><div className="flex items-center gap-2"><Key className="w-3.5 h-3.5 text-violet-400" /><span className="text-white font-medium text-sm">{k.name}</span></div></td>
                <td className="px-5 py-4"><div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-white/60">{revealed.has(k.id) ? k.full : k.key}</span>
                  <button onClick={() => toggleReveal(k.id)} className="text-white/30 hover:text-white transition-colors">{revealed.has(k.id) ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}</button>
                  <button onClick={() => copyKey(k.full)} className="text-white/30 hover:text-violet-400 transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                </div></td>
                <td className="px-5 py-4"><div className="flex gap-1">{k.perms.map(p => <span key={p} className={`text-xs px-2 py-0.5 rounded-full border font-medium ${permColors[p]}`}>{p}</span>)}</div></td>
                <td className="px-5 py-4 text-white/40 text-xs">{k.created}</td>
                <td className="px-5 py-4 text-white/40 text-xs">{k.last}</td>
                <td className="px-5 py-4 text-right"><button onClick={() => deleteKey(k.id)} className="text-white/20 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
