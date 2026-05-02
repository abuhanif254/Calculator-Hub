"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { Home, DollarSign, Percent, Calendar, PieChart as PieChartIcon } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface FHALoanCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function FHALoanCalculatorView({ calcDef }: FHALoanCalculatorViewProps) {
  const [homePrice, setHomePrice] = useState("300000");
  const [downPayment, setDownPayment] = useState("10500"); // 3.5%
  const [downPaymentPercent, setDownPaymentPercent] = useState("3.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [interestRate, setInterestRate] = useState("6.5");
  
  const [upfrontMip, setUpfrontMip] = useState("1.75");
  const [annualMip, setAnnualMip] = useState("0.55");
  
  const [propertyTaxes, setPropertyTaxes] = useState("3000");
  const [homeInsurance, setHomeInsurance] = useState("1200");
  const [hoa, setHoa] = useState("0");

  const [baseLoanAmt, setBaseLoanAmt] = useState(0);
  const [totalLoanAmt, setTotalLoanAmt] = useState(0);
  const [monthlyPI, setMonthlyPI] = useState(0);
  const [monthlyMip, setMonthlyMip] = useState(0);
  const [monthlyTaxes, setMonthlyTaxes] = useState(0);
  const [monthlyIns, setMonthlyIns] = useState(0);
  const [totalMonthly, setTotalMonthly] = useState(0);

  const handlePriceChange = (val: string) => {
    setHomePrice(val);
    const p = parseFloat(val) || 0;
    const pct = parseFloat(downPaymentPercent) || 0;
    setDownPayment((p * (pct / 100)).toFixed(0));
  };

  const handleDpAmtChange = (val: string) => {
    setDownPayment(val);
    const p = parseFloat(homePrice);
    const amt = parseFloat(val) || 0;
    if (p > 0) {
      setDownPaymentPercent(((amt / p) * 100).toFixed(2));
    }
  };

  const handleDpPctChange = (val: string) => {
    setDownPaymentPercent(val);
    const p = parseFloat(homePrice) || 0;
    const pct = parseFloat(val) || 0;
    setDownPayment((p * (pct / 100)).toFixed(0));
  };

  const calculate = () => {
    const price = parseFloat(homePrice) || 0;
    const dp = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseInt(loanTerm) || 0;
    const ufMip = parseFloat(upfrontMip) || 0;
    const anMip = parseFloat(annualMip) || 0;
    
    const taxes = parseFloat(propertyTaxes) || 0;
    const ins = parseFloat(homeInsurance) || 0;
    const hoaFee = parseFloat(hoa) || 0;

    const baseLoan = Math.max(0, price - dp);
    setBaseLoanAmt(baseLoan);

    const upfrontMipAmt = baseLoan * (ufMip / 100);
    const totalLoan = baseLoan + upfrontMipAmt;
    setTotalLoanAmt(totalLoan);

    // Calculate P&I
    let pi = 0;
    if (totalLoan > 0 && rate > 0 && term > 0) {
      const monthlyRate = (rate / 100) / 12;
      const totalPayments = term * 12;
      pi = (totalLoan * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else if (totalLoan > 0 && term > 0) {
      pi = totalLoan / (term * 12);
    }
    setMonthlyPI(pi);

    // Calculate monthlies
    const mTax = taxes / 12;
    const mIns = ins / 12;
    const mMip = (baseLoan * (anMip / 100)) / 12;

    setMonthlyTaxes(mTax);
    setMonthlyIns(mIns);
    setMonthlyMip(mMip);

    setTotalMonthly(pi + mTax + mIns + mMip + hoaFee);
  };

  useEffect(() => {
    calculate();
  }, [homePrice, downPayment, loanTerm, interestRate, upfrontMip, annualMip, propertyTaxes, homeInsurance, hoa]);

  const chartData = [
    { name: "Principal & Interest", value: monthlyPI, color: "#3b82f6" },
    { name: "Property Tax", value: monthlyTaxes, color: "#f59e0b" },
    { name: "Home Insurance", value: monthlyIns, color: "#10b981" },
    { name: "FHA MIP", value: monthlyMip, color: "#8b5cf6" },
    { name: "HOA", value: parseFloat(hoa) || 0, color: "#64748b" }
  ].filter(item => item.value > 0);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-inner">
            <Home size={26} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
            <p className="text-slate-500 text-sm">Estimate FHA payments and MIP</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          <div className="lg:col-span-7 space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                  Home Price <span className="font-normal text-slate-400">($)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                  <input 
                    type="number" min="0" value={homePrice} onChange={(e) => handlePriceChange(e.target.value)}
                    className="w-full h-12 pl-8 pr-4 text-lg font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                  Down Payment
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                    <input 
                      type="number" min="0" value={downPayment} onChange={(e) => handleDpAmtChange(e.target.value)}
                      className="w-full h-12 pl-7 pr-3 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="relative w-24">
                    <input 
                      type="number" min="0" step="0.1" value={downPaymentPercent} onChange={(e) => handleDpPctChange(e.target.value)}
                      className="w-full h-12 pl-3 pr-6 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                  Interest Rate <span className="font-normal text-slate-400">(%)</span>
                </label>
                <div className="relative">
                  <input 
                    type="number" step="0.1" min="0" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full h-12 pl-4 pr-8 text-lg font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                  Loan Term <span className="font-normal text-slate-400">(Yrs)</span>
                </label>
                <div className="relative">
                  <input 
                    type="number" min="1" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full h-12 pl-4 pr-12 text-lg font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">Yrs</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl space-y-4">
              <h3 className="font-bold text-indigo-900 text-sm">FHA Mortgage Insurance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-indigo-700 block">Upfront MIP (%)</label>
                  <div className="relative">
                    <input 
                      type="number" step="0.01" value={upfrontMip} onChange={(e) => setUpfrontMip(e.target.value)}
                      className="w-full h-10 pl-3 pr-7 text-sm font-semibold rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-indigo-400 text-xs">%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-indigo-700 block">Annual MIP (%)</label>
                  <div className="relative">
                    <input 
                      type="number" step="0.01" value={annualMip} onChange={(e) => setAnnualMip(e.target.value)}
                      className="w-full h-10 pl-3 pr-7 text-sm font-semibold rounded-lg border border-indigo-200 focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-indigo-400 text-xs">%</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-indigo-500 leading-tight">
                Upfront MIP is typically 1.75% and added to the loan balance. Annual MIP is usually 0.55% for many 30-year loans.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Property Tax (/yr)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-slate-400 text-sm">$</span>
                  <input 
                    type="number" min="0" value={propertyTaxes} onChange={(e) => setPropertyTaxes(e.target.value)}
                    className="w-full h-10 pl-6 pr-3 text-sm font-semibold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">Home Ins (/yr)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-slate-400 text-sm">$</span>
                  <input 
                    type="number" min="0" value={homeInsurance} onChange={(e) => setHomeInsurance(e.target.value)}
                    className="w-full h-10 pl-6 pr-3 text-sm font-semibold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 block">HOA (/mo)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 font-semibold text-slate-400 text-sm">$</span>
                  <input 
                    type="number" min="0" value={hoa} onChange={(e) => setHoa(e.target.value)}
                    className="w-full h-10 pl-6 pr-3 text-sm font-semibold rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

          </div>

          <div className="lg:col-span-5 relative">
            <div className="sticky top-8 space-y-6">
              
              <div className="bg-blue-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute -top-4 -right-4 p-8 opacity-10">
                  <Home size={140} />
                </div>
                
                <h4 className="text-blue-200 font-semibold mb-2 uppercase tracking-widest text-xs">Estimated Monthly Payment</h4>
                
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-blue-300 pb-1">$</span>
                  <span className="text-5xl font-black text-white truncate">
                    {totalMonthly.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="mt-6 space-y-2 text-sm max-w-[85%]">
                  <div className="flex justify-between text-blue-100">
                    <span>Base Loan:</span>
                    <span className="font-semibold text-white">${baseLoanAmt.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="flex justify-between text-blue-100">
                    <span>Total Loan (w/ MIP):</span>
                    <span className="font-semibold text-white">${totalLoanAmt.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>
              </div>

              {totalMonthly > 0 && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-4">
                    <PieChartIcon size={16} className="text-blue-500" />
                    Payment Breakdown
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
                        <span className="font-bold text-slate-800">${item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
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
