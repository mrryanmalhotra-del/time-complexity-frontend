# 🧪 Algorithm Update - Quick Test Guide

## 🚀 Start the App

```bash
cd "C:\Users\Ryan Malhotra\CascadeProjects\Time_Complexitiy_Visualiser"
npm run dev
```

Open: **http://localhost:5173**

---

## ✅ Test 1: O(n) Linear Detection

### Code to Test:
```python
def linear_function(arr):
    for i in range(len(arr)):
        pass
```

### Steps:
1. Select **Python**
2. Paste the code
3. Click **Analyze Complexity**
4. Wait ~40-60 seconds

### Expected Results:
✅ **Console Output:**
```
Testing with 105 data points...
  O(1): MSE = 0.8xxxxx
  O(log n): MSE = 0.4xxxxx
  O(n): MSE = 0.01xxxx  ← Lowest!
  O(n log n): MSE = 0.05xxxx
  O(n²): MSE = 0.12xxxx
  Best fit: O(n) with MSE 0.01xxxx
  Confidence: 90%+
```

✅ **UI Display:**
- Detected Complexity: **O(n)**
- Confidence: **90-95%**
- Cyan curve appears on graph

✅ **Graph:**
- Cyan line shows linear growth
- Matches theoretical O(n) curve

---

## ✅ Test 2: O(n²) Quadratic Detection

### Code to Test:
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

### Expected Results:
✅ **Console Output:**
```
  O(n²): MSE = 0.01xxxx  ← Lowest!
  Best fit: O(n²)
  Confidence: 90%+
```

✅ **UI Display:**
- Detected Complexity: **O(n²)**
- Confidence: **90-95%**

✅ **Graph:**
- Cyan curve shows quadratic growth
- Steeper than linear curves

---

## ✅ Test 3: O(log n) Logarithmic Detection

### Code to Test:
```python
def binary_search_pattern(n):
    while n > 1:
        n = n // 2
```

### Expected Results:
✅ **Console Output:**
```
  O(log n): MSE = 0.02xxxx  ← Lowest or second lowest
  Best fit: O(log n)
  Confidence: 70-85%
```

✅ **UI Display:**
- Detected Complexity: **O(log n)** or **O(n)**
- Confidence: **70-85%**

✅ **Graph:**
- Cyan curve shows logarithmic growth
- Much flatter than linear

**Note:** Log detection may vary due to simulation. Real code execution would be more accurate.

---

## 🔍 What to Check

### 1. Backend Console
Open the terminal where backend is running:

✅ Should see:
```
Testing with 105 data points...
```
NOT "Testing with 85 data points"

✅ Should see MSE for all 7 complexities:
```
  O(1): MSE = ...
  O(log n): MSE = ...
  O(n): MSE = ...
  O(n log n): MSE = ...
  O(n²): MSE = ...
  O(2ⁿ): MSE = ...
  O(n!): MSE = ...
```

✅ Should see best fit selection:
```
  Best fit: O(n) with MSE 0.012345
  Confidence: 93.8%
```

### 2. Graph Display

✅ **Y-axis label:**
- Should say: **"Growth Rate (f(n))"**
- NOT "Operations (log scale)"

✅ **Detected curve:**
- Cyan/turquoise color (#06b6d4)
- Appears after analysis completes
- Fixed points (doesn't change with slider)

✅ **Existing curves:**
- Still work normally
- Update with slider
- Different colors

### 3. Sidebar Results

✅ **Shows:**
```
Detected Complexity: O(n)
Confidence: 93%
```

✅ **Added to graph:**
- "Detected: O(n)" appears in custom complexities section
- Can be removed with X button

---

## 📊 Verification Matrix

| Code Type | Expected Detection | MSE Range | Confidence |
|-----------|-------------------|-----------|------------|
| Single loop | O(n) | < 0.05 | 85-95% |
| Nested loop | O(n²) | < 0.05 | 85-95% |
| Log pattern | O(log n) | < 0.10 | 70-85% |
| Merge sort | O(n log n) | < 0.08 | 75-90% |
| Constant | O(1) | < 0.05 | 85-95% |

---

## ⏱️ Performance Check

✅ **Analysis time:** 40-60 seconds (slower than before, but more accurate!)

Why longer?
- 105 test points (was 85)
- 4 runs per point (was 3)
- Total: 420 measurements (was 255)

**This is expected and normal!**

---

## 🐛 Troubleshooting

### Issue: Still shows 85 data points
**Fix:**
```bash
# Restart backend
Ctrl+C
cd backend
npm run dev
```

### Issue: No cyan curve appears
**Check:**
1. Analysis completed without errors?
2. Check browser console for errors (F12)
3. Refresh page and try again

### Issue: Wrong complexity detected
**Possible reasons:**
1. Code simulation may not perfectly match actual execution
2. Some patterns are ambiguous (e.g., O(log n) vs O(n))
3. Check confidence score - if low (<70%), result may be unreliable

### Issue: Frontend shows old response format
**Fix:**
```bash
# Hard refresh browser
Ctrl+Shift+R (Chrome/Edge)
Ctrl+F5 (Firefox)
```

---

## 🎯 Success Criteria

**All of these should be true:**

- [x] Console shows "Testing with 105 data points"
- [x] Console shows MSE for 7 complexity types
- [x] Analysis takes 40-60 seconds
- [x] Linear code detected as O(n)
- [x] Nested loop code detected as O(n²)
- [x] Cyan curve appears on graph
- [x] Y-axis says "Growth Rate (f(n))"
- [x] Confidence shown as percentage
- [x] Fitted curve matches expected growth pattern

---

## 📈 What Fitted Values Do

**Before (old system):**
- Graph used theoretical formula: `y = n²`
- Matched mathematical curve, not actual code

**After (new system):**
- Graph uses `fittedValues` from backend
- These are scaled theoretical values
- Better represent actual code behavior
- Match magnitude of measured data

**Example:**
```
n = 100: measured = 15.2ms, fittedValue = 14.8ms
n = 500: measured = 380ms, fittedValue = 375ms
```

The fitted values follow the O(n²) pattern but scaled to match your specific code's performance.

---

## 🎓 Understanding MSE

**Mean Squared Error (MSE):**
- Measures how well theoretical curve fits measured data
- Lower MSE = better fit
- Normalized (0-1 scale) for fair comparison

**Good MSE values:**
- < 0.01: Excellent fit (90%+ confidence)
- < 0.05: Good fit (80-90% confidence)
- < 0.20: Fair fit (60-80% confidence)
- \> 0.20: Poor fit (<60% confidence)

**Example console output:**
```
O(n): MSE = 0.012345  ← Excellent!
O(n²): MSE = 0.123456 ← Fair
O(2ⁿ): MSE = 2.345678 ← Very poor
```

The algorithm picks O(n) because it has the lowest MSE.

---

## 🎉 Quick Smoke Test

Run this 5-minute test to verify everything works:

1. **Start app** → Open http://localhost:5173
2. **Check graph** → Y-axis says "Growth Rate (f(n))" ✓
3. **Test O(n) code** → Paste linear loop → Analyze
4. **Wait 40-60 sec** → Check console shows 105 points ✓
5. **See result** → O(n) detected with 85%+ confidence ✓
6. **Check graph** → Cyan curve appears ✓
7. **Done!** → Algorithm update working! 🎉

---

## 📝 Notes

- **UI unchanged** - All buttons, sliders, and layout same as before
- **Existing curves** - Still work normally with formulas
- **Only detected curves** - Use new fitted values system
- **Dark mode** - Still works perfectly
- **All features** - Preserved and functional

---

## ✅ Summary

**Backend Algorithm Now:**
- ✅ 105+ sample points
- ✅ 4 runs per n (averaged)
- ✅ MSE-based model selection
- ✅ Returns fitted values for plotting
- ✅ More accurate detection

**Test and verify it works with the examples above!** 🚀
