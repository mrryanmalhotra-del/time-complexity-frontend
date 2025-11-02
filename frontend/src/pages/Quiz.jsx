import { useState, useEffect, useRef } from 'react';
import { Clock, Trophy, RefreshCw, Play, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { complexityFunctions, complexityColors } from '../data/presets';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const API_URL = 'http://localhost:3001/api';

// Mini complexity graph component for quiz options
const MiniComplexityGraph = ({ complexity, darkMode }) => {
  const func = complexityFunctions[complexity];
  const color = complexityColors[complexity] || '#8884d8';
  
  if (!func) {
    return <span className="font-mono text-sm">{complexity}</span>;
  }

  // Generate data points for the mini graph
  const dataPoints = [];
  const maxN = 20;
  for (let i = 1; i <= maxN; i++) {
    const value = func(i);
    if (isFinite(value) && value < 1000000) {
      dataPoints.push(value);
    } else {
      dataPoints.push(1000000);
    }
  }

  const data = {
    labels: Array.from({ length: maxN }, (_, i) => i + 1),
    datasets: [{
      data: dataPoints,
      borderColor: color,
      backgroundColor: `${color}20`,
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    },
    elements: {
      line: { borderWidth: 2 },
      point: { radius: 0 }
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="w-full h-16">
        <Line data={data} options={options} />
      </div>
      <span className="font-mono text-sm font-semibold" style={{ color }}>
        {complexity}
      </span>
    </div>
  );
};

const Quiz = ({ darkMode }) => {
  // Quiz state
  const [quizState, setQuizState] = useState('setup'); // 'setup', 'running', 'finished', 'review'
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [results, setResults] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [reviewQuestionIndex, setReviewQuestionIndex] = useState(0);
  
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);
  const quizContainerRef = useRef(null);

  // Quiz configurations
  const questionConfigs = [
    { count: 5, duration: 60, label: '5 Questions • 1 min' },
    { count: 10, duration: 120, label: '10 Questions • 2 min' },
    { count: 15, duration: 180, label: '15 Questions • 3 min' }
  ];

  // Timer effect
  useEffect(() => {
    if (quizState === 'running' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleQuizEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState, timeRemaining]);

  // Auto-scroll to top when question changes
  useEffect(() => {
    if (quizContainerRef.current) {
      quizContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentQuestionIndex, reviewQuestionIndex, quizState]);

  // Start a new quiz
  const startQuiz = async () => {
    try {
      const config = questionConfigs.find(c => c.count === questionCount);
      const response = await axios.get(`${API_URL}/quiz/random?count=${questionCount}`);
      
      setQuestions(response.data.questions);
      setTimeRemaining(config.duration);
      setQuizState('running');
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setSelectedOption(null);
      setIsAnswered(false);
      startTimeRef.current = Date.now();
      playSound('start');
    } catch (error) {
      console.error('Failed to fetch questions:', error);
      alert('Failed to load quiz questions. Please ensure the backend is running.');
    }
  };

  // Handle option selection
  const handleOptionSelect = (optionId) => {
    if (isAnswered) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = optionId === currentQuestion.correctOptionId;
    
    setSelectedOption(optionId);
    setIsAnswered(true);

    const timeTaken = Math.floor((Date.now() - startTimeRef.current) / 1000);
    const newAnswer = {
      questionId: currentQuestion.id,
      selectedOptionId: optionId,
      timeTaken,
      correct: isCorrect,
      question: currentQuestion,
      options: currentQuestion.options
    };
    
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    // Play sound and show feedback
    if (isCorrect) {
      playSound('correct');
      showConfetti();
    } else {
      playSound('wrong');
    }

    // Move to next question or end quiz
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setIsAnswered(false);
        startTimeRef.current = Date.now();
      } else {
        handleQuizEnd();
      }
    }, 1000);
  };

  // Handle quiz end
  const handleQuizEnd = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    const correctCount = answers.filter(a => a.correct).length;
    const totalQuestions = questions.length || answers.length;
    const score = Math.round((correctCount / totalQuestions) * 100);
    const timeSpent = questionConfigs.find(c => c.count === questionCount).duration - timeRemaining;
    
    setResults({
      score,
      correctCount,
      totalQuestions,
      timeSpent,
      answers
    });
    
    setQuizState('finished');
    playSound('finish');
  };

  // Handle quiz quit
  const handleQuitQuiz = () => {
    if (window.confirm('Are you sure you want to quit the quiz? Your progress will be saved.')) {
      handleQuizEnd();
    }
  };

  // Handle review answers
  const handleReviewAnswers = () => {
    setQuizState('review');
    setReviewQuestionIndex(0);
  };

  // Play sound effects
  const playSound = (type) => {
    // Implementation for playing sounds
    const sounds = {
      correct: () => {
        const audio = new Audio('/sounds/correct.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));
      },
      wrong: () => {
        const audio = new Audio('/sounds/wrong.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));
      },
      start: () => {
        const audio = new Audio('/sounds/start.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));
      },
      finish: () => {
        const audio = new Audio('/sounds/finish.mp3');
        audio.volume = 0.5;
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
    };
    
    if (sounds[type]) {
      sounds[type]();
    }
  };

  // Show confetti effect
  const showConfetti = () => {
    // Implementation for confetti effect
    if (typeof window !== 'undefined' && window.confetti) {
      const count = 200;
      const defaults = {
        origin: { y: 0.7 },
        angle: 60,
        spread: 55,
        startVelocity: 45,
        elementCount: 50,
        dragFriction: 0.1,
        duration: 3000,
        stagger: 0,
        width: '10px',
        height: '10px',
        colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
      };

      function fire(particleRatio, opts) {
        window.confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio)
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    }
  };

  // Format time (mm:ss)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Quiz setup screen
  if (quizState === 'setup') {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`w-full max-w-md p-8 rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h1 className={`text-3xl font-bold text-center mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Time Complexity Quiz
          </h1>
          <p className={`text-center mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Test your knowledge of Big O notation and algorithm analysis
          </p>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Select Quiz Length</h2>
            <div className="space-y-3">
              {questionConfigs.map((config) => (
                <button
                  key={config.count}
                  onClick={() => setQuestionCount(config.count)}
                  className={`w-full px-6 py-4 rounded-lg text-left transition-colors ${
                    questionCount === config.count
                      ? 'bg-indigo-600 text-white'
                      : darkMode
                      ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium">{config.label}</div>
                  <div className="text-sm opacity-80">
                    {config.count} questions • {formatTime(config.duration)}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={startQuiz}
            className={`w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors ${
              darkMode
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            <Play size={18} className="mr-2" />
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz in progress
  if (quizState === 'running' && questions.length > 0) {
    const currentQuestion = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    const timePercentage = (timeRemaining / (questionConfigs.find(c => c.count === questionCount).duration)) * 100;

    return (
      <div 
        ref={quizContainerRef}
        className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
      >
        {/* Header */}
        <div className={`p-4 border-b ${darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-2 sm:mb-0">
              <div className="flex items-center">
                <Clock size={20} className="mr-2 text-indigo-500" />
                <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
              </div>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div>
                <span className="font-medium">{currentQuestionIndex + 1}</span>
                <span className="text-gray-500"> / {questions.length}</span>
              </div>
            </div>
            
            <button
              onClick={handleQuitQuiz}
              className={`px-4 py-2 rounded-md flex items-center space-x-2 ${
                darkMode
                  ? 'bg-red-900/30 hover:bg-red-900/50 text-red-400'
                  : 'bg-red-100 hover:bg-red-200 text-red-600'
              } transition-colors`}
            >
              <X size={16} />
              <span>Quit Quiz</span>
            </button>
          </div>
          
          {/* Progress bar */}
          <div className={`h-1 mt-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Time remaining bar */}
          <div className={`h-1 mt-1 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div 
              className={`h-full ${
                timePercentage > 50 ? 'bg-green-500' : timePercentage > 25 ? 'bg-yellow-500' : 'bg-red-500'
              } rounded-full transition-all duration-1000`}
              style={{ width: `${timePercentage}%` }}
            />
          </div>
        </div>
        
        {/* Question */}
        <div className="flex-1 p-4 sm:p-8 max-w-4xl mx-auto w-full">
          <div className={`p-6 rounded-xl mb-8 ${
            darkMode ? 'bg-gray-800' : 'bg-white shadow-md'
          }`}>
            <h2 className="text-xl font-medium mb-6">{currentQuestion.question}</h2>
            
            {currentQuestion.codeSnippet && (
              <pre className={`p-4 rounded-lg mb-6 overflow-x-auto text-sm ${
                darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-100 text-gray-800'
              }`}>
                <code>{currentQuestion.codeSnippet}</code>
              </pre>
            )}
            
            <div className="space-y-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedOption === option.id;
                const isCorrect = option.id === currentQuestion.correctOptionId;
                const showFeedback = isAnswered && (isSelected || isCorrect);
                
                let optionStyle = '';
                if (showFeedback) {
                  optionStyle = isCorrect 
                    ? 'bg-green-500/10 border-green-500 text-green-600 dark:text-green-400'
                    : isSelected 
                      ? 'bg-red-500/10 border-red-500 text-red-600 dark:text-red-400'
                      : '';
                } else if (isSelected) {
                  optionStyle = 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400';
                } else {
                  optionStyle = darkMode 
                    ? 'border-gray-700 hover:border-gray-600 hover:bg-gray-700/50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50';
                }
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option.id)}
                    disabled={isAnswered}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${optionStyle} ${
                      isAnswered ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-1 ${
                        showFeedback 
                          ? isCorrect 
                            ? 'bg-green-500 text-white' 
                            : isSelected 
                              ? 'bg-red-500 text-white' 
                              : ''
                          : isSelected
                            ? 'bg-indigo-500 text-white'
                            : darkMode
                              ? 'bg-gray-700 text-gray-400'
                              : 'bg-gray-100 text-gray-500'
                      }`}>
                        {showFeedback ? (
                          isCorrect ? <Check size={16} /> : <X size={16} />
                        ) : (
                          String.fromCharCode(65 + currentQuestion.options.indexOf(option))
                        )}
                      </div>
                      <div className="flex-1">
                        {option.graphDef ? (
                          <MiniComplexityGraph 
                            complexity={option.graphDef.label} 
                            darkMode={darkMode}
                          />
                        ) : (
                          <span>{option.text || option.graphDef?.label || 'Option'}</span>
                        )}
                      </div>
                    </div>
                    
                    {showFeedback && option.explanation && (
                      <div className={`mt-2 text-sm p-2 rounded ${
                        isCorrect 
                          ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                          : 'bg-red-500/10 text-red-700 dark:text-red-400'
                      }`}>
                        {option.explanation}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {isAnswered && currentQuestionIndex < questions.length - 1 && (
            <div className="text-center mt-6">
              <button
                onClick={() => {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                  setSelectedOption(null);
                  setIsAnswered(false);
                  startTimeRef.current = Date.now();
                }}
                className={`px-6 py-2 rounded-lg font-medium ${
                  darkMode
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Quiz results
  if (quizState === 'finished' && results) {
    const { score, correctCount, totalQuestions, timeSpent, answers } = results;
    
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className={`w-full max-w-2xl p-8 rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center text-2xl font-bold"
                 style={{
                   background: `conic-gradient(#4f46e5 0% ${score}%, ${darkMode ? '#374151' : '#e5e7eb'} ${score}% 100%)`
                 }}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {score}%
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">
              {score >= 80 ? 'Excellent!' : score >= 60 ? 'Good Job!' : 'Keep Practicing!'}
            </h1>
            <p className="text-gray-500 mb-6">
              You answered {correctCount} out of {totalQuestions} questions correctly
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-sm text-gray-500">Time Spent</div>
                <div className="font-medium">{formatTime(timeSpent)}</div>
              </div>
              <div className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-sm text-gray-500">Correct Answers</div>
                <div className="font-medium">{correctCount} / {totalQuestions}</div>
              </div>
              <div className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <div className="text-sm text-gray-500">Average Time</div>
                <div className="font-medium">
                  {Math.round(answers.reduce((sum, a) => sum + a.timeTaken, 0) / answers.length)}s per question
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleReviewAnswers}
                className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                  darkMode
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                <RefreshCw size={18} />
                <span>Review Answers</span>
              </button>
              
              <button
                onClick={() => {
                  setQuizState('setup');
                  setResults(null);
                }}
                className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                <Play size={18} className="mr-1" />
                <span>New Quiz</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Review answers
  if (quizState === 'review' && results) {
    const { answers } = results;
    const currentAnswer = answers[reviewQuestionIndex];
    const currentQuestion = currentAnswer?.question;
    
    if (!currentQuestion) return null;
    
    return (
      <div 
        ref={quizContainerRef}
        className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
      >
        {/* Header */}
        <div className={`p-4 border-b ${darkMode ? 'border-gray-800 bg-gray-800' : 'border-gray-200 bg-white'}`}>
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Review Answers</h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuizState('finished')}
                className={`px-4 py-2 rounded-md ${
                  darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                Back to Results
              </button>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mt-4 flex items-center justify-center space-x-2">
            <button
              onClick={() => setReviewQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={reviewQuestionIndex === 0}
              className={`p-1 rounded-full ${reviewQuestionIndex === 0 ? 'opacity-50' : 'hover:bg-gray-200/20'}`}
              aria-label="Previous question"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="text-center">
              <span className="font-medium">{reviewQuestionIndex + 1}</span>
              <span className="text-gray-500"> / {answers.length}</span>
            </div>
            
            <button
              onClick={() => setReviewQuestionIndex(prev => Math.min(answers.length - 1, prev + 1))}
              disabled={reviewQuestionIndex === answers.length - 1}
              className={`p-1 rounded-full ${reviewQuestionIndex === answers.length - 1 ? 'opacity-50' : 'hover:bg-gray-200/20'}`}
              aria-label="Next question"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        {/* Review Content */}
        <div className="flex-1 p-4 sm:p-8 max-w-4xl mx-auto w-full">
          <div className={`p-6 rounded-xl mb-8 ${
            darkMode ? 'bg-gray-800' : 'bg-white shadow-md'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  currentAnswer.correct
                    ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                    : 'bg-red-500/10 text-red-700 dark:text-red-400'
                }`}>
                  {currentAnswer.correct ? 'Correct' : 'Incorrect'}
                </span>
                <span className="ml-3 text-sm text-gray-500">
                  Time: {currentAnswer.timeTaken}s
                </span>
              </div>
              
              <div className="text-sm text-gray-500">
                Question {reviewQuestionIndex + 1} of {answers.length}
              </div>
            </div>
            
            <h2 className="text-xl font-medium mb-6">{currentQuestion.question}</h2>
            
            {currentQuestion.codeSnippet && (
              <pre className={`p-4 rounded-lg mb-6 overflow-x-auto text-sm ${
                darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-100 text-gray-800'
              }`}>
                <code>{currentQuestion.codeSnippet}</code>
              </pre>
            )}
            
            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option) => {
                const isSelected = currentAnswer.selectedOptionId === option.id;
                const isCorrect = option.id === currentQuestion.correctOptionId;
                
                let optionStyle = '';
                if (isCorrect) {
                  optionStyle = 'bg-green-500/10 border-green-500 text-green-700 dark:text-green-400';
                } else if (isSelected) {
                  optionStyle = 'bg-red-500/10 border-red-500 text-red-700 dark:text-red-400';
                } else {
                  optionStyle = darkMode 
                    ? 'border-gray-700 bg-gray-800/50' 
                    : 'border-gray-200 bg-gray-50';
                }
                
                return (
                  <div
                    key={option.id}
                    className={`p-4 rounded-lg border-2 ${optionStyle} transition-colors`}
                  >
                    <div className="flex items-start">
                      <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mr-3 mt-0.5 ${
                        isCorrect
                          ? 'bg-green-500 text-white'
                          : isSelected
                            ? 'bg-red-500 text-white'
                            : darkMode
                              ? 'bg-gray-700 text-gray-400'
                              : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isCorrect ? (
                          <Check size={16} />
                        ) : isSelected ? (
                          <X size={16} />
                        ) : (
                          String.fromCharCode(65 + currentQuestion.options.indexOf(option))
                        )}
                      </div>
                      <div className="flex-1">
                        {option.graphDef ? (
                          <MiniComplexityGraph 
                            complexity={option.graphDef.label} 
                            darkMode={darkMode}
                          />
                        ) : (
                          <span>{option.text || option.graphDef?.label || 'Option'}</span>
                        )}
                        {option.explanation && (
                          <div className={`mt-2 text-sm p-2 rounded ${
                            isCorrect 
                              ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                              : isSelected
                                ? 'bg-red-500/10 text-red-700 dark:text-red-400'
                                : 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400'
                          }`}>
                            {option.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-medium mb-2">Your Answer:</h3>
              <div className={`p-3 rounded-lg ${
                currentAnswer.correct
                  ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                  : 'bg-red-500/10 text-red-700 dark:text-red-400'
              }`}>
                {(() => {
                  const selectedOpt = currentQuestion.options.find(o => o.id === currentAnswer.selectedOptionId);
                  return selectedOpt?.graphDef?.label || selectedOpt?.text || 'No answer selected';
                })()}
              </div>
              
              <h3 className="font-medium mt-4 mb-2">Correct Answer:</h3>
              <div className="p-3 rounded-lg bg-green-500/10 text-green-700 dark:text-green-400">
                {(() => {
                  const correctOpt = currentQuestion.options.find(o => o.id === currentQuestion.correctOptionId);
                  return correctOpt?.graphDef?.label || correctOpt?.text;
                })()}
              </div>
              
              {currentQuestion.explanation && (
                <>
                  <h3 className="font-medium mt-4 mb-2">Explanation:</h3>
                  <div className="p-3 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400">
                    {currentQuestion.explanation}
                  </div>
                </>
              )}
            </div>
          </div>
          
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setReviewQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={reviewQuestionIndex === 0}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                reviewQuestionIndex === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-200/20'
              }`}
            >
              <ChevronLeft size={20} />
              <span>Previous</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuizState('finished')}
                className="px-4 py-2 rounded-lg hover:bg-gray-200/20"
              >
                Back to Results
              </button>
              
              <button
                onClick={() => setQuizState('setup')}
                className={`px-6 py-2 rounded-lg font-medium ${
                  darkMode
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                }`}
              >
                New Quiz
              </button>
            </div>
            
            <button
              onClick={() => setReviewQuestionIndex(prev => Math.min(answers.length - 1, prev + 1))}
              disabled={reviewQuestionIndex === answers.length - 1}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                reviewQuestionIndex === answers.length - 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-200/20'
              }`}
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Loading...</p>
      </div>
    </div>
  );
};

export default Quiz;
