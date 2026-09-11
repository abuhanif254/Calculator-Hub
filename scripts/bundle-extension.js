const fs = require('fs');
const path = require('path');
const JSZip = require('jszip');

async function bundleExtension() {
  const extensionDir = path.join(__dirname, '..', 'extension');
  const outputDir = path.join(__dirname, '..', 'dist-extension');

  if (!fs.existsSync(extensionDir)) {
    console.error('Error: extension directory does not exist at ' + extensionDir);
    process.exit(1);
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const manifestPath = path.join(extensionDir, 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const version = manifest.version || '1.0.0';
  const zipFileName = `nexus-calculator-extension-v${version}.zip`;
  const zipFilePath = path.join(outputDir, zipFileName);

  const zip = new JSZip();

  function addFolderToZip(currentDir, relativePath = '') {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      const zipPath = relativePath ? `${relativePath}/${entry.name}` : entry.name;

      if (entry.isDirectory()) {
        addFolderToZip(fullPath, zipPath);
      } else {
        const fileData = fs.readFileSync(fullPath);
        zip.file(zipPath, fileData);
      }
    }
  }

  console.log(`Packaging Nexus Calculator Extension v${version}...`);
  addFolderToZip(extensionDir);

  const content = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'DEFLATE',
    compressionOptions: { level: 9 },
  });

  fs.writeFileSync(zipFilePath, content);
  const stats = fs.statSync(zipFilePath);
  const sizeKb = (stats.size / 1024).toFixed(2);

  console.log(`✓ Extension packaged successfully!`);
  console.log(`  File: ${zipFilePath}`);
  console.log(`  Size: ${sizeKb} KB`);
  console.log(`Ready for upload to Chrome Web Store and Microsoft Partner Center.`);
}

bundleExtension().catch(err => {
  console.error('Packaging failed:', err);
  process.exit(1);
});
