"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { Home, DollarSign, Percent, Calendar, PieChart as PieChartIcon, ArrowRight, Wallet, HelpCircle, Activity } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface RentalPropertyCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function RentalPropertyCalculatorView({ calcDef }: RentalPropertyCalculatorViewProps) {
  // Financing
  const [purchasePrice, setPurchasePrice] = useState("300000");
  const [downPayment, setDownPayment] = useState("60000"); // 20%
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30"); // years

  // Income
  const [rent, setRent] = useState("2500"); // monthly
  const [vacancyRate, setVacancyRate] = useState("5.0"); // %

  // Expenses
  const [propertyTaxes, setPropertyTaxes] = useState("3000"); // annual
  const [insurance, setInsurance] = useState("1200"); // annual
  const [maintenance, setMaintenance] = useState("3000"); // annual
  const [propertyManagement, setPropertyManagement] = useState("10"); // % of rent
  const [hoa, setHoa] = useState("0"); // monthly

  // Results
  const [monthlyMortgage, setMonthlyMortgage] = useState(0);
  const [grossIncome, setGrossIncome] = useState(0);
  const [operatingExpenses, setOperatingExpenses] = useState(0);
  const [netOperatingIncome, setNetOperatingIncome] = useState(0);
  const [cashFlow, setCashFlow] = useState(0);
  const [capRate, setCapRate] = useState(0);
  const [cashOnCash, setCashOnCash] = useState(0);

  const calculate = () => {
    const price = parseFloat(purchasePrice) || 0;
    const dp = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const term = parseInt(loanTerm) || 0;

    const monthlyRent = parseFloat(rent) || 0;
    const vacancy = parseFloat(vacancyRate) || 0;

    const taxes = parseFloat(propertyTaxes) || 0;
    const ins = parseFloat(insurance) || 0;
    const maint = parseFloat(maintenance) || 0;
    const mgmt = parseFloat(propertyManagement) || 0;
    const hoaFee = parseFloat(hoa) || 0;

    // 1. Mortgage
    const principal = Math.max(0, price - dp);
    let mortgagePmt = 0;
    if (principal > 0 && rate > 0 && term > 0) {
      const monthlyRate = (rate / 100) / 12;
      const totalPayments = term * 12;
      mortgagePmt = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else if (principal > 0 && term > 0) {
      mortgagePmt = principal / (term * 12);
    }
    setMonthlyMortgage(mortgagePmt);

    // 2. Income
    const maxMonthlyIncome = monthlyRent;
    const vacancyLoss = maxMonthlyIncome * (vacancy / 100);
    const effectiveGrossIncomeMonthly = maxMonthlyIncome - vacancyLoss;
    setGrossIncome(effectiveGrossIncomeMonthly);

    // 3. Operating Expenses (excluding mortgage)
    const monthlyTaxes = taxes / 12;
    const monthlyIns = ins / 12;
    const monthlyMaint = maint / 12;
    const monthlyMgmt = maxMonthlyIncome * (mgmt / 100);
    
    const monthlyOpEx = monthlyTaxes + monthlyIns + monthlyMaint + monthlyMgmt + hoaFee;
    setOperatingExpenses(monthlyOpEx);

    // 4. NOI & Cash Flow
    const noiMonthly = effectiveGrossIncomeMonthly - monthlyOpEx;
    const noiAnnual = noiMonthly * 12;
    setNetOperatingIncome(noiAnnual);

    const monthlyCashFlow = noiMonthly - mortgagePmt;
    setCashFlow(monthlyCashFlow);

    // 5. Cap Rate & Cash on Cash
    const calculatedCapRate = price > 0 ? (noiAnnual / price) * 100 : 0;
    setCapRate(calculatedCapRate);

    const totalCashInvested = dp; // Could add closing costs here if wanted
    const annualCashFlow = monthlyCashFlow * 12;
    const cashOnCashReturn = totalCashInvested > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;
    setCashOnCash(cashOnCashReturn);
  };

  useEffect(() => {
    calculate();
  }, [purchasePrice, downPayment, interestRate, loanTerm, rent, vacancyRate, propertyTaxes, insurance, maintenance, propertyManagement, hoa]);

  const expenseData = [
    { name: "Mortgage", value: monthlyMortgage, color: "#3b82f6" }, // blue-500
    { name: "Taxes", value: (parseFloat(propertyTaxes)||0)/12, color: "#f59e0b" }, // amber-500
    { name: "Insurance", value: (parseFloat(insurance)||0)/12, color: "#10b981" }, // emerald-500
    { name: "Maintenance", value: (parseFloat(maintenance)||0)/12, color: "#8b5cf6" }, // violet-500
    { name: "Management", value: (parseFloat(rent)||0) * ((parseFloat(propertyManagement)||0)/100), color: "#f43f5e" }, // rose-500
    { name: "HOA/Other", value: parseFloat(hoa)||0, color: "#64748b" } // slate-500
  ].filter(item => item.value > 0);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center shadow-inner">
            <Home size={26} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
            <p className="text-slate-500 text-sm">Analyze cash flow, ROI, and cap rate</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Inputs Section */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Financing Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Wallet size={20} className="text-blue-500" />
                Property & Financing
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                    Property Price
                    <span className="text-slate-400 font-normal">($)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                    <input 
                      type="number" min="0" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)}
                      className="w-full h-12 pl-7 pr-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                    Down Payment
                    <span className="text-slate-400 font-normal">($)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                    <input 
                      type="number" min="0" value={downPayment} onChange={(e) => setDownPayment(e.target.value)}
                      className="w-full h-12 pl-7 pr-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                    Interest Rate
                    <span className="text-slate-400 font-normal">(%)</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="number" step="0.1" min="0" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full h-12 pl-4 pr-8 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                    Loan Term
                    <span className="text-slate-400 font-normal">(Years)</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="number" min="1" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}
                      className="w-full h-12 pl-4 pr-14 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">Yrs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Income Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Activity size={20} className="text-emerald-500" />
                Income
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                    Gross Monthly Rent
                    <span className="text-slate-400 font-normal">($/mo)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                    <input 
                      type="number" min="0" value={rent} onChange={(e) => setRent(e.target.value)}
                      className="w-full h-12 pl-7 pr-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-semibold text-emerald-700"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                    Vacancy Rate
                    <span className="text-slate-400 font-normal">(%)</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="number" step="0.1" min="0" value={vacancyRate} onChange={(e) => setVacancyRate(e.target.value)}
                      className="w-full h-12 pl-4 pr-8 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Expenses Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
                <DollarSign size={20} className="text-rose-500" />
                Expenses
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                    Property Taxes
                    <span className="text-slate-400 font-normal">($/yr)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                    <input 
                      type="number" min="0" value={propertyTaxes} onChange={(e) => setPropertyTaxes(e.target.value)}
                      className="w-full h-12 pl-7 pr-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                    Home Insurance
                    <span className="text-slate-400 font-normal">($/yr)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                    <input 
                      type="number" min="0" value={insurance} onChange={(e) => setInsurance(e.target.value)}
                      className="w-full h-12 pl-7 pr-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                    Maintenance / Repairs
                    <span className="text-slate-400 font-normal">($/yr)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                    <input 
                      type="number" min="0" value={maintenance} onChange={(e) => setMaintenance(e.target.value)}
                      className="w-full h-12 pl-7 pr-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                    Property Management
                    <span className="text-slate-400 font-normal">(% of rent)</span>
                  </label>
                  <div className="relative">
                    <input 
                      type="number" step="0.1" min="0" value={propertyManagement} onChange={(e) => setPropertyManagement(e.target.value)}
                      className="w-full h-12 pl-4 pr-8 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                    HOA & Other Fees
                    <span className="text-slate-400 font-normal">($/mo)</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                    <input 
                      type="number" min="0" value={hoa} onChange={(e) => setHoa(e.target.value)}
                      className="w-full h-12 pl-7 pr-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Results Section */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-8 space-y-6">
              
              <div className={`rounded-3xl p-6 text-white shadow-xl relative overflow-hidden ${cashFlow >= 0 ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Activity size={120} />
                </div>
                
                <h4 className={`font-semibold mb-2 uppercase tracking-widest text-xs ${cashFlow >= 0 ? 'text-emerald-200' : 'text-rose-200'}`}>Monthly Cash Flow</h4>
                
                <div className="flex items-end gap-2 mb-2">
                  <span className={`text-3xl font-bold pb-1 ${cashFlow >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>
                    {cashFlow < 0 ? '-' : ''}$
                  </span>
                  <span className="text-5xl font-black text-white truncate">
                    {Math.abs(cashFlow).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <p className={`text-sm ${cashFlow >= 0 ? 'text-emerald-200' : 'text-rose-200'}`}>
                  {cashFlow >= 0 ? 'Positive cash flow!' : 'Negative cash flow'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Cap Rate</p>
                    <div className="text-slate-400" title="Capitalization Rate = NOI / Property Value">
                      <HelpCircle size={14} />
                    </div>
                  </div>
                  <p className="text-xl font-bold text-slate-800">{capRate.toFixed(2)}%</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Cash on Cash</p>
                    <div className="text-slate-400" title="Cash on Cash Return = Annual Cash Flow / Total Invested">
                      <HelpCircle size={14} />
                    </div>
                  </div>
                  <p className="text-xl font-bold text-slate-800">{cashOnCash.toFixed(2)}%</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-4">
                  <PieChartIcon size={16} className="text-blue-500" />
                  Monthly Expense Breakdown
                </h4>
                
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-emerald-600">Effective Gross Income</span>
                  <span className="font-bold text-emerald-700">${grossIncome.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-200">
                  <span className="text-sm font-semibold text-rose-500">Total Expenses & Mortgage</span>
                  <span className="font-bold text-rose-600">-${(operatingExpenses + monthlyMortgage).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>

                {(operatingExpenses > 0 || monthlyMortgage > 0) && (
                  <div className="w-full h-48 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={expenseData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {expenseData.map((entry, index) => (
                            <Cell key={"cell-" + index} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value: any) => {
                            const numericValue = Number(value);
                            return !isNaN(numericValue) ? "$" + numericValue.toLocaleString(undefined, { maximumFractionDigits: 0 }) : value;
                          }}
                          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
