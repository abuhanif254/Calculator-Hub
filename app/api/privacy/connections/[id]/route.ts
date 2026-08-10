export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

// ─── DELETE /api/privacy/connections/[id] ─── Delete a connection ────────────
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
      .from('connections')
      .delete()
      .eq('id', id)
      .eq('user_id', uid); // RLS double-check

    if (error) throw error;
    void writeAudit(uid, email ?? '', {
      action: 'CONNECTION_DELETED', category: 'connection', severity: 'warning',
      resource: id, details: { connection_id: id },
    });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[DELETE /api/privacy/connections/[id]]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
