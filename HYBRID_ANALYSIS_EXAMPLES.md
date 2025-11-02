# 🔬 Hybrid Analysis - Test Examples

## Test Cases for Empirical + Static Complexity Detection

---

## ✅ Test 1: Python - Single Loop (O(n))

### Code:
```python
def linear_search(n):
    total = 0
    for i in range(n):
        total += i
    return total
```

### Expected Results:

**Empirical:**
- Detected: `O(n)`
- Confidence: 90-95%
- NMSE: ~0.02-0.05

**Static:**
- Detected: `O(n)`
- Confidence: 70%
- Explanation: "Single loop detected."

**Combined Verdict:**
- Result: `O(n)`
- Final Confidence: 85-90%
- Reason: "Empirical and static analysis agree on O(n)."

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

**Empirical:**
- Detected: `O(log n)`
- Confidence: 85-95%
- NMSE: ~0.03-0.06

**Static:**
- Detected: `O(log n)`
- Confidence: 75%
- Explanation: "Logarithmic loop pattern detected (division or multiplication by 2)."

**Combined Verdict:**
- Result: `O(log n)`
- Final Confidence: 82-90%
- Reason: "Empirical and static analysis agree on O(log n)."

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

**Empirical:**
- Detected: `O(n²)`
- Confidence: 95-99%
- NMSE: ~0.01-0.03

**Static:**
- Detected: `O(n²)`
- Confidence: 90%
- Explanation: "Nested for-loops detected."

**Combined Verdict:**
- Result: `O(n²)`
- Final Confidence: 93-96%
- Reason: "Empirical and static analysis agree on O(n²)."

---

## ✅ Test 4: Python - Exponential (O(2ⁿ))

### Code:
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

### Expected Results:

**Empirical:**
- Detected: `O(2ⁿ)` or `O(n)` (may vary based on memoization)
- Confidence: 75-85%
- NMSE: ~0.05-0.15

**Static:**
- Detected: `O(2ⁿ)`
- Confidence: 75%
- Explanation: "Recursive function with multiple recursive calls detected."

**Combined Verdict:**
- Result: `O(2ⁿ)` (if static wins) or may be inconclusive
- Final Confidence: 75-85%
- Reason: Depends on empirical measurement accuracy

---

## ✅ Test 5: Python - Merge Sort (O(n log n))

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

**Empirical:**
- Detected: `O(n log n)`
- Confidence: 85-95%
- NMSE: ~0.03-0.08

**Static:**
- Detected: `O(n log n)`
- Confidence: 70%
- Explanation: "Sorting algorithm detected."

**Combined Verdict:**
- Result: `O(n log n)`
- Final Confidence: 80-92%
- Reason: "Empirical and static analysis agree on O(n log n)."

---

## ✅ Test 6: C++ - Logarithmic Loop (O(log n))

### Code:
```cpp
#include <iostream>
using namespace std;

int main() {
    int count = 0;
    for(int i = 1; i <= n; i *= 2) {
        count++;
    }
    return 0;
}
```

### Expected Results:

**Empirical:**
- Detected: `O(log n)`
- Confidence: 85-95%
- NMSE: ~0.03-0.06

**Static:**
- Detected: `O(log n)`
- Confidence: 80%
- Explanation: "Logarithmic loop pattern (i*=2 or n/=2)."

**Combined Verdict:**
- Result: `O(log n)`
- Final Confidence: 83-92%
- Reason: "Empirical and static analysis agree on O(log n)."

---

## ⚠️ Test 7: Disagreement - Empirical vs Static

### Code:
```python
def mixed_complexity(n):
    # Looks like O(n) but has hidden quadratic behavior
    total = 0
    for i in range(n):
        # Hidden nested operation
        temp = list(range(n))  # O(n) operation in each iteration
        total += sum(temp)
    return total
```

### Expected Results:

**Empirical:**
- Detected: `O(n²)` (measures actual runtime)
- Confidence: 90-95%
- NMSE: ~0.02-0.05

**Static:**
- Detected: `O(n)` (sees single loop)
- Confidence: 70%
- Explanation: "Single loop detected."

**Combined Verdict:**
- Result: `O(n²)` (empirical has higher confidence)
- Final Confidence: 90%
- Reason: "Empirical analysis has higher confidence (90% vs 70%)."
- **OR if both medium confidence:**
- Result: `Inconclusive`
- Reason: "Empirical (O(n²)) and static (O(n)) analyses disagree with medium confidence. Both models shown."
- **Graph:** Shows both yellow (empirical O(n²)) and blue (static O(n)) curves

---

## 🧪 Testing Instructions

### How to Test:

1. **Start Backend:**
```bash
cd backend
npm run dev
```

2. **Start Frontend:**
```bash
cd frontend
npm run dev
```

3. **For Each Test:**
   - Paste code into the text area
   - Select correct language (Python or C++)
   - Click "Analyze Complexity"
   - Wait 5-15 seconds for hybrid analysis
   - Check results match expected values

### What to Verify:

✅ **Empirical Section (Yellow):**
- Shows detected complexity
- Displays confidence percentage
- Shows NMSE value

✅ **Static Section (Blue):**
- Shows detected complexity
- Displays confidence percentage
- Shows explanation text

✅ **Combined Verdict (Green):**
- Shows final complexity
- Displays combined confidence
- Shows verdict reason

✅ **Graph:**
- When agreement: Single cyan curve
- When disagreement: Yellow + blue curves

---

## 📊 Expected Confidence Ranges

| Scenario | Empirical | Static | Combined |
|----------|-----------|--------|----------|
| **Agreement (High)** | 85-95% | 80-90% | 84-93% |
| **Agreement (Medium)** | 70-85% | 60-80% | 67-83% |
| **Disagreement (Emp wins)** | 85-95% | 60-75% | 85-95% |
| **Disagreement (Static wins)** | 60-75% | 85-95% | 85-95% |
| **Inconclusive** | 60-85% | 60-85% | 60-85% |

---

## ⏱️ Expected Analysis Times

| Complexity | Samples | Expected Time |
|-----------|---------|---------------|
| O(1) | 25 | 2-5 seconds |
| O(log n) | 25 | 3-6 seconds |
| O(n) | 25 | 5-10 seconds |
| O(n log n) | 25 | 8-15 seconds |
| O(n²) | 25 | 15-30 seconds |
| O(n³) | 25 | 30-45 seconds |
| O(2ⁿ) | 25 | 5-15 seconds (capped n) |

**Note:** Times may vary based on system performance.

---

## 🚨 Safety Features

### Timeout Protection:

✅ **Per-run timeout:** 1 second
- If single execution exceeds 1s → skip that sample

✅ **Total timeout:** 45 seconds
- If total analysis exceeds 45s → return partial results

✅ **n_max cap:** 1000
- Any n_max > 1000 → automatically capped
- User sees: "Note: n limited to 1000 for safe execution."

### Error Handling:

✅ **Invalid language:**
- Error: "Only C++ and Python are supported."

✅ **Missing code:**
- Error: "Code and language are required"

✅ **Syntax errors:**
- Caught during execution
- Partial results returned if possible

---

## 🎯 Verdict Logic

### Agreement (both detect same complexity):
```
Combined Confidence = 0.6 × Empirical + 0.4 × Static
Result = Agreed complexity
```

### Disagreement (one has ≥85% confidence):
```
Result = High confidence result
Combined Confidence = High confidence value
```

### Both medium (60-85% confidence):
```
Result = "Inconclusive"
Show both curves on graph (yellow + blue)
Combined Confidence = Average
```

---

## 📝 Console Output Examples

### Successful Analysis:
```
=== HYBRID COMPLEXITY ANALYSIS ===
  Language: python
  Max n: 1000
Starting empirical analysis...
  Language: python
  Max n: 1000
  Samples: 25
  n=10: 0.023ms
  n=50: 0.156ms
  n=100: 0.412ms
  ...
  Empirical result: O(n) (confidence: 92%)
Static analysis (Python)...
  Static result: O(n) (confidence: 70%)
Comparing results...
  Empirical: O(n) (92%)
  Static: O(n) (70%)

Final verdict: O(n) (84%)
Reason: Empirical and static analysis agree on O(n).
=== ANALYSIS COMPLETE ===
```

### Disagreement:
```
Comparing results...
  Empirical: O(n²) (90%)
  Static: O(n) (70%)

Final verdict: O(n²) (90%)
Reason: Empirical analysis has higher confidence (90% vs 70%).
```

---

## ✅ Success Checklist

Test all examples and verify:

- [ ] Python O(n) detects correctly
- [ ] Python O(log n) detects correctly
- [ ] C++ O(n²) detects correctly
- [ ] Python O(2ⁿ) detects (may be inconclusive)
- [ ] Python O(n log n) detects correctly
- [ ] C++ O(log n) detects correctly
- [ ] Disagreement case shows both curves
- [ ] n_max > 1000 shows warning
- [ ] Timeout protection works
- [ ] All UI elements display correctly
- [ ] Dark mode works for all sections
- [ ] Empirical section shows NMSE
- [ ] Static section shows explanation
- [ ] Combined verdict shows reason

---

## 🎓 Understanding Results

### NMSE (Normalized Mean Squared Error):
- **< 0.05** - Excellent fit
- **0.05 - 0.10** - Good fit
- **0.10 - 0.20** - Fair fit
- **> 0.20** - Poor fit

### Confidence Interpretation:
- **90-100%** - Very confident
- **75-90%** - Confident
- **60-75%** - Moderate confidence
- **< 60%** - Low confidence

### When to Trust Results:
- ✅ Both agree + high confidence → Very reliable
- ✅ Empirical high confidence → Reliable (actual measurement)
- ⚠️ Static only high → Moderate (heuristic-based)
- ❌ Both low confidence → Unreliable

---

## 🔧 Troubleshooting

### Issue: Analysis takes too long
**Cause:** Code has high complexity (O(n³) or worse)
**Solution:** Will timeout after 45 seconds with partial results

### Issue: Empirical detects O(1) for everything
**Cause:** Code execution too fast to measure
**Solution:** Add more work in loops, or accept O(1) if truly constant

### Issue: Static always detects wrong complexity
**Cause:** Complex code patterns not recognized
**Solution:** Trust empirical result (it measures actual runtime)

### Issue: "Only C++ and Python are supported"
**Cause:** Selected wrong language or API issue
**Solution:** Ensure language is exactly "python" or "cpp"

---

## 🎉 Summary

The hybrid analysis combines:
- **Empirical profiling** - Measures actual runtime
- **Static analysis** - Analyzes code structure
- **Intelligent comparison** - Chooses best result

**Result:** More accurate and reliable complexity detection! 🚀
