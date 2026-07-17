'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Webhook, Plus, Play, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { PageHeader } from '../../../components/platform/ui/PlatformUI';
import { useToast } from '../../../components/platform/ui/Toast';

const events = ['job.completed', 'job.failed', 'scan.finished', 'pii.discovered', 'rule.created'];
const initHooks = [
  { id: 'wh1', url: 'https://hooks.slack.com/services/T01/B02/xyz', events: ['job.completed', 'job.failed'], status: 'Active',   last: '200 · 2h ago' },
  { id: 'wh2', url: 'https://my-app.com/webhooks/data-privacy',      events: ['pii.discovered'],             status: 'Active',   last: '200 · 1d ago' },
  { id: 'wh3', url: 'https://old-service.internal/notify',           events: ['job.completed'],              status: 'Inactive', last: '502 · 3d ago' },
];

export default function WebhooksPage() {
  const toast = useToast();
  const [hooks, setHooks] = useState(initHooks);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ url: '', secret: '', events: [] as string[] });

  const toggleEvent = (e: string) => setForm(p => ({ ...p, events: p.events.includes(e) ? p.events.filter(x => x !== e) : [...p.events, e] }));
  const add = () => {
    if (!form.url) { toast.warning('URL Required'); return; }
    setHooks(p => [...p, { id: `wh${Date.now()}`, url: form.url, events: form.events, status: 'Active', last: 'Never' }]);
    toast.success('Webhook Added', 'Your endpoint has been registered.');
    setAdding(false); setForm({ url: '', secret: '', events: [] });
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Webhooks" subtitle="Receive real-time notifications when jobs complete, fail, or PII is discovered">
        <button onClick={() => setAdding(p => !p)} className="bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Add Endpoint
        </button>
      </PageHeader>

      {adding && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0F1A] border border-violet-500/30 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-white">New Webhook Endpoint</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Endpoint URL</label>
              <input value={form.url} onChange={e => setForm(p => ({ ...p, url: e.target.value }))} placeholder="https://your-app.com/webhook" className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" /></div>
            <div><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Signing Secret (optional)</label>
              <input type="password" value={form.secret} onChange={e => setForm(p => ({ ...p, secret: e.target.value }))} placeholder="whsec_..." className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" /></div>
          </div>
          <div><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Listen to Events</label>
            <div className="flex flex-wrap gap-2">
              {events.map(e => (
                <button key={e} onClick={() => toggleEvent(e)} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors font-mono ${form.events.includes(e) ? 'bg-violet-600 border-violet-500 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:text-white'}`}>{e}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-2"><button onClick={add} className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors">Register Endpoint</button>
            <button onClick={() => setAdding(false)} className="text-white/40 hover:text-white text-sm px-4 py-2 transition-colors">Cancel</button></div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#080D18]"><tr>{['Endpoint URL', 'Events', 'Status', 'Last Delivery', ''].map(h => <th key={h} className="text-left px-5 py-3.5 text-xs text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-white/[0.04]">
            {hooks.map(h => (
              <tr key={h.id} className="hover:bg-white/[0.02]">
                <td className="px-5 py-4 font-mono text-xs text-white/80 max-w-xs truncate">{h.url}</td>
                <td className="px-5 py-4"><div className="flex flex-wrap gap-1">{h.events.map(e => <span key={e} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/50 font-mono">{e}</span>)}</div></td>
                <td className="px-5 py-4">{h.status === 'Active' ? <span className="flex items-center gap-1 text-xs text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" />Active</span> : <span className="flex items-center gap-1 text-xs text-white/40"><XCircle className="w-3.5 h-3.5" />Inactive</span>}</td>
                <td className="px-5 py-4 text-xs text-white/40 font-mono">{h.last}</td>
                <td className="px-5 py-4 text-right"><div className="flex items-center justify-end gap-2">
                  <button onClick={() => toast.info('Test Sent', `Ping delivered to ${h.url.split('/')[2]}`)} className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors"><Play className="w-3 h-3" />Test</button>
                  <button onClick={() => setHooks(p => p.filter(x => x.id !== h.id))} className="text-white/20 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
