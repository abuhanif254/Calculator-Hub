"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PaymentCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function PaymentCalculatorView({ calcDef }: PaymentCalculatorViewProps) {
  const t = useTranslations("PaymentCalculator");
  
  const [loanAmount, setLoanAmount] = useState<number>(20000);
  const [rate, setRate] = useState<number>(6.5);
  const [term, setTerm] = useState<number>(5);
  const [termUnit, setTermUnit] = useState<"years" | "months">("years");
  
  const [results, setResults] = useState<{ monthlyPayment: number; totalInterest: number; totalPaid: number; chartData: any[] } | null>(null);

  const calculate = () => {
    if (loanAmount <= 0) {
      setResults(null);
      return;
    }

    const principal = loanAmount;
    const r = rate / 100 / 12;
    const n = termUnit === "years" ? term * 12 : term;
    
    let monthly = 0;
    if (r === 0) {
      monthly = principal / n;
    } else {
      monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPaidSum = monthly * n;
    const totalInterestSum = totalPaidSum - principal;

    const chartData = [
      { name: "Principal", value: principal, color: "#3b82f6" },
      { name: t("totalInterest"), value: totalInterestSum, color: "#f43f5e" }
    ];

    setResults({
      monthlyPayment: monthly,
      totalInterest: totalInterestSum,
      totalPaid: totalPaidSum,
      chartData
    });
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5 flex flex-col space-y-6">
          <div className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("loanAmount")}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                <input 
                  type="number"
                  value={loanAmount || ""}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm font-medium text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("interestRate")}</label>
              <div className="relative">
                <input 
                  type="number"
                  step="0.01"
                  value={rate || ""}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full pr-8 pl-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm font-medium text-slate-800"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("loanTerm")}</label>
              <div className="flex space-x-2">
                <input 
                  type="number"
                  value={term || ""}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-2/3 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm font-medium text-slate-800"
                />
                <select 
                  value={termUnit} 
                  onChange={(e) => setTermUnit(e.target.value as "years" | "months")}
                  className="w-1/3 px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium cursor-pointer"
                >
                  <option value="years">{t("years")}</option>
                  <option value="months">{t("months")}</option>
                </select>
              </div>
            </div>
          </div>

          <button onClick={calculate} className="w-full h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-colors">
            {t("calculateButton")}
          </button>
        </div>

        <div className="md:col-span-7 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col border border-slate-100">
          {!results ? (
            <div className="flex-1 flex items-center justify-center text-slate-400 font-medium text-lg text-center min-h-[300px]">
              Enter loan details to view your<br/>monthly payment and interest breakdown
            </div>
          ) : (
            <div className="w-full flex-1 flex flex-col space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-blue-100 shadow-sm col-span-2 text-center">
                  <div className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">{t("monthlyPayment")}</div>
                  <div className="text-5xl font-extrabold text-slate-900">
                    ${results.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-xs font-semibold text-rose-500 uppercase tracking-widest mb-1">{t("totalInterest")}</div>
                  <div className="text-2xl font-bold text-rose-500">
                    ${results.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("totalPaid")}</div>
                  <div className="text-2xl font-bold text-slate-700">
                    ${results.totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              </div>

              <div className="flex-1 min-h-[250px] w-full mt-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={results.chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {results.chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => `$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
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
