import { Line } from 'react-chartjs-2';
import { X } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ComplexityGraph = ({ darkMode, nValue, selectedCurves, yAxisScale, onRemoveCurve }) => {
  // Generate data points for each curve
  const generateDataPoints = (calculate, maxN) => {
    const points = [];
    const step = Math.max(1, Math.floor(maxN / 50));
    
    for (let n = 1; n <= maxN; n += step) {
      let value = calculate(n);
      if (value === Infinity || isNaN(value)) value = null;
      points.push(value);
    }
    
    return points;
  };

  // Generate labels for x-axis
  const labels = [];
  const step = Math.max(1, Math.floor(nValue / 50));
  for (let n = 1; n <= nValue; n += step) {
    labels.push(n);
  }

  // Create datasets from selected curves
  const datasets = selectedCurves.map(curve => ({
    label: `${curve.name} (${curve.complexity})`,
    data: generateDataPoints(curve.calculate, nValue),
    borderColor: curve.color,
    backgroundColor: curve.color + '20',
    borderWidth: 3,
    tension: 0.4,
    pointRadius: 0,
    pointHoverRadius: 6,
    pointHoverBackgroundColor: curve.color,
    pointHoverBorderColor: darkMode ? '#1F2937' : '#FFFFFF',
    pointHoverBorderWidth: 2
  }));

  const chartData = {
    labels,
    datasets
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        backgroundColor: darkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        titleColor: darkMode ? '#F3F4F6' : '#111827',
        bodyColor: darkMode ? '#D1D5DB' : '#374151',
        borderColor: darkMode ? '#374151' : '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          title: (context) => {
            return `n = ${context[0].label}`;
          },
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            if (value === null) return `${label}: ∞`;
            if (value > 1000000) return `${label}: ${(value / 1000000).toFixed(2)}M`;
            if (value > 1000) return `${label}: ${(value / 1000).toFixed(2)}K`;
            return `${label}: ${value.toFixed(2)}`;
          }
        }
      }
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Input Size (n)',
          color: darkMode ? '#9CA3AF' : '#6B7280',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          color: darkMode ? '#9CA3AF' : '#6B7280',
          maxTicksLimit: 10
        },
        grid: {
          color: darkMode ? '#374151' : '#E5E7EB',
          drawBorder: false
        }
      },
      y: {
        type: yAxisScale === 'logarithmic' ? 'logarithmic' : 'linear',
        title: {
          display: true,
          text: 'Operations',
          color: darkMode ? '#9CA3AF' : '#6B7280',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          color: darkMode ? '#9CA3AF' : '#6B7280',
          callback: function(value) {
            if (value >= 1000000) return (value / 1000000).toFixed(0) + 'M';
            if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
            return value;
          }
        },
        grid: {
          color: darkMode ? '#374151' : '#E5E7EB',
          drawBorder: false
        },
        beginAtZero: yAxisScale !== 'logarithmic'
      }
    },
    animation: {
      duration: 750,
      easing: 'easeInOutQuart'
    }
  };

  return (
    <div>
      {/* Graph */}
      <div className="h-96">
        {selectedCurves.length > 0 ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className={`h-full flex items-center justify-center border-2 border-dashed rounded-lg ${
            darkMode ? 'border-gray-700 text-gray-500' : 'border-gray-300 text-gray-400'
          }`}>
            <div className="text-center">
              <p className="text-lg mb-2">No algorithms selected</p>
              <p className="text-sm">Add algorithms from the sidebar to start comparing</p>
            </div>
          </div>
        )}
      </div>

      {/* Legend chips */}
      {selectedCurves.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {selectedCurves.map(curve => (
            <div
              key={curve.id}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-100 border-gray-300'
              } transition-all hover:shadow-md group`}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: curve.color }}
              />
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-200' : 'text-gray-700'
              }`}>
                {curve.name}
              </span>
              <span className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {curve.complexity}
              </span>
              <button
                onClick={() => onRemoveCurve(curve.id)}
                className={`ml-1 p-1 rounded hover:bg-red-500 hover:text-white transition-colors ${
                  darkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
                title="Remove"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ComplexityGraph;
