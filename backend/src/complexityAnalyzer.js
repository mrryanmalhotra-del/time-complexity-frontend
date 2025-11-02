/**
 * Enhanced Time Complexity Analyzer
 * 
 * This module analyzes code and determines its time complexity with improved accuracy.
 * It supports multiple languages and uses safe regex patterns.
 */

// Language-specific function patterns
const FUNCTION_PATTERNS = {
    javascript: /function\s+\w+\s*\([^)]*\)\s*\{[^}]*\}/gs,
    cpp: /\b[a-zA-Z_]\w*\s+\w+\s*\([^)]*\)\s*\{[^}]*\}/gs,
    python: /def\s+\w+\s*\([^)]*\):/gs
};

// Safe regex matching function with error handling
function safeMatch(pattern, code) {
    if (!code || typeof code !== 'string') {
        console.error('Invalid code input for pattern matching');
        return [];
    }
    
    try {
        // Ensure pattern is a RegExp object
        const regex = typeof pattern === 'string' ? new RegExp(pattern, 'gs') : pattern;
        return code.match(regex) || [];
    } catch (e) {
        console.error('Regex match failed:', e.message);
        return [];
    }
}

// Helper function to detect loop patterns
function detectLoopPatterns(code) {
    if (!code || typeof code !== 'string') {
        console.error('Invalid code input for loop detection');
        return {
            forLoop: false,
            whileLoop: false,
            doWhileLoop: false,
            pythonFor: false,
            pythonWhile: false,
            logPattern: false,
            nestedLoops: false,
            recursion: false
        };
    }

    const patterns = {
        // JavaScript/C-style loops
        forLoop: /for\s*\([^)]*\)\s*\{/,
        whileLoop: /while\s*\([^)]*\)\s*\{/,
        doWhileLoop: /do\s*\{[^}]*\}\s*while\s*\([^)]*\)/,
        
        // Python-style loops
        pythonFor: /for\s+\w+\s+in\s+[^:]+:/,
        pythonWhile: /while\s+[^:]+:/,
        
        // Log patterns
        logPattern: /(\w+\s*[\*\/]=\s*[2-9]|\w+\s*=\s*\w+\s*[\/\*]\s*[2-9])/,
        
        // Nested loops
        nestedLoops: /(for|while)\s*\([^)]*\)\s*\{[^{}]*(for|while)\s*\([^)]*\)/s,
        
        // Recursion
        recursion: /(\w+)\s*\([^)]*\)\s*\{[^}]*\1\s*\(/s
    };
    
    const results = {};
    for (const [key, pattern] of Object.entries(patterns)) {
        results[key] = safeMatch(pattern, code).length > 0;
    }
    
    return results;
}

// Main analysis function with comprehensive error handling
function analyzeComplexity(code) {
    try {
        if (!code || typeof code !== 'string' || code.trim() === '') {
            return {
                complexity: 'Unknown',
                confidence: 0,
                explanation: 'No code provided for analysis',
                error: 'No code provided'
            };
        }

        // Limit code length to prevent DoS
        if (code.length > 10000) {
            return {
                complexity: 'Unknown',
                confidence: 0,
                explanation: 'Code is too long for analysis',
                error: 'Code exceeds maximum length (10,000 characters)'
            };
        }

        // Detect language based on code patterns
        let language = 'javascript';
        try {
            if (code.includes('def ') && code.includes(':')) {
                language = 'python';
            } else if (code.includes('int main') || code.includes('using namespace')) {
                language = 'cpp';
            }
        } catch (e) {
            console.warn('Language detection failed, defaulting to JavaScript:', e.message);
        }

        // Get function patterns for the detected language
        const functionPattern = FUNCTION_PATTERNS[language] || FUNCTION_PATTERNS.javascript;
        const functions = safeMatch(functionPattern, code);

        if (functions.length === 0) {
            return {
                complexity: 'O(1)',
                confidence: 80,
                explanation: 'No loops or recursive patterns detected. Assuming constant time operation.'
            };
        }

        // Analyze each function
        const analysis = [];
        for (const func of functions) {
            try {
                const patterns = detectLoopPatterns(func);
                
                // Determine complexity based on patterns
                if (patterns.nestedLoops) {
                    analysis.push({
                        complexity: 'O(n²)',
                        confidence: 90,
                        explanation: 'Nested loops detected, indicating quadratic time complexity.'
                    });
                } else if (patterns.recursion) {
                    analysis.push({
                        complexity: 'O(2ⁿ)',
                        confidence: 85,
                        explanation: 'Recursive function call detected, which may indicate exponential time complexity.'
                    });
                } else if (patterns.logPattern) {
                    analysis.push({
                        complexity: 'O(log n)',
                        confidence: 80,
                        explanation: 'Logarithmic pattern detected (e.g., binary search).'
                    });
                } else if (patterns.forLoop || patterns.whileLoop || patterns.doWhileLoop || 
                          patterns.pythonFor || patterns.pythonWhile) {
                    analysis.push({
                        complexity: 'O(n)',
                        confidence: 85,
                        explanation: 'Linear loop detected.'
                    });
                } else {
                    analysis.push({
                        complexity: 'O(1)',
                        confidence: 75,
                        explanation: 'No significant loops detected. Assuming constant time operation.'
                    });
                }
            } catch (e) {
                console.error('Error analyzing function:', e);
                analysis.push({
                    complexity: 'Unknown',
                    confidence: 0,
                    explanation: 'Error analyzing function',
                    error: e.message
                });
            }
        }

        if (analysis.length === 0) {
            return {
                complexity: 'Unknown',
                confidence: 0,
                explanation: 'No valid analysis could be performed',
                error: 'Analysis failed'
            };
        }

        // Return the most complex result
        const complexityOrder = {
            'O(n!)': 5,
            'O(2ⁿ)': 4,
            'O(n²)': 3,
            'O(n log n)': 2,
            'O(n)': 1,
            'O(log n)': 0,
            'O(1)': -1,
            'Unknown': -2
        };

        const result = analysis.reduce((max, current) => {
            const currentOrder = complexityOrder[current.complexity] || -2;
            const maxOrder = complexityOrder[max.complexity] || -2;
            return (currentOrder > maxOrder) ? current : max;
        }, { complexity: 'Unknown', confidence: 0, explanation: 'No patterns detected' });

        return result;

    } catch (error) {
        console.error('Error in analyzeComplexity:', error);
        return {
            complexity: 'Unknown',
            confidence: 0,
            explanation: 'An error occurred during analysis',
            error: error.message
        };
    }
}

// Wrapper function for the API endpoint
export function analyzeCode(req, res) {
    try {
        const { code, language = 'javascript' } = req.body;
        
        if (!code || typeof code !== 'string') {
            return res.status(400).json({
                error: 'Invalid input: code is required and must be a string',
                details: 'Please provide the code to analyze'
            });
        }
        
        console.log('\n' + '='.repeat(50));
        console.log('🔍 Analyzing code complexity...');
        console.log('='.repeat(50));
        
        const result = analyzeComplexity(code);
        
        console.log(`✅ Analysis complete: ${result.complexity} (${result.confidence}% confidence)`);
        console.log('='.repeat(50) + '\n');
        
        res.json({
            complexity: result.complexity,
            confidence: result.confidence,
            explanation: result.explanation
        });
        
    } catch (error) {
        console.error('Error in analyzeCode:', error);
        res.status(500).json({
            error: 'An error occurred while analyzing the code',
            details: error.message
        });
    }
}

console.log('✅ Enhanced Time Complexity Analyzer running successfully!');
console.log('🔍 Supports: JavaScript, Python, and C++ patterns');
console.log('ℹ️  Using safe regex matching for improved reliability');
