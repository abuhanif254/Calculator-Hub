export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

// ── PATCH /api/privacy/masking-rules/[id] ── Update strategy or toggle ────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const body = await req.json();
    // Only allow updating strategy and is_active
    const updates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (body.strategy !== undefined) updates.strategy = body.strategy;
    if (body.is_active !== undefined) updates.is_active = body.is_active;

    const { data, error } = await supabase
      .from('masking_rules')
      .update(updates)
      .eq('id', id)
      .eq('user_id', uid)
      .select('id, strategy, is_active')
      .single();

    if (error) throw error;
    void writeAudit(uid, email ?? '', {
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
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const { error } = await supabase
      .from('masking_rules')
      .delete()
      .eq('id', id)
      .eq('user_id', uid);

    if (error) throw error;
    void writeAudit(uid, email ?? '', {
      action: 'RULE_DELETED', category: 'rule', severity: 'warning',
      resource: id, details: { rule_id: id },
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
