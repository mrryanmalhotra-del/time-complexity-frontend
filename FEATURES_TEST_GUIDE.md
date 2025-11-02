# 🧪 Custom Functions & Learn More - Quick Test Guide

## 🚀 Start the App

```bash
cd "C:\Users\Ryan Malhotra\CascadeProjects\Time_Complexitiy_Visualiser"
npm run dev
```

Open: **http://localhost:5173**

---

## ✅ Test 1: Learn More Modal

### Steps:
1. Look for the **"Learn More"** button (blue, centered above graph)
2. Click the button

### Expected:
✅ **Modal opens** with:
- Title: "Time Complexity Reference Guide"
- Table with 11 rows (complexity categories)
- Columns: Category | Big-O | Typical Example Algorithms
- O(1) to O(n log²n) all listed
- Note at bottom about worst-case complexity
- X button in top-right corner

### Test Dark Mode:
3. Toggle dark mode switch
4. Modal should match theme (dark background, light text)

### Test Close:
5. Click X button → Modal closes ✓
6. Reopen modal
7. Click outside modal (on dark overlay) → Modal closes ✓

---

## ✅ Test 2: Custom Function - Simple Quadratic

### Steps:
1. Scroll to **"Enter custom function in terms of n"** section (below graph)
2. Type: `n^2`
3. Click **"Add Function"** button

### Expected:
✅ **Function added:**
- Button shows "Adding..." briefly
- Input field clears
- New checkbox appears in sidebar: "Custom: n^2"
- Graph updates with new parabolic curve
- Curve has random color
- Checkbox is automatically checked

### Verify Graph:
4. Move slider left and right
5. Curve should grow quadratically (parabola shape)

---

## ✅ Test 3: Custom Function - Logarithmic Squared

### Steps:
1. In custom function input, type: `log(n)^2`
2. Click "Add Function"

### Expected:
✅ **Second custom function added:**
- "Custom: log(n)^2" appears in sidebar
- Graph shows new curve (very flat)
- Different color from first custom function
- Both custom functions visible simultaneously

---

## ✅ Test 4: Custom Function - Complex Expression

### Steps:
1. Type: `n * log(n) + sqrt(n)`
2. Click "Add Function"

### Expected:
✅ **Third function added:**
- Plots successfully
- Growth rate between O(n) and O(n log n)
- Distinct color

---

## ✅ Test 5: Invalid Expression - No 'n'

### Steps:
1. Type: `log(5) + 10`
2. Click "Add Function"

### Expected:
❌ **Error displayed:**
- Red alert box appears below input
- Message: "Expression must contain the variable 'n'"
- No function added to sidebar
- No graph update

---

## ✅ Test 6: Invalid Expression - Bad Syntax

### Steps:
1. Type: `n ++ @@ invalid`
2. Click "Add Function"

### Expected:
❌ **Error displayed:**
- Red alert box
- Message: "Invalid function expression. Use valid mathematical terms with n."
- No function added

---

## ✅ Test 7: Custom Function - Exponential

### Steps:
1. Type: `3^n`
2. Click "Add Function"

### Expected:
✅ **Function added with normalization:**
- Plots exponential curve
- Steep growth
- Values automatically normalized (console shows normalization message)
- Visible on graph without breaking scale

---

## ✅ Test 8: Multiple Custom Functions Simultaneously

### Current State:
You should now have:
- Standard complexities (O(1), O(n), O(n²), etc.) - some checked
- 3-4 custom functions added

### Test:
1. Uncheck some standard complexities
2. Check different custom functions
3. Use slider to change n value

### Expected:
✅ **All functions work together:**
- Graph updates smoothly
- Each function has unique color
- Legend shows all selected functions
- No performance issues

---

## ✅ Test 9: Remove Custom Function

### Steps:
1. In sidebar, find custom function checkboxes
2. Look for X button next to custom functions
3. Click X on one custom function

### Expected:
✅ **Function removed:**
- Checkbox disappears from sidebar
- Curve removed from graph
- Other custom functions remain

---

## ✅ Test 10: Compact Complexity Toggles

### Verify:
1. Look at standard complexity checkboxes in sidebar
2. Compare to previous version (if you remember)

### Expected Changes:
✅ **More compact design:**
- Smaller padding (items closer together)
- Smaller checkboxes
- Smaller icons
- More items visible without scrolling
- Same functionality maintained

---

## ✅ Test 11: Code Analysis Label

### Verify:
1. Scroll to "Analyze my code for time complexity" section in sidebar

### Expected:
✅ **Updated label:**
- Main heading: "Analyze my code for time complexity"
- Below: "(Optional - or use custom functions above)"
- Clear indication it's not required

---

## ✅ Test 12: Combined Workflow

### Complete Workflow:
1. **Open app** → See default O(n) selected
2. **Click Learn More** → Read complexity table → Close modal
3. **Select O(n²)** and **O(n log n)** → See curves
4. **Add custom function**: `n^1.5` → See intermediate growth
5. **Add another**: `sqrt(n) * n` → Compare growth rates
6. **Use slider** → Watch all curves scale
7. **Paste C++ code** (nested loops) → Analyze
8. **See detection**: O(n²) detected → New curve added
9. **Toggle dark mode** → All elements adapt
10. **Everything works** ✓

---

## 🎨 Visual Checklist

### Learn More Modal:
- [ ] Button centered above graph
- [ ] Blue color matching theme
- [ ] Modal opens with smooth transition
- [ ] Table formatted properly
- [ ] All 11 rows visible
- [ ] Scrollable if needed
- [ ] Dark mode styling works
- [ ] Closes properly

### Custom Function Input:
- [ ] Located below graph
- [ ] White/gray box with shadow
- [ ] Label: "Enter custom function in terms of n:"
- [ ] Examples shown: n^2 log n, sqrt(n), 3^n, n^3
- [ ] Input field responsive
- [ ] Green "Add Function" button
- [ ] Error messages show in red
- [ ] Info box at bottom with supported operations

### Sidebar Improvements:
- [ ] "Select Complexities" header smaller
- [ ] Checkboxes more compact
- [ ] Scrollable list
- [ ] Code section shows "(Optional)"
- [ ] Custom functions listed separately
- [ ] X buttons visible for custom functions

---

## 🐛 Troubleshooting

### Issue: "Add Function" button disabled
**Cause:** Empty input field  
**Fix:** Type a function expression first

### Issue: Custom function not plotting
**Check:**
1. Backend console for errors
2. Browser console (F12) for errors
3. Expression contains 'n'
4. Valid mathematical syntax

### Issue: Learn More modal doesn't open
**Fix:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Check console for errors
3. Verify component imported in App.jsx

### Issue: Backend error when adding custom function
**Check:**
1. Backend is running (npm run dev in backend folder)
2. Backend console shows: "Parsing custom function: ..."
3. Port 3001 accessible

---

## 📊 Example Test Sequence

### 5-Minute Smoke Test:

```
1. Open app ✓
2. Click Learn More → See table → Close ✓
3. Add custom function: n^2 → See curve ✓
4. Add custom function: log(n) → See flat curve ✓
5. Toggle O(n) and O(n²) → Compare with custom ✓
6. Try invalid: "test" → See error ✓
7. Remove one custom function → Disappears ✓
8. Toggle dark mode → All styled correctly ✓
9. Paste C++ code → Analyze → Detects complexity ✓
10. All features working! 🎉
```

---

## 📈 Expected Results Summary

| Feature | Expected Behavior |
|---------|-------------------|
| **Learn More** | Modal opens, shows 11 complexity rows, closeable |
| **Custom Function** | Accepts math expressions, plots curves, random colors |
| **Multiple Custom** | Unlimited custom functions, all plot together |
| **Invalid Input** | Shows error messages, doesn't break app |
| **Compact Toggles** | Smaller, fits more items, same functionality |
| **Optional Label** | Clear that code analysis is optional |
| **Dark Mode** | All new components match theme |
| **Graph Updates** | Smooth real-time updates for all functions |
| **Colors** | Each function unique, distinguishable |
| **Performance** | No lag with multiple functions |

---

## ✅ Final Checklist

All must pass:

- [ ] Learn More modal opens and displays table
- [ ] Modal closes with X and background click
- [ ] Custom function adds successfully
- [ ] Multiple custom functions work together
- [ ] Invalid expressions show error messages
- [ ] Custom functions plot on graph
- [ ] Custom functions can be removed
- [ ] Complexity toggles are more compact
- [ ] Code analysis labeled as optional
- [ ] Dark mode works for all new features
- [ ] Graph handles all complexities simultaneously
- [ ] No console errors
- [ ] Responsive on different screen sizes

---

## 🎯 Success Criteria

**If ALL tests pass:**

✅ **Custom Functions Working:**
- User can add unlimited custom mathematical functions
- All functions plot correctly with unique colors
- Invalid expressions handled gracefully

✅ **Learn More Enhanced:**
- Comprehensive reference table accessible
- 11 complexity categories with examples
- Beautiful modal design

✅ **UI Improved:**
- More compact complexity selectors
- Clear labeling for optional features
- Better space utilization

✅ **Safe & Secure:**
- No code injection possible
- Safe mathematical expression parsing
- Proper error handling

**Ready for production use!** 🚀

---

## 📝 Notes

- Backend uses **safe parsing** (no eval)
- Custom functions evaluated at 10 fixed points
- Values > 1M automatically normalized
- All operations use JavaScript Math object
- Expressions must contain lowercase 'n'

**Enjoy exploring algorithm complexity!** 🎓
