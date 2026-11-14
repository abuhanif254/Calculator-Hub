import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community Moderation | NexusCalculator',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CommunityAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
