import React, { useState } from 'react'
import { X, BookOpen, ChevronDown, ChevronUp, Lightbulb, TrendingUp, Code, Database } from 'lucide-react'

function LearnMoreModal({ darkMode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState(null)

  const complexityData = [
    {
      category: 'Constant',
      bigO: 'O(1)',
      examples: 'Array index access, push/pop in stack, hash map lookup',
      realWorld: 'Hash table operations, stack operations, accessing array elements'
    },
    {
      category: 'Logarithmic',
      bigO: 'O(log n)',
      examples: 'Binary search, tree height traversal',
      realWorld: 'Binary search in sorted arrays, balanced BST operations, divide-and-conquer algorithms'
    },
    {
      category: 'Linear',
      bigO: 'O(n)',
      examples: 'Linear search, single loop',
      realWorld: 'Iterating through arrays, linked list traversal, finding min/max'
    },
    {
      category: 'Linearithmic',
      bigO: 'O(n log n)',
      examples: 'Merge sort, heapsort, quicksort (average)',
      realWorld: 'Efficient sorting algorithms, FFT, computational geometry'
    },
    {
      category: 'Quadratic',
      bigO: 'O(n²)',
      examples: 'Bubble sort, insertion sort, selection sort, pair comparisons',
      realWorld: 'Nested loops, naive string matching, all-pairs comparisons'
    },
    {
      category: 'Cubic',
      bigO: 'O(n³)',
      examples: 'Matrix multiplication, 3 nested loops',
      realWorld: '3D matrix operations, Floyd-Warshall algorithm, naive multiplication'
    },
    {
      category: 'Exponential',
      bigO: 'O(2ⁿ)',
      examples: 'Recursive Fibonacci, subset generation',
      realWorld: 'Subset enumeration, recursive backtracking, brute-force optimization'
    },
    {
      category: 'Factorial',
      bigO: 'O(n!)',
      examples: 'Travelling Salesman brute-force, permutation generation',
      realWorld: 'Permutation generation, TSP exact solution, full search space exploration'
    }
  ]

  const advancedTopics = [
    {
      title: 'Sublinear: O(√n)',
      description: 'Faster than linear but slower than logarithmic',
      formula: 'f(n) = √n',
      examples: ['Jump search in sorted arrays', 'Trial division for primality testing', 'Square root decomposition'],
      explanation: 'Jump search works by jumping √n steps, then doing linear search in blocks. For n=1,000,000, it only needs ~1,000 operations.',
      code: `// Jump Search Example
function jumpSearch(arr, x) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  
  // Jump blocks of size √n
  for (let prev = 0; prev < n; prev += step) {
    if (arr[Math.min(step, n) - 1] >= x) {
      // Linear search in block
      for (let i = prev; i < Math.min(step, n); i++) {
        if (arr[i] === x) return i;
      }
      return -1;
    }
  }
  return -1;
}`
    },
    {
      title: 'Polynomial: O(nᵏ)',
      description: 'General form for polynomial time algorithms',
      formula: 'f(n) = nᵏ where k is constant',
      examples: ['Dynamic programming with k dimensions', 'Matrix chain multiplication', 'Multi-dimensional loops'],
      explanation: 'The exponent k represents the number of nested dimensions. O(n²) is quadratic, O(n³) is cubic, etc. These are considered "tractable" problems.',
      code: `// 3D DP Example - O(n³)
function solve3DProblem(n) {
  const dp = new Array(n);
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      dp[i][j] = new Array(n);
      for (let k = 0; k < n; k++) {
        dp[i][j][k] = computeValue(i, j, k);
      }
    }
  }
  return dp;
}`
    }
  ]

  const realWorldApplications = [
    {
      category: 'Sorting Algorithms',
      complexities: ['O(n log n)', 'O(n²)', 'O(n)'],
      examples: {
        'O(n log n)': ['Merge Sort', 'Quick Sort (average)', 'Heap Sort'],
        'O(n²)': ['Bubble Sort', 'Insertion Sort', 'Selection Sort'],
        'O(n)': ['Counting Sort', 'Radix Sort (when range is limited)']
      },
      practical: 'Real-world systems need efficient sorting. Databases use O(n log n) algorithms for large datasets, while O(n) counting sort is used for integer ranges.'
    },
    {
      category: 'Searching Algorithms',
      complexities: ['O(log n)', 'O(n)', 'O(1)'],
      examples: {
        'O(log n)': ['Binary Search', 'BST Search'],
        'O(n)': ['Linear Search', 'Linked List Traversal'],
        'O(1)': ['Hash Table Lookup', 'Array Index Access']
      },
      practical: 'Search engines use hash tables for instant lookups, while binary search powers database indexes. Linear search is used when data is unsorted.'
    },
    {
      category: 'Recursion Patterns',
      complexities: ['O(n)', 'O(2ⁿ)', 'O(n log n)'],
      examples: {
        'O(n)': ['Linear recursion', 'Linked list reversal'],
        'O(2ⁿ)': ['Naive Fibonacci', 'Subset generation'],
        'O(n log n)': ['Divide and conquer', 'Merge sort recursion']
      },
      practical: 'Recursion depth and branching determine complexity. Memoization can reduce O(2ⁿ) to O(n), making many problems tractable.'
    }
  ]

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          darkMode
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        <BookOpen size={18} />
        Learn More
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className={`w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            {/* Header */}
            <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <h2 className={`text-2xl font-bold flex items-center gap-2 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                <BookOpen size={24} />
                Time Complexity Reference Guide
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Sections */}
            <div className="p-6 space-y-8">
              
              {/* Basic Complexity Table */}
              <div>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <Database className="w-5 h-5" />
                  Complexity Classes
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className={`border-b-2 ${
                        darkMode ? 'border-gray-600' : 'border-gray-300'
                      }`}>
                        <th className={`py-3 px-4 text-left font-semibold ${
                          darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>Category</th>
                        <th className={`py-3 px-4 text-left font-semibold ${
                          darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>Big-O</th>
                        <th className={`py-3 px-4 text-left font-semibold ${
                          darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>Examples</th>
                        <th className={`py-3 px-4 text-left font-semibold ${
                          darkMode ? 'text-gray-200' : 'text-gray-700'
                        }`}>Real-World</th>
                      </tr>
                    </thead>
                    <tbody>
                      {complexityData.map((row, index) => (
                        <tr
                          key={index}
                          className={`border-b transition-colors ${
                            darkMode
                              ? 'border-gray-700 hover:bg-gray-750'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <td className={`py-3 px-4 font-medium ${
                            darkMode ? 'text-gray-300' : 'text-gray-800'
                          }`}>{row.category}</td>
                          <td className={`py-3 px-4 font-mono font-bold text-lg ${
                            darkMode ? 'text-blue-400' : 'text-blue-600'
                          }`}>{row.bigO}</td>
                          <td className={`py-3 px-4 ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>{row.examples}</td>
                          <td className={`py-3 px-4 text-sm ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>{row.realWorld}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Advanced Topics Section */}
              <div>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <Lightbulb className="w-5 h-5" />
                  Advanced Topics
                </h3>
                <div className="space-y-4">
                  {advancedTopics.map((topic, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg overflow-hidden transition-all ${
                        darkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}
                    >
                      <button
                        onClick={() => toggleSection(`advanced-${index}`)}
                        className={`w-full p-4 flex items-center justify-between text-left transition-colors ${
                          darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
                          }`}>
                            <Code className="w-4 h-4 text-blue-500" />
                          </div>
                          <div>
                            <h4 className={`font-bold ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>{topic.title}</h4>
                            <p className={`text-sm ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>{topic.description}</p>
                          </div>
                        </div>
                        {expandedSection === `advanced-${index}` ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      
                      {expandedSection === `advanced-${index}` && (
                        <div className={`p-4 border-t ${
                          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
                        }`}>
                          <div className="space-y-4">
                            <div>
                              <span className={`font-semibold ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>Formula: </span>
                              <code className={`px-2 py-1 rounded ${
                                darkMode ? 'bg-gray-900 text-blue-400' : 'bg-gray-100 text-blue-600'
                              }`}>{topic.formula}</code>
                            </div>
                            
                            <div>
                              <span className={`font-semibold ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>Examples:</span>
                              <ul className={`mt-2 space-y-1 text-sm ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {topic.examples.map((example, i) => (
                                  <li key={i} className="flex items-center gap-2">
                                    <span className="w-1 h-1 bg-blue-500 rounded-full"></span>
                                    {example}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <span className={`font-semibold ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>Explanation:</span>
                              <p className={`mt-2 text-sm ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>{topic.explanation}</p>
                            </div>
                            
                            <div>
                              <span className={`font-semibold ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>Code Example:</span>
                              <pre className={`mt-2 p-3 rounded-lg text-xs overflow-x-auto ${
                                darkMode ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {topic.code}
                              </pre>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-World Applications */}
              <div>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <TrendingUp className="w-5 h-5" />
                  Real-World Applications
                </h3>
                <div className="space-y-4">
                  {realWorldApplications.map((app, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg overflow-hidden transition-all ${
                        darkMode ? 'border-gray-700' : 'border-gray-200'
                      }`}
                    >
                      <button
                        onClick={() => toggleSection(`app-${index}`)}
                        className={`w-full p-4 flex items-center justify-between text-left transition-colors ${
                          darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            darkMode ? 'bg-green-900/30' : 'bg-green-50'
                          }`}>
                            <Database className="w-4 h-4 text-green-500" />
                          </div>
                          <div>
                            <h4 className={`font-bold ${
                              darkMode ? 'text-white' : 'text-gray-900'
                            }`}>{app.category}</h4>
                            <p className={`text-sm ${
                              darkMode ? 'text-gray-400' : 'text-gray-600'
                            }`}>{app.complexities.join(', ')} complexities</p>
                          </div>
                        </div>
                        {expandedSection === `app-${index}` ? (
                          <ChevronUp className="w-5 h-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      
                      {expandedSection === `app-${index}` && (
                        <div className={`p-4 border-t ${
                          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
                        }`}>
                          <div className="space-y-4">
                            <div>
                              <span className={`font-semibold ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>Algorithm Examples:</span>
                              <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-3">
                                {Object.entries(app.examples).map(([complexity, algorithms]) => (
                                  <div key={complexity} className={`p-3 rounded-lg ${
                                    darkMode ? 'bg-gray-900' : 'bg-white border border-gray-200'
                                  }`}>
                                    <code className={`text-sm font-bold ${
                                      darkMode ? 'text-blue-400' : 'text-blue-600'
                                    }`}>{complexity}</code>
                                    <ul className={`mt-2 space-y-1 text-xs ${
                                      darkMode ? 'text-gray-400' : 'text-gray-600'
                                    }`}>
                                      {algorithms.map((algo, i) => (
                                        <li key={i}>• {algo}</li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <span className={`font-semibold ${
                                darkMode ? 'text-gray-300' : 'text-gray-700'
                              }`}>Practical Applications:</span>
                              <p className={`mt-2 text-sm ${
                                darkMode ? 'text-gray-400' : 'text-gray-600'
                              }`}>{app.practical}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Comparison */}
              <div>
                <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  <TrendingUp className="w-5 h-5" />
                  Growth Rate Comparison
                </h3>
                <div className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    {[
                      { n: 10, o1: '1', ologn: '3.3', on: '10', onlogn: '33' },
                      { n: 100, o1: '1', ologn: '6.6', on: '100', onlogn: '664' },
                      { n: 1000, o1: '1', ologn: '10', on: '1,000', onlogn: '9,966' },
                      { n: 10000, o1: '1', ologn: '13.3', on: '10,000', onlogn: '132,877' }
                    ].map((row, i) => (
                      <div key={i} className={`p-3 rounded-lg ${
                        darkMode ? 'bg-gray-900' : 'bg-white'
                      }`}>
                        <div className={`font-bold mb-2 ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>n = {row.n}</div>
                        <div className="space-y-1 text-xs">
                          <div>O(1): {row.o1}</div>
                          <div>O(log n): {row.ologn}</div>
                          <div>O(n): {row.on}</div>
                          <div>O(n log n): {row.onlogn}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className={`mt-4 text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <strong>Key Insight:</strong> At n=10,000, O(n log n) performs ~13× more operations than O(n), 
                    while O(1) remains constant. This demonstrates why algorithm choice matters for large datasets.
                  </p>
                </div>
              </div>

              {/* Footer Note */}
              <div className={`p-4 rounded-lg border ${
                darkMode
                  ? 'bg-gray-750 border-gray-600 text-gray-300'
                  : 'bg-blue-50 border-blue-200 text-gray-700'
              }`}>
                <p className="text-sm">
                  <strong>Note:</strong> These are theoretical complexities in the worst case unless specified. 
                  Actual performance depends on implementation details, input characteristics, and system architecture. 
                  Modern optimizations, caching, and hardware can significantly impact real-world performance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LearnMoreModal
