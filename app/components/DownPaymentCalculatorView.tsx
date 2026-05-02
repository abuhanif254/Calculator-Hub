"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { Home, IndianRupee, Percent, DollarSign, Euro, PoundSterling, Wallet, PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface DownPaymentCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function DownPaymentCalculatorView({ calcDef }: DownPaymentCalculatorViewProps) {
  const [purchasePrice, setPurchasePrice] = useState("350000");
  const [downPaymentPct, setDownPaymentPct] = useState("20");
  const [downPaymentAmt, setDownPaymentAmt] = useState("70000");

  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState("6.5");

  const [targetPayment, setTargetPayment] = useState("");
  const [requiredDownPayment, setRequiredDownPayment] = useState(0);

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);

  const handlePriceChange = (val: string) => {
    setPurchasePrice(val);
    const p = parseFloat(val) || 0;
    const pct = parseFloat(downPaymentPct) || 0;
    setDownPaymentAmt((p * (pct / 100)).toFixed(0));
  };

  const handleDpAmtChange = (val: string) => {
    setDownPaymentAmt(val);
    const p = parseFloat(purchasePrice);
    const amt = parseFloat(val) || 0;
    if (p > 0) {
      setDownPaymentPct(((amt / p) * 100).toFixed(2));
    }
  };

  const handleDpPctChange = (val: string) => {
    setDownPaymentPct(val);
    const p = parseFloat(purchasePrice) || 0;
    const pct = Math.min(100, Math.max(0, parseFloat(val) || 0));
    setDownPaymentAmt((p * (pct / 100)).toFixed(0));
  };

  const calculate = () => {
    const price = parseFloat(purchasePrice) || 0;
    const dp = parseFloat(downPaymentAmt) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseInt(loanTerm) || 0;
    const target = parseFloat(targetPayment) || 0;

    const principal = Math.max(0, price - dp);
    setLoanAmount(principal);

    let monthly = 0;
    if (principal > 0 && rate > 0 && term > 0) {
      const monthlyRate = (rate / 100) / 12;
      const totalPayments = term * 12;
      monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else if (principal > 0 && term > 0) {
      monthly = principal / (term * 12);
    }
    setMonthlyPayment(monthly);

    if (term > 0 && monthly > 0) {
      const totalPaid = monthly * term * 12;
      setTotalInterest(Math.max(0, totalPaid - principal));
      setTotalCost(totalPaid + dp);
    } else {
      setTotalInterest(0);
      setTotalCost(price);
    }

    // Target payment calculation
    if (target > 0 && rate > 0 && term > 0) {
      const monthlyRate = (rate / 100) / 12;
      const totalPayments = term * 12;
      const maxLoan = target * (Math.pow(1 + monthlyRate, totalPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, totalPayments));
      setRequiredDownPayment(Math.max(0, price - maxLoan));
    } else if (target > 0 && term > 0) {
      const maxLoan = target * term * 12;
      setRequiredDownPayment(Math.max(0, price - maxLoan));
    } else {
      setRequiredDownPayment(0);
    }
  };

  useEffect(() => {
    calculate();
  }, [purchasePrice, downPaymentAmt, downPaymentPct, loanTerm, interestRate, targetPayment]);

  const chartData = [
    { name: "Down Payment", value: parseFloat(downPaymentAmt) || 0, color: "#10b981" },
    { name: "Loan Amount (Principal)", value: loanAmount, color: "#3b82f6" },
  ].filter(item => item.value > 0);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-inner">
            <Wallet size={26} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
            <p className="text-slate-500 text-sm">Calculate deposits and loan impacts</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Purchase Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                    Total Purchase Price <span className="font-normal text-slate-400">($)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                    <input 
                      type="number" min="0" value={purchasePrice} onChange={(e) => handlePriceChange(e.target.value)}
                      className="w-full h-12 pl-8 pr-4 text-lg font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-4">
                <label className="text-sm font-bold text-emerald-800">Your Down Payment</label>
                <div className="flex gap-4 items-end">
                  <div className="relative flex-1">
                    <label className="text-xs font-semibold text-emerald-600 mb-1 block">Amount ($)</label>
                    <span className="absolute left-3 bottom-0 h-12 flex items-center font-bold text-emerald-600">$</span>
                    <input 
                      type="number" min="0" value={downPaymentAmt} onChange={(e) => handleDpAmtChange(e.target.value)}
                      className="w-full h-12 pl-7 pr-3 font-semibold rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>
                  <div className="relative w-32">
                    <label className="text-xs font-semibold text-emerald-600 mb-1 block">Percent (%)</label>
                    <input 
                      type="number" min="0" max="100" step="0.1" value={downPaymentPct} onChange={(e) => handleDpPctChange(e.target.value)}
                      className="w-full h-12 pl-3 pr-8 font-semibold rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                    <span className="absolute right-3 bottom-0 h-12 flex items-center font-bold text-emerald-500">%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-2">Loan Setup</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                    Interest Rate <span className="font-normal text-slate-400">(%)</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="number" step="0.1" min="0" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full h-12 pl-4 pr-8 text-lg font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                    Loan Term <span className="font-normal text-slate-400">(Years)</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="number" min="1" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
                      className="w-full h-12 pl-4 pr-12 text-lg font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">Yrs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">Target Monthly Payment Scenario</h3>
              <p className="text-xs text-slate-500">Want a specific monthly payment? Enter it below to see the required down payment to hit that target.</p>
              <div className="space-y-2 max-w-sm">
                <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                  Desired Monthly Payment
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                  <input 
                    type="number" min="0" placeholder="e.g. 1500" value={targetPayment} onChange={(e) => setTargetPayment(e.target.value)}
                    className="w-full h-12 pl-8 pr-4 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                {parseFloat(targetPayment) > 0 && requiredDownPayment >= 0 && (
                  <div className="mt-2 text-sm p-3 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-200">
                    To get a <strong>${parseFloat(targetPayment).toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>/mo loan payment on a ${parseFloat(purchasePrice).toLocaleString()} purchase at {interestRate}%, you would need a down payment of roughly <strong>${requiredDownPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>.
                  </div>
                )}
                {parseFloat(targetPayment) > 0 && requiredDownPayment < 0 && (
                  <div className="mt-2 text-sm p-3 bg-red-50 text-red-800 rounded-lg border border-red-200">
                    With these terms, your payment would be lower than ${targetPayment} even with $0 down.
                  </div>
                )}
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 relative">
            <div className="sticky top-8 space-y-6">
              
              <div className="bg-emerald-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -top-4 -right-4 p-8 opacity-10">
                  <Wallet size={140} />
                </div>
                
                <h4 className="text-emerald-200 font-semibold mb-2 uppercase tracking-widest text-xs">Estimated Monthly Payment</h4>
                
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-emerald-300 pb-1">$</span>
                  <span className="text-5xl font-black text-white truncate">
                    {monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <p className="text-xs text-emerald-200 font-medium tracking-wide">
                  (Principal & Interest only)
                </p>

                <div className="mt-6 space-y-2 text-sm max-w-[85%] border-t border-emerald-500/50 pt-4">
                  <div className="flex justify-between text-emerald-100">
                    <span>Loan Amount:</span>
                    <span className="font-semibold text-white">${loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-emerald-100">
                    <span>Total Interest:</span>
                    <span className="font-semibold text-white">${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-emerald-100 pt-1">
                    <span>Total Out of Pocket:</span>
                    <span className="font-semibold text-white">${totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              {purchasePrice && parseFloat(purchasePrice) > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-4">
                    <PieChartIcon size={16} className="text-emerald-500" />
                    Purchase Financing Breakdown
                  </h4>
                  <div className="w-full h-56 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={65}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={"cell-" + index} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any) => {
                            const numericValue = Number(value);
                            return !isNaN(numericValue) ? "$" + numericValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) : value;
                          }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="pt-2 space-y-2 mt-2">
                    {chartData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-slate-600 font-medium">{item.name}</span>
                        </div>
                        <span className="font-bold text-slate-800">
                          ${item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          <span className="text-slate-400 ml-1 text-xs font-normal">({((item.value / (parseFloat(purchasePrice) || 1)) * 100).toFixed(1)}%)</span>
                        </span>
                      </div>
                    ))}
                  </div>

                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
