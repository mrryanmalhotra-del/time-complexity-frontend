import express from "express";
import cors from "cors";
import quizRoutes from "./routes/quiz.js";

const app = express();

// Enable CORS for all origins (production-ready)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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
