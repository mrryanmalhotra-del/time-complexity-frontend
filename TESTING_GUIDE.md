# 🧪 Testing Guide for New Features

## Quick Test Commands

### Start the Application

```bash
cd "C:\Users\Ryan Malhotra\CascadeProjects\windsurf-project"
npm run dev
```

Open browser to: http://localhost:5173

---

## 1. ✅ Test Dark Mode Toggle

### Steps:
1. Look at top-right of header - you should see a moon icon (🌙)
2. Click the moon icon
3. **Expected**: 
   - Entire UI switches to dark theme
   - Icon changes to sun (☀️)
   - Background becomes dark gray gradient
   - All text becomes light colored
   - Graph axes and labels turn light gray

4. Refresh the page (F5)
5. **Expected**: Dark mode persists

6. Click sun icon to switch back to light mode
7. **Expected**: Returns to original light theme

### What to Check:
- [ ] Header background is dark
- [ ] Main graph area is dark gray
- [ ] Sidebar cards are dark gray
- [ ] All text is readable (light color)
- [ ] Graph axes are light colored
- [ ] Chart tooltip has dark background
- [ ] Preference saves after reload

---

## 2. ✅ Test Language Selection & Validation

### Test Python Validation

**Valid Python Code**:
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
```

**Steps**:
1. Select "Python" from language dropdown
2. Paste the code above
3. Click "Analyze Complexity"
4. **Expected**: 
   - Shows "Detected Complexity: O(n²)"
   - Confidence bar appears
   - Adds curve to graph

**Invalid Python (random text)**:
```
Hello this is just text
```

**Steps**:
1. Clear the textarea
2. Type random text
3. Click "Analyze Complexity"
4. **Expected**: Yellow warning box with "⚠️ No valid code detected"

---

### Test C++ Validation

**Valid C++ Code**:
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

**Steps**:
1. Select "C++" from language dropdown
2. Notice placeholder changes to C++ template
3. Paste the code above
4. Click "Analyze Complexity"
5. **Expected**: 
   - Shows "Detected Complexity: O(n²)"
   - Confidence score displayed

**Invalid C++ (random text)**:
```
some random words here
```

**Steps**:
1. Clear textarea
2. Type random text
3. Click "Analyze Complexity"
4. **Expected**: 
   - Yellow warning: "⚠️ No valid code detected"

**Invalid C++ (bad syntax)**:
```cpp
this is not valid code at all
```

**Steps**:
1. Paste invalid code
2. Click "Analyze Complexity"
3. **Expected**:
   - Red error: "❌ Invalid code: Please enter valid C++ code"
   - Blue tip box: "💡 Tip: You can validate your C++ code at cpp.sh or OnlineGDB"

### What to Check:
- [ ] Only Python and C++ options in dropdown
- [ ] No JavaScript or Java options
- [ ] Placeholder changes based on selected language
- [ ] Valid code analyzes successfully
- [ ] Random text shows warning
- [ ] Invalid code shows error message
- [ ] C++ shows compiler tip

---

## 3. ✅ Test Log-Log Regression Detection

### Test Different Complexities

**O(n) - Linear**:
```python
def linear_search(arr, target):
    for item in arr:
        if item == target:
            return True
    return False
```
**Expected**: Detects O(n) with high confidence

**O(log n) - Binary Search**:
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
**Expected**: Detects O(log n) or O(n) (slope between 0.8-1.3)

**O(n²) - Bubble Sort**:
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
```
**Expected**: Detects O(n²) with slope ~2.0

**O(n log n) - Merge Sort**:
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)
```
**Expected**: Detects O(n log n) with slope 1.3-1.8

### Check Backend Console

Open the terminal where backend is running. You should see:
```
Testing with n=10...
  Time: 2.34ms
Testing with n=50...
  Time: 5.67ms
Testing with n=100...
  Time: 11.23ms
Testing with n=500...
  Time: 56.78ms
Testing with n=1000...
  Time: 112.45ms
  Log-log regression: slope = 1.98, R² = 0.953
Detected complexity: O(n²)
Confidence: 95.3%
```

### What to Check:
- [ ] Different code patterns detect different complexities
- [ ] Confidence scores are reasonable (usually 70-95%)
- [ ] Console shows slope and R² values
- [ ] Detected curve appears on graph
- [ ] O(n²) code shows slope ~2.0
- [ ] O(n) code shows slope ~1.0
- [ ] O(log n) code shows slope <1.0

---

## 4. ✅ Test Learn More Dropdown

### Steps:
1. Look above the graph
2. Find "Learn More About Time Complexities" button
3. Click it
4. **Expected**: Dropdown expands with 8 complexity types

5. Click "O(n²) Quadratic"
6. **Expected**: 
   - Shows definition
   - Shows examples (Bubble sort, Selection sort, Nested loops)
   - Shows explanation of when it occurs

7. Click another complexity (e.g., "O(log n) Logarithmic")
8. **Expected**: 
   - Previous entry collapses
   - New entry expands with its details

9. Toggle dark mode while dropdown is open
10. **Expected**: 
    - Dropdown styling updates to dark theme
    - Text remains readable

### What to Check:
- [ ] Button appears above graph
- [ ] Dropdown expands smoothly
- [ ] All 8 complexities listed
- [ ] Each entry has notation, name, definition, examples, explanation
- [ ] Expanding one collapses others
- [ ] Works in both light and dark mode
- [ ] Animations are smooth

---

## 5. ✅ Test Existing Features Still Work

### Graph Functionality:
1. Check/uncheck complexity checkboxes in sidebar
   - **Expected**: Curves add/remove from graph
   
2. Move the slider
   - **Expected**: Graph updates smoothly, X-axis extends

3. Check multiple complexities
   - **Expected**: All selected curves visible with different colors

4. Hover over a curve
   - **Expected**: Tooltip shows complexity name and value

### What to Check:
- [ ] Slider moves smoothly (1 to 10,000)
- [ ] Checkboxes add/remove curves
- [ ] Multiple curves can be compared
- [ ] Default O(n) is selected on load
- [ ] Graph legend shows all active curves
- [ ] Tooltips work on hover
- [ ] Colors match sidebar indicators

---

## 6. ✅ Test Responsive Design

### Desktop:
- [ ] Sidebar on right (25% width)
- [ ] Graph on left (75% width)
- [ ] All features accessible

### Tablet/Mobile (if testing):
- [ ] Layout stacks vertically
- [ ] All features still work
- [ ] Dark mode toggle visible
- [ ] Buttons are touchable

---

## 🐛 Common Issues & Solutions

### Issue: Dark mode doesn't persist
**Solution**: Check browser localStorage is enabled

### Issue: Validation always fails
**Solution**: Make sure code has proper structure (def/class for Python, #include/main for C++)

### Issue: Backend not responding
**Solution**: 
```bash
# Check backend is running
curl http://localhost:3001/api/health

# Restart backend
cd backend
npm run dev
```

### Issue: Graph doesn't update
**Solution**: Check console for errors, try refreshing page

### Issue: Learn More doesn't expand
**Solution**: Check for JavaScript errors in browser console

---

## ✅ Final Verification Checklist

- [ ] Dark mode toggle works and persists
- [ ] Language dropdown only shows Python and C++
- [ ] Valid Python code analyzes successfully
- [ ] Valid C++ code analyzes successfully
- [ ] Random text shows appropriate warning
- [ ] Invalid code shows error + tip (C++)
- [ ] Log-log regression detects complexities accurately
- [ ] Backend console shows slope and R² values
- [ ] Learn More dropdown expands/collapses
- [ ] All 8 complexities have complete information
- [ ] Existing graph features still work
- [ ] Slider updates graph smoothly
- [ ] Multiple curves can be compared
- [ ] Layout is preserved (75/25 split)
- [ ] Everything works in both light and dark mode

---

## 📊 Expected Results Summary

| Feature | Expected Behavior |
|---------|------------------|
| Dark Mode | Instant theme switch, persists on reload |
| Python Validation | Accepts valid def/class, rejects random text |
| C++ Validation | Accepts #include/main, rejects random text |
| Log-Log Regression | Accurate slope calculation, proper complexity mapping |
| Learn More | Smooth expand/collapse, complete information |
| Existing Features | All work as before, no breaking changes |

---

## 🎉 Success Criteria

If all checkboxes above are marked, the update is successful! 

You now have:
- ✅ Professional dark mode
- ✅ Smart code validation
- ✅ Scientific complexity detection
- ✅ Educational dropdown
- ✅ C++ & Python focus
- ✅ All original features preserved

**Ready for your DAA coursework!** 🚀
