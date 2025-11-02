# ✨ Features Documentation

Complete feature list and usage guide for the Algorithm Complexity Visualizer.

## Core Features

### 1. Interactive Graph Visualization

**Description**: Real-time plotting of multiple complexity functions on a logarithmic scale.

**Key Capabilities**:
- Plot up to 9 default complexity functions simultaneously
- Logarithmic Y-axis for better visualization of exponential growth
- Smooth animations when changing parameters
- Hover tooltips showing exact values
- Color-coded curves for easy identification

**Usage**:
- Check/uncheck complexity types in the sidebar
- Watch the graph update in real-time
- Hover over curves to see exact values

### 2. Dynamic Input Size Control

**Description**: Interactive slider to adjust the maximum input size (n).

**Specifications**:
- Range: 1 to 10,000
- Live updates as you drag
- Visual markers at key intervals
- Large display of current value

**Usage**:
- Drag the slider to change n
- Graph updates immediately
- Observe how different complexities scale

### 3. Complexity Library

**Included Complexities**:

| Complexity | Formula | Color | Typical Use Cases |
|------------|---------|-------|-------------------|
| O(1) | 1 | Green | Array access, hash lookup |
| O(log n) | log₂(n) | Blue | Binary search, BST operations |
| O(√n) | √n | Purple | Primality testing |
| O(n) | n | Orange | Linear search, array traversal |
| O(n log n) | n log₂(n) | Pink | Merge sort, heap sort |
| O(n²) | n² | Red | Bubble sort, nested loops |
| O(n³) | n³ | Dark Red | Matrix multiplication |
| O(2ⁿ) | 2ⁿ | Maroon | Recursive Fibonacci |
| O(n!) | n! | Brown | Permutation generation |

**Features**:
- Click info icon for detailed explanations
- See real-world examples
- Understand when each complexity is used

### 4. Code Complexity Analyzer

**Description**: Automatic detection of time complexity from code snippets.

**Supported Languages**:
- Python
- JavaScript
- C++
- Java

**How It Works**:
1. Paste your code
2. Select the language
3. Click "Analyze Complexity"
4. Backend runs timing experiments with different input sizes
5. Fits results to known complexity curves
6. Returns best match with confidence score

**Algorithm**:
```
For each input size n in [10, 50, 100, 500, 1000]:
    1. Execute code with test data of size n
    2. Measure execution time
    3. Record (n, time) pair

Fit measurements to complexity functions:
    - Calculate error for each complexity type
    - Select best fit using least squares
    - Return complexity with confidence score
```

**Output**:
- Detected complexity (e.g., "O(n²)")
- Confidence percentage
- Execution times for different n values
- Automatically adds curve to graph

### 5. Custom Function Support

**Description**: Add detected complexities to the graph for comparison.

**Features**:
- Each analyzed code gets a unique color
- Labeled as "Detected: O(...)"
- Can be removed individually
- Persists until manually removed

**Use Cases**:
- Compare your algorithm with theoretical bounds
- Verify optimization improvements
- Understand real vs. theoretical complexity

### 6. Educational Sidebar

**Components**:

**a) Complexity Selector**
- Checkboxes for each complexity
- Visual color indicators
- Info buttons for detailed explanations

**b) Information Cards**
- Description of each complexity
- Real-world examples
- Common algorithms

**c) Code Input Panel**
- Language selector
- Code textarea
- Analyze button with loading state

**d) Results Display**
- Detected complexity
- Confidence meter (visual progress bar)
- Test size information

**e) Usage Tips**
- Quick guide for new users
- Feature highlights

### 7. Modern UI/UX

**Design Principles**:
- Clean, minimalist interface
- Gradient backgrounds
- Smooth transitions
- Responsive layout
- Professional color scheme

**UI Components**:
- **Header**: Branding with gradient icon, title, subtitle
- **Main Area**: Large graph (75% width) with controls
- **Sidebar**: Compact controls (25% width)
- **Cards**: White cards with shadows and rounded corners
- **Buttons**: Primary blue with hover effects
- **Icons**: Lucide React icons throughout

**Responsive Design**:
- Desktop: Side-by-side layout
- Tablet/Mobile: Stacked layout
- Flexible graph sizing
- Touch-friendly controls

### 8. Chart Features

**Powered by Chart.js**:
- Hardware-accelerated rendering
- Smooth animations (300ms)
- Interactive tooltips
- Logarithmic scaling
- Legend with clickable items
- Grid lines for reference

**Tooltip Features**:
- Shows complexity name
- Displays exact value
- Smart formatting (K, M, B, T suffixes)
- Dark theme for visibility

**Axis Features**:
- X-axis: Linear scale for input size
- Y-axis: Logarithmic scale for operations
- Smart tick labels
- Bold, readable fonts

### 9. Performance Optimizations

**Frontend**:
- React.memo for components
- useMemo for expensive calculations
- Debounced slider updates (via CSS transitions)
- Lazy evaluation of complexity values

**Backend**:
- Asynchronous analysis
- Timeout protection
- Error handling
- Request validation

**Chart**:
- Point radius 0 (only show on hover)
- Tension 0.1 (smooth curves)
- Limited data points (100 max per curve)
- Fill disabled (performance)

### 10. Error Handling

**Frontend Errors**:
- Invalid code input
- Backend connection failures
- Empty selections

**Backend Errors**:
- Code execution failures (fallback to pattern analysis)
- Timeout handling
- Invalid input validation

**User Feedback**:
- Loading states
- Error messages in red boxes
- Success messages in green boxes
- Disabled states during processing

## Advanced Features

### Pattern-Based Analysis

When code execution isn't possible, the analyzer falls back to pattern recognition:

**Detected Patterns**:
- Loop counting
- Nested loop depth detection
- Recursion detection
- Divide-and-conquer pattern recognition
- Binary operations

**Complexity Estimation**:
```javascript
if (hasRecursion && hasDivideConquer) → O(n log n)
else if (hasRecursion) → O(2ⁿ)
else if (nestedLoopDepth === 3) → O(n³)
else if (nestedLoopDepth === 2) → O(n²)
else if (hasLoops) → O(n)
else → O(log n) or O(1)
```

### Confidence Scoring

**How Confidence is Calculated**:
1. Measure actual execution times
2. Predict times using fitted function
3. Calculate error ratio
4. Convert to 0-100% confidence
5. Higher fit quality = higher confidence

**Interpretation**:
- 90-100%: Very confident match
- 70-89%: Good match
- 50-69%: Moderate match
- Below 50%: Uncertain

### Mathematical Accuracy

**Function Evaluation**:
- Uses JavaScript's Math library
- Factorial calculation with overflow protection
- Safe exponentiation (capped at 2²⁰)
- Infinity handling for extreme values

**Data Point Generation**:
- Smart step size (maxN / 100)
- Validation of finite values
- Error catching per point
- Graceful degradation

## API Endpoints

### Backend API

**Base URL**: `http://localhost:3001`

#### GET /api/health
Health check endpoint

**Response**:
```json
{
  "status": "ok",
  "message": "Backend is running"
}
```

#### POST /api/analyze
Analyze code complexity

**Request**:
```json
{
  "code": "def bubble_sort(arr):\n    ...",
  "language": "python"
}
```

**Response**:
```json
{
  "detectedComplexity": {
    "complexity": "O(n²)",
    "formula": "n * n",
    "confidence": 0.95,
    "fitScore": 0.123
  },
  "measurements": [
    { "n": 10, "time": 0.5 },
    { "n": 50, "time": 12.3 },
    ...
  ],
  "language": "python",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Error Response**:
```json
{
  "error": "Failed to analyze code",
  "details": "Error message"
}
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Left Arrow | Decrease n by 100 |
| Right Arrow | Increase n by 100 |
| Home | Set n to 1 |
| End | Set n to 10,000 |

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Accessibility

- Keyboard navigation support
- ARIA labels on interactive elements
- High contrast colors
- Readable font sizes
- Focus indicators

## Future Enhancement Ideas

**Potential Additions**:
- [ ] Save/load graph configurations
- [ ] Export graph as image
- [ ] Compare multiple code snippets
- [ ] Best/worst/average case analysis
- [ ] Space complexity analysis
- [ ] More programming languages
- [ ] Code optimization suggestions
- [ ] Dark mode
- [ ] Mobile app version
- [ ] Collaborative sharing
- [ ] Code syntax highlighting
- [ ] Step-by-step execution visualization

## Technical Specifications

**Graph Resolution**: 100 points per curve
**Maximum Functions**: Unlimited (practical limit ~20 for visibility)
**Analysis Timeout**: 30 seconds
**Input Size Range**: 1 - 10,000
**Supported Code Size**: Up to 10 MB
**Response Time**: < 2 seconds for analysis

## Use Cases

### For Students
- ✅ Understanding complexity concepts
- ✅ Homework verification
- ✅ Exam preparation
- ✅ Assignment comparisons

### For Educators
- ✅ Teaching demonstrations
- ✅ Live coding sessions
- ✅ Assignment grading reference
- ✅ Concept visualization

### For Developers
- ✅ Algorithm selection
- ✅ Performance estimation
- ✅ Code optimization
- ✅ Interview preparation

---

Built with ❤️ for computer science education. 🚀
