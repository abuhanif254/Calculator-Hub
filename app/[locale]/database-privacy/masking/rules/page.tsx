'use client';

// Note: Next.js App Router does not support exporting generateMetadata from a 'use client' file.
// In a real application, you should move the interactive part to a separate Client Component.
"use client";

import React, { useState } from "react";

// : { params: Promise<{ locale: string }> }): Promise<Metadata> {
//   const { locale } = await params;
//   const baseUrl = process.env.APP_URL || 'https://nexuscalculator.net';
//   return {
//     title: 'Data Masking Rules Builder — GDPR Anonymization | Nexus DataPrivacy',
//     description: 'Interactive masking rules builder for GDPR compliance and data anonymization.',
//     alternates: {
//       canonical: `${baseUrl}/${locale}/database-privacy/masking/rules`,
//       languages: { 'x-default': `${baseUrl}/en/database-privacy/masking/rules` }
//     },
//     openGraph: {
//       title: 'Data Masking Rules Builder — GDPR Anonymization | Nexus DataPrivacy',
//       description: 'Interactive masking rules builder for GDPR compliance and data anonymization.',
//       url: `${baseUrl}/${locale}/database-privacy/masking/rules`,
//       type: 'website',
//     }
//   };
// }

const initialRules = [
  {
    id: 1,
    name: "Email Masker",
    pattern: ".*email.*",
    strategy: "Hash SHA-256",
    risk: "High",
    active: true,
  },
  {
    id: 2,
    name: "Credit Card Tokenizer",
    pattern: ".*(card|pan|cc).*",
    strategy: "Format-Preserving Encryption",
    risk: "Critical",
    active: true,
  },
  {
    id: 3,
    name: "Phone Partial Mask",
    pattern: ".*(phone|tel|mobile).*",
    strategy: "Partial Mask",
    risk: "Medium",
    active: true,
  },
  {
    id: 4,
    name: "SSN Redactor",
    pattern: ".*(ssn|social_security).*",
    strategy: "Full Redact",
    risk: "Critical",
    active: true,
  },
  {
    id: 5,
    name: "IP Generalizer",
    pattern: ".*(ip_address|client_ip|remote_addr).*",
    strategy: "Custom Regex",
    risk: "Medium",
    active: false,
  },
  {
    id: 6,
    name: "Name Synthesizer",
    pattern: ".*(full_name|first_name|last_name).*",
    strategy: "Synthetic Data",
    risk: "Medium",
    active: true,
  },
  {
    id: 7,
    name: "DOB Suppressor",
    pattern: ".*(dob|date_of_birth|birth_date).*",
    strategy: "Partial Mask",
    risk: "High",
    active: true,
  },
  {
    id: 8,
    name: "API Key Vault",
    pattern: ".*(api_key|secret|token|password).*",
    strategy: "Full Redact",
    risk: "Critical",
    active: true,
  },
];

export default function MaskingRulesPage() {
  const [rules, setRules] = useState(initialRules);
  const [showModal, setShowModal] = useState(false);
  const [newRule, setNewRule] = useState({
    name: "",
    pattern: "",
    strategy: "Hash SHA-256",
    risk: "Medium",
  });
  const [previewInput, setPreviewInput] = useState("");
  const [previewOutput, setPreviewOutput] = useState("");

  const toggleRule = (id: number) => {
    setRules(rules.map((r) => (r.id === id ? { ...r, active: !r.active } : r)));
  };

  const handlePreview = () => {
    if (newRule.strategy === "Hash SHA-256")
      setPreviewOutput(
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      );
    else if (newRule.strategy === "Partial Mask")
      setPreviewOutput(previewInput.slice(0, 3) + "***");
    else if (newRule.strategy === "Full Redact") setPreviewOutput("REDACTED");
    else setPreviewOutput(`[Masked ${newRule.strategy}]`);
  };

  const getRiskColor = (risk: string) => {
    if (risk === "Critical")
      return "bg-red-500/20 text-red-500 border-red-500/30";
    if (risk === "High")
      return "bg-orange-500/20 text-orange-500 border-orange-500/30";
    if (risk === "Medium")
      return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    return "bg-emerald-500/20 text-emerald-500 border-emerald-500/30";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Masking Rules
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Configure how sensitive data is identified and masked.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
        >
          Create Rule
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {rules.map((rule) => (
            <div
              key={rule.id}
              className="glass-panel rounded-2xl p-6 dark:bg-[#090E17]/60 border border-slate-200 dark:border-white/10 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    {rule.name}
                  </h3>
                  <span
                    className={`text-xs px-2 py-1 rounded-full border ${getRiskColor(rule.risk)}`}
                  >
                    {rule.risk}
                  </span>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-slate-500">Pattern:</span>{" "}
                    <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-violet-500">
                      {rule.pattern}
                    </code>
                  </div>
                  <div>
                    <span className="font-medium text-slate-500">
                      Strategy:
                    </span>{" "}
                    {rule.strategy}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${rule.active ? "bg-violet-600" : "bg-slate-300 dark:bg-slate-700"}`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${rule.active ? "left-7" : "left-1"}`}
                  />
                </button>
                <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-violet-500 transition-colors">
                    Edit
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="glass-panel-heavy rounded-2xl p-6 sticky top-6 dark:bg-[#090E17]/80 border border-slate-200 dark:border-white/10">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">
              Live Preview
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Sample data processed by active rules.
            </p>

            <div className="space-y-4">
              <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden">
                <div className="bg-slate-50 dark:bg-slate-900 p-3 text-xs font-semibold text-slate-500 uppercase flex justify-between">
                  <span>Original Data</span>
                  <span>Masked Output</span>
                </div>
                <div className="p-3 text-sm flex justify-between border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120]">
                  <span className="text-slate-600 dark:text-slate-400">
                    john.doe@email.com
                  </span>
                  <span className="text-slate-900 dark:text-white font-mono">
                    e3b0c44...
                  </span>
                </div>
                <div className="p-3 text-sm flex justify-between border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120]">
                  <span className="text-slate-600 dark:text-slate-400">
                    4532 1234 5678 9010
                  </span>
                  <span className="text-slate-900 dark:text-white font-mono">
                    **** **** **** 9010
                  </span>
                </div>
                <div className="p-3 text-sm flex justify-between border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1120]">
                  <span className="text-slate-600 dark:text-slate-400">
                    +1 (555) 123-4567
                  </span>
                  <span className="text-slate-900 dark:text-white font-mono">
                    +1 (555) ***-****
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="glass-panel rounded-2xl w-full max-w-lg p-6 dark:bg-[#0B1120] border border-slate-200 dark:border-white/10 shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Create Masking Rule
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Rule Name
                </label>
                <input
                  type="text"
                  value={newRule.name}
                  onChange={(e) =>
                    setNewRule({ ...newRule, name: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white dark:bg-[#090E17] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  placeholder="e.g. Email Masker"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Column Pattern (Regex)
                </label>
                <input
                  type="text"
                  value={newRule.pattern}
                  onChange={(e) =>
                    setNewRule({ ...newRule, pattern: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white dark:bg-[#090E17] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                  placeholder=".*email.*"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Strategy
                  </label>
                  <select
                    value={newRule.strategy}
                    onChange={(e) =>
                      setNewRule({ ...newRule, strategy: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white dark:bg-[#090E17] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option>Hash SHA-256</option>
                    <option>Partial Mask</option>
                    <option>Full Redact</option>
                    <option>Synthetic Data</option>
                    <option>Format-Preserving Encryption</option>
                    <option>Custom Regex</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Risk Level
                  </label>
                  <select
                    value={newRule.risk}
                    onChange={(e) =>
                      setNewRule({ ...newRule, risk: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white dark:bg-[#090E17] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Test Input
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={previewInput}
                    onChange={(e) => setPreviewInput(e.target.value)}
                    className="flex-1 px-3 py-2 bg-white dark:bg-[#090E17] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    placeholder="Enter sample data..."
                  />
                  <button
                    onClick={handlePreview}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-medium transition-colors"
                  >
                    Preview
                  </button>
                </div>
                {previewOutput && (
                  <div className="mt-2 p-3 bg-slate-50 dark:bg-[#090E17] border border-slate-200 dark:border-slate-800 rounded-lg font-mono text-sm text-slate-900 dark:text-white break-all">
                    {previewOutput}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setRules([
                    ...rules,
                    { id: Date.now(), ...newRule, active: true },
                  ]);
                  setShowModal(false);
                }}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors"
              >
                Save Rule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
