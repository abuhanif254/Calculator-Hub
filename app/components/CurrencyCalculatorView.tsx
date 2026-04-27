"use client";

import React, { useState, useEffect } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { DollarSign, ArrowLeftRight, Coins, RefreshCw } from "lucide-react";

interface CurrencyCalculatorViewProps {
  calcDef: CalculatorDef;
}

const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.0,
  CAD: 1.35,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.20,
  MXN: 16.50,
  BRL: 5.00,
  INR: 83.00,
  RUB: 92.50,
  ZAR: 18.80
};

export function CurrencyCalculatorView({ calcDef }: CurrencyCalculatorViewProps) {
  const t = useTranslations("CurrencyCalculator");

  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorObj, setErrorObj] = useState<string>("");

  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  
  const [fromAmount, setFromAmount] = useState<string>("1.00");
  const [toAmount, setToAmount] = useState<string>("");

  const fetchRates = async () => {
    setIsLoading(true);
    setErrorObj("");
    try {
      // Using a public free API for exchange rates (requires no API key)
      const res = await fetch("https://open.er-api.com/v6/latest/USD");
      if (!res.ok) throw new Error("API response not ok");
      const data = await res.json();
      if (data && data.rates) {
        setRates(data.rates);
        const date = new Date(data.time_last_update_unix * 1000);
        setLastUpdated(date.toLocaleDateString() + " " + date.toLocaleTimeString());
      } else {
        throw new Error("Invalid format");
      }
    } catch (error) {
      console.warn("Failed to fetch rates, using fallback", error);
      setErrorObj(t("fetchError"));
      setLastUpdated(t("usingFallback"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
   
  }, []);

  const calculateConversion = (valStr: string, isFromDir: boolean, currentRates: Record<string, number>, fCurr: string, tCurr: string) => {
    if (!valStr || isNaN(Number(valStr))) {
       if (isFromDir) {
           setFromAmount(valStr);
           setToAmount("");
       } else {
           setToAmount(valStr);
           setFromAmount("");
       }
       return;
    }
    
    // Safety check if currencies exist
    if (!currentRates[fCurr] || !currentRates[tCurr]) return;

    const val = parseFloat(valStr);

    if (isFromDir) {
       setFromAmount(valStr);
       // Convert from fCurr -> USD -> tCurr
       const usdVal = val / currentRates[fCurr];
       const result = usdVal * currentRates[tCurr];
       setToAmount(result.toFixed(2));
    } else {
       setToAmount(valStr);
       // Convert from tCurr -> USD -> fCurr
       const usdVal = val / currentRates[tCurr];
       const result = usdVal * currentRates[fCurr];
       setFromAmount(result.toFixed(2));
    }
  };

  useEffect(() => {
    calculateConversion(fromAmount, true, rates, fromCurrency, toCurrency);
   
  }, [fromCurrency, toCurrency, rates]);

  const handleSwap = () => {
    const tempCurr = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurr);
    
    const tempAmt = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmt);
  };

  // Common popular currencies to list first
  const POPULAR = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF"];
  
  const sortCurrencies = (allKeys: string[]) => {
      const pop = POPULAR.filter(k => allKeys.includes(k));
      const rest = allKeys.filter(k => !POPULAR.includes(k)).sort();
      return [...pop, ...rest];
  };

  const currencyKeys = sortCurrencies(Object.keys(rates));

  const renderCurrencySelector = (value: string, onChange: (val: string) => void) => (
      <select 
         value={value}
         onChange={(e) => onChange(e.target.value)}
         className="w-full h-full bg-transparent font-bold text-slate-700 px-4 focus:outline-none cursor-pointer border-r-8 border-transparent"
      >
         {currencyKeys.map(key => (
            <option key={key} value={key}>{key}</option>
         ))}
      </select>
  );

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto">
      <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shadow-inner">
               <DollarSign size={24} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{calcDef.title}</h2>
        </div>
      </div>

      <div className="p-6 md:p-10 space-y-8">

        {errorObj && (
           <div className="p-4 bg-orange-50 border border-orange-200 text-orange-700 rounded-xl text-sm font-semibold">
              {errorObj}
           </div>
        )}

        <div className="flex flex-col md:flex-row items-center gap-6">

           {/* From Box */}
           <div className="flex-1 w-full flex flex-col space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase px-2">{t("fromLabel")}</label>
              <div className="relative flex rounded-2xl border-2 border-slate-200 overflow-hidden focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/20 transition-all bg-white">
                 <input 
                    type="number"
                    value={fromAmount}
                    onChange={(e) => calculateConversion(e.target.value, true, rates, fromCurrency, toCurrency)}
                    placeholder="0.00"
                    className="flex-1 text-2xl md:text-3xl font-bold text-slate-800 p-5 outline-none"
                 />
                 <div className="w-28 md:w-32 bg-slate-100 border-l-2 border-slate-200 flex items-center shrink-0">
                    {renderCurrencySelector(fromCurrency, setFromCurrency)}
                 </div>
              </div>
           </div>

           {/* Swap Button */}
           <div className="shrink-0 mt-6 md:mt-8">
              <button 
                 onClick={handleSwap}
                 className="w-14 h-14 bg-slate-50 border border-slate-200 shadow-sm rounded-full flex items-center justify-center text-slate-500 hover:text-green-600 hover:border-green-300 hover:bg-green-50 transition-all active:scale-95"
                 title={t("swap")}
              >
                 <ArrowLeftRight size={24} />
              </button>
           </div>

           {/* To Box */}
           <div className="flex-1 w-full flex flex-col space-y-2">
              <label className="text-sm font-bold text-slate-500 uppercase px-2">{t("toLabel")}</label>
              <div className="relative flex rounded-2xl border-2 border-slate-200 overflow-hidden focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/20 transition-all bg-white">
                 <input 
                    type="number"
                    value={toAmount}
                    onChange={(e) => calculateConversion(e.target.value, false, rates, fromCurrency, toCurrency)}
                    placeholder="0.00"
                    className="flex-1 text-2xl md:text-3xl font-bold text-slate-800 p-5 outline-none"
                 />
                 <div className="w-28 md:w-32 bg-slate-100 border-l-2 border-slate-200 flex items-center shrink-0">
                    {renderCurrencySelector(toCurrency, setToCurrency)}
                 </div>
              </div>
           </div>

        </div>

        {/* Info Footer */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
            <div className="flex items-center gap-3 text-sm text-slate-500 font-medium">
               <Coins size={18} className="text-slate-400" />
               <span>
                 {t("rateMsg")}: <strong className="text-slate-700">1 {fromCurrency} = {((1 / rates[fromCurrency]) * rates[toCurrency]).toFixed(4)} {toCurrency}</strong>
               </span>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4 text-xs font-semibold">
               <span className="text-slate-400">
                 {t("lastUpdated")}: {isLoading ? <span className="animate-pulse bg-slate-200 h-3 w-20 inline-block rounded"></span> : <span className="text-slate-600">{lastUpdated}</span>}
               </span>
               <button 
                  onClick={fetchRates} 
                  disabled={isLoading}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
               >
                  <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                  {t("refreshRates")}
               </button>
            </div>
        </div>

      </div>
    </div>
  );
}
