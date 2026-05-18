// YAML Formatter Utility Functions - Client-side only
import yaml from 'js-yaml';

export type IndentWidth = '2' | '4' | '8';

export interface YamlValidation {
  valid: boolean;
  error: string | null;
  line: number | null;
  column: number | null;
}

export interface YamlAnalysis {
  length: number;
  lines: number;
  keys: number;
  depth: number;
  documents: number;
  hasComments: boolean;
  hasAnchors: boolean;
}

export interface LintOptions {
  indentWidth: number;
  checkTrailingSpaces: boolean;
  checkDuplicateKeys: boolean;
}

export interface LintIssue {
  line: number;
  message: string;
  severity: 'warning' | 'error';
}

export const EXAMPLE_YAMLS = [
  {
    name: 'Kubernetes Deployment',
    yaml: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
  labels:
    app: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
        - name: nginx
          image: nginx:1.25
          ports:
            - containerPort: 80
          resources:
            requests:
              memory: "64Mi"
              cpu: "250m"
            limits:
              memory: "128Mi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /
              port: 80
            initialDelaySeconds: 15
            periodSeconds: 10`,
  },
  {
    name: 'Docker Compose',
    yaml: `version: "3.9"
services:
  web:
    build: .
    ports:
      - "8080:80"
    depends_on:
      - db
      - redis
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/mydb
      REDIS_URL: redis://redis:6379
    volumes:
      - ./app:/usr/src/app
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: mydb
    volumes:
      - pgdata:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:`,
  },
  {
    name: 'GitHub Actions',
    yaml: `name: CI Pipeline
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20, 22]
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: echo "Deploying..."`,
  },
  {
    name: 'Simple Config',
    yaml: `app:
  name: My Application
  version: 2.1.0
  debug: false

server:
  host: 0.0.0.0
  port: 3000
  ssl: true

database:
  host: localhost
  port: 5432
  name: production_db
  pool:
    min: 5
    max: 20

logging:
  level: info
  format: json
  file: /var/log/app.log`,
  },
  {
    name: 'Nested API Config',
    yaml: `api:
  gateway:
    baseUrl: https://api.example.com
    timeout: 30000
    retries: 3
    headers:
      Content-Type: application/json
      Accept: application/json
  endpoints:
    users:
      path: /v2/users
      methods:
        - GET
        - POST
        - PUT
        - DELETE
      rateLimit:
        requests: 100
        window: 60
    products:
      path: /v2/products
      methods:
        - GET
      cache:
        enabled: true
        ttl: 300
  auth:
    type: oauth2
    tokenUrl: https://auth.example.com/token
    scopes:
      - read
      - write
      - admin`,
  },
];

export function validateYaml(input: string): YamlValidation {
  if (!input.trim()) return { valid: true, error: null, line: null, column: null };
  try {
    yaml.loadAll(input);
    return { valid: true, error: null, line: null, column: null };
  } catch (e: any) {
    return {
      valid: false,
      error: e.message || 'Invalid YAML',
      line: e.mark?.line != null ? e.mark.line + 1 : null,
      column: e.mark?.column != null ? e.mark.column + 1 : null,
    };
  }
}

export function formatYaml(input: string, indentWidth: number = 2): string {
  const documents = input.split(/^---$/m);
  const formatted = documents.map((doc) => {
    const trimmed = doc.trim();
    if (!trimmed) return '';
    try {
      const parsed = yaml.load(trimmed);
      return yaml.dump(parsed, {
        indent: indentWidth,
        lineWidth: -1,
        noRefs: false,
        sortKeys: false,
        quotingType: '"',
        forceQuotes: false,
      }).trimEnd();
    } catch {
      return trimmed;
    }
  }).filter(Boolean);

  return formatted.join('\n---\n');
}

export function minifyYaml(input: string): string {
  try {
    const docs: any[] = [];
    yaml.loadAll(input, (doc) => docs.push(doc));
    return docs.map((doc) =>
      yaml.dump(doc, { indent: 1, lineWidth: -1, flowLevel: 0, noRefs: false }).trimEnd()
    ).join('\n---\n');
  } catch {
    return input.replace(/\s+/g, ' ').trim();
  }
}

export function yamlToJson(input: string): string {
  const docs: any[] = [];
  yaml.loadAll(input, (doc) => docs.push(doc));
  if (docs.length === 1) return JSON.stringify(docs[0], null, 2);
  return JSON.stringify(docs, null, 2);
}

export function jsonToYaml(input: string, indentWidth: number = 2): string {
  const parsed = JSON.parse(input);
  return yaml.dump(parsed, {
    indent: indentWidth,
    lineWidth: -1,
    noRefs: false,
    sortKeys: false,
  }).trimEnd();
}

export function analyzeYaml(input: string): YamlAnalysis {
  if (!input.trim()) {
    return { length: 0, lines: 0, keys: 0, depth: 0, documents: 0, hasComments: false, hasAnchors: false };
  }
  const lines = input.split('\n');
  const documents = input.split(/^---$/m).filter(d => d.trim()).length;
  const hasComments = /^\s*#/m.test(input);
  const hasAnchors = /[&*]\w+/.test(input);

  let keys = 0;
  let maxDepth = 0;
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || trimmed === '---' || trimmed === '...') continue;
    if (/^\w[\w\s.-]*:/.test(trimmed) || /^"[^"]*":/.test(trimmed) || /^'[^']*':/.test(trimmed)) keys++;
    const indent = line.length - line.trimStart().length;
    const depth = Math.floor(indent / 2) + 1;
    if (depth > maxDepth) maxDepth = depth;
  }

  return { length: input.length, lines: lines.length, keys, depth: maxDepth, documents, hasComments, hasAnchors };
}

export function lintYaml(input: string, options: LintOptions): LintIssue[] {
  const issues: LintIssue[] = [];
  if (!input.trim()) return issues;

  const lines = input.split('\n');
  const seenKeys = new Map<string, number>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Trailing spaces
    if (options.checkTrailingSpaces && /\s+$/.test(line) && line.trim().length > 0) {
      issues.push({ line: lineNum, message: 'Trailing whitespace', severity: 'warning' });
    }

    // Tab characters
    if (/\t/.test(line)) {
      issues.push({ line: lineNum, message: 'Tab character found (use spaces)', severity: 'error' });
    }

    // Indentation check
    const leadingSpaces = line.length - line.trimStart().length;
    if (line.trim().length > 0 && leadingSpaces > 0 && leadingSpaces % options.indentWidth !== 0) {
      issues.push({ line: lineNum, message: `Indentation is ${leadingSpaces} spaces (expected multiple of ${options.indentWidth})`, severity: 'warning' });
    }

    // Duplicate keys
    if (options.checkDuplicateKeys) {
      const keyMatch = line.match(/^(\s*)([\w.-]+)\s*:/);
      if (keyMatch) {
        const indent = keyMatch[1].length;
        const key = `${indent}:${keyMatch[2]}`;
        if (seenKeys.has(key)) {
          issues.push({ line: lineNum, message: `Duplicate key "${keyMatch[2]}" (first at line ${seenKeys.get(key)})`, severity: 'warning' });
        } else {
          seenKeys.set(key, lineNum);
        }
      }
    }
  }

  return issues;
}

export function computeDiff(original: string, formatted: string): { type: 'same' | 'added' | 'removed'; text: string }[] {
  const origLines = original.split('\n');
  const fmtLines = formatted.split('\n');
  const result: { type: 'same' | 'added' | 'removed'; text: string }[] = [];
  const origSet = new Set(origLines.map(l => l.trim()));
  const fmtSet = new Set(fmtLines.map(l => l.trim()));

  for (const line of fmtLines) {
    const trimmed = line.trim();
    if (!trimmed) { result.push({ type: 'same', text: line }); continue; }
    result.push({ type: origSet.has(trimmed) ? 'same' : 'added', text: line });
  }
  for (const line of origLines) {
    const trimmed = line.trim();
    if (trimmed && !fmtSet.has(trimmed)) result.push({ type: 'removed', text: line });
  }
  return result;
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  } catch { return false; }
}
