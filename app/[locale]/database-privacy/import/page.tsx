'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileInput, Upload, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { PageHeader } from '../../../components/platform/ui/PlatformUI';
import { useToast } from '../../../components/platform/ui/Toast';

const detectedCols = [
  { col: 'email',       type: 'Email Address', confidence: 99, risk: 'High',   mask: 'Synthetic Faker' },
  { col: 'full_name',   type: 'Full Name',     confidence: 95, risk: 'Medium', mask: 'Synthetic Faker' },
  { col: 'phone',       type: 'Phone Number',  confidence: 92, risk: 'Medium', mask: 'Partial Redaction' },
  { col: 'ssn',         type: 'SSN',           confidence: 100, risk: 'High',  mask: 'SHA-256 Hash' },
  { col: 'ip_address',  type: 'IP Address',    confidence: 88, risk: 'Low',    mask: 'Generalization' },
  { col: 'created_at',  type: 'Date',          confidence: 70, risk: 'Low',    mask: 'None (safe)' },
];

const recent = [
  { name: 'customers_export.csv', rows: '45,231', size: '2.1 MB', at: '2h ago', status: 'done' },
  { name: 'users_backup.json',    rows: '12,048', size: '0.8 MB', at: '1d ago', status: 'done' },
  { name: 'orders_raw.xml',       rows: '8,302',  size: '1.4 MB', at: '3d ago', status: 'done' },
  { name: 'legacy_data.sql',      rows: '120,000', size: '9.2 MB', at: '5d ago', status: 'done' },
];

export default function ImportPage() {
  const toast = useToast();
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState<string | null>(null);
  const fileRef = React.useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) { setUploaded(file.name); toast.info('File Detected', `${file.name} — analyzing columns...`); }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setUploaded(file.name); toast.info('File Detected', `${file.name} — analyzing columns...`); }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Import Dataset" subtitle="Upload a dataset to anonymize, scan, or analyze" />

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${dragging ? 'border-violet-500 bg-violet-500/10' : 'border-white/10 hover:border-white/20 bg-[#0A0F1A]'}`}>
        <input ref={fileRef} type="file" accept=".csv,.json,.xml,.sql,.txt" className="hidden" onChange={handleFileChange} />
        <div className="w-16 h-16 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-violet-400" />
        </div>
        <p className="text-white font-semibold mb-1">{dragging ? 'Drop your file here' : 'Drag & drop or click to upload'}</p>
        <p className="text-sm text-white/40">Supports CSV, JSON, XML, SQL, TXT — up to 500 MB</p>
      </motion.div>

      {uploaded && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <div><p className="font-semibold text-white">{uploaded}</p><p className="text-xs text-white/40">Auto-detected {detectedCols.length} columns · 6 with PII</p></div>
          </div>
          <table className="w-full text-sm">
            <thead className="bg-[#080D18]"><tr>{['Column', 'Detected Type', 'Confidence', 'Risk', 'Masking Strategy'].map(h => <th key={h} className="text-left px-5 py-3 text-xs text-white/40 font-medium">{h}</th>)}</tr></thead>
            <tbody className="divide-y divide-white/[0.04]">
              {detectedCols.map(c => (
                <tr key={c.col} className="hover:bg-white/[0.02]">
                  <td className="px-5 py-3.5 text-white font-mono text-xs">{c.col}</td>
                  <td className="px-5 py-3.5 text-white/70 text-xs">{c.type}</td>
                  <td className="px-5 py-3.5"><div className="flex items-center gap-2"><div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-violet-500 rounded-full" style={{ width: `${c.confidence}%` }} /></div><span className="text-xs text-white/50">{c.confidence}%</span></div></td>
                  <td className="px-5 py-3.5"><span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${c.risk === 'High' ? 'text-red-400 bg-red-400/10 border-red-400/20' : c.risk === 'Medium' ? 'text-amber-400 bg-amber-400/10 border-amber-400/20' : 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'}`}>{c.risk}</span></td>
                  <td className="px-5 py-3.5 text-white/60 text-xs">{c.mask}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-6 py-4 border-t border-white/10">
            <button onClick={() => toast.success('Anonymization Started', `Processing ${uploaded}...`)} className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-6 py-2.5 rounded-xl flex items-center gap-2 transition-colors">
              <Zap className="w-4 h-4" /> Process & Anonymize
            </button>
          </div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10"><h3 className="font-semibold text-white">Recent Imports</h3></div>
        <table className="w-full text-sm"><thead className="bg-[#080D18]"><tr>{['File', 'Rows', 'Size', 'Imported', 'Status'].map(h => <th key={h} className="text-left px-6 py-3 text-xs text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-white/[0.04]">{recent.map(r => (
            <tr key={r.name} className="hover:bg-white/[0.02]">
              <td className="px-6 py-4 text-white text-xs font-mono">{r.name}</td>
              <td className="px-6 py-4 text-white/50 text-xs">{r.rows}</td>
              <td className="px-6 py-4 text-white/50 text-xs">{r.size}</td>
              <td className="px-6 py-4 text-white/40 text-xs">{r.at}</td>
              <td className="px-6 py-4"><span className="flex items-center gap-1.5 text-xs text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" />Done</span></td>
            </tr>
          ))}</tbody>
        </table>
      </motion.div>
    </div>
  );
}
