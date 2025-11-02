# ⚡ Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

**Install Node.js** (if not already installed):
1. Visit: https://nodejs.org/
2. Download LTS version (v18 or later)
3. Run installer and follow prompts
4. Restart your terminal

**Verify installation**:
```bash
node --version
npm --version
```

## Installation

### Windows Users

**Option 1: Use Batch Script**
```bash
# Double-click install.bat
# OR run in terminal:
.\install.bat
```

**Option 2: Manual**
```bash
npm install
cd frontend && npm install
cd ../backend && npm install
```

### Mac/Linux Users

```bash
# Install all dependencies
npm run install:all
```

## Running the App

### Windows

```bash
# Double-click start.bat
# OR run in terminal:
.\start.bat
```

### Mac/Linux

```bash
npm run dev
```

## Access the App

Once started, open your browser:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

You should see the Algorithm Complexity Visualizer!

## First Steps

### 1. Explore the Default View
- You'll see O(n) plotted by default
- Try moving the slider to see the line grow

### 2. Add More Complexities
- Check boxes in the sidebar:
  - ✅ O(log n) - See how slow it grows
  - ✅ O(n²) - See how fast it grows
  - ✅ O(2ⁿ) - Watch it explode!

### 3. Analyze Your First Code

**Example - Bubble Sort**:
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
```

1. Copy the code above
2. Select "Python" language
3. Paste in the code box
4. Click "Analyze Complexity"
5. Wait ~5 seconds
6. See it detect O(n²)!

### 4. Compare with Graph
- Notice how the detected curve matches O(n²)
- Move the slider to see scaling behavior

## Common Issues

### Port Already in Use

**Error**: `Port 5173 is already in use`

**Solution**:
```bash
# Find and kill the process
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5173 | xargs kill -9
```

### Backend Not Responding

**Error**: `Failed to analyze code. Make sure backend is running.`

**Solution**:
1. Check backend terminal - should show: `🚀 Backend server running on http://localhost:3001`
2. Test backend: Open http://localhost:3001/api/health in browser
3. If not running, start it: `cd backend && npm run dev`

### Dependencies Not Installed

**Error**: `Cannot find module...`

**Solution**:
```bash
# Delete and reinstall
rm -rf node_modules frontend/node_modules backend/node_modules
npm run install:all
```

## Tips for Best Experience

### Graph Viewing
- **Use logarithmic scale**: Already enabled to see all curves
- **Hover for details**: See exact values
- **Compare similar**: Select O(n), O(n log n), O(n²) together
- **Test extremes**: Try n=1, n=100, n=10000

### Code Analysis
- **Start simple**: Single loop functions work best
- **Use clear code**: Well-formatted code analyzes better
- **Wait patiently**: Analysis takes 5-10 seconds
- **Try multiple**: Analyze bubble sort, binary search, etc.

### Learning
- **Click info icons**: Learn about each complexity
- **Read descriptions**: Understand when to use each
- **Compare algorithms**: Analyze multiple solutions
- **Note the differences**: See why O(n log n) beats O(n²)

## Example Session

```bash
# 1. Start the app
npm run dev

# 2. Open browser to http://localhost:5173

# 3. In the app:
#    - Check O(n), O(n log n), O(n²)
#    - Move slider to 1000
#    - See O(n²) is 1000x bigger than O(n)

# 4. Paste bubble sort code and analyze
#    - Watch it detect O(n²)
#    - Compare with the graph

# 5. Try binary search next
#    - Should detect O(log n)
#    - Much flatter curve!
```

## Next Steps

Once you're comfortable:

1. **Read STUDENT_GUIDE.md** - Deep dive into complexities
2. **Try FEATURES.md** - Explore all features
3. **Check DEPLOYMENT.md** - Deploy to Vercel
4. **Read README.md** - Full documentation

## Getting Help

**Project Files**:
- `SETUP.md` - Detailed installation
- `STUDENT_GUIDE.md` - Learn complexity theory
- `FEATURES.md` - All features explained
- `DEPLOYMENT.md` - Deploy to cloud
- `README.md` - Full documentation

**Issues**:
- Check console for errors (F12 in browser)
- Check terminal for backend errors
- Verify ports 3001 and 5173 are free
- Ensure Node.js v18+ is installed

## Project Structure

```
complexity-visualizer/
├── frontend/          ← React app (Port 5173)
├── backend/           ← API server (Port 3001)
├── install.bat        ← Windows installer
├── start.bat          ← Windows launcher
├── package.json       ← Scripts
└── *.md              ← Documentation
```

## Commands Cheat Sheet

```bash
# Installation
npm run install:all

# Development
npm run dev              # Both frontend + backend
npm run dev:frontend     # Frontend only
npm run dev:backend      # Backend only

# Production
npm run build            # Build frontend
cd frontend && npm run preview  # Test build

# Individual servers
cd frontend && npm run dev      # Frontend on 5173
cd backend && npm run dev       # Backend on 3001
```

## System Requirements

- **OS**: Windows 10+, macOS 10.15+, Linux
- **Node.js**: v18.0.0 or later
- **npm**: v9.0.0 or later
- **Browser**: Chrome, Firefox, Safari, Edge (latest)
- **RAM**: 4GB minimum
- **Disk**: 500MB for dependencies

## Ready to Learn!

You're all set! The visualizer is a powerful tool for understanding how algorithms scale. 

**Pro Tips**:
- Start with simple comparisons
- Use the slider extensively
- Analyze your homework code
- Perfect for DAA presentations!

Have fun exploring algorithm complexities! 🚀

---

**Need more help?** Check the other documentation files or open an issue on GitHub.
