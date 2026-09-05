'use client';

import { useEffect } from 'react';

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
    'input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="reset"]), select, textarea'
  );

  elements.forEach((el, index) => {
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
 * Automatically inspects the URL query string on mount and populates
 * calculator inputs using React prototype setters to trigger math recalculation.
 */
export function useCalculatorUrlHydration(containerId: string = 'calculator-export-target') {
  useEffect(() => {
    if (typeof window === 'undefined' || !window.location.search) return;

    const params = new URLSearchParams(window.location.search);
    if ([...params.keys()].length === 0) return;

    // Small delay to ensure dynamic/client component is completely mounted and in DOM
    const timer = setTimeout(() => {
      const container = document.getElementById(containerId);
      if (!container) return;

      const elements = container.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        'input, select, textarea'
      );

      params.forEach((paramValue, paramKey) => {
        // Find matching element
        let matchedEl: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null = null;

        // Try exact ID match
        matchedEl = container.querySelector(`#${CSS.escape(paramKey)}`);

        // Try exact Name match
        if (!matchedEl) {
          matchedEl = container.querySelector(`[name="${CSS.escape(paramKey)}"]`);
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
    }, 150);

    return () => clearTimeout(timer);
  }, [containerId]);
}
