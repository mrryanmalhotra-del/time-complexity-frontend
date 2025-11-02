import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quiz.js";

const app = express();

// Manual CORS middleware to ensure headers are always set
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  
  next();
});

app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "GrowthViz Backend is running",
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get("/", (req, res) => {
  res.json({ 
    message: "GrowthViz Backend API",
    endpoints: {
      health: "/api/health",
      quiz: "/api/quiz/random?count=5"
    }
  });
});

// Mount quiz routes
app.use("/api/quiz", quizRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: "Endpoint not found",
    path: req.path 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: "Internal server error",
    message: err.message 
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`\n🚀 GrowthViz Backend Server`);
  console.log(`📡 Running on port: ${PORT}`);
  console.log(`🎯 Quiz API: /api/quiz/random?count=5`);
  console.log(`💚 Health check: /api/health\n`);
});
