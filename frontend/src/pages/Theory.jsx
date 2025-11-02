import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Code, Zap } from 'lucide-react';
import { complexityFunctions, complexityColors, complexityDescriptions } from '../data/presets';

const Theory = ({ darkMode }) => {
  const [expandedCard, setExpandedCard] = useState(null);

  const complexities = [
    {
      label: 'O(1)',
      name: 'Constant Time',
      description: complexityDescriptions['O(1)'],
      examples: ['Array access by index', 'Hash table get/set', 'Stack push/pop'],
      formalDef: 'An algorithm is O(1) if it takes the same amount of time regardless of input size.',
      realExamples: [
        'Accessing arr[5] in an array',
        'Adding an element to the end of a dynamic array (amortized)',
        'Checking if a number is even or odd'
      ],
      color: complexityColors['O(1)'],
      calculate: complexityFunctions['O(1)']
    },
    {
      label: 'O(log n)',
      name: 'Logarithmic Time',
      description: complexityDescriptions['O(log n)'],
      examples: ['Binary search', 'Balanced BST operations', 'Finding power'],
      formalDef: 'An algorithm is O(log n) if it divides the problem in half with each step.',
      realExamples: [
        'Binary search in a sorted array of 1 million items takes ~20 operations',
        'Finding an element in a balanced binary search tree',
        'Calculating pow(2, n) using divide and conquer'
      ],
      color: complexityColors['O(log n)'],
      calculate: complexityFunctions['O(log n)']
    },
    {
      label: 'O(n)',
      name: 'Linear Time',
      description: complexityDescriptions['O(n)'],
      examples: ['Linear search', 'Finding min/max', 'Array traversal'],
      formalDef: 'An algorithm is O(n) if time grows proportionally with input size.',
      realExamples: [
        'Finding the maximum element in an unsorted array',
        'Summing all elements in a list',
        'Checking if a string is a palindrome'
      ],
      color: complexityColors['O(n)'],
      calculate: complexityFunctions['O(n)']
    },
    {
      label: 'O(n log n)',
      name: 'Linearithmic Time',
      description: complexityDescriptions['O(n log n)'],
      examples: ['Merge sort', 'Heap sort', 'Quick sort (average)'],
      formalDef: 'An algorithm is O(n log n) if it performs a logarithmic operation for each of n elements.',
      realExamples: [
        'Merge sort divides the array (log n levels) and merges (n work per level)',
        'Building a heap and repeatedly extracting max',
        'Sorting 1000 items takes ~10,000 operations'
      ],
      color: complexityColors['O(n log n)'],
      calculate: complexityFunctions['O(n log n)']
    },
    {
      label: 'O(n²)',
      name: 'Quadratic Time',
      description: complexityDescriptions['O(n²)'],
      examples: ['Bubble sort', 'Selection sort', 'Insertion sort (worst)'],
      formalDef: 'An algorithm is O(n²) if it performs n operations for each of n elements.',
      realExamples: [
        'Comparing every pair of elements in an array',
        'Bubble sort repeatedly swapping adjacent elements',
        'Finding all duplicate pairs in an array'
      ],
      color: complexityColors['O(n²)'],
      calculate: complexityFunctions['O(n²)']
    },
    {
      label: 'O(n³)',
      name: 'Cubic Time',
      description: complexityDescriptions['O(n³)'],
      examples: ['Matrix multiplication (naive)', 'Floyd-Warshall algorithm'],
      formalDef: 'An algorithm is O(n³) if it uses three nested loops over the input.',
      realExamples: [
        'Multiplying two n×n matrices using the standard algorithm',
        'Finding shortest paths between all pairs of vertices',
        'Processing every triplet in a dataset'
      ],
      color: complexityColors['O(n³)'],
      calculate: complexityFunctions['O(n³)']
    },
    {
      label: 'O(2ⁿ)',
      name: 'Exponential Time',
      description: complexityDescriptions['O(2ⁿ)'],
      examples: ['Recursive Fibonacci', 'Subset generation', 'Tower of Hanoi'],
      formalDef: 'An algorithm is O(2ⁿ) if each additional input doubles the running time.',
      realExamples: [
        'Naive recursive Fibonacci: fib(n) calls fib(n-1) and fib(n-2)',
        'Generating all possible subsets of a set (2ⁿ subsets)',
        'Solving problems with binary choices at each step'
      ],
      color: complexityColors['O(2ⁿ)'],
      calculate: complexityFunctions['O(2ⁿ)']
    },
    {
      label: 'O(n!)',
      name: 'Factorial Time',
      description: complexityDescriptions['O(n!)'],
      examples: ['Traveling salesman (brute force)', 'Generating all permutations'],
      formalDef: 'An algorithm is O(n!) if it generates all permutations of the input.',
      realExamples: [
        'Trying all possible routes for traveling salesman',
        'Generating all permutations: 10! = 3,628,800 arrangements',
        'Brute force solving N-Queens by trying all board configurations'
      ],
      color: complexityColors['O(n!)'],
      calculate: complexityFunctions['O(n!)']
    }
  ];

  // Generate sparkline data for the complexity graph
  const generateSparkline = (calculate) => {
    const points = [];
    const steps = 10;
    
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * 100;
      // Normalize the y-value to fit within 0-30 range
      const y = 35 - Math.min(30, Math.log2(calculate(i + 1) + 1) * 2);
      points.push(`${x},${y}`);
    }
    
    return `M${points.join(' L')}`;
  };

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
      darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Understanding Time Complexity
        </h1>
        
        {/* Big O Explanation Section */}
        <div className={`mb-12 p-6 rounded-xl ${
          darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-lg`}>
          <div className="flex items-center mb-4">
            <BookOpen size={24} className="mr-2 text-indigo-500" />
            <h2 className="text-2xl font-bold">What is Big O Notation?</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-lg">
              Big O notation is a mathematical notation that describes the limiting behavior of a function 
              when the argument tends towards a particular value or infinity. In computer science, it's used 
              to classify algorithms according to how their run time or space requirements grow as the input size grows.
            </p>
            
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-700/50' : 'bg-indigo-50'
            }`}>
              <h3 className="font-bold mb-2 flex items-center">
                <Code size={18} className="mr-2" />
                Formal Definition
              </h3>
              <p className="text-sm">
                A function f(n) is O(g(n)) if there exist positive constants c and n₀ such that 
                0 ≤ f(n) ≤ c·g(n) for all n ≥ n₀.
              </p>
              <p className="text-sm mt-2">
                This means that g(n) is an <strong>upper bound</strong> on f(n). The function f(n) 
                will not grow faster than g(n) multiplied by some constant, for sufficiently large n.
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-700/50' : 'bg-indigo-50'
            }`}>
              <h3 className="font-bold mb-2 flex items-center">
                <Zap size={18} className="mr-2" />
                Why Upper Bound?
              </h3>
              <p className="text-sm">
                Big O describes the <strong>worst-case scenario</strong> for an algorithm's performance. 
                It tells us the maximum amount of time or space an algorithm will need, which is crucial 
                for understanding how the algorithm will behave with large inputs.
              </p>
              <p className="text-sm mt-2">
                For example, if an algorithm is O(n²), we know that even in the worst case, the time 
                won't grow faster than the square of the input size (multiplied by some constant).
              </p>
            </div>
            
            <div className={`p-4 rounded-lg ${
              darkMode ? 'bg-gray-700/50' : 'bg-green-50 dark:bg-gray-700/50'
            }`}>
              <h3 className="font-bold mb-2">Intuitive Example</h3>
              <p className="text-sm">
                Imagine you need to find a specific book in a library:
              </p>
              <ul className="text-sm mt-2 space-y-1 list-disc list-inside">
                <li><strong>O(1)</strong>: You know exactly where it is - constant time</li>
                <li><strong>O(log n)</strong>: You use the card catalog system - logarithmic time</li>
                <li><strong>O(n)</strong>: You check each shelf one by one - linear time</li>
                <li><strong>O(n²)</strong>: You compare every book with every other book - quadratic time</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Complexity Cards Grid - 2x4 layout */}
        <h2 className="text-2xl font-bold mb-6 text-center">
          Eight Standard Time Complexities
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[800px] overflow-y-auto pr-2">
          {complexities.map((complexity, index) => (
            <div
              key={complexity.label}
              className={`rounded-xl p-6 border transition-all duration-300 hover:shadow-xl ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Header with color indicator */}
              <div className="flex items-center space-x-3 mb-4">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: complexity.color }}
                />
                <h3 className={`text-2xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {complexity.label}
                </h3>
              </div>

              {/* Name */}
              <p className={`text-lg font-semibold mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {complexity.name}
              </p>

              {/* Description */}
              <p className={`text-sm mb-4 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {complexity.description}
              </p>

              {/* Mini sparkline */}
              <div className="mb-4">
                <svg className="w-full h-16" viewBox="0 0 100 40">
                  <path
                    d={generateSparkline(complexity.calculate)}
                    fill="none"
                    stroke={complexity.color}
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                </svg>
              </div>

              {/* Example algorithms */}
              <div className="mb-4">
                <p className={`text-xs font-semibold mb-2 uppercase tracking-wide ${
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Examples
                </p>
                <div className="flex flex-wrap gap-1">
                  {complexity.examples.slice(0, 3).map((example, i) => (
                    <span
                      key={i}
                      className={`text-xs px-2 py-1 rounded ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-300' 
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expandable "Learn more" */}
              <button
                onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                className={`flex items-center space-x-2 text-sm font-medium ${
                  darkMode 
                    ? 'text-indigo-400 hover:text-indigo-300' 
                    : 'text-indigo-600 hover:text-indigo-700'
                } transition-colors`}
              >
                <span>Learn more</span>
                {expandedCard === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Expanded content */}
              {expandedCard === index && (
                <div className={`mt-4 pt-4 border-t ${
                  darkMode ? 'border-gray-700' : 'border-gray-200'
                } space-y-3 animate-fade-in`}>
                  <div>
                    <p className={`text-xs font-semibold mb-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Formal Definition:
                    </p>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {complexity.formalDef}
                    </p>
                  </div>
                  <div>
                    <p className={`text-xs font-semibold mb-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Real-world Examples:
                    </p>
                    <ul className={`text-sm space-y-1 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {complexity.realExamples.map((example, i) => (
                        <li key={i} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{example}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Theory;
