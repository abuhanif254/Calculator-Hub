"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

interface IncomeTaxCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function IncomeTaxCalculatorView({ calcDef }: IncomeTaxCalculatorViewProps) {
  const t = useTranslations("IncomeTaxCalculator");
  
  const [grossIncome, setGrossIncome] = useState<number>(75000);
  const [nationalTaxRate, setNationalTaxRate] = useState<number>(15);
  const [localTaxRate, setLocalTaxRate] = useState<number>(5);
  const [deductions, setDeductions] = useState<number>(12000);
  
  const [results, setResults] = useState<{ 
    taxableIncome: number; 
    nationalTax: number;
    localTax: number;
    totalTax: number;
    netIncome: number;
    effectiveTaxRate: number;
    chartData: any[];
  } | null>(null);

  const calculate = () => {
    if (grossIncome < 0) return;

    let taxableIncome = grossIncome - deductions;
    if (taxableIncome < 0) taxableIncome = 0;

    const natTax = taxableIncome * (nationalTaxRate / 100);
    const locTax = taxableIncome * (localTaxRate / 100);
    const totalTax = natTax + locTax;
    const netIncome = grossIncome - totalTax;
    
    let effectiveTaxRate = 0;
    if (grossIncome > 0) {
      effectiveTaxRate = (totalTax / grossIncome) * 100;
    }

    const chartData = [
      { name: 'Net Income', value: Math.round(netIncome), color: '#10b981' },
      { name: 'National Tax', value: Math.round(natTax), color: '#f43f5e' },
      { name: 'Local Tax', value: Math.round(locTax), color: '#f97316' }
    ].filter(item => item.value > 0);

    setResults({
      taxableIncome,
      nationalTax: natTax,
      localTax: locTax,
      totalTax,
      netIncome,
      effectiveTaxRate,
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
        <div className="md:col-span-5 flex flex-col space-y-6">
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("grossIncome")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={grossIncome === 0 ? "" : grossIncome}
                onChange={(e) => setGrossIncome(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm font-medium text-slate-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("deductions")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={deductions === 0 ? "" : deductions}
                onChange={(e) => setDeductions(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("nationalTaxRate")}</label>
              <div className="relative">
                <input 
                  type="number"
                  step="0.1"
                  value={nationalTaxRate === 0 ? "" : nationalTaxRate}
                  onChange={(e) => setNationalTaxRate(Number(e.target.value))}
                  className="w-full pr-8 pl-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all shadow-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("localTaxRate")}</label>
              <div className="relative">
                <input 
                  type="number"
                  step="0.1"
                  value={localTaxRate === 0 ? "" : localTaxRate}
                  onChange={(e) => setLocalTaxRate(Number(e.target.value))}
                  className="w-full pr-8 pl-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all shadow-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
              </div>
            </div>
          </div>

          <button onClick={calculate} className="w-full mt-4 h-14 text-lg font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/20 transition-colors">
            {t("calculateButton")}
          </button>
        </div>

        <div className="md:col-span-7 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col border border-slate-100">
          {!results || grossIncome === 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-400 font-medium text-lg text-center min-h-[300px]">
              Enter your income and rates to see<br/>your detailed tax breakdown.
            </div>
          ) : (
            <div className="w-full space-y-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">{t("resultsTitle")}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm col-span-2">
                  <div className="text-sm font-bold text-emerald-600 uppercase tracking-widest mb-1">{t("netIncome")}</div>
                  <div className="text-4xl md:text-5xl font-extrabold text-slate-900">
                    ${results.netIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("totalTax")}</div>
                  <div className="text-2xl font-bold text-rose-500">
                    ${results.totalTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("effectiveTaxRate")}</div>
                  <div className="text-2xl font-bold text-slate-700">
                    {results.effectiveTaxRate.toFixed(1)}%
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                 <div className="font-medium text-slate-600">{t("taxableIncome")}</div>
                 <div className="font-bold text-slate-800">${results.taxableIncome.toLocaleString()}</div>
              </div>

              {results.chartData.length > 0 && (
                <div className="flex-1 min-h-[250px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={results.chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {results.chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        formatter={(value: any) => `$${Number(value).toLocaleString()}`}
                        contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
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
