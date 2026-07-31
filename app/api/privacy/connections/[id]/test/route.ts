import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { decrypt } from '@/lib/supabase/encryption';

// ─── POST /api/privacy/connections/[id]/test ─── Test a real DB connection ───
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now();

  try {
    const { id } = await params;
    const supabase = await createClient();

    // Auth check
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the connection (RLS enforces user_id match)
    const { data: conn, error: fetchError } = await supabase
      .from('connections')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !conn) {
      return NextResponse.json({ error: 'Connection not found' }, { status: 404 });
    }

    // Decrypt the stored password
    let password: string;
    try {
      password = decrypt(conn.encrypted_password);
    } catch {
      return NextResponse.json({ error: 'Failed to decrypt credentials' }, { status: 500 });
    }

    // ── Attempt real DB connection ──────────────────────────────────────────
    let tablesCount = 0;
    let testStatus: 'connected' | 'failed' = 'failed';
    let errorMessage: string | null = null;

    if (conn.type === 'postgresql') {
      const { Client } = await import('pg');
      const client = new Client({
        host: conn.host,
        port: conn.port,
        database: conn.dbname,
        user: conn.username,
        password,
        ssl: conn.use_ssl ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 8000,
      });

      try {
        await client.connect();
        // Ping
        await client.query('SELECT 1');
        // Count tables
        const result = await client.query(
          `SELECT count(*) FROM information_schema.tables 
           WHERE table_schema NOT IN ('pg_catalog','information_schema')`
        );
        tablesCount = parseInt(result.rows[0].count, 10);
        testStatus = 'connected';
      } catch (dbErr: any) {
        errorMessage = dbErr.message;
      } finally {
        await client.end().catch(() => {});
      }

    } else if (conn.type === 'mysql') {
      const mysql = await import('mysql2/promise');
      let connection;
      try {
        connection = await mysql.createConnection({
          host: conn.host,
          port: conn.port,
          database: conn.dbname,
          user: conn.username,
          password,
          ssl: conn.use_ssl ? { rejectUnauthorized: false } : undefined,
          connectTimeout: 8000,
        });
        // Ping
        await connection.query('SELECT 1');
        // Count tables
        const [rows] = await connection.query<any[]>(
          `SELECT count(*) as cnt FROM information_schema.tables 
           WHERE table_schema = ?`, [conn.dbname]
        );
        tablesCount = rows[0]?.cnt ?? 0;
        testStatus = 'connected';
      } catch (dbErr: any) {
        errorMessage = dbErr.message;
      } finally {
        if (connection) await connection.end().catch(() => {});
      }
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
        tables_count: testStatus === 'connected' ? tablesCount : conn.tables_count,
      })
      .eq('id', id);

    return NextResponse.json({
      success: testStatus === 'connected',
      status: testStatus,
      latencyMs,
      tablesCount: testStatus === 'connected' ? tablesCount : null,
      error: errorMessage,
    });

  } catch (err: any) {
    console.error('[POST /api/privacy/connections/[id]/test]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
