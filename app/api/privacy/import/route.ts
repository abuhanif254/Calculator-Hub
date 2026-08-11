export const runtime = 'edge';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

export async function POST(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const type = req.nextUrl.searchParams.get('type');
    if (!type || !['findings', 'rules'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const tableName = type === 'findings' ? 'scan_findings' : 'rules';

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const text = await file.text();
    let rows: any[] = [];

    if (file.name.endsWith('.csv')) {
      const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length > 1) {
        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
          const row: any = {};
          headers.forEach((h, index) => {
            row[h] = values[index];
          });
          rows.push(row);
        }
      }
    } else if (file.name.endsWith('.json')) {
      rows = JSON.parse(text);
    } else {
      return NextResponse.json({ error: 'Unsupported file format' }, { status: 400 });
    }

    let imported = 0;
    let skipped = 0;
    const errors: any[] = [];

    for (const row of rows) {
      try {
        const insertData = { ...row, user_id: uid };
        const { error } = await supabase
          .from(tableName)
          .upsert(insertData);
          
        if (error) {
          errors.push({ row, error: error.message });
          skipped++;
        } else {
          imported++;
        }
      } catch (err: any) {
        errors.push({ row, error: err.message });
        skipped++;
      }
    }

    void writeAudit(uid, email ?? '', {
      action: 'DATA_IMPORTED',
      category: 'system',
      severity: 'info',
      resource: tableName,
      details: { type, imported, skipped }
    });

    return NextResponse.json({ imported, skipped, errors });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
