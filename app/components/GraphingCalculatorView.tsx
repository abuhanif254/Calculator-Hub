"use client";

import React, { useState, useEffect, useRef } from "react";
import { CalculatorDef } from "@/lib/types";
import * as math from "mathjs";

interface GraphingCalculatorViewProps {
  calcDef: CalculatorDef;
}

export default function GraphingCalculatorView({ calcDef }: GraphingCalculatorViewProps) {
  const [equation, setEquation] = useState("sin(x)");
  const [xMin, setXMin] = useState("-10");
  const [xMax, setXMax] = useState("10");
  const [yMin, setYMin] = useState("-10");
  const [yMax, setYMax] = useState("10");
  const [errorPrompt, setErrorPrompt] = useState("");
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Parse bounds
    const xMinNum = parseFloat(xMin) || -10;
    const xMaxNum = parseFloat(xMax) || 10;
    const yMinNum = parseFloat(yMin) || -10;
    const yMaxNum = parseFloat(yMax) || 10;

    if (xMinNum >= xMaxNum || yMinNum >= yMaxNum) {
      setErrorPrompt("Invalid bounds. Ensure Min < Max.");
      return;
    }

    try {
      const compiledExpr = math.compile(equation);
      setErrorPrompt("");

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw grid & axes
      ctx.beginPath();
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 1;
      
      const xScale = width / (xMaxNum - xMinNum);
      const yScale = height / (yMaxNum - yMinNum);

      // Draw vertical grid
      for (let i = Math.ceil(xMinNum); i <= Math.floor(xMaxNum); i++) {
        const x = (i - xMinNum) * xScale;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      // Draw horizontal grid
      for (let i = Math.ceil(yMinNum); i <= Math.floor(yMaxNum); i++) {
        const y = height - (i - yMinNum) * yScale;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Axes
      ctx.beginPath();
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 2;
      // Y-axis
      if (0 >= xMinNum && 0 <= xMaxNum) {
        const x0 = (0 - xMinNum) * xScale;
        ctx.moveTo(x0, 0);
        ctx.lineTo(x0, height);
      }
      // X-axis
      if (0 >= yMinNum && 0 <= yMaxNum) {
        const y0 = height - (0 - yMinNum) * yScale;
        ctx.moveTo(0, y0);
        ctx.lineTo(width, y0);
      }
      ctx.stroke();

      // Draw Function
      ctx.beginPath();
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 2;
      
      let firstPoint = true;
      const step = (xMaxNum - xMinNum) / width; // 1 pixel step
      
      for (let px = 0; px <= width; px++) {
        const mathX = xMinNum + px * step;
        let mathY;
        try {
            mathY = compiledExpr.evaluate({ x: mathX });
        } catch (e) {
            continue; // Skip invalid points
        }
        
        const py = height - (mathY - yMinNum) * yScale;
        
        if (firstPoint || mathY === Infinity || mathY === -Infinity || Number.isNaN(mathY)) {
          ctx.moveTo(px, py);
          if (mathY !== Infinity && mathY !== -Infinity && !Number.isNaN(mathY)) {
            firstPoint = false;
          }
        } else {
          ctx.lineTo(px, py);
        }
      }
      
      ctx.stroke();

    } catch (e: any) {
      setErrorPrompt(e.message || "Invalid mathematical expression.");
    }
  };

  // Re-draw when inputs change
  useEffect(() => {
    drawGraph();
  }, [equation, xMin, xMax, yMin, yMax]);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{calcDef.title}</h2>
        <p className="text-slate-600">{calcDef.description}</p>
      </div>

      <div className="p-6 md:p-8 grid md:grid-cols-3 gap-8">
        <div className="space-y-6 md:col-span-1 border-r border-slate-100 pr-0 md:pr-8">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-700">Enter function f(x)</label>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-slate-600">f(x) =</span>
              <input 
                type="text" 
                value={equation} 
                onChange={(e) => setEquation(e.target.value)}
                className="w-full h-12 bg-slate-50 border-slate-200 border rounded-xl px-4 font-mono focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="x^2 + 2x + 1"
              />
            </div>
            {errorPrompt && <p className="text-red-500 text-sm">{errorPrompt}</p>}

            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-sm font-semibold text-slate-700 mb-4">Graph Bounds</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">X Min</label>
                  <input type="number" value={xMin} onChange={e => setXMin(e.target.value)} className="w-full h-10 border border-slate-200 rounded-lg px-3" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">X Max</label>
                  <input type="number" value={xMax} onChange={e => setXMax(e.target.value)} className="w-full h-10 border border-slate-200 rounded-lg px-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Y Min</label>
                  <input type="number" value={yMin} onChange={e => setYMin(e.target.value)} className="w-full h-10 border border-slate-200 rounded-lg px-3" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-1">Y Max</label>
                  <input type="number" value={yMax} onChange={e => setYMax(e.target.value)} className="w-full h-10 border border-slate-200 rounded-lg px-3" />
                </div>
              </div>

            </div>

            <button onClick={drawGraph} className="w-full mt-4 h-12 font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
              Update Graph
            </button>
            <div className="text-xs text-slate-500 mt-2">
              Supports standard math functions (e.g., sin, cos, tan, log, sqrt, abs) and operators (+, -, *, /, ^).
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="w-full max-w-full overflow-hidden text-center flex flex-col items-center">
            <canvas 
              ref={canvasRef} 
              width={600} 
              height={500} 
              className="bg-white rounded border border-slate-200 shadow-sm max-w-full"
            ></canvas>
            <div className="mt-4 text-slate-500 font-mono">
              y = {equation}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
