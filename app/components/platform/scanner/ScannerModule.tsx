'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Database, ShieldAlert, Play, CheckCircle2, ChevronRight, Server, Search, Loader2 } from 'lucide-react';
import { StatusBadge } from '../ui/PlatformUI';
import { apiUrl } from '../../../lib/api';

interface Connection {
  id: string;
  name: string;
  db_type: string;
}

interface Finding {
  table: string;
  column: string;
  pii_type: string;
  risk: string;
  confidence: number;
  sample: string;
}

interface ScanResult {
  status: string;
  scanned_tables: number;
  scanned_rows: number;
  findings: Finding[];
}

export function ScannerModule() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedConn, setSelectedConn] = useState<string>('');
  
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const [result, setResult] = useState<ScanResult | null>(null);

  useEffect(() => {
    fetch(apiUrl('/api/connections'))
      .then(res => res.json())
      .then(data => {
        setConnections(data);
        if (data.length > 0) setSelectedConn(data[0].id);
      })
      .catch(e => console.error(e));
  }, []);

  const handleScan = () => {
    if (!selectedConn) return;
    setScanning(true);
    setProgress(0);
    setResult(null);
    
    // Simulate scan progress
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 95) {
          clearInterval(interval);
          return p;
        }
        return p + Math.random() * 15;
      });
    }, 500);

    // Call mock scan API
    setTimeout(() => {
      fetch(apiUrl('/api/scanner/run'), { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          clearInterval(interval);
          setProgress(100);
          setTimeout(() => {
            setScanning(false);
            setResult(data);
          }, 500);
        });
    }, 3000);
  };

  const getRiskColor = (risk: string) => {
    switch(risk) {
      case 'critical': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'high': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'medium': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Configuration Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-6 relative overflow-hidden">
          {/* subtle grid background */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
          
          <h3 className="text-lg font-bold text-white mb-1">Scan Configuration</h3>
          <p className="text-sm text-white/40 mb-6">Select a database and classifiers to scan.</p>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-white/60 mb-2 block uppercase tracking-wider">Target Database</label>
              <select 
                value={selectedConn} 
                onChange={(e) => setSelectedConn(e.target.value)}
                className="w-full bg-[#0E1628] border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50 appearance-none"
              >
                {connections.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/60 mb-2 block uppercase tracking-wider mt-6">Classifiers</label>
              <div className="space-y-2">
                {['Emails', 'Credit Cards', 'SSNs', 'Phone Numbers', 'IP Addresses', 'Names'].map((c, i) => (
                  <label key={c} className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] cursor-pointer hover:bg-white/[0.04] transition-colors">
                    <input type="checkbox" defaultChecked={i < 4} className="accent-violet-500 w-4 h-4 rounded" />
                    <span className="text-sm text-white/80">{c}</span>
                  </label>
                ))}
              </div>
            </div>

            <button 
              onClick={handleScan}
              disabled={scanning || connections.length === 0}
              className="w-full mt-6 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium py-3 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
            >
              {scanning ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {scanning ? 'Scanning Database...' : 'Start Discovery Scan'}
            </button>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-2">
        {scanning ? (
          <div className="h-full min-h-[400px] bg-[#0A0F1A] border border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center">
            <div className="relative w-24 h-24 mb-8">
              <div className="absolute inset-0 border-4 border-white/5 rounded-full" />
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="46"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeDasharray={289}
                  strokeDashoffset={289 - (289 * progress) / 100}
                  className="transition-all duration-300 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xl font-bold text-white">{Math.round(progress)}%</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Analyzing Schema</h3>
            <p className="text-white/40 max-w-sm">Applying machine learning classifiers across millions of rows to identify sensitive endpoints.</p>
          </div>
        ) : result ? (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
               <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-5">
                 <div className="text-white/40 text-xs font-semibold uppercase mb-1">Tables Scanned</div>
                 <div className="text-3xl font-bold text-white">{result.scanned_tables}</div>
               </div>
               <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-5">
                 <div className="text-white/40 text-xs font-semibold uppercase mb-1">Rows Processed</div>
                 <div className="text-3xl font-bold text-white">{result.scanned_rows.toLocaleString()}</div>
               </div>
               <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl p-5">
                 <div className="text-white/40 text-xs font-semibold uppercase mb-1">PII Findings</div>
                 <div className="text-3xl font-bold text-red-400">{result.findings.length}</div>
               </div>
            </div>

            <div className="bg-[#0A0F1A] border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-5 border-b border-white/10">
                <h3 className="font-bold text-white">Discovery Findings</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                  <thead className="bg-[#080D18]">
                    <tr>
                      <th className="px-5 py-3 text-white/40 font-medium">Location</th>
                      <th className="px-5 py-3 text-white/40 font-medium">PII Type</th>
                      <th className="px-5 py-3 text-white/40 font-medium">Risk Level</th>
                      <th className="px-5 py-3 text-white/40 font-medium">Confidence</th>
                      <th className="px-5 py-3 text-white/40 font-medium">Sample Match</th>
                      <th className="px-5 py-3 text-right text-white/40 font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {result.findings.map((f, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-white font-medium">{f.table}</span>
                            <ChevronRight className="w-3 h-3 text-white/30" />
                            <span className="text-white/60 font-mono text-xs">{f.column}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-white/80">{f.pii_type}</td>
                        <td className="px-5 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${getRiskColor(f.risk)}`}>
                            {f.risk.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-violet-500" style={{ width: `${f.confidence}%` }}></div>
                            </div>
                            <span className="text-white/60 text-xs">{f.confidence}%</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 font-mono text-xs text-white/40">{f.sample}</td>
                        <td className="px-5 py-4 text-right">
                          <button className="text-xs font-medium text-violet-400 hover:text-violet-300 bg-violet-500/10 hover:bg-violet-500/20 px-3 py-1.5 rounded-lg transition-colors">
                            Mask Column
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="h-full min-h-[400px] border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-center p-10">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <ShieldAlert className="w-8 h-8 text-white/20" />
            </div>
            <h3 className="text-lg font-bold text-white/60">No Scan Results</h3>
            <p className="text-sm text-white/30 mt-2 max-w-sm">Configure and run a discovery scan on a target database to uncover hidden sensitive data.</p>
          </div>
        )}
      </div>
    </div>
  );
}
