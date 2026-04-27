"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface AmortizationCalculatorViewProps {
  calcDef: CalculatorDef;
}

interface ScheduleRow {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

export function AmortizationCalculatorView({ calcDef }: AmortizationCalculatorViewProps) {
  const t = useTranslations("AmortizationCalculator");
  
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [years, setYears] = useState<number>(30);
  const [months, setMonths] = useState<number>(0);

  const [results, setResults] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPaid: number;
    schedule: ScheduleRow[];
    chartData: any[];
  } | null>(null);

  const calculate = useMemo(() => () => {
    const principal = loanAmount;
    const totalMonths = (years * 12) + months;
    
    if (principal <= 0 || totalMonths <= 0 || interestRate <= 0) {
      setResults({ monthlyPayment: 0, totalInterest: 0, totalPaid: 0, schedule: [], chartData: [] });
      return;
    }

    const monthlyRate = (interestRate / 100) / 12;
    // M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
    const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1;
    const monthlyPayment = principal * (numerator / denominator);
    
    let currentBalance = principal;
    const schedule: ScheduleRow[] = [];
    const chartData: any[] = [];
    let totalInt = 0;

    chartData.push({ month: 0, balance: Math.round(principal) });

    for (let i = 1; i <= totalMonths; i++) {
        const interestPayment = currentBalance * monthlyRate;
        let principalPayment = monthlyPayment - interestPayment;
        
        // Adjust for floating point errors on final payment
        if (i === totalMonths) {
            principalPayment = currentBalance;
        }

        currentBalance -= principalPayment;
        if (currentBalance < 0) currentBalance = 0;

        totalInt += interestPayment;

        schedule.push({
            month: i,
            principal: principalPayment,
            interest: interestPayment,
            balance: currentBalance
        });

        if (i % 12 === 0 || i === totalMonths) {
            chartData.push({ month: i, year: Math.ceil(i/12), balance: Math.round(currentBalance) });
        }
    }

    setResults({
        monthlyPayment,
        totalInterest: totalInt,
        totalPaid: principal + totalInt,
        schedule,
        chartData
    });
  }, [loanAmount, interestRate, years, months]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("loanAmount")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={loanAmount || ""}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("interestRate")}</label>
            <div className="relative">
              <input 
                type="number"
                step="0.01"
                value={interestRate || ""}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full pr-8 pl-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("loanTerm")}</label>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input 
                  type="number"
                  value={years || ""}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full pr-16 pl-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">{t("years")}</span>
              </div>
              <div className="relative">
                <input 
                  type="number"
                  value={months || ""}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full pr-16 pl-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">{t("months")}</span>
              </div>
            </div>
          </div>
          
          <button 
            onClick={calculate} 
            className="w-full mt-4 h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-colors"
          >
            {t("calculateButton")}
          </button>
        </div>

        {/* Results & Schedule Column */}
        <div className="lg:col-span-8 flex flex-col space-y-8">
          
          {/* Summary Cards */}
          {results && results.totalPaid > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 shadow-sm md:col-span-3 lg:col-span-1">
                <div className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-1">{t("monthlyPayment")}</div>
                <div className="text-4xl font-extrabold text-slate-900">
                  ${results.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("totalInterest")}</div>
                <div className="text-2xl font-bold text-indigo-600">
                  ${results.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">{t("totalPaid")}</div>
                <div className="text-2xl font-bold text-slate-700">
                  ${results.totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 flex items-center justify-center min-h-[160px]">
              <div className="text-slate-400 font-medium text-lg text-center">
                Enter your loan details to view<br/>the complete schedule
              </div>
            </div>
          )}

          {/* Area Chart for Balance Over Time */}
          {results && results.chartData && results.chartData.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-6">
              <h3 className="font-bold text-slate-800 mb-6">Balance Over Time</h3>
              <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={results.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis 
                      dataKey={years > 3 ? "year" : "month"} 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      tickFormatter={(val) => years > 3 ? `Yr ${val}` : `Mo ${val}`}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      tickFormatter={(val) => `$${val >= 1000 ? (val / 1000).toFixed(0) + 'k' : val}`}
                      width={60}
                    />
                    <RechartsTooltip 
                      formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Remaining Balance']}
                      labelFormatter={(label) => years > 3 ? `Year ${label}` : `Month ${label}`}
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Area type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* Schedule Table */}
          {results && results.schedule.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
              <div className="p-4 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-800">{t("scheduleTitle")}</h3>
              </div>
              
              <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                <table className="w-full min-w-[500px] text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-white sticky top-0 shadow-sm z-10">
                    <tr>
                      <th className="px-6 py-4 font-bold tracking-wider">{t("month")}</th>
                      <th className="px-6 py-4 font-bold tracking-wider">{t("principal")}</th>
                      <th className="px-6 py-4 font-bold tracking-wider">{t("interest")}</th>
                      <th className="px-6 py-4 font-bold tracking-wider text-right">{t("balance")}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {results.schedule.map((row) => (
                      <tr key={row.month} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-600">{row.month}</td>
                        <td className="px-6 py-4 text-slate-700">
                          ${row.principal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          ${row.interest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                        <td className="px-6 py-4 font-semibold text-slate-900 text-right">
                          ${row.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
