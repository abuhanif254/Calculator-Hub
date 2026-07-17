'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CalendarClock, Plus, Play, Pause, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { PageHeader } from '../../../../components/platform/ui/PlatformUI';
import { useToast } from '../../../../components/platform/ui/Toast';

const initSchedules = [
  { id: 's1', name: 'Nightly QA Refresh', db: 'qa-postgres-cluster', profile: 'GDPR Pro Pack', schedule: 'Daily at 02:00 UTC', next: 'Tonight 02:00', last: 'Yesterday 02:00', status: 'Active' },
  { id: 's2', name: 'Weekly Staging Mask', db: 'staging-mysql-main', profile: 'HIPAA Complete', schedule: 'Weekly · Mon 00:00 UTC', next: 'Mon Jul 22', last: 'Mon Jul 15', status: 'Active' },
  { id: 's3', name: 'Monthly Dev Refresh', db: 'dev-sqlite-local', profile: 'Custom Pack', schedule: 'Monthly · 1st 06:00 UTC', next: 'Aug 1', last: 'Jul 1', status: 'Paused' },
];

export default function SchedulerPage() {
  const toast = useToast();
  const [schedules, setSchedules] = useState(initSchedules);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: '', db: 'qa-postgres-cluster', profile: 'GDPR Pro Pack', freq: 'Daily', time: '02:00' });

  const add = () => {
    if (!form.name) { toast.warning('Name required'); return; }
    setSchedules(p => [...p, { id: `s${Date.now()}`, name: form.name, db: form.db, profile: form.profile, schedule: `${form.freq} at ${form.time} UTC`, next: 'Calculating...', last: 'Never', status: 'Active' }]);
    toast.success('Schedule Created', `"${form.name}" will run ${form.freq.toLowerCase()}.`);
    setAdding(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Job Scheduler" subtitle="Automate masking runs on a recurring schedule">
        <button onClick={() => setAdding(p => !p)} className="bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> New Schedule
        </button>
      </PageHeader>

      {adding && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0F1A] border border-violet-500/30 rounded-2xl p-6 space-y-4">
          <h3 className="font-semibold text-white">New Recurring Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[{ label: 'Schedule Name', key: 'name', type: 'text', placeholder: 'e.g. Nightly Prod Refresh' },
              { label: 'Target Database', key: 'db', type: 'select', options: ['qa-postgres-cluster', 'staging-mysql-main', 'dev-sqlite-local', 'analytics-warehouse'] },
              { label: 'Masking Profile', key: 'profile', type: 'select', options: ['GDPR Pro Pack', 'HIPAA Complete', 'PCI-DSS Gold', 'Custom Pack'] },
              { label: 'Frequency', key: 'freq', type: 'select', options: ['Hourly', 'Daily', 'Weekly', 'Monthly'] }
            ].map(f => (
              <div key={f.key}><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">{f.label}</label>
                {f.type === 'select' ? (
                  <select value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 appearance-none">
                    {f.options!.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input value={(form as any)[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} placeholder={f.placeholder} className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" />
                )}
              </div>
            ))}
            <div><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Run Time (UTC)</label>
              <input type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" /></div>
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={add} className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors">Create Schedule</button>
            <button onClick={() => setAdding(false)} className="text-white/40 hover:text-white text-sm px-4 py-2 transition-colors">Cancel</button>
          </div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#080D18]"><tr>{['Name', 'Database', 'Profile', 'Schedule', 'Next Run', 'Status', ''].map(h => <th key={h} className="text-left px-5 py-3.5 text-xs text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-white/[0.04]">
            {schedules.map(s => (
              <tr key={s.id} className="hover:bg-white/[0.02]">
                <td className="px-5 py-4 text-white font-medium">{s.name}</td>
                <td className="px-5 py-4 text-white/60 font-mono text-xs">{s.db}</td>
                <td className="px-5 py-4 text-white/60 text-xs">{s.profile}</td>
                <td className="px-5 py-4 text-white/50 text-xs">{s.schedule}</td>
                <td className="px-5 py-4 text-white/70 text-xs"><Clock className="w-3 h-3 inline mr-1" />{s.next}</td>
                <td className="px-5 py-4">{s.status === 'Active' ? <span className="flex items-center gap-1 text-xs text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" />Active</span> : <span className="text-xs text-white/40">Paused</span>}</td>
                <td className="px-5 py-4 text-right"><div className="flex items-center justify-end gap-2">
                  <button onClick={() => toast.success('Job Triggered', `Running "${s.name}" now.`)} className="text-violet-400 hover:text-violet-300 transition-colors"><Play className="w-4 h-4" /></button>
                  <button onClick={() => setSchedules(p => p.filter(x => x.id !== s.id))} className="text-white/20 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
