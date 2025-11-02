const SliderN = ({ darkMode, value, onChange }) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className={`text-sm font-medium ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Input Size (n)
        </label>
        <div className={`px-3 py-1 rounded-lg font-mono font-bold text-lg ${
          darkMode ? 'bg-gray-700 text-indigo-400' : 'bg-indigo-50 text-indigo-600'
        }`}>
          {value}
        </div>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min="1"
          max="1000"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: darkMode
              ? `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${(value / 1000) * 100}%, #374151 ${(value / 1000) * 100}%, #374151 100%)`
              : `linear-gradient(to right, #4F46E5 0%, #4F46E5 ${(value / 1000) * 100}%, #E5E7EB ${(value / 1000) * 100}%, #E5E7EB 100%)`
          }}
        />
        
        {/* Range markers */}
        <div className="flex justify-between mt-2 px-1">
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>1</span>
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>250</span>
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>500</span>
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>750</span>
          <span className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>1000</span>
        </div>
      </div>

      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
        Adjust to see how algorithms scale with different input sizes
      </p>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #4F46E5;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #4F46E5;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          transition: transform 0.2s;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
        }
      `}</style>
    </div>
  );
};

export default SliderN;
