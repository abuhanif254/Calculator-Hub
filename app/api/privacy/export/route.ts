import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

export async function POST(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid } = privacyUser;

    const supabase = await createClient();

    const { type, format, dateFrom, dateTo } = await req.json();

    if (!['findings', 'rules', 'audit_logs', 'connections'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    let query = supabase.from(type === 'findings' ? 'scan_findings' : type).select('*').eq('user_id', uid);

    if (dateFrom) query = query.gte('created_at', dateFrom);
    if (dateTo) query = query.lte('created_at', dateTo);

    const { data, error } = await query;
    if (error) throw error;

    let content = '';
    let contentType = 'application/json';
    let fileExt = 'json';

    if (format === 'csv') {
      if (data && data.length > 0) {
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(',')];
        
        for (const row of data) {
          const values = headers.map(header => {
            const val = row[header] === null || row[header] === undefined ? '' : row[header];
            return `"${String(val).replace(/"/g, '""')}"`;
          });
          csvRows.push(values.join(','));
        }
        content = csvRows.join('\n');
      }
      contentType = 'text/csv';
      fileExt = 'csv';
    } else {
      content = JSON.stringify(data, null, 2);
    }

    const filename = `export-${type}-${new Date().toISOString().split('T')[0]}.${fileExt}`;
    const headers = new Headers({
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${filename}"`
    });

    return new NextResponse(content, { headers });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
