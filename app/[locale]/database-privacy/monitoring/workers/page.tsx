'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Activity, Database, MemoryStick } from 'lucide-react';
import { PageHeader } from '../../../../components/platform/ui/PlatformUI';

const workers = [
  { id: 'worker-us-east-1a', status: 'healthy', version: '4.110.0', cpu: 12, mem: 34, requests: 487 },
  { id: 'worker-us-east-1b', status: 'healthy', version: '4.110.0', cpu: 8,  mem: 28, requests: 312 },
  { id: 'worker-eu-west-1a', status: 'healthy', version: '4.108.1', cpu: 21, mem: 41, requests: 201 },
];

export default function WorkersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Worker Nodes" subtitle="Status and performance metrics for all active Cloudflare Workers" />
      <div className="grid grid-cols-1 gap-4">
        {workers.map((w, i) => (
          <motion.div key={w.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="relative"><div className="w-3 h-3 rounded-full bg-emerald-400" /><div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-40" /></div>
                <span className="font-mono text-white font-medium">{w.id}</span>
                <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-lg border border-white/5">v{w.version}</span>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center"><p className="text-white/40 text-xs mb-1">Requests/min</p><p className="text-white font-mono font-bold">{w.requests}</p></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[{ label: 'CPU Usage', value: w.cpu, icon: Cpu, color: w.cpu > 70 ? 'bg-red-500' : w.cpu > 40 ? 'bg-amber-500' : 'bg-emerald-500' },
                { label: 'Memory', value: w.mem, icon: MemoryStick, color: w.mem > 70 ? 'bg-red-500' : w.mem > 40 ? 'bg-amber-500' : 'bg-blue-500' }
              ].map(m => (
                <div key={m.label} className="bg-white/[0.02] border border-white/5 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-white/50 flex items-center gap-1.5"><m.icon className="w-3.5 h-3.5" />{m.label}</span>
                    <span className="text-sm font-mono font-bold text-white">{m.value}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${m.color} rounded-full transition-all`} style={{ width: `${m.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
