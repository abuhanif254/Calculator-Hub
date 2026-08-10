'use client';
export const runtime = 'edge';

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "motion/react";
import { CheckCircle, XCircle, Clock, ChevronDown, Search, Download, Ban } from "lucide-react";
import { useToast } from "../../../../components/platform/ui/Toast";
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';

interface HistoryJob {
  id: string;
  name: string;
  type: string;
  status: 'completed' | 'failed' | 'cancelled';
  connection_name: string | null;
  rows_processed: number;
  findings_count: number;
  duration_ms: number | null;
  error_message: string | null;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export default function JobHistoryPage() {
  const [jobs, setJobs] = useState<HistoryJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const [expandedJobId, setExpandedJobId] = useState<string | null>(null);
  const [jobLogs, setJobLogs] = useState<Record<string, any[]>>({});

  async function loadJobLogs(jobId: string) {
    if (jobLogs[jobId]) {
      setExpandedJobId(expandedJobId === jobId ? null : jobId);
      return;
    }
    try {
      const res = await privacyFetch("/api/privacy/jobs/" + jobId);
      const data = await res.json();
      setJobLogs(prev => ({ ...prev, [jobId]: data.job?.logs || [] }));
      setExpandedJobId(expandedJobId === jobId ? null : jobId);
    } catch(e) {
      console.error(e);
    }
  }

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Types");
  const [statusFilter, setStatusFilter] = useState("All Statuses");
  const [dateFilter, setDateFilter] = useState("All Time");

  const [page, setPage] = useState(1);
  const pageSize = 20;

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await privacyFetch("/api/privacy/jobs?limit=50");
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      
      const filtered = (data.jobs || []).filter((j: any) => ['completed', 'failed', 'cancelled'].includes(j.status));
      setJobs(filtered);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleExport = async () => {
    try {
      const res = await privacyFetch("/api/privacy/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: 'findings', format: 'csv' })
      });
      if (!res.ok) throw new Error("Export failed");
      toast.success("Export started", "Check your downloads shortly.");
    } catch (err: any) {
      toast.error("Export Failed", err.message);
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      if (search && !j.name.toLowerCase().includes(search.toLowerCase()) && !j.id.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (typeFilter !== "All Types" && j.type.toLowerCase() !== typeFilter.toLowerCase()) {
        return false;
      }
      if (statusFilter !== "All Statuses" && j.status.toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
      if (dateFilter !== "All Time") {
        const createdDate = new Date(j.created_at);
        const now = new Date();
        const diffMs = now.getTime() - createdDate.getTime();
        const diffDays = diffMs / (1000 * 3600 * 24);
        if (dateFilter === "Today" && diffDays > 1) return false;
        if (dateFilter === "Last 7 Days" && diffDays > 7) return false;
        if (dateFilter === "Last 30 Days" && diffDays > 30) return false;
      }
      return true;
    });
  }, [jobs, search, typeFilter, statusFilter, dateFilter]);

  const paginatedJobs = filteredJobs.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filteredJobs.length / pageSize);

  const formatDuration = (ms: number | null) => {
    if (ms === null || isNaN(ms)) return "-";
    if (ms < 1000) return `${ms}ms`;
    const s = Math.floor(ms / 1000);
    if (s < 60) return `${s}s`;
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}m ${rs}s`;
  };

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
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors"
        >
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <motion.div
        className="glass-panel rounded-2xl overflow-hidden flex flex-col h-[700px] bg-white/50 dark:bg-[#0a0f1a]/80 backdrop-blur-xl border border-slate-200 dark:border-white/10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="p-4 border-b border-slate-200 dark:border-white/10 flex flex-wrap gap-4 items-center bg-white/50 dark:bg-[#080d18]/50">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search jobs by name or ID..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="pl-9 pr-4 py-2 w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            />
          </div>
          <select 
            value={typeFilter} 
            onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            <option>All Types</option>
            <option value="scan">Scan</option>
            <option value="mask">Mask</option>
            <option value="anonymize">Anonymize</option>
          </select>
          <select 
            value={statusFilter} 
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            <option>All Statuses</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select 
            value={dateFilter} 
            onChange={(e) => { setDateFilter(e.target.value); setPage(1); }}
            className="px-3 py-2 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg text-sm text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          >
            <option>All Time</option>
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>

        <div className="overflow-y-auto flex-1 p-0 relative">
          {loading ? (
             <div className="p-8 space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-12 bg-slate-100 dark:bg-white/5 rounded-lg animate-pulse" />
                ))}
             </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
                <XCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Failed to load history</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4">{error}</p>
              <button onClick={fetchJobs} className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors">
                Retry
              </button>
            </div>
          ) : paginatedJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-400">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No jobs found</h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm">
                There are no job executions matching your current filters.
              </p>
            </div>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-[#080d18] sticky top-0 z-10">
                <tr>
                  <th className="p-4 font-medium text-slate-500 dark:text-slate-400 w-8"></th>
                  <th className="p-4 font-medium text-slate-500 dark:text-slate-400">Job ID</th>
                  <th className="p-4 font-medium text-slate-500 dark:text-slate-400">Name</th>
                  <th className="p-4 font-medium text-slate-500 dark:text-slate-400">Type</th>
                  <th className="p-4 font-medium text-slate-500 dark:text-slate-400">Status</th>
                  <th className="p-4 font-medium text-slate-500 dark:text-slate-400">Rows / Findings</th>
                  <th className="p-4 font-medium text-slate-500 dark:text-slate-400">Duration</th>
                  <th className="p-4 font-medium text-slate-500 dark:text-slate-400">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                {paginatedJobs.map((job) => (
                  <React.Fragment key={job.id}>
                    <tr onClick={() => loadJobLogs(job.id)} className="cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                        <ChevronDown className="h-4 w-4" />
                      </td>
                      <td className="p-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                        {job.id.substring(0,8)}...
                      </td>
                      <td className="p-4 font-medium text-slate-900 dark:text-white">
                        {job.name}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-400 capitalize">
                        {job.type}
                      </td>
                      <td className="p-4">
                        {job.status === "completed" ? (
                          <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded text-xs font-medium">
                            <CheckCircle className="h-3 w-3" /> Completed
                          </span>
                        ) : job.status === "failed" ? (
                          <span className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded text-xs font-medium" title={job.error_message || ""}>
                            <XCircle className="h-3 w-3" /> Failed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-xs font-medium">
                            <Ban className="h-3 w-3" /> Cancelled
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-400">
                        {job.rows_processed || "-"} / {job.findings_count || "-"}
                      </td>
                      <td className="p-4 text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {formatDuration(job.duration_ms)}
                      </td>
                      <td className="p-4 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {new Date(job.created_at).toLocaleString()}
                      </td>
                    </tr>
                    {expandedJobId === job.id && (
                      <tr key={job.id + '-logs'}>
                        <td colSpan={99} className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4">
                          {jobLogs[job.id]?.length ? (
                            <div className="space-y-1">
                              {jobLogs[job.id].map((log: any, i: number) => (
                                <div key={i} className="text-xs font-mono text-slate-600 dark:text-slate-400">
                                  {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() + ' — ' : ''}{log.message || JSON.stringify(log)}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-xs text-slate-400 italic">No logs available for this job.</div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
        
        {/* Pagination */}
        {!loading && !error && filteredJobs.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-white/10 flex justify-between items-center bg-white/50 dark:bg-[#080d18]/50">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, filteredJobs.length)} of {filteredJobs.length} jobs
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 text-sm font-medium bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded disabled:opacity-50 text-slate-700 dark:text-slate-300"
              >
                Previous
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 text-sm font-medium bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded disabled:opacity-50 text-slate-700 dark:text-slate-300"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
