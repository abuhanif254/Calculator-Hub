const fs = require('fs');
const path = require('path');
const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
};
const files = walk('c:/nexus/Calculator-Hub/app').filter(f => f.endsWith('route.ts') || f.endsWith('page.tsx') || f.endsWith('layout.tsx') || f.endsWith('not-found.tsx'));
let count = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let hasEdge = content.includes("export const runtime = 'edge';");
  let hasStatic = content.includes('generateStaticParams');
  let isLayout = f.replace(/\\/g, '/').endsWith('app/layout.tsx') || f.replace(/\\/g, '/').endsWith('app/[locale]/layout.tsx');
  
  if (hasEdge && (hasStatic || isLayout)) {
    content = content.replace(/export const runtime = 'edge';[\r\n]*/g, '');
    fs.writeFileSync(f, content);
    console.log('Removed from:', f);
    count++;
  }
});
console.log('Removed from ' + count + ' files');
