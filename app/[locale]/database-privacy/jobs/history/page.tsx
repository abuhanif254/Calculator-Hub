'use client';

import React from "react";
import { motion } from "motion/react";
import { CheckCircle, XCircle, Clock, ChevronDown, Search } from "lucide-react";

export default function JobHistoryPage() {
  const jobs = Array.from({ length: 20 }).map((_, i) => {
    const isSuccess = i % 4 !== 0;
    return {
      id: `JOB-${9900 - i}`,
      name: i % 2 === 0 ? "Weekly Prod Anonymization" : "Full Schema Scan",
      type: i % 2 === 0 ? "Masking" : "Scan",
      connection: "prod-postgres",
      status: isSuccess ? "Success" : "Failed",
      duration: isSuccess ? `${Math.floor(Math.random() * 50) + 10}m` : "2m",
      rows:
        isSuccess && i % 2 === 0
          ? `${(Math.random() * 5000).toFixed(0)}k`
          : "-",
      date: new Date(Date.now() - i * 86400000).toLocaleDateString(),
    };
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Job History
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Detailed logs of all past job executions.
          </p>
        </div>
      </div>

      <motion.div
        className="glass-panel rounded-2xl overflow-hidden flex flex-col h-[700px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex gap-4 items-center bg-white dark:bg-[#0f1523]">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs by name or ID..."
              className="pl-9 pr-4 py-2 w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm"
            />
          </div>
          <select className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-600">
            <option>All Types</option>
            <option>Masking</option>
            <option>Scan</option>
          </select>
          <select className="px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-600">
            <option>All Statuses</option>
            <option>Success</option>
            <option>Failed</option>
          </select>
        </div>

        <div className="overflow-y-auto flex-1 p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0 z-10">
              <tr>
                <th className="p-4 font-medium text-slate-500 w-8"></th>
                <th className="p-4 font-medium text-slate-500">Job ID</th>
                <th className="p-4 font-medium text-slate-500">Name</th>
                <th className="p-4 font-medium text-slate-500">Type</th>
                <th className="p-4 font-medium text-slate-500">Status</th>
                <th className="p-4 font-medium text-slate-500">
                  Rows Affected
                </th>
                <th className="p-4 font-medium text-slate-500">Duration</th>
                <th className="p-4 font-medium text-slate-500">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {jobs.map((job) => (
                <React.Fragment key={job.id}>
                  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer group">
                    <td className="p-4 text-slate-400 group-hover:text-slate-600">
                      <ChevronDown className="h-4 w-4" />
                    </td>
                    <td className="p-4 font-mono text-xs text-slate-500">
                      {job.id}
                    </td>
                    <td className="p-4 font-medium text-slate-900 dark:text-white">
                      {job.name}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {job.type}
                    </td>
                    <td className="p-4">
                      {job.status === "Success" ? (
                        <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded text-xs font-medium">
                          <CheckCircle className="h-3 w-3" /> Success
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded text-xs font-medium">
                          <XCircle className="h-3 w-3" /> Failed
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {job.rows}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {job.duration}
                    </td>
                    <td className="p-4 text-slate-500">{job.date}</td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
