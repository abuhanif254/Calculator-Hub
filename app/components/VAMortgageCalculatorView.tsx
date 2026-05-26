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

interface AmortizationRow {
  month: number;
  year: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  totalPayment: number;
  remainingBalance: number;
}

interface YearSummary {
  year: number;
  payments: number;
  principal: number;
  interest: number;
  extra: number;
  balance: number;
  months: AmortizationRow[];
}

interface HistoryItem {
  id: string;
  date: string;
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  serviceCategory: "first" | "subsequent";
  isExempt: boolean;
  rollFee: boolean;
  totalMonthly: number;
}

export function VAMortgageCalculatorView({ calcDef }: { calcDef: CalculatorDef }) {
  const t = useTranslations("VAMortgageCalculator");
  const { unitSystem } = useSettings();

  // Primary Inputs
  const [homePrice, setHomePrice] = useState("350000");
  const [downPayment, setDownPayment] = useState("0");
  const [downPaymentPercent, setDownPaymentPercent] = useState("0");
  const [interestRate, setInterestRate] = useState("6.25");
  const [loanTerm, setLoanTerm] = useState("30");

  // VA Funding Fee settings
  const [serviceCategory, setServiceCategory] = useState<"first" | "subsequent">("first");
  const [isExempt, setIsExempt] = useState(false);
  const [rollFee, setRollFee] = useState(true);

  // Property costs
  const [propertyTax, setPropertyTax] = useState("3300"); // Annual
  const [homeInsurance, setHomeInsurance] = useState("1200"); // Annual
  const [hoaFees, setHoaFees] = useState("0"); // Monthly
  const [closingCostsEst, setClosingCostsEst] = useState("7000"); // One-time

  // Extra Payments State
  const [extraMonthly, setExtraMonthly] = useState("0");
  const [extraAnnual, setExtraAnnual] = useState("0");
  const [oneTimeExtra, setOneTimeExtra] = useState("0");
  const [oneTimeMonth, setOneTimeMonth] = useState("12");

  // Affordability State
  const [monthlyIncome, setMonthlyIncome] = useState("7500");
  const [otherDebts, setOtherDebts] = useState("400");

  // History & Log State
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"payment" | "amortization" | "affordability" | "comparison" | "payoff">("payment");

  // Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("va-mortgage-calculator-history");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error("Error loading history", e);
      }
    }
  }, []);

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

  // Perform Calculations
  const calcs = useMemo(() => {
    const price = parseFloat(homePrice) || 0;
    const dp = parseFloat(downPayment) || 0;
    const rate = parseFloat(interestRate) || 0;
    const termYrs = parseFloat(loanTerm) || 30;
    
    const taxAnn = parseFloat(propertyTax) || 0;
    const insAnn = parseFloat(homeInsurance) || 0;
    const hoa = parseFloat(hoaFees) || 0;
    const closing = parseFloat(closingCostsEst) || 0;

    const baseLoan = Math.max(0, price - dp);
    const dpPct = price > 0 ? (dp / price) * 100 : 0;

    // VA Funding Fee percentage calculation (Effective Apr 2023)
    let ffPct = 0;
    if (!isExempt) {
      if (serviceCategory === "first") {
        if (dpPct < 5) ffPct = 2.15;
        else if (dpPct < 10) ffPct = 1.50;
        else ffPct = 1.25;
      } else {
        if (dpPct < 5) ffPct = 3.30;
        else if (dpPct < 10) ffPct = 1.50;
        else ffPct = 1.25;
      }
    }

    const fundingFeeAmt = baseLoan * (ffPct / 100);
    const totalLoanAmt = rollFee ? baseLoan + fundingFeeAmt : baseLoan;

    // Monthly P&I payment
    let monthlyPI = 0;
    const monthlyRate = (rate / 100) / 12;
    const totalMonths = termYrs * 12;

    if (totalLoanAmt > 0) {
      if (monthlyRate > 0) {
        monthlyPI = (totalLoanAmt * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
      } else {
        monthlyPI = totalLoanAmt / totalMonths;
      }
    }

    const monthlyTaxes = taxAnn / 12;
    const monthlyIns = insAnn / 12;
    const totalMonthly = monthlyPI + monthlyTaxes + monthlyIns + hoa;

    return {
      isValid: price > 0 && rate >= 0 && termYrs > 0,
      baseLoan,
      dpPct,
      fundingFeePct: ffPct,
      fundingFeeAmt,
      totalLoanAmt,
      monthlyPI,
      monthlyTaxes,
      monthlyIns,
      totalMonthly,
      termYrs,
      totalMonths,
      rate,
      closing,
      hoa
    };
  }, [homePrice, downPayment, interestRate, loanTerm, serviceCategory, isExempt, rollFee, propertyTax, homeInsurance, hoaFees, closingCostsEst]);

  // Early Payoff Simulation
  const payoffSim = useMemo(() => {
    if (!calcs.isValid) return null;

    const baseRate = calcs.rate;
    const totalFinanced = calcs.totalLoanAmt;
    const termMonths = calcs.totalMonths;
    const monthlyRate = (baseRate / 100) / 12;
    const monthlyPI = calcs.monthlyPI;

    const extMonthly = parseFloat(extraMonthly) || 0;
    const extAnnual = parseFloat(extraAnnual) || 0;
    const oneTimeExt = parseFloat(oneTimeExtra) || 0;
    const oneTimeM = parseInt(oneTimeMonth) || 12;

    // 1. Standard Schedule
    let balStd = totalFinanced;
    let totIntStd = 0;
    let monthsStd = 0;
    for (let m = 1; m <= termMonths; m++) {
      if (balStd <= 0) break;
      const interest = balStd * monthlyRate;
      let principal = monthlyPI - interest;
      if (principal > balStd) principal = balStd;
      balStd -= principal;
      totIntStd += interest;
      monthsStd = m;
    }

    // 2. Accelerated Schedule
    let balAcc = totalFinanced;
    let totIntAcc = 0;
    let monthsAcc = 0;
    let totalAccPaid = 0;
    let extraPaidAmt = 0;

    const amortRows: AmortizationRow[] = [];

    for (let m = 1; m <= termMonths * 2; m++) {
      if (balAcc <= 0) break;
      const interest = balAcc * monthlyRate;
      let regularPrincipal = monthlyPI - interest;
      if (regularPrincipal > balAcc) regularPrincipal = balAcc;

      // Add extra payments
      let currentExtra = extMonthly;
      if (m % 12 === 0) currentExtra += extAnnual;
      if (m === oneTimeM) currentExtra += oneTimeExt;

      if (currentExtra > (balAcc - regularPrincipal)) {
        currentExtra = balAcc - regularPrincipal;
      }
      currentExtra = Math.max(0, currentExtra);

      const totalPrincipalPaid = regularPrincipal + currentExtra;
      const remainingBalance = balAcc - totalPrincipalPaid;

      amortRows.push({
        month: m,
        year: Math.ceil(m / 12),
        payment: monthlyPI,
        principalPaid: regularPrincipal,
        interestPaid: interest,
        extraPaid: currentExtra,
        totalPayment: monthlyPI + currentExtra,
        remainingBalance: Math.max(0, remainingBalance)
      });

      balAcc -= totalPrincipalPaid;
      totIntAcc += interest;
      extraPaidAmt += currentExtra;
      totalAccPaid += (monthlyPI + currentExtra);
      monthsAcc = m;
    }

    const interestSaved = Math.max(0, totIntStd - totIntAcc);
    const monthsSaved = Math.max(0, monthsStd - monthsAcc);
    const yearsSaved = (monthsSaved / 12).toFixed(1);

    // Group rows by Year
    const yearSummaries: YearSummary[] = [];
    let currentYearRows: AmortizationRow[] = [];
    let yPrincipal = 0, yInterest = 0, yExtra = 0, yPayment = 0;

    amortRows.forEach((row, i) => {
      currentYearRows.push(row);
      yPrincipal += row.principalPaid;
      yInterest += row.interestPaid;
      yExtra += row.extraPaid;
      yPayment += row.totalPayment;

      if (row.month % 12 === 0 || i === amortRows.length - 1) {
        const yr = Math.ceil(row.month / 12);
        yearSummaries.push({
          year: yr,
          payments: yPayment,
          principal: yPrincipal,
          interest: yInterest,
          extra: yExtra,
          balance: row.remainingBalance,
          months: currentYearRows
        });
        currentYearRows = [];
        yPrincipal = 0;
        yInterest = 0;
        yExtra = 0;
        yPayment = 0;
      }
    });

    return {
      standardInt: totIntStd,
      acceleratedInt: totIntAcc,
      interestSaved,
      monthsStd,
      monthsAcc,
      monthsSaved,
      yearsSaved,
      yearSummaries,
      amortRows,
      extraPaidAmt
    };
  }, [calcs, extraMonthly, extraAnnual, oneTimeExtra, oneTimeMonth]);

  // Affordability Metrics
  const affordability = useMemo(() => {
    if (!calcs.isValid) return null;

    const monthlyGross = parseFloat(monthlyIncome) || 0;
    const monthlyOtherDebts = parseFloat(otherDebts) || 0;

    const totalHousing = calcs.totalMonthly;
    const totalDtiDebts = totalHousing + monthlyOtherDebts;

    const dtiFront = monthlyGross > 0 ? (totalHousing / monthlyGross) * 100 : 0;
    const dtiBack = monthlyGross > 0 ? (totalDtiDebts / monthlyGross) * 100 : 0;

    // Suggest recommended income
    // Housing expenses should be no more than 28% of gross, and total debt no more than 41%
    const incomeForHousing = totalHousing / 0.28;
    const incomeForTotalDebt = totalDtiDebts / 0.41;
    const recommendedGrossIncome = Math.max(incomeForHousing, incomeForTotalDebt);

    // Color flags
    let budgetStatus = "good"; // good, tight, high
    if (dtiBack > 41) budgetStatus = "high";
    else if (dtiBack > 36) budgetStatus = "tight";

    return {
      monthlyGross,
      monthlyOtherDebts,
      dtiFront,
      dtiBack,
      recommendedGrossIncome,
      budgetStatus
    };
  }, [calcs, monthlyIncome, otherDebts]);

  // Loan Comparison Module (VA vs Conventional vs FHA)
  const comparison = useMemo(() => {
    if (!calcs.isValid) return null;

    const price = parseFloat(homePrice) || 0;
    const rate = calcs.rate;
    const termYrs = calcs.termYrs;
    const monthlyRate = (rate / 100) / 12;
    const totalMonths = calcs.totalMonths;
    const baseTaxesIns = calcs.monthlyTaxes + calcs.monthlyIns + calcs.hoa;

    // Helper to calculate P&I
    const getPI = (loanAmt: number) => {
      if (loanAmt <= 0) return 0;
      if (monthlyRate > 0) {
        return (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
      }
      return loanAmt / totalMonths;
    };

    // 1. VA Loan (User settings)
    const vaLoanAmt = calcs.totalLoanAmt;
    const vaPI = calcs.monthlyPI;
    const vaUpfront = rollFee ? 0 : calcs.fundingFeeAmt; // if rolled in, upfront cash is 0
    const vaMonthlyTotal = calcs.totalMonthly;

    // 2. Conventional Loan (Standard min 5% down, 0.85% annual PMI if under 20% down)
    const convDpPct = calcs.dpPct >= 5 ? calcs.dpPct : 5;
    const convDpAmt = price * (convDpPct / 100);
    const convBaseLoan = price - convDpAmt;
    const convPI = getPI(convBaseLoan);
    
    // Monthly PMI
    const convPmiRate = convDpPct < 20 ? 0.0085 : 0; // 0.85% annual rate
    const convMonthlyPMI = (convBaseLoan * convPmiRate) / 12;
    const convMonthlyTotal = convPI + baseTaxesIns + convMonthlyPMI;

    // 3. FHA Loan (Standard min 3.5% down, 1.75% upfront MIP rolled in, 0.55% annual MIP)
    const fhaDpPct = calcs.dpPct >= 3.5 ? calcs.dpPct : 3.5;
    const fhaDpAmt = price * (fhaDpPct / 100);
    const fhaBaseLoan = price - fhaDpAmt;
    const fhaUpfrontMip = fhaBaseLoan * 0.0175;
    const fhaTotalLoan = fhaBaseLoan + fhaUpfrontMip;
    const fhaPI = getPI(fhaTotalLoan);
    const fhaMonthlyMIP = (fhaBaseLoan * 0.0055) / 12;
    const fhaMonthlyTotal = fhaPI + baseTaxesIns + fhaMonthlyMIP;

    return {
      va: {
        dp: parseFloat(downPayment) || 0,
        loan: vaLoanAmt,
        monthly: vaMonthlyTotal,
        pmi: 0,
        upfront: vaUpfront,
        desc: "No down payment required, no monthly mortgage insurance (PMI)."
      },
      conv: {
        dp: convDpAmt,
        loan: convBaseLoan,
        monthly: convMonthlyTotal,
        pmi: convMonthlyPMI,
        upfront: 0,
        desc: "Requires 5% down minimum. PMI applies until you reach 20% home equity."
      },
      fha: {
        dp: fhaDpAmt,
        loan: fhaTotalLoan,
        monthly: fhaMonthlyTotal,
        pmi: fhaMonthlyMIP,
        upfront: fhaUpfrontMip,
        desc: "Requires 3.5% down. Upfront MIP rolled in + lifetime annual MIP."
      }
    };
  }, [calcs, homePrice, downPayment, rollFee]);

  // Chart Data preparation
  const monthlyExpenseData = useMemo(() => {
    if (!calcs.isValid) return [];
    return [
      { name: "Principal & Interest", value: calcs.monthlyPI, color: "#2563eb" },
      { name: "Property Tax", value: calcs.monthlyTaxes, color: "#eab308" },
      { name: "Home Insurance", value: calcs.monthlyIns, color: "#10b981" },
      { name: "HOA Fees", value: calcs.hoa, color: "#64748b" }
    ].filter((item) => item.value > 0);
  }, [calcs]);

  // Balance Progression Chart Data
  const progressionData = useMemo(() => {
    if (!payoffSim) return [];
    
    // Pick every 12th month (Year-end) to keep chart clean
    const data = [{ year: 0, balance: calcs.totalLoanAmt }];
    payoffSim.yearSummaries.forEach((sum) => {
      data.push({
        year: sum.year,
        balance: Math.round(sum.balance)
      });
    });
    return data;
  }, [payoffSim, calcs]);

  // Save history log
  const handleSaveToHistory = () => {
    if (!calcs.isValid) return;

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
      downPayment: parseFloat(downPayment) || 0,
      interestRate: parseFloat(interestRate) || 0,
      loanTerm: parseInt(loanTerm) || 30,
      serviceCategory,
      isExempt,
      rollFee,
      totalMonthly: calcs.totalMonthly
    };

    const updated = [newItem, ...history].slice(0, 15);
    setHistory(updated);
    localStorage.setItem("va-mortgage-calculator-history", JSON.stringify(updated));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleRestore = (item: HistoryItem) => {
    setHomePrice(item.homePrice.toString());
    setDownPayment(item.downPayment.toString());
    setInterestRate(item.interestRate.toString());
    setLoanTerm(item.loanTerm.toString());
    setServiceCategory(item.serviceCategory);
    setIsExempt(item.isExempt);
    setRollFee(item.rollFee);

    // Sync Dp percentage
    if (item.homePrice > 0) {
      setDownPaymentPercent(((item.downPayment / item.homePrice) * 100).toFixed(2));
    }
  };

  const handleDeleteHistory = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("va-mortgage-calculator-history", JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem("va-mortgage-calculator-history");
  };

  // Copy helpers
  const triggerCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getPaymentSummaryText = () => {
    if (!calcs.isValid) return "";
    let text = `--- VA Mortgage Calculator Report ---\n`;
    text += `Home Price: $${(parseFloat(homePrice) || 0).toLocaleString()}\n`;
    text += `Down Payment: $${(parseFloat(downPayment) || 0).toLocaleString()} (${calcs.dpPct.toFixed(2)}%)\n`;
    text += `Interest Rate: ${calcs.rate}%\n`;
    text += `Loan Term: ${calcs.termYrs} Years\n`;
    text += `VA Funding Fee: ${calcs.fundingFeePct.toFixed(2)}% ($${calcs.fundingFeeAmt.toLocaleString(undefined, { maximumFractionDigits: 0 })})\n`;
    text += `Total Financed Amount: $${calcs.totalLoanAmt.toLocaleString(undefined, { maximumFractionDigits: 0 })}\n`;
    text += `------------------------------------\n`;
    text += `ESTIMATED MONTHLY COST: $${calcs.totalMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
    text += `  - Principal & Interest: $${calcs.monthlyPI.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
    text += `  - Taxes & Insurance: $${(calcs.monthlyTaxes + calcs.monthlyIns).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
    if (calcs.hoa > 0) {
      text += `  - HOA Fee: $${calcs.hoa.toLocaleString()}\n`;
    }
    text += `------------------------------------\n`;
    text += `Generated on NexusCalculator.net`;
    return text;
  };

  // Downloads / Exports
  const downloadReport = (content: string, type: string, ext: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `va-mortgage-report.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportAsTXT = () => {
    downloadReport(getPaymentSummaryText(), "text/plain", "txt");
  };

  const exportAsCSV = () => {
    if (!payoffSim) return;
    const headers = ["Month", "Year", "Regular Payment ($)", "Principal Paid ($)", "Interest Paid ($)", "Extra Paid ($)", "Total Payment ($)", "Remaining Balance ($)"];
    const rows = payoffSim.amortRows.map(r => [
      r.month,
      r.year,
      r.payment.toFixed(2),
      r.principalPaid.toFixed(2),
      r.interestPaid.toFixed(2),
      r.extraPaid.toFixed(2),
      r.totalPayment.toFixed(2),
      r.remainingBalance.toFixed(2)
    ]);
    const csvContent = [headers, ...rows].map(row => row.map(val => `"${val}"`).join(",")).join("\n");
    downloadReport(csvContent, "text/csv", "csv");
  };

  const exportAsJSON = () => {
    if (!calcs.isValid) return;
    const content = JSON.stringify({
      timestamp: new Date().toISOString(),
      inputs: {
        homePrice: parseFloat(homePrice) || 0,
        downPayment: parseFloat(downPayment) || 0,
        interestRate: parseFloat(interestRate) || 0,
        loanTerm: parseInt(loanTerm) || 30,
        serviceCategory,
        isExempt,
        rollFee,
        propertyTax: parseFloat(propertyTax) || 0,
        homeInsurance: parseFloat(homeInsurance) || 0,
        hoaFees: parseFloat(hoaFees) || 0,
        closingCostsEst: parseFloat(closingCostsEst) || 0
      },
      results: {
        baseLoan: calcs.baseLoan,
        fundingFeePct: calcs.fundingFeePct,
        fundingFeeAmt: calcs.fundingFeeAmt,
        totalFinancedAmt: calcs.totalLoanAmt,
        monthlyPI: calcs.monthlyPI,
        monthlyTaxes: calcs.monthlyTaxes,
        monthlyIns: calcs.monthlyIns,
        totalMonthly: calcs.totalMonthly,
        totalInterestPaidStd: payoffSim?.standardInt,
        totalInterestPaidAcc: payoffSim?.acceleratedInt,
        interestSaved: payoffSim?.interestSaved,
        monthsSaved: payoffSim?.monthsSaved
      }
    }, null, 2);
    downloadReport(content, "application/json", "json");
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden print:shadow-none print:border-none">
      
      {/* HEADER BANNER */}
      <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center shadow-inner">
            <Scale size={24} strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-850 dark:text-white leading-tight">
              {calcDef.title}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 print:hidden">
              Department of Veterans Affairs (VA) Home Loans Planner
            </p>
          </div>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-full md:w-auto overflow-x-auto print:hidden scrollbar-none">
          {[
            { id: "payment", label: "Monthly Payment" },
            { id: "comparison", label: "Loan Comparison" },
            { id: "payoff", label: "Early Payoff" },
            { id: "amortization", label: "Amortization" },
            { id: "affordability", label: "Affordability" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                activeTab === tab.id
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
          
          <div className="bg-slate-50 dark:bg-slate-800/20 p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-5">
            <h3 className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={16} /> Purchase Details
            </h3>

            {/* Home Price */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                {t("homePrice")}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">$</span>
                <input
                  type="number"
                  value={homePrice}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none"
                />
              </div>
            </div>

            {/* Down Payment */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase flex justify-between">
                <span>{t("downPayment")}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400">VA Supports 0% Down</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">$</span>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => handleDpAmtChange(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none"
                  />
                </div>
                <div className="relative w-24">
                  <input
                    type="number"
                    step="0.1"
                    value={downPaymentPercent}
                    onChange={(e) => handleDpPctChange(e.target.value)}
                    className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none"
                  />
                  <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                </div>
              </div>
            </div>

            {/* Interest Rate & Loan Term */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  {t("interestRate")}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="w-full pl-3 pr-7 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none"
                  />
                  <span className="absolute right-3 top-2.5 font-bold text-slate-400 dark:text-slate-500">%</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  {t("loanTerm")}
                </label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none appearance-none"
                >
                  <option value="30">30 Years</option>
                  <option value="20">20 Years</option>
                  <option value="15">15 Years</option>
                  <option value="10">10 Years</option>
                </select>
              </div>
            </div>
          </div>

          {/* VA FUNDING FEE CARD */}
          <div className="bg-slate-50 dark:bg-slate-800/20 p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Scale size={16} /> {t("fundingFeeSettings")}
            </h3>

            {/* Disability Exemption Toggle */}
            <div className="flex items-center justify-between p-3 bg-white dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div>
                <label htmlFor="disability-toggle" className="block text-xs font-extrabold text-slate-750 dark:text-slate-350 cursor-pointer">
                  {t("fundingFeeExempt")}
                </label>
                <span className="text-[10px] text-slate-400">Exempt for service-connected disabilities</span>
              </div>
              <input
                type="checkbox"
                id="disability-toggle"
                checked={isExempt}
                onChange={(e) => setIsExempt(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
              />
            </div>

            {!isExempt && (
              <>
                {/* Usage Category */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    {t("useCategory")}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setServiceCategory("first")}
                      className={`py-2 px-3 rounded-lg border font-bold text-xs transition-all ${
                        serviceCategory === "first"
                          ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900/40 dark:text-blue-400 shadow-sm"
                          : "border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400"
                      }`}
                    >
                      {t("firstTimeUse")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setServiceCategory("subsequent")}
                      className={`py-2 px-3 rounded-lg border font-bold text-xs transition-all ${
                        serviceCategory === "subsequent"
                          ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900/40 dark:text-blue-400 shadow-sm"
                          : "border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400"
                      }`}
                    >
                      {t("subsequentUse")}
                    </button>
                  </div>
                </div>

                {/* Rolled-in setting */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    {t("feePaymentMethod")}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRollFee(true)}
                      className={`py-2 px-3 rounded-lg border font-bold text-xs transition-all ${
                        rollFee
                          ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900/40 dark:text-blue-400 shadow-sm"
                          : "border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400"
                      }`}
                    >
                      {t("rollIntoLoan")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRollFee(false)}
                      className={`py-2 px-3 rounded-lg border font-bold text-xs transition-all ${
                        !rollFee
                          ? "bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/20 dark:border-blue-900/40 dark:text-blue-400 shadow-sm"
                          : "border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:text-slate-400"
                      }`}
                    >
                      {t("payInCash")}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* PROPERTY EXPENSES CARD */}
          <div className="bg-slate-50 dark:bg-slate-800/20 p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <TrendingUp size={16} /> Taxes & Fees
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  {t("propertyTax")} <span className="font-normal text-slate-400">(/yr)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(e.target.value)}
                    className="w-full pl-6 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  {t("homeInsurance")} <span className="font-normal text-slate-400">(/yr)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(e.target.value)}
                    className="w-full pl-6 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  {t("hoa")} <span className="font-normal text-slate-400">(/mo)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    value={hoaFees}
                    onChange={(e) => setHoaFees(e.target.value)}
                    className="w-full pl-6 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  {t("closingCosts")}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 font-bold text-slate-400">$</span>
                  <input
                    type="number"
                    value={closingCostsEst}
                    onChange={(e) => setClosingCostsEst(e.target.value)}
                    className="w-full pl-6 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Validation Alert */}
          {!calcs.isValid && (
            <div className="p-3 border border-rose-200 bg-rose-50 dark:bg-rose-950/20 text-rose-600 text-xs font-bold rounded-xl leading-tight">
              Please enter valid details for Price, Interest Rate, and Loan Term.
            </div>
          )}

          {/* Save Profile Button */}
          {calcs.isValid && (
            <button
              onClick={handleSaveToHistory}
              className={`w-full py-3 font-bold text-sm text-white rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                saveSuccess
                  ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20"
                  : "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20"
              }`}
            >
              {saveSuccess ? (
                <>
                  <CheckCircle size={16} /> Saved Successfully
                </>
              ) : (
                <>
                  <Plus size={16} /> Save Calculation Log
                </>
              )}
            </button>
          )}

          {/* HISTORY LOGS */}
          {history.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-800/10 p-5 rounded-2xl border border-slate-150 dark:border-slate-800/80 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                  <History size={16} /> Saved Loan Plans ({history.length})
                </h4>
                <button
                  onClick={handleClearHistory}
                  className="text-[10px] text-rose-600 hover:underline font-bold"
                >
                  Clear All
                </button>
              </div>

              <div className="max-h-56 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleRestore(item)}
                    className="p-3 bg-white dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800/80 rounded-xl cursor-pointer text-left transition-colors flex items-center justify-between gap-2"
                  >
                    <div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                        {item.date}
                      </div>
                      <div className="text-xs font-extrabold text-slate-700 dark:text-slate-350 mt-0.5">
                        Home Price: ${item.homePrice.toLocaleString()} • Term: {item.loanTerm}Y
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                        Rate: {item.interestRate}% • Payment: ${item.totalMonthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                      </div>
                    </div>
                    <button
                      onClick={(e) => handleDeleteHistory(item.id, e)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-450 rounded-lg"
                    >
                      <Trash size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RESULTS & DASHBOARD PANEL (RIGHT 7 COLUMNS) */}
        <div className="lg:col-span-7 space-y-6">
          
          {!calcs.isValid ? (
            <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center text-slate-400 bg-slate-50/50 dark:bg-slate-900/10">
              <Scale size={64} className="mb-4 stroke-[1.5]" />
              <p className="font-extrabold text-slate-600 dark:text-slate-400 mb-2">{t("waiting")}</p>
              <p className="text-xs text-slate-400 max-w-sm">
                Enter your property price, interest rate, and mortgage settings to see the full financial payment summary, comparison tables, and amortization schedules.
              </p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in zoom-in duration-300">
              
              {/* TAB 1: MONTHLY PAYMENT DETAILS */}
              {activeTab === "payment" && (
                <div className="space-y-6">
                  
                  {/* Primary Loan Balance Card */}
                  <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                    <div className="absolute -top-4 -right-4 p-8 opacity-10">
                      <Scale size={140} />
                    </div>
                    
                    <span className="text-[10px] font-black text-blue-200 uppercase tracking-widest">
                      {t("monthlyPayment")}
                    </span>
                    <div className="flex items-end gap-2 mt-1 mb-6">
                      <span className="text-3xl font-bold text-blue-300 pb-1">$</span>
                      <span className="text-5xl font-black tracking-tight truncate">
                        {calcs.totalMonthly.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4 text-xs">
                      <div>
                        <span className="block text-blue-200 font-bold uppercase text-[9px]">{t("baseLoanAmt")}</span>
                        <span className="text-lg font-bold">${calcs.baseLoan.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="block text-blue-200 font-bold uppercase text-[9px]">{t("fundingFeeAmt")} ({calcs.fundingFeePct.toFixed(2)}%)</span>
                        <span className="text-lg font-bold">${calcs.fundingFeeAmt.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                    </div>

                    {calcs.fundingFeePct > 0 && rollFee && (
                      <div className="mt-4 p-3 bg-white/10 rounded-xl text-[11px] leading-tight text-blue-105">
                        The VA Funding Fee of <strong>${calcs.fundingFeeAmt.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> has been financed into your loan balance, making the total financed loan amount <strong>${calcs.totalLoanAmt.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong>.
                      </div>
                    )}
                  </div>

                  {/* Alert banner about no PMI */}
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/35 rounded-2xl flex gap-3 text-xs leading-relaxed text-emerald-800 dark:text-emerald-450 font-medium">
                    <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <p>{t("noDownPaymentAlert")}</p>
                  </div>

                  {/* Visual Chart Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
                    
                    {/* Recharts Pie Chart */}
                    <div className="md:col-span-6 bg-slate-50/50 dark:bg-slate-800/10 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between items-center">
                      <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest self-start mb-4">
                        {t("paymentBreakdown")}
                      </h4>

                      <div className="w-full h-48 relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={monthlyExpenseData}
                              cx="50%"
                              cy="50%"
                              innerRadius={55}
                              outerRadius={75}
                              paddingAngle={3}
                              dataKey="value"
                            >
                              {monthlyExpenseData.map((entry, idx) => (
                                <Cell key={idx} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip
                              formatter={(value) => `$${Number(value).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                              contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-[10px] text-slate-400 uppercase font-black">Total</span>
                          <span className="text-xl font-black text-slate-800 dark:text-white">
                            ${Math.round(calcs.totalMonthly).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="w-full space-y-2 mt-4 text-xs">
                        {monthlyExpenseData.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center">
                            <div className="flex items-center gap-1.5 text-slate-500">
                              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                              <span>{item.name}</span>
                            </div>
                            <span className="font-bold text-slate-850 dark:text-slate-350">${Math.round(item.value).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Cost breakdown list */}
                    <div className="md:col-span-6 bg-slate-50/50 dark:bg-slate-800/10 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                      <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">
                        Financial Summary
                      </h4>

                      <div className="divide-y divide-slate-100 dark:divide-slate-800 space-y-3">
                        <div className="flex justify-between text-xs pb-2 pt-1">
                          <span className="text-slate-500">Loan Principal:</span>
                          <span className="font-extrabold text-slate-850 dark:text-slate-350">${calcs.totalLoanAmt.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between text-xs py-2">
                          <span className="text-slate-500">Interest Rate:</span>
                          <span className="font-extrabold text-slate-850 dark:text-slate-350">{calcs.rate}%</span>
                        </div>
                        <div className="flex justify-between text-xs py-2">
                          <span className="text-slate-500">Monthly P&I:</span>
                          <span className="font-extrabold text-slate-850 dark:text-slate-350">${calcs.monthlyPI.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between text-xs py-2">
                          <span className="text-slate-500">Monthly Taxes/Ins:</span>
                          <span className="font-extrabold text-slate-850 dark:text-slate-350">${(calcs.monthlyTaxes + calcs.monthlyIns).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        <div className="flex justify-between text-xs pt-2">
                          <span className="text-slate-500">Total Interest (30Y):</span>
                          <span className="font-extrabold text-slate-850 dark:text-slate-350">${payoffSim?.standardInt.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-blue-50/50 dark:bg-slate-800/40 rounded-xl text-[10px] leading-tight text-slate-500 border border-blue-100/50 dark:border-slate-800">
                        At closing, you will pay approximately <strong>${calcs.closing.toLocaleString()}</strong> in closing costs, plus <strong>${(parseFloat(downPayment) || 0).toLocaleString()}</strong> as a down payment.
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* TAB 2: COMPARISON MODE */}
              {activeTab === "comparison" && comparison && (
                <div className="space-y-6">
                  <div className="bg-slate-50/50 dark:bg-slate-800/10 border border-slate-200 dark:border-slate-800 rounded-3xl p-5">
                    <h3 className="text-sm font-black text-slate-750 dark:text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                      <Scale size={18} className="text-blue-500" /> {t("comparisonTitle")}
                    </h3>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
                        <thead className="bg-slate-100 dark:bg-slate-800 text-[10px] uppercase font-black text-slate-500">
                          <tr>
                            <th className="p-3">Financial Metric</th>
                            <th className="p-3 text-blue-600 dark:text-blue-400">{t("vaLoanLabel")}</th>
                            <th className="p-3">Conventional</th>
                            <th className="p-3">FHA Loan</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-150 dark:divide-slate-800 bg-white dark:bg-slate-900">
                          <tr>
                            <td className="p-3 font-semibold text-slate-500">Required Down Payment</td>
                            <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">${comparison.va.dp.toLocaleString()} (0%)</td>
                            <td className="p-3 font-bold">${comparison.conv.dp.toLocaleString()} (5%)</td>
                            <td className="p-3 font-bold">${comparison.fha.dp.toLocaleString()} (3.5%)</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-slate-500">Upfront Fee / Fee Rolled In</td>
                            <td className="p-3 font-bold">${calcs.fundingFeeAmt.toLocaleString(undefined, { maximumFractionDigits: 0 })} ({calcs.fundingFeePct}%)</td>
                            <td className="p-3 font-bold">$0 (0%)</td>
                            <td className="p-3 font-bold">${comparison.fha.upfront.toLocaleString(undefined, { maximumFractionDigits: 0 })} (1.75%)</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-slate-500">Financed Loan Amount</td>
                            <td className="p-3 font-bold text-blue-600">${comparison.va.loan.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                            <td className="p-3 font-bold">${comparison.conv.loan.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                            <td className="p-3 font-bold">${comparison.fha.loan.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-slate-500">Monthly Mortgage Insurance (PMI)</td>
                            <td className="p-3 font-bold text-emerald-600 dark:text-emerald-400">$0 / mo</td>
                            <td className="p-3 font-bold">${comparison.conv.pmi.toLocaleString(undefined, { maximumFractionDigits: 0 })} / mo</td>
                            <td className="p-3 font-bold">${comparison.fha.pmi.toLocaleString(undefined, { maximumFractionDigits: 0 })} / mo</td>
                          </tr>
                          <tr className="bg-slate-50/50 dark:bg-slate-850/20">
                            <td className="p-3 font-bold text-slate-700 dark:text-slate-300">Total Monthly Payment</td>
                            <td className="p-3 font-extrabold text-blue-600 text-sm">${comparison.va.monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</td>
                            <td className="p-3 font-bold text-sm">${comparison.conv.monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</td>
                            <td className="p-3 font-bold text-sm">${comparison.fha.monthly.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-4 space-y-2 text-[10px] leading-relaxed text-slate-450">
                      <p>• <strong>VA Benefits:</strong> Notice how the VA loan features **$0 monthly PMI** even with 0% down. This often saves veterans hundreds of dollars per month compared to conventional loans (PMI) and FHA loans (MIP).</p>
                      <p>• <strong>Upfront Fees:</strong> Conventional loans do not charge an upfront guarantee fee. VA loans require a funding fee (unless exempt) and FHA loans require upfront MIP, both of which can be financed.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: EARLY PAYOFF & EXTRA PAYMENTS */}
              {activeTab === "payoff" && payoffSim && (
                <div className="space-y-6">
                  
                  {/* Extra Payments Input Box */}
                  <div className="bg-slate-50/50 dark:bg-slate-800/10 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4">
                    <h3 className="text-sm font-black text-slate-750 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingDown size={18} className="text-blue-500" /> {t("extraPaymentsTitle")}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-650 dark:text-slate-400">
                          {t("extraMonthly")}
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 font-bold text-slate-400">$</span>
                          <input
                            type="number"
                            value={extraMonthly}
                            onChange={(e) => setExtraMonthly(e.target.value)}
                            className="w-full pl-6 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 rounded-lg text-xs font-bold outline-none text-right"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-650 dark:text-slate-400">
                          {t("extraAnnual")}
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2 font-bold text-slate-400">$</span>
                          <input
                            type="number"
                            value={extraAnnual}
                            onChange={(e) => setExtraAnnual(e.target.value)}
                            className="w-full pl-6 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 rounded-lg text-xs font-bold outline-none text-right"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-650 dark:text-slate-400">
                          {t("oneTimeExtra")}
                        </label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <span className="absolute left-2.5 top-2 font-bold text-slate-400">$</span>
                            <input
                              type="number"
                              value={oneTimeExtra}
                              onChange={(e) => setOneTimeExtra(e.target.value)}
                              className="w-full pl-5 pr-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 rounded-lg text-xs font-bold outline-none text-right"
                            />
                          </div>
                          <div className="w-14">
                            <input
                              type="number"
                              value={oneTimeMonth}
                              onChange={(e) => setOneTimeMonth(e.target.value)}
                              placeholder="Mo"
                              className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-250 dark:border-slate-700 rounded-lg text-xs font-bold outline-none text-center"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Impact Results Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Years Saved Card */}
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/35 rounded-2xl p-5 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                          {t("yearsSaved")}
                        </span>
                        <h4 className="text-3xl font-black text-slate-850 dark:text-white mt-1 leading-tight">
                          {payoffSim.yearsSaved} {t("years")}
                        </h4>
                      </div>
                      <p className="text-[10px] text-emerald-650 dark:text-emerald-400 mt-2">
                        Accelerates payoff term from <strong>{payoffSim.monthsStd}</strong> months down to <strong>{payoffSim.monthsAcc}</strong> months.
                      </p>
                    </div>

                    {/* Interest Saved Card */}
                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/35 rounded-2xl p-5 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest">
                          {t("interestSaved")}
                        </span>
                        <h4 className="text-3xl font-black text-slate-850 dark:text-white mt-1 leading-tight">
                          ${payoffSim.interestSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </h4>
                      </div>
                      <p className="text-[10px] text-blue-650 dark:text-blue-400 mt-2">
                        Decreases total interest payment from <strong>${Math.round(payoffSim.standardInt).toLocaleString()}</strong> to <strong>${Math.round(payoffSim.acceleratedInt).toLocaleString()}</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Early payoff explanation math */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs leading-relaxed text-slate-500">
                    <p className="font-bold text-slate-700 dark:text-slate-350 mb-1 flex items-center gap-1">
                      <Info size={14} className="text-blue-500" />
                      Early Payoff Strategy Tip
                    </p>
                    Adding an extra <strong>${(parseFloat(extraMonthly) || 0).toLocaleString()}</strong> monthly reduces the principal balance directly. This compound effect significantly shortens the duration because subsequent interest computations are calculated on a smaller outstanding balance.
                  </div>
                </div>
              )}

              {/* TAB 4: AMORTIZATION SCHEDULE */}
              {activeTab === "amortization" && payoffSim && (
                <div className="space-y-6">
                  
                  {/* Visual Balance Progression Chart */}
                  <div className="bg-white dark:bg-slate-850/20 border border-slate-200 dark:border-slate-800 rounded-3xl p-5">
                    <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
                      Balance Paydown Projection
                    </h4>
                    
                    <div className="w-full h-56">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={progressionData}>
                          <defs>
                            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                          <XAxis dataKey="year" stroke="#94a3b8" fontSize={9} />
                          <YAxis 
                            stroke="#94a3b8" 
                            fontSize={9} 
                            tickFormatter={(v) => `$${Math.round(v / 1000)}k`} 
                          />
                          <Tooltip 
                            formatter={(v) => `$${Number(v).toLocaleString()}`}
                            labelFormatter={(label) => `Year ${label}`}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                          />
                          <Area type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorBalance)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Amortization Table */}
                  <div className="bg-slate-50/50 dark:bg-slate-800/10 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <h4 className="text-xs font-bold text-slate-450 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                        <Table size={16} /> Amortization ledger
                      </h4>
                      <div className="flex gap-2">
                        <button
                          onClick={exportAsCSV}
                          className="h-8 px-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-350 rounded-lg hover:bg-slate-50 transition flex items-center gap-1"
                        >
                          <Download size={12} /> CSV
                        </button>
                        <button
                          onClick={() => window.print()}
                          className="h-8 px-2.5 bg-blue-600 text-white text-[10px] font-bold rounded-lg hover:bg-blue-700 transition flex items-center gap-1 shadow-sm"
                        >
                          <Printer size={12} /> Print
                        </button>
                      </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
                      {payoffSim.yearSummaries.map((yr) => (
                        <div key={yr.year} className="border border-slate-200 dark:border-slate-800/80 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-slate-900">
                          {/* Year summary header */}
                          <div className="bg-slate-50 dark:bg-slate-850 p-3 flex justify-between items-center text-xs font-bold text-slate-750 dark:text-slate-300">
                            <span>Year {yr.year} Summary</span>
                            <div className="space-x-4 font-mono text-[10px] text-slate-500">
                              <span>Pr: ${Math.round(yr.principal).toLocaleString()}</span>
                              <span>Int: ${Math.round(yr.interest).toLocaleString()}</span>
                              <span>Bal: ${Math.round(yr.balance).toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Year's month-by-month details */}
                          <div className="divide-y divide-slate-100 dark:divide-slate-800">
                            {yr.months.map((row) => (
                              <div key={row.month} className="p-2.5 flex justify-between items-center text-[10px] hover:bg-slate-50/50 dark:hover:bg-slate-850/40">
                                <span className="font-semibold text-slate-500">Month {row.month}</span>
                                <div className="space-x-3 text-slate-650 dark:text-slate-400 font-mono">
                                  <span>Paid: ${Math.round(row.totalPayment).toLocaleString()}</span>
                                  <span>Pr: ${Math.round(row.principalPaid).toLocaleString()}</span>
                                  <span>Int: ${Math.round(row.interestPaid).toLocaleString()}</span>
                                  {row.extraPaid > 0 && <span className="text-emerald-600">+Extra: ${Math.round(row.extraPaid).toLocaleString()}</span>}
                                  <span className="font-bold text-slate-800 dark:text-slate-305">Bal: ${Math.round(row.remainingBalance).toLocaleString()}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 5: AFFORDABILITY ANALYSIS */}
              {activeTab === "affordability" && affordability && (
                <div className="space-y-6">
                  
                  {/* Affordability Summary Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* Recommended Income Card */}
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-850/20 dark:to-blue-950/10 border border-indigo-150 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-widest">
                          {t("recommendedIncome")}
                        </span>
                        <h4 className="text-3xl font-black text-slate-850 dark:text-white mt-1 leading-tight tracking-tight">
                          ${Math.round(affordability.recommendedGrossIncome).toLocaleString()} <span className="text-xs font-normal text-slate-500">/ mo</span>
                        </h4>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-normal mt-3">
                        {t("budgetText")}
                      </p>
                    </div>

                    {/* DTI Ratios Card */}
                    <div className="bg-slate-50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-slate-450 dark:text-slate-550 uppercase tracking-widest">
                          {t("dtiRatio")}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          affordability.budgetStatus === "good" ? "bg-emerald-100 text-emerald-800" : ""
                        } ${
                          affordability.budgetStatus === "tight" ? "bg-amber-100 text-amber-800" : ""
                        } ${
                          affordability.budgetStatus === "high" ? "bg-rose-100 text-rose-800" : ""
                        }`}>
                          {affordability.budgetStatus.toUpperCase()}
                        </span>
                      </div>

                      <div className="space-y-3 mt-4">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-650 dark:text-slate-400 mb-1">
                            <span>Front-End DTI (Housing Only)</span>
                            <span>{affordability.dtiFront.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className="bg-indigo-500 h-full" style={{ width: `${Math.min(100, affordability.dtiFront)}%` }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold text-slate-650 dark:text-slate-400 mb-1">
                            <span>Back-End DTI (Total Debts)</span>
                            <span>{affordability.dtiBack.toFixed(1)}%</span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                            <div className={`h-full ${
                              affordability.dtiBack > 41 ? "bg-rose-500" : "bg-emerald-500"
                            }`} style={{ width: `${Math.min(100, affordability.dtiBack)}%` }}></div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Affordability form inputs */}
                  <div className="bg-white dark:bg-slate-850/20 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 space-y-4">
                    <h4 className="text-xs font-bold text-slate-450 dark:text-slate-550 uppercase tracking-widest">
                      Erschwinglichkeits-Faktoren anpassen
                    </h4>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-750 dark:text-slate-350">
                          Gross Monthly Income
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 font-bold text-slate-400">$</span>
                          <input
                            type="number"
                            value={monthlyIncome}
                            onChange={(e) => setMonthlyIncome(e.target.value)}
                            className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-slate-750 dark:text-slate-350">
                          {t("monthlyDebts")}
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-2.5 font-bold text-slate-400">$</span>
                          <input
                            type="number"
                            value={otherDebts}
                            onChange={(e) => setOtherDebts(e.target.value)}
                            className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ACTION TOOLBAR: COPY & EXPORTS */}
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-850 flex flex-wrap items-center justify-between gap-4 print:hidden">
                <span className="text-xs font-bold text-slate-500">Report teilen:</span>
                
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => triggerCopy(getPaymentSummaryText(), "copy-report")}
                    className="h-9 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-750 dark:text-slate-305 rounded-lg hover:bg-slate-50 transition flex items-center gap-1.5"
                  >
                    {copiedKey === "copy-report" ? (
                      <>
                        <CheckCircle size={14} className="text-emerald-500" />
                        <span>Kopiert!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={exportAsTXT}
                    className="h-9 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-750 dark:text-slate-305 rounded-lg hover:bg-slate-50 transition flex items-center gap-1.5"
                  >
                    <Download size={14} />
                    <span>TXT</span>
                  </button>

                  <button
                    onClick={exportAsCSV}
                    className="h-9 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-750 dark:text-slate-305 rounded-lg hover:bg-slate-50 transition flex items-center gap-1.5"
                  >
                    <Download size={14} />
                    <span>CSV</span>
                  </button>

                  <button
                    onClick={exportAsJSON}
                    className="h-9 px-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-750 dark:text-slate-305 rounded-lg hover:bg-slate-50 transition flex items-center gap-1.5"
                  >
                    <Download size={14} />
                    <span>JSON</span>
                  </button>

                  <button
                    onClick={() => window.print()}
                    className="h-9 px-3 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition flex items-center gap-1.5 shadow-sm"
                  >
                    <Printer size={14} />
                    <span>Drucken</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
