/**
 * generateRedirectMap.js
 *
 * Regenerates lib/calcRedirectMap.ts from i18n/routing.ts.
 * Run whenever you add new calculator routes to routing.ts:
 *
 *   node scripts/generateRedirectMap.js
 *
 * The generated file is imported by middleware.ts for O(1) 404→301 redirects.
 */

const fs = require('fs');
const path = require('path');

const routingPath = path.join(__dirname, '../i18n/routing.ts');
const outputPath = path.join(__dirname, '../lib/calcRedirectMap.ts');

const content = fs.readFileSync(routingPath, 'utf-8');
const lines = content.split('\n');

// Parse all /calculators/* pathname entries
const routes = [];
let inBlock = false;
let currentKey = '';
let block = {};

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();

  const keyMatch = line.match(/^'(\/calculators\/[^'\[]+)':\s*\{/);
  if (keyMatch) {
    currentKey = keyMatch[1];
    inBlock = true;
    block = {};
    continue;
  }

  if (inBlock) {
    const enM = line.match(/en:\s*'([^']*)'/);
    const esM = line.match(/es:\s*'([^']*)'/);
    const frM = line.match(/fr:\s*'([^']*)'/);
    const deM = line.match(/de:\s*'([^']*)'/);
    if (enM) block.en = enM[1];
    if (esM) block.es = esM[1];
    if (frM) block.fr = frM[1];
    if (deM) block.de = deM[1];

    if (line === '},' || line.endsWith('},')) {
      if (block.en && block.es && block.fr && block.de) {
        routes.push({ key: currentKey, ...block });
      }
      inBlock = false;
    }
  }
}

console.log(`Parsed ${routes.length} calculator routes from routing.ts`);

// Build redirect map
const redirectMap = {};

function add(src, dest) {
  if (src !== dest && !redirectMap[src]) {
    redirectMap[src] = dest;
  }
}

for (const r of routes) {
  const enSlug = r.en.replace('/calculators/', '');
  const esSlug = r.es.replace('/calculadoras/', '');
  const frSlug = r.fr.replace('/calculatrices/', '');
  const deSlug = r.de.replace('/rechner/', '');

  // Category 1: wrong-prefix with EN slug → correct prefix + correct slug
  add('/es/calculators/' + enSlug, '/es/calculadoras/' + esSlug);
  add('/fr/calculators/' + enSlug, '/fr/calculatrices/' + frSlug);
  add('/de/calculators/' + enSlug, '/de/rechner/' + deSlug);

  // Category 1b: correct prefix but EN slug (after wildcard prefix redirect)
  add('/es/calculadoras/' + enSlug, '/es/calculadoras/' + esSlug);
  add('/fr/calculatrices/' + enSlug, '/fr/calculatrices/' + frSlug);
  add('/de/rechner/' + enSlug, '/de/rechner/' + deSlug);

  // Category 2: cross-locale slug contamination
  add('/en/calculators/' + deSlug, '/en/calculators/' + enSlug);
  add('/en/calculators/' + esSlug, '/en/calculators/' + enSlug);
  add('/en/calculators/' + frSlug, '/en/calculators/' + enSlug);

  add('/es/calculadoras/' + deSlug, '/es/calculadoras/' + esSlug);
  add('/es/calculadoras/' + frSlug, '/es/calculadoras/' + esSlug);

  add('/fr/calculatrices/' + deSlug, '/fr/calculatrices/' + frSlug);
  add('/fr/calculatrices/' + esSlug, '/fr/calculatrices/' + frSlug);

  add('/de/rechner/' + frSlug, '/de/rechner/' + deSlug);
  add('/de/rechner/' + esSlug, '/de/rechner/' + deSlug);

  // Category 3: no locale prefix - translated slug at root /calculators/
  add('/calculators/' + frSlug, '/fr/calculatrices/' + frSlug);
  add('/calculators/' + esSlug, '/es/calculadoras/' + esSlug);
  add('/calculators/' + deSlug, '/de/rechner/' + deSlug);
}

const entries = Object.entries(redirectMap);
console.log(`Generated ${entries.length} redirect entries`);

// Write TypeScript output
let ts = '// AUTO-GENERATED from i18n/routing.ts — DO NOT EDIT MANUALLY\n';
ts += '// Regenerate with: node scripts/generateRedirectMap.js\n';
ts += '// Maps wrong calculator URL paths → correct canonical locale URL\n';
ts += '// Used by middleware.ts for O(1) 301 redirects on every request.\n\n';
ts += '// prettier-ignore\n';
ts += 'export const CALC_REDIRECT_MAP: Record<string, string> = {\n';
for (const [src, dest] of entries) {
  ts += "  '" + src + "': '" + dest + "',\n";
}
ts += '};\n';

fs.writeFileSync(outputPath, ts);
console.log(`Written to ${outputPath} (${ts.length} bytes)`);
