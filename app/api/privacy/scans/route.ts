import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { decrypt } from '@/lib/supabase/encryption';
import { SERVER_PII_DETECTORS, scanValue } from '@/lib/supabase/piiDetectors.server';
import { writeAudit } from '@/lib/supabase/audit';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

// ── GET /api/privacy/scans ── List user's scans ───────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('scans')
      .select('id, connection_name, status, tables_scanned, rows_scanned, findings_count, started_at, completed_at')
      .eq('user_id', uid)
      .order('started_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return NextResponse.json({ scans: data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// ── POST /api/privacy/scans ── Start a new DB scan ────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const body = await req.json();
    const { connectionId, selectedTables } = body as { connectionId: string; selectedTables: string[] };

    if (!connectionId || !Array.isArray(selectedTables) || selectedTables.length === 0) {
      return NextResponse.json({ error: 'connectionId and at least one table are required' }, { status: 400 });
    }

    if (selectedTables.length > 20) {
      return NextResponse.json({ error: 'Maximum 20 tables per scan' }, { status: 400 });
    }

    // Fetch connection
    const { data: conn, error: connErr } = await supabase
      .from('connections')
      .select('*')
      .eq('id', connectionId)
      .eq('user_id', uid)
      .single();

    if (connErr || !conn) return NextResponse.json({ error: 'Connection not found' }, { status: 404 });

    let password: string;
    try { password = decrypt(conn.encrypted_password); }
    catch { return NextResponse.json({ error: 'Failed to decrypt credentials' }, { status: 500 }); }

    // Create the scan record
    const { data: scan, error: scanErr } = await supabase
      .from('scans')
      .insert({
        user_id: uid,
        connection_id: connectionId,
        connection_name: conn.name,
        status: 'running',
      })
      .select('id')
      .single();

    if (scanErr || !scan) throw scanErr ?? new Error('Failed to create scan');

    const scanId = scan.id;

    // Audit: scan started
    void writeAudit(uid, email ?? '', {
      action: 'SCAN_STARTED', category: 'scan', severity: 'info',
      resource: conn.name,
      details: { scan_id: scanId, tables: selectedTables, connection_id: connectionId },
    });

    // ── Run scan asynchronously (in-request, streaming results) ──────────────
    // We run it synchronously within the request timeout (max ~60s on Vercel hobby)
    // For larger scans, Phase 4 will add a job queue.
    const ROWS_PER_TABLE = 500;
    const SAMPLE_ROWS = 5; // rows to store as evidence sample

    let totalRowsScanned = 0;
    let totalFindings = 0;
    let tablesScanned = 0;
    const findingsBatch: any[] = [];

    const detectorMap = Object.fromEntries(SERVER_PII_DETECTORS.map(d => [d.id, d]));

    try {
      const connectAndScan = async (runQuery: (sql: string, values?: any[]) => Promise<any[][]>) => {
        for (const tableName of selectedTables) {
          // Sanitize table name (prevent injection)
          if (!/^[A-Za-z0-9_]+$/.test(tableName)) continue;

          let rows: Record<string, any>[] = [];
          try {
            const result = await runQuery(`SELECT * FROM ${tableName} LIMIT ${ROWS_PER_TABLE}`);
            rows = result as Record<string, any>[];
          } catch {
            continue; // Skip tables we can't read
          }

          if (rows.length === 0) { tablesScanned++; continue; }

          // Track findings per column
          const colFindings = new Map<string, Map<string, { count: number; samples: string[] }>>();

          for (const row of rows) {
            totalRowsScanned++;
            for (const [colName, rawVal] of Object.entries(row)) {
              const strVal = rawVal === null || rawVal === undefined ? '' : String(rawVal);
              const matches = scanValue(strVal);
              for (const detId of matches) {
                const key = `${colName}::${detId}`;
                if (!colFindings.has(key)) colFindings.set(key, new Map());
                const detMap = colFindings.get(key)!;
                if (!detMap.has(detId)) detMap.set(detId, { count: 0, samples: [] });
                const entry = detMap.get(detId)!;
                entry.count++;
                if (entry.samples.length < SAMPLE_ROWS) {
                  // Mask the sample: keep first char, redact rest
                  const masked = strVal.length > 2
                    ? strVal[0] + '***' + strVal.slice(-1)
                    : '***';
                  entry.samples.push(masked);
                }
              }
            }
          }

          // Flatten colFindings into findingsBatch
          for (const [key, detMap] of colFindings.entries()) {
            const [colName] = key.split('::');
            for (const [detId, { count, samples }] of detMap.entries()) {
              const detector = detectorMap[detId];
              if (!detector) continue;
              findingsBatch.push({
                scan_id: scanId,
                table_name: tableName,
                column_name: colName,
                detector_id: detId,
                detector_name: detector.name,
                risk_level: detector.risk,
                occurrences: count,
                sample_masked: samples[0] ?? null,
              });
              totalFindings++;
            }
          }

          tablesScanned++;
        }
      };

      if (conn.type === 'postgresql') {
        const { Client } = await import('pg');
        const client = new Client({
          host: conn.host, port: conn.port, database: conn.dbname,
          user: conn.username, password,
          ssl: conn.use_ssl ? { rejectUnauthorized: false } : false,
          connectionTimeoutMillis: 10000,
        });
        await client.connect();
        try {
          await connectAndScan(async (sql) => {
            const res = await client.query(sql);
            return res.rows;
          });
        } finally {
          await client.end().catch(() => {});
        }

      } else if (conn.type === 'mysql') {
        const mysql = await import('mysql2/promise');
        const connection = await mysql.createConnection({
          host: conn.host, port: conn.port, database: conn.dbname,
          user: conn.username, password,
          ssl: conn.use_ssl ? { rejectUnauthorized: false } : undefined,
          connectTimeout: 10000,
        });
        try {
          await connectAndScan(async (sql) => {
            const [rows] = await connection.query<any[]>(sql);
            return rows;
          });
        } finally {
          await connection.end().catch(() => {});
        }
      }

      // Batch-insert findings
      if (findingsBatch.length > 0) {
        await supabase.from('scan_findings').insert(findingsBatch);
      }

      // Mark scan complete
      await supabase.from('scans').update({
        status: 'completed',
        tables_scanned: tablesScanned,
        rows_scanned: totalRowsScanned,
        findings_count: totalFindings,
        completed_at: new Date().toISOString(),
      }).eq('id', scanId);

    } catch (err: any) {
      // Mark scan failed
      await supabase.from('scans').update({
        status: 'failed',
        completed_at: new Date().toISOString(),
      }).eq('id', scanId);

      void writeAudit(uid, email ?? '', {
        action: 'SCAN_FAILED', category: 'scan', severity: 'error',
        resource: conn.name,
        details: { scan_id: scanId, error: err.message },
      });

      return NextResponse.json({
        scanId, status: 'failed', error: err.message,
      }, { status: 500 });
    }

    void writeAudit(uid, email ?? '', {
      action: 'SCAN_COMPLETED', category: 'scan', severity: 'info',
      resource: conn.name,
      details: { scan_id: scanId, tables: tablesScanned, rows: totalRowsScanned, findings: totalFindings },
    });

    return NextResponse.json({
      scanId, status: 'completed',
      tablesScanned, rowsScanned: totalRowsScanned, findingsCount: totalFindings,
    }, { status: 201 });

  } catch (err: any) {
    console.error('[POST /api/privacy/scans]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
