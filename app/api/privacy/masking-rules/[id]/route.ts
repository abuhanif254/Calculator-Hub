import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';

// ── PATCH /api/privacy/masking-rules/[id] ── Update strategy or toggle ────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    // Only allow updating strategy and is_active
    const updates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (body.strategy !== undefined) updates.strategy = body.strategy;
    if (body.is_active !== undefined) updates.is_active = body.is_active;

    const { data, error } = await supabase
      .from('masking_rules')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select('id, strategy, is_active')
      .single();

    if (error) throw error;
    void writeAudit(user.id, user.email, {
      action: 'RULE_UPDATED', category: 'rule', severity: 'info',
      resource: id,
      details: { changes: updates },
    });
    return NextResponse.json({ rule: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── DELETE /api/privacy/masking-rules/[id] ── Delete a rule ──────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { error } = await supabase
      .from('masking_rules')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;
    void writeAudit(user.id, user.email, {
      action: 'RULE_DELETED', category: 'rule', severity: 'warning',
      resource: id, details: { rule_id: id },
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
