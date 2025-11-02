# 🧪 Static Analysis - Test Examples

Complete test suite for static complexity detection.

---

## ✅ Test 1: Python - Linear Loop (O(n))

### Code:
```python
def linear_search(n):
    total = 0
    for i in range(n):
        total += i
    return total
```

### Expected Results:
- **Detected**: O(n)
- **Confidence**: 85%
- **Explanation**: "Loop over range(n) detected"

### Analysis Breakdown:
- Single `for` loop over `range(n)`
- No nesting
- No logarithmic patterns
- → Linear complexity

---

## ✅ Test 2: Python - Logarithmic (O(log n))

### Code:
```python
def binary_reduction(n):
    count = 0
    while n > 1:
        n //= 2
        count += 1
    return count
```

### Expected Results:
- **Detected**: O(log n)
- **Confidence**: 85%
- **Explanation**: "Logarithmic pattern (while n>1: n//=2) detected"

### Analysis Breakdown:
- `while n > 1` loop
- Division by 2 (`n //= 2`)
- Classic logarithmic pattern
- → Log complexity

---

## ✅ Test 3: C++ - Nested Loops (O(n²))

### Code:
```cpp
#include <iostream>
using namespace std;

int main() {
    int total = 0;
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            total += i * j;
        }
    }
    return 0;
}
```

### Expected Results:
- **Detected**: O(n²)
- **Confidence**: 90%
- **Explanation**: "Nested for-loops detected (depth 2)"

### Analysis Breakdown:
- Outer loop: `for(int i = 0; i < n; i++)`
- Inner loop: `for(int j = 0; j < n; j++)`
- Nesting depth = 2
- → Quadratic complexity

---

## ✅ Test 4: Python - Divide-and-Conquer (O(n log n))

### Code:
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result
```

### Expected Results:
- **Detected**: O(n log n)
- **Confidence**: 80%
- **Explanation**: "Recursive function 'merge_sort' with division (divide-and-conquer pattern)", "Linear work combined with divide-and-conquer → O(n log n)"

### Analysis Breakdown:
- Recursive function detected
- Division by 2 (`mid = len(arr) // 2`)
- Linear work in merge
- Master Theorem: T(n) = 2T(n/2) + O(n) → O(n log n)

---

## ✅ Test 5: C++ - Logarithmic Loop (O(log n))

### Code:
```cpp
#include <iostream>
using namespace std;

int main() {
    int count = 0;
    for(int i = 1; i <= n; i *= 2) {
        count++;
    }
    cout << count << endl;
    return 0;
}
```

### Expected Results:
- **Detected**: O(log n)
- **Confidence**: 85%
- **Explanation**: "Logarithmic loop pattern (i *= 2) detected"

### Analysis Breakdown:
- Loop with `i *= 2` (multiplicative increment)
- i doubles each iteration: 1, 2, 4, 8, ...
- Reaches n in log₂(n) iterations
- → Log complexity

---

## ✅ Test 6: Python - Triple Nested Loops (O(n³))

### Code:
```python
def triple_nested(n):
    total = 0
    for i in range(n):
        for j in range(n):
            for k in range(n):
                total += i * j * k
    return total
```

### Expected Results:
- **Detected**: O(n³)
- **Confidence**: 90%
- **Explanation**: "Triple nested loops detected (depth 3)"

### Analysis Breakdown:
- Three nested `for` loops
- Each iterates n times
- Total iterations: n × n × n = n³
- → Cubic complexity

---

## ✅ Test 7: Python - Exponential Recursion (O(2ⁿ))

### Code:
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

### Expected Results:
- **Detected**: O(2ⁿ)
- **Confidence**: 75%
- **Explanation**: "Recursive function 'fibonacci' with multiple recursive calls (likely exponential)"

### Analysis Breakdown:
- Two recursive calls: `fibonacci(n-1)` and `fibonacci(n-2)`
- Each call spawns two more calls
- Forms a binary tree of calls
- → Exponential complexity

---

## ✅ Test 8: Python - Constant Time (O(1))

### Code:
```python
def constant_operation(n):
    result = n * 2 + 5
    return result
```

### Expected Results:
- **Detected**: O(1)
- **Confidence**: 85%
- **Explanation**: "No loops or recursion detected"

### Analysis Breakdown:
- No loops
- No recursion
- Only arithmetic operations
- → Constant complexity

---

## ✅ Test 9: Python - Built-in Sort (O(n log n))

### Code:
```python
def sort_array(arr):
    arr.sort()
    return arr
```

### Expected Results:
- **Detected**: O(n log n)
- **Confidence**: 80%
- **Explanation**: "Built-in sort() or sorted() detected (O(n log n))"

### Analysis Breakdown:
- Uses Python's `sort()` method
- Known to be Timsort: O(n log n)
- Library function detection
- → Linearithmic complexity

---

## ✅ Test 10: C++ - std::sort (O(n log n))

### Code:
```cpp
#include <iostream>
#include <algorithm>
#include <vector>
using namespace std;

int main() {
    vector<int> arr(n);
    sort(arr.begin(), arr.end());
    return 0;
}
```

### Expected Results:
- **Detected**: O(n log n)
- **Confidence**: 80%
- **Explanation**: "std::sort detected (O(n log n))"

### Analysis Breakdown:
- Uses C++ `std::sort`
- Known to be Introsort: O(n log n)
- Library function detection
- → Linearithmic complexity

---

## ⚠️ Test 11: Python - Ambiguous/Inconclusive

### Code:
```python
def ambiguous(n, data):
    # Complexity depends on data structure operations
    for item in data:
        if item in some_set:  # O(1) or O(n) depending on implementation
            process(item)
```

### Expected Results:
- **Detected**: Inconclusive
- **Confidence**: < 50%
- **Explanation**: "Ambiguous code structure", "Unable to determine clear complexity pattern"
- **Note**: "Please simplify the code or provide a clearer snippet."

### Analysis Breakdown:
- Loop over `data` (unclear size)
- `item in some_set` - complexity depends on data structure
- Cannot determine without more context
- → Inconclusive

---

## ✅ Test 12: Python - Multiple Independent Loops (O(n))

### Code:
```python
def multiple_loops(n):
    total1 = 0
    for i in range(n):
        total1 += i
    
    total2 = 0
    for j in range(n):
        total2 += j
    
    return total1 + total2
```

### Expected Results:
- **Detected**: O(n)
- **Confidence**: 80%
- **Explanation**: "Multiple independent loops still result in O(n)"

### Analysis Breakdown:
- Two separate `for` loops
- Both iterate n times
- Not nested (sequential)
- O(n) + O(n) = O(n)
- → Linear complexity

---

## 📊 Summary Table

| Test | Pattern | Expected | Confidence |
|------|---------|----------|------------|
| 1 | Single loop | O(n) | 85% |
| 2 | while n//=2 | O(log n) | 85% |
| 3 | Nested loops | O(n²) | 90% |
| 4 | Divide-conquer | O(n log n) | 80% |
| 5 | i *= 2 loop | O(log n) | 85% |
| 6 | Triple nested | O(n³) | 90% |
| 7 | Multi-recursion | O(2ⁿ) | 75% |
| 8 | No loops | O(1) | 85% |
| 9 | Python sort() | O(n log n) | 80% |
| 10 | C++ std::sort | O(n log n) | 80% |
| 11 | Ambiguous | Inconclusive | <50% |
| 12 | Sequential loops | O(n) | 80% |

---

## 🧪 Testing Procedure

### Step 1: Start Application
```bash
cd backend
npm run dev

# New terminal
cd frontend
npm run dev
```

### Step 2: Open Browser
```
http://localhost:5173
```

### Step 3: For Each Test:
1. Copy the code from test example
2. Select correct language (Python or C++)
3. Paste into code textarea
4. Click "Analyze Complexity"
5. Verify:
   - ✅ Detected complexity matches expected
   - ✅ Confidence is within range
   - ✅ Explanation makes sense
   - ✅ Graph shows correct curve

### Step 4: Validate Results
- Check console output for analysis details
- Verify cyan curve appears on graph
- Confirm no errors in browser console

---

## 🎯 Confidence Thresholds

| Range | Interpretation |
|-------|----------------|
| 90-100% | Very confident (clear pattern) |
| 80-89% | Confident (strong match) |
| 70-79% | Moderate (heuristic match) |
| 60-69% | Low-moderate (uncertain) |
| < 60% | Inconclusive (ambiguous) |

---

## ✅ Quick Verification

All tests should:
- ✅ Complete without errors
- ✅ Return a complexity label
- ✅ Show confidence percentage
- ✅ Provide clear explanation
- ✅ Plot correct curve on graph

---

## 📝 Notes for Professor

### What the Static Analyzer Does:

1. **Syntax Validation**
   - Python: Uses `ast.parse()` to validate syntax
   - C++: Checks for basic structure (includes, main, braces)

2. **Pattern Detection**
   - Counts loops and nesting depth
   - Identifies logarithmic patterns (i*=2, n/=2)
   - Detects recursion and analyzes patterns
   - Recognizes library functions (sort)

3. **Complexity Mapping**
   - Maps detected patterns to Big-O notation
   - Applies Master Theorem for divide-and-conquer
   - Combines evidence for final classification

4. **Confidence Scoring**
   - Clear structural matches: 80-100%
   - Heuristic matches: 60-79%
   - Ambiguous patterns: <60% (Inconclusive)

### Educational Value:

- Students learn to recognize algorithmic patterns
- Instant feedback on code structure
- Explainable results (not black-box)
- Safe (no code execution required)

**Perfect for DAA coursework and demonstrations!** 🎓
