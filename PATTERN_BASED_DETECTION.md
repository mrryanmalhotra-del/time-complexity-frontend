# 🎯 Pattern-Based Complexity Detection

## ✨ Overview

The backend now uses **pattern-based detection** instead of timing measurements. It analyzes code structure and plots **pure mathematical growth functions**.

---

## 🔄 What Changed

### Before (Timing-Based):
1. Run code 105 times with different input sizes
2. Measure execution time for each run
3. Fit times to theoretical curves using MSE
4. Plot fitted timing values
5. **Time:** 40-60 seconds per analysis

### After (Pattern-Based):
1. Analyze code structure (loops, recursion, patterns)
2. Detect complexity class directly
3. Generate mathematical f(n) values
4. Plot pure growth functions
5. **Time:** < 1 second per analysis

---

## 🎯 Detection Rules

### O(1) - Constant Time
**Pattern:** No loops or recursion
```python
def constant(n):
    return n * 2
```
**Generates:** `f(n) = 1` for all n

### O(log n) - Logarithmic
**Pattern:** Loop with n/=2 or n//=2 or *=2
```python
def binary_search(arr, target):
    while left <= right:
        mid = (left + right) // 2
        # ...
```
**Generates:** `f(n) = log₂(n)`

### O(n) - Linear
**Pattern:** Single loop
```python
def linear(arr):
    for i in arr:
        pass
```
**Generates:** `f(n) = n`

### O(n log n) - Linearithmic
**Pattern:** Recursion with divide-and-conquer
```python
def merge_sort(arr):
    mid = len(arr) // 2
    merge_sort(arr[:mid])
    merge_sort(arr[mid:])
```
**Generates:** `f(n) = n × log₂(n)`

### O(n²) - Quadratic
**Pattern:** Nested loops (depth 2)
```python
def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr)):
            pass
```
**Generates:** `f(n) = n²`

### O(n³) - Cubic
**Pattern:** Triple nested loops (depth 3)
```cpp
for(int i = 0; i < n; i++) {
    for(int j = 0; j < n; j++) {
        for(int k = 0; k < n; k++) {
            // operation
        }
    }
}
```
**Generates:** `f(n) = n³`

### O(2ⁿ) - Exponential
**Pattern:** Multiple recursive calls without divide-conquer
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```
**Generates:** `f(n) = 2ⁿ` (capped at n=25)

### O(n!) - Factorial
**Pattern:** Detected rarely (future enhancement)
```python
def permutations(arr):
    # generates all permutations
```
**Generates:** `f(n) = n!` (capped at n=12)

---

## 📊 Mathematical Functions Generated

For each complexity, the backend computes:

```javascript
// n ranges from 1 to 10,000 (or slider max)
// step = maxN / 100 (generates ~100 points)

switch (complexity) {
  case 'O(1)':
    f(n) = 1
    break
  case 'O(log n)':
    f(n) = log₂(n)
    break
  case 'O(n)':
    f(n) = n
    break
  case 'O(n log n)':
    f(n) = n × log₂(n)
    break
  case 'O(n²)':
    f(n) = n²
    break
  case 'O(n³)':
    f(n) = n³
    break
  case 'O(2ⁿ)':
    f(n) = 2^n  // capped at n=25
    break
  case 'O(n!)':
    f(n) = n!   // capped at n=12
    break
}
```

### Normalization

Large values (> 1,000,000) are normalized to prevent visual overflow:

```javascript
if (maxValue > 1e6) {
  scaleFactor = 1e6 / maxValue
  values.forEach(v => v.value *= scaleFactor)
}
```

This keeps exponential and factorial functions visible on the graph.

---

## 🔍 Pattern Detection Details

### Loop Counting
```javascript
const forLoops = code.match(/for\s*\(/g).length
const whileLoops = code.match(/while\s*\(/g).length
```

### Nested Loop Depth
- Tracks opening braces
- Counts loop keywords inside loops
- Returns maximum nesting depth

### Recursion Detection
- Extracts function name
- Searches for function calls within itself
- Counts number of recursive calls

### Logarithmic Pattern
Matches:
- `n *= 2` or `n /= 2`
- `n = n / 2` or `n // 2`
- Keywords: `binary`, `mid`, `left`, `right`

### Divide-and-Conquer
- Recursion present
- AND logarithmic pattern present

---

## 📈 Response Format

### Backend Returns:
```json
{
  "detectedComplexity": {
    "complexity": "O(n²)",
    "formula": "n * n",
    "confidence": 0.95,
    "explanation": "Nested loops detected"
  },
  "values": [1, 4, 9, 16, 25, ...],
  "growthPoints": [
    { "n": 1, "value": 1 },
    { "n": 100, "value": 10000 },
    { "n": 200, "value": 40000 }
  ],
  "language": "cpp",
  "timestamp": "2025-11-01T..."
}
```

### Fields:
- **complexity**: e.g., "O(n²)"
- **formula**: JavaScript expression, e.g., "n * n"
- **confidence**: 0-1 scale (75%-95% typically)
- **explanation**: Why this complexity was detected
- **values**: Array of f(n) values for plotting
- **growthPoints**: Array of {n, value} pairs for accurate plotting

---

## 🎨 Graph Plotting

### Default Complexities
- Use formula to generate points
- Update dynamically with slider
- Different colors for each

### Detected Complexity
- Uses **growthPoints** from backend
- Pre-computed mathematical values
- Cyan color (#06b6d4)
- Does NOT update with slider (fixed range)

### Y-Axis
- Label: **"Growth Rate (f(n))"**
- Logarithmic scale
- Shows pure mathematical growth, not timings

---

## ⚡ Performance Improvements

| Aspect | Before | After | Improvement |
|--------|--------|-------|-------------|
| Analysis Time | 40-60s | <1s | **50x faster** |
| Sample Points | 105 | 0 | No timing needed |
| Runs per n | 4 | 0 | No execution |
| Accuracy | MSE-based | Pattern-based | More reliable |
| Method | Empirical | Analytical | Cleaner approach |

---

## 🎯 Confidence Scores

Based on pattern clarity:

| Complexity | Confidence | Reason |
|-----------|-----------|--------|
| O(1) | 75% | Hard to distinguish from no-ops |
| O(log n) | 75% | Pattern may be ambiguous |
| O(n) | 85% | Clear single loop pattern |
| O(n log n) | 85% | Divide-conquer is distinctive |
| O(n²) | 95% | Nested loops are very clear |
| O(n³) | 95% | Triple nesting unmistakable |
| O(2ⁿ) | 80% | Multiple recursion is evident |
| O(n!) | 80% | Factorial patterns clear |

---

## ✅ Advantages

### 1. **Instant Results**
- No waiting for 400+ timing measurements
- Analysis completes in <1 second

### 2. **Pure Mathematical Curves**
- Shows actual growth functions
- Not affected by system load or timing noise

### 3. **More Reliable**
- Doesn't depend on execution simulation
- Pattern detection is deterministic

### 4. **Clearer Visualization**
- Normalized values prevent visual overflow
- Exponential/factorial curves remain visible

### 5. **Better User Experience**
- Immediate feedback
- Clear explanations (e.g., "Nested loops detected")

---

## 🧪 Testing Examples

### Test 1: Linear Loop
```python
def test(arr):
    for i in arr:
        pass
```

**Expected:**
- Detected: O(n)
- Explanation: "Linear loop detected"
- Confidence: 85%
- Time: <1s

### Test 2: Nested Loops
```cpp
for(int i = 0; i < n; i++) {
    for(int j = 0; j < n; j++) {
        // op
    }
}
```

**Expected:**
- Detected: O(n²)
- Explanation: "Nested loops detected"
- Confidence: 95%
- Time: <1s

### Test 3: Binary Search
```python
while left <= right:
    mid = (left + right) // 2
    left = mid + 1
```

**Expected:**
- Detected: O(log n)
- Explanation: "Logarithmic pattern detected"
- Confidence: 75%
- Time: <1s

---

## 📊 Console Output

```
Starting complexity analysis...
Language: python
Analyzing code patterns...
  Loops: 2, Nested depth: 2
  Recursion: false, Calls: 0
  Log pattern: false, Divide-conquer: false
  → Detected: O(n²) (Nested loops detected)
Generating growth values for O(n²)...
  Generated 101 data points
Analysis complete!
Detected: O(n²)
Confidence: 95.0%
Generated 101 growth rate values
```

---

## 🎓 Key Concepts

### Analytical vs Empirical
- **Empirical** (old): Measure actual execution times
- **Analytical** (new): Analyze code structure mathematically

### Growth Function
The mathematical function that describes how operations grow with input size:
- O(n²) → f(n) = n²
- O(n log n) → f(n) = n × log₂(n)

### Pattern Detection
Identifying complexity by recognizing code structures:
- Loops → Linear or nested complexity
- Recursion → Exponential or divide-conquer
- Division patterns → Logarithmic

---

## 🔧 Implementation Files

### Backend:
```
backend/src/analyzer.js
```
**Functions:**
- `analyzeCodePatterns()` - Detects loops, recursion, patterns
- `extractFunctionName()` - Finds function name for recursion check
- `estimateNestedLoops()` - Counts loop nesting depth
- `generateGrowthValues()` - Computes f(n) for complexity
- `analyzeComplexity()` - Main entry point

### Frontend:
```
frontend/src/components/Sidebar.jsx
frontend/src/components/ComplexityGraph.jsx
```
**Changes:**
- Use `growthPoints` instead of `fittedValues`
- Display `explanation` from backend
- Plot using pre-computed values

---

## 🎉 Summary

**What This Means:**

✅ **Instant analysis** - No more 40-60 second wait  
✅ **Pure math** - Plots actual growth functions, not timings  
✅ **Pattern-based** - Detects complexity from code structure  
✅ **More reliable** - Not affected by timing noise  
✅ **Better UX** - Clear explanations and instant feedback  
✅ **Same UI** - All styling and layout unchanged  

**The visualizer now shows true mathematical complexity growth!** 🚀
