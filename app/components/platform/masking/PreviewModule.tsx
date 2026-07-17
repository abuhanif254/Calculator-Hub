'use client';

import React, { useState, useEffect } from 'react';
import { Play, ShieldAlert, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { apiUrl } from '../../../lib/api';

interface PreFlightCheck {
  check: string;
  status: string;
  detail: string;
}

interface PreviewRow {
  id: number;
  original: Record<string, string>;
  masked: Record<string, string>;
  changed: string[];
}

interface PreviewData {
  status: string;
  pre_flight_checks: PreFlightCheck[];
  rows: PreviewRow[];
}

export function PreviewModule() {
  const [data, setData] = useState<PreviewData | null>(null);

  useEffect(() => {
    fetch(apiUrl('/api/masking/preview'))
      .then(r => r.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="text-white/40 p-6">Loading preview data...</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-violet-400" /> Pre-Flight Checks
            </h3>
            <div className="space-y-4">
              {data.pre_flight_checks.map((c, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-white">{c.check}</p>
                    <p className="text-xs text-white/50">{c.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-violet-400" /> Actions
            </h3>
            <button className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-3 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all flex items-center justify-center gap-2">
              <Play className="w-5 h-5" /> Execute Anonymization Job
            </button>
            <p className="text-xs text-center text-white/40 mt-3">
              This will permanently alter data in the target database.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">Data Diff Preview</h3>
          {data.rows.map(row => (
            <div key={row.id} className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row">
              <div className="flex-1 p-4 border-b md:border-b-0 md:border-r border-white/10 bg-red-500/5">
                <div className="text-xs font-semibold text-red-400/80 uppercase mb-3">Original Data</div>
                <div className="space-y-2">
                  {Object.entries(row.original).map(([k, v]) => (
                    <div key={k} className="flex flex-col">
                      <span className="text-[10px] text-white/40 font-mono">{k}</span>
                      <span className={`text-sm font-mono ${row.changed.includes(k) ? 'text-red-300' : 'text-white/80'}`}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="hidden md:flex items-center justify-center w-8 bg-[#080D18]">
                <ChevronRight className="w-5 h-5 text-white/20" />
              </div>
              
              <div className="flex-1 p-4 bg-green-500/5">
                <div className="text-xs font-semibold text-green-400/80 uppercase mb-3">Masked Data</div>
                <div className="space-y-2">
                  {Object.entries(row.masked).map(([k, v]) => (
                    <div key={k} className="flex flex-col">
                      <span className="text-[10px] text-white/40 font-mono">{k}</span>
                      <span className={`text-sm font-mono ${row.changed.includes(k) ? 'text-green-400 font-bold' : 'text-white/80'}`}>
                        {v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
