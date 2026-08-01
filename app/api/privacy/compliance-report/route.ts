import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

const FRAMEWORK_RULES: Record<string, Record<string, string>> = {
  GDPR: {
    email:      'Art. 4(1) – Personal data identifying natural persons',
    phone:      'Art. 4(1) – Personal data identifying natural persons',
    dob:        'Art. 9 – Special categories of personal data',
    ip:         'Recital 30 – Online identifiers are personal data',
    iban:       'Art. 4(1) – Financial data as personal data',
    ssn:        'Art. 9 – Special categories (national ID)',
    creditcard: 'Art. 4(1) – Financial personal data',
    jwt:        'Art. 32 – Appropriate technical measures for data security',
    apikey:     'Art. 32 – Appropriate technical measures for data security',
    zip:        'Recital 26 – Indirect identification risk',
  },
  HIPAA: {
    email:      'PHI – 45 CFR §164.514(b)(2) Safe Harbor email',
    phone:      'PHI – 45 CFR §164.514(b)(2) Safe Harbor phone numbers',
    dob:        'PHI – 45 CFR §164.514(b)(2) Safe Harbor dates of birth',
    ip:         'PHI – 45 CFR §164.514(b)(2) Safe Harbor IP addresses',
    ssn:        'PHI – 45 CFR §164.514(b)(2) Social Security Numbers',
    zip:        'PHI – 45 CFR §164.514(b)(2) Geographic data',
    iban:       'PHI – Financial identifiers for healthcare billing',
    creditcard: 'PHI – Financial identifiers for healthcare billing',
    jwt:        'Security Rule – 45 CFR §164.312 Access control',
    apikey:     'Security Rule – 45 CFR §164.312 Access control',
  },
  'PCI-DSS': {
    creditcard: 'PCI DSS Req. 3 – Protect stored cardholder data (PAN)',
    iban:       'PCI DSS Req. 3 – Protect stored financial data',
    ssn:        'PCI DSS Req. 3 – Sensitive authentication data',
    jwt:        'PCI DSS Req. 6 – Protect systems against known vulnerabilities',
    apikey:     'PCI DSS Req. 6.4 – Protect API credentials',
    email:      'PCI DSS Req. 12.10 – Incident response personal data',
    phone:      'PCI DSS Req. 12.10 – Incident response personal data',
    dob:        'PCI DSS Req. 12.10 – Sensitive cardholder information',
    ip:         'PCI DSS Req. 10 – Track/monitor network access',
    zip:        'PCI DSS Req. 3.3 – Limit storage of sensitive data',
  },
};

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const framework = (searchParams.get('framework') ?? 'GDPR') as 'GDPR' | 'HIPAA' | 'PCI-DSS';
    const days      = parseInt(searchParams.get('days') ?? '30', 10);
    const since     = new Date(Date.now() - days * 86400_000).toISOString();
    const uid       = user.id;

    // ── Parallel data fetch ──────────────────────────────────────────────────
    const [connRes, scansRes, rulesRes] = await Promise.all([
      supabase.from('connections').select('id, name, type').eq('user_id', uid),
      supabase.from('scans')
        .select('id, connection_id, connection_name, status, findings_count, tables_scanned, rows_scanned, started_at')
        .eq('user_id', uid)
        .gte('started_at', since)
        .order('started_at', { ascending: false }),
      supabase.from('masking_rules')
        .select('table_name, column_name, detector_id, is_active')
        .eq('user_id', uid),
    ]);

    const connections = connRes.data ?? [];
    const scans       = scansRes.data ?? [];
    const rules       = rulesRes.data ?? [];

    // fetch findings for all scans in range
    const scanIds = scans.map(s => s.id);
    const findingsRes = scanIds.length > 0
      ? await supabase.from('scan_findings')
          .select('scan_id, table_name, column_name, detector_id, detector_name, risk_level, occurrences')
          .in('scan_id', scanIds)
      : { data: [] };
    const findings = findingsRes.data ?? [];

    // ── Build lookup: which (table+col) combos have an active rule ──────────
    const activeRuleKeys = new Set(
      rules.filter(r => r.is_active).map(r => `${r.table_name}::${r.column_name}`)
    );

    // ── Deduplicate findings: highest risk per (table+col+detector) ─────────
    const colMap = new Map<string, typeof findings[0]>();
    for (const f of findings) {
      const key = `${f.table_name}::${f.column_name}::${f.detector_id}`;
      const existing = colMap.get(key);
      if (!existing || (f.occurrences ?? 0) > (existing.occurrences ?? 0)) colMap.set(key, f);
    }
    const uniqueFindings = [...colMap.values()];

    // Risk counts
    const riskCounts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    for (const f of uniqueFindings) {
      if (f.risk_level in riskCounts) riskCounts[f.risk_level as keyof typeof riskCounts]++;
    }

    // Coverage
    const totalPiiCols  = new Set(uniqueFindings.map(f => `${f.table_name}::${f.column_name}`)).size;
    const coveredCols   = uniqueFindings.filter(f => activeRuleKeys.has(`${f.table_name}::${f.column_name}`));
    const uncoveredCols = uniqueFindings.filter(f => !activeRuleKeys.has(`${f.table_name}::${f.column_name}`));
    const complianceScore = totalPiiCols === 0 ? 100 : Math.round((new Set(coveredCols.map(f => `${f.table_name}::${f.column_name}`)).size / totalPiiCols) * 100);

    // Risk score (inverse of compliance, weighted by severity)
    const riskScore = Math.min(100, Math.round(
      (riskCounts.Critical * 10 + riskCounts.High * 5 + riskCounts.Medium * 2 + riskCounts.Low * 0.5) / Math.max(1, uniqueFindings.length) * 20
    ));

    // ── PII type breakdown ───────────────────────────────────────────────────
    const typeMap = new Map<string, number>();
    for (const f of uniqueFindings) {
      typeMap.set(f.detector_name, (typeMap.get(f.detector_name) ?? 0) + (f.occurrences ?? 1));
    }
    const totalOccurrences = [...typeMap.values()].reduce((s, v) => s + v, 0);
    const piiBreakdown = [...typeMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({
        type,
        count,
        percentage: totalOccurrences > 0 ? Math.round((count / totalOccurrences) * 100) : 0,
      }));

    // ── Per-connection scan summary ──────────────────────────────────────────
    const connFindingsMap = new Map<string | null, number>();
    for (const s of scans) { connFindingsMap.set(s.connection_id, (connFindingsMap.get(s.connection_id) ?? 0) + (s.findings_count ?? 0)); }
    const scannedConnIds = new Set(scans.map(s => s.connection_id));
    const connectionSummary = connections.map(c => ({
      name: c.name, type: c.type,
      scanned: scannedConnIds.has(c.id),
      findingsCount: connFindingsMap.get(c.id) ?? 0,
    }));

    // ── Findings list for report (with hasRule + framework citation) ─────────
    const frameworkRules = FRAMEWORK_RULES[framework] ?? {};
    const findingsList = uniqueFindings
      .sort((a, b) => {
        const o = { Critical: 0, High: 1, Medium: 2, Low: 3 };
        return (o[a.risk_level as keyof typeof o] ?? 4) - (o[b.risk_level as keyof typeof o] ?? 4);
      })
      .map(f => ({
        table:       f.table_name,
        column:      f.column_name,
        detector:    f.detector_name,
        detectorId:  f.detector_id,
        risk:        f.risk_level,
        occurrences: f.occurrences ?? 1,
        hasRule:     activeRuleKeys.has(`${f.table_name}::${f.column_name}`),
        citation:    frameworkRules[f.detector_id ?? ''] ?? `${framework} general data minimization principle`,
      }));

    // ── Auto-generated recommendations ──────────────────────────────────────
    const recommendations: { priority: string; action: string; detail: string }[] = [];

    const criticalUncovered = uncoveredCols.filter(f => f.risk_level === 'Critical');
    if (criticalUncovered.length > 0) {
      recommendations.push({
        priority: 'Critical',
        action: `Immediately mask ${criticalUncovered.length} critical PII column${criticalUncovered.length > 1 ? 's' : ''}`,
        detail: criticalUncovered.slice(0, 3).map(f => `${f.table_name}.${f.column_name} (${f.detector_name})`).join('; ') +
          (criticalUncovered.length > 3 ? ` and ${criticalUncovered.length - 3} more` : ''),
      });
    }
    const highUncovered = uncoveredCols.filter(f => f.risk_level === 'High');
    if (highUncovered.length > 0) {
      recommendations.push({
        priority: 'High',
        action: `Apply masking rules to ${highUncovered.length} high-risk column${highUncovered.length > 1 ? 's' : ''}`,
        detail: highUncovered.slice(0, 3).map(f => `${f.table_name}.${f.column_name}`).join('; ') +
          (highUncovered.length > 3 ? ` and ${highUncovered.length - 3} more` : ''),
      });
    }
    if (connections.length > scannedConnIds.size) {
      recommendations.push({
        priority: 'High',
        action: `Scan ${connections.length - scannedConnIds.size} unscanned database connection${connections.length - scannedConnIds.size > 1 ? 's' : ''}`,
        detail: 'These connections have no scan history in the selected time window.',
      });
    }
    const medUncovered = uncoveredCols.filter(f => f.risk_level === 'Medium');
    if (medUncovered.length > 0) {
      recommendations.push({
        priority: 'Medium',
        action: `Review and mask ${medUncovered.length} medium-risk column${medUncovered.length > 1 ? 's' : ''}`,
        detail: `${medUncovered.slice(0, 2).map(f => f.table_name + '.' + f.column_name).join(', ')}${medUncovered.length > 2 ? ` +${medUncovered.length - 2} more` : ''}`,
      });
    }
    if (scans.length === 0) {
      recommendations.push({
        priority: 'Critical',
        action: 'Run your first database scan',
        detail: 'No scans have been performed in the selected time period. Scanning is required for compliance evidence.',
      });
    }
    if (recommendations.length === 0) {
      recommendations.push({
        priority: 'Low',
        action: 'Maintain current compliance posture',
        detail: 'All detected PII columns have active masking rules. Schedule regular re-scans to catch schema changes.',
      });
    }

    return NextResponse.json({
      meta: {
        framework,
        days,
        generatedAt: new Date().toISOString(),
        since,
      },
      executiveSummary: {
        complianceScore, riskScore,
        totalConnections: connections.length,
        totalScans: scans.length,
        completedScans: scans.filter(s => s.status === 'completed').length,
        totalFindings: uniqueFindings.length,
        totalOccurrences,
        ...riskCounts,
        coveredColumns: new Set(coveredCols.map(f => `${f.table_name}::${f.column_name}`)).size,
        uncoveredColumns: new Set(uncoveredCols.map(f => `${f.table_name}::${f.column_name}`)).size,
        totalPiiColumns: totalPiiCols,
        activeRules: rules.filter(r => r.is_active).length,
      },
      piiBreakdown,
      findings: findingsList,
      recommendations,
      connectionSummary,
    });

  } catch (err: any) {
    console.error('[GET /api/privacy/compliance-report]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
