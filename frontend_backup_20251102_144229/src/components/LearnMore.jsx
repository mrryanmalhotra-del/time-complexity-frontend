import { useState } from 'react'
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react'

function LearnMore({ darkMode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItem, setExpandedItem] = useState(null)

  const complexities = [
    {
      id: 'o1',
      notation: 'O(1)',
      name: 'Constant time',
      definition: 'Operation takes the same time regardless of input size',
      examples: ['Array access', 'Hash lookup'],
      explanation: 'These operations access data directly in memory, taking the same amount of time whether your array has 10 items or 10 million items.'
    },
    {
      id: 'ologn',
      notation: 'O(log n)',
      name: 'Logarithmic',
      definition: 'Time increases slowly as input grows',
      examples: ['Binary search', 'Divide-and-conquer'],
      explanation: 'Each step eliminates half the remaining data. Doubling the input size only adds one more step. Very efficient for large datasets.'
    },
    {
      id: 'on',
      notation: 'O(n)',
      name: 'Linear',
      definition: 'Time grows proportionally with input',
      examples: ['Linear search', 'Single loop'],
      explanation: 'If you double the input size, the time doubles. Common with algorithms that must examine each element once.'
    },
    {
      id: 'onlogn',
      notation: 'O(n log n)',
      name: 'Linearithmic',
      definition: 'Efficient sorting algorithms',
      examples: ['Merge sort', 'Heap sort'],
      explanation: 'This is the best achievable complexity for comparison-based sorting. It combines linear and logarithmic behavior through divide-and-conquer.'
    },
    {
      id: 'on2',
      notation: 'O(n²)',
      name: 'Quadratic',
      definition: 'Time grows with square of input',
      examples: ['Bubble sort', 'Nested loops'],
      explanation: 'Common with nested loops where each element is compared with every other element. Doubling input quadruples the time.'
    },
    {
      id: 'on3',
      notation: 'O(n³)',
      name: 'Cubic',
      definition: 'Triple nested loops',
      examples: ['Matrix multiplication (3 nested loops)'],
      explanation: 'Three levels of nested iteration. Typically appears in algorithms working with 3D data or certain matrix operations.'
    },
    {
      id: 'o2n',
      notation: 'O(2ⁿ)',
      name: 'Exponential',
      definition: 'Doubles with each additional input',
      examples: ['Recursive Fibonacci', 'Subset generation'],
      explanation: 'Time explodes quickly. Adding just one more element doubles the running time. Only practical for very small inputs (n < 30).'
    },
    {
      id: 'onfact',
      notation: 'O(n!)',
      name: 'Factorial',
      definition: 'Generates all permutations',
      examples: ['Traveling salesman brute-force'],
      explanation: 'Explores every possible arrangement. Grows faster than exponential. Only feasible for tiny inputs (n < 12).'
    }
  ]

  const toggleExpanded = (id) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
          darkMode 
            ? 'bg-blue-900/30 hover:bg-blue-900/50 text-blue-300' 
            : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
        }`}
      >
        <BookOpen className="w-5 h-5" />
        <span className="font-semibold">Learn More About Time Complexities</span>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className={`mt-3 rounded-lg p-4 space-y-2 ${
          darkMode ? 'bg-gray-700' : 'bg-white'
        } shadow-lg animate-in fade-in slide-in-from-top-2 duration-200`}>
          {complexities.map((complexity) => (
            <div key={complexity.id} className={`border rounded-lg overflow-hidden ${
              darkMode ? 'border-gray-600' : 'border-gray-200'
            }`}>
              <button
                onClick={() => toggleExpanded(complexity.id)}
                className={`w-full px-4 py-3 flex items-center justify-between transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-600 text-gray-100' 
                    : 'hover:bg-gray-50 text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono font-bold text-lg ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {complexity.notation}
                  </span>
                  <span className={`font-semibold ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {complexity.name}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-4 h-4 transition-transform ${
                    expandedItem === complexity.id ? 'rotate-180' : ''
                  } ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                />
              </button>
              
              {expandedItem === complexity.id && (
                <div className={`px-4 py-3 border-t ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600' 
                    : 'bg-gray-50 border-gray-200'
                }`}>
                  <div className="space-y-2">
                    <div>
                      <p className={`text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Definition:
                      </p>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {complexity.definition}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        Examples:
                      </p>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {complexity.examples.join(', ')}
                      </p>
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        When it occurs:
                      </p>
                      <p className={`text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {complexity.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LearnMore
