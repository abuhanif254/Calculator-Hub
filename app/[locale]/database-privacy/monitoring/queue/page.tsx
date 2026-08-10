"use client";
export const runtime = 'edge';
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ListOrdered, Clock, CheckCircle2, XCircle, Play, AlertCircle } from "lucide-react";
import { PageHeader } from "../../../../components/platform/ui/PlatformUI";
import { useAuth } from '@/app/components/AuthProvider';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';

const queuedJobs = [
  {
    id: "q-001",
    name: "qa-database-nightly",
    target: "qa-postgres-cluster",
    priority: "High",
    queued: "2m ago",
    estimated: "~3 min",
  },
  {
    id: "q-002",
    name: "staging-refresh",
    target: "staging-mysql-main",
    priority: "Normal",
    queued: "8m ago",
    estimated: "~12 min",
  },
  {
    id: "q-003",
    name: "dev-sandbox-mask",
    target: "dev-sqlite-local",
    priority: "Low",
    queued: "15m ago",
    estimated: "~1 min",
  },
];

const recentQueue = [
  {
    id: "q-098",
    name: "analytics-daily",
    status: "completed",
    duration: "4m 12s",
    at: "1h ago",
  },
  {
    id: "q-097",
    name: "prod-clone-mask",
    status: "failed",
    duration: "0m 22s",
    at: "2h ago",
  },
  {
    id: "q-096",
    name: "dev-weekly",
    status: "completed",
    duration: "1m 05s",
    at: "3h ago",
  },
];

const priorityColors: Record<string, string> = {
  High: "text-red-400 bg-red-400/10 border-red-400/20",
  Normal: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Low: "text-white/40 bg-white/5 border-white/10",
};

export default function QueuePage() {
  const [queuedJobs, setQueuedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Try to use auth if available, otherwise just basic fetch
  let auth: any = {};
  try {
    auth = useAuth();
  } catch (e) {}

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const headers: Record<string, string> = {};
      if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
      else if (auth?.getAuthToken) headers.Authorization = `Bearer ${await auth.getAuthToken()}`;
      
      const res = await privacyFetch("/api/privacy/jobs?status=scheduled,running&limit=20", { headers });
      const data = await res.json();
      setQueuedJobs(data.jobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const runNow = async (id: string) => {
    try {
      const headers: Record<string, string> = {};
      if (auth?.token) headers.Authorization = `Bearer ${auth.token}`;
      else if (auth?.getAuthToken) headers.Authorization = `Bearer ${await auth.getAuthToken()}`;
      
      await privacyFetch(`/api/privacy/jobs/${id}/retry`, { method: "POST", headers });
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Queue"
        subtitle="Monitor the worker job queue and pending masking operations"
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
          <ListOrdered className="w-4 h-4 text-violet-400" />
          <h3 className="font-semibold text-white">
            Pending Jobs ({queuedJobs.length})
          </h3>
        </div>
        {loading ? (
          <div className="p-6 space-y-4">
             {[...Array(3)].map((_, i) => (
               <div key={i} className="h-12 bg-white/5 rounded-lg animate-pulse" />
             ))}
          </div>
        ) : queuedJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-3 opacity-50" />
            <p className="text-white/60">No jobs currently in queue.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#080D18]">
              <tr>
                {[
                  "Job Name",
                  "Target",
                  "Priority",
                  "Queued",
                  "Est. Duration",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-3 text-xs text-white/40 font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {queuedJobs.map((job) => (
                <tr key={job.id} className="hover:bg-white/[0.02]">
                  <td className="px-6 py-4 text-white font-medium">{job.name}</td>
                  <td className="px-6 py-4 text-white/60 font-mono text-xs">
                    {job.target || job.connection_name || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border ${priorityColors[job.priority || 'Normal'] || priorityColors.Normal}`}
                    >
                      {job.priority || 'Normal'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white/50 text-xs">
                    <Clock className="w-3.5 h-3.5 inline mr-1" />
                    {job.queued || new Date(job.created_at).toLocaleTimeString()}
                  </td>
                  <td className="px-6 py-4 text-white/50 text-xs">
                    {job.estimated || '~1 min'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => runNow(job.id)} className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors ml-auto">
                      <Play className="w-3 h-3" />
                      Run Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden"
      >
        <div className="px-6 py-4 border-b border-white/10">
          <h3 className="font-semibold text-white">Recent Queue Activity</h3>
        </div>
        <div className="divide-y divide-white/[0.04]">
          {recentQueue.map((j) => (
            <div
              key={j.id}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-3">
                {j.status === "completed" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400" />
                )}
                <span className="text-white/80 text-sm">{j.name}</span>
              </div>
              <div className="flex items-center gap-6 text-xs text-white/40">
                <span>
                  <Clock className="w-3 h-3 inline mr-1" />
                  {j.duration}
                </span>
                <span>{j.at}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
