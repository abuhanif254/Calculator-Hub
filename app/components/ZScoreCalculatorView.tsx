"use client";

import React, { useState } from "react";
import { CalculatorDef } from "@/lib/types";
import { useTranslations } from "next-intl";
import { Calculator, Table, Activity, GraduationCap } from "lucide-react";
import { ZScoreBasicMode } from "./z-score/ZScoreBasicMode";
import { ZScoreDatasetMode } from "./z-score/ZScoreDatasetMode";
import { ZScoreExplorerMode } from "./z-score/ZScoreExplorerMode";
import { ZScoreLearningSuite } from "./z-score/ZScoreLearningSuite";

interface ZScoreCalculatorViewProps {
  calcDef: CalculatorDef;
}

type TabMode = "calculator" | "dataset" | "explorer" | "learning";

export function ZScoreCalculatorView({ calcDef }: ZScoreCalculatorViewProps) {
  const t = useTranslations("ZScoreCalculator");
  const [activeTab, setActiveTab] = useState<TabMode>("calculator");

  const tabs = [
    { id: "calculator", label: t("calculatorMode", { fallback: "Calculator" }), icon: Calculator },
    { id: "dataset", label: t("datasetMode", { fallback: "Dataset Analyzer" }), icon: Table },
    { id: "explorer", label: t("explorerMode", { fallback: "Visual Explorer" }), icon: Activity },
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
              <tab.icon size={18} className={activeTab === tab.id ? "text-blue-600" : "text-slate-400"} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 md:p-8">
        {activeTab === "calculator" && <ZScoreBasicMode />}
        {activeTab === "dataset" && <ZScoreDatasetMode />}
        {activeTab === "explorer" && <ZScoreExplorerMode />}
        {activeTab === "learning" && <ZScoreLearningSuite />}
      </div>
    </div>
  );
}
