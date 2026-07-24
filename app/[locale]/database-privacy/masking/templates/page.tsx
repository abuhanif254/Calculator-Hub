"use client";

import React, { useState } from "react";

const templates = [
  {
    id: 1,
    name: "GDPR Starter Kit",
    category: "Compliance",
    desc: "Baseline rules for EU GDPR compliance. Masks PII like names, emails, and IPs.",
    rules: 12,
    icon: "🇪🇺",
  },
  {
    id: 2,
    name: "HIPAA Healthcare Pack",
    category: "Healthcare",
    desc: "Strict redaction for PHI (Protected Health Information) including medical records.",
    rules: 24,
    icon: "🏥",
  },
  {
    id: 3,
    name: "PCI-DSS Financial Pack",
    category: "Finance",
    desc: "Tokenization and encryption for credit cards, PANs, and bank accounts.",
    rules: 18,
    icon: "💳",
  },
  {
    id: 4,
    name: "Developer Sandbox Pack",
    category: "Development",
    desc: "Replaces sensitive data with realistic synthetic data for dev/test environments.",
    rules: 35,
    icon: "💻",
  },
  {
    id: 5,
    name: "CCPA California Pack",
    category: "Compliance",
    desc: "Rules aligned with the California Consumer Privacy Act requirements.",
    rules: 15,
    icon: "🐻",
  },
  {
    id: 6,
    name: "Custom Enterprise",
    category: "Custom",
    desc: "Your organization specific custom baseline for broad anonymization.",
    rules: 8,
    icon: "🏢",
  },
];

export default function TemplatesPage() {
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState<string | null>(null);

  const filtered =
    filter === "All"
      ? templates
      : templates.filter((t) => t.category === filter);

  const handleUse = (name: string) => {
    setToast(`Successfully applied ${name} template!`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Masking Rule Templates
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Pre-built profiles for instant compliance.
          </p>
        </div>
        <div className="flex gap-3">
          <label className="cursor-pointer px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors flex items-center gap-2">
            <span>Import .json</span>
            <input type="file" accept=".json" className="hidden" />
          </label>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          "All",
          "Compliance",
          "Healthcare",
          "Finance",
          "Development",
          "Custom",
        ].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === cat
                ? "bg-violet-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((template) => (
          <div
            key={template.id}
            className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 flex flex-col"
          >
            <div className="text-4xl mb-4">{template.icon}</div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {template.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 flex-1 mb-4">
              {template.desc}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
              <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                {template.rules} Rules Included
              </span>
              <button
                onClick={() => handleUse(template.name)}
                className="text-sm px-3 py-1.5 bg-violet-600/10 hover:bg-violet-600/20 text-violet-600 dark:text-violet-400 rounded-lg font-medium transition-colors"
              >
                Use Template
              </button>
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-medium">{toast}</span>
        </div>
      )}
    </div>
  );
}
