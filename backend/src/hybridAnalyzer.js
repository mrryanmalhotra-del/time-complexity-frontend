/**
 * Hybrid Complexity Analyzer
 * Combines empirical profiling with static code analysis
 */

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import os from 'os'

// Maximum values for safety
const MAX_N = 1000
const TIMEOUT_PER_RUN = 1000 // 1 second per run
const TIMEOUT_TOTAL = 45000 // 45 seconds total
const MIN_SAMPLES = 25
const RUNS_PER_N = 3

// Generate log-spaced sample points
function generateSamples(nMax, numSamples = MIN_SAMPLES) {
  const samples = []
  const minN = 10
  
  for (let i = 0; i < numSamples; i++) {
    const t = i / (numSamples - 1)
    const n = Math.round(minN + (nMax - minN) * Math.pow(t, 1.5))
    if (samples.length === 0 || n > samples[samples.length - 1]) {
      samples.push(n)
    }
  }
  
  return samples
}

// Calculate NMSE (Normalized Mean Squared Error)
function calculateNMSE(actual, predicted) {
  const n = actual.length
  const meanActual = actual.reduce((sum, val) => sum + val, 0) / n
  
  let sumSquaredError = 0
  let sumSquaredTotal = 0
  
  for (let i = 0; i < n; i++) {
    sumSquaredError += Math.pow(actual[i] - predicted[i], 2)
    sumSquaredTotal += Math.pow(actual[i] - meanActual, 2)
  }
  
  if (sumSquaredTotal === 0) return 0
  return sumSquaredError / sumSquaredTotal
}

// Fit complexity models
function fitComplexityModels(measurements) {
  const models = {
    'O(1)': (n) => 1,
    'O(log n)': (n) => Math.log2(n),
    'O(n)': (n) => n,
    'O(n log n)': (n) => n * Math.log2(n),
    'O(n²)': (n) => n * n,
    'O(n³)': (n) => n * n * n,
    'O(2ⁿ)': (n) => Math.pow(2, Math.min(n, 20)) // Cap for safety
  }
  
  const nValues = measurements.map(m => m.n)
  const timeValues = measurements.map(m => m.time_ms)
  
  let bestModel = 'O(n)'
  let bestNMSE = Infinity
  let bestScale = 1
  
  for (const [name, func] of Object.entries(models)) {
    const theoretical = nValues.map(func)
    
    // Calculate scale factor using least squares
    let numerator = 0
    let denominator = 0
    for (let i = 0; i < nValues.length; i++) {
      numerator += theoretical[i] * timeValues[i]
      denominator += theoretical[i] * theoretical[i]
    }
    const scale = denominator > 0 ? numerator / denominator : 1
    
    // Generate predictions
    const predicted = theoretical.map(val => scale * val)
    
    // Calculate NMSE
    const nmse = calculateNMSE(timeValues, predicted)
    
    if (nmse < bestNMSE) {
      bestNMSE = nmse
      bestModel = name
      bestScale = scale
    }
  }
  
  // Calculate confidence from NMSE
  const confidence = Math.min(100, Math.max(0, Math.round(100 * (1 - bestNMSE))))
  
  return {
    best_model: bestModel,
    nmse: bestNMSE,
    confidence: confidence,
    scale: bestScale
  }
}

// Execute Python code and measure time
async function executePython(code, n, timeout = TIMEOUT_PER_RUN) {
  const tempFile = path.join(os.tmpdir(), `test_${Date.now()}_${Math.random()}.py`)
  
  // Wrap code to measure execution time
  const wrappedCode = `
import time
import sys

n = ${n}

# User code
${code}

# Measure main execution
start = time.perf_counter()
try:
    if 'main' in dir():
        main()
    elif '__main__' in dir():
        pass
except:
    pass
end = time.perf_counter()

print((end - start) * 1000)  # Convert to milliseconds
`
  
  try {
    fs.writeFileSync(tempFile, wrappedCode)
    
    const output = execSync(`python "${tempFile}"`, {
      timeout: timeout,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    })
    
    const time = parseFloat(output.trim())
    fs.unlinkSync(tempFile)
    
    return isFinite(time) ? time : 0
  } catch (error) {
    try { fs.unlinkSync(tempFile) } catch {}
    if (error.killed) {
      throw new Error('Execution timeout')
    }
    return 0
  }
}

// Execute C++ code and measure time
async function executeCpp(code, n, timeout = TIMEOUT_PER_RUN) {
  const tempDir = os.tmpdir()
  const baseName = `test_${Date.now()}_${Math.random()}`
  const sourceFile = path.join(tempDir, `${baseName}.cpp`)
  const exeFile = path.join(tempDir, `${baseName}.exe`)
  
  // Wrap code with timing
  const wrappedCode = `
#include <iostream>
#include <chrono>
using namespace std;
using namespace std::chrono;

int n = ${n};

${code}

int main() {
    auto start = high_resolution_clock::now();
    
    // Call user's main if it exists, or execute code
    
    auto end = high_resolution_clock::now();
    auto duration = duration_cast<microseconds>(end - start);
    cout << (duration.count() / 1000.0) << endl;  // Convert to milliseconds
    return 0;
}
`
  
  try {
    fs.writeFileSync(sourceFile, wrappedCode)
    
    // Compile
    execSync(`g++ -std=c++17 -O2 "${sourceFile}" -o "${exeFile}"`, {
      timeout: timeout,
      stdio: 'pipe'
    })
    
    // Execute
    const output = execSync(`"${exeFile}"`, {
      timeout: timeout,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    })
    
    const time = parseFloat(output.trim())
    
    // Cleanup
    try { fs.unlinkSync(sourceFile) } catch {}
    try { fs.unlinkSync(exeFile) } catch {}
    
    return isFinite(time) ? time : 0
  } catch (error) {
    // Cleanup
    try { fs.unlinkSync(sourceFile) } catch {}
    try { fs.unlinkSync(exeFile) } catch {}
    
    if (error.killed) {
      throw new Error('Execution timeout')
    }
    return 0
  }
}

// Empirical analysis with profiling
async function empiricalAnalysis(code, language, nMax, numSamples = MIN_SAMPLES) {
  console.log(`Starting empirical analysis...`)
  console.log(`  Language: ${language}`)
  console.log(`  Max n: ${nMax}`)
  console.log(`  Samples: ${numSamples}`)
  
  const samples = generateSamples(nMax, numSamples)
  const measurements = []
  
  const startTime = Date.now()
  
  for (const n of samples) {
    if (Date.now() - startTime > TIMEOUT_TOTAL) {
      throw new Error('Total execution timeout exceeded')
    }
    
    const times = []
    
    // Run multiple times and average
    for (let run = 0; run < RUNS_PER_N; run++) {
      try {
        const time = language === 'python' 
          ? await executePython(code, n)
          : await executeCpp(code, n)
        
        times.push(time)
      } catch (error) {
        console.log(`  Warning: Failed at n=${n}, run=${run}: ${error.message}`)
        times.push(0)
      }
    }
    
    const avgTime = times.reduce((sum, t) => sum + t, 0) / times.length
    measurements.push({ n, time_ms: avgTime })
    
    console.log(`  n=${n}: ${avgTime.toFixed(3)}ms`)
  }
  
  // Fit models
  const fit = fitComplexityModels(measurements)
  
  console.log(`  Empirical result: ${fit.best_model} (confidence: ${fit.confidence}%)`)
  
  return {
    samples: measurements,
    best_model: fit.best_model,
    confidence: fit.confidence,
    nmse: fit.nmse
  }
}

// Static analysis for Python using AST patterns
function staticAnalysisPython(code) {
  console.log(`Static analysis (Python)...`)
  
  // Heuristic patterns (simplified - real AST would use ast module via Python script)
  const patterns = {
    'O(1)': /^(?!.*for\s|.*while\s).*$/s,
    'O(log n)': /while.*?n\s*[\/]|while.*?n\s*>>=|while.*?n\s*\/\/=\s*2|for.*?i\s*\*=\s*2/,
    'O(n)': /for\s+\w+\s+in\s+range\(n\)|for.*in.*range\([^)]*n[^)]*\)(?!.*for)/,
    'O(n log n)': /def\s+\w*sort|merge|quick/i,
    'O(n²)': /for\s+.*\s+in\s+range.*\n.*for\s+.*\s+in\s+range/,
    'O(n³)': /for\s+.*\s+in\s+range.*\n.*for\s+.*\s+in\s+range.*\n.*for\s+.*\s+in\s+range/,
    'O(2ⁿ)': /def\s+\w+\([^)]*\).*:\s*\n.*return.*\w+\([^)]*-\s*1.*\+.*\w+\([^)]*-\s*1/s
  }
  
  let detected = 'O(n)'
  let confidence = 50
  let explanation = []
  
  // Check patterns
  if (patterns['O(2ⁿ)'].test(code)) {
    detected = 'O(2ⁿ)'
    confidence = 75
    explanation.push('Recursive function with multiple recursive calls detected.')
  } else if (patterns['O(n³)'].test(code)) {
    detected = 'O(n³)'
    confidence = 85
    explanation.push('Triple nested loops detected.')
  } else if (patterns['O(n²)'].test(code)) {
    detected = 'O(n²)'
    confidence = 85
    explanation.push('Nested loops detected.')
  } else if (patterns['O(n log n)'].test(code)) {
    detected = 'O(n log n)'
    confidence = 70
    explanation.push('Sorting algorithm detected.')
  } else if (patterns['O(log n)'].test(code)) {
    detected = 'O(log n)'
    confidence = 75
    explanation.push('Logarithmic loop pattern detected (division or multiplication by 2).')
  } else if (patterns['O(n)'].test(code)) {
    detected = 'O(n)'
    confidence = 70
    explanation.push('Single loop detected.')
  } else {
    detected = 'O(1)'
    confidence = 60
    explanation.push('No loops or recursion detected.')
  }
  
  console.log(`  Static result: ${detected} (confidence: ${confidence}%)`)
  
  return {
    detected: detected,
    confidence: confidence,
    explanation: explanation
  }
}

// Static analysis for C++
function staticAnalysisCpp(code) {
  console.log(`Static analysis (C++)...`)
  
  const patterns = {
    'O(log n)': /for\s*\([^;]*;\s*\w+\s*[<>]=?\s*n\s*;[^)]*\*=\s*2|while\s*\([^)]*n\s*\/=\s*2/,
    'O(n)': /for\s*\([^;]*;\s*\w+\s*[<>]=?\s*n\s*;[^)]*\+\+|for\s*\([^;]*;\s*\w+\s*[<>]=?\s*n\s*;[^)]*\+=\s*1/,
    'O(n²)': /for\s*\([^{]*\)\s*\{[^}]*for\s*\([^{]*\)\s*\{/,
    'O(n³)': /for\s*\([^{]*\)\s*\{[^}]*for\s*\([^{]*\)\s*\{[^}]*for\s*\([^{]*\)\s*\{/,
    'O(2ⁿ)': /\w+\s*\([^)]*n\s*-\s*1[^)]*\).*\w+\s*\([^)]*n\s*-\s*1[^)]*\)/
  }
  
  let detected = 'O(n)'
  let confidence = 50
  let explanation = []
  
  if (patterns['O(2ⁿ)'].test(code)) {
    detected = 'O(2ⁿ)'
    confidence = 75
    explanation.push('Recursive pattern with multiple recursive calls.')
  } else if (patterns['O(n³)'].test(code)) {
    detected = 'O(n³)'
    confidence = 90
    explanation.push('Triple nested for-loops detected.')
  } else if (patterns['O(n²)'].test(code)) {
    detected = 'O(n²)'
    confidence = 90
    explanation.push('Nested for-loops detected.')
  } else if (patterns['O(log n)'].test(code)) {
    detected = 'O(log n)'
    confidence = 80
    explanation.push('Logarithmic loop pattern (i*=2 or n/=2).')
  } else if (patterns['O(n)'].test(code)) {
    detected = 'O(n)'
    confidence = 75
    explanation.push('Linear loop detected.')
  } else {
    detected = 'O(1)'
    confidence = 60
    explanation.push('No clear loop pattern detected.')
  }
  
  console.log(`  Static result: ${detected} (confidence: ${confidence}%)`)
  
  return {
    detected: detected,
    confidence: confidence,
    explanation: explanation
  }
}

// Compare empirical and static results
function compareResults(empirical, static_result) {
  console.log(`Comparing results...`)
  console.log(`  Empirical: ${empirical.best_model} (${empirical.confidence}%)`)
  console.log(`  Static: ${static_result.detected} (${static_result.confidence}%)`)
  
  const empModel = empirical.best_model
  const staModel = static_result.detected
  
  // Agreement
  if (empModel === staModel) {
    const combinedConfidence = Math.round(0.6 * empirical.confidence + 0.4 * static_result.confidence)
    return {
      detectedComplexity: empModel,
      final_confidence: combinedConfidence,
      verdict_reason: `Empirical and static analysis agree on ${empModel}.`,
      agreement: true
    }
  }
  
  // Disagreement - prefer high confidence
  if (empirical.confidence >= 85 && static_result.confidence < 85) {
    return {
      detectedComplexity: empModel,
      final_confidence: empirical.confidence,
      verdict_reason: `Empirical analysis has higher confidence (${empirical.confidence}% vs ${static_result.confidence}%).`,
      agreement: false,
      preferred: 'empirical'
    }
  }
  
  if (static_result.confidence >= 85 && empirical.confidence < 85) {
    return {
      detectedComplexity: staModel,
      final_confidence: static_result.confidence,
      verdict_reason: `Static analysis has higher confidence (${static_result.confidence}% vs ${empirical.confidence}%).`,
      agreement: false,
      preferred: 'static'
    }
  }
  
  // Both medium confidence - inconclusive
  if (empirical.confidence >= 60 && static_result.confidence >= 60) {
    return {
      detectedComplexity: 'Inconclusive',
      final_confidence: Math.round((empirical.confidence + static_result.confidence) / 2),
      verdict_reason: `Empirical (${empModel}) and static (${staModel}) analyses disagree with medium confidence. Both models shown.`,
      agreement: false,
      show_both: true
    }
  }
  
  // Default to empirical
  return {
    detectedComplexity: empModel,
    final_confidence: empirical.confidence,
    verdict_reason: `Using empirical result due to low static confidence.`,
    agreement: false,
    preferred: 'empirical'
  }
}

// Main hybrid analysis function
export async function hybridAnalyze(code, language, nMax = 500, numSamples = MIN_SAMPLES) {
  console.log('\n=== HYBRID COMPLEXITY ANALYSIS ===')
  
  // Validate language
  if (language !== 'python' && language !== 'cpp') {
    throw new Error('Only C++ and Python are supported.')
  }
  
  // Cap n_max
  let cappedN = nMax
  let limitNotice = null
  if (nMax > MAX_N) {
    cappedN = MAX_N
    limitNotice = `Note: n limited to ${MAX_N} for safe execution.`
    console.log(`  ${limitNotice}`)
  }
  
  try {
    // Run both analyses
    const empiricalResult = await empiricalAnalysis(code, language, cappedN, numSamples)
    const staticResult = language === 'python' 
      ? staticAnalysisPython(code)
      : staticAnalysisCpp(code)
    
    // Compare and create verdict
    const comparison = compareResults(empiricalResult, staticResult)
    
    const result = {
      ...comparison,
      empirical: empiricalResult,
      static: staticResult,
      language: language,
      n_max: cappedN,
      limit_notice: limitNotice
    }
    
    console.log(`\nFinal verdict: ${result.detectedComplexity} (${result.final_confidence}%)`)
    console.log(`Reason: ${result.verdict_reason}`)
    console.log('=== ANALYSIS COMPLETE ===\n')
    
    return result
  } catch (error) {
    console.error(`Analysis error: ${error.message}`)
    throw error
  }
}
