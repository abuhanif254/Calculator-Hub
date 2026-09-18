const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../lib/data/tools');
const files = fs.readdirSync(toolsDir).filter(f => f.endsWith('.ts') && f !== 'types.ts' && f !== 'index.ts');

console.log(`Auditing all ${files.length} tool configs in lib/data/tools/...`);

let issuesFound = 0;

for (const file of files) {
  const content = fs.readFileSync(path.join(toolsDir, file), 'utf8').replace(/\r\n/g, '\n');
  
  // 1. Check paragraph repetition > 2x
  const paragraphs = content.split('\n\n').map(p => p.trim()).filter(p => p.length > 80);
  const seen = new Map();
  let maxDup = 1;
  let dupP = '';
  for (const p of paragraphs) {
    const c = (seen.get(p) || 0) + 1;
    seen.set(p, c);
    if (c > maxDup) {
      maxDup = c;
      dupP = p.substring(0, 50) + '...';
    }
  }
  if (maxDup > 2) {
    issuesFound++;
    console.error(`[ERROR] ${file}: Paragraph repeated ${maxDup} times! "${dupP}"`);
  }

  // 2. Check fake year headings
  const yearHeadings = content.match(/Why .* in 20\d\d/g) || [];
  if (yearHeadings.length > 1) {
    issuesFound++;
    console.error(`[ERROR] ${file}: ${yearHeadings.length} fake year headings found!`);
  }

  // 3. Check fake looped FAQs
  const loopedFaqs = content.match(/Question \d+ regarding/g) || content.match(/\(FAQ \d+\)/g) || [];
  if (loopedFaqs.length > 0) {
    issuesFound++;
    console.error(`[ERROR] ${file}: ${loopedFaqs.length} looped fake FAQs found!`);
  }
}

if (issuesFound === 0) {
  console.log(`\nSUCCESS: All ${files.length} tool configs passed the audit! 0 repetition, 0 fake year loops, 0 fake FAQs!`);
} else {
  console.error(`\nFAILED: Found ${issuesFound} issues across tool configs.`);
  process.exit(1);
}
