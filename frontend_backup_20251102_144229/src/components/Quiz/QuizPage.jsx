/**
 * Quiz Page Component
 * Main quiz interface with timer, questions, and mini-graph options
 */

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Clock, CheckCircle2, XCircle, ArrowRight, SkipForward, X } from 'lucide-react'
import MiniGraph from './MiniGraph'
import QuizResults from './QuizResults'

export default function QuizPage({ darkMode, onBack }) {
  const [quizState, setQuizState] = useState('setup') // setup, active, results
  const [quizLength, setQuizLength] = useState(10)
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [answers, setAnswers] = useState([])
  const [timeRemaining, setTimeRemaining] = useState(120)
  const [timerId, setTimerId] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [isCorrect, setIsCorrect] = useState(null)
  const [quizResults, setQuizResults] = useState(null)
  
  const QUIZ_DURATIONS = {
    5: 60,   // 5 questions = 60 seconds
    10: 120, // 10 questions = 120 seconds
    15: 180  // 15 questions = 180 seconds
  }
  
  // Start quiz
  const startQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/quiz/sample?count=${quizLength}&maxN=1000`)
      setQuestions(response.data.questions)
      setTimeRemaining(QUIZ_DURATIONS[quizLength])
      setQuizState('active')
      setCurrentQuestionIndex(0)
      setAnswers([])
    } catch (error) {
      console.error('Failed to load quiz:', error)
      alert('Failed to load quiz questions. Please try again.')
    }
  }
  
  // Timer effect
  useEffect(() => {
    if (quizState === 'active' && timeRemaining > 0) {
      const id = setTimeout(() => {
        setTimeRemaining(prev => prev - 1)
      }, 1000)
      setTimerId(id)
      return () => clearTimeout(id)
    } else if (quizState === 'active' && timeRemaining === 0) {
      submitQuiz()
    }
  }, [quizState, timeRemaining])
  
  // Handle option selection
  const handleSelectOption = (option) => {
    if (selectedOption) return // Already selected
    
    setSelectedOption(option)
    const correct = option.isCorrect
    setIsCorrect(correct)
    setShowExplanation(true)
    
    // Record answer
    const currentQuestion = questions[currentQuestionIndex]
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedComplexity: option.complexity
    }])
  }
  
  // Next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedOption(null)
      setShowExplanation(false)
      setIsCorrect(null)
    } else {
      submitQuiz()
    }
  }
  
  // Skip question
  const handleSkip = () => {
    const currentQuestion = questions[currentQuestionIndex]
    setAnswers(prev => [...prev, {
      questionId: currentQuestion.id,
      selectedComplexity: null
    }])
    handleNext()
  }
  
  // Submit quiz
  const submitQuiz = async () => {
    clearTimeout(timerId)
    
    try {
      const timeTaken = QUIZ_DURATIONS[quizLength] - timeRemaining
      const response = await axios.post('http://localhost:3001/api/quiz/submit', {
        answers,
        timeTaken
      })
      
      setQuizResults(response.data)
      setQuizState('results')
    } catch (error) {
      console.error('Failed to submit quiz:', error)
      alert('Failed to submit quiz. Please try again.')
    }
  }
  
  // Format time
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  
  const currentQuestion = questions[currentQuestionIndex]
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0
  
  // Setup screen
  if (quizState === 'setup') {
    return (
      <div className={`min-h-screen flex items-center justify-center p-8 ${
        darkMode ? 'bg-[#0f1620]' : 'bg-gray-50'
      }`}>
        <div className={`max-w-lg w-full rounded-2xl p-8 shadow-2xl ${
          darkMode ? 'bg-[#121827]' : 'bg-white'
        }`}>
          <h1 className={`text-3xl font-bold mb-6 text-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Complexity Quiz
          </h1>
          
          <p className={`text-center mb-8 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Test your understanding of algorithmic complexity
          </p>
          
          <div className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-3 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Quiz Length
              </label>
              
              <div className="grid grid-cols-3 gap-3">
                {[5, 10, 15].map(length => (
                  <button
                    key={length}
                    onClick={() => setQuizLength(length)}
                    className={`py-3 px-4 rounded-lg font-medium transition-all ${
                      quizLength === length
                        ? darkMode
                          ? 'bg-[#5eead4] text-gray-900'
                          : 'bg-blue-500 text-white'
                        : darkMode
                          ? 'bg-[#1f2937] text-gray-300 hover:bg-[#374151]'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {length} Questions
                    <div className="text-xs mt-1 opacity-70">
                      {length} Questions • {QUIZ_DURATIONS[length] / 60} mins
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={startQuiz}
              className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                darkMode
                  ? 'bg-[#5eead4] text-gray-900 hover:bg-[#4dd4bd]'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Start Quiz
            </button>
            
            <button
              onClick={onBack}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                darkMode
                  ? 'bg-[#1f2937] text-gray-300 hover:bg-[#374151]'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Back to Learn
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  // Results screen
  if (quizState === 'results') {
    return (
      <QuizResults
        darkMode={darkMode}
        results={quizResults}
        questions={questions}
        onRestart={startQuiz}
        onBack={onBack}
      />
    )
  }
  
  // Active quiz screen
  return (
    <div className={`min-h-screen p-8 ${
      darkMode ? 'bg-[#0f1620]' : 'bg-gray-50'
    }`}>
      {/* Header with timer and progress */}
      <div className={`max-w-6xl mx-auto mb-8 rounded-xl p-6 shadow-lg ${
        darkMode ? 'bg-[#121827]' : 'bg-white'
      }`}>
        <div className="flex items-center justify-between mb-4">
          <div className={`text-lg font-semibold ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          
          <div className={`flex items-center gap-2 text-lg font-bold ${
            timeRemaining < 30
              ? 'text-[#fb7185]'
              : darkMode ? 'text-[#5eead4]' : 'text-blue-500'
          }`}>
            <Clock className="w-5 h-5" />
            {formatTime(timeRemaining)}
          </div>
        </div>
        
        {/* Progress bar */}
        <div className={`h-2 rounded-full overflow-hidden ${
          darkMode ? 'bg-gray-700' : 'bg-gray-200'
        }`}>
          <div
            className={`h-full transition-all duration-500 ${
              darkMode ? 'bg-[#5eead4]' : 'bg-blue-500'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      
      {/* Question */}
      {currentQuestion && (
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Question prompt */}
          <div className={`rounded-xl p-8 shadow-lg ${
            darkMode ? 'bg-[#121827]' : 'bg-white'
          }`}>
            <h2 className={`text-xl font-semibold mb-4 ${
              darkMode ? 'text-gray-200' : 'text-gray-800'
            }`}>
              {currentQuestion.type === 'code' ? 'Analyze this code:' : 'What is the complexity of:'}
            </h2>
            
            {currentQuestion.type === 'code' ? (
              <pre className={`p-6 rounded-lg font-mono text-sm overflow-x-auto ${
                darkMode
                  ? 'bg-gray-900 text-gray-300'
                  : 'bg-gray-50 text-gray-800'
              }`}>
                {currentQuestion.prompt}
              </pre>
            ) : (
              <div className={`text-2xl font-bold text-center py-8 ${
                darkMode ? 'text-[#5eead4]' : 'text-blue-600'
              }`}>
                {currentQuestion.prompt}
              </div>
            )}
          </div>
          
          {/* Options (mini-graphs) */}
          <div className="grid grid-cols-2 gap-6">
            {currentQuestion.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option)}
                disabled={selectedOption !== null}
                className={`relative rounded-xl p-6 transition-all duration-300 transform ${
                  selectedOption === option
                    ? isCorrect
                      ? 'ring-4 ring-[#16a34a] scale-105'
                      : 'ring-4 ring-[#fb7185] scale-105'
                    : selectedOption && option.isCorrect
                      ? 'ring-4 ring-[#16a34a]'
                      : darkMode
                        ? 'bg-[#121827] hover:bg-[#1f2937]'
                        : 'bg-white hover:bg-gray-50'
                } ${selectedOption ? 'cursor-default' : 'cursor-pointer hover:scale-102'} shadow-lg`}
              >
                <MiniGraph
                  data={option.curveData}
                  color={option.color}
                  complexity={option.complexity}
                  darkMode={darkMode}
                />
                
                {/* Checkmark or X */}
                {selectedOption === option && (
                  <div className="absolute top-4 right-4">
                    {isCorrect ? (
                      <CheckCircle2 className="w-8 h-8 text-[#16a34a]" />
                    ) : (
                      <XCircle className="w-8 h-8 text-[#fb7185]" />
                    )}
                  </div>
                )}
                
                {selectedOption && option.isCorrect && selectedOption !== option && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle2 className="w-8 h-8 text-[#16a34a]" />
                  </div>
                )}
              </button>
            ))}
          </div>
          
          {/* Explanation */}
          {showExplanation && (
            <div className={`rounded-xl p-6 shadow-lg animate-fadeIn ${
              isCorrect
                ? darkMode ? 'bg-green-900/20 border-2 border-green-600' : 'bg-green-50 border-2 border-green-300'
                : darkMode ? 'bg-red-900/20 border-2 border-red-600' : 'bg-red-50 border-2 border-red-300'
            }`}>
              <h3 className={`text-lg font-bold mb-2 ${
                isCorrect
                  ? darkMode ? 'text-green-400' : 'text-green-700'
                  : darkMode ? 'text-red-400' : 'text-red-700'
              }`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </h3>
              
              <p className={`${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <span className="font-semibold">Answer: {currentQuestion.options.find(o => o.isCorrect).complexity}</span>
                <br />
                {currentQuestion.explanation}
              </p>
            </div>
          )}
          
          {/* Controls */}
          <div className="flex gap-4">
            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`flex-1 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                selectedOption
                  ? darkMode
                    ? 'bg-[#5eead4] text-gray-900 hover:bg-[#4dd4bd]'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                  : darkMode
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              <ArrowRight className="w-5 h-5" />
            </button>
            
            {!selectedOption && (
              <button
                onClick={handleSkip}
                className={`px-6 py-4 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  darkMode
                    ? 'bg-[#1f2937] text-gray-300 hover:bg-[#374151]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <SkipForward className="w-5 h-5" />
                Skip
              </button>
            )}
            
            <button
              onClick={() => {
                if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
                  onBack()
                }
              }}
              className={`px-6 py-4 rounded-lg font-medium transition-all flex items-center gap-2 ${
                darkMode
                  ? 'bg-red-900/20 text-red-400 hover:bg-red-900/30'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              <X className="w-5 h-5" />
              Quit
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
