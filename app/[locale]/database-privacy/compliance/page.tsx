'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookCheck, CheckCircle2, XCircle, Globe, HeartPulse, CreditCard, Award, Download } from 'lucide-react';
import { PageHeader } from '../../../components/platform/ui/PlatformUI';
import { useToast } from '../../../components/platform/ui/Toast';

const standards = [
  { id: 'gdpr', name: 'GDPR', icon: Globe, color: 'from-blue-500/20 to-indigo-600/10', border: 'border-blue-500/20', score: 82, region: 'European Union', year: '2018',
    checks: [{ label: 'Lawful basis for processing documented', ok: true }, { label: 'Data minimization enforced via masking', ok: true }, { label: 'Right to erasure configured', ok: true }, { label: 'Data breach notification workflow', ok: false }, { label: 'DPA signed with all processors', ok: false }, { label: 'DPIA completed for high-risk processing', ok: true }] },
  { id: 'hipaa', name: 'HIPAA', icon: HeartPulse, color: 'from-rose-500/20 to-pink-600/10', border: 'border-rose-500/20', score: 91, region: 'United States', year: '1996',
    checks: [{ label: 'PHI de-identified per §164.514', ok: true }, { label: 'Encryption at rest (AES-256)', ok: true }, { label: 'Access controls enforced (RBAC)', ok: true }, { label: 'Audit logs enabled and retained 6yr', ok: true }, { label: 'Business Associate Agreements signed', ok: true }, { label: 'Workforce training documented', ok: false }] },
  { id: 'pci', name: 'PCI-DSS', icon: CreditCard, color: 'from-amber-500/20 to-orange-600/10', border: 'border-amber-500/20', score: 78, region: 'Global', year: '2004',
    checks: [{ label: 'Cardholder data masked (PAN)', ok: true }, { label: 'CVV/CVC never stored', ok: true }, { label: 'Network segmentation in place', ok: false }, { label: 'Penetration test in past 12 months', ok: false }, { label: 'Cryptographic key rotation', ok: true }, { label: 'Quarterly vulnerability scans', ok: true }] },
  { id: 'soc2', name: 'SOC 2', icon: Award, color: 'from-violet-500/20 to-purple-600/10', border: 'border-violet-500/20', score: 65, region: 'United States', year: '2010',
    checks: [{ label: 'Security incident response plan', ok: true }, { label: 'Availability SLA defined (99.9%)', ok: true }, { label: 'Confidentiality policies documented', ok: false }, { label: 'Change management procedures', ok: false }, { label: 'Vendor risk assessments', ok: false }, { label: 'Annual security training', ok: true }] },
];

export default function CompliancePage() {
  const toast = useToast();
  return (
    <div className="space-y-6">
      <PageHeader title="Compliance Center" subtitle="Monitor regulatory readiness across all connected databases" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {standards.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`bg-gradient-to-br ${s.color} border ${s.border} rounded-2xl p-6`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center"><s.icon className="w-5 h-5 text-white" /></div>
                <div><p className="font-bold text-white text-lg">{s.name}</p><p className="text-xs text-white/40">{s.region} · Since {s.year}</p></div>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-white">{s.score}%</p>
                <p className="text-xs text-white/50">Ready</p>
              </div>
            </div>
            <div className="h-2 bg-black/20 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-white/50 rounded-full" style={{ width: `${s.score}%` }} />
            </div>
            <div className="space-y-2 mb-4">
              {s.checks.map((c, j) => (
                <div key={j} className="flex items-center gap-2 text-xs text-white/70">
                  {c.ok ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                  {c.label}
                </div>
              ))}
            </div>
            <button onClick={() => toast.info(`${s.name} Certificate`, 'Generating your compliance certificate...')}
              className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-2.5 rounded-xl transition-all">
              <Download className="w-4 h-4" /> Generate Certificate
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
