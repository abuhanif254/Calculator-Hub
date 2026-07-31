import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// ── GET /api/privacy/masking-rules ── List user's rules ───────────────────────
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const connectionId = searchParams.get('connectionId');

    let query = supabase
      .from('masking_rules')
      .select('id, connection_id, connection_name, table_name, column_name, detector_id, detector_name, risk_level, strategy, is_active, created_at')
      .eq('user_id', user.id)
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
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

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
        user_id: user.id,
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

    return NextResponse.json({ rule: data }, { status: 201 });
  } catch (err: any) {
    console.error('[POST /api/privacy/masking-rules]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
