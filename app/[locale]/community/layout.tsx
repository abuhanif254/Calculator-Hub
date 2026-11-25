import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { AnnouncementBanner } from './AnnouncementBanner';
import { KeyboardShortcuts } from './KeyboardShortcuts';

// This layout wraps all /community/* pages and injects the announcement banner.
// Calling setRequestLocale(locale) BEFORE getMessages({ locale }) prevents next-intl
// from reading dynamic request headers() and preserves ISR/Edge caching across all /community/* routes.
export default async function CommunityLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = (await getMessages({ locale })) as Record<string, any>;
  return (
    <NextIntlClientProvider locale={locale} messages={{ Community: messages?.Community }}>
      <KeyboardShortcuts>
        <AnnouncementBanner />
        {children}
      </KeyboardShortcuts>
    </NextIntlClientProvider>
  );
}
