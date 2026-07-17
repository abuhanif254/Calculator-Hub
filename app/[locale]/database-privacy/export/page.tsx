'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { FileOutput, Download, ChevronDown } from 'lucide-react';
import { PageHeader } from '../../../components/platform/ui/PlatformUI';
import { useToast } from '../../../components/platform/ui/Toast';

const formats = ['CSV', 'JSON', 'SQL', 'XML', 'Parquet'];
const sources = ['production-postgres · users', 'analytics-warehouse · events', 'qa-mysql · accounts'];
const preview = [
  { id: '1', name: 'Alice Morgan', email: 'alice.morgan@outlook.com', phone: '+1-202-867-5309', country: 'US' },
  { id: '2', name: 'James Lee', email: 'james.lee@gmail.com', phone: '+1-415-555-0192', country: 'GB' },
  { id: '3', name: 'Sofia Reyes', email: 'sofia.reyes@proton.me', phone: '+34-612-345-678', country: 'ES' },
  { id: '4', name: 'Kai Tanaka', email: 'kai.tanaka@yahoo.co.jp', phone: '+81-3-1234-5678', country: 'JP' },
  { id: '5', name: 'Emma Wilson', email: 'emma.wilson@corp.io', phone: '+44-20-7946-0958', country: 'AU' },
];
const recent = [
  { name: 'users_masked_jan.csv', fmt: 'CSV',  size: '4.2 MB',  rows: '45,231', created: '2h ago' },
  { name: 'events_anon.json',     fmt: 'JSON', size: '12.8 MB', rows: '120,549', created: '1d ago' },
  { name: 'accounts_backup.sql',  fmt: 'SQL',  size: '2.1 MB',  rows: '18,023', created: '3d ago' },
  { name: 'sessions_export.csv',  fmt: 'CSV',  size: '1.7 MB',  rows: '31,402', created: '5d ago' },
];

export default function ExportPage() {
  const toast = useToast();
  const [fmt, setFmt] = useState('CSV');
  const [src, setSrc] = useState(sources[0]);
  const [gzip, setGzip] = useState(false);
  const [headers, setHeaders] = useState(true);
  const [progress, setProgress] = useState<number | null>(null);

  const startExport = () => {
    setProgress(0);
    let p = 0;
    const iv = setInterval(() => { p += Math.random() * 15; if (p >= 100) { clearInterval(iv); setProgress(null); toast.success('Export Complete', `Masked dataset exported as ${fmt}.`); } else setProgress(p); }, 200);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Export Data" subtitle="Download your anonymized datasets in multiple formats" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-white mb-4">Export Configuration</h3>
          <div><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Source Dataset</label>
            <select value={src} onChange={e => setSrc(e.target.value)} className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 appearance-none">{sources.map(s => <option key={s}>{s}</option>)}</select></div>
          <div><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Output Format</label>
            <div className="flex gap-2">{formats.map(f => <button key={f} onClick={() => setFmt(f)} className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${fmt === f ? 'bg-violet-600 border-violet-500 text-white' : 'bg-white/5 border-white/10 text-white/50 hover:text-white'}`}>{f}</button>)}</div></div>
          <div className="flex gap-6">
            {[{ label: 'GZIP Compression', val: gzip, set: setGzip }, { label: 'Include Headers', val: headers, set: setHeaders }].map(t => (
              <label key={t.label} className="flex items-center gap-3 cursor-pointer">
                <div onClick={() => t.set(!t.val)} className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${t.val ? 'bg-violet-600' : 'bg-white/20'}`}><div className={`w-4 h-4 bg-white rounded-full transition-transform ${t.val ? 'translate-x-4' : 'translate-x-0'}`} /></div>
                <span className="text-sm text-white/70">{t.label}</span>
              </label>
            ))}
          </div>
          {progress !== null ? (
            <div className="space-y-2"><div className="flex justify-between text-xs text-white/50"><span>Exporting...</span><span>{Math.round(progress)}%</span></div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-violet-600 rounded-full transition-all" style={{ width: `${progress}%` }} /></div></div>
          ) : (
            <button onClick={startExport} className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
              <Download className="w-4 h-4" /> Start Export
            </button>
          )}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4">Preview (First 5 Rows — Anonymized)</h3>
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-xs">
              <thead className="bg-[#080D18]"><tr>{Object.keys(preview[0]).map(k => <th key={k} className="text-left px-3 py-2.5 text-white/40 font-medium capitalize whitespace-nowrap">{k}</th>)}</tr></thead>
              <tbody className="divide-y divide-white/[0.04]">{preview.map(r => <tr key={r.id}>{Object.values(r).map((v, i) => <td key={i} className="px-3 py-2.5 text-white/70 whitespace-nowrap">{v}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10"><h3 className="font-semibold text-white">Recent Exports</h3></div>
        <table className="w-full text-sm"><thead className="bg-[#080D18]"><tr>{['Filename', 'Format', 'Size', 'Rows', 'Created', ''].map(h => <th key={h} className="text-left px-6 py-3 text-xs text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-white/[0.04]">{recent.map(r => (
            <tr key={r.name} className="hover:bg-white/[0.02]">
              <td className="px-6 py-4 text-white text-xs font-mono">{r.name}</td>
              <td className="px-6 py-4"><span className="text-xs bg-violet-500/10 border border-violet-500/20 text-violet-400 px-2 py-0.5 rounded-full">{r.fmt}</span></td>
              <td className="px-6 py-4 text-white/50 text-xs">{r.size}</td>
              <td className="px-6 py-4 text-white/50 text-xs">{r.rows}</td>
              <td className="px-6 py-4 text-white/40 text-xs">{r.created}</td>
              <td className="px-6 py-4 text-right"><button onClick={() => toast.success('Downloading', r.name)} className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors ml-auto"><Download className="w-3.5 h-3.5" />Download</button></td>
            </tr>
          ))}</tbody>
        </table>
      </motion.div>
    </div>
  );
}
