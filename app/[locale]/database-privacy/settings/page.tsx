'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Save, Wifi, WifiOff, ChevronRight } from 'lucide-react';
import { PageHeader } from '../../../components/platform/ui/PlatformUI';
import { useToast } from '../../../components/platform/ui/Toast';
import { API_BASE_URL } from '../../../lib/api';

const sidebarItems = ['General', 'Worker', 'Notifications', 'Data Retention', 'Security', 'Danger Zone'];

export default function SettingsPage() {
  const toast = useToast();
  const [active, setActive] = useState('General');
  const [workerUrl, setWorkerUrl] = useState(API_BASE_URL);
  const [platformName, setPlatformName] = useState('DataPrivacy Enterprise');
  const [maxJobs, setMaxJobs] = useState('4');
  const [strategy, setStrategy] = useState('Synthetic Data');
  const [testing, setTesting] = useState(false);
  const [workerOk, setWorkerOk] = useState<boolean | null>(null);

  const testWorker = async () => {
    setTesting(true);
    try {
      const res = await fetch(`${workerUrl}/api/connections`);
      setWorkerOk(res.ok || res.status === 404);
    } catch { setWorkerOk(false); }
    setTesting(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Configure your platform preferences and integrations" />
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex gap-6">
        <aside className="w-48 shrink-0">
          <nav className="space-y-1">
            {sidebarItems.map(item => (
              <button key={item} onClick={() => setActive(item)}
                className={`w-full text-left flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${active === item ? 'bg-violet-500/15 text-violet-300 font-medium' : 'text-white/50 hover:text-white hover:bg-white/5'}`}>
                {item}
                {active === item && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1 bg-[#0A0F1A] border border-white/10 rounded-2xl p-6 space-y-6">
          {active === 'General' && <>
            <h3 className="text-white font-semibold text-base border-b border-white/10 pb-4">General Settings</h3>
            <div className="space-y-4">
              <div><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Platform Name</label>
                <input value={platformName} onChange={e => setPlatformName(e.target.value)} className="w-full max-w-md bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" /></div>
              <div><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Default Masking Strategy</label>
                <select value={strategy} onChange={e => setStrategy(e.target.value)} className="w-full max-w-md bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 appearance-none">
                  {['Synthetic Data', 'SHA-256 Hashing', 'Partial Redaction', 'Format-Preserving Encryption'].map(o => <option key={o}>{o}</option>)}
                </select></div>
              <div><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Max Concurrent Jobs</label>
                <input type="number" value={maxJobs} onChange={e => setMaxJobs(e.target.value)} min="1" max="20" className="w-32 bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50" /></div>
              <div className="flex items-center justify-between max-w-md p-4 bg-white/[0.02] border border-white/5 rounded-xl">
                <div><p className="text-sm text-white font-medium">Dark Mode</p><p className="text-xs text-white/40">Always enabled for this platform</p></div>
                <div className="w-10 h-6 bg-violet-600 rounded-full flex items-center px-1 cursor-not-allowed"><div className="w-4 h-4 bg-white rounded-full ml-auto" /></div>
              </div>
            </div>
          </>}
          {active === 'Worker' && <>
            <h3 className="text-white font-semibold text-base border-b border-white/10 pb-4">Worker Configuration</h3>
            <div className="space-y-4">
              <div><label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">Worker URL</label>
                <div className="flex gap-2 max-w-lg">
                  <input value={workerUrl} onChange={e => { setWorkerUrl(e.target.value); setWorkerOk(null); }} className="flex-1 bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white font-mono outline-none focus:border-violet-500/50" />
                  <button onClick={testWorker} disabled={testing} className="bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2.5 rounded-xl border border-white/10 transition-colors whitespace-nowrap flex items-center gap-2">
                    {testing ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : workerOk === true ? <Wifi className="w-4 h-4 text-emerald-400" /> : workerOk === false ? <WifiOff className="w-4 h-4 text-red-400" /> : <Wifi className="w-4 h-4" />}
                    Test
                  </button>
                </div>
                {workerOk === true && <p className="text-xs text-emerald-400 mt-2">✓ Worker is reachable</p>}
                {workerOk === false && <p className="text-xs text-red-400 mt-2">✗ Could not reach worker at this URL</p>}
              </div>
            </div>
          </>}
          {!['General', 'Worker'].includes(active) && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Settings className="w-10 h-10 text-white/10 mb-3" />
              <p className="text-white/40 text-sm">{active} settings coming soon</p>
            </div>
          )}
          <div className="pt-4 border-t border-white/10">
            <button onClick={() => toast.success('Settings Saved', 'Your preferences have been updated.')}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
