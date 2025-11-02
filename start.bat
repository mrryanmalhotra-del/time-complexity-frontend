@echo off
echo ========================================
echo  Starting Algorithm Complexity Visualizer
echo ========================================
echo.
echo Frontend will be available at: http://localhost:5173
echo Backend will be available at: http://localhost:3001
echo.
echo Press Ctrl+C to stop the servers
echo.

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Dependencies not installed. Running installation...
    call install.bat
    if %errorlevel% neq 0 exit /b 1
)

call npm run dev
