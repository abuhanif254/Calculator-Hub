"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { TrendingUp, DollarSign, Calendar, RefreshCcw } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface FutureValueCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function FutureValueCalculatorView({ calcDef }: FutureValueCalculatorViewProps) {
  const [pv, setPv] = useState("10000"); // Present Value
  const [pmt, setPmt] = useState("500"); // Periodic Payment
  const [pmtFreq, setPmtFreq] = useState("12"); // Deposit frequency (12 = monthly, 1 = annually)
  const [pmtTiming, setPmtTiming] = useState("end"); // "beginning" or "end"
  const [rate, setRate] = useState("7"); // Annual Rate %
  const [compoundFreq, setCompoundFreq] = useState("12"); // Compounding frequency
  const [years, setYears] = useState("20");

  const [futureValue, setFutureValue] = useState(0);
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);

  const calculate = () => {
    const presentValue = parseFloat(pv) || 0;
    const payment = parseFloat(pmt) || 0;
    const paymentFrequency = parseInt(pmtFreq) || 12;
    const isBeginning = pmtTiming === "beginning";
    const annualRate = parseFloat(rate) || 0;
    const compFreq = parseInt(compoundFreq) || 12;
    const yearsNum = parseFloat(years) || 0;

    const d = [];
    const r = annualRate / 100;
    
    // Calculate rate per period corresponding to payment frequency
    let ratePerPeriod = 0;
    if (annualRate > 0) {
      ratePerPeriod = Math.pow(1 + r / compFreq, compFreq / paymentFrequency) - 1;
    }

    const totalPeriods = yearsNum * paymentFrequency;

    let balance = presentValue;
    let invested = presentValue;

    d.push({
      year: 0,
      invested: Math.round(invested),
      interest: 0,
      balance: Math.round(balance)
    });

    for (let p = 1; p <= totalPeriods; p++) {
      if (isBeginning) {
        invested += payment;
        balance += payment;
        balance = balance * (1 + ratePerPeriod);
      } else {
        invested += payment;
        balance = balance * (1 + ratePerPeriod) + payment;
      }
      
      // Store chart point at the end of each year
      if (p % paymentFrequency === 0) {
        d.push({
          year: p / paymentFrequency,
          invested: Math.round(invested),
          interest: Math.round(balance - invested),
          balance: Math.round(balance)
        });
      }
    }
    
    // If years is not a whole number and we want intermediate points
    if (d.length === 1 && totalPeriods > 0) {
      d.push({
          year: yearsNum,
          invested: Math.round(invested),
          interest: Math.round(balance - invested),
          balance: Math.round(balance)
      });
    }

    setChartData(d);
    setFutureValue(balance);
    setTotalInvested(invested);
    setTotalInterest(Math.max(0, balance - invested));
  };

  useEffect(() => {
    calculate();
  }, [pv, pmt, pmtFreq, pmtTiming, rate, compoundFreq, years]);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner">
            <TrendingUp size={26} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
            <p className="text-slate-500 text-sm">Calculate future investment growth</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-4 space-y-6">
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                  Present Value (Starting Amount)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input 
                    type="number" min="0" value={pv} onChange={(e) => setPv(e.target.value)}
                    className="w-full h-12 pl-8 pr-4 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                  Periodic Deposit
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input 
                      type="number" min="0" value={pmt} onChange={(e) => setPmt(e.target.value)}
                      className="w-full h-12 pl-7 pr-3 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <select 
                    value={pmtFreq} onChange={(e) => setPmtFreq(e.target.value)}
                    className="w-28 h-12 px-3 font-medium rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    <option value="12">Monthly</option>
                    <option value="4">Quarterly</option>
                    <option value="2">Semi-Annually</option>
                    <option value="1">Annually</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600 block">Deposit Timing</label>
                <div className="flex bg-slate-100 p-1 rounded-lg">
                  <button
                    onClick={() => setPmtTiming("end")}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${pmtTiming === "end" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    End of Period
                  </button>
                  <button
                    onClick={() => setPmtTiming("beginning")}
                    className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${pmtTiming === "beginning" ? "bg-white text-indigo-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    Beginning
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Annual Rate</label>
                  <div className="relative">
                    <input 
                      type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)}
                      className="w-full h-12 pl-4 pr-8 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Years to Grow</label>
                  <div className="relative">
                    <input 
                      type="number" min="0.1" step="1" value={years} onChange={(e) => setYears(e.target.value)}
                      className="w-full h-12 pl-4 pr-10 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">Yrs</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Compounding Frequency</label>
                <select 
                  value={compoundFreq} onChange={(e) => setCompoundFreq(e.target.value)}
                  className="w-full h-12 px-4 font-medium rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="365">Daily</option>
                  <option value="12">Monthly</option>
                  <option value="4">Quarterly</option>
                  <option value="2">Semi-Annually</option>
                  <option value="1">Annually</option>
                </select>
              </div>
            </div>

          </div>

          <div className="lg:col-span-8 flex flex-col space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden flex flex-col justify-center min-h-[140px]">
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <TrendingUp size={100} />
                </div>
                <h4 className="text-indigo-200 font-medium text-sm mb-1">Future Value</h4>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-semibold text-indigo-300 pb-1">$</span>
                  <span className="text-4xl font-black truncate">
                    {futureValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-center min-h-[140px]">
                <h4 className="text-slate-500 font-medium text-sm mb-1">Total Invested</h4>
                <div className="flex items-end gap-1">
                  <span className="text-xl font-medium text-slate-400 pb-0.5">$</span>
                  <span className="text-3xl font-bold text-slate-800 truncate">
                    {totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex flex-col justify-center min-h-[140px]">
                <h4 className="text-emerald-600 font-medium text-sm mb-1">Total Interest Earned</h4>
                <div className="flex items-end gap-1">
                  <span className="text-xl font-medium text-emerald-400 pb-0.5">$</span>
                  <span className="text-3xl font-bold text-emerald-700 truncate">
                    {totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-5 md:p-6 shadow-sm min-h-[300px]">
              <h3 className="text-sm font-bold text-slate-700 mb-6 flex items-center gap-2">
                <TrendingUp size={16} className="text-indigo-500" />
                Investment Growth Over Time
              </h3>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis 
                      dataKey="year" 
                      tickFormatter={(val) => `Year ${val}`} 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }} 
                      dy={10}
                    />
                    <YAxis 
                      tickFormatter={(val) => `$${(val / 1000).toFixed(0)}k`}
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      dx={-10}
                    />
                    <Tooltip 
                      formatter={(value: number, name: string) => [
                        `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                        name === 'invested' ? 'Total Invested' : 'Total Interest'
                      ]}
                      labelFormatter={(label) => `Year ${label}`}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="invested" 
                      stackId="1" 
                      stroke="#94a3b8" 
                      fill="url(#colorInvested)" 
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="interest" 
                      stackId="1" 
                      stroke="#6366f1" 
                      fill="url(#colorInterest)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
