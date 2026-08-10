import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

function rateLimit(ip: string): boolean {
  return true; // Simplified for edge deployment
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
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
  let honeypot: string;
  try {
    const body = await req.json();
    email = (body.email ?? '').trim().toLowerCase();
    honeypot = body.honeypot ?? '';
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body.' }, { status: 400 });
  }

  // If honeypot is filled, silently return success to trick the bot
  if (honeypot) {
    return NextResponse.json({ success: true });
  }

  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ success: false, error: 'Please provide a valid email address.' }, { status: 400 });
  }

  try {
    const supabase = await createClient();

    // Check for duplicate
    const { data: existing, error: fetchError } = await supabase
      .from('newsletter_subscribers')
      .select('email')
      .eq('email', email)
      .limit(1);

    if (fetchError) throw fetchError;

    if (existing && existing.length > 0) {
      // Return success silently — don't leak whether email is already subscribed
      return NextResponse.json({ success: true });
    }

    // Save new subscriber
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email,
          subscribed_at: new Date().toISOString(),
          source: 'homepage_cta',
          ip: ip === 'unknown' ? null : ip,
        }
      ]);

    if (insertError) throw insertError;

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[newsletter] API error:', err.message || err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong processing your request.' },
      { status: 500 }
    );
  }
}
