"use client";

import React, { useState } from 'react';

export default function ApiKeysPage() {
  const [showModal, setShowModal] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);

  const handleCreate = () => {
    setNewKey('pk_live_8f92a4bce5d678190fabcdef1234567890');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">API Keys</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage programmatic access to the platform.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
        >
          Create API Key
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel rounded-xl p-5 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10">
          <div className="text-sm font-medium text-slate-500 mb-1">API Calls (This Month)</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">1.2M <span className="text-sm font-normal text-slate-500">/ 5M limit</span></div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-violet-600 w-1/4"></div>
          </div>
        </div>
      </div>

      <div className="glass-panel rounded-2xl dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500">
            <tr>
              <th className="p-4 font-medium">Key Name</th>
              <th className="p-4 font-medium">Prefix</th>
              <th className="p-4 font-medium">Permissions</th>
              <th className="p-4 font-medium">Last Used</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            <tr className="bg-white dark:bg-[#0B1120]">
              <td className="p-4 font-medium text-slate-900 dark:text-white">Production Automation</td>
              <td className="p-4 font-mono text-slate-600 dark:text-slate-400">pk_live_8f92***</td>
              <td className="p-4"><span className="px-2 py-1 bg-violet-500/10 text-violet-600 rounded text-xs font-medium">Full Access</span></td>
              <td className="p-4 text-slate-500">2 mins ago</td>
              <td className="p-4 text-right">
                <button className="text-red-500 hover:underline text-xs font-medium">Revoke</button>
              </td>
            </tr>
            <tr className="bg-white dark:bg-[#0B1120]">
              <td className="p-4 font-medium text-slate-900 dark:text-white">CI/CD Pipeline</td>
              <td className="p-4 font-mono text-slate-600 dark:text-slate-400">pk_test_3a1b***</td>
              <td className="p-4"><span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded text-xs font-medium">Read Only</span></td>
              <td className="p-4 text-slate-500">Yesterday</td>
              <td className="p-4 text-right">
                <button className="text-red-500 hover:underline text-xs font-medium">Revoke</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="glass-panel rounded-2xl w-full max-w-md p-6 dark:bg-[#0B1120] border border-slate-200 dark:border-white/10 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Create New API Key</h2>
            
            {!newKey ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Key Name</label>
                  <input type="text" className="w-full px-3 py-2 bg-white dark:bg-[#090E17] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white" placeholder="e.g. Data Pipeline" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Permissions</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2"><input type="checkbox" className="rounded" defaultChecked /> Read Data</label>
                    <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Write Data</label>
                    <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Admin (Manage Rules)</label>
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => setShowModal(false)} className="px-4 py-2 text-slate-600 dark:text-slate-400">Cancel</button>
                  <button onClick={handleCreate} className="px-4 py-2 bg-violet-600 text-white rounded-lg font-medium">Generate Key</button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-600 dark:text-amber-500 text-sm">
                  <strong>Important:</strong> Copy this key now. You will not be able to see it again after closing this window.
                </div>
                <div className="flex items-center gap-2">
                  <input type="text" readOnly value={newKey} className="w-full px-3 py-2 bg-slate-50 dark:bg-[#090E17] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono text-sm" />
                  <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700">📋</button>
                </div>
                <div className="flex justify-end mt-6">
                  <button onClick={() => { setShowModal(false); setNewKey(null); }} className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium">Done</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
