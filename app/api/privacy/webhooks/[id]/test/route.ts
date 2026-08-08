import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createHmac } from 'crypto';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: webhook, error } = await supabase
      .from('webhooks')
      .select('id, url, signing_secret')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    if (!webhook) return NextResponse.json({ error: 'Webhook not found' }, { status: 404 });

    const payload = {
      event: 'test.ping',
      timestamp: new Date().toISOString(),
      webhook_id: webhook.id
    };

    const signature = createHmac('sha256', webhook.signing_secret)
      .update(JSON.stringify(payload))
      .digest('hex');

    let status = 0;
    try {
      const response = await fetch(webhook.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Privacy-Signature': `sha256=${signature}`
        },
        body: JSON.stringify(payload)
      });
      status = response.status;
    } catch (fetchError: any) {
      status = 0; 
    }

    await supabase
      .from('webhooks')
      .update({
        last_triggered_at: new Date().toISOString(),
        last_status_code: status
      })
      .eq('id', webhook.id)
      .eq('user_id', user.id);

    return NextResponse.json({ success: true, status, url: webhook.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
