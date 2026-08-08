import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { createHash, randomBytes } from 'crypto';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: keys, error } = await supabase
      .from('api_keys')
      .select('id, name, key_prefix, permissions, last_used_at, created_at, expires_at')
      .eq('user_id', user.id);

    if (error) throw error;

    return NextResponse.json({ keys });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { name, permissions } = body;

    const rawKey = randomBytes(24).toString('hex');
    const key = `pk_live_${rawKey}`;
    const key_prefix = key.slice(0, 16) + '***';
    const key_hash = createHash('sha256').update(key).digest('hex');

    const { data: dbRecord, error } = await supabase
      .from('api_keys')
      .insert({
        user_id: user.id,
        name,
        permissions,
        key_prefix,
        key_hash
      })
      .select('id, name, key_prefix, permissions, last_used_at, created_at, expires_at')
      .single();

    if (error) throw error;

    void writeAudit(user.id, user.email, {
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
