const AlgorithmCard = ({ algorithm, darkMode }) => {
  return (
    <div className={`rounded-xl p-6 border transition-all duration-300 hover:shadow-xl ${
      darkMode 
        ? 'bg-gray-800 border-gray-700 hover:border-gray-600' 
        : 'bg-white border-gray-200 hover:border-gray-300'
    }`}>
      {/* Header with color indicator */}
      <div className="flex items-center space-x-3 mb-4">
        <div 
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: algorithm.color }}
        />
        <h3 className={`text-2xl font-bold ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {algorithm.label}
        </h3>
      </div>

      {/* Name */}
      <p className={`text-lg font-semibold mb-2 ${
        darkMode ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {algorithm.name}
      </p>

      {/* Description */}
      <p className={`text-sm mb-4 ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        {algorithm.description}
      </p>

      {/* Example algorithms */}
      <div>
        <p className={`text-xs font-semibold mb-2 uppercase tracking-wide ${
          darkMode ? 'text-gray-500' : 'text-gray-500'
        }`}>
          Examples
        </p>
        <div className="flex flex-wrap gap-1">
          {algorithm.examples.map((example, i) => (
            <span
              key={i}
              className={`text-xs px-2 py-1 rounded ${
                darkMode 
                  ? 'bg-gray-700 text-gray-300' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {example}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlgorithmCard;
