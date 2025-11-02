# 🧪 Regression Analysis - Test Guide

## 🚀 Quick Start

```bash
cd "C:\Users\Ryan Malhotra\CascadeProjects\Time_Complexitiy_Visualiser"
npm run dev
```

Open: **http://localhost:5173**

---

## ✅ Test 1: Valid O(n) Detection

### Code:
```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 1000;
    for(int i = 0; i < n; i++) {
        // linear operation
    }
    return 0;
}
```

### Steps:
1. Select **C++**
2. Paste code above
3. Click **Analyze Complexity**
4. Wait 2-3 seconds

### Expected Console Output:
```
Starting complexity analysis...
Language: cpp
Validating C++ syntax...
  ✓ C++ syntax validation passed
Running 25 test samples...
  Input sizes: 10 → 10000
  n=10: 0.01ms
  n=100: 0.10ms
  n=1000: 1.00ms
  n=10000: 10.00ms
Fitting complexity curves using regression...
  O(1): R² = 0.xxxx
  O(log n): R² = 0.xxxx
  O(n): R² = 0.98xx  ← Highest!
  O(n log n): R² = 0.xxxx
  O(n²): R² = 0.xxxx
  O(n³): R² = 0.xxxx
  O(2ⁿ): R² = 0.xxxx
  Best fit: O(n) with R² = 0.98xx
  Confidence: 98%
Analysis complete!
Detected: O(n)
Confidence: 98%
R² Score: 0.9823
```

### Expected UI:
- ✅ **Detected Complexity:** O(n)
- ✅ **Confidence:** 95-99%
- ✅ Cyan curve appears on graph
- ✅ Progress bar shows 95-99%

---

## ✅ Test 2: Valid O(log n) Detection

### Code:
```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 1000;
    for(int i = 1; i <= n; i *= 2) {
        // logarithmic operation
    }
    return 0;
}
```

### Expected:
- ✅ **Detected:** O(log n)
- ✅ **Confidence:** 85-95%
- ✅ **Console shows:** R² for O(log n) is highest

---

## ✅ Test 3: Valid O(n²) Detection

### Code:
```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 1000;
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            // nested operation
        }
    }
    return 0;
}
```

### Expected:
- ✅ **Detected:** O(n²)
- ✅ **Confidence:** 95-99%
- ✅ **Console shows:** R² for O(n²) is highest
- ✅ Parabolic curve on graph

---

## ❌ Test 4: Invalid C++ - No main()

### Code:
```cpp
#include <iostream>
for(int i = 0; i < 10; i++) {
    cout << i;
}
```

### Expected Console Output:
```
Starting complexity analysis...
Language: cpp
Validating C++ syntax...
  ✗ Validation failed: Missing main() function
```

### Expected UI:
- ❌ **Error message:** "Missing main() function"
- ❌ No complexity shown
- ❌ No curve added to graph

---

## ❌ Test 5: Invalid C++ - Unbalanced Braces

### Code:
```cpp
#include <iostream>
using namespace std;

int main() {
    for(int i = 0; i < 10; i++) {
        cout << i;
    }
    // Missing closing brace for main
```

### Expected Console Output:
```
Starting complexity analysis...
Language: cpp
Validating C++ syntax...
  ✗ Validation failed: Unbalanced braces: missing closing braces
```

### Expected UI:
- ❌ **Error:** "Unbalanced braces: missing closing braces"

---

## ❌ Test 6: Invalid C++ - No Semicolons

### Code:
```cpp
#include <iostream>
int main() {
    int x = 5
    return 0
}
```

### Expected:
- ❌ **Error:** "No statements found (missing semicolons)"

---

## ⚠️ Test 7: Low Confidence (if possible)

### Code (ambiguous pattern):
```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 1000;
    int x = 0;
    if (n > 500) {
        for(int i = 0; i < n; i++) {
            x += i;
        }
    } else {
        for(int i = 0; i < n*n; i++) {
            x += i;
        }
    }
    return 0;
}
```

### Expected (if confidence < 70%):
- ⚠️ **Detected:** "Unable to determine"
- ⚠️ **Confidence:** < 70%
- ⚠️ **Explanation:** "Unable to determine complexity accurately. Confidence too low (<70%)."

**Note:** This test may still detect successfully depending on simulation.

---

## ✅ Test 8: Python O(n) Detection

### Code:
```python
def linear_search(arr):
    for i in arr:
        if i == target:
            return i
    return None
```

### Expected Console:
```
Starting complexity analysis...
Language: python
Validating Python syntax...
  ✓ Python syntax validation passed
Running 25 test samples...
...
Detected: O(n)
Confidence: 95%+
```

### Expected UI:
- ✅ **Detected:** O(n)
- ✅ **Confidence:** 90-98%

---

## ✅ Test 9: Python O(n²) Detection

### Code:
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
```

### Expected:
- ✅ **Detected:** O(n²)
- ✅ **Confidence:** 95-99%

---

## 📊 Verification Checklist

### Backend Console:
- [ ] Shows "Validating C++ syntax..."
- [ ] Shows "✓ C++ syntax validation passed" for valid code
- [ ] Shows "✗ Validation failed: ..." for invalid code
- [ ] Shows "Running 25 test samples..."
- [ ] Shows "Input sizes: 10 → 10000"
- [ ] Shows R² values for all 7 complexity types
- [ ] Shows "Best fit: O(x) with R² = ..."
- [ ] Shows final confidence percentage

### Frontend UI:
- [ ] Valid code shows detected complexity
- [ ] Confidence bar displays correctly
- [ ] Invalid code shows error message
- [ ] Low confidence shows "Unable to determine"
- [ ] Graph updates with cyan curve (if valid)
- [ ] No curve added if error or unable to determine
- [ ] Dark mode still works

### Timing:
- [ ] Analysis completes in 2-3 seconds
- [ ] Faster than 40-60 second method
- [ ] Shows progress during analysis

---

## 🔍 Console Output Details

### Valid Analysis:
```
Starting complexity analysis...          ← Start
Language: cpp                            ← Language check
Validating C++ syntax...                 ← Validation start
  ✓ C++ syntax validation passed         ← Validation passed
Running 25 test samples...               ← Test execution
  Input sizes: 10 → 10000                ← Range info
  n=10: 0.01ms                           ← Sample results
  n=50: 0.25ms
  n=100: 1.00ms
  n=500: 25.00ms
  n=1000: 100.00ms
  n=5000: 2500.00ms
  n=10000: 10000.00ms
Fitting complexity curves using regression...  ← Regression start
  O(1): R² = 0.3245                      ← R² for each function
  O(log n): R² = 0.5678
  O(n): R² = 0.9823                      ← Best fit!
  O(n log n): R² = 0.8765
  O(n²): R² = 0.7234
  O(n³): R² = 0.4567
  O(2ⁿ): R² = 0.2345
  Best fit: O(n) with R² = 0.9823        ← Winner
  Confidence: 98%                         ← Confidence
Analysis complete!                        ← Done
Detected: O(n)                            ← Final result
Confidence: 98%
R² Score: 0.9823
```

### Invalid Code:
```
Starting complexity analysis...
Language: cpp
Validating C++ syntax...
  ✗ Validation failed: Missing main() function  ← Error
```

---

## 🎯 Key Behaviors to Verify

### 1. Logarithmic Pattern
```cpp
for(int i = 1; i <= n; i *= 2)  // i *= 2 pattern
```
**Must detect:** O(log n)

### 2. Nested Loops
```cpp
for(int i = 0; i < n; i++) {
    for(int j = 0; j < n; j++) {
        // ...
    }
}
```
**Must detect:** O(n²)

### 3. Binary Search Pattern
```python
while left <= right:
    mid = (left + right) // 2
```
**Must detect:** O(log n)

### 4. Linear Loop
```cpp
for(int i = 0; i < n; i++)
```
**Must detect:** O(n)

---

## 📈 Expected R² Patterns

For well-defined code:

| Complexity | Expected R² |
|-----------|------------|
| O(1) | 0.20-0.40 |
| **O(log n)** | **0.85-0.95** (if log pattern) |
| **O(n)** | **0.95-0.99** (if linear) |
| O(n log n) | 0.80-0.90 |
| **O(n²)** | **0.95-0.99** (if nested) |
| O(n³) | 0.40-0.60 |
| O(2ⁿ) | 0.20-0.40 |

The correct complexity should have the **highest R²**.

---

## 🐛 Common Issues

### Issue: All R² values are low
**Cause:** Code pattern unclear or mixed complexities  
**Result:** May show "Unable to determine"

### Issue: Wrong complexity detected
**Possible causes:**
1. Simulation doesn't match actual pattern
2. Test range too small
3. Mixed complexity patterns in code

**Check:** Look at R² values - are they all close? (e.g., 0.7-0.8)

### Issue: Validation fails unexpectedly
**Check:**
- Is there a `main()` function?
- Are all braces balanced?
- Are there semicolons?

---

## ⏱️ Performance Expectations

| Test Type | Expected Time |
|----------|--------------|
| Validation | < 0.1s |
| Valid analysis | 2-3s |
| Invalid code | < 0.5s |
| Low confidence | 2-3s |

---

## ✅ Success Criteria

**All must pass:**

1. ✅ Valid O(n) code detects as O(n) with 95%+ confidence
2. ✅ Valid O(n²) code detects as O(n²) with 95%+ confidence
3. ✅ Valid O(log n) code detects as O(log n) with 85%+ confidence
4. ✅ Invalid code (no main) shows error message
5. ✅ Invalid code (unbalanced braces) shows error message
6. ✅ Console shows 25 test samples
7. ✅ Console shows R² values for all 7 functions
8. ✅ Analysis completes in 2-3 seconds
9. ✅ UI displays confidence percentage
10. ✅ Graph updates with detected curve

---

## 🎉 Quick Smoke Test (5 minutes)

1. **Test valid O(n)** → Should show O(n) with 95%+ confidence ✓
2. **Test valid O(n²)** → Should show O(n²) with 95%+ confidence ✓
3. **Test invalid (no main)** → Should show error ✓
4. **Check console** → Should show 25 samples and R² values ✓
5. **Check timing** → Should complete in 2-3 seconds ✓

**If all pass → Regression analysis working!** 🚀
