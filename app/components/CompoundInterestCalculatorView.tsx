"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface CompoundInterestCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function CompoundInterestCalculatorView({ calcDef }: CompoundInterestCalculatorViewProps) {
  const t = useTranslations("CompoundInterestCalculator");
  
  const [principal, setPrincipal] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [interestRate, setInterestRate] = useState<number>(7.0);
  const [years, setYears] = useState<number>(20);
  const [frequency, setFrequency] = useState<number>(12); // Default Monthly
  
  const [results, setResults] = useState<{ 
    futureValue: number; 
    totalPrincipal: number; 
    totalInterest: number;
    chartData: any[];
  } | null>(null);

  const calculate = () => {
    if (principal < 0 || years <= 0) return;

    const r = interestRate / 100;
    const n = frequency;
    
    // Convert nominal rate to Effective Annual Rate (EAR) based on compounding frequency
    const ear = Math.pow(1 + (r / n), n) - 1;
    
    // Deriving Effective Monthly Rate ensures smooth mathematical compounding alongside monthly PMT
    const monthlyRate = Math.pow(1 + ear, 1 / 12) - 1;

    let chartData = [];
    let currentBalance = principal;
    let currentPrincipal = principal;

    chartData.push({
      year: 0,
      principal: Math.round(currentPrincipal),
      interest: 0,
      balance: Math.round(currentBalance)
    });

    const totalMonths = years * 12;

    for (let m = 1; m <= totalMonths; m++) {
      const interestEarned = currentBalance * monthlyRate;
      currentBalance += interestEarned + monthlyContribution;
      currentPrincipal += monthlyContribution;

      // Snapshot at the end of each year for the chart
      if (m % 12 === 0) {
        chartData.push({
          year: m / 12,
          principal: Math.round(currentPrincipal),
          interest: Math.round(currentBalance - currentPrincipal),
          balance: Math.round(currentBalance)
        });
      }
    }

    setResults({
      futureValue: currentBalance,
      totalPrincipal: currentPrincipal,
      totalInterest: currentBalance - currentPrincipal,
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
            <label className="text-sm font-semibold text-slate-700">{t("principal")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={principal === 0 ? "" : principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("monthlyContribution")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={monthlyContribution === 0 ? "" : monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("interestRate")}</label>
              <div className="relative">
                <input 
                  type="number"
                  step="0.1"
                  value={interestRate === 0 ? "" : interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full pr-8 pl-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
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
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("compoundFrequency")}</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm font-medium text-slate-700"
            >
              <option value={1}>{t("freqAnnually")}</option>
              <option value={2}>{t("freqSemiAnnually")}</option>
              <option value={4}>{t("freqQuarterly")}</option>
              <option value={12}>{t("freqMonthly")}</option>
              <option value={365}>{t("freqDaily")}</option>
            </select>
          </div>

          <button onClick={calculate} className="w-full mt-6 h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-colors">
            {t("calculateButton")}
          </button>
        </div>

        <div className="md:col-span-8 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col border border-slate-100">
          {!results || principal < 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-400 font-medium text-lg text-center h-full min-h-[300px]">
              Fill out the parameters to view<br/>your compound growth
            </div>
          ) : (
            <div className="w-full space-y-8 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">{t("resultsTitle")}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm md:col-span-3">
                  <div className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">{t("futureValue")}</div>
                  <div className="text-4xl md:text-5xl font-extrabold text-slate-900">
                    ${results.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("totalPrincipal")}</div>
                  <div className="text-2xl font-bold text-slate-700">
                    ${results.totalPrincipal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-emerald-100 shadow-sm">
                  <div className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-1">{t("totalInterest")}</div>
                  <div className="text-2xl font-bold text-emerald-500">
                    +${results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 min-h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
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
                        String(name) === 'interest' ? t("totalInterest") : t("totalPrincipal")
                      ]}
                      labelFormatter={(label) => `Year: ${label}`}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="principal" stackId="1" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPrincipal)" name="principal" />
                    <Area type="monotone" dataKey="interest" stackId="1" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorInterest)" name="interest" />
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
