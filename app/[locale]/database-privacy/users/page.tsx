"use client";
export const runtime = 'edge';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';
import { X, Check, Edit2, Trash2, Loader2 } from 'lucide-react';

interface TeamMember {
  id: string;
  email: string;
  display_name: string | null;
  role: 'admin' | 'compliance_officer' | 'developer' | 'viewer';
  status: 'active' | 'invited' | 'suspended';
  invited_at: string;
  joined_at: string | null;
}

const roleLabels: Record<string, string> = {
  admin: 'Admin',
  compliance_officer: 'Compliance Officer',
  developer: 'Developer',
  viewer: 'Viewer'
};

export default function UsersPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Invite Modal State
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('developer');
  const [inviting, setInviting] = useState(false);

  // Edit State
  const [editMember, setEditMember] = useState<TeamMember | null>(null);
  const [editRole, setEditRole] = useState<string>('');
  const [saving, setSaving] = useState(false);

  // Remove State
  const [removeConfirmId, setRemoveConfirmId] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await privacyFetch('/api/privacy/team');
      if (!res.ok) throw new Error('Failed to fetch members');
      const data = await res.json();
      setMembers(data.members || []);
    } catch (err) {
      showToast('Failed to load members', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setInviting(true);
    try {
      const res = await privacyFetch('/api/privacy/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail, role: inviteRole }),
      });
      if (!res.ok) throw new Error('Failed to invite member');
      
      showToast('Member invited successfully', 'success');
      setShowInviteModal(false);
      setInviteEmail('');
      setInviteRole('developer');
      fetchMembers(); // Re-fetch to update the list
    } catch (err) {
      showToast('Error inviting member', 'error');
    } finally {
      setInviting(false);
    }
  };

  const handleSaveRole = async (id: string) => {
    setSaving(true);
    try {
      const res = await privacyFetch(`/api/privacy/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: editRole }),
      });
      if (!res.ok) throw new Error('Failed to update role');
      
      setMembers(prev => prev.map(m => m.id === id ? { ...m, role: editRole as TeamMember['role'] } : m));
      showToast('Role updated', 'success');
      setEditMember(null);
    } catch (err) {
      showToast('Error updating role', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (id: string) => {
    setRemoving(true);
    try {
      const res = await privacyFetch(`/api/privacy/team/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to remove member');
      
      setMembers(prev => prev.filter(m => m.id !== id));
      showToast('Member removed', 'success');
      setRemoveConfirmId(null);
    } catch (err) {
      showToast('Error removing member', 'error');
    } finally {
      setRemoving(false);
    }
  };

  const getInitials = (name: string | null, email: string) => {
    if (name) {
      const parts = name.trim().split(' ');
      if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
      return name.substring(0, 2).toUpperCase();
    }
    return email.charAt(0).toUpperCase();
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-violet-500';
      case 'compliance_officer': return 'bg-emerald-500';
      case 'developer': return 'bg-blue-500';
      case 'viewer': return 'bg-slate-500';
      default: return 'bg-slate-500';
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateString));
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Team Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage users, roles, and access controls.</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
        >
          Invite Member
        </button>
      </div>

      <div className="glass-panel rounded-2xl dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500">
            <tr>
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Last Active</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i} className="bg-white dark:bg-[#0B1120]">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
                      <div className="space-y-2">
                        <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                        <div className="h-3 w-32 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4"><div className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div></td>
                  <td className="p-4"><div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div></td>
                  <td className="p-4"><div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded animate-pulse"></div></td>
                  <td className="p-4"></td>
                </tr>
              ))
            ) : members.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-500 dark:text-slate-400">
                  No team members found.
                </td>
              </tr>
            ) : (
              members.map(user => (
                <tr key={user.id} className="bg-white dark:bg-[#0B1120]">
                  <td className="p-4 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${getRoleColor(user.role)} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                      {getInitials(user.display_name, user.email)}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">
                        {user.display_name || 'No Name'}
                      </div>
                      <div className="text-xs text-slate-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="p-4">
                    {editMember?.id === user.id ? (
                      <select 
                        value={editRole}
                        onChange={(e) => setEditRole(e.target.value)}
                        className="bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white rounded px-2 py-1 text-sm focus:ring-violet-500 focus:border-violet-500"
                        disabled={saving}
                      >
                        <option value="admin">Admin</option>
                        <option value="compliance_officer">Compliance Officer</option>
                        <option value="developer">Developer</option>
                        <option value="viewer">Viewer</option>
                      </select>
                    ) : (
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs inline-block">
                        {roleLabels[user.role] || user.role}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {user.status === 'active' && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/30">Active</span>}
                    {user.status === 'invited' && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/30">Pending</span>}
                    {user.status === 'suspended' && <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border border-red-200 dark:border-red-800/30">Suspended</span>}
                  </td>
                  <td className="p-4 text-slate-500 text-xs">
                    {user.status === 'invited' ? `Invited ${formatDate(user.invited_at)}` : `Joined ${formatDate(user.joined_at)}`}
                  </td>
                  <td className="p-4 text-right">
                    {removeConfirmId === user.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-red-500 font-medium">Remove?</span>
                        <button 
                          onClick={() => handleRemove(user.id)}
                          disabled={removing}
                          className="p-1 text-white bg-red-500 hover:bg-red-600 rounded disabled:opacity-50"
                        >
                          {removing ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                        </button>
                        <button 
                          onClick={() => setRemoveConfirmId(null)}
                          disabled={removing}
                          className="p-1 text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded disabled:opacity-50"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : editMember?.id === user.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleSaveRole(user.id)}
                          disabled={saving}
                          className="px-2 py-1 text-xs font-medium text-white bg-violet-600 hover:bg-violet-700 rounded disabled:opacity-50 flex items-center gap-1"
                        >
                          {saving && <Loader2 className="w-3 h-3 animate-spin" />} Save
                        </button>
                        <button 
                          onClick={() => setEditMember(null)}
                          disabled={saving}
                          className="px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded disabled:opacity-50"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => { setEditMember(user); setEditRole(user.role); setRemoveConfirmId(null); }}
                          className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                          title="Edit role"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => { setRemoveConfirmId(user.id); setEditMember(null); }}
                          className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          title="Remove user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-white/10 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Invite Team Member</h3>
                <button 
                  onClick={() => setShowInviteModal(false)}
                  className="text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleInvite} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                    placeholder="colleague@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Role</label>
                  <select 
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="admin">Admin</option>
                    <option value="compliance_officer">Compliance Officer</option>
                    <option value="developer">Developer</option>
                    <option value="viewer">Viewer</option>
                  </select>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={inviting}
                    className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {inviting && <Loader2 className="w-4 h-4 animate-spin" />}
                    Send Invite
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 right-6 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 border ${
              toast.type === 'success' 
                ? 'bg-emerald-50 dark:bg-emerald-900/50 border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300'
                : 'bg-red-50 dark:bg-red-900/50 border-red-200 dark:border-red-800/50 text-red-800 dark:text-red-300'
            }`}
          >
            {toast.type === 'success' ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
            <span className="font-medium text-sm">{toast.msg}</span>
            <button onClick={() => setToast(null)} className="ml-2 opacity-70 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
