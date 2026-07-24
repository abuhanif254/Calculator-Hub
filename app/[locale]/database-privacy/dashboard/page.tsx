'use client'

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { LineChart, BarChart, Bar, Cell, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, AlertTriangle, CheckCircle, Activity, Database, Lock, ChevronRight, Home } from 'lucide-react';

const SCAN_DATA = [
  { name: 'Mon', scans: 12, issues: 2 },
  { name: 'Tue', scans: 19, issues: 5 },
  { name: 'Wed', scans: 8, issues: 1 },
  { name: 'Thu', scans: 25, issues: 8 },
  { name: 'Fri', scans: 31, issues: 12 },
  { name: 'Sat', scans: 14, issues: 3 },
  { name: 'Sun', scans: 22, issues: 6 },
];
const RISK_DATA = [
  { name: 'Critical', value: 12, color: '#ef4444' },
  { name: 'High', value: 34, color: '#f97316' },
  { name: 'Medium', value: 89, color: '#f59e0b' },
  { name: 'Low', value: 112, color: '#10b981' },
];
const RECENT_JOBS = [
  { id: '#1042', target: 'prod-postgres/users', status: 'completed', findings: 23, time: '2m ago' },
  { id: '#1041', target: 'analytics-mysql/events', status: 'completed', findings: 0, time: '15m ago' },
  { id: '#1040', target: 'user-mongodb/profiles', status: 'failed', findings: 0, time: '1h ago' },
  { id: '#1039', target: 'prod-postgres/payments', status: 'completed', findings: 5, time: '2h ago' },
];

export default function PrivacyDashboard() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 font-sans text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto space-y-6">
        <nav className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
          <Link href={`/${locale}`} className="hover:text-violet-600 dark:hover:text-violet-400 flex items-center">
            <Home className="w-4 h-4 mr-1" /> Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>DataPrivacy</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-slate-900 dark:text-slate-100 font-medium">Dashboard</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Privacy Dashboard</h1>
          <Link
            href={`/${locale}/database-privacy/scanner`}
            className="inline-flex items-center justify-center px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium transition-colors shadow-sm"
          >
            <Shield className="w-4 h-4 mr-2" />
            New Scan
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm glass-panel flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Databases</p>
                 <h3 className="text-3xl font-bold mt-2">4</h3>
               </div>
               <div className="p-3 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl">
                 <Database className="w-5 h-5" />
               </div>
             </div>
             <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-4 font-medium flex items-center">
               +1 this week
             </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm glass-panel flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400">PII Fields Found</p>
                 <h3 className="text-3xl font-bold mt-2">1,247</h3>
               </div>
               <div className="p-3 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl">
                 <AlertTriangle className="w-5 h-5" />
               </div>
             </div>
             <p className="text-sm text-amber-600 dark:text-amber-500 mt-4 font-medium flex items-center">
               +23 today
             </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm glass-panel flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Rules</p>
                 <h3 className="text-3xl font-bold mt-2">18</h3>
               </div>
               <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                 <Lock className="w-5 h-5" />
               </div>
             </div>
             <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 font-medium flex items-center">
               2 disabled
             </p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm glass-panel flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-start">
               <div>
                 <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Compliance Score</p>
                 <h3 className="text-3xl font-bold mt-2 text-emerald-600 dark:text-emerald-500">94%</h3>
               </div>
               <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                 <CheckCircle className="w-5 h-5" />
               </div>
             </div>
             <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 font-medium flex items-center">
               GDPR/HIPAA
             </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm glass-panel">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-violet-500" />
              Scan Activity (7 Days)
            </h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={SCAN_DATA} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="scans" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="issues" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm glass-panel">
            <h3 className="text-lg font-semibold mb-6">Risk Distribution</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={RISK_DATA} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {RISK_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm glass-panel overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold">Recent Scan Jobs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Job ID</th>
                  <th className="px-6 py-4 font-medium">Target</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Findings</th>
                  <th className="px-6 py-4 font-medium">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {RECENT_JOBS.map((job) => (
                  <tr key={job.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-medium">{job.id}</td>
                    <td className="px-6 py-4">{job.target}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        job.status === 'completed' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {job.findings > 0 ? (
                        <span className="text-amber-600 dark:text-amber-500 font-medium">{job.findings}</span>
                      ) : (
                        <span className="text-slate-500">0</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{job.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}