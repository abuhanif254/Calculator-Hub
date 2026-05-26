"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useSettings } from "@/app/context/SettingsContext";
import {
  DollarSign,
  Percent,
  TrendingUp,
  Download,
  Copy,
  Printer,
  History,
  Trash,
  Plus,
  Scale,
  Sparkles,
  ArrowRight,
  TrendingDown,
  PieChart as PieChartIcon,
  Table,
  Home,
  Shield,
  FileText,
  CheckCircle,
  HelpCircle,
  Briefcase,
  User,
  X,
  Target,
  Calendar
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Legend
} from "recharts";

type CommMode = "basic" | "tiered" | "realestate" | "affiliate" | "freelancer" | "profitshare";

interface Tier {
  id: string;
  threshold: number;
  rate: number;
}

interface Partner {
  id: string;
  name: string;
  split: number;
}

interface HistoryItem {
  id: string;
  date: string;
  mode: CommMode;
  title: string;
  payout: number;
  revenue: number;
  currency: string;
}

export function CommissionCalculatorView({ calcDef }: { calcDef: CalculatorDef }) {
  const t = useTranslations("CommissionCalculator");
  const { unitSystem } = useSettings();

  // Mode Selection
  const [mode, setMode] = useState<CommMode>("basic");

  // Currency Settings
  const [currency, setCurrency] = useState("USD");
  const [customCurrencySymbol, setCustomCurrencySymbol] = useState("$");

  const currencySymbol = useMemo(() => {
    switch (currency) {
      case "USD": return "$";
      case "EUR": return "€";
      case "GBP": return "£";
      case "CAD": return "CA$";
      case "AUD": return "A$";
      case "BDT": return "৳";
      default: return customCurrencySymbol;
    }
  }, [currency, customCurrencySymbol]);

  // General Settings
  const [taxRate, setTaxRate] = useState("25");
  const [targetGoal, setTargetGoal] = useState("10000");

  // Mode 1: Basic & Reverse Commission
  const [isReverse, setIsReverse] = useState(false);
  const [basicRevenue, setBasicRevenue] = useState("50000");
  const [basicRate, setBasicRate] = useState("5.0");
  const [basicBonus, setBasicBonus] = useState("1000");
  const [targetEarnings, setTargetEarnings] = useState("5000");

  // Mode 2: Tiered Commission
  const [tieredRevenue, setTieredRevenue] = useState("60000");
  const [tieredTaxes, setTieredTaxes] = useState("25");
  const [tieredBonus, setTieredBonus] = useState("1500");
  const [tierModel, setTierModel] = useState<"progressive" | "flat">("progressive");
  const [tiers, setTiers] = useState<Tier[]>([
    { id: "1", threshold: 10000, rate: 5 },
    { id: "2", threshold: 30000, rate: 8 },
    { id: "3", threshold: 60000, rate: 12 },
    { id: "4", threshold: 100000, rate: 15 }
  ]);

  // Mode 3: Real Estate Commission
  const [propertyPrice, setPropertyPrice] = useState("450000");
  const [totalCommRate, setTotalCommRate] = useState("5.0");
  const [listingAgentSplit, setListingAgentSplit] = useState("50"); // e.g. 50% split with buying agent
  const [listingBrokerSplit, setListingBrokerSplit] = useState("70"); // agent gets 70%, broker gets 30%
  const [buyingBrokerSplit, setBuyingBrokerSplit] = useState("80"); // buying agent gets 80%, broker gets 20%
  const [franchiseFeePct, setFranchiseFeePct] = useState("3.0"); // franchise fee cut from agent total

  // Mode 4: Affiliate & Digital Mode
  const [referralsCount, setReferralsCount] = useState("200");
  const [referralProductPrice, setReferralProductPrice] = useState("49");
  const [affiliateRate, setAffiliateRate] = useState("30.0");
  const [affiliateCpaFlat, setAffiliateCpaFlat] = useState("0");
  const [isRecurring, setIsRecurring] = useState(true);
  const [recurringRate, setRecurringRate] = useState("20.0");
  const [subscriptionLifespan, setSubscriptionLifespan] = useState("6");

  // Mode 5: Freelancer / Marketplace Mode
  const [projectBudget, setProjectBudget] = useState("5000");
  const [marketplaceFeeRate, setMarketplaceFeeRate] = useState("10.0"); // e.g. Upwork 10%
  const [agencySplitRate, setAgencySplitRate] = useState("15.0");
  const [referralFeeRate, setReferralFeeRate] = useState("5.0");

  // Mode 6: Profit Sharing Mode
  const [revenuePool, setRevenuePool] = useState("120000");
  const [overheadExpenses, setOverheadExpenses] = useState("35000");
  const [partners, setPartners] = useState<Partner[]>([
    { id: "1", name: "Partner A", split: 60 },
    { id: "2", name: "Partner B", split: 40 }
  ]);

  // UI Tabs / Controls
  const [activeOutputTab, setActiveOutputTab] = useState<"overview" | "graphs" | "table" | "history">("overview");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Manage Tiers helpers
  const handleAddTier = () => {
    if (tiers.length >= 6) return;
    const lastTier = tiers[tiers.length - 1];
    const newThreshold = lastTier ? lastTier.threshold + 25000 : 25000;
    const newRate = lastTier ? lastTier.rate + 2 : 5;
    setTiers([...tiers, { id: Math.random().toString(), threshold: newThreshold, rate: newRate }]);
  };

  const handleRemoveTier = (id: string) => {
    if (tiers.length <= 1) return;
    setTiers(tiers.filter(t => t.id !== id));
  };

  const handleUpdateTier = (id: string, key: "threshold" | "rate", value: number) => {
    setTiers(tiers.map(t => (t.id === id ? { ...t, [key]: value } : t)));
  };

  // Manage Partners helpers
  const handleAddPartner = () => {
    if (partners.length >= 8) return;
    const newName = `Partner ${String.fromCharCode(65 + partners.length)}`;
    const remainingSplit = Math.max(0, 100 - partners.reduce((sum, p) => sum + p.split, 0));
    setPartners([...partners, { id: Math.random().toString(), name: newName, split: remainingSplit }]);
  };

  const handleRemovePartner = (id: string) => {
    if (partners.length <= 1) return;
    setPartners(partners.filter(p => p.id !== id));
  };

  const handleUpdatePartner = (id: string, key: "name" | "split", value: any) => {
    setPartners(partners.map(p => (p.id === id ? { ...p, [key]: value } : p)));
  };

  // Calculate earnings based on mode
  const calculations = useMemo(() => {
    const taxRatePct = parseFloat(taxRate) || 0;
    const targetGoalAmt = parseFloat(targetGoal) || 0;

    let revenue = 0;
    let grossPayout = 0;
    let netEarnings = 0;
    let taxAmount = 0;
    let feesExpenses = 0;
    let requiredSalesVolume = 0;

    let detailsList: { label: string; value: number }[] = [];

    // Basic & Reverse Mode
    if (mode === "basic") {
      if (!isReverse) {
        const rev = parseFloat(basicRevenue) || 0;
        const rate = parseFloat(basicRate) || 0;
        const bonus = parseFloat(basicBonus) || 0;

        revenue = rev;
        const comm = rev * (rate / 100);
        grossPayout = comm + bonus;

        detailsList = [
          { label: "Commission Flat Cut", value: comm },
          { label: "Performance Bonus", value: bonus }
        ];
      } else {
        const target = parseFloat(targetEarnings) || 0;
        const rate = parseFloat(basicRate) || 0;
        const bonus = parseFloat(basicBonus) || 0;

        grossPayout = target;
        requiredSalesVolume = rate > 0 ? Math.max(0, target - bonus) / (rate / 100) : 0;
        revenue = requiredSalesVolume;

        detailsList = [
          { label: "Required Sales Goal", value: requiredSalesVolume },
          { label: "Included Base Bonus", value: bonus }
        ];
      }
    }

    // Tiered Mode
    else if (mode === "tiered") {
      const rev = parseFloat(tieredRevenue) || 0;
      const bonus = parseFloat(tieredBonus) || 0;
      revenue = rev;

      // Sort tiers by threshold ascending
      const sortedTiers = [...tiers].sort((a, b) => a.threshold - b.threshold);

      if (tierModel === "progressive") {
        let remainingRev = rev;
        let prevThreshold = 0;
        let cumulativeTierComm = 0;

        sortedTiers.forEach((tier, index) => {
          const tierLimit = tier.threshold - prevThreshold;
          const revInThisTier = Math.min(Math.max(0, remainingRev), tierLimit);

          const tierPayout = revInThisTier * (tier.rate / 100);
          cumulativeTierComm += tierPayout;

          if (revInThisTier > 0) {
            detailsList.push({
              label: `Tier ${index + 1} (${tier.rate}% on up to $${tier.threshold.toLocaleString()})`,
              value: tierPayout
            });
          }

          remainingRev -= revInThisTier;
          prevThreshold = tier.threshold;
        });

        // Any excess revenue beyond the last threshold gets paid at the last tier's rate
        if (remainingRev > 0 && sortedTiers.length > 0) {
          const lastTier = sortedTiers[sortedTiers.length - 1];
          const excessPayout = remainingRev * (lastTier.rate / 100);
          cumulativeTierComm += excessPayout;
          detailsList.push({
            label: `Excess Tier (${lastTier.rate}% above $${lastTier.threshold.toLocaleString()})`,
            value: excessPayout
          });
        }

        grossPayout = cumulativeTierComm + bonus;
      } else {
        // Flat Tier Model: Entire revenue is paid at the highest rate reached
        let activeRate = 0;
        sortedTiers.forEach(t => {
          if (rev >= t.threshold) {
            activeRate = t.rate;
          }
        });
        if (activeRate === 0 && sortedTiers[0]) {
          activeRate = sortedTiers[0].rate;
        }

        const flatComm = rev * (activeRate / 100);
        grossPayout = flatComm + bonus;

        detailsList = [
          { label: `Flat Rate Applied (${activeRate}%)`, value: flatComm },
          { label: "Tier Performance Bonus", value: bonus }
        ];
      }

      if (bonus > 0) {
        detailsList.push({ label: "Tier Performance Bonus", value: bonus });
      }
    }

    // Real Estate Mode
    else if (mode === "realestate") {
      const price = parseFloat(propertyPrice) || 0;
      const totalRate = parseFloat(totalCommRate) || 0;
      const splitPct = parseFloat(listingAgentSplit) || 0;

      const brokerListPct = parseFloat(listingBrokerSplit) || 0;
      const brokerBuyPct = parseFloat(buyingBrokerSplit) || 0;
      const franchisePct = parseFloat(franchiseFeePct) || 0;

      revenue = price;
      const totalCommission = price * (totalRate / 100);

      const listingSideShare = totalCommission * (splitPct / 100);
      const buyingSideShare = totalCommission - listingSideShare;

      // Listing Agent Net & Broker Net
      const listingFranchiseCut = listingSideShare * (franchisePct / 100);
      const listingBrokerCut = (listingSideShare - listingFranchiseCut) * ((100 - brokerListPct) / 100);
      const listingAgentNet = listingSideShare - listingFranchiseCut - listingBrokerCut;

      // Buying Agent Net & Broker Net
      const buyingFranchiseCut = buyingSideShare * (franchisePct / 100);
      const buyingBrokerCut = (buyingSideShare - buyingFranchiseCut) * ((100 - brokerBuyPct) / 100);
      const buyingAgentNet = buyingSideShare - buyingFranchiseCut - buyingBrokerCut;

      grossPayout = listingAgentNet; // Let's focus on Listing Agent Net as primary payout for user split analysis
      feesExpenses = listingFranchiseCut + listingBrokerCut;

      detailsList = [
        { label: "Total Gross Commission Pool", value: totalCommission },
        { label: "Listing Side Split (50%)", value: listingSideShare },
        { label: "Listing Brokerage Cut", value: listingBrokerCut },
        { label: "Franchise Royalty Fee", value: listingFranchiseCut },
        { label: "Selling Agent Payout", value: buyingAgentNet },
        { label: "Selling Brokerage Cut", value: buyingBrokerCut }
      ];
    }

    // Affiliate Mode
    else if (mode === "affiliate") {
      const count = parseFloat(referralsCount) || 0;
      const unitPrice = parseFloat(referralProductPrice) || 0;
      const flatCpa = parseFloat(affiliateCpaFlat) || 0;
      const rate = parseFloat(affiliateRate) || 0;
      const recurring = parseFloat(recurringRate) || 0;
      const lifespan = parseFloat(subscriptionLifespan) || 1;

      revenue = count * unitPrice;
      const upfrontComm = count * (flatCpa + (unitPrice * (rate / 100)));

      let recurringComm = 0;
      if (isRecurring && lifespan > 1) {
        recurringComm = count * (unitPrice * (recurring / 100)) * (lifespan - 1);
      }

      grossPayout = upfrontComm + recurringComm;

      detailsList = [
        { label: "Upfront CPA Payout", value: upfrontComm }
      ];
      if (isRecurring && recurringComm > 0) {
        detailsList.push({ label: `Recurring Earnings (${lifespan - 1} months)`, value: recurringComm });
      }
    }

    // Freelancer Mode
    else if (mode === "freelancer") {
      const budget = parseFloat(projectBudget) || 0;
      const marketplaceFee = parseFloat(marketplaceFeeRate) || 0;
      const agencySplit = parseFloat(agencySplitRate) || 0;
      const partnerSplit = parseFloat(referralFeeRate) || 0;

      revenue = budget;
      const marketCut = budget * (marketplaceFee / 100);
      const agencyCut = budget * (agencySplit / 100);
      const partnerCut = budget * (partnerSplit / 100);

      grossPayout = budget - marketCut - agencyCut - partnerCut;
      feesExpenses = marketCut + agencyCut + partnerCut;

      detailsList = [
        { label: "Project Budget Volume", value: budget },
        { label: "Marketplace Platform Fee", value: marketCut },
        { label: "Agency Commission split", value: agencyCut },
        { label: "Referral Partner share", value: partnerCut }
      ];
    }

    // Profit Sharing Mode
    else if (mode === "profitshare") {
      const pool = parseFloat(revenuePool) || 0;
      const overhead = parseFloat(overheadExpenses) || 0;

      revenue = pool;
      const profitPool = Math.max(0, pool - overhead);
      grossPayout = profitPool; // Pool total profit as output

      const splitsSum = partners.reduce((s, p) => s + p.split, 0);

      partners.forEach(partner => {
        const partnerAmt = profitPool * (partner.split / 100);
        detailsList.push({
          label: `${partner.name} Share (${partner.split}%)`,
          value: partnerAmt
        });
      });

      feesExpenses = overhead;
    }

    // General tax and earnings
    taxAmount = grossPayout * (taxRatePct / 100);
    netEarnings = Math.max(0, grossPayout - taxAmount);

    const goalMetPercent = targetGoalAmt > 0 ? Math.min(100, (grossPayout / targetGoalAmt) * 100) : 0;

    return {
      isValid: revenue > 0 || grossPayout > 0,
      revenue,
      grossPayout,
      netEarnings,
      taxAmount,
      feesExpenses,
      requiredSalesVolume,
      goalMetPercent,
      detailsList
    };
  }, [
    mode, isReverse, basicRevenue, basicRate, basicBonus, targetEarnings,
    tieredRevenue, tieredBonus, tierModel, tiers,
    propertyPrice, totalCommRate, listingAgentSplit, listingBrokerSplit, buyingBrokerSplit, franchiseFeePct,
    referralsCount, referralProductPrice, affiliateRate, affiliateCpaFlat, isRecurring, recurringRate, subscriptionLifespan,
    projectBudget, marketplaceFeeRate, agencySplitRate, referralFeeRate,
    revenuePool, overheadExpenses, partners, taxRate, targetGoal
  ]);

  // Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("commission-calculator-history");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading history", e);
      }
    }
  }, []);

  const handleSaveToHistory = () => {
    if (!calculations.isValid) return;

    let title = "";
    if (mode === "basic") title = isReverse ? "Reverse Target Goal" : "Basic Sales Commission";
    else if (mode === "tiered") title = `Tiered (${tierModel === "progressive" ? "Progressive" : "Flat"})`;
    else if (mode === "realestate") title = "Real Estate Agent Split";
    else if (mode === "affiliate") title = "Affiliate CPA & Subscription";
    else if (mode === "freelancer") title = "Freelancer Payout";
    else if (mode === "profitshare") title = "Profit Sharing Allocation";

    const newItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      mode,
      title,
      payout: calculations.grossPayout,
      revenue: calculations.revenue,
      currency: currencySymbol
    };

    const updated = [newItem, ...history].slice(0, 15);
    setHistory(updated);
    localStorage.setItem("commission-calculator-history", JSON.stringify(updated));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleRestore = (item: HistoryItem) => {
    setMode(item.mode);
    // Find matching symbol to set currency dropdown
    if (item.currency === "$") setCurrency("USD");
    else if (item.currency === "€") setCurrency("EUR");
    else if (item.currency === "£") setCurrency("GBP");
    else if (item.currency === "CA$") setCurrency("CAD");
    else if (item.currency === "A$") setCurrency("AUD");
    else if (item.currency === "৳") setCurrency("BDT");
    else {
      setCurrency("Custom");
      setCustomCurrencySymbol(item.currency);
    }
  };

  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter((h) => h.id !== id);
    setHistory(updated);
    localStorage.setItem("commission-calculator-history", JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("commission-calculator-history");
  };

  // Exporters & copy utilities
  const triggerCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getReportText = () => {
    if (!calculations.isValid) return "";
    let text = `--- Sales Commission Report ---\n`;
    text += `Mode: ${mode.toUpperCase()}\n`;
    text += `Sales Volume / Revenue: ${currencySymbol}${calculations.revenue.toLocaleString()}\n`;
    text += `Estimated Tax Rate: ${taxRate}%\n`;
    text += `------------------------------------\n`;
    text += `RESULTS:\n`;
    text += `Gross Commission: ${currencySymbol}${calculations.grossPayout.toLocaleString()}\n`;
    text += `Tax Deduction: ${currencySymbol}${calculations.taxAmount.toLocaleString()}\n`;
    text += `Net Earnings: ${currencySymbol}${calculations.netEarnings.toLocaleString()}\n`;
    if (calculations.feesExpenses > 0) {
      text += `Broker/Marketplace Cuts: ${currencySymbol}${calculations.feesExpenses.toLocaleString()}\n`;
    }
    text += `------------------------------------\n`;
    text += `Generated on NexusCalculator.net`;
    return text;
  };

  const downloadReport = (content: string, type: string, ext: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `commission-report.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsCSV = () => {
    if (!calculations.isValid) return;
    const headers = ["Label", "Amount ($)"];
    const rows = [
      ["Revenue Pool", calculations.revenue],
      ["Gross Payout", calculations.grossPayout],
      ["Tax Deduction", calculations.taxAmount],
      ["Net Earnings", calculations.netEarnings]
    ];
    calculations.detailsList.forEach(item => {
      rows.push([item.label, item.value]);
    });
    const csvContent = [headers, ...rows].map(row => row.map(val => `"${val}"`).join(",")).join("\n");
    downloadReport(csvContent, "text/csv", "csv");
  };

  const exportAsJSON = () => {
    if (!calculations.isValid) return;
    const content = JSON.stringify({
      timestamp: new Date().toISOString(),
      mode,
      currency: currencySymbol,
      taxRate: parseFloat(taxRate),
      revenue: calculations.revenue,
      grossPayout: calculations.grossPayout,
      taxAmount: calculations.taxAmount,
      netEarnings: calculations.netEarnings,
      details: calculations.detailsList
    }, null, 2);
    downloadReport(content, "application/json", "json");
  };

  // Pie chart data: Earnings vs Taxes vs Fees
  const pieChartData = useMemo(() => {
    if (!calculations.isValid) return [];
    return [
      { name: "Net Earnings", value: calculations.netEarnings, color: "#10b981" },
      { name: "Taxes", value: calculations.taxAmount, color: "#ef4444" },
      { name: "Market/Broker Fees", value: calculations.feesExpenses, color: "#f59e0b" }
    ].filter(item => item.value > 0);
  }, [calculations]);

  // Line chart data: projected growth over 12 months (assuming steady growth of 5% monthly)
  const growthChartData = useMemo(() => {
    if (!calculations.isValid) return [];
    const monthlyPayout = calculations.grossPayout;
    const data = [];
    let cumulative = 0;
    for (let month = 1; month <= 12; month++) {
      // Adding a simulated compounding month-over-month growth of 3%
      const monthEarnings = monthlyPayout * Math.pow(1.03, month - 1);
      cumulative += monthEarnings;
      data.push({
        name: `Month ${month}`,
        "Monthly Commission": Math.round(monthEarnings),
        "Cumulative Payout": Math.round(cumulative)
      });
    }
    return data;
  }, [calculations]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden print:shadow-none print:border-none">
      
      {/* HEADER BANNER */}
      <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center shadow-inner">
            <Scale size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-850 dark:text-white leading-tight">
              {calcDef.title || "Commission Calculator"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 print:hidden">
              Analyze tiered sales rates, real-estate splits, affiliate payouts, CPA, and partnership structures
            </p>
          </div>
        </div>

        {/* Currency & general controls */}
        <div className="flex items-center gap-2 print:hidden">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-350 dark:border-slate-700 text-xs font-bold rounded-lg outline-none cursor-pointer"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="CAD">CAD (CA$)</option>
            <option value="AUD">AUD (A$)</option>
            <option value="BDT">BDT (৳)</option>
            <option value="Custom">Custom</option>
          </select>

          {currency === "Custom" && (
            <input
              type="text"
              value={customCurrencySymbol}
              onChange={(e) => setCustomCurrencySymbol(e.target.value)}
              placeholder="e.g. ¥"
              className="w-12 px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-350 dark:border-slate-700 text-xs font-bold rounded-lg text-center outline-none"
            />
          )}
        </div>
      </div>

      {/* DASHBOARD NAVIGATION */}
      <div className="px-6 md:px-8 py-3 bg-slate-50 dark:bg-slate-850/20 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center print:hidden">
        <div className="flex bg-slate-100 dark:bg-slate-850 p-1 rounded-xl overflow-x-auto w-full md:w-auto scrollbar-none">
          {[
            { id: "overview", label: "Overview & Forecast" },
            { id: "graphs", label: "Earnings Graphs" },
            { id: "table", label: "Payout Table" },
            { id: "history", label: "Saved Scenarios" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveOutputTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                activeOutputTab === tab.id
                  ? "bg-white dark:bg-slate-700 text-slate-850 dark:text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUTS PANEL (LEFT 5 COLUMNS) */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          
          {/* CALCULATOR MODEL SELECTOR */}
          <div className="bg-slate-50 dark:bg-slate-850/30 p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Briefcase size={16} /> Commission Model
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "basic", label: "Basic / Target" },
                { id: "tiered", label: "Tiered Rate" },
                { id: "realestate", label: "Real Estate Split" },
                { id: "affiliate", label: "Affiliate CPA" },
                { id: "freelancer", label: "Freelancer Fee" },
                { id: "profitshare", label: "Profit Share" }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id as CommMode)}
                  className={`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${
                    mode === m.id
                      ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                      : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-100 dark:text-slate-350 dark:hover:bg-slate-750"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* DYNAMIC CALCULATOR INPUTS */}
          <div className="bg-slate-50 dark:bg-slate-850/30 p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-450 dark:text-slate-505 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={16} /> Configuration Parameters
            </h3>

            {/* MODE 1: BASIC / REVERSE COMMISSION */}
            {mode === "basic" && (
              <div className="space-y-4">
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-2">
                  <button
                    onClick={() => setIsReverse(false)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      !isReverse
                        ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    Calculate Commission
                  </button>
                  <button
                    onClick={() => setIsReverse(true)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      isReverse
                        ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                        : "text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    Reverse (Calculate Sales)
                  </button>
                </div>

                {!isReverse ? (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Sales Revenue</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">{currencySymbol}</span>
                        <input
                          type="number"
                          value={basicRevenue}
                          onChange={(e) => setBasicRevenue(e.target.value)}
                          className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Target Earnings Goal</label>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">{currencySymbol}</span>
                        <input
                          type="number"
                          value={targetEarnings}
                          onChange={(e) => setTargetEarnings(e.target.value)}
                          className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Commission Rate</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={basicRate}
                        onChange={(e) => setBasicRate(e.target.value)}
                        className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                      />
                      <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Performance Bonus</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">{currencySymbol}</span>
                      <input
                        type="number"
                        value={basicBonus}
                        onChange={(e) => setBasicBonus(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODE 2: TIERED COMMISSION */}
            {mode === "tiered" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Total Sales Revenue</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">{currencySymbol}</span>
                    <input
                      type="number"
                      value={tieredRevenue}
                      onChange={(e) => setTieredRevenue(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Flat Performance Bonus</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">{currencySymbol}</span>
                      <input
                        type="number"
                        value={tieredBonus}
                        onChange={(e) => setTieredBonus(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Calculation Type</label>
                    <select
                      value={tierModel}
                      onChange={(e) => setTierModel(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none appearance-none cursor-pointer"
                    >
                      <option value="progressive">Progressive (Brackets)</option>
                      <option value="flat">Flat Tier Rate achieved</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-3">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Tiers Settings</label>
                    <button
                      onClick={handleAddTier}
                      disabled={tiers.length >= 6}
                      className="text-[10px] bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1"
                    >
                      <Plus size={10} /> Add Tier
                    </button>
                  </div>

                  {tiers.map((tier, idx) => (
                    <div key={tier.id} className="flex gap-2 items-center">
                      <span className="text-xs font-bold text-slate-400 w-16">Tier {idx + 1}:</span>
                      <div className="relative flex-1">
                        <input
                          type="number"
                          value={tier.threshold}
                          onChange={(e) => handleUpdateTier(tier.id, "threshold", parseFloat(e.target.value) || 0)}
                          className="w-full pl-6 pr-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none text-right font-semibold"
                        />
                        <span className="absolute left-2.5 top-1.5 text-[10px] text-slate-400 font-bold">{currencySymbol}</span>
                      </div>
                      <div className="relative w-20">
                        <input
                          type="number"
                          step="0.5"
                          value={tier.rate}
                          onChange={(e) => handleUpdateTier(tier.id, "rate", parseFloat(e.target.value) || 0)}
                          className="w-full pl-2 pr-6 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs outline-none text-right font-semibold"
                        />
                        <span className="absolute right-2.5 top-1.5 text-[10px] text-slate-400 font-bold">%</span>
                      </div>
                      <button
                        onClick={() => handleRemoveTier(tier.id)}
                        disabled={tiers.length <= 1}
                        className="text-slate-400 hover:text-red-500 disabled:opacity-30 p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MODE 3: REAL ESTATE COMMISSION */}
            {mode === "realestate" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-750 dark:text-slate-350 uppercase">Property Sale Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">{currencySymbol}</span>
                    <input
                      type="number"
                      value={propertyPrice}
                      onChange={(e) => setPropertyPrice(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Total Comm Rate</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={totalCommRate}
                        onChange={(e) => setTotalCommRate(e.target.value)}
                        className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                      />
                      <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Listing split %</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={listingAgentSplit}
                        onChange={(e) => setListingAgentSplit(e.target.value)}
                        className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                      />
                      <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <div className="space-y-1">
                    <label className="block text-[9px] font-extrabold text-slate-500 dark:text-slate-400 uppercase">Listing Broker split</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={listingBrokerSplit}
                        onChange={(e) => setListingBrokerSplit(e.target.value)}
                        className="w-full pl-2 pr-5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold outline-none"
                      />
                      <span className="absolute right-2 top-2 text-[9px] font-bold text-slate-400">%</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] font-extrabold text-slate-500 dark:text-slate-400 uppercase">Buying Broker split</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={buyingBrokerSplit}
                        onChange={(e) => setBuyingBrokerSplit(e.target.value)}
                        className="w-full pl-2 pr-5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold outline-none"
                      />
                      <span className="absolute right-2 top-2 text-[9px] font-bold text-slate-400">%</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] font-extrabold text-slate-500 dark:text-slate-400 uppercase">Franchise Fee</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={franchiseFeePct}
                        onChange={(e) => setFranchiseFeePct(e.target.value)}
                        className="w-full pl-2 pr-5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold outline-none"
                      />
                      <span className="absolute right-2 top-2 text-[9px] font-bold text-slate-400">%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODE 4: AFFILIATE & DIGITAL COMMISSION MODE */}
            {mode === "affiliate" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Monthly Referrals</label>
                    <input
                      type="number"
                      value={referralsCount}
                      onChange={(e) => setReferralsCount(e.target.value)}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Product Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">{currencySymbol}</span>
                      <input
                        type="number"
                        value={referralProductPrice}
                        onChange={(e) => setReferralProductPrice(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Upfront Rate</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={affiliateRate}
                        onChange={(e) => setAffiliateRate(e.target.value)}
                        className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                      />
                      <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Flat CPA Bonus</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">{currencySymbol}</span>
                      <input
                        type="number"
                        value={affiliateCpaFlat}
                        onChange={(e) => setAffiliateCpaFlat(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
                  <div>
                    <label htmlFor="recurring-toggle" className="block text-xs font-extrabold text-slate-750 dark:text-slate-350 cursor-pointer">
                      Recurring Commission
                    </label>
                    <span className="text-[10px] text-slate-400">Monthly subscription commissions</span>
                  </div>
                  <input
                    type="checkbox"
                    id="recurring-toggle"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                </div>

                {isRecurring && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Recurring Rate</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={recurringRate}
                          onChange={(e) => setRecurringRate(e.target.value)}
                          className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                        />
                        <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Avg Lifespan</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={subscriptionLifespan}
                          onChange={(e) => setSubscriptionLifespan(e.target.value)}
                          className="w-full pl-3 pr-14 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                        />
                        <span className="absolute right-3 top-2.5 text-[10px] text-slate-400 font-bold">Months</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* MODE 5: FREELANCER & CONTRACTOR MODE */}
            {mode === "freelancer" && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-755 dark:text-slate-350 uppercase">Project Budget</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">{currencySymbol}</span>
                    <input
                      type="number"
                      value={projectBudget}
                      onChange={(e) => setProjectBudget(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="block text-[9px] font-extrabold text-slate-500 uppercase">Marketplace Fee</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={marketplaceFeeRate}
                        onChange={(e) => setMarketplaceFeeRate(e.target.value)}
                        className="w-full pl-2 pr-5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold outline-none"
                      />
                      <span className="absolute right-2 top-2 text-[9px] font-bold text-slate-400">%</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] font-extrabold text-slate-500 uppercase">Agency Cut</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={agencySplitRate}
                        onChange={(e) => setAgencySplitRate(e.target.value)}
                        className="w-full pl-2 pr-5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold outline-none"
                      />
                      <span className="absolute right-2 top-2 text-[9px] font-bold text-slate-400">%</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[9px] font-extrabold text-slate-500 uppercase">Referral Fee</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={referralFeeRate}
                        onChange={(e) => setReferralFeeRate(e.target.value)}
                        className="w-full pl-2 pr-5 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold outline-none"
                      />
                      <span className="absolute right-2 top-2 text-[9px] font-bold text-slate-400">%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* MODE 6: PROFIT SHARING CALCULATOR */}
            {mode === "profitshare" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Revenue Pool</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">{currencySymbol}</span>
                      <input
                        type="number"
                        value={revenuePool}
                        onChange={(e) => setRevenuePool(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Overhead expenses</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">{currencySymbol}</span>
                      <input
                        type="number"
                        value={overheadExpenses}
                        onChange={(e) => setOverheadExpenses(e.target.value)}
                        className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-3">
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Partners Splits</label>
                    <button
                      onClick={handleAddPartner}
                      disabled={partners.length >= 8}
                      className="text-[10px] bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950 dark:hover:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-md font-bold transition-all flex items-center gap-1"
                    >
                      <Plus size={10} /> Add Partner
                    </button>
                  </div>

                  {partners.map((partner, index) => (
                    <div key={partner.id} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={partner.name}
                        onChange={(e) => handleUpdatePartner(partner.id, "name", e.target.value)}
                        className="w-24 px-2 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold outline-none"
                      />
                      <div className="relative flex-1">
                        <input
                          type="number"
                          value={partner.split}
                          onChange={(e) => handleUpdatePartner(partner.id, "split", parseFloat(e.target.value) || 0)}
                          className="w-full pl-2 pr-7 py-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-right font-semibold outline-none"
                        />
                        <span className="absolute right-2 top-1.5 text-[10px] text-slate-400 font-bold">%</span>
                      </div>
                      <button
                        onClick={() => handleRemovePartner(partner.id)}
                        disabled={partners.length <= 1}
                        className="text-slate-400 hover:text-red-500 disabled:opacity-30 p-1"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ADVANCED TAX & TARGET EARNINGS GOAL CARDS */}
          <div className="bg-slate-50 dark:bg-slate-850/30 p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Target size={16} /> Advanced Income Goals
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Target Goal</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">{currencySymbol}</span>
                  <input
                    type="number"
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Estimated Tax Rate</label>
                <div className="relative">
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                  />
                  <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-450 leading-relaxed">
              This tax calculation is a simplified estimation and does not constitute official legal or CPA tax advice.
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2">
            <button
              onClick={handleSaveToHistory}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle size={16} /> Plan Saved!
                </>
              ) : (
                <>
                  <History size={16} /> Save Plan
                </>
              )}
            </button>

            <button
              onClick={() => triggerCopy(getReportText(), "report")}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Copy size={16} /> {copiedKey === "report" ? "Copied!" : "Copy Report"}
            </button>
          </div>

        </div>

        {/* OUTPUT DISPLAY PANEL (RIGHT 7 COLUMNS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* PRIMARY EARNINGS DISPLAY CARD */}
          {calculations.isValid && (
            <div className="bg-slate-50 dark:bg-slate-850/50 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              <div className="md:col-span-8 space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Gross Commission Payout</span>
                  <h3 className="text-4xl font-black text-slate-850 dark:text-white mt-1">
                    {currencySymbol}{Math.round(calculations.grossPayout).toLocaleString()}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                  <div>
                    <span className="text-slate-450 dark:text-slate-500">Net Take-Home Earnings</span>
                    <p className="font-bold text-slate-750 dark:text-slate-200 mt-0.5">
                      {currencySymbol}{Math.round(calculations.netEarnings).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-450 dark:text-slate-500">Est. Tax Deduction</span>
                    <p className="font-bold text-red-500 mt-0.5">
                      -{currencySymbol}{Math.round(calculations.taxAmount).toLocaleString()} ({taxRate}%)
                    </p>
                  </div>
                </div>
              </div>

              {/* GOAL TARGET DIAL */}
              <div className="md:col-span-4 flex flex-col items-center justify-center border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-4 md:pt-0 md:pl-4">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  {/* Background Circle */}
                  <svg className="absolute w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      strokeWidth="8"
                      stroke="currentColor"
                      className="text-slate-200 dark:text-slate-800"
                      fill="transparent"
                    />
                    {/* Progress Circle */}
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * calculations.goalMetPercent) / 100}
                      strokeLinecap="round"
                      stroke="currentColor"
                      className="text-emerald-500"
                      fill="transparent"
                    />
                  </svg>
                  <div className="text-center z-10">
                    <span className="text-lg font-black text-slate-800 dark:text-white">{Math.round(calculations.goalMetPercent)}%</span>
                    <p className="text-[8px] uppercase font-bold text-slate-400 tracking-wider">Goal Met</p>
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-2 text-center">
                  Goal: {currencySymbol}{(parseFloat(targetGoal) || 0).toLocaleString()}
                </span>
              </div>

            </div>
          )}

          {/* TAB 1: OVERVIEW & FORECASTS */}
          {activeOutputTab === "overview" && calculations.isValid && (
            <div className="space-y-6">
              
              {/* Detailed Breakdown List */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                  Commission Allocation Breakdown
                </h4>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-slate-500">Sales Volume / Revenue</span>
                    <span className="font-bold text-slate-800 dark:text-white">{currencySymbol}{calculations.revenue.toLocaleString()}</span>
                  </div>

                  {calculations.detailsList.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between">
                      <span className="text-slate-500">{item.label}</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{currencySymbol}{Math.round(item.value).toLocaleString()}</span>
                    </div>
                  ))}

                  <div className="py-2.5 flex justify-between bg-slate-50 dark:bg-slate-850/50 px-2 rounded-lg font-bold">
                    <span className="text-slate-600 dark:text-slate-400">Total Gross Commission</span>
                    <span className="text-slate-900 dark:text-white">{currencySymbol}{Math.round(calculations.grossPayout).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* MONTHLY & ANNUAL FORECAST */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-850 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Monthly Projection</span>
                    <h4 className="text-2xl font-black text-slate-850 dark:text-white mt-1">{currencySymbol}{Math.round(calculations.grossPayout).toLocaleString()}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Based on current monthly sales volume</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 flex items-center justify-center">
                    <TrendingUp size={18} />
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-850 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Annual Income Forecast</span>
                    <h4 className="text-2xl font-black text-slate-850 dark:text-white mt-1">{currencySymbol}{Math.round(calculations.grossPayout * 12).toLocaleString()}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">Extrapolated 12-month projection</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/30 text-blue-600 flex items-center justify-center">
                    <Calendar size={18} />
                  </div>
                </div>
              </div>

              {/* DOWNLOAD REPORT OPTIONS */}
              <div className="p-5 border border-slate-150 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-350">Download Commission Reports</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Export splits and calculations as CSV, JSON, or TXT formats</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={exportAsCSV}
                    className="p-2 border border-slate-200 dark:border-slate-750 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-650 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Download size={14} /> CSV
                  </button>
                  <button
                    onClick={exportAsJSON}
                    className="p-2 border border-slate-200 dark:border-slate-750 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-650 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Download size={14} /> JSON
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="p-2 border border-slate-200 dark:border-slate-750 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-650 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Printer size={14} /> Print
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: VISUAL GRAPHS */}
          {activeOutputTab === "graphs" && calculations.isValid && (
            <div className="space-y-6">
              
              {/* AREA CHART: Projected Growth over 12 months */}
              <div className="p-5 border border-slate-100 dark:border-slate-850 rounded-2xl bg-white dark:bg-slate-900">
                <h4 className="text-sm font-bold text-slate-750 dark:text-slate-300 mb-4">
                  12-Month Earnings Forecast (Compounded Projections)
                </h4>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={growthChartData}>
                      <defs>
                        <linearGradient id="colorCum" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${currencySymbol}${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip formatter={(value: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, undefined]} />
                      <Legend />
                      <Area type="monotone" dataKey="Cumulative Payout" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorCum)" />
                      <Area type="monotone" dataKey="Monthly Commission" stroke="#3b82f6" strokeWidth={2} fill="none" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* PIE CHART: Net Payout vs Taxes vs Expenses */}
              <div className="p-5 border border-slate-100 dark:border-slate-850 rounded-2xl bg-white dark:bg-slate-900">
                <h4 className="text-sm font-bold text-slate-750 dark:text-slate-300 mb-4">
                  Earnings Net Take-Home vs Deductions split
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={45}
                          outerRadius={70}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {pieChartData.map((entry, idx) => (
                            <Cell key={`cell-${idx}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => `${currencySymbol}${Math.round(Number(value) || 0).toLocaleString()}`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-3">
                    {pieChartData.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 font-bold text-slate-600 dark:text-slate-400">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                          {item.name}
                        </span>
                        <span className="font-black text-slate-800 dark:text-white">
                          {currencySymbol}{Math.round(item.value).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: DETAILS TABLE */}
          {activeOutputTab === "table" && calculations.isValid && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-55 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase font-black tracking-widest sticky top-0">
                    <tr>
                      <th className="p-3">Financial Metric</th>
                      <th className="p-3 text-right">Commission Value</th>
                      <th className="p-3 text-right">Taxes & Split share %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-850/30">
                      <td className="p-3 font-bold text-slate-700 dark:text-slate-300">Sales Volume / Revenue Pool</td>
                      <td className="p-3 text-right font-black text-slate-850 dark:text-white">{currencySymbol}{calculations.revenue.toLocaleString()}</td>
                      <td className="p-3 text-right text-slate-500">-</td>
                    </tr>
                    {calculations.detailsList.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/30">
                        <td className="p-3 text-slate-600 dark:text-slate-400">{item.label}</td>
                        <td className="p-3 text-right text-slate-500">{currencySymbol}{Math.round(item.value).toLocaleString()}</td>
                        <td className="p-3 text-right text-slate-450">
                          {calculations.revenue > 0 ? `${((item.value / calculations.revenue) * 100).toFixed(1)}% of sales` : "-"}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-emerald-50/20 dark:bg-emerald-950/10 font-bold">
                      <td className="p-3 text-emerald-700 dark:text-emerald-400">Total Net Take-Home Earnings</td>
                      <td className="p-3 text-right text-emerald-700 dark:text-emerald-400">{currencySymbol}{Math.round(calculations.netEarnings).toLocaleString()}</td>
                      <td className="p-3 text-right text-emerald-700 dark:text-emerald-400">
                        {calculations.grossPayout > 0 ? `${((calculations.netEarnings / calculations.grossPayout) * 100).toFixed(1)}% of payout` : "-"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: SAVED plans */}
          {activeOutputTab === "history" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-slate-750 dark:text-slate-350">Saved Calculations</h4>
                  <p className="text-[10px] text-slate-400">Restore your previously saved commission parameters</p>
                </div>
                {history.length > 0 && (
                  <button
                    onClick={handleClearHistory}
                    className="text-xs text-red-500 hover:text-red-750 font-bold transition-all flex items-center gap-1"
                  >
                    <Trash size={14} /> Clear All
                  </button>
                )}
              </div>

              {history.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                  <History className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-450">No saved plans yet.</p>
                  <p className="text-[10px] text-slate-400 mt-1">Configure inputs and click "Save Plan" on the left panel.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleRestore(item)}
                      className="p-4 bg-slate-50 dark:bg-slate-850/50 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer transition-all flex justify-between items-start group"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] text-slate-400 font-bold block">{item.date}</span>
                        <h5 className="text-sm font-black text-slate-850 dark:text-white">
                          Payout: {item.currency}{Math.round(item.payout).toLocaleString()}
                        </h5>
                        <p className="text-[10px] text-slate-550">
                          {item.title} • Revenue: {item.currency}{Math.round(item.revenue).toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleDeleteHistory(item.id, e)}
                        className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                      >
                        <Trash size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
