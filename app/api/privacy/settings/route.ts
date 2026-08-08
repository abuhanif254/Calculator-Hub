import { NextRequest, NextResponse } from 'next/server';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';

const defaultSettings = {
  platform_name: 'Data Privacy Platform',
  timezone: 'UTC',
  require_mfa: false,
  ip_allowlist: '',
  notify_scan_complete: true,
  notify_critical_findings: true,
  notify_job_failed: true,
  data_retention_days: 30,
};

export async function GET(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    let { data: settings, error: fetchError } = await supabase
      .from('platform_settings')
      .select('*')
      .eq('user_id', uid)
      .single();

    if (fetchError && fetchError.code === 'PGRST116') {
      // Not found, insert defaults
      const insertData = { user_id: uid, ...defaultSettings };
      const { data: inserted, error: insertError } = await supabase
        .from('platform_settings')
        .insert(insertData)
        .select('*')
        .single();
        
      if (insertError) throw insertError;
      settings = inserted;
    } else if (fetchError) {
      throw fetchError;
    }

    return NextResponse.json({ settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();
    const body = await req.json();
    
    const updateData = {
      user_id: uid,
      ...body,
      updated_at: new Date().toISOString(),
    };

    const { data: settings, error: upsertError } = await supabase
      .from('platform_settings')
      .upsert(updateData, { onConflict: 'user_id' })
      .select('*')
      .single();

    if (upsertError) throw upsertError;

    void writeAudit(uid, email ?? '', {
      action: 'SETTINGS_UPDATED',
      category: 'system',
      severity: 'info',
      resource: 'platform_settings',
      details: body
    });

    return NextResponse.json({ settings });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
