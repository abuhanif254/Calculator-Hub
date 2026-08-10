export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';
import { createClient } from '@/lib/supabase/server';
import { encrypt } from '@/lib/supabase/encryption';
import { writeAudit } from '@/lib/supabase/audit';

// ─── GET /api/privacy/connections ─── List user's connections ────────────────
export async function GET(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('connections')
      .select('id, name, type, host, port, dbname, username, use_ssl, status, last_tested_at, tables_count, created_at')
      .eq('user_id', uid)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ connections: data });
  } catch (err: any) {
    console.error('[GET /api/privacy/connections]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ─── POST /api/privacy/connections ─── Create a new connection ───────────────
export async function POST(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();
    const body = await req.json();
    const { name, type, host, port, dbname, username, password, use_ssl } = body;

    // Validate required fields
    if (!name || !type || !host || !port || !dbname || !username || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (!['postgresql', 'mysql'].includes(type)) {
      return NextResponse.json({ error: 'Unsupported database type' }, { status: 400 });
    }

    // Encrypt the password before storing
    const encrypted_password = encrypt(password);

    const { data, error } = await supabase
      .from('connections')
      .insert({
        user_id: uid,
        name,
        type,
        host,
        port: parseInt(port, 10),
        dbname,
        username,
        encrypted_password,
        use_ssl: use_ssl ?? true,
        status: 'unknown',
      })
      .select('id, name, type, host, port, dbname, username, use_ssl, status, last_tested_at, tables_count, created_at')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'A connection with that name already exists' }, { status: 409 });
      }
      throw error;
    }

    // Audit: connection created
    void writeAudit(uid, email ?? '', {
      action: 'CONNECTION_CREATED', category: 'connection', severity: 'info',
      resource: name,
      details: { type, host, port, dbname },
    });

    return NextResponse.json({ connection: data }, { status: 201 });
  } catch (err: any) {
    console.error('[POST /api/privacy/connections]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
