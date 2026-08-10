"use client";
export const runtime = 'edge';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';
import { Eye, EyeOff, Lock, Plus, Trash, Edit, AlertCircle, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';

interface Secret {
  id: string;
  name: string;
  type: 'connection_string' | 'api_credential' | 'certificate' | 'generic';
  rotation_reminder_days: number;
  last_rotated_at: string;
  created_at: string;
}

const TYPE_LABELS: Record<Secret['type'], string> = {
  connection_string: 'Connection String',
  api_credential: 'API Credential',
  certificate: 'Certificate',
  generic: 'Generic'
};

export default function SecretsPage() {
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [editSecret, setEditSecret] = useState<Secret | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  
  const [revealedValues, setRevealedValues] = useState<Record<string, string>>({});
  const [revealing, setRevealing] = useState<string | null>(null);
  
  const [form, setForm] = useState({
    name: '',
    type: 'connection_string' as Secret['type'],
    value: '',
    rotation_reminder_days: 30
  });
  
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = useCallback((msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const fetchSecrets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await privacyFetch('/api/privacy/secrets');
      if (!res.ok) throw new Error('Failed to fetch secrets');
      const data = await res.json();
      setSecrets(data.secrets || []);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSecrets();
  }, [fetchSecrets]);

  const handleReveal = async (id: string) => {
    if (revealedValues[id]) {
      // Hide if already revealed
      setRevealedValues(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      return;
    }

    setRevealing(id);
    try {
      const res = await privacyFetch(`/api/privacy/secrets/${id}`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to decrypt secret');
      const data = await res.json();
      setRevealedValues(prev => ({ ...prev, [id]: data.value }));
    } catch (err: any) {
      showToast(err.message || 'Failed to decrypt', 'error');
    } finally {
      setRevealing(null);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editSecret ? `/api/privacy/secrets/${editSecret.id}` : '/api/privacy/secrets';
      const method = editSecret ? 'PUT' : 'POST';
      
      const payload: any = { ...form };
      if (editSecret && !payload.value) {
        delete payload.value;
      }
      
      const res = await privacyFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error(editSecret ? 'Failed to update secret' : 'Failed to add secret');
      
      await fetchSecrets();
      showToast(editSecret ? 'Secret updated' : 'Secret added', 'success');
      closeModal();
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    try {
      const res = await privacyFetch(`/api/privacy/secrets/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete secret');
      
      setSecrets(prev => prev.filter(s => s.id !== id));
      showToast('Secret deleted', 'success');
    } catch (err: any) {
      showToast(err.message, 'error');
    } finally {
      setDeleting(false);
      setDeleteConfirmId(null);
    }
  };

  const openAddModal = () => {
    setForm({ name: '', type: 'connection_string', value: '', rotation_reminder_days: 30 });
    setEditSecret(null);
    setShowAddModal(true);
  };

  const openEditModal = (secret: Secret) => {
    setForm({
      name: secret.name,
      type: secret.type,
      value: '', // Don't pre-fill value, only update if typed
      rotation_reminder_days: secret.rotation_reminder_days
    });
    setEditSecret(secret);
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditSecret(null);
  };

  const getDaysSinceRotation = (lastRotated: string) => {
    return Math.floor((Date.now() - new Date(lastRotated).getTime()) / 86400000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Secrets Manager</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">AES-256-GCM Encrypted Vault for connection strings and credentials.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Secret
        </button>
      </div>

      <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/30">
        <div className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-emerald-500" />
          <div>
            <h3 className="font-bold text-emerald-800 dark:text-emerald-400">Vault is active and secured</h3>
            <p className="text-sm text-emerald-600 dark:text-emerald-500/70">All secrets are encrypted at rest using AES-256-GCM.</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-panel rounded-xl p-5 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 h-32">
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="p-6 text-center glass-panel rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <h3 className="text-red-800 dark:text-red-400 font-medium">{error}</h3>
          <button 
            onClick={fetchSecrets}
            className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg mx-auto transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {secrets.length === 0 ? (
            <div className="col-span-1 md:col-span-2 text-center p-8 text-slate-500 glass-panel rounded-xl dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10">
              No secrets found. Add your first secret to get started.
            </div>
          ) : (
            secrets.map(secret => {
              const daysSinceRotation = getDaysSinceRotation(secret.last_rotated_at);
              const needsRotation = daysSinceRotation > secret.rotation_reminder_days;
              const isRevealed = !!revealedValues[secret.id];
              const displayValue = isRevealed ? revealedValues[secret.id] : '************************';
              
              return (
                <div key={secret.id} className="glass-panel rounded-xl p-5 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 flex flex-col justify-between h-full">
                  <div className="flex items-start justify-between">
                    <div className="w-full">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-slate-900 dark:text-white font-mono truncate" title={secret.name}>{secret.name}</h3>
                        {needsRotation && (
                          <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" title={`Needs rotation (${daysSinceRotation} days old)`}></span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mb-3">{TYPE_LABELS[secret.type]} • Updated {new Date(secret.last_rotated_at).toLocaleDateString()}</p>
                      
                      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded p-2 mb-4 w-full">
                        <input 
                          type={isRevealed ? "text" : "password"} 
                          value={displayValue} 
                          readOnly 
                          className="bg-transparent border-none text-slate-600 dark:text-slate-400 text-sm focus:outline-none flex-1 font-mono w-full min-w-0" 
                        />
                        <button 
                          onClick={() => handleReveal(secret.id)}
                          disabled={revealing === secret.id}
                          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 disabled:opacity-50 flex-shrink-0"
                        >
                          {revealing === secret.id ? <Loader2 className="w-4 h-4 animate-spin" /> : (isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />)}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 border-t border-slate-200 dark:border-white/10 pt-3 mt-auto">
                    {deleteConfirmId === secret.id ? (
                      <div className="flex items-center gap-2 w-full justify-between">
                        <span className="text-xs text-red-500 font-medium">Confirm delete?</span>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => setDeleteConfirmId(null)}
                            disabled={deleting}
                            className="text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors px-2 py-1"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={() => handleDelete(secret.id)}
                            disabled={deleting}
                            className="text-xs font-medium bg-red-500 hover:bg-red-600 text-white rounded px-2 py-1 transition-colors flex items-center gap-1"
                          >
                            {deleting ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Delete'}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <button 
                          onClick={() => openEditModal(secret)}
                          className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-violet-500 transition-colors"
                        >
                          <Edit className="w-3 h-3" /> Edit
                        </button>
                        <button 
                          onClick={() => setDeleteConfirmId(secret.id)}
                          className="flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-red-500 transition-colors"
                        >
                          <Trash className="w-3 h-3" /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#0F172A] rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                {editSecret ? 'Edit Secret' : 'Add Secret'}
              </h2>
              
              <form onSubmit={handleSave} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white"
                    placeholder="e.g. prod-db-url"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value as Secret['type'] })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white"
                  >
                    {Object.entries(TYPE_LABELS).map(([val, label]) => (
                      <option key={val} value={val}>{label}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Value {editSecret && <span className="text-slate-500 font-normal">(Leave blank to keep unchanged)</span>}
                  </label>
                  <textarea
                    required={!editSecret}
                    value={form.value}
                    onChange={e => setForm({ ...form, value: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white font-mono text-sm"
                    rows={3}
                    placeholder="Secret value..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Rotation Reminder (days)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={form.rotation_reminder_days}
                    onChange={e => setForm({ ...form, rotation_reminder_days: parseInt(e.target.value) || 30 })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-slate-900 dark:text-white"
                  />
                </div>
                
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
                  >
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    Save Secret
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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 p-4 rounded-xl shadow-lg flex items-center gap-3 z-50 ${
              toast.type === 'error' 
                ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
            }`}
          >
            {toast.type === 'error' ? <AlertCircle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
            <p className="font-medium">{toast.msg}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
