import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAudit } from '@/lib/supabase/audit';
import { encrypt, decrypt } from '@/lib/supabase/encryption';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { name, type, value, rotation_reminder_days } = body;

    const updates: any = {};
    if (name !== undefined) updates.name = name;
    if (type !== undefined) updates.type = type;
    if (rotation_reminder_days !== undefined) updates.rotation_reminder_days = rotation_reminder_days;

    if (value !== undefined) {
      updates.encrypted_value = await encrypt(value);
      updates.last_rotated_at = new Date().toISOString();
    }

    const { data: secret, error } = await supabase
      .from('secrets')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select('id, name, type, rotation_reminder_days, last_rotated_at, created_at')
      .single();

    if (error) throw error;

    void writeAudit(user.id, user.email, {
      action: 'SECRET_UPDATED',
      category: 'system',
      severity: 'info',
      resource: `secrets/${id}`,
      details: { name: secret.name }
    });

    return NextResponse.json({ secret });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { error } = await supabase
      .from('secrets')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) throw error;

    void writeAudit(user.id, user.email, {
      action: 'SECRET_DELETED',
      category: 'system',
      severity: 'warning',
      resource: `secrets/${id}`,
      details: { id }
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data: secret, error } = await supabase
      .from('secrets')
      .select('encrypted_value')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) throw error;
    if (!secret || !secret.encrypted_value) throw new Error('Secret not found');

    const decryptedValue = await decrypt(secret.encrypted_value);

    void writeAudit(user.id, user.email, {
      action: 'SECRET_DECRYPTED',
      category: 'system',
      severity: 'info',
      resource: `secrets/${id}`,
      details: { id }
    });

    return NextResponse.json({ value: decryptedValue });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
