'use client';

import { useFavorites } from '@/lib/hooks/useFavorites';
import { FavoriteCalculatorLink } from './FavoriteCalculatorLink';
import { Star } from 'lucide-react';

export function FavoritesSection() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded || favorites.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-6 h-6 text-amber-500 fill-amber-400" />
        <h2 className="text-2xl font-bold text-slate-800">Your Favorites</h2>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4">
          {favorites.map((calc) => (
            <li key={calc.href}>
              <FavoriteCalculatorLink title={calc.title} href={calc.href} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
