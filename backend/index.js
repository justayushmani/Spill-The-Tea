import dotenv from 'dotenv';
import connectDB from './database/index.js';
import { app } from './app.js';
dotenv.config();


import authRoutes from './route/authRoutes.js';
import traumaRoutes from './route/traumaRoutes.js';
import adminRoute from './route/adminRoute.js';

app.use('/api/auth', authRoutes);
app.use('/api/trauma', traumaRoutes);
app.use('/api/admin', adminRoute);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`✓ Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('✗ Failed to start server - Database connection error:', error.message);
    process.exit(1);
  });
