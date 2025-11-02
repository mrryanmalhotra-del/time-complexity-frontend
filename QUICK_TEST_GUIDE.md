# 🧪 Quick Test Guide - Accuracy Improvements

## 🚀 How to Run

```bash
cd "C:\Users\Ryan Malhotra\CascadeProjects\Time_Complexitiy_Visualiser"
npm run dev
```

Open: **http://localhost:5173**

---

## ✅ What to Test

### 1. Check Graph Y-Axis
- Look at the graph
- Y-axis should say: **"Growth Rate (f(n))"**
- ✅ Correct if it shows this instead of "Operations (log scale)"

---

### 2. Test C++ Validation

#### Valid C++ (Should Work):
```cpp
#include <iostream>
using namespace std;

int main() {
    int n = 1000;
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            // nested loop
        }
    }
    return 0;
}
```

**Expected:**
- ✅ Analyzes successfully
- ✅ Detects O(n²)
- ✅ Shows confidence level

#### Invalid C++ (Should Fail):
```cpp
#include <iostream>
for(int i = 0; i < 10; i++) {
    cout << i;
```

**Expected:**
- ❌ Shows: "⚠️ Invalid code detected. Please enter a valid C++ snippet for analysis."

---

### 3. Test Improved Detection

#### Test O(n) Detection:
```python
def linear_search(arr, target):
    for item in arr:
        if item == target:
            return True
    return False
```

**Expected:**
- Complexity: O(n)
- Confidence: High
- Takes ~30-45 seconds to analyze

#### Test O(n²) Detection:
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
```

**Expected:**
- Complexity: O(n²)
- Confidence: High
- Takes ~30-45 seconds to analyze

#### Test O(log n) Detection:
```python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
```

**Expected:**
- Complexity: O(log n) or O(n)
- Confidence: Medium to High
- Takes ~30-45 seconds to analyze

---

### 4. Check Backend Console

While analyzing, check the terminal where backend is running.

**You should see:**
```
Starting enhanced complexity analysis...
Testing with 85 data points...
  n=1000: 15.34ms (±1.23ms)
  n=2000: 31.67ms (±2.01ms)
  n=5000: 78.45ms (±3.45ms)
  n=10000: 156.78ms (±5.67ms)
  O(1): MSE = 0.8542
  O(log n): MSE = 0.4231
  O(n): MSE = 0.0123
  O(n log n): MSE = 0.0456
  O(n²): MSE = 0.1234
  O(2ⁿ): MSE = 2.3456
  O(n!): MSE = 3.4567
  Best fit: O(n) with error 0.0123
  Confidence: High
Detected complexity: O(n)
Confidence: High
```

**Key Things to Check:**
- ✅ "Testing with 85 data points" (not 5)
- ✅ Shows MSE for all 7 complexity types
- ✅ Shows confidence level (High/Medium/Low)
- ✅ Takes longer than before (~30-45 seconds)

---

### 5. Check Confidence Display

After analysis, the sidebar should show:

**High Confidence:**
```
Detected Complexity: O(n)
Confidence: High
```

**Low Confidence:**
```
Detected Complexity: O(n)
Confidence: Low Confidence
```

**Note:** If measurements are inconsistent or too small, it shows "Low Confidence" instead of a percentage.

---

## ⚡ Quick Checklist

- [ ] Y-axis says "Growth Rate (f(n))"
- [ ] Invalid C++ shows validation error
- [ ] Valid C++ analyzes successfully
- [ ] Analysis takes ~30-45 seconds (slower than before)
- [ ] Backend console shows 85 data points
- [ ] Backend console shows MSE for all complexities
- [ ] Confidence shows as High/Medium/Low
- [ ] O(n²) code correctly detected
- [ ] O(n) code correctly detected
- [ ] Multiple runs visible in console (±stdDev shown)

---

## 🐛 Troubleshooting

### Backend not showing enhanced output:
**Fix:** Restart the backend
```bash
# Stop with Ctrl+C, then:
cd backend
npm run dev
```

### Frontend not validating C++:
**Fix:** Clear browser cache and refresh

### Analysis taking too long (> 2 minutes):
**Normal:** 85 test points × 3 runs = slower
**If > 2 min:** Check backend console for errors

---

## 📊 Comparison: Before vs After

| Feature | Before | After |
|---------|--------|-------|
| Test Points | 5 | 85 |
| Runs per test | 1 | 3 |
| Analysis Time | 5-10s | 30-45s |
| Y-axis Label | Operations (log scale) | Growth Rate (f(n)) |
| C++ Validation | Basic | Enhanced (main, braces, semicolons) |
| Confidence | Percentage only | High/Medium/Low/Low Confidence |
| Detection Method | Slope mapping | Least-squares against all functions |

---

## 🎯 Success Criteria

**If ALL of these are true, improvements are working:**

1. ✅ Graph Y-axis says "Growth Rate (f(n))"
2. ✅ Backend logs show "Testing with 85 data points"
3. ✅ Backend logs show MSE for O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ), O(n!)
4. ✅ Analysis takes 30-45 seconds (not 5-10 seconds)
5. ✅ Invalid C++ code gets validation error
6. ✅ Valid C++ code analyzes successfully
7. ✅ Confidence displays as text level (High/Medium/Low)
8. ✅ Console shows ±stdDev for measurements

---

## 🎉 You're Done!

Your Algorithm Complexity Visualizer now has:
- ✅ **85 test points** for better accuracy
- ✅ **Multiple runs** to reduce noise
- ✅ **Least-squares regression** for proper fitting
- ✅ **Enhanced C++ validation** for better error handling
- ✅ **Improved confidence metrics** to trust results
- ✅ **Better graph labels** for clarity

**Ready for accurate complexity analysis!** 🚀
