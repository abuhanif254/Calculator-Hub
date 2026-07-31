/**
 * Server-side PII detector definitions.
 * These run in API routes (Node.js), NOT in the browser.
 * Each detector has a regex factory function (not a literal) for safe reuse across rows.
 */

export interface PiiDetector {
  id: string;
  name: string;
  category: string;
  risk: 'Critical' | 'High' | 'Medium' | 'Low';
  confidence: number;
  makeRegex: () => RegExp;
  recommendation: string;
}

export const SERVER_PII_DETECTORS: PiiDetector[] = [
  {
    id: 'email', name: 'Email Address', category: 'Contact Info', risk: 'High', confidence: 99,
    makeRegex: () => /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g,
    recommendation: 'Pseudonymize or hash email addresses per GDPR Article 4(5)',
  },
  {
    id: 'ssn', name: 'Social Security Number', category: 'Government ID', risk: 'Critical', confidence: 97,
    makeRegex: () => /\b(?!000|666|9\d{2})\d{3}[\-\s]?(?!00)\d{2}[\-\s]?(?!0000)\d{4}\b/g,
    recommendation: 'Immediately redact SSNs — maximum HIPAA/PCI risk',
  },
  {
    id: 'creditcard', name: 'Credit Card Number', category: 'Financial', risk: 'Critical', confidence: 95,
    makeRegex: () => /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})\b/g,
    recommendation: 'PCI-DSS requires storing only last 4 digits of PAN',
  },
  {
    id: 'phone', name: 'Phone Number', category: 'Contact Info', risk: 'Medium', confidence: 88,
    makeRegex: () => /\b(?:\+?\d{1,3}[\s.\-]?)?\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4}\b/g,
    recommendation: 'Mask phone middle digits, preserve country code',
  },
  {
    id: 'ip', name: 'IP Address (IPv4)', category: 'Network', risk: 'Medium', confidence: 95,
    makeRegex: () => /\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/g,
    recommendation: 'GDPR treats IP as personal data — generalize to subnet',
  },
  {
    id: 'dob', name: 'Date of Birth', category: 'Personal Info', risk: 'High', confidence: 85,
    makeRegex: () => /\b(?:0?[1-9]|1[0-2])[\-\/](?:0?[1-9]|[12]\d|3[01])[\-\/](?:19|20)\d{2}\b/g,
    recommendation: 'Replace with age range to minimize re-identification risk',
  },
  {
    id: 'jwt', name: 'JWT Token', category: 'Security', risk: 'Critical', confidence: 99,
    makeRegex: () => /\beyJ[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\b/g,
    recommendation: 'Rotate token immediately — JWTs contain signed claims',
  },
  {
    id: 'apikey', name: 'API Key / Secret', category: 'Security', risk: 'Critical', confidence: 80,
    makeRegex: () => /(?:api[_-]?key|secret|token|password|passwd|pwd)\s*[:=]\s*['"]?([A-Za-z0-9_.\-]{16,})/gi,
    recommendation: 'Rotate all exposed API keys immediately and store in secrets vault',
  },
  {
    id: 'iban', name: 'IBAN', category: 'Financial', risk: 'High', confidence: 96,
    makeRegex: () => /\b[A-Z]{2}[0-9]{2}[A-Z0-9]{4}[0-9]{7}(?:[A-Z0-9]{0,16})\b/g,
    recommendation: 'Apply PCI-DSS masking for all banking identifiers',
  },
  {
    id: 'zip', name: 'ZIP / Postal Code', category: 'Location', risk: 'Low', confidence: 82,
    makeRegex: () => /\b\d{5}(?:-\d{4})?\b/g,
    recommendation: 'HIPAA: generalize to 3-digit ZIP for populations < 20,000',
  },
];

/**
 * Scan a single string value against all PII detectors.
 * Returns array of detector IDs that matched.
 */
export function scanValue(value: string): string[] {
  if (!value || typeof value !== 'string' || value.length > 10000) return [];
  const matched: string[] = [];
  for (const detector of SERVER_PII_DETECTORS) {
    const regex = detector.makeRegex();
    if (regex.test(value)) {
      matched.push(detector.id);
    }
  }
  return matched;
}
