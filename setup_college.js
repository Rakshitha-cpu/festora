const fs = require('fs');
const path = require('path');

const base = 'C:\\Users\\User\\OneDrive\\Desktop\\festora';
const backendDir = path.join(base, 'backend');
const frontendDir = path.join(base, 'frontend');

// Create directories
if (!fs.existsSync(backendDir)) fs.mkdirSync(backendDir);
if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir);

// 1. Backend: package.json
fs.writeFileSync(path.join(backendDir, 'package.json'), JSON.stringify({
  "name": "festora-backend",
  "version": "1.0.0",
  "description": "Festora Backend API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2"
  }
}, null, 2));

// 2. Backend: server.js
const serverCode = `const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================
// COLLEGE PROJECT: REST API ENDPOINTS
// ==========================================

// 1. GET Request to verify connection
app.get('/api/status', (req, res) => {
    console.log("GET /api/status - Frontend connected!");
    res.json({
        status: "success",
        message: "Backend is fully connected and running!",
        timestamp: new Date()
    });
});

// 2. POST Request to save user progress
app.post('/api/save-progress', (req, res) => {
    console.log("-----------------------------------------");
    console.log("POST /api/save-progress - Saving data...");
    console.log("User Coins:", req.body.coins);
    console.log("User Trophies/Achievements:", Object.keys(req.body.ach || {}).length);
    console.log("-----------------------------------------");
    
    // In a real database, you'd do: db.collection('users').updateOne(...)
    res.json({ success: true, message: "Progress saved to backend database!" });
});

// ==========================================
// FRONTEND SERVING
// ==========================================
// Serve the frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(\`=========================================\`);
    console.log(\`Festora Backend Server Running\`);
    console.log(\`App is live at: http://localhost:\${PORT}\`);
    console.log(\`=========================================\`);
});
`;
fs.writeFileSync(path.join(backendDir, 'server.js'), serverCode);

// 3. Frontend: Update and Move index.html
const oldHtmlPath = path.join(base, 'index.html');
if (fs.existsSync(oldHtmlPath)) {
    let html = fs.readFileSync(oldHtmlPath, 'utf8');
    
    // Inject REST API calls into the frontend to prove it talks to the backend
    const apiInjection = `
/* ===== COLLEGE PROJECT: BACKEND API CONNECTION ===== */
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();
        console.log("🟢 " + data.message);
    } catch(err) {
        console.error("🔴 Backend not running:", err);
    }
});

// Intercept the save function to send data to our Node.js backend
const originalSaveProgress = saveProgress;
saveProgress = function() {
    originalSaveProgress(); // Local save
    // Send to backend via POST request
    fetch('/api/save-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(S)
    }).catch(e => console.log("Backend sync failed"));
};
/* =================================================== */
`;

    // Insert the injection into the first script block
    html = html.replace('</script>', apiInjection + '\n</script>');
    
    // Write to frontend folder
    fs.writeFileSync(path.join(frontendDir, 'index.html'), html);
    
    // Delete old files from the root
    fs.unlinkSync(oldHtmlPath);
    if (fs.existsSync(path.join(base, 'inject.js'))) fs.unlinkSync(path.join(base, 'inject.js'));
    if (fs.existsSync(path.join(base, 'update_fest.js'))) fs.unlinkSync(path.join(base, 'update_fest.js'));
    
    console.log("College project structure created successfully!");
} else {
    console.log("Error: index.html not found in root.");
}
