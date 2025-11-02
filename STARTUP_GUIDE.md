# 🚀 GrowthViz - Startup Guide

Complete step-by-step guide to get GrowthViz running on your machine.

## ✅ Prerequisites Check

Before starting, ensure you have:
- [ ] **Node.js 18+** installed (check: `node --version`)
- [ ] **npm** installed (check: `npm --version`)
- [ ] Two terminal windows available

## 📦 Installation Steps

### Step 1: Install Backend Dependencies

Open **Terminal 1** (Command Prompt or PowerShell):

```bash
cd backend
npm install
```

Expected output: Dependencies installed successfully

### Step 2: Install Frontend Dependencies

Open **Terminal 2**:

```bash
cd frontend
npm install
```

Expected output: Dependencies installed successfully (this may take 1-2 minutes)

## 🎮 Running the Application

### Step 3: Start Backend Server

In **Terminal 1** (keep it open):

```bash
cd backend
npm run dev
```

✅ **Success indicators:**
```
🚀 GrowthViz Backend Server
📡 Running on: http://localhost:3001
🎯 Quiz API ready at: http://localhost:3001/api/quiz
💚 Health check: http://localhost:3001/api/health
```

**Keep this terminal running!**

### Step 4: Start Frontend Server

In **Terminal 2** (keep it open):

```bash
cd frontend
npm run dev
```

✅ **Success indicators:**
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

**Keep this terminal running!**

### Step 5: Open the Application

Open your browser and navigate to:
**http://localhost:5173**

You should see the GrowthViz homepage (Visualize page).

## 🧪 Quick Functionality Test

### Test 1: Visualize Page
1. You should see an empty graph area
2. Click "O(1)" in the right sidebar
3. Graph should display a flat line
4. Click "O(n)" - a diagonal line should appear
5. Drag the slider - lines should update
6. ✅ Visualization is working!

### Test 2: Theory Page
1. Click "Learn" in the header
2. You should see 8 complexity cards
3. Click "Learn more" on any card
4. Details should expand
5. ✅ Theory page is working!

### Test 3: Quiz Page
1. Click "Quiz" in the header
2. Select "5 Questions • 1 min"
3. Click "Start Quiz"
4. You should see the first question with 4 graph options
5. Select any option - feedback should appear
6. ✅ Quiz is working!

## 🐛 Troubleshooting

### Issue: "Port 3001 is already in use"

**Solution:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID_NUMBER> /F

# Or change the port in backend/src/server.js
const PORT = 3002; // Change this line
```

### Issue: "Port 5173 is already in use"

**Solution:** Vite will automatically try port 5174. Accept the alternative port or kill the process using 5173.

### Issue: Quiz questions not loading

**Checks:**
1. Is backend running? Check Terminal 1
2. Visit http://localhost:3001/api/health in browser
3. Expected: `{"status":"ok",...}`
4. If not working, restart backend

### Issue: Frontend shows blank page

**Solution:**
```bash
# Clear and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Issue: Graph not displaying

**Checks:**
1. Open browser DevTools (F12)
2. Look for errors in Console tab
3. Common fix: Clear browser cache (Ctrl+Shift+Delete)

### Issue: Dark mode toggle not working

**Solution:** Clear localStorage and refresh:
- Open DevTools → Application → Local Storage → Clear
- Refresh page (F5)

## 📱 Browser Compatibility

✅ Recommended browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎨 Optional Enhancements

### Add Quiz Sound Effects

1. Download short audio files (under 2 seconds):
   - `correct.mp3` - Success sound
   - `wrong.mp3` - Error sound
   - `timeup.mp3` - Alarm sound

2. Place them in:
   ```
   frontend/public/assets/
   ```

3. Restart frontend server

Free sound sources:
- https://freesound.org
- https://mixkit.co/free-sound-effects
- https://www.zapsplat.com

## 🔥 Hot Reload

Both frontend and backend support hot reload:
- **Frontend**: Edit any .jsx file → Browser auto-refreshes
- **Backend**: Edit server files → Manually restart (Ctrl+C, then `npm run dev`)

## 🛑 Stopping the Application

### Proper Shutdown:

1. **Terminal 1** (Backend): Press `Ctrl+C`
2. **Terminal 2** (Frontend): Press `Ctrl+C`
3. Close browser tabs

## 📊 Performance Tips

### For Large N Values (n > 500):
- Use **Logarithmic** Y-axis scale
- Limit to 3-4 simultaneous curves
- Exponential/Factorial complexities will show as infinity

### For Better Quiz Experience:
- Full-screen browser window
- Close unnecessary tabs
- Use wired internet connection

## 🎯 Next Steps

After successful setup:

1. **Explore Visualize Page**
   - Try all 8 basic complexities
   - Add algorithm presets
   - Experiment with different n values

2. **Study Theory Page**
   - Read all 8 complexity explanations
   - Expand "Learn more" sections
   - Understand the examples

3. **Take Quizzes**
   - Start with 5-question quiz
   - Progress to 15-question challenge
   - Try to achieve 100% accuracy

4. **Customize**
   - Toggle dark/light mode
   - Test responsive design (resize window)
   - Try on mobile device

## 📞 Getting Help

If you encounter issues not covered here:

1. Check browser console (F12) for errors
2. Check terminal outputs for error messages
3. Verify all files exist in correct locations
4. Review README_GROWTHVIZ.md for detailed info

## ✨ Success Checklist

- [ ] Backend running on port 3001
- [ ] Frontend running on port 5173
- [ ] Can access homepage in browser
- [ ] Can toggle dark/light mode
- [ ] Can add/remove complexity curves
- [ ] Slider updates graph smoothly
- [ ] Theory page loads all cards
- [ ] Quiz starts and shows questions
- [ ] Quiz timer counts down
- [ ] Quiz shows results at end

## 🎉 You're All Set!

**GrowthViz is now running successfully!**

Enjoy exploring time complexity concepts through interactive visualization and engaging quizzes.

---

Made with ❤️ by Ryan :)
