import express from 'express';
import cors from 'cors';

export const app = express();

// Configure CORS for production
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import authRoutes from './route/authRoutes.js';
import traumaRoutes from './route/traumaRoutes.js';
import adminRoute from './route/adminRoute.js';

app.use('/api/auth', authRoutes);
app.use('/api/trauma', traumaRoutes);
app.use('/api/admin', adminRoute);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Error handling middleware (should be last)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    msg: process.env.NODE_ENV === 'production' ? 'Server error' : err.message,
    error: process.env.NODE_ENV === 'production' ? {} : err
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});
