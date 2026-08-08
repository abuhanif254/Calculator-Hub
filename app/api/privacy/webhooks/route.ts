import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { randomBytes } from 'crypto';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: webhooks, error } = await supabase
      .from('webhooks')
      .select('id, url, events, is_active, last_triggered_at, last_status_code, created_at')
      .eq('user_id', user.id);

    if (error) throw error;

    return NextResponse.json({ webhooks });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { url, events } = await req.json();
    const signing_secret = randomBytes(32).toString('hex');

    const { data: webhook, error } = await supabase
      .from('webhooks')
      .insert({
        user_id: user.id,
        url,
        events,
        signing_secret
      })
      .select('id, url, events, is_active, last_triggered_at, last_status_code, created_at, signing_secret')
      .single();

    if (error) throw error;

    void writeAudit(user.id, user.email || '', {
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
