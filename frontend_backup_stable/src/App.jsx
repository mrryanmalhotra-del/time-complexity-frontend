import { useState, useEffect } from 'react'
import ComplexityGraph from './components/ComplexityGraph'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import QuizPage from './components/Quiz/QuizPage'
import { Activity, BookOpen, Trophy, Code, Zap } from 'lucide-react'
import Footer from './components/Footer'
import axios from 'axios'

function App() {
  const [activeTab, setActiveTab] = useState('learn') // 'learn' or 'quiz'
  const [nValue, setNValue] = useState(100)
  const [selectedComplexities, setSelectedComplexities] = useState(['n'])
  const [presetAlgorithms, setPresetAlgorithms] = useState([])
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode')
    return saved ? JSON.parse(saved) : false
  })
  const [isLoadingPresets, setIsLoadingPresets] = useState(false)

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // Load preset algorithms
  useEffect(() => {
    const fetchPresets = async () => {
      setIsLoadingPresets(true)
      try {
        const response = await axios.get('http://localhost:3001/api/presets')
        setPresetAlgorithms(response.data)
      } catch (error) {
        console.error('Error loading presets:', error)
      } finally {
        setIsLoadingPresets(false)
      }
    }
    
    fetchPresets()
  }, [])

  const toggleDarkMode = () => setDarkMode(!darkMode)
  
  const togglePresetAlgorithm = (algorithm) => {
    setSelectedComplexities(prev => {
      const isSelected = prev.includes(algorithm.id)
      if (isSelected) {
        return prev.filter(id => id !== algorithm.id)
      } else {
        return [...prev, algorithm.id]
      }
    })
  }

  const defaultComplexities = [
    { 
      id: '1', 
      name: '1', 
      label: 'O(1)', 
      color: '#10b981',
      description: 'Constant time - operation takes the same time regardless of input size',
      examples: ['Array access', 'Hash table lookup', 'Simple arithmetic']
    },
    { 
      id: 'logn', 
      name: 'Math.log2(n)', 
      label: 'O(log n)', 
      color: '#3b82f6',
      description: 'Logarithmic time - time increases slowly as input grows',
      examples: ['Binary search', 'Balanced tree operations', 'Finding in sorted array']
    },
    { 
      id: 'sqrtn', 
      name: 'Math.sqrt(n)', 
      label: 'O(√n)', 
      color: '#8b5cf6',
      description: 'Square root time - grows slower than linear',
      examples: ['Primality testing', 'Some graph algorithms']
    },
    { 
      id: 'n', 
      name: 'n', 
      label: 'O(n)', 
      color: '#f59e0b',
      description: 'Linear time - time grows proportionally with input size',
      examples: ['Linear search', 'Array traversal', 'Finding min/max']
    },
    { 
      id: 'nlogn', 
      name: 'n * Math.log2(n)', 
      label: 'O(n log n)', 
      color: '#ec4899',
      description: 'Linearithmic time - efficient sorting algorithms',
      examples: ['Merge sort', 'Heap sort', 'Quick sort (average case)']
    },
    { 
      id: 'n2', 
      name: 'n * n', 
      label: 'O(n²)', 
      color: '#ef4444',
      description: 'Quadratic time - time grows with square of input',
      examples: ['Bubble sort', 'Selection sort', 'Nested loops']
    },
    { 
      id: 'n3', 
      name: 'n * n * n', 
      label: 'O(n³)', 
      color: '#dc2626',
      description: 'Cubic time - triple nested loops',
      examples: ['Matrix multiplication', 'Floyd-Warshall algorithm']
    },
    { 
      id: '2n', 
      name: 'Math.pow(2, n)', 
      label: 'O(2ⁿ)', 
      color: '#991b1b',
      description: 'Exponential time - doubles with each additional input',
      examples: ['Recursive Fibonacci', 'Subset generation', 'Tower of Hanoi']
    },
    { 
      id: 'nfact', 
      name: 'factorial(n)', 
      label: 'O(n!)', 
      color: '#7f1d1d',
      description: 'Factorial time - extremely slow growth',
      examples: ['Traveling salesman (brute force)', 'Permutation generation']
    }
  ]

  const handleToggleComplexity = (id) => {
    setSelectedComplexities(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id)
        : [...prev, id]
    )
  }

  const handleAddCustomFunction = (func) => {
    setCustomFunctions(prev => [...prev, func])
    setSelectedComplexities(prev => [...prev, func.id])
  }

  const handleRemoveCustomFunction = (id) => {
    setCustomFunctions(prev => prev.filter(f => f.id !== id))
    setSelectedComplexities(prev => prev.filter(c => c !== id))
  }

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-slate-50 to-slate-100'
    }`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      {/* Top Navigation Tabs */}
      <div className={`border-b ${
        darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'
      } backdrop-blur-sm sticky top-0 z-10`}>
        <div className="container mx-auto px-4">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('learn')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all relative ${
                activeTab === 'learn'
                  ? darkMode
                    ? 'text-[#5eead4]'
                    : 'text-blue-600'
                  : darkMode
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-600 hover:text-gray-700'
              }`}
            >
              <BookOpen className="w-5 h-5" />
              Learn
              {activeTab === 'learn' && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                  darkMode ? 'bg-[#5eead4]' : 'bg-blue-600'
                }`} />
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-6 py-4 font-semibold transition-all relative ${
                activeTab === 'quiz'
                  ? darkMode
                    ? 'text-[#5eead4]'
                    : 'text-blue-600'
                  : darkMode
                    ? 'text-gray-400 hover:text-gray-300'
                    : 'text-gray-600 hover:text-gray-700'
              }`}
            >
              <Trophy className="w-5 h-5" />
              Quiz
              {activeTab === 'quiz' && (
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                  darkMode ? 'bg-[#5eead4]' : 'bg-blue-600'
                }`} />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'quiz' ? (
          <QuizPage darkMode={darkMode} onBack={() => setActiveTab('learn')} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Graph Section */}
            <div className="lg:col-span-2">
              <ComplexityGraph 
                nValue={nValue}
                selectedComplexities={selectedComplexities}
                presetAlgorithms={presetAlgorithms.filter(preset => 
                  selectedComplexities.includes(preset.id)
                )}
                darkMode={darkMode}
              />
            </div>
            
            {/* Controls Section */}
            <div className="space-y-6">
              {/* Input Size Slider */}
              <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="text-lg font-semibold mb-4">
                  Input Size (n): {nValue}
                </h3>
                <input
                  type="range"
                  min="1"
                  max="1000"
                  value={nValue}
                  onChange={(e) => setNValue(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
              
              {/* Preset Algorithms */}
              <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                  Try These Presets
                </h3>
                
                {isLoadingPresets ? (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {presetAlgorithms.map((algo) => (
                      <button
                        key={algo.id}
                        onClick={() => togglePresetAlgorithm(algo)}
                        className={`p-3 rounded-lg border transition-all text-left ${
                          selectedComplexities.includes(algo.id)
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 shadow-md'
                            : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                        title={algo.description}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                              style={{ backgroundColor: algo.color }}
                            />
                            <span className="font-medium">{algo.name}</span>
                          </div>
                          <code className="text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 ml-2">
                            {algo.complexity}
                          </code>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Selected Algorithms */}
              {selectedComplexities.length > 0 && (
                <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Code className="w-5 h-5 mr-2 text-indigo-500" />
                    Selected Algorithms
                  </h3>
                  <div className="space-y-3">
                    {presetAlgorithms
                      .filter(algo => selectedComplexities.includes(algo.id))
                      .map(algo => (
                        <div 
                          key={algo.id} 
                          className="p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: algo.color }}
                              />
                              <span className="font-medium">{algo.name}</span>
                            </div>
                            <button
                              onClick={() => togglePresetAlgorithm(algo)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              title="Remove"
                            >
                              ×
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {algo.description}
                          </p>
                          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <span className="font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                              {algo.complexity}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <Footer darkMode={darkMode} />
    </div>
  )
}

export default App
