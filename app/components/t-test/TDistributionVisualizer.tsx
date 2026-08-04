"use client";

import React, { useMemo } from "react";
import { jStat } from "jstat";

interface TDistributionVisualizerProps {
  df: number;
  tStat: number | null;
  alpha: number;
  tails: 1 | 2;
}

export function TDistributionVisualizer({ df, tStat, alpha, tails }: TDistributionVisualizerProps) {
  // Config
  const width = 800;
  const height = 400;
  const padding = { top: 40, right: 40, bottom: 40, left: 60 };
  const graphWidth = width - padding.left - padding.right;
  const graphHeight = height - padding.top - padding.bottom;
  
  // Data generation
  const points = 200;
  const minX = -5; // Typical range for t-distribution visualization
  const maxX = 5;
  const rangeX = maxX - minX;

  const { curveData, maxPdf, criticalValues } = useMemo(() => {
    const data = [];
    let localMaxPdf = 0;
    for (let i = 0; i <= points; i++) {
      const x = minX + (i / points) * rangeX;
      // Safeguard against df <= 0 (which shouldn't happen, but just in case)
      const y = df > 0 ? jStat.studentt.pdf(x, df) : 0;
      if (y > localMaxPdf) localMaxPdf = y;
      data.push({ x, y });
    }

    // Calculate critical values based on alpha and tails
    const critValues = [];
    if (df > 0) {
      if (tails === 2) {
        critValues.push(jStat.studentt.inv(alpha / 2, df));
        critValues.push(jStat.studentt.inv(1 - alpha / 2, df));
      } else {
        // One tail (assume upper for visual simplicity, or show both depending on how we treat one-tail)
        // Usually, users don't specify left or right in this UI, so we just show positive threshold
        critValues.push(jStat.studentt.inv(1 - alpha, df));
      }
    }

    return { curveData: data, maxPdf: localMaxPdf * 1.1, criticalValues: critValues }; // 1.1 for margin
  }, [df, alpha, tails]);

  // Scaling functions
  const scaleX = (x: number) => padding.left + ((x - minX) / rangeX) * graphWidth;
  const scaleY = (y: number) => padding.top + graphHeight - (y / maxPdf) * graphHeight;

  // Path generators
  const generatePath = (data: {x: number, y: number}[]) => {
    if (data.length === 0) return "";
    let d = `M ${scaleX(data[0].x)} ${scaleY(data[0].y)}`;
    for (let i = 1; i < data.length; i++) {
      d += ` L ${scaleX(data[i].x)} ${scaleY(data[i].y)}`;
    }
    return d;
  };

  const curvePath = generatePath(curveData);
  
  // Area path generators for shading
  const generateArea = (data: {x: number, y: number}[], condition: (x: number) => boolean) => {
    const filtered = data.filter(d => condition(d.x));
    if (filtered.length === 0) return "";
    
    // Add baseline points to close the polygon
    let d = `M ${scaleX(filtered[0].x)} ${scaleY(0)}`;
    for (let i = 0; i < filtered.length; i++) {
      d += ` L ${scaleX(filtered[i].x)} ${scaleY(filtered[i].y)}`;
    }
    d += ` L ${scaleX(filtered[filtered.length - 1].x)} ${scaleY(0)} Z`;
    return d;
  };

  const leftRejectionArea = criticalValues.length === 2 ? generateArea(curveData, x => x <= criticalValues[0]) : "";
  const rightRejectionArea = criticalValues.length > 0 ? generateArea(curveData, x => x >= criticalValues[criticalValues.length - 1]) : "";
  
  const yAxisTicks = [0, maxPdf * 0.25, maxPdf * 0.5, maxPdf * 0.75, maxPdf];
  const xAxisTicks = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

  return (
    <div className="w-full overflow-x-auto hide-scrollbar bg-slate-900 rounded-3xl p-4 border border-slate-700">
      <div className="min-w-[600px]">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto text-slate-300 font-sans">
          
          {/* Grid Lines */}
          <g className="text-slate-700">
            {yAxisTicks.map((yVal, i) => (
              <line key={`grid-y-${i}`} x1={padding.left} y1={scaleY(yVal)} x2={width - padding.right} y2={scaleY(yVal)} stroke="currentColor" strokeDasharray="4 4" strokeWidth="1" />
            ))}
            <line x1={padding.left} y1={scaleY(0)} x2={width - padding.right} y2={scaleY(0)} stroke="currentColor" strokeWidth="2" />
          </g>

          {/* Axes Text */}
          <g className="text-slate-400 text-xs">
            {xAxisTicks.map(xVal => (
              <g key={`x-axis-${xVal}`}>
                <line x1={scaleX(xVal)} y1={scaleY(0)} x2={scaleX(xVal)} y2={scaleY(0) + 5} stroke="currentColor" />
                <text x={scaleX(xVal)} y={scaleY(0) + 20} textAnchor="middle" fill="currentColor">{xVal}</text>
              </g>
            ))}
            {yAxisTicks.map((yVal, i) => (
              <text key={`y-axis-${i}`} x={padding.left - 10} y={scaleY(yVal)} textAnchor="end" dominantBaseline="middle" fill="currentColor">
                {yVal.toFixed(2)}
              </text>
            ))}
          </g>

          {/* Rejection Regions (Shaded) */}
          {leftRejectionArea && <path d={leftRejectionArea} fill="rgba(239, 68, 68, 0.3)" />}
          {rightRejectionArea && <path d={rightRejectionArea} fill="rgba(239, 68, 68, 0.3)" />}

          {/* Main Curve */}
          <path d={curvePath} fill="none" stroke="#3b82f6" strokeWidth="3" />

          {/* Critical Value Lines */}
          {criticalValues.map((cv, i) => (
            <g key={`cv-${i}`}>
              <line x1={scaleX(cv)} y1={padding.top} x2={scaleX(cv)} y2={scaleY(0)} stroke="#ef4444" strokeWidth="2" strokeDasharray="6 6" />
              <text x={scaleX(cv) + (cv > 0 ? 10 : -10)} y={padding.top + 20} fill="#ef4444" textAnchor={cv > 0 ? "start" : "end"} className="text-xs font-bold">
                t_crit = {cv.toFixed(2)}
              </text>
            </g>
          ))}

          {/* Actual T-Statistic Line */}
          {tStat !== null && (
            <g>
              {/* Clamp tStat for visual sanity so it doesn't render offscreen completely */}
              <line x1={scaleX(Math.max(minX, Math.min(maxX, tStat)))} y1={padding.top} x2={scaleX(Math.max(minX, Math.min(maxX, tStat)))} y2={scaleY(0)} stroke="#22c55e" strokeWidth="3" />
              <circle cx={scaleX(Math.max(minX, Math.min(maxX, tStat)))} cy={scaleY(0)} r="5" fill="#22c55e" />
              <rect x={scaleX(Math.max(minX, Math.min(maxX, tStat))) - 45} y={padding.top - 20} width="90" height="24" rx="4" fill="#22c55e" />
              <text x={scaleX(Math.max(minX, Math.min(maxX, tStat)))} y={padding.top - 4} fill="#fff" textAnchor="middle" className="text-xs font-bold">
                t = {tStat.toFixed(3)}
              </text>
            </g>
          )}

        </svg>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
          <span className="text-slate-300">t-Distribution (df={df.toFixed(1)})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-dashed border-red-500 rounded-sm"></div>
          <span className="text-slate-300">Critical Value(s) (α={alpha})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500/30 rounded-sm"></div>
          <span className="text-slate-300">Rejection Region</span>
        </div>
        {tStat !== null && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <span className="text-slate-300">Observed t-statistic</span>
          </div>
        )}
      </div>
    </div>
  );
}
