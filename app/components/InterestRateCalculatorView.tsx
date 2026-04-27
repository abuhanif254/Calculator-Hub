"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

interface InterestRateCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function InterestRateCalculatorView({ calcDef }: InterestRateCalculatorViewProps) {
  const t = useTranslations("InterestRateCalculator");
  
  const [principal, setPrincipal] = useState<number>(10000);
  const [targetValue, setTargetValue] = useState<number>(20000);
  const [years, setYears] = useState<number>(10);
  
  const [results, setResults] = useState<{ 
    requiredRate: number;
    totalInterest: number;
    chartData: any[];
    error: string | null;
  } | null>(null);

  const calculate = () => {
    if (principal <= 0 || targetValue <= 0 || years <= 0) return;

    if (targetValue <= principal) {
      setResults({
        requiredRate: 0,
        totalInterest: 0,
        chartData: [],
        error: t("errorMessage")
      });
      return;
    }

    // Formula to find compounding annual rate: Rate = (FV / PV)^(1/t) - 1
    const rawRate = Math.pow(targetValue / principal, 1 / years) - 1;
    const requiredRate = rawRate * 100;
    const totalInterest = targetValue - principal;

    let chartData = [];
    let currentBalance = principal;
    
    // Create a projection chart using the newly calculated required rate
    for (let yr = 0; yr <= years; yr++) {
      if (yr === 0) {
        chartData.push({
          year: yr,
          principal: Math.round(principal),
          interest: 0,
        });
      } else {
        currentBalance = currentBalance * (1 + rawRate);
        chartData.push({
          year: yr,
          principal: Math.round(principal),
          interest: Math.round(currentBalance - principal),
        });
      }
    }

    setResults({
      requiredRate,
      totalInterest,
      chartData,
      error: null
    });
  };

  useEffect(() => {
    calculate();
  }, [principal, targetValue, years]);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-6">
          
          <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("principal")}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                <input 
                  type="number"
                  value={principal === 0 ? "" : principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm font-medium text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("targetValue")}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                <input 
                  type="number"
                  value={targetValue === 0 ? "" : targetValue}
                  onChange={(e) => setTargetValue(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm font-medium text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("years")}</label>
              <input 
                type="number"
                value={years === 0 ? "" : years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all shadow-sm"
              />
            </div>
          </div>

        </div>

        <div className="md:col-span-8 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col border border-slate-100">
          {!results || principal <= 0 ? (
             <div className="flex-1 flex items-center justify-center text-slate-400 font-medium text-lg text-center min-h-[300px]">
               Enter your financial goals to find<br/>the required rate of return.
             </div>
          ) : results.error ? (
             <div className="flex-1 flex items-center justify-center text-rose-500 font-medium text-lg text-center min-h-[300px]">
               {results.error}
             </div>
          ) : (
            <div className="w-full space-y-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">{t("resultsTitle")}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm">
                  <div className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">{t("requiredRate")}</div>
                  <div className="text-4xl md:text-5xl font-extrabold text-slate-900">
                    {results.requiredRate.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}%
                  </div>
                </div>
                
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-sm font-semibold text-emerald-600 uppercase tracking-widest mb-1">{t("totalInterest")}</div>
                  <div className="text-3xl md:text-4xl font-bold text-slate-700">
                    ${results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>

              {results.chartData.length > 0 && (
                <div className="flex-1 min-h-[300px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={results.chartData}
                      margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                    >
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
                      <RechartsTooltip 
                        formatter={(value: any, name: any) => [
                          `$${Number(value).toLocaleString()}`, 
                          name === 'principal' ? 'Starting Principal' : 'Interest Earned'
                        ]}
                        labelFormatter={(label) => `Year: ${label}`}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{fill: '#f1f5f9'}}
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                      <Bar dataKey="principal" stackId="a" fill="#3b82f6" name="principal" radius={[0, 0, 4, 4]} />
                      <Bar dataKey="interest" stackId="a" fill="#10b981" name="interest" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
