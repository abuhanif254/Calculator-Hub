"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { calculateStats, StatsResult } from "@/lib/statsUtils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import { useRef } from "react";

interface StatisticsCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function StatisticsCalculatorView({ calcDef }: StatisticsCalculatorViewProps) {
  const [inputData, setInputData] = useState<string>("");
  const [result, setResult] = useState<StatsResult | null>(null);
  const [error, setError] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState<boolean>(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const loadSampleData = () => {
    setInputData("12, 15, 17, 18, 18, 20, 22, 23, 24, 28, 30, 31, 33, 35, 38, 40, 42, 45, 48");
  };

  const handleCalculate = async () => {
    setError("");
    setResult(null);
    if (!inputData.trim()) {
      setError("Please enter some numbers.");
      return;
    }

    setIsCalculating(true);
    const res = await calculateStats(inputData);
    setIsCalculating(false);

    if ('error' in res) {
      setError(res.error);
    } else {
      setResult(res as StatsResult);
    }
  };

  const copyResults = async () => {
    if (!result) return;
    const text = `
Statistics Summary:
Count (N): ${result.count}
Sum: ${result.sum}
Mean (μ): ${result.mean.toFixed(4)}
Median: ${result.median.toFixed(4)}
Mode: ${result.mode.join(', ')}
Min: ${result.min}
Max: ${result.max}
Range: ${result.range}
Q1: ${result.q1}
Q3: ${result.q3}
IQR: ${result.iqr}
Variance (Sample): ${result.varianceSample.toFixed(4)}
Standard Deviation (Sample): ${result.stdDevSample.toFixed(4)}
Variance (Population): ${result.variancePop.toFixed(4)}
Standard Deviation (Population): ${result.stdDevPop.toFixed(4)}
Standard Error: ${result.stdErr.toFixed(4)}
Skewness: ${result.skewness ? result.skewness.toFixed(4) : 'N/A'}
Kurtosis: ${result.kurtosis ? result.kurtosis.toFixed(4) : 'N/A'}
    `.trim();
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch(err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const printReport = async () => {
    if (!reportRef.current) return;
    setIsGeneratingPdf(true);
    try {
      // Use htmlToImage to convert to PNG preserving modern CSS like oklch
      const imgData = await htmlToImage.toPng(reportRef.current, { pixelRatio: 2 });
      
      const img = new Image();
      img.src = imgData;
      await new Promise((resolve) => { img.onload = resolve; });

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (img.height * pdfWidth) / img.width;
      
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('statistics-report.pdf');
    } catch (err) {
      console.error("Failed to generate PDF", err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const toFixed = (val: number, decimals: number = 4) => {
    return Number.isInteger(val) ? val.toString() : val.toFixed(decimals);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200 print:hidden">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{calcDef.title}</h2>
        <p className="text-slate-600">{calcDef.description}</p>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* Input Section */}
        <div className="space-y-4 print:hidden">
          <div className="flex justify-between items-end">
            <label className="block text-sm font-semibold text-slate-700">Dataset</label>
            <button onClick={loadSampleData} className="text-sm text-blue-600 font-semibold hover:underline">
              Load Sample Data
            </button>
          </div>
          <textarea
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            placeholder="Enter numbers separated by commas, spaces, or newlines (e.g. 5, 10, 15...)"
            className="w-full h-32 p-4 bg-slate-50 border-slate-300 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-y font-mono text-sm"
          />
          <button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="w-full py-4 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-colors"
          >
            {isCalculating ? "Calculating..." : "Calculate Statistics"}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 print:hidden">
            {error}
          </div>
        )}

        {/* Results Section */}
        {result && (
          <div ref={reportRef} className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white p-2 rounded-xl">
            
            <div className="flex justify-between items-center print:hidden border-b pb-4">
              <h3 className="text-xl font-bold text-slate-800">Results Dashboard</h3>
              <div className="flex gap-4">
                 <button onClick={copyResults} className="text-sm px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition flex items-center gap-2">
                    {isCopied ? "Copied!" : "Copy Text"}
                 </button>
                 <button onClick={printReport} disabled={isGeneratingPdf} className="text-sm px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-medium transition flex items-center gap-2 disabled:opacity-50">
                    {isGeneratingPdf ? "Generating PDF..." : "Download PDF"}
                 </button>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <MetricCard title="Count (n)" value={result.count} />
              <MetricCard title="Sum (Σx)" value={toFixed(result.sum)} />
              <MetricCard title="Mean (μ/x̄)" value={toFixed(result.mean)} />
              <MetricCard title="Median" value={toFixed(result.median)} />
              
              <MetricCard title="Mode" value={result.mode.length > 0 ? result.mode.join(', ') : 'None'} />
              <MetricCard title="Min" value={toFixed(result.min)} />
              <MetricCard title="Max" value={toFixed(result.max)} />
              <MetricCard title="Range" value={toFixed(result.range)} />
              
              <MetricCard title="Std Dev (Sample)" value={toFixed(result.stdDevSample)} highlight />
              <MetricCard title="Variance (Sample)" value={toFixed(result.varianceSample)} />
              <MetricCard title="Std Dev (Pop)" value={toFixed(result.stdDevPop)} />
              <MetricCard title="Variance (Pop)" value={toFixed(result.variancePop)} />
              
              <MetricCard title="Q1 (25th Perc)" value={toFixed(result.q1)} />
              <MetricCard title="Q3 (75th Perc)" value={toFixed(result.q3)} />
              <MetricCard title="IQR" value={toFixed(result.iqr)} />
              <MetricCard title="Standard Error" value={toFixed(result.stdErr)} />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
               {result.skewness !== null && <MetricCard title="Skewness" value={toFixed(result.skewness)} subtitle="Symmetry of the dataset" />}
               {result.kurtosis !== null && <MetricCard title="Kurtosis (Excess)" value={toFixed(result.kurtosis)} subtitle="Tails and outliers measure" />}
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
              
              {/* Histogram */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4 text-center">Frequency Histogram</h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.histogramData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#CBD5E1" />
                      <XAxis dataKey="mid" tickFormatter={(val) => val.toFixed(1)} stroke="#64748B" fontSize={12} />
                      <YAxis stroke="#64748B" fontSize={12} allowDecimals={false} />
                      <Tooltip 
                        formatter={(val: any) => [val, "Frequency"]}
                        labelFormatter={(val: any) => `Bin center: ${Number(val).toFixed(2)}`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Normal Curve */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-4 text-center">Normal Distribution Fit</h4>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={result.normalCurveData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#CBD5E1" />
                      <XAxis dataKey="x" tickFormatter={(val) => val.toFixed(1)} stroke="#64748B" fontSize={12} type="number" domain={['dataMin', 'dataMax']} />
                      <YAxis stroke="#64748B" fontSize={12} tickFormatter={(val) => val.toFixed(3)} />
                      <Tooltip 
                        formatter={(val: any) => [Number(val).toFixed(5), "Density"]}
                        labelFormatter={(val: any) => `x: ${Number(val).toFixed(2)}`}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <Line type="monotone" dataKey="y" stroke="#8B5CF6" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Custom Box Plot */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-6 text-center">Box and Whisker Plot</h4>
                <div className="relative h-24 w-full max-w-2xl mx-auto flex items-center mt-4">
                  {/* Axis */}
                  <div className="absolute w-full h-[1px] bg-slate-300 bottom-0 left-0"></div>
                  
                  {(() => {
                    const fullRange = Math.max(result.max - result.min, 1);
                    const getPct = (val: number) => ((val - result.min) / fullRange) * 100;
                    
                    return (
                      <div className="relative w-full h-12">
                        {/* Whiskers */}
                        <div 
                          className="absolute h-px bg-slate-800 top-1/2 -translate-y-1/2"
                          style={{ left: `${getPct(result.min)}%`, width: `${getPct(result.q1) - getPct(result.min)}%` }}
                        ></div>
                        <div 
                          className="absolute h-px bg-slate-800 top-1/2 -translate-y-1/2"
                          style={{ left: `${getPct(result.q3)}%`, width: `${getPct(result.max) - getPct(result.q3)}%` }}
                        ></div>
                        
                        {/* Box */}
                        <div 
                          className="absolute h-full bg-blue-100 border-2 border-blue-600 rounded-sm top-0"
                          style={{ left: `${getPct(result.q1)}%`, width: `${getPct(result.q3) - getPct(result.q1)}%` }}
                        ></div>

                        {/* Median Line */}
                        <div 
                          className="absolute h-full w-[2px] bg-blue-800 top-0"
                          style={{ left: `${getPct(result.median)}%`, transform: 'translateX(-50%)' }}
                        ></div>

                        {/* Custom Ticks & Labels */}
                        {[
                          { val: result.min, label: 'Min' },
                          { val: result.q1, label: 'Q1' },
                          { val: result.median, label: 'Med' },
                          { val: result.q3, label: 'Q3' },
                          { val: result.max, label: 'Max' }
                        ].map((item, i) => (
                           <div 
                             key={i} 
                             className="absolute flex flex-col items-center"
                             style={{ left: `${getPct(item.val)}%`, transform: 'translateX(-50%)', top: '100%', marginTop: '8px' }}
                           >
                             <div className="w-px h-2 bg-slate-400 mb-1"></div>
                             <span className="text-xs font-semibold text-slate-600">{item.label}</span>
                             <span className="text-xs text-slate-500">{toFixed(item.val, 2)}</span>
                           </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
            </div>

            {/* Step-by-Step Show Work Section */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 mt-12 print:break-inside-avoid">
               <h3 className="text-2xl font-bold text-slate-800 mb-6">Show Work (Step-by-step)</h3>
               <div className="space-y-6 text-slate-700">
                  
                  <StepCard title="1. Mean Calculation">
                    <p>The mean (average) is calculated by adding all values and dividing by the count ($n$).</p>
                    <div className="my-4 p-4 bg-slate-50 rounded-lg overflow-x-auto">
                       <BlockMath math="\mu = \frac{\sum x_{i}}{n}" />
                       <BlockMath math={`\\mu = \\frac{${toFixed(result.sum)}}{${result.count}} = ${toFixed(result.mean)}`} />
                    </div>
                  </StepCard>

                  <StepCard title="2. Median Calculation">
                    <p>First, sort the numbers in ascending order. Since $n = ${result.count}, the median is the {result.count % 2 === 0 ? "average of the two middle values." : "middle value."}</p>
                    <div className="my-4 p-4 bg-slate-50 rounded-lg text-sm text-center">
                       {result.sortedData.length > 20 
                         ? `[${result.sortedData.slice(0,3).join(', ')}, ..., ${result.median}, ..., ${result.sortedData.slice(-3).join(', ')}]` 
                         : result.sortedData.join(', ')}
                    </div>
                    <p className="text-center font-bold">Median = {toFixed(result.median)}</p>
                  </StepCard>

                  <StepCard title="3. Variance and Standard Deviation (Sample)">
                    <p>Variance ($s^2$) measures dispersion. It is the sum of squared differences from the mean, divided by $n - 1$.</p>
                    <div className="my-4 p-4 bg-slate-50 rounded-lg overflow-x-auto">
                       <BlockMath math="s^2 = \frac{\sum (x_i - \bar{x})^2}{n - 1}" />
                       <BlockMath math={`s^2 = \\frac{${toFixed(result.sumOfSquaresSample)}}{${result.count} - 1} = ${toFixed(result.varianceSample)}`} />
                    </div>
                    <p>Standard Deviation ($s$) is the square root of the variance.</p>
                    <div className="my-4 p-4 bg-slate-50 rounded-lg overflow-x-auto">
                       <BlockMath math="s = \sqrt{s^2}" />
                       <BlockMath math={`s = \\sqrt{${toFixed(result.varianceSample)}} = ${toFixed(result.stdDevSample)}`} />
                    </div>
                  </StepCard>

                  {result.kurtosis !== null && result.skewness !== null && (
                    <StepCard title="4. Advanced Skewness & Kurtosis">
                      <p>Skewness indicates asymmetry. Kurtosis (excess) measures the &quot;tailedness&quot; compared to a normal distribution.</p>
                       <div className="my-4 p-4 bg-slate-50 rounded-lg">
                         <span className="font-semibold block mb-2">Skewness: {result.skewness.toFixed(4)}</span>
                         <span className="font-semibold block">Kurtosis: {result.kurtosis.toFixed(4)}</span>
                       </div>
                    </StepCard>
                  )}
               </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle, highlight = false }: { title: string; value: string | number; subtitle?: string; highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border ${highlight ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-200'}`}>
      <h4 className={`text-xs font-semibold uppercase tracking-wider mb-1 ${highlight ? 'text-blue-700' : 'text-slate-500'}`}>{title}</h4>
      <div className={`text-xl font-bold ${highlight ? 'text-blue-900' : 'text-slate-800'}`}>{value}</div>
      {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
    </div>
  );
}

function StepCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-slate-200 rounded-xl p-6">
      <h4 className="font-bold text-lg text-slate-800 mb-3">{title}</h4>
      {children}
    </div>
  )
}
