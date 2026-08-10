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
  
  if (content.includes("export const runtime = 'edge';") && (content.includes('"use client"') || content.includes("'use client'"))) {
    // Remove all instances of "use client" and 'use client'
    let newContent = content.replace(/["']use client["'];?[\r\n]*/g, '');
    
    // Add "use client" to the very top
    newContent = '"use client";\n' + newContent;
    
    if (content !== newContent) {
      fs.writeFileSync(f, newContent);
      console.log('Fixed:', f);
      count++;
    }
  }
});
console.log('Fixed ' + count + ' files');
