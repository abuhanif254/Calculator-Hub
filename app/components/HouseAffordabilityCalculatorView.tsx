"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { Home, Landmark, AlertCircle, TrendingUp, CheckCircle2 } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface HouseAffordabilityCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function HouseAffordabilityCalculatorView({ calcDef }: HouseAffordabilityCalculatorViewProps) {
  // Inputs
  const [annualIncome, setAnnualIncome] = useState("100000");
  const [monthlyDebt, setMonthlyDebt] = useState("500");
  const [downPayment, setDownPayment] = useState("40000");
  
  // Advanced Inputs
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [propertyTaxRate, setPropertyTaxRate] = useState("1.2");
  const [homeInsurance, setHomeInsurance] = useState("1200");
  const [hoaFees, setHoaFees] = useState("0");
  // Debt-to-Income constraint (Standard is 36%)
  const [maxDti, setMaxDti] = useState("36");

  // Outputs
  const [maxHomePrice, setMaxHomePrice] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [principalInterest, setPrincipalInterest] = useState(0);
  const [taxes, setTaxes] = useState(0);
  const [insurance, setInsurance] = useState(0);
  
  const [dtiRatio, setDtiRatio] = useState(0); // Current estimated DTI
  
  const [chartData, setChartData] = useState<any[]>([]);

  const calculate = () => {
    const income = parseFloat(annualIncome) || 0;
    const debt = parseFloat(monthlyDebt) || 0;
    const downPmt = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const years = parseInt(loanTerm) || 30;
    const taxRate = parseFloat(propertyTaxRate) || 0;
    const annualInsurance = parseFloat(homeInsurance) || 0;
    const hoa = parseFloat(hoaFees) || 0;
    const dtiLimit = parseFloat(maxDti) || 36;

    if (income <= 0) {
      resetOutputs();
      return;
    }

    const monthlyGrossIncome = income / 12;
    // Maximum allowed total monthly debt payments (including mortgage)
    const maxTotalMonthlyDebt = monthlyGrossIncome * (dtiLimit / 100);
    // Maximum allowed housing payment (PITI + HOA)
    const maxHousingPayment = Math.max(0, maxTotalMonthlyDebt - debt);

    if (maxHousingPayment <= 0) {
        resetOutputs();
        return;
    }

    const r = rate / 100 / 12;
    const n = years * 12;
    // M = P [ r(1 + r)^n ] / [ (1 + r)^n - 1] -> P = M / ( [ r(1 + r)^n ] / [ (1 + r)^n - 1] )
    const mathPow = Math.pow(1 + r, n);
    let mortgageFactor = r === 0 ? 1 / n : (r * mathPow) / (mathPow - 1);
    
    const monthlyIns = annualInsurance / 12;
    
    // Total Housing Payment = Principal + Interest + Taxes + Insurance + HOA
    // THP = P * mortgageFactor + (Price * taxRate / 100 / 12) + monthlyIns + hoa
    // Price = P + DownPayment => P = Price - DownPayment
    // THP = (Price - DownPayment) * mortgageFactor + Price * (taxRate / 100 / 12) + monthlyIns + hoa
    // Price = (THP - monthlyIns - hoa + DownPayment * mortgageFactor) / (mortgageFactor + (taxRate / 100 / 12))
    
    const monthlyTaxRate = taxRate / 100 / 12;
    let affordableHomePrice = (maxHousingPayment - monthlyIns - hoa + downPmt * mortgageFactor) / (mortgageFactor + monthlyTaxRate);
    
    // If the price is negative or NaN, reset
    if (affordableHomePrice <= 0 || isNaN(affordableHomePrice)) {
       resetOutputs();
       return;
    }

    // Safety net: affordable home price should ideally be >= down payment
    if (affordableHomePrice < downPmt) {
       affordableHomePrice = downPmt;
    }

    setMaxHomePrice(affordableHomePrice);
    
    const calculatedLoan = affordableHomePrice - downPmt;
    setLoanAmount(Math.max(0, calculatedLoan));
    
    const pi = calculatedLoan * mortgageFactor;
    setPrincipalInterest(Math.max(0, pi));
    
    const tax = affordableHomePrice * monthlyTaxRate;
    setTaxes(tax);
    setInsurance(monthlyIns);
    
    const totalPmt = pi + tax + monthlyIns + hoa;
    setMonthlyPayment(totalPmt);
    
    // Calculate new total DTI
    const newTotalDebt = totalPmt + debt;
    setDtiRatio((newTotalDebt / monthlyGrossIncome) * 100);

    setChartData([
      { name: "Principal & Interest", value: Math.max(0, pi), color: "#6366f1" },
      { name: "Property Taxes", value: tax, color: "#10b981" },
      { name: "Homeowners Insurance", value: monthlyIns, color: "#f59e0b" },
      { name: "HOA Fees", value: hoa, color: "#8b5cf6" }
    ]);
  };
  
  const resetOutputs = () => {
      setMaxHomePrice(0);
      setLoanAmount(0);
      setPrincipalInterest(0);
      setTaxes(0);
      setInsurance(0);
      setMonthlyPayment(0);
      setChartData([]);
      setDtiRatio(0);
  }

  useEffect(() => {
    calculate();
  }, [annualIncome, monthlyDebt, downPayment, interestRate, loanTerm, propertyTaxRate, homeInsurance, hoaFees, maxDti]);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shadow-inner">
            <Home size={26} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
            <p className="text-slate-500 text-sm">Find out your maximum home buying budget</p>
          </div>
        </div>
        {maxHomePrice > 0 && (
          <div className="bg-indigo-600 px-4 py-2 rounded-xl border border-indigo-700 shadow-sm text-center">
            <p className="text-indigo-200 text-xs font-semibold mb-0.5 uppercase tracking-wider">Affordable Home Price</p>
            <p className="text-white font-black text-xl">${maxHomePrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          </div>
        )}
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Inputs Section */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-8">
            
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">Your Financial Profile</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                  Gross Annual Income
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input 
                    type="number" min="0" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)}
                    className="w-full h-12 pl-8 pr-4 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">
                  Total Monthly Debts <span className="font-normal text-slate-400 ml-1">(Cards, Cars, Loans)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input 
                    type="number" min="0" value={monthlyDebt} onChange={(e) => setMonthlyDebt(e.target.value)}
                    className="w-full h-12 pl-8 pr-4 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 block">Available Down Payment</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input 
                    type="number" min="0" value={downPayment} onChange={(e) => setDownPayment(e.target.value)}
                    className="w-full h-12 pl-8 pr-4 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-2">Mortgage Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Interest Rate</label>
                  <div className="relative">
                    <input 
                      type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full h-12 pl-4 pr-8 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block">Loan Term (Years)</label>
                  <div className="relative">
                    <input 
                      type="number"
                      min="1"
                      max="50"
                      step="1"
                      value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
                      className="w-full h-12 px-4 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block text-xs">Property Tax (Yearly)</label>
                  <div className="relative">
                    <input 
                      type="number" step="0.1" value={propertyTaxRate} onChange={(e) => setPropertyTaxRate(e.target.value)}
                      className="w-full h-12 pl-4 pr-8 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block text-xs">Home Ins. (Yearly)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input 
                      type="number" step="10" value={homeInsurance} onChange={(e) => setHomeInsurance(e.target.value)}
                      className="w-full h-12 pl-6 pr-3 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block text-xs">HOA Fees (Mo)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                    <input 
                      type="number" step="10" value={hoaFees} onChange={(e) => setHoaFees(e.target.value)}
                      className="w-full h-12 pl-6 pr-3 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 block text-xs">Max DTI Ratio</label>
                  <div className="relative">
                    <select 
                      value={maxDti} onChange={(e) => setMaxDti(e.target.value)}
                      className="w-full h-12 pl-3 pr-8 font-semibold rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 bg-white text-sm"
                    >
                      <option value="36">36% (Standard)</option>
                      <option value="43">43% (Aggressive)</option>
                      <option value="50">50% (Max)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Results Section */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col space-y-6">
            
            {maxHomePrice > 0 ? (
              <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 relative overflow-hidden">
                  <h4 className="text-indigo-600 font-medium text-sm mb-1">Max Loan Amount</h4>
                  <div className="flex items-end gap-1">
                    <span className="text-xl font-medium text-indigo-400 pb-0.5">$</span>
                    <span className="text-3xl font-bold text-indigo-900 truncate">
                      {loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Landmark size={48} />
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 relative overflow-hidden">
                  <h4 className="text-emerald-600 font-medium text-sm mb-1">Estimated Monthly Pmt</h4>
                  <div className="flex items-end gap-1">
                    <span className="text-xl font-medium text-emerald-400 pb-0.5">$</span>
                    <span className="text-3xl font-bold text-emerald-900 truncate">
                      {monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col xl:flex-row items-center gap-8 xl:gap-12">
                <div className="w-full xl:w-1/2 flex justify-center">
                  <div className="h-64 w-64 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartData.filter(d => d.value > 0)}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any) => `$${Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-xs text-slate-500 font-medium tracking-wider uppercase">Monthly</span>
                      <span className="text-2xl font-black text-slate-800">${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full xl:w-1/2 space-y-4">
                  <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Monthly Payment Breakdown</h3>
                  <div className="space-y-3">
                    {chartData.filter(d => d.value > 0).map((item, i) => (
                      <div key={i} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                          <span className="text-slate-600 font-medium">{item.name}</span>
                        </div>
                        <span className="font-bold text-slate-800">${item.value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase">Estimated Total DTI</p>
                        <p className="text-sm text-slate-700">Debt to Income Ratio</p>
                      </div>
                      <div className={`font-black text-xl ${dtiRatio > 43 ? 'text-rose-600' : dtiRatio > 36 ? 'text-amber-500' : 'text-emerald-600'}`}>
                        {dtiRatio.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </>
            ) : (
               <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-slate-50 border border-slate-200 border-dashed rounded-2xl min-h-[300px]">
                 <AlertCircle className="w-16 h-16 text-slate-300 mb-4" />
                 <h3 className="text-lg font-bold text-slate-700 mb-2">Adjust your inputs</h3>
                 <p className="text-slate-500 max-w-sm">
                    Based on your income and current debts, it appears you may not qualify for a mortgage using a {maxDti}% DTI limit. Try reducing monthly debt, increasing income, or adjusting the allowed DTI limit.
                 </p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
