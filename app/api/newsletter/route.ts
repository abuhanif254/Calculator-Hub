import { NextRequest, NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// ── Simple in-memory rate limiter: 3 requests per IP per 10 minutes ──
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const WINDOW = 10 * 60 * 1000; // 10 minutes
  const LIMIT = 3;
  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW });
    return true;
  }
  if (record.count >= LIMIT) return false;
  record.count += 1;
  return true;
}

// ── Email validation ──────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

// ── Lazy-init Firebase Admin (works in Next.js edge/serverless) ───────
function getAdminDb() {
  const apps = getApps();
  if (!apps.length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
  return getFirestore();
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let email: string;
  try {
    const body = await req.json();
    email = (body.email ?? '').trim().toLowerCase();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ success: false, error: 'Please provide a valid email address.' }, { status: 400 });
  }

  try {
    const db = getAdminDb();
    const col = db.collection('newsletter_subscribers');

    // Check for duplicate
    const existing = await col.where('email', '==', email).limit(1).get();
    if (!existing.empty) {
      // Return success silently — don't leak whether email is already subscribed
      return NextResponse.json({ success: true });
    }

    // Save new subscriber
    await col.add({
      email,
      subscribedAt: new Date().toISOString(),
      source: 'homepage_cta',
      ip: ip === 'unknown' ? null : ip,
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('[newsletter] Firestore error:', err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
