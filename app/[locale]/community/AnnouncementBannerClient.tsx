'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface BannerStyles {
  bg: string;
  text: string;
  link: string;
  dismiss: string;
}

interface Props {
  id: string;
  message: string;
  link?: string;
  linkLabel?: string;
  styles: BannerStyles;
  icon: string;
}

const DISMISSED_KEY = 'nexus_dismissed_announcements';

export function AnnouncementBannerClient({ id, message, link, linkLabel, styles, icon }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if this specific announcement was already dismissed
    try {
      const dismissed: string[] = JSON.parse(localStorage.getItem(DISMISSED_KEY) || '[]');
      if (!dismissed.includes(id)) {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, [id]);

  const dismiss = () => {
    setVisible(false);
    try {
      const dismissed: string[] = JSON.parse(localStorage.getItem(DISMISSED_KEY) || '[]');
      if (!dismissed.includes(id)) {
        dismissed.push(id);
        localStorage.setItem(DISMISSED_KEY, JSON.stringify(dismissed));
      }
    } catch {}
  };

  if (!visible) return null;

  return (
    <div
      className={`
        w-full border-b ${styles.bg} 
        animate-in slide-in-from-top duration-300
      `}
      role="alert"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <div className={`flex items-center gap-2.5 text-sm ${styles.text} flex-1 min-w-0`}>
          <span className="text-base flex-shrink-0" aria-hidden="true">{icon}</span>
          <p className="leading-snug">
            {message}
            {link && (
              <>
                {' '}
                <a
                  href={link}
                  target={link.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  {linkLabel || 'Learn more'} →
                </a>
              </>
            )}
          </p>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss announcement"
          className={`flex-shrink-0 p-1 rounded-md transition-colors ${styles.dismiss}`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
