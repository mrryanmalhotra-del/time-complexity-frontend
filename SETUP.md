# Setup Instructions

## Prerequisites

Before running this project, make sure you have Node.js and npm installed.

### Installing Node.js

1. **Download Node.js**: Visit https://nodejs.org/
2. **Install LTS version**: Download and install the LTS (Long Term Support) version
3. **Verify installation**: Open a new terminal and run:
   ```bash
   node --version
   npm --version
   ```

## Installation Steps

Once Node.js and npm are installed:

### Option 1: Install All at Once (Recommended)

```bash
# From the project root directory
npm run install:all
```

### Option 2: Manual Installation

```bash
# 1. Install root dependencies
npm install

# 2. Install frontend dependencies
cd frontend
npm install
cd ..

# 3. Install backend dependencies
cd backend
npm install
cd ..
```

## Running the Application

### Development Mode (Both Frontend and Backend)

```bash
npm run dev
```

This will start:
- **Frontend** at http://localhost:5173
- **Backend** at http://localhost:3001

### Running Separately

If you want to run frontend and backend in separate terminals:

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Building for Production

```bash
npm run build
```

This creates an optimized production build in `frontend/dist/`

## Troubleshooting

### Port Already in Use

If port 5173 or 3001 is already in use:

**Frontend**: Edit `frontend/vite.config.js` and change the port number
**Backend**: Edit `backend/src/server.js` and change the PORT constant

### Module Not Found Errors

Try deleting `node_modules` folders and reinstalling:

```bash
# Remove all node_modules
rm -rf node_modules frontend/node_modules backend/node_modules

# Reinstall
npm run install:all
```

### CORS Errors

Make sure both frontend and backend are running. The backend must be accessible at http://localhost:3001

## Features to Try

1. ✅ **View the default graph** - Opens with O(n) plotted
2. ✅ **Add/remove complexities** - Use checkboxes to toggle different curves
3. ✅ **Adjust input size** - Move the slider from 1 to 10,000
4. ✅ **Learn about complexities** - Click the info (i) icon next to each complexity
5. ✅ **Analyze code** - Paste your algorithm and click "Analyze Complexity"

## Example Code to Test

### Bubble Sort (O(n²))
```python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
```

### Binary Search (O(log n))
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

### Merge Sort (O(n log n))
```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)
```

## Project Structure

```
complexity-visualizer/
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.jsx
│   │   │   ├── ComplexityGraph.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js backend
│   ├── src/
│   │   ├── server.js        # Express server
│   │   └── analyzer.js      # Complexity analysis logic
│   └── package.json
├── package.json              # Root package.json
├── README.md                 # Project documentation
└── SETUP.md                  # This file
```

## Tech Stack Details

- **Frontend Framework**: React 18 with Vite
- **Styling**: TailwindCSS
- **Charts**: Chart.js with react-chartjs-2
- **Icons**: Lucide React
- **Backend**: Node.js with Express
- **API Communication**: Axios

## Educational Use

This tool is perfect for:
- Understanding algorithm complexity visually
- Comparing different complexity classes
- Analyzing your own code
- Preparing DAA presentations
- Learning time complexity concepts

Enjoy exploring algorithm complexities! 🚀
