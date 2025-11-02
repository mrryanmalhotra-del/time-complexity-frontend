import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, BookOpen, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import LearnSection from './components/LearnSection';
import QuizPage from './components/Quiz/QuizPage';

// NavLinks Component
const NavLinks = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Logo */}
      <Link to="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Time Complexity Visualizer
      </Link>
      
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        <Link 
          to="/" 
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-colors ${
            isActive('/') 
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' 
              : 'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
          }`}
        >
          <BookOpen size={18} />
          <span>Learn</span>
        </Link>
        <Link 
          to="/quiz" 
          className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg transition-colors ${
            isActive('/quiz')
              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30' 
              : 'text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400'
          }`}
        >
          <Trophy size={18} />
          <span>Quiz</span>
        </Link>
        
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </nav>
      
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center space-x-4">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button 
          onClick={() => document.getElementById('mobile-menu')?.classList.toggle('hidden')}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>
    </>
  );
};

// Mobile Menu Component
const MobileMenu = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div id="mobile-menu" className="md:hidden hidden fixed inset-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center h-full space-y-8">
        <button 
          onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
        
        <Link 
          to="/" 
          className={`text-xl px-6 py-3 rounded-xl w-48 text-center transition-colors ${
            isActive('/')
              ? 'text-white bg-indigo-600' 
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
        >
          <div className="flex items-center justify-center space-x-2">
            <BookOpen size={18} />
            <span>Learn</span>
          </div>
        </Link>
        
        <Link 
          to="/quiz" 
          className={`text-xl px-6 py-3 rounded-xl w-48 text-center transition-colors ${
            isActive('/quiz')
              ? 'text-white bg-indigo-600' 
              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
          onClick={() => document.getElementById('mobile-menu')?.classList.add('hidden')}
        >
          <div className="flex items-center justify-center space-x-2">
            <Trophy size={18} />
            <span>Quiz</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

// Page transition wrapper
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
    className="w-full"
  >
    {children}
  </motion.div>
);

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Toggle dark mode and save preference
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Set initial theme class on mount
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-slate-50 text-gray-900'
      }`}>
        {/* Header */}
        <header className={`sticky top-0 z-40 ${
          darkMode ? 'bg-gray-800/80 backdrop-blur' : 'bg-white/80 backdrop-blur'
        } border-b ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <NavLinks 
                darkMode={darkMode} 
                toggleDarkMode={toggleDarkMode}
              />
            </div>
          </div>
        </header>

        {/* Mobile Menu */}
        <MobileMenu />

        {/* Main Content */}
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-6 md:py-8">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={
                  <PageTransition>
                    <LearnSection darkMode={darkMode} />
                  </PageTransition>
                } />
                <Route path="/quiz" element={
                  <PageTransition>
                    <QuizPage darkMode={darkMode} />
                  </PageTransition>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </AnimatePresence>
          </div>
        </main>

        {/* Footer */}
        <footer className={`py-4 ${
          darkMode ? 'bg-gray-800/80' : 'bg-white/80'
        } border-t ${
          darkMode ? 'border-gray-700' : 'border-gray-200'
        } backdrop-blur`}>
          <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Time Complexity Visualizer &copy; {new Date().getFullYear()} • Built with React, Tailwind CSS, and Framer Motion</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
