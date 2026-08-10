"use client";
export const runtime = 'edge';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';
import { Copy, Plus, Trash2, Key, ShieldAlert, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';

interface ApiKey {
  id: string;
  name: string;
  key_prefix: string;
  permissions: { read: boolean; write: boolean; admin: boolean };
  last_used_at: string | null;
  expires_at: string | null;
  created_at: string;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyPerms, setNewKeyPerms] = useState({ read: true, write: false, admin: false });
  const [creating, setCreating] = useState(false);
  
  const [createdKey, setCreatedKey] = useState<(ApiKey & { full_key: string }) | null>(null);
  
  const [revokeConfirmId, setRevokeConfirmId] = useState<string | null>(null);
  const [revoking, setRevoking] = useState(false);
  
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchKeys = useCallback(async () => {
    try {
      setLoading(true);
      const res = await privacyFetch('/api/privacy/api-keys');
      if (!res.ok) throw new Error('Failed to fetch keys');
      const data = await res.json();
      setKeys(data.keys || []);
    } catch (err) {
      showToast('Failed to load API keys', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  const handleCreate = async () => {
    if (!newKeyName.trim()) {
      showToast('Key name is required', 'error');
      return;
    }
    
    try {
      setCreating(true);
      const res = await privacyFetch('/api/privacy/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName, permissions: newKeyPerms })
      });
      
      if (!res.ok) throw new Error('Failed to create key');
      
      const data = await res.json();
      setCreatedKey(data.key);
      setKeys(prev => [data.key, ...prev]);
      showToast('API Key created successfully', 'success');
    } catch (err) {
      showToast('Failed to create API key', 'error');
    } finally {
      setCreating(false);
    }
  };

  const handleRevoke = async (id: string) => {
    try {
      setRevoking(true);
      const res = await privacyFetch(`/api/privacy/api-keys/${id}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to revoke key');
      
      setKeys(prev => prev.filter(k => k.id !== id));
      showToast('API Key revoked', 'success');
      setRevokeConfirmId(null);
    } catch (err) {
      showToast('Failed to revoke API key', 'error');
    } finally {
      setRevoking(false);
    }
  };

  const copyToClipboard = () => {
    if (createdKey?.full_key) {
      navigator.clipboard.writeText(createdKey.full_key);
      showToast('Copied!', 'success');
    }
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewKeyName('');
    setNewKeyPerms({ read: true, write: false, admin: false });
    setCreatedKey(null);
  };

  const renderPermissions = (perms: { read: boolean; write: boolean; admin: boolean }) => {
    if (perms.admin) {
      return <span className="px-2 py-1 bg-violet-500/10 text-violet-600 rounded text-xs font-medium">Full Access</span>;
    }
    const parts = [];
    if (perms.read) parts.push('Read');
    if (perms.write) parts.push('Write');
    if (parts.length === 0) return <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded text-xs font-medium">None</span>;
    return <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs font-medium">{parts.join(' / ')}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">API Keys</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage programmatic access to the platform.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <Plus className="w-4 h-4" /> Create API Key
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel rounded-xl p-5 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10">
          <div className="text-sm font-medium text-slate-500 mb-1">Total API Keys</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {loading ? <Loader2 className="w-6 h-6 animate-spin text-slate-400" /> : keys.length}
          </div>
        </div>
        <div className="glass-panel rounded-xl p-5 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 md:col-span-2">
          <div className="text-sm font-medium text-slate-500 mb-1">Keys Active This Month</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {loading ? <Loader2 className="w-6 h-6 animate-spin text-slate-400" /> : (
              <>{keys.filter(k => k.last_used_at && new Date(k.last_used_at) > new Date(new Date().getFullYear(), new Date().getMonth(), 1)).length}
              <span className="text-sm font-normal text-slate-500"> / {keys.length} total keys</span></>
            )}
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-violet-600 transition-all" style={{
              width: keys.length > 0
                ? `${Math.round((keys.filter(k => k.last_used_at && new Date(k.last_used_at) > new Date(new Date().getFullYear(), new Date().getMonth(), 1)).length / keys.length) * 100)}%`
                : '0%'
            }} />
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500">
              <tr>
                <th className="p-4 font-medium">Key Name</th>
                <th className="p-4 font-medium">Prefix</th>
                <th className="p-4 font-medium">Permissions</th>
                <th className="p-4 font-medium">Created</th>
                <th className="p-4 font-medium">Last Used</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="bg-white dark:bg-[#0B1120] animate-pulse">
                    <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24"></div></td>
                    <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-32"></div></td>
                    <td className="p-4"><div className="h-5 bg-slate-200 dark:bg-slate-800 rounded w-16"></div></td>
                    <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div></td>
                    <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div></td>
                    <td className="p-4 text-right"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-12 ml-auto"></div></td>
                  </tr>
                ))
              ) : keys.length === 0 ? (
                <tr className="bg-white dark:bg-[#0B1120]">
                  <td colSpan={6} className="p-8 text-center text-slate-500">
                    No API keys found. Create one to get started.
                  </td>
                </tr>
              ) : (
                keys.map((key) => (
                  <tr key={key.id} className="bg-white dark:bg-[#0B1120] group">
                    <td className="p-4 font-medium text-slate-900 dark:text-white">{key.name}</td>
                    <td className="p-4 font-mono text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <Key className="w-3 h-3" />
                      {key.key_prefix}***
                    </td>
                    <td className="p-4">{renderPermissions(key.permissions)}</td>
                    <td className="p-4 text-slate-500">
                      {new Date(key.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-slate-500">
                      {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="p-4 text-right">
                      {revokeConfirmId === key.id ? (
                        <div className="flex items-center justify-end gap-2">
                          <span className="text-xs text-slate-500">Sure?</span>
                          <button
                            onClick={() => setRevokeConfirmId(null)}
                            disabled={revoking}
                            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleRevoke(key.id)}
                            disabled={revoking}
                            className="text-white hover:bg-red-600 text-xs font-medium px-2 py-1 bg-red-500 rounded flex items-center gap-1"
                          >
                            {revoking && <Loader2 className="w-3 h-3 animate-spin" />}
                            Confirm
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setRevokeConfirmId(key.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-500/10 opacity-0 group-hover:opacity-100"
                          title="Revoke Key"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-panel rounded-2xl w-full max-w-md p-6 dark:bg-[#0B1120] border border-slate-200 dark:border-white/10 shadow-2xl relative"
            >
              <button 
                onClick={closeCreateModal}
                className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Create New API Key</h2>
              
              {!createdKey ? (
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Key Name</label>
                    <input 
                      type="text" 
                      value={newKeyName}
                      onChange={e => setNewKeyName(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-[#090E17] border border-slate-300 dark:border-slate-700 focus:border-violet-500 dark:focus:border-violet-500 focus:ring-1 focus:ring-violet-500 rounded-lg text-slate-900 dark:text-white outline-none transition-all" 
                      placeholder="e.g. Data Pipeline" 
                      autoFocus
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Permissions</label>
                    <div className="space-y-3 bg-slate-50 dark:bg-[#090E17] p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={newKeyPerms.read}
                          onChange={e => setNewKeyPerms(p => ({ ...p, read: e.target.checked }))}
                          className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-600 dark:border-slate-600 dark:bg-slate-700" 
                        /> 
                        <span className="text-sm text-slate-700 dark:text-slate-300">Read Data</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={newKeyPerms.write}
                          onChange={e => setNewKeyPerms(p => ({ ...p, write: e.target.checked }))}
                          className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-600 dark:border-slate-600 dark:bg-slate-700" 
                        /> 
                        <span className="text-sm text-slate-700 dark:text-slate-300">Write Data</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={newKeyPerms.admin}
                          onChange={e => {
                            const admin = e.target.checked;
                            setNewKeyPerms(admin ? { read: true, write: true, admin: true } : { read: true, write: false, admin: false });
                          }}
                          className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-600 dark:border-slate-600 dark:bg-slate-700" 
                        /> 
                        <span className="text-sm text-slate-700 dark:text-slate-300">Admin (Full Access)</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 mt-8">
                    <button onClick={closeCreateModal} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                      Cancel
                    </button>
                    <button 
                      onClick={handleCreate} 
                      disabled={creating || !newKeyName.trim()}
                      className="px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      {creating && <Loader2 className="w-4 h-4 animate-spin" />}
                      Generate Key
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0" />
                    <div className="text-sm text-amber-800 dark:text-amber-400">
                      <strong className="block mb-1">Copy this key now</strong>
                      It won't be shown again after you close this window for security reasons.
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your new API key</label>
                    <div className="flex items-center gap-2">
                      <input 
                        type="text" 
                        readOnly 
                        value={createdKey.full_key} 
                        className="w-full px-3 py-2.5 bg-slate-50 dark:bg-[#090E17] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-sm outline-none" 
                      />
                      <button 
                        onClick={copyToClipboard}
                        className="p-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors flex items-center justify-center"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-8">
                    <button 
                      onClick={closeCreateModal} 
                      className="w-full px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 rounded-lg text-sm font-medium transition-colors"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border ${
              toast.type === 'success' 
                ? 'bg-green-50/90 dark:bg-green-900/20 border-green-200 dark:border-green-900/50 text-green-800 dark:text-green-300' 
                : 'bg-red-50/90 dark:bg-red-900/20 border-red-200 dark:border-red-900/50 text-red-800 dark:text-red-300'
            } backdrop-blur-md`}
            >
              {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <span className="text-sm font-medium">{toast.msg}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
