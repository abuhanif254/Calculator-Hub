"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export function RealEstateCalculatorView({ calcDef }: { calcDef?: CalculatorDef }) {
  const [purchasePrice, setPurchasePrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  const [grossMonthlyRent, setGrossMonthlyRent] = useState<number>(2500);
  const [operatingExpenses, setOperatingExpenses] = useState<number>(600); // monthly

  // Results
  const [monthlyMortgage, setMonthlyMortgage] = useState<number>(0);
  const [monthlyCashFlow, setMonthlyCashFlow] = useState<number>(0);
  const [capRate, setCapRate] = useState<number>(0);
  const [cashOnCashReturn, setCashOnCashReturn] = useState<number>(0);
  
  const t = useTranslations("calculator");

  useEffect(() => {
    function calculate() {
      // Mortgage Payment
      const loanAmount = purchasePrice - downPayment;
      const monthlyRate = interestRate / 100 / 12;
      const numPayments = loanTerm * 12;
      
      let monthlyPayment = 0;
      if (monthlyRate > 0) {
        monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      } else {
        monthlyPayment = loanAmount / numPayments;
      }
      
      if (isNaN(monthlyPayment) || monthlyPayment < 0 || !isFinite(monthlyPayment)) {
          monthlyPayment = 0;
      }

      setMonthlyMortgage(monthlyPayment);

      const totalMonthlyExpenses = monthlyPayment + operatingExpenses;
      const netMonthlyCashFlow = grossMonthlyRent - totalMonthlyExpenses;
      setMonthlyCashFlow(netMonthlyCashFlow);

      // Annualized
      const annualRent = grossMonthlyRent * 12;
      const annualOperatingExpenses = operatingExpenses * 12;
      const netOperatingIncome = annualRent - annualOperatingExpenses; // NOI (excludes debt service)
      const annualCashFlow = netMonthlyCashFlow * 12;

      const calculatedCapRate = purchasePrice > 0 ? (netOperatingIncome / purchasePrice) * 100 : 0;
      setCapRate(calculatedCapRate);

      const cashInvested = downPayment; // simplistic assumption (ignoring closing costs, rehab, etc.)
      const calculatedCashOnCash = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;
      setCashOnCashReturn(calculatedCashOnCash);
    }
    
    calculate();
  }, [purchasePrice, downPayment, interestRate, loanTerm, grossMonthlyRent, operatingExpenses]);

  const chartData = [
    { name: "Mortgage Payment", value: monthlyMortgage },
    { name: "Operating Expenses", value: operatingExpenses },
    { name: "Net Cash Flow", value: monthlyCashFlow > 0 ? monthlyCashFlow : 0 }
  ];

  const COLORS = ['#ef4444', '#f59e0b', '#10b981'];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Interactive Controls */}
        <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/50">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Property Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Purchase Price ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <span className="text-slate-400 font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    value={purchasePrice === 0 ? '' : purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value))}
                    className="w-full ps-8 pe-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Down Payment ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <span className="text-slate-400 font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    value={downPayment === 0 ? '' : downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full ps-8 pe-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Interest Rate (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full pe-8 ps-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium"
                  />
                  <div className="absolute inset-y-0 end-0 flex items-center pe-4 pointer-events-none">
                    <span className="text-slate-400 font-medium">%</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Loan Term (Years)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div className="md:col-span-2 mt-4 pt-4 border-t border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4">Income & Expenses</h3>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Gross Monthly Rent ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <span className="text-slate-400 font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    value={grossMonthlyRent === 0 ? '' : grossMonthlyRent}
                    onChange={(e) => setGrossMonthlyRent(Number(e.target.value))}
                    className="w-full ps-8 pe-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Monthly Expenses ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <span className="text-slate-400 font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    value={operatingExpenses === 0 ? '' : operatingExpenses}
                    onChange={(e) => setOperatingExpenses(Number(e.target.value))}
                    className="w-full ps-8 pe-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">Taxes, Insurance, HOA, Maintenance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results Display */}
        <div className="p-6 md:p-10 bg-white">
          <div className="h-full flex flex-col space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-sm font-semibold text-slate-500 mb-1">Monthly Cash Flow</p>
                <div className={`text-3xl font-bold tracking-tight ${monthlyCashFlow >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {monthlyCashFlow < 0 ? '-' : ''}
                  <span className={`${monthlyCashFlow >= 0 ? 'text-emerald-400' : 'text-red-400'} mr-1`}>$</span>
                  {Math.abs(monthlyCashFlow).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              
              <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
                <p className="text-sm font-semibold text-blue-600/80 mb-1">Cap Rate</p>
                <div className="text-3xl font-bold text-blue-700 tracking-tight">
                  {capRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                </div>
              </div>

              <div className="bg-amber-50/50 rounded-2xl p-6 border border-amber-100">
                <p className="text-sm font-semibold text-amber-600/80 mb-1">Cash on Cash</p>
                <div className="text-3xl font-bold text-amber-700 tracking-tight">
                  {cashOnCashReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-sm font-semibold text-slate-500 mb-1">Monthly Mortgage</p>
                <div className="text-2xl font-bold text-slate-800 tracking-tight">
                  ${monthlyMortgage.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Dynamic Visualization */}
            <div className="flex-1 mt-6 relative min-h-[250px]">
              <h3 className="text-center text-sm font-bold text-slate-600 mb-2">Monthly Income Breakdown</h3>
              <div className="absolute inset-0 top-8">
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
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => `$${Number(value).toLocaleString(undefined, {maximumFractionDigits: 2})}`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
            {monthlyCashFlow < 0 && (
                <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-4 text-sm mt-4 text-center font-medium">
                  Note: This property currently generates negative monthly cash flow.
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
