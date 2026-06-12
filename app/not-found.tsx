'use client';
import Link from 'next/link';

// This is required by next-intl to handle 404s outside the [locale] folder
// and to fix build errors when notFound() is called in dynamic routes.
export default function GlobalNotFound() {
  return (
    <html>
      <body>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ fontSize: '3rem', margin: '0' }}>404</h1>
          <p>Page Not Found</p>
          <Link href="/" style={{ marginTop: '1rem', color: '#518231', textDecoration: 'none' }}>Return Home</Link>
        </div>
      </body>
    </html>
  );
}
