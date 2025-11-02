export default function Footer({ darkMode }) {
  return (
    <div className={`fixed bottom-0 right-0 px-6 py-3 z-50 ${
      darkMode ? 'bg-gray-900/80' : 'bg-white/90'
    } rounded-tl-lg shadow-lg`}>
      <div className="text-sm">
        <span className={`font-bold ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Made with ❤️ by Ryan :)
        </span>
      </div>
    </div>
  );
}
