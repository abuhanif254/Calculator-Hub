import { useState, useEffect } from 'react';

export interface FavoriteCalc {
  title: string;
  href: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteCalc[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('calc_favorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load favorites', e);
    }
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (calc: FavoriteCalc) => {
    let newFavorites: FavoriteCalc[] = [];
    setFavorites(prev => {
      if (prev.some(f => f.href === calc.href)) {
        newFavorites = prev.filter(f => f.href !== calc.href);
      } else {
        newFavorites = [...prev, calc];
      }
      try {
        localStorage.setItem('calc_favorites', JSON.stringify(newFavorites));
      } catch (e) {
        console.error('Failed to save favorites', e);
      }
      return newFavorites;
    });
    // Dispatch outside the state updater
    window.dispatchEvent(new Event('favorites-updated'));
  };

  // Listen to custom event to cross-sync between different components
  useEffect(() => {
    const handleSync = () => {
      try {
        const stored = localStorage.getItem('calc_favorites');
        if (stored) {
          setFavorites(JSON.parse(stored));
        } else {
          setFavorites([]);
        }
      } catch (e) {
        // ignore
      }
    };
    window.addEventListener('favorites-updated', handleSync);
    return () => window.removeEventListener('favorites-updated', handleSync);
  }, []);

  const isFavorite = (href: string) => {
    return favorites.some(f => f.href === href);
  };

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
