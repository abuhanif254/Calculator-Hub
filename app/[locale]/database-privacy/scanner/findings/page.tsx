'use client';

import React from "react";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  ShieldAlert,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export default function FindingsPage() {
  const findings = Array.from({ length: 20 }).map((_, i) => {
    const risk = i % 3 === 0 ? "High" : i % 2 === 0 ? "Medium" : "Low";
    const status = i % 5 === 0 ? "Mitigated" : i % 7 === 0 ? "Ignored" : "Open";
    const types = [
      "Email",
      "Credit Card",
      "SSN",
      "Phone Number",
      "Name",
      "Address",
    ];
    return {
      id: `FND-${1000 + i}`,
      location: `public.${["users", "customers", "orders", "payments"][i % 4]}.${["email", "cc_num", "ssn", "phone", "full_name", "address"][i % 6]}`,
      type: types[i % 6],
      risk,
      status,
      sample: "***",
    };
  });

  const getRiskColor = (risk: string) => {
    if (risk === "High")
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    if (risk === "Medium")
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  };

  const getStatusIcon = (status: string) => {
    if (status === "Mitigated")
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    if (status === "Ignored")
      return <XCircle className="h-4 w-4 text-slate-400" />;
    return <ShieldAlert className="h-4 w-4 text-amber-500" />;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Scan Findings
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Review and action discovered PII across your connections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
          <div className="text-slate-500 text-sm">Total Findings</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            128
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-l-4 border-red-500">
          <div className="text-slate-500 text-sm">High Risk</div>
          <div className="text-2xl font-bold text-red-500">34</div>
        </div>
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-l-4 border-amber-500">
          <div className="text-slate-500 text-sm">Medium Risk</div>
          <div className="text-2xl font-bold text-amber-500">62</div>
        </div>
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-l-4 border-emerald-500">
          <div className="text-slate-500 text-sm">Mitigated</div>
          <div className="text-2xl font-bold text-emerald-500">15</div>
        </div>
      </div>

      <motion.div
        className="glass-panel rounded-2xl overflow-hidden flex flex-col h-[600px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between bg-white dark:bg-[#0f1523]">
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search location..."
                className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-800/50">
              <Filter className="h-4 w-4" /> Filter
            </button>
          </div>
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700">
            Apply Rules to Selected
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-0">
          <table className="w-full text-left text-sm relative">
            <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="p-4 w-12">
                  <input type="checkbox" className="rounded border-slate-300" />
                </th>
                <th className="p-4 font-medium text-slate-500">
                  Location (Table.Column)
                </th>
                <th className="p-4 font-medium text-slate-500">PII Type</th>
                <th className="p-4 font-medium text-slate-500">Risk Level</th>
                <th className="p-4 font-medium text-slate-500">Status</th>
                <th className="p-4 font-medium text-slate-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {findings.map((f) => (
                <tr
                  key={f.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300"
                    />
                  </td>
                  <td className="p-4 font-mono text-xs text-slate-700 dark:text-slate-300">
                    {f.location}
                  </td>
                  <td className="p-4 text-slate-600 dark:text-slate-400">
                    {f.type}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${getRiskColor(f.risk)}`}
                    >
                      {f.risk}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      {getStatusIcon(f.status)} {f.status}
                    </div>
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <button className="text-violet-600 dark:text-violet-400 hover:underline text-sm">
                      Mask
                    </button>
                    <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm">
                      Ignore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
