'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useAuth } from '@/app/components/AuthProvider';
import { motion } from 'motion/react';
import {
  LineChart, BarChart, Bar, Cell, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import {
  Shield, AlertTriangle, CheckCircle2, Activity, Database, Lock,
  ScanSearch, Plus, ShieldCheck, Loader2, RefreshCw, TrendingUp,
  TrendingDown, Minus, TableProperties, ArrowRight, Wand2,
  BarChart3, XCircle,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────
interface DashboardStats {
  totalConnections: number;
  connectedConns: number;
  totalFindings: number;
  criticalFindings: number;
  activeRules: number;
  totalRules: number;
  totalScans: number;
  completedScans: number;
  complianceScore: number;
  coveredColumns: number;
  totalPiiColumns: number;
}

interface RecentScan {
  id: string;
  connection_name: string;
  status: 'running' | 'completed' | 'failed';
  tables_scanned: number;
  rows_scanned: number;
  findings_count: number;
  started_at: string;
}

interface RiskyColumn {
  table_name: string;
  column_name: string;
  detector_name: string;
  risk_level: string;
  occurrences: number;
}

interface ChartPoint { name: string; scans: number; findings: number; }
interface RiskPoint  { name: string; value: number; color: string; }

interface DashboardData {
  stats: DashboardStats;
  riskDistribution: RiskPoint[];
  scanActivity: ChartPoint[];
  recentScans: RecentScan[];
  topRiskyColumns: RiskyColumn[];
}

// ── Animated counter hook ─────────────────────────────────────────────────────
function useAnimatedCounter(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    startRef.current = null;
    const animate = (ts: number) => {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setValue(Math.round(eased * target));
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return value;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const RISK_COLORS: Record<string, string> = {
  Critical: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  High:     'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  Medium:   'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  Low:      'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
};

const timeAgo = (iso: string) => {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60)   return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({
  label, value, sub, icon, iconBg, trend, loading,
}: {
  label: string; value: number; sub?: string;
  icon: React.ReactNode; iconBg: string; trend?: 'up' | 'down' | 'neutral'; loading: boolean;
}) {
  const animated = useAnimatedCounter(loading ? 0 : value);
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          {loading
            ? <div className="h-9 w-20 mt-2 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />
            : <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
                {animated.toLocaleString()}
              </h3>
          }
        </div>
        <div className={`p-3 rounded-xl ${iconBg}`}>{icon}</div>
      </div>
      {sub && (
        <p className={`text-sm mt-4 font-medium flex items-center gap-1 ${
          trend === 'up'      ? 'text-emerald-600 dark:text-emerald-400' :
          trend === 'down'    ? 'text-red-600 dark:text-red-400' :
                                'text-slate-500 dark:text-slate-400'
        }`}>
          {trend === 'up'   && <TrendingUp  className="w-3.5 h-3.5" />}
          {trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
          {trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
          {sub}
        </p>
      )}
    </motion.div>
  );
}

// ── Compliance Ring ───────────────────────────────────────────────────────────
function ComplianceRing({ score, loading }: { score: number; loading: boolean }) {
  const animated = useAnimatedCounter(loading ? 0 : score);
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const dash = (animated / 100) * circumference;
  const color = animated >= 80 ? '#10b981' : animated >= 50 ? '#f59e0b' : '#ef4444';

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Compliance Score</p>
          <p className="text-xs text-slate-400 mt-0.5">PII columns covered by rules</p>
        </div>
        <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <svg width="100" height="100" viewBox="0 0 100 100" className="shrink-0">
          <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor"
            className="text-slate-100 dark:text-slate-800" strokeWidth="10" />
          <circle cx="50" cy="50" r={radius} fill="none" stroke={color}
            strokeWidth="10" strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            transform="rotate(-90 50 50)"
            style={{ transition: 'stroke-dasharray 0.6s ease-out' }} />
          <text x="50" y="54" textAnchor="middle" fontSize="18" fontWeight="bold"
            fill={color}>{loading ? '--' : `${animated}%`}</text>
        </svg>
        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
          <p><span className="font-semibold text-slate-900 dark:text-white">{score}%</span> covered</p>
          <p className={`text-xs font-medium ${animated >= 80 ? 'text-emerald-600' : animated >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
            {animated >= 80 ? '✓ Good standing' : animated >= 50 ? '⚠ Needs attention' : '✗ High risk'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export default function PrivacyDashboard() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  const [data, setData]       = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const { appUser, user } = useAuth(); // Assuming this is imported

  const fetchData = async (silent = false) => {
    if (!appUser || !user) return;
    if (!silent) setLoading(true);
    else setRefreshing(true);
    setError('');
    try {
      const token = await user.getIdToken();
      const res = await fetch('/api/privacy/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error('Failed to load dashboard');
      const json = await res.json();
      if (json.error) throw new Error(json.error);
      setData(json);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { 
    if (appUser && user) fetchData(); 
  }, [appUser, user]);

  const s = data?.stats;

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <BarChart3 className="w-7 h-7 text-violet-600" /> Privacy Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Real-time view of your PII exposure, scan history, and compliance coverage.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => fetchData(true)} disabled={refreshing}
            className="flex items-center gap-2 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link href={`/${locale}/database-privacy/scanner`}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium text-sm transition-colors shadow-sm shadow-violet-600/20">
            <ScanSearch className="w-4 h-4" /> New Scan
          </Link>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl text-sm text-red-700 dark:text-red-400">
          <XCircle className="w-4 h-4 shrink-0" />{error}
        </div>
      )}

      {/* ── Stat Cards ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Connected Databases"
          value={s?.connectedConns ?? 0}
          sub={s ? `${s.totalConnections} total` : undefined}
          trend="neutral"
          icon={<Database className="w-5 h-5" />}
          iconBg="bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400"
          loading={loading}
        />
        <StatCard
          label="PII Findings"
          value={s?.totalFindings ?? 0}
          sub={s ? `${s.criticalFindings} critical` : undefined}
          trend={s?.criticalFindings ?? 0 > 0 ? 'down' : 'neutral'}
          icon={<AlertTriangle className="w-5 h-5" />}
          iconBg="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
          loading={loading}
        />
        <StatCard
          label="Active Masking Rules"
          value={s?.activeRules ?? 0}
          sub={s ? `${s.totalRules} total` : undefined}
          trend={s?.activeRules ?? 0 > 0 ? 'up' : 'neutral'}
          icon={<Lock className="w-5 h-5" />}
          iconBg="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
          loading={loading}
        />
        <ComplianceRing score={s?.complianceScore ?? 0} loading={loading} />
      </div>

      {/* ── Charts Row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Scan Activity — 7 days */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-violet-500" /> Scan Activity — Last 7 Days
          </h3>
          {loading ? (
            <div className="h-64 bg-slate-50 dark:bg-slate-800/50 rounded-xl animate-pulse" />
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data?.scanActivity ?? []} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: 12 }}
                    labelStyle={{ fontWeight: 600 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Line type="monotone" dataKey="scans" name="Scans" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="findings" name="Findings" stroke="#f97316" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Risk Distribution */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Shield className="w-4 h-4 text-violet-500" /> PII Risk Distribution
          </h3>
          {loading ? (
            <div className="h-64 bg-slate-50 dark:bg-slate-800/50 rounded-xl animate-pulse" />
          ) : (data?.riskDistribution ?? []).every(r => r.value === 0) ? (
            <div className="h-64 flex flex-col items-center justify-center text-slate-400">
              <Shield className="w-10 h-10 mb-3 opacity-20" />
              <p className="text-sm">No findings yet — run a database scan first.</p>
              <Link href={`/${locale}/database-privacy/scanner`}
                className="mt-3 text-xs text-violet-600 hover:underline flex items-center gap-1">
                Go to Scanner <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.riskDistribution ?? []} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: 12 }}
                    formatter={(v) => [v, 'Occurrences']}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60}>
                    {(data?.riskDistribution ?? []).map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* ── Bottom Row: Recent Scans + Top Risky Columns ─────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Scans — 2/3 width */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <ScanSearch className="w-4 h-4 text-violet-500" /> Recent Scans
            </h3>
            <Link href={`/${locale}/database-privacy/scanner`}
              className="text-xs text-violet-600 hover:text-violet-700 dark:text-violet-400 flex items-center gap-1 font-medium">
              New scan <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {[1,2,3].map(i => <div key={i} className="px-5 py-4 h-14 animate-pulse bg-slate-50 dark:bg-slate-800/30" />)}
            </div>
          ) : (data?.recentScans ?? []).length === 0 ? (
            <div className="py-12 text-center">
              <ScanSearch className="w-8 h-8 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
              <p className="text-sm text-slate-500">No scans yet.</p>
              <Link href={`/${locale}/database-privacy/scanner`}
                className="mt-2 inline-block text-xs text-violet-600 hover:underline">Run your first scan →</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-5 py-3 font-medium">Connection</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium text-right">Findings</th>
                    <th className="px-5 py-3 font-medium text-right">Rows</th>
                    <th className="px-5 py-3 font-medium text-right">When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {(data?.recentScans ?? []).map(scan => (
                    <tr key={scan.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-900 dark:text-white text-sm">
                        {scan.connection_name ?? '—'}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                          scan.status === 'completed'
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                            : scan.status === 'running'
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800'
                        }`}>
                          {scan.status === 'running' && <Loader2 className="w-3 h-3 animate-spin" />}
                          {scan.status === 'completed' && <CheckCircle2 className="w-3 h-3" />}
                          {scan.status === 'failed' && <XCircle className="w-3 h-3" />}
                          {scan.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {scan.findings_count > 0
                          ? <span className="font-semibold text-amber-600 dark:text-amber-400">{scan.findings_count}</span>
                          : <span className="text-emerald-600 dark:text-emerald-400 font-medium">0</span>
                        }
                      </td>
                      <td className="px-5 py-3.5 text-right text-slate-500 text-xs">
                        {scan.rows_scanned?.toLocaleString() ?? '—'}
                      </td>
                      <td className="px-5 py-3.5 text-right text-slate-400 text-xs whitespace-nowrap">
                        {timeAgo(scan.started_at)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Top Risky Columns — 1/3 width */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" /> Top Risky Columns
            </h3>
            <Link href={`/${locale}/database-privacy/masking/rules`}
              className="text-xs text-violet-600 hover:text-violet-700 dark:text-violet-400 flex items-center gap-1 font-medium">
              Add rules <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {loading ? (
            <div className="p-5 space-y-3">
              {[1,2,3,4,5].map(i => <div key={i} className="h-10 rounded-lg bg-slate-100 dark:bg-slate-800 animate-pulse" />)}
            </div>
          ) : (data?.topRiskyColumns ?? []).length === 0 ? (
            <div className="py-12 text-center px-4">
              <ShieldCheck className="w-8 h-8 mx-auto mb-3 text-emerald-400" />
              <p className="text-sm text-slate-500">No PII columns detected yet.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {(data?.topRiskyColumns ?? []).map((col, i) => (
                <div key={i} className="px-5 py-3.5 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <span className={`mt-0.5 px-2 py-0.5 rounded-full text-[10px] font-bold border whitespace-nowrap shrink-0 ${RISK_COLORS[col.risk_level] ?? ''}`}>
                    {col.risk_level}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-mono text-slate-900 dark:text-white truncate">
                      <span className="text-slate-400">{col.table_name}.</span>
                      <span className="font-semibold text-violet-600 dark:text-violet-400">{col.column_name}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{col.detector_name} · {col.occurrences} hits</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Quick Actions ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { href: `/${locale}/database-privacy/connections`, icon: <Plus className="w-5 h-5" />, label: 'Add Connection', bg: 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 hover:bg-violet-100 dark:hover:bg-violet-900/30' },
          { href: `/${locale}/database-privacy/scanner`,     icon: <ScanSearch className="w-5 h-5" />, label: 'Scan Database',    bg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30' },
          { href: `/${locale}/database-privacy/masking/rules`, icon: <Wand2 className="w-5 h-5" />, label: 'Masking Rules',    bg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30' },
          { href: `/${locale}/database-privacy/compliance`,  icon: <ShieldCheck className="w-5 h-5" />, label: 'Compliance',       bg: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/30' },
        ].map(a => (
          <Link key={a.label} href={a.href}
            className={`${a.bg} flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border border-transparent transition-all font-medium text-sm text-center`}>
            {a.icon}
            {a.label}
          </Link>
        ))}
      </div>
    </div>
  );
}