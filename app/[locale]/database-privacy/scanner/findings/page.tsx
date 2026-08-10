"use client";
import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Search,
  Filter,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Loader2
} from "lucide-react";
import { useAuth } from '@/app/components/AuthProvider';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { privacyFetch } from '@/app/components/platform/utils/privacyFetch';

export default function FindingsPage() {
  const [findings, setFindings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("");
  const { user } = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  useEffect(() => {
    async function fetchFindings() {
      if (!user) return;
      try {
        setLoading(true);
        const token = await user.getIdToken();
        const headers = { 'Authorization': `Bearer ${token}` };
        
        const scansRes = await privacyFetch('/api/privacy/scans', { headers });
        const scansData = await scansRes.json();
        const latestScan = scansData.scans?.[0];
        
        if (latestScan) {
          const findingsRes = await privacyFetch(`/api/privacy/scans/${latestScan.id}/findings`, { headers });
          const findingsData = await findingsRes.json();
          const loaded = (findingsData.findings || []).map((f: any) => ({
            ...f,
            status: "Open"
          }));
          setFindings(loaded);
        } else {
          setFindings([]);
        }
      } catch (err) {
        console.error("Failed to fetch findings", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFindings();
  }, [user]);

  const handleIgnore = (id: string) => {
    setFindings(prev => prev.map(f => f.id === id ? { ...f, status: "Ignored" } : f));
  };

  const getRiskColor = (risk: string) => {
    if (risk === "Critical" || risk === "High")
      return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    if (risk === "Medium")
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  };

  const getStatusIcon = (status: string) => {
    if (status === "Mitigated")
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    if (status === "Ignored")
      return <XCircle className="h-4 w-4 text-slate-400" />;
    return <ShieldAlert className="h-4 w-4 text-amber-500" />;
  };

  const filteredFindings = findings.filter(f => {
    if (severityFilter && f.risk_level !== severityFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!f.column_name?.toLowerCase().includes(q) && !f.table_name?.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const stats = {
    total: findings.length,
    high: findings.filter(f => f.risk_level === 'High' || f.risk_level === 'Critical').length,
    medium: findings.filter(f => f.risk_level === 'Medium').length,
    mitigated: findings.filter(f => f.status === 'Mitigated').length,
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Scan Findings
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Review and action discovered PII across your connections.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
          <div className="text-slate-500 text-sm">Total Findings</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">
            {stats.total}
          </div>
        </div>
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-l-4 border-red-500">
          <div className="text-slate-500 text-sm">High Risk</div>
          <div className="text-2xl font-bold text-red-500">{stats.high}</div>
        </div>
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-l-4 border-amber-500">
          <div className="text-slate-500 text-sm">Medium Risk</div>
          <div className="text-2xl font-bold text-amber-500">{stats.medium}</div>
        </div>
        <div className="glass-panel p-4 rounded-xl flex items-center justify-between border-l-4 border-emerald-500">
          <div className="text-slate-500 text-sm">Mitigated</div>
          <div className="text-2xl font-bold text-emerald-500">{stats.mitigated}</div>
        </div>
      </div>

      <motion.div
        className="glass-panel rounded-2xl overflow-hidden flex flex-col h-[600px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between bg-white dark:bg-[#0f1523]">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search location..."
                className="pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm w-64"
              />
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setSeverityFilter(severityFilter === "High" ? "" : "High")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${severityFilter === "High" ? "bg-red-500 text-white border-red-500" : "bg-red-100 text-red-700 border-red-200"}`}>
                High
              </button>
              <button 
                onClick={() => setSeverityFilter(severityFilter === "Medium" ? "" : "Medium")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${severityFilter === "Medium" ? "bg-amber-500 text-white border-amber-500" : "bg-amber-100 text-amber-700 border-amber-200"}`}>
                Medium
              </button>
              <button 
                onClick={() => setSeverityFilter(severityFilter === "Low" ? "" : "Low")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${severityFilter === "Low" ? "bg-blue-500 text-white border-blue-500" : "bg-blue-100 text-blue-700 border-blue-200"}`}>
                Low
              </button>
            </div>
          </div>
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700">
            Apply Rules to Selected
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-0">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
            </div>
          ) : findings.length === 0 ? (
            <div className="flex flex-col h-full items-center justify-center text-slate-500">
              <ShieldAlert className="h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">No findings detected.</p>
              <Link href={`/${locale}/database-privacy/scanner`} className="mt-4 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm hover:bg-violet-700 transition-colors">
                Run a Scan
              </Link>
            </div>
          ) : (
            <table className="w-full text-left text-sm relative">
              <thead className="bg-slate-50 dark:bg-slate-900/50 sticky top-0 z-10 shadow-sm">
                <tr>
                  <th className="p-4 w-12">
                    <input type="checkbox" className="rounded border-slate-300" />
                  </th>
                  <th className="p-4 font-medium text-slate-500">
                    Location (Table.Column)
                  </th>
                  <th className="p-4 font-medium text-slate-500">PII Type</th>
                  <th className="p-4 font-medium text-slate-500">Risk Level</th>
                  <th className="p-4 font-medium text-slate-500">Status</th>
                  <th className="p-4 font-medium text-slate-500 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {filteredFindings.map((f) => (
                  <tr
                    key={f.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="rounded border-slate-300"
                      />
                    </td>
                    <td className="p-4 font-mono text-xs text-slate-700 dark:text-slate-300">
                      {f.table_name}.{f.column_name}
                    </td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">
                      {f.detector_name}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${getRiskColor(f.risk_level)}`}
                      >
                        {f.risk_level}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                        {getStatusIcon(f.status)} {f.status}
                      </div>
                    </td>
                    <td className="p-4 text-right space-x-3">
                      <button 
                        onClick={() => router.push(`/${locale}/database-privacy/masking/rules?column=${f.column_name}&table=${f.table_name}&type=${f.detector_id}`)}
                        className="text-violet-600 dark:text-violet-400 hover:underline text-sm">
                        Mask
                      </button>
                      <button 
                        onClick={() => handleIgnore(f.id)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm">
                        Ignore
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
}
