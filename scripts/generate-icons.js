const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const targetDir = path.join(process.cwd(), 'extension', 'icons');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const src = path.join(process.cwd(), 'public', 'icons', 'icon-512x512.png');
  for (const size of [16, 32, 48, 128]) {
    const dest = path.join(targetDir, 'icon' + size + '.png');
    await sharp(src)
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(dest);
    console.log('Generated ' + dest);
  }
}

run().catch(console.error);
