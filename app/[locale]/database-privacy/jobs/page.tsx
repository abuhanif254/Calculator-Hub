"use client";
export const runtime = 'edge';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';
import { Play, CheckCircle, XCircle, Clock, AlertCircle, Plus, ChevronDown, ChevronUp, Loader2, RotateCcw, StopCircle } from 'lucide-react';

interface Job {
  id: string;
  name: string;
  type: 'scan' | 'mask' | 'anonymize';
  status: 'running' | 'completed' | 'failed' | 'scheduled' | 'cancelled';
  progress: number;
  connection_name: string | null;
  rows_processed: number;
  findings_count: number;
  duration_ms: number | null;
  cron_schedule: string | null;
  is_paused: boolean;
  error_message: string | null;
  logs: Array<{ level: string; message: string; timestamp: string }>;
  started_at: string | null;
  completed_at: string | null;
  created_at: string;
}

export default function JobsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const [jobs, setJobs] = useState<Job[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'All' | 'running' | 'completed' | 'failed' | 'scheduled'>('All');
  
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [jobDetail, setJobDetail] = useState<Job | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ name: '', type: 'scan', connection_name: '', cron_schedule: '' });
  const [creating, setCreating] = useState(false);
  
  const [cancelConfirmId, setCancelConfirmId] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);
  
  const [retryingId, setRetryingId] = useState<string | null>(null);
  
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const url = activeTab === 'All' ? '/api/privacy/jobs' : `/api/privacy/jobs?status=${activeTab}`;
      const res = await privacyFetch(url);
      if (!res.ok) throw new Error('Failed to fetch jobs');
      const data = await res.json();
      setJobs(data.jobs || []);
      setTotal(data.total || 0);
    } catch (err) {
      showToast('Error fetching jobs', 'error');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const fetchJobDetail = async (id: string) => {
    if (expandedRow === id) {
      setExpandedRow(null);
      setJobDetail(null);
      return;
    }
    setExpandedRow(id);
    setLoadingDetail(true);
    try {
      const res = await privacyFetch(`/api/privacy/jobs/${id}`);
      if (!res.ok) throw new Error('Failed to fetch job detail');
      const data = await res.json();
      setJobDetail(data.job);
    } catch (err) {
      showToast('Error fetching job details', 'error');
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleCreate = async () => {
    if (!createForm.name) return showToast('Job name is required', 'error');
    setCreating(true);
    try {
      const res = await privacyFetch('/api/privacy/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createForm),
      });
      if (!res.ok) throw new Error('Failed to create job');
      const newJob = await res.json();
      setJobs(prev => [newJob, ...prev]);
      setShowCreate(false);
      setCreateForm({ name: '', type: 'scan', connection_name: '', cron_schedule: '' });
      showToast('Job created successfully', 'success');
      fetchJobs();
    } catch (err) {
      showToast('Error creating job', 'error');
    } finally {
      setCreating(false);
    }
  };

  const handleCancel = async (id: string) => {
    setCancelling(true);
    try {
      const res = await privacyFetch(`/api/privacy/jobs/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to cancel job');
      showToast('Job cancelled', 'success');
      setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'cancelled' } : j));
      setCancelConfirmId(null);
    } catch (err) {
      showToast('Error cancelling job', 'error');
    } finally {
      setCancelling(false);
    }
  };

  const handleRetry = async (id: string) => {
    setRetryingId(id);
    try {
      const res = await privacyFetch(`/api/privacy/jobs/${id}/retry`, { method: 'POST' });
      if (!res.ok) throw new Error('Failed to retry job');
      const retriedJob = await res.json();
      setJobs(prev => prev.map(j => j.id === id ? retriedJob : j));
      showToast('Job retried successfully', 'success');
    } catch (err) {
      showToast('Error retrying job', 'error');
    } finally {
      setRetryingId(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Loader2 className="w-4 h-4 mr-1 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'failed': return <XCircle className="w-4 h-4 mr-1" />;
      case 'scheduled': return <Clock className="w-4 h-4 mr-1" />;
      case 'cancelled': return <StopCircle className="w-4 h-4 mr-1" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'scheduled': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      case 'cancelled': return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  const formatDuration = (ms: number | null) => {
    if (ms == null) return 'â€”';
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${m}m ${s}s`;
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return 'â€”';
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const stats = {
    running: jobs.filter(j => j.status === 'running').length,
    completed: jobs.filter(j => j.status === 'completed').length,
    failed: jobs.filter(j => j.status === 'failed').length,
    scheduled: jobs.filter(j => j.status === 'scheduled').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 font-sans text-slate-900 dark:text-slate-100 relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg flex items-center font-medium ${
              toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
            }`}
          >
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5 mr-2" /> : <XCircle className="w-5 h-5 mr-2" />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Anonymization Jobs</h1>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center px-4 py-2 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Job
          </button>
        </div>

        <div className="flex gap-4 mb-6 flex-wrap">
          <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm glass-panel text-sm flex items-center">
            <span className="font-semibold mr-2 text-xl">{total}</span> Total
          </div>
          <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm glass-panel text-sm flex items-center text-blue-600 dark:text-blue-400">
            <span className="font-semibold mr-2 text-xl">{stats.running}</span> Running
          </div>
          <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm glass-panel text-sm flex items-center text-emerald-600 dark:text-emerald-500">
            <span className="font-semibold mr-2 text-xl">{stats.completed}</span> Completed
          </div>
          <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm glass-panel text-sm flex items-center text-red-600 dark:text-red-500">
            <span className="font-semibold mr-2 text-xl">{stats.failed}</span> Failed
          </div>
          <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm glass-panel text-sm flex items-center text-amber-600 dark:text-amber-500">
            <span className="font-semibold mr-2 text-xl">{stats.scheduled}</span> Scheduled
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm glass-panel overflow-hidden">
          <div className="border-b border-slate-200 dark:border-slate-800 flex overflow-x-auto px-2">
            {['All', 'running', 'completed', 'failed', 'scheduled'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors capitalize ${
                  activeTab === tab 
                    ? 'border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto min-h-[300px]">
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="w-8 h-8 animate-spin text-violet-500" />
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 dark:text-slate-400">
                  <tr>
                    <th className="px-6 py-4 font-medium">ID</th>
                    <th className="px-6 py-4 font-medium">Name</th>
                    <th className="px-6 py-4 font-medium">Type</th>
                    <th className="px-6 py-4 font-medium">Connection</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium">Rows</th>
                    <th className="px-6 py-4 font-medium">Duration</th>
                    <th className="px-6 py-4 font-medium">Created At</th>
                    <th className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {jobs.map((job) => (
                    <React.Fragment key={job.id}>
                      <tr 
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                        onClick={() => fetchJobDetail(job.id)}
                      >
                        <td className="px-6 py-4 font-medium text-slate-500 text-xs">
                          {job.id.substring(0, 8)}
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{job.name}</td>
                        <td className="px-6 py-4 capitalize">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                            {job.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{job.connection_name || 'â€”'}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col space-y-1">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${getStatusColor(job.status)}`}>
                              {getStatusIcon(job.status)}
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </span>
                            {job.status === 'running' && (
                              <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1">
                                <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-300" style={{ width: `${job.progress}%` }}></div>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-500">{job.rows_processed?.toLocaleString() || 0}</td>
                        <td className="px-6 py-4 text-slate-500">{formatDuration(job.duration_ms)}</td>
                        <td className="px-6 py-4 text-slate-500">{formatDate(job.created_at)}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end space-x-2" onClick={(e) => e.stopPropagation()}>
                            {job.status === 'failed' && (
                              <button 
                                onClick={() => handleRetry(job.id)}
                                disabled={retryingId === job.id}
                                className="text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 p-1"
                                title="Retry Job"
                              >
                                <RotateCcw className={`w-4 h-4 ${retryingId === job.id ? 'animate-spin' : ''}`} />
                              </button>
                            )}
                            {(job.status === 'running' || job.status === 'scheduled') && (
                              cancelConfirmId === job.id ? (
                                <div className="flex items-center space-x-2">
                                  <button onClick={() => handleCancel(job.id)} className="text-xs text-red-600 font-bold">Confirm</button>
                                  <button onClick={() => setCancelConfirmId(null)} className="text-xs text-slate-500">Back</button>
                                </div>
                              ) : (
                                <button 
                                  onClick={() => setCancelConfirmId(job.id)}
                                  className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-1"
                                  title="Cancel Job"
                                >
                                  <StopCircle className="w-4 h-4" />
                                </button>
                              )
                            )}
                            <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 pointer-events-none">
                              {expandedRow === job.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </button>
                          </div>
                        </td>
                      </tr>
                      <AnimatePresence>
                        {expandedRow === job.id && (
                          <tr>
                            <td colSpan={9} className="p-0">
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800"
                              >
                                <div className="p-6">
                                  {loadingDetail ? (
                                    <div className="flex items-center text-sm text-slate-500">
                                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Loading details...
                                    </div>
                                  ) : (
                                    <>
                                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                        <div>
                                          <span className="font-semibold block text-slate-500">Started At</span>
                                          <span>{formatDate(jobDetail?.started_at || '')}</span>
                                        </div>
                                        <div>
                                          <span className="font-semibold block text-slate-500">Completed At</span>
                                          <span>{formatDate(jobDetail?.completed_at || '')}</span>
                                        </div>
                                        {jobDetail?.error_message && (
                                          <div className="col-span-2 bg-red-100 dark:bg-red-900/30 p-3 rounded-lg border border-red-200 dark:border-red-800/50">
                                            <span className="font-semibold block text-red-800 dark:text-red-400">Error Message</span>
                                            <span className="text-red-700 dark:text-red-300">{jobDetail.error_message}</span>
                                          </div>
                                        )}
                                      </div>
                                      
                                      <h4 className="text-sm font-semibold mb-3 flex items-center">
                                        <AlertCircle className="w-4 h-4 mr-2 text-violet-500" />
                                        Execution Logs
                                      </h4>
                                      
                                      {jobDetail?.logs && jobDetail.logs.length > 0 ? (
                                        <div className="bg-[#0f172a] text-slate-300 font-mono text-xs p-4 rounded-xl space-y-2 max-h-64 overflow-y-auto shadow-inner">
                                          {jobDetail.logs.map((log, idx) => (
                                            <div key={idx} className="flex gap-3 whitespace-pre-wrap">
                                              <span className="text-slate-500 shrink-0">
                                                {new Date(log.timestamp).toLocaleTimeString([], { hour12: false })}
                                              </span>
                                              <span className={`font-semibold shrink-0 ${
                                                log.level === 'ERROR' ? 'text-red-400' :
                                                log.level === 'WARN' ? 'text-amber-400' :
                                                'text-blue-400'
                                              }`}>
                                                [{log.level}]
                                              </span>
                                              <span className={
                                                log.level === 'ERROR' ? 'text-red-300' :
                                                log.level === 'WARN' ? 'text-amber-200' :
                                                'text-slate-300'
                                              }>
                                                {log.message}
                                              </span>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <p className="text-sm text-slate-500 italic">No logs available for this job.</p>
                                      )}
                                    </>
                                  )}
                                </div>
                              </motion.div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                  {jobs.length === 0 && !loading && (
                    <tr>
                      <td colSpan={9} className="px-6 py-12 text-center text-slate-500">
                        No jobs found. Click "Create Job" to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>

      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/20">
                <h3 className="text-lg font-bold">Create New Job</h3>
                <button onClick={() => setShowCreate(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Job Name</label>
                  <input 
                    type="text" 
                    value={createForm.name}
                    onChange={(e) => setCreateForm({...createForm, name: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500 transition-shadow" 
                    placeholder="e.g. Weekly PII Scan" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select 
                      value={createForm.type}
                      onChange={(e) => setCreateForm({...createForm, type: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500 appearance-none"
                    >
                      <option value="scan">Scan</option>
                      <option value="mask">Mask</option>
                      <option value="anonymize">Anonymize</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Connection Name</label>
                    <input 
                      type="text"
                      value={createForm.connection_name}
                      onChange={(e) => setCreateForm({...createForm, connection_name: e.target.value})}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500"
                      placeholder="e.g. prod-db"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center justify-between">
                    <span>Cron Schedule</span>
                    <span className="text-xs text-slate-500 font-normal">Optional</span>
                  </label>
                  <input 
                    type="text" 
                    value={createForm.cron_schedule}
                    onChange={(e) => setCreateForm({...createForm, cron_schedule: e.target.value})}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500 font-mono text-sm" 
                    placeholder="0 9 * * 1 (every Monday at 9am)" 
                  />
                </div>
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreate(false)}
                  disabled={creating}
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  disabled={creating || !createForm.name}
                  className="inline-flex items-center px-4 py-2 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Create Job
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}