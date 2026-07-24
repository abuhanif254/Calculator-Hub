"use client";

import React, { useState } from 'react';

export default function SettingsPage() {
  const [tab, setTab] = useState('General');

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Platform Settings</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Configure global platform preferences.</p>
      </div>

      <div className="flex gap-1 border-b border-slate-200 dark:border-slate-800 pb-px">
        {['General', 'Security', 'Notifications', 'Data Retention'].map(t => (
          <button 
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${tab === t ? 'border-violet-600 text-violet-600' : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10">
        {tab === 'General' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Platform Name</label>
              <input type="text" defaultValue="Nexus Data Privacy" className="w-full max-w-md px-3 py-2 bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Timezone</label>
              <select className="w-full max-w-md px-3 py-2 bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white">
                <option>UTC (Coordinated Universal Time)</option>
                <option>EST (Eastern Standard Time)</option>
              </select>
            </div>
          </div>
        )}
        
        {tab === 'Security' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between max-w-md">
              <div>
                <h4 className="font-medium text-slate-900 dark:text-white">Require MFA</h4>
                <p className="text-xs text-slate-500">Enforce multi-factor authentication for all users</p>
              </div>
              <button className="w-12 h-6 bg-violet-600 rounded-full relative">
                <span className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white transition-all" />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">IP Allowlist (CIDR)</label>
              <textarea className="w-full max-w-md px-3 py-2 bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono" placeholder="192.168.1.0/24" rows={3}></textarea>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
          <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
