import { ImageResponse } from 'next/og';
import { getCalculatorBySlug, calculators } from '@/lib/data/calculators';
import { routing } from '@/i18n/routing';

// SSG configuration — fully pre-rendered static images at build time
export const revalidate = false;
export const dynamicParams = false;

export const alt = 'Nexus Calculator Hub';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export async function generateStaticParams() {
  const params: { slug: string; locale: string }[] = [];
  const seen = new Set<string>();

  routing.locales.forEach((locale) => {
    calculators.forEach((calc) => {
      const isExplicitlyMapped = `/calculators/${calc.slug}` in routing.pathnames;
      const localizedSlug = calc.slugs?.[locale as keyof typeof calc.slugs];

      const enKey = `${locale}::${calc.slug}`;
      if (!seen.has(enKey)) {
        seen.add(enKey);
        params.push({ slug: calc.slug, locale });
      }

      if (isExplicitlyMapped && localizedSlug && localizedSlug !== calc.slug) {
        const localKey = `${locale}::${localizedSlug}`;
        if (!seen.has(localKey)) {
          seen.add(localKey);
          params.push({ slug: localizedSlug, locale });
        }
      }
    });
  });

  return params;
}

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
  const calc = getCalculatorBySlug(slug);

  const rawTitle = calc?.title || 'Online Calculator';
  const rawCategory = (calc?.category || 'Utility').toUpperCase();
  const rawDesc = calc?.description || 'Fast, free, and accurate calculation tool on Nexus Calculator Hub.';

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
            background: 'radial-gradient(circle, rgba(81, 130, 49, 0.35) 0%, rgba(81, 130, 49, 0) 70%)',
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
                backgroundColor: '#518231',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(81, 130, 49, 0.4)',
              }}
            >
              <span style={{ fontSize: '26px', fontWeight: 'bold', color: '#ffffff' }}>N</span>
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
                NEXUS CALCULATOR
              </span>
              <span style={{ fontSize: '13px', color: '#94a3b8', letterSpacing: '1px' }}>
                ACCURATE • FREE • INSTANT
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
              backgroundColor: 'rgba(81, 130, 49, 0.15)',
              border: '1.5px solid rgba(81, 130, 49, 0.4)',
              color: '#86efac',
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
              fontSize: title.length > 30 ? '54px' : '64px',
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
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#518231', display: 'flex' }} />
              <span style={{ color: '#cbd5e1', fontSize: '15px', fontWeight: 600 }}>100% Free & Private</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#518231', display: 'flex' }} />
              <span style={{ color: '#cbd5e1', fontSize: '15px', fontWeight: 600 }}>Real-Time Formula Engine</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#518231', display: 'flex' }} />
              <span style={{ color: '#cbd5e1', fontSize: '15px', fontWeight: 600 }}>Verified Accuracy</span>
            </div>
          </div>

          {/* Domain */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#86efac',
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
