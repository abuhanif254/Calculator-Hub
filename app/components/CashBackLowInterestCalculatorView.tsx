"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  calcDef: CalculatorDef;
}

export function CashBackLowInterestCalculatorView({ calcDef }: Props) {
  const t = useTranslations("CashBackLowInterest");
  
  const [vehiclePrice, setVehiclePrice] = useState<number>(30000);
  const [cashBackAmount, setCashBackAmount] = useState<number>(3000);
  const [lowInterestRate, setLowInterestRate] = useState<number>(0.9);
  const [standardInterestRate, setStandardInterestRate] = useState<number>(4.5);
  const [loanTerm, setLoanTerm] = useState<number>(60);
  const [downPayment, setDownPayment] = useState<number>(2000);
  const [tradeIn, setTradeIn] = useState<number>(3000);

  const [results, setResults] = useState<{
    cbMonthly: number;
    cbTotalInterest: number;
    cbTotalCost: number;
    liMonthly: number;
    liTotalInterest: number;
    liTotalCost: number;
    isCashBackBetter: boolean;
    savings: number;
    chartData: any[];
  } | null>(null);

  function calculateResults() {
    const principalBeforeCashback = vehiclePrice - downPayment - tradeIn;
    
    // Cash Back Option
    const cbPrincipal = principalBeforeCashback - cashBackAmount;
    let cbMonthly = 0;
    let cbTotalInterest = 0;
    let cbTotalCost = 0;

    if (cbPrincipal > 0) {
      if (standardInterestRate > 0) {
        const r = (standardInterestRate / 100) / 12;
        cbMonthly = (cbPrincipal * r * Math.pow(1 + r, loanTerm)) / (Math.pow(1 + r, loanTerm) - 1);
      } else {
        cbMonthly = cbPrincipal / loanTerm;
      }
      cbTotalCost = cbMonthly * loanTerm;
      cbTotalInterest = cbTotalCost - cbPrincipal;
    }

    // Low Interest Option
    const liPrincipal = principalBeforeCashback;
    let liMonthly = 0;
    let liTotalInterest = 0;
    let liTotalCost = 0;

    if (liPrincipal > 0) {
      if (lowInterestRate > 0) {
        const r = (lowInterestRate / 100) / 12;
        liMonthly = (liPrincipal * r * Math.pow(1 + r, loanTerm)) / (Math.pow(1 + r, loanTerm) - 1);
      } else {
        liMonthly = liPrincipal / loanTerm;
      }
      liTotalCost = liMonthly * loanTerm;
      liTotalInterest = liTotalCost - liPrincipal;
    }
    
    const isCashBackBetter = cbTotalCost < liTotalCost;
    const savings = Math.abs(cbTotalCost - liTotalCost);

    setResults({
      cbMonthly, cbTotalInterest, cbTotalCost,
      liMonthly, liTotalInterest, liTotalCost,
      isCashBackBetter,
      savings,
      chartData: [
        {
          name: t("cashBackOption"),
          [t("principal")]: cbPrincipal,
          [t("totalInterest")]: cbTotalInterest
        },
        {
          name: t("lowInterestOption"),
          [t("principal")]: liPrincipal,
          [t("totalInterest")]: liTotalInterest
        }
      ]
    });
  }

  useEffect(() => {
    calculateResults();
  }, [vehiclePrice, cashBackAmount, lowInterestRate, standardInterestRate, loanTerm, downPayment, tradeIn, t]);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
        <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-5">
          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("vehiclePrice")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={vehiclePrice === 0 ? "" : vehiclePrice}
                onChange={(e) => setVehiclePrice(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("cashBackAmount")}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
              <input 
                type="number"
                value={cashBackAmount === 0 ? "" : cashBackAmount}
                onChange={(e) => setCashBackAmount(Number(e.target.value))}
                className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">{t("lowInterestRate")}</label>
              <div className="relative">
                <input 
                  type="number"
                  step="0.1"
                  value={lowInterestRate === 0 ? "" : lowInterestRate}
                  onChange={(e) => setLowInterestRate(Number(e.target.value))}
                  className="w-full pr-8 pl-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 whitespace-nowrap">{t("standardInterestRate")}</label>
              <div className="relative">
                <input 
                  type="number"
                  step="0.1"
                  value={standardInterestRate === 0 ? "" : standardInterestRate}
                  onChange={(e) => setStandardInterestRate(Number(e.target.value))}
                  className="w-full pr-8 pl-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">%</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">{t("loanTerm")}</label>
            <input 
              type="number"
              value={loanTerm === 0 ? "" : loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("downPayment")}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                <input 
                  type="number"
                  value={downPayment === 0 ? "" : downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">{t("tradeIn")}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                <input 
                  type="number"
                  value={tradeIn === 0 ? "" : tradeIn}
                  onChange={(e) => setTradeIn(Number(e.target.value))}
                  className="w-full pl-8 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm"
                />
              </div>
            </div>
          </div>

        </div>

        <div className="md:col-span-8 bg-slate-50 rounded-2xl p-6 md:p-8 flex flex-col border border-slate-100">
          {!results ? null : (
            <div className="w-full space-y-8 flex-1 flex flex-col">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-800 text-lg">{t("resultsTitle")}</h3>
              </div>
              
              <div className="bg-purple-100 text-purple-900 border border-purple-200 rounded-xl p-4 text-center">
                <h4 className="text-lg font-bold mb-1">
                  {results.isCashBackBetter ? t("takeCashBack") : t("takeLowInterest")}
                </h4>
                <p className="text-sm text-purple-800 font-medium">
                  {t("savings", { 
                    amount: "$" + results.savings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                    option: results.isCashBackBetter ? t("cashBackOption") : t("lowInterestOption")
                  })}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Cash Back Box */}
                <div className={`bg-white p-5 rounded-xl border shadow-sm ${results.isCashBackBetter ? 'border-purple-400 ring-2 ring-purple-400/20' : 'border-slate-200 opacity-80'}`}>
                  <div className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4 text-center">{t("cashBackOption")}</div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">{t("monthlyPayment")}</span>
                      <span className="font-bold text-slate-800">${results.cbMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">{t("totalInterest")}</span>
                      <span className="font-bold text-slate-800">${results.cbTotalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                      <span className="font-bold text-slate-700">{t("totalCost")}</span>
                      <span className="font-extrabold text-lg text-slate-900">${results.cbTotalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

                {/* Low Interest Box */}
                <div className={`bg-white p-5 rounded-xl border shadow-sm ${!results.isCashBackBetter ? 'border-purple-400 ring-2 ring-purple-400/20' : 'border-slate-200 opacity-80'}`}>
                  <div className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4 text-center">{t("lowInterestOption")}</div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">{t("monthlyPayment")}</span>
                      <span className="font-bold text-slate-800">${results.liMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">{t("totalInterest")}</span>
                      <span className="font-bold text-slate-800">${results.liTotalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                      <span className="font-bold text-slate-700">{t("totalCost")}</span>
                      <span className="font-extrabold text-lg text-slate-900">${results.liTotalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex-1 min-h-[250px] w-full mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} />
                    <Tooltip 
                      formatter={(value: any) => `$${Number(value).toLocaleString(undefined, {maximumFractionDigits: 0})}`}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      cursor={{fill: 'rgba(0,0,0,0.02)'}}
                    />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
                    <Bar dataKey={t("principal")} stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
                    <Bar dataKey={t("totalInterest")} stackId="a" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
