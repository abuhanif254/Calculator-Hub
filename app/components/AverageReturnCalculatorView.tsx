"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { TrendingUp, Plus, Trash2, ArrowRight, BarChart3, Calculator } from "lucide-react";

interface AverageReturnCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function AverageReturnCalculatorView({ calcDef }: AverageReturnCalculatorViewProps) {
  const [activeTab, setActiveTab] = useState<"sequence" | "cagr">("sequence");

  // State for Sequence Calculation
  const [returns, setReturns] = useState<string[]>(["10", "-5", "20", "15"]);
  const [arithmeticMean, setArithmeticMean] = useState<number | null>(null);
  const [geometricMean, setGeometricMean] = useState<number | null>(null);

  // State for Absolute Values (CAGR)
  const [initialValue, setInitialValue] = useState("10000");
  const [finalValue, setFinalValue] = useState("15000");
  const [years, setYears] = useState("5");
  const [cagrResult, setCagrResult] = useState<number | null>(null);
  const [totalReturn, setTotalReturn] = useState<number | null>(null);

  // Auto-calculate
  useEffect(() => {
    if (activeTab === "sequence") {
      calculateSequence();
    } else {
      calculateCagr();
    }
  }, [returns, initialValue, finalValue, years, activeTab]);

  const updateReturn = (index: number, value: string) => {
    const newReturns = [...returns];
    newReturns[index] = value;
    setReturns(newReturns);
  };

  const addReturnField = () => {
    setReturns([...returns, "0"]);
  };

  const removeReturnField = (index: number) => {
    if (returns.length > 1) {
      const newReturns = returns.filter((_, i) => i !== index);
      setReturns(newReturns);
    }
  };

  const calculateSequence = () => {
    const validReturns = returns.map(r => parseFloat(r)).filter(r => !isNaN(r));

    if (validReturns.length === 0) {
      setArithmeticMean(null);
      setGeometricMean(null);
      return;
    }

    // Arithmetic
    const sum = validReturns.reduce((acc, val) => acc + val, 0);
    setArithmeticMean(sum / validReturns.length);

    // Geometric
    let product = 1;
    let validGeometric = true;
    validReturns.forEach(r => {
      const multiplier = 1 + r / 100;
      if (multiplier < 0) validGeometric = false;
      product *= multiplier;
    });

    if (product < 0 || !validGeometric) {
      setGeometricMean(NaN); 
    } else {
      const geo = (Math.pow(product, 1 / validReturns.length) - 1) * 100;
      setGeometricMean(geo);
    }
  };

  const calculateCagr = () => {
    const iv = parseFloat(initialValue);
    const fv = parseFloat(finalValue);
    const y = parseFloat(years);

    if (!isNaN(iv) && !isNaN(fv) && !isNaN(y) && iv !== 0 && y > 0) {
      // CAGR
      let cagr = 0;
      if (iv > 0 && fv >= 0) {
        cagr = (Math.pow(fv / iv, 1 / y) - 1) * 100;
      }
      setCagrResult(cagr);

      // Total ROI
      const total = ((fv - iv) / Math.abs(iv)) * 100;
      setTotalReturn(total);
    } else {
      setCagrResult(null);
      setTotalReturn(null);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-inner">
            <TrendingUp size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
            <p className="text-slate-500 text-sm">Calculate average investment performance</p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex p-1 bg-slate-200/50 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setActiveTab("sequence")}
            className={`flex-1 md:flex-none px-4 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === "sequence" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Periodic Returns
          </button>
          <button
            onClick={() => setActiveTab("cagr")}
            className={`flex-1 md:flex-none px-4 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === "cagr" ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Start & End Value
          </button>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {activeTab === "sequence" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Inputs */}
              <div>
                <p className="text-sm text-slate-500 mb-6 font-medium">Enter your periodic returns (e.g., annual returns as %)</p>
                <div className="space-y-4 mb-6 relative">
                  {returns.map((ret, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs shrink-0">
                        {index + 1}
                      </div>
                      <div className="relative flex-1">
                        <input
                          type="number"
                          step="any"
                          value={ret}
                          onChange={(e) => updateReturn(index, e.target.value)}
                          className="w-full h-12 pl-4 pr-10 text-lg font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g. 10"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                      </div>
                      <button
                        onClick={() => removeReturnField(index)}
                        disabled={returns.length === 1}
                        className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors ${
                          returns.length === 1 ? "text-slate-300 cursor-not-allowed" : "text-red-400 hover:bg-red-50 hover:text-red-600"
                        }`}
                        title="Remove period"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))}
                  
                  <div className="pt-2">
                     <button
                        onClick={addReturnField}
                        className="w-full h-14 flex items-center justify-center gap-2 border-2 border-dashed border-slate-300 text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-semibold"
                      >
                        <Plus size={20} />
                        Add Period
                      </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Results */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <BarChart3 className="text-blue-600" />
                  Average Results
                </h3>
                
                <div className="space-y-6">
                  {/* Geometric Result */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 border-l-4 border-l-emerald-500">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Geometric Mean (CAGR)</p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-extrabold text-slate-900">
                        {geometricMean !== null && !isNaN(geometricMean) ? geometricMean.toFixed(2) : "--"}
                      </span>
                      <span className="text-xl font-bold text-slate-400 mb-1">%</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">The true compounded rate of return.</p>
                  </div>

                  {/* Arithmetic Result */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                     <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Arithmetic Mean</p>
                     <div className="flex items-end gap-2">
                      <span className="text-3xl font-extrabold text-slate-700">
                         {arithmeticMean !== null ? arithmeticMean.toFixed(2) : "--"}
                      </span>
                      <span className="text-lg font-bold text-slate-400 mb-1">%</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Simple average (ignores compounding).</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cagr" && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Inputs */}
              <div className="space-y-5">
                 <p className="text-sm text-slate-500 mb-2 font-medium">Calculate CAGR from values directly</p>
                 
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Initial Value (Start)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                      <input 
                        type="number"
                        step="any"
                        value={initialValue}
                        onChange={(e) => setInitialValue(e.target.value)}
                        className="w-full h-14 pl-8 pr-4 text-xl font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                        placeholder="10000"
                      />
                    </div>
                 </div>

                 <div className="flex justify-center -my-2 relative z-10 text-slate-300 pointer-events-none">
                    <ArrowRight size={24} className="rotate-90" />
                 </div>

                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Final Value (End)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                      <input 
                        type="number"
                        step="any"
                        value={finalValue}
                        onChange={(e) => setFinalValue(e.target.value)}
                        className="w-full h-14 pl-8 pr-4 text-xl font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                        placeholder="15000"
                      />
                    </div>
                 </div>

                 <div className="pt-2">
                    <label className="block text-sm font-bold text-slate-700 mb-1">Time Period (Years)</label>
                    <div className="relative">
                      <input 
                        type="number"
                        step="any"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        className="w-full h-14 pl-4 pr-16 text-xl font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                        placeholder="5"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">Years</span>
                    </div>
                 </div>
              </div>

              {/* Right Column: Results */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 h-fit">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Calculator className="text-blue-600" />
                  Growth Results
                </h3>
                
                <div className="space-y-6">
                  {/* CAGR Result */}
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-emerald-100 border-l-4 border-l-emerald-500">
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Compound Annual Growth Rate</p>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-extrabold text-slate-900">
                        {cagrResult !== null ? cagrResult.toFixed(2) : "--"}
                      </span>
                      <span className="text-xl font-bold text-slate-400 mb-1">%</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Annualized average rate.</p>
                  </div>

                  {/* Total ROI */ }
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                     <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Total Return (ROI)</p>
                     <div className="flex items-end gap-2">
                      <span className={`text-3xl font-extrabold ${totalReturn && totalReturn > 0 ? "text-emerald-600" : totalReturn && totalReturn < 0 ? "text-red-500" : "text-slate-700"}`}>
                         {totalReturn !== null ? (totalReturn > 0 ? "+" : "") + totalReturn.toFixed(2) : "--"}
                      </span>
                      <span className="text-lg font-bold text-slate-400 mb-1">%</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">Overall absolute percentage change.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
