import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { encrypt } from '@/lib/supabase/encryption';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

export async function GET(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const { data: secrets, error } = await supabase
      .from('secrets')
      .select('id, name, type, rotation_reminder_days, last_rotated_at, created_at')
      .eq('user_id', uid);

    if (error) throw error;

    return NextResponse.json({ secrets });
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
    const { name, type, value, rotation_reminder_days } = body;

    const encrypted_value = await encrypt(value);

    const { data: secret, error } = await supabase
      .from('secrets')
      .insert({
        user_id: uid,
        name,
        type,
        encrypted_value,
        rotation_reminder_days,
        last_rotated_at: new Date().toISOString()
      })
      .select('id, name, type, rotation_reminder_days, last_rotated_at, created_at')
      .single();

    if (error) throw error;

    void writeAudit(uid, email ?? '', {
      action: 'SECRET_CREATED',
      category: 'system',
      severity: 'info',
      resource: `secrets/${secret.id}`,
      details: { name, type }
    });

    return NextResponse.json({ secret });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
