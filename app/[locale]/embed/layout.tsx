import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
    },
  },
};

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Hide global navigation and footer in embed mode */
          #global-header, #global-footer { display: none !important; }
          
          /* Remove background and padding from global content for seamless embedding */
          body { background: transparent !important; }
          #global-content { padding: 0 !important; }
        `
      }} />
      <div className="embed-container w-full h-full p-2 md:p-4 bg-transparent">
        {children}
      </div>
    </>
  );
}
