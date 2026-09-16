import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import symptomRoutes from './routes/symptomRoutes.js';
import { initDatabaseSchema } from './models/symptomModel.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middlewares ─────────────────────────────────────────────────────────────────
app.use(cors({
  origin: '*', // Allows frontend requests from Vite (http://localhost:8443, http://localhost:5173, etc.)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ── API Routes ──────────────────────────────────────────────────────────────────
app.use('/api', symptomRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; text-align: center; padding: 40px;">
      <h1 style="color: #0D9488;">🏥 Sembuhinkuy Backend API</h1>
      <p style="color: #475569;">Express.js REST API is running successfully!</p>
      <p>Endpoints: <code>GET /api/symptoms</code> | <code>POST /api/diagnosa</code> | <code>GET /api/health</code></p>
    </div>
  `);
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} tidak ditemukan.`,
  });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[Unhandled Server Error]:', err);
  res.status(500).json({
    success: false,
    message: 'Terjadi kesalahan internal pada server.',
    error: err.message,
  });
});

// ── Start Server ────────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Sembuhinkuy Backend Server is running!`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`==================================================\n`);

  // Attempt database schema setup
  await initDatabaseSchema();
});

export default app;
