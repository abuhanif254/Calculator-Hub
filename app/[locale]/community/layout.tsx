import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AnnouncementBanner } from './AnnouncementBanner';
import { KeyboardShortcuts } from './KeyboardShortcuts';

// This layout wraps all /community/* pages and injects the announcement banner
export default async function CommunityLayout({ children }: { children: React.ReactNode }) {
  const messages = (await getMessages()) as Record<string, any>;
  return (
    <NextIntlClientProvider messages={{ Community: messages?.Community }}>
      <KeyboardShortcuts>
        <AnnouncementBanner />
        {children}
      </KeyboardShortcuts>
    </NextIntlClientProvider>
  );
}
