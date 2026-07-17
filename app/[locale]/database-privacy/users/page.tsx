'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, Plus, Mail, Shield, MoreHorizontal, CheckCircle2, Clock } from 'lucide-react';
import { PageHeader } from '../../../components/platform/ui/PlatformUI';
import { useToast } from '../../../components/platform/ui/Toast';

const roleColors: Record<string, string> = { Admin: 'text-red-400 bg-red-400/10 border-red-400/20', 'Compliance Officer': 'text-violet-400 bg-violet-400/10 border-violet-400/20', DBA: 'text-blue-400 bg-blue-400/10 border-blue-400/20', Developer: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20', 'Read-Only': 'text-white/40 bg-white/5 border-white/10' };
const members = [
  { id: 1, name: 'Sarah Chen',     email: 'sarah@acme.com',    role: 'Admin',              status: 'Active',  last: '2m ago',   initials: 'SC', color: 'from-violet-500 to-indigo-600' },
  { id: 2, name: 'James Wilson',   email: 'james@acme.com',    role: 'Compliance Officer', status: 'Active',  last: '1h ago',   initials: 'JW', color: 'from-blue-500 to-cyan-600' },
  { id: 3, name: 'Maria Garcia',   email: 'maria@acme.com',    role: 'DBA',                status: 'Active',  last: '30m ago',  initials: 'MG', color: 'from-emerald-500 to-teal-600' },
  { id: 4, name: 'Tom Nguyen',     email: 'tom@acme.com',      role: 'Developer',          status: 'Active',  last: '3h ago',   initials: 'TN', color: 'from-amber-500 to-orange-600' },
  { id: 5, name: 'Lisa Park',      email: 'lisa@acme.com',     role: 'Developer',          status: 'Active',  last: '1d ago',   initials: 'LP', color: 'from-rose-500 to-pink-600' },
  { id: 6, name: 'Alex Thompson',  email: 'alex@vendor.com',   role: 'Read-Only',          status: 'Pending', last: 'Invited',  initials: 'AT', color: 'from-slate-500 to-gray-600' },
];

export default function UsersPage() {
  const toast = useToast();
  const [inviting, setInviting] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Developer');

  return (
    <div className="space-y-6">
      <PageHeader title="Users & Teams" subtitle="Manage access and permissions for your organization">
        <button onClick={() => setInviting(p => !p)} className="bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> Invite Member
        </button>
      </PageHeader>

      {inviting && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0F1A] border border-violet-500/30 rounded-2xl p-5 flex flex-col sm:flex-row items-end gap-3">
          <div className="flex-1"><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Email Address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="colleague@company.com" className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" /></div>
          <div><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Role</label>
            <select value={role} onChange={e => setRole(e.target.value)} className="bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 appearance-none">
              {Object.keys(roleColors).map(r => <option key={r}>{r}</option>)}
            </select></div>
          <button onClick={() => { if (!email) { toast.warning('Email required'); return; } toast.success('Invitation Sent', `${email} has been invited as ${role}.`); setInviting(false); setEmail(''); }} className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2">
            <Mail className="w-4 h-4" /> Send Invite
          </button>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#080D18]"><tr>{['Member', 'Role', 'Status', 'Last Active', ''].map(h => <th key={h} className="text-left px-5 py-3.5 text-xs text-white/40 font-medium">{h}</th>)}</tr></thead>
          <tbody className="divide-y divide-white/[0.04]">
            {members.map(m => (
              <tr key={m.id} className="hover:bg-white/[0.02]">
                <td className="px-5 py-4"><div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${m.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>{m.initials}</div>
                  <div><p className="text-white font-medium text-sm">{m.name}</p><p className="text-xs text-white/40">{m.email}</p></div>
                </div></td>
                <td className="px-5 py-4"><span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${roleColors[m.role]}`}>{m.role}</span></td>
                <td className="px-5 py-4">{m.status === 'Active' ? <span className="flex items-center gap-1.5 text-xs text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" />Active</span> : <span className="flex items-center gap-1.5 text-xs text-amber-400"><Clock className="w-3.5 h-3.5" />Pending</span>}</td>
                <td className="px-5 py-4 text-xs text-white/40">{m.last}</td>
                <td className="px-5 py-4 text-right"><button className="text-white/20 hover:text-white/60 transition-colors"><MoreHorizontal className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}