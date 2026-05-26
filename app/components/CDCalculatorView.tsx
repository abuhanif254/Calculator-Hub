"use client";

import React, { useState, useEffect, useMemo } from "react";
import { CalculatorDef } from "@/lib/types";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Info,
  Calendar,
  DollarSign,
  TrendingUp,
  Copy,
  Download,
  History,
  Plus,
  Trash2,
  ArrowUpRight,
  BookOpen,
  Target,
  RefreshCw,
  Sparkles,
  Settings,
  HelpCircle,
  Check,
  AlertTriangle,
  FileText,
  Printer,
} from "lucide-react";

interface CDCalculatorViewProps {
  calcDef: CalculatorDef;
  locale?: string;
}

interface SavedScenario {
  id: string;
  name: string;
  timestamp: number;
  initialDeposit: number;
  apy: number;
  termMonths: number;
  compoundFrequency: number;
  recurringAmount: number;
  recurringFrequency: string;
  inflationRate: number;
  currency: string;
}

export function CDCalculatorView({ calcDef, locale }: CDCalculatorViewProps) {
  // Tabs: "growth", "penalty", "ladder", "comparison", "history"
  const [activeTab, setActiveTab] = useState<string>("growth");

  // Multi-Currency Mappings
  const currencies = [
    { label: "USD ($)", symbol: "$" },
    { label: "EUR (€)", symbol: "€" },
    { label: "GBP (£)", symbol: "£" },
    { label: "CAD (C$)", symbol: "C$" },
    { label: "AUD (A$)", symbol: "A$" },
    { label: "BDT (৳)", symbol: "৳" },
    { label: "Custom", symbol: "" },
  ];
  const [selectedCurrency, setSelectedCurrency] = useState<string>("$");
  const [customCurrency, setCustomCurrency] = useState<string>("");
  const currencySymbol = selectedCurrency === "" ? customCurrency || "¤" : selectedCurrency;

  // Formatting utilities
  const formatCurrency = (val: number) => {
    return `${currencySymbol}${val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // --- 1. CD GROWTH & SAVINGS STATE ---
  const [initialDeposit, setInitialDeposit] = useState<number>(10000);
  const [apy, setApy] = useState<number>(4.85); // Stated APY (%)
  const [termMonths, setTermMonths] = useState<number>(12); // Stated term in months
  const [termInputType, setTermInputType] = useState<"months" | "years">("months");
  const [customTermVal, setCustomTermVal] = useState<number>(12);
  const [compoundFrequency, setCompoundFrequency] = useState<number>(12); // Compounding Frequency (12 = Monthly)
  const [recurringAmount, setRecurringAmount] = useState<number>(0); // Optional add-on recurring deposit
  const [recurringFrequency, setRecurringFrequency] = useState<string>("none"); // monthly, quarterly, annually, none
  const [inflationRate, setInflationRate] = useState<number>(2.5); // Inflation rate (%)
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // --- 2. EARLY WITHDRAWAL PENALTY STATE ---
  const [withdrawalMonth, setWithdrawalMonth] = useState<number>(6); // Months after opening
  const [penaltyType, setPenaltyType] = useState<string>("months_interest"); // months_interest, percent_principal, flat_fee
  const [penaltyMonthsRule, setPenaltyMonthsRule] = useState<number>(3); // e.g. 3 months of interest
  const [penaltyPercentRule, setPenaltyPercentRule] = useState<number>(1.0); // e.g. 1.0% of principal
  const [penaltyFlatRule, setPenaltyFlatRule] = useState<number>(150); // e.g. $150 flat fee

  // --- 3. CD LADDER PLANNER STATE ---
  const [ladderTotalSum, setLadderTotalSum] = useState<number>(50000);
  const [ladderRungsCount, setLadderRungsCount] = useState<number>(5);
  const [ladderRungs, setLadderRungs] = useState<Array<{ id: number; termMonths: number; apy: number; weight: number }>>([
    { id: 1, termMonths: 12, apy: 4.25, weight: 20 },
    { id: 2, termMonths: 24, apy: 4.40, weight: 20 },
    { id: 3, termMonths: 36, apy: 4.60, weight: 20 },
    { id: 4, termMonths: 48, apy: 4.75, weight: 20 },
    { id: 5, termMonths: 60, apy: 4.90, weight: 20 },
  ]);

  // --- 4. COMPARISON STATE ---
  const [compareInitialA, setCompareInitialA] = useState<number>(10000);
  const [compareApyA, setCompareApyA] = useState<number>(4.5);
  const [compareTermA, setCompareTermA] = useState<number>(12);
  const [compareCompA, setCompareCompA] = useState<number>(12);

  const [compareInitialB, setCompareInitialB] = useState<number>(10000);
  const [compareApyB, setCompareApyB] = useState<number>(4.85);
  const [compareTermB, setCompareTermB] = useState<number>(12);
  const [compareCompB, setCompareCompB] = useState<number>(365); // Daily

  // --- 5. HISTORY & LOCALSTORAGE ---
  const [savedScenarios, setSavedScenarios] = useState<SavedScenario[]>([]);
  const [scenarioNameInput, setScenarioNameInput] = useState<string>("");
  const [copiedText, setCopiedText] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Synchronize dynamic input terms
  useEffect(() => {
    if (termInputType === "months") {
      setTermMonths(customTermVal);
    } else {
      setTermMonths(Math.round(customTermVal * 12));
    }
  }, [customTermVal, termInputType]);

  // Auto-cap penalty withdrawal month to term length minus 1
  useEffect(() => {
    if (withdrawalMonth >= termMonths) {
      setWithdrawalMonth(Math.max(1, termMonths - 1));
    }
  }, [termMonths, withdrawalMonth]);

  // Load history from localStorage
  useEffect(() => {
    const history = localStorage.getItem("nexus_cd_calc_history");
    if (history) {
      try {
        setSavedScenarios(JSON.parse(history));
      } catch (e) {
        console.error("Failed to parse CD history", e);
      }
    }
  }, []);

  const saveHistory = (updated: SavedScenario[]) => {
    setSavedScenarios(updated);
    localStorage.setItem("nexus_cd_calc_history", JSON.stringify(updated));
  };

  const handleSaveScenario = () => {
    const name = scenarioNameInput.trim() || `CD Scenario ${savedScenarios.length + 1}`;
    const newScenario: SavedScenario = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      timestamp: Date.now(),
      initialDeposit,
      apy,
      termMonths,
      compoundFrequency,
      recurringAmount,
      recurringFrequency,
      inflationRate,
      currency: currencySymbol,
    };
    const updated = [newScenario, ...savedScenarios].slice(0, 10);
    saveHistory(updated);
    setScenarioNameInput("");
    triggerToast("CD Scenario saved to browser history!");
  };

  const handleRestoreScenario = (scen: SavedScenario) => {
    setInitialDeposit(scen.initialDeposit);
    setApy(scen.apy);
    setCompoundFrequency(scen.compoundFrequency);
    setRecurringAmount(scen.recurringAmount);
    setRecurringFrequency(scen.recurringFrequency);
    setInflationRate(scen.inflationRate);
    setTermInputType("months");
    setCustomTermVal(scen.termMonths);
    setTermMonths(scen.termMonths);
    setSelectedCurrency(currencies.find((c) => c.symbol === scen.currency)?.symbol || "");
    if (!currencies.some((c) => c.symbol === scen.currency)) {
      setCustomCurrency(scen.currency);
    }
    triggerToast(`Restored scenario "${scen.name}"!`);
  };

  const handleDeleteScenario = (id: string) => {
    const updated = savedScenarios.filter((s) => s.id !== id);
    saveHistory(updated);
    triggerToast("Scenario removed.");
  };

  // Stagger CD Ladder weights when rungs count change
  useEffect(() => {
    const defaultTerms = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120];
    const defaultApys = [4.2, 4.35, 4.5, 4.65, 4.8, 4.9, 4.95, 5.0, 5.05, 5.1];
    const newRungs = Array.from({ length: ladderRungsCount }).map((_, i) => {
      const existing = ladderRungs[i];
      return {
        id: i + 1,
        termMonths: existing?.termMonths || defaultTerms[i] || (i + 1) * 12,
        apy: existing?.apy || defaultApys[i] || 4.5,
        weight: 100 / ladderRungsCount,
      };
    });
    setLadderRungs(newRungs);
  }, [ladderRungsCount]);

  // Helper to handle ladder input changes
  const updateLadderRung = (index: number, key: "termMonths" | "apy" | "weight", value: number) => {
    const updated = [...ladderRungs];
    updated[index] = { ...updated[index], [key]: value };
    setLadderRungs(updated);
  };

  // --- CALCULATION ENGINE: CORE CD GROWTH ---
  const results = useMemo(() => {
    const P = initialDeposit;
    const APY_decimal = apy / 100;
    const infl = inflationRate / 100;
    const cf = compoundFrequency; // Compounding frequency per year
    const termYears = termMonths / 12;

    // Convert advertised APY to nominal APR (Annual Percentage Rate)
    // APR = cf * ((1 + APY)^(1/cf) - 1)
    const apr = cf * (Math.pow(1 + APY_decimal, 1 / cf) - 1);
    const periodicRate = apr / cf;

    // We build a month-by-month simulation to generate high-fidelity timeline data
    // compounding happens cf times a year. Let's find periods per month: cf/12
    const totalMonths = termMonths;
    let balance = P;
    let totalDeposited = P;
    let chartData = [];

    chartData.push({
      month: 0,
      year: 0,
      principal: Math.round(P),
      interest: 0,
      balance: Math.round(P),
      realBalance: Math.round(P),
    });

    // Helper: translate recurring frequencies to monthly additions
    let monthlyAdd = 0;
    if (recurringFrequency === "monthly") {
      monthlyAdd = recurringAmount;
    } else if (recurringFrequency === "quarterly") {
      monthlyAdd = recurringAmount / 3;
    } else if (recurringFrequency === "annually") {
      monthlyAdd = recurringAmount / 12;
    }

    for (let m = 1; m <= totalMonths; m++) {
      // Calculate compound interest credited in this month
      // Future Value of current balance over 1 month: balance * (1 + periodicRate)^(cf/12)
      const compoundPeriodsInMonth = cf / 12;
      const initialBal = balance;
      balance = balance * Math.pow(1 + periodicRate, compoundPeriodsInMonth);

      // Add recurring additions (at the end of the month)
      if (monthlyAdd > 0) {
        balance += monthlyAdd;
        totalDeposited += monthlyAdd;
      }

      const interestAccumulated = balance - totalDeposited;
      const inflationFactor = Math.pow(1 + infl, m / 12);
      const realBalance = balance / inflationFactor;

      // Log stats at each month for smooth chart, displaying years fractional
      chartData.push({
        month: m,
        year: parseFloat((m / 12).toFixed(2)),
        principal: Math.round(totalDeposited),
        interest: Math.round(interestAccumulated),
        balance: Math.round(balance),
        realBalance: Math.round(realBalance),
      });
    }

    const maturityValue = balance;
    const totalInterestEarned = maturityValue - totalDeposited;
    const realMaturityValue = maturityValue / Math.pow(1 + infl, termYears);
    const purchasingPowerLoss = maturityValue - realMaturityValue;

    return {
      apr: apr * 100, // in percentage
      maturityValue,
      totalInterestEarned,
      totalDeposited,
      realMaturityValue,
      purchasingPowerLoss,
      chartData,
    };
  }, [initialDeposit, apy, termMonths, compoundFrequency, recurringAmount, recurringFrequency, inflationRate]);

  // --- CALCULATION ENGINE: EARLY WITHDRAWAL PENALTY ---
  const penaltyResults = useMemo(() => {
    const P = initialDeposit;
    const APY_decimal = apy / 100;
    const cf = compoundFrequency;
    const termYears = termMonths / 12;

    // Nominal interest rate APR
    const apr = cf * (Math.pow(1 + APY_decimal, 1 / cf) - 1);
    const periodicRate = apr / cf;

    // Calculate balance at withdrawal time (month withdrawalMonth)
    let balanceAtWithdrawal = P;
    let totalDepositedAtWithdrawal = P;

    let monthlyAdd = 0;
    if (recurringFrequency === "monthly") monthlyAdd = recurringAmount;
    else if (recurringFrequency === "quarterly") monthlyAdd = recurringAmount / 3;
    else if (recurringFrequency === "annually") monthlyAdd = recurringAmount / 12;

    for (let m = 1; m <= withdrawalMonth; m++) {
      balanceAtWithdrawal = balanceAtWithdrawal * Math.pow(1 + periodicRate, cf / 12);
      if (monthlyAdd > 0) {
        balanceAtWithdrawal += monthlyAdd;
        totalDepositedAtWithdrawal += monthlyAdd;
      }
    }

    const grossInterestEarned = balanceAtWithdrawal - totalDepositedAtWithdrawal;

    // Calculate penalty amount
    let penalty = 0;
    if (penaltyType === "months_interest") {
      // Penalty is based on months of simple interest on current balance at APR
      // Monthly interest = balanceAtWithdrawal * (apr / 12)
      penalty = balanceAtWithdrawal * (apr / 12) * penaltyMonthsRule;
    } else if (penaltyType === "percent_principal") {
      penalty = P * (penaltyPercentRule / 100);
    } else if (penaltyType === "flat_fee") {
      penalty = penaltyFlatRule;
    }

    const netInterestEarned = grossInterestEarned - penalty;
    const payoffAmount = totalDepositedAtWithdrawal + netInterestEarned;
    const principalReduced = netInterestEarned < 0;
    const principalEaten = principalReduced ? Math.abs(netInterestEarned) : 0;

    return {
      grossInterestEarned,
      penalty,
      netInterestEarned,
      payoffAmount,
      principalReduced,
      principalEaten,
      balanceAtWithdrawal,
    };
  }, [
    initialDeposit,
    apy,
    termMonths,
    compoundFrequency,
    recurringAmount,
    recurringFrequency,
    withdrawalMonth,
    penaltyType,
    penaltyMonthsRule,
    penaltyPercentRule,
    penaltyFlatRule,
  ]);

  // --- CALCULATION ENGINE: CD LADDER PLANNER ---
  const ladderResults = useMemo(() => {
    let totalLadderInterest = 0;
    let totalMaturityValue = 0;
    let weightedApySum = 0;
    let rungsBreakdown: Array<{
      id: number;
      termMonths: number;
      apy: number;
      weight: number;
      principal: number;
      interest: number;
      maturityVal: number;
      maturityDateStr: string;
    }> = [];

    // Stagger maturities from today
    const now = new Date();

    ladderRungs.forEach((rung) => {
      const rungPrincipal = (ladderTotalSum * rung.weight) / 100;
      const r_dec = rung.apy / 100;
      
      // Standard monthly compounding simulation for the ladder CDs
      // Maturity Value A = P * (1 + r/12)^(12 * t)
      const rungTermYears = rung.termMonths / 12;
      const rungMaturityVal = rungPrincipal * Math.pow(1 + r_dec / 12, 12 * rungTermYears);
      const interestEarned = rungMaturityVal - rungPrincipal;

      const maturityDate = new Date();
      maturityDate.setMonth(now.getMonth() + rung.termMonths);

      totalLadderInterest += interestEarned;
      totalMaturityValue += rungMaturityVal;
      weightedApySum += rung.apy * (rung.weight / 100);

      rungsBreakdown.push({
        id: rung.id,
        termMonths: rung.termMonths,
        apy: rung.apy,
        weight: rung.weight,
        principal: rungPrincipal,
        interest: interestEarned,
        maturityVal: rungMaturityVal,
        maturityDateStr: maturityDate.toLocaleDateString(locale || "en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      });
    });

    return {
      rungsBreakdown,
      totalLadderInterest,
      totalMaturityValue,
      averageBlendedApy: weightedApySum,
    };
  }, [ladderTotalSum, ladderRungs, locale]);

  // --- CALCULATION ENGINE: COMPARISON ---
  const comparisonResults = useMemo(() => {
    // Projections for CD A
    const rA = compareCompA * (Math.pow(1 + compareApyA / 100, 1 / compareCompA) - 1);
    const maturityValueA = compareInitialA * Math.pow(1 + rA / compareCompA, compareCompA * (compareTermA / 12));
    const interestA = maturityValueA - compareInitialA;

    // Projections for CD B
    const rB = compareCompB * (Math.pow(1 + compareApyB / 100, 1 / compareCompB) - 1);
    const maturityValueB = compareInitialB * Math.pow(1 + rB / compareCompB, compareCompB * (compareTermB / 12));
    const interestB = maturityValueB - compareInitialB;

    // Generate comparison charts over the max term length
    const maxMonths = Math.max(compareTermA, compareTermB);
    const comparisonTimeline = [];

    let balA = compareInitialA;
    let balB = compareInitialB;

    comparisonTimeline.push({
      month: 0,
      year: 0,
      ScenarioA: Math.round(compareInitialA),
      ScenarioB: Math.round(compareInitialB),
    });

    for (let m = 1; m <= maxMonths; m++) {
      if (m <= compareTermA) {
        balA = compareInitialA * Math.pow(1 + rA / compareCompA, compareCompA * (m / 12));
      }
      if (m <= compareTermB) {
        balB = compareInitialB * Math.pow(1 + rB / compareCompB, compareCompB * (m / 12));
      }
      comparisonTimeline.push({
        month: m,
        year: parseFloat((m / 12).toFixed(2)),
        ScenarioA: m <= compareTermA ? Math.round(balA) : null,
        ScenarioB: m <= compareTermB ? Math.round(balB) : null,
      });
    }

    return {
      maturityValueA,
      interestA,
      maturityValueB,
      interestB,
      comparisonTimeline,
    };
  }, [
    compareInitialA,
    compareApyA,
    compareTermA,
    compareCompA,
    compareInitialB,
    compareApyB,
    compareTermB,
    compareCompB,
  ]);

  // --- EXPORTS IN ALL FORMATS ---
  const exportTXT = () => {
    let txt = `nexus calculator - certificate of deposit (cd) report\n`;
    txt += `======================================================\n`;
    txt += `Date: ${new Date().toLocaleDateString()}\n`;
    txt += `Currency Symbol: ${currencySymbol}\n\n`;

    if (activeTab === "growth") {
      txt += `1. CD GROWTH SAVINGS ANALYSIS\n`;
      txt += `------------------------------------------------------\n`;
      txt += `Initial Deposit Amount   : ${formatCurrency(initialDeposit)}\n`;
      txt += `Stated APY Rate          : ${apy.toFixed(2)}%\n`;
      txt += `Nominal Interest Rate    : ${results.apr.toFixed(4)}% (Stated APR)\n`;
      txt += `Compounding Frequency    : ${compoundFrequency} times/year\n`;
      txt += `CD Term Length           : ${termMonths} Months (${(termMonths / 12).toFixed(1)} Years)\n`;
      if (recurringFrequency !== "none") {
        txt += `Add-On Contribution     : ${formatCurrency(recurringAmount)} (${recurringFrequency})\n`;
      }
      txt += `Expected Inflation Rate  : ${inflationRate}%\n\n`;
      txt += `PROJECTION RESULTS:\n`;
      txt += `Total Principal Saved    : ${formatCurrency(results.totalDeposited)}\n`;
      txt += `Interest Earnings        : ${formatCurrency(results.totalInterestEarned)}\n`;
      txt += `Final Maturity Value     : ${formatCurrency(results.maturityValue)}\n`;
      txt += `Inflation-Adjusted Value : ${formatCurrency(results.realMaturityValue)}\n`;
      txt += `Inflation Purchasing Loss: ${formatCurrency(results.purchasingPowerLoss)}\n\n`;
      txt += `GROWTH TIMELINE:\n`;
      txt += `Month | Cumulative Deposits | Interest Earnings | CD Balance\n`;
      results.chartData.forEach((d) => {
        txt += `Month ${d.month} | ${formatCurrency(d.principal)} | ${formatCurrency(d.interest)} | ${formatCurrency(d.balance)}\n`;
      });
    } else if (activeTab === "penalty") {
      txt += `2. EARLY WITHDRAWAL PENALTY EVALUATION\n`;
      txt += `------------------------------------------------------\n`;
      txt += `CD Initial Principal     : ${formatCurrency(initialDeposit)}\n`;
      txt += `Stated APY               : ${apy}%\n`;
      txt += `CD Duration              : ${termMonths} Months\n`;
      txt += `Withdrawal Made After    : ${withdrawalMonth} Months\n`;
      txt += `Penalty Configuration    : ${
        penaltyType === "months_interest"
          ? `${penaltyMonthsRule} Months of Interest`
          : penaltyType === "percent_principal"
          ? `${penaltyPercentRule}% of Principal`
          : `${formatCurrency(penaltyFlatRule)} Flat Fee`
      }\n\n`;
      txt += `PENALTY ASSESSMENT:\n`;
      txt += `Accrued Interest Balance : ${formatCurrency(penaltyResults.grossInterestEarned)}\n`;
      txt += `Early Penalty Deduction  : ${formatCurrency(penaltyResults.penalty)}\n`;
      txt += `Net Interest Profits     : ${formatCurrency(penaltyResults.netInterestEarned)}\n`;
      txt += `Total Cash Payout        : ${formatCurrency(penaltyResults.payoffAmount)}\n`;
      if (penaltyResults.principalReduced) {
        txt += `*** WARNING: Penalty exceeds accrued interest. Principal eaten: ${formatCurrency(
          penaltyResults.principalEaten
        )} ***\n`;
      }
    } else if (activeTab === "ladder") {
      txt += `3. CD LADDER STRATEGY PLAN\n`;
      txt += `------------------------------------------------------\n`;
      txt += `Total Ladder Investment  : ${formatCurrency(ladderTotalSum)}\n`;
      txt += `Total Ladder Rungs       : ${ladderRungsCount}\n`;
      txt += `Blended Weighted APY     : ${ladderResults.averageBlendedApy.toFixed(2)}%\n`;
      txt += `Est. Total Interest      : ${formatCurrency(ladderResults.totalLadderInterest)}\n`;
      txt += `Final Portfolio Value    : ${formatCurrency(ladderResults.totalMaturityValue)}\n\n`;
      txt += `RUNGS DETAILED CALENDAR:\n`;
      txt += `Rung | Term | APY | Weight (%) | Deposit | Interest Earned | Maturity Value\n`;
      ladderResults.rungsBreakdown.forEach((r) => {
        txt += `CD #${r.id} | ${r.termMonths}m | ${r.apy}% | ${r.weight}% | ${formatCurrency(
          r.principal
        )} | ${formatCurrency(r.interest)} | ${formatCurrency(r.maturityVal)}\n`;
      });
    }

    const blob = new Blob([txt], { type: "text/plain;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `cd-calculator-report-${activeTab}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("TXT report downloaded successfully!");
  };

  const exportCSV = () => {
    let csv = "";
    if (activeTab === "growth") {
      csv += "Month,Cumulative Deposits,Interest Accumulated,CD Balance,Inflation Adjusted Balance\n";
      results.chartData.forEach((d) => {
        csv += `${d.month},${d.principal},${d.interest},${d.balance},${d.realBalance}\n`;
      });
    } else if (activeTab === "ladder") {
      csv += "Rung,Term Months,APY,Weight Percent,Deposit Amount,Interest Earnings,Maturity Value\n";
      ladderResults.rungsBreakdown.forEach((r) => {
        csv += `${r.id},${r.termMonths},${r.apy},${r.weight},${r.principal.toFixed(2)},${r.interest.toFixed(
          2
        )},${r.maturityVal.toFixed(2)}\n`;
      });
    } else if (activeTab === "penalty") {
      csv += "Metric,Value\n";
      csv += `Accrued Interest,${penaltyResults.grossInterestEarned.toFixed(2)}\n`;
      csv += `Penalty Deduct,${penaltyResults.penalty.toFixed(2)}\n`;
      csv += `Net Earnings,${penaltyResults.netInterestEarned.toFixed(2)}\n`;
      csv += `Total Payoff,${penaltyResults.payoffAmount.toFixed(2)}\n`;
      csv += `Principal Reduced,${penaltyResults.principalReduced ? "YES" : "NO"}\n`;
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `cd-projection-data-${activeTab}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("CSV spreadsheet downloaded!");
  };

  const exportJSON = () => {
    const payload = {
      calculator: "Certificate of Deposit (CD) Calculator Pro",
      locale: locale || "en",
      timestamp: Date.now(),
      activeTab,
      inputs: {
        initialDeposit,
        apy,
        termMonths,
        compoundFrequency,
        recurringAmount,
        recurringFrequency,
        inflationRate,
        penalty: {
          withdrawalMonth,
          penaltyType,
          penaltyMonthsRule,
          penaltyPercentRule,
          penaltyFlatRule,
        },
        ladder: {
          ladderTotalSum,
          ladderRungs,
        },
      },
      outputs: {
        growth: {
          apr: results.apr,
          maturityValue: results.maturityValue,
          totalInterestEarned: results.totalInterestEarned,
          totalDeposited: results.totalDeposited,
          realMaturityValue: results.realMaturityValue,
          purchasingPowerLoss: results.purchasingPowerLoss,
        },
        penaltyEvaluation: {
          grossInterestEarned: penaltyResults.grossInterestEarned,
          penalty: penaltyResults.penalty,
          netInterestEarned: penaltyResults.netInterestEarned,
          payoffAmount: penaltyResults.payoffAmount,
          principalReduced: penaltyResults.principalReduced,
          principalEaten: penaltyResults.principalEaten,
        },
        ladderResults: {
          totalLadderInterest: ladderResults.totalLadderInterest,
          totalMaturityValue: ladderResults.totalMaturityValue,
          averageBlendedApy: ladderResults.averageBlendedApy,
        },
      },
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `cd-calculator-state-${activeTab}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast("JSON state payload exported!");
  };

  const handleCopySummary = () => {
    let summaryText = "";
    if (activeTab === "growth") {
      summaryText =
        `CD Growth Savings Projection Summary:\n` +
        `- Deposit Amount: ${formatCurrency(initialDeposit)}\n` +
        `- Stated Rate (APY): ${apy}%\n` +
        `- Compounding: ${compoundFrequency} times/year\n` +
        `- Duration term: ${termMonths} Months\n` +
        `- Maturity Value: ${formatCurrency(results.maturityValue)}\n` +
        `- Total Interest Earned: ${formatCurrency(results.totalInterestEarned)}\n` +
        `- Inflation-Adjusted (at ${inflationRate}%): ${formatCurrency(results.realMaturityValue)}`;
    } else if (activeTab === "penalty") {
      summaryText =
        `CD Early Withdrawal Penalty Evaluation:\n` +
        `- Initial Balance: ${formatCurrency(initialDeposit)}\n` +
        `- APY Rate: ${apy}%\n` +
        `- Early Withdrawal Month: ${withdrawalMonth}\n` +
        `- Penalty Fee: ${formatCurrency(penaltyResults.penalty)}\n` +
        `- Total Payout Cash: ${formatCurrency(penaltyResults.payoffAmount)}\n` +
        (penaltyResults.principalReduced
          ? `!!! WARNING: Penalty ate into principal by ${formatCurrency(penaltyResults.principalEaten)} !!!`
          : `Net Interest Earned: ${formatCurrency(penaltyResults.netInterestEarned)}`);
    } else if (activeTab === "ladder") {
      summaryText =
        `CD Laddering Portfolio Planner:\n` +
        `- Total Investment: ${formatCurrency(ladderTotalSum)}\n` +
        `- Staggered Rungs Count: ${ladderRungsCount}\n` +
        `- Blended Average Yield: ${ladderResults.averageBlendedApy.toFixed(2)}% APY\n` +
        `- Total Ladder Returns: ${formatCurrency(ladderResults.totalLadderInterest)}\n` +
        `- Final Maturity Value: ${formatCurrency(ladderResults.totalMaturityValue)}`;
    }

    navigator.clipboard.writeText(summaryText).then(() => {
      setCopiedText(true);
      triggerToast("Scenario summary copied to clipboard!");
      setTimeout(() => setCopiedText(false), 2000);
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce border border-slate-700">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Primary Sub-Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 flex-wrap gap-1 p-1 bg-slate-100/60 dark:bg-slate-900/50 rounded-2xl">
        <button
          onClick={() => setActiveTab("growth")}
          className={`flex-1 min-w-[125px] py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === "growth"
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/50 dark:border-slate-700"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          CD Growth
        </button>
        <button
          onClick={() => setActiveTab("penalty")}
          className={`flex-1 min-w-[125px] py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === "penalty"
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/50 dark:border-slate-700"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          Penalty Calculator
        </button>
        <button
          onClick={() => setActiveTab("ladder")}
          className={`flex-1 min-w-[125px] py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === "ladder"
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/50 dark:border-slate-700"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <Target className="w-4 h-4" />
          CD Laddering
        </button>
        <button
          onClick={() => setActiveTab("comparison")}
          className={`flex-1 min-w-[125px] py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === "comparison"
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/50 dark:border-slate-700"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <RefreshCw className="w-4 h-4" />
          Compare CD terms
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex-1 min-w-[125px] py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeTab === "history"
              ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/50 dark:border-slate-700"
              : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
          }`}
        >
          <History className="w-4 h-4" />
          History
        </button>
      </div>

      {/* Main Operating Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: PARAMETER INPUT CONTROLS */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-slate-100/50 dark:shadow-none space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-blue-500" />
              Configure Inputs
            </h2>
            {/* Global Currency Selector */}
            <div className="flex gap-2 items-center">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg p-1.5 focus:outline-none"
              >
                {currencies.map((curr) => (
                  <option key={curr.label} value={curr.symbol}>
                    {curr.label}
                  </option>
                ))}
              </select>
              {selectedCurrency === "" && (
                <input
                  type="text"
                  placeholder="¤"
                  value={customCurrency}
                  onChange={(e) => setCustomCurrency(e.target.value)}
                  className="w-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 text-center text-xs font-bold text-slate-700 dark:text-slate-300"
                />
              )}
            </div>
          </div>

          {/* TAB-SPECIFIC FORM CONTROLS */}
          {activeTab === "growth" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                  Initial Deposit amount
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-medium">{currencySymbol}</span>
                  </div>
                  <input
                    type="number"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(Math.max(1, Number(e.target.value)))}
                    className="w-full ps-10 pe-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
                  <span>Interest Rate (APY %)</span>
                  <span className="text-xs text-blue-500 font-bold">Stated APY rate</span>
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <input
                    type="number"
                    step="0.01"
                    value={apy}
                    onChange={(e) => setApy(Math.max(0.01, Number(e.target.value)))}
                    className="w-full ps-4 pe-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-semibold"
                  />
                  <div className="absolute inset-y-0 end-0 pe-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-medium">%</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
                  <span>CD Term Length</span>
                  <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => {
                        setTermInputType("months");
                        setCustomTermVal(termMonths);
                      }}
                      className={`px-2 py-0.5 rounded-md ${
                        termInputType === "months"
                          ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "text-slate-400"
                      }`}
                    >
                      Months
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTermInputType("years");
                        setCustomTermVal(parseFloat((termMonths / 12).toFixed(2)));
                      }}
                      className={`px-2 py-0.5 rounded-md ${
                        termInputType === "years"
                          ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm"
                          : "text-slate-400"
                      }`}
                    >
                      Years
                    </button>
                  </div>
                </label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[3, 6, 12, 24, 36, 60].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => {
                        setCustomTermVal(m);
                        setTermInputType("months");
                        setTermMonths(m);
                      }}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        termMonths === m && termInputType === "months"
                          ? "bg-blue-50 dark:bg-blue-950/30 border-blue-500 text-blue-600 dark:text-blue-400"
                          : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80"
                      }`}
                    >
                      {m >= 12 ? `${m / 12} Yr (${m}m)` : `${m} Months`}
                    </button>
                  ))}
                </div>
                <div className="relative rounded-xl shadow-sm">
                  <input
                    type="number"
                    value={customTermVal}
                    onChange={(e) => setCustomTermVal(Math.max(1, Number(e.target.value)))}
                    className="w-full ps-4 pe-20 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-semibold"
                  />
                  <div className="absolute inset-y-0 end-0 pe-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-medium text-sm capitalize">
                      {termInputType}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
                  <span>Compounding Frequency</span>
                  <span title="How interest gets computed and added to principal">
                    <HelpCircle className="w-4 h-4 text-slate-400 cursor-pointer" />
                  </span>
                </label>
                <select
                  value={compoundFrequency}
                  onChange={(e) => setCompoundFrequency(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all font-semibold"
                >
                  <option value={365}>Daily (365/year)</option>
                  <option value={12}>Monthly (12/year)</option>
                  <option value={4}>Quarterly (4/year)</option>
                  <option value={2}>Semi-Annually (2/year)</option>
                  <option value={1}>Annually (1/year)</option>
                </select>
              </div>

              {/* Advanced Options Toggle */}
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 transition-all flex items-center justify-center gap-1"
              >
                <span>{showAdvanced ? "Hide" : "Show"} Advanced Savings Options</span>
              </button>

              {showAdvanced && (
                <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div>
                    <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
                      <span>Add-on Recurring Deposits</span>
                      <span className="text-xs text-slate-400">If CD supports periodic contributions</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <input
                        type="number"
                        placeholder="Amount"
                        value={recurringAmount}
                        onChange={(e) => setRecurringAmount(Math.max(0, Number(e.target.value)))}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold"
                      />
                      <select
                        value={recurringFrequency}
                        onChange={(e) => setRecurringFrequency(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold"
                      >
                        <option value="none">No recurring</option>
                        <option value="monthly">Monthly</option>
                        <option value="quarterly">Quarterly</option>
                        <option value="annually">Annually</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                      Inflation Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(Math.max(0, Number(e.target.value)))}
                      className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "penalty" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                  Initial Deposit Amount
                </label>
                <input
                  type="number"
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                  Stated APY Rate (%)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={apy}
                  onChange={(e) => setApy(Math.max(0.01, Number(e.target.value)))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
                  <span>Withdrawal Month</span>
                  <span className="text-xs text-blue-500 font-bold">Month {withdrawalMonth} of {termMonths}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max={termMonths - 1}
                  value={withdrawalMonth}
                  onChange={(e) => setWithdrawalMonth(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold px-1 mt-1">
                  <span>Month 1</span>
                  <span>Withdraw early</span>
                  <span>Month {termMonths - 1}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                  Penalty Calculation Type
                </label>
                <select
                  value={penaltyType}
                  onChange={(e) => setPenaltyType(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
                >
                  <option value="months_interest">Months of simple interest</option>
                  <option value="percent_principal">Percentage of initial principal</option>
                  <option value="flat_fee">Flat early withdrawal fee</option>
                </select>
              </div>

              {penaltyType === "months_interest" && (
                <div>
                  <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2 flex items-center justify-between">
                    <span>Penalty Period</span>
                    <span className="text-xs text-slate-400">Interest deducted</span>
                  </label>
                  <select
                    value={penaltyMonthsRule}
                    onChange={(e) => setPenaltyMonthsRule(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
                  >
                    <option value={1}>1 Month (Simple interest)</option>
                    <option value={3}>3 Months (Common short CD)</option>
                    <option value={6}>6 Months (Common 1-3 Yr CD)</option>
                    <option value={12}>12 Months (Common long CD)</option>
                  </select>
                </div>
              )}

              {penaltyType === "percent_principal" && (
                <div>
                  <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                    Penalty Percentage (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={penaltyPercentRule}
                    onChange={(e) => setPenaltyPercentRule(Math.max(0.1, Number(e.target.value)))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
                  />
                </div>
              )}

              {penaltyType === "flat_fee" && (
                <div>
                  <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                    Penalty Flat Fee
                  </label>
                  <input
                    type="number"
                    value={penaltyFlatRule}
                    onChange={(e) => setPenaltyFlatRule(Math.max(0, Number(e.target.value)))}
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === "ladder" && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                  Total Investment Capital
                </label>
                <input
                  type="number"
                  value={ladderTotalSum}
                  onChange={(e) => setLadderTotalSum(Math.max(1, Number(e.target.value)))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-500 dark:text-slate-400 mb-2">
                  Number of Ladder Rungs (CDs)
                </label>
                <select
                  value={ladderRungsCount}
                  onChange={(e) => setLadderRungsCount(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-semibold"
                >
                  <option value={3}>3 Rungs (1, 2, 3 Yr)</option>
                  <option value={4}>4 Rungs (1, 2, 3, 4 Yr)</option>
                  <option value={5}>5 Rungs (1 to 5 Yr)</option>
                  <option value={6}>6 Rungs (1 to 6 Yr)</option>
                </select>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-800 pt-4 space-y-4">
                <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">CD Rungs Customization</h3>
                <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                  {ladderRungs.map((rung, idx) => (
                    <div key={rung.id} className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-xl space-y-2 border border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-500">
                        <span>Rung #{rung.id} CD</span>
                        <span>Split: {rung.weight.toFixed(1)}% ({formatCurrency((ladderTotalSum * rung.weight) / 100)})</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400">Term (months)</label>
                          <input
                            type="number"
                            value={rung.termMonths}
                            onChange={(e) => updateLadderRung(idx, "termMonths", Math.max(1, Number(e.target.value)))}
                            className="w-full px-2 py-1 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold text-slate-400">APY (%)</label>
                          <input
                            type="number"
                            step="0.01"
                            value={rung.apy}
                            onChange={(e) => updateLadderRung(idx, "apy", Math.max(0.01, Number(e.target.value)))}
                            className="w-full px-2 py-1 text-xs font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "comparison" && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-blue-800 dark:text-blue-400 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> Scenario A
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase">Deposit</label>
                    <input
                      type="number"
                      value={compareInitialA}
                      onChange={(e) => setCompareInitialA(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase">APY (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={compareApyA}
                        onChange={(e) => setCompareApyA(Math.max(0.01, Number(e.target.value)))}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase">Term (Months)</label>
                      <input
                        type="number"
                        value={compareTermA}
                        onChange={(e) => setCompareTermA(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900 rounded-2xl space-y-4">
                <h3 className="text-sm font-bold text-indigo-800 dark:text-indigo-400 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> Scenario B
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 uppercase">Deposit</label>
                    <input
                      type="number"
                      value={compareInitialB}
                      onChange={(e) => setCompareInitialB(Math.max(1, Number(e.target.value)))}
                      className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase">APY (%)</label>
                      <input
                        type="number"
                        step="0.01"
                        value={compareApyB}
                        onChange={(e) => setCompareApyB(Math.max(0.01, Number(e.target.value)))}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-400 uppercase">Term (Months)</label>
                      <input
                        type="number"
                        value={compareTermB}
                        onChange={(e) => setCompareTermB(Math.max(1, Number(e.target.value)))}
                        className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-5">
              <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">Save Active Projection</h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter scenario name..."
                  value={scenarioNameInput}
                  onChange={(e) => setScenarioNameInput(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                />
                <button
                  onClick={handleSaveScenario}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-500/10"
                >
                  Save Scenario Scenario
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: VISUAL DASHBOARD & ANALYTICAL OUTPUTS */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. GROWTH TAB OUTPUT */}
          {activeTab === "growth" && (
            <div className="space-y-6">
              {/* PRIMARY STATS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                    Maturity Value
                  </span>
                  <div className="text-xl md:text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                    {formatCurrency(results.maturityValue)}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                    Interest Earned
                  </span>
                  <div className="text-xl md:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(results.totalInterestEarned)}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                    Stated APR Yield
                  </span>
                  <div className="text-xl md:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {results.apr.toFixed(3)}%
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                    Real Value
                  </span>
                  <div className="text-xl md:text-2xl font-extrabold text-amber-600 dark:text-amber-400" title="Adjusted for inflation">
                    {formatCurrency(results.realMaturityValue)}
                  </div>
                </div>
              </div>

              {/* SAVINGS GROWTH CHART */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    CD Growth Projection
                  </h3>
                  <div className="flex gap-3 text-xs font-bold">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="w-3 h-3 bg-blue-500 rounded-full block" />
                      Deposits
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="w-3 h-3 bg-emerald-500 rounded-full block" />
                      Interest
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <span className="w-3 h-3 bg-amber-500 rounded-full block" />
                      Inflation-adjusted
                    </div>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} label={{ value: "Months", position: "insideBottom", offset: -5 }} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${currencySymbol}${v}`} />
                      <ChartTooltip
                        formatter={(value: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, ""]}
                        contentStyle={{ background: "#0f172a", borderRadius: "12px", border: "none", color: "#fff" }}
                      />
                      <Area type="monotone" dataKey="principal" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorPrincipal)" stackId="1" />
                      <Area type="monotone" dataKey="interest" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorInterest)" stackId="1" />
                      <Line type="monotone" dataKey="realBalance" stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* TIMELINE DETAILED BREAKDOWN */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Annual Projections Timeline</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold">
                        <th className="pb-3">Year / Month</th>
                        <th className="pb-3">Cumulative Deposits</th>
                        <th className="pb-3">Interest Earnings</th>
                        <th className="pb-3 text-right">CD Balance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                      {results.chartData
                        .filter((_, i) => i === 0 || i % 6 === 0 || i === results.chartData.length - 1)
                        .map((d) => (
                          <tr key={d.month} className="text-slate-600 dark:text-slate-300">
                            <td className="py-3">
                              {d.month === 0 ? "Start" : d.month % 12 === 0 ? `${d.month / 12} Yr (${d.month}m)` : `${d.month} Months`}
                            </td>
                            <td className="py-3">{formatCurrency(d.principal)}</td>
                            <td className="py-3 text-emerald-600 dark:text-emerald-400">+{formatCurrency(d.interest)}</td>
                            <td className="py-3 text-right font-bold text-slate-950 dark:text-slate-100">
                              {formatCurrency(d.balance)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. PENALTY TAB OUTPUT */}
          {activeTab === "penalty" && (
            <div className="space-y-6">
              {/* PENALTY STATS SUMMARY */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                    Accrued Interest
                  </span>
                  <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                    {formatCurrency(penaltyResults.grossInterestEarned)}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                    Penalty Penalty
                  </span>
                  <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
                    -{formatCurrency(penaltyResults.penalty)}
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm">
                  <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                    Net Payout Value
                  </span>
                  <div className={`text-2xl font-extrabold ${penaltyResults.principalReduced ? "text-amber-500" : "text-emerald-600 dark:text-emerald-400"}`}>
                    {formatCurrency(penaltyResults.payoffAmount)}
                  </div>
                </div>
              </div>

              {/* WARNING BOX */}
              {penaltyResults.principalReduced && (
                <div className="p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 rounded-2xl flex gap-3 text-rose-800 dark:text-rose-400">
                  <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Principal Reduction Warning!</h4>
                    <p className="text-xs mt-1 leading-relaxed">
                      Your early withdrawal penalty is larger than the interest you earned during these {withdrawalMonth} months.
                      To fulfill the penalty, the bank will deduct{" "}
                      <span className="font-extrabold">{formatCurrency(penaltyResults.principalEaten)}</span> from your initial
                      principal deposit of {formatCurrency(initialDeposit)}.
                    </p>
                  </div>
                </div>
              )}

              {/* PENALTY BREAKDOWN BAR GRAPH */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Earnings Impact Analysis</h3>
                <div className="space-y-4">
                  {/* Gross Interest Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-500">Gross interest accrued</span>
                      <span className="text-blue-500">{formatCurrency(penaltyResults.grossInterestEarned)}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>

                  {/* Penalty Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-500">Penalty Deduction</span>
                      <span className="text-rose-500">-{formatCurrency(penaltyResults.penalty)}</span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="bg-rose-500 h-full rounded-full"
                        style={{
                          width: `${Math.min(
                            100,
                            (penaltyResults.penalty / Math.max(1, penaltyResults.grossInterestEarned)) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Net Earnings Bar */}
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-500">Net interest earnings</span>
                      <span className={penaltyResults.principalReduced ? "text-rose-500" : "text-emerald-500"}>
                        {formatCurrency(penaltyResults.netInterestEarned)}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          penaltyResults.principalReduced ? "bg-rose-400" : "bg-emerald-500"
                        }`}
                        style={{
                          width: `${Math.max(
                            0,
                            100 - (penaltyResults.penalty / Math.max(1, penaltyResults.grossInterestEarned)) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. LADDER TAB OUTPUT */}
          {activeTab === "ladder" && (
            <div className="space-y-6">
              {/* PORTFOLIO STATS */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Blended Yield
                  </span>
                  <div className="text-xl md:text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                    {ladderResults.averageBlendedApy.toFixed(2)}% APY
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Total Returns
                  </span>
                  <div className="text-xl md:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(ladderResults.totalLadderInterest)}
                  </div>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 shadow-sm text-center">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Portfolio Value
                  </span>
                  <div className="text-xl md:text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {formatCurrency(ladderResults.totalMaturityValue)}
                  </div>
                </div>
              </div>

              {/* LADDER MATURITIES TIMELINE GRAPH */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Maturity Timeline Calendar</h3>
                <div className="relative border-l border-slate-200 dark:border-slate-700 ml-4 pl-6 space-y-6 py-2">
                  {ladderResults.rungsBreakdown.map((r) => (
                    <div key={r.id} className="relative">
                      <span className="absolute -left-10 top-0.5 bg-blue-500 text-white text-[10px] w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        #{r.id}
                      </span>
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center gap-4 flex-wrap">
                        <div>
                          <div className="text-sm font-bold text-slate-800 dark:text-white">
                            {r.termMonths} Months CD Maturity
                          </div>
                          <div className="text-xs text-slate-400 font-medium">Matures on: {r.maturityDateStr}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-extrabold text-blue-600 dark:text-blue-400">
                            {formatCurrency(r.maturityVal)}
                          </div>
                          <div className="text-[10px] text-emerald-500 font-bold">+{formatCurrency(r.interest)} Interest</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. COMPARISON TAB OUTPUT */}
          {activeTab === "comparison" && (
            <div className="space-y-6">
              {/* SIDE-BY-SIDE STATS */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50/50 dark:bg-blue-950/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-900/40">
                  <span className="text-xs uppercase text-blue-600 font-bold block mb-1">Scenario A</span>
                  <div className="text-2xl font-extrabold text-blue-800 dark:text-blue-400">
                    {formatCurrency(comparisonResults.maturityValueA)}
                  </div>
                  <span className="text-xs text-slate-400 font-medium block mt-1">
                    Interest: +{formatCurrency(comparisonResults.interestA)}
                  </span>
                </div>

                <div className="bg-indigo-50/50 dark:bg-indigo-950/10 p-5 rounded-2xl border border-indigo-100 dark:border-indigo-900/40">
                  <span className="text-xs uppercase text-indigo-600 font-bold block mb-1">Scenario B</span>
                  <div className="text-2xl font-extrabold text-indigo-800 dark:text-indigo-400">
                    {formatCurrency(comparisonResults.maturityValueB)}
                  </div>
                  <span className="text-xs text-slate-400 font-medium block mt-1">
                    Interest: +{formatCurrency(comparisonResults.interestB)}
                  </span>
                </div>
              </div>

              {/* TIMELINE COMPARISON GRAPH */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 text-blue-500" />
                  Maturity Growth Side-by-Side
                </h3>
                <div className="h-[280px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={comparisonResults.comparisonTimeline}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:stroke-slate-800" />
                      <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${currencySymbol}${v}`} />
                      <ChartTooltip
                        formatter={(value: any) => [`${currencySymbol}${Number(value).toLocaleString()}`, ""]}
                        contentStyle={{ background: "#0f172a", borderRadius: "12px", border: "none", color: "#fff" }}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="ScenarioA" name="Scenario A" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                      <Line type="monotone" dataKey="ScenarioB" name="Scenario B" stroke="#6366f1" strokeWidth={2.5} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* 5. HISTORY TAB OUTPUT */}
          {activeTab === "history" && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <History className="w-5 h-5 text-blue-500" />
                Browser Saved Projections
              </h3>

              {savedScenarios.length === 0 ? (
                <div className="text-center py-10 text-slate-400 font-medium space-y-2">
                  <History className="w-10 h-10 mx-auto opacity-30 text-slate-400" />
                  <p>You haven&apos;t saved any scenarios yet.</p>
                  <p className="text-xs">Configure your parameters and click Save on this tab to log scenarios.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {savedScenarios.map((scen) => (
                    <div
                      key={scen.id}
                      className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex justify-between items-center gap-4 hover:border-blue-300 dark:hover:border-blue-800 transition-all"
                    >
                      <div>
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm">{scen.name}</h4>
                        <div className="text-xs text-slate-400 font-medium space-x-2 mt-1">
                          <span>
                            Deposit: {scen.currency}
                            {scen.initialDeposit}
                          </span>
                          <span>•</span>
                          <span>Rate: {scen.apy}% APY</span>
                          <span>•</span>
                          <span>Term: {scen.termMonths}m</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleRestoreScenario(scen)}
                          className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg hover:bg-blue-100 transition-all"
                        >
                          Restore
                        </button>
                        <button
                          onClick={() => handleDeleteScenario(scen.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* COPY & EXPORT OPTIONS PANEL */}
          {activeTab !== "history" && (
            <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 shadow-xl flex items-center justify-between gap-6 flex-wrap">
              <div className="space-y-1">
                <h4 className="font-bold text-sm">Download Savings Reports</h4>
                <p className="text-xs text-slate-400 leading-relaxed max-w-[280px]">
                  Export your calculated projections in any of the standard data formats for sheets.
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={handleCopySummary}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedText ? "Copied!" : "Copy Summary"}
                </button>
                <button
                  onClick={exportTXT}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  title="TXT report"
                >
                  <FileText className="w-3.5 h-3.5" />
                  TXT
                </button>
                <button
                  onClick={exportCSV}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  title="Spreadsheet CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  CSV
                </button>
                <button
                  onClick={exportJSON}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  title="Export JSON payload"
                >
                  <Settings className="w-3.5 h-3.5" />
                  JSON
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* EDUCATIONAL DETAILS SECTION & FORMULA MATH DISPLAY */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-500" />
          Step-by-Step Educational Explanations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 leading-relaxed text-sm text-slate-600 dark:text-slate-300">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              1. Compounding Interest Formula
            </h4>
            <p>
              To project how a single deposit grows under compound interest, standard bank rules utilize the Future Value compounding equation:
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl font-mono text-center font-bold text-slate-800 dark:text-slate-200 my-2">
              A = P × (1 + r / n)^(n × t)
            </div>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong className="text-blue-500">P (Principal):</strong> Your initial CD funding.</li>
              <li><strong className="text-blue-500">r (Nominal APR):</strong> Annual Percentage Rate (APR).</li>
              <li><strong className="text-blue-500">n (Compound frequency):</strong> compounding periods per year (e.g. Daily = 365, Monthly = 12).</li>
              <li><strong className="text-blue-500">t (Duration in years):</strong> The total CD term length in fractional years.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-indigo-500" />
              2. Stated APY vs APR Conversion
            </h4>
            <p>
              Banks advertise the **Annual Percentage Yield (APY)** because it reflects compound gains. However, interest calculation compounds using the lower **Annual Percentage Rate (APR)**. The relation is expressed as:
            </p>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl font-mono text-center font-bold text-slate-800 dark:text-slate-200 my-2">
              APR = n × [ (1 + APY)^(1/n) - 1 ]
            </div>
            <p>
              If compounding is daily ($n = 365$) on a stated $4.85\%$ APY, our calculator computes the internal APR as $4.737\%$. This nominal APR is then divided by 365 to calculate the daily interest increment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
