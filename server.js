require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nailsbychivi';

// ─── Middleware ──────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ─── MongoDB Connection ──────────────────────────────────────────────────────
mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected:', MONGODB_URI))
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.log('⚠️  Running without database - bookings will not be saved');
  });

// ─── Routes ─────────────────────────────────────────────────────────────────
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

// Services data endpoint
app.get('/api/services', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'Bridal Makeup', price: 8000, duration: '3-4 hrs', icon: '👰', description: 'Complete bridal look with HD makeup, setting spray & trial session included', popular: true },
      { id: 2, name: 'Party Look Makeup', price: 1800, duration: '1-2 hrs', icon: '🎉', description: 'Glamorous party-ready look with eyeshadow, contour & long-lasting finish' },
      { id: 3, name: 'Traditional Look Makeup', price: 2000, duration: '2 hrs', icon: '🪷', description: 'Classic Indian look for functions, poojas & cultural events', popular: true },
      { id: 4, name: 'Hairstyle & Makeup', price: 2500, duration: '2-3 hrs', icon: '💇‍♀️', description: 'Full glam with hairstyling — curls, braids, buns or blowout included' },
      { id: 5, name: 'Facial', price: 800, duration: '45 min', icon: '✨', description: 'Relaxing facial cleanse, massage & glow treatment for radiant skin' },
      { id: 6, name: 'Cleanup', price: 600, duration: '30 min', icon: '🧖‍♀️', description: 'Deep skin cleanup — blackhead removal, exfoliation & moisturizing' },
      { id: 7, name: 'Nail Art', price: 500, duration: '45 min', icon: '💅', description: 'Creative nail art designs, gel nails, ombre, French & more' },

      { id: 9, name: 'Pre-Bridal Package', price: 12000, duration: 'Multiple sessions', icon: '💍', description: '4 sessions: facial, cleanup, threading & full glow prep before your big day', popular: true },
      { id: 10, name: 'Full Glam Package', price: 5000, duration: '4-5 hrs', icon: '⭐', description: 'Makeup + hairstyling + nail art + mehendi — total transformation package' }
    ]
  });
});

// Serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Start Server ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌸 Nails By Chivi website running at http://localhost:${PORT}`);
  console.log(`🔑 Login at: http://localhost:${PORT}/login.html`);
  console.log(`📋 Admin dashboard: http://localhost:${PORT}/admin.html`);
  console.log(`💊 Health check: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
