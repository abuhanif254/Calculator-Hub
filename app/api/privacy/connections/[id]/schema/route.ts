import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { decrypt } from '@/lib/supabase/encryption';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

export interface SchemaTable {
  name: string;
  rowCount: number | null;
  columns: SchemaColumn[];
}

export interface SchemaColumn {
  name: string;
  dataType: string;
  nullable: boolean;
  maxLength: number | null;
}

// â”€â”€ GET /api/privacy/connections/[id]/schema â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    // Fetch connection (RLS ensures ownership)
    const { data: conn, error: fetchError } = await supabase
      .from('connections')
      .select('*')
      .eq('id', id)
      .eq('user_id', uid)
      .single();

    if (fetchError || !conn) {
      return NextResponse.json({ error: 'Connection not found' }, { status: 404 });
    }

    let password: string;
    try {
      password = await decrypt(conn.encrypted_password);
    } catch {
      return NextResponse.json({ error: 'Failed to decrypt credentials' }, { status: 500 });
    }

    const tables: SchemaTable[] = [];

    if (conn.type === 'postgresql') {
      throw new Error('Database privacy features are currently disabled in the Cloudflare Edge environment.');
    } else if (conn.type === 'mysql') {
      throw new Error('Database privacy features are currently disabled in the Cloudflare Edge environment.');
    }

    return NextResponse.json({ tables });
  } catch (err: any) {
    console.error('[GET /api/privacy/connections/[id]/schema]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
