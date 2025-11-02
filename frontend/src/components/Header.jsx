import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, BookOpen, BarChart3, Trophy } from 'lucide-react';

const Header = ({ darkMode, toggleDarkMode }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-40 ${
      darkMode ? 'bg-gray-800/95 backdrop-blur border-gray-700' : 'bg-white/95 backdrop-blur border-gray-200'
    } border-b transition-colors duration-200`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className={`p-2 rounded-lg ${
              darkMode ? 'bg-indigo-900/50' : 'bg-indigo-50'
            } group-hover:scale-105 transition-transform`}>
              <BarChart3 className={`w-5 h-5 ${
                darkMode ? 'text-indigo-400' : 'text-indigo-600'
              }`} />
            </div>
            <span className={`text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent`}>
              GrowthViz
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-1">
            <Link
              to="/theory"
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                isActive('/theory')
                  ? darkMode
                    ? 'bg-indigo-900/50 text-indigo-400'
                    : 'bg-indigo-50 text-indigo-600'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <BookOpen size={18} />
              <span className="hidden sm:inline">Learn</span>
            </Link>

            <Link
              to="/"
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                isActive('/')
                  ? darkMode
                    ? 'bg-indigo-900/50 text-indigo-400'
                    : 'bg-indigo-50 text-indigo-600'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <BarChart3 size={18} />
              <span className="hidden sm:inline">Visualize</span>
            </Link>

            <Link
              to="/quiz"
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all ${
                isActive('/quiz')
                  ? darkMode
                    ? 'bg-indigo-900/50 text-indigo-400'
                    : 'bg-indigo-50 text-indigo-600'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <Trophy size={18} />
              <span className="hidden sm:inline">Quiz</span>
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
              }`}
              aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
