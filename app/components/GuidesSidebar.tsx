'use client';

import React, { useState } from 'react';
import { Link } from '@/i18n/routing';
import {
  ChevronDown,
  ChevronRight,
  DollarSign,
  Heart,
  FlaskConical,
  BookOpen,
  Search,
  X,
} from 'lucide-react';
import { allGuides, guidesByCategory, type GuideCategory } from '@/lib/data/guides';

// ─────────────────────────────────────────────────────────────────────────────
// Category icons & accent colours — matching the project's design system
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_META: Record<
  GuideCategory,
  { icon: React.ElementType; color: string; bg: string }
> = {
  Finance: {
    icon: DollarSign,
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-500/10',
  },
  Health: {
    icon: Heart,
    color: 'text-rose-500 dark:text-rose-400',
    bg: 'bg-rose-50 dark:bg-rose-500/10',
  },
  'Math & Science': {
    icon: FlaskConical,
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-500/10',
  },
};

interface GuidesSidebarProps {
  /** The slug of the currently active guide (undefined on index page) */
  activeSlug?: string;
}

export function GuidesSidebar({ activeSlug }: GuidesSidebarProps) {
  const [query, setQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<Set<GuideCategory>>(
    new Set(['Finance', 'Health', 'Math & Science'])
  );

  const toggleCategory = (cat: GuideCategory) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  // Filter guides by search query across title and description
  const filteredGuides = query.trim()
    ? allGuides.filter(
        (g) =>
          g.title.toLowerCase().includes(query.toLowerCase()) ||
          g.description.toLowerCase().includes(query.toLowerCase())
      )
    : null; // null means "show categories normally"

  const categories = Object.keys(guidesByCategory) as GuideCategory[];

  return (
    <aside
      className="w-full h-full flex flex-col"
      aria-label="Guides navigation"
    >
      {/* ── Search ─────────────────────────────────────────────────── */}
      <div className="px-4 pb-4 pt-2">
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
          />
          <input
            type="search"
            placeholder="Search guides…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#518231]/40 focus:border-[#518231]/60 transition-all"
            aria-label="Search guides"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              aria-label="Clear search"
            >
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* ── Overview link ──────────────────────────────────────────── */}
      <div className="px-4 pb-3">
        <Link
          href="/guides"
          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            activeSlug === undefined && !query
              ? 'bg-[#518231]/10 text-[#518231] dark:text-[#6fa844]'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen size={14} />
          All Guides
        </Link>
      </div>

      {/* ── Scrollable guide list ───────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-3 pb-6 space-y-1">
        {/* ── Filtered/search results ── */}
        {filteredGuides !== null && (
          <div>
            {filteredGuides.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 px-3 py-4 text-center">
                No guides match your search.
              </p>
            ) : (
              <ul className="space-y-0.5">
                {filteredGuides.map((guide) => {
                  const meta = CATEGORY_META[guide.category];
                  const Icon = meta.icon;
                  const isActive = guide.slug === activeSlug;
                  return (
                    <li key={guide.slug}>
                      <Link
                        href={{ pathname: '/guides/[slug]', params: { slug: guide.slug } }}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                          isActive
                            ? 'bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <Icon size={13} className={`shrink-0 ${meta.color}`} />
                        <span className="leading-snug">{guide.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}

        {/* ── Category groups ── */}
        {filteredGuides === null &&
          categories.map((cat) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta.icon;
            const isOpen = openCategories.has(cat);
            const guides = guidesByCategory[cat];

            return (
              <div key={cat} className="pt-1">
                {/* Category header (collapsible button) */}
                <button
                  onClick={() => toggleCategory(cat)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-700 dark:hover:text-slate-300 transition-all duration-200 group"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2">
                    <span className={`p-1 rounded-md ${meta.bg}`}>
                      <Icon size={11} className={meta.color} />
                    </span>
                    {cat}
                  </span>
                  {isOpen ? (
                    <ChevronDown size={13} className="opacity-60" />
                  ) : (
                    <ChevronRight size={13} className="opacity-60" />
                  )}
                </button>

                {/* Guide links */}
                {isOpen && (
                  <ul className="mt-0.5 space-y-0.5 ml-2 pl-3 border-l border-slate-100 dark:border-white/5">
                    {guides.map((guide) => {
                      const isActive = guide.slug === activeSlug;
                      return (
                        <li key={guide.slug}>
                          <Link
                            href={{
                              pathname: '/guides/[slug]',
                              params: { slug: guide.slug },
                            }}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-sm transition-all duration-200 leading-snug ${
                              isActive
                                ? 'bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] font-semibold'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white hover:translate-x-0.5'
                            }`}
                          >
                            {isActive && (
                              <span className="w-1 h-1 rounded-full bg-[#518231] shrink-0" />
                            )}
                            {guide.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
      </nav>
    </aside>
  );
}
