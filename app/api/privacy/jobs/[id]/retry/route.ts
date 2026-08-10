export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const { data: job, error: fetchError } = await supabase
      .from('jobs')
      .select('status')
      .eq('id', id)
      .eq('user_id', uid)
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
      .eq('user_id', uid)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await writeAudit(uid, email ?? '', {
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
