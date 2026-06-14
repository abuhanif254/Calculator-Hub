import React from 'react';

// Next.js requires a root layout, even if we use [locale]/layout.tsx
// We just pass through children. The html/body tags are in [locale]/layout.tsx
// and app/not-found.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
