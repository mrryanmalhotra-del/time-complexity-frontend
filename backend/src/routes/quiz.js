import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load questions from JSON file
let questions = [];
try {
  const questionsPath = join(__dirname, '../data/questions.json');
  const questionsData = readFileSync(questionsPath, 'utf-8');
  questions = JSON.parse(questionsData);
} catch (error) {
  console.error('Error loading questions:', error);
  questions = [];
}

/**
 * GET /api/quiz/random
 * Returns random quiz questions
 * Query params: count (default: 5)
 */
router.get('/random', (req, res) => {
  try {
    const count = parseInt(req.query.count) || 5;
    
    if (count < 1 || count > 50) {
      return res.status(400).json({
        error: 'Invalid count. Must be between 1 and 50'
      });
    }

    if (questions.length === 0) {
      return res.status(500).json({
        error: 'No questions available'
      });
    }

    // Shuffle and pick random questions
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    const selectedQuestions = shuffled.slice(0, Math.min(count, questions.length));

    res.json({
      questions: selectedQuestions,
      count: selectedQuestions.length
    });
  } catch (error) {
    console.error('Error fetching random questions:', error);
    res.status(500).json({
      error: 'Failed to fetch questions'
    });
  }
});

/**
 * POST /api/quiz/submit
 * Submits quiz answers and returns score
 * Body: { answers: [{questionId, selectedOptionId, timeTaken}], duration }
 */
router.post('/submit', (req, res) => {
  try {
    const { answers, duration } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        error: 'Invalid answers format'
      });
    }

    let correctCount = 0;
    const results = [];

    answers.forEach(answer => {
      const question = questions.find(q => q.id === answer.questionId);
      if (question) {
        const isCorrect = answer.selectedOptionId === question.correctOptionId;
        if (isCorrect) correctCount++;

        results.push({
          questionId: answer.questionId,
          correct: isCorrect,
          selectedOptionId: answer.selectedOptionId,
          correctOptionId: question.correctOptionId,
          timeTaken: answer.timeTaken || 0
        });
      }
    });

    const score = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0;
    const accuracy = score;

    let message = '';
    if (score >= 90) message = 'Outstanding! You\'re a complexity master! 🏆';
    else if (score >= 80) message = 'Great job! You have a strong understanding! 🎉';
    else if (score >= 70) message = 'Good work! Keep practicing! 👍';
    else if (score >= 60) message = 'Not bad! Review the concepts and try again! 📚';
    else message = 'Keep learning! Practice makes perfect! 💪';

    res.json({
      score,
      correctCount,
      totalQuestions: answers.length,
      accuracy,
      duration: duration || 0,
      message,
      results
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({
      error: 'Failed to submit quiz'
    });
  }
});

/**
 * GET /api/quiz/stats
 * Returns total question count
 */
router.get('/stats', (req, res) => {
  res.json({
    totalQuestions: questions.length
  });
});

export default router;
