const fs = require('fs');
const f = 'app/components/tools/ColorPickerFromImageTool.tsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(/\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync(f, c);
