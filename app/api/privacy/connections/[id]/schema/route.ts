import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { decrypt } from '@/lib/supabase/encryption';

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

// ── GET /api/privacy/connections/[id]/schema ──────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch connection (RLS ensures ownership)
    const { data: conn, error: fetchError } = await supabase
      .from('connections')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !conn) {
      return NextResponse.json({ error: 'Connection not found' }, { status: 404 });
    }

    let password: string;
    try {
      password = decrypt(conn.encrypted_password);
    } catch {
      return NextResponse.json({ error: 'Failed to decrypt credentials' }, { status: 500 });
    }

    const tables: SchemaTable[] = [];

    if (conn.type === 'postgresql') {
      const { Client } = await import('pg');
      const client = new Client({
        host: conn.host, port: conn.port, database: conn.dbname,
        user: conn.username, password,
        ssl: conn.use_ssl ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 8000,
      });

      try {
        await client.connect();

        // Get all user tables + estimated row counts
        const tableRes = await client.query<{ table_name: string; row_estimate: string }>(`
          SELECT 
            t.table_name,
            s.n_live_tup AS row_estimate
          FROM information_schema.tables t
          LEFT JOIN pg_stat_user_tables s ON s.relname = t.table_name
          WHERE t.table_schema NOT IN ('pg_catalog','information_schema')
            AND t.table_type = 'BASE TABLE'
          ORDER BY t.table_name
        `);

        // Get columns for all tables in one query
        const colRes = await client.query<{
          table_name: string; column_name: string; data_type: string;
          is_nullable: string; character_maximum_length: string | null;
        }>(`
          SELECT table_name, column_name, data_type, is_nullable, character_maximum_length
          FROM information_schema.columns
          WHERE table_schema NOT IN ('pg_catalog','information_schema')
          ORDER BY table_name, ordinal_position
        `);

        // Group columns by table
        const colsByTable = new Map<string, SchemaColumn[]>();
        for (const col of colRes.rows) {
          if (!colsByTable.has(col.table_name)) colsByTable.set(col.table_name, []);
          colsByTable.get(col.table_name)!.push({
            name: col.column_name,
            dataType: col.data_type,
            nullable: col.is_nullable === 'YES',
            maxLength: col.character_maximum_length ? parseInt(col.character_maximum_length) : null,
          });
        }

        for (const row of tableRes.rows) {
          tables.push({
            name: row.table_name,
            rowCount: row.row_estimate ? parseInt(row.row_estimate) : null,
            columns: colsByTable.get(row.table_name) ?? [],
          });
        }
      } finally {
        await client.end().catch(() => {});
      }

    } else if (conn.type === 'mysql') {
      const mysql = await import('mysql2/promise');
      let connection;
      try {
        connection = await mysql.createConnection({
          host: conn.host, port: conn.port, database: conn.dbname,
          user: conn.username, password,
          ssl: conn.use_ssl ? { rejectUnauthorized: false } : undefined,
          connectTimeout: 8000,
        });

        const [tableRows] = await connection.query<any[]>(`
          SELECT TABLE_NAME as table_name, TABLE_ROWS as row_estimate
          FROM information_schema.TABLES
          WHERE TABLE_SCHEMA = DATABASE() AND TABLE_TYPE = 'BASE TABLE'
          ORDER BY TABLE_NAME
        `);

        const [colRows] = await connection.query<any[]>(`
          SELECT TABLE_NAME as table_name, COLUMN_NAME as column_name,
                 DATA_TYPE as data_type, IS_NULLABLE as is_nullable,
                 CHARACTER_MAXIMUM_LENGTH as character_maximum_length
          FROM information_schema.COLUMNS
          WHERE TABLE_SCHEMA = DATABASE()
          ORDER BY TABLE_NAME, ORDINAL_POSITION
        `);

        const colsByTable = new Map<string, SchemaColumn[]>();
        for (const col of colRows) {
          if (!colsByTable.has(col.table_name)) colsByTable.set(col.table_name, []);
          colsByTable.get(col.table_name)!.push({
            name: col.column_name, dataType: col.data_type,
            nullable: col.is_nullable === 'YES',
            maxLength: col.character_maximum_length ?? null,
          });
        }

        for (const row of tableRows) {
          tables.push({
            name: row.table_name,
            rowCount: row.row_estimate ?? null,
            columns: colsByTable.get(row.table_name) ?? [],
          });
        }
      } finally {
        if (connection) await connection.end().catch(() => {});
      }
    }

    return NextResponse.json({ tables });
  } catch (err: any) {
    console.error('[GET /api/privacy/connections/[id]/schema]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
