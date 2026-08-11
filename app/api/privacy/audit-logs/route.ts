import { NextRequest, NextResponse } from 'next/server';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';
import { createClient } from '@/lib/supabase/server';

// ── GET /api/privacy/audit-logs ───────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const { searchParams } = new URL(req.url);
    const category  = searchParams.get('category')  ?? '';   // connection|scan|rule|auth|system
    const severity  = searchParams.get('severity')  ?? '';   // info|warning|error
    const search    = searchParams.get('search')    ?? '';
    const page      = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
    const pageSize  = 50;
    const from      = (page - 1) * pageSize;

    let query = supabase
      .from('audit_logs')
      .select('id, action, category, severity, resource, details, created_at', { count: 'exact' })
      .eq('user_id', uid)
      .order('created_at', { ascending: false })
      .range(from, from + pageSize - 1);

    if (category) query = query.eq('category', category);
    if (severity) query = query.eq('severity', severity);
    if (search)   query = query.or(`action.ilike.%${search}%,resource.ilike.%${search}%`);

    const { data, error, count } = await query;
    if (error) throw error;

    // Stats: total today, by severity, by category
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const [todayRes, errorRes, warnRes] = await Promise.all([
      supabase.from('audit_logs').select('id', { count: 'exact', head: true })
        .eq('user_id', uid).gte('created_at', todayStart.toISOString()),
      supabase.from('audit_logs').select('id', { count: 'exact', head: true })
        .eq('user_id', uid).eq('severity', 'error'),
      supabase.from('audit_logs').select('id', { count: 'exact', head: true })
        .eq('user_id', uid).eq('severity', 'warning'),
    ]);

    return NextResponse.json({
      logs: data ?? [],
      total: count ?? 0,
      page, pageSize,
      totalPages: Math.ceil((count ?? 0) / pageSize),
      stats: {
        total: count ?? 0,
        today: todayRes.count ?? 0,
        errors: errorRes.count ?? 0,
        warnings: warnRes.count ?? 0,
      },
    });
  } catch (err: any) {
    console.error('[GET /api/privacy/audit-logs]', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
