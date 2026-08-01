'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FileText, Download, RefreshCw, Shield, AlertTriangle,
  CheckCircle2, XCircle, AlertCircle, Database, Wand2,
  TrendingUp, BookOpen, ChevronDown, ChevronUp,
  ExternalLink, ShieldCheck,
} from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────
type Framework = 'GDPR' | 'HIPAA' | 'PCI-DSS';
type Days = 7 | 30 | 90;

interface ReportData {
  meta: { framework: Framework; days: Days; generatedAt: string; since: string };
  executiveSummary: {
    complianceScore: number; riskScore: number;
    totalConnections: number; totalScans: number; completedScans: number;
    totalFindings: number; totalOccurrences: number;
    Critical: number; High: number; Medium: number; Low: number;
    coveredColumns: number; uncoveredColumns: number; totalPiiColumns: number;
    activeRules: number;
  };
  piiBreakdown: { type: string; count: number; percentage: number }[];
  findings: {
    table: string; column: string; detector: string; detectorId: string;
    risk: string; occurrences: number; hasRule: boolean; citation: string;
  }[];
  recommendations: { priority: string; action: string; detail: string }[];
  connectionSummary: { name: string; type: string; scanned: boolean; findingsCount: number }[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const RISK_COLORS: Record<string, string> = {
  Critical: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  High:     'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  Medium:   'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800',
  Low:      'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
};
const RISK_DOT: Record<string, string> = {
  Critical: 'bg-red-500', High: 'bg-orange-500', Medium: 'bg-amber-500', Low: 'bg-emerald-500',
};
const FW_COLORS: Record<Framework, string> = {
  GDPR:      'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
  HIPAA:     'text-violet-700 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 border-violet-200 dark:border-violet-800',
  'PCI-DSS': 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
};
const FW_DESC: Record<Framework, string> = {
  GDPR:      'General Data Protection Regulation (EU) 2016/679',
  HIPAA:     'Health Insurance Portability and Accountability Act',
  'PCI-DSS': 'Payment Card Industry Data Security Standard v4.0',
};

const scoreColor = (s: number) =>
  s >= 80 ? 'text-emerald-600 dark:text-emerald-400' :
  s >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400';

const scoreLabel = (s: number) =>
  s >= 80 ? 'Good Standing' : s >= 50 ? 'Needs Attention' : 'High Risk';

function fmtDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });
}

// ── Compliance ring ───────────────────────────────────────────────────────────
function ScoreRing({ score, label, size = 88 }: { score: number; label: string; size?: number }) {
  const r = (size / 2) * 0.75;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const color = score >= 80 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor"
          className="text-slate-100 dark:text-slate-800" strokeWidth={size*0.1} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
          strokeWidth={size*0.1} strokeLinecap="round"
          strokeDasharray={`${dash} ${circ}`} transform={`rotate(-90 ${size/2} ${size/2})`} />
        <text x={size/2} y={size/2+5} textAnchor="middle" fontSize={size*0.2}
          fontWeight="bold" fill={color}>{score}%</text>
      </svg>
      <p className="text-xs text-slate-500 text-center">{label}</p>
    </div>
  );
}

// ── HTML report generator ─────────────────────────────────────────────────────
function generateHtmlReport(d: ReportData): string {
  const s = d.executiveSummary;
  const badgeColor: Record<string, string> = {
    Critical: '#ef4444', High: '#f97316', Medium: '#f59e0b', Low: '#10b981',
  };
  const findingsRows = d.findings.map(f => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;">
        <code style="font-size:12px;color:#6366f1;">${f.table}.${f.column}</code>
      </td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;">${f.detector}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;">
        <span style="background:${badgeColor[f.risk]}22;color:${badgeColor[f.risk]};border:1px solid ${badgeColor[f.risk]}44;
          padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700;">${f.risk}</span>
      </td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;text-align:center;font-size:13px;">${f.occurrences}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;text-align:center;font-size:13px;">
        ${f.hasRule ? '✅ Yes' : '❌ No'}
      </td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:11px;color:#64748b;">${f.citation}</td>
    </tr>`).join('');

  const recsRows = d.recommendations.map(r => `
    <tr>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;">
        <span style="background:${badgeColor[r.priority] ?? '#6366f1'}22;color:${badgeColor[r.priority] ?? '#6366f1'};
          border:1px solid ${badgeColor[r.priority] ?? '#6366f1'}44;
          padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700;">${r.priority}</span>
      </td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:13px;font-weight:600;">${r.action}</td>
      <td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-size:12px;color:#64748b;">${r.detail}</td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${d.meta.framework} Compliance Report — ${new Date(d.meta.generatedAt).toLocaleDateString()}</title>
<style>
  *{margin:0;padding:0;box-sizing:border-box;}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;color:#0f172a;line-height:1.5;}
  .page{max-width:900px;margin:0 auto;padding:40px 24px;}
  .cover{background:linear-gradient(135deg,#4f46e5,#7c3aed);color:white;border-radius:16px;padding:48px;margin-bottom:32px;}
  .cover h1{font-size:28px;font-weight:800;margin-bottom:8px;}
  .cover p{opacity:0.8;font-size:14px;}
  .badge{display:inline-block;padding:4px 12px;border-radius:999px;font-size:13px;font-weight:700;border:2px solid rgba(255,255,255,0.4);background:rgba(255,255,255,0.15);margin-top:16px;}
  .section{background:white;border:1px solid #e2e8f0;border-radius:12px;padding:24px;margin-bottom:24px;box-shadow:0 1px 3px rgba(0,0,0,0.06);}
  .section h2{font-size:16px;font-weight:700;color:#1e293b;margin-bottom:16px;display:flex;align-items:center;gap:8px;}
  .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:8px;}
  .stat{text-align:center;padding:16px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;}
  .stat .val{font-size:28px;font-weight:800;color:#4f46e5;line-height:1;}
  .stat .lbl{font-size:11px;color:#64748b;margin-top:4px;text-transform:uppercase;letter-spacing:0.05em;}
  table{width:100%;border-collapse:collapse;font-size:13px;}
  thead{background:#f8fafc;}
  th{padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;border-bottom:2px solid #e2e8f0;}
  .score-row{display:flex;gap:24px;align-items:center;}
  .score-box{flex:1;text-align:center;padding:20px;border-radius:10px;}
  .score-box .big{font-size:40px;font-weight:900;line-height:1;}
  .score-box .lbl{font-size:12px;margin-top:4px;opacity:0.7;}
  .good{background:#d1fae5;color:#065f46;}
  .warn{background:#fef3c7;color:#78350f;}
  .bad{background:#fee2e2;color:#7f1d1d;}
  @media print{body{background:white;}.page{padding:0;}.cover{border-radius:0;}}
</style>
</head>
<body>
<div class="page">
  <div class="cover">
    <p style="font-size:12px;opacity:0.7;margin-bottom:8px;">NEXUS DATA PRIVACY PLATFORM</p>
    <h1>${d.meta.framework} Compliance Report</h1>
    <p>Generated on ${fmtDate(d.meta.generatedAt)} &nbsp;·&nbsp; Period: last ${d.meta.days} days</p>
    <div class="badge">${FW_DESC[d.meta.framework]}</div>
  </div>

  <div class="section">
    <h2>📊 Executive Summary</h2>
    <div class="score-row" style="margin-bottom:24px;">
      <div class="score-box ${s.complianceScore >= 80 ? 'good' : s.complianceScore >= 50 ? 'warn' : 'bad'}">
        <div class="big">${s.complianceScore}%</div>
        <div class="lbl">Compliance Score</div>
      </div>
      <div class="score-box ${s.riskScore <= 20 ? 'good' : s.riskScore <= 50 ? 'warn' : 'bad'}">
        <div class="big">${s.riskScore}</div>
        <div class="lbl">Risk Score</div>
      </div>
      <div class="score-box" style="background:#ede9fe;color:#4c1d95;">
        <div class="big">${s.totalPiiColumns}</div>
        <div class="lbl">PII Columns</div>
      </div>
      <div class="score-box" style="background:#f0fdf4;color:#14532d;">
        <div class="big">${s.coveredColumns}</div>
        <div class="lbl">Columns Masked</div>
      </div>
    </div>
    <div class="stats">
      <div class="stat"><div class="val">${s.totalConnections}</div><div class="lbl">Databases</div></div>
      <div class="stat"><div class="val">${s.totalScans}</div><div class="lbl">Scans Run</div></div>
      <div class="stat"><div class="val">${s.totalFindings}</div><div class="lbl">Unique Findings</div></div>
      <div class="stat"><div class="val">${s.activeRules}</div><div class="lbl">Active Rules</div></div>
    </div>
  </div>

  <div class="section">
    <h2>⚠️ Risk Breakdown</h2>
    <div class="stats">
      <div class="stat" style="border-color:#fca5a5;background:#fff5f5;"><div class="val" style="color:#dc2626;">${s.Critical}</div><div class="lbl">Critical</div></div>
      <div class="stat" style="border-color:#fdba74;background:#fffaf5;"><div class="val" style="color:#ea580c;">${s.High}</div><div class="lbl">High</div></div>
      <div class="stat" style="border-color:#fcd34d;background:#fffdf0;"><div class="val" style="color:#d97706;">${s.Medium}</div><div class="lbl">Medium</div></div>
      <div class="stat" style="border-color:#6ee7b7;background:#f0fdf4;"><div class="val" style="color:#059669;">${s.Low}</div><div class="lbl">Low</div></div>
    </div>
  </div>

  ${d.recommendations.length > 0 ? `
  <div class="section">
    <h2>🎯 Recommendations</h2>
    <table>
      <thead><tr><th>Priority</th><th>Action Required</th><th>Detail</th></tr></thead>
      <tbody>${recsRows}</tbody>
    </table>
  </div>` : ''}

  ${d.findings.length > 0 ? `
  <div class="section">
    <h2>🔍 PII Findings</h2>
    <table>
      <thead>
        <tr>
          <th>Column</th><th>PII Type</th><th>Risk</th>
          <th style="text-align:center;">Hits</th>
          <th style="text-align:center;">Masked</th>
          <th>${d.meta.framework} Citation</th>
        </tr>
      </thead>
      <tbody>${findingsRows}</tbody>
    </table>
  </div>` : ''}

  <div style="text-align:center;padding:24px;color:#94a3b8;font-size:12px;">
    Generated by Nexus DataPrivacy Platform &nbsp;·&nbsp; ${d.meta.framework} Compliance Report &nbsp;·&nbsp; ${new Date(d.meta.generatedAt).toLocaleDateString()}
  </div>
</div>
</body></html>`;
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ReportsPage() {
  const [framework, setFramework] = useState<Framework>('GDPR');
  const [days, setDays]           = useState<Days>(30);
  const [report, setReport]       = useState<ReportData | null>(null);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState('');
  const [expandedRecs, setExpandedRecs] = useState(true);
  const [expandedFindings, setExpandedFindings] = useState(true);
  const [findingsSearch, setFindingsSearch] = useState('');
  const [findingsFilter, setFindingsFilter] = useState('');
  const reportRef = useRef<HTMLDivElement>(null);

  const generateReport = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/privacy/compliance-report?framework=${framework}&days=${days}`);
      if (!res.ok) throw new Error('Failed to generate report');
      setReport(await res.json());
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [framework, days]);

  const downloadReport = () => {
    if (!report) return;
    const html = generateHtmlReport(report);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = `${report.meta.framework}-compliance-report-${new Date().toISOString().slice(0, 10)}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const s = report?.executiveSummary;

  const filteredFindings = (report?.findings ?? []).filter(f => {
    const q = findingsSearch.toLowerCase();
    const matchQ = !q || f.table.includes(q) || f.column.includes(q) || f.detector.toLowerCase().includes(q);
    const matchF = !findingsFilter || f.risk === findingsFilter ||
      (findingsFilter === 'unmasked' && !f.hasRule) ||
      (findingsFilter === 'masked' && f.hasRule);
    return matchQ && matchF;
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-violet-600" /> Compliance Reports
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">
            Auto-generated GDPR / HIPAA / PCI-DSS reports from your real scan data.
          </p>
        </div>
        {report && (
          <button onClick={downloadReport}
            className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-medium text-sm transition-colors shadow-sm shadow-violet-600/20">
            <Download className="w-4 h-4" /> Download HTML
          </button>
        )}
      </div>

      {/* ── Report Generator Controls ─────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-wider">
          Generate Report
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">

          {/* Framework selector */}
          <div className="flex-1">
            <p className="text-xs text-slate-500 mb-2 font-medium">Compliance Framework</p>
            <div className="flex gap-2 flex-wrap">
              {(['GDPR', 'HIPAA', 'PCI-DSS'] as Framework[]).map(fw => (
                <button key={fw} onClick={() => setFramework(fw)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                    framework === fw
                      ? `${FW_COLORS[fw]} shadow-sm`
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-violet-300 dark:hover:border-violet-700'
                  }`}>
                  {fw}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">{FW_DESC[framework]}</p>
          </div>

          {/* Date range */}
          <div>
            <p className="text-xs text-slate-500 mb-2 font-medium">Time Period</p>
            <div className="flex gap-2">
              {([7, 30, 90] as Days[]).map(d => (
                <button key={d} onClick={() => setDays(d)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                    days === d
                      ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400 border-violet-300 dark:border-violet-700'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-violet-300'
                  }`}>
                  {d}d
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <div className="flex items-end">
            <button onClick={generateReport} disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl font-semibold text-sm transition-colors disabled:opacity-60 shadow-sm shadow-violet-600/20 min-w-[140px] justify-center">
              {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating…</> : <><FileText className="w-4 h-4" /> Generate</>}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl text-sm text-red-700 dark:text-red-400">
          <XCircle className="w-4 h-4 shrink-0" />{error}
        </div>
      )}

      {/* ── Report Content ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {report && (
          <motion.div ref={reportRef} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

            {/* Report meta header */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl p-6 text-white">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-white/70 text-xs mb-1 uppercase tracking-wider">Nexus DataPrivacy Platform</p>
                  <h2 className="text-xl font-bold">{report.meta.framework} Compliance Report</h2>
                  <p className="text-white/70 text-sm mt-1">{FW_DESC[report.meta.framework]}</p>
                  <p className="text-white/60 text-xs mt-2">Generated {fmtDate(report.meta.generatedAt)} · Last {report.meta.days} days</p>
                </div>
                <div className="flex gap-4">
                  <ScoreRing score={s!.complianceScore} label="Compliance" size={80} />
                </div>
              </div>
            </div>

            {/* Executive Summary stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Compliance Score', value: `${s!.complianceScore}%`, sub: scoreLabel(s!.complianceScore), color: scoreColor(s!.complianceScore), icon: <ShieldCheck className="w-5 h-5" />, bg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
                { label: 'PII Columns Found', value: s!.totalPiiColumns, sub: `${s!.uncoveredColumns} unmasked`, color: s!.uncoveredColumns > 0 ? 'text-amber-600' : 'text-emerald-600', icon: <AlertTriangle className="w-5 h-5" />, bg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600' },
                { label: 'Active Rules', value: s!.activeRules, sub: `${s!.coveredColumns} cols covered`, color: 'text-blue-600', icon: <Wand2 className="w-5 h-5" />, bg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
                { label: 'Scans in Period', value: s!.totalScans, sub: `${s!.completedScans} completed`, color: 'text-violet-600', icon: <TrendingUp className="w-5 h-5" />, bg: 'bg-violet-100 dark:bg-violet-900/30 text-violet-600' },
              ].map(stat => (
                <div key={stat.label} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{stat.label}</p>
                      <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    </div>
                    <div className={`p-2 rounded-xl ${stat.bg}`}>{stat.icon}</div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Risk breakdown */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <Shield className="w-4 h-4 text-violet-500" /> Risk Breakdown
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {(['Critical', 'High', 'Medium', 'Low'] as const).map(risk => (
                  <div key={risk} className={`rounded-xl border p-4 text-center ${RISK_COLORS[risk]}`}>
                    <p className="text-2xl font-bold">{s![risk]}</p>
                    <p className="text-xs font-semibold mt-1">{risk}</p>
                  </div>
                ))}
              </div>

              {/* PII type breakdown bar */}
              {report.piiBreakdown.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">PII Type Distribution</p>
                  <div className="space-y-2">
                    {report.piiBreakdown.slice(0, 6).map(p => (
                      <div key={p.type} className="flex items-center gap-3">
                        <p className="text-xs text-slate-600 dark:text-slate-400 w-32 shrink-0 truncate">{p.type}</p>
                        <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div className="h-2 rounded-full bg-violet-500 transition-all" style={{ width: `${p.percentage}%` }} />
                        </div>
                        <p className="text-xs text-slate-500 w-12 text-right shrink-0">{p.percentage}%</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Recommendations */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              <button onClick={() => setExpandedRecs(v => !v)}
                className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <h3 className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 text-violet-500" />
                  Recommendations ({report.recommendations.length})
                </h3>
                {expandedRecs ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              {expandedRecs && (
                <div className="divide-y divide-slate-100 dark:divide-slate-800 border-t border-slate-200 dark:border-slate-800">
                  {report.recommendations.map((rec, i) => (
                    <div key={i} className="p-5 flex items-start gap-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border shrink-0 ${RISK_COLORS[rec.priority] ?? RISK_COLORS.Low}`}>
                        {rec.priority}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{rec.action}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{rec.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Findings table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 flex-wrap">
                <button onClick={() => setExpandedFindings(v => !v)}
                  className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white text-sm uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                  Findings ({report.findings.length})
                  {expandedFindings ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {expandedFindings && (
                  <div className="flex gap-2 flex-wrap">
                    <input value={findingsSearch} onChange={e => setFindingsSearch(e.target.value)}
                      placeholder="Search table/column…"
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-violet-500 w-40" />
                    <select value={findingsFilter} onChange={e => setFindingsFilter(e.target.value)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-xs outline-none focus:ring-2 focus:ring-violet-500">
                      <option value="">All</option>
                      <option value="Critical">Critical</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                      <option value="unmasked">Unmasked only</option>
                      <option value="masked">Masked only</option>
                    </select>
                  </div>
                )}
              </div>

              {expandedFindings && (
                report.findings.length === 0 ? (
                  <div className="py-16 text-center">
                    <CheckCircle2 className="w-10 h-10 mx-auto mb-3 text-emerald-400" />
                    <p className="text-slate-500 text-sm">No PII findings in the selected period.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-500 border-b border-slate-200 dark:border-slate-800">
                        <tr>
                          <th className="px-5 py-3 font-medium">Column</th>
                          <th className="px-5 py-3 font-medium">PII Type</th>
                          <th className="px-5 py-3 font-medium">Risk</th>
                          <th className="px-5 py-3 font-medium text-right">Occurrences</th>
                          <th className="px-5 py-3 font-medium text-center">Rule</th>
                          <th className="px-5 py-3 font-medium">{framework} Citation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {filteredFindings.map((f, i) => (
                          <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                            <td className="px-5 py-3.5 font-mono text-xs">
                              <span className="text-slate-400">{f.table}.</span>
                              <span className="text-violet-600 dark:text-violet-400 font-semibold">{f.column}</span>
                            </td>
                            <td className="px-5 py-3.5 text-slate-700 dark:text-slate-300 text-xs">{f.detector}</td>
                            <td className="px-5 py-3.5">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${RISK_COLORS[f.risk] ?? ''}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${RISK_DOT[f.risk]}`} />
                                {f.risk}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-right font-semibold text-slate-900 dark:text-white text-xs">{f.occurrences}</td>
                            <td className="px-5 py-3.5 text-center">
                              {f.hasRule
                                ? <CheckCircle2 className="w-4 h-4 text-emerald-500 mx-auto" />
                                : <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                              }
                            </td>
                            <td className="px-5 py-3.5 text-[11px] text-slate-400 max-w-[220px]">{f.citation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredFindings.length !== report.findings.length && (
                      <p className="text-center text-xs text-slate-400 py-3">
                        Showing {filteredFindings.length} of {report.findings.length} findings
                      </p>
                    )}
                  </div>
                )
              )}
            </div>

            {/* Connections coverage */}
            {report.connectionSummary.length > 0 && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                  <Database className="w-4 h-4 text-violet-500" /> Database Coverage
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {report.connectionSummary.map((c, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border ${
                      c.scanned
                        ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/10'
                        : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30'
                    }`}>
                      <div className={`w-2 h-2 rounded-full shrink-0 ${c.scanned ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{c.name}</p>
                        <p className="text-xs text-slate-400">{c.type} · {c.scanned ? `${c.findingsCount} findings` : 'Not scanned'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Download footer */}
            <div className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="text-sm text-slate-500">
                <p className="font-medium text-slate-700 dark:text-slate-300">Download this report</p>
                <p className="text-xs">HTML file — open in browser and use Print → Save as PDF</p>
              </div>
              <button onClick={downloadReport}
                className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-medium transition-colors">
                <Download className="w-4 h-4" /> Download HTML
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state if no report generated yet */}
      {!report && !loading && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-2xl bg-violet-50 dark:bg-violet-900/20 flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-violet-500" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No report yet</h3>
          <p className="text-sm text-slate-500 max-w-sm mb-6">
            Select your compliance framework and time period above, then click <strong>Generate</strong> to produce a report from your real scan data.
          </p>
        </div>
      )}
    </div>
  );
}
