// fix-www-urls.js — one-time script to enforce www in all APP_URL fallbacks
const fs = require('fs');
const path = require('path');

const OLD = "'https://nexuscalculator.net'";
const NEW = "'https://www.nexuscalculator.net'";

const OLD2 = '"https://nexuscalculator.net"';
const NEW2 = '"https://www.nexuscalculator.net"';

function walkDir(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', '.git', '.vercel'].includes(entry.name)) continue;
      walkDir(fullPath, results);
    } else if (entry.isFile() && (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx'))) {
      results.push(fullPath);
    }
  }
  return results;
}

const root = process.cwd();
const files = walkDir(root);
let totalFixed = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (content.includes(OLD)) {
    content = content.split(OLD).join(NEW);
    changed = true;
  }
  if (content.includes(OLD2)) {
    content = content.split(OLD2).join(NEW2);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed:', path.relative(root, file));
    totalFixed++;
  }
}

console.log(`\nTotal files fixed: ${totalFixed}`);
