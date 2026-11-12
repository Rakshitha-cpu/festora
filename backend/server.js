const express = require('express');
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
    console.log(`=========================================`);
    console.log(`Festora Backend Server Running`);
    console.log(`App is live at: http://localhost:${PORT}`);
    console.log(`=========================================`);
});
