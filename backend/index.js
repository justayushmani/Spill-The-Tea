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

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
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
