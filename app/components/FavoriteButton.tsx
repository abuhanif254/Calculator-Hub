'use client';

import React from 'react';
import { useFavorites } from '@/lib/hooks/useRetention';
import { Star } from 'lucide-react';

interface FavoriteButtonProps {
  slug: string;
  title: string;
  type: 'calculator' | 'developer-tool';
  href: string;
}

export function FavoriteButton({ slug, title, type, href }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, mounted } = useFavorites();

  if (!mounted) return null;

  const active = isFavorite(slug);

  return (
    <button
      onClick={() => toggleFavorite({ slug, title, type, href })}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
          : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 hover:text-amber-600 dark:hover:text-amber-400'
      }`}
      title={active ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star size={14} fill={active ? 'currentColor' : 'none'} />
      {active ? 'Favorited' : 'Favorite'}
    </button>
  );
}
