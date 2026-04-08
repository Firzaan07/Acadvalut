// Load environment variables from .env FIRST - before anything else
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// ─────────────────────────────────────────────
// Route imports
// ─────────────────────────────────────────────
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const facultyRoutes = require('./routes/faculty');
const studentRoutes = require('./routes/student');
const userRoutes = require('./routes/user');

// ─────────────────────────────────────────────
// 1. Connect to MongoDB
// ─────────────────────────────────────────────
connectDB();

// ─────────────────────────────────────────────
// 2. Initialize Express App
// ─────────────────────────────────────────────
const app = express();

// ─────────────────────────────────────────────
// 3. CORS Configuration
// Dynamically allows any localhost port so Vite dev server always works
// regardless of which port it picks (5173, 5174, 5178, 8080, etc.)
// ─────────────────────────────────────────────
// ─────────────────────────────────────────────
// 3. CORS Configuration
// Dynamically allows any localhost port so Vite dev server always works
// regardless of which port it picks (5173, 5174, 5178, 8080, etc.)
// ─────────────────────────────────────────────
const localhostRegex = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

const isAllowedOrigin = (origin) => {
  if (!origin) return true; // Allow Postman, curl, etc. with no origin
  if (localhostRegex.test(origin)) return true; // Allow any localhost port in dev
  
  // Explicitly allow production frontend
  const allowedOrigins = [
    'https://academi-portal.vercel.app',
    'https://acadvalut.vercel.app',
    process.env.CLIENT_URL
  ].filter(Boolean);

  if (allowedOrigins.includes(origin)) return true;
  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked for origin: ${origin}`);
      callback(new Error(`CORS policy: Origin '${origin}' is not allowed.`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};

app.use(cors(corsOptions));

// Handle preflight for all routes explicitly
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.header('Origin') || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204);
});

// ─────────────────────────────────────────────
// 4. Request Parsing Middleware
// ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));           // Parse JSON bodies
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies

// ─────────────────────────────────────────────
// 5. HTTP Request Logger (development only)
// ─────────────────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// ─────────────────────────────────────────────
// 6. Health Check & Welcome Route
// ─────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🎓 AcadVault API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  const mongoose = require('mongoose');
  res.status(200).json({
    success: true,
    status: 'OK',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────
// 7. API Routes
// ─────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/user', userRoutes);

// ─────────────────────────────────────────────
// 8. 404 Handler - For unmatched routes
// ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.method} ${req.originalUrl}' not found on this server.`,
  });
});

// ─────────────────────────────────────────────
// 9. Global Error Handler (must be last middleware)
// ─────────────────────────────────────────────
app.use(errorHandler);

// ─────────────────────────────────────────────
// 10. Start Server
// ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log('\n====================================');
  console.log('  🎓 AcadVault Backend Server');
  console.log('====================================');
  console.log(`  Status  : Running`);
  console.log(`  Port    : ${PORT}`);
  console.log(`  Mode    : ${process.env.NODE_ENV || 'development'}`);
  console.log(`  API URL : http://localhost:${PORT}/api`);
  console.log(`  Health  : http://localhost:${PORT}/api/health`);
  console.log('====================================\n');
});

// Handle unhandled promise rejections (e.g., DB errors)
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.name, err.message);
  // Gracefully close server before exiting
  server.close(() => process.exit(1));
});

module.exports = app;
