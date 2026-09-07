'use client';

import { useEffect, useRef } from 'react';

/**
 * Global flag to prevent URL synchronization from overwriting URL parameters
 * during initial hydration.
 */
let isHydratingState = false;

/**
 * Universal helper to extract all active input/select values from a calculator container
 * and convert them into clean URL query parameters for sharing.
 */
export function serializeCalculatorInputs(containerId: string = 'calculator-export-target'): URLSearchParams {
  const params = new URLSearchParams();
  if (typeof window === 'undefined') return params;

  const container = document.getElementById(containerId);
  if (!container) return params;

  const elements = container.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]):not([data-no-serialize]), select:not([data-no-serialize]), textarea:not([data-no-serialize])'
  );

  elements.forEach((el, index) => {
    // Ignore elements nested inside modals or explicit no-serialize containers
    if (el.closest('.no-serialize') || el.closest('[role="dialog"]')) return;

    // 1. Determine parameter key: prefer id, then name, then sanitized label text, then fallback index
    let key = el.id || el.name;
    if (!key) {
      // Try to find an associated label
      const label = el.closest('label') || container.querySelector(`label[for="${el.id}"]`);
      if (label && label.textContent) {
        key = label.textContent.trim().toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/^_+|_+$/g, '');
      }
    }
    if (!key) {
      key = `field_${index}`;
    }

    // 2. Extract value
    if (el instanceof HTMLInputElement && (el.type === 'checkbox' || el.type === 'radio')) {
      if (el.type === 'checkbox') {
        params.set(key, el.checked ? 'true' : 'false');
      } else if (el.checked) {
        params.set(key, el.value);
      }
    } else if (el.value !== undefined && el.value !== '') {
      params.set(key, el.value);
    }
  });

  return params;
}

/**
 * Helper to hydrate container inputs from query parameters.
 */
function applyParamsToContainer(container: HTMLElement, params: URLSearchParams) {
  const elements = container.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
    'input, select, textarea'
  );

  params.forEach((paramValue, paramKey) => {
    // Find matching element
    let matchedEl: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null = null;

    // Try exact ID match
    try {
      matchedEl = container.querySelector(`#${CSS.escape(paramKey)}`);
    } catch {
      matchedEl = null;
    }

    // Try exact Name match
    if (!matchedEl) {
      try {
        matchedEl = container.querySelector(`[name="${CSS.escape(paramKey)}"]`);
      } catch {
        matchedEl = null;
      }
    }

    // Try case-insensitive attribute match
    if (!matchedEl) {
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        if (
          (el.id && el.id.toLowerCase() === paramKey.toLowerCase()) ||
          (el.name && el.name.toLowerCase() === paramKey.toLowerCase())
        ) {
          matchedEl = el;
          break;
        }
      }
    }

    if (matchedEl) {
      if (matchedEl instanceof HTMLInputElement && (matchedEl.type === 'checkbox' || matchedEl.type === 'radio')) {
        const isChecked = paramValue === 'true' || paramValue === '1' || matchedEl.value === paramValue;
        const checkedSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'checked')?.set;
        if (checkedSetter) {
          checkedSetter.call(matchedEl, isChecked);
        } else {
          matchedEl.checked = isChecked;
        }
        matchedEl.dispatchEvent(new Event('change', { bubbles: true }));
      } else {
        const proto =
          matchedEl instanceof HTMLSelectElement
            ? window.HTMLSelectElement.prototype
            : matchedEl instanceof HTMLTextAreaElement
            ? window.HTMLTextAreaElement.prototype
            : window.HTMLInputElement.prototype;

        const setter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
        if (setter) {
          setter.call(matchedEl, paramValue);
        } else {
          matchedEl.value = paramValue;
        }
        matchedEl.dispatchEvent(new Event('input', { bubbles: true }));
        matchedEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });
}

/**
 * Automatically inspects the URL query string on mount and populates
 * calculator inputs using React prototype setters to trigger math recalculation.
 */
export function useCalculatorUrlHydration(containerId: string = 'calculator-export-target') {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.location.search) return;

    const params = new URLSearchParams(window.location.search);
    if ([...params.keys()].length === 0) return;

    isHydratingState = true;

    // Multi-pass hydration: run at 100ms and 350ms to ensure lazy loaded components are ready
    const timer1 = setTimeout(() => {
      const container = document.getElementById(containerId);
      if (container) {
        applyParamsToContainer(container, params);
      }
    }, 100);

    const timer2 = setTimeout(() => {
      const container = document.getElementById(containerId);
      if (container) {
        applyParamsToContainer(container, params);
      }
      isHydratingState = false;
    }, 350);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      isHydratingState = false;
    };
  }, [containerId]);
}

/**
 * Silently synchronizes active input changes in the calculator to the URL query string
 * using window.history.replaceState (debounced).
 */
export function useCalculatorUrlSync(
  containerId: string = 'calculator-export-target',
  debounceMs: number = 400
) {
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = document.getElementById(containerId);
    if (!container) return;

    const handleInteraction = () => {
      if (isHydratingState) return;

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      debounceTimerRef.current = setTimeout(() => {
        try {
          const newParams = serializeCalculatorInputs(containerId);
          const currentSearch = window.location.search;
          const newSearchStr = newParams.toString() ? `?${newParams.toString()}` : '';

          // Only replaceState if parameters have meaningfully changed
          if (currentSearch !== newSearchStr) {
            const newUrl = `${window.location.pathname}${newSearchStr}${window.location.hash}`;
            window.history.replaceState({ ...window.history.state }, '', newUrl);
          }
        } catch (e) {
          console.debug('Failed to sync calculator state to URL:', e);
        }
      }, debounceMs);
    };

    container.addEventListener('input', handleInteraction);
    container.addEventListener('change', handleInteraction);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      container.removeEventListener('input', handleInteraction);
      container.removeEventListener('change', handleInteraction);
    };
  }, [containerId, debounceMs]);
}

/**
 * Combined hook: Hydrates inputs on page load from URL parameters,
 * and continuously syncs subsequent user inputs back to the URL.
 */
export function useCalculatorStateSync(
  containerId: string = 'calculator-export-target',
  debounceMs: number = 400
) {
  useCalculatorUrlHydration(containerId);
  useCalculatorUrlSync(containerId, debounceMs);
}
