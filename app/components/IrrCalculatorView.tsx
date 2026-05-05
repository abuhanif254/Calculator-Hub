"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";

export function IrrCalculatorView({ calcDef }: { calcDef?: CalculatorDef }) {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [cashFlows, setCashFlows] = useState<number[]>([2000, 3000, 4000, 5000]);
  
  // Results
  const [irr, setIrr] = useState<number>(0);
  const [npv, setNpv] = useState<number>(0);
  const [totalReturn, setTotalReturn] = useState<number>(0);
  const [isCalculable, setIsCalculable] = useState<boolean>(true);
  
  const discountRate = 0.10; // Fixed at 10% for NPV illustrative purposes or can be adjustable

  useEffect(() => {
    function calculate() {
      // Create full array of cash flows [ -initial, plus flows... ]
      const flows = [-Math.abs(initialInvestment), ...cashFlows];
      
      let irrValue = 0;
      let calculatedNpv = 0;
      let sumReturns = 0;

      // NPV Calculation
      flows.forEach((flow, i) => {
        calculatedNpv += flow / Math.pow(1 + discountRate, i);
      });

      setNpv(calculatedNpv);

      // IRR Calculation - using Newton-Raphson approximation
      const maxIterations = 1000;
      let precision = 0.00001;
      let guess = 0.1;
      let found = false;

      for (let i = 0; i < maxIterations; i++) {
        let npvGuess = 0;
        let derivativeNpv = 0;

        for (let j = 0; j < flows.length; j++) {
          npvGuess += flows[j] / Math.pow(1 + guess, j);
          if (j > 0) {
            derivativeNpv -= (j * flows[j]) / Math.pow(1 + guess, j + 1);
          }
        }

        const nextGuess = guess - (npvGuess / derivativeNpv);

        if (Math.abs(nextGuess - guess) < precision) {
          irrValue = nextGuess;
          found = true;
          break;
        }

        guess = nextGuess;
      }

      setIsCalculable(found);
      
      if (found) {
        setIrr(irrValue * 100);
      } else {
        setIrr(0);
      }

      cashFlows.forEach(cf => { sumReturns += cf; });
      setTotalReturn(sumReturns);
    }
    
    calculate();
  }, [initialInvestment, cashFlows]);

  const addYear = () => {
    setCashFlows([...cashFlows, 0]);
  };

  const removeYear = (index: number) => {
    if (cashFlows.length > 1) {
      const newFlows = [...cashFlows];
      newFlows.splice(index, 1);
      setCashFlows(newFlows);
    }
  };

  const updateCashFlow = (index: number, value: number) => {
    const newFlows = [...cashFlows];
    newFlows[index] = value;
    setCashFlows(newFlows);
  };

  const chartData = [
    { year: 0, flow: -Math.abs(initialInvestment), cumulative: -Math.abs(initialInvestment) }
  ];
  
  let currentCumulative = -Math.abs(initialInvestment);
  cashFlows.forEach((flow, i) => {
    currentCumulative += flow;
    chartData.push({
      year: i + 1,
      flow: flow,
      cumulative: currentCumulative
    });
  });

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="p-6 md:p-10 border-b xl:border-b-0 xl:border-r border-slate-100 bg-slate-50/50">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Investment Cash Flows</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Initial Investment (Year 0)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <span className="text-slate-400 font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    value={initialInvestment === 0 ? '' : initialInvestment}
                    onChange={(e) => setInitialInvestment(Math.abs(Number(e.target.value)))}
                    className="w-full ps-8 pe-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm text-slate-700 font-medium font-mono"
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1">This is a cash outflow (-)</p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-sm font-semibold text-slate-700">Future Cash Flows</label>
                </div>
                <div className="space-y-3">
                  {cashFlows.map((flow, index) => (
                    <div key={index} className="flex gap-3 items-center">
                      <div className="bg-slate-200 text-slate-600 font-bold px-3 py-3 rounded-lg text-sm w-20 text-center whitespace-nowrap">
                        Year {index + 1}
                      </div>
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                          <span className="text-slate-400 font-medium">$</span>
                        </div>
                        <input
                          type="number"
                          value={flow === 0 ? '' : flow}
                          onChange={(e) => updateCashFlow(index, Number(e.target.value))}
                          className="w-full ps-8 pe-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm text-slate-700 font-medium font-mono"
                        />
                      </div>
                      <button 
                        onClick={() => removeYear(index)}
                        disabled={cashFlows.length <= 1}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl disabled:opacity-30 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
                <button 
                  onClick={addYear}
                  className="mt-4 w-full py-3 border-2 border-dashed border-slate-200 text-slate-500 font-bold rounded-xl hover:border-emerald-500 hover:text-emerald-600 transition-colors bg-white"
                >
                  + Add Year
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results Display */}
        <div className="p-6 md:p-10 bg-white">
          <div className="h-full flex flex-col space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100 col-span-2 shadow-sm">
                <p className="text-sm font-semibold text-emerald-600/80 mb-1">Internal Rate of Return (IRR)</p>
                {isCalculable ? (
                    <div className="text-4xl font-extrabold text-emerald-700 tracking-tight font-mono">
                      {irr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                    </div>
                ) : (
                    <div className="text-xl font-bold text-red-500">
                      Cannot calculate
                    </div>
                )}
                <p className="text-xs text-emerald-600/70 mt-2 font-medium">The annualized effective compounded return rate.</p>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-sm font-semibold text-slate-500 mb-1">Total Cash Inflows</p>
                <div className="text-2xl font-bold text-slate-800 tracking-tight font-mono">
                  ${totalReturn.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-sm font-semibold text-slate-500 mb-1">Net Cash Profit</p>
                <div className={`text-2xl font-bold tracking-tight font-mono ${(totalReturn - initialInvestment) >= 0 ? 'text-slate-800' : 'text-red-600'}`}>
                  ${(totalReturn - initialInvestment).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>

            {/* Dynamic Visualization */}
            <div className="flex-1 mt-6 relative min-h-[250px] border border-slate-100 rounded-2xl p-4 bg-slate-50/30">
              <h3 className="text-sm font-bold text-slate-600 mb-4 px-2">Cumulative Cash Flow (Breakeven Analysis)</h3>
              <div className="absolute inset-0 top-12 left-4 right-4 bottom-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                        dataKey="year" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        tickFormatter={(value) => `Yr ${value}`}
                        dy={10}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        tickFormatter={(value) => `$${value >= 1000 || value <= -1000 ? (value/1000).toFixed(0) + 'k' : value}`}
                        dx={-10}
                    />
                    <RechartsTooltip 
                        formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Cumulative']}
                        labelFormatter={(value) => `Year ${value}`}
                        contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="cumulative" 
                        stroke="#10b981" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorCumulative)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
