'use client';

import React, { useState } from "react";
import { motion } from "motion/react";

export default function AnonymizePage() {
  const [inputData, setInputData] = useState("");
  const [columns, setColumns] = useState<string[]>([]);
  const [strategies, setStrategies] = useState<Record<string, string>>({});
  const [anonymizedData, setAnonymizedData] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleParse = () => {
    try {
      let parsed = [];
      if (inputData.trim().startsWith("[")) {
        parsed = JSON.parse(inputData);
      } else {
        const lines = inputData.split("\n");
        const headers = lines[0].split(",").map((h) => h.trim());
        parsed = lines.slice(1).map((line) => {
          const values = line.split(",");
          return headers.reduce((obj, header, i) => {
            obj[header] = values[i]?.trim();
            return obj;
          }, {} as any);
        });
      }
      if (parsed.length > 0) {
        const cols = Object.keys(parsed[0]);
        setColumns(cols);
        setStrategies(
          cols.reduce((acc, col) => ({ ...acc, [col]: "Keep" }), {}),
        );
      }
    } catch (e) {
      alert("Invalid data format. Please paste valid CSV or JSON array.");
    }
  };

  const handleAnonymize = () => {
    setIsProcessing(true);
    setTimeout(() => {
      let parsed = [];
      try {
        if (inputData.trim().startsWith("[")) parsed = JSON.parse(inputData);
        else {
          const lines = inputData.split("\n");
          const headers = lines[0].split(",").map((h) => h.trim());
          parsed = lines.slice(1).map((line) => {
            const values = line.split(",");
            return headers.reduce(
              (obj, header, i) => ({ ...obj, [header]: values[i]?.trim() }),
              {} as any,
            );
          });
        }

        const result = parsed.map((row: any) => {
          const newRow = { ...row };
          Object.keys(newRow).forEach((col) => {
            const strategy = strategies[col];
            if (strategy === "Pseudonymization (Hash)")
              newRow[col] = "***hash***";
            if (strategy === "Suppression (Redact)") newRow[col] = "[REDACTED]";
            if (strategy === "Noise Addition")
              newRow[col] = !isNaN(Number(newRow[col]))
                ? (
                    Number(newRow[col]) *
                    (1 + (Math.random() * 0.2 - 0.1))
                  ).toFixed(2)
                : newRow[col];
            if (strategy === "Synthetic Data")
              newRow[col] = "Fake_" + Math.random().toString(36).substring(7);
          });
          return newRow;
        });
        setAnonymizedData(result);
        setIsProcessing(false);
      } catch (e) {
        setIsProcessing(false);
      }
    }, 800);
  };

  const handleDownloadCsv = () => {
    if (anonymizedData.length === 0) return;
    const header = columns.join(',');
    const rows = anonymizedData.map(row =>
      columns.map(col => {
        const val = String(row[col] ?? '');
        // Escape commas and quotes for CSV
        return val.includes(',') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
      }).join(',')
    ).join('\n');
    const csvContent = header + '\n' + rows;
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `anonymized-data-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    if (anonymizedData.length === 0) return;
    const json = JSON.stringify(anonymizedData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `anonymized-data-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const strategiesApplied = Object.values(strategies).filter(s => s !== 'Keep').length;
  const riskBefore = columns.length > 0 ? Math.min(100, columns.length * 15) : 0;
  const riskAfter = Math.max(0, riskBefore - strategiesApplied * 12);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Browser-Side Data Anonymization
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Anonymize sensitive datasets safely entirely in your browser without
          data leaving your device.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="glass-panel rounded-2xl p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            1. Input Data (CSV or JSON)
          </h2>
          <textarea
            className="w-full h-64 bg-transparent border border-slate-200 dark:border-slate-800 rounded-xl p-4 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-600"
            placeholder="Paste your CSV or JSON data here..."
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleParse}
              className="px-6 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-medium hover:opacity-90"
            >
              Parse Data
            </button>
          </div>
        </motion.div>

        <motion.div
          className="glass-panel rounded-2xl p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
            2. Configure Strategies
          </h2>
          {columns.length === 0 ? (
            <div className="flex items-center justify-center h-64 text-slate-500">
              Parse data to configure columns
            </div>
          ) : (
            <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
              {columns.map((col) => (
                <div
                  key={col}
                  className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-800 rounded-xl"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300 truncate mr-4">
                    {col}
                  </span>
                  <select
                    value={strategies[col]}
                    onChange={(e) =>
                      setStrategies({ ...strategies, [col]: e.target.value })
                    }
                    className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1 text-sm outline-none"
                  >
                    <option>Keep</option>
                    <option>Pseudonymization (Hash)</option>
                    <option>Suppression (Redact)</option>
                    <option>Noise Addition</option>
                    <option>Synthetic Data</option>
                  </select>
                </div>
              ))}
            </div>
          )}
          {columns.length > 0 && (
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm">
                Risk Score:{" "}
                <span className="text-red-500 font-bold">High ({riskBefore})</span> â†’{" "}
                <span className="text-emerald-500 font-bold">Low ({riskAfter})</span>
              </div>
              <button
                onClick={handleAnonymize}
                disabled={isProcessing}
                className="px-6 py-2 bg-violet-600 text-white rounded-lg font-medium hover:bg-violet-700 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Anonymize Data"}
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {anonymizedData.length > 0 && (
        <motion.div
          className="glass-panel rounded-2xl p-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3. Results
            </h2>
            <div className="flex gap-2">
              <button
                onClick={handleDownloadCsv}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                Download CSV
              </button>
              <button
                onClick={handleDownloadJson}
                className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                Download JSON
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  {columns.map((col) => (
                    <th
                      key={col}
                      className="pb-3 px-4 font-medium text-slate-500"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {anonymizedData.slice(0, 5).map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-slate-100 dark:border-slate-800/50"
                  >
                    {columns.map((col) => (
                      <td
                        key={col}
                        className="py-3 px-4 text-slate-700 dark:text-slate-300 whitespace-nowrap"
                      >
                        {row[col]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
