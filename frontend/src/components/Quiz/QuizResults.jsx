/**
 * QuizResults Component
 * Displays quiz score, performance, and detailed review
 */

import { Trophy, RefreshCw, ArrowLeft, Target, Clock, CheckCircle2, XCircle } from 'lucide-react'
import { useState } from 'react'

export default function QuizResults({ darkMode, results, questions, onRestart, onBack }) {
  const [showReview, setShowReview] = useState(false)
  
  if (!results) return null
  
  const { score, totalQuestions, percentage, scaledScore, performanceMessage, results: detailedResults, timeTaken } = results
  
  // Confetti effect for perfect score
  const isPerfect = percentage === 100
  
  return (
    <div className={`min-h-screen p-8 ${
      darkMode ? 'bg-[#0f1620]' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className={`rounded-2xl p-8 shadow-2xl text-center ${
          darkMode ? 'bg-[#121827]' : 'bg-white'
        }`}>
          <div className="mb-6">
            <Trophy className={`w-20 h-20 mx-auto ${
              percentage >= 75 ? 'text-[#fbbf24]' : 'text-gray-400'
            }`} />
          </div>
          
          <h1 className={`text-4xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Quiz Complete!
          </h1>
          
          <p className={`text-xl mb-8 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {performanceMessage}
          </p>
          
          {/* Score display */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className={`text-5xl font-bold mb-2 ${
                darkMode ? 'text-[#5eead4]' : 'text-blue-600'
              }`}>
                {score}/{totalQuestions}
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Correct Answers
              </div>
            </div>
            
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className={`text-5xl font-bold mb-2 ${
                percentage >= 75
                  ? 'text-[#16a34a]'
                  : percentage >= 50
                    ? 'text-[#fbbf24]'
                    : 'text-[#fb7185]'
              }`}>
                {percentage}%
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Percentage
              </div>
            </div>
            
            <div className={`p-6 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              <div className={`text-5xl font-bold mb-2 ${
                darkMode ? 'text-[#ef476f]' : 'text-purple-600'
              }`}>
                {scaledScore}
              </div>
              <div className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Score (out of 200)
              </div>
            </div>
          </div>
          
          {/* Time taken */}
          <div className={`flex items-center justify-center gap-2 text-lg ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <Clock className="w-5 h-5" />
            <span>Time taken: {Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={onRestart}
            className={`py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              darkMode
                ? 'bg-[#5eead4] text-gray-900 hover:bg-[#4dd4bd]'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          
          <button
            onClick={() => setShowReview(!showReview)}
            className={`py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              darkMode
                ? 'bg-[#1f2937] text-gray-300 hover:bg-[#374151]'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Target className="w-5 h-5" />
            {showReview ? 'Hide Review' : 'Review Answers'}
          </button>
          
          <button
            onClick={onBack}
            className={`py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              darkMode
                ? 'bg-[#1f2937] text-gray-300 hover:bg-[#374151]'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Learn
          </button>
        </div>
        
        {/* Detailed review */}
        {showReview && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className={`text-2xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Review Your Answers
            </h2>
            
            {detailedResults.map((result, index) => {
              const question = questions.find(q => q.id === result.questionId)
              if (!question) return null
              
              return (
                <div
                  key={result.questionId}
                  className={`rounded-xl p-6 shadow-lg ${
                    result.correct
                      ? darkMode
                        ? 'bg-green-900/20 border-2 border-green-600'
                        : 'bg-green-50 border-2 border-green-300'
                      : darkMode
                        ? 'bg-red-900/20 border-2 border-red-600'
                        : 'bg-red-50 border-2 border-red-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      {result.correct ? (
                        <CheckCircle2 className="w-8 h-8 text-[#16a34a]" />
                      ) : (
                        <XCircle className="w-8 h-8 text-[#fb7185]" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className={`text-sm font-semibold mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Question {index + 1}
                      </div>
                      
                      {result.type === 'code' ? (
                        <pre className={`p-4 rounded-lg font-mono text-xs mb-4 overflow-x-auto ${
                          darkMode
                            ? 'bg-gray-900 text-gray-300'
                            : 'bg-white text-gray-800'
                        }`}>
                          {result.prompt}
                        </pre>
                      ) : (
                        <div className={`text-lg font-bold mb-4 ${
                          darkMode ? 'text-[#5eead4]' : 'text-blue-600'
                        }`}>
                          {result.prompt}
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        {result.selectedComplexity && (
                          <div className={`text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <span className="font-semibold">Your answer:</span>{' '}
                            <span className={result.correct ? 'text-[#16a34a]' : 'text-[#fb7185]'}>
                              {result.selectedComplexity}
                            </span>
                          </div>
                        )}
                        
                        {!result.correct && (
                          <div className={`text-sm ${
                            darkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            <span className="font-semibold">Correct answer:</span>{' '}
                            <span className="text-[#16a34a]">
                              {result.correctComplexity}
                            </span>
                          </div>
                        )}
                        
                        <div className={`text-sm mt-3 p-3 rounded-lg ${
                          darkMode ? 'bg-gray-800' : 'bg-white'
                        }`}>
                          <span className="font-semibold">Explanation:</span>{' '}
                          {result.explanation}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
      
      {/* Confetti for perfect score */}
      {isPerfect && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="confetti-container" />
        </div>
      )}
    </div>
  )
}
