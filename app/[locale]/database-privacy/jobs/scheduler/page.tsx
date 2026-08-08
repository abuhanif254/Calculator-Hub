"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import {
  CalendarClock,
  Plus,
  Play,
  Pause,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { PageHeader } from "../../../../components/platform/ui/PlatformUI";
import { useToast } from "../../../../components/platform/ui/Toast";

interface ScheduledJob {
  id: string;
  name: string;
  type: string;
  cron_schedule: string;
  connection_name: string | null;
  status: 'scheduled' | 'paused' | 'failed' | 'completed' | 'cancelled';
  created_at: string;
}

function getNextRunText(cronSchedule: string | null): string {
  if (!cronSchedule) return 'N/A';
  try {
    // Parse cron manually: minute hour day month weekday
    const parts = cronSchedule.trim().split(/\s+/);
    if (parts.length !== 5) return cronSchedule;
    const [min, hour, day, month, weekday] = parts;
    if (min === '*' && hour === '*') return 'Every minute';
    if (min !== '*' && hour === '*') return `Every hour at :${min.padStart(2,'0')}`;
    if (weekday !== '*') {
      const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
      const dayName = days[parseInt(weekday)] || weekday;
      return `Every ${dayName} at ${hour.padStart(2,'0')}:${min.padStart(2,'0')}`;
    }
    if (day !== '*') return `Monthly on day ${day} at ${hour.padStart(2,'0')}:${min.padStart(2,'0')}`;
    return `Daily at ${hour.padStart(2,'0')}:${min.padStart(2,'0')}`;
  } catch { return cronSchedule || 'N/A'; }
}

function describeCron(cron: string): string {
  const parts = cron.trim().split(' ');
  if (parts.length !== 5) return cron;
  const [min, hour, dom, month, dow] = parts;
  if (cron === '0 9 * * 1') return 'Every Monday at 9:00 AM';
  if (cron === '0 0 * * *') return 'Every day at midnight';
  if (cron === '0 */6 * * *') return 'Every 6 hours';
  if (cron === '*/30 * * * *') return 'Every 30 minutes';
  if (dow !== '*') return `Every ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][parseInt(dow)] || dow} at ${hour}:${min.padStart(2,'0')}`;
  if (dom !== '*') return `Monthly on day ${dom} at ${hour}:${min.padStart(2,'0')}`;
  return `At ${hour}:${min.padStart(2,'0')} daily`;
}

export default function SchedulerPage() {
  const toast = useToast();
  const [schedules, setSchedules] = useState<ScheduledJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [adding, setAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    type: "scan",
    connection_name: "",
    cron_schedule: "0 0 * * *",
  });

  const fetchSchedules = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/privacy/jobs?status=scheduled"); // assuming it supports filtering or returns all and we filter
      if (!res.ok) throw new Error("Failed to load schedules");
      const data = await res.json();
      const filtered = (data.jobs || []).filter((j: any) => j.cron_schedule != null);
      setSchedules(filtered);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  const add = async () => {
    if (!form.name || !form.connection_name || !form.cron_schedule) {
      toast.error("Validation Error", "Name, connection, and schedule are required.");
      return;
    }
    try {
      setSubmitting(true);
      const res = await fetch("/api/privacy/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          type: form.type,
          connection_name: form.connection_name,
          cron_schedule: form.cron_schedule
        })
      });
      if (!res.ok) throw new Error("Failed to create schedule");
      toast.success("Schedule Created", `"${form.name}" has been scheduled.`);
      setAdding(false);
      setForm({ name: "", type: "scan", connection_name: "", cron_schedule: "0 0 * * *" });
      fetchSchedules();
    } catch (err: any) {
      toast.error("Error", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const togglePause = async (id: string, currentStatus: string) => {
    const isPaused = currentStatus === 'paused';
    try {
      const res = await fetch(`/api/privacy/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_paused: !isPaused })
      });
      if (!res.ok) throw new Error("Failed to update status");
      toast.success("Updated", isPaused ? "Schedule resumed" : "Schedule paused");
      fetchSchedules();
    } catch (err: any) {
      toast.error("Error", err.message);
    }
  };

  const deleteSchedule = async (id: string) => {
    try {
      const res = await fetch(`/api/privacy/jobs/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete schedule");
      toast.success("Deleted", "Schedule removed successfully.");
      setDeleteConfirmId(null);
      fetchSchedules();
    } catch (err: any) {
      toast.error("Error", err.message);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Scheduler"
        subtitle="Automate runs on a recurring schedule"
      >
        <button
          onClick={() => setAdding((p) => !p)}
          className="bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> New Schedule
        </button>
      </PageHeader>

      {adding && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0A0F1A] border border-violet-500/30 rounded-2xl p-6 space-y-4"
        >
          <h3 className="font-semibold text-white">New Recurring Schedule</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">
                Schedule Name
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Nightly Prod Scan"
                className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">
                Job Type
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 appearance-none"
              >
                <option value="scan">Scan</option>
                <option value="mask">Mask</option>
                <option value="anonymize">Anonymize</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">
                Connection Name
              </label>
              <input
                value={form.connection_name}
                onChange={(e) => setForm((p) => ({ ...p, connection_name: e.target.value }))}
                placeholder="e.g. prod-postgres"
                className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2 block">
                Cron Expression
              </label>
              <input
                value={form.cron_schedule}
                onChange={(e) => setForm((p) => ({ ...p, cron_schedule: e.target.value }))}
                placeholder="0 0 * * *"
                className="w-full bg-[#080D18] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-violet-500/50 font-mono"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {[
                  { label: "Daily", val: "0 0 * * *" },
                  { label: "Weekly", val: "0 9 * * 1" },
                  { label: "Every 30m", val: "*/30 * * * *" }
                ].map(ex => (
                  <button 
                    key={ex.label}
                    onClick={() => setForm(p => ({...p, cron_schedule: ex.val}))}
                    className="text-[10px] px-2 py-1 bg-white/5 hover:bg-white/10 text-white/60 rounded"
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={add}
              disabled={submitting}
              className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white text-sm font-medium px-5 py-2 rounded-xl transition-colors"
            >
              {submitting ? 'Creating...' : 'Create Schedule'}
            </button>
            <button
              onClick={() => setAdding(false)}
              className="text-white/40 hover:text-white text-sm px-4 py-2 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden min-h-[300px]"
      >
        {loading ? (
          <div className="p-8 space-y-4">
             {[...Array(3)].map((_, i) => (
               <div key={i} className="h-12 bg-white/5 rounded-lg animate-pulse" />
             ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-12">
            <AlertCircle className="w-8 h-8 text-red-400 mb-4" />
            <p className="text-white mb-4">{error}</p>
            <button onClick={fetchSchedules} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm">Retry</button>
          </div>
        ) : schedules.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-full text-center p-16">
             <CalendarClock className="w-12 h-12 text-white/20 mb-4" />
             <h3 className="text-white font-medium mb-2">No scheduled jobs</h3>
             <p className="text-white/50 text-sm">Create one to automate your privacy scans.</p>
           </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#080D18]">
              <tr>
                {[
                  "Name",
                  "Type",
                  "Connection",
                  "Schedule",
                  "Next Run",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3.5 text-xs text-white/40 font-medium"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {schedules.map((s) => (
                <tr key={s.id} className="hover:bg-white/[0.02]">
                  <td className="px-5 py-4 text-white font-medium">{s.name}</td>
                  <td className="px-5 py-4 text-white/60 capitalize text-xs">
                    {s.type}
                  </td>
                  <td className="px-5 py-4 text-white/60 font-mono text-xs">
                    {s.connection_name || '-'}
                  </td>
                  <td className="px-5 py-4 text-white/50 text-xs">
                    <div className="flex flex-col">
                      <span>{describeCron(s.cron_schedule)}</span>
                      <span className="font-mono text-[10px] text-white/30">{s.cron_schedule}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-white/70 text-xs">
                    <Clock className="w-3 h-3 inline mr-1" />
                    {getNextRunText(s.cron_schedule)}
                  </td>
                  <td className="px-5 py-4">
                    {s.status !== "paused" ? (
                      <span className="flex items-center gap-1 text-xs text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-white/40">
                        <Pause className="w-3.5 h-3.5" />
                        Paused
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        onClick={() => togglePause(s.id, s.status)}
                        className="text-white/40 hover:text-white transition-colors"
                        title={s.status === 'paused' ? 'Resume' : 'Pause'}
                      >
                        {s.status === 'paused' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                      </button>
                      
                      {deleteConfirmId === s.id ? (
                        <div className="flex items-center gap-2">
                           <button onClick={() => deleteSchedule(s.id)} className="text-red-400 hover:text-red-300 text-xs font-medium">Confirm</button>
                           <button onClick={() => setDeleteConfirmId(null)} className="text-white/40 hover:text-white text-xs">Cancel</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(s.id)}
                          className="text-white/20 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}
