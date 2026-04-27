"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend } from 'recharts';

interface AutoLoanCalculatorViewProps {
  calcDef: CalculatorDef;
}

export function AutoLoanCalculatorView({ calcDef }: AutoLoanCalculatorViewProps) {
  const t = useTranslations("AutoLoanCalculator");
  
  const [vehiclePrice, setVehiclePrice] = useState<number>(30000);
  const [downPayment, setDownPayment] = useState<number>(6000);
  const [loanTerm, setLoanTerm] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number | null>(null);

  const calculate = useMemo(() => () => {
    const principal = vehiclePrice - downPayment;
    if (principal <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setTotalCost(vehiclePrice);
      return;
    }

    const r = interestRate / 100 / 12;
    const n = loanTerm;

    let monthly = 0;
    if (r === 0) {
      monthly = principal / n;
    } else {
      monthly = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPaid = monthly * n;
    const interest = totalPaid - principal;

    setMonthlyPayment(monthly);
    setTotalInterest(interest);
    setTotalCost(vehiclePrice + interest);
  }, [vehiclePrice, downPayment, loanTerm, interestRate]);

  useEffect(() => {
    calculate();
  }, [calculate]);

  const chartData = [
    { name: 'Principal', value: Math.max(0, vehiclePrice - downPayment), color: '#3b82f6' },
    { name: 'Total Interest', value: totalInterest || 0, color: '#f59e0b' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("vehiclePrice")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={vehiclePrice || ""}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("downPayment")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={downPayment || ""}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("loanTerm")}</label>
            <input 
              type="number"
              value={loanTerm || ""}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
            />
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

          <button onClick={calculate} className="w-full mt-4 h-14 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-colors">
            {t("calculateButton")}
          </button>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col border border-slate-100 h-full">
          {monthlyPayment === null ? (
            <div className="text-slate-400 flex-1 flex items-center justify-center font-medium text-lg text-center h-full min-h-[300px]">
              Enter your details to see<br/>your loan breakdown
            </div>
          ) : (
            <div className="w-full flex-1 flex flex-col space-y-6">
              <div className="text-center pb-6 border-b border-slate-200">
                <div className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">{t("monthlyPayment")}</div>
                <div className="text-5xl md:text-6xl font-extrabold text-blue-600">
                  ${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="flex-1 w-full min-h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value: any) => `$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4 pt-4 text-slate-700 border-t border-slate-200">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium text-slate-500 flex items-center"><span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>Principal</span>
                  <span className="font-bold text-slate-800">${Math.max(0, vehiclePrice - downPayment).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-lg">
                  <span className="font-medium text-slate-500 flex items-center"><span className="w-3 h-3 rounded-full bg-amber-500 mr-2"></span>{t("totalInterest")}</span>
                  <span className="font-bold text-slate-800">${totalInterest?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-center text-lg pt-4 border-t border-slate-200">
                  <span className="font-medium text-slate-500">{t("totalCost")}</span>
                  <span className="font-bold text-slate-800">${totalCost?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
