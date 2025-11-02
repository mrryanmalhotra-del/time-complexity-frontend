/**
 * Static Complexity Analyzer
 * AST + Heuristic-based analysis (no code execution)
 * Supports Python and C++ only
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import os from 'os'

// Validate Python syntax using Python's ast module
function validatePythonSyntax(code) {
  const tempFile = path.join(os.tmpdir(), `syntax_check_${Date.now()}.py`)
  
  try {
    fs.writeFileSync(tempFile, code)
    
    // Use Python's ast.parse to check syntax
    const checkScript = `
import ast
import sys

try:
    with open('${tempFile.replace(/\\/g, '\\\\')}', 'r') as f:
        code = f.read()
    ast.parse(code)
    print("OK")
except SyntaxError as e:
    print(f"ERROR: {e}")
    sys.exit(1)
`
    
    const result = execSync(`python -c "${checkScript.replace(/"/g, '\\"')}"`, {
      encoding: 'utf-8',
      timeout: 2000
    }).trim()
    
    fs.unlinkSync(tempFile)
    
    if (result === 'OK') {
      return { valid: true }
    } else {
      return { valid: false, error: result }
    }
  } catch (error) {
    try { fs.unlinkSync(tempFile) } catch {}
    return { 
      valid: false, 
      error: error.stderr || error.message || 'Python syntax error'
    }
  }
}

// Validate C++ syntax using heuristics
function validateCppSyntax(code) {
  // Check for basic C++ structure
  const hasInclude = /#include/.test(code)
  const hasMain = /int\s+main\s*\(/.test(code) || /void\s+main\s*\(/.test(code)
  
  // Count braces
  const openBraces = (code.match(/\{/g) || []).length
  const closeBraces = (code.match(/\}/g) || []).length
  
  if (!hasInclude && !hasMain) {
    return { 
      valid: false, 
      error: 'C++ syntax error or incomplete snippet: missing #include or main()' 
    }
  }
  
  if (openBraces !== closeBraces) {
    return { 
      valid: false, 
      error: 'C++ syntax error: unbalanced braces' 
    }
  }
  
  return { valid: true }
}

// Detect loop complexity for Python
function analyzePythonLoops(code) {
  const lines = code.split('\n')
  let maxNesting = 0
  let currentNesting = 0
  let hasLogPattern = false
  let loopCount = 0
  
  const explanation = []
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()
    
    // Detect for loops
    if (/^\s*for\s+/.test(line)) {
      loopCount++
      currentNesting++
      maxNesting = Math.max(maxNesting, currentNesting)
      
      // Check if it's over range(n)
      if (/range\s*\(\s*n\s*\)/.test(line) || /range\s*\([^)]*n[^)]*\)/.test(line)) {
        explanation.push(`Line ${i + 1}: Loop over range(n) detected`)
      }
    }
    
    // Detect while loops
    if (/^\s*while\s+/.test(line)) {
      loopCount++
      currentNesting++
      maxNesting = Math.max(maxNesting, currentNesting)
      
      // Check for logarithmic patterns
      if (/n\s*>|n\s*>=|n\s*!=/.test(line)) {
        // Check next few lines for n //= 2 or n /= 2
        for (let j = i; j < Math.min(i + 5, lines.length); j++) {
          if (/n\s*\/\/=\s*2|n\s*\/=\s*2|n\s*>>=/.test(lines[j])) {
            hasLogPattern = true
            explanation.push(`Line ${i + 1}: Logarithmic pattern (while n>1: n//=2) detected`)
            break
          }
        }
      }
    }
    
    // Detect end of block (dedentation)
    if (currentNesting > 0) {
      const nextLine = i + 1 < lines.length ? lines[i + 1] : ''
      const currentIndent = line.length - line.trimLeft().length
      const nextIndent = nextLine.length - nextLine.trimLeft().length
      
      if (nextIndent < currentIndent && trimmed.length > 0) {
        currentNesting--
      }
    }
  }
  
  return { maxNesting, hasLogPattern, loopCount, explanation }
}

// Detect loop complexity for C++
function analyzeCppLoops(code) {
  let maxNesting = 0
  let currentNesting = 0
  let hasLogPattern = false
  let loopCount = 0
  
  const explanation = []
  
  // Match for-loops
  const forLoops = code.match(/for\s*\([^)]+\)/g) || []
  loopCount = forLoops.length
  
  // Check for logarithmic patterns (i *= 2 or n /= 2)
  if (/for\s*\([^;]*;\s*\w+\s*[<>]=?\s*n\s*;[^)]*\*=\s*2/.test(code)) {
    hasLogPattern = true
    explanation.push('Logarithmic loop pattern (i *= 2) detected')
  }
  
  if (/while\s*\([^)]*n\s*\/=\s*2/.test(code) || /n\s*>>=/.test(code)) {
    hasLogPattern = true
    explanation.push('Logarithmic pattern (n /= 2) detected')
  }
  
  // Count nesting depth
  const lines = code.split('\n')
  for (const line of lines) {
    if (/for\s*\(/.test(line)) {
      currentNesting++
      maxNesting = Math.max(maxNesting, currentNesting)
    }
    
    const openBraces = (line.match(/\{/g) || []).length
    const closeBraces = (line.match(/\}/g) || []).length
    
    if (openBraces > closeBraces && /for\s*\(/.test(line)) {
      // Loop opening
    } else if (closeBraces > openBraces) {
      currentNesting = Math.max(0, currentNesting - (closeBraces - openBraces))
    }
  }
  
  // Detailed explanation for nested loops
  if (maxNesting === 2) {
    explanation.push('Nested for-loops detected (depth 2)')
  } else if (maxNesting === 3) {
    explanation.push('Triple nested for-loops detected (depth 3)')
  } else if (maxNesting >= 4) {
    explanation.push(`Deeply nested loops detected (depth ${maxNesting})`)
  }
  
  return { maxNesting, hasLogPattern, loopCount, explanation }
}

// Detect recursion patterns
function detectRecursion(code, language) {
  const explanation = []
  
  if (language === 'python') {
    // Match function definitions
    const funcMatches = code.match(/def\s+(\w+)\s*\([^)]*\)/g)
    if (funcMatches) {
      for (const funcDef of funcMatches) {
        const funcName = funcDef.match(/def\s+(\w+)/)[1]
        
        // Check if function calls itself
        const funcBody = code.split(funcDef)[1] || ''
        const callPattern = new RegExp(`\\b${funcName}\\s*\\(`, 'g')
        const calls = (funcBody.match(callPattern) || []).length
        
        if (calls >= 2) {
          explanation.push(`Recursive function '${funcName}' with multiple recursive calls (likely exponential)`)
          return { hasRecursion: true, isExponential: true, explanation }
        } else if (calls === 1) {
          // Check for divide-and-conquer pattern
          if (/n\s*\/\/?\s*2|n\s*\/\s*2/.test(funcBody)) {
            explanation.push(`Recursive function '${funcName}' with division by 2 (divide-and-conquer pattern)`)
            return { hasRecursion: true, isDivideConquer: true, explanation }
          } else {
            explanation.push(`Recursive function '${funcName}' detected`)
            return { hasRecursion: true, explanation }
          }
        }
      }
    }
  } else if (language === 'cpp') {
    // Simple C++ recursion detection
    const funcMatches = code.match(/(\w+)\s*\([^)]*\)\s*\{/g)
    if (funcMatches) {
      for (const funcDef of funcMatches) {
        const funcName = funcDef.match(/(\w+)\s*\(/)[1]
        
        if (funcName === 'main' || funcName === 'if' || funcName === 'while' || funcName === 'for') {
          continue
        }
        
        const callPattern = new RegExp(`\\b${funcName}\\s*\\(`, 'g')
        const calls = (code.match(callPattern) || []).length
        
        if (calls >= 3) { // Function def + 2+ calls = recursion
          explanation.push(`Recursive function '${funcName}' with multiple calls (likely exponential)`)
          return { hasRecursion: true, isExponential: true, explanation }
        } else if (calls === 2) {
          if (/n\s*\/\s*2/.test(code)) {
            explanation.push(`Recursive function '${funcName}' with division (divide-and-conquer pattern)`)
            return { hasRecursion: true, isDivideConquer: true, explanation }
          } else {
            explanation.push(`Recursive function '${funcName}' detected`)
            return { hasRecursion: true, explanation }
          }
        }
      }
    }
  }
  
  return { hasRecursion: false, explanation }
}

// Detect known library functions
function detectLibraryCalls(code, language) {
  const explanation = []
  
  if (language === 'python') {
    if (/\.sort\s*\(|sorted\s*\(/.test(code)) {
      explanation.push('Built-in sort() or sorted() detected (O(n log n))')
      return { hasSorting: true, explanation }
    }
  } else if (language === 'cpp') {
    if (/std::sort|sort\s*\(/.test(code)) {
      explanation.push('std::sort detected (O(n log n))')
      return { hasSorting: true, explanation }
    }
  }
  
  return { hasSorting: false, explanation }
}

// Map detected patterns to Big-O complexity
function mapToComplexity(analysis) {
  const { loops, recursion, library } = analysis
  const explanation = []
  
  // Library function
  if (library.hasSorting) {
    explanation.push(...library.explanation)
    return {
      complexity: 'O(n log n)',
      formula: 'n * log2(n)',
      confidence: 80,
      explanation
    }
  }
  
  // Recursion patterns
  if (recursion.hasRecursion) {
    explanation.push(...recursion.explanation)
    
    if (recursion.isExponential) {
      return {
        complexity: 'O(2ⁿ)',
        formula: '2^n',
        confidence: 75,
        explanation
      }
    }
    
    if (recursion.isDivideConquer) {
      // Check if there's linear work
      if (loops.loopCount > 0) {
        explanation.push('Linear work combined with divide-and-conquer → O(n log n)')
        return {
          complexity: 'O(n log n)',
          formula: 'n * log2(n)',
          confidence: 80,
          explanation
        }
      } else {
        explanation.push('Divide-and-conquer without linear work → O(log n)')
        return {
          complexity: 'O(log n)',
          formula: 'log2(n)',
          confidence: 75,
          explanation
        }
      }
    }
    
    // Generic recursion
    return {
      complexity: 'O(n)',
      formula: 'n',
      confidence: 60,
      explanation: [...explanation, 'Generic recursion pattern (assuming linear)']
    }
  }
  
  // Logarithmic loops
  if (loops.hasLogPattern) {
    explanation.push(...loops.explanation)
    return {
      complexity: 'O(log n)',
      formula: 'log2(n)',
      confidence: 85,
      explanation
    }
  }
  
  // Nested loops
  if (loops.maxNesting >= 3) {
    explanation.push(...loops.explanation)
    return {
      complexity: 'O(n³)',
      formula: 'n^3',
      confidence: 90,
      explanation
    }
  }
  
  if (loops.maxNesting === 2) {
    explanation.push(...loops.explanation)
    return {
      complexity: 'O(n²)',
      formula: 'n^2',
      confidence: 90,
      explanation
    }
  }
  
  // Single loop
  if (loops.loopCount === 1 && loops.maxNesting === 1) {
    explanation.push(...loops.explanation)
    return {
      complexity: 'O(n)',
      formula: 'n',
      confidence: 85,
      explanation
    }
  }
  
  // Multiple independent loops
  if (loops.loopCount > 1 && loops.maxNesting === 1) {
    explanation.push(...loops.explanation)
    explanation.push('Multiple independent loops still result in O(n)')
    return {
      complexity: 'O(n)',
      formula: 'n',
      confidence: 80,
      explanation
    }
  }
  
  // No loops or recursion
  if (loops.loopCount === 0 && !recursion.hasRecursion) {
    explanation.push('No loops or recursion detected')
    return {
      complexity: 'O(1)',
      formula: '1',
      confidence: 85,
      explanation
    }
  }
  
  // Inconclusive
  return {
    complexity: 'Inconclusive',
    formula: null,
    confidence: 45,
    explanation: ['Ambiguous code structure', 'Unable to determine clear complexity pattern']
  }
}

// Main static analysis function
export function analyzeComplexityStatic(code, language) {
  console.log('\n=== STATIC COMPLEXITY ANALYSIS ===')
  console.log(`Language: ${language}`)
  
  // Validate language
  if (language !== 'python' && language !== 'cpp') {
    throw new Error('Only C++ and Python are supported.')
  }
  
  // Validate syntax
  const syntaxCheck = language === 'python' 
    ? validatePythonSyntax(code)
    : validateCppSyntax(code)
  
  if (!syntaxCheck.valid) {
    const errorMsg = language === 'python'
      ? `Python syntax error: ${syntaxCheck.error}`
      : syntaxCheck.error
    throw new Error(errorMsg)
  }
  
  console.log('✓ Syntax validation passed')
  
  // Analyze loops
  const loops = language === 'python'
    ? analyzePythonLoops(code)
    : analyzeCppLoops(code)
  
  console.log(`  Loops detected: ${loops.loopCount}`)
  console.log(`  Max nesting: ${loops.maxNesting}`)
  console.log(`  Log pattern: ${loops.hasLogPattern}`)
  
  // Detect recursion
  const recursion = detectRecursion(code, language)
  console.log(`  Recursion: ${recursion.hasRecursion}`)
  
  // Detect library calls
  const library = detectLibraryCalls(code, language)
  console.log(`  Library calls: ${library.hasSorting}`)
  
  // Map to complexity
  const result = mapToComplexity({ loops, recursion, library })
  
  console.log(`\nDetected: ${result.complexity}`)
  console.log(`Confidence: ${result.confidence}%`)
  console.log('Explanation:')
  result.explanation.forEach(exp => console.log(`  - ${exp}`))
  console.log('=== ANALYSIS COMPLETE ===\n')
  
  // Return in expected format
  return {
    static: {
      detected: result.complexity,
      formula: result.formula,
      confidence: result.confidence,
      explanation: result.explanation
    },
    note: result.confidence < 50 
      ? 'Please simplify the code or provide a clearer snippet.'
      : null
  }
}
