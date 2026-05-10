"use client";

const HISTORY_KEY = "nexus-tool-history";
const FAVORITES_KEY = "nexus-favorites";
const MAX_HISTORY = 50;

export interface HistoryEntry {
  slug: string;
  title: string;
  type: "calculator" | "tool";
  timestamp: number;
}

// ─── History ────────────────────────────────────────────

export function getHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addToHistory(entry: Omit<HistoryEntry, "timestamp">) {
  if (typeof window === "undefined") return;
  const history = getHistory().filter((h) => h.slug !== entry.slug);
  history.unshift({ ...entry, timestamp: Date.now() });
  localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(history.slice(0, MAX_HISTORY))
  );
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(HISTORY_KEY);
}

// ─── Favorites ──────────────────────────────────────────

export function getFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]");
  } catch {
    return [];
  }
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug);
}

/**
 * Toggle a tool as favorite. Returns `true` if the tool was added,
 * `false` if it was removed.
 */
export function toggleFavorite(slug: string): boolean {
  const favs = getFavorites();
  const idx = favs.indexOf(slug);
  if (idx > -1) {
    favs.splice(idx, 1);
  } else {
    favs.push(slug);
  }
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  return idx === -1;
}
