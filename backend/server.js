const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const noteRoutes = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────
app.use(cors());
app.use(express.json());

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

// ── MongoDB Connection ────────────────────────
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI || MONGODB_URI === 'your_mongodb_connection_string_here') {
  console.warn('\n⚠️  MONGODB_URI not set in .env file!');
  console.warn('   The server will start but database operations will fail.');
  console.warn('   Add your MongoDB connection string to the .env file.\n');
}

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📋 API endpoint: http://localhost:${PORT}/api/notes`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('\n💡 Starting server without database...');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT} (no DB)`);
    });
  });
