import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // findingsByRisk
    const { data: findingsRiskData, error: findingsRiskError } = await supabase
      .from('scan_findings')
      .select('risk_level')
      .eq('user_id', user.id);

    if (findingsRiskError) throw findingsRiskError;
    
    const riskCounts = (findingsRiskData || []).reduce((acc: any, curr) => {
      acc[curr.risk_level] = (acc[curr.risk_level] || 0) + 1;
      return acc;
    }, {});

    const findingsByRisk = Object.keys(riskCounts).map(risk => {
      let color = '#3b82f6';
      if (risk.toLowerCase() === 'critical') color = '#ef4444';
      if (risk.toLowerCase() === 'high') color = '#f97316';
      if (risk.toLowerCase() === 'medium') color = '#eab308';
      if (risk.toLowerCase() === 'low') color = '#22c55e';
      return {
        name: risk.charAt(0).toUpperCase() + risk.slice(1),
        value: riskCounts[risk],
        color
      };
    });

    // scanActivity
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const { data: scansData, error: scansError } = await supabase
      .from('scans')
      .select('started_at, findings_count')
      .eq('user_id', user.id)
      .gte('started_at', sevenDaysAgo.toISOString());

    if (scansError) throw scansError;

    const daysMap: Record<string, { scans: number, findings: number }> = {};
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      daysMap[dayNames[d.getDay()]] = { scans: 0, findings: 0 };
    }

    (scansData || []).forEach(scan => {
      if (!scan.started_at) return;
      const d = new Date(scan.started_at);
      const dayName = dayNames[d.getDay()];
      if (daysMap[dayName]) {
        daysMap[dayName].scans++;
        daysMap[dayName].findings += (scan.findings_count || 0);
      }
    });

    const scanActivity = Object.keys(daysMap).map(key => ({
      name: key,
      scans: daysMap[key].scans,
      findings: daysMap[key].findings
    }));

    // complianceScores
    const { data: complianceData, error: complianceError } = await supabase
      .from('compliance_states')
      .select('framework, score')
      .eq('user_id', user.id);
    
    if (complianceError) throw complianceError;
    const complianceScores = (complianceData || []).map(c => ({
      framework: c.framework,
      score: c.score
    }));

    // topConnections
    const { data: topConnectionsData, error: topConnError } = await supabase
      .from('scans')
      .select('connection_id, findings_count, connections(name)')
      .eq('user_id', user.id);

    if (topConnError) throw topConnError;

    const connAgg: Record<string, { scans: number, findings: number }> = {};
    (topConnectionsData || []).forEach((scan: any) => {
      const cName = scan.connections?.name || 'Unknown';
      if (!connAgg[cName]) connAgg[cName] = { scans: 0, findings: 0 };
      connAgg[cName].scans++;
      connAgg[cName].findings += (scan.findings_count || 0);
    });

    const topConnections = Object.keys(connAgg)
      .map(name => ({
        name,
        scans: connAgg[name].scans,
        findings: connAgg[name].findings
      }))
      .sort((a, b) => b.scans - a.scans)
      .slice(0, 5);

    return NextResponse.json({
      findingsByRisk,
      scanActivity,
      complianceScores,
      topConnections
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
