# 🧪 Pattern Detection - Quick Test Guide

## 🚀 Start the App

```bash
cd "C:\Users\Ryan Malhotra\CascadeProjects\Time_Complexitiy_Visualiser"
npm run dev
```

Open: **http://localhost:5173**

---

## ⚡ Notice: Instant Analysis

Analysis now completes in **< 1 second** instead of 40-60 seconds!

---

## ✅ Test 1: O(n) Linear Detection

### Code:
```python
def linear_search(arr):
    for i in arr:
        if i == target:
            return i
    return None
```

### Steps:
1. Select **Python**
2. Paste code
3. Click **Analyze Complexity**
4. Wait **< 1 second**

### Expected:
✅ **Detected:** O(n)  
✅ **Explanation:** "Linear loop detected"  
✅ **Confidence:** 85%  
✅ **Time:** Instant!  
✅ **Graph:** Cyan line showing linear growth  

### Console Output:
```
Analyzing code patterns...
  Loops: 1, Nested depth: 1
  → Detected: O(n) (Linear loop detected)
Generating growth values for O(n)...
  Generated 101 data points
Detected: O(n)
Confidence: 85.0%
```

---

## ✅ Test 2: O(n²) Quadratic Detection

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
✅ **Detected:** O(n²)  
✅ **Explanation:** "Nested loops detected"  
✅ **Confidence:** 95%  
✅ **Graph:** Parabolic curve  

### Console Output:
```
Analyzing code patterns...
  Loops: 2, Nested depth: 2
  → Detected: O(n²) (Nested loops detected)
Detected: O(n²)
Confidence: 95.0%
```

---

## ✅ Test 3: O(log n) Logarithmic Detection

### Code:
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

### Expected:
✅ **Detected:** O(log n)  
✅ **Explanation:** "Logarithmic pattern detected"  
✅ **Confidence:** 75%  
✅ **Graph:** Flat logarithmic curve  

### Console Output:
```
Analyzing code patterns...
  Loops: 1, Nested depth: 1
  Log pattern: true
  → Detected: O(log n) (Logarithmic pattern detected)
```

---

## ✅ Test 4: O(n log n) Divide-and-Conquer

### Code:
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)
```

### Expected:
✅ **Detected:** O(n log n)  
✅ **Explanation:** "Divide-and-conquer pattern detected"  
✅ **Confidence:** 85%  

### Console Output:
```
Analyzing code patterns...
  Recursion: true, Calls: 2
  Log pattern: true, Divide-conquer: true
  → Detected: O(n log n) (Divide-and-conquer pattern detected)
```

---

## ✅ Test 5: O(2ⁿ) Exponential

### Code:
```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)
```

### Expected:
✅ **Detected:** O(2ⁿ)  
✅ **Explanation:** "Multiple recursive calls detected (exponential)"  
✅ **Confidence:** 80%  
✅ **Graph:** Steep exponential curve (normalized)  

### Console Output:
```
Analyzing code patterns...
  Recursion: true, Calls: 2
  → Detected: O(2ⁿ) (Multiple recursive calls detected)
```

---

## ✅ Test 6: O(n³) Cubic

### Code:
```cpp
for(int i = 0; i < n; i++) {
    for(int j = 0; j < n; j++) {
        for(int k = 0; k < n; k++) {
            // triple nested
        }
    }
}
```

### Expected:
✅ **Detected:** O(n³)  
✅ **Explanation:** "Triple nested loops detected"  
✅ **Confidence:** 95%  

---

## ✅ Test 7: O(1) Constant

### Code:
```python
def constant_time(n):
    return n * 2 + 5
```

### Expected:
✅ **Detected:** O(1)  
✅ **Explanation:** "No loops or recursion detected"  
✅ **Confidence:** 75%  
✅ **Graph:** Horizontal line at y=1  

---

## 🔍 What to Check

### 1. Speed
- [ ] Analysis completes in **< 1 second**
- [ ] NO "Testing with 105 data points..."
- [ ] Instant feedback

### 2. Console Output
Open backend terminal and verify:
- [ ] Shows "Analyzing code patterns..."
- [ ] Shows loop count and nesting depth
- [ ] Shows detected complexity with explanation
- [ ] Shows "Generated ~101 data points"
- [ ] NO timing measurements
- [ ] NO MSE calculations

### 3. Frontend Display
- [ ] Shows detected complexity
- [ ] Shows confidence percentage
- [ ] Shows explanation (e.g., "Nested loops detected")
- [ ] Cyan curve appears on graph instantly
- [ ] Y-axis says "Growth Rate (f(n))"

### 4. Graph Behavior
- [ ] Detected curve shows mathematical growth
- [ ] Linear code → straight diagonal line
- [ ] Quadratic code → parabolic curve
- [ ] Log code → flat logarithmic curve
- [ ] Exponential → steep curve (normalized)

---

## 📊 Expected Console Format

**New Format:**
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

**NOT This (old timing format):**
```
Testing with 105 data points...
  n=1000: 15.34ms (±1.23ms)
  O(1): MSE = 0.8xxxxx
```

---

## ⚠️ Common Patterns

### Single Loop → O(n)
```python
for i in range(n):
    pass
```

### Nested Loop → O(n²)
```python
for i in range(n):
    for j in range(n):
        pass
```

### Divide by 2 → O(log n)
```python
while n > 1:
    n = n // 2
```

### Binary/Mid → O(log n)
```python
mid = (left + right) // 2
```

### Recursion + Mid → O(n log n)
```python
def sort(arr):
    mid = len(arr) // 2
    sort(arr[:mid])
    sort(arr[mid:])
```

### Two Recursive Calls → O(2ⁿ)
```python
def fib(n):
    return fib(n-1) + fib(n-2)
```

---

## 🐛 Troubleshooting

### Issue: Still takes 40-60 seconds
**Fix:** Backend not restarted. Stop (Ctrl+C) and restart:
```bash
cd backend
npm run dev
```

### Issue: Console shows timing measurements
**Fix:** Old backend code still running. Hard restart:
```bash
# Kill all node processes
taskkill /F /IM node.exe
# Restart
npm run dev
```

### Issue: No cyan curve appears
**Check:**
1. Backend running?
2. Analysis completed successfully?
3. Check browser console (F12) for errors
4. Try refreshing page (Ctrl+Shift+R)

### Issue: Wrong complexity detected
**Possible reasons:**
1. Ambiguous code pattern
2. Pattern detection rules need refinement
3. Check console to see what patterns were detected
4. Some code structures are hard to classify

---

## 🎯 Success Checklist

All should be true:

- [x] Analysis completes instantly (< 1 second)
- [x] Console shows pattern analysis output
- [x] Console does NOT show timing measurements
- [x] Linear loop detected as O(n)
- [x] Nested loops detected as O(n²)
- [x] Binary search detected as O(log n)
- [x] Cyan curve appears on graph
- [x] Graph shows mathematical growth
- [x] Y-axis says "Growth Rate (f(n))"
- [x] Explanation shown below confidence

---

## 📈 Graph Interpretation

### What You're Seeing Now:

**Before (Timing-Based):**
- Y-axis showed "Operations (log scale)"
- Plotted measured execution times
- Values were timing measurements

**After (Pattern-Based):**
- Y-axis shows "Growth Rate (f(n))"
- Plots pure mathematical functions
- Values are f(n) = n², n log n, etc.

### Example: O(n²)

**Mathematical values:**
```
n=1    → f(n) = 1² = 1
n=10   → f(n) = 10² = 100
n=100  → f(n) = 100² = 10,000
n=1000 → f(n) = 1000² = 1,000,000
```

These are the actual values plotted, not timing data!

---

## 🎉 Quick Smoke Test (2 minutes)

1. **Start app** → http://localhost:5173 ✓
2. **Paste linear loop** → Python code with one for loop ✓
3. **Click Analyze** → Completes instantly ✓
4. **Check detection** → Shows "O(n)" ✓
5. **Check explanation** → Shows "Linear loop detected" ✓
6. **Check graph** → Cyan line appears ✓
7. **Check console** → Shows pattern analysis (no timings) ✓
8. **Done!** → Pattern detection working! 🎉

---

## 💡 Pro Tips

1. **Speed Test:** Previous analysis took 40-60s. If it's still slow, backend needs restart.

2. **Pattern Clarity:** The more obvious the pattern, the higher the confidence:
   - Nested loops = 95% confidence
   - Single loop = 85% confidence
   - Logarithmic = 75% confidence

3. **Graph Curves:** Detected curves are fixed (don't change with slider). Default curves still update dynamically.

4. **Explanations:** Read the explanation text to understand why a complexity was detected.

---

## 🎓 Understanding the Shift

### Old Approach (Empirical):
"Run the code and see how long it takes, then fit to curves"

### New Approach (Analytical):
"Look at the code structure and identify the growth pattern directly"

**Analogy:**
- **Before:** Like timing a car's 0-60mph to guess its engine size
- **After:** Like opening the hood and looking at the engine directly

**Result:** Faster, more accurate, and shows pure mathematical growth!

---

## ✅ Final Verification

Run all 7 test cases above and verify:
- ✅ All complete instantly
- ✅ All show correct complexity
- ✅ All show clear explanations
- ✅ All plot mathematical curves
- ✅ Console shows pattern analysis

**If all pass → Pattern detection is working perfectly!** 🚀
