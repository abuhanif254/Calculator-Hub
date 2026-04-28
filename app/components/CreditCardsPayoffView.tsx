"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { CreditCard, CalendarDays, PieChart, Info, Layers, TrendingDown, Clock, ShieldCheck } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip, Legend } from "recharts";

interface CreditCardsPayoffViewProps {
  calcDef: CalculatorDef;
}

export function CreditCardsPayoffView({ calcDef }: CreditCardsPayoffViewProps) {
  const t = useTranslations("CreditCardsPayoff");

  const [balance, setBalance] = useState<string>("5000");
  const [interestRate, setInterestRate] = useState<string>("19.9");
  const [calcMode, setCalcMode] = useState<"paymo" | "paytime">("paymo");
  const [currencySymbol, setCurrencySymbol] = useState<string>("$");
  
  // For paymo mode
  const [monthlyPayment, setMonthlyPayment] = useState<string>("150");
  // For paytime mode
  const [monthsToPayoff, setMonthsToPayoff] = useState<string>("24");

  const [resultMonths, setResultMonths] = useState<number>(0);
  const [resultPayment, setResultPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [schedule, setSchedule] = useState<any[]>([]);

  useEffect(() => {
    const bal = parseFloat(balance) || 0;
    const rate = parseFloat(interestRate) || 0;
    setErrorMsg("");

    if (bal <= 0) {
      setResultMonths(0);
      setResultPayment(0);
      setTotalInterest(0);
      setTotalPaid(0);
      setSchedule([]);
      return;
    }

    const unroundedRateMonthly = rate / 100 / 12;
    let actualPayment = 0;
    let totalMonths = 0;

    if (calcMode === "paymo") {
      actualPayment = parseFloat(monthlyPayment) || 0;
      
      if (actualPayment <= bal * unroundedRateMonthly && rate > 0) {
        // Fallback message if translation is missing
        setErrorMsg(t("errorPaymentTooLow") === "CreditCardsPayoff.errorPaymentTooLow" 
          ? "Your monthly payment is too low. It doesn't even cover the monthly interest charges!" 
          : t("errorPaymentTooLow"));
        setResultMonths(0);
        setTotalInterest(0);
        setTotalPaid(0);
        setSchedule([]);
        return;
      }
      
      if (rate === 0) {
        totalMonths = Math.ceil(bal / actualPayment);
      } else {
        totalMonths = Math.ceil(-Math.log(1 - (unroundedRateMonthly * bal) / actualPayment) / Math.log(1 + unroundedRateMonthly));
      }
    } else {
      totalMonths = parseInt(monthsToPayoff) || 1;
      
      if (rate === 0) {
        actualPayment = bal / totalMonths;
      } else {
        actualPayment = bal * (unroundedRateMonthly * Math.pow(1 + unroundedRateMonthly, totalMonths)) / (Math.pow(1 + unroundedRateMonthly, totalMonths) - 1);
      }
    }

    setResultMonths(totalMonths);
    setResultPayment(actualPayment);
    
    // Generate Schedule
    let currentBalance = bal;
    let cumInterest = 0;
    let cumPrincipal = 0;
    const newSchedule = [];
    
    const maxMonths = 1200; // Safeguard against infinite loops (100 years max)
    let m = 0;

    if (rate === 0) {
      for (let i = 1; i <= totalMonths && m < maxMonths; i++) {
         m++;
         let pmt = actualPayment;
         if (currentBalance < actualPayment) pmt = currentBalance;
         currentBalance -= pmt;
         cumPrincipal += pmt;
         newSchedule.push({
            month: i,
            payment: pmt,
            principal: pmt,
            interest: 0,
            totalInterest: 0,
            balance: Math.max(0, currentBalance),
            yearMarker: i % 12 === 0 ? i / 12 : null
         });
         if (currentBalance <= 0) break;
      }
    } else {
       for (let i = 1; i <= totalMonths && m < maxMonths; i++) {
         m++;
         let interestForMonth = currentBalance * unroundedRateMonthly;
         let principalForMonth = actualPayment - interestForMonth;
         
         if (currentBalance < principalForMonth || i === totalMonths) {
           principalForMonth = currentBalance;
           actualPayment = principalForMonth + interestForMonth;
         }
         
         currentBalance -= principalForMonth;
         if (currentBalance < 0.01) currentBalance = 0; 
         
         cumInterest += interestForMonth;
         cumPrincipal += principalForMonth;
         
         newSchedule.push({
            month: i,
            payment: actualPayment,
            principal: principalForMonth,
            interest: interestForMonth,
            totalInterest: cumInterest,
            balance: currentBalance,
            yearMarker: i % 12 === 0 ? i / 12 : null
         });
         if (currentBalance <= 0) break;
       }
    }

    setTotalInterest(cumInterest);
    setTotalPaid(cumPrincipal + cumInterest);
    setSchedule(newSchedule);

  }, [balance, interestRate, calcMode, monthlyPayment, monthsToPayoff, t]);

  const years = Math.floor(resultMonths / 12);
  const remainingMonths = resultMonths % 12;

  // Fallbacks for translations if next-intl keys are not found
  const getTrans = (key: string, fallback: string) => {
      const translated = t(key);
      return translated === `CreditCardsPayoff.${key}` ? fallback : translated;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto flex flex-col">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-rose-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center shadow-inner shrink-0">
               <CreditCard size={24} strokeWidth={2.5} />
            </div>
            <div>
               <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
               <p className="text-sm text-slate-500 font-medium">
                   {getTrans("subtitle", "See how long it will take to become debt-free.")}
               </p>
            </div>
        </div>
      </div>

      <div className="p-6 md:p-10 space-y-10">

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-200">
           
           <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase px-2" htmlFor="cc-balance">
                  {getTrans("balance", "Current Balance")}
              </label>
              <div className="relative flex rounded-2xl border-2 border-slate-200 overflow-hidden focus-within:border-rose-500 focus-within:ring-4 focus-within:ring-rose-500/20 transition-all bg-white">
                 <div className="absolute inset-y-0 start-0 flex items-center bg-slate-50 border-r border-slate-200">
                    <select
                        className="h-full py-0 pl-3 pr-7 bg-transparent text-slate-600 font-bold text-lg focus:ring-rose-500 outline-none cursor-pointer appearance-none"
                        value={currencySymbol}
                        onChange={(e) => setCurrencySymbol(e.target.value)}
                        aria-label="Select Currency"
                    >
                        <option value="$">US$</option>
                        <option value="€">€</option>
                        <option value="£">£</option>
                        <option value="¥">¥</option>
                        <option value="₹">₹</option>
                        <option value="A$">A$</option>
                        <option value="C$">C$</option>
                        <option value="₱">₱</option>
                    </select>
                 </div>
                 <input 
                    id="cc-balance"
                    type="number"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="flex-1 text-2xl font-bold text-slate-800 p-4 pl-20 outline-none w-full"
                    placeholder="5000"
                 />
              </div>
           </div>

           <div className="flex flex-col space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase px-2" htmlFor="cc-interest">
                  {getTrans("interestRate", "Interest Rate (APR)")}
              </label>
              <div className="relative flex rounded-2xl border-2 border-slate-200 overflow-hidden focus-within:border-rose-500 focus-within:ring-4 focus-within:ring-rose-500/20 transition-all bg-white">
                 <input 
                    id="cc-interest"
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="flex-1 text-2xl font-bold text-slate-800 p-4 pl-5 outline-none w-full"
                    placeholder="19.9"
                 />
                 <div className="pr-5 flex items-center text-slate-400 font-bold text-xl">%</div>
              </div>
           </div>

           <div className="col-span-1 md:col-span-2 pt-4 border-t border-slate-200 mt-2">
              <label className="text-sm font-bold text-slate-500 uppercase px-2 mb-3 block">
                  {getTrans("calcGoal", "Calculation Goal")}
              </label>
              <div className="flex flex-col md:flex-row gap-4">
                 
                 <div 
                    role="button"
                    tabIndex={0}
                    className={`flex-1 flex flex-col p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${calcMode === 'paymo' ? 'border-rose-500 bg-rose-50/50 shadow-md ring-rose-500/20 ring-4' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`} 
                    onClick={() => setCalcMode("paymo")}
                    onKeyDown={(e) => e.key === 'Enter' && setCalcMode("paymo")}
                 >
                    <div className="flex items-center gap-2 mb-3">
                       <input type="radio" checked={calcMode === "paymo"} readOnly className="w-4 h-4 text-rose-600 focus:ring-rose-500 pointer-events-none" />
                       <span className={`font-bold ${calcMode === 'paymo' ? 'text-rose-800' : 'text-slate-700'}`}>
                           {getTrans("goalFixedPayment", "I want to pay a fixed amount each month")}
                       </span>
                    </div>
                    {calcMode === 'paymo' && (
                       <div className="relative flex rounded-xl border border-rose-300 overflow-hidden bg-white mt-1 shadow-inner">
                          <div className="pl-3 flex items-center text-rose-500 font-bold">
                             {currencySymbol}
                          </div>
                          <input 
                             type="number"
                             value={monthlyPayment}
                             onChange={(e) => setMonthlyPayment(e.target.value)}
                             className="flex-1 text-lg font-bold text-slate-800 p-2 outline-none w-full"
                             onClick={(e) => e.stopPropagation()}
                             aria-label="Monthly Payment"
                          />
                       </div>
                    )}
                 </div>

                 <div 
                    role="button"
                    tabIndex={0}
                    className={`flex-1 flex flex-col p-4 rounded-2xl border-2 transition-all cursor-pointer select-none ${calcMode === 'paytime' ? 'border-rose-500 bg-rose-50/50 shadow-md ring-rose-500/20 ring-4' : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'}`} 
                    onClick={() => setCalcMode("paytime")}
                    onKeyDown={(e) => e.key === 'Enter' && setCalcMode("paytime")}
                 >
                    <div className="flex items-center gap-2 mb-3">
                       <input type="radio" checked={calcMode === "paytime"} readOnly className="w-4 h-4 text-rose-600 focus:ring-rose-500 pointer-events-none" />
                       <span className={`font-bold ${calcMode === 'paytime' ? 'text-rose-800' : 'text-slate-700'}`}>
                           {getTrans("goalFixedTime", "I want to pay it off in a specific time")}
                       </span>
                    </div>
                    {calcMode === 'paytime' && (
                       <div className="relative flex rounded-xl border border-rose-300 overflow-hidden bg-white mt-1 group shadow-inner">
                          <input 
                             type="number"
                             value={monthsToPayoff}
                             onChange={(e) => setMonthsToPayoff(e.target.value)}
                             className="flex-1 text-lg font-bold text-slate-800 p-2 pl-4 outline-none w-full"
                             onClick={(e) => e.stopPropagation()}
                             aria-label="Months to Payoff"
                          />
                          <div className="pr-4 flex items-center text-rose-500 font-bold text-xs uppercase bg-rose-50 px-3 border-l border-rose-200">
                              {getTrans("monthsShort", "months")}
                          </div>
                       </div>
                    )}
                 </div>

              </div>
           </div>

        </div>

        {/* Results */}
        {errorMsg ? (
           <div className="p-6 bg-red-50 border border-red-200 text-red-700 rounded-2xl flex items-start gap-3 shadow-sm animate-in fade-in slide-in-from-bottom-2">
              <Info size={24} className="shrink-0 mt-0.5" />
              <div>
                 <h4 className="font-bold mb-1">Calculation Error</h4>
                 <p>{errorMsg}</p>
                 <p className="mt-2 text-sm opacity-80">Increase your monthly payment to see your payoff schedule.</p>
              </div>
           </div>
        ) : (
          <div className="space-y-8 animate-in fade-in">
            <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-2xl border border-slate-700">
               <div className="absolute top-0 right-0 -mt-10 -mr-10 text-slate-700/30 pointer-events-none">
                  <PieChart size={300} strokeWidth={0.5} />
               </div>
               
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div>
                     <p className="text-rose-300 font-bold uppercase tracking-wider text-sm mb-2 flex items-center gap-2">
                        {calcMode === 'paymo' ? <CalendarDays size={16}/> : <TrendingDown size={16}/>}
                        {calcMode === 'paymo' ? getTrans("timeToPayoff", "Time to Payoff") : getTrans("requiredPayment", "Required Monthly Payment")}
                     </p>
                     
                     {calcMode === 'paymo' ? (
                        <div className="flex items-baseline gap-2 mb-4 drop-shadow-md">
                           {years > 0 && (
                              <>
                                 <span className="text-5xl md:text-6xl font-black tracking-tight">{years}</span>
                                 <span className="text-xl font-medium text-slate-400">{getTrans("years", "yrs")}</span>
                              </>
                           )}
                           <span className="text-5xl md:text-6xl font-black tracking-tight">{remainingMonths}</span>
                           <span className="text-xl font-medium text-slate-400">{getTrans("months", "mos")}</span>
                        </div>
                     ) : (
                        <div className="flex items-baseline gap-1 mb-4 drop-shadow-md">
                           <span className="text-3xl font-medium text-rose-300">{currencySymbol}</span>
                           <span className="text-5xl md:text-6xl font-black tracking-tight">{resultPayment.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                           <span className="text-xl font-medium text-slate-400 ml-2">/ {getTrans("mo", "mo")}</span>
                        </div>
                     )}

                     <div className="h-2 w-full bg-slate-800 rounded-full mt-8 mb-6 overflow-hidden flex shadow-inner border border-slate-700/50">
                        <div className="bg-rose-500 h-full transition-all duration-1000 ease-out" style={{ width: `${(parseFloat(balance) / totalPaid) * 100}%` }}></div>
                        <div className="bg-orange-400 h-full transition-all duration-1000 ease-out" style={{ width: `${(totalInterest / totalPaid) * 100}%` }}></div>
                     </div>

                  </div>

                  <div className="space-y-4">
                     <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-xs tracking-wider">
                           <div className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></div> 
                           {getTrans("principal", "Principal")}
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">{currencySymbol}{parseFloat(balance || "0").toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                     </div>
                     <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-xs tracking-wider">
                           <div className="w-3 h-3 rounded-full bg-orange-400 shadow-sm shadow-orange-400/50"></div> 
                           {getTrans("totalInterest", "Total Interest")}
                        </div>
                        <span className="text-xl font-bold text-white tracking-tight">{currencySymbol}{totalInterest.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                     </div>
                     <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-4 rounded-2xl flex items-center justify-between mt-2 border-t-4 border-t-slate-900 shadow-sm relative overflow-hidden">
                        <div className="absolute inset-0 bg-rose-500/10"></div>
                        <div className="flex items-center gap-2 text-slate-200 font-bold uppercase text-xs tracking-wider relative z-10">
                            {getTrans("totalPaid", "Total Amount Paid")}
                        </div>
                        <span className="text-xl font-black text-rose-300 tracking-tight relative z-10">{currencySymbol}{totalPaid.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2})}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* CHART */}
            {schedule.length > 0 && (
                <div className="mt-8 bg-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8">
                    <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg">
                        <TrendingDown className="text-rose-500" /> Payoff Progress Over Time
                    </h3>
                    <div className="h-64 md:h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={schedule} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis 
                                    dataKey="month" 
                                    tickFormatter={(v) => `Mo ${v}`} 
                                    minTickGap={30}
                                    stroke="#94a3b8" 
                                    fontSize={12} 
                                    tickLine={false}
                                />
                                <YAxis 
                                    tickFormatter={(v) => `${currencySymbol}${v >= 1000 ? (v/1000).toFixed(0) + 'k' : v}`} 
                                    stroke="#94a3b8" 
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <RechartsTooltip 
                                    formatter={(value: number, name: string) => [`${currencySymbol}${value.toFixed(2)}`, name === 'balance' ? 'Remaining Balance' : 'Cumulative Interest']}
                                    labelFormatter={(label) => `Month ${label}`}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ fontWeight: 'bold' }}
                                />
                                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '14px', fontWeight: 500 }} />
                                <Area type="monotone" dataKey="balance" name="Remaining Balance" stroke="#f43f5e" fillOpacity={1} fill="url(#colorBalance)" strokeWidth={3} />
                                <Area type="monotone" dataKey="totalInterest" name="Total Interest Paid" stroke="#f97316" fillOpacity={1} fill="url(#colorInterest)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* AMORTIZATION SCHEDULE TABLE */}
            {schedule.length > 0 && (
                <div className="mt-8 overflow-hidden border border-slate-200 rounded-3xl bg-white shadow-sm">
                    <div className="bg-slate-50 p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2 text-lg">
                            <Layers className="text-blue-500" />
                            Amortization Schedule
                        </h3>
                        <p className="text-sm text-slate-500 font-medium max-w-sm">
                            A month-by-month breakdown of how your payments are applied to principal and interest.
                        </p>
                    </div>
                    <div className="overflow-x-auto max-h-[600px] overflow-y-auto custom-scrollbar">
                        <table className="w-full text-sm text-left whitespace-nowrap">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0 z-10 shadow-sm border-b border-slate-200">
                                <tr>
                                <th className="px-6 py-4 font-bold tracking-wider">Month</th>
                                <th className="px-6 py-4 font-bold tracking-wider text-right">Payment</th>
                                <th className="px-6 py-4 font-bold tracking-wider text-right">Principal</th>
                                <th className="px-6 py-4 font-bold tracking-wider text-right">Interest</th>
                                <th className="px-6 py-4 font-bold tracking-wider text-right">Total Interest</th>
                                <th className="px-6 py-4 font-bold tracking-wider text-right">Remaining Balance</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {schedule.map((row, i) => (
                                <React.Fragment key={i}>
                                    <tr className="hover:bg-slate-50/80 transition-colors">
                                        <td className="px-6 py-3 text-slate-600 font-medium">Month {row.month}</td>
                                        <td className="px-6 py-3 font-semibold text-slate-900 text-right bg-slate-50/30">{currencySymbol}{row.payment.toFixed(2)}</td>
                                        <td className="px-6 py-3 text-emerald-600 font-medium text-right">{currencySymbol}{row.principal.toFixed(2)}</td>
                                        <td className="px-6 py-3 text-orange-600 font-medium text-right bg-orange-50/20">{currencySymbol}{row.interest.toFixed(2)}</td>
                                        <td className="px-6 py-3 text-slate-500 text-right">{currencySymbol}{row.totalInterest.toFixed(2)}</td>
                                        <td className="px-6 py-3 font-bold text-slate-800 text-right bg-slate-50/50">{currencySymbol}{row.balance.toFixed(2)}</td>
                                    </tr>
                                    {row.yearMarker && row.balance > 0 && (
                                        <tr className="bg-slate-100/50 border-y-2 border-y-slate-200">
                                            <td colSpan={6} className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-widest text-center shadow-inner">
                                            End of Year {row.yearMarker}
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            
            {/* Added Value SEO Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 pt-8 border-t border-slate-100">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                    <h4 className="flex items-center gap-2 font-bold text-blue-900 mb-3">
                        <Clock size={20} className="text-blue-600" /> Increase Payments, Save Money
                    </h4>
                    <p className="text-blue-800/80 text-sm leading-relaxed">
                        Credit cards use compound interest, which means you pay interest on your interest. Adding just $50 to your regular monthly payment can shave months (or years) off your timeline and save you hundreds in interest over the lifespan of the debt.
                    </p>
                </div>
                <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                    <h4 className="flex items-center gap-2 font-bold text-emerald-900 mb-3">
                        <ShieldCheck size={20} className="text-emerald-600" /> Private & Secure
                    </h4>
                    <p className="text-emerald-800/80 text-sm leading-relaxed">
                        Your financial privacy is guaranteed. All figures and values you enter into this credit card payoff calculator are processed directly in your web browser. No personal data is stored, sent, or saved to our servers.
                    </p>
                </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

