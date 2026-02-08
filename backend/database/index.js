import mongoose from "mongoose";
import dotenv from "dotenv";
import { db_name } from '../constants.js';
dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI || '';

  const hostDisplay = (() => {
    try {
      if (!uri) return 'unknown';
      if (uri.includes('@')) return uri.split('@')[1].split('/')[0];
      return uri.split('//')[1].split('/')[0];
    } catch {
      return 'unknown';
    }
  })();

  console.log(`Attempting MongoDB connection to ${hostDisplay} (credentials redacted)`);

  try {
    await mongoose.connect(uri, {
      dbName: process.env.DB_NAME || db_name,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
      family: 4,
    });

    console.log('✓ Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('✗ Error connecting to MongoDB:', error.message);
    throw error;
  }
};

export default connectDB;