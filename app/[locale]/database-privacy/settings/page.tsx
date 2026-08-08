"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, AlertCircle, CheckCircle, RefreshCw } from 'lucide-react';

interface PlatformSettings {
  platform_name: string;
  timezone: string;
  require_mfa: boolean;
  ip_allowlist: string | null;
  notify_scan_complete: boolean;
  notify_critical_findings: boolean;
  notify_job_failed: boolean;
  data_retention_days: number;
}

type TabKey = 'General' | 'Security' | 'Notifications' | 'Data Retention';

const Toggle = ({ checked, onChange }: { checked: boolean; onChange: (c: boolean) => void }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`w-12 h-6 rounded-full relative transition-colors ${checked ? 'bg-violet-600' : 'bg-slate-300 dark:bg-slate-600'}`}
  >
    <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${checked ? 'left-7' : 'left-1'}`} />
  </button>
);

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('General');
  const [settings, setSettings] = useState<PlatformSettings | null>(null);
  const [form, setForm] = useState<PlatformSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/privacy/settings');
      if (!res.ok) throw new Error('Failed to load settings');
      const data = await res.json();
      setSettings(data.settings);
      setForm(data.settings);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    try {
      const res = await fetch('/api/privacy/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to save settings');
      const data = await res.json();
      setSettings(data.settings || form);
      setToast({ msg: 'Settings saved successfully', type: 'success' });
    } catch (err: any) {
      setToast({ msg: err.message || 'Error saving settings', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const hasUnsavedChanges = JSON.stringify(settings) !== JSON.stringify(form);

  const updateForm = (updates: Partial<PlatformSettings>) => {
    setForm(prev => prev ? { ...prev, ...updates } : null);
  };

  return (
    <div className="space-y-6 max-w-4xl relative">
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-6 right-6 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg z-50 text-white ${
              toast.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-medium text-sm">{toast.msg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Platform Settings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Configure global platform preferences.</p>
      </div>

      {loading ? (
        <div className="animate-pulse space-y-6">
          <div className="flex gap-4 border-b border-slate-200 dark:border-slate-800 pb-px">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-24 h-8 bg-slate-200 dark:bg-slate-800 rounded-t" />
            ))}
          </div>
          <div className="h-64 bg-slate-100 dark:bg-[#090E17]/60 rounded-2xl" />
        </div>
      ) : error ? (
        <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 flex flex-col items-center justify-center text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-red-500" />
          <div>
            <p className="text-red-700 dark:text-red-400 font-medium">{error}</p>
            <p className="text-sm text-red-600/80 dark:text-red-400/80 mt-1">Unable to load settings</p>
          </div>
          <button
            onClick={fetchSettings}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg transition-colors font-medium text-sm"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      ) : form ? (
        <>
          <div className="flex gap-1 border-b border-slate-200 dark:border-slate-800 pb-px overflow-x-auto hide-scrollbar">
            {(['General', 'Security', 'Notifications', 'Data Retention'] as TabKey[]).map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`relative flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === t
                    ? 'border-violet-600 text-violet-600 dark:text-violet-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {t}
                {hasUnsavedChanges && activeTab !== t && (
                  <span className="w-2 h-2 rounded-full bg-amber-500" title="Unsaved changes" />
                )}
              </button>
            ))}
          </div>

          <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10">
            {activeTab === 'General' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Platform Name</label>
                  <input
                    type="text"
                    value={form.platform_name}
                    onChange={(e) => updateForm({ platform_name: e.target.value })}
                    className="w-full max-w-md px-3 py-2 bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Timezone</label>
                  <select
                    value={form.timezone}
                    onChange={(e) => updateForm({ timezone: e.target.value })}
                    className="w-full max-w-md px-3 py-2 bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                  >
                    {['UTC', 'EST', 'PST', 'GMT', 'IST', 'CST', 'MST', 'JST', 'AEST', 'CET'].map(tz => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'Security' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between max-w-md">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">Require MFA</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Enforce multi-factor authentication for all users</p>
                  </div>
                  <Toggle checked={form.require_mfa} onChange={(c) => updateForm({ require_mfa: c })} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">IP Allowlist (CIDR)</label>
                  <textarea
                    value={form.ip_allowlist || ''}
                    onChange={(e) => updateForm({ ip_allowlist: e.target.value })}
                    className="w-full max-w-md px-3 py-2 bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-sm focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition-all"
                    placeholder={"192.168.1.0/24\n10.0.0.0/8"}
                    rows={4}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-md">
                    Enter one IP address or CIDR range per line. Leave blank to allow all.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'Notifications' && (
              <div className="space-y-6 max-w-md">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">Scan Complete</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Notify when a database scan finishes</p>
                  </div>
                  <Toggle checked={form.notify_scan_complete} onChange={(c) => updateForm({ notify_scan_complete: c })} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">Critical Findings Detected</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Alert immediately on high-severity issues</p>
                  </div>
                  <Toggle checked={form.notify_critical_findings} onChange={(c) => updateForm({ notify_critical_findings: c })} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">Job Failed</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Notify when a scheduled task fails</p>
                  </div>
                  <Toggle checked={form.notify_job_failed} onChange={(c) => updateForm({ notify_job_failed: c })} />
                </div>
              </div>
            )}

            {activeTab === 'Data Retention' && (
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white mb-2">Retention Period</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 max-w-md">
                    Audit logs, scan findings, and job history older than this will be automatically deleted.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {[30, 60, 90, 180].map(days => (
                      <button
                        key={days}
                        onClick={() => updateForm({ data_retention_days: days })}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          form.data_retention_days === days
                            ? 'bg-violet-600 text-white shadow-md'
                            : 'bg-white dark:bg-[#0B1120] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-violet-500 dark:hover:border-violet-500'
                        }`}
                      >
                        {days} Days
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving || !hasUnsavedChanges}
                  className="flex items-center justify-center min-w-[140px] px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:hover:bg-violet-600 text-white rounded-lg font-medium transition-colors"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
                {hasUnsavedChanges && (
                  <span className="text-sm text-amber-600 dark:text-amber-400 font-medium animate-pulse">
                    Unsaved changes
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
