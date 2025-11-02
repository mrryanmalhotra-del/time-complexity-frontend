import { useState } from 'react';
import ComplexityGraph from '../components/ComplexityGraph';
import SliderN from '../components/SliderN';
import { complexityFunctions, complexityColors, presets } from '../data/presets';
import { Plus, TrendingUp } from 'lucide-react';

const Visualize = ({ darkMode }) => {
  const [nValue, setNValue] = useState(100);
  // O(n) selected by default
  const [selectedCurves, setSelectedCurves] = useState([{
    id: 'default-linear',
    name: 'O(n)',
    complexity: 'O(n)',
    color: complexityColors['O(n)'],
    calculate: complexityFunctions['O(n)']
  }]);
  const [yAxisScale, setYAxisScale] = useState('linear');
  const [customFunction, setCustomFunction] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisError, setAnalysisError] = useState('');

  const handleAddPreset = (preset) => {
    if (selectedCurves.length >= 5) {
      alert('Maximum of 5 comparisons allowed');
      return;
    }
    
    if (!selectedCurves.find(c => c.id === preset.id)) {
      setSelectedCurves([...selectedCurves, preset]);
    }
  };

  const handleRemoveCurve = (presetId) => {
    setSelectedCurves(selectedCurves.filter(c => c.id !== presetId));
  };

  // Analyze Big O complexity from expression
  const analyzeBigO = (expr) => {
    const cleaned = expr.toLowerCase().replace(/\s+/g, '');
    
    // Check for factorial
    if (cleaned.includes('!') || cleaned.match(/factorial/)) {
      return { complexity: 'O(n!)', dominantTerm: 'n!', explanation: 'Factorial growth' };
    }
    
    // Check for exponential (2^n, e^n, etc.)
    if (cleaned.match(/2\*\*n|2\^n|e\*\*n|e\^n/)) {
      return { complexity: 'O(2ⁿ)', dominantTerm: '2ⁿ', explanation: 'Exponential growth' };
    }
    
    // Check for n^3 with possible log n
    if (cleaned.match(/n\*\*3|n\^3|n\*n\*n/)) {
      if (cleaned.includes('log')) {
        return { complexity: 'O(n³ log n)', dominantTerm: 'n³ log n', explanation: 'Cubic with logarithmic factor' };
      }
      return { complexity: 'O(n³)', dominantTerm: 'n³', explanation: 'Cubic growth' };
    }
    
    // Check for n^2 with possible log n
    if (cleaned.match(/n\*\*2|n\^2|n\*n/)) {
      if (cleaned.includes('log')) {
        return { complexity: 'O(n² log n)', dominantTerm: 'n² log n', explanation: 'Quadratic with logarithmic factor' };
      }
      return { complexity: 'O(n²)', dominantTerm: 'n²', explanation: 'Quadratic growth' };
    }
    
    // Check for n log n
    if (cleaned.includes('log') && cleaned.includes('n')) {
      if (cleaned.match(/n\*log|nlog|log\*n/)) {
        return { complexity: 'O(n log n)', dominantTerm: 'n log n', explanation: 'Linearithmic growth' };
      }
      return { complexity: 'O(log n)', dominantTerm: 'log n', explanation: 'Logarithmic growth' };
    }
    
    // Check for sqrt(n)
    if (cleaned.match(/sqrt\(n\)|n\*\*0\.5|n\^0\.5/)) {
      return { complexity: 'O(√n)', dominantTerm: '√n', explanation: 'Square root growth' };
    }
    
    // Check for linear (n with any coefficient or constant)
    if (cleaned.match(/[0-9]*n(?![\*\^])|n[\+\-]|[\+\-]n/)) {
      return { complexity: 'O(n)', dominantTerm: 'n', explanation: 'Linear growth' };
    }
    
    // Check for logarithmic
    if (cleaned.includes('log')) {
      return { complexity: 'O(log n)', dominantTerm: 'log n', explanation: 'Logarithmic growth' };
    }
    
    // If only constants (no n)
    if (!cleaned.includes('n')) {
      return { complexity: 'O(1)', dominantTerm: '1', explanation: 'Constant time' };
    }
    
    // Default to linear if n is present
    return { complexity: 'O(n)', dominantTerm: 'n', explanation: 'Linear growth' };
  };

  const handleAddCustomFunction = () => {
    const input = customFunction.trim();
    if (!input) {
      setAnalysisError('Please enter a function');
      setAnalysisResult(null);
      return;
    }

    if (selectedCurves.length >= 5) {
      setAnalysisError('Maximum of 5 comparisons allowed');
      return;
    }

    try {
      // Test the function with a sample value
      const testValue = 10;
      const testResult = evaluateSimpleExpression(input, testValue);
      
      if (typeof testResult !== 'number' || !isFinite(testResult)) {
        throw new Error('Invalid function');
      }

      // Analyze the Big O complexity
      const analysis = analyzeBigO(input);
      setAnalysisResult(analysis);
      setAnalysisError('');

      const newFunction = {
        id: `custom-${Date.now()}`,
        name: input,
        complexity: analysis.complexity,
        color: getNextAvailableColor(),
        calculate: (n) => evaluateSimpleExpression(input, n),
        isCustom: true,
        dominantTerm: analysis.dominantTerm
      };

      setSelectedCurves([...selectedCurves, newFunction]);
      setCustomFunction('');
      
      // Clear analysis after 5 seconds
      setTimeout(() => {
        setAnalysisResult(null);
      }, 5000);
    } catch (error) {
      setAnalysisError('Invalid function — please enter a valid expression in n');
      setAnalysisResult(null);
    }
  };

  // Simple expression evaluator for basic math
  const evaluateSimpleExpression = (expr, n) => {
    // Replace ^ with ** for exponentiation
    let cleaned = expr.toLowerCase().replace(/\^/g, '**');
    
    // Add Math functions support
    cleaned = cleaned.replace(/log\(/g, 'Math.log(');
    cleaned = cleaned.replace(/sqrt\(/g, 'Math.sqrt(');
    
    // Replace 'n' with the actual value
    cleaned = cleaned.replace(/n/g, n.toString());
    
    // Evaluate using Function constructor (safe for simple math)
    try {
      // eslint-disable-next-line no-new-func
      const result = new Function('return ' + cleaned)();
      return result;
    } catch (e) {
      throw new Error('Invalid expression');
    }
  };

  const getNextAvailableColor = () => {
    const usedColors = selectedCurves.map(c => c.color);
    const availableColors = Object.values(complexityColors).filter(
      color => !usedColors.includes(color)
    );
    return availableColors.length > 0 ? availableColors[0] : '#8884d8';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddCustomFunction();
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Graph Area (75%) */}
        <div className="flex-grow lg:w-3/4">
          <div className={`rounded-xl p-6 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border shadow-lg`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Complexity Comparison
              </h2>
              
              {/* Y-axis scale selector */}
              <div className="flex items-center space-x-2">
                <label className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Y-axis: O(n)
                </label>
                <select
                  value={yAxisScale}
                  onChange={(e) => setYAxisScale(e.target.value)}
                  className={`px-2 py-1 rounded-md text-sm ${
                    darkMode 
                      ? 'bg-gray-700 text-white border-gray-600' 
                      : 'bg-white text-gray-900 border-gray-300'
                  } border`}
                >
                  <option value="linear">Linear</option>
                  <option value="logarithmic">Logarithmic</option>
                </select>
              </div>
            </div>
            
            {/* Graph or message */}
            {selectedCurves.length === 0 ? (
              <div className={`flex items-center justify-center h-96 rounded-lg border-2 border-dashed ${
                darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-500'
              }`}>
                <p className="text-lg">📝 Select at least one complexity to visualize.</p>
              </div>
            ) : (
              <ComplexityGraph
                darkMode={darkMode}
                nValue={nValue}
                selectedCurves={selectedCurves}
                yAxisScale={yAxisScale}
                onRemoveCurve={handleRemoveCurve}
              />
            )}
            
            {/* Custom Function Input */}
            <div className="mt-6">
              <label htmlFor="custom-function" className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Add Custom Function (use 'n' as variable):
              </label>
              
              <div className="flex space-x-2">
                <input
                  type="text"
                  id="custom-function"
                  value={customFunction}
                  onChange={(e) => {
                    setCustomFunction(e.target.value);
                    setAnalysisError('');
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="e.g., n^3 + 2n + 1, n*log(n), 2^n"
                  className={`flex-1 px-4 py-2 rounded-md border ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                />
                
                <button
                  onClick={handleAddCustomFunction}
                  disabled={!customFunction.trim()}
                  className={`px-4 py-2 rounded-md ${
                    customFunction.trim()
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                  } transition-colors flex items-center space-x-1`}
                  title="Add function"
                >
                  <Plus size={20} />
                  <span>Add</span>
                </button>
              </div>
              
              {/* Analysis Result */}
              {analysisResult && (
                <div className={`mt-3 p-3 rounded-lg border-2 ${
                  darkMode 
                    ? 'bg-indigo-900/20 border-indigo-500/50' 
                    : 'bg-indigo-50 border-indigo-200'
                } animate-fade-in`}>
                  <div className="flex items-start space-x-2">
                    <TrendingUp className="text-indigo-500 mt-0.5" size={18} />
                    <div className="flex-1">
                      <p className={`text-sm font-semibold ${
                        darkMode ? 'text-indigo-300' : 'text-indigo-700'
                      }`}>
                        Detected dominant term: <span className="font-mono">{analysisResult.dominantTerm}</span>
                      </p>
                      <p className={`text-sm mt-1 ${
                        darkMode ? 'text-indigo-400' : 'text-indigo-600'
                      }`}>
                        Time Complexity: <span className="font-mono font-bold">{analysisResult.complexity}</span>
                      </p>
                      <p className={`text-xs mt-1 ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {analysisResult.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Error Message */}
              {analysisError && (
                <div className={`mt-3 p-3 rounded-lg border-2 ${
                  darkMode 
                    ? 'bg-red-900/20 border-red-500/50' 
                    : 'bg-red-50 border-red-200'
                }`}>
                  <p className={`text-sm ${
                    darkMode ? 'text-red-300' : 'text-red-700'
                  }`}>
                    {analysisError}
                  </p>
                </div>
              )}
              
              <p className={`mt-2 text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Examples: n^3 + 2n + 1, n*log(n), 2^n, n!, sqrt(n)
              </p>
            </div>
            
            {/* Slider */}
            <div className="mt-6">
              <SliderN
                darkMode={darkMode}
                nValue={nValue}
                onChange={setNValue}
              />
            </div>
          </div>
        </div>
        
        {/* Sidebar with Presets (25%) */}
        <div className="lg:w-1/4">
          <div className={`rounded-xl p-6 ${
            darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border shadow-lg`}>
            <h3 className={`text-xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Try These Presets
            </h3>
            
            <div className="space-y-3">
              {presets.map((preset) => {
                const isSelected = selectedCurves.find(c => c.id === preset.id);
                
                return (
                  <button
                    key={preset.id}
                    onClick={() => handleAddPreset(preset)}
                    disabled={isSelected}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      isSelected
                        ? darkMode
                          ? 'bg-gray-700 border-2 border-indigo-500'
                          : 'bg-indigo-50 border-2 border-indigo-500'
                        : darkMode
                          ? 'bg-gray-700 hover:bg-gray-600 border-2 border-transparent'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: preset.color }}
                      />
                      <span className={`font-semibold ${
                        darkMode ? 'text-white' : 'text-gray-900'
                      }`}>
                        {preset.complexity}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {preset.name}
                    </p>
                    <p className={`text-xs mt-1 ${
                      darkMode ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {preset.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visualize;
