'use client';

import React, { useState, useMemo } from 'react';
import { calculateZInterval } from '@/lib/math/confidenceIntervalMath';

export function CIVisualExplorer() {
  const [n, setN] = useState<number>(30);
  const [conf, setConf] = useState<number>(95);
  const [sd, setSd] = useState<number>(10);
  
  const [distType, setDistType] = useState<'Z' | 'T5' | 'T30'>('Z');

  // Helper for Z interval calculation in explorer
  const moExplorerCI = useMemo(() => {
    return calculateZInterval(0, sd, n, conf);
  }, [n, conf, sd]);

  // SVG Curve points generator
  const curvePoints = useMemo(() => {
    const points: [number, number][] = [];
    const minX = -4;
    const maxX = 4;
    const steps = 200;
    
    for (let i = 0; i <= steps; i++) {
      const x = minX + (i / steps) * (maxX - minX);
      let y = 0;
      
      if (distType === 'Z') {
        y = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
      } else {
        const df = distType === 'T5' ? 5 : 30;
        // Simple unnormalized T-distribution shape for visual comparison
        y = Math.pow(1 + (x * x) / df, -(df + 1) / 2) * 0.39; // approximate height scalar
      }
      points.push([x, y]);
    }
    return points;
  }, [distType]);

  // Helper: converts a curve point to SVG coordinate string
  const toSvgCoord = (p: [number, number], i: number) =>
    (i === 0 ? 'M' : 'L') + ' ' + ((p[0] + 4) * (100 / 8)).toFixed(3) + ' ' + (100 - p[1] * 220).toFixed(3);

  const criticalZ = moExplorerCI.criticalValue || 1.96;

  const svgPath = curvePoints.map(toSvgCoord).join(' ');

  const leftPoints = curvePoints.filter(p => p[0] <= -criticalZ);
  const rightPoints = curvePoints.filter(p => p[0] >= criticalZ);
  const centerPoints = curvePoints.filter(p => p[0] >= -criticalZ && p[0] <= criticalZ);

  const leftX = ((-criticalZ + 4) * (100 / 8)).toFixed(3);
  const rightX = ((criticalZ + 4) * (100 / 8)).toFixed(3);

  const shadePathLeft = leftPoints.map(toSvgCoord).join(' ') + ' L ' + leftX + ' 100 L 0 100 Z';
  const shadePathRight = rightPoints.map(toSvgCoord).join(' ') + ' L 100 100 L ' + rightX + ' 100 Z';
  const shadePathCenter = centerPoints.map(toSvgCoord).join(' ') + ' L ' + rightX + ' 100 L ' + leftX + ' 100 Z';

  // Comparison State
  const [compA, setCompA] = useState({ mean: 100, sd: 15, n: 30, conf: 95 });
  const [compB, setCompB] = useState({ mean: 110, sd: 15, n: 30, conf: 95 });
  
  const ciA = useMemo(() => calculateZInterval(compA.mean, compA.sd, compA.n, compA.conf), [compA]);
  const ciB = useMemo(() => calculateZInterval(compB.mean, compB.sd, compB.n, compB.conf), [compB]);
  
  const minBound = Math.min(ciA.lower, ciB.lower) - 5;
  const maxBound = Math.max(ciA.upper, ciB.upper) + 5;
  const range = maxBound - minBound;
  
  const getLeftPct = (val: number) => Math.max(0, Math.min(100, ((val - minBound) / range) * 100));

  return (
    <div className="space-y-8">
      {/* Margin of Error Explorer */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Margin of Error Explorer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-semibold text-slate-700">Sample Size (n)</label>
                <span className="text-sm font-medium text-slate-600">{n}</span>
              </div>
              <input type="range" min="5" max="1000" step="1" value={n} onChange={e => setN(Number(e.target.value))} className="w-full accent-[#518231]" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-semibold text-slate-700">Confidence Level (%)</label>
                <span className="text-sm font-medium text-slate-600">{conf}%</span>
              </div>
              <input type="range" min="80" max="99.9" step="0.1" value={conf} onChange={e => setConf(Number(e.target.value))} className="w-full accent-[#518231]" />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <label className="text-sm font-semibold text-slate-700">Standard Deviation (σ)</label>
                <span className="text-sm font-medium text-slate-600">{sd}</span>
              </div>
              <input type="range" min="0.1" max="100" step="0.1" value={sd} onChange={e => setSd(Number(e.target.value))} className="w-full accent-[#518231]" />
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-6 flex flex-col justify-center text-center">
            <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Margin of Error</h3>
            <div className="text-4xl font-bold text-[#518231] mb-4">
              ±{moExplorerCI.marginOfError.toFixed(2)}
            </div>
            <div className="text-sm text-slate-600 mb-6">
              Critical Z: {moExplorerCI.criticalValue.toFixed(3)}
            </div>
            
            <div className="relative h-12 flex items-center justify-center w-full max-w-sm mx-auto">
              {/* Visual CI Bar */}
              <div className="absolute w-full h-1 bg-slate-200 rounded"></div>
              <div 
                className="absolute h-2 bg-blue-500 rounded transition-all duration-300" 
                style={{ width: `\${Math.min(100, (moExplorerCI.marginOfError / (sd * 3)) * 50)}%` }}
              ></div>
              <div className="absolute w-3 h-3 bg-blue-700 rounded-full z-10 shadow-sm"></div>
              
              <div className="absolute top-8 left-0 text-xs text-slate-400">-{moExplorerCI.marginOfError.toFixed(1)}</div>
              <div className="absolute top-8 right-0 text-xs text-slate-400">+{moExplorerCI.marginOfError.toFixed(1)}</div>
              <div className="absolute top-8 text-xs font-semibold text-slate-600">0</div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Size Effect */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Sample Size Effect</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[10, 50, 200].map(size => {
            const ci = calculateZInterval(0, sd, size, conf);
            return (
              <div key={size} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-slate-700">n = {size}</span>
                  <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    Width: {(ci.marginOfError * 2).toFixed(2)}
                  </span>
                </div>
                <div className="relative h-8 flex items-center justify-center w-full">
                  <div className="absolute w-full h-1 bg-slate-200 rounded"></div>
                  <div 
                    className="absolute h-1.5 bg-[#518231] rounded transition-all" 
                    style={{ width: `\${Math.min(100, (ci.marginOfError / (sd * 3)) * 50)}%` }}
                  ></div>
                  <div className="absolute w-2 h-2 bg-green-900 rounded-full z-10"></div>
                </div>
                <div className="text-center text-sm text-slate-500 mt-2">
                  ±{ci.marginOfError.toFixed(2)}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Distribution Visualizer */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Distribution Visualizer</h2>
          <select 
            value={distType} 
            onChange={(e) => setDistType(e.target.value as any)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none"
          >
            <option value="Z">Normal (Z)</option>
            <option value="T30">T-Dist (df=30)</option>
            <option value="T5">T-Dist (df=5)</option>
          </select>
        </div>
        
        <div className="w-full max-w-2xl mx-auto border border-slate-100 rounded-xl overflow-hidden bg-white">
          <svg viewBox="0 0 100 100" className="w-full h-64 overflow-visible">
            {/* Center Area */}
            <path d={shadePathCenter} fill="#eff6ff" />
            {/* Tails */}
            <path d={shadePathLeft} fill="#fee2e2" />
            <path d={shadePathRight} fill="#fee2e2" />
            
            {/* Main Curve */}
            <path d={svgPath} fill="none" stroke="#3b82f6" strokeWidth="1.5" />
            
            {/* Critical lines */}
            <line x1={(-criticalZ + 4) * (100 / 8)} y1="0" x2={(-criticalZ + 4) * (100 / 8)} y2="100" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2" />
            <line x1={(criticalZ + 4) * (100 / 8)} y1="0" x2={(criticalZ + 4) * (100 / 8)} y2="100" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2" />
            
            {/* Axis */}
            <line x1="0" y1="100" x2="100" y2="100" stroke="#94a3b8" strokeWidth="1" />
            
            {/* Text Labels */}
            <text x="50" y="50" fontSize="4" textAnchor="middle" fill="#1e40af" fontWeight="bold">1 - α</text>
            <text x="15" y="85" fontSize="3" textAnchor="middle" fill="#b91c1c" fontWeight="bold">α/2</text>
            <text x="85" y="85" fontSize="3" textAnchor="middle" fill="#b91c1c" fontWeight="bold">α/2</text>
            
            {/* Axis labels */}
            <text x={(-criticalZ + 4) * (100 / 8)} y="106" fontSize="3" textAnchor="middle" fill="#475569">{-criticalZ.toFixed(2)}</text>
            <text x={(criticalZ + 4) * (100 / 8)} y="106" fontSize="3" textAnchor="middle" fill="#475569">{criticalZ.toFixed(2)}</text>
            <text x="50" y="106" fontSize="3" textAnchor="middle" fill="#475569">0</text>
          </svg>
        </div>
      </section>

      {/* CI Comparison */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Confidence Interval Comparison</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700">Dataset A</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Mean</label>
                <input type="number" value={compA.mean} onChange={e => setCompA({...compA, mean: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">SD</label>
                <input type="number" value={compA.sd} onChange={e => setCompA({...compA, sd: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">n</label>
                <input type="number" value={compA.n} onChange={e => setCompA({...compA, n: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Conf %</label>
                <input type="number" value={compA.conf} onChange={e => setCompA({...compA, conf: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-700">Dataset B</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500 block mb-1">Mean</label>
                <input type="number" value={compB.mean} onChange={e => setCompB({...compB, mean: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">SD</label>
                <input type="number" value={compB.sd} onChange={e => setCompB({...compB, sd: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">n</label>
                <input type="number" value={compB.n} onChange={e => setCompB({...compB, n: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
              <div>
                <label className="text-xs text-slate-500 block mb-1">Conf %</label>
                <input type="number" value={compB.conf} onChange={e => setCompB({...compB, conf: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
          <div className="relative h-32 w-full pt-4">
            {/* Axis */}
            <div className="absolute bottom-0 w-full h-0.5 bg-slate-300"></div>
            
            {/* CI Bar A */}
            <div className="absolute top-4 h-6 w-full group">
              <div className="absolute h-0.5 top-1/2 -translate-y-1/2 bg-blue-400" style={{ left: `\${getLeftPct(ciA.lower)}%`, width: `\${getLeftPct(ciA.upper) - getLeftPct(ciA.lower)}%` }}></div>
              <div className="absolute w-2 h-6 bg-blue-400 top-0" style={{ left: `\${getLeftPct(ciA.lower)}%`, transform: 'translateX(-50%)' }}></div>
              <div className="absolute w-2 h-6 bg-blue-400 top-0" style={{ left: `\${getLeftPct(ciA.upper)}%`, transform: 'translateX(-50%)' }}></div>
              <div className="absolute w-3 h-3 rounded-full bg-blue-600 top-1/2 -translate-y-1/2 shadow-sm" style={{ left: `\${getLeftPct(ciA.pointEstimate)}%`, transform: 'translateX(-50%)' }}></div>
              <span className="absolute -top-4 text-xs font-bold text-blue-700" style={{ left: `\${getLeftPct(ciA.pointEstimate)}%`, transform: 'translateX(-50%)' }}>A</span>
            </div>
            
            {/* CI Bar B */}
            <div className="absolute top-16 h-6 w-full group">
              <div className="absolute h-0.5 top-1/2 -translate-y-1/2 bg-[#518231]/60" style={{ left: `\${getLeftPct(ciB.lower)}%`, width: `\${getLeftPct(ciB.upper) - getLeftPct(ciB.lower)}%` }}></div>
              <div className="absolute w-2 h-6 bg-[#518231]/60 top-0" style={{ left: `\${getLeftPct(ciB.lower)}%`, transform: 'translateX(-50%)' }}></div>
              <div className="absolute w-2 h-6 bg-[#518231]/60 top-0" style={{ left: `\${getLeftPct(ciB.upper)}%`, transform: 'translateX(-50%)' }}></div>
              <div className="absolute w-3 h-3 rounded-full bg-[#518231] top-1/2 -translate-y-1/2 shadow-sm" style={{ left: `\${getLeftPct(ciB.pointEstimate)}%`, transform: 'translateX(-50%)' }}></div>
              <span className="absolute -top-4 text-xs font-bold text-[#518231]" style={{ left: `\${getLeftPct(ciB.pointEstimate)}%`, transform: 'translateX(-50%)' }}>B</span>
            </div>
            
            {/* Min/Max Labels */}
            <div className="absolute -bottom-6 text-xs text-slate-500" style={{ left: '0' }}>{minBound.toFixed(1)}</div>
            <div className="absolute -bottom-6 text-xs text-slate-500" style={{ right: '0' }}>{maxBound.toFixed(1)}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
