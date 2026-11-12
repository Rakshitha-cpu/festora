const fs = require('fs');
const path = require('path');

const frontendDir = 'C:\\Users\\User\\OneDrive\\Desktop\\festora\\frontend';
const htmlPath = path.join(frontendDir, 'index.html');
const pkgPath = path.join(frontendDir, 'package.json');

// 1. Create a package.json for the frontend
const pkg = {
  "name": "festora-frontend",
  "version": "1.0.0",
  "description": "Festora Frontend App",
  "scripts": {
    "start": "npx serve . -p 8080"
  }
};
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

// 2. Update the API calls in index.html to include the full backend URL
if (fs.existsSync(htmlPath)) {
    let html = fs.readFileSync(htmlPath, 'utf8');
    
    // Replace relative paths with absolute localhost paths
    html = html.replace(/fetch\('\/api\/status'\)/g, "fetch('http://localhost:3000/api/status')");
    html = html.replace(/fetch\('\/api\/save-progress'/g, "fetch('http://localhost:3000/api/save-progress'");
    
    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log("Frontend split complete. API URLs updated and package.json created.");
}
