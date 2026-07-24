"use client";

import React from 'react';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Team Management</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage users, roles, and access controls.</p>
        </div>
        <button className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors">
          Invite Member
        </button>
      </div>

      <div className="glass-panel rounded-2xl dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-500">
            <tr>
              <th className="p-4 font-medium">User</th>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Last Active</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {[
              { name: 'Alice Smith', email: 'alice@nexus.net', role: 'Admin', init: 'AS', color: 'bg-violet-500' },
              { name: 'Bob Jones', email: 'bob@nexus.net', role: 'Compliance Officer', init: 'BJ', color: 'bg-emerald-500' },
              { name: 'Charlie Day', email: 'charlie@nexus.net', role: 'Developer', init: 'CD', color: 'bg-blue-500' }
            ].map(user => (
              <tr key={user.email} className="bg-white dark:bg-[#0B1120]">
                <td className="p-4 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${user.color} flex items-center justify-center text-white text-xs font-bold`}>{user.init}</div>
                  <div>
                    <div className="font-medium text-slate-900 dark:text-white">{user.name}</div>
                    <div className="text-xs text-slate-500">{user.email}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs">{user.role}</span>
                </td>
                <td className="p-4 text-slate-500 text-xs">Today</td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium text-xs">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
