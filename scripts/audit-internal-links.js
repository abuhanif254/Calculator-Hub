/**
 * Internal-link integrity audit (run AFTER `next build`):  node scripts/audit-internal-links.js
 *
 * Why: broken or redirecting internal links are how Googlebot discovers URLs that end up in
 * Search Console as "Page with redirect" / "Not found (404)". This script fails (exit 1) if:
 *   1. any internal link inside content/**.md does not point at a real, final (200) page
 *      (ground truth = the built sitemap.xml, which only lists canonical localized pages), or
 *   2. any relatedTools entry in lib/data/tools/*.ts points at neither a tool nor a calculator.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASE = 'https://www.nexuscalculator.net';
const smPath = path.join(ROOT, '.next/server/app/sitemap.xml.body');
if (!fs.existsSync(smPath)) {
  console.error('Build output not found. Run `npm run build` first.');
  process.exit(2);
}
const sm = fs.readFileSync(smPath, 'utf8');

const valid = new Set();
for (const m of sm.matchAll(/(?:<loc>|href=")([^<"]+)(?:<\/loc>|")/g)) {
  if (m[1].startsWith(BASE)) valid.add(m[1].replace(BASE, ''));
}

function walk(dir, ext, out = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p, ext, out);
    else if (f.name.endsWith(ext)) out.push(p);
  }
  return out;
}

const problems = [];

// 1) Markdown internal links
for (const file of walk(path.join(ROOT, 'content'), '.md')) {
  const txt = fs.readFileSync(file, 'utf8');
  const links = [...txt.matchAll(/\]\((\/[^)\s]*)\)/g), ...txt.matchAll(/href="(\/[^"]+)"/g)].map((m) => m[1]);
  for (const raw of links) {
    const u = raw.split('#')[0].split('?')[0].replace(/\/+$/, '') || '/';
    if (/\.(ico|png|jpg|jpeg|svg|webmanifest|xml|txt|webp)$/i.test(u)) continue; // static assets
    if (!valid.has(u)) problems.push(`${path.relative(ROOT, file)}: ${raw}`);
  }
}

// 2) relatedTools slugs must resolve to a tool page or a calculator page
const enSlugs = (kind) => new Set([...sm.matchAll(new RegExp(`/en/${kind}/([a-z0-9-]+)<`, 'g'))].map((m) => m[1]));
const tools = enSlugs('tools');
const calcs = enSlugs('calculators');
const toolsDir = path.join(ROOT, 'lib/data/tools');
for (const f of fs.readdirSync(toolsDir).filter((x) => x.endsWith('.ts'))) {
  const t = fs.readFileSync(path.join(toolsDir, f), 'utf8');
  for (const m of t.matchAll(/\{\s*name:\s*["']([^"']+)["']\s*,\s*slug:\s*["']([^"']+)["']\s*\}/g)) {
    if (!tools.has(m[2]) && !calcs.has(m[2])) problems.push(`lib/data/tools/${f}: relatedTools slug "${m[2]}" has no page`);
  }
}

if (problems.length) {
  console.error(`\u2716 ${problems.length} broken internal link(s):\n` + problems.map((p) => '  - ' + p).join('\n'));
  process.exit(1);
}
console.log(`\u2714 Internal link audit passed (${valid.size} canonical URLs known).`);
