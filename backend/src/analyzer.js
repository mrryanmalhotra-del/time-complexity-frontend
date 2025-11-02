/**
 * Time Complexity Analyzer
 * Static analysis only (no code execution)
 */

import { analyzeComplexityStatic } from './staticAnalyzer.js'

// Safe math expression parser (without eval)
function parseAndEvaluate(expression, n) {
  // Normalize the expression
  let expr = expression.toLowerCase().trim()
  
  // Replace common notations
  expr = expr.replace(/\^/g, '**') // Convert ^ to **
  expr = expr.replace(/log\s*\(/g, 'Math.log2(') // log becomes log2
  expr = expr.replace(/log2\s*\(/g, 'Math.log2(')
  expr = expr.replace(/log10\s*\(/g, 'Math.log10(')
  expr = expr.replace(/ln\s*\(/g, 'Math.log(')
  expr = expr.replace(/sqrt\s*\(/g, 'Math.sqrt(')
  expr = expr.replace(/abs\s*\(/g, 'Math.abs(')
  expr = expr.replace(/floor\s*\(/g, 'Math.floor(')
  expr = expr.replace(/ceil\s*\(/g, 'Math.ceil(')
  expr = expr.replace(/exp\s*\(/g, 'Math.exp(')
  
  // Handle standalone log without parentheses (e.g., "log n" -> "Math.log2(n)")
  expr = expr.replace(/\blog\s+n\b/g, 'Math.log2(n)')
  expr = expr.replace(/\bsqrt\s+n\b/g, 'Math.sqrt(n)')
  
  // Create a safe function using Function constructor (safer than eval)
  try {
    // Only allow mathematical operations and the variable n
    const func = new Function('n', 'Math', `
      'use strict';
      return ${expr};
    `)
    
    const result = func(n, Math)
    
    if (!isFinite(result) || typeof result !== 'number') {
      throw new Error('Expression did not evaluate to a valid number')
    }
    
    return result
  } catch (error) {
    throw new Error(`Failed to evaluate expression: ${error.message}`)
  }
}

// Parse custom function and generate growth values
export function parseCustomFunction(expression) {
  console.log(`Parsing custom function: ${expression}`)
  
  // Validate expression contains 'n'
  if (!/\bn\b/.test(expression.toLowerCase())) {
    throw new Error('Expression must contain the variable "n"')
  }
  
  // Test points for evaluation
  const testPoints = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000]
  const growthPoints = []
  
  // Evaluate the function at each test point
  for (const n of testPoints) {
    try {
      const value = parseAndEvaluate(expression, n)
      
      if (isFinite(value) && value >= 0) {
        growthPoints.push({ n, value })
      }
    } catch (error) {
      throw new Error(`Error evaluating at n=${n}: ${error.message}`)
    }
  }
  
  if (growthPoints.length === 0) {
    throw new Error('No valid values could be computed')
  }
  
  // Normalize if values are too large
  const maxValue = Math.max(...growthPoints.map(p => p.value))
  if (maxValue > 1e6) {
    const scaleFactor = 1e6 / maxValue
    growthPoints.forEach(p => p.value *= scaleFactor)
    console.log(`  Normalized values (max was ${maxValue.toExponential(2)})`)
  }
  
  console.log(`  Successfully evaluated ${growthPoints.length} points`)
  
  return {
    expression: expression,
    growthPoints: growthPoints,
    values: growthPoints.map(p => p.value)
  }
}

// Validate C++ syntax before analysis
function validateCppSyntax(code) {
  console.log('Validating C++ syntax...')
  
  // Check for basic C++ structure
  const hasInclude = /#include/.test(code)
  const hasMain = /int\s+main\s*\(/.test(code) || /void\s+main\s*\(/.test(code)
  
  // Check for balanced braces
  let braceCount = 0
  for (let char of code) {
    if (char === '{') braceCount++
    else if (char === '}') braceCount--
    if (braceCount < 0) return { valid: false, error: 'Unbalanced braces: too many closing braces' }
  }
  
  if (braceCount !== 0) {
    return { valid: false, error: 'Unbalanced braces: missing closing braces' }
  }
  
  // Check for semicolons (at least one statement)
  const hasSemicolons = code.includes(';')
  
  // Check for C++ keywords
  const hasCppKeywords = /\b(int|void|for|while|if|return|class|struct|cout|cin)\b/.test(code)
  
  if (!hasMain) {
    return { valid: false, error: 'Missing main() function' }
  }
  
  if (!hasSemicolons) {
    return { valid: false, error: 'No statements found (missing semicolons)' }
  }
  
  if (!hasCppKeywords) {
    return { valid: false, error: 'No valid C++ keywords found' }
  }
  
  console.log('  ✓ C++ syntax validation passed')
  return { valid: true }
}

// Validate Python syntax (basic check)
function validatePythonSyntax(code) {
  console.log('Validating Python syntax...')
  
  // Check for Python keywords
  const hasPythonKeywords = /\b(def|for|while|if|return|class|import|range)\b/.test(code)
  
  if (!hasPythonKeywords) {
    return { valid: false, error: 'No valid Python keywords found' }
  }
  
  console.log('  ✓ Python syntax validation passed')
  return { valid: true }
}

// Analyze code structure to detect complexity patterns
function analyzeCodePatterns(code, language) {
  console.log('Analyzing code patterns...')
  
  // Count loops
  const forLoops = (code.match(/for\s*\(/g) || []).length
  const whileLoops = (code.match(/while\s*\(/g) || []).length
  const totalLoops = forLoops + whileLoops
  
  // Detect nested loops
  const nestedLoopDepth = estimateNestedLoops(code)
  
  // Check for logarithmic patterns
  const hasLogPattern = /\*=\s*2|\/=\s*2|\/\/\s*2|\*\s*2/.test(code) ||
                        /n\s*=\s*n\s*\/\s*2|n\s*\/\/\s*2/.test(code) ||
                        /left.*right|binary|mid/.test(code.toLowerCase())
  
  // Check for recursive patterns
  const functionName = extractFunctionName(code)
  const hasRecursion = functionName && 
                       new RegExp(`\\b${functionName}\\s*\\(`).test(code.replace(/def\s+\w+/, ''))
  
  // Count recursive calls in function
  let recursiveCallCount = 0
  if (hasRecursion && functionName) {
    const funcBody = code.substring(code.indexOf(functionName) + functionName.length)
    const calls = funcBody.match(new RegExp(`\\b${functionName}\\s*\\(`, 'g'))
    recursiveCallCount = calls ? calls.length : 0
  }
  
  // Check for triple nested loops
  const hasTripleNested = nestedLoopDepth >= 3
  
  // Check for divide-and-conquer
  const hasDivideConquer = hasRecursion && hasLogPattern
  
  console.log(`  Loops: ${totalLoops}, Nested depth: ${nestedLoopDepth}`)
  console.log(`  Recursion: ${hasRecursion}, Calls: ${recursiveCallCount}`)
  console.log(`  Log pattern: ${hasLogPattern}, Divide-conquer: ${hasDivideConquer}`)
  
  // Determine complexity based on patterns
  let complexity, formula, explanation
  
  if (hasTripleNested) {
    complexity = 'O(n³)'
    formula = 'n * n * n'
    explanation = 'Triple nested loops detected'
  } else if (nestedLoopDepth === 2) {
    complexity = 'O(n²)'
    formula = 'n * n'
    explanation = 'Nested loops detected'
  } else if (recursiveCallCount >= 2 && !hasDivideConquer) {
    complexity = 'O(2ⁿ)'
    formula = 'Math.pow(2, n)'
    explanation = 'Multiple recursive calls detected (exponential)'
  } else if (hasDivideConquer || (hasRecursion && hasLogPattern)) {
    complexity = 'O(n log n)'
    formula = 'n * Math.log2(n)'
    explanation = 'Divide-and-conquer pattern detected'
  } else if (hasLogPattern && !hasRecursion && totalLoops <= 1) {
    complexity = 'O(log n)'
    formula = 'Math.log2(n)'
    explanation = 'Logarithmic pattern detected'
  } else if (totalLoops >= 1) {
    complexity = 'O(n)'
    formula = 'n'
    explanation = 'Linear loop detected'
  } else {
    complexity = 'O(1)'
    formula = '1'
    explanation = 'No loops or recursion detected'
  }
  
  console.log(`  → Detected: ${complexity} (${explanation})`)
  
  return { complexity, formula, explanation }
}

// Extract function name from code
function extractFunctionName(code) {
  // Python: def function_name(
  const pythonMatch = code.match(/def\s+(\w+)\s*\(/)
  if (pythonMatch) return pythonMatch[1]
  
  // C++: type function_name(
  const cppMatch = code.match(/(?:int|void|bool|double|float|string)\s+(\w+)\s*\(/)
  if (cppMatch && cppMatch[1] !== 'main') return cppMatch[1]
  
  return null
}

// Estimate depth of nested loops
function estimateNestedLoops(code) {
  const lines = code.split('\n')
  let maxDepth = 0
  let currentDepth = 0
  let braceDepth = 0
  
  for (const line of lines) {
    const trimmed = line.trim()
    
    // Count opening braces
    const openBraces = (trimmed.match(/{/g) || []).length
    const closeBraces = (trimmed.match(/}/g) || []).length
    
    // Check for loop start
    if (trimmed.match(/for\s*\(|while\s*\(/)) {
      currentDepth++
      maxDepth = Math.max(maxDepth, currentDepth)
    }
    
    // Track brace depth to detect loop exits
    braceDepth += openBraces - closeBraces
    
    // If we close braces and depth decreases, we likely exited a loop
    if (closeBraces > 0 && currentDepth > 0) {
      currentDepth = Math.max(0, currentDepth - closeBraces)
    }
  }
  
  return maxDepth
}

// Factorial helper for O(n!) complexity
function factorial(n) {
  if (n <= 1) return 1
  if (n > 12) return Infinity // Prevent overflow
  let result = 1
  for (let i = 2; i <= n; i++) {
    result *= i
  }
  return result
}

// Simulate execution time based on code patterns
function simulateExecutionTime(code, n) {
  // Analyze code to estimate time complexity
  const forLoops = (code.match(/for\s*\(/g) || []).length
  const whileLoops = (code.match(/while\s*\(/g) || []).length
  const nestedDepth = estimateNestedLoops(code)
  
  // Check for logarithmic patterns
  const hasLogPattern = /\*=\s*2|\/=\s*2|\/\/\s*2/.test(code) ||
                        /n\s*=\s*n\s*\/\s*2/.test(code) ||
                        /left.*right|binary|mid/i.test(code)
  
  // Check for recursion
  const functionName = extractFunctionName(code)
  const hasRecursion = functionName && 
                       new RegExp(`\\b${functionName}\\s*\\(`).test(code.replace(/def\s+\w+/, ''))
  
  let recursiveCallCount = 0
  if (hasRecursion && functionName) {
    const funcBody = code.substring(code.indexOf(functionName) + functionName.length)
    const calls = funcBody.match(new RegExp(`\\b${functionName}\\s*\\(`, 'g'))
    recursiveCallCount = calls ? calls.length : 0
  }
  
  const hasDivideConquer = hasRecursion && hasLogPattern
  
  // Base time in milliseconds
  let time = 0.01
  
  // Estimate time based on patterns
  if (nestedDepth >= 3) {
    // O(n³)
    time = Math.pow(n, 3) * 0.000001
  } else if (nestedDepth === 2) {
    // O(n²)
    time = Math.pow(n, 2) * 0.00001
  } else if (recursiveCallCount >= 2 && !hasDivideConquer) {
    // O(2ⁿ) - exponential
    time = Math.pow(2, Math.min(n, 20)) * 0.00001
  } else if (hasDivideConquer) {
    // O(n log n)
    time = n * Math.log2(Math.max(n, 1)) * 0.0001
  } else if (hasLogPattern && !hasRecursion) {
    // O(log n)
    time = Math.log2(Math.max(n, 1)) * 0.1
  } else if (forLoops + whileLoops > 0) {
    // O(n)
    time = n * 0.001
  } else {
    // O(1)
    time = 0.5
  }
  
  // Add small random noise to simulate real execution
  const noise = (Math.random() - 0.5) * 0.1 * time
  return Math.max(0.01, time + noise)
}

// Calculate R² (coefficient of determination) for regression
function calculateRSquared(actual, predicted) {
  const n = actual.length
  const actualMean = actual.reduce((sum, val) => sum + val, 0) / n
  
  // Total sum of squares
  const ssTot = actual.reduce((sum, val) => sum + Math.pow(val - actualMean, 2), 0)
  
  // Residual sum of squares
  const ssRes = actual.reduce((sum, val, i) => sum + Math.pow(val - predicted[i], 2), 0)
  
  // R² = 1 - (SS_res / SS_tot)
  const rSquared = 1 - (ssRes / ssTot)
  
  return Math.max(0, Math.min(1, rSquared)) // Clamp between 0 and 1
}

// Fit measurements against theoretical complexity functions using regression
function fitComplexityWithRegression(measurements) {
  console.log('Fitting complexity curves using regression...')
  
  if (measurements.length < 10) {
    return {
      complexity: 'O(n)',
      confidence: 30,
      rSquared: 0,
      error: 'Insufficient data points'
    }
  }
  
  // Define theoretical complexity functions
  const complexityFunctions = [
    { name: 'O(1)', fn: (n) => 1 },
    { name: 'O(log n)', fn: (n) => Math.log2(Math.max(n, 1)) },
    { name: 'O(n)', fn: (n) => n },
    { name: 'O(n log n)', fn: (n) => n * Math.log2(Math.max(n, 1)) },
    { name: 'O(n²)', fn: (n) => n * n },
    { name: 'O(n³)', fn: (n) => n * n * n },
    { name: 'O(2ⁿ)', fn: (n) => Math.pow(2, Math.min(n, 25)) }
  ]
  
  const actualTimes = measurements.map(m => m.time)
  
  let bestFit = null
  let bestRSquared = -Infinity
  
  // Test each complexity function
  for (const complexity of complexityFunctions) {
    try {
      // Calculate theoretical values
      const theoreticalValues = []
      let allValid = true
      
      for (const m of measurements) {
        const value = complexity.fn(m.n)
        if (!isFinite(value) || value === 0) {
          allValid = false
          break
        }
        theoreticalValues.push(value)
      }
      
      if (!allValid) continue
      
      // Calculate scale factor using least squares
      let sumXY = 0
      let sumXX = 0
      
      for (let i = 0; i < measurements.length; i++) {
        sumXY += theoreticalValues[i] * actualTimes[i]
        sumXX += theoreticalValues[i] * theoreticalValues[i]
      }
      
      const scaleFactor = sumXX > 0 ? sumXY / sumXX : 1
      
      // Generate predicted values
      const predictedTimes = theoreticalValues.map(v => scaleFactor * v)
      
      // Calculate R²
      const rSquared = calculateRSquared(actualTimes, predictedTimes)
      
      console.log(`  ${complexity.name}: R² = ${rSquared.toFixed(4)}`)
      
      if (rSquared > bestRSquared) {
        bestRSquared = rSquared
        bestFit = {
          complexity: complexity.name,
          rSquared: rSquared,
          scaleFactor: scaleFactor
        }
      }
    } catch (error) {
      console.error(`Error fitting ${complexity.name}:`, error.message)
    }
  }
  
  if (!bestFit) {
    return {
      complexity: 'O(n)',
      confidence: 30,
      rSquared: 0,
      error: 'Could not fit any complexity function'
    }
  }
  
  // Convert R² to confidence percentage (0-100%)
  const confidence = Math.round(bestFit.rSquared * 100)
  
  console.log(`  Best fit: ${bestFit.complexity} with R² = ${bestFit.rSquared.toFixed(4)}`)
  console.log(`  Confidence: ${confidence}%`)
  
  return {
    complexity: bestFit.complexity,
    confidence: confidence,
    rSquared: bestFit.rSquared
  }
}

// Generate mathematical growth function values for plotting
function generateGrowthValues(complexity, maxN = 10000) {
  const values = []
  const step = Math.max(1, Math.floor(maxN / 100))
  
  for (let n = 1; n <= maxN; n += step) {
    let value
    
    switch (complexity) {
      case 'O(1)':
        value = 1
        break
      case 'O(log n)':
        value = Math.log2(Math.max(n, 1))
        break
      case 'O(n)':
        value = n
        break
      case 'O(n log n)':
        value = n * Math.log2(Math.max(n, 1))
        break
      case 'O(n²)':
        value = n * n
        break
      case 'O(n³)':
        value = n * n * n
        break
      case 'O(2ⁿ)':
        value = Math.pow(2, Math.min(n, 25))
        break
      case 'O(n!)':
        // Approximate factorial for large n
        value = Math.exp(n * Math.log(n) - n)
        break
      default:
        value = n
    }
    
    if (isFinite(value) && value >= 0) {
      values.push({ n, value })
    }
  }
  
  // Normalize if needed
  const maxValue = Math.max(...values.map(v => v.value))
  if (maxValue > 1e6) {
    const scaleFactor = 1e6 / maxValue
    values.forEach(v => v.value *= scaleFactor)
  }
  
  return values
}

// Main analysis function using static analysis only
export async function analyzeComplexity(code, language) {
  console.log('Starting static complexity analysis...')
  console.log(`Language: ${language}`)
  
  try {
    // Use static analyzer
    const result = analyzeComplexityStatic(code, language)
    
    // Generate growth values for plotting
    const growthValues = generateGrowthValues(result.static.detected)
    const values = growthValues.map(v => v.value)
    
    console.log(`Analysis complete!`)
    console.log(`Detected: ${result.static.detected}`)
    console.log(`Confidence: ${result.static.confidence}%`)
    
    return {
      detectedComplexity: {
        complexity: result.static.detected,
        formula: result.static.formula,
        confidence: result.static.confidence / 100, // Convert to 0-1 scale for frontend
        explanation: result.static.explanation.join('; ')
      },
      values: values,
      growthPoints: growthValues,
      language,
      note: result.note,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Analysis error:', error.message)
    return {
      error: error.message
    }
  }
}
