import { ImageResponse } from 'next/og';
import { calculators } from '@/lib/data/calculators';
import { allToolsConfig } from '@/lib/data/tools';

// On-demand dynamic generation with 24-hour CDN caching
export const revalidate = 86400;

export const alt = 'Nexus — Ultimate Calculators & Developer Tools Platform';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const totalCalcs = calculators.length;
  const totalTools = Object.keys(allToolsConfig).length;
  const grandTotal = totalCalcs + totalTools;

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
            width: '550px',
            height: '550px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(81, 130, 49, 0.4) 0%, rgba(81, 130, 49, 0) 70%)',
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
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                backgroundColor: '#518231',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(81, 130, 49, 0.5)',
              }}
            >
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#ffffff' }}>N</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  letterSpacing: '2px',
                  color: '#ffffff',
                }}
              >
                NEXUS CALCULATOR
              </span>
              <span style={{ fontSize: '13px', color: '#94a3b8', letterSpacing: '1.5px' }}>
                PROFESSIONAL CALCULATION & DEV SUITE
              </span>
            </div>
          </div>

          {/* Stat Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 24px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(81, 130, 49, 0.15)',
              border: '1.5px solid rgba(81, 130, 49, 0.4)',
              color: '#86efac',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '1.5px',
            }}
          >
            {`${grandTotal}+ TOOLS & CALCULATORS`}
          </div>
        </div>

        {/* Center Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '1000px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#86efac',
              fontSize: '15px',
              fontWeight: 700,
              letterSpacing: '1px',
            }}
          >
            <span>FREE & OPEN PLATFORM FOR PROFESSIONALS</span>
          </div>
          <h1
            style={{
              fontSize: '62px',
              fontWeight: 900,
              lineHeight: 1.15,
              color: '#ffffff',
              margin: 0,
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            Ultimate Calculators & Developer Tools Platform
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
            Access hundreds of high-precision financial, math, health calculators and developer utilities. Run entirely in your browser with zero latency and 100% privacy.
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
              <span style={{ color: '#cbd5e1', fontSize: '15px', fontWeight: 600 }}>Zero Data Tracking</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#518231', display: 'flex' }} />
              <span style={{ color: '#cbd5e1', fontSize: '15px', fontWeight: 600 }}>Verified Formulas</span>
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
