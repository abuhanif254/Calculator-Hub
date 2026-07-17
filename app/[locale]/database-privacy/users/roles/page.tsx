'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Shield, CheckCircle2, XCircle } from 'lucide-react';
import { PageHeader } from '../../../../components/platform/ui/PlatformUI';

const roles = [
  { name: 'Admin', color: 'from-red-500/20 to-red-600/10', border: 'border-red-500/20', members: 1, desc: 'Full platform access including user management and danger-zone operations.' },
  { name: 'Compliance Officer', color: 'from-violet-500/20 to-violet-600/10', border: 'border-violet-500/20', members: 1, desc: 'Can view all data, generate compliance reports, and manage masking rules.' },
  { name: 'DBA', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/20', members: 1, desc: 'Can manage database connections, run scanners, and execute anonymization jobs.' },
  { name: 'Developer', color: 'from-emerald-500/20 to-emerald-600/10', border: 'border-emerald-500/20', members: 2, desc: 'Can view connections, run exports, and access anonymized datasets.' },
  { name: 'Read-Only', color: 'from-white/5 to-white/[0.02]', border: 'border-white/10', members: 1, desc: 'View-only access to the dashboard, reports, and job history.' },
];

const permissions = ['View Connections', 'Manage Connections', 'Run Scanner', 'Create Masking Rules', 'Execute Jobs', 'View Audit Logs', 'Manage API Keys', 'Manage Users'];
const matrix: Record<string, boolean[]> = {
  'Admin':              [true,  true,  true,  true,  true,  true,  true,  true ],
  'Compliance Officer': [true,  false, true,  true,  false, true,  false, false],
  'DBA':                [true,  true,  true,  true,  true,  true,  false, false],
  'Developer':          [true,  false, false, false, false, false, false, false],
  'Read-Only':          [true,  false, false, false, false, true,  false, false],
};

export default function RolesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Roles & Permissions" subtitle="Configure role-based access control for your team" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {roles.map((role, i) => (
          <motion.div key={role.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className={`bg-gradient-to-br ${role.color} border ${role.border} rounded-2xl p-5`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center"><Shield className="w-4 h-4 text-white" /></div>
              <div><p className="font-bold text-white">{role.name}</p><p className="text-xs text-white/40">{role.members} member{role.members > 1 ? 's' : ''}</p></div>
            </div>
            <p className="text-xs text-white/50 mb-4 leading-relaxed">{role.desc}</p>
            <div className="space-y-1.5">
              {permissions.map((perm, j) => (
                <div key={perm} className="flex items-center justify-between text-xs">
                  <span className="text-white/60">{perm}</span>
                  {matrix[role.name][j] ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-white/20" />}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
