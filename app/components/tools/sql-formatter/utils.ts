// SQL Formatter Utility Functions - Client-side only

export type SqlDialect = 'sql' | 'mysql' | 'postgresql' | 'sqlite' | 'transactsql' | 'plsql' | 'mariadb' | 'bigquery' | 'snowflake';
export type KeywordCase = 'upper' | 'lower' | 'preserve';
export type IndentStyle = '2' | '4' | 'tab';

export interface FormatPreset {
  name: string;
  indent: IndentStyle;
  keywordCase: KeywordCase;
  dialect: SqlDialect;
}

export const FORMAT_PRESETS: FormatPreset[] = [
  { name: 'Readable', indent: '2', keywordCase: 'upper', dialect: 'sql' },
  { name: 'Compact', indent: '2', keywordCase: 'preserve', dialect: 'sql' },
  { name: 'Enterprise', indent: '4', keywordCase: 'upper', dialect: 'sql' },
  { name: 'PostgreSQL Style', indent: '4', keywordCase: 'lower', dialect: 'postgresql' },
  { name: 'MySQL Style', indent: '2', keywordCase: 'upper', dialect: 'mysql' },
  { name: 'Tabs', indent: 'tab', keywordCase: 'upper', dialect: 'sql' },
  { name: '2 Spaces', indent: '2', keywordCase: 'upper', dialect: 'sql' },
  { name: '4 Spaces', indent: '4', keywordCase: 'upper', dialect: 'sql' },
];

export const DIALECT_OPTIONS: { value: SqlDialect; label: string }[] = [
  { value: 'sql', label: 'Standard SQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'transactsql', label: 'SQL Server (T-SQL)' },
  { value: 'plsql', label: 'Oracle (PL/SQL)' },
  { value: 'mariadb', label: 'MariaDB' },
  { value: 'bigquery', label: 'BigQuery' },
  { value: 'snowflake', label: 'Snowflake' },
];

export const EXAMPLE_QUERIES = [
  {
    name: 'SELECT Query',
    sql: `SELECT u.id, u.name, u.email, p.plan_name, COUNT(o.id) AS order_count, SUM(o.total) AS total_spent FROM users u INNER JOIN subscriptions s ON u.id = s.user_id INNER JOIN plans p ON s.plan_id = p.id LEFT JOIN orders o ON u.id = o.user_id WHERE u.active = 1 AND s.expires_at > NOW() GROUP BY u.id, u.name, u.email, p.plan_name HAVING SUM(o.total) > 100 ORDER BY total_spent DESC LIMIT 25;`,
  },
  {
    name: 'JOIN Example',
    sql: `SELECT e.employee_id, e.first_name, e.last_name, d.department_name, m.first_name AS manager_name, l.city, l.country FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN employees m ON e.manager_id = m.employee_id JOIN locations l ON d.location_id = l.location_id WHERE d.department_name IN ('Engineering', 'Marketing', 'Sales') AND e.hire_date >= '2023-01-01' ORDER BY d.department_name, e.last_name;`,
  },
  {
    name: 'Aggregation',
    sql: `SELECT DATE_TRUNC('month', o.created_at) AS month, c.category_name, COUNT(DISTINCT o.customer_id) AS unique_customers, COUNT(o.id) AS total_orders, ROUND(AVG(o.total), 2) AS avg_order_value, SUM(o.total) AS revenue, SUM(o.total) - LAG(SUM(o.total)) OVER (PARTITION BY c.category_name ORDER BY DATE_TRUNC('month', o.created_at)) AS revenue_change FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN products p ON oi.product_id = p.id JOIN categories c ON p.category_id = c.id WHERE o.created_at >= '2024-01-01' AND o.status = 'completed' GROUP BY month, c.category_name ORDER BY month DESC, revenue DESC;`,
  },
  {
    name: 'Stored Procedure',
    sql: `CREATE PROCEDURE UpdateInventory(IN product_id INT, IN quantity INT, IN operation VARCHAR(10)) BEGIN DECLARE current_stock INT; SELECT stock INTO current_stock FROM products WHERE id = product_id FOR UPDATE; IF operation = 'add' THEN UPDATE products SET stock = stock + quantity, updated_at = NOW() WHERE id = product_id; ELSEIF operation = 'remove' THEN IF current_stock >= quantity THEN UPDATE products SET stock = stock - quantity, updated_at = NOW() WHERE id = product_id; ELSE SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Insufficient stock'; END IF; END IF; INSERT INTO inventory_log (product_id, operation, quantity, created_at) VALUES (product_id, operation, quantity, NOW()); END;`,
  },
  {
    name: 'Complex CTE',
    sql: `WITH monthly_revenue AS (SELECT DATE_TRUNC('month', created_at) AS month, SUM(total) AS revenue FROM orders WHERE status = 'completed' GROUP BY DATE_TRUNC('month', created_at)), revenue_growth AS (SELECT month, revenue, LAG(revenue) OVER (ORDER BY month) AS prev_revenue, ROUND(((revenue - LAG(revenue) OVER (ORDER BY month)) / LAG(revenue) OVER (ORDER BY month)) * 100, 2) AS growth_pct FROM monthly_revenue) SELECT month, revenue, prev_revenue, growth_pct, CASE WHEN growth_pct > 20 THEN 'High Growth' WHEN growth_pct > 0 THEN 'Moderate Growth' WHEN growth_pct = 0 THEN 'Flat' ELSE 'Decline' END AS trend FROM revenue_growth ORDER BY month DESC;`,
  },
];

export interface QueryAnalysis {
  length: number;
  lines: number;
  keywords: number;
  joins: number;
  subqueries: number;
  complexity: string;
  readabilityScore: number;
}

const SQL_KEYWORDS = /\b(SELECT|FROM|WHERE|JOIN|INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|FULL\s+JOIN|CROSS\s+JOIN|ON|AND|OR|NOT|IN|EXISTS|BETWEEN|LIKE|IS|NULL|AS|CASE|WHEN|THEN|ELSE|END|GROUP\s+BY|ORDER\s+BY|HAVING|LIMIT|OFFSET|UNION|INTERSECT|EXCEPT|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|ALTER|DROP|TABLE|INDEX|VIEW|PROCEDURE|FUNCTION|TRIGGER|WITH|DISTINCT|ALL|ANY|SOME)\b/gi;

export function analyzeQuery(sql: string): QueryAnalysis {
  if (!sql.trim()) {
    return { length: 0, lines: 0, keywords: 0, joins: 0, subqueries: 0, complexity: 'None', readabilityScore: 0 };
  }

  const length = sql.length;
  const lines = sql.split('\n').length;
  const keywordMatches = sql.match(SQL_KEYWORDS);
  const keywords = keywordMatches ? keywordMatches.length : 0;
  const joinMatches = sql.match(/\b(INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|FULL\s+JOIN|CROSS\s+JOIN|JOIN)\b/gi);
  const joins = joinMatches ? joinMatches.length : 0;
  const subqueryCount = (sql.match(/\(\s*SELECT\b/gi) || []).length;

  let complexityScore = keywords + joins * 3 + subqueryCount * 5;
  let complexity: string;
  if (complexityScore <= 5) complexity = 'Simple';
  else if (complexityScore <= 15) complexity = 'Moderate';
  else if (complexityScore <= 30) complexity = 'Complex';
  else complexity = 'Very Complex';

  const avgLineLen = length / Math.max(lines, 1);
  let readabilityScore = 100;
  if (avgLineLen > 120) readabilityScore -= 30;
  else if (avgLineLen > 80) readabilityScore -= 15;
  if (lines === 1 && length > 100) readabilityScore -= 40;
  if (keywords > 0 && lines > 1) readabilityScore += 10;
  readabilityScore = Math.max(0, Math.min(100, readabilityScore));

  return { length, lines, keywords, joins, subqueries: subqueryCount, complexity, readabilityScore };
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export function validateSql(sql: string): ValidationResult {
  const errors: string[] = [];
  if (!sql.trim()) return { valid: true, errors: [] };

  // Check unmatched parentheses
  let parenCount = 0;
  let inString = false;
  let stringChar = '';
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    if (inString) {
      if (ch === stringChar && sql[i + 1] !== stringChar) inString = false;
    } else {
      if (ch === "'" || ch === '"') { inString = true; stringChar = ch; }
      else if (ch === '(') parenCount++;
      else if (ch === ')') parenCount--;
    }
    if (parenCount < 0) { errors.push('Unexpected closing parenthesis'); break; }
  }
  if (parenCount > 0) errors.push(`${parenCount} unclosed parenthesis(es)`);
  if (inString) errors.push('Unclosed string literal');

  // Check for common issues
  if (/SELECT\s*$/.test(sql.trim())) errors.push('SELECT clause is empty');
  if (/FROM\s*$/.test(sql.trim())) errors.push('FROM clause is empty');

  return { valid: errors.length === 0, errors };
}

export function minifySql(sql: string): string {
  return sql
    .replace(/--[^\n]*/g, '') // remove single-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '') // remove multi-line comments
    .replace(/\s+/g, ' ')
    .replace(/\s*([(),;])\s*/g, '$1')
    .trim();
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
    if (origSet.has(trimmed)) result.push({ type: 'same', text: line });
    else result.push({ type: 'added', text: line });
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
    ta.focus();
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}
