import { useState } from 'react'
import { Check, Info, Code, Play, Loader, X, AlertTriangle, ChevronDown, ChevronUp, Zap } from 'lucide-react'
import axios from 'axios'

function Sidebar({ 
  complexities, 
  selectedComplexities, 
  onToggleComplexity,
  customFunctions,
  onAddCustomFunction,
  onRemoveCustomFunction,
  darkMode
}) {
  const [codeInput, setCodeInput] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('python')
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [error, setError] = useState(null)
  const [validationError, setValidationError] = useState(null)
  const [expandedInfo, setExpandedInfo] = useState(null)
  const [expandedPresets, setExpandedPresets] = useState(false)

  // Preset algorithms organized by complexity
  const presetAlgorithms = {
    'O(1)': [
      { name: 'Array Access', code: 'def get_first(arr):\n    return arr[0]', language: 'python' },
      { name: 'Hash Lookup', code: 'value = hash_map[key]', language: 'python' },
      { name: 'Stack Push', code: 'stack.push(item)', language: 'python' },
      { name: 'Constant Math', code: 'result = x * 2 + 5', language: 'python' }
    ],
    'O(log n)': [
      { name: 'Binary Search', code: 'def binary_search(arr, target):\n    left, right = 0, len(arr)-1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1', language: 'python' },
      { name: 'Power of 2 Loop', code: 'for i in range(1, n+1):\n    i *= 2', language: 'python' },
      { name: 'Division Loop', code: 'while n > 1:\n    n //= 2', language: 'python' },
      { name: 'BST Search', code: 'def search_bst(node, target):\n    if not node:\n        return None\n    if node.val == target:\n        return node\n    elif target < node.val:\n        return search_bst(node.left, target)\n    else:\n        return search_bst(node.right, target)', language: 'python' }
    ],
    'O(n)': [
      { name: 'Linear Search', code: 'def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i\n    return -1', language: 'python' },
      { name: 'Array Sum', code: 'def sum_array(arr):\n    total = 0\n    for num in arr:\n        total += num\n    return total', language: 'python' },
      { name: 'Find Max', code: 'def find_max(arr):\n    max_val = arr[0]\n    for num in arr:\n        if num > max_val:\n            max_val = num\n    return max_val', language: 'python' },
      { name: 'Linked List Traversal', code: 'def traverse_linked_list(head):\n    current = head\n    while current:\n        print(current.val)\n        current = current.next', language: 'python' }
    ],
    'O(n log n)': [
      { name: 'Merge Sort', code: 'def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)', language: 'python' },
      { name: 'Heap Sort', code: 'def heap_sort(arr):\n    build_max_heap(arr)\n    for i in range(len(arr)-1, 0, -1):\n        arr[0], arr[i] = arr[i], arr[0]\n        max_heapify(arr, 0, i)', language: 'python' },
      { name: 'Quick Sort Average', code: 'def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr)//2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)', language: 'python' },
      { name: 'Tree Sort', code: 'def tree_sort(arr):\n    tree = BST()\n    for item in arr:\n        tree.insert(item)\n    return tree.inorder_traversal()', language: 'python' }
    ],
    'O(n²)': [
      { name: 'Bubble Sort', code: 'def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(n-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]', language: 'python' },
      { name: 'Selection Sort', code: 'def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i+1, len(arr)):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]', language: 'python' },
      { name: 'Insertion Sort', code: 'def insertion_sort(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key', language: 'python' },
      { name: 'Matrix Multiplication', code: 'def matrix_multiply(A, B):\n    n = len(A)\n    C = [[0]*n for _ in range(n)]\n    for i in range(n):\n        for j in range(n):\n            for k in range(n):\n                C[i][j] += A[i][k] * B[k][j]', language: 'python' }
    ],
    'O(n³)': [
      { name: 'Floyd-Warshall', code: 'def floyd_warshall(graph):\n    n = len(graph)\n    for k in range(n):\n        for i in range(n):\n            for j in range(n):\n                graph[i][j] = min(graph[i][j], graph[i][k] + graph[k][j])', language: 'python' },
      { name: '3D Matrix Multiply', code: 'def multiply_3d(A, B, C):\n    n = len(A)\n    result = [[[0]*n for _ in range(n)] for _ in range(n)]\n    for i in range(n):\n        for j in range(n):\n            for k in range(n):\n                result[i][j][k] = A[i][j] * B[j][k] * C[k][i]', language: 'python' },
      { name: 'All Triplets', code: 'def find_triplets(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(n):\n            for k in range(n):\n                print(arr[i], arr[j], arr[k])', language: 'python' }
    ],
    'O(2ⁿ)': [
      { name: 'Fibonacci Recursive', code: 'def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)', language: 'python' },
      { name: 'Power Set', code: 'def power_set(arr):\n    if len(arr) == 0:\n        return [[]]\n    rest = power_set(arr[1:])\n    return rest + [[arr[0]] + subset for subset in rest]', language: 'python' },
      { name: 'All Subsets', code: 'def generate_subsets(arr):\n    subsets = []\n    n = len(arr)\n    for mask in range(1 << n):\n        subset = []\n        for i in range(n):\n            if mask & (1 << i):\n                subset.append(arr[i])\n        subsets.append(subset)', language: 'python' }
    ],
    'O(n!)': [
      { name: 'Permutations', code: 'def permutations(arr):\n    if len(arr) <= 1:\n        return [arr]\n    result = []\n    for i in range(len(arr)):\n        rest = arr[:i] + arr[i+1:]\n        for perm in permutations(rest):\n            result.append([arr[i]] + perm)', language: 'python' },
      { name: 'TSP Brute Force', code: 'def traveling_salesman(cities):\n    min_distance = float(\'inf\')\n    for route in permutations(cities):\n        distance = calculate_total_distance(route)\n        min_distance = min(min_distance, distance)', language: 'python' }
    ]
  }

  // Load preset algorithm
  const loadPreset = (complexity, algorithm) => {
    setCodeInput(algorithm.code)
    setSelectedLanguage(algorithm.language)
    setExpandedPresets(false)
    // Auto-analyze after loading
    setTimeout(() => {
      analyzeCode()
    }, 100)
  }

  // Validate Python syntax (basic check)
  const validatePython = (code) => {
    // Check for basic Python structure
    const hasDefOrClass = /\b(def|class)\s+\w+/.test(code)
    const hasBasicSyntax = /[\w\s=+\-*/()\[\]{}:,.]/.test(code)
    const hasRandomText = /^[A-Za-z\s]+$/.test(code.trim()) && !hasDefOrClass
    
    if (hasRandomText) {
      return { valid: false, type: 'random' }
    }
    
    if (!hasBasicSyntax) {
      return { valid: false, type: 'invalid' }
    }
    
    return { valid: true }
  }

  // Enhanced C++ syntax validation
  const validateCpp = (code) => {
    const hasRandomText = /^[A-Za-z\s]+$/.test(code.trim())
    
    if (hasRandomText) {
      return { valid: false, type: 'random' }
    }
    
    // Check for main() function
    const hasMain = /int\s+main\s*\(/.test(code) || /void\s+main\s*\(/.test(code)
    
    // Check for balanced braces
    let braceCount = 0
    let hasOpenBrace = false
    for (let char of code) {
      if (char === '{') {
        braceCount++
        hasOpenBrace = true
      } else if (char === '}') {
        braceCount--
      }
    }
    const balancedBraces = braceCount === 0 && hasOpenBrace
    
    // Check for semicolons (basic indicator of C++ statements)
    const hasSemicolons = code.includes(';')
    
    // Check for basic C++ structure
    const hasInclude = /#include/.test(code)
    const hasCppKeywords = /\b(int|void|for|while|if|return|class|struct)\b/.test(code)
    
    // Validation: Must have main(), balanced braces, and some C++ syntax
    if (!hasMain || !balancedBraces || (!hasSemicolons && !hasInclude)) {
      return { valid: false, type: 'invalid_cpp' }
    }
    
    if (!hasCppKeywords && !hasInclude) {
      return { valid: false, type: 'invalid_cpp' }
    }
    
    return { valid: true }
  }

  const validateCode = (code, language) => {
    if (!code.trim()) {
      return { valid: false, type: 'empty' }
    }

    if (language === 'python') {
      return validatePython(code)
    } else if (language === 'cpp') {
      return validateCpp(code)
    }

    return { valid: true }
  }

  const handleAnalyzeCode = async () => {
    if (!codeInput.trim()) {
      setValidationError('Please enter some code to analyze')
      return
    }

    // Validate code before analyzing
    const validation = validateCode(codeInput, selectedLanguage)
    
    if (!validation.valid) {
      if (validation.type === 'random') {
        setValidationError('⚠️ No valid code detected. Please enter valid Python or C++ code.')
      } else if (validation.type === 'invalid_cpp') {
        setValidationError('⚠️ Invalid code detected. Please enter a valid C++ snippet for analysis.')
      } else {
        setValidationError(`❌ Invalid code: Please enter valid ${selectedLanguage === 'python' ? 'Python' : 'C++'} code.`)
      }
      return
    }

    setAnalyzing(true)
    setError(null)
    setValidationError(null)
    setAnalysisResult(null)

    try {
      // Use static analysis endpoint only
      const response = await axios.post('http://localhost:3001/api/analyze', {
        code: codeInput,
        language: selectedLanguage
      })

      // Check if backend returned an error
      if (response.data.error) {
        setError(response.data.error)
        setAnalyzing(false)
        return
      }

      setAnalysisResult(response.data)
      
      // Add detected complexity to graph
      const result = response.data
      
      if (result.detectedComplexity && 
          result.growthPoints && 
          result.growthPoints.length > 0 &&
          result.detectedComplexity.complexity !== 'Unable to determine' &&
          result.detectedComplexity.complexity !== 'Inconclusive') {
        const detectedFunc = {
          id: `detected-${Date.now()}`,
          name: result.detectedComplexity.formula,
          label: `Detected: ${result.detectedComplexity.complexity}`,
          color: '#06b6d4', // Cyan
          description: result.detectedComplexity.explanation || 'Detected from your code',
          examples: ['Your submitted code'],
          isCustom: true,
          growthPoints: result.growthPoints,
          useGrowthPoints: true
        }
        onAddCustomFunction(detectedFunc)
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze code. Make sure backend is running.')
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Complexity Selection */}
      <div className={`rounded-xl shadow-lg p-4 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-base font-bold mb-3 flex items-center gap-2 ${
          darkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>
          <Check className="w-4 h-4 text-primary" />
          Select Complexities
        </h3>
        <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
          {complexities.map(complexity => (
            <div key={complexity.id} className="group">
              <label className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
              }`}>
                <input
                  type="checkbox"
                  checked={selectedComplexities.includes(complexity.id)}
                  onChange={() => onToggleComplexity(complexity.id)}
                  className="w-3.5 h-3.5 text-primary rounded focus:ring-2 focus:ring-primary"
                />
                <div className="flex-1 flex items-center justify-between">
                  <span className={`font-medium text-sm ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>{complexity.label}</span>
                  <div className="flex items-center gap-1.5">
                    <div 
                      className="w-5 h-5 rounded-full border-2"
                      style={{ 
                        borderColor: complexity.color,
                        backgroundColor: complexity.color + '20'
                      }}
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setExpandedInfo(expandedInfo === complexity.id ? null : complexity.id)
                      }}
                      className={`transition-colors ${
                        darkMode ? 'text-gray-500 hover:text-primary' : 'text-gray-400 hover:text-primary'
                      }`}
                    >
                      <Info className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </label>
              {expandedInfo === complexity.id && (
                <div className={`ml-7 mt-2 p-3 rounded-lg text-sm ${
                  darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
                }`}>
                  <p className={`mb-2 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>{complexity.description}</p>
                  <div className="mt-2">
                    <p className={`font-semibold mb-1 ${
                      darkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>Examples:</p>
                    <ul className={`list-disc list-inside space-y-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {complexity.examples.map((example, idx) => (
                        <li key={idx}>{example}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Custom/Detected Complexities */}
      {customFunctions.length > 0 && (
        <div className={`rounded-xl shadow-lg p-5 ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <h3 className={`text-lg font-bold mb-4 ${
            darkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>
            Detected Complexities
          </h3>
          <div className="space-y-2">
            {customFunctions.map(func => (
              <div key={func.id} className={`flex items-center justify-between p-3 rounded-lg ${
                darkMode ? 'bg-cyan-900/30' : 'bg-cyan-50'
              }`}>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: func.color }}
                  />
                  <span className={`font-medium text-sm ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>{func.label}</span>
                </div>
                <button
                  onClick={() => onRemoveCustomFunction(func.id)}
                  className={`transition-colors ${
                    darkMode ? 'text-gray-500 hover:text-red-400' : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Analysis */}
      <div className={`rounded-xl shadow-lg p-5 ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <h3 className={`text-lg font-bold mb-2 flex items-center gap-2 ${
          darkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>
          <Code className="w-5 h-5 text-primary" />
          Static Complexity Analysis
        </h3>
        <p className={`text-xs mb-4 ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          AST + heuristic-based detection (no code execution)
        </p>
        
        <div className="space-y-3">
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Programming Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value)
                setValidationError(null)
                setError(null)
              }}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-200' 
                  : 'border-gray-300 bg-white text-gray-900'
              }`}
            >
              <option value="python">Python</option>
              <option value="cpp">C++</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Paste Your Code
            </label>
            <textarea
              value={codeInput}
              onChange={(e) => {
                setCodeInput(e.target.value)
                setValidationError(null)
                setError(null)
              }}
              placeholder={selectedLanguage === 'python' 
                ? "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]"
                : "#include <iostream>\nusing namespace std;\n\nint main() {\n    // Your code here\n    return 0;\n}"
              }
              className={`w-full h-32 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm resize-none ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-gray-200 placeholder-gray-500' 
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          <button
            onClick={handleAnalyzeCode}
            disabled={analyzing}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {analyzing ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Analyze Complexity
              </>
            )}
          </button>

          {validationError && (
            <div className={`p-3 border rounded-lg flex items-start gap-2 ${
              darkMode 
                ? 'bg-yellow-900/20 border-yellow-600 text-yellow-300' 
                : 'bg-yellow-50 border-yellow-200 text-yellow-700'
            }`}>
              <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{validationError}</p>
            </div>
          )}

          {error && (
            <div className={`p-3 border rounded-lg ${
              darkMode 
                ? 'bg-blue-900/20 border-blue-600 text-blue-300' 
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {analysisResult && (
            <div className={`p-4 border rounded-lg ${
              darkMode 
                ? 'bg-green-900/20 border-green-600' 
                : 'bg-green-50 border-green-200'
            }`}>
              <div>
                <p className={`text-sm font-semibold ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Detected Complexity:</p>
                <p className={`text-lg font-bold ${
                  darkMode ? 'text-green-400' : 'text-green-700'
                }`}>
                  {analysisResult.detectedComplexity.complexity}
                </p>
              </div>
              <div>
                <p className={`text-sm font-semibold mt-3 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>Confidence:</p>
                <div className="flex items-center gap-2">
                  <div className={`flex-1 rounded-full h-2 ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-200'
                  }`}>
                    <div 
                      className={`h-2 rounded-full transition-all ${
                        darkMode ? 'bg-green-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${analysisResult.detectedComplexity.confidence * 100}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {(analysisResult.detectedComplexity.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              {analysisResult.detectedComplexity.explanation && (
                <div>
                  <p className={`text-sm font-semibold mt-3 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>Analysis:</p>
                  <p className={`text-xs mt-1 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {analysisResult.detectedComplexity.explanation}
                  </p>
                </div>
              )}
              {analysisResult.note && (
                <p className={`text-xs mt-3 ${
                  darkMode ? 'text-yellow-400' : 'text-yellow-600'
                }`}>
                  💡 {analysisResult.note}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Try These Presets */}
      <div className={`rounded-xl shadow-lg p-5 ${
        darkMode 
          ? 'bg-gradient-to-br from-green-900/30 to-blue-900/30' 
          : 'bg-gradient-to-br from-green-50 to-blue-50'
      }`}>
        <button
          onClick={() => setExpandedPresets(!expandedPresets)}
          className={`w-full text-left flex items-center justify-between mb-3 transition-colors ${
            darkMode ? 'hover:text-green-400' : 'hover:text-green-600'
          }`}
        >
          <h3 className={`text-sm font-bold flex items-center gap-2 ${
            darkMode ? 'text-gray-100' : 'text-gray-800'
          }`}>
            <Zap className="w-4 h-4 text-green-500" />
            Try These Presets
          </h3>
          {expandedPresets ? (
            <ChevronUp className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          )}
        </button>
        
        {expandedPresets && (
          <div className="space-y-3 animate-fadeIn">
            {Object.entries(presetAlgorithms).map(([complexity, algorithms]) => (
              <div key={complexity} className={`border rounded-lg overflow-hidden ${
                darkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <div className={`px-3 py-2 font-mono text-xs font-bold ${
                  darkMode ? 'bg-gray-800 text-blue-400' : 'bg-gray-100 text-blue-600'
                }`}>
                  {complexity}
                </div>
                <div className="p-2 space-y-1">
                  {algorithms.map((algo, index) => (
                    <button
                      key={index}
                      onClick={() => loadPreset(complexity, algo)}
                      className={`w-full text-left px-2 py-1 rounded text-xs transition-colors ${
                        darkMode 
                          ? 'hover:bg-gray-700 hover:text-green-400 text-gray-300' 
                          : 'hover:bg-gray-100 hover:text-green-600 text-gray-700'
                      }`}
                    >
                      {algo.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Information */}
      <div className={`rounded-xl shadow-lg p-5 ${
        darkMode 
          ? 'bg-gradient-to-br from-blue-900/30 to-purple-900/30' 
          : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}>
        <h3 className={`text-sm font-bold mb-3 flex items-center gap-2 ${
          darkMode ? 'text-gray-100' : 'text-gray-800'
        }`}>
          <Info className="w-4 h-4 text-primary" />
          How to Use
        </h3>
        <ul className={`text-xs space-y-2 ${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          <li>✓ Select complexities to compare them visually</li>
          <li>✓ Use the slider to see how functions scale</li>
          <li>✓ Paste your code to detect its complexity automatically</li>
          <li>✓ Try preset algorithms for quick examples</li>
          <li>✓ Click the info icon to learn more about each complexity</li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar
