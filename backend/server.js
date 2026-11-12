const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================
// REST API ENDPOINTS
// ==========================================

// 1. GET Request to verify connection
app.get('/api/status', (req, res) => {
    console.log('GET /api/status - Frontend connected!');
    res.json({
        status: 'success',
        message: 'Festora Backend is fully connected and running!',
        timestamp: new Date()
    });
});

// 2. POST Request to save user progress
app.post('/api/save-progress', (req, res) => {
    console.log('POST /api/save-progress:', req.body);
    res.json({ success: true, message: 'Progress saved successfully!' });
});

// ==========================================
// FRONTEND SERVING
// ==========================================
// Serve static assets from frontend and root
app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.static(path.join(__dirname, '..')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
    const indexPath = path.join(__dirname, '../index.html');
    res.sendFile(indexPath);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(=========================================);
    console.log(Festora Server running on port );
    console.log(=========================================);
});
