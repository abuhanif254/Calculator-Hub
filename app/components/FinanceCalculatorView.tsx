"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FinanceCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function FinanceCalculatorView({ calcDef }: FinanceCalculatorViewProps) {
  const t = useTranslations("FinanceCalculator");
  
  const [presentValue, setPresentValue] = useState<number>(10000);
  const [annualPayment, setAnnualPayment] = useState<number>(1200);
  const [interestRate, setInterestRate] = useState<number>(6.0);
  const [years, setYears] = useState<number>(15);
  
  const [results, setResults] = useState<{ 
    futureValue: number; 
    totalInvested: number; 
    totalInterest: number;
    chartData: any[];
  } | null>(null);

  const calculate = () => {
    if (presentValue < 0 || years <= 0) {
      setResults({ futureValue: 0, totalInvested: 0, totalInterest: 0, chartData: [] });
      return;
    }

    const r = interestRate / 100;
    let chartData = [];
    
    let currentBalance = presentValue;
    let currentInvested = presentValue;

    chartData.push({
      year: 0,
      balance: Math.round(currentBalance),
      invested: Math.round(currentInvested)
    });

    for (let yr = 1; yr <= years; yr++) {
      currentBalance = currentBalance * (1 + r) + annualPayment;
      currentInvested += annualPayment;
      
      chartData.push({
        year: yr,
        balance: Math.round(currentBalance),
        invested: Math.round(currentInvested)
      });
    }

    setResults({
      futureValue: currentBalance,
      totalInvested: currentInvested,
      totalInterest: currentBalance - currentInvested,
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
            <label className="text-sm font-semibold text-slate-700">{t("presentValue")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={presentValue === 0 ? "" : presentValue}
                onChange={(e) => setPresentValue(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("annualPayment")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={annualPayment === 0 ? "" : annualPayment}
                onChange={(e) => setAnnualPayment(Number(e.target.value))}
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
          </div>

          <button onClick={calculate} className="w-full mt-6 h-14 text-lg font-bold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 transition-colors">
            {t("calculateButton")}
          </button>
        </div>

        <div className="md:col-span-8 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col border border-slate-100">
          {!results || presentValue < 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-400 font-medium text-lg text-center h-full min-h-[300px]">
              Fill out the parameters to view<br/>your financial projection
            </div>
          ) : (
            <div className="w-full space-y-8 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">{t("resultsTitle")}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm md:col-span-3">
                  <div className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">{t("futureValue")}</div>
                  <div className="text-4xl md:text-5xl font-extrabold text-slate-900">
                    ${results.futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("totalInvested")}</div>
                  <div className="text-2xl font-bold text-slate-700">
                    ${results.totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("totalInterest")}</div>
                  <div className="text-2xl font-bold text-indigo-500">
                    +${results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 min-h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
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
                        String(name) === 'balance' ? t("futureValue") : t("totalInvested")
                      ]}
                      labelFormatter={(label) => `Year: ${label}`}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="invested" stroke="#94a3b8" strokeWidth={2} fillOpacity={1} fill="url(#colorInvested)" name="invested" stackId="2" />
                    <Area type="monotone" dataKey="balance" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" name="balance" stackId="1" />
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
