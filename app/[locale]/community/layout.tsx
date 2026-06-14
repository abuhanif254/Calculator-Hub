import React from 'react';
import { AnnouncementBanner } from './AnnouncementBanner';
import { KeyboardShortcuts } from './KeyboardShortcuts';

// This layout wraps all /community/* pages and injects the announcement banner
export default async function CommunityLayout({ children }: { children: React.ReactNode }) {
  return (
    <KeyboardShortcuts>
      <AnnouncementBanner />
      {children}
    </KeyboardShortcuts>
  );
}
