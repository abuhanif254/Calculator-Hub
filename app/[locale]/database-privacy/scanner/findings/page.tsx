'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ScanSearch, Filter, ShieldAlert, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { PageHeader } from '../../../../components/platform/ui/PlatformUI';
import { useToast } from '../../../../components/platform/ui/Toast';

const piiTypes = ['All', 'Email', 'SSN', 'Credit Card', 'Phone', 'IP Address', 'Full Name', 'Date of Birth'];
const risks = ['All', 'High', 'Medium', 'Low'];
const riskColors: Record<string, string> = { High: 'text-red-400 bg-red-400/10 border-red-400/20', Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20', Low: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' };
const typeColors: Record<string, string> = { Email: 'text-blue-400 bg-blue-400/10 border-blue-400/20', SSN: 'text-red-400 bg-red-400/10 border-red-400/20', 'Credit Card': 'text-amber-400 bg-amber-400/10 border-amber-400/20', Phone: 'text-violet-400 bg-violet-400/10 border-violet-400/20', 'IP Address': 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20', 'Full Name': 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', 'Date of Birth': 'text-rose-400 bg-rose-400/10 border-rose-400/20' };

const findings = [
  { id: 1, db: 'production-postgres', schema: 'public',    table: 'users',    col: 'email',          type: 'Email',       sample: 'j***@***.com',     risk: 'High',   conf: 99, found: '2h ago' },
  { id: 2, db: 'production-postgres', schema: 'public',    table: 'users',    col: 'full_name',      type: 'Full Name',   sample: 'J*** S***',         risk: 'Medium', conf: 95, found: '2h ago' },
  { id: 3, db: 'production-postgres', schema: 'public',    table: 'payments', col: 'card_number',    type: 'Credit Card', sample: '4***-****-****-1234', risk: 'High', conf: 100, found: '2h ago' },
  { id: 4, db: 'production-postgres', schema: 'public',    table: 'users',    col: 'phone',          type: 'Phone',       sample: '+1-5**-***-1234',   risk: 'Medium', conf: 92, found: '2h ago' },
  { id: 5, db: 'production-postgres', schema: 'hr',        table: 'employees',col: 'ssn',            type: 'SSN',         sample: '***-**-6789',        risk: 'High',  conf: 100, found: '2h ago' },
  { id: 6, db: 'analytics-warehouse', schema: 'raw',       table: 'events',   col: 'client_ip',      type: 'IP Address',  sample: '192.168.***.***',   risk: 'Low',    conf: 88, found: '6h ago' },
  { id: 7, db: 'analytics-warehouse', schema: 'raw',       table: 'events',   col: 'user_email',     type: 'Email',       sample: 'a***@***.org',      risk: 'High',   conf: 99, found: '6h ago' },
  { id: 8, db: 'analytics-warehouse', schema: 'raw',       table: 'sessions', col: 'dob',            type: 'Date of Birth','sample': '19**-**-01',     risk: 'Medium', conf: 87, found: '6h ago' },
  { id: 9, db: 'staging-mysql-main',  schema: 'app',       table: 'accounts', col: 'email',          type: 'Email',       sample: 'b***@***.net',      risk: 'High',   conf: 99, found: '1d ago' },
  { id: 10, db: 'staging-mysql-main', schema: 'app',       table: 'orders',   col: 'shipping_addr',  type: 'Full Name',   sample: '1** M*** St, ***',  risk: 'Medium', conf: 78, found: '1d ago' },
  { id: 11, db: 'qa-postgres-cluster',schema: 'test',      table: 'users',    col: 'email',          type: 'Email',       sample: 'c***@***.com',      risk: 'Medium', conf: 99, found: '2d ago' },
  { id: 12, db: 'qa-postgres-cluster',schema: 'test',      table: 'logs',     col: 'user_ip',        type: 'IP Address',  sample: '10.0.***.***',       risk: 'Low',   conf: 82, found: '2d ago' },
];

export default function FindingsPage() {
  const toast = useToast();
  const [piiFilter, setPiiFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<number>>(new Set());

  const filtered = findings.filter(f =>
    (piiFilter === 'All' || f.type === piiFilter) &&
    (riskFilter === 'All' || f.risk === riskFilter) &&
    (f.col.includes(search) || f.table.includes(search) || f.db.includes(search))
  );
  const toggleAll = () => setSelected(selected.size === filtered.length ? new Set() : new Set(filtered.map(f => f.id)));

  const stats = { high: findings.filter(f => f.risk === 'High').length, medium: findings.filter(f => f.risk === 'Medium').length, low: findings.filter(f => f.risk === 'Low').length };

  return (
    <div className="space-y-6">
      <PageHeader title="Scanner Findings" subtitle="Detailed PII discoveries across all connected databases" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[{ label: 'Total Findings', val: findings.length, icon: ScanSearch, color: 'text-violet-400', bg: 'bg-violet-500/10' },
          { label: 'High Risk', val: stats.high, icon: ShieldAlert, color: 'text-red-400', bg: 'bg-red-500/10' },
          { label: 'Medium Risk', val: stats.medium, icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Low Risk', val: stats.low, icon: Info, color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${s.bg} flex items-center justify-center shrink-0`}><s.icon className={`w-5 h-5 ${s.color}`} /></div>
            <div><p className="text-2xl font-black text-white">{s.val}</p><p className="text-xs text-white/40">{s.label}</p></div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-3">
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by column, table, database..." className="flex-1 min-w-40 bg-[#0A0F1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-violet-500/50" />
        <select value={piiFilter} onChange={e => setPiiFilter(e.target.value)} className="bg-[#0A0F1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 appearance-none">
          {piiTypes.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)} className="bg-[#0A0F1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 appearance-none">
          {risks.map(r => <option key={r}>{r}</option>)}
        </select>
        {selected.size > 0 && (
          <div className="flex gap-2">
            <button onClick={() => toast.success('Rules Applied', `${selected.size} findings have masking rules applied.`)} className="bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2 rounded-xl transition-colors">Apply Rule ({selected.size})</button>
            <button onClick={() => { setSelected(new Set()); toast.info('Findings Ignored'); }} className="bg-white/5 hover:bg-white/10 text-white/70 text-sm px-4 py-2 rounded-xl border border-white/10 transition-colors">Ignore</button>
          </div>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#080D18]">
            <tr>
              <th className="px-4 py-3.5 w-10"><input type="checkbox" checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll} className="rounded border-white/20 bg-white/5 accent-violet-500" /></th>
              {['Database', 'Table · Column', 'Detected Type', 'Sample', 'Risk', 'Confidence', 'Found'].map(h => <th key={h} className="text-left px-3 py-3.5 text-xs text-white/40 font-medium whitespace-nowrap">{h}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {filtered.map(f => (
              <tr key={f.id} className={`hover:bg-white/[0.02] ${selected.has(f.id) ? 'bg-violet-500/5' : ''}`}>
                <td className="px-4 py-3"><input type="checkbox" checked={selected.has(f.id)} onChange={() => setSelected(p => { const n = new Set(p); n.has(f.id) ? n.delete(f.id) : n.add(f.id); return n; })} className="rounded border-white/20 bg-white/5 accent-violet-500" /></td>
                <td className="px-3 py-3 text-white/60 font-mono text-xs">{f.db}</td>
                <td className="px-3 py-3"><span className="text-white/80 text-xs">{f.table}</span><span className="text-white/40 text-xs"> · {f.col}</span></td>
                <td className="px-3 py-3"><span className={`text-xs px-2 py-1 rounded-full border font-medium ${typeColors[f.type]}`}>{f.type}</span></td>
                <td className="px-3 py-3 text-white/50 font-mono text-xs">{f.sample}</td>
                <td className="px-3 py-3"><span className={`text-xs px-2 py-1 rounded-full border font-medium ${riskColors[f.risk]}`}>{f.risk}</span></td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2"><div className="w-12 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-violet-500 rounded-full" style={{ width: `${f.conf}%` }} /></div>
                  <span className="text-xs text-white/50">{f.conf}%</span></div>
                </td>
                <td className="px-3 py-3 text-white/30 text-xs whitespace-nowrap">{f.found}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
