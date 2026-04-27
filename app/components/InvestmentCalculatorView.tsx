"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface InvestmentCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function InvestmentCalculatorView({ calcDef }: InvestmentCalculatorViewProps) {
  const t = useTranslations("InvestmentCalculator");
  
  const [startingAmount, setStartingAmount] = useState<number>(10000);
  const [additionalContribution, setAdditionalContribution] = useState<number>(500);
  const [contributionFrequency, setContributionFrequency] = useState<string>("monthly");
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [yearsToGrow, setYearsToGrow] = useState<number>(20);
  
  const [results, setResults] = useState<{ 
    endBalance: number; 
    totalContributions: number; 
    totalInterest: number;
    chartData: any[];
  } | null>(null);

  const calculate = () => {
    if (startingAmount < 0 || yearsToGrow <= 0) {
      setResults({ endBalance: 0, totalContributions: 0, totalInterest: 0, chartData: [] });
      return;
    }

    const r = annualReturn / 100;
    let chartData = [];
    let currentBalance = startingAmount;
    let totalContribs = startingAmount;

    chartData.push({
      year: 0,
      balance: Math.round(currentBalance)
    });

    for (let yr = 1; yr <= yearsToGrow; yr++) {
      if (contributionFrequency === "monthly") {
        const monthlyRate = r / 12;
        for (let m = 1; m <= 12; m++) {
          currentBalance = currentBalance * (1 + monthlyRate) + additionalContribution;
          totalContribs += additionalContribution;
        }
      } else { // annually
        currentBalance = currentBalance * (1 + r) + additionalContribution;
        totalContribs += additionalContribution;
      }
      
      chartData.push({
        year: yr,
        balance: Math.round(currentBalance)
      });
    }

    setResults({
      endBalance: currentBalance,
      totalContributions: totalContribs,
      totalInterest: currentBalance - totalContribs,
      chartData
    });
  };

  useEffect(() => {
    calculate();
  }, []); // Run on initial mount

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
            <label className="text-sm font-semibold text-slate-700">{t("additionalContribution")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={additionalContribution === 0 ? "" : additionalContribution}
                onChange={(e) => setAdditionalContribution(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("contributionFrequency")}</label>
            <select 
              value={contributionFrequency}
              onChange={(e) => setContributionFrequency(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700"
            >
              <option value="monthly">{t("monthly")}</option>
              <option value="annually">{t("annually")}</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">{t("expectedReturn")}</label>
              <div className="relative">
                <input 
                  type="number"
                  step="0.1"
                  value={annualReturn === 0 ? "" : annualReturn}
                  onChange={(e) => setAnnualReturn(Number(e.target.value))}
                  className="w-full pr-8 pl-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("yearsToGrow")}</label>
              <input 
                type="number"
                value={yearsToGrow === 0 ? "" : yearsToGrow}
                onChange={(e) => setYearsToGrow(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <button onClick={calculate} className="w-full mt-4 h-14 text-lg font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20 transition-colors">
            {t("calculateButton")}
          </button>
        </div>

        <div className="md:col-span-8 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col border border-slate-100">
          {!results || results.endBalance === 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-400 font-medium text-lg text-center h-full min-h-[300px]">
              Fill out the fields to view<br/>your investment projection
            </div>
          ) : (
            <div className="w-full space-y-8 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">{t("resultsTitle")}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm md:col-span-3">
                  <div className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-1">{t("endBalance")}</div>
                  <div className="text-4xl md:text-5xl font-extrabold text-slate-900">
                    ${results.endBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("totalContributions")}</div>
                  <div className="text-2xl font-bold text-slate-700">
                    ${results.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("totalInterest")}</div>
                  <div className="text-2xl font-bold text-purple-600">
                    +${results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 min-h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
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
                      formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Balance']}
                      labelFormatter={(label) => `Year: ${label}`}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="balance" stroke="#9333ea" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
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
