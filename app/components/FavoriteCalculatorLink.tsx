'use client';

import { Link, resolveIntlHref } from '@/i18n/routing';
import { Star } from 'lucide-react';
import { useFavorites } from '@/lib/hooks/useRetention';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function FavoriteCalculatorLink({ title, href, slug, type }: { title: string; href: string; slug?: string; type?: 'calculator' | 'developer-tool' }) {
  const { toggleFavorite, isFavorite, mounted } = useFavorites();

  const computedSlug = slug || href.split('/').pop() || '';
  const computedType = type || (href.includes('/tools/') ? 'developer-tool' : 'calculator');

  const favorite = mounted ? isFavorite(computedSlug) : false;

  return (
    <div className="flex items-center justify-between group">
      <Link href={resolveIntlHref(href)} className="text-[15px] text-[#0066cc] hover:underline flex-grow pr-2">
        {title}
      </Link>
      
      {/* Favorite Button */}
      {mounted && (
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite({ title, href, slug: computedSlug, type: computedType });
          }}
          className="p-1 rounded-full hover:bg-slate-100 text-slate-300 transition-colors focus:outline-none flex-shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center sm:min-h-0 sm:min-w-0"
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star 
            className={cn("w-4 h-4 transition-all", favorite ? "fill-amber-400 text-amber-500" : "text-slate-300 hover:text-amber-400")} 
          />
        </button>
      )}
    </div>
  );
}
