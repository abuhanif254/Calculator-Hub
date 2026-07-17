'use client';

import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, XCircle, Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import { apiUrl } from '../../../lib/api';

interface JobHistory {
  id: string;
  target: string;
  status: string;
  duration: string;
  rows_masked: number;
  completed_at: string;
  error?: string;
}

export function JobHistoryModule() {
  const [history, setHistory] = useState<JobHistory[]>([]);

  useEffect(() => {
    fetch(apiUrl('/api/jobs/history'))
      .then(r => r.json())
      .then(setHistory)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input 
            type="text" 
            placeholder="Search by Job ID or Target DB..." 
            className="w-full bg-[#0A0F1A] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-violet-500/50"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-[#0A0F1A] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 appearance-none">
            <option>All Statuses</option>
            <option>Success</option>
            <option>Failed</option>
          </select>
          <button className="bg-white/5 hover:bg-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-xl border border-white/5 transition-colors">
            Export Logs
          </button>
        </div>
      </div>

      <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#080D18]">
            <tr>
              <th className="px-6 py-4 text-white/40 font-medium">Job ID</th>
              <th className="px-6 py-4 text-white/40 font-medium">Target Database</th>
              <th className="px-6 py-4 text-white/40 font-medium">Status</th>
              <th className="px-6 py-4 text-white/40 font-medium">Duration</th>
              <th className="px-6 py-4 text-right text-white/40 font-medium">Rows Masked</th>
              <th className="px-6 py-4 text-right text-white/40 font-medium">Completed At</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {history.map((job) => (
              <tr key={job.id} className="hover:bg-white/[0.02] group cursor-pointer transition-colors">
                <td className="px-6 py-4">
                  <span className="font-mono text-white/80">{job.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-white/30" />
                    <span className="text-white/80">{job.target}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {job.status === 'Success' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                    <span className={job.status === 'Success' ? 'text-green-400' : 'text-red-400'}>
                      {job.status}
                    </span>
                  </div>
                  {job.error && (
                    <p className="text-[10px] text-red-400/60 mt-1 max-w-[150px] truncate">{job.error}</p>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-white/60">
                    <Clock className="w-3.5 h-3.5" />
                    {job.duration}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="font-mono text-white/80">{job.rows_masked.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-white/60">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(job.completed_at).toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-violet-400 transition-colors ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
