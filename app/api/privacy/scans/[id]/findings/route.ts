export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

// ── GET /api/privacy/scans/[id]/findings ─────────────────────────────────────
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid } = privacyUser;

    const supabase = await createClient();

    // Verify scan belongs to this user
    const { data: scan, error: scanErr } = await supabase
      .from('scans')
      .select('id, status, tables_scanned, rows_scanned, findings_count, connection_name, started_at, completed_at')
      .eq('id', id)
      .eq('user_id', uid)
      .single();

    if (scanErr || !scan) return NextResponse.json({ error: 'Scan not found' }, { status: 404 });

    const { searchParams } = new URL(req.url);
    const riskFilter = searchParams.get('risk'); // e.g. 'Critical'
    const page = parseInt(searchParams.get('page') ?? '1', 10);
    const pageSize = 50;

    let query = supabase
      .from('scan_findings')
      .select('id, table_name, column_name, detector_id, detector_name, risk_level, occurrences, sample_masked')
      .eq('scan_id', id)
      .order('risk_level', { ascending: false })
      .order('occurrences', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (riskFilter) query = query.eq('risk_level', riskFilter);

    const { data: findings, error: findErr } = await query;
    if (findErr) throw findErr;

    return NextResponse.json({ scan, findings: findings ?? [] });
  } catch (err: any) {
    console.error('[GET /api/privacy/scans/[id]/findings]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
