import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { adminAuth } from '@/lib/firebase-admin';

// ── GET /api/privacy/dashboard ── Aggregate real stats for the dashboard ───────
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing or invalid authorization header' }, { status: 401 });
    }

    const token = authHeader.split('Bearer ')[1];
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(token);
    } catch (error) {
      console.error('[Firebase Auth] Token verification failed:', error);
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    const uid = decodedToken.uid;
    // Use the anon key to query Supabase (bypassing RLS by manually forcing .eq('user_id', uid))
    const supabase = await createClient();

    // ── Run all queries in parallel ──────────────────────────────────────────
    const [
      connRes,
      scansRes,
      rulesRes,
      findingsRes,
      recentScansRes,
      topColumnsRes,
    ] = await Promise.all([
      // 1. Connections: total + connected count
      supabase.from('connections')
        .select('id, status')
        .eq('user_id', uid),

      // 2. All scans for activity chart + totals
      supabase.from('scans')
        .select('id, status, findings_count, connection_name, tables_scanned, rows_scanned, started_at, completed_at')
        .eq('user_id', uid)
        .order('started_at', { ascending: false })
        .limit(100), // last 100 for 7-day chart accuracy

      // 3. Masking rules: total + active
      supabase.from('masking_rules')
        .select('id, is_active, risk_level, table_name, column_name')
        .eq('user_id', uid),

      // 4. Scan findings: risk distribution
      supabase.from('scan_findings')
        .select('risk_level, occurrences, table_name, column_name, detector_name, scan_id')
        .in(
          'scan_id',
          // We need scan IDs for this user — Supabase RLS handles filtering,
          // but we also join via the scans the user owns
          (await supabase.from('scans').select('id').eq('user_id', uid)).data?.map(s => s.id) ?? []
        ),

      // 5. Recent scans (last 10 for table)
      supabase.from('scans')
        .select('id, connection_name, status, tables_scanned, rows_scanned, findings_count, started_at')
        .eq('user_id', uid)
        .order('started_at', { ascending: false })
        .limit(10),

      // 6. Top risky columns (highest occurrence findings)
      supabase.from('scan_findings')
        .select('table_name, column_name, detector_name, risk_level, occurrences')
        .in(
          'scan_id',
          (await supabase.from('scans').select('id').eq('user_id', uid).order('started_at', { ascending: false }).limit(5)).data?.map(s => s.id) ?? []
        )
        .order('occurrences', { ascending: false })
        .limit(10),
    ]);

    const connections  = connRes.data ?? [];
    const allScans     = scansRes.data ?? [];
    const rules        = rulesRes.data ?? [];
    const findings     = findingsRes.data ?? [];
    const recentScans  = recentScansRes.data ?? [];
    const topRaw       = topColumnsRes.data ?? [];

    // ── Stat aggregations ────────────────────────────────────────────────────
    const totalConnections   = connections.length;
    const connectedConns     = connections.filter(c => c.status === 'connected').length;
    const totalFindings      = findings.reduce((s, f) => s + (f.occurrences ?? 1), 0);
    const criticalFindings   = findings.filter(f => f.risk_level === 'Critical').reduce((s, f) => s + (f.occurrences ?? 1), 0);
    const activeRules        = rules.filter(r => r.is_active).length;
    const totalRules         = rules.length;
    const totalScans         = allScans.length;
    const completedScans     = allScans.filter(s => s.status === 'completed').length;

    // ── Compliance score ─────────────────────────────────────────────────────
    // Score = % of unique PII column/table combos that have an active masking rule
    const uniquePiiCols = new Set(findings.map(f => `${f.table_name}::${f.column_name}`));
    const coveredCols   = new Set(
      rules.filter(r => r.is_active).map(r => `${r.table_name}::${r.column_name}`)
    );
    const covered = [...uniquePiiCols].filter(k => coveredCols.has(k)).length;
    const complianceScore = uniquePiiCols.size === 0
      ? 100
      : Math.round((covered / uniquePiiCols.size) * 100);

    // ── Risk distribution ────────────────────────────────────────────────────
    const riskMap: Record<string, number> = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    for (const f of findings) {
      if (f.risk_level in riskMap) riskMap[f.risk_level] += (f.occurrences ?? 1);
    }
    const riskDistribution = [
      { name: 'Critical', value: riskMap.Critical, color: '#ef4444' },
      { name: 'High',     value: riskMap.High,     color: '#f97316' },
      { name: 'Medium',   value: riskMap.Medium,   color: '#f59e0b' },
      { name: 'Low',      value: riskMap.Low,      color: '#10b981' },
    ];

    // ── Scan activity (last 7 days) ──────────────────────────────────────────
    const days: { date: string; label: string; scans: number; findings: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10); // YYYY-MM-DD
      days.push({
        date: iso,
        label: d.toLocaleDateString('en', { weekday: 'short' }),
        scans: 0,
        findings: 0,
      });
    }
    for (const scan of allScans) {
      const scanDate = scan.started_at?.slice(0, 10);
      const day = days.find(d => d.date === scanDate);
      if (day) { day.scans++; day.findings += scan.findings_count ?? 0; }
    }
    const scanActivity = days.map(d => ({ name: d.label, scans: d.scans, findings: d.findings }));

    // ── Top risky columns (deduplicate, keep highest occurrence) ─────────────
    const colMap = new Map<string, typeof topRaw[0]>();
    for (const f of topRaw) {
      const key = `${f.table_name}::${f.column_name}`;
      if (!colMap.has(key) || (colMap.get(key)!.occurrences ?? 0) < (f.occurrences ?? 0)) {
        colMap.set(key, f);
      }
    }
    const topRiskyColumns = [...colMap.values()]
      .sort((a, b) => {
        const riskOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
        return (riskOrder[a.risk_level as keyof typeof riskOrder] ?? 4)
             - (riskOrder[b.risk_level as keyof typeof riskOrder] ?? 4);
      })
      .slice(0, 5);

    return NextResponse.json({
      stats: {
        totalConnections, connectedConns,
        totalFindings, criticalFindings,
        activeRules, totalRules,
        totalScans, completedScans,
        complianceScore,
        coveredColumns: covered,
        totalPiiColumns: uniquePiiCols.size,
      },
      riskDistribution,
      scanActivity,
      recentScans,
      topRiskyColumns,
    });

  } catch (err: any) {
    console.error('[GET /api/privacy/dashboard]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
