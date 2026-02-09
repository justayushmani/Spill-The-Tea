import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./database/index.js";
import authRoutes from "./route/authRoutes.js";
import traumaRoutes from "./route/traumaRoutes.js";
import adminRoute from "./route/adminRoute.js";

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://spill-the-tea-1.onrender.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Allow localhost on any port for development
      if (origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }
      
      // Check allowed origins for production
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`CORS blocked origin: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


/* ---------- ROUTES ---------- */
app.use("/api/auth", authRoutes);
app.use("/api/trauma", traumaRoutes);
app.use("/api/admin", adminRoute);

/* ---------- SERVER ---------- */
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✓ Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      "✗ Failed to start server - Database connection error:",
      error.message
    );
    process.exit(1);
  });
