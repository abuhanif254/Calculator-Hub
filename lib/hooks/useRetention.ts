'use client';

import { useState, useEffect, useCallback } from 'react';

// ═══════════════════════════════════════════════════════
// TOOL HISTORY & FAVORITES — localStorage Persistence
// ═══════════════════════════════════════════════════════
// Tracks user interactions across sessions:
//   - Recently visited tools (with timestamps + last inputs)
//   - Favorited tools (persisted across sessions)
//   - Usage streaks (daily visit tracking)
//
// All data stays in the browser — privacy-first.
// ═══════════════════════════════════════════════════════

const HISTORY_KEY = 'nexus-tool-history';
const FAVORITES_KEY = 'nexus-favorites';
const STREAK_KEY = 'nexus-streak';

export interface HistoryEntry {
  slug: string;
  title: string;
  type: 'calculator' | 'developer-tool';
  href: string;
  timestamp: number;
  inputs?: Record<string, any>;
}

export interface StreakData {
  lastVisit: string;  // ISO date string (YYYY-MM-DD)
  currentStreak: number;
  longestStreak: number;
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function loadJSON<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, data: any): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // localStorage full or disabled — silently ignore
  }
}

// ─── Tool History Hook ───────────────────────────────

export function useToolHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setHistory(loadJSON<HistoryEntry[]>(HISTORY_KEY, []));
    setMounted(true);
  }, []);

  const recordVisit = useCallback(
    (entry: Omit<HistoryEntry, 'timestamp'>) => {
      setHistory((prev) => {
        // Remove existing entry for this slug to avoid duplicates
        const filtered = prev.filter((h) => h.slug !== entry.slug);
        const updated = [
          { ...entry, timestamp: Date.now() },
          ...filtered,
        ].slice(0, 50); // Keep last 50 entries
        saveJSON(HISTORY_KEY, updated);
        return updated;
      });
    },
    []
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveJSON(HISTORY_KEY, []);
  }, []);

  const getRecent = useCallback(
    (limit = 10) => history.slice(0, limit),
    [history]
  );

  return { history, recordVisit, clearHistory, getRecent, mounted };
}

// ─── Favorites Hook ──────────────────────────────────

export interface FavoriteEntry {
  slug: string;
  title: string;
  type: 'calculator' | 'developer-tool';
  href: string;
  addedAt: number;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteEntry[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFavorites(loadJSON<FavoriteEntry[]>(FAVORITES_KEY, []));
    setMounted(true);
  }, []);

  const toggleFavorite = useCallback(
    (entry: Omit<FavoriteEntry, 'addedAt'>) => {
      setFavorites((prev) => {
        const exists = prev.find((f) => f.slug === entry.slug);
        const updated = exists
          ? prev.filter((f) => f.slug !== entry.slug)
          : [...prev, { ...entry, addedAt: Date.now() }];
        saveJSON(FAVORITES_KEY, updated);
        return updated;
      });
    },
    []
  );

  const isFavorite = useCallback(
    (slug: string) => favorites.some((f) => f.slug === slug),
    [favorites]
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    saveJSON(FAVORITES_KEY, []);
  }, []);

  return { favorites, toggleFavorite, isFavorite, clearFavorites, mounted };
}

// ─── Usage Streak Hook ───────────────────────────────

export function useStreak() {
  const [streak, setStreak] = useState<StreakData>({
    lastVisit: '',
    currentStreak: 0,
    longestStreak: 0,
  });

  useEffect(() => {
    const saved = loadJSON<StreakData>(STREAK_KEY, {
      lastVisit: '',
      currentStreak: 0,
      longestStreak: 0,
    });

    const today = getToday();

    if (saved.lastVisit === today) {
      // Already visited today — no update needed
      setStreak(saved);
      return;
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let newStreak: StreakData;

    if (saved.lastVisit === yesterdayStr) {
      // Consecutive day — increment streak
      const current = saved.currentStreak + 1;
      newStreak = {
        lastVisit: today,
        currentStreak: current,
        longestStreak: Math.max(saved.longestStreak, current),
      };
    } else {
      // Streak broken — start fresh
      newStreak = {
        lastVisit: today,
        currentStreak: 1,
        longestStreak: Math.max(saved.longestStreak, 1),
      };
    }

    saveJSON(STREAK_KEY, newStreak);
    setStreak(newStreak);
  }, []);

  return streak;
}
