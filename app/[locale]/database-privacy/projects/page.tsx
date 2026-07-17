'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GitBranch, Plus, Database, Shield, Users, Calendar, ExternalLink } from 'lucide-react';
import { PageHeader } from '../../../components/platform/ui/PlatformUI';
import { useToast } from '../../../components/platform/ui/Toast';

const envColors: Record<string, string> = { Production: 'text-red-400 bg-red-400/10 border-red-400/20', Staging: 'text-amber-400 bg-amber-400/10 border-amber-400/20', Development: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' };
const avatarColors = ['from-violet-500 to-indigo-600', 'from-blue-500 to-cyan-600', 'from-emerald-500 to-teal-600', 'from-rose-500 to-pink-600'];

const projects = [
  { id: 'p1', name: 'E-Commerce Platform', env: 'Production', dbs: 8, rules: 47, members: ['SC', 'JW', 'MG'], last: '2h ago', desc: 'Customer and order data anonymization pipeline for the main storefront.' },
  { id: 'p2', name: 'Analytics Warehouse', env: 'Staging',    dbs: 3, rules: 23, members: ['TN', 'LP'],       last: '1d ago', desc: 'Snowflake and BigQuery anonymization for the data science team.' },
  { id: 'p3', name: 'Dev Sandbox',         env: 'Development',dbs: 2, rules: 12, members: ['TN'],             last: '3h ago', desc: 'Local developer environment — lightweight masking for feature testing.' },
  { id: 'p4', name: 'Healthcare App',      env: 'Production', dbs: 5, rules: 63, members: ['SC', 'JW', 'MG', 'LP'], last: '30m ago', desc: 'HIPAA-compliant PHI anonymization for the patient records system.' },
];

export default function ProjectsPage() {
  const toast = useToast();
  return (
    <div className="space-y-6">
      <PageHeader title="Projects" subtitle="Organize databases, masking rules, and jobs into logical environments">
        <button onClick={() => toast.info('Coming Soon', 'Project creation wizard will be available in the next release.')}
          className="bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-colors group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-indigo-600/10 border border-violet-500/20 flex items-center justify-center"><GitBranch className="w-5 h-5 text-violet-400" /></div>
                <div><p className="font-bold text-white">{p.name}</p><p className="text-xs text-white/40">Updated {p.last}</p></div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${envColors[p.env]}`}>{p.env}</span>
            </div>
            <p className="text-xs text-white/50 mb-4 leading-relaxed">{p.desc}</p>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {[{ icon: Database, label: 'Databases', val: p.dbs }, { icon: Shield, label: 'Rules', val: p.rules }, { icon: Calendar, label: 'Jobs Run', val: Math.floor(p.rules * 2.3) }].map(s => (
                <div key={s.label} className="bg-white/[0.02] border border-white/5 rounded-xl p-2.5 text-center">
                  <p className="text-base font-bold text-white">{s.val}</p>
                  <p className="text-xs text-white/40">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {p.members.slice(0, 4).map((m, j) => (
                  <div key={j} className={`w-7 h-7 rounded-full bg-gradient-to-br ${avatarColors[j % 4]} border-2 border-[#0A0F1A] flex items-center justify-center text-white text-[10px] font-bold`}>{m}</div>
                ))}
                {p.members.length > 4 && <div className="w-7 h-7 rounded-full bg-white/10 border-2 border-[#0A0F1A] flex items-center justify-center text-white text-[10px]">+{p.members.length - 4}</div>}
              </div>
              <button className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors">Open <ExternalLink className="w-3 h-3" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
