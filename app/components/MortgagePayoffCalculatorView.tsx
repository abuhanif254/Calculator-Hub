"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { useSettings } from "@/app/context/SettingsContext";
import {
  Home,
  TrendingDown,
  Calendar,
  DollarSign,
  Percent,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  Printer,
  FileText,
  FileJson,
  Download,
  Trash2,
  RotateCcw,
  Search,
  PiggyBank,
  Shield,
  Clock,
  Plus,
  Minus,
  RefreshCw,
  Star,
  ArrowRight,
  AlertTriangle,
  Info,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

/* ------------------------------------------------------------------ */
/*  Interfaces                                                         */
/* ------------------------------------------------------------------ */

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
  balance: number;
  rate: number;
  term: number;
  extraMonthly: number;
  monthsSaved: number;
  interestSaved: number;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HISTORY_KEY = "mortgage-payoff-calculator-history";
const MAX_HISTORY = 15;
const CHART_COLORS = ["#10b981", "#ef4444", "#3b82f6", "#f59e0b"];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function MortgagePayoffCalculatorView({
  calcDef,
}: {
  calcDef: CalculatorDef;
}) {
  const t = useTranslations("MortgagePayoffCalculator");
  const { currency, locale } = useSettings();

  /* ---- State ---- */
  const [remainingBalance, setRemainingBalance] = useState("280000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [remainingYears, setRemainingYears] = useState("25");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [extraMonthly, setExtraMonthly] = useState("0");
  const [extraAnnual, setExtraAnnual] = useState("0");
  const [oneTimeLump, setOneTimeLump] = useState("0");
  const [lumpSumMonth, setLumpSumMonth] = useState("12");
  const [paymentFrequency, setPaymentFrequency] = useState<
    "monthly" | "biweekly"
  >("monthly");
  const [propertyTax, setPropertyTax] = useState("3600");
  const [homeInsurance, setHomeInsurance] = useState("1400");
  const [pmiRate, setPmiRate] = useState("0");
  const [refiRate, setRefiRate] = useState("5.5");
  const [refiTerm, setRefiTerm] = useState("20");
  const [refiClosingCosts, setRefiClosingCosts] = useState("4000");
  const [activeTab, setActiveTab] = useState<
    "payoff" | "amortization" | "refinance" | "history"
  >("payoff");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set());
  const [searchYear, setSearchYear] = useState("");
  const [showEscrow, setShowEscrow] = useState(false);

  /* ---- Currency helpers ---- */
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(val);

  const getCurrencySymbol = () => {
    try {
      const parts = new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
      }).formatToParts(0);
      return parts.find((p) => p.type === "currency")?.value || "$";
    } catch {
      return "$";
    }
  };
  const cSym = getCurrencySymbol();

  /* ---- Load history on mount ---- */
  useEffect(() => {
    try {
      const stored = localStorage.getItem(HISTORY_KEY);
      if (stored) setHistory(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  /* ---- Persist history ---- */
  const persistHistory = (items: HistoryItem[]) => {
    setHistory(items);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  };

  /* ================================================================ */
  /*  CORE CALCULATIONS                                                */
  /* ================================================================ */

  const pf = (v: string) => parseFloat(v) || 0;

  /* 1. Standard monthly P&I payment */
  const computedMonthlyPI = useMemo(() => {
    const P = pf(remainingBalance);
    const r = pf(interestRate) / 100 / 12;
    const n = pf(remainingYears) * 12;
    if (P <= 0 || r <= 0 || n <= 0) return 0;
    return (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
  }, [remainingBalance, interestRate, remainingYears]);

  const effectivePayment = pf(monthlyPayment) > 0 ? pf(monthlyPayment) : computedMonthlyPI;

  /* 2. Standard amortisation schedule (no extras) */
  const standardSchedule = useMemo(() => {
    const P = pf(remainingBalance);
    const r = pf(interestRate) / 100 / 12;
    const n = pf(remainingYears) * 12;
    if (P <= 0 || r <= 0 || n <= 0) return { rows: [] as AmortizationRow[], totalInterest: 0, totalMonths: 0 };

    const payment = effectivePayment;
    let balance = P;
    let totalInterest = 0;
    const rows: AmortizationRow[] = [];
    let month = 0;

    while (balance > 0.01 && month < 600) {
      month++;
      const interestPaid = balance * r;
      let principalPaid = payment - interestPaid;
      if (principalPaid > balance) principalPaid = balance;
      balance -= principalPaid;
      if (balance < 0) balance = 0;
      totalInterest += interestPaid;
      rows.push({
        month,
        year: Math.ceil(month / 12),
        payment,
        principalPaid,
        interestPaid,
        extraPaid: 0,
        totalPayment: payment,
        remainingBalance: balance,
      });
    }

    return { rows, totalInterest, totalMonths: month };
  }, [remainingBalance, interestRate, remainingYears, effectivePayment]);

  /* 3. Accelerated schedule (with extras) */
  const acceleratedSchedule = useMemo(() => {
    const P = pf(remainingBalance);
    const r = pf(interestRate) / 100 / 12;
    if (P <= 0 || r <= 0) return { rows: [] as AmortizationRow[], totalInterest: 0, totalMonths: 0 };

    const basePayment = effectivePayment;
    const extraM = pf(extraMonthly);
    const extraA = pf(extraAnnual);
    const lumpSum = pf(oneTimeLump);
    const lumpMonth = Math.max(1, Math.round(pf(lumpSumMonth)));
    const biweeklyExtra = paymentFrequency === "biweekly" ? basePayment / 12 : 0;

    let balance = P;
    let totalInterest = 0;
    const rows: AmortizationRow[] = [];
    let month = 0;

    while (balance > 0.01 && month < 600) {
      month++;
      const interestPaid = balance * r;

      let extra = extraM + biweeklyExtra;
      if (month % 12 === 0) extra += extraA;
      if (month === lumpMonth) extra += lumpSum;

      let principalPaid = basePayment - interestPaid;
      if (principalPaid < 0) principalPaid = 0;

      let totalExtra = extra;
      if (principalPaid + totalExtra > balance) {
        totalExtra = Math.max(0, balance - principalPaid);
        if (principalPaid > balance) {
          principalPaid = balance;
          totalExtra = 0;
        }
      }

      balance -= principalPaid + totalExtra;
      if (balance < 0) balance = 0;
      totalInterest += interestPaid;

      const totalPmt = interestPaid + principalPaid + totalExtra;

      rows.push({
        month,
        year: Math.ceil(month / 12),
        payment: basePayment,
        principalPaid,
        interestPaid,
        extraPaid: totalExtra,
        totalPayment: totalPmt,
        remainingBalance: balance,
      });
    }

    return { rows, totalInterest, totalMonths: month };
  }, [
    remainingBalance,
    interestRate,
    effectivePayment,
    extraMonthly,
    extraAnnual,
    oneTimeLump,
    lumpSumMonth,
    paymentFrequency,
  ]);

  /* 4. Savings */
  const savings = useMemo(() => {
    const monthsSaved = standardSchedule.totalMonths - acceleratedSchedule.totalMonths;
    const interestSaved = standardSchedule.totalInterest - acceleratedSchedule.totalInterest;
    return { monthsSaved: Math.max(0, monthsSaved), interestSaved: Math.max(0, interestSaved) };
  }, [standardSchedule, acceleratedSchedule]);

  /* 5. Escrow breakdown */
  const escrowMonthly = useMemo(() => {
    const tax = pf(propertyTax) / 12;
    const ins = pf(homeInsurance) / 12;
    const pmi = (pf(pmiRate) / 100) * pf(remainingBalance) / 12;
    return { tax, ins, pmi, total: tax + ins + pmi };
  }, [propertyTax, homeInsurance, pmiRate, remainingBalance]);

  /* 6. Refinance comparison */
  const refinanceCalc = useMemo(() => {
    const P = pf(remainingBalance);
    const rNew = pf(refiRate) / 100 / 12;
    const nNew = pf(refiTerm) * 12;
    const closingCosts = pf(refiClosingCosts);

    if (P <= 0 || rNew <= 0 || nNew <= 0) {
      return {
        newPayment: 0,
        monthlySavings: 0,
        breakEvenMonth: 0,
        lifetimeCurrentInterest: standardSchedule.totalInterest,
        lifetimeRefiInterest: 0,
        netSavings: 0,
        totalRefiCost: 0,
      };
    }

    const newPayment = (P * (rNew * Math.pow(1 + rNew, nNew))) / (Math.pow(1 + rNew, nNew) - 1);
    const monthlySavings = effectivePayment - newPayment;
    const breakEvenMonth = monthlySavings > 0 ? Math.ceil(closingCosts / monthlySavings) : Infinity;
    const lifetimeRefiInterest = newPayment * nNew - P;
    const netSavings = standardSchedule.totalInterest - lifetimeRefiInterest - closingCosts;

    return {
      newPayment,
      monthlySavings,
      breakEvenMonth: breakEvenMonth === Infinity ? 0 : breakEvenMonth,
      lifetimeCurrentInterest: standardSchedule.totalInterest,
      lifetimeRefiInterest,
      netSavings,
      totalRefiCost: P + lifetimeRefiInterest + closingCosts,
    };
  }, [remainingBalance, refiRate, refiTerm, refiClosingCosts, effectivePayment, standardSchedule.totalInterest]);

  /* 7. Year summaries for amortization table */
  const yearSummaries = useMemo((): YearSummary[] => {
    const rows = acceleratedSchedule.rows;
    const map = new Map<number, AmortizationRow[]>();
    for (const row of rows) {
      if (!map.has(row.year)) map.set(row.year, []);
      map.get(row.year)!.push(row);
    }
    const summaries: YearSummary[] = [];
    for (const [year, months] of map) {
      summaries.push({
        year,
        payments: months.length,
        principal: months.reduce((s, m) => s + m.principalPaid, 0),
        interest: months.reduce((s, m) => s + m.interestPaid, 0),
        extra: months.reduce((s, m) => s + m.extraPaid, 0),
        balance: months[months.length - 1].remainingBalance,
        months,
      });
    }
    return summaries;
  }, [acceleratedSchedule.rows]);

  /* 8. Filtered year summaries */
  const filteredYearSummaries = useMemo(() => {
    if (!searchYear.trim()) return yearSummaries;
    const q = searchYear.trim();
    return yearSummaries.filter((ys) => String(ys.year).includes(q));
  }, [yearSummaries, searchYear]);

  /* 9. Chart data: balance timeline */
  const balanceChartData = useMemo(() => {
    const data: { month: number; standard: number; accelerated: number }[] = [];
    const maxMonths = Math.max(standardSchedule.totalMonths, acceleratedSchedule.totalMonths);
    for (let i = 0; i <= maxMonths; i += Math.max(1, Math.floor(maxMonths / 60))) {
      const stdRow = standardSchedule.rows[i - 1];
      const accRow = acceleratedSchedule.rows[i - 1];
      data.push({
        month: i,
        standard: i === 0 ? pf(remainingBalance) : stdRow ? Math.round(stdRow.remainingBalance) : 0,
        accelerated: i === 0 ? pf(remainingBalance) : accRow ? Math.round(accRow.remainingBalance) : 0,
      });
    }
    // Ensure final point
    if (data.length > 0 && data[data.length - 1].month !== maxMonths) {
      const stdRow = standardSchedule.rows[standardSchedule.totalMonths - 1];
      const accRow = acceleratedSchedule.rows[acceleratedSchedule.totalMonths - 1];
      data.push({
        month: maxMonths,
        standard: stdRow ? Math.round(stdRow.remainingBalance) : 0,
        accelerated: accRow ? Math.round(accRow.remainingBalance) : 0,
      });
    }
    return data;
  }, [standardSchedule, acceleratedSchedule, remainingBalance]);

  /* 10. Pie chart data */
  const pieData = useMemo(() => {
    const principal = pf(remainingBalance);
    return [
      { name: "Principal", value: Math.round(principal) },
      { name: "Interest Paid", value: Math.round(acceleratedSchedule.totalInterest) },
      { name: "Interest Saved", value: Math.round(savings.interestSaved) },
    ];
  }, [remainingBalance, acceleratedSchedule.totalInterest, savings.interestSaved]);

  /* 11. Bar chart - cumulative interest by milestones */
  const cumulativeBarData = useMemo(() => {
    const milestones = [1, 5, 10, 15, 20, 25, 30];
    return milestones
      .filter((yr) => yr * 12 <= standardSchedule.totalMonths || yr * 12 <= acceleratedSchedule.totalMonths)
      .map((yr) => {
        const monthIdx = yr * 12 - 1;
        let stdInterest = 0;
        for (let i = 0; i <= Math.min(monthIdx, standardSchedule.rows.length - 1); i++) {
          stdInterest += standardSchedule.rows[i].interestPaid;
        }
        let accInterest = 0;
        for (let i = 0; i <= Math.min(monthIdx, acceleratedSchedule.rows.length - 1); i++) {
          accInterest += acceleratedSchedule.rows[i].interestPaid;
        }
        return {
          year: `Year ${yr}`,
          Standard: Math.round(stdInterest),
          Accelerated: Math.round(accInterest),
        };
      });
  }, [standardSchedule, acceleratedSchedule]);

  /* 12. Progress - loan paid percentage */
  const loanProgress = useMemo(() => {
    const P = pf(remainingBalance);
    if (P <= 0 || acceleratedSchedule.totalMonths <= 0) return 0;
    const totalPaid =
      acceleratedSchedule.rows.reduce((s, r) => s + r.principalPaid + r.extraPaid, 0);
    return Math.min(100, (totalPaid / P) * 100);
  }, [remainingBalance, acceleratedSchedule]);

  /* 13. Payoff dates */
  const payoffDates = useMemo(() => {
    const now = new Date();
    const stdDate = new Date(now);
    stdDate.setMonth(stdDate.getMonth() + standardSchedule.totalMonths);
    const accDate = new Date(now);
    accDate.setMonth(accDate.getMonth() + acceleratedSchedule.totalMonths);
    return {
      standard: stdDate.toLocaleDateString(locale, { year: "numeric", month: "long" }),
      accelerated: accDate.toLocaleDateString(locale, { year: "numeric", month: "long" }),
    };
  }, [standardSchedule.totalMonths, acceleratedSchedule.totalMonths, locale]);

  /* ================================================================ */
  /*  EXPORT FUNCTIONS                                                 */
  /* ================================================================ */

  const getReportText = (): string => {
    const lines: string[] = [];
    lines.push("=== Mortgage Payoff Report ===");
    lines.push(`Date: ${new Date().toLocaleString()}`);
    lines.push("");
    lines.push(`Remaining Balance: ${formatCurrency(pf(remainingBalance))}`);
    lines.push(`Interest Rate: ${interestRate}%`);
    lines.push(`Remaining Term: ${remainingYears} years`);
    lines.push(`Monthly P&I: ${formatCurrency(effectivePayment)}`);
    lines.push("");
    lines.push("--- Standard Schedule ---");
    lines.push(`Total Months: ${standardSchedule.totalMonths}`);
    lines.push(`Total Interest: ${formatCurrency(standardSchedule.totalInterest)}`);
    lines.push(`Payoff Date: ${payoffDates.standard}`);
    lines.push("");
    lines.push("--- Accelerated Schedule ---");
    lines.push(`Extra Monthly: ${formatCurrency(pf(extraMonthly))}`);
    lines.push(`Extra Annual: ${formatCurrency(pf(extraAnnual))}`);
    lines.push(`One-Time Lump Sum: ${formatCurrency(pf(oneTimeLump))}`);
    lines.push(`Payment Frequency: ${paymentFrequency}`);
    lines.push(`Total Months: ${acceleratedSchedule.totalMonths}`);
    lines.push(`Total Interest: ${formatCurrency(acceleratedSchedule.totalInterest)}`);
    lines.push(`Payoff Date: ${payoffDates.accelerated}`);
    lines.push("");
    lines.push("--- Savings ---");
    lines.push(`Time Saved: ${Math.floor(savings.monthsSaved / 12)} years, ${savings.monthsSaved % 12} months`);
    lines.push(`Interest Saved: ${formatCurrency(savings.interestSaved)}`);
    return lines.join("\n");
  };

  const exportAsCSV = () => {
    const header = "Month,Year,Payment,Principal,Interest,Extra,Total Payment,Remaining Balance";
    const rows = acceleratedSchedule.rows.map(
      (r) =>
        `${r.month},${r.year},${r.payment.toFixed(2)},${r.principalPaid.toFixed(2)},${r.interestPaid.toFixed(2)},${r.extraPaid.toFixed(2)},${r.totalPayment.toFixed(2)},${r.remainingBalance.toFixed(2)}`
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mortgage-payoff-schedule.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportAsJSON = () => {
    const data = {
      summary: {
        balance: pf(remainingBalance),
        rate: pf(interestRate),
        term: pf(remainingYears),
        monthlyPayment: effectivePayment,
        extraMonthly: pf(extraMonthly),
        extraAnnual: pf(extraAnnual),
        oneTimeLump: pf(oneTimeLump),
        paymentFrequency,
        standardMonths: standardSchedule.totalMonths,
        acceleratedMonths: acceleratedSchedule.totalMonths,
        standardInterest: standardSchedule.totalInterest,
        acceleratedInterest: acceleratedSchedule.totalInterest,
        monthsSaved: savings.monthsSaved,
        interestSaved: savings.interestSaved,
      },
      amortization: acceleratedSchedule.rows,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mortgage-payoff-data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const triggerCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const handlePrint = () => window.print();

  /* ---- History functions ---- */
  const saveToHistory = () => {
    const item: HistoryItem = {
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      date: new Date().toLocaleString(),
      balance: pf(remainingBalance),
      rate: pf(interestRate),
      term: pf(remainingYears),
      extraMonthly: pf(extraMonthly),
      monthsSaved: savings.monthsSaved,
      interestSaved: savings.interestSaved,
    };
    const updated = [item, ...history].slice(0, MAX_HISTORY);
    persistHistory(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const restoreFromHistory = (item: HistoryItem) => {
    setRemainingBalance(String(item.balance));
    setInterestRate(String(item.rate));
    setRemainingYears(String(item.term));
    setExtraMonthly(String(item.extraMonthly));
    setActiveTab("payoff");
  };

  const deleteFromHistory = (id: string) => {
    persistHistory(history.filter((h) => h.id !== id));
  };

  const clearHistory = () => persistHistory([]);

  /* ---- Toggle expanded year ---- */
  const toggleYear = (year: number) => {
    setExpandedYears((prev) => {
      const next = new Set(prev);
      if (next.has(year)) next.delete(year);
      else next.add(year);
      return next;
    });
  };

  /* ---- Tab config ---- */
  const tabs = [
    { key: "payoff" as const, label: "Payoff & Savings", icon: TrendingDown },
    { key: "amortization" as const, label: "Amortization Schedule", icon: Calendar },
    { key: "refinance" as const, label: "Refinance Compare", icon: RefreshCw },
    { key: "history" as const, label: "Saved Plans", icon: Clock },
  ];

  /* ================================================================ */
  /*  RENDER                                                           */
  /* ================================================================ */

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden print:shadow-none print:border-none">
      {/* ============================================================ */}
      {/* HEADER                                                        */}
      {/* ============================================================ */}
      <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
            <Home className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              {calcDef.title || "Mortgage Payoff Calculator"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Calculate how extra payments can save you time and money
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={saveToHistory}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors"
          >
            {saveSuccess ? <Check className="w-4 h-4" /> : <Star className="w-4 h-4" />}
            {saveSuccess ? "Saved!" : "Save Plan"}
          </button>
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB NAVIGATION                                                */}
      {/* ============================================================ */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 print:hidden">
        <div className="flex overflow-x-auto px-6 md:px-8 gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-400"
                    : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================ */}
      {/* MAIN GRID                                                     */}
      {/* ============================================================ */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ========================================================== */}
        {/* INPUT PANEL (left)                                          */}
        {/* ========================================================== */}
        <div className="lg:col-span-5 space-y-5 print:hidden">
          {/* Current Mortgage */}
          <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Home className="w-4 h-4 text-emerald-600" />
              Current Mortgage
            </h3>

            {/* Balance */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Remaining Balance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  {cSym}
                </span>
                <input
                  type="number"
                  value={remainingBalance}
                  onChange={(e) => setRemainingBalance(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                />
              </div>
            </div>

            {/* Rate */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Interest Rate
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full pl-3 pr-8 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  %
                </span>
              </div>
            </div>

            {/* Remaining Years */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Remaining Years
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={remainingYears}
                  onChange={(e) => setRemainingYears(e.target.value)}
                  className="w-full pl-3 pr-14 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-xs">
                  years
                </span>
              </div>
            </div>

            {/* Monthly Payment override */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Monthly P&I{" "}
                <span className="text-slate-400 font-normal normal-case">(auto or override)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  {cSym}
                </span>
                <input
                  type="number"
                  placeholder={computedMonthlyPI.toFixed(2)}
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none placeholder:font-normal placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Extra Payments */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 space-y-4">
            <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Extra Payments
            </h3>

            {/* Extra Monthly */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Monthly Extra
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  {cSym}
                </span>
                <input
                  type="number"
                  value={extraMonthly}
                  onChange={(e) => setExtraMonthly(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                />
              </div>
            </div>

            {/* Extra Annual */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                Annual Extra
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                  {cSym}
                </span>
                <input
                  type="number"
                  value={extraAnnual}
                  onChange={(e) => setExtraAnnual(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                />
              </div>
            </div>

            {/* One-time Lump Sum */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  One-Time Lump Sum
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                    {cSym}
                  </span>
                  <input
                    type="number"
                    value={oneTimeLump}
                    onChange={(e) => setOneTimeLump(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  At Month #
                </label>
                <input
                  type="number"
                  min="1"
                  value={lumpSumMonth}
                  onChange={(e) => setLumpSumMonth(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Frequency */}
          <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              Payment Frequency
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {(["monthly", "biweekly"] as const).map((freq) => (
                <button
                  key={freq}
                  onClick={() => setPaymentFrequency(freq)}
                  className={`py-2 px-3 rounded-xl text-sm font-bold transition-colors ${
                    paymentFrequency === freq
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-emerald-400"
                  }`}
                >
                  {freq === "monthly" ? "Monthly" : "Biweekly"}
                </button>
              ))}
            </div>
            {paymentFrequency === "biweekly" && (
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                Biweekly payments result in 26 half-payments per year, equivalent to 13 monthly payments.
              </p>
            )}
          </div>

          {/* Escrow (collapsible) */}
          <div className="bg-slate-50 dark:bg-slate-800/30 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setShowEscrow(!showEscrow)}
              className="flex items-center justify-between w-full text-sm font-bold text-slate-800 dark:text-slate-200"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                Escrow & Insurance
              </span>
              {showEscrow ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>

            {showEscrow && (
              <div className="mt-4 space-y-4">
                {/* Property Tax */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    Annual Property Tax
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                      {cSym}
                    </span>
                    <input
                      type="number"
                      value={propertyTax}
                      onChange={(e) => setPropertyTax(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                  </div>
                </div>

                {/* Home Insurance */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    Annual Home Insurance
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                      {cSym}
                    </span>
                    <input
                      type="number"
                      value={homeInsurance}
                      onChange={(e) => setHomeInsurance(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                  </div>
                </div>

                {/* PMI */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                    PMI Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      value={pmiRate}
                      onChange={(e) => setPmiRate(e.target.value)}
                      className="w-full pl-3 pr-8 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                      %
                    </span>
                  </div>
                </div>

                {/* Escrow summary */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Monthly Tax:</span>
                    <span className="font-bold dark:text-white">{formatCurrency(escrowMonthly.tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Monthly Insurance:</span>
                    <span className="font-bold dark:text-white">{formatCurrency(escrowMonthly.ins)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Monthly PMI:</span>
                    <span className="font-bold dark:text-white">{formatCurrency(escrowMonthly.pmi)}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-1 mt-1">
                    <span className="text-slate-700 dark:text-slate-200 font-bold">Total Escrow:</span>
                    <span className="font-bold text-emerald-600">{formatCurrency(escrowMonthly.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700 dark:text-slate-200 font-bold">Full Monthly (P&I + Escrow):</span>
                    <span className="font-bold text-emerald-600">{formatCurrency(effectivePayment + escrowMonthly.total)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Refinance Inputs (only when on refinance tab) */}
          {activeTab === "refinance" && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200 dark:border-blue-800/50 space-y-4">
              <h3 className="text-sm font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refinance Parameters
              </h3>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  New Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    value={refiRate}
                    onChange={(e) => setRefiRate(e.target.value)}
                    className="w-full pl-3 pr-8 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">%</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  New Term (years)
                </label>
                <input
                  type="number"
                  value={refiTerm}
                  onChange={(e) => setRefiTerm(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  Closing Costs
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm">
                    {cSym}
                  </span>
                  <input
                    type="number"
                    value={refiClosingCosts}
                    onChange={(e) => setRefiClosingCosts(e.target.value)}
                    className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-bold outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================== */}
        {/* OUTPUT PANEL (right)                                        */}
        {/* ========================================================== */}
        <div className="lg:col-span-7 space-y-6">
          {/* ====== PAYOFF TAB ====== */}
          {activeTab === "payoff" && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {/* Original Payoff */}
                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Original Payoff
                  </div>
                  <div className="text-lg font-bold text-slate-800 dark:text-white">{payoffDates.standard}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{standardSchedule.totalMonths} months</div>
                </div>

                {/* New Payoff */}
                <div className="bg-emerald-50 dark:bg-emerald-900/30 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/50">
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                    New Payoff
                  </div>
                  <div className="text-lg font-bold text-emerald-800 dark:text-emerald-200">{payoffDates.accelerated}</div>
                  <div className="text-xs text-emerald-500 dark:text-emerald-400 mt-0.5">
                    {acceleratedSchedule.totalMonths} months
                  </div>
                </div>

                {/* Time Saved */}
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-2xl border border-blue-200 dark:border-blue-800/50">
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                    Time Saved
                  </div>
                  <div className="text-lg font-bold text-blue-800 dark:text-blue-200">
                    {Math.floor(savings.monthsSaved / 12)}y {savings.monthsSaved % 12}m
                  </div>
                  <div className="text-xs text-blue-500 dark:text-blue-400 mt-0.5">
                    {savings.monthsSaved} months total
                  </div>
                </div>

                {/* Interest Saved */}
                <div className="bg-green-50 dark:bg-green-900/30 p-4 rounded-2xl border border-green-200 dark:border-green-800/50">
                  <div className="text-xs font-bold text-green-600 dark:text-green-400 uppercase tracking-wider mb-1">
                    Interest Saved
                  </div>
                  <div className="text-lg font-bold text-green-800 dark:text-green-200">
                    {formatCurrency(savings.interestSaved)}
                  </div>
                </div>

                {/* Total Interest (Standard) */}
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-200 dark:border-red-800/40">
                  <div className="text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-wider mb-1">
                    Interest (Standard)
                  </div>
                  <div className="text-lg font-bold text-red-700 dark:text-red-300">
                    {formatCurrency(standardSchedule.totalInterest)}
                  </div>
                </div>

                {/* Total Interest (Accelerated) */}
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/40">
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">
                    Interest (Accelerated)
                  </div>
                  <div className="text-lg font-bold text-amber-700 dark:text-amber-300">
                    {formatCurrency(acceleratedSchedule.totalInterest)}
                  </div>
                </div>
              </div>

              {/* Goal Progress */}
              <div className="bg-white dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Loan Payoff Progress</span>
                  <span className="text-sm font-bold text-emerald-600">{loanProgress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-3 rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(100, loanProgress)}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                  {formatCurrency(pf(remainingBalance))} principal will be fully paid over{" "}
                  {acceleratedSchedule.totalMonths} months with your current plan.
                </p>
              </div>

              {/* Balance Timeline Chart */}
              {balanceChartData.length > 1 && (
                <div className="bg-white dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">Balance Over Time</h3>
                  <div className="w-full h-[280px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={balanceChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorStandard" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                          </linearGradient>
                          <linearGradient id="colorAccelerated" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748b", fontSize: 11 }}
                          tickFormatter={(val: number) =>
                            val >= 12 ? `Yr ${Math.round(val / 12)}` : `Mo ${val}`
                          }
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748b", fontSize: 11 }}
                          tickFormatter={(val: number) =>
                            `$${val >= 1000 ? (val / 1000).toFixed(0) + "k" : val}`
                          }
                          width={55}
                        />
                        <RechartsTooltip
                          formatter={(value: any) => [
                            `$${Number(value).toLocaleString()}`,
                            "",
                          ]}
                          labelFormatter={(label: any) => `Month ${label}`}
                          contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid #e2e8f0",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            fontSize: 12,
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="standard"
                          name="Standard"
                          stroke="#ef4444"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorStandard)"
                        />
                        <Area
                          type="monotone"
                          dataKey="accelerated"
                          name="Accelerated"
                          stroke="#10b981"
                          strokeWidth={2}
                          fillOpacity={1}
                          fill="url(#colorAccelerated)"
                        />
                        <Legend />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Interest Breakdown Pie */}
              {pieData.some((d) => d.value > 0) && (
                <div className="bg-white dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">
                    Interest Breakdown
                  </h3>
                  <div className="w-full h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                          label={(props: any) =>
                            `${props.name || ''} ${((props.percent || 0) * 100).toFixed(0)}%`
                          }
                        >
                          {pieData.map((_, idx) => (
                            <Cell key={`cell-${idx}`} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <RechartsTooltip
                          formatter={(value: any) => [`$${Number(value).toLocaleString()}`, ""]}
                          contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid #e2e8f0",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            fontSize: 12,
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mt-2">
                    {pieData.map((entry, idx) => (
                      <div key={entry.name} className="flex items-center gap-1.5 text-xs">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: CHART_COLORS[idx % CHART_COLORS.length] }}
                        />
                        <span className="text-slate-600 dark:text-slate-300">{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Cumulative Interest Bar Chart */}
              {cumulativeBarData.length > 0 && (
                <div className="bg-white dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">
                    Cumulative Interest Comparison
                  </h3>
                  <div className="w-full h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={cumulativeBarData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                        <XAxis
                          dataKey="year"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748b", fontSize: 11 }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: "#64748b", fontSize: 11 }}
                          tickFormatter={(val: number) =>
                            `$${val >= 1000 ? (val / 1000).toFixed(0) + "k" : val}`
                          }
                          width={55}
                        />
                        <RechartsTooltip
                          formatter={(value: any) => [`$${Number(value).toLocaleString()}`, ""]}
                          contentStyle={{
                            borderRadius: "12px",
                            border: "1px solid #e2e8f0",
                            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                            fontSize: 12,
                          }}
                        />
                        <Legend />
                        <Bar dataKey="Standard" fill="#ef4444" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="Accelerated" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Export Buttons */}
              <div className="flex flex-wrap gap-2 print:hidden">
                <button
                  onClick={() => triggerCopy(getReportText(), "report")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {copiedKey === "report" ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  {copiedKey === "report" ? "Copied!" : "Copy Report"}
                </button>
                <button
                  onClick={exportAsCSV}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <FileText className="w-4 h-4" />
                  CSV
                </button>
                <button
                  onClick={exportAsJSON}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <FileJson className="w-4 h-4" />
                  JSON
                </button>
                <button
                  onClick={() => triggerCopy(getReportText(), "txt")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  {copiedKey === "txt" ? <Check className="w-4 h-4 text-emerald-600" /> : <Download className="w-4 h-4" />}
                  TXT
                </button>
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </>
          )}

          {/* ====== AMORTIZATION TAB ====== */}
          {activeTab === "amortization" && (
            <>
              {/* Search */}
              <div className="flex items-center gap-3 print:hidden">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by year..."
                    value={searchYear}
                    onChange={(e) => setSearchYear(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 dark:text-white font-bold outline-none text-sm"
                  />
                </div>
                <button
                  onClick={exportAsCSV}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
              </div>

              {/* Year Summaries */}
              <div className="space-y-2">
                {filteredYearSummaries.map((ys) => {
                  const isExpanded = expandedYears.has(ys.year);
                  return (
                    <div
                      key={ys.year}
                      className="bg-white dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                    >
                      {/* Year header */}
                      <button
                        onClick={() => toggleYear(ys.year)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors print:hidden"
                      >
                        <div className="flex items-center gap-3">
                          {isExpanded ? (
                            <ChevronDown className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          )}
                          <span className="text-sm font-bold text-slate-800 dark:text-white">
                            Year {ys.year}
                          </span>
                          <span className="text-xs text-slate-400 dark:text-slate-500">
                            ({ys.payments} payments)
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-slate-500 dark:text-slate-400">
                            Principal: <span className="font-bold text-emerald-600">{formatCurrency(ys.principal)}</span>
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            Interest: <span className="font-bold text-red-500">{formatCurrency(ys.interest)}</span>
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            Balance: <span className="font-bold text-slate-800 dark:text-white">{formatCurrency(ys.balance)}</span>
                          </span>
                        </div>
                      </button>

                      {/* Print-visible year summary */}
                      <div className="hidden print:flex items-center justify-between p-4 border-b border-slate-100">
                        <span className="text-sm font-bold text-slate-800">Year {ys.year}</span>
                        <div className="flex items-center gap-4 text-xs">
                          <span>Principal: {formatCurrency(ys.principal)}</span>
                          <span>Interest: {formatCurrency(ys.interest)}</span>
                          <span>Balance: {formatCurrency(ys.balance)}</span>
                        </div>
                      </div>

                      {/* Expanded months */}
                      {(isExpanded) && (
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs text-left min-w-[600px]">
                            <thead className="text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50 dark:bg-slate-900/40">
                              <tr>
                                <th className="px-4 py-2.5 font-bold">Month</th>
                                <th className="px-4 py-2.5 font-bold">Payment</th>
                                <th className="px-4 py-2.5 font-bold">Principal</th>
                                <th className="px-4 py-2.5 font-bold">Interest</th>
                                <th className="px-4 py-2.5 font-bold">Extra</th>
                                <th className="px-4 py-2.5 font-bold">Total</th>
                                <th className="px-4 py-2.5 font-bold text-right">Balance</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                              {ys.months.map((row) => (
                                <tr
                                  key={row.month}
                                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
                                >
                                  <td className="px-4 py-2 font-medium text-slate-600 dark:text-slate-300">
                                    {row.month}
                                  </td>
                                  <td className="px-4 py-2 text-slate-700 dark:text-slate-300">
                                    {formatCurrency(row.payment)}
                                  </td>
                                  <td className="px-4 py-2 text-emerald-600 font-medium">
                                    {formatCurrency(row.principalPaid)}
                                  </td>
                                  <td className="px-4 py-2 text-red-500 font-medium">
                                    {formatCurrency(row.interestPaid)}
                                  </td>
                                  <td className="px-4 py-2 text-blue-600 font-medium">
                                    {row.extraPaid > 0 ? formatCurrency(row.extraPaid) : "—"}
                                  </td>
                                  <td className="px-4 py-2 text-slate-700 dark:text-slate-200 font-bold">
                                    {formatCurrency(row.totalPayment)}
                                  </td>
                                  <td className="px-4 py-2 text-slate-900 dark:text-white font-bold text-right">
                                    {formatCurrency(row.remainingBalance)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {filteredYearSummaries.length === 0 && (
                <div className="text-center py-10 text-slate-400 dark:text-slate-500">
                  <Calendar className="w-10 h-10 mx-auto mb-3 opacity-40" />
                  <p className="font-medium">No matching years found</p>
                </div>
              )}
            </>
          )}

          {/* ====== REFINANCE TAB ====== */}
          {activeTab === "refinance" && (
            <>
              {/* Side-by-side cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Current */}
                <div className="bg-red-50 dark:bg-red-900/20 p-5 rounded-2xl border border-red-200 dark:border-red-800/40 space-y-3">
                  <h3 className="text-sm font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                    <Minus className="w-4 h-4" />
                    Current Mortgage
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Rate:</span>
                      <span className="font-bold text-slate-800 dark:text-white">{interestRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Term Remaining:</span>
                      <span className="font-bold text-slate-800 dark:text-white">{remainingYears} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Monthly P&I:</span>
                      <span className="font-bold text-slate-800 dark:text-white">{formatCurrency(effectivePayment)}</span>
                    </div>
                    <div className="flex justify-between border-t border-red-200 dark:border-red-800/40 pt-2">
                      <span className="text-slate-600 dark:text-slate-400">Lifetime Interest:</span>
                      <span className="font-bold text-red-600">{formatCurrency(refinanceCalc.lifetimeCurrentInterest)}</span>
                    </div>
                  </div>
                </div>

                {/* Refinance */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-2xl border border-blue-200 dark:border-blue-800/40 space-y-3">
                  <h3 className="text-sm font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Refinanced Mortgage
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Rate:</span>
                      <span className="font-bold text-slate-800 dark:text-white">{refiRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">New Term:</span>
                      <span className="font-bold text-slate-800 dark:text-white">{refiTerm} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">New Monthly P&I:</span>
                      <span className="font-bold text-slate-800 dark:text-white">{formatCurrency(refinanceCalc.newPayment)}</span>
                    </div>
                    <div className="flex justify-between border-t border-blue-200 dark:border-blue-800/40 pt-2">
                      <span className="text-slate-600 dark:text-slate-400">Lifetime Interest:</span>
                      <span className="font-bold text-blue-600">{formatCurrency(refinanceCalc.lifetimeRefiInterest)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/40 text-center">
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-1">Monthly Savings</div>
                  <div className="text-lg font-bold text-emerald-700 dark:text-emerald-300">
                    {refinanceCalc.monthlySavings > 0 ? formatCurrency(refinanceCalc.monthlySavings) : "—"}
                  </div>
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/40 text-center">
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase mb-1">Break-Even</div>
                  <div className="text-lg font-bold text-amber-700 dark:text-amber-300">
                    {refinanceCalc.breakEvenMonth > 0
                      ? `${refinanceCalc.breakEvenMonth} mo`
                      : "N/A"}
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Closing Costs</div>
                  <div className="text-lg font-bold text-slate-800 dark:text-white">
                    {formatCurrency(pf(refiClosingCosts))}
                  </div>
                </div>
                <div
                  className={`p-4 rounded-2xl border text-center ${
                    refinanceCalc.netSavings > 0
                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/40"
                      : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/40"
                  }`}
                >
                  <div
                    className={`text-xs font-bold uppercase mb-1 ${
                      refinanceCalc.netSavings > 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    Net Savings
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      refinanceCalc.netSavings > 0
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }`}
                  >
                    {formatCurrency(refinanceCalc.netSavings)}
                  </div>
                </div>
              </div>

              {/* Break-even progress */}
              {refinanceCalc.breakEvenMonth > 0 && refinanceCalc.monthlySavings > 0 && (
                <div className="bg-white dark:bg-slate-800/40 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Break-Even Timeline</span>
                    <span className="text-xs font-bold text-amber-600">
                      {refinanceCalc.breakEvenMonth} months
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-amber-400 h-2.5 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (refinanceCalc.breakEvenMonth / (pf(refiTerm) * 12)) * 100
                        )}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                    You will recoup closing costs after {refinanceCalc.breakEvenMonth} months (
                    {(refinanceCalc.breakEvenMonth / 12).toFixed(1)} years).
                  </p>
                </div>
              )}

              {/* Recommendation */}
              <div
                className={`p-5 rounded-2xl border flex items-start gap-3 ${
                  refinanceCalc.netSavings > 0
                    ? "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800/40"
                    : "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/40"
                }`}
              >
                {refinanceCalc.netSavings > 0 ? (
                  <PiggyBank className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                )}
                <div>
                  <h4
                    className={`text-sm font-bold ${
                      refinanceCalc.netSavings > 0
                        ? "text-emerald-800 dark:text-emerald-300"
                        : "text-amber-800 dark:text-amber-300"
                    }`}
                  >
                    {refinanceCalc.netSavings > 0 ? "Refinancing Could Be Beneficial" : "Refinancing May Not Be Worth It"}
                  </h4>
                  <p
                    className={`text-xs mt-1 ${
                      refinanceCalc.netSavings > 0
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-amber-700 dark:text-amber-400"
                    }`}
                  >
                    {refinanceCalc.netSavings > 0
                      ? `Refinancing from ${interestRate}% to ${refiRate}% could save you ${formatCurrency(
                          refinanceCalc.netSavings
                        )} over the life of the loan (after closing costs of ${formatCurrency(
                          pf(refiClosingCosts)
                        )}). Your monthly payment would decrease by ${formatCurrency(
                          refinanceCalc.monthlySavings
                        )}.`
                      : `At the current rates, refinancing would cost you ${formatCurrency(
                          Math.abs(refinanceCalc.netSavings)
                        )} more than staying with your current mortgage. Consider waiting for lower rates or shorter terms.`}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* ====== HISTORY TAB ====== */}
          {activeTab === "history" && (
            <>
              {history.length > 0 && (
                <div className="flex justify-end print:hidden">
                  <button
                    onClick={clearHistory}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </button>
                </div>
              )}

              {history.length === 0 ? (
                <div className="text-center py-16 text-slate-400 dark:text-slate-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 opacity-40" />
                  <p className="font-bold text-lg">No Saved Plans</p>
                  <p className="text-sm mt-1">Click &ldquo;Save Plan&rdquo; to bookmark your current scenario.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center gap-4"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-slate-800 dark:text-white">
                          {formatCurrency(item.balance)} at {item.rate}%
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.date} &bull; {item.term} yr term &bull; Extra: {formatCurrency(item.extraMonthly)}/mo
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 text-xs">
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            {Math.floor(item.monthsSaved / 12)}y {item.monthsSaved % 12}m saved
                          </span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            {formatCurrency(item.interestSaved)} interest saved
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 print:hidden">
                        <button
                          onClick={() => restoreFromHistory(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/60 transition-colors"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          Restore
                        </button>
                        <button
                          onClick={() => deleteFromHistory(item.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
