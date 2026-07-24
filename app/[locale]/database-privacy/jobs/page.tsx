'use client'

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Play, CheckCircle, XCircle, Clock, AlertCircle, Plus, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

const JOBS = [
  { id: 105, name: 'Weekly PII Scan', type: 'Scan', status: 'running', progress: 67, connection: 'prod-postgres', rows: 54221, duration: '2m 14s', created: '5m ago', logs: ['[INFO] Starting scan on prod-postgres', '[INFO] Scanning table: users (12,450 rows)', '[WARN] Found SSN pattern in column: ssn_hash', '[INFO] Progress: 67% complete'] },
  { id: 104, name: 'Mask Emails Batch', type: 'Mask', status: 'completed', progress: 100, connection: 'analytics-mysql', rows: 12048, duration: '1.8s', created: '15m ago', logs: ['[INFO] Masking rule: Hash SHA-256 on email', '[INFO] Processed 12,048 rows', '[INFO] Job completed successfully'] },
  { id: 103, name: 'Anonymize Users Export', type: 'Anonymize', status: 'completed', progress: 100, connection: 'prod-postgres', rows: 45231, duration: '3.2s', created: '1h ago', logs: ['[INFO] Anonymization complete'] },
  { id: 102, name: 'Legacy Data Cleanup', type: 'Mask', status: 'failed', progress: 23, connection: 'user-mongodb', rows: 0, duration: '—', created: '2h ago', error: 'Connection timeout after 30s', logs: ['[ERROR] Connection timeout after 30s', '[INFO] Job failed at 23%'] },
  { id: 101, name: 'Daily Compliance Scan', type: 'Scan', status: 'scheduled', progress: 0, connection: 'prod-postgres', rows: 0, duration: '—', created: '1 day ago', logs: [] },
];

export default function JobsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const [activeTab, setActiveTab] = useState('All');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const filteredJobs = activeTab === 'All' ? JOBS : JOBS.filter(j => j.status.toLowerCase() === activeTab.toLowerCase());

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <Loader2 className="w-4 h-4 mr-1 animate-spin" />;
      case 'completed': return <CheckCircle className="w-4 h-4 mr-1" />;
      case 'failed': return <XCircle className="w-4 h-4 mr-1" />;
      case 'scheduled': return <Clock className="w-4 h-4 mr-1" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'scheduled': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 font-sans text-slate-900 dark:text-slate-100">
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
            <span className="font-semibold mr-2 text-xl">5</span> Total
          </div>
          <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm glass-panel text-sm flex items-center text-blue-600 dark:text-blue-400">
            <span className="font-semibold mr-2 text-xl">1</span> Running
          </div>
          <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm glass-panel text-sm flex items-center text-emerald-600 dark:text-emerald-500">
            <span className="font-semibold mr-2 text-xl">3</span> Completed
          </div>
          <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm glass-panel text-sm flex items-center text-red-600 dark:text-red-500">
            <span className="font-semibold mr-2 text-xl">1</span> Failed
          </div>
          <div className="bg-white dark:bg-slate-900 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm glass-panel text-sm flex items-center text-amber-600 dark:text-amber-500">
            <span className="font-semibold mr-2 text-xl">1</span> Scheduled
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm glass-panel overflow-hidden">
          <div className="border-b border-slate-200 dark:border-slate-800 flex overflow-x-auto px-2">
            {['All', 'Running', 'Completed', 'Failed', 'Scheduled'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'border-violet-600 text-violet-600 dark:border-violet-400 dark:text-violet-400' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto">
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
                  <th className="px-6 py-4 font-medium">Created</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredJobs.map((job) => (
                  <React.Fragment key={job.id}>
                    <tr 
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                      onClick={() => setExpandedRow(expandedRow === job.id ? null : job.id)}
                    >
                      <td className="px-6 py-4 font-medium">#{job.id}</td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{job.name}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {job.type}
                        </span>
                      </td>
                      <td className="px-6 py-4">{job.connection}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium w-fit ${getStatusColor(job.status)}`}>
                            {getStatusIcon(job.status)}
                            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                          </span>
                          {job.status === 'running' && (
                            <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1">
                              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${job.progress}%` }}></div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500">{job.rows.toLocaleString()}</td>
                      <td className="px-6 py-4 text-slate-500">{job.duration}</td>
                      <td className="px-6 py-4 text-slate-500">{job.created}</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                          {expandedRow === job.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                        </button>
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
                              className="overflow-hidden bg-slate-50 dark:bg-slate-900/50"
                            >
                              <div className="p-6">
                                <h4 className="text-sm font-semibold mb-3 flex items-center">
                                  <AlertCircle className="w-4 h-4 mr-2 text-violet-500" />
                                  Execution Logs
                                </h4>
                                {job.logs.length > 0 ? (
                                  <div className="bg-slate-900 text-slate-300 font-mono text-xs p-4 rounded-xl space-y-2 h-40 overflow-y-auto">
                                    {job.logs.map((log, idx) => (
                                      <div key={idx} className={`${log.includes('[ERROR]') ? 'text-red-400' : log.includes('[WARN]') ? 'text-amber-400' : 'text-slate-300'}`}>
                                        {log}
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-slate-500 italic">No logs available for this job.</p>
                                )}
                              </div>
                            </motion.div>
                          </td>
                        </tr>
                      )}
                    </AnimatePresence>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
            >
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="text-lg font-bold">Create New Job</h3>
                <button onClick={() => setShowCreate(false)} className="text-slate-400 hover:text-slate-500">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Job Name</label>
                  <input type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500 transition-shadow" placeholder="e.g. Weekly PII Scan" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500">
                      <option>Scan</option>
                      <option>Mask</option>
                      <option>Anonymize</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Connection</label>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500">
                      <option>prod-postgres</option>
                      <option>analytics-mysql</option>
                      <option>user-mongodb</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Target Table / Collection</label>
                  <input type="text" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500" placeholder="e.g. users" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Schedule</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-violet-500">
                    <option>Once (Run now)</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                  </select>
                </div>
              </div>
              <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex justify-end space-x-3">
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowCreate(false)}
                  className="px-4 py-2 bg-violet-600 text-white rounded-xl font-medium hover:bg-violet-700 transition-colors"
                >
                  Create & Run
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}