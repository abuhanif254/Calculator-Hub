"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface InflationCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function InflationCalculatorView({ calcDef }: InflationCalculatorViewProps) {
  const t = useTranslations("InflationCalculator");
  
  const [startingAmount, setStartingAmount] = useState<number>(10000);
  const [inflationRate, setInflationRate] = useState<number>(3.0);
  const [years, setYears] = useState<number>(20);
  
  const [results, setResults] = useState<{ 
    futureCost: number; 
    purchasingPower: number; 
    cumulativeInflation: number;
    chartData: any[];
  } | null>(null);

  const calculate = () => {
    if (startingAmount < 0 || years <= 0) {
      setResults({ futureCost: 0, purchasingPower: 0, cumulativeInflation: 0, chartData: [] });
      return;
    }

    const r = inflationRate / 100;
    let chartData = [];
    
    // Future cost factor (compounding up)
    const futureCost = startingAmount * Math.pow(1 + r, years);
    
    // Purchasing power (decaying down)
    const purchasingPower = startingAmount / Math.pow(1 + r, years);
    
    const cumulativeInflation = ((futureCost - startingAmount) / startingAmount) * 100;

    for (let yr = 0; yr <= years; yr++) {
      chartData.push({
        year: yr,
        cost: Math.round(startingAmount * Math.pow(1 + r, yr)),
        power: Math.round(startingAmount / Math.pow(1 + r, yr))
      });
    }

    setResults({
      futureCost,
      purchasingPower,
      cumulativeInflation,
      chartData
    });
  };

  useEffect(() => {
    calculate();
  }, []);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("startingAmount")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={startingAmount === 0 ? "" : startingAmount}
                onChange={(e) => setStartingAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("inflationRate")}</label>
            <div className="relative">
              <input 
                type="number"
                step="0.1"
                value={inflationRate === 0 ? "" : inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-full pr-8 pl-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("years")}</label>
            <input 
              type="number"
              value={years === 0 ? "" : years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>

          <button onClick={calculate} className="w-full mt-6 h-14 text-lg font-bold rounded-xl bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-600/20 transition-colors">
            {t("calculateButton")}
          </button>
        </div>

        <div className="md:col-span-8 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col border border-slate-100">
          {!results || startingAmount === 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-400 font-medium text-lg text-center h-full min-h-[300px]">
              Fill out the fields to view<br/>the inflation projection
            </div>
          ) : (
            <div className="w-full space-y-8 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">{t("resultsTitle")}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm md:col-span-2 lg:col-span-1">
                  <div className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">{t("futureCostTitle")}</div>
                  <div className="text-3xl font-extrabold text-slate-900">
                    ${results.futureCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-orange-100 shadow-sm md:col-span-2 lg:col-span-1">
                  <div className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1">{t("purchasingPowerTitle")}</div>
                  <div className="text-3xl font-extrabold text-slate-700">
                    ${results.purchasingPower.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm md:col-span-2 lg:col-span-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("cumulativeInflationTitle")}</div>
                  <div className="text-3xl font-bold text-red-500">
                    {results.cumulativeInflation.toLocaleString(undefined, { maximumFractionDigits: 1 })}%
                  </div>
                </div>
              </div>
              
              <div className="flex-1 min-h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPower" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      tickFormatter={(val) => `Yr ${val}`}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      tickFormatter={(val) => `$${val >= 1000000 ? (val / 1000000).toFixed(1) + 'M' : val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val}`}
                      width={60}
                    />
                    <Tooltip 
                      formatter={(value: any, name: any) => [
                        `$${Number(value).toLocaleString()}`, 
                        String(name) === 'cost' ? t("futureCost") : t("purchasingPower")
                      ]}
                      labelFormatter={(label) => `Year: ${label}`}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="cost" stroke="#dc2626" strokeWidth={3} fillOpacity={1} fill="url(#colorCost)" name="cost" />
                    <Area type="monotone" dataKey="power" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorPower)" name="power" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
