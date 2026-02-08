import express from 'express';
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes will be imported here
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
