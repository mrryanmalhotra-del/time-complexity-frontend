# GrowthViz — Time Complexity Visualizer

A clean, minimal, and highly-usable learning tool for asymptotic notation and growth-rate intuition. Built with React, Node.js, and modern web technologies.

![GrowthViz](https://img.shields.io/badge/Status-Ready-green) ![React](https://img.shields.io/badge/React-18.2-blue) ![Node](https://img.shields.io/badge/Node.js-18+-green)

## 🎯 Overview

GrowthViz helps students and developers understand algorithm complexity through:
- **Interactive Visualization** - Compare up to 5 algorithms simultaneously
- **Educational Theory** - Learn 8 common time complexities with examples
- **Engaging Quizzes** - Test knowledge with 300+ questions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation & Running

**Option 1: Run both services**
```bash
# Install dependencies for both frontend and backend
cd backend && npm install
cd ../frontend && npm install

# Terminal 1 - Start backend
cd backend
npm run dev

# Terminal 2 - Start frontend  
cd frontend
npm run dev
```

**Option 2: Use provided scripts (Windows)**
```bash
# Install both
install.bat

# Start both servers
start.bat
```

The app will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3001

## 📁 Project Structure

```
Time_Complexitiy_Visualiser/
├── frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── pages/         # Visualize, Theory, Quiz
│   │   ├── components/    # Reusable UI components
│   │   └── data/          # Presets and calculations
│   ├── public/assets/     # Audio files (optional)
│   └── package.json
│
├── backend/               # Node.js + Express backend
│   ├── src/
│   │   ├── server.js      # Main server
│   │   ├── routes/        # API routes
│   │   └── data/          # 300 quiz questions
│   └── package.json
│
└── README_GROWTHVIZ.md    # This file
```

## 🎨 Features

### 1. Visualize Page (Default Landing)
- **Interactive Graph**: Chart.js powered visualization
- **8 Basic Complexities**: O(1), O(log n), O(n), O(n log n), O(n²), O(n³), O(2ⁿ), O(n!)
- **10 Algorithm Presets**: Binary Search, Merge Sort, Bubble Sort, etc.
- **Controls**:
  - Slider for input size n (1-1000)
  - Y-axis scaling (Linear/Logarithmic)
  - Max 5 simultaneous comparisons
- **Legend Chips**: Click to remove curves
- **Custom Functions**: Optional input for advanced users

### 2. Theory Page (Learn)
- **8 Complexity Cards** with:
  - Color-coded indicators
  - One-line explanations
  - Example algorithms
  - Mini sparkline graphs
  - Expandable "Learn more" sections
- **Formal Definitions**
- **Real-world Examples**
- **Responsive Grid Layout**

### 3. Quiz Page
- **Three Quiz Modes**:
  - 5 questions (1 minute)
  - 10 questions (2 minutes)
  - 15 questions (3 minutes)
- **Visual Questions**: Select complexity by graph shape
- **Real-time Features**:
  - Countdown timer
  - Progress bar
  - Instant feedback (green glow / red shake)
  - Sound effects (correct/wrong/timeup)
  - Confetti animation on correct answers
- **Results Screen**: Score, accuracy, personalized message

## 🎯 Usage Guide

### Visualizing Complexities
1. Navigate to **Visualize** (home page)
2. Click complexity toggles in right sidebar
3. Add presets using **+** button (max 5)
4. Adjust **n slider** to see growth patterns
5. Switch between **Linear/Logarithmic** Y-axis
6. Remove curves via legend chips

### Learning Concepts
1. Go to **Learn** page
2. Browse 8 complexity cards
3. Click **Learn more** for detailed explanations
4. Study mini graphs and examples

### Taking Quizzes
1. Navigate to **Quiz** page
2. Select quiz length (5/10/15 questions)
3. Click **Start Quiz**
4. Choose the matching complexity graph
5. Get instant feedback
6. View final score and retry

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool & dev server
- **TailwindCSS** - Utility-first CSS
- **Chart.js** + **react-chartjs-2** - Graphs
- **React Router** - Client-side routing
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **CORS** - Cross-origin support
- **JSON** - Data storage

## 🎨 Design Features

- **Dark/Light Mode**: Toggle with sun/moon icon
- **Responsive**: Works on desktop, tablet, mobile
- **Animations**: Smooth transitions, hover effects
- **Accessibility**: Keyboard friendly, ARIA labels
- **Color Scheme**: Muted pastels for readability

## 📊 Preset Algorithms

1. **Constant Time** - O(1) - Array access
2. **Binary Search** - O(log n) - Sorted array search
3. **Linear Search** - O(n) - Sequential search
4. **Merge Sort** - O(n log n) - Efficient sorting
5. **Bubble Sort** - O(n²) - Simple sorting
6. **Matrix Multiplication** - O(n³) - Naive algorithm
7. **Fibonacci Recursive** - O(2ⁿ) - Exponential growth
8. **Traveling Salesman** - O(n!) - Factorial growth
9. **Quick Sort** - O(n log n) avg - Fast in-place sort
10. **Heap Sort** - O(n log n) - Heap-based sort

## 🧪 Testing

### Sanity Check
Verify graph generation works for all complexities:
```bash
cd frontend
node -e "
  import('./src/data/presets.js').then(m => {
    const { complexityFunctions } = m;
    const tests = [1, 10, 50, 100];
    Object.entries(complexityFunctions).forEach(([name, fn]) => {
      const results = tests.map(n => ({ n, value: fn(n) }));
      console.log(name + ':', results);
    });
  });
"
```

### Backend Questions
```bash
cd backend
node -c src/data/questions.json
echo "✓ Questions JSON is valid"
```

## 🎵 Audio Assets

Place optional sound files in `frontend/public/assets/`:
- `correct.mp3` - Correct answer sound
- `wrong.mp3` - Wrong answer sound
- `timeup.mp3` - Timer expiry sound
- `start.mp3` - Quiz start sound (optional)

Free sources: freesound.org, mixkit.co, zapsplat.com

## 📝 API Documentation

### Backend Endpoints

#### `GET /api/health`
Health check endpoint
```json
{ "status": "ok", "message": "GrowthViz Backend is running" }
```

#### `GET /api/quiz/random?count=10`
Get random quiz questions
- **Query**: `count` (1-50)
- **Returns**: Array of questions with options and correct answers

#### `POST /api/quiz/submit`
Submit quiz answers
- **Body**: `{ answers: [...], duration: 120 }`
- **Returns**: Score, accuracy, results, message

#### `GET /api/quiz/stats`
Get total question count
```json
{ "totalQuestions": 300 }
```

## 🐛 Troubleshooting

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend connection failed
1. Ensure backend is running on port 3001
2. Check CORS settings in `backend/src/server.js`
3. Verify frontend API_URL in Quiz.jsx

### Charts not rendering
- Ensure Chart.js dependencies are installed
- Check browser console for errors
- Verify presets.js has valid calculation functions

### Questions not loading
```bash
cd backend
node generateQuestions.js
npm run dev
```

## 🔒 Security & Robustness

- ✅ Input validation on all API endpoints
- ✅ CORS configured for localhost development
- ✅ HTTP status codes for proper error handling
- ✅ Overflow protection for factorial/exponential calculations
- ✅ Request body validation

## 🚧 Intentional Limitations

- **No Code Analysis**: No automated code parsing/complexity detection
- **Local Only**: No external paid services or APIs
- **Simple Storage**: Questions in JSON (not database)
- **Development Mode**: Optimized for local use

## 📦 Building for Production

### Frontend
```bash
cd frontend
npm run build
# Output in frontend/dist/
```

### Backend
Backend runs as-is in production. Consider:
- Using PM2 for process management
- Adding environment variables
- Setting up proper logging

## 🎓 Educational Use

Perfect for:
- Computer Science students learning algorithms
- Interview preparation
- Teaching time complexity concepts
- Self-study and practice

## 👤 Credits

**Made with ❤️ by Ryan :)**

## 📜 License

MIT License - Free to use and modify

## 🔄 Version

GrowthViz v1.0 - November 2025

---

## Files Created/Modified Summary

### Backend
✅ `backend/package.json` - Updated with GrowthViz metadata
✅ `backend/src/server.js` - Clean Express server
✅ `backend/src/routes/quiz.js` - Quiz API endpoints
✅ `backend/src/data/questions.json` - 300 quiz questions (generated)
✅ `backend/generateQuestions.js` - Question generator script
✅ `backend/README.md` - Backend documentation

### Frontend
✅ `frontend/package.json` - Updated name to growthviz-frontend
✅ `frontend/src/App.jsx` - Main app with routing
✅ `frontend/src/pages/Visualize.jsx` - Main visualization page
✅ `frontend/src/pages/Theory.jsx` - Learning page
✅ `frontend/src/pages/Quiz.jsx` - Interactive quiz
✅ `frontend/src/components/Header.jsx` - Navigation header
✅ `frontend/src/components/Footer.jsx` - Footer with credit
✅ `frontend/src/components/ComplexityGraph.jsx` - Chart.js graph
✅ `frontend/src/components/RightSidebar.jsx` - Sidebar with toggles
✅ `frontend/src/components/SliderN.jsx` - Input size slider
✅ `frontend/src/components/AlgorithmCard.jsx` - Algorithm info card
✅ `frontend/src/data/presets.js` - Algorithm presets & functions
✅ `frontend/src/index.css` - Styles with animations
✅ `frontend/public/assets/README.txt` - Audio assets guide
✅ `frontend/README.md` - Frontend documentation

### Root
✅ `README_GROWTHVIZ.md` - This comprehensive guide

---

**Ready to run! Follow the Quick Start section above.**
