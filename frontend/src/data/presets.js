/**
 * Preset algorithms with their complexity functions
 * Each preset includes metadata and a calculate function that returns operations for given n
 */

// Helper to calculate factorial with overflow protection
const factorial = (n) => {
  if (n > 20) return Infinity; // Prevent overflow
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

// Helper to calculate power of 2 with overflow protection
const power2 = (n) => {
  if (n > 30) return Infinity; // Prevent overflow
  return Math.pow(2, n);
};

export const complexityFunctions = {
  'O(1)': (n) => 1,
  'O(log n)': (n) => n > 0 ? Math.log2(n) : 0,
  'O(n)': (n) => n,
  'O(n log n)': (n) => n > 0 ? n * Math.log2(n) : 0,
  'O(n²)': (n) => n * n,
  'O(n³)': (n) => n * n * n,
  'O(2ⁿ)': (n) => power2(n),
  'O(n!)': (n) => factorial(n)
};

export const complexityColors = {
  'O(1)': '#6B7280',      // gray
  'O(log n)': '#3B82F6',  // blue
  'O(n)': '#10B981',      // emerald
  'O(n log n)': '#F59E0B', // amber
  'O(n²)': '#EF4444',     // red
  'O(n³)': '#DC2626',     // dark red
  'O(2ⁿ)': '#8B5CF6',     // violet
  'O(n!)': '#DB2777'      // pink
};

export const complexityDescriptions = {
  'O(1)': 'Constant time - operation takes the same time regardless of input size',
  'O(log n)': 'Logarithmic time - time grows slowly as input doubles',
  'O(n)': 'Linear time - time grows proportionally with input size',
  'O(n log n)': 'Linearithmic time - efficient for many sorting algorithms',
  'O(n²)': 'Quadratic time - time grows with square of input size',
  'O(n³)': 'Cubic time - time grows with cube of input size',
  'O(2ⁿ)': 'Exponential time - time doubles with each additional input',
  'O(n!)': 'Factorial time - extremely slow growth, impractical for large n'
};

export const presets = [
  {
    id: 'constant-time',
    name: 'Constant Time Operation',
    complexity: 'O(1)',
    description: 'Array access, hash table lookup',
    color: complexityColors['O(1)'],
    examples: ['Array index access', 'Hash table get/set', 'Stack push/pop'],
    calculate: complexityFunctions['O(1)']
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    complexity: 'O(log n)',
    description: 'Efficient searching in sorted arrays',
    color: complexityColors['O(log n)'],
    examples: ['Binary search', 'Balanced BST operations', 'Finding power'],
    calculate: complexityFunctions['O(log n)']
  },
  {
    id: 'linear-search',
    name: 'Linear Search',
    complexity: 'O(n)',
    description: 'Simple search through elements',
    color: complexityColors['O(n)'],
    examples: ['Linear search', 'Finding min/max', 'Array traversal'],
    calculate: complexityFunctions['O(n)']
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    complexity: 'O(n log n)',
    description: 'Efficient divide-and-conquer sorting',
    color: complexityColors['O(n log n)'],
    examples: ['Merge sort', 'Quick sort (avg)', 'Heap sort'],
    calculate: complexityFunctions['O(n log n)']
  },
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    complexity: 'O(n²)',
    description: 'Simple but inefficient sorting',
    color: complexityColors['O(n²)'],
    examples: ['Bubble sort', 'Selection sort', 'Insertion sort (worst)'],
    calculate: complexityFunctions['O(n²)']
  },
  {
    id: 'matrix-multiplication',
    name: 'Matrix Multiplication',
    complexity: 'O(n³)',
    description: 'Naive algorithm with three nested loops',
    color: complexityColors['O(n³)'],
    examples: ['Matrix multiplication', 'Floyd-Warshall', 'Three nested loops'],
    calculate: complexityFunctions['O(n³)']
  },
  {
    id: 'fibonacci-recursive',
    name: 'Fibonacci (Recursive)',
    complexity: 'O(2ⁿ)',
    description: 'Exponential time recursive calculation',
    color: complexityColors['O(2ⁿ)'],
    examples: ['Naive Fibonacci', 'Subset generation', 'Tower of Hanoi'],
    calculate: complexityFunctions['O(2ⁿ)']
  },
  {
    id: 'traveling-salesman',
    name: 'Traveling Salesman',
    complexity: 'O(n!)',
    description: 'Checking all possible routes',
    color: complexityColors['O(n!)'],
    examples: ['TSP brute force', 'Permutation generation', 'N-Queens'],
    calculate: complexityFunctions['O(n!)']
  },
  {
    id: 'quick-sort-avg',
    name: 'Quick Sort (Average)',
    complexity: 'O(n log n)',
    description: 'Fast in-place sorting algorithm',
    color: complexityColors['O(n log n)'],
    examples: ['Quick sort average case', 'Randomized algorithms'],
    calculate: complexityFunctions['O(n log n)']
  },
  {
    id: 'heap-sort',
    name: 'Heap Sort',
    complexity: 'O(n log n)',
    description: 'Comparison-based sorting using heap',
    color: complexityColors['O(n log n)'],
    examples: ['Heap sort', 'Priority queue operations'],
    calculate: complexityFunctions['O(n log n)']
  }
];

export default presets;
