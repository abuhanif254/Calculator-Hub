// ═══════════════════════════════════════════════════════════════════════
// lib/utils/calculationHistory.ts
// Client-side local calculation history and multi-scenario management.
// 100% private, zero server transmissions, stored in browser localStorage.
// ═══════════════════════════════════════════════════════════════════════

export interface CalculationHistoryItem {
  id: string;
  calcSlug: string;
  calcTitle: string;
  timestamp: number;
  label?: string;
  inputs: Record<string, string | number>;
  primaryResult?: {
    label: string;
    value: string;
  };
  resultsSummary?: Record<string, string>;
  url: string;
}

const STORAGE_KEY = 'nexus_calc_history';
const MAX_HISTORY_ITEMS = 60;

/**
 * Retrieve calculation history from localStorage.
 * Optionally filter by specific calculator slug.
 */
export function getCalculationHistory(calcSlug?: string): CalculationHistoryItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const list: CalculationHistoryItem[] = JSON.parse(raw);
    if (!Array.isArray(list)) return [];

    if (calcSlug) {
      return list.filter((item) => item.calcSlug === calcSlug);
    }
    return list;
  } catch (err) {
    console.error('Error reading calculation history:', err);
    return [];
  }
}

/**
 * Save a new calculation run into history.
 * Prevents identical consecutive duplicates and enforces maximum capacity.
 */
export function saveCalculationToHistory(
  item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>
): CalculationHistoryItem {
  if (typeof window === 'undefined') {
    return { ...item, id: 'temp', timestamp: Date.now() };
  }

  try {
    const history = getCalculationHistory(); // Get all history items

    // Check if duplicate of most recent entry for this calculator
    const latestForCalc = history.find((h) => h.calcSlug === item.calcSlug);
    if (latestForCalc) {
      const inputsEqual = JSON.stringify(latestForCalc.inputs) === JSON.stringify(item.inputs);
      if (inputsEqual) {
        // Just update timestamp and primary result if needed
        latestForCalc.timestamp = Date.now();
        if (item.primaryResult) latestForCalc.primaryResult = item.primaryResult;
        if (item.resultsSummary) latestForCalc.resultsSummary = item.resultsSummary;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
        window.dispatchEvent(new CustomEvent('nexus_history_updated', { detail: { calcSlug: item.calcSlug } }));
        return latestForCalc;
      }
    }

    const newItem: CalculationHistoryItem = {
      ...item,
      id: `calc_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
    };

    const updated = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Notify listeners across components
    window.dispatchEvent(new CustomEvent('nexus_history_updated', { detail: { calcSlug: item.calcSlug } }));

    return newItem;
  } catch (err) {
    console.error('Error saving calculation history:', err);
    return { ...item, id: 'temp', timestamp: Date.now() };
  }
}

/**
 * Delete a specific history entry by ID.
 */
export function deleteCalculationHistoryItem(id: string): void {
  if (typeof window === 'undefined') return;

  try {
    const history = getCalculationHistory();
    const updated = history.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('nexus_history_updated', { detail: { id } }));
  } catch (err) {
    console.error('Error deleting calculation history item:', err);
  }
}

/**
 * Update custom user label / note for a calculation scenario.
 */
export function updateCalculationHistoryLabel(id: string, label: string): void {
  if (typeof window === 'undefined') return;

  try {
    const history = getCalculationHistory();
    const target = history.find((item) => item.id === id);
    if (target) {
      target.label = label.trim();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      window.dispatchEvent(new CustomEvent('nexus_history_updated', { detail: { id } }));
    }
  } catch (err) {
    console.error('Error updating calculation history label:', err);
  }
}

/**
 * Clear history for a specific calculator or all calculators.
 */
export function clearCalculationHistory(calcSlug?: string): void {
  if (typeof window === 'undefined') return;

  try {
    if (!calcSlug) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      const history = getCalculationHistory();
      const remaining = history.filter((item) => item.calcSlug !== calcSlug);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
    }
    window.dispatchEvent(new CustomEvent('nexus_history_updated', { detail: { calcSlug } }));
  } catch (err) {
    console.error('Error clearing calculation history:', err);
  }
}

/**
 * Format relative timestamp (e.g. "Just now", "5 mins ago", "Yesterday").
 */
export function formatRelativeTime(timestamp: number): string {
  const diffMs = Date.now() - timestamp;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHours = Math.floor(diffMin / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSec < 45) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;

  return new Date(timestamp).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Export calculation history as a JSON file download.
 */
export function exportHistoryAsJson(calcSlug?: string): void {
  if (typeof window === 'undefined') return;

  const items = getCalculationHistory(calcSlug);
  if (items.length === 0) return;

  const blob = new Blob([JSON.stringify(items, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${calcSlug || 'nexus'}-calculation-history-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Export calculation history as a CSV file download.
 */
export function exportHistoryAsCsv(calcSlug?: string): void {
  if (typeof window === 'undefined') return;

  const items = getCalculationHistory(calcSlug);
  if (items.length === 0) return;

  // Extract all unique input and result keys
  const inputKeys = new Set<string>();
  const resultKeys = new Set<string>();

  items.forEach((item) => {
    Object.keys(item.inputs || {}).forEach((k) => inputKeys.add(k));
    Object.keys(item.resultsSummary || {}).forEach((k) => resultKeys.add(k));
  });

  const headers = [
    'Date & Time',
    'Scenario Label',
    'Calculator',
    'Primary Result',
    ...Array.from(inputKeys).map((k) => `Input: ${k}`),
    ...Array.from(resultKeys).map((k) => `Result: ${k}`),
    'URL',
  ];

  const rows = items.map((item) => {
    const values = [
      new Date(item.timestamp).toISOString(),
      `"${(item.label || '').replace(/"/g, '""')}"`,
      `"${(item.calcTitle || item.calcSlug).replace(/"/g, '""')}"`,
      `"${item.primaryResult ? `${item.primaryResult.label}: ${item.primaryResult.value}` : ''}"`,
      ...Array.from(inputKeys).map((k) => `"${item.inputs?.[k] !== undefined ? item.inputs[k] : ''}"`),
      ...Array.from(resultKeys).map((k) => `"${item.resultsSummary?.[k] !== undefined ? item.resultsSummary[k] : ''}"`),
      `"${item.url || ''}"`,
    ];
    return values.join(',');
  });

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${calcSlug || 'nexus'}-calculation-history-${Date.now()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Extract primary result and results summary from the DOM container of a calculator.
 */
export function extractResultsFromContainer(containerId: string = 'calculator-export-target'): {
  primaryResult?: { label: string; value: string };
  resultsSummary?: Record<string, string>;
} {
  if (typeof window === 'undefined') return {};
  const container = document.getElementById(containerId);
  if (!container) return {};

  const summary: Record<string, string> = {};
  let primary: { label: string; value: string } | undefined;

  // Search candidate cards / result wrappers
  const cards = container.querySelectorAll('div, section');
  for (const card of Array.from(cards)) {
    const textElements = card.querySelectorAll('h3, h4, h5, p, span');
    const labelEl = Array.from(textElements).find((el) => {
      const txt = (el.textContent || '').trim();
      return (
        txt.length > 2 &&
        txt.length < 40 &&
        /(result|payment|total|interest|balance|bmi|calories|score|value|rate|amount|tax|price|cost|saving|profit|return|margin|gpa|percentage|ratio)/i.test(txt) &&
        !card.querySelector('input, select, textarea')
      );
    });

    if (labelEl) {
      const valueEl = Array.from(textElements).find((el) => {
        if (el === labelEl || el.contains(labelEl) || labelEl.contains(el)) return false;
        const txt = (el.textContent || '').trim();
        return /^[$€£¥₹]?\s*-?\d+([.,]\d+)*\s*[%a-zA-Z/]*$/.test(txt) && txt.length < 30;
      });

      if (valueEl) {
        const labelText = (labelEl.textContent || '').trim();
        const valueText = (valueEl.textContent || '').trim();
        if (labelText && valueText && !summary[labelText]) {
          summary[labelText] = valueText;
          if (!primary) {
            primary = { label: labelText, value: valueText };
          }
        }
      }
    }
  }

  // Fallback: search for prominent result text
  if (!primary) {
    const largeVals = container.querySelectorAll('.text-3xl, .text-4xl, .text-5xl, .text-2xl');
    for (const valEl of Array.from(largeVals)) {
      if (valEl.closest('button, input, select, textarea')) continue;
      const valText = (valEl.textContent || '').trim();
      if (/^[$€£¥₹]?\s*-?\d+([.,]\d+)*\s*[%a-zA-Z/]*$/.test(valText)) {
        const prev = valEl.previousElementSibling || valEl.parentElement?.querySelector('h3, h4, p, span');
        const lblText = prev ? (prev.textContent || '').trim() : 'Result';
        primary = { label: lblText.slice(0, 30), value: valText };
        summary[primary.label] = primary.value;
        break;
      }
    }
  }

  return {
    primaryResult: primary,
    resultsSummary: Object.keys(summary).length > 0 ? summary : undefined,
  };
}
