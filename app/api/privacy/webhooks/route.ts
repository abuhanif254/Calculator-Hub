import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { randomBytesHex } from '@/lib/crypto-edge';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

export async function GET(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const { data: webhooks, error } = await supabase
      .from('webhooks')
      .select('id, url, events, is_active, last_triggered_at, last_status_code, created_at')
      .eq('user_id', uid);

    if (error) throw error;

    return NextResponse.json({ webhooks });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const { url, events } = await req.json();
    const signing_secret = await randomBytesHex(32);

    const { data: webhook, error } = await supabase
      .from('webhooks')
      .insert({
        user_id: uid,
        url,
        events,
        signing_secret
      })
      .select('id, url, events, is_active, last_triggered_at, last_status_code, created_at, signing_secret')
      .single();

    if (error) throw error;

    void writeAudit(uid, email ?? '', {
      action: 'WEBHOOK_CREATED',
      category: 'system',
      severity: 'info',
      resource: url,
      details: { events }
    });

    return NextResponse.json({ webhook });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
