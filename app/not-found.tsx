// Required by next-intl to handle 404s outside the [locale] folder
// and to fix build errors when notFound() is called in dynamic routes.
// Must be a Server Component (no 'use client') to render <html>/<body>.
export default function GlobalNotFound() {
  return (
    <html>
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <h1 style={{ fontSize: '3rem', margin: '0' }}>404</h1>
          <p>Page Not Found</p>
          <a
            href="/"
            style={{ marginTop: '1rem', color: '#518231', textDecoration: 'none' }}
          >
            Return Home
          </a>
        </div>
      </body>
    </html>
  );
}
