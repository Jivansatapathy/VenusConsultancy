// server/src/routes/healthRoutes.js
import express from "express";
import { config } from "../config/index.js";

const router = express.Router();

// Health check endpoint for keep-alive
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.NODE_ENV,
    version: "1.0.0"
  });
});

// Ping endpoint for external services
router.get("/ping", (req, res) => {
  res.status(200).json({
    message: "pong",
    timestamp: new Date().toISOString()
  });
});

// Keep-alive endpoint that can be called frequently
router.get("/keepalive", (req, res) => {
  res.status(200).json({
    message: "Server is alive",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime())
  });
});

export default router;
