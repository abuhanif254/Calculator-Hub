"use client";
export const runtime = 'edge';
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';
import { Trash2, Plus, RefreshCw, X, CheckCircle, XCircle, Copy, AlertTriangle } from 'lucide-react';

interface Webhook {
  id: string;
  url: string;
  events: string[];
  is_active: boolean;
  last_triggered_at: string | null;
  last_status_code: number | null;
  created_at: string;
}

const AVAILABLE_EVENTS = [
  { id: 'job.completed', label: 'Job Completed' },
  { id: 'scan.finished', label: 'Scan Finished' },
  { id: 'finding.critical', label: 'Critical Finding Detected' },
  { id: 'rule.created', label: 'Masking Rule Created' },
  { id: 'rule.deleted', label: 'Masking Rule Deleted' }
];

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ url: '', events: [] as string[] });
  const [saving, setSaving] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<Record<string, { status: number, success: boolean }>>({});
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [revealSecret, setRevealSecret] = useState<{ id: string, secret: string } | null>(null);
  const [toast, setToast] = useState<{ msg: string, type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchWebhooks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await privacyFetch('/api/privacy/webhooks');
      if (!res.ok) throw new Error('Failed to fetch webhooks');
      const data = await res.json();
      setWebhooks(data.webhooks || []);
    } catch (err) {
      showToast('Error loading webhooks', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWebhooks();
  }, [fetchWebhooks]);

  const handleAdd = async () => {
    if (!form.url) {
      showToast('URL is required', 'error');
      return;
    }
    if (form.events.length === 0) {
      showToast('Select at least one event', 'error');
      return;
    }

    try {
      setSaving(true);
      const res = await privacyFetch('/api/privacy/webhooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Failed to add webhook');
      const data = await res.json();
      setWebhooks([data.webhook, ...webhooks]);
      setShowAddModal(false);
      setForm({ url: '', events: [] });
      if (data.webhook.signing_secret) {
        setRevealSecret({ id: data.webhook.id, secret: data.webhook.signing_secret });
      } else {
        showToast('Webhook added successfully');
      }
    } catch (err) {
      showToast('Error adding webhook', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (webhook: Webhook) => {
    const originalState = webhook.is_active;
    setWebhooks(prev => prev.map(w => w.id === webhook.id ? { ...w, is_active: !originalState } : w));
    try {
      const res = await privacyFetch(`/api/privacy/webhooks/${webhook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !originalState })
      });
      if (!res.ok) throw new Error('Failed to update status');
      showToast(originalState ? 'Webhook disabled' : 'Webhook enabled');
    } catch (err) {
      showToast('Error updating status', 'error');
      setWebhooks(prev => prev.map(w => w.id === webhook.id ? { ...w, is_active: originalState } : w));
    }
  };

  const handleTest = async (id: string) => {
    try {
      setTestingId(id);
      const res = await privacyFetch(`/api/privacy/webhooks/${id}/test`, { method: 'POST' });
      const data = await res.json();
      setTestResults(prev => ({ ...prev, [id]: { status: data.status, success: data.success } }));
      if (data.success) {
        showToast('Test successful');
      } else {
        showToast(`Test failed with status ${data.status}`, 'error');
      }
    } catch (err) {
      setTestResults(prev => ({ ...prev, [id]: { status: 500, success: false } }));
      showToast('Error testing webhook', 'error');
    } finally {
      setTestingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setDeleting(true);
      const res = await privacyFetch(`/api/privacy/webhooks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete webhook');
      setWebhooks(prev => prev.filter(w => w.id !== id));
      showToast('Webhook deleted');
      setDeleteConfirmId(null);
    } catch (err) {
      showToast('Error deleting webhook', 'error');
    } finally {
      setDeleting(false);
    }
  };

  const toggleEvent = (eventId: string) => {
    setForm(prev => {
      const events = prev.events.includes(eventId)
        ? prev.events.filter(e => e !== eventId)
        : [...prev.events, eventId];
      return { ...prev, events };
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Webhooks</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Receive real-time HTTP notifications for platform events.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Webhook
        </button>
      </div>

      <AnimatePresence>
        {revealSecret && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 flex gap-4"
          >
            <AlertTriangle className="text-amber-500 w-6 h-6 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-400">Webhook created successfully</h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                Please copy your signing secret now. You will not be able to see it again. Use it to verify incoming webhook payloads.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <code className="px-3 py-1.5 bg-white dark:bg-black/40 rounded border border-amber-200 dark:border-amber-500/30 text-slate-900 dark:text-amber-100 font-mono text-sm select-all">
                  {revealSecret.secret}
                </code>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(revealSecret.secret);
                    showToast('Secret copied to clipboard');
                  }}
                  className="p-1.5 text-amber-700 dark:text-amber-400 hover:bg-amber-200 dark:hover:bg-amber-500/20 rounded-md transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button 
              onClick={() => setRevealSecret(null)}
              className="text-amber-700 dark:text-amber-400 p-1 hover:bg-amber-200 dark:hover:bg-amber-500/20 rounded-md h-fit"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass-panel rounded-2xl dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500">
            <tr>
              <th className="p-4 font-medium">URL / Endpoint</th>
              <th className="p-4 font-medium">Events</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Last Triggered</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {loading ? (
              [1, 2, 3].map(i => (
                <tr key={i} className="animate-pulse bg-white dark:bg-[#0B1120]">
                  <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-48"></div></td>
                  <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-24"></div></td>
                  <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16"></div></td>
                  <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-20"></div></td>
                  <td className="p-4"><div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-16 ml-auto"></div></td>
                </tr>
              ))
            ) : webhooks.length === 0 ? (
              <tr className="bg-white dark:bg-[#0B1120]">
                <td colSpan={5} className="p-8 text-center text-slate-500">
                  No webhooks configured. Click "Add Webhook" to create one.
                </td>
              </tr>
            ) : (
              webhooks.map((webhook) => (
                <tr key={webhook.id} className="bg-white dark:bg-[#0B1120]">
                  <td className="p-4 font-medium text-slate-900 dark:text-white break-all max-w-xs">
                    {webhook.url}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.map(ev => (
                        <span key={ev} className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                          {ev}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleToggleStatus(webhook)}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${webhook.is_active ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${webhook.is_active ? 'translate-x-4' : 'translate-x-1'}`} />
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="text-slate-500">
                        {webhook.last_triggered_at ? new Date(webhook.last_triggered_at).toLocaleString() : 'Never'}
                      </span>
                      {webhook.last_status_code && (
                        <span className={`text-xs mt-0.5 ${webhook.last_status_code >= 200 && webhook.last_status_code < 300 ? 'text-emerald-500' : 'text-red-500'}`}>
                          Status: {webhook.last_status_code}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <div className="flex items-center">
                        {testResults[webhook.id] && (
                          <span className="mr-2 flex items-center">
                            {testResults[webhook.id].success ? (
                              <CheckCircle className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                          </span>
                        )}
                        <button 
                          onClick={() => handleTest(webhook.id)}
                          disabled={testingId === webhook.id}
                          className="text-slate-500 hover:text-violet-500 font-medium text-xs flex items-center disabled:opacity-50"
                        >
                          {testingId === webhook.id ? <RefreshCw className="w-3 h-3 animate-spin" /> : 'Test'}
                        </button>
                      </div>
                      
                      {deleteConfirmId === webhook.id ? (
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleDelete(webhook.id)}
                            disabled={deleting}
                            className="text-red-500 font-medium text-xs hover:underline disabled:opacity-50"
                          >
                            {deleting ? '...' : 'Sure?'}
                          </button>
                          <button 
                            onClick={() => setDeleteConfirmId(null)}
                            disabled={deleting}
                            className="text-slate-500 font-medium text-xs hover:underline disabled:opacity-50"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => setDeleteConfirmId(webhook.id)}
                          className="text-slate-500 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 w-full max-w-md shadow-xl"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Add Webhook</h3>
                <button onClick={() => setShowAddModal(false)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Payload URL
                  </label>
                  <input
                    type="url"
                    value={form.url}
                    onChange={e => setForm({ ...form, url: e.target.value })}
                    placeholder="https://example.com/webhook"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Events to send
                  </label>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {AVAILABLE_EVENTS.map(ev => (
                      <label key={ev.id} className="flex items-start gap-3 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.events.includes(ev.id)}
                          onChange={() => toggleEvent(ev.id)}
                          className="mt-1 rounded text-violet-600 focus:ring-violet-500 bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                        />
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{ev.label}</p>
                          <p className="text-xs text-slate-500">{ev.id}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAdd}
                    disabled={saving}
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : 'Add Webhook'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg text-white font-medium text-sm flex items-center gap-2 z-50 ${
              toast.type === 'error' ? 'bg-red-600' : 'bg-emerald-600'
            }`}
          >
            {toast.type === 'error' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
