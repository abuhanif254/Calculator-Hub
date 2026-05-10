"use client";
import { useEffect } from "react";

interface Shortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  action: () => void;
  label: string;
}

/**
 * Hook that registers global keyboard shortcuts for tool pages.
 *
 * Usage:
 * ```ts
 * useToolShortcuts([
 *   { key: 'Enter', ctrl: true, action: handleFormat, label: 'Format' },
 *   { key: 's', ctrl: true, action: handleSave, label: 'Save' },
 *   { key: 'l', ctrl: true, action: handleClear, label: 'Clear' },
 * ]);
 * ```
 */
export function useToolShortcuts(shortcuts: Shortcut[]) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input/textarea
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        // Allow Ctrl+Enter even in textareas (common "submit" pattern)
        if (!(e.key === "Enter" && e.ctrlKey)) return;
      }

      for (const s of shortcuts) {
        if (
          e.key.toLowerCase() === s.key.toLowerCase() &&
          !!e.ctrlKey === !!s.ctrl &&
          !!e.shiftKey === !!s.shift &&
          !!e.altKey === !!s.alt
        ) {
          e.preventDefault();
          s.action();
          return;
        }
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts]);
}
