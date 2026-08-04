"use client";

import React, { useState } from "react";
import { BellCurveVisualizer, ShadeMode } from "./BellCurveVisualizer";
import { normalCDF } from "@/lib/math/zScoreMath";

export function ZScoreExplorerMode() {
  const [shadeMode, setShadeMode] = useState<ShadeMode>("left");
  const [z1, setZ1] = useState<string>("1.96");
  const [z2, setZ2] = useState<string>("-1.96");

  const parsedZ1 = parseFloat(z1) || 0;
  const parsedZ2 = parseFloat(z2) || 0;

  // Calculate Probability
  let prob = 0;
  if (shadeMode === "left") {
    prob = normalCDF(parsedZ1);
  } else if (shadeMode === "right") {
    prob = 1 - normalCDF(parsedZ1);
  } else if (shadeMode === "between") {
    const lower = Math.min(parsedZ1, parsedZ2);
    const upper = Math.max(parsedZ1, parsedZ2);
    prob = normalCDF(upper) - normalCDF(lower);
  } else if (shadeMode === "two-tail") {
    const absZ = Math.abs(parsedZ1);
    prob = normalCDF(-absZ) + (1 - normalCDF(absZ));
  }

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h3 className="text-2xl font-bold text-slate-800 mb-3">Interactive Normal Distribution Explorer</h3>
        <p className="text-slate-600">
          Visualize Z-scores on the standard normal distribution curve. 
          Select a shading mode and enter your Z-scores to instantly see the calculated area (probability) under the curve.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-4">Shading Mode</h4>
            <div className="space-y-3">
              {(["left", "right", "between", "two-tail"] as const).map((mode) => (
                <label key={mode} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                  <input
                    type="radio"
                    name="shadeMode"
                    value={mode}
                    checked={shadeMode === mode}
                    onChange={() => setShadeMode(mode)}
                    className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-slate-700 capitalize">
                    {mode === "left" && "Left Tail P(Z < z)"}
                    {mode === "right" && "Right Tail P(Z > z)"}
                    {mode === "between" && "Between P(z₁ < Z < z₂)"}
                    {mode === "two-tail" && "Two Tail P(|Z| > |z|)"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-800 mb-2">Z-Score Inputs</h4>
            <div>
              <label className="block text-sm font-semibold text-slate-600 mb-1">
                {shadeMode === "between" ? "Z₁" : "Z-Score"}
              </label>
              <input
                type="number"
                step="0.01"
                value={z1}
                onChange={(e) => setZ1(e.target.value)}
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {shadeMode === "between" && (
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-1">Z₂</label>
                <input
                  type="number"
                  step="0.01"
                  value={z2}
                  onChange={(e) => setZ2(e.target.value)}
                  className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}
          </div>
        </div>

        {/* Visualization & Result */}
        <div className="lg:col-span-8 space-y-6">
          <BellCurveVisualizer
            z1={parsedZ1}
            z2={parsedZ2}
            shadeMode={shadeMode}
          />

          <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="text-sm font-medium text-slate-400 mb-1 uppercase tracking-wider">Shaded Area (Probability)</div>
                <div className="text-5xl font-bold text-white">
                  {prob.toFixed(4)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-slate-400 mb-1 uppercase tracking-wider">Percentage</div>
                <div className="text-4xl font-bold text-blue-400">
                  {(prob * 100).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
