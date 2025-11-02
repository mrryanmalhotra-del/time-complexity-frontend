export default function Footer({ darkMode }) {
  return (
    <footer className={`py-6 px-6 text-center border-t ${
      darkMode ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200'
    } backdrop-blur transition-colors duration-200`}>
      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Made with <span className="text-red-500">❤️</span> by Ryan :)
      </p>
    </footer>
  );
}
