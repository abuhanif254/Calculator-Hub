'use client';

import { Link } from '@/i18n/routing';
import { Star } from 'lucide-react';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function FavoriteCalculatorLink({ title, href }: { title: string; href: string }) {
  const { toggleFavorite, isFavorite, isLoaded } = useFavorites();

  const favorite = isLoaded ? isFavorite(href) : false;

  return (
    <div className="flex items-center justify-between group">
      <Link href={href as any} className="text-[15px] text-[#0066cc] hover:underline flex-grow pr-2">
        {title}
      </Link>
      
      {/* Favorite Button */}
      {isLoaded && (
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite({ title, href });
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

