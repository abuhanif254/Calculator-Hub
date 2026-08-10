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

const files = walk('c:/nexus/Calculator-Hub/app').filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

let count = 0;
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes("export const runtime = 'edge';")) {
    const newContent = content.replace(/export const runtime = 'edge';[\r\n]*/g, '');
    fs.writeFileSync(f, newContent);
    console.log('Removed from:', f);
    count++;
  }
});
console.log('Removed from ' + count + ' files');
