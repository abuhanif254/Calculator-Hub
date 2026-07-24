"use client";

import React, { useState } from "react";

export default function ExportPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Export Data
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">
          Extract and anonymize data from your connected databases.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Source Database
            </label>
            <select className="w-full px-4 py-2.5 bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white">
              <option>Production PostgreSQL (us-east-1)</option>
              <option>Analytics Redshift</option>
              <option>Legacy MySQL</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Tables to Export
            </label>
            <div className="space-y-2 border border-slate-200 dark:border-slate-800 rounded-xl p-4 max-h-48 overflow-y-auto bg-slate-50 dark:bg-[#0B1120]">
              {[
                "users",
                "orders",
                "transactions",
                "sessions",
                "audit_logs",
              ].map((table) => (
                <label key={table} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded text-violet-600 border-slate-300 focus:ring-violet-500"
                    defaultChecked={table === "users" || table === "orders"}
                  />
                  <span className="text-sm font-mono text-slate-700 dark:text-slate-300">
                    {table}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Export Format
              </label>
              <select className="w-full px-4 py-2.5 bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white">
                <option>CSV (.csv)</option>
                <option>JSON (.json)</option>
                <option>Parquet (.parquet)</option>
                <option>SQL Dump (.sql)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Masking Profile
              </label>
              <select className="w-full px-4 py-2.5 bg-white dark:bg-[#0B1120] border border-slate-300 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white">
                <option>Strict (GDPR Compliant)</option>
                <option>Partial (Analytics Only)</option>
                <option>None (Raw Data) - Requires Admin</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            {done ? (
              <div className="flex gap-4">
                <button className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
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
                  Download Export.zip (45.2 MB)
                </button>
                <button
                  onClick={() => setDone(false)}
                  className="px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-medium transition-colors"
                >
                  New Export
                </button>
              </div>
            ) : (
              <button
                onClick={handleExport}
                disabled={loading}
                className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-bold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                    Generating...
                  </>
                ) : (
                  "Generate Export"
                )}
              </button>
            )}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">
            Export History
          </h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-start gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 last:border-0 last:pb-0"
              >
                <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 shrink-0">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                    users_export_{i}.csv
                  </h4>
                  <p className="text-xs text-slate-500 mb-1">
                    Today at {14 - i}:30 PM • 12.4 MB
                  </p>
                  <span className="text-[10px] font-medium px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 rounded">
                    Masked
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
