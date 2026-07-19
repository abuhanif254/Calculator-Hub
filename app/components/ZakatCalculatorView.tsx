"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  DollarSign, Calculator, Percent, Sparkles, Scale, BookOpen, AlertTriangle, CheckCircle, 
  HelpCircle, Trash2, Plus, Info, Download, Printer, Copy, Share2, Coins, ArrowRight, BarChart3, PieChart as PieChartIcon
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

// Currencies definition
const CURRENCIES = [
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "CAD", symbol: "CA$" },
  { code: "AUD", symbol: "A$" },
  { code: "SAR", symbol: "SR" },
  { code: "AED", symbol: "AED" },
  { code: "QAR", symbol: "QR" },
  { code: "KWD", symbol: "KD" },
  { code: "INR", symbol: "₹" },
  { code: "PKR", symbol: "Rs" },
  { code: "BDT", symbol: "৳" },
  { code: "MYR", symbol: "RM" },
  { code: "IDR", symbol: "Rp" }
];

// Default gram prices for gold/silver (approximate global starting points)
const DEFAULT_GOLD_PRICE = 75.0; // USD per gram
const DEFAULT_SILVER_PRICE = 0.95; // USD per gram

export function ZakatCalculatorView() {
  const [isClient, setIsClient] = useState(false);
  const [currencyCode, setCurrencyCode] = useState("USD");

  // Input States: Cash & Savings
  const [cashOnHand, setCashOnHand] = useState<number>(0);
  const [bankSavings, setBankSavings] = useState<number>(0);
  const [accountsReceivable, setAccountsReceivable] = useState<number>(0);

  // Input States: Precious Metals & Nisab settings
  const [nisabType, setNisabType] = useState<"gold" | "silver">("gold");
  const [goldPrice, setGoldPrice] = useState<number>(DEFAULT_GOLD_PRICE);
  const [silverPrice, setSilverPrice] = useState<number>(DEFAULT_SILVER_PRICE);
  const [goldWeight, setGoldWeight] = useState<number>(0);
  const [silverWeight, setSilverWeight] = useState<number>(0);

  // Input States: Investments & Crypto
  const [stocksMutualFunds, setStocksMutualFunds] = useState<number>(0);
  const [cryptoAssets, setCryptoAssets] = useState<number>(0);
  const [rentalIncome, setRentalIncome] = useState<number>(0);

  // Input States: Business Assets
  const [businessCash, setBusinessCash] = useState<number>(0);
  const [businessInventory, setBusinessInventory] = useState<number>(0);
  
  // Advanced Options: Agricultural & Livestock
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [agriAssets, setAgriAssets] = useState<number>(0);
  const [livestockAssets, setLivestockAssets] = useState<number>(0);

  // Custom Assets
  const [customAssets, setCustomAssets] = useState<{ id: string; name: string; value: number }[]>([]);
  const [newAssetName, setNewAssetName] = useState("");
  const [newAssetValue, setNewAssetValue] = useState<number>(0);

  // Input States: Liabilities
  const [debtsOutstanding, setDebtsOutstanding] = useState<number>(0);
  const [billsUnpaid, setBillsUnpaid] = useState<number>(0);
  const [businessLoans, setBusinessLoans] = useState<number>(0);
  const [taxesDue, setTaxesDue] = useState<number>(0);
  
  // Custom Liabilities
  const [customLiabilities, setCustomLiabilities] = useState<{ id: string; name: string; value: number }[]>([]);
  const [newLiabName, setNewLiabName] = useState("");
  const [newLiabValue, setNewLiabValue] = useState<number>(0);

  // UI state
  const [activeTab, setActiveTab] = useState<"summary" | "breakdown" | "charts" | "explanation">("summary");
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    setIsClient(true);
    // Parse URL params
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("curr")) setCurrencyCode(params.get("curr") || "USD");
      if (params.get("cash")) setCashOnHand(Number(params.get("cash")));
      if (params.get("savings")) setBankSavings(Number(params.get("savings")));
      if (params.get("gw")) setGoldWeight(Number(params.get("gw")));
      if (params.get("sw")) setSilverWeight(Number(params.get("sw")));
      if (params.get("stocks")) setStocksMutualFunds(Number(params.get("stocks")));
      if (params.get("crypto")) setCryptoAssets(Number(params.get("crypto")));
      if (params.get("gp")) setGoldPrice(Number(params.get("gp")));
      if (params.get("sp")) setSilverPrice(Number(params.get("sp")));
      if (params.get("nisab")) setNisabType(params.get("nisab") === "silver" ? "silver" : "gold");
    }
  }, []);

  const currentCurrency = useMemo(() => {
    return CURRENCIES.find(c => c.code === currencyCode) || CURRENCIES[0];
  }, [currencyCode]);

  const formatMoney = (val: number) => {
    return `${currentCurrency.symbol}${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const triggerNotification = (type: "success" | "error", message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // Add custom asset handler
  const handleAddCustomAsset = () => {
    if (!newAssetName.trim()) return;
    const newAsset = {
      id: `${Date.now()}-${Math.random()}`,
      name: newAssetName.trim(),
      value: Math.max(0, newAssetValue)
    };
    setCustomAssets(prev => [...prev, newAsset]);
    setNewAssetName("");
    setNewAssetValue(0);
    triggerNotification("success", "Custom asset added successfully.");
  };

  const handleRemoveCustomAsset = (id: string) => {
    setCustomAssets(prev => prev.filter(a => a.id !== id));
  };

  // Add custom liability handler
  const handleAddCustomLiability = () => {
    if (!newLiabName.trim()) return;
    const newLiab = {
      id: `${Date.now()}-${Math.random()}`,
      name: newLiabName.trim(),
      value: Math.max(0, newLiabValue)
    };
    setCustomLiabilities(prev => [...prev, newLiab]);
    setNewLiabName("");
    setNewLiabValue(0);
    triggerNotification("success", "Custom liability added successfully.");
  };

  const handleRemoveCustomLiability = (id: string) => {
    setCustomLiabilities(prev => prev.filter(l => l.id !== id));
  };

  // ─── ZAKAT CALCULATIONS ───
  const results = useMemo(() => {
    const goldValueCalculated = goldWeight * goldPrice;
    const silverValueCalculated = silverWeight * silverPrice;
    
    // Sum of standard assets
    const cashTotal = cashOnHand + bankSavings + accountsReceivable;
    const metalsTotal = goldValueCalculated + silverValueCalculated;
    const investTotal = stocksMutualFunds + cryptoAssets + rentalIncome;
    const businessTotal = businessCash + businessInventory;
    const advancedTotal = agriAssets + livestockAssets;
    const customAssetsTotal = customAssets.reduce((sum, item) => sum + item.value, 0);

    const totalAssets = cashTotal + metalsTotal + investTotal + businessTotal + advancedTotal + customAssetsTotal;

    // Sum of liabilities
    const standardLiabTotal = debtsOutstanding + billsUnpaid + businessLoans + taxesDue;
    const customLiabTotal = customLiabilities.reduce((sum, item) => sum + item.value, 0);
    const totalLiabilities = standardLiabTotal + customLiabTotal;

    // Net Zakatable wealth (Assets - Liabilities)
    const netWealth = Math.max(0, totalAssets - totalLiabilities);

    // Nisab thresholds (Standard gold Nisab is 85g, silver Nisab is 595g)
    const goldNisabThreshold = 85 * goldPrice;
    const silverNisabThreshold = 595 * silverPrice;
    const chosenNisabThreshold = nisabType === "gold" ? goldNisabThreshold : silverNisabThreshold;

    const meetsNisab = netWealth >= chosenNisabThreshold;
    const zakatDue = meetsNisab ? netWealth * 0.025 : 0; // 2.5% rate

    return {
      goldValue: goldValueCalculated,
      silverValue: silverValueCalculated,
      cashTotal,
      metalsTotal,
      investTotal,
      businessTotal,
      advancedTotal,
      customAssetsTotal,
      totalAssets,
      totalLiabilities,
      netWealth,
      goldNisabThreshold,
      silverNisabThreshold,
      chosenNisabThreshold,
      meetsNisab,
      zakatDue
    };
  }, [
    cashOnHand, bankSavings, accountsReceivable,
    goldWeight, goldPrice, silverWeight, silverPrice,
    stocksMutualFunds, cryptoAssets, rentalIncome,
    businessCash, businessInventory,
    agriAssets, livestockAssets, customAssets,
    debtsOutstanding, billsUnpaid, businessLoans, taxesDue, customLiabilities,
    nisabType
  ]);

  // Chart data formatting
  const pieData = useMemo(() => {
    return [
      { name: "Cash & Savings", value: results.cashTotal, color: "#10b981" },
      { name: "Gold & Silver", value: results.metalsTotal, color: "#f59e0b" },
      { name: "Investments", value: results.investTotal, color: "#3b82f6" },
      { name: "Business Cash/Inventory", value: results.businessTotal, color: "#8b5cf6" },
      { name: "Advanced Assets", value: results.advancedTotal, color: "#ec4899" },
      { name: "Custom Assets", value: results.customAssetsTotal, color: "#06b6d4" }
    ].filter(item => item.value > 0);
  }, [results]);

  const barData = useMemo(() => {
    return [
      { name: "Comparison", Assets: results.totalAssets, Liabilities: results.totalLiabilities }
    ];
  }, [results]);

  // Copy shareable link
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}${window.location.pathname}?curr=${currencyCode}&cash=${cashOnHand}&savings=${bankSavings}&gw=${goldWeight}&sw=${silverWeight}&stocks=${stocksMutualFunds}&crypto=${cryptoAssets}&gp=${goldPrice}&sp=${silverPrice}&nisab=${nisabType}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        triggerNotification("success", "Shareable scenario URL copied to clipboard.");
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  // Copy summary results
  const handleCopyResults = () => {
    const text = `Zakat Calculation Summary (${currencyCode})
-----------------------------------------
Total Assets: ${formatMoney(results.totalAssets)}
Total Liabilities: ${formatMoney(results.totalLiabilities)}
Net Zakatable Wealth: ${formatMoney(results.netWealth)}
Nisab Target (${nisabType.toUpperCase()}): ${formatMoney(results.chosenNisabThreshold)}
Nisab Status: ${results.meetsNisab ? "MET" : "NOT MET"}
Zakat Due (2.5%): ${formatMoney(results.zakatDue)}`;
    
    navigator.clipboard.writeText(text).then(() => {
      triggerNotification("success", "Calculation summary text copied to clipboard.");
    });
  };

  // Print results
  const handlePrint = () => {
    window.print();
  };

  // CSV Export
  const handleExportCSV = () => {
    const rows = [
      ["Zakat Calculation Report", ""],
      ["Date", new Date().toLocaleDateString()],
      ["Currency", currencyCode],
      ["", ""],
      ["ASSET BREAKDOWN", "Value"],
      ["Cash and Bank Savings", results.cashTotal],
      ["Gold & Silver metals value", results.metalsTotal],
      ["Investments (Stocks/Crypto)", results.investTotal],
      ["Business Assets & Inventory", results.businessTotal],
      ["Advanced/Custom Assets", results.advancedTotal + results.customAssetsTotal],
      ["TOTAL ASSETS", results.totalAssets],
      ["", ""],
      ["LIABILITIES BREAKDOWN", "Value"],
      ["Total Liabilities Deductible", results.totalLiabilities],
      ["", ""],
      ["SUMMARY STATS", "Value"],
      ["Net Zakatable Wealth", results.netWealth],
      ["Chosen Nisab Threshold", results.chosenNisabThreshold],
      ["Nisab Status", results.meetsNisab ? "Eligible" : "Exempt"],
      ["ZAKAT PAYABLE (2.5%)", results.zakatDue]
    ];

    const csvContent = "data:text/csv;charset=utf-8," 
      + rows.map(e => e.map(val => `"${val}"`).join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Zakat_Breakdown_${currencyCode}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerNotification("success", "CSV file downloaded successfully.");
  };

  return (
    <div className="w-full">
      {/* Notifications banner */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg border text-sm transition-all duration-300 animate-slide-in ${
          notification.type === "success" 
            ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200" 
            : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200"
        }`}>
          {notification.type === "success" ? <CheckCircle size={18} /> : <AlertTriangle size={18} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Parameters Panel */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Coins className="text-[#518231]" />
                  Zakat Asset Calculator
                </h2>
                <p className="text-sm text-slate-500 mt-1">Configure your personal and business wealth below</p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 shrink-0">Currency:</label>
                <select
                  value={currencyCode}
                  onChange={(e) => setCurrencyCode(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#518231]"
                >
                  {CURRENCIES.map(c => (
                    <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Input Accordions */}
            <div className="space-y-6">
              
              {/* Cash & Bank Savings */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">1. Cash & Bank Savings</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      Cash on Hand
                      <InfoTooltip text="Cash kept at home, in pockets, or in temporary wallets." />
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-semibold">{currentCurrency.symbol}</div>
                      <input
                        type="number"
                        min="0"
                        value={cashOnHand || ""}
                        onChange={(e) => setCashOnHand(Math.max(0, Number(e.target.value)))}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:bg-white text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      Bank Savings & Deposits
                      <InfoTooltip text="Funds in savings accounts, checking accounts, or fixed certificates." />
                    </label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-semibold">{currentCurrency.symbol}</div>
                      <input
                        type="number"
                        min="0"
                        value={bankSavings || ""}
                        onChange={(e) => setBankSavings(Math.max(0, Number(e.target.value)))}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:bg-white text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Precious Metals & Nisab Thresholds */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">2. Precious Metals & Nisab Spot Rates</h3>
                
                {/* Nisab Selector */}
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Base Calculation Nisab:</span>
                    <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-1 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setNisabType("gold")}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                          nisabType === "gold"
                            ? "bg-[#518231] text-white"
                            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        }`}
                      >
                        Gold Nisab (85g)
                      </button>
                      <button
                        type="button"
                        onClick={() => setNisabType("silver")}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                          nisabType === "silver"
                            ? "bg-[#518231] text-white"
                            : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                        }`}
                      >
                        Silver Nisab (595g)
                      </button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">Gold Price / gram ({currentCurrency.code})</label>
                      <input
                        type="number"
                        step="0.01"
                        value={goldPrice}
                        onChange={(e) => setGoldPrice(Math.max(0.1, Number(e.target.value)))}
                        className="block w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">Silver Price / gram ({currentCurrency.code})</label>
                      <input
                        type="number"
                        step="0.01"
                        value={silverPrice}
                        onChange={(e) => setSilverPrice(Math.max(0.01, Number(e.target.value)))}
                        className="block w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Gold Weight Owned (grams)</label>
                    <div className="relative rounded-xl shadow-sm">
                      <input
                        type="number"
                        min="0"
                        value={goldWeight || ""}
                        onChange={(e) => setGoldWeight(Math.max(0, Number(e.target.value)))}
                        className="block w-full px-3.5 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:bg-white text-sm"
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-400 font-semibold">g</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Silver Weight Owned (grams)</label>
                    <div className="relative rounded-xl shadow-sm">
                      <input
                        type="number"
                        min="0"
                        value={silverWeight || ""}
                        onChange={(e) => setSilverWeight(Math.max(0, Number(e.target.value)))}
                        className="block w-full px-3.5 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:bg-white text-sm"
                        placeholder="0.00"
                      />
                      <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-slate-400 font-semibold">g</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investments & Crypto */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">3. Investments & Portfolio</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Stocks & Mutual Funds</label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-semibold">{currentCurrency.symbol}</div>
                      <input
                        type="number"
                        min="0"
                        value={stocksMutualFunds || ""}
                        onChange={(e) => setStocksMutualFunds(Math.max(0, Number(e.target.value)))}
                        className="block w-full pl-9 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:bg-white text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Cryptocurrency</label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-semibold">{currentCurrency.symbol}</div>
                      <input
                        type="number"
                        min="0"
                        value={cryptoAssets || ""}
                        onChange={(e) => setCryptoAssets(Math.max(0, Number(e.target.value)))}
                        className="block w-full pl-9 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:bg-white text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Rental Net Income</label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 font-semibold">{currentCurrency.symbol}</div>
                      <input
                        type="number"
                        min="0"
                        value={rentalIncome || ""}
                        onChange={(e) => setRentalIncome(Math.max(0, Number(e.target.value)))}
                        className="block w-full pl-9 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:bg-white text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Business Assets */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">4. Business Assets</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Business Cash & Accounts</label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-semibold">{currentCurrency.symbol}</div>
                      <input
                        type="number"
                        min="0"
                        value={businessCash || ""}
                        onChange={(e) => setBusinessCash(Math.max(0, Number(e.target.value)))}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:bg-white text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Saleable Business Inventory</label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-semibold">{currentCurrency.symbol}</div>
                      <input
                        type="number"
                        min="0"
                        value={businessInventory || ""}
                        onChange={(e) => setBusinessInventory(Math.max(0, Number(e.target.value)))}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-[#518231] focus:bg-white text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Liabilities & Deductions */}
              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-bold text-red-500 dark:text-red-400 uppercase tracking-wider">5. Liabilities & Deductible Debts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Outstanding Personal Debts</label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-semibold">{currentCurrency.symbol}</div>
                      <input
                        type="number"
                        min="0"
                        value={debtsOutstanding || ""}
                        onChange={(e) => setDebtsOutstanding(Math.max(0, Number(e.target.value)))}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Unpaid Utility & Rent Bills</label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-semibold">{currentCurrency.symbol}</div>
                      <input
                        type="number"
                        min="0"
                        value={billsUnpaid || ""}
                        onChange={(e) => setBillsUnpaid(Math.max(0, Number(e.target.value)))}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Business Loans (Short-Term)</label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-semibold">{currentCurrency.symbol}</div>
                      <input
                        type="number"
                        min="0"
                        value={businessLoans || ""}
                        onChange={(e) => setBusinessLoans(Math.max(0, Number(e.target.value)))}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Immediate Taxes Due</label>
                    <div className="relative rounded-xl shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-semibold">{currentCurrency.symbol}</div>
                      <input
                        type="number"
                        min="0"
                        value={taxesDue || ""}
                        onChange={(e) => setTaxesDue(Math.max(0, Number(e.target.value)))}
                        className="block w-full pl-10 pr-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced toggle & options */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center gap-1 text-sm font-bold text-[#518231] hover:text-[#436a28]"
                >
                  {showAdvanced ? "Hide Advanced & Custom Assets" : "Show Advanced & Custom Assets"}
                  <ArrowRight size={14} className={`transition-transform ${showAdvanced ? "rotate-90" : ""}`} />
                </button>

                {showAdvanced && (
                  <div className="mt-4 space-y-6 bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200/60 dark:border-slate-800 animate-fade-in">
                    
                    {/* Agri & Livestock */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Agricultural Produce value</label>
                        <input
                          type="number"
                          value={agriAssets || ""}
                          onChange={(e) => setAgriAssets(Math.max(0, Number(e.target.value)))}
                          className="block w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-[#518231]"
                          placeholder="0"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Livestock value (Zakat-rated)</label>
                        <input
                          type="number"
                          value={livestockAssets || ""}
                          onChange={(e) => setLivestockAssets(Math.max(0, Number(e.target.value)))}
                          className="block w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm bg-white dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-[#518231]"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Custom Assets Section */}
                    <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-500 uppercase">Custom Assets</span>
                      
                      {customAssets.length > 0 && (
                        <ul className="space-y-2">
                          {customAssets.map(asset => (
                            <li key={asset.id} className="flex items-center justify-between bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200/50 dark:border-slate-800 text-sm">
                              <span className="text-slate-700 dark:text-slate-300 font-medium">{asset.name}</span>
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-slate-900 dark:text-white">{formatMoney(asset.value)}</span>
                                <button type="button" onClick={() => handleRemoveCustomAsset(asset.id)} className="text-red-500 hover:text-red-700">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newAssetName}
                          onChange={(e) => setNewAssetName(e.target.value)}
                          placeholder="Asset Name (e.g. Land Property)"
                          className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                        />
                        <input
                          type="number"
                          value={newAssetValue || ""}
                          onChange={(e) => setNewAssetValue(Math.max(0, Number(e.target.value)))}
                          placeholder="Value"
                          className="w-28 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                        />
                        <button
                          type="button"
                          onClick={handleAddCustomAsset}
                          className="bg-[#518231] hover:bg-[#436a28] text-white p-2 rounded-lg transition-colors flex items-center justify-center shrink-0"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Custom Liabilities Section */}
                    <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                      <span className="text-xs font-bold text-slate-500 uppercase">Custom Liabilities / Deductions</span>
                      
                      {customLiabilities.length > 0 && (
                        <ul className="space-y-2">
                          {customLiabilities.map(liab => (
                            <li key={liab.id} className="flex items-center justify-between bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200/50 dark:border-slate-800 text-sm">
                              <span className="text-slate-700 dark:text-slate-300 font-medium">{liab.name}</span>
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-red-500 dark:text-red-400">{formatMoney(liab.value)}</span>
                                <button type="button" onClick={() => handleRemoveCustomLiability(liab.id)} className="text-red-500 hover:text-red-700">
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newLiabName}
                          onChange={(e) => setNewLiabName(e.target.value)}
                          placeholder="Deduction Name (e.g. Family Loan)"
                          className="flex-1 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                        />
                        <input
                          type="number"
                          value={newLiabValue || ""}
                          onChange={(e) => setNewLiabValue(Math.max(0, Number(e.target.value)))}
                          placeholder="Value"
                          className="w-28 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-1 focus:ring-[#518231]"
                        />
                        <button
                          type="button"
                          onClick={handleAddCustomLiability}
                          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-colors flex items-center justify-center shrink-0"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Sticky Results & Graphs Panel */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          
          {/* Main Results Card */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden print-card">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#518231]/10 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Header info */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Zakat Due</span>
                <div className="text-3xl sm:text-4xl font-black mt-1 text-green-400 animate-pulse">{formatMoney(results.zakatDue)}</div>
              </div>
              <div className={`px-3 py-1.5 rounded-xl border text-xs font-bold ${
                results.meetsNisab 
                  ? "bg-green-950/50 border-green-800 text-green-400" 
                  : "bg-amber-950/50 border-amber-800 text-amber-400"
              }`}>
                {results.meetsNisab ? "Nisab Met (Zakat Eligible)" : "Below Nisab (Exempt)"}
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 border-t border-slate-800 pt-6">
              <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Assets</span>
                <div className="text-sm font-bold mt-1 text-slate-100">{formatMoney(results.totalAssets)}</div>
              </div>
              <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Liabilities</span>
                <div className="text-sm font-bold mt-1 text-red-400">{formatMoney(results.totalLiabilities)}</div>
              </div>
              <div className="bg-slate-800/40 p-3 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Net Wealth</span>
                <div className="text-sm font-bold mt-1 text-slate-100">{formatMoney(results.netWealth)}</div>
              </div>
            </div>

            {/* Nisab Alert explanation */}
            <div className="mt-6 bg-slate-800/30 border border-slate-800 p-4 rounded-2xl text-xs text-slate-300 space-y-2 leading-relaxed">
              <div className="flex items-center gap-2 font-bold text-slate-100">
                <Scale size={14} className="text-[#518231]" />
                Nisab Target: {formatMoney(results.chosenNisabThreshold)}
              </div>
              <p>
                Your net wealth of <strong className="text-slate-100">{formatMoney(results.netWealth)}</strong> is calculated by subtracting liabilities from assets. 
                Your wealth is {results.meetsNisab ? "above" : "below"} the {nisabType} Nisab threshold.
              </p>
              {!results.meetsNisab && (
                <div className="flex items-start gap-1 text-amber-400 bg-amber-950/20 border border-amber-900/50 p-2 rounded-xl mt-2">
                  <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                  <span>Your net wealth is below Nisab. You are not religiously required to pay Zakat on this wealth.</span>
                </div>
              )}
            </div>

            {/* Print, Export & Copy Buttons */}
            <div className="grid grid-cols-2 gap-2 mt-6">
              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-slate-700"
              >
                <Share2 size={13} />
                {copied ? "Copied!" : "Share Link"}
              </button>
              <button
                type="button"
                onClick={handleCopyResults}
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-slate-700"
              >
                <Copy size={13} />
                Copy Text
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-slate-700"
              >
                <Printer size={13} />
                Print PDF
              </button>
              <button
                type="button"
                onClick={handleExportCSV}
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-xl text-xs transition-colors border border-slate-700"
              >
                <Download size={13} />
                Export CSV
              </button>
            </div>
          </div>

          {/* Tabbed Interactive Breakdown / Chart panel */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            {/* Tabs Headers */}
            <div className="flex border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1">
              {(["summary", "breakdown", "charts", "explanation"] as const).map(tab => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 text-center py-2.5 text-xs font-bold rounded-xl transition-all capitalize ${
                    activeTab === tab
                      ? "bg-white dark:bg-slate-900 text-[#518231] shadow-sm"
                      : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Contents */}
            <div className="p-6">
              
              {/* Tab 1: Summary Details */}
              {activeTab === "summary" && (
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">Calculated Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-sm">
                      <span className="text-slate-500">Gross Assets</span>
                      <span className="font-bold text-slate-900 dark:text-white">{formatMoney(results.totalAssets)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-sm">
                      <span className="text-slate-500">Total Liabilities</span>
                      <span className="font-bold text-red-500">{formatMoney(results.totalLiabilities)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-sm">
                      <span className="text-slate-500">Net Zakatable Wealth</span>
                      <span className="font-bold text-slate-900 dark:text-white">{formatMoney(results.netWealth)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800 text-sm">
                      <span className="text-slate-500">Nisab Target ({nisabType.toUpperCase()})</span>
                      <span className="font-bold text-slate-900 dark:text-white">{formatMoney(results.chosenNisabThreshold)}</span>
                    </div>
                  </div>
                  <div className="bg-[#518231]/5 dark:bg-[#518231]/10 p-4 rounded-2xl border border-[#518231]/20 flex items-start gap-2.5">
                    <Sparkles className="text-[#518231] shrink-0 mt-0.5" size={16} />
                    <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Islamic Rule:</strong> Zakat is calculated at the rate of 2.5% on all wealth above Nisab that has been held for one lunar year (Hawl).
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Breakdown Cards */}
              {activeTab === "breakdown" && (
                <div className="grid grid-cols-2 gap-3">
                  <BreakdownCard title="Cash & Savings" value={results.cashTotal} color="bg-emerald-500" formatMoney={formatMoney} />
                  <BreakdownCard title="Gold & Silver" value={results.metalsTotal} color="bg-amber-500" formatMoney={formatMoney} />
                  <BreakdownCard title="Investments" value={results.investTotal} color="bg-blue-500" formatMoney={formatMoney} />
                  <BreakdownCard title="Business Wealth" value={results.businessTotal} color="bg-violet-500" formatMoney={formatMoney} />
                  <BreakdownCard title="Liabilities" value={results.totalLiabilities} color="bg-red-500" formatMoney={formatMoney} isLiab />
                  <BreakdownCard title="Final Zakat" value={results.zakatDue} color="bg-green-600" formatMoney={formatMoney} />
                </div>
              )}

              {/* Tab 3: Visualization Charts */}
              {activeTab === "charts" && (
                <div className="space-y-6">
                  {isClient ? (
                    <>
                      {/* Allocation Donut Chart */}
                      {pieData.length > 0 ? (
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Asset Allocation</span>
                          <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={pieData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={45}
                                  outerRadius={65}
                                  paddingAngle={2}
                                  dataKey="value"
                                >
                                  {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <Tooltip formatter={(val: any) => formatMoney(Number(val || 0))} />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                          
                          {/* Legend list */}
                          <div className="grid grid-cols-2 gap-2 mt-2">
                            {pieData.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }}></span>
                                <span className="truncate">{item.name} ({Math.round((item.value / results.totalAssets) * 100)}%)</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-10 text-slate-400 text-xs">Enter values to view the allocation chart.</div>
                      )}

                      {/* Assets vs Liabilities Bar Chart */}
                      <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Assets vs Liabilities</span>
                        <div className="h-44 w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="name" tick={false} />
                              <YAxis tickFormatter={(val) => `${currentCurrency.symbol}${val.toLocaleString()}`} />
                              <Tooltip formatter={(val: any) => formatMoney(Number(val || 0))} />
                              <Bar dataKey="Assets" fill="#10b981" radius={[4, 4, 0, 0]} />
                              <Bar dataKey="Liabilities" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="h-48 flex items-center justify-center text-slate-400 text-xs">Loading charts...</div>
                  )}
                </div>
              )}

              {/* Tab 4: Step-by-Step Explanation */}
              {activeTab === "explanation" && (
                <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-2">Step-by-Step Calculations</h4>
                  
                  <div className="space-y-3">
                    {/* Step 1 */}
                    <div className="border-l-2 border-green-500 pl-3">
                      <span className="font-bold text-slate-800 dark:text-white block">Step 1: Calculate Gross Assets</span>
                      <p>
                        Sum of cash ({formatMoney(results.cashTotal)}), metals ({formatMoney(results.metalsTotal)}), investments ({formatMoney(results.investTotal)}), 
                        business holdings ({formatMoney(results.businessTotal)}), and other custom resources.
                      </p>
                      <div className="font-mono mt-1 text-[#518231] font-bold">{formatMoney(results.totalAssets)}</div>
                    </div>

                    {/* Step 2 */}
                    <div className="border-l-2 border-red-500 pl-3">
                      <span className="font-bold text-slate-800 dark:text-white block">Step 2: Subtract Liabilities</span>
                      <p>Deduct short-term debts, business loans, immediate utility bills, and tax liabilities due.</p>
                      <div className="font-mono mt-1 text-red-500 font-bold">{formatMoney(results.totalLiabilities)}</div>
                    </div>

                    {/* Step 3 */}
                    <div className="border-l-2 border-blue-500 pl-3">
                      <span className="font-bold text-slate-800 dark:text-white block">Step 3: Compare with Nisab Threshold</span>
                      <p>
                        Your net wealth (<strong className="text-slate-800 dark:text-white">{formatMoney(results.netWealth)}</strong>) is compared to the 
                        {nisabType} Nisab target threshold (<strong className="text-slate-800 dark:text-white">{formatMoney(results.chosenNisabThreshold)}</strong>).
                      </p>
                      <div className="font-bold mt-1 text-blue-500">
                        {results.meetsNisab ? "Net Wealth >= Nisab (Zakat is Due)" : "Net Wealth < Nisab (Exempt)"}
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="border-l-2 border-purple-500 pl-3">
                      <span className="font-bold text-slate-800 dark:text-white block">Step 4: Compute Zakat Payable</span>
                      {results.meetsNisab ? (
                        <>
                          <p>Multiply the net wealth by the standard 2.5% Zakat rate:</p>
                          <div className="font-mono mt-1 text-green-500 font-bold">
                            {formatMoney(results.netWealth)} × 0.025 = {formatMoney(results.zakatDue)}
                          </div>
                        </>
                      ) : (
                        <p>No Zakat is due since your net wealth did not meet the required Nisab target threshold.</p>
                      )}
                    </div>
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

// Sub-component breakdown card
interface BreakdownCardProps {
  title: string;
  value: number;
  color: string;
  formatMoney: (val: number) => string;
  isLiab?: boolean;
}

function BreakdownCard({ title, value, color, formatMoney, isLiab = false }: BreakdownCardProps) {
  return (
    <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-800 p-3.5 rounded-2xl flex flex-col justify-between">
      <div className="flex items-center gap-1.5">
        <span className={`w-2 h-2 rounded-full ${color}`} />
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide truncate">{title}</span>
      </div>
      <div className={`text-sm font-black mt-2 ${isLiab ? "text-red-500" : "text-slate-900 dark:text-white"}`}>
        {formatMoney(value)}
      </div>
    </div>
  );
}

// Tooltip helper
interface InfoTooltipProps {
  text: string;
}

function InfoTooltip({ text }: InfoTooltipProps) {
  return (
    <div className="group relative inline-block text-slate-400 hover:text-slate-600 cursor-pointer">
      <Info size={13} />
      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 bg-slate-900 text-white text-[10px] rounded-lg shadow-xl pointer-events-none z-50 leading-relaxed font-normal">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
      </div>
    </div>
  );
}
