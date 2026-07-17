'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ScrollText, Search, Download, Calendar, Shield, Database, Key, LogIn, ScanSearch, FileOutput } from 'lucide-react';
import { PageHeader } from '../../../components/platform/ui/PlatformUI';
import { useToast } from '../../../components/platform/ui/Toast';

const eventTypes = ['All', 'Auth', 'Connection', 'Scan', 'Masking', 'Export', 'System'];
const eventColors: Record<string, string> = { Auth: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', Connection: 'text-blue-400 bg-blue-400/10 border-blue-400/20', Scan: 'text-amber-400 bg-amber-400/10 border-amber-400/20', Masking: 'text-violet-400 bg-violet-400/10 border-violet-400/20', Export: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20', System: 'text-white/40 bg-white/5 border-white/10' };
const eventIcons: Record<string, React.ElementType> = { Auth: LogIn, Connection: Database, Scan: ScanSearch, Masking: Shield, Export: FileOutput, System: Key };

const logs = [
  { id: 'evt-001', ts: '2024-01-20 10:04:32', user: 'admin@acme.com', type: 'Auth', desc: 'User logged in successfully', ip: '192.168.1.10', status: 'success' },
  { id: 'evt-002', ts: '2024-01-20 10:06:14', user: 'admin@acme.com', type: 'Connection', desc: 'Database connection "production-db" added', ip: '192.168.1.10', status: 'success' },
  { id: 'evt-003', ts: '2024-01-20 10:08:55', user: 'dba@acme.com', type: 'Scan', desc: 'PII scan started on production-postgres', ip: '10.0.0.4', status: 'success' },
  { id: 'evt-004', ts: '2024-01-20 10:12:21', user: 'dba@acme.com', type: 'Scan', desc: 'Scan complete — 47 PII columns found', ip: '10.0.0.4', status: 'success' },
  { id: 'evt-005', ts: '2024-01-20 10:14:08', user: 'dba@acme.com', type: 'Masking', desc: 'Masking rule "Email-Faker" created', ip: '10.0.0.4', status: 'success' },
  { id: 'evt-006', ts: '2024-01-20 10:18:44', user: 'dba@acme.com', type: 'Masking', desc: 'Anonymization job #104 started', ip: '10.0.0.4', status: 'success' },
  { id: 'evt-007', ts: '2024-01-20 10:32:01', user: 'dba@acme.com', type: 'Masking', desc: 'Job #104 completed — 2.1M rows masked', ip: '10.0.0.4', status: 'success' },
  { id: 'evt-008', ts: '2024-01-20 11:00:00', user: 'dev@acme.com', type: 'Export', desc: 'Exported masked dataset as CSV (148 MB)', ip: '10.0.0.7', status: 'success' },
  { id: 'evt-009', ts: '2024-01-20 11:14:23', user: 'dev@acme.com', type: 'Auth', desc: 'Failed login attempt — wrong password', ip: '198.51.100.9', status: 'failed' },
  { id: 'evt-010', ts: '2024-01-20 12:00:00', user: 'system', type: 'System', desc: 'API key "ci-pipeline-key" created', ip: '—', status: 'success' },
  { id: 'evt-011', ts: '2024-01-20 12:45:19', user: 'admin@acme.com', type: 'Connection', desc: 'Connection "legacy-oracle" deleted', ip: '192.168.1.10', status: 'success' },
  { id: 'evt-012', ts: '2024-01-20 14:00:00', user: 'system', type: 'Scan', desc: 'Scheduled scan triggered on analytics-db', ip: '—', status: 'success' },
];

export default function AuditPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const toast = useToast();
  const filtered = logs.filter(l => (filter === 'All' || l.type === filter) && (l.desc.toLowerCase().includes(search.toLowerCase()) || l.user.toLowerCase().includes(search.toLowerCase())));

  return (
    <div className="space-y-6">
      <PageHeader title="Audit Logs" subtitle="Immutable record of all platform actions for compliance and forensics" />
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events, users..." className="w-full bg-[#0A0F1A] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-violet-500/50" />
        </div>
        <div className="flex gap-1 bg-[#0A0F1A] border border-white/10 rounded-xl p-1 overflow-x-auto">
          {eventTypes.map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${filter === t ? 'bg-violet-600 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>{t}</button>
          ))}
        </div>
        <button onClick={() => toast.success('Export Started', 'Audit log CSV is being generated.')} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-sm font-medium px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#080D18]">
            <tr>{['Timestamp', 'User', 'Event Type', 'Description', 'IP Address', 'Status'].map(h => <th key={h} className="text-left px-5 py-3.5 text-xs text-white/40 font-medium whitespace-nowrap">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {filtered.map(log => {
              const Icon = eventIcons[log.type] || ScrollText;
              return (
                <tr key={log.id} className="hover:bg-white/[0.02]">
                  <td className="px-5 py-3.5 text-white/50 text-xs font-mono whitespace-nowrap"><Calendar className="w-3 h-3 inline mr-1.5" />{log.ts}</td>
                  <td className="px-5 py-3.5 text-white/70 text-xs">{log.user}</td>
                  <td className="px-5 py-3.5"><span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border font-medium ${eventColors[log.type]}`}><Icon className="w-3 h-3" />{log.type}</span></td>
                  <td className="px-5 py-3.5 text-white/70 text-xs max-w-xs truncate">{log.desc}</td>
                  <td className="px-5 py-3.5 text-white/40 text-xs font-mono">{log.ip}</td>
                  <td className="px-5 py-3.5"><span className={`text-xs font-medium ${log.status === 'success' ? 'text-emerald-400' : 'text-red-400'}`}>{log.status}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
