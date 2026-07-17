/**
 * PII Detection Engine
 * Detects 30+ types of Personally Identifiable Information using
 * regex patterns, heuristics, and column name analysis.
 */

export type PiiType =
  | 'email' | 'phone' | 'ssn' | 'credit_card' | 'ip_address' | 'ipv6'
  | 'date_of_birth' | 'full_name' | 'first_name' | 'last_name'
  | 'zip_code' | 'iban' | 'mac_address' | 'url' | 'passport'
  | 'drivers_license' | 'bank_account' | 'vin' | 'coordinates'
  | 'username' | 'password_hash' | 'medical_record' | 'gender'
  | 'address' | 'age' | 'national_id' | 'tax_id' | 'device_id'
  | 'api_key' | 'jwt_token' | 'uuid';

export type RiskLevel = 'High' | 'Medium' | 'Low';

export interface PiiDetectionResult {
  type: PiiType;
  label: string;
  confidence: number; // 0–100
  risk: RiskLevel;
  matchCount: number;
  sampleMasked: string;
  category: string;
}

// ── Regex patterns ──────────────────────────────────────────────────────────

const PATTERNS: Record<PiiType, RegExp> = {
  email:           /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g,
  phone:           /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
  ssn:             /\b\d{3}[-\s]?\d{2}[-\s]?\d{4}\b/g,
  credit_card:     /\b(?:4\d{12}(?:\d{3})?|5[1-5]\d{14}|3[47]\d{13}|6(?:011|5\d{2})\d{12})\b/g,
  ip_address:      /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g,
  ipv6:            /\b(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}\b/g,
  date_of_birth:   /\b(?:0?[1-9]|1[0-2])[-\/.](?:0?[1-9]|[12]\d|3[01])[-\/.](?:19|20)\d{2}\b/g,
  full_name:       /\b[A-Z][a-z]{1,20}\s[A-Z][a-z]{1,20}(?:\s[A-Z][a-z]{1,20})?\b/g,
  first_name:      /\b[A-Z][a-z]{2,15}\b/g,
  last_name:       /\b[A-Z][a-z]{2,20}\b/g,
  zip_code:        /\b\d{5}(?:-\d{4})?\b/g,
  iban:            /\b[A-Z]{2}\d{2}[A-Z0-9]{4}\d{7}(?:[A-Z0-9]?){0,16}\b/g,
  mac_address:     /\b(?:[0-9A-Fa-f]{2}[:\-]){5}[0-9A-Fa-f]{2}\b/g,
  url:             /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&/=]*/g,
  passport:        /\b[A-Z]{1,2}\d{6,9}\b/g,
  drivers_license: /\b[A-Z]\d{7}\b|\b\d{7}[A-Z]\b/g,
  bank_account:    /\b\d{8,17}\b/g,
  vin:             /\b[A-HJ-NPR-Z0-9]{17}\b/g,
  coordinates:     /[-+]?(?:[1-8]?\d(?:\.\d+)?|90(?:\.0+)?),\s*[-+]?(?:180(?:\.0+)?|(?:1[0-7]\d|[1-9]?\d)(?:\.\d+)?)/g,
  username:        /\b@[a-zA-Z0-9_]{3,30}\b/g,
  password_hash:   /\b(?:\$2[aby]?\$\d{2}\$|sha256:|md5:)[a-zA-Z0-9./+]{20,}\b/g,
  medical_record:  /\b(?:MRN|mrn|MR)?[-#]?\d{6,10}\b/g,
  gender:          /\b(?:male|female|non-binary|nonbinary|transgender|cisgender)\b/gi,
  address:         /\b\d{1,5}\s[A-Z][a-zA-Z\s]{2,30}(?:Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Drive|Dr|Lane|Ln|Court|Ct|Way)\b/gi,
  age:             /\b(?:age[d]?\s*:?\s*)(\d{1,3})\b/gi,
  national_id:     /\b\d{9,12}\b/g,
  tax_id:          /\b\d{2}[-\s]?\d{7}\b/g,
  device_id:       /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g,
  api_key:         /\b(?:sk-|pk-|api-|key-)[a-zA-Z0-9_\-]{20,60}\b/g,
  jwt_token:       /\beyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\b/g,
  uuid:            /\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}\b/g,
};

// ── Column name hints ───────────────────────────────────────────────────────

const COLUMN_HINTS: Record<PiiType, string[]> = {
  email:           ['email', 'e_mail', 'mail', 'email_address', 'contact_email', 'user_email'],
  phone:           ['phone', 'mobile', 'telephone', 'cell', 'tel', 'contact_number', 'phone_number'],
  ssn:             ['ssn', 'social_security', 'sin', 'social_security_number'],
  credit_card:     ['card', 'cc', 'credit_card', 'card_number', 'pan', 'card_no'],
  ip_address:      ['ip', 'ip_address', 'client_ip', 'remote_addr', 'ipaddr', 'ip_addr'],
  ipv6:            ['ipv6', 'ip_v6'],
  date_of_birth:   ['dob', 'birth_date', 'date_of_birth', 'birthdate', 'birthday', 'born'],
  full_name:       ['name', 'full_name', 'fullname', 'display_name', 'contact_name', 'customer_name'],
  first_name:      ['first_name', 'firstname', 'given_name', 'fname'],
  last_name:       ['last_name', 'lastname', 'surname', 'family_name', 'lname'],
  zip_code:        ['zip', 'zip_code', 'postal', 'postal_code', 'postcode'],
  iban:            ['iban', 'bank_iban'],
  mac_address:     ['mac', 'mac_address', 'hardware_id', 'device_mac'],
  url:             ['url', 'website', 'link', 'href', 'web_url', 'profile_url'],
  passport:        ['passport', 'passport_no', 'passport_number'],
  drivers_license: ['license', 'dl', 'drivers_license', 'driving_license', 'license_no'],
  bank_account:    ['account', 'bank_account', 'account_number', 'routing'],
  vin:             ['vin', 'vehicle_id', 'chassis'],
  coordinates:     ['lat', 'lng', 'latitude', 'longitude', 'geo', 'coords', 'location'],
  username:        ['username', 'user_name', 'login', 'handle', 'screen_name', 'user_handle'],
  password_hash:   ['password', 'passwd', 'pwd', 'hash', 'password_hash', 'secret'],
  medical_record:  ['mrn', 'medical_record', 'patient_id', 'record_id'],
  gender:          ['gender', 'sex', 'gender_identity'],
  address:         ['address', 'street', 'street_address', 'addr', 'home_address'],
  age:             ['age', 'years_old'],
  national_id:     ['national_id', 'nin', 'nid', 'citizen_id'],
  tax_id:          ['tax_id', 'tin', 'ein', 'vat', 'tax_number'],
  device_id:       ['device_id', 'device_uuid', 'installation_id'],
  api_key:         ['api_key', 'access_token', 'secret_key', 'auth_token', 'token'],
  jwt_token:       ['jwt', 'token', 'access_token', 'bearer', 'auth_token'],
  uuid:            ['uuid', 'guid', 'id'],
};

const RISK_MAP: Record<PiiType, RiskLevel> = {
  ssn: 'High', credit_card: 'High', passport: 'High', bank_account: 'High',
  iban: 'High', medical_record: 'High', drivers_license: 'High', tax_id: 'High',
  national_id: 'High', password_hash: 'High', api_key: 'High', jwt_token: 'High',
  email: 'High', phone: 'High', date_of_birth: 'High',
  full_name: 'Medium', first_name: 'Medium', last_name: 'Medium',
  address: 'Medium', ip_address: 'Medium', coordinates: 'Medium',
  vin: 'Medium', device_id: 'Medium', username: 'Medium',
  zip_code: 'Low', url: 'Low', mac_address: 'Low', gender: 'Low',
  ipv6: 'Low', age: 'Low', uuid: 'Low',
};

const LABELS: Record<PiiType, string> = {
  email: 'Email Address', phone: 'Phone Number', ssn: 'Social Security Number',
  credit_card: 'Credit Card', ip_address: 'IP Address (v4)', ipv6: 'IP Address (v6)',
  date_of_birth: 'Date of Birth', full_name: 'Full Name', first_name: 'First Name',
  last_name: 'Last Name', zip_code: 'ZIP / Postal Code', iban: 'IBAN',
  mac_address: 'MAC Address', url: 'URL / Website', passport: 'Passport Number',
  drivers_license: "Driver's License", bank_account: 'Bank Account Number',
  vin: 'Vehicle VIN', coordinates: 'GPS Coordinates', username: 'Username / Handle',
  password_hash: 'Password / Hash', medical_record: 'Medical Record ID',
  gender: 'Gender', address: 'Street Address', age: 'Age',
  national_id: 'National ID', tax_id: 'Tax ID / EIN', device_id: 'Device ID',
  api_key: 'API Key / Token', jwt_token: 'JWT Token', uuid: 'UUID / GUID',
};

const CATEGORIES: Record<PiiType, string> = {
  email: 'Contact', phone: 'Contact', url: 'Contact', username: 'Contact',
  full_name: 'Identity', first_name: 'Identity', last_name: 'Identity',
  ssn: 'Government ID', passport: 'Government ID', national_id: 'Government ID',
  drivers_license: 'Government ID', tax_id: 'Financial',
  credit_card: 'Financial', bank_account: 'Financial', iban: 'Financial',
  ip_address: 'Network', ipv6: 'Network', mac_address: 'Network', device_id: 'Network',
  date_of_birth: 'Demographics', gender: 'Demographics', age: 'Demographics',
  address: 'Location', zip_code: 'Location', coordinates: 'Location',
  medical_record: 'Medical', password_hash: 'Security', api_key: 'Security',
  jwt_token: 'Security', vin: 'Vehicle', uuid: 'System',
};

// ── Core detection function ─────────────────────────────────────────────────

function maskSample(value: string, type: PiiType): string {
  if (type === 'email') {
    const [local, domain] = value.split('@');
    return `${local[0]}***@***.${domain?.split('.').pop()}`;
  }
  if (type === 'credit_card') return `****-****-****-${value.slice(-4)}`;
  if (type === 'ssn') return `***-**-${value.slice(-4)}`;
  if (type === 'phone') return `***-***-${value.slice(-4)}`;
  const half = Math.ceil(value.length / 2);
  return value.slice(0, 2) + '*'.repeat(half) + value.slice(-2);
}

export function detectPii(values: string[], columnName: string = ''): PiiDetectionResult | null {
  const sample = values.filter(Boolean).slice(0, 200).join('\n');
  const colLower = columnName.toLowerCase().replace(/[^a-z0-9]/g, '_');

  let bestType: PiiType | null = null;
  let bestScore = 0;
  let bestMatchCount = 0;
  let bestSample = '';

  for (const [type, pattern] of Object.entries(PATTERNS) as [PiiType, RegExp][]) {
    // Reset regex state
    const regex = new RegExp(pattern.source, pattern.flags.replace('g', '') + 'g');
    const matches = sample.match(regex) || [];
    const matchCount = matches.length;
    if (matchCount === 0) continue;

    const valueMatchRate = matchCount / Math.min(values.length, 200);
    let score = valueMatchRate * 60;

    // Column name bonus
    const hints = COLUMN_HINTS[type] || [];
    if (hints.some(h => colLower.includes(h) || h.includes(colLower))) {
      score += 35;
    }

    // Specificity bonus (longer, more specific patterns score higher)
    if (type === 'email') score += 15;
    if (type === 'ssn') score += 20;
    if (type === 'credit_card') score += 20;

    if (score > bestScore) {
      bestScore = score;
      bestType = type;
      bestMatchCount = matchCount;
      bestSample = matches[0] || '';
    }
  }

  // Pure column name match (no values to scan)
  if (!bestType) {
    for (const [type, hints] of Object.entries(COLUMN_HINTS) as [PiiType, string[]][]) {
      if (hints.some(h => colLower === h || colLower.includes(h))) {
        bestType = type as PiiType;
        bestScore = 65;
        bestMatchCount = 0;
        break;
      }
    }
  }

  if (!bestType || bestScore < 20) return null;

  const confidence = Math.min(99, Math.round(bestScore));
  return {
    type: bestType,
    label: LABELS[bestType],
    confidence,
    risk: RISK_MAP[bestType] || 'Low',
    matchCount: bestMatchCount,
    sampleMasked: bestSample ? maskSample(bestSample, bestType) : '***',
    category: CATEGORIES[bestType] || 'Other',
  };
}

export { LABELS, RISK_MAP, CATEGORIES };
