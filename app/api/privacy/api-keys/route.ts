import { NextRequest, NextResponse } from 'next/server';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { randomBytesHex, sha256Hex } from '@/lib/crypto-edge';

export async function GET(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const { data: keys, error } = await supabase
      .from('api_keys')
      .select('id, name, key_prefix, permissions, last_used_at, created_at, expires_at')
      .eq('user_id', uid);

    if (error) throw error;

    return NextResponse.json({ keys });
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
    const { name, permissions } = body;

    const rawKey = await randomBytesHex(24);
    const key = `pk_live_${rawKey}`;
    const key_prefix = key.slice(0, 16) + '***';
    const key_hash = await sha256Hex(key);

    const { data: dbRecord, error } = await supabase
      .from('api_keys')
      .insert({
        user_id: uid,
        name,
        permissions,
        key_prefix,
        key_hash
      })
      .select('id, name, key_prefix, permissions, last_used_at, created_at, expires_at')
      .single();

    if (error) throw error;

    void writeAudit(uid, email ?? '', {
      action: 'API_KEY_CREATED',
      category: 'system',
      severity: 'info',
      resource: `api_keys/${dbRecord.id}`,
      details: { name }
    });

    return NextResponse.json({ key: { ...dbRecord, full_key: key } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
