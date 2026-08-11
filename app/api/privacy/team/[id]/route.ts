import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

const VALID_ROLES = ['admin', 'compliance_officer', 'developer', 'viewer'];

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const body = await req.json();
    const { role } = body;

    if (!VALID_ROLES.includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('team_members')
      .update({ role })
      .eq('id', id)
      .eq('owner_id', uid)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: 'Team member not found' }, { status: 404 });
    }

    await writeAudit(uid, email ?? '', {
      action: 'TEAM_MEMBER_ROLE_CHANGED',
      category: 'system',
      severity: 'info',
      resource: `team_members:${id}`,
      details: { role }
    });

    return NextResponse.json({ member: data });
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

    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', id)
      .eq('owner_id', uid);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await writeAudit(uid, email ?? '', {
      action: 'TEAM_MEMBER_REMOVED',
      category: 'system',
      severity: 'info',
      resource: `team_members:${id}`,
      details: {}
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
