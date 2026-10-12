'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import {
  ChevronDown,
  ChevronRight,
  DollarSign,
  Heart,
  FlaskConical,
  ShieldCheck,
  BookOpen,
  Search,
  X,
  Palette,
  Wrench,
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
  'Privacy & Security': {
    icon: ShieldCheck,
    color: 'text-sky-600 dark:text-sky-400',
    bg: 'bg-sky-50 dark:bg-sky-500/10',
  },
  'Design & Media': {
    icon: Palette,
    color: 'text-pink-600 dark:text-pink-400',
    bg: 'bg-pink-50 dark:bg-pink-500/10',
  },
  'Productivity & Utilities': {
    icon: Wrench,
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-500/10',
  },
};

interface GuidesSidebarProps {
  /** The slug of the currently active guide (undefined on index page) */
  activeSlug?: string;
  /** Map of canonical guide.slug -> localized title */
  localizedTitles?: Record<string, string>;
}

const SIDEBAR_COPY: Record<string, {
  searchPlaceholder: string;
  allGuides: string;
  noResults: string;
  categories: Record<GuideCategory, string>;
}> = {
  en: {
    searchPlaceholder: 'Search guides…',
    allGuides: 'All Guides',
    noResults: 'No guides match your search.',
    categories: {
      'Finance': 'Finance',
      'Health': 'Health',
      'Math & Science': 'Math & Science',
      'Privacy & Security': 'Privacy & Security',
      'Design & Media': 'Design & Media',
      'Productivity & Utilities': 'Productivity & Utilities',
    },
  },
  es: {
    searchPlaceholder: 'Buscar guías…',
    allGuides: 'Todas las Guías',
    noResults: 'No se encontraron guías.',
    categories: {
      'Finance': 'Finanzas',
      'Health': 'Salud',
      'Math & Science': 'Matemáticas y Ciencia',
      'Privacy & Security': 'Privacidad y Seguridad',
      'Design & Media': 'Diseño y Multimedia',
      'Productivity & Utilities': 'Productividad y Utilidades',
    },
  },
  fr: {
    searchPlaceholder: 'Rechercher un guide…',
    allGuides: 'Tous les Guides',
    noResults: 'Aucun guide ne correspond à votre recherche.',
    categories: {
      'Finance': 'Finance',
      'Health': 'Santé',
      'Math & Science': 'Maths et Sciences',
      'Privacy & Security': 'Confidentialité et Sécurité',
      'Design & Media': 'Design et Médias',
      'Productivity & Utilities': 'Productivité et Utilitaires',
    },
  },
  de: {
    searchPlaceholder: 'Ratgeber durchsuchen…',
    allGuides: 'Alle Ratgeber',
    noResults: 'Keine passenden Ratgeber gefunden.',
    categories: {
      'Finance': 'Finanzen',
      'Health': 'Gesundheit',
      'Math & Science': 'Mathematik & Wissenschaft',
      'Privacy & Security': 'Datenschutz & Sicherheit',
      'Design & Media': 'Design & Medien',
      'Productivity & Utilities': 'Produktivität & Werkzeuge',
    },
  },
};

export function GuidesSidebar({ activeSlug, localizedTitles }: GuidesSidebarProps) {
  const params = useParams();
  const locale = (typeof params?.locale === 'string' ? params.locale : 'en') as 'en' | 'es' | 'fr' | 'de';
  const currentSlug = activeSlug || (typeof params?.slug === 'string' ? params.slug : undefined);
  const t = SIDEBAR_COPY[locale] || SIDEBAR_COPY.en;

  const activeGuide = currentSlug
    ? allGuides.find(
        (g) =>
          g.slug === currentSlug ||
          (g.slugs && Object.values(g.slugs).includes(currentSlug))
      )
    : undefined;

  const [query, setQuery] = useState('');
  const [openCategories, setOpenCategories] = useState<Set<GuideCategory>>(() => {
    if (activeGuide) {
      return new Set<GuideCategory>([activeGuide.category]);
    }
    return new Set<GuideCategory>([
      'Finance',
      'Health',
      'Math & Science',
      'Privacy & Security',
      'Design & Media',
      'Productivity & Utilities',
    ]);
  });

  const toggleCategory = (cat: GuideCategory) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  // Filter guides by search query across localized title and description
  const filteredGuides = query.trim()
    ? allGuides.filter((g) => {
        const displayTitle = localizedTitles?.[g.slug] || g.title;
        return (
          displayTitle.toLowerCase().includes(query.toLowerCase()) ||
          g.title.toLowerCase().includes(query.toLowerCase()) ||
          g.description.toLowerCase().includes(query.toLowerCase())
        );
      })
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
            placeholder={t.searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#518231]/40 focus:border-[#518231]/60 transition-all"
            aria-label={t.searchPlaceholder}
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
            currentSlug === undefined && !query
              ? 'bg-[#518231]/10 text-[#518231] dark:text-[#6fa844]'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpen size={14} />
          {t.allGuides}
        </Link>
      </div>

      {/* ── Scrollable guide list ───────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-3 pb-6 space-y-1">
        {/* ── Filtered/search results ── */}
        {filteredGuides !== null && (
          <div>
            {filteredGuides.length === 0 ? (
              <p className="text-xs text-slate-400 dark:text-slate-500 px-3 py-4 text-center">
                {t.noResults}
              </p>
            ) : (
              <ul className="space-y-0.5">
                {filteredGuides.map((guide) => {
                  const meta = CATEGORY_META[guide.category];
                  const Icon = meta.icon;
                  const localizedSlug = guide.slugs?.[locale] || guide.slug;
                  const displayTitle = localizedTitles?.[guide.slug] || guide.title;
                  const isActive = guide.slug === currentSlug || localizedSlug === currentSlug;
                  return (
                    <li key={guide.slug}>
                      <Link
                        href={{ pathname: '/guides/[slug]', params: { slug: localizedSlug } }}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 group ${
                          isActive
                            ? 'bg-[#518231]/10 text-[#518231] dark:text-[#6fa844] font-medium'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <Icon size={13} className={`shrink-0 ${meta.color}`} />
                        <span className="leading-snug">{displayTitle}</span>
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
            const isOpen = openCategories.has(cat) || activeGuide?.category === cat;
            const guides = guidesByCategory[cat];
            const localizedCatLabel = t.categories[cat] || cat;

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
                    {localizedCatLabel}
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
                      const localizedSlug = guide.slugs?.[locale] || guide.slug;
                      const displayTitle = localizedTitles?.[guide.slug] || guide.title;
                      const isActive = guide.slug === currentSlug || localizedSlug === currentSlug;
                      return (
                        <li key={guide.slug}>
                          <Link
                            href={{
                              pathname: '/guides/[slug]',
                              params: { slug: localizedSlug },
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
                            {displayTitle}
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
