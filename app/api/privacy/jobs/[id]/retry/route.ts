import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: job, error: fetchError } = await supabase
      .from('jobs')
      .select('status')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !job) {
      return NextResponse.json({ error: fetchError?.message || 'Job not found' }, { status: 500 });
    }

    if (job.status !== 'failed') {
      return NextResponse.json({ error: 'Only failed jobs can be retried' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('jobs')
      .update({
        status: 'scheduled',
        progress: 0,
        error_message: null,
        started_at: null,
        completed_at: null,
        logs: []
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await writeAudit(user.id, user.email, {
      action: 'JOB_RETRIED',
      category: 'system',
      severity: 'info',
      resource: `jobs:${id}`,
      details: {}
    });

    return NextResponse.json({ job: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
