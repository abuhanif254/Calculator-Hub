"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { Landmark, ArrowRight, Calendar, PiggyBank } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface MortgageAmortizationCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function MortgageAmortizationCalculatorView({ calcDef }: MortgageAmortizationCalculatorViewProps) {
  const [loanAmount, setLoanAmount] = useState("300000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [annualSchedule, setAnnualSchedule] = useState<any[]>([]);

  const calculate = () => {
    const P = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseInt(loanTerm) || 0;
    
    if (P <= 0 || years <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalPayment(0);
      setSchedule([]);
      setAnnualSchedule([]);
      return;
    }

    const n = years * 12; // total number of monthly payments
    
    if (rate === 0) {
       setMonthlyPayment(P / n);
       setTotalInterest(0);
       setTotalPayment(P);
       // simple schedule logic if rate is 0
       return;
    }
    
    const r = rate / 100 / 12; // monthly interest rate
    
    // M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1]
    const mathPow = Math.pow(1 + r, n);
    const M = P * (r * mathPow) / (mathPow - 1);
    
    setMonthlyPayment(M);
    setTotalPayment(M * n);
    setTotalInterest(M * n - P);

    const fullSchedule = [];
    const yearlyData = [];
    
    let balance = P;
    let accInterest = 0;
    let accPrincipal = 0;
    
    let yearInterest = 0;
    let yearPrincipal = 0;

    for (let month = 1; month <= n; month++) {
      const interestPayment = balance * r;
      const principalPayment = M - interestPayment;
      balance -= principalPayment;
      
      // Safety net for floating point issues at the end
      if (balance < 0) balance = 0;

      accInterest += interestPayment;
      accPrincipal += principalPayment;
      
      yearInterest += interestPayment;
      yearPrincipal += principalPayment;

      fullSchedule.push({
        month,
        payment: M,
        principal: principalPayment,
        interest: interestPayment,
        totalInterest: accInterest,
        balance: balance
      });
      
      if (month % 12 === 0 || month === n) {
        yearlyData.push({
          year: Math.ceil(month / 12),
          balance: Math.round(balance),
          accPrincipal: Math.round(accPrincipal),
          accInterest: Math.round(accInterest),
          yearInterest: Math.round(yearInterest),
          yearPrincipal: Math.round(yearPrincipal)
        });
        // reset year accumulators
        yearInterest = 0;
        yearPrincipal = 0;
      }
    }

    setSchedule(fullSchedule);
    setAnnualSchedule(yearlyData);
  };

  useEffect(() => {
    calculate();
  }, [loanAmount, interestRate, loanTerm]);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner">
            <Landmark size={26} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
            <p className="text-slate-500 text-sm">Calculate your payments and schedule</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Inputs Section */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                  Loan Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input 
                    type="number" min="0" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full h-12 pl-8 pr-4 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">Interest Rate (Annual)</label>
                <div className="relative">
                  <input 
                    type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full h-12 pl-4 pr-8 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">Loan Term</label>
                <div className="relative">
                  <input 
                    type="number" min="1" step="1" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full h-12 pl-4 pr-12 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">Years</span>
                </div>
              </div>
              
              <div className="pt-4 flex gap-2">
                 <button onClick={() => setLoanTerm("15")} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">15 Year</button>
                 <button onClick={() => setLoanTerm("20")} className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors">20 Year</button>
                 <button onClick={() => setLoanTerm("30")} className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-medium rounded-lg transition-colors border border-indigo-200">30 Year</button>
              </div>
            </div>

          </div>

          {/* Results Section */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-600 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden flex flex-col justify-center min-h-[140px]">
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Landmark size={100} />
                </div>
                <h4 className="text-indigo-200 font-medium text-sm mb-1">Monthly Payment</h4>
                <div className="flex items-end gap-1">
                  <span className="text-2xl font-semibold text-indigo-300 pb-1">$</span>
                  <span className="text-4xl font-black truncate">
                    {monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-center min-h-[140px]">
                <h4 className="text-slate-500 font-medium text-sm mb-1">Total Principal</h4>
                <div className="flex items-end gap-1">
                  <span className="text-xl font-medium text-slate-400 pb-0.5">$</span>
                  <span className="text-3xl font-bold text-slate-800 truncate">
                    {parseFloat(loanAmount || "0").toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex flex-col justify-center min-h-[140px]">
                <h4 className="text-emerald-600 font-medium text-sm mb-1">Total Interest Paid</h4>
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
                <Landmark size={16} className="text-indigo-500" />
                Amortization Breakdown Over Time
              </h3>
              
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={annualSchedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorInterestChart" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.1}/>
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
                        name === 'balance' ? 'Remaining Balance' : name === 'accPrincipal' ? 'Principal Paid' : 'Interest Paid'
                      ]}
                      labelFormatter={(label) => `Year ${label}`}
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#94a3b8" 
                      fill="url(#colorBalance)" 
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="accPrincipal" 
                      stroke="#10b981" 
                      fill="url(#colorPrincipal)" 
                      strokeWidth={2}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="accInterest" 
                      stroke="#f43f5e" 
                      fill="url(#colorInterestChart)" 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {/* Annual Schedule Table */}
      {annualSchedule.length > 0 && (
        <div className="border-t border-slate-200">
           <div className="p-6 md:p-8 bg-slate-50">
             <h3 className="text-lg font-bold text-slate-800 mb-6">Annual Amortization Schedule</h3>
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="border-b-2 border-slate-200">
                     <th className="py-3 px-4 font-semibold text-slate-700">Year</th>
                     <th className="py-3 px-4 font-semibold text-slate-700">Interest Paid</th>
                     <th className="py-3 px-4 font-semibold text-slate-700">Principal Paid</th>
                     <th className="py-3 px-4 font-semibold text-slate-700">Total Interest</th>
                     <th className="py-3 px-4 font-semibold text-slate-700">Balance</th>
                   </tr>
                 </thead>
                 <tbody>
                   {annualSchedule.map((row) => (
                     <tr key={row.year} className="border-b border-slate-100 hover:bg-slate-100/50 transition-colors">
                       <td className="py-3 px-4 font-medium text-slate-700">{row.year}</td>
                       <td className="py-3 px-4 text-slate-600">${row.yearInterest.toLocaleString()}</td>
                       <td className="py-3 px-4 text-emerald-600 font-medium">${row.yearPrincipal.toLocaleString()}</td>
                       <td className="py-3 px-4 text-rose-600">${row.accInterest.toLocaleString()}</td>
                       <td className="py-3 px-4 font-bold text-slate-800">${row.balance.toLocaleString()}</td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}
