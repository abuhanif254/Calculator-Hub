"use client";

import React from 'react';

export default function SecretsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Secrets Manager</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">AES-256-GCM Encrypted Vault for connection strings and credentials.</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors">
          Add Secret
        </button>
      </div>

      <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 flex items-center justify-between bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-900/30">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          <div>
            <h3 className="font-bold text-emerald-800 dark:text-emerald-400">Vault is active and secured</h3>
            <p className="text-sm text-emerald-600 dark:text-emerald-500/70">All secrets are encrypted at rest using AES-256-GCM.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { name: 'prod-db-url', type: 'Connection String', updated: '2 days ago', status: 'Active' },
          { name: 'stripe-api-key', type: 'API Credential', updated: '1 month ago', status: 'Active' },
          { name: 'aws-s3-cert', type: 'Certificate', updated: '3 months ago', status: 'Needs Rotation' }
        ].map(secret => (
          <div key={secret.name} className="glass-panel rounded-xl p-5 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-900 dark:text-white font-mono">{secret.name}</h3>
                {secret.status === 'Needs Rotation' && <span className="w-2 h-2 rounded-full bg-amber-500"></span>}
              </div>
              <p className="text-xs text-slate-500 mb-3">{secret.type} • Updated {secret.updated}</p>
              
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded p-2">
                <input type="password" value="************************" readOnly className="bg-transparent border-none text-slate-600 dark:text-slate-400 text-sm focus:outline-none flex-1 font-mono" />
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">👁️</button>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <button className="text-xs font-medium text-slate-500 hover:text-violet-500 transition-colors">Edit</button>
              <button className="text-xs font-medium text-slate-500 hover:text-red-500 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
