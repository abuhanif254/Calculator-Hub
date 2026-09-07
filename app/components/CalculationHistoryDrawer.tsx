"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  CalculationHistoryItem,
  getCalculationHistory,
  deleteCalculationHistoryItem,
  clearCalculationHistory,
  updateCalculationHistoryLabel,
  formatRelativeTime,
  exportHistoryAsCsv,
  exportHistoryAsJson,
} from "../../lib/utils/calculationHistory";
import { applyParamsToContainer } from "../../lib/hooks/useCalculatorUrlHydration";
import {
  X,
  RotateCcw,
  Trash2,
  Download,
  FileSpreadsheet,
  Check,
  Copy,
  Layers,
  ArrowRightLeft,
  Calendar,
  Tag,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

interface CalculationHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  calcSlug: string;
  calcTitle: string;
  containerId?: string;
}

export const CalculationHistoryDrawer: React.FC<CalculationHistoryDrawerProps> = ({
  isOpen,
  onClose,
  calcSlug,
  calcTitle,
  containerId = "calculator-export-target",
}) => {
  const [activeTab, setActiveTab] = useState<"history" | "compare">("history");
  const [historyItems, setHistoryItems] = useState<CalculationHistoryItem[]>([]);
  const [filterAll, setFilterAll] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState("");
  const [restoredId, setRestoredId] = useState<string | null>(null);
  const [copiedComparison, setCopiedComparison] = useState(false);

  // Load history whenever drawer opens or storage updates
  const refreshHistory = () => {
    const items = getCalculationHistory(filterAll ? undefined : calcSlug);
    setHistoryItems(items);
  };

  useEffect(() => {
    if (isOpen) {
      refreshHistory();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleUpdate = () => refreshHistory();
    window.addEventListener("nexus_history_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("nexus_history_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, [isOpen, filterAll, calcSlug]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Toggle scenario selection for comparison (max 3)
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], id]; // keep last 2 and add new
      }
      return [...prev, id];
    });
  };

  // Restore inputs to the calculator container
  const handleRestore = (item: CalculationHistoryItem) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const params = new URLSearchParams();
    Object.entries(item.inputs).forEach(([k, v]) => {
      params.set(k, String(v));
    });

    applyParamsToContainer(container, params);
    setRestoredId(item.id);
    setTimeout(() => setRestoredId(null), 2000);
  };

  // Save edited label
  const handleSaveLabel = (id: string) => {
    if (editingLabel.trim()) {
      updateCalculationHistoryLabel(id, editingLabel.trim());
    }
    setEditingId(null);
    setEditingLabel("");
  };

  // Selected items for comparison
  const comparisonItems = useMemo(() => {
    return historyItems.filter((item) => selectedIds.includes(item.id));
  }, [historyItems, selectedIds]);

  // Extract all unique input keys for comparison
  const comparisonInputKeys = useMemo(() => {
    const keys = new Set<string>();
    comparisonItems.forEach((item) => {
      Object.keys(item.inputs || {}).forEach((k) => keys.add(k));
    });
    return Array.from(keys);
  }, [comparisonItems]);

  // Extract all unique result keys for comparison
  const comparisonResultKeys = useMemo(() => {
    const keys = new Set<string>();
    comparisonItems.forEach((item) => {
      Object.keys(item.resultsSummary || {}).forEach((k) => keys.add(k));
    });
    return Array.from(keys);
  }, [comparisonItems]);

  // Copy comparison summary to clipboard
  const handleCopyComparison = () => {
    if (comparisonItems.length === 0) return;

    let text = `═══ ${calcTitle} Scenario Comparison ═══\n\n`;
    comparisonItems.forEach((item, idx) => {
      text += `[Scenario ${idx + 1}: ${item.label || "Run #" + (idx + 1)}]\n`;
      if (item.primaryResult) {
        text += `• ${item.primaryResult.label}: ${item.primaryResult.value}\n`;
      }
      Object.entries(item.inputs || {}).forEach(([k, v]) => {
        text += `  - ${k}: ${v}\n`;
      });
      text += "\n";
    });
    text += "Compared on Nexus Calculator: https://www.nexuscalculator.net";

    navigator.clipboard.writeText(text);
    setCopiedComparison(true);
    setTimeout(() => setCopiedComparison(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden print:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white dark:bg-slate-900 shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 transition-all">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#518231]/10 text-[#518231] flex items-center justify-center font-bold">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span>Calculation History</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#518231]/15 text-[#518231] dark:text-[#6fa844] font-semibold">
                      {historyItems.length}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {filterAll ? "All Calculators" : calcTitle} • 100% Private (stored locally)
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Close history drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center justify-between gap-4 mt-6 pt-2">
              <div className="flex bg-slate-200/70 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
                <button
                  onClick={() => setActiveTab("history")}
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    activeTab === "history"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  Saved Runs ({historyItems.length})
                </button>
                <button
                  onClick={() => setActiveTab("compare")}
                  className={`px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    activeTab === "compare"
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                  }`}
                >
                  <ArrowRightLeft className="w-3.5 h-3.5 text-[#518231]" />
                  <span>Compare Scenarios ({selectedIds.length})</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-[11px] font-medium text-slate-500 flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterAll}
                    onChange={(e) => setFilterAll(e.target.checked)}
                    className="rounded border-slate-300 text-[#518231] focus:ring-[#518231]"
                  />
                  <span>Show all tools</span>
                </label>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {/* TAB 1: HISTORY LIST */}
            {activeTab === "history" && (
              <>
                {historyItems.length === 0 ? (
                  <div className="text-center py-16 px-4">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
                      <Layers className="w-8 h-8 opacity-50" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Calculation Runs Yet</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1.5 leading-relaxed">
                      Calculations you run are automatically saved here so you can restore past inputs with one click or compare scenarios side by side.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 pb-1">
                      <span>Select up to 3 runs to compare:</span>
                      {selectedIds.length > 0 && (
                        <button
                          onClick={() => setSelectedIds([])}
                          className="text-[#518231] hover:underline font-semibold"
                        >
                          Clear Selection ({selectedIds.length})
                        </button>
                      )}
                    </div>

                    {historyItems.map((item) => {
                      const isSelected = selectedIds.includes(item.id);
                      const isRestored = restoredId === item.id;
                      const isEditing = editingId === item.id;

                      return (
                        <div
                          key={item.id}
                          className={`group relative p-4 rounded-2xl border transition-all ${
                            isSelected
                              ? "bg-[#518231]/5 border-[#518231] dark:border-[#518231]"
                              : "bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            {/* Checkbox for compare */}
                            <div className="pt-0.5">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => toggleSelect(item.id)}
                                title="Select for scenario comparison"
                                className="w-4 h-4 rounded border-slate-300 text-[#518231] focus:ring-[#518231] cursor-pointer"
                              />
                            </div>

                            {/* Main Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                {isEditing ? (
                                  <div className="flex items-center gap-1.5 w-full">
                                    <input
                                      type="text"
                                      value={editingLabel}
                                      onChange={(e) => setEditingLabel(e.target.value)}
                                      onKeyDown={(e) => e.key === "Enter" && handleSaveLabel(item.id)}
                                      placeholder="Name this scenario..."
                                      className="text-xs px-2.5 py-1 border border-[#518231] rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex-1 outline-none"
                                      autoFocus
                                    />
                                    <button
                                      onClick={() => handleSaveLabel(item.id)}
                                      className="px-2 py-1 bg-[#518231] text-white text-xs font-semibold rounded-lg"
                                    >
                                      Save
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                                      {item.label || item.calcTitle}
                                    </span>
                                    <button
                                      onClick={() => {
                                        setEditingId(item.id);
                                        setEditingLabel(item.label || "");
                                      }}
                                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-opacity p-0.5"
                                      title="Rename scenario"
                                    >
                                      <Tag className="w-3 h-3" />
                                    </button>
                                  </>
                                )}
                                <span className="text-[11px] text-slate-400 flex items-center gap-1 ml-auto">
                                  <Calendar className="w-3 h-3" />
                                  {formatRelativeTime(item.timestamp)}
                                </span>
                              </div>

                              {/* Primary Result Highlight */}
                              {item.primaryResult && (
                                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/10 text-[#518231] dark:text-[#6fa844] rounded-lg text-xs font-bold my-1.5 border border-[#518231]/20">
                                  <span>{item.primaryResult.label}:</span>
                                  <span className="text-sm">{item.primaryResult.value}</span>
                                </div>
                              )}

                              {/* Inputs Preview */}
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {Object.entries(item.inputs || {}).slice(0, 5).map(([k, v]) => (
                                  <span
                                    key={k}
                                    className="text-[11px] px-2 py-0.5 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700"
                                  >
                                    <strong className="font-semibold text-slate-700 dark:text-slate-200">{k}:</strong> {String(v)}
                                  </span>
                                ))}
                                {Object.keys(item.inputs || {}).length > 5 && (
                                  <span className="text-[11px] px-1.5 py-0.5 text-slate-400">
                                    +{Object.keys(item.inputs).length - 5} more
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                              <button
                                onClick={() => handleRestore(item)}
                                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm transition-all ${
                                  isRestored
                                    ? "bg-emerald-600 text-white"
                                    : "bg-[#518231] hover:bg-[#436a28] text-white"
                                }`}
                                title="Restore inputs into calculator"
                              >
                                {isRestored ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Restored!</span>
                                  </>
                                ) : (
                                  <>
                                    <RotateCcw className="w-3.5 h-3.5" />
                                    <span>Restore</span>
                                  </>
                                )}
                              </button>

                              <button
                                onClick={() => deleteCalculationHistoryItem(item.id)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                                title="Delete this calculation"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

            {/* TAB 2: SIDE-BY-SIDE SCENARIO COMPARISON */}
            {activeTab === "compare" && (
              <div className="space-y-6">
                {comparisonItems.length < 2 ? (
                  <div className="text-center py-16 px-4 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                    <ArrowRightLeft className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-60" />
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                      Select 2 or 3 Scenarios to Compare
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1.5 leading-relaxed">
                      Go to the <strong>Saved Runs</strong> tab and check the checkboxes next to any 2 or 3 calculations to see a side-by-side comparison matrix.
                    </p>
                    <button
                      onClick={() => setActiveTab("history")}
                      className="mt-4 px-4 py-2 bg-[#518231] text-white text-xs font-semibold rounded-xl hover:bg-[#436a28] transition-colors"
                    >
                      Back to Saved Runs
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        Comparing {comparisonItems.length} Scenarios
                      </h3>
                      <button
                        onClick={handleCopyComparison}
                        className="inline-flex items-center gap-1.5 text-xs text-[#518231] hover:underline font-semibold"
                      >
                        {copiedComparison ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedComparison ? "Copied!" : "Copy Summary"}</span>
                      </button>
                    </div>

                    {/* Comparison Matrix Table */}
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            <th className="p-3 font-semibold border-b border-r border-slate-200 dark:border-slate-700 w-1/4">
                              Parameter
                            </th>
                            {comparisonItems.map((item, idx) => (
                              <th
                                key={item.id}
                                className="p-3 font-semibold border-b border-slate-200 dark:border-slate-700 text-center"
                              >
                                <div className="font-bold text-slate-900 dark:text-white">
                                  {item.label || `Scenario ${idx + 1}`}
                                </div>
                                <div className="text-[10px] text-slate-400 font-normal">
                                  {formatRelativeTime(item.timestamp)}
                                </div>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {/* Primary Result Row */}
                          <tr className="bg-[#518231]/10 font-bold">
                            <td className="p-3 text-[#518231] dark:text-[#6fa844] border-r border-slate-200 dark:border-slate-700">
                              Primary Result
                            </td>
                            {comparisonItems.map((item) => (
                              <td key={item.id} className="p-3 text-center text-[#518231] dark:text-[#6fa844] text-sm">
                                {item.primaryResult ? item.primaryResult.value : "—"}
                              </td>
                            ))}
                          </tr>

                          {/* Section: Inputs */}
                          <tr className="bg-slate-50 dark:bg-slate-900/60 font-semibold text-slate-500 dark:text-slate-400">
                            <td colSpan={comparisonItems.length + 1} className="p-2 text-[11px] uppercase tracking-wider">
                              Inputs & Configurations
                            </td>
                          </tr>
                          {comparisonInputKeys.map((key) => {
                            // Check if values vary across scenarios
                            const firstVal = comparisonItems[0]?.inputs?.[key];
                            const isDiff = comparisonItems.some((it) => it.inputs?.[key] !== firstVal);

                            return (
                              <tr key={key} className={isDiff ? "bg-amber-500/5" : ""}>
                                <td className="p-3 font-medium text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                                  {key}
                                </td>
                                {comparisonItems.map((item) => (
                                  <td key={item.id} className="p-3 text-center font-semibold text-slate-800 dark:text-slate-200">
                                    {item.inputs?.[key] !== undefined ? String(item.inputs[key]) : "—"}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}

                          {/* Section: Results Summary (if available) */}
                          {comparisonResultKeys.length > 0 && (
                            <>
                              <tr className="bg-slate-50 dark:bg-slate-900/60 font-semibold text-slate-500 dark:text-slate-400">
                                <td colSpan={comparisonItems.length + 1} className="p-2 text-[11px] uppercase tracking-wider">
                                  Calculation Results Breakdown
                                </td>
                              </tr>
                              {comparisonResultKeys.map((key) => (
                                <tr key={key}>
                                  <td className="p-3 font-medium text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                                    {key}
                                  </td>
                                  {comparisonItems.map((item) => (
                                    <td key={item.id} className="p-3 text-center text-slate-800 dark:text-slate-200">
                                      {item.resultsSummary?.[key] || "—"}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </>
                          )}

                          {/* Action Restore Row */}
                          <tr className="bg-slate-50/40 dark:bg-slate-950/40">
                            <td className="p-3 border-r border-slate-200 dark:border-slate-700"></td>
                            {comparisonItems.map((item) => (
                              <td key={item.id} className="p-3 text-center">
                                <button
                                  onClick={() => handleRestore(item)}
                                  className="px-3 py-1.5 bg-[#518231] hover:bg-[#436a28] text-white rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                  <span>Apply</span>
                                </button>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {historyItems.length > 0 && (
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/40 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => exportHistoryAsCsv(filterAll ? undefined : calcSlug)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#518231]" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => exportHistoryAsJson(filterAll ? undefined : calcSlug)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium"
                >
                  <Download className="w-3.5 h-3.5 text-blue-500" />
                  <span>JSON</span>
                </button>
              </div>

              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to clear your saved calculation history?")) {
                    clearCalculationHistory(filterAll ? undefined : calcSlug);
                    setSelectedIds([]);
                  }
                }}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-red-600 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
