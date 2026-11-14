import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Discussion | NexusCalculator',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CommunityEditPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
