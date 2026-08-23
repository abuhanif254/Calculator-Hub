const fs = require('fs');
let content = fs.readFileSync('lib/data/guides.ts', 'utf8');

// Replace \'tool\' with 'tool'
content = content.replace(/\\'tool\\'/g, "'tool'");

const tools = ['database-anonymizer', 'ai-image-upscaler', 'qr-code-studio', 'sql-formatter', 'jwt-decoder', 'pdf-ocr', 'pdf-to-excel', 'heic-to-jpg', 'heic-to-jpg-converter', 'pdf-to-excel-converter'];

tools.forEach(tool => {
  content = content.replace(new RegExp("\\\\'(" + tool + ")\\\\'", 'g'), "'" + tool + "'");
});

fs.writeFileSync('lib/data/guides.ts', content);
