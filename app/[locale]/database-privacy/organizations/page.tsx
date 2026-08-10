"use client";
export const runtime = 'edge';
import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';
import {
  Building2,
  Users,
  Database,
  Zap,
  HardDrive,
  Settings,
  Mail,
  UserPlus,
  Loader2,
  AlertCircle,
  Pencil,
  Trash2,
  X,
} from 'lucide-react';

const ROLES = ['Admin', 'Developer', 'Compliance Officer', 'Viewer'] as const;
type Role = typeof ROLES[number];

interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'Active' | 'Invited';
  joined_at?: string;
}

interface OrgSettings {
  id: string;
  name: string;
  plan: string;
  db_limit: number;
  db_used: number;
  jobs_limit: number;
  jobs_used: number;
  storage_limit_gb: number;
  storage_used_gb: number;
}

export default function OrganizationsPage() {
  const [org, setOrg] = useState<OrgSettings | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Invite modal
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('Developer');
  const [inviting, setInviting] = useState(false);

  // Edit role
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<Role>('Developer');

  // Org name edit
  const [editingOrgName, setEditingOrgName] = useState(false);
  const [orgNameDraft, setOrgNameDraft] = useState('');
  const [savingOrg, setSavingOrg] = useState(false);

  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      const [orgRes, membersRes] = await Promise.all([
        privacyFetch('/api/privacy/settings'),
        privacyFetch('/api/privacy/team'),
      ]);
      const orgData = await orgRes.json();
      const membersData = await membersRes.json();

      // Map settings response into org shape
      const s = orgData.settings ?? orgData;
      setOrg({
        id: s.id ?? 'default',
        name: s.org_name ?? s.name ?? 'My Organization',
        plan: s.plan ?? 'Free Tier',
        db_limit: s.db_limit ?? 10,
        db_used: s.db_used ?? 0,
        jobs_limit: s.jobs_limit ?? 500,
        jobs_used: s.jobs_used ?? 0,
        storage_limit_gb: s.storage_limit_gb ?? 5,
        storage_used_gb: s.storage_used_gb ?? 0,
      });

      const list: Member[] = (membersData.members ?? membersData ?? []).map((m: any) => ({
        id: m.id,
        name: m.name ?? m.email?.split('@')[0] ?? 'Unknown',
        email: m.email,
        role: m.role ?? 'Developer',
        status: m.status ?? (m.accepted_at ? 'Active' : 'Invited'),
      }));
      setMembers(list);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAll(); }, [fetchAll]);

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    setInviting(true);
    try {
      const res = await privacyFetch('/api/privacy/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail.trim(), role: inviteRole }),
      });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Invite failed');
      showToast(`Invite sent to ${inviteEmail}`);
      setShowInvite(false);
      setInviteEmail('');
      fetchAll();
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setInviting(false);
    }
  };

  const handleEditRole = async (memberId: string) => {
    try {
      const res = await privacyFetch(`/api/privacy/team/${memberId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: editRole }),
      });
      if (!res.ok) throw new Error('Failed to update role');
      setMembers(prev => prev.map(m => m.id === memberId ? { ...m, role: editRole } : m));
      showToast('Role updated');
      setEditingId(null);
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  };

  const handleRemove = async (memberId: string, email: string) => {
    if (!confirm(`Remove ${email} from the organization?`)) return;
    try {
      const res = await privacyFetch(`/api/privacy/team/${memberId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to remove member');
      setMembers(prev => prev.filter(m => m.id !== memberId));
      showToast('Member removed');
    } catch (e: any) {
      showToast(e.message, 'error');
    }
  };

  const handleSaveOrgName = async () => {
    if (!orgNameDraft.trim()) return;
    setSavingOrg(true);
    try {
      const res = await privacyFetch('/api/privacy/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ org_name: orgNameDraft.trim() }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setOrg(prev => prev ? { ...prev, name: orgNameDraft.trim() } : prev);
      setEditingOrgName(false);
      showToast('Organization name saved');
    } catch (e: any) {
      showToast(e.message, 'error');
    } finally {
      setSavingOrg(false);
    }
  };

  const dbPct = org ? Math.round((org.db_used / org.db_limit) * 100) : 0;
  const jobsPct = org ? Math.round((org.jobs_used / org.jobs_limit) * 100) : 0;
  const storagePct = org ? Math.round((org.storage_used_gb / org.storage_limit_gb) * 100) : 0;

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-[50vh] gap-3 text-red-500">
      <AlertCircle className="w-6 h-6" />
      <span>{error}</span>
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Organization</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage members and view organization usage.</p>
        </div>
        <button
          onClick={() => { setOrgNameDraft(org?.name ?? ''); setEditingOrgName(true); }}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <Settings className="h-4 w-4" /> Org Settings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Org card */}
        <motion.div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
              <Building2 className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-500">Organization</p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">{org?.name}</h3>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/50 flex justify-between items-center">
            <span className="text-sm text-slate-500">Plan</span>
            <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-xs font-medium uppercase tracking-wider text-slate-600 dark:text-slate-300">{org?.plan}</span>
          </div>
        </motion.div>

        {/* Usage card */}
        <motion.div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 md:col-span-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Usage This Month</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { icon: Database, label: 'Databases', used: org?.db_used ?? 0, limit: org?.db_limit ?? 0, pct: dbPct, color: 'bg-emerald-500' },
              { icon: Zap, label: 'Jobs Run', used: org?.jobs_used ?? 0, limit: org?.jobs_limit ?? 0, pct: jobsPct, color: 'bg-blue-500' },
              { icon: HardDrive, label: 'Storage', used: `${org?.storage_used_gb ?? 0} GB`, limit: `${org?.storage_limit_gb ?? 0} GB`, pct: storagePct, color: 'bg-violet-500' },
            ].map(({ icon: Icon, label, used, limit, pct, color }) => (
              <div key={label} className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-500">
                  <Icon className="h-4 w-4" /> {label}
                </div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {used}<span className="text-sm font-normal text-slate-400">/{limit}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${color} transition-all`} style={{ width: `${Math.min(pct, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Members table */}
      <motion.div className="glass-panel rounded-2xl overflow-hidden dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-[#0f1523]">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <Users className="h-5 w-5 text-violet-500" /> Members ({members.length})
          </h2>
          <button onClick={() => setShowInvite(true)} className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 flex items-center gap-2 transition-colors">
            <UserPlus className="w-4 h-4" /> Invite Member
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50">
              <tr>
                <th className="p-4 font-medium text-slate-500">Member</th>
                <th className="p-4 font-medium text-slate-500">Role</th>
                <th className="p-4 font-medium text-slate-500">Status</th>
                <th className="p-4 font-medium text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {members.length === 0 ? (
                <tr><td colSpan={4} className="p-8 text-center text-slate-400 text-sm">No team members yet. Invite someone to get started.</td></tr>
              ) : members.map(m => (
                <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="p-4">
                    <div className="font-medium text-slate-900 dark:text-white">{m.name}</div>
                    <div className="text-slate-500 text-xs">{m.email}</div>
                  </td>
                  <td className="p-4">
                    {editingId === m.id ? (
                      <select value={editRole} onChange={e => setEditRole(e.target.value as Role)} className="text-xs border border-slate-300 dark:border-slate-600 rounded-lg px-2 py-1 bg-white dark:bg-slate-800 dark:text-white">
                        {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                    ) : (
                      <span className="text-slate-600 dark:text-slate-400">{m.role}</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${
                      m.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}>{m.status}</span>
                  </td>
                  <td className="p-4 text-right">
                    {editingId === m.id ? (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleEditRole(m.id)} className="text-xs px-3 py-1 bg-violet-600 text-white rounded-lg hover:bg-violet-700">Save</button>
                        <button onClick={() => setEditingId(null)} className="text-xs px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-400">Cancel</button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <button onClick={() => { setEditingId(m.id); setEditRole(m.role); }} className="text-slate-400 hover:text-violet-600 transition-colors p-1.5 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20" title="Edit role">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleRemove(m.id, m.email)} className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20" title="Remove">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 w-full max-w-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Invite Team Member</h2>
              <button onClick={() => setShowInvite(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input type="email" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} placeholder="colleague@company.com" className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Role</label>
                <select value={inviteRole} onChange={e => setInviteRole(e.target.value as Role)} className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500">
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowInvite(false)} className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 text-sm">Cancel</button>
                <button onClick={handleInvite} disabled={inviting || !inviteEmail} className="flex-1 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2">
                  {inviting ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />} Send Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Org Name Edit Modal */}
      {editingOrgName && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-8 w-full max-w-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Organization Settings</h2>
              <button onClick={() => setEditingOrgName(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Organization name</label>
                <input type="text" value={orgNameDraft} onChange={e => setOrgNameDraft(e.target.value)} className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div className="flex gap-3">
                <button onClick={() => setEditingOrgName(false)} className="flex-1 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-400 text-sm">Cancel</button>
                <button onClick={handleSaveOrgName} disabled={savingOrg} className="flex-1 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold disabled:opacity-50">
                  {savingOrg ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`fixed bottom-4 right-4 px-6 py-3 rounded-xl shadow-lg text-white font-medium flex items-center gap-2 animate-in slide-in-from-bottom-4 ${
          toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
        }`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
