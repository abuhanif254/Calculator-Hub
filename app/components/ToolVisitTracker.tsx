'use client';

import { useEffect } from 'react';
import { useToolHistory } from '@/lib/hooks/useRetention';

interface ToolVisitTrackerProps {
  slug: string;
  title: string;
  type: 'calculator' | 'developer-tool';
  href: string;
}

/**
 * Invisible component that records a tool visit to localStorage history.
 * Drop this into any calculator or tool page to enable
 * "Continue where you left off" and dashboard history.
 */
export function ToolVisitTracker({ slug, title, type, href }: ToolVisitTrackerProps) {
  const { recordVisit } = useToolHistory();

  useEffect(() => {
    recordVisit({ slug, title, type, href });
  }, [slug, title, type, href, recordVisit]);

  return null; // Renders nothing — pure side-effect component
}
