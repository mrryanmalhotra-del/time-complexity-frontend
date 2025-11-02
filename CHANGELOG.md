# GrowthViz - Changelog

## Version 2.0 - Stable Release (Restored & Enhanced)

### ✅ Completed Features

#### 📈 Visualize Section
- **O(n) Default Selection**: O(n) is now selected by default when the page loads
- **Deselectable Curves**: Users can deselect any curve, including the default O(n)
- **Empty State Message**: When no curves are selected, displays "📝 Select at least one complexity to visualize."
- **Single Sidebar**: Removed duplicate sidebar, kept only "Try These Presets" sidebar
- **Y-axis Label**: Clearly labeled as "Y-axis: O(n)"
- **Working Custom Function Input**: 
  - Fixed the "Add Function" input with a "+" button
  - Simple expression evaluator supports: n, n^2, n*2, 2*n+1, n^3, etc.
  - No external math libraries required
  - Validates input before adding to graph
- **Maximum 5 Curves**: Enforces limit of 5 simultaneous curves for clarity

#### 📚 Learn/Theory Section
- **Big O Explanation Block**: Comprehensive explanation at the top including:
  - What Big O notation means
  - Formal mathematical definition
  - Why it represents the upper bound
  - Intuitive real-world examples
- **2×4 Grid Layout**: Eight time complexities displayed in responsive 2-column grid
- **Scrollable Content**: Grid is scrollable when content exceeds viewport
- **Enhanced Cards**: Each complexity card includes:
  - Complexity label (O(1), O(log n), etc.)
  - Name and description
  - Color-coded indicator
  - Mini sparkline visualization
  - Example algorithms
  - Expandable "Learn more" section with formal definitions and real-world examples
- **Dark Mode Support**: Full dark/light mode compatibility

#### 🧩 Quiz Section
- **Quit Quiz Button**: 
  - Visible during quiz with confirmation dialog
  - Ends quiz immediately and shows current results
  - Preserves answered questions up to that point
- **Review Answers Feature**:
  - Available after completing or quitting quiz
  - Shows each question with:
    - User's selected answer (highlighted)
    - Correct answer (highlighted in green)
    - Detailed explanation for learning
  - Navigation between questions with Previous/Next buttons
  - Option to return to results or start new quiz
- **Enhanced Results Display**:
  - Score percentage with visual progress circle
  - Correct answers count
  - Time spent
  - Average time per question
- **Improved UI**:
  - Progress bars for quiz completion and time remaining
  - Visual feedback for correct/incorrect answers
  - Smooth animations and transitions
  - Responsive design for all screen sizes

### 🔧 Technical Improvements

#### Removed Dependencies
- **mathjs**: Replaced with simple built-in expression evaluator
- **Sound effects**: Removed audio playback features
- **External complexity detection**: Simplified to pattern matching

#### Code Quality
- Clean, maintainable React code
- Proper error handling
- No console errors or build warnings
- Optimized component structure
- Consistent code style

#### Dependencies (Final)
- React 18.2.0
- React Router DOM 6.30.1
- TailwindCSS 3.4.18
- Lucide React 0.294.0 (icons)
- Chart.js 4.4.0 + react-chartjs-2 5.2.0
- Axios 1.6.2
- Framer Motion 12.23.24

### 🎨 Design
- Modern, minimal, and responsive
- Consistent color theme across all sections
- Full dark/light mode support
- Smooth animations and transitions
- Mobile-friendly layout

### 🚀 Performance
- Lightweight bundle (removed mathjs ~500KB)
- Fast page loads
- Smooth interactions
- Efficient rendering

### 📝 Notes
- All features tested and working
- No external API dependencies for core functionality
- Backend required only for quiz questions
- Clean separation of concerns
- Easy to maintain and extend

---

## How to Run

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend (for quiz feature)
cd backend
npm install
npm start
```

The app will be available at `http://localhost:5173`
