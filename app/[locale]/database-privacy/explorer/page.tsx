'use client';

import React from "react";
import { motion } from "motion/react";
import {
  Database,
  Table,
  Columns,
  Search,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

export default function ExplorerPage() {
  const columnsData = [
    {
      name: "id",
      type: "uuid",
      nullable: false,
      pii: false,
      sample: "123e4567-e89b-12d3...",
    },
    {
      name: "email",
      type: "varchar(255)",
      nullable: false,
      pii: true,
      risk: "High",
      sample: "user@example.com",
    },
    {
      name: "first_name",
      type: "varchar(100)",
      nullable: true,
      pii: true,
      risk: "Medium",
      sample: "John",
    },
    {
      name: "last_name",
      type: "varchar(100)",
      nullable: true,
      pii: true,
      risk: "Medium",
      sample: "Doe",
    },
    {
      name: "created_at",
      type: "timestamp",
      nullable: false,
      pii: false,
      sample: "2023-10-15 14:30:00",
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Schema Explorer
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Navigate database connections and inspect table structures.
          </p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tables..."
            className="pl-10 pr-4 py-2 bg-transparent border border-slate-200 dark:border-slate-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-600 w-64"
          />
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden min-h-0">
        {/* Sidebar Tree */}
        <motion.div
          className="w-80 glass-panel rounded-2xl flex flex-col overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 font-medium text-sm text-slate-500 uppercase tracking-wider">
            Connections
          </div>
          <div className="p-4 overflow-y-auto space-y-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-slate-200 cursor-pointer p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50">
                <Database className="h-4 w-4 text-emerald-500" /> prod-postgres
              </div>
              <div className="pl-6 space-y-1">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer p-2 rounded-lg bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
                  <Table className="h-4 w-4" /> users
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50">
                  <Table className="h-4 w-4" /> orders
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/50">
                  <Table className="h-4 w-4" /> payments
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Area */}
        <motion.div
          className="flex-1 glass-panel rounded-2xl flex flex-col overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                <Table className="h-5 w-5 text-violet-500" /> public.users
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Found 3 columns with potential PII risks.
              </p>
            </div>
            <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors">
              Scan Selected Table
            </button>
          </div>
          <div className="flex-1 overflow-auto p-0">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0">
                <tr>
                  <th className="p-4 font-medium text-slate-500">
                    Column Name
                  </th>
                  <th className="p-4 font-medium text-slate-500">Data Type</th>
                  <th className="p-4 font-medium text-slate-500">Nullable</th>
                  <th className="p-4 font-medium text-slate-500">PII Risk</th>
                  <th className="p-4 font-medium text-slate-500">
                    Example Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {columnsData.map((col, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-4 font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Columns className="h-4 w-4 text-slate-400" /> {col.name}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 font-mono text-xs">
                      {col.type}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {col.nullable ? "Yes" : "No"}
                    </td>
                    <td className="p-4">
                      {col.pii ? (
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${col.risk === "High" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"}`}
                        >
                          <ShieldAlert className="h-3 w-3" /> {col.risk} Risk
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-500 text-xs">
                          <ShieldCheck className="h-3 w-3" /> None
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-500 italic text-xs">
                      {col.sample}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
