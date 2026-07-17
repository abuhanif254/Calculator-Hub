'use client';

import React from 'react';
import { motion } from 'motion/react';
import { GitBranch, Database, Shield, Play, MoreHorizontal, Users } from 'lucide-react';
import { PageHeader } from '../../../components/platform/ui/PlatformUI';

const orgs = [
  { name: 'Acme Corp', members: 12, databases: 8, slug: 'acme-corp', plan: 'Enterprise' },
  { name: 'Startup Inc', members: 4, databases: 3, slug: 'startup-inc', plan: 'Free' },
];

export default function OrganizationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Organizations" subtitle="Manage your organizations and their database privacy configurations">
        <button className="bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm px-4 py-2 rounded-xl flex items-center gap-2 transition-colors">
          <GitBranch className="w-4 h-4" /> New Organization
        </button>
      </PageHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {orgs.map((org, i) => (
          <motion.div key={org.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-6 hover:border-violet-500/30 transition-colors group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold">{org.name[0]}</div>
                <div>
                  <p className="text-white font-semibold">{org.name}</p>
                  <p className="text-xs text-white/40">/{org.slug}</p>
                </div>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${org.plan === 'Enterprise' ? 'text-violet-400 bg-violet-400/10 border-violet-400/20' : 'text-white/40 bg-white/5 border-white/10'}`}>{org.plan}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[{ icon: Users, label: 'Members', val: org.members }, { icon: Database, label: 'Databases', val: org.databases }, { icon: Shield, label: 'Rules', val: 14 }].map(s => (
                <div key={s.label} className="bg-white/[0.02] border border-white/5 rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-white">{s.val}</p>
                  <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <button className="w-full bg-white/5 hover:bg-violet-600 text-white/60 hover:text-white text-sm font-medium py-2.5 rounded-xl border border-white/5 hover:border-transparent transition-all">Open Organization</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
