const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const noteRoutes = require('../routes/notes');

const app = express();

// ── Middleware ─────────────────────────────────
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// ── MongoDB Connection (cached for serverless) ─
let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState === 1;
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
};

// ── Connect before routes ─────────────────────
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ── Routes ────────────────────────────────────
app.use('/api/notes', noteRoutes);

// ── Health check ──────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    db: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

// ── Root route ────────────────────────────────
app.get('/', (req, res) => {
  res.json({ message: 'Google Keep Clone API', version: '1.0.0' });
});

// ── Export for Vercel Serverless ───────────────
module.exports = app;
