import { ImageResponse } from 'next/og';
import { getToolConfig, allToolsConfig } from '@/lib/data/tools';
import { routing } from '@/i18n/routing';

// On-demand dynamic generation with 24-hour CDN caching
export const revalidate = 86400;

export const alt = 'Nexus Developer Tools';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

function sanitizeForOg(text: string): string {
  if (!text) return '';
  return text
    .replace(/√/g, 'sqrt')
    .replace(/ρ/g, 'rho')
    .replace(/θ/g, 'theta')
    .replace(/φ/g, 'phi')
    .replace(/μ/g, 'u')
    .replace(/Δ/g, 'Delta')
    .replace(/➔/g, '->')
    .replace(/²/g, '^2')
    .replace(/³/g, '^3')
    .replace(/·/g, ' * ')
    .replace(/½/g, '1/2')
    .replace(/[–—]/g, '-')
    .replace(/[""]/g, '"')
    .replace(/['']/g, "'")
    .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const config = getToolConfig(slug);

  const rawTitle = config?.title || 'Developer Tool';
  const rawCategory = (config?.category || 'Developer Utility').toUpperCase();
  const rawDesc = config?.shortDescription || 'Free, browser-based online developer utility with client-side processing.';

  const title = sanitizeForOg(rawTitle);
  const category = sanitizeForOg(rawCategory);
  const description = sanitizeForOg(rawDesc);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#090d16',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
          backgroundSize: '100px 100px',
          color: '#ffffff',
          padding: '60px 80px',
          justifyContent: 'space-between',
          position: 'relative',
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: '-150px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.35) 0%, rgba(14, 165, 233, 0) 70%)',
            display: 'flex',
          }}
        />

        {/* Top Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Logo & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)',
              }}
            >
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff' }}>&lt;/&gt;</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '22px',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  color: '#ffffff',
                }}
              >
                NEXUS DEVTOOLS
              </span>
              <span style={{ fontSize: '13px', color: '#94a3b8', letterSpacing: '1px' }}>
                BROWSER-BASED • ZERO SERVER UPLOAD • PRIVATE
              </span>
            </div>
          </div>

          {/* Category Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '8px 20px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(14, 165, 233, 0.15)',
              border: '1.5px solid rgba(14, 165, 233, 0.4)',
              color: '#7dd3fc',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '1.5px',
            }}
          >
            {category}
          </div>
        </div>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '1000px' }}>
          <h1
            style={{
              fontSize: title.length > 30 ? '52px' : '64px',
              fontWeight: 900,
              lineHeight: 1.15,
              color: '#ffffff',
              margin: 0,
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {title}
          </h1>
          <p
            style={{
              fontSize: '22px',
              lineHeight: 1.45,
              color: '#94a3b8',
              margin: 0,
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {description.length > 140 ? `${description.slice(0, 137)}...` : description}
          </p>
        </div>

        {/* Bottom Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Trust badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#38bdf8', display: 'flex' }} />
              <span style={{ color: '#cbd5e1', fontSize: '15px', fontWeight: 600 }}>100% Client-Side Private</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#38bdf8', display: 'flex' }} />
              <span style={{ color: '#cbd5e1', fontSize: '15px', fontWeight: 600 }}>Zero Data Storage</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#38bdf8', display: 'flex' }} />
              <span style={{ color: '#cbd5e1', fontSize: '15px', fontWeight: 600 }}>Instant Export</span>
            </div>
          </div>

          {/* Domain */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#7dd3fc',
              fontSize: '16px',
              fontWeight: 700,
            }}
          >
            <span>www.nexuscalculator.net</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
