"use client";
export const runtime = 'edge';

import React, { useState } from "react";

export default function PreviewPage() {
  const [input, setInput] = useState(
    'INSERT INTO users (id, name, email, ssn, created_at) VALUES (1, "John Doe", "john@example.com", "123-45-6789", "2023-01-01");',
  );
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [algorithm, setAlgorithm] = useState("redact");

  const handleApply = () => {
    setLoading(true);
    setTimeout(() => {
      const lines = input.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      const newResults = lines.map((value, idx) => {
        let masked = value;
        if (algorithm === 'redact') masked = '[REDACTED]';
        else if (algorithm === 'hash') masked = '\u2022'.repeat(8);
        else if (algorithm === 'mask') {
          if (value.length <= 2) masked = value;
          else masked = value[0] + '*'.repeat(value.length - 2) + value[value.length - 1];
        } else if (algorithm === 'partial') {
          if (value.length <= 5) masked = value;
          else masked = value.substring(0,3) + '***' + value.substring(value.length - 2);
        } else if (algorithm === 'random') {
          masked = Array.from({length: value.length}, () => Math.random().toString(36)[2] || 'a').join('');
        } else if (algorithm === 'preserve_format') {
          if (value.includes('@')) {
            const [user, domain] = value.split('@');
            masked = '***@' + (domain || 'domain.com');
          } else if (/^\d{3}-\d{2}-\d{4}$/.test(value)) {
            masked = '***-**-' + value.slice(-4);
          } else if (/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(value)) {
            masked = '(***) ***-' + value.slice(-4);
          } else {
            masked = '[REDACTED]';
          }
        }

        return {
          field: `value_${idx + 1}`,
          original: value,
          masked: masked,
          risk: 'Medium',
          algorithm: algorithm
        };
      });
      setResults(newResults);
      setLoading(false);
    }, 500);
  };

  const handleExportCSV = () => {
    if (!results) return;
    const csv = ['Original,Masked,Algorithm'];
    results.forEach((r: any) => {
      csv.push(`"${r.original.replace(/"/g, '""')}","${r.masked.replace(/"/g, '""')}","${r.algorithm}"`);
    });
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'masking_preview.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const entropy = results ? ((new Set(results.map((r: any) => r.masked)).size / results.length) * 100).toFixed(0) + '%' : '0%';
  const formatPreserved = results ? (results.some((r: any) => ['preserve_format', 'random', 'mask', 'partial'].includes(r.algorithm)) ? 'Yes' : 'No') : 'No';
  const uniqueness = results ? Math.round((new Set(results.map((r: any) => r.masked)).size / results.length) * 100) + '%' : '0%';

  const getRiskColor = (risk: string) => {
    if (risk === "Critical") return "text-red-500 bg-red-500/10";
    if (risk === "High") return "text-orange-500 bg-orange-500/10";
    if (risk === "Medium") return "text-yellow-500 bg-yellow-500/10";
    return "text-emerald-500 bg-emerald-500/10";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Preview & Test
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Test your masking rules against raw data or SQL statements.
          </p>
        </div>
        {results && (
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg font-medium transition-colors">
            Export CSV
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">
              Input Data
            </h3>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-48 px-4 py-3 bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-xl font-mono text-sm text-slate-800 dark:text-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Paste JSON, CSV, or SQL here..."
            />

            <div className="mt-4 flex gap-4">
              <select 
                value={algorithm}
                onChange={e => setAlgorithm(e.target.value)}
                className="px-4 py-2 bg-slate-50 dark:bg-[#0B1120] border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="redact">Redact</option>
                <option value="hash">Hash</option>
                <option value="mask">Mask</option>
                <option value="partial">Partial</option>
                <option value="random">Random</option>
                <option value="preserve_format">Preserve Format</option>
              </select>
              <button
                onClick={handleApply}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : "Apply Masking Preview"}
              </button>
            </div>
          </div>

          {results && (
            <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">
                Data Quality Statistics
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div className="text-xl font-bold text-violet-600">{entropy}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Entropy Retained
                  </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div className="text-xl font-bold text-emerald-500">{formatPreserved}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    Format Preserved
                  </div>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg">
                  <div className="text-xl font-bold text-amber-500">{uniqueness}</div>
                  <div className="text-xs text-slate-500 mt-1">Uniqueness</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 flex flex-col">
          <h3 className="font-bold text-slate-900 dark:text-white mb-4">
            Preview Results
          </h3>

          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-violet-500/30 border-t-violet-600 rounded-full animate-spin" />
            </div>
          ) : results ? (
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex-1">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">
                      Field
                    </th>
                    <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">
                      Original
                    </th>
                    <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">
                      Masked
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {results.map((r: any, i: number) => (
                    <tr key={i} className="bg-white dark:bg-[#0B1120]">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-slate-700 dark:text-slate-300">
                            {r.field}
                          </span>
                          <span
                            className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${getRiskColor(r.risk)}`}
                          >
                            {r.risk}
                          </span>
                        </div>
                      </td>
                      <td className="p-3 text-slate-500 line-through decoration-red-500/50">
                        {r.original}
                      </td>
                      <td className="p-3 font-mono text-slate-900 dark:text-white">
                        {r.masked}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
              <svg
                className="w-12 h-12 mb-2 opacity-50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>Run preview to see results here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
