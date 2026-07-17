'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Clock, Database, PlayCircle, PauseCircle, XCircle } from 'lucide-react';
import { apiUrl } from '../../../lib/api';

interface Job {
  id: string;
  target: string;
  status: string;
  progress: number;
  rows_processed: number;
  estimated_time_remaining: string;
  started_at: string;
}

export function JobsModule() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch(apiUrl('/api/jobs'))
      .then(r => r.json())
      .then(setJobs)
      .catch(console.error);
  }, []);

  if (jobs.length === 0) return <div className="text-white/40 p-6">Loading jobs...</div>;

  return (
    <div className="space-y-6">
      {jobs.map(job => (
        <div key={job.id} className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-1 bg-violet-600 transition-all duration-1000 ease-in-out" style={{ width: `${job.progress}%` }} />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-500/20 text-violet-400">
                  <Activity className="w-4 h-4 animate-pulse" />
                </div>
                <h3 className="text-xl font-bold text-white">{job.id}</h3>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium border text-violet-400 bg-violet-400/10 border-violet-400/20">
                  {job.status}
                </span>
              </div>
              <p className="text-sm text-white/50 flex items-center gap-2">
                <Database className="w-4 h-4" /> Target: <span className="text-white/80">{job.target}</span>
              </p>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Rows Processed</p>
                <p className="text-2xl font-mono text-white">{job.rows_processed.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Est. Remaining</p>
                <p className="text-2xl font-mono text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-white/30" /> {job.estimated_time_remaining}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors" title="Pause">
                <PauseCircle className="w-5 h-5" />
              </button>
              <button className="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 flex items-center justify-center text-white/60 hover:text-red-400 transition-colors" title="Cancel">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}

      <div className="mt-12">
        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-4">Queued Jobs</h3>
        <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <PlayCircle className="w-6 h-6 text-white/20" />
          </div>
          <p className="text-white/60 font-medium">No jobs in queue</p>
          <p className="text-sm text-white/40 mt-1">Ready for the next masking operation.</p>
        </div>
      </div>
    </div>
  );
}
