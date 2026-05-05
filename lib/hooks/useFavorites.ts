import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';

export interface FavoriteCalc {
  title: string;
  href: string;
}

class FavoritesStore {
  private favorites: FavoriteCalc[] = [];
  private isLoaded = false;
  private listeners: Set<() => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('calc_favorites');
        if (stored) {
          this.favorites = JSON.parse(stored);
        }
      } catch (e) {
        console.error('Failed to load favorites', e);
      }
      this.isLoaded = true;
    }
  }

  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => {
    return this.favorites;
  };

  getIsLoaded = () => {
    return this.isLoaded;
  };

  toggleFavorite = (calc: FavoriteCalc) => {
    const exists = this.favorites.some(f => f.href === calc.href);
    if (exists) {
      this.favorites = this.favorites.filter(f => f.href !== calc.href);
    } else {
      this.favorites = [...this.favorites, calc];
    }
    
    try {
      localStorage.setItem('calc_favorites', JSON.stringify(this.favorites));
    } catch (e) {
      console.error('Failed to save favorites', e);
    }
    
    this.listeners.forEach(l => l());
  };
}

const store = new FavoritesStore();

export function useFavorites() {
  const favorites = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getSnapshot);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(store.getIsLoaded());
  }, []);

  const toggleFavorite = useCallback((calc: FavoriteCalc) => {
    store.toggleFavorite(calc);
  }, []);

  const isFavorite = useCallback((href: string) => {
    return favorites.some(f => f.href === href);
  }, [favorites]);

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
