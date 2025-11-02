/**
 * Quiz Controller
 * Handles quiz question generation, submission, and scoring
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load question bank
const QUESTION_BANK_PATH = path.join(__dirname, '../data/quiz_bank.json')
let questionBank = { questions: [] }

try {
  const data = fs.readFileSync(QUESTION_BANK_PATH, 'utf-8')
  questionBank = JSON.parse(data)
  console.log(`✅ Loaded ${questionBank.questions.length} quiz questions`)
} catch (error) {
  console.error('❌ Failed to load question bank:', error.message)
}

// Complexity options for generating distractors
const COMPLEXITY_OPTIONS = [
  'O(1)',
  'O(log n)',
  'O(n)',
  'O(n log n)',
  'O(n²)',
  'O(n³)',
  'O(2ⁿ)',
  'O(n!)'
]

// Color mapping for complexities
const COMPLEXITY_COLORS = {
  'O(1)': '#38bdf8',
  'O(log n)': '#7c3aed',
  'O(n)': '#f59e0b',
  'O(n log n)': '#ef476f',
  'O(n²)': '#06b6d4',
  'O(n³)': '#8b5cf6',
  'O(2ⁿ)': '#ff7a00',
  'O(n!)': '#ff3b3b'
}

// Generate growth values for a complexity
function generateCurveData(complexity, maxN = 1000, points = 200) {
  const data = []
  const step = Math.max(1, Math.floor(maxN / points))
  
  for (let n = 1; n <= maxN; n += step) {
    let value
    
    switch (complexity) {
      case 'O(1)':
        value = 1
        break
      case 'O(log n)':
        value = Math.log2(Math.max(n, 1))
        break
      case 'O(n)':
        value = n
        break
      case 'O(n log n)':
        value = n * Math.log2(Math.max(n, 1))
        break
      case 'O(n²)':
        value = n * n
        break
      case 'O(n³)':
        value = n * n * n
        break
      case 'O(2ⁿ)':
        value = Math.pow(2, Math.min(n, 25))
        break
      case 'O(n!)':
        // Approximate factorial
        value = Math.exp(n * Math.log(Math.max(n, 1)) - n)
        break
      default:
        value = n
    }
    
    if (isFinite(value) && value >= 0) {
      data.push({ n, value })
    }
  }
  
  // Normalize if needed
  const maxValue = Math.max(...data.map(d => d.value))
  if (maxValue > 1e6) {
    const scale = 1e6 / maxValue
    data.forEach(d => d.value *= scale)
  }
  
  return data
}

// Get plausible distractors for a complexity
function getDistractors(correctComplexity, count = 3) {
  const distractors = []
  const available = COMPLEXITY_OPTIONS.filter(c => c !== correctComplexity)
  
  // Prioritize similar complexities for better questions
  const similarityMap = {
    'O(1)': ['O(log n)', 'O(n)', 'O(n log n)'],
    'O(log n)': ['O(1)', 'O(n)', 'O(n log n)'],
    'O(n)': ['O(log n)', 'O(n log n)', 'O(n²)'],
    'O(n log n)': ['O(n)', 'O(n²)', 'O(log n)'],
    'O(n²)': ['O(n)', 'O(n log n)', 'O(n³)'],
    'O(n³)': ['O(n²)', 'O(2ⁿ)', 'O(n log n)'],
    'O(2ⁿ)': ['O(n³)', 'O(n!)', 'O(n²)'],
    'O(n!)': ['O(2ⁿ)', 'O(n³)', 'O(n²)']
  }
  
  const similar = similarityMap[correctComplexity] || []
  
  // Add similar complexities first
  for (const comp of similar) {
    if (distractors.length < count && available.includes(comp)) {
      distractors.push(comp)
    }
  }
  
  // Fill remaining with random
  while (distractors.length < count && available.length > 0) {
    const randomIndex = Math.floor(Math.random() * available.length)
    const candidate = available[randomIndex]
    if (!distractors.includes(candidate)) {
      distractors.push(candidate)
    }
    available.splice(randomIndex, 1)
  }
  
  return distractors
}

// Generate options for a question
function generateOptions(question, maxN = 1000) {
  const correctComplexity = question.correct_complexity
  const distractors = getDistractors(correctComplexity, 3)
  
  // Create all 4 options
  const allOptions = [correctComplexity, ...distractors]
  
  // Shuffle options
  for (let i = allOptions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allOptions[i], allOptions[j]] = [allOptions[j], allOptions[i]]
  }
  
  // Generate curve data for each option
  const options = allOptions.map((complexity, index) => ({
    id: index,
    complexity,
    color: COMPLEXITY_COLORS[complexity],
    curveData: generateCurveData(complexity, maxN),
    isCorrect: complexity === correctComplexity
  }))
  
  return options
}

// GET /api/quiz/sample?count=K&difficulty=easy
export function sampleQuestions(req, res) {
  try {
    const count = Math.min(parseInt(req.query.count) || 10, questionBank.questions.length)
    const difficulty = req.query.difficulty || null
    const maxN = parseInt(req.query.maxN) || 1000
    
    console.log(`\n📝 Sampling ${count} quiz questions (difficulty: ${difficulty || 'any'})`)
    
    // Filter by difficulty if specified
    let availableQuestions = difficulty
      ? questionBank.questions.filter(q => q.difficulty === difficulty)
      : questionBank.questions
    
    // Randomly sample
    const shuffled = [...availableQuestions].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, count)
    
    // Generate options for each question
    const questionsWithOptions = selected.map(question => ({
      ...question,
      options: generateOptions(question, maxN),
      // Don't send correct answer to frontend yet
      correct_complexity: undefined
    }))
    
    console.log(`  ✅ Returning ${questionsWithOptions.length} questions`)
    
    res.json({
      questions: questionsWithOptions,
      totalAvailable: availableQuestions.length
    })
  } catch (error) {
    console.error('Sample questions error:', error)
    res.status(500).json({ error: 'Failed to sample questions' })
  }
}

// GET /api/quiz/question/:id
export function getQuestion(req, res) {
  try {
    const questionId = parseInt(req.params.id)
    const maxN = parseInt(req.query.maxN) || 1000
    
    const question = questionBank.questions.find(q => q.id === questionId)
    
    if (!question) {
      return res.status(404).json({ error: 'Question not found' })
    }
    
    const questionWithOptions = {
      ...question,
      options: generateOptions(question, maxN),
      correct_complexity: undefined // Don't reveal answer
    }
    
    res.json(questionWithOptions)
  } catch (error) {
    console.error('Get question error:', error)
    res.status(500).json({ error: 'Failed to get question' })
  }
}

// POST /api/quiz/submit
export function submitQuiz(req, res) {
  try {
    const { userId, answers, timeTaken } = req.body
    
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ error: 'Invalid answers format' })
    }
    
    console.log(`\n📊 Grading quiz: ${answers.length} answers`)
    
    const results = []
    let correctCount = 0
    
    for (const answer of answers) {
      const { questionId, selectedComplexity } = answer
      const question = questionBank.questions.find(q => q.id === questionId)
      
      if (!question) {
        results.push({
          questionId,
          correct: false,
          error: 'Question not found'
        })
        continue
      }
      
      const isCorrect = selectedComplexity === question.correct_complexity
      if (isCorrect) correctCount++
      
      results.push({
        questionId,
        correct: isCorrect,
        selectedComplexity,
        correctComplexity: question.correct_complexity,
        explanation: question.explanation,
        prompt: question.prompt,
        type: question.type,
        language: question.language,
        highlightSpans: question.highlight_spans
      })
    }
    
    const totalQuestions = answers.length
    const rawScore = correctCount
    const percentage = totalQuestions > 0 ? (correctCount / totalQuestions) * 100 : 0
    const scaledScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 200) : 0
    
    // Performance message
    let performanceMessage = ''
    if (percentage >= 90) {
      performanceMessage = '🌟 Outstanding! You have mastered complexity analysis!'
    } else if (percentage >= 75) {
      performanceMessage = '🎯 Excellent work! Strong understanding of complexities.'
    } else if (percentage >= 60) {
      performanceMessage = '👍 Good job! Keep practicing to improve.'
    } else if (percentage >= 40) {
      performanceMessage = '📚 Not bad! Review the explanations to strengthen your knowledge.'
    } else {
      performanceMessage = '💪 Keep learning! Practice makes perfect.'
    }
    
    console.log(`  Score: ${correctCount}/${totalQuestions} (${percentage.toFixed(1)}%)`)
    console.log(`  Scaled: ${scaledScore}/200`)
    console.log(`  Time: ${timeTaken}s`)
    
    res.json({
      score: rawScore,
      totalQuestions,
      percentage: Math.round(percentage),
      scaledScore,
      performanceMessage,
      results,
      timeTaken,
      userId
    })
  } catch (error) {
    console.error('Submit quiz error:', error)
    res.status(500).json({ error: 'Failed to grade quiz' })
  }
}

// GET /api/quiz/stats
export function getStats(req, res) {
  try {
    const stats = {
      totalQuestions: questionBank.questions.length,
      byDifficulty: {
        easy: questionBank.questions.filter(q => q.difficulty === 'easy').length,
        medium: questionBank.questions.filter(q => q.difficulty === 'medium').length,
        hard: questionBank.questions.filter(q => q.difficulty === 'hard').length
      },
      byType: {
        code: questionBank.questions.filter(q => q.type === 'code').length,
        name: questionBank.questions.filter(q => q.type === 'name').length
      },
      byLanguage: {
        python: questionBank.questions.filter(q => q.language === 'python').length,
        cpp: questionBank.questions.filter(q => q.language === 'cpp').length,
        none: questionBank.questions.filter(q => q.language === null).length
      },
      byComplexity: {}
    }
    
    // Count by complexity
    for (const question of questionBank.questions) {
      const comp = question.correct_complexity
      stats.byComplexity[comp] = (stats.byComplexity[comp] || 0) + 1
    }
    
    res.json(stats)
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({ error: 'Failed to get stats' })
  }
}
