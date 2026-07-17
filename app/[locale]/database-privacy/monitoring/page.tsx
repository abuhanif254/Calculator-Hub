'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Monitor, CheckCircle2, Cpu, MemoryStick, Activity, Zap } from 'lucide-react';
import { PageHeader, MetricCard } from '../../../components/platform/ui/PlatformUI';

const bars = [35, 42, 28, 51, 44, 38, 62, 47, 33, 55, 41, 48, 38, 45, 52, 40, 36, 44, 58, 43, 37, 50, 46, 42];

export default function MonitoringPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Platform Monitoring" subtitle="Worker health, performance metrics, and system status" />

      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-3">
        <div className="relative"><div className="w-2.5 h-2.5 rounded-full bg-emerald-400" /><div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-50" /></div>
        <span className="text-emerald-400 font-semibold text-sm">All Systems Operational</span>
        <span className="text-emerald-400/60 text-xs ml-auto">Last checked: just now</span>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Worker Uptime" value="99.9%" subtitle="Last 30 days" trend={0} icon={CheckCircle2} iconColor="text-emerald-400" iconBg="bg-emerald-500/10" delay={0} />
        <MetricCard title="Avg Response" value="42ms" subtitle="P95 latency" trend={-8} icon={Zap} iconColor="text-blue-400" iconBg="bg-blue-500/10" delay={0.05} />
        <MetricCard title="Memory Usage" value="34%" subtitle="Of allocated" trend={2} icon={MemoryStick} iconColor="text-amber-400" iconBg="bg-amber-500/10" delay={0.1} />
        <MetricCard title="Requests/min" value="127" subtitle="Current rate" trend={15} icon={Activity} iconColor="text-violet-400" iconBg="bg-violet-500/10" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-violet-400" />Response Time (last 24 requests)</h3>
          <div className="flex items-end gap-1 h-32">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm transition-all" style={{ height: `${h}%`, background: h > 55 ? '#ef4444' : '#8b5cf6', opacity: 0.7 + (i / bars.length) * 0.3 }} />
            ))}
          </div>
          <div className="flex justify-between text-xs text-white/30 mt-2"><span>24 req ago</span><span>Now</span></div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
          className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Cpu className="w-4 h-4 text-violet-400" />Worker Status</h3>
          <div className="space-y-4">
            {[{ id: 'us-east-1a', cpu: 12, mem: 34 }, { id: 'us-east-1b', cpu: 8, mem: 28 }, { id: 'eu-west-1a', cpu: 21, mem: 41 }].map(w => (
              <div key={w.id} className="flex items-center gap-4">
                <div className="relative"><div className="w-2 h-2 rounded-full bg-emerald-400" /><div className="absolute inset-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-40" /></div>
                <span className="font-mono text-xs text-white/70 w-28 shrink-0">worker-{w.id}</span>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2"><span className="text-xs text-white/30 w-8">CPU</span><div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${w.cpu}%` }} /></div><span className="text-xs text-white/50 w-8 text-right">{w.cpu}%</span></div>
                  <div className="flex items-center gap-2"><span className="text-xs text-white/30 w-8">MEM</span><div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-violet-500 rounded-full" style={{ width: `${w.mem}%` }} /></div><span className="text-xs text-white/50 w-8 text-right">{w.mem}%</span></div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
