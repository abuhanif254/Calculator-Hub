import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: members, error } = await supabase
      .from('team_members')
      .select('id, email, display_name, role, status, invited_at, joined_at')
      .eq('owner_id', user.id);

    if (error) throw error;

    return NextResponse.json({ members });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { email, role } = await req.json();

    const { data: existing } = await supabase
      .from('team_members')
      .select('id')
      .eq('owner_id', user.id)
      .eq('email', email)
      .single();
    
    if (existing) {
      return NextResponse.json({ error: 'Email already in team' }, { status: 400 });
    }

    const { data: member, error } = await supabase
      .from('team_members')
      .insert({
        owner_id: user.id,
        email,
        role,
        status: 'invited',
        invited_at: new Date().toISOString()
      })
      .select('id, email, display_name, role, status, invited_at, joined_at')
      .single();

    if (error) throw error;

    void writeAudit(user.id, user.email || '', {
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
