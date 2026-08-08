import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { url, events, is_active } = await req.json();

    const { data: webhook, error } = await supabase
      .from('webhooks')
      .update({ url, events, is_active })
      .eq('id', id)
      .eq('user_id', user.id)
      .select('id, url, events, is_active, last_triggered_at, last_status_code, created_at')
      .single();

    if (error) throw error;

    void writeAudit(user.id, user.email || '', {
      action: 'WEBHOOK_UPDATED',
      category: 'system',
      severity: 'info',
      resource: id,
      details: { url, events, is_active }
    });

    return NextResponse.json({ webhook });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { error } = await supabase
      .from('webhooks')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;

    void writeAudit(user.id, user.email || '', {
      action: 'WEBHOOK_DELETED',
      category: 'system',
      severity: 'info',
      resource: id,
      details: {}
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
