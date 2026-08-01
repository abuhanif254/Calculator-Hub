import { createClient } from '@/lib/supabase/server';

export type AuditCategory = 'connection' | 'scan' | 'rule' | 'auth' | 'system';
export type AuditSeverity = 'info' | 'warning' | 'error';

export interface AuditEvent {
  action: string;              // e.g. 'CONNECTION_CREATED'
  category: AuditCategory;
  severity?: AuditSeverity;   // default 'info'
  resource?: string;           // human-readable resource name
  details?: Record<string, unknown>; // extra JSON context
}

/**
 * Write an audit log entry. Non-blocking — failure is logged but never
 * surfaces to the caller so it never breaks the main request flow.
 */
export async function writeAudit(
  userId: string,
  userEmail: string | undefined,
  event: AuditEvent
): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.from('audit_logs').insert({
      user_id:    userId,
      user_email: userEmail ?? null,
      action:     event.action,
      category:   event.category,
      severity:   event.severity ?? 'info',
      resource:   event.resource ?? null,
      details:    event.details ?? null,
    });
  } catch (err) {
    // Audit failures must never affect the main response
    console.warn('[audit] Failed to write audit log:', err);
  }
}
