"use client";

import React, { useMemo } from "react";
import { normalPDF } from "@/lib/math/zScoreMath";

export type ShadeMode = "left" | "right" | "between" | "two-tail";

interface BellCurveVisualizerProps {
  z1: number;
  z2?: number; // Only used for "between" or "two-tail"
  shadeMode: ShadeMode;
  width?: number;
  height?: number;
}

export function BellCurveVisualizer({
  z1,
  z2 = 0,
  shadeMode,
  width = 800,
  height = 400,
}: BellCurveVisualizerProps) {
  
  const padding = 40;
  const graphW = width - padding * 2;
  const graphH = height - padding * 2;
  
  // We'll graph from Z = -4 to Z = +4
  const minZ = -4;
  const maxZ = 4;
  
  // Helper to map Z-score to SVG X coordinate
  const zToX = (z: number) => {
    // clamp z for drawing purposes to prevent breaking the box
    const clampedZ = Math.max(minZ, Math.min(maxZ, z));
    const ratio = (clampedZ - minZ) / (maxZ - minZ);
    return padding + ratio * graphW;
  };

  // Helper to map PDF to SVG Y coordinate
  const maxPDF = normalPDF(0); // 0.3989
  const pdfToY = (pdf: number) => {
    const ratio = pdf / maxPDF;
    return padding + graphH - (ratio * graphH);
  };

  // Generate the path for the full bell curve
  const { curvePath, shadedPath } = useMemo(() => {
    const steps = 200;
    const stepSize = (maxZ - minZ) / steps;
    
    let path = "";
    let shaded = "";
    
    // Determine which X coordinates should be shaded
    const isShaded = (z: number) => {
      switch (shadeMode) {
        case "left":
          return z <= z1;
        case "right":
          return z >= z1;
        case "between":
          const lower = Math.min(z1, z2);
          const upper = Math.max(z1, z2);
          return z >= lower && z <= upper;
        case "two-tail":
          const absZ = Math.abs(z1);
          return z <= -absZ || z >= absZ;
        default:
          return false;
      }
    };

    // Shading path logic: we need to draw a closed polygon for shaded regions
    let isCurrentlyShading = false;

    for (let i = 0; i <= steps; i++) {
      const z = minZ + i * stepSize;
      const x = zToX(z);
      const y = pdfToY(normalPDF(z));
      
      // Main curve
      if (i === 0) {
        path += `M ${x} ${y} `;
      } else {
        path += `L ${x} ${y} `;
      }

      // Shaded area
      const shading = isShaded(z);
      
      if (shading && !isCurrentlyShading) {
        // Start a new shaded block
        shaded += `M ${x} ${padding + graphH} L ${x} ${y} `;
        isCurrentlyShading = true;
      } else if (shading && isCurrentlyShading) {
        // Continue the shaded block
        shaded += `L ${x} ${y} `;
      } else if (!shading && isCurrentlyShading) {
        // Close the shaded block
        const prevZ = z - stepSize;
        const prevX = zToX(prevZ);
        shaded += `L ${prevX} ${padding + graphH} Z `;
        isCurrentlyShading = false;
      }
    }
    
    // If the loop finished while shading, close the path
    if (isCurrentlyShading) {
      shaded += `L ${zToX(maxZ)} ${padding + graphH} Z`;
    }

    return { curvePath: path, shadedPath: shaded };
  }, [z1, z2, shadeMode, padding, graphH, minZ, maxZ]);

  // Generate ticks
  const ticks = [-4, -3, -2, -1, 0, 1, 2, 3, 4];

  return (
    <div className="w-full relative bg-white border border-slate-200 rounded-2xl shadow-inner p-4 overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto text-slate-800 drop-shadow-md"
        aria-label="Interactive standard normal distribution bell curve"
        role="img"
      >
        <defs>
          <linearGradient id="shadeGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* X Axis */}
        <line
          x1={padding}
          y1={padding + graphH}
          x2={width - padding}
          y2={padding + graphH}
          stroke="#cbd5e1"
          strokeWidth="2"
        />

        {/* Ticks and Labels */}
        {ticks.map((tick) => (
          <g key={tick}>
            <line
              x1={zToX(tick)}
              y1={padding + graphH}
              x2={zToX(tick)}
              y2={padding + graphH + 6}
              stroke="#cbd5e1"
              strokeWidth="2"
            />
            {/* Grid line */}
            <line
              x1={zToX(tick)}
              y1={padding}
              x2={zToX(tick)}
              y2={padding + graphH}
              stroke="#f1f5f9"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
            <text
              x={zToX(tick)}
              y={padding + graphH + 24}
              textAnchor="middle"
              className="text-sm font-semibold fill-slate-500"
            >
              {tick}
            </text>
          </g>
        ))}

        {/* Shaded Area */}
        {shadedPath && (
          <path
            d={shadedPath}
            fill="url(#shadeGradient)"
            className="transition-all duration-300 ease-in-out"
          />
        )}

        {/* Main Bell Curve Line */}
        <path
          d={curvePath}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-lg"
        />

        {/* Marker for Z1 */}
        {shadeMode !== "between" && (
          <g transform={`translate(${zToX(z1)}, ${padding + graphH})`}>
            <line x1="0" y1="0" x2="0" y2={-(graphH)} stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
            <circle cx="0" cy={-(graphH - pdfToY(normalPDF(z1)) + padding)} r="5" fill="#ef4444" />
            <rect x="-24" y="10" width="48" height="24" rx="4" fill="#ef4444" />
            <text x="0" y="26" textAnchor="middle" className="text-xs font-bold fill-white">
              {z1.toFixed(2)}
            </text>
          </g>
        )}

        {/* Marker for Z1 and Z2 (Between mode) */}
        {shadeMode === "between" && (
          <>
            <g transform={`translate(${zToX(z1)}, ${padding + graphH})`}>
              <line x1="0" y1="0" x2="0" y2={-(graphH)} stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
              <rect x="-24" y="10" width="48" height="24" rx="4" fill="#ef4444" />
              <text x="0" y="26" textAnchor="middle" className="text-xs font-bold fill-white">
                {z1.toFixed(2)}
              </text>
            </g>
            <g transform={`translate(${zToX(z2)}, ${padding + graphH})`}>
              <line x1="0" y1="0" x2="0" y2={-(graphH)} stroke="#ef4444" strokeWidth="2" strokeDasharray="6 4" />
              <rect x="-24" y="10" width="48" height="24" rx="4" fill="#ef4444" />
              <text x="0" y="26" textAnchor="middle" className="text-xs font-bold fill-white">
                {z2.toFixed(2)}
              </text>
            </g>
          </>
        )}
      </svg>
    </div>
  );
}
