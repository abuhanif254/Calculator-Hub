'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileBarChart2, Download, Shield, AlertTriangle, CheckCircle2, TrendingUp, Database } from 'lucide-react';
import { PageHeader, MetricCard } from '../../../components/platform/ui/PlatformUI';
import { useToast } from '../../../components/platform/ui/Toast';

const complianceStandards = [
  { name: 'GDPR', score: 82, color: '#8b5cf6', status: 'At Risk', items: ['Data minimization enforced', 'Right to erasure configured', 'Breach notification ready', 'DPA signed with processors'] },
  { name: 'HIPAA', score: 91, color: '#10b981', status: 'Compliant', items: ['PHI encrypted at rest', 'Access controls enforced', 'Audit logs enabled', 'Business Associate Agreements'] },
  { name: 'PCI-DSS', score: 78, color: '#f59e0b', status: 'At Risk', items: ['Cardholder data masked', 'Network segmentation', 'Penetration testing logged', 'Key rotation configured'] },
];

const heatmapData = [
  { db: 'production-postgres', total: 284, pii: 47, risk: 'High',   masked: 61, scan: '2h ago' },
  { db: 'analytics-warehouse', total: 512, pii: 23, risk: 'Medium', masked: 83, scan: '6h ago' },
  { db: 'qa-mysql-cluster',    total: 198, pii: 11, risk: 'Low',    masked: 100, scan: '1d ago' },
  { db: 'staging-mongodb',     total: 89,  pii: 31, risk: 'High',   masked: 45, scan: '3h ago' },
  { db: 'dev-sqlite-local',    total: 44,  pii: 5,  risk: 'Low',    masked: 100, scan: '2d ago' },
];

const riskColor: Record<string, string> = { High: 'text-red-400 bg-red-400/10 border-red-400/20', Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20', Low: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' };

export default function ReportsPage() {
  const toast = useToast();
  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics" subtitle="Privacy coverage metrics and compliance insights across all databases">
        <button onClick={() => toast.success('Report Generated', 'Your compliance report is ready to download.')}
          className="bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <Download className="w-4 h-4" /> Download Report
        </button>
      </PageHeader>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard title="Compliance Score" value="87%" subtitle="Across all standards" trend={3} icon={Shield} delay={0} />
        <MetricCard title="PII Coverage" value="72%" subtitle="Columns masked" trend={8} icon={Database} iconColor="text-blue-400" iconBg="bg-blue-500/10" delay={0.05} />
        <MetricCard title="Risk Columns" value="101" subtitle="Require attention" trend={-12} icon={AlertTriangle} iconColor="text-amber-400" iconBg="bg-amber-500/10" delay={0.1} />
        <MetricCard title="Reports Run" value="48" subtitle="This month" trend={5} icon={FileBarChart2} iconColor="text-indigo-400" iconBg="bg-indigo-500/10" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {complianceStandards.map((s, i) => (
          <motion.div key={s.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
            className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-white">{s.name}</h3>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${s.status === 'Compliant' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : 'text-amber-400 bg-amber-400/10 border-amber-400/20'}`}>{s.status}</span>
            </div>
            <div className="flex items-end gap-3 mb-4">
              <span className="text-4xl font-black text-white">{s.score}%</span>
              <span className="text-sm text-white/40 mb-1">Ready</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
              <div className="h-full rounded-full transition-all" style={{ width: `${s.score}%`, background: s.color }} />
            </div>
            <div className="space-y-2 mb-4">
              {s.items.map((item, j) => (
                <div key={j} className="flex items-center gap-2 text-xs text-white/60">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />{item}
                </div>
              ))}
            </div>
            <button onClick={() => toast.info('Certificate Generated', `Your ${s.name} compliance certificate is ready.`)}
              className="w-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-sm py-2 rounded-xl border border-white/5 transition-all">
              Generate Certificate
            </button>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-white">PII Risk Heatmap</h3>
            <p className="text-xs text-white/40 mt-0.5">Sensitive column coverage across databases</p>
          </div>
          <TrendingUp className="w-4 h-4 text-violet-400" />
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#080D18]">
            <tr>{['Database', 'Total Columns', 'PII Columns', 'Risk Level', 'Masked %', 'Last Scan'].map(h => <th key={h} className="text-left px-6 py-3 text-xs text-white/40 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {heatmapData.map(row => (
              <tr key={row.db} className="hover:bg-white/[0.02]">
                <td className="px-6 py-4 text-white font-mono text-xs font-medium">{row.db}</td>
                <td className="px-6 py-4 text-white/60">{row.total}</td>
                <td className="px-6 py-4 text-white/60">{row.pii}</td>
                <td className="px-6 py-4"><span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${riskColor[row.risk]}`}>{row.risk}</span></td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${row.masked}%`, background: row.masked === 100 ? '#10b981' : row.masked > 70 ? '#8b5cf6' : '#f59e0b' }} />
                    </div>
                    <span className="text-xs text-white/60 w-8 shrink-0">{row.masked}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-white/40 text-xs">{row.scan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
