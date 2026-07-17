'use client';

import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid
} from 'recharts';
import {
  Database, Server, Cpu, Play, XCircle, CheckCircle2, ScanSearch, ShieldCheck,
  Plus, Shield, Zap, FileBarChart2, TrendingUp, Clock, AlertCircle,
  MoreHorizontal, ExternalLink
} from 'lucide-react';
import { MetricCard, StatusBadge, PageHeader } from '../../../components/platform/ui/PlatformUI';

// ── Mock data ──────────────────────────────────────────────────────────────

const jobHistoryData = [
  { date: 'Jul 7', completed: 12, failed: 1 },
  { date: 'Jul 8', completed: 18, failed: 0 },
  { date: 'Jul 9', completed: 9, failed: 3 },
  { date: 'Jul 10', completed: 24, failed: 1 },
  { date: 'Jul 11', completed: 31, failed: 2 },
  { date: 'Jul 12', completed: 19, failed: 0 },
  { date: 'Jul 13', completed: 27, failed: 1 },
  { date: 'Jul 14', completed: 14, failed: 0 },
];

const processingTimeData = [
  { name: 'CSV', avg: 0.8 },
  { name: 'JSON', avg: 1.2 },
  { name: 'SQL', avg: 2.1 },
  { name: 'XML', avg: 1.7 },
  { name: 'TXT', avg: 0.5 },
];

const maskingStatsData = [
  { name: 'Emails', value: 2841, color: '#8b5cf6' },
  { name: 'Credit Cards', value: 389, color: '#ef4444' },
  { name: 'IPs', value: 1204, color: '#3b82f6' },
  { name: 'Phones', value: 758, color: '#f59e0b' },
  { name: 'SSNs', value: 127, color: '#10b981' },
  { name: 'Custom', value: 445, color: '#6366f1' },
];

const errorRateData = [
  { date: 'Jul 7', rate: 7.7 },
  { date: 'Jul 8', rate: 0 },
  { date: 'Jul 9', rate: 25 },
  { date: 'Jul 10', rate: 4 },
  { date: 'Jul 11', rate: 6 },
  { date: 'Jul 12', rate: 0 },
  { date: 'Jul 13', rate: 3.6 },
  { date: 'Jul 14', rate: 0 },
];

const activityFeed = [
  { icon: '📁', text: 'File uploaded and anonymized successfully', time: '2m ago', type: 'success' },
  { icon: '🔍', text: 'PII scan discovered 245 sensitive columns', time: '8m ago', type: 'info' },
  { icon: '✅', text: 'Job #103 completed in 1.8s — 2,841 emails masked', time: '15m ago', type: 'success' },
  { icon: '❌', text: 'Job #99 failed — regex timeout on large file', time: '1h ago', type: 'error' },
  { icon: '⚙️', text: 'Custom masking rule "EMP-ID" created', time: '2h ago', type: 'info' },
  { icon: '📊', text: 'Compliance score updated: 94%', time: '3h ago', type: 'info' },
  { icon: '🔄', text: 'Job #97 retried and completed successfully', time: '4h ago', type: 'success' },
];

const recentJobs = [
  { id: 103, name: 'production-dump.csv', status: 'completed' as const, duration: '1.8s', rows: 12048, time: '2m ago' },
  { id: 102, name: 'users_export.json', status: 'completed' as const, duration: '3.2s', rows: 45231, time: '8m ago' },
  { id: 101, name: 'orders_backup.sql', status: 'running' as const, duration: '—', rows: 0, time: 'now' },
  { id: 100, name: 'legacy_users.xml', status: 'failed' as const, duration: '—', rows: 0, time: '1h ago' },
  { id: 99, name: 'analytics.csv', status: 'completed' as const, duration: '0.5s', rows: 3200, time: '2h ago' },
];

// ── Custom tooltip ─────────────────────────────────────────────────────────

const DarkTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0E1628] border border-white/10 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-white/50 mb-1">{label}</p>
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
};

// ── Dashboard Page ─────────────────────────────────────────────────────────

export default function DashboardPage() {
  const totalMasked = maskingStatsData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Overview of your Data Privacy Platform"
      >
        <button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" />
          New Job
        </button>
      </PageHeader>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Total Files Processed" value="1,284" subtitle="All time" trend={12} icon={Database} delay={0} />
        <MetricCard title="Active Jobs" value="1" subtitle="Currently running" trend={0} icon={Play} iconColor="text-blue-400" iconBg="bg-blue-500/10" delay={0.05} />
        <MetricCard title="Failed Jobs" value="3" subtitle="Last 24 hours" trend={-25} icon={XCircle} iconColor="text-red-400" iconBg="bg-red-500/10" delay={0.1} />
        <MetricCard title="Success Rate" value="98.2%" subtitle="Last 30 days" trend={2} icon={CheckCircle2} iconColor="text-emerald-400" iconBg="bg-emerald-500/10" delay={0.15} />
        <MetricCard title="PII Found" value="5,764" subtitle="Across all scans" trend={8} icon={ScanSearch} iconColor="text-amber-400" iconBg="bg-amber-500/10" delay={0.2} />
        <MetricCard title="Data Points Masked" value={totalMasked.toLocaleString()} subtitle="Deterministic synthetic" trend={15} icon={Shield} iconColor="text-violet-400" iconBg="bg-violet-500/10" delay={0.25} />
        <MetricCard title="Avg. Process Time" value="1.4s" subtitle="Per file" trend={-8} icon={Clock} iconColor="text-indigo-400" iconBg="bg-indigo-500/10" delay={0.3} />
        <MetricCard title="Compliance Score" value="94%" subtitle="GDPR + PCI DSS" trend={3} icon={ShieldCheck} iconColor="text-emerald-400" iconBg="bg-emerald-500/10" delay={0.35} />
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Job History — spans 2 cols */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-2 bg-white/[0.04] border border-white/8 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Job History</h3>
              <p className="text-xs text-white/30">Last 8 days</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-500" /> Completed</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" /> Failed</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={jobHistoryData}>
              <defs>
                <linearGradient id="completedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="failedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<DarkTooltip />} />
              <Area type="monotone" dataKey="completed" name="Completed" stroke="#8b5cf6" strokeWidth={2} fill="url(#completedGrad)" />
              <Area type="monotone" dataKey="failed" name="Failed" stroke="#ef4444" strokeWidth={2} fill="url(#failedGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Masking Stats Donut */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="bg-white/[0.04] border border-white/8 rounded-2xl p-5"
        >
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white">Masking Breakdown</h3>
            <p className="text-xs text-white/30">By PII type — {totalMasked.toLocaleString()} total</p>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={maskingStatsData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value" strokeWidth={0}>
                {maskingStatsData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<DarkTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {maskingStatsData.map((d, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-xs text-white/40">{d.name}</span>
                </div>
                <span className="text-xs text-white/60 font-medium">{d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Processing Time Bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="bg-white/[0.04] border border-white/8 rounded-2xl p-5"
        >
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white">Avg. Process Time</h3>
            <p className="text-xs text-white/30">By file format (seconds)</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={processingTimeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
              <Tooltip content={<DarkTooltip />} />
              <Bar dataKey="avg" name="Avg (s)" fill="#8b5cf6" radius={[0, 4, 4, 0]} opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Error Rate Line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          className="bg-white/[0.04] border border-white/8 rounded-2xl p-5"
        >
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white">Error Rate</h3>
            <p className="text-xs text-white/30">% of failed jobs per day</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={errorRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="date" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} unit="%" />
              <Tooltip content={<DarkTooltip />} />
              <Line type="monotone" dataKey="rate" name="Error %" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', strokeWidth: 0, r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="bg-white/[0.04] border border-white/8 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Activity Feed</h3>
              <p className="text-xs text-white/30">Recent platform events</p>
            </div>
          </div>
          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
            {activityFeed.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-base shrink-0 mt-0.5">{item.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs text-white/60 leading-relaxed">{item.text}</p>
                  <p className="text-xs text-white/25 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Recent Jobs Table ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
        className="bg-white/[0.04] border border-white/8 rounded-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <div>
            <h3 className="text-sm font-semibold text-white">Recent Jobs</h3>
            <p className="text-xs text-white/30">Latest anonymization runs</p>
          </div>
          <button className="text-xs text-violet-400 hover:text-violet-300 font-medium flex items-center gap-1 transition-colors">
            View all <ExternalLink className="w-3 h-3" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Job #</th>
                <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">File</th>
                <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Status</th>
                <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Duration</th>
                <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Rows</th>
                <th className="text-left px-5 py-3 text-xs text-white/30 font-medium">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs.map((job, i) => (
                <tr key={i} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-3 text-white/40 font-mono text-xs">#{job.id}</td>
                  <td className="px-5 py-3 text-white/70 font-medium text-xs">{job.name}</td>
                  <td className="px-5 py-3"><StatusBadge status={job.status} size="sm" /></td>
                  <td className="px-5 py-3 text-white/40 text-xs font-mono">{job.duration}</td>
                  <td className="px-5 py-3 text-white/40 text-xs">{job.rows > 0 ? job.rows.toLocaleString() : '—'}</td>
                  <td className="px-5 py-3 text-white/30 text-xs">{job.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* ── Quick Actions ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: Database, label: 'New Connection', desc: 'Connect a database', href: '/database-privacy/connections', color: 'from-violet-500/20 to-violet-600/10', border: 'border-violet-500/20' },
          { icon: ScanSearch, label: 'Run Scanner', desc: 'Discover PII in files', href: '/database-privacy/scanner', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/20' },
          { icon: Zap, label: 'Upload & Mask', desc: 'Anonymize a file now', href: '/database-privacy/anonymize', color: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/20' },
          { icon: FileBarChart2, label: 'View Reports', desc: 'Compliance & analytics', href: '/database-privacy/reports', color: 'from-amber-500/20 to-amber-600/10', border: 'border-amber-500/20' },
        ].map((action, i) => (
          <a
            key={i}
            href={action.href}
            className={`bg-gradient-to-br ${action.color} border ${action.border} rounded-2xl p-4 hover:scale-[1.02] transition-all group cursor-pointer`}
          >
            <action.icon className="w-6 h-6 text-white/60 group-hover:text-white mb-3 transition-colors" />
            <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{action.label}</p>
            <p className="text-xs text-white/30 mt-0.5">{action.desc}</p>
          </a>
        ))}
      </motion.div>
    </div>
  );
}
