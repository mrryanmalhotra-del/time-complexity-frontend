import { Plus } from 'lucide-react';
import presets, { complexityFunctions, complexityColors } from '../data/presets';

const RightSidebar = ({ darkMode, selectedCurves, onAddCurve, onRemoveCurve }) => {
  const basicComplexities = [
    'O(1)',
    'O(log n)',
    'O(n)',
    'O(n log n)',
    'O(n²)',
    'O(n³)',
    'O(2ⁿ)',
    'O(n!)'
  ];

  const handleComplexityToggle = (complexity) => {
    const existing = selectedCurves.find(c => c.complexity === complexity);
    
    if (existing) {
      onRemoveCurve(existing.id);
    } else {
      // Add as a basic complexity curve
      onAddCurve({
        id: `complexity-${complexity}`,
        name: complexity,
        complexity: complexity,
        color: complexityColors[complexity],
        calculate: complexityFunctions[complexity]
      });
    }
  };

  const isComplexityActive = (complexity) => {
    return selectedCurves.some(c => c.complexity === complexity);
  };

  return (
    <div className="space-y-6">
      {/* Complexities Section */}
      <div className={`rounded-xl p-6 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border shadow-lg`}>
        <h3 className={`text-lg font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Complexities
        </h3>
        
        <div className="space-y-2">
          {basicComplexities.map(complexity => {
            const isActive = isComplexityActive(complexity);
            const color = complexityColors[complexity];
            
            return (
              <button
                key={complexity}
                onClick={() => handleComplexityToggle(complexity)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? darkMode
                      ? 'bg-gray-700 ring-2 ring-indigo-500'
                      : 'bg-indigo-50 ring-2 ring-indigo-500'
                    : darkMode
                      ? 'hover:bg-gray-700'
                      : 'hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3 flex-grow">
                  <div
                    className={`w-3 h-3 rounded-full transition-all ${
                      isActive ? 'scale-125' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                  <span className={`font-medium ${
                    darkMode ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    {complexity}
                  </span>
                </div>
                
                {isActive && (
                  <div className={`text-xs px-2 py-0.5 rounded ${
                    darkMode ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700'
                  }`}>
                    Active
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Try These Presets Section */}
      <div className={`rounded-xl p-6 ${
        darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border shadow-lg`}>
        <h3 className={`text-lg font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Try These Presets
        </h3>
        
        <div className="space-y-3">
          {presets.map(preset => {
            const isAdded = selectedCurves.some(c => c.id === preset.id);
            
            return (
              <div
                key={preset.id}
                className={`p-4 rounded-lg border transition-all ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 hover:border-gray-500'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                } ${isAdded ? 'opacity-50' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2 mb-1">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: preset.color }}
                      />
                      <h4 className={`font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {preset.name}
                      </h4>
                    </div>
                    <p className={`text-xs mb-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {preset.complexity}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => onAddCurve(preset)}
                    disabled={isAdded}
                    className={`p-1.5 rounded-lg transition-all ${
                      isAdded
                        ? darkMode
                          ? 'bg-gray-600 text-gray-500 cursor-not-allowed'
                          : 'bg-gray-300 text-gray-400 cursor-not-allowed'
                        : darkMode
                          ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                    title={isAdded ? 'Already added' : 'Add to graph'}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <p className={`text-xs ${
                  darkMode ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  {preset.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Card */}
      <div className={`rounded-xl p-4 ${
        darkMode ? 'bg-indigo-900/30 border-indigo-700' : 'bg-indigo-50 border-indigo-200'
      } border`}>
        <p className={`text-xs ${
          darkMode ? 'text-indigo-300' : 'text-indigo-700'
        }`}>
          💡 <strong>Tip:</strong> You can compare up to 5 algorithms simultaneously. 
          Click the legend chips to remove curves.
        </p>
      </div>
    </div>
  );
};

export default RightSidebar;
