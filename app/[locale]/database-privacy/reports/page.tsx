"use client";

import React from "react";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Analytics & Reports
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Platform usage and compliance metrics.
          </p>
        </div>
        <div className="flex gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          {["7D", "30D", "90D", "YTD"].map((range) => (
            <button
              key={range}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${range === "30D" ? "bg-white dark:bg-[#0B1120] text-violet-600 shadow-sm" : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"}`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Rows Processed", value: "45.2M", trend: "+12%", up: true },
          { label: "PII Fields Found", value: "1.2M", trend: "+5%", up: true },
          { label: "Masking Jobs", value: "842", trend: "-2%", up: false },
          { label: "Compliance Score", value: "98/100", trend: "+1", up: true },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass-panel rounded-2xl p-5 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10"
          >
            <div className="text-sm font-medium text-slate-500 mb-2">
              {stat.label}
            </div>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </div>
              <div
                className={`text-sm font-medium flex items-center gap-1 ${stat.up ? "text-emerald-500" : "text-red-500"}`}
              >
                {stat.up ? "↑" : "↓"} {stat.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 h-80 flex flex-col">
          <h3 className="font-bold text-slate-900 dark:text-white mb-6">
            Processing Volume
          </h3>
          {/* Mock Area Chart */}
          <div className="flex-1 relative flex items-end gap-2 pb-6">
            {[30, 45, 25, 60, 50, 80, 40, 70, 90, 85, 60, 75].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-violet-500/20 rounded-t relative group"
              >
                <div
                  className="absolute bottom-0 w-full bg-violet-600 rounded-t transition-all"
                  style={{ height: `${h}%` }}
                ></div>
              </div>
            ))}
            <div className="absolute bottom-0 w-full flex justify-between text-xs text-slate-500 mt-2">
              <span>Day 1</span>
              <span>Day 15</span>
              <span>Day 30</span>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 h-80 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white">
              PII Distribution
            </h3>
            <button className="text-xs text-violet-500 hover:underline">
              Export PDF
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center gap-8">
            <div className="relative w-40 h-40 rounded-full border-[16px] border-slate-100 dark:border-slate-800">
              {/* Mock pie segments using border colors */}
              <div className="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-t-violet-500 border-r-violet-500 rotate-45"></div>
              <div className="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-b-fuchsia-500 rotate-12"></div>
              <div className="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-l-blue-500 -rotate-12"></div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Emails (45%)", color: "bg-violet-500" },
                { label: "Names (25%)", color: "bg-fuchsia-500" },
                { label: "Phones (15%)", color: "bg-blue-500" },
                {
                  label: "Other (15%)",
                  color: "bg-slate-300 dark:bg-slate-700",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                >
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
