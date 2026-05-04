"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface RothIraCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function RothIraCalculatorView({ calcDef }: RothIraCalculatorViewProps) {
  const t = useTranslations("RothIraCalculator");
  
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [expectedRetirementAge, setExpectedRetirementAge] = useState<number>(65);
  const [currentBalance, setCurrentBalance] = useState<number>(10000);
  const [annualContribution, setAnnualContribution] = useState<number>(6000);
  const [expectedReturn, setExpectedReturn] = useState<number>(7);
  
  const [results, setResults] = useState<{ 
    endBalance: number; 
    totalContributions: number; 
    totalInterest: number;
    chartData: any[];
  } | null>(null);

  const calculate = () => {
    if (currentAge < 0 || expectedRetirementAge <= currentAge || currentBalance < 0 || expectedReturn < 0) {
      setResults({ endBalance: 0, totalContributions: 0, totalInterest: 0, chartData: [] });
      return;
    }

    const r = expectedReturn / 100;
    const years = expectedRetirementAge - currentAge;
    
    let balance = currentBalance;
    let totalContribs = currentBalance;

    for (let yr = 1; yr <= years; yr++) {
      balance = balance * (1 + r) + annualContribution;
      totalContribs += annualContribution;
    }

    const interest = balance - totalContribs;

    setResults({
      endBalance: balance,
      totalContributions: totalContribs,
      totalInterest: interest,
      chartData: [
        { name: t("contributions"), value: Math.round(totalContribs) },
        { name: t("interest"), value: Math.round(interest > 0 ? interest : 0) }
      ]
    });
  };

  useEffect(() => {
    calculate();
  }, [t]); // Run on initial mount or translation load

  const COLORS = ['#3b82f6', '#8b5cf6'];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 space-y-6">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("currentAge")}</label>
              <input 
                type="number"
                value={currentAge === 0 ? "" : currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">{t("expectedRetirementAge")}</label>
              <input 
                type="number"
                value={expectedRetirementAge === 0 ? "" : expectedRetirementAge}
                onChange={(e) => setExpectedRetirementAge(Number(e.target.value))}
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("currentBalance")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={currentBalance === 0 ? "" : currentBalance}
                onChange={(e) => setCurrentBalance(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("annualContribution")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={annualContribution === 0 ? "" : annualContribution}
                onChange={(e) => setAnnualContribution(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">{t("expectedReturn")}</label>
            <div className="relative">
              <input 
                type="number"
                step="0.1"
                value={expectedReturn === 0 ? "" : expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-full pr-8 pl-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
            </div>
          </div>

          <button onClick={calculate} className="w-full mt-4 h-14 text-lg font-bold rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/20 transition-colors">
            {t("calculateButton")}
          </button>
        </div>

        <div className="md:col-span-7 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col border border-slate-100">
          {!results || results.endBalance <= 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-400 font-medium text-lg text-center h-full min-h-[300px]">
              Fill out the fields to view<br/>your projection
            </div>
          ) : (
            <div className="w-full space-y-8 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">{t("resultsTitle")}</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl border border-purple-100 shadow-sm md:col-span-2 text-center md:text-left">
                  <div className="text-sm font-bold text-purple-600 uppercase tracking-widest mb-1">{t("endBalance")}</div>
                  <div className="text-4xl md:text-5xl font-extrabold text-slate-900">
                    ${results.endBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("totalContributions")}</div>
                  <div className="text-xl font-bold text-slate-700">
                    ${results.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("totalInterest")}</div>
                  <div className="text-xl font-bold text-purple-600">
                    +${results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 min-h-[300px] w-full mt-4 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%" className="-ml-3 mt-4 md:ml-0 md:mt-0">
                  <PieChart>
                    <Pie
                      data={results.chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {results.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => `$${Number(value).toLocaleString()}`}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
