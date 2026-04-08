// server.js — Local development entry point
// For Vercel deployment, api/index.js is used instead
const app = require('./api/index');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 API: http://localhost:${PORT}/api/notes`);
  console.log(`❤️  Health: http://localhost:${PORT}/api/health`);
});
