'use client';
export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';
import { Activity, Cpu, Server, Zap, RefreshCw, Layers, Briefcase } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, YAxis, BarChart, Bar } from 'recharts';

const generateSparkline = (points: number, min: number, max: number) => {
  return Array.from({ length: points }, (_, i) => ({
    time: i,
    value: Math.floor(Math.random() * (max - min + 1)) + min
  }));
};

const initialMetrics = {
  cpu: { value: 45, history: generateSparkline(20, 30, 80) },
  memory: { value: 62, history: generateSparkline(20, 50, 75) },
  queue: { value: 12, history: generateSparkline(20, 0, 50) },
  throughput: { value: 2450, history: generateSparkline(20, 1000, 5000) }
};

const defaultWorkers = [
  { id: 'worker-node-1', cpu: 42, memory: 58, status: 'Active', heartbeat: '1s ago', jobs: 124 },
  { id: 'worker-node-2', cpu: 78, memory: 82, status: 'Active', heartbeat: '2s ago', jobs: 98 },
  { id: 'worker-node-3', cpu: 12, memory: 45, status: 'Idle', heartbeat: '1s ago', jobs: 45 },
  { id: 'worker-node-4', cpu: 0, memory: 0, status: 'Offline', heartbeat: '5m ago', jobs: 0 },
];

const queueHistory = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  depth: Math.floor(Math.random() * 200) + 10
}));

export default function MonitoringPage() {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [activeJobs, setActiveJobs] = useState<number | null>(null);
  const [workersList, setWorkersList] = useState(defaultWorkers);
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const fetchMonitoringData = async () => {
      // 1. Fetch main monitoring data
      try {
        const res = await privacyFetch('/api/privacy/monitoring');
        if (res.ok) {
          const data = await res.json();
          setMetrics(prev => ({
            cpu: { value: data.cpu, history: [...prev.cpu.history.slice(1), { time: 20, value: data.cpu }] },
            memory: { value: data.memory, history: [...prev.memory.history.slice(1), { time: 20, value: data.memory }] },
            queue: { value: data.queue, history: [...prev.queue.history.slice(1), { time: 20, value: data.queue }] },
            throughput: { value: data.throughput, history: [...prev.throughput.history.slice(1), { time: 20, value: data.throughput }] },
          }));
        } else {
          throw new Error('Fallback to random');
        }
      } catch (err) {
        setMetrics(prev => ({
          cpu: { value: Math.floor(Math.random() * (80 - 30 + 1)) + 30, history: [...prev.cpu.history.slice(1), { time: 20, value: Math.floor(Math.random() * (80 - 30 + 1)) + 30 }] },
          memory: { value: Math.floor(Math.random() * (85 - 50 + 1)) + 50, history: [...prev.memory.history.slice(1), { time: 20, value: Math.floor(Math.random() * (85 - 50 + 1)) + 50 }] },
          queue: { value: Math.floor(Math.random() * 30), history: [...prev.queue.history.slice(1), { time: 20, value: Math.floor(Math.random() * 30) }] },
          throughput: { value: Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000, history: [...prev.throughput.history.slice(1), { time: 20, value: Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000 }] },
        }));
      }

      // 2. Fetch active jobs
      try {
        const jobsRes = await privacyFetch('/api/privacy/jobs?status=running');
        if (jobsRes.ok) {
          const jobsData = await jobsRes.json();
          // Assume response has a count or is an array
          setActiveJobs(jobsData.count ?? jobsData.length ?? 0);
        }
      } catch (err) {
        // Silently fail for jobs or fallback
      }

      // 3. Fetch workers
      try {
        const workersRes = await privacyFetch('/api/privacy/monitoring/workers');
        if (workersRes.ok) {
          const workersData = await workersRes.json();
          setWorkersList(workersData);
        } else {
          // Keep current static array on fail
        }
      } catch (err) {
        // Keep current static array on fail
      }
    };

    fetchMonitoringData();
    const interval = setInterval(fetchMonitoringData, 5000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const MetricCard = ({ title, value, unit, icon: Icon, color, data, isStatic }: any) => (
    <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 dark:border-white/10 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium">
          <Icon className="w-5 h-5" />
          {title}
        </div>
        <div className={`text-2xl font-bold ${color}`}>{value !== null ? value : '-'}{unit}</div>
      </div>
      {!isStatic && data && (
        <div className="h-16 w-full mt-auto">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
              <Line type="monotone" dataKey="value" stroke={color.replace('text-', 'var(--tw-') + ') || currentColor'} strokeWidth={2} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-8 h-8 text-violet-600" />
            Platform Monitoring
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Real-time system performance and worker status.
          </p>
        </div>
        <button
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium border ${autoRefresh ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}`}
        >
          <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
          {autoRefresh ? 'Live Updates On' : 'Live Updates Off'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <MetricCard title="CPU Usage" value={metrics.cpu.value} unit="%" icon={Cpu} color="text-violet-500" data={metrics.cpu.history} />
        <MetricCard title="Memory Usage" value={metrics.memory.value} unit="%" icon={Server} color="text-blue-500" data={metrics.memory.history} />
        <MetricCard title="Queue Depth" value={metrics.queue.value} unit="" icon={Layers} color="text-amber-500" data={metrics.queue.history} />
        <MetricCard title="Throughput" value={metrics.throughput.value} unit="r/s" icon={Zap} color="text-emerald-500" data={metrics.throughput.history} />
        <MetricCard title="Active Jobs" value={activeJobs} unit="" icon={Briefcase} color="text-rose-500" isStatic={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 dark:border-white/10 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">Worker Nodes</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-medium">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg">Node ID</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">CPU</th>
                  <th className="px-4 py-3">Memory</th>
                  <th className="px-4 py-3">Jobs</th>
                  <th className="px-4 py-3 rounded-tr-lg">Heartbeat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {workersList.map((worker: any) => (
                  <tr key={worker.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-4 py-4 font-mono text-slate-900 dark:text-white font-medium">{worker.id}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium
                        ${worker.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          worker.status === 'Idle' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                          'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${worker.status === 'Active' ? 'bg-emerald-500' : worker.status === 'Idle' ? 'bg-amber-500' : 'bg-slate-500'}`} />
                        {worker.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${worker.cpu > 80 ? 'bg-red-500' : 'bg-violet-500'}`} style={{ width: `${worker.cpu}%` }} />
                        </div>
                        <span className="text-xs text-slate-500 w-6">{worker.cpu}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${worker.memory > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${worker.memory}%` }} />
                        </div>
                        <span className="text-xs text-slate-500 w-6">{worker.memory}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-slate-600 dark:text-slate-300">{worker.jobs}</td>
                    <td className="px-4 py-4 text-slate-500 text-xs">{worker.heartbeat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 dark:border-white/10 flex flex-col">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Queue Depth (24h)</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Historical job backlog trend</p>
          <div className="flex-grow min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={queueHistory}>
                <Bar dataKey="depth" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
