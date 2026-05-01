"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { Ship, DollarSign, Percent, Calendar, PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface BoatLoanCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function BoatLoanCalculatorView({ calcDef }: BoatLoanCalculatorViewProps) {
  const [boatPrice, setBoatPrice] = useState("50000");
  const [downPayment, setDownPayment] = useState("10000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("180"); // months
  const [salesTax, setSalesTax] = useState("7.0");

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [principalAmt, setPrincipalAmt] = useState(0);

  const calculateLoan = () => {
    const price = parseFloat(boatPrice) || 0;
    const dp = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseInt(loanTerm) || 0;
    const tax = parseFloat(salesTax) || 0;

    const totalTax = price * (tax / 100);
    const amountToFinance = price + totalTax - dp;
    
    if (amountToFinance <= 0 || term <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalCost(0);
      setPrincipalAmt(0);
      return;
    }

    setPrincipalAmt(amountToFinance);

    if (rate === 0) {
      const pmt = amountToFinance / term;
      setMonthlyPayment(pmt);
      setTotalInterest(0);
      setTotalCost(amountToFinance + dp);
      return;
    }

    const monthlyRate = (rate / 100) / 12;
    const pmt = (amountToFinance * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    
    const totalInt = (pmt * term) - amountToFinance;
    
    setMonthlyPayment(pmt);
    setTotalInterest(totalInt);
    setTotalCost(amountToFinance + totalInt + dp);
  };

  useEffect(() => {
    calculateLoan();
  }, [boatPrice, downPayment, interestRate, loanTerm, salesTax]);

  const chartData = [
    { name: "Principal (Borrowed)", value: principalAmt, color: "#3b82f6" },
    { name: "Total Interest", value: totalInterest, color: "#f59e0b" },
    { name: "Down Payment", value: parseFloat(downPayment) || 0, color: "#10b981" }
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-inner">
            <Ship size={26} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
            <p className="text-slate-500 text-sm">Estimate marine financing payments</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <DollarSign size={16} className="text-blue-500" />
                  Boat Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                  <input 
                    type="number"
                    min="0"
                    value={boatPrice}
                    onChange={(e) => setBoatPrice(e.target.value)}
                    className="w-full h-14 pl-8 pr-4 text-lg font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="50000"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <DollarSign size={16} className="text-emerald-500" />
                  Down Payment
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                  <input 
                    type="number"
                    min="0"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="w-full h-14 pl-8 pr-4 text-lg font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="10000"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Percent size={16} className="text-amber-500" />
                  Interest Rate
                </label>
                <div className="relative">
                  <input 
                    type="number"
                    step="0.1"
                    min="0"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full h-14 pl-4 pr-10 text-lg font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="6.5"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                </div>
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Calendar size={16} className="text-indigo-500" />
                  Loan Term (Months)
                </label>
                <div className="relative">
                  <input 
                    type="number"
                    min="1"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full h-14 pl-4 pr-20 text-lg font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    placeholder="180"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">Months</span>
                </div>
                <div className="flex gap-2 mt-2">
                  {[60, 120, 180, 240].map((months) => (
                    <button
                      key={months}
                      onClick={() => setLoanTerm(months.toString())}
                      className={"px-3 py-1 text-xs font-semibold rounded-md border transition-colors " + (parseInt(loanTerm) === months ? "bg-blue-100 border-blue-300 text-blue-700" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50")}
                    >
                      {months / 12} Yrs
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Percent size={16} className="text-rose-500" />
                Sales Tax
              </label>
              <div className="relative md:w-1/2">
                <input 
                  type="number"
                  step="0.1"
                  min="0"
                  value={salesTax}
                  onChange={(e) => setSalesTax(e.target.value)}
                  className="w-full h-14 pl-4 pr-10 text-lg font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                  placeholder="7.0"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="sticky top-8 space-y-6">
              
              <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Ship size={120} />
                </div>
                
                <h4 className="text-blue-200 font-semibold mb-2 uppercase tracking-widest text-xs">Estimated Monthly Payment</h4>
                
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-blue-300 pb-1">$</span>
                  <span className="text-6xl font-black text-white">
                    {monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-sm text-blue-200">For {loanTerm} months</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Total Interest</p>
                  <p className="text-xl font-bold text-amber-600">${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Total Amount Paid</p>
                  <p className="text-xl font-bold text-slate-800">${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
              </div>

              {principalAmt > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-4">
                    <PieChartIcon size={16} className="text-blue-500" />
                    Payment Breakdown
                  </h4>
                  <div className="w-full h-48 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={"cell-" + index} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any) => {
                            const numericValue = Number(value);
                            return !isNaN(numericValue) ? "$" + numericValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : value;
                          }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
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
