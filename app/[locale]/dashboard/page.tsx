'use client';

import React from 'react';
import { useToolHistory, useFavorites, useStreak } from '@/lib/hooks/useRetention';
import { Link } from '@/i18n/routing';
import {
  Clock, Star, Trash2, Flame, ArrowRight,
  Calculator, Code2, History, Heart, TrendingUp, Sparkles
} from 'lucide-react';

// ═══════════════════════════════════════════════════════
// USER DASHBOARD — Retention Hub
// ═══════════════════════════════════════════════════════
// Surfaces recent history, favorites, and usage streaks.
// All data is localStorage-based (privacy-first, no auth needed).
// This page is the primary mechanism for repeat engagement.
// ═══════════════════════════════════════════════════════

function formatTimeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(ts).toLocaleDateString();
}

export default function DashboardPage() {
  const { history, clearHistory, mounted: historyMounted } = useToolHistory();
  const { favorites, toggleFavorite, clearFavorites, mounted: favMounted } = useFavorites();
  const streak = useStreak();

  const mounted = historyMounted && favMounted;

  return (
    <main className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 min-h-[70vh]">
      {/* Header */}
      <div className="mb-6 sm:mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Your Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
          Track your tools, favorites, and usage — all stored locally in your browser.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-900/40 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
              <History className="text-blue-600 dark:text-blue-400" size={20} />
            </div>
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Recent Tools</span>
          </div>
          <p className="text-3xl font-extrabold text-blue-900 dark:text-blue-100">
            {mounted ? history.length : '—'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-amber-900/20 border border-amber-200 dark:border-amber-900/40 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 rounded-xl flex items-center justify-center">
              <Heart className="text-amber-600 dark:text-amber-400" size={20} />
            </div>
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Favorites</span>
          </div>
          <p className="text-3xl font-extrabold text-amber-900 dark:text-amber-100">
            {mounted ? favorites.length : '—'}
          </p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 border border-orange-200 dark:border-orange-900/40 rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/50 rounded-xl flex items-center justify-center">
              <Flame className="text-orange-600 dark:text-orange-400" size={20} />
            </div>
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Day Streak</span>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-extrabold text-orange-900 dark:text-orange-100">
              {streak.currentStreak}
            </p>
            {streak.longestStreak > streak.currentStreak && (
              <span className="text-sm text-orange-600 dark:text-orange-400">
                Best: {streak.longestStreak}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent History */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock size={20} className="text-blue-500" />
              Recent History
            </h2>
            {mounted && history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <Trash2 size={12} />
                Clear
              </button>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            {!mounted ? (
              <div className="p-8 text-center">
                <div className="animate-pulse space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800 rounded-lg" />
                  ))}
                </div>
              </div>
            ) : history.length === 0 ? (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500">
                <History size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">No recent tools yet.</p>
                <p className="text-xs mt-1">Start using calculators and they&apos;ll appear here.</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {history.slice(0, 10).map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={entry.href as any}
                      className="flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                          {entry.type === 'developer-tool' ? (
                            <Code2 size={14} className="text-purple-500" />
                          ) : (
                            <Calculator size={14} className="text-blue-500" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors truncate">
                            {entry.title}
                          </p>
                          <p className="text-xs text-slate-400">
                            {formatTimeAgo(entry.timestamp)}
                          </p>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-slate-300 group-hover:text-[#518231] transition-colors shrink-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        {/* Favorites */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Star size={20} className="text-amber-500" />
              Favorites
            </h2>
            {mounted && favorites.length > 0 && (
              <button
                onClick={clearFavorites}
                className="text-xs text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1"
              >
                <Trash2 size={12} />
                Clear
              </button>
            )}
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
            {!mounted ? (
              <div className="p-8 text-center">
                <div className="animate-pulse space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-slate-100 dark:bg-slate-800 rounded-lg" />
                  ))}
                </div>
              </div>
            ) : favorites.length === 0 ? (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500">
                <Star size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">No favorites yet.</p>
                <p className="text-xs mt-1">Click the ★ icon on any tool to add it here.</p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {favorites.map((fav) => (
                  <li key={fav.slug} className="flex items-center">
                    <Link
                      href={fav.href as any}
                      className="flex-1 flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group min-w-0"
                    >
                      <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                        {fav.type === 'developer-tool' ? (
                          <Code2 size={14} className="text-purple-500" />
                        ) : (
                          <Calculator size={14} className="text-blue-500" />
                        )}
                      </div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-[#518231] transition-colors truncate">
                        {fav.title}
                      </p>
                    </Link>
                    <button
                      onClick={() => toggleFavorite(fav)}
                      className="px-4 py-3 text-amber-400 hover:text-amber-600 transition-colors"
                      title="Remove from favorites"
                    >
                      <Star size={16} fill="currentColor" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>

      {/* Quick Access */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
          <Sparkles size={20} className="text-emerald-500" />
          Quick Access
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href={"/calculators/category/financial" as any}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-[#518231]/30 hover:shadow-sm transition-all text-center group"
          >
            <TrendingUp size={24} className="mx-auto mb-2 text-slate-400 group-hover:text-[#518231] transition-colors" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#518231]">Financial</p>
          </Link>
          <Link
            href={"/calculators/category/health" as any}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-[#518231]/30 hover:shadow-sm transition-all text-center group"
          >
            <Heart size={24} className="mx-auto mb-2 text-slate-400 group-hover:text-[#518231] transition-colors" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#518231]">Health</p>
          </Link>
          <Link
            href={"/calculators/category/math" as any}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-[#518231]/30 hover:shadow-sm transition-all text-center group"
          >
            <Calculator size={24} className="mx-auto mb-2 text-slate-400 group-hover:text-[#518231] transition-colors" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#518231]">Math</p>
          </Link>
          <Link
            href={"/tools/json-formatter" as any}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-[#518231]/30 hover:shadow-sm transition-all text-center group"
          >
            <Code2 size={24} className="mx-auto mb-2 text-slate-400 group-hover:text-[#518231] transition-colors" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-[#518231]">Dev Tools</p>
          </Link>
        </div>
      </section>
    </main>
  );
}
