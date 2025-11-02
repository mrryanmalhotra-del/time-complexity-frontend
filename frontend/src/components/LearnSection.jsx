import { useState } from 'react';
import { motion } from 'framer-motion';
import ComplexityGraph from './ComplexityGraph';

const complexityData = [
  {
    id: 'constant',
    name: 'O(1)',
    description: 'Constant time - execution time remains constant regardless of input size.',
    example: 'Array lookup, Hash table access',
    color: '#10B981', // emerald-500
  },
  {
    id: 'logarithmic',
    name: 'O(log n)',
    description: 'Logarithmic time - grows slowly as input size increases.',
    example: 'Binary search, Balanced BST operations',
    color: '#3B82F6', // blue-500
  },
  {
    id: 'linear',
    name: 'O(n)',
    description: 'Linear time - grows directly proportional to input size.',
    example: 'Linear search, Iterating through an array',
    color: '#6366F1', // indigo-500
  },
  {
    id: 'linearithmic',
    name: 'O(n log n)',
    description: 'Linearithmic time - grows slightly faster than linear.',
    example: 'Merge sort, Heap sort, Quick sort (average case)',
    color: '#8B5CF6', // violet-500
  },
  {
    id: 'quadratic',
    name: 'O(n²)',
    description: 'Quadratic time - grows with the square of input size.',
    example: 'Bubble sort, Selection sort, Nested loops',
    color: '#EC4899', // pink-500
  },
  {
    id: 'exponential',
    name: 'O(2ⁿ)',
    description: 'Exponential time - grows exponentially with input size.',
    example: 'Recursive Fibonacci, Solving Tower of Hanoi',
    color: '#F59E0B', // amber-500
  },
  {
    id: 'factorial',
    name: 'O(n!)',
    description: 'Factorial time - grows factorially with input size.',
    example: 'Traveling Salesman (brute force), Permutations',
    color: '#EF4444', // red-500
  },
];

const calculateComplexity = (algoId, n) => {
  switch (algoId) {
    case 'constant':
      return 1;
    case 'logarithmic':
      return Math.log2(n) || 0;
    case 'linear':
      return n;
    case 'linearithmic':
      return n * Math.log2(n) || 0;
    case 'quadratic':
      return n * n;
    case 'exponential':
      return Math.pow(2, n);
    case 'factorial':
      let result = 1;
      for (let i = 2; i <= n; i++) result *= i;
      return result > 1e6 ? 1e6 : result; // Cap at 1M for visualization
    default:
      return 0;
  }
};

const LearnSection = ({ darkMode }) => {
  const [selectedComplexities, setSelectedComplexities] = useState([]);
  const [showPretests, setShowPretests] = useState(false);

  const toggleComplexity = (id) => {
    setSelectedComplexities(prev => 
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handlePretests = () => {
    if (!showPretests) {
      setSelectedComplexities(['constant', 'linear', 'linearithmic', 'quadratic']);
    } else {
      setSelectedComplexities([]);
    }
    setShowPretests(!showPretests);
  };

  const presetAlgorithms = complexityData.map(algo => ({
    ...algo,
    calculate: (n) => calculateComplexity(algo.id, n)
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Learn About Time Complexities
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Explore how algorithm performance changes as input grows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {complexityData.map((algo) => (
          <motion.div
            key={algo.id}
            className={`p-6 rounded-xl shadow-md cursor-pointer transition-all duration-300 ${
              selectedComplexities.includes(algo.id)
                ? 'ring-2 ring-offset-2'
                : 'hover:shadow-lg'
            } ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            style={{
              borderLeft: `4px solid ${algo.color}`,
              transform: selectedComplexities.includes(algo.id) ? 'scale(1.02)' : 'scale(1)',
            }}
            whileHover={{ scale: 1.03, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleComplexity(algo.id)}
          >
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {algo.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              {algo.description}
            </p>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium">Example:</span> {algo.example}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mb-8 text-center">
        <motion.button
          className={`px-6 py-3 rounded-full font-medium ${
            showPretests
              ? 'bg-amber-500 hover:bg-amber-600 text-white'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          } transition-colors duration-300`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePretests}
        >
          {showPretests ? 'Clear Pretests' : 'Try Pretests'}
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: selectedComplexities.length > 0 ? 1 : 0.7,
          y: 0,
        }}
        transition={{ duration: 0.5 }}
        className={`rounded-xl overflow-hidden shadow-lg transition-all duration-500 ${
          darkMode ? 'bg-gray-800/50' : 'bg-white/90'
        }`}
        style={{
          height: selectedComplexities.length > 0 ? '500px' : '200px',
        }}
      >
        {selectedComplexities.length > 0 ? (
          <ComplexityGraph
            nValue={100}
            selectedComplexities={selectedComplexities}
            presetAlgorithms={presetAlgorithms}
            darkMode={darkMode}
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400">
            <p>Select complexities to visualize their performance</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default LearnSection;
