"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useSettings } from "@/app/context/SettingsContext";
import {
  DollarSign,
  Percent,
  Calendar,
  Info,
  CheckCircle,
  HelpCircle,
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
  Heart
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

interface SimulationYear {
  year: number;
  homeValue: number;
  mortgageBalance: number;
  homeEquity: number;
  buyerPortfolio: number;
  buyerNetWorth: number;
  renterPortfolio: number;
  renterNetWorth: number;
  netWorthDiff: number;
  cumulativeBuyingCost: number;
  cumulativeRentingCost: number;
  buyerOutflow: number;
  renterOutflow: number;
}

interface HistoryItem {
  id: string;
  date: string;
  homePrice: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTerm: number;
  monthlyRent: number;
  rentIncreaseRate: number;
  breakevenYear: number;
}

export function RentVsBuyCalculatorView({ calcDef }: { calcDef: CalculatorDef }) {
  const t = useTranslations("RentVsBuyCalculator");
  const { unitSystem } = useSettings();

  // Input states - Home Buying
  const [homePrice, setHomePrice] = useState("400000");
  const [downPaymentPercent, setDownPaymentPercent] = useState("10");
  const [downPayment, setDownPayment] = useState("40000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [loanTerm, setLoanTerm] = useState("30");
  const [propertyTaxRate, setPropertyTaxRate] = useState("1.2");
  const [homeInsurance, setHomeInsurance] = useState("1500");
  const [hoaFees, setHoaFees] = useState("150");
  const [maintenanceRate, setMaintenanceRate] = useState("1.0");
  const [closingCostsPct, setClosingCostsPct] = useState("2.5");
  const [appreciationRate, setAppreciationRate] = useState("4.0");
  const [sellingCostsPct, setSellingCostsPct] = useState("6.0");
  const [buyerUtilities, setBuyerUtilities] = useState("150");

  // Input states - Renting
  const [monthlyRent, setMonthlyRent] = useState("2200");
  const [rentIncreaseRate, setRentIncreaseRate] = useState("3.0");
  const [securityDeposit, setSecurityDeposit] = useState("3000");
  const [rentersInsurance, setRentersInsurance] = useState("250");
  const [renterUtilities, setRenterUtilities] = useState("100");

  // Input states - Investment & Economy
  const [investmentReturnRate, setInvestmentReturnRate] = useState("8.0");
  const [inflationRate, setInflationRate] = useState("2.5");

  // Scenarios/Adjustments
  const [extraMonthly, setExtraMonthly] = useState("0");

  // Tabs / Navigation
  const [activeInputTab, setActiveInputTab] = useState<"buying" | "renting" | "investment">("buying");
  const [activeOutputTab, setActiveOutputTab] = useState<"overview" | "graphs" | "table" | "history">("overview");
  
  // History State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync down payment amount and percent
  const handlePriceChange = (val: string) => {
    setHomePrice(val);
    const price = parseFloat(val) || 0;
    const pct = parseFloat(downPaymentPercent) || 0;
    setDownPayment(Math.round(price * (pct / 100)).toString());
  };

  const handleDpAmtChange = (val: string) => {
    setDownPayment(val);
    const price = parseFloat(homePrice) || 0;
    const amt = parseFloat(val) || 0;
    if (price > 0) {
      setDownPaymentPercent(((amt / price) * 100).toFixed(2));
    }
  };

  const handleDpPctChange = (val: string) => {
    setDownPaymentPercent(val);
    const price = parseFloat(homePrice) || 0;
    const pct = parseFloat(val) || 0;
    setDownPayment(Math.round(price * (pct / 100)).toString());
  };

  // Perform calculations
  const simResults = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const dpPct = parseFloat(downPaymentPercent) || 0;
    const dpAmt = price * (dpPct / 100);
    const rate = parseFloat(interestRate) || 0;
    const term = parseInt(loanTerm) || 30;

    const taxRate = parseFloat(propertyTaxRate) || 0;
    const insAnn = parseFloat(homeInsurance) || 0;
    const hoa = parseFloat(hoaFees) || 0;
    const maintRate = parseFloat(maintenanceRate) || 0;
    const closingPct = parseFloat(closingCostsPct) || 0;
    const closingAmt = price * (closingPct / 100);
    const appreciation = parseFloat(appreciationRate) || 0;
    const sellingPct = parseFloat(sellingCostsPct) || 0;
    const buyUtils = parseFloat(buyerUtilities) || 0;

    const rentBase = parseFloat(monthlyRent) || 0;
    const rentInc = parseFloat(rentIncreaseRate) || 0;
    const rentDeposit = parseFloat(securityDeposit) || 0;
    const rentIns = parseFloat(rentersInsurance) || 0;
    const rentUtils = parseFloat(renterUtilities) || 0;

    const stockReturn = parseFloat(investmentReturnRate) || 0;
    const inflation = parseFloat(inflationRate) || 0;
    const extraPay = parseFloat(extraMonthly) || 0;

    if (price <= 0 || rentBase <= 0) {
      return { isValid: false, simData: [], breakevenYear: -1 };
    }

    const simData: SimulationYear[] = [];

    const initialBuyOutflow = dpAmt + closingAmt;
    const initialRentOutflow = rentDeposit;

    let currentRenterPortfolio = Math.max(0, initialBuyOutflow - initialRentOutflow);
    let currentBuyerPortfolio = Math.max(0, initialRentOutflow - initialBuyOutflow);

    let currentHomeValue = price;
    let currentMortgageBalance = price - dpAmt;

    let cumBuyingCost = initialBuyOutflow;
    let cumRentingCost = initialRentOutflow;

    let currentIns = insAnn;
    let currentHoa = hoa * 12;
    let currentBuyUtils = buyUtils * 12;

    let currentRentIns = rentIns;
    let currentRentUtils = rentUtils * 12;
    let currentRent = rentBase * 12;

    const monthlyInterestRate = (rate / 100) / 12;
    const totalMonths = term * 12;

    let monthlyPI = 0;
    if (currentMortgageBalance > 0 && term > 0) {
      if (monthlyInterestRate > 0) {
        monthlyPI = (currentMortgageBalance * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalMonths)) / (Math.pow(1 + monthlyInterestRate, totalMonths) - 1);
      } else {
        monthlyPI = currentMortgageBalance / totalMonths;
      }
    }

    // Run 30-year simulation
    for (let t = 1; t <= 30; t++) {
      let annualPrincipalPaid = 0;
      let annualInterestPaid = 0;

      // Amortization for the 12 months of the year
      for (let m = 1; m <= 12; m++) {
        if (currentMortgageBalance > 0) {
          const interestPayment = currentMortgageBalance * monthlyInterestRate;
          let principalPayment = monthlyPI - interestPayment;

          let extra = extraPay;
          if (principalPayment + extra > currentMortgageBalance) {
            extra = currentMortgageBalance - principalPayment;
          }

          const totalPrincipal = Math.min(currentMortgageBalance, principalPayment + extra);
          currentMortgageBalance -= totalPrincipal;

          annualPrincipalPaid += totalPrincipal;
          annualInterestPaid += interestPayment;
        }
      }

      // Home value growth
      const homeAppreciationThisYear = currentHomeValue * (appreciation / 100);
      currentHomeValue += homeAppreciationThisYear;

      // Expenses for the year
      const propertyTaxThisYear = currentHomeValue * (taxRate / 100);
      const maintenanceThisYear = currentHomeValue * (maintRate / 100);

      const currentBuyingOutflow = (annualPrincipalPaid + annualInterestPaid) + propertyTaxThisYear + currentIns + currentHoa + maintenanceThisYear + currentBuyUtils;

      const rentThisYear = currentRent;
      const currentRentingOutflow = rentThisYear + currentRentIns + currentRentUtils;

      // Grow portfolios
      currentRenterPortfolio *= (1 + stockReturn / 105); // using 105 to compound monthly equivalence
      currentBuyerPortfolio *= (1 + stockReturn / 105);

      // Save savings in portfolio
      if (currentBuyingOutflow > currentRentingOutflow) {
        currentRenterPortfolio += (currentBuyingOutflow - currentRentingOutflow);
      } else {
        currentBuyerPortfolio += (currentRentingOutflow - currentBuyingOutflow);
      }

      cumBuyingCost += currentBuyingOutflow;
      cumRentingCost += currentRentingOutflow;

      // Sell transaction fee
      const sellingCostsAmt = currentHomeValue * (sellingPct / 100);

      const buyerHomeEquity = Math.max(0, currentHomeValue - currentMortgageBalance);
      const buyerNetWorth = buyerHomeEquity - sellingCostsAmt + currentBuyerPortfolio;
      const renterNetWorth = currentRenterPortfolio + rentDeposit;

      const netWorthDiff = buyerNetWorth - renterNetWorth;

      simData.push({
        year: t,
        homeValue: Math.round(currentHomeValue),
        mortgageBalance: Math.round(currentMortgageBalance),
        homeEquity: Math.round(buyerHomeEquity),
        buyerPortfolio: Math.round(currentBuyerPortfolio),
        buyerNetWorth: Math.round(buyerNetWorth),
        renterPortfolio: Math.round(currentRenterPortfolio),
        renterNetWorth: Math.round(renterNetWorth),
        netWorthDiff: Math.round(netWorthDiff),
        cumulativeBuyingCost: Math.round(cumBuyingCost),
        cumulativeRentingCost: Math.round(cumRentingCost),
        buyerOutflow: Math.round(currentBuyingOutflow),
        renterOutflow: Math.round(currentRentingOutflow)
      });

      // Inflate items for next year
      currentIns *= (1 + inflation / 100);
      currentHoa *= (1 + inflation / 100);
      currentBuyUtils *= (1 + inflation / 100);
      currentRentIns *= (1 + inflation / 100);
      currentRentUtils *= (1 + inflation / 100);
      currentRent *= (1 + rentInc / 100);
    }

    let breakevenYear = -1;
    for (let i = 0; i < simData.length; i++) {
      if (simData[i].buyerNetWorth > simData[i].renterNetWorth) {
        breakevenYear = simData[i].year;
        break;
      }
    }

    // Pie chart values for monthly costs (Year 1)
    const initialTaxesMonthly = (price * (taxRate / 100)) / 12;
    const initialInsuranceMonthly = insAnn / 12;
    const initialMaintenanceMonthly = (price * (maintRate / 100)) / 12;

    const firstYearMonthlyBuy = monthlyPI + initialTaxesMonthly + initialInsuranceMonthly + hoa + buyUtils;
    const firstYearMonthlyRent = rentBase + (rentIns / 12) + rentUtils;

    return {
      isValid: true,
      simData,
      breakevenYear,
      firstYearMonthlyBuy,
      firstYearMonthlyRent,
      monthlyPI,
      initialTaxesMonthly,
      initialInsuranceMonthly,
      initialMaintenanceMonthly,
      hoa,
      buyUtils,
      rentBase,
      rentInsMonthly: rentIns / 12,
      rentUtils
    };
  }, [
    homePrice, downPaymentPercent, interestRate, loanTerm, propertyTaxRate, homeInsurance,
    hoaFees, maintenanceRate, closingCostsPct, appreciationRate, sellingCostsPct, buyerUtilities,
    monthlyRent, rentIncreaseRate, securityDeposit, rentersInsurance, renterUtilities,
    investmentReturnRate, inflationRate, extraMonthly
  ]);

  // Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("rent-vs-buy-calculator-history");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading history", e);
      }
    }
  }, []);

  const handleSaveToHistory = () => {
    if (!simResults.isValid) return;

    const newItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      homePrice: parseFloat(homePrice) || 0,
      downPaymentPercent: parseFloat(downPaymentPercent) || 0,
      interestRate: parseFloat(interestRate) || 0,
      loanTerm: parseInt(loanTerm) || 30,
      monthlyRent: parseFloat(monthlyRent) || 0,
      rentIncreaseRate: parseFloat(rentIncreaseRate) || 0,
      breakevenYear: simResults.breakevenYear
    };

    const updated = [newItem, ...history].slice(0, 15);
    setHistory(updated);
    localStorage.setItem("rent-vs-buy-calculator-history", JSON.stringify(updated));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleRestore = (item: HistoryItem) => {
    setHomePrice(item.homePrice.toString());
    setDownPaymentPercent(item.downPaymentPercent.toString());
    setInterestRate(item.interestRate.toString());
    setLoanTerm(item.loanTerm.toString());
    setMonthlyRent(item.monthlyRent.toString());
    setRentIncreaseRate(item.rentIncreaseRate.toString());

    // Sync down payment amount
    const price = item.homePrice;
    setDownPayment(Math.round(price * (item.downPaymentPercent / 100)).toString());
  };

  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("rent-vs-buy-calculator-history", JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("rent-vs-buy-calculator-history");
  };

  // Copy results summary
  const triggerCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getReportText = () => {
    if (!simResults.isValid) return "";
    const lastYear = simResults.simData[simResults.simData.length - 1];
    let text = `--- Rent vs. Buy Cost Comparison Report ---\n`;
    text += `Home Price: $${(parseFloat(homePrice) || 0).toLocaleString()}\n`;
    text += `Down Payment: ${downPaymentPercent}% ($${(parseFloat(downPayment) || 0).toLocaleString()})\n`;
    text += `Interest Rate: ${interestRate}%\n`;
    text += `Monthly Rent: $${(parseFloat(monthlyRent) || 0).toLocaleString()}\n`;
    text += `Investment Return Rate: ${investmentReturnRate}%\n`;
    text += `------------------------------------\n`;
    text += `RESULTS (30-Year Projection):\n`;
    if (simResults.breakevenYear !== -1) {
      text += `Break-Even Year: Buying is financially beneficial after ${simResults.breakevenYear} years\n`;
    } else {
      text += `Break-Even Year: Renting is financially beneficial over the 30-year period\n`;
    }
    text += `Buyer Total Wealth: $${lastYear?.buyerNetWorth.toLocaleString()}\n`;
    text += `Renter Total Wealth: $${lastYear?.renterNetWorth.toLocaleString()}\n`;
    text += `Net Advantage: $${Math.abs(lastYear?.netWorthDiff).toLocaleString()} for ${lastYear?.netWorthDiff > 0 ? "Buyer" : "Renter"}\n`;
    text += `------------------------------------\n`;
    text += `Generated on NexusCalculator.net`;
    return text;
  };

  const downloadReport = (content: string, type: string, ext: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rent-vs-buy-report.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsCSV = () => {
    if (!simResults.isValid) return;
    const headers = ["Year", "Home Value ($)", "Mortgage Balance ($)", "Equity ($)", "Buyer Portfolio ($)", "Buyer Net Worth ($)", "Renter Portfolio ($)", "Renter Net Worth ($)", "Cumulative Renting Cost ($)", "Cumulative Buying Cost ($)"];
    const rows = simResults.simData.map(r => [
      r.year,
      r.homeValue,
      r.mortgageBalance,
      r.homeEquity,
      r.buyerPortfolio,
      r.buyerNetWorth,
      r.renterPortfolio,
      r.renterNetWorth,
      r.cumulativeRentingCost,
      r.cumulativeBuyingCost
    ]);
    const csvContent = [headers, ...rows].map(row => row.map(val => `"${val}"`).join(",")).join("\n");
    downloadReport(csvContent, "text/csv", "csv");
  };

  const exportAsJSON = () => {
    if (!simResults.isValid) return;
    const content = JSON.stringify({
      timestamp: new Date().toISOString(),
      inputs: {
        homePrice: parseFloat(homePrice),
        downPaymentPercent: parseFloat(downPaymentPercent),
        interestRate: parseFloat(interestRate),
        loanTerm: parseInt(loanTerm),
        monthlyRent: parseFloat(monthlyRent),
        rentIncreaseRate: parseFloat(rentIncreaseRate),
        investmentReturnRate: parseFloat(investmentReturnRate),
        inflationRate: parseFloat(inflationRate)
      },
      results: simResults.simData
    }, null, 2);
    downloadReport(content, "application/json", "json");
  };

  // Pie chart breakdown data for Year 1 monthly costs
  const buyingCostsPieData = useMemo(() => {
    if (!simResults.isValid) return [];
    return [
      { name: "P&I Payment", value: simResults.monthlyPI ?? 0, color: "#3b82f6" },
      { name: "Property Taxes", value: simResults.initialTaxesMonthly ?? 0, color: "#eab308" },
      { name: "Insurance", value: simResults.initialInsuranceMonthly ?? 0, color: "#10b981" },
      { name: "Maintenance", value: simResults.initialMaintenanceMonthly ?? 0, color: "#f59e0b" },
      { name: "HOA Fees", value: simResults.hoa ?? 0, color: "#8b5cf6" },
      { name: "Utilities", value: simResults.buyUtils ?? 0, color: "#64748b" }
    ].filter(c => (c.value ?? 0) > 0);
  }, [simResults]);

  const rentingCostsPieData = useMemo(() => {
    if (!simResults.isValid) return [];
    return [
      { name: "Monthly Rent", value: simResults.rentBase ?? 0, color: "#ec4899" },
      { name: "Renters Insurance", value: simResults.rentInsMonthly ?? 0, color: "#14b8a6" },
      { name: "Utilities", value: simResults.rentUtils ?? 0, color: "#64748b" }
    ].filter(c => (c.value ?? 0) > 0);
  }, [simResults]);

  // Area chart data for Net Worth comparison
  const areaChartData = useMemo(() => {
    if (!simResults.isValid) return [];
    return simResults.simData.map(r => ({
      year: `Yr ${r.year}`,
      Buyer: r.buyerNetWorth,
      Renter: r.renterNetWorth
    }));
  }, [simResults]);

  // Bar chart data for Cumulative costs comparison
  const barChartData = useMemo(() => {
    if (!simResults.isValid) return [];
    // Pick Years 1, 5, 10, 15, 20, 25, 30 for cleaner display
    const targetYears = [1, 5, 10, 15, 20, 25, 30];
    return simResults.simData
      .filter(r => targetYears.includes(r.year))
      .map(r => ({
        year: `Yr ${r.year}`,
        "Buying Costs": r.cumulativeBuyingCost,
        "Renting Costs": r.cumulativeRentingCost
      }));
  }, [simResults]);

  const lastYearSim = simResults.simData[simResults.simData.length - 1];

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
              {t("title")}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 print:hidden">
              Compare long-term wealth building: buying a home vs renting & investing opportunity costs
            </p>
          </div>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full md:w-auto overflow-x-auto print:hidden scrollbar-none">
          {[
            { id: "overview", label: "Overview" },
            { id: "graphs", label: "Charts & Visualizations" },
            { id: "table", label: "30-Year Table" },
            { id: "history", label: "Saved Profiles" }
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
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveInputTab("buying")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeInputTab === "buying"
                  ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Buying Inputs
            </button>
            <button
              onClick={() => setActiveInputTab("renting")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeInputTab === "renting"
                  ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Renting Inputs
            </button>
            <button
              onClick={() => setActiveInputTab("investment")}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                activeInputTab === "investment"
                  ? "bg-white dark:bg-slate-700 text-slate-800 dark:text-white shadow-sm"
                  : "text-slate-500 dark:text-slate-400"
              }`}
            >
              Investment/Eco
            </button>
          </div>

          {/* TAB 1: BUYING INPUTS */}
          {activeInputTab === "buying" && (
            <div className="bg-slate-50 dark:bg-slate-850/30 p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-4">
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Home size={16} /> Home Purchase & Buying Costs
              </h3>

              {/* Home Price */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-750 dark:text-slate-350 uppercase">
                  {t("homePrice")}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">$</span>
                  <input
                    type="number"
                    value={homePrice}
                    onChange={(e) => handlePriceChange(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                  />
                </div>
              </div>

              {/* Down Payment */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-750 dark:text-slate-350 uppercase">
                  {t("downPayment")}
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">$</span>
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => handleDpAmtChange(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                  </div>
                  <div className="relative w-24">
                    <input
                      type="number"
                      value={downPaymentPercent}
                      onChange={(e) => handleDpPctChange(e.target.value)}
                      className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                    <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                  </div>
                </div>
              </div>

              {/* Interest Rate & Term */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-750 dark:text-slate-350 uppercase">
                    {t("interestRate")}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                    <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-750 dark:text-slate-350 uppercase">
                    {t("loanTerm")}
                  </label>
                  <select
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none appearance-none"
                  >
                    <option value="30">30 Years</option>
                    <option value="20">20 Years</option>
                    <option value="15">15 Years</option>
                    <option value="10">10 Years</option>
                  </select>
                </div>
              </div>

              {/* Recurring Ownership Costs */}
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200/50 dark:border-slate-800/50">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    Property Tax Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.05"
                      value={propertyTaxRate}
                      onChange={(e) => setPropertyTaxRate(e.target.value)}
                      className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                    <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    Home Insurance (Annual)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">$</span>
                    <input
                      type="number"
                      value={homeInsurance}
                      onChange={(e) => setHomeInsurance(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* HOA & Maintenance */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    HOA Fees (Monthly)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">$</span>
                    <input
                      type="number"
                      value={hoaFees}
                      onChange={(e) => setHoaFees(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    Maintenance Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={maintenanceRate}
                      onChange={(e) => setMaintenanceRate(e.target.value)}
                      className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                    <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                  </div>
                </div>
              </div>

              {/* Closing / Selling Fees */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    Closing Costs
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={closingCostsPct}
                      onChange={(e) => setClosingCostsPct(e.target.value)}
                      className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                    <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    Selling Costs
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.5"
                      value={sellingCostsPct}
                      onChange={(e) => setSellingCostsPct(e.target.value)}
                      className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                    <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                  </div>
                </div>
              </div>

              {/* Utilities */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-750 dark:text-slate-350 uppercase">
                  Homeowner Utilities (Monthly)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">$</span>
                  <input
                    type="number"
                    value={buyerUtilities}
                    onChange={(e) => setBuyerUtilities(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: RENTING INPUTS */}
          {activeInputTab === "renting" && (
            <div className="bg-slate-50 dark:bg-slate-850/30 p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-4">
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <Shield size={16} /> Renting Costs & Deposit
              </h3>

              {/* Monthly Rent */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-750 dark:text-slate-350 uppercase">
                  {t("monthlyRent")}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">$</span>
                  <input
                    type="number"
                    value={monthlyRent}
                    onChange={(e) => setMonthlyRent(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                  />
                </div>
              </div>

              {/* Rent Increase */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-750 dark:text-slate-350 uppercase">
                  {t("rentIncrease")}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={rentIncreaseRate}
                    onChange={(e) => setRentIncreaseRate(e.target.value)}
                    className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                  />
                  <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                </div>
              </div>

              {/* Security Deposit */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-750 dark:text-slate-350 uppercase">
                  {t("deposit")}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">$</span>
                  <input
                    type="number"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                  />
                </div>
              </div>

              {/* Renters Insurance & Utilities */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    Renters Insurance (Annual)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">$</span>
                    <input
                      type="number"
                      value={rentersInsurance}
                      onChange={(e) => setRentersInsurance(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    Renter Utilities (Monthly)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">$</span>
                    <input
                      type="number"
                      value={renterUtilities}
                      onChange={(e) => setRenterUtilities(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INVESTMENT & ECONOMY */}
          {activeInputTab === "investment" && (
            <div className="bg-slate-50 dark:bg-slate-850/30 p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-4">
              <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
                <TrendingUp size={16} /> Market Returns & Inflation
              </h3>

              {/* Home Appreciation */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-750 dark:text-slate-350 uppercase">
                  {t("appreciationRate")}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={appreciationRate}
                    onChange={(e) => setAppreciationRate(e.target.value)}
                    className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                  />
                  <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                </div>
              </div>

              {/* Investment Return */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-750 dark:text-slate-350 uppercase">
                  {t("returnRate")}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={investmentReturnRate}
                    onChange={(e) => setInvestmentReturnRate(e.target.value)}
                    className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                  />
                  <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                </div>
              </div>

              {/* Inflation Rate */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-750 dark:text-slate-350 uppercase">
                  {t("inflationRate")}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(e.target.value)}
                    className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                  />
                  <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                </div>
              </div>
            </div>
          )}

          {/* ACCELERATED PAYOFF SLIDER */}
          <div className="bg-slate-50 dark:bg-slate-800/20 p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest flex items-center justify-between">
              <span className="flex items-center gap-2"><Plus size={16} /> Extra Payments</span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">${extraMonthly}/mo</span>
            </h3>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={extraMonthly}
              onChange={(e) => setExtraMonthly(e.target.value)}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <p className="text-[10px] text-slate-450 leading-relaxed">
              Making extra payments increases your monthly cash outlay but saves mortgage interest and accelerates home equity growth.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSaveToHistory}
              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              {saveSuccess ? (
                <>
                  <CheckCircle size={16} /> Profile Saved!
                </>
              ) : (
                <>
                  <History size={16} /> Save Profile
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

          {/* MAIN BREAK-EVEN CARD */}
          {simResults.isValid && (
            <div className={`p-6 rounded-2xl border ${
              simResults.breakevenYear !== -1
                ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40"
                : "bg-pink-50/50 dark:bg-pink-950/10 border-pink-100 dark:border-pink-900/30"
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  simResults.breakevenYear !== -1
                    ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400"
                    : "bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400"
                }`}>
                  {simResults.breakevenYear !== -1 ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-850 dark:text-white">
                    {simResults.breakevenYear !== -1
                      ? t("buyIsBetter", { years: simResults.breakevenYear })
                      : "Renting is financially beneficial over the full 30-year term"}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    {simResults.breakevenYear !== -1
                      ? `Based on your assumptions, the high upfront transaction costs (closing fees, down payment) and initial cash flow deficits are overcome by home equity and property appreciation starting in year ${simResults.breakevenYear}.`
                      : "Due to high interest rates, property maintenance, taxes, and the opportunity cost of investing the down payment in stocks, renting remains the wealthier path over a 30-year timeline."}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* OUTFLOW COMPARISON OVERVIEW */}
          {activeOutputTab === "overview" && simResults.isValid && (
            <div className="space-y-6">
              
              {/* Wealth Projection cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Buyer Wealth (Yr 30)</span>
                    <h4 className="text-2xl font-black text-slate-800 dark:text-white mt-1">${lastYearSim?.buyerNetWorth.toLocaleString()}</h4>
                    <span className="text-xs text-slate-450 dark:text-slate-500 flex items-center gap-1 mt-1">
                      Home Equity: ${(lastYearSim?.homeEquity).toLocaleString()}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Home size={18} />
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">Renter Wealth (Yr 30)</span>
                    <h4 className="text-2xl font-black text-slate-800 dark:text-white mt-1">${lastYearSim?.renterNetWorth.toLocaleString()}</h4>
                    <span className="text-xs text-slate-450 dark:text-slate-500 flex items-center gap-1 mt-1">
                      Stock Portfolio: ${(lastYearSim?.renterPortfolio).toLocaleString()}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-pink-50 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 flex items-center justify-center">
                    <TrendingUp size={18} />
                  </div>
                </div>
              </div>

              {/* Net Difference Statement */}
              {lastYearSim && (
                <div className="p-4 bg-slate-50 dark:bg-slate-800/20 rounded-xl border border-slate-200 dark:border-slate-850 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-600 dark:text-slate-400">Net Wealth Difference (Year 30):</span>
                  <span className={`font-black ${lastYearSim.netWorthDiff > 0 ? "text-emerald-600" : "text-pink-600"}`}>
                    ${Math.abs(lastYearSim.netWorthDiff).toLocaleString()} in favor of {lastYearSim.netWorthDiff > 0 ? "Buying" : "Renting"}
                  </span>
                </div>
              )}

              {/* Cost comparison distribution pies */}
              <div className="p-5 border border-slate-100 dark:border-slate-850 rounded-2xl bg-white dark:bg-slate-900">
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-350 mb-4 flex items-center gap-2">
                  <PieChartIcon size={16} /> Initial Monthly Cost Comparison (Year 1)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Buying distribution */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Buying Outflow</span>
                      <span className="text-xs font-black text-slate-800 dark:text-white">${Math.round(simResults.firstYearMonthlyBuy || 0).toLocaleString()}/mo</span>
                    </div>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={buyingCostsPieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={65}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {buyingCostsPieData.map((entry, idx) => (
                              <Cell key={`cell-${idx}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any) => `$${Math.round(Number(value) || 0)}`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {buyingCostsPieData.map((item, idx) => (
                        <span key={idx} className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: item.color }}></span>
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Renting distribution */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Renting Outflow</span>
                      <span className="text-xs font-black text-slate-800 dark:text-white">${Math.round(simResults.firstYearMonthlyRent || 0).toLocaleString()}/mo</span>
                    </div>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={rentingCostsPieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={65}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {rentingCostsPieData.map((entry, idx) => (
                              <Cell key={`cell-${idx}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value: any) => `$${Math.round(Number(value) || 0)}`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {rentingCostsPieData.map((item, idx) => (
                        <span key={idx} className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: item.color }}></span>
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* REPORT EXPORTS */}
              <div className="p-5 border border-slate-100 dark:border-slate-850 rounded-2xl bg-white dark:bg-slate-900 flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-slate-700 dark:text-slate-350">Download Cost Reports</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Export full simulation projections as CSV, JSON, or TXT formats</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={exportAsCSV}
                    className="p-2 border border-slate-200 dark:border-slate-750 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Download size={14} /> CSV
                  </button>
                  <button
                    onClick={exportAsJSON}
                    className="p-2 border border-slate-200 dark:border-slate-750 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Download size={14} /> JSON
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="p-2 border border-slate-200 dark:border-slate-750 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Printer size={14} /> Print
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* GRAPHS AND CHARTS */}
          {activeOutputTab === "graphs" && simResults.isValid && (
            <div className="space-y-6">
              
              {/* AREA CHART: Net Worth growth */}
              <div className="p-5 border border-slate-100 dark:border-slate-850 rounded-2xl bg-white dark:bg-slate-900">
                <h4 className="text-sm font-bold text-slate-750 dark:text-slate-300 mb-4">
                  Net Worth Growth Timeline (Rent vs Buy)
                </h4>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={areaChartData}>
                      <defs>
                        <linearGradient id="colorBuyer" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorRenter" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip formatter={(value: any) => [`$${Math.round(Number(value) || 0).toLocaleString()}`, undefined] as any} />
                      <Legend />
                      <Area type="monotone" dataKey="Buyer" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorBuyer)" />
                      <Area type="monotone" dataKey="Renter" stroke="#ec4899" strokeWidth={2} fillOpacity={1} fill="url(#colorRenter)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* BAR CHART: Cumulative costs */}
              <div className="p-5 border border-slate-100 dark:border-slate-850 rounded-2xl bg-white dark:bg-slate-900">
                <h4 className="text-sm font-bold text-slate-750 dark:text-slate-300 mb-4">
                  Cumulative Paid Outflows Comparison
                </h4>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barChartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={11}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip formatter={(value: any) => [`$${Math.round(Number(value) || 0).toLocaleString()}`, undefined] as any} />
                      <Legend />
                      <Bar dataKey="Buying Costs" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="Renting Costs" fill="#ec4899" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          )}

          {/* DATA TABLE */}
          {activeOutputTab === "table" && simResults.isValid && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-55 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase font-black tracking-widest sticky top-0">
                    <tr>
                      <th className="p-3">Year</th>
                      <th className="p-3 text-right">Home Value</th>
                      <th className="p-3 text-right">Mortgage Bal.</th>
                      <th className="p-3 text-right">Home Equity</th>
                      <th className="p-3 text-right">Renter Port.</th>
                      <th className="p-3 text-right">Buyer NW</th>
                      <th className="p-3 text-right">Renter NW</th>
                      <th className="p-3 text-right">NW Diff</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {simResults.simData.map((row) => (
                      <tr key={row.year} className="hover:bg-slate-50/50 dark:hover:bg-slate-850/30">
                        <td className="p-3 font-bold text-slate-700 dark:text-slate-300">Year {row.year}</td>
                        <td className="p-3 text-right text-slate-500">${row.homeValue.toLocaleString()}</td>
                        <td className="p-3 text-right text-slate-500">${row.mortgageBalance.toLocaleString()}</td>
                        <td className="p-3 text-right text-slate-500">${row.homeEquity.toLocaleString()}</td>
                        <td className="p-3 text-right text-slate-500">${row.renterPortfolio.toLocaleString()}</td>
                        <td className="p-3 text-right font-semibold text-slate-800 dark:text-white">${row.buyerNetWorth.toLocaleString()}</td>
                        <td className="p-3 text-right font-semibold text-slate-800 dark:text-white">${row.renterNetWorth.toLocaleString()}</td>
                        <td className={`p-3 text-right font-bold ${row.netWorthDiff > 0 ? "text-emerald-600" : "text-pink-600"}`}>
                          ${row.netWorthDiff > 0 ? "+" : ""}{row.netWorthDiff.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* HISTORY LOG / SAVED PROFILES */}
          {activeOutputTab === "history" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-slate-750 dark:text-slate-350">Saved Configurations</h4>
                  <p className="text-[10px] text-slate-400">Restore your previously saved housing price and rent assumptions</p>
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
                  <p className="text-xs text-slate-450">No profiles saved yet.</p>
                  <p className="text-[10px] text-slate-400 mt-1">Configure inputs and click "Save Profile" on the left panel.</p>
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
                          Price: ${item.homePrice.toLocaleString()}
                        </h5>
                        <p className="text-[10px] text-slate-500">
                          Rent: ${item.monthlyRent.toLocaleString()}/mo • Int: {item.interestRate}%
                        </p>
                        <span className={`inline-block text-[9px] px-2 py-0.5 font-bold rounded-full mt-1.5 ${
                          item.breakevenYear !== -1
                            ? "bg-emerald-100 text-emerald-705 dark:bg-emerald-950/40"
                            : "bg-pink-100 text-pink-705 dark:bg-pink-950/30"
                        }`}>
                          {item.breakevenYear !== -1 ? `Buy Wins Year ${item.breakevenYear}` : "Rent Wins"}
                        </span>
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
