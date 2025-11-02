# 🚀 How to Start the Servers

## Issue: Quiz Section Not Working

The quiz section requires the backend server to be running on port 3001.

---

## ✅ Solution: Start Both Servers

### Option 1: Using Two Terminals (Recommended)

#### Terminal 1 - Backend Server
```powershell
cd "c:\Users\Ryan Malhotra\CascadeProjects\Time_Complexitiy_Visualiser\backend"
npm start
```

You should see:
```
🚀 GrowthViz Backend Server
📡 Running on: http://localhost:3001
🎯 Quiz API ready at: http://localhost:3001/api/quiz
💚 Health check: http://localhost:3001/api/health
```

#### Terminal 2 - Frontend Server
```powershell
cd "c:\Users\Ryan Malhotra\CascadeProjects\Time_Complexitiy_Visualiser\frontend"
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

**Note:** If port 5173 is busy, Vite will automatically use 5174 or the next available port.

---

### Option 2: Using PowerShell Script

Create a file `start-dev.ps1`:

```powershell
# Start backend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Ryan Malhotra\CascadeProjects\Time_Complexitiy_Visualiser\backend'; npm start"

# Wait 2 seconds for backend to start
Start-Sleep -Seconds 2

# Start frontend in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\Users\Ryan Malhotra\CascadeProjects\Time_Complexitiy_Visualiser\frontend'; npm run dev"
```

Then run:
```powershell
.\start-dev.ps1
```

---

## 🔍 Troubleshooting

### 1. Backend Won't Start

**Error: "running scripts is disabled"**
```powershell
# Run as Administrator
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**Error: "Cannot find module"**
```powershell
cd backend
npm install
```

### 2. Frontend Port Mismatch

If your frontend is running on port 5174 instead of 5173:
- **Don't worry!** The backend already supports both ports
- CORS is configured for: `http://localhost:5173` and `http://localhost:5174`

### 3. Quiz Still Not Working

**Check if backend is running:**
```powershell
# Open browser and visit:
http://localhost:3001/api/health
```

You should see:
```json
{
  "status": "ok",
  "message": "GrowthViz Backend is running",
  "timestamp": "2024-11-02T..."
}
```

**Check if quiz endpoint works:**
```powershell
# Open browser and visit:
http://localhost:3001/api/quiz/random?count=5
```

You should see a JSON response with quiz questions.

### 4. Port Already in Use

**Backend (port 3001) busy:**
```powershell
# Find process using port 3001
netstat -ano | findstr :3001

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**Frontend (port 5173) busy:**
- Vite will automatically use the next available port (5174, 5175, etc.)
- This is fine! The backend supports multiple ports.

---

## ✅ Verification Steps

1. **Backend Running:**
   - Open: http://localhost:3001/api/health
   - Should see: `{"status":"ok",...}`

2. **Frontend Running:**
   - Open: http://localhost:5173 (or 5174)
   - Should see: GrowthViz app

3. **Quiz Working:**
   - Navigate to Quiz section
   - Click "Start Quiz"
   - Should load questions (not error)

---

## 📝 Quick Start Commands

```powershell
# Terminal 1 - Backend
cd "c:\Users\Ryan Malhotra\CascadeProjects\Time_Complexitiy_Visualiser\backend"
npm start

# Terminal 2 - Frontend  
cd "c:\Users\Ryan Malhotra\CascadeProjects\Time_Complexitiy_Visualiser\frontend"
npm run dev
```

---

## 🎯 Summary

**Problem:** Quiz says "make sure backend is running"
**Cause:** Backend server (port 3001) is not started
**Solution:** Start backend server using `npm start` in backend folder

**Port Configuration:**
- ✅ Backend: 3001 (correct)
- ✅ Frontend: 5173 or 5174 (both supported)
- ✅ CORS: Configured for both frontend ports

---

*Once both servers are running, the quiz will work perfectly!*
