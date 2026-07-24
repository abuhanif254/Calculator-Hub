"use client";

import React from "react";

const logs = [
  {
    id: 1,
    time: "2023-10-25 14:32:01",
    user: "admin@nexus.net",
    action: "API Key Created",
    resource: "pk_live_***",
    ip: "192.168.1.1",
    severity: "Info",
  },
  {
    id: 2,
    time: "2023-10-25 12:15:44",
    user: "system",
    action: "Masking Job Completed",
    resource: "users_table_export",
    ip: "internal",
    severity: "Info",
  },
  {
    id: 3,
    time: "2023-10-25 09:01:22",
    user: "dev@nexus.net",
    action: "Rule Modified",
    resource: "Email Masker",
    ip: "10.0.0.45",
    severity: "Warning",
  },
  {
    id: 4,
    time: "2023-10-24 18:45:00",
    user: "admin@nexus.net",
    action: "Failed Login",
    resource: "Dashboard",
    ip: "203.0.113.42",
    severity: "High",
  },
  {
    id: 5,
    time: "2023-10-24 14:20:11",
    user: "system",
    action: "Webhook Triggered",
    resource: "compliance.alert",
    ip: "internal",
    severity: "Info",
  },
  {
    id: 6,
    time: "2023-10-24 10:15:33",
    user: "dev@nexus.net",
    action: "Export Started",
    resource: "transactions_db",
    ip: "10.0.0.45",
    severity: "Info",
  },
  {
    id: 7,
    time: "2023-10-23 16:05:12",
    user: "security@nexus.net",
    action: "Policy Updated",
    resource: "HIPAA Settings",
    ip: "192.168.1.5",
    severity: "Warning",
  },
  {
    id: 8,
    time: "2023-10-23 08:30:00",
    user: "system",
    action: "System Backup",
    resource: "Daily Snapshot",
    ip: "internal",
    severity: "Info",
  },
];

export default function AuditPage() {
  const getSeverityBadge = (sev: string) => {
    if (sev === "High")
      return "bg-red-500/10 text-red-500 border border-red-500/20";
    if (sev === "Warning")
      return "bg-orange-500/10 text-orange-500 border border-orange-500/20";
    return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Audit Logs
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Immutable trail of all platform activity.
          </p>
        </div>
        <button className="px-4 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors flex items-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Export CSV
        </button>
      </div>

      <div className="glass-panel rounded-2xl dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex gap-4 bg-slate-50 dark:bg-[#0B1120]">
          <input
            type="text"
            placeholder="Search logs..."
            className="px-3 py-1.5 bg-white dark:bg-[#090E17] border border-slate-300 dark:border-slate-700 rounded-lg text-sm flex-1"
          />
          <select className="px-3 py-1.5 bg-white dark:bg-[#090E17] border border-slate-300 dark:border-slate-700 rounded-lg text-sm w-32">
            <option>All Actions</option>
            <option>Login</option>
            <option>Export</option>
          </select>
          <select className="px-3 py-1.5 bg-white dark:bg-[#090E17] border border-slate-300 dark:border-slate-700 rounded-lg text-sm w-32">
            <option>All Severities</option>
            <option>High</option>
            <option>Warning</option>
            <option>Info</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 text-slate-500">
              <tr>
                <th className="p-4 font-medium">Timestamp</th>
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Action</th>
                <th className="p-4 font-medium">Resource</th>
                <th className="p-4 font-medium">IP Address</th>
                <th className="p-4 font-medium">Severity</th>
                <th className="p-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <td className="p-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                    {log.time}
                  </td>
                  <td className="p-4 text-slate-900 dark:text-white">
                    {log.user}
                  </td>
                  <td className="p-4 text-slate-900 dark:text-white font-medium">
                    {log.action}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    {log.resource}
                  </td>
                  <td className="p-4 text-slate-500 font-mono text-xs">
                    {log.ip}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${getSeverityBadge(log.severity)}`}
                    >
                      {log.severity}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-violet-600 dark:text-violet-400 hover:underline text-xs font-medium">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500 bg-slate-50 dark:bg-[#0B1120]">
          <span>Showing 1 to 8 of 1,245 entries</span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-[#090E17] disabled:opacity-50"
              disabled
            >
              Prev
            </button>
            <button className="px-3 py-1 border border-slate-300 dark:border-slate-700 rounded bg-white dark:bg-[#090E17]">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
