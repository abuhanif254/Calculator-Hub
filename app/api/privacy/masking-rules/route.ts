export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

// ── GET /api/privacy/masking-rules ── List user's rules ───────────────────────
export async function GET(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const { searchParams } = new URL(req.url);
    const connectionId = searchParams.get('connectionId');

    let query = supabase
      .from('masking_rules')
      .select('id, connection_id, connection_name, table_name, column_name, detector_id, detector_name, risk_level, strategy, is_active, created_at')
      .eq('user_id', uid)
      .order('created_at', { ascending: false });

    if (connectionId) query = query.eq('connection_id', connectionId);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json({ rules: data ?? [] });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── POST /api/privacy/masking-rules ── Create a rule ─────────────────────────
export async function POST(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const body = await req.json();
    const {
      connection_id, connection_name,
      table_name, column_name,
      detector_id, detector_name,
      risk_level, strategy,
    } = body;

    if (!table_name || !column_name || !detector_id || !strategy) {
      return NextResponse.json({ error: 'table_name, column_name, detector_id and strategy are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('masking_rules')
      .insert({
        user_id: uid,
        connection_id: connection_id || null,
        connection_name: connection_name || null,
        table_name, column_name,
        detector_id, detector_name,
        risk_level, strategy,
        is_active: true,
      })
      .select('id, connection_id, connection_name, table_name, column_name, detector_id, detector_name, risk_level, strategy, is_active, created_at')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'A rule for this column already exists. Edit the existing one.' }, { status: 409 });
      }
      throw error;
    }

    void writeAudit(uid, email ?? '', {
      action: 'RULE_CREATED', category: 'rule', severity: 'info',
      resource: `${table_name}.${column_name}`,
      details: { detector_id, strategy, risk_level, connection_name },
    });

    return NextResponse.json({ rule: data }, { status: 201 });
  } catch (err: any) {
    console.error('[POST /api/privacy/masking-rules]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
