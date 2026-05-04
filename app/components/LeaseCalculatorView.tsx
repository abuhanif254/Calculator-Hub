"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export function LeaseCalculatorView({ calcDef }: { calcDef?: CalculatorDef }) {
  const [vehiclePrice, setVehiclePrice] = useState<number>(30000);
  const [downPayment, setDownPayment] = useState<number>(2000);
  const [tradeInValue, setTradeInValue] = useState<number>(0);
  const [leaseTerm, setLeaseTerm] = useState<number>(36);
  const [interestRate, setInterestRate] = useState<number>(4.5);
  const [salesTaxRate, setSalesTaxRate] = useState<number>(7.0);
  const [residualValuePercentage, setResidualValuePercentage] = useState<number>(55); // % of MSRP

  // Results
  const [monthlyDepreciation, setMonthlyDepreciation] = useState<number>(0);
  const [monthlyFinanceCharge, setMonthlyFinanceCharge] = useState<number>(0);
  const [monthlyTaxes, setMonthlyTaxes] = useState<number>(0);
  const [totalMonthlyPayment, setTotalMonthlyPayment] = useState<number>(0);
  const [totalLeaseCost, setTotalLeaseCost] = useState<number>(0);
  
  const t = useTranslations("calculator");

  useEffect(() => {
    function calculate() {
      // Step 1: Capitalized Cost (Cap Cost)
      const capCost = vehiclePrice - downPayment - tradeInValue;
      if (capCost <= 0) return;

      // Step 2: Residual Value
      const residualValue = vehiclePrice * (residualValuePercentage / 100);

      // Step 3: Monthly Depreciation
      const depreciation = (capCost - residualValue) / leaseTerm;
      const _monthlyDepreciation = depreciation > 0 ? depreciation : 0;
      setMonthlyDepreciation(_monthlyDepreciation);

      // Step 4: Monthly Finance (Rent) Charge
      // Money Factor = APR / 2400
      const moneyFactor = interestRate / 2400;
      const rentCharge = (capCost + residualValue) * moneyFactor;
      setMonthlyFinanceCharge(rentCharge);

      // Step 5: Base Monthly Payment
      const baseMonthly = _monthlyDepreciation + rentCharge;

      // Step 6: Monthly Taxes
      const taxes = baseMonthly * (salesTaxRate / 100);
      setMonthlyTaxes(taxes);

      // Total Monthly Payment
      const totalMonthly = baseMonthly + taxes;
      setTotalMonthlyPayment(totalMonthly);

      // Total Cost of Lease
      const totalCost = (totalMonthly * leaseTerm) + downPayment + tradeInValue;
      setTotalLeaseCost(totalCost);
    }
    
    calculate();
  }, [vehiclePrice, downPayment, tradeInValue, leaseTerm, interestRate, salesTaxRate, residualValuePercentage]);

  const chartData = [
    { name: "Depreciation", value: monthlyDepreciation },
    { name: "Finance Charge", value: monthlyFinanceCharge },
    { name: "Taxes", value: monthlyTaxes }
  ];

  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6'];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: Interactive Controls */}
        <div className="p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/50">
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-800">Vehicle Details</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Vehicle Price / MSRP ($)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                    <span className="text-slate-400 font-medium">$</span>
                  </div>
                  <input
                    type="number"
                    value={vehiclePrice === 0 ? '' : vehiclePrice}
                    onChange={(e) => setVehiclePrice(Number(e.target.value))}
                    className="w-full ps-8 pe-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Trade-in Value ($)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-4 pointer-events-none">
                      <span className="text-slate-400 font-medium">$</span>
                    </div>
                    <input
                      type="number"
                      value={tradeInValue === 0 ? '' : tradeInValue}
                      onChange={(e) => setTradeInValue(Number(e.target.value))}
                      className="w-full ps-8 pe-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium"
                    />
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-800 mt-4 pt-4 border-t border-slate-200">Lease Terms</h2>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Lease Term (Months)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={leaseTerm}
                      onChange={(e) => setLeaseTerm(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Interest Rate (APR %)</label>
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Residual Value (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={residualValuePercentage}
                      onChange={(e) => setResidualValuePercentage(Number(e.target.value))}
                      className="w-full pe-8 ps-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium"
                    />
                    <div className="absolute inset-y-0 end-0 flex items-center pe-4 pointer-events-none">
                      <span className="text-slate-400 font-medium">%</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Sales Tax (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={salesTaxRate}
                      onChange={(e) => setSalesTaxRate(Number(e.target.value))}
                      className="w-full pe-8 ps-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-slate-700 font-medium"
                    />
                    <div className="absolute inset-y-0 end-0 flex items-center pe-4 pointer-events-none">
                      <span className="text-slate-400 font-medium">%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Results Display */}
        <div className="p-6 md:p-10 bg-white">
          <div className="h-full flex flex-col space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 col-span-2">
                <p className="text-sm font-semibold text-blue-600/80 mb-1">Total Monthly Payment</p>
                <div className="text-4xl font-bold text-blue-700 tracking-tight">
                  <span className="text-blue-400 mr-1">$</span>
                  {totalMonthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-sm font-semibold text-slate-500 mb-1">Total Lease Cost</p>
                <div className="text-2xl font-bold text-slate-800 tracking-tight">
                  ${totalLeaseCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <p className="text-sm font-semibold text-slate-500 mb-1">Residual Value</p>
                <div className="text-2xl font-bold text-slate-800 tracking-tight">
                  ${(vehiclePrice * (residualValuePercentage/100)).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </div>
              </div>
            </div>

            {/* Dynamic Visualization */}
            <div className="flex-1 mt-6 relative min-h-[250px]">
              <h3 className="text-center text-sm font-bold text-slate-600 mb-2">Monthly Payment Breakdown</h3>
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
            
          </div>
        </div>
      </div>
    </div>
  );
}
