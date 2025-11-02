import React, { useState } from 'react'
import axios from 'axios'
import { Plus, AlertCircle } from 'lucide-react'

function CustomFunctionInput({ onAddCustomFunction, darkMode }) {
  const [customExpression, setCustomExpression] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAddCustomFunction = async () => {
    if (!customExpression.trim()) {
      setError('Please enter a function expression')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.post('http://localhost:3001/api/custom-function', {
        expression: customExpression
      })

      if (!response.data) {
        throw new Error('No response data received from server');
      }

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      // Create custom function object
      const customFunc = {
        id: `custom-${Date.now()}`,
        name: customExpression,
        label: `Custom: ${customExpression}`,
        color: `#${Math.floor(Math.random()*16777215).toString(16)}`, // Random color
        description: 'User-defined function',
        examples: ['Custom mathematical expression'],
        isCustom: true,
        growthPoints: response.data.growthPoints || [],
        useGrowthPoints: true
      }

      onAddCustomFunction(customFunc)
      setCustomExpression('')
      setError(null)
    } catch (err) {
      console.error('Error adding custom function:', err);
      const errorMessage = err.response?.data?.error || 
                         err.message || 
                         'Failed to add custom function. Please check your expression and try again.';
      setError(errorMessage);
      
      // Show error toast/alert
      alert(`❌ ${errorMessage}`);
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddCustomFunction()
    }
  }

  return (
    <div className="mb-4">
      <label
        className={`block text-sm font-semibold mb-2 ${
          darkMode ? 'text-gray-200' : 'text-gray-700'
        }`}
      >
        Custom Function
      </label>

      <div className="flex items-center gap-2 mb-2">
        <input
          type="text"
          value={customExpression}
          onChange={(e) => setCustomExpression(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a function of n (e.g., n^2 + 2n + 1)"
          className={`flex-1 p-2 rounded-md border ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <button
          onClick={handleAddCustomFunction}
          disabled={loading || !customExpression.trim()}
          className={`px-4 py-2 rounded-md ${
            loading || !customExpression.trim()
              ? 'bg-blue-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-medium flex items-center transition-colors`}
          title={!customExpression.trim() ? 'Enter a function first' : 'Add custom function'}
        >
          {loading ? 'Adding...' : <Plus size={18} className="mr-1" />}
        </button>
      </div>

      {error && (
        <div className={`p-2 text-sm rounded-md ${
          darkMode ? 'bg-red-900/20 text-red-400' : 'bg-red-50 text-red-600'
        } flex items-start gap-2`}>
          <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div className={`mt-2 text-xs ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <p>Examples: n^2, 2n+1, log(n), n*log(n), 2^n, n!</p>
        <p className="mt-1">
          <strong>Supported operations:</strong> +, -, *, /, ^ (power), log(n), sqrt(n), log2(n), log10(n), abs(n), floor(n), ceil(n)
        </p>
      </div>
    </div>
  )
}

export default CustomFunctionInput
