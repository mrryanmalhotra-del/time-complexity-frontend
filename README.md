# 🚀 Algorithm Complexity Visualizer

An interactive web application for visualizing and analyzing algorithmic time complexities using **static code analysis** - perfect for learning DAA (Design and Analysis of Algorithms).

## Features

- **Interactive Visualization**: Dynamic graph showing multiple complexity curves
- **Real-time Updates**: Slider control for input size (n = 1 to 1,000)
- **Multiple Functions**: Compare O(1), O(log n), O(n), O(n log n), O(n²), O(n³), O(2ⁿ), O(n!)
- **Static Code Analysis**: Paste C++ or Python code and get automatic complexity detection via AST + heuristics
- **Custom Functions**: Plot your own mathematical functions (e.g., `n^2 * log(n)`, `sqrt(n)`)
- **Educational**: Built-in Learn More section with complexity reference table

## 🔍 Analysis Method

**This tool uses static code analysis only** (AST + heuristics) to detect time complexity for C++ and Python snippets. It **does not run or time user code**, making it:

✅ **Fast** - Instant analysis without execution  
✅ **Safe** - No code execution, no security risks  
✅ **Explainable** - Clear reasoning for detected complexity

### Static Analysis Rules:

1. **Loop Counting**: Counts nested loops and determines depth
2. **Logarithmic Patterns**: Detects `i *= 2` or `n /= 2` patterns → O(log n)
3. **Recursion Detection**: Identifies recursive calls and patterns
4. **Master Theorem**: Applies divide-and-conquer analysis for recursive algorithms
5. **Library Functions**: Recognizes `sort()` → O(n log n)

### Supported Patterns:

| Pattern | Detected As |
|---------|-------------|
| Single loop over n | O(n) |
| Nested loops (depth 2) | O(n²) |
| Triple nested loops | O(n³) |
| `while(n>1): n//=2` | O(log n) |
| `for(i=1; i<=n; i*=2)` | O(log n) |
| Recursive with division | O(n log n) via Master Theorem |
| Multiple recursive calls | O(2ⁿ) |
| No loops/recursion | O(1) |

## Tech Stack

- **Frontend**: React + Vite + TailwindCSS + Chart.js
- **Backend**: Node.js + Express
- **Analysis**: AST-based static analysis (Python `ast` module + C++ heuristics)

## Getting Started

### Installation

```bash
# Install all dependencies
npm run install:all
```

### Running the App

```bash
# Run both frontend and backend
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### Manual Setup

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (in another terminal)
cd backend
npm install
npm run dev
```

## Usage

1. **View Default Graph**: The app starts with O(n) plotted
2. **Toggle Complexities**: Use compact checkboxes in the sidebar to add/remove complexity curves
3. **Adjust Input Size**: Use the slider (1-1000) to see how functions scale
4. **Analyze Code**: 
   - Select language (Python or C++)
   - Paste your code snippet
   - Click "Analyze Complexity"
   - View detected complexity, confidence score, and explanation
5. **Custom Functions**: Enter mathematical expressions like `n^2 * log(n)` to plot custom growth curves
6. **Learn More**: Click the "Learn More" button above the graph to see the full complexity reference table

## 🔐 Security & Safety

Since this tool uses **static analysis only**, it offers significant security advantages:

✅ **No Code Execution** - User code is never compiled or run  
✅ **No Sandboxing Required** - Analysis happens via pattern matching  
✅ **Fast & Safe** - Instant results without timeout risks  
✅ **Syntax Validation** - Python uses `ast.parse()`, C++ uses heuristic checks

**Note**: The analyzer validates syntax before analysis. Invalid code will return clear error messages.

## 📋 Test Examples

### Python - Single Loop (O(n))
```python
def linear_search(n):
    total = 0
    for i in range(n):
        total += i
    return total
```
**Expected**: O(n), 85% confidence

### Python - Logarithmic (O(log n))
```python
def binary_reduction(n):
    count = 0
    while n > 1:
        n //= 2
        count += 1
    return count
```
**Expected**: O(log n), 85% confidence

### C++ - Nested Loops (O(n²))
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
**Expected**: O(n²), 90% confidence

### Python - Divide-and-Conquer (O(n log n))
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)
```
**Expected**: O(n log n), 80% confidence

## Project Structure

```
complexity-visualizer/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ComplexityGraph.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── CustomFunctionInput.jsx
│   │   │   └── LearnMoreModal.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── backend/                # Node.js backend
│   ├── src/
│   │   ├── server.js
│   │   ├── analyzer.js
│   │   └── staticAnalyzer.js    # Static analysis engine
│   └── package.json
├── README.md
└── STATIC_ANALYSIS_GUIDE.md
```

## 🎓 Educational Use

This tool is designed for CS students learning algorithm analysis. It helps:

- **Visualize Growth Rates**: See how O(n) vs O(n²) vs O(2ⁿ) differ visually
- **Understand Patterns**: Learn to recognize loop nesting and logarithmic patterns
- **Practice Detection**: Test your code snippets and verify complexity
- **Learn by Example**: Built-in reference table with 11 complexity categories
- **Prepare for Exams**: Quick reference for common algorithm complexities

### Perfect for:
- DAA (Design and Analysis of Algorithms) coursework
- Technical interviews preparation
- Algorithm design projects
- Professor demonstrations
- Self-study and revision

## 🚨 Limitations

### Language Support:
- ✅ Python
- ✅ C++
- ❌ JavaScript, Java, Go, etc. (not supported)

### Detection Accuracy:
- **High confidence (80-100%)**: Clear nested loops, obvious patterns
- **Medium confidence (60-79%)**: Heuristic matches, library calls
- **Low confidence (<60%)**: Ambiguous code structure → "Inconclusive"

### Known Limitations:
1. **Hidden Complexity**: May miss operations like `list(range(n))` inside loops
2. **Dynamic Behavior**: Cannot detect runtime-dependent complexity
3. **Advanced Patterns**: May not recognize complex recursive patterns
4. **Data Structure Operations**: Assumes standard complexity for built-in operations

### When Inconclusive:
The analyzer will suggest simplifying the code or providing a clearer snippet.

## 🤝 Contributing

This is an educational project. Contributions welcome!

## 📄 License

MIT License - Free for educational use
