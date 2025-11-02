import express from 'express';
import cors from 'cors';
import quizRouter from './routes/quiz.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  credentials: true
}));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'GrowthViz Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Quiz routes
app.use('/api/quiz', quizRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.path 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 GrowthViz Backend Server`);
  console.log(`📡 Running on: http://localhost:${PORT}`);
  console.log(`🎯 Quiz API ready at: http://localhost:${PORT}/api/quiz`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health\n`);
});
