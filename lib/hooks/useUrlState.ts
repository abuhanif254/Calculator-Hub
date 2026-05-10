'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// ═══════════════════════════════════════════════════════
// URL OBJECT STATE SYNC HOOK (Shareable URLs)
// ═══════════════════════════════════════════════════════
// Syncs a dictionary of values (e.g. calculator inputs)
// to the URL query string.
//
// Allows users to share /mortgage-calculator?price=300000&down=20
// and have it load perfectly for the recipient.
// ═══════════════════════════════════════════════════════

export function useUrlObjectState<T extends Record<string, any>>(
  initialValues: T
): [T, (key: keyof T, val: any) => void] {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Initialize from URL if parameters are present, otherwise use defaults
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValues;
    const newState = { ...initialValues };
    let hasUrlParams = false;

    Object.keys(initialValues).forEach((key) => {
      const param = searchParams.get(key);
      if (param !== null) {
        hasUrlParams = true;
        const originalType = typeof initialValues[key];
        if (originalType === 'number') {
          const num = Number(param);
          (newState as any)[key] = isNaN(num) ? initialValues[key] : num;
        } else if (originalType === 'boolean') {
          (newState as any)[key] = param === 'true';
        } else {
          (newState as any)[key] = param;
        }
      }
    });

    return newState;
  });

  // 2. Set state and sync to URL immediately
  const setUrlState = useCallback(
    (key: keyof T, newValue: any) => {
      setState((prev) => {
        const nextState = { ...prev, [key]: newValue };

        // Sync to URL
        const newParams = new URLSearchParams(window.location.search);
        
        Object.entries(nextState).forEach(([k, v]) => {
          // If value is empty or matches initial default exactly, we omit it from URL to keep links clean
          if (v === '' || v === initialValues[k]) {
            newParams.delete(k);
          } else {
            newParams.set(k, String(v));
          }
        });

        const newUrl = newParams.toString() 
          ? `${pathname}?${newParams.toString()}` 
          : pathname;

        window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);

        return nextState;
      });
    },
    [initialValues, pathname]
  );

  return [state, setUrlState];
}
