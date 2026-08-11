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

const files = walk('c:/nexus/Calculator-Hub/app').filter(f => f.endsWith('route.ts') || f.endsWith('page.tsx') || f.endsWith('layout.tsx'));

let count = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.startsWith("export const runtime = 'edge';\n")) {
    fs.writeFileSync(f, content.replace("export const runtime = 'edge';\n", ""));
    count++;
  } else if (content.startsWith('export const runtime = "edge";\n')) {
    fs.writeFileSync(f, content.replace('export const runtime = "edge";\n', ""));
    count++;
  }
});

console.log('Removed from ' + count + ' files');
