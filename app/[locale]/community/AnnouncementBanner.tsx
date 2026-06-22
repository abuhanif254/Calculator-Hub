'use server';

import React from 'react';
import appletConfig from "@/firebase-applet-config.json";

const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || appletConfig.projectId;
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || appletConfig.apiKey;
const BASE_URL = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

function parseValue(value: any): any {
  if (!value) return null;
  if (value.stringValue !== undefined) return value.stringValue;
  if (value.booleanValue !== undefined) return value.booleanValue;
  if (value.integerValue !== undefined) return parseInt(value.integerValue, 10);
  return null;
}

async function fetchActiveAnnouncement() {
  try {
    const response = await fetch(`${BASE_URL}:runQuery?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        structuredQuery: {
          from: [{ collectionId: 'announcements' }],
          where: {
            fieldFilter: {
              field: { fieldPath: 'isActive' },
              op: 'EQUAL',
              value: { booleanValue: true }
            }
          },
          orderBy: [{ field: { fieldPath: 'createdAt' }, direction: 'DESCENDING' }],
          limit: 1
        }
      }),
      next: { revalidate: 3600 }
    });

    if (!response.ok) return null;
    const data = await response.json();
    if (!data[0]?.document) return null;

    const doc = data[0].document;
    const id = doc.name.split('/').pop() as string;
    const fields = doc.fields || {};

    return {
      id,
      message: parseValue(fields.message) || '',
      type: parseValue(fields.type) || 'info',
      link: parseValue(fields.link) || '',
      linkLabel: parseValue(fields.linkLabel) || 'Learn more',
    };
  } catch {
    return null;
  }
}

const TYPE_STYLES = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    icon: '📢',
    text: 'text-blue-800 dark:text-blue-200',
    link: 'text-blue-700 dark:text-blue-300 underline hover:no-underline font-semibold',
    dismiss: 'text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
    icon: '⚠️',
    text: 'text-amber-800 dark:text-amber-200',
    link: 'text-amber-700 dark:text-amber-300 underline hover:no-underline font-semibold',
    dismiss: 'text-amber-500 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-200',
  },
  success: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
    icon: '✅',
    text: 'text-emerald-800 dark:text-emerald-200',
    link: 'text-emerald-700 dark:text-emerald-300 underline hover:no-underline font-semibold',
    dismiss: 'text-emerald-500 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-200',
  },
} as const;

// Client wrapper for dismiss functionality
import { AnnouncementBannerClient } from './AnnouncementBannerClient';

export async function AnnouncementBanner() {
  const announcement = await fetchActiveAnnouncement();
  if (!announcement || !announcement.message) return null;

  const styles = TYPE_STYLES[announcement.type as keyof typeof TYPE_STYLES] || TYPE_STYLES.info;

  return (
    <AnnouncementBannerClient
      id={announcement.id}
      message={announcement.message}
      link={announcement.link}
      linkLabel={announcement.linkLabel}
      styles={styles}
      icon={styles.icon}
    />
  );
}
