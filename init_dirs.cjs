const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'frontend');
const srcDir = path.join(baseDir, 'src');
const componentsDir = path.join(srcDir, 'components');
const dataDir = path.join(srcDir, 'data');
const servicesDir = path.join(srcDir, 'services');

[componentsDir, dataDir, servicesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

console.log('Directories initialized successfully');
