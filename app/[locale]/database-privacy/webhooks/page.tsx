"use client";

import React from 'react';

export default function WebhooksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Webhooks</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Receive real-time HTTP notifications for platform events.</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors">
          Add Webhook
        </button>
      </div>

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
            <tr className="bg-white dark:bg-[#0B1120]">
              <td className="p-4 font-medium text-slate-900 dark:text-white">https://api.mycorp.com/webhooks/privacy</td>
              <td className="p-4"><span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">job.completed</span></td>
              <td className="p-4"><span className="flex items-center gap-1 text-emerald-500"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active</span></td>
              <td className="p-4 text-slate-500">10 mins ago</td>
              <td className="p-4 text-right flex justify-end gap-2">
                <button className="text-slate-500 hover:text-violet-500 font-medium text-xs">Test</button>
                <button className="text-slate-500 hover:text-red-500 font-medium text-xs">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
