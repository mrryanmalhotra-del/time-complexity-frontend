# 🎯 Quiz Feature - Quick Start Guide

## 🚀 Start the Application

### Step 1: Start Backend
```cmd
cd C:\Users\Ryan Malhotra\CascadeProjects\Time_Complexitiy_Visualiser\backend
npm run dev
```

**Expected output:**
```
✅ Loaded 200 quiz questions
🚀 Backend server running on http://localhost:3001
📊 Ready to analyze algorithm complexity
🔍 Static analysis only (AST + heuristics)
🎯 Quiz system ready with question bank
```

### Step 2: Start Frontend (New Terminal)
```cmd
cd C:\Users\Ryan Malhotra\CascadeProjects\Time_Complexitiy_Visualiser\frontend
npm run dev
```

**Expected output:**
```
VITE ready in XXX ms
➜  Local:   http://localhost:5173/
```

### Step 3: Open Browser
```
http://localhost:5173
```

---

## 🎮 Using the Quiz

### Navigate to Quiz:
1. Click the **"Quiz"** tab in the top navigation
2. You'll see the quiz setup screen

### Take a Quiz:

**Setup:**
1. Choose quiz length:
   - **5 questions** → 1 minute (60 seconds)
   - **10 questions** → 2 minutes (120 seconds)
   - **15 questions** → 3 minutes (180 seconds)
2. Click **"Start Quiz"**

**During Quiz:**
1. Read the question (code snippet or algorithm name)
2. Click one of the 4 mini-graph options
3. See instant feedback:
   - ✅ **Green checkmark** = Correct!
   - ❌ **Red X** = Incorrect
4. Read the explanation
5. Click **"Next Question"** or **"Skip"**
6. Watch the timer countdown ⏱️

**After Quiz:**
1. View your results:
   - Raw score (e.g., 8/10)
   - Percentage (e.g., 80%)
   - Scaled score out of 200 (e.g., 160/200)
   - Performance message
2. Click **"Review Answers"** to see detailed feedback
3. Click **"Try Again"** for another quiz
4. Click **"Back to Learn"** to return to visualizer

---

## 📝 Example Test Flow

### Test with Easy Questions:

**Question 1 (Code):**
```python
def search(arr, n):
    for i in range(n):
        if arr[i] == target:
            return i
    return -1
```

**Options:** O(1), O(log n), O(n), O(n²)  
**Correct:** O(n) ✅  
**Explanation:** "Single loop iterating through n elements."

**Question 2 (Algorithm Name):**
```
Binary Search
```

**Options:** O(1), O(log n), O(n), O(n log n)  
**Correct:** O(log n) ✅  
**Explanation:** "Halves search space each step."

---

## 🎨 Visual Guide

### Quiz Setup Screen:
```
┌────────────────────────────────────┐
│      Complexity Quiz               │
│                                     │
│  Test your understanding of        │
│  algorithmic complexity            │
│                                     │
│  Quiz Length:                      │
│  ┌──────┬──────┬──────┐           │
│  │  5   │ 10   │ 15   │           │
│  │ Qs   │ Qs   │ Qs   │           │
│  └──────┴──────┴──────┘           │
│                                     │
│  [    Start Quiz    ]              │
│  [  Back to Learn   ]              │
└────────────────────────────────────┘
```

### Active Quiz:
```
┌────────────────────────────────────┐
│ Question 3 of 10        ⏱️ 1:45   │
│ ████████░░░░░░░░░░ 30%            │
└────────────────────────────────────┘

┌────────────────────────────────────┐
│ Analyze this code:                 │
│                                     │
│  for i in range(n):                │
│      for j in range(n):            │
│          print(i, j)               │
└────────────────────────────────────┘

┌──────────┬──────────┐
│ [Graph]  │ [Graph]  │  ← Click one!
│  O(n)    │ O(log n) │
├──────────┼──────────┤
│ [Graph]  │ [Graph]  │
│  O(n²)   │ O(n³)    │  ← Options
└──────────┴──────────┘

[ Next Question ]  [ Skip ]  [ Quit ]
```

### Results Screen:
```
┌────────────────────────────────────┐
│           🏆                        │
│      Quiz Complete!                │
│                                     │
│   🎯 Excellent work! Strong        │
│   understanding of complexities.   │
│                                     │
│  ┌──────┬──────┬──────┐           │
│  │  8   │ 80%  │ 160  │           │
│  │ /10  │      │ /200 │           │
│  └──────┴──────┴──────┘           │
│                                     │
│  [ Try Again ]  [ Review ]         │
│         [ Back to Learn ]          │
└────────────────────────────────────┘
```

---

## 🎯 Tips for Best Results

### For Accurate Testing:
1. **Focus on patterns:**
   - Look for loops (nested = higher complexity)
   - Watch for division/multiplication by 2 (log patterns)
   - Count recursive calls

2. **Remember the hierarchy:**
   ```
   O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(n³) < O(2ⁿ) < O(n!)
   ```

3. **Use the timer wisely:**
   - Don't rush on hard questions
   - Skip if unsure (you can always guess later)
   - Time management is key

4. **Learn from mistakes:**
   - Always review wrong answers
   - Read explanations carefully
   - Try again to reinforce learning

---

## 🔧 Troubleshooting

### Backend won't start?
```cmd
# Check if port 3001 is already in use
netstat -ano | findstr :3001

# If blocked, kill the process or use different port
```

### Frontend won't start?
```cmd
# Check if port 5173 is already in use
netstat -ano | findstr :5173

# Install dependencies if missing
npm install
```

### Quiz not loading?
1. **Check backend is running** - Visit `http://localhost:3001/api/health`
2. **Check console** - Press F12 in browser
3. **Verify question bank** - Should see "✅ Loaded 200 quiz questions"

### Graphs not rendering?
- **Check browser console** for errors
- **Try different browser** (Chrome/Edge recommended)
- **Clear cache** and refresh (Ctrl+Shift+R)

---

## 📊 Question Bank Stats

**Total Questions:** 200

**By Difficulty:**
- Easy: 149 (74.5%)
- Medium: 32 (16%)
- Hard: 19 (9.5%)

**By Type:**
- Code snippets: 154
- Algorithm names: 46

**By Complexity:**
- O(1), O(log n), O(n), O(n log n), O(n²), O(n³), O(2ⁿ), O(n!)

---

## 🎓 Learning Path

### Beginner (Start Here):
1. Take a **5-question quiz** (easy difficulty)
2. Focus on O(1), O(n), O(n²)
3. Review all wrong answers
4. Repeat until 80%+ score

### Intermediate:
1. Take a **10-question quiz** (mixed difficulty)
2. Include O(log n) and O(n log n)
3. Aim for 75%+ score
4. Practice pattern recognition

### Advanced:
1. Take a **15-question quiz** (all difficulties)
2. Include O(2ⁿ) and O(n!)
3. Target 90%+ score
4. Master all complexity classes

---

## ✅ Quick Checklist

Before taking a quiz, ensure:
- [ ] Backend is running (port 3001)
- [ ] Frontend is running (port 5173)
- [ ] Browser is open to http://localhost:5173
- [ ] You can see "Quiz" tab in navigation
- [ ] Dark mode preference is set

During quiz:
- [ ] Timer is counting down
- [ ] Mini-graphs are rendering
- [ ] Click feedback works (green/red)
- [ ] Explanations display
- [ ] Progress bar updates

After quiz:
- [ ] Score displays correctly
- [ ] Review answers shows all questions
- [ ] Try Again restarts quiz
- [ ] Back to Learn returns to visualizer

---

## 🎉 Ready to Quiz!

**You're all set!** 🚀

1. Start both backend and frontend
2. Click the **Quiz** tab
3. Choose your quiz length
4. Test your complexity knowledge!

**Good luck!** 🍀

---

## 📖 Additional Resources

- **QUIZ_FEATURE_SUMMARY.md** - Complete implementation details
- **README.md** - General application info
- **STATIC_ANALYSIS_GUIDE.md** - Learn mode documentation

---

**Happy Learning!** 🎓✨
