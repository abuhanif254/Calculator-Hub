import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { decrypt } from '@/lib/supabase/encryption';
import { writeAudit } from '@/lib/supabase/audit';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

// â”€â”€â”€ POST /api/privacy/connections/[id]/test â”€â”€â”€ Test a real DB connection â”€â”€â”€
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();

  try {
    const { id } = await params;
    
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    // Fetch the connection (RLS enforces user_id match)
    const { data: conn, error: fetchError } = await supabase
      .from('connections')
      .select('*')
      .eq('id', id)
      .eq('user_id', uid)
      .single();

    if (fetchError || !conn) {
      return NextResponse.json({ error: 'Connection not found' }, { status: 404 });
    }

    // Decrypt the stored password
    let password: string;
    try {
      password = await decrypt(conn.encrypted_password);
    } catch {
      return NextResponse.json({ error: 'Failed to decrypt credentials' }, { status: 500 });
    }

    // â”€â”€ Attempt real DB connection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    let tablesCount = 0;
    let testStatus: 'connected' | 'failed' = 'failed';
    let errorMessage: string | null = null;

    if (conn.type === 'postgresql') {
      testStatus = 'failed';
      errorMessage = 'Database privacy features are currently disabled in the Cloudflare Edge environment.';
    } else if (conn.type === 'mysql') {
      testStatus = 'failed';
      errorMessage = 'Database privacy features are currently disabled in the Cloudflare Edge environment.';
    } else {
      return NextResponse.json({ error: 'Unsupported database type for testing' }, { status: 400 });
    }

    const latencyMs = Date.now() - startTime;

    // Update connection status in Supabase
    await supabase
      .from('connections')
      .update({
        status: testStatus,
        last_tested_at: new Date().toISOString(),
        tables_count: (testStatus as string) === 'connected' ? tablesCount : conn.tables_count,
      })
      .eq('id', id);

    void writeAudit(uid, email ?? '', {
      action: (testStatus as string) === 'connected' ? 'CONNECTION_TEST_SUCCESS' : 'CONNECTION_TEST_FAILED',
      category: 'connection',
      severity: (testStatus as string) === 'connected' ? 'info' : 'error',
      resource: conn.name,
      details: { latencyMs, tablesCount, type: conn.type, error: errorMessage },
    });

    return NextResponse.json({
      success: (testStatus as string) === 'connected',
      status: testStatus,
      latencyMs,
      tablesCount: (testStatus as string) === 'connected' ? tablesCount : null,
      error: errorMessage,
    });

  } catch (err: any) {
    console.error('[POST /api/privacy/connections/[id]/test]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
