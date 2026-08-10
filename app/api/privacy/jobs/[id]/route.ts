export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .eq('user_id', uid)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ job: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

    if (job.status === 'running') {
      const { error } = await supabase
        .from('jobs')
        .update({ status: 'cancelled' })
        .eq('id', id)
        .eq('user_id', uid);

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    } else if (job.status === 'scheduled') {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id)
        .eq('user_id', uid);

      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await writeAudit(uid, email ?? '', {
      action: 'JOB_CANCELLED',
      category: 'system',
      severity: 'info',
      resource: `jobs:${id}`,
      details: {}
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
