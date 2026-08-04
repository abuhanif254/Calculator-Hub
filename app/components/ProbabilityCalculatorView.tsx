"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Calculator, LayoutGrid, Coins, GraduationCap, BarChart } from "lucide-react";
import { BasicProbabilityMode } from "./probability/BasicProbabilityMode";
import { BayesMode } from "./probability/BayesMode";
import { ExpectedValueMode } from "./probability/ExpectedValueMode";
import { CoinDiceSimulator } from "./probability/CoinDiceSimulator";
import { ProbabilityLearningSuite } from "./probability/ProbabilityLearningSuite";
// Dynamic imports for heavy components will be added here in later phases

interface ProbabilityCalculatorViewProps {
  calcDef: CalculatorDef;
}

type TabMode = "basic" | "bayes" | "expectedValue" | "simulators" | "learning";

export function ProbabilityCalculatorView({ calcDef }: ProbabilityCalculatorViewProps) {
  const t = useTranslations("ProbabilityCalculator");
  const [activeTab, setActiveTab] = useState<TabMode>("basic");

  const tabs = [
    { id: "basic", label: t("basicMode", { fallback: "Basic Probability" }), icon: Calculator },
    { id: "bayes", label: t("conditionalMode", { fallback: "Conditional & Bayes" }), icon: LayoutGrid },
    { id: "expectedValue", label: t("expectedValueMode", { fallback: "Expected Value & Odds" }), icon: BarChart },
    { id: "simulators", label: t("simulatorsMode", { fallback: "Simulators" }), icon: Coins },
    { id: "learning", label: t("learningMode", { fallback: "Learning Hub" }), icon: GraduationCap },
  ] as const;

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200 print:hidden">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{t("title", { fallback: calcDef.title })}</h2>
        <p className="text-slate-600">{t("desc", { fallback: calcDef.description })}</p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 bg-white print:hidden">
        <div className="flex overflow-x-auto hide-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabMode)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-colors border-b-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-700 bg-blue-50/50"
                  : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="p-6 md:p-8 min-h-[400px]">
        {activeTab === "basic" && <BasicProbabilityMode />}
        {activeTab === "bayes" && <BayesMode />}
        {activeTab === "expectedValue" && <ExpectedValueMode />}
        {activeTab === "simulators" && <CoinDiceSimulator />}
        {activeTab === "learning" && <ProbabilityLearningSuite />}
      </div>
    </div>
  );
}
