"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { 
  DollarSign, Users, Info, Share2, Printer, Download, Globe, HelpCircle, 
  Percent, ArrowRight, ShieldCheck, CheckCircle2, AlertCircle, Coins, Award
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface TipCalculatorViewProps {
  calcDef?: CalculatorDef;
  locale?: string;
}

// Global Tipping Customs Database
const REGIONAL_CUSTOMS = [
  {
    country: "United States",
    code: "US",
    defaultTip: 18,
    custom: "15%–20% is standard. Tipping is highly expected in restaurants, bars, and taxis. Servers often rely on tips as their primary income.",
  },
  {
    country: "Canada",
    code: "CA",
    defaultTip: 15,
    custom: "15%–20% is standard. Similar to the US, service staff expect a tip for dine-in service.",
  },
  {
    country: "United Kingdom",
    code: "GB",
    defaultTip: 10,
    custom: "10%–12.5% is common. Often added automatically as a 'service charge' on bills in London or for larger groups; check your bill before adding more.",
  },
  {
    country: "Australia",
    code: "AU",
    defaultTip: 0,
    custom: "Tipping is not customary or expected. Service workers receive living wages, but leaving a 10% tip for exceptional service is appreciated.",
  },
  {
    country: "Japan",
    code: "JP",
    defaultTip: 0,
    custom: "Tipping is not customary and can be considered rude or confusing. Good service is standard and built into the experience. No tips are expected.",
  },
  {
    country: "France",
    code: "FR",
    defaultTip: 5,
    custom: "Service is included by law (service compris). Leaving a small extra amount (5%–10% or rounding up to the nearest Euro) is appreciated.",
  },
  {
    country: "Germany",
    code: "DE",
    defaultTip: 10,
    custom: "5%–10% is customary. It is common to round up the bill to a convenient amount when paying the server directly (Trinkgeld).",
  },
  {
    country: "India",
    code: "IN",
    defaultTip: 10,
    custom: "7%–10% is standard. In upscale restaurants, a 10% service charge may already be included. Cash tips are popular for delivery and hotel staff.",
  },
  {
    country: "Bangladesh",
    code: "BD",
    defaultTip: 5,
    custom: "Tipping is not mandatory, but 5%–10% is highly appreciated in tourist locations, fine dining establishments, and hotels.",
  }
];

const CURRENCIES = [
  { code: "USD", symbol: "$", label: "US Dollar ($)" },
  { code: "EUR", symbol: "€", label: "Euro (€)" },
  { code: "GBP", symbol: "£", label: "British Pound (£)" },
  { code: "CAD", symbol: "CA$", label: "Canadian Dollar (CA$)" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar (A$)" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen (¥)" },
  { code: "INR", symbol: "₹", label: "Indian Rupee (₹)" },
  { code: "BDT", symbol: "৳", label: "Bangladeshi Taka (৳)" },
];

export function TipCalculatorView({ calcDef, locale }: TipCalculatorViewProps) {
  // --- STATE ---
  const [billAmount, setBillAmount] = useState<number>(100);
  const [currency, setCurrency] = useState<string>("USD");
  const [tipPercentage, setTipPercentage] = useState<number>(15);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(2);
  const [roundTip, setRoundTip] = useState<"none" | "up" | "down">("none");
  const [roundTotal, setRoundTotal] = useState<"none" | "up" | "down">("none");

  // Advanced settings state
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [taxRate, setTaxRate] = useState<number>(0);
  const [taxIncluded, setTaxIncluded] = useState<"included" | "excluded">("excluded");
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [discountType, setDiscountType] = useState<"amount" | "percent">("percent");
  const [discountTiming, setDiscountTiming] = useState<"before-tip" | "after-tip">("before-tip");
  const [serviceChargeValue, setServiceChargeValue] = useState<number>(0);
  const [serviceChargeType, setServiceChargeType] = useState<"amount" | "percent">("percent");

  // Regional customs state
  const [selectedCountry, setSelectedCountry] = useState<string>("US");

  // Notification and Share state
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  // Sync isClient check to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("bill")) setBillAmount(Number(params.get("bill")));
      if (params.get("tip")) setTipPercentage(Number(params.get("tip")));
      if (params.get("people")) setNumberOfPeople(Number(params.get("people")));
      if (params.get("curr")) setCurrency(params.get("curr") || "USD");
      if (params.get("country")) {
        const c = params.get("country") || "US";
        setSelectedCountry(c);
        const region = REGIONAL_CUSTOMS.find(r => r.code === c);
        if (region) setTipPercentage(region.defaultTip);
      }
    }
  }, []);

  const currentCurrencySymbol = useMemo(() => {
    return CURRENCIES.find((c) => c.code === currency)?.symbol || "$";
  }, [currency]);

  // Handle Country Selection & Auto-update Tip percentage
  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    const region = REGIONAL_CUSTOMS.find((r) => r.code === countryCode);
    if (region) {
      setTipPercentage(region.defaultTip);
    }
  };

  // --- CALCULATION LOGIC ---
  const calculations = useMemo(() => {
    const bill = Math.max(0, billAmount);
    const people = Math.max(1, numberOfPeople);
    const tax = Math.max(0, taxRate);
    const disc = Math.max(0, discountValue);
    const service = Math.max(0, serviceChargeValue);

    // 1. Calculate discount first
    let discountAmt = 0;
    if (disc > 0) {
      if (discountType === "percent") {
        discountAmt = bill * (disc / 100);
      } else {
        discountAmt = disc;
      }
      discountAmt = Math.min(bill, discountAmt); // Cannot discount more than the bill itself
    }

    // 2. Determine base subtotal before tip
    const subtotal = Math.max(0, bill - discountAmt);

    // Tip base depends on whether discount is applied before or after tip calculation
    const tipBase = discountTiming === "before-tip" ? subtotal : bill;

    // 3. Tip calculation
    let calculatedTip = tipBase * (tipPercentage / 100);
    
    // Apply tip rounding
    if (roundTip === "up") {
      calculatedTip = Math.ceil(calculatedTip);
    } else if (roundTip === "down") {
      calculatedTip = Math.floor(calculatedTip);
    }
    calculatedTip = Math.max(0, calculatedTip);

    // 4. Service Charge calculation
    let serviceChargeAmt = 0;
    if (service > 0) {
      if (serviceChargeType === "percent") {
        serviceChargeAmt = bill * (service / 100);
      } else {
        serviceChargeAmt = service;
      }
    }

    // 5. Tax calculation
    let taxAmt = 0;
    if (taxIncluded === "excluded") {
      taxAmt = bill * (tax / 100);
    } else {
      // Backout tax from the bill
      taxAmt = bill - (bill / (1 + (tax / 100)));
    }

    // 6. Total calculation
    let calculatedTotal = bill;
    if (taxIncluded === "excluded") {
      calculatedTotal += taxAmt;
    }
    calculatedTotal = calculatedTotal + calculatedTip + serviceChargeAmt - discountAmt;
    calculatedTotal = Math.max(0, calculatedTotal);

    // Apply total rounding
    if (roundTotal === "up") {
      calculatedTotal = Math.ceil(calculatedTotal);
    } else if (roundTotal === "down") {
      calculatedTotal = Math.floor(calculatedTotal);
    }

    // 7. Split results
    const tipPerPerson = calculatedTip / people;
    const totalPerPerson = calculatedTotal / people;
    const originalBillPerPerson = Math.max(0, (calculatedTotal - calculatedTip) / people);

    return {
      discountAmt,
      subtotal,
      tipAmt: calculatedTip,
      serviceChargeAmt,
      taxAmt,
      totalWithTip: calculatedTotal,
      tipPerPerson,
      totalPerPerson,
      billPerPerson: originalBillPerPerson,
    };
  }, [
    billAmount, numberOfPeople, tipPercentage, roundTip, roundTotal,
    taxRate, taxIncluded, discountValue, discountType, discountTiming,
    serviceChargeValue, serviceChargeType
  ]);

  // --- SERVICE RECOMMENDATION TEXT ---
  const tipRecommendation = useMemo(() => {
    if (tipPercentage <= 5) return { text: "Poor Service", color: "bg-red-500 text-white" };
    if (tipPercentage <= 10) return { text: "Average Service", color: "bg-orange-500 text-white" };
    if (tipPercentage <= 15) return { text: "Good Service", color: "bg-amber-500 text-white" };
    if (tipPercentage <= 18) return { text: "Great Service", color: "bg-yellow-500 text-slate-900" };
    if (tipPercentage <= 25) return { text: "Excellent Service", color: "bg-emerald-500 text-white" };
    return { text: "Exceptional Service", color: "bg-indigo-600 text-white" };
  }, [tipPercentage]);

  // Current Regional Customs details
  const activeRegion = useMemo(() => {
    return REGIONAL_CUSTOMS.find((r) => r.code === selectedCountry) || REGIONAL_CUSTOMS[0];
  }, [selectedCountry]);

  // --- UTILITIES ---
  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3050);
  };

  const handleShareLink = () => {
    if (typeof window !== "undefined") {
      const baseUrl = window.location.origin + window.location.pathname;
      const query = `?bill=${billAmount}&tip=${tipPercentage}&people=${numberOfPeople}&curr=${currency}&country=${selectedCountry}`;
      navigator.clipboard.writeText(baseUrl + query);
      triggerNotification("success", "Shareable URL copied to clipboard!");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Item,Value\n";
    csvContent += `Base Bill Amount,${currentCurrencySymbol}${billAmount.toFixed(2)}\n`;
    csvContent += `Tip Percentage,${tipPercentage}%\n`;
    csvContent += `Total Tip Amount,${currentCurrencySymbol}${calculations.tipAmt.toFixed(2)}\n`;
    csvContent += `Discount,${currentCurrencySymbol}${calculations.discountAmt.toFixed(2)}\n`;
    csvContent += `Service Charge,${currentCurrencySymbol}${calculations.serviceChargeAmt.toFixed(2)}\n`;
    csvContent += `Tax,${currentCurrencySymbol}${calculations.taxAmt.toFixed(2)}\n`;
    csvContent += `Total Bill With Tip,${currentCurrencySymbol}${calculations.totalWithTip.toFixed(2)}\n`;
    csvContent += `Number of People,${numberOfPeople}\n`;
    csvContent += `Tip Per Person,${currentCurrencySymbol}${calculations.tipPerPerson.toFixed(2)}\n`;
    csvContent += `Bill Per Person,${currentCurrencySymbol}${calculations.billPerPerson.toFixed(2)}\n`;
    csvContent += `Total Per Person,${currentCurrencySymbol}${calculations.totalPerPerson.toFixed(2)}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "nexus_tip_calculator_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotification("success", "CSV file downloaded successfully.");
  };

  // Recharts Chart Data
  const chartData = useMemo(() => {
    return [
      { name: "Original Bill Portion", value: parseFloat(calculations.billPerPerson.toFixed(2)) },
      { name: "Tip Portion", value: parseFloat(calculations.tipPerPerson.toFixed(2)) }
    ];
  }, [calculations]);

  const COLORS = ["#3b82f6", "#f59e0b"]; // Blue and Amber

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-2xl text-white animate-fade-in transition-all ${
          notification.type === "success" ? "bg-emerald-600" : "bg-red-600"
        }`}>
          {notification.type === "success" ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Interactive Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-850 pb-4">
              <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Coins className="text-amber-500" size={24} />
                Tip & Split Parameters
              </h3>
              <div className="flex gap-2">
                {/* Quick country selection triggers default tipping behavior */}
                <select
                  value={selectedCountry}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-xs font-semibold py-1.5 px-2.5 rounded-lg text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  aria-label="Select Country Customs"
                >
                  {REGIONAL_CUSTOMS.map((r) => (
                    <option key={r.code} value={r.code}>
                      🌍 {r.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Bill Amount */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                  <span>Bill Amount</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-bold">
                    {currentCurrencySymbol}
                  </div>
                  <input
                    type="number"
                    min={0}
                    step={0.01}
                    value={billAmount === 0 ? "" : billAmount}
                    onChange={(e) => setBillAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="block w-full pl-9 pr-4 py-3 border border-slate-200 dark:border-slate-750 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-500 text-base font-bold text-slate-800 dark:text-white"
                    placeholder="0.00"
                    aria-label="Bill Amount"
                  />
                </div>
              </div>

              {/* Currency Selector */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="block w-full px-4 py-3 border border-slate-200 dark:border-slate-750 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-semibold text-slate-700 dark:text-slate-300"
                  aria-label="Select Currency"
                >
                  {CURRENCIES.map((curr) => (
                    <option key={curr.code} value={curr.code}>
                      {curr.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tip Percentage Slider */}
              <div className="md:col-span-2 space-y-3">
                <div className="flex justify-between items-center text-sm font-bold text-slate-700 dark:text-slate-300">
                  <span>Tip Percentage</span>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${tipRecommendation.color}`}>
                      {tipRecommendation.text}
                    </span>
                    <span className="text-amber-600 font-extrabold text-base">{tipPercentage}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={0}
                    max={50}
                    step={1}
                    value={tipPercentage}
                    onChange={(e) => setTipPercentage(Number(e.target.value))}
                    className="w-full accent-amber-500 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                    aria-label="Tip Percentage Slider"
                  />
                  <div className="relative min-w-[70px] max-w-[90px]">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={tipPercentage}
                      onChange={(e) => setTipPercentage(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-3 py-1.5 text-center border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 font-bold text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                      aria-label="Tip Percentage Input"
                    />
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-slate-400 text-xs font-bold">%</div>
                  </div>
                </div>

                {/* Quick select buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[5, 10, 12, 15, 18, 20, 25, 30].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setTipPercentage(pct)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg border transition-all ${
                        tipPercentage === pct
                          ? "bg-amber-500 border-amber-500 text-white shadow-sm"
                          : "bg-slate-50 border-slate-200 dark:bg-slate-950 dark:border-slate-800 text-slate-600 dark:text-slate-450 hover:bg-slate-100 dark:hover:bg-slate-850"
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              {/* Split (Number of People) */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Split Bill (People)</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setNumberOfPeople(prev => Math.max(1, prev - 1))}
                    className="w-12 h-12 flex items-center justify-center bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-850 font-bold text-slate-700 dark:text-slate-300 transition-colors focus:outline-none"
                    aria-label="Decrease People Count"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 h-12 text-center border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 text-base font-extrabold text-slate-850 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    aria-label="Number of People Input"
                  />
                  <button
                    onClick={() => setNumberOfPeople(prev => Math.min(100, prev + 1))}
                    className="w-12 h-12 flex items-center justify-center bg-slate-50 border border-slate-200 dark:bg-slate-950 dark:border-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-850 font-bold text-slate-700 dark:text-slate-300 transition-colors focus:outline-none"
                    aria-label="Increase People Count"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Rounding Mode options */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Rounding Rules</label>
                <div className="grid grid-cols-2 gap-2">
                  {/* Round Tip Selector */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-450 uppercase block">Round Tip</span>
                    <select
                      value={roundTip}
                      onChange={(e) => setRoundTip(e.target.value as any)}
                      className="w-full px-2.5 py-2 border border-slate-200 dark:border-slate-750 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-amber-500"
                      aria-label="Round Tip Option"
                    >
                      <option value="none">No Rounding</option>
                      <option value="up">Round Up</option>
                      <option value="down">Round Down</option>
                    </select>
                  </div>
                  {/* Round Total Selector */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-450 uppercase block">Round Total</span>
                    <select
                      value={roundTotal}
                      onChange={(e) => setRoundTotal(e.target.value as any)}
                      className="w-full px-2.5 py-2 border border-slate-200 dark:border-slate-750 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-700 dark:text-slate-300 focus:ring-2 focus:ring-amber-500"
                      aria-label="Round Total Option"
                    >
                      <option value="none">No Rounding</option>
                      <option value="up">Round Up</option>
                      <option value="down">Round Down</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Advanced options accordion */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="w-full px-6 py-4 flex items-center justify-between font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors focus:outline-none"
              aria-label="Expand Advanced Options"
            >
              <div className="flex items-center gap-2">
                <Award className="text-amber-500" size={20} />
                <span>Advanced Bill Components (Tax, Discounts & Fees)</span>
              </div>
              <span className="text-slate-400 font-bold">{showAdvanced ? "▲" : "▼"}</span>
            </button>

            {showAdvanced && (
              <div className="p-6 border-t border-slate-100 dark:border-slate-850 space-y-6">
                
                {/* Tax configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Tax Rate (%)</label>
                    <div className="relative rounded-lg shadow-sm">
                      <input
                        type="number"
                        min={0}
                        step={0.1}
                        value={taxRate}
                        onChange={(e) => setTaxRate(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="block w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-800 dark:text-white"
                        placeholder="e.g. 8.25"
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400 text-xs">%</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Tax Application</label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
                      <button
                        onClick={() => setTaxIncluded("excluded")}
                        className={`py-1 text-[10px] font-semibold rounded-md transition-all ${
                          taxIncluded === "excluded" 
                            ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm" 
                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-350"
                        }`}
                      >
                        Add to Bill
                      </button>
                      <button
                        onClick={() => setTaxIncluded("included")}
                        className={`py-1 text-[10px] font-semibold rounded-md transition-all ${
                          taxIncluded === "included" 
                            ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm" 
                            : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-350"
                        }`}
                      >
                        Already Included
                      </button>
                    </div>
                  </div>
                </div>

                {/* Discount configuration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-850">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Discount Value</label>
                    <div className="relative rounded-lg shadow-sm">
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        value={discountValue}
                        onChange={(e) => setDiscountValue(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="block w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-800 dark:text-white"
                        placeholder="0"
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400 text-xs">
                        {discountType === "percent" ? "%" : currentCurrencySymbol}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Discount Type</label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
                      <button
                        onClick={() => setDiscountType("percent")}
                        className={`py-1 text-[10px] font-semibold rounded-md transition-all ${
                          discountType === "percent" 
                            ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm" 
                            : "text-slate-500"
                        }`}
                      >
                        Percentage (%)
                      </button>
                      <button
                        onClick={() => setDiscountType("amount")}
                        className={`py-1 text-[10px] font-semibold rounded-md transition-all ${
                          discountType === "amount" 
                            ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm" 
                            : "text-slate-500"
                        }`}
                      >
                        Fixed ({currentCurrencySymbol})
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Tip Calculation Base</label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
                      <button
                        onClick={() => setDiscountTiming("before-tip")}
                        className={`py-1 text-[10px] font-semibold rounded-md transition-all ${
                          discountTiming === "before-tip" 
                            ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm" 
                            : "text-slate-500"
                        }`}
                      >
                        Apply Before Tip
                      </button>
                      <button
                        onClick={() => setDiscountTiming("after-tip")}
                        className={`py-1 text-[10px] font-semibold rounded-md transition-all ${
                          discountTiming === "after-tip" 
                            ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm" 
                            : "text-slate-500"
                        }`}
                      >
                        Apply After Tip
                      </button>
                    </div>
                  </div>
                </div>

                {/* Service Charge / Processing Fee */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-850">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Service Charge</label>
                    <div className="relative rounded-lg shadow-sm">
                      <input
                        type="number"
                        min={0}
                        step={0.01}
                        value={serviceChargeValue}
                        onChange={(e) => setServiceChargeValue(Math.max(0, parseFloat(e.target.value) || 0))}
                        className="block w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-950 text-xs font-bold text-slate-800 dark:text-white"
                        placeholder="0"
                      />
                      <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400 text-xs">
                        {serviceChargeType === "percent" ? "%" : currentCurrencySymbol}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-500">Charge Type</label>
                    <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
                      <button
                        onClick={() => setServiceChargeType("percent")}
                        className={`py-1 text-[10px] font-semibold rounded-md transition-all ${
                          serviceChargeType === "percent" 
                            ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm" 
                            : "text-slate-500"
                        }`}
                      >
                        Percentage (%)
                      </button>
                      <button
                        onClick={() => setServiceChargeType("amount")}
                        className={`py-1 text-[10px] font-semibold rounded-md transition-all ${
                          serviceChargeType === "amount" 
                            ? "bg-white dark:bg-slate-800 text-slate-800 dark:text-white shadow-sm" 
                            : "text-slate-500"
                        }`}
                      >
                        Fixed ({currentCurrencySymbol})
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Regional Tips Customs Details Box */}
          <div className="bg-amber-500/5 dark:bg-slate-900 border border-amber-500/20 rounded-3xl p-6 flex gap-4 items-start shadow-sm">
            <Globe className="text-amber-500 shrink-0 mt-0.5" size={24} />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Tipping Custom: {activeRegion.country}
              </h4>
              <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed">
                {activeRegion.custom}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Sticky Results Card */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          <div className="bg-slate-900 dark:bg-slate-950 border border-slate-800 text-white rounded-3xl p-6 shadow-xl space-y-6">
            
            {/* Header / Primary Results */}
            <div className="border-b border-slate-850 pb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Per Person</span>
              <h3 className="text-4xl font-black text-white mt-1 flex items-baseline">
                {currentCurrencySymbol}
                <span className="text-5xl ml-1 font-mono tracking-tight">
                  {calculations.totalPerPerson.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
                <span className="text-xs font-normal text-slate-455 ml-1">/ person</span>
              </h3>
            </div>

            {/* Split Breakdown */}
            <div className="grid grid-cols-2 gap-4 border-b border-slate-850 pb-6 text-xs font-mono">
              <div className="space-y-0.5">
                <span className="text-slate-455 block text-[10px] uppercase">Tip Per Person</span>
                <span className="text-amber-400 font-extrabold text-sm">
                  {currentCurrencySymbol}{calculations.tipPerPerson.toFixed(2)}
                </span>
              </div>
              <div className="space-y-0.5">
                <span className="text-slate-455 block text-[10px] uppercase">Bill Per Person</span>
                <span className="text-white font-extrabold text-sm">
                  {currentCurrencySymbol}{calculations.billPerPerson.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Overall Totals */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>Total Tip Amount</span>
                <span className="text-white font-bold font-mono">
                  {currentCurrencySymbol}{calculations.tipAmt.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>Original Subtotal</span>
                <span className="text-white font-bold font-mono">
                  {currentCurrencySymbol}{calculations.subtotal.toFixed(2)}
                </span>
              </div>

              {calculations.taxAmt > 0 && (
                <div className="flex justify-between items-center text-slate-400">
                  <span>Sales Tax ({taxRate}%)</span>
                  <span className="text-white font-bold font-mono">
                    {currentCurrencySymbol}{calculations.taxAmt.toFixed(2)}
                  </span>
                </div>
              )}

              {calculations.serviceChargeAmt > 0 && (
                <div className="flex justify-between items-center text-slate-400">
                  <span>Service Charge</span>
                  <span className="text-white font-bold font-mono">
                    {currentCurrencySymbol}{calculations.serviceChargeAmt.toFixed(2)}
                  </span>
                </div>
              )}

              {calculations.discountAmt > 0 && (
                <div className="flex justify-between items-center text-slate-400">
                  <span>Discount</span>
                  <span className="text-emerald-450 font-bold font-mono">
                    -{currentCurrencySymbol}{calculations.discountAmt.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-slate-850">
                <span className="text-white">Total Bill With Tip</span>
                <span className="text-amber-400 font-extrabold font-mono text-base">
                  {currentCurrencySymbol}{calculations.totalWithTip.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            {/* Utility actions */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-850">
              <button
                onClick={handleShareLink}
                className="flex flex-col items-center justify-center py-2.5 bg-slate-800 hover:bg-slate-750 rounded-xl transition-all border border-slate-700 gap-1 focus:outline-none"
                aria-label="Share Link URL"
              >
                <Share2 size={16} />
                <span className="text-[10px] font-semibold">Share scenario</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex flex-col items-center justify-center py-2.5 bg-slate-800 hover:bg-slate-750 rounded-xl transition-all border border-slate-700 gap-1 focus:outline-none"
                aria-label="Print Report PDF"
              >
                <Printer size={16} />
                <span className="text-[10px] font-semibold">Print PDF</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="flex flex-col items-center justify-center py-2.5 bg-amber-500 hover:bg-amber-600 rounded-xl transition-all gap-1 focus:outline-none text-slate-950 font-bold"
                aria-label="Export CSV Spreadsheet"
              >
                <Download size={16} />
                <span className="text-[10px]">Export CSV</span>
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Visual Chart Visualization */}
      {isClient && calculations.totalPerPerson > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm flex flex-col h-[320px]">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4 uppercase tracking-wider">
            Per-Person Payment Breakdown (Original Cost vs. Gratuity)
          </h4>
          <div className="flex-1 relative flex items-center justify-center min-h-0">
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
                  formatter={(value: any) => `${currentCurrencySymbol}${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Tip Ratio</span>
              <span className="text-lg font-black text-amber-500">
                {calculations.totalPerPerson > 0 
                  ? ((calculations.tipPerPerson / calculations.totalPerPerson) * 100).toFixed(0) 
                  : 0}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Payment breakdown visual cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-450 font-bold uppercase mb-1">Base Per Person</p>
          <p className="text-xl font-bold text-slate-800 dark:text-white">
            {currentCurrencySymbol}{calculations.billPerPerson.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-455 font-bold uppercase mb-1">Tip Per Person</p>
          <p className="text-xl font-bold text-amber-600 dark:text-amber-500">
            {currentCurrencySymbol}{calculations.tipPerPerson.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-850 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p className="text-xs text-slate-450 font-bold uppercase mb-1">Total Per Person</p>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-500">
            {currentCurrencySymbol}{calculations.totalPerPerson.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
      </div>
    </div>
  );
}
