require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Use ENV for production, fallback for local
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nailsbychivi';

// ─── Middleware ─────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── MongoDB Connection ─────────────────────────────────
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => {
  console.error('❌ MongoDB connection failed:', err.message);
});

// ─── Routes ─────────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/appointments', require('./routes/appointments'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Services API
app.get('/api/services', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'Bridal Makeup', price: 8000 },
      { id: 2, name: 'Party Look Makeup', price: 1800 },
      { id: 3, name: 'Traditional Look Makeup', price: 2000 },
      { id: 4, name: 'Hairstyle & Makeup', price: 2500 },
      { id: 5, name: 'Facial', price: 800 },
      { id: 6, name: 'Cleanup', price: 600 },
      { id: 7, name: 'Nail Art', price: 500 },
      { id: 9, name: 'Pre-Bridal Package', price: 12000 },
      { id: 10, name: 'Full Glam Package', price: 5000 }
    ]
  });
});

// Serve frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Start Server ───────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
