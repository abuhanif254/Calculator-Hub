export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';

export async function GET(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    let query = supabase
      .from('jobs')
      .select('id, name, type, status, progress, connection_name, rows_processed, findings_count, duration_ms, cron_schedule, is_paused, error_message, started_at, completed_at, created_at', { count: 'exact' })
      .eq('user_id', uid)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (status) {
      query = query.eq('status', status);
    }
    if (type) {
      query = query.eq('type', type);
    }

    const { data, count, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ jobs: data, total: count });
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
    const body = await req.json();
    const { name, type, connection_id, connection_name, selected_tables, cron_schedule } = body;

    const { data, error } = await supabase
      .from('jobs')
      .insert({
        user_id: uid,
        name,
        type,
        connection_id,
        connection_name,
        selected_tables,
        cron_schedule,
        status: 'scheduled',
        progress: 0,
        logs: []
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await writeAudit(uid, email ?? '', {
      action: 'JOB_CREATED',
      category: 'system',
      severity: 'info',
      resource: `jobs:${data.id}`,
      details: { name, type }
    });

    return NextResponse.json({ job: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
