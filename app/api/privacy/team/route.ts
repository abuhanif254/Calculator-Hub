export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

export async function GET(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const { data: members, error } = await supabase
      .from('team_members')
      .select('id, email, display_name, role, status, invited_at, joined_at')
      .eq('owner_id', uid);

    if (error) throw error;

    return NextResponse.json({ members });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email: userEmail } = privacyUser;

    const supabase = await createClient();

    const { email, role } = await req.json();

    const { data: existing } = await supabase
      .from('team_members')
      .select('id')
      .eq('owner_id', uid)
      .eq('email', email)
      .single();
    
    if (existing) {
      return NextResponse.json({ error: 'Email already in team' }, { status: 400 });
    }

    const { data: member, error } = await supabase
      .from('team_members')
      .insert({
        owner_id: uid,
        email,
        role,
        status: 'invited',
        invited_at: new Date().toISOString()
      })
      .select('id, email, display_name, role, status, invited_at, joined_at')
      .single();

    if (error) throw error;

    void writeAudit(uid, userEmail ?? '', {
      action: 'TEAM_MEMBER_INVITED',
      category: 'system',
      severity: 'info',
      resource: email,
      details: { role }
    });

    return NextResponse.json({ member });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
