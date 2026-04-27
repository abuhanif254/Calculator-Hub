"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

interface SalesTaxCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function SalesTaxCalculatorView({ calcDef }: SalesTaxCalculatorViewProps) {
  const t = useTranslations("SalesTaxCalculator");
  
  const [amount, setAmount] = useState<number>(100);
  const [taxRate, setTaxRate] = useState<number>(7.5);
  const [mode, setMode] = useState<"add" | "extract">("add");
  
  const [results, setResults] = useState<{ 
    netPrice: number;
    taxAmount: number;
    grossPrice: number;
    chartData: any[];
  } | null>(null);

  const calculate = () => {
    if (amount < 0 || taxRate < 0) return;

    let netPrice = 0;
    let taxAmount = 0;
    let grossPrice = 0;

    const rate = taxRate / 100;

    if (mode === "add") {
      // Amount is Net
      netPrice = amount;
      taxAmount = amount * rate;
      grossPrice = amount + taxAmount;
    } else {
      // Amount is Gross
      grossPrice = amount;
      netPrice = amount / (1 + rate);
      taxAmount = grossPrice - netPrice;
    }

    const chartData = [
      { name: t("netPrice"), value: Math.round(netPrice * 100) / 100, color: '#3b82f6' },
      { name: t("taxAmount"), value: Math.round(taxAmount * 100) / 100, color: '#f43f5e' }
    ].filter(item => item.value > 0);

    setResults({
      netPrice,
      taxAmount,
      grossPrice,
      chartData
    });
  };

  useEffect(() => {
    calculate();
  }, [amount, taxRate, mode]);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 flex flex-col space-y-6">
          
          <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("calculationMode")}</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-200/50 p-1 rounded-xl">
                <button
                  onClick={() => setMode("add")}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    mode === "add" 
                      ? "bg-white text-slate-800 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t("addTax")}
                </button>
                <button
                  onClick={() => setMode("extract")}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    mode === "extract" 
                      ? "bg-white text-slate-800 shadow-sm" 
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {t("extractTax")}
                </button>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-sm font-semibold text-slate-700">{t("amount")}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                <input 
                  type="number"
                  value={amount === 0 ? "" : amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm font-medium text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("taxRate")}</label>
              <div className="relative">
                <input 
                  type="number"
                  step="0.1"
                  value={taxRate === 0 ? "" : taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                  className="w-full pr-8 pl-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all shadow-sm font-medium text-slate-800"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
              </div>
            </div>

          </div>

          <button onClick={calculate} className="w-full h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-colors">
            {t("calculateButton")}
          </button>
        </div>

        <div className="md:col-span-7 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col border border-slate-100">
          {!results || amount === 0 ? (
            <div className="flex-1 flex items-center justify-center text-slate-400 font-medium text-lg text-center min-h-[300px]">
              Enter a base amount and tax rate<br/>to break down the pricing.
            </div>
          ) : (
            <div className="w-full space-y-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="font-bold text-slate-800">{t("resultsTitle")}</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm col-span-2">
                  <div className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">{t("grossPrice")}</div>
                  <div className="text-4xl md:text-5xl font-extrabold text-slate-900">
                    ${results.grossPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("netPrice")}</div>
                  <div className="text-2xl font-bold text-slate-700">
                    ${results.netPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1">{t("taxAmount")}</div>
                  <div className="text-2xl font-bold text-rose-500">
                    +${results.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              {results.chartData.length > 0 && (
                <div className="flex-1 min-h-[250px] w-full mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={results.chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={95}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {results.chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        formatter={(value: any) => `$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
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
