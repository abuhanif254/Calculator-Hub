import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { requirePrivacyUser } from '@/lib/privacy/server-auth';

const DEFAULTS: Record<string, any[]> = {
  gdpr: [
    { id: 'g1', label: 'Data Processing Records', passed: true },
    { id: 'g2', label: 'Privacy Notice', passed: true },
    { id: 'g3', label: 'Consent Management', passed: true },
    { id: 'g4', label: 'Data Subject Rights', passed: true },
    { id: 'g5', label: 'DPO Appointed', passed: true },
    { id: 'g6', label: 'Breach Notification', passed: true },
    { id: 'g7', label: 'Data Minimization', passed: false },
    { id: 'g8', label: 'Cross-border Transfers', passed: false }
  ],
  hipaa: [
    { id: 'h1', label: 'Access Controls', passed: true },
    { id: 'h2', label: 'Audit Logs', passed: true },
    { id: 'h3', label: 'Encryption at Rest', passed: true },
    { id: 'h4', label: 'Encryption in Transit', passed: true },
    { id: 'h5', label: 'Employee Training', passed: true },
    { id: 'h6', label: 'Business Associate Agreements', passed: true },
    { id: 'h7', label: 'Disaster Recovery', passed: false }
  ],
  pci: [
    { id: 'p1', label: 'Firewall', passed: true },
    { id: 'p2', label: 'No Default Passwords', passed: true },
    { id: 'p3', label: 'Cardholder Data Protection', passed: true },
    { id: 'p4', label: 'Encrypted Transmission', passed: true },
    { id: 'p5', label: 'Anti-virus', passed: true },
    { id: 'p6', label: 'Secure Systems', passed: true },
    { id: 'p7', label: 'Restrict Access', passed: true },
    { id: 'p8', label: 'Unique IDs', passed: false },
    { id: 'p9', label: 'Physical Access', passed: false }
  ],
  soc2: [
    { id: 's1', label: 'Security Policies', passed: true },
    { id: 's2', label: 'Change Management', passed: true },
    { id: 's3', label: 'Risk Assessment', passed: true },
    { id: 's4', label: 'Incident Response', passed: true },
    { id: 's5', label: 'Vendor Management', passed: true },
    { id: 's6', label: 'Monitoring', passed: true }
  ]
};

const calculateScore = (items: any[]) => {
  const passedCount = items.filter(i => i.passed).length;
  const totalCount = items.length;
  return totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;
};

export async function GET(req: NextRequest) {
  try {
    const privacyUser = await requirePrivacyUser(req);
    if (privacyUser instanceof Response) return privacyUser;
    const { uid, email } = privacyUser;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('compliance_states')
      .select('framework, items')
      .eq('user_id', uid);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const frameworks: any = {};
    const existingMap = new Map(data?.map(d => [d.framework, d.items]) || []);

    for (const [key, defaultItems] of Object.entries(DEFAULTS)) {
      if (existingMap.has(key)) {
        const items = existingMap.get(key);
        frameworks[key] = { items, score: calculateScore(items) };
      } else {
        const items = defaultItems;
        await supabase.from('compliance_states').insert({
          user_id: uid,
          framework: key,
          items
        });
        frameworks[key] = { items, score: calculateScore(items) };
      }
    }

    return NextResponse.json({ frameworks });
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

    const { framework, itemId, passed } = await req.json();

    const { data: existing, error: fetchError } = await supabase
      .from('compliance_states')
      .select('items')
      .eq('user_id', uid)
      .eq('framework', framework)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json({ error: fetchError?.message || 'Framework not found' }, { status: 500 });
    }

    const newItems = existing.items.map((item: any) => 
      item.id === itemId ? { ...item, passed } : item
    );

    const { error: updateError } = await supabase
      .from('compliance_states')
      .update({ items: newItems })
      .eq('user_id', uid)
      .eq('framework', framework);

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 });
    }

    await writeAudit(uid, email ?? '', {
      action: 'COMPLIANCE_ITEM_UPDATED',
      category: 'system',
      severity: 'info',
      resource: `compliance:${framework}`,
      details: { itemId, passed }
    });

    return NextResponse.json({ framework, score: calculateScore(newItems), items: newItems });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
